import type { CatalogRepository } from "../ports/catalog-repository"

export const getFilterCatalogs = (repository: CatalogRepository) => () => repository.getFilterCatalogs()
