import type { Metadata } from "next";
import { Briefcase, ChevronDown, Component, Download, Frame, GraduationCap, Layers, PenTool } from "lucide-react";
import { Artboard, ButtonLink, PageHero, PageShell } from "@/components/ui-bits";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "About & resume", description: "Software engineer strongest at AI, product design and full stack, with a background in data and CRM analytics." };

const SKILLS = [
  { group: "AI", items: ["OpenAI API", "Anthropic API", "Gemini API", "Agent workflows", "Human-in-the-loop", "Prompting & evals", "NL-to-SQL", "Claude Code & Cursor"] },
  { group: "Full stack", items: ["Next.js", "React", "TypeScript", "Node.js", "REST APIs", "Supabase", "PostgreSQL", "Prisma", "Firebase", "Stripe", "Three.js"] },
  { group: "Data", items: ["Python", "SQL", "DuckDB", "dbt", "FastAPI", "Airflow", "Power BI", "CRM Analytics", "Einstein Discovery"] },
  { group: "Product design", items: ["UI/UX design", "Product design", "Design systems", "Prototyping", "Figma"] },
  { group: "Ship & secure", items: ["Vercel", "Docker", "Jenkins CI", "Kubernetes", "Security headers & rules"] },
];

const LAYER_TINT = ["text-lime", "text-p-sky", "text-p-mint", "text-p-pink", "text-p-peach"];

const EXPERIENCE = [
  {
    role: "Software Engineer",
    org: "Dealermatix Technologies",
    when: "2025 – Now",
    desc: "Salesforce CRM development, Power BI dashboards, CRM Analytics and predictive modelling with Einstein Discovery for enterprise clients in automotive and FMCG.",
    icon: Briefcase,
    tint: "bg-lime",
  },
  { role: "UI/UX & Product Designer", org: "Freelance", when: "Before 2025", desc: "Interface and product design work for independent clients.", icon: PenTool, tint: "bg-p-pink" },
  { role: "Computer Science", org: "VIT Vellore", when: "Class of 2026", desc: "Computer science degree. Freelance design work alongside.", icon: GraduationCap, tint: "bg-p-sky" },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero label="About" title="Hey, I'm Yuvraj" align="center">
        <p className="text-[15px] leading-relaxed text-white/85 md:text-base">
          A designer-engineer who gets a little too excited about making complicated things feel simple. I build with AI tools like Claude Code and Cursor, so ideas reach production in days instead of weeks.
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-white/85 md:text-base">
          <span className="rounded bg-lime px-1 font-semibold text-ink">Strongest at AI, product design and full stack</span>, with a data background from enterprise CRM analytics.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <ButtonLink href={SITE.resume} external><Download className="h-4 w-4" /> Resume</ButtonLink>
          <ButtonLink href="/contact" variant="ghost">Get in touch</ButtonLink>
        </div>
      </PageHero>

      <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr]">
        <Artboard name="Experience" tone="outline" className="flex flex-col" bodyClassName="flex-1">
          {/* timeline: dashed track, icon nodes, one white card per step */}
          <ol className="relative flex h-full flex-col justify-between gap-4">
            <span aria-hidden className="absolute bottom-6 left-[17px] top-6 border-l-2 border-dashed border-lime/60" />
            {EXPERIENCE.map((e, i) => (
              <li key={e.role} className="relative grid grid-cols-[36px_1fr] gap-3">
                <span className={cn("relative z-10 mt-3 grid h-9 w-9 place-items-center rounded-full border-2 border-ink shadow-[0_6px_14px_-6px_rgba(0,8,50,.6)]", e.tint)}>
                  <e.icon className="h-4 w-4 text-ink" strokeWidth={2} />
                </span>
                <div className="rounded-2xl bg-white p-4 text-ink shadow-[0_18px_34px_-20px_rgba(0,8,50,.65)] transition-transform duration-300 hover:-translate-y-0.5 md:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-2 font-bold tracking-tight">
                        {e.role}
                        {i === 0 && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-p-mint px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                            <span aria-hidden className="pulse-dot h-1.5 w-1.5 rounded-full bg-live" /> Current
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-muted">{e.org}</p>
                    </div>
                    <span className={cn("shrink-0 rounded-full px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-wider", e.tint)}>{e.when}</span>
                  </div>
                  <p className="mt-2.5 border-t border-dashed border-ink/15 pt-2.5 text-sm leading-relaxed text-ink/75">{e.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Artboard>

        <section className="flex flex-col">
          <span className="relative z-10 inline-flex self-start items-center gap-2 rounded-t-xl bg-panel px-3.5 pb-1.5 pt-2 text-[13px] font-semibold">
            <Layers className="h-3.5 w-3.5 text-lime" strokeWidth={2.25} /> Skills
          </span>
          <div className="ui-panel flex-1 overflow-hidden !rounded-2xl !rounded-tl-none">
            <div className="flex items-center gap-4 border-b border-white/10 px-4 py-2.5 text-xs">
              <span className="font-semibold">Layers</span>
              <span className="text-white/40">Assets</span>
              <span className="eyebrow ml-auto text-white/40">{SKILLS.reduce((n, g) => n + g.items.length, 0)} items</span>
            </div>
            <ul className="p-2">
              {SKILLS.map((g, i) => (
                <li key={g.group}>
                  <div className={cn("flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium", i === 0 && "bg-figma/25")}>
                    <ChevronDown className="h-3.5 w-3.5 text-white/40" />
                    <Frame className={cn("h-3.5 w-3.5", LAYER_TINT[i])} strokeWidth={2.25} />
                    {g.group}
                    <span className="ml-auto font-mono text-[11px] text-white/40">{g.items.length}</span>
                  </div>
                  <div className="mb-1 ml-[15px] flex flex-wrap gap-1.5 border-l border-white/10 py-1.5 pl-5">
                    {g.items.map((it) => (
                      <span key={it} className="inline-flex items-center gap-1.5 rounded-md bg-white/[.06] px-2 py-1 text-xs text-white/85">
                        <Component className={cn("h-3 w-3", LAYER_TINT[i])} /> {it}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

    </PageShell>
  );
}
