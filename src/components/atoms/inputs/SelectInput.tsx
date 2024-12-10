"use client";

import React from "react";

type InputProps = {
  label?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  options: string[];
  valueOptions: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: any;
};

const SelectInput = React.forwardRef<HTMLSelectElement, InputProps>(
  (
    {
      label,
      value,
      name = "",
      placeholder = "Seleccione una opción...",
      options,
      valueOptions,
      onChange,
      error,
    },
    ref
  ) => {
    return (
      <>
        {!label ? (
          <>
            <select
              value={value}
              className={`h-10 border border-gray-300 p-2 rounded w-full ${
                error ? "border-red-500" : ""
              }`}
              onChange={onChange}
              name={name}
              ref={ref}
            >
              <option value="">{placeholder}</option>
              {options.map((item, index) => (
                <option value={valueOptions[index]} key={index}>
                  {item}
                </option>
              ))}
            </select>
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </>
        ) : (
          <label className="flex flex-col">
            <span>{label}</span>
            <select
              value={value}
              name={name}
              className={`h-10 border border-gray-300 p-2 rounded w-full ${
                error ? "border-red-500" : ""
              }`}
              onChange={onChange}
              ref={ref}
            >
              <option value="">{placeholder}</option>
              {options.map((item, index) => (
                <option value={valueOptions[index]} key={index}>
                  {item}
                </option>
              ))}
            </select>
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </label>
        )}
      </>
    );
  }
);

// Opcional: Añadir displayName para facilitar la depuración
SelectInput.displayName = "SelectInput";

export default SelectInput;
