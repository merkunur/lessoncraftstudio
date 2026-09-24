---
name: feedback-the-english-source-is-the-locale-nobody-reads
description: "English ships article-doubling and case defects that ten native panels never see, because they are asked to write their own language, not to audit the source — gate it by RENDERING every template with its real substitutions"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 86b3dad3-29a2-44c7-87a1-9eea5a232d02
  modified: 2026-08-04T12:46:41.525Z
---

**Rule:** when a tool slots localized nouns into localized templates, **gate the
RENDERED string, in every locale, with the REAL substitutions** — never the
template alone, and never with a placeholder standing in for the noun.

**Why.** Fraction Kitchen (#16) shipped **three** doubled English articles and
nobody caught any of them for a year:

| template | EN | every other locale | rendered EN |
|---|---|---|---|
| `pieceName` | `one {fs}` | `{fs}` | "one one half" |
| `cutPrompt` | `Let's cut the {food}` | `{food}` | "cut **the the** pizza" |
| `sharePrompt` | `share the {food}` | `{food}` | "share **the the** cake" |

The pattern is identical each time: the `s`/food form already carries its own
article ("one half", "the pizza", "die Pizza"), so a template that adds one
doubles it. Ten locales are bare and correct; English is the outlier.

The build commit records that five native ensembles caught this exact doubling
**in the equiv template** and fixed it across eleven locales. They missed the
other three — because a panel is asked to write *its own* language, and nobody
is ever asked to read the English. ⭐ **The English source is the one locale
with no reviewer.**

Also found the same way: `cutDone` opens on a slot, so nine of eleven locales
spoke a sentence starting lowercase (German is unaffected only because it
capitalises nouns anyway).

**How to apply.**
- Add a `4b`-style section to the tool's verify gate: render every template that
  slots a localized form, for all 11 locales, and flag `(\p{L}+)\s+\1` — an
  immediately repeated word.
- ⚠ **Substitute the REAL nouns.** My first version of that check passed
  `food: 'X'` and therefore missed two of the three. Swapping in the actual
  localized food names found the third *immediately*.
- Sentence-case any template that OPENS on a placeholder.
- Related: the v4 doctrine already says "give every panel the English as SOURCE,
  not as target, and ask it to audit" (§23.6). This is the automated backstop
  for when that does not happen — and it is cheap: ~30 lines, ~200 renders.
