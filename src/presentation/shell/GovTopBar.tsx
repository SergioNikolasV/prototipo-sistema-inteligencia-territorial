"use client"

import { useState } from "react"
import { GovGlobeIcon } from "../shared/govco-icons"

export function GovTopBar() {
  const [lang, setLang] = useState<"ES" | "EN">("ES")

  return (
    <div className="gov-topbar" role="region" aria-label="Barra superior del Estado Colombiano">
      <div className="gov-topbar-inner">
        <a
          href="https://www.gov.co/home/"
          target="_blank"
          rel="noopener noreferrer"
          className="gov-logo-link"
          aria-label="Ir al portal único del Estado Colombiano GOV.CO"
        >
          <svg
            width="106"
            height="32"
            viewBox="0 0 116 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M 19.2 10.8 A 7.5 7.5 0 1 0 22.5 17 L 22.5 26.2 C 22.5 30.8 18.5 32.5 13.0 31.2"
              stroke="#FFFFFF"
              strokeWidth="3.4"
              strokeLinecap="round"
            />
            <path d="M 19.8 14.8 L 23.8 10.8" stroke="#EF3340" strokeWidth="3.3" strokeLinecap="round" />
            <path d="M 17.0 17.6 L 20.5 14.1" stroke="#00A9E0" strokeWidth="3.3" strokeLinecap="round" />
            <path
              d="M 12.2 16.8 L 15.0 19.6 L 17.6 17.0"
              stroke="#FFCD00"
              strokeWidth="3.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="36.5" cy="17" r="7.5" stroke="#FFFFFF" strokeWidth="3.4" />
            <path
              d="M 49.5 10.2 L 55.5 23.8 L 61.5 10.2"
              stroke="#FFFFFF"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="67.5" cy="23.2" r="2.1" fill="#FFFFFF" />
            <path
              d="M 87.1 12.0 A 7.5 7.5 0 1 0 87.1 22.0"
              stroke="#FFFFFF"
              strokeWidth="3.4"
              strokeLinecap="round"
            />
            <circle cx="100.5" cy="17" r="7.5" stroke="#FFFFFF" strokeWidth="3.4" />
          </svg>
        </a>

        <button
          type="button"
          className="gov-lang-button"
          onClick={() => setLang((prev) => (prev === "ES" ? "EN" : "ES"))}
          aria-label={lang === "ES" ? "Cambiar idioma a Inglés" : "Cambiar idioma a Español"}
          title="Cambiar idioma"
        >
          <GovGlobeIcon size={15} />
          <span>{lang}</span>
        </button>
      </div>
    </div>
  )
}