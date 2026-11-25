export const site = {
  name: "Brena Angelo",
  role: "Desenvolvedora Full Stack & Designer UX/UI",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://brenaangelo.netlify.app",
  description:
    "Portfólio de Brena Angelo: desenvolvedora full stack que pensa como designer e designer UX/UI que entrega código.",
  email: "brena.angelo.silva1511@gmail.com",
  location: "Ceará, Brasil",
  available: true,
  social: {
    linkedin: "https://www.linkedin.com/in/brena-angelo-aa60a4228/",
    github: "https://github.com/riiiass",
    instagram: "https://www.instagram.com/wsbrena/",
  },
  githubUser: "riiiass",
  instagramHandle: "@wsbrena",
  cvUrl: "/cv-brena-angelo.pdf", // TODO: adicionar PDF em /public
} as const;
