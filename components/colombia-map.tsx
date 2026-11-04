"use client"

import { useState, type ComponentProps } from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import municipalitiesGeo from "@john-guerra/geo-colombia/geojson/municipalities"
import departmentsGeo from "@john-guerra/geo-colombia/geojson/departments"

export type Municipality = { code: string; name: string; department: string }

type MapProps = {
  layer: "municipality" | "department"
  zoom: number
  selectedCode: string
  onSelect: (code: string) => void
}

const breachColors = ["#D97706", "#DC2626", "#16A34A"]

function codeFor(properties: Record<string, unknown>) {
  if (properties.MPIO_CDPMP) return String(properties.MPIO_CDPMP).padStart(5, "0")
  return `${String(properties.DPTO_CCDGO ?? "").padStart(2, "0")}${String(properties.MPIO_CCDGO ?? "001").padStart(3, "0")}`
}

function colorFor(properties: Record<string, unknown>) {
  const code = codeFor(properties)
  const seed = code.split("").reduce((sum, digit) => sum + Number(digit), 0)
  return breachColors[seed % breachColors.length]
}

export function getColombiaMunicipalities(): Municipality[] {
  const departments = new Map((departmentsGeo.features as Array<{ properties: Record<string, unknown> }>).map(({ properties }) => [String(properties.DPTO_CCDGO ?? "").padStart(2, "0"), String(properties.DPTO_CNMBR ?? "Colombia")]))
  const unique = new Map<string, Municipality>()
  const features = municipalitiesGeo.features as Array<{ properties: Record<string, unknown> }>
  for (const { properties } of features) {
    const code = codeFor(properties)
    if (!unique.has(code)) unique.set(code, {
      code,
      name: String(properties.MPIO_CNMBR ?? "Municipio"),
      department: departments.get(String(properties.DPTO_CCDGO ?? "").padStart(2, "0")) ?? "Colombia",
    })
  }
  return [...unique.values()]
}

export default function ColombiaMap({ layer, zoom, selectedCode, onSelect }: MapProps) {
  const [hoveredCode, setHoveredCode] = useState("")
  const geography = (layer === "municipality" ? municipalitiesGeo : departmentsGeo) as unknown as ComponentProps<typeof Geographies>["geography"]

  return (
    <div className="colombia-map" aria-label={`Mapa de Colombia por ${layer === "municipality" ? "municipio" : "departamento"}`}>
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
            const props = geo.properties as Record<string, unknown>
            const code = codeFor(props)
            const selected = layer === "municipality" ? code === selectedCode : String(props.DPTO_CCDGO ?? "").padStart(2, "0") === selectedCode.slice(0, 2)
            const active = selected || code === hoveredCode
            const isDepartmentLayer = layer === "department"
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => onSelect(code)}
                onMouseEnter={() => setHoveredCode(code)}
                onMouseLeave={() => setHoveredCode("")}
                onFocus={() => setHoveredCode(code)}
                onBlur={() => setHoveredCode("")}
                aria-label={`${String(props.MPIO_CNMBR ?? props.DPTO_CNMBR ?? "Municipio")}, código ${code}`}
                tabIndex={0}
                onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect(code) } }}
                fill={selected ? "#0F2C59" : active ? "#E5A23C" : colorFor(props)}
                stroke="#FFFFFF"
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
