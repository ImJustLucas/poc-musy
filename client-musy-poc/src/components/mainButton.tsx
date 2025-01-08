import React from "react";

interface MainButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const MainButton: React.FC<MainButtonProps> = ({
  text,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white font-medium text-blue700 px-4 min-h-12 rounded-full duration-200 hover:bg-blue100 ${className}`}
    >
      {text}
    </button>
  );
};

export default MainButton;
