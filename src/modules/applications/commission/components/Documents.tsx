import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { StepFourFormData } from "@/core/schemas/commissionCreateFormSchema";
import { HeadingSecondary } from "@/components/atoms/title/HeadingSecondary";
import { ButtonIcon } from "@/components/atoms/buttons/ButtonIcon";
import { FileUpload } from "@/components/molecules/upload/FileUpload";
import { FaPlus, FaMinus } from "react-icons/fa";

const MAX_FILES = 3;

export const Documents = () => {
  const { setValue } = useFormContext<{ stepFour: StepFourFormData }>();

  const [files, setFiles] = useState<{ id: number; file: File | null }[]>([
    { id: Date.now(), file: null },
  ]);

  const addFile = () => {
    if (files.length < MAX_FILES) {
      setFiles((prev) => [...prev, { id: Date.now(), file: null }]);
    }
  };

  const removeFile = (id: number) => {
    setFiles((prev) => {
      const updatedFiles = prev.filter((file) => file.id !== id);
      setValue(
        "stepFour.documents",
        updatedFiles.map((f) => f.file).filter(Boolean) as File[]
      );
      return updatedFiles.length ? updatedFiles : [{ id: Date.now(), file: null }];
    });
  };

  const handleFileChange = (id: number, newFiles: File[]) => {
    setFiles((prev) => {
      const updatedFiles = prev.map((file) =>
        file.id === id ? { ...file, file: newFiles[0] || null } : file
      );

      setValue(
        "stepFour.documents",
        updatedFiles.map((f) => f.file).filter(Boolean) as File[]
      );

      return updatedFiles;
    });
  };

  return (
    <div className="space-y-4">
      <HeadingSecondary text="Archivos adjuntos de la solicitud" />

      {files.map((fileEntry) => (
        <div key={fileEntry.id} className="flex items-center space-x-4">
          <FileUpload
            onFilesChange={(newFiles) => handleFileChange(fileEntry.id, newFiles)}
            fileName={fileEntry.file?.name || ""}
          />
          <ButtonIcon
            bgColor="border border-red-500 hover:bg-red-100"
            textColor="text-red-500"
            buttonType="button"
            onClick={() => removeFile(fileEntry.id)}
            icon={FaMinus}
          />
        </div>
      ))}

      {files.length < MAX_FILES && (
        <div className="flex justify-start">
          <ButtonIcon buttonType="button" onClick={addFile} icon={FaPlus} />
        </div>
      )}
    </div>
  );
};
