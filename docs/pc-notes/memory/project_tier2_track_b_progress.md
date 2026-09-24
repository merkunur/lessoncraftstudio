---
name: Tier 2 i18n Track B per-locale per-wave authoring tracker
description: Active progress tracker for Tier 2 Track B subscriber-and-public-surface i18n authoring (es / nl message-file authoring across the 3-wave sequence). Wave 1 = homepage + footer + topicPage (public surfaces). Wave 2 = collections + workspace + bulk + share (subscriber surfaces). Wave 3 = support + auth + billing + legal (long-tail).
type: project
originSessionId: tier2-track-b-wave-1
---
**Reading rule:** Read at session start when working any Tier 2 Track B wave. Cross-reference `memory/project_tier2_i18n_recon.md` for the 3-track structural decoupling and `memory/project_tier2_track_c_progress.md` for the parallel catalog rollout track.

**Writing rule:** Append a new wave entry per ship. Include locale, namespaces covered, key count, commit SHA, halt-and-surface findings, default adjudications.

---

## Wave 1 (es) — homepage + footer + topicPage (shipped 2026-05-03)

**Commit SHA:** `4e61c24d`
**Source:** TIER2-WAVE1-ES-DRAFT-v1.md operator authoring + CC reconciliation/gap-fill.

### Key counts authored

| Namespace | en canonical | Draft authored | CC gap-filled | Total ES authored |
|---|---|---|---|---|
| homepage.* | 67 | ~50 | 16 utility + 1 path normalization | 67 |
| footer.* | 9 | 6 (3 reconciled to en+de pattern) | 2 (moreLanguagesSoon, moreTopicsSoon) | 9 |
| topicPage.* | 12 | 0 (framing only) | 12 (CC authored full per draft framing) | 12 |
| **Total** | **88** | **~56** | **30** | **88** |

Draft also proposed 2 keys not in en.json: `footer.tagline` + extended `footer.copyright` ("Hecho para docentes."). Both **dropped** per Wave 1 scope discipline (cross-locale add filed deferred — would require en + de + es change in one commit with proper review).

### Reconciliation discipline applied

1. **Path normalization:** Draft `homepage.hero.h1` + `subhead` → en canonical `homepage.hero.title` + `subtitle`. Translation content correct; only key paths normalized.
2. **Footer en+de full pattern:** Draft's terse "Por lengua" / "Por tema" / "Por tipo de actividad" → "Hojas de trabajo por lengua" / "...por tema" / "...por tipo de actividad" matching DE Tier 1 precedent ("Arbeitsblätter nach Sprache/..."). Operator confirmed cross-locale Footer column-header consistency outweighs per-locale terseness.
3. **Footer copyright stripped:** Draft's "© 2026 LessonCraftStudio. Hecho para docentes." → "© 2026 LessonCraftStudio." matching en+de.
4. **Old-schema replacement:** es.json `homepage` + `footer` were pre-pivot seller-era schema (190 + 18 lines, features/pricing/companyName/support/legal sub-namespaces). 0 frontend consumers verified via grep before replacing. Wholesale namespace replacement, not extension.

### 16 homepage utility keys gap-filled by CC

- `hero.interaction`
- `breadthGrid`: intro, featuredBadge, playInline, openDeck, closeFeatured, loadingDeck (6)
- `languageProof`: subIntro, german.ariaLabel, french.ariaLabel (3)
- `freeExperience.intro`
- `subscription.alreadySubscribedCta`
- `notify`: label, submitting, confirmation, errors.invalid_email, errors.server (5)

### topicPage.* per-axis preposition naturalness

Same composition challenge as DE: theme nouns don't compose as English-style prefix ("animal worksheets" → not "animal hojas de trabajo"). Solution: per-axis preposition selection mirroring DE precedent.

- `heading.exerciseType`: "Hojas de trabajo de {topic}" (e.g., "Hojas de trabajo de resta")
- `heading.theme`: "Hojas de trabajo con {topic}" (e.g., "Hojas de trabajo con animal")
- `heading.educationalLevel`: "Hojas de trabajo para {topic}" (e.g., "Hojas de trabajo para jardín infantil")

