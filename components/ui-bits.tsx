import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Frame } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";
import { BlueprintCover, CitableCover } from "@/components/ProjectCovers";

type CSSVars = React.CSSProperties & Record<`--${string}`, string>;
export const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSVars;
export const vars = (v: Record<`--${string}`, string>) => v as CSSVars;

/** Category part of a tag like "AI workflow // multi-agent" */
export const tagHead = (tag: string) => tag.split("//")[0].trim();

export const PASTELS = ["bg-p-sky", "bg-p-lemon", "bg-p-pink", "bg-p-mint", "bg-p-peach", "bg-p-lilac"];

export const FRAME_COLORS = {
  lime: { tab: "bg-lime", ring: "border-lime" },
  pink: { tab: "bg-p-pink", ring: "border-p-pink" },
  sky: { tab: "bg-p-sky", ring: "border-p-sky" },
  mint: { tab: "bg-p-mint", ring: "border-p-mint" },
  lemon: { tab: "bg-p-lemon", ring: "border-p-lemon" },
  peach: { tab: "bg-p-peach", ring: "border-p-peach" },
};
export type FrameColor = keyof typeof FRAME_COLORS;

/** A named frame on the canvas: coloured name tab over a light dot-grid sheet, or a dark panel */
export function Artboard({ name, meta, children, className, bodyClassName, id, color = "lime", tone = "light" }: {
  name: string; meta?: React.ReactNode; children: React.ReactNode; className?: string; bodyClassName?: string; id?: string; color?: FrameColor; tone?: "light" | "dark" | "outline";
}) {
  const c = FRAME_COLORS[color];
  return (
    <section id={id} className={cn("flex flex-col", className)}>
      <span className={cn("relative z-10 -mb-[2px] inline-flex h-[34px] self-start items-center gap-2 rounded-t-xl px-3.5 text-[13px] font-semibold text-ink", c.tab)}>
        <Frame className="h-3.5 w-3.5" strokeWidth={2.25} />
        {name}
        {meta && <span className="rounded-full bg-ink/10 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider">{meta}</span>}
      </span>
      <div className={cn("relative rounded-2xl rounded-tl-none p-3 md:p-5", tone === "dark" ? "ui-panel" : tone === "outline" ? cn("border-2 border-dashed text-white", c.ring) : "sheet", bodyClassName)}>
        {children}
      </div>
    </section>
  );
}

/** Heading inside an artboard */
export function BoardHeading({ title, sub, aside }: { title: string; sub?: string; aside?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-2xl font-bold tracking-tight md:text-[28px]">{title}</h2>
        {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
      </div>
      {aside}
    </div>
  );
}

export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-1.5 text-sm font-medium", className)}>
      <span className="link-u">{children}</span>
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export function PageShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("wrap pb-10 pt-6 md:pt-10", className)}>{children}</div>;
}

/** Lime selection frame with square handles and an optional size badge */
export function SelectionFrame({ children, size, className }: { children: React.ReactNode; size?: string; className?: string }) {
  return (
    <div className={cn("relative inline-block border-2 border-lime px-4 py-1 md:px-7 md:py-2", className)}>
      <span aria-hidden className="absolute -left-[9px] -top-[9px] h-4 w-4 bg-lime md:-left-[11px] md:-top-[11px] md:h-5 md:w-5" />
      <span aria-hidden className="absolute -right-[6px] -top-[6px] h-2.5 w-2.5 border-2 border-lime bg-canvas" />
      <span aria-hidden className="absolute -bottom-[6px] -left-[6px] h-2.5 w-2.5 border-2 border-lime bg-canvas" />
      <span aria-hidden className="absolute -bottom-[9px] -right-[9px] h-4 w-4 bg-lime md:-bottom-[11px] md:-right-[11px] md:h-5 md:w-5" />
      {children}
      {size && (
        <span aria-hidden className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-lime px-1.5 py-0.5 font-mono text-[10px] font-medium text-ink">{size}</span>
      )}
    </div>
  );
}

