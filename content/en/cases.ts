import { cases as pt, type CaseMeta } from "../pt/cases";

const t: Record<string, Partial<CaseMeta>> = {
  kadosh: {
    script: "faith",
    role: "Full stack · design and development",
    duration: "2–3 months",
    lede: "A complete store for a faith-inspired fashion brand, for retail and wholesale: a dynamic showcase, shipping calculated at checkout, Pix or card payments and a panel to manage products, stock and orders. Customers do everything themselves, without talking to the store.",
  },
  modo: {
    script: "nails",
    role: "Front-end · design and development",
    duration: "2–3 months",
    lede: "Website for a nail studio with a price list and booking straight through WhatsApp. Work in progress.",
  },
  "paz-no-lar": {
    script: "care",
    role: "Volunteer · development and design",
    duration: "2–3 months",
    lede: "Website and system for Instituto Paz no Lar, which supports women who have experienced violence. On the outside, a website that brings people closer to the nonprofit; on the inside, a restricted area where staff register and organize information about everyone in the program. I volunteer as developer and designer.",
  },
  "banco-de-talentos": {
    script: "talent",
    role: "Design and front-end",
    duration: "3 weeks",
    lede: "A showcase for the women supported by the nonprofit: visitors find bakers, manicurists, artisans and entrepreneurs and see each person's work up close.",
  },
};

export const cases: CaseMeta[] = pt.map((c) => ({ ...c, ...t[c.slug] }));
export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
