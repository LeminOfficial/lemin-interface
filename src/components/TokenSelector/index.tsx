import { Label } from '@/components/ui/label';
import { TokenSelectionModal } from '@/components/modals';

interface TokenSelectorProps {
  tokenAddress: string;
  activeTokens: any[];
  network: string;
  isTokenModalOpen: boolean;
  setIsTokenModalOpen: (open: boolean) => void;
  handleTokenSelect: (address: string) => void;
  getTokenDisplayName: (token: any) => string;
}

export default function TokenSelector({
  tokenAddress,
  activeTokens,
  network,
  isTokenModalOpen,
  setIsTokenModalOpen,
  handleTokenSelect,
  getTokenDisplayName,
}: TokenSelectorProps) {
  return (
    <>
      <div className="space-y-3">
        <Label className="text-base font-semibold text-foreground">Token</Label>
        <div
          className="h-[52px] bg-gray-50 dark:bg-gray-900/20 border-2 border-border text-foreground rounded-lg px-4 py-3 transition-all duration-200 shadow-sm hover:border-primary/50 cursor-pointer flex items-center justify-between hover:bg-secondary/50"
          onClick={() => setIsTokenModalOpen(true)}
        >
          <div className="flex items-center space-x-3">
            <div className="p-1 bg-primary/10 rounded">
              <svg
                className="h-4 w-4 bw-text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <span
              className={
                tokenAddress
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground'
              }
            >
              {tokenAddress
                ? getTokenDisplayName(
                    activeTokens.find((t: any) => t.address === tokenAddress),
                  ) || 'Select token'
                : 'Click to select token'}
            </span>
          </div>
          <svg
            className="h-5 w-5 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <TokenSelectionModal
        isOpen={isTokenModalOpen}
        onClose={() => setIsTokenModalOpen(false)}
        onTokenSelect={handleTokenSelect}
        tokens={activeTokens}
        selectedTokenAddress={tokenAddress}
        network={network}
      />
    </>
  );
}
