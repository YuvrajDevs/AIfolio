import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { Artboard, ButtonLink, CoverArt, PASTELS, PageShell, SelectionFrame, Tag, delay, tagHead } from "@/components/ui-bits";
import { ScreenCarousel } from "@/components/ScreenCarousel";
import { caseStudies, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return caseStudies().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return p ? { title: p.name, description: p.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.case) notFound();

  const list = caseStudies();
  const i = list.findIndex((p) => p.slug === slug);
  const next = list[(i + 1) % list.length];
  const c = project.case;
  const blocks = [
    { title: "Problem", body: c.problem },
    { title: "Who it's for", body: c.user },
    { title: "Design decisions", body: c.design },
    { title: "Technical decisions", body: c.tech },
    { title: "The hard problem", body: c.hardProblem },
    { title: "Result", body: c.outcome },
  ];

  return (
    <PageShell>
      <Link href="/work" className="group mb-8 inline-flex items-center gap-1.5 text-sm text-white/75 hover:text-white">
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" /> All projects
      </Link>

      <header className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="min-w-0 max-w-[720px]">
          <p className="reveal eyebrow mb-6 text-white/75">{project.tag.replace("//", "·")}</p>
          <div className="reveal" style={delay(60)}>
            <SelectionFrame>
              <h1 className="text-[40px] font-black uppercase leading-none tracking-tight md:text-7xl">{project.name}</h1>
            </SelectionFrame>
          </div>
          <p className="reveal mt-8 text-[15px] leading-relaxed text-white/85 md:text-lg" style={delay(120)}>{project.summary}</p>
        </div>
        {(project.links.live || project.links.repo) && (
          <div className="reveal flex shrink-0 flex-wrap items-center gap-2" style={delay(160)}>
            {project.links.live && <ButtonLink href={project.links.live} external>Visit live <ArrowUpRight className="h-4 w-4" /></ButtonLink>}
            {project.links.repo && <ButtonLink href={project.links.repo} variant="ghost" external><IconBrandGithub className="h-4 w-4" stroke={1.75} /> Code</ButtonLink>}
          </div>
        )}
      </header>

      {/* hero visual */}
      <div className={`reveal overflow-hidden rounded-[18px] px-4 pt-4 md:px-12 md:pt-12 ${PASTELS[i % PASTELS.length]}`} style={delay(220)}>
        <div className="aspect-[16/9] w-full overflow-hidden rounded-t-xl bg-white shadow-[0_-8px_30px_-10px_rgba(0,0,0,.35)]">
          <CoverArt project={project} priority />
        </div>
      </div>

      {project.metrics && (
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {project.metrics.map((m) => (
            <li key={m.label} className="ui-panel p-4 md:p-5">
              <p className="text-3xl font-extrabold tracking-tight text-lime tabular-nums md:text-4xl">{m.value}</p>
              <p className="mt-1 text-sm text-white/65">{m.label}</p>
            </li>
          ))}
        </ul>
      )}

      <Artboard name="Case study" meta={tagHead(project.tag)} className="mt-10">
        <div className="mb-6 flex flex-wrap gap-2">
          {project.stack.map((s) => <Tag key={s} className="bg-white">{s}</Tag>)}
        </div>
        <dl className="divide-y divide-line">
          {blocks.map((b) => (
            <div key={b.title} className="grid gap-1.5 py-5 md:grid-cols-[220px_1fr] md:gap-8">
              <dt className="font-semibold tracking-tight">{b.title}</dt>
              <dd className="max-w-[65ch] text-[15px] leading-relaxed text-ink/70">{b.body}</dd>
            </div>
          ))}
        </dl>
      </Artboard>

      {project.gallery && (
        <Artboard name="Screens" color="sky" className="mt-10" bodyClassName="!p-2 md:!p-3">
          <ScreenCarousel shots={project.gallery} />
        </Artboard>
      )}

      <Artboard name="How it's built" className="mt-10" bodyClassName="!p-2">
        <ul className="grid gap-2 sm:grid-cols-3">
          {c.built.map((b, n) => (
            <li key={b.label} className={`rounded-xl p-5 ${PASTELS[(n + 1) % PASTELS.length]}`}>
              <p className="eyebrow text-ink/60">{b.label}</p>
              <p className="mt-2 font-semibold">{b.value}</p>
            </li>
          ))}
        </ul>
      </Artboard>

      <Link href={`/work/${next.slug}`} className="group mt-10 flex items-center justify-between gap-4 rounded-[18px] bg-panel p-6 shadow-[0_24px_50px_-24px_rgba(0,8,50,.7)] md:p-8">
        <div>
          <p className="eyebrow mb-2 text-white/50">Next project</p>
          <p className="text-3xl font-extrabold uppercase leading-none tracking-tight md:text-5xl">{next.name}</p>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lime text-ink transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </Link>
    </PageShell>
  );
}
