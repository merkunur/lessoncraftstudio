# #51 — Forme as sílabas (pt) → O CADEADO DAS FAMÍLIAS, the syllable-family lock (RF.K.2.B, Brazilian Portuguese only)

ORDER row 51 · id `syllable-builder.forme-as-silabas.rf-k-2-b` (kept).

- **Files:**
  - Added: `family-lock-core.js`, `family-lock-activity.js`, `family-lock-activity.html`, `family-lock-activities.json`.
  - The row left `syllable-builder-activities.json` as text (CRLF kept; the other 4 rows are byte-identical).
  - 0 shared-core lines.
- **Locales:** pt-BR only by design. The invention is built on the Brazilian *família silábica*.
- **Metadata:** slug, title and intro are frozen. The pt prose is rewritten for the new apparatus.
- **Strand chip:** overridden to «Consciência fonológica»; the RF default «Leitura/escuta» is a reading strand.
- **Design:** `designs/051-syllable-builder.md`. **Prefix:** `flk-`.

## The apparatus and its invention: A COMBINATION LOCK WHOSE WHEELS ARE SYLLABLE FAMILIES
- **The display case:** the library picture sits behind glass. Beside it hangs the keyring: every opened lock drops a drawn brass key with the word engraved on it, and tapping a key reads its word on the plate.
- **The lock:** a brass padlock with one wheel per syllable. Each wheel is a drum that clicks through its family in the order a e i o u (*ga ge gi go gu*). A coda stays on its wheel (*bar ber bir bor bur*).
  - The neighbouring faces peek above and below the window.
  - A family tag sits above each wheel.
  - A nub sits above and below each window.
- **The plate:** an engraved brass plate under the lock always reads what the wheels say right now, «gi·to». Its speaker reads it **syllable by syllable** (see the review).
- **The hand:**
  - A vertical drag follows the finger and snaps to a face; a flick coasts up to three more clicks.
  - A nub click rolls one step.
  - A tap on a window, or on its tag, fans out the whole family like the classroom wall chart, and a fan face sets the wheel.
  - Keys: ↑ / ↓ roll, Enter fans the family, ← → Enter picks a face, Esc closes the fan.
- **Verificar:**
  - The right wheels drop a brass pin.
  - The wrong ones wobble once and keep a coral ring.
  - The shackle lifts and falls back.
  - A move lifts the pin of the wheel it touches and hides the help until the next Check.
  - **Miss 2:** the nub on the short side of each wrong wheel turns gold and pulses (a gold mark beside the right face shows when it is in view), and the word lies as a faint ghost under the plate.
- **Right:**
  - The wheels light gold one by one, the shackle pops and the glass slides up.
  - The picture rises and turns once, and the plate shows «ga · to», then closes into «gato».
  - A key drops onto the keyring, and the wheels spin freely for 6 s (free play).
- **Levels:**
  - **Duas sílabas:** 10 two-wheel words (gato bola casa foca mesa luva pipa vela cama vaca).
  - **Palavras maiores:** 12 words of three or four wheels.
  - **Monte o cadeado:** loose wheels into the sockets in order, plus one decoy wheel, a sibling from the family of one of the word's own syllables. 13 words, including every accented, tilde, gu, nh and diphthong word.
- **Settings:** Nível; Ajuda da marquinha (after two tries / always: the gold nubs and the ghost at rest).
- **The start:** no wheel ever starts on its right face. The offsets +1 +2 −1 −2 are dealt evenly over a level's wheels, reshuffled every pass and per session.

## Deviations from the design (each measured or ruled)
- **Words:** the design's legacy list did not match the artefact. The old row had *formiga* and *cama*, and no *sapo* or *pêssego*.
  - All 28 legacy words are kept.
  - **foca** replaces the design's *pato*, because every library duck is drawn as a duckling (RULINGS).
  - New family words: vaca, sapato, macaco, janela, panela, jacaré.
- **The family tag is a label, not a separate control:** tapping the window opens the fan (a 44 px target), which saves a 44 px row on phones.
- **Layout:**
  - On wide screens: the case and the keyring on top, then the lock on the left with the plate, bubble and Verificar on the right.
  - On phones: the case beside the keyring, the lock, then the plate beside Verificar with the hint under them, so Verificar stays above the fold at 320 × 640.
  - The picture is 120 px at 360 and 100 px under 340, instead of 128 / 112.
