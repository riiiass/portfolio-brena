import { site } from "@/lib/site";
import { certifications } from "@/content/pt/certifications";

/** Dados estruturados schema.org: quem é a pessoa por trás do portfólio */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Brena Angelo da Silva",
    alternateName: site.name,
    url: site.url,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    address: { "@type": "PostalAddress", addressRegion: "CE", addressCountry: "BR" },
    sameAs: [site.social.linkedin, site.social.github, site.social.instagram],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "UX Research",
      "UI Design",
      "Acessibilidade",
    ],
    knowsLanguage: ["pt-BR", "en", "es"],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "UNIASSELVI" },
      { "@type": "CollegeOrUniversity", name: "Uninassau" },
    ],
    hasCredential: certifications
      .filter((c) => c.verifyUrl)
      .map((c) => ({
        "@type": "EducationalOccupationalCredential",
        name: c.title,
        url: c.verifyUrl,
        recognizedBy: { "@type": "Organization", name: c.issuer },
      })),
  };
  return (
    <script
      type="application/ld+json"
      // conteúdo estático gerado no build a partir de dados do próprio repositório
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
