import React from 'react';
import { Card, CardContent } from '../ui/card';

interface StreamAmountProps {
  amount?: string;
  tokenName?: string;
}

export const StreamAmount = ({ amount, tokenName }: StreamAmountProps) => (
  <Card className={`bg-[#f6e2ff] text-[#8649ff] border-[#bd66ff]  rounded-xl`}>
    <CardContent className="p-4 flex justify-between items-center">
      <span className="text-base font-medium ">Total Amount</span>
      <span className={`text-lg font-semibold`}>
        {amount ? `${amount} ${tokenName || 'CELO'}` : '0'}
      </span>
    </CardContent>
  </Card>
);
