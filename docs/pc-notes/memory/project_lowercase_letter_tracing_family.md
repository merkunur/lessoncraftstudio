---
name: project-lowercase-letter-tracing-family
description: "Lowercase letter tracing shipped as its own family (K-278..K-283) in ALL 11 LOCALES — 66 decks, 66 landings, a hub card per locale, 2026-09-01"
metadata: 
  node_type: memory
  type: project
  originSessionId: 2144b7fa-1591-4aac-aca3-9c0c9e926128
  modified: 2026-09-01T11:14:37.955Z
---

**LIVE 2026-09-01 — ALL 11 LOCALES.** Commits `281126aa` (family) + `7257a148` (EN
landings + hub) + `f6c8112e` (10-locale i18n) + `6d506e2d` (60 landings + hub cards).
Six types **K-278..K-283**, a new `lowercase-letter-tracing` exercise-type family:
**66 decks, 66 landings, a hub card + 5-chip strip on every locale's /worksheets**
(each locale 119→125 links, 21 groups). Unblocked by the centerline rebuild — see
[[project-letter-tracing-centerline-fix]].

**Operator decisions:** its own family card (not chips under the capitals card) ·
German gets `ä ö ü ß` · EN first, then "build them in all the supported languages".

**Native family slugs** (collision-checked per locale): kleinbuchstaben-nachspuren ·
minusculas-punteadas · ecriture-des-minuscules · minusculas-pontilhadas ·
minuscole-tratteggiate · kleine-letters-overtrekken · spara-sma-bokstaver ·
sma-bogstaver · sma-bokstaver · pienten-kirjainten-kirjoittaminen.

**The reuse that made it small.** A lowercase lane turned out to be
`strokeLetterLane`'s GUIDES on `strokeWordLane`'s METRICS — capitals occupy one band and
rule the dotted line on the optical crossbar (48); lowercase spans three and its dotted
line IS the x-height (44). One flag, not a new emitter. K-278 **spreads K-238**, so both
families share one `build()`/`verify()`; the only switch is `lowercase: true` in the
difficulty params.

**Measured before authoring:** mirroring the existing capital sets, exactly TWO glyphs
were missing across 11 locales — `ñ` (one composition over the tilde `Ñ` already used) and
`æ` (built from the table's OWN `a` + `e` via a new `xform`, so both bowls keep the ruled
letterforms — an `a` on the left, not an `o`, which would be `œ`). `ß` is genuinely new and
is the *point* of the German page: no capital ß exists, so the capitals page structurally
could not carry it.

⭐ **The ß first rendered as a legible B.** Topology is the difference: two arcs each
closing back onto the stem = B. A real ß meets the stem **only at the top**, pinches to a
waist out in the middle of the letter, and ends in a **free tail**. Found by reading the
render, not by any gate.

⭐ **Cannibalization was the named risk and it evaporated on measurement.** These are the
closest possible siblings to the capitals landings — same mechanic, same standard
(L.K.1.a covers upper AND lowercase) — so §22.1 predicts elevated similarity. Measured:
**0.035** worst lowercase-vs-capitals, **0.056** within-batch, against a 0.65 WARN line.
The reason is mode-true copy: each page is about the letters actually on it and the
problems lowercase actually has (three zones, b/d and p/q as the two reversal pairs,
descenders crossing the baseline, the s-z diagonal cluster, the t that is not full height,
single-storey school `a`/`g`). **Write what is true of the specific page and the
similarity problem does not arise.**

**Traps (all real, all hit):**
- ⚠ **`gen-nt20-landings.js` cannot take extra ids**: `ORDER = Object.keys(TYPES)` and it
  refuses unless EVERY id has prose — adding 6 would demand all 26 entries in all 11
  existing prose banks. Cloned to **`gen-lc-landings.js`** (the `gen-var-landings.js`
  precedent), plus one new assertion: `canonicalDeckSlug` must name a deck that EXISTS on
  disk — a landing pointing at nothing is how a hub strip ends up silently empty.
- ⚠ **A landing alone does NOT surface a page.** The hub's `interleaveByAxis` orders
  buckets by DESCENDING SIZE, so a new family lands on page 2-3 (the `538b7cff` failure,
  *"I cannot find them on the main worksheets page"*). Fix = `BASES` + `GROUPS` in
  `gen-var-highlights.js`, re-run, **deploy** (it writes a frontend config). en 119→125.
  Non-EN locales warn `no base landing for K-278` and are skipped — which is what makes an
  EN-first rollout safe.
