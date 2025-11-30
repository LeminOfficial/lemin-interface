import { useNavigate } from 'react-router-dom';
import { ConnectWalletPrompt } from '@/components/ConnectWalletPrompt';
import { StreamBanner } from '@/components/stream/StreamBanner';
import { Tabs } from '@/components/Tabs';
import { StreamListItem } from '@/components/stream/StreamListItem';
import { StreamFilterMenu } from '@/components/stream/StreamFilterMenu';
import { EmptyState } from '@/components/EmptyState';
import { LoadingState } from '@/components/LoadingState';
import { SearchInput } from '@/components/SearchInput';
import {
  useStreams,
  calculateProgress,
  getStreamStatus,
} from '../../hooks/useStreams';

const formatAddress = (addr: string) =>
  `${addr.slice(0, 6)}...${addr.slice(-4)}`;

export const ManageStreams = () => {
  const navigate = useNavigate();
  const {
    isConnected,
    isLoading,
    streams,
    statusTab,
    setStatusTab,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    streamTypeFilter,
    setStreamTypeFilter,
  } = useStreams();

  if (!isConnected) {
    return (
      <ConnectWalletPrompt text="Please connect your wallet to manage your streams." />
    );
  }

  const getEmptyStateProps = () => {
    if (searchQuery) {
      return {
        icon: 'search' as const,
        title: 'No Matching Streams',
        description: 'Try adjusting your search criteria.',
        action: {
          label: 'Clear Search',
          onClick: () => setSearchQuery(''),
          variant: 'secondary' as const,
        },
      };
    }
    return {
      icon: 'inbox' as const,
      title: 'No Streams Found',
      description: "You don't have any streams yet.",
      action: {
        label: 'Create Your First Stream',
        onClick: () => navigate('/create'),
      },
    };
  };

  return (
    <div
      className="w-full py-6 px-4 bw-card mt-2 mx-auto"
      style={{ height: 'calc(100vh - 9rem)' }}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Activity History</h1>

        <StreamBanner />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
          <Tabs activeTab={statusTab} onTabChange={setStatusTab} />

          <div className="flex items-center gap-2 sm:gap-3">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search wallet address"
              className="flex-1 min-w-0 lg:w-80"
            />
            <StreamFilterMenu
              sortBy={sortBy}
              onSortChange={setSortBy}
              streamType={streamTypeFilter}
              onStreamTypeChange={setStreamTypeFilter}
            />
          </div>
        </div>

        {isLoading ? (
          <LoadingState message="Loading streams..." />
        ) : streams.length === 0 ? (
          <EmptyState {...getEmptyStateProps()} />
        ) : (
          <div className="space-y-3">
            {streams.map(({ streamId, stream, type }) => (
              <StreamListItem
                key={streamId}
                stream={stream}
                streamType={type}
                progress={calculateProgress(stream)}
                isActive={getStreamStatus(stream).isOngoing}
                formatAddress={formatAddress}
                onClick={(id) => navigate(`/stream/${id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
