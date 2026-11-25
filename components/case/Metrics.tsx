import { Counter } from "@/components/motion/Counter";

export type Metric = {
  label: string;
  value?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

/** Resultados em pílulas com borda. Sem valor real → placeholder explícito (nunca inventar números). */
export function Metrics({
  items,
  todo = "TODO: Brena preencher",
}: {
  items: Metric[];
  todo?: string;
}) {
  return (
    <ul className="not-prose mt-2 flex flex-wrap gap-3">
      {items.map((m) => (
        <li
          key={m.label}
          className="border-fg flex min-w-[180px] flex-1 flex-col gap-1 rounded-[28px] border-[1.5px] px-6 py-5"
        >
          <span className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-none">
            {typeof m.value === "number" ? (
              <Counter value={m.value} decimals={m.decimals} prefix={m.prefix} suffix={m.suffix} />
            ) : (
              <span className="text-muted">—</span>
            )}
          </span>
          <span className="text-muted text-sm">{m.label}</span>
          {typeof m.value !== "number" ? (
            <span className="text-muted font-mono text-[10px] tracking-[.1em] uppercase">
              {todo}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
