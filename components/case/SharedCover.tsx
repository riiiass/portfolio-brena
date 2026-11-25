import { ViewTransition, type ReactNode } from "react";

/**
 * orientação: o mesmo nome no card da home e na capa do case → o navegador
 * "morfa" um no outro durante a navegação (View Transitions API via React).
 */
export function SharedCover({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <ViewTransition name={`case-${slug}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
