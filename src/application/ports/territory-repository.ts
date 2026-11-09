import type { Municipality } from "@/domain/territory/municipality"
import type { TerritoryBoundaries } from "@/domain/territory/boundaries"
import type { TerritoryLayer } from "@/domain/territory/territory-layer"

export interface TerritoryRepository {
  listMunicipalities(): Promise<Municipality[]>
}

/** Geometrías para renderizar el mapa. Síncrono: se resuelve en el cliente. */
export interface BoundaryRepository {
  getBoundaries(layer: TerritoryLayer): TerritoryBoundaries
}
