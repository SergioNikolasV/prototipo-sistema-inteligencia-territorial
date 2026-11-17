"use client"

import type { KpiIndicator } from "@/domain/indicators/indicators"
import type { DataSource, QualityOverview } from "@/domain/quality/data-source"
import { GovArrowUpRightIcon, GovCalculatorIcon, GovDownloadIcon } from "../../shared/govco-icons"
import { MetricCard } from "../../shared/MetricCard"
import { PageHeading } from "../../shared/PageHeading"
import { iconForKpi } from "../../shared/kpi-icons"
import { AuditTable } from "./AuditTable"
import { QualityOverviewPanel } from "./QualityOverviewPanel"
import { exportAudit } from "./quality-export"

export type QualityViewProps = { sources: DataSource[]; overview: QualityOverview; dimensions: KpiIndicator[] }

export function QualityView({ sources, overview, dimensions }: QualityViewProps) {
  return (
    <>
      <PageHeading
        eyebrow="OBSERVABILIDAD DE FUENTES"
        title="Calidad de datos"
        description="Indicadores de completitud, consistencia y validez por fuente integrada."
        right={
          <button className="outline-button" type="button" onClick={() => exportAudit("reporte-global")}>
            <GovDownloadIcon size={15} /> Descargar reporte
          </button>
        }
      />
      <QualityOverviewPanel overview={overview} />
      <div className="quality-dimensions">
        {dimensions.map((dimension) => (
          <MetricCard key={dimension.id} indicator={dimension} icon={iconForKpi(dimension.id)} />
        ))}
      </div>
      <AuditTable sources={sources} />
      <section className="quality-method-note">
        <div>
          <GovCalculatorIcon size={17} />
          <strong>¿Cómo se calcula el índice?</strong>
        </div>
        <p>
          Promedio ponderado de completitud (40%), consistencia DIVIPOLA (35%) y validez sintáctica (25%). Los valores
          son demostrativos y no representan una evaluación oficial.
        </p>
        <button type="button">
          Ver metodología <GovArrowUpRightIcon size={13} />
        </button>
      </section>
    </>
  )
}