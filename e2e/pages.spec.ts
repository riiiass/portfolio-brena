import { expect, test } from "@playwright/test";
import { skipIntro } from "./helpers";

test.beforeEach(async ({ page }) => skipIntro(page));

for (const slug of ["kadosh", "modo", "paz-no-lar", "banco-de-talentos"]) {
  test(`case /projetos/${slug} carrega com processo e próximo projeto`, async ({ page }) => {
    const res = await page.goto(`/projetos/${slug}`);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("navigation", { name: /Double Diamond/ })).toBeVisible();
    await expect(page.getByText("Próximo projeto")).toBeVisible();
  });
}

test("404 personalizada", async ({ page }) => {
  const res = await page.goto("/pagina-que-nao-existe");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: /404/ })).toBeVisible();
  await page.getByRole("link", { name: "Voltar ao início" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("SEO: sitemap, robots, Open Graph e JSON-LD", async ({ page, request }) => {
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap:");
  const og = await request.get("/opengraph-image");
  expect(og.headers()["content-type"]).toContain("image/png");
  await page.goto("/");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /opengraph-image/,
  );
  const ld = await page.locator('script[type="application/ld+json"]').textContent();
  expect(JSON.parse(ld ?? "{}")["@type"]).toBe("Person");
});

test("CVs em PDF estão publicados", async ({ request }) => {
  for (const f of ["/cv-brena-angelo.pdf", "/cv-brena-angelo-en.pdf"]) {
    const r = await request.get(f);
    expect(r.status()).toBe(200);
    expect(r.headers()["content-type"]).toContain("pdf");
  }
});
