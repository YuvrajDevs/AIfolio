"use client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useSection } from "@/context/SectionContext";
import { AuroraBackground } from "@/components/ui/aurora-background";

import { ProjectCard } from "@/components/ProjectCard";

const PROJECTS = [
  { 
    id: "hivestate",
    name: "HiveState", 
    subheading: "AI WORKFLOW // MULTI-AGENT",
    desc: "Visual multi-agent orchestration platform that executes LLM pipelines with dependency-aware parallelism and production-grade resilience.",
    image: "/projects/hivestate-visual.png" 
  },
  { 
    id: "resolveos",
    name: "ResolveOS", 
    subheading: "SYSTEM ARCHITECTURE // WORKFLOW",
    desc: "Infrastructure layer handling intelligent capacity-aware routing, SLA enforcement, and real-time load balancing for support operations.",
    image: "/projects/resolveos.png" 
  },
  { 
    id: "burnsight",
    name: "BurnSight", 
    subheading: "FINOPS SYSTEM // LEDGER INTEL",
    desc: "Agentic financial command center that connects to financial data to surface guaranteed cash leaks via forensic-grade detection.",
    image: "/projects/burnsight-light.png" 
  }
];


export function ProjectsView({ isActive, onReturn }: { isActive: boolean; onReturn: () => void }) {
  const { setActiveSection, setActiveProject } = useSection();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [showArrows, setShowArrows] = React.useState(false);

  React.useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowArrows(true), 1700);
      return () => clearTimeout(timer);
    } else {
      setShowArrows(false);
    }
  }, [isActive]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const scrollAmount = window.innerWidth * 0.8;

      if (direction === "right" && scrollLeft + clientWidth >= scrollWidth - 50) {
        // Loop to start
        scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else if (direction === "left" && scrollLeft <= 50) {
        // Loop to end
        scrollContainerRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
      } else {
        scrollContainerRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <motion.div 
      className="absolute inset-0 h-screen w-full flex items-center justify-center bg-[#0E0E0E] overflow-hidden"
      initial={{ y: "100%", opacity: 0 }}
      animate={{ 
         y: isActive ? "0%" : "100%", 
         opacity: isActive ? 1 : 0 
      }}
      transition={{ 
         y: { type: "spring", stiffness: 200, damping: 20, delay: isActive ? 0.2 : 0 },
         opacity: { duration: 0.2, delay: isActive ? 0.2 : 0 }
      }}
    >
      {/* Subtle Aurora Glow - refined for minimal distraction */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.22 : 0 }}
        style={{ 
          maskImage: "linear-gradient(to bottom, black 0%, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 70%)"
        }}
        transition={{ duration: 1.5, delay: isActive ? 0.8 : 0, ease: "easeOut" }}
      >
        <AuroraBackground 
            showRadialGradient={false} 
            className="dark bg-transparent w-full h-full flex items-center justify-center"
        >
            <div />
        </AuroraBackground>
      </motion.div>
        
      {/* Cinematic Intermediate Text */}
      <motion.div
         className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
         initial={{ opacity: 0, scale: 0.8, y: 60 }}
         animate={
            isActive 
               ? { opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 1.1], y: [60, 0, 0, -60] } 
               : { opacity: 0, scale: 0.8, y: 60 }
         }
         transition={{ 
            duration: 1.5, 
            times: [0, 0.3, 0.7, 1], 
            ease: ["backOut", "linear", "anticipate"], 
            delay: isActive ? 0.15 : 0 
         }}
      >
         <h1 className="flex flex-col text-center font-bebas text-6xl md:text-8xl tracking-[0.1em] text-[#FFD700] mix-blend-screen drop-shadow-[0_0_40px_rgba(255,215,0,0.4)] leading-[0.9]">
            <span>EXPLORE</span>
            <span>SYSTEMS</span>
         </h1>
      </motion.div>

        {/* Core Projects Grid Layout */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8 pt-8 md:pt-20 pb-20 flex flex-col justify-start md:justify-center gap-6 md:gap-10 h-full overflow-hidden">
           
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: isActive ? 1.5 : 0, duration: 0.6, ease: "easeOut" }}
              className="flex items-center justify-between w-full"
            >
               <div className="flex items-center gap-4 md:gap-6 flex-1">
                  <h2 className="font-bebas text-3xl xs:text-5xl lg:text-7xl text-white tracking-widest leading-none">SELECTED SYSTEMS</h2>
                  <div className="h-[1px] flex-1 bg-white/10 hidden md:block"></div>
               </div>
               
               {/* Return to Core Node */}
               <div className="flex items-center gap-4">
                  <button 
                     onClick={onReturn}
                     className="group flex items-center gap-2 md:gap-3 font-bebas text-lg md:text-xl text-neutral-400 hover:text-white transition-colors"
                  >
                     <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-transform group-hover:-translate-x-2">
                        <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
                     </div>
                     <span className="tracking-widest uppercase">RETURN CORE</span>
                  </button>
               </div>
            </motion.div>

          {/* Cards Carousel/Grid */}
          <div className="flex-1 min-h-0 w-full flex items-center relative -translate-y-4 md:translate-y-0">
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 h-full w-full flex items-center overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory px-0 md:px-0"
            >
              <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-5 pb-8 md:pb-0 px-4 md:px-0 w-max md:w-full">
                 {PROJECTS.map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.96, y: 40 }}
                      animate={isActive ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 40 }}
                      transition={{ 
                         delay: isActive ? 1.7 + (i * 0.1) : 0, 
                         duration: 0.7, 
                         ease: [0.25, 1, 0.5, 1] 
                      }}
                      className="flex-shrink-0 w-[80vw] xs:w-[360px] md:w-full md:flex-shrink flex justify-center snap-start"
                    >
                       <ProjectCard 
                          id={project.id}
                          name={project.name}
                          subheading={project.subheading}
                          description={project.desc}
                          image={project.image}
                          index={i}
                          onClick={() => setActiveProject(project.id)}
                       />
                    </motion.div>
                 ))}
              </div>
            </div>

            {/* Mobile Navigation Buttons */}
            <AnimatePresence>
              {showArrows && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-4 left-0 right-0 flex justify-center gap-6 xs:hidden z-20"
                >
                  <button 
                    onClick={() => scroll("left")}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#161616]/80 backdrop-blur-md transition-all opacity-100 hover:bg-[#202020] active:scale-90"
                  >
                    <ChevronLeft className="h-6 w-6 text-white" />
                  </button>
                  <button 
                    onClick={() => scroll("right")}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#161616]/80 backdrop-blur-md transition-all opacity-100 hover:bg-[#202020] active:scale-90"
                  >
                    <ChevronRight className="h-6 w-6 text-white" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
       </div>

    </motion.div>

  );
}
