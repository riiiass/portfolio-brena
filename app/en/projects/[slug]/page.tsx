import type { Metadata } from "next";
import { projects } from "@/content/en/projects";
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
  return caseMetadata("en", (await params).slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <CasePage locale="en" slug={(await params).slug} />;
}
