import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Users, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  Gift,
  Star,
  Crown,
  Gem
} from "lucide-react";
import treasureChest from "@/assets/treasure-chest.jpg";

interface TreasureReward {
  id: string;
  name: string;
  value: string;
  isUnlocked: boolean;
  referralsRequired: number;
  currentReferrals: number;
  rarity: "common" | "rare" | "legendary";
}

export const TreasureHunt = () => {
  const [referralLink] = useState("https://treasure.fhe/ref/abc123");
  const [isLinkVisible, setIsLinkVisible] = useState(false);
  const [totalReferrals] = useState(7);
  
  const treasures: TreasureReward[] = [
    {
      id: "1",
      name: "Bronze Doubloon",
      value: "0.1 ETH",
      isUnlocked: true,
      referralsRequired: 5,
      currentReferrals: 5,
      rarity: "common"
    },
    {
      id: "2", 
      name: "Silver Compass",
      value: "0.3 ETH",
      isUnlocked: true,
      referralsRequired: 7,
      currentReferrals: 7,
      rarity: "rare"
    },
    {
      id: "3",
      name: "Golden Treasure Chest",
      value: "1.0 ETH",
      isUnlocked: false,
      referralsRequired: 15,
      currentReferrals: 7,
      rarity: "legendary"
    },
    {
      id: "4",
      name: "Ancient Relic",
      value: "2.5 ETH",
      isUnlocked: false,
      referralsRequired: 25,
      currentReferrals: 7,
      rarity: "legendary"
    }
  ];

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "common": return <Star className="h-4 w-4" />;
      case "rare": return <Crown className="h-4 w-4" />;
      case "legendary": return <Gem className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-treasure-bronze text-white";
      case "rare": return "bg-treasure-silver text-foreground";
      case "legendary": return "bg-treasure-gold text-foreground";
      default: return "bg-treasure-bronze text-white";
    }
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
  };

  return (
    <div className="space-y-6">
      {/* Referral Section */}
      <Card className="p-6 map-texture border-2 border-treasure-bronze/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-encryption/10 rounded-lg">
              <Users className="h-6 w-6 text-encryption" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Your Secret Referral</h3>
              <p className="text-sm text-muted-foreground">Share your encrypted treasure map</p>
            </div>
          </div>
          
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {totalReferrals} Referred
          </Badge>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-border">
          <div className="flex-1 font-mono text-sm text-muted-foreground">
            {isLinkVisible ? referralLink : "••••••••••••••••••••••••••••••••"}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLinkVisible(!isLinkVisible)}
          >
            {isLinkVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          
          <Button variant="encryption" size="sm" onClick={copyReferralLink}>
            Copy Link
          </Button>
        </div>
      </Card>

      {/* Treasure Map */}
      <Card className="p-6 map-texture border-2 border-treasure-bronze/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-treasure-gold/20 rounded-lg">
            <MapPin className="h-6 w-6 text-treasure-gold" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Treasure Map</h3>
            <p className="text-sm text-muted-foreground">Unlock rewards with more referrals</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {treasures.map((treasure) => (
            <Card 
              key={treasure.id} 
              className={`p-4 border-2 transition-all duration-300 ${
                treasure.isUnlocked 
                  ? 'border-treasure-gold/50 treasure-glow' 
                  : 'border-muted/30 opacity-75'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {treasure.isUnlocked ? (
                    <Unlock className="h-5 w-5 text-treasure-gold" />
                  ) : (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  )}
                  <Badge className={`${getRarityColor(treasure.rarity)} flex items-center gap-1`}>
                    {getRarityIcon(treasure.rarity)}
                    {treasure.rarity}
                  </Badge>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-treasure-gold">{treasure.value}</p>
                </div>
              </div>
              
              <h4 className="font-semibold text-foreground mb-2">{treasure.name}</h4>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground">
                    {treasure.currentReferrals}/{treasure.referralsRequired}
                  </span>
                </div>
                
                <Progress 
                  value={(treasure.currentReferrals / treasure.referralsRequired) * 100}
                  className="h-2"
                />
                
                {treasure.isUnlocked ? (
                  <Button variant="treasure" className="w-full mt-3" size="sm">
                    <Gift className="h-4 w-4 mr-2" />
                    Claim Reward
                  </Button>
                ) : (
                  <p className="text-xs text-center text-muted-foreground mt-3">
                    {treasure.referralsRequired - treasure.currentReferrals} more referrals needed
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Treasure Chest Image */}
      <Card className="p-6 text-center border-2 border-treasure-gold/30 treasure-glow">
        <img 
          src={treasureChest} 
          alt="Magical treasure chest with encrypted rewards"
          className="w-32 h-32 mx-auto mb-4 rounded-lg"
        />
        <h4 className="text-lg font-bold text-foreground mb-2">Your Encrypted Vault</h4>
        <p className="text-sm text-muted-foreground">
          All rewards are secured with Fully Homomorphic Encryption
        </p>
      </Card>
    </div>
  );
};