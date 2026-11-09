/** Composition root del cliente para el visor GIS (geometrías). Solo lo importa la feature de mapa. */
import { GeoJsonBoundaryRepository } from "../geo/geojson-boundary.repository"

const boundaryRepository = new GeoJsonBoundaryRepository()

export const boundaries = {
  getBoundaries: boundaryRepository.getBoundaries.bind(boundaryRepository),
}
