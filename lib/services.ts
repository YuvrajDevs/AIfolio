import { AppWindow, BarChart3, Sparkles, Workflow } from "lucide-react";

/** The four skill areas shown on the home page and the Skills page. `mock` picks the tool tiles on the Skills page. */
export const SERVICES = [
  {
    icon: Workflow,
    mock: "pipelines" as const,
    title: "Data engineering",
    short: "Batch and streaming pipelines with data you can prove is right.",
    long: "Pipelines from raw source to trusted tables: ingestion, lakehouse layers, incremental loads, dimensional models, orchestration and the checks that prove nothing was lost or duplicated.",
    gets: ["PySpark, Spark Streaming, Kafka", "Delta Lake, Airflow, dbt", "Star schemas and CDC"],
  },
  {
    icon: BarChart3,
    mock: "analytics" as const,
    title: "Analytics & data quality",
    short: "SQL, metrics and dashboards that reconcile with the source.",
    long: "Turning messy enterprise data into numbers people sign off on: SQL that answers the business question, metrics defined once, quality checks and reconciliation, and dashboards built from day-to-day Salesforce analytics work.",
    gets: ["Advanced SQL and tuning", "Power BI, CRM Analytics", "Reconciliation and checks"],
  },
  {
    icon: Sparkles,
    mock: "ai" as const,
    title: "AI & agents",
    short: "AI-ready data and LLM features that hold up in production.",
    long: "Preparing data for AI (clean, scrubbed, documented, retrievable) and building on it: retrieval with citations, multi-step agent workflows, cost tracking, guardrails and evaluation.",
    gets: ["RAG and vector search", "OpenAI, Anthropic, Gemini", "Evals and guardrails"],
  },
  {
    icon: AppWindow,
    mock: "app" as const,
    title: "Full stack & product design",
    short: "From idea to a deployed product, interface to database.",
    long: "End-to-end product work when the data needs a home: data model, APIs, auth, background jobs, an interface designed with care, and deployment.",
    gets: ["Next.js, React, Node.js", "Postgres, MongoDB, Redis", "Product design in Figma"],
  },
];

export const PROCESS = [
  { step: "01", title: "Profile the data", desc: "Look at the real data before designing anything: grain, keys, gaps, duplicates and what the business actually asks." },
  { step: "02", title: "Design", desc: "Layers, grains and contracts agreed up front, with every decision written down and why." },
  { step: "03", title: "Build & prove", desc: "Built in small steps, each one tested and reconciled against the source, failures logged with their fixes." },
  { step: "04", title: "Run it", desc: "Scheduled, monitored and documented, so the next engineer can trust it and change it." },
];
