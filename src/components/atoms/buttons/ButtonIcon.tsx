"use client";

import { IconType } from "react-icons";

type ButtonIconProps = {
  bgColor?: string;
  textColor?: string;
  buttonType?: "submit" | "reset" | "button";
  onClick?: () => void;
  icon: IconType;
};

export const ButtonIcon: React.FC<ButtonIconProps> = ({
  bgColor = "bg-green-btn-gradient",
  textColor = "text-white",
  buttonType = "submit",
  onClick,
  icon: Icon,
}) => {
  return (
    <button
      className={`flex items-center justify-center w-9 h-9 rounded-md ${bgColor} ${textColor}`}
      type={buttonType}
      onClick={onClick}
    >
      {Icon && <Icon className="w-4 h-4" />}
    </button>
  );
};
