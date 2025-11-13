import React from 'react';
import { useCelo } from '@/hooks/useCelo';
import { WalletIcon } from '@/components/icons';

const truncateAddress = (addr: string) =>
  `${addr.slice(0, 6)}...${addr.slice(-4)}`;

export const WalletSection = () => {
  const { address, isConnected, loading, connectWallet } = useCelo();

  return (
    <div className="p-6 border-t border-border flex-shrink-0">
      <button
        type="button"
        onClick={connectWallet}
        disabled={loading}
        className={`w-full p-4 rounded-lg font-semibold transition-all duration-200 ${
          isConnected
            ? 'bw-button-secondary bw-text-accent bw-border-accent'
            : 'bw-button-primary'
        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className="flex items-center justify-center space-x-3">
          <WalletIcon
            className={`h-5 w-5 flex-shrink-0 ${
              isConnected ? 'text-primary' : ''
            }`}
          />

          <div className="flex-1 text-center">
            <div
              className={`text-sm font-semibold ${
                isConnected ? 'text-primary' : ''
              }`}
            >
              {loading && !address
                ? 'Connecting...'
                : isConnected
                ? 'Connected'
                : 'Connect Wallet'}
            </div>
            {isConnected && address && (
              <div className="text-xs font-mono mt-1 text-primary">
                {truncateAddress(address)}
              </div>
            )}
          </div>

          {isConnected && <div className="w-2 h-2 bg-primary rounded-full" />}
        </div>
      </button>
    </div>
  );
};

export default WalletSection;
