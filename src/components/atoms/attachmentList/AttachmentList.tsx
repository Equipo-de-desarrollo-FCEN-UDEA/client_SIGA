import React from "react";

interface AttachmentListProps {
  documents: File[];
}

const AttachmentList: React.FC<AttachmentListProps> = ({ documents }) => {
  if (!documents || documents.length === 0) return null;

  return (
    <div>
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
