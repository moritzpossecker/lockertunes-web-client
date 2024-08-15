import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="mt-2 text-sm text-red-600">
      {message}
    </div>
  );
};

export default ErrorMessage;