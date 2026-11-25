import type { Locale } from "@/lib/i18n";
import { Intro } from "./Intro";
import { Hero } from "./Hero";
import { About } from "./About";
import { Services } from "./Services";
import { Projects } from "./Projects";
import { Timeline } from "./Timeline";
import { DevData } from "./DevData";
import { Testimonials } from "./Testimonials";
import { Toolkit } from "./Toolkit";
import { Faq } from "./Faq";
import { Contact } from "./Contact";
import { ScrollFx } from "@/components/motion/ScrollFx";

/** Home (compartilhada entre / e /en) */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Intro />
      <main id="conteudo" lang={locale === "en" ? "en" : undefined}>
        <Hero locale={locale} />
        <About locale={locale} />
        <Services locale={locale} />
        <Projects />
        <Timeline />
        <DevData locale={locale} />
        <Testimonials />
        <Toolkit locale={locale} />
        <Faq />
        <Contact />
      </main>
      <ScrollFx />
    </>
  );
}
