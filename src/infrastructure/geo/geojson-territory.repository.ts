import type { TerritoryRepository } from "@/application/ports/territory-repository"
import type { Municipality } from "@/domain/territory/municipality"
import { loadBoundaries, loadDepartmentNames } from "./colombia-geojson"

export class GeoJsonTerritoryRepository implements TerritoryRepository {
  async listMunicipalities(): Promise<Municipality[]> {
    const departments = loadDepartmentNames()
    const unique = new Map<string, Municipality>()
    for (const { properties } of loadBoundaries("municipality").features) {
      if (!unique.has(properties.code)) unique.set(properties.code, {
        code: properties.code,
        name: properties.name,
        department: departments.get(properties.departmentCode) ?? "Colombia",
      })
    }
    return [...unique.values()]
  }

  /** Todos los códigos presentes en ambas capas (municipios y polígonos departamentales). */
  listFeatureCodes(): string[] {
    const codes = new Set<string>()
    for (const layer of ["municipality", "department"] as const) {
      for (const { properties } of loadBoundaries(layer).features) codes.add(properties.code)
    }
    return [...codes]
  }
}
