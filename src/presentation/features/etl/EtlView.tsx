"use client"

import { useState } from "react"
import type { DatasetType, EtlLoad } from "@/domain/etl/etl-load"
import { etlActions } from "@/infrastructure/composition/etl.client"
import { PageHeading } from "../../shared/PageHeading"
import { PrivacyFootnote } from "../../shared/PrivacyFootnote"
import { ExceptionModal } from "./ExceptionModal"
import { LoadsTable } from "./LoadsTable"
import { PrivacyBanner } from "./PrivacyBanner"
import { UploadPanel } from "./UploadPanel"

export type EtlViewProps = { initialLoads: EtlLoad[]; datasetTypes: DatasetType[] }

export function EtlView({ initialLoads, datasetTypes }: EtlViewProps) {
  const [fileName, setFileName] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [loads, setLoads] = useState(initialLoads)
  const [selectedRow, setSelectedRow] = useState<EtlLoad | null>(null)

  async function processFile() {
    if (!fileName || isProcessing) return
    setIsProcessing(true)
    const newRow = await etlActions.processFile({ fileName, currentLoadCount: loads.length })
    setLoads((current) => [newRow, ...current])
    setIsProcessing(false)
    setFileName("")
  }

  return (
    <>
      <PageHeading eyebrow="GESTIÓN DE FUENTES" title="Carga y homologación ETL" description="Ingesta controlada, anonimización y validación de información territorial." right={<span className="etl-queue-badge"><span /> 2 procesos en cola</span>} />
      <UploadPanel datasetTypes={datasetTypes} fileName={fileName} isProcessing={isProcessing} onFileChange={setFileName} onProcess={processFile} />
      <PrivacyBanner />
      <LoadsTable loads={loads} onSelect={setSelectedRow} />
      <PrivacyFootnote message="Los archivos no se envían a un servidor en este prototipo. No cargues información personal real." action="Política de datos" />
      <ExceptionModal row={selectedRow} onClose={() => setSelectedRow(null)} />
    </>
  )
}
