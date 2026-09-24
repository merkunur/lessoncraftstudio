---
name: project-vocab-correctness-arc
description: "The 11-locale native audit of image-vocabulary.js — DE lead COMPLETE (118 corrections, 3 commits); the pipeline, the doctrine, and the 10 remaining locales"
metadata: 
  node_type: memory
  type: project
  originSessionId: c55d44cf-fa06-4fe4-8af8-69e090308583
---

## 🏁🏁 FULL PASS COMPLETE — ALL 11 LOCALES DEPLOYED (2026-07-17, commit `59f00e9c`)
The 6 remaining locales are done + LIVE at origin. Method = **7 dict-only batches/locale, 1 Opus
native-linguist agent each, NO image re-opening** (the cost-forbidden 13-agent method is retired):
`combine-full.js` (union batches, skip no-ops) → `check-correction-diacritics.js` gate →
`apply-corrections.js --apply` per field (round-trip-guarded) → rebuild + `verify-picture-word-wall`
(PASS 0 err, 16445 cards) → commit → `git pull` + `cp` the 6 pww-index to `/var/www/lcs-media/mini-tools/`.
Fixes: **no** 5s/59p/24g · **fi** 90p · **fr** 9p/24g · **es** 1s/14p/15g · **pt** 1s/35p/41g ·
**it** 1s/16p/14g (da shipped prior). ~360 fixes; 276 vocab lines. Dominant classes: Nordic/Finnish
umlaut+gradation plurals flattened (tang→tenger, leuka→Leuat, toe Varvaat→Varpaat), lemma-crossed
plurals (fr penguin, pt dog Cachorro/Cães→Cachorros), Romance fem heads miscoded m (es pirámide/sal,
pt chave/pá), fabricated loan plurals→invariable (it Baguetti, pt Kettlebelis), compound wrong-element
(pt Caminhões-tanque). **Gate false-alarm rule learned: stress-shift accent drops are CORRECT, do NOT
restore** (es atún→atunes, pt lilás→lilases — oxytone sing → paroxytone pl loses the accent).
🔴 **STILL DEFERRED (operator-decision, NOT auto-fix):** the 38 lemma-mismatch BLOCKED keys +
~90 ART-DEFECTS.md mismatched drawings + nl `excited`="Opgewonden" child-safety flag. Plural/gender
were NEVER touched on any BLOCKED key (the pictured-object rule holds).

