"use client"

import { useState } from "react"
import { ArrowDownToLine, ArrowRight, ChevronDown, Filter } from "lucide-react"
import type { DataSource } from "@/domain/quality/data-source"
import { DATA_SOURCE_ICONS } from "../../shared/kpi-icons"
import { exportAudit } from "./quality-export"

export function AuditTable({ sources }: { sources: DataSource[] }) {
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  return (
    <section className="panel audit-panel">
      <div className="panel-header"><div><h2>Auditoría por dataset</h2><p>Estado de las fuentes integradas y última fecha de actualización.</p></div><button className="subtle-filter-button" type="button"><Filter size={14} /> Todas las fuentes <ChevronDown size={13} /></button></div>
      <div className="table-scroll"><table className="data-table audit-table"><thead><tr><th>FUENTE INTEGRADA</th><th>REGISTROS</th><th>ÚLTIMA ACTUALIZACIÓN</th><th>VALIDEZ</th><th>ESTADO</th><th>REPORTE</th></tr></thead><tbody>{sources.map(({ name, detail, refreshed, validity, records, kind }) => {
        const Icon = DATA_SOURCE_ICONS[kind]
        return <tr key={name} className={selectedSource === name ? "audit-row-selected" : ""} onClick={() => setSelectedSource(name)}><td><div className="audit-source"><div className="audit-source-icon"><Icon size={16} /></div><div><strong>{name}</strong><span>{detail}</span></div></div></td><td>{records}</td><td>{refreshed}</td><td><div className="validity-cell"><div className="validity-bar"><span style={{ width: `${validity}%` }} /></div><strong>{validity}%</strong></div></td><td><span className="quality-status"><span /> En línea</span></td><td><button type="button" className="download-row-button" onClick={(event) => { event.stopPropagation(); exportAudit(name) }} aria-label={`Descargar reporte de auditoría: ${name}`}><ArrowDownToLine size={16} /></button></td></tr>
      })}</tbody></table></div>
      <div className="table-footer"><span><span className="status-pulse" /> 3 fuentes activas · Actualizado hace 2 horas</span><button type="button">Ver todas las fuentes <ArrowRight size={13} /></button></div>
    </section>
  )
}
