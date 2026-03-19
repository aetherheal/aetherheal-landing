# TASKS.md — aetherheal-landing
_Cursor / Claude Code / Codex용 코딩 태스크_

## 🔴 Critical

- [ ] CTA 연결: 홈페이지 "Begin Your Journey" 버튼 → `/en/intake`
- [ ] CTA 연결: `/how-it-works` 하단 CTA → `/en/intake`
- [ ] CTA 연결: `/hair-transplant-korea` 페이지 CTA → `/en/intake`
- [ ] End-to-end intake 흐름 테스트 (intake API → Supabase → Resend 이메일)

## 🟡 Important

- [ ] 블로그 글 추가: "Why Hair Transplants Fail" (초고 있음, 발행 필요)
- [ ] `/our-philosophy` 네비게이션 순서 앞으로 이동 (현재 4번째 → 2-3번째로)
- [ ] Intake 페이지 다국어 지원 (현재 EN만 → KO, JA, ZH 추가)

## 🟢 Backlog

- [ ] `/for-hospitals` 페이지 생성 (한국어, 파트너 병원 대상)
- [ ] `/for-investors` 페이지 생성 (한국어/영어)
- [ ] GA4 이벤트 트래킹: intake 시작, intake 완료, CTA 클릭
- [ ] Sitemap + robots.txt 검증 (Google Search Console)

## ✅ 완료

- [x] Intake API route (`src/app/api/intake/route.ts`)
- [x] Intake page UI (`src/app/[locale]/intake/page.tsx`)
- [x] Layout fix: main flex-1 flex flex-col
- [x] Scroll fix: scrollContainerRef
- [x] Textarea auto-resize 제거
- [x] `output: "export"` 제거 (API routes 활성화)
- [x] `@netlify/plugin-nextjs` 추가

## 📌 Tech Notes

- Stack: Next.js (App Router), React 19, Tailwind v4, TypeScript, pnpm
- Deploy: Netlify (`@netlify/plugin-nextjs`, publish = `.next`)
- pnpm: `pnpm install --store-dir .pnpm-store/v10`
- Supabase: `bvndxnvonwazoohrcsfq` (AetherHeal 전용)
- Claude model: `claude-sonnet-4-20250514`
- i18n: en, ja, zh, ru, th (dictionary-based, `src/i18n/dictionaries/`)
