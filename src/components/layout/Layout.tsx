import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab from current route
  const getActiveTab = (): 'dashboard' | 'create' | 'view' => {
    switch (location.pathname) {
      case '/create-stream':
        return 'create';
      case '/manage-streams':
        return 'view';
      default:
        return 'dashboard';
    }
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
      {/* Sidebar */}
      <div className="w-96 p-6 h-screen">
        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header setActiveTab={handleTabChange} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-5 mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};
