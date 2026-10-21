# #68 — Willow's Story Corner → THE STORY ZIPPER (RL.K.9, all 11 locales)

ORDER row 68 · id `willow-story-corner.compare-tales.rl-k-9` (kept).
- **Files:** a new `story-zipper-core.js`; `willow-story-corner-activity.js` and its html are rewritten. The html no longer loads `compare-tales-core.js` (left untouched) and no longer pins `#lcs-root` to 100 % height.
- **Manifest:** in `willow-story-corner-activities.json`, edited as text. The old stories/rounds are replaced by a mirror of the core: the zippers and the rounds per pass, per locale.
- **Metadata:** slug, title and intro stay frozen in en and fr (gate hash `41593a8a…`). de, nl, da, sv, no, es, it, pt and fi are new: slug, title, intro, GRADE_OVERRIDE '1' (fr keeps GS), and the es/pt/it/nl strand chips.
- **Shared code:** 0 lines in shared cores or lcs-shell.
- **Legacy gate:** `verify-compare-tales-core.js` exits 0 with a pointer. `local-test-willow-story-corner.js` is rewritten.
- **Design:** `designs/068-willow-story-corner.md`. CSS prefix `sz-`.

## The apparatus and its invention: what both stories share zips shut, what only one has sticks out
- **The stories:** Willow (the library tortoise) reads two short stories, three panels each, every panel library pictures, a caption under each (on phones the caption appears on the note line when a panel is read or tapped). A missing thing is drawn as a faded, dashed ghost of its picture.
- **The tooth:** the question sits on a brass tooth ("Who lost something?").
- **The places:** the left side (only the left story), the middle (both), the right side (only the right story), the pocket at the foot of the zipper (neither). Tap a place, or drag the tooth onto it; keyboard ← ↓ → P.
- **The pull:** the Zip button or the slider. The zipper closes only where the panels prove the claim — the evidence panels light — and jams at a tooth in the wrong place.
- **Five teeth per zipper:** every kind once and one kind twice, a different doubled kind in each zipper of a pass (tales: both / one side / neither), so the last tooth can never be had by elimination. Rows already closed stay on the zipper (zipped in the middle, sticking out on a side, or in the pocket). On the fifth tooth the whole zipper zips shut.
- **Settings:** Compare — Two stories / Two animals (two big library animal pictures, a ring on the feature as evidence); Listen first — Always / When I tap Willow.
- **Misses:** miss 1 names the mistake (Is it in BOTH stories? · Look at the other story too. · Did that happen in this story? · One of the stories has it.; animal versions); miss 2 lights the evidence panels or rings, or for "neither" the pocket shimmers.
- **Balance:** which story sits on the left flips every pass; no place is the answer three times running or more than 6 / fewer than 3 times in a pass of 15; two zippers running never both open on a middle tooth.

## Content decisions (beyond the design)
- **Bear/Mouse "Who lost something?" (neither) replaced by "Who climbed up high?"** — Bear's sandcastle is washed flat, so a child can fairly say Bear lost something: two right places.
- **Pictures opened on a contact sheet, three animal questions changed:** duckling/penguin "has wings" → "has two legs" (the penguin's flippers are arguable); cow/horse "has patches" → "has spots" (the horse has white socks and chest); the library duck is a duckling, so every locale says duckling.
- **Mouse shares with one friend** (a panel holds at most three pictures at the floor).
- **The feeling badges are gone:** every picture must sit at its floor; the captions carry scared / safe / cheered and Willow reads them aloud.
- **Per-pair question words** where a language uses a different word for one pair (de/nl/da/sv/no/es/it/pt/fr ladybug dots vs cow spots; es/pt lion melena/juba vs horse crin).

## Native + pedagogy review (one reviewer over every caption, question, success sentence, string, the new metadata and the prose of 11 locales)
- **MUST, the source, all 11 locales:** the animal questions read "Which one has a beak?" — a question that presupposes ONE animal, biasing the child against the middle and the pocket on half the teeth. Every animal question now asks "Who has …? / Who is …?" in every locale; the gate refuses an en question that starts "Which one".
- **MUST, all 11 locales:** "Who was happy at the end?" (both) — the owl's last caption said only "safe"; it is now "safe and happy again".
- **MUST, all 11 locales:** bee/ladybug "has a tail" (neither) — a bee's stinger can read as a tail; now "has feathers".
- **MUST, de/da/sv/es/it/pt/fi:** "made something" also means "did something", so Owl and Frog "did something"; now "built or baked something" (with ni/né/nem + nothing in es/it/pt/fr). fr «fabriquer» excluded baking → «construit ou cuisiné».
- **SHOULD, applied:** sv/no «har man» also reads "does one have" → «man på halsen»; it Volpe is feminine («tutta da sola»), «preparato», «Chi è …»; fr «Seul/Seule …» for every "only" sentence, «ont chacun deux pattes», hintPocket «Ça arrive dans une des histoires.»; es/pt rain captions «Llovió y lo dejó plano.» / «Choveu e o castelo ficou achatado.»; es title «(primer grado)»; en "a tall mountain" (the picture).
- **Checked, kept:** the penguin is black and white with an orange beak and feet; the duckling is yellow all over — one right place.

## FROZEN-NOTEs
- **Intros:** the en and fr intros still describe the old tap-a-name game; en names "who kept trying" (no longer asked).

## Gates (local, all green)
- **verify-story-zipper-core:** 89151 pass, 0 fail. It covers:
  - every tooth of every zipper against the gate's own table of what happens in which story and which animal has which feature, with and without the side swap, and its evidence panel or spot;
  - every zipper: every kind once, one kind twice, a different doubled kind per pass;
  - 2,500 seeds × two passes per setting: rows, history, balance (3–6 per place), no place three times running, the side flip, the next pass;
  - every tooth × every place: closes iff right; the hint by mistake; miss 2 evidence; an empty pull is no miss;
  - texts ×11 (every success sentence names the right characters), strings, pictures, floors, the manifest mirror and the frozen hash.
- **mutate-story-zipper:** 19/19 killed (including a four-tooth zipper, Bunny also searching alone, a success sentence naming the wrong friend, and a feature the picture does not show).
- **local-test-willow-story-corner:** 3101 pass, 0 fail. Real pointer, every tooth of a pass in both settings in all 11 locales (tap, drag, slider, Zip, the evidence glow, the fifth-tooth zip), panel captions, Willow's reading, the keyboard, plus a width sweep at 320–1366 with rest, miss 2 and zipped.
- **Other audits:** visual-qa en and fi, 90 renders each across all 15 rounds, passed (the first run found the feedback text the same size on a phone and a desktop; fixed); audit-activity-hierarchy 1058/0 (the first run found Willow at 64 px and the feeling badges below the floor: Willow is 96/64, the badges are gone; then the dashed ghosts at 90 px: the dashes became an outline); audit-settings-efficacy 2 settings live; both preflights pass; verify-activity-content ×11 pass.
- **My own read:** the contact sheets of every picture (three animal questions changed); the 360, 704 and 1024 renders (miss 2 with the glowing rain panel, the zipped zipper with its teeth, the horse's mane ringed in de).
