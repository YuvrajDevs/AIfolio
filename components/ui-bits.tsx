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
    "neo-sm inline-flex rounded-lg items-center justify-center gap-2 px-6 py-3 font-pixel text-sm font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5 active:translate-y-0",
    variant === "primary" ? "bg-ink text-white hover:bg-ocean" : "bg-white hover:bg-fyellow"
  );
  return external ? (
    <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}

const FOLDER_COLORS = ["bg-fpurple", "bg-fblue", "bg-fgreen", "bg-fyellow", "bg-forange", "bg-bubble"];

/** A manila-style folder panel: tab on top, body below */
export function Folder({ tab, color = "bg-fyellow", children, className, bodyClassName }: {
  tab: string; color?: string; children: React.ReactNode; className?: string; bodyClassName?: string;
}) {
  return (
    <div className={className}>
      <span className={cn("relative z-10 -mb-[2px] inline-block rounded-t-xl border-2 border-b-0 border-ink px-5 pb-1 pt-1.5 font-pixel text-xs font-bold uppercase", color)}>
        {tab}
      </span>
      <div className={cn("rounded-b-2xl rounded-tr-2xl border-2 border-ink p-6 shadow-[6px_6px_0_#111] md:p-8", color, bodyClassName)}>
        {children}
      </div>
    </div>
  );
}

/** Soft UI-card chip floating around the hero (decorative) */
export function Chip({ children, className, r = "0deg", lime, d = "0s" }: {
  children: React.ReactNode; className?: string; r?: string; lime?: boolean; d?: string;
}) {
  return (
    <div aria-hidden style={{ "--r": r, "--d": d } as CSSVars}
      className={cn("float pointer-events-none absolute z-10 select-none rounded-2xl px-4 py-3 shadow-[0_6px_18px_-6px_rgba(0,0,0,.25)]",
        lime ? "border-2 border-ink bg-lime" : "border border-ink/10 bg-white/90", className)}>
      <div style={{ transform: `rotate(${r})` }}>{children}</div>
    </div>
  );
}

/** Tiny hand-drawn style sticker shapes */
export function Doodle({ kind, className }: { kind: "asterisk" | "heart" | "diamond" | "cloud" | "spark"; className?: string }) {
  const c = cn("pointer-events-none absolute select-none", className);
  const common = { width: 44, height: 44, viewBox: "0 0 44 44", "aria-hidden": true, className: c } as const;
  if (kind === "asterisk") return <svg {...common}><path d="M22 4v36M6 13l32 18M38 13L6 31" stroke="#F4B93E" strokeWidth="5" strokeLinecap="round" /></svg>;
  if (kind === "heart") return <svg {...common}><path d="M22 38C8 28 5 20 8 14c3-6 11-5 14 1 3-6 11-7 14-1 3 6 0 14-14 24z" fill="#EF86B1" stroke="#111" strokeWidth="2" strokeLinejoin="round" /></svg>;
  if (kind === "diamond") return <svg {...common}><path d="M10 6h24l8 12-20 22L2 18z" fill="#1ABCFE" stroke="#111" strokeWidth="2" strokeLinejoin="round" /><path d="M2 18h40M16 6l6 34M28 6l-6 34" stroke="#111" strokeWidth="1.5" /></svg>;
  if (kind === "cloud") return <svg {...common}><path d="M12 34a8 8 0 010-16 10 10 0 0119-3 8 8 0 011 19z" fill="#fff" stroke="#111" strokeWidth="2" strokeLinejoin="round" /></svg>;
  return <svg {...common}><path d="M22 3c1 11 8 18 19 19-11 1-18 8-19 19-1-11-8-18-19-19 11-1 18-8 19-19z" fill="#D9F34A" stroke="#111" strokeWidth="2" strokeLinejoin="round" /></svg>;
}

/** Named multiplayer-style cursor, purely decorative */
export function FigCursor({ name, color, className, d = "0s" }: { name: string; color: string; className?: string; d?: string }) {
  return (
    <div aria-hidden style={{ "--d": d } as CSSVars} className={cn("float pointer-events-none absolute z-20 select-none", className)}>
      <svg width="22" height="22" viewBox="0 0 22 22" className="drop-shadow-[2px_2px_0_rgba(0,0,0,.25)]">
        <path d="M2 2l6.5 17 2.6-7.2L19 9z" fill={color} stroke="#111" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      <span style={{ background: color }} className="ml-4 -mt-1 inline-block rounded-full border-2 border-ink px-3 py-0.5 font-pixel text-[11px] font-bold uppercase text-ink">{name}</span>
    </div>
  );
}

/** Project as a file folder: tab, papers poking out, front flap with the title */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const color = FOLDER_COLORS[index % FOLDER_COLORS.length];
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <span className={cn("relative z-10 -mb-[2px] inline-block rounded-t-xl border-2 border-b-0 border-ink px-5 pb-1 pt-1.5 font-pixel text-xs font-bold uppercase", color)}>
        Project {String(index + 1).padStart(2, "0")}
      </span>
      {/* back panel with papers */}
      <div className={cn("relative h-56 overflow-hidden rounded-tr-2xl border-2 border-ink", color)}>
        <div className="absolute inset-x-8 top-6 -bottom-10 rotate-2 border-2 border-ink bg-white" />
        <div className="absolute inset-x-5 top-5 -bottom-10 -rotate-1 overflow-hidden border-2 border-ink bg-white shadow-[0_2px_0_rgba(0,0,0,.15)] transition-transform duration-300 ease-out group-hover:-translate-y-3 group-hover:rotate-0">
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
          ) : (
            <div className="flex h-full items-start justify-center bg-[repeating-linear-gradient(45deg,#fff_0_10px,#f3f3ee_10px_20px)] pt-8">
              <span className="font-pixel text-6xl font-bold text-ink/20">{project.name[0]}</span>
            </div>
          )}
        </div>
      </div>
      {/* front flap */}
      <div className={cn("relative -mt-12 rounded-2xl border-2 border-ink p-5 shadow-[6px_6px_0_#111] transition-transform duration-300 group-hover:translate-y-1", color)}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-pixel text-3xl font-bold uppercase leading-none">{project.name}</h3>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white transition-colors group-hover:bg-ink group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/80">{project.summary}</p>
      </div>
    </Link>
  );
}
