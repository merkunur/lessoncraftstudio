# #79 — The Wobble Museum → THE ABOUT-STRINGS (W.K.2, all 11 locales)

ORDER row 79 · id `wobble-museum.catch-drift.w-k-2` (kept). Design: `designs/079-wobble-museum.md`.

## Files and wiring
- **New files:** `mini tools/about-strings-core.js`, `about-strings-activity.js`, `about-strings-activity.html`. CSS prefix `as-`.
- **Pictures:** through `lcs-pictures.js`; all 24 opened on a contact sheet (the lake is a mountain-lake scene with no frog; camping/moon is a cratered moon).
- **Manifest:** the row stays in `wobble-museum-activities.json` (no MANIFEST_FILES change).
  - `tool` is repointed; `params` became a mirror of the core (every room's sentences per locale, about-word in brackets);
  - en/de/fr/es/pt/it/nl slug, title and intro are frozen (sha1 over the seven = `08edd251…`, unchanged by the script);
  - sv/da/no/fi slug, title and intro are new.
- **Route:** `GRADE_OVERRIDE` sv/da/no/fi '2' (the six siblings were already grade 2); `ACTIVITY_WRAPPER_VERSION` 9.820. Strand from `strand-names.ts` (Writing ×11).
- **Legacy gates:** `verify-wobble-museum-core.js` and `local-test-wobble-museum.js` exit 0 with a pointer.
- **Sources:** scratchpad `as-manifest.js`, `as-prose.json` (via `apply-activity-prose.js`), `as-fix1.js` (reviewer fixes).

## The invention
- **The strings:** every sentence card hangs by a string from a brass ring at its corner; the child hooks it (tap-tap or a real drag that stretches the string) to what the card is ABOUT — the room's big sign or the next room's sign seen through the doorway.
- **At Check** right strings pull straight; the off-topic card walks through the door into the next room; the room's facts become a page on the lectern ("All about frogs"), the pronoun card right after the card it points to, and Bram's stamp.
- **Misses:** a loose string / empty frame is a hint; miss 1 lights each card's about-word (the authored [bracketed] span — the subject, or in es/it/pt the verb that carries the dropped pronoun), wrong strings sag, and the "They" card's dotted arrow points back to its namer; miss 2 threads each wrong string to its right sign (L2: the missing fact glows; L3: the right picture lifts on the shelf).
- **Levels:** Catch the drift (8 rooms) · Make the page (hang the room's facts from a cart; drifts may stay on the cart or go to the door) · Name the room (three "They/It" facts; the door picture is true of at most one — the round sun for the moon, "dedos/dita/doigts" for the hand in es/it/pt/fr — and sagging strings show which facts refuse it).
- **Settings:** Words that help (underline the about-words) · Cards 4/3.

## Rulings this build made
- **Hands:** the page needs a namer the plural "They" can point back to, so the bank opens with "Hands can clap" (the design's "A hand has five fingers" moved to the end).
- **Locale-true mystery facts:** where a locale's "hive" word contains the room's word (de *Bienenstock*, nl *bijenkorf*, da/sv/no *bi-*) or also fits ants (fi *pesä*), the third mystery fact flies from flower to flower instead.
- **Phones:** two columns of cards; a card with a word longer than 11 letters takes the whole row (Windows has no Finnish hyphenation — the first try split «Ambulansseiss|a»); the cart scrolls sideways with narrow cards; at 320 the plates tuck over the frames.
- **Reviewer fixes** (all 11 locales read; facts, about-words, pronoun agreement and every picture near-miss passed): nl «hem» for kaart throughout, «Klokken» (bellen = soap bubbles), «thuis»; da «vinke farvel», «jorden»; es three word orders; pt «Pendure-o»; fi «mehiläispesässä»; fr «bruyante».

## Gates
| Gate | Result |
|---|---|
| verify-about-strings-core (own stems, pronouns, shared word, truth table; 2,560 walls enumerated) | 8,572 / 0 |
| mutate-about-strings | 19 / 19 killed, control survives |
| local-test-about-strings (11 locales × 320–1366, real clicks + drag + keyboard, every room at rest and solved) | 11,510 / 0 |
| visual-qa | 48 renders green |
| hierarchy | 242 / 0 |
| settings-efficacy | 3 live |
| preflight, prose-claims, serp-copy | green |
| variety (production, en) | 8 distinct, pass 2 reshuffled |
| live-verify-about-strings (11 pages 200; en/de/sv/fi × 1366/390, real pointer) | 67 / 0 (first run inside the Cloudflare window failed the embeds) |

## Open (page metadata — for the operator)
- The frozen intros of en, es, it, pt, nl (and loosely de, fr) still describe the old activity ("tap the fact that does not belong"); it and pt name the wrong mascot (Gemma / Prata) and a 🔊 button; the nl intro quotes a sentence that does not exist ("Een vijver is koud"). The reviewer wrote replacements (kept in the session record); not changed — metadata.
