import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/projetos/kadosh", "/projetos/paz-no-lar", "/nao-existe"];

for (const theme of ["light", "dark"] as const) {
  test.describe(`acessibilidade (WCAG 2.2 AA) — tema ${theme}`, () => {
    test.use({ colorScheme: theme, reducedMotion: "reduce" });
    for (const route of routes) {
      test(`sem violações em ${route}`, async ({ page }) => {
        await page.goto(route);
        const res = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        expect(
          res.violations.map(
            (v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`,
          ),
        ).toEqual([]);
      });
    }
  });
}

test.describe("movimento reduzido", () => {
  test.use({ reducedMotion: "reduce" });
  test("sem intro e sem cursor customizado", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-intro", "skip");
    await expect(page.locator(".cursor-dot")).toHaveCount(0);
  });
});

test.describe("sem JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("conteúdo completo e legível", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".intro")).toBeHidden();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".tl-item")).toHaveCount(6);
    await expect(page.locator("#depoimentos figure")).toHaveCount(2);
    await expect(page.locator("form[name=contato]")).toHaveAttribute("action", "/__forms.html");
  });
});
