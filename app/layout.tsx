import type { Metadata } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yuvraj Singh",
  description: "Explore My portfolio !",
  icons: {
    icon: "/Portfolio-favicon.svg",
  },
};

import { SectionProvider } from "@/context/SectionContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-outfit" suppressHydrationWarning>
        <SectionProvider>
          <Sidebar />
          {children}
        </SectionProvider>
      </body>
    </html>
  );
}
