import { Reveal } from "@/components/motion/Reveal";

export type Decision = { title: string; principle: string; text: string };

/** Cada escolha de UX com o princípio por trás (hierarquia: princípio em destaque mono) */
export function Decisions({ items }: { items: Decision[] }) {
  return (
    <ul className="not-prose mt-2 grid gap-3 sm:grid-cols-2">
      {items.map((d, i) => (
        <li key={d.title}>
          <Reveal variant="pop" delay={i} className="h-full">
            <article className="bg-surface flex h-full flex-col gap-2 rounded-[24px] p-5 shadow-[6px_8px_0_-2px_var(--shadow)]">
              <span className="bg-select w-fit rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[.12em] text-white uppercase">
                {d.principle}
              </span>
              <h3 className="text-lg leading-snug font-bold">{d.title}</h3>
              <p className="text-muted text-[0.9375rem] leading-relaxed">{d.text}</p>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
