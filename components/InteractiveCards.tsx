"use client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSection } from "@/context/SectionContext";
import { Spotlight } from "@/components/ui/spotlight-new";
import RadialOrbitalTimelineDemo from "@/components/ui/radial-orbital-timeline-demo";
import { usePerformance } from "@/lib/usePerformance";

interface InteractiveCardsProps {
  isExpanded: boolean;
  onGoHome: () => void;
  isConnectActive: boolean;
  onConnectToggle: () => void;
  mode: "extras" | "page";
  onAboutPull: () => void;
  isHome?: boolean;
}

// Constants removed as About section is now empty



export function InteractiveCards({
  isExpanded,
  onGoHome,
  isConnectActive,
  onConnectToggle,
  mode,
  onAboutPull,
  isHome = false
}: InteractiveCardsProps) {
  const { setActiveSection } = useSection();
  const { isLowEnd, isMidTier } = usePerformance();
  const [isMobile, setIsMobile] = React.useState(false);
  const [isMidSize, setIsMidSize] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsMidSize(window.innerWidth >= 768 && window.innerWidth < 1100);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  // Content logic removed as About section is now empty

  const renderCardsGrid = () => (
    <div 
      className={cn(
        "relative flex items-center justify-center transition-all duration-300 ease-in-out z-10 w-full h-full",
        "p-0 overflow-visible"
      )}
    >
      <RadialOrbitalTimelineDemo />
    </div>
  );

  return (
    <motion.div
      key={mode}
      className={cn(
        "absolute left-full top-0 flex h-screen flex-col border-white/5 bg-[#0E0E0E] p-0 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]",
        mode === "extras" ? "z-50 border-l" : "z-[70]"
      )}
      initial={{ x: "100%" }}
      animate={{
        x: isExpanded ? "0%" : "100%",
        opacity: isExpanded ? 1 : 0,
        pointerEvents: isExpanded ? "auto" : "none",
        width: mode === "extras" ? (isMobile ? "100vw" : "40vw") : "100vw"
      }}
      transition={{
        x: { type: "spring", stiffness: 150, damping: 15, mass: 1 },
        opacity: { duration: 0.15 }
      }}
      style={{ willChange: "transform, width" }}
    >
      <div className="relative h-full w-full overflow-hidden border-l border-white/10">
        {/* Background Grid & Spotlight */}
        <div className="absolute inset-0 z-0 opacity-40 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]">
           <Spotlight duration={8} xOffset={100} className="opacity-20" simplified={true} />
        </div>

        <div className="base-layer h-full w-full absolute inset-0 z-[1]">
          {renderCardsGrid()}
        </div>
      </div>
    </motion.div>
  );
}
