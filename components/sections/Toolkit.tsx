import { toolkit } from "@/content/pt/toolkit";
import { certifications, type Cert } from "@/content/pt/certifications";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

const tone: Record<Cert["tone"], string> = {
  blue: "bg-folder-blue",
  pink: "bg-folder-pink",
  lime: "bg-folder-lime",
  orange: "bg-folder-orange",
};

/** Selo circular com texto em volta (ref. A) */
function Seal({ issuer }: { issuer: string }) {
  const id = `seal-${issuer.replace(/\W+/g, "")}`;
  const text = `${issuer.toUpperCase()} ✦ CERTIFICADO ✦ `;
  return (
    <svg viewBox="0 0 100 100" className="size-[72px] shrink-0" aria-hidden="true">
      <defs>
        <path id={id} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
      </defs>
      <circle cx="50" cy="50" r="48" className="fill-ink" />
      <text className="fill-paper font-mono text-[8.5px] tracking-[.18em]">
        <textPath href={`#${id}`} textLength="236">
          {text}
        </textPath>
      </text>
      <text x="50" y="58" textAnchor="middle" className="fill-paper text-[24px]">
        ✦
      </text>
    </svg>
  );
}

export function Toolkit() {
  const featured = certifications.filter((c) => c.featured);
  const others = certifications.filter((c) => !c.featured);

  return (
    <section
      id="toolkit"
      data-bg="paper"
      aria-labelledby="toolkit-t"
      className="mx-auto max-w-[1180px] px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mb-10">
        <Reveal as="p" className="label-mono mb-3 text-[11px]">
          Toolkit
        </Reveal>
        <RevealLines
          id="toolkit-t"
          className="font-display text-step-4 leading-[.9] uppercase"
          lines={[
            <>
              Minha{" "}
              <span className="font-script text-accent text-[1.3em] leading-[.6] normal-case">
                caixa
              </span>{" "}
              de ferramentas
            </>,
          ]}
        />
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
        {toolkit.map((g, gi) => (
          <Reveal
            key={g.group}
            variant="rise"
            delay={gi}
            className="border-line rounded-[28px] border-[1.5px] p-5"
          >
            <h3 className="label-mono text-muted mb-4 text-[11px]">{g.group}</h3>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((t) => (
                <li
                  key={t}
                  className="tool-pill bg-surface rounded-full px-3.5 py-2 text-sm shadow-[4px_5px_0_-1px_var(--shadow)]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <h3 className="text-step-3 mt-16 mb-6 font-serif leading-none">Certificações</h3>
      <ul className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-3">
        {featured.map((c, i) => (
          <li key={c.title}>
            <Reveal variant="pop" delay={i} className="h-full">
              <article
                className={cn(
                  "on-light flex h-full flex-col gap-4 rounded-[28px] p-5",
                  tone[c.tone],
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <Seal issuer={c.issuer.split(" · ")[0]!} />
                  <span className="bg-paper rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[.12em] uppercase">
                    {c.date}
                  </span>
                </div>
                <h4 className="font-display text-[1.6rem] leading-[1.02] uppercase">{c.title}</h4>
                <p className="text-sm">{c.issuer}</p>
                {c.verifyUrl ? (
                  <a
                    href={c.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="verificar"
                    className="bg-ink text-paper mt-auto inline-flex min-h-11 w-fit items-center gap-2 rounded-full px-4 text-sm font-medium transition-transform active:scale-[.97]"
                  >
                    Verificar credencial <Icon name="arrowUpRight" size={16} />
                    <span className="sr-only">(abre em nova aba)</span>
                  </a>
                ) : null}
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
      <Reveal
        as="ul"
        variant="rise"
        className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-2 sm:grid-cols-2"
      >
        {others.map((c) => (
          <li key={c.title} className="bg-surface flex items-center gap-3 rounded-2xl px-4 py-3">
            <span className={cn("size-3 shrink-0 rounded-full", tone[c.tone])} aria-hidden="true" />
            <span className="flex-1 text-sm">
              <strong className="font-bold">{c.title}</strong>
              <span className="text-muted block">
                {c.issuer} · {c.date}
                {c.hours ? ` · ${c.hours}` : ""}
              </span>
            </span>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
