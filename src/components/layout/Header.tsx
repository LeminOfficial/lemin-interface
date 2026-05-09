import NetworkSwitcher from '@/components/NetworkSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';

interface HeaderProps {
  setActiveTab: (tab: 'dashboard' | 'create' | 'view') => void;
}

export const Header = ({ setActiveTab }: HeaderProps) => {
  return (
    <header className="bg-brand-base relative after:absolute after:inset-0 after:bg-white/5 after:pointer-events-none">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <img
            src="/images/leminLogo.png"
            alt="Lemin Logo"
            className="h-8 w-8"
          />
          <span className="text-xl font-bold text-white">Lemin</span>
        </button>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-white/80 hover:text-white transition-colors text-sm font-medium hidden md:block"
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
