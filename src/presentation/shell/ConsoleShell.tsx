"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { DEFAULT_FILTERS, type FilterCatalogs, type FilterKey, type TerritorialFilters } from "@/domain/filters/territorial-filters"
import type { Municipality } from "@/domain/territory/municipality"
import { useSession } from "../providers/SessionProvider"
import { ConsoleContext, type ConsoleState } from "./console-context"
import { emitFiltersApplied, emitFiltersCleared } from "./filter-events"
import { Sidebar } from "./Sidebar"
import { TopBar } from "./TopBar"

const MAP_ROUTE = "/mapa"
const LOGIN_ROUTE = "/login"

type ConsoleShellProps = { places: Municipality[]; catalogs: FilterCatalogs; children: ReactNode }

export function ConsoleShell({ places, catalogs, children }: ConsoleShellProps) {
  const { authenticated, role, logout } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [searchCode, setSearchCode] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState("")
  const [filters, setFilters] = useState<TerritorialFilters>(DEFAULT_FILTERS)

  useEffect(() => {
    if (!authenticated) router.replace(LOGIN_ROUTE)
  }, [authenticated, router])

  const contextValue = useMemo<ConsoleState>(() => ({
    places,
    filters,
    searchCode,
    openMobileMenu: () => setMobileOpen(true),
  }), [places, filters, searchCode])

  if (!authenticated) return null

  const setFilter = (key: FilterKey, value: string) => setFilters((current) => ({ ...current, [key]: value }))

  function applyFilters() {
    setToast("Filtros aplicados a los indicadores territoriales")
    window.setTimeout(() => setToast(""), 3000)
    emitFiltersApplied(filters)
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTERS)
    setToast("Filtros restablecidos")
    window.setTimeout(() => setToast(""), 2500)
    emitFiltersCleared()
  }

  function selectMunicipality(code: string) {
    setSearchCode(code)
    if (pathname !== MAP_ROUTE) router.push(MAP_ROUTE)
  }

  return (
    <ConsoleContext.Provider value={contextValue}>
      <main className="app-shell">
        <TopBar role={role} places={places} onLogout={logout} onSelectMunicipality={selectMunicipality} />
        <div className="app-frame">
          <Sidebar catalogs={catalogs} filters={filters} onFilterChange={setFilter} onApply={applyFilters} onClear={clearFilters} mobileOpen={mobileOpen} closeMobile={() => setMobileOpen(false)} />
          <section className="main-content" aria-label="Contenido principal">
            <div className="main-inner">{children}</div>
            <footer className="app-footer"><span>RNI · Sistema de Inteligencia Territorial</span><span>Prototipo de demostración · Datos sintéticos</span><span>Accesibilidad WCAG 2.1 AA</span></footer>
          </section>
        </div>
        {toast && <div className="toast-message" role="status"><CheckCircle2 size={16} /> {toast}</div>}
      </main>
    </ConsoleContext.Provider>
  )
}
