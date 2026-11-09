import type { FilterCatalogs } from "@/domain/filters/territorial-filters"

export interface CatalogRepository {
  getFilterCatalogs(): Promise<FilterCatalogs>
}
