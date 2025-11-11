import { useState } from 'react';
import { useCelo } from '@/hooks/useCelo';
import type { NetworkName, ChainName } from '@/types';

export const NetworkSwitcher = () => {
  const { network, switchNetwork, loading } = useCelo();
  const [isOpen, setIsOpen] = useState(false);

  const networks = [
    {
      name: 'celo-mainnet' as NetworkName,
      label: 'Celo Mainnet',
      description: 'Celo Production Network',
      color: 'bg-green-500',
      chain: 'celo' as ChainName,
    },
    {
      name: 'celo-sepolia' as NetworkName,
      label: 'Celo Sepolia',
      description: 'Celo Test Network',
      color: 'bg-orange-500',
      chain: 'celo' as ChainName,
    },
    {
      name: 'arc-testnet' as NetworkName,
      label: 'Arc Testnet',
      description: 'Arc Test Network',
      color: 'bg-blue-500',
      chain: 'arc' as ChainName,
    },
  ];

  const currentNetwork =
    networks.find((n) => n.name === network) || networks[0];

  const handleSwitch = (newNetwork: NetworkName) => {
    if (newNetwork !== network && !loading) {
      switchNetwork(newNetwork);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Current Network Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
          loading
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-white/10 border-white/20 bg-white/5'
        } text-white`}
      >
        <div className={`w-2 h-2 rounded-full ${currentNetwork.color}`}></div>
        <span className="text-sm font-medium">{currentNetwork.label}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute top-full right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg z-20 overflow-hidden">
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground px-3 py-2 border-b border-border mb-2">
                Select Network
              </div>
              {networks.map((net) => (
                <button
                  key={net.name}
                  onClick={() => handleSwitch(net.name)}
                  disabled={loading}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                    net.name === network
                      ? 'bw-bg-accent text-white'
                      : 'hover:bg-secondary text-foreground'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${net.color} flex-shrink-0`}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{net.label}</span>
                      {net.name === network && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <div
                      className={`text-xs ${
                        net.name === network
                          ? 'text-white/80'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {net.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border p-3 bg-secondary/30">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Switch networks to change blockchain</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default NetworkSwitcher;
