import type { EtlLoad } from "@/domain/etl/etl-load"
import { GovArrowRightIcon, GovArrowUpRightIcon, GovDownloadIcon, GovFileIcon } from "../../shared/govco-icons"
import { StatusPill } from "../../shared/StatusPill"
import { exportLoadHistory } from "./etl-export"

export function LoadsTable({ loads, onSelect }: { loads: EtlLoad[]; onSelect: (row: EtlLoad) => void }) {
  return (
    <section className="panel etl-history-panel">
      <div className="panel-header">
        <div>
          <h2>Historial de cargas</h2>
          <p>Seguimiento de ingestas y homologación de códigos DIVIPOLA.</p>
        </div>
        <button className="outline-button" type="button" onClick={() => exportLoadHistory(loads)}>
          <GovDownloadIcon size={16} /> Exportar historial
        </button>
      </div>
      <div className="table-scroll">
        <table className="data-table etl-table">
          <thead>
            <tr>
              <th>ID CARGA</th>
              <th>ARCHIVO</th>
              <th>FECHA / HORA</th>
              <th>EXITOSOS</th>
              <th>RECHAZADOS</th>
              <th>DIVIPOLA</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {loads.map((row) => (
              <tr key={row.id}>
                <td><span className="mono-id">{row.id}</span></td>
                <td><span className="file-cell"><GovFileIcon size={16} />{row.file}</span></td>
                <td>{row.date}</td>
                <td className="number-cell">{row.success}</td>
                <td className="number-cell">{row.rejected}</td>
                <td>{row.match}</td>
                <td><StatusPill status={row.status} /></td>
                <td>
                  <button type="button" className="table-action" onClick={() => onSelect(row)}>
                    Ver log <GovArrowUpRightIcon size={13} /><span className="sr-only"> de {row.id}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <span>Mostrando {loads.length} cargas recientes</span>
        <button type="button">Ver historial completo <GovArrowRightIcon size={14} /></button>
      </div>
    </section>
  )
}