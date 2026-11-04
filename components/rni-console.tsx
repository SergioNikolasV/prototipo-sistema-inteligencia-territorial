"use client"

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react"
import {
  Activity,
  AlertCircle,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  CloudUpload,
  Database,
  FileCheck2,
  FileSpreadsheet,
  Filter,
  Fingerprint,
  Gauge,
  Globe2,
  Layers3,
  LockKeyhole,
  LogOut,
  Map,
  MapPin,
  Menu,
  Minus,
  MoreHorizontal,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Upload,
  UsersRound,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import ColombiaMap, { getColombiaMunicipalities, type Municipality } from "@/components/colombia-map"

type View = "map" | "etl" | "quality"
type Role = "Administrador" | "Analista Territorial" | "Directivo"

const seededLoads = [
  { id: "ETL-2025-094", file: "caracterizacion_region_andina.csv", date: "04 oct 2025 · 10:42", success: "24.680", rejected: "12", match: "99,8%", status: "Exitoso" },
  { id: "ETL-2025-093", file: "oferta_institucional_q3.xlsx", date: "02 oct 2025 · 16:18", success: "8.412", rejected: "38", match: "96,2%", status: "Ajustado" },
  { id: "ETL-2025-092", file: "registro_municipal_sept.csv", date: "30 sep 2025 · 09:06", success: "—", rejected: "—", match: "—", status: "Falla" },
]

const auditSources = [
  { name: "Caracterización de población", detail: "Unidad para las Víctimas · Mensual", refreshed: "04 oct 2025", validity: 96, records: "1,24 M", icon: UsersRound },
  { name: "Oferta de programas", detail: "Entidades territoriales · Trimestral", refreshed: "02 oct 2025", validity: 87, records: "84.210", icon: Database },
  { name: "División político-administrativa", detail: "DANE · DIVIPOLA 2025", refreshed: "28 sep 2025", validity: 98, records: "1.122", icon: MapPin },
]

const roleDescriptions: Record<Role, string> = {
  Administrador: "Administración y gobierno de fuentes",
  "Analista Territorial": "Análisis agregado por territorio",
  Directivo: "Consulta ejecutiva de indicadores",
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`}>
      <div className="brand-mark" aria-hidden="true"><span>RNI</span></div>
      <div className="brand-copy">
        <strong>Red Nacional de Información</strong>
        <span>Unidad para las Víctimas</span>
      </div>
    </div>
  )
}

function LoginScreen({ onLogin }: { onLogin: (role: Role) => void }) {
  const [role, setRole] = useState<Role>("Analista Territorial")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onLogin(role)
  }

  return (
    <main className="login-screen">
      <div className="login-backdrop" aria-hidden="true">
        <div className="login-orbit orbit-one" />
        <div className="login-orbit orbit-two" />
        <div className="login-grid" />
      </div>
      <div className="login-wrap">
        <div className="login-topline">
          <Brand />
          <div className="secure-indicator"><span className="secure-dot" /> Entorno seguro</div>
        </div>
        <section className="login-card" aria-labelledby="login-title">
          <div className="login-intro">
            <div className="login-symbol"><Globe2 size={24} strokeWidth={1.8} /></div>
            <p className="eyebrow">SISTEMA DE INTELIGENCIA TERRITORIAL</p>
            <h1 id="login-title">Bienvenido a la RNI</h1>
            <p>Consulta información agregada para orientar decisiones que transforman los territorios.</p>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <label className="field-label" htmlFor="login-email">Usuario / Correo</label>
            <div className="input-shell">
              <UsersRound size={17} aria-hidden="true" />
              <input id="login-email" autoComplete="username" placeholder="nombre@entidad.gov.co" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="label-row">
              <label className="field-label" htmlFor="login-password">Contraseña</label>
              <button type="button" className="text-button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            <div className="input-shell">
              <LockKeyhole size={17} aria-hidden="true" />
              <input id="login-password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Ingresa tu contraseña" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <fieldset className="role-fieldset">
              <legend className="field-label">Selecciona tu perfil de demostración</legend>
              <div className="role-options">
                {(["Administrador", "Analista Territorial", "Directivo"] as Role[]).map((item) => (
                  <button type="button" key={item} className={`role-option ${role === item ? "selected" : ""}`} onClick={() => setRole(item)} aria-pressed={role === item}>
                    <span className="role-check">{role === item && <Check size={12} />}</span>
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </fieldset>
            <button className="primary-button login-submit" type="submit">
              Iniciar sesión <ArrowRight size={17} />
            </button>
          </form>
          <div className="login-legal">
            <div className="legal-icon"><ShieldCheck size={17} /></div>
            <div>
              <strong>Privacidad desde el diseño</strong>
              <p>Este prototipo no autentica ni almacena credenciales o datos personales.</p>
            </div>
          </div>
        </section>
        <div className="login-footnote">
          <span><LockKeyhole size={13} /> La plataforma institucional debe usar TLS 1.3 y autenticación JWT.</span>
          <span>© 2025 · Información agregada y anonimizada</span>
        </div>
      </div>
    </main>
  )
}

function TopBar({ role, onLogout, onSelectMunicipality, municipalities: places }: { role: Role; onLogout: () => void; onSelectMunicipality: (code: string) => void; municipalities: Municipality[] }) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const matches = useMemo(() => {
    if (query.trim().length < 2) return []
    const normalized = query.toLocaleLowerCase("es-CO")
    return places.filter((place) => place.name.toLocaleLowerCase("es-CO").includes(normalized) || place.code.includes(normalized)).slice(0, 5)
  }, [places, query])

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

function Sidebar({ activeView, onNavigate, role, filters, setFilters, onApply, onClear, mobileOpen, closeMobile }: {
  activeView: View
  onNavigate: (view: View) => void
  role: Role
  filters: Record<string, string>
  setFilters: (key: string, value: string) => void
  onApply: () => void
  onClear: () => void
  mobileOpen: boolean
  closeMobile: () => void
}) {
  const navItems = [
    { id: "map" as View, label: "Visor GIS", icon: Map },
    { id: "etl" as View, label: "Carga ETL", icon: CloudUpload, badge: "2" },
    { id: "quality" as View, label: "Calidad de datos", icon: BadgeCheck },
  ]
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
          {navItems.map(({ id, label, icon: Icon, badge }) => (
            <button type="button" key={id} className={`nav-item ${activeView === id ? "active" : ""}`} onClick={() => { onNavigate(id); closeMobile() }} aria-current={activeView === id ? "page" : undefined}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>{badge && <span className="nav-badge">{badge}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-rule" />
        <div className="sidebar-section-heading"><span>Filtros avanzados</span><button type="button" aria-label="Ocultar filtros"><SlidersHorizontal size={15} /></button></div>
        <div className="filters-form">
          <label htmlFor="filter-department">Departamento</label>
          <div className="select-shell"><select id="filter-department" value={filters.department} onChange={(event) => setFilters("department", event.target.value)}><option value="all">Todos los departamentos</option><option value="11">Bogotá D.C.</option><option value="05">Antioquia</option><option value="76">Valle del Cauca</option><option value="08">Atlántico</option><option value="68">Santander</option></select><ChevronDown size={14} /></div>
          <label htmlFor="filter-municipality">Municipio</label>
          <div className="select-shell"><select id="filter-municipality" value={filters.municipality} onChange={(event) => setFilters("municipality", event.target.value)}><option value="all">Todos los municipios</option><option value="11001">Bogotá, D.C.</option><option value="05001">Medellín</option><option value="76001">Cali</option><option value="08001">Barranquilla</option></select><ChevronDown size={14} /></div>
          <label htmlFor="filter-year">Año de análisis</label>
          <div className="select-shell"><select id="filter-year" value={filters.year} onChange={(event) => setFilters("year", event.target.value)}><option>2025</option><option>2024</option><option>2023</option></select><ChevronDown size={14} /></div>
          <label htmlFor="filter-event">Hecho victimizante</label>
          <div className="select-shell"><select id="filter-event" value={filters.event} onChange={(event) => setFilters("event", event.target.value)}><option value="all">Todos los hechos</option><option>Desplazamiento forzado</option><option>Homicidio</option><option>Desaparición forzada</option><option>Confinamiento</option></select><ChevronDown size={14} /></div>
          <label htmlFor="filter-program">Programa de atención</label>
          <div className="select-shell"><select id="filter-program" value={filters.program} onChange={(event) => setFilters("program", event.target.value)}><option value="all">Todos los programas</option><option>Atención humanitaria</option><option>Retornos y reubicaciones</option><option>Indemnización administrativa</option><option>Reparación colectiva</option></select><ChevronDown size={14} /></div>
          <button className="primary-button filter-apply" type="button" onClick={onApply}><Filter size={15} /> Aplicar filtros</button>
          <button className="quiet-button filter-clear" type="button" onClick={onClear}>Limpiar filtros</button>
        </div>
        <div className="sidebar-bottom">
          <div className="privacy-card"><div className="privacy-lock"><ShieldCheck size={17} /></div><div><strong>Datos protegidos</strong><span>Vista agregada y anónima</span></div><CheckCircle2 size={15} className="privacy-check" /></div>
          <button className="help-link" type="button"><CircleHelp size={16} /><span>Centro de ayuda</span><ArrowUpRight size={13} /></button>
          <div className="sidebar-version">Prototipo de demostración <span>v0.9.2</span></div>
        </div>
      </aside>
    </>
  )
}

function PageHeading({ eyebrow, title, description, right }: { eyebrow: string; title: string; description: string; right?: React.ReactNode }) {
  return <div className="page-heading"><div><div className="eyebrow-line"><span>{eyebrow}</span><i /></div><h1>{title}</h1><p>{description}</p></div>{right && <div className="heading-actions">{right}</div>}</div>
}

function MetricCard({ label, value, note, icon: Icon, tone = "blue", trend }: { label: string; value: string; note: string; icon: typeof Activity; tone?: string; trend?: string }) {
  return (
    <article className="metric-card">
      <div className={`metric-icon tone-${tone}`}><Icon size={18} /></div>
      {trend && <span className="metric-trend"><ArrowUpRight size={12} /> {trend}</span>}
      <p>{label}</p>
      <strong>{value}</strong>
      <span className="metric-note">{note}</span>
    </article>
  )
}

function ComparativeChart() {
  const data = [
    { name: "Bogotá D.C.", need: 84, offer: 63 },
    { name: "Antioquia", need: 68, offer: 51 },
    { name: "Valle del Cauca", need: 57, offer: 43 },
    { name: "Nariño", need: 48, offer: 31 },
    { name: "Norte de Santander", need: 39, offer: 26 },
  ]
  return (
    <section className="panel chart-panel" aria-labelledby="chart-title">
      <div className="panel-header"><div><h2 id="chart-title">Necesidad vs. oferta asignada</h2><p>Personas caracterizadas y cobertura de programas</p></div><button className="more-button" aria-label="Más opciones del gráfico" type="button"><MoreHorizontal size={19} /></button></div>
      <div className="chart-legend"><span><i className="legend-dot need-dot" /> Necesidad</span><span><i className="legend-dot offer-dot" /> Oferta asignada</span><span className="chart-unit">Índice relativo · 2025</span></div>
      <div className="bar-chart" role="img" aria-label="Gráfico de barras comparativo de necesidad frente a oferta asignada por departamento">
        <div className="chart-axis"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
        <div className="chart-plot">
          {[100, 75, 50, 25, 0].map((n) => <div className="chart-grid-line" key={n}><span /></div>)}
          {data.map((item) => <div className="bar-group" key={item.name} aria-label={`${item.name}: necesidad ${item.need}, oferta ${item.offer}`}><div className="bars"><span className="bar need-bar" style={{ height: `${item.need}%` }} /><span className="bar offer-bar" style={{ height: `${item.offer}%` }} /></div><span className="bar-label">{item.name}</span></div>)}
        </div>
      </div>
    </section>
  )
}

function TrendPanel() {
  const months = [31, 36, 33, 45, 48, 43, 52, 57, 55, 65, 61, 73]
  return (
    <section className="panel trend-panel">
      <div className="panel-header"><div><h2>Evolución de la brecha</h2><p>Índice de cobertura territorial</p></div><button className="period-button" type="button">Últimos 12 meses <ChevronDown size={13} /></button></div>
      <div className="trend-callout"><div><span>Brecha promedio</span><strong>28,4%</strong></div><span className="trend-pill"><ArrowDownToLine size={13} /> 3,2 pp</span></div>
      <div className="sparkline" aria-label="La brecha promedio ha disminuido durante los últimos doce meses" role="img">
        {months.map((height, index) => <div className="sparkline-column" key={`${height}-${index}`}><span style={{ height: `${height}%` }} /></div>)}
      </div>
      <div className="sparkline-labels"><span>Nov 24</span><span>May 25</span><span>Oct 25</span></div>
      <div className="trend-foot"><span><span className="status-pulse" /> Actualizado hoy</span><button type="button">Ver serie completa <ArrowRight size={13} /></button></div>
    </section>
  )
}

function MapView({ places, onMenu, filters, searchCode }: { places: Municipality[]; onMenu: () => void; filters: Record<string, string>; searchCode: string }) {
  const [layer, setLayer] = useState<"municipality" | "department">("municipality")
  const [zoom, setZoom] = useState(1)
  const [selectedCode, setSelectedCode] = useState("11001")
  const [mapInteracted, setMapInteracted] = useState(false)
  const [filterApplied, setFilterApplied] = useState(false)
  const selected = selectedCode ? places.find((place) => place.code === selectedCode) ?? places.find((place) => place.code === "11001") ?? places[0] : undefined
  const selectedHash = selected ? selected.code.split("").reduce((value, digit) => value + Number(digit), 0) : 4
  const gap = 18 + (selectedHash % 24)
  const population = (1840 + selectedHash * 331).toLocaleString("es-CO")
  const investment = (6.3 + (selectedHash % 48) / 10).toFixed(1).replace(".", ",")

  useEffect(() => {
    if (searchCode) {
      setSelectedCode(searchCode)
      setMapInteracted(true)
    }
  }, [searchCode])

  useEffect(() => {
    const filterListener = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, string>>).detail
      if (detail) {
        setFilterApplied(true)
        if (detail.municipality !== "all") {
          setSelectedCode(detail.municipality)
          setMapInteracted(true)
        }
      }
    }
    const clearListener = () => {
      setFilterApplied(false)
      setSelectedCode("11001")
      setMapInteracted(false)
    }
    window.addEventListener("rni:filters-applied", filterListener)
    window.addEventListener("rni:filters-cleared", clearListener)
    return () => {
      window.removeEventListener("rni:filters-applied", filterListener)
      window.removeEventListener("rni:filters-cleared", clearListener)
    }
  }, [])

  return (
    <>
      <PageHeading eyebrow="PLATAFORMA DE ANÁLISIS" title="Visor territorial" description="Brechas entre población víctima caracterizada y oferta institucional." right={<><span className="live-meta"><span className="status-pulse" /> Corte de información · 30 sep 2025</span><button className="outline-button export-button" type="button" onClick={() => downloadCsv("resumen-brechas-territoriales.csv", "Departamento,Brecha,Personas caracterizadas,Inversión ejecutada\nBogotá D.C.,31%,18400,$12.4 mil M\nAntioquia,26%,14200,$9.8 mil M\nValle del Cauca,24%,11800,$7.1 mil M")}><ArrowDownToLine size={15} /> Exportar</button></>} />
      {filterApplied && <div className="filter-applied-note"><CheckCircle2 size={15} /> Filtros aplicados · Año {filters.year} <button type="button" onClick={() => setFilterApplied(false)} aria-label="Descartar filtros"><X size={13} /></button></div>}
      <div className="map-section-head"><div><h2>Distribución geográfica de brechas</h2><p>Selecciona un municipio para explorar sus indicadores agregados.</p></div><span className="data-demo-label"><span /> Datos agregados de demostración</span></div>
      <section className="map-card" aria-label="Mapa interactivo de brechas municipales de Colombia">
        <div className="map-toolbar">
          <button className="mobile-menu-button" onClick={onMenu} type="button" aria-label="Abrir filtros y navegación"><Menu size={18} /></button>
          <div className="map-breadcrumb"><MapPin size={14} /><span>Colombia</span><ChevronRight size={13} /><strong>{layer === "municipality" ? "Municipal" : "Departamental"}</strong></div>
          <div className="layer-switch" role="group" aria-label="Escala territorial">
            <button type="button" className={layer === "department" ? "selected" : ""} onClick={() => setLayer("department")} aria-pressed={layer === "department"}>Departamento</button>
            <button type="button" className={layer === "municipality" ? "selected" : ""} onClick={() => setLayer("municipality")} aria-pressed={layer === "municipality"}>Municipio</button>
          </div>
          <div className="zoom-tools"><button type="button" onClick={() => setZoom((current) => Math.min(1.5, current + 0.12))} aria-label="Acercar mapa"><ZoomIn size={17} /></button><span>{Math.round(zoom * 100)}%</span><button type="button" onClick={() => setZoom((current) => Math.max(0.76, current - 0.12))} aria-label="Alejar mapa"><ZoomOut size={17} /></button></div>
        </div>
        <div className="map-canvas">
          <div className="map-coordinates"><span>4° 36′ N</span><span>72° 54′ O</span></div>
          <div className="map-source-stamp"><Layers3 size={13} /> Límites municipales · DANE</div>
          <ColombiaMap layer={layer} zoom={zoom} selectedCode={selectedCode} onSelect={(code) => { setSelectedCode(code); setMapInteracted(true) }} />
          {selected && <div className={`map-tooltip ${mapInteracted ? "" : "map-tooltip-initial"}`} aria-live="polite">
            <div className="tooltip-top"><span className="tooltip-dot" /><div><strong>{selected.name}</strong><small>{selected.department} · {selected.code}</small></div><button type="button" onClick={() => setSelectedCode("")} aria-label="Cerrar datos del municipio"><X size={14} /></button></div>
            <div className="tooltip-metrics"><div><span>Víctimas caracterizadas</span><strong>{population}</strong></div><div><span>Oferta asignada</span><strong>${investment} mil M</strong></div><div><span>Brecha no cubierta</span><strong className="text-high">{gap}%</strong></div></div>
            <button type="button" className="tooltip-link">Ver ficha agregada <ArrowRight size={13} /></button>
          </div>}
          <div className="map-attribution">Fuente: RNI · DANE · Corte 2025</div>
          <div className="map-legend"><div className="legend-head"><strong>Nivel de brecha</strong><span>% no cubierta</span></div><div><i className="severity-dot severity-critical" /><span>Alta</span><small>&gt; 35%</small></div><div><i className="severity-dot severity-medium" /><span>Media</span><small>20–35%</small></div><div><i className="severity-dot severity-low" /><span>Baja / óptima</span><small>&lt; 20%</small></div></div>
        </div>
      </section>
      <div className="metrics-grid">
        <MetricCard label="Brecha no cubierta" value="28,4%" note="Promedio nacional · en descenso" icon={Activity} tone="red" trend="3,2 pp" />
        <MetricCard label="Población caracterizada" value="8,7 M" note="Personas registradas · agregado" icon={UsersRound} tone="blue" />
        <MetricCard label="Inversión ejecutada" value="$1,24 B" note="Vigencia 2025 · recursos reportados" icon={BarChart3} tone="green" trend="8,6%" />
      </div>
      <div className="analytics-grid"><ComparativeChart /><TrendPanel /></div>
      <div className="privacy-footnote"><ShieldCheck size={14} /><span>Los indicadores presentados son agregados estadísticos. No se visualizan datos individuales ni identificadores personales.</span><button type="button">Metodología <ArrowUpRight size={12} /></button></div>
    </>
  )
}

function StatusPill({ status }: { status: string }) {
  const icon = status === "Exitoso" ? <Check size={12} /> : status === "Ajustado" ? <AlertCircle size={12} /> : <X size={12} />
  return <span className={`status-pill ${status === "Exitoso" ? "status-success" : status === "Ajustado" ? "status-warning" : "status-error"}`}>{icon}{status}</span>
}

function ExceptionModal({ row, onClose }: { row: (typeof seededLoads)[number] | null; onClose: () => void }) {
  if (!row) return null
  return (
    <div className="modal-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="exception-modal" role="dialog" aria-modal="true" aria-labelledby="exception-title">
        <div className="modal-header"><div className="modal-icon"><ClipboardList size={19} /></div><button type="button" className="icon-button" onClick={onClose} aria-label="Cerrar detalle de log"><X size={18} /></button></div>
        <p className="eyebrow">DETALLE DE PROCESAMIENTO · {row.id}</p><h2 id="exception-title">Log de excepciones</h2><p className="modal-description">Validaciones sintácticas y homologación DIVIPOLA para <strong>{row.file}</strong>.</p>
        <div className="exception-summary"><div><span>Estado</span><StatusPill status={row.status} /></div><div><span>Registros exitosos</span><strong>{row.success}</strong></div><div><span>Registros rechazados</span><strong>{row.rejected}</strong></div></div>
        <div className="exception-list"><div className="exception-list-head"><span>VALIDACIÓN</span><span>REGISTROS</span></div><div><AlertCircle size={15} /><span>Código DIVIPOLA no homologado en catálogo vigente</span><strong>{row.status === "Ajustado" ? "38" : row.status === "Falla" ? "—" : "12"}</strong></div><div><AlertCircle size={15} /><span>Formato de fecha fuera del estándar AAAA-MM-DD</span><strong>{row.status === "Falla" ? "—" : "4"}</strong></div><div><CheckCircle2 size={15} /><span>Campos sensibles excluidos de la salida</span><strong>100%</strong></div></div>
        <div className="modal-privacy"><Fingerprint size={16} /><span>Los registros rechazados no incluyen datos personales en este prototipo.</span></div>
        <button type="button" className="primary-button modal-close-button" onClick={onClose}>Entendido</button>
      </section>
    </div>
  )
}

function EtlView() {
  const [fileName, setFileName] = useState("")
  const [dataset, setDataset] = useState("population")
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [loads, setLoads] = useState(seededLoads)
  const [selectedRow, setSelectedRow] = useState<(typeof seededLoads)[number] | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)

  function takeFile(file?: File) {
    if (file && /\.(csv|xlsx)$/i.test(file.name)) setFileName(file.name)
  }
  function onFileChange(event: ChangeEvent<HTMLInputElement>) { takeFile(event.target.files?.[0]) }
  function onDrop(event: DragEvent<HTMLDivElement>) { event.preventDefault(); setIsDragging(false); takeFile(event.dataTransfer.files?.[0]) }
  function processFile() {
    if (!fileName || isProcessing) return
    setIsProcessing(true)
    window.setTimeout(() => {
      const newRow = { id: `ETL-2025-${String(95 + loads.length - seededLoads.length).padStart(3, "0")}`, file: fileName, date: "Hoy · hace un momento", success: "10.000", rejected: "0", match: "99,4%", status: "Exitoso" }
      setLoads((current) => [newRow, ...current])
      setIsProcessing(false)
      setFileName("")
    }, 700)
  }

  return (
    <>
      <PageHeading eyebrow="GESTIÓN DE FUENTES" title="Carga y homologación ETL" description="Ingesta controlada, anonimización y validación de información territorial." right={<span className="etl-queue-badge"><span /> 2 procesos en cola</span>} />
      <section className="panel etl-upload-panel" aria-labelledby="upload-title">
        <div className="panel-header etl-panel-heading"><div className="etl-title-icon"><CloudUpload size={19} /></div><div><h2 id="upload-title">Ingesta de archivos</h2><p>Sube una fuente de datos para iniciar las validaciones de calidad.</p></div><span className="supported-files">CSV · XLSX · Máx. 50 MB</span></div>
        <div className={`dropzone ${isDragging ? "dropzone-active" : ""} ${fileName ? "dropzone-has-file" : ""}`} onDragOver={(event) => { event.preventDefault(); setIsDragging(true) }} onDragLeave={() => setIsDragging(false)} onDrop={onDrop}>
          <input ref={fileInput} type="file" accept=".csv,.xlsx" aria-label="Seleccionar archivo CSV o XLSX" onChange={onFileChange} />
          <div className="dropzone-icon">{fileName ? <FileCheck2 size={24} /> : <Upload size={23} />}</div>
          {fileName ? <><strong>{fileName}</strong><span>Archivo seleccionado para procesamiento local de demostración</span><button type="button" className="text-button" onClick={() => setFileName("")}>Quitar archivo</button></> : <><strong>Arrastra tu archivo aquí</strong><span>o <button type="button" className="inline-link" onClick={() => fileInput.current?.click()}>explora desde tu equipo</button></span><small>Formatos admitidos: .csv y .xlsx</small></>}
        </div>
        <div className="etl-form-row"><div className="dataset-select"><label htmlFor="dataset-type">Tipo de dataset</label><div className="select-shell"><select id="dataset-type" value={dataset} onChange={(event) => setDataset(event.target.value)}><option value="population">Población víctima</option><option value="offer">Oferta institucional</option></select><ChevronDown size={14} /></div></div><div className="etl-process-area"><p><ShieldCheck size={14} /> Procesamiento simulado · el archivo no se transmite ni persiste</p><button className="primary-button process-button" type="button" disabled={!fileName || isProcessing} onClick={processFile}>{isProcessing ? <><span className="button-spinner" /> Procesando…</> : <>Procesar y homologar dataset <ArrowRight size={15} /></>}</button></div></div>
      </section>
      <section className="privacy-banner" aria-label="Protección de datos personales">
        <div className="privacy-banner-icon"><ShieldCheck size={21} /></div><div className="privacy-banner-copy"><span className="eyebrow">PROTECCIÓN DE DATOS · LEY 1581</span><h2>Filtro de anonimización automática activo</h2><p>El flujo de producción debe descartar campos identificables antes de cualquier análisis agregado.</p></div><div className="privacy-banner-status"><span className="status-pulse" /> Modo demostración</div>
        <div className="privacy-banner-stats"><div><span>Registros analizados</span><strong>10.000</strong></div><div><span>Campos sensibles descartados</span><strong>NUI · cédulas · nombres</strong></div><div><span>Persistencia sensible</span><strong className="zero-value">0 registros</strong></div></div>
      </section>
      <section className="panel etl-history-panel">
        <div className="panel-header"><div><h2>Historial de cargas</h2><p>Seguimiento de ingestas y homologación de códigos DIVIPOLA.</p></div><button className="outline-button" type="button" onClick={() => downloadCsv("historial-cargas-rni.csv", `ID,Archivo,Fecha,Exitosos,Rechazados,H homologación,Estado\n${loads.map((row) => `${row.id},${row.file},${row.date},${row.success},${row.rejected},${row.match},${row.status}`).join("\n")}`)}><ArrowDownToLine size={15} /> Exportar historial</button></div>
        <div className="table-scroll"><table className="data-table etl-table"><thead><tr><th>ID CARGA</th><th>ARCHIVO</th><th>FECHA / HORA</th><th>EXITOSOS</th><th>RECHAZADOS</th><th>DIVIPOLA</th><th>ESTADO</th><th>ACCIONES</th></tr></thead><tbody>{loads.map((row) => <tr key={row.id}><td><span className="mono-id">{row.id}</span></td><td><span className="file-cell"><FileSpreadsheet size={15} />{row.file}</span></td><td>{row.date}</td><td className="number-cell">{row.success}</td><td className="number-cell">{row.rejected}</td><td>{row.match}</td><td><StatusPill status={row.status} /></td><td><button type="button" className="table-action" onClick={() => setSelectedRow(row)}>Ver log <ArrowUpRight size={12} /><span className="sr-only"> de {row.id}</span></button></td></tr>)}</tbody></table></div>
        <div className="table-footer"><span>Mostrando {loads.length} cargas recientes</span><button type="button">Ver historial completo <ArrowRight size={13} /></button></div>
      </section>
      <div className="privacy-footnote"><ShieldCheck size={14} /><span>Los archivos no se envían a un servidor en este prototipo. No cargues información personal real.</span><button type="button">Política de datos <ArrowUpRight size={12} /></button></div>
      <ExceptionModal row={selectedRow} onClose={() => setSelectedRow(null)} />
    </>
  )
}

function QualityView() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  function exportAudit(sourceName: string) {
    downloadCsv(`auditoria-${sourceName.toLowerCase().replaceAll(" ", "-")}.csv`, `Fuente,Dimensión,Resultado,Fecha de actualización\n${sourceName},Completitud,92%,04 oct 2025\n${sourceName},Consistencia DIVIPOLA,98%,04 oct 2025\n${sourceName},Validez sintáctica,88%,04 oct 2025`)
  }
  return (
    <>
      <PageHeading eyebrow="OBSERVABILIDAD DE FUENTES" title="Calidad de datos" description="Indicadores de completitud, consistencia y validez por fuente integrada." right={<button className="outline-button" type="button" onClick={() => exportAudit("reporte-global")}><ArrowDownToLine size={15} /> Descargar reporte</button>} />
      <section className="quality-overview">
        <div className="panel quality-score-panel"><div className="quality-score-copy"><span className="eyebrow">SALUD GLOBAL DE FUENTES</span><h2>Índice de calidad</h2><p>Resultado agregado de las fuentes activas en la Red Nacional de Información.</p><div className="quality-score-meta"><span className="quality-score-badge"><CheckCircle2 size={14} /> Saludable</span><span>+2,4 pp vs. trimestre anterior</span></div></div><div className="quality-gauge" role="meter" aria-label="Índice global de calidad" aria-valuenow={84} aria-valuemin={0} aria-valuemax={100}><div className="gauge-center"><strong>84<span>%</span></strong><small>Índice global</small></div></div><div className="gauge-scale"><span>0</span><span>100</span></div></div>
        <div className="quality-side-note"><div className="quality-note-icon"><Sparkles size={18} /></div><div><strong>Estabilidad sostenida</strong><p>Las fuentes integradas mantienen un nivel de calidad por encima del umbral institucional del 70%.</p></div><div className="quality-note-bar"><span /></div><div className="quality-note-foot"><span>Umbral mínimo</span><strong>70%</strong></div></div>
      </section>
      <div className="quality-dimensions">
        <MetricCard label="Completitud" value="92%" note="Campos requeridos no nulos" icon={FileCheck2} tone="blue" trend="1,8 pp" />
        <MetricCard label="Consistencia DIVIPOLA" value="98%" note="Códigos válidos · catálogo DANE" icon={MapPin} tone="green" trend="0,6 pp" />
        <MetricCard label="Validez sintáctica" value="88%" note="Formatos estandarizados" icon={BadgeCheck} tone="amber" trend="2,1 pp" />
      </div>
      <section className="panel audit-panel">
        <div className="panel-header"><div><h2>Auditoría por dataset</h2><p>Estado de las fuentes integradas y última fecha de actualización.</p></div><button className="subtle-filter-button" type="button"><Filter size={14} /> Todas las fuentes <ChevronDown size={13} /></button></div>
        <div className="table-scroll"><table className="data-table audit-table"><thead><tr><th>FUENTE INTEGRADA</th><th>REGISTROS</th><th>ÚLTIMA ACTUALIZACIÓN</th><th>VALIDEZ</th><th>ESTADO</th><th>REPORTE</th></tr></thead><tbody>{auditSources.map(({ name, detail, refreshed, validity, records, icon: Icon }) => <tr key={name} className={selectedSource === name ? "audit-row-selected" : ""} onClick={() => setSelectedSource(name)}><td><div className="audit-source"><div className="audit-source-icon"><Icon size={16} /></div><div><strong>{name}</strong><span>{detail}</span></div></div></td><td>{records}</td><td>{refreshed}</td><td><div className="validity-cell"><div className="validity-bar"><span style={{ width: `${validity}%` }} /></div><strong>{validity}%</strong></div></td><td><span className="quality-status"><span /> En línea</span></td><td><button type="button" className="download-row-button" onClick={(event) => { event.stopPropagation(); exportAudit(name) }} aria-label={`Descargar reporte de auditoría: ${name}`}><ArrowDownToLine size={16} /></button></td></tr>)}</tbody></table></div>
        <div className="table-footer"><span><span className="status-pulse" /> 3 fuentes activas · Actualizado hace 2 horas</span><button type="button">Ver todas las fuentes <ArrowRight size={13} /></button></div>
      </section>
      <section className="quality-method-note"><div><Gauge size={17} /><strong>¿Cómo se calcula el índice?</strong></div><p>Promedio ponderado de completitud (40%), consistencia DIVIPOLA (35%) y validez sintáctica (25%). Los valores son demostrativos y no representan una evaluación oficial.</p><button type="button">Ver metodología <ArrowUpRight size={13} /></button></section>
    </>
  )
}

function downloadCsv(name: string, content: string) {
  const blob = new Blob([`\uFEFF${content}`], { type: "text/csv;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = name
  anchor.click()
  URL.revokeObjectURL(url)
}

export default function RniConsole() {
  const [authenticated, setAuthenticated] = useState(false)
  const [role, setRole] = useState<Role>("Analista Territorial")
  const [activeView, setActiveView] = useState<View>("map")
  const [searchMunicipality, setSearchMunicipality] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState("")
  const [filters, setFiltersState] = useState({ department: "all", municipality: "all", year: "2025", event: "all", program: "all" })
  const setFilter = (key: string, value: string) => setFiltersState((current) => ({ ...current, [key]: value }))

  function applyFilters() {
    setToast("Filtros aplicados a los indicadores territoriales")
    window.setTimeout(() => setToast(""), 3000)
    window.dispatchEvent(new CustomEvent("rni:filters-applied", { detail: filters }))
  }
  function clearFilters() {
    setFiltersState({ department: "all", municipality: "all", year: "2025", event: "all", program: "all" })
    setToast("Filtros restablecidos")
    window.setTimeout(() => setToast(""), 2500)
    window.dispatchEvent(new CustomEvent("rni:filters-cleared"))
  }

  const places = useMemo(() => getColombiaMunicipalities(), [])

  if (!authenticated) return <LoginScreen onLogin={(selectedRole) => { setRole(selectedRole); setAuthenticated(true) }} />

  return (
    <main className="app-shell">
      <TopBar role={role} onLogout={() => { setAuthenticated(false); setActiveView("map") }} onSelectMunicipality={(code) => { setSearchMunicipality(code); setActiveView("map") }} municipalities={places} />
      <div className="app-frame">
        <Sidebar activeView={activeView} onNavigate={setActiveView} role={role} filters={filters} setFilters={setFilter} onApply={applyFilters} onClear={clearFilters} mobileOpen={mobileOpen} closeMobile={() => setMobileOpen(false)} />
        <section className="main-content" aria-label="Contenido principal">
          <div className="main-inner">
            {activeView === "map" && <MapView places={places} onMenu={() => setMobileOpen(true)} filters={filters} searchCode={searchMunicipality} />}
            {activeView === "etl" && <EtlView />}
            {activeView === "quality" && <QualityView />}
          </div>
          <footer className="app-footer"><span>RNI · Sistema de Inteligencia Territorial</span><span>Prototipo de demostración · Datos sintéticos</span><span>Accesibilidad WCAG 2.1 AA</span></footer>
        </section>
      </div>
      {toast && <div className="toast-message" role="status"><CheckCircle2 size={16} /> {toast}</div>}
    </main>
  )
}
