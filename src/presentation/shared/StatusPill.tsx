import { AlertCircle, Check, X } from "lucide-react"
import type { EtlStatus } from "@/domain/etl/etl-load"

const STATUS_CLASS: Record<EtlStatus, string> = { Exitoso: "status-success", Ajustado: "status-warning", Falla: "status-error" }

export function StatusPill({ status }: { status: EtlStatus }) {
  const icon = status === "Exitoso" ? <Check size={12} /> : status === "Ajustado" ? <AlertCircle size={12} /> : <X size={12} />
  return <span className={`status-pill ${STATUS_CLASS[status]}`}>{icon}{status}</span>
}
