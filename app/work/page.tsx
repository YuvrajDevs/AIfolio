import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell, PageTitle, ProjectCard, SectionHeading } from "@/components/ui-bits";
import { featured, more } from "@/lib/projects";

export const metadata: Metadata = { title: "Work", description: "Selected AI-powered products with case studies." };

export default function WorkPage() {
  return (
    <PageShell>
      <PageTitle label="my stuff ↓" title="Featured works" intro="Products where design is the headline and the engineering is the proof. Each has a short case study with how it's built." />
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
        {featured().map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
      </div>

      <div className="mt-24">
        <SectionHeading label="and a few smaller ones" title="More projects" />
        <ul className="neo bg-white">
          {more().map((p) => (
            <li key={p.slug} className="border-b-2 border-ink last:border-b-0">
              <Link href={`/work/${p.slug}`} className="group flex items-center justify-between gap-6 p-5 transition-colors hover:bg-fyellow">
                <div>
                  <h3 className="font-pixel text-2xl font-bold uppercase">{p.name}</h3>
                  <p className="text-sm text-neutral-600">{p.summary}</p>
                </div>
                <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
