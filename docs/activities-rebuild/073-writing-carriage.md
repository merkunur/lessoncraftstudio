# #73 — Penny's Alphabet Trace → THE WRITING CARRIAGE (L.K.1.a, all 11 locales)

ORDER row 73 · id `penny-alphabet-trace.letter-formation.l-k-1-a` (kept).
- **Files:**
  - a new `writing-carriage-core.js`, `writing-carriage-activity.js` and its html (no `#lcs-root` height pin);
  - the row's `tool` is repointed to `writing-carriage-activity`;
  - `penny-alphabet-trace-activity.*` are left on disk, unused.
- **Shared code (read-only):** the 52 glyphs of `alphabet-trace-core.js` and the live tracer `stroke-trace-core.js`. 0 lines in shared cores or lcs-shell.
- **Generated as data at build time** (from Letter Studio's own composer and table): the locale letters (Ä Ö Ü ß Ñ Å Æ Ø and their lowercase, base glyph + mark written LAST; Æ æ ß authored) and the per-country ruling.
- **Manifest:** in `penny-alphabet-trace-activities.json`, edited as text. Its params are a mirror (round counts per locale, case and letter set).
- **Metadata:**
  - slug, title and intro stay frozen in en, de, es, pt, it and nl (gate hash `040f15ff…`);
  - fr, sv, da, no and fi are new: slug, title, intro, and GRADE_OVERRIDE '1'.
- **Legacy gates:**
  - `verify-alphabet-trace-core.js` still gates the 52 glyphs, now letter by letter A–Z/a–z instead of reading the row's rounds;
  - `local-test-penny-alphabet-trace.js` exits 0 with a pointer.
- **Design and CSS:** design in `designs/073-penny-alphabet-trace.md` (§15: this row owns the LETTERS; words, sentences and word spacing belong to New #218, so those levels are not built). CSS prefix `wc-`.

## The apparatus and its invention: the paper moves, the window stays
- **The carriage:** the child always writes in the same window. The paper is ruled with the country's own lines and tints, and it moves under the window like a typewriter carriage. A brass rail with a bell runs above it and the roll sits at the right.
- **Trace, then write:**
  - **Trace:** the letter's road (a translucent teal band with a hairline) is shown, with a green start dot and an arrow for the current stroke only.
  - **Write:** the same letter again with only the ruling and the start dot, judged on the hidden path at 1.3 × the trace corridor.
- **Judging:** the shared tracer credits only arc length swept from the start dot, in order, and keeps the ink through a lift. A line begun away from the dot, or set off against the arrow, stays pale, fades, and hands back any credit.
- **The line:** each finished letter glides out to the left with three ratchet clicks and sits on the line beside the others. A letter that misses its line stands out next to its neighbours.
- **The wall:** a cork alphabet wall above the carriage holds the chosen set's slots in the locale's alphabet order (it: J K W X Y on a second row). It fills with the child's own letters and is kept in the browser. A pin in the card's corner marks a filled slot.
- **Misses:**
  - Check with nothing drawn: a hint, no miss.
  - An unfinished trace: miss 1, a travelling light along the stroke.
  - Writing off the path: miss 1, the shadow letter over the child's line.
  - Miss 2: a spark walks the stroke, and a write step turns back into tracing.
  - A new stroke takes the help away. The eraser rubs out the current letter.
- **Keyboard:** Space shows the spark (never credited); Enter is Check.
- **Settings:**
  - Capitals / Lowercase;
  - Letters: All · A–F · G–L · M–R · S–Z (the Nordic S-set runs to Ö/Å; es M–R holds Ñ) · Vowels (padded to 7 with O and U write-only where shorter) · First letters;
  - Practice: Trace, then write · Trace, then write twice · Trace only.
- **Rounds:** pass 1 runs in alphabet order; every later pass is a new order.

## Content decisions (beyond the design)
- **Alphabets:**
  - de A–Z + Ä Ö Ü, with ß lowercase only, after z;
  - es Ñ after N;
  - sv/fi Å Ä Ö; da/no Æ Ø Å;
  - it 26 letters, with the five foreign letters marked on the wall's second row.
- **Vowels:**
  - fr includes Y;
  - de includes Ä Ö Ü;
  - sv/da/no/fi include Y and their own vowels (fi without Å).
- **ß stands on the baseline.** The reviewer flagged that German school print ß does not descend. Letter Studio's ß, the source, descended to 96, so it was fixed there too (`letter-studio.js?v=10`; verify-letter-studio 335/335).

## Native + pedagogy review (one reviewer over every string, alphabet, set, ruling, the new metadata and the prose of 11 locales)
- **MUST, fr (pedagogy):** CP handwriting teaches lowercase in cursive, so "conforme aux programmes officiels" overclaimed. It is now "en lien avec les programmes officiels" in the new intro and the prose. **Operator decision:** should fr lowercase be cursive?
- **SHOULD, applied:**
  - de: «du hast ihn geschrieben», title «Buchstaben nachspuren mit Penny», «Die Glocke läuten»;
  - nl: «Die haal is klaar», «Laat de bel rinkelen»;
  - da: «Se på gnisten», «glider under det»;
  - sv: «Spåra, skriv sedan (två gånger)», «Alla 29 bokstäver»;
  - no: commas before «og» ×4;
  - it: «dov’è», «esce dalla strada»;
  - pt: «você conseguiu escrever», «Do A ao F» …;
  - fr: «où ton trait est-il sorti», «sort du chemin»;
  - fi: «vetoa pitkin», «muiden joukosta», «mistä kohtaa».
- **Kept knowingly:** it G–L and S–Z hold the foreign letters (the worksheets are A–Z; the wall marks them).
- **Stroke order:** no objection in any locale to the print model.

## FROZEN-NOTEs (for the operator; not changed)
- **de intro:** «Online üben, ohne Anmeldung.» is a no-sign-up claim.
- **it intro:** «senza registrazione» is a no-sign-up claim.
- **nl intro:** it says the letter is «gestippeld» (dotted); the road is a solid translucent band.
- **en, es, pt, it intros:** they describe Penny the pencil; the carriage has no Penny on stage. The shell title keeps "Penny's Alphabet Trace" as the frozen page title does.

## Gates (local)
- **verify-writing-carriage-core:** 4826 pass, 0 fail. It covers:
  - hand-written alphabets and sets for 11 locales;
  - an oracle that traces and writes every letter of every alphabet;
  - reversed, wrong-start, scribble, two-tap and out-of-order cheats earn nothing; a backwards line keeps no credit;
  - marks written last, above the letter, with Ø's slash through the bowl;
  - the write corridor 1.3 ×;
  - steps by Practice, Check and the help;
  - 500 passes; the ruling equals Letter Studio's; floors; strings ×11; the mirror and the frozen hash.
- **mutate-writing-carriage:** 20/20 killed.
- **local-test-writing-carriage:** 1942 pass, 0 fail. A real pointer traces and writes every letter of every alphabet (capitals and lowercase) in all 11 locales, then once per locale: empty Check, a backwards O, an unfinished trace, the eraser, Space, the write step, off the path → shadow → spark → back to tracing, the bell, the three settings; plus a sweep at rest, mid-letter and won at 320–1366.
- **visual-qa:** en 156 renders, fi 174, all pass.
- **audit-activity-hierarchy:** 1984/0. The first run failed DRAWN, because the writing surface carried `role="img"`; it is now `role="group"`.
- **audit-settings-efficacy:** 3 live. **Both preflights; verify-activity-content ×11.**
- **Found by the gates and the renders:**
  - pointer strokes never registered (a repaint replaced the SVG under the finger);
  - a reversed O kept ~15 units of credit;
  - visual timers on the fast clock vanished before they were seen;
  - the wall's pin read as a diacritic (A looked like Ȧ);
  - "Z" wrapped alone onto a second wall row.

## Live (2026-10-21)
- Commit `a636153c`, deployed: `git pull` → cp the four carriage files plus `letter-studio.js` / `.html` → `deploy.sh`. The preview webp was uploaded first. Server: 132 GB free (69 %).
- `live-verify-writing-carriage.js`: 59 pass, 0 fail on the second run (the first run after the deploy races the page cache). It covers:
  - all 11 pages return 200;
  - en/de/sv/fi at 1366 and 390: an empty Check gives the hint and no miss;
  - L traced with a real pointer glides out onto the line, and the write step has no road;
  - L written is pinned on the wall, with the shell's success line;
  - wrapper 9.814; the iframe grows with the card.
- Variety probe en/sv/fi: 26 / 29 / 29 letters, reshuffled per pass. `letter-studio.js?v=10` (ß on the baseline) is live.
