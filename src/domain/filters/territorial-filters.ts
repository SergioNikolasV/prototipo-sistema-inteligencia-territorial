export type TerritorialFilters = {
  department: string
  municipality: string
  year: string
  event: string
  program: string
}

export type FilterKey = keyof TerritorialFilters

export const DEFAULT_FILTERS: TerritorialFilters = {
  department: "all",
  municipality: "all",
  year: "2025",
  event: "all",
  program: "all",
}

export type FilterOption = {
  value: string
  label: string
}

export type FilterCatalogs = Record<FilterKey, FilterOption[]>
