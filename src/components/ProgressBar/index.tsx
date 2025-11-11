import React from 'react';

interface StreamProgressBarProps {
  progress: number;
}

export const StreamProgressBar = ({ progress }: StreamProgressBarProps) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex-1 bg-secondary/70 rounded-full h-2.5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out bg-green-500"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <div className="flex items-center space-x-1">
        <span className="text-xs font-semibold text-foreground">
          {progress.toFixed(0)}%
        </span>
        {progress >= 100 && (
          <svg
            className="w-3 h-3 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </div>
  );
};
