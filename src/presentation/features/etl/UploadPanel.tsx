"use client"

import { useRef, useState, type ChangeEvent, type DragEvent } from "react"
import { isAcceptedEtlFile, type DatasetType } from "@/domain/etl/etl-load"
import {
  GovAngleDownIcon,
  GovArrowRightIcon,
  GovCloudUploadIcon,
  GovFileIcon,
  GovShieldCheckIcon,
  GovTrashIcon,
  GovUploadIcon,
} from "../../shared/govco-icons"

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
  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    takeFile(event.target.files?.[0])
  }
  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)
    takeFile(event.dataTransfer.files?.[0])
  }

  return (
    <section className="panel etl-upload-panel" aria-labelledby="upload-title">
      <div className="panel-header etl-panel-heading">
        <div className="etl-title-icon">
          <GovCloudUploadIcon size={20} />
        </div>
        <div>
          <h2 id="upload-title">Ingesta de archivos</h2>
          <p>Sube una fuente de datos para iniciar las validaciones de calidad y homologación.</p>
        </div>
        <span className="supported-files">CSV · XLSX · Peso máximo: 50 MB</span>
      </div>

      <div
        className={`gov-file-upload-box ${isDragging ? "dropzone-active" : ""}`}
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
      >
        <input
          ref={fileInput}
          id="etl-file-input"
          type="file"
          accept=".csv,.xlsx"
          aria-label="Seleccionar archivo CSV o XLSX"
          onChange={onInputChange}
        />

        <label htmlFor="etl-file-input" className="gov-field-label">
          Archivo fuente <span className="gov-required" aria-hidden="true">*</span>
        </label>

        <div className="gov-file-control-row">
          <div className="gov-file-input-group">
            <button
              type="button"
              className="gov-file-select-btn"
              onClick={() => fileInput.current?.click()}
            >
              <GovUploadIcon size={16} />
              <span>Seleccionar archivo</span>
            </button>
            <span className={`gov-file-name-display ${fileName ? "has-value" : ""}`}>
              {fileName || "Sin archivo seleccionado (o arrastra el archivo aquí)"}
            </span>
          </div>
        </div>

        <small className="gov-file-helper">
          Cualquier archivo en formato .csv o .xlsx. Peso máximo: 50 MB.
        </small>

        {fileName && (
          <div className="gov-uploaded-list" aria-label="Archivo adjunto listo para procesar">
            <div className="gov-uploaded-pill">
              <GovFileIcon size={17} />
              <div className="gov-uploaded-meta">
                <strong>{fileName}</strong>
                <span>Listo para validación local</span>
              </div>
              <button
                type="button"
                className="gov-uploaded-remove"
                onClick={() => onFileChange("")}
                aria-label={`Quitar archivo ${fileName}`}
                title="Eliminar archivo"
              >
                <GovTrashIcon size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="etl-form-row">
        <div className="dataset-select">
          <label htmlFor="dataset-type">
            Tipo de dataset <span className="gov-required" aria-hidden="true">*</span>
          </label>
          <div className="select-shell">
            <select id="dataset-type" value={dataset} onChange={(event) => setDataset(event.target.value)}>
              {datasetTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <GovAngleDownIcon size={16} />
          </div>
        </div>

        <div className="etl-process-area">
          <p>
            <GovShieldCheckIcon size={16} /> Procesamiento simulado · el archivo no se transmite ni persiste
          </p>
          <button
            className="primary-button process-button"
            type="button"
            disabled={!fileName || isProcessing}
            onClick={onProcess}
          >
            {isProcessing ? (
              <>
                <span className="button-spinner" /> Procesando…
              </>
            ) : (
              <>
                Procesar y homologar dataset <GovArrowRightIcon size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}