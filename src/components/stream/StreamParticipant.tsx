import React from 'react';
import EthereumIdenticon from '../common/Identicon';

interface StreamParticipantProps {
  address: string;
  label: string;
  diameter?: number;
  formatAddress: (addr: string) => string;
}

export const StreamParticipant = ({ 
  address, 
  label, 
  diameter = 32,
  formatAddress 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <EthereumIdenticon address={address} diameter={diameter} />
      <div className="text-xs">
        <div className="text-muted-foreground">{label}</div>
        <div className="font-mono font-medium">{formatAddress(address)}</div>
      </div>
    </div>
  );
};