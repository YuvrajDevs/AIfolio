"use client";
import React, { useState, useRef } from "react";
import { motion, useAnimationControls, AnimatePresence } from "motion/react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ChevronLeft } from "lucide-react";
import { 
  IconMail, 
  IconBrandLinkedin, 
  IconBrandGithub, 
  IconFileText 
} from "@tabler/icons-react";

interface ConnectViewProps {
  isActive: boolean;
  onHome?: () => void;
}

const CONNECT_TEXT = "CONNECT";

const BUTTON_LINKS = [
  { label: "EMAIL", icon: IconMail, href: "mailto:workwithyuvraj0712@gmail.com" },
  { label: "LINKEDIN", icon: IconBrandLinkedin, href: "https://www.linkedin.com/in/yuvraj-singh-shekhawat-4404b4283" },
  { label: "GITHUB", icon: IconBrandGithub, href: "https://github.com/YuvrajDevs" },
  { label: "RESUME", icon: IconFileText, href: "/Yuvraj_Singh.pdf" }
];

export function ConnectView({ isActive, onHome }: ConnectViewProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [lineOpacity, setLineOpacity] = useState(0);
  const isHovered = useRef(false);
  const letterControls = useAnimationControls();
  const scanLineControls = useAnimationControls();

  const runScanSweep = async (direction: "forward" | "backward") => {
    setLineOpacity(1);

    const targetLeft = direction === "forward" ? "100%" : "-5%";
    const initialLeft = direction === "forward" ? "-5%" : "100%";
    
    scanLineControls.set({ left: initialLeft });
    
    const linePromise = scanLineControls.start({
      left: targetLeft,
      transition: { duration: 1.0, ease: "easeInOut" }
    });

    const letters = CONNECT_TEXT.split("");
    const sequence = direction === "forward" ? letters : [...letters].reverse();
    
    const letterPromises = sequence.map((_, i) => {
      const actualIndex = direction === "forward" ? i : letters.length - 1 - i;
      return letterControls.start((custom) => 
        custom === actualIndex ? {
          filter: ["brightness(1)", "brightness(2)", "brightness(1)"],
          textShadow: [
            "0 0 0px rgba(37, 99, 235, 0)",
            "0 0 25px rgba(37, 99, 235, 0.6)",
            "0 0 0px rgba(37, 99, 235, 0)"
          ],
          scaleX: [1, 1.15, 1],
          transition: { 
            duration: 0.45, 
            times: [0, 0.5, 1],
            delay: i * 0.08,
            ease: "easeOut"
          }
        } : {}
      );
    });

    await Promise.all([linePromise, ...letterPromises]);

    if (isHovered.current) {
      runScanSweep(direction === "forward" ? "backward" : "forward");
    } else {
      setLineOpacity(0);
      setIsScanning(false);
    }
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
    if (!isScanning) {
      setIsScanning(true);
      runScanSweep("forward");
    }
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
  };

  return (
    <motion.section
      className="absolute left-full top-0 z-[60] h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
      initial={{ x: "0%" }}
      animate={{ 
        x: isActive ? "0%" : "130%",
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? "auto" : "none",
        width: "100vw"
      }}
      transition={{ 
        x: { type: "spring", stiffness: 150, damping: 20, mass: 1 },
        opacity: { duration: 0.15 } 
      }}
    >
      {/* Home Pull Button (Top Left) */}
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            className="absolute left-0 top-12 z-[70] hidden md:flex w-14 flex-col gap-2"
          >
            <button 
              onClick={onHome} 
              className="flex h-32 w-full flex-col items-center justify-center rounded-r-xl border border-l-0 border-white/10 bg-[#121212]/50 backdrop-blur-md transition-colors hover:bg-[#181818] group"
            >
              <span className="mb-2 rotate-180 text-[11px] font-bold tracking-widest text-neutral-500 group-hover:text-sky-400 transition-colors uppercase" style={{ writingMode: 'vertical-rl' }}>
                HOME
              </span>
              <ChevronLeft className="h-5 w-5 text-neutral-600 group-hover:text-sky-400 transition-transform group-hover:-translate-x-1" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-0 opacity-15">
        <AuroraBackground showRadialGradient={false} className="bg-transparent h-full w-full">
          <div />
        </AuroraBackground>
      </div>

      <motion.div 
        className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <div 
          className="group relative cursor-default"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Layer 1: Sharp Core Scan Line */}
          <motion.div 
            className="absolute top-[-10%] bottom-[-10%] z-30 w-[3px] bg-gradient-to-b from-transparent via-blue-600 to-transparent blur-[2px]"
            initial={{ left: "-5%", opacity: 0 }}
            animate={scanLineControls}
            style={{ opacity: lineOpacity }}
            transition={{ opacity: { duration: 0.3 } }}
          />

          {/* Layer 2: Wide Atmospheric Glow */}
          <motion.div 
            className="absolute top-[-40%] bottom-[-40%] z-20 w-48 bg-gradient-to-r from-transparent via-blue-600/30 to-transparent blur-[40px] pointer-events-none"
            initial={{ left: "-25%", opacity: 0 }}
            animate={scanLineControls}
            style={{ opacity: lineOpacity }}
            transition={{ opacity: { duration: 0.3 } }}
          />

          {/* Layer 3: Radial Haze Effect */}
          <motion.div 
            className="absolute top-1/2 -translate-y-1/2 z-10 h-[150%] w-64 bg-radial-gradient from-blue-600/10 via-blue-600/5 to-transparent blur-[60px] pointer-events-none"
            initial={{ left: "-30%", opacity: 0 }}
            animate={scanLineControls}
            style={{ 
              opacity: lineOpacity,
              background: "radial-gradient(circle at center, rgba(37, 99, 235, 0.2) 0%, rgba(37, 99, 235, 0.08) 40%, transparent 70%)"
            }}
            transition={{ opacity: { duration: 0.4 } }}
          />

          <h2 className="relative flex font-bebas text-[8rem] md:text-[14rem] leading-[0.8] tracking-[-0.04em] text-white">
            {CONNECT_TEXT.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                animate={letterControls}
                className="inline-block origin-center"
              >
                {char}
              </motion.span>
            ))}
          </h2>
        </div>

        <p className="mt-8 max-w-[550px] font-outfit text-base md:text-lg font-light tracking-wide text-[#b0b0b0]">
          Open to remote roles and relocation. I build fast, think in systems, and ship products that work. Let's talk.
        </p>

        {/* TOKEN BUTTONS ROW */}
        <div className="mt-12 grid grid-cols-2 xs:flex xs:flex-wrap xs:items-center xs:justify-center gap-3 xs:gap-4 md:gap-8 w-[90%] max-w-[360px] xs:max-w-[600px] mx-auto md:w-full md:max-w-none">
          {BUTTON_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a 
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group relative flex w-full xs:w-auto items-center justify-center gap-2 xs:gap-3 overflow-hidden rounded-full border border-white/10 bg-transparent px-0 xs:px-4 md:px-6 h-14 transition-all duration-500 hover:border-sky-400/30 hover:bg-sky-400/5 active:scale-[0.98]"
              >
                <Icon className="h-5 w-5 text-white/40 transition-all duration-500 group-hover:text-sky-400 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                <span className="relative z-10 font-bebas text-base xs:text-lg tracking-[0.2em] text-white/40 transition-all duration-500 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(56, 189, 248, 0.6)]">
                  {link.label}
                </span>
              </a>
            );
          })}
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_100%)] opacity-60" />
    </motion.section>
  );
}
