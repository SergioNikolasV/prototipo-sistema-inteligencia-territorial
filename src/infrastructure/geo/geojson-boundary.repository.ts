import type { BoundaryRepository } from "@/application/ports/territory-repository"
import type { TerritoryLayer } from "@/domain/territory/territory-layer"
import { loadBoundaries } from "./colombia-geojson"

export class GeoJsonBoundaryRepository implements BoundaryRepository {
  getBoundaries(layer: TerritoryLayer) {
    return loadBoundaries(layer)
  }
}
