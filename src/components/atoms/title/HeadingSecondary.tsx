import React from 'react';

export const HeadingSecondary = ({ text = '', className = '' }) => {
  return (
    <h2 className={`text-2xl font-semibold text-gray-700 ${className}`}>
      {text}
    </h2>
  );
};