/** Page header on the canvas: label, framed title, intro */
export function PageHero({ label, title, intro, children, below, align = "end" }: { label: string; title: React.ReactNode; intro?: string; children?: React.ReactNode; below?: React.ReactNode; align?: "end" | "center" }) {
  return (
    <header className={cn("mb-10 grid gap-8 md:mb-14 md:grid-cols-[1fr_minmax(0,400px)]", align === "end" ? "md:items-end" : "md:items-center")}>
      <div>
        <p className="reveal eyebrow mb-6 text-white/75">{label}</p>
        <div className="reveal" style={delay(60)}>
          <SelectionFrame>
            <h1 className="text-[44px] font-black uppercase leading-[1] tracking-tight md:text-7xl">{title}</h1>
          </SelectionFrame>
        </div>
        {below && <div className="reveal mt-8 max-w-[560px]" style={delay(120)}>{below}</div>}
      </div>
      {(intro || children) && (
        <div className="reveal" style={delay(140)}>
          {intro && <p className="text-[15px] leading-relaxed text-white/85 md:text-base">{intro}</p>}
          {children}
        </div>
      )}
    </header>
  );
}

const BTN = {
  lime: "bg-lime text-ink hover:bg-white",
  light: "bg-white text-ink hover:bg-lime",
  ghost: "border border-white/35 text-white hover:bg-white/10",
  dark: "bg-ink text-white hover:bg-canvas",
  outline: "border border-ink/15 text-ink hover:border-ink",
};

export function ButtonLink({ href, children, variant = "lime", external, className }: {
  href: string; children: React.ReactNode; variant?: keyof typeof BTN; external?: boolean; className?: string;
}) {
  const cls = cn("group inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors", BTN[variant], className);
  return external ? (
    <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-ink/80", className)}>{children}</span>;
}

/** Tilted pastel label stuck on the canvas */
export function Sticker({ children, color = "bg-p-lemon", r = "-4deg", className }: { children: React.ReactNode; color?: string; r?: string; className?: string }) {
  return (
    <span style={{ rotate: r }} className={cn("inline-block rounded-md px-2.5 py-1 text-xs font-semibold text-ink shadow-[0_6px_14px_-6px_rgba(0,8,50,.5)]", color, className)}>
      {children}
    </span>
  );
}

/** Multiplayer cursor with a name tag */
export function CursorTag({ name, color = "#ff6a3d", className, flip }: { name: string; color?: string; className?: string; flip?: boolean }) {
  return (
    <div aria-hidden className={cn("pointer-events-none select-none", className)}>
      <svg width="20" height="20" viewBox="0 0 22 22" className={cn("drop-shadow-[0_3px_4px_rgba(0,8,50,.35)]", flip && "-scale-x-100")}>
        <path d="M2 2l6.5 17 2.6-7.2L19 9z" fill={color} stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
      <span style={{ background: color }} className="ml-4 inline-block rounded-md px-2 py-0.5 text-[11px] font-semibold text-white shadow-[0_6px_14px_-6px_rgba(0,8,50,.5)]">{name}</span>
    </div>
  );
}

/** Project card: tag + title, highlight bullets, screenshot peeking out of a pastel panel */
/** Screenshot when there is one, otherwise the project's illustrated cover */
export function CoverArt({ project, priority }: { project: Project; priority?: boolean }) {
  if (project.image)
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={project.image} alt="" loading={priority ? "eager" : "lazy"} decoding="async" className="h-full w-full object-cover object-top" />;
  if (project.cover === "citable") return <CitableCover />;
  if (project.cover === "blueprint") return <BlueprintCover />;
  return <div className="grid h-full place-items-center text-5xl font-black text-ink/10">{project.name[0]}</div>;
}

/** A project still being built: blueprint styling, no case-study link */
function BuildingCard({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn("flex flex-col rounded-2xl border-2 border-dashed border-lime/80 bg-canvas-deep/50 p-2 text-white shadow-[0_20px_40px_-24px_rgba(0,8,50,.55)]", className)}>
      <div className="px-3 pb-4 pt-3">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold text-ink">
            <span aria-hidden className="pulse-dot h-1.5 w-1.5 rounded-full bg-live" /> {project.status}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">Work in progress</span>
        </div>
        <h3 className="mt-3.5 text-xl font-bold leading-tight tracking-tight">{project.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-white/70">{project.summary}</p>
        <ul className="mt-3.5 space-y-1.5 border-t border-dashed border-white/20 pt-3.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2 text-[13px] leading-snug text-white/85">
              <span className="mt-px grid h-4 w-4 shrink-0 place-items-center rounded-full border border-dashed border-lime" />
              {h}
            </li>
          ))}
        </ul>
        <p className="mt-3.5 truncate font-mono text-[10.5px] uppercase tracking-wider text-white/55">{project.stack.join(" · ")}</p>
      </div>
      <div className="mt-auto overflow-hidden rounded-xl">
        <div className="aspect-[16/10] overflow-hidden"><CoverArt project={project} /></div>
      </div>
    </div>
  );
}

