"use client";

type InputProps = {
  label: string;
  type?: string;
  value: string;
};

const TextInput: React.FC<InputProps> = ({ label, type = "text", value }) => {
  return (
    <>
      <label className="flex flex-col mb-2">
        <strong>{label}</strong>
        <input
          type={type}
          value={value}
          className="h-10 border border-gray-300 p-2 rounded w-full"
          disabled
        />
      </label>
    </>
  );
};

export default TextInput;
