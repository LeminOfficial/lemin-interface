import { useState } from 'react';
import { Button } from '../ui/button';

export const StreamBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-brand-gray/10 rounded-2xl p-6 mb-4 overflow-hidden border border-blue-100 dark:border-blue-900">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 right-32 w-32 h-32 bg-brand-base rounded-full translate-y-1/2"></div>

      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-brand-base dark:text-blue-100 mb-2">
          All stream are Here!
        </h2>
        <p className="text-brand-base/70 dark:text-blue-300 max-w-2xl mb-4">
          Keep all your present, future, and past streams under your touch.
          Enjoy secure, efficient, and user-friendly experience of token
          streaming.
        </p>
        <Button variant="outline">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          FAQ
        </Button>
      </div>
    </div>
  );
};
