import { ArrowUpRight, ShieldCheck } from "lucide-react"

export function PrivacyFootnote({ message, action }: { message: string; action: string }) {
  return <div className="privacy-footnote"><ShieldCheck size={14} /><span>{message}</span><button type="button">{action} <ArrowUpRight size={12} /></button></div>
}
