import type { EtlLoad } from "@/domain/etl/etl-load"
import { downloadCsv } from "@/lib/download-csv"

export function exportLoadHistory(loads: EtlLoad[]) {
  const body = loads
    .map((row) => `${row.id},${row.file},${row.date},${row.success},${row.rejected},${row.match},${row.status}`)
    .join("\n")
  downloadCsv("historial-cargas-rni.csv", `ID,Archivo,Fecha,Exitosos,Rechazados,Homologación DIVIPOLA,Estado\n${body}`)
}

export function exportLoadReceipt(row: EtlLoad) {
  const safeId = row.id.toLowerCase().replace(/[^a-z0-9-_]/g, "-")
  const header =
    "Entidad,Módulo,ID Carga,Archivo Procesado,Fecha y Hora,Registros Exitosos,Registros Rechazados,Homologación DIVIPOLA,Estado"
  const values = [
    '"Unidad para las Víctimas (RNI)"',
    '"Sistema de Inteligencia Territorial - Módulo III"',
    `"${row.id}"`,
    `"${row.file}"`,
    `"${row.date}"`,
    row.success,
    row.rejected,
    `"${row.match}"`,
    `"${row.status}"`,
  ].join(",")

  downloadCsv(`comprobante-carga-${safeId}.csv`, `${header}\n${values}`)
}
