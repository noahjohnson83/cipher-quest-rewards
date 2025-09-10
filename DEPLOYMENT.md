# Vercel Deployment Guide for Cipher Quest Rewards

This guide provides step-by-step instructions for deploying the Cipher Quest Rewards application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **WalletConnect Project ID**: Get one from [WalletConnect Cloud](https://cloud.walletconnect.com)

## Step-by-Step Deployment

### Step 1: Connect GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Select **"Import Git Repository"**
4. Choose **"noahjohnson83/cipher-quest-rewards"** from your GitHub repositories
5. Click **"Import"**

### Step 2: Configure Project Settings

1. **Project Name**: `cipher-quest-rewards` (or your preferred name)
2. **Framework Preset**: Select **"Vite"** (should auto-detect)
3. **Root Directory**: Leave as `./` (default)
4. **Build Command**: `npm run build` (should auto-populate)
5. **Output Directory**: `dist` (should auto-populate)
6. **Install Command**: `npm install` (should auto-populate)

### Step 3: Set Environment Variables

Click **"Environment Variables"** and add:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `VITE_WALLETCONNECT_PROJECT_ID` | `your_walletconnect_project_id` | Your WalletConnect Project ID from cloud.walletconnect.com |

**Important**: Replace `your_walletconnect_project_id` with your actual WalletConnect Project ID.

### Step 4: Advanced Configuration (Optional)

If you need custom configuration, you can modify the `vercel.json` file:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "env": {
    "VITE_WALLETCONNECT_PROJECT_ID": "@walletconnect_project_id"
  }
}
```

### Step 5: Deploy

1. Click **"Deploy"** button
2. Wait for the build process to complete (usually 2-5 minutes)
3. Your application will be available at the provided Vercel URL

### Step 6: Custom Domain (Optional)

1. Go to your project dashboard in Vercel
2. Click **"Settings"** tab
3. Click **"Domains"** in the sidebar
4. Add your custom domain
5. Follow the DNS configuration instructions

## Post-Deployment Configuration

### Update Wallet Configuration

After deployment, update the wallet configuration in your code:

1. Go to `src/lib/wallet.ts`
2. Update the `projectId` with your actual WalletConnect Project ID
3. Commit and push changes to trigger automatic redeployment

### Smart Contract Deployment

To deploy the smart contracts:

1. Set up environment variables for Hardhat:
   ```bash
   SEPOLIA_RPC_URL=your_sepolia_rpc_url
   PRIVATE_KEY=your_private_key
   ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

2. Deploy the contract:
   ```bash
   npm run deploy
   ```

3. Update the contract address in your frontend configuration

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_WALLETCONNECT_PROJECT_ID` | Yes | WalletConnect Project ID | `abc123def456...` |
| `VITE_CONTRACT_ADDRESS` | No | Deployed contract address | `0x1234...` |
| `VITE_VERIFIER_ADDRESS` | No | Verifier contract address | `0x5678...` |

## Troubleshooting

### Common Issues

1. **Build Fails**: Check that all dependencies are properly installed
2. **Wallet Connection Issues**: Verify WalletConnect Project ID is correct
3. **Contract Interaction Issues**: Ensure contract is deployed and address is correct

### Build Logs

Check build logs in Vercel dashboard:
1. Go to your project
2. Click on the deployment
3. Check the "Build Logs" tab for any errors

### Local Testing

Test locally before deploying:
```bash
npm install
npm run dev
```

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to the repository
2. **Contract Verification**: Verify your smart contracts on Etherscan
3. **Access Control**: Implement proper access controls in your smart contracts

## Performance Optimization

1. **Image Optimization**: Use optimized images for better loading times
2. **Code Splitting**: Vite automatically handles code splitting
3. **Caching**: Vercel provides automatic caching for static assets

## Monitoring

1. **Analytics**: Enable Vercel Analytics for usage insights
2. **Error Tracking**: Consider adding error tracking services
3. **Performance Monitoring**: Monitor Core Web Vitals

## Support

For issues with:
- **Vercel**: Check [Vercel Documentation](https://vercel.com/docs)
- **WalletConnect**: Check [WalletConnect Documentation](https://docs.walletconnect.com)
- **FHE**: Check [FHEVM Documentation](https://docs.fhevm.org)

## Next Steps

After successful deployment:

1. Test all wallet connections
2. Verify smart contract interactions
3. Set up monitoring and analytics
4. Configure custom domain (if needed)
5. Set up CI/CD for automatic deployments
