import type { ReactNode } from "react"
import { ChevronDown, Filter } from "lucide-react"
import type { FilterCatalogs, FilterKey, TerritorialFilters } from "@/domain/filters/territorial-filters"

const FILTER_FIELDS: Array<{ key: FilterKey; id: string; label: string }> = [
  { key: "department", id: "filter-department", label: "Departamento" },
  { key: "municipality", id: "filter-municipality", label: "Municipio" },
  { key: "year", id: "filter-year", label: "Año de análisis" },
  { key: "event", id: "filter-event", label: "Hecho victimizante" },
  { key: "program", id: "filter-program", label: "Programa de atención" },
]

type FiltersPanelProps = {
  catalogs: FilterCatalogs
  filters: TerritorialFilters
  onChange: (key: FilterKey, value: string) => void
  onApply: () => void
  onClear: () => void
}

export function FiltersPanel({ catalogs, filters, onChange, onApply, onClear }: FiltersPanelProps) {
  return (
    <div className="filters-form">
      {FILTER_FIELDS.map(({ key, id, label }) => (
        <FilterField key={key} id={id} label={label}>
          <select id={id} value={filters[key]} onChange={(event) => onChange(key, event.target.value)}>
            {catalogs[key].map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </FilterField>
      ))}
      <button className="primary-button filter-apply" type="button" onClick={onApply}><Filter size={15} /> Aplicar filtros</button>
      <button className="quiet-button filter-clear" type="button" onClick={onClear}>Limpiar filtros</button>
    </div>
  )
}

function FilterField({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className="select-shell">{children}<ChevronDown size={14} /></div>
    </>
  )
}
