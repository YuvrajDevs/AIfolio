import type { Metadata } from "next";
import { Artboard, PageHero, PageShell, ProjectGrid, ProjectList } from "@/components/ui-bits";
import { featured, more } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects", description: "AI products, data systems and full-stack apps, each with a case study written from the code." };

export default function WorkPage() {
  const top = featured();
  const rest = more();
  return (
    <PageShell>
      <PageHero label="Work index" title="Projects" intro="AI products, data systems and full-stack apps I designed and built. Each one has a case study on the problem, the decisions and the hard part." />
      <Artboard name="Featured" meta={`${top.length} projects`} tone="outline" bodyClassName="!p-3 md:!p-4">
        <ProjectGrid projects={top} />
      </Artboard>
      {rest.length > 0 && (
        <Artboard name="More projects" meta={`${rest.length} projects`} color="pink" tone="outline" className="mt-10" bodyClassName="!p-3 md:!p-4">
          <ProjectList projects={rest} offset={top.length} />
        </Artboard>
      )}
    </PageShell>
  );
}
