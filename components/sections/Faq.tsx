"use client";

import { AnimatePresence, m } from "motion/react";
import { useId, useState } from "react";
import { getContent } from "@/content";
import { useLocale } from "@/lib/use-locale";
import { usePrefs } from "@/components/providers/Preferences";
import { RevealLines } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/** Acordeão acessível (button + aria-expanded + aria-controls); a altura anima, o + gira para × */
export function Faq() {
  const { faq, t } = getContent(useLocale());
  const [open, setOpen] = useState<number | null>(0);
  const { reducedMotion } = usePrefs();
  const base = useId();

  return (
    <section
      id="faq"
      data-bg="paper"
      aria-labelledby="faq-t"
      className="mx-auto max-w-[900px] px-4 py-24 md:px-8 md:py-32"
    >
      <RevealLines
        id="faq-t"
        className="font-display text-step-4 mb-10 text-center leading-[.9] uppercase"
        lines={[
          <>
            {t.faqTitle}{" "}
            <span className="font-script text-accent text-[1.3em] leading-[.6] normal-case">
              {t.faqScript}
            </span>
          </>,
        ]}
      />
      <ul className="flex flex-col gap-3">
        {faq.map((item, i) => {
          const isOpen = open === i;
          const panel = `${base}-p${i}`;
          return (
            <li
              key={item.q}
              className="bg-surface rounded-[24px] px-2 shadow-[6px_8px_0_-2px_var(--shadow)]"
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panel}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-h-16 w-full items-center justify-between gap-4 px-4 py-3 text-left text-[1.0625rem] font-bold"
                >
                  {item.q}
                  <span
                    className={cn(
                      "bg-fg text-bg flex size-9 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-[var(--ease-out)]",
                      isOpen && "rotate-45",
                    )}
                    aria-hidden="true"
                  >
                    <Icon name="plus" size={16} strokeWidth={2.5} />
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <m.div
                    id={panel}
                    key="panel"
                    // feedback: abre/fecha com a altura real do conteúdo
                    initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-muted px-4 pb-5 leading-relaxed">{item.a}</p>
                  </m.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
