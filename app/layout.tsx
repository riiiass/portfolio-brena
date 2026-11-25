import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { fontVariables } from "@/lib/fonts";
import { prefsScript } from "@/lib/prefs-script";
import { site } from "@/lib/site";
import { PreferencesProvider } from "@/components/providers/Preferences";
import { Nav } from "@/components/ui/Nav";
import { Cursor } from "@/components/ui/Cursor";
import { Toaster } from "@/components/ui/Toaster";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { IdleGuard } from "@/components/motion/IdleGuard";
import { Footer } from "@/components/sections/Footer";
import { Modes } from "@/components/modes/Modes";
import { EasterEgg } from "@/components/modes/EasterEgg";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Full Stack × UX/UI`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { type: "website", locale: "pt_BR", siteName: site.name },
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
      </head>
      <body>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <PreferencesProvider>
          <Nav />
          {children}
          <Footer />
          <CommandPalette />
          <Toaster />
          <Cursor />
          <Modes />
          <EasterEgg />
          <SmoothScroll />
          <IdleGuard />
        </PreferencesProvider>
      </body>
    </html>
  );
}
