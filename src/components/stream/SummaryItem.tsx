import React from 'react';

interface SummaryItemProps {
  label: string;
  value: string | boolean;
  type?: 'address' | 'token' | 'rate' | 'date' | 'boolean' | 'default';
}

export const SummaryItem = ({ label, value, type = 'default' }: SummaryItemProps) => {
  const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const getValueStyles = () => {
    const baseStyles = "text-xs px-2 py-1 rounded font-medium";
    
    switch (type) {
      case 'address':
        return `${baseStyles} font-mono bg-secondary/50`;
      case 'token':
        return `${baseStyles} bw-text-accent bg-primary/10 font-semibold`;
      case 'rate':
        return `${baseStyles} font-mono bw-text-accent bg-primary/10 font-bold`;
      case 'date':
        return `${baseStyles} bg-secondary/50`;
      case 'boolean':
        return `${baseStyles} ${value ? 'bg-primary/10 bw-text-accent' : 'bg-secondary/50 text-muted-foreground'}`;
      default:
        return `${baseStyles} bg-secondary/50`;
    }
  };

  const displayValue = type === 'address' ? truncateAddress(value as string) : 
                     type === 'date' ? new Date(value as string).toLocaleDateString() : 
                     type === 'boolean' ? (value ? 'Yes' : 'No') :
                     value;

  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={getValueStyles()}>{displayValue}</span>
    </div>
  );
};