⚠️ **DEPLOY GOTCHA (found 2026-07-17 when operator asked "do the worksheet generators have the right
plurals live?"): the 29 worksheet apps read a SEPARATE, immutable served copy** at
`/var/www/lcs-media/worksheet-generators/js/image-vocabulary.js` (loaded as `js/image-vocabulary.js?v=3`,
exposes `window.ImageVocab.plural/singular`). It is NOT the PWW `pww-index-*.json` and **`deploy.sh`
does NOT sync it** (only counts js files). Editing `REFERENCE TRANSLATIONS/image-vocabulary.js` + git
pull is NOT enough — the served copy is `chattr +i`. **You MUST push it via the helper:**
`cp "/opt/lessoncraftstudio/REFERENCE TRANSLATIONS/image-vocabulary.js" /tmp/image-vocabulary.js &&
/var/www/lcs-media/scripts/update-worksheet.sh /tmp/image-vocabulary.js js/image-vocabulary.js`
(unlock→copy→chown lcs-media→relock). Verify: `cmp` served vs /opt REF = identical. Cache =
`max-age=14400` (4h) at `?v=3`; edge revalidates on last-modified, but a stale open tab needs Ctrl+F5.
A no-stale-ever fix = bump `?v=3→v=4` across all 29 apps (heavy, deferred). **Already-published decks
baked their plurals at gen time — this only affects NEWLY generated decks.**

**Operator, 2026-07-17: "There are mistakes in the plural form of the words. This is an educational website. It is absolutely not acceptable."** He was right.

## 🔴🔴 THE REAL ROOT CAUSE (2026-07-17) — NOBODY EVER LOOKED AT THE PICTURES
**The operator's rule: "All of the languages reflect the same images. If an image is a noun it is a
noun in all languages."** He is right, and it means the classification is decided ONCE per key and
applied to all 11 — never per-locale. (The shipped code already agreed: `build-pww-index.js` marks
adjectives/gerunds `noArticle:true` "frameless in EVERY locale".)
**And for weeks EVERY judgement — 12 sv natives, the de/nl waves, the adversarial passes, me — was
made from a FOLDER NAME and an ENGLISH GLOSS. The Read tool renders `.webp` directly. Nobody ever
opened one.** When I finally did: **38 of the 193 ambiguous keys (20%) are LEMMA MISMATCHES — the
word does not name the picture.** TWO SYSTEMATIC ART DEFECTS, not 38 coincidences:
- **`sports bw` is drawn as EQUIPMENT, lemma'd as SPORTS**: badminton=a shuttlecock · bowling=a ball
  · boxing=a glove · football=a HELMET · hockey=a stick (winter/hockey=a PLAYER).
- **`activities` is drawn as EQUIPMENT, lemma'd as ACTIVITIES**: **singing=a MICROPHONE** ·
  sewing=a sewing machine · photography=a camera · science=a microscope · swimming=goggles ·
  skating=one skate · skiing=skis · scuba-diving=a mask. *A child shown a microphone is told "Singen".*
- Others: **butter = drawn as CHEESE** (a block WITH HOLES, differing from the cheese art only by
  being paler) · cymbals = a COMPLETE DRUM KIT · chess = a chess KING piece · dice = ONE die ·
  honey = a JAR · golf = a putting green+flagstick · jumping = a girl with a SKIPPING ROPE ·
  camping = a tent · fishing = a rod (and de *Angeln* is BOTH the activity AND the plural of *die
  Angel*, the rod) · corn/green-beans = ONE cob/pod · hay = THREE bales.
- **`deer` CLOSED** (was operator-held): de splices two animals — s=*Hirsch* (stag, m) + p=*Rehe*
  (from *Reh*, n), gender `n` matching NEITHER. **The picture settles it: an antlerless spotted
  fawn = a Reh.** No dictionary could have; only the image.
**THIS IS WHY THE ARC KEPT FAILING: everyone argued about the plural of the WRONG WORD.**
🔴 **SEQUENCING RULE (locked):** on a lemma-mismatched key `hasPlural` describes the PICTURED
OBJECT (Mikrofon→Mikrofone), NOT the label. **NO plural/gender work on any key whose word does not
name its picture** — pluralising "Singen"→"Singens" is the next Gardinerar. 38 keys BLOCKED.

## 🏁 SV WAVE v2 MERGED (`799b0d8a`) — 1225/1225, **41 corrections, gender 2** (v1 "found" 201)
`singular 1128 OK/3 FIX/16 PT/78 HOLD · plural 1066 OK/33 FIX/95 NO_PLURAL/31 HOLD · gender 1200
OK/**2 FIX**/23 HOLD` · 132 held · 38 BLOCKED proven absent · conflict scan 0.
**41 vs v1's 201 IS THE VERDICT ON THE OLD METHOD** — v1 "found" 5× more while reading no pictures
and no dictionaries. Most of its 201 were right (live), but the residue after a PROPER read is 41.
**Gender 2, not 146.** ▶ NEXT: adversarial pass (`reverify/sv-v2.json`) → gates → apply per field →
deploy. Then de, nl, da, no, fi, fr, es, pt, it.
- **merge-verdicts FIX (`799b0d8a`)**: the coverage assert demanded a verdict for EVERY key, but
  RULE 4 says SKIP blocked ones. Blocked keys now leave the `asked` set + are proven ABSENT; a
  blocked key that CARRIES a verdict is now the error. **Check BLOCKED before the asked-set test**
  (some reviewers list the key to record the skip).
- **The 2 gender fixes are BOTH the Kiefer class**: `trapezoid` n→t (SAOL `1trapets ~en` = A CIRCUS
  TRAPEZE vs `2trapets ~et` = the shape; the art is a quadrilateral — the data called a maths shape
  gym apparatus) · `us` n→t (country names are neuter, *USA är stort*; sibling `uncle-sam` stays `n`
  — a PERSON name keeps common gender).
- 🔴 **THE DISEASE WAS NEVER THE PLURALS** — what 12 natives found by LOOKING: **`sink`** = a
  BATHROOM basin labelled with the word for a KITCHEN counter (**I "fixed" its spelling
  Diskbank→Diskbänk and SHIPPED it** — right letters, wrong object) · **`microwave`** = SAOL
  *mikrovåg* = "elektromagnetisk STRÅLNING"; all 5 themes show the appliance → **children hear
  "radiation"** · `liberty` = the STATUE OF LIBERTY called "Frihet" · `chicken` = an adult HEN
  reading *Kyckling* (=a chick), the same word `chick` speaks · **`crane` = NEITHER picture is a
  Trana** (birds_2 is a **STORK**, vehicles a truck — the de arc held it as "bird vs machine"; it is
  neither) · **`pine-tree` drawn as a GRAN** (the de arc's proudest find — Kiefer=the JAWBONE —
  corrected the gender of the WRONG TREE) · `pegasus` art has a **GOLDEN HORN** = a winged unicorn ·
  `wrench` = a fixed spanner labelled *skiftnyckel* (="justerbar" by definition) — **v1 passed it as
  a clean CONTROL having never looked**.
- 🔴 **6 NATIVES DESTROYED A RULE I INVENTED.** I took batch 01's "EN loans take -s not -ar" and
  pushed it into 11 prompts. Refuted by frisbee · whiteboard · pudding · pickup-truck ·
  monstertruck · and decisively **kettlebell (~s) vs keyboard (~ar el. ~) IN ONE BATCH**.
  **"No class rule for English loans is usable — each must be fetched."** A finding from one batch
  is EVIDENCE, NOT DOCTRINE — I broke my own quote-don't-paraphrase rule within an hour of writing
  it. Same error class: I put a GERMAN Duden finding (broccoli/celery have plurals) into the SHARED
  template; SAOL gives `broccoli ~n` — **no plural**. Locale-specific facts must be marked per-locale.
- 🟢 **THE DICTIONARY OVERRULED THE REVIEWERS TOO** (the bar): `firefly` (expected a calque; SAOL has
  *eldfluga*) · `fireplace` (expected a cooker; SAOL `1spis` = "murad eldstad") · `squash` (expected
  a false friend; SAOL glosses it "en pumpa") · `mango` (*"I had the FIX drafted before checking SO"*).
- 🔴 **TWO REVIEWERS ACCUSED v1 OF FABRICATION — BOTH WRONG.** git proves v1 described the PRE-fix
  data (`santa` was `["Jultomten","Jultomtenar"]`, `shampoo` `["Schampo","Schampo","n"]`, `rose`
  `["Ros","Rosar"]`). **They look false NOW precisely BECAUSE they worked.** Accepting either would
  have discarded 201 correct corrections. **A confident accusation is a claim, not a fact — check.**
- ⚠ **THE DIACRITIC ARTIFACT IS ENVIRONMENTAL, NOT A REVIEWER FLAW** — one caught themselves
  ASCII-folding their OWN output ("Mikrovagsugn","Hav") AND caught the naive repair's danger:
  `ara→åra` corrupts the macaw (*ara/aror* is correct), `hav→håv` makes *havregryn*→*håvregryn*.
- ⚠ v1 errors v2 caught: `soda`/`clover` are REAL ZERO PLURALS (`läsk ~en; pl. ~`) not NO_PLURAL ·
  `jam`/`juice`/`lime` have real plurals (*sylter/juicer/limer*) — **my strip flattened them off a
  wrong `mass` classification** · "SAOL main form is sebra" — SAOL says the REVERSE.
- **The 22 plural-picture keys are an OPERATOR CONVENTION call, not a native one** — *"both forms
  are correct Swedish; the operator must pick one"* (cheeks/crutches hold singulars while
  cookies/crayons/curtains/chips hold plurals — all classified plural-picture).
