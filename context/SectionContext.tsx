"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Section = "home" | "about" | "skills" | "projects" | "contact" | "connect";

interface SectionContextType {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  activeProject: string | null;
  setActiveProject: (projectId: string | null) => void;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export function SectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSectionState] = useState<Section>("home");
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const setActiveSection = (section: Section) => {
    setActiveSectionState(section);
    if (section === "home") {
      window.history.replaceState("", document.title, window.location.pathname + window.location.search);
    } else {
      window.location.hash = section;
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") as Section;
      if (["home", "about", "skills", "projects", "contact", "connect"].includes(hash)) {
        setActiveSectionState(hash);
      } else if (!hash) {
        setActiveSectionState("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <SectionContext.Provider value={{ 
      activeSection, 
      setActiveSection, 
      activeProject, 
      setActiveProject 
    }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSection() {
  const context = useContext(SectionContext);
  if (context === undefined) {
    throw new Error("useSection must be used within a SectionProvider");
  }
  return context;
}
