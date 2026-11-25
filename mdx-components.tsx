import type { MDXComponents } from "mdx/types";
import { CaseSection } from "@/components/case/CaseSection";
import { Decisions } from "@/components/case/Decisions";
import { Architecture } from "@/components/case/Architecture";
import { Metrics } from "@/components/case/Metrics";
import { StackGroups } from "@/components/case/StackGroups";

const components: MDXComponents = { CaseSection, Decisions, Architecture, Metrics, StackGroups };

export function useMDXComponents(): MDXComponents {
  return components;
}
