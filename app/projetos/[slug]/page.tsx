import type { Metadata } from "next";
import { projects } from "@/content/pt/projects";
import { CasePage, caseMetadata } from "@/components/case/CasePage";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return caseMetadata("pt", (await params).slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <CasePage locale="pt" slug={(await params).slug} />;
}
