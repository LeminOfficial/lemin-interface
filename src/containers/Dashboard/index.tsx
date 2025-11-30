import { useCelo } from '@/hooks/useCelo';
import { StatCard, StreamIllustration } from '@/components';

interface DashboardProps {
  onNavigate: (tab: 'dashboard' | 'create' | 'view') => void;
}

// Mock data - replace with real data from your hooks/API
const mockStreams = [
  { id: 1, status: 'ACTIVE', value: 5000 },
  { id: 2, status: 'ACTIVE', value: 3200 },
  { id: 3, status: 'COMPLETED', value: 1500 },
];

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  const { isConnected, address, connectWallet, loading } = useCelo();

  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  // Calculate stats - replace with real data
  const streams = mockStreams;
  const totalLocked = streams.reduce((sum, s) => sum + s.value, 0);
  const activeStreamsCount = streams.filter(
    (s) => s.status === 'ACTIVE',
  ).length;

  const navigateToCreate = () => onNavigate('create');

  return (
    <div className="w-full py-6">
      <div className="mx-auto space-y-6">
        {/* Hero Section with Stats */}
        <div className="grid md:grid-cols-12 gap-4 md:gap-6">
          {/* Main Hero Card */}
          <div className="md:col-span-8 bg-brand-base border border-primary/20 rounded p-8 md:p-12 flex flex-col justify-center relative overflow-hidden min-h-[300px]">
            <div className="relative z-10 max-w-xl">
              <h1 className="text-4xl md:text-6xl font-light leading-none mb-6 text-white">
                Linear vesting <br />
                <span className="text-brand-gray font-bold">made simple.</span>
              </h1>
              <button
                onClick={navigateToCreate}
                className="bw-button-primary flex items-center gap-2 group/btn"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create Stream
                <svg
                  className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-1000">
              <StreamIllustration />
            </div>
          </div>

          {/* Stats Section */}
          <div className="md:col-span-4 grid grid-rows-2 gap-4 md:gap-6">
            <StatCard
              label="Total Value Locked"
              value={`$${totalLocked.toLocaleString()}`}
              sub="Across all streams"
            />
            <StatCard
              label="Active Streams"
              value={activeStreamsCount.toString()}
              sub="Running now"
            />
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {/* Create Stream Action */}
          <div
            onClick={() => onNavigate('create')}
            className="group bw-card p-6 cursor-pointer transition-all duration-300 border border-secondary/50 hover:border-primary/25 hover:shadow-lg hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-all">
                <svg
                  className="w-4 h-4 bw-text-accent group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Create Stream
            </h3>
            <p className="text-sm text-muted-foreground">
              Set up continuous payments with customizable rates and durations
            </p>
          </div>

          {/* Manage Streams Action */}
          <div
            onClick={() => onNavigate('view')}
            className="group bw-card p-6 cursor-pointer transition-all duration-300 border border-secondary/50 hover:border-primary/25 hover:shadow-lg hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-all">
                <svg
                  className="w-4 h-4 bw-text-accent group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Manage Streams
            </h3>
            <p className="text-sm text-muted-foreground">
              Monitor, withdraw, and control all your active payment streams
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 pt-4">
          <div className="bw-card p-6 border border-secondary/50 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Secure
            </h4>
            <p className="text-sm text-muted-foreground">
              Built on blockchain with smart contract security
            </p>
          </div>

          <div className="bw-card p-6 border border-secondary/50 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Real-time
            </h4>
            <p className="text-sm text-muted-foreground">
              Instant withdrawals and live stream monitoring
            </p>
          </div>

          <div className="bw-card p-6 border border-secondary/50 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
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
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Flexible
            </h4>
            <p className="text-sm text-muted-foreground">
              Customizable rates, durations, and cancellation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
