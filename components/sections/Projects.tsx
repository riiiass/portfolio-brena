"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { projects, type Project, type ProjectCategory } from "@/content/pt/projects";
import { usePrefs } from "@/components/providers/Preferences";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { ProjectCover } from "./ProjectCover";

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
  default: "",
};

/** Recorte côncavo no canto inferior direito, onde a seta "encaixa" (ref. B) */
const notchMask =
  "radial-gradient(circle 34px at calc(100% - 26px) calc(100% - 26px), transparent 33px, #000 33.5px)";

function ProjectCard({ p }: { p: Project }) {
  return (
    <Link
      href={`/projetos/${p.slug}`}
      data-cursor="ver case"
      className="group relative block h-full min-h-[260px] rounded-[32px] focus-visible:outline-offset-[6px]"
      aria-label={`${p.title}: ver case`}
    >
      <article
        className={cn(
          "relative flex h-full flex-col justify-between overflow-hidden rounded-[32px] p-5 md:p-6",
          toneCls[p.tone],
        )}
        style={{ WebkitMask: notchMask, mask: notchMask }}
      >
        {/* feedback: a capa dá zoom dentro da máscara no hover */}
        <div
          className={cn(
            "absolute transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.06] group-focus-visible:scale-[1.06]",
            // celular e cards pequenos: capa na lateral direita; grandes/altos: capa no topo
            "cover-side inset-y-0 right-0 w-[48%] opacity-70",
            p.layout !== "default" &&
              "sm:cover-top sm:inset-x-0 sm:top-0 sm:bottom-auto sm:h-[62%] sm:w-auto sm:opacity-100",
          )}
        >
          <ProjectCover slug={p.slug} />
        </div>
        <div className="relative flex flex-wrap gap-1.5">
          {p.categories.map((c) => (
            <span
              key={c}
              className="bg-paper text-ink rounded-full px-2.5 py-1.5 font-mono text-[11px] tracking-[.15em] uppercase"
            >
              {c}
            </span>
          ))}
          {!p.publicImages ? (
            <span className="rounded-full border border-current px-2.5 py-1.5 font-mono text-[10px] tracking-[.1em] uppercase">
              prints sob autorização
            </span>
          ) : null}
        </div>
        <div className="relative pr-12">
          <h3 className="font-display text-[clamp(2rem,3.4vw,2.75rem)] leading-none uppercase">
            {p.title}
          </h3>
          <p className="mt-2 max-w-[420px] text-sm leading-relaxed">{p.summary}</p>
          {/* hierarquia: a stack aparece no hover/foco (e está sempre visível sem hover, no toque) */}
          <p className="mt-2.5 font-mono text-[11px] tracking-[.1em] uppercase opacity-90 transition-[opacity,transform] duration-300 [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-90 [@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-90">
            {p.stack.join(" · ")}
          </p>
        </div>
      </article>
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
                    <motion.span
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

      <motion.ul
        layout
        className="grid grid-flow-dense auto-rows-[260px] grid-cols-[minmax(0,1fr)] gap-3.5 sm:grid-cols-2 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p) => (
            <motion.li
              key={p.slug}
              layout
              className={layoutCls[p.layout]}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={spring}
            >
              <ProjectCard p={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
