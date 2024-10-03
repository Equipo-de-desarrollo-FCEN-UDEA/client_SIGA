"use client";

type MainButtonProps = {
  text: string;
  bgColor?: string;
  textColor?: string;
  buttonType?: "submit" | "reset" | "button";
  onClick: () => void;
};

const MainButton: React.FC<MainButtonProps> = ({
  text,
  bgColor = "bg-green-gradient",
  textColor = "text-white",
  buttonType = "submit",
  onClick,
}) => {
  return (
    <button
      className={`w-full h-9 rounded-md ${bgColor} ${textColor}`}
      type={buttonType}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default MainButton;
