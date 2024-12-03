import React from "react";

type EnumSelectProps<T> = {
  label: string;
  enumObject: T;
  register: any; // Si usas `react-hook-form`, esto es el registro
  name: string;
  required?: boolean;
};

const EnumSelect = <T extends object>({
  label,
  enumObject,
  register,
  name,
  required = false,
}: EnumSelectProps<T>) => {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
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
