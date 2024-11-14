"use client";

import React from "react";

type InputProps = {
  label?: string;
  type?: string;
  name?: string;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// Usamos React.forwardRef para que el componente acepte ref
const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = "text", name = "", placeholder, value, onChange }, ref) => {
    return (
      <>
        {!label ? (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            ref={ref} // Añadimos la referencia aquí
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
              ref={ref} // Añadimos la referencia aquí
              className="h-10 border border-gray-300 p-2 rounded w-full"
              autoComplete="on"
            />
          </label>
        )}
      </>
    );
  }
);

// Opcional: Añadir displayName para facilitar la depuración
TextInput.displayName = "TextInput";

export default TextInput;
