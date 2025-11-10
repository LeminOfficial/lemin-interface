import React from 'react';
import { Dialog, DialogContent } from '../ui/dialog';

interface LoadingModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
}

export const LoadingModal = ({
  isOpen,
  title = 'Processing Transaction',
  message = 'Please confirm the transaction in your wallet and wait for it to be processed...',
}: LoadingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[400px] bw-card bw-shadow-md">
        <div className="flex flex-col items-center text-center py-6">
          {/* Loading Animation */}
          <div className="relative mb-6">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-6 h-6 bw-text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {title}
          </h3>

          {/* Message */}
          <p className="text-sm text-muted-foreground mb-4 max-w-sm">
            {message}
          </p>

          {/* Steps */}
          <div className="w-full max-w-sm space-y-2">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bw-bg-accent rounded-full animate-pulse"></div>
              <span className="text-muted-foreground">
                Waiting for wallet confirmation...
              </span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-muted rounded-full"></div>
              <span className="text-muted-foreground">
                Processing on blockchain...
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
