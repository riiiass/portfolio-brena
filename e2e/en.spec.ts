import { expect, test } from "@playwright/test";
import { skipIntro } from "./helpers";

test.beforeEach(async ({ page }) => skipIntro(page));

test("versão em inglês: home, idioma e troca PT/EN", async ({ page }) => {
  const res = await page.goto("/en");
  expect(res?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("link", { name: /Download CV/ })).toHaveAttribute(
    "href",
    "/cv-brena-angelo-en.pdf",
  );
  await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1);
  await page
    .getByRole("link", { name: /^PT/ })
    .first()
    .click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
});

for (const slug of ["kadosh", "modo", "paz-no-lar", "banco-de-talentos"]) {
  test(`case /en/projects/${slug} em inglês`, async ({ page }) => {
    const res = await page.goto(`/en/projects/${slug}`);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Next project")).toBeVisible();
  });
}

test("botão de CV no hero em português", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /Baixar CV/i }).first()).toHaveAttribute(
    "href",
    "/cv-brena-angelo.pdf",
  );
});