export function ProjectCard({ project, index, priority, className }: { project: Project; index: number; priority?: boolean; className?: string }) {
  if (project.tier === "building") return <BuildingCard project={project} className={className} />;
  const pastel = PASTELS[index % PASTELS.length];
  return (
    <Link href={`/work/${project.slug}`} className={cn("group flex flex-col rounded-2xl border border-line bg-white p-2 text-ink shadow-[0_20px_40px_-24px_rgba(0,8,50,.55)] transition-transform duration-300 hover:-translate-y-1", className)}>
      <div className="px-3 pb-4 pt-3">
        <div className="flex items-center justify-between">
          <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold text-ink", pastel)}>{tagHead(project.tag)}</span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-paper transition-colors group-hover:bg-ink group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <h3 className="mt-3.5 text-xl font-bold leading-tight tracking-tight">{project.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-3.5 space-y-1.5 border-t border-dashed border-ink/15 pt-3.5">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-2 text-[13px] leading-snug text-ink/85">
              <span className={cn("mt-px grid h-4 w-4 shrink-0 place-items-center rounded-full", pastel)}><Check className="h-2.5 w-2.5" strokeWidth={3} /></span>
              {h}
            </li>
          ))}
        </ul>
        <p className="mt-3.5 truncate font-mono text-[10.5px] uppercase tracking-wider text-muted">{project.stack.join(" · ")}</p>
      </div>
      <div className={cn("mt-auto overflow-hidden rounded-xl px-5 pt-5", pastel)}>
        <div className="aspect-[16/10] overflow-hidden rounded-t-lg bg-white shadow-[0_-4px_20px_-6px_rgba(0,0,0,.25)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1.5">
          <CoverArt project={project} priority={priority} />
        </div>
      </div>
    </Link>
  );
}

export function ProjectGrid({ projects, offset = 0 }: { projects: Project[]; offset?: number }) {
  return (
    <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible md:grid-cols-3">
      {projects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i + offset} priority={i < 3} className="w-[84%] shrink-0 snap-start sm:w-auto" />)}
    </div>
  );
}

/** Smaller projects as compact horizontal cards */
export function ProjectList({ projects, offset = 0 }: { projects: Project[]; offset?: number }) {
  return (
    <ul className="grid gap-3 min-[640px]:grid-cols-2 min-[900px]:grid-cols-3">
      {projects.map((p, i) => {
        const pastel = PASTELS[(i + offset) % PASTELS.length];
        return (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}`} className="group flex h-full flex-col rounded-2xl border border-line bg-white p-2 text-ink shadow-[0_14px_30px_-22px_rgba(0,8,50,.5)] transition-transform hover:-translate-y-0.5">
              <span className={cn("block overflow-hidden rounded-xl px-4 pt-4", pastel)}>
                <span className="block aspect-[16/9] overflow-hidden rounded-t-lg bg-white transition-transform duration-500 group-hover:-translate-y-1">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
                  ) : (
                    <CoverArt project={p} />
                  )}
                </span>
              </span>
              <span className="flex min-w-0 flex-1 flex-col px-3 pb-3 pt-3.5">
                <span className="flex items-start justify-between gap-2">
                  <span className="text-lg font-bold tracking-tight">{p.name}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                </span>
                <span className="text-xs text-muted">{tagHead(p.tag)} · {p.status}</span>
                <span className="mt-3 space-y-1.5 border-t border-dashed border-ink/15 pt-3">
                  {p.highlights.slice(0, 2).map((h) => (
                    <span key={h} className="flex gap-1.5 text-[13px] leading-snug text-ink/80">
                      <Check className="mt-0.5 h-3 w-3 shrink-0" strokeWidth={3} />{h}
                    </span>
                  ))}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
