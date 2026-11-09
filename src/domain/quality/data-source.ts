export type DataSourceKind = "population" | "programs" | "divipola"

export type DataSource = {
  name: string
  detail: string
  refreshed: string
  validity: number
  records: string
  kind: DataSourceKind
}

export type QualityDimensionResult = {
  source: string
  dimension: string
  result: string
  date: string
}

export type QualityOverview = {
  globalIndex: number
  minimumThreshold: number
}
