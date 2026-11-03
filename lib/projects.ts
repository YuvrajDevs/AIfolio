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
    /** Honest limits: what is not done or not proven */
    limits?: string | string[];
    /** Short feature chips */
    whatItDoes?: string[];
    /** Heading override for the chips */
    doesLabel?: string;
    /** One-line differentiators */
    unique?: string[];
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
    status: "Working app, live link to confirm",
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "React Flow", "Gemini"],
    links: { repo: "https://github.com/YuvrajDevs/HiveState" },
    stats: [{"value": "~550", "label": "lines of engine"}, {"value": "10", "label": "SQL migrations"}, {"value": "6", "label": "templates"}, {"value": "3", "label": "fails trip breaker"}],
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
        "Reading it found 3 real bugs, now fixed: budget skipped, Stop ignored, settings duplicated"
      ],
      "limits": [
        "Only Gemini wired in",
        "Flat per-token cost estimate",
        "No automated tests",
        "Background runs fragile on serverless"
      ],
      "built": [
        {
          "label": "Data",
          "value": "workflows, runs, logs, governance, providers"
        },
        {
          "label": "Engine",
          "value": "parallel levels, cycle check, resume, fingerprints"
        },
        {
          "label": "Resilience",
          "value": "backoff retry, fallback model, breaker"
        },
        {
          "label": "Governance",
          "value": "daily cap checked before and during runs"
        },
        {
          "label": "UI",
          "value": "React Flow canvas, traces, ⌘K palette"
        }
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
    links: { repo: "https://github.com/YuvrajDevs/project-hm" },
    stats: [{"value": "59", "label": "rules tests"}, {"value": "~150", "label": "test cases"}, {"value": "2", "label": "people per space"}, {"value": "E2EE", "label": "encrypted chat"}],
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
        "Strictly two people: invite-code pairing, no social graph",
        "Blame-free wording: \"note\", not \"complaint\"",
        "Capsules locked by database rules, not just the UI",
        "Chat E2EE, with limits stated openly",
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
        "Next.js straight to Firebase: the rules are the backend",
        "Chat: P-256 ECDH + HKDF into AES-256-GCM",
        "Videos encrypted on-device before upload",
        "2 small server routes: key reset, admin stats"
      ],
      "hardProblem": [
        "Encrypted yet recoverable: key backed up under a passphrase (PBKDF2, 600k+)",
        "Review found the reset check was UI-only; moved behind a server ticket"
      ],
      "outcome": [
        "Working web app with a written threat model",
        "Lesson: name the gaps",
        "Next: mobile app"
      ],
      "limits": [
        "No forward secrecy",
        "Metadata visible to Firebase admins",
        "Mailbox, notes, check-ins not E2EE yet"
      ],
      "built": [
        {
          "label": "Data",
          "value": "users, couples, mailbox, capsules, check-ins"
        },
        {
          "label": "Rules",
          "value": "Firestore + Storage, 59 emulator tests"
        },
        {
          "label": "Tests",
          "value": "14 files, ~150 cases"
        },
        {
          "label": "CI",
          "value": "audit, types, lint, tests, build on every PR"
        },
        {
          "label": "Hardening",
          "value": "CSP, HSTS, no framing, App Check hook"
        },
        {
          "label": "Public site",
          "value": "games, questions, guides, blog, sitemap"
        }
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
        "Security page names specifics: AES-256-GCM, Argon2id, Keystore"
      ],
      "outcome": [
        "8 core pages + 3 guides, one-command build",
        "Still open: domain, Play link, contact, Search Console"
      ],
      "limits": [
        "Website only: the app's code isn't in this repo",
        "App claims are the product's, not proven here"
      ],
      "built": [
        {
          "label": "Generator",
          "value": "build.mjs, Node, no dependencies"
        },
        {
          "label": "Pages",
          "value": "home, how it works, features, security, pricing, FAQ, privacy, 404"
        },
        {
          "label": "SEO",
          "value": "meta, sitemap, robots, link rules"
        },
        {
          "label": "Front end",
          "value": "~400 lines CSS, ~60 lines JS"
        },
        {
          "label": "Hosting",
          "value": "static output, Vercel clean URLs"
        }
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
      ],
      "limits": [
        "Data resets on restart",
        "Mood and streak are seeded samples",
        "Stylist is scripted, not a model",
        "No tests yet"
      ],
      "built": [
        {
          "label": "Screens",
          "value": "20+: routines, wardrobe, stylist, sleep, more"
        },
        {
          "label": "Architecture",
          "value": "single activity, no view-models yet"
        },
        {
          "label": "Storage",
          "value": "in-memory only"
        },
        {
          "label": "Network",
          "value": "none"
        },
        {
          "label": "Tests",
          "value": "none yet"
        }
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
