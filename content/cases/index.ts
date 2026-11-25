import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import type { Locale } from "@/lib/i18n";

type Body = () => Promise<{ default: ComponentType<{ components?: MDXComponents }> }>;

/** Mapa estático por idioma (o bundler precisa enxergar cada import) */
export const caseBodies: Record<Locale, Record<string, Body>> = {
  pt: {
    kadosh: () => import("./kadosh.mdx"),
    modo: () => import("./modo.mdx"),
    "paz-no-lar": () => import("./paz-no-lar.mdx"),
    "banco-de-talentos": () => import("./banco-de-talentos.mdx"),
  },
  en: {
    kadosh: () => import("./en/kadosh.mdx"),
    modo: () => import("./en/modo.mdx"),
    "paz-no-lar": () => import("./en/paz-no-lar.mdx"),
    "banco-de-talentos": () => import("./en/banco-de-talentos.mdx"),
  },
};
