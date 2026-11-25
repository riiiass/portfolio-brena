import { defineConfig, devices } from "@playwright/test";

/**
 * Testes E2E (smoke, a11y, no-JS, screenshots).
 * Local:   npm run build && npm run test:e2e
 * Chromium do sistema (ex.: containers): PW_CHROMIUM=/caminho/do/chrome npm run test:e2e
 */
const executablePath = process.env.PW_CHROMIUM;

export default defineConfig({
  testDir: "e2e",
  timeout: 45_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3100",
    trace: "off",
    launchOptions: executablePath ? { executablePath } : undefined,
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 860 } },
    },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npx next start -p 3100",
        url: "http://localhost:3100",
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
});
