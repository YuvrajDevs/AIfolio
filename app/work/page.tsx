import type { Metadata } from "next";
import { Artboard, PageHero, PageShell, ProjectGrid, ProjectList } from "@/components/ui-bits";
import { featured, more } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects", description: "Data pipelines and data products first, plus AI and full-stack apps, each written up from the code." };

export default function WorkPage() {
  const top = featured();
  const rest = more();
  return (
    <PageShell>
      <PageHero label="Work index" title="Projects" intro="Data engineering first: a streaming pipeline, a batch data product (in progress) and a startup-data platform. Each write-up covers the problem, the decisions, the hard part and the results." />
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
