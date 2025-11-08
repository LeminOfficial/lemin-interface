import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useCelo } from '../../hooks/useCelo';
import { StreamPreview } from '../stream';
import { LoadingModal, SuccessModal } from '../modals';
import { DateTimePicker } from '../common';
import StreamingModelSelector from './StreamingModelSelector';
import RecipientAddressInput from './RecipientAddressInput';
import TokenSelector from './TokenSelector';
import CancellableStreamToggle from './CancellableStreamToggle';
import DurationInput from './DurationInput';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

export const CreateStreamForm = () => {
  // Hooks
  const navigate = useNavigate();
  const {
    isConnected,
    loading,
    createStream,
    connectWallet,
    activeTokens,
    address,
    network,
  } = useCelo();

  // Form State
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenDecimals, setTokenDecimals] = useState(18);
  const [startDate, setStartDate] = useState<Date>(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 5);
    return now;
  });
  const [duration, setDuration] = useState('1');
  const [durationUnit, setDurationUnit] = useState<'days' | 'weeks' | 'months'>(
    'months',
  );
  const [streamingModel, setStreamingModel] = useState('linear');
  const [cancellable, setCancellable] = useState(false);

  // Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [createdStreamId, setCreatedStreamId] = useState<string | null>(null);

  // Effects
  useEffect(() => {
    if (activeTokens.length > 0 && !tokenAddress) {
      setTokenAddress(activeTokens[0].address);
      setTokenDecimals(activeTokens[0].decimals);
    }
  }, [activeTokens, tokenAddress]);

  // Handlers
  const handleSubmit = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }

    if (!ethers.isAddress(recipient)) {
      alert('Invalid recipient address provided.');
      return;
    }

    try {
      // Show loading modal
      setIsLoadingModalOpen(true);

      const parsedStartDate = startDate;
      const stopDate = new Date(parsedStartDate);
      const durationNum = parseInt(duration, 10);

      if (durationUnit === 'days') {
        stopDate.setDate(stopDate.getDate() + durationNum);
      } else if (durationUnit === 'weeks') {
        stopDate.setDate(stopDate.getDate() + durationNum * 7);
      } else if (durationUnit === 'months') {
        stopDate.setMonth(stopDate.getMonth() + durationNum);
      }
      console.log(tokenDecimals);

      const amountInWei = ethers.parseUnits(amount, tokenDecimals);

      const streamId = await createStream(
        recipient,
        tokenAddress,
        amountInWei,
        parsedStartDate,
        stopDate,
      );

      // Hide loading modal
      setIsLoadingModalOpen(false);

      if (streamId !== null) {
        // Show success modal with stream ID
        setCreatedStreamId(streamId.toString());
        setIsSuccessModalOpen(true);
        resetForm();
      }
    } catch (error) {
      // Hide loading modal on error
      setIsLoadingModalOpen(false);
      console.error('Error creating stream:', error);
    }
  };

  const resetForm = () => {
    setRecipient('');
    setAmount('');
    setTokenAddress(activeTokens[0]?.address || '');
    setTokenDecimals(activeTokens[0].decimals);
    const now = new Date();
    now.setMinutes(now.getMinutes() + 5);
    setStartDate(now);
    setDuration('1');
    setDurationUnit('months');
  };

  const handleNumberInput = (value: string, setter: (val: string) => void) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    const parts = numericValue.split('.');
    if (parts.length <= 2) {
      setter(numericValue);
    }
  };

  const handleIntegerInput = (value: string, setter: (val: string) => void) => {
    const integerValue = value.replace(/[^0-9]/g, '');
    setter(integerValue);
  };

  const handleTokenSelect = (address: string) => {
    setTokenAddress(address);
    const selectedToken = activeTokens.find((t: any) => t.address === address);
    if (selectedToken) {
      setTokenDecimals(selectedToken.decimals);
    }
  };

  const getTokenDisplayName = (token: any) => {
    if (!token) return '';
    if (network === 'arc-testnet' && token.address === 'native') {
      return `${token.name} (Native)`;
    }
    return token.name;
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Modals */}
      <LoadingModal
        isOpen={isLoadingModalOpen}
        title="Creating Stream"
        message="Please confirm the transaction in your wallet and wait for it to be processed on the blockchain..."
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          setCreatedStreamId(null);
        }}
        streamId={createdStreamId}
        onViewStream={() => {
          if (createdStreamId) {
            navigate(`/stream/${createdStreamId}`);
          }
        }}
      />

      {/* Main Content */}
      <div className="flex-1 justify-start overflow-hidden">
        <div className="grid lg:grid-cols-6 gap-6 py-6 h-full">
          {/* Form Section - Scrollable */}
          <div className="lg:col-span-4 overflow-y-auto scrollbar-hide">
            <Card className="bw-card bw-shadow bw-subtle-pattern">
              <CardHeader className="pb-6">
                <div className="flex flex-col items-start">
                  <CardTitle className="text-2xl text-foreground font-bold">
                    Create Stream
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mt-1">
                    Set up continuous payments with precision
                  </CardDescription>
                </div>
                <Separator />
              </CardHeader>

              <CardContent className="space-y-8">
                <form
                  id="stream-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className="space-y-8"
                >
                  {/* Streaming Model Selection */}
                  <StreamingModelSelector
                    streamingModel={streamingModel}
                    setStreamingModel={setStreamingModel}
                  />

                  <Separator />

                  {/* Form Fields */}
                  <div className="space-y-6">
                    {/* Recipient Address */}
                    <RecipientAddressInput
                      recipient={recipient}
                      setRecipient={setRecipient}
                      isAddressModalOpen={isAddressModalOpen}
                      setIsAddressModalOpen={setIsAddressModalOpen}
                    />

                    {/* Two Column Layout */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-6">
                        {/* Token Selection */}
                        <TokenSelector
                          tokenAddress={tokenAddress}
                          activeTokens={activeTokens}
                          network={network}
                          isTokenModalOpen={isTokenModalOpen}
                          setIsTokenModalOpen={setIsTokenModalOpen}
                          handleTokenSelect={handleTokenSelect}
                          getTokenDisplayName={getTokenDisplayName}
                        />

                        {/* Total Amount */}
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-foreground">
                            Total Amount
                          </Label>
                          <Input
                            type="text"
                            value={amount}
                            onChange={(e) =>
                              handleNumberInput(e.target.value, setAmount)
                            }
                            placeholder="100"
                            className="bw-input-large"
                            required
                          />
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        {/* Start Date */}
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-foreground">
                            Start Date & Time
                          </Label>
                          <DateTimePicker
                            value={startDate}
                            onChange={setStartDate}
                            placeholder="Pick a date and time"
                          />
                        </div>

                        {/* Duration */}
                        <DurationInput
                          duration={duration}
                          durationUnit={durationUnit}
                          setDuration={setDuration}
                          setDurationUnit={setDurationUnit}
                          handleIntegerInput={handleIntegerInput}
                        />
                      </div>
                    </div>

                    {/* Cancellable Stream */}
                    <CancellableStreamToggle
                      cancellable={cancellable}
                      setCancellable={setCancellable}
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section - Fixed */}
          <div className="lg:col-span-2 overflow-hidden">
            <div className="sticky top-0">
              <StreamPreview
                recipient={recipient}
                amount={amount}
                tokenAddress={tokenAddress}
                startDate={startDate}
                duration={duration}
                durationUnit={durationUnit}
                senderAddress={address}
                cancellable={cancellable}
                activeTokens={activeTokens}
                network={network}
                getTokenDisplayName={getTokenDisplayName}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
