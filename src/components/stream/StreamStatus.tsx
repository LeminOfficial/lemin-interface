import React from 'react';

interface StreamStatusProps {
  isValid: boolean;
}

export const StreamStatus = ({ isValid }: StreamStatusProps) => (
  <span className={`px-2 py-1 rounded text-xs font-medium ${
    isValid ? "bw-bg-accent text-white" : "bg-secondary text-muted-foreground"
  }`}>
    {isValid ? 'Ready' : 'Incomplete'}
  </span>
);