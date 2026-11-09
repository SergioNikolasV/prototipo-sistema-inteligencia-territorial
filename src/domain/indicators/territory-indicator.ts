import type { DivipolaCode } from "../territory/divipola"
import type { BreachLevel } from "./breach-level"

export type TerritoryIndicator = {
  breachLevel: BreachLevel
  characterizedVictims: number
  /** Miles de millones de pesos. */
  assignedOffer: number
  /** Porcentaje de brecha no cubierta. */
  uncoveredGap: number
}

export type TerritoryIndicatorIndex = Record<DivipolaCode, TerritoryIndicator>
