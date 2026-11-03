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
    decisions: { pick: string; over: string; why: string }[];
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
            "workflows, runs, logs, governance_settings, ai_providers",
            "SQL function for today's spend",
            "Realtime on runs and logs"
          ]
        },
        {
          "title": "Reliability",
          "items": [
            "Retry with exponential backoff (3x)",
            "Fallback model on 429, 5xx, quota",
            "Circuit breaker after 3 failures",
            "SHA-256 step fingerprints (idempotent)",
            "Human-in-the-loop pause"
          ]
        },
        {
          "title": "Governance",
          "items": [
            "Daily spend cap, checked before and during runs",
            "Optional context compression (inputs over 500 chars)",
            "Cost per step in INR",
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
      ],
      "decisions": [
        {
          "pick": "Fingerprint per step",
          "over": "re-running everything",
          "why": "safe resume with no double spend"
        },
        {
          "pick": "Human review as a node",
          "over": "a bolt-on approval step",
          "why": "reviewer feedback flows to downstream agents"
        },
        {
          "pick": "One model hub",
          "over": "calls scattered in nodes",
          "why": "single place for routing, retries and fallback"
        },
        {
          "pick": "Level-by-level execution",
          "over": "fully sequential runs",
          "why": "independent branches run in parallel"
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
        "Reading it found 3 real bugs, now fixed: budget skipped, Stop ignored, settings duplicated"
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
    deep: {
      "flow": [
        "Next.js client",
        "Firebase Auth",
        "Firestore + rules",
        "Storage (ciphertext only)",
        "Admin SDK routes"
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
            "No custom backend",
            "2 server routes via Admin SDK"
          ]
        },
        {
          "title": "Crypto",
          "items": [
            "P-256 ECDH",
            "HKDF",
            "AES-256-GCM",
            "PBKDF2 (600k+) passphrase backup",
            "Keys held in IndexedDB",
            "Videos encrypted on-device"
          ]
        },
        {
          "title": "Security",
          "items": [
            "Membership checked on every read and write",
            "One-use invite codes: 8 chars, 3 days, not listable",
            "Pairing in one transaction",
            "CSP, HSTS, nosniff, no framing",
            "App Check hook",
            "Size and type caps, no sender impersonation"
          ]
        },
        {
          "title": "Testing",
          "items": [
            "59 Firestore-rules tests in the emulator",
            "13 more test files",
            "Dates and streaks, E2EE, reset codes",
            "Security headers, SEO, games",
            "~150 cases in total"
          ]
        },
        {
          "title": "DevOps",
          "items": [
            "GitHub Actions on every PR",
            "npm audit, tsc, lint, tests, build",
            "Dependabot weekly",
            "Lockfile installs",
            "Auth and Firestore emulators with test sign-in",
            "Vercel hosting"
          ]
        }
      ],
      "decisions": [
        {
          "pick": "PBKDF2",
          "over": "Argon2",
          "why": "WebAssembly would need a weaker CSP"
        },
        {
          "pick": "P-256",
          "over": "X25519",
          "why": "native WebCrypto support, no library"
        },
        {
          "pick": "Rules as the backend",
          "over": "a custom API",
          "why": "no server to run, rules tested like code"
        },
        {
          "pick": "Server-side reset ticket",
          "over": "UI-only email check",
          "why": "found bypassable in an ASVS review"
        },
        {
          "pick": "One shared chat key",
          "over": "a ratchet protocol",
          "why": "scoped to a two-person chat, no extra dependency"
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
            "Security page naming AES-256-GCM, Argon2id, Android Keystore (as stated)"
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
      ],
      "decisions": [
        {
          "pick": "No framework",
          "over": "Next.js or similar",
          "why": "nothing to upgrade, any host works"
        },
        {
          "pick": "Content separate from output",
          "over": "hand-edited HTML",
          "why": "header, footer and sitemap stay in sync"
        },
        {
          "pick": "One keyword per guide",
          "over": "broad articles",
          "why": "clear intent, easier to improve"
        },
        {
          "pick": "Named algorithms",
          "over": "vague \"military-grade\" copy",
          "why": "claims a reader can check"
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
        "Security page names specifics: AES-256-GCM, Argon2id, Keystore"
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
      ],
      "decisions": [
        {
          "pick": "Compose",
          "over": "XML views",
          "why": "declarative UI, less boilerplate"
        },
        {
          "pick": "AndroidX only",
          "over": "third-party libraries",
          "why": "small, dependency-free build"
        },
        {
          "pick": "Bounded stylist",
          "over": "open-ended AI chat",
          "why": "outfit, fit and colour help only, no face ratings"
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
