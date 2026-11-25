import type Lenis from "lenis";

/** Referência global do Lenis (null quando reduced motion ou ainda não carregado) */
let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  lenis = l;
};
export const getLenis = () => lenis;

/** Rola até uma seção: com Lenis quando ativo, nativo caso contrário. Move o foco para acessibilidade. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = document.documentElement.dataset.motion === "reduced";
  if (lenis) lenis.scrollTo(el, { offset: id === "inicio" ? -1000 : -24 });
  else el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", id === "inicio" ? location.pathname : `#${id}`);
  // orientação: o foco acompanha o destino (leitores de tela e teclado)
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

export function scrollToTop() {
  scrollToId("inicio");
}
