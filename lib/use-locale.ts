"use client";

import { usePathname } from "next/navigation";
import { localeFromPath, type Locale } from "./i18n";

/** Idioma atual a partir da URL (/en/... = inglês) */
export function useLocale(): Locale {
  return localeFromPath(usePathname());
}
