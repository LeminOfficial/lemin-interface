import React from 'react';
import { WalletIcon } from '../icons';

interface ConnectWalletPromptProps {
  onConnect: () => void;
  loading?: boolean;
}

export const ConnectWalletPrompt = ({ 
  onConnect, 
  loading = false 
}) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center py-24 px-8 bw-card w-full mt-4">
        <WalletIcon className="h-16 w-16 mx-auto bw-text-accent mb-4" />
        <h2 className="text-3xl font-semibold mb-3 text-foreground">
          Connect Your Wallet
        </h2>
        <p className="text-muted-foreground mb-8">
          Please connect your wallet to manage your streams.
        </p>
        <button 
          onClick={onConnect} 
          disabled={loading} 
          className="bw-button-primary px-8 py-3"
        >
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      </div>
    </div>
  );
};
