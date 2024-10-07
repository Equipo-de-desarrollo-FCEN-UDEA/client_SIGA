"use client";

type InputProps = {
  label?: string;
  placeholder?: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectInput = ({
  label,
  placeholder = "Seleccione una opción...",
  options,
  onChange,
}: InputProps) => {
  return (
    <>
      {!label ? (
        <select
          className="h-10 border border-gray-300 p-2 rounded w-full"
          onChange={onChange}
          defaultValue=""
        >
          <option disabled>{placeholder}</option>
          {options.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      ) : (
        <label className="flex flex-col">
          <span>{label}</span>
          <select
            className="h-10 border border-gray-300 p-2 rounded w-full"
            onChange={onChange}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((item, index) => (
              <option value={item} key={index} >{item}</option>
            ))}
          </select>
        </label>
      )}
    </>
  );
};

export default SelectInput;
