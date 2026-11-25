import { renderOg, ogSize } from "@/lib/og";
import { projects } from "@/content/en/projects";
import { getCase } from "@/content/en/cases";

export const alt = "Project case study — Brena Angelo's portfolio";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  const meta = getCase(slug);
  return renderOg({
    title: p?.title ?? "Case",
    script: meta?.script ?? "case",
    kicker: "CASE STUDY · BRENA ANGELO",
    tag: (p?.categories.join(" × ") ?? "PROJECT").toUpperCase(),
  });
}
