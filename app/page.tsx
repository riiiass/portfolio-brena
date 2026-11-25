import { Intro } from "@/components/sections/Intro";
import { Hero } from "@/components/sections/Hero";
import { Placeholder } from "@/components/sections/Placeholder";

export default function Home() {
  return (
    <>
      <Intro />
      <main id="conteudo">
        <Hero />
        <Placeholder id="sobre" title="Oi, eu sou a Brena!" phase="Fase 4 · Sobre" tone="band" />
        <Placeholder id="projetos" title="Projetos selecionados" phase="Fase 4 · Projetos" />
        <Placeholder id="processo" title="Trajetória" phase="Fase 6 · Timeline" tone="block" />
        <Placeholder
          id="contato"
          title="Vamos criar juntas?"
          phase="Fase 7 · Contato"
          tone="band"
        />
      </main>
    </>
  );
}
