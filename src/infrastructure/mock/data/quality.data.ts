import type { DataSource, QualityOverview } from "@/domain/quality/data-source"
import type { KpiIndicator } from "@/domain/indicators/indicators"

export const DATA_SOURCES: DataSource[] = [
  { name: "Caracterización de población", detail: "Unidad para las Víctimas · Mensual", refreshed: "04 oct 2025", validity: 96, records: "1,24 M", kind: "population" },
  { name: "Oferta de programas", detail: "Entidades territoriales · Trimestral", refreshed: "02 oct 2025", validity: 87, records: "84.210", kind: "programs" },
  { name: "División político-administrativa", detail: "DANE · DIVIPOLA 2025", refreshed: "28 sep 2025", validity: 98, records: "1.122", kind: "divipola" },
]

export const QUALITY_OVERVIEW: QualityOverview = { globalIndex: 84, minimumThreshold: 70 }

export const QUALITY_DIMENSIONS: KpiIndicator[] = [
  { id: "completeness", label: "Completitud", value: "92%", note: "Campos requeridos no nulos", tone: "blue", trend: "1,8 pp" },
  { id: "divipola-consistency", label: "Consistencia DIVIPOLA", value: "98%", note: "Códigos válidos · catálogo DANE", tone: "green", trend: "0,6 pp" },
  { id: "syntactic-validity", label: "Validez sintáctica", value: "88%", note: "Formatos estandarizados", tone: "amber", trend: "2,1 pp" },
]

export const AUDIT_REPORT_DIMENSIONS = [
  { dimension: "Completitud", result: "92%" },
  { dimension: "Consistencia DIVIPOLA", result: "98%" },
  { dimension: "Validez sintáctica", result: "88%" },
]

export const AUDIT_REPORT_DATE = "04 oct 2025"
