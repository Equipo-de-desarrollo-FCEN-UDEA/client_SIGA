"use client";

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
  return (
    <button
      className={`w-full h-9 rounded-md ${
        disabled 
          ? "bg-gray-400 cursor-not-allowed" 
          : bgColor
      } ${textColor} transition-colors`}
      type={buttonType}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default MainButton;
