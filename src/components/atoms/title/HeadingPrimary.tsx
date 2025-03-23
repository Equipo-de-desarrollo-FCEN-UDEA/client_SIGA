import React from 'react';

export const HeadingPrimary = ({ text = '', className = '' }) => {
  return (
    <h1 className={`text-2xl font-bold text-gray-800 pb-5 ${className}`}>
      {text}
    </h1>
  );
};
