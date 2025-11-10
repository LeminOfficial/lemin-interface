import React from 'react';

interface StreamStatusBadgeProps {
  isCompleted: boolean;
  isActive: boolean;
}

export const StreamStatusBadge = ({ isCompleted, isActive }: StreamStatusBadgeProps) => {
  const getStatusConfig = () => {
    if (isCompleted) {
      return {
        text: 'Completed',
        className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
        icon: (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )
      };
    }
    if (isActive) {
      return {
        text: 'Active',
        className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
        icon: (
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        )
      };
    }
    return {
      text: 'Pending',
      className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
      icon: (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    };
  };

  const { text, className, icon } = getStatusConfig();

  return (
    <span className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border ${className}`}>
      {icon}
      <span>{text}</span>
    </span>
  );
};