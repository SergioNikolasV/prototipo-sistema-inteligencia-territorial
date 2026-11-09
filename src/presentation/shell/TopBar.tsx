"use client"

import { useMemo, useState } from "react"
import { ArrowUpRight, Bell, ChevronDown, LogOut, MapPin, Search } from "lucide-react"
import type { Role } from "@/domain/auth/role"
import type { Municipality } from "@/domain/territory/municipality"
import { searchMunicipalities } from "@/application/use-cases/territory"
import { Brand } from "../shared/Brand"

type TopBarProps = {
  role: Role
  places: Municipality[]
  onLogout: () => void
  onSelectMunicipality: (code: string) => void
}

export function TopBar({ role, onLogout, onSelectMunicipality, places }: TopBarProps) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const matches = useMemo(() => searchMunicipalities(places, query), [places, query])

  return (
    <header className="topbar">
      <a href="#inicio" className="topbar-brand" aria-label="Inicio Red Nacional de Información"><Brand compact /></a>
      <div className="global-search-wrap">
        <Search size={17} aria-hidden="true" />
        <input aria-label="Buscar municipio por nombre o código DIVIPOLA" placeholder="Buscar municipio o código DIVIPOLA…" value={query} onChange={(event) => { setQuery(event.target.value); setOpen(true) }} onFocus={() => setOpen(true)} onKeyDown={(event) => { if (event.key === "Escape") setOpen(false) }} />
        <kbd>⌘ K</kbd>
        {open && matches.length > 0 && (
          <div className="search-popover" role="listbox" aria-label="Municipios sugeridos">
            {matches.map((place) => (
              <button key={place.code} role="option" aria-selected="false" type="button" onClick={() => { setQuery(`${place.name} · ${place.code}`); setOpen(false); onSelectMunicipality(place.code) }}>
                <MapPin size={15} /><span>{place.name}<small>{place.department} · {place.code}</small></span><ArrowUpRight size={14} className="search-option-arrow" />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="topbar-actions">
        <button className="icon-button notification-button" type="button" aria-label="Notificaciones"><Bell size={18} /><span /></button>
        <div className="topbar-divider" />
        <div className="user-profile">
          <div className="user-avatar">SO</div>
          <div className="user-copy"><strong>Sonia Ospina</strong><span>{role}</span></div>
          <ChevronDown size={14} className="profile-chevron" />
        </div>
        <button className="logout-button" onClick={onLogout} type="button"><LogOut size={15} /><span>Cerrar sesión</span></button>
      </div>
    </header>
  )
}
