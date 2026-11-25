import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/pt/projects";
import { getCase } from "@/content/pt/cases";
import { caseBodies } from "@/content/cases";
import { ProcessBar } from "@/components/case/ProcessBar";
import { Gallery } from "@/components/case/Gallery";
import { NextProject } from "@/components/case/NextProject";
import { SharedCover } from "@/components/case/SharedCover";
import { ProjectCover } from "@/components/sections/ProjectCover";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { ScrollFx } from "@/components/motion/ScrollFx";
import { Icon } from "@/components/ui/Icon";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} — case`,
    description: p.summary,
    alternates: { canonical: `/projetos/${p.slug}` },
    openGraph: {
      title: `${p.title} · Brena Angelo`,
      description: p.summary,
      images: p.cover ? [p.cover.src] : undefined,
    },
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  const meta = getCase(slug);
  const load = caseBodies[slug];
  if (!project || !meta || !load) notFound();
  const { default: Body } = await load();
  const next = projects[(index + 1) % projects.length]!;
  const gallery = [...(project.cover ? [project.cover] : []), ...meta.gallery];

  return (
    <main id="conteudo" className="pt-24 md:pt-32">
      {/* ---------- capa ---------- */}
      <header data-bg="paper" className="mx-auto max-w-[1180px] px-4 md:px-8">
        <Link
          href="/#projetos"
          className="border-fg mb-8 inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] px-4 text-sm font-medium transition-transform active:scale-[.97]"
        >
          <Icon name="arrowUpRight" size={16} className="-rotate-[135deg]" /> Todos os projetos
        </Link>
        <div className="relative">
          <span
            aria-hidden="true"
            className="hero-script font-script text-accent absolute -top-6 left-2 z-10 -rotate-6 text-[4.5rem] leading-none md:-top-10 md:text-[8rem]"
          >
            {meta.script}
          </span>
          <h1
            data-cursor-blend
            className="font-display pt-8 text-[clamp(3.5rem,13vw,10rem)] leading-[.86] uppercase"
          >
            {project.title}
          </h1>
          <span
            aria-hidden="true"
            className="hero-stamp border-bg bg-fg text-bg absolute right-0 bottom-2 hidden -rotate-[9deg] rounded-full border-2 px-4 py-2.5 font-mono text-xs tracking-[.25em] shadow-[0_0_0_2px_var(--fg)] sm:block"
          >
            {project.categories.join(" × ").toUpperCase()}
          </span>
        </div>
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <Reveal as="p" className="text-step-2 font-serif leading-snug">
            {meta.lede}
          </Reveal>
          <Reveal as="dl" delay={2} className="grid grid-cols-2 gap-4 text-sm md:grid-cols-1">
            <div>
              <dt className="label-mono text-muted mb-1 text-[10px]">Papel</dt>
              <dd>{meta.role}</dd>
            </div>
            <div>
              <dt className="label-mono text-muted mb-1 text-[10px]">Ano</dt>
              <dd>{meta.year === "TODO" ? <span className="text-muted">TODO</span> : meta.year}</dd>
            </div>
            <div className="col-span-2 md:col-span-1">
              <dt className="label-mono text-muted mb-1 text-[10px]">Stack</dt>
              <dd>
                {project.stack.length ? (
                  project.stack.join(" · ")
                ) : (
                  <span className="text-muted">Em breve</span>
                )}
              </dd>
            </div>
            {meta.url ? (
              <div>
                <dt className="sr-only">Link</dt>
                <dd>
                  <a
                    href={meta.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4"
                  >
                    Ver no ar ↗
                  </a>
                </dd>
              </div>
            ) : null}
          </Reveal>
        </div>
        <SharedCover slug={project.slug}>
          <div className="mt-10 h-[260px] sm:h-[420px] md:h-[560px]">
            <ProjectCover project={project} priority />
          </div>
        </SharedCover>
      </header>

      {/* ---------- corpo ---------- */}
      <div data-bg="paper" className="mx-auto mt-16 max-w-[1180px] px-4 md:px-8">
        <ProcessBar />
        <article className="mt-6">
          <Body />
        </article>

        <section aria-labelledby="galeria-t" className="border-line border-t py-14 md:py-20">
          <RevealLines
            id="galeria-t"
            className="font-display text-step-3 mb-8 uppercase"
            lines={["Galeria"]}
          />
          <Gallery images={gallery} placeholders={Math.max(0, 3 - gallery.length)} />
        </section>
      </div>

      <div className="mx-auto max-w-[1240px] px-4 pb-32 md:px-8">
        <NextProject project={next} />
      </div>
      <ScrollFx />
    </main>
  );
}
