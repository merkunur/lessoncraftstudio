# #124 — The Borrowed Hat → THE PRONOUN PRISM (L.1.1.d; all 11 locales)

ORDER row 124 · id `pronoun.case.l-1-1-d` (kept). Design: `designs/124-pronoun.md`.

## Files and wiring
- **Files (new):**
  - `mini tools/pronoun-prism-core.js` (`PronounPrismCore`) holds the model:
    - every locale's levels of nine rounds (six; de, it and nl five): prism rounds (the referent, the sentence with its gap, verb and thing marked, the person, the job, the tray of three prisms and each prism's three faces as they read in that gap), thread rounds, sort rounds;
    - placing, taking out and turning a prism; tying a name; picking and dropping a card; Check and its reasons (count / who / cover / the job; rings / who; sort); the hints, the glow from miss 2; the success line's case;
    - the plan: a fresh order per pass; in prism levels never three rounds in a row with the same job, never the same person and face twice in a row.
    - DATA is written by a build script.
  - `pronoun-prism-activity.js` draws the shop window (a paper hat per solved round), the referent block (a name, two names, the star for I) with its thread to the gap, the sentence strip (the verb underlined, the thing dotted), the gap with the placed prism and its round turn button, the tray of wooden prisms (up face large with its mark — bow, target, knot — and the two side faces small), the action arrow or owner string under the strip at Check, the thread sentences, the sort bins (CSS prefix `vp-`, `apparatusClasses: ['vp-art']`).
  - `pronoun-prism-activity.html` loads core `?v=1` and activity `?v=1`.
  - The old `pronoun-activity.js` and `pronoun-core.js` stay on disk, unreferenced by this row.
- **Manifest:** the row stays in `pronoun-activities.json`; `tool` → `pronoun-prism-activity`; `params` = `{level: [1…6], marks: [show, words], rounds: {1…6: 9}}`; en, de, fr, es, pt, it, nl, sv slug, title and intro frozen; **da, no, fi authored new**.
- **Route:** `ACTIVITY_WRAPPER_VERSION` 9.869.
- **Prose:** en–sv replaced; da, no, fi added. Every quoted sentence is a finished prism sentence of that locale (gate-checked).
- **Strings:** 51 keys × 11. The shell titles are kept (sv *Sigges koja* → *Hatties hattbutik*, so the title matches the hat shop); da *Hatties hattebutik*, no *Hatties hattebutikk*, fi *Hattien hattukauppa* new.
- **Visual-QA driver:** `scripts/visual-qa-phases/pronoun.case.l-1-1-d.js` replaced (it drove the retired activity): picked (nothing graded before Check) · missed (the arrow drops, the block pings, the hint) · resolved (the arrow lands; Next 0.5 s later).
- **Sources** (scratchpad): `vp-src.js` → `vp-build.js`; `vp-strings.json` → `vp-apply.js`; `vp-prose.js`, `vp-manifest.js`, `vp-dump.js`, `vp-rev.js`, `vp-probe.js`.

## The invention
**Each person is one wooden prism with three faces** — the doer (a bow), the done-to (a target), the owner (a knot) — and the sentence's own action arrow decides which face must be up: at Check the arrow flies out of a doer face, lands in a done-to face, and only a knot face holds the owner string from the thing. A referent block names who the gap stands for, so exactly one prism with one face fits.

