---
name: project-activity-page-seo
description: "Activity detail pages carry a full crawlable SEO body + link mesh in 11 locales; how to extend it for the 1000+ rollout, plus the guardrail audit script"
metadata: 
  node_type: memory
  type: project
  originSessionId: f49d98aa-7160-4f31-8825-295b5fd203ec
---

Activity detail pages (`/[locale]/activities/[slug]/`) are the ONLY indexable surface for activities — the playable engine is in an iframe to a JS-only `/mini-tools/*.html` shell that crawlers don't execute. A 4-part arc (2026-05-30, commits `1646c46f` → `5d100f9e`, branch `pivot/printable-business-toolkit`, LIVE) made the parent page maximally indexable. Operator directive: do NOT noindex the mini-tools; make the parent page rank.

**What every activity page now emits (server-rendered):**
- Rich crawlable body via `frontend/lib/seo/activity-content.ts` `getActivityContent(locale,row)` — 3-tier resolve: authored `prose[row.id]` → by-strand template → generic; `whatsInside` always derived from `row.params`/`alignment` so even templated pages carry unique nouns/numbers. Content lives in `frontend/messages/activity-content/<locale>.json` (all 11 locales). Sections: About / What's inside / How to play / What your child practices / Learning goals.
- `LearningResource` JSON-LD (plain SSR `<script>`, not next/script) + the existing `FAQPage` from `TopicFaq`.
- Link mesh (`frontend/lib/activities.ts` `listRelatedActivities` + `otherLocalesForRow`): "Practice this standard" → `/[locale]/standards/<code>/` hub, related-activities grid, visible other-language siblings.

**To add content for new activities (the 1000+ rollout):** add a `prose[<activity-id>]` block (or rely on the by-strand template — it alone clears the word floor) to each `activity-content/<locale>.json`. Strand KEYS in `templates.byStrand` stay English (they're `alignment.strand` lookup keys); only VALUES translate. Preserve `{min}/{max}/{grade}/{strand}/{code}/{theme}` placeholders. Per-locale curriculum framework terms per [[feedback-11-locale-recreation-discipline]] §A.13.49 (Lehrplan/BNCC/Lgr22/OPS 2014…); keep CCSS `{code}` as "Common Core". `LOADERS` in activity-content.ts must list each locale.

**Guardrail:** `node scripts/audit-activity-pages.js [--locales=…] [--out=…]` — fetches every live activity page, asserts ≥200 unique words + LearningResource + FAQPage + single h1 + standards/related/other-language links + no EN-leak. `otherLanguageLink` auto-skips single-locale activities (phonics: CVC/syllable builders are language-specific per §20.2). Exit 1 on failure → can gate rollout batches. Run it after each batch. Last full run: 187/187 across 11 locales.

See [[project-activities-architecture]] and CLAUDE.md §20.
