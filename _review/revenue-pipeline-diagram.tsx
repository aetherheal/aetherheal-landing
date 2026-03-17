export function RevenuePipelineDiagram() {
  return (
    <svg
      viewBox="0 0 680 580"
      className="w-full h-auto"
      role="img"
      aria-label="에테르힐 수익 구조: 순차 점화 모델"
    >
      <defs>
        <marker id="rev-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Layer 1: 환자 의사결정 지원 수수료 */}
      <rect x="60" y="40" width="400" height="84" rx="12" fill="rgba(16,60,50,0.9)" stroke="rgba(93,202,165,0.5)" strokeWidth="0.5" />
      <text x="84" y="70" dominantBaseline="central" fill="#9FE1CB" fontSize="14" fontWeight="500">환자 의사결정 지원 수수료</text>
      <text x="84" y="94" dominantBaseline="central" fill="rgba(93,202,165,0.7)" fontSize="12">시술 비용과 무관한 정액제 · B2C</text>

      <rect x="480" y="44" width="160" height="72" rx="10" fill="rgba(16,60,50,0.9)" stroke="rgba(93,202,165,0.5)" strokeWidth="0.5" />
      <text x="560" y="68" textAnchor="middle" dominantBaseline="central" fill="#9FE1CB" fontSize="14" fontWeight="500">Day 1</text>
      <text x="560" y="88" textAnchor="middle" dominantBaseline="central" fill="rgba(93,202,165,0.7)" fontSize="12">PMF 증명 구간</text>
      <text x="560" y="104" textAnchor="middle" dominantBaseline="central" fill="rgba(93,202,165,0.7)" fontSize="12">unit economics 검증</text>

      {/* Ignition 1→2 */}
      <line x1="270" y1="124" x2="270" y2="150" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" markerEnd="url(#rev-arrow)" opacity="0.4" />
      <text x="286" y="140" fill="rgba(194,192,182,0.3)" fontSize="12">검증 완료</text>

      {/* Layer 2: 파트너 병원 연간 멤버십 */}
      <rect x="60" y="156" width="400" height="84" rx="12" fill="rgba(80,55,10,0.9)" stroke="rgba(191,155,48,0.6)" strokeWidth="0.5" />
      <text x="84" y="186" dominantBaseline="central" fill="#E8C56D" fontSize="14" fontWeight="500">파트너 병원 연간 멤버십</text>
      <text x="84" y="210" dominantBaseline="central" fill="rgba(191,155,48,0.7)" fontSize="12">Founding cohort 무료 → 유료 전환 · B2B</text>

      <rect x="480" y="160" width="160" height="72" rx="10" fill="rgba(80,55,10,0.9)" stroke="rgba(191,155,48,0.6)" strokeWidth="0.5" />
      <text x="560" y="184" textAnchor="middle" dominantBaseline="central" fill="#E8C56D" fontSize="14" fontWeight="500">Month 6+</text>
      <text x="560" y="204" textAnchor="middle" dominantBaseline="central" fill="rgba(191,155,48,0.7)" fontSize="12">환자 실적 기반</text>
      <text x="560" y="220" textAnchor="middle" dominantBaseline="central" fill="rgba(191,155,48,0.7)" fontSize="12">유료 전환 시작</text>

      {/* Ignition 2→3 */}
      <line x1="270" y1="240" x2="270" y2="266" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" markerEnd="url(#rev-arrow)" opacity="0.4" />
      <text x="286" y="256" fill="rgba(194,192,182,0.3)" fontSize="12">환자 수 임계점</text>

      {/* Layer 3: Patient Logistics */}
      <rect x="60" y="272" width="400" height="84" rx="12" fill="rgba(113,43,19,0.9)" stroke="rgba(240,153,123,0.5)" strokeWidth="0.5" />
      <text x="84" y="302" dominantBaseline="central" fill="#F5C4B3" fontSize="14" fontWeight="500">Patient Logistics 플랫폼</text>
      <text x="84" y="326" dominantBaseline="central" fill="rgba(240,153,123,0.7)" fontSize="12">프리랜서 풀 기반 양면 플랫폼 · 건당 수수료</text>

      <rect x="480" y="276" width="160" height="72" rx="10" fill="rgba(113,43,19,0.9)" stroke="rgba(240,153,123,0.5)" strokeWidth="0.5" />
      <text x="560" y="300" textAnchor="middle" dominantBaseline="central" fill="#F5C4B3" fontSize="14" fontWeight="500">Year 1</text>
      <text x="560" y="320" textAnchor="middle" dominantBaseline="central" fill="rgba(240,153,123,0.7)" fontSize="12">월 환자 수 N명+</text>
      <text x="560" y="336" textAnchor="middle" dominantBaseline="central" fill="rgba(240,153,123,0.7)" fontSize="12">공급풀 확보 후</text>

      {/* Ignition 3→4 */}
      <line x1="270" y1="356" x2="270" y2="382" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" markerEnd="url(#rev-arrow)" opacity="0.4" />
      <text x="286" y="372" fill="rgba(194,192,182,0.3)" fontSize="12">데이터 축적</text>

      {/* Layer 4: Customized AI Agent */}
      <rect x="60" y="388" width="400" height="84" rx="12" fill="rgba(45,40,100,0.9)" stroke="rgba(175,169,236,0.5)" strokeWidth="0.5" />
      <text x="84" y="418" dominantBaseline="central" fill="#CECBF6" fontSize="14" fontWeight="500">병원별 Customized AI Agent</text>
      <text x="84" y="442" dominantBaseline="central" fill="rgba(175,169,236,0.7)" fontSize="12">Agentic AI · 로컬 마켓 확장 · 병원별 SaaS</text>

      <rect x="480" y="392" width="160" height="72" rx="10" fill="rgba(45,40,100,0.9)" stroke="rgba(175,169,236,0.5)" strokeWidth="0.5" />
      <text x="560" y="416" textAnchor="middle" dominantBaseline="central" fill="#CECBF6" fontSize="14" fontWeight="500">Year 2+</text>
      <text x="560" y="436" textAnchor="middle" dominantBaseline="central" fill="rgba(175,169,236,0.7)" fontSize="12">글로벌 → 로컬</text>
      <text x="560" y="452" textAnchor="middle" dominantBaseline="central" fill="rgba(175,169,236,0.7)" fontSize="12">커스터마이징 확장</text>

      {/* Left vertical bracket */}
      <path d="M44 56 L44 456" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <path d="M40 56 L44 44 L48 56" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
      <path d="M40 456 L44 468 L48 456" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />

      {/* Bottom line + captions */}
      <line x1="60" y1="500" x2="640" y2="500" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      <text x="60" y="524" fill="rgba(194,192,182,0.4)" fontSize="12">각 레이어는 이전 레이어가 점화 조건을 충족한 후 순차 가동</text>
      <text x="60" y="544" fill="rgba(194,192,182,0.35)" fontSize="12">Day 1은 하나에 집중 — unit economics 증명이 나머지 전부의 전제조건</text>
    </svg>
  )
}
