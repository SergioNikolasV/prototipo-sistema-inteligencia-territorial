import type { FilterCatalogs } from "@/domain/filters/territorial-filters"

const sameValue = (label: string) => ({ value: label, label })

export const FILTER_CATALOGS: FilterCatalogs = {
  department: [
    { value: "all", label: "Todos los departamentos" },
    { value: "11", label: "Bogotá D.C." },
    { value: "05", label: "Antioquia" },
    { value: "76", label: "Valle del Cauca" },
    { value: "08", label: "Atlántico" },
    { value: "68", label: "Santander" },
  ],
  municipality: [
    { value: "all", label: "Todos los municipios" },
    { value: "11001", label: "Bogotá, D.C." },
    { value: "05001", label: "Medellín" },
    { value: "76001", label: "Cali" },
    { value: "08001", label: "Barranquilla" },
  ],
  year: ["2025", "2024", "2023"].map(sameValue),
  event: [
    { value: "all", label: "Todos los hechos" },
    ...["Desplazamiento forzado", "Homicidio", "Desaparición forzada", "Confinamiento"].map(sameValue),
  ],
  program: [
    { value: "all", label: "Todos los programas" },
    ...["Atención humanitaria", "Retornos y reubicaciones", "Indemnización administrativa", "Reparación colectiva"].map(sameValue),
  ],
}
