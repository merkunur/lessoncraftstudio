# G1-399 `sink-or-float` : PEDAGOGY + CONTENT (nt5-F b6, 2026-09-23)

Read: `_ROLE-PEDAGOGY.md`, `_STUDIO-BRIEF.md`, `_SUBSTRATE.md` (delta + nt10-E sheet), `_PANEL-FINDINGS.md` (lock row 4 + sink-or-float faces + cross-panel rulings 2/5/6/7), `_BUILD-BRIEF.md` (nt10-E landing-audit classes), the sink-or-float sections of `_work/_selection-{pedagogy,seo-germanic,seo-romance,seo-nordic}.md`, `_records/v2/harvest-candidates.<loc>.json` (the re-probe), `types/g1/G1-204-sink-float.js` + `data/science/sink-vs-float.json` + `i18n/strings.<loc>.json["G1-204"]`, `primitives/balance.js` (header), `templates/components-b3/read-and-do.js truthChips/drawBox`, `frontend/lib/seo/strand-names.ts` (`Science` row), `frontend/config/topics-taxonomy.json` (`apps["sink-or-float"]` + `axes["exercise-type"]["sink-or-float"]`, registered en-only by `8999f964`), `scripts/seo-landing/gen-b5-landings.js LEVEL_KEYS`. (m) = measured 2026-09-23 by read-only node (`lib/b2-common.js entriesFor`, `cache/manifest.json`, `lib/b3-common.js bank('instructions')`) or by OPENING the picture: contact sheets `scratchpad/G1-399-float.png` (25 float candidates), `G1-399-ped-sinkset.png` (30 sink candidates), `G1-399-ped-more.png` (25 more), `G1-399-ped-ship.png` (10 vessels), every one read with the Read tool from `cache/themes/<theme>/<noun>@3x.webp`. *est.* = engineer measures in the real render. No em-dashes.

**Boundary (load-bearing).** G1-204 (`science-sort`, spec slug `sink-or-float`, bank `data/science/sink-vs-float.json`, m) already ships the plain two-bin line-sort of 12 pictures ("Draw a line from each object to the group you think it belongs to") under the titles en "Sink or Float?" · de "Schwimmt oder sinkt?" · es "¿Se hunde o flota?" · pt "Afunda ou Flutua?" · fr "Flotte ou coule ?" · it "Galleggia o affonda?" · nl "Zinkt het of drijft het?" · sv/no "Sjunker eller flyter?" / "Synker eller flyter?" · da "Synker eller flyder?" · fi "Uppoaa vai kelluu?" (m). Its plastic spoon was replaced by `tools/bolt` today (m: bank now boat duck ball apple leaf feather | rock key **bolt** scissors hammer fork); its `animals/duck` is still a living animal (not ours to fix). K-211 hot/cold, K-214 natural/man-made and recycling G1-364 "what is it made of" / G2-348 odd-one-out-by-material own MATERIAL identification; G1-341 read-and-check owns generic true/false reading. Therefore `sink-or-float` **never ships a sort into float/sink bins, never asks "what is it made of", never reuses a G1-204 title string (with or without its "?")**, and its base slug is `sink-or-float-experiment` (the taxonomy KEY `sink-or-float` is a different namespace, m). It owns the INQUIRY: (1) the prediction held next to the result (predict · test · record), (2) the misconception "heavy sinks, light floats" confronted with visible weight, (3) SHAPE changing the outcome of one material, (4) reasoning about claims in sentences, (5) the pre-writing drawn record (K), (6) the full write-up of one controlled question (G3). **The one rule that locks the type: every float/sink outcome on every page is a row of the hand-read CLAIM table (below), keyed by (theme, noun), with `picOpened:true`; only `confidence:'high'` rows reach a closed face and only `testable:true` rows reach a page the class tests in a tub; the code never infers, and no page prints any outcome.**

## A. Identity

| loc | genre head (panels) | school year (base / shipped level, data) | national strand (framework NAME) | CCSS (en only, honest) |
|---|---|---|---|---|
| en | sink or float experiment · "will it sink or float" | grade 1 (en K demand 19 vs 1st 6 lives on F5) | Science (NGSS K-2 practice "plan and carry out investigations"; 2-PS1-1 readiness) | none (no CCSS for science; no NGSS K-2 buoyancy PE) |
| de | Schwimmen und Sinken (Versuch) | 1. Klasse (Kl 1 centre of the tail, m) | Sachunterricht (Perspektivrahmen, naturwissenschaftliche Perspektive) | - |
| es | flota o se hunde · objetos que flotan y se hunden (v2 m) | preescolar (every es school string is preescolar, m) | Conocimiento del Medio (SEP/NEM, Exploración y comprensión del mundo natural) | - |
| pt | afunda ou flutua · o que flutua e o que afunda | educação infantil (tail) | Ciências (BNCC; EF01CI01 comparar materiais is the nearest code, panel verifies) | - |
| fr | flotte ou coule · ça flotte ou ça coule | CP (eduscol démarche "je prévois, je vérifie") | Questionner le monde (programmes officiels, la matière) | - |
| it | galleggia o affonda · cosa galleggia e cosa affonda | classe prima ("esperimento galleggia o affonda") | Scienze (Indicazioni nazionali) | - |
| nl | drijven en zinken (proefje) | kleuters (groep 1-2 is the tail centre, m) | Oriëntatie op jezelf en de wereld (SLO kerndoel 42) | - |
| sv | flyta eller sjunka (experiment) | åk 1 | Naturorienterande ämnen (Lgr22 NO åk 1-3) | - |
| da | flyde eller synke (forsøg) | 1. klasse | Natur/teknologi (Fælles Mål) | - |
| no | flyte eller synke (forsøk) | 2. trinn (Nordic +1) | Naturfag (LK20) | - |
| fi | kelluuko vai uppoaako (kokeilu) | 1. luokka | Ympäristöoppi (OPS 2014) | - |

