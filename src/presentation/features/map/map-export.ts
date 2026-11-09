import type { DepartmentGapSummary } from "@/domain/indicators/indicators"
import { downloadCsv } from "@/lib/download-csv"

export function exportGapSummary(rows: DepartmentGapSummary[]) {
  const body = rows.map((row) => `${row.department},${row.gap},${row.characterizedPeople},${row.executedInvestment}`).join("\n")
  downloadCsv("resumen-brechas-territoriales.csv", `Departamento,Brecha,Personas caracterizadas,Inversión ejecutada\n${body}`)
}
