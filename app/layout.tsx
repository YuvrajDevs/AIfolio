import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { TopBar, Toolbar } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { CursorTrail } from "@/components/CursorTrail";
import { SITE } from "@/lib/site";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.website),
  title: { default: `${SITE.short} | Data engineering, analytics & AI`, template: `%s | ${SITE.short}` },
  description:
    "Software engineer in data analytics, interested in data engineering: batch and streaming pipeline projects on Spark, Kafka, Delta Lake and Airflow, with measured results. Projects: real-time jet-engine telemetry, a vehicle-safety data product and a startup-intelligence platform.",
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.short,
    title: `${SITE.short} | Data engineering, analytics & AI`,
    description: "I build data pipelines people can trust, and I prove it with numbers.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Yuvraj: AI, full stack, product design and data" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.short} | Data engineering, analytics & AI`,
    description: "I build data pipelines people can trust, and I prove it with numbers.",
    images: ["/og.jpg"],
  },
  icons: { icon: "/Portfolio-favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#2556e8" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${GeistMono.variable} h-full antialiased`}>
      <body id="top" className="flex min-h-full flex-col">
        <CursorTrail />
        <div className="zoomed flex flex-1 flex-col">
          <TopBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toolbar />
      </body>
    </html>
  );
}