- **The notch:** when the right face is two clicks away it is not in view, so the gold sits on the nub that rolls the short way. It never sits on the drum alone.
- **farol is in Monte o cadeado** (two syllables; the reviewer's ruling), with decoy «fo».
- **Faces skipped on a wheel (native review):**
  - pipa: pi, po (pi·pi, po·po);
  - sapato: pu, ta (sa·pu·ta, sa·pa·ta);
  - gato: ta; macaco: ca; elefante: ta (ga·ta, ma·ca·ca and e·le·fan·ta are other names for the same picture, which the lock would mark wrong).

## Gates
- **`verify-family-lock-core.js`: 963 checks, 0 failures.** It carries its own oracle: the 35 words, splits, pictures, level tables, decoys, skipped faces and the vowel list. It checks:
  - **Data:** splits = `approved-words-pt.json`; every picture is a colour theme and its pt label is the word; the 28 legacy words are kept.
  - **Reels:** rebuilt from the gate's own a e i o u; ç has three faces; accents, tildes, gu/qu and diphthongs never roll.
  - **Locks:** EVERY reachable reading of every rolling lock (3,700+) opens only on the word. Pins = the right wheels. No reading is a rude word or holds one, and no reading is another name for the same picture.
  - **Monte o cadeado:** EVERY arrangement opens only in word order; the tray is a derangement, and the first wheel is in tray slot 1 0 % of the time.
  - **The decoy:** a family sibling, never a syllable of the word, and never a real word in its place (ti·gri sounds like tigre → gra).
  - **The start:** offsets balanced (≤ 35 % per class per pass). The uniform bots are measured: "roll every wheel one step" ≤ 0.32 on two wheels and ≤ 0.1 on longer words.
  - **Also:** the hints, the order rule, the strings (en + pt, reached, no price word, no «grupo») and the frozen manifest.
- **`mutate-family-lock.js`: 26 of 26 mutations killed**, including ga·ta, sa·pu·ta, pi·pi and the gri decoy coming back, and the gold nub pointing the long way.
- **`local-test-family-lock.js`: 2,653 checks, 0 failures.**
  - **At 704, a real pointer** through every round of every level: the nub, the drag one face the long way, miss 1 pins, the miss 2 gold nubs and ghost, the fan, the tray taps, the drag into a socket, the decoy named, the keyboard, the keyring peek and free play.
  - **The sweep 320–1366** at rest, miss and open.
- **Other gates:**
  - `visual-qa-activity.js --locale=pt`: 60 renders pass;
  - `audit-activity-hierarchy.js`: 242 / 0;
  - `audit-settings-efficacy.js`: 2 live;
  - prose claims, SERP copy, content tells, answer rank, route preflight, font shorthand ×2 and `verify-activity-content-pt` are green.

## Review (one agent, pt-BR native + educação infantil / alfabetização): applied
- **Required:**
  - **Second names marked wrong:** gata, macaca and elefanta → those faces skipped.
  - **Embarrassing readings:** sa·pa·ta (a slur) and sa·pu·ta → faces skipped. «cu» as a bare family face was ruled acceptable (it is on every cartilha).
  - **tigre decoy «gri»:** it sounds like the answer, because the final -e is said [i] → «gra».
  - **The speaker:** it read the plate blended, and «ga·tu» sounds like *gato*, so it now reads syllable by syllable.
  - **farol:** two wheels, so it moved out of the three-or-four level.
  - **Prose:** «vitrine» → «cadeado»; «consoante e vogal» was false for bor / ran / vowel wheels → «dentro da sua família silábica».
  - **Strings:** «Troque a rodinha» → «Mude de lugar a rodinha»; ariaRing singular «1 chave» / "1 key".
- **Optional, applied:**
  - po off the pipa wheel;
  - «Sobra uma rodinha.»;
  - hintDecoy «não faz parte de»;
  - hintGhost «lá estão as sílabas na ordem certa»;
  - «Ajuda da marquinha»;
  - «família das vogais» / "vowel family" in aria;
  - ariaKey «toque para ouvir»;
  - the «conferidas em várias fontes» sentence cut.

## FROZEN-NOTEs (not changed — metadata is frozen)
- **The title:** «no pré-escola» is the wrong gender and should be «na pré-escola». «Fonética» is not the BNCC term.
- **The intro:**
  - «mesclar» is a calque of "blend" (the native wording is juntar / unir);
  - «contar … sílabas» is not done here;
  - «colocando as sílabas em ordem» describes only Level 3.
