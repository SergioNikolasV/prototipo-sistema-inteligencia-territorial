import type { ReactNode } from "react"
import { catalogs, territory } from "@/infrastructure/composition/server"
import { ConsoleShell } from "@/presentation/shell/ConsoleShell"

export default async function ConsoleLayout({ children }: { children: ReactNode }) {
  const [places, filterCatalogs] = await Promise.all([territory.listMunicipalities(), catalogs.getFilterCatalogs()])
  return <ConsoleShell places={places} catalogs={filterCatalogs}>{children}</ConsoleShell>
}
