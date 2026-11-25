import type { Metadata } from "next";
import type { ReactNode } from "react";
import { contrast } from "@/lib/contrast";
import { Pill, PillLink, Tag } from "@/components/ui/Pill";
import { SelectionBox } from "@/components/ui/SelectionBox";
import { NotchCard } from "@/components/ui/NotchCard";
import { WindowFrame } from "@/components/ui/Window";
import { FolderShape } from "@/components/ui/FolderShape";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Styleguide",
  description: "Design system do portfólio: cores, tipografia, formas e componentes.",
  robots: { index: false },
};

const palette = [
  { name: "--paper", hex: "#f4f1ec", on: "#0e0e0e" },
  { name: "--ink", hex: "#0e0e0e", on: "#f4f1ec" },
  { name: "--blush", hex: "#f2c6d0", on: "#0e0e0e" },
  { name: "--blush-deep", hex: "#d98aa0", on: "#0e0e0e", note: "decorativo" },
  { name: "--folder-pink", hex: "#f7a8c4", on: "#0e0e0e" },
  { name: "--folder-orange", hex: "#ff9a4d", on: "#0e0e0e" },
  { name: "--folder-blue", hex: "#8db8f2", on: "#0e0e0e" },
  { name: "--folder-lime", hex: "#c8eb6a", on: "#0e0e0e" },
  { name: "--select", hex: "#2f6bff", on: "#ffffff", note: "só foco/seleção" },
];

const textPairs = [
  { label: "texto sobre paper", fg: "#0e0e0e", bg: "#f4f1ec" },
  { label: "muted sobre paper", fg: "#3a3a3a", bg: "#f4f1ec" },
  { label: "destaque rosa sobre paper", fg: "#a8445f", bg: "#f4f1ec" },
  { label: "destaque sobre blush", fg: "#7a2a40", bg: "#f2c6d0" },
  { label: "texto sobre ink (escuro)", fg: "#f4f1ec", bg: "#0e0e0e" },
  { label: "muted sobre ink", fg: "#cfc9c0", bg: "#0e0e0e" },
  { label: "rosa claro sobre ink", fg: "#f2a3b8", bg: "#0e0e0e" },
  { label: "alça azul sobre paper (UI ≥ 3:1)", fg: "#2f6bff", bg: "#f4f1ec" },
];

