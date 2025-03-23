import React from "react";

interface LabelValueProps {
  label: string;
  value: string;
}

export const LabelValue: React.FC<LabelValueProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col mt-1 max-w-full break-words">
      <span className="text-sm font-semibold text-gray-900">{label}</span>
      <span className="text-base text-gray-700 break-words whitespace-normal overflow-hidden">{value}</span>
    </div>
  );
};