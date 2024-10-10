"use client";

type InputProps = {
  label?: string;
  value: string
  placeholder?: string;
  options: string[];
  valueOptions: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectInput = ({
  label,
  value,
  placeholder = "Seleccione una opción...",
  options,
  valueOptions,
  onChange,
}: InputProps) => {
  return (
    <>
      {!label ? (
        <select
          value={value}
          className="h-10 border border-gray-300 p-2 rounded w-full"
          onChange={onChange}
        >
          <option value={placeholder}>{placeholder}</option>
          {options.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      ) : (
        <label className="flex flex-col">
          <span>{label}</span>
          <select
            value={value}
            className="h-10 border border-gray-300 p-2 rounded w-full"
            onChange={onChange}
          >
            <option value={placeholder}>{placeholder}</option>
            {options.map((item, index) => (
              <option value={valueOptions[index]} key={index}>
                {item}
              </option>
            ))}
          </select>
        </label>
      )}
    </>
  );
};

export default SelectInput;
