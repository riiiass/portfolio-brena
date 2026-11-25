import type { Contribution, DevData } from "./github";

/**
 * SÓ PARA DESENVOLVIMENTO LOCAL (DEVDATA_FIXTURE=1), quando a rede não alcança o GitHub.
 * A interface mostra um aviso "dados de exemplo" sempre que esta fonte é usada.
 */
export function fixture(): DevData {
  const days: Contribution[] = [];
  const end = new Date("2026-11-24T00:00:00Z");
  let seed = 7;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  for (let i = 364; i >= 0; i--) {
    const d = new Date(end.getTime() - i * 86400000);
    const busy = d.getUTCMonth() >= 5 ? 1.6 : 0.7;
    const count = rnd() < 0.35 ? 0 : Math.round(rnd() * 6 * busy);
    const level = (
      count === 0 ? 0 : count < 3 ? 1 : count < 5 ? 2 : count < 8 ? 3 : 4
    ) as Contribution["level"];
    days.push({ date: d.toISOString().slice(0, 10), count, level });
  }
  return {
    source: "fixture",
    fetchedAt: end.toISOString(),
    totalLastYear: days.reduce((s, d) => s + d.count, 0),
    contributions: days,
    publicRepos: 9,
    languages: [
      { name: "TypeScript", repos: 4 },
      { name: "JavaScript", repos: 2 },
      { name: "HTML", repos: 1 },
      { name: "Python", repos: 1 },
      { name: "Java", repos: 1 },
    ],
  };
}
