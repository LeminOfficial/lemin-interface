import { useState, useEffect, useMemo, useCallback } from 'react';
import { useWeb3 } from './useWeb3';
import type {
  StreamDetails,
  UserStream,
  SortOption,
  StatusTab,
  StreamTypeFilter,
} from '@/types';

export const calculateProgress = (stream: StreamDetails): number => {
  const now = Math.floor(Date.now() / 1000);
  const start = Number(stream.startTime);
  const stop = Number(stream.stopTime);
  if (now <= start) return 0;
  if (now >= stop) return 100;
  return ((now - start) / (stop - start)) * 100;
};

export const getStreamStatus = (stream: StreamDetails) => {
  const now = Math.floor(Date.now() / 1000);
  const start = Number(stream.startTime);
  const stop = Number(stream.stopTime);
  return {
    isOngoing: now >= start && now < stop,
    isPending: now < start,
    isExpired: now >= stop,
  };
};

export const useStreams = () => {
  const { isConnected, address, getUserStreams } = useWeb3();

  const [streams, setStreams] = useState<UserStream[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusTab, setStatusTab] = useState<StatusTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [streamTypeFilter, setStreamTypeFilter] =
    useState<StreamTypeFilter>('all');

  const fetchStreams = useCallback(async () => {
    if (!address) return;
    setIsLoading(true);
    try {
      const userStreams = await getUserStreams(address);
      setStreams(userStreams);
    } catch (error) {
      console.error('Error fetching streams:', error);
    } finally {
      setIsLoading(false);
    }
  }, [address, getUserStreams]);

  useEffect(() => {
    if (isConnected && address) {
      fetchStreams();
    }
  }, [isConnected, address, fetchStreams]);

  const filteredStreams = useMemo(() => {
    return streams
      .filter((s) => {
        const status = getStreamStatus(s.stream);

        if (statusTab === 'ongoing' && !status.isOngoing) return false;
        if (statusTab === 'pending' && !status.isPending) return false;
        if (statusTab === 'expired' && !status.isExpired) return false;

        if (streamTypeFilter !== 'all' && s.type !== streamTypeFilter)
          return false;

        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          return (
            s.stream.sender.toLowerCase().includes(q) ||
            s.stream.recipient.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return Number(b.stream.startTime) - Number(a.stream.startTime);
          case 'oldest':
            return Number(a.stream.startTime) - Number(b.stream.startTime);
          case 'amount-high':
            return Number(b.stream.totalAmount) - Number(a.stream.totalAmount);
          case 'amount-low':
            return Number(a.stream.totalAmount) - Number(b.stream.totalAmount);
          case 'progress':
            return calculateProgress(b.stream) - calculateProgress(a.stream);
          default:
            return 0;
        }
      });
  }, [streams, statusTab, searchQuery, streamTypeFilter, sortBy]);

  return {
    isConnected,
    isLoading,
    streams: filteredStreams,
    statusTab,
    setStatusTab,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    streamTypeFilter,
    setStreamTypeFilter,
  };
};
