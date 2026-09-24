---
name: project-pt-secondbatch-fanout
description: "Active program — fanning the second-batch (~114 EN-only) lcs-shell activities out to Brazilian Portuguese (pt-BR), one at a time, native-ensemble + rebuild-not-translate, BNCC-aligned"
metadata: 
  node_type: memory
  type: project
  originSessionId: 634032ae-5ec2-4d17-83fc-747d777e484e
  modified: 2026-08-20T17:54:58.833Z
---

# Brazilian Portuguese (pt-BR) second-batch fan-out (ACTIVE, started 2026-08-16)

**What:** the parallel-to-de/es/fr program — fan the ~114/122 EN-only lcs-shell second-batch
activities (games-build-walk output, commit `12327ce5`) out to **pt (pt-BR / Brazilian
Portuguese)**, ONE per plan-mode session, via a **3-agent native pt-BR ensemble** (K-1 BNCC
matemática/alfabetização pedagogue + linguist + B2C/SEO content creator), **rebuild not translate**
for the **BNCC (Base Nacional Comum Curricular)**, anos iniciais (1º–3º ano). Sibling of
[[project-german-secondbatch-fanout]] / [[es-secondbatch-fanout]] / french fan-out — **same #1..#114
order**, same recipe, Brazilian curriculum/language.

**DEPLOY POLICY (operator 2026-08-16):** build ALL pt activities **LOCALLY**; **commit + push only,
NO deploy per activity** (accumulate on `pivot/printable-business-toolkit`); deploy the whole pt set
in ONE batch at the very end (§20.4 cp-before-build chain, one `git pull` grabs all commits).

**Operator cadence:** operator says "switch to plan mode + continue" before each → EnterPlanMode →
3-agent pt-BR ensemble (content into the plan file) → ExitPlanMode approval → build → full LOCAL DoD
(§A.13.62) → show operator the local screenshots → operator approves → commit+push (NO deploy). ONE
at a time.

**Locked rulings (whole program):**
1. **rebuild, not translate** — genuinely sound for a Brazilian classroom; native 3-agent ensemble.
2. **NEVER skip** — find the Brazilian teaching point for EVERY activity incl. English-specific literacy.
3. Build order mirrors de/es/fr: math/measurement/geometry first, literacy rebuilt when reached.
4. **Character names KEPT** across locales (Tilly, …). In-app title vs SEO page_title may differ (both keep the name).
5. **BNCC framework NAME only, NO habilidade code** in pt-facing text (operator ruling 2026-08-16,
   §20.10-consistent). Cite "BNCC" / "unidade temática X da BNCC" — NOT "EF01MA15", NOT the CCSS code.
   The CCSS code stays only as the hidden machine anchor (`alignment.code` / JSON-LD `targetName` /
   `/standards/<code>`). (The SEO agent argued EF01MA15 is a high-intent BR teacher search term; operator
   chose name-only anyway — this precedent holds for the whole fan-out unless the operator flips it.)

**pt is a FULL locale — infra already present (no scaffolding):**
- `EDUCATIONAL_FRAMEWORK_BY_LOCALE.pt = 'BNCC'` (route `page.tsx` ~L458); `hreflang.ts` pt→pt-BR.
- `strand-names.ts` pt entries EXIST for the math + foundational-reading strands: Measurement & Data →
  **"Grandezas e medidas"**, Números, Álgebra, Geometria, Number&Ops-Base-Ten → Números, Reading:
  Foundational Skills → "Leitura/escuta", Phonological Awareness → "Análise linguística/semiótica".
  **MISSING pt** (fall back to English → need a STRAND_OVERRIDE or a strand-names pt entry): Reading:
  Informational Text, Reading: Literature, Writing, Language, Vocabulary Acquisition and Use,
  Number & Operations—Fractions. (RL/RI/L/vocab/fractions literacy activities will need a pt strand.)
- `GRADE_KEY_MAP`/`gradeToAgeRange` support PK/K/1/2/3/4 (grade_4 = "9-10"); pt grade labels in
  `subject-hub.ts`: '1º ano'/'2º ano'/'3º ano'. `GRADE_OVERRIDE`/`STRAND_OVERRIDE` have **NO pt entries
  yet** — add `<id>:{pt:'…'}` ONLY when the BR grade/domain differs from the CCSS auto-map.
- `frontend/messages/activity-content/pt.json` exists; gate = **`scripts/verify-activity-content-pt.js`**
  (rejects EU-PT tells `comboio/autocarro/ecrã/rapariga/telemóvel/jardim de infância/casa de banho`,
  the anglicism **"manipulativos"** → use "materiais manipuláveis", "Common Core"/raw CCSS code,
  {placeholder}, dup about[0]; requires ≥50 pt activities). pt.json prose currently covers ONLY the
  ~57 generic-tool activities — the mascot fan-out set (what de/es/fr have ~170-175 of) is what we add.

**Per-activity edit recipe (activity-layer ONLY; `<engine>-core.js`/`lcs-shell.*`/Direction-A CSS = 0
lines, `git diff --name-only` proof):**
- `mini tools/<engine>-activity.js`: add `pt` to the string maps (`COLOR_L`/`L`/`strings`); module
  `var LANG` already set from `api.lang` in init; `txt()` falls back to en. Per-round content via
  `roundsL10n.pt` in the manifest IF the engine has it (seriation had none — rounds locale-neutral).
- `mini tools/<engine>-activities.json`: add `pt` to `slug`/`page_title`/`page_intro`. Slug
  ASCII-safe (no accents), grade label "N-ano", cite BNCC by NAME, NO code; collision-check vs pt slugs.
- `frontend/messages/activity-content/pt.json`: add `prose[<id>]` under top-level `"prose"` object
  (about≥3/practices≥4/howToPlay≥3/learningGoals≥3; unique about[0] opener; no code/Common-Core/
  {placeholder}; BR register; "materiais manipuláveis").
- `mini tools/<engine>-activity.html`: bump `<engine>-activity.js?v=N`.
- `frontend/app/[locale]/activities/[slug]/page.tsx`: bump `ACTIVITY_WRAPPER_VERSION`.
- **FORWARD RULE:** after ANY page.tsx GRADE/STRAND edit run `cd frontend && npx tsc --noEmit`
  (dup-key trap — MERGE into an existing `{de:…}`/`{fr:…}` entry, don't add a separate `{pt:…}`).

**Gates per build (lean §A.13.62):** `node --check` + JSON-valid both files + `verify-activity-content-pt.js`
+ `preflight-activity-routes.js` + `visual-qa-activity.js --activity=<id> --locale=pt` (320·360·412·768·
1024·1366 × every round) + EN-regression `--locale=en` then `--locale=pt` (restore shots) + personal
Read 768/1024/360 (desktop-first) + EU-PT-tell/EN-leak grep + `git diff --name-only` 0-core → commit+push, NO deploy.

## Done (built locally; NONE deployed — await end-of-batch deploy)
1. **seriation `compare-length.1-md-a-1`** → „A estante distante da Tilly" (in-app) / „As fitas da Tilly …"
   (SEO) / slug `comparar-comprimentos-1-ano` — committed `c79f2bb0`, wrapper 9.343, seriation-activity.js?v=5.
   **1º ano** (BNCC **EF01MA15**), unidade temática **Grandezas e medidas** (auto — NO GRADE/STRAND override).
   Rulings: reference = **"o barbante"** (NÃO régua/cinta métrica = 2º ano EF02MA16 = trust-killer; NÃO
   cordão/fio/corda); object = **"a fita"** (fem.); length = **"mais comprida / mais curta"** (comprido/curto,
   NOT longo/maior); same-length = **"tão comprida quanto o barbante"**; **COLOR_L.pt authored FEMININE**
   (Vermelha/Amarela/Roxa inflect; Azul/Verde/Laranja invariable) to agree with the trailing feminine noun
   in srItem `Fita {label}` — a deliberate divergence from de/es/fr masculine/nominative colors, safe
   because every colored object here is a *fita*; **"Toque na …"** (você, not "Toca"=tu). Guardrail: keep it
   *comparação indireta* (single reference), never *contar quantos barbantes cabem* (that = EF02MA16/2º ano).

2. **lay-units `measure.1-md-a-2`** → „O caminho do jardim de Inchie" (in-app) / „O jardim de Inchie …"
   (SEO) / slug `medir-comprimentos-com-unidades-2-ano` — committed `54c2feae`, wrapper 9.344,
   lay-units-activity.js?v=8. **2º ano** (BNCC **EF02MA16**), **Grandezas e medidas**. **THE ONE
   DIVERGENCE from de/es/fr (all grade 1): iterating a non-standard unit end-to-end + counting =
   EF02MA16 = 2º ano** (1º ano EF01MA15 is comparison-only, = #1) → added the **FIRST pt GRADE_OVERRIDE**:
   `GRADE_OVERRIDE['lay-units.measure.1-md-a-2'] = { pt: '2' }` (new entry, page.tsx). No STRAND_OVERRIDE
   (Grandezas e medidas auto). Unit = **"ajudante"** (masc), CONSISTENT all 10 rounds incl. the EN
   cube/clip rounds (SVG draws identical bars → say ajudantes not cubos/clipes; fr precedent). Added
   `NUMW.pt` (count/win, masc um/dois) + `strings.pt` (all keys) + 10 `promptL10n.pt`. Child register
   (pedagogue-refined over linguist): "sem buracos" (NOT folgas), **"sem montar um no outro"** (NOT
   sobrepor), "ponta com ponta", "comece bem na pontinha", inverse repeats noun "mais ajudantes você
   precisa"; formal "unidades não padronizadas"/"sobreposições" kept TEACHER/SEO-only. §A.13.62 GREEN
   pt 60/60 + en 60/60; longest prompt (inverse-leaf) fits 360 with NO @media trim needed; tsc clean
   (no dup-key). **Surfaced-not-acted fork:** palmo/pé/passo = canonical BR entry to EF02MA16, but
   pedagogue ruled KEEP "ajudante" (inverse round needs 2 clean manufactured sizes palmo/pé can't give);
   optional future companion round / teacher note. **REUSABLE: the pt GRADE_OVERRIDE mechanism now
   exists** — add `<id>:{pt:'N'}` for any BNCC-grade ≠ CCSS-grade activity (BR pattern: unit-iteration/
   arithmetic often +1 year vs CCSS).

3. **skipcount `fill.2-nbt-a-2`** → „Os pulos do Hopper" (in-app) / „Os pulos de Hopper …" (SEO) /
   slug `contar-de-5-em-5-10-e-100-2-ano` — committed `03e0e4a9`, wrapper 9.345, skipcount-activity.js?v=5.
   **2º ano** (BNCC; skip-counting-within-1000 = 2º-ano ceiling), **NO GRADE_OVERRIDE** (manifest '2' auto;
   mirrors de/es/fr). **STRAND = ÁLGEBRA — added the FIRST pt STRAND_OVERRIDE**:
   `STRAND_OVERRIDE['skipcount.fill.2-nbt-a-2'] = { pt: 'Álgebra' }` (page.tsx). Decisive BNCC divergence
   (pedagogue, NOT 50/50): BNCC homes sequences/regularities/elementos-ausentes in **Álgebra**
   (EF02MA09/10/11 — pensamento algébrico from 1º ano), NOT Números; the auto-map (Number & Ops in Base
   Ten → "Números") would mis-tag it. **pt is the ONLY locale doing this** — de/es/fr kept the number
   strand (their curricula don't carve out early algebra). CCSS 2.NBT.A.2 stays hidden machine anchor.
   Custom L+txt engine → added `L.pt` (10 keys incl. sr-only) + `strings.pt` (5 keys); digits-only (no
   NUMW); rounds locale-neutral. Vocab: **"pulo"** (frog hop, narrative) vs **"contar de {step} em {step}"**
   (math term; calque **"contar por"** avoided). **Backward = "para trás"** — ⚠ pedagogue CORRECTED the
   linguist's **"de trás para frente"** (which in pt-BR = reverse a READING order / spell backwards, NOT
   count down). §A.13.62 GREEN pt 66/66 + en 66/66; tsc clean; personal-read forward/backward/whichstep
   at 768/1024/360 all clean. **REUSABLE: the pt STRAND_OVERRIDE mechanism now exists** — add
   `<id>:{pt:'<eixo>'}` (5 unidades temáticas: Números / Álgebra / Geometria / Grandezas e medidas /
   Probabilidade e estatística) whenever the BNCC unidade temática ≠ the CCSS-strand auto-map.

4. **shapeforge `compose.1-g-a-2`** → „A oficina de luz de Mim" (in-app) / „Oficina de luz de Mim: …"
   (SEO) / slug `montar-figuras-com-triangulos-e-losangos` — committed `426ab870`, wrapper 9.346,
   shapeforge-activity.js?v=7. **FIRST pt GEOMETRY.** **1º ano** + **Geometria** both AUTO (no override;
   pedagogue decisive: informal montagem de figuras com peças = 1º-ano geometry; BNCC has NO named
   "compor figuras" habilidade in 1º/2º ano + losango/hexágono aren't in the 1º-ano naming set, so a
   bump gains nothing & de-harmonizes). Shell api.t → added `PIECE_L.pt` (triangle/rhombus) + `strings.pt`
   (15 keys) + 11 `promptL10n.pt`. **Shape-vocab crux + false friends:** **losango** (⚠ NEVER "rombo" —
   in pt-BR = hole/breach; mirror fr "losange", do NOT copy es "rombo") · triângulo · hexágono (built,
   not name-gated) · trapézio→**"telhado"** · paralelogramo→**"tijolo torto"** (⚠ OPERATOR-CHOSEN via
   AskUserQuestion: shape-honest leaning-brick over es/de "lantern"; pedagogue rec + fr "brique penchée"
   precedent; the render confirmed the target looks like a tilted brick). Pieces = **"peças"** (⚠ NEVER
   "blocos lógicos" = Dienes attribute blocks, a different BR manipulative). Verb **"montar"**. BNCC
   name-only + HONEST framing (develops/explores Geometria; NO "compor figuras" habilidade claim — same
   posture as de/es/fr); tangram nod. Mim kept; ariaForge stays "a lanterna vazia" (workshop theme,
   decoupled from the tijolo-torto shape). §A.13.62 GREEN pt 66/66 + en 66/66; tsc clean; personal-read
   losango/tijolo-torto/hexágono rounds at 768/1024/360.
   **⚠ VERIFIED NON-ISSUE (applies to ALL activities): `frontend/public/mini-tools/` is a gitignored,
   untracked, STALE local copy** (dated Jul 12, missing #1–#3 edits, yet those shipped fine). It plays
   NO role in git / visual-QA (serves `mini tools/`) / production (nginx serves
   `/var/www/lcs-media/mini-tools/`, fed by cp from `mini tools/`). **Source of truth = `mini tools/`
   only. NEVER edit `frontend/public/mini-tools/`.**

5. **place-value-regroup `add-compose-ten.1-nbt-c-4`** → „Tuck agrupa uma dezena" / slug
   `soma-com-reagrupamento-formar-uma-dezena-2-ano` — committed `f3ea461d`, wrapper 9.347,
   place-value-regroup-activity.js?v=21 (core stays ?v=17). **FLAGSHIP regrouping engine — CORE-RESIDENT
   strings, localized 0-core** via the activity's `_PVR_DE` multi-locale block + `_t` (reads api.lang) +
   `lockAndCaption` overrides (`Object.assign({},Core,…)`; 0 lines to place-value-regroup-core.js).
   **compose-ten grade = 2º ano** (NEW `GRADE_OVERRIDE pt:'2'`; pedagogue decisive: reagrupamento com
   material dourado = EF02MA06/EF02MA04 = 2º ano; 1º ano stays estratégias pessoais EF01MA06/08 → the BR
   +1 pattern; diverges from CCSS grade 1 AND de/es/fr all grade 1). Strand **Números** (auto, no override).
   **Verb pair = agrupar/desagrupar** (⚠ OPERATOR-CHOSEN via AskUserQuestion over the linguist's
   formar/desfazer — the BNCC/textbook term for reagrupamento; "Agrupar/Desagrupar uma dezena/centena",
   imperative "Desagrupe"). Place values **unidades/dezenas/centenas** (⚠ "dezena" NEVER es "decena"),
   manipulative **material dourado**, carry = "o vai um". lockAndCaption pt: op " mais "/" menos ", verb
   " dá ". Tuck (o hamster) kept. **4-VARIANT ENGINE: #5 authored ALL shared strings** (`_PVR_DE` 19 keys +
   `_pvrTitle` 3 branches for the bis-1000 variants + lockAndCaption) but shipped ONLY the compose-ten
   manifest/prose. §A.13.62 GREEN pt 48/48 + en 48/48; tsc clean; personal-read 768/360.
   **➡ #6 = the 3 bis-1000 variants** (break-ten `subtract-decompose.2-nbt-b-7` / make-hundred
   `add-compose-hundred.2-nbt-b-7` / break-hundred `subtract-decompose-hundred.2-nbt-b-7`): engine strings
   ALREADY done → #6 just adds each variant's manifest slug/page_title/page_intro (pt) + pt.json prose +
   **merges `pt:'3'` into their existing `{de:'3',fr:'3',es:'3'}` GRADE_OVERRIDE entries** (page.tsx L71-73,
   3º ano — reagrupamento na subtração / bis-1000 = EF03MA05/06). ⚠ flag the BR thousands-period `1.000`
   (not `1,000`) in the bis-1000 totals display when building #6.

6. **place-value-regroup — the 3 bis-1000 variants** (break-ten `subtract-decompose.2-nbt-b-7` /
   make-hundred `add-compose-hundred.2-nbt-b-7` / break-hundred `subtract-decompose-hundred.2-nbt-b-7`)
   — committed `cf23f7ff`, wrapper 9.348, activity.js `?v=22`. **CLOSES the flagship engine (pt 4/4).**
   Titles „Tuck desagrupa uma dezena / agrupa uma centena / desagrupa uma centena" (already authored in
   #5's `_pvrTitle`). **All 3 = 3º ano** (`pt:'3'` merged into the existing `{de,fr,es:'3'}` at page.tsx
   L72-74; pedagogue: the conventional regrouping algorithm is the 3º-ano object — EF03MA05 "inclusive os
   procedimentos convencionais" + EF03MA06 — even break-ten borrow-within-100). Strand Números (auto).
   #6 added ONLY: 3 manifest slug/title/intro (pt) + 3 pt.json prose + the 3 grade-override merges +
   wrapper bump. Terminology: subtração com reagrupamento, desagrupar uma dezena/centena, trocar/troca
   (material dourado), conta armada; **AVOIDED "pedir emprestado"**. **"across zero" — linguist vs
   pedagogue CONFLICT reconciled** → **"um zero no meio da conta"** (avoids BOTH the pedagogue-rejected
   "por cima do zero" AND the linguist-rejected "através do zero"). Thousands-format non-issue (max
   510/403, raw numbers, no toLocaleString).
   ⚠ **NEEDED an activity-layer @media(max-width:340px) trim** (place-value-regroup-activity.js, 0-core;
   `.pvr-bar .pvr-maketen` higher-specificity nudge → ?v=21→22): the pt "Desagrupar uma centena" button
   (1 char longer than es "Desarmar una centena"/en "Break a hundred") WRAPPED at 320px in break-hundred
   → +9px cut-off (EN/es passed 320; pt failed). Locale-neutral fix; all 4 variants + EN re-verified
   §A.13.62 GREEN 48/48. **LESSON: longer pt labels can tip a core-CSS layout at the 320 tier — the
   sanctioned fix is the activity-layer @media trim (fr lay-units precedent), NOT a core edit, NOT
   shortening the operator-approved wording.**

7. **graph-it `bar-graph.2-md-d-10`** → „A cerca empilhada do Pip" / slug `grafico-de-barras-ler-e-construir-2-ano`
   — committed `841fdea5`, wrapper 9.349, graph-it-activity.js `?v=8`. **FIRST pt DATA activity.** **2º ano**
   (BNCC EF02MA22/EF02MA23; no GRADE_OVERRIDE). **STRAND = "Probabilidade e estatística" — the 2nd pt
   STRAND_OVERRIDE** (merged pt into the existing graph-it `{de,fr,es}` entry, page.tsx ~L189); the auto-map
   "Grandezas e medidas" is a DOMAIN ERROR for a data activity (de/es/fr made the same fix). Locale via
   `global.LCS.i18n.current` (no LANG var) → purely additive: `CAT_L.pt` (6) + `L.pt` (16) + `strings.pt` (9).
   **Categories = forest set KEPT** (⚠ operator-chosen via AskUserQuestion over a BR "realidade próxima" set):
   folhas / **frutinhas** (warm K-2 over "bagas") / bolotas / **pinhas de pinheiro** (⚠ bare "pinha" in BR =
   sugar-apple fruit; mirror es "piñas de pino"/fr "pommes de pin") / cogumelos / flores. **Comparative
   gender-invariance (crux):** categories split gender (cogumelos m, rest f) → the partitive shield
   **"Quantas a MAIS tem de {a} do que de {b}?"** ("Quantas" agrees with an implicit fem quantity, {a}
   quarantined in "de {a}" → works masc+fem; render-verified with pinhas/bolotas). qVerify impersonal
   "Tem {by} {x} a mais que {y}." Miss-lines colon-form (aria announcements → `CAT_L.pt` stays lowercase,
   like es/fr; the linguist's "capitalized {A} face" request is moot — engine uses one clabel). "gráfico de
   barras" kept (linguist+content+fr+es; BNCC-valid per EF02MA22 "colunas simples ou em barras"; pedagogue
   preferred "colunas" — noted). Pip (o esquilo) kept. §A.13.62 GREEN pt 84/84 + en 84/84; tsc clean;
   personal-read build+qFewer+qTotal rounds at 768/360/1024. **REUSABLE: line-plot `read.2-md-d-9` (sibling
   data activity at page.tsx ~L190) will take the same `pt:'Probabilidade e estatística'` when fanned.**

8. **clock-digital** — 2-variant batch: read-hour `clock-digital.read-hour.1-md-b-3` + read-half-hour
   `clock-digital.read-half-hour.1-md-b-3` (both CCSS 1.MD.B.3) → „O relógio do Sprocket". committed
   `d54f8648`, wrapper 9.350, clock-digital-activity.js `?v=13`. **BOTH = 3º ano** (⚠ OPERATOR-CONFIRMED
   via AskUserQuestion — a **+2 jump** from CCSS grade 1, diverges from ALL siblings de K1/fr grade 2/
   es 1º+2º). BNCC **EF03MA22** is the ONLY habilidade naming reading "relógios (analógicos e digitais)";
   2º-ano time = calendário EF02MA18 + digital-DURATION EF02MA19 (neither fits analog reading, §A.13.61).
   GRADE_OVERRIDE `pt:'3'` merged into BOTH existing `{fr:'2'}` / `{fr:'2',es:'2'}` lines. Strand
   **Grandezas e medidas** (auto — a clock is a time measure; NO override, unlike #7 graph-it). Added
   `L.pt` (10) + `strings.pt` + a **`spoken(t)` pt block** (Romance "hora em curso + meia": é/são +
   uma/duas agreement — "É uma hora"/"São três horas"/"São três e meia"/"São doze horas" not meio-dia;
   "quinze para as" for :45). Terms: **"relógio de ponteiros"**, **"em ponto"** (⚠ AVOIDED the EU-PT
   "hora cheia"), ponteiro pequeno/grande. Digital target 12h. Sprocket (o galo) kept. §A.13.62 GREEN pt
   54/54 ×2 + en; tsc clean; personal-read both variants 768/360.
   ⚠ The other 4 clock-digital variants (quarter/five-minute/minute/match, 2.MD.C.7 / 3.MD.A.1) are
   **en+fr only** — NOT part of the pt #8 batch. **⚠ the German plan file `the-previous-session-...groovy-pie.md`
   is DELETED** — the #1..#114 order for #9+ now derives from the German git commit chain (`git log
   --ancestry-path e700ff83..fb423d5b`).

9. **ten-stones** — `ten-stones.add-sub-within-20.1-oa-c-6` (single id, 11 rounds; cog types
   maketen/findten/decompose/anchor/equiv/relation) → „As pedras do dez da Lily". committed `04e8d17d`,
   wrapper 9.351, ten-stones-activity.js `?v=5`. Lily the frog (a rã Lily) crosses a 0–20 **reta numérica**
   by the make-a-ten / bridge-through-ten strategy (spinner declares 8 + ⬚ = 10 → hop to the golden **pedra
   do dez** → hop the remainder; subtraction bridges back). **Grade = 2º ano** (GRADE_OVERRIDE `pt:'2'`
   merged onto es:'2' — make-a-ten fact fluency = BNCC 2º-ano *fatos fundamentais* EF02MA05; 1º ano works a
   smaller range with personal strategies; mirrors es 2º primaria; de/fr stay grade 1). **Strand = Números**
   (NEW STRAND_OVERRIDE `pt:'Números'`) — ⚠ the auto-map sends OA ("Operations & Algebraic Thinking") → pt
   **"Álgebra"** (strand-names.ts:51), a DOMAIN ERROR: make-a-ten computation is *fatos fundamentais* =
   **Números**; BNCC Álgebra 2º ano is sequences/patterns/missing-element (EF02MA09-11). Same OA-split the es
   sibling made (ten-stones→Sentido numérico / numbers-court→álgebra). **This is the OPPOSITE direction from
   pt #3 skipcount** (NBT→Álgebra, sequences) — both content-driven corrections of the auto-map.
   **Metaphor "a pedra dourada do dez"** (matches the drawn golden circle; vitória-régia rejected —
   register-heavy + a flat lily-pad fights the rest-and-push-off bridge). ⚠ **TRAP: never "pular o dez"
   (= SKIP ten) — always "pular até o dez" / "passar pelo dez".** Terms: formar/completar o dez ·
   amigos/parceiros do dez · passar pelo dez · **pular** (linguist: pular family throughout, NOT saltar) ·
   reta numérica · quase-dobro · família de fatos · quatorze/dezesseis (not EU dezasseis) · direto (not es
   "directo"). Engine: `WORDS_PT` (0–20) + `numWord`/`eqWord`(" é igual a ") pt branches + `strings.pt` (16)
   + `promptL10n.pt` ×11; the `stand` aria non-de branch already handles pt. §A.13.62 GREEN pt 66/66 + en
   66/66; pt gate 69; tsc clean; personal-read maketen/findten/anchor/relation @768/360/1024.

10. **numbers-court** — `numbers-court.judge-balance.1-oa-d-7` (rounds ENGINE-GENERATED, no promptL10n) →
   „O Tribunal dos Números". committed `183d81e8`, wrapper 9.352, numbers-court-activity.js `?v=5`. Child is
   a juíza (Tess, a tartaruga) ruling math sentences TRUE/FALSE on a **balança** where "=" means BOTH SIDES
   HAVE THE SAME AMOUNT (relational), NOT "the result comes next". **Grade = 3º ano** (GRADE_OVERRIDE
   `pt:'3'`, firm — pedagogue + content agree, NOT borderline): BNCC **EF03MA11** "compreender a ideia de
   igualdade... sentenças... mesma soma" IS this activity; 2º-ano Álgebra (EF02MA09-11) is sequences/patterns
   + treats "=" operationally by design — the relational break is planted at 3º. +2 vs CCSS grade 1, diverges
   from ALL siblings (de K1/fr CP/es 2º). **Strand = Álgebra, NO pt STRAND_OVERRIDE** — ⭐ the auto-map
   OA→pt "Álgebra" (strand-names.ts:51) is CORRECT for the relational equal sign. **CLEAN MIRROR of #9**:
   #9 ten-stones NEEDED an override (OA→Números, computation); #10 keeps the auto-map (OA→Álgebra,
   relational =). es needed its override only because es auto-maps OA→"Sentido numérico". **RELATIONAL LOCK**:
   "os dois lados têm a mesma quantidade" / "em equilíbrio"; the operational "o resultado que vem depois"
   appears ONLY inside explicit negations (naming the misconception to reject); no bare "dá/resulta/vira"
   for "=" (the two "dá" in prose are idiomatic "dar o veredito" / "dar os primeiros passos"). Verdict pair
   **"É justo!" / "Não é justo!"** (fairness metaphor — "justo" = fair AND balanced; both experts endorse).
   Char **a juíza Tess**. BR: veredito (not EU veredicto), balança (not balanço), os pratos, ficha, toque
   (not carregar); avoid azulejo/júri. Engine: `strings.pt` (15) + `speak()` pt→`pt-BR`. §A.13.62 GREEN pt
   72/72 + en 72/72; pt gate 70; tsc clean; personal-read verdict @768/360.

11. **comparison-creek** — `comparison-creek.river-steer.k-cc-c-7` (de `8c17500c`; rounds in manifest,
   prompts engine-computed from string keys, NO promptL10n) → „O rio do capitão Quill". committed `53f53061`,
   wrapper 9.353, comparison-creek-activity.js `?v=8`. **FIRST pt K-cluster activity.** Captain Quill (um
   patinho) guides a balsa down a forking river; child taps the **braço do rio** with the right number buoy.
   Task types: maior/menor, side com MAIS dots, bigger SUM, "=" tie, name-relation (MAIS/MENOS), ENTRE, +
   read-VALUE-not-print-size trap. Written numerals 1–10. **Grade = 1º ano** (GRADE_OVERRIDE `pt:'1'`, firm):
   the response surface (numerais escritos + maior/menor/igual formal + read-value trap) = BNCC **EF01MA05**
   (Números, 1º ano); Educação Infantil (EI03ET07) is oral/concrete + avoids symbolic formalization. ⚠
   **Does NOT copy es='PK'** — BR's BNCC border falls a step above MX's SEP border (default 'K'→"Pré-escola"
   too low for written-numeral formal comparison). **Strand = Números, NO override** (Counting & Cardinality
   → auto pt "Números" correct). Terms: **maior/menor** (NOT es mais grande/mais chico) · MAIS/MENOS · **braço
   do rio** (not canal) · o sinal de igual · entre · trap "O número MAIOR vence, não o tamanho!" · **o capitão
   Quill** (patinho) · **guiar** (not dirigir/pilotar) · **boia** (no accent) · raft=**balsa** (⚠ 2-expert
   split pedagogo-balsa/fluvial vs linguista-jangada; kept balsa — teacher-facing prose noun only) · "mais ou
   menos" idiom neutralized by CAPS. Engine: `strings.pt` (23) + `speak()` pt→`pt-BR`. §A.13.62 GREEN pt
   72/72 + en 72/72; pt gate 71; tsc clean; personal-read bigger/more-dots/size-trap @768/360/1024.

## The es K-cluster precedent (for future pt K-level activities)
comparison-creek is the FIRST pt K-cluster (CCSS grade "K") activity. **Do NOT mechanically copy the es 'PK'
(Preescolar) K-cluster rule** — BR's BNCC border sits a step above MX's SEP border, so a K.CC.C.7-style
written-numeral/formal-symbolic skill lands in **1º ano** (EF01MA05), not pré-escola. The DECIDING TEST
(pedagogue-ruled) = the RESPONSE SURFACE: written numerals + formal maior/menor/igual + symbolic abstraction
→ 1º ano; genuinely oral/concrete/informal quantity work with NO written-numeral formalization → pré-escola
(default 'K'→"Pré-escola") or 'PK'→"Educação infantil". Grade is a per-activity ensemble call each time.

12. **span-length-gap** — `span-length-gap.how-much-longer.2-md-a-4` (de `b385e738`; rounds in manifest) →
   „A diferença de comprimento do Palmo". committed `b0ff4162`, wrapper 9.354, span-length-gap-activity.js
   `?v=5`. Completes the length arc (#1 seriation → #2 lay-units → #12 difference). Two proportional bars
   (object + length in cm); child types HOW MUCH LONGER the longer is. NO audio. **Grade = 2º ano (NO
   override** — manifest grade "2" → pt "2º ano"): BNCC EF02MA16 (medir/COMPARAR comprimentos em cm) +
   EF02MA06; matches all siblings (de K2/fr CE1/es 2º) + pt #2 lay-units. **Strand = Grandezas e medidas
   (NO override** — Measurement & Data auto-map correct). ⭐ **Character RENAMED Span → "Palmo, a
   lagarta-mede-palmos" (OPERATOR-CHOSEN via AskUserQuestion)** — palmo = span = a real BR handspan measure
   + the actual BR common name for the inchworm → restores the measure-pun; masculine "o Palmo" + feminine
   appositive "lagarta" → "O Palmo… ele mede"; diverges from de/fr/es "Span" (rebuild-not-translate).
   **§A.13.54 gender-invariance**: qAsk "Quanto {a} mede a mais que {b}?" / qSolved "{a} mede {n} cm a mais!"
   — invariant "mede a mais" (no comprido/comprida); only article (o/a) varies per the **16-noun ptName/ptNom
   map** (crayon=**Canetinha** short ≠lápis, avoids caption clip; string/cord/rope=barbante/cordão/corda
   distinct; branch/twig=galho/graveto). Captions clip-free (Barra vermelha wraps 2 lines). ⚠ False-friend
   LOCK: **comprimento** (length) NOT cumprimento (greeting); NOT "longitude" (es-interference); lagarta NOT
   lagartixa. Engine: strings.pt (9) + ptName/ptNom ×16 + lblName/lblNom + qAsk/qSolved pt render branches;
   no speak. §A.13.62 GREEN pt 48/48 + en 48/48; pt gate 72; tsc clean; personal-read ribbon/barra-vermelha/
   canetinha @768/360.

13. **mosaic-menders** — `mosaic-menders.area-match.3-md-c-6` (de `c4b92ec3`) → „O ateliê de mosaicos da
   Tessa". committed `66304586`, wrapper 9.355, mosaic-menders-activity.js `?v=10`. Area as counting unit
   squares: Tessa needs N quadradinhos; child taps the mosaic with the SAME count (= same area); a bigger-
   outline decoy has the WRONG count. **Cleanest build yet: 8 strings, NO LANG var, no nouns, no audio.**
   **Grade = 3º ano (NO override** — manifest "3"): BNCC EF03MA21 "comparar áreas" + non-standard quadradinho
   unit; matches en/de/es (fr CM1(4) French-specific). **Strand = Grandezas e medidas (NO override)** — ⭐
   pedagogo categorical: in BNCC **área é uma grandeza → Grandezas e medidas, NOT Geometria**; auto-map
   correct; **BR mirrors fr (no override), the INVERSE of de/es** who moved área→geometry (de "Raum und Form",
   es "Forma, espacio y medida" = KMK/SEP fusions that do NOT apply to BNCC). Terms: **quadradinho** (⚠ NOT
   "quadrinho"=comic panel — spelling lock; NOT telha/azulejo/ladrilho); o mosaico; toque (not carregar);
   título "O ateliê de mosaicos da Tessa" (ateliê=artist-studio); "ladrilhamento" = teacher-prose only, never
   child-facing. Engine: strings.pt (8) only. §A.13.62 GREEN pt 48/48 + en 48/48; pt gate 73; tsc clean;
   personal-read 6-/10-quadradinho rounds + bigger-outline decoy @768/360.

## ⭐ BR strand doctrine for MEASUREMENT/GEOMETRY activities (learned #12-#13)
BNCC unidade **Grandezas e medidas** = ALL magnitudes INCLUDING **área e perímetro** (área é uma grandeza).
**Geometria** = figuras/posição/deslocamento/ângulos/simetria (NOT surface measure). So area/perimeter
activities → **Grandezas e medidas, NO override** (the "Measurement & Data" auto-map is correct). BR mirrors
**fr** here and is the INVERSE of de (KMK "Raum und Form") + es (SEP "Forma, espacio y medida"), who fuse
area into geometry — those are locale-specific and do NOT transfer to BNCC. #13 mosaic-menders (área) is the
reference. Pure magnitudes (comprimento/massa/tempo — #2, #12) are also Grandezas e medidas.

14. **pond-juice** — `pond-juice.pour-measure.3-md-a-2` (de `e999987b`) → „O suco da Pippa". committed
   `9a29f73f`, wrapper 9.356, pond-juice-activity.js `?v=6`. **Heaviest localization of the batch.** A rã
   Pippa runs a juice stand; customer orders "mais ou menos N litros"; child serves SUCO into a frosted copo
   medidor, reads the 0-10 LITER scale + taps the number; other rounds read-level or COMPARE two copos.
   **Grade = 2º ano (GRADE_OVERRIDE pt='2', joining de/fr/es)** — BNCC EF02MA17 (estimar/medir/comparar
   capacidade; litro at 2º; ml/conversões = 3º-4º); CCSS Grade 3 = US offset. **Strand = Grandezas e medidas
   (NO override)** — capacidade = pure magnitude (per the #13 doctrine). ⚠ **False-friend LOCK: copo medidor
   (NEVER "vaso" = the es row's false-friend = vase/toilet in BR) · SUCO (not EU "sumo", not es "jugo") ·
   escala (not balança/régua) · Pippa a RÃ (not sapo) · litro/litros only-1-singular masc um/dois · pour =
   "Servir".** Estimate framing **"mais ou menos {w} {u}"** (works for 1 AND ≥2, unlike "uns um litro").
   Engine (heavy): WORDS_PT + unitPt + **CUST_L10N_PT (9 gender-baked customers)** + numWord/custName/speak/
   pippaSVG pt branches + strings.pt (14) + 4 unit-ternary sites + **4 inline spoken/aria pt branches**.
   §A.13.62 GREEN pt 54/54 + en 54/54; pt gate 74; tsc clean; personal-read estimate order + compare @768/360.
   ⚠ note the pt gate's EU_BAD list does NOT include "sumo" — grep it explicitly on any future juice/drink
   activity.

15. **tally-squirrel** — `tally-squirrel.add-four.2-nbt-b-6` (de `a1872347`) → „As cestas de bolotas do
   Tally". committed `a8b9966f`, wrapper 9.357, tally-squirrel-activity.js `?v=5`. o esquilo Tally fills 2-4
   baskets (each a 2-digit number); child ADDS them + types the total (keypad, sums <100), place-value/mental
   strategy (dezenas then unidades). **Grade = 2º ano (NO override)** — BNCC EF02MA06 *estratégias pessoais*
   (cálculo mental por decomposição, NOT conta armada; formal algorithm = 3º ano). **Strand = Números (NO
   override)** — NBT auto-map correct. Terms: **esquilo** (o esquilo Tally) · **bolotas** (acorns, fem →
   "Quantas bolotas") · **cestas** (⚠ NOT "canastra"=BR card game, the es "canastas" false-friend) · o total ·
   dezenas/unidades · child verb somar/juntar (NOT "adicionar"=technical) · join " mais " · keep article "o
   Tally". Engine (moderate): strings.pt (5) + speak/squirrelSVG/sayLine (join+suffix) pt branches; no
   number-word table. §A.13.62 GREEN pt 54/54 + en 54/54; pt gate 75; tsc clean; personal-read 2-basket +
   3-basket @768/360.

16. **sharing-jar** — `sharing-jar.make-fair.1-oa-d-8` (de `965c841d`) → „O pote justo". committed
   `8d74d89f`, wrapper 9.358, sharing-jar-activity.js `?v=7`. Pim & Bo scoop **contas** into two **potes**;
   child makes it JUSTO by finding the MISSING number + tapping (0-10). 5 concrete schemas (equalize-add/
   compare-diff/restore/reduce-to-target/start-unknown). **Grade = 1º ano (NO override)** — BNCC EF01MA08
   (problemas juntar/completar/comparar COM material manipulável = as contas). **⭐ Strand = Números (NEW
   STRAND_OVERRIDE pt='Números')** — OA auto → pt "Álgebra" (strand-names.ts:51) WRONG for CONCRETE
   operational number work; BNCC Álgebra no 1º ano é SÓ padrões/sequências (EF01MA09/10). **MIRRORS #9
   ten-stones (Números override), CONTRASTS #10 numbers-court (Álgebra kept — abstract relational =, 3º ano)**
   — the OA-splits-by-content triad is now complete: computation→Números(#9), abstract-relational→Álgebra(#10),
   concrete-missing-number→Números(#16). Terms: contas (fem) · **pote** (⚠ NOT frasco=cold/es-carryover, NOT
   jarra=pitcher false-friend) · justo · gap "a mais" child / "diferença" reveal-soft-label · spill=caíram ·
   missing=que falta. ⚠ **Pim/Bo article: pedagogo-ruled "o Pim / o Bo", "o pote do Bo" (masc articles)** —
   two-expert split: linguist wanted bare names (gender-neutral) but the pedagogue's BR-register authority
   won (bare first-names read EU-PT/literary in BR; warm register needs the article, masc unmarked default).
   Engine (heavy): WORDS_PT 0-12 + numWord/speak pt + strings.pt (25) + inline wrong-spoken. Singular-safety
   NON-ISSUE (round audit: no count is ever 1). §A.13.62 GREEN pt 54/54 + en 54/54; pt gate 76; tsc clean;
   personal-read equalize + start-unknown @768/360.

## ⭐ BR strand doctrine for the US "Operations & Algebraic Thinking" (OA) domain (learned #9/#10/#16)
The US OA domain LUMPS computation + algebra; BNCC splits it BY CONTENT. The pt auto-map sends OA → "Álgebra"
(strand-names.ts:51) — correct ONLY for abstract algebra. Per-activity ruling:
- **computation / fact-fluency** (make-a-ten, adding) → **Números** (STRAND_OVERRIDE) — #9 ten-stones.
- **concrete missing-number** (completar/comparar with manipulatives, ≤ small) → **Números** (STRAND_OVERRIDE)
  — #16 sharing-jar. BNCC Álgebra at 1º-2º ano is ONLY padrões/sequências, never concrete missing-number.
- **abstract relational =** (judging true/false equalities, the equal-sign as balance) → **Álgebra** (KEEP the
  auto-map) — #10 numbers-court (3º ano, EF03MA11).
Rule of thumb: if the child COMPUTES or manipulates concrete quantities → Números; if the child reasons about
the abstract STRUCTURE of equality/relation → Álgebra. (es OA auto-maps to "Sentido numérico" so es needs the
inverse override for #10; pt OA auto-maps to "Álgebra" so pt needs the override for #9/#16.)

17. **bundle-bot** — `bundle-bot.bundle-machine.1-nbt-b-2-a` (de `1db414aa`) → „Bolt agrupa dezenas".
   committed `d6a0452e`, wrapper 9.359, bundle-bot-activity.js `?v=7`. o robô Bolt builds a 2-digit number
   (20-49) by PLACE VALUE — solta unidades, conta dez, puxa a alavanca to AGRUPAR into a dezena; also
   desagrupar/impostor/decade/read-state/overfill. Heaviest — compound number-words 0-49. **Grade = 1º ano
   (NO override)** — BNCC EF01MA07 (compor/decompor de até DUAS ordens, com material manipulável); 2º ano
   começa na 3ª ordem/centenas. **⚠ the de Klasse-2 bump is a pure GERMAN-SYSTEM ARTIFACT (Klasse 1 caps at
   20) — does NOT transfer** (es/fr also kept grade 1; de:'2' stays de-only). **Strand = Números (NO
   override)** — NBT auto-map correct. Terms (consistent w/ #5): **agrupar/desagrupar/dezena** (fem) ·
   **unidades soltas** (fem, NOT avulsas) · **o número** (NOT algarismo) · **Forme {n}!** · **Bolt, o ROBÔ**
   (circumflex) · valor posicional. Imperative register = **você**. ⚠⚠ **DÉCADA TRAP: the "decade" cog is
   "só dezenas" — NEVER "década"** (= a 10-year period in pt!). **numWordPT 0-49** with " e " (vinte e três,
   quarenta e cinco — no fused veinti- forms; verified all 9 targets). Engine (heavy): numWordPT +
   numWord/speak/boltSVG pt + strings.pt (24) + 4 inline spoken/capitalize. §A.13.62 GREEN pt 54/54 + en
   54/54; pt gate 77; tsc clean; personal-read build @768/360.

## ⭐ BR grade doctrine: German Klasse-2 bumps are often SYSTEM ARTIFACTS (do not transfer)
German Klasse 1 caps at Zahlenraum bis 20, so ANY content in 20-100 is mechanically pushed to Klasse 2 —
this is a stratification ARTIFACT, NOT a content-difficulty signal. When a de sibling has GRADE_OVERRIDE
{de:'2'} but es/fr kept grade 1, check whether BR's 1º ano covers the range: BNCC 1º ano covers **até 100 +
composição/decomposição de até duas ordens** (EF01MA07) + comparação (EF01MA05) — so 2-digit place value,
counting to 100, grouping by tens = 1º ano in BR (like es/fr, NOT the de Klasse-2 artifact). #17 bundle-bot
+ the posy-egg-cartons/ten-tank/track-repair base-ten cluster all follow this. (Contrast: a REAL +1 content
demand — like #12 lay-units EF02MA16 iteration, or the clock EF03MA22 — DOES transfer to BR.)

## #18 DONE — line-plot "Shelly e a linha da maré" (`line-plot.read.2-md-d-9`, de `7b87985d`, commit f25906cb)
2nd DATA activity → **STRAND_OVERRIDE pt='Probabilidade e estatística'** (route line 192; the "Measurement &
Data" auto-map → "Grandezas e medidas" is a DOMAIN ERROR — assessed skill is reading frequencies, not
measuring; mirrors #7 graph-it line 191). **Grade = 2º ano, NO override** (BNCC data-reading EF02MA22 —
comparar informações em gráficos; German/es/fr all grade 2; nothing reaches 3º-ano interpretação). Engine:
L.pt (10) + strings.pt (8, plot-verb "marcar o X") + atN singular guard "uma concha"; html ?v=4→5; wrapper
9.359→9.360. ⚠⚠ **PLOTAR TRAP (pedagogue): the plot-verb must NEVER be "plotar"/"plota"** (dev jargon) →
"marcar / colocar o X" (content-creator prose had "plota"/"Plotar" → fixed to marca/Marcar). Terms: conchas
(fem, "uma concha"; ⚠ NOT "casca"=peel) · caranguejo-ermitão (o …, masc article; ⚠ NOT "eremita"=human, NOT
"paguro"=sci) · reta numérica · diagrama de frequências · "o comprimento que mais aparece" (⚠ NOT "a moda") ·
"a mais comprida ↔ a mais curta" (⚠ NOT longa/baixa; fem agrees with concha) · "quantos cm a mais". Win-wrapper
`Isso — {note}!` supplies the final `!` → winPlot/winMode/winNum drop trailing `!` (match de/es/fr). §A.13.62
GREEN pt 66/66 + en 66/66; pt gate 78; tsc clean (0 errors in touched files); personal-read read@768 (qAt) +
plot@768 (marcar o X, coral bar) + mode@360 (que mais aparece). 0 core/shell/direction. NO deploy.

## #19 DONE — hoppers-number-line "A Reta Numérica do Saltão" (`hoppers-number-line.jump-sums.2-md-b-6`, de `f96dedc1`, commit 6901c1c6)
Arithmetic on a number line → **STRAND_OVERRIDE pt='Números'** (route line 193; auto-map "Measurement & Data"
→ "Grandezas e medidas" is a DOMAIN ERROR — the reta numérica is only the model, the skill is add/subtract;
mirrors de "Zahlen und Rechnen" / es "Sentido numérico" / fr "Nombres et calcul"; NOT Álgebra=cálculo puro,
NOT Grandezas=medição). **Grade = 2º ano, NO override** (within-100 add/subtract on a reta numérica; de/es/fr
all grade 2; BNCC EF02MA06/EF02MA05, internal ref only). Engine: strings.pt (16) + speak() pt-BR TTS lang;
manifest 9× storyL10n.pt + pt slug/title/intro; html ?v=6→7; wrapper 9.360→9.361. ⚠⚠ **CHARACTER REBUILT:
"Hopper" → "Saltão"** (operator-approved via AskUserQuestion — Hopper carries a hop-meaning a BR kid misses,
the Span→Palmo #12 logic; pedagogue's pick over linguist's "Pulinho"; diverges from de/es/fr who kept Hopper).
Terms: pular / o pulo / tamanho do pulo · reta numérica (⚠ NOT linha numérica) · para frente (somar) / para
trás (subtrair) (⚠ NOT "para a frente"=EU) · **vitória-régia** (fem, iconic BR water lily; ⚠ NOT nenúfar=EU,
NOT flor de loto) · landing interjection **"Tchibum!"** (BR water-splash onomatopoeia) · "Onde ele vai
parar?". ⭐ Linguist template fix: **size-then-direction** ("pula {SIZE} para frente", NOT "para frente
{SIZE}") — natural BR word order + better TTS. §A.13.62 GREEN pt 54/54 + en 54/54; pt gate 79; tsc clean;
personal-read fwd@768 + back@1024 + fwd@360 (all model-phase, the longest-text surface). 0 core/shell/direction.
NO deploy.

## #20 DONE — plural "O Lago da Pérola" (`plural.irregular.l-2-1-b`, de `52f44d45`, commit 00262f68) — FIRST pt LITERACY activity
⭐ **First pt Language-strand activity → registered `pt` on the shared `strand-names.ts` 'Language' map =
`Análise linguística/semiótica`** (BNCC LP eixo, morfologia/ortografia; REUSABLE by every future pt literacy
activity — de/fr/es/nl/fi were already there; NO per-activity override needed). **Grade = 2º ano, NO override.**
⭐ **REBUILD-NOT-TRANSLATE word set** — this engine has `roundsL10n` where each locale builds its OWN
plural-rule word set (en foot→feet / de Umlaut / fr -al→-aux / es -es,-z→-ces). BR special-plural set (9):
-ão→-ães (pão/cão), -ão→-ões (balão/botão), -l→-ais (animal), -l→-éis (papel/anel), -l→-óis (lençol), -m→-ns
(homem). ⚠⚠ **EXCLUDE the -ãos family** (mão→mãos IS just +s) — it collides with the engine's +s distractor
(chips=[correct, singular+"s", singular]) → not 3-distinct. ⚠ **`plural-core.derivePlural` = `singular.replace
(FROM,TO)` = FIRST occurrence** → every FROM must be an unambiguous suffix (homem uses from="em" not "m").
Verified all 9: replace===expected, plural≠+s, 3 distinct chips. Engine: L.pt (7) + strings.pt (title/instr) +
hear inline pt branch + hear pt-BR TTS lang; manifest roundsL10n.pt (9) + slug/title/intro; html ?v=4→5;
wrapper 9.361→9.362. ⚠ **CHARACTER: Pearl → Pérola** (pt for pearl; fr already localized to "Perle" → follows
precedent, no operator fork; ensemble unanimous). ⚠ **BR register: double aspas “…” NOT guillemets «…»**
(guillemets = EU tell; use curly U+201C/U+201D — JSON-safe); "Toque"/você-form imperatives, never "Carrega"/
tu-form. Terms: título "O Lago da Pérola", "não é só juntar um s", win "Isso!". §A.13.62 GREEN pt 54/54 + en
54/54; pt gate 80; tsc clean; personal-read pão@768 + animal@360 (the [correct/+s/unchanged] chip trio + curly
aspas render). 0 core/shell/direction. NO deploy.

## #21 DONE — tense "A Torre do Tempo do Juniper" (`tense.past-present-future.l-1-1-e`, de `1b00767b`, commit b3acb074) — 2nd pt LITERACY
⭐ **Strand AUTO-mapped via #20's strand-names.ts 'Language'.pt = "Análise linguística/semiótica"** — NO new
strand-names edit (the reusable literacy-strand registration paid off; confirmed the pattern). **Grade = 2º ano
via GRADE_OVERRIDE pt:'2'** (route line 77, row was `{de,fr,es}` all '2'; en manifest is grade-1 L.1.1.e but the
systematic 3-way presente/pretérito/futuro contrast WITH a future = grade-2 flexão verbal; NOT the German-
Klasse-2-artifact since es+fr also chose 2). ⭐ **REBUILD-NOT-TRANSLATE verb set** (this engine has roundsL10n
with per-locale conjugations): 9 rounds, 3ª pessoa plural, 3 past/3 present/3 future, verbs navegar/fazer/
correr/nadar/dançar/ler/pular/cantar/brincar (fazer+ler irregular). ⚠⚠ **FUTURE = periphrastic "vão + inf"
("vão navegar"), NOT synthetic "navegarão"** (pedagogue-decisive: BR spoken norm + transparent future marker
like en will/de werden; the synthetic "-ão" visually collides with pretérito "-aram" → would muddy the very
contrast the tool teaches). presente/pretérito PERFEITO (NOT imperfeito); time words Ontem / **Agora** (NOT
Hoje — "hoje" can point at later-today, blurring present/future) / Amanhã. Engine: WIN_LABELS.pt + L.pt (6) +
strings.pt + hear inline pt + hear pt-BR lang + _srMirror pt; manifest roundsL10n.pt (9) + slug/title/intro;
html ?v=4→5; wrapper 9.362→9.363. **Character "Juniper" KEPT** (all siblings kept it; not a mechanic-pun — vs
#20 Pearl→Pérola which fr had localized). BR register: curly aspas “…” not «…»; você-form. §A.13.62 GREEN pt
54/54 + en 54/54; pt gate 81; tsc clean; personal-read Ontem/past@768 + Amanhã/future@360 (correct window lit,
multi-word "vão …" chips fit). 0 core/shell/direction. NO deploy.

## #22 DONE — affix "A Máquina de Palavras da Marigold" (`affix.apply.l-2-4-b`, de `8fbb297f`, commit 5b2790f8) — FIRST pt VOCABULARY-strand
⭐ **First pt Vocabulary-strand activity → registered `pt` on the shared `strand-names.ts` 'Vocabulary
Acquisition and Use' map = `Ampliação do vocabulário`** (pedagogue-DECISIVE: NOT collapsed to "Análise
linguística/semiótica" — the sibling design deliberately SEPARATES vocab from grammar [es Ampliación vs
Reflexión; de Wortschatz vs Sprache; fr lexique vs étude], and "Ampliação do vocabulário" is BNCC-grounded
descriptor language [appears verbatim in habilidade descriptions] = the §17.4.3 finer-descriptor pattern;
reserve "Análise linguística/semiótica" for grammar activities #20/#21). REUSABLE for future pt vocab
activities; NO per-activity override. **Grade = 2º ano, NO override** (L.2.4.b; keep framing at
meaning-inference not formal formação-de-palavras, which lands 3-4º — grade-honest). ⭐ **REBUILD-NOT-TRANSLATE
affix set** (engine uses abstract slots un/re/ful realized per-locale via SENSE+LABEL maps): BR = **des-(un, O
CONTRÁRIO) / re-(re, DE NOVO) / -oso(ful, CHEIO DE)**. ⚠⚠ **DROP the "-less"/"ful↔less" slot** — Portuguese
has NO productive "-less" suffix ("sem" is a preposition, won't attach; es dropped it too). 11 rounds (8 apply
[read word→pick meaning] + 3 which [read meaning→pick affix cog]); word is STORED (`round.word`) not derived →
morphological irregularity (medo→medroso) is fine. ⚠ options are ARRAY `[{affix,text}]` not object. Engine:
SENSE.pt + LABEL.pt + L.pt (5) + strings.pt + cog aria pt + _srMirror pt (2 branches); manifest roundsL10n.pt
(11) + slug/title/intro; html ?v=4→5; wrapper 9.363→9.364. **Character "Marigold" KEPT** (all siblings). ⚠
pedagogue SWAP: which-cog usar/reusar → **abrir/reabrir** ("reusar" techy/awkward in BR). BR register: curly
aspas “…” not «…»; você-form; cog = "engrenagem"; machine = "máquina". §A.13.62 GREEN pt 66/66 + en 66/66; pt
gate 82; tsc clean; personal-read desarrumar-apply@768 + reabrir-which@360 (des-/re-/-oso cogs + senses render).
0 core/shell/direction. NO deploy.

## #23 DONE — sentence-builder "Wiggles Monta Frases" (`sentence-builder.build-a-sentence.l-1-1-j`, de `b7842370`, commit 3f0901db) — 3rd pt LITERACY
Strand AUTO-maps via #20's strand-names.ts 'Language'.pt = "Análise linguística/semiótica" (sintaxe/construção
de frases; NO new edit — the pattern holds). **Grade = 2º ano via GRADE_OVERRIDE pt:'2'** (route line 78, row
was `{de,fr,es}` all '2'; en manifest grade-1 L.1.1.j but systematic sentence construction + ordem das palavras
+ concordância = grade-2 análise linguística; es+fr chose 2 too, not a German artifact). ⭐ **REBUILD-NOT-
TRANSLATE sentences** (engine roundsL10n, each locale builds its own word order): 9 rounds, shape **Determiner +
Noun + Adjective + Verb.** — ⚠ **adjective AFTER the noun** (BR/Romance order "O cachorro marrom late.", mirrors
es/fr; UNLIKE en/de adjective-before). Gender agreement Det↔Noun↔Adj must be correct (amarelo/vermelho masc,
branca/roxa fem; marrom/laranja/azul/verde/rosa invariable). ⚠ **subject.noun + themeDir are LANGUAGE-NEUTRAL
image keys** (`/image-library-webp/themes/<themeDir>/<noun>@2x.webp`) — kept from es (dog/animals, cat/animals,
sun/beach, bus/vehicles, frog/camping, pig/animals, hen/"birds 2", fish/animals, flower/spring); only
`canonical` + `subject.label` change per locale. Engine: L.pt (5) + strings.pt (5, siblings populate BOTH L +
strings) + speak pt-BR (2 sites: _checkNow + hear) + _srMirror pt; manifest roundsL10n.pt (9) + slug/title/
intro; html ?v=4→5; wrapper 9.364→9.365. **Character "Wiggles" KEPT** (all siblings; name evokes wiggling not
the sentence mechanic). Ensemble reconciliations: #4 verb "anda" KEPT (pedagogue over linguist "passa"); #9 "A
flor roxa cresce" (roxa vs vermelha to avoid #8 back-to-back); prose fixes (vermelha→roxa; howToPlay
arraste→toque, mechanic is TAP-only). "frase" not "oração" (oração=technical/prayer); BR curly aspas “…”;
você-form. §A.13.62 GREEN pt 54/54 + en 54/54; pt gate 83; tsc clean; personal-read dog-empty@768 + hen@360
(subject images render + scrambled pt tiles + gender agreement). 0 core/shell/direction. NO deploy.

## #24 DONE — pronoun "A Chapelaria da Hattie" (`pronoun.case.l-1-1-d`, de `34cbb59c`, commit b0ed75dd) — 4th pt LITERACY, ⭐ FIRST grade-3
Strand AUTO-maps via #20's 'Language'.pt = "Análise linguística/semiótica" (pronomes pessoais). ⭐ **FIRST
grade-3 pt activity → GRADE_OVERRIDE pt:'3'** (route line 79, row was `{de,fr,es}` all '3'; en manifest grade-1
L.1.1.d but the reto/oblíquo + possessivo CASE contrast is grade-3, BNCC EF35LP14; subject pronouns alone are
grade-2). ⭐ **REBUILD pronoun set** (engine: non-EN rounds carry their own forms via a per-locale `pt:{correct,
wrong}` key; `pnChips`/`pnIsAnswer` read `r[LANG]`): 9 rounds (3 subject + 3 object + 3 possessive), each =
correct vs a wrong-CASE form of the SAME referent (a real BR case-error, not nonsense). ⭐ **Pedagogue's
paradigm-complete design**: eu→me→meu + nós→nos→nossa (same person "changing hats" across the 3 jobs — perfect
for a HAT shop) + te→teu + the "A Lia e eu" compound (the flagship BR subject skill "…e eu" not "…e mim"). ⚠⚠
**NO o/a clitics anywhere** — the 3rd-person object clitics o/a COLLIDE with the articles o/a AND colloquial BR
uses "ele/ela" as objects, so an o/a round drills norma kids don't say OR marks natural speech wrong; me/te/nos
are the clean pan-BR contrasts. ⚠ BR has NO clean 3rd-person SUBJECT case-error (ele/ela = both reto+oblíquo) →
both subjects use eu/mim + nós/nos (a feature not a gap). Possessive fork RESOLVED = CASE axis (meu/mim, teu/tu,
nossa/nós — keeps the wrong-case pattern; the gender axis minha/meu was the linguist's alt, declined). Engine:
L.pt (9) + strings.pt + hear blank-word "espaço" + hear pt-BR lang + _srMirror pt (joiner " ou " + "espaço");
manifest roundsL10n.pt (9) + slug/title/intro; html ?v=4→5; wrapper 9.365→9.366. **Character "Hattie" KEPT**
(all siblings). ⭐ **Metalanguage ruling**: child-facing text stays PLAIN (quem FAZ / com quem / de quem) —
"caso reto/oblíquo" only in PARENT prose, NEVER on the play surface (mirrors es "sin nombres técnicos").
§A.13.62 GREEN pt 54/54 + en 54/54; pt gate 84; tsc clean; personal-read Eu/Mim-subject@768 + meu/mim-possessive@360
(case contrasts + Hattie render). 0 core/shell/direction. NO deploy.

## #25 DONE — sentence-clinic "A Clínica de Frases da Dra. Plume" (`sentence-clinic.fix-it.l-2-1`, de `db3a8338`, commit 853ef521) — 5th pt LITERACY
Strand AUTO-maps via #20's 'Language'.pt. **Grade = 2º ano, NO override** (manifest grade "2"; de #25 changed
ONLY the wrapper — no grade/strand row; es/fr/de all grade 2). ⭐ **REBUILD 7 fix-it rounds** (each locale
builds its own sentences; one per action: capitalize / insert-punct / swap / insert-word / reorder / delete /
split — each with a plain kid-rule `convention` + a `clean` corrected form). Engine: **strings.pt (13)** —
title, instruction, 7 per-action prompts (promptCap/Punct/Swap/Insert/Reorder/Delete/Split), alright, giggle,
soundsRight, hintCheck — in the `this.strings` object (shell `api.t()`); + speak() pt-BR (2 sites, line 49+51).
Manifest roundsL10n.pt (7); html ?v=5→6; wrapper 9.366→9.367. ⚠ **Check-button label = "Verificar"** (shell,
confirmed by grepping lcs-shell.js) → used in instruction + hintCheck (NOT the linguist's "Conferir"). ⭐⭐
**Two ensemble-flagged reconciliations both experts caught independently:** (3) swap distractors — the linguist
caught that `comia`/`comeu` are VALID sentences (correct agreement, just past tense) so they can't be "wrong"
distractors; the pedagogue caught that `comes` is an EU tu-form → resolved to **`[como, comemos]`** (present-tense
wrong-PERSON agreement errors, BR-natural, not-tu, not accidentally-valid); (7) run-on — "Eu corro faz calor"
is a disconnected non-sequitur → pedagogue's **"A chuva cai o vento sopra" → "A chuva cai. O vento sopra."** (two
complete independent SVO). ⚠ round 5 (reorder) stays PERIOD-LESS to match en/de/fr/es (the punctuation lesson is
round 2 — don't add a period even though it looks inconsistent alone). **Character "Dra. Plume"** (owl =
grandmother → feminized like es; the "Dra. Pena"=feather pun is NOT mechanic-load-bearing so kept the name).
"frase" not "oração". §A.13.62 GREEN pt 42/42 + en 42/42; pt gate 85; tsc clean; personal-read swap-verb@768 +
reorder@360 (Dra. Plume owl renders, "Verificar"). 0 core/shell/direction. NO deploy.

## #26 DONE — sage-root-garden "O Jardim de Palavras da Sage" (`sage-root-garden.roots.l-2-4-c`, de `7d3052db`, commit b6e42814) — 6th pt LITERACY
⭐ **STRAND_OVERRIDE pt='Ampliação do vocabulário'** (route line 163; the row already had `{fr:'Le lexique',
es:'Ampliación del vocabulario'}` — ⚠ the MANIFEST says strand "Language" but es/fr per-activity-override it to
VOCABULARY because família de palavras = morfologia derivativa = same eixo as #22 affix; only de/en leave it
under grammar [DE-specific] → pt mirrors es/fr). **Grade = 2º ano, NO override** (manifest grade "2";
recognition-level, NOT the 4º-ano radical/derivation naming). ⭐ **REBUILD 8 word-family rounds** (each locale
builds its own; root → family word that VISIBLY contains the root + 2 look-alike foils; engine shuffles
choices, `correct` field identifies the answer). ⚠⚠ **BR TRAP: many pt derivations MUTATE the root** (pão→padeiro
does NOT contain "pão") → ONLY use roots whose family word preserves the root/stem (florista←flor, saleiro←sal,
marinheiro←mar, dentista←dente, pedreiro←pedra, livraria←livro, gatinho←gat, solzinho←sol). ⭐ 4 GOLD near-miss
foils (sala/dentro/martelo/pedaço — start with the root letters but are a DIFFERENT word — the ideal
discrimination foil). ⚠ chuveiro EXCLUDED (it IS chuva-family). Engine: strings.pt (8) + speak() pt-BR (2) +
rootBox aria pt; manifest roundsL10n.pt (8) + slug/title/intro; html ?v=4→5; wrapper 9.367→9.368. ⭐⭐
**Character "Sage" gendered FEMININE "a Sage"** — 2/3 experts (linguist+pedagogue) + es "la tortuga" + tartaruga
is grammatically fem OUTVOTED the content-creator's masculine "o Sage" draft → **feminized the prose** (o→a
Sage, ele→ela); title "O Jardim de Palavras da Sage" (fem "da"). ⚠ **sageIntro SHORTENED** to fit the `.srg-say`
2-line clamp at 360px — visual-qa caught a TEXT-CLIP at the narrowest phone (a long intro string in a
line-clamped speech bubble; shorten the pt string, the "ache a família" call was redundant with theAsk). "raiz"
not "radical" (garden theme + kid word). §A.13.62 GREEN pt 48/48 + en 48/48; pt gate 86; tsc clean;
personal-read flor@768 + dente@360 (Sage renders, the "dentro" gold foil, "Verificar"). 0 core/shell/direction.
NO deploy.

## #27 DONE — olive-kind-of "A árvore de categorias da Olive" (`olive-kind-of.category-attribute.l-1-5-b`, de `89302dc7`, commit c1bc6624) — 7th pt LITERACY
"Olive's Kind-Of Tree" — Olive the OWL shows a picture + an attribute CLUE; child taps the CATEGORY /
superordinate (6: Animal/Comida/Veículo/Roupa/Planta/Móvel). ⭐ **STRAND_OVERRIDE pt='Ampliação do vocabulário'**
(route ~line 196; row already `{de:'Wortschatz…', fr:'Le lexique', es:'Ampliación del vocabulario'}` — categorizar
por hiperônimo = lexicon, MISMO eixo #22 afixos + #26 famílias; manifest strand "Language" per-activity-overridden
to VOCAB, mirror es/fr NOT de). ⭐ **GRADE_OVERRIDE pt='2'** (route ~line 80; subsumir num hiperônimo = 2º ano;
nomear concreto = 1º; matches de/fr/es). ⭐⭐ **Character "Olive" = FEMININE "a Olive" (uma coruja)** — both experts
+ de/es/fr; pronoun ela. ⭐ **8 rebuilt category rounds** mirror es (target picture + BR attribute clue + correct
category ∈ 3 choices; noun/themeDir = language-neutral image keys copied from es; choices position-mirror es).
⚠ engine grades on `category === choice.word` byte-equality → the 6 category words must be spelled identically
everywhere (Veículo, Móvel with accents). **Ensemble conflict resolutions:** #4 chapéu → linguist "Você usa na
cabeça" ("largo" read odd; linguist owns naturalness); #5 rosa → pedagogue "espinhos no caule" KEPT (2º-ano Ciências
word, clue box wraps freely); #6 mesa → pedagogue "quatro pernas de madeira" (kid-default; "plana"+"de madeira"
resolve the Animal-distractor). Engine: strings.pt (8) + speak() pt-BR (2 sites, lines 21+22) + pic aria pt (line 80);
manifest roundsL10n.pt (8) + top-level slug/page_title/page_intro.pt (⚠ es page_intro cites "SEP"; pt cites NO code);
html ?v=4→5; wrapper 9.368→9.369. `oliveIntro` "Leia a pista: que tipo de coisa é?" (34 chars, clamp-safe in the
`.okt-say` 2-line box — the #26 lesson). Core = CategoryDefineCore (0 lines). §A.13.62 GREEN pt 48/48 + en 48/48;
pt gate 86→87; tsc touched-files clean; personal-read cachorro@768/@360 + rosa@1024 (Olive renders, "PISTA:" clue,
"Verificar", no English leak). 0 core/shell/direction. NO deploy.

## #28 DONE — vera-verb-match "Vera e o verbo estar" (`vera-verb-match.be-agreement.l-1-1-c`, de `c70934e3`, commit a85e5096) — 8th pt LITERACY
"Vera's Verb Match" — Vera (a vole) shows a sentence with a GAP + 3 fixed cards = the person/number forms of ONE
copula; child taps the form that agrees (concordância verbal). ⭐⭐ **THE COPULA FORK → ESTAR** (estou/está/estão):
Portuguese has TWO copulas (ser/estar) where EN am/is/are + DE bin/ist/sind collapse to one. **Spanish — the OTHER
ser/estar language — already resolved it to ESTAR** (estoy/está/están), every round a location/temporary-state context;
BR estar is identical → pt mirrors es. SER would force identity/permanent predicates (muddier). eu→estou, um/uma→está,
vários→estão. Both experts LOCKED estar. (fr used être / single copula; de used sein.) ⭐ **GRADE_OVERRIDE pt='2'**
(route ~line 81; row `{de:'2',fr:'2',es:'2'}`; kids SPEAK the forms at 1º, the conscious agreement task = reflexão
metalinguística = 2º). ⭐ **NO STRAND_OVERRIDE** — manifest strand "Language" auto-maps via strand-names.ts
'Language'.pt = "Análise linguística/semiótica" (grammar; de/fr/es added no override either). ⭐⭐ **Engine ALREADY
GENERALIZED by the es/fr builds** — `FORMS_L10N={de,fr,es}` map + `vvmForms()` + `vvmGrade()` + setupTask choice-swap;
pt needs ONLY: add `FORMS_PT=['estou','está','estão']` + `pt:FORMS_PT` to FORMS_L10N (setupTask+grading auto-handle) +
speak() pt-BR (2 sites) + strings.pt (7). ⚠ `correct` byte-identical to a FORMS_PT string (accents está/estão). ⚠
`.vvm-say` (veraIntro) has line-clamp:2 — pt "Lembre: "estou" (eu)…" 54 chars, clamp-safe (curly aspas render fine).
Manifest roundsL10n.pt (8, `{id,band,subject,before,after,correct}`; before=trailing space, after=leading space) +
top-level slug/title/intro.pt (no code). **Character "Vera" = FEMININE "a Vera, uma ratinha do campo"** (es used
"ratoncita", de "Wühlmaus"). **Round 6 = pedagogue's variety swap** (es-mirror "na escola" location → "feliz hoje"
state, "hoje" anchors estar) so estou spans location+state. html ?v=4→5; wrapper 9.369→9.370. Core=BeAgreementCore
(0 lines). §A.13.62 GREEN pt 48/48 + en 48/48; pt gate 87→88; tsc clean; personal-read jardim@360 (veraIntro 2-line,
no clip) + cachorro@768 + crianças@1024 (Vera renders, all 3 estar cards, "Verificar", no leak). 0 core/shell/direction. NO deploy.

## #29 DONE — hazel-word-bridge "A ponte de palavras da Hazel" (`hazel-word-bridge.joining-words.l-1-1-g`, de `5f4198a1`, commit e95cd171) — 9th pt LITERACY
"Hazel's Word Bridge" — Hazel (a heron) shows a two-clause sentence with a `___` gap + 4 fixed cards = joining
words; child taps the conectivo whose MEANING joins the clauses (each round has a fixed `relation`). ⭐ **4 BR
conjunctions = e (addition) / ou (alternative) / mas (contrast) / porque (cause)** — mirror es y/o/pero/porque
(pedagogue rejected porém/pois/e daí). ⭐ **GRADE_OVERRIDE pt='3'** (route ~line 82; row `{de:'3',fr:'3',es:'3'}`;
selection-by-meaning incl. causal porque + vírgula-antes-de-mas = 3º análise linguística). ⭐ **NO STRAND_OVERRIDE** —
strand "Language" auto-maps to 'Language'.pt = "Análise linguística/semiótica" (grammar). ⭐⭐ **Engine ALREADY
GENERALIZED by es/fr** — `REL_CONJ_L10N` + `CHIPS_L10N` maps + `hwbOracle`/`hwbIsAnswer` + setupTask chip-swap; pt
needs ONLY add `REL_CONJ_PT={addition:'e',alternative:'ou',contrast:'mas',cause:'porque'}` + `CHIPS_PT=['e','ou','mas',
'porque']` + `pt:` in both maps (setupTask+grading auto-handle) + speak() pt-BR (2) + sayable pt 'lacuna' + render aria
+ strings.pt (7). ⚠ manifest round `{id,band,relation,sentence}` — `sentence` holds the `___`; correct is DERIVED from
`relation` (no answer leak); `relation` ∈ {addition,alternative,contrast,cause}. ⚠ `.hwb-say` (hazelIntro) line-clamp:2
— pt ~62 chars, clamp-safe. **Character "Hazel" = FEMININE "a Hazel, uma garça"** (es "la garza", de "der Reiher").
⭐⭐ **Round-6 disambiguation lesson:** the es-mirror cause sentence "Eu como uma maçã ___ estou com fome" admits "mas"
("but still hungry") → replaced with "Eu acendo a luz ___ está escuro" (cause dominant). Punctuation: comma before **mas**,
none before e/ou/porque; "a gente"+3sg = BR-kid register. #2 "brincar no balanço" (not EU "baloiço"). html ?v=4→5;
wrapper 9.370→9.371. Core=ConjunctionCore (0 lines). §A.13.62 GREEN pt 48/48 + en 48/48; pt gate 88→89; tsc clean;
personal-read comida@360 (hazelIntro 2-line, tiny "e" chip legible) + parque@768 + luz@1024 (Hazel renders, 4 chips,
"Verificar", no leak). 0 core/shell/direction. NO deploy.

## #30 DONE — cleo-packing-list "A lista do Cleo" (`cleo-packing-list.series-commas.l-1-2-b`, de `7191e4f0`, commit 4347ce7f) — 10th pt LITERACY
"Cleo's Packing List" — Cleo (a chameleon) shows the SAME 3-item list in THREE comma versions; child taps the one
with correct commas (vírgula em enumeração). The engine BUILDS the 3 versions in code from `lead`+`items[3]`+`slot`:
correct ("maçãs, peras e ameixas"), no-comma foil, misplaced foil (comma before "e"). ⭐ **BR rule: comma between
items, NONE before "e"; pt "e" is INVARIANT** (no y→e euphony like Spanish). ⭐ **GRADE_OVERRIDE pt='3'** (route ~line
83; row `{de:'3',fr:'3',es:'3'}`; 1º-2º = só ponto/maiúscula; a vírgula em enumeração = a PRIMEIRA regra de vírgula = 3º).
⭐⭐ **STRAND: NO OVERRIDE — the key ruling.** de overrode to "Richtig schreiben", es to "Ortografía y puntuación"
(their curricula SPLIT spelling/punctuation from grammar); **fr did NOT override, and pt follows fr**: BNCC has NO
separate ortografia/pontuação eixo — pontuação lives INSIDE "Análise linguística/semiótica" (the umbrella). Inventing a
spelling chip would misname the framework. **Left the STRAND_OVERRIDE map untouched** (row 197 stays `{de,es}` only).
⭐⭐ **Engine ALREADY GENERALIZED by es/fr** — per-locale forms builders + `FORMS_BUILDER={de,fr,es}` + `cplFormsOf`/
`cplChildView`/`cplGrade`; pt needs ONLY add `ptCorrect/ptNocomma/ptMisplaced/ptFormsOf` (copy de recipe, und→e) +
`pt:ptFormsOf` in FORMS_BUILDER (setupTask+grading auto-handle) + speak() pt-BR (2) + strings.pt (7). ⚠ manifest round
`{id,band,lead,items:[3 no-comma nouns],slot}` — engine adds the commas; the 3 versions share lead+items, differ ONLY
by comma placement (no answer leak). NO render aria (grep clean). **Character "Cleo" = MASCULINE "o Cleo, um camaleão"**
(es "el camaleón", fr "le caméléon"; ⚠ spelling camaleão nasal diphthong). #8 items "lápis"→"colas" (pedagogue: lápis is
invariável, no visible plural marker; the activity teaches plural lists). ⚠⚠ **cleoIntro TEXT-CLIP @360** — the 62-char
"Dica do Cleo: …" clipped the `.cpl-say` 2-line clamp; SHORTENED to "Vírgula entre as coisas, nunca antes do "e"!" (~44
chars) → GREEN (the recurring line-clamp lesson, #26/#27). html ?v=4→5; wrapper 9.371→9.372. Core=SeriesCommaCore (0
lines). §A.13.62 GREEN pt 48/48 + en 48/48; pt gate 89→90; tsc clean; personal-read frutas@360 (3 versions, cleoIntro
2-line) + louça@768 + arte/colas@1024 (Cleo renders, "Verificar", no leak, no spelling-label override). 0 core/shell/direction. NO deploy.

## #31 DONE — robin-mirror "O espelho do Robin" (`robin-mirror.reflexive.l-2-1-c`, de `2a5c9345`, commit 014c4225) — 11th pt LITERACY
"Robin's Mirror" — Robin (a bird) shows a sentence with a `___` for a REFLEXIVE PRONOUN; child taps the reflexive
that agrees with the subject (3 chips). Engine maps subject person-key → reflexive; chips = reflexive(referent/
wrongA/wrongB), must be 3 DISTINCT forms. ⭐⭐ **THE BR PARADIGM FORK (pedagogue-decided): você-based 3-form
`{me (eu), se (você/ele/ela/a gente/vocês/eles/elas), nos (nós)}`, NO tu→te.** Mirroring es me/te/se/nos would be
TRANSLATING not rebuilding — "tu te escondes" is a register no BR child speaks (regionally marked). This is where BR
legitimately DIVERGES from Spanish. ⭐ **Include `a gente → se` (3sg)** — the real BNCC contrast vs `nós → nos` (1pl):
same meaning "we", different reflexive + different verb agreement. ⭐⭐ **PROCLISIS** — reflexive BEFORE the verb with
an EXPLICIT subject before the blank ("Eu ___ escondo", NEVER enclisis "escondo-me", NEVER blank-opens-clause);
per-subject verb agreement authored per round (eu me escondo 1sg / você se esconde 3sg / a gente se senta 3sg / nós
nos arrumamos 1pl). ⭐ **GRADE_OVERRIDE pt='3'** (route ~line 84; row `{de:'3',fr:'3',es:'3'}`). ⭐ **NO STRAND_OVERRIDE**
— grammar → 'Language'.pt = "Análise linguística/semiótica" (de/fr/es added none). ⭐⭐ **Engine ALREADY GENERALIZED by
es/fr** — `REFL_L10N={de,fr,es}` (person-key→reflexive maps) + `rmReflexiveOf`/`rmChips`/`rmIsAnswer` + generalized
setupTask; pt needs ONLY add `REFL_PT={eu:'me',voce:'se',ele:'se',ela:'se',a_gente:'se',nos:'nos',voces:'se',eles:'se',
elas:'se'}` + `pt:REFL_PT` in REFL_L10N (setupTask+grading auto-handle) + speak() pt-BR (2) + sayable pt + render aria
+ strings.pt (7). ⚠ manifest round `{id,band,sentence,referent,wrongA,wrongB}` — sentence holds the `___` (próclise,
explicit subject); the 3 keys must map to distinct {me,se,nos}; correct DERIVED (no leak). **Character "Robin" =
MASCULINE "o Robin, um passarinho de peito vermelho"**; anchor verb "se olhar no espelho" (Robin himself in #8).
html ?v=4→5; wrapper 9.372→9.373. Core=ReflexivePronounCore (0 lines). §A.13.62 GREEN pt 48/48 + en 48/48 (long
hintPick/hintWrong didn't clip); pt gate 90→91; tsc clean; personal-read esconde@360 (próclise, robinIntro 2-line, chips
nos/se/me) + a-gente@768 (the se-contrast) + robin-olha@1024 (mirror anchor). ⚠ ran an explicit enclisis + tu/te grep on
the robin block (0). 0 core/shell/direction. NO deploy.

## #32 DONE — wally-capital-crane "Wally e seu guindaste" (`wally-capital-crane.special-names.l-2-2-a`, de `4d60f5ab`, commit e79fe9a2) — 12th pt LITERACY
"Wally's Capital Crane" — Wally (a walrus) shows a sentence where ONE word needing a capital is lowercase; child
taps it + a crane capitalizes it. Round `{id,band,tokens:[words+"."],proper}`; tokens[0]=sentence-start-capital;
`proper`=the mid-sentence lowercase word; grade on sel===proper. ⭐⭐ **CONCEPT DIVERGES HARD:** EN=holidays/
products/geo; DE=ALL nouns (Nomen-Großschreibung); **es/fr/pt = NOMES PRÓPRIOS (pessoas + lugares ONLY)** — BR does
NOT capitalize common nouns (cachorro/prima stay lowercase). ⭐ Excluded marcas + datas (pedagogue: "Natal" is ALSO a
city = ambiguous). ⭐ **Grade 2º ano = the NATIVE manifest grade** (`alignment.grade="2"`; es/fr/de all ship wally at
native 2) → **NO GRADE_OVERRIDE** for pt. ⭐⭐ **NO STRAND_OVERRIDE even though de/fr/es ALL overrode** to an
orthography label ("Richtig schreiben"/"L'orthographe"/"Ortografía y puntuación") — BNCC has NO separate ortografia
eixo (maiúscula lives INSIDE "Análise linguística/semiótica"); siblings override because they HAVE the domain, pt
declines because it doesn't (#30 logic). **Left BOTH route maps untouched** (only the wrapper line changed). ⭐⭐ **the
`é` RENDERING TRAP:** engine `isWord=/[A-Za-z]/` treats accent-only "é" as PUNCTUATION → non-tappable `.wcc-punct`
span; so ALL pt sentences are **é-free** (round 3 "é preto"→"late muito") — every word a tappable chip (family/avô are
fine, they contain ASCII letters). **Character "Wally" = FEMININE "a Wally, uma morsa"**; "guindaste" (BR) not "grua"
(EU). **Both experts rejected the "dona clara" round** ("dona" is a capitalizable courtesy title + "clara" = also the
adjective *clear*) → pedagogue's "Eu gosto de brincar com a laura." Engine minimal: strings.pt (7) ONLY (LANG only for
roundsL10n pick; strings via api.t) + manifest roundsL10n.pt (8) + slug/title/intro.pt; NO GRADE/STRAND/speak edit.
⚠⚠ **wallyIntro TEXT-CLIP @360/@412** — 56-char intro clipped `.wcc-say` (tighter box than robin's); SHORTENED to
"Nome próprio começa com letra maiúscula!" (40 chars) → GREEN (the recurring line-clamp lesson). html ?v=4→5; wrapper
9.373→9.374. Core=CapitalNameCore (0 lines). §A.13.62 GREEN pt 48/48 + en 48/48; pt gate 91→92; tsc clean;
personal-read brasil@360 (word-chips, wallyIntro 2-line) + sofia@768 (é-free "late muito") + laura@1024 (the round-7
replacement). 0 core/shell/direction. NO deploy.

## #33 DONE — rusty-yesterday "Rusty e a Máquina de Ontem" (`rusty-yesterday.irregular-past.l-2-1-d`, de `62b8ac5e`, commit 9a232b98) — 13th pt LITERACY
"Rusty's Yesterday Machine" — Rusty (a robot) shows "Hoje eu {present}." + "E ontem?"; child taps the correct PAST
form among 3 chips. Round `{id,band,present,correct,choices:[{word}×3]}`; `present`=a bare present phrase (the
`todayTpl` "Hoje eu {present}." wraps it), `correct`=past form, `choices`=[correct, present, overregular]; words stored
LITERALLY (no derive-map). ⭐ **BR = PRETÉRITO PERFEITO irregular (1ª pessoa eu)**, mirroring the Spanish preterite
(not EN "goed"/DE "gehte"). ⭐⭐ **The wrong choice = the authentic BR criança OVERREGULARIZATION** (stem + regular
ending: faço→fiz, kid says *fazi; estar→estive → *estei) — both experts: THE canonical L1-português error (analogue of
es *hací*). ⭐ **GRADE_OVERRIDE pt='3'** (route ~line 85; row `{de:'3',fr:'3',es:'3'}`). ⭐⭐ **NO STRAND_OVERRIDE even
though fr overrode** to "La conjugaison" — BNCC has no separate conjugação eixo (morfologia verbal lives inside Análise
linguística/semiótica); de+es didn't override either → pt follows de/es. **Left STRAND map untouched (rusty row stays
`{fr}` only).** ⭐⭐ **Engine ALREADY GENERALIZED by es/fr** — LANG only for roundsL10n pick; strings via api.t (incl.
templated todayTpl/yTpl); pt needs ONLY strings.pt (9, ⚠ keep `{present}` placeholder in todayTpl) + speak() pt-BR (2)
+ panel aria + manifest roundsL10n.pt (8) + slug/title/intro. **Character "Rusty" = MASCULINE "o Rusty, um robô".**
⭐⭐ **Round-8 ter→caber (both experts):** ter has NO clean overregularization ("*ti" collides with the pronoun *ti*;
"teve" is a real 3rd-person word that breaks the mechanic) → caber→coube (mirrors saber→soube), "cabi" is an
unambiguous NON-WORD (the cleanest reject-the-invented-form distractor). ⚠ pt uses "pular" not EU "saltar". 8 verbs:
fazer/dizer/trazer/poder/querer/saber/estar/caber. html ?v=4→5; wrapper 9.374→9.375. Core=IrregularPastCore (0 lines).
§A.13.62 GREEN pt 48/48 + en 48/48; pt gate 92→93; tsc clean; personal-read faço-bolo@360 (panel + chips fiz/fazi/faço,
rustyIntro 2-line) + estar@768 (estive/estei/estou) + caber@1024 (coube/caibo/cabi). 0 core/shell/direction. NO deploy.

## #34 DONE — roary-roar-meter "Roary e o Rugidômetro" (`roary-roar-meter.shades.l-2-5-b`, de `ffde7320`, commit b3fde0af) — 4th pt VOCABULARY
"Roary's Roar Meter" — Roary (a lion) shows 3 near-synonyms on an INTENSITY gradient (`rank` 1→3); child taps the
STRONGEST or WEAKEST (per `ask`). Round `{id,band,setId,ask:"strongest"|"weakest",words:[{word,rank}×3]}`; engine
shuffles display, grades by rank; words stored LITERALLY. ⭐ **BR = gradientes de intensidade de sinônimos** (mirror es:
sussurrar<falar<gritar). ⭐ **GRADE_OVERRIDE pt='3'** (route ~line 86; row `{de,fr,es}='3'`). ⭐⭐ **VOCABULARY → ADD
STRAND_OVERRIDE pt = "Ampliação do vocabulário"** (route row ~202; de/fr/es ALL overrode to a vocab strand — matizes =
trabalho lexical; SAME pt label as #27 olive + #22 affix; **this one TAKES a strand override**, unlike the recent
grammar/punct ones). ⭐⭐ **Engine ALREADY GENERALIZED by es/fr** — LANG only for roundsL10n pick; strings via api.t; option
aria = o.word (language-neutral, NO aria edit); pt needs ONLY strings.pt (8) + speak() pt-BR (2) + manifest roundsL10n.pt
(8) + slug/title/intro. **Character "Roary" = MASCULINE "o Roary, um leão"**; instrument = "o rugidômetro do Roary"
(rugido+-ômetro playful coinage). 8 sets (both experts validated): volume/molhado/velocidade/frio/calor/raiva/tamanho/
chuva. ⚠ "bravo" (BR kid mid-anger, not EU "zangado"); "fervendo"/"disparar"/"despencar"/"chuviscar" (national, not
regional "garoar"). ⭐ **Set 7 = grande/enorme/gigante (all "big", rising) — a PURER near-synonym gradient than es's
pequeno/grande/enorme** (which mixes the antonym "small"). html ?v=4→5; wrapper 9.375→9.376. Core=WordIntensityCore (0
lines). §A.13.62 GREEN pt 48/48 + en 48/48; pt gate 93→94; tsc clean; personal-read volume@360 (gritar/falar/sussurrar,
roaryIntro 2-line) + raiva@768 (MAIS FRACA) + tamanho@1024 (set-7 enorme/gigante/grande). 0 core/shell/direction. NO deploy.

## #35 ziggy-odd-one-out — "Ziggy e a Diferente" (SHIPPED, commit/push NO deploy)
`ziggy-odd-one-out.category.l-1-5-a`, CCSS L.1.5.a, VOCABULARY (categorização / campos semânticos), **native grade 1
(NO GRADE_OVERRIDE)** — identificar o intruso é MAIS FÁCIL que nomear o superordinado (why #27 olive was 2º but this is
1º; de/es/fr all ship native 1). Ziggy = FEMININE zebra ("a Ziggy, uma zebra"). Core=OddOneOutCore (0 lines). IMAGE-based
(like #27): 8 rounds/3 bands, each round 4 image tiles `{noun,themeDir,category,label}`; 3 share a category, 1 is the odd
one; tap the odd. **noun/themeDir/category copied VERBATIM from es sibling (language-neutral image keys + odd-one logic);
only `label` = BR word.** Engine already generalized by es/fr: render label branch `label=(items[o.id].label)||o.noun`
→ NO render edit; pt = ONLY speak() pt-BR (2 sites) + strings.pt (7). ⭐ title "Ziggy e a **Diferente**" (linguist chose
over "o Intruso" — "intruso" reads menacing for 6-7yo; child strings use warmer "diferente", teacher prose uses the
standard "intruso"). ziggyIntro "Oi! Sou a Ziggy, a zebra. Uma é diferente! 🦓" (44 chars, clamp-safe). BR labels: maçã/
cachorro/gato/porco, banana/uvas/meia, carro/trem/barco/árvore, peixe/chapéu/sapato, rosa/folha, pássaro/pato/coruja/
xícara, colher/garfo, abelha/formiga/borboleta (⚠ trem not comboio; xícara not chávena; "pássaro" generic-bird beside
pato+coruja unambiguous since only xícara is non-bird). ⭐⭐ **STRAND_OVERRIDE pt = "Ampliação do vocabulário"** (route
row gained pt; same as #27/#34). html ?v=4→5; wrapper 9.376→9.377. §A.13.62 GREEN pt 48/48 + en 48/48; pt gate 94→95;
tsc clean; personal-read r0@360 (maçã/cachorro/gato/porco, ziggyIntro 2-line) + r5@768 (coruja/pássaro/pato/xícara) +
r7@1024 (abelha/formiga/borboleta/banana). 0 core/shell/direction. NO deploy.

## #36 wren-question-window — "Wren e as palavras de perguntar" (SHIPPED, commit/push NO deploy)
`wren-question-window.question-words.l-k-1-d`, CCSS L.K.1.d, GRAMMAR (palavras interrogativas), **grade 1º ano**
(GRADE_OVERRIDE row gained `pt:'1'` — recognition task at the pré-escola→EF boundary; mirror es '1', NOT fr's '2' bump
which is French-written-production-specific). **STRAND auto-maps → NO route STRAND_OVERRIDE** ('Language'.pt = "Análise
linguística/semiótica", the grammar cheat-sheet path — pedagogue confirmed the BNCC Análise linguística/semiótica eixo).
Wren = MASCULINE bird ("o Wren", passarinho). Core=QuestionWordCore (0 lines). Mechanic: a written question with its
FIRST word missing (`___` at start); child taps the right interrogative from **6 chips**; answer is DERIVED (`round.asks`
∈ thing/person/place/time/reason/manner → `QWORD_PT[asks]`, byte-identical to a `CHIPS_PT` string — no stored answer).
⭐ **QWORD_PT ⇔ CHIPS_PT: `O que / Quem / Onde / Quando / Por que / Como`** (capitalized, sentence-initial). Linguist:
"O que" not "Que" (EU/stiff); "Por que" = two words NO accent (≠ Porque/Por quê/Porquê). Sentence is display-only (single
span, NOT tokenized) → **no `é`-trap**; sentences carry accents freely. 8 rounds (asks-order == es), each maps to exactly
one chip. ⭐ Ensemble fixed 3 of my draft rounds for uniqueness: R1 "quer comer?"→"quer no prato?" (killed stray Como),
R4 "a comida fica pronta?"→"é a hora do lanche?" (killed Quando/Como tie), R7 "está com tanta fome?"→"gosta tanto de
sorvete?" (pedagogue: a STATE invites "Quando…?"; the stative-preference "gostar" frame makes reason the only reading +
concrete anchor). ⚠ **Uniqueness rule for this engine: all 6 chips shown every round → each sentence must have EXACTLY ONE
fitting interrogative** (action verbs leak "Como"; states leak "Quando" — build reason rounds on stative "gostar", not
"estar com fome"). strings.pt(7): title "Wren e as palavras de perguntar" (child register "perguntar" not
"interrogativa"), wrenIntro "Oi! Sou o Wren. Todo pedido começa com uma pergunta." (~52 chars, 2-line `.wqw-say` clamp —
verified @360). html ?v=5→6; wrapper 9.377→9.378. §A.13.62 GREEN pt 48/48 + en 48/48; pt gate 95→96; tsc clean;
personal-read r0@360 (prato, wrenIntro 2-line, 6 chips 3+3) + r6@768 (sorvete/reason) + r3@1024 (lanche/time). 0
core/shell/direction. NO deploy. ⚠ (Observed, NOT folded: several PRE-EXISTING pt.json blocks use « » guillemets for
button names — place-value/clock/fractions — an EU-tell the pt gate doesn't flag; out of scope, latent.)

## #37 halfway-harbors — "Marina e os portos redondos" (SHIPPED, commit/push NO deploy)
`halfway-harbors.nearest.3-nbt-a-1`, CCSS 3.NBT.A.1, MATH (arredondamento à dezena/centena na reta numérica), **grade
4º ano — CREATED a NEW GRADE_OVERRIDE row `{ pt: '4' }`** (none existed; de/es/fr inherit native grade 3). ⭐⭐ Pedagogue:
BNCC places arredondamento at **4º ano** (EF04MA cálculo por estimativa e arredondamento), NOT 3º — **grade by the SKILL
not the number-ceiling** (~1000 fits 3º but the OPERATION is 4º). First pt-only bump where pt goes ABOVE the inherited
native grade. **STRAND_OVERRIDE row (de-only `Zahlen und Operationen`) gained `pt: 'Números'`** (BNCC unidade temática;
matches strand-names fallback + the hoppers-number-line pt precedent). Marina = FEMININE lighthouse cat ("a gata do
farol"). Core=HalfwayHarborsCore (0 lines). ⚠ **Numeric-neutral engine**: NO roundsL10n (10 rounds shared numeric), NO
speak()/TTS, NO number-words, NO 2-line clamp. **The ENTIRE pt JS touch-point = TWO string tables**: `L` (runtime
feedback+SR, 12 keys) + `strings` (metadata, 5 keys). ⭐ Linguist's one fix: qnearest/qbig "A qual porto… **pertence**?"
(abstract set-membership calque from es) → **"De qual porto/farol o barco está mais perto? Arredonde para a dezena/centena
mais próxima."** (concrete, matches the tap mechanic). BR: "reta numérica" (NOT linha/recta), "número redondo", "boia"
(post-2009 no accent), feminine agreement "para a dezena/centena mais próxima". html ?v=5→6 (core stays v2); wrapper
9.378→9.379. §A.13.62 GREEN pt 60/60 (10 rounds) + en 60/60; pt gate 96→97; tsc clean; personal-read r0@360 (dezena, boat
63) + r9@768 (halfway 70-80→75) + r5@1024 (centena, boat 360→400). 0 core/shell/direction. NO deploy. ⚠ Reusable pattern
for numeric-neutral MATH engines: **string-parity self-check** (L.pt key-set == L.en + all {tokens} preserved) replaces the
round self-check. ⚠ The manifest JSON is a top-level ARRAY → access `m[0].slug.pt`; prose blocks nested at `.prose[id]`.

## #38 echo-grove — "O bosque do eco de Pim" (SHIPPED, commit/push NO deploy)
`echo-grove.match-the-rune.3-oa-a-1`, CCSS 3.OA.A.1, MATH (multiplicação como grupos iguais), **grade 2º ano** (added
`pt:'2'` to the `{ de:'2', fr:'2', es:'2' }` GRADE row — all siblings re-graded DOWN from native 3; BNCC EF02MA07/08
adição de parcelas iguais). ⭐⭐ **STRAND override REQUIRED `pt:'Números'`** — the strand-names auto-map yields **'Álgebra'**
for 3.OA (WRONG for BR: early multiplication is unidade temática Números; Álgebra @2º ano = padrões/sequências). Unlike
es/fr (auto-maps land right → no override), pt MUST override. Pim = an OWL; ⭐ linguist: treat "Pim" as an INVARIANT name
→ **"de Pim"** in UI strings (NEVER da/do — "a runa da Pim" clangs); feminine **"a coruja Pim"** only when naming the
animal (prose runs feminine). Core=EchoGroveCore (0 lines). ⚠ **pt JS touch-point = ONE `strings` table (8 keys) + ONE
`FRUIT_PT` fruit-plural map + a `cardLabel()` pt branch** (fruit-plural is a11y-only; image keys stay EN). NO roundsL10n
(8 numeric rounds shared), NO TTS, NO clamp. Kept "bosque" (BR bosque encantado, NOT floresta) + "runa" + "grupos"
(consistent prompt/gloss/srRune/cardLabel, NOT cestas). FRUIT_PT: cerejas/morangos/maçãs/limões/peras/bananas/laranjas/
ameixas. ⚠ es prose used « » guillemets → pt uses BR curly “3 × 4”. html ?v=24→25 (core v1); wrapper 9.379→9.380.
§A.13.62 GREEN pt 48/48 + en 48/48; pt gate 97→98; tsc clean; personal-read r0@360 (2×3) + r4@768 (2×5) + r6@1024 (3×4,
Pim owl). 0 core/shell/direction. NO deploy. ⚠ **string-parity self-check regex is fiddly on the long single-line JS
tables** — verify strings.pt per-key via a written `/tmp/*.js` script (find line by `startsWith(k+":")`, match pt value),
NOT an inline bash regex (bash escaping mangles it — happened twice).

## #39 maple-bakery — "A padaria da Maple" (SHIPPED, commit/push NO deploy)
`maple-bakery.share.3-oa-a-2`, CCSS 3.OA.A.2, MATH (DIVISION — sharing & grouping; the division PAIR to #38 echo-grove),
**grade 3º ano — NO override (native 3 inherited)**. ⭐⭐ Pedagogue: divisão como repartição equitativa e de medida = **BNCC
3º ano (EF03MA04, divisor até 10, resto zero, AMBOS significados)** — division enters ONE ano AFTER multiplication
(EF02MA07=2º). **The GRADE_OVERRIDE row `{ de:'2', fr:'2' }` (de/fr bumped, es DELIBERATELY kept native 3 = the mult-2º/
div-3º asymmetry) was left UNTOUCHED — pt inherits native 3, first batch activity with NO grade touch.** ⭐ **STRAND override
REQUIRED `pt:'Números'`** (same as #38 — auto-map → 'Álgebra' WRONG for 3.OA division). Maple = FEMININE mouse baker ("a
ratinha"). Core=MapleBakeryCore (0 lines). ⚠ **TWO string tables** (like #37): `L` (7 keys runtime) + `strings` (4 keys
metadata); both got pt. NO roundsL10n (10 numeric rounds — 5 share + 5 pack), NO TTS, NO noun-map (nouns baked in strings),
NO clamp. Two division senses: SHARE (repartir onto pratos = partitive) + PACK (embalar into caixas = quotative/medida) —
both required by EF03MA04. ⭐ Linguist locks: **"biscoito"** (national-neutral, NOT "bolacha"), **"repartir"** (share, NOT
"dividir"), **"embalar"** (pack, NOT empacotar/agrupar), "partes iguais". ⚠ es prose used « » → pt BR curly “…”. html
?v=4→5 (core v1); wrapper 9.380→9.381. §A.13.62 GREEN pt 60/60 (10 rounds) + en 60/60; pt gate 98→99; tsc clean;
personal-read r0@360 (share 12÷3 pratos) + r5@768 (pack 12÷4 caixas) + r9@1024 (pack 20÷4). 0 core/shell/direction. NO
deploy. ⚠ String-parity self-check MUST be a WRITTEN `/tmp/*.js` script — inline bash heredoc mangles `\\` escapes in the
regex (happened AGAIN); use `[^']*` (pt strings have no apostrophes) if you must inline.

## #40 winter-piles — "Os montinhos iguais de Flo" (SHIPPED, commit/push NO deploy)
`winter-piles.draw-partition.2-oa-c-4`, CCSS 2.OA.C.4, MATH (rectangular arrays + repeated addition / adição de parcelas
iguais), **grade 2º ano — NO override, NO row** (2.OA.C.4 native 2; pedagogue: EF02MA07 "a ideia de adição de parcelas
iguais" with "suporte de imagens" — the array is a visual scaffold, NOT the formal disposição retangular of EF03MA07/3º).
**STRAND override `pt:'Números'`** (auto-map → 'Álgebra' WRONG for 2.OA). Flo = MASCULINE squirrel "o esquilo" (differs
from es fem "ardilla" — aria-label 'esquilo'). Core=draw-partition-core.js (0 lines). ⚠ **MOST touch-point-heavy so far:
8 JS sites** — ONE strings table (11) + `ONES_PT` number-word array (0-16, speech-only) + numWord pt branch + speak() ×2
(TTS PRESENT) + squirrel aria + stepper aria ×2 (menos/mais) + spoken-equation ×2 (" mais " / " é igual a "). NO roundsL10n
(9 numeric rounds). ⭐ Linguist: "montinhos" (warm dim.), "fileiras" child-facing (array-term "organização retangular"
TEACHER-only), readHint "marque" (steppers not typing), lockIt "Prontinho!", ONES_PT **"catorze"** (BR dict form) +
**"dezesseis"** (not EU dezasseis). ⚠ es prose « » → pt curly “4 + 4 + 4 = 12”. html ?v=12→13; wrapper 9.381→9.382.
⭐⭐ **VISUAL-QA CAUGHT A PRE-EXISTING ENGINE DEFECT (en/de/es/fr all failed identically):** the activity's own `.wp-say`
speech bubble dropped to **line-clamp:1 at ≤480px**, clipping EVERY prompt on phones in ALL locales. **Fixed in-commit
(activity-layer CSS, line 313 clamp 1→2)** — strictly reveals more text, cannot regress; en+pt now GREEN full sweep. pt
promptFix shortened ("...Corte de novo!") to fit 2 lines @320px. ⚠ **de/es/fr each RETAIN one residual clip on their OWN
over-long promptFix string** (per-locale content too long for 2 lines @≤360px) — a **filed pre-existing per-locale
content issue** (shorten each locale-side; NOT a pt commit's job — don't author de/es/fr prose without their ensembles).
§A.13.62 GREEN pt 54/54 + en 54/54; pt gate 99→**100** (milestone); tsc clean; personal-read r0@360 (2×3, readHint 2-line)
+ r5@768 (fix round, shortened promptFix) + r7@1024 (match 4+4+4=12). 0 core/shell/direction. NO deploy. ⭐ Lesson: run
the EN regression EARLY when visual-qa fails — if en fails identically the defect is pre-existing engine, not a pt
regression, and the fix may be a shared activity-CSS improvement.

## #41 comet-kangaroo — "Cometa, o canguru" (SHIPPED, commit/push NO deploy)
`comet-kangaroo.tens-hundreds.2-nbt-b-8`, CCSS 2.NBT.B.8, MATH (add/subtract 10 & 100 mentally, valor posicional até
1000), **grade 3º ano — added `pt:'3'`** to the `{ de:'3', es:'3' }` GRADE row (de/es bumped native 2→3; BNCC EF03MA01/
02/05 — the abstract 1000-range mental calc is the 2º→3º leap; 2º is até centenas com material manipulável). ⭐ **STRAND
— NO pt override** (unlike the OA siblings): the manifest strand "Number & Operations in Base Ten" auto-maps to pt
"Números" ALREADY (correct) → left the de-only STRAND row untouched (§10.4 read-from-SoT; auto-map correct, unlike
OA→'Álgebra'). Cometa = MASCULINE kangaroo ("o Cometa", "o canguru" — canguru masc AND "o cometa"=celestial body masc;
name localizes per-locale: en Comet/es Cometa/de Komet → **pt "Cometa"**). Core=jump-tens-core.js (0 lines). ⚠ **7 JS
sites** — ONE strings table (4) BUT the on-screen question is assembled by **inline per-locale ternaries in THREE
functions**: `ckgHop` (" a mais"/" a menos"), `ckgQuestion` (frame "Quanto é {hop} que {start}?"), `makeTasks` promptArgs
— PLUS speak()×2 (TTS), SVG aria, read-button aria. NO roundsL10n (9 numeric rounds, all no-regrouping — verified so the
"só muda um algarismo" invariant is honest), NO clamp class, NO number-word map. ⭐⭐ **THE RUNTIME QUESTION** (linguist-
locked, the heart): "Quanto é 10 a mais que 247?" / "Quanto é 100 a menos que 683?" — natural + UNAMBIGUOUS ("a menos
que"="unless" homograph blocked by the bare number, no verb clause); bare "que" not "do que". strings: title "Cometa, o
canguru", hint by place-value terms (dezenas/centenas/unidades). ⚠ NO win/retry string (shell handles feedback). ⚠ es
prose « » → pt curly “247”. html ?v=4→5; wrapper 9.382→9.383. §A.13.62 GREEN pt 54/54 + en 54/54; pt gate 100→**101**;
tsc clean; personal-read r0@360 ("Quanto é 10 a mais que 247?", +10 chip, read-button) + r3@768 (−100/683) + r7@1024
(−100/754). 0 core/shell/direction. NO deploy.

## #42 mending-fences — "Hazel conserta as cercas" (SHIPPED, commit/push NO deploy)
`mending-fences.mend-board.3-md-d-8`, CCSS 3.MD.D.8, MATH — **the FIRST measurement/geometry activity** (perímetro vs
área by counting, no formulas; Hazel the badger; 5 round types / 11 rounds). **grade native 3, NO override** (BNCC
EF03MA19/21; aligns cleanly with US grade 3 — no row). ⭐⭐ **STRAND = "Grandezas e medidas", NO route override** — the
manifest "Measurement & Data" auto-maps to pt "Grandezas e medidas" (BNCC-correct: perímetro/área são GRANDEZAS, NOT
Geometria). ⭐ **Did NOT follow de ("Raum und Form")/es ("Forma, espacio y medida") into geometry** — §A.13.58 per-locale-
authority (resolve each locale vs its own curriculum, never inherit a sibling's strand override); fr also left it as the
measurement auto-map. Hazel = MASCULINE badger "o texugo" (SVG aria-hidden → gender only in JSON metadata; win-adjectives
agree with cerca fem → "Consertada!"). Bramble→"Amora"; grass→"grama" (not pasto/capim). Core=mending-fences-core.js (0
lines). ⚠ **BIGGEST string set: TWO tables, 42 keys** (L 35 + strings 7); NO TTS, NO roundsL10n (11 numeric rounds), NO
per-locale map/ternary, NO clamp (.mf-line wraps freely), NO unit-word suffix (ropeLabel prefix + bare number). Terms:
cerca/campo/borda/quadradinhos/tábua/"dar a volta inteira". ⚠ es prose « » → pt curly “…”. html ?v=5→6; wrapper 9.383→
9.384 (⭐ the ONLY route change — no grade, no strand edit). §A.13.62 GREEN pt 66/66 (11 rounds) + en 66/66; pt gate
101→**102**; tsc clean; personal-read r0@360 (mend, "Corda da cerca: 20", plates 14/8/4) + r3@768 (compare 2 fields) +
r6@1024 (unit tiles). 0 core/shell/direction. NO deploy. ⚠ Minor cosmetic (SHARED with es/de/fr, not a pt regression,
visual-qa GREEN): the "Quadradinhos de dentro" unit-tile caption truncates at the fixed tile width — icon-first tile,
disambiguated by its visual. ⚠ String-parity self-check: a naive `(\w+):\s*['"]` key-regex FALSE-matched "rope"/"cerca"
from INSIDE the `ropeLabel: 'Corda da cerca: '` value — use a brace-matched extractor (written /tmp/*.js), not inline.

## #43 gauge-good-guess — "O bom olho da Palmira" (SHIPPED, commit/push NO deploy)
`gauge-good-guess.estimate.2-md-a-3`, CCSS 2.MD.A.3, MATH — estimate lengths in cm & m (2nd measurement activity; a goat
guesses sizes by eye; 8 rounds). **grade native 2, NO override** (BNCC EF02MA16 — estimar is the named leading verb).
**STRAND "Grandezas e medidas", NO override** (auto-map correct, like #42). ⭐⭐ **CHARACTER RENAME (operator-approved via
AskUserQuestion): "Gauge" → "Palmira"** (pt-only) — "Gauge"=opaque English (calibre/medidor), hard for a BR kid; "Palmira"
evokes "palmo" (BR length referent), per the #12 Span→Palmo / #19 Hopper→Saltão precedent. es/de/fr KEEP "Gauge". Swapped
in 5 pt-facing spots: strings.title, goatSVG aria pt, manifest page_title.pt + page_intro.pt, prose about[0]. Palmira =
FEMININE "a cabra". Core=estimate-length-core.js (0 lines). ⚠ **roundsL10n PRESENT** (per-round `object`+`question` pt;
id/band/answer/options COPIED VERBATIM from es sibling — locale-neutral cm/m NOT translated; verified answer∈options).
ONE strings table (7), TTS (2 ternaries → pt-BR), `.ggg-say` 2-line clamp (gaugeIntro kept short 52 chars), NO cm/m
unit-word map (BR uses cm/m identically). ⚠ vertical objects (porta/prédio/mastro) → "altura", elongated (trem/ônibus) →
"comprimento". BR: trem/ônibus/giz de cera/prédio/mastro de bandeira. ⚠ es prose « » → pt curly “…”. html ?v=4→5; wrapper
9.384→9.385 (ONLY route change). §A.13.62 GREEN pt 48/48 + en 48/48; pt gate 102→**103**; tsc clean; personal-read r0@360
("Quanto mede mais ou menos uma formiga?" 1cm, gaugeIntro 2-line) + r2@768 (trem/comprimento 200m) + r5@1024 (prédio/
altura 150m). 0 core/shell/direction. NO deploy. ⚠ parity self-check: verify roundsL10n.pt id/band/answer/options ==
es + answer∈options + Gauge=0 in pt-facing (rename complete) — via a WRITTEN /tmp/*.js script (brace-matched).

## #44 bram-board-shop — "A Oficina de Tábuas do Bram" (SHIPPED, commit/push NO deploy)
`bram-board-shop.length-word-problems.2-md-b-5`, CCSS 2.MD.B.5, MATH — LENGTH WORD PROBLEMS (add/sub within 100, unknown in
every position; the 3rd measurement activity; Bram a beaver; 9 rounds). **grade native 2, NO override; strand "Grandezas e
medidas", NO override** (all 4 locales unanimous; length-story modelled on a fita métrica = measurement, NOT column
arithmetic — pedagogue: overriding to Números would misclassify). Bram = MASCULINE beaver "o castor Bram" — a neutral
proper name → NO rename (unlike #43 Gauge). Core=length-tape-core.js (0 lines). ⚠ **ONE strings table (17)** + TTS (2
ternaries → pt-BR) + **roundsL10n (9 rounds; ⭐ ONLY the `story` field per-locale** — id/cog/band/diagram/op/unknownRole/
tiles/decoyId/slots COPIED VERBATIM from es; numbers LOCKED to tiles). NO unit/number-word map (cm hardcoded/shared),
NO clamp (`.bbs-storytext` wraps + shrinks font). "peça" = on-screen tile vs "pedaço" = cut-off bit in the stories.
BR: fita/tábua/prateleira/corda/serrote/mesa/tira; "tem X cm"(statement)/"mede X cm"(question)/"comprida". html ?v=5→6;
wrapper 9.385→9.386 (ONLY route change). ⚠ **visual-qa caught r6@360 CUT-OFF** (control 764>740) — a PT-LENGTH issue (en
fit at 712; pt compare-diff story was 32 chars longer, wrapping 1 extra line → pushed the keypad past the fold). Fixed by
shortening r6+r7 "escrivaninha"→**"mesa"** (shorter + more familiar to a 2nd-grader; consistent across both compare
rounds). ⭐ **Lesson: long pt word-problem stories can cut off at 360×740 where en fits — run EN r-comparison; if en fits
& pt cuts, SHORTEN the pt story (don't touch layout).** §A.13.62 GREEN pt 54/54 + en 54/54; pt gate 103→**104**; tsc clean;
personal-read r0@360 (story wraps, tape+tiles 80/20/50) + r6@1024 (shortened compare, mesa). 0 core/shell/direction. NO
deploy. ⚠ parity self-check: roundsL10n.pt deep-equal es except story + each story contains BOTH tile numbers (k1,k2) —
via a WRITTEN /tmp/*.js script.

## #45 track-repair — "Vale do Apito" (SHIPPED `0837eb96`, commit/push NO deploy)
`track-repair.count-to-120.1-nbt-a-1`, CCSS 1.NBT.A.1, MATH — NUMBER LINE to 100 (reta numérica; place numbered railway
ties "dormentes" at their magnitude between anchor stations; count-on/back, cross-decade, cross-100, skip-5/skip-10,
midpoint; 14 rounds; a "singing engine" sings the restored sequence). **grade native 1º ano, NO override; strand
"Números", NO override** — ⭐ PEDAGOGUE FIRM: **EF01MA05 explicitly names the reta numérica as a 1º-ano resource** ("com e
sem suporte da reta numérica"); contagem/de 5 em 5/de 10 em 10/números até 100 all 1º ano. The **de Klasse-2 bump is a
German Zahlenraum artifact with NO BNCC equivalent** (do NOT follow de up); es (1.º primaria) + fr (CP) both stayed at
grade 1 — the existing GRADE_OVERRIDE row `{de:'2', fr:'1'}` gets NO pt key, STRAND row `{de:'Zahlen und Operationen'}`
gets NO pt key (NBT auto-maps pt→"Números" correctly, `strand-names.ts:92`, like comet-kangaroo #41). ⭐ **LANGUAGE-LIGHT:
11 short UI strings, NO roundsL10n** (rounds are pure NUMERIC / locale-neutral — `params.rounds` shared, UNTOUCHED).
Core=track-repair-core.js (0 lines). **NO named-animal character** — place "Whistle Valley"→**"Vale do Apito"** + a
personified "trenzinho que canta" → NO rename fork. speak() speaks ONLY numerals + the sequence join (no word-TTS trap);
added pt-BR to BOTH lang sites (LCSAudio + u.lang). BR: dormente (railway tie, matches es durmiente/fr traverse), trem/
trenzinho (NEVER comboio), trilho, estação, você-form. html js `?v=5`→`?v=6`; wrapper 9.386→**9.387** (ONLY route change).
Pedagogue's continuous-line/ε + midpoint red-flags = ENGINE-level (protected core, 0-line) + ALREADY satisfied (the
`.tr-tick` scaffold renders intermediate marks → reads as a reta numérica, not a blank ruler). §A.13.62 GREEN pt 84/84 +
en 84/84; pt gate 104→**105**; tsc 0-in-touched (blog test errors pre-existing); preflight slug unique; personal-read
r0@768 (count-on 47–50) + r6@360 (skip-5 10–30, ticks visible, say-line wraps clean) + r10@1024 (skip-10 60–90) — clean
BR, shell "Verificar"/"CONCLUÍDAS" localized, 0 English leak. 0 core/shell/direction; git diff = exactly 5 files. NO
deploy. ⚠ the "Common Core 1.NBT.A.1" the leak-grep flags is the PRE-EXISTING **en** page_intro on the same manifest line
the pt edit extended — EN keeps the code per §20.10; the pt text is clean.

## #46 gus-snack-cart — "O carrinho de lanches do Gus" (SHIPPED `b494ebaa`, commit/push NO deploy)
`gus-snack-cart.within-100.2-nbt-b-5`, CCSS 2.NBT.B.5, MATH — ADD & SUBTRACT within 100 (Gus a rodent runs a snack cart;
8 rounds = short story + 2-digit sum; child types answer on shell keypad; some regrouping). **grade native 2º ano, NO
override** (PEDAGOGUE FIRM — EF02MA05/EF02MA06, add/sub até três ordens, ≤100 well inside; reagrupamento is 2º-ano; de
also stayed Klasse 2). **strand "Números", NO override** (NBT auto-maps pt→"Números" `strand-names.ts:92`; de override is
German-calque-only). Core=add-sub-100-core.js (0 lines). ⭐ **7 strings + roundsL10n (8 rounds; ONLY `story` per-locale**
— id/band/a/b/op COPIED VERBATIM from en; numbers LOCKED, each pt story contains both) + the **`gopherSVG()` aria pt
branch** `LANG==='pt' ? 'Gus o esquilo'` (mirrors es "Gus la ardilla" — no BR word for gopher; esquilo warm+kid-known;
also the prose animal). **NO TTS** (no audio). Name "Gus" kept (neutral) → NO rename. de-added `@media(min-height:921px)`
CSS block already on disk (inherited, untouched). BR: carrinho de lanches, esquilo, nozes/amoras/sementes/bolotas/
cenouras/maçãs/ameixas/cerejas, você-form, "vai um" (curly aspas OK). html js `?v=6`→`?v=7`; wrapper 9.387→**9.388** (ONLY
route change). ⚠ **visual-qa caught 320×640 CUT-OFF on ALL 8 rounds (pt-only; en passed 48/48)** → the CONSTANT overshoot
= the longer pt **`prompt`** wrapping an extra line (the shell renders prompt above the keypad = the "control"); fixed by
shortening prompt "Some ou subtraia. Escreva sua resposta abaixo."→**"Some ou subtraia. Digite a resposta."** → all
320×640 green. ⭐ **LESSON: at 320×640 a CONSTANT-per-round cut-off = a chrome string (prompt), not the story; shorten the
constant string, not the per-round story.** §A.13.62 GREEN pt 48/48 + en 48/48; pt gate 105→**106**; tsc 0-in-touched;
preflight slug unique; personal-read r0@768 (subtract 45−8, full render w/ gopher+say-line) + r5@360 (add 27+36, gopher
row hidden by max-height:920 CSS — by design) + r6@1024 (subtract 88−16) — clean BR, "Verificar"/"CONCLUÍDAS" localized,
0 English leak, numbers locked to equations. 0 core/shell/direction; git diff = exactly 5 files. NO deploy.

## #47 bos-berry-pantry — "A despensa do Bo" (SHIPPED `3d4963d6`, commit/push NO deploy)
`bos-berry-pantry.slingshot-tens.1-nbt-b-2`, CCSS 1.NBT.B.2, MATH — PLACE VALUE (read two-digit numbers as tens+ones;
Bo the bunny; a CRATE = a sealed un-countable ten; 9 values 13/25/28/34/40/44/63/70/85; slingshot mechanic). **grade
2º ano — pt OVERRIDE ADDED** (⭐ PEDAGOGUE FIRM, ruled AGAINST my 1º lean): valor posicional / SND (unitizing "a crate IS
a ten" + função do zero via 40/70) = BNCC **EF02MA01/EF02MA04 = 2º ano**; 1º ano = número-como-quantidade sem valor
posicional formal; es/fr introduce dizaines at grade 1 by THEIR curriculum, BNCC defers → do NOT harmonize. Route row now
`{de:'2', pt:'2'}`. **strand "Números", NO override** (1.NBT auto-maps correct). ⚠⚠ **PEDAGOGUE FLAGGED bundle-bot (earlier,
ruled 1º) as possibly mis-graded** under the same logic (compor/decompor = EF02MA04 = 2º) — SEPARATE item for the operator,
NOT acted on. ⭐ **MOST COMPLEX activity yet — per-locale NUMBER-WORD rendering.** Added `numWordPT(n)` (ONES_PT 0-19 +
TENS_PT + ' e ' joiner) + `numWord` pt dispatch + `hoardAria` pt branch (caixa/caixas + amora solta/amoras soltas) + TTS
pt-BR (2 sites) + 3 aria/spoken pt branches (boSVG "Bo o coelho", shelf-numeral "o número ", count-again "Conte de novo")
+ 19 strings.pt. ⚠ **no round value ends in 1/2 → gender (um/uma, dois/duas) never surfaces → masculine default safe**
(LINGUIST CONFIRMED all 9 values: quarenta/setenta/oitenta e cinco/etc). NO roundsL10n (rounds pure numeric). BR: despensa,
caixa (crate=dezena), amora, prateleira, você-form, curly aspas "Verificar". html `?v=5`→`?v=6`; wrapper 9.388→**9.389**.
§A.13.62 GREEN pt 54/54 + en 54/54; pt gate 106→**107**; tsc route clean; personal-read r1@768 ("quarenta" number-word) +
r6@1024 ("setenta") + r0@360 (pile) — number-word system verified, clean BR, 0 English leak. 0 core/shell; git diff = 5
files. ⚠ leak-grep flags the es `«Comprobar»` (guillemets) + en "Common Core" on shared strings/manifest lines — those are
SIBLING-locale values, pt is clean (curly aspas). NO deploy.

## #48 DONE — vet-diagnosis "No veterinário" (`vet-diagnosis.word-problems.1-oa-a-1`, de `f39af3cb`, commit 1fa4a82d) — FIRST pt word-problem-MODELING activity
A **raposa veterinária** (🦊 fox, unnamed, FEMININE) runs a woodland clinic; each patient's "sintoma" is a number STORY. The
child MODELS it on a diagram (change=start/change/result · bracket=whole/part/part · compare=bigger/smaller/difference), places
number tiles, marks the mystery "?", dials + taps Diagnosticar. Add/sub within 20, 14 rounds spanning EVERY unknown position +
compare. ⭐ **GRADE = 2º ano (GRADE_OVERRIDE pt:'2' merged into {de,fr,es} at page.tsx:96 — PEDAGOGUE DECISIVE, BNCC-grounded,
NOT a mere harmonization):** BNCC **EF02MA06** is the 1st habilidade to add the two significados this activity needs —
*comparar* (5 compare rounds) + *completar* (change/part rounds); **EF01MA08** (1º) admits only juntar/acrescentar/separar/
retirar AND is restricted to problems modeláveis "com o suporte de imagens", which the DEDUCED start-unknown rounds exceed.
⚠⚠ **The memory "Next" note guessed pt native 1 assuming es/fr stayed 1 — WRONG: the manifest proved ALL THREE siblings
graded to 2** (de Klasse 2 / es 2.º primaria / fr CE1, same "structure = hardest word-problem types" reasoning). **LESSON:
always read the manifest's sibling grades before trusting a "Next"-note grade guess.** ⭐⭐ **STRAND = Números (STRAND_OVERRIDE
pt merged into {de} at page.tsx:214 — the OA cheat-sheet trap):** 1.OA auto-maps → "Álgebra" (DOMAIN ERROR for concrete
add/sub problem-solving); BNCC Álgebra 1º-2º ano = SÓ padrões/sequências. Same OA→Números correction as #9/#16 (concrete
operational number work → Números). ⭐ **Character: UNNAMED FEMININE "a raposa veterinária"** (pedagogue overruled the
linguist's masc "Dr. Raposo"); the 🦊 speaks 1st-person → **sayWin = "Obrigada"** (feminine — the single critical agreement
detail; grep-confirmed Obrigado=0). Kept neutral story names **Pip/Bo** (es precedent; pedagogue's draft "Tico" carries the
"Tico e Teco" Disney-trademark shadow — avoided). **Engine FULLY generalized by es/fr/de** → pt purely additive: `speak()`
pt→pt-BR (LCSAudio + u.lang), `title`+`strings` pt (12 keys), 3 aria ternary sites (mystery/holds/empty/number/recap),
`roundsL10n.pt` (14 stories — structure copied VERBATIM from EN, only `story` localized, numbers LOCKED to tiles [validated:
each story contains both working numbers, never the decoy; structure deep-equal EN]). **Register:** "Tem" (warm BR, not "Há");
"tinha antes" (possessor) vs "havia antes" (impersonal, R7); "as outras" (fem pl) not "o resto"; gender-safe MASC compare pairs
gatos/cachorros · patos/gansos · passarinhos vermelhos/azuis; Quantos↔Quantas per story-noun gender; você-form; curly aspas.
`replay`="Ouvir de novo" (re-reads the SAME story — the linguist's "Outra história" was WRONG). `diagnose`="Diagnosticar 🩺"
(thematic activity button, NOT the shell "Verificar"). slug `problemas-de-adicao-e-subtracao-ate-20`; page_title/intro BNCC
name-only (no code/SEP). html ?v=8; wrapper 9.389→**9.390**. §A.13.62 GREEN pt 84/84 + en 84/84 (full sweep; the long compare
rounds R13/R14 fit 360 with NO short-fallback needed); verify-activity-content-pt PASSED; preflight PASS; tsc clean (only
pre-existing blog-test errors); pt gate 107→**108**; personal-read compare@768 + longest@360 + start-unknown@1024. 0 core/shell/
direction; git diff = exactly 5 files. NO deploy.

## #49 DONE — tildy "O Ateliê da Tildy" (`tildy.measure-ruler.2-md-a-1`, de `2bceab4e`, commit c870a53f) — MEASURE LENGTHS WITH A RULER
Tildy (🧵, a costureira, FEMININE) runs a tailor shop; the child DRAGS a ruler so its **0** lines up with the START of a
strip (fita/couro/lã/cordão), taps Medir, reads the **cm** at the far end. 9 rounds: align-read ×5 + a "régua quebrada"
that starts at 2 (count the cm covered) + diagnose the off-by-one + pick-a-ruler-long-enough ×2. The lesson = the
**0-not-1 alignment / off-by-one error**. ⭐ **GRADE = 2º ano, NO override; STRAND = Grandezas e medidas, NO override —
there is NO tildy row in EITHER route map** (all siblings shipped tildy with ONLY a wrapper bump: de Klasse 2 / es 2.º /
fr CE1; BNCC **EF02MA16** — medir comprimentos com o centímetro, unidade padronizada = 2º ano; Measurement & Data
auto-maps pt → "Grandezas e medidas", comprimento é grandeza). The #13/#42/#43/#44 measurement precedent. **⇒ the ONLY
page.tsx change = the ACTIVITY_WRAPPER_VERSION bump** (9.390→9.391) — the cleanest route touch, like #42/#43/#44.
⭐ **Character: keep name "Tildy" (feminine "a costureira"); title "O Ateliê da Tildy"** (ateliê fits a seamstress; fr
precedent "L'atelier de Tildy"; alfaiataria = men's tailoring, rejected). ⭐ **DROPPED the "Knot the cat"** (es dropped it;
the linguist: a ruler-nudging cat contradicts the keep-0-at-the-start lesson — pedagogically counterproductive flavor).
**Engine FULLY generalized by es/fr/de** → pt purely additive: `speak()` pt→pt-BR, `title`+`strings` (16 keys), 2 svg aria
branches, tool-option label "régua de N cm", `_solve` speak "Medido!", `promptL10n.pt` on all 9 rounds (structure verbatim;
only the per-round prompt localized). ⚠⚠ **VOCAB LOCKS (measurement):** **régua** (NOT fita métrica = tape measure) ·
**comprimento** (⚠⚠ NEVER cumprimento = greeting — the #1 risk here) · **encoste o 0 no começo** (align verb; deslize =
motion) · **tira** · **outra ponta** (far end, not extremidade) · **tracinhos** (cm-marks, r5 broken ruler) · você-form
(Deslize/Encoste/Meça/Coloque/Ponha/Conte/Escolha) · curly aspas. **diagnose labels: "Começou no 1" (correct, echoes r2
"não no 1!") / "Régua curta" (names the culprit — less confusable than "Ficou curto") / "Ponta errada".** slug
`medir-comprimentos-com-regua-centimetros-2-ano`; title/intro BNCC name-only (no code/SEP). html ?v=10; wrapper 9.391.
§A.13.62 GREEN pt 54/54 + en 54/54 (full sweep; r5 broken-ruler + r13-style long prompts fit 360); verify-activity-content-pt
PASSED; preflight PASS; parity 9/9 prompts + 16 strings; tsc clean (only pre-existing blog errors); pt gate 108→**109**;
personal-read align@768 + broken-ruler@360 + diagnose@1024 (all 3 diag labels fit). 0 core/shell/direction; git diff = exactly
5 files. NO deploy.

## ⭐ BR route doctrine for MEASUREMENT activities (reaffirmed #49; see also the #12/#13/#42/#43/#44 records)
A pure-magnitude measurement activity (comprimento/capacidade/massa/tempo) → **Grandezas e medidas, NO strand override**
(Measurement & Data auto-maps correctly; área e perímetro included). GRADE is per-activity: native grade 2 usually transfers
(EF02MA16 medir com unidade padrão; #2/#12/#43/#44/#49 all 2º). When ALL siblings ship a measurement activity with ONLY a
wrapper bump (no GRADE/STRAND row) → pt does the same (just the wrapper). Do NOT follow de/es into geometry for área (that's a
KMK/SEP fusion; #13 mosaic-menders — BR mirrors fr's measurement classification).

## #50 DONE — fox-forge "A Fábrica de Chocolate do Pip" (`fox-forge.fraction.3-nf-a-1`, de `311f5dfb`, commit 32c0e93c) — FIRST pt FRACTIONS activity
o Pip (um raposo) runs a chocolate factory; the child BUILDS a fraction a/b by picking the 1/b piece **by SIZE** and molding it into
the bar `a` times → **a/b = a cópias de 1/b**. 11 rounds (build ×3, name-unit ×2, equal-parts, denominator, magnitude ×2, the-whole,
cross-shape bar+pizza). ⭐⭐ **GRADE = 4º ano (GRADE_OVERRIDE pt:'4' merged into `{fr:'4'}` at page.tsx:45 — PEDAGOGUE DECISIVE):**
BNCC **EF04MA09** (frações unitárias mais usuais 1/2,1/3,1/4… + representação simbólica a/b); **3º ano EF03MA09 is INFORMAL
metade/terça parte with NO symbolic a/b** → this symbolic-chip activity EXCEEDS 3º. Sits at the 4º/5º edge (build-a/b-from-1/b =
EF04MA09→EF05MA03 bridge), resolves to 4º. **Converges with fr(4), diverges from de/es(3)** — same content-driven reasoning fr used
("le CE2 ne fait pas a/b"; BR 3º doesn't do symbolic a/b either). Mirrors #37 halfway-harbors "grade by the SKILL". ⚠ do NOT cite
EF04MA10 (decimals). ⭐ **STRAND = Números via a `strand-names.ts` 'Number & Operations—Fractions' pt entry** (`pt:'Números'`, line
189; BNCC has NO separate "Frações" eixo — frações vivem em Números; matches the de+es strand-names approach, NOT the fr route
override) — **THE 6th FILE** (this is now the reusable pt fractions strand; future pt fraction activities auto-map). ⭐⭐ **Character
OPERATOR-CHOSEN via AskUserQuestion → MASCULINE "o Pip, um raposo"** (harmonizes with de der Fuchs / es el zorro / fr le renard;
clean agreement; "raposo"=valid BR male fox); title **"A Fábrica de Chocolate do Pip"** (Willy-Wonka resonance; all siblings dropped
"Forge" — de=Werkstatt); sayWin **obrigado** (masc). ⭐ **fracWordPT engine** (js `fracWord` pt branch): `UNIT_PT={2:meio,3:terço,
4:quarto,6:sexto,8:oitavo}` (masc) + `NUM_PT` (masc um/dois/três, NOT duas) + **pt PLURALIZES the unit for a>1** (es did NOT):
três quartos / dois terços / cinco sextos / três oitavos; a=1 → "um meio/um terço"; + `UNIT_ART_PT` (pizza aria). ⚠⚠ **LEXICAL
COLLISION LOCK: forma = chocolate MOLD (the mechanic); formato = geometric SHAPE — the cross-shape round/sayCross uses "formato",
NEVER "forma"** (else "a mesma parte numa forma diferente" = "…in a different MOLD"). Verb = **moldar** (forma de chocolate; NOT
"forja/forjar"=blacksmith); unit = **peça** (pedaço for the unequal cue); **partes iguais** (the BNCC fair-share phrase). Half rounds'
PROMPTS use "metade (1/2)" (warm), the engine reads "um meio". Prompts ASCII a/b like EN/de. 16 strings + 11 promptL10n.pt + 8 aria
branches. slug `construir-fracoes-simples-4-ano`; title/intro BNCC name-only. html ?v=11; wrapper 9.392. §A.13.62 GREEN pt 66/66 +
en 66/66; verify-activity-content-pt PASSED; preflight PASS; parity 11/11 + 16 strings + fracWordPT readings; tsc clean; pt gate
109→**110**; personal-read build@768 + cross-shape(bar+pizza)@1024 + name-unit@360. 0 core/shell/direction; git diff = exactly 6
files. NO deploy. **⭐ REUSABLE: the pt fractions strand-names entry now exists** → future pt fraction activities (e14 series, etc.)
auto-map to Números with NO per-activity strand edit (cross-ref [[project-e14-fractions-series]] §A.13.59).

## #51 DONE — bramble "A Barraquinha de Suco do Bramble" (`bramble.holds-more.k-md-a-2`, de `0a4f75ae`, commit bf9f33cf) — COMPARE CAPACITY
o Bramble (um texugo/badger) runs a berry-juice stand; the child predicts which of two containers holds MORE (Esquerda/Direita/
Igual) by EYE, then Bramble despeja to check — the **perception illusion** (tall-narrow LOOKS like more; alto ≠ cabe mais). 13
rounds; a fit-or-spill variant (Cabe!/Transborda!). No numbers, no measuring. ⭐ **GRADE = 1º ano (GRADE_OVERRIDE pt:'1' merged
into `{de:'1'}` at page.tsx:97 — PEDAGOGUE DECISIVE):** BNCC **EF01MA15** names "comparar comprimentos, **capacidades**… **cabe
mais, cabe menos**" = EXACTLY this activity → the qualitative capacity comparison is a NAMED EF habilidade (not Educação
Infantil). **Mirrors de's Klasse-1 bump (for a BNCC reason), diverges from es/fr who kept native K** (their maternelle GS /
preescolar cover it) — the #11 comparison-creek BR-K-cluster→1º pattern (BR's BNCC border sits above MX's SEP). ⭐ **STRAND =
Grandezas e medidas, NO override** (Measurement & Data auto-maps; capacidade é grandeza; #14 pond-juice precedent; de+es used
auto-map, only fr overrode to a French maternelle domain). ⭐ **Character: keep "Bramble" (o Bramble, um texugo — masc badger;
harmonizes with es "el tejón").** **Engine: numeric/locale-neutral rounds (no roundsL10n) + an `L` map (21 runtime-feedback keys)
read via `txt()`/`global.LCS.i18n.current` + a 4-key `strings` table; NO TTS.** pt purely additive: `L.pt` (21) + `strings.pt`
(4). ⚠⚠ **VOCAB LOCKS: suco de amora (NEVER EU "sumo") · copo (glass — NEVER "vaso"=vase/plant-pot in BR) · tigela/jarra/xícara/
garrafa · recipiente (generic) · cabe mais/cabe menos/cabe a mesma quantidade (button "Igual") · cabe/transborda (NOT "derrama"=
tip-spill) · alto vs largo (the illusion axis, NOT grande/pequeno) · no-shame (Bramble owns the miss: "Meus olhos me enganaram");
zero "errado"** · você-form; `poured` references the shell "Verificar". slug `comparar-capacidade-em-qual-cabe-mais-1-ano`;
title/intro BNCC name-only. html ?v=9; wrapper 9.393. §A.13.62 GREEN pt 78/78 + en 78/78; verify-activity-content-pt PASSED;
preflight PASS; parity L.pt==L.en 21 keys + 4 strings + no EU-PT/sumo/vaso tells; tsc clean; pt gate 110→**111**; personal-read
predict@768 + tricky@360 + tricky@1024. 0 core/shell/direction; git diff = exactly 5 files. NO deploy.

## #52 DONE — pip-museum "O Museu do Professor Pip" (`pip-museum.curate-wing.k-g-a-2`, de `11c5e6b9`, commit cb737679) — RECOGNIZE & NAME SHAPES (geometry)
o Professor Pip (um pinguim de gravata-borboleta vermelha) curates a shape museum; shapes arrive rotated/tiny/stretched; the
child brings each to the pedestal with its NAME (círculo/triângulo/quadrado/retângulo/hexágono); non-matching (a losango que não é
quadrado, um oval) → **Galeria dos Mistérios**. Big idea: a figura mantém o nome girada/de qualquer tamanho. 8 rounds (route/
exclude/fine-discriminate/name-to-shape/match-pair/confirm/capstone). ⭐ **GRADE = 1º ano (GRADE_OVERRIDE pt:'1' merged into
`{de:'1',fr:'1'}` at page.tsx:98 — PEDAGOGUE DECISIVE):** BNCC **EF01MA14** "identificar e nomear figuras planas (círculo, quadrado,
retângulo e triângulo) em diferentes disposições" — "em diferentes disposições" IS the rotation-invariance heart; hexágono/losango =
1º-ano enriquecimento, NOT grade-2. **Mirrors de(Klasse 1)+fr(CP), diverges from es(K by SEP framing)** — the #11/#51 BR-K-cluster→1º
pattern. ⭐ **STRAND = Geometria, NO override** (Geometry auto-maps; `strand-names.ts` 'Geometry'.pt='Geometria' EXISTS; #4 shapeforge
precedent; ⚠ es fuses geometry into "Forma, espacio y medida" = SEP-specific, does NOT apply to BNCC which has a discrete Geometria
eixo). ⭐ **Character: Professor Pip the PENGUIN** (distinct from #50's fox; keep name). ⚠⚠ **SHAPE VOCAB (§A.13.61 formal): rhombus =
LOSANGO, NEVER "rombo"** (pt-BR rombo = hole/breach; the #4 shapeforge lock; es uses "rombo" — NOT copied); oval (NOT es "óvalo");
mystery = "Galeria dos Mistérios". ALL shapes MASCULINE → uniform articles. **Engine: per-locale SHAPE maps (`SHAPE_PT`/`SHAPE_PT_PL`)
+ `gname`/`gnamePl` dispatch; rounds numeric/locale-neutral; HAS speak() TTS.** pt added: SHAPE_PT/PL + gname/gnamePl pt branch + 16
strings + ~10 inline runtime messages (reveal "Mesmo girado, você sabia" / misroute / mystery "forma misteriosa" / match-pair /
confirm / win) + `matchHint` `{np}` code branch (added pt to the `(de||fr||es)` condition) + speak() pt-BR. Rotation = **girado**
(NOT virado=flip); você-form. ⚠ **visual-qa fix (pt-only 320×640 CUT-OFF — EN passed 48/48, so a pt-LENGTH regression from longer pt
shape-name plates wrapping taller):** shortened `prompt` (62→40) + 3 hints (exclude/fine/capstone) + added an **activity-layer @media
(max-height:640px) trim** (plate font 11px + tighter pedestal/gaps; 0-core, locale-neutral, EN re-verified 48/48) — the #6
place-value @media-trim precedent. slug `reconhecer-e-nomear-figuras-geometricas-1-ano`; title/intro BNCC name-only. html ?v=11;
wrapper 9.394. §A.13.62 GREEN pt 48/48 + en 48/48; verify-activity-content-pt PASSED; preflight PASS; parity SHAPE_PT + 16 strings +
rhombus=losango + no rombo/EU tells; tsc clean; pt gate 111→**112**; personal-read route@768 (triângulo/quadrado/círculo, rotated
square) + exclude@1024 (losango + Galeria dos Mistérios) + fine-discriminate@360 (quadrado/retângulo). 0 core/shell/direction; git
diff = exactly 5 files. NO deploy. **⚠ LESSON: longer pt shape-name plates (retângulo/triângulo = 9 chars, §A.13.61-locked) wrap
taller than en at 320×640 → the sanctioned fix is an activity-layer @media trim, NOT shortening the formal shape names.**

## #53 DONE — chuffer "Pátio de Manobras do Chuffer" (`chuffer.rail-decompose.k-oa-a-3`, de `4b8d5217`, commit 025799b9) — DECOMPOSE NUMBERS (part-part-whole)
o trenzinho Chuffer runs a switchyard; the child splits a load of caixas onto two vagões (azul+vermelho), says the decomposition
("5 é 2 e 3"), puxa o engate to log it in the **caderno de rotas**; finds ALL the ways to split a número ≤10. 9 rounds (base/covary/
hunt/make-ten/equation/mirror/judge). Part-part-whole = **o todo e as partes**. ⭐ **GRADE = 1º ano (GRADE_OVERRIDE pt:'1' merged into
`{de:'1',fr:'1'}` at page.tsx:99 — PEDAGOGUE DECISIVE):** BNCC **EF01MA06** (fatos básicos da adição) + **EF01MA08** (problemas
reunir/separar com material manipulável) = 1º ano. ⚠ **pedagogue CORRECTED a common mis-citation: do NOT cite "compor/decompor de até
DUAS ORDENS" (EF01MA06/07) — that's EF02MA04 (2º ano, dezena+unidade); decompor ≤10 em duas partes is ONE order.** Mirrors de+fr,
diverges from es (K by SEP). ⭐⭐ **STRAND = Números — THE OA TRAP (STRAND_OVERRIDE pt:'Números' merged into `{de:'Zahlen und
Operationen'}` at page.tsx:215):** K.OA auto-maps pt → **"Álgebra"** (DOMAIN ERROR); concrete part-part-whole = sentido numérico =
Números (BNCC Álgebra 1º-2º = só padrões/sequências). The #9 ten-stones / #16 sharing-jar doctrine (de/es/fr's OA auto-maps to their
Números-equivalent so needed no override; only pt's OA→Álgebra is wrong). ⭐ **Character: keep "Chuffer" (o trenzinho Chuffer —
OPERATOR-CHOSEN via AskUserQuestion over a BR train name "Piuí"; harmonizes with de/es/fr, name not mechanic-load-bearing; article
"O Chuffer" in speech).** ⭐⭐ **DECOMPOSITION-STATEMENT GENDER = ABSTRACT MASCULINE "cinco é dois e três"** (both pedagogue + linguist
DECISIVE: the NUMBER decomposes, not the caixas → um/dois NOT uma/duas; counting caixas would be fem but the LOGGED fact is masc).
`WORDS_PT` (0-10, masc, ⚠ accented três) + numWord pt branch. Engine: rounds numeric/locale-neutral; per-locale WORDS + strings + ~10
inline es/de/fr branches (car caps, shift aria/label, spoken split, claim, judge, win, route-book) — pt added to each. Vocab: caixas ·
**vagões** (Vagão azul/vermelho) · **engate** (Puxe o engate!) · **amigo do dez** (make-10 partner, #9 term) · **caderno de rotas**
(route-book; NOT "diário de bordo") · pátio de manobras · trem (NOT EU comboio) · CLUNK→**"CLEC!"** (BR onomatopoeia). você-form.
slug `decompor-numeros-ate-10-o-todo-e-as-partes-1-ano`; title/intro BNCC name-only. html ?v=16; wrapper 9.395. §A.13.62 GREEN pt 54/54
+ en 54/54; verify-activity-content-pt PASSED; preflight PASS; parity WORDS_PT 0-10 + 22 strings + {a}/{b} preserved + no EU tells; tsc
clean; pt gate 112→**113**; personal-read base@768 (Vagão azul/vermelho, 4=?+?) + decompose-10@1024 + make-ten@360 (amigo do dez,
lacrado). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.


### #54 `friendship-bridge` — A Ponte da Amizade / comparar quantidades (K.CC.C.6 → **1º ano**) — DONE, commit `0c9278a6` (push, NO deploy)
Compare two groups of round "amiguinhos" (**Big** teal / **Bit** coral) meeting on a bridge; pair them ONE-TO-ONE across the bridge —
whoever has an amiguinho left **sem par** has MORE. Facets: predict / pair-up / count / how-many-more / make-equal. **The eye engana** (a
spread-out fileira LOOKS like more; the pairs show the truth = conservation of number). Numbers ≤10. **GRADE = 1º ano** (GRADE_OVERRIDE
merged `{de:'1'}`→`{de:'1',pt:'1'}`; pedagogue DECISIVE): **BNCC EF01MA03** — "estimar e comparar quantidades de objetos de dois
conjuntos… por correspondência um a um: tem mais/tem menos/tem a mesma quantidade" = verbatim this activity. ⚠ **NOT EF01MA05** (that's
written-numeral compare = the comparison-creek #11 sibling). Mirrors de(Klasse 1); diverges from fr+es (K by GS/SEP) — the #11
BR-K-cluster→1º pattern. **STRAND = Números, NO override** (Counting&Cardinality auto-maps → Números; strand-names pt exists; NOT the
OA→Álgebra trap; de didn't override either). Characters **Big/Bit KEPT** (all siblings; two fuzzballs; not mechanic-determining —
either can have more). `WORDS_PT` 0-10 **masc** (⚠ accented três) + numWord pt branch. Reveal spoken = **abstract masculine** "cinco é
mais que três" (um/dois/três NOT uma/duas — the NUMBER compares) / same = "cinco e três são a mesma quantidade". 34 `strings` (all
{name}/{n}/{big}/{small}/{bigN}/{smallN}/{d} placeholders preserved) + disc aria pt ("amiguinho do Big/Bit, tem par") + `_revealSpeech`
pt + `speak()` pt-BR (2 sites). Vocab: comparar quantidades · **mais/menos/Igual** (same button="Igual") · **amiguinhos** · **par**
(tem par/sem par/pares!) · **montinho** · **"o olho engana"** (conservation) · você-form; curly aspas. slug
`comparar-quantidades-mais-menos-igual-1-ano`; title/intro BNCC name-only (no code/SEP). html ?v=8→**?v=9**; wrapper 9.395→**9.396**.
§A.13.62 GREEN pt **54/54** + en 54/54 (full sweep 320·360·412·768·1024·1366 × 9 rounds); verify-activity-content-pt PASSED; preflight
PASS; parity WORDS_PT 0-10 + 34 strings + placeholders preserved + no EU tells; tsc clean; pt gate 113→**114**; personal-read
compare@768 (Quem tem MAIS?, Big 6/Bit 5, Big/Igual/Bit) + make-equal@360 (Deixe os dois IGUAIS!, + Adicionar amiguinho) +
how-many-more@1024 (Quantos a MAIS?, "Quantos a MAIS Big tem?" — {name} placeholder substituted). 0 core/shell/direction; git diff =
exactly 5 files. NO deploy.


### #55 `necklace` — O colar que não para quieto / contar quantas são (K.CC.B.4 → **1º ano**) — DONE, commit `d9391876` (push, NO deploy)
A **raposa** strings a beaded necklace to match its friend's — the SAME HOW-MANY, not the same colors. Count the friend's **contas** one-by-one (correspondência um a um), last number = **quantos** (cardinalidade), thread your own to that number, clasp it. Twist rounds SHAKE / SCATTER / HIDE — **a quantidade não muda** ("o olho engana" = conservação/invariância). Plus how-many-confirm, thread-the-heard-number, and a "one bead too many — take one off" fix round. ≤10. **GRADE = 1º ano** (GRADE_OVERRIDE merged `{de:'1'}`→`{de:'1',pt:'1'}`; pedagogue DECISIVE): **BNCC EF01MA04** (contar a quantidade de objetos e apresentar o resultado = count-collection→cardinal) primary + **EF01MA02** (pareamento) secondary. ⚠ **invariância/conservação has NO standalone BNCC code** — it's the conceptual underpinning of EF01MA04 (a contagem é propriedade do conjunto, não do arranjo). ⚠ **NOT EF01MA03** (that's *comparar* two given sets = the #54 friendship-bridge anchor; this activity *counts-and-builds*). contagem/cardinalidade = EF01MA0x = 1º ano (educação infantil é não-seriada). Mirrors de(Klasse 1); diverges from fr(GS)+es(kínder) — the #11/#54 BR-K-cluster→1º pattern. **STRAND = Números, NO override** (Counting&Cardinality auto-maps; NOT OA→Álgebra; de/es/fr didn't override). Character **raposa** (feminine — dictionary-default unmarked generic; ⚠ distinct from #50's NAMED male "Raposo"; keeps agreement "da raposa"). ⭐ **Engine speaks numbers via LCSAudio `type:'number'` with `lang` → NO `WORDS_PT`/`numWord` needed** (mirror de/es/fr: pass `pt-BR`). 23 `strings` ({n} placeholders + emojis preserved) + readout `Contadas`/`As suas` + win-clasp spoken `{n} e {n} — fechou!` + nk-eq done `{n} e {n} — a mesma quantidade!` + fox aria `raposa` + speak() pt-BR (2 sites). Vocab: contas · colar · raposa · contar/quantas/quantidade · enfiar as contas no cordão · fechar o colar · "o olho engana". você-form. slug `contar-contas-fazer-a-mesma-quantidade-colar-1-ano`; title/intro BNCC name-only. html ?v=10→**?v=11**; wrapper 9.396→**9.397**. §A.13.62 GREEN pt **48/48** + en 48/48 (full sweep × 8 rounds); verify-pt PASSED; preflight PASS; parity 23 strings + placeholders + inline A–D + no EU tells; tsc route clean; pt gate 114→**115**; personal-read count-model@768 (CONTADAS readout) + count@360 (10 beads, hint wraps clean) + scatter@1024 (countScatterHint conservation twist). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.
⚠ **Flagged-not-acted (shared-source, out of pt-fan-out scope):** linguist audited the English source — #13 commitConfirm shows {n} (by-design confirm of what was just counted), #10 fixRepairHint "fox's necklace is wrong" (the find-skip round's real mechanic), #14 proceedAffirm mildly awkward EN. All shared en/de/es/fr design; faithful pt shipped, NO en/engine/core change (the fr mute-e / #53 "duas ordens" deferral pattern).


### #56 `star-stitcher` — Conte e acorde as estrelas / contar a partir de um número (K.CC.A.2 → **1º ano**) — DONE, commit `6de78452` (push, NO deploy)
A firefly (**o vaga-lume**, masc) flies only to stars already COUNTED; from one lit star (a given number) the child taps **"Conte mais"** to count ONWARD one dark star at a time — "oito… nove… dez…" — waking each. When the last lights, a sleeping constellation-creature wakes. Core skill: **contar a partir de um número dado (sobrecontagem), sem recomeçar do 1**. One variant counts a pile of dots first to set the start. ≤18, no timer/score. **GRADE = 1º ano** (GRADE_OVERRIDE merged `{de:'1'}`→`{de:'1',pt:'1'}`; pedagogue DECISIVE): **BNCC EF01MA01** (números como indicador de ORDEM — the oral-sequence count-on hit) primary + **EF01MA02** (pareamento — the count-the-pile variant) secondary. Sobrecontagem folded into contagem ascendente, no standalone code. ⚠ **≤18 / no-place-value keeps it 1º, never 2º** (fr's non-escalation argument). NOT EF01MA04 (collection-to-100 = #55 necklace), NOT adição. Mirrors de(Klasse 1); diverges from fr(GS)+es(kínder) — K-cluster→1º. **STRAND = Números, NO override** (Counting & Cardinality auto-maps; ⚠ NOT Álgebra — "sequência" tempts it but Álgebra 1º ano EF01MA09/10 needs a *padrão recorrente*; counting-on is number-sense inside Números). ⭐ **Engine speaks numbers via LCSAudio type:'number' with lang → NO WORDS_PT** (mirror de/es/fr: pass pt-BR). 12 `strings` ({n}/{c} preserved) + **`CREATURE_PT`** gendered-phrase map (the win `{c}` is an article+noun phrase — "uma raposa"/"uma coruja"/etc — and the frame `Você acordou {c}!` DROPS its own article, per the existing de/es/fr design) + `creaturePhrase` pt branch + speak() pt-BR (2 sites). ⚠ **deer = "um cervo", NOT "veado"** (BR slang/pejorative — native linguist call). Firefly = **"o vaga-lume"** (masc, consistent agreement; ⚠ NOT es/fr feminine "luciérnaga/luciole"). Vocab: contar/continuar a contagem/contar a partir de · estrela · acordar · sobrecontagem. você-form. slug `contar-a-partir-de-um-numero-sequencia-com-estrelas-1-ano`; title/intro BNCC name-only. html ?v=8→**?v=9**; wrapper 9.397→**9.398**.
⭐⭐ **Shared-layout fix (activity-layer injectCSS, fixed ALL 5 locales):** the short-viewport `@media (max-height:820px),(max-width:480px)` block forced `.ss-hint` to `line-clamp:1`, CLIPPING the load-bearing instructional hint 15-30px at ≤480px — the §A.13.62 visual-qa gate caught it failing **en/de/es/fr/pt identically** (pre-existing; the activity predates the gate). Fix: allow the hint 2 lines (`line-clamp:2`, 12px) + reclaim vertical space (tighter panel `min(112px,15vh)`/numeral/gaps at 320/360) so FITS still holds at 320×640; also shortened the pt countHint to be 2-line-safe. 0 lines to core/shell — the CSS lives in the activity's own injectCSS. **LESSON: the visual-qa gate surfaces pre-existing SHARED defects across all locales; when I'm in the file, fix the shared activity-layer layout (helps every locale) rather than shipping pt no-worse-than-en — an activity is not done until the gate is GREEN, and "en fails too" is not an exemption.**
§A.13.62 GREEN pt **42/42** + en 42/42 (full sweep × 7 rounds, AFTER the clip fix); verify-pt PASSED; preflight PASS; parity 12 strings + {n}/{c} + CREATURE_PT 7 keys (deer=cervo) + creaturePhrase pt + speak pt-BR ×2 + no EU/leak tells; tsc route clean; pt gate 115→**116**; personal-read count-on@768 + pick-anchor@360 (2-line hint shows FULL, fix confirmed) + count-set@1024. 0 core/shell/direction; git diff = exactly 5 files. NO deploy.
⚠ **Flagged-not-acted (shared en source, out of scope):** linguist found en `win` "You woke a {c}!" hardcodes "a" (breaks on "owl" a→an) — but the non-en locales already restructured (article inside {c}), so pt is correct with nothing to fix; en countHint/prompt wording quibbles. NO en/engine/core change.


### #57 `mochi-feast` — O banquete do Mochi / contar e formar a quantidade (K.CC.B.5 → **1º ano**) — DONE, commit `5ea47d1f` (push, NO deploy)
**Mochi** (a dumpling) is hungry; the prompt asks for an EXACT number of a treat ("Dê 5 morangos ao Mochi!"). The child taps a **prato** (dish) to drop **guloseimas** into a **tigela** (bowl) ONE AT A TIME, building the set to the requested count, then Verificar. NO numerals — the bowl filling IS the count. Too many → tap a treat to take one back. Core skill: **produzir/contar uma coleção com o cardinal pedido (contar um a um até o número certo e parar)** — the INVERSE of #55's count-how-many. Numbers 2-10. **GRADE = 1º ano** (GRADE_OVERRIDE merged `{de:'1'}`→`{de:'1',pt:'1'}`; pedagogue DECISIVE): **BNCC EF01MA02** (contar de maneira exata… pareamento — count-out-to-a-target, "cada toque = mais um", self-correct by taking one back) primary + **EF01MA01** (o número pedido = indicador de quantidade) secondary. ⚠ **NOT EF01MA04** (that's #55 necklace's *read-a-set-and-REGISTER*; this is the inverse, produces NO symbolic register — reusing #55's code would collapse two distinct habilidades). Mirrors de(Klasse 1); diverges from fr(GS)+es(kínder) — K-cluster→1º. **STRAND = Números, NO override** (Counting & Cardinality auto-maps; NOT the OA→Álgebra trap). ⭐ **Simplest engine: the wrapper fully OVERRIDES `strings` (16 keys, all `api.t`-resolved) — NO speak/LANG/numWord/CREATURE map.** 16 strings + pt ({n} preserved in the 8 prompts). Character **Mochi KEPT** (all locales + ensemble; MO-chi easy for a BR kid, no unfortunate connotation). Frame **"Dê {n} <treat> ao Mochi!"**; treats **morangos/biscoitos(NOT bolachas)/cerejas/cupcakes/bananas/maçãs/rosquinhas/muffins**; **guloseima** throughout (NOT gostosura). você-form. slug `contar-e-formar-a-quantidade-dando-guloseimas-ao-mochi-1-ano`; title/intro BNCC name-only. html ?v=7→**?v=8**; wrapper 9.398→**9.399**. §A.13.62 GREEN pt **48/48** + en 48/48 (full sweep × 8 rounds); verify-pt PASSED; preflight PASS; parity 16 strings + {n} + 8 treat plurals + no EU/leak/lock tells + no speak/CREATURE/WORDS_PT; tsc route clean; pt gate 116→**117**; personal-read morangos@768 + cerejas@360 + maçãs@1024. 0 core/shell/direction; git diff = exactly 5 files. NO deploy.
⚠ **Flagged-not-acted (shared en source):** the 8 prompt frames hard-code a plural after {n} ("1 morangos") — but numbers are 2-10 so n=1 never renders (confirmed; same as de/es/fr). NO en/engine/core change.


### #58 `ten-tank` — Tanque de Dez do Dudu / números 11-19 como dezena e unidades (K.NBT.A.1 → **1º ano**) — DONE, commit `5beb2f54` (push, NO deploy)
⭐⭐ **FIRST NBT / place-value activity in the pt fan.** Dudu (a duckling, RENAMED from Dewey) fills a **tanque** with **bolhas** one at a time; when the 10th drops, ten bolhas SEAL into ONE **dezena**; leftover bolhas = "e algumas unidades." Build / decompõe (dezena in one tray, unidades in the other) / compare the teen numbers **11-19** as **uma dezena e algumas unidades** (14 = 10 + 4). Concrete material, no algorithm. **GRADE = 1º ano** (GRADE_OVERRIDE merged `{de,fr,es:'1'}`→+pt:'1'; pedagogue DECISIVE): **BNCC EF01MA07** (compor/decompor número de até duas ordens com material manipulável, favorecendo a compreensão do SND) primary + **EF01MA05** (comparar) secondary. ⚠⚠ **NOT EF01MA08** — the pedagogue CORRECTED my proposed code: EF01MA08 is the add/sub word-problems habilidade; EF01MA07 is compor/decompor-com-material. ⚠ **Clean distinction from bos-berry-pantry pt='2':** ten-tank = composição/decomposição com material ≤20 (1º = EF01MA07); bos-berry = valor posicional FORMAL to 85, multiple tens (2º = EF02MA01). Harmonizes with es/fr/de at grade 1. **STRAND = Números, NO pt override** — ⭐ `strand-names.ts` ALREADY auto-maps `'Number & Operations in Base Ten'.pt = 'Números'` (line 92); de needs a STRAND_OVERRIDE only because its auto-calque is wrong, pt does NOT. (NBT joins CC under "Números" for BR.) **⭐ Character Dewey → Dudu** (operator AskUserQuestion ruling: "Dewey" opaque/hard-to-pronounce for a BR 1º-ano kid; Dudu = warm, pronounceable, "o patinho Dudu"; pt-ONLY divergence, de/es/fr keep Dewey — linguist RECOMMENDED, content writer said keep, operator broke the tie → Dudu). **Number-word engine (heavier):** `WORDS_PT` 10-19 (⚠ BR: **quatorze/dezesseis/dezessete/dezenove**, NOT EU dezasseis/dezassete/dezanove) + numWord pt branch; `speak()` LCSAudio **type:'word'** pt-BR (2 sites — differs from the type:'number' engines); **3 inline spoken carriers** ("Monte "/"Dez"/"uma dezena e "). 29 `strings` + pt ({n}/{k}/emoji preserved; Dudu in title/repairHint/audioHint). Trays **Dezenas/Unidades**. você-form. slug `numeros-de-11-a-19-dezena-e-unidades-compor-1-ano`; title/intro BNCC name-only (Dudu in intro). html ?v=7→**?v=8**; wrapper 9.399→**9.400**. §A.13.62 GREEN pt **48/48** + en 48/48 (full sweep × 8 rounds — NO clip despite 29 strings); verify-pt PASSED; preflight PASS; parity 29 strings + {n}/{k} + WORDS_PT 10-19 + numWord pt + speak pt-BR ×2 + 3 carriers + 0 Dewey-leak/Dudu-present + no EU-PT; tsc route clean; pt gate 117→**118**; personal-read build-ten@768 + regroup@360 (hint wraps clean) + audio@1024 (Dudu). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.
⚠ **Flagged-not-acted (shared en source):** repairHint {n} ambiguity (pt mirrors de), tank/pond noun inconsistency (pt unified "tanque"), "some ones" generic-plural vs 11's single leftover (shared all locales), moreMore "+{k} more" redundancy, prompt==hintCheck. NO en/engine/core change.


### #59 `wondering-jar` — O Frasco dos Palpites / estimar e contar (K.CC.B.5 → **1º ano**) — DONE, commit `37d86988` (push, NO deploy)
A **coruja** curiosa loves guessing jars; the child ESTIMATES how many **docinhos** are in a **frasco** (slides a **palpite** on a **reta numérica** ≤20 and locks it — "seu palpite nunca está errado"), THEN the jar spreads its sweets and the child COUNTS them one by one to find the truth. Variants: estimate-then-count / more-or-fewer-than-a-reference / which-jar-has-more (A/B). No operations. **GRADE = 1º ano** (GRADE_OVERRIDE merged `{de:'1'}`→`{de:'1',pt:'1'}`; pedagogue DECISIVE + **OVERRODE my proposed EF01MA02**): **BNCC EF01MA03** — *"estimar e comparar quantidades de objetos de dois conjuntos (em torno de 20 elementos), por estimativa e/ou por correspondência um a um…"* — the ONLY 1º-ano habilidade whose verb is literally **estimar**; matches the number-line-to-20 + estimate-then-count + more/fewer + which-jar variants exactly. **EF01MA02** (contar exata OU aproximada) secondary. ⚠ **Cleaner than a same-code pairing with #57 mochi-feast** (both K.CC.B.5): mochi-feast = EF01MA02 (produce-a-set); wondering-jar = **EF01MA03** (estimar) — different codes, same grade. Mirrors de(Klasse 1); diverges from fr(GS)+es(kínder) — K-cluster→1º. **STRAND = Números, NO pt override** (Counting & Cardinality auto-maps; the more/fewer comparison is quantity-comparison, NOT Álgebra — Álgebra 1º ano = padrões EF01MA09/10). ⭐ **Strings-only + speak-lang engine:** `speak()` LCSAudio **type:'number'** pt-BR (2 sites; delegates number→word → NO WORDS_PT/numWord); de had extracted ALL inline literals to `api.t` (jarN/vsLabel) → no inline carriers. 28 `strings` + pt (all {n}/{g}/{a}/{b}/{j} + 🌟/🎉/🦉 preserved). Generic **coruja** (owl) — NO proper name (each locale titles the jar its own way: es "Frasco preguntón", fr "bocal mystère de la chouette") → no name fork. Title **"O Frasco dos Palpites"**; **vsLabel "×"** (BR placar separator, kid-friendly Flamengo×Vasco); jar-letters **A/B** universal (not relocalized). Vocab: coruja/frasco(NOT pote)/docinhos(NOT balas)/palpite/reta numérica. você-form. slug `adivinhar-e-contar-docinhos-no-frasco-1-ano`; title/intro BNCC name-only. html ?v=9→**?v=10**; wrapper 9.400→**9.401**. §A.13.62 GREEN pt **42/42** + en 42/42 (full sweep × 7 rounds — no clip); verify-pt PASSED; preflight PASS; parity 28 strings + placeholders + speak pt-BR ×2 + vsLabel × + no EU/leak/lock; tsc route clean; pt gate 118→**119**; personal-read estimate@768 + estimate@360 + which-jar@1024 (Frasco A/B). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.
⚠ **Flagged-not-acted (shared en source/engine):** "wish"/"guess"/"wonder" drift (pt unified on **palpite**); revealSlider/revealWhich count=1 plural break — pt uses the INVARIANT **"o frasco tinha {a}"** (safe for a=1, a smart pt-side wording, no engine change); {n} overloaded number-vs-jar-letter (engine .replace design; pt keeps "Frasco {n}"); dirSame may render after revealSlider. NO en/engine/core change.


### #60 `pips-round` — A Entrega do Pip / ler e reconhecer números 0-20 (K.CC.A.3 → **1º ano**) — DONE, commit `6a8640bc` (push, NO deploy)
**Pip** (o ratinho carteiro) delivers letters; an envelope shows a written NUMERAL (or the child hears it); the child READS/recognizes it and taps the matching **casa** by its número plate. A neighbor animal (coruja/gato/sapo…) waves. Reading numerals **0-20** + the 13-vs-31 teen-reversal. **GRADE = 1º ano** (GRADE_OVERRIDE merged `{de,fr,es:'1'}`→+pt:'1'; pedagogue DECISIVE): **BNCC EF01MA01** primary — ⭐ the **"código de identificação" clause** (*"reconhecer situações em que os números não indicam contagem nem ordem, mas sim código de identificação"*) is a LITERAL exact fit: a house number IDENTIFIES, doesn't count/order; + leitura de numerais 0-20. **EF01MA05** (comparar números de até duas ordens — 13-vs-31) secondary. ⚠ NOT EF01MA07/08 (compor/decompor — this reads/discriminates the symbol only). Harmonizes with de(Klasse 1)/fr(CP)/es(1.º) — all three at grade 1 (reading-to-20 + teen-reversal = numeração formal). **STRAND = Números, NO pt override** (CC auto-maps; the de digby "Zahlen und Operationen" override is a de-calque artifact; NOT Álgebra). Character **Pip KEPT** (short, phonetic, not opaque). **Number-word + resident-map engine (heavy):** `WORDS_PT` 0-20 (BR forms quatorze/dezesseis/dezessete/dezenove) + numWord pt branch; **`RESIDENT_PT` 15 animals article-baked** (⚠ rã≠sapo; passarinho=wren, tritão=newt) so the win "é {name}!" is gender-safe; `speak()` LCSAudio **type:'word'** pt-BR (2 sites); **5 inline carriers** ("Uma carta para o número {w}" ×2 / "Vamos achar o número {w}" / "{w} — entregue" / "casa número " / pip-aria "Pip, o ratinho carteiro"); `_win` RESIDENT_PT branch. 12 `strings` + pt ({r}/{t}/{w}/{name}/emoji preserved). Vocab: Pip/carta/casa/número da casa/entregar/ler. você-form. slug `ler-e-reconhecer-numeros-0-20-cartas-pip-1-ano`; title/intro BNCC name-only. html ?v=5→**?v=6**; wrapper 9.401→**9.402**. §A.13.62 GREEN pt **54/54** + en 54/54 (full sweep × 9 rounds — no clip); verify-pt PASSED; preflight PASS; parity 12 strings + placeholders + WORDS_PT 0-20 + RESIDENT_PT 15 + numWord + speak pt-BR ×2 + 5 carriers + _win branch + no EU/leak; tsc route clean; pt gate 119→**120**; personal-read read@768 + teen-read@360 + audio@1024 (Ouvir o número). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.
⚠ **Flagged-not-acted (shared en source):** win {w} at 0 → capitalizer yields "Zero" (word, works pt); readIt/carrier "number" asymmetry (mirrored pt); RESIDENT article baked in map; {t}/{r} digits, pt anchors article on elided "casa". NO en/engine/core change.


### #61 `posy-egg-cartons` — As Caixas de Ovos da Posy / contar de 10 em 10 até 100 (K.CC.A.1 → **1º ano**) — DONE, commit `9cf19342` (push, NO deploy)
**Posy** (a galinha) packs eggs into **caixas de dez** (cartons of exactly 10 eggs); the child COUNTS the full cartons **de 10 em 10** — 10, 20, 30… até 100 — and taps the total. ⚠⚠ **REAL GRADE FORK, pedagogue DECISIVE (NOT 50/50): 1º ano.** Route `{ de:'2', fr:'1', es:'1' }`→+**pt:'1'** (native 'K' lifted to 1, matching fr/es, diverging from **de's Klasse 2**). BNCC **EF01MA04** primary — *"Contar a quantidade de objetos de coleções ATÉ 100 unidades… em jogos, brincadeiras"* — the **"até 100" is EXPLICIT at 1º**; the de Klasse-2 call is a **non-transferable DE stratification artifact** (German Klasse 1 stops at 20; BNCC has no such ceiling). **EF01MA02** (contar por agrupamentos) secondary. ⚠⚠ **Genuinely DISTINCT from bos-berry-pantry (pt='2'):** posy COUNTS a collection (cartons-of-ten = counting SUPPORT); it does NOT read/compare/decompose a two-digit numeral by valor posicional (THAT is the only within-100 thing BNCC defers to 2º). So the pt within-100 doctrine holds cleanly BOTH ways: **conta-coleção-até-100 → 1º; lê/decompõe-numeral-de-duas-ordens → 2º.** Harmonizes with fr(CP)/es(1.º). **STRAND = Números, NO pt override** (posy CONTA um total; does NOT construct/complete a sequência — NOT Álgebra; the skipcount.fill Álgebra ruling does NOT carry). ⭐ **Simplest engine: 8 `strings` + 2 inline aria labels** (henSVG "Posy, a galinha" / cartonHTML "uma caixa com dez ovos"); NO speak/numWord/WORDS/RESIDENT. Character **Posy KEPT** (2-syllable "PÔ-zi", easy, pairs "a galinha"). Vocab: galinha/ovos/caixa de dez/dezena/**contar de 10 em 10** (NOT "por dezenas"). hintWrong anchors on "dezena". você-form; 🥚 preserved. slug `contar-de-10-em-10-ate-100-caixas-de-ovos-1-ano`; title/intro BNCC name-only. html ?v=4→**?v=5**; wrapper 9.402→**9.403**. §A.13.62 GREEN pt **48/48** + en 48/48 (full sweep × 8 rounds — no clip, layout holds at 8 cartons); verify-pt PASSED; preflight PASS; parity 8 strings + 2 aria + no EU/leak + no speak/numWord; tsc route clean; pt gate 120→**121**; personal-read 2-carton@768 + 8-carton@1024 + 5-carton@360. 0 core/shell/direction; git diff = exactly 5 files. NO deploy.
⚠ **Flagged-not-acted (shared en source):** posyIntro "holds ten" vs hintWrong "is TEN" verb mismatch + "not one" ambiguity; prompt/ask redundancy. pt internally correct. NO en/engine/core change.


### #62 `clock-elapsed` — O Relógio do Sprocket / tempo no relógio (3.MD.A.1, **2 ROWS** → **3º ano**) — DONE, commit `a74967ba` (push, NO deploy)
⚠ **2-ROW / 2-COORDINATE activity.** **Sprocket** (a galo) cheers; an analog **relógio** shows a start time, the child solves elapsed-time problems (minutes to the 5, crossing the hour). **Row 1** `clock-elapsed.what-time.3-md-a-1` ("Que Horas Vão Ser?", count-on → end time); **Row 2** `clock-elapsed.add-subtract.3-md-a-1` ("Somar e Subtrair Minutos", ± minutes: daqui a N / N atrás). **GRADE = 3º ano BOTH rows, NO pt override** (native grade '3' applies to ALL locales — de Klasse 3, fr CE2, es 3.º; there is NO clock-elapsed GRADE_OVERRIDE at all → pt inherits native 3). Pedagogue DECISIVE: BNCC **EF03MA22** (ler/registrar medidas e intervalos de tempo… início/término/duração) primary both rows + **EF03MA23** (ler horas em relógio analógico) reading substrate. ⚠⚠ **The 3º-ano time codes are EF03MA22/23 — NOT EF03MA24 (money) or EF03MA26 (data)** (pedagogue CORRECTED my proposed codes). analog + minutos + crossing-the-hour = the 2º→3º leap (2º = digital-read/record EF02MA18/19). **STRAND = Grandezas e medidas, NO pt override** (strand-names.ts:79 maps 'Measurement & Data'.pt = 'Grandezas e medidas'; time IS a grandeza; NOT Números). Character **Sprocket KEPT** — ⭐ the LINGUIST (naming authority) gave a strong keep (a foreign character name like Woody/Peppa, pronounceable "s-PRÓ-ket", cog-meaning not load-bearing; content agreed; the PEDAGOGUE flagged "opaque" but that was a SOFT flag → **NO rename fork**; contrast #58 Dewey→Dudu where the LINGUIST recommended the rename). ⭐ **Engine: per-locale `L` table** (+pt 6 keys q/qBack/win/winBack/hint/hintBack, {n}/{start}/{end} + U+2212 minus preserved) + a **native-owned BR TIME IDIOM** in `spoken()` (HRS_PT feminine uma/duas/três…; "N horas"/"N e meia"/"N e quinze"/"quinze para as N+1" with the h=12→"para a uma" article; MIN_PT spelled cardinals for the sr/aria) + clockSVG aria "mostrador do relógio" + sr sentence "O relógio marca {spoken}…" + strings title/instruction. Vocab: relógio/hora/minutos/ponteiros/daqui a/minutos atrás/virar a hora. você-form. **2 manifest rows × slug/title/intro.pt** (que-horas-vao-ser / somar-e-subtrair-minutos, both -3-ano) + **2 prose blocks** in pt.json. html ?v=9→**?v=10**; wrapper 9.403→**9.404**. §A.13.62 GREEN **BOTH rows** pt 54/54 + en 54/54 (full sweep × 9 rounds each — no clip); verify-pt PASSED; preflight PASS; parity L.pt 6 keys + spoken HRS_PT/MIN_PT/quinze-para + aria + sr + both rows + both prose + no EU/leak (⚠ the L.pt parity regex was a FALSE-NEGATIVE — verified L.pt correct directly; "verify the measurement before the defect"); tsc route clean; pt gate 121→**123** (+2, two rows); personal-read Row1 what-time@768 (daqui a 30 min, 3:00→3:30) + Row2 subtract@360 (30 min atrás, 3:30→3:00) + Row2 add@1024 (daqui a 45 min, 2:15→3:00 crossing hour). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.
⚠ **Flagged-not-acted (shared en source):** "count on the minutes" phrasal idiom (pt renders intent); instruction/hint near-duplicate; subtraction hour-wrap = math concern (pt spoken() is wrap-agnostic, safe). NO en/engine/core change. ⭐ **2-ROW learnings: JSON-reserialize scripts (`JSON.stringify(,null,2)+'
'`) add pt to BOTH rows / BOTH prose in one pass, minimal diff; each visual-qa run overwrites the SAME qa/ dir keyed by activity id, so after running Row2-en the Row2 pt screenshots are stale — RE-RUN the row's pt just before the personal Read.**


### #63 `patchwork-meadow` — O Prado de Retalhos do Sprout / medir área com quadradinhos (3.MD.C.6 → **4º ano**) — DONE, commit `c8b396e3` (push, NO deploy)
**Sprout** (a coelho/bunny gardener) has irregular **canteiros** (L-shapes/staircases); the child MEASURES AREA by COVERING each with **quadradinhos de musgo** — no gaps, no overlaps — área = how many quadradinhos cover it. Task types: cover / fix(gap+overlap) / predict / finish / build-exact. ⚠⚠ **GRADE + STRAND DOUBLE-FORK, pedagogue DECISIVE (both resolve on ONE habilidade).** **GRADE = 4º ano** (GRADE_OVERRIDE merged `{fr:'4'}`→`{fr:'4',pt:'4'}`; native '3' lifted to 4 matching **fr/CM1**, diverging from en/de/es=3): **BNCC EF04MA21** (4º · Grandezas e medidas) — *"Medir, comparar e estimar área de figuras planas desenhadas em MALHA QUADRICULADA, pela contagem dos quadradinhos… reconhecendo que duas figuras com formatos diferentes podem ter a mesma medida de área"* — the activity VERBATIM. ⚠ **NOT EF03MA21** (3º · Geometria = só *comparar por superposição*, sem unidade/contagem); the moment the child uses a UNIT (quadradinho) e CONTA, it's EF04MA21/4º. NOT EF04MA20 (comprimento/massa). **STRAND = Grandezas e medidas, NO pt override.** ⚠⚠ **DO NOT copy the de/es geometry override** (de "Raum und Form", es "Forma, espacio y medida") — their systems FUSE geometry+measure; **BNCC does NOT fuse** (Geometria EF03MA21-comparar vs Grandezas e medidas EF04MA21-medir-com-unidade are SEPARATE unidades), and *measuring-with-a-unit* is unambiguously Grandezas e medidas. Native M&D auto-maps to "Grandezas e medidas" = correct → NO override. ⭐ **SETS the pt precedent for área** (guides sibling `mosaic-menders.area-match.3-md-c-6`: same EF04MA21 · 4º · Grandezas e medidas · no override). Character **Sprout KEPT** (linguist: a proper character name, not doing semantic work). ⭐ **HEAVIEST engine yet: L table (18 keys via txt()) + strings block (7 keys via api.t) + areaUnitPhrase().** +pt to all: L 18 keys ({n}/{area}/{r}/{c}/{value}/{covered}/{total} preserved) + strings 7 (double {n} in qbuild) + areaUnitPhrase pt (1 quadradinho / N quadradinhos). Vocab: coelho/canteiro/quadradinhos/musgo/área/cobrir/fila/coluna. você-form. slug `medir-area-cobrir-com-quadradinhos-canteiros-4-ano`; title/intro BNCC name-only (about[2] names Grandezas e medidas). html ?v=4→**?v=5**; wrapper 9.404→**9.405**. §A.13.62 GREEN pt **66/66** + en 66/66 (full sweep × 11 rounds — no clip); verify-pt PASSED; preflight PASS; parity L.pt 18 + strings 7 + areaUnitPhrase + 4-ano + Grandezas prose + no EU/leak (⚠ L.pt block verified DIRECTLY — the parity regex needs the clock-elapsed workaround); tsc route clean; pt gate 123→**124**; personal-read tile@768 + repair@360 (gap+×2 overlap) + finish@1024 (partial staircase). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.
⚠ **Flagged-not-acted (shared en source):** choiceUnits/srProgress/win hard-code the plural unit noun instead of routing through areaUnitPhrase() → "1 quadradinhos" on a single-square bed; register unified on "quadradinho" for K-3; stale "EN-ONLY pilot" header comment. NO en/engine/core change.


### #64 `digby-number-trace` — Digby traça os números / escrever os algarismos 0–9 (K.CC.A.3 → **1º ano · Números**) — DONE, commit `da4445ef` (push, NO deploy)
The dog **Digby** helps the child WRITE the numerals 0–9: a dotted numeral + orange start-dot appears; the child traces it stroke-by-stroke; it fills in; cycles 0→9. Pure numeral FORMATION (traçado/escrita convencional dos algarismos) — no counting/arithmetic. ⭐ The numeral-**WRITING** sibling of #60 pips-round (numeral-**READING**, same K.CC.A.3). ⚠⚠ **GRADE fork resolved AGAINST the fr/es reading of THIS activity — pedagogue-decisive.** **GRADE = pt='1' (1º ano)** (GRADE_OVERRIDE `{ de: '1' }`→`{ de: '1', pt: '1' }`): **BNCC EF01MA01 · unidade Números.** ⚠ **es/fr KEPT this WRITING sibling at PRE-PRIMARY** (fr='GS'/maternelle, es='preescolar' — no grade override; their pre-primary curricula INCLUDE numeral tracing) even though both bumped the READING sibling pips-round to grade-1. pt DIVERGES from fr/es (and does NOT copy the de='Klasse 1' K-cluster artifact): the **comparison-creek principle** (a Educação Infantil / EI03ET07 trata número oral/concreto e registra de modo livre, EVITANDO a formalização do traçado convencional → a fronteira BNCC cai um degrau acima da SEP/francesa) + **"manda a superfície de resposta"** (aqui a resposta É a grafia convencional do numeral, ato máximamente simbólico) → 1º ano, harmoniza com o irmão de leitura pips-round=1. **STRAND = Números via auto-map (C&C→Números) → NO pt STRAND_OVERRIDE** (the de "Zahlen und Operationen" + fr "Découvrir les nombres" overrides are locale-nomenclature artifacts). ⭐ LESSON: two Latin sibling curricula (fr/es) placing the WRITING face pre-primary does NOT bind BNCC — BNCC's EI/1º boundary sits a step higher (EI evita formalização simbólica); a WRITING sibling can land at a HIGHER pt grade than its fr/es peers even though a READING sibling harmonized. **Engine (light):** activity-layer only — `strings` +pt all 13 keys ({d}/{n} preserved; child-facing uses "número", slug/title/prose use "algarismos" = SEO/teacher register), `speak()` +pt→'pt-BR' (LCSAudio + fallback; type:'word' fixed praise "Muito bem!" — NO WORDS_PT/numWord, the numeral is a glyph not spoken), `dogSVG()` pt aria "Digby, o cachorro". NO WORDS/numWord. numlab "Trace o {d}" (article required — all digits masc → "o"). ⚠ es-leak guard: você-form "trace/comece/siga", NEVER imperative "traça" (the ONE "traça" is the title indicative 3sg "Digby traça os números" = Digby traces, correct — matches es title "Digby traza"). Character **Digby KEPT** (linguist). slug `escrever-os-numeros-0-a-9-tracar-algarismos-1-ano`; html ?v=4→**?v=5**; wrapper 9.405→**9.406**. §A.13.62 GREEN pt **60/60** + en 60/60 (sweep × 10 rounds 0-9, no clip); verify-pt PASS 124→**125**; preflight PASS; parity all-pt (⚠ the leak regex \btraça\b false-fired on the indicative title — verified DIRECTLY per the clock-elapsed lesson: only 1 "traça" = title 3sg, all imperatives você-form); tsc route clean (blog test errors pre-existing/unrelated); personal-read @768 (Trace o 0) + @360 (Trace o 1, 2-line instruction no clip) + @1024 (Trace o 5). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.
⚠ **Flagged-not-acted (shared en source, linguist):** (a) sayWin "Great number!" praises the number not the child (odd in EN too; pt softened to "Que número caprichado!"); (b) prompt duplicates instruction verbatim; (c) sayStroke em-dash. NO en/engine/core change.


### #65 `clock-ampm` — O relógio do Sprocket / períodos do dia: manhã ou tarde e noite (2.MD.C.7 → **1º ano · Grandezas e medidas**) — DONE, commit `3cd7ae54` (push, NO deploy)
The rooster **Sprocket** shows an everyday event + a clock time (e.g. "Você toma café da manhã." at "7 horas"); the child taps whether it's MORNING (before noon) or AFTERNOON/EVENING (after noon) — a binary at noon. ⭐ Sibling of #62 clock-elapsed (same Sprocket clock family, KEPT). ⚠⚠ **CORE FORK = a.m./p.m. is a US-only convention → REBUILT as períodos do dia** (buttons **"Manhã"** / **"Tarde e noite"**, NOT literal a.m./p.m.) — the whole answer surface changes; the proven de(Tageszeit)/fr(moments-de-la-journée)/es(partes-del-día) rebuild pattern. **GRADE = pt='1' (1º ano) · STRAND = Grandezas e medidas · anchor EF01MA17** (pedagogue-decisive; all 3 agents concur). GRADE_OVERRIDE `{ de:'1', fr:'1', es:'1' }`→`+pt:'1'` (all four non-EN grade 1; en stays Grade 2). Grounded in **BNCC EF01MA17 "reconhecer e relacionar períodos do dia"** (1º ano — exactly the manhã/tarde/noite skill); **"manda a superfície de resposta"** — the child does NOT read the clock (the digital "N horas" is a context cue), she JUDGES the período do dia → EF01MA17, NOT the 2º EF02MA18/19 clock-reading (absent). Converges with de/fr/es grade 1 but grounded independently in EF01MA17, not the de artifact. **Sibling ladder: clock-ampm (períodos do dia, 1º) < clock-read (2º) < clock-elapsed (#62, 3º EF03MA22/23).** STRAND Grandezas e medidas via auto-map (tempo=medida, M&D→G&m) → NO pt STRAND_OVERRIDE (de/fr/es added none). ⭐ **Binary design APPROVED by pedagogue** — the two content flags were already satisfied by the FIXED round data (I only translate the events): the PM bucket carries a genuine *tarde* item (play @4:00) alongside evening items, and no event sits at noon (earliest 6am = manhã, not madrugada). **Engine (medium):** activity-layer only, es was the exact Romance template — `L` table +pt (6 keys; hint "vêm a tarde e a noite" circumflex), `strings` title/instruction +pt, `.ap-pt` CSS de-scope (3 rules, matches .ap-es — fits "Tarde e noite" 2-word label), render class-chain +`ap-pt`, event-label +pt (`activityL10n.pt`), time-readout +pt (`N + ' horas'` — all events 4/6/7/8/9 → always plural, NOT "7h"/"às 7 horas"), `_srMirror` +pt branch. 9 `activityL10n.pt` events (você-form: "Você toma café da manhã." / "O sol nasce." / "Você brinca depois da aula." etc.). Character **Sprocket KEPT** (takes "o Sprocket"). ⚠ es-leak guard clean (no mañana/matin/Vormittag/a.m./p.m.). Time idiom NATIVE (BR "N horas" standalone readout; "às N horas" only in sr-mirror per the when-preposition). slug `partes-do-dia-manha-tarde-e-noite-1-ano`; in-app strings.title "O relógio do Sprocket — manhã ou noite" ≠ SEO page_title "Períodos do Dia com o Sprocket…" (distinct fields); html ?v=9→**?v=10**; wrapper 9.406→**9.407**. §A.13.62 GREEN pt **54/54** + en 54/54 (sweep × 9 rounds, no clip); verify-pt PASS 125→**126**; preflight PASS; parity all-pt; tsc route clean; personal-read @768 (café da manhã / 7 horas / Manhã+Tarde e noite buttons) + @360 ("Tarde e noite" 1-line, no wrap) + @1024 (Você janta / 6 horas PM round). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.
⚠ **Manifest note:** the rounds are COMPACT one-line objects (2-space file but hand-formatted) → a full JSON.stringify reserialize would explode the diff; used TEXT-LEVEL targeted replacement (insert `, "pt": "…"` after each `"es": "…"`) to preserve the one-line format. Watch the exact es anchor (manifest page_title es ≠ activity.js strings.title es).


### #66 `nesting-pots` — Os potinhos do Vovô Pip / ordenar números escritos do maior ao menor (K.CC.C.7 → **1º ano · Números**) — DONE, commit `ea43e5f2` (push, NO deploy)
**Vovô Pip** carves wooden nesting pots each painted with a NUMBER (1-10, plus a two-digit round 12-40); the child stacks them biggest-number→smallest so baby **Wee Olen** is safe in the middle (**Doot** the duck watches). ⚠ KEY design: read the painted NUMBER and order by number — NOT by physical pot size (pot size is a perceptual DISTRACTOR). Modes: order / fill-the-gap / twins (equal numbers side by side). **GRADE = pt='1' (1º ano) · STRAND = Números · anchor EF01MA05** (pedagogue-decisive, all 3 concur). GRADE_OVERRIDE `{ de:'1', fr:'1', es:'PK' }`→`+pt:'1'`. Grounded in **BNCC EF01MA05** ("comparar números naturais de até DUAS ORDENS" — the 12-40 round is the literal fit): the read-the-NUMERAL-not-the-size design places it in 1º comparar/ordenar-números-ESCRITOS, NOT EI seriação-perceptual (EI03ET07, evita a formalização simbólica). Homogeneous across all modes (even the 1-10 basic mode = comparar registros escritos). **Mirrors comparison-creek (SAME K.CC.C.7 → pt 1º/EF01MA05), diverges from es='PK'** (BR fronteira EI→EF a step above SEP), converges with de='1'/fr='CP'. Strand Números via auto-map (C&C→Números) → NO pt STRAND_OVERRIDE. **Engine (LIGHT):** activity-layer only, NO speak/WORDS/numWord/CSS-locale-scope — only `strings` +pt (13 keys, {a}/{b}/{n} numeral placeholders preserved) + 3 character SVG aria +pt. Character pattern: proper name KEPT + descriptor translated → **Vovô Pip / Bebê Wee Olen / Doot, o pato**. ⭐ **Register split (deliberate, both experts owned their surface):** in-app child-facing `strings` use **"potinho"** (linguist — warmest for K-2); SEO title/prose use **"pote/potes"** (content writer — parent/SEO register). Both correct BR. você-form ("Toque em …"). ⚠ es-leak guard clean (no ollita/Papi/Opa). slug `potes-do-vovo-pip-ordenar-numeros-1-ano`; html ?v=6→**?v=7**; wrapper 9.407→**9.408**. §A.13.62 GREEN pt **48/48** + en 48/48 (sweep × 8 rounds, no clip); verify-pt PASS 126→**127**; preflight PASS; parity all-pt; tsc route clean; personal-read @768 (potinhos + Vovô Pip + Verificar) + @360 (3-line prompt no clip) + @1024 (twins round 8/6/6/3). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.


### #67 `clunks-lost-lunch` — Clunk perdeu o lanche / compor um número de várias formas (K.OA.A.3 → **1º ano · Números** [OA override]) — DONE, commit `c68e3ea5` (push, NO deploy)
**Clunk** (a snack-robot with a cracked adding-chip) needs an exact total; the child taps numbered snacks (1-6) into the lancheira to COMPOSE it, feeds him, **then makes the SAME total a WHOLE new way** (5 = 4+1 = 3+2). Totais up to ~14 (crossing the ten). Modes: free / two-ways / missing-part / exactly-K / reduce. ⭐ Decompose sibling of `chuffer` (same K.OA.A.3 → pt 1º/Números). **GRADE = pt='1' · STRAND = Números [OVERRIDE MANDATORY] · anchor EF01MA06** (+EF01MA08) (pedagogue-decisive, all 3 concur). GRADE line 113 `{ de:'1', fr:'1', es:'1' }`→`+pt:'1'`; STRAND line 219 `{ de:'Zahlen und Operationen' }`→`+pt:'Números'`. ⚠⚠ **THE OA→ÁLGEBRA TRAP handled:** strand-names.ts:51 maps OA.pt→"Álgebra" (DOMAIN ERROR); compor/decompor = sentido numérico = Números (BNCC Álgebra 1º-2º = só padrões/sequências/elemento-faltante-de-sequência); mirrors chuffer/ten-stones/sharing-jar/fix-it-corner overrides. ⚠ the "parte que falta" mode LOOKS like elemento-faltante (Álgebra) but is complemento ADITIVO → fica Números. **Crossing-the-ten (totals to 14) STAYS 1º** — EF01MA08 covers "até dois algarismos"; it's composição aditiva, NOT decomposição-por-valor-posicional (EF02MA04/2º; the child combines parcelas into a whole, never reads dezena/unidade). Mirrors chuffer pt='1'; converges de/fr/es grade 1. **Engine (MEDIUM-HEAVY):** activity-layer only, es = Romance template — **WORDS_PT number-words 0-20** (⚠ BR: dezesseis/dezessete/dezenove/quatorze — EU dezasseis/dezassete/dezanove AVOIDED), numWord +pt, **speak() pt-BR** (LCSAudio `lang:(pt?'pt-BR':LANG)` + fallback), `strings` +pt (24 keys, {n}/{g}/{k}/{combo} preserved), cubby+chip aria +pt, `_check` next-way/wrong speak +pt, **`_win` combo join ` e ` + verb ` faz `** ("três e dois faz cinco" — matches the win string). Character **Clunk KEPT** (robot proper name); snack unit **"petisco/petiscos"** (in-app) / "lanche" (prose); lancheira; ⚠ `needs` renders "Clunk precisa de N petiscos" — BR keeps the preposition "de". você-form. ⚠ es-leak guard clean (no botana/goûter). slug `compor-um-numero-de-varias-formas-com-clunk-1-ano`; html ?v=5→**?v=6**; wrapper 9.408→**9.409**. §A.13.62 GREEN pt **54/54** + en 54/54 (sweep × 9 rounds incl. 14-total crossing-ten, no clip — long hintFeed/qTwoWays held); verify-pt PASS 127→**128**; preflight PASS; parity all-pt (GRADE pt:1 + STRAND pt:Números both asserted); tsc route clean; personal-read @768 (Faça o número dele + Clunk precisa de 10 petiscos + Alimente o Clunk) + @360 (qTwoWays wrap) + @1024 (14-total two-ways round). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.
⚠ **Flagged-not-acted (shared en source):** `needs`+`crunch` "N petiscos" never singularizes for N===1 ("1 petiscos") — a SHARED en design (plural unit noun across all locales; es botanas/fr croque-points/de Knusper none singularize); pt matches the sibling shape. NO en/engine/core change.


### #68 `fix-it-corner` — O cantinho de conserto do Fixit / o número que falta na conta (1.OA.D.8 → **1º ano · Números** [OA override]) — DONE, commit `44c36ebe` (push, NO deploy)
**Fixit**, a near-sighted repair-mole, fixes gadgets each showing an add/sub equation with ONE missing number in ANY position (missing sum/addend/first-addend/subtrahend/minuend + make-10 + balance); manipulatives ten-frame / number-line (count-on/back) / balance scale / fact-families. **GRADE = pt inherits '1' (1º ano) — NO GRADE_OVERRIDE · STRAND = Números [OVERRIDE MANDATORY] · anchor EF01MA06** (pedagogue-decisive, all 3 concur). STRAND line 221 `{ de:'Zahlen und Operationen' }`→`+pt:'Números'`. ⚠⚠ **OA→ÁLGEBRA TRAP handled** — strand-names.ts:51 maps OA.pt→"Álgebra" (DOMAIN ERROR); achar o número ausente da equação = cálculo por fato básico/fato inverso/complemento aditivo = sentido numérico = Números. ⭐ **Pedagogue decisively resolved the balance/equal-sign angle → STAYS Números:** EF01MA10 (1º Álgebra elemento-faltante) is about RECURSIVE SEQUENCES/padrões, NOT equation terms; there is NO 1º-ano Álgebra habilidade about igualdade/equivalência (that emerges 3º-4º+); so the balance is a REPRESENTAÇÃO of arithmetic equality solved by cálculo → Números. ⚠ do NOT bump to 2º on "completar" (EF02MA06 = contextualized problems; here it's the missing FATO BÁSICO, stays 1º). Anchor EF01MA06 (apoio EF01MA07 make-10 / EF01MA08 problemas). Mirrors clunks/chuffer/ten-stones/sharing-jar override. **Engine (LIGHT-MEDIUM):** activity-layer only, es = template. ⭐ **NO WORDS_PT** — `speak()` uses `type:'number'` → LCSAudio does number→word itself (just +pt→'pt-BR' on LCSAudio + fallback). Only `strings` +pt (28 keys, {a}/{b}/{c}/{x} numeral placeholders preserved) + fixitSVG aria +pt. Character **Fixit KEPT**; aria **"Fixit, a toupeira reparadora"** (⚠ toupeira is FEMININE → "a … reparadora", not "o … reparador"). Math phrasing: "quantos são no total?" / "e mais quantos dão {c}?" / "De {a}, tirando quantos sobram {b}?" / "começou com quantos?" / **"família de operações"** (NOT "família de fatos") / "o todo". Verificar; você-form. ⚠ es-leak guard clean (no topo/taupe/Maulwurf). slug `numero-que-falta-adicao-e-subtracao-1-ano`; html ?v=8→**?v=9**; wrapper 9.409→**9.410**. §A.13.62 GREEN pt **66/66** + en 66/66 (sweep × 11 rounds, no clip — long instruction/win strings held); verify-pt PASS 128→**129**; preflight PASS; parity all-pt (STRAND pt:Números + NO grade override both asserted); tsc route clean; personal-read @768 (make-10 "7 + ? = 10" + ten-frame) + @360 (missing-sum "6 e 7, quantos são no total?") + @1024 (missing-subtrahend "De 13, tirando quantos sobram 8?" + number-line + "← Pula"). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.
⚠ **Flagged-not-acted (shared template):** promptMissingSubtrahend "De {a}, tirando quantos sobram {b}?" → for {b}===1 reads "sobram 1" (should be "sobra 1") — a SHARED plural compromise (es "queden {b}" same); venial K-2, plural default is the right template call. NO engine change.


### #69 `twinsies` — Gêmeos: a mesma quantidade / o duende gêmeo (K.CC.B.5 → **1º ano · Números**) — DONE, commit `e2f7f12c` (push, NO deploy)
The **duende gêmeo** makes a pile of **bolotas** (acorns); the child counts it (tap each), then builds a "gêmeo" — the SAME number in a DIFFERENT arrangement (row/scattered/field/numeral). Count-invariance (a quantidade não muda com o arranjo), ≤12. **GRADE = pt='1' (1º ano) · STRAND = Números · anchor EF01MA03** (pedagogue-decisive). GRADE line 115 `{ de:'1' }`→`+pt:'1'`. ⭐ **Mirrors friendship-bridge** (same correspondência-um-a-um / "tem a mesma quantidade" skill — twinsies = the PRODUCE side ["dar tantos quanto"] vs friendship-bridge's JUDGE side; both 1º/EF01MA03). Diverges from fr=GS/es=preescolar (BR fronteira for the correspondence "mesma quantidade" falls a degree above maternelle/SEP). NOT Educação Infantil (systematic equicardinal-set construction by correspondence + count-invariance = 1º, not EI oral counting; count-out-vs-compare does NOT lower the grade — producing an equal set ≥ judging). ✅ **NO OA trap** — C&C→Números auto-map, NO pt STRAND_OVERRIDE (de/es added none; only fr has a fr-only maternelle-domain override at :162 — ignore for pt). **Engine (LIGHT):** activity-layer only, es = template. ⭐ **NO WORDS_PT** — `speak()` type:'number' → LCSAudio does number→word (just +pt→'pt-BR' both sites). `strings` +pt (14 keys, {n} preserved), spriteSVG aria "duende gêmeo", `_declare` spoken win (n+' e '+n+' — gêmeos!') + `_renderDone` eq (' — gêmeos!'). Character = **descriptive "o duende gêmeo"** (⚠ content-writer proposed a proper name "Bento"; LINGUIST authority overruled → keep descriptive, a proper name buries "gêmeo"; EN has no proper name; matches es/fr/de aria). Vocab: bolota(s), a mesma quantidade (NOT "o mesmo número"), Somos gêmeos!, ⚠ BR **gêmeo** (circumflex, not es gemelo/EU gémeo). slug `fazer-a-mesma-quantidade-duende-gemeo-1-ano`; html ?v=8→**?v=9**; wrapper 9.410→**9.411**.
⚠⚠ **LAYOUT-FIX LESSON (visual-qa FAIL → fixed, activity-layer CSS, improves ALL locales):** pt's title/prompt/hint are VERBOSE — "Gêmeos — a mesma quantidade!" + "Faça um gêmeo com a mesma quantidade!" each wrap to 2 LINES at 320px (en's "Twinsies" title is 1 line), and the 56-char countHint wrapped in the narrow `.tw-say` speech bubble → TEXT-CLIP (line-clamp:1) then, once widened, a CUT-OFF at 320×640 (the numeral stage stack ~26px over, driven by the 2-line title/prompt). **Fix (per §A.13.62 — fix the LAYOUT, never shorten to dodge/move a threshold):** (1) widened `.tw-say` narrow-block to `max-width:100%` + `line-clamp:2` so hints fit one line / wrap-not-clip; (2) reclaimed ~26px in the `@media(max-height:680px)` block — smaller numeral display (font 32→24), tighter gaps (root/main/side), smaller readout (tap targets stay ≥44, content ≥14px); (3) ALSO shortened 2 pt hints to en-length (countHint "Toque em cada bolota e conte.", numeralHint "Conte a mesma quantidade no prato.") so they hold 1 line at 320px. ⭐ **The driver was NOT the string length alone — it was pt's inherently VERBOSE 2-line title/prompt eating vertical budget that en (1-line title) has spare;** the reclaim fixes the LATENT es/de verbose-title cut-off too. EN re-verified 42/42 (shared CSS unregressed). §A.13.62 GREEN pt **42/42** + en 42/42; verify-pt PASS 129→**130**; preflight PASS; parity all-pt (GRADE pt:1 + NO strand override asserted); tsc route clean; personal-read @768 (count + 5 bolotas + CONTEI) + @360 (scattered count) + @1024 (numeral-build + "8" target + Somos gêmeos!). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.


### #70 `rivets-number-forge` — A forja de números do Rivet / contar e forjar o numeral 0-20 (K.CC.A.3 → **1º ano · Números**) — DONE, commit `8a47cf49` (push, NO deploy)
**Rivet** the raccoon (guaxinim) forges treasure into cards; the child COUNTS treasures (bolotas/botões/vaga-lumes/bolas de gude) + FORGES the matching numeral 0-20 (incl. zero). Modes: count / zero / parade / subset / verify / build-mint / reverse. **GRADE = pt='1' (1º ano) · STRAND = Números · anchor EF01MA01** (pedagogue-decisive, all 3 concur). GRADE line 116 `{ de:'1', fr:'1' }`→`+pt:'1'`. ⭐ **The THIRD FACE of K.CC.A.3** — count-and-represent (relacionar quantidade ↔ numeral escrito 0-20, incl. zero) — mirroring the locked **pips-round** (read 0-20 → pt 1º EF01MA01) + **digby** (write 0-9 → pt 1º EF01MA01). Zero and the 0-20 range don't push higher (numeral PRODUCED as a label of the count, NO valor-posicional decomposition). Converges de(Klasse1)/fr(CP), diverges es='K' native. ✅ **NO OA trap** — C&C→Números auto-map, NO pt STRAND_OVERRIDE. **Engine (HEAVY):** activity-layer only, es = template. `speak()` is type:'number' BUT fed `numWord(count)` (a WORD) at mint → **WORDS_PT IS needed** (BR 0-20: dezesseis/dezessete/dezenove/quatorze). ⭐ **KIND_PT gendered treasure map** (4 treasures × art/bare/pl/ct): bolota(fem)/botão(masc)/vaga-lume(masc)/bola de gude(fem); `pl` = DEFINITE-article plural ("as bolotas" for "Conte só {pl}"); `ct` = gendered counted (contada/contado). numWord +pt, speak pt-BR, `strings` +pt (27 keys), 5 KIND-driven aria/prompt branches, `_pullLever`/`_win` speak phrases. Character **Rivet KEPT** (aria locale-neutral "Rivet"; opaque-but-harmless). ticket = **"bilhete"** (linguist chose over "tíquete" — warmer for K-2). Treasures: bola de gude (not berlinde), vaga-lume (not pirilampo). slug `contar-e-forjar-o-numero-de-0-a-20-1-ano`; html ?v=6→**?v=7**; wrapper 9.411→**9.412**. §A.13.62 GREEN pt **54/54** + en 54/54 (sweep × 9 rounds, no clip); verify-pt PASS 130→**131**; preflight PASS; parity all-pt (WORDS_PT BR + KIND_PT 4× + 5 KIND branches + GRADE pt:1 + no strand override); tsc route clean; personal-read @768 (count 5 bolotas + Forjar!) + @360 (marbles count-forge) + @1024 (**subset "Conte só as bolotas!"** — validates KIND_PT.pl integration). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.


### #71 `mamas-roll-call` — A chamada da Mamãe Pata / contar a quantidade certa e escrever o número 0-9 (K.CC.B.5 → **1º ano · Números** [EF01MA04]) — DONE, commit `8121e60e` (push, NO deploy)
**Mamãe Pata** calls the roll; the child COUNTS OUT an exact number of **patinhos** (0-9) one-by-one from a raft (**a balsa**) + sends them, then SIGNS by WRITING/tracing the numeral 0-9 (core = numeral-trace-core.js, same as digby). Modes: count-out / distract (send N of a color) / running-total / count-brood + numeral-trace. **GRADE = pt='1' (1º ano) · STRAND = Números · ⭐ anchor EF01MA04** (pedagogue-decisive). GRADE line 117 `{ de:'1' }`→`+pt:'1'`. ⭐ **A HYBRID: count-out (twinsies=EF01MA03) + write-numeral (digby=EF01MA01) — and EF01MA04 is the SINGLE habilidade that binds BOTH** ("contar a quantidade... e apresentar o resultado por registros verbais e SIMBÓLICOS" = the count-out-THEN-write gesture). ≤9 fits "até 100"; zero valid. Both faces pt 1º → hybrid stays 1º. ✅ **NO OA trap** — C&C→Números auto-map, NO pt STRAND_OVERRIDE. Converges de(Klasse1), diverges fr(GS)/es(native-K). **Engine (MEDIUM-HEAVY):** activity-layer only, es = template. `speak()` type:'number' fed numWord at seal → **WORDS_PT (0-9)**. ⭐ **COLOR_PT gendered duckling-color map** (yellow/brown × adj[PLURAL]/sg[SINGULAR]; agrees masc "patinho"): amarelo/amarelos, marrom/marrons (⚠ NOT café/castanho). numWord +pt, speak pt-BR, `strings` +pt (24 keys), callKind render +pt (⚠ color adj AFTER noun: "Envie {n} patinhos {kind}!"), 3 aria +pt, `_seal` speak +pt. Character **Mamãe Pata KEPT**; balsa (raft, NOT jangada); vitória-régia (lily-pad); "deixe eles dormirem" (warm colloquial, deliberate over "deixe-os"). slug `chamada-dos-patinhos-conte-a-quantidade-certa-e-escreva-o-numero-1-ano`; html ?v=8→**?v=9**; wrapper 9.412→**9.413**. §A.13.62 GREEN pt **54/54** + en 54/54 (sweep × 9 rounds, no clip); verify-pt PASS 131→**132**; preflight PASS; parity all-pt (WORDS_PT + COLOR_PT + GRADE pt:1 + no strand override; ⚠ the strand-check false-fires on the pre-existing fr-only :160 override — verified DIRECTLY, pt has GRADE only); tsc route clean; personal-read @768 (send + "A Mamãe precisa de 6!" + 9 patinhos + Assine a chamada) + @360 (lily-pad callGroup "vitória-régia") + @1024 (running-total count-brood "Estão chegando mais…" + Chegam mais ▶). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.


### #72 `parking-tower` — O estacionamento do Beto / palavras de posição em cima-embaixo-ao-lado-entre (K.G.A.1 → **1º ano · Geometria** [EF01MA12]) — DONE, commit `bbc3d122` (push, NO deploy) ⭐ FIRST GEOMETRY
The child helps the beaver **Beto** park each vehicle in the bay matching a spoken POSITION WORD — **em cima / embaixo / ao lado / entre** — relative to a landmark vehicle (o ponto de referência). Side-on tower, floor-slab between levels; NO counting, NO numbers. Core `PlaceByRelationCore` UNTOUCHED. es(`ebe76b1a`)/fr(`99f6ea3c`)/de(`2d9ad02a`) arms already in the engine; pt ADDED alongside. **GRADE = pt='1' (1º ano) · STRAND = Geometria · ⭐ anchor EF01MA12** (pedagogue-decisive). Route line 118 `{ de:'1' }`→`{ de:'1', pt:'1' }` + comment.
⭐ **FIRST GEOMETRY in the pt fan** — strand shifts Números→**Geometria** and it AUTO-MAPS CLEANLY (`strand-names.ts:64` Geometry→Geometria, like C&C→Números) → **NO pt STRAND_OVERRIDE** (the route :165 override is fr-ONLY « Se repérer dans l'espace », escaping cycle-2 « Espace et géométrie »; BNCC has no such split — left :165 untouched). ✅ Geometry is NOT the OA trap. **Cheat-sheet CONFIRMED: Geometry.pt = "Geometria" auto-map, no override.**
⭐ **Grade fork (genuine): de=Klasse 1, fr=GS, es=Kínder** — pt CONVERGES with de(1º), DIVERGES from fr/es. **EF01MA12** = "descrever a localização... segundo um DADO PONTO DE REFERÊNCIA... como direita, esquerda, EM CIMA, EMBAIXO... é necessário explicitar-se o referente." This activity = position relative to a LANDMARK (referente) → EF01MA12 (nomeia "em cima/embaixo" + o referente; distinta de EF01MA11 = própria posição direita/esquerda/frente/atrás, body-referenced). A Educação Infantil trata noções espaciais só informalmente (campos de experiência) sem o construto do referente → BNCC formaliza em 1º; es/fr file basic spatial vocab no ano pré-primário, BNCC files the reference-point construct em 1º. (Pedagogue caveat baked into prose: "em relação a um (ou mais) pontos de referência" so *entre*, a two-referente term, isn't excluded.)
**Engine (GRAMMAR-HEAVY, activity-layer only):** ⭐ **Portuguese spatial preps ALL govern "de" → de+article contraction do/da**, so `ptFused = (art==='o'?'do ':'da ')+noun` takes **NO rel-branch** (SIMPLER than the es arm, where next-to→a→al). « entre » uses the plain `def` form. **VEHICLE_PT** (bare/def/art/noun): ônibus(o), **van(a — feminine)**, carro(o), caminhão(o), barco(o). **PREP_PT** {above:'em cima', below:'embaixo', 'next-to':'ao lado'}. pt arms on lmVal(→ptFused)/lmDef(→def)/moverVal(→def)/relVal(→PREP_PT); `strings` +pt (13 keys); speak pt→'pt-BR' (LCSAudio + fallback u.lang, 2 spots); brambleSVG aria "o castor Beto"; landmark caption VEHICLE_PT.bare; candidate aria (truck "um caminhão" / bay "uma vaga de estacionamento vazia"). NO WORDS/numbers (geometry). **Proven assemblies (sim + personal-read):** "Estacione o caminhão ao lado do ônibus." / "…em cima da van." / "…embaixo do carro." / "…entre o ônibus e a van." / "O Beto estacionou em cima do ônibus. Toque no caminhão dele." — all grammatical; en/de byte-identical (regression proven in sim).
**Linguist rulings:** van = fem "a van" (reject furgão/Kombi/perua); character **Beto** approved (rename Bramble; "o castor Beto" aria with article, NOT "Beto o castor"); promptTwoTruck **dropped "seus"** → "entre os dois caminhões" (ambiguous your/his + clashes with promptReverse "dele"); leak-clean (ônibus/caminhão/embaixo-closed, no autocarro/camião/em-baixo/«»). Content writer: "cheia de vidinha"→"cheia de movimento".
slug `palavras-de-posicao-em-cima-embaixo-ao-lado-entre-1-ano` (matches es/de sibling-slug shape = position-word tail; linguist offered short `palavras-de-posicao-1-ano` but SEO + sibling-parity favored long); html ?v=5→**?v=6**; wrapper 9.413→**9.414**. §A.13.62 GREEN pt **42/42** + en 42/42 + pt-rerun 42/42 (7 rounds × 6 viewports); verify-pt PASS 133; preflight PASS 204; tsc route clean (only pre-existing blog-test errors); assembled-prompt sim OK (do/da/entre grammatical, en/de byte-identical, no leak, no "seus", no unfilled placeholders); personal-read @768 (place "Estacione o caminhão ao lado do ônibus." + tower + Ônibus label + Beto + Verificar + CONCLUÍDAS) + @1024 (between "…entre o ônibus e a van." + Ônibus/Van labels) + @360 (reverse "O Beto estacionou em cima do ônibus. Toque no caminhão dele." + 3 trucks, 3-line prompt fits). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.


### #73 `clock-read` — O relógio de cuco da Corujita / ler as horas no relógio em ponto·e quinze·e meia (1.MD.B.3 → **2º ano · Grandezas e medidas** [EF02MA19]) — DONE, commit `52ec6b47` (push, NO deploy)
The child READS/SETS an analog clock (4 modes: read / set-by-radial-drag / order-3-clocks / world-cue) to tell time at **em ponto / e quinze / e meia / quinze para** and match each to a moment of the owl **Corujita's** day. Core `ClockReadCore` UNTOUCHED. es(`4553a7ac`)/fr(`7e1a686d`)/de(`1f7ee64a`) time-idiom arms already in the engine; pt ADDED alongside. **GRADE = pt='2' (2º ano) · STRAND = Grandezas e medidas · anchor EF02MA19** (pedagogue-decisive). Route line 120 `{ es:'2' }`→`{ es:'2', pt:'2' }` + comment.
⭐ **Grade was PRE-ESTABLISHED by the sibling ladder** — the route clock-ampm(#65) comment already documents **"Escada de irmãos: clock-ampm (1º) < clock-read (2º) < clock-elapsed (3º)"** and names EF02MA19 for clock-read; es operator-ruled 2.º. Pedagogue CONFIRMED **EF02MA19** over EF03MA23: reads only the **4 canonical face POSITIONS** (12/3/6/9), NO arbitrary minutes / minute↔second relation → below EF03MA23's (3º) threshold; EF02MA18 rejected (calendário/datas). Manifest native '1' (de/fr keep); pt+es override '2'. Clean 3-rung ladder EF01MA17→EF02MA19→EF03MA22/23.
⭐ **STRAND — Grandezas e medidas via AUTO-MAP** (strand-names.ts:79 Measurement & Data→"Grandezas e medidas"; tempo=medida) → **NO pt STRAND_OVERRIDE**. Cheat-sheet: **M&D/TEMPO auto-maps to Grandezas e medidas — no override** (confirmed here + #62 clock-elapsed + #65 clock-ampm).
**Engine (activity-layer only):** ⭐ **HRS_PT is the FEMININE hour-word array** `['','uma','duas','três',...]` — a digit would make pt-BR TTS say "dois horas" (must be "duas horas"). **Idiom MATCHES the established clock-elapsed (#62)**: :00 "uma hora"/"duas horas"; :15 "e quinze" (BR, NOT "e um quarto"); :30 "e meia"; :45 "quinze para as {próxima}" / "quinze para a uma" (12→1 wrap via naechsteStunde). EVENT_PT(7) + CUE_PT(2). pt arm on wordFor/setWordFor/eventLabel/cueLabel; `strings` +pt (11 keys); 3 aria +pt (mostrador do relógio / ponteiro das horas / dos minutos / Relógio N); speak pt→'pt-BR' (LCSAudio + fallback). NO numbers-as-content beyond the clock. **Character RENAME Owl→"Corujita"** (linguist; affectionate coruja diminutive). Events BR-differentiated: Café da manhã / Lanche da manhã / Almoço / Hora do jardim / **Lanche da tarde** (snack, distinct from morning-tea via manhã/tarde) / Jantar / Hora de dormir. "Cucu!" (call) vs "cuco" (clock) — both correct, do NOT reconcile. setPrompt "Acerte o relógio: {time}." (BR "acertar o relógio"). **Proven (sim + personal-read):** feminine "sete/três/doze/seis horas", "três e quinze", "quinze para as três"/"quinze para a uma"; en/de byte-identical (wordForDE unchanged "halb 9"/"ein Uhr").
slug `ler-as-horas-no-relogio-em-ponto-e-meia-e-quinze-2-ano`; html ?v=9→**?v=10**; wrapper 9.414→**9.415**. §A.13.62 GREEN pt **84/84** + en 84/84 + pt-rerun 84/84 (14 rounds × 6 viewports; all 4 modes); verify-pt PASS 134; preflight PASS 204; tsc route clean; time-idiom sim OK (h×{0,15,30,45} all grammatical, feminine, 12→1 wrap; de byte-identical); parity all-pt (⚠ the "dois horas" leak-check FALSE-fired on my own CODE COMMENT warning about the trap — verified DIRECTLY, no real error; "os dois ponteiros" is correct masc). personal-read @768 (READ round "sete/três/doze horas" cards + Corujita) + @1024 (READ "Lanche da manhã / seis horas") + @360 (ORDER "Qual relógio mostra Almoço?" 3 clocks) + @768 (READ "Lanche da tarde / três e quinze" — the :15 quarter form renders). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.


### #74 `tempo-day-plan` — O dia da Tempo / conectores temporais antes-durante-depois (L.1.1.i → **1º ano · Análise linguística/semiótica**) — DONE, commit `d6b63017` (push, NO deploy) ⭐ FIRST LÍNGUA PORTUGUESA
⭐ **FIRST grammar/literacy (Língua Portuguesa) activity in the pt fan** (all prior were mathematics). The turtle **Tempo** plans the day; the child reads a sentence with a blank + taps the temporal preposition (**antes / durante / depois**) that fits. Engine renders `before + [card] + after`; the manifest carries per-locale sentences in `roundsL10n[LANG]` (each round {id, band, before, after, correct}, correct∈FORMS_LANG). Core `TimePrepositionCore` UNTOUCHED. es(`7235852c`)/fr(`fe46c22d`)/de(`62ea4982`) arms already in engine; pt ADDED alongside.
⭐ **THE GRAMMAR TRAP (pt ≠ es/de):** Portuguese CONTRACTS de+a=da / de+o=do, so the es model (bare "antes de" card + feminine "la <fem>", because Spanish "de la" doesn't contract) BREAKS in pt — a bare "antes de" + "a caminhada" = the ungrammatical "antes de a caminhada". **Fix = bake the prep+article CONTRACTION into the cards** → **FORMS_PT = ['antes da', 'durante a', 'depois da']** + keep every roundsL10n.pt after-noun BARE FEMININE (no article). Then all three cards render grammatically with any feminine head noun (antes da/durante a/depois da caminhada). FORMS_PT is GLOBAL → all 8 rounds' after-nouns MUST be feminine (a caminhada/apresentação/aula de ginástica/viagem/música/festa/refeição/volta). correct∈FORMS_PT verbatim; distribution antes da×3/durante a×3/depois da×2 (mirrors es). tdpGrade pt arm compares FORMS_PT[id]===round.correct.
⭐ **GRADE + STRAND — NO route override** (pedagogue-confirmed). NO GRADE_OVERRIDE row exists for tempo-day-plan; native manifest grade '1' inherited by ALL (es=1.º/fr=CP/de=Klasse 1) → pt "1º ano". Strand 'Language' AUTO-MAPS to pt eixo **"Análise linguística/semiótica"** (strand-names.ts:176, BNCC LP) → NO STRAND_OVERRIDE. Pedagogue: honest at 1º (sequenciação/ordenação temporal; concrete daily routine markers; single-sentence tap-a-card). ⭐ **CCSS L.1.1.i STAYS the machine anchor** — no clean 1º BNCC LP "conectivos temporais" habilidade exists (explicit connective study = EF04/EF05; best-fit EF01LP26 is a Leitura narrative code = mild stretch), so the code slot keeps CCSS by design; pt copy names "BNCC" + eixo only (no LP code). **So the ONLY route change is the wrapper bump.**
**Engine (activity-layer only):** FORMS_PT; tdpGrade pt arm; setupTask pt choices; turtleSVG aria "Tempo, a tartaruga"; speak pt→'pt-BR' (LCSAudio + fallback); `strings` +pt (7 keys). **Character "Tempo" KEPT** (= "tempo"/time in pt — perfect); ⚠ **FEMININE referent "a Tempo"** (via a tartaruga → title "O dia da Tempo"; masc "o Tempo" = the weather → avoid). ⚠ **tempoIntro SHORTENED** to "Antes, durante ou depois? Tudo tem a sua hora!" — the verbose original "Umas coisas vêm antes, outras durante e outras depois!" 3-lined the 2-line `.tdp-say` speech bubble (line-clamp:2) at 360, TEXT-CLIP → fixed the STRING to en-length (§A.13.62: fix content, never move a threshold). slug `conectores-temporais-antes-durante-depois-1-ano`; html ?v=4→**?v=5**; wrapper 9.415→**9.416**.
§A.13.62 GREEN pt **48/48** + en 48/48 + pt-rerun 48/48 (8 rounds × 6 viewports; after the tempoIntro fix); verify-pt PASS 135; preflight PASS 204; tsc route clean; grammar sim OK (all 8 rounds × 3 cards grammatical, no "de a"/"de o"/double-article, tdpGrade correct-true/decoys-false; en/de byte-identical); parity all-pt (leak-clean, no antes-de/vor/avant). personal-read @768 ("O dia da Tempo" + bubble + "Nós nos alongamos ___ caminhada." + cards antes da/durante a/depois da) + @360 ("Nós descansamos ___ aula de ginástica." wraps + cards wrap 2 rows). 0 core/shell/direction; git diff = exactly 5 files. ⚠ the manifest JSON.stringify reserialize reformatted the whole file (345-line diff) — data intact/valid, but for future manifest edits with compact round objects prefer text-level replacement (SoT hazard). NO deploy.


### #75 `booker-glossary-desk` — O dicionário do Booker / ordem alfabética + palavras-guia (L.2.4.e → **3º ano · Análise linguística/semiótica**) — DONE, commit `0fcf22b3` (push, NO deploy)
Dictionary guide-words: two guide words (g1/g2); the child taps the word alphabetically BETWEEN them. 3 bands (1st/2nd/3rd-letter discrimination). Core `GlossaryGuideCore` UNTOUCHED — a **pure DATA port** (core grades by naive compare; each locale supplies its word-set in `roundsL10n[LANG]`). es(`d9b2cdb8`)/fr(`78ebc1df`)/de(`5b0ab749`) arms already in engine; pt ADDED alongside.
⭐ **THE ACCENT TRAP:** core `inRange` = `lc(g1) <= lc(w) <= lc(g2)` — a NAIVE lowercase Unicode-codepoint compare. Portuguese accents (á/ã/ç/é…) sort AFTER 'z' → a word with an accent in a discriminating position grades WRONG. **Fix = EVERY word (g1/g2 + all 3 choices) ACCENT-FREE plain a-z** (de used the same "umlaut/ß-free" trick). **9 roundsL10n.pt rounds, 45 words, all accent-free + distinct + real BR nouns.** ⭐ **VERIFIED against the REAL core** (`sim-booker.js`): every round exactly ONE in-range word (dedo/muro/luva/pena/milho/bico/papa/cofre/capa), facts()=all-true, grade correct/decoys-false; band distribution 3/3/3; en/de byte-identical. ⚠ coco=coconut (accent-free; NOT cocô/poop which is accented).
⭐ **GRADE = pt:'3' (3º ano)** — pedagogue-decisive; abecedário + ordem-alfabética-por-1ª-letra = 1º/2º, mas uso sistemático do dicionário + palavras-guia + comparação da 2ª/3ª letra = competência de 3º (entrada, não consolidação → não 4º). Converge com es(3.º)/fr(CE2)/de(Klasse 3); native manifest '2'. Route line 66 `{de:'3',fr:'3',es:'3'}`→`+pt:'3'`.
⭐ **STRAND = Análise linguística/semiótica — NO pt STRAND_OVERRIDE** (fr model, NOT es/de). Route line 188 has de "Richtig schreiben" + es "Ortografía y puntuación" (their curricula break out orthography as a technique-strand); **fr did NOT override** and neither does pt: **BNCC LP has 4 eixos and NO standalone Ortografia eixo** — ortografia/ordem-alfabética/uso-do-dicionário all live INSIDE "Análise linguística/semiótica" (the Language auto-map). Left line 188 untouched. CCSS L.2.4.e stays machine anchor; best-fit ≈ EF03LP (digits unverified).
**Engine (activity-layer only):** pt on 7 strings; bear aria "Booker, o urso"; speak pt→'pt-BR' (LCSAudio + fallback); g1→g2 connector pt ' a '. Character **"Booker" KEPT** (es/fr/de all keep it). ⚠ **bookerIntro SHORTENED** to "Use as palavras-guia! Qual palavra fica entre elas?" (en-length) — the ensemble draft 3-lined the 2-line `.bgd-say` bubble (line-clamp:2) at 360/412 → fixed the STRING (§A.13.62, #74 precedent). slug `ordem-alfabetica-palavras-guia-dicionario-3-ano`; html ?v=4→**?v=5**; wrapper 9.416→**9.417**.
§A.13.62 GREEN pt **54/54** + en 54/54 + pt-rerun 54/54 (9 rounds × 6 viewports); verify-pt PASS 136; preflight PASS 204; tsc route clean; ⭐ word-set sim OK (real core, 9/9); parity leak-clean. personal-read @768 (band-3 cama•••cara → casa/capa/cabo, correct capa) + @360 (band-2 pato•••pipa → pulo/pena/pasta, correct pena). 0 core/shell/direction; git diff = exactly 5 files. ⚠ manifest JSON.stringify reserialize reformatted the file again (noisy 561-line diff) — data intact/verified; for future manifest edits with compact round objects prefer text-level replacement. NO deploy.


### #76 `fern-clue-garden` — O jardim de pistas da Fern / palavras com vários sentidos pelo contexto (L.2.4.a → **2º ano · Ampliação do vocabulário**) — DONE, commit `810d0a7e` (push, NO deploy)
Context clues / MULTIPLE-MEANING WORDS: the fawn **Fern** shows a sentence with ONE highlighted homônimo; the child taps the meaning the context points to. Core `ContextClueCore` UNTOUCHED — a **pure DATA port** (core grades by `choices[id].kind === 'correct'`; each locale supplies its word-set in `roundsL10n[LANG]`). es(`0748c2aa`)/fr(`94bd2d7f`)/de(`4fd28a64`) arms already in engine; pt ADDED alongside. Round shape {id, band(int), word, sentence, choices:[{text,kind}]}, kind ∈ correct/no-context/off. ✅ NO accent trap (grades by kind, not alphabetical).
**9 roundsL10n.pt BR homônimos** (3 bands): manga (fruta/manga-de-roupa), folha (árvore/papel), pata (animal/móvel), banco (assento/dinheiro), chave (porta/ferramenta), carta (correio/baralho), bico (ave/chupeta), letra (música/alfabeto), pena (pluma/dó). Each: correct (context sense) + no-context (the word's OTHER real meaning, tempting foil) + off (a DIFFERENT word's meaning). ⚠ **the `word` MUST appear VERBATIM in the `sentence`** (engine highlights via whole-word case-insensitive \b…\b regex). ⭐ **VERIFIED against the REAL core** (`sim-fern.js`): exactly-one-correct, grade correct/foils-false, verbatim-word, kinds set, 3/3/3 bands; en/de byte-identical.
⭐⭐ **SAFETY CATCH (linguist):** the fawn's BR noun is **"cervo" — NEVER "veado/veadinho"** (a homophobic slur in Brazil, unusable in a children's product). aria "Fern, o cervo". (⚠ standing rule for any future deer/fawn character.)
⭐ **GRADE = 2º ano — NO override** (pedagogue; native '2'; harmoniza es 2.º/fr CE1/de Klasse 2; BNCC doesn't defer the encounter with multiple-meaning words). ⭐ **STRAND override → "Ampliação do vocabulário"** — this is LEXICAL work (significação/polissemia), NOT grammatical → same framing as de/es/fr + pt #22 precedent; without the override the auto-map falls to "Análise linguística/semiótica" (broad grammar eixo), erasing the vocab/grammar split. Route line 187 `{de:...,fr:...,es:...}`→`+pt:'Ampliação do vocabulário'`. BNCC próxima EF04LP03 (4º, forward-anchor stretch — no clean 2º code, don't invent §20.8); CCSS L.2.4.a stays machine anchor.
**Engine (activity-layer only):** pt on 7 strings (theAsk keeps `{word}`); fawn aria "Fern, o cervo"; 🔊 aria "ouvir a frase"; speak pt→'pt-BR'. Character **"Fern" KEPT**. slug `palavras-com-varios-sentidos-pelo-contexto-2-ano`; html ?v=4→**?v=5**; wrapper 9.417→**9.418**.
§A.13.62 GREEN pt **54/54** + en 54/54 + pt-rerun 54/54 (9 rounds × 6 viewports; the long meaning-cards wrap cleanly, no clip — no string-shorten needed this time); verify-pt PASS 137; preflight PASS 204; tsc route clean; ⭐ content sim OK (real core, 9/9); parity leak-clean (no veado/es/de). personal-read @768 (manga → "a fruta amarela…" correct) + @360 (letra → "as palavras que a gente canta numa música" correct, the subtle band-3 round where the LESS-obvious sense is right, context "da música" is the pista). 0 core/shell/direction; git diff = exactly 5 files. ⚠ manifest JSON.stringify reserialize reformatted the file (noisy 966-line diff) — data intact/verified; prefer text-level edits for compact round objects. NO deploy.


### #77 `jasper-just-right` — A mochila do Jasper / para que serve cada objeto (L.1.5.c → **1º ano · Ampliação do vocabulário**) — DONE, commit `a803d908` (push, NO deploy)
Real-life word use: the jay **Jasper** shows a SITUATION + 3 **PICTURES**; the child taps the picture of the object they'd use. Core `RealLifeUseCore` UNTOUCHED — grades by `choices[id].noun === correctNoun` (locale-neutral). ⭐ **IMAGE-based**: `choices:[{noun, themeDir, label}]` — noun/themeDir = the **image-library keys** (English, language-neutral, `/image-library-webp/themes/<themeDir>/<noun>@2x.webp`), label = localized word; the render already reads `choices[id].label`. es(`8cbea2eb`)/fr(`8460d7d1`)/de(`915fdb1e`) arms already in engine; pt ADDED alongside. ✅ NO accent trap (grades by noun-match).
⭐ **STRATEGY — reuse es image keys BYTE-FOR-BYTE.** pt reuses the es {noun, themeDir, correctNoun} keys verbatim (all 14 keys VERIFIED to exist on disk) + translates the `situation` → pt + sets each choice `label` = the BR word. Guarantees valid images (es shipped them); the linguist writes only situations + labels. 8 rounds (drink/rain/feet/write/eat/hot/cut/sleep). ⭐ VERIFIED against the REAL core (`sim-jasper.js`): exactly-one-correct, grade correct/foils-false, every choice has a pt label, every image key resolves; en/de byte-identical.
⚠ **BR label traps (linguist):** glass="**o copo**" (drinking glass, NOT "vaso"=pot/toilet); cup="**a xícara**" (teacup — a DIFFERENT object; both appear); sock="**a meia**" (not calcetín); mitten="a luva"; crayon="**o giz de cera**"; umbrella="**o guarda-chuva**" (not chapéu-de-chuva).
⭐ **GRADE = 1º ano — NO override** (pedagogue; native '1'; harmoniza es 1.º/fr CP/de Klasse 1; concrete word→object association is 1º-appropriate). ⭐ **STRAND override → "Ampliação do vocabulário"** (LEXICAL work, not grammar → same framing as de/es/fr + pt #22/#76; without it auto-maps to "Análise linguística/semiótica"). Route line 186 `{de,fr,es}`→`+pt:'Ampliação do vocabulário'`. BNCC anchor at eixo/objeto level only (a precise 1º numeric habilidade = stretch; vocab-expansion object formalized EF03LP+; don't invent §20.8); CCSS L.1.5.c stays machine anchor.
**Engine (activity-layer only):** pt on 7 strings; jay aria "Jasper, o gaio"; speak pt→'pt-BR' (LCSAudio + fallback). Character **"Jasper" KEPT**. slug `para-que-serve-cada-objeto-vocabulario-1-ano`; html ?v=4→**?v=5**; wrapper 9.418→**9.419**.
§A.13.62 GREEN pt **48/48** + en 48/48 + pt-rerun 48/48 (8 rounds × 6 viewports); verify-pt PASS 138; preflight PASS 204; tsc route clean; ⭐ content sim OK (real core, 8/8 + image keys on disk); parity leak-clean (no vaso/calcetín/paraguas/«»). personal-read @768 (drink → apple/scissors/**glass** images RENDER + "a maçã/a tesoura/**o copo**") + @360 (sleep → bed/umbrella/crayon images + "a cama/**o guarda-chuva**/**o giz de cera**"). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.


### #78 `atlas-fact-files` — As fichas do Atlas / textos curtos com perguntas (RI.K.1 → **1º ano · Compreensão de textos informativos**) — DONE, commit `393ea98c` (push, NO deploy) ⭐ OPENS THE READING STRAND
⭐ **FIRST RI/RL reading activity in the pt fan** (all prior = L.* grammar/vocab + math). The armadillo **Atlas** shows a 2-sentence informative text; the child READS it and taps the answer to a key-detail W-question. Core `FactDetailCore` UNTOUCHED — grades `options[id]===round.answer`. es(`ca2862e9`)/fr(`4d0dfb85`)/de(`88a96009`) arms already in engine; pt ADDED alongside. Round {id, band, fact, question, answer, options:[3]}. ✅ NO accent trap.
⭐ **THE HARD CONSTRAINT:** the gate `facts()` checks **oneMatch** (answer===exactly one option) AND **answerInFact** (`norm(fact).indexOf(norm(answer))>=0` — answer is a VERBATIM substring of the 2-sentence fact). So per round: answer === one option byte-for-byte AND appears verbatim in the fact. 8 BR rounds (bees/frog/sun/penguin/spider/tree/cow/rain). ⭐ VERIFIED against the REAL core (`sim-atlas.js`): oneMatch + answerInFact + distinct all true, grade correct/foils-false, 8/8; en/de byte-identical. BR vocab: colmeia/mosquinhas/capim/**leite fresco**(not leche)/**o chão**(not suelo).
⭐ **GRADE = pt:'1' (1º ano) — grade override** (native RI.K.1='K'; de/es/fr all bumped to 1). Pedagogue-decisive **lee-vs-escucha cut**: Educação Infantil = leitura NÃO convencional (adulto lê); here the child DECODIFICA 2 frases + 3 alternativas escritas SOZINHA = leitura convencional → 1º EF. Route line 64 `{de:'1',fr:'1',es:'1'}`→`+pt:'1'`.
⭐⭐ **STRAND = route STRAND_OVERRIDE "Compreensão de textos informativos" — NOT strand-names.ts.** The strand-names.ts 'Reading: Informational Text' entry is en+de ONLY; es/fr use per-activity route overrides (line 146) because **the eixo shown reflects the MODALITY of text access (READ vs HEARD), a property of the ACTIVITY not the strand**. Atlas is READ (child decodes) → "Compreensão de textos informativos" (do NOT use the raw eixo "Leitura/escuta" — it fuses leitura+escuta, the very split the override makes; no collision with the phonics/RF chip). Route line 146 `+pt:'Compreensão de textos informativos'`. **NO strand-names.ts touch (stays 5 files).** ⭐ **FORWARD RULE for the ~6 future pt RI/RL: READ→"Compreensão de textos informativos" (RL literary→"…de textos literários") / HEARD (read-aloud)→"Escuta e compreensão de textos".** BNCC EF12LP03 (localizar informações explícitas — direct fit); CCSS RI.K.1 stays machine anchor.
**Engine (activity-layer only):** pt on 7 strings; armadillo aria "Atlas, o tatu"; "hear the text" aria "ouvir o texto"; speak pt→'pt-BR'. Character **"Atlas" KEPT** (o tatu). ⚠ dropped the 📁 the linguist put on the title (siblings have NO title emoji; 📁 stays only in win). slug `textos-curtos-com-perguntas-compreensao-leitora-1-ano`; html ?v=4→**?v=5**; wrapper 9.419→**9.420**.
§A.13.62 GREEN pt **48/48** + en 48/48 + pt-rerun 48/48 (8 rounds × 6 viewports); verify-pt PASS 139; preflight PASS 204; tsc route clean; ⭐ content sim OK (real core, 8/8); parity leak-clean. personal-read @768 (spider "A aranha tece uma teia. Ela tem oito patas." → dez/seis/**oito patas**) + @360 (bees "As abelhas vivem numa colmeia..." → **numa colmeia**/numa toca/num lago, armadillo renders, options wrap). 0 core/shell/direction; git diff = exactly 5 files (0 strand-names.ts). NO deploy.


### #79 `gabby-sayings` — As expressões da Gabby / sentido literal vs figurado (L.3.5.a → **3º ano · Ampliação do vocabulário**) — DONE, commit `4b6e5e48` (push, NO deploy) ⭐ FLAGSHIP REBUILD-NOT-TRANSLATE
⭐ **THE FLAGSHIP "rebuild, NOT translate":** idioms are language-specific → **8 GENUINE BR expressões idiomáticas**, not translations. The goose **Gabby** shows a sentence with an idiom; the child taps what it REALLY means (figurative) vs the literal trap. Core `IdiomMeaningCore` UNTOUCHED — grades `choices[id].kind==='correct'`. es(`cdf029ce`)/fr(`5a2ee07c`)/de(`0d3fe06a`) arms already in engine; pt ADDED alongside. Round {id, band, idiom, sentence, choices:[{text, kind: correct/literal/off}]}. ✅ NO accent trap.
**8 BR idioms:** ficar com água na boca / falar pelos cotovelos / pisar na bola / pagar mico / custar os olhos da cara / estar no mundo da lua / engolir sapo / quebrar o galho. correct=figurative meaning / literal=the trap (echoes the idiom's words) / off=unrelated.
⭐⭐ **THE ANTI-CUE INVARIANT** (the core's `deckFacts()` measures it): the **LITERAL must own the idiom-word overlap; the CORRECT figurative meaning must use FRESH words** (low overlap) and NOT be uniformly the longest/shortest. `deckFacts`: overlapBot (correct owns max idiom-word overlap), longestBot/shortestBot (correct always longest/shortest), positionBot (stored correct-position). ⚠ **FIRST-PASS FIX:** the initial set had **longestBot 0.75** (the correct figurative is naturally the FULLEST paraphrase → uniquely longest 6/8) + **positionBot 1** (I stored correct at index 0 every round). Rebalanced by LENGTHENING the OFF option in 4 rounds (off is unrelated → free to lengthen without touching the anti-cue) + varying stored correct-position 3/3/2 → overlapBot=0, longestBot=0.25, shortestBot=0.125, positionBot=0.375 all LOW. ⭐ **Fixed the CONTENT, never a threshold.** VERIFIED against the real core (`sim-gabby.js`); en/de byte-identical. **LESSON for future idiom/kind-based activities: the correct-figurative-paraphrase tends to be the longest → check deckFacts.longestBot + vary stored positions.**
⭐ **GRADE = 3º ano — NO override** (native '3'; de=Klasse 3/es=3.º/fr=CE2). ⭐ **STRAND override → "Ampliação do vocabulário"** — an expressão idiomática is a **unidade lexical fixa** (recuperação de sentido de frase feita = lexical), same as de/es/fr + pt #76/#77. ⚠ Pedagogue REJECTED **"linguagem figurada/efeitos de sentido"** (BNCC files figuras de linguagem ONLY 6º-9º: EF67LP38/EF69LP54 → displaying it would FALSELY SIGNAL a higher grade) AND Literatura (not literary appreciation). Route line 189 `{de,fr,es}`→`+pt:'Ampliação do vocabulário'`. Best-fit EF35LP05 (3º-5º, inferir sentido de expressões pelo contexto — flagged stretch: objeto é Estratégia de leitura, idioms são convencionalizadas); CCSS L.3.5.a stays machine anchor.
**Engine (activity-layer only):** pt on 7 strings; goose aria "Gabby, a gansa"; "hear the saying" aria "ouvir a expressão"; speak pt→'pt-BR'. Character **"Gabby" KEPT** (a gansa). slug `sentido-literal-e-figurado-expressoes-idiomaticas-3-ano`; html ?v=4→**?v=5**; wrapper 9.420→**9.421**.
§A.13.62 GREEN pt **48/48** + en 48/48 + pt-rerun 48/48 (8 rounds × 6 viewports; lengthened option-cards wrap clean, no shorten needed); verify-pt PASS 140; preflight PASS 204; tsc route clean; ⭐ content sim OK (real core, 8/8 facts + anti-cue deckFacts all low); parity leak-clean. personal-read @768 (custar os olhos da cara → "Era caríssimo…" correct / "um olho e um pedaço da cara" literal) + @360 (engolir sapo → "aguentou uma chateação…" correct / "colocou um sapo na boca" literal). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.


### #80 `field-guide` — Partes do livro: localizar informação / usar as partes do livro (sumário/glossário/legenda/título/menu) para achar um fato (1.RI.5 → **2º ano · Práticas de estudo e pesquisa**) — DONE, commit `a3999345` (push, NO deploy)
⭐ **2nd READING activity (RI); a DISTINCT facet from #78 atlas — LOCATE, not comprehend.** Detetive **Dewey** shows a page of an imaginary guia de campo of MADE-UP creatures (Frell/Snoud/Tarn…); the child reads a text feature (legenda / glossário / sumário / título / menu / which-tool) and taps the entry matching an asked FUNCTION. ⭐ creatures are fictional → world-knowledge can't help, the child MUST read the feature. Core `FieldGuideCore` UNTOUCHED (0 lines) — grades locale-neutral: correct = item whose `functions[]` ⊇ question `functionPhrase`; answer-verb sits in the GLOSS, ABSENT from the LABEL (nonsense name / chapter title / tool name) = gate-can't-cheat. de(`3da40def`)/es(`2a1b2dcc`)/fr(`c09b92ef`) arms already in engine; pt ADDED alongside.
**12 pt rounds** (mirror es shape exactly: diagram×3/glossary×2/toc×2/heading×2/menu×1/which-feature×2; ids r1-r10,r12,r13 — es dropped the index cog; en=14/de=13 keep it). Creature names REUSED (language-neutral nonsense). Verb lexicon (identical in functions & functionPhrase): nadar/brilhar/cavar(←escarbar)/flutuar(←flotar)/picar/trepar/saltar/se esconder/ menu virar a página·procurar(←buscar)·ler em voz alta. TOC/heading gloss CONJUGATED ("como brilha") / functions INFINITIVE. which-feature functions stay abstract EN keys [topic]/[meaning]/[picture]; labels/glosses BR (Sumário/Glossário/Legenda). ⭐ **{fn} = BARE pt INFINITIVE** — every q-template framed so a bare infinitive lands ("ajuda ele a {fn}"/"serve para {fn}"/"consegue {fn}"), no de-style nominalization; reflexive "se esconder" clean after "consegue".
⭐ **GRADE = 2º ano — ADD `pt:'2'` (route line 62)** (harmoniza de Klasse 2/es 2.º/fr CE2; operar o aparato de busca presupõe leitura automatizada a serviço de uma tarefa; dentro da Fase 3 1º-2º). ⭐ **STRAND = route override → "Práticas de estudo e pesquisa"** (line 145) — BNCC **campo de atuação** (a LOCATE/pesquisa field; the BR parallel of es "Búsqueda y manejo de información"/de media-Bereich). ⚠ Honors the **2-gate LOCATE rule** (es line-145 comment): Gate 1 COMPREHEND-vs-LOCATE → field-guide = LOCATE → search/navigation label (regardless of read/heard); NOT "Compreensão de textos informativos" (#78 atlas = compreender) NEM "Estratégia de leitura" (amplo demais). Best-fit BNCC **EF15LP03** (localizar informações explícitas, 1º-5º; stretch — text-organizer habilidades só no 4º-5º EF04LP20/EF05LP22). CCSS 1.RI.5 = machine anchor §20.10.
**Engine (activity-layer only):** `L` +pt (7 keys: readLine/diagramLine/whichLine/reread/found/wordsToKnow/contents=«Sumário» [ABNT — Índice=back-of-book index]); `strings` +pt (10 keys incl 6 {fn}-templates + 2 fixed which). NO speak/aria/image map (creature SVG aria-hidden; "Dewey" only in title). title «O guia de campo do detetive Dewey» (guia de campo = BR field-guide genre, NOT caderno=notebook). slug `partes-do-livro-localizar-informacao-2-ano`; html ?v=9→**?v=10**; wrapper 9.421→**9.422**.
§A.13.62 GREEN pt **72/72** + en 84/84 + pt-rerun 72/72 (12 rounds × 6 viewports); ⭐ content-sim vs the REAL core: pt all rounds one-match + answer-verb-absent-from-label + correctNotIndex0 + 3-distinct; en/de/es roundsL10n + base params.rounds byte-identical (regression clean). verify-pt PASS 141; preflight PASS 204; tsc route clean; es-leak (escarbar/flotar/buscar/"pie de imagen"/"sirve para") = 0. personal-read @768 (toc "brilhar" → Sumário + 3 capítulos) + @1024 (which-feature "meaning" → Glossário/Legenda/Sumário) + @360 (diagram "brilhar" → caption box + Frell/Tarn/Snoud). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.


### #81 `bea-two-bookshelves` — História ou livro de verdade / classificar o gênero (história vs livro de verdade) pela capa (RL.1.5 → **1º ano · Gêneros textuais**) — DONE, commit `297bde84` (push, NO deploy)
⭐ **3rd READING facet — GENRE/TEXT-TYPE CLASSIFICATION** (neither comprehend #78 nor locate #80). The bookworm **Bea** asks the child to find "the STORY book" or "the FACT book" among 3 covers (title + one-line blurb, NO type shown); the child recognizes a story by fantasy cues (era uma vez / bicho que fala) and a fact book by real-world cues (Tudo sobre… / de verdade) FROM THE COVER. Core `StoryFactCore` UNTOUCHED (0 lines) — grades `book.type === round.ask`; exactly ONE book type===ask per round; ask-flip 4/4. de(`b7e8ec97`)/es(`34933074`)/fr(`ffdb9a2c`) arms already in engine; pt ADDED alongside.
**8 pt rounds** (mirror es shape: bands 1/1/2/2/1/2/3/3; ask story×4/fact×4). BR-native book pool (10 books, 5 story + 5 fact, reused): STORY = Os dois dragões dorminhocos / Zeca, o saci, e a meia perdida / Lito, o barquinho valente / Téo e seu chapéu / A cutia que sonha em voar; FACT = Os ossos do seu corpo / Como funcionam as máquinas grandes / Tudo sobre os insetos / Como as árvores crescem? / Como as abelhas fazem mel?. ⭐ **Rebuild-not-translate** — BR folklore (saci-pererê), BR fauna (cutia), BR objects (guindaste/trator); every STORY cover = fantasy marker (era uma vez / talking animal-or-object / impossible wish), every FACT cover = real-world signal (Tudo sobre / Como…? / de verdade / real attributes).
⭐ **GRADE = 1º ano — NO override** (native RL.1.5 G1; de Klasse 1/es 1.º/fr CP; no GRADE_OVERRIDE row for bea). ⭐ **STRAND = route override → "Gêneros textuais"** (line 147). ⚠ THE KEY RULING: extends the reading-strand rule to a **3-GATE model** (es line-147 comment) — **Gate 0: is the learning object the TEXT ITSELF (what type/genre) or its CONTENT?** → TEXT ITSELF (classify by SURFACE cover cues, no content comprehension) → a genre/text-type label. bea = Gate 0. Pedagogue chose the BNCC **"Gêneros textuais"** (BNCC LP's organizing object — gêneros textuais/discursivos) over the es "Diversidad textual"/"Diversidade textual" (a looser descriptor). 🔒 Gate-0 guardrail: fires ONLY when the child needn't understand what the text SAYS; if content-understanding is needed it's Gate 1 (keeps #80 at LOCATE). Best-fit BNCC **EF15LP01** (função social/finalidade do texto). ⚠ NOT "Compreensão de textos informativos/literários" (comprehension — reserved), NOT "Práticas de estudo e pesquisa" (#80 LOCATE), NOT "Análise linguística/semiótica" (grammar). ⚠ NOT strand-names.ts 'Reading: Literature' (would mislabel bea — its fact rounds aren't Literatura — AND every future narrated sibling). CCSS RL.1.5 = machine anchor §20.10.
**Engine (activity-layer only):** `strings` +pt (8 keys: title/instruction/promptStory/promptFact/beaIntro/hintStory/hintFact/win); speak +pt→'pt-BR' (LCSAudio + fallback); worm aria +pt «Bea, a lagarta dos livros». ⚠ `win` §A.13.54 anchored on fixed masc «o livro» («Isso! Você achou o livro certo. 🐛»). title «As duas estantes da Bea» (a estante = the bookcase, fem.). slug `historia-ou-livro-de-verdade-tipos-de-texto-1-ano`; html ?v=5→**?v=6**; wrapper 9.422→**9.423**.
§A.13.62 GREEN pt **48/48** + en 48/48 + pt-rerun 48/48 (8 rounds × 6 viewports). ⚠ **FIX: pt beaIntro TEXT-CLIP at 412** (btb-say line-clamp:2 — pt 70 chars vs en 53 → 3rd line clamped) → shortened to en-length «Histórias são inventadas. Livros de verdade ensinam!» (§A.13.62 content fix, NOT threshold). ⭐ content-sim vs the REAL `StoryFactCore`: pt all rounds oneOfAsk + grade-correct + childView-no-type-leak; deckFacts askBalanced 4/4, positionBot 0.375 / longestBot 0.250 / shortestBot 0.125 / fixedGuessBot 0.125 (no cue leak — cleaner than de's positionBot 0.750); de/es/fr/en byte-identical regression. verify-pt PASS 142; preflight PASS 204; tsc route clean; es-leak (cuento/librero/oruga/"cosas de verdad"/portada) = 0 in pt-scoped content. personal-read @768 (story-ask sf1 → dragões correct) + @1024 (fact-ask sf2 → ossos correct, saci book renders) + @360 (story-ask sf3 → saci correct, cards stack clean). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.


### #82 `picture-story` — Leia a história e responda / compreensão de detalhes-chave de um conto (RL.K.1 → **1º ano · Compreensão de textos literários**) — DONE, commit `2b4a2cb0` (push, NO deploy)
⭐ **4th READING facet — real STORY (literary) COMPREHENSION; the RESERVED chip finally fires** (vs #78 comprehend-info / #80 locate / #81 genre-classify). The fox **Fábio** shows a 3-panel picture story (captioned panels); the child READS it (🔊 reads the STORY aloud as support — but the question + 3 answer cards are TEXT with no audio) and answers who/what/where/order/why/feeling by tapping a card. Core `PictureStoryCore` UNTOUCHED (0 lines) — grades `option === round.answer`; ⚠ `answerFromStory` requires the answer grounded in a caption (≥4-letter content word of the answer appears in a panel caption). de(`3c67f29c`)/es(`5c6eb673`)/fr(`94bd2d7f`) arms already in engine; pt ADDED alongside (both storiesL10n.pt + roundsL10n.pt).
**3 rebuilt BR stories** (storiesL10n.pt, object keyed mitten/carrot/picnic; glyphs COPIED language-neutral from es panels, only title+captions localized): A luva perdida (Bo, o coelho / luva vermelha / passarinho) · A cenoura gigante (Millie, a ratinha / cenoura presa / a amiga ajuda) · O piquenique na chuva (piquenique / choveu / guarda-chuva, felizes). **11 rounds** (roundsL10n.pt, es ids kept: ps-mit-{who,what,where,order}/ps-car-{who,what,why,order}/ps-pic-{what,why,feel}). ⭐ Every answer grounded in a caption via a plain-ASCII shared word (coelho/luva/árvore/pulou/ratinha/cenoura/presa/saiu/piquenique/choveu/felizes) — so pt PASSES the answerFromStory gate on all 11 (de/fr have PRE-EXISTING benign false-negatives on this gate: the ASCII-only tokenizer misses ö/elisions — their shipped state, not fixed here).
⭐ **GRADE = 1º ano — ADD `pt:'1'` (route line 63)** (`{de:'1',fr:'1',es:'1'}`→+pt). Rationale (es/fr, decisive): the test is NOT "is the answer surface text?" but "is there text the child must decode WITHOUT audio?" — the 🔊 reads the STORY, never the question/3 answer cards → support lowers STIMULUS load, never RESPONSE load → the child must READ → 1º (a written answer-set is a 1º-ano BNCC expectation, not educação infantil; sealed by the RI twin atlas #78 at 1º). ⭐⭐ **STRAND = route override "Compreensão de textos literários" (line 149; NOT strand-names.ts).** The RESERVED literary-comprehension chip fires: 3-gate (0) CONTENT not text-itself → NOT "Gêneros textuais"; (1) COMPREHEND not LOCATE (no search apparatus, literary, set incl. order/why/feeling — none scannable) → NOT "Práticas de estudo e pesquisa"; (2) READ not LISTEN → "Compreensão de textos literários" (the LITERARY counterpart of #78's "…informativos"). ⚠⚠ **Route-level NOT strand-names.ts** (de added `Reading: Literature`→de there; es/pt CANNOT): the shared strand also holds LISTENED narrated siblings (story-spine/willow → "Escuta e compreensão de textos") + bea #81 (genre) — a table entry would mislabel them; in the pt/es model the eixo is set by the ACTIVITY's access modality (read-vs-heard). **strand-names.ts stays BYTE-IDENTICAL for pt.** Best-fit BNCC EF15LP03 (order/why/feeling inferenciais → stretch leve, EF15LP04 co-fit). CCSS RL.K.1 = machine anchor §20.10.
**Engine (activity-layer only):** `L` +pt (4 keys: win «Isso! {note}»/winNote/nudge/hear); `strings` +pt (title/instruction/q); speak +pt→'pt-BR'; `_srMirror` +pt branch (História:/Pergunta:/Opções: — es leaks to EN default, pt gets its own). ⚠ **Character «Fábio, a raposa»** — male name + the natural feminine noun *raposa* (unlike es where feminizing→«la zorra» is a slur; in pt «raposa» is NOT a slur, «o raposo» reads bookish). «história/historinha» is BR-fine (es banned «historia»). title «As histórias do Fábio». slug `leia-a-historia-e-responda-1-ano`; html ?v=4→**?v=5**; wrapper 9.423→**9.424**.
§A.13.62 GREEN pt **66/66** + en 66/66 + pt-rerun 66/66 (11 rounds × 6 viewports; no clip — no shorten needed). ⭐ content-sim vs the REAL `PictureStoryCore`: pt all rounds isAnswer(answer)✓ + distractors reject + answerInOptions + **answerFromStory grounding TRUE** + 3-distinct; de/es/fr roundsL10n+storiesL10n + base rounds/stories byte-identical. verify-pt PASS 143; preflight PASS 204; tsc route clean; strand-names.ts UNTOUCHED; es-leak (cuento/conejo/ratona/zorro/zorra/guante) = 0 in pt-scoped. personal-read @768 (who → 3 story panels+glyphs, correct «Bo, o coelho») + @1024 (feeling → «felizes» correct, picnic glyphs) + @360 (order → panels stack, cards wrap-but-fit). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.


### #83 `opposites` — Palavras contrárias / antônimos (K.L.5.b → **1º ano · Ampliação do vocabulário**) — DONE, commit `26ab59fc` (push, NO deploy) ⭐ operator renamed Quill→**Espinho**
✅ **VOCABULARY family** (a lexical-semantic relation — the most canonical member). The hedgehog **Espinho** runs a "mirror-market"; the child finds the OPPOSITE of a word across **7 cogs** (pick/generate/balance/verb/route/oddpair/scene). Core `OppositesCore` UNTOUCHED (0 lines) — derives the oracle from each choice's `relation` (opposite/same-dim-sibling/related/unrelated). de(`c57f4dcf`)/es(`bed429c3`)/fr(`1cfea2f9`) arms already in engine; pt ADDED alongside. ⚠ Only `word`/`flipWord`/`sceneLabel` localize — glyphs + relation/dimension/oppositionId/cog/complementary/pos COPIED verbatim from es (built the 11 pt rounds by deep-copying es + a 23-word MAP → structural fidelity proven byte-identical).
**Word map:** preto/branco/vermelho/azul · cima/baixo (⭐ bare single words — arrow disambiguates; "para cima"/"acima" overflow/bookish) · esquerda/direita · grande/pequeno · feliz · quente/frio · empurrar/puxar(←jalar) · levantar/abrir · sol/lua · luz acesa/luz apagada · porta aberta/porta fechada · sceneLabel «Hora de dormir, mas está tudo ao contrário!».
⭐ **GRADE = 1º ano — ADD `pt:'1'` (route line 37)** (`{de,fr,es:'1'}`→+pt). Rationale (es): "opostos" é competência ORAL do infantil, mas a atividade ESCREVE e torna reflexivo — nomeia a RELAÇÃO + distingue antônimo de irmão-de-categoria (contrário de preto=branco, não vermelho) em cartões de texto SEM áudio (oddpair julga uma relação escrita; route lê rótulos de porta) → response surface = anos iniciais; jasper #77 (vocab com imagem, 1º) sela o piso. ⭐ **STRAND = route override "Ampliação do vocabulário" (line 154)** — antônimos = léxico puro, NÃO o auto-map de gramática "Análise linguística/semiótica"; a família de vocabulário registrada (sage/olive/roary/ziggy/fern/jasper/gabby). ⚠ **Honest-fit: BNCC formaliza sinônimos/antônimos só no 3º-5º (EF35LP)** — o 1º repousa na lógica léxico-reflexiva + response-surface, SEM código 1º (não inventar EF01LP §20.8). CCSS K.L.5.b = machine anchor §20.10.
⭐⭐ **CHARACTER Quill→«Espinho» (operator AskUserQuestion ruling, pt-only divergence):** "Quill" decodes badly for a BR 6-7yo (qu→/k/ → "kiw"); "Espinho" = transparent BR hedgehog name keeping the spine wordplay. Replaced EVERY Quill→Espinho in pt strings+prose; title «O Mercado Espelho do Espinho». **⭐ DOCTRINE: a character RENAME when the EN name is opaque for a BR kid = an AskUserQuestion fork (pt-only divergence) — surface it, don't auto-decide.**
**Engine (activity-layer only):** `L` +pt (15 keys — §A.13.54 gender anchors: win/nudgeRelated/nudgeUnrelated on masc «o contrário»; nudgeSibling on «o mesmo tipo»; winScene «tudo arrumado»; oddpair «a dupla»→«nela»); `strings` +pt (9 keys; qGenerate «Qual…?» = choose-from-set); route DROPS {a} (es/de precedent, 320px). aria joiner line 547 +pt «' e '». ✅ **speak NO edit** — this file passes the RAW locale (`lang: LCS.i18n.current`, no -MX/-BR map; es passes bare 'es'). slug `palavras-contrarias-antonimos-1-ano`; html ?v=4→**?v=5**; wrapper 9.424→**9.425**.
§A.13.62 GREEN pt **66/66** + en 66/66 + pt-rerun 66/66 (11 rounds × 6 viewports; no clip — the route {a}-drop de-risked 320px). ⭐ content-sim vs the REAL `OppositesCore`: pt all 7 cogs valid + **non-word fields byte-identical to es** + **every pt oracle matches its es sibling** + SINGLE_OPPOSITE cogs have exactly 1 opposite choice; de/es/fr roundsL10n + base rounds byte-identical. verify-pt PASS 144; preflight PASS 204; tsc route clean; strand-names.ts UNTOUCHED; es-leak (negro/blanco/izquierda/empujar/jalar/lámpara/puerta/"al revés") + Quill-leak = 0 in pt-scoped. personal-read @768 (pick → Preto, correct Branco) + @360 (route → doors «↔ Contrário»/«= Mesmo tipo», no overflow) + @1024 (scene → Sol/Luz acesa/Porta aberta flip). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.


### #84 `author-purpose` — Para que serve o texto / a finalidade (informar/divertir/instruir) (RI.2.6 → **2º ano · Gêneros textuais**) — DONE, commit `10b0fe14` (push, NO deploy) ⭐ operator renamed Marlow→**Marujo**
⭐ **5th READING (RI) facet — AUTHOR'S PURPOSE; the 2nd member of the Gate-0 bucket bea #81 opened.** The pelican **Marujo** sorts harbor notes into 3 bins by the author's PURPOSE (inform/entertain/instruct). Core `AuthorPurposeCore` UNTOUCHED (0 lines) — grades `bin.purpose === note.purpose` (stored). de(`9260b70b`)/es(`2780dff4`)/fr(`31508c6d`) arms already in engine; pt ADDED alongside (roundsL10n.pt + binLabelsL10n.pt).
**9 rebuilt BR notes** (3 inform + 3 entertain + 3 instruct; ⚠ structural gate: exactly the 3 entertain carry one "!"; all 6 inform+instruct carry ZERO "!"; 19-27 words; instruct has «primeiro… depois… no final»). BR content: MX monarchs→sea turtles, bees, sun; Firulais→Totó, a frog+moon, Michi→Frajola; paper boat, plant a bean, wash hands. binLabelsL10n.pt = «Para dar informação»/«Para contar algo divertido»/«Para mostrar como se faz».
⚠ **GRADE = 2º ano — NATIVE, NO override KEY (pt falls through, like es).** ⭐ es diverged DOWNWARD from de Klasse 3 / fr CE2 (both CALENDAR — KMK puts the media-Bereich at Klasse 3, fr's "repères annuels fin de cycle 2"). The CONTENT relation is +1 over genre (bea genre #81 = 1º → author-purpose = 2º); informar/divertir/instruir consolidate the anos-iniciais Fase-3 families; the answer is on the SURFACE (frell-test — no inference). **→ The route GRADE row `{de:'3', fr:'3'}` stays UNCHANGED; pt inherits native manifest grade '2'. NO pt GRADE key.** ⭐⭐ **STRAND = route override "Gêneros textuais" (line 190)** — the **2nd member of the Gate-0 bucket bea #81 opened**; in BNCC a função sociocomunicativa é indissociável do gênero → reuses bea's label (es unified under "Diversidad textual"). NOT strand-names.ts (leaks EN §20.10). Rejeições: "Compreensão de textos informativos" MISLABELS (6/9 notas não são informativas); "Compreensão de textos literários" = picture-story's; "Práticas de estudo e pesquisa" = field-guide/locate. Best-fit **EF15LP01** ("reconhecer para que o texto foi produzido" = literally author-purpose; cleaner fit than bea). CCSS RI.2.6 = machine anchor §20.10.
⭐⭐ **CHARACTER Marlow→«Marujo» (operator AskUserQuestion ruling, pt-only):** "Marlow" reads as an opaque English name to a BR kid (Espinho #83 precedent); "Marujo" = a warm BR nautical word (a sailor), keeps "Mar-"/sea, fits a harbor pelican. Replaced EVERY Marlow→Marujo in pt strings+prose; title «O correio do porto do Marujo». (Pelican SVG aria-hidden — no aria.)
**Engine (activity-layer only):** `L` +pt (6 keys — q AGENTLESS+PURPOSE «Para que esta nota foi escrita?»; §A.13.54 nudge-anchors on fixed «esta nota»/«ela»); `strings` +pt (3 keys; instruction agentless «PARA QUE ela foi escrita»); speak +pt→'pt-BR'; sr-only +pt branch («Nota:»/«Opções:»). ⚠ `SEQ = /\b(first|next|then|last|finally)\b/gi` is **EN-only** → `matchesPurpose` fails all non-EN instruct (build-time EN-validity gate, NOT runtime — runtime uses stored purpose; the "!" rule IS language-agnostic + holds). slug `proposito-do-texto-informar-divertir-instruir-2-ano`; html ?v=4→**?v=5**; wrapper 9.425→**9.426**.
§A.13.62 GREEN pt **54/54** + en 54/54 + pt-rerun 54/54 (9 rounds × 6 viewports; no clip — the longest instruct note 27 words fits at 360). ⭐ content-sim vs the REAL `AuthorPurposeCore`: pt all 9 oracle=purpose + isAnswer + wordCountOk(12-40) + the bang rule (3 entertain "!", 6 no "!") + 3/3/3; ⭐ **pt matchesPurpose 6/9 = es** (both fail the EN-only SEQ on instruct — expected, not a defect); de/es/fr roundsL10n+binLabelsL10n + base byte-identical. verify-pt PASS 145; preflight PASS 204; tsc route clean; strand-names.ts + GRADE row UNTOUCHED; es-leak (Firulais/Michi/"chistoso"/"se escribió"/"Opciones") + Marlow-leak = 0 in pt-scoped. personal-read @768 (inform → sea-turtles, correct «Para dar informação») + @360 (instruct → barquinho, longest, no clip) + @1024 (entertain → Totó "!", correct «Para contar algo divertido»). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.


### #85 `juniper-story-lantern` — A moral da fábula / a lição (RL.1.2 → **3º ano · Compreensão de textos literários**) — DONE, commit `4ca4b31a` (push, NO deploy) ⭐ operator renamed Juniper→**Fagulha**
⭐ **6th READING (RL) facet — the MORAL/lição of a FABLE (inference; the answer is OFF the surface).** The hedgehog storyteller **Fagulha** tells a 3-sentence fable; the child taps THE MORAL among 3 cards (moral / detail-trap / wrongmoral). Core `CentralMessageCore` (`central-message-core.js`) UNTOUCHED (0 lines) — grades `option.kind==='moral'`. de(`3e7b13a8`)/es(`627a43b9`)/fr(`aa819113`) arms already in engine; pt ADDED alongside.
**8 rebuilt BR fables** (a lebre e a tartaruga / a cigarra e a formiga / o leão e o rato / o corvo e o jarro / o menino que gritava Lobo / o vento e o sol / a gansa dos ovos de ouro / os dois amigos e o urso; ids+bands kept, options o1/o2/o3). ⭐ **THE ANTI-SURFACE DESIGN** (core `overlap()`): the **moral** uses FRESH abstract words (LOW story-overlap); the **detail** paraphrases a true story line (HIGH overlap — a "pick the card most like the story" shortcut grabs it and is WRONG); the **wrongmoral** is plausible-but-wrong. BR-idiomatic morals («Quem não desiste, no fim consegue» etc.).
⭐ **GRADE = 3º ano — ADD `pt:'3'` (route line 122)** (`{de:'3',fr:'2',es:'3'}`→+pt:'3', = es/de, NÃO fr's 2). **THE BIGGEST JUMP in the fan-out (native 1 → 3, content-driven).** Arithmetic from the BR floor: picture-story 1º (literal, na superfície) → author-purpose 2º (metatextual, AINDA na superfície) → **juniper 3º (metatextual + FORA da superfície + armadilha anti-superfície = author-purpose + inferência)**. gabby #79's "meaning NOT on the surface" IS juniper's mechanism. BNCC introduz fábula+moral como conteúdo NOMEADO no 3º-5º (Literatura). de Klasse 3 = híbrido (inferência transfere, "Fabel é Textsorte 3/4" = calendário não); fr CE1 = inversão incoerente. ⭐⭐ **STRAND = route override "Compreensão de textos literários" (line 143) — the SAME chip as picture-story #82.** ⭐ THE PRINCIPLE: **o eixo é uma ÁREA curricular, NÃO um degrau de dificuldade — a dificuldade está no chip de GRADO (picture-story 1º vs juniper 3º).** Ambas = compreensão de um texto literário LIDO, mesmo eixo, Fase mais profunda. Gate 0 QUEBRA (frell-test: o objeto é CONTEÚDO/inferência, não forma) → NÃO "Gêneros textuais". ⚠ NÃO cunhar "Compreensão e interpretação" (calca o fr; BNCC/SEP não separam compreensão de interpretação). NOT strand-names.ts (5 RL activities compartilham o strand, localizadas de 3 formas por-atividade → uma linha etiquetaria mal 4 delas; o eixo = MODALIDADE DE ACESSO). Best-fit **EF35LP04** (inferir informações implícitas — a moral É implícita). CCSS RL.1.2 = machine anchor §20.10.
⭐⭐ **CHARACTER Juniper→«Fagulha» (operator AskUserQuestion ruling, pt-only):** "Juniper" é opaco p/ um BR kid (Espinho #83 / Marujo #84 precedente); «Fagulha» = fagulha/faísca, evoca a chama do lampião-de-histórias, DISTINTO do ouriço «Espinho» (#83). Uma ouriça contadora. title «O lampião de Fagulha» (lampião = lanterna aconchegante, não farol). ⚠ **Two hedgehog characters now: Espinho (#83 opposites) + Fagulha (#85) — a rename must never clash with a prior rename.**
**Engine (activity-layer only):** `strings` +pt (9 keys — ⚠ NOT 7: incl. juniperIntro + theAsk; in-UI lesson noun = «lição», "moral" no slug/SEO; §A.13.54 win/hintWrong on fixed «a lição»/«a fábula»); speak +pt→'pt-BR' (BOTH arms); hog aria +pt «Fagulha, o ouriço». No sr-only block. ⚠ core `overlap()` is ASCII-only `[a-z ]` — margin holds (fresh vocab). slug `moral-da-fabula-licao-da-historia-3-ano`; html ?v=5→**?v=6**; wrapper 9.426→**9.427**.
§A.13.62 GREEN pt **48/48** + en 48/48 + pt-rerun 48/48 (8 rounds × 6 viewports; no clip — the band-3 fables + longest morals fit at 360). ⭐ content-sim vs the REAL `CentralMessageCore`: pt all 8 facts(3 opts/1 each kind) + grade(moral) + oracle=moral + ⭐ **overlap(detail) > overlap(moral) EVERY fable (detail 4-10 ≫ moral 0-4 — anti-surface holds with wide margins)**; de/es/fr roundsL10n + base byte-identical. verify-pt PASS 146; preflight PASS 204; tsc route clean; strand-names.ts UNTOUCHED; es-leak (liebre/tortuga/moraleja/farolito) + Juniper-leak = 0 in pt-scoped (⚠ "cigarra" is the CORRECT BR word for the grasshopper fable, not a leak). personal-read @768 (tortoise → correct «Quem não desiste…», detail «A lebre parou para dormir…») + @360 (bear band-3, longest, no clip) + @1024 (wolf → inner "Lobo!" quote renders clean). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.


### #86 `inky-book-workshop` — Autor e ilustrador / book-roles (RL.K.6 → **1º ano · Gêneros textuais**) — DONE, commit `9c648500` (push, NO deploy) ⭐ operator renamed Inky→**Tinoco**
⭐ **BOOK-ROLE AWARENESS (metatextual) — a NEW facet: WHO makes a book (author writes / illustrator draws / reader reads).** The octopus **Tinoco** (makes books with ink) shows a job; the child taps whose job it is (author/illustrator/reader). Core `AuthorIllustratorCore` (`author-illustrator-core.js`) UNTOUCHED (0 lines) — grades `JOB_ROLE[round.job]` (wrote→author/drew→illustrator/read→reader). de(`1c157a7d`)/es(`1e85ef86`)/fr(`c563b7ec`) arms already in engine; pt ADDED alongside. Round = `{id, band, job, book}` — the `book` blurb is DECORATIVE (answer entirely in the prompt verb).
**8 pt rounds** (localize only `book`; id/band/job byte-identical to es; 3 wrote/3 drew/2 read). BR book blurbs (dormilón→dorminhoco, globo→balão, papalote→pipa). **LABEL roles = FORMAL curriculum terms (§A.13.61 naming standard):** Autor/Ilustrador/Leitor.
⭐ **GRADE = 1º ano — ADD `pt:'1'` (route line 61)** (`{de,fr,es:'1'}`→+pt). Rationale (es, from LEER EL MOTOR): NÃO há 🔊 (grep=0) → nada é lido em voz alta antes de responder; a resposta vive INTEIRAMENTE numa frase escrita (o verbo do prompt ESCREVEU/DESENHOU/LENDO) → canal 100% texto mudo. A fortiori 1º (picture-story foi 1º mesmo COM leitura em voz alta). Superfície de resposta = palavras escritas → não desenhável p/ educação infantil, por mais pré-escolar que o tema (autor/ilustrador) soe. ⭐⭐ **STRAND = route override "Gêneros textuais" (line 185) — the bea #81 + author-purpose #84 bucket.** ⚠⚠ **THIS PLACEMENT IS OUTSIDE THE 3-GATE READING RULE ON PURPOSE (operator-ratified). A future agent re-running the gates will NOT reproduce it — DO NOT "correct" it back.** As 3 falham: (0) objeto = QUEM FEZ o livro, uma 3ª coisa (nem tipo-de-texto bea nem propósito author-purpose) → não dispara; (1) frell-test PASSA (blurb 100% decorativo, resposta no verbo do prompt) → não é conteúdo; (2) sem aparato de busca (isso é field-guide). Correto por **EXCLUSÃO curricular** (autor/ilustrador = conteúdo nomeado; compreensão+busca fora → categoria TEXTO-COMO-OBJETO / "quem produz os textos" = "Gêneros textuais") + a **partição de/fr byte-idêntica** (o par de override de+fr do inky = o de bea + author-purpose; ≠ picture-story/juniper). ⚠ NÃO propor 4º strand/rename AGORA (es declinou — churnaria bea+author-purpose). **GATILHO PERMANENTE p/ um strand de cultura-do-livro próprio = uma 2ª atividade de cultura do livro.** Best-fit **EF15LP01** ("quem os produziu"; mild-flag: alcança roles via essa cláusula, não nomeia role-diff diretamente). CCSS RL.K.6 = machine anchor §20.10.
⭐⭐ **CHARACTER Inky→«Tinoco» (operator AskUserQuestion ruling, pt-only):** "Inky" é opaco p/ um BR kid (o trocadilho ink→tinta invisível; Espinho #83 / Marujo #84 / Fagulha #85 precedente). «Tinoco» = de *tinta* (ink), lê-se fonético /ti-NÓ-co/, masculino combinando *o polvo*, DISTINTO dos renames anteriores. title «A oficina de livros do Tinoco».
**Engine (activity-layer only):** `LABEL` +pt (3 roles Autor/Ilustrador/Leitor); `strings` +pt (12 keys — §A.13.54 win «o trabalho»); speak +pt→'pt-BR' (BOTH arms); octopus aria +pt «Tinoco, o polvo». slug `autor-ilustrador-leitor-quem-faz-cada-trabalho-1-ano`; html ?v=4→**?v=5**; wrapper 9.427→**9.428**.
§A.13.62 GREEN pt **48/48** + en 48/48 + pt-rerun 48/48 (8 rounds × 6 viewports; no clip). ⭐ content-sim vs the REAL `AuthorIllustratorCore`: pt all 8 roleOf=JOB_ROLE[job] + oracle=correct-role-idx + grade(correct) true/foils false + 3/3/2 job dist; de/es/fr roundsL10n + base byte-identical. verify-pt PASS 147; preflight PASS 204; tsc route clean; strand-names.ts UNTOUCHED; es-leak (cuento/dibujos/papalote/globo/"taller"/Lector) + Inky-leak = 0 in pt-scoped. personal-read @768 (wrote → Autor correct, page-lines SVG) + @360 (drew → Ilustrador correct, picture SVG, cards wrap 2+1) + @1024 (read → Leitor correct). 0 core/shell/direction; git diff = exactly 5 files. NO deploy.

### #87 `compound-meaning` — SKIPPED (operator ruling) — determine a compound word's meaning from its parts (CCSS **L.2.4.d**)
⚠⚠ **SKIPPED, NOT built.** Its mechanic (compose a compound's meaning from two separately-imageable noun parts, e.g. de *Sonnenblume* = Sonne+Blume, "shoe for the hand" = glove) fits de/en productive noun+noun compounding but **NOT Portuguese** — pt expresses most such words as a single non-compound word (*luva*) or a phrase (*escova de dentes*); only ~4–5 real BR compounds (*girassol*, *guarda-chuva*, *beija-flor*…) have BOTH parts cleanly imageable, far short of the ≥7-round variety floor. **es and fr skipped this exact activity too** (it exists only de+en). Operator AskUserQuestion → "Skip → advance to #88". No files touched. (The core `composeMeaning`/oracle is hardcoded-English anyway; de grades via a `kind` branch — a pt build would have needed a language-specific meaning-composition, which the linguistics forbids.) Rebuild-not-translate taken to its limit: when the *mechanic itself* is language-specific and pt lacks the substrate, the correct move is skip-with-rationale, not force-fit.

### #88 `pim-comma-mail` — O correio do Pim / a vírgula na carta (CCSS L.2.2.b → **3º ano · Análise linguística/semiótica**) — DONE, commit `a18b3dcf` (push, NO deploy) ✅ character «Pim» KEPT
Carrier pigeon **Pim** delivers letters; the child taps the saudação (greeting) or despedida (closing) whose comma is in the right place. Core `LetterCommaCore` (`letter-comma-core.js`) grades by the `ok` flag — **locale-agnostic, 0 grading edit**. Round = `{id,band,kind:'greeting'|'closing',forms:[{text,ok}×3]}`. de = `fd5d04a1`; ⭐ es built it as its own #87 (`aebcbe3f`); fr present. **Activity-layer only, 5 files, 0 protected core/lcs-shell/Direction-A.**
- ⭐ **BR convention (linguist): COMMA on BOTH saudação AND despedida** (the colon is FORMAL-only in BR — «Prezados Senhores:» — so a warm K-3 letter uses a comma). **Diverges from es** (es uses a colon) and even from de (de takes a comma on the greeting but the closing convention differs). Verified on the live render @768 greeting + @1024 closing (both comma-at-end).
- `roundsL10n.pt` = 8 rounds (5 greeting *g-vovo/g-papai/g-rita/g-leo/g-titia* + 3 closing *c-carinho/c-abraco/c-amiga*): per round the ok form ends in a comma, the no-comma foil is the unique shortest, the misplaced foil is SAME length with an internal comma; every form carries EXACTLY ONE comma (no vocative "Oi, Bia," which would carry two). Content sim vs the REAL core GREEN.
- ⭐⭐ **STRAND = NO override — the route STRAND row stays `{de,fr,es}` (NO pt key); pt inherits the 'Language' auto-map "Análise linguística/semiótica".** THE DIVERGENCE from es: es overrode ("Ortografía y puntuación") only because ITS 'Language' auto-map hit a grammar-ONLY eixo («Reflexión sobre la lengua») that mislabels punctuation. **BNCC is different** — pontuação/ortografia/notação are *objetos de conhecimento* DENTRO do eixo **"Análise linguística/semiótica"** (one of BNCC's 4 eixos), so pt's auto-map is ALREADY the correct notation eixo (matches #74/#75). ⚠ Do NOT invent an "Ortografia e pontuação" override — that's an *objeto*, not an *eixo*, and would break #74/#75 parity.
- **GRADE pt:'3'** (add to `{de:'3',fr:'3',es:'3'}`): na BNCC a vírgula é objeto de notação do **3º ano** (ponto final + maiúscula = objetos do 1º–2º / EF01LP–EF02LP); e a **carta pessoal** (saudação + despedida formais) é gênero de 3º vs o bilhete/recado de 1º–2º. Best-fit habilidade = EF35LP07 (naming a vírgula em enumerações — closest true-fit pontuação code, not exact; don't invent §20.8). CCSS L.2.2.b = machine anchor §20.10.
- ✅ **Character «Pim» KEPT** (2 phonemes, instantly decodable — no rename fork); gender fixed **masculine «o pombo-correio»** (the BR term for a carrier pigeon); aria "Pim, o pombo-correio"; win adjective-free ("Isso! A carta já pode voar! 🕊️" — no Pim/child gender leak, §A.13.54). ⚠ pimIntro pre-shortened to "Sou o Pim! Me ajude a entregar as cartas." (~45 chars) — the pcm-say bubble is line-clamp:2; verified no clip across the sweep.
- Files: activity.js (strings +pt ×10 + pigeon aria pt) · activities.json (roundsL10n.pt + slug/title/intro `-3-ano`) · pt.json prose (Pim, pombo-correio masc, BNCC-named) · activity.html ?v=6 · route (GRADE +pt:'3', STRAND UNCHANGED, wrapper 9.428→9.429). strand-names.ts NOT touched.

### #89 `point-of-view` — O Farol da Luzia / de qual janela foi contada (CCSS RL.1.6 → **1º ano · Compreensão de textos literários**) — DONE, commit `a0abd9b1` (push, NO deploy) ⭐ operator renamed Lumen→**Luzia**
An owl in a lighthouse with windows at 3 heights; the child reads a first-person LINE and taps the window whose height matches the viewpoint — from HIGH things look tiny/far, from LOW huge/close. Core `PointOfViewCore` grades DERIVED (correct = the creature whose `pos===round.view`; view∈{high,low}; exactly one match + must have a high and a low; mid = distractor) — **locale-agnostic, 0 grading edit, NO speak()**. de = `c821bddc` (Klasse 2); fr = `96c6e9c1` (CE1); es = `ca11373a` (**1.º, native, NO grade override + STRAND override**). **Activity-layer only, 5 files, 0 protected core/lcs-shell/Direction-A.**
- ⭐⭐ **GRADE = 1º ano, NATIVE, NO pt key in GRADE_OVERRIDE (= es).** Pedagogue: the es content-argument transfers cleanly to BNCC — the child does explicit-cue LEXICAL matching at the anos-iniciais reading FLOOR, never names *o narrador*, never leaves the story world; **BNCC files formal *ponto de vista do narrador / 1ª-3ª pessoa* at anos finais (6º-9º)** as a metatextual object → bumping on the topic label would be the de/fr "still-decoding" CALENDAR error (rejected under #82). Sibling of **picture-story #82 [pt 1º]**, NOT juniper #85 [3º — needs meaning OUTSIDE the surface]. native RL.1.6=grade 1 → lands at 1º with NO override. ⚠ GRADE row (:59) stays `{de:'2', fr:'2'}`.
- ⭐⭐ **STRAND override OBLIGATORY = "Compreensão de textos literários" (= es).** strand-names.ts 'Reading: Literature' has NO pt → without a route override the chip LEAKS ENGLISH. COMPREHEND-literary READ facet (3-gate: object=CONTENT not text-itself → no Gêneros; COMPREHEND not LOCATE; READ [speak=0] → RL). **SAME chip as #82 picture-story + #85 juniper** (difficulty carried by the GRADE chip). ⚠ Do NOT add a row to strand-names.ts (juniper #85 precedent: 6 live activities share it, localized 3 ways each → a row mislabels the others). strand-names.ts NOT touched.
- ⭐ **PEDAGOGUE content constraint (held):** framed as PLACE/POSITION ("de onde a coruja estava olhando", "quem estava lá em cima / lá embaixo pertinho da água") — NEVER "quem é o narrador" / "ponto de vista narrativo" (holds the 1º grade + age-correct). Grep confirmed "narrador"=0 in pt.
- ✅ **Character RENAMED «Lumen»→«Luzia» (operator AskUserQuestion, pt-only).** Linguist RENAME verdict: bare "Lumen" mis-decodes /lu-MÉN/ (pt -n endings oxytone → needs the accent "Lúmen"), and it's the cold SI-unit word; «a coruja Luzia» = warm feminine BR name literally built on *luz*, farol-perfect, clash-free (Espinho/Marujo/Fagulha/Tinoco/Pim/Gabby). Pedagogue called keep low-stakes; operator chose Luzia. de/es/fr keep Lumen. ⚠ the only user-facing "Lumen" was strings.title (CSS classes lw-lumen/lumen-resolved are internal, owl SVG aria-hidden) → renamed cleanly; "Lumen"/"Lúmen"=0 in pt.
- ⚠ swapped R5's creature name "Pim"→"Zizi" (avoid echo of #88's pigeon Pim). 9 rounds alternate view high/low; answer window shifts a,b,c,a,b,c,a,c,a.
- Files: activity.js (L pt ×4 + POSLABEL pt ×3 + strings pt ×3 title/instruction/q + _srMirror pt arm, «está» agreement-safe + clitic «a» anchored on «a frase», BR "…") · activities.json (roundsL10n.pt ×9 + slug/title/intro `-1-ano`) · pt.json prose (Luzia, BNCC-named, PLACE-framed) · activity.html ?v=5 · route (STRAND +pt, GRADE UNCHANGED, wrapper 9.429→9.430).

### #90 `wobble-museum` — O museu de temas da Prata / manter o foco no tema (CCSS W.K.2 → **2º ano · Produção de textos**) — DONE, commit `f3abb213` (push, NO deploy) ⭐ operator renamed Bram→**Prata** · ⭐ FIRST *Writing* activity · ⭐ 6 files (strand-names.ts touched)
The platform's FIRST **Writing (W)** activity. A magpie curator runs a museum; each ROOM has a topic sign ("Tema: sapos") + 4 true sentences — 3 on-topic, 1 "wandered in" (true but about a different topic); the child taps the off-topic one (skill = manter o foco no tema / coerência temática). 🔊 Ouvir read-aloud button. Core `WobbleMuseumCore` grades DERIVED (drift = the sentence where `about !== room.topic`; exactly one; `oracle`/`isDrift`) — **locale-agnostic, 0 grading edit**. de = `6da134dd` (Klasse 2); fr = `7882a416` (CE1); es = `7d769639` (**2.º + strand-names.ts Writing→es**; renamed Bram→Ula). **Activity-layer only, 6 files, 0 protected core/lcs-shell/Direction-A.**
- ⭐ **6 FILES (not 5) — strand-names.ts is touched.** ⭐⭐ **STRAND = "Produção de textos" ADDED to the shared strand-names.ts 'Writing' row (:146)** — the **es/de pattern for Writing** (es OPENED the row 'Producción de textos', de='Texte verfassen'). ✅ SAFE because wobble is the ONLY 'Writing' activity (no other mislabeled — the OPPOSITE of the RL 'Reading: Literature' case where a row is forbidden). **NO route STRAND override** (fr used a route override 'Écriture'; pt follows es/de = the row). Pedagogue CONFIRMED BNCC writing eixo; REJECT Análise linguística (that's mechanics/ortografia). ⚠ **DOCTRINE: Writing-strand activities → strand-names.ts row (single-Writing-activity safe); Reading-Literature → route override (5+ share it).**
- ⭐⭐ **GRADE = 2º ano, ADD `pt:'2'` (converge de/fr/es).** Pedagogue: BNCC files "manter o foco no tema / coerência temática" in **Produção de textos at 2º** (EF02LP — o texto desenvolve um assunto) — ABOVE the 1º-ano sistema-de-escrita-alfabética decoding focus, BELOW 3º progressão temática/paragraph. The 🔊 button lifts the decoding barrier, not the cognitive judgment (hold a tema + evaluate 4 proposições). Not K.
- ✅ **PEDAGOGUE anti-cue drift discipline (held):** the drift is TRUE-but-off-topic (never false), length/structure-matched, NO shared keyword — so only the tema betrays it (child must not tap "the different-looking one"). 3 on-topic = 3 different true facts.
- ⭐ **CORE keyword-defeat invariant** (validator-checked): each room's `facts` must satisfy exactlyOneDrift + **topicWordPresent** (≥1 on-topic HAS `topicWord`) + **keywordDefeat** (≥1 on-topic LACKS it). ⚠⚠ **§23.6 ASCII- trap:** the core's `hasWord` uses ``+word = ASCII-only, so an ACCENTED-leading topicWord ("árvore") returns FALSE → topicWordPresent fails. **Room 7 SWAPPED árvores→borboletas** (borboleta = ASCII-start). `hasWord` is DORMANT at runtime (grading = about≠topic only), but the sim/facts check catches it → pick ASCII-start topicWords.
- ✅ **Character RENAMED «Bram»→«Prata» (operator AskUserQuestion, pt-only).** «a pega Prata» — *prata*=silver evokes the magpie's shiny-collector/curator theme, decodable pra-ta, feminine, clash-free (Espinho/Marujo/Fagulha/Tinoco/Pim/Gabby/Luzia/Ula). Linguist chose it over the content agent's "Nina" (generic + echoed my #89 creature-name). ⚠ NOT "Faísca" (collides with Fagulha #85). de/fr keep Bram, es uses Ula. User-facing "Bram" = strings.title + strings.instruction only (bramSVG aria-hidden, CSS classes internal).
- ⚠ **speak() has pt-BR handling:** the engine's 🔊 button calls `LCSAudio.speak({lang: LANG})` → mapped to `(LANG==='pt' ? 'pt-BR' : LANG)` (else BR gets a European-PT voice). ⚠ `strings.q` = `{en:'{q}'}` is a locale-NEUTRAL passthrough (real question from `L[LANG].q`) → NOT localized.
- Files: activity.js (L pt ×5 + strings pt title/instruction + speak pt-BR branch) · activities.json (roundsL10n.pt ×8 rooms + slug/title/intro) · pt.json prose (Prata, BNCC-named) · activity.html ?v=5 · **strand-names.ts (Writing.pt='Produção de textos')** · route (GRADE +pt:'2', wrapper 9.430→9.431).

### #91 `marina-headline-desk` — A mesa de manchetes da Marina / assunto principal (CCSS RI.2.2 → **3º ano · Compreensão de textos informativos**) — DONE, commit `dfcfed3b` (push, NO deploy) ✅ character «Marina» KEPT
An otter (Marina) runs a headline desk; the child reads (or hears via 🔊) a short 3-sentence informational text + taps the card naming the MAIN TOPIC — vs a DETAIL (a fact lifted ~verbatim from the story = the tempting high-overlap foil) + an OFFTOPIC true-but-unrelated fact. Core `MainTopicCore` grades DERIVED (correct = the option with `kind==='topic'`; `grade`/`oracle`) — **locale-agnostic, 0 grading edit**. de = `e9dcac58` (Klasse 3); fr = `2067ae71` (CE2); es = `3b8f12c4` (**3.º + route STRAND override**; kept Marina). **Activity-layer only, 5 files, 0 protected core/lcs-shell/Direction-A.**
- ⭐ **CORE overlap invariant** (validator-checked, design intent): round `{id, band, story:[3], options:[{id,kind,text}×3]}` — exactly one topic+detail+offtopic; the **DETAIL is copied ~verbatim from a story sentence so its word-overlap > the broad-paraphrase TOPIC's** (the tempting foil — "pick the card most like the text" grabs the detail + misses the topic). Validated vs the real core: detail>topic in all 8 (9>5,8>3,7>4,7>3,9>3,8>3,7>3,8>5). ⚠ `overlap()` uses ASCII-only `words()` (accents fold) but grading is by `kind` (unaffected) + the ordering holds since detail=verbatim.
- ⭐⭐ **GRADE = 3º ano, ADD `pt:'3'` (converge de/fr/es).** Pedagogue: BNCC files the HIERARCHIZING move (separate assunto principal from a subordinate verbatim detail, where the detail is the highest-overlap card) at the **3º-ano+ band (EF35LP03)** — the 2º ano still consolidates *ideia central* recognition; the deliberate verbatim-detail foil makes it a higher-order metatextual task = 3º.
- ⭐⭐ **STRAND = route override "Compreensão de textos informativos" (:192, +pt to `{fr,es}`)** — the **RI comprehend+read facet, SAME chip as pt atlas #78**. RI = route override, NOT strand-names.ts ('Reading: Informational Text' has no pt → would leak EN). 2 gates: (1) COMPREHEND not LOCATE (no índice/glossário/menu) → NÃO "Práticas de estudo e pesquisa" (field-guide #80); (2) READ not HEARD (🔊 = decoding scaffold) → NÃO "Escuta". → **5 files** (strand-names.ts UNCHANGED). ⭐ **pt RI/RL doctrine (confirmed): READ→"Compreensão de textos informativos" (RL: "…literários") / HEARD→"Escuta e compreensão de textos".**
- ✅ **Character «Marina» KEPT (NO fork)** — real BR feminine name, decodable ma-ri-na, the Pim/Gabby case (linguist confirmed). otter = "a lontra Marina" (aria-label pt branch + prose). NOT renamed (contrast #83-#90). Desk framed "mesa de manchetes" (flavor, matches de "Schlagzeilen"/es "titulares"); load-bearing task word = "assunto principal" per linguist.
- ⚠ **speak() has pt-BR handling** (the top-level `speak()` fn, `lang: LANG` → `(LANG==='pt'?'pt-BR':LANG)`; the 🔊 reads text+cards). ⚠ `strings.q`-equivalent: no passthrough issue here (this engine's question comes from L.theAsk + prompt, all localized).
- ⚠ content agent shipped a stray **Cyrillic "gratуita"** typo → fixed to "gratuita" (build script guards `[Ѐ-ӿ]`).
- Files: activity.js (strings pt ×9 + aria-label pt branch + speak pt-BR) · activities.json (roundsL10n.pt ×8 + slug/title/intro) · pt.json prose (Marina/lontra, BNCC-named) · activity.html ?v=5 · route (GRADE +pt:'3', STRAND +pt override, wrapper 9.431→9.432).

### #92 `story-spine` — A oficina de histórias do Fabo / estrutura da narrativa (CCSS RL.K.3 → **1º ano · Compreensão de textos literários**) — DONE, commit `9377a64e` (push, NO deploy) ⭐ operator renamed Dot→**Fabo** · ⭐ READ-modality
A little dragon (Fabo) runs a story workshop; each round shows a tiny 3-panel picture story (captioned scene cards, shown SHUFFLED) + asks which panel is the START/PROBLEM/SOLUTION. Captions shown as text + a 🔊 read-aloud support button. Core `StorySpineCore` grades DERIVED (correct = the panel whose `role===round.role`; exactly one panel/role; `oracle`/`isAnswer`) — **locale-agnostic, 0 grading edit**. de = `c699ee62` (Klasse 1); fr = `718fc158` (**GS/maternelle + "Écouter…" — HEARD path**); es = `7e5fc79f` (**1.º + "Comprensión de textos literarios" — READ, operator-ratified 2026-07-21**; kept Dot). **Activity-layer only, 5 files, 0 protected core/lcs-shell/Direction-A.**
- ⭐⭐ **MODALITY = READ (operator-ratified 2026-07-21; pedagogue CONFIRMED for pt).** Captions shown AS TEXT + the shuffle FORCES reading; 🔊 = decoding support. pt follows READ (matches pt RL-read family picture-story #82 + point-of-view #89). **fr's HEARD/GS is a coherent per-locale divergence pt does NOT take.** ⭐ **DOCTRINE: for a captioned-story activity, modality = READ if captions are shown as text + shuffle forces reading (🔊 = support); es/pt READ vs fr HEARD is a legitimate per-locale split.**
- ⭐ **GRADE = 1º ano, ADD `pt:'1'` (= de/es).** Pedagogue: Educação Infantil has campos de experiência (NO eixo de leitura) → no pré home for a read-to-place task; RL-K native maps to 1º when READ (EF01LP — ler/mediar textos curtos + identificar a sequência dos fatos, concrete beat↔role w/ picture support). **2º is where conscious structural terminology lives (conflito/desfecho) — this form doesn't introduce it.** Harmonizes with picture-story #82 (1º) + point-of-view #89 (1º).
- ⭐⭐ **STRAND = route override "Compreensão de textos literários" (:152, +pt to `{fr:'Écouter…', es}`)** — READ + literary, SAME chip as pt #82/#89. RI/RL = route override, NOT strand-names.ts ('Reading: Literature' has no pt → leaks EN; strand also holds HEARD sibs → per-activity modality override). REJECT "Escuta e compreensão de textos" (HEARD/fr path). → **5 files**.
- ✅ **Character RENAMED «Dot»→«Fabo» (operator AskUserQuestion, pt-only).** ⚠⚠ **the content agent independently proposed "Fagulha" — CAUGHT + REJECTED as a COLLISION with the #85 juniper hedgehog rename.** Used the LINGUIST's «Fabo» — «o dragãozinho Fabo», evokes *fábula/fabulista*, decodable Fa-bo, MASCULINE (draguinho, "do Fabo" — NOT the content's feminine "a Fagulha/draguinha"), clash-free. de/es/fr keep Dot. ⭐ **LESSON: verify a content-agent's proposed rename against ALL prior renames — the content agent can't see the roster; the linguist's clash-check is authoritative.**
- ✅ **2 data blocks**: `storiesL10n.pt` (3 stories {title, panels:[{caption, glyphs, role}×3]}) + `roundsL10n.pt` (9 = 3/story). ⚠ `glyphs` are FIXED locale-neutral artwork — REUSED EXACT (sim asserts glyph parity vs en); only captions/titles/prompts localized. Each caption role-diagnostic BY TEXT (anti-cheat — solvable by reading).
- ⚠ **speak() pt-BR** (hear button, `lang: LANG`→`(LANG==='pt'?'pt-BR':LANG)`). `_srMirror` pt branch (partWord "Parte "/tail " Toque na parte certa."). `strings.q` = passthrough (prompt from `round.prompt`) — NOT localized.
- Files: activity.js (L pt ×6 + strings pt title/instruction + _srMirror pt + speak pt-BR) · activities.json (roundsL10n.pt ×9 + storiesL10n.pt ×3 + slug/title/intro) · pt.json prose (Fabo masc, BNCC-named) · activity.html ?v=5 · route (GRADE +pt:'1', STRAND +pt override, wrapper 9.432→9.433).

### #93 `pearl-opinion-page` — A página de opiniões da Pérola / opinião + razão (CCSS RI.2.8 → **3º ano · Compreensão de textos de opinião [NEW chip]**) — DONE, commit `bc4f35b5` (push, NO deploy) ⭐ operator renamed Pearl→**Pérola** · ⭐ NEW argumentative chip
A seal (Pérola) runs an opinion page; each round shows a POINT (opinion) + 3 cards, the child taps the card giving a REASON that backs it up — vs a RESTATE (circular paraphrase echoing the point = tempting high-overlap foil) + an OFFTOPIC true-but-unrelated fact. Core `ReasonSupportCore` grades DERIVED (correct = `kind==='reason'`) — **locale-agnostic, 0 grading edit; structurally identical to marina #91's MainTopicCore**. de = `7d7c2f7c` (Klasse 3); fr = `aa819113` (CE2); es = `6ba601f3` (**3.º + NEW chip "Comprensión de textos argumentativos" — operator-ratified 2026-07-21**; kept Pearl). **Activity-layer only, 5 files, 0 protected core/lcs-shell/Direction-A.**
- ⭐ **CORE overlap invariant** (validator, design intent): round `{id, band, point, options:[{id,kind,text}×3]}` — one reason+restate+offtopic; the **RESTATE echoes the point's words so overlap(restate) > overlap(reason)** (reason adds a NEW "porque" with different words). validated vs the real core: 6>1,4>0,6>0,4>2,6>0,5>0,9>0,4>1. ⚠ ASCII-fold `overlap()` but grading by `kind`.
- ⭐⭐ **GRADE = 3º ano, ADD `pt:'3'` (= de/fr/es).** Pedagogue: BNCC EF35LP04/EF03 "identificar a ideia central e os argumentos/razões que a sustentam" — the metalinguistic step *essa razão sustenta ou só repete?* = 3º-ano análise-linguística sobre leitura (2º só RECONHECE uma opinião). native RI.2.8=2→+1.
- ⭐⭐ **STRAND = a NEW pt chip "Compreensão de textos de opinião" (:150, +pt to `{fr,es}`) — FIRST pt use of an argumentative chip.** Follows the es argumentative-typology divergence: pearl = OPINIÃO+RAZÃO = **argumentativo/persuasivo, NOT informativo** → tipologia manda → **DIVERGES from marina #91 / atlas #78 ("…informativos")**. ⭐ **Pedagogue chose "de opinião" over "argumentativos"**: the LIVE BNCC anos-iniciais term is *texto de opinião* (campo jornalístico-midiático); "argumentativos" is BNCC-valid but skews to anos finais (tese/contra-argumento). Route override, NOT strand-names.ts. ⭐ **pt RI/RL CHIP DOCTRINE now 3-way: informativo (marina #91/atlas) / literário (picture-story #82/point-of-view #89/story-spine #92) / de opinião (pearl #93) — all READ, all route-override, chosen by TEXT TYPOLOGY.**
- ✅ **Character RENAMED «Pearl»→«Pérola» (operator AskUserQuestion, pt-only).** Linguist + content agent BOTH proposed Pérola (no collision this time). transparent BR pearl, feminine «a foca Pérola», the Lumen→Luzia move; spell with acute **Pérola** (build guards bare "Perola"). de/es/fr keep Pearl.
- ⚠ **speak() has TWO lang sites** (LCSAudio `lang: LANG` + the SpeechSynthesis fallback `u.lang`) — BOTH mapped to pt-BR. **2 aria-labels** (seal "Pérola, a foca" + speaker "ouvir a opinião") — both +pt branch.
- Files: activity.js (strings pt ×8 + 2 aria-labels + speak ×2 pt-BR) · activities.json (roundsL10n.pt ×8 + slug/title/intro) · pt.json prose (Pérola, BNCC-named, ¶3 aligned to "de opinião") · activity.html ?v=5 · route (GRADE +pt:'3', STRAND +pt NEW chip, wrapper 9.433→9.434).

### #94 `marlo-magnifier` — A lupa do Faro / característica + prova textual (CCSS RL.1.3 → **3º ano · Compreensão de textos literários**) — DONE, commit `ea0be740` (push, NO deploy) ⭐ operator renamed Marlo→**Faro** · ⭐ content-driven GRADE split
A detective raccoon (Faro) shows a story + a TRAIT CLAIM ("A Mira é corajosa."); the child taps the DETAIL that PROVES it (an ACTION showing the trait) — not a true-but-irrelevant detail. Core `TraitEvidenceCore` grades DERIVED (correct = the detail with `supports===true`) — **locale-agnostic, 0 grading edit**. de = `88658c84` (Klasse 3); fr = `a6452d87` (**CE1=2**); es = `ec5dd9af` (**3.º + "Comprensión de textos literarios"**; kept Marlo). **Activity-layer only, 5 files, 0 protected core/lcs-shell/Direction-A.**
- ⭐ **CORE anti-cheat invariant** (validator): round `{id, band, trait, traitWord, story:[3], details:[{id,text,supports}×3]}` — one supports:true; **traitNamesWord** (trait CLAIM contains the lowercase traitWord STEM) + **supportLacksTraitWord** (the EVIDENCE detail does NOT contain it — it's an action, so match-the-word fails). traitWord = stem substring-matching both genders (corajosa/corajoso→"corajos"; ⚠ gentil+paciente gender-INVARIANT = whole word). ⚠ core uses `indexOf` (substring, accent-safe — the ç in "esforçad" matches) — NO ASCII- issue.
- ⭐⭐ **GRADE = 3º ano, ADD `pt:'3'` (= de+es; NOT fr's CE1/2 which reflects French attendus, not BNCC — a content-driven SPLIT).** Pedagogue DECISIVE: BNCC **EF35LP04 (inferir informações implícitas) begins at 3º**; EF12LP (1º-2º) is *localizar informações EXPLÍCITAS* (literal). This is inference+text-evidence (the evidence is an action that never names the trait) = EF35LP04 + EF35LP26 = 3º+. ⭐ **grade split is content-driven + correct: genuinely higher-order than the 1º-ano RL-read siblings (#82/#89/#92 = localizar/colocar); do NOT harmonize down.**
- ⭐ **STRAND = route override "Compreensão de textos literários" (:142, +pt to `{fr,es}`)** — READ + literary (narrativa/personagem), SAME chip as #82/#89/#92. NOT Análise linguística (compreensão, não análise metalinguística). Route override, NOT strand-names.ts.
- ✅ **Character RENAMED «Marlo»→«Faro» (operator AskUserQuestion, pt-only).** ⚠⚠ **the content agent KEPT "Marlo" — OVERRIDDEN by the linguist's decisive rename** (the #92 lesson applied: the content agent can't judge the roster; the linguist's clash-check + rename authority governs). «o guaxinim Faro» — *ter faro* = detective instinct (on-theme pun), decodable, masculine, clash-free + distinct from Marujo #84. ⭐ **LESSON reinforced: when the content agent keeps an opaque name but the linguist rules rename, the LINGUIST governs (names are its authority).** de/es/fr keep Marlo; build guards a "Marlo" leftover.
- ⚠ **speak() has TWO lang sites** (LCSAudio `lang: LANG` + SpeechSynthesis fallback `u.lang`) — BOTH mapped to pt-BR. **2 aria-labels** (raccoon "Faro, o guaxinim" + clue-speaker "ouvir a pista") — both +pt branch.
- Files: activity.js (strings pt ×10 + 2 aria-labels + speak ×2 pt-BR) · activities.json (roundsL10n.pt ×8 + slug/title/intro) · pt.json prose (Faro, BNCC-named) · activity.html ?v=10 · route (GRADE +pt:'3', STRAND +pt override, wrapper 9.434→9.435).

### #95 `linc-fact-chain` — A corrente de fatos do Elo / ligar dois fatos (CCSS RI.K.3 → **2º ano · Compreensão de textos informativos**) — DONE, commit `5cbfdabc` (push, NO deploy) ⭐ operator renamed Linc→**Elo**
A lizard (Elo) links facts in a chain; each round shows a STEM fact + a QUESTION, the child taps the fact that CONNECTS — what happens NEXT (mode "sequence") or what it CAUSES (mode "cause") — vs 2 true-but-unrelated foils. Core `FactConnectCore` grades DERIVED (correct = `options[id]===round.answer`; `oracle`=`options.indexOf(answer)`) — **locale-agnostic, 0 grading edit**. de = `3aea8cef` (Klasse 2, renamed Linc→Ketti); fr = `936f6131` (**CE1=2, "Comprendre et interpréter"**); es = `b6723200` (**2.º + "Comprensión de textos informativos"**; kept Linc). **Activity-layer only, 5 files, 0 protected core/lcs-shell/Direction-A.**
- ⭐ **CORE anti-cue** (deckFacts, design-quality not hard-grade): round `{id, band, mode:'sequence'|'cause', stem, question, answer, options:[3]}` — oneMatch + threeOptions + distinct; **modeMix** (both sequence + cause present, MUST be true) + longestBot/shortestBot moderate (answer NOT always longest/shortest). ⚠ runtime SHUFFLES option positions (positionBot cosmetic). ⚠ **the content-agent draft had longestBot=0.625 (answer uniquely-longest in 5/8) — I lengthened 3 foils (R1/R2/R4) → 0.25.** ⭐ **LESSON: an engine's deckFacts anti-cue bots are a real design gate even when grading is by answer-match — a length cue survives the shuffle; check + fix (lengthen a foil, don't move a threshold).**
- ⭐ **GRADE = 2º ano, ADD `pt:'2'` (= de/fr/es).** Pedagogue: BNCC anchors *relação de causa e efeito* + *sequência lógica dos fatos* (segurar duas proposições + inferir a relação, rejeitar iscas verdadeiras-sem-ligação) no **2º** — acima do 1º (localizar explícito / consolidação da decodificação); não 3º.
- ⭐ **STRAND = route override "Compreensão de textos informativos" (:193, +pt to `{fr,es}`)** — es informativo path (RI COMPREENDE [relaciona dois fatos, não localiza] + LÊ + TIPOLOGIA informativo/expositivo; NOT argumentativo [≠pearl #93], NOT literário) → SAME chip as atlas #78 / marina #91. ⭐ **REJECT a "compreender e interpretar" eixo** — that's the FRENCH split (fr "Comprendre et interpréter"); the pearl #93 ruling: BNCC does NOT separate compreensão/interpretação into eixos.
- ✅ **Character RENAMED «Linc»→«Elo» (operator AskUserQuestion, pt-only).** ⚠ content agent KEPT "Linc" — OVERRIDDEN by the linguist (the #94 lesson again: linguist governs names). «o lagarto Elo» — *elo* = the BR word for a chain link (exact on-theme match, what de did with Ketti/Kette; also connotes bond/connection), decodable, masculine, clash-free. es keeps Linc; build guards a "Linc" leftover.
- ⚠ **content fixes on the ensemble draft:** hintWrong "não combina"→**"não se liga"** (linguist: "combinar" reads as aesthetic-match, not chain-connect); ⚠⚠ **"fato" not "facto"** (the load-bearing EU-PT check for this fato-heavy activity — build guards `facto`). **speak() TWO lang sites** (LCSAudio + fallback) both pt-BR; 2 aria-labels (lizard "Elo, o lagarto" + stem-speaker) +pt.
- Files: activity.js (strings pt ×7 + 2 aria-labels + speak ×2 pt-BR) · activities.json (roundsL10n.pt ×8 + slug/title/intro) · pt.json prose (Elo, BNCC-named, fato) · activity.html ?v=5 · route (GRADE +pt:'2', STRAND +pt override, wrapper 9.435→9.436).


### #96 two-tales — Duas luas, duas histórias (commit `284f5fec`, pushed NO deploy) ✅
id `two-tales.compare.rl-1-9` · CCSS **RL.1.9** (machine anchor) · **BNCC 2º ano · Compreensão de textos literários**. de `5bd54447` (Klasse 2, "Moosbart") / fr `31508c6d` (CE1, "Barbe-de-Mousse") / es `af9916d1` (2.º, route STRAND "Comprensión de textos literarios", "Barba de Musgo").
**Activity:** "Two Moons" — a story-keeper (mossy tortoise) shows TWO short tales side by side (Lua dourada + Lua prateada); child reads both, finds what is IGUAL (mode same) or what happens in só UMA (mode diff). 3 experience-label cards; one satisfies the mode. Core `TwoTalesCore` grades DERIVED (same → tag ∈ A∩B; diff → tag ∈ XOR). 0 core lines.
**Data constraint (locked grading keys):** 6 stories each carry a FIXED 2-tag set (locale-neutral keys); the 9 rounds (5 same + 4 diff) are base/locale-neutral → **NO roundsL10n.pt**. Localized only: `storiesL10n.pt` (6 stories — subject/glyph/**tags** kept BYTE-IDENTICAL to base, only `summary` localized to convey its 2 tags) + `tagTextL10n.pt` (6 labels).
- **GRADE = 2º ano** (`pt:'2'` on GRADE row :54, = de/fr/es). Pedagogue: BNCC files *comparar DUAS histórias / relacionar experiências de personagens de textos distintos* = intertextual meta-comprehension = 2º (double-text set-logic load); *ler+compreender UM texto curto* is 1º.
- **STRAND = route override `pt:'Compreensão de textos literários'`** (:148, LITERARY chip — comparar duas narrativas, campo artístico-literário; SAME chip as #82/#89/#92/#94). NOT strand-names.ts (which has no pt for 'Reading: Literature' → would leak). NOT Ampliação (no lexical focus).
- **Character = "a tartaruga Barba de Musgo" (feminine)** — a consistent TRANSLATION of Mossbeard (de Moosbart / fr Barbe-de-Mousse / es Barba de Musgo), NOT an opaque-name rename → **NO fork**. Linguist: lead with "a tartaruga Barba de Musgo"; subsequent "a Barba de Musgo"/"ela".
- **L pt** (10): qSame "O que é IGUAL nas duas histórias?" · qDiff "O que acontece em só UMA história?" · win "Isso! {note}" · winNote "Você comparou as duas histórias!" · hear "🔊 Ouvir as duas histórias" · gold "Lua dourada" · silver "Lua prateada" · reSame/reDiff · choices "Opções:". strings: title "Duas luas, duas histórias" / instruction "Leia as duas histórias com a Barba de Musgo…". speak() lang pt→'pt-BR'.
- **6 tag labels:** LOST_FOUND "Perdeu algo e encontrou" · GOT_HELP "Um amigo veio ajudar" · TRIED_AGAIN "Continuou tentando" · SHARED "Dividiu com um amigo" · SCARED_SAFE **"Teve medo e ficou a salvo"** (⚠ content's "ficou em segurança"→"a salvo" per pedagogue+linguist; label AND mouse/frog summaries updated) · FIXED_IT "Consertou o que quebrou".
- ⚠ **LESSON — locale-neutral grading keys:** an oracle that grades by TAG SET-LOGIC means the tags are the contract, not the prose — keep `tags` byte-identical to base per story, localize ONLY the `summary` (which must still convey its 2 tags via the tag-label phrasing). The sim asserted every pt story's `tags` array == base + all 9 base rounds still grade exactly-one vs the pt stories. `storiesL10n.en` is undefined — the base stories live in `r.params.stories` (storiesL10n has only de/fr/es); sim reads the base from params, not storiesL10n.
- **5 files** (0 core/shell/Direction-A; strand-names.ts UNTOUCHED). wrapper 9.436→9.437. DoD GREEN (sim + gates + visual-qa pt/en/pt 54 each + personal Read @768/@360/@1024).

### #97 wake-up-pip — Acorda, Pip! (commit `0cbc3080`, pushed NO deploy) ✅
id `wake-up-pip.retell-story.rl-k-2` · CCSS **RL.K.2** (machine anchor) · **BNCC 2º ano · Compreensão de textos literários**. de `5e276825` (Klasse 2, GRADE {de:'2'} only) / fr CP=1 ("Comprendre et interpréter") / es `bf558f25` (2.º, route STRAND "Comprensión de textos literarios", host "Pip" kept).
**Activity:** "Acorda, Pip!" — Pip (sleepy host) naps through a 4-beat causal story; child WATCHES the captioned story, it DISAPPEARS, then child RE-ORDERS the picture cards into causal order + (harder bands) picks the KEY beat rejecting distractors. 8 rounds × 3 bands: **order** (reorder) / **supply-key** (reorder + fill key slot, reject trivial + foreign-what + foreign-who) / **fix-memory** (fix pre-filled error). Core `RetellStoryCore` (`retell-story-core.js`) grades DERIVED via `validateRetell(round, placedIds)` on locale-neutral keys ONLY (panel ids, `requires`, `order`, `key.who/what`, distractor `in_story`) → break kinds FACE_DOESNT_FIT / MISSING_PIECE / EFFECT_BEFORE_CAUSE. Captions display-only (`panelCaption`). 0 core lines.
**Data constraint (locked grading keys, the #96 pattern):** `roundsL10n[LANG]` = FULL deep copy of the 8 rounds, only `caption` localized. `roundsL10n.pt` = 8 rounds / **43 captions** (32 beat + 11 distractor) built PROGRAMMATICALLY from a caption-map keyed by panel-id/distractor-id → grading keys byte-identical (sim asserted deepEqual(strip-captions, base) for pt/de/fr/es). NO base-round edit, NO roundsL10n hand-edit.
- **GRADE = 2º ano** (`pt:'2'` on GRADE row :36, = de/es). Pedagogue (BNCC): eixo Leitura, campo artístico-literário; *recontar preservando a sequência + eventos/detalhes essenciais*; 3 loads push to 2º — reconstrução da MEMÓRIA (modelo some) + cadeia causal + juízo de relevância (essencial×trivial×não-pertence). Content-drives-higher (native RL.K.2=K).
- **STRAND = route override `pt:'Compreensão de textos literários'`** (:155→row is at :151 range; LITERARY chip, = es/#82/#89/#92/#94/#96 — criança COMPREENDE+reconstrói+LÊ captions [audio-apoio, story-spine #92 READ], não oraliza). strand-names.ts UNTOUCHED ('Reading: Literature' só en/de → leak).
- **Host "Pip" KEPT** — linguist decisive (series host, = de+es), NO fork. Title "Acorda, Pip!". Cast (linguist governs, no clashes): Mira · **Duque** (Duke→Duque) · Sam · Lina · **Téo** (Theo→Téo accented for TTS) · **a mamãe** (Mom) · **Guto** (Gus→Guto, BR nickname) · Ada. corvo/cachorrinho generic.
- **18 UI strings pt** + speak() pt→'pt-BR' at BOTH sites (LCSAudio.speak lang + SpeechSynthesis u.lang). BR presente+gerúndio (vai subindo / desce voando / passa trotando / vai nascendo), você-form.
- ⚠ **LESSON — visual-qa caught 1 desktop clip:** mitten-3 "Ela avista a luva vermelha perto de um tronco." (46 chars) clipped the 2-line `rt-cap` clamp by 17px at 768/1024/1366 (EN "She spots the red mitten by a log." is shorter). Fixed per §A.13.62 by SHORTENING content (never the clamp): "Ela vê a luva perto de um tronco." (33 chars; "vermelha" already established in beat 1). Re-ran → pt/en/pt 48/48/48 GREEN.
- ⚠ **Captions render on PICTURE CARDS with a 2-line clamp — hold each pt caption ≤ EN length** (a 46-char caption clips at desktop even though phone passes; the clip is a DESKTOP-first find, §A.13.62).
- **5 files** (0 core/shell/Direction-A; strand-names.ts UNTOUCHED). wrapper 9.437→9.438, html activity.js ?v=16→17. DoD GREEN (sim: oracle solves 8 + reversed-order fails 8 + grading-keys byte-identical pt/de/fr/es + 43 captions non-empty; gates; leak scan 77 strings 0; visual-qa pt/en/pt 48 each; personal Read @768 sun / @360 cake / @1024 puppy).

### #98 otto-picture-book — O livro de desenhos do Otto (commit `a9cad0c1`, pushed NO deploy) ✅
id `otto-picture-book.which-picture.rl-k-7` · CCSS **RL.K.7** (machine anchor) · **BNCC 1º ano · Compreensão de textos literários**. de `fe4ad003` (Klasse 1, GRADE {de:'1'} only) / fr GS/HEARD ("Écouter de l'écrit et comprendre") / es 1.º + route STRAND "Comprensión de textos literarios" (READ).
**Activity:** "O livro de desenhos do Otto" — Otto (host owl) drew a 4-picture story; child HEARS the whole story, then Otto reads ONE sentence (shown on-screen as TEXT "Otto lê:" + 🔊), taps which of 4 pictures shows that moment. Core `PictureMomentCore` (`picture-moment-core.js`) grades DERIVED: `grade(round, pickedPanel) = pickedPanel === correctPanel(round)` (from the round's `target` beat). 8 rounds × 2 bands. Captions display-only. 0 core lines.
**Data constraint (locked grading keys, the #96/#97 pattern):** `roundsL10n.pt` = 8 rounds / **32 captions** (4 per story), grading keys (`target`/`panel`/`id`/`band`/`story.id`/`beat.id`) byte-identical to base; built PROGRAMMATICALLY from a panel-id→caption map (sim asserted deepEqual + pt oracle solves). NO base-round edit.
- **READ (not HEARD)** — pedagogue: the sentence is PRESENT as on-screen text ("Otto lê:") + audio-support → Leitura, campo artístico-literário; pt follows es + story-spine #92 caption-shown rule (= #97), NOT fr's pré-lecteur HEARD.
- **STRAND = route override `pt:'Compreensão de textos literários'`** (:155, = es/#82/#89/#92/#94/#96/#97). strand-names.ts UNTOUCHED ('Reading: Literature' só en/de → leak).
- **GRADE = 1º ano** (`pt:'1'` on GRADE row :53, = de/es). Pedagogue: *estabelecer relações entre o texto verbal e as ilustrações* = concrete PRESENT-stimulus correspondence (sentence + 4 pictures both visible), 1º-ano alfabetização core — strictly simpler than #97's from-MEMORY retell (2º), cannot rank higher.
- **Host "Otto" KEPT** — linguist (real BR name, = de/es), NO fork. Title "O livro de desenhos do Otto" (content — Otto DRAWS them, "Eu desenhei esta história!"; sidesteps the linguist's EP-lean flag on "livro de imagens"). ⚠ This activity has MORE aria sites than #97: owl aria "Otto, a coruja" + speaker-button aria "Ouvir a parte da história" + card aria "Imagem " (all localized) beyond the 9 strings.
- **Cast (linguist governs, no clashes):** **Nino** (Finn→Nino — "Finn"≈"fim"=the end, homophone) · sabiá · **Mila** (Mae→Mila — "Mae"≈"mãe", homophone; both agents agreed Mae must go) · **Téo** (=#97) · **Sam** (=#97) · **Bento** (Bo→Bento — linguist governs opacity; content kept "Bo", #94/#95 rule) · **Lina** (=#97) · lagarta. Incidental story-cast renames = ensemble-internal, NOT operator forks (host Otto kept).
- ⚠ **LESSON — cross-activity name consistency:** Téo/Sam/Lina were reused verbatim from #97 (the linguist was TOLD the prior spellings + required consistency). When a cast name recurs across activities, lock the prior spelling.
- **5 files** (0 core/shell/Direction-A; strand-names.ts UNTOUCHED). wrapper 9.438→9.439, html activity.js ?v=5→6. DoD GREEN (sim: oracle solves 8 + non-target fails + grading-keys byte-identical pt/de/fr/es + 32 captions non-empty + pt oracle solves; gates; leak scan 62 strings 0; visual-qa pt/en/pt 48 each — passed FIRST try, captions held ≤EN; personal Read @768 boat / @360 bear-Bento / @1024 snowman).

### #99 hattie-whose-is-it — O acha-e-perde da Tuca (commit `115e7b75`, pushed NO deploy) ✅ — the FIRST FULL REBUILD
id `hattie-whose-is-it.possessive.l-1-1-b` · CCSS **L.1.1.b** (machine anchor) · **BNCC 2º ano · Análise linguística/semiótica**. de `510fcc25` (Klasse 3, "Richtig schreiben") / fr = separate pronoun activity / es = not shipped.
**⚠⚠ REBUILD not translation** — en mechanic = possessive APOSTROPHE (dog's vs dogs vs dogs'); de reframed to name-GENITIVE-s (Annas vs Deppenapostroph Anna's) via activity-layer wrapper. **pt has NO possessive apostrophe / genitive-s / possessive morphology** (possession = periphrastic "a bola da Ana"). The 3-agent ensemble found a clean pt-native target → "rebuild-not-translate NEVER skip" applies → REBUILD.
**The pt point = GENDER AGREEMENT of the possessive contraction do/da.** Tuca (a ouriça) runs an acha-e-perde; a kid owner with a clearly-gendered NAME lost a thing; child taps the contraction that agrees with the owner's gender. Frame: tell "{A/O} {owner} perdeu {a/o} {thing}." + ask "De quem é {a/o} {thing}?". Cards: ✅ da (fem) / do (masc) · ❌ gender-wrong (do/da) · ❌ wrong-preposition (na/no, em≠posse). All 2-letter contractions → no length cue.
- ⚠⚠ **LOAD-BEARING linguist correction (the "de Ana" trap):** the uncontracted "de Ana" / "de cachorro" is ACCEPTABLE BR (article-drop register) → NOT a clean foil. The clean right/wrong axis is **gender agreement (da vs do), NEVER contraction-presence (da vs de)**. Use PROPER NAMES with transparent gender (common nouns add generic-vs-specific ambiguity: "osso de cachorro" is fine as generic). The pedagogue initially proposed common-noun + de-foil; the LINGUIST refuted it → names + na/no foil. (Lesson: on a form-discrimination rebuild, the linguist's grammaticality read governs the foils.)
- **Activity-layer REBUILD (0 core lines):** `ptForms`/`ptAnswer`/`ptChildView` wrapper mirroring the existing `deForms` block; `LANG==='pt'` branches in setupTask + render(tell/ask/card-thing-span+aria) + isCorrect + check. The card thing-span is suppressed for pt (card shows just the "da Ana" phrase). Core `PossessiveNounCore` NEVER called for pt.
- **8 rounds** {id, band, noun:<owner>, ownerG, thing, thingG, slot}: ana/f/bola · teo/m/pião · bia/f/pipa · leo/m/livro · gui/m/tênis · lia/f/mochila · caio/m/chapéu · nina/f/boneca. slots 0,1,2,0,1,2,0,1 (base) for position balance.
- **Host "Hattie"→"Tuca" (a ouriça) — OPERATOR-APPROVED via AskUserQuestion** (opaque en name silent-h/-tt-/-ie + "hedgehog" clashed with prior "Espinho"). pt-only. 7 strings + hedgehog aria "Tuca, a ouriça" + speak() pt-BR.
- **GRADE pt:'2'** (concordância de gênero + posse via "de" not "em" = solidly 2º; grade by pt skill, NOT de's Klasse 3 orthography reframe). **STRAND AUTO-MAPS** — base 'Language' → strand-names.ts pt "Análise linguística/semiótica" (#74/#75); NO route override (STRAND row stays de-only; strand-names.ts UNTOUCHED).
- ⚠ **Pre-existing EN defect (out of scope, flagged):** the EN `hattieIntro` ("Add an apostrophe + s to show ONE owner: the dog's bone!") CLIPS the 2-line hwi-say clamp at @360 (visual-qa en r6/r7). It is on UNCHANGED en content (my edits added pt branches only; en render byte-identical) → NOT a regression, NOT fixed (pt-only fan-out; would modify shipped en). A future en-touch should shorten it.
- ⚠ **My pt `hattieIntro` first clipped too** (110 chars) → shortened to "Oi! Eu sou a Tuca. Dica: da é de menina, do é de menino!" (§A.13.62 — fix content ≤EN, never the clamp). Re-ran → pt 48/48 GREEN.
- **5 files** (0 core/shell/Direction-A; strand-names.ts UNTOUCHED; STRAND row UNTOUCHED). wrapper 9.439→9.440, html ?v=2→3. DoD GREEN (sim: independent da/do gender rule + slot + distinct/equal-length forms + grade semantics + en/de regression; gates; leak scan 52 strings 0; visual-qa pt/en/pt — pt 48/48 both runs; personal Read @768 Ana/da / @360 Téo/do / @1024 Caio/do).

### #100 contraction — Juntinho junta as palavras (commit `009332f2`, pushed NO deploy) ✅ — MILESTONE #100; the 2nd REBUILD (data-driven)
id `contraction.apostrophe.l-2-2-c` · CCSS **L.2.2.c** (machine anchor) · **BNCC 2º ano · Análise linguística/semiótica**. de `87c1c898` (Klasse 3, im/am/zum) / fr CE1 (élision, STRAND "L'orthographe") / **es 2º (al/del — the exact precedent)**.
**⚠ REBUILD not translation** — en = apostrophe contractions (don't); pt contractions have NO apostrophe (solid). But UNLIKE #99, DATA-DRIVEN: `FUSION_LANGS={de,fr,es}` → chips = [fusion, ...foils], correct = round.fusion via generic deChips/deIsAnswer. pt just adds **pt:1 to FUSION_LANGS + roundsL10n.pt** — NO custom wrapper (contrast #99's ptForms). 0 core lines.
**The pt point = obligatory contraction of a+artigo (ao/à) + em+artigo (no/na)**, framed as orthography "juntar preposição+artigo". word1 (a/em) + word2 (artigo+noun) → tap the correct fused chip.
- ⚠⚠ **#99-DISTINCTNESS (pedagogue, hard): NO de/do/da ANYWHERE** (answers OR foils). #99 (hattie) = de+artigo (do/da) POSSESSION; #100 = a/em+artigo (ao/à/no/na) CONTRACTION orthography. Different prepositions (a/em vs de), different frame ("como se escreve junto?" vs "de quem é?"). The sim greps for any de/do/da substring (0).
- ⚠⚠ **The colloquial-foil trap (linguist-governed, the #99 "de Ana" trap again):** in BR "vou **no** parque" is colloquially acceptable alongside "vou ao parque" → a cross-preposition foil ("no parque" for "ao parque") is NOT clean. **The 2 register-proof foils: (1) UNCONTRACTED** ("a o parque" — obligatory-contraction violated), **(2) WRONG-GENDER contraction of the SAME preposition** ("à parque" = à(a+a) on masculine; "no escola" = no(em+o) on feminine — gender agreement is never rescued by any register). NO cross-preposition foils. (Pedagogue independently proposed the same wrong-gender design.)
- **8 rounds:** a+o parque→ao / a+a escola→à / em+o mercado→no / em+a piscina→na / a+o cinema→ao / a+a praia→à / em+o quintal→no / em+a casa→na. 4×a / 4×em, 4 masc / 4 fem, crase à in 2 rounds (sparingly per pedagogue).
- **Host "Nib" (apostrophe-spirit, meaningless in pt) → "Juntinho" (junta+-inho) — OPERATOR-APPROVED via AskUserQuestion.** ⚠ content's "Nino" was REJECTED (clashes with #98's Finn→Nino). Each locale names its own host (en Nib / de Zwirbel / fr Nib / es Rulo).
- **GRADE pt:'2'** (Construção do sistema alfabético e da ortografia; = es 2º / native Grade 2). **STRAND AUTO-MAPS** — base 'Language' → "Análise linguística/semiótica" (= #99); NO route override (STRAND row stays fr-only; strand-names.ts UNTOUCHED).
- **Edits (data-driven):** FUSION_LANGS +pt:1; strings(title/instruction) +pt; L object +pt block; hear-sentence pt "vira" branch; LCSAudio lang pt→'pt-BR'; chip-aria +pt to the de/es group; roundsL10n.pt + slug/title/intro; prose.
- **5 files** (0 core/shell/Direction-A; strand-names.ts + STRAND row UNTOUCHED). wrapper 9.440→9.441, html ?v=4→5. DoD GREEN (sim: independent fusion rule + uncontracted foil0 + wrong-gender foil1 + NO-de grep + de/es/fr regression; gates; leak scan 63 strings 0 [⚠ pt "juntar/junta/Juntinho" is the THEME — a false-positive es-"junta" regex I fixed]; visual-qa pt/en/pt 48/54/48; personal Read @768 ao-parque / @360 no-mercado / @1024 à-escola).


### #101 sock-and-shadow — Meia e Sombra (commit `a2c69bb9`, pushed NO deploy) ✅ — OPENS the pt Oralidade strand; the LARGEST localization
id `sock-and-shadow.puppet-speak.sl-k-6` · CCSS **SL.K.6** (machine anchor) · **BNCC 1º ano · Oralidade**. de `7072f167` (Klasse 1, "Sprechen und Zuhören") / fr CP ("Langage oral") / es 1.º ("Oralidad"). The FIRST Speaking & Listening / Oralidade activity.
**Activity (referential communication + success criterion):** Meia (Sock, child's voice) describes an object to Sombra (Shadow), who is behind a curtain and only HEARS. Child composes from meaning-chips (object+color+size+position) → "Falar com a Sombra". Clear → fetches right ("Achei!"); VAGUE → "qual cor?"; OVER-specified → "Palavras demais!". 1 mood round (feeling+reason). Core `PuppetSpeakCore` grades referential sufficiency on the turn STRUCTURE — **language-neutral**; pt maps only affect DISPLAY. 0 core lines (core `utter` only for en; de/fr/es/pt each own `*Utter`).
**NOT a rebuild — a full grammar-block LOCALIZATION** (biggest so far). `roundsL10n` stays EMPTY; localization is a per-locale noun-phrase engine modeled on **es** (Romance: article + noun + color-agreed + size-agreed, adjectives AFTER noun, gender per noun).
- **The pt block (linguist-authoritative):** NOUN_PT{cup:xícara/f, ball:bola/f, hat:chapéu/m, teddy:ursinho/m, car:carrinho/m, block:bloco/m, blocks:blocos/p, stool:banquinho/m} + ART_PT{O/A/Os} + COLOR_PT (red vermelho/vermelha, blue/green/marrom invariant, white branco/branca) + SIZE_PT (grande inv, pequeno/pequena) + CHIP_PT + POS_PT{de cima/de baixo} + POSCHIP_PT{em cima/embaixo} + FEELPRED_PT{Estou triste / Estou com raiva}(gender-safe) + FEELCHIP_PT{triste / com raiva} + REASON_PT/SHORT_REASON_PT + ptGender/ptAdj/ptUtter/ptObjAria. Utter: "A xícara vermelha." / "O chapéu vermelho grande." / "A bola verde de cima." / mood "Estou triste porque minha torre caiu."
- ⚠⚠ **Gender-safe feelings (kid gender unknown):** "Estou com raiva" (NOT bravo/brava/zangado/zangada — those leak gender); sim greps for bravo/zangad (0). Mirrors es "Me da coraje".
- **7 dispatch pt branches** (each `LANG==='pt'`): aria(ptObjAria) / wrap-class(reuse ` ss-es` Romance narrow-width) / curtain("Sem espiar!") / bubble(**BR curly "…" NOT es «»**) / chip-label(reason→SHORT_REASON_PT / position→POSCHIP_PT / feeling→FEELCHIP_PT / else→CHIP_PT) / speak-utter(ptUtter) / speak-lang(pt-BR). + 16 UI strings.
- **Host "Sock & Shadow" → "Meia e Sombra"** — common-noun TRANSLATION (= es Calcetín y Sombra / de Socke & Schatten / fr Chaussette et Ombre), **NO operator fork** (like #96 Barba-de-Musgo; contrast the opaque-name renames Tuca/Juntinho). "meia"=sock disambiguated by the visible sock puppet.
- **GRADE pt:'1'** (EF15LP09 "expressar-se com clareza, ser compreendido pelo interlocutor"; comunicação referencial com critério de sucesso = 1º, above ed. infantil's open oralidade; = de/fr/es). **STRAND ROUTE OVERRIDE `pt:'Oralidade'`** (:181, = es "Oralidad" cognate, the formal BNCC eixo) — strand-names.ts has NO "Speaking & Listening" → must override (NOT auto-map). Mood-round guardrail (pedagogue): clareza-da-fala, not feelings-correctness.
- **5 files** (0 core/shell/Direction-A; strand-names.ts UNTOUCHED — route override not auto-map). wrapper 9.441→9.442, html ?v=11→12. DoD GREEN (sim: key-coverage + gender agreement + mood + gender-safe feelings; gates; leak scan 108 strings 0; visual-qa pt/en/pt 42/42/42 first-try; personal Read @768 name-cup / @360 size-big-hat / @1024 mood).


### #102 rhyme-shop — O vagão de rimas do Gui (commit `f00c8833`, pushed NO deploy) ✅ — language-specific RHYME localization
id `rhyme-shop.rhyme.rf-k-2-a` · CCSS **RF.K.2.a** (machine anchor) · **BNCC 1º ano · Consciência fonológica**. de `f141e515` (Klasse 1, "Sprechen und Zuhören") / es Preescolar ("Conciencia fonológica").
**Activity — "O vagão de rimas do Gui":** Gui, o guaxinim (raccoon) runs a rhyme wagon; 10 rounds × 7 cog types (judge/pick/odd/sort/chant/field/chain); the child decides by SOUND which PICTURED words rhyme. Core `RhymeShopCore` derives every answer from the phonetic `rimeKey` (two tokens rhyme iff rimeKey matches) — **language-neutral**; pt supplies only DATA. 0 core lines.
**⚠ Language-specific — pt rhyme families** (which words rhyme is pt-specific). Each token = `{word:<pt shown>, noun:<English image key>, themeDir, category, rimeKey, spelledRime}`; the picture is a REAL library file, so **every pt word must name an object in the 43-noun picturable pool** (the nouns en/de/es already use). 5 families: **ATO** gato/pato/rato/sapato · **ELHA** abelha/orelha/ovelha · **AO** avião/limão/caminhão/cão · **ELA** panela/estrela · **EIA** baleia/meia. ⚠ **ELHA(palatal lh) ≠ ELA(plain l)** (different rimes); **maçã=Ã ≠ AO** (excluded). ⚠ **EXACT pool themeDirs** — the linguist's guessed dirs ("clothes"/"vehicles") are WRONG; use the pool's ("clothing"/"Things That Fly"/"post office"/"At the Supermarket"/"insects and bugs"/"accessories" etc.).
- ⚠⚠ **`wordOf`-pt trap:** `wordOf` (:76) had `(de||es) && t.word ? t.word : cap(t.noun)` → add pt, else pt shows cap(noun)=English "Cat" instead of "Gato". (The visual-qa confirmed pt words render after the fix.)
- **Edits:** wordOf +pt; speak pt-BR; 9 `strings` +pt; 16-key `L` block +pt (authored mirroring es); roundsL10n.pt (10 rounds, exact cog shapes) + slug/title/intro; prose. Chant couplet "Olha o gato, olha o gato, calçou um só …" → sapato.
- **Host "Rosa Raccoon" → "Gui, o Guaxinim" — OPERATOR-APPROVED via AskUserQuestion.** Each locale invents its own character name (en Rosa / de Rudi Reimbär / es Momo el Mapache) → opaque-name fork. ⚠ Linguist REJECTED "Rimão" — collides phonetically with limão/caminhão inside the -ão rhyme rounds (would confuse the sound task). Gui = G-alliteration with guaxinim, no clash.
- **GRADE pt:'1'** (BNCC "Consciência fonológica e fonêmica", eixo Análise linguística/semiótica Alfabetização, EF01LP07/08 — rima é a tarefa canônica; = de). ⚠⚠ **does NOT follow es='PK'** — the es Preescolar was Mexico-system-specific (Kindergarten ≠ escola lá); in Brazil alfabetização formal começa no 1º EF + the right-vs-wrong success criterion (judge/pick/odd) makes it an assessable alfabetização skill, NOT ed-infantil experience. pt has no pré-escola grade value. **STRAND ROUTE OVERRIDE `pt:'Consciência fonológica'`** (:180, = es cognate; the specific component NOT the broad eixo; "fonológica" not "fonêmica" — rhyme is rime-level; base RF default "Compreensão leitora" is FALSE for an aural rhyme).
- **5 files** (0 core/shell/Direction-A; strand-names.ts UNTOUCHED — route override). wrapper 9.442→9.443, html ?v=6→7. DoD GREEN (sim vs real RhymeShopCore: picturable-pool coverage + per-cog rhyme logic + oracle + family integrity [ELHA≠ELA, no maçã] + all 7 cogs + de/es regression; gates; leak scan 88 strings 0; visual-qa pt/en/pt 60/72/60 first-try; personal Read @768 pick-abelha / @360 field-sapato / @1024 chant-gato — pictures RESOLVE + pt words render).


### #103 mango-animal-groups — Mango, o macaco (commit `c60c28b1`, pushed NO deploy) ✅ — language-specific VOCAB (collective nouns)
id `mango-animal-groups.collective-nouns.l-2-1-a` · CCSS **L.2.1.a** (machine anchor) · **BNCC 3º ano · Ampliação do vocabulário**. de `52cbf834` (Klasse 2, "Wortschatz...") / fr CE1 ("Le lexique") / es 3.º ("Ampliación del vocabulario").
**Activity — "Mango, o macaco":** Mango the monkey shows an animal (PICTURE); child taps the correct substantivo coletivo among 3 choices. Core `CollectiveNounCore` grades `choices[id].word === round.correct` — language-neutral; pt supplies its own rounds. 0 core lines. Each round = `{subject:{noun:<English image key>, themeDir}, plural:<pt>, correct:<pt collective>, choices:[{word}×3]}`.
**⚠ Language-specific — pt collectives.** 8 rounds (subjects reuse the es rounds' EXACT picturable noun+themeDir → images resolve): vacas→**manada** · ovelhas→**rebanho** · elefantes→**manada** · lobos→**alcateia** · leões→**alcateia** · peixes→**cardume** · pássaros→**bando** · abelhas→**enxame**.
- ⚠⚠ **Two-right-answers guard (linguist):** distractors lean on **cardume**(fish) & **enxame**(bees) as the "specialist" safe-wrong collectives for any mammal/bird. NEVER use as a distractor a collective ALSO acceptable for that animal: cow accepts *rebanho*; sheep accepts *manada* (borderline); lion accepts *bando*/*manada*; bird accepts *revoada*. (The sim hardcodes {cow:[rebanho], sheep:[manada], lion:[bando,manada], bird:[revoada]} and asserts no distractor is in it.) elephant+cow both take *manada* — fine as two CORRECT answers, just never *manada* as a distractor.
- **Host "Mango, o macaco" KEPT — NO operator fork.** Mango is kept across ALL locales (en/de/fr/es all keep "Mango", only translate "monkey": es "Mango el mono"). "Mango" reads fine in pt (fruit is *manga*; no clash). Contrast the invented-name forks (Gui/Tuca/Juntinho).
- **GRADE pt:'3'** (up-divergence, = es). Pedagogue: the substantivo class enters BNCC at **3º** (EF03LP08); a subtype (coletivo) can't sit below the ano the substantivo is introduced; cardume/enxame/alcateia = opaque low-frequency lexicon = top rung of the vocab-family ladder (antônimos 1º → categorias/nuances 2º → coletivos 3º). Concurs with es on independent BNCC grounds. **STRAND ROUTE OVERRIDE `pt:'Ampliação do vocabulário'`** (:179, the pt vocab-family chip = #76/#77/#79/#83/#87; pure lexical retrieval, NOT the 'Language' auto-map grammar axis).
- **8 UI strings** (title/prompt/mangoIntro/askTpl/theAsk/hintPick/hintWrong/win) + groupPhrase pt ('um grupo de '+plural) + monkey aria + pic aria ('ouvir: '+plural) + speak() both sites pt-BR. ⚠ mangoIntro first clipped @360 → shortened to "Muitos animais juntos formam um grupo. Como ele se chama?" (§A.13.62).
- **5 files** (0 core/shell/Direction-A; strand-names.ts UNTOUCHED — route override). wrapper 9.443→9.444, html ?v=4→5. DoD GREEN (sim vs real CollectiveNounCore: grading + two-right-answers guard + picturable-pool + intended collectives + de/es regression; gates; leak scan 67 strings 0; visual-qa pt/en/pt 48/48/48; personal Read @768 cow / @360 elephant / @1024 fish — pictures RESOLVE + pt collectives render).

### #104 penny-alphabet-trace — "Trace o alfabeto com a Penny" (L.K.1.a → traçar as letras) · 1º ano · Escrita: traçado das letras — **OPENS the pt Escrita/handwriting strand** · commit `2cae84f4`

**UI-ONLY localization** (the 52 letters are the shared Latin alphabet — `rounds` language-neutral, `roundsL10n` EMPTY; `AlphabetTraceCore` grades tracing on the shared glyphs, 0 core lines). Penny the pencil shows a letter with a start-dot + stroke guides; the child TRACES 26 maiúsculas + 26 minúsculas começando no ponto, seguindo os traços na ordem. No letter NAMES are spoken (speak() calls are feedback phrases).

- **GRADE `pt:'1'`** (= de/es/fr). Pedagogue: systematic letter-by-letter formation of the full conventional alphabet (26+26, correct stroke order/direction) = **1º ano alfabetização** ("Conhecimento do alfabeto" / "Construção do sistema alfabético", com o traçado como o correlato grafomotor). Educação infantil does readiness grafismo (traços livres + o próprio nome), NOT deliberate 52-letter formation. Content-drives-higher (native L.K.1.a=K).
- **STRAND route override `pt:'Escrita: traçado das letras'`** (= es "Escritura: trazo de letras" / de "Schreiben – Schreibfertigkeiten"). "traçado" = the standard BR word for handwriting/letter-formation mechanics; sits under the Escrita eixo; distinct from grammar/ortografia/text-composition. NOT the base 'Language' auto-map (grammar); NOT "Produção de textos" (text composition). **strand-names.ts UNTOUCHED** (route override). ⭐ First pt activity on the Escrita strand.
- **Host "Penny, o lápis" KEPT — NO fork** (all locales keep Penny; only "pencil" translated; = Mango/Marina precedent).
- **10 pt strings** (content; trace-verb "cobrir o pontilhado" child-facing / "traçar" in titles+prose): title "Trace o alfabeto com a Penny" · instruction/prompt "Comece no ponto e cubra a letra." · pennyIntro "Comece no ponto e cubra cada traço." · capBadge "MAIÚSCULA" · lowBadge "minúscula" · sayStroke "Isso — agora o próximo traço!" · sayOff "Siga o contorno da letra — comece no ponto." · sayWin "Que letra linda! ✏️" · hintCheck "Cubra cada traço na ordem certa, começando no ponto." + letter-chip prefix "Trace: " · chip aria "trace a letra maiúscula/minúscula {letter}" · pencil aria "Penny, o lápis" · win-speak "Que linda!". speak() lang pt→'pt-BR'. slug.pt `tracar-as-letras-do-alfabeto`. NO roundsL10n.
- ⚠ **§A.13.62 desktop/@320 clip fix (content, not threshold):** first pt build clipped @320 (control 659 > vh 640) because pt strings wrapped an extra line vs en. Shortened instruction/prompt "Comece no ponto e cubra o pontilhado da letra." → "Comece no ponto e cubra a letra." AND pennyIntro "…cubra cada traço na ordem!" → "…cubra cada traço." → pt PASSES 240/240 (en already passed). Fixed content, never the gate.
- DoD: sim+leak clean; verify-pt/preflight/tsc green; visual-qa full sweep pt+en GREEN; personal Read @768(A)/@360(e)/@1024(K) all pt-BR, no leak, trace SVG renders. git diff = exactly 5 files, 0 core/shell/Direction-A. Wrapper 9.444→9.445, html ?v=4.

### #105 clock-convert — "O relógio do Kiko" (2.MD.C.7 → ler/converter 12h↔24h) · 3º ano · MATH Grandezas e medidas · commit `f65df8c8`

**ADD-pt to an ALREADY-multilingual activity** (en/de/fr/es shipped; I only added pt). `ClockConvertCore` grades on structural keys (`isAnswer(round,oi)`, `round.h24/dir/options/m`) — language-neutral, **0 core lines**. Digital-only (no analog clock). Read a time in one notation, tap (of 3) the same time in the other — 24h universal "15:00" ↔ 12h colloquial "{h12}:{mm} {período}" ("3:00 da tarde").

- **The per-locale pattern (this engine):** add `L.pt` {q12to24/q24to12/win12to24/win24to12/hint} + a 24-entry `MOMENT_PT` período table + `pt12str/ptGivenStr/ptOptionStr` + extend the `givenStr`/`optionStr` dispatch with a pt branch + title/instruction pt + a `_srMirror` pt branch. NO speak-lang site (engine uses `api.sound`/`api.announce`, not LCSAudio/SpeechSynthesis).
- **GRADE `pt:'3'`** (= es). Pedagogue (BNCC, decisive): **EF03MA22** "ler horas em relógios digitais e reconhecer a relação entre hora e minutos" — the leitura + 24h decode + notation conversion = the 3º-ano relating step; 2º = EF02MA19 (duração de intervalos, no decode/convert). GRADE_OVERRIDE row (:119) → `{ es:'3', pt:'3' }`.
- **STRAND auto-map "Grandezas e medidas" — NO pt override** (strand-names.ts:79 `Measurement & Data`→pt; es relies on auto-map too; de's override is redundant). strand-names.ts UNTOUCHED.
- **HOST "Kiko" — OPERATOR FORK** (AskUserQuestion). Renames the opaque EN "Sprocket" (de="Kiko", es="Quico", fr kept "Sprocket"). Linguist-decisive + operator-confirmed: "Kiko, o galo" / "O relógio do Kiko" (matches de, BR-recognizable, no cast clash; **rejected Cocoricó [TM], Cocó/Coco [scatological]**).
- **MOMENT_PT (0..23, prep always `da`):** 0-5 `da madrugada` · 6-11 `da manhã` · 12 `do meio-dia` · **13-18 `da tarde`** · 19-23 `da noite`. ⚠ **18h = `da tarde`** (linguist LOCKED over the pedagogue's clean-cutoff "da noite" — "6:00 da tarde" is natural BR + the 18:00 round needs it; **linguist governs período form**). All 9 rounds land strict-natural.
- **Prompts/prose (ensemble):** instruction "Leia a hora e toque na mesma hora escrita do outro jeito." · q "Como se escreve essa hora no relógio de 24 horas?" / "Como se diz essa hora com o período do dia?" · win "Isso! {given} é {answer}." · hint "Depois do meio-dia, o relógio continua contando: 1 hora da tarde é 13:00." prose about×3/practices×4/howToPlay×3/learningGoals×3 (grátis + lido em voz alta + sem pressa/pontos + BNCC).
- DoD: /tmp sim vs the REAL core (all 9 rounds: oracle picks h24, período renders correct, distractors are período/hour traps like "8:00 da manhã" vs "8:00 da noite"; en/de/fr/es display untouched) + leak clean; verify-pt 165 / preflight / tsc green; visual-qa full sweep pt+en GREEN 54/54; personal Read @768("3:00 da tarde"→13/15/03)/@360("6:00 da tarde"→17/06/18)/@1024("9:30 da noite"→09:30/20:30/21:30). git diff = exactly 5 files, 0 core/shell/Direction-A. Wrapper 9.445→9.446, html ?v=5.

### #106 sound-boxes — "As caixas de som do Téo" (RF.K.2.d → consciência fonêmica: som inicial/do meio/final) · 1º ano · Consciência fonêmica · commit `07b3bb87`

**ADD-pt to an already-multilingual activity** (en/de/es shipped; I only added pt). `SoundBoxesCore` grades on structural phoneme codes (option's b/m/e[position] === target's) — language-neutral, **0 core lines**. ⚠ **LANGUAGE-SPECIFIC rebuild** (per-locale word pool + phoneme codes via `roundsL10n[LANG]`). Koala speaks a 3-sound word; one of 3 boxes lights (first/middle/last); child taps the picture whose sound at that position matches.

- **The per-locale pattern (this engine):** `roundsL10n.pt` (rounds `{id, position:'b'|'m'|'e', target:{noun,themeDir,word,b,m,e}, options:[3]}`; noun/themeDir = SHARED library image [English key], word = pt display, b/m/e = onset/nucleus/coda phoneme CODES string-graded) + `L.pt` {qFirst/qMid/qLast/win/hear/nudge×3} + `POS_WORD.pt` {b:'inicial',m:'do meio',e:'final'} + `wordOf` pt-branch + strings title/instruction pt + `_srMirror` pt branch. `_loadActivity` already reads `roundsL10n[LANG]||rounds`. speak() lang pt→'pt-BR' (child HEARS the word).
- **⚠⚠ THE ROMANCE-PHONICS GATE (the hard part; native pedagogue+linguist jointly authored):** BR pt has FEW clean 3-phoneme words (most nouns are CV-CV = 4 phonemes). Image-verified 9-word palette: sol{s,ó,l}(sun) sal{s,a,l}(salt) lua{l,u,a}(moon) olho{o,lh,u}(eye) ovo{o,v,u}(egg) uva{u,v,a}(grapes) pia{p,i,a}(sink) ave{a,v,i}(bird/spring) rio{r,i,u}(river/camping). **Phonetic rulings:** BR **[u]-reduction** — olho/ovo/rio END in /u/ (not /o/); intervocalic s→/z/; **coda-l→[w]** → sol/sal are NEVER a last-sound target ("sol ends /l/" = a lie to the BR ear); **olho ONLY last-sound** (marked /ʎ/ + open/closed-/o/ risk in initial); hiatos lua/pia clean in all positions; nasals (mão/pão) + ditongos (pau/céu/rei) + clusters (flor) REJECTED (not clean 3-phoneme). **asa dropped (no image).** 10 rounds: 2 first(/s/) / 4 middle(3×/v/ ovo·uva·ave + 1×/i/ pia·rio) / 4 last(2×/a/ + 2×/u/); each exactly one correct + the same-sound word never a distractor.
- **HOST "Coco" → "Téo, o coala" (operator fork).** de/es kept "Coco" (no poop issue there); BR "Coco"→"cocô" → rename (the #105 Cocó class). Linguist top-3 Téo/Orelhinha/(Nino excluded=#98 cast).
- **GRADE `pt:'1'`** (= de/es). Pedagogue: consciência fonêmica plena (isolar fonema inicial/medial/final) = BNCC EF01LP07/EF01LP08; Ed. Infantil does holistic som (rima), not analytic isolation → 1º.
- **STRAND route override `pt:'Consciência fonêmica'`** — DISTINCT from rhyme-shop #102 pt "Consciência fonológica" (analytic/phonemic vs holistic/phonological; BNCC "consciência fonológica E fonêmica"). 'Reading: Foundational Skills' has NO pt auto-map in strand-names.ts → override REQUIRED (else chip falls to false "Compreensão leitora"). strand-names.ts UNTOUCHED.
- **Prompts (linguist):** qFirst "Qual começa com o mesmo som que {t}?" · qMid "…som no meio…" · qLast "…termina com…" · win "Isso! {t} e {m} têm o mesmo som {pos}. 🐨" · hear "🔊 Ouvir" · nudges (comecinho/finalzinho register). prose about×3/practices×4/howToPlay×3/learningGoals×3.
- DoD: /tmp sim vs the REAL core (grading correct + ALL 9 images exist @2x + de/es rounds untouched + coda-l/olho gate enforced) + leak clean; verify-pt 166 / preflight / tsc green; visual-qa full sweep pt+en GREEN 60/54; personal Read @768(first sol→sal)/@360(middle ovo→uva)/@1024(last lua→uva) — images render, boxes light, no clip. git diff = exactly 5 files, 0 core/shell/Direction-A. Wrapper 9.446→9.447, html ?v=7.

### #107 stretch-giraffe — Vokallänge / long vs short vowel (RF.1.2.a) · ⏭️ **SKIPPED for pt (operator-confirmed)** — the genuine language-specific skip

**NO build. The activity stays en/de-only.** This is the textbook application of the operator-locked exception to "never skip": **skip only when the mechanic is truly language-specific AND es/fr also skipped.** Both conditions hold:
1. **Vowel LENGTH is not phonemic in Brazilian Portuguese.** German contrasts vowel length (Wal/Wall, Ofen/Sonne), English does (bit/beet) — pt does NOT. BR pt distinguishes vowels by **open/closed QUALITY** (avó /ɔ/ vs avô /o/; sé/se), stress, and nasality, never length. "Tap the word with the long vowel" is meaningless to a BR child.
2. **es AND fr BOTH skipped it** — `roundsL10n` has only `de`; `slug` only `en,de`; the de commit `f460081d` is the ONLY stretch-giraffe activity commit ever. Spanish (5 pure vowels, no length) + French (non-phonemic length) both correctly skipped.
3. **The core (`vowel-length-core.js`) grades purely on `choice.vowel === round.ask` (long/short tag)** anchored to RF.1.2.a. Re-tagging open/closed would MISALIGN RF.1.2.a (§20.8 "demonstrate, don't touch the standard") — that's a DIFFERENT skill = a separate future commission (an open/closed-vowel "vogal aberta/fechada" activity with its own anchor), NOT a fan-out of this one.

Operator ruled SKIP (mirror es/fr) via AskUserQuestion. No files changed in-tree; no commit/push/deploy. **A future open/closed-vowel BR activity is a possible separate commission (filed, not scheduled).** Pointer advances to #108.

### #108 read-cvc-word — "Ler as primeiras palavras" / Cora, a coruja (choice-board, RF.K.3 → leitura/decodificação de palavras) · 1º ano · Leitura: decodificação · commit `0818670d`

**ADD-pt to an already-multilingual task in the shared choice-board (E2) engine** (en/de/es shipped; I only added pt). **FIRST pt fan-out of any choice-board activity.** Read a printed word, tap the picture it names (1-of-4). **Decode-forcing invariant:** ≥1 distractor shares the target's first TWO letters, so the child reads the WHOLE word (not just the onset). NO audio (silent reading). `choice-board-core.js` UNTOUCHED (protected core); edits scoped to the read-cvc-word template strings + `roundsL10n.pt` (choice-board-**activity**.js is the activity layer — de/es edited it too).

- **The per-locale pattern (choice-board / read-cvc-word):** `roundsL10n.pt` in `choice-board-activities.json` (rounds `{word:"<printed pt word>", correct:{noun,themeDir,word}, distractors:[×3]}`; noun/themeDir = SHARED image [English key], word = pt display/tile label `o.word||o.noun`; template reads `roundsL10n[contentLocale]||rounds` — data-driven, NO round-branch code) + 3 pt strings in `choice-board-activity.js` (`promptReadWord` [was an EN placeholder → real pt], `hintPickPicture`, `hintReadWhole` — scoped to read-cvc-word).
- **roundsL10n.pt — 9 rounds (linguist authored, pedagogue decodability-gated, images @2x-verified):** gato/casa/mesa/pato/bola/lua/pipa/galo/sofá, each with a first-2-letter DECOY (gato/galo, casa/cama, mesa/melão, pato/pássaro, bola/bolo, lua/luminária, pipa/pia, galo/gato, sofá/sol). ⚠ **decodability gate:** all targets transparent CV/CVCV; **casa+mesa carry intervocalic s→/z/** (pedagogue: "frequentíssimas, passam" — moderation 2/9 OK); **KEPT OUT of 1º:** ch/lh/nh, ão/nasals, ss/rr, ce-ci/ge-gi, gu/qu, x. Tiles are pictures-only = pure decode-to-meaning (no visible label text). ⭐ decode-forcing accent-folds ("pato" vs "pássaro" = "pa" match). gato↔galo is a symmetric pair (both force reading past "ga").
- **HOST "Cora, a coruja" — PROSE-ONLY, ensemble-decisive (NOT an operator fork).** The owl renders NOWHERE on the play screen (read-cvc-word template has no mascot SVG; de "Emil die Eule"/es "Lola la lechuza" appear only in intro/prose) → prose flavor = ensemble-internal (unlike the on-screen Kiko/Téo forks). Linguist "Cora" (alliterates with coruja like es Lola/lechuza; no cast clash).
- **GRADE `pt:'1'`** (= de/es). Pedagogue: BNCC **EF12LP01** (ler palavras com precisão na decodificação) + EF01LP07/08 (base grafo-fonêmica); decodificação silenciosa = núcleo da alfabetização 1º.
- **STRAND route override `pt:'Leitura: decodificação'`** — the exact BNCC objeto-de-conhecimento (Decodificação/Fluência). NOT the auto-map "Leitura/escuta" (the "/escuta" is FALSE for silent reading) and NOT es-mirror "Leitura" (less precise). Keeps it visibly on the READING side — DISTINCT from #106 "Consciência fonêmica" + #102 "Consciência fonológica" (awareness/pré-leitura). ⚠ NOTE: unlike sound-boxes' RF (no pt auto-map), 'Reading: Foundational Skills' HAS a pt auto-map ("Leitura/escuta") — the override is a deliberate precision choice, not a fallback. strand-names.ts UNTOUCHED.
- **UI strings:** promptReadWord "Leia a palavra. Toque na figura que combina com ela." · hintPickPicture "Escolha uma figura primeiro." · hintReadWhole "Leia a palavra inteira de novo — letra por letra. Qual figura combina?" prose about×3/practices×4/howToPlay×3/learningGoals×3 (Cora, grátis, sem pressa/pontos, BNCC).
- DoD: /tmp sim (grading + decode-forcing every round + all 28 images exist @2x + de/es untouched) + leak clean; verify-pt 167 / preflight / tsc green; visual-qa full sweep pt+en GREEN 54/54; personal Read @768(gato→galo decoy)/@360(lua→luminária)/@1024(galo→gato). git diff = exactly 5 files, 0 core (choice-board-core.js + strand-names.ts UNTOUCHED). Wrapper 9.447→9.448, html ?v=77.

### #109 onset-rime-blend — Lautsynthese Anlaut+Reim (choice-board, RF.K.2.c) · ⏭️ **SKIPPED for pt (operator-confirmed)** — Germanic/Nordic onset-rime unit; es+fr skipped

**NO build. The activity stays en/nl/da/de-only.** The 2nd genuine language-specific skip (after #107), and clearer. Both exception conditions hold:
1. **es AND fr BOTH skipped it** — the entry uses `byLocale` = **en/nl/da/de ONLY** (a Germanic/Nordic "REDUCED FAN"); `roundsL10n` empty; the de commit `f54b8a6e` is the ONLY onset-rime-blend commit ever (no es/fr/it/sv/no/fi either).
2. **Onset-rime is a Germanic/Nordic sub-syllabic unit that does NOT map to BR pt.** The activity blends a MONOSYLLABLE's onset (initial C) + rime (vowel+coda): F+isch=Fisch, H+aus=Haus, M+und=Mund — productive in de/en/nl/da (abundant CVC monosyllables; rime = word-family unit). **BR pt is CV-CV OPEN syllables** (gato/casa/pato); monosyllabic CVC words are rare + problematic (nasals pão/mão, coda-l sol/sal — the #106 restricted set). **BR early literacy blends SYLLABLES (ca+sa), NOT onset+rime.**
3. **A syllable-blend rebuild would MISALIGN RF.K.2.c** (onset-rime) — syllable-blending is RF.K.2.b, a DIFFERENT standard (§20.8 "demonstrate, don't touch"). The pt analog (síntese silábica) is a separate future activity with its own anchor, NOT a fan of this one — es/fr made exactly this call.
4. **Spoken-rime TTS** — the rime is spoken (`LCSAudio.speak({type:'syllable', lang})`, child sees "F · isch" + hears the rime); even if pt-BR TTS works, a spoken pt "rime" is really a syllable → reinforces syllable-not-onset-rime.

Operator ruled SKIP (mirror es/fr) via AskUserQuestion. No files changed in-tree; no commit/push/deploy. **A pt síntese-silábica activity (blend CV syllables) is a possible separate future commission (filed, not scheduled).** Pointer advances to #110.

### #110 fraction-equiv — "A padaria da Migalha" (3.NF.A.3 → frações equivalentes / a mesma quantidade) · **5º ano** · Números · commit `129c5c1e` · ⭐ FIRST grade_5 activity + BUILT the grade_5 system

**ADD-pt to an already-multilingual activity** (en/de/es/fr shipped). ⭐ **The rounds are PURE-NUMERIC + UNIVERSAL (shared `params.rounds`, unchanged — NOT per-locale)** — only UI strings + prose + grade/strand + the spoken fraction-word helper are localized. `fraction-equiv-core.js` UNTOUCHED. Reference fraction (numerals + shaded bar) + 3 candidates → tap the one showing the same amount (equivalent fraction; denominators up to 8, e.g. 1/2=2/4, 3/4=6/8).

- **The per-locale pattern (this engine):** `L.pt` {q/win/winSame/hear/nudge/more/fewer/less} + title/instruction pt + a **pt fraction-word helper** (`NUMCARD_PT`/`FRACNOUN_PT` + `bruchwortPt`, sibling to `bruchwort`/`bruchwortFr`/`fraccionwort`) + hear-sentence + `_srMirror` pt branches + speak() lang pt→'pt-BR'. NO round authoring (shared numeric).
- **pt fraction words (linguist):** 1/2="um meio", 1/3="um terço", 2/3="dois terços", 1/4="um quarto", 3/4="três quartos", 2/4="dois quartos", 6/8="seis oitavos" (num>1→+s; masculine cardinals um/dois/três; ½="um meio" NOT "metade" for reading the symbol). Tables: NUMCARD_PT{1-7} + FRACNOUN_PT{2:meio,3:terço,4:quarto,5:quinto,6:sexto,8:oitavo}.
- **HOST "Migalha" (mouse) — common-noun translation of "crumb"** (en Crumb/de Krümel/es Migaja/fr Miette) → ensemble-internal, NOT an operator fork. "A padaria da Migalha" (feminine: a Migalha preparou). Child-facing "a mesma quantidade" NOT "equivalentes" (like de "gleich viel"); "frações equivalentes" only in teacher prose.
- ⭐⭐ **GRADE = pt:'5' (5º ano) — DIVERGES from de/fr/es (all 4); OPERATOR-APPROVED a grade_5 SYSTEM.** Pedagogue decisive (conf 0.97): BNCC **EF05MA04 "Identificar frações equivalentes"** is the EXACT habilidade (verbo=identificar). EF04MA09 (4º) covers only UNITARY fractions with NO equivalence; the rounds use non-unitary 2/3·2/4·3/4·6/8 (EF05MA03); equivalence has its own 5º code. Pedagogue: "do NOT relabel to 4º; build grade_5 or defer." Operator chose BUILD. **grade_5 infra (mirrors the de grade_4 commit `759fbe42`):** GRADE_KEY_MAP '5'→grade_5 (page.tsx) + gradeToAgeRange '5'→'10-11' (activity-content.ts) + `seo.educational_level.grade_5` in ALL 11 messages/*.json (en "Grade 5"/pt "5º ano"/de "5. Klasse"/es "5.º de primaria"/fr "CM2"/it "Quinta elementare"/nl "Groep 7"/sv "Årskurs 5"/da "5. klasse"/no "5. trinn"/fi "5. luokka"). ⭐ **grade_5 now available platform-wide** for future upper-anos-iniciais activities.
- **STRAND auto-map "Números" — NO pt override** (frações são números, BNCC unidade Números; strand-names 'Number & Operations—Fractions' pt="Números" already exists). strand-names.ts UNTOUCHED.
- DoD: /tmp sim (all rounds-fraction words render + L.pt keys + de/es/fr + shared rounds untouched + grade_5 infra all present [GRADE_KEY_MAP, GRADE_OVERRIDE pt:5, gradeToAgeRange, 11 labels]) + leak clean; verify-pt 168 / preflight / tsc green; visual-qa full sweep pt+en GREEN 48/48; personal Read @768(1/2→2/4)/@360(1/3→2/6)/@1024(3/4→6/8) — bars+numerals render, no clip. git diff = **17 files** (3 grade_5-infra + 11 message labels + 3 activity), 0 core. Wrapper 9.448→9.449, html ?v=6.

### #111 daisy-plate-stack — "Margarida, a pata" (L.K.1.c → singular e plural / flexão de número) · 2º ano · Análise linguística/semiótica · commit `d6b5f0b6`

**ADD-pt to an already-multilingual activity** (en/de/fr shipped; es SKIPPED [Spanish plural regular], but **fr rebuilt → NOT a skip case** [needs es AND fr skipped]). A sentence with a plural quantifier + blank ("Na festa, tem seis ___.") + 3 word chips; tap the correct PLURAL. Text-only (word chips, NO images). `plural-noun-core.js` UNTOUCHED.

- **The per-locale pattern (this engine):** EN derives chips via the regular +s rule (`Core.childView`); non-EN carry EXPLICIT `roundsL10n.<loc>` rounds `{id, band, sentence, chips:[correct-plural, singular, wrong-plural], answer}`. **pt joins the explicit-chips path** — L67 condition `(LANG==='de'||'fr')` → `+||'pt'`. Plus 7 pt `strings` (title/prompt/duckIntro/theAsk/hintPick/hintWrong/win), mascot aria pt, speak() pt-BR (LCSAudio + SpeechSynthesis both sites). `_loadActivity` already reads `roundsL10n[LANG]||rounds`.
- **roundsL10n.pt — 10 rounds (linguist authored, pedagogue pattern-gated, collision-safe):** 3 regular +s (gato/casa/bola) · 2 -ões FEATURED (balão→balões, botão→botões — the dominant/productive BR pattern) · 1 -ãos (mão→mãos, memorized vocab) · 1 -ães (pão→pães, memorized vocab) · 1 -l→-is (animal→animais) · 1 -m→-ns (jardim→jardins) · 1 -r→-es (flor→flores). ⭐ **Collision-safety (the de "Ei/Eis" discipline — a wrong-plural distractor must NOT spell a real different word):** mão avoided "mães" (=real plural of mãe/mother) → "mões"; pão avoided "pões" (=real verb pôr "tu pões") → "pãos"; all other wrong-plurals (gatoes/casaes/bolaes/balãos/botãos/animals/jardims/flors) confirmed non-words. band1 wrong-plurals model the -es over-generalization (WRONG for vowel-words, RIGHT for flor→flores band3 — the same rule from both sides).
- **HOST "Margarida, a pata" — common-noun/character translation (NOT a fork).** en "Daisy" (duck) → de "Ella die Ente" / fr "Marguerite la cane". "Margarida" = daisy (flower) + the canonical BR name for Daisy Duck (namorada do Pato Donald). Feminine (a Margarida, a pata). Title = the mascot name.
- **GRADE `pt:'2'`** (= de/fr). Pedagogue: BNCC **EF02LP05** (nasalidade — anchors -ão/-m plurals) + 2º ortografia/morfologia cluster (+s/-r-z/-l); NOT 1º (sistema alfabético) nor 3º (concordância nominal = phrase-level). **Pattern-fit gate (pedagogue):** feature +s/-ões/-ns/-r-z→-es; restrict -l→-is to clean words (animal/jornal/anel); -ãos(mão/irmão) + -ães(pão/cão) ONLY as 1-2 memorized-vocab rounds NOT rules; HOLD funil/alemão/réptil for 3º. The linguist's rounds landed exactly within this gate.
- **STRAND auto-map "Análise linguística/semiótica" — NO pt override** (grammar/morfologia = the BNCC eixo; strand-names 'Language' pt entry exists; the :176 override is de-only because de's short-form differs). strand-names.ts UNTOUCHED.
- **UI strings:** title/prompt/duckIntro/theAsk/hintPick/hintWrong ("Quase! Olhe bem como fica a terminação do plural. Leia de novo." — NOT "add s", since pt has many plural marks)/win "Isso! Essa palavra quer dizer mais de um. 🦆". prose about×3/practices×4/howToPlay×3/learningGoals×3.
- DoD: /tmp sim (grading: 3 chips/one answer/singular+wrong-plural distractors + collision-safety [no mães/pões] + pt condition wired + de/fr rounds untouched) + leak clean; verify-pt 169 / preflight / tsc green; visual-qa full sweep pt+en GREEN 60/54; personal Read @768(balão→balões, wrong balãos)/@360(animal→animais, wrong animals)/@1024(flor→flores, wrong flors). git diff = exactly 5 files, 0 core. Wrapper 9.449→9.450, html ?v=4.

### #112 coin-stall — "A barraca do Otto" (2.MD.C.8 → dinheiro / sistema monetário) · **3º ano** · Grandezas e medidas · commit `2477adc8` · ⚠ CURRENCY REBUILD (the most complex fan yet)

**ADD-pt to an already-multilingual activity** (en/de/es/fr all fanned out). A market-stall money activity: 14 rounds × 7 cogs (count-set/make-amount/fewest/change/enough/two-ways/trade). `coin-stall-core.js` UNTOUCHED (grades value-composition; value INVISIBLE on the coin). ⚠ **Currency-specific:** de/fr=Euro, es=Mexican Peso → pt = Brazilian **REAL**.

- **The per-locale pattern (this engine):** `coinSetL10n[LANG]` (the currency coins, attached once to every round at load) + `roundsL10n[LANG]` (14 money rounds). Round shapes per cog: count-set `{pile:[{den,count}],options}` · make-amount/fewest `{target,purse}` · change `{price,paid,purse}` · enough `{price,pile}` (verdict derived, no answer field) · two-ways `{target,shownSet,purse}` · trade `{offer:{den,count},purse}`. ⚠ **`band` is a NUMBER**; **`pile` is `[{den,count}]` objects**; **every COMPOSE round needs a `purse`** (the available-coins hand — the linguist omitted these, I constructed + validated them).
- **coinSetL10n.pt (pedagogue-ruled 5 denoms):** moedas 25c/50c/R$1 + cédulas R$2/R$5 (values 25/50/100/200/500; "cédulas E moedas" per BNCC; es-scale diameters 19-30; BR tints 25c-copper/50c-silver/R$1-gold/R$2-blue/R$5-violet). ⚠ Dropped the linguist's R$10 (pedagogue: exclude R$10+; no round uses it).
- **roundsL10n.pt — 14 rounds (linguist scenarios + amounts, I assembled exact shapes + purses; ALL validated vs the REAL core):** every target/paid/pile/offer composable from the set; count-set options include the true pileValue; change (paid−price)≥0 composable; trade offers decompose to smaller dens (excluding the offer den); two-ways ≥2 compositions; fewest minCoins finite. BR scenarios (pão/suco/bola/caderno/mochila/sorvete/picolé/brinquedo/carrinho).
- **fmt pt branch (pedagogue notation):** spelled units, **NO comma-decimal** ("50 centavos"/"R$3"/"R$3 e 50 centavos") — comma-decimal "R$ 3,50" is decimais 4º/5º, deferred. 13 pt strings + enough-verdict labels (Não dá/Certinho/É de mais) + cog-prompt verbs (Pague/Dê o troco de/Faça/Troque por) + coin aria + speak() pt-BR.
- **HOST "Otto, a lontra" — KEPT (ensemble-internal, NOT a fork).** en "Pip" (otter) → de "Otto der Otter" / es "Otto"; pt keeps Otto ("A barraca do Otto"). (topic file: Otto KEPT.)
- ⭐⭐ **GRADE pt:'3' (3º ano) — DIVERGES from de/fr/es (all base grade 2; NO grade override in any sibling).** Pedagogue decisive: the distinctive tasks (dar troco, é-suficiente=comparação, TROCAR=troca, fewest/two-ways) are BNCC **EF03MA24** ("resolver problemas... comparação e equivalência... compra, venda e TROCA" — NAMES troca+comparação); EF02MA20 (2º) is only "estabelecer equivalência". grade_3 infra exists (added a new GRADE_OVERRIDE row). Same shape as bos-berry-pantry's BNCC-over-harmonization.
- **STRAND auto-map "Grandezas e medidas" — NO pt override** (sistema monetário = grandeza; de's :177 override is de-only). strand-names.ts UNTOUCHED.
- DoD: /tmp sim vs the REAL `CoinStallCore` (all 14 rounds: a valid tray passes `gradeCompose` per cog + composability via subset-sum + count-set/enough/change/trade/two-ways constraints + all dens exist + de/es/fr coinSets+rounds untouched) + leak clean (incl. no comma-decimal); verify-pt 170 / preflight / tsc green; visual-qa full sweep pt+en GREEN 84/84; personal Read @768(count-set→"R$4 e 50 centavos")/@360(change "Dê o troco de R$5", coins wrap)/@1024(make "O pão custa R$3"→"Pague R$3") — coins render distinct BR tints, R$ spelled, no clip. git diff = exactly 5 files, 0 core. Wrapper 9.450→9.451, html ?v=7.

### #113 domino-two-part — "Leia por sílabas" / Pingo, o pinguim (RF.1.3.e → leitura por sílabas / método silábico) · 1º ano · Leitura: decodificação · commit `35c77d5f`

**ADD-pt to an already-multilingual activity** (en/de/es; fr skipped → es rebuilt so NOT a skip). ⭐ **The natural pt síntese-silábica** (CV syllables = BR literacy unit — the pt analog I flagged when #109's Germanic onset-rime was SKIPPED). A word split into 2 SYLLABLES ("ga·to") + 3 picture choices; read/blend → tap the matching picture. `domino-two-part-activity.js` IS the layer (0 lines to lcs-shell/Direction-A).

- **The per-locale pattern (this engine):** `roundsL10n[LANG]||rounds` (data-driven). Round `{id, band, word:<EN image-key>, displayWord:<pt>, displaySyl:[s1,s2], choices:[{noun,themeDir,pt}×3]}` — core grades `choice.noun===round.word`; ⚠ **the tile SHOWS the `pt` label** + the picture (o[LANG]||o.noun). Plus 7 pt `strings` (title/prompt/dominoIntro/theAsk/hintPick/hintWrong/win) + aria "ouvir: " + the penguin SVG aria (L29, hardcoded "Domino the penguin" → made pt-aware) + speak helper (L21) `lg = lang || (LANG==='pt'?'pt-BR':LANG)`.
- **roundsL10n.pt — 9 rounds (linguist, pedagogue-gated):** all open CV-CV, **≥1 first-syllable DECODE-FORCING decoy each** (⚠ the ONLY picture-backed pt collision families are **ga/ca/bo** — es got its collisions from pictureless words vaso/melón/ratón): gato[ga|to]→galo·pato / galo[ga|lo]→gato·bola / bola[bo|la]→boca·pera / casa[ca|sa]→cama·mesa (the 1 moderate s→/z/) / cama[ca|ma]→casa·sapo / boca[bo|ca]→bola·dado / bolo[bo|lo]→bola·sofá / bode[bo|de]→bolo·pipa / bote[bo|te]→boca·copo. bo-family heavy (5/9) = palette constraint not error (distinct target words = §A.13.60 OK). Decodability gate = same as #108 (no ch/lh/nh/ão/ss/rr/ce-ci/ge-gi/qu/x; c/g only before a/o/u; s→/z/ moderate). All 17 images @2x-verified.
- **HOST "Pingo, o pinguim" — OPERATOR FORK (UI-visible mascot, in the dominoIntro bubble).** en "Domino"/de "Pauli"/es "Pancho" renamed per-locale (🐧). Linguist top pick "Pingo" (echoes pinguim, no clash), operator-chosen. Alt "Zeca".
- **GRADE `pt:'1'` (base, NO override)** — pedagogue: BNCC EF12LP01 (decodificação) + EF01LP08/09 (sílaba = BR alfabetização unit); = de/es (RF.1.3.e Gr1).
- **STRAND route override `pt:'Leitura: decodificação'`** — pedagogue-decisive, SAME as #108 read-cvc: the syllables here are **WRITTEN/read** (método silábico = decoding/leitura), NOT oral "consciência silábica" (which is #102/#106 awareness territory). Added pt to the :174 STRAND row. strand-names.ts UNTOUCHED.
- ⚠ **§A.13.62 @360 text-clip fix (content, not the clamp):** the pt dominoIntro clipped the `dtp-say` 2-line clamp → shortened "Oi, eu sou o Pingo! Leia cada sílaba e toque no desenho **que combina**." → "…toque no desenho." → GREEN.
- DoD: /tmp sim (displaySyl joins to displayWord + decode-forcing first-syllable decoy each + all 17 images exist @2x + de/es untouched) + leak clean; verify-pt 171 / preflight / tsc green; visual-qa full sweep pt+en GREEN 54/48; personal Read @768(ga·to→gato/decoy galo)/@360(ca·sa→casa/decoy cama)/@1024(bo·lo→bolo/decoy bola) — syllable dominoes render (· separator), tiles show picture+label, no clip. git diff = exactly 5 files, 0 core. Wrapper 9.451→9.452, html ?v=4.

### #114 nila-pond — "O lago de ideias da Nila" / ideia principal de um texto informativo OUVIDO (RI.K.2 → escuta e compreensão) · **Educação Infantil (PK)** · Escuta e compreensão de textos · commit `ce269d28` · ⭐ **THE LAST ACTIVITY — fan-out COMPLETE**

**ADD-pt to an already-multilingual activity** (en/de/fr/es). READ-ALOUD main-idea: a Nila, a lontra lê em voz alta uma historinha informativa (TTS, pré-leitor); a criança escolhe o peixinho da IDEIA PRINCIPAL + separa detalhes. `nila-pond-activity.js` IS the layer (0 lines to main-idea-core.js / lcs-shell / Direction-A).
- ⭐⭐ **The core has HARD content invariants** (`main-idea-core.js facts()`/`audit()` + `verify-main-idea-core.js`) — the ensemble's raw paras did NOT satisfy them; I **re-authored the 12 rounds fact-for-fact off the es structural template**: (a) topic fish `key` ∈ paragraph (`topicNounInText`; whole-word `\b`, **diacritic-VERBATIM, key must start/end ASCII** — "água" fails `\b`); (b) **nest-reject** `details` = the 3 NON-topic fish, **exactly 2 belongs:true / 1 false**, the 2 true keys IN the para + the 1 false key ABSENT, slotCount(2)<details(3); (c) **supply-detail** 2 altDetails, `inText===belongs`; (d) all fish share `phraseShape` (uniform "O urso…/A abelha…/O pato…" — topic NOT shape-unique). ⭐ **the armed-solver runs only on `params.rounds` (en default), NOT on localized rounds** — but I ran verify's full 8-cue majority-vote on pt = **25%, 0 single-cue >55%** (= es/de/fr; maxOverlap 92% is genre-inherent + identical across all locales; my first "92%" sim WARN was a looser tie-count — verify's lowest-id tie-break clears it).
- **12 rounds (roundsL10n.pt):** 3 grupos urso/abelha/pato × 4 cogs (4 pick / 3 nest / 3 reject-narrow / 2 supply). Fish keys = literal para nouns: urso calor·pelo·toca·frutinhas / abelha flores·asas·mel·colmeia / pato peixes·ninho·grasna·lago.
- **GRADE `pt:'PK'` → "Educação infantil"** — DIVERGE from de (Klasse 1); harmonize es (preescolar) / fr (GS). Pedagogue "a superfície de resposta manda": estímulo=áudio (pré-leitor OUVE, zero decode) + resposta=escolher pelo SIGNIFICADO (não decodifica) → escuta-compreensão → BNCC Educação Infantil, campo "Escuta, fala, pensamento e imaginação" (EI03EF); NÃO 1º (eixo Leitura/escuta EF15LP01/03 pressupõe LER o texto escrito — contrast atlas #78 RI.K.1 pt:'1', lá a criança decodifica sozinha). Added `pt:'PK'` to GRADE_OVERRIDE :67.
- **STRAND route-override `pt:'Escuta e compreensão de textos'`** (:155) — HEARD facet (child LISTENS), = es; the pt READING cheat-sheet's HEARD rule. strand-names.ts UNTOUCHED.
- **MASCOT "Nila, a lontra" KEPT** (aria :52 pt branch; NOT a fork). 16 UI strings (incl. the 2 the content agent missed — `retellPrefix`, `instruction`); nilaWin used the SHORTER "Achou a ideia principal!" (≈EN) proactively for the @360 bubble; speak pt→pt-BR (both sites, via one `_tts` var).
- DoD: /tmp sim vs the REAL `MainIdeaCore` (every round: all `facts()` true + phraseShape + cog mix + armed-solver-lite) + full 8-cue majority-vote 25% + verify-main-idea-core (en) + local-test-nila-pond (en) + verify-pt 172 / preflight 204 / tsc green; visual-qa full sweep pt+en GREEN 72/72; personal Read @768(pick urso/calor)/@360(no clip)/@1024(supply floresta) — native BR paragraph + 4 fish + Verificar, nothing cut off. git diff = exactly 5 files, 0 core. Wrapper 9.452→9.453, html ?v=11.

## Next
🏁✅ **THE pt-BR SECOND-BATCH FAN-OUT IS COMPLETE AND DEPLOYED (2026-08-20).** #114 nila-pond (`ce269d28`) is **THE LAST ACTIVITY** — confirmed by the de chain ("#1..#114 all done", nila = de #114) AND the es SoT ("#114 `nila-pond` `712f7717` — LA ÚLTIMA"). **There is NO #115.** All #1..#114 shipped except the two locked intentional SKIPS **#107 stretch-giraffe** (vowel-length not phonemic in pt) + **#109 onset-rime-blend** (Germanic; pt blends syllables) — both es+fr also skipped.
- ✅ **DEPLOYED + verified 2026-08-20** (prod HEAD `6c39fc2a`). Standard §20.4 deploy: `git pull` (server was 115 behind) → cp `mini tools/*.{js,json,html}` → `/var/www/lcs-media/mini-tools/` BEFORE build → chown → `bash deploy.sh` (all gates green: smoke, payment canary, static chunks, nginx contract, indexable-routes, activity-routes; IndexNow submitted 22). **Live-verified:** nila route `/pt/activities/a-ideia-principal-de-um-texto-educacao-infantil/` → 200 + "Educação infantil" + "Escuta e compreensão de textos"; `nila-pond-activity.js?v=11` = pt build; `nila-pond-activities.json` roundsL10n.pt live at CDN; 5/5 sampled batch activities 200; en regression 200. (⚠ Cloudflare `max-age=300` — bare unversioned URLs lag ≤5 min; the `?v=N` iframe URLs are fresh immediately, cache-miss→origin.)
- ⚠ **ONE gate hazard hit + resolved (record for future batch deploys):** `deploy.sh`'s `audit-font-shorthand` gate ABORTED the first attempt (zero-downtime, old release kept serving) — the pt line-shifts moved 28 pre-existing `font: … Baloo 2` offenders out of the gate's line-keyed `KNOWN` ratchet. **Pure line-move (37 on disk == 37 baselined, 0 new)** → re-baselined `KNOWN` to current lines (the gate's documented "re-baseline deliberately for a line-move" path; ratchet FLAT not grown; zero render change), commit `6c39fc2a`, re-deployed clean. Underlying dropped-`font:`-shorthand debt is UNFIXED (a separate arc may shrink the ratchet: longhand + quoted `'Baloo 2'`, with per-surface visual-QA). **Lesson: a big activity batch shifts lines under line-keyed gate baselines — expect an `audit-font-shorthand` (or similar) re-baseline as part of the batch deploy.**
- **On the next operator "continue":** the pt activity loop has NO more work → surface COMPLETE+DEPLOYED and ask for direction (a new locale — it/nl/sv/da/no/fi never fanned out? a different thrust — Premium Tools §23 / Story Library / SEO?). Do NOT invent a #115.
(Legacy advance recipe — no longer applicable, the chain ended: `git log --all --oneline --reverse --ancestry-path fb423d5b..HEAD | grep '[ACTIVITY][de]' | head`.)
⚠ Grade/strand = per-activity ensemble calls; survey the de/es/fr fan for the id + rulings,
skip nothing (rebuild-not-translate — ⚠ #87 compounds are LANGUAGE-SPECIFIC, author pt-native) → 3-agent pt-BR ensemble → build → §A.13.62 DoD → commit+push NO deploy. ⚠ **LAYOUT: if visual-qa fails, fix the LAYOUT OR shorten the pt STRING to en-length, don't move a threshold.** **Strand routing cheat-sheet:** math → STRAND_OVERRIDE (Números/Álgebra/Geometria/Grandezas e medidas/Probabilidade e estatística); ⚠⚠ MATH OA→"Números" REQUIRED; ✅ C&C/Geometry/M&D auto-map;
✅ **LITERACY grammar 'Language' → "Análise linguística/semiótica" auto-map, NO override** (#74/#75); ⭐ **VOCABULARY → STRAND_OVERRIDE "Ampliação do vocabulário"** (#76 fern / #77 jasper / #79 gabby / #83 opposites / ⚠ #87 compound-meaning); ⭐⭐ **READING (RI/RL) → route STRAND_OVERRIDE by FACET: (0) GENRE/PURPOSE/BOOK-FORM/BOOK-ROLE [Gate-0 or curriculum-EXCLUSION bucket] → "Gêneros textuais" (#81 bea genre + #84 author-purpose + #86 inky book-roles) · (1) LOCATE → "Práticas de estudo e pesquisa" (#80 field-guide) · COMPREHEND-info READ → "Compreensão de textos informativos" (#78 atlas) · COMPREHEND-literary READ [inference] → "Compreensão de textos literários" (#82 picture-story + #85 juniper — SAME chip, difficulty in the GRADE) · HEARD → "Escuta e compreensão de textos"**. ⭐ THE eixo = ÁREA curricular, difficulty = GRADE chip. detail: Vocabulary.pt="Ampliação do vocabulário"(:183); Language.pt="Análise linguística/semiótica"(:176); strand-names.ts 'Reading: Informational Text'=en+de only, 'Reading: Literature'=de-only (es/fr/pt use route override).
**GRADE_OVERRIDE pattern:** route row `{de,fr,es}`→add `pt:'<same>'` UNLESS pedagogue rules a BR divergence; the row may OMIT es/pt = native grade. Precedents: clock='3'/parking='1'/tempo=NO-row/booker='3'/fern=NO+STRAND/jasper=NO+STRAND/atlas='1'/gabby=NO+STRAND/field-guide='2'+STRAND/bea=NO+STRAND-genre/picture-story='1'+STRAND-literary/opposites='1'+STRAND/author-purpose=NATIVE-2-no-key+STRAND-genre/juniper='3'+STRAND-literary/inky='1'+.../hattie='2'+Language-AUTOMAP(REBUILD do/da)/contraction='2'+Language-AUTOMAP(REBUILD ao/à/no/na)/sock-and-shadow='1'+ROUTE-OVERRIDE Oralidade(full grammar-block)/rhyme-shop='1'+ROUTE-OVERRIDE Consciência-fonológica/mango-animal-groups='3'+ROUTE-OVERRIDE Ampliação-do-vocabulário(collective nouns; grade UP to 3º = es; Mango KEPT no fork; two-right-answers guard).
**Same-CCSS-code ≠ same habilidade;** IDIOMS/compounds are LANGUAGE-SPECIFIC, author pt-native never translate; READING uses route override by FACET; ⭐ **structured oracle-graded activities → WRITE a /tmp sim against the REAL core + assert structural fidelity/design-invariant + de/es/fr byte-identical regression;** ⭐ **character RENAME when EN name opaque for a BR kid = AskUserQuestion fork (Espinho/Marujo/Fagulha/Tinoco/Luzia/Prata/Fabo/Pérola/Faro/Elo — a NEW name each; ⚠ Marina/Barba-de-Musgo/Pip/Otto KEPT — series-host/real-BR-name/consistent-translations; Hattie→Tuca + Nib→Juntinho RENAMED (opaque, operator forks; ⚠ content-agent host suggestions CAN clash — Nino rejected) — no fork).**
Reference: de = [[project-german-secondbatch-fanout]] (#1..#114 all done), es = [[es-secondbatch-fanout]]
(complete), fr = complete (175). The out-of-tree de/es/fr plan files carry the per-#N blow-by-blow.
