# Audit — German (de) — ROUND 2

VERDICT: CLEAN

No ERROR or MINOR findings remain. All round-1 fixes verified as landed; the new content introduced in round 2 was audited and is grammatical.

## Round-1 fixes verified

1. **E1 fixed** — custom-elephant now prints the weak-noun dative singular in all 7 frames: `in/auf/unter/neben/hinter/über/vor einem Elefanten` (lines 423–452); between-line `zwischen zwei Elefanten` still correct.
2. **M1 fixed** — heart now uses the standard dative throughout: `einem Herzen` in all singular frames (lines 159–188), consistent with `zwischen zwei Herzen`.
3. **M2 fixed** — prepositions deck title is now `"Präpositionsübung"` (line 628).

## New round-2 content audited

4. **Adjective+noun landmark (custom-boiled-egg, lines 456–486) — correct.** `einem gekochten Ei` is the right mixed-declension dative neuter singular; `zwischen zwei gekochten Eiern` is the right strong-declension dative plural (adjective -en, noun +n). All 8 frames well-formed.
5. **above↔on-top-of distractor exclusion — verified.** Every `above` frame now offers `über / in / unter` (no `auf`); every `on top of` frame offers `auf / in / unter` (no `über`). No remaining synonym ambiguity; all distractors are still grammatical in their frames (all dative-governing Wechselpräpositionen).

## OK-NOTE (no change needed)

- **New Find-and-Count row `[it-s-impura-masc] … alle Strauße` (lines 26–29):** `Strauße` is the correct plural **if the pictured noun is the bird (der Strauß, ostrich → Strauße)**. The homonym *der Strauß* = bouquet pluralizes with umlaut (*Sträuße*). If the image is a flower bouquet, this line would be wrong — worth a one-second visual confirm against the vocab entry; grammatically the printed form is fine for the ostrich reading.
- Find-and-Count instruction lines still carry no terminal punctuation (`Kreise alle Katzen ein`) — consistent across all templates/locales, presumably by design; observation only, carried over from round 1.
- Everything re-checked and unregressed: separable prefixes (`Kreise … ein`, `Streiche … durch`) correct incl. triple lists; dative after all Wechselpräpositionen correct in every frame; all `zwischen zwei …` dative plurals correct (Kreisen, Würfeln, Zylindern, Herzen, Sechsecken, Quadraten, Sternen, Dreiecken, Katzen, Tulpen, Elefanten, gekochten Eiern); `in einem Stern` (indefinite) remains acceptable within the locked design; static strings (blInstructions, defaultInstruction, headers, SR templates, STRINGS_ALL, vocab-filter warning) unchanged for de and clean.
