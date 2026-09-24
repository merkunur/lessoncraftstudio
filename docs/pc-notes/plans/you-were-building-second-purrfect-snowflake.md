# sv #35 — `ziggy-odd-one-out.category.l-1-5-a` — Swedish odd-one-out

*(Replaces the completed sv #34 plan; #34 shipped as `d7bb67af`.)*

**Native panel convened, still out. Everything below is measured or opened, not assumed.**

## Context

The Swedish second-batch fan-out is the live "continue" loop: rebuild each EN second-batch
lcs-shell activity for **Lgr22 rather than translating it**, one per plan-mode session, build
**locally**, **commit + push, NO deploy**. sv #1–#34 shipped; sv prose 94 → **95**.

**The activity.** Four PICTURES, each with its word printed underneath and spoken on tap. Three
belong to one category and one does not; the child taps the outsider. `/sv/` **404s today** — no `sv`
key in the slug map, no `sv` pool (7 locales live: en, de, fr, es, pt, it, nl).

**Source:** de `62b123ce` — *Ziggys Was-passt-nicht*, with a `Wortschatz untersuchen` strand override.

**Core** `mini tools/odd-one-out-core.js` — ⭐ **locale-neutral**: a round stores
`{id, band, items:[{noun, themeDir, category, label}×4]}` and the answer is DERIVED as the item whose
category is the **minority-of-one**. `category` is never exposed to `childView`. Invariants: 4 items ·
exactly a 3–1 split · nouns distinct · bands `[1,1,1,2,2,2,3,3]`.

⭐ **`noun` + `themeDir` are ENGLISH image FILENAMES; `label` is the word actually rendered.** All 25
deck nouns are keys in `REFERENCE TRANSLATIONS/image-vocabulary.js` with authoritative Swedish
(`dog→Hund`, `robin→Rödhake`, `leaf→Löv`, `grapes→Druvor`), so §20.5 is satisfied by lookup, not
authoring. All 22 distinct images resolve under
`frontend/public/image-library-webp/themes/<themeDir>/<noun>@2x.webp`.

---

## ⭐⭐⭐ A LIVE CONTENT DEFECT, FOUND BY OPENING A PICTURE

`r-plants` groups **rose · leaf · tree** as the three plants against a car. Its tree is
`christmas/tree`, and I opened it: **a fully decorated Christmas tree** — star, baubles, snow, and a
wrapped present at its base.

⚠⚠ **Among a rose and a leaf, that picture is the visual outlier of the three.** A child looking for
"the one that doesn't belong" has an entirely reasonable case for tapping it, and the engine marks
them wrong. The same image is also the odd item in `r-vehicles`, where it is harmless — so the deck
shows **two different pictures under one word** if only one is swapped.

⭐ **The fix is one item and needs no translation at all.** `tree/oak@2x.webp` is a plain generic
broadleaf (opened; it is not a recognisable oak, matching the note recorded at sv #27). Point both
rounds at `themeDir:"tree", noun:"oak"` and add an explicit `label:"tree"` to the EN items — the six
localized pools already carry `Baum / arbre / árbol / árvore / albero / boom`, and the renderer reads
`items[id].label || noun`, so **no locale needs a new string**. Live in 7 locales; fix it here.

⚠ This is the sv #27 lesson exactly: *two image files were not what their names said, and only opening
the picture settled it.* The discipline earned its keep on the first file I opened.

## ⚠⚠ FIFTH CONSECUTIVE ENGINE WITH THE SAME THREE VERIFICATION HOLES

1. **`verify-odd-one-out-core.js:33` reads `manifest[0].params.rounds`** — the English pool only.
2. **`local-test-ziggy-odd-one-out.js:48` hardcodes `?lang=en`.**
3. **No `scripts/visual-qa-phases/` driver** — only the OPENING frame has ever been photographed.

⭐ **And here the en-only gate hides something new: the length bots measure the wrong string.**
`deckFacts` reads `it.noun` — the English *filename* — not the rendered `label`. The tell is that it
reports **identical 12.5% / 25.0% for all seven locales**; the real per-locale numbers differ
(de 0/0, es 25/12.5, it 25/12.5, nl 0/25). Nothing is broken today, but the instrument is reporting a
constant, which means it is not measuring the locale at all.

⚠ **`positionBot` is an artefact for the third engine running** — `:64`
`this._cards = shuffle(this.view.items.slice())` discards the stored order before a tile is drawn.

⭐ **A cue the gate does not have, and this deck's real one: the THEME FOLDER.** "Tap the picture that
came from a different set" scores **37.5%** against a 25% chance floor — the three members are often
all from one `themeDir` while the outsider is not. It belongs in the gate.

## ⚠ SEVENTH ENGINE WITH THE CORAL-SELECTION DEFECT

`:130` `.zoo-opt.zoo-sel{border-color:` **`C.CORAL`** = `#F2784B`, byte-identical to `--lcs-accent`,
the shell's `.tryagain` ink — and `zoo-tried` / `zoo-right` appear **0 times**, so there is no
post-Check marking at all. Same as #28, #31, #32, #33, #34.

## Established by measurement

- **`win`** is defined in all 7 locales and referenced nowhere — the **37th** of 133.
- **`instruction`** is not defined at all, so the `role="application"` label ends with the literal word
  "instruction" (`lcs-shell.js:449` reads it, `:82` returns the key). One of the 34 outstanding.
- ⚠ **NO grade override exists in any locale** — unlike the last two builds, all six siblings display
  the native CCSS grade 1. The three shipped Swedish vocabulary decks are all åk 2.
- **The strand row already overrides six locales** (`Wortschatz untersuchen` / `Le lexique` /
  `Ampliación del vocabulario` / `Ampliação do vocabulário` / `Lessico` / `Woordenschat`), with no
  `sv`. The Swedish value is settled by two shipped precedents: **«Ord och begrepp»**.
- `fixedGuessBot` 0.13 and `positionBot` 0.38 are identical in all seven pools — the items are shared
  and only labels differ.

## ⚠⚠ THE TWO QUESTIONS THAT DECIDE THE BUILD — with the panel

1. **IS IT A DUPLICATE?** Swedish already ships `olive-kind-of.category-attribute.l-1-5-b` —
   «överbegrepp-vilken-sorts-sak-ak-2», åk 2, *name the superordinate*. This is L.1.5.a, the sorting
   clause. Is "spot the non-member" a different demand from "name the category", or the same lesson
   twice? **I asked the pedagogue to say so if it is a duplicate.**
2. ⭐⭐ **WHAT MAKES A SWEDISH BUILD A REBUILD RATHER THAN A TRANSLATION?** The pictures are
   language-neutral and only `label` changes, so the laziest possible build is the English deck with
   Swedish words — precisely what the standing rule forbids. My hypothesis, put to both panels:
   **category boundaries are language-specific.** The precedent is from sv #27 — a canoe is not a
   `fordon` in Swedish (the traffic ordinance defines one by *hjul, band eller **medar***) but a
   **kälke** is. Also open: `frukt`/`grönsak`/`bär` (is a tomat a grönsak in Swedish school usage?),
   whether `fisk`/`fågel`/`insekt` count as `djur` for a Swedish child, `möbler`/`redskap`/`bestick`,
   and whether `mössa`/`vante` are `kläder` or `tillbehör`.

**Also open:** the eight rounds with bands; ⚠⚠ the requirement that **the outsider be indefensible**
(the engine allows one right answer, and sv #27 shipped 15 rounds that were correct only because a
competing category was never on screen); the sv grade; all strings and the slug.

⚠ **«grupp» is BANNED in Swedish copy here** — it is the counting word in at least five shipped
Swedish maths decks. Any "which three go together" phrasing must use «hör ihop» / «passar ihop».

## Scope (fixed)

Activity layer only; **0 lines** to `odd-one-out-core.js` and `lcs-shell.*`. Never edit the gitignored
`frontend/public/mini-tools/` mirror. Never `git add .` — stage explicitly. **Commit + push, NO deploy.**

**Files:** `mini tools/ziggy-odd-one-out-activities.json` (sv pool + slug + page copy + the
`christmas/tree` → `tree/oak` repair) · `mini tools/ziggy-odd-one-out-activity.js` (sv strings, NEW
`instruction`, delete `win`, state inks) · `mini tools/ziggy-odd-one-out-activity.html` (`?v=7→8`) ·
`frontend/messages/activity-content/sv.json` (prose 94→95) ·
`frontend/app/[locale]/activities/[slug]/page.tsx` (`sv: 'Ord och begrepp'` strand, grade per the
panel, `ACTIVITY_WRAPPER_VERSION` 9.721→9.722) · plus the three verification retrofits.

## Verification — §A.13.62, all local, no deploy

1. **Widen `verify-odd-one-out-core.js` to all 8 pools**, measure length bots on the **rendered
   `label`** rather than the English filename, and add the **themeDir cue** as a first-class measured
   ratchet. Baselines from `--measure`, never estimated. ⚠ Drop the `positionBot` assertion with the
   reason in the file. ⚠ Freeze WHICH locales may carry a ratchet row — sv #34 proved a max-over-family
   ratchet is launderable by simply adding a row.
   ⭐ NEW, specific to a picture deck: assert **every referenced image file exists** on disk, and that
   no `themeDir` is a B&W theme (§20.5 — the marker is localized, `SV`/`BW`/`SW`…, so match per
   locale rather than on the literal string "bw").
2. **`local-test-ziggy-odd-one-out.js` → en + sv, every round of both pools**; `force()`/`tap()` THROW;
   assert the RENDERED tile order varies; tighten the leak assertion to *the CORRECT tile is never
   marked*; assert each tile renders a non-empty word AND a loaded image (`naturalWidth > 0` — an
   `onerror` handler currently hides a broken image silently); tap floor ≥44px at 280px.
3. **NEW `scripts/visual-qa-phases/ziggy-odd-one-out.category.l-1-5-a.js`** — picked / missed /
   resolved, with the 1800 ms `.tryagain` freeze, the target DERIVED rather than read off the core, and
   a deliberately WRONG tile tapped for `picked`.
4. **Poison every assertion in both directions, with a control.**
5. `preflight-activity-routes` · `verify-activity-content-sv` (95) · `verify-activity-serp-copy` ·
   `verify-activity-prose-claims` · `audit-activity-variety` · `tsc --noEmit` (expect exactly the 7
   baseline blog-test errors) · `visual-qa-activity` sweep 320·360·412·768·1024·1366 × 8 rounds × every
   phase, sv **and** en · **I read the sv 360/768/1024 renders myself** — and, this being a picture
   deck, **I open every image the Swedish pool uses** before trusting its category.
6. `git diff --name-only` proves **0 lines** to `odd-one-out-core.js` and `lcs-shell.*`.
