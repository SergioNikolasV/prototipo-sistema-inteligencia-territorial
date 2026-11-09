"use client"

import { useEffect, useState } from "react"
import { ArrowDownToLine, ArrowRight, CheckCircle2, ChevronRight, Layers3, MapPin, Menu, X, ZoomIn, ZoomOut } from "lucide-react"
import type { DepartmentGapSummary, GapTrend, KpiIndicator, NeedVsOffer } from "@/domain/indicators/indicators"
import type { TerritoryIndicatorIndex } from "@/domain/indicators/territory-indicator"
import { DEFAULT_MUNICIPALITY_CODE } from "@/domain/territory/divipola"
import type { TerritoryLayer } from "@/domain/territory/territory-layer"
import { useConsole } from "../../shell/console-context"
import { subscribeToFilters } from "../../shell/filter-events"
import { MetricCard } from "../../shared/MetricCard"
import { PageHeading } from "../../shared/PageHeading"
import { PrivacyFootnote } from "../../shared/PrivacyFootnote"
import { iconForKpi } from "../../shared/kpi-icons"
import { ComparativeChart } from "../indicators/ComparativeChart"
import { TrendPanel } from "../indicators/TrendPanel"
import ColombiaMap from "./ColombiaMap"
import { exportGapSummary } from "./map-export"

const ZOOM = { min: 0.76, max: 1.5, step: 0.12 }

export type MapViewProps = {
  territoryIndicators: TerritoryIndicatorIndex
  kpis: KpiIndicator[]
  needVsOffer: NeedVsOffer[]
  gapTrend: GapTrend
  gapSummary: DepartmentGapSummary[]
}

