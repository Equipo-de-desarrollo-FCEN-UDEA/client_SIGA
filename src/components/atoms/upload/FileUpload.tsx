import React from "react";
import { FiUpload } from "react-icons/fi";

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  fileName?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFilesChange, fileName }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onFilesChange([event.target.files[0]]);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={`file_input_${fileName}`} className="flex items-center space-x-2 cursor-pointer text-green-600 hover:underline">
        <FiUpload className="w-6 h-6" />
        <span className="text-lg font-medium cursor-pointer">
          {fileName ? `Archivo: ${fileName}` : "Subir archivo"}
        </span>
      </label>
      <input
        className="hidden"
        id={`file_input_${fileName}`}
        type="file"
        onChange={handleFileChange}
      />
    </div>
  );
};
