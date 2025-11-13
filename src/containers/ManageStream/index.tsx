import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCelo } from '../../hooks/useCelo';
import type { StreamDetails } from '../../types';
import { StreamCard } from '../../components/stream/StreamCard';
import { ConnectWalletPrompt } from '@/components/ConnectWalletPrompt';
import { StreamFilters } from '../../components/stream/StreamFilters';
import { EmptyStreamState } from '../../components/stream/EmptyStreamState';

interface UserStream {
  streamId: string;
  stream: StreamDetails;
  type: 'sent' | 'received';
}

type SortOption =
  | 'newest'
  | 'oldest'
  | 'amount-high'
  | 'amount-low'
  | 'progress';
type FilterStatus = 'all' | 'active' | 'completed' | 'pending';

export const ManageStreams = () => {
  const navigate = useNavigate();
  const { isConnected, loading, address, connectWallet, getUserStreams } =
    useCelo();

  const [streams, setStreams] = useState<UserStream[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'sent' | 'received'>(
    'all',
  );
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isConnected && address) {
      fetchUserStreams();
    }
  }, [isConnected, address]);

  const fetchUserStreams = async () => {
    if (!address) return;

    setIsLoading(true);
    try {
      const userStreams = await getUserStreams(address);
      setStreams(userStreams);
    } catch (error) {
      console.error('Error fetching user streams:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

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

  const filteredAndSortedStreams = useMemo(() => {
    let filtered = streams.filter((stream) => {
      // Filter by tab
      if (activeTab !== 'all' && stream.type !== activeTab) return false;

      // Filter by status
      if (filterStatus !== 'all') {
        const now = Math.floor(Date.now() / 1000);
        const start = Number(stream.stream.startTime);
        const stop = Number(stream.stream.stopTime);
        const isActive = now >= start && now < stop;
        const isCompleted = now >= stop;
        const isPending = now < start;

        if (filterStatus === 'active' && !isActive) return false;
        if (filterStatus === 'completed' && !isCompleted) return false;
        if (filterStatus === 'pending' && !isPending) return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const streamId = stream.streamId.toLowerCase();
        const sender = stream.stream.sender.toLowerCase();
        const recipient = stream.stream.recipient.toLowerCase();
        const symbol = stream.stream.tokenSymbol.toLowerCase();

        return (
          streamId.includes(query) ||
          sender.includes(query) ||
          recipient.includes(query) ||
          symbol.includes(query)
        );
      }

      return true;
    });

    // Sort streams
    filtered.sort((a, b) => {
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
          const progressA = calculateProgress(a.stream);
          const progressB = calculateProgress(b.stream);
          return progressB - progressA;
        default:
          return 0;
      }
    });

    return filtered;
  }, [streams, activeTab, filterStatus, searchQuery, sortBy]);

  const getStreamCounts = () => {
    const sent = streams.filter((s) => s.type === 'sent').length;
    const received = streams.filter((s) => s.type === 'received').length;
    const active = streams.filter((s) => {
      const now = Math.floor(Date.now() / 1000);
      const start = Number(s.stream.startTime);
      const stop = Number(s.stream.stopTime);
      return now >= start && now < stop;
    }).length;
    const completed = streams.filter((s) => {
      const now = Math.floor(Date.now() / 1000);
      const stop = Number(s.stream.stopTime);
      return now >= stop;
    }).length;
    return { sent, received, active, completed, total: streams.length };
  };

  const counts = getStreamCounts();

  if (!isConnected) {
    return (
      <ConnectWalletPrompt text="Please connect your wallet to manage your streams." />
    );
  }

  return (
    <div className="w-full py-6">
      <div className="mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">My Streams</h1>
            <p className="text-lg text-muted-foreground">
              Manage all your payment streams
            </p>
          </div>

          {/* Quick Stats */}
          {streams.length > 0 && (
            <div className="flex justify-center">
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-muted-foreground">
                    Active: {counts.active}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">
                    Completed: {counts.completed}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-muted-foreground">
                    Total: {counts.total}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <StreamFilters
          activeTab={activeTab}
          onTabChange={setActiveTab}
          sortBy={sortBy}
          onSortChange={setSortBy}
          filterStatus={filterStatus}
          onFilterStatusChange={setFilterStatus}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          counts={counts}
          showFilters={streams.length > 0}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Loading Streams
              </h3>
              <p className="text-muted-foreground">
                Fetching your streams from blockchain...
              </p>
            </div>
          </div>
        )}

        {/* Results Summary */}
        {!isLoading && streams.length > 0 && (
          <div className="flex justify-between items-center text-sm text-muted-foreground px-4">
            <span>
              Showing {filteredAndSortedStreams.length} of {streams.length}{' '}
              streams
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            {filteredAndSortedStreams.length > 0 && (
              <span>Sorted by {sortBy.replace('-', ' ')}</span>
            )}
          </div>
        )}

        {/* Streams List */}
        {!isLoading && (
          <div className="space-y-4">
            {filteredAndSortedStreams.length === 0 ? (
              <EmptyStreamState
                hasFilters={searchQuery !== '' || filterStatus !== 'all'}
                searchQuery={searchQuery}
                activeTab={activeTab}
                onCreateStream={() => navigate('/create-stream')}
                onClearFilters={() => {
                  setSearchQuery('');
                  setFilterStatus('all');
                }}
              />
            ) : (
              <div className="space-y-3 px-4">
                {filteredAndSortedStreams.map((userStream) => {
                  const { streamId, stream, type } = userStream;
                  const progress = calculateProgress(stream);
                  const now = Math.floor(Date.now() / 1000);
                  const start = Number(stream.startTime);
                  const stop = Number(stream.stopTime);
                  const isActive = now >= start && now < stop;
                  const isCompleted = now >= stop;

                  return (
                    <StreamCard
                      key={streamId}
                      stream={stream}
                      progress={progress}
                      isActive={isActive}
                      isCompleted={isCompleted}
                      formatAddress={formatAddress}
                      onClick={handleStreamClick}
                      streamType={type}
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
