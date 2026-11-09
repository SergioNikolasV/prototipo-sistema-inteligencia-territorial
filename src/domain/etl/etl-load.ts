export type EtlStatus = "Exitoso" | "Ajustado" | "Falla"

export type EtlLoad = {
  id: string
  file: string
  date: string
  success: string
  rejected: string
  match: string
  status: EtlStatus
}

export type EtlValidationResult = {
  rule: string
  records: string
  passed: boolean
}

export type DatasetType = {
  value: string
  label: string
}

export const ACCEPTED_ETL_FILE = /\.(csv|xlsx)$/i

export function isAcceptedEtlFile(fileName: string): boolean {
  return ACCEPTED_ETL_FILE.test(fileName)
}
