import React from 'react';

export const HeadingSecondary = ({ text = '', className = '' }) => {
  return (
    <h2 className={`text-xl font-semibold text-gray-900 ${className}`}>
      {text}
    </h2>
  );
};
