'use client'

type InputProps = {
  type?: string,
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput: React.FC<InputProps> = ({ type = 'text', placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="h-10 border border-gray-300 p-2 rounded w-full"
      autoComplete="on"
    />
  );
};

export default TextInput
