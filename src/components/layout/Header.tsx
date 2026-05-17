import NetworkSwitcher from '@/components/NetworkSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';

interface HeaderProps {
  setActiveTab: (tab: 'dashboard' | 'create' | 'view') => void;
}

export const Header = ({ setActiveTab }: HeaderProps) => {
  return (
    <header className="bg-brand-base relative after:absolute after:inset-0 after:bg-white/5 after:pointer-events-none m-4 rounded-xl">
      <div className="flex items-center justify-between px-6 py-5">
        {/* Logo */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <img
            src="/images/leminLogoNew.png"
            alt="Lemin Logo"
            draggable={false}
            className="h-12 w-12 object-contain"
          />
          <span className="text-2xl font-medium text-brand-gray">Lemin</span>
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
