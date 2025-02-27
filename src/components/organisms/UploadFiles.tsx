import React from 'react'

interface UploadFilesProps {
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const UploadFiles = ({ files, setFiles }: UploadFilesProps) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setFiles([...files, ...Array.from(event.target.files)]);
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Subir Archivos</h2>

            <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-blue-100"
                aria-label="Seleccionar archivos"
                title="Seleccionar archivos"
            />

            {files.length > 0 && (
                <ul className="mb-4">
                    {files.map((file, index) => (
                        <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded mb-2">
                            <span className="text-sm">{file.name}</span>
                            <button
                                onClick={() => removeFile(index)}
                                className="text-red-500 hover:text-red-700 text-sm"
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default UploadFiles