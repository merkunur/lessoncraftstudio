# #123 — Vera's Verb Match → THE VERB GATES (L.1.1.c; all 11 locales)

ORDER row 123 · id `vera-verb-match.be-agreement.l-1-1-c` (kept). Design: `designs/123-vera-verb-match.md`.

## Files and wiring
- **Files (new):**
  - `mini tools/verb-gates-core.js` (`VerbGatesCore`) holds the model:
    - every locale's levels of nine rounds (five; sv/da/no three): the sentence with its gap, the house sign (the subject), the crowd (the star = I, pictures), the gates and the right one;
    - the walk (what each gate does with this crowd), Check and its reasons, the hints, the glow from miss 2, the article clue (sv/da/no) at miss 1, the success line's case;
    - the plan: a fresh order per pass, never three rounds in a row with the same right gate, never the same subject twice in a row.
    - DATA is written by a build script that checks every picture with its exact case.
  - `verb-gates-activity.js` draws the sentence strip with its gap, the path (the subject's house with its sign, the gateway in the hedge, the garden with its flower bed), the rack of gates (a brass turnstile, a turnstile with a flag, a wooden double gate, a round star door — each with its word), Check; the walk glides the crowd from the house into the garden (CSS prefix `vg-`, `apparatusClasses: ['vg-art']`).
  - `verb-gates-activity.html` loads core `?v=1` and activity `?v=1`.
  - The old `vera-verb-match-activity.{js,html}` and `be-agreement-core.js` stay on disk, unreferenced by this row.
- **Manifest:** the row stays in `vera-verb-match-activities.json`.
  - `tool` is repointed to `verb-gates-activity`.
  - `params` = `{level: [1…5], show: [hide, show], rounds: {1…5: 9}}`; the old rounds are retired (in git).
  - en, de, fr, es, pt, it, nl and sv slug, title and intro are frozen.
  - **da, no and fi slug, title and intro are authored new** (the no intro's turnstile renamed *dreiekors* after the review).
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.868.
- **Prose:** en, de, fr, es, pt, it, nl and sv replaced; da, no and fi added. Every quoted sentence is a finished sentence of that locale's rounds (gate-checked).
- **Strings:** 40 keys × 11. The shell titles of fr/es/pt/it now name agreement, not one verb (*Vera et l’accord du verbe*), since levels 4–5 go beyond *être/estar/stare*.
- **Visual-QA driver:** `scripts/visual-qa-phases/vera-verb-match.be-agreement.l-1-1-c.js` replaced (it drove the retired activity): picked (nothing graded before Check) · missed (the walk and the hint) · resolved (everyone in the garden; Next 0.5 s later).
- **Sources** (scratchpad): `vg-src.js` (every locale's rounds) → `vg-build.js` (pictures, DATA); `vg-strings.json` → `vg-apply.js`; `vg-prose.js`, `vg-manifest.js`, `vg-dump.js` (the review dump), `vg-rev.js` (the review's fixes), `vg-probe.js`.

## The invention
**Every verb is a gate in the hedge.** IS is a turnstile that lets exactly one through and locks — a crowd is left sitting behind it; ARE is a double gate that only opens when two or more push — one alone waits in front of it; AM is a star door that spins only for the star, which means *me*. Only the right gate brings the whole crowd into the garden. In sv/da/no, where the verb does not agree, the gates are the predicate adjective: the plain turnstile (*stor*), a turnstile with a flag that turns only for an ett/et-word (*stort*), the double gate (*stora / store*).

## The levels (per locale)
- **en / de / nl:** 1 *am · is · are* with I, things and animals · 2 pronouns and names, with *we* · 3 *was · were* (the star walks through the turnstile) · 4 *has/have, goes/go, does/do* · 5 any verb (*runs / run*).
- **fr / it / fi:** as above, without *we*; level 3 keeps a star door (*étais*, *stavo*, *olin* differ from the third person).
- **es / pt:** as above (*estar*), without *we*; level 3 *estaba/estaban*, *estava/estavam* (the star walks through the turnstile).
- **sv / da / no:** 1 nouns (en-word, ett/et-word, plural) · 2 pronouns and names, with *jag / jeg* and *vi* · 3 the same with *var*. Levels 4–5 are not offered: there is no verb agreement to teach.

## Deviations from the design (each measured or ruled)
- **No *we* in fr/es/pt/it/fi:** *nous sommes, estamos, stiamo, olemme* differ from the third-person plural, so the double gate would carry the wrong word. The design's *we* rounds stay only where *we* and *they* share the verb.
- **The star door in the past only where the I-form differs** (fr *étais*, it *stavo*, fi *olin*); elsewhere the star passes the turnstile, as the design says for en.
- **No ducks:** every duck in the library is a yellow duckling; the duck rounds use pigs and rabbits.
- **Tap, then tap** (a gate onto the gateway; tap it there to take it down) instead of a drag.
- **The garden shows the arrivals and a flower bed** (one flower per solved round); the predicate words are not repeated on a garden sign — the strip shows the whole sentence.
- **On phones the path runs down** (house, gateway across the hedge, garden), and a solved round's rack and Check give their room to the shell's Next.
- **Levels:** each gate is right 2–5 times of 9 per level (the design's level 2 had *am* once).

## Pictures
Checked by eye on the contact sheet: pets dog, cat, rabbit; spring bird, bee, grass, flower (red), nest (two chicks); camping frog, bear (red-orange), cabin (a *small* house); toys girl, ball (a football); occupations farmer; farm animals pig, cow, horse; At the Supermarket raspberry (the folder's capital letters checked).

## Review
ONE native + Grade-1 grammar reviewer over all 11 locales (every finished sentence and rack, the crowds, the clues, the strings, the prose, the new metadata). No round has two right answers.
- **MUST, applied:**
  - **sv / da / no:** the cabin is a SMALL house, so *Huset är stort* contradicted the picture → *Huset är fint* (fin / fint / fina; da/no fin / fint / fine), also *Det är fint*, and in the prose and practices.
  - **es:** the success lines lacked the opening ¡ → *…así que ¡ESTÁN!*.
- **SHOULD, applied:**
  - en: *The cat is fast asleep* → *The cat is on the bed* (a Grade 1 reader takes "fast" as quick).
  - fr: *les chats étaient affamés* → *dans la cuisine*; *râtelier* → *support*.
  - it: *stare* of place reads regional → *Io sto bene*, *Il cane sta fermo / I cani stanno fermi*, *Mia sta bene*, *Lei sta seduta*, *Ieri io stavo dalla nonna*.
  - fr / es / pt / it shell titles name agreement, not one verb.
  - pt: the prose quotes take “ ”.
  - de / nl / sv / da / no: the star-door hint puts *ich / ik / jag / jeg* in quotes.
  - sv: *Det är varmt* (the nest) read as weather → *Det är litet* (liten / litet / små).
  - no: LK20 element *språket som system og mulighet*; *dreiekors* for the turnstile.
  - fi: *Kani tekee kuopan*; the gate label *aukeaa kahdelle tai useammalle*; the practices line.
- **Kept, with reason:** the shell title *Vera's Verb Match* (frozen); es-MX *Comprobar*.
- **Open (frozen metadata, not edited):** the de / fr / es / pt / it / nl / sv titles and intros name grade 2 (Klasse 2, CE1, 2.º, 2º ano, classe seconda, groep 4, åk 2) for a grade-1 standard; the en intro speaks of tapping am, is or are; the it and sv intros describe the retired activity (a vole / *Tuva*).

## Gates
- **`verify-verb-gates-core.js`:** 16,381 checks, 0 fail. It carries its own tables: every subject classified (I / we / one / many, and the sv/da/no gender); each locale's forms of *be*; its verb pairs; the adjective inflection as rules (with *liten*). Every right gate and every gate word is DERIVED. It covers:
  - every picture (exact case, colour theme), the crowd = the subject;
  - the walk for every round and gate (only the right gate lets all through), Check's reasons (derived), the hints, the glow, the clue, hang / take, the success line;
  - the mix per level; the plan (300 orders per level: fresh, no three alike, no subject twice); the bots (always the turnstile ≤ 5/9; en levels 4–5 the s-bot ≤ 1/9);
  - strings ×11 (no digit in a hint, never "free", French spacing), the prose quotes, the manifest.
- **`mutate-verb-gates.js`:** 22 of 22 mutations killed (the turnstile letting a crowd through, the double gate opening for one, the star door for a picture, the t-turnstile for an en-word, wrong data in en/de/sv/fr, *nous* on the plural gate, *I* in level 4, a B&W picture, the glow from miss 1, an empty Check as a miss…), and the control survived.
- **`local-test-verb-gates.js`:** real pointer, 11 locales, 320–1366.
  - The scenarios: the settings (sv/da/no three levels); at rest the crowd inside the house; an empty Check (no miss); a crowd at the turnstile (one through, the rest sitting, the hint), miss 2 (the right gate glows), the hung gate tapped down; the double gate (everyone in the garden, the success line, a flower); one alone at the double gate (waiting, the hint); the star at the wrong gate and a crowd at the star door; sv/da/no an en-word at the t-turnstile (the gender hint and the article clue); the house tapped (they walk out with no miss, and back); "show who is coming".
  - Then every round of every level at rest / miss 2 / solved, resized through 320–1366: no sideways scroll, Check above the fold, the hint and the success line in view, controls ≥ 44, pictures ≥ 64 (≥ 96 wide), the crowd inside the path, everything inside the card, no text cut off.
  - **48,727 pass, 0 fail.** Its first runs found: sitting pictures shrunk below the size floor; Check 4 px below the fold at 320 when the sentence wraps; a crowd of four plus the house too wide for the path at 320.
- **`visual-qa-activity`:** PASSED, 216 renders (9 rounds × 4 phases × 6 widths). **`audit-activity-hierarchy`:** 380 / 0. **`audit-settings-efficacy`:** "level" and "show" both change the board. **`audit-activity-next-delay`:** pass (Next 0.5 s after the result).
- **Preview:** a seed in `generate-activity-previews.js` opens "The dogs are in the yard" with the double gate hung and all three dogs in the garden.
- **Renders read** at 320, 360, 704, 768 and 1024 (en, sv). They found: the house a bare brown stub (now drawn); the hedge two stubs on wide screens (now a full-height band); a space before the full stop after the gap word; sitting pictures shrunk below the size floor (they now sink and grey instead); the solved state on phones pushing Next below the fold.
- **Content:** `verify-activity-content-<loc>` ×11, `verify-activity-prose-claims`, `verify-activity-serp-copy`, `audit-activity-content-tells` and `preflight-activity-routes` all pass.

## Live
`live-verify-verb-gates.js` on production, 2026-10-26: **52 pass, 0 fail.** All 11 pages return 200; en, de, sv and fi at 1366 and 390 embed verb-gates-activity.html at wrapper 9.868; with a real pointer, the turnstile lets one through and leaves the rest sitting with its hint, and the double gate brings everyone into the garden with the success line; the iframe grows with the card. The first run fell inside the Cloudflare window (the old iframe was still cached); the rerun was clean.
