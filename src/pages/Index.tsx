import { TreasureHeader } from "@/components/TreasureHeader";
import { WalletConnect } from "@/components/WalletConnect";
import { TreasureHunt } from "@/components/TreasureHunt";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <TreasureHeader />
        
        {/* Wallet Connection */}
        <WalletConnect />
        
        {/* Main Treasure Hunt Interface */}
        <TreasureHunt />
      </div>
    </div>
  );
};

export default Index;
