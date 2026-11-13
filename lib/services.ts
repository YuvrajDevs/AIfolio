import { AppWindow, BarChart3, PenTool, Sparkles } from "lucide-react";

/** The four skill areas shown on the home page and the Skills page. `mock` picks the sketch on the Skills page. */
export const SERVICES = [
  {
    icon: Sparkles,
    mock: "ai" as const,
    title: "AI & agents",
    short: "LLM features and multi-agent workflows that hold up in production.",
    long: "From a single smart feature to multi-step agent workflows, with the cost tracking, guardrails and human review that real use needs.",
    gets: ["OpenAI, Anthropic and Gemini APIs", "Agents with budgets, traces and human review", "Evals and guardrails, not demos only"],
  },
  {
    icon: AppWindow,
    mock: "app" as const,
    title: "Full-stack apps",
    short: "From idea to a deployed product, frontend to database.",
    long: "End-to-end product work: data model, APIs, auth, billing, background jobs, the interface and deployment.",
    gets: ["Next.js, React, TypeScript, Node.js", "Postgres, Supabase, Prisma, Firebase", "Auth, billing, jobs, security headers"],
  },
  {
    icon: BarChart3,
    mock: "data" as const,
    title: "Data & dashboards",
    short: "Pipelines, warehouses and dashboards people can trust.",
    long: "Data pipelines and reporting with accuracy that is measured, drawing on enterprise CRM Analytics and Power BI work.",
    gets: ["Python, SQL, DuckDB and dbt", "Power BI and Salesforce CRM Analytics", "Accuracy measured, not assumed"],
  },
  {
    icon: PenTool,
    mock: "web" as const,
    title: "Product design",
    short: "Interfaces that make complicated things feel simple.",
    long: "Research, flows, interface design and design systems, with every state designed and taken all the way to production code.",
    gets: ["Research, flows and UI", "Design systems that ship", "Accessible by default"],
  },
];

export const PROCESS = [
  { step: "01", title: "Discover", desc: "A short call or written brief to understand the problem, users and constraints." },
  { step: "02", title: "Design", desc: "Flows and UI direction agreed before heavy build work starts." },
  { step: "03", title: "Build", desc: "Built in small steps, with working previews you can click through." },
  { step: "04", title: "Ship", desc: "Deployed, documented and handed over, with support for the first stretch." },
];
