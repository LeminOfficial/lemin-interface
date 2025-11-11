import React, { useMemo } from 'react';
import { ethers } from 'ethers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SummaryItem } from '@/components/SummaryItem';
import { StreamStatus } from '../../components/stream/StreamStatus';
import { StreamAmount } from '../../components/stream/StreamAmount';
import { StreamButton } from '../../components/stream/StreamButton';

interface StreamPreviewProps {
  recipient?: string;
  amount?: string;
  tokenAddress?: string;
  startDate?: Date;
  duration?: string;
  durationUnit?: 'days' | 'weeks' | 'months';
  senderAddress?: string;
  cancellable?: boolean;
  activeTokens?: any[];
  network?: string;
  getTokenDisplayName?: (token: any) => string;
}

const StreamPreview = ({
  recipient,
  amount,
  tokenAddress,
  startDate,
  duration,
  durationUnit,
  senderAddress,
  cancellable = false,
  activeTokens = [],
  network = '',
  getTokenDisplayName,
}: StreamPreviewProps) => {
  // Compute summary
  const summary = useMemo(() => {
    if (
      !recipient ||
      !tokenAddress ||
      !amount ||
      !startDate ||
      !duration ||
      !ethers.isAddress(recipient)
    ) {
      return null;
    }

    const parsedAmount = parseFloat(amount);
    const parsedDuration = parseInt(duration, 10);

    if (
      isNaN(parsedAmount) ||
      parsedAmount <= 0 ||
      isNaN(parsedDuration) ||
      parsedDuration <= 0
    ) {
      return null;
    }

    const parsedStartDate = startDate;
    const stopDate = new Date(parsedStartDate);

    if (durationUnit === 'days') {
      stopDate.setDate(stopDate.getDate() + parsedDuration);
    } else if (durationUnit === 'weeks') {
      stopDate.setDate(stopDate.getDate() + parsedDuration * 7);
    } else if (durationUnit === 'months') {
      stopDate.setMonth(stopDate.getMonth() + parsedDuration);
    }

    const totalSeconds =
      (stopDate.getTime() - parsedStartDate.getTime()) / 1000;
    const ratePerSecond = totalSeconds > 0 ? parsedAmount / totalSeconds : 0;
    const selectedToken = activeTokens.find(
      (t: any) => t.address === tokenAddress,
    );

    const displayName = getTokenDisplayName
      ? getTokenDisplayName(selectedToken)
      : selectedToken?.name || '';

    return {
      recipient,
      amount: `${amount}`,
      tokenName: displayName,
      startDate: parsedStartDate.toLocaleString(),
      stopDate: stopDate.toLocaleString(),
      rate: `${ratePerSecond.toPrecision(6)} ${displayName || 'tokens'}/sec`,
    };
  }, [
    recipient,
    amount,
    tokenAddress,
    startDate,
    duration,
    durationUnit,
    activeTokens,
    getTokenDisplayName,
  ]);

  const isValid = !!summary;
  const tokenName =
    summary?.tokenName ||
    (activeTokens.length > 0 ? activeTokens[0].name : 'CELO');
  const displayStartDate = summary?.startDate;
  const displayStopDate = summary?.stopDate;
  const displayRate = summary?.rate;

  // All possible items - show immediately when available
  const allItems = [
    // Always show these with defaults
    {
      label: 'Token',
      value: tokenName,
      type: 'token' as const,
      show: true,
    },
    { label: 'Model', value: 'Linear', type: 'default' as const, show: true },
    {
      label: 'Start Date',
      value: displayStartDate || new Date().toISOString(),
      type: 'date' as const,
      show: true,
    },
    {
      label: 'Cancellable',
      value: cancellable,
      type: 'boolean' as const,
      show: true,
    },

    // Show these only when filled
    {
      label: 'From',
      value: senderAddress,
      type: 'address' as const,
      show: !!senderAddress,
    },
    {
      label: 'To',
      value: recipient,
      type: 'address' as const,
      show: !!recipient,
    },
    {
      label: 'End Date',
      value: displayStopDate,
      type: 'date' as const,
      show: !!displayStopDate,
    },
    {
      label: 'Flow Rate',
      value: displayRate,
      type: 'rate' as const,
      show: !!displayRate,
    },
  ];

  const summaryItems = allItems.filter((item) => item.show);

  return (
    <div className="space-y-4">
      {/* Details Card */}
      <Card className="bw-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
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
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <CardTitle className="text-sm text-foreground">
                Stream Details
              </CardTitle>
            </div>
            <StreamStatus isValid={isValid} />
          </div>
        </CardHeader>

        <CardContent className="space-y-2 pt-0">
          {summaryItems.map((item, index) => (
            <SummaryItem
              key={index}
              label={item.label}
              value={item.value!}
              type={item.type}
            />
          ))}
        </CardContent>
      </Card>

      {/* Amount Card */}
      <StreamAmount amount={amount} tokenName={tokenName} />

      {/* Create Button */}
      <StreamButton isValid={isValid} />

      {/* Success Message */}
      {isValid && (
        <Card className="bw-card bg-primary/5 bw-border-accent">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <svg
                className="h-3 w-3 bw-text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs bw-text-accent font-medium">
                Ready to create stream
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StreamPreview;
