"use client";

import React from "react";

type InputProps = {
  label?: string;
  error?: null | string | undefined;
  children: JSX.Element;
};

// Usamos React.forwardRef para que el componente acepte ref
const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, children },
    ref
  ) => {
    return (
      <>
        {!label ? (
          <>
            {children}
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </>
        ) : (
          <label className="flex flex-col text-sm font-medium text-gray-700">
            <span>{label}</span>
            {children}
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </label>
        )}
      </>
    );
  }
);

export default TextInput;
