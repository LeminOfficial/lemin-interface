import React from 'react';
import { SuccessIcon, ErrorIcon } from '../icons';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  show: boolean;
  onClose: () => void;
}

export const Notification = ({
  message,
  type,
  show,
  onClose,
}: NotificationProps) => {
  if (!show) {
    return null;
  }

  const isSuccess = type === 'success';
  const icon = isSuccess ? (
    <SuccessIcon className="h-5 w-5 text-accent" />
  ) : (
    <ErrorIcon className="h-5 w-5 text-error" />
  );
  const borderColor = isSuccess ? 'border-accent/30' : 'border-error/30';

  return (
    <div
      className={`fixed bottom-6 right-6 max-w-md bg-surface-primary border ${borderColor} text-primary py-3 px-4 rounded-lg shadow-lg flex items-center gap-3 z-50 transition-all duration-300 transform ${
        show
          ? 'translate-x-0 opacity-100 scale-100'
          : 'translate-x-full opacity-0 scale-95'
      }`}
    >
      <div className="flex-shrink-0">{icon}</div>
      <span className="flex-grow text-sm">{message}</span>
      <button
        onClick={onClose}
        className="flex-shrink-0 text-tertiary hover:text-primary text-xl leading-none"
      >
        &times;
      </button>
    </div>
  );
};
