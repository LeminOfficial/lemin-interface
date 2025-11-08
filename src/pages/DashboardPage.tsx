import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout';
import { Dashboard } from '../components/common';

export const DashboardPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (tab: 'dashboard' | 'create' | 'view') => {
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

  return (
    <Layout>
      <Dashboard onNavigate={handleNavigate} />
    </Layout>
  );
};