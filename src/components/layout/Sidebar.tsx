import React from 'react';
import { useCelo } from '../../hooks/useCelo';
import {
  WalletIcon,
  CreateStreamIcon,
  ViewStreamIcon,
  DashboardIcon,
} from '../icons';

interface SidebarProps {
  activeTab: 'dashboard' | 'create' | 'view';
  setActiveTab: (tab: 'dashboard' | 'create' | 'view') => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const { address, isConnected, loading, connectWallet } = useCelo();

  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon />,
      description: 'Overview and analytics',
      color: 'primary',
    },
    {
      id: 'create',
      label: 'Create Stream',
      icon: <CreateStreamIcon />,
      description: 'Start new payment stream',
      color: 'emerald',
    },
    {
      id: 'view',
      label: 'Manage Streams',
      icon: <ViewStreamIcon />,
      description: 'View and withdraw funds',
      color: 'blue',
    },
  ];

  return (
    <aside
      className="bw-card flex flex-col bw-shadow overflow-hidden"
      style={{ height: 'calc(100vh - 3rem)' }}
    >
      {/* Navigation - Flexible area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Navigation
        </h2>
        <div className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                setActiveTab(item.id as 'dashboard' | 'create' | 'view')
              }
              className={`group relative w-full p-4 rounded-lg text-left transition-all duration-200 ${
                activeTab === item.id
                  ? 'bw-bg-accent bw-shadow-md'
                  : 'bw-hover-accent bg-secondary/30'
              }`}
            >
              <div className="flex items-center space-x-3">
                {/* Icon Container */}
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-white/20'
                      : 'bg-primary/10 group-hover:bg-primary/20'
                  }`}
                >
                  <span
                    className={`h-5 w-5 transition-all duration-200 ${
                      activeTab === item.id ? 'text-white' : 'text-primary'
                    }`}
                  >
                    {item.icon}
                  </span>
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-medium text-sm transition-colors duration-200 ${
                      activeTab === item.id ? 'text-white' : 'text-foreground'
                    }`}
                  >
                    {item.label}
                  </h3>
                  <p
                    className={`text-xs mt-0.5 transition-colors duration-200 ${
                      activeTab === item.id
                        ? 'text-white/80'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Active Indicator */}
                {activeTab === item.id && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Wallet Section */}
      <div className="p-6 border-t border-border flex-shrink-0">
        <button
          onClick={connectWallet}
          disabled={loading}
          className={`w-full p-4 rounded-lg font-semibold transition-all duration-200 ${
            isConnected
              ? 'bw-button-secondary bw-text-accent bw-border-accent'
              : 'bw-button-primary'
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="flex items-center justify-center space-x-3">
            <WalletIcon
              className={`h-5 w-5 flex-shrink-0 ${
                isConnected ? 'text-primary' : ''
              }`}
            />
            <div className="flex-1 text-center">
              <div
                className={`text-sm font-semibold ${
                  isConnected ? 'text-primary' : ''
                }`}
              >
                {loading && !address
                  ? 'Connecting...'
                  : isConnected
                  ? 'Connected'
                  : 'Connect Wallet'}
              </div>
              {isConnected && address && (
                <div className="text-xs font-mono mt-1 text-primary">
                  {truncateAddress(address)}
                </div>
              )}
            </div>
            {isConnected && (
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            )}
          </div>
        </button>
      </div>
    </aside>
  );
};
