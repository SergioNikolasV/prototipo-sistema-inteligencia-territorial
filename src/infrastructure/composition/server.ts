import "server-only"

/**
 * Composition root del servidor: conecta los casos de uso con sus adaptadores.
 * Para pasar a datos reales, se reemplaza el adaptador Mock* por uno HTTP/SQL aquí; la UI no cambia.
 */
import { listMunicipalities } from "@/application/use-cases/territory"
import { getDepartmentGapSummary, getGapTrend, getNationalKpis, getNeedVsOffer, getTerritoryIndicators } from "@/application/use-cases/indicators"
import { listDatasetTypes, listEtlLoads } from "@/application/use-cases/etl"
import { getQualityDimensions, getQualityOverview, listDataSources } from "@/application/use-cases/quality"
import { getFilterCatalogs } from "@/application/use-cases/catalogs"
import { GeoJsonTerritoryRepository } from "../geo/geojson-territory.repository"
import { MockIndicatorRepository } from "../mock/indicator.mock-repository"
import { MockEtlRepository } from "../mock/etl.mock-repository"
import { MockQualityRepository } from "../mock/quality.mock-repository"
import { MockCatalogRepository } from "../mock/catalog.mock-repository"

const territoryRepository = new GeoJsonTerritoryRepository()
const indicatorRepository = new MockIndicatorRepository(() => territoryRepository.listFeatureCodes())
const etlRepository = new MockEtlRepository()
const qualityRepository = new MockQualityRepository()
const catalogRepository = new MockCatalogRepository()

export const territory = {
  listMunicipalities: listMunicipalities(territoryRepository),
}

export const indicators = {
  getTerritoryIndicators: getTerritoryIndicators(indicatorRepository),
  getNationalKpis: getNationalKpis(indicatorRepository),
  getNeedVsOffer: getNeedVsOffer(indicatorRepository),
  getGapTrend: getGapTrend(indicatorRepository),
  getDepartmentGapSummary: getDepartmentGapSummary(indicatorRepository),
}

export const etl = {
  listLoads: listEtlLoads(etlRepository),
  listDatasetTypes: listDatasetTypes(etlRepository),
}

export const quality = {
  listSources: listDataSources(qualityRepository),
  getOverview: getQualityOverview(qualityRepository),
  getDimensions: getQualityDimensions(qualityRepository),
}

export const catalogs = {
  getFilterCatalogs: getFilterCatalogs(catalogRepository),
}
