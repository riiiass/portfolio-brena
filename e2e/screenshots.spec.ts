import { test } from "@playwright/test";
import { skipIntro } from "./helpers";

/** Gera screenshots de referência (anexadas ao relatório) em desktop e mobile, tema claro e escuro */
for (const theme of ["light", "dark"] as const) {
  test(`screenshots — ${theme}`, async ({ page }, info) => {
    await skipIntro(page);
    await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
    for (const route of ["/", "/projetos/kadosh"]) {
      await page.goto(route);
      await page.waitForTimeout(500);
      const name = `${info.project.name}-${theme}${route.replace(/\//g, "_") || "_home"}.png`;
      const path = info.outputPath(name);
      await page.screenshot({ path, fullPage: true });
      await info.attach(name, { path, contentType: "image/png" });
    }
  });
}
