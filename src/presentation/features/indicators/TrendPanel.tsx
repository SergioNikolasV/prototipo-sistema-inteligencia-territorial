import { ArrowDownToLine, ArrowRight, ChevronDown } from "lucide-react"
import type { GapTrend } from "@/domain/indicators/indicators"

export function TrendPanel({ trend }: { trend: GapTrend }) {
  return (
    <section className="panel trend-panel">
      <div className="panel-header"><div><h2>Evolución de la brecha</h2><p>Índice de cobertura territorial</p></div><button className="period-button" type="button">Últimos 12 meses <ChevronDown size={13} /></button></div>
      <div className="trend-callout"><div><span>Brecha promedio</span><strong>{trend.average}</strong></div><span className="trend-pill"><ArrowDownToLine size={13} /> {trend.change}</span></div>
      <div className="sparkline" aria-label="La brecha promedio ha disminuido durante los últimos doce meses" role="img">
        {trend.monthlySeries.map((height, index) => <div className="sparkline-column" key={`${height}-${index}`}><span style={{ height: `${height}%` }} /></div>)}
      </div>
      <div className="sparkline-labels">{trend.axisLabels.map((label) => <span key={label}>{label}</span>)}</div>
      <div className="trend-foot"><span><span className="status-pulse" /> Actualizado hoy</span><button type="button">Ver serie completa <ArrowRight size={13} /></button></div>
    </section>
  )
}
