import type { Contribution } from "./github";

export function monthlyTotals(days: Contribution[]) {
  const map = new Map<string, number>();
  for (const d of days) {
    const key = d.date.slice(0, 7);
    map.set(key, (map.get(key) ?? 0) + d.count);
  }
  return [...map.entries()].map(([month, total]) => ({ month, total }));
}

const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
/** "2026-08" → "ago/26" (ou "aug/26" com os meses em inglês) */
export const monthLabel = (ym: string, months: readonly string[] = MONTHS) =>
  `${months[Number(ym.slice(5, 7)) - 1]}/${ym.slice(2, 4)}`;
