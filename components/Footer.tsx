import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE, NAV } from "@/lib/site";

const SOCIALS = [
  { href: SITE.linkedin, label: "LinkedIn" },
  { href: SITE.github, label: "GitHub" },
  { href: SITE.resume, label: "Resume" },
];

export function Footer() {
  return (
    <footer className="site-chrome wrap pb-28 pt-10">
      <div className="rounded-[18px] bg-panel p-6 shadow-[0_30px_60px_-30px_rgba(0,8,50,.7)] md:p-10">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="eyebrow text-white/50">Have a project in mind?</p>
            <a href={`mailto:${SITE.email}`} className="group mt-3 inline-flex items-start gap-2 text-4xl font-extrabold uppercase leading-none tracking-tight md:text-6xl">
              Let&apos;s talk
              <ArrowUpRight className="h-8 w-8 shrink-0 text-lime transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:h-12 md:w-12" />
            </a>
            <p className="mt-4 select-all text-sm text-white/60">{SITE.email}</p>
          </div>
          <div>
            <p className="eyebrow text-white/50">Pages</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {NAV.map((n) => (
                <li key={n.href}><Link href={n.href} className="link-u text-white/80 hover:text-white">{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-white/50">Elsewhere</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {SOCIALS.map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="link-u text-white/80 hover:text-white">{s.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 font-mono text-[11px] uppercase tracking-wider text-white/40">
          <span>© 2026 {SITE.name}</span>
          <span>Designed &amp; coded by me</span>
          <a href="#top" className="hover:text-white">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
