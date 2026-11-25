import { getDevData } from "@/lib/github";
import { site } from "@/lib/site";
import { lighthouse } from "@/content/pt/devdata";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { WindowFrame } from "@/components/ui/Window";
import { Heatmap } from "@/components/devdata/Heatmap";
import { Donut } from "@/components/devdata/Donut";
import { MonthlyLine } from "@/components/devdata/MonthlyLine";
import { monthLabel, monthlyTotals } from "@/lib/devdata-utils";
import { LighthouseBars } from "@/components/devdata/LighthouseBars";
import { DataTable } from "@/components/devdata/Tooltip";

function Empty({ what }: { what: string }) {
  return (
    <p className="border-line text-muted flex min-h-40 items-center justify-center rounded-2xl border-[1.5px] border-dashed p-6 text-center text-sm">
      Não foi possível carregar {what} agora. Os dados vêm do GitHub e são atualizados uma vez por
      dia.
    </p>
  );
}

function Stat({ value, label }: { value: number | null; label: string }) {
  return (
    <div className="border-fg flex flex-col gap-1 rounded-[24px] border-[1.5px] px-5 py-4">
      <span className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-none">
        {value === null ? <span className="text-muted">—</span> : <Counter value={value} />}
      </span>
      <span className="text-muted text-sm">{label}</span>
    </div>
  );
}

export async function DevData() {
  const data = await getDevData(site.githubUser);
  const busiest = data.contributions
    ? monthlyTotals(data.contributions).reduce((a, b) => (b.total > a.total ? b : a), {
        month: "",
        total: -1,
      })
    : null;

  return (
    <section
      id="dados"
      data-bg="paper"
      aria-labelledby="dados-t"
      className="mx-auto max-w-[1180px] px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Reveal as="p" className="label-mono mb-3 text-[11px]">
            Dados de dev
          </Reveal>
          <RevealLines
            id="dados-t"
            className="font-display text-step-4 leading-[.9] uppercase"
            lines={[
              <>
                Código em{" "}
                <span className="font-script text-accent text-[1.3em] leading-[.6] normal-case">
                  números
                </span>
              </>,
            ]}
          />
        </div>
        <a
          href={site.social.github}
          target="_blank"
          rel="noreferrer"
          className="border-fg inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] px-4 text-sm font-medium"
        >
          github.com/{site.githubUser} ↗
        </a>
      </div>

      {data.source === "fixture" ? (
        <p
          role="note"
          className="bg-folder-orange text-ink mb-6 rounded-2xl px-4 py-3 font-mono text-xs"
        >
          DADOS DE EXEMPLO — ambiente local sem acesso ao GitHub. Em produção estes gráficos usam os
          dados reais.
        </p>
      ) : null}

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat value={data.totalLastYear} label="contribuições nos últimos 12 meses" />
        <Stat value={data.publicRepos} label="repositórios públicos" />
        <Stat value={data.languages?.length ?? null} label="linguagens nos repositórios" />
        <div className="bg-block text-on-block flex flex-col gap-1 rounded-[24px] px-5 py-4">
          <span className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-none">
            {busiest && busiest.total > 0 ? monthLabel(busiest.month) : "—"}
          </span>
          <span className="text-sm text-[#cfc9c0]">mês mais ativo</span>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <WindowFrame title="contribuicoes.svg">
          <div className="p-5">
            <h3 className="text-step-1 mb-4 font-serif">Contribuições no GitHub</h3>
            {data.contributions ? (
              <>
                <Heatmap days={data.contributions} />
                <DataTable
                  caption="Contribuições por mês"
                  head={["Mês", "Contribuições"]}
                  rows={monthlyTotals(data.contributions).map((m) => [
                    monthLabel(m.month),
                    m.total,
                  ])}
                />
              </>
            ) : (
              <Empty what="o calendário de contribuições" />
            )}
          </div>
        </WindowFrame>

        <WindowFrame title="linguagens.svg">
          <div className="p-5">
            <h3 className="text-step-1 mb-4 font-serif">Linguagens</h3>
            {data.languages?.length ? (
              <Donut data={data.languages} />
            ) : (
              <Empty what="as linguagens" />
            )}
            <p className="text-muted mt-3 text-xs">
              Linguagem principal de cada repositório público (sem forks).
            </p>
          </div>
        </WindowFrame>

        <WindowFrame title="evolucao.svg">
          <div className="p-5">
            <h3 className="text-step-1 mb-4 font-serif">Evolução mês a mês</h3>
            {data.contributions ? (
              <MonthlyLine days={data.contributions} />
            ) : (
              <Empty what="a evolução mensal" />
            )}
          </div>
        </WindowFrame>

        <WindowFrame title="lighthouse.svg">
          <div className="p-5">
            <h3 className="text-step-1 mb-1 font-serif">Lighthouse · performance</h3>
            <p className="text-muted mb-5 text-xs">Nota de 0 a 100, medida no celular.</p>
            <LighthouseBars />
            <DataTable
              caption="Lighthouse por projeto"
              head={["Projeto", "Performance"]}
              rows={lighthouse.map((l) => [
                l.project,
                typeof l.score === "number" ? l.score : "a medir",
              ])}
            />
          </div>
        </WindowFrame>
      </div>
    </section>
  );
}
