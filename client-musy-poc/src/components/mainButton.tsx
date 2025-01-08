import React from "react";

interface MainButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "correct" | "wrong";
}

const MainButton: React.FC<MainButtonProps> = ({
  text,
  onClick,
  className,
  type,
}) => {
  const buttonClass =
    type === "correct"
      ? "bg-green-500 text-white"
      : type === "wrong"
      ? "bg-red-500 text-white"
      : "bg-white text-blue700 hover:bg-blue100";

  return (
    <button
      onClick={onClick}
      className={`${buttonClass} font-medium px-4 min-h-12 rounded-lg duration-200 ${className}`}
    >
      {text}
    </button>
  );
};

export default MainButton;
