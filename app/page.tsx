"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { Spotlight } from "@/components/ui/spotlight-new";
import { InteractiveCards } from "@/components/InteractiveCards";
import { ProjectsView } from "@/components/ProjectsView";
import { CaseStudyOverlay } from "@/components/CaseStudyOverlay";
import { ConnectView } from "@/components/ConnectView";
import { useSection } from "@/context/SectionContext";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  const { activeSection, setActiveSection, activeProject } = useSection();

  const isAbout = activeSection === "about";
  const isContact = activeSection === "contact";
  const isProjects = activeSection === "projects";
  const isConnect = activeSection === "connect";
  const isHome = activeSection === "home";

  // Geometrically freeze the horizontal layout parameters during vertical transitions
  const lastHorizontalState = React.useRef(activeSection);
  if (activeSection !== "projects") {
    lastHorizontalState.current = activeSection;
  }

  // Any "page" (About, Contact, Resume) triggers the 100vw slide
  const isAnyPageActive = isAbout || isContact || isConnect;

  return (
    // Master Camera Viewport
    <main className="relative block h-screen w-full overflow-hidden bg-[#0E0E0E]">
      
      {/* Master Camera Viewport */}
      <motion.section 
         className="absolute inset-0 flex flex-col items-center justify-center overflow-visible"
         animate={{ 
            y: isProjects ? "-30vh" : "0vh",
            x: activeProject ? "-50vw" : (isAnyPageActive ? "-100vw" : "0%"),
            opacity: (isProjects || activeProject) ? 0 : 1,
            scale: (isProjects || activeProject) ? 0.95 : 1
         }}
         transition={{ 
            y: { type: "spring", stiffness: 200, damping: 20 },
            x: { type: "spring", stiffness: 150, damping: 15 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 }
         }}
         style={{ pointerEvents: (isProjects || activeProject) ? "none" : "auto" }}
      >
            <Spotlight duration={8} xOffset={100} className="opacity-50" />
            
            {/* Background Effect */}
            <div className="absolute inset-0 z-0">
              <BackgroundRippleEffect rows={30} cols={50} cellSize={40} />
            </div>

            {/* Hero Content */}
            <motion.div 
               layout
               className={`relative z-10 flex w-full min-w-0 max-w-[90vw] xs:max-w-[85vw] md:max-w-5xl flex-col justify-center px-4 xs:px-6 pb-24 md:pb-0 ${
               isAnyPageActive ? "hidden" : "items-center text-center mx-auto"
               }`}
               animate={{ 
               x: isAnyPageActive ? "-100%" : "0%",
               opacity: isAnyPageActive ? 0 : 1
               }}
               transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
               <motion.h1 
               layout 
               transition={{ type: "spring", stiffness: 200, damping: 15 }}
               className={`flex flex-col font-heading leading-[0.8] tracking-tighter items-center justify-center`}
               >
               <motion.span 
                  layout 
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="text-4xl text-white opacity-70 xs:text-5xl md:text-6xl lg:text-7xl mb-4"
               >
                  Hey I am,
               </motion.span>
               <motion.a 
                  href="/Yuvraj_Singh.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  layout 
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="mt-[-10px] relative group cursor-pointer block"
               >
                  <div className="relative inline-block">
                     <EncryptedText
                        text="Yuvraj"
                        revealDelayMs={85}
                        className="text-[8rem] leading-[0.8] text-white xs:text-[10rem] md:text-[12rem] lg:text-[14rem]"
                        revealedClassName="text-white"
                        encryptedClassName="text-white/20 font-sans"
                     />
                     <motion.div 
                        className="absolute -top-2 -right-6 md:-top-4 md:-right-10 text-white/20 group-hover:text-sky-400 transition-colors duration-300"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.2, x: 2, y: -2 }}
                     >
                        <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1.5} />
                     </motion.div>
                  </div>
               </motion.a>
               </motion.h1>
               
               <motion.p 
               layout 
               transition={{ type: "spring", stiffness: 200, damping: 15 }}
               className="mt-2 max-w-xl font-outfit text-sm font-light tracking-wide text-neutral-400 xs:text-base md:text-lg lg:max-w-2xl"
               >
               I build AI-powered systems end to end from architecture to interface. 
               Product thinking, clean engineering, and agent-driven automation combined 
               into tools that actually ship.
               </motion.p>

               <motion.div 
               layout 
               transition={{ type: "spring", stiffness: 200, damping: 15 }}
               className={`mt-8 flex flex-row flex-wrap justify-center gap-4`}
               >
               <button 
                  onClick={() => setActiveSection("projects")}
                  className="group relative flex items-center justify-center overflow-hidden rounded-xl bg-[#FFD700] px-8 py-3 font-bebas text-lg font-bold uppercase tracking-widest text-[#0E0E0E] transition-all hover:bg-[#FFC000] active:scale-95 shadow-[0_0_20px_rgba(255,215,0,0.2)]"
               >
                  My Systems
               </button>
               <button 
                  onClick={() => setActiveSection("connect")}
                  className="group relative flex items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white/5 px-8 py-3 font-bebas text-lg font-bold uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/10 active:scale-95"
               >
                  Connect
               </button>
               </motion.div>
            </motion.div>

            {/* About Page (Full screen independent page) */}
            <InteractiveCards 
               isExpanded={isAbout}
               onGoHome={() => setActiveSection("home")}
               isConnectActive={false}
               onConnectToggle={() => {}}
               isHome={isHome}
               mode="page"
               onAboutPull={() => setActiveSection("about")}
            />

            {/* Connect Page */}
            <ConnectView 
               isActive={isConnect} 
               onHome={() => setActiveSection("home")}
            />

            {/* Aesthetic Accents */}
            <div className="pointer-events-none absolute bottom-10 left-10 z-20 hidden md:block">
               <p className="font-bebas text-sm tracking-[0.3em] text-white/30 uppercase">
               Based in India / Available Worldwide
               </p>
            </div>
            
            <div className="pointer-events-none absolute bottom-10 right-10 z-20 hidden md:block">
               <p className="font-bebas text-sm tracking-[0.3em] text-white/30 uppercase">
               Portfolio 2026
               </p>
            </div>

            {/* Gradient Vignette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0E0E0E]/10 to-[#0E0E0E] opacity-80" />
      </motion.section>

      {/* Layer 02: Projects Section */}
      <motion.div 
        className={`absolute inset-0 z-40 ${isProjects ? "pointer-events-auto" : "pointer-events-none"}`}
        animate={{ 
          x: activeProject ? "-100vw" : "0%",
          opacity: activeProject ? 0 : 1
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
         <ProjectsView 
           isActive={isProjects} 
           onReturn={() => setActiveSection(lastHorizontalState.current)}
         />
      </motion.div>

      {/* Layer 03: Case Study Overlay */}
      <AnimatePresence>
        {activeProject && <CaseStudyOverlay projectId={activeProject} key={activeProject} />}
      </AnimatePresence>
    </main>
  );
}
