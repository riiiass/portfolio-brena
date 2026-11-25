import { site } from "@/lib/site";
import { SelectionBox } from "@/components/ui/SelectionBox";
import { Magnetic } from "@/components/motion/Magnetic";
import { SearchTrigger } from "@/components/ui/SearchTrigger";
import { Icon, type IconName } from "@/components/ui/Icon";
import { FolderPlayground } from "./FolderPlayground";

const TITLE = "Portfólio";

const socials: { label: string; href: string; icon: IconName; hover: string }[] = [
  {
    label: "LinkedIn",
    href: site.social.linkedin,
    icon: "linkedin",
    hover: "hover:bg-folder-blue focus-visible:bg-folder-blue",
  },
  {
    label: "GitHub",
    href: site.social.github,
    icon: "github",
    hover: "hover:bg-folder-lime focus-visible:bg-folder-lime",
  },
  {
    label: "Instagram",
    href: site.social.instagram,
    icon: "instagram",
    hover: "hover:bg-folder-orange focus-visible:bg-folder-orange",
  },
  {
    label: "E-mail",
    href: `mailto:${site.email}`,
    icon: "mail",
    hover: "hover:bg-folder-pink focus-visible:bg-folder-pink",
  },
];

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="mx-auto max-w-[1240px] px-4 pt-28 pb-16 md:px-8 md:pt-36 lg:pb-20"
    >
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
        <div className="flex min-w-0 flex-col gap-6 md:gap-7">
          <p
            className="label-mono hero-fade text-muted text-[10px] md:text-xs"
            style={{ ["--i" as string]: 0 }}
          >
            Dev × Design · Ceará
          </p>

          <div className="relative pt-8 md:pt-10">
            <span
              aria-hidden="true"
              className="hero-script font-script text-accent absolute -top-3 left-2 z-10 -rotate-6 text-[5.5rem] leading-none sm:text-[8rem] md:-top-2 md:left-4 lg:text-[9rem]"
            >
              Brena
            </span>
            <h1
              id="hero-title"
              data-cursor-blend
              className="font-display text-[clamp(4rem,19vw,9rem)] leading-[.86] uppercase lg:text-[clamp(5.4rem,9.6vw,10rem)]"
            >
              <span className="sr-only">
                Brena Angelo — portfólio de desenvolvedora full stack e designer UX/UI
              </span>
              <span aria-hidden="true" className="flex [clip-path:inset(-0.4em_-0.2em_0_-0.2em)]">
                {TITLE.split("").map((ch, i) => (
                  <span
                    key={i}
                    className="hero-letter inline-block"
                    style={{ ["--i" as string]: i }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            </h1>
            <span
              aria-hidden="true"
              className="hero-stamp absolute right-0 -bottom-6 -rotate-[9deg] md:right-1"
            >
              <span className="sway idle border-bg bg-fg text-bg block rounded-full border-2 px-3 py-2.5 font-mono text-[10px] tracking-[.25em] shadow-[0_0_0_2px_var(--fg)] md:px-[18px] md:py-3 md:text-[13px] md:tracking-[.3em]">
                FULL STACK × UX/UI
              </span>
            </span>
          </div>

          <p
            className="hero-fade mt-4 max-w-[540px] font-serif text-[1.65rem] leading-[1.15] md:text-[2.125rem]"
            style={{ ["--i" as string]: 1 }}
          >
            Dev que pensa como designer.
            <br />
            Designer que entrega código.
          </p>
          <p className="hero-fade text-muted max-w-[500px]" style={{ ["--i" as string]: 2 }}>
            Crio produtos web de ponta a ponta: da pesquisa e do protótipo ao banco de dados e ao
            deploy.
          </p>

          <div
            className="hero-fade flex flex-wrap items-center gap-6"
            style={{ ["--i" as string]: 3 }}
          >
            <Magnetic>
              <SelectionBox label="Button / CTA">
                <a
                  href="#contato"
                  data-cursor="falar"
                  className="bg-fg font-display text-bg block px-7 py-4 text-[1.375rem] tracking-[.06em] transition-transform duration-150 active:scale-[.97]"
                >
                  VAMOS CONVERSAR
                </a>
              </SelectionBox>
            </Magnetic>
            <ul className="flex gap-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={s.label}
                    data-cursor="abrir"
                    className={`social-btn border-fg hover:text-ink focus-visible:text-ink flex size-12 items-center justify-center rounded-full border-[1.5px] ${s.hover}`}
                  >
                    <Icon name={s.icon} size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-fade" style={{ ["--i" as string]: 4 }}>
            <SearchTrigger />
          </div>
        </div>

        <FolderPlayground />
      </div>
    </section>
  );
}
