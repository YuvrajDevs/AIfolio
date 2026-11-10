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
  title: { default: `${SITE.short} | AI, product design & full stack`, template: `%s | ${SITE.short}` },
  description:
    "AI, product design and full-stack engineering, with a data background. I design and build AI products like multi-agent orchestration and payments reconciliation, end to end.",
  icons: { icon: "/Portfolio-favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#2556e8" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${GeistMono.variable} h-full antialiased`}>
      <body id="top" className="flex min-h-full flex-col">
        <TopBar />
        <CursorTrail />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toolbar />
      </body>
    </html>
  );
}
