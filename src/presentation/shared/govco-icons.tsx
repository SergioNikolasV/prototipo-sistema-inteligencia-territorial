import type { ComponentType } from "react"

export type GovIconProps = {
  size?: number
  className?: string
  "aria-hidden"?: boolean | "true" | "false"
}

export type GovIcon = ComponentType<GovIconProps>

export function GovContrastIcon({ size = 18, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="2.2" />
      <path d="M12 2.5A9.5 9.5 0 0 0 12 21.5Z" fill="currentColor" />
    </svg>
  )
}

export function GovCheckCircleIcon({ size = 16, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm4.71 8.21-5.5 5.5a1 1 0 0 1-1.42 0l-2.5-2.5a1 1 0 1 1 1.42-1.42l1.79 1.8 4.79-4.8a1 1 0 0 1 1.42 1.42Z"
      />
    </svg>
  )
}

export function GovExclamationTriangleIcon({ size = 16, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M22.56 18.23 13.73 3.1a2 2 0 0 0-3.46 0L1.44 18.23A2 2 0 0 0 3.17 21.2h17.66a2 2 0 0 0 1.73-2.97ZM11 9a1 1 0 0 1 2 0v5a1 1 0 0 1-2 0Zm1 9.25a1.25 1.25 0 1 1 1.25-1.25A1.25 1.25 0 0 1 12 18.25Z"
      />
    </svg>
  )
}

export function GovTimesCircleIcon({ size = 16, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm3.71 12.29a1 1 0 0 1-1.42 1.42L12 13.41l-2.29 2.3a1 1 0 0 1-1.42-1.42L10.59 12l-2.3-2.29a1 1 0 0 1 1.42-1.42L12 10.59l2.29-2.3a1 1 0 0 1 1.42 1.42L13.41 12Z"
      />
    </svg>
  )
}

export function GovShieldCheckIcon({ size = 16, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2 4 5.5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5.5L12 2Zm-1.2 13.4-3.3-3.3 1.41-1.41 1.89 1.88 4.29-4.29 1.41 1.42-5.7 5.7Z"
      />
    </svg>
  )
}

export function GovSearchIcon({ size = 16, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"
      />
    </svg>
  )
}

export function GovUploadIcon({ size = 16, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M19 15v4H5v-4H3v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4h-2ZM7 9l1.41 1.41L11 7.83V16h2V7.83l2.59 2.58L17 9l-5-5-5 5Z"
      />
    </svg>
  )
}

export function GovCloudUploadIcon({ size = 18, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96ZM14 13v4h-4v-4H7l5-5 5 5h-3Z"
      />
    </svg>
  )
}

export function GovDownloadIcon({ size = 16, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7ZM5 18v2h14v-2H5Z" />
    </svg>
  )
}

export function GovFileIcon({ size = 16, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm2 16H8v-2h8v2Zm0-4H8v-2h8v2Zm-3-5V3.5L18.5 9H13Z"
      />
    </svg>
  )
}

export function GovTrashIcon({ size = 16, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12ZM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4Z"
      />
    </svg>
  )
}

export function GovMapMarkerIcon({ size = 16, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
      />
    </svg>
  )
}

export function GovBellIcon({ size = 18, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 22a2.01 2.01 0 0 0 2-2h-4a2 2 0 0 0 2 2Zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2Z"
      />
    </svg>
  )
}

export function GovSignOutIcon({ size = 16, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5ZM4 5h8V3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8v-2H4V5Z"
      />
    </svg>
  )
}

export function GovExternalLinkIcon({ size = 14, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7ZM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7Z"
      />
    </svg>
  )
}

