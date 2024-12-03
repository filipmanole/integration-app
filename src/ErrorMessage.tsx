import { CircleSlash } from 'lucide-react';

type ErrorMessageProps = {
  message?: string;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="text-red-500 text-sm flex items-center">
    <CircleSlash className="mr-2 size-4 animate-spin" color="#ef4444" />
    {message}
  </div>
);
