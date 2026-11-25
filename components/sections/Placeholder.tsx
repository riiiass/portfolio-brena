/** Seções que chegam nas próximas fases — já existem para a nav funcionar */
export function Placeholder({
  id,
  title,
  phase,
  tone = "bg",
}: {
  id: string;
  title: string;
  phase: string;
  tone?: "bg" | "band" | "block";
}) {
  const cls = tone === "band" ? "bg-band" : tone === "block" ? "bg-block text-on-block" : "";
  return (
    <section
      id={id}
      data-bg={tone === "bg" ? "paper" : tone}
      aria-labelledby={`${id}-t`}
      className={`px-4 py-28 md:px-8 ${cls}`}
    >
      <div className="mx-auto max-w-[1180px]">
        <p className="label-mono mb-4 text-[11px] opacity-70">{phase}</p>
        <h2 id={`${id}-t`} className="font-display text-step-4 leading-[.9] uppercase">
          {title}
        </h2>
      </div>
    </section>
  );
}
