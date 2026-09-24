---
name: project-activity-serp-copy-gate
description: "page_title/page_intro — the activity search-results surface — was ungated for years; the gate, what it found, and what is still open"
metadata: 
  node_type: memory
  type: project
  originSessionId: cfb29625-4aea-4618-8e2c-de1d88dabb3b
  modified: 2026-09-07T19:37:50.197Z
---

# The activity SERP surface was checked by nothing (2026-09-07)

**Eleven per-locale gates (`verify-activity-content-<loc>.js`) enforce §20.10 against
`prose` ONLY.** `page_title` and `page_intro` live in `mini tools/*-activities.json` —
the title and meta description Google actually shows — and no gate had ever read them.

**Measured on that surface:** 138 raw CCSS codes across all 10 non-EN locales, and 31
Spanish descriptions citing **"Currículo LOMLOE" — Spain's education law — on a locale
that is es-MX everywhere else** (77 SEP references; the route's own map says *Planes y
programas de estudio (SEP)*). All fixed. New gate `scripts/verify-activity-serp-copy.js`
(self-tested both directions, ratchet currently EMPTY).

## What this cost, and the lessons

⭐⭐ **A BAN TOO NARROW REPORTS A NUMBER, AND THE NUMBER IS WRONG.** My first audit
pattern required a digit-or-K first segment, so it could not see the LITERACY codes
(`RF.K.3.c`, `L.2.4.e`). It reported 123; the truth was 138. The Mexican-Spanish panel
and the new gate each found the missing 15 **independently** — the panel by reading the
strings it was given and noticing my list was short. *A count from a pattern is a claim
about the pattern, not about the corpus.*

⭐⭐ **A TIDY-UP RULE WIDE ENOUGH TO FIX A SEAM IS WIDE ENOUGH TO BREAK ORTHOGRAPHY
THREE LOCALES AWAY.** After deleting a parenthetical I ran a general "collapse whitespace
before punctuation" pass. It turned the French `(Programmes officiels) : remplis` into
`): remplis` — **French sets a space before a colon.** Scope a repair to the seam it
actually made; never normalise text you did not touch.

⭐⭐ **THE NATIVE PANELS CONVICTED THE ENGLISH SOURCE AGAIN, AND ONE FINDING WAS A
FACTUAL LIE IN TEN LANGUAGES.** `match-pairs.compare-three-digit-numbers` promised the
child would use "the >, = and < symbols". Measured against `params.tasks`: **all 18
tasks offer exactly `<` and `>`. There is no equals round anywhere in the activity.** The
EN source carried it and ten locales inherited it. Found by a panel reading the MODEL
rather than the copy; verified before being touched. ⚠ And the repair pattern silently
skipped **en** — the one locale where it was authored — because English uses an Oxford
comma (`>, =, and <`).

⭐ **Panels find defects that have nothing to do with the task you set them.** Asked only
to remove codes, they returned: a live Swedish misspelling (`mattaktiviteten`); a
mathematically wrong term (`tiokompis-diagram` on an activity that goes to 20 —
*tiokompisar* are by definition pairs to **10**); a US code dressed in LK20's own term of
art (`svarer til kompetansemålet 1.OA.A.2`); `rammeverket LK20`, a calque no Norwegian
uses (it is *læreplanen*) ×4; Finnish `suorakulmaiseksi taulukoksi`, where *taulukko* is
a **spreadsheet**; a Finnish tail that was ungrammatical before the code was touched
(`noudattaa … opetussuunnitelmaa 1. luokan oppilaille` — a curriculum is not followed
*to* pupils); Danish `Øv lige store grupper`, which is not Danish, and `øver dit barn at
give`, missing its reflexive; Spanish `Educación Infantil` (Spain's stage name),
`puntuaciones` for *scores* (peninsular; MX says *puntajes*), `problemas con palabras`
(calque of *word problems*), and six broken gender agreements (`una forma … alineado`).
And a pt claim that was simply untrue: *"moedas e **dinheiro de verdade**"* on a digital
activity.

⭐ **`\b` IS ASCII-ONLY AND `\p{L}` WITHOUT `u` IS A LITERAL.** My leak check accused the
correct Swedish **"lysande"** of containing the English "and", because the lookarounds
had degraded to naive substring matching. And two of my own bans were **dead**: a
word-initial `verkstad` could never match the compound *ljusverkstad* it was written to
catch, and `bitar?` requires the `a`, so it could never match the bare `bit` it is named
for. Both had reported "ok" on the real text. **Only the two-direction poison found
them.**

## Still open — recorded, not fixed

- **Grade claims that contradict the local curriculum** (panels flagged, deliberately did
  not change — each needs a pedagogical ruling, and some would move `GRADE_OVERRIDE`):
  pt `clock.set-clock` says 1º ano but BNCC puts analog clock reading at 3º (EF03MA22);
  es `clock.set-clock` says 1.º but SEP puts it in 2.º; es `clock.tell-time-5-min` says
  2.º but SEP puts 5-minute reading in 3.º; no `numberbond.make-ten` says "5–6 år" while
  citing LK20, which begins at 6 (a 5-year-old is in *barnehage* under Rammeplanen); fi
  `numberbond.make-ten` cites "OPS 2014" on an *esiopetus* page, which is governed by the
  separate *Esiopetuksen opetussuunnitelman perusteet*.
- **da money** — Denmark withdrew the 25-øre in 2008 and the smallest circulating coin is
  1 krone; verify what the activity actually renders before the copy promises øre.
- **"free" claims in meta descriptions** — three panels independently flagged that many
  strings promise *gratis / gratuita / ilmainen / maksuton* while the product is a limited
  trial. See [[feedback_tier_truth_before_marketing_copy]]. Product decision, not a
  language repair.
- **Catalogue-level consistency** the panels asked for but I did not impose: es alternates
  "segundo" / "2.º" and "cifras" / "dígitos" and seven different words for the child; fi
  alternates *ilmainen* / *maksuton*; da has no consistent narrator across three sibling
  strings.
