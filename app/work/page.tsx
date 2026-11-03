import type { Metadata } from "next";
import { PageShell, PageTitle, ProjectGrid } from "@/components/ui-bits";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects", description: "Selected AI-powered products with case studies." };

export default function WorkPage() {
  return (
    <PageShell className="max-w-[1400px] md:px-12">
      <PageTitle label="my stuff ↓" title="Projects" intro="Products where design is the headline and the engineering is the proof. Each has a short case study with how it's built." />
      <ProjectGrid projects={PROJECTS} />
    </PageShell>
  );
}
