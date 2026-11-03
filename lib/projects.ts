// FILLER CONTENT: swap these for real project data later.
// Adding a project = adding one object here; pages are generated from it.

export type Project = {
  slug: string;
  name: string;
  tag: string; // short category line
  summary: string;
  image?: string;
  /** "contain" keeps logos / portrait screenshots uncropped */
  imageFit?: "cover" | "contain";
  tier: "featured" | "more";
  status: string; // e.g. "In progress" – confirm real status before launch
  stack: string[];
  links: { live?: string; repo?: string };
  /** Key numbers shown as tiles */
  stats?: { value: string; label: string }[];
  case: {
    problem: string | string[];
    user: string | string[];
    design: string | string[];
    tech: string | string[];
    hardProblem: string | string[];
    outcome: string | string[];
    /** Short feature chips */
    whatItDoes?: string[];
    /** Heading override for the chips */
    doesLabel?: string;
    /** One-line differentiators */
    unique?: string[];
    /** Old compact rows, used only by projects without a `deep` section */
    built?: { label: string; value: string }[];
  };
  /** Technical deep-dive for recruiters and engineers */
  deep?: {
    flow: string[];
    groups: { title: string; items: string[] }[];
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
    status: "Working app, live link to confirm",
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "React Flow", "Gemini"],
    links: { repo: "https://github.com/YuvrajDevs/HiveState" },
    stats: [{"value": "~550", "label": "lines of engine"}, {"value": "10", "label": "SQL migrations"}, {"value": "6", "label": "templates"}, {"value": "3", "label": "fails trip breaker"}],
    deep: {
      "flow": [
        "React Flow canvas",
        "Next.js actions + API",
        "Run engine",
        "Gemini (primary, fallback)",
        "Supabase Postgres"
      ],
      "groups": [
        {
          "title": "Frontend",
          "items": [
            "Next.js 16 (App Router)",
            "React 19",
            "Tailwind 4",
            "React Flow (@xyflow/react)",
            "Framer Motion",
            "date-fns"
          ]
        },
        {
          "title": "Engine",
          "items": [
            "~550 lines of TypeScript",
            "DAG with cycle detection (DFS)",
            "Parallel by level (Promise.all)",
            "Multi-parent inputs as labelled JSON",
            "Pause, resume, stop"
          ]
        },
        {
          "title": "Data",
          "items": [
            "Supabase Postgres",
            "10 SQL migrations",
            "Tables for workflows, runs, step logs and settings",
            "SQL function for today's spend",
            "Realtime updates"
          ]
        },
        {
          "title": "Reliability",
          "items": [
            "Retry with exponential backoff (3x)",
            "Fallback model on rate limits and server errors",
            "Circuit breaker after 3 failures",
            "SHA-256 step fingerprints (idempotent)",
            "Human-in-the-loop pause"
          ]
        },
        {
          "title": "Governance",
          "items": [
            "Daily spend cap, checked before and during runs",
            "Optional context compression for long inputs",
            "Cost per step",
            "Primary and fallback model settings"
          ]
        },
        {
          "title": "Observability",
          "items": [
            "Log row per step",
            "Tokens, cost, duration, model used",
            "Fallback flag and error code",
            "Trace list and detail views",
            "Pause reason on every run"
          ]
        }
      ]
    },
    case: {
      "whatItDoes": [
        "Visual canvas",
        "Parallel agents",
        "Human review",
        "Pause & resume",
        "Cost tracking",
        "Spend cap",
        "Traces",
        "Model fallback",
        "Templates"
      ],
      "unique": [
        "Resume without repeating paid steps",
        "Step fingerprints: repeats reused at zero cost",
        "Budget cap + circuit breaker inside the engine",
        "Human review is a node type",
        "Every prompt, response, token and cost visible"
      ],
      "problem": [
        "Agents are built one by one and run by hand",
        "No shared place to design, run, pause, cost and inspect"
      ],
      "user": [
        "To be written"
      ],
      "design": [
        "Dense, engineer-first dark UI",
        "Colour only for state, monospace for data",
        "Grouped sidebar, ⌘K palette, 'waiting for you' list"
      ],
      "tech": [
        "DAG engine: cycle check, parallel by level",
        "Supabase Postgres: workflows, runs, logs",
        "Per-step tokens, cost, time, model",
        "Multi-parent inputs bundled as labelled JSON"
      ],
      "hardProblem": [
        "Safe to interrupt: pause, error, budget, stop",
        "Resume skips finished steps",
        "Backoff retry, fallback model, breaker after 3 fails"
      ],
      "outcome": [
        "Working orchestration app",
        "Reading it end to end found and fixed 3 engine bugs"
      ]
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
    slug: "tally",
    name: "Tally",
    tag: "Data engineering // reconciliation",
    summary:
      "Payments reconciliation across ledger, processor and bank, graded against a known answer key instead of trusted on faith.",
    image: "/projects/tally.png",
    tier: "more",
    status: "Release candidate, synthetic data only",
    stack: ["Python", "DuckDB", "dbt", "Airflow", "FastAPI", "Next.js 16", "Tailwind 4", "sqlglot"],
    links: { repo: "https://github.com/YuvrajDevs/dc" },
    stats: [
      { value: "0.999", label: "error precision (hard world)" },
      { value: "0.994", label: "error recall" },
      { value: "~7s", label: "1M ledger rows" },
      { value: "68/68", label: "unsafe requests refused" },
    ],
    deep: {
      flow: [
        "Seeded synthetic world + answer key",
        "Gated ingest (contracts, quarantine)",
        "dbt staging and marts (DuckDB)",
        "Five-tier matching engine",
        "Grader vs answer key",
        "API + dashboard + validated Q&A",
      ],
      groups: [
        {
          title: "Data",
          items: [
            "13 injected defect classes",
            "Late, split, duplicated and mistyped records",
            "Multi-currency with FX",
            "Schema contracts and row quarantine",
            "Idempotent, order-independent loads",
          ],
        },
        {
          title: "Engine",
          items: [
            "Five matching tiers, strongest evidence first",
            "14 finding classes, plain-language reasons",
            "Benign look-alikes explained, not alarmed",
            "Exception queue with audit trail",
            "Human decisions survive re-runs",
          ],
        },
        {
          title: "Measurement",
          items: [
            "Per-class precision and recall",
            "Link accuracy and benign false alarms",
            "Floors frozen from 8 seeds per profile",
            "Regression gate in CI",
            "First engine scored 0.561 precision; fixed to 0.999",
          ],
        },
        {
          title: "Operations",
          items: [
            "Run ledger, retries with backoff, alerts",
            "Backfill equals a clean run (hash-identical)",
            "Killed runs resume without duplicates",
            "Freshness checks and dbt lineage",
            "Ran for real under Airflow 3",
          ],
        },
        {
          title: "Product",
          items: [
            "Next.js dashboard, six screens",
            "CSV export, keyboard use, mobile layout",
            "Automated browser acceptance tests (14)",
            "axe-core WCAG 2.1 AA checks on every page",
          ],
        },
        {
          title: "Question assistant",
          items: [
            "Plain English to read-only SQL, SQL always shown",
            "Syntax-tree, query-plan and engine-lock checks",
            "45-question evaluation, 45 correct",
            "68 red-team cases, all refused",
          ],
        },
      ],
    },
    case: {
      whatItDoes: [
        "Three-way reconciliation",
        "Exception queue",
        "Backfills",
        "Scorecard",
        "Ask in plain English",
        "Audit trail",
      ],
      unique: [
        "Graded against a known answer key",
        "A harder world exposed a weak first engine, then it was fixed",
        "Floors are frozen and enforced in CI",
        "Every answer shows the SQL that produced it",
      ],
      problem: [
        "Ledger, processor and bank never agree",
        "Most demos ask you to trust a dashboard",
      ],
      user: ["Finance operations analysts and the data engineers who run the pipeline"],
      design: [
        "Calm, minimal cards, soft green palette, Poppins",
        "Plain-language reasons on every exception",
        "Empty, loading and error states on every screen",
      ],
      tech: [
        "DuckDB warehouse, dbt models, tiered SQL matching",
        "Input-hash step skipping and a run ledger",
        "FastAPI on one locked-down connection",
      ],
      hardProblem: [
        "Telling real errors from look-alikes (typo'd references that point at other real payments)",
        "Making a backfill provably equal to a clean run",
      ],
      outcome: [
        "Finished through acceptance testing, with the benchmark and its limits written down",
        "All data synthetic; manual UAT still to run",
      ],
    },
  },
  {
    slug: "honest-mailbox",
    name: "Honest Mailbox",
    tag: "Web app // couples",
    summary:
      "A private two-person space for couples: say how you feel, say what you need, check in daily and repair after conflict.",
    image: "/projects/honest-mailbox-mascot.webp",
    imageFit: "contain",
    tier: "more",
    status: "Web app built, mobile app in progress",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind 4", "Firebase", "Web Crypto"],
    links: {},
    stats: [{"value": "59", "label": "rules tests"}, {"value": "~150", "label": "test cases"}, {"value": "2", "label": "people per space"}, {"value": "E2EE", "label": "encrypted chat"}],
    deep: {
      "flow": [
        "Next.js client",
        "Firebase Auth",
        "Firestore + access rules",
        "Storage"
      ],
      "groups": [
        {
          "title": "Frontend",
          "items": [
            "Next.js 16 (App Router)",
            "React 19",
            "TypeScript",
            "Tailwind 4",
            "Framer Motion",
            "Light and dark theme applied before first paint"
          ]
        },
        {
          "title": "Data & backend",
          "items": [
            "Firebase Auth (Google sign-in)",
            "Cloud Firestore",
            "Firebase Storage",
            "Access rules per couple"
          ]
        },
        {
          "title": "Privacy",
          "items": [
            "End-to-end encrypted chat (Web Crypto)",
            "Notifications never carry message text",
            "Private notes stay private to their author"
          ]
        },
        {
          "title": "Quality & safety",
          "items": [
            "Access rules tested in an emulator",
            "Security review against a standard checklist",
            "Dependency audits in CI",
            "Hardened response headers"
          ]
        },
        {
          "title": "Testing",
          "items": [
            "59 access-rule tests",
            "13 more test files",
            "Dates, streaks, chat encryption, games",
            "SEO and headers",
            "~150 cases in total"
          ]
        },
        {
          "title": "DevOps",
          "items": [
            "GitHub Actions on every PR",
            "Audit, types, lint, tests, build",
            "Dependabot weekly",
            "Local emulators for Auth and Firestore",
            "Vercel hosting"
          ]
        }
      ]
    },
    case: {
      "whatItDoes": [
        "Mailbox notes",
        "Daily check-ins",
        "Streaks",
        "Time capsules",
        "White flag",
        "Encrypted chat",
        "Voice & video",
        "Safe space",
        "Reactions",
        "Special days",
        "Games",
        "Question decks",
        "Repair guides"
      ],
      "unique": [
        "Strictly two people: paired one to one, no social graph",
        "Blame-free wording: \"note\", not \"complaint\"",
        "Time capsules stay sealed until the date you choose",
        "End-to-end encrypted chat",
        "Rules tested in CI: 59 emulator cases",
        "Notifications never show message content"
      ],
      "problem": [
        "Hard talks happen when people are least able",
        "Chat apps reward speed, not care"
      ],
      "user": [
        "Couples, paired one to one",
        "No feed, no friends list, no public profile"
      ],
      "design": [
        "Tone first: no blame words, clear \"who can see this\"",
        "One task per screen, mobile first",
        "Feeling sets the card colour",
        "Light by default, dark switch"
      ],
      "tech": [
        "Next.js client with Firebase Auth, Firestore and Storage",
        "End-to-end encrypted chat using Web Crypto",
      ],
      "hardProblem": [
        "Encrypted chat that can still be recovered on a new device"
      ],
      "outcome": [
        "Working web app, security-reviewed",
        "Next: mobile app"
      ]
    },
  },
  {
    slug: "sealcloak",
    name: "Sealcloak",
    tag: "Marketing site // Android vault app",
    summary:
      "Marketing and SEO site for an offline photo and file vault for Android, built with a small hand-written static site generator and no framework.",
    image: "/projects/sealcloak-home.jpg",
    imageFit: "contain",
    tier: "more",
    status: "Site built, launch checklist open",
    stack: ["HTML", "CSS", "Vanilla JS", "Node", "Static hosting"],
    links: { repo: "https://github.com/YuvrajDevs/sc" },
    stats: [{"value": "~180", "label": "lines of build script"}, {"value": "0", "label": "dependencies"}, {"value": "8", "label": "core pages"}, {"value": "3", "label": "SEO guides"}],
    deep: {
      "flow": [
        "content/*.html",
        "build.mjs (Node)",
        "Static HTML + sitemap",
        "Static host"
      ],
      "groups": [
        {
          "title": "Build",
          "items": [
            "build.mjs, ~180 lines of Node",
            "Zero dependencies",
            "Wraps content in header and footer",
            "Generates guide index, sitemap.xml, robots.txt",
            "Local preview server (serve.mjs)"
          ]
        },
        {
          "title": "Front end",
          "items": [
            "Vanilla JS, ~60 lines",
            "One CSS file, ~400 lines",
            "Scroll reveal",
            "Responsive layout",
            "App-coloured theme"
          ]
        },
        {
          "title": "SEO",
          "items": [
            "Per-page title and description",
            "One keyword per guide",
            "Title under 60, description under 155",
            "Internal link rules",
            "Weekly Search Console routine"
          ]
        },
        {
          "title": "Content",
          "items": [
            "8 core pages",
            "3 SEO guides",
            "Pricing and FAQ copy",
            "Security page in plain language"
          ]
        },
        {
          "title": "Ops",
          "items": [
            "Static output in repo root",
            "Vercel clean URLs",
            "Launch checklist in README",
            "Works on any static host"
          ]
        }
      ]
    },
    case: {
      "doesLabel": "The app, per the site",
      "whatItDoes": [
        "Pattern lock",
        "Encrypted vault",
        "Photos & videos",
        "Docs & audio",
        "Fingerprint",
        "Intruder photos",
        "Decoy vault",
        "App disguise",
        "Recovery phrase",
        "Encrypted backup",
        "Passphrase sharing"
      ],
      "unique": [
        "Claim: no account, no cloud, no internet permission",
        "Site built by ~180 lines of Node, no framework",
        "Edit one content file, header, footer and sitemap follow",
        "SEO as a weekly routine, not a launch task",
        "Claims written as checkable specifics"
      ],
      "problem": [
        "Privacy claims are hard to convey in a store listing",
        "People search practical questions (\"hide photos on Android\")"
      ],
      "user": [
        "Android users keeping photos and files private",
        "Shoppers comparing vault apps"
      ],
      "design": [
        "Minimal pages in the app's own colours",
        "Phone-frame screenshots in the hero",
        "Order answers objections: what, how, security, pricing",
        "Pricing: free first, nothing deleted if you stop paying"
      ],
      "tech": [
        "Content fragments + build.mjs into static HTML",
        "Generates guide index, sitemap, robots",
        "One CSS file, one small script, no libraries",
        "Guide format: title under 60, description under 155"
      ],
      "hardProblem": [
        "\"Encrypted\" and \"no internet\" are claims every vault makes",
        "Security page spells out the protections in plain terms"
      ],
      "outcome": [
        "8 core pages + 3 guides, one-command build",
        "Still open: domain, Play link, contact, Search Console"
      ]
    },
  },
  {
    slug: "glowup",
    name: "GlowUp",
    tag: "Android app // self-improvement",
    summary:
      "A native Android prototype that brings routines, mood check-ins, wardrobe and styling help, sleep and confidence practice into one app.",
    tier: "more",
    status: "Prototype v0.1.0",
    stack: ["Kotlin", "Jetpack Compose", "Material 3", "Navigation Compose"],
    links: { repo: "https://github.com/YuvrajDevs/lm" },
    stats: [{"value": "36", "label": "Kotlin files"}, {"value": "~5.3k", "label": "lines of code"}, {"value": "20+", "label": "screens"}, {"value": "0", "label": "permissions"}],
    deep: {
      "flow": [
        "MainActivity",
        "NavHost (20+ routes)",
        "Compose screens",
        "State objects"
      ],
      "groups": [
        {
          "title": "Platform",
          "items": [
            "Kotlin",
            "Jetpack Compose (BOM 2025.09)",
            "Material 3",
            "Navigation Compose 2.9.5",
            "Android 8.0+ (API 26), target 36"
          ]
        },
        {
          "title": "Architecture",
          "items": [
            "Single activity",
            "Navigation graph with 20+ routes",
            "Plain Kotlin state objects",
            "Compose snapshot state",
            "Shared header, nav bar, streak chip, dialog"
          ]
        },
        {
          "title": "UI system",
          "items": [
            "Colour tokens per area, each with a tint",
            "Custom typography",
            "Custom drawable icons",
            "Light card-based layout"
          ]
        },
        {
          "title": "Code",
          "items": [
            "36 Kotlin files",
            "~5.3k lines",
            "Only AndroidX dependencies",
            "No network permission"
          ]
        }
      ]
    },
    case: {
      "whatItDoes": [
        "Routines",
        "Mood check-ins",
        "Streaks",
        "Wardrobe",
        "Styling",
        "Grooming",
        "AI stylist (scripted)",
        "Morning flow",
        "Sleep",
        "Confidence",
        "Communication",
        "Speaking practice",
        "To-dos",
        "Quotes & notes"
      ],
      "unique": [
        "Looks and inner routine in one app",
        "Stylist declines face ratings and scores",
        "Each area has its own colour and tint",
        "Only AndroidX, no network permission"
      ],
      "problem": [
        "To be written"
      ],
      "user": [
        "To be written"
      ],
      "design": [
        "Light Material 3 cards",
        "Ink + warm greys, one accent per area",
        "Bottom nav, home streak chip",
        "Custom icons"
      ],
      "tech": [
        "Single activity, Compose, Navigation",
        "20+ routes",
        "State in Kotlin objects (Compose snapshot state)",
        "Android 8.0+, targets API 36"
      ],
      "hardProblem": [
        "To be written"
      ],
      "outcome": [
        "Navigable prototype, full UI in place",
        "Next: save data, real data, a real stylist model"
      ]
    },
  },
  {
    slug: "neighboxed",
    name: "Neighboxed",
    tag: "Browser game",
    summary: "Filler card for a small browser game. Shows range and creativity.",
    image: "/projects/burnsight-light.png", // filler image
    tier: "more",
    status: "Filler",
    stack: ["TypeScript", "Canvas"],
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
