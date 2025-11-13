import React, { useMemo } from 'react';
import { CreateStreamIcon, ViewStreamIcon, DashboardIcon } from '../icons';

type NavItemId = 'dashboard' | 'create' | 'view';

interface Props {
  activeTab: NavItemId;
  setActiveTab: (tab: NavItemId) => void;
}

export const MobileBottomNav = ({ activeTab, setActiveTab }: Props) => {
  const navItems: {
    id: NavItemId;
    label: string;
    description?: string;
    icon: (props: { className?: string }) => React.ReactElement;
  }[] = useMemo(
    () => [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: (p) => <DashboardIcon {...p} />,
      },
      {
        id: 'create',
        label: 'Create',
        icon: (p) => <CreateStreamIcon {...p} />,
      },
      { id: 'view', label: 'Manage', icon: (p) => <ViewStreamIcon {...p} /> },
    ],
    [],
  );

  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-lg bg-card border border-border rounded-xl p-2 flex items-center justify-between shadow-lg z-50"
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
            className={`flex-1 flex flex-col items-center justify-center py-2 px-2 rounded-lg transition-colors duration-150 ${
              active ? 'bw-bg-accent bw-shadow-md' : 'hover:bg-secondary/50'
            }`}
          >
            {item.icon({
              className: `h-5 w-5 mb-1 ${
                active ? 'text-white' : 'text-primary'
              }`,
            })}
            <span
              className={`text-[10px] leading-none ${
                active ? 'text-white' : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
