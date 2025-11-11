import React from 'react';
import { Card, CardContent } from '../ui/card';

interface StreamAmountProps {
  amount?: string;
  tokenName?: string;
}

export const StreamAmount = ({ amount, tokenName }: StreamAmountProps) => (
  <Card className={` bg-primary/10 border-primary/30`}>
    <CardContent className="p-4 flex justify-between items-center">
      <span className="text-xs text-muted-foreground">Total Amount</span>
      <span
        className={`text-lg font-bold ${
          amount ? 'bw-text-accent' : 'text-muted-foreground'
        }`}
      >
        {amount ? `${amount} ${tokenName || 'CELO'}` : '0'}
      </span>
    </CardContent>
  </Card>
);
