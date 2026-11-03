import { Globe, AppWindow, BarChart3, Sparkles } from "lucide-react";

export const SERVICES = [
  {
    icon: Globe,
    title: "Website design & build",
    short: "Fast, polished marketing sites and portfolios.",
    long: "A clear message, strong visual design and a site that loads quickly and ranks.",
    gets: ["Design in the browser, not just mockups", "Responsive and accessible", "SEO and social previews set up"],
  },
  {
    icon: AppWindow,
    title: "Web app / MVP",
    short: "From idea to a working product you can show users.",
    long: "End-to-end product work: scoping, UI, database, auth and deployment.",
    gets: ["Scoped to what you need to learn first", "Next.js, TypeScript, Supabase", "Deployed, with docs for handover"],
  },
  {
    icon: BarChart3,
    title: "Dashboards",
    short: "Turn messy data into screens people actually use.",
    long: "Internal dashboards and reporting, drawing on experience with CRM Analytics and Power BI.",
    gets: ["Data modelling and SQL", "Clear, decision-first layouts", "Built for the people who read them"],
  },
  {
    icon: Sparkles,
    title: "AI features",
    short: "Add LLM-powered workflows to an existing product.",
    long: "Practical AI integration: extraction, classification, agents and automation with sensible guardrails.",
    gets: ["Right model for the job and budget", "Evaluation and fallbacks, not demos only", "Human-in-the-loop where it matters"],
  },
];

export const PROCESS = [
  { step: "01", title: "Discover", desc: "A short call or written brief to understand the problem, users and constraints." },
  { step: "02", title: "Design", desc: "Flows and UI direction agreed before heavy build work starts." },
  { step: "03", title: "Build", desc: "Iterative delivery with regular working previews you can click through." },
  { step: "04", title: "Ship", desc: "Deployed, documented and handed over, with support for the first stretch." },
];
