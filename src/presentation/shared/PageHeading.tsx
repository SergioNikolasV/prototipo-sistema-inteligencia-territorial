import type { ReactNode } from "react"

type PageHeadingProps = { eyebrow: string; title: string; description: string; right?: ReactNode }

export function PageHeading({ eyebrow, title, description, right }: PageHeadingProps) {
  return <div className="page-heading"><div><div className="eyebrow-line"><span>{eyebrow}</span><i /></div><h1>{title}</h1><p>{description}</p></div>{right && <div className="heading-actions">{right}</div>}</div>
}
