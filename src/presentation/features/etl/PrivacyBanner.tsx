import { GovShieldCheckIcon } from "../../shared/govco-icons"

export function PrivacyBanner() {
  return (
    <section className="privacy-banner" aria-label="Protección de datos personales">
      <div className="privacy-banner-icon"><GovShieldCheckIcon size={22} /></div>
      <div className="privacy-banner-copy">
        <span className="eyebrow">PROTECCIÓN DE DATOS · LEY 1581</span>
        <h2>Filtro de anonimización automática activo</h2>
        <p>El flujo de producción debe descartar campos identificables antes de cualquier análisis agregado.</p>
      </div>
      <div className="privacy-banner-status"><span className="status-pulse" /> Modo demostración</div>
      <div className="privacy-banner-stats">
        <div><span>Registros analizados</span><strong>10.000</strong></div>
        <div><span>Campos sensibles descartados</span><strong>NUI · cédulas · nombres</strong></div>
        <div><span>Persistencia sensible</span><strong className="zero-value">0 registros</strong></div>
      </div>
    </section>
  )
}