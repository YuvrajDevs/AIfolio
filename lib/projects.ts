// FILLER CONTENT: swap these for real project data later.
// Adding a project = adding one object here; pages are generated from it.

export type Project = {
  slug: string;
  name: string;
  tag: string; // short category line
  summary: string;
  image?: string;
  tier: "featured" | "more";
  status: string; // e.g. "In progress" – confirm real status before launch
  stack: string[];
  links: { live?: string; repo?: string };
  case: {
    problem: string;
    user: string;
    design: string;
    tech: string;
    hardProblem: string;
    outcome: string;
    built: { label: string; value: string }[];
  };
};

const TBD = "Filler. To be written from the real repo and notes.";

export const PROJECTS: Project[] = [
  {
    slug: "hivestate",
    name: "HiveState",
    tag: "AI workflow // multi-agent",
    summary:
      "Visual multi-agent orchestration platform that runs LLM pipelines as dependency-aware graphs.",
    image: "/projects/hivestate-visual.png",
    tier: "featured",
    status: "Status to confirm",
    stack: ["Next.js", "TypeScript", "Supabase", "React Flow", "LLM APIs"],
    links: {},
    case: {
      problem: TBD,
      user: TBD,
      design: TBD,
      tech: "DAG-based execution with parallel branches where dependencies allow.",
      hardProblem: TBD,
      outcome: TBD,
      built: [
        { label: "Data model", value: "Filler" },
        { label: "Architecture", value: "Filler" },
        { label: "Tests", value: "Filler" },
      ],
    },
  },
  {
    slug: "burnsight",
    name: "BurnSight",
    tag: "FinOps // spend forensics",
    summary:
      "Helps founders see where money leaks: subscriptions, duplicate tools and forgotten trials.",
    image: "/projects/burnsight.png",
    tier: "featured",
    status: "Status to confirm",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    links: {},
    case: {
      problem:
        "Startups lose cash to ghost licenses, forgotten trials and duplicate tooling, and burn dashboards only show totals.",
      user: "Early-stage founders who need to know what to cut.",
      design: TBD,
      tech: "Deterministic detection logic over normalised transactions.",
      hardProblem: TBD,
      outcome: TBD,
      built: [
        { label: "Data model", value: "Filler" },
        { label: "Architecture", value: "Filler" },
        { label: "Tests", value: "Filler" },
      ],
    },
  },
  {
    slug: "resolveos",
    name: "ResolveOS",
    tag: "Support ops // capacity engine",
    summary:
      "Automatic ticket allocation and weighting so urgent, high-value requests are never buried.",
    image: "/projects/resolveos.png",
    tier: "featured",
    status: "Status to confirm",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Queues"],
    links: {},
    case: {
      problem:
        "Chronological inboxes treat a cancellation request the same as a password reset.",
      user: "Support teams and the leads who balance their workload.",
      design: TBD,
      tech: "Priority-weighted routing with load scoring and SLA handling.",
      hardProblem: TBD,
      outcome: TBD,
      built: [
        { label: "Data model", value: "Filler" },
        { label: "Architecture", value: "Filler" },
        { label: "Tests", value: "Filler" },
      ],
    },
  },
  {
    slug: "honest-mailbox",
    image: "/projects/atlas.png", // filler image
    name: "Honest Mailbox",
    tag: "Design showcase // web to app",
    summary:
      "Private communication space for couples. Website is done; the app version is in progress.",
    tier: "more",
    status: "Website done, app in progress",
    stack: ["Design system", "Next.js", "TypeScript"],
    links: {},
    case: {
      problem: TBD,
      user: TBD,
      design: TBD,
      tech: TBD,
      hardProblem: TBD,
      outcome: TBD,
      built: [
        { label: "Data model", value: "Filler" },
        { label: "Architecture", value: "Filler" },
        { label: "Tests", value: "Filler" },
      ],
    },
  },
  {
    slug: "neighboxed",
    image: "/projects/burnsight-light.png", // filler image
    name: "Neighboxed",
    tag: "Browser game",
    summary: "Filler card for a small browser game. Shows range and creativity.",
    tier: "more",
    status: "Filler",
    stack: ["TypeScript", "Canvas"],
    links: {},
    case: {
      problem: TBD, user: TBD, design: TBD, tech: TBD, hardProblem: TBD, outcome: TBD,
      built: [{ label: "Data model", value: "Filler" }],
    },
  },
  {
    slug: "lookmax-app",
    image: "/projects/hivestate-visual.png", // filler image
    name: "Lookmax App",
    tag: "Consumer app",
    summary: "Filler card for a consumer app. Show only if finished.",
    tier: "more",
    status: "Filler",
    stack: ["Mobile", "TypeScript"],
    links: {},
    case: {
      problem: TBD, user: TBD, design: TBD, tech: TBD, hardProblem: TBD, outcome: TBD,
      built: [{ label: "Data model", value: "Filler" }],
    },
  },
  {
    slug: "widget-app",
    image: "/projects/resolveos.png", // filler image
    name: "Widget App",
    tag: "Consumer app",
    summary: "Filler card for a finished consumer app.",
    tier: "more",
    status: "Filler",
    stack: ["Mobile", "TypeScript"],
    links: {},
    case: {
      problem: TBD, user: TBD, design: TBD, tech: TBD, hardProblem: TBD, outcome: TBD,
      built: [{ label: "Data model", value: "Filler" }],
    },
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
export const featured = () => PROJECTS.filter((p) => p.tier === "featured");
export const more = () => PROJECTS.filter((p) => p.tier === "more");
