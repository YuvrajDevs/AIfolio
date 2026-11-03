import type { Metadata, Viewport } from "next";
import { Pixelify_Sans, Caveat, Outfit } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";

const pixel = Pixelify_Sans({ variable: "--font-pixelify", subsets: ["latin"], weight: ["500", "700"], display: "swap" });
const hand = Caveat({ variable: "--font-caveat", subsets: ["latin"], display: "swap" });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: `${SITE.short} | AI full-stack developer & product designer`, template: `%s | ${SITE.short}` },
  description:
    "I design and build AI-powered tools that automate real business work, with strong UI and solid engineering underneath. Available for freelance projects and remote roles.",
  icons: { icon: "/Portfolio-favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#fbfbf8" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${pixel.variable} ${hand.variable} ${outfit.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
