import type { TerritorialFilters } from "@/domain/filters/territorial-filters"

/** Bus de eventos de filtros entre el shell y las vistas (mismo contrato que el prototipo original). */
const APPLIED = "rni:filters-applied"
const CLEARED = "rni:filters-cleared"

export function emitFiltersApplied(filters: TerritorialFilters) {
  window.dispatchEvent(new CustomEvent(APPLIED, { detail: filters }))
}

export function emitFiltersCleared() {
  window.dispatchEvent(new CustomEvent(CLEARED))
}

export function subscribeToFilters(handlers: { onApplied: (filters: TerritorialFilters) => void; onCleared: () => void }) {
  const applied = (event: Event) => {
    const detail = (event as CustomEvent<TerritorialFilters>).detail
    if (detail) handlers.onApplied(detail)
  }
  window.addEventListener(APPLIED, applied)
  window.addEventListener(CLEARED, handlers.onCleared)
  return () => {
    window.removeEventListener(APPLIED, applied)
    window.removeEventListener(CLEARED, handlers.onCleared)
  }
}
