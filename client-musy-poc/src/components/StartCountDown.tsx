import React from "react";

interface StartCountDownProps {
  startCountdown: number;
}

const StartCountDown: React.FC<StartCountDownProps> = ({ startCountdown }) => {
  return (
    <div
      key={startCountdown}
      className="h-screen flex items-center justify-center text-white text-6xl animate-scale-down"
    >
      {startCountdown}
      <style>
        {`
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
};

export default StartCountDown;
