import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
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

      {/* Highlights: features + differentiators */}
      {(c.whatItDoes || c.unique) && (
        <section className="mt-14" aria-labelledby="highlights">
          <Hand className="leading-none">the good stuff</Hand>
          <h2 id="highlights" className="mb-6 font-pixel text-3xl uppercase md:text-4xl">Highlights</h2>

          {c.whatItDoes && (
            <div className="rounded-3xl bg-white p-5 shadow-[0_10px_28px_-16px_rgba(0,0,0,.3)] md:p-6">
              <p className="mb-3 font-pixel text-xs uppercase text-neutral-500">{c.doesLabel ?? "What it does"}</p>
              <ul className="flex flex-wrap gap-2">
                {c.whatItDoes.map((t, n) => (
                  <li key={t} className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${TILE[n % 4]}`}>{t}</li>
                ))}
              </ul>
            </div>
          )}

          {c.unique && (
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.unique.map((t, n) => (
                <li key={t} className="flex gap-4 rounded-2xl bg-white p-4 shadow-[0_8px_22px_-16px_rgba(0,0,0,.4)]">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-pixel text-sm ${TAB[n % 6]}`}>{String(n + 1).padStart(2, "0")}</span>
                  <span className="text-[15px] leading-snug text-neutral-800">{t}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Case study, in short points */}
      <Hand className="mt-14 leading-none">the story</Hand>
      <h2 className="mb-6 font-pixel text-3xl uppercase md:text-4xl">Case study</h2>
      <div className="grid gap-x-6 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
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

      {/* Under the hood */}
      {project.deep ? (
        <section className="mt-16 overflow-hidden rounded-[28px] bg-ink px-5 py-10 text-white md:px-10 md:py-12" aria-labelledby="hood">
          <p className="font-hand text-2xl leading-none text-lime">for the engineers</p>
          <h2 id="hood" className="mt-1 font-pixel text-4xl uppercase md:text-5xl">Under the hood</h2>

          {/* Architecture flow */}
          <ol className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-3" aria-label="Architecture">
            {project.deep.flow.map((step, n, arr) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-lg border border-white/20 bg-white/10 px-3.5 py-2 font-pixel text-xs uppercase">{step}</span>
                {n < arr.length - 1 && <ArrowRight aria-hidden className="h-4 w-4 text-lime" />}
              </li>
            ))}
          </ol>

          {/* Stack and practice, by area */}
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {project.deep.groups.map((g) => (
              <section key={g.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <h3 className="mb-3 font-pixel text-sm uppercase text-lime">{g.title}</h3>
                <ul className="flex flex-wrap gap-1.5">
                  {g.items.map((it) => (
                    <li key={it} className="rounded-md bg-white/10 px-2.5 py-1 text-[13px] leading-snug text-white/90">{it}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* Decisions */}
          <h3 className="mb-3 mt-10 font-pixel text-sm uppercase text-lime">Decisions and trade-offs</h3>
          <ul className="grid gap-3 md:grid-cols-2">
            {project.deep.decisions.map((d) => (
              <li key={d.pick} className="rounded-2xl border border-white/10 p-4">
                <p className="font-pixel text-sm uppercase">
                  <span className="text-lime">{d.pick}</span>
                  <span className="mx-2 text-white/40">over</span>
                  <span className="text-white/70">{d.over}</span>
                </p>
                <p className="mt-1.5 text-[14px] leading-snug text-white/75">{d.why}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        c.built && (
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
        )
      )}

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
