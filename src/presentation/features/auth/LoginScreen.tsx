"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { DEFAULT_ROLE, ROLES, type Role } from "@/domain/auth/role"
import { useSession } from "../../providers/SessionProvider"
import { Brand } from "../../shared/Brand"
import {
  GovArrowRightIcon,
  GovCheckIcon,
  GovGlobeIcon,
  GovLockIcon,
  GovShieldCheckIcon,
  GovUserIcon,
} from "../../shared/govco-icons"

const HOME_ROUTE = "/mapa"

export function LoginScreen() {
  const { login } = useSession()
  const router = useRouter()
  const [role, setRole] = useState<Role>(DEFAULT_ROLE)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    login(role)
    router.push(HOME_ROUTE)
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
            <div className="login-symbol"><GovGlobeIcon size={24} /></div>
            <p className="eyebrow">SISTEMA DE INTELIGENCIA TERRITORIAL</p>
            <h1 id="login-title">Bienvenido a la RNI</h1>
            <p>Consulta información agregada para orientar decisiones que transforman los territorios.</p>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <label className="field-label" htmlFor="login-email">Usuario / Correo</label>
            <div className="input-shell">
              <GovUserIcon size={17} />
              <input id="login-email" autoComplete="username" placeholder="nombre@entidad.gov.co" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="label-row">
              <label className="field-label" htmlFor="login-password">Contraseña</label>
              <button type="button" className="text-button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            <div className="input-shell">
              <GovLockIcon size={17} />
              <input id="login-password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Ingresa tu contraseña" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <fieldset className="role-fieldset">
              <legend className="field-label">Selecciona tu perfil de demostración</legend>
              <div className="role-options">
                {ROLES.map((item) => (
                  <button type="button" key={item} className={`role-option ${role === item ? "selected" : ""}`} onClick={() => setRole(item)} aria-pressed={role === item}>
                    <span className="role-check">{role === item && <GovCheckIcon size={12} />}</span>
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </fieldset>
            <button className="primary-button login-submit" type="submit">
              Iniciar sesión <GovArrowRightIcon size={17} />
            </button>
          </form>
          <div className="login-legal">
            <div className="legal-icon"><GovShieldCheckIcon size={17} /></div>
            <div>
              <strong>Privacidad desde el diseño</strong>
              <p>Este prototipo no autentica ni almacena credenciales o datos personales.</p>
            </div>
          </div>
        </section>
        <div className="login-footnote">
          <span><GovLockIcon size={14} /> La plataforma institucional debe usar TLS 1.3 y autenticación JWT.</span>
          <span>© 2025 · Información agregada y anonimizada</span>
        </div>
      </div>
    </main>
  )
}