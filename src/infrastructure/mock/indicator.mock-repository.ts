import type { IndicatorRepository } from "@/application/ports/indicator-repository"
import type { TerritoryIndicator, TerritoryIndicatorIndex } from "@/domain/indicators/territory-indicator"
import { DEPARTMENT_GAP_SUMMARY, GAP_TREND, NATIONAL_KPIS, NEED_VS_OFFER, SYNTHETIC_BREACH_SEQUENCE } from "./data/indicators.data"
import { digitSeed } from "./synthetic-seed"

export class MockIndicatorRepository implements IndicatorRepository {
  constructor(private readonly listTerritoryCodes: () => string[]) {}

  async getTerritoryIndicators(): Promise<TerritoryIndicatorIndex> {
    return Object.fromEntries(this.listTerritoryCodes().map((code) => [code, syntheticIndicator(code)]))
  }

  async getNationalKpis() { return NATIONAL_KPIS }
  async getNeedVsOffer() { return NEED_VS_OFFER }
  async getGapTrend() { return GAP_TREND }
  async getDepartmentGapSummary() { return DEPARTMENT_GAP_SUMMARY }
}

function syntheticIndicator(code: string): TerritoryIndicator {
  const seed = digitSeed(code)
  return {
    breachLevel: SYNTHETIC_BREACH_SEQUENCE[seed % SYNTHETIC_BREACH_SEQUENCE.length],
    characterizedVictims: 1840 + seed * 331,
    assignedOffer: 6.3 + (seed % 48) / 10,
    uncoveredGap: 18 + (seed % 24),
  }
}
