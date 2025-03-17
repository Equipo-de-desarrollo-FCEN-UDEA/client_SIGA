"use client";

import React from "react";

type TextAreaProps = {
  label?: string;
  name?: string;
  placeholder: string;
  value?: string;
  error?: null | string | undefined;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, name = "", placeholder, value, onChange, error }, ref) => (
    <>
      {!label ? (
        <>
          <textarea
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            ref={ref}
            className="h-40 border border-gray-300 p-2 rounded w-full resize-none"
            autoComplete="on"
          />
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </>
      ) : (
        <label className="flex flex-col">
          <span>{label}</span>
          <textarea
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            ref={ref}
            className={`h-40 border border-gray-300 p-2 rounded w-full resize-none ${
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

TextArea.displayName = "TextArea";

export default TextArea;