/** Composition root del cliente para exportes de auditoría. */
import { getAuditReport } from "@/application/use-cases/quality"
import { MockQualityRepository } from "../mock/quality.mock-repository"

const qualityRepository = new MockQualityRepository()

export const qualityActions = {
  getAuditReport: getAuditReport(qualityRepository),
}
