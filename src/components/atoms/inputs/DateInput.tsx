import React from "react";

type DateInputProps = {
  label?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  options: string[];
  valueOptions: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: any;
};

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
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
       
      </>
    );
  }
);

