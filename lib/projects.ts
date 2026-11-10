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
    slug: "strata",
    name: "Strata",
    tag: "Startup intelligence // Node + MongoDB",
    summary: "Tracks startups by sector from public data, classifies them with Gemini under human review, and writes sector briefs where every claim cites a source.",
    highlights: [
      "Funding rounds taken from SEC Form D filings, never guessed",
      "Gemini classifier: 87.8% on hand-labelled Legal AI companies, low-confidence labels go to review",
      "Kafka ingestion with idempotent upserts into MongoDB",
    ],
    image: "/projects/strata-dashboard.jpg",
    gallery: [
      { src: "/projects/strata-dashboard.jpg", caption: "Dashboard: click a quarter to see the rounds that make it up, with each one's share." },
      { src: "/projects/strata-landscape.jpg", caption: "Legal AI landscape: KPIs and a market map of companies by subsector." },
      { src: "/projects/strata-review.jpg", caption: "Review queue: low-confidence labels, triaged from the keyboard." },
      { src: "/projects/strata-brief.jpg", caption: "Analyst brief: every claim footnoted to a stored source." },
      { src: "/projects/strata-company.jpg", caption: "Company profile: Form D funding timeline, sources and classification history." },
    ],
    metrics: [
      { value: "465", label: "Companies tracked" },
      { value: "136", label: "Form D filings verified" },
      { value: "87.8%", label: "Gemini accuracy (41 labelled)" },
      { value: "140", label: "Automated tests" },
    ],
    tier: "star",
    status: "Live demo",
    stack: ["Node.js", "Express", "MongoDB", "Next.js", "Kafka", "Redis", "BullMQ", "Gemini"],
    links: { live: "https://strata-weld-sigma.vercel.app", repo: `${GH}/AN` },
    case: {
      problem:
        "Startup databases are expensive, and their numbers are hard to check. An analyst mapping a sector needs to know which companies belong in it, what they raised and where each number came from.",
      user: "Market research analysts and investors who map a sector, track new rounds and write landscape briefs.",
      design:
        "An analyst's workbench in a warm, compact pastel design system: a dashboard with computed insights, a market map per sector, company profiles with a funding timeline, URL-shareable search and filters, a ⌘K palette, keyboard-driven review, watchlists and CSV export. Click any quarter to drill into its rounds. Responsive, with automated accessibility scans.",
      tech:
        "Express 5 and TypeScript on MongoDB, with analytics written as aggregation pipelines and cached in Redis. Connectors (YC directory, SEC EDGAR, RSS, GitHub) publish to Redpanda (Kafka); a processor upserts on natural keys, and BullMQ runs classification, alerts and briefs. OpenAI, Anthropic and Gemini sit behind one provider interface; the live demo runs Gemini with a model fallback chain, and drops to an offline classifier (labelled as such) when the free quota runs out. Next.js proxies the API so sessions and keys stay server-side. Hosted free: Vercel, Render and MongoDB Atlas.",
      hardProblem:
        "Linking SEC filings to the right company. A Form D is filed by a legal entity, not a brand, so the matcher only accepts a filing when the names match, the filer is not a fund vehicle and the dates are plausible. It kept 136 of 234 candidates, each rejection with a written reason, because a wrong funding round is worse than a missing one.",
      outcome:
        "Live with one-click demo sign-in: 465 real YC companies across Legal AI, Climate Tech and Payments, 136 verified Form D filings, and Gemini briefs that drop any claim whose numbers are not in the cited source. Gemini scored 87.8% on the first 41 hand-labelled Legal AI companies, against 75.5% for the keyword baseline across all 102; the held-out set is still to run. 103 API tests and 37 Playwright tests pass locally and against the live site, plus a scripted recruiter walkthrough of every write path.",
      built: [
        { label: "Data", value: "MongoDB aggregations, Redis cache" },
        { label: "Pipeline", value: "Kafka facts + BullMQ jobs, replay-safe" },
        { label: "AI", value: "Gemini live, review queue, cited briefs" },
      ],
    },
  },
  {
    slug: "trueup",
    name: "TrueUp",
    tag: "Data + AI // fraud & payments",
    summary: "Finds where card payments leak money: fraud, outages, dispute spikes and fee overcharges, with every detector graded.",
    highlights: [
      "96.6% of planted attacks caught, zero false alarms over 200 runs",
      "Live lab: plant a card-testing attack and watch it get caught",
      "Reconciliation at 0.999 precision; 1M ledger rows in about 7 seconds",
    ],
    image: "/projects/trueup.jpg",
    gallery: [
      { src: "/projects/trueup-lab.jpg", caption: "The lab: plant incidents with sliders, then see what the detectors found, missed or flagged by mistake." },
      { src: "/projects/trueup-landing.jpg", caption: "Landing page: what it catches, and why the data is synthetic." },
    ],
    metrics: [
      { value: "96.6%", label: "Detectable attacks found" },
      { value: "0", label: "False alarms in 200 runs" },
      { value: "0.999", label: "Reconciliation precision" },
      { value: "~7s", label: "1M ledger rows" },
    ],
    tier: "star",
    status: "Live",
    stack: ["Python", "SQL", "DuckDB", "dbt", "FastAPI", "Next.js", "Airflow"],
    links: { live: "https://trueup-beta.vercel.app", repo: `${GH}/dc` },
    case: {
      problem:
        "Card payments leak money quietly: fraudsters test stolen cards with tiny charges, a bank stops answering for hours, one merchant's chargebacks creep up, interchange is charged above the rate card, and the ledger, processor and bank never fully agree. Most analytics demos show a dashboard and ask you to trust it.",
      user: "Payment operations and risk analysts who have to catch problems early and explain every dollar that went missing.",
      design:
        "A landing page that leads with the lab, then focused screens for approvals, disputes, fees, reconciliation exceptions and the scorecard, each built around one question: what needs a decision, and how much money is at stake. The lab turns the evaluation into something anyone can try: sliders to plant incidents, and a verdict for each detector.",
      tech:
        "Python with DuckDB as the warehouse and dbt for staging and marts. A generator builds card authorizations, clearing, refunds and disputes with ISO 8583 response codes and Visa and Mastercard reason codes, plants incidents and records the answer key. Real card data is private, and with real data nobody knows the right answer, so a hidden answer key is the only honest way to measure a detector. FastAPI serves a Next.js dashboard; ingestion has schema contracts, a quality gate and idempotent loads.",
      hardProblem:
        "Detectors that are sensitive without crying wolf. The first versions missed short outages and small overcharges and flagged ordinary travel merchants as dispute risks. The fixes: treat any cluster of issuer-unavailable answers as a signal, rebuild the rate card per transaction so any overcharge is exact, and compare each merchant to its category benchmark with an exact Poisson test. Incidents that left no trace in the data are graded too faint, not counted as wins. On reconciliation, the first engine fell to 0.561 precision on typo'd references; the rewrite only trusts a reference when merchant, currency and time agree.",
      outcome:
        "Over 200 runs with random settings: 96.6% of detectable incidents found with zero false alarms (card testing 100%, overcharges 100%, dispute spikes 94%, outages 92%), held in CI. Reconciliation reaches 0.999 error precision and 0.994 recall on the hard world, stable across 8 seeds, at about 7 seconds per million ledger rows.",
      built: [
        { label: "Warehouse", value: "DuckDB + dbt staging and marts" },
        { label: "Detectors", value: "Fraud, outage, dispute and fee rules in SQL" },
        { label: "Lab", value: "Plant attacks live, graded in seconds" },
      ],
    },
  },
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
];

/** Projects with a case-study page */
export const caseStudies = () => PROJECTS.filter((p) => p.case);
export const getProject = (slug: string) => caseStudies().find((p) => p.slug === slug);
/** Headline row: star projects plus the one being built */
export const featured = () => PROJECTS.filter((p) => p.tier === "star" || p.tier === "building");
export const more = () => PROJECTS.filter((p) => p.tier === "more");
