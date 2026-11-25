import { renderOg, ogSize } from "@/lib/og";

export const alt = "Brena Angelo — portfolio of a full stack developer and UX/UI designer";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    title: "Portfolio",
    script: "Brena",
    kicker: "DEV × DESIGN · BRAZIL",
    tag: "FULL STACK × UX/UI",
  });
}
