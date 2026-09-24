---
name: project-say-it-board-rebuild
description: "Say It Board (#29, home-language-bridge) rebuilt 2026-08-07 from the v2 build to the v4 bar — what was wrong, what shipped, and the gate suite that now holds it"
metadata: 
  node_type: memory
  type: project
  originSessionId: 15d3a3d5-5f47-474c-8fdb-8fc3904a4151
  modified: 2026-08-07T02:31:15.107Z
---

# Say It Board (#29) — rebuilt 2026-08-07

`mini tools/home-language-bridge.js`, English slug `say-it-board`. A picture
communication board for a child who has just arrived in a classroom with none of its
language. Live in all 11 locales.

## ⭐⭐ The finding that reframed the whole job

**All twelve v2 phrases were REQUESTS.** Not one was an answer, a refusal or a report:
no *yes*, no *no*, no *stop*, no *it hurts*. A child handed only requests is trained
into a supplicant for a year — the exact opposite of the tool's own stated thesis. The
operator asked for teacher-authored phrases; the pedagogy panel's answer was that the
*curated* set was broken in a way no amount of teacher authoring fixes, because a
teacher will not think to add "No".

## What shipped

12 phrases → **68**, as a **core of 8 that never moves** + **5 categories of exactly 12**
(a constant count means the grid geometry never changes when you switch tabs — the AAC
consistent-grid property, free). 12 placeholder icons → **72 drawn ones**. Teacher
phrases via **sentence starters, not a blank box** — which makes the wrong grammatical
person *structurally impossible* rather than regex-detectable. A hold-this-up view.
Print that finally carries the pictures.

**The invention:** with no voice for the room's language, Show-big is FORCED ON and its
chip disabled with the reason. The failure mode reconfigures the apparatus instead of
printing an apology under it.

## The four defects that had shipped

1. **The toilet card was drawn as a DOOR** — which to a newcomer means *exit*, and whose
   adult answer is *no*. The most urgent picture in the product meant the wrong thing.
2. **A free teacher pressing Ctrl+P got a BLANK PAGE** (chrome-hiding print rules
   unscoped while the sheet was absent), and when it did print it emitted two text
   columns and **zero icons** — becoming on paper the bilingual word list its own header
   says it refused to be.
3. **A tap with the sound off changed nothing**, on a board used in schools that mute
   tablets. ⚠ The shared liveness gate scored it LIVE anyway: its change-signature
   includes `window.__spoken` and the default is voice-on, so it was satisfied by the
   one path that happened to work.
4. **The ten non-English sets had never been read by a native speaker.** The docblock
   cited `apply-home-language-bridge-fanout.js`; that file never existed anywhere in the
   repo, and `git log` showed two commits on the tool.

Plus: `p.t[classroom] || p.t.en` spoke English tagged as Finnish through the one path
the voice guard cannot see (latent then, **active** the moment a teacher writes her own
phrase, since a custom phrase has no translations); an empty `getVoices()` was cached as
"yes"; `ENT_TRUST_DAYS` was declared and never read **while the old gate asserted its
value** — a gate mandating dead code; the `aria-label` erased the home language.

## ⚠ THE OLD GATE REPORTED `PASS — 0 errors` ON ALL OF IT

Twelve well-built blocks, measuring a different set of things than the ones that were
wrong. **A gate certifies everything it does not measure.**

## What I could only find by LOOKING

Six defects no gate caught, all found by reading the render:
- `yes` was a ring with chevrons (read as a **download arrow**); `no` a ring with side
  arrows (read as an **expand control**). The two most important cards were UI furniture.
