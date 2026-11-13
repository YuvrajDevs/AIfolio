"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, ChevronRight, FileText, Frame, MessageCircle, MousePointer2, PenTool, Shapes } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { PROJECTS } from "@/lib/projects";

const TOOLS = [
  { label: "Home", href: "/", icon: MousePointer2, key: "q" },
  { label: "Work", href: "/work", icon: Frame, key: "w" },
  { label: "Skills", href: "/skills", icon: Shapes, key: "e" },
  { label: "About", href: "/about", icon: PenTool, key: "r" },
  { label: "Contact", href: "/contact", icon: MessageCircle, key: "t" },
];

const isActive = (path: string, href: string) =>
  href === "/" ? path === "/" : path === href || path.startsWith(href + "/");

/** Breadcrumb from the current path: Home, Work, or Work / Project */
function crumbs(path: string) {
  const top = TOOLS.find((t) => isActive(path, t.href));
  const out = [top?.label ?? "Page"];
  const slug = path.startsWith("/work/") ? path.split("/")[2] : null;
  const project = slug && PROJECTS.find((p) => p.slug === slug);
  if (project) out.push(project.name);
  return out;
}

/** File-name style header with a pages menu, like the page switcher in a design file */
export function TopBar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const parts = crumbs(path);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <header className="wrap relative z-40 flex h-16 items-center justify-between gap-4 md:h-20">
      <div ref={ref} className="relative flex min-w-0 items-center gap-2.5">
        <Link href="/" aria-label="Home" className="grid h-8 w-8 place-items-center rounded-lg bg-lime text-sm font-extrabold text-ink shadow-[0_6px_16px_-6px_rgba(0,0,0,.5)] transition-transform hover:-rotate-6">Y</Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-haspopup="menu"
          className="flex min-w-0 items-center gap-1.5 rounded-lg px-1.5 py-1 text-sm transition-colors hover:bg-white/10"
        >
          <span className="hidden text-white/60 sm:inline">Yuvraj</span>
          {parts.map((p, i) => (
            <span key={p} className={cn("min-w-0 items-center gap-1.5", i === parts.length - 1 ? "flex" : "hidden sm:flex")}>
              <span className="hidden text-white/40 sm:inline">/</span>
              <span className={cn("truncate", i === parts.length - 1 ? "font-medium" : "text-white/60")}>{p}</span>
            </span>
          ))}
          <ChevronDown className={cn("h-3.5 w-3.5 shrink-0 text-white/60 transition-transform", open && "rotate-180")} />
        </button>

        {open && (
          <div role="menu" onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setOpen(false); }} className="ui-panel absolute left-0 top-full mt-2 w-64 p-1.5 text-sm">
            <p className="eyebrow px-2.5 pb-1 pt-1.5 text-white/40">Pages</p>
            {TOOLS.map((t) => {
              const active = path === t.href;
              return (
                <div key={t.href}>
                  <Link role="menuitem" href={t.href} className={cn("flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 hover:bg-white/10", active && "bg-figma hover:bg-figma")}>
                    <Check className={cn("h-3.5 w-3.5", active ? "opacity-100" : "opacity-0")} />
                    <span className="flex-1">{t.label}</span>
                    <span className="font-mono text-[11px] text-white/40">{t.href}</span>
                  </Link>
                  {t.href === "/work" && (
                    <ul className="ml-[22px] border-l border-white/10 pl-2">
                      {PROJECTS.map((p) => {
                        const on = path === `/work/${p.slug}`;
                        return (
                          <li key={p.slug}>
                            <Link role="menuitem" href={`/work/${p.slug}`} className={cn("flex items-center gap-2 rounded-md px-2 py-1 text-[13px] text-white/70 hover:bg-white/10 hover:text-white", on && "bg-figma text-white hover:bg-figma")}>
                              <ChevronRight className="h-3 w-3 text-white/30" />
                              {p.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {path !== "/contact" && <Link href="/contact" className="inline-flex h-9 shrink-0 items-center rounded-full bg-white px-4 text-sm font-medium text-ink transition-colors hover:bg-lime">
        Let&apos;s talk
      </Link>}
    </header>
  );
}

/** Bottom toolbar that doubles as site navigation. Keyboard shortcuts work like tool hotkeys. */
export function Toolbar() {
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement;
      if (el.closest("input, textarea, select, button, [contenteditable]")) return;
      const k = e.key.toLowerCase();
      if (k === "y") { window.open(SITE.resume, "_blank", "noopener"); return; }
      const tool = TOOLS.find((t) => t.key === k);
      if (tool) router.push(tool.href);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <nav aria-label="Primary" className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <div className="ui-panel flex items-center gap-1 !rounded-2xl p-1.5">
        <ul className="flex items-center gap-1">
          {TOOLS.map((t) => {
            const active = isActive(path, t.href);
            return (
              <li key={t.href} className="group relative">
                <Link
                  href={t.href}
                  aria-label={t.label}
                  aria-current={active ? "page" : undefined}
                  aria-keyshortcuts={t.key.toUpperCase()}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                    active ? "bg-figma text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <t.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </Link>
                <span className="pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-lg bg-panel px-2.5 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 md:flex">
                  {t.label} <kbd className="font-mono text-[10px] text-white/50">{t.key.toUpperCase()}</kbd>
                </span>
              </li>
            );
          })}
        </ul>
        <span aria-hidden className="mx-1 h-6 w-px bg-white/10" />
        <span className="group relative">
          <a href={SITE.resume} target="_blank" rel="noopener noreferrer" aria-label="Resume (PDF)" aria-keyshortcuts="Y" className="flex h-10 w-10 items-center justify-center rounded-xl text-white/70 transition-colors hover:bg-white/10 hover:text-white">
            <FileText className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </a>
          <span className="pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-lg bg-panel px-2.5 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 md:flex">
            Resume <kbd className="font-mono text-[10px] text-white/50">Y</kbd>
          </span>
        </span>
        <a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hidden h-10 w-10 items-center justify-center rounded-xl text-white/70 transition-colors hover:bg-white/10 hover:text-white xs:flex">
          <IconBrandGithub className="h-[18px] w-[18px]" stroke={1.75} />
        </a>
      </div>
    </nav>
  );
}
