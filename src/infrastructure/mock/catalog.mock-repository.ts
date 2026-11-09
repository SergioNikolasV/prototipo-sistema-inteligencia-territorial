import type { CatalogRepository } from "@/application/ports/catalog-repository"
import { FILTER_CATALOGS } from "./data/catalogs.data"

export class MockCatalogRepository implements CatalogRepository {
  async getFilterCatalogs() { return FILTER_CATALOGS }
}
