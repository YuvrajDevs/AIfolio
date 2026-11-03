import type { Metadata } from "next";
import { Download } from "lucide-react";
import { ButtonLink, Hand, PageShell, Polaroid, SectionHeading, Sticky, NOTE_COLORS, rot } from "@/components/ui-bits";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "About & resume", description: "Software engineer, AI full-stack developer and product designer based in Pune, India." };

const SKILLS = [
  { group: "Product & design", items: ["UI/UX design", "Product design", "Design systems", "Prototyping"] },
  { group: "Full-stack", items: ["Next.js", "TypeScript", "React", "Supabase", "PostgreSQL", "React Flow"] },
  { group: "AI", items: ["LLM APIs", "Agent workflows", "Prompting & evals"] },
  { group: "Data & CRM", items: ["Salesforce", "Power BI", "CRM Analytics", "Einstein Discovery", "SQL"] },
];

export default function AboutPage() {
  return (
    <PageShell>
      <h1 className="reveal font-pixel text-6xl font-bold uppercase leading-none md:text-9xl">About</h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="neo relative bg-white p-6 md:p-9">
          <Sticky color="bg-sun" r="-3deg" className="absolute -top-4 left-6">Main quest</Sticky>
          <p className="mt-3 font-hand text-3xl leading-snug md:text-4xl">
            I&apos;m a designer-engineer who gets a little too excited about making complicated things feel simple.
          </p>
          <p className="mt-6 leading-relaxed text-neutral-700">
            Computer science graduate (VIT Vellore, 2026), based in Pune. I use AI tooling to ship end to end, from product thinking and interface design through to the data model and deployment.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href={SITE.resume} external><Download className="h-4 w-4" /> Resume</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">Get in touch</ButtonLink>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Polaroid letter="Y" caption="photo coming soon" r="5deg" className="!w-56" />
        </div>
      </div>

      <section className="mt-24">
        <SectionHeading label="right now" title="Experience" />
        <div className="neo tape relative bg-white p-7 pt-9 md:p-9">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-pixel text-2xl font-bold uppercase">Software Engineer</h3>
            <Sticky color="bg-note-mint" r="2deg">Dealermatix Technologies</Sticky>
          </div>
          <p className="mt-4 max-w-3xl leading-relaxed text-neutral-700">
            Salesforce CRM development, Power BI dashboards, CRM Analytics and predictive modelling with Einstein Discovery for enterprise clients in automotive and FMCG.
          </p>
          <Hand className="mt-3 !text-lg">(quantified highlights to be added)</Hand>
          <p className="mt-4 max-w-3xl text-neutral-700">Before this, I did freelance UI/UX and product design work.</p>
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading label="my toolbox" title="Skills" />
        <div className="grid gap-7 sm:grid-cols-2">
          {SKILLS.map((s, i) => (
            <div key={s.group} style={{ "--r": rot(i) } as React.CSSProperties} className={`relative note tape p-6 pt-8 ${NOTE_COLORS[i % 4]}`}>
              <Hand className="mb-3 leading-none">{s.group}</Hand>
              <ul className="flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <li key={it} className="border-2 border-ink bg-white px-2.5 py-1 font-pixel text-xs font-bold uppercase">{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="neo mt-24 bg-ocean p-8 text-white md:p-10">
        <Hand className="!text-white/80">what i&apos;m looking for</Hand>
        <p className="mt-2 max-w-3xl font-pixel text-2xl font-bold uppercase leading-tight md:text-4xl">
          Remote roles at startups and small teams outside India, where design and engineering sit close together.
        </p>
      </section>
    </PageShell>
  );
}
