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
};

// Usamos React.forwardRef para que el componente acepte ref
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
    },
    ref
  ) => {
    return (
      <>
        {!label ? (
          <select
            value={value}
            className="h-10 border border-gray-300 p-2 rounded w-full"
            onChange={onChange}
            name={name}
            ref={ref} // Añadimos la referencia aquí
          >
            <option value="">{placeholder}</option>
            {options.map((item, index) => (
              <option value={valueOptions[index]} key={index}>
                {item}
              </option>
            ))}
          </select>
        ) : (
          <label className="flex flex-col">
            <span>{label}</span>
            <select
              value={value}
              name={name}
              className="h-10 border border-gray-300 p-2 rounded w-full"
              onChange={onChange}
              ref={ref} // Añadimos la referencia aquí
            >
              <option value="">{placeholder}</option>
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
  }
);

// Opcional: Añadir displayName para facilitar la depuración
SelectInput.displayName = "SelectInput";

export default SelectInput;
