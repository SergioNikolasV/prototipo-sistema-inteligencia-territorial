import type { Municipality } from "@/domain/territory/municipality"
import type { TerritoryRepository } from "../ports/territory-repository"

const MAX_SEARCH_RESULTS = 5
const MIN_QUERY_LENGTH = 2

export const listMunicipalities = (repository: TerritoryRepository) => () => repository.listMunicipalities()

/** Búsqueda por nombre o código DIVIPOLA. Función pura: se ejecuta en el cliente sobre la lista ya cargada. */
export function searchMunicipalities(places: Municipality[], query: string): Municipality[] {
  if (query.trim().length < MIN_QUERY_LENGTH) return []
  const normalized = query.toLocaleLowerCase("es-CO")
  return places
    .filter((place) => place.name.toLocaleLowerCase("es-CO").includes(normalized) || place.code.includes(normalized))
    .slice(0, MAX_SEARCH_RESULTS)
}
