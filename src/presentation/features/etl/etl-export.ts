import type { EtlLoad } from "@/domain/etl/etl-load"
import { downloadCsv } from "@/lib/download-csv"

export function exportLoadHistory(loads: EtlLoad[]) {
  const body = loads.map((row) => `${row.id},${row.file},${row.date},${row.success},${row.rejected},${row.match},${row.status}`).join("\n")
  downloadCsv("historial-cargas-rni.csv", `ID,Archivo,Fecha,Exitosos,Rechazados,H homologación,Estado\n${body}`)
}
