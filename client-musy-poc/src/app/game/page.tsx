"use client";

import MainButton from "@/components/mainButton";
import { useEffect, useState } from "react";
import { questions } from "./questions"; // Import questions from the new file
import ScoreScreen from "@/components/scoreScreen";
import { useRouter } from "next/navigation"; // Import useRouter from next/router
import QCM from "@/components/QCM"; // Import the new QCMComponent
import StartCountDown from "@/components/StartCountDown"; // Import the new StartCountDown component
import FinalScore from "@/components/FinalScore";

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const getRandomQuestion = (askedQuestions: Set<number>) => {
  let randomIndex;
  let question;
  do {
    randomIndex = Math.floor(Math.random() * questions.length);
    question = questions[randomIndex];
  } while (askedQuestions.has(question.id));
  question.answers = shuffleArray(question.answers);
  return question;
};

const QUESTION_DURATION = 7000;
const SCORE_SCREEN_DURATION = 5000;
const SCORE_SCREEN_DELAY = 2000;

const MY_PSEUDO = "ryry aka webflow goat";

const generateRandomScore = () => Math.floor(Math.random() * 7001);

const initialUsers = [
  { pseudo: MY_PSEUDO, score: 0, previousPosition: 0, currentPosition: 0 },
  { pseudo: "Mahelys", score: 0, previousPosition: 0, currentPosition: 0 },
  {
    pseudo: "Découpeur de tête",
    score: 0,
    previousPosition: 0,
    currentPosition: 0,
  },
  {
    pseudo: "Jean-François Pichard",
    score: 0,
    previousPosition: 0,
    currentPosition: 0,
  },
];

export default function game() {
  const router = useRouter(); // Initialize useRouter
  const [timeLeft, setTimeLeft] = useState(QUESTION_DURATION);
  const [askedQuestions, setAskedQuestions] = useState<Set<number>>(new Set());
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const question = getRandomQuestion(new Set());
    setAskedQuestions((prev) => new Set(prev).add(question.id));
    return question;
  });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [startCountdown, setStartCountdown] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [displayedComponent, setDisplayedComponent] =
    useState<string>("countdown");
  const [users, setUsers] = useState(initialUsers);

  useEffect(() => {
    if (startCountdown > 0) {
      const timer = setTimeout(() => {
        setStartCountdown(startCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setGameStarted(true);
      setDisplayedComponent("qcm");
    }
  }, [startCountdown]);

  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        setTimeLeft((prev): number => {
          if (prev > 0) {
            return prev - 100; // Decrease by 100 milliseconds
          } else {
            if (questionNumber <= 3) {
              setDisplayedComponent("scoreScreen");
              setUsers((prevUsers) => {
                const updatedUsers = prevUsers.map((user) => ({
                  ...user,
                  score:
                    user.pseudo === MY_PSEUDO
                      ? score +
                        (selectedAnswer === currentQuestion.correctAnswer
                          ? timeLeft
                          : 0)
                      : user.score + generateRandomScore(),
                }));

                const sortedUsers = [...updatedUsers].sort(
                  (a, b) => b.score - a.score
                );

                return sortedUsers.map((user, index) => ({
                  ...user,
                  previousPosition:
                    questionNumber === 1
                      ? 0
                      : prevUsers.findIndex((u) => u.pseudo === user.pseudo) +
                        1,
                  currentPosition: index + 1,
                }));
              });

              const scoreScreenTimer = setTimeout(() => {
                setDisplayedComponent("qcm");
                const question = getRandomQuestion(askedQuestions);
                setAskedQuestions((prev) => new Set(prev).add(question.id));
                setCurrentQuestion(question);
                setSelectedAnswer(null);
                setTimeLeft(QUESTION_DURATION); // Reset to 10 seconds in milliseconds
                setQuestionNumber((prev) => prev + 1);
                const progressBar = document.querySelector(
                  ".progress-bar"
                ) as HTMLElement;
                if (progressBar) {
                  progressBar.classList.remove("w-full");
                  void progressBar.offsetWidth;
                  progressBar.classList.add("w-full");
                }
              }, SCORE_SCREEN_DURATION);

              clearInterval(timer);
              return 0;
            } else {
              setDisplayedComponent("finalScore");
            }
            return 0;
          }
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [gameStarted, selectedAnswer]);

  useEffect(() => {
    if (selectedAnswer) {
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setScore((prev) => prev + timeLeft); // Convert milliseconds to seconds
      }
    }
  }, [selectedAnswer]);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
  };

  return (
    <div className="bg-blue950 w-full flex justify-center px-4 overflow-hidden">
      <div className="w-full max-w-md min-h-screen flex flex-col items-center relative text-center">
        {displayedComponent === "countdown" ? (
          <StartCountDown startCountdown={startCountdown} />
        ) : displayedComponent === "scoreScreen" ? (
          <ScoreScreen users={users} />
        ) : displayedComponent === "finalScore" ? (
          <FinalScore />
        ) : (
          <QCM
            questionNumber={questionNumber}
            currentQuestion={currentQuestion}
            selectedAnswer={selectedAnswer}
            handleAnswerClick={handleAnswerClick}
          />
        )}
      </div>
    </div>
  );
}
