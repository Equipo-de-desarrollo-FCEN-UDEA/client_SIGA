"use client";

import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

type InputProps = {
    type?: string;
    name?: string;
    placeholder: string;
    value?: string;
    error?: null | string | undefined;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// Usamos React.forwardRef para que el componente acepte ref
const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
    (
        { type = "text", name = "", placeholder, value, onChange, error },
        ref
    ) => {
        return (
            <>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    name={name}
                    onChange={onChange}
                    ref={ref}
                    className={`h-10 border border-gray-300 p-2 rounded w-full ${error ? "border-red-500" : ""
                        }`}
                    autoComplete="on"
                />
                {error && <span className="text-red-500 text-sm">{error}</span>}
            </>
        );
    }
);

export default TextInput;
