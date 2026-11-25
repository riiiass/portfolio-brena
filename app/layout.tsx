import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { fontVariables } from "@/lib/fonts";
import { prefsScript } from "@/lib/prefs-script";
import { site } from "@/lib/site";
import { PreferencesProvider } from "@/components/providers/Preferences";
import { Nav } from "@/components/ui/Nav";
import { Toaster } from "@/components/ui/Toaster";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { IdleGuard } from "@/components/motion/IdleGuard";
import { Footer } from "@/components/sections/Footer";
import { LazyChrome } from "@/components/providers/LazyChrome";
import { SkipLink } from "@/components/ui/SkipLink";
import { PersonJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Full Stack × UX/UI`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  keywords: [
    "Brena Angelo",
    "desenvolvedora full stack",
    "designer UX/UI",
    "Next.js",
    "React",
    "TypeScript",
    "portfólio",
    "Ceará",
  ],
  alternates: { canonical: "/", languages: { "pt-BR": "/", en: "/en", "x-default": "/" } },
  openGraph: { type: "website", locale: "pt_BR", siteName: site.name, url: site.url },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0e" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prefsScript }} />
        <PersonJsonLd />
      </head>
      <body>
        <SkipLink />
        <PreferencesProvider>
          <Nav />
          {children}
          <Footer />
          <Toaster />
          <LazyChrome />
          <SmoothScroll />
          <IdleGuard />
        </PreferencesProvider>
      </body>
    </html>
  );
}
