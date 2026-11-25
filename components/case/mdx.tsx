import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { CaseSection } from "./CaseSection";
import { Decisions } from "./Decisions";
import { Architecture } from "./Architecture";
import { Metrics } from "./Metrics";
import { StackGroups } from "./StackGroups";

/** Componentes do MDX com o idioma já aplicado (rótulos de fase, "Integrações", "TODO") */
export function caseMdxComponents(locale: Locale): MDXComponents {
  const t = ui[locale];
  return {
    CaseSection: (p: ComponentProps<typeof CaseSection>) => <CaseSection {...p} locale={locale} />,
    Architecture: (p: ComponentProps<typeof Architecture>) => (
      <Architecture {...p} labels={{ aria: t.archAria, integrations: t.integrations }} />
    ),
    Metrics: (p: ComponentProps<typeof Metrics>) => <Metrics {...p} todo={t.metricTodo} />,
    Decisions,
    StackGroups,
  };
}
