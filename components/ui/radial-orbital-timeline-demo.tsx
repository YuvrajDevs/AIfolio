"use client";

import { Fingerprint, PenTool, Monitor, Database, Brain, Rocket } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "IDENTITY",
    badge: "ACTIVE",
    category: "ENGINEER",
    content: "AI Product Engineer who designs and ships full-stack systems end to end. From pixel to database, from idea to deployed product — independently and fast.",
    icon: Fingerprint,
    pills: ["Product Engineer", "Full-Stack", "Remote-Ready", "Open to Relocation"],
  },
  {
    id: 2,
    title: "CRAFT",
    badge: "3 YRS EXP",
    category: "DESIGN",
    content: "3 years crafting production-grade interfaces. Every layout and interaction is intentional — built to communicate trust before a user reads a word.",
    icon: PenTool,
    pills: ["Figma", "Design Systems", "Framer Motion", "Prototyping"],
  },
  {
    id: 3,
    title: "FRONTEND",
    badge: "PRODUCTION",
    category: "INTERFACE",
    content: "Ships pixel-perfect, animated, responsive interfaces that work as good as they look.",
    icon: Monitor,
    pills: ["Next.js", "TypeScript", "React", "Tailwind CSS", "React Flow"],
  },
  {
    id: 4,
    title: "BACKEND",
    badge: "BATTLE-TESTED",
    category: "SYSTEMS",
    content: "Builds for correctness under failure — idempotent pipelines, circuit breakers, state machines. Not just the happy path.",
    icon: Database,
    pills: ["PostgreSQL", "Supabase", "REST APIs", "Webhooks", "Zod"],
  },
  {
    id: 5,
    title: "AI SYSTEMS",
    badge: "CUTTING EDGE",
    category: "ORCHESTRATION",
    content: "Designs multi-agent LLM pipelines with cost governance and full observability. Treats AI as an unreliable dependency to be managed.",
    icon: Brain,
    pills: ["Gemini API", "OpenAI API", "Anthropic API", "Prompt Engineering"],
  },
  {
    id: 6,
    title: "VELOCITY",
    badge: "ALWAYS SHIPPING",
    category: "EXECUTION",
    content: "MVP UI for a full financial system in 5 days. Three production-adjacent systems built solo. Founding-engineer output at junior timelines.",
    icon: Rocket,
    pills: ["Fast Delivery", "Solo Builder", "AI-Assisted Dev", "Under a Week"],
  },
];

export function RadialOrbitalTimelineDemo() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <RadialOrbitalTimeline timelineData={timelineData} />
    </div>
  );
}

export default RadialOrbitalTimelineDemo;
