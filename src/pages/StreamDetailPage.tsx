import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useCelo } from '../hooks/useCelo';
import { Layout } from '../components/layout';
import type { StreamDetails } from '../types';
import { ExternalLinkIcon, WalletIcon } from '../components/icons';
import { Input } from '../components/common';
import EthereumIdenticon from '../components/common/Identicon';
import { formatAmount } from '../utils/formatAmount';

export const StreamDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    isConnected,
    address,
    loading,
    getStreamDetails,
    withdrawFromStream,
    cancelStream,
    topUpStream,
    connectWallet,
    activeNetwork,
  } = useCelo();
  
  const [streamDetails, setStreamDetails] = useState<StreamDetails | null>(null);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id && isConnected) {
      fetchStreamDetails();
    }
  }, [id, isConnected]);

  const fetchStreamDetails = async () => {
    if (!id) return;
    setIsLoading(true);
    const details = await getStreamDetails(id);
    setStreamDetails(details);
    setIsLoading(false);
  };

  const handleWithdraw = async () => {
    if (!streamDetails || streamDetails.withdrawableAmount === 0n) return;
    const success = await withdrawFromStream(id!, streamDetails.withdrawableAmount);
    if (success) {
      fetchStreamDetails();
    }
  };

  const formatDate = (timestamp: bigint) => new Date(Number(timestamp) * 1000).toLocaleString();

  const calculateProgress = () => {
    if (!streamDetails) return 0;
    const now = Math.floor(Date.now() / 1000);
    const start = Number(streamDetails.startTime);
    const stop = Number(streamDetails.stopTime);
    if (now <= start) return 0;
    if (now >= stop) return 100;
    return ((now - start) / (stop - start)) * 100;
  };

  if (!isConnected) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center py-24 px-8 bw-card max-w-2xl bw-shadow">
            <WalletIcon className="h-16 w-16 mx-auto bw-text-accent mb-4" />
            <h2 className="text-3xl font-semibold mb-3 text-foreground">Connect Your Wallet</h2>
            <p className="text-muted-foreground mb-8">Please connect your wallet to view stream details.</p>
            <button onClick={connectWallet} disabled={loading} className="bw-button-primary px-8 py-3">
              {loading ? 'Connecting...' : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading stream details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!streamDetails) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center py-24 px-8 bw-card max-w-2xl bw-shadow">
            <div className="p-4 bg-destructive/10 rounded-xl w-fit mx-auto mb-4">
              <svg className="h-8 w-8 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">Stream Not Found</h2>
            <p className="text-muted-foreground mb-8">The stream with ID {id} could not be found.</p>
            <button onClick={() => navigate('/manage-streams')} className="bw-button-primary px-8 py-3">
              Back to Search
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const progress = calculateProgress();
  const blockExplorerUrl = activeNetwork.blockExplorerUrls[0];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/manage-streams')}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Stream #{streamDetails.id}</h1>
              <p className="text-muted-foreground">Stream details and management</p>
            </div>
          </div>
          <div className="status-active px-3 py-1 rounded text-xs font-medium">Active</div>
        </div>

        {/* Stream Details Card */}
        <div className="bw-card p-6 space-y-6 bw-shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="Sender" value={streamDetails.sender} isAddress={true} />
            <InfoItem label="Recipient" value={streamDetails.recipient} isAddress={true} />
            <InfoItem
              label="Total Amount"
              value={formatAmount(streamDetails.totalAmount, streamDetails.tokenDecimals, streamDetails.tokenSymbol)}
            />
            <InfoItem
              label="Remaining"
              value={formatAmount(streamDetails.remainingBalance, streamDetails.tokenDecimals, streamDetails.tokenSymbol)}
            />
            <InfoItem label="Start Time" value={formatDate(streamDetails.startTime)} />
            <InfoItem label="Stop Time" value={formatDate(streamDetails.stopTime)} />
          </div>

          <a
            href={`${blockExplorerUrl}/token/${streamDetails.tokenAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bw-text-accent hover:text-primary/80 text-sm font-medium"
          >
            View Token on Block Explorer
            <ExternalLinkIcon className="h-4 w-4" />
          </a>

          {/* Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-foreground">Progress</label>
              <span className="text-sm font-mono bw-text-accent">{progress.toFixed(2)}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bw-bg-accent h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Withdrawable Amount */}
          <div className="p-4 bg-primary/5 rounded-lg bw-border-accent">
            <div className="text-sm text-muted-foreground mb-1">Withdrawable Amount</div>
            <div className="text-2xl font-semibold text-foreground">
              {formatAmount(streamDetails.withdrawableAmount, streamDetails.tokenDecimals, streamDetails.tokenSymbol)}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {address?.toLowerCase() === streamDetails.recipient.toLowerCase() && (
              <button
                onClick={handleWithdraw}
                disabled={loading || streamDetails.withdrawableAmount === 0n}
                className="w-full bw-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Withdrawing...' : 'Withdraw Available Funds'}
              </button>
            )}

            {address?.toLowerCase() === streamDetails.sender.toLowerCase() && (
              <>
                <div className="flex gap-4">
                  <Input
                    type="text"
                    value={topUpAmount}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9.]/g, '');
                      const parts = numericValue.split('.');
                      if (parts.length <= 2) {
                        setTopUpAmount(numericValue);
                      }
                    }}
                    placeholder="Amount to top up"
                    className="flex-1 bw-input-large"
                  />
                  <button
                    onClick={async () => {
                      if (!topUpAmount) return;
                      const amount = ethers.parseUnits(topUpAmount, streamDetails.tokenDecimals);
                      const success = await topUpStream(id!, amount);
                      if (success) {
                        setTopUpAmount('');
                        fetchStreamDetails();
                      }
                    }}
                    disabled={loading || !topUpAmount}
                    className="bw-button-secondary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Top Up
                  </button>
                </div>

                <button
                  onClick={async () => {
                    if (window.confirm('Are you sure you want to cancel this stream?')) {
                      const success = await cancelStream(id!);
                      if (success) {
                        fetchStreamDetails();
                      }
                    }
                  }}
                  disabled={loading}
                  className="w-full bw-button-secondary bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Cancel Stream'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const InfoItem = ({ label, value, isAddress = false }: { label: string; value: string; isAddress?: boolean }) => {
  const formatAddr = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  
  return (
    <div className="p-3 bg-secondary rounded-lg">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      {isAddress ? (
        <div className="flex items-center space-x-2">
          <EthereumIdenticon address={value} diameter={24} />
          <p className="text-sm font-medium text-foreground font-mono">{formatAddr(value)}</p>
        </div>
      ) : (
        <p className="text-sm font-medium text-foreground font-mono">{value}</p>
      )}
    </div>
  );
};