import Link from "next/link";
import { ArrowRight, ArrowUp, AtSign, BarChart3, Check, Image as ImageIcon, Layers, PenTool, Smile, Sparkles } from "lucide-react";
import { ButtonLink, CursorTag, PASTELS, ProjectGrid, SelectionFrame, Sticker, delay, vars } from "@/components/ui-bits";
import { ParallaxStage } from "@/components/ParallaxStage";
import { PROJECTS, featured } from "@/lib/projects";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const STACK = ["OpenAI", "Claude", "Gemini", "Next.js", "React", "TypeScript", "Node.js", "Supabase", "PostgreSQL", "Python", "DuckDB", "dbt", "Power BI", "Figma"];

const MENU = [
  { label: "AI & agents", key: "A", checked: true },
  { label: "Product design", key: "P", checked: true },
  { label: "Full-stack apps", key: "F", checked: true },
  { label: "Data & dashboards", key: "D" },
];

const SKILL_CHIPS = [
  { label: "AI / LLMs", icon: Sparkles, tint: "bg-lime", pos: "-left-4 bottom-36", depth: "10", r: "-4deg" },
  { label: "Full stack", icon: Layers, tint: "bg-p-sky", pos: "left-8 bottom-12", depth: "16", r: "3deg" },
  { label: "Product Designing", icon: PenTool, tint: "bg-p-pink", pos: "-right-4 bottom-36", depth: "12", r: "4deg" },
  { label: "Data Analysis", icon: BarChart3, tint: "bg-p-mint", pos: "right-8 bottom-12", depth: "18", r: "-3deg" },
];

/** Glassy pill with a tinted icon badge */
function SkillChip({ label, icon: Icon, tint, r, className }: { label: string; icon: typeof Sparkles; tint: string; r: string; className?: string }) {
  return (
    <span style={{ rotate: r }} className={cn("inline-flex items-center gap-2 rounded-full border border-white/20 bg-panel/80 py-1.5 pl-1.5 pr-3.5 text-[13px] font-medium text-white shadow-[0_10px_24px_-10px_rgba(0,8,50,.7)] backdrop-blur", className)}>
      <span className={cn("grid h-6 w-6 place-items-center rounded-full text-ink", tint)}><Icon className="h-3.5 w-3.5" strokeWidth={2.25} /></span>
      {label}
    </span>
  );
}

