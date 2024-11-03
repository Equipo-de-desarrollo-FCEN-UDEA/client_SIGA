"use client";

type InputProps = {
  label?: string;
  type?: string;
  name?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput: React.FC<InputProps> = ({
  label,
  type = "text",
  name = "",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <>
      {!label ? (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          className="h-10 border border-gray-300 p-2 rounded w-full"
          autoComplete="on"
          />
        ) : (
          <label className="flex flex-col">
          <span>{label}</span>
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            className="h-10 border border-gray-300 p-2 rounded w-full"
            autoComplete="on"
          />
        </label>
      )}
    </>
  );
};

export default TextInput;
