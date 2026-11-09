"use client"

import { AlertCircle, CheckCircle2, ClipboardList, Fingerprint, X } from "lucide-react"
import type { EtlLoad } from "@/domain/etl/etl-load"
import { etlActions } from "@/infrastructure/composition/etl.client"
import { StatusPill } from "../../shared/StatusPill"

export function ExceptionModal({ row, onClose }: { row: EtlLoad | null; onClose: () => void }) {
  if (!row) return null
  const validations = etlActions.getValidationLog(row)
  return (
    <div className="modal-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="exception-modal" role="dialog" aria-modal="true" aria-labelledby="exception-title">
        <div className="modal-header"><div className="modal-icon"><ClipboardList size={19} /></div><button type="button" className="icon-button" onClick={onClose} aria-label="Cerrar detalle de log"><X size={18} /></button></div>
        <p className="eyebrow">DETALLE DE PROCESAMIENTO · {row.id}</p><h2 id="exception-title">Log de excepciones</h2><p className="modal-description">Validaciones sintácticas y homologación DIVIPOLA para <strong>{row.file}</strong>.</p>
        <div className="exception-summary"><div><span>Estado</span><StatusPill status={row.status} /></div><div><span>Registros exitosos</span><strong>{row.success}</strong></div><div><span>Registros rechazados</span><strong>{row.rejected}</strong></div></div>
        <div className="exception-list"><div className="exception-list-head"><span>VALIDACIÓN</span><span>REGISTROS</span></div>{validations.map((validation) => <div key={validation.rule}>{validation.passed ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}<span>{validation.rule}</span><strong>{validation.records}</strong></div>)}</div>
        <div className="modal-privacy"><Fingerprint size={16} /><span>Los registros rechazados no incluyen datos personales en este prototipo.</span></div>
        <button type="button" className="primary-button modal-close-button" onClick={onClose}>Entendido</button>
      </section>
    </div>
  )
}
