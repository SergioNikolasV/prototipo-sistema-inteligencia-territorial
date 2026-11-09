import municipalitiesGeo from "@john-guerra/geo-colombia/geojson/municipalities"
import departmentsGeo from "@john-guerra/geo-colombia/geojson/departments"
import { composeMunicipalityCode, toDepartmentCode, toMunicipalityCode } from "@/domain/territory/divipola"
import type { TerritoryBoundaries, TerritoryFeature, TerritoryFeatureProperties } from "@/domain/territory/boundaries"
import type { TerritoryLayer } from "@/domain/territory/territory-layer"

/** Adaptador anticorrupción: traduce las propiedades DANE (MPIO_CDPMP, DPTO_CCDGO…) al modelo del dominio. */
type RawProperties = Record<string, unknown>
type RawCollection = { type: string; features: Array<{ type: string; geometry: unknown; properties: RawProperties }> }

const rawCollections: Record<TerritoryLayer, RawCollection> = {
  municipality: municipalitiesGeo as unknown as RawCollection,
  department: departmentsGeo as unknown as RawCollection,
}

function normalizeProperties(properties: RawProperties): TerritoryFeatureProperties {
  return {
    code: properties.MPIO_CDPMP ? toMunicipalityCode(properties.MPIO_CDPMP) : composeMunicipalityCode(properties.DPTO_CCDGO, properties.MPIO_CCDGO),
    departmentCode: toDepartmentCode(properties.DPTO_CCDGO),
    name: String(properties.MPIO_CNMBR ?? properties.DPTO_CNMBR ?? "Municipio"),
  }
}

const cache = new Map<TerritoryLayer, TerritoryBoundaries>()

export function loadBoundaries(layer: TerritoryLayer): TerritoryBoundaries {
  let boundaries = cache.get(layer)
  if (!boundaries) {
    boundaries = {
      type: "FeatureCollection",
      features: rawCollections[layer].features.map((feature): TerritoryFeature => ({
        type: "Feature",
        geometry: feature.geometry,
        properties: normalizeProperties(feature.properties),
      })),
    }
    cache.set(layer, boundaries)
  }
  return boundaries
}

export function loadDepartmentNames(): Map<string, string> {
  return new Map(rawCollections.department.features.map(({ properties }) => [toDepartmentCode(properties.DPTO_CCDGO), String(properties.DPTO_CNMBR ?? "Colombia")]))
}
