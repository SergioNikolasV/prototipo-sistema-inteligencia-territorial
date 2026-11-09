export const ROLES = ["Administrador", "Analista Territorial", "Directivo"] as const

export type Role = (typeof ROLES)[number]

export const DEFAULT_ROLE: Role = "Analista Territorial"

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  Administrador: "Administración y gobierno de fuentes",
  "Analista Territorial": "Análisis agregado por territorio",
  Directivo: "Consulta ejecutiva de indicadores",
}
