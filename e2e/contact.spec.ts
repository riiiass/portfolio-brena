import { expect, test } from "@playwright/test";
import { skipIntro } from "./helpers";

test.beforeEach(async ({ page }) => skipIntro(page));

test("formulário valida campos e envia para o Netlify Forms", async ({ page }) => {
  let body = "";
  await page.route("**/__forms.html", (route) => {
    if (route.request().method() !== "POST") return route.continue();
    body = route.request().postData() ?? "";
    return route.fulfill({ status: 200, body: "" });
  });
  await page.goto("/#contato");
  const form = page.locator("#contato");
  await form.getByRole("button", { name: /ENVIAR MENSAGEM/ }).click();
  await expect(form.getByText("Me conta como posso te chamar.")).toBeVisible();
  await expect(form.getByRole("textbox", { name: "Nome" })).toBeFocused();

  await form.getByRole("textbox", { name: "Nome" }).fill("Ana Souza");
  await form.getByRole("textbox", { name: "E-mail" }).fill("ana@empresa.com");
  await form.locator("label", { hasText: "Sistema web" }).click();
  await form
    .getByRole("textbox", { name: "Mensagem" })
    .fill("Quero um sistema web para o meu negócio.");
  await form.getByRole("button", { name: /ENVIAR MENSAGEM/ }).click();

  await expect(form.getByText("Mensagem guardada!")).toBeVisible();
  expect(body).toContain("form-name=contato");
  expect(body).toContain("tipo=Sistema+web");
  expect(body).toContain("empresa-site="); // honeypot vazio
});
