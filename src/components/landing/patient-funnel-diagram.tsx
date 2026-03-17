export function PatientFunnelDiagram() {
  return (
    <svg
      viewBox="0 0 680 580"
      className="w-full h-auto"
      role="img"
      aria-label="에테르힐 환자 검증 퍼널"
    >
      <defs>
        <marker id="funnel-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Step 1: 해외 환자 유입 — narrowest (280px) */}
      <rect x="200" y="24" width="280" height="56" rx="28" fill="rgba(50,50,48,0.9)" stroke="rgba(180,178,169,0.4)" strokeWidth="0.5" />
      <text x="340" y="46" textAnchor="middle" dominantBaseline="central" fill="#D3D1C7" fontSize="14" fontWeight="500" fontFamily="serif">
        해외 환자 유입
      </text>
      <text x="340" y="64" textAnchor="middle" dominantBaseline="central" fill="rgba(180,178,169,0.7)" fontSize="12">
        품질 판별 불가능한 상태
      </text>

      {/* Arrow 1→2 */}
      <line x1="340" y1="80" x2="340" y2="112" stroke="rgba(180,178,169,0.3)" strokeWidth="0.8" markerEnd="url(#funnel-arrow)" opacity="0.5" />

      {/* Step 2: AI Agent (360px) */}
      <rect x="160" y="118" width="360" height="72" rx="12" fill="rgba(16,60,50,0.9)" stroke="rgba(93,202,165,0.5)" strokeWidth="0.5" />
      <text x="340" y="144" textAnchor="middle" dominantBaseline="central" fill="#9FE1CB" fontSize="14" fontWeight="500" fontFamily="serif">
        AI Agent 정보 구조화
      </text>
      <text x="340" y="166" textAnchor="middle" dominantBaseline="central" fill="rgba(93,202,165,0.7)" fontSize="12">
        병력 · 희망 시술 · 예산 · 기대치 → 구조화된 케이스 생성
      </text>
      {/* Side label */}
      <text x="546" y="154" fill="rgba(194,192,182,0.4)" fontSize="12">자동화</text>

      {/* Arrow 2→3 */}
      <line x1="340" y1="190" x2="340" y2="222" stroke="#0F6E56" strokeWidth="0.8" markerEnd="url(#funnel-arrow)" opacity="0.5" />

      {/* Step 3: Angel Physician (400px) */}
      <rect x="140" y="228" width="400" height="72" rx="12" fill="rgba(80,55,10,0.9)" stroke="rgba(191,155,48,0.6)" strokeWidth="0.5" />
      <text x="340" y="254" textAnchor="middle" dominantBaseline="central" fill="#E8C56D" fontSize="14" fontWeight="500" fontFamily="serif">
        Angel Physician 독립 의사 검증
      </text>
      <text x="340" y="276" textAnchor="middle" dominantBaseline="central" fill="rgba(191,155,48,0.7)" fontSize="12">
        병원과 이해관계 없는 의사가 케이스 리뷰 · 적합성 판단
      </text>
      {/* Side label */}
      <text x="564" y="264" fill="rgba(194,192,182,0.4)" fontSize="12">독립 검증</text>

      {/* Rejection path — left branch from Angel Physician */}
      <path d="M140 264 L90 264 L90 310" fill="none" stroke="#E24B4A" strokeWidth="0.8" strokeDasharray="4 3" markerEnd="url(#funnel-arrow)" opacity="0.5" />
      <rect x="46" y="316" width="88" height="40" rx="8" fill="rgba(121,31,31,0.9)" stroke="rgba(240,149,149,0.5)" strokeWidth="0.5" />
      <text x="90" y="336" textAnchor="middle" dominantBaseline="central" fill="#F09595" fontSize="12">
        부적합 반려
      </text>

      {/* Arrow 3→4 */}
      <line x1="340" y1="300" x2="340" y2="332" stroke="#BA7517" strokeWidth="0.8" markerEnd="url(#funnel-arrow)" opacity="0.5" />

      {/* Step 4: Decision-ready (440px) */}
      <rect x="120" y="338" width="440" height="72" rx="12" fill="rgba(45,40,100,0.9)" stroke="rgba(175,169,236,0.5)" strokeWidth="0.5" />
      <text x="340" y="364" textAnchor="middle" dominantBaseline="central" fill="#CECBF6" fontSize="14" fontWeight="500" fontFamily="serif">
        의사결정 준비 완료
      </text>
      <text x="340" y="386" textAnchor="middle" dominantBaseline="central" fill="rgba(175,169,236,0.7)" fontSize="12">
        검증된 정보 기반 · 환자가 능동적으로 판단할 수 있는 상태
      </text>
      {/* Side label */}
      <text x="584" y="374" fill="rgba(194,192,182,0.4)" fontSize="12">전환점</text>

      {/* Arrow 4→5 */}
      <line x1="340" y1="410" x2="340" y2="442" stroke="#534AB7" strokeWidth="0.8" markerEnd="url(#funnel-arrow)" opacity="0.5" />

      {/* Step 5: Partner hospital — widest (480px), stronger border */}
      <rect x="100" y="448" width="480" height="72" rx="12" fill="rgba(16,60,50,0.95)" stroke="rgba(93,202,165,0.8)" strokeWidth="1" />
      <text x="340" y="474" textAnchor="middle" dominantBaseline="central" fill="#9FE1CB" fontSize="14" fontWeight="500" fontFamily="serif">
        파트너 병원 연계
      </text>
      <text x="340" y="496" textAnchor="middle" dominantBaseline="central" fill="rgba(93,202,165,0.8)" fontSize="12">
        높은 전환율 · 정확한 기대치 · 즉시 진료 가능한 환자
      </text>
      {/* ← 귀원 emphasis */}
      <text x="604" y="484" fill="rgba(194,192,182,0.4)" fontSize="12">← 귀원</text>

      {/* Bottom note */}
      <text x="340" y="548" textAnchor="middle" fill="rgba(194,192,182,0.35)" fontSize="12">
        마케팅이 아닌 검증이 환자를 연결합니다
      </text>
    </svg>
  )
}
