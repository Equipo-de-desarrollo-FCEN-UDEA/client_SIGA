"use client";

type MainButtonProps = {
  text: string;
  bgColor?: string;
  textColor?: string;
  buttonType?: "submit" | "reset" | "button";
};

const MainButton: React.FC<MainButtonProps> = ({
  text,
  bgColor = "bg-green-gradient",
  textColor = "text-white",
  buttonType = "submit",
}) => {
  return (
    <button
      type={buttonType}
      className={`w-full h-9 rounded-md ${bgColor} ${textColor}`}
    >
      {text}
    </button>
  );
};

export default MainButton;
