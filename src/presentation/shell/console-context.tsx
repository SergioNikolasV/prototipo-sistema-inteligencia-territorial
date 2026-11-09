"use client"

import { createContext, useContext } from "react"
import type { Municipality } from "@/domain/territory/municipality"
import type { TerritorialFilters } from "@/domain/filters/territorial-filters"

export type ConsoleState = {
  places: Municipality[]
  filters: TerritorialFilters
  searchCode: string
  openMobileMenu: () => void
}

export const ConsoleContext = createContext<ConsoleState | null>(null)

export function useConsole(): ConsoleState {
  const state = useContext(ConsoleContext)
  if (!state) throw new Error("useConsole debe usarse dentro de <ConsoleShell>")
  return state
}
