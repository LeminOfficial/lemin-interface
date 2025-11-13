import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import MobileBottomNav from './MobileBottomNav';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveTab = (): 'dashboard' | 'create' | 'view' => {
    if (location.pathname === '/create-stream') return 'create';
    if (
      location.pathname === '/manage-streams' ||
      location.pathname.startsWith('/stream')
    )
      return 'view';
    return 'dashboard';
  };

  const handleTabChange = (tab: 'dashboard' | 'create' | 'view') => {
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
    }
  };

  const activeTab = getActiveTab();
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden lg:block w-96 p-6 h-screen">
        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
      </div>

      {/* Compact sidebar for tablet (md) */}
      <div className="hidden md:block lg:hidden w-20 p-3 h-screen">
        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} compact />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header setActiveTab={handleTabChange} />

        {/* Main Content (add bottom padding on mobile to avoid floating nav overlap) */}
        <main className="flex-1 overflow-y-auto pb-28 md:pb-0">
          <div className="px-5 mx-auto">{children}</div>
        </main>

        {/* Mobile bottom navigation (visible only on small screens) */}
        <MobileBottomNav activeTab={activeTab} setActiveTab={handleTabChange} />
      </div>
    </div>
  );
};
