"use client"

import { useState, type ReactNode } from "react"
import type { FilterCatalogs, FilterKey, TerritorialFilters } from "@/domain/filters/territorial-filters"

const FILTER_FIELDS: Array<{ key: FilterKey; id: string; label: string; hint?: string }> = [
  { key: "department", id: "filter-department", label: "Departamento" },
  { key: "municipality", id: "filter-municipality", label: "Municipio" },
  { key: "year", id: "filter-year", label: "Año de análisis" },
  {
    key: "event",
    id: "filter-event",
    label: "Hecho victimizante",
    hint: "Tipo de afectación registrada en el RUV.",
  },
  {
    key: "program",
    id: "filter-program",
    label: "Programa de atención (Oferta)",
    hint: "Programas y cupos institucionales asignados al territorio.",
  },
]

type FiltersPanelProps = {
  catalogs: FilterCatalogs
  filters: TerritorialFilters
  onChange: (key: FilterKey, value: string) => void
  onApply: () => void
  onClear: () => void
}

export function FiltersPanel({ catalogs, filters, onChange, onApply, onClear }: FiltersPanelProps) {
  const [feedback, setFeedback] = useState<string>("")

  const activeCount = FILTER_FIELDS.filter(({ key }) => {
    const val = filters[key]
    return Boolean(val) && val !== "all" && val !== "todos" && val !== "ALL"
  }).length

  const handleApply = () => {
    onApply()
    setFeedback(
      activeCount > 0
        ? `Filtros aplicados (${activeCount} activo${activeCount > 1 ? "s" : ""}). Revisa el mapa y las tarjetas de resumen.`
        : "Mostrando vista consolidada sin filtros específicos."
    )
  }

  const handleClear = () => {
    onClear()
    setFeedback("Filtros restablecidos a la vista general.")
  }

  return (
    <div className="filters-form">
      <p style={{ fontSize: "0.8125rem", margin: "0 0 0.75rem", lineHeight: 1.45 }}>
        Selecciona uno o varios criterios y pulsa <strong>Aplicar filtros</strong> para actualizar el mapa y los indicadores.
      </p>

      {FILTER_FIELDS.map(({ key, id, label, hint }) => (
        <FilterField key={key} id={id} label={label} hint={hint}>
          <select
            id={id}
            value={filters[key]}
            onChange={(event) => {
              setFeedback("")
              onChange(key, event.target.value)
            }}
          >
            {catalogs[key].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FilterField>
      ))}

      <button className="primary-button filter-apply" type="button" onClick={handleApply}>
        <SolidFilterIcon size={15} />
        <span>Aplicar filtros{activeCount > 0 ? ` (${activeCount})` : ""}</span>
      </button>

      <button className="quiet-button filter-clear" type="button" onClick={handleClear}>
        Limpiar filtros
      </button>

      {feedback && (
        <p
          role="status"
          aria-live="polite"
          style={{
            fontSize: "0.78rem",
            marginTop: "0.5rem",
            padding: "0.5rem 0.65rem",
            borderRadius: "6px",
            border: "1px solid currentColor",
            lineHeight: 1.4,
          }}
        >
          {feedback}
        </p>
      )}
    </div>
  )
}

function FilterField({
  id,
  label,
  hint,
  children,
}: {
  id: string
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      {hint && (
        <span style={{ display: "block", fontSize: "0.75rem", marginBottom: "0.25rem", opacity: 0.9 }}>
          {hint}
        </span>
      )}
      <div className="select-shell">
        {children}
        <SolidChevronDownIcon size={14} />
      </div>
    </>
  )
}

function SolidFilterIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 4.5A1.5 1.5 0 0 1 4.5 3h15A1.5 1.5 0 0 1 20.6 5.5L14 13.3V19a1 1 0 0 1-.55.89l-3 1.5A1 1 0 0 1 9 20.5v-7.2L3.4 5.5A1.5 1.5 0 0 1 3 4.5Z" />
    </svg>
  )
}

function SolidChevronDownIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5.3 8.3a1 1 0 0 1 1.4 0L12 13.6l5.3-5.3a1 1 0 1 1 1.4 1.4l-6 6a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 0-1.4Z" />
    </svg>
  )
}