**Level is DATA per locale** (`LEVEL_BY_LOC[face][loc]`, band key into `LEVEL_KEYS`): base = en G1 · de G1 · es **K** · pt **K** · fr G1 · it G1 · nl **K** · sv G1 · da G1 · no G1 · fi G1. Faces keep their band everywhere (F2 G1 · F3 G2 · F4 G2 · F5 K · F6 G3) except none. Where base and F5 both land on K (es/pt/nl) their heads differ (predict-and-test vs draw), see E.

**Theme axis: OFF** (`themeAxis:{applicable:false}`, landings `coordinate.theme:''`). Pictures are FIXED (theme, noun) rows of the claim table, never a fanned theme. **No `unitAxis`.** Subject `science`, strand key `Science` (row exists ×11 in `strand-names.ts`, m).

### The CLAIM table (hand-read truth; every row OPENED this session)

Result = plain cold/room tap water, object dropped in whole and dry. `testable` = a teacher can put it in a classroom tub. `use` = which faces may carry it.

**FLOAT, high confidence (15 rows):**

| # | picture (opened) | what the art shows | material | result | conf | why unambiguous | testable | use |
|---|---|---|---|---|---|---|---|---|
| F-a | `toys/ball` | football (black/white panels) | inflated bladder | float | high | sealed air; cannot fill | yes | base F2 F4 |
| F-b | `camping/log` | cut log, ring grain | dry wood | float | high | wood < water | yes (a short log / stick) | base F2 F4 |
| F-c | `fruits/apple` | whole red apple, leaf | fruit, ~25 % air | float | high | classic, every tub test | yes | base F2 F4 |
| F-d | `fruits/lemon` | whole lemon | thick air-filled peel | float | high | whole, peel on | yes | base F2 |
| F-e | `fruits/banana` | whole unpeeled banana | fruit | float | high | whole, peel on | yes | base F2 |
| F-f | `miscellaneous/leaf` | dry maple leaf | leaf | float | high | flat, light, dry | yes | base F2 |
| F-g | `easter/feather` | feather | keratin + air | float | high | | yes | base F2 |
| F-h | `camping/pinecone` | dry cone | dry wood scales | float | high | dry cone (use this variant only; `miscellaneous|winter/pinecone` are duplicates) | yes | base F2 |
| F-i | `vegetables/pumpkin` | whole pumpkin | hollow fruit | float | high | hollow inside; large AND heavy | yes (mini pumpkin) | base F2 F4 |
| F-j | `christmas/candle` | red pillar candle, flame drawn | wax (paraffin/stearin 0.90-0.97) | float | high | solid wax; ⚠ flame drawn: the landing says "an unlit candle" | yes | base F2 |
| F-k | `classroom/pencil` | wooden pencil | wood | float | high | graphite core too small to matter | yes | base F2 |
| F-l | `toys/boat` | toy boat | hull | float | high | made to float, intact | yes | base F3 |
| F-m | `vehicles/ship` | steel ship, funnel | steel hull + air | float | high | the canonical "steel floats by shape" example | **no** | F3 F4 |
| F-n | `camping/canoe` | canoe | hull | float | high | | no | F4 |
| F-o | `fruits/orange` | whole orange, peel on | fruit, air-filled peel | float (peeled: sinks) | high only whole | peel dependence is the F6 QUESTION | yes | **F6 only** (never a closed item, the pedagogy ruling) |

**SINK, high confidence (11 rows):**