export function MapView({ territoryIndicators, kpis, needVsOffer, gapTrend, gapSummary }: MapViewProps) {
  const { places, filters, searchCode, openMobileMenu } = useConsole()
  const [layer, setLayer] = useState<TerritoryLayer>("municipality")
  const [zoom, setZoom] = useState(1)
  const [selectedCode, setSelectedCode] = useState(DEFAULT_MUNICIPALITY_CODE)
  const [mapInteracted, setMapInteracted] = useState(false)
  const [filterApplied, setFilterApplied] = useState(false)
  const selected = selectedCode ? places.find((place) => place.code === selectedCode) ?? places.find((place) => place.code === DEFAULT_MUNICIPALITY_CODE) ?? places[0] : undefined
  const selectedIndicator = selected ? territoryIndicators[selected.code] : undefined

  // Sincroniza la selección con la búsqueda global (ajuste de estado en render, sin efecto en cascada).
  const [syncedSearchCode, setSyncedSearchCode] = useState("")
  if (searchCode !== syncedSearchCode) {
    setSyncedSearchCode(searchCode)
    if (searchCode) {
      setSelectedCode(searchCode)
      setMapInteracted(true)
    }
  }

  useEffect(() => subscribeToFilters({
    onApplied: (applied) => {
      setFilterApplied(true)
      if (applied.municipality !== "all") {
        setSelectedCode(applied.municipality)
        setMapInteracted(true)
      }
    },
    onCleared: () => {
      setFilterApplied(false)
      setSelectedCode(DEFAULT_MUNICIPALITY_CODE)
      setMapInteracted(false)
    },
  }), [])

  return (
    <>
      <PageHeading eyebrow="PLATAFORMA DE ANÁLISIS" title="Visor territorial" description="Brechas entre población víctima caracterizada y oferta institucional." right={<><span className="live-meta"><span className="status-pulse" /> Corte de información · 30 sep 2025</span><button className="outline-button export-button" type="button" onClick={() => exportGapSummary(gapSummary)}><ArrowDownToLine size={15} /> Exportar</button></>} />
      {filterApplied && <div className="filter-applied-note"><CheckCircle2 size={15} /> Filtros aplicados · Año {filters.year} <button type="button" onClick={() => setFilterApplied(false)} aria-label="Descartar filtros"><X size={13} /></button></div>}
      <div className="map-section-head"><div><h2>Distribución geográfica de brechas</h2><p>Selecciona un municipio para explorar sus indicadores agregados.</p></div><span className="data-demo-label"><span /> Datos agregados de demostración</span></div>
      <section className="map-card" aria-label="Mapa interactivo de brechas municipales de Colombia">
        <div className="map-toolbar">
          <button className="mobile-menu-button" onClick={openMobileMenu} type="button" aria-label="Abrir filtros y navegación"><Menu size={18} /></button>
          <div className="map-breadcrumb"><MapPin size={14} /><span>Colombia</span><ChevronRight size={13} /><strong>{layer === "municipality" ? "Municipal" : "Departamental"}</strong></div>
          <div className="layer-switch" role="group" aria-label="Escala territorial">
            <button type="button" className={layer === "department" ? "selected" : ""} onClick={() => setLayer("department")} aria-pressed={layer === "department"}>Departamento</button>
            <button type="button" className={layer === "municipality" ? "selected" : ""} onClick={() => setLayer("municipality")} aria-pressed={layer === "municipality"}>Municipio</button>
          </div>
          <div className="zoom-tools"><button type="button" onClick={() => setZoom((current) => Math.min(ZOOM.max, current + ZOOM.step))} aria-label="Acercar mapa"><ZoomIn size={17} /></button><span>{Math.round(zoom * 100)}%</span><button type="button" onClick={() => setZoom((current) => Math.max(ZOOM.min, current - ZOOM.step))} aria-label="Alejar mapa"><ZoomOut size={17} /></button></div>
        </div>
        <div className="map-canvas">
          <div className="map-coordinates"><span>4° 36′ N</span><span>72° 54′ O</span></div>
          <div className="map-source-stamp"><Layers3 size={13} /> Límites municipales · DANE</div>
          <ColombiaMap layer={layer} zoom={zoom} selectedCode={selectedCode} indicators={territoryIndicators} onSelect={(code) => { setSelectedCode(code); setMapInteracted(true) }} />
          {selected && selectedIndicator && <div className={`map-tooltip ${mapInteracted ? "" : "map-tooltip-initial"}`} aria-live="polite">
            <div className="tooltip-top"><span className="tooltip-dot" /><div><strong>{selected.name}</strong><small>{selected.department} · {selected.code}</small></div><button type="button" onClick={() => setSelectedCode("")} aria-label="Cerrar datos del municipio"><X size={14} /></button></div>
            <div className="tooltip-metrics"><div><span>Víctimas caracterizadas</span><strong>{selectedIndicator.characterizedVictims.toLocaleString("es-CO")}</strong></div><div><span>Oferta asignada</span><strong>${selectedIndicator.assignedOffer.toFixed(1).replace(".", ",")} mil M</strong></div><div><span>Brecha no cubierta</span><strong className="text-high">{selectedIndicator.uncoveredGap}%</strong></div></div>
            <button type="button" className="tooltip-link">Ver ficha agregada <ArrowRight size={13} /></button>
          </div>}
          <div className="map-attribution">Fuente: RNI · DANE · Corte 2025</div>
          <div className="map-legend"><div className="legend-head"><strong>Nivel de brecha</strong><span>% no cubierta</span></div><div><i className="severity-dot severity-critical" /><span>Alta</span><small>&gt; 35%</small></div><div><i className="severity-dot severity-medium" /><span>Media</span><small>20–35%</small></div><div><i className="severity-dot severity-low" /><span>Baja / óptima</span><small>&lt; 20%</small></div></div>
        </div>
      </section>
      <div className="metrics-grid">
        {kpis.map((kpi) => <MetricCard key={kpi.id} indicator={kpi} icon={iconForKpi(kpi.id)} />)}
      </div>
      <div className="analytics-grid"><ComparativeChart data={needVsOffer} /><TrendPanel trend={gapTrend} /></div>
      <PrivacyFootnote message="Los indicadores presentados son agregados estadísticos. No se visualizan datos individuales ni identificadores personales." action="Metodología" />
    </>
  )
}
