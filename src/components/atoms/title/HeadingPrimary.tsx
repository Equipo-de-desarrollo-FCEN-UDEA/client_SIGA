import React from 'react';

export const HeadingPrimary = ({ text = '', className = '' }) => {
  return (
    <h1 className={`text-4xl font-bold text-gray-900 pb-5 ${className}`}>
      {text}
    </h1>
  );
};