- ⚠ **Publish order vs the robots map.** `publish-wave` STEP 7b exempts landing-LESS decks
  from `noindex`. Decks published before their landings get exempted, so
  `gen-deck-noindex-exempt-map.js` must be **re-run + nginx reloaded after** the landings
  land.
- ⚠ **`gen-var-specs.js` rewrites 7 unrelated G2/G3 files with WORSE copy** ("Add or
  subtract one place at a time" on an addition-only sheet). Revert them every run.
- ⚠ A deck header read as "(none)" was a **stale Cloudflare hit**; cache-bust before
  filing. Origin-direct `curl -H Host: … http://127.0.0.1` is meaningless — it hits the
  port-80 redirect block (§21.8).

**Gate:** `verify-letter-strokes.js` now covers all 11 locales' lowercase alphabets AND
specials (36 caps + 41 lowercase), with vertical contracts for the new letterforms
(ß reaches the ascender; æ stays in the x-height band and must be materially wider than a
single bowl or it is not a ligature). Poison-tested both ways.

## The 10-locale fan-out (same day)

Rebuilt from each locale's OWN capitals vocabulary, never translated: Großbuchstaben→
Kleinbuchstaben, stora→små, isojen→pienten, mayúsculas→minúsculas, hoofdletters→kleine
letters. The arrow clause and write-it-yourself clause were lifted **verbatim** from each
locale's own K-238 instruction, so no new sentence was invented in any language.
`tools/apply-lc-locale.js` merges the draft into the 4 surfaces with refuse-before-write
validation across ALL locales — poison-tested 5 ways (title collision, family-slug
collision, worksheet-word in title, skill length, non-ASCII slug); all fire, control passes.

⚠ **Titles must name the letters the page ACTUALLY carries, and those differ per locale** —
pt slices g-m/n-s/s-z and it g-n/o-t/r-z (shorter alphabets), es carries ñ, nl the ij
digraph, de ß. **Computed from the specs, never guessed.**

⭐⭐ **THE §4.B LINT WOULD HAVE SHIPPED 60 FAILURES AND EVERY SIMILARITY THRESHOLD PASSED.**
Only reading BOTH gate sections caught it. The theme-noun lint needs a `slotTokens` entry
LITERALLY in P1, and slotTokens are ASCII-folded slugs; English passed only because its
level token is the ordinary word "kindergarten". Fixed for de/es/fr/nl/fi by naming the
school level in P1 (vorschule, preescolar, maternelle, kleuters, esikoulu) — worth doing
anyway, the level is a real query term. **it/pt/sv/da/no CANNOT pass without misspelling
their own language** (educacao-infantil, scuola-infanzia, forskoleklass, boernehaveklasse,
1-trinn). ⚠ **Pre-existing, corpus-wide: the shipped de/fr/pt/sv CAPITALS landings fail the
identical check, and 88-537 landings per non-EN locale fail it.** Gauge not moved; surfaced.

⚠ **My first read said the capitals landings PASSED — a wrong measurement** (I guessed
their slugs from the taxonomy family slug instead of reading `canonicalDeckSlug`).
Checking it flipped the conclusion. Same lesson again on the hub check: a regex reported fi
wrong because `jaljenta`**`mine`**`n` matched the Danish/Norwegian `mine` alternative —
**verify by exact slug, not by pattern.**

⚠ **Finnish fell under the 200-word floor** (161-174) because agglutinative languages say
the same thing in fewer words. Fixed by ADDING real Finnish content (double consonants,
j in ja/jo/jää, ä/ö frequency, å only in Swedish names) — never by lowering the floor.

**Cannibalization measured per locale, not assumed:** worst lowercase-vs-capitals 0.044
(es), best 0.018 (fi), against a 0.65 WARN line. All 10 gates exit 0, 0 similarity FAILs.

**Verified live:** 11/11 hub cards, 66/66 landings 200, 60/60 non-EN deck PDFs 200, native
titles on the published decks, robots map re-run so all 66 are noindex with the landings
as the indexable surface.

[NSR-FLAG][sv][da][no][fi] — Nordic copy matches each locale's shipped capitals register
and reuses its clauses, but has had no native pass.
