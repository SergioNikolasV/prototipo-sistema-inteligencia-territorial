import { MoreHorizontal } from "lucide-react"
import type { NeedVsOffer } from "@/domain/indicators/indicators"

const AXIS_TICKS = [100, 75, 50, 25, 0]

export function ComparativeChart({ data }: { data: NeedVsOffer[] }) {
  return (
    <section className="panel chart-panel" aria-labelledby="chart-title">
      <div className="panel-header"><div><h2 id="chart-title">Necesidad vs. oferta asignada</h2><p>Personas caracterizadas y cobertura de programas</p></div><button className="more-button" aria-label="Más opciones del gráfico" type="button"><MoreHorizontal size={19} /></button></div>
      <div className="chart-legend"><span><i className="legend-dot need-dot" /> Necesidad</span><span><i className="legend-dot offer-dot" /> Oferta asignada</span><span className="chart-unit">Índice relativo · 2025</span></div>
      <div className="bar-chart" role="img" aria-label="Gráfico de barras comparativo de necesidad frente a oferta asignada por departamento">
        <div className="chart-axis">{AXIS_TICKS.map((tick) => <span key={tick}>{tick}</span>)}</div>
        <div className="chart-plot">
          {AXIS_TICKS.map((n) => <div className="chart-grid-line" key={n}><span /></div>)}
          {data.map((item) => <div className="bar-group" key={item.name} aria-label={`${item.name}: necesidad ${item.need}, oferta ${item.offer}`}><div className="bars"><span className="bar need-bar" style={{ height: `${item.need}%` }} /><span className="bar offer-bar" style={{ height: `${item.offer}%` }} /></div><span className="bar-label">{item.name}</span></div>)}
        </div>
      </div>
    </section>
  )
}
