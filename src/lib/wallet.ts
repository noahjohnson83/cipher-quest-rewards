import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, mainnet, polygon, arbitrum, optimism } from 'wagmi/chains';

// Configure chains for production
export const config = getDefaultConfig({
  appName: 'Cipher Quest Rewards',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Get from https://cloud.walletconnect.com
  chains: [sepolia, mainnet, polygon, arbitrum, optimism],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

// Alternative wallet configurations for diversity
export const walletConfigs = {
  rainbow: {
    name: 'Rainbow',
    description: 'The fun, simple, and secure way to start exploring web3',
  },
  metaMask: {
    name: 'MetaMask',
    description: 'Connect using browser extension',
  },
  coinbase: {
    name: 'Coinbase Wallet',
    description: 'Connect using Coinbase Wallet',
  },
  walletConnect: {
    name: 'WalletConnect',
    description: 'Connect using WalletConnect',
  },
  trust: {
    name: 'Trust Wallet',
    description: 'Connect using Trust Wallet',
  },
  phantom: {
    name: 'Phantom',
    description: 'Connect using Phantom Wallet',
  },
};
