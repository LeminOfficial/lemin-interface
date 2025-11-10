import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from 'react';
import { ethers } from 'ethers';
import {
  CONTRACT_ADDRESS,
  STREAM_CONTRACT_ABI,
  ERC20_ABI,
  NETWORKS,
} from '../constants';
import type { StreamDetails, NetworkName, Token, Network } from '../types';

interface CeloContextType {
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  address: string | null;
  isConnected: boolean;
  loading: boolean;
  network: NetworkName;
  activeNetwork: Network;
  activeTokens: Token[];
  connectWallet: () => Promise<void>;
  switchNetwork: (network: NetworkName) => Promise<void>;
  createStream: (
    recipient: string,
    tokenAddress: string,
    deposit: bigint,
    startTime: Date,
    stopTime: Date,
  ) => Promise<number | null>;
  getStreamDetails: (streamId: string) => Promise<StreamDetails | null>;
  withdrawFromStream: (streamId: string, amount: bigint) => Promise<boolean>;
  cancelStream: (streamId: string) => Promise<boolean>;
  topUpStream: (streamId: string, amount: bigint) => Promise<boolean>;
  getWithdrawableAmount: (streamId: string) => Promise<bigint>;
  getUserStreams: (userAddress: string) => Promise<Array<{
    streamId: string;
    stream: StreamDetails;
    type: 'sent' | 'received';
  }>>;
}

const CeloContext = createContext<CeloContextType | undefined>(undefined);

interface CeloProviderProps {
  children: React.ReactNode;
  showNotification: (message: string, type: 'success' | 'error') => void;
}