| # | picture (opened) | art | material | result | conf | why | testable | use |
|---|---|---|---|---|---|---|---|---|
| S-a | `camping/rock` | grey stone | stone | sink | high | ⚠ LABEL override: vocab = boulder/cliff in 8 locales (de Felsen · es Roca · fr Rocher · it Roccia · nl Rots · sv Klippa · da Klippe · fi Kallio, m) → `label` literal = stone (Stein, piedra, caillou, sasso, steen, sten, sten, kivi); pt Pedra / no Stein / en Rock kept (panel may say "stone") | yes | base F2 F4 F6 |
| S-b | `around the house/key` | pink metal key | metal | sink | high | any key metal | yes | base F2 F4 |
| S-c | `tools/hammer` | steel head, red/wood handle | steel + wood | sink | high | head mass dominates | yes | base F2 |
| S-d | `tools/bolt` | brass/steel hex bolt | metal | sink | high | solid metal (G1-204's new item) ⚠ drawn LARGE in the art: always rendered smaller than its partner | yes | base F2 F3 |
| S-e | `tools/pliers` | steel jaws, plastic grips | steel | sink | high | | yes | base F2 |
| S-f | `classroom/scissors` | steel blades, blue plastic handles | steel + plastic | sink | high (flag) | blades visible; the gate's panel re-checks | yes | base |
| S-g | `kitchen tools/fork` | metal fork, green handle | stainless + plastic | sink | high (flag) | as G1-204 | yes | base F2 |
| S-h | `vegetables/potato` | whole potato | starch | sink | high | density ~1.08 in tap water | yes | base F2 F4 |
| S-i | `accessories/ring` | gold ring, gem | metal | sink | high | | yes | base F2 |
| S-j | `classroom/eraser` | rubber/PVC block | rubber | sink | high | density 1.2-1.6; the de tail asks it ("schwimmt oder sinkt ein radiergummi", m): the light thing that sinks | yes | base F2 F4 |
| S-k | `around the house/hammer` | hammer | steel + wood | sink | high | duplicate of S-c; use one per page | yes | base |

**EXCLUDED after opening (validator `EXCLUDED` list, each must be rejected):**
`tools/nail` (vocab `nail` = FINGERNAIL: es Uña · pt Unha · fr Ongle · it Unghia · da/no Negl · fi Kynsi, m) · `beach/driftwood` (the NAME says "floats": pt Madeira flutuante · it Legno galleggiante · fr Bois flotté, m: an answer tell) · `toys/balloon` (fr label "Ballon" = the ball's label, m; floats in air too) · `kitchen tools/sponge` (floats dry, changes as it soaks; fi "Sieni" = mushroom) · `around the house/spoon` (wooden bowl + red PLASTIC handle, mixed) · `kitchen tools/spoon` (purple plastic, unknown kind) · `toys/blocks` (wood or plastic undecidable) · `camping/oar` (plastic blade + metal shaft) · `miscellaneous/acorn` (sound acorns sink, hollow ones float) · `fruits/lime` (often sinks) · `fruits/pineapple` · `fruits/pear` (density ~1.0, varies) · `vegetables/carrot` · `fruits/grapefruit` · `At the Supermarket/melon` · `fruits/watermelon` · `fruits/coconut` (all HALVES/slices) · `At the Supermarket/egg` (a carton; fresh sinks, stale floats) · `beach/water` (sealed bottle) · `classroom/crayon` · `toys/lego` (trapped air) · `toys/dice` · `classroom/ruler` · `classroom/marker` · `classroom/paper` · `At the Supermarket/bread` (soak) · `kitchen tools/bowl`, `glass`, `cup`, `plate` (containers that fill) · `summer/surfboard` (renders as a sliver, illegible at 60 px) · `summer|beach/beach_ball` (no vocab key) · `tools/nut` (chunky red/yellow, reads as a plastic toy) · `tools/screwdriver` (handle volume) · `around the house/knife`, `kitchen tools/knife` (knives in a children's tub: safety) · `beach|summer/seashell` (concave; floats cup-up) · `around the house/lock` (fr "Serrure" = a door lock, de "Schloss" = also castle) · `accessories/medal` (floating ribbon) · `classroom/stapler`, `kitchen tools/whisk`, `tongs`, `grater` (hollow/plastic parts) · `christmas/bell` (traps air) · `vehicles/submarine` (sinks OR floats by design) · every living animal (G1-204's duck included) · `winter/ice` (cracked pool art).

**Misconception rule (binds every face):** no string, chip, title or meta ever states or implies "heavy things sink / light things float" or "it floats because it is light/small"; those appear only as FALSE sentences on F4. No "density", "buoyancy", "Archimedes", "Dichte", "densidade", "galleggiamento dei corpi" below G3 and none on any page. Salt water is never mentioned. de never pairs "schwimmt" with an animal picture (schwimmen = swim).

## B. The six faces

### Base: Predict and Test (G1, `G1-399`, layout `'table'`)
**Move:** HOLD a prediction next to the result: per object, circle a float/sink mark in the "I think" column BEFORE the tub, then in the "It did" column after. The page is the record; the tub is the answer.
**Child:** "Guess first: circle what you think. Then test each thing in water and circle what really happened." (98)
**Params:** d1 `{layout:'table', rows:4, mix:{float:2,sink:2}, cols:['think','did'], pic:72}` · **d2 (ships)** `{layout:'table', rows:6, mix:{float:3,sink:3}, cols:['think','did'], pic:64, markH:48, rowMin:92}` · d3 `{rows:8, mix:{4,4}, cols:['think','did','right']}` (d3 adds "Was I right? yes/no", unpublished). Stack d2 *est.*: column-head strip 44 + 6 × 92 + 5 × 10 = 646 ≤ 722 (677 fi: 6 × 86 + 50 + 44 = 610). Each mark cell = two drawn tank icons (object at the waterline / object on the floor, NEW tank primitive) with the chip word under each (`floatWord`/`sinkWord`), circled by the child.
**verify():** open result (no answer), structural only: stamps `data-lcs-item="<theme>/<noun>" data-lcs-result=<float|sink>` per row (result stamped for the gate, never rendered); asserts every item is a CLAIMS row with `conf:'high'`, `testable:true`, `use` ∋ base; float/sink multiset === `d.mix` (a real test gives a real mix); no two rows the same noun (S-c/S-k counted as one); rows not ordered F,F,F,S,S,S nor strictly alternating on the shipped seed; no mark pre-circled; no outcome word in a row.
**Refusals:** none.
**Query face:** the bare head + experiment: en "sink or float experiment worksheet" · de "Schwimmen und Sinken Versuch Klasse 1" · es "flota o se hunde preescolar" · fr "flotte ou coule CP" · nl "werkblad drijven en zinken kleuters".

### F2: Heavy or Light? (G1, G1-4xx TBD, CODE `layout:'scale'`)
**Move:** SEE the weight, then judge floating anyway: each row is a two-pan balance (`primitives/balance.js`, pictures overlaid on `panRects`) with the heavier pan DOWN; the child circles the object that floats. Weight is made visible so the misconception is tested, not assumed.
**Child:** "The scale shows which one is heavier. Circle the one that floats in water." (74)
**Params:** d1 `{layout:'scale', rows:3, mix:{heavyFloats:2, lightFloats:1}}` · **d2** `{layout:'scale', rows:4, mix:{heavyFloats:2, lightFloats:2}, pic:64, balanceW:300, balanceH:130, rowMin:150}` · d3 `{rows:6, mix:{3,3}}`. Stack *est.*: 4 × 150 + 3 × 12 = 636 ≤ 722.
**⚠ Ruling on the lock wording "(the bigger thing floats)":** a page where the bigger/heavier object ALWAYS floats teaches a new false rule ("big things float") and is solvable by size alone (the nt10-E group-size tell). d2 therefore carries 2 rows where the HEAVIER, BIGGER object floats (the misconception breaker; row order shuffled) and 2 where the lighter floats; a weight strategy and a size strategy each score exactly 50 %. The face still owns "heavy or light" and still shows big heavy floaters in every page. Critic to confirm.
**PAIRS (authored; mass order hand-read, true in all 11 countries):** heavyFloats: P1 `vegetables/pumpkin` vs `vegetables/potato` (both vegetables: the strongest pair) · P2 `camping/log` vs `tools/hammer` · P3 `toys/ball` vs `around the house/key` · P4 `fruits/apple` vs `accessories/ring` · P5 `christmas/candle` vs `classroom/eraser` · P6 `fruits/banana` vs `kitchen tools/fork`. lightFloats: Q1 `classroom/pencil` vs `tools/hammer` · Q2 `easter/feather` vs `camping/rock` · Q3 `miscellaneous/leaf` vs `tools/pliers` · Q4 `camping/pinecone` vs `vegetables/potato`. Draw size follows mass class (floater visibly LARGER in P rows, smaller in Q rows; bolt never used because its art is huge).
**verify():** stamps `data-lcs-pair=<id> data-lcs-floats=<L|R> data-lcs-heavier=<L|R> data-lcs-tilt=<left|right>`; re-derived from PAIRS + CLAIMS: exactly one float + one sink per row (by claim result, not by pair order); `tilt` side === `heavier` side; count(heavier===floats) === `d.mix.heavyFloats`; floater side L/R 2/2 per page and not alternating/constant on the shipped seed; pooled over 400 seeds the floater-on-heavier-pan share is 50 % ± 5 and floater-left share 50 % ± 5 (both directions); no page repeats a noun; nothing pre-circled.
**Refusals:** none (no words on the body besides the instruction).
**Query face:** "does heavy sink" / "heavy or light sink or float" · de "schwer oder leicht schwimmt" · es "¿pesado o ligero?" · sv "tungt eller lätt".

### F3: Change the Shape (G2, G2-3xx TBD, CODE `layout:'shape'`)
**Move:** HOLD the material fixed and change only the shape: row 1 "same clay" ball → circle float/sink; row 2 the same clay as a boat → circle; row 3 transfer: a steel bolt vs a steel ship (same material, pictures) → circle the one that floats; bottom: a draw box "Draw a clay boat that could carry a stone."
**Child:** "The same clay can sink or float. Circle what each shape does. Then draw a boat that floats." (91)
**Params:** d1 `{layout:'shape', rows:['clay-ball','clay-boat'], transfer:false, drawBox:true}` · **d2** `{layout:'shape', rows:['clay-ball','clay-boat'], transfer:['tools/bolt','vehicles/ship'], drawBox:{w:600,h:190}, clayPx:110}` · d3 `{+rows:'clay-boat-loaded'}`. NEW `primitives/clay-form.js` (forms `ball`, `boat`; same colour token + same stipple so "same clay" is visible; the design agents specify geometry). **Excluded form: flat pancake** (flat clay sinks slowly, ambiguous). Stack *est.*: 2 × 140 + transfer 150 + draw 190 + gaps 36 = 656.
**verify():** stamps `data-lcs-form=<ball|boat>` + `data-lcs-result` (ball sink, boat float; from the bank `SHAPES`, never computed), transfer row `data-lcs-item` + result from CLAIMS (bolt sink, ship float); both clay forms share one fill id; draw box empty; nothing circled.
**Refusals:** none; only the clay word varies (C).
**Query face:** en "make clay float" / "make it float" (v2 m) · de "Knete schwimmt / Knetboot" (v2 m: "knete schwimmt oder sinkt", "experiment knete schwimmt") · fr "la pâte à modeler qui flotte" · nl "klei laten drijven".

### F4: True or False: Why Things Float (G2, G2-3xx TBD, CODE `layout:'truth'`)
**Move:** REASON in words: judge six claims about floating, three of them the misconceptions themselves, by circling true/false (`truthChips` from components-b3 read-and-do, imported).
**Child:** "Read each sentence. Circle true or false." (41; the panel may extend with "Think about what you saw in the water.")
**Params:** d1 `{layout:'truth', rows:4, mix:{T:2,F:2}}` · **d2** `{layout:'truth', rows:6, mix:{T:3,F:3}, fontPx:18, rowMin:86, pic:56}` (each sentence may carry a 56 px picture of its object where it names one) · d3 `{rows:8}`. Stack *est.*: 6 × 86 + 5 × 8 = 556.
**TF bank (en source; truth hand-set; each sentence is true or false in all 11 countries):** T1 "A big log floats." T · T2 "A small key sinks." T · T3 "A steel ship floats." T · T4 "A ball of clay sinks, but a clay boat can float." T · T5 "A pumpkin is heavy, and it floats." T · T6 "An eraser is light, and it sinks." T · F1 "All heavy things sink." F · F2 "All light things float." F · F3 "Big things always sink." F · F4 "A potato floats." F · F5 "Only small things can float." F · F6 "A thing floats because it is light." F. **Never used:** anything with "density", salt, eggs, "a stone floats if it is small" (pumice), "a key floats if you put it in gently" (surface tension), orange peel (F6's question). Each item carries `objects:[claimIds]`; its truth must AGREE with those claims' results (validator).
**verify():** stamps `data-lcs-tf=<id> data-lcs-truth=<T|F>`; re-derived: truth === `TF[id].truth`; T/F multiset === `d.mix`; answer pattern not constant/alternating/TTTFFF on the shipped seed; pooled T-share per position 50 % ± 6 over 400 seeds; each row's text === `tf[loc][id]`; no two sentences about the same object on one page (T1 and F4 cannot both be judged by one fact twice, the nt20-C "one fact twice" class).
**Refusals:** none.
**Query face:** "why do things float" / "sink or float explanation" (m) · pt "por que flutua" · fr "pourquoi ça flotte ou ça coule" (v2 m) · sv "varför flyter saker".

### F5: Draw What Floats and Sinks (K, K-3xx TBD, CODE `layout:'draw'`)
**Move:** RECORD by drawing, no reading: two drawn tanks (waterline + floor), the left labelled with the float mark + word, the right with the sink mark + word; the child draws one object at the waterline of the first and one on the floor of the second, after the class test.
**Child:** "Draw one thing that floats on the water and one thing that sinks to the bottom." (79)
**Params:** d1 `{layout:'draw', tanks:2, hint:true}` (a dotted hint picture in each tank) · **d2** `{layout:'draw', tanks:2, hint:false, tankW:300, tankH:420}` · d3 `{tanks:4, twoEach:true}`. Stack *est.*: 420 + caption 48 = 468; the rest is whitespace or tanks grow `minmax(420px,1fr)`.
**verify():** open, no answer: asserts two tank primitives with `data-lcs-tank=<float|sink>`, waterline present, both tanks empty (no picture, no `<text>` inside the water), captions === `floatWord/sinkWord[loc]`, tank ≥ 280 px wide (K floor 56 is far exceeded).
**Refusals:** none.
**Query face:** K "sink or float kindergarten / preschool" (en K ×19, m) · fr "ce qui flotte et ce qui coule maternelle" · es "objetos que flotan y se hunden para colorear / preescolar" (v2 m) · pt "flutua ou afunda desenho" · sv "flyta eller sjunka förskoleklass".

### F6: My Sink or Float Investigation (G3, G3-4xx TBD, CODE `layout:'report'`)
**Move:** WRITE UP one controlled question as a scientist: question → I predict → what we used (pictograms) → what happened (circle marks per condition) → I learned (lines). The only face with a variable held fixed and changed.
**Child:** "Pick a question. Write what you think, test it, circle what happened and write what you learned." (96)
**Questions (2 printed, the child ticks one box):** Q-orange "Does an orange float with its peel? Does it float without its peel?" (`fruits/orange`, opened; sv v2 "experiment flyta sjunka apelsin", m) · Q-cargo "How many stones can a clay boat carry before it sinks?" (clay-form boat + `camping/rock`). Materials pictograms: drawn tub (tank primitive), the question's pictures. **Salt water, eggs, foil: never** (no art or excluded).
**Params:** d1 `{layout:'report', questions:1, lines:2}` · **d2** `{layout:'report', questions:2, predictLines:2, learnLines:3, glyphH:24}` · d3 `{+ "Next time I will change…" lines}`. Stack *est.*: questions 120 + predict 120 + materials 90 + result 110 + learned 180 + gaps 60 = 680 ≤ 722 (fi 677: learnLines 2).
**verify():** open, no answer: sections present in order (`data-lcs-section=question|predict|materials|result|learned`), writing rows empty, marks not circled, question texts === `questions[loc]`, the orange's peeled/unpeeled result appears nowhere.
**Refusals:** none; above-band note not needed (G3 = 3rd grade "sink or float experiment 3rd grade", m).
**Query face:** "sink or float experiment worksheet grade 3 / lab worksheet" (v2 m) · de "Versuchsprotokoll Schwimmen und Sinken" · it "relazione esperimento galleggiamento classe terza" · fr "compte rendu d'expérience CE2".

**Rejected non-moves.** a float/sink two-bin sort (G1-204) · "sort by material then predict" (G1-364) · a results bar graph (graphing-data G1-146/147 own count-into-graph) · "sink, float or hover (schweben)" (1 de string; no honest K-3 object hovers in tap water) · named-object question cards "Does an apple float?" (a sort in disguise; kept only as F4 sentences) · egg in salt water (egg excluded; salt banned) · a colouring face (theme-swap class).

## C. Native rebuild ×11

| loc | literals the panel authors (count) | slots/forms | refusal / re-target | traps |
|---|---|---|---|---|
| en | floatWord/sinkWord 2 · col heads 2 (+1 d3) · clay word 1 · TF 12 · F5 captions 2 · F6 heads 5 + questions 2 · instructions 6 · titles 6 = 38 | none: every sentence a whole literal; no objForms needed | - | "float" also = hover in air (balloon excluded) |
| de | as en | none | - | ⚠ "schwimmt" = swims: chip "schwimmt / sinkt" or "schwimmt oben / geht unter" (panel); no animal on any page; Knete (not Plastilin); nouns capitalised; label override S-a "Stein" |
| es (MX) | as en | none | - | "flota / se hunde"; MX order "flota o se hunde" (×11 vs ×0, m); plastilina; potato "papa" (vocab, m); NEVER "flotación" (100 % off-genre); S-a "piedra" |
| pt (BR) | as en | none | - | "flutua / afunda" (both orders searched: title one, meta the other); massinha de modelar; S-a "Pedra" kept |
| fr | as en | none | - | "flotte / coule"; pâte à modeler; S-a "caillou"; F4 "Vrai / Faux" |
| it | as en | none | - | "galleggia / affonda" (or "va a fondo", v2 m); plastilina/pongo (no brand); S-a "sasso"; never "galleggiamento dei corpi"/Archimede |
| nl | as en | none | - | chip "drijft / zinkt" (G1-204 used infinitives "Drijven/Zinken", m; panel rules); klei; "proefje" = kleuter register; S-a "steen" |
| sv | as en | none | - | "flyter / sjunker"; lera (modellera); S-a "sten"; no definite forms printed (whole literals) |
| da | as en | none | - | "flyder / synker"; modellervoks; S-a "sten"; titles carry "forsøg" (egg/stool SERP) |
| no | as en | none | - | "flyter / synker"; leire; S-a "Stein" kept; titles carry "forsøk" |
| fi | as en | none | - | "kelluu / uppoaa"; muovailuvaha; S-a "kivi"; TF sentences written whole (case: "Iso tukki kelluu."); titles carry "kokeilu" |

Object labels under pictures = vocab singular (citation form, de capital) unless the claim row carries `label[loc]` (S-a in 8 locales); the panel reviews every label on every page and may add overrides (never edits the vocab). Frames never inflect; there are no `{slot}`s in this family.

## D. Data + gates

```js
// scripts/worksheet-gen/data/b6/sink-or-float.js  (EN block authored; others via apply-b6-locale.js)
const CLAIMS = [ // hand-read; one row per (theme, noun)
  { id:'apple', theme:'fruits', noun:'apple', material:'fruit', result:'float', conf:'high', testable:true,
    picOpened:true, use:['base','scale','truth'], massClass:3, label:{} },
  { id:'rock', theme:'camping', noun:'rock', material:'stone', result:'sink', conf:'high', testable:true,
    picOpened:true, use:['base','scale','truth','report'], massClass:3,
    label:{ de:'Stein', es:'Piedra', fr:'Caillou', it:'Sasso', nl:'Steen', sv:'Sten', da:'Sten', fi:'Kivi' } },
  // ... 26 rows (15 float + 11 sink), then:
];
const EXCLUDED = ['tools/nail','beach/driftwood','toys/balloon', /* ... the full list in A */];
const PAIRS = [ { id:'P1', float:'pumpkin', sink:'potato', heavier:'float' }, /* P1-P6 heavier:'float', Q1-Q4 heavier:'sink' */ ];
const SHAPES = { 'clay-ball':'sink', 'clay-boat':'float', transfer:[['bolt','sink'],['ship','float']] };
const TF_IDS = { T1:{truth:'T',objects:['log']}, /* ... F6:{truth:'F',objects:[]} */ };
const LEVEL_BY_LOC = { base:{ en:'G1', de:'G1', es:'K', pt:'K', fr:'G1', it:'G1', nl:'K', sv:'G1', da:'G1', no:'G1', fi:'G1' },
                       scale:'G1', shape:'G2', truth:'G2', draw:'K', report:'G3' };
const SINK_OR_FLOAT = { en: {
  floatWord:'floats', sinkWord:'sinks', colThink:'I think', colDid:'It did', colRight:'Was I right?',
  clay:'clay', tf:{ T1:'A big log floats.', /* ... */ }, drawCaps:{float:'floats', sink:'sinks'},
  report:{ question:'My question', predict:'I think', materials:'What we used', result:'What happened', learned:'I learned' },
  questions:{ orange:'Does an orange float with its peel? Does it float without its peel?',
              cargo:'How many stones can a clay boat carry before it sinks?' },
  forbidden:['heavy things sink','light things float','because it is light','density','buoyancy','salt'] } };
module.exports = { CLAIMS, EXCLUDED, PAIRS, SHAPES, TF_IDS, LEVEL_BY_LOC, SINK_OR_FLOAT };
```
Reuses: nothing from `data/science/sink-vs-float.json` (its items are not all opened for this purpose; G1-204 keeps it). Pictures via `lib/b3-picture-index.js` / `b2-common fileUri`.

**Validator (`tools/validate-b6-draft.js`, sink-or-float rules):** (1) every CLAIMS row `picOpened:true`, picture file exists, vocab key exists ×11, `(theme/noun)` ∉ EXCLUDED; (2) `result ∈ {float,sink}`; closed faces (scale/shape/truth) only reference `conf:'high'` rows; base/report only `testable:true`; (3) `fruits/orange` referenced only by `report`; (4) each PAIR has exactly one float + one sink claim, `heavier` consistent with `massClass` (strictly greater), and the shipped mix reachable (d2 needs ≥2 P and ≥2 Q with pairwise-distinct nouns per page); (5) each TF truth AGREES with its `objects` claims (a T sentence about `potato` floating fails); TF T and F each ≥ d2 need (3); (6) no string in any locale matches the locale's `forbidden` list except F-sentences, and no F-sentence is ever T; (7) `floatWord ≠ sinkWord`, neither equals any G1-204 bin label string AND a G1-204 title (titles checked in E); (8) every label override is non-empty and differs from the vocab form it replaces; (9) instructions ≤ 150, no free-predication, no apparatus word the face lacks (per-face banned: `line`, `group`, `bin`, `tick`, `colour`, `cut`); (10) no string mentions an answer key / "with answers"; (11) no animal picture anywhere; (12) SHAPES has no `pancake`.

**Poison cases (each must FAIL; the correct draft is the control):** P1 add `tools/nail` to CLAIMS · P2 `beach/driftwood` as a float item · P3 `kitchen tools/spoon` result sink · P4 `fruits/orange` in `use:['scale']` · P5 claim `picOpened:false` · P6 PAIR Q1 `heavier:'float'` (pencil heavier than hammer) · P7 TF "A potato floats." marked T · P8 en instruction "Draw a line to the group" (G1-204 apparatus) · P9 fr `floatWord` "Flotte ou coule ?" (G1-204 title) · P10 de TF T-sentence "Schwere Dinge sinken." · P11 SHAPES `pancake:'sink'` · P12 base config with `conf:'medium'` row (`fruits/lime`) · P13 `animals/duck` in CLAIMS · P14 scale page rendered with heavier===floats on all 4 rows · P15 sv S-a label left as "Klippa".

**`qa/verify-b6-sink-or-float.js` asserts on the render (6 faces × 11 locales):** body ≤ 722 and ≤ 677 (fi 4-line title) with no overflow; floors G1 pictures ≥ 56 (design 64), marks ≥ 44 high, chip text ≥ 17 px; K tank ≥ 280 × 400, captions ≥ 20 px; G2 TF text ≥ 17 px, chips 44 high; G3 writing glyphH ≥ 24 (starter text none); `verify()` empty; NO outcome printed anywhere (no float/sink word adjacent to an item, no pre-circled mark, `data-lcs-result` never mirrored in visible text); scale rows: tilt side === heavier side measured on the emitted SVG (pan y); the floater picture drawn larger in P rows and smaller in Q rows (bbox area ratio ≥ 1.3, measured); position tells measured on the SHIPPED instance AND pooled at n = 400 in both directions (scale floater side + heavy-pan share; truth T per position); clay ball and boat share one fill; no animal in any body; the forbidden-phrase list absent from every visible text node in every locale (F-sentences exempt only inside `[data-lcs-tf][data-lcs-truth="F"]`). Poison the render: a circled mark, a swapped tilt, a Q row drawn with the bigger floater, a fourth P row, must each fail.

## E. SEO

**Titles (≤ 70; head + experiment/predict word + ONE distinguisher; never a G1-204 title string; never the worksheet word; never "flotación"; native panels finalise):**

| face | en | de | es | pt | fr | it |
|---|---|---|---|---|---|---|
| base | Sink or Float Experiment: Predict and Test | Schwimmen und Sinken: Versuch mit Vermutung | Flota o se hunde: predice y comprueba | Experiência afunda ou flutua: o que você acha? | Flotte ou coule : je prévois, je vérifie | Esperimento galleggia o affonda: prevedo e verifico |
| F2 scale | Heavy or Light? A Sink or Float Experiment | Schwer oder leicht? Schwimmen und Sinken | ¿Pesado o ligero? Experimento flota o se hunde | Pesado ou leve? Experiência flutua ou afunda | Lourd ou léger ? L'expérience flotte ou coule | Pesante o leggero? Esperimento galleggia o affonda |
| F3 shape | Make Clay Float: Change the Shape Experiment | Knetboot: Schwimmen und Sinken durch die Form | Barco de plastilina: cambia la forma y flota | Barquinho de massinha: mude a forma e flutua | La pâte à modeler qui flotte : changer la forme | La barchetta di plastilina: cambia forma e galleggia |
| F4 truth | Why Do Things Float? True or False Experiment Quiz | Warum schwimmt etwas? Richtig oder falsch | ¿Por qué flota? Verdadero o falso | Por que flutua ou afunda? Verdadeiro ou falso | Pourquoi ça flotte ? Vrai ou faux | Perché galleggia? Vero o falso |
| F5 draw (K) | Draw What Floats and Sinks: Sink or Float Experiment | Schwimmen und Sinken malen: Was schwimmt, was sinkt? | Objetos que flotan y se hunden: dibuja el experimento | O que flutua e o que afunda: desenhe a experiência | Ce qui flotte et ce qui coule : dessine l'expérience | Cosa galleggia e cosa affonda: disegna l'esperimento |
| F6 report | Sink or Float Investigation: My Lab Report | Versuchsprotokoll: Schwimmen und Sinken | Mi reporte del experimento: flota o se hunde | Relatório da experiência: flutua ou afunda | Mon compte rendu d'expérience : flotte ou coule | La relazione del mio esperimento sul galleggiamento |

| face | nl | sv | da | no | fi |
|---|---|---|---|---|---|
| base | Drijven en zinken proefje: eerst voorspellen | Flyta eller sjunka: gissa och testa | Flyder eller synker? Gæt og afprøv, forsøg | Flyter eller synker? Gjett og test, forsøk | Kelluuko vai uppoaako? Arvaa ja kokeile |
| F2 | Zwaar of licht? Drijven en zinken proefje | Tungt eller lätt? Flyta eller sjunka, experiment | Tung eller let? Flyde og synke, forsøg | Tung eller lett? Flyte og synke, forsøk | Painava vai kevyt? Kelluuko vai uppoaako |
| F3 | Klei laten drijven: een bootje van klei | Båt av lera: flyta eller sjunka, experiment | Båd af modellervoks: forsøg med form | Båt av leire: forsøk med form | Muovailuvahavene: kokeile muotoa |
| F4 | Waarom drijft iets? Waar of niet waar | Varför flyter saker? Sant eller falskt | Hvorfor flyder ting? Sandt eller falsk | Hvorfor flyter ting? Sant eller usant | Miksi esine kelluu? Totta vai tarua |
| F5 | Wat drijft en wat zinkt: teken het proefje | Flyta eller sjunka i förskoleklass: rita experimentet | Hvad flyder, hvad synker? Tegn forsøget | Hva flyter, hva synker? Tegn forsøket | Mikä kelluu, mikä uppoaa? Piirrä kokeilu |
| F6 | Onderzoeksverslag: drijven en zinken | Experiment med apelsin: flyta eller sjunka | Mit forsøg: flyder appelsinen? | Mitt forsøk: flyter appelsinen? | Kelluminen: oma tutkimusraportti |

⚠ en base keeps "Sink or Float" WITHOUT "?" plus "Experiment" (G1-204 = "Sink or Float?"); pt/it bases were moved off the G1-204 strings "Afunda ou Flutua?" / "Galleggia o affonda?" (a title must not CONTAIN them); fr base contains "Flotte ou coule" without "?" (Romance panel accepted; flag). da/no F6 and sv F6 name the orange, so the orange question is Q1 on the page (it is).

**Meta MIDDLEs (en source; whole meta 120-170, panels rebuild):**
- base: "Children guess sink or float for each object, test it in water and circle what really happened" (95)
- F2: "Each scale shows the heavier thing; children circle the one that floats, like a big pumpkin next to a small potato" (112)
- F3: "A ball of clay sinks, the same clay as a boat floats: children circle each shape, then draw their own boat" (104)
- F4: "Children circle true or false for sentences like All heavy things sink and A steel ship floats" (93)
- F5: "After the class test, children draw one thing floating at the waterline and one on the bottom of the tank" (104)
- F6: "Children pick a question, such as does a peeled orange float, predict, test and write what they learned" (103)

**Coordinates:** `{type:'sink-or-float', mode:'base'|'heavy-or-light-sink-or-float'|'clay-boat-sink-or-float'|'why-things-float-true-or-false'|'draw-what-floats-and-sinks'|'sink-or-float-investigation', level: LEVEL_KEYS[loc][LEVEL_BY_LOC[face][loc] or band], theme:''}` (mode = the face spec slug, per `gen-b5-landings.js`; base slug `sink-or-float-experiment`).

**Non-cannibalisation (estimated whole-page word-3-gram Jaccard; engineer measures):** base↔F2 ≈ 0.10 (shared "sink or float", "circle the") · base↔F5 ≈ 0.08 (both K in es/pt/nl: heads "predice y comprueba" vs "dibuja") · F2↔F4 ≈ 0.12 (both mention heavy; F4 is sentences) · F3↔F4 ≈ 0.10 (clay sentence T4 shared idea, different move) · F6↔base ≈ 0.14 (predict/test/result vocabulary; F6 carries question + lines) · **base↔G1-204 ≈ 0.12** (G1-204 instruction "draw a line … group" shares nothing but the picture words; its titles are excluded) · F4↔G1-341 read-and-check ≈ < 0.05 · F3↔G1-364 recycling "what is it made of" ≈ < 0.05 (never names a material as the question). Watch: base↔F6 in en (both "experiment"); F6 title uses "Investigation / Lab Report".

## F. Open questions + summary

**Engineer must measure:** (1) every stack at 722 and 677 in the real render; (2) the balance primitive with library pictures on `panRects` at 64 px (the pumpkin/log must fit a pan; if not, pan overlay grows or pictures sit above the pan on a drawn tray); (3) the size-ratio assertion on the SHIPPED seed per face; (4) G1-204's live deck slugs ×11 and whether its decks are published (a DB count) before titles lock; (5) that `vehicles/ship` renders legibly at 80 px next to a small bolt; (6) the pooled position tells at n = 400.
**Only a native panel can rule:** the float/sink chip words (de "schwimmt" vs "schwimmt oben"; nl verb vs infinitive); every object label (S-a override and any other the panel dislikes); the clay word; the TF sentences' truth wording in-language (a literal must stay unambiguously true/false); the level per locale for the base (es/pt/nl K); whether fr base may contain "Flotte ou coule" at all; whether the lock's "(the bigger thing floats)" wording may ship as the 2+2 mix designed here (critic).
**Operator call (not pedagogy):** repoint G1-204 decks to this family or keep them as a separate self-canonical sort (two pages per head either way are fenced by titles here).

Summary: 26 hand-read claim rows (15 float / 11 sink, all opened) + ~40 opened exclusions (incl. `tools/nail` = fingernail in 7 locales, driftwood's name says "floats" in pt/it/fr, rock = cliff in 8); six faces own predict-test-record, visible weight vs floating (balance, 2+2 so neither size nor weight solves it), shape with one material, true/false reasoning, a K drawn record and a G3 write-up; no face sorts, no page prints an outcome, and the misconception appears only as FALSE sentences.
