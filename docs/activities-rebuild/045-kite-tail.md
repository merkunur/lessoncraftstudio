# #45 — Build Words from Syllables → THE KITE TAIL (RF.K.2.B, English only)

ORDER row 45 · id `syllable-builder.build-words-from-syllables.rf-k-2-b` (kept).

- **Files:**
  - Added: `kite-tail-core.js`, `kite-tail-activity.js`, `kite-tail-activity.html`, `kite-tail-activities.json`.
  - The row left `syllable-builder-activities.json` as text (CRLF kept; the other 10 rows are byte-identical).
  - 0 shared-core lines.
- **Locales:** English only by design. Rows 43–53 are one-language syllable decks.
- **Metadata:** slug, title and intro are frozen. The en prose is rewritten.
- **Design:** `designs/045-syllable-builder.md`.
- **Prefix:** `kite-tail` was checked free.

## The apparatus and its invention: A KITE THAT ONLY FLIES ON THE RIGHT TAIL
- **Every picture rides a kite.** Its tail needs one bow for every beat of the word, in the right order.
- **Check is a gust of wind, and the kite gives the verdict:**
  - right number of bows in the right order: it climbs and flies steady, lighting each syllable in turn;
  - **too few bows:** the last bow carries two beats and the kite spins;
  - **too many bows:** a blank bow drags it down into the grass (sag);
  - **syllables out of order:** the tail knots at the first bow that is out of place.
- **Nothing gives the count away:** the tail always starts with one bow, and every bow is the same size.
- **Five levels on the same kite:**
  - **How many bows?** Tie or untie bows, then Check.
  - **Tie the word:** drag or tap the syllable bows onto the tail. A foreign bow from another word is sent back.
  - **Fix the tail:** either find the missing beat, or swap scrambled bows into order.
  - **The kite fence:** drag the picture card onto the kite with the right number of bows.
  - **The tassels:** tap + to hang one tassel per sound under each bow.
- **Settings:**
  - **Level**;
  - **Bows:** Pick or Write (write each syllable on its own bow);
  - **Cards:** Pictures or Word cards;
  - **Kites:** One, two, or three, or Two or three.

## Deviations from the design (each measured or ruled)
- **ball → bus.** toys/ball is a soccer ball, and a child says "soccer ball" (three beats).
- **basketball → butterfly on the fence** (review). The fence is sorted by the picture alone, and an orange ball reads "ball" (one beat). Basketball stays in Fix the tail, where its syllables are shown.
- **The tassel words were changed** (review). otter, rabbit, ladder, mitten and pizza counted a doubled consonant (ot|ter) as two sounds, which would teach "two letters = two sounds". They are replaced by rainbow, dragonfly, fish, dolphin and monkey, which share no consonant across the break. sh / ph / ai / ow / ey / or are one sound (one tassel) each, and the gate asserts this.
- **The answer box is balanced at chance.** Two bows lie in reading order exactly half of the time over two passes. Three or more are never in reading order and never reversed.
- **The tassel rail has a "+" hook.** Tapping a tassel removes it; tapping the hook adds one.
- **Write mode on phones:** a compact row layout (64 px picture, no clouds) keeps it inside the 320 × 640 fold.

## Fixes from the build (each found by a render or a gate)
- **Pinning the bare knot:**
  - **The miss:** the "bare knot always last" mutation survived.
  - **The fix:** the gate now pins every word's exact missing position.
- **The fence is centred** with a flex-column main area.
- **Tapping the tassel rail removed tassels:** the rail now has a dedicated hook.
- **The write fold at 320 / 360** was 633 ≤ 640 after the compact layout.
- **Keyboard focus was lost on every repaint.** The fix restores it generically and gives the wrapper `tabIndex = -1`; this is the same class as #43 and #44.
- **Typed text overflowed the bow:** the font now fits to the bow.
- **Missing and outline tassels doubled at miss 2:** markers now show only below miss 2.

## Gates
- **`verify-kite-tail-core.js`: 719 checks, 0 failures.** It carries its own oracle: the 34-word whitelist with TeX splits, the per-level words, the per-sound tassel split, the bow kinds and the bare positions. It checks:
  - **the flight** for every count of bows;
  - **dealing:** the tie and fix deals and the box balance;
  - **the fence fit**, plus "no basketball on the fence";
  - **tassels:** "no sound shared across a break";
  - **the hint ladder;**
  - **the order rule**, sampled and deterministic;
  - **the frozen row** from git.
- **`mutate-kite-tail.js`:** 23 of 23 mutations killed, including the doubled consonant counted twice and basketball returning to the fence.
- **`local-test-kite-tail.js`:** 1724 checks, 0 failures, with a real pointer. It covers:
  - every round of every level, plus write mode, the settings and the keyboard;
  - a width sweep from 320 to 1366 at rest and done.
- **Other gates:**
  - `visual-qa-activity.js`: 60 renders pass;
  - `audit-activity-hierarchy.js`: 242 / 0;
  - `audit-settings-efficacy.js`: 4 live;
  - the en content gate, prose claims, SERP copy, content tells, answer rank, route preflight and font shorthand are green.
- **Read by me:** the spin, sag and tangle states, the fence and the tassels at 360, 704 and 1024, and the preview.

## Review (one agent, English native + pedagogy): applied
- **Confirmed:** every split and count, the foreign bows, and the hint ladder.
- **Required, applied:**
  - basketball off the fence;
  - the doubled-consonant tassel words replaced;
  - a singular "{s}: 1 sound."
- **Optional, applied:**
  - **instruction:** "Every picture flies on a kite";
  - **pTie:** "build" replaces "spell";
  - **hintTie:** "Say the word slowly. Which beat comes first?";
  - **hintTassel:** "Say the beat slowly and tap + once for each sound";
  - **okWrite** gets "!";
  - **"One, two, or three"** in the setting and the prose;
  - **foreign bows:** gingerbread's "cake" and dragonfly's "bow" (the apparatus word) both become "pop".

## FROZEN-NOTEs (not changed — metadata is frozen)
- **The intro** describes only the Tie level, and says "tapping" where the main hand is dragging.

## Deploy (2026-10-20)
- **Commit 60f62503.** deploy.sh returned EXIT 0, with 0 payment-canary failures. The en page returns 200. The preview webp was copied to the server before the build.
- **Production play: 20 / 20** (en at 1366 and 390).
  - Butterfly: on two bows the kite spins (a miss); on three it flies steady.
  - Carrot: dragged on in reverse, the tail knots (a miss); in order it flies steady.
  - Panda: on the one-bow kite it misses; on the two-bow kite it fits.
  - The wrapper version matches, and the iframe grows with the card.
- **Live variety probe (en):** 10 distinct rounds, and pass 2 is reshuffled.
- **Server disk after the deploy:** 134 GB available of 436 GB (68 % used).
