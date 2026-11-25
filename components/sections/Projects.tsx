"use client";

import { AnimatePresence, LayoutGroup, m } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { projects, type Project, type ProjectCategory } from "@/content/pt/projects";
import { usePrefs } from "@/components/providers/Preferences";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { ProjectCover } from "./ProjectCover";
import { SharedCover } from "@/components/case/SharedCover";

type Filter = "Todos" | ProjectCategory;
const filters: Filter[] = ["Todos", "Full Stack", "UX/UI", "Front-end"];

const toneCls: Record<Project["tone"], string> = {
  ink: "bg-block text-paper ring-1 ring-line",
  pink: "on-light bg-folder-pink",
  blue: "on-light bg-folder-blue",
  lime: "on-light bg-folder-lime",
};
const layoutCls: Record<Project["layout"], string> = {
  big: "sm:col-span-2 sm:row-span-2",
  tall: "sm:row-span-2",
  wide: "sm:col-span-2 lg:col-span-4",
  default: "",
};

/** Recorte côncavo no canto inferior direito, onde a seta "encaixa" (ref. B) */
const notchMask =
  "radial-gradient(circle 34px at calc(100% - 26px) calc(100% - 26px), transparent 33px, #000 33.5px)";

function ProjectCard({ p, priority }: { p: Project; priority: boolean }) {
  const wide = p.layout === "wide";
  return (
    <Link
      href={`/projetos/${p.slug}`}
      data-cursor="ver case"
      className="group relative block h-full rounded-[32px] focus-visible:outline-offset-[6px]"
    >
      <div
        className={cn(
          "flex h-full gap-4 overflow-hidden rounded-[32px] p-5 md:p-6",
          wide
            ? "flex-col sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:gap-8"
            : "flex-col",
          toneCls[p.tone],
        )}
        style={{ WebkitMask: notchMask, mask: notchMask }}
      >
        <div className={cn("flex flex-col gap-4", wide ? "sm:justify-between" : "flex-1")}>
          <div className="flex flex-wrap gap-1.5">
            {p.categories.map((c) => (
              <span
                key={c}
                className="bg-paper text-ink rounded-full px-2.5 py-1.5 font-mono text-[11px] tracking-[.15em] uppercase"
              >
                {c}
              </span>
            ))}
            {p.status === "maintenance" ? (
              <span className="flex items-center gap-1.5 rounded-full border border-current px-2.5 py-1.5 font-mono text-[10px] tracking-[.12em] uppercase">
                <span className="bg-ok size-1.5 rounded-full" aria-hidden="true" />
                em manutenção
              </span>
            ) : null}
            {p.status === "dev" ? (
              <span className="bg-ink text-paper flex items-center gap-1.5 rounded-full px-2.5 py-1.5 font-mono text-[10px] tracking-[.12em] uppercase">
                <span
                  className="idle bg-folder-lime size-1.5 animate-pulse rounded-full"
                  aria-hidden="true"
                />
                em desenvolvimento
              </span>
            ) : null}
            {!p.publicImages ? (
              <span className="rounded-full border border-current px-2.5 py-1.5 font-mono text-[10px] tracking-[.1em] uppercase">
                prints sob autorização
              </span>
            ) : null}
          </div>
          {!wide ? (
            <SharedCover slug={p.slug}>
              <div className="min-h-[150px] flex-1">
                <ProjectCover project={p} priority={priority} />
              </div>
            </SharedCover>
          ) : null}
          <div className="pr-12">
            <h3 className="font-display text-[clamp(2rem,3.4vw,2.75rem)] leading-none uppercase">
              {p.title}
            </h3>
            <p className="mt-2 max-w-[460px] text-sm leading-relaxed">{p.summary}</p>
            {/* hierarquia: a stack aparece no hover/foco (sempre visível em telas de toque) */}
            <p className="mt-2.5 font-mono text-[11px] tracking-[.1em] uppercase opacity-90 transition-[opacity,transform] duration-300 [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-90 [@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-90">
              {p.stack.length ? p.stack.join(" · ") : "stack em breve"}
            </p>
          </div>
        </div>
        {wide ? (
          <SharedCover slug={p.slug}>
            <div className="min-h-[150px] sm:mr-10 sm:min-h-0">
              <ProjectCover project={p} priority={priority} />
            </div>
          </SharedCover>
        ) : null}
      </div>
      <span
        aria-hidden="true"
        className="bg-fg text-bg absolute right-[2px] bottom-[2px] flex size-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:-rotate-45 group-focus-visible:-rotate-45"
      >
        <Icon name="arrowUpRight" size={20} strokeWidth={2} />
      </span>
    </Link>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("Todos");
  const { reducedMotion } = usePrefs();
  const list = projects.filter((p) => filter === "Todos" || p.categories.includes(filter));
  const spring = reducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 260, damping: 28 };

  return (
    <section
      id="projetos"
      data-bg="paper"
      aria-labelledby="projetos-t"
      className="mx-auto max-w-[1180px] px-4 pt-8 pb-24 md:px-8 md:pb-32"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal as="p" className="label-mono mb-3 text-[11px]">
            Trabalhos
          </Reveal>
          <RevealLines
            id="projetos-t"
            className="text-step-4 font-serif leading-none"
            lines={[
              <>
                Projetos{" "}
                <span className="font-script text-accent text-[1.3em] leading-[.6]">
                  selecionados
                </span>
              </>,
            ]}
          />
        </div>
        <LayoutGroup id="filters">
          <div
            role="group"
            aria-label="Filtrar projetos por categoria"
            className="flex flex-wrap gap-2"
          >
            {filters.map((f) => {
              const on = f === filter;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "border-fg relative min-h-11 rounded-full border-[1.5px] px-[18px] text-sm font-medium transition-colors duration-300 active:scale-[.97]",
                    on ? "text-bg" : "text-fg hover:bg-fg/5",
                  )}
                >
                  {/* feedback: a pílula preenchida desliza até o filtro escolhido */}
                  {on ? (
                    <m.span
                      layoutId="filter-pill"
                      className="bg-fg absolute inset-0 -z-0 rounded-full"
                      transition={spring}
                    />
                  ) : null}
                  <span className="relative">{f}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      <p className="sr-only" aria-live="polite">
        {list.length} {list.length === 1 ? "projeto" : "projetos"} em {filter}
      </p>

      <m.ul
        layout
        className="grid grid-flow-dense auto-rows-[minmax(420px,auto)] grid-cols-[minmax(0,1fr)] gap-3.5 sm:auto-rows-[260px] sm:grid-cols-2 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p) => (
            <m.li
              key={p.slug}
              layout
              className={layoutCls[p.layout]}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={spring}
            >
              <ProjectCard p={p} priority={false} />
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>
    </section>
  );
}
