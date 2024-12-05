import React from "react";
import { UseFormRegister } from "react-hook-form";

type EnumSelectProps<T> = {
  enumObject: T;
  register: UseFormRegister<any>;
  name: string;
  required?: boolean;
};

const EnumSelect = <T extends object>({
  enumObject,
  register,
  name,
  required = false,
}: EnumSelectProps<T>) => {
  return (
    <div>
      <select
        {...register(name, { required })}
        className="w-full border rounded p-2"
      >
        <option value="" disabled>
          Seleccione una opción
        </option>
        {Object.values(enumObject).map((value) => (
          <option key={value as string} value={value as string}>
            {value as string}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EnumSelect;
