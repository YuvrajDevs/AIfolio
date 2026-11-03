import type { Metadata } from "next";
import { Check } from "lucide-react";
import { ButtonLink, Hand, NOTE_COLORS, PageShell, PageTitle, SectionHeading, rot } from "@/components/ui-bits";
import { PROCESS, SERVICES } from "@/lib/services";

export const metadata: Metadata = { title: "Services", description: "Website design and build, web apps, dashboards and AI features." };

export default function ServicesPage() {
  return (
    <PageShell>
      <PageTitle label="what i can do for you" title="Services" intro="One person who can shape the product, design the interface and ship the code, so nothing gets lost between handoffs." />
      <div className="grid gap-7 md:grid-cols-2">
        {SERVICES.map((s, i) => (
          <article key={s.title} style={{ "--r": rot(i) } as React.CSSProperties} className={`relative note tape wiggle p-7 pt-9 ${NOTE_COLORS[i % 4]}`}>
            <s.icon className="mb-3 h-7 w-7" strokeWidth={1.75} />
            <h2 className="font-pixel text-2xl font-bold uppercase">{s.title}</h2>
            <p className="mb-4 mt-2 leading-relaxed text-neutral-800">{s.long}</p>
            <ul className="space-y-2">
              {s.gets.map((g) => (
                <li key={g} className="flex gap-3 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0" /> {g}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-24">
        <SectionHeading label="how it goes" title="Process" />
        <ol className="neo grid bg-white sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p) => (
            <li key={p.step} className="border-b-2 border-ink p-6 last:border-b-0 sm:border-r-2 lg:border-b-0 lg:last:border-r-0">
              <Hand className="leading-none">{p.step}.</Hand>
              <h3 className="mb-2 font-pixel text-xl font-bold uppercase">{p.title}</h3>
              <p className="text-sm leading-relaxed text-neutral-700">{p.desc}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-20 flex justify-center"><ButtonLink href="/contact">Tell me what you need</ButtonLink></div>
    </PageShell>
  );
}
