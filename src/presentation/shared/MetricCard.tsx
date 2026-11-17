import type { KpiIndicator } from "@/domain/indicators/indicators"
import { GovArrowUpRightIcon, type GovIcon } from "./govco-icons"

export function MetricCard({ indicator, icon: Icon }: { indicator: KpiIndicator; icon: GovIcon }) {
  const { label, value, note, tone, trend } = indicator
  return (
    <article className="metric-card">
      <div className={`metric-icon tone-${tone}`}><Icon size={18} /></div>
      {trend && <span className="metric-trend"><GovArrowUpRightIcon size={13} /> {trend}</span>}
      <p>{label}</p>
      <strong>{value}</strong>
      <span className="metric-note">{note}</span>
    </article>
  )
}