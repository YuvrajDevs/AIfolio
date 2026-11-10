// Project data. Every fact here comes from the project's own repo (README, docs, code).
// Adding a project = adding one object here; cards and case-study pages are generated from it.

export type Project = {
  slug: string;
  name: string;
  tag: string; // "Category // detail"
  summary: string;
  highlights: string[]; // short bullets for cards
  image?: string; // card cover
  cover?: "citable" | "blueprint"; // illustrated cover when there is no screenshot
  gallery?: { src: string; caption: string }[];
  metrics?: { value: string; label: string }[];
  /** star = headline project, building = in progress (no case study yet), more = the rest */
  tier: "star" | "building" | "more";
  status: string;
  stack: string[];
  links: { live?: string; repo?: string };
  case?: {
    problem: string;
    user: string;
    design: string;
    tech: string;
    hardProblem: string;
    outcome: string;
    built: { label: string; value: string }[];
  };
};

const GH = "https://github.com/YuvrajDevs";

export const PROJECTS: Project[] = [
  {
    slug: "hivestate",
    name: "HiveState",
    tag: "AI agents // orchestration",
    summary: "Draw a workflow of AI agents, run it, and keep cost and quality under control.",
    highlights: [
      "Dependency-aware runner executes ready agents in parallel",
      "Daily budget guard with token and cost tracking per step",
      "Human-in-the-loop pause and resume on any node",
    ],
    image: "/projects/hivestate-visual.png",
    gallery: [{ src: "/projects/hivestate-dashboard.jpg", caption: "Dashboard: workflow templates, live tasks and today's spend against the daily budget." }],
    tier: "star",
    status: "Live demo",
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "React Flow", "Gemini", "OpenAI"],
    links: { live: "https://hive-state.vercel.app", repo: `${GH}/HiveState` },
    case: {
      problem:
        "Chaining a few LLM calls is easy in a script and hard to trust in production. Steps depend on each other, costs creep up unnoticed, and some decisions need a person before the next agent acts.",
      user: "Builders and small teams who want to run multi-step agent workflows (research, reports, content, code review) without writing orchestration code for each one.",
      design:
        "A dense, developer-first interface in the spirit of Linear and Vercel: a React Flow canvas to draw agents and their connections, a dashboard of workflows and live tasks, step-by-step traces, and a daily budget card always in view. Its own design system keeps it sharp, dark and information-dense.",
      tech:
        "Next.js App Router with server actions and API routes. Supabase Postgres stores workflows, runs, step logs, providers and governance settings across 11 migrations. Agents call Gemini or OpenAI through one model layer, and provider keys never leave the server.",
      hardProblem:
        "Running a graph, not a list. The runner works out which nodes are ready from their dependencies, runs each ready level with Promise.all, and carries outputs forward, summarising long context into a short header. It can stop mid-graph at a human-review node, store the pending input, and later resume from that exact node.",
      outcome:
        "Four ready-made templates (Research Cluster, Report Factory, Content Engine, Code Auditor), per-run traces with tokens, cost and duration for every step, and a budget guard that blocks new runs once the daily limit is reached.",
      built: [
        { label: "Engine", value: "Parallel DAG runner with HITL pause/resume" },
        { label: "Data model", value: "Supabase Postgres, 11 migrations" },
        { label: "AI", value: "Gemini + OpenAI behind one interface" },
      ],
    },
  },
  {
    slug: "tally",
    name: "Tally",
    tag: "Data + AI // reconciliation",
    summary: "Payments reconciliation across ledger, processor and bank, graded against a hidden answer key.",
    highlights: [
      "0.999 precision and 0.994 recall on a deliberately hard dataset",
      "Reconciles one million ledger rows in about 7 seconds",
      "Plain-English questions become validated, read-only SQL",
    ],
    image: "/projects/tally.jpg",
    gallery: [{ src: "/projects/tally-demo.gif", caption: "Walkthrough: overview, exceptions, payouts and the scorecard." }],
    metrics: [
      { value: "0.999", label: "Error precision" },
      { value: "0.994", label: "Error recall" },
      { value: "~7s", label: "1M ledger rows" },
      { value: "68/68", label: "Unsafe requests refused" },
    ],
    tier: "star",
    status: "Release candidate",
    stack: ["Python", "DuckDB", "dbt", "FastAPI", "Next.js", "Airflow", "sqlglot"],
    links: { repo: `${GH}/dc` },
    case: {
      problem:
        "Every payment is recorded three times: in the internal ledger, at the payment processor and at the bank, and the three never agree. Payments are booked twice, arrive late, settle in batches, get split, carry fees and lose their references. Most reconciliation demos show a dashboard and ask you to trust it.",
      user: "Finance and operations teams who have to explain every gap between what was booked and what landed in the bank.",
      design:
        "Six screens (overview, exceptions, payouts, scorecard, runs, ask) built around one question: what needs a decision, and how much money is at stake. Real errors and benign look-alikes are separated everywhere, so people only review what matters. Accessibility is checked against WCAG 2.1 AA in CI.",
      tech:
        "Python with DuckDB as the warehouse and dbt for staging and marts. A synthetic world generator plants 13 defect classes and records the answer key. Ingestion has schema contracts, a quality gate and idempotent loads. FastAPI serves a Next.js dashboard; runs are resumable, with backfills, alerts, freshness checks, lineage and an Airflow DAG.",
      hardProblem:
        "The first engine scored 1.000 on the easy world and only 0.561 precision on the hard one: a mistyped reference usually names another real order, so it linked payments to the wrong order and invented duplicates. The rewrite only believes a reference match when merchant, currency and time agree, accepts strong evidence first, then falls back to attribute matching and a tightly bounded fuzzy tier.",
      outcome:
        "0.999 error precision and 0.994 recall on the hard world, no false alarms on benign look-alikes, every ledger link correct, stable across 8 seeds, and about 7 seconds for one million ledger rows. The question assistant answered 45 of 45 evaluation questions and refused 68 of 68 unsafe requests.",
      built: [
        { label: "Warehouse", value: "DuckDB + dbt staging and marts" },
        { label: "Engine", value: "5 matching tiers, 14 finding classes" },
        { label: "Safety", value: "3-layer validation for generated SQL" },
      ],
    },
  },
  {
    slug: "next-build",
    name: "Next build",
    tag: "Node.js + MongoDB // AI",
    summary: "A new product built from scratch on Node.js, Express and MongoDB, with LLM features at its core.",
    highlights: ["REST API on Node.js and Express", "MongoDB data model", "AI features through LLM APIs"],
    cover: "blueprint",
    tier: "building",
    status: "Building now",
    stack: ["Node.js", "Express", "MongoDB", "React", "LLM APIs"],
    links: {},
  },
  {
    slug: "citable",
    name: "Citable",
    tag: "AI search // SaaS",
    summary: "Audits how a website shows up for search engines and AI assistants, then proposes and applies fixes.",
    highlights: [
      "Background worker crawls sites and checks 15 search and AI crawlers",
      "Fix engine applies changes on WordPress and Shopify, re-checks, rolls back",
      "Agency workspaces, Stripe billing and a public API",
    ],
    cover: "citable",
    tier: "more",
    status: "Phases 0–4 built",
    stack: ["Next.js", "TypeScript", "Node.js worker", "Prisma", "Claude API", "Stripe"],
    links: { repo: `${GH}/every-eo` },
    case: {
      problem:
        "People increasingly ask AI assistants instead of searching, and most site owners can't tell whether those assistants can reach their site, understand it, or describe it correctly.",
      user: "Small businesses, and the agencies that look after their websites.",
      design:
        "A dashboard per site with a health score and findings ranked by urgency, each written as concrete steps for the site's own builder (WordPress, Shopify, Wix and others). Agencies get white-label branding and switch between client workspaces.",
      tech:
        "Next.js App Router with server actions, plus a separate Node worker that polls a job table, so there is no Redis to run. Prisma scopes every table to an organization, and an API-call log records each billable external call so pricing can be checked against real cost. Stripe handles plans and per-client billing; the read-only public API uses hashed keys and rate limits.",
      hardProblem:
        "Letting users point a crawler at any URL safely, and checking what AI says. Every outbound fetch goes through a guard that blocks private network addresses on each redirect hop. The accuracy monitor checks stored AI answers against facts the owner enters, and the optional Claude judge discards any verdict whose quote isn't actually on the page.",
      outcome:
        "Five phases built: audits, platform detection, scheduled checks and alerts, a fix engine with WordPress and Shopify connectors, attribution, agency workspaces and a public API. An end-to-end suite runs the whole stack against a fixture site with planted problems.",
      built: [
        { label: "Data model", value: "Prisma, organization-scoped tenancy" },
        { label: "Jobs", value: "Database queue + Node worker" },
        { label: "AI", value: "Claude judge with quote checks" },
      ],
    },
  },
  {
    slug: "sealcloak",
    name: "Sealcloak",
    tag: "Marketing site // SEO + i18n",
    summary: "Marketing site for Sealcloak, an offline photo and file vault for Android, in 11 languages.",
    highlights: [
      "Custom static build: every page in 11 languages, Arabic right-to-left included",
      "Generated sitemap, hreflang links and Open Graph images",
      "Repeatable SEO guide routine, one keyword per article",
    ],
    image: "/projects/sealcloak.jpg",
    tier: "more",
    status: "Live",
    stack: ["Node.js build", "HTML", "CSS", "JavaScript", "Vercel"],
    links: { live: "https://www.sealcloak.com", repo: `${GH}/sc` },
    case: {
      problem:
        "A privacy app that never touches the internet still needs to be found. The site has to rank for specific searches, like hiding photos on a particular phone, in many languages, and load fast.",
      user: "Android users looking for a private, offline vault, and people comparing vault apps.",
      design:
        "A dark, calm look that reuses the app's own colours, real phone screens in the hero, clear proof points (no account, no internet permission) and comparison pages against other vault apps.",
      tech:
        "No framework. A Node build script renders every page in every language with a shared header and footer, guide lists, language links, sitemap.xml and robots.txt. Vercel runs the build on each deploy, so only sources are committed.",
      hardProblem:
        "Eleven languages from one source, including right-to-left Arabic and scripts that need their own fonts (Bengali, Japanese, Korean, Vietnamese), with correct hreflang links between every version of every page.",
      outcome:
        "A multilingual site with feature and comparison pages, each with its own Open Graph image, and a publishing routine for SEO guides driven by Search Console data.",
      built: [
        { label: "Build", value: "Custom Node static site generator" },
        { label: "i18n", value: "11 languages, RTL included" },
        { label: "SEO", value: "Sitemap, hreflang, OG images" },
      ],
    },
  },
  {
    slug: "honest-mailbox",
    name: "Honest Mailbox",
    tag: "Consumer web app // privacy",
    summary: "A private space for couples: say how you feel, check in daily, play together and repair after conflict.",
    highlights: [
      "End-to-end encrypted chat (ECDH P-256 + AES-256-GCM)",
      "Firestore security rules tested in the emulator",
      "9 games and 26 question decks",
    ],
    image: "/projects/honestmailbox.jpg",
    tier: "more",
    status: "Live",
    stack: ["Next.js 16", "React 19", "TypeScript", "Firebase Auth", "Firestore", "Framer Motion"],
    links: { live: "https://www.honestmailbox.com", repo: `${GH}/project-hm` },
    case: {
      problem: "Couples need a place to say difficult things gently, and that place holds some of the most private data people have.",
      user: "Couples, including long-distance ones, who want a daily habit of checking in and a calmer way through conflict.",
      design:
        "A warm, playful identity with a mailbox mascot, a sticker set and bold editorial type, so serious conversations feel safe rather than clinical. Its own design system keeps the components consistent.",
      tech:
        "Next.js client components on Firebase Auth (Google sign-in) and Cloud Firestore, with no custom server. Security headers (CSP, HSTS and more) are set in the Next config and tested; Dependabot and npm audit run in CI.",
      hardProblem:
        "Keeping a two-person space truly private. Every document names its two members and the rules check that on every read and write; invite codes are single-use and expire. Chat is end-to-end encrypted with keys derived on each device, plus a passphrase-wrapped backup so a new device can recover. The limits (no forward secrecy, metadata visible) are written down plainly.",
      outcome:
        "Live with games, question decks, daily check-ins and encrypted chat. Unit tests cover date and streak logic, and the security rules are tested against the Firestore emulator.",
      built: [
        { label: "Auth & data", value: "Firebase Auth + Firestore rules" },
        { label: "Security", value: "E2EE chat, CSP, tested rules" },
        { label: "Tests", value: "Unit + emulator rule tests" },
      ],
    },
  },
  {
    slug: "neighboxed",
    name: "NeighBoxed",
    tag: "3D social game // web",
    summary: "A cosy 3D neighbourhood where friends and couples live as floating cubes, decorate homes and play together.",
    highlights: ["Hand-built 3D world in plain Three.js", "Accounts, saves and live play on Supabase", "Couples' homes merge into a four-room house"],
    image: "/projects/neighboxed.jpg",
    tier: "more",
    status: "Playable",
    stack: ["Vite", "React", "Three.js", "Supabase", "Tailwind"],
    links: { live: "https://nb-chi-one.vercel.app", repo: `${GH}/lb` },
    case: {
      problem: "Most apps for couples and friends are lists and chats. NeighBoxed tries a shared place instead: a home you build and visit together.",
      user: "Friends and couples who want a small, calm game to share.",
      design:
        "A cliff-top neighbourhood by a moonlit sea, with doll-house homes, a waterfall, floating islands and fog that hides the far edge. Guests can play straight away, saved on the device; signing in with Google keeps the home on an account.",
      tech: "Vite and React for the interface, plain Three.js for the world (no game engine), and Supabase for accounts, saving and live play together.",
      hardProblem:
        "Turning two homes into one: when two players become a couple, their starter homes merge into a shared four-room house with stairs, a balcony and a shared name sign, while the Boxets economy and furniture rules stay consistent.",
      outcome:
        "A playable world with a Boxets economy earned by spending time and playing together, plus rooms and furniture placement. Tests cover the economy, rooms and furniture rules.",
      built: [
        { label: "Rendering", value: "Plain Three.js scene" },
        { label: "Backend", value: "Supabase auth, saves, realtime" },
        { label: "Tests", value: "Economy and placement rules" },
      ],
    },
  },
];

/** Projects with a case-study page */
export const caseStudies = () => PROJECTS.filter((p) => p.case);
export const getProject = (slug: string) => caseStudies().find((p) => p.slug === slug);
/** Headline row: star projects plus the one being built */
export const featured = () => PROJECTS.filter((p) => p.tier === "star" || p.tier === "building");
export const more = () => PROJECTS.filter((p) => p.tier === "more");
