import { renderOg, ogSize } from "@/lib/og";

export const alt = "Brena Angelo — portfólio de desenvolvedora full stack e designer UX/UI";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    title: "Portfólio",
    script: "Brena",
    kicker: "DEV × DESIGN · CEARÁ",
    tag: "FULL STACK × UX/UI",
  });
}
