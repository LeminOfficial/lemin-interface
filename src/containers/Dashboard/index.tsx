import React from 'react';
import { useCelo } from '@/hooks/useCelo';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LeminLogo } from '@/components/icons';

interface DashboardProps {
  onNavigate: (tab: 'dashboard' | 'create' | 'view') => void;
}

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  const { isConnected, address, connectWallet, loading } = useCelo();

  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Welcome to Lemin
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Stream payments continuously with precision and control. Create,
          manage, and monitor your payment streams on the blockchain.
        </p>

        {/* Wallet Connection Status */}
        {!isConnected ? (
          <div className="mb-8">
            <Button
              onClick={connectWallet}
              disabled={loading}
              className="bw-button-primary text-lg px-8 py-4 h-auto"
            >
              {loading ? 'Connecting...' : 'Connect Wallet to Get Started'}
            </Button>
          </div>
        ) : (
          <div className="mb-8">
            <div className="inline-flex items-center space-x-3 bg-primary/10 border border-primary/30 rounded-lg px-6 py-3">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-foreground font-medium">
                Connected: {truncateAddress(address!)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Main Actions */}
      <div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Create Stream Card */}
          <Card
            className="bw-card bw-hover-accent cursor-pointer group bw-clickable"
            onClick={() => onNavigate('create')}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <div className="p-4 bw-bg-accent rounded-xl group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <div>
                  <CardTitle className="text-2xl text-foreground">
                    Create Stream
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Start a new payment stream
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Set up continuous payments with customizable rates, durations,
                and recipients. Perfect for salaries, subscriptions, or any
                recurring payments.
              </p>
              <div className="flex items-center text-primary font-medium">
                <span>Get Started</span>
                <svg
                  className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>

          {/* Manage Streams Card */}
          <Card
            className="bw-card bw-hover-accent cursor-pointer group bw-clickable"
            onClick={() => onNavigate('view')}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <div className="p-4 bw-bg-accent rounded-xl group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <CardTitle className="text-2xl text-foreground">
                    Manage Streams
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    View and control your streams
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Monitor active streams, withdraw available funds, top up
                balances, and cancel streams when needed. Full control at your
                fingertips.
              </p>
              <div className="flex items-center text-primary font-medium">
                <span>Manage Now</span>
                <svg
                  className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Choose Lemin?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-3 bw-bg-accent rounded-xl w-fit mx-auto mb-4">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Secure
              </h3>
              <p className="text-muted-foreground">
                Built on blockchain technology with smart contract security
              </p>
            </div>
            <div className="text-center">
              <div className="p-3 bw-bg-accent rounded-xl w-fit mx-auto mb-4">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Fast
              </h3>
              <p className="text-muted-foreground">
                Real-time streaming with instant withdrawals and updates
              </p>
            </div>
            <div className="text-center">
              <div className="p-3 bw-bg-accent rounded-xl w-fit mx-auto mb-4">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Flexible
              </h3>
              <p className="text-muted-foreground">
                Customizable rates, durations, and cancellation options
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
