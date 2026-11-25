"use client";

import { useEffect, useRef, useState } from "react";
import type { Contribution } from "@/lib/github";
import { Reveal } from "@/components/motion/Reveal";
import { ChartTooltip } from "./Tooltip";

const CELL = 11;
const GAP = 3;
const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

/** Calendário de contribuições: as colunas acendem da esquerda para a direita ao entrar (orientação: tempo →) */
export function Heatmap({ days }: { days: Contribution[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{ x: number; y: number; d: Contribution } | null>(null);

  // começa mostrando os meses mais recentes no celular (depois do layout)
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const toEnd = () => {
      el.scrollLeft = el.scrollWidth;
    };
    const raf = requestAnimationFrame(toEnd);
    const ro = new ResizeObserver(toEnd);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const firstDow = new Date(`${days[0]?.date}T12:00:00Z`).getUTCDay();
  const cells = days.map((d, i) => {
    const idx = i + firstDow;
    return { d, col: Math.floor(idx / 7), row: idx % 7 };
  });
  const cols = (cells.at(-1)?.col ?? 0) + 1;
  const width = cols * (CELL + GAP);
  const height = 7 * (CELL + GAP) + 18;

  const monthMarks: { col: number; label: string }[] = [];
  cells.forEach((c) => {
    const date = new Date(`${c.d.date}T12:00:00Z`);
    if (date.getUTCDate() <= 7 && c.row === 0)
      monthMarks.push({ col: c.col, label: MONTHS[date.getUTCMonth()]! });
  });

  return (
    <div className="relative">
      <div ref={wrap} className="[scrollbar-width:thin] overflow-x-auto pb-2">
        <Reveal variant="none" className="heatmap">
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="max-w-none"
            role="img"
            aria-label="Calendário de contribuições no GitHub dos últimos 12 meses (os dados estão na tabela abaixo)"
            onMouseLeave={() => setTip(null)}
          >
            {monthMarks.map((m) => (
              <text
                key={`${m.col}-${m.label}`}
                x={m.col * (CELL + GAP)}
                y={10}
                className="fill-muted font-mono text-[9px]"
              >
                {m.label}
              </text>
            ))}
            {cells.map(({ d, col, row }) => (
              <rect
                key={d.date}
                x={col * (CELL + GAP)}
                y={18 + row * (CELL + GAP)}
                width={CELL}
                height={CELL}
                rx={3}
                fill={`var(--heat-${d.level})`}
                className="hm-cell"
                style={{ ["--c" as string]: col }}
                onMouseEnter={(e) => {
                  const box = wrap.current!.getBoundingClientRect();
                  const r = (e.target as SVGRectElement).getBoundingClientRect();
                  setTip({ x: r.left - box.left + r.width / 2, y: r.top - box.top, d });
                }}
              />
            ))}
          </svg>
        </Reveal>
      </div>
      {tip ? (
        <ChartTooltip x={tip.x} y={tip.y}>
          <strong>{tip.d.count}</strong> {tip.d.count === 1 ? "contribuição" : "contribuições"} ·{" "}
          {fmtDate(tip.d.date)}
        </ChartTooltip>
      ) : null}
      <div
        className="text-muted mt-2 flex items-center justify-end gap-1.5 font-mono text-[10px]"
        aria-hidden="true"
      >
        menos
        {[0, 1, 2, 3, 4].map((l) => (
          <span
            key={l}
            className="size-[11px] rounded-[3px]"
            style={{ background: `var(--heat-${l})` }}
          />
        ))}
        mais
      </div>
    </div>
  );
}
