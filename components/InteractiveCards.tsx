"use client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSection } from "@/context/SectionContext";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
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

function AnimatedEye({ mousePos, color }: { mousePos: { x: number; y: number }, color: string }) {
  const eyeRef = React.useRef<HTMLDivElement>(null);
  const [pupilPos, setPupilPos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!eyeRef.current) return;
    const rect = eyeRef.current.getBoundingClientRect();
    if (!rect) return;
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const angle = Math.atan2(mousePos.y - eyeCenterY, mousePos.x - eyeCenterX);
    const distance = Math.min(
      Math.hypot(mousePos.x - eyeCenterX, mousePos.y - eyeCenterY) / 10,
      4.5
    );

    setPupilPos({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance
    });
  }, [mousePos]);

  const clipId = React.useId().replace(/:/g, "");

  return (
    <div className="relative flex flex-col items-center justify-center mb-1">
      <div
        ref={eyeRef}
        className="relative w-12 h-8 flex items-center justify-center overflow-hidden"
      >
        <svg viewBox="0 0 40 24" className="w-full h-full" style={{ overflow: 'visible' }}>
          <defs>
            <clipPath id={`eyeClip-${clipId}`}>
              <path d="M 2,12 C 8,1 32,1 38,12 C 32,23 8,23 2,12 Z" />
            </clipPath>
          </defs>

          <path
            d="M 2,12 C 8,1 32,1 38,12 C 32,23 8,23 2,12 Z"
            fill="white"
            stroke={color}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          <g clipPath={`url(#eyeClip-${clipId})`}>
            <motion.circle
              cx={20}
              cy={12}
              r={5}
              fill="black"
              animate={{
                x: pupilPos.x,
                y: pupilPos.y
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            />

            <motion.rect
              x="0"
              y="0"
              width="40"
              height="12"
              fill="white"
              initial={{ scaleY: 0 }}
              animate={{
                scaleY: [0, 0, 1.1, 0, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3.2,
                times: [0, 0.45, 0.5, 0.55, 1],
                ease: "easeInOut"
              }}
              style={{ originY: 0 }}
            />

            <motion.rect
              x="0"
              y="12"
              width="40"
              height="12"
              fill="white"
              initial={{ scaleY: 0 }}
              animate={{
                scaleY: [0, 0, 1.1, 0, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3.2,
                times: [0, 0.45, 0.5, 0.55, 1],
                ease: "easeInOut"
              }}
              style={{ originY: 1 }}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

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
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = React.useState(false);
  const [isMidSize, setIsMidSize] = React.useState(false);

  // Grid sizing: progressively fewer nodes on constrained devices
  const gridRows = isLowEnd ? 0 : isMidTier ? 16 : 22;
  const gridCols = isLowEnd ? 0 : isMidTier ? 28 : 38;

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsMidSize(window.innerWidth >= 768 && window.innerWidth < 1100);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    let frameId: number;
    let frameCount = 0;
    const handleMouseMove = (e: MouseEvent) => {
      frameId = requestAnimationFrame(() => {
        // Low-end: update mouse position every other frame to halve the work
        frameCount++;
        if (!isLowEnd || frameCount % 2 === 0) {
          setMousePos({ x: e.clientX, y: e.clientY });
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [isLowEnd]);

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
        {/* Background Ripple & Spotlight */}
        <div className="absolute inset-0 z-0 opacity-40">
           <BackgroundRippleEffect rows={gridRows} cols={gridCols} cellSize={40} lowEnd={isLowEnd} />
           <Spotlight duration={8} xOffset={100} className="opacity-20" simplified={isLowEnd} />
        </div>

        <div className="base-layer h-full w-full absolute inset-0 z-[1]">
          {renderCardsGrid()}
        </div>
      </div>
    </motion.div>
  );
}
