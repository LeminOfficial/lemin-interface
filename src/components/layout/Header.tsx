import React from 'react';
import { NetworkSwitcher, ThemeToggle } from '../common';
import { LeminLogo } from '../icons';

interface HeaderProps {
  setActiveTab: (tab: 'dashboard' | 'create' | 'view') => void;
}

export const Header = ({ setActiveTab }: HeaderProps) => {
  return (
    <header className="border-b border-border bw-bg-accent p-6 m-6 mb-0 rounded-lg">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
        >
          <LeminLogo className="h-10 w-10 text-white" />
          <span className="text-2xl font-bold text-white">Lemin</span>
        </button>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-white/80 hover:text-white transition-colors text-sm font-medium"
          >
            Documentation
          </a>
          <NetworkSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
