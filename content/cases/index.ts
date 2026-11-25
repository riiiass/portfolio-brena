import type { ComponentType } from "react";

/** Mapa estático (o bundler precisa enxergar cada import) */
export const caseBodies: Record<string, () => Promise<{ default: ComponentType }>> = {
  kadosh: () => import("./kadosh.mdx"),
  modo: () => import("./modo.mdx"),
  "paz-no-lar": () => import("./paz-no-lar.mdx"),
  "banco-de-talentos": () => import("./banco-de-talentos.mdx"),
};
