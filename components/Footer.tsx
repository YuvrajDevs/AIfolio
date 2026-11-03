import Link from "next/link";
import { SITE, NAV } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-white px-6 pb-28 pt-10 md:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-pixel text-2xl font-bold uppercase">{SITE.name}</p>
          <p className="font-hand text-xl text-neutral-500">based in India · available worldwide</p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 font-pixel text-sm uppercase">
          {NAV.map((n) => (
            <li key={n.href}><Link href={n.href} className="underline-offset-4 hover:underline">{n.label}</Link></li>
          ))}
          <li><a href={SITE.github} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">GitHub</a></li>
          <li><a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">LinkedIn</a></li>
        </ul>
      </div>
    </footer>
  );
}
