import type { BreachLevel } from "@/domain/indicators/breach-level"

export const BREACH_COLORS: Record<BreachLevel, string> = {
  high: "#A80521",
  medium: "#B56E00",
  low: "#068460",
}

export const MAP_COLORS = {
  selected: "#0943B5",
  hovered: "#FFAB00",
  stroke: "#FFFFFF",
} as const