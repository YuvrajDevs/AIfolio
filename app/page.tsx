import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink, Chip, Doodle, FigCursor, Hand, ProjectCard, SectionHeading, Sticky } from "@/components/ui-bits";
import { featured } from "@/lib/projects";
import { SERVICES } from "@/lib/services";

const STACK = ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "React Flow", "LLM APIs", "Salesforce", "Power BI"];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-20 pt-16 md:pb-28 md:pt-24 xl:min-h-[760px] xl:pt-32">
        {/* floating UI chips + doodles (xl screens only, purely decorative) */}
        <div className="hidden xl:block">
          <Chip className="left-[6%] top-[14%]" r="-2deg">
            <p className="font-pixel text-[10px] font-bold uppercase tracking-wider text-neutral-500">Now</p>
            <p className="font-hand text-2xl leading-none">Software Engineer</p>
            <p className="text-xs text-neutral-500">Dealermatix Technologies</p>
          </Chip>
          <Chip className="right-[7%] top-[13%]" r="2deg" d="1s">
            <p className="font-pixel text-[10px] font-bold uppercase tracking-wider text-neutral-500">Stack</p>
            <p className="font-pixel text-sm font-bold">Next.js · TypeScript</p>
            <p className="font-pixel text-sm font-bold">Supabase · LLMs</p>
          </Chip>
          <Chip lime className="left-[4%] top-[52%]" r="-5deg" d="0.5s"><span className="font-hand text-2xl">✓ ships end to end</span></Chip>
          <Chip className="right-[5%] top-[50%]" r="3deg" d="2s">
            <p className="flex gap-4 font-pixel text-xs font-bold uppercase"><span className="border-b-2 border-ink">Design</span><span className="text-neutral-400">Code</span><span className="text-neutral-400">AI</span></p>
          </Chip>
          <Chip className="bottom-[9%] left-[13%]" r="2deg" d="1.5s">
            <p className="font-pixel text-[10px] font-bold uppercase tracking-wider text-neutral-500">Based in</p>
            <p className="font-hand text-2xl leading-none">Pune, India</p>
            <p className="text-xs text-neutral-500">works with teams worldwide</p>
          </Chip>
          <Chip className="bottom-[10%] right-[12%]" r="-2deg" d="0.8s">
            <p className="font-pixel text-[10px] font-bold uppercase tracking-wider text-neutral-500">Next up</p>
            <p className="font-hand text-2xl leading-none">Honest Mailbox app</p>
          </Chip>
          <Doodle kind="asterisk" className="left-[30%] top-[9%]" />
          <Doodle kind="diamond" className="right-[27%] top-[9%]" />
          <Doodle kind="heart" className="left-[22%] bottom-[22%]" />
          <Doodle kind="cloud" className="right-[24%] bottom-[20%]" />
          <Doodle kind="spark" className="left-[44%] bottom-[6%]" />
        </div>
        <FigCursor name="Founder" color="#0ACF83" className="left-[19%] top-[40%] hidden xl:block" d="0s" />
        <FigCursor name="Recruiter" color="#FF7262" className="right-[18%] top-[40%] hidden xl:block" d="1.5s" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <Hand className="reveal">by yuvraj singh shekhawat</Hand>

          <div className="reveal relative mt-3 w-fit" style={{ "--d": "80ms" } as React.CSSProperties}>
            <h1 className="relative border-2 border-fblue bg-white px-8 py-3 font-pixel text-6xl font-bold uppercase leading-none md:px-12 md:text-8xl">
              Yuvraj
              {["-left-1.5 -top-1.5", "-right-1.5 -top-1.5", "-left-1.5 -bottom-1.5", "-right-1.5 -bottom-1.5"].map((p) => (
                <span key={p} aria-hidden className={`absolute h-3 w-3 border-2 border-ink bg-white ${p}`} />
              ))}
            </h1>
            <Sticky color="bg-note-sky" r="-5deg" className="absolute -left-4 -top-6 hidden md:block md:-left-24">AI full-stack</Sticky>
            <Sticky color="bg-note-mint" r="4deg" className="absolute -right-4 -top-5 hidden md:block md:-right-24">Product designer</Sticky>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2 md:hidden">
            <Sticky color="bg-note-sky" r="-3deg">AI full-stack</Sticky>
            <Sticky color="bg-note-mint" r="2deg">Product designer</Sticky>
          </div>

          <p className="reveal mt-8 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3 py-1 font-pixel text-[11px] font-bold uppercase shadow-[3px_3px_0_#111]" style={{ "--d": "140ms" } as React.CSSProperties}>
            <span className="h-2 w-2 animate-pulse rounded-full bg-leaf" /> Open to new work and remote roles
          </p>

          <h2 className="reveal mt-8 max-w-2xl font-pixel text-3xl font-bold leading-tight md:text-5xl" style={{ "--d": "200ms" } as React.CSSProperties}>
            I build AI tools that do real work, and make them{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">a joy to use</span>
              <span aria-hidden className="absolute inset-x-0 bottom-0.5 -z-0 h-3 bg-lime md:h-4" />
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
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {featured().map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
        </div>
        <div className="mt-10 flex justify-center"><ButtonLink href="/work" variant="ghost">All projects →</ButtonLink></div>
      </section>

      {/* What I do: tall colour panels */}
      <section className="border-y border-ink/20 bg-white/40 px-5 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading label="what i'm good at" title="What I do" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <li key={s.title}>
                <Link href="/services" className={`group flex h-full min-h-[360px] flex-col rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1.5 ${["bg-[#EF86B1]", "bg-[#F4B93E]", "bg-[#E8583A]", "bg-[#3F86D9]"][i]}`}>
                  <p className="font-pixel text-6xl font-bold leading-none">0{i + 1}</p>
                  <h3 className="mt-2 font-pixel text-lg font-bold uppercase leading-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/80">{s.short}</p>
                  <div className="mt-auto flex items-end justify-between pt-8">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-ink bg-white transition-transform duration-300 group-hover:rotate-6">
                      <s.icon className="h-9 w-9" strokeWidth={1.5} />
                    </span>
                    <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Let's talk */}
      <section className="px-5 pb-28 text-center">
        <div className="mx-auto flex max-w-xl flex-col items-center">
          <div aria-hidden className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-ink bg-fyellow font-pixel text-3xl font-bold shadow-[4px_4px_0_#111]">:)</div>
          <h2 className="font-pixel text-5xl font-bold uppercase leading-none md:text-7xl">Let&apos;s talk</h2>
          <Hand className="mt-3">got a project, a role, or just want to say hi? i read every message.</Hand>
          <div className="mt-7"><ButtonLink href="/contact">Say hello</ButtonLink></div>
        </div>
      </section>
    </>
  );
}