- **ART DEFECTS ARE SYSTEMIC** (operator, not linguistics): `mercury`+`neptune` **share ONE generic
  gas-giant image** · `kiwi` is a BIRD in one theme + a FRUIT in another · `jeans` is trousers in one
  + SHORTS in another · `stamp` = a postage stamp in one + a RUBBER stamp in another (needs a KEY
  SPLIT; flips both gender AND plural) · `peach`/`diamond`/`balloon`/`nail` same class · dinosaurs
  are generic (`dimetrodon`+`therizinosaurus` drawn as STEGOSAURUS, `ichthyosaurus`+`mosasaurus` as
  LAND dinosaurs, apatosaurus wears stegosaurus plates) · `tiara`≡`crown`, `toad`≡`frog`,
  `barrette`≡`bow_tie`, `painting`≡`palette` · `ice-cream-truck` serves CUPCAKES · **WINE on the
  `picnic` card for ages 3-7** · **ENGLISH TEXT baked into `police_car`/`post_office` art** ·
  `snowdrop` is upright not hängande · `sparrow` is a rödhake.
- ⚠ **RESOLVER TRAPS** (3 batches hit these): the **`tree` theme DROPS the `_tree` suffix**
  (`tree/spruce`, `tree/juniper`, `tree/dogwood` — *"dogwood-tree is precisely where a real FIX was
  hiding"*) · `fruits/dragonfruit` (one word) · `tools bw/double-ended_wrench` (hyphen KEPT) ·
  `travel and holiday bw/double-decker` · `shoes_2`. **My "84 no-image keys" count is INFLATED.**

## 🟢 THE v2 METHOD IS PROVEN (sv wave batch 01, 107 keys, every picture opened + SAOL queried)
`singular 99 OK/8 HOLD · plural 93 OK/6 FIX/6 NO_PLURAL/2 HOLD · **gender 107/107 OK — ZERO fixes**`
(the population signal predicted 146 miscoded sv genders; natives have now found 18, then 0. **It is
a lie — never size a wave from it, never redistribute to hit it.**)
- **THE `football` LESSON PAID OFF LIVE:** *"opening only `4th of July/balloon` (three balloons)
  would have produced a false plural-picture ruling — `toys/balloon` is ONE balloon."* The reviewer
  opened **both** themes because the brief told them what my one-image spot-check cost. **Always open
  EVERY theme a key resolves to.**
- **`basketball` = an ESCAPED BLOCKED key my classification MISSED** (word `Basket`=the sport, art=the
  BALL; identical to badminton/baseball which ARE blocked; its row self-contradicts —
  classification `countable-thing` vs raw `verb-gerund`). **→ block it. Re-audit the sports keys.**
- **`ängelfisk` DOES NOT EXIST** — SAOL+SO both "Inga träffar"; an English calque. The art is
  **kejsarfisk/kejsarfiskar**. The `-ar` ENDING is right, the **STEM** is wrong → "fixing the ending"
  misses it. (Vindicates the prior round's `angelfish` HOLD.)
- **EN loans take `-s`, not `-ar`**: `Babyar`/`Babybodyar`/`Baglar` invented (SAOL: babies el. babys ·
  bagels · bodies). `Baglar` came from the `-el` syncope firing as if *nyckel→nycklar*.
- **4 inverse traps where the data is RIGHT** (a naive fix destroys them): **`bok`/`Bokar`** — SAOL
  *1bok→**böcker*** (the BOOK) vs *2bok→**~ar*** (the **TREE**); the Kiefer class, caught live ·
  `bacon` **t** + `parasoll` **t**+zero are SANCTIONED VARIANTS (`~en el. ~et`) · `Banjanträd` is a
  listed SAOL variant · `Bisonar` is correct per SAOL `~en ~ar` — **⚠ SAOL and SO DISAGREE here**
  (SO: "ingen böjning"), so two authorities can conflict: flag, don't force.
- **More art defects** (the butter=cheese class, cross-locale): `barrette` = a **recoloured duplicate
  of `bow_tie`** (identical geometry, no clasp) · `bandage` = a sticking plaster (*plåster*) ·
  `architect` = the same hard-hatted character as `construction_worker` · **the whole `dinosaurs`
  theme is generic** (apatosaurus wears stegosaurus plates).

## ⏸️ RESUME POINT (session hit usage limit mid-nl, 2026-07-17 ~18:00)
**DONE + LIVE: sv (`99ab5628`, 41 corr, gender 2) + de (`eb0664f9`, 29 corr, gender 3).** Both
origin-verified. **5 gender fixes across 2488 keys vs a predicted ~292 — the signal is noise, twice
proven.** **All 11 dict sources now WORK** (`32c37e9e`/`a5d01741`: nl=Groene Boekje woordenlijst.org
since Van Dale free is DEAD; es=WordReference; de=render mode since Duden 403s under load).
**▶ nl IS MID-FLIGHT: brief+batches committed (`8cf09902`), but ALL 12 agents DIED to the session
usage-limit mid-write.** I deleted the 12 stale-v1 nl verdict files (0 `image_seen`) so resume is
clean. **RESUME = just relaunch the 12 nl batch agents** (prompts: read `BRIEF-nl.md` from disk +
the 2 rules + skip ART_DEFECT + dictionary-outranks-brief; `/tmp/nl_*.txt` templates are gone, rebuild
from the de/sv prompt shape). nl has 2 registered prior arcs in flag-conflicts (`c7de1a40`+`5310b329`,
66-key Van Dale gender pass) — a conflict is a FINDING, don't reverse blindly. Then merge → adversarial
→ gates → apply per field → deploy. **After nl: da, no, fi, fr, es, pt, it (7 left).**
⚠ **STALE-FILE LANDMINE**: after ANY crashed wave, `image_seen`==0 on every row = a v1 file; DELETE
those before merge (merge-verdicts would ingest them as the wave — the trap that made 2 de reviewers
cry "fabrication"). A real v2 file has `image_seen` on every art-bearing row.

## ▶️ HOW TO RUN A WAVE (the rebuild loop — start here next session)
1. `node scripts/vocab-audit/build-dossier.js` → `emit-batches.js --locale=<loc> --size=110`
2. **Fold the classification into the batch rows** (one-liner in `f2aa62ff`'s commit body): each row
   gets `classification{category,hasGender,hasPlural}` + `BLOCKED:true` on the 38 mismatches.
3. **Generate `BRIEF-<loc>.md` from `BRIEF-WAVE-TEMPLATE.md`** — fill `<<LOC>> <<LANG>> <<AUTHORITY>>
   <<AUTHORITY_URL>> <<PLURAL_TRAPS>> <<GENDER_CODES>>`. **BRIEF-sv.md is the worked example.**
4. Launch **12 agents in parallel** (`general-purpose`, opus). Prompt = "read the brief from disk,
   verbatim" + the 2 rules (OPEN THE PICTURE / dict-fetch) + "skip BLOCKED" + "the dictionary
   outranks the brief". **NEVER paraphrase the brief into the prompt.**
5. `merge-verdicts --locale=<loc>` → `flag-conflicts` → **adversarial re-verify** (it has paid for
   itself EVERY wave: killed `lego`/`lettuce` on de, caught 4 diacritic-stripped corrections on sv)
   → `apply-reverify --write`.
6. Gates: `check-row-coherence.js --locale=<loc>` + `check-correction-diacritics.js --locale=<loc>`.
7. `apply-corrections --field=X --apply` → `verify-vocab-diff --locale=<loc> --field=X --expect=N`
   → **commit BETWEEN field waves** (the gate diffs vs HEAD) → plural, then gender, then singular.
8. `build-pww-index.js` + `verify-picture-word-wall.js` → **§14.6 TWO-STEP deploy** + **`cp` the PWW
   index** → **verify at the ORIGIN over ssh** (`cmp`), NEVER the public URL (4h CDN, no purge).
**IN FLIGHT: the sv wave (`f2aa62ff`) — 12 agents launched. Order after sv: de, nl, da, no, fi, fr,
es, pt, it.** ⚠ **nl + es CANNOT START until dict-fetch has a working source for them.**

## 🟢 STATE 2026-07-17 (ground-up rebuild, phase 1 SHIPPED + LIVE)
`34aed7e4` substrate · `41bcf4d3` image-mandatory brief · `db789d60` the 193 classified ·
**`0296e4c6` STRIP: 511 fabrications deleted (432 invented genders + 79 invented plurals), 11
locales** · `6f247cf5` PWW rebuild. Live-verified at ORIGIN (`red` de = `["Rot","Rot"]`).
Coherence **606 → 95**. `venus` keeps `f`, `water` keeps `n` — **mass/abstract/proper nouns ARE
nouns: gender YES, plural NO. Only QUALITIES and ACTIVITIES lose the gender** (two independent axes).
**NEW TOOLS (all mutation-proven — a gate is worth what it BITES):**
- **`dict-fetch.js --locale=X --word=W`** — 🔴 **MOST AUTHORITIES CANNOT BE CURL'd**: svenska.se
  (SAOL) = a 21KB **SPA shell**; ordnet.dk (DDO) = a 202 bot-wall; **vandale.nl free is
  DISCONTINUED** ("Het gratis onlinewoordenboek is gestopt") — *every past nl brief cited a DEAD
  authority*. **Puppeteer renders them all**: sv→`gard·in substantiv ~en ~er` (real SAOL) ·
  de Duden + no NAOB fetch directly · fr Larousse→`rideau n.m.` · da/it/pt/fi render.
  ⚠ **nl + es UNRESOLVED** (Groene Boekje selector unverified; RAE renders but won't parse) —
  **fix before those waves**. This is why reviewers wrote "I cannot verify from memory" 100+ times.
- **`check-row-coherence.js --self-test` (13 proven/0 blind)** — asks what NO other gate asked:
  *does the row still MAKE SENSE?* Every old gate counted keys ("N moved") and passed while I
  shipped a plural in a singular slot. **ATOMIC PER KEY: any field held → no field ships.**
- `build-classification-sot.js` → `classification.json` (1263 keys; 193 image-verdicts + 1070
  inferred countable because **en having a DISTINCT plural proves the picture is one countable
  thing**). ⚠ those 1070 are `image_checked:false` — **not a clean bill; the 193 were 20% mismatched**.
- `apply-classification-strip.js` — deletes only; never writes a word.
**⚠ NEXT SESSION MUST FIX FIRST:** `verify-vocab-diff.js` ARITY (`:90`) is unconditional → now
fails on the arity-2 non-nouns; drive it from `classification.json` (+ its self-tests `:188-189`).
**OPERATOR DECISIONS PENDING (art, not words):** the 38 lemma mismatches (fix the WORD or the ART?)
· the 2 broken themes (~13 keys, one decision) · asset bugs: `pretzels`=ONE pretzel, `potato-chips`=a
sealed bag, `muscles`=a whole person · dead keys yogurt/medical-gloves/skeptical/ice-skating.
**22 PLURAL-PICTURE keys DEFERRED to natives** — my first strip flattened p→s and was BACKWARDS half
the time (`blocks` de `["Bauklotz","Bauklötze"]` → would have written *Bauklotz*, labelling SEVERAL
blocks with the word for ONE, destroying the de arc's known `blocks`=Bauklötze finding). **The
direction differs BETWEEN LOCALES OF ONE KEY** (`sandals` de needs s:=plural; `sandals` da needs p:=s).
**INVERSE TRAPS — correct data a naive rule would DESTROY:** EN zero-plurals (fish/angelfish/sheep)
are COUNTABLE → de *Kaiserfisch→Kaiserfische* is RIGHT · EN pluralia-tantum over ONE object
(pants/scissors/stairs) → de *Hose→Hosen, Schere→Scheren, Treppe→Treppen* RIGHT; the real cut is
one-object vs a genuine two-object PAIR (sandals/slippers ARE pairs) · **`glasses`≠`glass`** (specs
vs a drinking vessel — `sister_singular_key` is EVIDENCE, not a verdict; trusting it kills
*Brille→Brillen*) · `soccer`/`tennis` = the SPORT (separate `soccer-ball` keys own the object;
Duden *das Tennis*, kein Plural) but `volleyball` = the BALL (no such key) — same `_type`, opposite
verdicts, on evidence · `raw_countable:false` is WRONG on asparagus/cheese/broccoli/celery, right on
Knoblauch. **fr `venus`=`m` but Vénus is FEMININE; fr `mercury`=`f` but Mercure is MASCULINE** (live).

## The root cause (why the whole arc exists)
**No human ever wrote these plurals.** `scripts/build-image-vocabulary.js` synthesizes all
13,893 (1,263 keys × 11 locales) from the singular by rule — *"literal set → suffix match →
naive default"*. The defaults ARE the bug: de `-el/-er/-en` left unchanged · nl gender is an
unconditional `return 'd'` · sv/da/no blanket zero-plural for neuters · fi agglutination
unmodeled ("corrections will override if wrong").
**The fingerprint:** every gendered locale skews toward the builder's own default —
nl 86% `d` (vs ~67% real), sv 87% `n`, da 85%, no 85%, de 51% `m` (vs ~46%).

## Operator rulings (locked)
1. Scope = **plural + gender + singular** (one read, three fields; fr/es/pt/it genders were NEVER audited).
2. **DE first end-to-end for approval**, then fan the other 10.
3. Fix **the data AND the wall** (teach PWW "no plural" vs "genuinely same word").

## STATUS: **de + nl + sv COMPLETE & LIVE**. NEXT = the operator's call among da / no / fi / fr / es / it / pt
- **de** (2026-07-17, 118 corr): `92dc275d` plural 52 · `5f976993` gender 55 · `69ee10ea` singular 11 · `b927a145` tooling.
- **nl** (214 corr): `a2975ccf` plural 148 · `e843ff9e` gender 66 · `c87b5630` index+artefacts.
- **sv** (2026-07-17, **201 corr**, 1263/1263 read, 168 held): `4a132a26` safety-gate · `677ade62`
  briefs+batches · `162cf9ef` self-test un-rot · `6dffa315` verdicts · **`0316e8a1` plural 166** ·
  **`3206c36d` gender 18** · **`b3a109fc` singular 17** · `53381b69` PWW+diacritic-gate.
  All 4 layers verified at the ORIGIN (git → /opt → served vocab → served PWW index all IDENTICAL).
**Recommended next = da or no** (Nordic siblings; sv now arms their N4 cross-locale net, and the
sv render/rule knowledge transfers). fi is the blindest (self-admitted unmodeled agglutination,
N8 a permanent no-op, no siblings, no norm). es/fr/it/pt genders were NEVER audited.

## 🔴 THE POPULATION NORM OVER-PREDICTS ~4-8x — do NOT size a wave from it (sv, 2026-07-17)
`nets.js GENDER_NORMS` predicted **146** miscoded sv genders; the natives confirmed **18**.
nl: predicted ~237 → shipped 66. **The norm is a GENERAL-language common-gender share (75%)
applied to a CHILD PICTURE-NOUN corpus** — animals, people, everyday objects — which skews
naturally to en-words. sv's observed 86.5% may simply be CORRECT. The reviewers refused in
writing to redistribute to hit the percentage (batch 12: *"I did not redistribute genders"*;
batch 10 reported 110 OK *"as a control, not as 'all fine'"*) — which is why the 18 is
trustworthy. **Read da's 128 and no's 131 as population curiosities, NOT work estimates.**
The real damage is on the PLURAL axis (sv: 166 of 201).

## 🟡 THE CDN LAYER — a 4-hour edge cache masks BOTH a good and a bad deploy (2026-07-17)
`/worksheet-generators/js/image-vocabulary.js` is served with **`Cache-Control: public,
max-age=14400` (4 HOURS)**. After the nl sync I curled the public URL and saw the OLD Dutch —
`Cf-Cache-Status: HIT`, `Age: 3453` — i.e. Cloudflare was still serving the copy cached by the
**de** deploy 58 min earlier. **The deploy was fine; my verification was wrong.** The origin was
byte-identical to the repo.
**FORWARD RULE: verify a vocab deploy AT THE ORIGIN over ssh, not through the public URL** —
`cmp 'REFERENCE TRANSLATIONS/image-vocabulary.js' /var/www/lcs-media/worksheet-generators/js/image-vocabulary.js`.
If you must curl, read `Cf-Cache-Status` + `Age` first: a HIT on a stale object looks EXACTLY like a
failed deploy (false negative) — and, worse, a HIT on a *fresh-enough* object can look like a
success when the sync silently failed (false positive; this is how the §14.6 two-step gap hid).
**No purge path exists** (confirmed: no CF token in `.deploy-env`/`.env.production`, nothing calls
purge_cache; §15.8 "no purge-API"). The edge self-heals within 4h — acceptable, since the vocab is
read at worksheet-GENERATION time, not per page view. So: **4 layers where "shipped" ≠ "live"** —
git → /opt (git pull) → /var/www served (the §14.6 TWO-STEP) → **the Cloudflare edge**.

## 🔴 THE DEPLOY DISCOVERY — ~378 prior gender corrections were NEVER LIVE (fixed 2026-07-17)
The SERVED copy at `/var/www/lcs-media/worksheet-generators/js/image-vocabulary.js` was frozen at
**2026-04-27** — it still had `bone/vest/trail nl:'d'` while the repo has had `'h'` since
`c7de1a40` (May). **So the entire May-June gender arc (~378 corrections: nl-66, de-51, no-121,
sv, da) sat in git for ~2.5 months and never reached a single generated worksheet.**
**ROOT CAUSE — a wrong doctrine, now corrected:** [[project-de-nl-gender-audit-complete]] recorded
*"no deploy (gender is generation-time reference, not a live per-request surface)"*. **That is
FALSE.** The 29 apps are SERVED from `/var/www/lcs-media/worksheet-generators/` and load
`js/image-vocabulary.js` **from there** at generation time — generation-time IS a live served
surface. **FORWARD RULE: every image-vocabulary.js change REQUIRES the §14.6/§A.4 TWO-STEP** —
`deploy.sh` updates `/opt/lessoncraftstudio/REFERENCE TRANSLATIONS/` but NOT the served copy
(which is `chattr +i` immutable):
```
cp 'REFERENCE TRANSLATIONS/image-vocabulary.js' /tmp/image-vocabulary.js
/var/www/lcs-media/scripts/update-worksheet.sh /tmp/image-vocabulary.js js/image-vocabulary.js
```
(the helper documents the `js/` subdir form itself; it unlocks → copies → re-locks). Then verify
the CONTENT live, not the byte size. Today's deploy shipped those 378 + the new 118 together.

## 🟢 sv-specific structure worth carrying to da/no (they share the builder's shape)
- **GENDER AND PLURAL ARE COUPLED in the Nordic builders** (nl's were independent). `genderSv` and
  `pluralizeSvSingle` both branch on the SAME hand-written `SV_ETT_WORDS`/`SV_ETT_SUFFIXES`, so
  **one missing list entry breaks TWO fields**. Confirmed 8x, both directions: absent → false `n`
  + `+ar` (camp/fig/oyster/parasol/outlet…); spurious suffix hit → false `t` + zero plural
  (garden-fork ends *-rep*, hemlock-tree ends *-lock*, both dinosaurs end **-hus**).
  ⚠ The coupling is **PARTIAL**: genderSv also tests `-eri/-ande/-ende/-um/-ment` while the
  pluraliser tests `-are/-ande/-ende`, so they can disagree inside one script (fiskakvarium).
  `genderDa`/`genderNo` have the identical shape → expect the same class.
- **`n` = e`n`-ord (utrum), `t` = e`tt`-ord (neuter). `n` does NOT mean neuter.** Put this in the
  brief prominently — misreading it inverts a whole batch.
- **N8 is split BOTH ways, never judge it as a class**: consonant-final ett-words → zero plural is
  RIGHT (hus/barn/träd/bord/djur; also `-are` neuters, ankare/ankare); vowel-final take `-n` and the
  builder gets them WRONG (ansikte→ansikten, piano→pianon). Ask what sound the word ends in.
- **The stress rule (my brief got this wrong; a native corrected it):** UNSTRESSED final vowel → `-n`
  (ansikte→ansikten, knä→knän); **STRESSED** final vowel → `-er` (paraply→paraply**er**, geni→genier).
  The adversarial pass narrowed it again: native monosyllable (`-n`) vs polysyllabic final-stressed
  loan (`-er`). My literal rule would have shipped *paraplyn.
- **The `-ar` default swallowed the whole 3rd declension** (ambulans→ambulanser, antilop→antiloper,
  paj→pajer) — 541/1263 keys had BOTH defaults fire. But `-ar` is often RIGHT: Stegosaurus**ar** is
  correct (Swedish Latin `-us` loans take `-ar`, kaktus→kaktusar) — do NOT import the German
  `-saurus→-saurier` rule. Also correct + left alone: smörgåsar (not *smörgäss), astrar, cedrar,
  illrar, mixrar, baglar, ekorrar, Tallrikar, Robotar.
- **A FALSE PREMISE to never reuse:** *"an utrum noun cannot have a zero plural"* — FALSE
  (*en musiker → flera musiker*; the data's own `mechanic` = Mekaniker/Mekaniker proves it). It
  appeared in 3 `why` texts; two reviewers caught it independently.

## 🔴 DIACRITIC LOSS INTO A DIFFERENT REAL WORD — the class no script can see
`beanie` = **"Mossa"** (mossa = MOSS, the plant; want *mössa*) · `octopus` = **"Blackfisk"**
(bläck = ink) · `sink` = **"Diskbank"** (want *diskbänk*) · `kangaroo` = **"Kanguru"** ·
`lilac` = **"Syrén"** (spurious accent — the class runs BOTH ways). The lemma exists, arity is fine,
spellcheck passes → **896/1263 sv singulars carry no å/ä/ö at all**, so it cannot be narrowed
mechanically. Only a native reading the word against its picture finds it. Corroborates §A.7.
**AND IT REAPPEARED IN THE CORRECTIONS THEMSELVES** — 4 proposals arrived stripped (purse
"Portmonnaer", push-pin "Haftstift", sauce **"Saser"** (⚠ "sas" is a real string, looks fine),
scrubs "Sjukhusklader"). Proof it was an ENVIRONMENT ARTIFACT not a judgement: `scrubs` and
`hospital-gown` are one lemma with identical rows and the SAME reviewer wrote "Sjukhuskläder" for
one and "Sjukhusklader" for the other. **Now permanently gated** →
`scripts/vocab-audit/check-correction-diacritics.js --locale=<loc>` (`--self-test`: 10 proven,
0 blind; locale-agnostic; `--locale` required, no default). de/nl re-checked: 0 suspects, clean.
⚠ **Scope discipline: it gates PLURAL-vs-its-own-singular only** (decidable, internal consistency).
A singular diacritic change is NOT decidable (`Syrén→Syren` right vs `Mössa→Mossa` wrong are the
same shape) — the first draft false-positived on lilac; **the fix was to narrow WHAT is measured,
never to loosen the threshold.**

## Homographs where the PLURAL (not the gender) is the meaning — the sv Kiefer class
`wave` "Vågar" = plural of *våg* the WEIGHING SCALE (beach needs *vågor*) · `mask` "Maskar" = the
WORMS' plural on a face mask · `oak-tree` "Eker" = a wheel SPOKE (tree = *ekar*) · `pottery`
"Keramiker" = the POTTER, a person · `cape` "Kapa" = a VERB (to hijack). Correctly NOT touched:
`beech-tree` ["Bok","Bokar"] is right (tree = bokar, book = böcker) though N6 flags it.

## The pipeline (`scripts/vocab-audit/`)
`build-dossier.js` → `nets.js` → **BRIEF-<loc>.md** (one file, quoted verbatim by every batch —
zero drift) → 12 native batches (~110 keys) → `merge-verdicts.js` (coverage assert) →
**adversarial re-verify** (BRIEF-<loc>-reverify.md) → `apply-reverify.js` → `apply-corrections.js
--field=X --apply` → `verify-vocab-diff.js --expect=N` → **commit** → next field.
Then `build-pww-index.js` + `verify-picture-word-wall.js`.

## Hard-won rules
- 🔴 **NEVER run `build-image-vocabulary.js`** — now GUARDED (refuses; exit 1). It would delete
  17 hand-added keys (raw 1246 vs built 1263), revert ~378 shipped gender corrections, and
  re-introduce a fixed `window.ImageVocab` bug. The built file is hand-maintained canonical.
- **THEMES are the load-bearing field.** The vocab is keyed FLAT; the noun's subject lives only
  in the filesystem. Without it `orange`/`salt`/`pepper`/`painting` are undecidable. Recover via
  the `build-pww-index.js` walk.
- **The DB is NOT in play** — `image_library_items.translations` holds scalar SINGULARS only;
  nothing syncs JS→DB; deploy.sh healing can't touch plurals. (§A.7's framing misleads here.)
- **Commit BETWEEN field waves** — the gate diffs the working tree vs HEAD, so an uncommitted
  wave 1 makes wave 2's gate correctly fail.
- **After ANY vocab edit: rebuild the 11 PWW indexes** or `verify-picture-word-wall.js` fails
  by design (it caught this: 123 errors → rebuild → 32,890 SoT asserts clean).
- **Blast radius**: 4 apps (find-and-count, prepositions, more-less, chart-count) + 7 material
  generators + PWW + **9 `scripts/seo-landing/gen-*-chartcount.js` that bake plurals into
  COMMITTED landing HTML with no gate** — re-running them collides with the §21.5a CHURN
  FREEZE (until ~2026-09-01). OPEN, surfaced not absorbed.
- `it` PWW article selection is PHONOLOGICAL (`PWW_PICK.it` reads the word) — an it plural whose
  initial sound changes silently changes its article. Re-verify at the it fan-out.

## The three-way catch (the argument for this method)
Each caught what the others structurally could not:
1. **5 native reviewers caught MY brief error** — I cited `Kugel→Kugeln` as a defect; it's
   correct per Duden (I inverted the recon's meaning). They contradicted me in writing rather
   than obeying. Scripted check: ZERO regressions landed. → the brief now says **Duden outranks
   the brief**. This is the [[feedback-es-fanout-autocommit]] "never paraphrase a rule into a
   brief — quote it" rule, violated again. **The BRIEF-<loc>.md-on-disk pattern is the fix.**
2. **The ensemble caught MY merge schema** — it rejected `PLURALIA_TANTUM` on the singular
   field as meaningless; `french-fries`/`leggings`/`shorts`/`us` have NO singular, so the field
   rightly holds a plural. My assumption-as-validation would have discarded 4 true findings.
3. **I caught the ensemble** — `hair→Haar` / `pasta→Nudel` are formally right but misname the
   picture (both `_countable:false`). Escalated. (My `painting` doubt was WRONG — themes said
   `activities`, so *das Malen* is right. My `ice-cream` doubt was overruled by Duden.)

## The adversarial second pass earns its cost — it is NOT optional
2 REJECTs = 2 defects that would have shipped: `lego` (Duden: *das Lego, Plural: die Legos* —
the "fix" would have DELETED an attested plural) · `lettuce` (Duden marks the DEPICTED sense
"ohne Plural"). **7 ESCALATEs incl. 5 sister-key duplications the first pass MISSED**
(`peas`/`pretzels`/`sneakers`/`ice-skates`/`shoes` would become field-identical to the existing
`pea`/`pretzel`/`sneaker`/`ice-skate`/`shoe` while labelling DIFFERENT pictures).
`hot` m→n ESCALATED: "n" is as invented as "m" (*das Heiß* isn't a noun); it was **the only
correction with an empty `src`**, and 21 identical adjectives carry the same default untouched —
fixing one of 22 makes the data LESS consistent. **A guessed value + an empty source is a tell.**

## The best find (unreachable by any automated check)
**`pine-tree` = `["Kiefer","Kiefer","m"]` — the entry held the JAWBONE.** *Die* Kiefer = the pine;
*der* Kiefer = the jaw. A homograph where the gender IS the meaning. Only a native reading the
word against its picture finds this.
Others: `Kakten`/`Brezelne`/`Küchenchefe`/`Onkel Same`/`Bügelbrette` (invented words) · `farmer`
Bauer→**Bauern** (the -er default on a weak noun) · `octopus` **Kraken**→Oktopusse (Kraken is the
plural of *Krake*, a different animal) · ~25 × "der Backen" (substantivized infinitives are
always neuter) · `venus` der→**die**.

## Class rules the natives established (apply, but NEVER blindly)
- substantivized infinitives + colour-names → **always neuter** (das Backen, das Blau).
- `-saurus` → `-saurier` (Duden). **BUT NOT** `carnotaurus` (lat. *taurus*), `triceratops`,
  `velociraptor` (→ `-oren`, like Traktor), `parasaurolophus` (gr. *lóphos*). The ensemble
  refused to over-apply its own rule — that discrimination is the quality bar.
- "plural in the singular field" is a real class (`blocks`=Bauklötze) — but check for a sister key first.

## Open / operator's call — sv (168 held; the de list follows below)
- **ONE CLASS DECISION, now raised by BOTH de and sv independently:** adjectives / infinitives /
  pluralia tantum have **no lexical gender**, so the code there is meaningless and sometimes
  harmful — sv `run`/`running` = "Springa" + `n` asserts *en springa* = **A SLIT/CRACK**;
  `knitting` + `n` = *en sticka* = **A SPLINTER**; jeans/leggings emit *"en jeans"*. The German
  arc's `hot` + 21 adjectives is the same item. Fixing 1 of N makes the data LESS consistent.
- **`parallelogram` questions a SHIPPED decision** (`cedb564e` n→t): a reviewer argues utrum *en
  parallellogram* (from *grammé* "line") unlike the neuter *gramma* words (diagram/program). HELD,
  not applied — the conflict gate + blind-review design worked.
- **Sister-key duplication** (same class as de's 5): `cookies`/`crayons`/`curtains` corrected rows
  become BYTE-IDENTICAL to existing `cookie`/`crayon`/`curtain` while labelling a DIFFERENT picture.
- **One key, two pictures** — `crane` (themes carry BOTH birds_2 + vehicles; data has only *Trana*,
  the bird) and `cricket` (insects + sports) — **the exact two keys the de arc holds**. Also `stamp`
  (classroom + post_office: *stämpel* utrum vs *frimärke* NEUTER — both other fields ride on it) and
  `violet` (s = the colour, p = the flower).
- **Wrong referent, correct Swedish**: `fireplace` (*spis* = kitchen STOVE) · `sled` (*släde* =
  horse-drawn sleigh) · `snail` (*snigel* = slug) · `firefly` (*eldfluga* is a calque; = *lysmask*) ·
  `evergreen` (*vintergröna* = Vinca/periwinkle) · `juniper-tree` (*En* — correct but IS the
  indefinite article: "en en").
- ⚠ **`hospital-gown` KEEPS its fabricated "Sjukhuskläderar"** — escalated on a LEMMA question (a
  gown is *patientskjorta*), so it now DIVERGES from its just-fixed byte-identical sister `scrubs`.
  The form fix alone would strictly improve it. Flagged rather than scope-crept.
- **A fabricated citation**: `deinonychus` cited `src:"SAOL"` for a word SAOL lacks, while its twin
  `parasaurolophus` honestly used `src:""` for the identical claim — the de `hot` tell exactly.
- `muffin` (lemma selection carrying the de `lego` risk) · `persimmon` (`-on` is a genuinely split
  class: native fikon/ostron → neuter zero vs loan citron/melon → utrum `-er`) · `chicken`/`chick`
  both speak *Kyckling* (two pictures, one word; adult bird = *Höna*) · coupled-field gaps at
  `muscles`/`sandals`/`vegetables` (plural fixed, no singular → row lands s=p, falsely encoding
  "no plural"; want Muskel/Sandal/Grönsak) · `native-american` = *Indianer* dated (Språkrådet —
  **the de arc flagged the same**) · `sphere` — sv K-3 geometry says *ett klot*, not *sfär*.
- Pre-existing duplicate rows (NOT created by the fixes): parasol≡beach-umbrella, pliers≡tongs,
  rosette≡bow, swimsuit≡bathing-suit, santa≡santa-claus.

## Open / operator's call — de
- **97 held**: `deer` (Hirsch vs Reh — two animals in one entry), `crane` (Kranich vs Kran),
  `cricket` (Grille vs Kricket), `pepper` (Paprika vs Pfeffer), `violet` (Violett vs Veilchen),
  the 5 sister-key duplications, `hair`/`pasta`, `hot`+21 adjectives (needs ONE class decision).
- **~50 keys are DEAD DATA** — no image resolves to them (`t-rex` vs file `tyrannosaurus_rex`;
  `salad`/`octagon`/`yogurt` have no art). 4% of the corpus; corrections there reach no child.
- **PWW `sp` "Same word!" still lies for mass nouns** (water) — the nopl/sp split via raw
  `_countable`/`_type` is DESIGNED + operator-approved but NOT BUILT.
- Operator content calls: `jacket`="Chaqueta"→*chamarra* (Mexican albur, spoken aloud);
  `native-american`="Indianer" dated; it composer "centotre"→"centotré".
- `frontend/scripts/audit-image-vocabulary-gender.js` LOCALE_RULES is stale (`nl:['d','n']`) —
  don't extend it without fixing the table.

Cross-refs: [[project-de-nl-gender-audit-complete]] (the 378-correction prior art; doctrine +
commit shape, ZERO committed tooling — that gap is now closed), [[project-premium-tools-program]]
(PWW = tool #12, the consumer that surfaced this).
