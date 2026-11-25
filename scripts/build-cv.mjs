// Gera o currículo em PDF a partir de content/cv/cv-<lang>.json
// Uso: node scripts/build-cv.mjs [pt]  →  public/cv-brena-angelo.pdf
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";

const lang = process.argv[2] ?? "pt";
const cv = JSON.parse(readFileSync(`content/cv/cv-${lang}.json`, "utf8"));
const t =
  lang === "pt"
    ? {
        summary: "Resumo",
        exp: "Experiência",
        edu: "Formação",
        cert: "Certificações",
        skills: "Competências técnicas",
        extra: "Atividades",
      }
    : {
        summary: "Summary",
        exp: "Experience",
        edu: "Education",
        cert: "Certifications",
        skills: "Technical skills",
        extra: "Activities",
      };

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const link = (c) => (c.href ? `<a href="${c.href}">${esc(c.label)}</a>` : esc(c.label));

const html = `<!doctype html><html lang="${lang === "pt" ? "pt-BR" : "en"}"><head><meta charset="utf-8">
<title>${esc(cv.name)} — CV</title>
<style>
  @page { size: A4; margin: 11mm 14mm; }
  * { box-sizing: border-box; }
  body { font-family: Inter, Arial, sans-serif; font-size: 9.4pt; line-height: 1.36; color: #111; margin: 0; }
  a { color: #111; text-decoration: none; }
  h1 { font-size: 21pt; font-weight: 700; letter-spacing: -0.01em; margin: 0; }
  .headline { font-size: 11pt; font-weight: 500; color: #333; margin: 2px 0 6px; }
  .contact { font-size: 9pt; color: #333; display: flex; flex-wrap: wrap; gap: 0 10px; }
  .contact span + span::before { content: "|"; margin-right: 10px; color: #999; }
  h2 { font-size: 10pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin: 10px 0 4px; padding-bottom: 2px; border-bottom: 1px solid #111; }
  p { margin: 0; }
  .item { margin-bottom: 5px; break-inside: avoid; }
  .row { display: flex; justify-content: space-between; gap: 12px; }
  .role { font-weight: 700; }
  .org { font-weight: 500; }
  .period { color: #333; white-space: nowrap; }
  ul { margin: 3px 0 0; padding-left: 14px; }
  li { margin: 1px 0; }
  .skills div { margin: 1.5px 0; }
  .skills b { font-weight: 600; }
  .muted { color: #444; }
</style></head><body>
<header>
  <h1>${esc(cv.name)}</h1>
  <p class="headline">${esc(cv.headline)}</p>
  <p class="contact">${cv.contact.map((c) => `<span>${link(c)}</span>`).join("")}</p>
</header>
<h2>${t.summary}</h2>
<p>${esc(cv.summary)}</p>
<h2>${t.exp}</h2>
${cv.experience
  .map(
    (e) => `<div class="item">
  <div class="row"><p><span class="role">${esc(e.role)}</span> · <span class="org">${esc(e.org)}</span> <span class="muted">· ${esc(e.where)}</span></p><p class="period">${esc(e.period)}</p></div>
  <ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
</div>`,
  )
  .join("")}
<h2>${t.skills}</h2>
<div class="skills">${cv.skills.map((s) => `<div><b>${esc(s.group)}:</b> ${esc(s.items)}</div>`).join("")}</div>
<h2>${t.edu}</h2>
${cv.education.map((e) => `<div class="item row"><p><span class="role">${esc(e.title)}</span> · <span class="muted">${esc(e.org)}</span></p><p class="period">${esc(e.period)}</p></div>`).join("")}
<h2>${t.cert}</h2>
${cv.certifications.map((c) => `<div class="item row"><p><span class="role">${c.href ? `<a href="${c.href}">${esc(c.title)}</a>` : esc(c.title)}</span> · <span class="muted">${esc(c.org)}</span></p><p class="period">${esc(c.period)}</p></div>`).join("")}
${cv.extra?.length ? `<h2>${t.extra}</h2>${cv.extra.map((x) => `<p>${esc(x)}</p>`).join("")}` : ""}
</body></html>`;

mkdirSync("public", { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM ?? "/opt/pw-browsers/chromium",
});
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "load" });
const out = lang === "pt" ? "public/cv-brena-angelo.pdf" : `public/cv-brena-angelo-${lang}.pdf`;
await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
// pré-visualização em PNG para conferência visual
await page.setViewportSize({ width: 794, height: 1123 });
await page.emulateMedia({ media: "print" });
writeFileSync(process.env.CV_HTML_OUT ?? "/dev/null", html);
await browser.close();
console.log("gerado:", out);
