"use client";
import React from "react";
import { motion } from "motion/react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { useSection } from "@/context/SectionContext";
import { cn } from "@/lib/utils";
import { 
  Terminal, 
  Fingerprint, 
  Network, 
  Radio
} from "lucide-react";

interface StaticIconProps {
  icon: React.ElementType;
  isActive?: boolean;
  isHovered?: boolean;
}

const StaticIcon = ({ icon: Icon, isActive, isHovered }: StaticIconProps) => {
  return (
    <Icon 
      className={cn(
        "h-full w-full transition-colors duration-300",
        isActive 
          ? (isHovered ? "text-white" : "text-[#2F56FF]") 
          : (isHovered ? "text-white" : "text-neutral-500")
      )} 
    />
  );
};

export function Sidebar() {
  const { activeSection, activeProject } = useSection();
  const links = [
    {
      title: "Home",
      icon: <StaticIcon icon={Terminal} isActive={activeSection === "home"} />,
      href: "/",
      isActive: activeSection === "home",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setActiveSection("home");
      }
    },
    {
      title: "About",
      icon: <StaticIcon icon={Fingerprint} isActive={activeSection === "about"} />,
      href: "#about",
      isActive: activeSection === "about",
    },
    {
      title: "My Systems",
      icon: <StaticIcon icon={Network} isActive={activeSection === "projects"} />,
      href: "#projects",
      isActive: activeSection === "projects",
    },
    {
      title: "Connect",
      icon: <StaticIcon icon={Radio} isActive={activeSection === "connect"} />,
      href: "#connect",
      isActive: activeSection === "connect",
    },
  ];

  return (
    <>
      {/* Desktop Sidebar (Vertical) */}
      <motion.div 
        className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] hidden md:block"
        animate={{ 
          x: activeProject ? -200 : 0,
          opacity: activeProject ? 0 : 1
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          delay: activeProject ? 0 : 0.15 
        }}
      >
        <FloatingDock
          items={links}
          orientation="vertical"
          desktopClassName="bg-neutral-900/40 backdrop-blur-xl border border-white/5 shadow-2xl"
        />
      </motion.div>

      {/* Mobile Dock (Horizontal - Bottom) */}
      <motion.div 
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] block md:hidden"
        animate={{ 
          y: activeProject ? 100 : 0,
          opacity: activeProject ? 0 : 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <FloatingDock
          items={links}
          showOnMobile={true}
          orientation="horizontal"
          desktopClassName="bg-neutral-900/40 backdrop-blur-xl border border-white/5 shadow-2xl"
        />
      </motion.div>
    </>
  );
}
