import React from "react";

type DateInputProps = {
  label?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: any;
};

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      label,
      value,
      name = "",
      placeholder = "--/--/--/",
      onChange,
      error,
    },
    ref
  ) => {
    return (
      <>
        {!label ? (
          <>
            <input
              type="date"
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
          </>
        ) : (
          
            <label className="flex flex-col">
              <span>{label}</span>
              <input
                type="date"
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
    );
  }
);

export default DateInput;
