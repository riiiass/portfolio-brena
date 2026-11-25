import { expect, test } from "@playwright/test";
import { skipIntro } from "./helpers";

test.beforeEach(async ({ page }) => skipIntro(page));

test("home carrega com título, hero e seções principais", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Brena Angelo/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Brena Angelo");
  for (const id of [
    "sobre",
    "projetos",
    "processo",
    "dados",
    "depoimentos",
    "toolkit",
    "faq",
    "contato",
  ])
    await expect(page.locator(`#${id}`)).toBeAttached();
  await expect(page.getByRole("link", { name: /KADOSH/ })).toBeVisible();
});

test("intro aparece na primeira visita e pode ser pulada", async ({ browser }) => {
  const page = await browser.newPage();
  await page.goto("/");
  const skip = page.getByRole("button", { name: /PULAR/ });
  await expect(skip).toBeVisible();
  await skip.click();
  await expect(page.locator(".intro")).toHaveCount(0, { timeout: 3000 });
  await page.close();
});

test("⌘K busca um projeto e abre o case", async ({ page, isMobile }) => {
  test.skip(isMobile, "atalho de teclado é de desktop; no celular há o botão de busca");
  await page.goto("/");
  await page.keyboard.press("Control+k");
  const input = page.getByRole("combobox");
  await expect(input).toBeFocused();
  await input.fill("paz");
  await expect(page.getByRole("option", { name: /Paz no Lar/ })).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/projetos\/paz-no-lar/);
});

test("tema escuro é aplicado e lembrado", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("switch", { name: "Tema escuro" }).first();
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("pasta do hero abre como janela e fecha com Esc devolvendo o foco", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const folder = page.locator(isMobile ? "#folder-m-btn-codigo" : "#folder-btn-codigo");
  await folder.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("button", { name: "Fechar janela" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(folder).toBeFocused();
});

test("filtro de projetos reorganiza o bento", async ({ page }) => {
  await page.goto("/#projetos");
  await page.getByRole("button", { name: "UX/UI", exact: true }).click();
  await expect(page.locator("#projetos h3")).toHaveText(["Paz no Lar", "Banco de Talentos"], {
    ignoreCase: true,
  });
});
