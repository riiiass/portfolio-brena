import "server-only";

/**
 * Dados públicos do GitHub, buscados no servidor com cache ISR de 24h.
 * Em qualquer falha devolve null — a interface mostra um estado vazio honesto,
 * nunca números inventados.
 */

export type Contribution = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type LangSlice = { name: string; repos: number };
export type DevData = {
  source: "live" | "fixture";
  fetchedAt: string;
  totalLastYear: number | null;
  contributions: Contribution[] | null;
  publicRepos: number | null;
  languages: LangSlice[] | null;
};

const DAY = 60 * 60 * 24;

async function getJson<T>(url: string, headers: Record<string, string> = {}): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers,
      next: { revalidate: DAY },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getDevData(user: string): Promise<DevData> {
  if (process.env.DEVDATA_FIXTURE === "1") {
    const { fixture } = await import("./devdata-fixture");
    return fixture();
  }

  const ghHeaders: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) ghHeaders.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const [contrib, repos] = await Promise.all([
    // API pública que lê o calendário de contribuições do perfil
    getJson<{ total: Record<string, number>; contributions: Contribution[] }>(
      `https://github-contributions-api.jogruber.de/v4/${user}?y=last`,
    ),
    getJson<{ language: string | null; fork: boolean }[]>(
      `https://api.github.com/users/${user}/repos?per_page=100&type=owner`,
      ghHeaders,
    ),
  ]);

  let languages: LangSlice[] | null = null;
  if (repos) {
    const counts = new Map<string, number>();
    for (const r of repos)
      if (!r.fork && r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
    languages = [...counts.entries()]
      .map(([name, n]) => ({ name, repos: n }))
      .sort((a, b) => b.repos - a.repos);
  }

  return {
    source: "live",
    fetchedAt: new Date().toISOString(),
    totalLastYear: contrib?.total?.lastYear ?? null,
    contributions: contrib?.contributions ?? null,
    publicRepos: repos ? repos.filter((r) => !r.fork).length : null,
    languages,
  };
}
