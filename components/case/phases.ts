/** Double Diamond (Design Council, 2005) */
export const phases = [
  { id: "descobrir", label: "Descobrir" },
  { id: "definir", label: "Definir" },
  { id: "desenvolver", label: "Desenvolver" },
  { id: "entregar", label: "Entregar" },
] as const;
export type PhaseId = (typeof phases)[number]["id"];
