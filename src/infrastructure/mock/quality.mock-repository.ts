import type { QualityRepository } from "@/application/ports/quality-repository"
import type { QualityDimensionResult } from "@/domain/quality/data-source"
import { AUDIT_REPORT_DATE, AUDIT_REPORT_DIMENSIONS, DATA_SOURCES, QUALITY_DIMENSIONS, QUALITY_OVERVIEW } from "./data/quality.data"

export class MockQualityRepository implements QualityRepository {
  async listSources() { return DATA_SOURCES }
  async getOverview() { return QUALITY_OVERVIEW }
  async getDimensions() { return QUALITY_DIMENSIONS }

  getAuditReport(sourceName: string): QualityDimensionResult[] {
    return AUDIT_REPORT_DIMENSIONS.map(({ dimension, result }) => ({ source: sourceName, dimension, result, date: AUDIT_REPORT_DATE }))
  }
}
