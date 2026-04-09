"use client";
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IconProps {
  isHovered?: boolean;
  isActive?: boolean;
}

export const HomeIcon = ({ isHovered, isActive }: IconProps) => {
  const strokeColor = isHovered && isActive ? "#FFFFFF" : (isActive ? "#2F56FF" : "currentColor");
  
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full"
    >
      {/* Terminal Prompt */}
      <motion.path
        d="m5 7 5 5-5 5"
        animate={isHovered ? { x: [0, 2, 0], transition: { duration: 0.6, repeat: Infinity } } : { x: 0 }}
      />
      <motion.path
        d="M12 17h7"
        animate={isHovered ? { 
          opacity: [1, 0, 1]
        } : { opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
    </motion.svg>
  );
};

export const AboutIcon = ({ isHovered, isActive }: IconProps) => {
  const strokeColor = isHovered && isActive ? "#FFFFFF" : (isActive ? "#2F56FF" : "currentColor");

  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full"
    >
      <path d="M2 12a10 10 0 0 1 18-6" />
      <path d="M6 18c0-2.5 1.5-3.5 1.5-3.5" />
      <path d="M8 14a5 5 0 1 1 10 0" />
      <motion.path 
        d="M12 10a4 4 0 0 0-4 4c0 1.02.36 2.14 1 3" 
        animate={isHovered ? { pathLength: [1, 0.8, 1] } : {}}
      />
      <motion.path 
        d="M12 14a2 2 0 0 1 2 2c0 .99-.69 1.96-2 3" 
        animate={isHovered ? { opacity: [1, 0.5, 1] } : {}}
      />
      <path d="M15 16.5c0 1-1.33 2-3 3" />
    </motion.svg>
  );
};

export const ProjectsIcon = ({ isHovered, isActive }: IconProps) => {
  const strokeColor = isHovered && isActive ? "#FFFFFF" : (isActive ? "#2F56FF" : "currentColor");

  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full"
    >
      {/* Network Nodes Systems - Clearer/Bigger version */}
      <motion.circle 
        cx="12" cy="6" r="3" 
        animate={isHovered ? { scale: 1.15 } : {}}
      />
      <motion.circle 
        cx="6" cy="18" r="3" 
        animate={isHovered ? { x: -1, y: 1 } : {}}
      />
      <motion.circle 
        cx="18" cy="18" r="3" 
        animate={isHovered ? { x: 1, y: 1 } : {}}
      />
      <path d="M12 9v6M9 18h6" />
    </motion.svg>
  );
};

export const ResumeIcon = ({ isHovered, isActive }: IconProps) => {
  const strokeColor = isHovered && isActive ? "#FFFFFF" : (isActive ? "#2F56FF" : "currentColor");

  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full"
    >
      {/* Simple Broadcast Signal */}
      <circle cx="12" cy="18" r="1.5" fill={strokeColor} />
      <motion.path 
        d="M7 13c1.9-1.9 5.1-1.9 7 0" 
        animate={isHovered ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.path 
        d="M4.5 10.5c4.1-4.1 10.9-4.1 15 0" 
        animate={isHovered ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
      />
      <motion.path 
        d="M1.5 7.5c5.8-5.8 15.2-5.8 21 0" 
        animate={isHovered ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
      />
    </motion.svg>
  );
};

