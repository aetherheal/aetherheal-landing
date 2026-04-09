# AetherHeal Landing — Next Session TODO

> Created: 2026-04-09
> Context: Previous session hit rate limits. AR and HU language packs incomplete.

## Must Do (In Order)

### 1. Create Arabic (AR) language pack
- [ ] Create `src/i18n/dictionaries/ar.json` (translate from en.json)
- [ ] Create 7 blog posts in `content/blog/ar/` (translate from en/)
- Note: Arabic is RTL — add `dir="rtl"` handling in layout.tsx later

### 2. Create Hungarian (HU) language pack
- [ ] Create `src/i18n/dictionaries/hu.json` (translate from en.json)
- [ ] Create 7 blog posts in `content/blog/hu/` (translate from en/)

### 3. Register all 4 new locales in config
- [ ] `src/i18n/config.ts` — add ar, hu, de, fr to:
  - `locales` array
  - `patientLocales` array
  - `localeNames` (ar: "العربية", hu: "Magyar", de: "Deutsch", fr: "Français")
  - `localeShort` (ar: "AR", hu: "HU", de: "DE", fr: "FR")
  - `ogLocales` (ar: "ar_SA", hu: "hu_HU", de: "de_DE", fr: "fr_FR")
- [ ] `src/i18n/get-dictionary.ts` — add imports for ar, hu, de, fr

### 4. Journey Assurance page translations
- [ ] Add `journeyAssurance` section to: zh, ja, th, ru, ko, ar, hu, de, fr dictionaries
- Page already created at `src/app/[locale]/journey-assurance/page.tsx`
- EN dictionary content already in `en.json` under `journeyAssurance` key

### 5. Blog sort labels for new languages
- [ ] Add `sortNewest`, `sortOldest`, `sortReadingTime`, `articlesCount` to ar, hu, de, fr dictionaries
- Already done for: en, zh, ja, th, ru, ko

### 6. TypeScript check + Deploy
- [ ] `npx tsc --noEmit`
- [ ] `git add . && git commit && git push`
- [ ] `netlify deploy --prod`

## Already Completed (Don't Redo)

### Languages done:
- ✅ French (FR) — dictionary + 7 blog posts
- ✅ German (DE) — dictionary + 7 blog posts
- ✅ Existing 6 languages (en, zh, ja, th, ru, ko) — all updated

### Features done:
- ✅ Journey Assurance page (EN) — component + dictionary + routing + footer link
- ✅ FAQ schema markup — FAQPage on homepage, MedicalOrganization on layout
- ✅ Blog sort/filter — category counts, newest/oldest/quick-reads sorting
- ✅ Blog sort labels — translated for en, zh, ja, th, ru, ko

### Previous sessions:
- ✅ Security hardening (rate limiting, session auth, CORS, CSP, RLS)
- ✅ SEO optimization (titles <60 chars, descriptions <160, internal links, cover images 7/7)
- ✅ UX improvements (explore search/jump, TL;DR summaries, homepage streamlined)
- ✅ Blog posts: 7 articles × 6+ languages
- ✅ "Why Korea" expanded from 654 to 2650 words

## File Locations Reference
- Dictionaries: `src/i18n/dictionaries/[locale].json`
- Blog posts: `content/blog/[locale]/*.md`
- i18n config: `src/i18n/config.ts`
- Dictionary loader: `src/i18n/get-dictionary.ts`
- Journey Assurance page: `src/app/[locale]/journey-assurance/page.tsx`
- Blog listing: `src/app/[locale]/blog/blog-listing-client.tsx`
