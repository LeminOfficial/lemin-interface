import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  streamId: string | null;
  onViewStream?: () => void;
}

export const SuccessModal = ({
  isOpen,
  onClose,
  streamId,
  onViewStream,
}: SuccessModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bw-card bw-shadow-md">
        <DialogHeader className="pb-4">
          <div className="flex flex-col items-center text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 bw-bg-accent rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <DialogTitle className="text-2xl font-bold text-foreground mb-2">
              Stream Created Successfully!
            </DialogTitle>

            <p className="text-muted-foreground">
              Your payment stream has been created and is now active on the
              blockchain.
            </p>
          </div>
        </DialogHeader>

        <div className="py-4">
          {/* Stream ID Display */}
          {streamId && (
            <div className="bg-primary/5 border border-primary/30 rounded-lg p-4 mb-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Stream ID</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl font-bold bw-text-accent font-mono">
                    #{streamId}
                  </span>
                  <button
                    onClick={() => navigator.clipboard.writeText(streamId)}
                    className="p-1 hover:bg-primary/10 rounded transition-colors"
                    title="Copy Stream ID"
                  >
                    <svg
                      className="w-4 h-4 text-muted-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Save this ID to manage your stream later
                </p>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">What's Next?</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bw-bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Your stream is now active and payments will flow automatically
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bw-bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <span>Recipients can withdraw available funds at any time</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bw-bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  You can manage, top up, or cancel the stream using the Stream
                  ID
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-4 space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="bw-button-secondary"
          >
            Create Another Stream
          </Button>
          {onViewStream && streamId && (
            <Button onClick={onViewStream} className="bw-button-primary">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              View Stream Details
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
