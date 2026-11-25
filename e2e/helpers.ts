import type { Page } from "@playwright/test";

/** Pula a intro (só aparece na 1ª visita da sessão) */
export async function skipIntro(page: Page) {
  await page.addInitScript(() => sessionStorage.setItem("intro-seen", "1"));
}
