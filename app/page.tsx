import { ButtonLink, Hand, Polaroid, ProjectCard, SectionHeading, Sticky, NOTE_COLORS, rot } from "@/components/ui-bits";
import { featured } from "@/lib/projects";
import { SERVICES } from "@/lib/services";

const STACK = ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "React Flow", "LLM APIs", "Salesforce", "Power BI"];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-20 pt-16 md:pb-28 md:pt-24">
        <Polaroid letter="Y" caption="that's me (photo soon)" r="-6deg" className="absolute left-[4%] top-24 hidden lg:block" />
        <Polaroid letter="★" caption="building things" r="5deg" tint="bg-note-rose" className="absolute right-[4%] top-40 hidden lg:block" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <Hand className="reveal">by yuvraj singh shekhawat</Hand>

          <div className="reveal relative mt-3 w-fit" style={{ "--d": "80ms" } as React.CSSProperties}>
            <h1 className="relative border-2 border-bubble bg-white/70 px-8 py-3 font-pixel text-6xl font-bold uppercase leading-none md:px-12 md:text-8xl">
              Yuvraj
              {["-left-1.5 -top-1.5", "-right-1.5 -top-1.5", "-left-1.5 -bottom-1.5", "-right-1.5 -bottom-1.5"].map((p) => (
                <span key={p} aria-hidden className={`absolute h-3 w-3 border-2 border-ink bg-white ${p}`} />
              ))}
            </h1>
            <Sticky color="bg-note-sky" r="-5deg" className="absolute -left-4 -top-6 hidden md:block md:-left-24">AI full-stack</Sticky>
            <Sticky color="bg-note-mint" r="4deg" className="absolute -right-4 -top-5 hidden md:block md:-right-24">Product designer</Sticky>
            <Sticky color="bg-note-sun" r="-3deg" className="absolute -bottom-6 -left-4 hidden md:block md:-left-32">Ships end to end</Sticky>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2 md:hidden">
            <Sticky color="bg-note-sky" r="-3deg">AI full-stack</Sticky>
            <Sticky color="bg-note-mint" r="2deg">Product designer</Sticky>
          </div>

          <p className="reveal mt-8 inline-flex items-center gap-2 border-2 border-ink bg-white px-3 py-1 font-pixel text-[11px] font-bold uppercase" style={{ "--d": "140ms" } as React.CSSProperties}>
            <span className="h-2 w-2 animate-pulse rounded-full bg-leaf" /> Open to new work and remote roles
          </p>

          <h2 className="reveal mt-8 max-w-2xl font-pixel text-3xl font-bold leading-tight md:text-5xl" style={{ "--d": "200ms" } as React.CSSProperties}>
            I build AI tools that do real work, and make them{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">a joy to use</span>
              <span aria-hidden className="absolute inset-x-0 bottom-0.5 -z-0 h-3 bg-sun md:h-4" />
            </span>
            <span className="ml-1 text-bubble">*</span>
          </h2>

          <div className="reveal mt-9 flex flex-wrap justify-center gap-3" style={{ "--d": "280ms" } as React.CSSProperties}>
            <ButtonLink href="/contact">Contact me</ButtonLink>
            <ButtonLink href="/work" variant="ghost">See the work</ButtonLink>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section aria-label="Tools" className="border-y-2 border-ink bg-white px-5 py-5">
        <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-7 gap-y-2 font-pixel text-sm font-bold uppercase">
          {STACK.map((s, i) => (
            <li key={s} className="flex items-center gap-7">{s}{i < STACK.length - 1 && <span aria-hidden className="text-bubble">✦</span>}</li>
          ))}
        </ul>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <SectionHeading label="a few things i've made ↓" title="Featured works" />
        <div className="grid gap-6 sm:grid-cols-2">
          {featured().map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
        </div>
        <div className="mt-10 flex justify-center"><ButtonLink href="/work" variant="ghost">All projects →</ButtonLink></div>
      </section>

      {/* What I do */}
      <section className="mx-auto max-w-6xl px-5 pb-20 md:pb-28">
        <SectionHeading label="what i'm good at" title="What I do" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <li key={s.title} style={{ "--r": rot(i) } as React.CSSProperties} className={`relative note tape wiggle p-6 pt-8 ${NOTE_COLORS[i % 4]}`}>
              <s.icon className="mb-3 h-6 w-6" strokeWidth={1.75} />
              <h3 className="font-pixel text-xl font-bold uppercase leading-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-800">{s.short}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Let's talk */}
      <section className="px-5 pb-28 text-center">
        <div className="mx-auto flex max-w-xl flex-col items-center">
          <div aria-hidden className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-ink bg-sun font-pixel text-3xl font-bold">:)</div>
          <h2 className="font-pixel text-5xl font-bold uppercase leading-none md:text-7xl">Let&apos;s talk</h2>
          <Hand className="mt-3">got a project, a role, or just want to say hi? i read every message.</Hand>
          <div className="mt-7"><ButtonLink href="/contact">Say hello</ButtonLink></div>
        </div>
      </section>
    </>
  );
}
