import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";
import { SITE, NAV } from "@/lib/site";

const SOCIALS = [
  { href: `mailto:${SITE.email}`, label: "Email", I: IconMail },
  { href: SITE.linkedin, label: "LinkedIn", I: IconBrandLinkedin },
  { href: SITE.github, label: "GitHub", I: IconBrandGithub },
];

export function Footer() {
  return (
    <footer className="px-4 pb-24 pt-8 md:px-8 md:pb-8">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[28px] bg-ink px-6 py-12 text-white md:px-14 md:py-16">
        {/* soft colour blobs */}
        <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-fpurple/60 blur-2xl" />
        <div aria-hidden className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-fblue/40 blur-3xl" />

        <div className="relative grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="font-hand text-3xl text-lime md:text-4xl">thanks for stopping by ✦</p>
            <p className="mt-2 font-pixel text-4xl uppercase leading-[0.95] md:text-6xl">Let&apos;s make something good.</p>
            <Link href="/contact" className="mt-7 inline-flex rounded-lg bg-lime px-6 py-3 font-pixel text-sm uppercase tracking-wider text-ink transition-transform hover:-translate-y-0.5">
              Say hello
            </Link>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <ul className="flex flex-wrap gap-2 md:justify-end">
              {[...NAV, { label: "Resume", href: SITE.resume }].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="inline-block rounded-full border border-white/20 px-4 py-1.5 font-pixel text-xs uppercase transition-colors hover:bg-white hover:text-ink">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              {SOCIALS.map(({ href, label, I }) => (
                <a key={label} href={href} aria-label={label} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                   className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-fyellow hover:text-ink">
                  <I className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-5 font-pixel text-[10px] uppercase tracking-wider text-white/50">
          <span>© 2026 {SITE.name} · {SITE.location}</span>
          <a href="#top" className="inline-flex items-center gap-1.5 hover:text-white"><ArrowUp className="h-3.5 w-3.5" /> Back to top</a>
        </div>
      </div>
    </footer>
  );
}
