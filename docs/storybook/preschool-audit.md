# Pre-school (PK) platform audit + minimal safe extension

**Context.** Pre-school is NEW to the platform. The storybook library targets ~200 stories/grade
across **pre-school, K, 1, 2, 3**. Before authoring PK content, every code surface that keys off a
grade/age literal was audited so a PK story/activity renders correctly instead of silently
degrading. This doc is the surface inventory + the minimal additive extension applied.

**Grade literal = `PK`** (matches the manifest `alignment.grade` convention "K"/"1"/"2"/"3").
**Display age = `3-4`** — the band below Kindergarten, consistent with the platform's already-shipped
pre-school ladder (SEO landing LEVELS map, Wave 7: *Preschool 3-4 → K 5-6 → Gr1 6-7 → Gr2 7-8*) and
the §17.8.6 educational-level axis (`preschool` = age 3-5 range there; the activity/age surface uses
the tighter single-band `3-4`).

---

## Surfaces audited

| # | Surface | File | Keys off grade? | Action |
|---|---------|------|-----------------|--------|
| 1 | Activity detail-page age range (`typicalAgeRange`, JSON-LD) | `frontend/lib/seo/activity-content.ts` `gradeToAgeRange` | yes (`K/1/2/3` map, `?? null`) | **EXTENDED** `PK: '3-4'` |
| 2 | Activity detail-page grade chip + JSON-LD `educationalLevel` | `frontend/app/[locale]/activities/[slug]/page.tsx` `GRADE_KEY_MAP` | yes (`K/1/2/3 → seo.educational_level.*`) | **EXTENDED** `PK: 'preschool'` |
| 3 | Activities INDEX grade grouping/label | `frontend/app/[locale]/activities/page.tsx` `GRADE_KEY_MAP` + `GRADE_ORDER` | yes (group label + `GRADE_ORDER.filter`) | **EXTENDED** map `PK: 'preschool'`, order `["PK","K","1","2","3"]` |
| 4 | Localized level name (11 locales) | `frontend/messages/<loc>.json` `seo.educational_level.preschool` | — | **VERIFIED PRESENT ×11** (no authoring needed) |
| 5 | Standards hub (`/standards/<code>`) grade map | `frontend/app/[locale]/standards/[code]/page.tsx` `GRADE_KEY_MAP` | yes (`K/1/2/3`) | **INTENTIONALLY UNCHANGED** — see below |
| 6 | sb-1 story validator grade enforcement | `scripts/storybook/validate-story.js` | **no grade enforcement** | no change needed (a PK story passes) |
| 7 | GRADE_OVERRIDE (per-locale grade shift) | `frontend/app/[locale]/activities/[slug]/page.tsx` | keyed by activity-id | no change (PK activities can add entries later if a locale differs) |

### `seo.educational_level.preschool` — verified present in all 11 locales
```
en Preschool · de Vorschule · es Preescolar · pt Educação infantil · it Scuola dell'infanzia
nl Peuters · fr Maternelle · sv Förskola · da Børnehave · no Barnehage · fi Varhaiskasvatus
```
The localized substrate was already modelled (decks carry an age-3-5 `preschool` educational-level per
§17.8.6), so extension #4 was a **verify**, not an author.

---

## Intentional non-changes

- **Standards hub grade map (#5) stays `K/1/2/3`.** CCSS standards begin at Kindergarten — there are
  **no sub-K standards**. Therefore every pre-school activity is **readiness-class by necessity**: it
  carries a teaches-strand but **no `educationalAlignment` / CCSS code**, so it never resolves to a
  `/standards/<code>` page and never reaches this map. Adding `PK` here would be dead code implying a
  PK standard exists. (This mirrors the SEO landing program's Wave-7 ruling: *"CCSS begins at K → every
  Preschool coordinate is readiness-class by necessity."*)
- **`validate-story.js` (#6) has no grade allow-list**, so a `alignment.grade:"PK"` activity/story is
  accepted with no change. (If grade enforcement is ever added, `PK` must be in the allowed set.)

## Pedagogical guardrail for PK content (carry into the authoring engine / gates)

- PK activities/stories are **readiness-framed, NOT standard-bearing** — no CCSS code, teaches a
  readiness strand (early counting, one-to-one, print concepts, listening, sorting…).
- Curriculum-neutral child-facing framing (no US-standards leakage — the platform's standing rule).
- The C2 gate suite should treat a PK activity carrying a CCSS `alignment.code` as a **defect**
  (readiness-by-necessity), and hold PK reading-level/line-length to the gentlest band.

## What a PK story/activity now needs (nothing further in code)
1. Manifest/blueprint `alignment.grade: "PK"` (+ NO `alignment.code`; a readiness `strand`).
2. That's it — chip localizes ("Vorschule"/"Preescolar"/…), age renders "3-4", it groups under a
   leading **PK** band on the index, and the validator accepts it.

*Applied: activity-content.ts + activities detail route + activities index route. Verified: preschool
i18n key ×11. Not deployed with this doc — rides the next storybook/activities deploy.*
