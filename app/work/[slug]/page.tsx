import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ButtonLink, Folder, Hand, PageShell, Sticky, NOTE_COLORS, rot } from "@/components/ui-bits";
import { PROJECTS, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return p ? { title: p.name, description: p.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const c = project.case;
  const blocks = [
    { title: "Problem", body: c.problem },
    { title: "Target user", body: c.user },
    { title: "Design decisions", body: c.design },
    { title: "Technical decisions", body: c.tech },
    { title: "The hard problem", body: c.hardProblem },
    { title: "Result & learnings", body: c.outcome },
  ];

  return (
    <PageShell>
      <Link href="/work" className="mb-8 inline-flex items-center gap-2 font-pixel text-sm font-bold uppercase hover:underline">
        <ArrowLeft className="h-4 w-4" /> All projects
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <header>
          <Hand className="reveal">{project.tag}</Hand>
          <h1 className="reveal font-pixel text-6xl font-bold uppercase leading-[0.9] md:text-8xl" style={{ "--d": "60ms" } as React.CSSProperties}>{project.name}</h1>
          <p className="reveal mt-5 max-w-xl text-lg leading-relaxed text-neutral-700" style={{ "--d": "140ms" } as React.CSSProperties}>{project.summary}</p>
          <div className="reveal mt-7 flex flex-wrap gap-3" style={{ "--d": "200ms" } as React.CSSProperties}>
            {project.links.live && <ButtonLink href={project.links.live} external>Live demo</ButtonLink>}
            {project.links.repo && <ButtonLink href={project.links.repo} variant="ghost" external>Source</ButtonLink>}
            {!project.links.live && !project.links.repo && <Sticky color="bg-note-rose" r="-2deg">Links coming soon</Sticky>}
          </div>
        </header>

        {/* meta stickies */}
        <div className="grid grid-cols-2 gap-4">
          <div style={{ "--r": "-2deg" } as React.CSSProperties} className="relative note tape bg-note-sky p-4 pt-6">
            <p className="font-hand text-lg text-neutral-600">status</p>
            <p className="font-pixel text-sm font-bold uppercase">{project.status}</p>
          </div>
          <div style={{ "--r": "2deg" } as React.CSSProperties} className="relative note tape bg-note-sun p-4 pt-6">
            <p className="font-hand text-lg text-neutral-600">stack</p>
            <p className="font-pixel text-sm font-bold uppercase leading-snug">{project.stack.join(" · ")}</p>
          </div>
        </div>
      </div>

      {project.image && (
        <div className="neo mt-12 rounded-xl bg-white p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.image} alt={`${project.name} screenshot`} className="w-full" decoding="async" />
        </div>
      )}

      <div className="mt-16 grid gap-x-8 gap-y-10 md:grid-cols-2">
        {blocks.map((b, n) => (
          <Folder key={b.title} tab={`${String(n + 1).padStart(2, "0")} ${b.title}`} color={["bg-fpurple", "bg-fblue", "bg-fgreen", "bg-fyellow", "bg-bubble", "bg-forange"][n % 6]} bodyClassName="bg-white">
            <p className="leading-relaxed text-neutral-700">{b.body}</p>
          </Folder>
        ))}
      </div>

      <section className="mt-20">
        <Hand>the engineering proof</Hand>
        <h2 className="mb-8 font-pixel text-4xl font-bold uppercase md:text-5xl">How it&apos;s built</h2>
        <ul className="grid gap-6 sm:grid-cols-3">
          {c.built.map((b, n) => (
            <li key={b.label} style={{ "--r": rot(n) } as React.CSSProperties} className={`relative note tape p-6 pt-8 ${NOTE_COLORS[(n + 1) % 4]}`}>
              <p className="font-hand text-xl text-neutral-600">{b.label}</p>
              <p className="font-pixel text-lg font-bold uppercase">{b.value}</p>
            </li>
          ))}
        </ul>
      </section>

      <Link href={`/work/${next.slug}`} className="neo group mt-20 flex items-center justify-between gap-4 rounded-2xl bg-fyellow p-7 transition-transform hover:-translate-y-1">
        <div>
          <Hand className="leading-none">next up</Hand>
          <p className="font-pixel text-4xl font-bold uppercase md:text-5xl">{next.name}</p>
        </div>
        <ArrowUpRight className="h-8 w-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Link>
    </PageShell>
  );
}
