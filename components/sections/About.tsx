import { about } from "@/content/pt/about";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { WindowFrame } from "@/components/ui/Window";

export function About() {
  return (
    <section id="sobre" data-bg="band" aria-labelledby="sobre-t" className="bg-band py-24 md:py-32">
      <div className="mx-auto grid max-w-[1180px] grid-cols-[minmax(0,1fr)] items-center gap-12 px-4 md:grid-cols-2 md:px-8">
        <div data-exit="slide-left">
          {/* hierarquia: a foto entra por máscara, de baixo para cima */}
          <Reveal variant="clip-up">
            <WindowFrame title="sobre_04 / brena.png">
              <div className="bg-folder-orange relative h-[340px] overflow-hidden md:h-[420px]">
                <div
                  data-parallax="0.25"
                  className="absolute inset-x-0 bottom-0 flex justify-center"
                >
                  {/* TODO: Brena — foto (next/image) */}
                  <svg viewBox="0 0 300 400" className="h-[300px] md:h-[360px]" aria-hidden="true">
                    <circle cx="150" cy="130" r="78" fill="#e9803a" />
                    <path d="M20 400c0-90 58-150 130-150s130 60 130 150z" fill="#e9803a" />
                  </svg>
                </div>
                <span className="on-light bg-paper absolute top-4 left-4 rounded-full px-2.5 py-1.5 font-mono text-[11px] tracking-[.2em]">
                  TODO: FOTO
                </span>
              </div>
            </WindowFrame>
          </Reveal>
        </div>

        <div className="flex flex-col gap-5">
          <Reveal as="p" variant="rise" className="label-mono text-[11px]">
            Sobre
          </Reveal>
          <RevealLines
            id="sobre-t"
            className="font-display text-step-4 leading-[.9] uppercase"
            lines={[
              "Oi, eu sou",
              <>
                a{" "}
                <span className="font-script text-accent-strong text-[1.4em] leading-[.6] normal-case">
                  Brena!
                </span>
              </>,
            ]}
          />
          {about.paragraphs.map((p, i) => (
            <Reveal
              key={i}
              as="p"
              variant="rise"
              delay={i + 2}
              className="text-step-0 max-w-[540px] leading-relaxed"
            >
              {p}
            </Reveal>
          ))}
          <Reveal as="p" variant="rise" delay={4} className="text-step-2 font-serif leading-tight">
            {about.differential}
          </Reveal>
          <Reveal
            as="ul"
            variant="rise"
            delay={5}
            className="flex flex-wrap gap-2"
            aria-label="Agora"
          >
            {about.now.map((n) => (
              <li
                key={n}
                className="border-fg flex items-center gap-2 rounded-full border-[1.5px] px-3.5 py-2 text-sm"
              >
                <span className="bg-ok size-2 rounded-full" aria-hidden="true" />
                {n}
              </li>
            ))}
          </Reveal>
        </div>
      </div>

      <Marquee
        label="Tecnologias que eu uso"
        className="border-fg mt-20 border-y-[1.5px] py-4"
        speed={70}
      >
        {about.stack.map((t) => (
          <span
            key={t}
            className="font-display flex items-center text-[clamp(1.75rem,3.5vw,2.5rem)] tracking-[.04em] whitespace-nowrap uppercase"
          >
            <span className="px-6">{t}</span>
            <span aria-hidden="true" className="text-accent">
              ✦
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
