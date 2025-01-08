import React, { useState } from "react";

interface GenreSelectBtnProps {
  text: string;
}

const GenreSelectBtn: React.FC<GenreSelectBtnProps> = ({ text }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleStyle = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      onClick={toggleStyle}
      className={`rounded-full min-h-12 px-2 font-semibold ${
        isActive ? "bg-blue300 text-white" : "bg-white text-blue700"
      }`}
    >
      {text}
    </button>
  );
};

export default GenreSelectBtn;
