import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type Node = { title: string; detail: string; tone?: "pink" | "blue" | "lime" | "orange" };
const tones = {
  pink: "bg-folder-pink",
  blue: "bg-folder-blue",
  lime: "bg-folder-lime",
  orange: "bg-folder-orange",
};

function Connector({ i }: { i: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className="arch-line text-fg mx-auto size-10 shrink-0 rotate-90 md:rotate-0"
      style={{ ["--k" as string]: i }}
    >
      <path d="M2 20 H34" fill="none" stroke="currentColor" strokeWidth="2.5" pathLength={1} />
      <path
        d="M28 13 L36 20 L28 27"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        pathLength={1}
      />
    </svg>
  );
}

/** Diagrama front → API → banco, com integrações. As setas se desenham ao entrar (stroke-dashoffset). */
export function Architecture({
  flow,
  integrations,
  labels = { aria: "Diagrama de arquitetura", integrations: "Integrações" },
}: {
  flow: Node[];
  integrations?: string[];
  labels?: { aria: string; integrations: string };
}) {
  return (
    <Reveal variant="none" className="arch not-prose mt-2" role="figure" aria-label={labels.aria}>
      <ol className="flex flex-col items-stretch md:flex-row md:items-center">
        {flow.map((n, i) => (
          <li key={n.title} className="contents">
            {i > 0 ? <Connector i={i} /> : null}
            <div
              className={cn(
                "on-light flex-1 rounded-[22px] p-4 shadow-[6px_8px_0_-2px_var(--shadow)]",
                tones[n.tone ?? (["pink", "blue", "lime", "orange"] as const)[i % 4] ?? "pink"],
              )}
            >
              <p className="font-display text-xl uppercase">{n.title}</p>
              <p className="mt-1 text-sm leading-snug">{n.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      {integrations?.length ? (
        <div className="border-line mt-5 rounded-[22px] border-[1.5px] border-dashed p-4">
          <p className="label-mono text-muted mb-3 text-[10px]">{labels.integrations}</p>
          <ul className="flex flex-wrap gap-2">
            {integrations.map((it) => (
              <li key={it} className="border-fg rounded-full border-[1.5px] px-3 py-1.5 text-sm">
                {it}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Reveal>
  );
}
