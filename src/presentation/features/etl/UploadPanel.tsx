"use client"

import { useRef, useState, type ChangeEvent, type DragEvent } from "react"
import { ArrowRight, ChevronDown, CloudUpload, FileCheck2, ShieldCheck, Upload } from "lucide-react"
import { isAcceptedEtlFile, type DatasetType } from "@/domain/etl/etl-load"

type UploadPanelProps = {
  datasetTypes: DatasetType[]
  fileName: string
  isProcessing: boolean
  onFileChange: (fileName: string) => void
  onProcess: () => void
}

export function UploadPanel({ datasetTypes, fileName, isProcessing, onFileChange, onProcess }: UploadPanelProps) {
  const [dataset, setDataset] = useState(datasetTypes[0]?.value ?? "")
  const [isDragging, setIsDragging] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)

  function takeFile(file?: File) {
    if (file && isAcceptedEtlFile(file.name)) onFileChange(file.name)
  }
  function onInputChange(event: ChangeEvent<HTMLInputElement>) { takeFile(event.target.files?.[0]) }
  function onDrop(event: DragEvent<HTMLDivElement>) { event.preventDefault(); setIsDragging(false); takeFile(event.dataTransfer.files?.[0]) }

  return (
    <section className="panel etl-upload-panel" aria-labelledby="upload-title">
      <div className="panel-header etl-panel-heading"><div className="etl-title-icon"><CloudUpload size={19} /></div><div><h2 id="upload-title">Ingesta de archivos</h2><p>Sube una fuente de datos para iniciar las validaciones de calidad.</p></div><span className="supported-files">CSV · XLSX · Máx. 50 MB</span></div>
      <div className={`dropzone ${isDragging ? "dropzone-active" : ""} ${fileName ? "dropzone-has-file" : ""}`} onDragOver={(event) => { event.preventDefault(); setIsDragging(true) }} onDragLeave={() => setIsDragging(false)} onDrop={onDrop}>
        <input ref={fileInput} type="file" accept=".csv,.xlsx" aria-label="Seleccionar archivo CSV o XLSX" onChange={onInputChange} />
        <div className="dropzone-icon">{fileName ? <FileCheck2 size={24} /> : <Upload size={23} />}</div>
        {fileName ? <><strong>{fileName}</strong><span>Archivo seleccionado para procesamiento local de demostración</span><button type="button" className="text-button" onClick={() => onFileChange("")}>Quitar archivo</button></> : <><strong>Arrastra tu archivo aquí</strong><span>o <button type="button" className="inline-link" onClick={() => fileInput.current?.click()}>explora desde tu equipo</button></span><small>Formatos admitidos: .csv y .xlsx</small></>}
      </div>
      <div className="etl-form-row"><div className="dataset-select"><label htmlFor="dataset-type">Tipo de dataset</label><div className="select-shell"><select id="dataset-type" value={dataset} onChange={(event) => setDataset(event.target.value)}>{datasetTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}</select><ChevronDown size={14} /></div></div><div className="etl-process-area"><p><ShieldCheck size={14} /> Procesamiento simulado · el archivo no se transmite ni persiste</p><button className="primary-button process-button" type="button" disabled={!fileName || isProcessing} onClick={onProcess}>{isProcessing ? <><span className="button-spinner" /> Procesando…</> : <>Procesar y homologar dataset <ArrowRight size={15} /></>}</button></div></div>
    </section>
  )
}
