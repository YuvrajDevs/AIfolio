"use client";
/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import React, { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
  orientation = "horizontal",
  showOnMobile = false,
}: {
  items: { title: string; icon: React.ReactNode; href: string; isActive?: boolean; onClick?: (e: React.MouseEvent) => void }[];
  desktopClassName?: string;
  mobileClassName?: string;
  orientation?: "horizontal" | "vertical";
  showOnMobile?: boolean;
}) => {
  return (
    <>
      <FloatingDockDesktop
        items={items}
        className={cn(showOnMobile && "flex", desktopClassName)}
        orientation={orientation}
        showOnMobile={showOnMobile}
      />
      {!showOnMobile && (
        <FloatingDockMobile items={items} className={mobileClassName} />
      )}
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string; isActive?: boolean; onClick?: (e: React.MouseEvent) => void }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <a
                  href={item.href}
                  key={item.title}
                  onClick={item.onClick}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"
                >
                  <div className={cn("h-4 w-4", item.isActive && "text-[#2F56FF]")}>
                    {React.isValidElement(item.icon)
                      ? React.cloneElement(item.icon as React.ReactElement<{ isActive?: boolean }>, {
                          isActive: item.isActive,
                        })
                      : item.icon}
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
  orientation = "horizontal",
  showOnMobile = false,
}: {
  items: { title: string; icon: React.ReactNode; href: string; isActive?: boolean; onClick?: (e: React.MouseEvent) => void }[];
  className?: string;
  orientation?: "horizontal" | "vertical";
  showOnMobile?: boolean;
}) => {
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => {
        mouseX.set(e.pageX);
        mouseY.set(e.pageY);
      }}
      onMouseLeave={() => {
        mouseX.set(Infinity);
        mouseY.set(Infinity);
      }}
      className={cn(
        "mx-auto hidden items-center gap-4 rounded-2xl bg-gray-50 px-4 dark:bg-neutral-900",
        orientation === "horizontal" ? "h-16 items-end pb-3 flex" : "w-16 flex-col py-4 flex",
        showOnMobile && "flex h-12 pb-2", // smaller on mobile
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer
          mouseX={mouseX}
          mouseY={mouseY}
          orientation={orientation}
          key={item.title}
          {...item}
        />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  mouseY,
  title,
  icon,
  href,
  isActive,
  onClick,
  orientation = "horizontal",
}: {
  mouseX: MotionValue;
  mouseY: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  orientation?: "horizontal" | "vertical";
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(
    orientation === "horizontal" ? mouseX : mouseY,
    (val) => {
      const bounds = ref.current?.getBoundingClientRect() ?? {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      };

      if (orientation === "horizontal") {
        return val - bounds.x - bounds.width / 2;
      } else {
        return val - bounds.y - bounds.height / 2;
      }
    },
  );

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href} onClick={onClick}>
      <motion.div
        ref={ref}
        style={{
          width,
          height,
          backgroundColor: hovered ? "#2F56FF" : "rgba(38, 38, 38, 0.4)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full transition-colors duration-500"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{
                opacity: 0,
                y: orientation === "horizontal" ? 10 : "-50%",
                x: orientation === "horizontal" ? "-50%" : 10,
              }}
              animate={{
                opacity: 1,
                y: orientation === "horizontal" ? 0 : "-50%",
                x: orientation === "horizontal" ? "-50%" : 0,
              }}
              exit={{
                opacity: 0,
                y: orientation === "horizontal" ? 2 : "-50%",
                x: orientation === "horizontal" ? "-50%" : 2,
              }}
              className={cn(
                "absolute w-fit rounded-md border border-white/10 px-3 py-1.5 text-sm whitespace-pre font-[family-name:var(--font-bebas-neue)] tracking-wide text-white uppercase shadow-xl",
                orientation === "horizontal"
                  ? "-top-10 left-1/2"
                  : "left-full top-1/2 ml-4",
              )}
              style={{
                backgroundColor: "#2F56FF",
              }}
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center pointer-events-none"
        >
          {React.isValidElement(icon)
            ? React.cloneElement(icon as React.ReactElement<{ isHovered?: boolean; isActive?: boolean }>, {
                isHovered: hovered,
                isActive: isActive,
              })
            : icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
