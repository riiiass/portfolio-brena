import { services as pt } from "../pt/services";

const text: Record<string, { title: string; text: string }> = {
  front: {
    title: "Front-end",
    text: "React and Next.js interfaces that are responsive, fast and animated with purpose.",
  },
  back: {
    title: "Back-end & APIs",
    text: "REST APIs, authentication, payments and integrations with external services.",
  },
  db: {
    title: "Databases",
    text: "Relational modeling with PostgreSQL and Prisma, designed to grow.",
  },
  research: {
    title: "UX Research",
    text: "Interviews, usability tests and journey maps before the first pixel.",
  },
  ui: {
    title: "UI & Design Systems",
    text: "Tokens, components and documentation that become code without rework.",
  },
  a11y: {
    title: "Accessibility & Performance",
    text: "WCAG 2.2 AA, keyboard navigation and Core Web Vitals in the green.",
  },
};

export const services: typeof pt = pt.map((s) => ({ ...s, ...text[s.id]! }));
