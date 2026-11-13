import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { ButtonLink, PageHero, PageShell, Sticker } from "@/components/ui-bits";
import { PROCESS, SERVICES } from "@/lib/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Skills", description: "AI and agents, full-stack apps, data and dashboards, and product design." };

/** A tool tile: a logo file, or a small drawn sketch for concepts without a logo */
type Tool = { name: string; src?: string; fill?: boolean; art?: "proto" | "type" };

/** Four tools per folder; logos with their own rounded background fill the tile */
const TOOLS: Record<"ai" | "app" | "data" | "web", Tool[]> = {
  ai: [{ name: "OpenAI", src: "openai", fill: true }, { name: "Claude", src: "claude", fill: true }, { name: "Gemini", src: "gemini" }, { name: "Cursor", src: "cursor", fill: true }],
  app: [{ name: "React", src: "react" }, { name: "TypeScript", src: "typescript", fill: true }, { name: "Supabase", src: "supabase" }, { name: "MongoDB", src: "mongodb" }],
  data: [{ name: "Python", src: "python" }, { name: "PostgreSQL", src: "postgresql" }, { name: "Power BI", src: "powerbi" }, { name: "MongoDB", src: "mongodb" }],
  web: [{ name: "Figma", src: "figma" }, { name: "Prototyping", art: "proto" }, { name: "Typography", art: "type" }, { name: "Storybook", src: "storybook" }],
};

/** Folder backs in the site's pastels, and a slight, uneven tilt for each tile */
const FOLDER_BACK = ["bg-p-sky", "bg-p-peach", "bg-p-mint", "bg-p-pink"];
const TILT = ["-rotate-[5deg]", "rotate-[3deg]", "-rotate-[2deg]", "rotate-[6deg]", "rotate-[1deg]", "-rotate-[4deg]"];

function ToolArt({ art }: { art: NonNullable<Tool["art"]> }) {
  if (art === "type") return <span className="text-[clamp(40px,8vw,84px)] font-black leading-none tracking-tighter">Aa</span>;
  // prototyping: two screens joined by a prototype link
  return (
    <svg viewBox="0 0 100 100" className="h-[78%] w-[78%]" fill="none">
      <rect x="6" y="18" width="34" height="58" rx="6" fill="#fff" stroke="#121318" strokeWidth="3" />
      <rect x="12" y="26" width="22" height="5" rx="2.5" fill="#121318" />
      <rect x="12" y="36" width="16" height="4" rx="2" fill="#121318" fillOpacity=".2" />
      <rect x="12" y="62" width="22" height="7" rx="3.5" fill="#2556e8" />
      <rect x="60" y="24" width="34" height="58" rx="6" fill="#d6ff3d" stroke="#121318" strokeWidth="3" />
      <rect x="66" y="32" width="22" height="16" rx="3" fill="#121318" fillOpacity=".15" />
      <path d="M34 65.5 C 48 65.5, 46 40, 58 40" stroke="#0d99ff" strokeWidth="3" strokeLinecap="round" />
      <path d="M53 35 L59 40 L53 45" stroke="#0d99ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="34" cy="65.5" r="3.5" fill="#0d99ff" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

export default function SkillsPage() {
  return (
    <PageShell>
      <PageHero label="Skills" title="What I do" intro="AI, full stack and data, with product design running through all of it. One person who can shape the product, design the interface and ship the code." />

      {/* Skills as folders, tools sticking out */}
      <ul className="grid gap-x-6 gap-y-10 md:auto-rows-fr md:grid-cols-2">
        {SERVICES.map((s, i) => {
          const t = TOOLS[s.mock];
          return (
            <li key={s.title} className="group relative flex flex-col text-ink">
              {/* tool tiles sitting in the folder; top half shows, hover lifts them one by one */}
              <div className="relative grid grid-cols-4 gap-3 px-5 md:gap-4 md:px-6" style={{ paddingTop: "10%" }}>
                {/* back of the folder, with its tab */}
                <div aria-hidden className={cn("absolute inset-x-0 -bottom-10 top-[18%] rounded-[28px]", FOLDER_BACK[i % FOLDER_BACK.length])}>
                  <span className="absolute -top-5 left-0 h-12 w-[42%] rounded-t-[24px] bg-inherit" />
                </div>
                {t.map((c, n) => (
                  <span
                    key={c.name}
                    title={c.name}
                   
                    className={cn("relative grid aspect-square place-items-center overflow-hidden rounded-[24%] border-[3px] border-white bg-white shadow-[0_10px_24px_-10px_rgba(0,8,50,.45)] transition-transform duration-500 ease-[cubic-bezier(.34,1.4,.64,1)] group-hover:-translate-y-[40%]", TILT[(i + n) % TILT.length])}
                  >
                    {c.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`/tools/${c.src}.png`} alt={c.name} loading="lazy" className={c.fill ? "h-full w-full scale-[1.06] object-cover" : "h-[68%] w-[68%] object-contain"} />
                    ) : (
                      <><ToolArt art={c.art!} /><span className="sr-only">{c.name}</span></>
                    )}
                  </span>
                ))}
              </div>
              {/* front of the folder */}
              <div className="relative flex flex-1 flex-col rounded-[28px] bg-gradient-to-b from-white to-[#f1f2f7] p-7 pb-9 shadow-[0_-10px_30px_-18px_rgba(0,8,50,.45),0_24px_44px_-24px_rgba(0,8,50,.6)] md:p-9" style={{ marginTop: "calc(-12.5% + 12px)" }}>
                <h2 className="text-[28px] font-bold leading-tight tracking-tight md:text-[34px]">{s.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-ink/70 md:text-[17px]">{s.long}</p>
                <ul className="mt-auto space-y-2 pt-5">
                  {s.gets.map((g) => (
                    <li key={g} className="flex gap-2.5 text-[15px] text-ink/85 md:text-base"><Check className="mt-1 h-4 w-4 shrink-0" strokeWidth={2.5} /> {g}</li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Process as a prototype flow */}
      <section className="mt-16 md:mt-24">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Sticker color="bg-lime" r="-3deg">How it goes</Sticker>
          <h2 className="text-2xl font-extrabold tracking-tight md:text-4xl">From brief to shipped</h2>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {PROCESS.map((p, i) => (
            <li key={p.step} className="relative">
              <div className="ui-panel h-full p-5">
                <div className="flex items-center justify-between">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-lime font-mono text-xs font-semibold text-ink">{p.step}</span>
                  <span className="eyebrow text-white/40">Frame {i + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/65">{p.desc}</p>
              </div>
              {i < PROCESS.length - 1 && (
                <span aria-hidden className="absolute left-full top-1/2 z-10 hidden w-8 -translate-y-1/2 items-center lg:flex">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-lime bg-canvas" />
                  <span className="h-0.5 flex-1 bg-lime" />
                  <ArrowRight className="-ml-1.5 h-3.5 w-3.5 shrink-0 text-lime" strokeWidth={3} />
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-[18px] bg-panel p-6 shadow-[0_24px_50px_-24px_rgba(0,8,50,.7)] md:p-8">
        <p className="text-lg font-semibold tracking-tight md:text-xl">Have something in mind? Tell me about it.</p>
        <ButtonLink href="/contact">Start a project</ButtonLink>
      </div>
    </PageShell>
  );
}
