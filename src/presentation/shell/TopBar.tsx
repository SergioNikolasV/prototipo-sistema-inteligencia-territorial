"use client"

import { useMemo, useState } from "react"
import type { Role } from "@/domain/auth/role"
import type { Municipality } from "@/domain/territory/municipality"
import { searchMunicipalities } from "@/application/use-cases/territory"
import { Brand } from "../shared/Brand"
import {
  GovAngleDownIcon,
  GovArrowUpRightIcon,
  GovBellIcon,
  GovCloseIcon,
  GovMapMarkerIcon,
  GovMenuIcon,
  GovSearchIcon,
  GovSignOutIcon,
} from "../shared/govco-icons"

type TopBarProps = {
  role: Role
  places: Municipality[]
  onLogout: () => void
  onSelectMunicipality: (code: string) => void
  onOpenMobileMenu?: () => void
}

export function TopBar({ role, onLogout, onSelectMunicipality, places, onOpenMobileMenu }: TopBarProps) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const matches = useMemo(() => searchMunicipalities(places, query), [places, query])

  return (
    <header className="topbar">
      {onOpenMobileMenu && (
        <button
          type="button"
          className="mobile-menu-button"
          onClick={onOpenMobileMenu}
          aria-label="Abrir menú de navegación"
        >
          <GovMenuIcon size={18} />
        </button>
      )}
      <a href="#inicio" className="topbar-brand" aria-label="Inicio Red Nacional de Información">
        <Brand compact />
      </a>
      <div className="global-search-wrap" role="search">
        <input
          aria-label="Buscar municipio por nombre o código DIVIPOLA"
          placeholder="Buscar municipio o código DIVIPOLA…"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false)
          }}
        />
        {query && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => {
              setQuery("")
              setOpen(false)
            }}
            aria-label="Borrar búsqueda"
          >
            <GovCloseIcon size={14} />
          </button>
        )}
        <span className="search-sep" aria-hidden="true" />
        <button
          type="button"
          className="search-submit-circle"
          onClick={() => setOpen(true)}
          aria-label="Ejecutar búsqueda"
        >
          <GovSearchIcon size={16} />
        </button>

        {open && matches.length > 0 && (
          <div className="search-popover" role="listbox" aria-label="Municipios sugeridos">
            {matches.map((place) => (
              <button
                key={place.code}
                role="option"
                aria-selected="false"
                type="button"
                onClick={() => {
                  setQuery(`${place.name} · ${place.code}`)
                  setOpen(false)
                  onSelectMunicipality(place.code)
                }}
              >
                <GovMapMarkerIcon size={16} />
                <span>
                  {place.name}
                  <small>{place.department} · {place.code}</small>
                </span>
                <GovArrowUpRightIcon size={14} className="search-option-arrow" />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="topbar-actions">
        <button className="icon-button notification-button" type="button" aria-label="Notificaciones">
          <GovBellIcon size={18} />
          <span />
        </button>
        <div className="topbar-divider" />
        <div className="user-profile">
          <div className="user-avatar">SO</div>
          <div className="user-copy">
            <strong>Sonia Ospina</strong>
            <span>{role}</span>
          </div>
          <GovAngleDownIcon size={15} className="profile-chevron" />
        </div>
        <button className="logout-button" onClick={onLogout} type="button">
          <GovSignOutIcon size={16} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </header>
  )
}