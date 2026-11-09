export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`}>
      <div className="brand-mark" aria-hidden="true"><span>RNI</span></div>
      <div className="brand-copy">
        <strong>Red Nacional de Información</strong>
        <span>Unidad para las Víctimas</span>
      </div>
    </div>
  )
}
