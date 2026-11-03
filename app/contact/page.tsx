import type { Metadata } from "next";
import { IconMail, IconBrandLinkedin, IconBrandGithub, IconFileText } from "@tabler/icons-react";
import { ContactForm } from "@/components/ContactForm";
import { Hand, PageShell, Polaroid } from "@/components/ui-bits";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: "Get in touch." };

const LINKS = [
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}`, icon: IconMail },
  { label: "LinkedIn", value: "Yuvraj Singh Shekhawat", href: SITE.linkedin, icon: IconBrandLinkedin },
  { label: "GitHub", value: "YuvrajDevs", href: SITE.github, icon: IconBrandGithub },
  { label: "Resume", value: "Download PDF", href: SITE.resume, icon: IconFileText },
];

export default function ContactPage() {
  return (
    <PageShell>
      <div className="relative mb-14 text-center">
        <Polaroid letter="☺" caption="say hi" r="-6deg" tint="bg-note-rose" className="absolute left-0 top-0 hidden !w-32 lg:block" />
        <Polaroid letter="@" caption="i reply fast" r="6deg" className="absolute right-0 top-4 hidden !w-32 lg:block" />
        <Hand>got a project, a role, or a hello?</Hand>
        <h1 className="mx-auto mt-2 inline-block border-2 border-ocean bg-white/70 px-8 py-2 font-pixel text-5xl font-bold uppercase md:text-7xl">Contact</h1>
        <Hand className="mx-auto mt-4 max-w-md">tell me what you have in mind. i read every message.</Hand>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="relative note tape bg-note-sun p-6 pt-9 md:p-9 md:pt-10" style={{ "--r": "-0.6deg" } as React.CSSProperties}>
          <ContactForm />
        </div>
        <ul className="space-y-4">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                 className="neo-sm group flex items-center gap-4 bg-white p-4 transition-transform hover:-translate-y-0.5 hover:bg-note-sky">
                <l.icon className="h-6 w-6 shrink-0" />
                <span className="min-w-0">
                  <span className="block font-pixel text-sm font-bold uppercase">{l.label}</span>
                  <span className="block break-all text-sm text-neutral-600">{l.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
