import { XCircle, CheckCircle2 } from "lucide-react"

interface ComparisonTableProps {
  title: string
  subtitle?: string
  oldLabel: string
  oldItems: string[]
  newLabel: string
  newItems: string[]
}

export function ComparisonTable({ title, subtitle, oldLabel, oldItems, newLabel, newItems }: ComparisonTableProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy mb-4 text-center break-keep">{title}</h2>
      {subtitle && <p className="text-[15px] text-slate-700 text-center mb-12 break-keep">{subtitle}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-slate-200">
        <div className="bg-red-50/80 p-7 sm:p-8 border-b md:border-b-0 md:border-r border-slate-200">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-red-600 mb-6 break-keep">{oldLabel}</h3>
          <ul className="space-y-4">
            {oldItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="text-[15px] text-slate-700 leading-relaxed break-keep">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-emerald-50/80 p-7 sm:p-8">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 mb-6 break-keep">{newLabel}</h3>
          <ul className="space-y-4">
            {newItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-[15px] text-slate-700 leading-relaxed break-keep">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
