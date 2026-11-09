import type { BreachLevel } from "@/domain/indicators/breach-level"
import type { DepartmentGapSummary, GapTrend, KpiIndicator, NeedVsOffer } from "@/domain/indicators/indicators"

export const NATIONAL_KPIS: KpiIndicator[] = [
  { id: "uncovered-gap", label: "Brecha no cubierta", value: "28,4%", note: "Promedio nacional · en descenso", tone: "red", trend: "3,2 pp" },
  { id: "characterized-population", label: "Población caracterizada", value: "8,7 M", note: "Personas registradas · agregado", tone: "blue" },
  { id: "executed-investment", label: "Inversión ejecutada", value: "$1,24 B", note: "Vigencia 2025 · recursos reportados", tone: "green", trend: "8,6%" },
]

export const NEED_VS_OFFER: NeedVsOffer[] = [
  { name: "Bogotá D.C.", need: 84, offer: 63 },
  { name: "Antioquia", need: 68, offer: 51 },
  { name: "Valle del Cauca", need: 57, offer: 43 },
  { name: "Nariño", need: 48, offer: 31 },
  { name: "Norte de Santander", need: 39, offer: 26 },
]

export const GAP_TREND: GapTrend = {
  average: "28,4%",
  change: "3,2 pp",
  monthlySeries: [31, 36, 33, 45, 48, 43, 52, 57, 55, 65, 61, 73],
  axisLabels: ["Nov 24", "May 25", "Oct 25"],
}

export const DEPARTMENT_GAP_SUMMARY: DepartmentGapSummary[] = [
  { department: "Bogotá D.C.", gap: "31%", characterizedPeople: 18400, executedInvestment: "$12.4 mil M" },
  { department: "Antioquia", gap: "26%", characterizedPeople: 14200, executedInvestment: "$9.8 mil M" },
  { department: "Valle del Cauca", gap: "24%", characterizedPeople: 11800, executedInvestment: "$7.1 mil M" },
]

/** Asignación sintética de nivel de brecha según la semilla del código DIVIPOLA. */
export const SYNTHETIC_BREACH_SEQUENCE: BreachLevel[] = ["medium", "high", "low"]
