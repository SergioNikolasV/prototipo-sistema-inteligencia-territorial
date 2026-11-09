import type { DatasetType, EtlLoad } from "@/domain/etl/etl-load"

export const SEEDED_ETL_LOADS: EtlLoad[] = [
  { id: "ETL-2025-094", file: "caracterizacion_region_andina.csv", date: "04 oct 2025 · 10:42", success: "24.680", rejected: "12", match: "99,8%", status: "Exitoso" },
  { id: "ETL-2025-093", file: "oferta_institucional_q3.xlsx", date: "02 oct 2025 · 16:18", success: "8.412", rejected: "38", match: "96,2%", status: "Ajustado" },
  { id: "ETL-2025-092", file: "registro_municipal_sept.csv", date: "30 sep 2025 · 09:06", success: "—", rejected: "—", match: "—", status: "Falla" },
]

export const DATASET_TYPES: DatasetType[] = [
  { value: "population", label: "Población víctima" },
  { value: "offer", label: "Oferta institucional" },
]

export const SIMULATED_PROCESSING_MS = 700
