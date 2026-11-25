import { AppWindow, BarChart3, Sparkles, Workflow } from "lucide-react";

/** The four skill areas shown on the home page and the Skills page. `mock` picks the tool tiles on the Skills page. */
export const SERVICES = [
  {
    icon: Workflow,
    mock: "pipelines" as const,
    title: "Data engineering",
    short: "Batch and streaming pipelines, checked end to end.",
    long: "Pipelines that take raw data to clean, modelled tables: ingestion, bronze/silver/gold layers, incremental loads, star schemas and Airflow scheduling, with checks that nothing was lost or duplicated.",
    gets: ["PySpark, Spark Streaming, Kafka", "Delta Lake, Airflow, dbt", "Star schemas and CDC"],
  },
  {
    icon: BarChart3,
    mock: "analytics" as const,
    title: "Analytics & data quality",
    short: "SQL, metrics and dashboards that match the source.",
    long: "My day job: cleaning messy Salesforce client data, writing the SQL behind the business questions, and building the dashboards teams report from.",
    gets: ["Advanced SQL", "Salesforce CRM Analytics, SOQL", "Reconciliation and data checks"],
  },
  {
    icon: Sparkles,
    mock: "ai" as const,
    title: "AI & agents",
    short: "LLM features built on OpenAI, Anthropic and Gemini.",
    long: "Product features on top of LLM APIs, tested against labelled data so I know how often they get it right.",
    gets: ["OpenAI, Anthropic and Gemini APIs", "LLM evaluation"],
  },
  {
    icon: AppWindow,
    mock: "app" as const,
    title: "Full stack & product design",
    short: "Full products, from database to interface.",
    long: "Complete web apps: data model, APIs, auth, background jobs, the interface and deployment. I design them in Figma first.",
    gets: ["Next.js, React, Node.js", "Postgres, MongoDB, Redis", "Product design in Figma"],
  },
];

export const PROCESS = [
  { step: "01", title: "Profile the data", desc: "Look at the real data first: grain, keys, gaps and duplicates." },
  { step: "02", title: "Design", desc: "Decide the layers, grains and checks, and write down why." },
  { step: "03", title: "Build & prove", desc: "Small steps, each tested and reconciled against the source." },
  { step: "04", title: "Run it", desc: "Scheduled and documented, so someone else can run it." },
];
