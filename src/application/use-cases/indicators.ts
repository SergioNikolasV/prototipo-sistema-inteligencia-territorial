import type { IndicatorRepository } from "../ports/indicator-repository"

export const getTerritoryIndicators = (repository: IndicatorRepository) => () => repository.getTerritoryIndicators()
export const getNationalKpis = (repository: IndicatorRepository) => () => repository.getNationalKpis()
export const getNeedVsOffer = (repository: IndicatorRepository) => () => repository.getNeedVsOffer()
export const getGapTrend = (repository: IndicatorRepository) => () => repository.getGapTrend()
export const getDepartmentGapSummary = (repository: IndicatorRepository) => () => repository.getDepartmentGapSummary()
