export type Locale = "pt" | "en";
export const locales: Locale[] = ["pt", "en"];

/** Caminho da home/seção no idioma */
export const homePath = (l: Locale) => (l === "en" ? "/en" : "/");
/** Caminho de um case no idioma */
export const casePath = (l: Locale, slug: string) =>
  l === "en" ? `/en/projects/${slug}` : `/projetos/${slug}`;
/** Âncora de seção a partir de qualquer página */
export const sectionHref = (l: Locale, id: string) => `${l === "en" ? "/en" : "/"}#${id}`;
/** Locale a partir do pathname */
export const localeFromPath = (p: string | null | undefined): Locale =>
  p && (p === "/en" || p.startsWith("/en/")) ? "en" : "pt";
/** Caminho equivalente no outro idioma */
export function switchPath(p: string, to: Locale): string {
  const from = localeFromPath(p);
  if (from === to) return p;
  if (to === "en") {
    if (p.startsWith("/projetos/")) return p.replace("/projetos/", "/en/projects/");
    return p === "/" ? "/en" : `/en${p}`;
  }
  if (p.startsWith("/en/projects/")) return p.replace("/en/projects/", "/projetos/");
  return p.replace(/^\/en/, "") || "/";
}