## The levels
1. He / she / they, one referent each (de, nl: the she- and they-prisms never share a tray where they read the same; es, pt: no third-person owner rounds — *su* is everyone's; pt uses *dele / dela / deles* after the noun; fr, it: owner rounds decide one vs many, *son* / *leur*, *suo* / *loro*).
2. I / we with the compound trap (*Sam and I built*, *Mom called Sam and me*) — fr has no compound rounds (*Tom et moi*, never *je*).
3. Swap the name: the sentence with the name shown above, the name marked.
4. Who is it? Tie the printed pronoun to its name(s).
5. Sort the names into he / she / they (de, nl: the bins carry a verb — *sie spielt / sie spielen*; fi: *hän / he*).
6. Owner words on their own (en *mine, hers, theirs*; fr *à lui, à elle, à eux*; es *de él, de ella, de ellos, mía*; pt *dele, dela, deles*; sv/da/no *hans, hennes/hendes, deras/deres*; fi *hänen, heidän*). Not in de, it, nl (no honest stand-alone form for grade 1).

## Deviations from the design (each measured or ruled)
- **Tap, then turn** (tap a prism into the gap; a round button turns it there; arrow keys too) instead of a flick and a drag; side faces stay readable on every prism.
- **The arrow and the owner string arc under the sentence**, the referent thread comes from above — they never cross.
- **A face of the right prism that reads the right word also passes** (en *her / her*, de *sie / sie*, nl *haar / haar*, fr *nous / nous*, it *loro / loro*): a correct sentence is never marked wrong. The review asked for it.
- **Thread rings and sort bins are tapped, not dragged**; wrong cards come back to the shelf.
- **The shop window holds drawn paper hats**, one per solved round.
- **On phones a solved round's tray and Check give their room to the shell's Next.**

## Review
ONE native + Grade-1 grammar reviewer over all 11 locales (every round with its tray, the threads, the sorts, the strings, the prose, the new metadata).
- **MUST, applied:**
  - Two faces of one prism with the same word → the model passes the right prism on any face that reads the right word.
  - Owner rounds whose subject had the same gender as the referent read as "the subject's own" → en *Dad packed her bag*, de *Papa packt ihre Tasche*, fr *C'est son sac* and level 3 *Son sac est lourd*, it *Questa è la sua borsa* and *La sua borsa è rossa*, nl *Papa pakt haar tas* and *Opa pakt haar tas*, pt *O Davi arrumou / pegou a mochila dela*.
  - sv / no: a plural owner that is the subject needs *sina / sine* (no prism carries it) → *Mamma hittade deras mössor*, *Mamma fant deres luer*.
  - fi level 4: the success line printed inflected names (*Leolle*) → base forms (*Leo*).
- **SHOULD, applied:** de *zur Hütte* (a *Bau* is a burrow), *Pia sieht ihn im Park*, *winkte Leo zu*; it *Papà mi chiama*, *dà loro una merenda*; nl *Pim zag hem*; sv title *Hatties hattbutik*, prose *händer något med*; da *ejersiden*; no *Hvem eier det?*; es / pt / fi wording of hints and prose; en prose names what is practised (personal and possessive, not indefinite).
- **Found by my own gate, not the review:** nl *ons nieuwe hoed / ons fiets* on the we-prism → *onze* (de-words).
- **Kept, with reason:** the frozen page title *The Borrowed Hat* and the hat-shop frame (the prism instrument lives in the shop); es-MX *Comprobar*.
- **Open (frozen metadata, not edited):** the de / fr / es / pt / it / nl / sv titles and intros name grade 2 or 3 (Klasse 3, CE2, 3.º, 3º ano, classe terza, groep 4, åk 2) for a grade-1 standard and describe the retired chip quiz; the sv title and intro are about *min / mitt / mina* only.

## Gates
- **`verify-pronoun-prism-core.js`:** 24,898 checks, 0 fail, with its own tables: every name's gender and the plural nouns (the referent DERIVES the person); the job DERIVED from the sentence (thing → owner; gap after the verb → done-to; before → doer, except clitic objects in fr/es/it/pt); each locale's pronoun forms and the owner word's agreement with the thing (de case + gender, fr/it/es/pt gender + number, sv/da/no en/ett/plural, nl de/het). It covers one right answer per tray (no other prism shows the right word), every prism's owner face agreeing, the model for every prism × face, threads (number, gender, never a name its own sentence names), sorting, balance, the plan, strings ×11, prose quotes, manifest.
- **`mutate-pronoun-prism.js`:** 22 of 22 killed, control survived. Its first run had two survivors — a mis-agreed distractor owner face (*sa ballon*) and a thread to the wrong boy — and both are now gated (the first found the real nl *ons/onze* defect).
- **`local-test-pronoun-prism.js`:** real pointer, 11 locales, 320–1366.
  - The scenarios: the settings (de/it/nl five levels); level 1 the referent block, an empty gap (no miss), the wrong person (its hint, the block pings, the arrow drops), miss 2 (the right prism glows with the wanted face mark), the right person on a wrong face (the job hint), the gap tapped (the prism comes out), the right face (the arrow lands, a hat); level 2 the compound trap (cover the other name; it lifts); level 3 the sentence with the name; level 4 a wrong name and the right names (one thread each); level 5 the wrong bins (the cards come back) and the right ones; level 6 the owner word on its own; "words only".
  - Then every round of every level at rest / miss 2 / solved, resized through 320–1366: no sideways scroll, Check above the fold, the hint and the success line in view, controls ≥ 44, words inside their prisms, everything inside the card, no text cut off.
  - **60,988 pass, 0 fail.** Its first runs found: long names cut off in the bins at 320 (they wrap now).
- **`visual-qa-activity`:** PASSED, 216 renders. **`audit-activity-hierarchy`:** 380 / 0. **`audit-settings-efficacy`:** "level" and "marks" both change the board. **`audit-activity-next-delay`:** pass.
- **Preview:** a seed in `generate-activity-previews.js` shows "Pat saw him at the park" solved, the arrow landing in *him*.
- **Renders read** at 360, 704, 768 and 1024. They found: the arrow hidden behind the strip (now above it, arcing under the words), the referent thread crossing the first line on phones (it now ends at the strip edge), the bins' long names cut off at 320 (they wrap), the solved state on phones pushing Next below the fold; on level 3 the referent thread crossing the sentence with the name (it now starts at the marked name), and the miss-2 face-mark badge floating over the middle prism (it now sits on the glowing prism's corner).
- **Content:** `verify-activity-content-<loc>` ×11, prose claims, SERP copy, content tells and route preflight all pass.

## Live
`live-verify-pronoun-prism.js` on production, 2026-10-26: **52 pass, 0 fail.** All 11 pages return 200; en, de, sv and fi at 1366 and 390 embed pronoun-prism-activity.html at wrapper 9.869; with a real pointer, a wrong prism gives its hint and the arrow drops, and the right prism turned to its target face lands the arrow with the success line; the iframe grows with the card. The first run fell inside the Cloudflare window (the old iframe was still cached for some pages); the rerun three minutes later was clean.
