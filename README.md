# Cipher Quest Rewards

A decentralized treasure hunt platform with Fully Homomorphic Encryption (FHE) secured rewards and referral system.

## Features

- **FHE-Encrypted Rewards**: All treasure rewards are secured using Fully Homomorphic Encryption
- **Multi-Wallet Support**: Connect with Rainbow, MetaMask, Coinbase Wallet, and more
- **Referral System**: Earn rewards by referring friends to the platform
- **Treasure Map Interface**: Beautiful treasure hunt themed UI with progress tracking
- **Smart Contract Integration**: Deploy and interact with FHE-enabled smart contracts

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: shadcn/ui, Tailwind CSS
- **Web3**: Wagmi, RainbowKit
- **Blockchain**: Ethereum, Polygon, Arbitrum, Optimism
- **Encryption**: FHE (Fully Homomorphic Encryption)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, Rainbow, etc.)

### Installation

```bash
# Clone the repository
git clone https://github.com/noahjohnson83/cipher-quest-rewards.git

# Navigate to the project directory
cd cipher-quest-rewards

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Setup

1. Get a WalletConnect Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Update the `projectId` in `src/lib/wallet.ts`
3. Configure your preferred blockchain networks

## Smart Contract

The platform includes FHE-enabled smart contracts for:
- Secure reward distribution
- Encrypted referral tracking
- Privacy-preserving user data

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables:
   - `VITE_WALLETCONNECT_PROJECT_ID`: Your WalletConnect project ID
3. Deploy to production

### Manual Deployment

```bash
# Build for production
npm run build

# Preview the build
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
