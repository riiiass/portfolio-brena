"use client";

/** Tooltip visual (o mesmo conteúdo está na tabela acessível de cada gráfico) */
export function ChartTooltip({
  x,
  y,
  children,
}: {
  x: number | string;
  y: number | string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="presentation"
      className="bg-fg text-bg pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] rounded-xl px-3 py-2 text-xs whitespace-nowrap shadow-lg"
      style={{ left: x, top: y }}
    >
      {children}
    </div>
  );
}

/** Tabela com os dados do gráfico (WCAG: nunca só cor/forma) */
export function DataTable({
  caption,
  head,
  rows,
}: {
  caption: string;
  head: string[];
  rows: (string | number)[][];
}) {
  return (
    <details className="mt-3 text-sm">
      <summary className="border-line inline-flex min-h-9 cursor-pointer items-center rounded-full border px-3 font-mono text-[11px] tracking-[.1em] uppercase">
        Ver como tabela
      </summary>
      <div className="border-line mt-3 max-h-64 overflow-auto rounded-2xl border">
        <table className="w-full text-left">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-surface sticky top-0">
            <tr>
              {head.map((h) => (
                <th key={h} scope="col" className="px-3 py-2 font-mono text-[11px] font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-line border-t">
                {r.map((c, j) => (
                  <td key={j} className="px-3 py-1.5 tabular-nums">
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
