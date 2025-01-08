"use client";

import MainButton from "@/components/mainButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { questions } from "./questions"; // Import questions from the new file

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function QCM() {
  const [timeLeft, setTimeLeft] = useState(10000); // 10 seconds in milliseconds
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];
    question.answers = shuffleArray(question.answers);
    return question;
  });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 100 : 0)); // Decrease by 100 milliseconds
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedAnswer) {
      const timer = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * questions.length);
        const question = questions[randomIndex];
        question.answers = shuffleArray(question.answers);
        setCurrentQuestion(question);
        setSelectedAnswer(null);
        setTimeLeft(10000); // Reset to 10 seconds in milliseconds
        setQuestionNumber((prev) => prev + 1);
        const progressBar = document.querySelector(
          ".progress-bar"
        ) as HTMLElement;
        progressBar.style.width = "100%";
        progressBar.classList.remove("progress-bar");
        void progressBar.offsetWidth;
        progressBar.classList.add("progress-bar");
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
    <div className="bg-blue950 w-full h-full flex justify-center px-4">
      <div className="w-full max-w-md h-screen flex flex-col items-center justify-center relative text-center">
        <style jsx>{`
          .progress-bar {
            width: 100%;
            height: 100%;
            background-color: #3b82f6;
            animation: progress-linear 10s linear forwards;
          }

          @keyframes progress-linear {
            from {
              width: 100%;
            }
            to {
              width: 0%;
            }
          }
        `}</style>
        <div className="w-full absolute top-8">
          {/* Barre de progression */}
          <div className="w-full h-1 bg-gray-300 mb-4 overflow-hidden">
            <div className="progress-bar"></div>
          </div>
          <div className="text-xl mt-16">Question {questionNumber}/10</div>
          <div className="text-white text-lg mt-2">
            Temps restant: {Math.floor(timeLeft / 1000)}s
          </div>
          <div className="text-white text-lg mt-2">Score: {score}</div>
        </div>
        <div className="text-white text-2xl">{currentQuestion.question}</div>
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
    </div>
  );
}
