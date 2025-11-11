import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { CreateStreamPage } from './pages/CreateStreamPage';
import { ManageStreamsPage } from './pages/ManageStreamsPage';
import { StreamDetailPage } from './pages/StreamDetailPage';
import { CeloProvider } from './hooks/useCelo';
import { ThemeProvider } from './hooks/useTheme';
import { Notification } from './components/Notification';
import type { NotificationState } from './types';

function App() {
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    message: '',
    type: 'success',
  });

  const showNotification = (
    message: string,
    type: 'success' | 'error',
    duration: number = 5000,
  ) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, duration);
  };

  return (
    <ThemeProvider>
      <CeloProvider showNotification={showNotification}>
        <Router>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/create-stream" element={<CreateStreamPage />} />
              <Route path="/manage-streams" element={<ManageStreamsPage />} />
              <Route path="/stream/:id" element={<StreamDetailPage />} />
            </Routes>

            <Notification
              message={notification.message}
              type={notification.type}
              show={notification.show}
              onClose={() => setNotification({ ...notification, show: false })}
            />
          </div>
        </Router>
      </CeloProvider>
    </ThemeProvider>
  );
}

export default App;
