"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Layers, User, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: User },
  { label: "Projects", href: "/work", icon: Briefcase },
  { label: "Services", href: "/services", icon: Layers },
];

const isActive = (path: string, href: string) =>
  href === "/" ? path === "/" : path === href || path.startsWith(href + "/");

export function SiteNav() {
  const path = usePathname();
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-ink/15 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-5">
            <Link href="/" aria-label="Home" className="flex items-center gap-1.5">
              <span className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-bubble" />
              <span className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-sun" />
              <span className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-leaf" />
            </Link>
            <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={isActive(path, l.href) ? "page" : undefined}
                  className={cn(
                    "slant px-4 py-1.5 font-pixel text-xs font-bold uppercase tracking-wider transition-colors",
                    isActive(path, l.href) ? "bg-sun" : "hover:bg-note-sun/60"
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <Link
            href="/contact"
            className="neo-sm rounded-lg bg-white px-4 py-1.5 font-pixel text-xs font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5 hover:bg-fyellow"
          >
            ♥ Contact
          </Link>
        </div>
      </header>

      {/* Mobile bottom dock */}
      <nav aria-label="Primary" className="fixed inset-x-0 bottom-3 z-50 flex justify-center md:hidden">
        <ul className="neo flex items-center gap-1 rounded-2xl bg-white p-1.5">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-label={l.label}
                aria-current={isActive(path, l.href) ? "page" : undefined}
                className={cn("flex h-11 w-11 items-center justify-center transition-colors", isActive(path, l.href) ? "bg-sun" : "text-neutral-500")}
              >
                <l.icon className="h-5 w-5" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
