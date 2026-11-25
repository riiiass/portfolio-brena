import type { CSSProperties } from "react";
import type { ServiceId } from "@/content/pt/services";
import { getContent } from "@/content";
import type { Locale } from "@/lib/i18n";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { Tilt } from "@/components/motion/Tilt";
import { cn } from "@/lib/cn";

const k = (n: number) => ({ ["--k" as string]: n }) as CSSProperties;

/** Cada serviço tem uma mini-animação que explica o que ele é (hierarquia + deleite) */
function Illustration({ id }: { id: ServiceId }) {
  switch (id) {
    case "front":
      return (
        <div className="grid h-full grid-cols-3 gap-2 p-3.5" aria-hidden="true">
          <span data-anim="block" style={k(0)} className="bg-folder-blue col-span-3 rounded-md" />
          <span data-anim="block" style={k(1)} className="bg-fg rounded-md" />
          <span data-anim="block" style={k(2)} className="bg-folder-pink col-span-2 rounded-md" />
          <span data-anim="block" style={k(3)} className="bg-folder-lime col-span-2 rounded-md" />
          <span data-anim="block" style={k(4)} className="bg-folder-orange rounded-md" />
        </div>
      );
    case "back":
      return (
        <div
          className="flex h-full flex-col justify-center gap-0.5 p-4 font-mono text-xs leading-relaxed"
          aria-hidden="true"
        >
          <span data-anim="type" style={k(0)} className="text-folder-lime">
            POST /api/pedidos
          </span>
          <span data-anim="type" style={k(1)}>
            → <span data-anim="status">201 Created</span>
          </span>
          <span data-anim="type" style={k(2)} className="text-folder-blue">
            {'{ id, status: "pago" }'}
          </span>
        </div>
      );
    case "db":
      return (
        <div
          className="flex h-full items-center justify-center gap-0 p-3.5 font-mono text-[10px]"
          aria-hidden="true"
        >
          <div className="border-fg w-[76px] overflow-hidden rounded-lg border-[1.5px]">
            <div className="bg-folder-orange text-ink px-1.5 py-1">users</div>
            <div className="px-1.5 py-0.5">id</div>
            <div className="px-1.5 py-0.5">email</div>
          </div>
          <svg width="48" height="20" viewBox="0 0 48 20" className="text-fg">
            <path
              data-anim="draw"
              d="M0 10 H48"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="44" cy="10" r="3" fill="currentColor" />
          </svg>
          <div className="border-fg w-[76px] overflow-hidden rounded-lg border-[1.5px]">
            <div className="bg-folder-lime text-ink px-1.5 py-1">orders</div>
            <div className="px-1.5 py-0.5">id</div>
            <div className="px-1.5 py-0.5">user_id</div>
          </div>
        </div>
      );
    case "research":
      return (
        <div className="flex h-full items-center justify-center gap-3 p-3.5" aria-hidden="true">
          <span
            data-anim="pop"
            className="text-ink rounded-[14px_14px_14px_4px] bg-white px-3 py-2 text-[13px]"
          >
            “Não achei o botão…”
          </span>
          <svg
            data-anim="lens"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </div>
      );
    case "ui":
      return (
        <div className="flex h-full items-center justify-center gap-2.5 p-3.5" aria-hidden="true">
          {["bg-folder-pink", "bg-folder-orange", "bg-folder-blue", "bg-folder-lime"].map(
            (c, i) => (
              <span
                key={c}
                data-anim="swatch"
                style={k(i)}
                className={cn("size-8 rounded-full", c)}
              />
            ),
          )}
          <span data-anim="swatch" style={k(4)} className="font-display text-[34px] leading-none">
            Aa
          </span>
        </div>
      );
    case "a11y":
      return (
        <div className="flex h-full items-center justify-center p-3.5" aria-hidden="true">
          <div className="relative flex gap-2" style={{ ["--step" as string]: "86px" }}>
            {["Início", "Projetos", "Contato"].map((t) => (
              <span
                key={t}
                className="text-ink w-[78px] rounded-full bg-white py-2 text-center text-[13px]"
              >
                {t}
              </span>
            ))}
            <span
              data-anim="ring"
              className="outline-select pointer-events-none absolute top-0 left-0 h-full w-[78px] rounded-full outline-[2.5px] outline-offset-[3px] outline-solid"
            />
          </div>
        </div>
      );
  }
}

const tones = {
  surface: "bg-surface text-fg shadow-[8px_10px_0_-2px_var(--shadow)]",
  block: "bg-block text-on-block border border-line",
  pink: "on-light bg-folder-pink",
  lime: "on-light bg-folder-lime",
};

export function Services({ locale }: { locale: Locale }) {
  const { services, t } = getContent(locale);
  return (
    <section
      data-bg="paper"
      aria-labelledby="servicos-t"
      className="mx-auto max-w-[1180px] px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4" data-exit="compress">
        <RevealLines
          id="servicos-t"
          className="font-display text-step-4 leading-[.9] uppercase"
          lines={[
            <>
              {t.servicesTitle}{" "}
              <span className="font-script text-accent text-[1.3em] leading-[.6] normal-case">
                {t.servicesScript}
              </span>
            </>,
          ]}
        />
        <p className="label-mono text-[11px]">{t.servicesLabel}</p>
      </div>
      <ul className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <li key={s.id}>
            <Reveal variant="rise" delay={i % 3} className="svc h-full">
              <Tilt className="h-full">
                <article
                  className={cn("flex h-full flex-col gap-3.5 rounded-[28px] p-6", tones[s.tone])}
                >
                  <div
                    className={cn(
                      "h-[120px] overflow-hidden rounded-[18px]",
                      s.tone === "block" ? "bg-block-2" : "bg-bg",
                    )}
                  >
                    <Illustration id={s.id} />
                  </div>
                  <h3 className="font-display text-[1.875rem] leading-none uppercase">{s.title}</h3>
                  <p
                    className={cn(
                      "text-[0.9375rem] leading-relaxed",
                      s.tone === "surface" ? "text-muted" : "opacity-90",
                    )}
                  >
                    {s.text}
                  </p>
                </article>
              </Tilt>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
