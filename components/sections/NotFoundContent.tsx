"use client";

import Link from "next/link";
import { FolderShape } from "@/components/ui/FolderShape";
import { Icon } from "@/components/ui/Icon";
import { useLocale } from "@/lib/use-locale";
import { getContent } from "@/content";
import { homePath, sectionHref } from "@/lib/i18n";

export function NotFoundContent() {
  const l = useLocale();
  const t = getContent(l).t;
  return (
    <main
      id="conteudo"
      lang={l === "en" ? "en" : undefined}
      className="mx-auto flex min-h-dvh max-w-[1180px] flex-col items-center justify-center gap-8 px-4 py-28 text-center md:px-8"
    >
      <div className="relative mb-6">
        <FolderShape
          label={l === "en" ? "page_404" : "pagina_404"}
          color="blush"
          className="w-44 -rotate-6"
        />
        <span
          aria-hidden="true"
          className="bg-fg text-bg absolute -top-10 -right-14 rotate-12 rounded-full px-3 py-2 font-mono text-[11px] tracking-[.2em]"
        >
          {t.nfEmpty}
        </span>
      </div>
      <h1 className="font-display relative text-[clamp(5rem,20vw,12rem)] leading-[.85] uppercase">
        <span
          aria-hidden="true"
          className="font-script text-accent absolute -top-8 left-1/2 -translate-x-1/2 -rotate-6 text-[0.45em] normal-case"
        >
          ops
        </span>
        404
      </h1>
      <p className="text-step-2 max-w-md font-serif leading-snug">{t.nfText}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href={homePath(l)}
          className="bg-fg text-bg inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-medium transition-transform active:scale-[.97]"
        >
          <Icon name="home" size={18} /> {t.nfHome}
        </Link>
        <Link
          href={sectionHref(l, "projetos")}
          className="border-fg inline-flex min-h-12 items-center gap-2 rounded-full border-[1.5px] px-6 font-medium transition-transform active:scale-[.97]"
        >
          {t.nfProjects} <Icon name="arrowUpRight" size={18} />
        </Link>
      </div>
    </main>
  );
}
