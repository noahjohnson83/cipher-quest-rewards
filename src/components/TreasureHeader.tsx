import { Shield, Map, Compass } from "lucide-react";
import treasureMapBg from "@/assets/treasure-map-header.jpg";

export const TreasureHeader = () => {
  return (
    <header 
      className="relative h-48 bg-cover bg-center rounded-xl overflow-hidden border-2 border-treasure-bronze/30 shadow-lg"
      style={{ backgroundImage: `url(${treasureMapBg})` }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-between px-8">
        {/* Left side - Main heading */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-treasure-gold/20 rounded-full border-2 border-treasure-gold/40">
            <Map className="h-8 w-8 text-treasure-gold" />
          </div>
          
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Secret Referral Rewards
            </h1>
            <div className="flex items-center gap-2 text-lg text-muted-foreground">
              <Shield className="h-5 w-5 text-encryption encryption-pulse" />
              <span className="font-semibold">Rewards Secured by FHE</span>
            </div>
          </div>
        </div>
        
        {/* Right side - Compass decoration */}
        <div className="hidden md:flex items-center gap-3">
          <div className="p-4 bg-ocean-deep/10 rounded-full border border-ocean-deep/30">
            <Compass className="h-10 w-10 text-compass animate-spin" style={{ animationDuration: '20s' }} />
          </div>
          
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Encrypted</p>
            <p className="text-lg font-bold text-encryption encryption-pulse">
              Navigation
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-treasure-bronze via-treasure-gold to-treasure-bronze" />
    </header>
  );
};