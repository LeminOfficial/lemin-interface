import React from 'react';
import { WalletIcon } from '../icons';
import WalletSection from '../WalletSection';

interface ConnectWalletPromptProps {
  text?: string;
}

export const ConnectWalletPrompt = ({ text }: ConnectWalletPromptProps) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center py-24 px-8 bw-card w-full mt-4">
        <WalletIcon className="h-16 w-16 mx-auto bw-text-accent mb-4" />
        <h2 className="text-3xl font-semibold mb-3 text-foreground">
          Connect Your Wallet
        </h2>
        <p className="text-muted-foreground mb-8">{text}</p>
        <div className="w-1/3 m-auto">
          <WalletSection />
        </div>
      </div>
    </div>
  );
};
