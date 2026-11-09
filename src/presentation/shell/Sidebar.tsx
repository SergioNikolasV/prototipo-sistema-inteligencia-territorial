"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, BadgeCheck, CheckCircle2, ChevronDown, CircleHelp, CloudUpload, Globe2, Map, ShieldCheck, SlidersHorizontal } from "lucide-react"
import type { FilterCatalogs, FilterKey, TerritorialFilters } from "@/domain/filters/territorial-filters"
import { FiltersPanel } from "./FiltersPanel"

const NAV_ITEMS = [
  { href: "/mapa", label: "Visor GIS", icon: Map },
  { href: "/etl", label: "Carga ETL", icon: CloudUpload, badge: "2" },
  { href: "/calidad", label: "Calidad de datos", icon: BadgeCheck },
]

type SidebarProps = {
  catalogs: FilterCatalogs
  filters: TerritorialFilters
  onFilterChange: (key: FilterKey, value: string) => void
  onApply: () => void
  onClear: () => void
  mobileOpen: boolean
  closeMobile: () => void
}

export function Sidebar({ catalogs, filters, onFilterChange, onApply, onClear, mobileOpen, closeMobile }: SidebarProps) {
  const pathname = usePathname()
  return (
    <>
      {mobileOpen && <button className="sidebar-scrim" aria-label="Cerrar menú" onClick={closeMobile} />}
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`} aria-label="Navegación principal">
        <div className="workspace-switcher">
          <div className="workspace-icon"><Globe2 size={18} /></div>
          <div><strong>Inteligencia territorial</strong><span>Colombia · Nacional</span></div>
          <ChevronDown size={14} />
        </div>
        <div className="sidebar-section-label">ESPACIO DE TRABAJO</div>
        <nav className="main-nav" aria-label="Módulos">
          {NAV_ITEMS.map(({ href, label, icon: Icon, badge }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href} className={`nav-item ${active ? "active" : ""}`} onClick={closeMobile} aria-current={active ? "page" : undefined}>
                <Icon size={18} strokeWidth={1.8} /><span>{label}</span>{badge && <span className="nav-badge">{badge}</span>}
              </Link>
            )
          })}
        </nav>
        <div className="sidebar-rule" />
        <div className="sidebar-section-heading"><span>Filtros avanzados</span><button type="button" aria-label="Ocultar filtros"><SlidersHorizontal size={15} /></button></div>
        <FiltersPanel catalogs={catalogs} filters={filters} onChange={onFilterChange} onApply={onApply} onClear={onClear} />
        <div className="sidebar-bottom">
          <div className="privacy-card"><div className="privacy-lock"><ShieldCheck size={17} /></div><div><strong>Datos protegidos</strong><span>Vista agregada y anónima</span></div><CheckCircle2 size={15} className="privacy-check" /></div>
          <button className="help-link" type="button"><CircleHelp size={16} /><span>Centro de ayuda</span><ArrowUpRight size={13} /></button>
          <div className="sidebar-version">Prototipo de demostración <span>v0.9.2</span></div>
        </div>
      </aside>
    </>
  )
}
