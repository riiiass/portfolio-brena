import Image from "next/image";
import type { Project } from "@/content/pt/projects";

/**
 * Capa do projeto: print real numa moldura de navegador ou, sem print,
 * uma ilustração provisória. Preenche o bloco onde é colocada.
 */
export function ProjectCover({
  project,
  priority = false,
  locale = "pt",
}: {
  project: Project;
  priority?: boolean;
  locale?: "pt" | "en";
}) {
  if (project.cover) {
    return (
      <div className="bg-paper flex h-full flex-col overflow-hidden rounded-[18px] shadow-[0_18px_40px_-18px_rgb(0_0_0/.45)] ring-1 ring-black/10">
        <div className="flex shrink-0 items-center gap-1.5 px-3 py-2" aria-hidden="true">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
        </div>
        <div className="relative min-h-0 flex-1 overflow-hidden">
          {/* feedback: o print dá zoom dentro da moldura no hover */}
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
          />
        </div>
      </div>
    );
  }

  // TODO: Brena — enviar print do projeto para trocar a ilustração
  return (
    <div
      className="relative flex h-full items-center justify-center overflow-hidden rounded-[18px] bg-[#fbe3ec]"
      aria-hidden="true"
    >
      <div className="flex w-[80%] flex-col gap-2 transition-transform duration-700 group-hover:scale-105">
        {[70, 55, 80].map((w, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="bg-ink/70 size-3.5 shrink-0 rounded-full" />
            <span className="bg-ink/25 h-2 rounded-full" style={{ width: `${w}%` }} />
            <span className="text-ink/85 ml-auto shrink-0 font-mono text-[10px] whitespace-nowrap">
              R$ —
            </span>
          </div>
        ))}
      </div>
      <span className="text-ink/85 absolute right-3 bottom-2 font-mono text-[10px] tracking-[.15em] uppercase">
        {locale === "en" ? "screenshot soon" : "print em breve"}
      </span>
    </div>
  );
}
