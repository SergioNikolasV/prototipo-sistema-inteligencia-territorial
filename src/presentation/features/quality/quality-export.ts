import { qualityActions } from "@/infrastructure/composition/quality.client"
import { downloadCsv } from "@/lib/download-csv"

export function exportAudit(sourceName: string) {
  const body = qualityActions.getAuditReport(sourceName).map((row) => `${row.source},${row.dimension},${row.result},${row.date}`).join("\n")
  downloadCsv(`auditoria-${sourceName.toLowerCase().replaceAll(" ", "-")}.csv`, `Fuente,Dimensión,Resultado,Fecha de actualización\n${body}`)
}
