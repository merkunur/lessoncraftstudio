# Flashcard design exploration — Pillar 4 Arc 1 Phase 1

**Authored:** 2026-05-08
**Audience:** operator + design-specialist agent (independent review section below)
**Locked composition:** image + word label + sentence frame using the word
**Quality bar:** "very professional" — design-specialist validation required before Phase 2

## Design constraints (from Pillar 4 spec + carry-forward locks)

1. **Three-element layout:** image + word + sentence frame. Always three elements per card.
2. **Print format:** single-sided A4; CC adjudicates 6-per-page vs 9-per-page based on legibility at K-3 reading distance.
3. **Digital format:** swipe-through deck viewer; mobile + desktop responsive; no audio v1.
4. **Quality bar:** "very professional." Carry-forward typography lock from Arc 1 Phase 3 (`c9ae2225`): Fredoka (display) + Lexend Deca (body). Both Google Fonts; warm but legible; child-friendly without infantilizing.
5. **Locale coverage:** all 11 platform locales; layout must accommodate German (Schauspieler/Klimaanlage 13-15 chars), Finnish (kahvinkeitin/jääkaappi/herätyskello 11-13 chars + agglutinative compound risk to ~20 chars), Swedish (luftkonditionering 18 chars).
6. **K-3 audience:** ages 3-7 primarily; reading level evolves through window. Sentence-frame complexity calibrates to lower bound.
7. **Cross-platform:** print readability at A4 6/9-up scale; digital at 320px (mobile portrait) up to 1920px (desktop large).
8. **Tier-neutral attribution:** flashcards are subscriber-facing premium product (not §14.3 worksheet attribution). LCS branding via small footer/wordmark; no aggressive watermarking on free-tier flashcards (per spec §6 free-vs-paid boundary).

## Sentence-frame substrate (composition element 3)

Three architectural options for sentence-frame source:

**Option α — Static template per word:** "I see a {word}." or "This is a {word}." or "{word} is here." Simple substitution. Universally applicable. Locale-aware article handling via existing IMAGE_VOCABULARY `localizedArticle` helper (per `material-generator-shared.js` from `c9ae2225`).

**Option β — Per-vocab-key custom sentence:** every IMAGE_VOCABULARY entry gains a localized example sentence (`"cat": {..., "exampleSentence": {"en": "The cat sleeps on the chair.", "de": "Die Katze schläft auf dem Stuhl.", ...}}`). Authoring cost: 1,261 entries × 11 locales = 13,871 sentences. Substantial substrate work; would commission as Stream A Arc 2 dependency.

**Option γ — Hybrid:** static template baseline (Option α) for v1; allow per-vocab override via optional `exampleSentence` key. Lesson-plan teaching packages already author example sentences in their composedExercises rationale; harvest-able for high-priority vocabulary.

**CC adjudication: Option α for Arc 1 + Arc 2.** Option β substrate cost (~14k sentences) is large; not justified for v1. Option γ keeps door open for Pillar 4 Arc 3+ if subscriber-data signals warrant per-card customization. Carry-forward to Arc 2 commission spec.

Within Option α, **specific frame selection:**

