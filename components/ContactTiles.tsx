import { ArrowUpRight } from "lucide-react";
import { IconBrandGithub, IconBrandLinkedin, IconFileText, IconMail } from "@tabler/icons-react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Shared tile shell: tilted pastel card, illustration on top, label row at the bottom */
function Tile({ href, color, r, label, sub, icon: Icon, children, download }: {
  href: string; color: string; r: string; label: string; sub: string; icon: typeof IconMail; children: React.ReactNode; download?: boolean;
}) {
  const external = href.startsWith("http") || download;
  return (
    <li>
      <a href={href} target={external ? "_blank" : undefined} rel="noopener noreferrer" style={{ rotate: r }}
         className={cn("group relative flex h-full min-h-[168px] flex-col overflow-hidden rounded-2xl p-3.5 text-ink shadow-[0_18px_34px_-18px_rgba(0,8,50,.6)] transition-all duration-300 hover:-translate-y-1 hover:!rotate-0 min-[900px]:min-h-0", color)}>
        <div aria-hidden className="relative flex flex-1 items-center justify-center">{children}</div>
        <div className="relative mt-3 flex items-end justify-between gap-2">
          <span className="min-w-0">
            <span className="flex items-center gap-1.5 font-bold tracking-tight"><Icon className="h-4 w-4" stroke={2} />{label}</span>
            <span className="block truncate font-mono text-[10.5px] text-ink/65">{sub}</span>
          </span>
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-white transition-transform group-hover:-rotate-12 group-hover:scale-110">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </a>
    </li>
  );
}

/** Contribution-graph levels: fixed pattern so server and client render the same thing */
const GRAPH = Array.from({ length: 5 * 13 }, (_, k) => (k * 37 + (k % 7) * 11) % 9);
const LEVEL = (v: number) => (v > 6 ? "bg-ink/85" : v > 4 ? "bg-ink/50" : v > 2 ? "bg-ink/25" : "bg-ink/[.08]");

export function ContactTiles() {
  return (
    <ul className="grid flex-1 grid-cols-2 grid-rows-2 gap-3">
      {/* Email: an envelope with a stamp */}
      <Tile href={`mailto:${SITE.email}`} color="bg-p-pink" r="-2.5deg" label="Email" sub="Say hello" icon={IconMail}>
        <div className="relative h-[78px] w-[124px] rounded-md bg-white shadow-[0_6px_14px_-8px_rgba(0,0,0,.4)] transition-transform duration-300 group-hover:-translate-y-1">
          <svg viewBox="0 0 124 78" className="absolute inset-0 h-full w-full"><path d="M2 4l60 40 60-40" fill="none" stroke="#121318" strokeOpacity=".2" strokeWidth="2" strokeLinejoin="round" /></svg>
          <span className="absolute -right-2 -top-3 grid h-9 w-8 rotate-6 place-items-center rounded-[3px] border-[3px] border-dotted border-white bg-lime text-[11px] font-extrabold shadow">Y</span>
        </div>
      </Tile>

      {/* LinkedIn: a business card */}
      <Tile href={SITE.linkedin} color="bg-p-mint" r="2deg" label="LinkedIn" sub="Connect with me" icon={IconBrandLinkedin}>
        <div className="relative w-[150px] -rotate-3 rounded-lg bg-white p-2.5 shadow-[0_6px_14px_-8px_rgba(0,0,0,.4)] transition-transform duration-300 group-hover:rotate-0">
          <span className="absolute right-2 top-2 grid h-4 w-4 place-items-center rounded-[3px] bg-[#0a66c2] text-[9px] font-bold text-white">in</span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-canvas text-[11px] font-bold text-white">YS</span>
          <span className="mt-1.5 block pr-4 text-[11px] font-bold leading-tight">Yuvraj Singh Shekhawat</span>
          <span className="block text-[9px] leading-tight text-ink/55">AI full-stack · Product design</span>
        </div>
      </Tile>

      {/* GitHub: a contribution graph */}
      <Tile href={SITE.github} color="bg-p-peach" r="1.5deg" label="GitHub" sub="@YuvrajDevs" icon={IconBrandGithub}>
        <div className="grid grid-flow-col grid-rows-5 gap-[3px] rounded-lg bg-white/60 p-2">
          {GRAPH.map((v, k) => (
            <span key={k} className={cn("h-2.5 w-2.5 rounded-[2px] transition-transform duration-300 group-hover:scale-110", LEVEL(v))} style={{ transitionDelay: `${(k % 13) * 15}ms` }} />
          ))}
        </div>
      </Tile>

      {/* Resume: a sheet with a folded corner */}
      <Tile href={SITE.resume} color="bg-p-lilac" r="-2deg" label="Resume" sub="Download PDF" icon={IconFileText} download>
        <div className="relative h-[92px] w-[74px] rotate-3 bg-white p-2 shadow-[0_6px_14px_-8px_rgba(0,0,0,.4)] transition-transform duration-300 [clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,0_100%)] group-hover:-translate-y-1.5 group-hover:rotate-0">
          <span className="absolute right-0 top-0 h-4 w-4 bg-ink/15 [clip-path:polygon(0_0,0_100%,100%_100%)]" />
          <span className="block h-2 w-3/4 rounded-full bg-ink/80" />
          <span className="mt-1 block h-1 w-1/2 rounded-full bg-ink/25" />
          {[100, 85, 92, 70].map((w, k) => <span key={k} className="mt-1.5 block h-1 rounded-full bg-ink/15" style={{ width: `${w}%` }} />)}
          <span className="absolute bottom-1.5 left-2 rounded-[3px] bg-orange px-1 text-[8px] font-bold text-white">PDF</span>
        </div>
      </Tile>
    </ul>
  );
}
