import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const font = (file: string) => readFile(join(process.cwd(), "assets/fonts", file));

/** Imagem Open Graph com a linguagem visual do site (papel, display condensada, script, pastas) */
export async function renderOg({
  title,
  script,
  kicker,
  tag,
}: {
  title: string;
  script: string;
  kicker: string;
  tag: string;
}) {
  const [anton, italiana, manrope, scriptFont] = await Promise.all([
    font("Anton.ttf"),
    font("Italiana.ttf"),
    font("Manrope.ttf"),
    font("MrsSaintDelafield.ttf"),
  ]);
  const folders = [
    { c: "#f7a8c4", x: 820, y: 70, r: -8 },
    { c: "#ff9a4d", x: 980, y: 210, r: 7 },
    { c: "#c8eb6a", x: 840, y: 380, r: 5 },
    { c: "#8db8f2", x: 1010, y: 430, r: -6 },
  ];
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#f4f1ec",
        position: "relative",
        fontFamily: "Manrope",
      }}
    >
      {folders.map((f, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: f.x,
            top: f.y,
            width: 170,
            display: "flex",
            flexDirection: "column",
            transform: `rotate(${f.r}deg)`,
          }}
        >
          <div style={{ width: 66, height: 20, background: f.c, borderRadius: "10px 10px 0 0" }} />
          <div style={{ height: 120, background: f.c, borderRadius: "0 18px 18px 18px" }} />
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 64,
          display: "flex",
          fontSize: 22,
          letterSpacing: 9,
          color: "#3a3a3a",
        }}
      >
        {kicker}
      </div>
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 200,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: "Anton",
            fontSize: title.length > 12 ? 120 : 170,
            lineHeight: 0.9,
            color: "#0e0e0e",
            textTransform: "uppercase",
            maxWidth: 760,
          }}
        >
          {title}
        </div>
      </div>
      {/* script desenhado depois do título = fica na frente dele */}
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 96,
          fontFamily: "Script",
          fontSize: 140,
          color: "#a8445f",
          transform: "rotate(-6deg)",
        }}
      >
        {script}
      </div>
      <div
        style={{
          position: "absolute",
          left: 70,
          bottom: 70,
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            background: "#0e0e0e",
            color: "#f4f1ec",
            borderRadius: 999,
            padding: "14px 26px",
            fontSize: 24,
            letterSpacing: 6,
            transform: "rotate(-4deg)",
          }}
        >
          {tag}
        </div>
        <div style={{ fontFamily: "Italiana", fontSize: 34, color: "#0e0e0e" }}>Brena Angelo</div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Anton", data: anton, style: "normal", weight: 400 },
        { name: "Italiana", data: italiana, style: "normal", weight: 400 },
        { name: "Manrope", data: manrope, style: "normal", weight: 500 },
        { name: "Script", data: scriptFont, style: "normal", weight: 400 },
      ],
    },
  );
}
