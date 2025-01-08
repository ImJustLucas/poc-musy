import React from "react";

interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder = "Placeholder",
  value,
  onChange,
}) => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="min-h-12 p-2 rounded-lg bg-transparent border-2 border-blue500"
    />
  );
};

export default Input;
