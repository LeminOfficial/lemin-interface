import React from 'react';

interface StreamAmountDisplayProps {
  totalAmount: string;
  withdrawableAmount: string;
}

export const StreamAmountDisplay = ({
  totalAmount,
  withdrawableAmount,
}) => {
  // Function to split amount and token symbol
  const parseAmount = (amountString: string) => {
    const parts = amountString.trim().split(' ');
    if (parts.length >= 2) {
      const amount = parts.slice(0, -1).join(' ');
      const symbol = parts[parts.length - 1];
      return { amount, symbol };
    }
    return { amount: amountString, symbol: '' };
  };

  const totalParsed = parseAmount(totalAmount);
  const withdrawableParsed = parseAmount(withdrawableAmount);

  return (
    <div className="flex items-center space-x-4">
      {/* Total Amount */}
      <div>
        <div className="text-xs text-muted-foreground mb-1">Total</div>
        <div className="flex items-baseline space-x-1">
          <span className="text-sm font-bold text-foreground">{totalParsed.amount}</span>
          <span className="text-xs text-muted-foreground">{totalParsed.symbol}</span>
        </div>
      </div>
      
      {/* Separator */}
      <div className="w-px h-8 bg-secondary"></div>
      
      {/* Available Amount */}
      <div>
        <div className="text-xs text-muted-foreground mb-1">Available</div>
        <div className="flex items-baseline space-x-1">
          <span className="text-sm font-bold bw-text-accent">{withdrawableParsed.amount}</span>
          <span className="text-xs text-muted-foreground">{withdrawableParsed.symbol}</span>
        </div>
      </div>
    </div>
  );
};