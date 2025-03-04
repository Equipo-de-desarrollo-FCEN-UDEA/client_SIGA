import React from "react";

type DateInputProps = {
  label?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void; // Solución no-unused-vars
  error?: string | null; // Solución no-explicit-any
};

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ label, value, name = "", placeholder = "--/--/--/", onChange, error }, ref) => (
    label ? (
      <label className="flex flex-col">
        <span>{label}</span>
        <input
          type="date"
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          ref={ref}
          className={`h-10 border border-gray-300 p-2 rounded w-full ${error ? "border-red-500" : ""}`}
          autoComplete="on"
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </label>
    ) : (
      <>
        <input
          type="date"
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          ref={ref}
          className={`h-10 border border-gray-300 p-2 rounded w-full ${error ? "border-red-500" : ""}`}
          autoComplete="on"
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </>
    )
  )
);

DateInput.displayName = "DateInput"; // Solución react/display-name

export default DateInput;
