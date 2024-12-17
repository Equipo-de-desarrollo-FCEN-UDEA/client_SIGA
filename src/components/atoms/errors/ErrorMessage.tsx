import React from 'react';

interface ErrorMessageProps {
  error: any;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error || typeof error.message !== 'string') {
    return null;
  }

  return (
    <p className="text-red-500">{error.message}</p>
  );
};

export default ErrorMessage;