- **EN:** "I see a/an {word}." (article auto-resolved from vocab `en` index 0/1 + first-letter heuristic for vowel-vs-consonant)
- **DE:** "Ich sehe einen/eine/ein {word}." (article from `de` index 2: m→einen / f→eine / n→ein)
- **ES:** "Veo un/una {word}." (gender from `es` index 2: m→un / f→una)
- **PT:** "Eu vejo um/uma {word}." (gender from `pt` index 2)
- **IT:** "Vedo un/una {word}." (gender from `it` index 2; elision rules → un'amico for vowel-initial f)
- **FR:** "Je vois un/une {word}." (gender from `fr` index 2; elision → un avion / une école)
- **NL:** "Ik zie een {word}." (uniform `een` for both d-words and h-words)
- **SV:** "Jag ser en/ett {word}." (gender from `sv` index 2: n→en / t→ett)
- **DA:** "Jeg ser en/et {word}." (from `da` index 2)
- **NO:** "Jeg ser en/et {word}." (from `no` index 2; m+f→en / n→et)
- **FI:** "Näen {word}n." (Finnish has no articles; partitive case suffix on noun for "I see" object — adjudicator note: Finnish is agglutinative + case-marked; declension-aware substrate may need K-3 simplification fallback "Tässä on {word}." — "Here is X" — to avoid case-mark complexity)

**Finnish frame:** **"Tässä on {word}."** — "Here is X" — chosen for K-3 simplicity over partitive `Näen Xn` because (a) avoids case declension complexity at receptive-language level; (b) parallel to es "Aquí hay un X" / it "Ecco un X" register-equivalents; (c) Finnish K-3 readers natural.

NSR-flag Finnish frame for native-speaker review at sometime before Arc 2 full-generation.

---

## Candidate Design 1: "Sky" — clean / minimal / portrait orientation

**Layout philosophy:** maximize image breathing room; minimal visual chrome; type-anchored composition.

```
+------------------------------+
|                              |
|     +-------------------+    |
|     |                   |    |
|     |                   |    |
|     |       IMAGE       |    |  ← 60% card height
|     |    (centered)     |    |
|     |                   |    |
|     |                   |    |
|     +-------------------+    |
|                              |
|        Cat                   |  ← 18% card height; Fredoka 600 32pt
|                              |
|     I see a cat.             |  ← 16% card height; Lexend Deca 400 18pt
|                              |
|     · LessonCraftStudio ·    |  ← 6% card height; muted footer
+------------------------------+
```

**Specs:**
- Card aspect: 2:3 portrait (matches index card / business card vertical orientation)
- Image area: 60% height, centered horizontally with 12% horizontal padding
- Image background: pure white #ffffff (preserves PNG transparency cleanly)
- Word: Fredoka SemiBold 32pt, color #1a2332 (near-black-blue), letter-spacing 0
- Sentence: Lexend Deca Regular 18pt, color #4a5568 (warm gray)
- Card border: 2px #e1e4eb (light gray); 8px corner radius
- Footer wordmark: Lexend Deca Regular 9pt, color #94a3b8 (muted), letter-spaced

**Print at A4 6-per-page:** 3 columns × 2 rows; each card ~85×127mm; image at 96×96mm equivalent.
**Print at A4 9-per-page:** 3 columns × 3 rows; each card ~63×85mm; image at 64×64mm equivalent.
**Digital at desktop 1280px:** 8-card row × 1 deck height ≈ 600px; aspect-preserved.
**Digital at mobile 375px:** single card fills viewport with 24px padding.

**Stress-test (DE + FI):** "Klimaanlage" (12 chars) Fredoka 32pt at 72mm card width = ~52mm rendered → fits with margin. "Luftkonditionering" (sv 18 chars) at 32pt = ~78mm → BREAKS card width at 9-up scale. Mitigation: dynamic font-sizing rule (32pt → 26pt → 22pt fallback by length).

**Pros:**
- Cleanest visual; emphasis on image (most pedagogically important element).
- Calm-and-focused vibe; respects K-3 audience without infantilizing.
- Cross-locale typography fallback simple (size step-down).

**Cons:**
- Sentence frame visually disconnected from word (separated by white space, no scaffolding cue).
- Less visually "rich" — may read as under-designed at premium-subscriber tier.
- Portrait card less efficient for 6-up A4 layout (some white space waste).

---

## Candidate Design 2: "Card" — classic flashcard / framed image / decorative element

**Layout philosophy:** mimics traditional flashcard look; warm card-stock feel; subtle decorative touches signal "professional educational product."

```
+------------------------------+
|  ┌─────────────────────────┐ |
|  │                         │ |
|  │       IMAGE             │ |  ← framed; rounded corners; subtle shadow
|  │     (in frame)          │ |
|  │                         │ |
|  └─────────────────────────┘ |
|                              |
|    Cat            🐾         |  ← Fredoka 600 30pt + tiny theme-icon decoration
|                              |
|  ─────────────────────────   |
|    "I see a cat."            |  ← italic; quote-styled; LD 400 17pt
|                              |
|  LessonCraftStudio ────────  |
+------------------------------+
```

**Specs:**
- Card aspect: 4:5 (slightly taller than wide; classic flashcard proportions)
- Image area: 50% height, 100% width, with inset frame at 6% padding
- Image frame: 2px #cbd2dc with 4px inset white; subtle drop-shadow `0 2px 4px rgba(0,0,0,0.05)`
- Word: Fredoka SemiBold 30pt, color #1a2332
- Theme icon: small decorative emoji or themed glyph (animals → 🐾 paw print, foods → 🍴, vehicles → 🚗) — 18pt, muted color
- Divider: 1px #e1e4eb full-width; small inset
- Sentence: Lexend Deca Italic 17pt, color #4a5568, prefix-quoted with curly quotes
- Footer: branded line at bottom, full-width, 1px divider above; "LessonCraftStudio" in Lexend Deca SemiBold 10pt + horizontal divider

**Print at A4 6-per-page:** 2 columns × 3 rows; each card ~95×127mm.
**Print at A4 9-per-page:** 3 columns × 3 rows; each card ~63×85mm.
**Digital at desktop 1280px:** 6-card row × 1 deck; aspect 4:5.
**Digital at mobile 375px:** single card, 90% viewport width.

**Stress-test (DE + FI):** Same as Design 1 — dynamic font-sizing for long words. Theme icon adds ~30px horizontal real estate; budget tight at 9-up.

**Pros:**
- "Premium product" feel — theme icons + decorative dividers signal subscriber-tier quality.
- Sentence-frame visually scaffolded (italic + quotes = clearly an example, not a label).
- Card-stock metaphor familiar from physical flashcard markets.

**Cons:**
- Theme-icon system requires per-theme glyph mapping; substrate cost.
- Italic sentence frame may reduce legibility for early readers (italic harder to scan).
- Decorative density may compete with image for visual focus.

---

## Candidate Design 3: "Bilingual" — landscape orientation / sentence prominence / future-bilingual-extensible

**Layout philosophy:** sentence-frame prominence (matches "speaking-and-listening" pedagogical priority); landscape supports bilingual extension in future arcs (kid sees en + es side-by-side).

```
+------------------------------------------------------+
|                                                      |
|   +--------------------+                             |
|   |                    |    Cat                      |  ← word top-right; Fredoka 600 36pt
|   |                    |                             |
|   |      IMAGE         |    "I see a cat."           |  ← sentence; LD 400 22pt
|   |     (square)       |                             |
|   |                    |    The cat is on the mat.   |  ← extension sentence (optional)
|   +--------------------+                             |
|                                                      |
|                    LessonCraftStudio ·  cat-en       |
+------------------------------------------------------+
```

**Specs:**
- Card aspect: 3:2 landscape (matches business card horizontal; suits horizontal-strip digital viewer)
- Image area: 50% width × 100% height, left-anchored
- Image background: subtle gradient `#fafbfc → #ffffff` (very subtle warmth) for premium feel
- Word: Fredoka SemiBold 36pt, color #1a2332 — top-right of text column
- Primary sentence: Lexend Deca Regular 22pt, color #2d3748
- Optional extension sentence: Lexend Deca Regular 16pt, color #4a5568 — italicized
- Footer: "LessonCraftStudio · cat-en" right-aligned, Lexend Deca 9pt #94a3b8

**Print at A4 6-per-page:** 2 columns × 3 rows; each card ~95×95mm — landscape doesn't quite work at 6-up (loses landscape benefit).
**Print at A4 9-per-page:** AWKWARD — landscape fights 9-up grid; only 3-up landscape works at 8.5×11; layout-incompatible at 9-up A4.
**Digital at desktop 1280px:** 4-card row × 2 deck rows; 3:2 ratio fills space efficiently.
**Digital at mobile 375px:** card rotates to portrait? Or accepts 250×167px scaled-down landscape; readability suffers at <320px.

**Stress-test (DE + FI):** Landscape gives more horizontal room for long words/sentences; "Luftkonditionering" fits comfortably at 22pt within 50%-width text column. Best cross-locale layout of the 4 candidates.

**Pros:**
- Best cross-locale text accommodation; long-word locales fit without size step-down.
- Sentence-frame prominence aligns with pedagogical "language production" goal.
- Future-extensible to bilingual mode (en sentence + es sentence stacked).

**Cons:**
- **Landscape orientation breaks 9-per-page A4 print layout** — major operational problem; 6-per-page or 4-per-page only.
- Mobile responsiveness compromised (landscape on portrait phone awkward).
- "Less flashcard-like" — diverges from market expectation; may surprise some users.

---

## Candidate Design 4: "Stack" — vertical text stack / image frame / clearest pedagogical hierarchy

**Layout philosophy:** strongest pedagogical hierarchy (image → word → sentence in clear top-to-bottom reading order); minimal decoration; high contrast; bias toward maximum readability.

```
+------------------------------+
|                              |
|     +-------------------+    |
|     |                   |    |
|     |       IMAGE       |    |  ← 55% card height; rounded square
|     |   (rounded sq.)   |    |
|     |                   |    |
|     +-------------------+    |
|                              |
|     ━━━━━━ Cat ━━━━━━        |  ← short rule above + below word; Fredoka 700 36pt
|                              |
|     I see a cat.             |  ← LD Medium 19pt; bolder than D1
|                              |
|     LessonCraftStudio        |  ← compact footer
+------------------------------+
```

**Specs:**
- Card aspect: 3:4 portrait
- Image area: 55% card height, rounded square 12px radius (softer than fully-square)
- Image frame: 1px #e1e4eb; subtle but present
- Word presentation: Fredoka Bold 36pt #1a2332, flanked by short 16px decorative rules `━━━━` (4-character ASCII em-dash equivalent), color #cbd2dc
- Sentence: Lexend Deca Medium (500 weight, slightly bolder than Regular) 19pt, color #2d3748 (darker than Designs 1+2)
- Spacing: increased vertical rhythm (16px between stack elements vs 8px in Designs 1+2)
- Footer: minimal, single-line, no divider; Lexend Deca 9pt #94a3b8

**Print at A4 6-per-page:** 3 columns × 2 rows; each card ~85×113mm.
**Print at A4 9-per-page:** 3 columns × 3 rows; each card ~63×85mm — image at 35×35mm risks too-small for K-3 reading distance.
**Digital at desktop 1280px:** 8-card row × 1 deck; aspect-preserved.
**Digital at mobile 375px:** single card, 100% viewport with 12px padding.

**Stress-test (DE + FI):** Decorative rules around word complicate sizing — when word is "Luftkonditionering" (18 chars), rules either clip or word breaks. Mitigation: rules suppress when word > 12 chars. Sentence at 19pt-medium has best legibility of the 4 candidates.

**Pros:**
- Strongest pedagogical hierarchy (image → word → sentence clearly demarcated).
- Highest sentence-legibility (medium weight + larger size + darker color).
- Decorative rules add subtle "premium" without adding theme-icon complexity.
- Bold word presentation memorable; matches K-3 anchored-vocabulary-acquisition pedagogy.

**Cons:**
- 9-per-page A4 print pushes image size below comfortable K-3 reading distance.
- Decorative rules need conditional suppression for long words (special-case logic).
- Tightest layout; less breathing room than Design 1.

---

## Cross-locale text-length pre-validation (longest-word audit)

For each candidate, longest-word stress test against 11-locale vocabulary. Sample: `air-conditioning` (en "Air Conditioning" 16 ch; sv "Luftkonditionering" 18 ch; de "Klimaanlage" 11 ch; fi "Ilmastointi" 11 ch; ).

| Candidate | A4 9-up word width budget | "Luftkonditionering" fits @32pt? | Mitigation |
|---|---|---|---|
| 1 Sky | ~50mm | NO (~78mm needed) | Step-down to 22pt |
| 2 Card | ~50mm | NO | Step-down + theme-icon may be dropped |
| 3 Bilingual | ~50mm word column | YES @ landscape; word at 36pt fits | Native fit |
| 4 Stack | ~50mm | NO; rules need to drop | Conditional rule suppression + step-down |

Designs 1, 2, 4 all need dynamic font-sizing rule (long-word → smaller font); Design 3 fits natively but has 9-up print incompatibility.

## CC-recommended canonical design

**Recommendation: Design 1 ("Sky") with three modifications absorbed from Designs 2 + 4:**

1. **Adopt Design 4's vertical rhythm** — increase spacing between word and sentence (from 8px to 16px vertical) to strengthen pedagogical hierarchy.
2. **Adopt Design 2's italic-quoted sentence frame** for the example sentence — visually scaffolds "this is an example, not a label."
3. **Add Design 4's dynamic font-sizing rule** for cross-locale long-word accommodation.

**Why Design 1 base + modifications, not Designs 2 / 3 / 4 standalone:**

- **Design 2 (Card)** — theme-icon decoration introduces substrate cost (per-theme glyph mapping); italic sentence loses some legibility for K-3 early readers. Borrow ITALIC sentence treatment without theme icons.
- **Design 3 (Bilingual)** — landscape breaks 9-per-page A4 print layout; mobile portrait awkward; strategic cost too high for v1.
- **Design 4 (Stack)** — decorative rules around word add conditional-logic complexity; image at 9-up A4 too small for K-3 reading.

**Design 1's clean composition + Design 2's italic sentence + Design 4's vertical rhythm = "Sky+"** balances pedagogical clarity, cross-locale resilience, print viability at 6-up AND 9-up A4, and digital responsiveness from 320px to 1920px.

**Final Sky+ specs:**

- Card aspect: 2:3 portrait
- Image: 60% height, centered, 12% horizontal padding, white background, no frame
- Word: Fredoka SemiBold 32pt #1a2332 (step-down to 26pt for 12+ chars; 22pt for 16+ chars)
- Vertical rhythm: 16px between word and sentence
- Sentence: Lexend Deca Italic 18pt #4a5568, leading + trailing curly quotes (`"`)
- Card border: 2px #e1e4eb, 8px corner radius
- Footer: "LessonCraftStudio" Lexend Deca 9pt #94a3b8, centered, with 4px top margin
- Print at 6-per-page: PRIMARY layout (3×2 grid; image ~96mm — comfortable K-3 reading)
- Print at 9-per-page: SECONDARY layout for take-home flashcard packs (3×3 grid; image ~64mm — adequate)
- Digital deck viewer: horizontal-scroll pattern per CLAUDE.md HOMEPAGE-SAVE-STATE.md ThemeStrip reuse; pure-CSS transform-based; touch-swipe + arrow-key + button navigation

**6-per-page = primary; 9-per-page secondary.** Adjudicator-forward decision per Pillar 4 spec §locked-design-parameters #2.

## Independent design-specialist review

Pillar 4 spec calls for design-specialist agent review. CC-adjudicator-forward note: no design-specialist subagent type registered in this environment. Adjudication: invoke Plan agent (software-architect-class agent with strong systems-thinking) for independent review focused on K-3 pedagogical register + cross-locale text-length resilience + professional polish bar + print/digital format viability.

### Plan-agent review (verbatim)

**Reviewer role:** independent design review (substituting for design-specialist subagent per CC adjudicator note).
**Verdict summary:** Sky+ is a defensible canonical recommendation, but **three issues are blocking-class** and must be addressed before Phase 2 generation commits the ~31,000-render budget. Six findings are informational.

#### 1. Pedagogical register (K-3, ages 3-7)

**Strengths.** Fredoka + Lexend Deca pairing is well-chosen — Lexend Deca is empirically validated for early-reader legibility (designed against the Lexend reading-research substrate). 32pt word + 18pt sentence ratio is appropriate for the lower bound of the age window. White image background respects PNG transparency and avoids competing with the asset.

**Blocking-class concern: italic sentence frame for early readers.** The exploration acknowledges this in Design 2's Cons but then absorbs italic into Sky+. This is internally inconsistent. Empirical reading research (Lexend research substrate, Bradley & Slowiaczek consensus) shows italic body text reduces fixation accuracy for emerging readers more than for fluent readers — exactly the opposite of what this audience can absorb. The "scaffolding cue" rationale is real but is better solved with **non-italic + curly-quote framing alone** ("This is an example") OR a thin tinted background panel behind the sentence. Recommend: drop italic; keep curly quotes; add 6% horizontal indent + a 1px left-rule in #cbd2dc to scaffold the example-vs-label distinction without legibility cost.

**Informational: sentence-frame complexity.** "I see a {word}." is appropriate for ages 5-7 but slightly above the receptive-language floor for age 3. Surface as an Arc 2 NSR-batch question, not a Phase 1 blocker.

#### 2. Cross-locale text-length resilience

**Blocking-class concern: dynamic font step-down is the wrong primary mitigation.** Stepping 32pt → 26pt → 22pt across locales means a German or Swedish card displays at a visibly different typographic weight than its English counterpart in the same deck. For a multilingual platform this is a **register inconsistency** — the Swedish-immersion teacher sees a "smaller" word than the English-immersion teacher, signalling (incorrectly) a tier difference. Three architectural alternatives, in preference order:

- **(a) Reserved word-band height, auto-fit width.** Fix the word-band at a constant vertical height (e.g., 18% card height); allow horizontal scaling within the band via CSS `font-size: clamp()` or print-side measure-and-fit. Word always occupies the same visual real estate; renders at consistent perceived weight.
- **(b) Two-line word break for compounds.** Swedish/German/Finnish compounds are linguistically segmentable (Luft-konditionering, Klima-anlage, ilmas-tointi). A soft-hyphen substrate at the morpheme boundary lets long words wrap to two lines at the same point size. Substrate cost is moderate (~200-400 entries need soft-hyphen markers across long-word locales) but pedagogically correct — Scandinavian/German early-reader textbooks use morpheme-segmented compounds.
- **(c) Per-locale-tier card aspect.** Long-word locales render at 5:7 aspect (slightly wider) vs 2:3 for short-word locales. Print pagination unaffected because card grid cells absorb the variance. This is the most invasive option and likely overkill.

Recommend (a) as primary with (b) as supplement for the ~30 worst-offending compounds. Step-down becomes a tertiary fallback, not the primary lever.

#### 3. Professional polish bar (vs Twinkl / TPT premium / ESL publishers)

**Sky+ is competitive but not distinctive at premium tier.** Twinkl's premium flashcards lean heavier on color-coded theme bands (e.g., animals get a green band, foods get an orange band) for at-a-glance deck navigation; TPT premium tends toward more decoration. Sky+ as specified reads closer to Montessori-aesthetic minimalism, which is a defensible market positioning but should be a **conscious** positioning choice, not a default.

**Informational recommendation:** add an optional 3-4mm theme-color top accent rule (single horizontal line at card top, color drawn from existing theme palette in the lesson-plan substrate). This is a 1-line CSS addition with zero per-asset substrate cost, provides deck-navigation affordance for teachers riffling a printed pack, and signals "premium curated" without crossing into decorated/cluttered territory.

#### 4. Print + digital format viability

**Print: 6-per-page primary is correct.** K-3 reading distance research (~2-3 feet for circle-time card display) supports ~85-95mm card width. 9-per-page secondary is appropriate for take-home packs as specified.

**Blocking-class concern: digital horizontal-scroll deck viewer is the wrong default for classroom use.** Teachers using flashcards in K-3 classrooms typically project a single card (interactive whiteboard / classroom display) and advance one card at a time, often with the class chorally responding. A horizontal-scroll strip optimizes for browse/preview, not for present/teach. Recommend: **single-card-focus modal as primary digital pattern** (one card fills the viewport at presentation aspect, large arrow-key/space-bar/click advance, ESC or back-button exits to deck overview); horizontal-scroll strip as secondary "deck overview" pattern. Mobile gets full-screen single card by default. This matches how teachers actually consume the artifact and is genuinely differentiated from Twinkl's PDF-download-only digital experience.

#### 5. Free-tier / paid-tier boundary

**Recommendation: identical visual treatment.** Free-tier flashcards should look **pixel-identical** to paid (no watermark, no "PREMIUM" tag on paid cards, no stripped feature on free). Tier signal lives in the package-list UI (lock icon on gated packages, "3 of 200 packages free" framing), not on the artifact itself. Rationale: a teacher who downloads a free-tier flashcard and uses it in class has handed a free sample to colleagues; visual differentiation at the artifact level reduces sample-quality and therefore conversion. Spec §6 already aligns with this; just confirming the read.

#### 6. Sky+ specific findings

**Preserve:** 2:3 aspect; 60% image height; Fredoka SemiBold word weight; Lexend Deca for sentence; muted gray footer; 8px corner radius; 6-per-page primary print decision; `Tässä on {word}.` Finnish frame.

**Reconsider:**
- Drop sentence italic (see §1).
- Replace dynamic font step-down with reserved-band auto-fit + soft-hyphen substrate (see §2).
- Add optional theme-color top accent rule (see §3).
- Restructure digital viewer to single-card-focus primary (see §4).
- Word color #1a2332 is fine but slightly cool; consider #1f2937 (Tailwind slate-800) for marginally warmer cast — informational only.

#### Blocking vs informational summary

**Blocking-class (must address before Phase 2):**
1. Italic sentence frame — drop italic, retain curly-quote framing.
2. Dynamic font step-down as primary cross-locale lever — replace with reserved-band auto-fit + soft-hyphen substrate.
3. Digital viewer pattern — restructure to single-card-focus primary; horizontal-scroll secondary.

**Informational (surface but not gating):**
4. Theme-color top accent rule for premium-tier polish.
5. Sentence-frame complexity floor for age-3 receptive language (Arc 2 NSR question).
6. Word color warmth tweak (#1a2332 → #1f2937).
7. Per-theme color band for deck navigation affordance.
8. Confirm spec §6 free/paid identical-treatment read.
9. Finnish `Tässä on` frame NSR review.

---

### CC synthesis post-review: Sky+v2 (revised canonical)

Plan-agent review surfaces 3 blocking-class items + 6 informational items. CC adjudicator-forward absorbs all 3 blocking-class items into a revised "Sky+v2" canonical. Informational items #4 and #6 absorbed (low-cost wins); #5 + #7 + #8 + #9 deferred per individual rationale below.

**Sky+v2 specs (DELTA from Sky+):**

1. **Sentence frame: drop italic; keep curly quotes; add 6% horizontal indent + 1px left-rule** in #cbd2dc.
   - Lexend Deca **Regular** (not Italic) 18pt #4a5568.
   - Curly opening + closing quotes still wrap the sentence.
   - 6% (4mm at A4 6-up card width) left indent + 1px left-rule scaffolds example-vs-label distinction without italic legibility cost.

2. **Cross-locale text-length: reserved word-band auto-fit (CSS `clamp` for digital; print-side measure-and-fit) + soft-hyphen substrate for ~30 worst-offending compounds.**
   - Word-band fixed at 18% card height; horizontal scales via clamp.
   - Default font: Fredoka SemiBold 32pt; for words exceeding band width, auto-fit to band — preserves visual register across locales.
   - Soft-hyphen substrate for top-30 long compounds (Luft-konditionering / Klima-anlage / ilmas-tointi etc.). Authoring cost: ~30 entries × ~3-4 long-word locales = ~90-120 manual soft-hyphen marks. Can be authored at Phase 2 alongside pipeline implementation; not blocking for Phase 3 validation batch (validation batch can use auto-fit alone for the long-word-stress-case images).

3. **Digital viewer: single-card-focus modal as primary; horizontal-scroll strip as secondary deck-overview pattern.**
   - Single-card mode fills viewport at presentation aspect.
   - Keyboard (arrow / space / ESC) + touch (swipe / tap) + button navigation.
   - "Deck overview" surface (horizontal-scroll strip) for browse-before-present.
   - Mobile defaults to full-screen single card.

4. **Add 3-4mm theme-color top accent rule** (informational #4 absorbed) — color drawn from existing topics-taxonomy.json axis-key palette. Single horizontal line; zero per-asset substrate cost; deck-navigation affordance for printed packs.

5. **Word color warmth tweak: #1a2332 → #1f2937** (informational #6 absorbed) — Tailwind slate-800; marginally warmer; aligns with Fredoka's warmth.

**Informational items deferred:**
- **#5 Sentence-frame age-3 floor** — defer to Arc 2 NSR-batch question. Phase 2 ships "I see a {word}." per spec; if NSR review surfaces simpler-frame need, Arc 2 substrate-extends.
- **#7 Per-theme color band for deck navigation** — overlaps with informational #4 absorbed item; same architectural choice serves both purposes. Already absorbed.
- **#8 Confirm spec §6 free/paid identical-treatment** — operator confirmation at Phase 1 ratification. Default: pixel-identical treatment as Plan agent recommends.
- **#9 Finnish frame NSR** — already flagged in primary exploration; no new action.

---

## Operator ratification surface

Phase 1 close requires operator ratification on:

1. **Image inventory findings** — 2,838 vocabulary-applicable images; 287 decorative excluded; 72 cross-reference mismatches recoverable via pipeline-side alias table; ≤2 cosmetic filename renames recommended (operator-coordination, non-blocking).

2. **Selected canonical design — Sky+v2** (post-Plan-agent-review revision absorbing 3 blocking-class findings + 2 low-cost informational items). Final specs:
   - 2:3 portrait aspect; 60% height image; white background; 8px corner radius; 2px #e1e4eb border.
   - Word: Fredoka SemiBold 32pt #1f2937 (warmer than original #1a2332).
   - Reserved word-band at 18% card height with auto-fit horizontal scaling for cross-locale resilience (no font step-down).
   - Soft-hyphen substrate for ~30 worst-offending compounds; authored alongside Phase 2.
   - Sentence: Lexend Deca **Regular** (not italic) 18pt #4a5568, curly-quoted, 6% left indent + 1px #cbd2dc left-rule scaffolding.
   - 3-4mm theme-color top accent rule sourced from topics-taxonomy.json axis-key palette.
   - Footer: "LessonCraftStudio" Lexend Deca 9pt #94a3b8 centered.

3. **6-per-page primary print layout / 9-per-page secondary** — adjudicator-forward call. Plan-agent confirmed appropriate for K-3 reading distance.

4. **Sentence-frame approach Option α** — static template per locale; per-locale frame spec defined above; Finnish K-3-simplified frame "Tässä on {word}." NSR-flagged.

5. **Digital viewer architecture: single-card-focus modal primary; horizontal-scroll strip secondary deck-overview** (post-Plan-agent-review revision; replaces original horizontal-scroll-as-primary).

6. **Free-tier / paid-tier visual treatment: pixel-identical** (Plan-agent recommendation; aligns with spec §6). Tier signal lives in package-list UI (lock icon + "3 of 200 packages free" framing), NOT on the flashcard artifact itself.

7. **Phase 3 validation batch plan** — ~50-60 flashcards × 5-6 locales (en + es + fi + de + it + nl) sampled across 7-10 themes.

Operator may:
- **Ratify** as-is → Phase 2 commences.
- **Amend** with specific revisions → CC re-authors design exploration with revisions.
- **Request additional candidates** → CC produces 1-2 more candidates within stated layout philosophies.
- **Override canonical** to original Sky+ (pre-Plan-agent-review) or one of the 4 base candidates as authored.
