interface ArchitectureDiagramProps {
  highlightStakeholder?: "partner" | "patient" | "regulator"
}

export function ArchitectureDiagram({ highlightStakeholder }: ArchitectureDiagramProps) {
  const sh = (role: string) => {
    if (!highlightStakeholder) return "rgba(255,255,255,0.35)"
    return role === highlightStakeholder ? "#BF9B30" : "rgba(255,255,255,0.2)"
  }
  const shFont = (role: string) => {
    if (!highlightStakeholder) return 12
    return role === highlightStakeholder ? 13 : 12
  }
  const shWeight = (role: string) => {
    if (!highlightStakeholder) return 400
    return role === highlightStakeholder ? 600 : 400
  }

  return (
    <svg
      viewBox="0 0 680 540"
      className="w-full h-auto"
      role="img"
      aria-label="에테르힐 3-Layer Architecture"
    >
      <defs>
        <marker id="arch-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Layer 1: Patient Interface */}
      <rect x="80" y="30" width="520" height="80" rx="14" fill="rgba(16,60,50,0.9)" stroke="rgba(93,202,165,0.6)" strokeWidth="0.5" />
      <text x="340" y="58" textAnchor="middle" dominantBaseline="central" fill="#9FE1CB" fontSize="14" fontWeight="500" fontFamily="serif">
        Patient Interface
      </text>
      <text x="340" y="80" textAnchor="middle" dominantBaseline="central" fill="rgba(93,202,165,0.8)" fontSize="12">
        다국어 웹 · AI 챗봇 · 상담 예약 · 환자 대시보드
      </text>

      {/* Arrows: Patient → Engine */}
      <line x1="260" y1="110" x2="260" y2="140" stroke="#0F6E56" strokeWidth="0.8" markerEnd="url(#arch-arrow)" opacity="0.5" />
      <line x1="420" y1="110" x2="420" y2="140" stroke="#0F6E56" strokeWidth="0.8" markerEnd="url(#arch-arrow)" opacity="0.5" />

      {/* Layer 2: Verification Engine (main box) */}
      <rect x="60" y="148" width="560" height="200" rx="16" fill="rgba(45,40,100,0.9)" stroke="rgba(175,169,236,0.6)" strokeWidth="1.2" />
      <text x="340" y="178" textAnchor="middle" dominantBaseline="central" fill="#CECBF6" fontSize="14" fontWeight="500" fontFamily="serif">
        Verification Engine
      </text>
      <text x="340" y="198" textAnchor="middle" dominantBaseline="central" fill="rgba(175,169,236,0.7)" fontSize="12">
        에테르힐의 핵심 — 인센티브 완전 분리, 독립 검증
      </text>

      {/* Sub-box 1: AI Agent */}
      <rect x="88" y="220" width="144" height="100" rx="10" fill="rgba(16,60,50,0.9)" stroke="rgba(93,202,165,0.5)" strokeWidth="0.5" />
      <text x="160" y="252" textAnchor="middle" dominantBaseline="central" fill="#9FE1CB" fontSize="14" fontWeight="500" fontFamily="serif">
        AI Agent
      </text>
      <text x="160" y="272" textAnchor="middle" dominantBaseline="central" fill="rgba(93,202,165,0.8)" fontSize="12">
        환자 정보 구조화
      </text>
      <text x="160" y="290" textAnchor="middle" dominantBaseline="central" fill="rgba(93,202,165,0.8)" fontSize="12">
        다국어 조율
      </text>

      {/* Sub-box 2: Angel Physician */}
      <rect x="268" y="220" width="144" height="100" rx="10" fill="rgba(80,55,10,0.9)" stroke="rgba(191,155,48,0.6)" strokeWidth="0.5" />
      <text x="340" y="252" textAnchor="middle" dominantBaseline="central" fill="#E8C56D" fontSize="14" fontWeight="500" fontFamily="serif">
        Angel Physician
      </text>
      <text x="340" y="272" textAnchor="middle" dominantBaseline="central" fill="rgba(191,155,48,0.8)" fontSize="12">
        독립 의사 검증
      </text>
      <text x="340" y="290" textAnchor="middle" dominantBaseline="central" fill="rgba(191,155,48,0.8)" fontSize="12">
        이해관계 없음
      </text>

      {/* Sub-box 3: Trust Protocol */}
      <rect x="448" y="220" width="144" height="100" rx="10" fill="rgba(80,35,15,0.9)" stroke="rgba(220,140,100,0.5)" strokeWidth="0.5" />
      <text x="520" y="252" textAnchor="middle" dominantBaseline="central" fill="#F0C4A0" fontSize="14" fontWeight="500" fontFamily="serif">
        Trust Protocol
      </text>
      <text x="520" y="272" textAnchor="middle" dominantBaseline="central" fill="rgba(220,140,100,0.8)" fontSize="12">
        병원 품질 감사
      </text>
      <text x="520" y="290" textAnchor="middle" dominantBaseline="central" fill="rgba(220,140,100,0.8)" fontSize="12">
        정기 재검증
      </text>

      {/* Horizontal arrows inside engine */}
      <line x1="232" y1="270" x2="264" y2="270" stroke="#534AB7" strokeWidth="0.8" markerEnd="url(#arch-arrow)" opacity="0.4" />
      <line x1="412" y1="270" x2="444" y2="270" stroke="#534AB7" strokeWidth="0.8" markerEnd="url(#arch-arrow)" opacity="0.4" />

      {/* Arrows: Engine → Data */}
      <line x1="260" y1="348" x2="260" y2="378" stroke="#534AB7" strokeWidth="0.8" markerEnd="url(#arch-arrow)" opacity="0.5" />
      <line x1="420" y1="348" x2="420" y2="378" stroke="#534AB7" strokeWidth="0.8" markerEnd="url(#arch-arrow)" opacity="0.5" />

      {/* Layer 3: Data & Compliance */}
      <rect x="80" y="386" width="520" height="80" rx="14" fill="rgba(50,50,48,0.9)" stroke="rgba(180,178,169,0.4)" strokeWidth="0.5" />
      <text x="340" y="414" textAnchor="middle" dominantBaseline="central" fill="#D3D1C7" fontSize="14" fontWeight="500" fontFamily="serif">
        Data &amp; Compliance
      </text>
      <text x="340" y="436" textAnchor="middle" dominantBaseline="central" fill="rgba(180,178,169,0.7)" fontSize="12">
        환자 동의 관리 · 데이터 익명화 · 감사 로그 · 규제 준수
      </text>

      {/* Stakeholders at bottom */}
      <text x="140" y="500" textAnchor="middle" fill={sh("partner")} fontSize={shFont("partner")} fontWeight={shWeight("partner")}>
        파트너 병원
      </text>
      <text x="340" y="500" textAnchor="middle" fill={sh("patient")} fontSize={shFont("patient")} fontWeight={shWeight("patient")}>
        해외 환자
      </text>
      <text x="540" y="500" textAnchor="middle" fill={sh("regulator")} fontSize={shFont("regulator")} fontWeight={shWeight("regulator")}>
        규제 기관
      </text>

      {/* Dashed arrows from stakeholders */}
      <path d="M140 490 L140 470" fill="none" stroke={sh("partner")} strokeWidth="0.8" strokeDasharray="4 3" markerEnd="url(#arch-arrow)" opacity="0.5" />
      <path d="M340 490 L340 470" fill="none" stroke={sh("patient")} strokeWidth="0.8" strokeDasharray="4 3" markerEnd="url(#arch-arrow)" opacity="0.5" />
      <path d="M540 490 L540 470" fill="none" stroke={sh("regulator")} strokeWidth="0.8" strokeDasharray="4 3" markerEnd="url(#arch-arrow)" opacity="0.5" />
    </svg>
  )
}
