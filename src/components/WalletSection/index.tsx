import { useWeb3 } from '@/hooks/useWeb3';
import { WalletIcon } from '@/components/icons';

const truncateAddress = (addr: string) =>
  `${addr.slice(0, 6)}...${addr.slice(-4)}`;

export const WalletSection = () => {
  const { address, isConnected, loading, connectWallet } = useWeb3();

  if (isConnected && address) {
    return (
      <div className="p-4 border-t border-neutral-100 dark:border-neutral-800/60">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
          {/* Avatar/Status */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-brand-base/10 flex items-center justify-center">
              <WalletIcon className="w-5 h-5 text-brand-base" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-neutral-800" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-neutral-800 dark:text-white">
              Connected
            </p>
            <p className="text-xs font-mono text-neutral-500 truncate">
              {truncateAddress(address)}
            </p>
          </div>

          {/* Disconnect hint */}
          <button
            onClick={connectWallet}
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            title="Disconnect"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border-t border-neutral-100 dark:border-neutral-800/60">
      <button
        onClick={connectWallet}
        disabled={loading}
        className={`
          w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
          bg-brand-base text-white font-semibold text-sm
          hover:bg-brand-base/90 transition-colors
          ${loading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {loading ? (
          <>
            <svg
              className="w-5 h-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <WalletIcon className="w-5 h-5" />
            <span>Connect Wallet</span>
          </>
        )}
      </button>
    </div>
  );
};

export default WalletSection;
