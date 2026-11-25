"use client";

import { AnimatePresence, m, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/content/pt/testimonials";
import { usePrefs } from "@/components/providers/Preferences";
import { RevealLines } from "@/components/motion/Reveal";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/cn";

type Msg = { id: string; side: "left" | "right"; body: React.ReactNode; meta?: string };

function Typing({ side }: { side: Msg["side"] }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={cn(
        "bg-bg flex w-fit gap-1.5 rounded-full px-4 py-3.5",
        side === "right" && "self-end",
      )}
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <m.span
          key={i}
          className="bg-fg size-2 rounded-full"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </m.div>
  );
}

/**
 * Depoimentos chegando como mensagens (ref. B): "digitando…" e depois o balão, em sequência.
 * Sem depoimentos reais ainda, a conversa vira um convite — nenhuma citação é inventada.
 */
export function Testimonials() {
  const { reducedMotion } = usePrefs();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  const messages: Msg[] = testimonials.length
    ? testimonials.map((t, i) => ({
        id: `t${i}`,
        side: i % 2 ? "right" : "left",
        body: <p>“{t.quote}”</p>,
        meta: `${t.name} · ${t.role}`,
      }))
    : [
        {
          id: "a",
          side: "left",
          body: <p>Este espaço é para depoimentos de verdade, de quem já trabalhou comigo.</p>,
          meta: "Brena",
        },
        {
          id: "b",
          side: "right",
          body: (
            <p>
              Trabalhou comigo num projeto?{" "}
              <a
                href="#contato"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("contato");
                }}
                className="font-bold underline underline-offset-4"
              >
                Me conta como foi
              </a>{" "}
              e o seu depoimento aparece aqui.
            </p>
          ),
          meta: "convite",
        },
      ];

  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  // antes da hidratação (e sem JS) todas as mensagens já estão no HTML
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- marca hidratação
    setMounted(true);
  }, []);
  const visible = !mounted || reducedMotion ? messages.length : shown;

  useEffect(() => {
    if (!mounted || !inView || reducedMotion || shown >= messages.length) return;
    // deleite + hierarquia: cada mensagem tem seu "digitando…" antes de chegar
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sequência temporizada
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setShown((n) => n + 1);
    }, 1100);
    return () => clearTimeout(t);
  }, [mounted, inView, shown, reducedMotion, messages.length]);

  const nextSide = messages[shown]?.side ?? "left";

  return (
    <section
      id="depoimentos"
      data-bg="band"
      aria-labelledby="depo-t"
      className="bg-band px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-[minmax(0,1fr)] items-center gap-12 md:grid-cols-2">
        <div>
          <p className="label-mono mb-4 text-[11px]">Depoimentos</p>
          <RevealLines
            id="depo-t"
            className="text-step-4 font-serif leading-none"
            lines={[
              "Quem já",
              <>
                trabalhou{" "}
                <span className="font-script text-accent-strong text-[1.3em] leading-[.6]">
                  comigo
                </span>
              </>,
            ]}
          />
        </div>
        <div ref={ref} className="flex min-h-[260px] flex-col gap-4" aria-live="polite">
          {/* sem JS / reduced motion: tudo visível de uma vez */}
          {messages.slice(0, visible).map((msg, i) => (
            <m.figure
              key={msg.id}
              initial={!mounted || reducedMotion ? false : { opacity: 0, y: 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className={cn(
                "max-w-[440px] rounded-[26px] px-5 py-4 shadow-[8px_10px_0_-2px_var(--shadow)]",
                msg.side === "left"
                  ? "bg-bg self-start rounded-bl-[6px]"
                  : "bg-ink text-paper self-end rounded-br-[6px] md:-translate-x-8",
                i > 0 && "-mt-1",
              )}
            >
              <blockquote className="text-[0.9375rem] leading-relaxed">{msg.body}</blockquote>
              {msg.meta ? (
                <figcaption className="mt-2 text-xs font-bold opacity-80">{msg.meta}</figcaption>
              ) : null}
            </m.figure>
          ))}
          <AnimatePresence>
            {typing ? <Typing key={`typing-${shown}`} side={nextSide} /> : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
