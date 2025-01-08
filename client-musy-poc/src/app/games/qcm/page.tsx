"use client";

import MainButton from "@/components/mainButton";
import { useEffect, useState } from "react";
import { questions } from "./questions"; // Import questions from the new file

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

export default function QCM() {
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

  useEffect(() => {
    if (startCountdown > 0) {
      const timer = setTimeout(() => {
        setStartCountdown(startCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setGameStarted(true);
    }
  }, [startCountdown]);

  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 100 : 0)); // Decrease by 100 milliseconds
      }, 100);
      return () => clearInterval(timer);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (selectedAnswer) {
      const timer = setTimeout(() => {
        const question = getRandomQuestion(askedQuestions);
        setAskedQuestions((prev) => new Set(prev).add(question.id));
        setCurrentQuestion(question);
        setSelectedAnswer(null);
        setTimeLeft(QUESTION_DURATION); // Reset to 10 seconds in milliseconds
        setQuestionNumber((prev) => prev + 1);
        const progressBar = document.querySelector(
          ".progress-bar"
        ) as HTMLElement;
        progressBar.classList.remove("w-full");
        void progressBar.offsetWidth;
        progressBar.classList.add("w-full");
      }, 1000);

      if (selectedAnswer === currentQuestion.correctAnswer) {
        setScore((prev) => prev + timeLeft); // Convert milliseconds to seconds
      }

      return () => clearTimeout(timer);
    }
  }, [selectedAnswer]);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
  };

  return (
    <div className="bg-blue950 w-full h-full flex justify-center px-4 overflow-hidden">
      <div className="w-full max-w-md h-screen flex flex-col items-center justify-center relative text-center">
        {startCountdown > 0 ? (
          <div
            key={startCountdown}
            className="text-white text-6xl animate-scale-down"
          >
            {startCountdown}
          </div>
        ) : (
          <div>
            <div className="w-full absolute top-8">
              {/* Barre de progression */}
              <div className="w-full h-1 bg-gray-300 mb-4 overflow-hidden">
                <div
                  className="progress-bar bg-blue-500 h-full"
                  style={{
                    animation: `progress-linear ${QUESTION_DURATION}ms linear forwards`,
                  }}
                ></div>
              </div>
              <div className="text-xl mt-16">Question {questionNumber}/10</div>
              <div className="text-white text-lg mt-2">
                Temps restant: {Math.ceil(timeLeft / 1000)}s
              </div>
              <div className="text-white text-lg mt-2">Score: {score}</div>
            </div>
            <div className="text-white text-2xl">
              {currentQuestion.question}
            </div>
            <div className="w-full grid grid-cols-2 gap-2 absolute bottom-8">
              {currentQuestion.answers.map((answer) => (
                <MainButton
                  key={answer}
                  text={answer}
                  onClick={() => handleAnswerClick(answer)}
                  type={
                    selectedAnswer
                      ? answer === currentQuestion.correctAnswer
                        ? "correct"
                        : answer === selectedAnswer
                        ? "wrong"
                        : undefined
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <style>
        {`
          @keyframes progress-linear {
            from {
              width: 100%;
            }
            to {
              width: 0%;
            }
          }
          @keyframes scale-down {
            0% {
              transform: scale(100);
            }
            100% {
              transform: scale(1);
            }
          }
          .animate-scale-down {
            animation: scale-down 0.5s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}
