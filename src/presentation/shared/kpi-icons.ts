import { Activity, BadgeCheck, BarChart3, Database, FileCheck2, MapPin, UsersRound, type LucideIcon } from "lucide-react"
import type { DataSourceKind } from "@/domain/quality/data-source"

/** Resolución de íconos en presentación: el dominio solo expone identificadores. */
export const KPI_ICONS: Record<string, LucideIcon> = {
  "uncovered-gap": Activity,
  "characterized-population": UsersRound,
  "executed-investment": BarChart3,
  completeness: FileCheck2,
  "divipola-consistency": MapPin,
  "syntactic-validity": BadgeCheck,
}

export const DATA_SOURCE_ICONS: Record<DataSourceKind, LucideIcon> = {
  population: UsersRound,
  programs: Database,
  divipola: MapPin,
}

export const iconForKpi = (id: string): LucideIcon => KPI_ICONS[id] ?? Activity
