import { lighthouse } from "@/content/pt/devdata";
import { Reveal } from "@/components/motion/Reveal";

/** Barras horizontais 0–100. Sem medição → trilho tracejado e "a medir" (nunca um número estimado). */
export function LighthouseBars() {
  return (
    <Reveal variant="none" className="lh-bars">
      <ul className="grid gap-3.5">
        {lighthouse.map((row, i) => (
          <li
            key={row.project}
            className="grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)_4rem] items-center gap-3 text-sm"
          >
            <span className="truncate">{row.project}</span>
            {typeof row.score === "number" ? (
              <span className="bg-bg relative h-3 overflow-hidden rounded-full" aria-hidden="true">
                <span
                  className="lh-fill absolute inset-y-0 left-0 rounded-full bg-[var(--chart-line)]"
                  style={{ width: `${row.score}%`, ["--k" as string]: i }}
                />
              </span>
            ) : (
              <span
                className="border-line h-3 rounded-full border-[1.5px] border-dashed"
                aria-hidden="true"
              />
            )}
            <span className="text-right font-mono text-xs whitespace-nowrap tabular-nums">
              {typeof row.score === "number" ? (
                row.score
              ) : (
                <span className="text-muted">a medir</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
