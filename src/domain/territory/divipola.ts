/** Códigos DIVIPOLA (DANE): 2 dígitos de departamento + 3 de municipio. */
export type DivipolaCode = string

export const DEFAULT_MUNICIPALITY_CODE: DivipolaCode = "11001"

export function toDepartmentCode(raw: unknown): DivipolaCode {
  return String(raw ?? "").padStart(2, "0")
}

export function toMunicipalityCode(raw: unknown): DivipolaCode {
  return String(raw).padStart(5, "0")
}

export function composeMunicipalityCode(department: unknown, municipality: unknown): DivipolaCode {
  return `${toDepartmentCode(department)}${String(municipality ?? "001").padStart(3, "0")}`
}

export function departmentOf(code: DivipolaCode): DivipolaCode {
  return code.slice(0, 2)
}
