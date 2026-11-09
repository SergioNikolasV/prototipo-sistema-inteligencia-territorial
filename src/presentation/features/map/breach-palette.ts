import type { BreachLevel } from "@/domain/indicators/breach-level"

export const BREACH_COLORS: Record<BreachLevel, string> = {
  high: "#DC2626",
  medium: "#D97706",
  low: "#16A34A",
}

export const MAP_COLORS = {
  selected: "#0F2C59",
  hovered: "#E5A23C",
  stroke: "#FFFFFF",
} as const