export const CeloProvider: React.FC<CeloProviderProps> = ({
  children,
  showNotification,
}) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [network, setNetwork] = useState<NetworkName>('celo-sepolia');

  const isConnected = !!(provider && signer && address);
  const activeNetwork = NETWORKS[network].config;
  const activeTokens = NETWORKS[network].tokens;

  const getEthereum = () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      return (window as any).ethereum;
    }
    return null;
  };

  const disconnect = () => {
    setAddress(null);
    setSigner(null);
    setProvider(null);
  };

  const switchNetwork = async (newNetwork: NetworkName) => {
    const ethereum = getEthereum();
    if (!ethereum) {
      showNotification('MetaMask not detected.', 'error');
      return;
    }

    setLoading(true);
    const targetNetwork = NETWORKS[newNetwork].config;

    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: targetNetwork.chainId }],
      });
      setNetwork(newNetwork);
      disconnect();
      showNotification(
        `Switched to ${targetNetwork.chainName}. Please reconnect wallet.`,
        'success',
      );
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [targetNetwork],
          });
          setNetwork(newNetwork);
          disconnect();
          showNotification(
            `Added and switched to ${targetNetwork.chainName}. Please reconnect wallet.`,
            'success',
          );
        } catch (addError) {
          showNotification(
            `Failed to add ${targetNetwork.chainName}.`,
            'error',
          );
        }
      } else {
        showNotification(
          `Failed to switch to ${targetNetwork.chainName}.`,
          'error',
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const connectWallet = useCallback(async () => {
    const ethereum = getEthereum();
    if (!ethereum) {
      showNotification('MetaMask not detected. Please install it.', 'error');
      return;
    }

    setLoading(true);
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
      const web3Provider = new ethers.BrowserProvider(ethereum);

      const currentNetwork = await web3Provider.getNetwork();
      if (currentNetwork.chainId !== BigInt(activeNetwork.chainId)) {
        showNotification(
          `Please switch your wallet to ${activeNetwork.chainName}.`,
          'error',
        );
        setLoading(false);
        return;
      }

      setProvider(web3Provider);
      const newSigner = await web3Provider.getSigner();
      setSigner(newSigner);
      const newAddress = await newSigner.getAddress();
      setAddress(newAddress);
      showNotification('Wallet connected successfully!', 'success');
    } catch (error) {
      console.error(error);
      showNotification('Failed to connect wallet.', 'error');
    } finally {
      setLoading(false);
    }
  }, [showNotification, activeNetwork]);

  useEffect(() => {
    const ethereum = getEthereum();
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect();
        showNotification('Wallet disconnected.', 'success');
      } else {
        connectWallet();
      }
    };

    if (ethereum) {
      ethereum.on('accountsChanged', handleAccountsChanged);
      return () => {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [connectWallet, showNotification]);

  const getStreamContract = useCallback(() => {
    if (!signer) return null;
    return new ethers.Contract(
      CONTRACT_ADDRESS[network],
      STREAM_CONTRACT_ABI,
      signer,
    );
  }, [signer, network]);

  const getErc20Contract = useCallback(
    (tokenAddress: string) => {
      if (!signer) return null;
      return new ethers.Contract(tokenAddress, ERC20_ABI, signer);
    },
    [signer],
  );

  const createStream = async (
    recipient: string,
    tokenAddress: string,
    deposit: bigint,
    startTime: Date,
    stopTime: Date,
  ) => {
    const streamContract = getStreamContract();
    if (!streamContract) return null;

    setLoading(true);
    try {
      const startTimestamp = Math.floor(startTime.getTime() / 1000);
      const stopTimestamp = Math.floor(stopTime.getTime() / 1000);

      if (startTimestamp >= stopTimestamp) {
        showNotification('Start time must be before stop time.', 'error');
        setLoading(false);
        return null;
      }

      if (startTimestamp < Math.floor(Date.now() / 1000) - 60) {
        // 1 min grace period
        showNotification('Start time cannot be in the past.', 'error');
        setLoading(false);
        return null;
      }

      // Check if this is Arc network with native USDC
      const isArcNative = network === 'arc-testnet' && tokenAddress === 'native';
      
      let createTx;
      
      if (isArcNative) {
        // For Arc native USDC, send value directly with the transaction
        showNotification('Creating stream with native USDC...', 'success');
        createTx = await streamContract.createStream(
          recipient,
          ethers.ZeroAddress, // Use zero address for native token
          deposit,
          startTimestamp,
          stopTimestamp,
          { value: deposit } // Send native USDC as value
        );
      } else {
        // For ERC20 tokens, use the traditional approve + createStream flow
        const erc20Contract = getErc20Contract(tokenAddress);
        if (!erc20Contract) return null;

        // Step 1: Approve
        showNotification('Please approve the token transfer...', 'success');
        const approveTx = await erc20Contract.approve(
          CONTRACT_ADDRESS[network],
          deposit,
        );
        await approveTx.wait();
        showNotification(
          'Approval successful! Now creating stream...',
          'success',
        );

        // Step 2: Create Stream
        createTx = await streamContract.createStream(
          recipient,
          tokenAddress,
          deposit,
          startTimestamp,
          stopTimestamp,
        );
      }
      
      const receipt = await createTx.wait();

      const streamIdEvent = receipt.logs
        .map((log: any) => {
          try {
            return streamContract.interface.parseLog(log);
          } catch (error) {
            return null;
          }
        })
        .find((event: any) => event?.name === 'StreamCreated');

      if (streamIdEvent && streamIdEvent.args) {
        const streamId = Number(streamIdEvent.args.streamId);
        showNotification(
          `Stream created successfully! ID: ${streamId}`,
          'success',
        );
        return streamId;
      }
      showNotification('Could not find StreamCreated event.', 'error');
      return null;
    } catch (error: any) {
      console.error(error);
      showNotification(
        error?.reason ||
          error?.data?.message ||
          error.message ||
          'Failed to create stream.',
        'error',
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getStreamDetails = async (
    streamId: string,
  ): Promise<StreamDetails | null> => {
    const streamContract = getStreamContract();
    if (!streamContract) return null;

    setLoading(true);
    try {
      const streamData = await streamContract.getStream(streamId);
      const withdrawableAmount = await streamContract.withdrawableAmount(
        streamId,
      );

      // Check if this is Arc network with native token (zero address)
      const isArcNative = network === 'arc-testnet' && streamData.token === ethers.ZeroAddress;
      
      let tokenSymbol: string;
      let tokenDecimals: number;

      if (isArcNative) {
        // For Arc native USDC
        tokenSymbol = 'USDC';
        tokenDecimals = 18;
      } else {
        // For ERC20 tokens
        const erc20Contract = getErc20Contract(streamData.token);
        if (!erc20Contract) return null;

        tokenSymbol = await erc20Contract.symbol();
        tokenDecimals = await erc20Contract.decimals();
      }

      return {
        id: parseInt(streamId),
        sender: streamData.sender,
        recipient: streamData.recipient,
        tokenAddress: streamData.token,
        totalAmount: streamData.deposit,
        startTime: streamData.startTime,
        stopTime: streamData.stopTime,
        remainingBalance: BigInt(streamData.deposit) - streamData.withdrawn,
        withdrawableAmount,
        tokenSymbol,
        tokenDecimals: Number(tokenDecimals),
        isEntity: true,
        withdrawn: streamData.withdrawn,
      };
    } catch (error) {
      console.error(error);
      showNotification(
        'Failed to fetch stream details. Make sure the Stream ID is correct.',
        'error',
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const withdrawFromStream = async (streamId: string, amount: bigint) => {
    const streamContract = getStreamContract();
    if (!streamContract) return false;

    setLoading(true);
    try {
      const tx = await streamContract.withdraw(streamId, amount);
      await tx.wait();
      showNotification('Withdrawal successful!', 'success');
      return true;
    } catch (error: any) {
      console.error(error);
      showNotification(
        error?.reason ||
          error?.data?.message ||
          error.message ||
          'Withdrawal failed.',
        'error',
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const cancelStream = async (streamId: string) => {
    const streamContract = getStreamContract();
    if (!streamContract) return false;

    setLoading(true);
    try {
      const tx = await streamContract.cancelStream(streamId);
      await tx.wait();
      showNotification('Stream cancelled successfully!', 'success');
      return true;
    } catch (error: any) {
      console.error(error);
      showNotification(
        error?.reason ||
          error?.data?.message ||
          error.message ||
          'Failed to cancel stream.',
        'error',
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const topUpStream = async (streamId: string, amount: bigint) => {
    const streamContract = getStreamContract();
    if (!streamContract) return false;

    setLoading(true);
    try {
      const tx = await streamContract.topUpStream(streamId, amount);
      await tx.wait();
      showNotification('Stream topped up successfully!', 'success');
      return true;
    } catch (error: any) {
      console.error(error);
      showNotification(
        error?.reason ||
          error?.data?.message ||
          error.message ||
          'Failed to top up stream.',
        'error',
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getWithdrawableAmount = async (streamId: string) => {
    const streamContract = getStreamContract();
    if (!streamContract) return BigInt(0);

    try {
      return await streamContract.withdrawableAmount(streamId);
    } catch (error) {
      console.error(error);
      return BigInt(0);
    }
  };

  const getUserStreams = async (userAddress: string) => {
    const streamContract = getStreamContract();
    if (!streamContract) return [];

    try {
      let senderStreams = [];
      let recipientStreams = [];

      // Try to get sender streams, handle "no streams" error
      try {
        senderStreams = await streamContract.getSenderStreams(userAddress);
      } catch (error: any) {
        if (error.reason && error.reason.includes("no streams for sender")) {
          console.log("No sender streams found for user");
          senderStreams = [];
        } else {
          throw error;
        }
      }

      // Try to get recipient streams, handle "no streams" error  
      try {
        recipientStreams = await streamContract.getRecipientStreams(userAddress);
      } catch (error: any) {
        if (error.reason && error.reason.includes("no streams for recipient")) {
          console.log("No recipient streams found for user");
          recipientStreams = [];
        } else {
          throw error;
        }
      }

      const allStreams = [];

      // Process sender streams
      for (const streamData of senderStreams) {
        const streamId = streamData.streamId.toString();
        const stream = streamData.stream;
        
        // Get additional data
        const withdrawableAmount = await streamContract.withdrawableAmount(streamId);
        
        // Check if this is Arc network with native token
        const isArcNative = network === 'arc-testnet' && stream.token === ethers.ZeroAddress;
        
        let tokenSymbol: string;
        let tokenDecimals: number;

        if (isArcNative) {
          tokenSymbol = 'USDC';
          tokenDecimals = 18;
        } else {
          const erc20Contract = getErc20Contract(stream.token);
          if (erc20Contract) {
            tokenSymbol = await erc20Contract.symbol();
            tokenDecimals = await erc20Contract.decimals();
          } else {
            tokenSymbol = 'Unknown';
            tokenDecimals = 18;
          }
        }

        const streamDetails: StreamDetails = {
          id: parseInt(streamId),
          sender: stream.sender,
          recipient: stream.recipient,
          tokenAddress: stream.token,
          totalAmount: stream.deposit,
          startTime: stream.startTime,
          stopTime: stream.stopTime,
          remainingBalance: BigInt(stream.deposit) - stream.withdrawn,
          withdrawableAmount,
          tokenSymbol,
          tokenDecimals: Number(tokenDecimals),
          isEntity: true,
          withdrawn: stream.withdrawn,
        };

        allStreams.push({
          streamId,
          stream: streamDetails,
          type: 'sent' as const,
        });
      }

      // Process recipient streams
      for (const streamData of recipientStreams) {
        const streamId = streamData.streamId.toString();
        const stream = streamData.stream;
        
        // Get additional data
        const withdrawableAmount = await streamContract.withdrawableAmount(streamId);
        
        // Check if this is Arc network with native token
        const isArcNative = network === 'arc-testnet' && stream.token === ethers.ZeroAddress;
        
        let tokenSymbol: string;
        let tokenDecimals: number;

        if (isArcNative) {
          tokenSymbol = 'USDC';
          tokenDecimals = 18;
        } else {
          const erc20Contract = getErc20Contract(stream.token);
          if (erc20Contract) {
            tokenSymbol = await erc20Contract.symbol();
            tokenDecimals = await erc20Contract.decimals();
          } else {
            tokenSymbol = 'Unknown';
            tokenDecimals = 18;
          }
        }

        const streamDetails: StreamDetails = {
          id: parseInt(streamId),
          sender: stream.sender,
          recipient: stream.recipient,
          tokenAddress: stream.token,
          totalAmount: stream.deposit,
          startTime: stream.startTime,
          stopTime: stream.stopTime,
          remainingBalance: BigInt(stream.deposit) - stream.withdrawn,
          withdrawableAmount,
          tokenSymbol,
          tokenDecimals: Number(tokenDecimals),
          isEntity: true,
          withdrawn: stream.withdrawn,
        };

        allStreams.push({
          streamId,
          stream: streamDetails,
          type: 'received' as const,
        });
      }

      // Sort by stream ID (newest first)
      return allStreams.sort((a, b) => parseInt(b.streamId) - parseInt(a.streamId));
      
    } catch (error) {
      console.error('Error fetching user streams:', error);
      showNotification('Failed to fetch streams.', 'error');
      return [];
    }
  };

  const value = {
    provider,
    signer,
    address,
    isConnected,
    loading,
    network,
    activeNetwork,
    activeTokens,
    connectWallet,
    switchNetwork,
    createStream,
    getStreamDetails,
    withdrawFromStream,
    cancelStream,
    topUpStream,
    getWithdrawableAmount,
    getUserStreams,
  };

  return React.createElement(CeloContext.Provider, { value }, children);
};

export const useCelo = () => {
  const context = useContext(CeloContext);
  if (context === undefined) {
    throw new Error('useCelo must be used within a CeloProvider');
  }
  return context;
};
