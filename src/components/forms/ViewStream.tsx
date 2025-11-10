import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCelo } from '../../hooks/useCelo';
import type { StreamDetails } from '../../types';
import { WalletIcon } from '../icons';
import { StreamSearchForm } from '../stream/StreamSearchForm';
import { StreamNotFound } from '../stream/StreamNotFound';
import { StreamCard } from '../stream/StreamCard';
import { StreamSearchLoading } from '../stream/StreamSearchLoading';

export const ViewStream = () => {
  const navigate = useNavigate();
  const {
    isConnected,
    loading,
    getStreamDetails,
    connectWallet,
  } = useCelo();
  
  const [streamId, setStreamId] = useState('');
  const [searchResults, setSearchResults] = useState<StreamDetails[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!streamId.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    const details = await getStreamDetails(streamId);
    if (details) {
      setSearchResults([details]);
    } else {
      setSearchResults([]);
    }
    
    setIsSearching(false);
  };

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const calculateProgress = (streamDetails: StreamDetails) => {
    const now = Math.floor(Date.now() / 1000);
    const start = Number(streamDetails.startTime);
    const stop = Number(streamDetails.stopTime);
    if (now <= start) return 0;
    if (now >= stop) return 100;
    return ((now - start) / (stop - start)) * 100;
  };


  const handleStreamClick = (id: string) => {
    navigate(`/stream/${id}`);
  };

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center py-24 px-8 bw-card mt-4 w-full">
          <WalletIcon className="h-16 w-16 mx-auto bw-text-accent mb-4" />
          <h2 className="text-3xl font-semibold mb-3 text-foreground">Connect Your Wallet</h2>
          <p className="text-muted-foreground mb-8">Please connect your wallet to search and manage streams.</p>
          <button onClick={connectWallet} disabled={loading} className="bw-button-primary px-8 py-3">
            {loading ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-6">
      <div className="mx-auto space-y-6">
        <StreamSearchForm
          streamId={streamId}
          isSearching={isSearching}
          onStreamIdChange={setStreamId}
          onSubmit={handleSearch}
        />

        {/* Results */}
        {isSearching && (
          <StreamSearchLoading />
        )}
        
        {hasSearched && !isSearching && (
          <div className="space-y-3">
            {searchResults.length === 0 ? (
              <StreamNotFound streamId={streamId} />
            ) : (
              <div className="space-y-3">
                {searchResults.map((stream) => {
                  const progress = calculateProgress(stream);
                  const now = Math.floor(Date.now() / 1000);
                  const start = Number(stream.startTime);
                  const stop = Number(stream.stopTime);
                  const isActive = now >= start && now < stop;
                  const isCompleted = now >= stop;

                  return (
                    <StreamCard
                      key={stream.id}
                      stream={stream}
                      progress={progress}
                      isActive={isActive}
                      isCompleted={isCompleted}
                      formatAddress={formatAddress}
                      onClick={handleStreamClick}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};