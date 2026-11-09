import type { DatasetType, EtlLoad, EtlValidationResult } from "@/domain/etl/etl-load"

export type ProcessFileCommand = {
  fileName: string
  /** Cantidad de cargas visibles al momento de procesar (define el consecutivo). */
  currentLoadCount: number
}

export interface EtlRepository {
  listLoads(): Promise<EtlLoad[]>
  listDatasetTypes(): Promise<DatasetType[]>
  processFile(command: ProcessFileCommand): Promise<EtlLoad>
  getValidationLog(load: EtlLoad): EtlValidationResult[]
}
