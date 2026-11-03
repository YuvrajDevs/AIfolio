import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

type CSSVars = React.CSSProperties & Record<`--${string}`, string>;

export const NOTE_COLORS = ["bg-note-sun", "bg-note-sky", "bg-note-mint", "bg-note-rose"];
const ROT = ["-2deg", "1.5deg", "-1deg", "2deg"];
export const rot = (i: number) => ROT[i % ROT.length];

/** Handwritten aside, like the little captions in the reference */
export function Hand({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("font-hand text-xl text-neutral-600 md:text-2xl", className)}>{children}</p>;
}

export function Sticky({ children, color = "bg-note-sun", r = "-2deg", className }: {
  children: React.ReactNode; color?: string; r?: string; className?: string;
}) {
  return (
    <span style={{ "--r": r } as CSSVars} className={cn("relative note inline-block px-3 py-1.5 font-pixel text-xs font-bold uppercase tracking-wide", color, className)}>
      {children}
    </span>
  );
}

export function Polaroid({ letter, caption, r = "-4deg", tint = "bg-note-sky", className }: {
  letter: string; caption: string; r?: string; tint?: string; className?: string;
}) {
  return (
    <figure style={{ "--r": r } as CSSVars} className={cn("relative note tape w-36 bg-white p-2 pb-3 md:w-44", className)} aria-hidden>
      <div className={cn("flex aspect-[4/5] items-center justify-center", tint)}>
        <span className="font-pixel text-7xl font-bold">{letter}</span>
      </div>
      <figcaption className="mt-2 text-center font-hand text-lg leading-none text-neutral-500">{caption}</figcaption>
    </figure>
  );
}

export function SectionHeading({ label, title, className }: { label?: string; title: string; className?: string }) {
  return (
    <div className={cn("mb-8 md:mb-12", className)}>
      {label && <Hand className="mb-1">{label}</Hand>}
      <h2 className="font-pixel text-4xl font-bold uppercase leading-none md:text-6xl">{title}</h2>
    </div>
  );
}

export function PageShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-6xl px-5 pb-28 pt-14 md:px-6 md:pt-20", className)}>{children}</div>;
}

export function PageTitle({ label, title, intro }: { label: string; title: string; intro?: string }) {
  return (
    <header className="mb-14 max-w-3xl md:mb-20">
      <Hand className="reveal mb-2">{label}</Hand>
      <h1 className="reveal font-pixel text-5xl font-bold uppercase leading-[0.95] md:text-8xl" style={{ "--d": "60ms" } as CSSVars}>{title}</h1>
      {intro && (
        <p className="reveal mt-6 max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg" style={{ "--d": "140ms" } as CSSVars}>{intro}</p>
      )}
    </header>
  );
}

export function ButtonLink({ href, children, variant = "primary", external }: {
  href: string; children: React.ReactNode; variant?: "primary" | "ghost"; external?: boolean;
}) {
  const cls = cn(
    "neo-sm inline-flex items-center justify-center gap-2 px-6 py-3 font-pixel text-sm font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5 active:translate-y-0",
    variant === "primary" ? "bg-ink text-white hover:bg-ocean" : "bg-white hover:bg-sun"
  );
  return external ? (
    <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}

const CARD_TINTS = ["bg-ink text-white", "bg-sun", "bg-note-sky", "bg-note-rose"];

/** "Featured works" card: slanted tab, framed image, title + one-liner */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const tint = CARD_TINTS[index % CARD_TINTS.length];
  const dark = index % CARD_TINTS.length === 0;
  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn("neo group relative flex min-h-[380px] flex-col p-5 transition-transform duration-300 hover:-translate-y-1.5 hover:-rotate-[0.5deg]", tint)}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className={cn("slant px-3 py-1 font-pixel text-[11px] font-bold uppercase", dark ? "bg-sun text-ink" : "bg-ink text-white")}>
          Project {String(index + 1).padStart(2, "0")}
        </span>
        <ArrowUpRight className="h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
      <div className="relative mb-5 flex-1 overflow-hidden border-2 border-ink bg-white">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full min-h-40 items-center justify-center bg-[repeating-linear-gradient(45deg,#fff_0_10px,#f3f3ee_10px_20px)]">
            <span className="font-pixel text-5xl font-bold text-ink/20">{project.name[0]}</span>
          </div>
        )}
      </div>
      <h3 className="font-pixel text-3xl font-bold uppercase leading-none">{project.name}</h3>
      <p className={cn("mt-2 line-clamp-2 text-sm leading-relaxed", dark ? "text-neutral-300" : "text-neutral-800")}>{project.summary}</p>
    </Link>
  );
}
