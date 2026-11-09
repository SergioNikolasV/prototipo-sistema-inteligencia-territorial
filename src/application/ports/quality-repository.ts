import type { DataSource, QualityDimensionResult, QualityOverview } from "@/domain/quality/data-source"
import type { KpiIndicator } from "@/domain/indicators/indicators"

export interface QualityRepository {
  listSources(): Promise<DataSource[]>
  getOverview(): Promise<QualityOverview>
  getDimensions(): Promise<KpiIndicator[]>
  getAuditReport(sourceName: string): QualityDimensionResult[]
}
