import { getDevData } from "@/lib/github";
import { site } from "@/lib/site";
import { getContent } from "@/content";
import type { Locale } from "@/lib/i18n";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { WindowFrame } from "@/components/ui/Window";
import { Heatmap } from "@/components/devdata/Heatmap";
import { Donut } from "@/components/devdata/Donut";
import { MonthlyLine } from "@/components/devdata/MonthlyLine";
import { monthLabel, monthlyTotals } from "@/lib/devdata-utils";
import { LighthouseBars } from "@/components/devdata/LighthouseBars";
import { DataTable } from "@/components/devdata/Tooltip";

function Empty({ text }: { text: string }) {
  return (
    <p className="border-line text-muted flex min-h-40 items-center justify-center rounded-2xl border-[1.5px] border-dashed p-6 text-center text-sm">
      {text}
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

export async function DevData({ locale }: { locale: Locale }) {
  const { lighthouse, t } = getContent(locale);
  const month = (ym: string) => monthLabel(ym, t.months);
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
            {t.devLabel}
          </Reveal>
          <RevealLines
            id="dados-t"
            className="font-display text-step-4 leading-[.9] uppercase"
            lines={[
              <>
                {t.devTitle}{" "}
                <span className="font-script text-accent text-[1.3em] leading-[.6] normal-case">
                  {t.devScript}
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
          {t.devFixture}
        </p>
      ) : null}

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat value={data.totalLastYear} label={t.devContrib} />
        <Stat value={data.publicRepos} label={t.devRepos} />
        <Stat value={data.languages?.length ?? null} label={t.devLangs} />
        <div className="bg-block text-on-block flex flex-col gap-1 rounded-[24px] px-5 py-4">
          <span className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-none">
            {busiest && busiest.total > 0 ? month(busiest.month) : "—"}
          </span>
          <span className="text-sm text-[#cfc9c0]">{t.devBusiest}</span>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <WindowFrame title="contribuicoes.svg">
          <div className="p-5">
            <h3 className="text-step-1 mb-4 font-serif">{t.devHeatTitle}</h3>
            {data.contributions ? (
              <>
                <Heatmap days={data.contributions} />
                <DataTable
                  caption={t.tableContrib}
                  toggle={t.seeTable}
                  head={[t.tableMonth, t.tableContrib]}
                  rows={monthlyTotals(data.contributions).map((m) => [month(m.month), m.total])}
                />
              </>
            ) : (
              <Empty text={t.devEmpty(t.devHeatWhat)} />
            )}
          </div>
        </WindowFrame>

        <WindowFrame title="linguagens.svg">
          <div className="p-5">
            <h3 className="text-step-1 mb-4 font-serif">{t.devLangTitle}</h3>
            {data.languages?.length ? (
              <Donut data={data.languages} />
            ) : (
              <Empty text={t.devEmpty(t.devLangWhat)} />
            )}
            <p className="text-muted mt-3 text-xs">{t.devLangNote}</p>
          </div>
        </WindowFrame>

        <WindowFrame title="evolucao.svg">
          <div className="p-5">
            <h3 className="text-step-1 mb-4 font-serif">{t.devLineTitle}</h3>
            {data.contributions ? (
              <MonthlyLine days={data.contributions} />
            ) : (
              <Empty text={t.devEmpty(t.devLineWhat)} />
            )}
          </div>
        </WindowFrame>

        <WindowFrame title="lighthouse.svg">
          <div className="p-5">
            <h3 className="text-step-1 mb-1 font-serif">{t.devLhTitle}</h3>
            <p className="text-muted mb-5 text-xs">{t.devLhNote}</p>
            <LighthouseBars locale={locale} />
            <DataTable
              caption={t.devLhTitle}
              toggle={t.seeTable}
              head={[t.tableProject, t.tablePerf]}
              rows={lighthouse.map((l) => [
                l.project,
                typeof l.score === "number" ? l.score : t.toMeasure,
              ])}
            />
          </div>
        </WindowFrame>
      </div>
    </section>
  );
}
