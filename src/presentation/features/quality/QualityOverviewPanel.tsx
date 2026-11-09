import { CheckCircle2, Sparkles } from "lucide-react"
import type { QualityOverview } from "@/domain/quality/data-source"

export function QualityOverviewPanel({ overview }: { overview: QualityOverview }) {
  const { globalIndex, minimumThreshold } = overview
  return (
    <section className="quality-overview">
      <div className="panel quality-score-panel"><div className="quality-score-copy"><span className="eyebrow">SALUD GLOBAL DE FUENTES</span><h2>Índice de calidad</h2><p>Resultado agregado de las fuentes activas en la Red Nacional de Información.</p><div className="quality-score-meta"><span className="quality-score-badge"><CheckCircle2 size={14} /> Saludable</span><span>+2,4 pp vs. trimestre anterior</span></div></div><div className="quality-gauge" role="meter" aria-label="Índice global de calidad" aria-valuenow={globalIndex} aria-valuemin={0} aria-valuemax={100}><div className="gauge-center"><strong>{globalIndex}<span>%</span></strong><small>Índice global</small></div></div><div className="gauge-scale"><span>0</span><span>100</span></div></div>
      <div className="quality-side-note"><div className="quality-note-icon"><Sparkles size={18} /></div><div><strong>Estabilidad sostenida</strong><p>Las fuentes integradas mantienen un nivel de calidad por encima del umbral institucional del {minimumThreshold}%.</p></div><div className="quality-note-bar"><span /></div><div className="quality-note-foot"><span>Umbral mínimo</span><strong>{minimumThreshold}%</strong></div></div>
    </section>
  )
}
