import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar, type NavItemId } from './Sidebar';
import MobileBottomNav from './MobileBottomNav';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const getActiveTab = (): 'dashboard' | 'create' | 'view' => {
    if (location.pathname === '/create-stream') return 'create';
    if (
      location.pathname === '/manage-streams' ||
      location.pathname.startsWith('/stream')
    )
      return 'view';
    return 'dashboard';
  };

  const handleTabChange = (tab: NavItemId) => {
    switch (tab) {
      case 'create':
        navigate('/create-stream');
        break;
      case 'view':
        navigate('/manage-streams');
        break;
      case 'dashboard':
        navigate('/');
        break;
      case 'vesting':
      default:
        break;
    }
  };

  const activeTab = getActiveTab();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#fafafa] dark:bg-[#0a0a0a]">
      {/* Header - Full Width */}

      <Header setActiveTab={handleTabChange} />

      {/* Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div
          className={`hidden lg:flex p-3 transition-all duration-300 ease-in-out ${
            sidebarCollapsed ? 'w-[84px]' : 'w-[280px]'
          }`}
        >
          <Sidebar
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            compact={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* Tablet Sidebar */}
        <div className="hidden md:flex lg:hidden w-[76px] p-2">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            compact
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
          <div className="px-4 md:px-6">{children}</div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav activeTab={activeTab} setActiveTab={handleTabChange} />
    </div>
  );
};
