# nt20-B-VAR — native panel brief (titles + instructions)

You are a **three-agent native panel** for ONE locale: a **linguist**, a **primary-school
teacher** who teaches this grade band in that country, and a **children's educational content
writer**. Together you produce the `title` and `instruction` for **64 new printable worksheet
faces** in your language.

## The one rule that matters most

**Rebuild, do not translate.** Each face must read as though it were written for your country's
classrooms by someone who teaches there. Use the genre name your teachers actually use — the
word they would type into Google — not a rendering of the English. Past batches produced
`Schwungübungen`, `grafomotricidad`, `coloriage magique`, `tabuada`, `tiokompisar`,
`dictée muette`, `Zahlenmauern`, `verhaaltjessommen`. That is the standard.

## Read the generator, not this prose

Before writing anything, **look at the rendered page for every face** you are naming:
`scripts/worksheet-gen/out/b2var-sweep/<sweepfile>.png` — the exact path is in the `sweep`
field of `scripts/worksheet-gen/out/b2var-faces.json`, which is the authoritative face table
(id, slug, family, grade band, theme, base type, English title, English instruction).

This is not optional. A previous panel briefed from prose made 74 false claims about pages it
had not seen. **A panel that reads the source is allowed to overrule this brief** — if the
render contradicts something written here, the render wins and you say so.

## Audit the English while you are there

⭐ **The English source is the one nobody reviews, and every locale inherits it.** In the last
two batches, panels independently found real defects in the English: titles promising content
the page did not contain, instructions describing a control that was not there, and a
worksheet named after the one noun the design forbids.

One is already known and fixed — the base `dot-to-dot` d1 page was headed *"Dot-to-Dot 1 to 20"*
while carrying only dots 1–10. **Look for more.** Put every finding in an `enAudit` array. That
array is read and acted on; it is not a formality.

## What you write

One file: `scripts/worksheet-gen/i18n/.draft-b2var-<locale>.json`

```json
{
  "locale": "<locale>",
  "types": {
    "K-289": { "title": "...", "instruction": "..." },
    "...": { }
  },
  "enAudit": ["defect found in the English source ...", "..."]
}
```

All 64 ids, exactly as listed in `out/b2var-faces.json`. Nothing else.

## Hard rules for `title`

1. **≤ 70 characters.**
2. **Must NOT contain your locale's word for "worksheet"** — the engine appends that itself.
   A title containing it ships "Arbeitsblatt Arbeitsblätter …".
3. **Unique within its grade band** (the id prefix `K-` / `G1-` / `G2-` / `G3-`) — not only
   against the other 63 faces here, but against every existing title in
   `scripts/worksheet-gen/i18n/strings.<locale>.json` for that band. There are already 149 K,
   96 G1, 74 G2 and 59 G3 titles. `lint-locale.js` fails the build on a collision.
4. **Honest.** The title may only promise what the render actually shows. If the page has four
   cards, do not title it for six. Check the sweep render.
5. **Inherit the family's genre head** from the already-published base face for that family in
   `strings.<locale>.json` (the base ids are `K-284..K-288, G1-242..G1-249, G2-274..G2-279,
   G3-370`). The base owns the bare genre term; each variation adds **one** distinguishing
   element to it — a number range, a scaffold level, a sub-skill. Do not re-invent the head,
   and do not ship a variation whose title is just the bare head.

## Hard rules for `instruction`

1. ⭐ **ONE SHORT SENTENCE, 60-75 characters.** 150 is a hard ceiling, not a target.
   This is measured, not a style preference. The Google meta description is assembled as
   `"Free printable {TITLE} Worksheet for {LEVEL}. {MIDDLE}. Download the free PDF."`
   and the engine picks the **longest** candidate for `{MIDDLE}` that still fits inside 170
   characters. Your instruction is one candidate; the family's generic skill sentence is
   another. **An instruction that is too long overflows, is discarded, and the generic sentence
   wins — so every sibling in the family ends up with the same description.** Measured on the
   first English build: instructions of 55-78 chars won, 68-103 chars lost, depending on how
   much of the budget the title had already eaten. Languages that run longer than English
   (de, fi, fr, es, pt) feel this harder.
   It is also simply better for a 5-8 year old: one short imperative beats two long clauses.
2. ⭐ **It must say what is different about THIS page** — the range, the scaffold, the step.
   A short *generic* instruction is worse than a long *specific* one. If a page genuinely needs
   more words for the child to understand the task, prioritise the child and accept the longer
   text; just never pad.
3. It must describe the task the render actually shows, with no control the page lacks.

## Per-locale reminders

- **de** — nouns keep their capital. Compounds are long; watch the 70-char title cap.
- **fi** — case matters; a fixed nominative token dropped into a sentence is often
  ungrammatical. Write the inflected form out. `numero` (digit) vs `luku` (number) is a real
  register split.
- **sv / da / no** — check the definite form of every noun you use. Swedish `bana` has the
  definite `banan`, which is spelled exactly like *banana*; that class of collision has reached
  a shipped page before.
- **nl** — `de` / `het` gender, and `IJ` is one digraph.
- **es / pt / it / fr** — agreement with the picture noun is unpredictable, so prefer frames
  that do not require agreeing with an unknown noun.
- **pt** is Brazilian Portuguese.

## Self-check before you finish

- 64 ids present, no extras, no missing.
- Every title ≤70 chars, no worksheet-word, unique in its band against `strings.<locale>.json`.
- Every instruction ≤150 chars and distinct from its siblings in the same family.
- `enAudit` filled in with anything you found wrong in the English.
