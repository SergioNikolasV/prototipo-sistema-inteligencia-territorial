/** Semilla determinística (suma de dígitos) usada para generar datos sintéticos por código DIVIPOLA. */
export function digitSeed(code: string): number {
  return code.split("").reduce((sum, digit) => sum + Number(digit), 0)
}
