/** Barramento simples de eventos de UI (abre ⌘K, toasts) sem acoplar componentes */
export const emit = (name: "palette:open" | "toast", detail?: string) =>
  window.dispatchEvent(new CustomEvent(name, { detail }));

export async function copyEmail(email: string) {
  try {
    await navigator.clipboard.writeText(email);
    const en = location.pathname === "/en" || location.pathname.startsWith("/en/");
    emit("toast", en ? "Email copied!" : "E-mail copiado!");
  } catch {
    emit("toast", `E-mail: ${email}`);
  }
}
