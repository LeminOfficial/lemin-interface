import { useMemo } from 'react';
import { useWeb3 } from '@/hooks/useWeb3';
import {
  CreateStreamIcon,
  ViewStreamIcon,
  DashboardIcon,
  WalletIcon,
  CollapseIcon,
  ExpandIcon,
} from '../icons';
import WalletSection from '@/components/WalletSection';

type NavItemId = 'dashboard' | 'create' | 'view';

interface SidebarProps {
  activeTab: NavItemId;
  setActiveTab: (tab: NavItemId) => void;
  compact?: boolean;
  onToggle?: () => void;
}

export const Sidebar = ({
  activeTab,
  setActiveTab,
  compact = false,
  onToggle,
}: SidebarProps) => {
  const navItems = useMemo(
    () => [
      {
        id: 'dashboard' as NavItemId,
        label: 'Dashboard',
        description: 'Analytics & Overview',
        icon: DashboardIcon,
      },
      {
        id: 'create' as NavItemId,
        label: 'Create Stream',
        description: 'New payment flow',
        icon: CreateStreamIcon,
      },
      {
        id: 'view' as NavItemId,
        label: 'Manage Streams',
        description: 'Track & withdraw',
        icon: ViewStreamIcon,
      },
    ],
    [],
  );

  const { isConnected, loading, connectWallet } = useWeb3();

  if (compact) {
    return (
      <aside className="w-full h-full flex flex-col bg-white dark:bg-[#0f0f0f] rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 overflow-hidden">
        {/* Compact Nav */}
        <nav className="flex-1 py-6 px-2 flex flex-col items-center gap-2">
          {navItems.map((item) => {
            const active = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={item.label}
                className={`
                  relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200
                  ${
                    active
                      ? 'bg-brand-base text-white'
                      : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
               
              </button>
            );
          })}
        </nav>

        {/* Expand Button */}
        {onToggle && (
          <div className="p-3 border-t border-neutral-100 dark:border-neutral-800/60">
            <button
              onClick={onToggle}
              className="w-full h-10 rounded-xl flex items-center justify-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors"
            >
              <ExpandIcon className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Compact Wallet */}
        <div className="p-3 border-t border-neutral-100 dark:border-neutral-800/60">
          <button
            onClick={connectWallet}
            disabled={loading}
            className={`
              w-full h-11 rounded-xl flex items-center justify-center transition-all duration-200
              ${
                isConnected
                  ? 'bg-emerald-500/10 text-emerald-500'
                  : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
              }
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <WalletIcon className="w-5 h-5" />
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full h-full flex flex-col bg-white dark:bg-[#0f0f0f] rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 overflow-hidden">
      {/* Header with collapse button */}
      <div className="px-5 py-4 border-b border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
          Navigation
        </span>
        {/* {onToggle && (
          <button
            onClick={onToggle}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors"
          >
            <CollapseIcon className="w-3.5 h-3.5" />
          </button>
        )} */}
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-4 overflow-y-auto">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = activeTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  group relative w-full rounded-xl transition-all duration-200 overflow-hidden
                  ${
                    active
                      ? 'bg-brand-base'
                      : 'hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
                  }
                `}
              >
                <div className="flex items-center gap-3 px-3 py-3">
                  {/* Icon container */}
                  <div
                    className={`
                    w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                    ${
                      active
                        ? 'bg-white/20'
                        : 'bg-neutral-100 dark:bg-neutral-800/80 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700/80'
                    }
                  `}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        active
                          ? 'text-white'
                          : 'text-neutral-500 dark:text-neutral-400'
                      }`}
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 text-left min-w-0">
                    <span
                      className={`block font-semibold text-sm truncate ${
                        active
                          ? 'text-white'
                          : 'text-neutral-700 dark:text-neutral-200'
                      }`}
                    >
                      {item.label}
                    </span>
                    <p
                      className={`text-xs truncate mt-0.5 ${
                        active ? 'text-white/70' : 'text-neutral-400'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Active indicator */}
                  {active && (
                    <div className="w-1 h-8 bg-white/40 rounded-full flex-shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Pro Card */}
      <div className="mx-3 mb-3 p-4 rounded-xl bg-brand-base/5 border border-brand-base/10">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-base/10 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 text-brand-base"
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
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-neutral-800 dark:text-white">
              Upgrade to Pro
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Unlock advanced features
            </p>
          </div>
        </div>
        <button className="w-full mt-3 py-2 rounded-lg bg-brand-base text-white text-xs font-semibold hover:bg-brand-base/90 transition-colors">
          Learn More
        </button>
      </div>

      {/* Wallet Section */}
      <WalletSection />
    </aside>
  );
};
