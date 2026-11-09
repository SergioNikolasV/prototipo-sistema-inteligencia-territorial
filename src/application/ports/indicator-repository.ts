import type { DepartmentGapSummary, GapTrend, KpiIndicator, NeedVsOffer } from "@/domain/indicators/indicators"
import type { TerritoryIndicatorIndex } from "@/domain/indicators/territory-indicator"

export interface IndicatorRepository {
  getTerritoryIndicators(): Promise<TerritoryIndicatorIndex>
  getNationalKpis(): Promise<KpiIndicator[]>
  getNeedVsOffer(): Promise<NeedVsOffer[]>
  getGapTrend(): Promise<GapTrend>
  getDepartmentGapSummary(): Promise<DepartmentGapSummary[]>
}
