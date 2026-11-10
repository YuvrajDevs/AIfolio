import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { ContactTiles } from "@/components/ContactTiles";
import { PageHero, PageShell, Sticker } from "@/components/ui-bits";

export const metadata: Metadata = { title: "Let's talk", description: "Get in touch about a project, a role, or just to say hi." };

const STEPS = [
  { title: "You send a note", desc: "A few lines about what you have in mind is plenty." },
  { title: "I read it properly", desc: "Every message gets read and a real reply." },
  { title: "We talk it through", desc: "A short call to see if we're a fit." },
];

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero label="Contact" title="Let's talk" intro="Got a project, a role, or just want to say hello? Tell me what you have in mind. I read every message.">
        <p className="eyebrow mt-4 flex items-center gap-2 text-white/70">
          <span aria-hidden className="pulse-dot h-1.5 w-1.5 rounded-full bg-live" /> Available for freelance & remote roles
        </p>
      </PageHero>

      <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr]">
        {/* comment thread */}
        <section>
          <span className="inline-flex h-[34px] items-center gap-2 rounded-t-xl bg-panel px-3.5 text-[13px] font-semibold">
            <MessageCircle className="h-3.5 w-3.5 text-lime" strokeWidth={2.25} /> New message
          </span>
          <div className="ui-panel !rounded-2xl !rounded-tl-none p-4 md:p-5">
            <div className="mb-4 flex gap-3">
              <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime text-sm font-extrabold text-ink">Y</span>
              <div className="min-w-0">
                <p className="text-sm"><span className="font-semibold">Yuvraj</span> <span className="ml-1 font-mono text-[11px] text-white/40">pinned</span></p>
                <p className="mt-1 inline-block rounded-2xl rounded-tl-sm bg-white/[.07] px-3.5 py-2 text-[15px] leading-relaxed text-white/90">
                  Hey! What are you working on? A few lines is plenty, and I&apos;ll get back to you.
                </p>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>

        {/* link tiles: offset by the tab height so they line up with the message panel */}
        <section className="flex flex-col lg:pt-[34px]">
          <ContactTiles />
        </section>
      </div>

      <section className="mt-12">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Sticker color="bg-lime" r="-3deg">What happens next</Sticker>
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Three simple steps</h2>
        </div>
        <ol className="grid gap-3 md:grid-cols-3">
          {STEPS.map((st, i) => (
            <li key={st.title} className="ui-panel p-5">
              <span className="font-mono text-xs text-lime">0{i + 1}</span>
              <h3 className="mt-2 font-semibold tracking-tight">{st.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/65">{st.desc}</p>
            </li>
          ))}
        </ol>
      </section>
    </PageShell>
  );
}
