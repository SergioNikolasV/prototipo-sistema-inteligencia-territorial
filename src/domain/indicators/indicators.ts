export type IndicatorTone = "blue" | "red" | "green" | "amber"

export type KpiIndicator = {
  id: string
  label: string
  value: string
  note: string
  tone: IndicatorTone
  trend?: string
}

export type NeedVsOffer = {
  name: string
  need: number
  offer: number
}

export type GapTrend = {
  average: string
  change: string
  monthlySeries: number[]
  axisLabels: string[]
}

export type DepartmentGapSummary = {
  department: string
  gap: string
  characterizedPeople: number
  executedInvestment: string
}
