/**
 * Certificações e cursos — conferidos nos PDFs do Google Drive da Brena (pasta CERTIFICADOS).
 * Só links públicos de verificação; nenhum dado pessoal (CPF) é exibido.
 */
export type Cert = {
  title: string;
  issuer: string;
  date: string;
  hours?: string;
  verifyUrl?: string;
  featured?: boolean;
  tone: "blue" | "pink" | "lime" | "orange";
};

export const certifications: Cert[] = [
  {
    title: "Google UX Design Professional Certificate",
    issuer: "Google · Coursera",
    date: "mai 2025",
    verifyUrl: "https://www.credly.com/go/oYS1f7pU",
    featured: true,
    tone: "pink",
  },
  {
    title: "Google IT Support Professional Certificate",
    issuer: "Google · Coursera",
    date: "mai 2025",
    verifyUrl: "https://www.credly.com/go/ADbzF1lf",
    featured: true,
    tone: "blue",
  },
  {
    title: "Foundations of Cybersecurity",
    issuer: "Google · Coursera",
    date: "mai 2026",
    verifyUrl: "https://coursera.org/verify/QNCGMGUC4W7B",
    featured: true,
    tone: "lime",
  },
  {
    title: "Preparação profissional (4 módulos)",
    issuer: "IBM SkillsBuild",
    date: "abr 2026",
    hours: "12h50",
    tone: "orange",
  },
  {
    title: "Marketing Digital e Redes Sociais",
    issuer: "Sebrae",
    date: "abr 2026",
    hours: "7h",
    tone: "pink",
  },
  {
    title: "DESPERTAR – Educação Empreendedora",
    issuer: "SEDUC Ceará · Sebrae",
    date: "2023",
    hours: "70h",
    tone: "lime",
  },
  {
    title: "Extensão universitária (5 projetos sociais)",
    issuer: "UNIASSELVI",
    date: "2026",
    hours: "360h",
    tone: "blue",
  },
];
