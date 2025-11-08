import StreamContractAbi from './abi/StreamContract.json';
import type { Network, Token, NetworkName, ChainName } from './types';

export const CELO_MAINNET: Network = {
  chainId: `0x${(42220).toString(16)}`,
  chainName: 'Celo Mainnet',
  nativeCurrency: {
    name: 'Celo',
    symbol: 'CELO',
    decimals: 18,
  },
  rpcUrls: ['https://forno.celo.org'],
  blockExplorerUrls: ['https://celoscan.io'],
};

export const CELO_SEPOLIA_TESTNET: Network = {
  chainId: `0x${(11142220).toString(16)}`,
  chainName: 'Celo Sepolia Testnet',
  nativeCurrency: {
    name: 'Celo',
    symbol: 'CELO',
    decimals: 18,
  },
  rpcUrls: ['https://forno.celo-sepolia.celo-testnet.org'],
  blockExplorerUrls: ['https://celo-sepolia.blockscout.com'],
};

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
  'celo-mainnet': '0x7Fb08DbfC487c33459cdE8cc5F2dda71Ceb7e4E4',
  'celo-sepolia': '0x7Fb08DbfC487c33459cdE8cc5F2dda71Ceb7e4E4',
  'arc-testnet': '0x88B57d9DcF195EEAB0711cC274c7b80b7b2ba84a',
};

export const MAINNET_TOKENS: Token[] = [
  { name: 'cUSD', address: '0x765de816845861e75a25fca122bb6898b8b1282a', decimals: 18 },
  { name: 'cEUR', address: '0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73', decimals: 18 },
  { name: 'USDC', address: '0xcebA9300f2b948710d2653dD7B07f33A8B32118C', decimals: 6 },
  { name: 'USDT', address: '0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e', decimals: 6 },
  { name: 'WETH', address: '0xD221812de1BD094f35587EE8E174B07B6167D9Af', decimals: 18 },
  { name: 'cREAL', address: '0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787', decimals: 18 },
];

export const SEPOLIA_TOKENS: Token[] = [
  { name: 'CELO', address: '0x471EcE3750Da237f93B8E339c536989b8978a438', decimals: 18 },
  { name: 'cUSD', address: '0xEF4d55D6dE8e8d73232827Cd1e9b2F2dBb45bC80', decimals: 18 },
  { name: 'cEUR', address: '0x6B172e333e2978484261D7eCC3DE491E79764BbC', decimals: 18 },
  { name: 'USDC', address: '0x01C5C0122039549AD1493B8220cABEdD739BC44E', decimals: 6 },
  { name: 'USDT', address: '0xd077A400968890Eacc75cdc901F0356c943e4fDb', decimals: 6 },
  { name: 'WETH', address: '0x2cE73DC897A3E10b3FF3F86470847c36ddB735cf', decimals: 18 },
  { name: 'cREAL', address: '0x13d68A1Bf4a8cB7d9feF54EF70401871b666269c', decimals: 18 },
];

export const ARC_TESTNET_TOKENS: Token[] = [
  { name: 'USDC', address: 'native', decimals: 6 }, // Native USDC on Arc
];

export const NETWORKS: Record<
  NetworkName,
  { config: Network; tokens: Token[] }
> = {
  'celo-mainnet': {
    config: CELO_MAINNET,
    tokens: MAINNET_TOKENS,
  },
  'celo-sepolia': {
    config: CELO_SEPOLIA_TESTNET,
    tokens: SEPOLIA_TOKENS,
  },
  'arc-testnet': {
    config: ARC_TESTNET,
    tokens: ARC_TESTNET_TOKENS,
  },
};

export const CHAINS: Record<ChainName, { name: string; networks: NetworkName[] }> = {
  celo: {
    name: 'Celo',
    networks: ['celo-mainnet', 'celo-sepolia']
  },
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
