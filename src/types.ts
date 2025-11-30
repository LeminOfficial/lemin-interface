export interface Stream {
  id: number;
  sender: string;
  recipient: string;
  tokenAddress: string;
  totalAmount: bigint;
  startTime: bigint;
  stopTime: bigint;
  remainingBalance: bigint;
  isEntity: boolean;
}

export interface StreamDetails extends Stream {
  withdrawableAmount: bigint;
  tokenSymbol: string;
  tokenDecimals: number;
  withdrawn: bigint;
}

export interface NotificationState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

export interface Token {
  name: string;
  address: string;
  decimals: number;
  symbol?: string;
}

export interface Network {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

export type NetworkName = 'celo-mainnet' | 'celo-sepolia' | 'arc-testnet';

export type ChainName = 'celo' | 'arc';

// Stream filtering & sorting types
export type SortOption =
  | 'newest'
  | 'oldest'
  | 'amount-high'
  | 'amount-low'
  | 'progress';
export type StatusTab = 'all' | 'ongoing' | 'pending' | 'expired';
export type StreamTypeFilter = 'all' | 'sent' | 'received';

export interface UserStream {
  streamId: string;
  stream: StreamDetails;
  type: 'sent' | 'received';
}
