"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { scrollToTop } from "@/lib/scroll";
import { Marquee } from "@/components/motion/Marquee";
import { Icon, type IconName } from "@/components/ui/Icon";

const links: { label: string; href: string; icon: IconName }[] = [
  { label: "LinkedIn", href: site.social.linkedin, icon: "linkedin" },
  { label: "GitHub", href: site.social.github, icon: "github" },
  { label: "Instagram", href: site.social.instagram, icon: "instagram" },
  { label: "E-mail", href: `mailto:${site.email}`, icon: "mail" },
];

export function Footer() {
  return (
    <footer className="px-4 pb-28 md:px-6 md:pb-10">
      <div className="border-line bg-block text-on-block mx-auto flex max-w-[1240px] items-center gap-3 rounded-full border p-2.5 md:gap-4 md:p-3.5">
        <Marquee
          label="Disponível para projetos"
          speed={45}
          className="min-w-0 flex-1 rounded-full"
        >
          {["DISPONÍVEL PARA PROJETOS", "FULL STACK", "UX/UI", "FREELANCE & CLT"].map((t) => (
            <span
              key={t}
              className="flex items-center font-mono text-xs tracking-[.4em] whitespace-nowrap md:text-sm"
            >
              <span className="px-5">{t}</span>
              <span aria-hidden="true" className="text-blush">
                ✦
              </span>
            </span>
          ))}
        </Marquee>
        {/* orientação: o botão home central volta ao topo com scroll suave */}
        <Link
          href="/#inicio"
          onClick={(e) => {
            if (location.pathname !== "/") return;
            e.preventDefault();
            scrollToTop();
          }}
          aria-label="Voltar ao topo"
          data-cursor="topo"
          className="bg-blush text-ink flex size-14 shrink-0 items-center justify-center rounded-full transition-transform duration-300 hover:-translate-y-1 active:scale-[.94] md:size-16"
        >
          <Icon name="home" size={24} strokeWidth={2} />
        </Link>
      </div>
      <div className="text-muted mx-auto mt-6 flex max-w-[1240px] flex-col items-center justify-between gap-4 px-2 text-sm sm:flex-row">
        <p>
          Desenhado e codado por {site.name} · {new Date().getFullYear()}
        </p>
        <ul className="flex items-center gap-2">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={l.label}
                className="social-btn border-line text-fg hover:border-fg flex size-11 items-center justify-center rounded-full border-[1.5px]"
              >
                <Icon name={l.icon} size={18} />
              </a>
            </li>
          ))}
        </ul>
        <Link href="/styleguide" className="underline-offset-4 hover:underline">
          Styleguide
        </Link>
      </div>
    </footer>
  );
}
