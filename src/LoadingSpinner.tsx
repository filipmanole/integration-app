import { Loader2 } from 'lucide-react';

type LoadingSpinnerProps = {
  size?: number;
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size }) => (
  <Loader2 className={`mr-2 size-${size ?? 4} animate-spin`} />
);
