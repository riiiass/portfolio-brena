"use client";

import { useEffect, useRef } from "react";
import { timeline } from "@/content/pt/timeline";
import { usePrefs } from "@/components/providers/Preferences";
import { NotchCard } from "@/components/ui/NotchCard";
import { RevealLines } from "@/components/motion/Reveal";
import { loadGsap } from "@/lib/gsap";

/**
 * Trajetória 1–6 (ref. C). Desktop + movimento liberado: a seção fica pinada e o scroll
 * move a trilha (scrub); a régua funciona como o slider de progresso (orientação).
 * Celular, reduced motion ou sem JS: lista completa, sem pin.
 */
export function Timeline() {
  const { reducedMotion } = usePrefs();
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const knob = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    let mm: { revert: () => void } | null = null;
    let cancelled = false;
    void loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled || !section.current) return;
      mm = gsap.matchMedia();
      (mm as ReturnType<typeof gsap.matchMedia>).add("(min-width: 768px)", () => {
        const items = Array.from(track.current?.children ?? []) as HTMLElement[];
        const distance = () =>
          (track.current?.scrollWidth ?? 0) - (viewport.current?.clientWidth ?? 0);
        viewport.current?.classList.add("tl-pinned");
        const setActive = (p: number) => {
          const active = Math.min(items.length - 1, Math.floor(p * items.length));
          items.forEach((el, i) => el.toggleAttribute("data-active", i === active));
          if (fill.current) fill.current.style.transform = `scaleX(${p})`;
          if (knob.current) knob.current.style.left = `${p * 100}%`;
        };
        setActive(0);
        gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.6}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(self.progress),
          },
        });
        // o pin cria espaço extra: os gatilhos das seções abaixo precisam ser recalculados
        ScrollTrigger.sort();
        requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => {
          viewport.current?.classList.remove("tl-pinned");
          items.forEach((el) => el.removeAttribute("data-active"));
        };
      });
    });
    return () => {
      cancelled = true;
      mm?.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={section}
      id="processo"
      data-bg="paper"
      aria-labelledby="processo-t"
      className="px-4 py-20 md:flex md:min-h-dvh md:items-center md:px-8 md:py-10"
    >
      <NotchCard
        className="mx-auto w-full max-w-[1240px]"
        tab={<span className="label-mono text-[11px]">Trajetória</span>}
        bodyClassName="overflow-hidden"
      >
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <RevealLines
            id="processo-t"
            className="font-display text-step-4 leading-[.9] uppercase"
            lines={[
              "Do primeiro",
              <>
                <span className="font-script text-blush text-[1.35em] leading-[.6] normal-case">
                  código
                </span>{" "}
                até hoje
              </>,
            ]}
          />
          <p className="max-w-[300px] text-sm text-[#cfc9c0]">
            Da escola técnica ao trabalho voluntário e freelance: cada etapa somou código, didática
            e cuidado com pessoas.
          </p>
        </div>

        {/* régua de progresso (slider da ref. C) */}
        <div
          className="relative mb-7 hidden h-1 rounded-full bg-[#3a3a3a] md:block"
          aria-hidden="true"
        >
          <span
            ref={fill}
            className="bg-blush absolute inset-0 origin-left scale-x-0 rounded-full"
          />
          <span
            ref={knob}
            className="bg-paper absolute top-1/2 left-0 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          />
        </div>

        <div ref={viewport} className="tl-viewport md:pb-2">
          <ol
            ref={track}
            className="tl-track grid grid-cols-[minmax(0,1fr)] gap-3.5 md:grid-cols-3"
          >
            {timeline.map((t, i) => (
              <li
                key={t.title}
                className="tl-item bg-block-2 flex flex-col gap-3 rounded-[22px] p-5"
              >
                <span className="tl-num bg-blush font-display text-ink flex size-11 items-center justify-center rounded-full text-lg">
                  {i + 1}
                </span>
                {t.year ? (
                  <span className="label-mono text-[10px] text-[#cfc9c0]">{t.year}</span>
                ) : null}
                <h3 className="text-lg leading-snug font-bold">{t.title}</h3>
                <p className="text-sm leading-relaxed text-[#cfc9c0]">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </NotchCard>
    </section>
  );
}
