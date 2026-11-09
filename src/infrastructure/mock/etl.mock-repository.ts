import type { EtlRepository, ProcessFileCommand } from "@/application/ports/etl-repository"
import type { EtlLoad, EtlValidationResult } from "@/domain/etl/etl-load"
import { DATASET_TYPES, SEEDED_ETL_LOADS, SIMULATED_PROCESSING_MS } from "./data/etl.data"

const FIRST_NEW_SEQUENCE = 95

export class MockEtlRepository implements EtlRepository {
  async listLoads() { return SEEDED_ETL_LOADS }
  async listDatasetTypes() { return DATASET_TYPES }

  processFile({ fileName, currentLoadCount }: ProcessFileCommand): Promise<EtlLoad> {
    const sequence = FIRST_NEW_SEQUENCE + currentLoadCount - SEEDED_ETL_LOADS.length
    return new Promise((resolve) => {
      window.setTimeout(() => resolve({
        id: `ETL-2025-${String(sequence).padStart(3, "0")}`,
        file: fileName,
        date: "Hoy · hace un momento",
        success: "10.000",
        rejected: "0",
        match: "99,4%",
        status: "Exitoso",
      }), SIMULATED_PROCESSING_MS)
    })
  }

  getValidationLog(load: EtlLoad): EtlValidationResult[] {
    return [
      { rule: "Código DIVIPOLA no homologado en catálogo vigente", records: load.status === "Ajustado" ? "38" : load.status === "Falla" ? "—" : "12", passed: false },
      { rule: "Formato de fecha fuera del estándar AAAA-MM-DD", records: load.status === "Falla" ? "—" : "4", passed: false },
      { rule: "Campos sensibles excluidos de la salida", records: "100%", passed: true },
    ]
  }
}