export function GovGlobeIcon({ size = 15, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm6.93 9h-3.02a15.3 15.3 0 0 0-1.38-5.01A8.03 8.03 0 0 1 18.93 11ZM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96ZM4.26 14A7.82 7.82 0 0 1 4 12c0-.69.1-1.36.26-2h3.38a16.5 16.5 0 0 0-.14 2c0 .68.06 1.35.14 2H4.26Zm.81 2h3.02a15.3 15.3 0 0 0 1.38 5.01A8.03 8.03 0 0 1 5.07 16Zm3.02-8H5.07a8.03 8.03 0 0 1 4.4-5.01A15.3 15.3 0 0 0 8.09 8ZM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96ZM14.34 14H9.66a14.4 14.4 0 0 1-.16-2c0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.35-.16 2Zm.19 5.01A15.3 15.3 0 0 0 15.91 14h3.02a8.03 8.03 0 0 1-4.4 5.01ZM16.36 12c0-.68-.06-1.35-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38c.08-.65.14-1.32.14-2Z"
      />
    </svg>
  )
}

export function GovAngleUpIcon({ size = 16, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path fill="currentColor" d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41Z" />
    </svg>
  )
}

export function GovAngleDownIcon({ size = 15, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path fill="currentColor" d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41Z" />
    </svg>
  )
}

export function GovAngleRightIcon({ size = 14, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path fill="currentColor" d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41Z" />
    </svg>
  )
}

export function GovArrowRightIcon({ size = 15, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path fill="currentColor" d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8Z" />
    </svg>
  )
}

export function GovArrowUpRightIcon({ size = 13, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path fill="currentColor" d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6H6Z" />
    </svg>
  )
}

export function GovCloseIcon({ size = 16, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"
      />
    </svg>
  )
}

export function GovMenuIcon({ size = 18, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path fill="currentColor" d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
    </svg>
  )
}

export function GovZoomInIcon({ size = 16, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Zm.5-7H9v2H7v1h2v2h1v-2h2V9h-2V7Z"
      />
    </svg>
  )
}

export function GovZoomOutIcon({ size = 16, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14ZM7 9h5v1H7V9Z"
      />
    </svg>
  )
}

export function GovLayersIcon({ size = 15, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="m11.99 18.54-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74ZM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16Z"
      />
    </svg>
  )
}

export function GovUsersIcon({ size = 18, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3Zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z"
      />
    </svg>
  )
}

export function GovBarChartIcon({ size = 18, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path fill="currentColor" d="M5 9.2h3V19H5V9.2ZM10.6 5h2.8v14h-2.8V5Zm5.6 8H19v6h-2.8v-6Z" />
    </svg>
  )
}

export function GovActivityIcon({ size = 18, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99l1.5 1.5Z"
      />
    </svg>
  )
}

export function GovDatabaseIcon({ size = 18, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4Zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2Zm0 14c-3.87 0-6-1.5-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V17c0 .5-2.13 2-6 2Zm0-5c-3.87 0-6-1.5-6-2V9.77C7.61 10.55 9.72 11 12 11s4.39-.45 6-1.23V12c0 .5-2.13 2-6 2Z"
      />
    </svg>
  )
}

export function GovClipboardListIcon({ size = 18, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-7 0a1 1 0 1 1-1 1 1 1 0 0 1 1-1Zm2 14H7v-2h7v2Zm3-4H7v-2h10v2Zm0-4H7V7h10v2Z"
      />
    </svg>
  )
}
export function GovClipboardCheckIcon({ size = 18, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-7 0a1 1 0 1 1-1 1 1 1 0 0 1 1-1Zm-1.2 13.4-3.3-3.3 1.41-1.41 1.89 1.88 4.29-4.29 1.41 1.42-5.7 5.7Z"
      />
    </svg>
  )
}

export function GovSitemapIcon({ size = 18, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M10 3h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm1 4h2v4h6a1 1 0 0 1 1 1v3h-2v-2h-5v2h-2v-2H6v2H4v-3a1 1 0 0 1 1-1h6V7ZM4 15h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Zm7 0h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Zm7 0h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z"
      />
    </svg>
  )
}

export function GovFileCodeIcon({ size = 18, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm-1 7V3.5L18.5 9H13Zm-2.6 3.1L8 14.5l2.4 2.4-1.1 1.1-3.5-3.5 3.5-3.5 1.1 1.1Zm3.2 0 2.4 2.4-2.4 2.4 1.1 1.1 3.5-3.5-3.5-3.5-1.1 1.1Z"
      />
    </svg>
  )
}
export function GovChartPieIcon({ size = 18, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M11 5v9h9a9 9 0 1 1-9-9Zm2-2a9 9 0 0 1 9 9h-9V3Z"
      />
    </svg>
  )
}

