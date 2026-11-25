// Uso: node scripts/shots.mjs <rota> <prefixo> [tema]
// Gera screenshots full-page em 360, 768, 1280 e 1920px.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const [route = "/", prefix = "home", theme = "light", widths = "360,768,1280,1920"] =
  process.argv.slice(2);
const out = process.env.SHOTS_DIR ?? "shots";
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM ?? "/opt/pw-browsers/chromium",
});
for (const w of widths.split(",").map(Number)) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: 900 },
    deviceScaleFactor: 1,
    colorScheme: theme,
    reducedMotion: process.env.REDUCED ? "reduce" : "no-preference",
  });
  await ctx.addInitScript(() => {
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {}
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(Number(process.env.WAIT ?? 1500));
  const file = `${out}/${prefix}-${theme}-${w}.png`;
  await page.screenshot({ path: file, fullPage: process.env.FULL !== "0" });
  console.log(file, errors.length ? "ERRORS: " + errors.join(" | ") : "");
  await ctx.close();
}
await browser.close();