const motionTokens = [
  ["--ease-out", "cubic-bezier(.22,1,.36,1)", "entradas, hover"],
  ["--ease-in-out", "cubic-bezier(.65,0,.35,1)", "troca de estado, tema"],
  ["spring", "stiffness 260 · damping 24", "drag, pílulas, toggles"],
  ["--dur-micro", "150ms", "hover, press"],
  ["--dur-ui", "300ms", "abrir/fechar"],
  ["--dur-reveal", "700ms", "entrada de seção"],
  ["--dur-hero", "1200ms", "intro"],
  ["--stagger", "60ms", "sequências"],
];

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-14">
      <h2 id={id} className="label-mono mb-8 text-muted">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <main id="conteudo" className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label-mono mb-14 text-muted">Design system</p>
          <h1 className="relative font-display text-step-5 leading-[.86] uppercase">
            <span className="absolute -top-8 left-2 -rotate-6 font-script text-[0.55em] text-accent normal-case">
              Brena
            </span>
            Styleguide
          </h1>
        </div>
        <ThemeToggle />
      </header>

      <Section id="sg-cores" title="Cores">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {palette.map((c) => (
            <li key={c.name} className="overflow-hidden rounded-[24px] border border-line">
              <div className="flex h-24 items-end p-3" style={{ background: c.hex, color: c.on }}>
                <span className="font-mono text-xs">{c.hex}</span>
              </div>
              <div className="bg-surface p-3 text-sm">
                <code className="font-mono text-xs">{c.name}</code>
                {c.note ? <p className="text-xs text-muted">{c.note}</p> : null}
              </div>
            </li>
          ))}
        </ul>
        <h3 className="mt-10 mb-4 font-serif text-step-2">Contraste medido</h3>
        <ul className="grid gap-2 sm:grid-cols-2">
          {textPairs.map((p) => {
            const r = contrast(p.fg, p.bg);
            const isUi = p.label.includes("UI");
            const pass = isUi ? r >= 3 : r >= 4.5;
            return (
              <li
                key={p.label}
                className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3"
                style={{ background: p.bg, color: p.fg }}
              >
                <span className="text-sm font-medium">{p.label}</span>
                <span className="font-mono text-xs">
                  {r.toFixed(1)}:1 {pass ? "AA ✓" : "✗"}
                </span>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="sg-tipo" title="Tipografia">
        <div className="grid gap-8">
          <div>
            <p className="label-mono mb-2 text-muted">Display · Anton</p>
            <p className="font-display text-step-5 leading-[.86] uppercase">Portfólio</p>
          </div>
          <div>
            <p className="label-mono mb-2 text-muted">Script · Mrs Saint Delafield (decorativa)</p>
            <p className="font-script text-[6rem] leading-none text-accent">Brena</p>
          </div>
          <div>
            <p className="label-mono mb-2 text-muted">Serifa · Italiana</p>
            <p className="font-serif text-step-3 leading-tight">Dev que pensa como designer.</p>
          </div>
          <div>
            <p className="label-mono mb-2 text-muted">Sans · Manrope</p>
            <p className="max-w-prose text-step-0">
              Crio produtos web de ponta a ponta: da pesquisa e do protótipo ao banco de dados e ao
              deploy. Texto de leitura com 1.6 de entrelinha e medida de até 65 caracteres.
            </p>
          </div>
          <div>
            <p className="label-mono mb-2 text-muted">Mono · JetBrains Mono</p>
            <p className="label-mono">Collaboration</p>
          </div>
        </div>
      </Section>

      <Section id="sg-pills" title="Pílulas e botões">
        <div className="flex flex-wrap items-center gap-3">
          <Pill variant="solid">Solid</Pill>
          <Pill>Outline</Pill>
          <Pill variant="soft">Soft</Pill>
          <Pill pressed>Filtro ativo</Pill>
          <Pill pressed={false}>Filtro inativo</Pill>
          <Pill size="sm">Pequena</Pill>
          <PillLink href="/" variant="solid" size="lg">
            Link grande <Icon name="arrowUpRight" size={18} />
          </PillLink>
          <Tag>Full Stack</Tag>
          <span className="inline-flex items-center gap-2 rounded-full bg-block px-3 py-2 text-sm text-on-block">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#4ade80] opacity-60" />
              <span className="relative size-2 rounded-full bg-[#4ade80]" />
            </span>
            disponível para projetos
          </span>
        </div>
      </Section>

      <Section id="sg-sel" title="SelectionBox">
        <div className="flex flex-wrap items-center gap-12 pt-6">
          <SelectionBox label="Button / CTA">
            <a
              href="#"
              className="block bg-fg px-8 py-4 font-display text-[22px] tracking-[.06em] text-bg"
            >
              VAMOS CONVERSAR
            </a>
          </SelectionBox>
          <SelectionBox label="Heading / H2">
            <span className="block font-display text-5xl uppercase">Título</span>
          </SelectionBox>
          <p className="max-w-xs text-sm text-muted">
            Passe o mouse ou foque com Tab: as alças esticam. O mesmo azul é o anel de foco do site.
          </p>
        </div>
      </Section>

      <Section id="sg-notch" title="NotchCard">
        <NotchCard tab={<span className="label-mono text-[11px]">Trajetória</span>}>
          <p className="font-display text-step-4 leading-[.9] uppercase">
            Do primeiro <span className="font-script text-blush normal-case">código</span>
          </p>
          <p className="mt-4 max-w-md text-[#cfc9c0]">
            Aba com junção côncava feita por mask, sem imagem.
          </p>
        </NotchCard>
        <NotchCard tone="surface" className="mt-8" tab={<span className="label-mono text-[11px]">Surface</span>}>
          <p className="text-muted">Variante clara.</p>
        </NotchCard>
      </Section>

      <Section id="sg-window" title="Window e Folder">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <WindowFrame title="sobre_04 / brena.png">
            <div className="flex h-64 items-end justify-center bg-folder-orange">
              <span className="on-light mb-6 rounded-full bg-paper px-3 py-1.5 font-mono text-[11px] tracking-[.2em]">
                TODO: FOTO
              </span>
            </div>
          </WindowFrame>
          <div className="flex flex-wrap gap-6 pt-6">
            <FolderShape label="projetos_01" color="pink" className="-rotate-6" />
            <FolderShape label="cases_ux_02" color="orange" className="rotate-3" />
            <FolderShape label="codigo_03" color="lime" className="-rotate-2" />
            <FolderShape label="sobre_04" color="blush" className="rotate-6" />
          </div>
        </div>
      </Section>

      <Section id="sg-motion" title="Motion tokens">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="py-2 font-mono text-xs font-medium">token</th>
                <th className="py-2 font-mono text-xs font-medium">valor</th>
                <th className="py-2 font-mono text-xs font-medium">uso</th>
              </tr>
            </thead>
            <tbody>
              {motionTokens.map(([t, v, u]) => (
                <tr key={t} className="border-b border-line/60">
                  <td className="py-2 font-mono text-xs">{t}</td>
                  <td className="py-2 font-mono text-xs">{v}</td>
                  <td className="py-2 text-muted">{u}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </main>
  );
}
