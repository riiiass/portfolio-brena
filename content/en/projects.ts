import { projects as pt } from "../pt/projects";

const t: Record<string, { summary: string; alt?: string }> = {
  kadosh: {
    summary:
      "Faith-inspired fashion e-commerce for retail and wholesale: dynamic showcase, shipping, Pix and card payments and an admin panel. Customers buy without talking to the store.",
    alt: "KADOSH home page: black background, golden logo and the headline “Wear your faith. Express your essence.” with Men and Women buttons.",
  },
  modo: { summary: "Website for a nail studio with a price list and booking via WhatsApp." },
  "paz-no-lar": {
    summary:
      "Website and system for a nonprofit that helps women rebuild their lives, with a staff-only area for records, printing and PDF. I volunteer as developer and designer.",
    alt: "Instituto Paz no Lar home page: large “Paz no Lar” title in a purple gradient, “Learn about the benefits” and “Contact us” buttons, and badges for free support, confidentiality and a dedicated team.",
  },
  "banco-de-talentos": {
    summary: "Showcase of the women supported by the nonprofit: search by trade, name or product.",
    alt: "Banco de Talentos home page: dark background, the headline “Find who is a Baker”, search by trade and photos of the women's work such as nails, cakes and bags.",
  },
};

export const projects: typeof pt = pt.map((p) => ({
  ...p,
  summary: t[p.slug]?.summary ?? p.summary,
  cover: p.cover ? { ...p.cover, alt: t[p.slug]?.alt ?? p.cover.alt } : undefined,
}));
export { technologies } from "../pt/projects";
