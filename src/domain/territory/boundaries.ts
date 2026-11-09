import type { DivipolaCode } from "./divipola"

/** Propiedades normalizadas de un polígono territorial, independientes de la fuente GeoJSON. */
export type TerritoryFeatureProperties = {
  code: DivipolaCode
  departmentCode: DivipolaCode
  name: string
}

export type TerritoryFeature = {
  type: "Feature"
  geometry: unknown
  properties: TerritoryFeatureProperties
}

export type TerritoryBoundaries = {
  type: "FeatureCollection"
  features: TerritoryFeature[]
}
