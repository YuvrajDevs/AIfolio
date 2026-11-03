import Link from "next/link";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";
import { SITE, NAV } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-ink/30 bg-paper">
      <div className="mx-auto grid max-w-6xl md:grid-cols-[1fr_1.4fr_1fr] md:divide-x md:divide-ink/30">
        <div className="p-6 md:p-8">
          <p className="font-pixel text-[10px] font-bold uppercase tracking-wider text-neutral-500">Reminder</p>
          <p className="mt-2 font-hand text-3xl leading-tight">ship it, then polish it.</p>
        </div>

        <div className="flex items-center justify-between gap-4 bg-fyellow p-6 md:p-8">
          <div>
            <p className="font-pixel text-xl font-bold uppercase">{SITE.name}</p>
            <p className="mt-1 text-sm">Open to remote roles and freelance projects.</p>
            <div className="mt-4 flex gap-3">
              {[
                { href: `mailto:${SITE.email}`, label: "Email", I: IconMail },
                { href: SITE.linkedin, label: "LinkedIn", I: IconBrandLinkedin },
                { href: SITE.github, label: "GitHub", I: IconBrandGithub },
              ].map(({ href, label, I }) => (
                <a key={label} href={href} aria-label={label} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                   className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-white transition-colors hover:bg-ink hover:text-white">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <svg viewBox="0 0 120 120" aria-hidden className="spin-slow hidden h-28 w-28 shrink-0 sm:block">
            <defs><path id="circ" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs>
            <text className="font-pixel" fontSize="11" fontWeight="700" letterSpacing="2.2">
              <textPath href="#circ">OPEN TO REMOTE ROLES • OPEN TO FREELANCE •</textPath>
            </text>
            <circle cx="60" cy="60" r="20" fill="#111" /><text x="60" y="68" textAnchor="middle" fill="#D9F34A" fontSize="22" fontWeight="700" className="font-pixel">Y</text>
          </svg>
        </div>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 p-6 font-pixel text-xs font-bold uppercase md:block md:space-y-2 md:p-8">
          {NAV.map((n) => (
            <li key={n.href}><Link href={n.href} className="underline-offset-4 hover:underline">{n.label}</Link></li>
          ))}
          <li><a href={SITE.resume} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">Resume</a></li>
        </ul>
      </div>
      <div className="border-t border-ink/30 px-6 pb-24 pt-4 md:pb-4">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 font-pixel text-[10px] uppercase tracking-wider text-neutral-500">
          <span>Collecting, connecting, building.</span>
          <span>© 2026 Yuvraj Singh Shekhawat</span>
        </div>
      </div>
    </footer>
  );
}
