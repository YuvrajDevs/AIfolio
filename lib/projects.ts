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
  case: {
    problem: string;
    user: string;
    design: string;
    tech: string;
    hardProblem: string;
    outcome: string;
    /** Honest limits: what is not done or not proven */
    limits?: string;
    /** Plain-language list of what the product does */
    whatItDoes?: string[];
    /** Heading override for the list above */
    doesLabel?: string;
    /** What makes it different */
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
    case: {
        whatItDoes: [
          "Draw an agent pipeline on a canvas. Each node is an agent with its own prompt and Gemini model.",
          "Run it: every node whose inputs are ready runs in parallel, and a node with several parents receives each parent's labelled output.",
          "Pause for a human: review nodes stop the run, and the reviewer's feedback is passed to later agents.",
          "Watch the cost: tokens, cost and time per step, a daily spend cap, and a trace of every run.",
          "Start from one of six ready-made templates.",
        ],
        unique: [
          "Runs can be paused and resumed: steps that already succeeded are never run again.",
          "Each step has a fingerprint (SHA-256 of run, node, input and prompt), so a repeat is reused at zero cost and logged as a reuse.",
          "Governance is built in: a daily budget checked before and during a run, a primary and fallback model, and a circuit breaker after three failures in a row.",
          "Human review is a node type in the graph, not an add-on.",
          "Every step's prompt, response, tokens, cost and duration are visible in the traces.",
        ],
      problem: "AI agents tend to be built one at a time and run by hand, so multi-step work has no shared place to be designed, run, paused, costed and inspected. HiveState is that place: a canvas to design a pipeline, an engine to run it, and the controls to keep spend and quality in check.",
      user: "To be written.",
      design: "A dark, dense, engineer-first interface, documented in the repo as a design system: sharp edges, a blueprint grid, colour used only for state, monospace for data, and a trace view that never hides the raw prompt or response. A recent pass added grouped navigation, a quick-jump palette, a list of runs waiting for review, and plain-language labels.",
      tech: "The engine (about 550 lines of TypeScript) loads a workflow's graph, rejects cycles with a depth-first search, and runs it level by level: every node whose parents have finished runs in parallel. Inputs from several parents are bundled as labelled JSON. State is stored in Supabase Postgres (workflows, runs, logs, governance settings, providers), and each step writes a log row with tokens, cost, duration, model used and any error.",
      hardProblem: "Making long runs safe to interrupt. A run can pause for a human, pause on an error, hit a budget limit or be stopped, and it has to continue later without repeating paid work. Each step is fingerprinted and its result logged, resume skips everything already successful, a circuit breaker stops after three failures in a row, and the model hub retries with backoff and falls back to a second model on rate limits or server errors.",
      outcome: "A working orchestration app with a visual editor, human review, cost governance and traces. Reading the engine end to end also led to fixes for three real bugs: the UI-started runs skipped the budget pre-check, Stop did not halt a running workflow, and saving settings created a new settings row each time.",
      limits: "Only Gemini is wired into the engine: the provider table and OpenAI helper exist but are not used yet. Cost is a flat per-token estimate, not model-specific pricing. There are no automated tests, and runs start in the background of a web request, which can be fragile on serverless hosting.",
      built: [
        { label: "Data model", value: "Workflows with canvas JSON, runs, per-step logs, governance settings and AI providers, in ten SQL migrations." },
        { label: "Engine", value: "Dependency-aware parallel execution, cycle detection, pause and resume, step fingerprints." },
        { label: "Resilience", value: "Retry with exponential backoff, fallback model on 429 or 5xx, circuit breaker after three failures." },
        { label: "Governance", value: "Daily spend cap enforced before and during a run, optional context compression for long inputs." },
        { label: "Interface", value: "React Flow canvas, task and trace views, settings, command palette (Ctrl or Cmd plus K)." },
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
    case: {
        whatItDoes: [
          "Mailbox: write a note about how you feel and what you need, tagged with a feeling, and your partner reads and responds when they are ready.",
          "Daily check-ins with streaks and a connection level.",
          "Time capsules: sealed messages that only open on a date you choose.",
          "A white flag: a gentle way to signal that you want to repair after a conflict.",
          "End-to-end encrypted chat with text, images, voice notes, stickers and short videos.",
          "Safe-space sessions, reactions, special days, and private notes about your partner.",
          "Games, question decks and conflict-resolution guides on a public site.",
        ],
        unique: [
          "Two people only. Pairing uses a one-use invite code, and every read and write is checked against the couple's membership. There is no social graph.",
          "Written for tone: language rules that avoid blame, and a plain label for who can see what wherever something is shared or private.",
          "Encrypted chat with a stated threat model, limits included, instead of a bare \"secure\" badge.",
          "Time capsules are enforced by the database rules, so a sealed note cannot be opened early by editing the client.",
          "The security rules are tested like code: a 59-case emulator suite runs in CI on every pull request.",
          "Notifications say that something arrived, never what it said.",
        ],
      problem:
        "Couples have their hardest conversations when they are least able to: tired, defensive, mid-argument. Chat apps are built for speed, and nothing in them separates a feeling from an accusation.\n\nHonest Mailbox is a small private space where each person writes how they feel and what they need, and the other reads it when they are ready.",
      user:
        "Two people in a relationship, paired one to one. There is no feed, friends list or public profile: every couple document names exactly two members, and access is checked against that membership.",
      design:
        "Tone comes first. The design system bans blame language: the product says \"note\" and \"check-in\", never \"complaint\" or \"report\", never declares who is right, and says plainly who can see what wherever something is shared or private. One primary task per screen, mobile first, one card radius everywhere, and the feeling attached to a note sets its card colour so mood reads at a glance.\n\nThe features follow the relationship rather than a chat metaphor: a mailbox of notes and responses, daily check-ins with streaks, private notes about your partner, time capsules that only open on a chosen date, a white flag to signal you want to repair after a conflict, a safe-space session, reactions, special days, and games and question decks. Light mode is the default, dark is a switch, and the choice is applied before first paint to avoid a flash.",
      tech:
        "The core app has no custom backend. Next.js client components talk straight to Firebase Auth (Google sign-in), Firestore and Storage, which makes the security rules the backend. Two small server routes exist for the things that must be enforced server-side: the chat key reset and admin stats.\n\nChat is end-to-end encrypted with Web Crypto. Each device holds a P-256 key pair and only the public half is published; the two public keys are combined with ECDH and HKDF into one AES-256-GCM key for the pairing. Videos are encrypted on the device before upload, so Storage only ever holds ciphertext. A passphrase-wrapped backup lets a second device recover the key.",
      hardProblem:
        "Making the encryption honest and recoverable at the same time. A key that lives on one device is lost with the phone; a key the server can read is not end-to-end. The key is backed up wrapped under a passphrase (PBKDF2 at 600k+ iterations, chosen over Argon2 because WebAssembly would have needed a weaker content security policy), and it is not published until that backup exists, so a second device is never dead-ended.\n\nA manual security review against OWASP ASVS then found that the emailed-code check on \"reset my chat key\" was enforced only in the interface: script running as the user could rotate keys directly through the client SDK. The fix moved the destructive write behind a server route that verifies the emailed code, issues a short-lived single-use ticket, and only then publishes the replacement key with the Admin SDK.",
      outcome:
        "A working web app with a written threat model that states its own limits. What I took from it: say what the design does not do. Naming the gaps made them easier to review and fix than a claim of \"secure\" would have.\n\nNext step is the mobile app version.",
      limits:
        "Chat has no forward secrecy: one static key covers a pairing. Metadata (who, when, what kind of message) is visible to anyone with access to the Firebase project. Mailbox, notes and check-ins are protected by access rules and Google's encryption, but are not end-to-end encrypted yet.",
      built: [
        { label: "Data model", value: "Users, couples, mailbox, time capsules, check-ins, reactions, events, safe-space sessions and invites. Read access follows couple membership." },
        { label: "Security rules", value: "Firestore and Storage rules with a 59-case test suite that runs in the emulator. One-use invite codes that cannot be listed; pairing in one transaction." },
        { label: "Tests", value: "14 test files, about 150 cases: rules, dates and streaks, E2EE, reset codes, security headers, SEO, games." },
        { label: "CI", value: "GitHub Actions on every PR: dependency audit, type-check, lint, unit tests, rules tests, production build. Dependabot weekly." },
        { label: "Hardening", value: "Content-Security-Policy limited to self and Firebase, HSTS, no framing, App Check hook. Notifications say something arrived, never what it said." },
        { label: "Public site", value: "Games, question decks, conflict-resolution guides and a blog with sitemap and Open Graph images, plus an admin metrics page." },
      ],
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
    case: {
        whatItDoes: [
          "Hides photos, videos, documents, audio, notes and scans in an encrypted vault that opens with a pattern.",
          "Fingerprint unlock after the pattern is drawn once, and photos of anyone who enters the wrong pattern.",
          "Separate vaults, a decoy vault called Coerce, and disguising the app as another app on Pro.",
          "A recovery phrase and encrypted backup files that restore on a new phone.",
          "Shares a file encrypted with a passphrase that you send separately.",
          "Free for 3 vaults and 100 photos. Pro adds unlimited files and vaults, as weekly, monthly, annual (7-day trial) or lifetime.",
        ],
        doesLabel: "The app, as the site describes it",
        unique: [
          "Product position, as the site states it: no account, no cloud and no internet permission, so there is nothing to sign into and nowhere for files to leak to.",
          "The site is built by about 180 lines of Node with no dependencies instead of a framework: nothing to upgrade and little that can break.",
          "Source and output are separate. Edit one content file and the header, footer, guide lists and sitemap all update.",
          "SEO is a routine, not a launch task: one keyword per guide, a fixed format, and a weekly review of pages ranking 8 to 50.",
          "Claims are written to be checkable (algorithms, permissions) rather than adjectives.",
        ],
      problem:
        "Sealcloak hides photos, videos and files on Android behind a pattern lock, with no account, no cloud and no internet permission. That is hard to convey in a store listing, and the people looking for it type very practical searches such as how to hide photos on Android.\n\nThe site has two jobs: make the privacy claims believable, and be found by those searches.",
      user:
        "Android users who want to keep photos and files private, and people comparing vault apps who want to know exactly what an app can and cannot do before installing it.",
      design:
        "Quiet, minimal pages that reuse the app's own colours, with real app screenshots in a phone-frame trio in the hero. The page order answers objections as they come up: what it does (hide, protect, recover), how it works, security, features, pricing, FAQ.\n\nPricing leads with what is free and says what happens when a subscription ends: nothing is deleted. The copy is plain and avoids hype.",
      tech:
        "No framework. Pages are source fragments in content/ with a small metadata block, and build.mjs (about 180 lines of Node, no dependencies) wraps each in the shared header and footer, then generates the guide index, sitemap.xml and robots.txt. The output is plain static HTML in the repo root, so any static host can serve it, with one CSS file and one small script.\n\nA repeatable SEO routine lives in the repo: each guide targets one keyword, follows a defined metadata format (title under 60 characters, description under 155), links to related guides and a main page, and the README sets out a weekly Search Console review of pages ranking between positions 8 and 50.",
      hardProblem:
        "Credibility. \"Encrypted\" and \"no internet\" are claims every vault app makes. The security page makes them specific and checkable: AES-256-GCM file encryption, Argon2id key derivation, Android Keystore, and the internet permission removed from the app entirely, each on its own line. Pricing and recovery copy is written the same way, as plain statements about what the app does.",
      outcome:
        "A full set of marketing pages (home, how it works, features, security, pricing, FAQ, privacy) and three SEO guides, built with one command and deployable anywhere. The launch checklist in the README is still open: real domain, Play Store link, contact address and Search Console.",
      limits:
        "This repo is the website only. The Android app's code is not here, so the technical claims on the site are the product's stated claims, not something this repository proves.",
      built: [
        { label: "Generator", value: "build.mjs, about 180 lines of Node with no dependencies. Content in, static HTML out." },
        { label: "Pages", value: "Home, how it works, features, security, pricing, FAQ, privacy, 404, plus a guides index and three guides." },
        { label: "SEO", value: "Per-page metadata, generated sitemap and robots.txt, internal-link rules for guides, weekly review routine." },
        { label: "Front end", value: "One CSS file (about 400 lines) and one script (about 60 lines). Scroll reveal and mobile layout, no libraries." },
        { label: "Hosting", value: "Plain static output with a Vercel clean-URLs config." },
      ],
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
    case: {
        whatItDoes: [
          "Daily routines: create, view and track them.",
          "Mood check-ins with a streak and points.",
          "Wardrobe, styling and grooming looks.",
          "An AI stylist chat for outfit questions (a scripted prototype today).",
          "A morning flow, sleep, confidence and communication lessons, and speaking practice.",
          "To-dos, quotes and notes, notifications and settings.",
        ],
        unique: [
          "Appearance and inner routine live together: styling and grooming sit beside mood, sleep and confidence practice.",
          "A stylist with a boundary: it helps with outfits, fit and colour, and declines to rate faces or give scores.",
          "Each area has its own accent colour with a soft tint, so you know where you are by colour alone.",
          "Light by design: no third-party libraries beyond AndroidX, and no network permission.",
        ],
      problem: "To be written. The scope of the app is clear from the code: one place for daily routines, mood, sleep, styling and confidence practice. The reason behind it needs the owner's own words.",
      user: "To be written.",
      design:
        "A light, card-based Material 3 interface with a small base palette (ink and warm greys) and one accent colour per area, each paired with a soft tint, so a section is recognisable by colour alone. A bottom navigation bar and a home screen with a streak chip anchor the app. Detail screens share one header and one dialog component, and the icons are custom drawables rather than stock Material icons.",
      tech:
        "A single-activity Compose app: MainActivity hosts a navigation graph with more than twenty routes covering routines, styling, wardrobe, sleep, confidence, communication, speaking practice, to-dos, notes, notifications and settings. State lives in small Kotlin objects (mood, to-dos, routines, lessons, grooming) built on Compose snapshot state, so screens update as data changes.\n\nAbout 5,300 lines across 36 Kotlin files, with no third-party libraries beyond AndroidX. Minimum Android 8.0 (API 26), targeting API 36.",
      hardProblem:
        "To be written. One design decision is visible in the code: the stylist chat is deliberately bounded. It helps with outfits, fit and colour, and declines to rate faces or give scores.",
      outcome:
        "A navigable prototype with the full interface in place. Next steps are saving data on the device, replacing seeded sample data, and connecting the stylist to a real model.",
      limits:
        "Data lives in memory and resets when the app restarts, mood and streak values are seeded samples, the AI stylist is scripted (keyword-matched replies, not a model), and there are no tests yet.",
      built: [
        { label: "Screens", value: "More than twenty: home, routines, add routine, styling, wardrobe, stylist, sleep, confidence, speaking practice, mood check-in, streaks and more." },
        { label: "Architecture", value: "Single activity, Navigation Compose, plain Kotlin state objects. No view-model layer yet." },
        { label: "Persistence", value: "None yet. In-memory sample data." },
        { label: "Network", value: "None. The app declares no permissions." },
        { label: "Tests", value: "None yet." },
      ],
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
