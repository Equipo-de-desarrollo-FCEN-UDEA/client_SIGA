"use client";

type SecondaryButtonProps = {
  text: string;
  bgColor?: string;
  textColor?: string;
  buttonType?: "submit" | "reset" | "button";
  onClick?: () => void;
};

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  text,
  buttonType = "submit",
  onClick,
}) => {
  return (
    <button
      className={`w-full h-9 rounded-md border-2 border-gray-400 text-gray-400 bg-white hover:bg-gray-400 hover:text-white`}
      type={buttonType}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
