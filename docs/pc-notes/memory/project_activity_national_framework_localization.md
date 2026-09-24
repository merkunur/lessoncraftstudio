---
name: project-activity-national-framework-localization
description: "Non-EN activity surfaces cite each locale's NATIONAL curriculum framework NAME (no national code); CCSS code kept as JSON-LD targetName + /standards/<code> anchor. EN keeps Common Core; decks unchanged. Commits fe15a60b/f76588ad/adb1a976."
metadata: 
  node_type: memory
  type: project
  originSessionId: 4c5e1682-f8b5-4a57-b52d-c4bbf48bd3d8
---

As of 2026-05-31 the **activity layer** (NOT decks) cites each non-EN locale's **national curriculum framework NAME** instead of "Common Core" — **name only, no national code**. EN is unchanged ("Common Core <code>"). **Decks stay on Common Core** (separate future commission). Operator's rationale: Common Core is a US standard; DE/FR/Nordic/NL/Romance teachers use their own national curricula.

**The CCSS code is retained as the machine/SEO anchor** — it is NOT removed, only the human-facing framework *name* is localized. Code lives on at: JSON-LD `educationalAlignment.targetName`, the `/standards/<code>` hub (a deliberate CCSS-code search surface — "teachers search 'K.CC.B.4 worksheets'"), the manifest `alignment.code`, and the teacher chip.

**Per-locale framework lexicon (= CLAUDE.md §A.13.49, the SoT):** de `Lehrplan` · fr `Programmes officiels` · es `Currículo LOMLOE` · pt `BNCC` · it `Indicazioni nazionali` · nl `SLO-kerndoelen` · sv `Lgr22` · da `Fælles Mål` · no `LK20` · fi `OPS 2014`. EN `Common Core State Standards`.

**Surfaces localized (5):**
1. Activity route JSON-LD `educationalFramework` → `EDUCATIONAL_FRAMEWORK_BY_LOCALE` map in `frontend/app/[locale]/activities/[slug]/page.tsx` (targetName stays the CCSS code).
2. Activities landing `pageIntro`/`metaDescription` → national name, in `frontend/app/[locale]/activities/page.tsx` (`LANDING_STRINGS`).
3. Body templates `frontend/messages/activity-content/<10 non-EN>.json` (byStrand/generic/whatsInside — dropped `{code}`, swapped framework name).
4. Manifest `page_intro` framework clauses across `mini tools/*-activities.json` (drop code + national collocation, e.g. "Alineado con el currículo oficial", "Alinhado à BNCC", "Yhteensopiva OPS 2014:n kanssa").
5. Standards-hub: `standardsPage.intro` + `.meta.description` + standards FAQ in `frontend/messages/<10 non-EN>.json`, plus standards JSON-LD `educationalFramework` → `FRAMEWORK_BY_LOCALE` map in `frontend/app/[locale]/standards/[code]/page.tsx`.

**Why the standards hub had to change too (the bleed):** `NextIntlClientProvider` serializes the *entire* locale message set into every page's RSC flight-data payload. So the `standardsPage` "Common Core" strings leaked onto the activity pages' flight-data even though they only render on the hub. Localizing the standards namespace cleared BOTH the hub pages and the activity-page flight-data. (Diagnostic: a non-EN activity page showed 3 residual "Common Core" in the RSC payload, all sourced from the excluded hub namespace.)

**Verified live (2026-05-31):** all 10 non-EN activity pages = 0 "Common Core" (visible prose + `<head>` + flight-data); DE standards hub → "Lehrplan" + localized JSON-LD; EN intact (30 on activity page, 26 on hub). Verify with `node scripts/audit-activity-pages.js` + per-locale curl grep for "Common Core" (expect 0 non-EN, >0 en).

**Commits:** `fe15a60b` (route + landing + manifests + 9 body templates) · `f76588ad` (pt body template — pt had been omitted from the first sweep) · `adb1a976` (standards hub, NSR-flagged).

**Flags / tech-debt:**
- Framework name is duplicated in TWO code maps (`EDUCATIONAL_FRAMEWORK_BY_LOCALE` in the activity route + `FRAMEWORK_BY_LOCALE` in the standards route). Dedupe to one shared const at next touch (read-from-SoT precedence, CLAUDE.md §10.4).
- Minor fr/it article roughness on the low-traffic hub *labels*: fr "au Programmes officiels" (ideally "aux programmes officiels"); it "al Indicazioni nazionali" ("alle Indicazioni"). Artifact of inserting a multi-word name beside the kept `{code}`.
- Nordic (sv/da/no/fi) light native NSR pending per §17.5.1.

See [[project-activities-live-inventory]], [[project-activity-page-seo]], CLAUDE.md §A.13.49 (lexicon SoT) + §20.10 (doctrine).
