"use client";

import { useState } from "react";
import type { Contribution } from "@/lib/github";
import { Reveal } from "@/components/motion/Reveal";
import { ChartTooltip } from "./Tooltip";
import { monthLabel, monthlyTotals } from "@/lib/devdata-utils";
import { useLocale } from "@/lib/use-locale";
import { getContent } from "@/content";

const W = 560;
const H = 200;
const PAD = { l: 34, r: 12, t: 16, b: 26 };

/** Linha de evolução mensal: o traço se desenha ao entrar; crosshair + tooltip no hover/foco */
export function MonthlyLine({ days }: { days: Contribution[] }) {
  const t = getContent(useLocale()).t;
  const data = monthlyTotals(days).slice(-12);
  const [i, setI] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => d.total), 1);
  const niceMax = Math.ceil(max / 10) * 10 || 10;
  const x = (k: number) => PAD.l + (k * (W - PAD.l - PAD.r)) / Math.max(data.length - 1, 1);
  const y = (v: number) => PAD.t + (1 - v / niceMax) * (H - PAD.t - PAD.b);
  const d = data.map((p, k) => `${k ? "L" : "M"}${x(k)},${y(p.total)}`).join(" ");
  const ticks = [0, niceMax / 2, niceMax];
  const cur = i === null ? null : data[i];

  return (
    <div className="relative">
      <Reveal variant="none" className="linechart">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label={t.lineAria}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const px = ((e.clientX - r.left) / r.width) * W;
            const k = Math.round(((px - PAD.l) / (W - PAD.l - PAD.r)) * (data.length - 1));
            setI(Math.max(0, Math.min(data.length - 1, k)));
          }}
          onMouseLeave={() => setI(null)}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line
                x1={PAD.l}
                x2={W - PAD.r}
                y1={y(t)}
                y2={y(t)}
                stroke="var(--chart-grid)"
                strokeWidth="1"
              />
              <text
                x={PAD.l - 8}
                y={y(t) + 3}
                textAnchor="end"
                className="fill-muted font-mono text-[10px]"
              >
                {t}
              </text>
            </g>
          ))}
          {data.map((p, k) =>
            k % 2 === 0 || k === data.length - 1 ? (
              <text
                key={p.month}
                x={x(k)}
                y={H - 6}
                textAnchor={k === data.length - 1 ? "end" : k === 0 ? "start" : "middle"}
                className="fill-muted font-mono text-[10px]"
              >
                {monthLabel(p.month, t.months)}
              </text>
            ) : null,
          )}
          <path
            d={d}
            fill="none"
            stroke="var(--chart-line)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            pathLength={1}
            className="line-path"
          />
          {cur && i !== null ? (
            <g>
              <line
                x1={x(i)}
                x2={x(i)}
                y1={PAD.t}
                y2={H - PAD.b}
                stroke="var(--fg)"
                strokeOpacity=".25"
                strokeDasharray="3 3"
              />
              <circle
                cx={x(i)}
                cy={y(cur.total)}
                r="5"
                fill="var(--chart-line)"
                stroke="var(--surface)"
                strokeWidth="2"
              />
            </g>
          ) : null}
        </svg>
      </Reveal>
      {cur && i !== null ? (
        <ChartTooltip x={`${(x(i) / W) * 100}%`} y={`${(y(cur.total) / H) * 100}%`}>
          <strong>{cur.total}</strong> {t.inMonth} {monthLabel(cur.month, t.months)}
        </ChartTooltip>
      ) : null}
    </div>
  );
}
