export function FlowComparisonDiagram() {
  return (
    <svg
      viewBox="0 0 680 600"
      className="w-full h-auto"
      role="img"
      aria-label="기존 에이전시 vs 에테르힐 모델 비교"
    >
      <defs>
        <marker id="flow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Column headers */}
      <rect x="40" y="20" width="280" height="40" rx="8" fill="rgba(121,31,31,0.9)" stroke="rgba(240,149,149,0.5)" strokeWidth="0.5" />
      <text x="180" y="40" textAnchor="middle" dominantBaseline="central" fill="#F7C1C1" fontSize="14" fontWeight="500" fontFamily="serif">기존 에이전시 모델</text>

      <rect x="360" y="20" width="280" height="40" rx="8" fill="rgba(16,60,50,0.9)" stroke="rgba(93,202,165,0.5)" strokeWidth="0.5" />
      <text x="500" y="40" textAnchor="middle" dominantBaseline="central" fill="#9FE1CB" fontSize="14" fontWeight="500" fontFamily="serif">에테르힐 모델</text>

      {/* Center divider */}
      <line x1="340" y1="20" x2="340" y2="580" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="6 4" />

      {/* === LEFT: Agency flow === */}

      {/* L1: Patient */}
      <rect x="70" y="88" width="220" height="44" rx="8" fill="rgba(50,50,48,0.9)" stroke="rgba(180,178,169,0.4)" strokeWidth="0.5" />
      <text x="180" y="110" textAnchor="middle" dominantBaseline="central" fill="#D3D1C7" fontSize="14" fontWeight="500">해외 환자</text>
      <line x1="180" y1="132" x2="180" y2="160" stroke="#E24B4A" strokeWidth="0.8" markerEnd="url(#flow-arrow)" opacity="0.5" />

      {/* L2: Marketing */}
      <rect x="70" y="166" width="220" height="56" rx="8" fill="rgba(113,43,19,0.9)" stroke="rgba(240,153,123,0.5)" strokeWidth="0.5" />
      <text x="180" y="186" textAnchor="middle" dominantBaseline="central" fill="#F5C4B3" fontSize="14" fontWeight="500">마케팅 콘텐츠</text>
      <text x="180" y="204" textAnchor="middle" dominantBaseline="central" fill="rgba(240,153,123,0.8)" fontSize="12">광고 · 후기 · 전후사진</text>
      <line x1="180" y1="222" x2="180" y2="250" stroke="#E24B4A" strokeWidth="0.8" markerEnd="url(#flow-arrow)" opacity="0.5" />

      {/* L3: Agency */}
      <rect x="70" y="256" width="220" height="56" rx="8" fill="rgba(113,43,19,0.9)" stroke="rgba(240,153,123,0.5)" strokeWidth="0.5" />
      <text x="180" y="276" textAnchor="middle" dominantBaseline="central" fill="#F5C4B3" fontSize="14" fontWeight="500">에이전시 추천</text>
      <text x="180" y="294" textAnchor="middle" dominantBaseline="central" fill="rgba(240,153,123,0.8)" fontSize="12">수수료 높은 병원 우선</text>
      <line x1="180" y1="312" x2="180" y2="340" stroke="#E24B4A" strokeWidth="0.8" markerEnd="url(#flow-arrow)" opacity="0.5" />

      {/* L4: Hospital */}
      <rect x="70" y="346" width="220" height="44" rx="8" fill="rgba(50,50,48,0.9)" stroke="rgba(180,178,169,0.4)" strokeWidth="0.5" />
      <text x="180" y="368" textAnchor="middle" dominantBaseline="central" fill="#D3D1C7" fontSize="14" fontWeight="500">병원</text>
      <line x1="180" y1="390" x2="180" y2="418" stroke="#E24B4A" strokeWidth="0.8" markerEnd="url(#flow-arrow)" opacity="0.5" />

      {/* L5: Result */}
      <rect x="56" y="424" width="248" height="56" rx="8" fill="rgba(121,31,31,0.9)" stroke="rgba(240,149,149,0.5)" strokeWidth="0.5" />
      <text x="180" y="444" textAnchor="middle" dominantBaseline="central" fill="#F7C1C1" fontSize="14" fontWeight="500">기대치 불일치</text>
      <text x="180" y="462" textAnchor="middle" dominantBaseline="central" fill="rgba(240,149,149,0.8)" fontSize="12">불만 · 분쟁 · 신뢰 하락</text>

      {/* L: Bottom labels */}
      <text x="180" y="510" textAnchor="middle" fill="rgba(194,192,182,0.35)" fontSize="12">검증 단계 없음</text>
      <text x="180" y="528" textAnchor="middle" fill="rgba(194,192,182,0.35)" fontSize="12">인센티브 = 수수료</text>

      {/* === RIGHT: AetherHeal flow === */}

      {/* R1: Patient */}
      <rect x="390" y="88" width="220" height="44" rx="8" fill="rgba(50,50,48,0.9)" stroke="rgba(180,178,169,0.4)" strokeWidth="0.5" />
      <text x="500" y="110" textAnchor="middle" dominantBaseline="central" fill="#D3D1C7" fontSize="14" fontWeight="500">해외 환자</text>
      <line x1="500" y1="132" x2="500" y2="160" stroke="#0F6E56" strokeWidth="0.8" markerEnd="url(#flow-arrow)" opacity="0.5" />

      {/* R2: AI Agent */}
      <rect x="390" y="166" width="220" height="56" rx="8" fill="rgba(16,60,50,0.9)" stroke="rgba(93,202,165,0.5)" strokeWidth="0.5" />
      <text x="500" y="186" textAnchor="middle" dominantBaseline="central" fill="#9FE1CB" fontSize="14" fontWeight="500">AI Agent</text>
      <text x="500" y="204" textAnchor="middle" dominantBaseline="central" fill="rgba(93,202,165,0.7)" fontSize="12">정보 구조화 · 케이스 생성</text>
      <line x1="500" y1="222" x2="500" y2="250" stroke="#0F6E56" strokeWidth="0.8" markerEnd="url(#flow-arrow)" opacity="0.5" />

      {/* R3: Angel Physician */}
      <rect x="390" y="256" width="220" height="56" rx="8" fill="rgba(80,55,10,0.9)" stroke="rgba(191,155,48,0.6)" strokeWidth="0.5" />
      <text x="500" y="276" textAnchor="middle" dominantBaseline="central" fill="#E8C56D" fontSize="14" fontWeight="500">Angel Physician</text>
      <text x="500" y="294" textAnchor="middle" dominantBaseline="central" fill="rgba(191,155,48,0.7)" fontSize="12">독립 의사 검증 · 적합성 판단</text>
      <line x1="500" y1="312" x2="500" y2="340" stroke="#BA7517" strokeWidth="0.8" markerEnd="url(#flow-arrow)" opacity="0.5" />

      {/* R4: Decision ready */}
      <rect x="390" y="346" width="220" height="44" rx="8" fill="rgba(45,40,100,0.9)" stroke="rgba(175,169,236,0.5)" strokeWidth="0.5" />
      <text x="500" y="368" textAnchor="middle" dominantBaseline="central" fill="#CECBF6" fontSize="14" fontWeight="500">의사결정 준비 완료</text>
      <line x1="500" y1="390" x2="500" y2="418" stroke="#534AB7" strokeWidth="0.8" markerEnd="url(#flow-arrow)" opacity="0.5" />

      {/* R5: Hospital */}
      <rect x="376" y="424" width="248" height="56" rx="8" fill="rgba(16,60,50,0.95)" stroke="rgba(93,202,165,0.8)" strokeWidth="1" />
      <text x="500" y="444" textAnchor="middle" dominantBaseline="central" fill="#9FE1CB" fontSize="14" fontWeight="500">검증된 파트너 병원</text>
      <text x="500" y="462" textAnchor="middle" dominantBaseline="central" fill="rgba(93,202,165,0.8)" fontSize="12">높은 만족도 · 정확한 매칭</text>

      {/* R: Bottom labels */}
      <text x="500" y="510" textAnchor="middle" fill="rgba(194,192,182,0.35)" fontSize="12">3단계 독립 검증</text>
      <text x="500" y="528" textAnchor="middle" fill="rgba(194,192,182,0.35)" fontSize="12">인센티브 = 환자 결과</text>

      {/* Bottom comparison line + summaries */}
      <line x1="40" y1="556" x2="640" y2="556" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      <text x="180" y="578" textAnchor="middle" fill="rgba(194,192,182,0.4)" fontSize="12">환자 → 마케팅 → 병원</text>
      <text x="500" y="578" textAnchor="middle" fill="rgba(194,192,182,0.4)" fontSize="12">환자 → 검증 → 의사결정 → 병원</text>
    </svg>
  )
}
