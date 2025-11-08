import React, { useState } from 'react';
import { ethers } from 'ethers';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';

interface AddressInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressConfirm: (address: string) => void;
  currentAddress: string;
}

export const AddressInputModal = ({
  isOpen,
  onClose,
  onAddressConfirm,
  currentAddress,
}: AddressInputModalProps) => {
  const [inputAddress, setInputAddress] = useState(currentAddress);
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    setInputAddress(address);
    setTouched(true);
    setIsValid(ethers.isAddress(address));
  };

  const handleConfirm = () => {
    if (isValid) {
      onAddressConfirm(inputAddress);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bw-card bw-shadow-md">
        <DialogHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bw-bg-accent rounded-xl">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-foreground">
                Enter Recipient Address
              </DialogTitle>
              <DialogDescription className="text-muted-foreground mt-1">
                Enter the recipient's blockchain address to receive the stream
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-3">
            <label
              htmlFor="address"
              className="text-base font-semibold text-foreground"
            >
              Recipient Address
            </label>
            <div className="relative">
              <Input
                id="address"
                placeholder="0x1234567890abcdef1234567890abcdef12345678"
                value={inputAddress}
                onChange={handleAddressChange}
                className={`bw-input-large font-mono pr-10 ${
                  touched && !isValid
                    ? 'border-destructive focus:border-destructive'
                    : ''
                } ${touched && isValid ? 'border-primary' : ''}`}
              />
              {inputAddress && (
                <button
                  type="button"
                  onClick={() => {
                    setInputAddress('');
                    setTouched(false);
                    setIsValid(false);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
            {touched && (
              <div className="mt-3">
                {isValid ? (
                  <div className="flex items-center text-sm bw-text-accent bg-primary/10 p-3 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span className="font-medium">Valid address format</span>
                  </div>
                ) : (
                  <div className="flex items-center text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                    <XCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span className="font-medium">
                      Invalid address format. Please check and try again.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
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
            disabled={!isValid}
            className="bw-button-primary bw-interactive"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Confirm Address
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
