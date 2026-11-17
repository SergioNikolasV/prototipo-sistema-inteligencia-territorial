"use client"

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type PointerEvent as ReactPointerEvent,
} from "react"
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
  resetSignal?: number
}

type GeographySource = ComponentProps<typeof Geographies>["geography"]
type View = { scale: number; x: number; y: number }
type Point = { x: number; y: number }

const GESTURE = { min: 0.75, max: 5, dragThreshold: 4 }
const INITIAL_VIEW: View = { scale: 1, x: 0, y: 0 }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export default function ColombiaMap({
  layer,
  zoom,
  selectedCode,
  indicators,
  onSelect,
  onGestureScaleChange,
  resetSignal = 0,
}: MapProps) {
  const [hoveredCode, setHoveredCode] = useState("")
  const [view, setView] = useState<View>(INITIAL_VIEW)
  const [isGrabbing, setIsGrabbing] = useState(false)
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
    applyView(INITIAL_VIEW)
    onGestureScaleChange?.(1)
  }, [resetSignal, onGestureScaleChange])

  const clampView = (next: View): View => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return next
    const marginX = rect.width * 0.45
    const marginY = rect.height * 0.45
    return {
      scale: next.scale,
      x: clamp(next.x, rect.width - rect.width * next.scale - marginX, marginX),
      y: clamp(next.y, rect.height - rect.height * next.scale - marginY, marginY),
    }
  }

  const localPoint = (event: { clientX: number; clientY: number }): Point => {
    const rect = containerRef.current?.getBoundingClientRect()
    return { x: event.clientX - (rect?.left ?? 0), y: event.clientY - (rect?.top ?? 0) }
  }

  const pinchMetrics = () => {
    const [a, b] = Array.from(pointers.current.values())
    return {
      distance: Math.hypot(a.x - b.x, a.y - b.y),
      center: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
    }
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onNativeWheel = (event: WheelEvent) => {
      event.preventDefault()
      event.stopPropagation()
      const rect = el.getBoundingClientRect()
      const center = { x: event.clientX - rect.left, y: event.clientY - rect.top }
      const base = viewRef.current
      const factor = event.deltaY < 0 ? 1.18 : 0.85
      const nextScale = clamp(base.scale * factor, GESTURE.min, GESTURE.max)
      const ratio = nextScale / base.scale
      const next = clampView({
        scale: nextScale,
        x: center.x - (center.x - base.x) * ratio,
        y: center.y - (center.y - base.y) * ratio,
      })
      applyView(next)
      onGestureScaleChange?.(next.scale)
    }

    el.addEventListener("wheel", onNativeWheel, { passive: false })
    return () => el.removeEventListener("wheel", onNativeWheel)
  }, [onGestureScaleChange])

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return
    const pt = localPoint(event)
    pointers.current.set(event.pointerId, pt)

    if (pointers.current.size === 1) {
      dragOrigin.current = pt
      dragging.current = false
    } else if (pointers.current.size === 2) {
      dragging.current = true
      setIsGrabbing(true)
      pinchStart.current = { distance: pinchMetrics().distance, scale: viewRef.current.scale }
      try {
        containerRef.current?.setPointerCapture(event.pointerId)
      } catch {
        /* noop */
      }
    }
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return
    const previous = pointers.current.get(event.pointerId) as Point
    const current = localPoint(event)
    pointers.current.set(event.pointerId, current)

    if (pointers.current.size >= 2 && pinchStart.current) {
      const { distance, center } = pinchMetrics()
      const base = viewRef.current
      const nextScale = clamp(
        pinchStart.current.scale * (distance / pinchStart.current.distance),
        GESTURE.min,
        GESTURE.max
      )
      const ratio = nextScale / base.scale
      applyView(
        clampView({
          scale: nextScale,
          x: center.x - (center.x - base.x) * ratio,
          y: center.y - (center.y - base.y) * ratio,
        })
      )
      return
    }

    if (!dragOrigin.current) return
    if (!dragging.current) {
      if (Math.hypot(current.x - dragOrigin.current.x, current.y - dragOrigin.current.y) < GESTURE.dragThreshold) {
        return
      }
      dragging.current = true
      setIsGrabbing(true)
      try {
        containerRef.current?.setPointerCapture(event.pointerId)
      } catch {
        /* noop */
      }
    }

    const base = viewRef.current
    applyView(
      clampView({
        scale: base.scale,
        x: base.x + (current.x - previous.x),
        y: base.y + (current.y - previous.y),
      })
    )
  }

  const resetPointerState = (pointerId: number) => {
    pointers.current.delete(pointerId)
    pinchStart.current = null
    if (pointers.current.size === 1) {
      dragOrigin.current = Array.from(pointers.current.values())[0]
    } else if (pointers.current.size === 0) {
      dragOrigin.current = null
      setIsGrabbing(false)
      onGestureScaleChange?.(viewRef.current.scale)
      window.setTimeout(() => {
        dragging.current = false
      }, 0)
    }
  }

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    try {
      if (containerRef.current?.hasPointerCapture(event.pointerId)) {
        containerRef.current.releasePointerCapture(event.pointerId)
      }
    } catch {
      /* noop */
    }
    resetPointerState(event.pointerId)
  }

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragging.current) {
      event.stopPropagation()
      event.preventDefault()
    }
  }

  const mapElement = useMemo(
    () => (
      <ComposableMap
        width={760}
        height={520}
        projection="geoMercator"
        projectionConfig={{ center: [-73.7, 4.1], scale: 1660 * zoom }}
        role="img"
        aria-label="Límites administrativos de Colombia coloreados por nivel de brecha"
      >
        <Geographies geography={geography}>
          {({ geographies }) =>
            geographies.map((geo) => {
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
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      onSelect(code)
                    }
                  }}
                  fill={selected ? MAP_COLORS.selected : active ? MAP_COLORS.hovered : breachColor}
                  stroke={MAP_COLORS.stroke}
                  strokeWidth={isDepartmentLayer ? 1.5 : 0.45}
                  style={{ outline: "none", transition: "fill 160ms ease" }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
    ),
    [geography, zoom, isDepartmentLayer, selectedCode, hoveredCode, indicators, onSelect]
  )

  return (
    <div
      ref={containerRef}
      className={`colombia-map ${isGrabbing ? "is-grabbing" : ""}`}
      aria-label={`Mapa de Colombia por ${isDepartmentLayer ? "departamento" : "municipio"}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onLostPointerCapture={handlePointerEnd}
      onDragStart={(e) => e.preventDefault()}
      onClickCapture={handleClickCapture}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        cursor: isGrabbing ? "grabbing" : "grab",
        touchAction: "none",
        userSelect: "none",
      }}
    >
      <div className="colombia-map-pan" style={{ width: "100%", height: "100%" }}>
        <div
          className="colombia-map-stage"
          style={{
            width: "100%",
            height: "100%",
            transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`,
            transformOrigin: "0 0",
            willChange: "transform",
          }}
        >
          {mapElement}
          <div className="map-island-dot" aria-hidden="true" />
          <span className="map-island-label">San Andrés</span>
        </div>
      </div>
    </div>
  )
}