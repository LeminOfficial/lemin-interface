import React, { useMemo } from 'react';
import { useCelo } from '@/hooks/useCelo';

import {
  CreateStreamIcon,
  ViewStreamIcon,
  DashboardIcon,
  WalletIcon,
} from '../icons';
import WalletSection from '@/components/WalletSection';

type NavItemId = 'dashboard' | 'create' | 'view';

interface SidebarProps {
  activeTab: NavItemId;
  setActiveTab: (tab: NavItemId) => void;
  compact?: boolean; // render icon-only compact sidebar
}

export const Sidebar = ({
  activeTab,
  setActiveTab,
  compact = false,
}: SidebarProps) => {
  const navItems: {
    id: NavItemId;
    label: string;
    description: string;
    color: string;
    icon: (props: { className?: string }) => React.ReactElement;
  }[] = useMemo(
    () => [
      {
        id: 'dashboard',
        label: 'Dashboard',
        description: 'Overview and analytics',
        color: 'primary',
        icon: (props) => <DashboardIcon {...props} />,
      },
      {
        id: 'create',
        label: 'Create Stream',
        description: 'Start new payment stream',
        color: 'emerald',
        icon: (props) => <CreateStreamIcon {...props} />,
      },
      {
        id: 'view',
        label: 'Manage Streams',
        description: 'View and withdraw funds',
        color: 'blue',
        icon: (props) => <ViewStreamIcon {...props} />,
      },
    ],
    [],
  );

  const { address, isConnected, loading, connectWallet } = useCelo();

  return (
    <>
      {/* Sidebar (rendering mode controlled by parent Layout via wrapper classes) */}
      <aside
        className="bw-card flex flex-col bw-shadow overflow-hidden"
        style={{ height: 'calc(100vh - 3rem)' }}
      >
        {/* Navigation */}
        <div className="flex-1 p-6 overflow-y-auto">
          {!compact && (
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Navigation
            </h2>
          )}

          {!compact && (
            <nav aria-label="Main navigation">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      aria-current={active ? 'page' : undefined}
                      title={`${item.label} — ${item.description}`}
                      className={`group relative w-full p-4 rounded-lg text-left transition-all duration-200 ${
                        active
                          ? 'bw-bg-accent bw-shadow-md'
                          : 'bw-hover-accent bg-secondary/30'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                            active
                              ? 'bg-white/20'
                              : 'bg-primary/10 group-hover:bg-primary/20'
                          }`}
                        >
                          {item.icon({
                            className: `h-5 w-5 transition-all duration-200 ${
                              active ? 'text-white' : 'text-primary'
                            }`,
                          })}
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`font-medium text-sm transition-colors duration-200 ${
                              active ? 'text-white' : 'text-foreground'
                            }`}
                          >
                            {item.label}
                          </h3>
                          <p
                            className={`text-xs mt-0.5 transition-colors duration-200 ${
                              active ? 'text-white/80' : 'text-muted-foreground'
                            }`}
                          >
                            {item.description}
                          </p>
                        </div>

                        {/* Active Indicator */}
                        {active && (
                          <div
                            className="w-2 h-2 bg-white rounded-full"
                            aria-hidden
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </nav>
          )}

          {compact && (
            <nav
              aria-label="Compact navigation"
              className="flex flex-col items-center space-y-2"
            >
              {navItems.map((item) => {
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    aria-current={active ? 'page' : undefined}
                    title={item.label}
                    className={`p-2 rounded-lg transition-colors duration-150 flex items-center justify-center w-10 h-10 ${
                      active
                        ? 'bw-bg-accent bw-shadow-md'
                        : 'hover:bg-secondary/30'
                    }`}
                  >
                    {item.icon({
                      className: `h-5 w-5 ${
                        active ? 'text-white' : 'text-primary'
                      }`,
                    })}
                  </button>
                );
              })}
            </nav>
          )}
        </div>

        {/* Wallet Section (compact shows small icon button) */}
        {compact ? (
          <div className="p-3 border-t border-border flex items-center justify-center">
            <button
              type="button"
              onClick={connectWallet}
              disabled={loading}
              title={isConnected ? 'Connected' : 'Connect Wallet'}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                isConnected ? 'bg-primary/10' : 'bg-secondary/80'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <WalletIcon
                className={`h-5 w-5 ${
                  isConnected ? 'text-primary' : 'text-foreground'
                }`}
              />
            </button>
          </div>
        ) : (
          <WalletSection />
        )}
      </aside>

      {/* Mobile nav extracted to `MobileBottomNav` and rendered in Layout */}
    </>
  );
};