ICU plural on `decksCount`: `=0 {Aún no hay hojas de trabajo} =1 {1 hoja de trabajo} other {# hojas de trabajo}` — gender + plural agreement preserved.

### 3 default adjudications (operator did not amend at authorization)

- `homepage.subscription.workspace.title`: "para la docente que realmente es" (la docente, feminine — per draft default)
- `homepage.languageProof.closingLine`: "A ese estándar dirigimos nuestro trabajo" (per draft default; rejected literal "Construimos a ese listón")
- `homepage.subscription.themedBundles.body`: "regreso a clases" (universal LATAM+Spain — per draft default; rejected Peninsular-Spanish-specific "vuelta al cole")

### Address-form lock

Formal `usted` throughout es.json public-surface namespaces. Mirrors DE `Sie` lock established at `078501a6`. Formal usted register: "Filtre por", "Imprímalos", "Será dirigido", "Avísenme", "Cancele cuando quiera", "Déjenos su correo". K-3-educator-respecting professional register.

### Halt-and-surface findings at HALT POINT 1

3 reconciliation findings surfaced for operator adjudication before commit:
- **Footer reconciliation strategy:** apply en+de full pattern (recommended) vs preserve draft's terse form. Operator confirmed: full pattern.
- **footer.tagline:** drop vs cross-locale add. Operator confirmed: drop, file deferred.
- **footer.copyright extension:** strip vs preserve. Operator confirmed: strip.

Operator framing: "The reconciliation discipline is right — Wave 1's job is to close the es debt against the existing surface, not to re-author the surface in Spanish."

### Build verification

- 0 MISSING_MESSAGE warnings on es for homepage.* / footer.* / topicPage.* (the 3 Wave 1 namespaces)
- Residual 12 MISSING_MESSAGE on es = 6 unique keys × 2 occurrences, all in workspace.* + collections.* (Wave 2 scope)
- Pre-Wave-1 residual: substantially higher (homepage + footer pre-pivot schema + topicPage absent meant es fell through to en fallback for the entire home page surface).

### Production verification

- /es <title> + meta description + og:title all in Spanish ✅
- /es Hero text Spanish ✅
- /es Footer column headers en+de+es uniform pattern ✅
- /es Section 5 (Notify-me) fully Spanish ✅
- /es/topic/animales/ renders "Hojas de trabajo con animal" (theme axis preposition correct) ✅
- 3 per-app es topic pages spot-check (resta / tren-del-abecedario / empareja-en-cuadricula) all render Spanish titles ✅

### Pre-commit hook

Pre-commit checks PASSED.

### Wave forecast

- **Wave 1 (nl mirror):** 88-key parallel for nl. Native authoring per Section 3 thesis applied to Dutch. Same homepage/footer/topicPage scope. Operator-coordinated draft expected.
- **Wave 2 (es subscriber surfaces):** collections.* + workspace.* + bulk.* + share.* es authoring. Per recon estimate ~120 keys; CC verifies actual count at commission. Subscriber-API gate aware (the 12 residual MISSING_MESSAGE keys identified at Wave 1 build are the leading edge).
- **Wave 3 (es long-tail):** support.* + auth.* + billing.* + legal.* es authoring. Per recon estimate ~80 keys.

---

## Wave forecast (cumulative across both Tier 2 locales)

| Wave | Locale | Namespaces | Est key count | Status |
|---|---|---|---|---|
| 1 | es | homepage + footer + topicPage | 88 | ✅ Shipped at `4e61c24d` |
| 1 | nl | homepage + footer + topicPage | 88 | Pending operator-authored draft |
| 2 | es | collections + workspace + bulk + share | ~120 | Unblocked |
| 2 | nl | collections + workspace + bulk + share | ~120 | Pending Wave 1 nl + Track C nl-first |
| 3 | es | support + auth + billing + legal | ~80 | Unblocked |
| 3 | nl | support + auth + billing + legal | ~80 | Pending Wave 1 + 2 nl |
