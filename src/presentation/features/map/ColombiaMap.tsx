"use client"

import { useEffect, useMemo, useRef, useState, type ComponentProps, type PointerEvent as ReactPointerEvent } from "react"
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
  onGestureScaleChange?: (scale: number) => void
}

type GeographySource = ComponentProps<typeof Geographies>["geography"]
type View = { scale: number; x: number; y: number }
type Point = { x: number; y: number }

const MOBILE_QUERY = "(max-width: 680px)"
const GESTURE = { min: 0.6, max: 6, dragThreshold: 6 }
const INITIAL_VIEW: View = { scale: 1, x: 0, y: 0 }

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY)
    const update = () => setIsMobile(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])
  return isMobile
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export default function ColombiaMap({ layer, zoom, selectedCode, indicators, onSelect, onGestureScaleChange }: MapProps) {
  const [hoveredCode, setHoveredCode] = useState("")
  const [view, setView] = useState<View>(INITIAL_VIEW)
  const isMobile = useIsMobile()
  const containerRef = useRef<HTMLDivElement>(null)
  const pointers = useRef(new Map<number, Point>())
  const viewRef = useRef<View>(INITIAL_VIEW)
  const pinchStart = useRef<{ distance: number; scale: number } | null>(null)
  const dragOrigin = useRef<Point | null>(null)
  const dragging = useRef(false)
  const geography = boundaries.getBoundaries(layer) as unknown as GeographySource
  const isDepartmentLayer = layer === "department"

  const applyView = (next: View) => {
    viewRef.current = next
    setView(next)
  }

  useEffect(() => {
    if (!isMobile) {
      viewRef.current = INITIAL_VIEW
      setView(INITIAL_VIEW)
      onGestureScaleChange?.(1)
    }
  }, [isMobile, onGestureScaleChange])

  const clampView = (next: View): View => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return next
    const maxX = (rect.width * next.scale) / 2
    const maxY = (rect.height * next.scale) / 2
    return {
      scale: next.scale,
      x: clamp(next.x, -maxX, rect.width - rect.width * next.scale + maxX),
      y: clamp(next.y, -maxY, rect.height - rect.height * next.scale + maxY),
    }
  }

  const localPoint = (event: { clientX: number; clientY: number }): Point => {
    const rect = containerRef.current?.getBoundingClientRect()
    return { x: event.clientX - (rect?.left ?? 0), y: event.clientY - (rect?.top ?? 0) }
  }

  const pinchMetrics = () => {
    const [a, b] = Array.from(pointers.current.values())
    return { distance: Math.hypot(a.x - b.x, a.y - b.y), center: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } }
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isMobile) return
    pointers.current.set(event.pointerId, localPoint(event))
    if (pointers.current.size === 1) {
      dragOrigin.current = localPoint(event)
      dragging.current = false
    } else if (pointers.current.size === 2) {
      dragging.current = true
      pinchStart.current = { distance: pinchMetrics().distance, scale: viewRef.current.scale }
      try { event.currentTarget.setPointerCapture(event.pointerId) } catch { /* noop */ }
    }
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isMobile || !pointers.current.has(event.pointerId)) return
    const previous = pointers.current.get(event.pointerId) as Point
    const current = localPoint(event)
    pointers.current.set(event.pointerId, current)

    if (pointers.current.size >= 2 && pinchStart.current) {
      const { distance, center } = pinchMetrics()
      const current = viewRef.current
      const nextScale = clamp(pinchStart.current.scale * (distance / pinchStart.current.distance), GESTURE.min, GESTURE.max)
      const ratio = nextScale / current.scale
      applyView(clampView({ scale: nextScale, x: center.x - (center.x - current.x) * ratio, y: center.y - (center.y - current.y) * ratio }))
      return
    }

    if (!dragOrigin.current) return
    if (!dragging.current) {
      if (Math.hypot(current.x - dragOrigin.current.x, current.y - dragOrigin.current.y) < GESTURE.dragThreshold) return
      dragging.current = true
      try { event.currentTarget.setPointerCapture(event.pointerId) } catch { /* noop */ }
    }
    const base = viewRef.current
    applyView(clampView({ scale: base.scale, x: base.x + (current.x - previous.x), y: base.y + (current.y - previous.y) }))
  }

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isMobile) return
    pointers.current.delete(event.pointerId)
    pinchStart.current = null
    if (pointers.current.size === 1) {
      dragOrigin.current = Array.from(pointers.current.values())[0]
    } else if (pointers.current.size === 0) {
      dragOrigin.current = null
      onGestureScaleChange?.(viewRef.current.scale)
      // Se mantiene "dragging" hasta después del click para no seleccionar al terminar un arrastre.
      window.setTimeout(() => { dragging.current = false }, 0)
    }
  }

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile && dragging.current) {
      event.stopPropagation()
      event.preventDefault()
    }
  }

  const mapElement = useMemo(() => (
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
  ), [geography, zoom, isDepartmentLayer, selectedCode, hoveredCode, indicators, onSelect])

  return (
    <div
      ref={containerRef}
      className="colombia-map"
      aria-label={`Mapa de Colombia por ${isDepartmentLayer ? "departamento" : "municipio"}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onClickCapture={handleClickCapture}
    >
      <div
        className="colombia-map-pan"
        style={isMobile ? { transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` } : undefined}
      >
        {mapElement}
        <div className="map-island-dot" aria-hidden="true" />
        <span className="map-island-label">San Andrés</span>
      </div>
    </div>
  )
}
