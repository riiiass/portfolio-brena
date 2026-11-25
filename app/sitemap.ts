import type { MetadataRoute } from "next";
import { projects } from "@/content/pt/projects";
import { site } from "@/lib/site";
import { casePath } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const alt = (pt: string, en: string) => ({
    languages: { "pt-BR": `${site.url}${pt}`, en: `${site.url}${en}` },
  });
  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: alt("", "/en"),
    },
    {
      url: `${site.url}/en`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: alt("", "/en"),
    },
    ...projects.flatMap((p) => {
      const a = alt(casePath("pt", p.slug), casePath("en", p.slug));
      return [
        {
          url: `${site.url}${casePath("pt", p.slug)}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.8,
          alternates: a,
        },
        {
          url: `${site.url}${casePath("en", p.slug)}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates: a,
        },
      ];
    }),
  ];
}
