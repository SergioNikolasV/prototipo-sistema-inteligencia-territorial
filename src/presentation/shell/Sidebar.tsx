"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { FilterCatalogs, FilterKey, TerritorialFilters } from "@/domain/filters/territorial-filters"
import {
  GovAngleDownIcon,
  GovArrowUpRightIcon,
  GovBadgeCheckIcon,
  GovCheckCircleIcon,
  GovCloudUploadIcon,
  GovGlobeIcon,
  GovMapIcon,
  GovQuestionCircleIcon,
  GovShieldCheckIcon,
  GovSlidersIcon,
} from "../shared/govco-icons"
import { FiltersPanel } from "./FiltersPanel"

const NAV_ITEMS = [
  { href: "/mapa", label: "Visor GIS", icon: GovMapIcon },
  { href: "/etl", label: "Carga ETL", icon: GovCloudUploadIcon, badge: "2" },
  { href: "/calidad", label: "Calidad de datos", icon: GovBadgeCheckIcon },
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
          <div className="workspace-icon"><GovGlobeIcon size={18} /></div>
          <div><strong>Inteligencia territorial</strong><span>Colombia · Nacional</span></div>
          <GovAngleDownIcon size={15} />
        </div>
        <div className="sidebar-section-label">ESPACIO DE TRABAJO</div>
        <nav className="main-nav" aria-label="Módulos">
          {NAV_ITEMS.map(({ href, label, icon: Icon, badge }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href} className={`nav-item ${active ? "active" : ""}`} onClick={closeMobile} aria-current={active ? "page" : undefined}>
                <Icon size={18} /><span>{label}</span>{badge && <span className="nav-badge">{badge}</span>}
              </Link>
            )
          })}
        </nav>
        <div className="sidebar-rule" />
        <div className="sidebar-section-heading"><span>Filtros avanzados</span><button type="button" aria-label="Ocultar filtros"><GovSlidersIcon size={15} /></button></div>
        <FiltersPanel catalogs={catalogs} filters={filters} onChange={onFilterChange} onApply={onApply} onClear={onClear} />
        <div className="sidebar-bottom">
          <div className="privacy-card"><div className="privacy-lock"><GovShieldCheckIcon size={17} /></div><div><strong>Datos protegidos</strong><span>Vista agregada y anónima</span></div><GovCheckCircleIcon size={15} className="privacy-check" /></div>
          <button className="help-link" type="button"><GovQuestionCircleIcon size={16} /><span>Centro de ayuda</span><GovArrowUpRightIcon size={13} /></button>
          <div className="sidebar-version">Prototipo de demostración <span>v0.9.2</span></div>
        </div>
      </aside>
    </>
  )
}