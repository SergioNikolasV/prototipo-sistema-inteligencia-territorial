"use client"

import { useEffect, useState } from "react"
import { GovContrastIcon } from "../shared/govco-icons"

const MIN_SCALE = 88
const MAX_SCALE = 118
const STEP = 6

export function AccessibilityBar() {
  const [scale, setScale] = useState(100)
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    document.documentElement.style.fontSize = `${(16 * scale) / 100}px`
  }, [scale])

  useEffect(() => {
    document.documentElement.classList.toggle("gov-high-contrast", highContrast)
  }, [highContrast])

  return (
    <aside className="gov-a11y-bar" aria-label="Barra de accesibilidad">
      <button
        type="button"
        className={`gov-a11y-btn ${highContrast ? "active" : ""}`}
        onClick={() => setHighContrast((prev) => !prev)}
        aria-pressed={highContrast}
        aria-label="Cambiar contraste de pantalla"
        title="Contraste"
      >
        <GovContrastIcon size={18} />
        <span className="gov-a11y-tooltip">Contraste</span>
      </button>

      <button
        type="button"
        className="gov-a11y-btn"
        onClick={() => setScale((s) => Math.max(MIN_SCALE, s - STEP))}
        disabled={scale <= MIN_SCALE}
        aria-label="Disminuir tamaño de letra"
        title="Reducir letra"
      >
        <span aria-hidden="true">A-</span>
        <span className="gov-a11y-tooltip">Reducir letra</span>
      </button>

      <button
        type="button"
        className="gov-a11y-btn"
        onClick={() => setScale((s) => Math.min(MAX_SCALE, s + STEP))}
        disabled={scale >= MAX_SCALE}
        aria-label="Aumentar tamaño de letra"
        title="Aumentar letra"
      >
        <span aria-hidden="true">A+</span>
        <span className="gov-a11y-tooltip">Aumentar letra</span>
      </button>
    </aside>
  )
}