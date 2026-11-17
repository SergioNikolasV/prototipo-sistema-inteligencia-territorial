import type { EtlStatus } from "@/domain/etl/etl-load"
import { GovCheckCircleIcon, GovExclamationTriangleIcon, GovTimesCircleIcon } from "./govco-icons"

const STATUS_CLASS: Record<EtlStatus, string> = { Exitoso: "status-success", Ajustado: "status-warning", Falla: "status-error" }

export function StatusPill({ status }: { status: EtlStatus }) {
  const icon =
    status === "Exitoso" ? (
      <GovCheckCircleIcon size={14} />
    ) : status === "Ajustado" ? (
      <GovExclamationTriangleIcon size={14} />
    ) : (
      <GovTimesCircleIcon size={14} />
    )
  return <span className={`status-pill ${STATUS_CLASS[status]}`}>{icon}{status}</span>
}