import React from "react";

interface AttachmentListProps {
  documents: File[];
}

const AttachmentList: React.FC<AttachmentListProps> = ({ documents }) => {
  if (!documents || documents.length === 0) return null;

  return (
    <div>
      <span className="text-sm font-semibold text-gray-900">
        <h5>Archivos adjuntos de la solicitud</h5>
      </span>
      <ul className="space-y-2">
        {documents.map((file, index) => (
          <li key={index}>
            <a  target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttachmentList;
