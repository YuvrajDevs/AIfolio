import type { Metadata } from "next";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { ButtonLink, PASTELS, PageHero, PageShell, Sticker } from "@/components/ui-bits";
import { PROCESS, SERVICES } from "@/lib/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Skills", description: "AI and agents, full-stack apps, data and dashboards, and product design." };

/** Tiny UI sketches, one per skill, drawn on the paper sticking out of each folder */
function Mock({ kind }: { kind: "web" | "app" | "data" | "ai" }) {
  const bar = "rounded-full bg-ink/10";
  if (kind === "web") // design / website
    return (
      <div className="h-full rounded-md border border-ink/10">
        <div className="flex gap-1 border-b border-ink/10 px-2 py-1.5">{[0, 1, 2].map((d) => <span key={d} className="h-1.5 w-1.5 rounded-full bg-ink/20" />)}</div>
        <div className="space-y-1.5 p-2.5">
          <div className="h-2.5 w-3/4 rounded-full bg-ink/80" />
          <div className={cn("h-1.5 w-1/2", bar)} />
          <div className="mt-2 h-3 w-12 rounded-full bg-canvas" />
        </div>
      </div>
    );
  if (kind === "app") // web app
    return (
      <div className="flex h-full gap-1.5 rounded-md border border-ink/10 p-1.5">
        <div className="w-1/4 space-y-1 rounded bg-ink/5 p-1">{[0, 1, 2, 3].map((d) => <div key={d} className={cn("h-1.5", d === 0 ? "rounded-full bg-canvas" : bar)} />)}</div>
        <div className="grid flex-1 grid-cols-2 gap-1.5">{[0, 1, 2, 3].map((d) => <div key={d} className="rounded bg-ink/[.06]" />)}</div>
      </div>
    );
  if (kind === "data") // dashboard
    return (
      <div className="flex h-full items-end gap-1.5 rounded-md border border-ink/10 px-2.5 pb-2 pt-4">
        {[40, 65, 50, 85, 60, 95, 72].map((h, d) => <div key={d} style={{ height: `${h}%` }} className={cn("flex-1 rounded-t-sm", d === 5 ? "bg-canvas" : "bg-ink/15")} />)}
      </div>
    );
  return ( // AI
    <div className="flex h-full flex-col justify-center gap-1.5 rounded-md border border-ink/10 p-2">
      <div className="ml-auto h-3 w-2/3 rounded-full rounded-br-sm bg-ink/10" />
      <div className="flex items-center gap-1.5"><Sparkles className="h-3 w-3 text-canvas" /><div className="h-3 w-3/4 rounded-full rounded-bl-sm bg-canvas/80" /></div>
      <div className="ml-auto h-3 w-1/3 rounded-full rounded-br-sm bg-ink/10" />
    </div>
  );
}

export default function SkillsPage() {
  return (
    <PageShell>
      <PageHero label="Skills" title="What I do" intro="AI, full stack and data, with product design running through all of it. One person who can shape the product, design the interface and ship the code." />

      {/* Skills as folders */}
      <ul className="grid gap-x-5 gap-y-8 md:auto-rows-fr md:grid-cols-2">
        {SERVICES.map((s, i) => (
          <li key={s.title} className="group flex flex-col text-ink">
            <span className={cn("relative z-0 inline-flex self-start items-center gap-2 rounded-t-xl px-4 pb-1.5 pt-2 text-[13px] font-semibold text-ink", PASTELS[i])}>
              <s.icon className="h-3.5 w-3.5" strokeWidth={2.25} /> {s.title}
            </span>
            <div className={cn("relative flex flex-1 flex-col overflow-hidden rounded-2xl rounded-tl-none", PASTELS[i])}>
              <div aria-hidden className="absolute inset-0 bg-ink/[.07]" />
              {/* paper */}
              <div aria-hidden className="absolute inset-x-6 top-4 h-36 rotate-[-2deg] rounded-lg bg-white p-2.5 shadow-[0_6px_18px_-8px_rgba(0,0,0,.35)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:rotate-0">
                <Mock kind={s.mock} />
              </div>
              {/* front pocket */}
              <div className={cn("relative mt-[108px] flex-1 rounded-t-2xl p-5 shadow-[0_-12px_24px_-16px_rgba(0,0,0,.35)] md:p-6", PASTELS[i])}>
                <span className="absolute -top-5 right-5 grid h-11 w-11 rotate-12 place-items-center rounded-full border-2 border-ink bg-white shadow-md transition-transform group-hover:rotate-0">
                  <s.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h2 className="pr-12 text-xl font-bold tracking-tight">{s.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-ink/75">{s.long}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {s.gets.map((g) => (
                    <li key={g} className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1 text-xs font-medium">
                      <Check className="h-3 w-3" strokeWidth={3} /> {g}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
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
