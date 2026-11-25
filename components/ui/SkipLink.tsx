"use client";

import { useLocale } from "@/lib/use-locale";
import { getContent } from "@/content";

export function SkipLink() {
  const t = getContent(useLocale()).t;
  return (
    <a href="#conteudo" className="skip-link">
      {t.skip}
    </a>
  );
}
