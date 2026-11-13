"use client"

import { GovAngleUpIcon, GovExternalLinkIcon, GovShieldCheckIcon } from "../shared/govco-icons"

export function GovFooter() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <button
        type="button"
        className="gov-back-to-top"
        onClick={scrollToTop}
        aria-label="Volver arriba"
      >
        <GovAngleUpIcon size={18} />
        <span>Volver arriba</span>
      </button>

      <footer className="gov-footer" role="contentinfo">
        <div className="gov-footer-card">
          <div className="gov-footer-grid">
            <div className="gov-footer-entity">
              <div className="gov-footer-badge">
                <span className="gov-entity-emblem">RNI</span>
                <div>
                  <strong>Red Nacional de Información</strong>
                  <span>Unidad para la Atención y Reparación Integral a las Víctimas</span>
                </div>
              </div>
              <p>
                Sistema de información y análisis agregado de brechas territoriales. Prototipo de demostración con datos sintéticos bajo lineamientos de protección de datos personales (Ley 1581 de 2012).
              </p>
            </div>

            <div className="gov-footer-col">
              <h3>Información institucional</h3>
              <ul>
                <li><span>Sede Nacional: Carrera 85D No. 46A - 65, Bogotá D.C., Colombia</span></li>
                <li><span>Estándar de interfaz: Kit UI GOV.CO v9.2</span></li>
                <li><span>Cumplimiento de accesibilidad: WCAG 2.1 Nivel AA</span></li>
              </ul>
            </div>

            <div className="gov-footer-col">
              <h3>Enlaces de interés</h3>
              <ul>
                <li>
                  <a href="https://www.gov.co/home/" target="_blank" rel="noopener noreferrer">
                    Portal Único del Estado Colombiano <GovExternalLinkIcon size={13} />
                  </a>
                </li>
                <li>
                  <a href="#contenido-principal">
                    Política de privacidad y tratamiento de datos
                  </a>
                </li>
                <li>
                  <span className="gov-footer-pill">
                    <GovShieldCheckIcon size={15} /> Entorno seguro · Datos agregados
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="gov-footer-bottom">
          <div className="gov-footer-bottom-inner">
            <a
              href="https://www.gov.co/home/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Portal GOV.CO"
              className="gov-logo-link"
            >
              <svg
                width="96"
                height="28"
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
            <span>República de Colombia · Todos los derechos reservados</span>
          </div>
        </div>
      </footer>
    </>
  )
}