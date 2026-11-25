import type { Locale } from "@/lib/i18n";
import * as ptSections from "./pt/sections";
import * as enSections from "./en/sections";
import { about as ptAbout } from "./pt/about";
import { about as enAbout } from "./en/about";
import { services as ptServices } from "./pt/services";
import { services as enServices } from "./en/services";
import { projects as ptProjects, technologies } from "./pt/projects";
import { projects as enProjects } from "./en/projects";
import { cases as ptCases } from "./pt/cases";
import { cases as enCases } from "./en/cases";
import { timeline as ptTimeline } from "./pt/timeline";
import { timeline as enTimeline } from "./en/timeline";
import { toolkit as ptToolkit } from "./pt/toolkit";
import { toolkit as enToolkit } from "./en/toolkit";
import { certifications as ptCerts } from "./pt/certifications";
import { certifications as enCerts } from "./en/certifications";
import { faq as ptFaq } from "./pt/faq";
import { faq as enFaq } from "./en/faq";
import { testimonials as ptTestimonials } from "./pt/testimonials";
import { testimonials as enTestimonials } from "./en/testimonials";
import { lighthouse as ptLighthouse } from "./pt/devdata";
import { lighthouse as enLighthouse } from "./en/devdata";
import { ui } from "./ui";

const data = {
  pt: {
    navSections: ptSections.navSections,
    heroFolders: ptSections.heroFolders,
    about: ptAbout,
    services: ptServices,
    projects: ptProjects,
    cases: ptCases,
    timeline: ptTimeline,
    toolkit: ptToolkit,
    certifications: ptCerts,
    faq: ptFaq,
    testimonials: ptTestimonials,
    lighthouse: ptLighthouse,
    technologies,
    t: ui.pt,
  },
  en: {
    navSections: enSections.navSections,
    heroFolders: enSections.heroFolders,
    about: enAbout,
    services: enServices,
    projects: enProjects,
    cases: enCases,
    timeline: enTimeline,
    toolkit: enToolkit,
    certifications: enCerts,
    faq: enFaq,
    testimonials: enTestimonials,
    lighthouse: enLighthouse,
    technologies,
    t: ui.en,
  },
} as const;

export type Content = (typeof data)["pt"];
export const getContent = (l: Locale): Content => data[l] as Content;
