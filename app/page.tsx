import { Intro } from "@/components/sections/Intro";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Placeholder } from "@/components/sections/Placeholder";
import { ScrollFx } from "@/components/motion/ScrollFx";

export default function Home() {
  return (
    <>
      <Intro />
      <main id="conteudo">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Placeholder id="processo" title="Trajetória" phase="Fase 6 · Timeline" tone="block" />
        <Placeholder
          id="contato"
          title="Vamos criar juntas?"
          phase="Fase 7 · Contato"
          tone="band"
        />
      </main>
      <ScrollFx />
    </>
  );
}
