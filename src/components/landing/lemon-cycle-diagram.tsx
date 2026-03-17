interface CycleStep {
  title: string
  detail: string
}

interface LemonCycleDiagramProps {
  steps: CycleStep[]
  label: string
  subLabel: string
  caption: string
  captionSub: string
}

export function LemonCycleDiagram({ steps, label, subLabel, caption, captionSub }: LemonCycleDiagramProps) {
  return (
    <div className="rounded-2xl bg-brand-navy p-6 sm:p-8 overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="font-serif text-lg text-white font-semibold break-keep">{label}</h3>
      </div>

      <svg
        viewBox="0 0 600 420"
        className="w-full h-auto"
        aria-label={label}
        role="img"
      >
        <defs>
          <marker
            id="cycle-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M2 1L8 5L2 9" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <marker
            id="cycle-arrow-dashed"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M2 1L8 5L2 9" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {steps.map((step, i) => {
          const y = 10 + i * 94
          return (
            <g key={i}>
              {/* Step box */}
              <rect x="140" y={y} width="400" height="68" rx="10" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.25)" strokeWidth="0.5" />
              <text x="340" y={y + 28} textAnchor="middle" dominantBaseline="central" fill="#fca5a5" fontSize="14" fontWeight="600" fontFamily="serif">
                {step.title}
              </text>
              <text x="340" y={y + 50} textAnchor="middle" dominantBaseline="central" fill="rgba(239,68,68,0.6)" fontSize="12" fontWeight="400">
                {step.detail}
              </text>

              {/* Step number */}
              <circle cx="120" cy={y + 34} r="14" fill="rgba(239,68,68,0.15)" />
              <text x="120" y={y + 34} textAnchor="middle" dominantBaseline="central" fill="#fca5a5" fontSize="12" fontWeight="600">
                {i + 1}
              </text>

              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <line x1="340" y1={y + 68} x2="340" y2={y + 94} stroke="#ef4444" strokeWidth="1" markerEnd="url(#cycle-arrow)" opacity="0.5" />
              )}
            </g>
          )
        })}

        {/* Return arrow (dashed, left side) */}
        <path
          d={`M140 ${10 + 3 * 94 + 34} L70 ${10 + 3 * 94 + 34} C50 ${10 + 3 * 94 + 34} 50 ${10 + 3 * 94 + 14} 50 ${10 + 3 * 94 + 14} L50 44 C50 24 70 24 70 24 L116 24`}
          fill="none"
          stroke="#ef4444"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          markerEnd="url(#cycle-arrow-dashed)"
          opacity="0.45"
        />

        {/* "악순환" label */}
        <text x="40" y={10 + 2 * 94} textAnchor="end" fill="rgba(255,255,255,0.35)" fontSize="12" fontWeight="400">
          {subLabel}
        </text>

        {/* Bottom caption */}
        <line x1="140" y1="395" x2="540" y2="395" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <text x="140" y="412" fill="rgba(255,255,255,0.3)" fontSize="11" fontWeight="400">
          {caption}
        </text>
      </svg>

      <p className="text-[11px] text-white/30 mt-1 break-keep">{captionSub}</p>
    </div>
  )
}
