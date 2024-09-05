import React from 'react'

interface IErrorMessageProps {
  message: string
}

const ErrorMessage: React.FC<IErrorMessageProps> = ({ message }) => {
  return <div className="mt-2 text-sm text-red-600">{message}</div>
}

export default ErrorMessage
