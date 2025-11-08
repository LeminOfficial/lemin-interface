import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Coins } from 'lucide-react';
import type { Token } from '../../types';

interface TokenSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTokenSelect: (tokenAddress: string) => void;
  tokens: Token[];
  selectedTokenAddress: string;
  network?: string;
}

export const TokenSelectionModal = ({
  isOpen,
  onClose,
  onTokenSelect,
  tokens,
  selectedTokenAddress,
  network = '',
}: TokenSelectionModalProps) => {
  const [selectedToken, setSelectedToken] = useState(selectedTokenAddress);

  const handleTokenSelect = (tokenAddress: string) => {
    setSelectedToken(tokenAddress);
  };

  const handleConfirm = () => {
    if (selectedToken) {
      onTokenSelect(selectedToken);
      onClose();
    }
  };

  const getSelectedTokenName = () => {
    const token = tokens.find((t) => t.address === selectedToken);
    return token?.name || 'Select Token';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bw-card bw-shadow-md">
        <DialogHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bw-bg-accent rounded-xl">
              <Coins className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-foreground">
                Select Token
              </DialogTitle>
              <DialogDescription className="text-muted-foreground mt-1">
                Choose the token for your payment stream
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-3 py-4 max-h-80 overflow-y-auto">
          {tokens.map((token) => (
            <div
              key={token.address}
              onClick={() => handleTokenSelect(token.address)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 bw-interactive ${
                selectedToken === token.address
                  ? 'bw-accent-glow bg-primary/5 bw-subtle-pattern'
                  : 'border-border hover:border-primary/50 bg-card'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Coins className="h-5 w-5 bw-text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-foreground">
                        {token.name}
                      </h3>
                      {network === 'arc-testnet' &&
                        token.address === 'native' && (
                          <span className="text-xs bg-primary/10 bw-text-accent px-2 py-1 rounded font-medium">
                            Native
                          </span>
                        )}
                    </div>
                    {token.symbol && (
                      <p className="text-sm text-muted-foreground">
                        {token.symbol}
                      </p>
                    )}
                  </div>
                </div>
                {selectedToken === token.address && (
                  <CheckCircle2 className="h-5 w-5 bw-text-accent" />
                )}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="pt-4 space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="bw-button-secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedToken}
            className="bw-button-primary bw-interactive"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Select {getSelectedTokenName()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
