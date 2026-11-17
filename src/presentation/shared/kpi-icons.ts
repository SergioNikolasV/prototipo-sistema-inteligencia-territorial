import type { DataSourceKind } from "@/domain/quality/data-source"
import {
  GovActivityIcon,
  GovBookIcon,
  GovBriefcaseIcon,
  GovChartPieIcon,
  GovClipboardCheckIcon,
  GovDollarCircleIcon,
  GovFileCodeIcon,
  GovMapMarkerIcon,
  GovUsersIcon,
  type GovIcon,
} from "./govco-icons"

/** Resolución de íconos en presentación: el dominio solo expone identificadores. */
export const KPI_ICONS: Record<string, GovIcon> = {
  "uncovered-gap": GovChartPieIcon,
  "characterized-population": GovUsersIcon,
  "executed-investment": GovDollarCircleIcon,
  completeness: GovClipboardCheckIcon,
  "divipola-consistency": GovBookIcon,
  "syntactic-validity": GovFileCodeIcon,
}

export const DATA_SOURCE_ICONS: Record<DataSourceKind, GovIcon> = {
  population: GovUsersIcon,
  programs: GovBriefcaseIcon,
  divipola: GovMapMarkerIcon,
}

export const iconForKpi = (id: string): GovIcon => KPI_ICONS[id] ?? GovActivityIcon