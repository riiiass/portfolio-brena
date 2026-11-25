import { Intro } from "@/components/sections/Intro";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Timeline } from "@/components/sections/Timeline";
import { DevData } from "@/components/sections/DevData";
import { Testimonials } from "@/components/sections/Testimonials";
import { Toolkit } from "@/components/sections/Toolkit";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
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
        <Timeline />
        <DevData />
        <Testimonials />
        <Toolkit />
        <Faq />
        <Contact />
      </main>
      <ScrollFx />
    </>
  );
}
