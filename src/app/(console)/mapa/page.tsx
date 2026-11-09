import { indicators } from "@/infrastructure/composition/server"
import { MapView } from "@/presentation/features/map/MapView"

export default async function MapPage() {
  const [territoryIndicators, kpis, needVsOffer, gapTrend, gapSummary] = await Promise.all([
    indicators.getTerritoryIndicators(),
    indicators.getNationalKpis(),
    indicators.getNeedVsOffer(),
    indicators.getGapTrend(),
    indicators.getDepartmentGapSummary(),
  ])
  return <MapView territoryIndicators={territoryIndicators} kpis={kpis} needVsOffer={needVsOffer} gapTrend={gapTrend} gapSummary={gapSummary} />
}
