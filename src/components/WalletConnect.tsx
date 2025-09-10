import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Card } from "@/components/ui/card";
import { Wallet, Shield } from "lucide-react";

interface WalletConnectProps {
  onConnect?: (address: string) => void;
}

export const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  return (
    <Card className="p-4 map-texture border-2 border-treasure-bronze/30">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-ocean-deep/10 rounded-lg">
          <Wallet className="h-5 w-5 text-ocean-deep" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Wallet Connection</p>
              <p className="text-xs text-muted-foreground">Connect to secure your treasures with FHE encryption</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-encryption/10 rounded-md">
                <Shield className="h-3 w-3 text-encryption" />
                <span className="text-xs text-encryption font-medium">FHE</span>
              </div>
              
              <ConnectButton 
                chainStatus="icon"
                accountStatus={{
                  smallScreen: 'avatar',
                  largeScreen: 'full',
                }}
                showBalance={{
                  smallScreen: false,
                  largeScreen: true,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};