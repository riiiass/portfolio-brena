import Link from "next/link";
import type { Project } from "@/content/pt/projects";
import { ProjectCover } from "@/components/sections/ProjectCover";
import { ui } from "@/content/ui";
import { casePath, type Locale } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";
import { SharedCover } from "./SharedCover";

/** orientação: o próximo case já mostra a capa que vai virar o topo da próxima página */
export function NextProject({ project, locale }: { project: Project; locale: Locale }) {
  const t = ui[locale];
  return (
    <Link
      href={casePath(locale, project.slug)}
      data-cursor={t.nextCursor}
      className="group bg-block text-on-block grid grid-cols-[minmax(0,1fr)] items-center gap-8 rounded-[40px] p-6 md:grid-cols-2 md:p-10"
    >
      <div>
        <p className="label-mono mb-4 text-[11px] text-[#cfc9c0]">{t.nextProject}</p>
        <p className="font-display text-step-4 leading-[.9] uppercase transition-transform duration-500 group-hover:translate-x-2">
          {project.title}
        </p>
        <p className="mt-4 max-w-md text-[#cfc9c0]">{project.summary}</p>
        <span className="bg-blush text-ink mt-6 inline-flex size-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:-rotate-45">
          <Icon name="arrowUpRight" size={22} strokeWidth={2} />
        </span>
      </div>
      <SharedCover slug={project.slug}>
        <div className="h-[220px] md:h-[280px]">
          <ProjectCover project={project} locale={locale} />
        </div>
      </SharedCover>
    </Link>
  );
}
