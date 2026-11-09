/** Composition root del cliente para interacciones ETL (procesamiento simulado y logs). */
import { getEtlValidationLog, processEtlFile } from "@/application/use-cases/etl"
import { MockEtlRepository } from "../mock/etl.mock-repository"

const etlRepository = new MockEtlRepository()

export const etlActions = {
  processFile: processEtlFile(etlRepository),
  getValidationLog: getEtlValidationLog(etlRepository),
}
