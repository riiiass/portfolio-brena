"use client";

import { useState } from "react";
import type { LangSlice } from "@/lib/github";
import { chartOther, chartPalette } from "@/content/pt/devdata";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/use-locale";
import { getContent } from "@/content";

const R = 64;
const C = 2 * Math.PI * R;

/** Rosca de linguagens (linguagem principal de cada repositório público). 6+ itens viram "Outras". */
export function Donut({ data }: { data: LangSlice[] }) {
  const t = getContent(useLocale()).t;
  const [hover, setHover] = useState<number | null>(null);
  const top = data.slice(0, 5);
  const rest = data.slice(5).reduce((s, d) => s + d.repos, 0);
  const slices = [
    ...top.map((d, i) => ({ ...d, color: chartPalette[i]! })),
    ...(rest ? [{ name: t.others, repos: rest, color: chartOther }] : []),
  ];
  const total = slices.reduce((s, d) => s + d.repos, 0) || 1;
  const GAP = 2.5; // espaço da cor da superfície entre fatias

  let acc = 0;
  const arcs = slices.map((s) => {
    const len = (s.repos / total) * C;
    const arc = {
      ...s,
      len: Math.max(len - GAP, 0.5),
      offset: -acc,
      pct: Math.round((s.repos / total) * 100),
    };
    acc += len;
    return arc;
  });

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center lg:flex-col xl:flex-row">
      <Reveal variant="none" className="donut relative shrink-0">
        <svg width="172" height="172" viewBox="0 0 172 172" role="img" aria-label={t.donutAria}>
          <g transform="rotate(-90 86 86)">
            {arcs.map((a, i) => (
              <circle
                key={a.name}
                cx="86"
                cy="86"
                r={R}
                fill="none"
                stroke={a.color}
                strokeWidth={hover === i ? 26 : 20}
                strokeDasharray={`${a.len} ${C}`}
                strokeDashoffset={a.offset}
                className="donut-arc transition-[stroke-width,opacity] duration-300"
                style={{
                  ["--len" as string]: `${a.len}`,
                  ["--k" as string]: i,
                  opacity: hover === null || hover === i ? 1 : 0.35,
                }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              />
            ))}
          </g>
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-display text-3xl leading-none">
            {hover === null ? total : arcs[hover]?.pct + "%"}
          </span>
          <span className="text-muted mt-1 max-w-[90px] text-[11px] leading-tight">
            {hover === null ? t.donutCenter : arcs[hover]?.name}
          </span>
        </div>
      </Reveal>
      <ul className="grid w-full gap-1.5" aria-label={t.devLangTitle}>
        {arcs.map((a, i) => (
          <li key={a.name}>
            <button
              type="button"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className={cn(
                "flex min-h-9 w-full items-center gap-2.5 rounded-xl px-2 text-left text-sm transition-colors",
                hover === i ? "bg-bg" : "",
              )}
            >
              <span
                className="size-3 shrink-0 rounded-[4px]"
                style={{ background: a.color }}
                aria-hidden="true"
              />
              <span className="flex-1">{a.name}</span>
              <span className="text-muted whitespace-nowrap tabular-nums">
                {a.repos} {t.repo(a.repos)} · {a.pct}%
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