/** Scalloped badge outline: 14 bumps around a circle */
const SCALLOP = (() => {
  const n = 14, pts: string[] = [];
  for (let k = 0; k < n * 2; k++) {
    const a = (Math.PI * k) / n, r = k % 2 ? 40 : 47;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`);
  }
  return `M${pts.join("L")}Z`;
})();

const FAN = ["lg:-rotate-[5deg] lg:-translate-y-4", "lg:rotate-[3deg] lg:-ml-6", "lg:-rotate-[2deg] lg:-ml-6", "lg:rotate-[5deg] lg:-ml-6 lg:translate-y-2"];

export default function Home() {
  const work = featured();
  return (
    <>
      {/* Hero: the name on the canvas, surrounded by editor UI */}
      <ParallaxStage className="wrap pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="relative mx-auto flex max-w-[980px] flex-col items-center text-center">
          <p className="reveal eyebrow mb-8 flex items-center gap-2 text-white/80">
            <span aria-hidden className="h-px w-6 bg-white/40" /> {SITE.role} <span aria-hidden className="h-px w-6 bg-white/40" />
          </p>

          <div className="reveal relative" style={delay(80)}>
            <SelectionFrame size="Fill × Hug">
              <h1 className="text-[64px] font-black uppercase leading-[0.92] tracking-[-0.03em] [text-shadow:0_10px_30px_rgba(0,10,70,.35)] sm:text-[96px] md:text-[136px]">
                Yuvraj
              </h1>
            </SelectionFrame>

            {/* context menu */}
            <div className="parallax absolute left-full top-[-38px] ml-10 hidden xl:block" style={vars({ "--depth": "14" })}>
              <ul className="float ui-panel w-56 p-1.5 text-left text-sm" style={vars({ "--d": "0.4s" })} aria-label="What I build">
                {MENU.map((m) => (
                  <li key={m.label} className={cn("flex items-center gap-2.5 rounded-lg px-2.5 py-1.5", m.checked && "bg-white/[.06]")}>
                    <Check className={cn("h-3.5 w-3.5", m.checked ? "text-lime" : "opacity-0")} />
                    <span className="flex-1">{m.label}</span>
                    <kbd className="font-mono text-[11px] text-white/40">{m.key}</kbd>
                  </li>
                ))}
              </ul>
            </div>

            {/* comment box */}
            <div className="parallax absolute right-full top-[58%] mr-12 hidden xl:block" style={vars({ "--depth": "-12" })}>
              <div className="float ui-panel w-64 text-left" style={vars({ "--d": "1.2s" })}>
                <p className="px-4 pt-3 text-sm font-semibold">Software Engineer</p>
                <p className="px-4 text-xs text-white/55">@ Dealermatix · 2025 – now</p>
                <div className="mt-3 flex items-center gap-3 border-t border-white/10 px-4 py-2.5 text-white/50">
                  <Smile className="h-4 w-4" /><AtSign className="h-4 w-4" /><ImageIcon className="h-4 w-4" />
                  <Link href="/contact" aria-label="Contact" className="ml-auto grid h-7 w-7 place-items-center rounded-full bg-figma text-white transition-transform hover:-translate-y-0.5">
                    <ArrowUp className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* cursors */}
            <div className="parallax absolute -bottom-12 right-6 md:right-16" style={vars({ "--depth": "22" })}>
              <CursorTag name="Recruiter" className="float" />
            </div>
            <div className="parallax absolute -left-4 -top-12 hidden sm:block md:-left-12" style={vars({ "--depth": "-18" })}>
              <CursorTag name="Founder" color="#22c55e" className="float [--d:1.5s]" />
            </div>
          </div>

          {/* skill chips */}
          {SKILL_CHIPS.map((c) => (
            <div key={c.label} className={cn("parallax absolute hidden md:block", c.pos)} style={vars({ "--depth": c.depth })}>
              <SkillChip {...c} className="float" />
            </div>
          ))}

          <p className="reveal mt-16 max-w-[620px] text-xl font-medium leading-snug md:mt-20 md:text-[26px]" style={delay(200)}>
            I build AI tools that do real work, and make them{" "}
            <span className="relative whitespace-nowrap text-ink">
              <span aria-hidden className="absolute inset-x-[-4px] inset-y-0.5 -z-0 -rotate-1 rounded bg-lime" />
              <span className="relative">a joy to use.</span>
            </span>
          </p>

          <div className="reveal mt-8 flex flex-wrap justify-center gap-3" style={delay(280)}>
            <ButtonLink href="/work">View work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></ButtonLink>
            <ButtonLink href="/contact" variant="ghost">Get in touch</ButtonLink>
          </div>

          <ul className="mt-6 flex flex-wrap justify-center gap-2 md:hidden">
            {SKILL_CHIPS.map((c) => <li key={c.label}><SkillChip {...c} r="0deg" /></li>)}
          </ul>

          <p className="reveal eyebrow mt-6 text-white/60" style={delay(340)}>
            Tip: press <kbd className="rounded bg-white/15 px-1">F</kbd> for work
          </p>
        </div>
      </ParallaxStage>

      {/* Stack strip */}
      <section aria-label="Tools I work with" className="overflow-hidden border-y border-white/10 bg-panel/90 py-3 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="marquee flex w-max gap-8 text-sm font-medium text-white/80">
          {[...STACK, ...STACK].map((s, i) => (
            <li key={i} aria-hidden={i >= STACK.length} className="flex items-center gap-8">
              {s}<span aria-hidden className="text-lime">✦</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Work: cards straight on the canvas */}
      <section className="wrap pt-16 md:pt-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 md:mb-10">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Sticker color="bg-lime" r="-3deg">Selected work</Sticker>
              <span className="eyebrow text-white/60">{String(work.length).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}</span>
            </div>
            <h2 className="max-w-xl text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
              Things I&apos;ve designed{" "}
              <span className="relative inline-block">
                & built
                <svg aria-hidden viewBox="0 0 120 12" className="absolute -bottom-2 left-0 w-full" preserveAspectRatio="none">
                  <path d="M2 8c20-6 40-6 58-2s38 4 58-3" fill="none" stroke="#d6ff3d" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="hidden max-w-[220px] text-sm leading-relaxed text-white/75 md:block">Product thinking, interface and code, end to end.</p>
            <ButtonLink href="/work" variant="light">All projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></ButtonLink>
          </div>
        </div>
        <ProjectGrid projects={work} />
      </section>

      {/* Skills: a fanned deck of cards */}
      <section className="wrap pb-6 pt-16 md:pt-24">
        <div className="mb-10 text-center md:mb-14">
          <p className="eyebrow mb-3 text-white/70">Skills</p>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            Call me if you{" "}
            <span className="relative inline-block">
              need:
              <svg aria-hidden viewBox="0 0 120 12" className="absolute -bottom-2 left-0 w-full" preserveAspectRatio="none">
                <path d="M2 8c20-6 40-6 58-2s38 4 58-3" fill="none" stroke="#d6ff3d" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </div>
        <ul className="mx-auto grid max-w-[1040px] gap-3 sm:grid-cols-2 lg:flex lg:justify-center">
          {SERVICES.map((s, i) => (
            <li key={s.title} className={cn("group relative origin-[calc(100%-18px)_12px] transition-[rotate,translate] duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] hover:z-10 hover:!rotate-0 lg:w-[260px]", FAN[i])}>
              <Link href="/skills" className={cn("relative flex h-full flex-col overflow-hidden rounded-2xl p-5 pt-7 text-ink shadow-[0_24px_40px_-20px_rgba(0,8,50,.6)]", PASTELS[i])}>
                {/* stitched edge */}
                <span aria-hidden className="pointer-events-none absolute inset-2 rounded-xl border-2 border-dashed border-ink/15" />
                <h3 className="relative pr-14 text-xl font-bold leading-tight tracking-tight">{s.title}</h3>
                <p className="relative mt-1 text-[12.5px] leading-snug text-ink/65">{s.short}</p>
                <ul className="relative mt-4 space-y-1.5 text-[13px] leading-snug">
                  {s.gets.map((g) => (
                    <li key={g} className="flex gap-2"><span aria-hidden className="text-ink/60">✦</span>{g}</li>
                  ))}
                </ul>
                <span className="relative mt-auto flex items-center justify-between pt-5">
                  <span className="rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white">Skill</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-ink bg-white transition-transform duration-300 group-hover:-rotate-45">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </span>
              </Link>
              {/* badge sits outside the clipped card and is the pivot the card swings on */}
              <span aria-hidden className="absolute -right-3 -top-5 grid h-[60px] w-[60px] place-items-center text-ink transition-transform duration-500 group-hover:rotate-[24deg]">
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full drop-shadow-[0_6px_8px_rgba(0,8,50,.3)]">
                  <path d={SCALLOP} fill="#fff" stroke="#121318" strokeWidth="4" strokeLinejoin="round" />
                </svg>
                <s.icon className="relative h-5 w-5" strokeWidth={1.9} />
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
