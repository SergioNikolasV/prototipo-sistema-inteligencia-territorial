"use client"

import { useId, useState } from "react"

type GovInfoTooltipProps = {
  term: string
  description: string
  align?: "center" | "right"
}

export function GovInfoTooltip({ term, description, align = "right" }: GovInfoTooltipProps) {
  const [open, setOpen] = useState(false)
  const tooltipId = useId()

  const positionStyle =
    align === "right"
      ? { right: 0, left: "auto", transform: "none" }
      : { left: "50%", transform: "translateX(-50%)" }

  return (
    <span
      className="gov-tooltip-wrap"
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        marginLeft: "0.35rem",
        whiteSpace: "normal",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="gov-tooltip-trigger"
        aria-label={`Explicación de ${term}`}
        aria-describedby={open ? tooltipId : undefined}
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((prev) => !prev)
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false)
        }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "1.05rem",
          height: "1.05rem",
          padding: 0,
          borderRadius: "999px",
          border: "none",
          background: "transparent",
          color: "var(--gov-blue, #0943b5)",
          cursor: "help",
          verticalAlign: "middle",
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 15a1 1 0 0 1-2 0v-6a1 1 0 0 1 2 0Zm-1-8.25A1.25 1.25 0 1 1 13.25 7.5 1.25 1.25 0 0 1 12 8.75Z" />
        </svg>
      </button>

      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          className="gov-tooltip-popover"
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            ...positionStyle,
            display: "block",
            width: "15.5rem",
            maxWidth: "75vw",
            boxSizing: "border-box",
            padding: "0.65rem 0.8rem",
            borderRadius: "8px",
            backgroundColor: "#1b2a4a",
            color: "#ffffff",
            fontFamily: "Verdana, sans-serif",
            fontSize: "0.75rem",
            fontWeight: 400,
            lineHeight: 1.45,
            whiteSpace: "normal",
            overflowWrap: "break-word",
            textAlign: "left",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.24)",
            zIndex: 70,
            pointerEvents: "none",
          }}
        >
          <strong
            className="gov-tooltip-title"
            style={{
              display: "block",
              marginBottom: "0.25rem",
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#ffffff",
              whiteSpace: "normal",
            }}
          >
            {term}
          </strong>
          <span
            className="gov-tooltip-desc"
            style={{
              display: "block",
              fontSize: "0.75rem",
              fontWeight: 400,
              lineHeight: 1.45,
              color: "#ffffff",
              whiteSpace: "normal",
            }}
          >
            {description}
          </span>
        </span>
      )}
    </span>
  )
}