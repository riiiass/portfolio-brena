import Image from "next/image";
import { getContent } from "@/content";
import type { Locale } from "@/lib/i18n";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { WindowFrame } from "@/components/ui/Window";

export function About({ locale }: { locale: Locale }) {
  const { about, t } = getContent(locale);
  return (
    <section id="sobre" data-bg="band" aria-labelledby="sobre-t" className="bg-band py-24 md:py-32">
      <div className="mx-auto grid max-w-[1180px] grid-cols-[minmax(0,1fr)] items-center gap-12 px-4 md:grid-cols-2 md:px-8">
        <div data-exit="slide-left">
          {/* hierarquia: a foto entra por máscara, de baixo para cima */}
          <Reveal variant="clip-up">
            <WindowFrame title={`${locale === "en" ? "about_04" : "sobre_04"} / brena.webp`}>
              <div className="bg-folder-orange relative h-[420px] overflow-hidden md:h-[520px]">
                {/* orientação: leve parallax dentro da janela (a imagem é maior que o quadro) */}
                <div data-parallax="0.12" className="absolute inset-x-0 -inset-y-[8%]">
                  <Image
                    src="/brena/brena-sobre.webp"
                    alt={t.aboutPhotoAlt}
                    fill
                    sizes="(min-width: 768px) 540px, 100vw"
                    className="object-cover object-[50%_35%]"
                  />
                </div>
              </div>
            </WindowFrame>
          </Reveal>
        </div>

        <div className="flex flex-col gap-5">
          <Reveal as="p" variant="rise" className="label-mono text-[11px]">
            {t.aboutLabel}
          </Reveal>
          <RevealLines
            id="sobre-t"
            className="font-display text-step-4 leading-[.9] uppercase"
            lines={[
              t.aboutTitle1,
              <>
                {t.aboutTitle2a ? `${t.aboutTitle2a} ` : null}
                <span className="font-script text-accent-strong text-[1.4em] leading-[.6] normal-case">
                  {t.aboutName}
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
            aria-label={t.aboutNow}
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

      <Marquee label={t.stackMarquee} className="border-fg mt-20 border-y-[1.5px] py-4" speed={70}>
        {about.stack.map((tech) => (
          <span
            key={tech}
            className="font-display flex items-center text-[clamp(1.75rem,3.5vw,2.5rem)] tracking-[.04em] whitespace-nowrap uppercase"
          >
            <span className="px-6">{tech}</span>
            <span aria-hidden="true" className="text-accent">
              ✦
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
