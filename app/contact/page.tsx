import type { Metadata } from "next";
import { CalendarHeart, Coffee, Heart, MessageCircle, Send, Sparkles, Eye } from "lucide-react";
import { IconMail, IconBrandLinkedin, IconBrandGithub, IconFileText } from "@tabler/icons-react";
import { ContactForm } from "@/components/ContactForm";
import { Chip, Doodle, FigCursor, Folder, Hand, PageShell } from "@/components/ui-bits";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Let's talk", description: "Get in touch about a project, a role, or just to say hi." };

const LINKS = [
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}`, icon: IconMail, bg: "bg-fyellow" },
  { label: "LinkedIn", value: "Yuvraj Singh Shekhawat", href: SITE.linkedin, icon: IconBrandLinkedin, bg: "bg-fblue" },
  { label: "GitHub", value: "YuvrajDevs", href: SITE.github, icon: IconBrandGithub, bg: "bg-fgreen" },
  { label: "Resume", value: "Download PDF", href: SITE.resume, icon: IconFileText, bg: "bg-bubble" },
];

const STEPS = [
  { icon: Send, title: "You send a note", desc: "A few lines about what you have in mind is plenty.", bg: "bg-fpurple" },
  { icon: Eye, title: "I read it properly", desc: "Every message gets read and a real reply.", bg: "bg-fblue" },
  { icon: Coffee, title: "We talk it through", desc: "A short chat to see if we're a fit.", bg: "bg-fyellow" },
];

const TILES = [
  { icon: IconMail, cls: "left-[3%] top-6 bg-fyellow", r: "-8deg" },
  { icon: MessageCircle, cls: "left-[15%] top-40 bg-bubble", r: "6deg" },
  { icon: Sparkles, cls: "right-[4%] top-8 bg-fgreen", r: "8deg" },
  { icon: Heart, cls: "right-[16%] top-44 bg-fblue", r: "-6deg" },
  { icon: CalendarHeart, cls: "left-[25%] top-0 bg-lime", r: "4deg" },
  { icon: Coffee, cls: "right-[25%] top-0 bg-fpurple", r: "-4deg" },
];


export default function ContactPage() {
  return (
    <PageShell>
      {/* Hero */}
      <div className="relative mb-20 text-center md:mb-28">
        <div className="hidden lg:block" aria-hidden>
          {TILES.map((t, i) => (
            <div key={i} style={{ "--r": t.r, "--d": `${i * 0.7}s` } as React.CSSProperties}
                 className={`float absolute flex h-16 w-16 items-center justify-center rounded-2xl shadow-[0_10px_24px_-10px_rgba(0,0,0,.35)] ${t.cls}`}>
              <t.icon className="h-7 w-7" strokeWidth={1.75} style={{ transform: `rotate(${t.r})` }} />
            </div>
          ))}
          <Doodle kind="asterisk" className="left-[9%] top-[62%]" />
          <Doodle kind="spark" className="right-[10%] top-[70%]" />
          <FigCursor name="You" color="#A259FF" className="left-[26%] top-[74%]" d="0.4s" />
        </div>

        <Hand className="relative">got a project, a role, or just a hello?</Hand>
        <h1 className="relative mx-auto mt-2 inline-block border-2 border-fblue bg-white px-8 py-2 font-pixel text-5xl uppercase md:text-8xl">
          Let&apos;s talk
          {["-left-1.5 -top-1.5", "-right-1.5 -top-1.5", "-left-1.5 -bottom-1.5", "-right-1.5 -bottom-1.5"].map((p) => (
            <span key={p} aria-hidden className={`absolute h-3 w-3 border-2 border-ink bg-white ${p}`} />
          ))}
        </h1>
        <Hand className="relative mx-auto mt-5 max-w-md">tell me what you have in mind. i read every message.</Hand>
        <div className="relative mt-6 flex flex-wrap justify-center gap-2">
          <Chip className="!relative" r="-2deg"><span className="font-hand text-2xl">📍 Pune, India · works worldwide</span></Chip>
        </div>
      </div>

      {/* Form + links */}
      <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr]">
        <Folder tab="New message" color="bg-fyellow"><ContactForm /></Folder>
        <div>
          <Hand className="mb-3">or find me here ↓</Hand>
          <ul className="space-y-3">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                   className="group flex items-center gap-4 rounded-2xl bg-white p-3 shadow-[0_8px_22px_-14px_rgba(0,0,0,.4)] transition-transform hover:-translate-y-0.5">
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:rotate-6 ${l.bg}`}>
                    <l.icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-pixel text-sm uppercase">{l.label}</span>
                    <span className="block break-all text-sm text-neutral-600">{l.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* What happens next */}
      <section className="mt-24">
        <Hand>what happens next</Hand>
        <h2 className="mb-8 font-pixel text-4xl uppercase md:text-5xl">Three simple steps</h2>
        <ol className="grid gap-5 md:grid-cols-3">
          {STEPS.map((st, i) => (
            <li key={st.title} className={`relative rounded-3xl p-7 ${st.bg}`}>
              <span className="absolute right-5 top-4 font-pixel text-5xl text-ink/15">0{i + 1}</span>
              <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white"><st.icon className="h-7 w-7" strokeWidth={1.75} /></span>
              <h3 className="font-pixel text-xl uppercase">{st.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">{st.desc}</p>
            </li>
          ))}
        </ol>
      </section>
    </PageShell>
  );
}
