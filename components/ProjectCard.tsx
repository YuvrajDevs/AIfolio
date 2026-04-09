"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  id: string;
  name: string;
  subheading: string;
  description: string;
  image: string;
  index: number;
  onClick?: () => void;
}

export function ProjectCard({ 
  id, 
  name, 
  subheading, 
  description, 
  image, 
  index,
  onClick
}: ProjectCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className="group relative h-[440px] w-full max-w-[380px] mx-auto rounded-[32px] overflow-hidden border border-white/5 bg-neutral-900 cursor-pointer shadow-2xl"
      whileHover={{ y: -12 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Background Image with Parallax/Scale Effect */}
      <motion.div className="absolute inset-0 z-0">
        <motion.div className="absolute inset-0 z-0">
          <motion.img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          />
        </motion.div>
        {/* Dark Glassmorphic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 via-40% to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]" />
      </motion.div>

      {/* Top Right Arrow Icon */}
      <div className="absolute top-6 right-6 z-20">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white/40 group-hover:text-white group-hover:border-white/30 transition-all duration-300">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-8 pb-10 pt-16 pointer-events-none">
        <div className="flex flex-col items-start gap-1">
          {/* Status Label */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-outfit text-[10px] font-bold text-yellow-400/40 uppercase tracking-[0.4em]">
              0{index + 1} // SYSTEM
            </span>
          </div>

          {/* Project Name */}
          <h3 className="font-bebas text-4xl md:text-5xl text-white leading-[0.8] mb-2 uppercase">
            {name}
          </h3>

          {/* Subheading */}
          <div className="mb-3">
             <p className="font-outfit text-[10px] font-bold text-yellow-400 uppercase tracking-[0.25em] opacity-90 inline-block py-1 px-0 border-b border-yellow-400/20">
               {subheading}
             </p>
          </div>

          {/* Description */}
          <p className="font-outfit text-xs md:text-sm text-neutral-400 font-medium leading-[1.6] max-w-[280px] line-clamp-2 group-hover:text-neutral-300 transition-colors">
            {description}
          </p>
        </div>
      </div>


      {/* Internal Subtle Accent Glow */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-1/2 bg-gradient-to-t from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>

  );
}
