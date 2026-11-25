import type { Metadata } from "next";
import { HomePage } from "@/components/sections/HomePage";

export const metadata: Metadata = {
  title: { absolute: "Brena Angelo — Full Stack Developer × UX/UI Designer" },
  description:
    "Portfolio of Brena Angelo: a full stack developer who thinks like a designer and a UX/UI designer who ships code. Next.js, React, TypeScript, Node.js and PostgreSQL.",
  alternates: { canonical: "/en", languages: { "pt-BR": "/", en: "/en", "x-default": "/" } },
  openGraph: { locale: "en_US", url: "/en", title: "Brena Angelo — Full Stack × UX/UI" },
};

export default function Home() {
  return <HomePage locale="en" />;
}
