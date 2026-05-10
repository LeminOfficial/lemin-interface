import StreamContractAbi from './abi/StreamContract.json';
import type { Network, Token, NetworkName, ChainName } from './types';

export const ARC_TESTNET: Network = {
  chainId: `0x${(5042002).toString(16)}`,
  chainName: 'Arc Testnet',
  nativeCurrency: {
    name: 'USDC',
    symbol: 'USDC',
    decimals: 18,
  },
  rpcUrls: [
    'https://rpc.testnet.arc.network',
    'https://rpc.blockdaemon.testnet.arc.network',
    'https://rpc.drpc.testnet.arc.network',
    'https://rpc.quicknode.testnet.arc.network'
  ],
  blockExplorerUrls: ['https://testnet.arcscan.app'],
};

export const CONTRACT_ADDRESS: Record<NetworkName, string> = {
  'arc-testnet': import.meta.env.VITE_CONTRACT_ADDRESS_ARC_TESTNET,
};

export const ARC_TESTNET_TOKENS: Token[] = [
  { name: 'USDC', address: 'native', decimals: 6 }, // Native USDC on Arc
];

export const NETWORKS: Record<
  NetworkName,
  { config: Network; tokens: Token[] }
> = {
  'arc-testnet': {
    config: ARC_TESTNET,
    tokens: ARC_TESTNET_TOKENS,
  },
};

export const CHAINS: Record<ChainName, { name: string; networks: NetworkName[] }> = {
  arc: {
    name: 'Arc',
    networks: ['arc-testnet']
  }
};

export const STREAM_CONTRACT_ABI = StreamContractAbi;

export const ERC20_ABI = [
  'function approve(address spender, uint256 amount) public returns (bool)',
  'function allowance(address owner, address spender) public view returns (uint256)',
  'function symbol() public view returns (string)',
  'function decimals() public view returns (uint8)',
  'function balanceOf(address account) public view returns (uint256)',
  'function transfer(address recipient, uint256 amount) public returns (bool)',
  'function transferFrom(address sender, address recipient, uint256 amount) public returns (bool)',
];