export function GovDollarCircleIcon({ size = 18, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 15.93V19h-2v-1.07a3.5 3.5 0 0 1-2.5-2.43l1.92-.55A1.5 1.5 0 0 0 12 16c.83 0 1.5-.45 1.5-1s-.55-.88-1.78-1.18C9.92 13.38 8.5 12.66 8.5 10.75A3.26 3.26 0 0 1 11 7.62V6.5h2v1.12a3.35 3.35 0 0 1 2.35 2.13l-1.88.62A1.45 1.45 0 0 0 12 9.5c-.83 0-1.5.42-1.5.95 0 .55.6.82 1.82 1.12 1.85.45 3.18 1.18 3.18 3.18a3.36 3.36 0 0 1-2.5 3.18Z"
      />
    </svg>
  )
}

export function GovBookIcon({ size = 18, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm2 4v5l2.5-1.5L13 11V6H8Zm0 10h8v2H8v-2Z"
      />
    </svg>
  )
}
export function GovMapIcon({ size = 18, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="m20.5 3-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5ZM15 19l-6-2.11V5l6 2.11V19Z"
      />
    </svg>
  )
}

export function GovBadgeCheckIcon({ size = 18, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82 1.89 3.2L12 21.04l3.4 1.46 1.89-3.2 3.61-.82-.34-3.69L23 12Zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35Z"
      />
    </svg>
  )
}

export function GovSlidersIcon({ size = 16, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 17v2h6v-2H3ZM3 5v2h10V5H3Zm10 16v-2h8v-2h-8v-2h-2v6h2ZM7 9v2H3v2h4v2h2V9H7Zm14 4v-2H11v2h10Zm-6-4h2V7h4V5h-4V3h-2v6Z"
      />
    </svg>
  )
}

export function GovQuestionCircleIcon({ size = 16, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 17h-2v-2h2v2Zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41a2 2 0 0 0-4 0H8a4 4 0 0 1 8 0c0 .88-.36 1.68-.93 2.25Z"
      />
    </svg>
  )
}

export function GovGaugeIcon({ size = 17, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="m20.38 8.57-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44Zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83Z"
      />
    </svg>
  )
}
export function GovAwardIcon({ size = 18, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2a7 7 0 0 0-4.63 12.25L6 22l6-3 6 3-1.37-7.75A7 7 0 0 0 12 2Zm0 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm-1.2 5.4-2.1-2.1 1.1-1.1 1 1 2.4-2.4 1.1 1.1-3.5 3.5Z"
      />
    </svg>
  )
}

export function GovFilterIcon({ size = 15, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39A.998.998 0 0 0 18.95 4H5.04c-.83 0-1.3.95-.79 1.61Z"
      />
    </svg>
  )
}
export function GovCalculatorIcon({ size = 17, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm2 3v4h10V5H7Zm0 6h2v2H7v-2Zm4 0h2v2h-2v-2Zm4 0h2v6h-2v-6Zm-8 4h2v2H7v-2Zm4 0h2v2h-2v-2Z"
      />
    </svg>
  )
}

export function GovBriefcaseIcon({ size = 18, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 3h6a2 2 0 0 1 2 2v2h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3V5a2 2 0 0 1 2-2Zm0 4h6V5H9v2Zm-5 5v2h6v-1h4v1h6v-2H4Z"
      />
    </svg>
  )
}
export function GovUserIcon({ size = 18, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5Z"
      />
    </svg>
  )
}

export function GovLockIcon({ size = 18, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 8h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2ZM9 6a3 3 0 1 1 6 0v2H9V6Zm3 10a2 2 0 1 0-2-2 2 2 0 0 0 2 2Z"
      />
    </svg>
  )
}

export function GovCheckIcon({ size = 12, className }: GovIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M9.55 18.2 3.65 12.3l2.1-2.1 3.8 3.8 8.7-8.7 2.1 2.1-10.8 10.8Z"
      />
    </svg>
  )
}