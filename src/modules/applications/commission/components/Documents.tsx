import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { StepFourFormData } from "@/core/schemas/commissionCreateFormSchema";
import { HeadingSecondary } from "@/components/atoms/title/HeadingSecondary";
import { ButtonIcon } from "@/components/atoms/buttons/ButtonIcon";
import { FileUpload } from "@/components/atoms/upload/FileUpload";
import { FaPlus, FaMinus } from "react-icons/fa";

const MAX_FILES = 3;

export const Documents = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ stepFour: StepFourFormData }>();

  // Estado inicial con un solo FileUpload vacío
  const [files, setFiles] = useState<{ id: number; file: File | null }[]>([
    { id: Date.now(), file: null },
  ]);

  const addFile = () => {
    if (files.length < MAX_FILES) {
      setFiles([...files, { id: Date.now(), file: null }]);
    }
  };

  // Función para manejar la eliminación de archivos
  const removeFile = (id: number) => {
    if (files.length === 1) {
      // Si hay solo un campo, solo se borra el archivo pero no el input
      setFiles([{ id, file: null }]);
    } else {
      // Si hay más de un campo, eliminarlo completamente
      setFiles(files.filter((fileEntry) => fileEntry.id !== id));
    }
  };

  // Maneja el cambio de archivo sin afectar otros FileUpload
  const handleFileChange = (id: number, newFiles: File[]) => {
    setFiles(
      files.map((fileEntry) =>
        fileEntry.id === id
          ? { ...fileEntry, file: newFiles.length > 0 ? newFiles[0] : null }
          : fileEntry
      )
    );
  };

  return (
    <div className="space-y-4">
      <HeadingSecondary text="Archivos adjuntos de la solicitud" />

      {files.map((fileEntry) => (
        <div key={fileEntry.id} className="flex items-center space-x-4">
          {/* FileUpload alineado horizontalmente */}
          <FileUpload
            onFilesChange={(newFiles) => handleFileChange(fileEntry.id, newFiles)}
            fileName={fileEntry.file ? fileEntry.file.name : ""}
          />

          <ButtonIcon
            bgColor="border border-red-500 hover:bg-red-100"
            textColor="text-red-500"
            buttonType="button"
            onClick={() => removeFile(fileEntry.id)}
            icon={FaMinus}
          />
          {files.length < MAX_FILES && (
            <div className="flex justify-start">
              <ButtonIcon buttonType="button" onClick={addFile} icon={FaPlus} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
