"use client";

import React from "react";

type InputProps = {
  label?: string;
  type?: string;
  name?: string;
  placeholder: string;
  value?: string;
  error?: null | string | undefined; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, type = "text", name = "", placeholder, value, onChange, error },
    ref
  ) => (
      <>
        {!label ? (
          <>
            <input
              type={type}
              placeholder={placeholder}
              value={value}
              name={name}
              onChange={onChange}
              ref={ref}
              className="h-10 border border-gray-300 p-2 rounded w-full"
              autoComplete="on"
            />
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </>
        ) : (
          <label className="flex flex-col">
            <span>{label}</span>
            <input
              type={type}
              placeholder={placeholder}
              value={value}
              name={name}
              onChange={onChange}
              ref={ref}
              className={`h-10 border border-gray-300 p-2 rounded w-full ${
                error ? "border-red-500" : ""
              }`}
              autoComplete="on"
            />
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </label>
        )}
      </>
    )
);

TextInput.displayName = "TextInput";

export default TextInput;