- the toilet, redrawn head-on, read as a **table lamp**; redrawn again in profile.
- the sick-bowl's rising strokes read as **steam**, i.e. hot soup, two cards from `hungry`.
- dry-clothes read as a **sofa**, two cards from `rest` (a cushion).
- ⭐ **the CORE RAIL was CLIPPED at 360px** — grid items default to `min-width:auto`
  (min-CONTENT), so a track holding "understand" refused to shrink and the last two of
  the eight cards a child needs most were cut off. No horizontal document overflow (the
  card's `overflow:hidden` ate the evidence), every cell above the tap floor, nothing
  "off screen" by any measure anyone was taking. Fix: `min-width:0` + `overflow-wrap`.
- the desk opened BELOW the fold, so tapping "For the teacher" appeared to do nothing.

## ⭐ Measure the DIRECTION of a fix — three times it went the wrong way

`help`~`thanks` 0.658: I narrowed the wrist to break up the mass and it went to **0.684**,
because less bulk is *more* heart-like. The real separator was serrated fingers.
`stop`~`lunchbox` 0.653: I added a lid band and it went to **0.662**. The fix was less
ink, not more. `yes`~`no` 0.718 because I drew the "nod" as a horizontal arc — the same
gesture as the shake.

## The gate suite (all in `scripts/`)

`verify-` 20 blocks, model-driven, no browser · `mutate-` **28/28 killed** ·
`prove-say-it-icons` render + calibrated distinctness, with `poison-say-it-icons`
**12/12** · `local-test-` 16 assertions driving real controls · `smoke-…-locales`
**121 across 11, fresh browser per locale** · `audit-…-locale-layout` **77 cells
(11 × 7 widths incl. 704)** · `live-verify-` **119 live**.

⭐ **The icon gate's floor is calibrated from the confusion audit's own accepted pairs,
not from percentiles.** A percentile floor always flags the top ~2%, so improving the set
just re-flags a new top 2% — it could not converge, and it reported 51 errors forever.

## Standing traps this build bought

- ⭐⭐ **A poison is only as good as its construction.** The most important poison
  survived because I PREPENDED a shape instead of REPLACING it — testing nothing, and it
  would have taught me to weaken a correct check.
- ⭐ **Ban-too-wide fired EIGHT times**, mostly in my own checks: `doce` matched inside
  *Docente* (Spanish for the plan), `\b` is ASCII-only, and `document.body.textContent`
  concatenates adjacent elements so *"…hears"+"English"+"Add…"* became a camelCase key
  leak reported in all eleven locales.
- ⭐ **Three live-verify measurement errors in a row, all mine, each looking exactly like
  a shipped defect** — `frame.click` dispatches at PAGE coordinates; `if (el) el.click()`
  swallows a miss silently; and the assertion demanded the card LIFT when the correct
  behaviour on a voiceless device is to SHOW BIG. Verify the measurement before the defect.
- ⭐ **"No change" and "anchor missing" are different answers** — conflating them made an
  idempotent script refuse to run twice on a file it had itself written correctly.
- ⚠ A heredoc turns `\n` into a literal newline and eats backslashes; write the script to
  a file. Literal control characters inside a regex literal terminate it.

## One change outside the tool

`frontend/lib/care-surfaces.ts` — `ActivityIframe` metered every tool mount at
`PLAYS_PER_DAY = 10` with **no exemption mechanism anywhere**, so a communication board
could show a newcomer *"you've used your free plays for today"* while eleven locales of
copy promised it was free forever. A named allowlist (`home-language-bridge`,
`feelings-check-in`, `hush-owl`) so the next care surface joins without a code change.

## ⭐⭐ What the six native panels found — the first read these strings ever had

Ten locales, six three-agent panels, 2026-08-07. **None of it was reachable by any gate.**

- **es** shipped **`coger`** — obscene across Mexico, Argentina, Uruguay, Paraguay,
  Venezuela and most of Central America — on a card a six-year-old points at in front of
  thirty classmates. The panel MEASURED the product lexicon first: zero occurrences in
  the other 42 Spanish landings. And *"¿Quieres ser mi pareja?"* reads as a romantic
  proposal.
- **de** duzt the teacher on **nine cards**. A Grundschule child says **Sie** from Klasse
  1, so the board handed the newcomer a visible social error in the utterances they most
  need to get right — and it is invisible to English, so no gate and no other locale
  could have caught it.
- **nl** used **`groep`** three times as a UI category label; in a basisschool that is the
  school YEAR.
- **it** named the tool **`tavola`** — a plank, a surfboard, the dinner table — and
  **`piano` means QUIETLY before it means slowly**, so the speak-slowly card asked the
  teacher to lower her voice.
- **pt** said **`o vosso filho`**, a pronoun that does not exist in Brazil, on the sheet
  that goes home to a family.
- **fr/it/pt** all forced **masculine agreement** on cards a girl presses.

⭐ **Three panels independently convicted the ENGLISH** — the locale nobody reviews and
the one all ten others were built from: `unkind` was a soft outlier every language
rendered as *mean*; `tooLong` said "letters" where the code counts characters and all ten
others said characters; `printBack` stranded its adverb in the sentence that goes to a
family — **which the French draft had silently worked around rather than reported.**

## ⭐⭐ And they read the MODEL, not the copy — nine code defects, several found twice

`showOnBoard` **did not put anything on the board** (a one-shot overlay the next tap
discarded) while `gateKeep` sold the free tier on *"using them is always free"* — **and my
own local test had been asserting the defect** · the paid **wall poster printed
"Name: ____"**, the harm its own comment 400 lines above forbids · the **paywall rendered
on the child-facing board**, and my test's check had a hole exactly there · a **storage
cap refused a non-storage action** · a `|| .en` **fallback survived on the speak path** in
the parenthesised form my own H8b regex walked past · `hasVoice` **accepted a Lisbon voice
for Brazilian** · `String.replace` processed `$&`/`$'`/`$$` **in the teacher's own text** ·
the gate line **vanished on the next repaint** — the same defect I had already fixed for
the tap confirmation and left unfixed here.

⭐ **The REVIEWED gate was BACKWARDS.** Its comment claimed an unreviewed toilet phrase
could not render; it withheld the three LEAST sensitive groups and shipped the two most,
core rail included. The comment now states what the code does — a partial hedge, not a
guarantee — because a board that cannot say *toilet*, *stop* or *it hurts* is not a board.

⚠ **And one in my own gate:** the ban table was written in DICTIONARY forms, so it policed
the translation rather than the language — Norwegian `uhell` absent, Swedish `olycka`
absent, Danish `mobning` absent, and every bullying entry a NOUN while the sentence a
native writes uses the VERB.

## ⚠ A check that cannot fail is not a check — caught on my own gate

My reachability check asked whether `scrollTop` MOVED. **`overflow:hidden` does not stop a
PROGRAMMATIC scrollTop, only a gesture** — so it blessed a board whose bottom a finger
could not reach at 320px, and its poison run reported 0 failures on the deliberately
broken build. Strengthened to ask what the computed overflow permits, it failed all 77
cells immediately. The real fix: the class had to go on `<html>`, not just `<body>`.

## The three rulings the panels escalated — decided, not deferred

1. **Finnish sentence-starter case government.** `Tarvitsen` governs partitive OR
   accusative-genitive depending on the object and flips to obligatory partitive under
   negation; `J'ai besoin de {x}` had **no completion yielding correct French** and was
   the DEFAULT starter; Italian and Portuguese `di`/`de` contract with the article.
   ⭐ Solved by **DATA**: `STARTER_EG` ships three worked completions per starter per
   locale under the textarea. ⚠ **NOT a validator** — the Finnish panel was explicit and
   right: a machine must not sit in judgement of a native speaker's Finnish. The starters
   with no correct filling at all were re-cut (`Il me faut`, `Mi serve`, `Dove trovo`,
   `Onde eu acho`, and Norwegian `Får jeg` for permission).
2. **Portuguese `obrigado/obrigada`.** No gender-neutral thank-you exists, so the card
   makes every girl say the masculine. `Obrigado(a)` is read by TTS as "obrigado abre
   parênteses a"; `Valeu` is peer slang; `Agradeço` is adult register; and asking which
   form is REFUSE-LISTED ("the board never asks who is using it"). **Ruling: keep it and
   NAME the residual beside the card**, as the art panel named cream as arguably a light
   skin tone. A known least-wrong choice is honest; a silent one is not.
3. **Titles.** Take only where the name is NOT A WORD or means the wrong object —
   `zegbord`→`praatbord`, `tavola`(a plank)→`tabella`, `Sanomistaulu`(one letter from
   "notice board")→`Puhetaulu`. Slugs untouched (§21.5a churn freeze).

⭐ **`REVIEWED` is now true for all eleven, so ALL FIVE CATEGORIES RENDER everywhere** —
68 phrases, not the 29 an unreviewed locale was getting. `[NSR-FLAG]` still stands for
sv/da/no/fi: expert panel review is not a signed-off native speaker pass.

## ⚠⚠ THE CACHE-BUSTER — six commits shipped behind a stale one

`live-verify` reported 2 category tabs in the non-English locales while `REVIEWED` was
true for all eleven **on disk and on the origin**. The iframe loads
`home-language-bridge.js?v=N`, a FIXED url, so Cloudflare caches that exact key — a
`?cb=random` fetch proved the origin correct the whole time. I bumped `?v=` once at the
start of the rebuild and then shipped six more commits behind it. **§A.13.42 says every
`.js` change; it means every one.** The gate was right and the bytes a browser got were
not, which is the only failure mode a green gate cannot tell you about.

## Locale state

`scripts/_home-language-bridge-strings.js` is the SoT;
`apply-home-language-bridge-locales.js` writes it (idempotent, refuses on defects, every
ban poison-tested BOTH directions, `--brief` prints the panel work list). `REVIEWED` in
the SoT gates rendering: **a category not native-reviewed in a locale does not render
there** (§16.6.1 substrate honesty). Native panels for the ten non-EN locales ran
2026-08-07; fold their corrections into the SoT and flip `REVIEWED`.
