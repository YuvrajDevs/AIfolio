"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface TimelineItem {
  id: number;
  title: string;
  badge: string;
  content: string;
  category: string;
  icon: React.ElementType;
  pills: string[];
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [centerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [windowWidth, setWindowWidth] = useState(1200);
  const [windowHeight, setWindowHeight] = useState(800);
  const [isHydrated, setIsHydrated] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Responsive constants - guarded by hydration to prevent SSR mismatch
  const isMobile = isHydrated && windowWidth < 768;
  const isTablet = isHydrated && windowWidth >= 768 && windowWidth < 1200;
  
  const radius = useMemo(() => {
    if (!isHydrated) return 280;
    if (isMobile) return Math.min(152, windowHeight * 0.25); 
    if (isTablet) return Math.min(220, windowHeight * 0.35); 
    
    // Dynamic radius based on vertical space to prevent top/bottom cutoff
    // Significantly reduced the subtractor to allow a much larger ring presence
    const maxPossibleRadius = (windowHeight - 200) / 2;
    return Math.min(420, maxPossibleRadius > 0 ? maxPossibleRadius : 280);
  }, [isMobile, isTablet, isHydrated, windowHeight]);

  const nodeSizeClass = useMemo(() => {
    if (isMobile) return "w-12 h-12";
    return "w-16 h-16"; 
  }, [isMobile]);

  const iconSize = useMemo(() => {
    if (isMobile) return 18;
    return 24; 
  }, [isMobile]);

  const ringSize = useMemo(() => radius * 2 + 60, [radius]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setAutoRotate(false);
        centerViewOnNode(id);
      } else {
        setAutoRotate(true);
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;

    // Use toFixed to ensure identical strings for server and client hydration
    const x = parseFloat((radius * Math.cos(radian) + centerOffset.x).toFixed(3));
    const y = parseFloat((radius * Math.sin(radian) + centerOffset.y).toFixed(3));

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = 0.95; 

    return { x, y, angle, zIndex, opacity };
  };

  const getStatusStyles = (_badge: string): string => {
    // All badges now use the unified high-tech outline aesthetic
    return "text-sky-400 bg-black/40 border-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.2)]";
  };

  if (!isHydrated) {
    return (
      <div className="relative w-full h-full bg-[#0E0E0E] flex flex-col items-center overflow-hidden">
        {/* Simplified shell for SSR to avoid mismatches */}
        <div className="z-50 flex flex-col gap-0 w-full relative pt-16 pb-8 px-6 items-center text-center">
            <h1 className="font-bebas text-white/95 text-8xl tracking-normal leading-none opacity-0">
                ABOUT
            </h1>
        </div>
        <div className="relative w-full flex-1 flex items-center justify-center min-h-0" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full h-full flex flex-col items-center bg-transparent overflow-hidden transition-transform duration-500",
        "bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:40px_40px]"
      )}
      ref={containerRef}
      onClick={handleContainerClick}
    >
        {/* ARCHITECTURE HEADING */}
        <div className={cn(
            "z-50 flex flex-col gap-0 transition-all duration-300 w-full pointer-events-none",
            isMobile 
              ? "relative pt-16 pb-8 px-6 items-center text-center" 
              : "absolute top-6 left-6 items-start" 
        )}>
            <h1 className={cn(
                "font-bebas text-white/95 tracking-normal leading-none pointer-events-auto",
                isMobile ? "text-8xl" : "text-8xl"
            )}>
                ABOUT
            </h1>
            <div className={cn(
                "flex items-center gap-2 pointer-events-auto",
                isMobile ? "mt-[-0.5rem] justify-center" : "mt-[-1rem]"
            )}>
                {!isMobile && <div className="h-[1px] w-8 bg-sky-400/40" />}
                <span className={cn(
                    "font-outfit text-[9px] font-bold tracking-[0.2em] text-white/10 uppercase shrink-0"
                )}>
                    SYSTEM-ARCH-v2.5
                </span>
            </div>
        </div>

        {/* METADATA CORNER LABELS - ARCHITECTURE AESTHETIC */}
        {!isMobile && (
            <>
                <div className="absolute top-12 right-12 z-50 flex flex-col items-end gap-1 opacity-30 text-[10px] font-mono tracking-widest text-white/40 font-bold uppercase">
                    <span>[ REVISION: v2.4.0 ]</span>
                    <span>[ STATUS: SCANNING... ]</span>
                </div>
                <div className="absolute bottom-12 left-12 z-50 flex flex-col gap-1 opacity-30 text-[10px] font-mono tracking-widest text-white/40 font-bold uppercase">
                    <span>[ COORDINATES: 42.0° N ]</span>
                    <span>[ SECTOR: RADIAL_01 ]</span>
                </div>
                <div className="absolute bottom-12 right-12 z-50 flex flex-col items-end gap-1 opacity-30 text-[10px] font-mono tracking-widest text-white/40 font-bold uppercase">
                    <span>[ SCAN_RANGE: 1200ms ]</span>
                    <span>[ CONNECTION: SECURE ]</span>
                </div>
            </>
        )}

      {/* RING AREA - Centers the ring in the space between header and dock */}
      <div className={cn(
          "relative w-full flex-1 flex items-center justify-center min-h-0", 
          isMobile && "pb-[100px]" 
      )}>
        {isHydrated && (
          <div
            className="absolute w-full h-full flex items-center justify-center"
            ref={orbitRef}
            style={{
              perspective: "1200px",
              transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
            }}
          >
            {/* CENTRAL ENGINE - BLUE THEME */}
            <div className={cn(
              "absolute rounded-full bg-gradient-to-br from-blue-600 via-sky-400 to-cyan-300 animate-pulse flex items-center justify-center z-10 shadow-[0_0_40px_rgba(56,189,248,0.5)]",
              isMobile ? "w-16 h-16" : "w-24 h-24"
            )}>
              <div className={cn(
                "absolute rounded-full border border-sky-400/30 animate-ping opacity-70",
                isMobile ? "w-20 h-20" : "w-32 h-32"
              )}></div>
              <div
                className={cn(
                  "absolute rounded-full border border-sky-400/20 animate-ping opacity-50",
                  isMobile ? "w-24 h-24" : "w-40 h-40"
                )}
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div className={cn(
                "rounded-full bg-[#0E0E0E] flex items-center justify-center",
                isMobile ? "w-8 h-8" : "w-12 h-12"
              )}>
                  <div className="w-3 h-3 rounded-full bg-sky-400 animate-pulse"></div>
              </div>
            </div>

            <div 
              className="absolute rounded-full border border-white/[0.05] pointer-events-none"
              style={{ width: ringSize, height: ringSize }}
            ></div>
            
            {/* DECORATIVE CROSSHAIRS */}
            {!isMobile && (
                <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center">
                    <div className="h-px w-full bg-white/20 absolute" />
                    <div className="w-px h-full bg-white/20 absolute" />
                </div>
            )}

            {timelineData.map((item, index) => {
              const position = calculateNodePosition(index, timelineData.length);
              const isExpanded = expandedItems[item.id];
              const Icon = item.icon;

              const nodeStyle = {
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isExpanded ? 200 : position.zIndex,
                opacity: isExpanded ? 1 : position.opacity,
              };

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    nodeRefs.current[item.id] = el;
                  }}
                  className="absolute transition-all duration-700 cursor-pointer group"
                  style={nodeStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(item.id);
                  }}
                >
                  <motion.div 
                    className={cn(
                      "rounded-full flex items-center justify-center transition-all duration-300 transform border",
                      nodeSizeClass,
                      "bg-[#222222] border-white/25", 
                      isExpanded
                        ? "bg-sky-400 text-[#0E0E0E] border-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.6)] scale-125"
                        : "text-white/90 group-hover:border-sky-400/50 group-hover:bg-[#2A2A2A] group-hover:scale-110",
                      "group-hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                    )}
                    animate={{
                      rotate: isExpanded ? 0 : position.angle + 90,
                      scale: isExpanded ? 1.25 : 1
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                  >
                    <Icon size={iconSize} className="transition-transform duration-300" />
                  </motion.div>

                  <div
                    className={cn(
                      "absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-bebas tracking-[0.2em] transition-all duration-300",
                      isMobile ? "top-14 text-[10px]" : "top-20 text-sm",
                      isExpanded ? "text-sky-400 scale-110" : "text-white/60 group-hover:text-sky-300"
                    )}
                  >
                    {item.title}
                  </div>

                  {isExpanded && (
                    <Card className={cn(
                      "absolute left-1/2 -translate-x-1/2 bg-[#161616]/95 backdrop-blur-xl border-sky-400/30 shadow-2xl shadow-black/80 overflow-visible z-[300]",
                      isMobile ? "top-24 w-60" : "top-32 w-72"
                    )}>
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-sky-400/50"></div>
                      <CardHeader className="pb-2 px-5 pt-5">
                        <div className="flex justify-between items-center mb-1">
                          <Badge
                            className={cn(
                              "px-3 py-0.5 text-[9px] tracking-widest font-bebas rounded-sm",
                              getStatusStyles(item.badge)
                            )}
                          >
                            {item.badge}
                          </Badge>
                          <span className="text-[9px] font-mono font-bold text-sky-400/40 uppercase tracking-tighter">
                            {item.category}
                          </span>
                        </div>
                        <CardTitle className={cn(
                          "font-bebas tracking-wider text-white",
                          isMobile ? "text-xl" : "text-2xl"
                        )}>
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-5 pb-5">
                        <p className="text-xs text-white/70 leading-relaxed font-outfit font-light mb-4">
                          {item.content}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {item.pills.map((pill, i) => (
                            <span 
                              key={i}
                              className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-white/50 uppercase tracking-wider"
                            >
                              {pill}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
