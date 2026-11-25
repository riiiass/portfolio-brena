import { lighthouse as pt } from "../pt/devdata";

export const lighthouse = pt.map((l) => ({
  ...l,
  project: l.project === "Este portfólio" ? "This portfolio" : l.project,
}));
