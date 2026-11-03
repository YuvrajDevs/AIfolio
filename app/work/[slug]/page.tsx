import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ButtonLink, Folder, Hand, PageShell, Sticky } from "@/components/ui-bits";
import { PROJECTS, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return p ? { title: p.name, description: p.summary } : {};
}

const list = (v: string | string[]) => (Array.isArray(v) ? v : [v]);
const TILE = ["bg-note-sky", "bg-note-sun", "bg-note-mint", "bg-note-rose"];
const TAB = ["bg-fpurple", "bg-fblue", "bg-fgreen", "bg-fyellow", "bg-bubble", "bg-forange"];

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const c = project.case;
  const blocks = [
    { title: "Problem", body: c.problem },
    { title: "Who it's for", body: c.user },
    { title: "Design", body: c.design },
    { title: "Tech", body: c.tech },
    { title: "Hard problem", body: c.hardProblem },
    { title: "Result", body: c.outcome },
  ];

  return (
    <PageShell>
      <Link href="/work" className="mb-8 inline-flex items-center gap-2 font-pixel text-sm uppercase hover:underline">
        <ArrowLeft className="h-4 w-4" /> All projects
      </Link>

      {/* Header */}
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <header>
          <Hand className="reveal">{project.tag}</Hand>
          <h1 className="reveal font-pixel text-6xl uppercase leading-[0.9] md:text-8xl" style={{ "--d": "60ms" } as React.CSSProperties}>{project.name}</h1>
          <p className="reveal mt-5 max-w-xl text-lg leading-relaxed text-neutral-700" style={{ "--d": "140ms" } as React.CSSProperties}>{project.summary}</p>
          <div className="reveal mt-6 flex flex-wrap gap-3" style={{ "--d": "200ms" } as React.CSSProperties}>
            {project.links.live && <ButtonLink href={project.links.live} external>Live demo</ButtonLink>}
            {project.links.repo && <ButtonLink href={project.links.repo} variant="ghost" external>Source</ButtonLink>}
            {!project.links.live && !project.links.repo && <Sticky color="bg-note-rose" r="-2deg">Links coming soon</Sticky>}
          </div>
        </header>

        <div className="space-y-4">
          <div style={{ "--r": "-1.5deg" } as React.CSSProperties} className="note relative rounded-lg bg-note-sky p-4">
            <p className="font-hand text-lg leading-none text-neutral-600">status</p>
            <p className="mt-1 font-pixel text-sm uppercase">{project.status}</p>
          </div>
          <ul className="flex flex-wrap gap-2" aria-label="Stack">
            {project.stack.map((t) => (
              <li key={t} className="rounded-md bg-white px-2.5 py-1 font-pixel text-xs uppercase shadow-[0_1px_0_rgba(0,0,0,.12)]">{t}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Key numbers */}
      {project.stats && (
        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {project.stats.map((s, n) => (
            <li key={s.label} className={`rounded-2xl p-5 ${TILE[n % 4]}`}>
              <p className="font-pixel text-4xl leading-none md:text-5xl">{s.value}</p>
              <p className="mt-2 text-sm text-ink/70">{s.label}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Image */}
      {project.image && (
        <div className="neo mt-10 flex justify-center rounded-xl bg-white p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`${project.name} screenshot`}
            className={project.imageFit === "contain" ? "max-h-[420px] w-auto object-contain" : "w-full"}
            decoding="async"
          />
        </div>
      )}

      {/* What it does + what's different */}
      {(c.whatItDoes || c.unique) && (
        <div className="mt-12 grid gap-x-8 gap-y-10 lg:grid-cols-2">
          {c.whatItDoes && (
            <Folder tab={c.doesLabel ?? "What it does"} color="bg-fgreen" bodyClassName="bg-white">
              <ul className="flex flex-wrap gap-2">
                {c.whatItDoes.map((t) => (
                  <li key={t} className="rounded-full bg-note-mint px-3 py-1 text-sm">{t}</li>
                ))}
              </ul>
            </Folder>
          )}
          {c.unique && (
            <Folder tab="What makes it different" color="bg-fpurple" bodyClassName="bg-white">
              <ul className="space-y-2">
                {c.unique.map((t) => (
                  <li key={t} className="flex gap-2.5 text-[15px] leading-snug text-neutral-800">
                    <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-fpurple" />{t}
                  </li>
                ))}
              </ul>
            </Folder>
          )}
        </div>
      )}

      {/* Case study, in short points */}
      <div className="mt-12 grid gap-x-6 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
        {blocks.map((b, n) => (
          <Folder key={b.title} tab={b.title} color={TAB[n % 6]} bodyClassName="bg-white p-5 md:p-5">
            <ul className="space-y-2">
              {list(b.body).map((t) => (
                <li key={t} className="flex gap-2 text-[15px] leading-snug text-neutral-800">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" />{t}
                </li>
              ))}
            </ul>
          </Folder>
        ))}
      </div>

      {/* Limits */}
      {c.limits && (
        <div className="mt-10">
          <p className="mb-2 font-pixel text-xs uppercase text-neutral-500">Honest limits</p>
          <ul className="flex flex-wrap gap-2">
            {list(c.limits).map((t) => (
              <li key={t} className="rounded-full border border-ink/20 bg-note-sun px-3 py-1 text-sm">{t}</li>
            ))}
          </ul>
        </div>
      )}

      {/* How it's built */}
      <section className="mt-14">
        <Hand className="leading-none">the engineering proof</Hand>
        <h2 className="mb-5 font-pixel text-3xl uppercase md:text-4xl">How it&apos;s built</h2>
        <dl className="divide-y divide-ink/10 rounded-2xl bg-white shadow-[0_10px_28px_-16px_rgba(0,0,0,.3)]">
          {c.built.map((b) => (
            <div key={b.label} className="grid gap-1 px-5 py-3 sm:grid-cols-[9rem_1fr] sm:items-baseline sm:gap-4">
              <dt className="font-pixel text-xs uppercase text-neutral-500">{b.label}</dt>
              <dd className="text-[15px] text-neutral-800">{b.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Link href={`/work/${next.slug}`} className="neo group mt-16 flex items-center justify-between gap-4 rounded-2xl bg-fyellow p-6 transition-transform hover:-translate-y-1">
        <div>
          <Hand className="leading-none">next up</Hand>
          <p className="font-pixel text-3xl uppercase md:text-5xl">{next.name}</p>
        </div>
        <ArrowUpRight className="h-8 w-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Link>
    </PageShell>
  );
}
