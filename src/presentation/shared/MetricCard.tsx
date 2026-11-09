import { ArrowUpRight, type LucideIcon } from "lucide-react"
import type { KpiIndicator } from "@/domain/indicators/indicators"

export function MetricCard({ indicator, icon: Icon }: { indicator: KpiIndicator; icon: LucideIcon }) {
  const { label, value, note, tone, trend } = indicator
  return (
    <article className="metric-card">
      <div className={`metric-icon tone-${tone}`}><Icon size={18} /></div>
      {trend && <span className="metric-trend"><ArrowUpRight size={12} /> {trend}</span>}
      <p>{label}</p>
      <strong>{value}</strong>
      <span className="metric-note">{note}</span>
    </article>
  )
}
