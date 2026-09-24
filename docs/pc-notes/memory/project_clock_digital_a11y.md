---
name: project-clock-digital-a11y
description: "The 2026-09-08 clock-digital accessibility arc — eight defects in the shared engine that all 8 locales inherited, and the gates that now hold them"
metadata: 
  node_type: memory
  type: project
  originSessionId: cfb29625-4aea-4618-8e2c-de1d88dabb3b
  modified: 2026-09-08T11:47:12.796Z
---

Building sv #8 surfaced eight defects that were **not Swedish problems** — they sat in the
shared `clock-digital` engine (six activities, eight locales) and every locale inherited them.
Commits `cd93a651` (A1/A3/A4/A5/A8) · `6e3980a4` (sr order) · `29789a4c` (A2/A6/A7 + copy).

## The defects

- **A1** one `instruction` served all six rows, and row 6 is the INVERSE task — and
  `lcs-shell` interpolates it into the container's aria-label, so assistive tech was told to
  do the wrong task. Fixed in the activity layer (the shell reads it at MOUNT, before the row
  loads, so the activity corrects both surfaces once it knows — **0 lines to lcs-shell**).
- **A2** the sr block STATED THE ANSWER. Replaced by a hand-position description.
- **A3** "count the little marks" was false — the ring skipped every 5th position and the hour
  ticks sit on a different radius, so the rim had a gap at 0,5,…,55. ⭐ **Fixed the apparatus,
  not the sentence** (all 60 marks, five-minute ones longer/heavier) — one code change instead
  of eight rewrites, and the hint becomes true everywhere.
- **A4** `aria-label:'clock face'` hardcoded English in 8 locales (words reused verbatim from
  the sibling clock-read/clock-elapsed engines; only sv `urtavla` was new).
- **A5** WCAG 2.5.3: the card showing `3:00` was NAMED `3 o'clock`, so voice control could not
  reach it. Fixed by DELETION — the visible text becomes the name.
- **A6/A7** `hintMatch` restated the question; half and quarter shared one generic hint.
- **A8** "Sprocket crows the hours" — he is a static SVG with two eye poses.

## ⭐⭐ Lessons that generalise

- **A LEAK CAN HAVE TWO MOUTHS.** Rewriting the sr summary changed nothing while each row-6
  button was still named `spoken(t)`: a blind child tabs the cards, hears the times, and
  string-matches without ever reading a clock. Button name and list item now come from ONE
  fragment. Found by the English and French panels **reading the engine**, not the copy.
- **PANELS CONVICT FROM THE STRING TABLE; THE DISPATCH ACQUITS.** Three panels called `hint`
  false on five of six rows. `_nudge()` routes `hour→hint` and never puts it where it would be
  false — I had already carried that conviction into a commit message. **Check the dispatch.**
- **THE OBVIOUS SHAPE WAS WRONG.** The hour hand is at `30·H + 0.5·M`, so it is on a numeral
  IFF M=0 — three cases, not four, and the branch is on the SHORT hand (branching on the long
  one is false at 3:15). Six panels derived this independently.
- **MARKS, NEVER MINUTES, AND FORWARD, NEVER BACKWARD.** The minute token was *removed*, not
  merely unused — a placeholder that exists gets reached for. Counting backwards would echo
  the subtractive spoken form in five languages (*vor*, *avant*, *antes*, *före*, *meno*).
- ⚠ **BOTH NEW GATES WERE VACUOUS ON THE FIRST WRITE, AND THEIR OWN POISON CAUGHT IT.** A2
  sliced at the first time pattern — which the poison supplied — so it passed; A10 compared
  against a set an earlier fix had emptied. **Poison every assertion, including the new ones.**
- ⚠ **A DEAD-STRING CHECK CONDEMNED FOUR CORRECT KEYS** because the hint dispatch selects the
  key inside a ternary and I required the literal adjacent to `txt(`. Widen, then it found the
  two genuinely dead ones (`srReadBody`/`srMatchBody`, plus unroutable `hintMin`).

## The gates (both new)

- `scripts/verify-clock-digital-a11y.js` — drives a browser, 72 assertions × 8 locales:
  A1 instruction, A2 no time stated, A4 localized dial, A5 label-in-name, A9 sr order matches
  button order, A10 button named by the sr fragment.
- `scripts/verify-clock-digital-strings.js` — browser-free, **in `deploy.sh`**: reachability,
  per-locale coverage (a missing key renders the KEY NAME aloud — `txt()` falls back to it),
  answer-leak, and four **native-panel invariants**: nl `één` (both acutes, or it means "a
  mark"), de accusative `einen Strich` (German inflects *one* by CASE), it `numero` before the
  numeral (uno/otto/undici are vowel-initial).

⚠ The panels split on a whitespace convention I never specified (it/en authored a leading
space, de/nl clean), so the engine joins on **trimmed** parts and the convention stops
mattering.

## Still open, recorded

`{ds}` renders `3:00, 9:00` and is the only form of the choices a blind child gets — German
would say *Uhr*, Swedish wants `och` before the last item and no Oxford comma. Needs a
last-joiner concept. Also: the de regional split (*Viertel vier* = 3:15 in the east/south)
becomes a real fork if spoken time forms are ever added.
