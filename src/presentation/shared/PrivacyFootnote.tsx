import { GovArrowUpRightIcon, GovShieldCheckIcon } from "./govco-icons"

export function PrivacyFootnote({ message, action }: { message: string; action: string }) {
  return (
    <div className="privacy-footnote">
      <GovShieldCheckIcon size={16} />
      <span>{message}</span>
      <button type="button">{action} <GovArrowUpRightIcon size={13} /></button>
    </div>
  )
}