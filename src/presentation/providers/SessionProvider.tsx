"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import { DEFAULT_ROLE, type Role } from "@/domain/auth/role"

/** Sesión de demostración en memoria: no autentica ni persiste credenciales (un refresh la reinicia). */
type Session = {
  authenticated: boolean
  role: Role
  login: (role: Role) => void
  logout: () => void
}

const SessionContext = createContext<Session | null>(null)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [role, setRole] = useState<Role>(DEFAULT_ROLE)

  const value = useMemo<Session>(() => ({
    authenticated,
    role,
    login: (selectedRole) => { setRole(selectedRole); setAuthenticated(true) },
    logout: () => setAuthenticated(false),
  }), [authenticated, role])

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession(): Session {
  const session = useContext(SessionContext)
  if (!session) throw new Error("useSession debe usarse dentro de <SessionProvider>")
  return session
}
