"use client";

import React from "react";
import { FaSpinner } from "react-icons/fa";

type MainButtonProps = {
  text: string;
  bgColor?: string;
  textColor?: string;
  buttonType?: "submit" | "reset" | "button";
  onClick?: () => void;
  disabled?: boolean;
};

const MainButton: React.FC<MainButtonProps> = ({
  text,
  bgColor = "bg-green-btn-gradient",
  textColor = "text-white",
  buttonType = "submit",
  onClick,
  disabled = false,
}) => {
  const baseStyles = "w-full h-9 rounded-md flex items-center justify-center gap-2";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={buttonType}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${bgColor} ${textColor} ${disabledStyles}`}
    >
      {disabled && <FaSpinner className="animate-spin w-4 h-4" />}
      {text}
    </button>
  );
};

export default MainButton;
