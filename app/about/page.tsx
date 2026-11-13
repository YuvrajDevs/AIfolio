import type { Metadata } from "next";
import { Briefcase, ChevronDown, Component, Download, Frame, Layers, PenTool } from "lucide-react";
import { Artboard, ButtonLink, PageHero, PageShell } from "@/components/ui-bits";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "About & resume", description: "Product designer who builds: how I work, where I have worked, and what I use." };

const SKILLS = [
  { group: "AI", items: ["OpenAI API", "Anthropic API", "Gemini API", "Agent workflows", "Human-in-the-loop", "Prompting & evals", "NL-to-SQL"] },
  { group: "Full stack", items: ["Next.js", "React", "TypeScript", "Node.js", "Express", "MongoDB", "Kafka", "Redis", "REST APIs", "Supabase", "PostgreSQL", "Firebase"] },
  { group: "Data", items: ["SQL", "Python", "Salesforce", "CRM Analytics", "Power BI", "dbt", "DuckDB", "FastAPI", "Airflow", "Data cleaning", "ETL pipelines"] },
  { group: "Product design", items: ["Product design", "UX research", "Interaction design", "Design systems", "Prototyping", "Accessibility", "Figma"] },
  { group: "Ship & secure", items: ["Vercel", "Docker", "Jenkins CI", "Kubernetes", "Security headers & rules"] },
];

const PRINCIPLES = [
  { title: "Understand first", body: "I make sure I know who it's for and what's actually broken before designing anything." },
  { title: "Decide on purpose", body: "I explore a few options and note why the chosen one won." },
  { title: "Set the direction", body: "I design the direction and commit to it, keeping the experience and the interface clear at every step." },
  { title: "Ship it", body: "It goes through feedback loops first. Once everything is clear, it ships for public use." },
];

const LAYER_TINT = ["text-lime", "text-p-sky", "text-p-mint", "text-p-pink", "text-p-peach"];

const EXPERIENCE = [
  {
    role: "Software Engineer",
    org: "Dealermatix Technologies",
    when: "Jun 2026 – Present",
    desc: "Full-time, data analytics on Salesforce: pipelines that take raw, unclean client data to analysis-ready datasets, data cleaning and quality checks, insights, and dashboards built around each client's requirements.",
    icon: Briefcase,
    tint: "bg-lime",
  },
  { role: "Product Designer (Freelance)", org: "Zenia Mobile", when: "Nov 2025 – Apr 2026", desc: "Design across multiple client projects: improved UX in legacy systems, worked within existing design systems, and designed apps from scratch to each client's requirements.", icon: PenTool, tint: "bg-p-sky" },
  { role: "Product Designer", org: "Freelance", when: "2024 – Oct 2025", desc: "End-to-end product design for web and mobile: research, Figma prototypes, design systems and developer handoff for SaaS dashboards and B2B tools.", icon: PenTool, tint: "bg-p-pink" },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        label="About"
        title={<span className="whitespace-nowrap">Hey there,<br />I&apos;m Yuvraj</span>}
        align="center"
        below={
          <p className="text-[15px] leading-relaxed text-white/85 md:text-base">
            A product designer who loves seeing <span className="rounded bg-lime px-1 font-semibold text-ink">his designs come alive</span>.
          </p>
        }
      >
        <p className="text-[15px] leading-relaxed text-white/85 md:text-base">
          Most of my work starts with a gap in the market or a messy problem, which I turn into something calm, clear and intuitive. Bring your ideas, and we can stir up something great.
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
            {EXPERIENCE.map((e) => (
              <li key={e.role} className="relative grid grid-cols-[36px_1fr] gap-3">
                <span className={cn("relative z-10 mt-3 grid h-9 w-9 place-items-center rounded-full border-2 border-ink shadow-[0_6px_14px_-6px_rgba(0,8,50,.6)]", e.tint)}>
                  <e.icon className="h-4 w-4 text-ink" strokeWidth={2} />
                </span>
                <div className="rounded-2xl bg-white p-4 text-ink shadow-[0_18px_34px_-20px_rgba(0,8,50,.65)] transition-transform duration-300 hover:-translate-y-0.5 md:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-2 font-bold tracking-tight">
                        {e.role}

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
          <span className="relative z-10 -mb-px inline-flex self-start items-center gap-2 rounded-t-xl bg-panel px-3.5 pb-1.5 pt-2 text-[13px] font-semibold">
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

      <Artboard name="How I work" meta="4 principles" color="pink" className="mt-10" bodyClassName="!p-2">
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} className={cn("rounded-xl p-5 text-ink", ["bg-p-sky", "bg-p-lemon", "bg-p-pink", "bg-p-mint"][i])}>
              <p className="font-mono text-[11px] font-medium text-ink/55">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 text-lg font-bold leading-tight tracking-tight">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{p.body}</p>
            </li>
          ))}
        </ol>
      </Artboard>
    </PageShell>
  );
}
