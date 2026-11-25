import type { ReactNode } from "react";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { phases, type PhaseId } from "./phases";

const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

/** Seção do case: ligada a uma fase do Double Diamond (a barra de processo acompanha) */
export function CaseSection({
  phase,
  title,
  children,
}: {
  phase: PhaseId;
  title: string;
  children: ReactNode;
}) {
  const idx = phases.findIndex((p) => p.id === phase);
  const id = `sec-${slug(title)}`;
  return (
    <section
      data-phase={phase}
      aria-labelledby={id}
      className="border-line grid scroll-mt-28 grid-cols-[minmax(0,1fr)] gap-6 border-t py-14 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12 md:py-20"
    >
      <div>
        <Reveal as="p" className="label-mono text-muted mb-3 text-[11px]">
          {String(idx + 1).padStart(2, "0")} · {phases[idx]?.label}
        </Reveal>
        <RevealLines
          id={id}
          as="h2"
          className="font-display text-step-3 leading-[.95] uppercase"
          lines={[title]}
        />
      </div>
      <Reveal variant="rise" className="case-prose">
        {children}
      </Reveal>
    </section>
  );
}
