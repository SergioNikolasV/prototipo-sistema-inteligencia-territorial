"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { CheckCircle2, ChevronRight } from "lucide-react"
import { DEFAULT_FILTERS, type FilterCatalogs, type FilterKey, type TerritorialFilters } from "@/domain/filters/territorial-filters"
import type { Municipality } from "@/domain/territory/municipality"
import { useSession } from "../providers/SessionProvider"
import { AccessibilityBar } from "./AccessibilityBar"
import { ConsoleContext, type ConsoleState } from "./console-context"
import { emitFiltersApplied, emitFiltersCleared } from "./filter-events"
import { GovFooter } from "./GovFooter"
import { GovTopBar } from "./GovTopBar"
import { Sidebar } from "./Sidebar"
import { TopBar } from "./TopBar"

const MAP_ROUTE = "/mapa"
const LOGIN_ROUTE = "/login"

const ROUTE_LABELS: Record<string, string> = {
  "/mapa": "Visor GIS",
  "/etl": "Carga y homologación ETL",
  "/calidad": "Calidad de datos",
}

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

  const currentSection = ROUTE_LABELS[pathname] ?? "Consola territorial"

  return (
    <ConsoleContext.Provider value={contextValue}>
      <a href="#contenido-principal" className="gov-skip-link">
        Saltar al contenido principal
      </a>
      <main className="app-shell">
        <GovTopBar />
        <TopBar
          role={role}
          places={places}
          onLogout={logout}
          onSelectMunicipality={selectMunicipality}
          onOpenMobileMenu={() => setMobileOpen(true)}
        />
        <AccessibilityBar />
        <div className="app-frame">
          <Sidebar
            catalogs={catalogs}
            filters={filters}
            onFilterChange={setFilter}
            onApply={applyFilters}
            onClear={clearFilters}
            mobileOpen={mobileOpen}
            closeMobile={() => setMobileOpen(false)}
          />
          <section id="contenido-principal" className="main-content" aria-label="Contenido principal">
            <div className="main-inner">
              <nav className="gov-breadcrumb" aria-label="Miga de pan">
                <ol>
                  <li>
                    <Link href="/mapa">Inicio</Link>
                  </li>
                  <li aria-hidden="true">
                    <ChevronRight size={14} />
                  </li>
                  <li aria-current="page">{currentSection}</li>
                </ol>
              </nav>
              {children}
            </div>
            <GovFooter />
          </section>
        </div>
        {toast && <div className="toast-message" role="status"><CheckCircle2 size={16} /> {toast}</div>}
      </main>
    </ConsoleContext.Provider>
  )
}