import React from 'react';
import type { StreamDetails } from '../../types';
import { StreamStatusBadge } from './StreamStatusBadge';
import { StreamProgressBar } from './StreamProgressBar';
import { StreamParticipant } from './StreamParticipant';
import { StreamAmountDisplay } from './StreamAmountDisplay';
import { formatAmount } from '@/utils/formatAmount';

interface StreamCardProps {
  stream: StreamDetails;
  progress: number;
  isActive: boolean;
  isCompleted: boolean;
  formatAddress: (addr: string) => string;
  onClick: (id: string) => void;
  streamType?: 'sent' | 'received';
}

export const StreamCard = ({
  stream,
  progress,
  isActive,
  isCompleted,
  formatAddress,
  onClick,
  streamType,
}) => {
  return (
    <div 
      onClick={() => onClick(stream.id.toString())}
      className="group bw-card p-5 cursor-pointer transition-all duration-300 border border-secondary/50 hover:border-primary/25 hover:shadow-lg hover:scale-[1.01] relative"
    >
      {/* Stream Type Badge */}
      {streamType && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium shadow-sm ${
            streamType === 'sent' 
              ? 'bg-blue-500 text-white'
              : 'bg-green-500 text-white'
          }`}>
            <span>{streamType === 'sent' ? 'OUT' : 'IN'}</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {streamType === 'sent' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              )}
            </svg>
          </div>
        </div>
      )}
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Stream ID Section */}
        <div className="col-span-1">
          <div className="text-xs text-muted-foreground mb-2">Stream ID</div>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center border border-accent/20">
              <span className="text-sm font-bold bw-text-accent">#{stream.id}</span>
            </div>
          </div>
        </div>

        {/* Participants Section */}
        <div className="hidden md:block col-span-3">
          <div className="text-xs text-muted-foreground mb-1">Participants</div>
          <div className="flex items-center space-x-2">
            <StreamParticipant 
              address={stream.sender} 
              label="From" 
              formatAddress={formatAddress}
            />
            <div className="text-muted-foreground mx-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <StreamParticipant 
              address={stream.recipient} 
              label="To" 
              formatAddress={formatAddress}
            />
          </div>
        </div>

        {/* Status Section */}
        <div className="col-span-1">
          <div className="text-xs text-muted-foreground mb-2">Status</div>
          <div className="flex">
            <StreamStatusBadge isCompleted={isCompleted} isActive={isActive} />
          </div>
        </div>

        {/* Progress Section */}
        <div className="col-span-3">
          <div className="text-xs text-muted-foreground mb-2">Progress</div>
          <StreamProgressBar progress={progress} />
        </div>

        {/* Amounts Section */}
        <div className="col-span-3">
          <StreamAmountDisplay
            totalAmount={formatAmount(stream.totalAmount, stream.tokenDecimals, stream.tokenSymbol)}
            withdrawableAmount={formatAmount(stream.withdrawableAmount, stream.tokenDecimals, stream.tokenSymbol)}
          />
        </div>

        {/* Arrow Section */}
        <div className="col-span-1 flex justify-end">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-all duration-300 border border-accent/20">
            <svg className="w-4 h-4 bw-text-accent group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile Participants - Show on small screens */}
      <div className="md:hidden mt-4 pt-4 border-t border-secondary/50">
        <div className="flex items-center justify-between">
          <StreamParticipant 
            address={stream.sender} 
            label="From" 
            diameter={24}
            formatAddress={formatAddress}
          />
          <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <StreamParticipant 
            address={stream.recipient} 
            label="To" 
            diameter={24}
            formatAddress={formatAddress}
          />
        </div>
      </div>
    </div>
  );
};