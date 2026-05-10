import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { DashboardPage } from './pages/DashboardPage';
import { CreateStreamPage } from './pages/CreateStreamPage';
import { ManageStreamsPage } from './pages/ManageStreamsPage';
import { StreamDetailPage } from './pages/StreamDetailPage';
import { Web3Provider } from './hooks/useWeb3';
import { ThemeProvider } from './hooks/useTheme';

function App() {
  return (
    <ThemeProvider>
      <Web3Provider>
        <Router>
          <div className="min-h-screen bg-[#fafafa] dark:bg-neutral-950 transition-colors duration-300">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/create-stream" element={<CreateStreamPage />} />
              <Route path="/manage-streams" element={<ManageStreamsPage />} />
              <Route path="/stream/:id" element={<StreamDetailPage />} />
            </Routes>
          </div>
        </Router>
        <Toaster position="bottom-center" theme="light" expand />
      </Web3Provider>
    </ThemeProvider>
  );
}

export default App;
