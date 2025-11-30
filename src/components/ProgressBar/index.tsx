import React from 'react';

interface StreamProgressBarProps {
  progress: number;
}

export const StreamProgressBar = ({ progress }: StreamProgressBarProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {Math.round(progress)}% {Math.round(progress) === 100 && 'Completed'}
        </span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-green-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
