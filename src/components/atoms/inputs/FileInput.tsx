"use client";

import React from "react";
import { UseFormSetValue } from "react-hook-form";

type InputProps = {
  label?: string;
  name: string;
  error?: string;
  files: File[];
  setValue: UseFormSetValue<any>;
};

const FileInput: React.FC<InputProps> = ({ label, name, error, files, setValue }) => {
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = [...files, ...Array.from(e.target.files)];
      setValue(name, newFiles, { shouldValidate: true }); // ✅ Actualiza y valida
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setValue(name, updatedFiles, { shouldValidate: true }); // ✅ Revalida al eliminar
  };

  return (
    <div className="flex flex-col">
      {label && <span>{label}</span>}

      <input
        type="file"
        multiple
        id={name}
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor={name}
        className="mb-4 w-full text-sm mr-4 py-2 px-4 rounded-lg text-center border-0 font-semibold bg-green-50 text-green-700 hover:bg-blue-100 cursor-pointer"
      >
        Seleccionar Archivos
      </label>

      {error && <span className="text-red-500 text-sm">{error}</span>}

      {/* Lista de archivos seleccionados */}
      <ul className="mt-2">
        {files.map((file, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded mt-1">
            <span className="text-sm">{file.name}</span>
            <button 
              className="text-red-500 text-xs font-bold"
              onClick={() => handleRemoveFile(index)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileInput;
