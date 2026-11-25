/**
 * Capas ilustradas provisórias (sem prints reais ainda).
 * TODO: Brena — trocar por screenshots reais via next/image quando houver autorização.
 */
export function ProjectCover({ slug }: { slug: string }) {
  switch (slug) {
    case "kadosh":
      return (
        <div
          className="absolute inset-0 grid grid-cols-3 gap-3 p-6 pt-16 opacity-90"
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col gap-2 rounded-2xl bg-white/8 p-2.5">
              <div
                className={`aspect-[3/4] rounded-xl ${["bg-folder-pink", "bg-folder-orange", "bg-folder-blue"][i % 3]}`}
              />
              <div className="h-2 w-3/4 rounded-full bg-white/25" />
              <div className="bg-folder-lime h-2 w-1/3 rounded-full" />
            </div>
          ))}
        </div>
      );
    case "modo":
      return (
        <div
          className="absolute inset-0 flex flex-col justify-center gap-2 px-6 pt-12 opacity-60"
          aria-hidden="true"
        >
          {[70, 55, 80].map((w, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="bg-ink/80 size-4 rounded-full" />
              <span className="bg-ink/25 h-2 rounded-full" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      );
    case "paz-no-lar":
      return (
        <div
          className="absolute inset-0 flex flex-col gap-3 p-6 pt-24 opacity-80"
          aria-hidden="true"
        >
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 21 }).map((_, i) => (
              <span
                key={i}
                className={`aspect-square rounded-md ${[3, 9, 17, 22].includes(i) ? "bg-ink/70" : "bg-white/50"}`}
              />
            ))}
          </div>
          <div className="bg-ink/25 mt-2 h-2 w-2/3 rounded-full" />
          <div className="bg-ink/25 h-2 w-1/2 rounded-full" />
        </div>
      );
    default:
      return (
        <div
          className="absolute inset-0 flex items-center justify-center opacity-80"
          aria-hidden="true"
        >
          <div className="flex -space-x-4 pt-10">
            {["bg-folder-pink", "bg-folder-orange", "bg-folder-blue", "bg-paper"].map((c) => (
              <span key={c} className={`border-folder-lime size-11 rounded-full border-4 ${c}`} />
            ))}
          </div>
        </div>
      );
  }
}
