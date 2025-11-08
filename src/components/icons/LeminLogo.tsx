import React from 'react';

interface LeminLogoProps {
  className?: string;
}

export const LeminLogo = ({ className = 'h-10 w-10' }: LeminLogoProps) => {
  return (
    <div className={`${className} relative`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Main circle with green accent color */}
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="#3a5a40"
          className="drop-shadow-sm"
        />

        {/* Flow lines representing payment streams */}
        <path
          d="M8 20 Q15 15, 22 20 Q29 25, 36 20"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        <path
          d="M6 24 Q13 19, 20 24 Q27 29, 34 24"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Center dot */}
        <circle cx="20" cy="20" r="3" fill="white" />

        {/* Small accent dots for flow animation effect */}
        <circle cx="12" cy="18" r="1" fill="rgba(255,255,255,0.8)" />

        <circle cx="28" cy="22" r="1" fill="rgba(255,255,255,0.8)" />
      </svg>
    </div>
  );
};
