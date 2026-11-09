"use client"

import { useState, type ComponentProps } from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import type { TerritoryFeatureProperties } from "@/domain/territory/boundaries"
import { departmentOf } from "@/domain/territory/divipola"
import type { TerritoryLayer } from "@/domain/territory/territory-layer"
import type { TerritoryIndicatorIndex } from "@/domain/indicators/territory-indicator"
import { boundaries } from "@/infrastructure/composition/map.client"
import { BREACH_COLORS, MAP_COLORS } from "./breach-palette"

type MapProps = {
  layer: TerritoryLayer
  zoom: number
  selectedCode: string
  indicators: TerritoryIndicatorIndex
  onSelect: (code: string) => void
}

type GeographySource = ComponentProps<typeof Geographies>["geography"]

export default function ColombiaMap({ layer, zoom, selectedCode, indicators, onSelect }: MapProps) {
  const [hoveredCode, setHoveredCode] = useState("")
  const geography = boundaries.getBoundaries(layer) as unknown as GeographySource
  const isDepartmentLayer = layer === "department"

  return (
    <div className="colombia-map" aria-label={`Mapa de Colombia por ${isDepartmentLayer ? "departamento" : "municipio"}`}>
      <ComposableMap
        width={760}
        height={520}
        projection="geoMercator"
        projectionConfig={{ center: [-73.7, 4.1], scale: 1660 * zoom }}
        role="img"
        aria-label="Límites administrativos de Colombia coloreados por nivel de brecha"
      >
        <Geographies geography={geography}>
          {({ geographies }) => geographies.map((geo) => {
            const { code, departmentCode, name } = geo.properties as TerritoryFeatureProperties
            const selected = isDepartmentLayer ? departmentCode === departmentOf(selectedCode) : code === selectedCode
            const active = selected || code === hoveredCode
            const breachColor = BREACH_COLORS[indicators[code]?.breachLevel ?? "medium"]
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => onSelect(code)}
                onMouseEnter={() => setHoveredCode(code)}
                onMouseLeave={() => setHoveredCode("")}
                onFocus={() => setHoveredCode(code)}
                onBlur={() => setHoveredCode("")}
                aria-label={`${name}, código ${code}`}
                tabIndex={0}
                onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect(code) } }}
                fill={selected ? MAP_COLORS.selected : active ? MAP_COLORS.hovered : breachColor}
                stroke={MAP_COLORS.stroke}
                strokeWidth={isDepartmentLayer ? 1.5 : 0.45}
                style={{ cursor: "pointer", outline: "none", transition: "fill 160ms ease" }}
              />
            )
          })}
        </Geographies>
      </ComposableMap>
      <div className="map-island-dot" aria-hidden="true" />
      <span className="map-island-label">San Andrés</span>
    </div>
  )
}
