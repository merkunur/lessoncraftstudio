---
name: es-secondbatch-fanout
description: "Spanish (Mexican es-MX) fan-out of the ~122 second-batch lcs-shell activities — recipe, standing doctrines, current position"
metadata: 
  node_type: memory
  type: project
  originSessionId: 1252178e-b7e7-4f94-9e26-ec0cc1098fd2
  modified: 2026-07-21T21:20:45.192Z
---

# Spanish (Mexican) Second-Batch Activity Fan-Out

Port the ~122 EN-only second-batch lcs-shell activities into **Mexican Spanish (es-MX)**, **same #1..#114 order
as the German fan-out**, ONE activity per plan-mode session, each **REBUILT not translated** via a 3-agent
native es-MX ensemble (linguist + maestra/SEP + SEO). SEP / Nueva Escuela Mexicana framing; **NEVER "Common
Core" in es-facing text** (CCSS code kept only as machine anchor: JSON-LD/`/standards/`/manifest `alignment.code`).

## Current position
🏁🚀 **EL FAN-OUT es-MX ESTÁ COMPLETO Y DESPLEGADO EN VIVO (2026-07-21).** #1–#89 DEPLOYED 2026-07-15; **#90..#98 + #100..#106 +
#108 + #110 + #112 + #113 + #114 DEPLOYED 2026-07-21** (server HEAD `712f77174`). **Deploy** = git pull --ff-only → `cp -f
'mini tools/'*.{js,json,html} /var/www/lcs-media/mini-tools/` + chown lcs-media (§20.4: served dir NO es symlink de git, NO
inmutable, deploy.sh NO sincroniza mini-tools → cp manual ANTES del build) → `bash deploy.sh` (build+smoke PASS). Verificado
en vivo: páginas es 200 con mascota+eje correctos (Nila/Otto/Pancho/Coco/Migaja; «Magnitudes y medida»/«Lectura»/«Conciencia
fonémica»/«Escucha y comprensión de textos»), mini-tools js sirven es v10, SIN fuga es de "Common Core" (solo la lista genérica
de marcos; el marco visible es SEP). **NO queda nada por construir NI desplegar en el fan-out es.**
✅ **Todas las demás coordenadas restantes son dup/diferida/core-dirty/poor-fit** (NO buildables — NO las busques como huecos):
snippy=penny #104 dup (ambas letter-formation L.K.1.a) · clock-digital×4=dup de la cobertura de reloj es existente · willow=two-tales
#96 dup (comparar cuentos) · sunny-side-diner=core-resident (necesita cambios al core protegido) · bingo-word-hunt/wordclass=poor
es fit (ortografía-EN/morfología) · stretch-giraffe(#107)/onset-rime(#109)/hattie(#99)/daisy(#111)/compound-meaning(#87)=diferidas
(no-equivalentes estructurales). **NEXT = el DEPLOY final del batch** (cadena del #89: `git pull → cp mini-tools → deploy.sh`),
cuando el operador lo pida. NO hay más actividades es que construir.
🐞 **KNOWN PRE-EXISTING de DEFECT (NOT es, NOT my regression):** el `dtp-say` dominoIntro de de domino («Hallo, ich bin Pauli!
Lies jede Silbe – dann tippe das passende Bild an.») se CORTA a 360px (line-clamp:2 oculta ~15px) en r7/r8 — string de demasiado
largo; mi build es NO lo tocó (de render byte-idéntico; el es dominoIntro es más corto y NO se corta). Es contenido ALEMÁN → el
fix (acortar el string de) es de la sesión alemana/operador, fuera de scope de la fan-out es. Surfaced, no folded.
✅ El facet de fonemas (RF phonics) está ABIERTO para es (sesión #106, §20.7 de-riesgado). ✅ **NUEVO facet FRACCIONES abierto
en #110 a 4.º** (reusa la infra grade_4 ya existente del de).
⚠ **TRES DIFERIDAS** (NO tienen commit por diseño; NO las busques como hueco ni las reconstruyas): **#107 `stretch-giraffe`**
(el español NO tiene longitud vocálica) · **#109 `onset-rime-blend`** (el español lee por SÍLABAS no por onset-rime + solo 1
familia de rima CVC picturable → imposible ≥7 rondas; la síntesis silábica aterrizó en #113) · **#111 `daisy-plate-stack`**
(Pluralbildung L.K.1.c = **DUP**: es ya tiene «El estanque de Pearl» `plural.irregular.l-2-1-b` «El plural: -es y -ces» 2.º, misma
mecánica ver-singular→tocar-plural; el plural español es reglado → el split inglés regular-vs-irregular colapsa). Las tres operador-confirmadas.
**NEXT = el siguiente buildable en orden alemán** (surveya al planear): **#114 nila-pond** (RI.K.2 idea principal — contenido
PESADO, el fan alemán lo rechazó por 48+48 oraciones; reconsiderar para es) · + la cola dura (snippy handwriting / word-clinic
fonética-EN / sunny-side-diner agreement core-resident / dups). (#112 + #113 ya construidas.)
**#87 `compound-meaning` = DIFERIDA (design-not-fan), sin código** — *no tiene commit por diseño; NO la busques
como hueco ni la reconstruyas* (⚠ **#99 `hattie-whose-is-it` = DIFERIDA para es**: inglés possessive-'s → alemán
Namen-Genitiv funcionó, pero **el español NO tiene morfología posesiva** («el balón de Ana», sin forma-'s que contrastar);
el mecanismo de 3-chips no tiene análogo es limpio, y su punto es cercano — al/del — es el terreno del #100 → salta).
📌 **ñ FUTURO (core commission):** penny #104 shipeó base-26 (A-Z/a-z); ñ = n+virgulilla necesita un glyph NUEVO en
`alphabet-trace-core.js` (cambio de core, fuera de scope 0-core) — alta prioridad para agregar después (glyph + trazo n→virgulilla).
**NEXT = el siguiente buildable del tier duro en orden alemán** (surveya al planear). El tail restante es duro: `snippy`
(handwriting, core-deck de 10 letras constrained), `word-clinic` (fonética EN full-rebuild), `sunny-side-diner` (agreement
core-resident, EL MÁS DURO), RF phonics ×8 (es GREEN pero gated — phoneme-analysis hand-authored, necesita OK operador §20.7),
dups a evitar (`willow`/`daisy`/`shades`/`mims`/`nila`/`wordclass`).
🔑 **grade preescolar = `GRADE_OVERRIDE es:'PK'`** (`GRADE_KEY_MAP['PK']='preschool'`→«Preescolar»; precedente comparison-creek/nesting-pots). Úsalo cuando la maestra dictamine preescolar (rebuild-not-translate: pon la actividad donde vive en México, NO copies el push-up de/fr a Klasse 1/CP).
🔑 **strand «Language» YA auto-mapea a es «Reflexión sobre la lengua»** en `strand-names.ts` → las actividades de
gramática/L NO necesitan STRAND_OVERRIDE es (solo RL/RI lo necesitan, porque «Reading: Literature/Informational» no tienen es).
**#90+ NO se despliega** hasta el batch-deploy final vía la cadena del #89.
🧵 commits recientes: #98 `55a4988d` · #100 `0b485111` · #103 `adadf0e3` · #104 `83d0903a` · #105 `5298b49d`.
🔑 **story-spine RESOLVIÓ el fork del trío narrado (operator-ratificado 2026-07-21): es LEE=«Comprensión de textos
literarios», NO «Escucha».** La nota-adelantada de #82 (:138, que preclasificaba story-spine/otto/willow como narrados)
fue una CONJETURA previa; la actividad construida MUESTRA pies de texto + baraja = LECTURA (= misma modalidad que
picture-story #82). **otto/willow se clasifican por SU PROPIA modalidad al construirse** (NO heredan): audio-canal-único
sin texto visible → «Escucha»; texto mostrado → LEE. La nota de #82 quedó anotada como superseded; fr conserva ESCUCHA
(fr envía en GS/pré-lecteur, es en 1.º/lector — split coherente por grado).

## #114 `nila-pond` — "El estanque de ideas de Nila" (RI.K.2 → **preescolar**, eje **Escucha y comprensión de textos**) `712f7717` — LA ÚLTIMA; WRAPPER 0-core, `roundsL10n.es`
La idea principal de un texto informativo LEÍDO EN VOZ ALTA + recontar detalles clave. Nila la nutria lee una historieta (TTS +
párrafo mostrado + resaltado); el niño toca el «pez-idea» que dice de qué trata, luego lleva a casa los detalles verdaderos.
**0-core:** la corrección viene SOLO de `main-idea-core.js` (`isTopic`/`belongs`), nunca de la superficie de la frase. **Diseño
swap-group:** los 4 peces de cada grupo son FIJOS; el TOPIC ROTA por las rondas del grupo (cada párrafo hace que un concepto
distinto sea el gist; todos los sustantivos del grupo aparecen → el solapamiento no filtra la respuesta). **0 líneas a `main-idea-core.js`.**
- **⚠ GATE DURO `verify-main-idea-core.js --locale=es`:** el oráculo de comprensión (dado topicId/belongs) = 100% Y el solver
  ARMADO de pistas-de-superficie (longitud/primera-mención/solapamiento/registro) ≤ 0.55 → PASÓ a la primera (todos ≤33.3%,
  voto-mayoría 25%, oráculo 12/12+5/5). Contenido = traducción de los párrafos de balance del alemán.
- **NON-DUP (decisivo, regla es operator-ruled YA DOCUMENTADA en la ruta líneas 62/137/144):** el eje lo decide la MODALIDAD DE
  ACCESO — nila = texto ESCUCHADO (leído en voz alta a pre-lector) → **«Escucha y comprensión de textos»**; distinto de marina
  (RI.2.2, leído por el niño → «Comprensión de textos informativos», 3.º) + atlas (RI.K.1, descodifica → idem, 1.º). **La regla
  es para las RI/RL: lee-vs-escucha primero.**
- **GRADO preescolar** (`GRADE_OVERRIDE es:'PK'`, override manifest 'K'; el niño ESCUCHA no descodifica = fr GS; regla documentada
  «RI.K.2 idée ENTENDUE → GS»; precedente rhyme-shop #102 PK). **EJE «Escucha y comprensión de textos»** (`STRAND_OVERRIDE es`).
- **12 rondas, 3 grupos (oso/abeja/pato) × 4 conceptos, 4 cogs** (pick-topic×4/nest-reject×3/supply-detail×2/reject-narrow×3).
  Keys NON-acentuadas (JS `\b` es ASCII). Mascota «Nila la nutria»; title «El estanque de ideas de Nila». Wrapper: 17 strings es
  + nilaSVG aria es (speak ya usa LANG→es). §A.13.62 GREEN es 72/72 + en 72/72; critic PASS (párrafo completo, sin alemán,
  acentos). wrapper 9.341; `?v=10`. slug `la-idea-principal-de-un-texto-preescolar`.

## #112 `coin-stall` — "El puesto de Otto" (2.MD.C.8 → **2.º**, eje **Magnitudes y medida** auto-map) `332681eb` — ABRE DINERO; WRAPPER 0-core, `coinSetL10n.es`+`roundsL10n.es`
Contar dinero: pagar precio exacto / contar la caja / dar cambio / decir si alcanza / cambiar monedas. 7 cogs (count-set,
make-amount, fewest, change, enough, two-ways, trade). **0-core:** `coin-stall-core.js` es DENOMINATION-AGNOSTIC (lee
`round.coinSet`; el wrapper `_loadActivity` inyecta `coinSetL10n[LANG]` en cada ronda); las monedas se dibujan
PROGRAMÁTICAMENTE de `{glyph,tint,diameter}` — SIN imágenes. **0 líneas a `coin-stall-core.js`.** Es la localización canónica
de dinero US$/Euro→**peso mexicano**.
- **⚠ coinSet OPERATOR-RULED: pesos + 50¢ (5 monedas: 50¢·$1·$2·$5·$10)** — las que un niño MX maneja a diario (los centavos
  5/10/20¢ están fuera de circulación → excluidos; 50¢ = el único centavo, honra «pesos y centavos» SEP). Los 4 sets candidatos
  son CANÓNICOS (greedy-óptimo, brute-force) → la elección fue pedagógica. Valores {50,100,200,500,1000}.
- **NOTACIÓN `fmt` es (crítica, 2.º SIN decimal):** «N centavos» (<100) · «$N» (peso entero) · «$N y M centavos» (mixto). El
  decimal ($2.50) es 3.º-4.º. Precios múltiplos de 50¢ (único sub-peso). **14 rondas, solvability verificada contra el core**
  (make/fewest/change/two-ways/trade componibles; enough verdict correcto; count-set total∈options).
- **GRADO 2.º** (manifest '2' → «segundo grado» AUTO, SIN GRADE_OVERRIDE). **EJE «Magnitudes y medida» AUTO-MAPEA → SIN
  STRAND_OVERRIDE** (strand-names «Measurement & Data».es; igual que clock #105; el override de existe porque M&D no tenía de).
- **Mascota «Otto la nutria»** (🦦 otter=nutria); title «El puesto de Otto». `legendTier:'none'` en todas (glyph muestra valor
  → sin leyenda; evita el string US «1¢·5¢·10¢·25¢»). Wrapper: `fmt` es + `strings` es(12) + `_goalChip` es(Paga/Da el cambio
  de/Haz/Cambia por) + enough-opts es(No alcanza/Justo/Es de más) + speak es-MX + `_coin` aria es. §A.13.62 GREEN es 84/84 +
  en 84/84; critic PASS (pesos MX, sin €/decimal, chips es). wrapper 9.340; `?v=6`. slug `contar-dinero-pesos-y-centavos-segundo-grado`.

## #113 `domino-two-part` — "Pancho el pingüino" (RF.1.3.e → **1.º**, eje **Lectura**) `d7a68f5b` — ABRE SILABEO/lectura silábica; WRAPPER 0-core, `roundsL10n.es`
Leer por sílabas / método silábico: se muestra una palabra bisílaba PARTIDA con middot (ga·to) + se habla; 3 dibujos; el niño
une las sílabas y toca el dibujo. **0-core bridge:** `read-bisyllable-core.js` grada `choice.noun===round.word` (word = EN image-key
del correcto; Core INTACTO); la ronda agrega `displayWord`/`displaySyl` (split es, mostrado) + por-choice `es` (etiqueta tile).
**0 líneas a `read-bisyllable-core.js` / penguin SVG.** Es el reemplazo espiritual de la síntesis silábica diferida en #109.
- **⚠ GENERALIZACIÓN del wrapper:** el archivo (single-activity) estaba HARDCODED a `.de` para la etiqueta tile (líneas 69 + 100);
  es requirió `s.de`→`s[LANG]` / `o.de`→`o[LANG]` (seguro: de→`[de]` idéntico, en→`[en]` undefined→noun; **de verificado byte-idéntico**
  en runtime: Katze/Kamel/Kuchen intactas). + 7 strings es + rama aria es.
- **9 rondas (3/3/3 bands), targets distintos, choices[0]=correcto, ≥1 decoy shared-onset** (primera LETRA; patrón vocal-inicial
  alemán E·sel/Ei·chel — oso/ojo comparten «o»), todas imagen-verificada (reusa las 19 palabras de #106/#108): ga·to|gallo · pa·to|pan
  · ca·sa|cama · me·sa|melón · va·ca|vaso · ra·na|ratón · o·so|ojo · pe·ra|pez · so·fá|sol. Splits triviales CV·CV/V·CV (es GREEN §20.7).
- **GRADO 1.º** (manifest '1' → «primer grado» AUTO, **SIN GRADE_OVERRIDE**; método silábico = 1.º). **EJE «Lectura»**
  (`STRAND_OVERRIDE es`; MISMO chip que #108 read-cvc; RF no auto-mapea es). **Mascota «Pancho el pingüino»** (nombre VISIBLE en el
  string `dominoIntro` «¡Hola, soy Pancho!…»; penguin SVG se queda, aria inglés decorativo igual que de). title.es «Leer por sílabas».
  §A.13.62 GREEN es 54/54 + en 48/48; critic PASS (middot + acentos + etiquetas es, 0 alemán/inglés). wrapper 9.339; `?v=3`. slug
  `leer-por-silabas-palabras-de-dos-silabas-primer-grado`. ⚠ ver el 🐞 de-defect pre-existente arriba.

## #110 `fraction-equiv` — "La panadería de Migaja" (3.NF.A.3 → **4.º**, eje **Sentido numérico** auto-map) `2d8906db` — ABRE FRACCIONES a 4.º; WRAPPER 0-core, LOCALE-NEUTRAL (NO roundsL10n)
Fracciones equivalentes: se muestra una fracción de referencia como barra sombreada (+ hablada como palabra, «un medio») + 3
barras candidatas; el niño toca la que muestra la MISMA cantidad. Grade = equivalencia por producto cruzado
(`fraction-equiv-core.js`). **Core LOCALE-NEUTRAL: 8 rondas numéricas puras compartidas con EN → SIN roundsL10n.** El build es =
chrome de capa-actividad + helper TTS de fracción en español. **0 líneas a `fraction-equiv-core.js`.**
- **GRADO 4.º** (`GRADE_OVERRIDE es:'4'`, override manifest '3'; fracciones equivalentes = 4.º SEP/NEM, 3.º = fracciones
  básicas/reparto; coincide con de Klasse 4 + fr CM1). **REUSA la infra grade_4 YA EXISTENTE** (del de #110: `GRADE_KEY_MAP['4']`,
  `gradeToAgeRange es '4'='9-10'`, `seo.educational_level.grade_4 es «4.º de primaria»`) → NO new infra, NO cap-break decision.
- **EJE «Sentido numérico» AUTO-MAPEA → SIN STRAND_OVERRIDE** (strand-names.ts `Number & Operations—Fractions`.es ya = «Sentido
  numérico», puesto por fox-forge 3.NF.A.1; §10.4 read-from-SoT — el override de/fr existe porque strand-names NO tenía de/fr).
- **helper `fraccionwort`** (mirror de bruchwort): NUMCARD_ES + FRACNOUN_ES (medio/tercio/cuarto/quinto/sexto/octavo) → 1/2 «un
  medio», 2/4 «dos cuartos», 3/4 «tres cuartos» (num>1 → +s). TTS «Migaja preparó un medio. ¿Qué fracción...?» lang:es.
- **Mascota «Migaja la ratona»** (migaja = crumb, femenino como de die Maus/fr Miette); title «La panadería de Migaja».
  Child-facing = «la misma cantidad»; parent-prose usa «fracciones equivalentes». Wrapper: `L.es`(8: q/win/winSame/hear/nudge/
  more/fewer/less) + fraccionwort + strings.title/instruction es + 3 branches (aria «1 de 2» / TTS / _srMirror « de »).
  §A.13.62 GREEN es 48/48 + en 48/48; critic PASS (acentos + barras-fracción coherentes). wrapper 9.338; cache-buster `?v=5`.
  slug `fracciones-equivalentes-cuarto-grado`. **⚠ manifest fraction-equiv NO round-trip byte-idéntico** (escape unicode) →
  edité por TEXTO (slug/title/intro).

## #108 `choice-board.read-cvc-word` — "Lola la lechuza" (RF.K.3 → **1.º**, eje **Lectura**) `a4471a5b` — ABRE LECTURA en choice-board es; WRAPPER 0-core, `roundsL10n.es` (SHARED file)
Erstlesen / leer las primeras palabras: se muestra una **palabra escrita** (sujeto de texto) + **4 dibujos**; el niño la
decodifica y toca su dibujo. Grade = `answer===correct.noun`. **Invariante que fuerza la decodificación: ≥1 distractor
comparte las 2 PRIMERAS LETRAS del target** (onset-twin, p.ej. gato↔gallo) → hay que leer TODA la palabra, no solo el inicio.
**SIN audio.** El template `read-cvc-word` usa `_pool`+`nextTask` → reshuffle por-pasada (§A.13.60 ok). Locale por
`window.LCS.i18n.current`→`roundsL10n.es`. **0 líneas a `choice-board-core.js`.**
- **⚠ ARCHIVOS COMPARTIDOS** (`choice-board-activity.js` + `-activities.json` sirven MUCHAS actividades). Ediciones es
  ADITIVAS SOLO (3 strings + roundsL10n.es/slug/title/intro en la fila read-cvc). **DoD incluyó spot-check de una actividad
  choice-board NO-relacionada** (which-more GREEN — sin regresión; precedente shared-file del de #108).
- **9 rondas, 4 opciones, targets distintos, 1 onset-twin/ronda, todas imagen-verificada color** (18 palabras): gato|gallo(ga)
  · pato|pan(pa) · sol|sofá(so) · casa|cama(ca) · pez|pera(pe) · mesa|melón(me) · vaca|vaso(va) · rana|ratón(ra) · león|
  leche(le). Ordenadas simple→difícil (león al final = acento + hiato le-ón). `word` MINÚSCULA (sustantivo común es; correcto
  para lectores iniciales; = el sujeto impreso + aria). Shape: `{word, correct:{noun,themeDir,word}, distractors:[×3]}`.
- **GRADO 1.º** (`GRADE_OVERRIDE es:'1'`, override manifest 'K'; leer palabras = 1.º NEM Fase 3, principio alfabético;
  mirror de Klasse 1). **EJE «Lectura»** (`STRAND_OVERRIDE es`; el default RF es «Comprensión lectora» SOBREESTIMA —
  decodificar palabra suelta es lectura inicial; distinto de #106 «Conciencia fonémica» + #102 «Conciencia fonológica»).
- **Mascota «Lola la lechuza»** (la lechuza mira con atención para leer; MX-familiar). ⚠ el choice-board NO renderiza
  mascota en el iframe (chrome genérico «Actividad de elección») → «Lola la lechuza» vive SOLO en prosa + page_title (SEO).
- Wrapper: 3 strings es add-only (`promptReadWord.es` «Lee la palabra. Toca el dibujo que le corresponde.» + `hintPickPicture.es`
  + `hintReadWhole.es`). §A.13.62 GREEN es 54/54 + en 54/54 + which-more spot-check GREEN; critic PASS (acentos incl. león;
  respuesta correcta presente en las 9). wrapper 9.337; cache-buster `?v=76`. slug `leer-primeras-palabras-primer-grado`.
  **⚠ manifest ES 2-space canónico** (round-trip byte-idéntico → inyecté con `JSON.stringify(_,null,2)`).

## #106 `sound-boxes` — "Coco el koala" (RF.K.2.d → **1.º**, eje **Conciencia fonémica**) `e441cfe6` — ABRE EL FACET DE FONEMAS; WRAPPER 0-core, `roundsL10n.es`
Conciencia fonémica: aislar el sonido **inicial / de en medio / final** de una palabra corta. El niño ve una palabra
(imagen + 3 cajitas Elkonin, una marcada = la posición) + «🔊 Escúchalo» → toca el dibujo (de 3) cuyo **sonido en esa
posición coincide**. Core `sound-boxes-core.js` grada `option[pos]===target[pos]` sobre **claves de SONIDO fonético**
(z→`s` seseo, c→`k`, v→`b`, j→`j`, rr→`rr`) → grafema≠fonema nunca falla; respuesta DERIVADA, nunca almacenada.
**0-core WRAPPER + `roundsL10n.es`** (mirror de #106). **Contenido REUSA los valores fonéticos ya bendecidos + shipeados
del tool-bank es** (`sound-boxes-bank-es.json` s2 «conciencia fonémica»). **0 líneas a `sound-boxes-core.js`.**
- **9 rondas (4b/3e/2m como el de), todas 1-sola-coincidencia (`Core.oracle`), todas imagen-verificada color:** sol·s/o/l
  (sun) · sal·s/a/l (salt) · pan·p/a/n (bread) · pez·p/e/**s** (fish, z=/s/) · col·**k**/o/l (cabbage, c=/k/) · bus·b/u/s
  (bus) · oso·o/s/o (bear) · ojo·o/**j**/o (eye) · oca·o/**k**/a (goose). ⚠ **la imagen de "salt" trae "SALT" impreso**
  (asset de biblioteca compartido con de/en; audio-first lo mitiga — critic PASS, no-bloqueante).
- **GRADO 1.º** (`GRADE_OVERRIDE es:'1'`, override manifest 'K'; conciencia fonémica plena = puente al principio
  alfabético NEM Fase 3, un peldaño ARRIBA de rhyme-shop preescolar/holística; mirror de Klasse 1).
- **EJE «Conciencia fonémica»** (`STRAND_OVERRIDE es`; el término del tool-bank s2; analítica/fonema ⊂ la «Conciencia
  fonológica» holística de rhyme-shop #102; RF NO tiene auto-map es → sin override filtra el falso «Comprensión lectora»).
- **Mascota «Coco el koala»** (orejas enormes = oyente; `cocoSVG` se queda; el SVG gris lee un poco ratonesco pequeño pero
  ES el koala intencional). Wrapper: `POS_WORD.es`{inicial/de en medio/final} + `L.es`(8) + `wordOf` es-extend (word
  minúscula, sustantivo común) + `strings.title/instruction.es` + `_srMirror` es. §A.13.62 GREEN es 54/54 + en 54/54;
  critic PASS 0-bloqueante (box-highlight correcto por posición en las 9 rondas). wrapper 9.336; cache-buster `?v=6`. slug
  `sonido-inicial-medio-y-final-conciencia-fonemica-primer-grado`. **⚠ manifest ES 2-space canónico** (round-trip
  byte-idéntico → inyecté con `JSON.stringify(_,null,2)`).

## #105 `clock-convert` — "El reloj de Quico" (2.MD.C.7 → **3.º**, eje **Magnitudes y medida** auto-map) `5298b49d` — WRAPPER 0-core, NO roundsL10n
Leer el reloj de **24 horas** y convertir 12↔24. Mecánica: dan una hora en una notación, tocas la MISMA hora escrita de la
otra forma (de 3 tarjetas). 2 dirs: **12to24** (dan «3:00 de la tarde» → toca «15:00») · **24to12** (dan «20:00» → toca «8:00
de la noche»). El **lado 24h es universal** («15:00», sin localizar); el **lado 12h = la forma hablada es** `{h12}:{mm} {parte
del día}`. Las 9 rondas son enteros locale-neutros → **SIN roundsL10n**; grading `options[i]===h24`; todo el display fluye por
`Core.givenStr/optionStr`, **sombreado** por `es12str/esGivenStr/esOptionStr` + una tabla `MOMENT_ES` de 24 entradas
(parte-del-día). **0 líneas a `clock-convert-core.js`.**
- **MOMENT_ES (convención MX, index 0→23):** 0 noche · **1-5 madrugada** · **6-11 mañana** · **12 del mediodía** · **13-18
  tarde** · **19-23 noche**. ⚠ decisivos: madrugada 1-5 (NO noche); 12 = del mediodía (instante propio); 19:00/7 p.m. = de la
  NOCHE (la tarde acaba 18:xx). Los 9 pares distractores caen en etiquetas DISTINTAS (8/20, 2/14, 11/23, 4/16, 6/18, 1/13,
  7/19, 9/21, 3/15).
- **GRADO 3.º** (`GRADE_OVERRIDE es:'3'`, override del manifest '2' — la maestra: 24h + conversión + mapear parte-del-día es
  un paso ARRIBA: clock-ampm 1.º < clock-read 2.º < **clock-convert 3.º**; 24h es tema REAL SEP en horarios). **EJE «Magnitudes
  y medida» AUTO-MAPEA → SIN STRAND_OVERRIDE** (strand-names «Measurement & Data».es; el tiempo es magnitud).
- **Mascota «Quico»** (juego quiquiriquí, como el «Kiko» del de); título «El reloj de Quico»; instrucción «Lee la hora y luego
  toca la misma hora escrita de la otra forma.». `_srMirror` es. win invariante «¡Sí! {given} es lo mismo que {answer}.» (evita
  agreement son/es con los placeholders que se intercambian).
- **⚠ tarjetas 12h largas** («8:00 de la noche», «…de la madrugada» ~16-18 chars): `.cv-choice` ya envuelve (overflow-wrap,
  sin nowrap) → wrap limpio a 2-3 líneas dentro de la tarjeta a 360; critic PASS 27/27 (madrugada@360 = la más ajustada pero
  cabe). §A.13.62 GREEN es 54/54 + en 54/54; critic 0 defectos. slug `reloj-de-24-horas-leer-la-hora-tercer-grado`; wrapper
  9.335; cache-buster `?v=4`.

## #104 `penny-alphabet-trace` — "Traza el alfabeto con Penny" (L.K.1.a → **1.º**, eje **Escritura: trazo de letras**) `83d0903a` — ABRE ESCRITURA; el build MÁS SIMPLE
Formación de letras / trazo: Penny el lápiz — el niño TRAZA cada letra (empieza en el punto, arrastra cada trazo en orden;
la letra se rellena al formarse). SVG puro, sin imágenes/audio-deps. Core `alphabet-trace-core.js` tiene los glyphs +
grading de orden-de-trazo. **El build MÁS SIMPLE: SIN `roundsL10n`, SIN imágenes, SIN contenido nuevo** — las 52 rondas EN
(26 mayúsc + 26 minúsc base Latín) se REUSAN VERBATIM (los glyphs son language-neutral). Todo el rebuild = localización de
strings/framing en la capa-actividad. **0 líneas a `alphabet-trace-core.js`.** Wrapper: `strings.es`(10) + branches chip-label
«Traza: » / chip-aria / sayWin speak «¡Hermosa!» / pencilSVG aria «Penny el lápiz». Headline CORTO «Empieza en el punto y
traza.» (precaución del wrap de 320px del de). **GRADO 1.º** (maestra: trazo sistemático de las 26 letras convencionales =
NEM Fase 3/1.º; preescolar Fase 2 = grafomotricidad de READINESS, trazos libres + el propio nombre, NO la formación
deliberada del alfabeto; content-drives-higher = de/fr year 1). **EJE «Escritura: trazo de letras»** (STRAND_OVERRIDE;
mecánica de escritura, espeja el de "Schreiben – Schreibfertigkeiten"; distinto de «Ortografía»/«Reflexión sobre la lengua»;
«Producción de textos escritos» demasiado amplio). **⚠ BASE-26 (sin ñ):** el glyph-table del core solo tiene A-Z/a-z; ñ =
n+virgulilla necesita un glyph NUEVO = cambio de core, fuera de scope (precedente ä/ö/ü del de). ñ = FUTURO alta prioridad.
**Guardrail de framing: NO afirmar «alfabeto completo/todas las letras»** (español = 27) — copy dice «las 26 letras». §A.13.62
GREEN es 240/240 + en 240/240; critic limpio (ambos badges MAYÚSCULA/minúscula + glyphs cargan). wrapper 9.334; cache-buster
`?v=3`. slug `trazar-las-letras-del-abecedario-primer-grado`.

## #103 `mango-animal-groups` — "Mango el mono" (L.2.1.a → **3.º**, eje **Ampliación del vocabulario**) `adadf0e3` — WRAPPER data-swap
Sustantivos colectivos: el niño ve una imagen real de animal + oye "un grupo de {plural}" → toca el colectivo entre 3
tiles-palabra desnudas (imagen de ovejas → «rebaño»). Core `collective-noun-core.js` = matcher puro (`grade = choice.word
=== correct`); **0-core WRAPPER + `roundsL10n.es`** (colectivos españoles ≠ inglés/alemán). Image-bound: `subject:{noun(=EN
image key), themeDir}` VERBATIM del de (mismas imágenes, verificadas color). 8 rondas, conjunto colectivo
**manada/rebaño/bandada/cardumen/enjambre**; el TWIST (pocos nombres cubren muchos): manada×3 (elefantes/lobos/leones) ·
rebaño×2 (vacas/ovejas) · bandada/cardumen/enjambre ×1. **Tiles DESNUDAS (sin artículo)** — evita la trampa de género (la
manada/el rebaño/la bandada/el cardumen/el enjambre). ⚠ vacas→**rebaño** (ganado; manada = silvestres); **cardumen** (canónico
SEP, NO banco de peces); **pájaros** (NO aves, más concreto K-2). Wrapper: `strings.es`(8) + branches `groupPhrase`(«un grupo
de {plural}» — gender-safe) / `speak` u.lang es-MX / `monkeySVG` aria / pic aria. Mascota «Mango el mono». **GRADO 3.º =
`GRADE_OVERRIDE es:'3'`** (override del manifest '2' — colectivos = tema canónico Español 3.º NEM Fase 4, léxico de baja
frecuencia; **el escalón MÁS ALTO de la familia vocab es** antónimos-1.º→categorías/matices-2.º→colectivos-3.º; diverge HACIA
ARRIBA de en/de Grade 2). **EJE «Ampliación del vocabulario»** (STRAND_OVERRIDE; el chip describe lo que el niño HACE =
recuperación léxica pura, NO gramática; MISMO chip de toda la familia vocab es — opposites/olive/roary/ziggy/fern/gabby; el
auto-map «Language»→«Reflexión sobre la lengua» es GRAMÁTICA). §A.13.62 GREEN es 48/48 + en 48/48; critic limpio (8/8 imágenes
cargan). wrapper 9.333; cache-buster `?v=4`. slug `sustantivos-colectivos-de-animales-tercer-grado`. **⚠ manifest formato
compacto (1-línea-por-ronda) → editar por texto.**

## #102 `rhyme-shop` — "El vagón de rimas de Momo el Mapache" (RF.K.2.a → **preescolar**, eje **Conciencia fonológica**) `eb749057` — ABRE RIMAS; 1.ª es PREESCOLAR
Juego de rimas AUDIO-FIRST: cada ronda muestra IMÁGENES reales de la biblioteca (palabra impresa + tap-para-oír). 7 cogs
(judge/pick/odd/sort/chant/field/chain). **WRAPPER 0-core:** el core es un matcher de igualdad de `rimeKey`; todo el
contenido de rima se auto-escribe en `roundsL10n.es` (las rimas españolas ≠ inglés/alemán, como el build de). **0 líneas a
`rhyme-shop-core.js`.** **IMAGE-BOUND:** cada token `{word(=nombre es), noun(=image key EN), themeDir, category, rimeKey,
spelledRime}` → `/image-library-webp/themes/<themeDir>/<noun>@2x.webp`. **⚠ Las palabras que riman DEBEN ser sustantivos
picturables que EXISTAN como imagen a color** (node fs-assert de cada token — el precedente de). 8 familias rima-consonante
ear-perfect (de sustantivos verificados): **-ato**(gato/pato/zapato) · **-ón** ancla 3+ (ratón/limón/avión/camión/león) ·
-ana(manzana/campana) · -eta(galleta/camiseta) · -eja(oveja) · -osa(rosa) · -ella(estrella) · -illa(ardilla). 10 rondas,
integridad-de-rima + runtime shape-test verde (chain Ratón→Limón→Avión). ⚠ **chaqueta→camiseta** (chaqueta = España + jerga
vulgar MX). ⚠ trampas: -eja /exa/ ≠ -ella /eʝa/ ≠ -illa /iʝa/; acentos ó cargan la rima -ón (nunca sin tilde). Wrapper:
`L.es`(16 cogs) + `strings.es`(9) + `wordOf` branch es. Mascota Rosa/Rudi → **«Momo el Mapache»**. **GRADO preescolar =
`GRADE_OVERRIDE es:'PK'`** (conciencia fonológica = firma del trabajo de Lenguajes en preescolar SEP/NEM Fase 2; **1.ª es
que baja a preescolar; NO el push-up de/fr**; precedente comparison-creek/nesting-pots 'PK'). **EJE «Conciencia fonológica»**
(`STRAND_OVERRIDE`; el default es de RF en strand-names.ts = «Comprensión lectora» es FALSO para rima aural — misma razón que
el de 'Sprechen und Zuhören'). ring→«esfera» (evita globo=balloon; casa con el globo-visual). §A.13.62 GREEN es 60/60 + en
72/72; critic limpio (100% imágenes cargan). wrapper 9.332; cache-buster `?v=6`. slug
`rimas-palabras-que-riman-conciencia-fonologica-preescolar`. **⚠ manifest ES 2-space canónico** (a diferencia de contraction/
sock-and-shadow que eran compactos) → `JSON.stringify(_,null,2)` da diff limpio.

## #101 `sock-and-shadow` — "Calcetín y Sombra" (SL.K.6 → **1.º**, eje **Oralidad**) `3fbe3c5e` — ABRE el eje ORALIDAD es
Descripción referencial (*describir con claridad para hacerse entender*). Calcetín ve la caja; Sombra está tras la cortina
y solo ESCUCHA. El niño arma la frase de Calcetín con chips (objeto + color/tamaño/lugar) → "Dile a Sombra" → Sombra trae.
Muy vago → sostiene AMBOS (nombra la categoría faltante); de más → "se me olvidó la mitad"; justo → correcto. + 1 ronda
MOOD (sentimiento + razón con «porque»). **WRAPPER** (como el fr #112): las 7 rondas son enum-keys locale-neutral → **SIN
roundsL10n**; toda la superficie es = label-maps + `esUtter()` + branches en la capa-actividad. **0 líneas a
`puppet-speak-core.js`.** **CONCORDANCIA DE GÉNERO** (modelo fr, NO el -e uniforme de de): `GENDER_ES` por-sustantivo +
`COLOR_ES`/`SIZE_ES` concordadas; orden **artículo + sustantivo + COLOR + TAMAÑO + posición**. 7 frases-ganadoras
(assert): «La taza» · «La taza roja» · «El sombrero grande» · «La pelota de arriba» · «El osito café grande» · «El carro
rojo» · «Estoy triste porque se me cayó la torre.» **café/azul/verde/grande INVARIABLES; rojo→roja/blanco→blanca/chico→chica
concuerdan.** Personaje **Calcetín(m) & Sombra(f)**. MOOD gender-safe: **«Me da coraje»** (invariable — evita la fuga masc
de «Estoy enojado»); chip «enojado» ≠ habla «Me da coraje» (deliberado). 16 strings es + branches objSVG-aria/bubble(«»)/
_chipLabel/_tellShadow/no-peek(«¡Sin espiar!»). **GRADO 1.º** (maestra SEP/NEM Fase 3, componente Oralidad; comunicación
referencial con criterio de éxito, por encima de la oralidad abierta de preescolar; paridad DE Klasse 1/FR CP) →
`GRADE_OVERRIDE es:'1'`. **EJE «Oralidad»** (término literal NEM del strand oral; strand-names.ts NO tiene «Speaking &
Listening» es → `STRAND_OVERRIDE es:'Oralidad'` — como las RL/RI, NO auto-mapea). 🩹 fix narrow-phone: los chips MOOD es
(«torre caída»/«osito perdido»/«no alcanzo»/«por favor») más anchos que en → overflow 320×640 por 18px → bloque `ss-es`
@360 (precedente fr `ss-fr`; §A.13.62). §A.13.62 GREEN es 42/42 + en 42/42; critic limpio; wrapper 9.331; cache-buster
`?v=11`. slug `describir-con-claridad-para-que-te-entiendan-primer-grado`. **⚠ manifest formato compacto (1-línea-por-locale)
— editar por texto.**

## #100 `contraction` — "Rulo junta las palabras" (L.2.2.c → **2.º**, eje **Reflexión sobre la lengua**) `0b485111` — PRIMER WRAPPER es
**El PRIMER build-wrapper de la tanda es.** Rebuild: contracciones inglesas (don't) → las DOS contracciones obligatorias
del español **«al» (a+el) / «del» (de+el)** (tema SEP central). El core `contraction-core.js` hornea la lógica de
apóstrofo inglés → se localiza vía el **wrapper de capa-actividad ya probado** (de/fr): `FUSION_LANGS`, `deChips`/
`deIsAnswer` leen `round.fusion`/`round.foils`, saltando el core. **0 líneas al core.** Mecanismo: ronda `{id,band,word1,
word2,fusion,foils[2]}` muestra "word1 + word2" → toca 1 de 3 chips `[fusion,...foils]`; correcto = string===fusion.
El español solo tiene 2 contracciones → **la variedad viene de los sustantivos** (8 contextos masculinos distintos:
parque/gato/mercado/salón/río/campo/bosque/árbol; 4 al + 4 del; foils = la forma sin juntar "a el X" + la contracción con
preposición equivocada "del X"). **GRADO 2.º = default** (maestra: SEP Fase 3; divergencia PRINCIPIADA del alemán Klasse 3
— el diseño tap-to-choose NO carga metalenguaje de clases-de-palabra → no fuerza el bump; en YA es Grade 2 → **SIN
GRADE_OVERRIDE es**). **EJE «Reflexión sobre la lengua» AUTO-MAPEA** desde `strand-names.ts` `Language.es` → **SIN
STRAND_OVERRIDE es** (⚠ 🔑 primera actividad es cuyo strand auto-mapea; RL/RI necesitaban override porque «Reading:
Literature/Informational» no tienen es). 🎭 personaje re-tematizado Nib(apóstrofo)→**«Rulo»** (un rulo/rizo; al/del SIN
apóstrofo — misma razón que el re-theme alemán); título «Rulo junta las palabras»; SVG remolino coral se mantiene.
⚠ trampas: al/del SIN apóstrofo nunca; solo `el` contrae (nunca a+la/los foils); `él` acentuado nunca contrae; el foil
sin-juntar "a el parque" es distractor intencional; árbol vocal-inicial = trampa deliberada. Wrapper edits: `L.es`,
`FUSION_LANGS.es`, `strings` (title/instruction/q), hear-text/chip-aria/`_srMirror` branches es. page.tsx = SOLO wrapper
9.330. slug `contracciones-al-y-del-preposicion-articulo-segundo-grado`. §A.13.62 GREEN es 48/48 + en 54/54; critic
limpio; variety 8≥7 + nextTask reshuffle; cache-buster `?v=4`. **⚠ manifest usa formato compacto custom (NO 2-space
canónico) — editar por texto preservando el estilo, NO `JSON.stringify(_,null,2)` (reformatea todo el archivo).**

## #98 `otto-picture-book` — "El libro de imágenes de Otto" (RL.K.7 → **1.º**, eje **Comprensión de textos literarios**) `55a4988d`
**Bild-Text-Bezug / relación imagen-texto** (el único mecanismo picture↔text del set; faceta RL fresca). Otto, el búho,
dibujó un cuento de 4 imágenes; el niño ESCUCHA todo el cuento, luego Otto lee UNA parte en voz alta + la muestra como
texto («Otto lee: <oración>») y el niño toca la imagen (de las 4 del MISMO cuento) que muestra ese momento. **⚠ CORRECCIÓN
al handoff #97: NO era image-bound** — los paneles son **emoji STUBS** (`EMOJI` map, language-neutral) y grada por
identidad de **panel-id locale-neutral** (`Core.grade(round, sel)`, sel = picture-id; el `target` beat → su `panel`) →
misma forma limpia 0-core que wake-up-pip #97. `picture-moment-core.js` + `EMOJI` intactos. es localiza SÓLO los 32
captions (8 cuentos × 4 beats) vía deep-clone de `params.rounds` → `roundsL10n.es` (assert invariancia: sólo captions).
Forma marina/marlo (shell `api.t`, `_loadActivity` elige `roundsL10n[LANG]`, `speak u.lang`+es-MX). 9 `strings` es + **3
aria LANG-branches** (ottoSVG «Otto, el búho»; botón lector «Leer la oración»; card «Imagen »). **GRADO 1.º** (maestra
SEP/NEM Fase 3, PDA «relaciona el texto con las ilustraciones»; reconocimiento concreto; mismo peldaño que picture-story
#82/story-spine #92; paridad DE Klasse 1 — nota: fr NO tomó grade override, usó GS). **EJE «Comprensión de textos
literarios»** (STRAND_OVERRIDE por-actividad, comprende+LEE texto-mostrado+audio regla story-spine #92; strand-names.ts
NO tocado — RL solo en/de). 🎭 nombres (aprobados en plan, sin key.who → swaps libres): Lina/Otto KEPT · Finn→Nico ·
Mae→**Sofi** (evita *Mía*=posesivo) · Theo→Teo · Sam→**Memo** · Bo→**Bruno**. Trampas: cubeta(≠balde/cubo) · canasta(≠cesta)
· mordida(≠mordisco) · botas de lluvia(≠de agua) · arcoíris(1 palabra) · lámpara(≠linterna) · concha=🐚(≠caracol) ·
dativo `le` (sand-3/apple-4/snow-3) · nest-4 «pajarito» (no «pollito» — pájaro genérico coherente; no petirrojo).
🩹 Fix EN pre-existente (opb-say Otto-intro clip a 320×640): short-viewport `-webkit-line-clamp` 2→3 (headroom vertical).
§A.13.62 GREEN es 48/48 + en 48/48; critic limpio; wrapper 9.329; cache-buster `?v=5`. slug
`relacionar-oracion-con-imagen-cuento-ilustrado-primer-grado`.

## #97 `wake-up-pip` — "¡Despierta, Pip!" (RL.K.2 → **2.º**, eje **Comprensión de textos literarios**) `bf558f25`
Pip (osito dormilón) se perdió el cuento: el niño MIRA una película de 4 paneles (emoji+caption) y la RECONSTRUYE en
orden causal en una escalera + "recuenta". 3 modos: ORDER (secuencia 4 beats) / SUPPLY-KEY (elige el beat clave que
falta, sobre un detalle trivial-pero-cierto + un suceso de otro cuento + un personaje que no aparece = juicio de
RELEVANCIA) / FIX-MEMORY (arregla un beat cambiado/ajeno). Motor `retell-story-core.js` grada por beat-ids + `requires`
topo + `key.who`; **0 líneas de core**. es localiza SÓLO los 43 captions (32 beats keyed por `panel` + 11 distractores
keyed por `id`) vía deep-clone de `params.rounds` → `roundsL10n.es` (assert de invariancia: estructura blanqueada
deep-equal a EN, sólo captions cambian). Forma marina/marlo (shell `api.t`, en/de/fr, `_loadActivity` elige
`roundsL10n[LANG]`, `speak u.lang` +es-MX). **GRADO 2.º** (SEP: recontar con secuencia + distinguir importante/secundaria;
NO anti-superficie → bajo juniper/marlo 3.º; paridad DE Klasse 2; regla #82). **EJE «Comprensión de textos literarios»**
(STRAND_OVERRIDE por-actividad, comprende+LEE captions+audio-apoyo, precedente story-spine #92; strand-names.ts NO tocado —
RL sólo en/de → fuga inglés). 🎭 nombres (aprobados en plan, sin AskUserQuestion): Pip/Sam/Lina/Ada KEPT · **Duke→Rex**
(maestra rechazó "Firulais"=callejero/cómico) · **Mira→Mila** (colisión con imperativo *mira*) · Gus→Beto · Theo→Teo ·
Mom→Mamá. Trampas: `papalote`(≠cometa=cometa astro en MX) · `cuadro`(pintura terminada, paint-4)≠`pintura`(derramada,
paint-1) · dativo de interés `A Lina se le cae` · diminutivos de registro (semillita/calientita/esponjadito/piedritas).
🩹 **Fix de layout narrow-phone (defecto PRE-EXISTENTE presente en EN también — clase marina #91/marlo #94):** la escalera
de retell truncaba los captions con "…" (`.rt-sbody .rt-cap` clamp:1) + cut-off a 320×640; el `.rt-film` de watch era 2-col
apretado. Fix activity-layer: `.rt-film` single-column en phones (`@media max-width:640`), y bloque short-viewport FINAL
(`@media max-height:780`, DESPUÉS del bloque ≤480 para ganar el tie) que baja el caption de la escalera a **9.5px + clamp:2**
y comprime slot-heights → captions completos + 320/360 caben. Cura EN y es idénticamente. §A.13.62 GREEN es 48/48 + en 48/48;
critic limpio; wrapper 9.328. slug `volver-a-contar-un-cuento-orden-de-los-sucesos-segundo-grado`.

## #96 `two-tales` — "Dos lunas, dos cuentos" (RL.1.9 → **2.º**, eje **Comprensión de textos literarios**) `af9916d1`
Barba de Musgo (tortuga guardián de cuentos): 9 rondas, cada una = DOS cuentos lado a lado (Cuento dorado / Cuento
plateado; cada uno = glyph animal + resumen) + 3 tarjetas de experiencia; el niño toca lo que pasó en LOS DOS (same) o
en UN SOLO cuento (diff). PRIMERA actividad INTERTEXTUAL del set. Motor grada por tags ENUM locale-neutrales
(intersección=same / XOR=diff; 0 líneas de core `two-tales-core.js`). Forma custom `L`/`txt` (como story-spine #92):
es localiza SÓLO 6 `summary` + 6 `tagText` (tags+glyph verbatim). = `storiesL10n.es` (6, {subject,glyph,tags,summary})
+ `tagTextL10n.es` (6) + `L.es` (10) + `strings.es` (title/instruction). Sin ramas aria (SVGs aria-hidden).

🔑🔑 **INVARIANTE LOAD-BEARING: la frase del tag COMPARTIDO byte-idéntica en TODOS los que lo cargan** (toda la
pedagogía: el niño reconoce "en los dos" viendo la MISMA frase). Solución del lingüista: cada tag es una oración
INVARIANTE sin sujeto / objeto genérico (el género vive SÓLO en «Había un/una <animal>», NUNCA en el predicado):
LOST_FOUND «Perdió algo y lo encontró.» / GOT_HELP «Un amigo llegó a ayudar.» (×3) / TRIED_AGAIN «Siguió intentando.» /
SCARED_SAFE «Tuvo miedo y se sintió a salvo.» / FIXED_IT «Arregló lo que se rompió.» / SHARED «Compartió con un amigo.».
⚠ `a salvo` locución adverbial invariante (nunca concordar); `lo` en «perdió algo y lo encontró» refiere a `algo` (fijo);
la repetición verbatim ES la pedagogía (bloquear byte-a-byte, NO "variar el estilo"); `Había` imperfecto + pretérito
(NO perfecto peninsular); evitado `coger` + la deriva de clítico `lo/la ayudó` (objectless «Un amigo llegó a ayudar»).
🔑 **PREGUNTAS DE MODO (forma paralela de la maestra):** same «¿Qué pasó en LOS DOS cuentos?» / diff «¿Qué pasó en UN
SOLO cuento?» (ambas «qué pasó» = experiencia que casa las tarjetas; contraste puro en el cuantificador; CAPS en LOS
DOS/UN SOLO). El `tagText` label = la frase sin punto (casa la tarjeta con la oración del resumen). tabla de assert:
para cada tag, `tagText[tag]+"."` aparece verbatim en TODO resumen que carga el tag; y el PREDICADO DEL CORE replicado
sobre los stories es → exactamente 1 cardTag correcto por ronda (9/9, 5 same / 4 diff).
🔑 **GRADO 2.º** (maestra decisiva): comparar DOS textos (intertextual) por encima del texto único de 1.º, PERO
emparejable (frase compartida idéntica) NO anti-superficie → por debajo del 3.º de marlo/juniper; mismo peldaño que
linc #95. **EJE «Comprensión de textos literarios»** (STRAND_OVERRIDE por-actividad): comprende (compara) + LEE
(precedente story-spine #92); ambos cuentos literarios → mismo chip que picture-story #82/juniper #85/story-spine #92/
marlo #94. 🎭 **Decisiones operator-visibles (aprobadas en el plan, sin AskUserQuestion — precedente #95/#96):**
personaje «Barba de Musgo, el guardián de cuentos» (nombre significativo localizado, como de Moosbart/fr Barbe-de-Mousse);
etiquetas «Cuento dorado»/«Cuento plateado» (comparar CUENTOS no lunas, razonamiento alemán); título «Dos lunas, dos
cuentos». SEO slug `comparar-dos-cuentos-semejanzas-y-diferencias-segundo-grado` (head-term «comparar dos cuentos»).

## #95 `linc-fact-chain` — "La cadena de hechos de Linc" (RI.K.3 → **2.º**, eje **Comprensión de textos informativos**) `b6723200`
Linc la lagartija: 8 rondas, cada una = un hecho (stem) + una pregunta de modo; el niño toca el hecho que se CONECTA
— el que pasa DESPUÉS (secuencia) o el que pasa POR ESO (causa) — entre 2 distractores ciertos-pero-NO-conectados.
Motor grada por text-match exacto (`options[id]===answer`; 0 líneas de core `fact-connect-core.js`; `mode` audit-only).
Pool INDEPENDIENTE por locale. Forma marina/marlo (shell `api.t`): es = `strings.es` (7) + rama es aria-lagartija +
aria-stem + `u.lang` es-MX + `roundsL10n.es` (8). texto+SVG lagartija, audio-apoyo.

🔑 **INVARIANTE: EXACTAMENTE UN option === answer (byte-idéntico, incl. punto final); 2 distractores ciertos pero
SIN CONEXIÓN (nunca opuesto/reverso); rondas-causa = causa→efecto GENUINO.** 4 secuencia / 4 causa, bandas {1:3,2:3,3:2}.
🔑 **PREGUNTA DE MODO (pedagogía load-bearing):** secuencia → «¿Qué pasa después?» (temporal); causa → **«Por eso, ¿qué
pasa?»** (la maestra refinó el «¿Qué pasa por eso?» del lingüista — antepone el nexo causal «por eso» para que el niño
OIGA causa desde la 1.ª palabra; espeja el EN "So what happens?"/de "deshalb"; «entonces» rechazado por temporal). Los
dos stems NUNCA intercambiables (después=tiempo, por eso=causa).
🔑 **PERSONAJE CONSERVADO «Linc la lagartija»** (lingüista decisivo: el juego de palabras link/cadena ya era invisible
para el niño EN; la metáfora de cadena vive en el título + `lincIntro` «siguiente eslabón» + el 🔗; fr conservó Linc).
A diferencia del alemán (que renombró Linc→Ketti por el fork del operador), es conserva Linc como fr. **NO fork.**
🔑 **GRADO 2.º** (maestra decisiva): conectar dos hechos + razonamiento causal está por ENCIMA de la pura secuencia de
1.º, PERO los distractores son ciertos-pero-NO-conectados (NO trampa anti-superficie de calce léxico como marina/pearl)
→ por DEBAJO de su 3.º; mismo peldaño que field-guide #80. `GRADE_OVERRIDE es:'2'`; en Kindergarten. **EJE «Comprensión
de textos informativos»** (STRAND_OVERRIDE por-actividad): 2 compuertas → comprende (relaciona, no localiza) + LEE;
hechos informativos NO argumentativos (≠pearl) NO localizar (≠field-guide) → mismo chip que atlas #78/marina #91.
🇲🇽 `jugo` no zumo; `prender` no encender; `barda`, `bici`; orden VS presentacional («Crece una planta.») + «Te las
secas.» byte-idéntico para el ===. SEO slug `causa-y-efecto-secuencia-de-hechos-comprension-lectora-segundo-grado`
(encabeza con el head-term de alta demanda «causa y efecto»). Prosa `«»`, §A.13.29 ejemplos = rondas semilla + sol.

## #94 `marlo-magnifier` — "La lupa de Marlo" (RL.1.3 → **3.º**, eje **Comprensión de textos literarios**) `ec5dd9af`
Marlo el mapache (detective): 8 rondas, cada una = un cuento de 3 oraciones + una afirmación «{Personaje} es {rasgo}.»
+ 3 detalles; el niño toca el que PRUEBA el rasgo (una ACCIÓN que lo muestra SIN nombrar el adjetivo). Foils = ciertos
pero irrelevantes (ropa/casa/apariencia/comida). Motor grada por el booleano `detail.supports` (0 líneas de core
`trait-evidence-core.js`; `hasTraitWord`/`words`/`audit()` = AUDIT-only). 🔑 **Pool INDEPENDIENTE por locale** (la
respuesta es el `supports` self-contained → `_loadActivity` elige `roundsL10n[es]` en exclusiva; es NO es re-texto del
EN, como hizo el alemán). Forma marina/pearl (shell `api.t`): es = `strings.es` (10) + rama es de aria-mapache +
aria-pista + `u.lang` es-MX + `roundsL10n.es` (8). texto+SVG mapache, audio-apoyo (auto + 📖).

🔑🔑 **TRAMPA #1 — CONCORDANCIA DE GÉNERO (el español flexiona el adjetivo predicativo; el alemán NO — «ist {eig}»
plano):** la afirmación «{Personaje} es {rasgo}.» concuerda con el género del personaje. Solución: 3 rondas usan
adjetivos de género COMÚN (valiente/amable/paciente — a prueba de cambio de nombre); 5 fijan el género del personaje
para casar la forma -o/-a/∅ (curiosa→Lena F, cuidadoso→Teo M, honesto→Beni M, generosa→Nina F, trabajador→Max M). El
`traitWord` (stem para la auditoría de fuga) va TRUNCADO (valient/amabl/curios/cuidados/pacient/honest/generos/
trabajador) para casar formas de género/plural. ⚠ `Max es trabajador` (M morfema cero) es CORRECTO — NO agregar -o.
🔑 **INVARIANTE: pool independiente pero cada ronda = 1 `supports:true`; el detalle correcto muestra el rasgo por ACCIÓN
sin nombrar el adjetivo; NINGÚN detalle NI oración del cuento contiene el traitWord (no-leak exhaustivo, aserto).**
bandas {1:3,2:3,3:2}. 🇲🇽 `calcomanías` no pegatinas; `torta` (sándwich MX, no pastel); `cafés`=café-color no marrón;
evitado `coger`; diminutivos `pasitos`/`chiquita`/`andaba jugando` deliberados.
🔑 **GRADO 3.º** (maestra decisiva, NO fork): inferir un rasgo desde una acción (no está dicho) + respaldar con
evidencia del texto + descartar detalles ciertos-pero-irrelevantes = lectura inferencial, misma demanda que juniper #85
/ marina #91 / pearl #93 → 3.º. Regla #82; en Grade 1. **EJE «Comprensión de textos literarios» (STRAND_OVERRIDE
por-actividad):** 2 compuertas → comprende + LEE (cuento MOSTRADO + detalles leídos; 🔊 apoyo — precedente story-spine
#92); texto literario → mismo chip que picture-story #82/juniper #85/story-spine #92. strand-names.ts NO se toca.
Términos **rasgo/detalle/prueba** (característica/atributo/evidencia = formal, rechazados de la UI); label «Pista:»;
verbo portante `probar` en todo. Personaje Marlo conservado; aria «Marlo el mapache»; el emoji 🦝 renderiza (animal
correcto). 🐛 **FIX `.mgf-say` line-clamp 1→2** (capa-actividad; el globo de intro se recortaba en angosto en TODOS los
locales incl EN — clase marina #91; el clamp de 2 líneas lo limpia). SEO slug `rasgos-del-personaje-que-detalle-lo-
prueba-tercer-grado`; evitados análisis-del-personaje/caracterización/perfil (→secundaria). Prosa `«»`, §A.13.29
ejemplo = ronda valiente (claim + evidencia).

## #93 `pearl-opinion-page` — "La página de opiniones de Pearl" (RI.2.8 → **3.º**, eje **Comprensión de textos argumentativos** [chip NUEVO, operator-ratificado]) `6ba601f3`
Pearl la foca: 8 rondas, cada una = una OPINIÓN + 3 tarjetas; el niño toca la **razón** que la apoya (nueva info,
"¿por qué?"). Foils: **restate** (paráfrasis circular que repite la opinión con MÁXIMO solapamiento = la trampa) +
**offtopic** (cierto pero ajeno). Motor grada por `kind==='reason'` (0 líneas de core `reason-support-core.js`; el
`words`/`overlap` es AUDIT-only; `childView` sólo expone point+text, nunca kind). Forma marina #91 (shell `api.t`, sin
`L`/`txt`): es = `strings.es` (8) + rama es de aria-foca + aria-point + `u.lang` es-MX + `roundsL10n.es` (8). texto+SVG
(sin biblioteca de imágenes), audio-apoyo (🔊 + auto-lectura).

🔑 **CHIP NUEVO «Comprensión de textos argumentativos» (operator-ratificado, STRAND_OVERRIDE por-actividad):** pearl es
un texto de OPINIÓN+RAZÓN (argumentativo), NO informativo neutro. Las 2 compuertas dan comprende+lee, PERO la TIPOLOGÍA
argumentativa manda — el campo Lenguajes NEM separa informar de convencer/opinar → **DIVERGE de marina/atlas
«…informativos»** y del alemán (que colapsó lo argumentativo en Sachtexte). Precedente: author-purpose #84 ya diverge a
«Diversidad textual» cuando la tipología lo exige. 🔑 **Regla es-doctrina: la TIPOLOGÍA textual puede vencer el default
de las 2 compuertas** (informativo/expositivo vs argumentativo/opinión vs literario). strand-names.ts NO se toca.
🔑 **GRADO 3.º** (maestra decisiva, NO fork): MISMA máquina anti-superficie que marina #91 / juniper #85 — el restate
premia el calce léxico, la razón correcta aporta info nueva y comparte pocas palabras → castiga "elegir lo que suena
igual a la opinión". Regla #82. `GRADE_OVERRIDE es:'3'`; en Grade 2. Términos **opinión/razón/apoya** (argumento/tesis/
premisa = secundaria, rechazados de la UI). Banner «¿Cuál razón apoya la opinión?» (`apoya` = verbo portante, análogo
del alemán "stützt"; separa "da razón" de "solo repite").
🔑 **INVARIANTE-TRAMPA: preservar id/band/option-id/kind del EN; localizar SÓLO point+text.** El `restate` es paráfrasis
circular con MÁXIMO solapamiento (el modal `debería(n/mos)` byte-idéntico point↔restate); la `razón` aporta "¿por qué?"
nuevo con ~0 palabras compartidas (⚠ verbos deliberadamente DISTINTOS del point — caminar≠pasear — para no subir el
overlap de la razón). Assert accent-aware: restate-overlap ≥ reason-overlap (3-6 vs 0-1). ⚠ NO `porque` en ningún
restate (lo volvería 2.ª razón, rompe el Ein-Grund-Test). 🇲🇽 `huerto` no jardín (siembra comida); `trastes` no platos;
`camiones` no autobús; `casco`; `chicas`/`padres`/`de veras`/`seguido` (registro MX). **`foca` = SAFE** (el insulto no
se activa en marco de personaje antropomórfico — igual que `pájaro`). Personaje Pearl CONSERVADO (consistencia de marca;
aria «Pearl la foca»). El emoji 🦭 del globo renderiza (a diferencia del oso de marina — animal correcto). Prosa `«»`,
«su hijo/a», §A.13.29 ejemplos = ronda 1 (park opinion + reason). SEO slug `opinion-y-razones-cual-razon-apoya-la-
opinion-tercer-grado`; evitados argumento/tesis/argumentativo (→secundaria).

## #92 `story-spine` — "El taller de cuentos de Dot" (RL.K.3 → **1.º**, eje **Comprensión de textos literarios** [operator-ratificado]) `7e5fc79f`
Dot el dragón: 3 cuentos × 9 rondas; cada cuento = 3 viñetas con PIE DE TEXTO barajadas + tag setting/problem/solution;
el niño toca la que corresponde al rol pedido (INICIO/PROBLEMA/SOLUCIÓN) = estructura del cuento. Motor grada por
`panel.role===round.role` (0 líneas de core `story-spine-core.js`); texto + SVG dibujado (12 glyphs → sin biblioteca de
imágenes). Ya multi-locale (en/de/fr): custom dict `L`/`txt` → es = `L.es` (6) + `strings.es` (title+instruction) +
rama es de `_srMirror` (partWord «Parte », tail « Toca la parte que corresponde.») + `storiesL10n.es` (3) +
`roundsL10n.es` (9). `_loadActivity`/`txt`/speak ya genéricos.

🔑 **RESOLVIÓ EL FORK DEL STRAND (operator-ratificado): «Comprensión de textos literarios» (LEE)** — la maestra corrió
la regla RI/RL de 2 compuertas sobre la actividad REAL: (1) comprende (sin aparato de búsqueda); (2) LEE (pies MOSTRADOS
+ barajado que OBLIGA a leer; 🔊 = apoyo) → literario, mismo chip que picture-story #82. SUPERSEDE la nota-adelantada de
#82 (:138). fr conserva ESCUCHA (GS/pré-lecteur); es 1.º/lector (split coherente por grado). otto/willow por su modalidad.
STRAND_OVERRIDE por-actividad (:141); strand-names.ts NO se toca. **GRADO 1.º** (Fase 2 NEM, emparejamiento concreto
viñeta↔rol; regla #82; precedente picture-story #82). `GRADE_OVERRIDE es:'1'`. Términos **INICIO/PROBLEMA/SOLUCIÓN**
(NUDO/DESENLACE = secundaria, rechazados).

🔑 **INVARIANTE: preservar glyphs+role+id+storyId del EN; localizar SÓLO title+caption (stories) y prompt (rounds).**
setting sin tensión (quién+dónde); problem con verbo de conflicto; solution resuelve ESE problema. Mismo mundo que
picture-story #82 (nouns glyph-consistentes: `guante` no mitón, `paraguas` no sombrilla en escena de lluvia, `canasta`,
`día de campo`) pero captions role-optimizados DISTINTOS de #82 (mismo-mundo-otra-habilidad). ⚠ clíticos dativos/
reflexivos load-bearing (`se le cayó`/`le quitó`/`se la devolvió` = marcan problema vs solución); `tenía` imperfecto no
`tuvo`; `brincó` MX no `saltó`; `búho` no lechuza; `renacuajo` no ajolote. Personaje Dot (dragón, aria-hidden → título+
prosa); título «El taller de cuentos de Dot»; role terms como CUENTO (no historia).

🐛 **FIX de layout §A.13.62 (capa-actividad, en el `.js`): apretar `.ds-cand` padding 5→3 + gap 3→2 + `.ds-cap`
line-height 1.08→1.0.** Los captions es (más largos) envolvían MÁS ALTO en 320px → la tarjeta crecía → la fracción de
ÁREA de la SVG-escena (que ES la única «content» que la compuerta cuenta — el caption es `<div>`, NO svg/img → EXCLUIDO)
caía a 0.31 < 0.32 sparse-floor → falso sparse. 🔑 **La compuerta `sparse` mide `union(svg,img)`/card-area, EXCLUYE el
caption de texto; captions largos = tarjeta más alta = escena menor fracción. Fix = APRETAR la tarjeta (no agrandar el
caption — eso la empeora: probé subir la fuente y bajó a 0.26).** es+en 54/54 verde tras el fix. (⚠ es de los pocos
motores con tarjeta-imagen: la escena SVG es la respuesta, no decoración — la compuerta la subcuenta; §A.13.62 «arreglar
el layout» = apretar.)
**SEO:** slug `partes-de-un-cuento-inicio-problema-solucion-primer-grado`; distinto de picture-story `cuentos-cortos…` y
field-guide `partes-del-libro` (físico); evitados nudo/desenlace/trama (→secundaria). Prosa `«»`, «su hijo/a», §A.13.29
ejemplos = los cuentos shipeados (Dot MUESTRA, no vive).

## #91 `marina-headline-desk` — "El escritorio de titulares de Marina" (RI.2.2 → **3.º**, eje **Comprensión de textos informativos**) `3b8f12c4`
Marina la nutria escribe titulares: 8 rondas, cada una = un texto informativo de 3 oraciones (se lee en voz alta + se
muestra) + 3 tarjetas; el niño toca la del **tema/idea principal**. Foils: **detail** (una oración del texto casi
VERBATIM = calce máximo = la trampa) + **offtopic** (dato cierto pero ajeno). El motor grada por tag `kind==='topic'`
(0 líneas de core `main-topic-core.js`; el helper `words`/`overlap` es AUDIT-only). Ya multi-locale (en/de/fr): usa el
`api.t()` del shell (NO `L`/`txt` propio) → es = `strings.es` (9) + rama es del aria de la nutria + `roundsL10n.es` (8);
`speak lang:LANG` + `_loadActivity roundsL10n[LANG]` ya genéricos.

🔑 **INVARIANTE ANTI-SUPERFICIE (la que sostiene todo, reusable a cualquier motor de 3 tarjetas main-topic):** la
tarjeta `detail` REUSA una oración del `story` casi verbatim (overlap MÁXIMO); la `topic` es un titular ABSTRAÍDO que
NO aparece verbatim y comparte POCAS palabras. Assert de build (accent-aware): **overlap(detail) ≥ overlap(topic)** por
ronda. Preservar `id`/`band` + `id`/`kind` de cada opción VERBATIM del EN; localizar SÓLO `story` + `text`. (⚠ seed
queda 5=5 empatado en mi contador — ACEPTABLE: el `detail` es S2 EXACTA mientras el `topic` reformula S1 en pregunta;
la copia literal es el señuelo, réplica fiel del diseño EN; el bar alemán es ≥, no >.)

🔑 **GRADO 3.º** (maestra decisiva, NO fork): marina = el MISMO mecanismo anti-superficie que **juniper #85** (es 3.º)
— el `detail` premia el calce léxico y el `topic` correcto no reusa palabras → construir el gist, no calcar. DISTINTO de
**author-purpose #84** (respuesta EN la superficie → es 2.º). Regla #82 (no asignar grado cuyo término la actividad
tendría que introducir) se cumple sólo en 3.º. en queda Grade 2. `GRADE_OVERRIDE es:'3'`.
🔑 **EJE «Comprensión de textos informativos» vía STRAND_OVERRIDE POR-ACTIVIDAD** (NO strand-names.ts — 'Reading:
Informational Text' sólo tiene en+de → una fila etiquetaría mal a los hermanos; doctrina RI/RL es ratificada). 2
compuertas: (1) COMPRENDE (sin índice/glosario/menú = sin aparato de búsqueda → no «Búsqueda y manejo de información»);
(2) LEE (el texto se muestra + tarjetas se leen; el 🔊 es apoyo de decodificación → no «Escucha…»). Mismo chip que atlas #78.
**theAsk (sub-pregunta, enseña en la consigna) → «¿De qué trata TODO el texto, no sólo una oración?»** (pre-empta la
trampa del detalle; el metatérmino «tema principal» sólo en `win`+prosa). Banner `prompt` «¿De qué trata principalmente?».
🇲🇽 **Tamiz:** `nutria`=otter MX-safe (la confusión con coipo es del Cono Sur, no MX; «Marina la nutria» fem); `búho`
no lechuza; `renacuajo` NO **ajolote** (trampa: axolotl ≠ tadpole); rechazado `coger` (usar escoger/tomar/juntar);
`el alto` no «stop»; `regresar` no «devolver». Título «El escritorio de titulares de Marina» (titular = prensa MX).
⚠ Trampas gramaticales a NO "corregir": clíticos dativos/reflexivos (`le salen patas`, `te lo llevas`, `le decimos
viento`); inversión VS `espera roca caliente`; diminutivo `huevito`; `detail` = copia verbatim de una oración POR DISEÑO.
🐛 **FIX de layout (§A.13.62, capa-actividad): `.mhd-say` line-clamp 1→2** en el `.js` — el globo de intro se recortaba
en pantallas angostas en TODOS los locales incl EN (defecto preexistente); el clamp de 2 líneas lo limpia (es+en 48/48
verde tras el fix). 🔑 Cuando el clip existe también en EN, acortar el contenido es NO alcanza verde (el sobre EN
también se recorta) → el fix correcto es el clamp de la capa-actividad, no el contenido. (⚠ el emoji 🐻 del globo es
preexistente y locale-neutral — Marina es nutria pero el avatar del globo es un oso genérico en en/de/fr; NO tocado.)
**SEO:** slug `idea-principal-de-que-trata-el-texto-tercer-grado`; title «Idea principal: ¿de qué trata el texto? ·
Tercer grado» (54ch). Evitados por banda (→secundaria): tesis/argumento/estructura/tema-central. Distinto de wobble
`quedarse-en-el-tema` (ESCRITURA) y author-purpose `proposito-del-texto`. Grade-token `tercer-grado` (convención literacy).
Prosa es = `«»`, «su hijo/a», §A.13.29 ejemplo «Cómo hacen su miel las abejas» = tarjeta topic de la ronda bees.

## #90 `wobble-museum` — "El museo de temas de Ula" (W.K.2 → **2.º**, eje **Producción de textos**) `7d769639`
Ula la urraca: 8 salas, cada una un tema (letrero «Tema: X») + 4 oraciones cortas verdaderas; 3 del tema + 1 que
**se coló** (verdadera pero de otro tema); el niño toca la colada = **quedarse en el tema**. Motor tag-based
(`about!==topic`), 0 líneas de core; texto puro (urraca `aria-hidden`, sin biblioteca de imágenes); botón «🔊 Escuchar».
Ya multi-locale (en/de/fr construidos): es = SÓLO datos → `L.es`(5) + `strings.title/instruction` es + `roundsL10n.es`(8).

🔑 **ABRE el strand Writing→es** = `strand-names.ts 'Writing'.es: 'Producción de textos'` (aditivo, patrón #78/#82;
SIN STRAND_OVERRIDE por-actividad — fr SÍ usa override en :180 porque Writing no tiene `fr` en strand-names.ts;
es NO lo necesita). **GRADO 2.º** (maestra decisiva: leer 4 oraciones a nivel de TEXTO + juzgar pertenencia temática
> decodificación de 1.º; «identificar el tema/coherencia temática» = contenido nombrado en 2.º; el botón Escuchar
alivia decodificación pero no comprensión). en queda Kindergarten. `GRADE_OVERRIDE es:'2'`. Único fork que la maestra
marcó = borde 1.º/2.º → adjudicado 2.º (SEO 2.º + paridad de Klasse 2).

🔑 **REGLA DEL APOSICIÓN DE SUSTANTIVO PELADO (el constraint #1, reusable a cualquier motor que reusa `{topic}` en
varios marcos):** `topic`/`about` son **sustantivos pelados, minúscula, SIN artículo** («ranas», no «las ranas») porque
la MISMA cadena entra en tres marcos sin flexión: `Tema: {topic}` / win `…se coló del tema {about}` / nudge `Esa sí es
del tema {topic}`. «del tema las ranas» es agramatical → artículos PROHIBIDOS; mayúscula PROHIBIDA (sangraría a «del
tema Ranas»). Los 3 `about` del tema = BYTE-IDÉNTICOS a `topic`; exactamente UN drift (`about`≠`topic`).
🔑 **keyword-defeat accent-exact:** `topicWord` = raíz de superficie EXACTA (⚠ `árbol` con á=U+00E1, o no casa `árboles`
— misma clase que el umlaut alemán `frösch`); ≥1 oración del tema lo contiene, ≥1 lo OMITE («Se/Su/Viven»). El drift
**comparte una palabra** con una oración del tema (agua/noche/rojo/plantas/dicen/viven/ramas/comer) → hay que razonar por
TEMA, no cazar la palabra rara. Aserto node 8/8 lo prueba.
🇲🇽 **Tamiz MX:** `el alto` (NO «stop»/«señal de stop» peninsular) · `camión de bomberos` (NO «coche») · `se coló`
(NO «se ha colado») · guau/miau · `pájaros` CONSERVADO (palabra K canónica — lotería «El pájaro»; albur no se activa en
contexto de ave; alterna zero-risk `aves` documentada, no tomada). Personaje **Ula la urraca** (aliterativo, sin albur).
Pregunta al niño **«¿Cuál oración no va con el tema?»** (nombra el CRITERIO, no la metáfora del museo; la metáfora «se
coló» vive en instrucción/win/nudge). Encuadre **Vorstufe honesto**: «prepara la escritura sobre un tema», NUNCA «tu
hijo escribe un texto».
📌 **PROSA es = guillemets `«»` (NO curly `“”`)** — verificado contra los hermanos shipeados (point-of-view/pim/inky/
juniper todos usan `«»` en la prosa); registro **«su hijo/a»** (usted), items de lista SIN punto final. §A.13.29: el
ejemplo de p1 («Tema: ranas» + «El agua del estanque es fría») casa la Sala 1 shipeada. (⚠ el curly-quote del #89 era
para las cadenas RUNTIME que ve el niño, NO para la prosa — dos superficies, dos convenciones.)
**SEO:** slug `quedarse-en-el-tema-cual-oracion-no-corresponde-segundo-grado`; title `¿Cuál oración no corresponde al
tema? (2.º grado)`. 🚫 evitados por banda equivocada (→ secundaria): «punto de vista», «tipos de texto», «idea
principal». Distinto del primo más cercano `cual-no-pertenece-categorias-1-primaria` (imágenes/1.º) por *oración+tema*+2.º.
**COMPLETADAS** counter = chrome del shell (rondas hechas, NO puntaje) — permitido, preexistente.

### 🚀 The deploy (2026-07-15) — READ THIS BEFORE RESUMING
The operator called the batch deploy after #89, then paused the fan-out for an unrelated task.
**Range `15d31b9c..ca11373a` = 88 commits, 88/88 es-tagged, 0 non-es** (nothing rode along).
**92 new activities went live; 149 es coordinates total; 149/149 es routes verified 200.**
Release `713NfHjYjEYCGSqQQ3xWk`. ⚠ **The batch is LIVE — do not re-deploy it or treat #1–#89 as unshipped.**

**Policy for #90+ is UNCHANGED:** build → §A.13.62 DoD → **auto commit + push** → **NO deploy**.
The remaining ~25 batch-deploy at the end, with the same chain.

**The deploy chain that worked (reuse verbatim):**
1. **og:images FIRST, locally** — `node scripts/generate-activity-og-images.js` (no `--only`). Puppeteer →
   **cannot run on Hetzner (no Chrome)**. Output `frontend/public/mini-tools/og/<id>.<locale>.png` is
   **gitignored** → it never rides the commit; **scp is the only delivery path**. One browser for the whole
   run; the play-area screenshot is locale-neutral (one per activity), one composite per `page_title` locale
   key. `--only=` is a substring match with **no locale filter**, so per-id runs redo every locale anyway →
   the full run is cheaper. Upload only the NEW `.es.png`, then `chown lcs-media:lcs-media` + `chmod 644`.
2. **One SSH chain** (§20.4 race — `activities.ts` indexes the manifests at BUILD time; `deploy.sh` does NOT
   sync mini-tools, so the cp MUST precede `npm run build` or every new route 404s):
   `cd /opt/lessoncraftstudio && git pull --ff-only && cp "mini tools/"*-activity.js "mini tools/"*-activities.json "mini tools/"*-activity.html /var/www/lcs-media/mini-tools/ && bash deploy.sh`
3. **Verify:** `lcs-status`; sweep the es routes; en/de/fr unregressed (the batch touches the shared route
   maps `GRADE_OVERRIDE` / `STRAND_OVERRIDE` / `ACTIVITY_WRAPPER_VERSION`); og:image 200.

**🐛 Two gotchas this deploy surfaced:**
- **Do NOT sweep routes in parallel** — 12 concurrent curls tripped the `lcsperip` bot-defense limiter and
  returned **61 false 429s**. Serial re-check → 149/149 clean. `audit-activity-pages.js` trips it too (it
  fans out fast from one IP); that's the limiter working, not a page defect.
- **GNU tar reads a Windows `$TEMP` as a remote host** (`C:` → "Cannot connect to C: resolve failed`") —
  use a POSIX `/c/Users/...` path for any `tar -czf`.

**📌 §20.10's stated check is now STALE — do not treat it as a defect.** It says `curl | grep -c "Common
Core"` should be **0** for the 10 non-EN locales. It now returns **1 on every locale incl. en/de/fr** —
because the native-locale-homepage build added a deliberate 10-framework list (`"frameworks":"Common Core ·
Lehrplan · Programmes officiels · BNCC · …"`) to the **homepage** namespace, and `NextIntlClientProvider`
serializes the whole locale message set into **every** page's RSC flight-data (the same bleed mechanism
§20.10 documents for `standardsPage`). It is **flight-data JSON only, never rendered**. The es activity page
verifies clean where it counts: JSON-LD `educationalFramework` = **"Planes y programas de estudio (SEP)"`,
`targetName` = the retained CCSS code, meta description native, **visible HTML has zero "Common Core"**.
**The correct check is on stripped/visible HTML + JSON-LD, not the raw curl.**

## #89 `point-of-view` — "El faro de Lumen" (RL.1.6 → **1.º**, eje **Comprensión de textos literarios**) `ca11373a`
Lumen el búho: 9 rondas (5 high / 4 low; `mid` siempre distractor). Una línea en 1.ª persona describe un suceso del
puerto desde UNA criatura; el niño toca su ventana. Regla: **hasta arriba** → muy pequeño y lejos; **hasta abajo** →
enorme y bien cerca. Sin audio, sin imágenes. 0 líneas de core.

🔑 **REGLA NUEVA — UNA LOCALE CITANDO A OTRA NO ES UN SEGUNDO VOTO.** de (Klasse 2) y fr (CE1) "concordaban" → **es UN
artefacto alemán citado dos veces**: el comentario fr termina literalmente **«… la forme abstraite/réflexive du
narrateur = CE2+; PARITÉ DE KLASSE 2»** — Francia argumenta por qué NO es CE2, dice que la forma concreta es
«accessible au CE1» (**afirmación de TECHO**), y **NUNCA argumenta por qué no CP**. Y la razón alemana es «Klasse 1 =
still decoding» = **el artefacto del Erstlesen que la maestra ya reventó en #84 y #85**. → **#82: no transfiere
ninguno.** ⚠ **Auditar los comentarios fr por «parité DE …».**

🔎 **Y LEER EL MOTOR LO VOLTEÓ — un TELL de grado reusable.** de y fr **reescribieron la `instruction` para ENUNCIAR LA
REGLA** („Von ganz oben sieht alles winzig und weit weg aus"); **el inglés NO**. Con la regla dada, el niño hace un
**CALCE LÉXICO** («winzig und weit weg» ↔ «winziger Punkt, weit weg» → «ganz oben»). **EL DISEÑO PREMIA LA SUPERFICIE
= el inverso exacto de juniper** (cuya moraleja no reusa ninguna palabra y cuyo `detalle` CASTIGA el calce) → **3.º
imposible**. Y no es metatextual (se queda DENTRO del mundo del cuento) → **debajo de author-purpose (2.º)**. El canal
de **texto mudo fija el PISO de primaria** (criterio #86, inky K→1.º) **pero no llega a 2.º** → **1.º, a la par de
picture-story.** 🔑 **Tell: si la instrucción enuncia la regla, el diseño premia el calce léxico → grado bajo.**

**EJE «Comprensión de textos literarios»** (override obligatorio; strand-names.ts intacto — precedente juniper #85).
⚠⚠ **YO VENÍA BRIEFEANDO LA REGLA DE 3 COMPUERTAS MAL.** El texto VERBATIM es: **(0)** ¿el objeto es el TEXTO MISMO
(qué tipo es, para qué sirve) o su CONTENIDO? → texto mismo = «Diversidad textual»; **(1)** **¿COMPRENDER o
LOCALIZAR?** → localizar = «Búsqueda y manejo de información»; **(2)** **¿LEE o ESCUCHA?** → lee = «Comprensión de
textos literarios/informativos»; escucha = «Escucha y comprensión de textos». *(Yo decía "(1) informativo/literario,
(2) búsqueda" — orden y preguntas equivocados.)* Aquí: (0) contenido → (1) comprender → (2) LEE → literarios ✓.
Corroborado por la **PRUEBA DE PARTICIÓN (#86)**: firma **idéntica a juniper y picture-story** (SIN override de + fr =
«Comprendre et interpréter», el MISMO valor de juniper); el comentario fr la agrupa con «les frères RL d'inférence
narrative … fable #52».
📋 **REFINAMIENTO (anotado): la PRUEBA DEL FRELL da un FALSO POSITIVO aquí** — sustituir los SUSTANTIVOS sigue
ruteando porque **el mensaje vive en los PREDICADOS** («puntito», «muy lejos»). **Sub-lee cualquier texto cargado por
adjetivos/adverbios; lo corrige el GUARDRAIL de la compuerta 0.** Punto ciego conocido del instrumento.

**EL PAR DE CONTRASTE (de esto cuelga todo):** high = `se veía…`/`era solo…` + *muy pequeño·pequeñito·puntito* + *allá
lejos·allá abajo*; low = `se veía…` + **ENORME siempre** + *bien cerca·justo junto a mí* + pista de contacto.
🔑 **`enorme` NUNCA `grandote/grandota`** — el aumentativo es combustible de albur de tamaño, **Y `enorme` es de GÉNERO
COMÚN → las 4 líneas LOW quedan a prueba de concordancia sin importar el objeto. Propiedad de diseño, no elección de
palabra.**
🚩 **`chiquito` TACHADO — «el chiquito» = ano en MX: la clase del DIMINUTIVO NOMINALIZADO, con `pajarito`.** (`pequeño`/
`pequeñito`/`puntito` sí.) ⚠ **Anuló el borrador SEO, que lo había escrito en el page_intro — el tache gana.**
🚩 Tachados: `pasó rozando` (coqueteo) · `encima de mí` · `debajo de mí` · `mojar`/`tocar`/`entrar`. **CLAREADOS:**
`ola` · `cangrejo` (⚠ el piojo MX es *ladillas*) · `medusa` · `gaviota` · `pez` · `nariz`.

**⚠ ROTACIÓN DE NOMBRES = ANTI-CUE.** Los 4 nombres rotan entre posiciones (el `Gull` inglés está arriba en R1 y abajo
en R3/R9) → **el nombre JAMÁS es pista**. Preservado por **sustitución 1:1 estricta** sobre los `chars` del inglés →
no puede romperse. **Assert: cada nombre abarca ≥2 posiciones** (los 4 abarcan las 3). **Pío · Mimi · Lalo · Brinco**
(⚠ `Pío` ≠ el tachado `pajarito` — ése era el diminutivo nominalizado, no el sonido del ave; rechazados `Pico`/`Pipo`/
`Kiko`/`Motita`[mota]/`Coco`).
**R5:** el pueblo iluminado desde un faro **SÍ es mexicano** (Mazatlán/Veracruz; el malecón de noche) — ⚠ **`el
pueblo`, NO `la ciudad`** (ciudad se lee CDMX). **A diferencia del marco Bóreas tachado (#85), aquí el marco NO es el
contenido.** **R8 `medusa` no `aguamala`** (es actividad de LECTURA; los niños del interior no tienen *aguamala*;
`medusa` = SEP + vocabulario canónico verificado). **R4 tiene SUJETO NULO** — «Ella» para una gaviota sería erróneo:
es la traducción es-verdadera del "It", no una omisión.

🦉 **`el búho`; `la lechuza` TACHADA.** Verificado: `image-vocabulary.js:796` → `owl es = ["Búho","Búhos","m"]`
(masculino → satisface la regla de animales-masculinos por su cuenta). **La lógica del `tecolote` alcanza a `lechuza`
y MÁS FUERTE: la lechuza es una BRUJA transformada en la creencia popular — asociación VIVA, no un refrán empolvado.**
**STRINGS:** `Hasta arriba`/`Hasta abajo` = EL locativo intensificado MX (⚠ **no aplanar a `Arriba`/`Abajo`: la
intensidad ES la regla**, amarrada a las mismas palabras de instrucción+nudges). **Instrucción: CONSERVA 3 oraciones**
(el one-liner inglés NO enseña la regla y **la regla es toda la actividad**) fundidas con «;» → **155 ch vs 171 de de**.
⚠ **`“ ”` no `« »`** — la RAE prescribe guillemets **pero los Libros de Texto de la SEP usan comillas curvas**; eso ve
un niño de 1.º. **No lo "corrijan".** `¿Quién lo cuenta?` no `¿Quién lo dijo?` (RL.1.6 = *quién lo está contando*;
`contar/narrar` = verbo SEP).
**§A.13.54:** el género del **HABLANTE varía** (la gaviota f / el ratón m) → **ningún adjetivo se aplica al hablante**;
todos concuerdan con el **objeto visto**. `_srMirror` es usa **`está`** (sin concordancia) + **«¿Quién LA cuenta?»**
(concuerda con «la oración»). 🚩 Trampa futura: ❌ «me dejó toda mojada» rompe → ✅ **mover el adjetivo al objeto**.

**SEO:** slug `quien-lo-cuenta-desde-arriba-o-desde-abajo-primer-grado`. 🚨 **«PUNTO DE VISTA» NO APARECE** — *tipos de
narrador* es unidad de **SECUNDARIA**; en primaria asoma ~5.º-6.º. 🔑 **El truco de posición de `los-dos-puntos-EN-EL-
SALUDO` NO TRANSFIERE: aquél desactivó una AMBIGÜEDAD de NUESTRO grado; «punto de vista» es una entidad de BANDA
EQUIVOCADA → Google la resuelve a secundaria esté donde esté. LA POSICIÓN NO DESACTIVA UN DESAJUSTE DE GRADO.** (Misma
forma que «propósito comunicativo».) 🔎 Rechazo clave **verificado con grep**: `…desde-donde-lo-vio…` cayó al hallar
`palabras-interrogativas-que-quien-donde-cuando-1-primaria` YA shipeado en 1.º → «dónde» fuera. vs **picture-story**
(también RL, 1.º, «lee una línea, toca»): picture-story = **QUÉ DICE** el cuento; Lumen = **DESDE QUÉ OJOS se ve** —
cero tokens compartidos.
⚠ **`verify-point-of-view-core.js` lee sólo `params.rounds` (EN)** como el de #88 — **pero NO asserta nada dependiente
del idioma** (calces de enums universales) → **EN-only aquí es INOFENSIVO, no peligroso**: no puede mal-gatear el es,
sólo no lo gatea; mi assert lo suple. **Dejado intacto a propósito.** 🔑 **La distinción: un gate EN-only sólo es
peligroso si assertó algo del IDIOMA.**

## 🚫 #87 `compound-meaning` (L.2.4.d) — **DIFERIDA como DESIGN-NOT-FAN** (ratificado por el operador; iguala el fallo fr)
**No hay código. No hay commit.** Igual al fallo del operador del 2026-07-10 para Francia (vía AskUserQuestion), que
nombró ESTA actividad **y #99 `hattie-whose-is-it`**: *«each would need a NEW French-specific activity, not a rebuild
of the English engine»*.
**El muro (verificado en código, por ambos expertos):** el core deriva la respuesta como
`composeMeaning = 'a ' + headNoun + RELATION_WORDS[rel] + glossMod` — **no es inglés de sabor, es inglés de
ESTRUCTURA**; y `compound-meaning-core.js:139 predictShowsBothPartImages` **EXIGE dos sustantivos ilustrables**. Los
compuestos productivos del español son **V+N** (`sacapuntas`, `abrelatas`): part1 es un **VERBO** (no se puede dibujar
«saca») y son **sin núcleo** (`abrelatas` no es una especie de `lata`). **Una ronda es NO PUEDE PASAR la compuerta del
propio core.** 🔑 La frase que lo decidió: ***«un fan que sólo pasa desarmando su propia compuerta es una regresión con
palomita verde»*** (§A.13.62 lo prohíbe). En la biblioteca sólo existe **UN** compuesto ilustrable+transparente+
endocéntrico: **`coliflor`**. *Uno no es una clase.* (`sacapuntas` —el ejemplo #1 de SEP— **muere en la biblioteca**:
la parte es *punta* y sólo hay `pencil`. `cascanueces` también: `nut` = **Tuerca**, ¡de ferretería!)
🚨 **Lo que hace que DIFERIR sea lo CORRECTO y no sólo lo consistente** (la maestra, grepeando los PDF reales de SEP —
LITERAL): **«palabras compuestas» = CERO ocurrencias en el Programa Sintético Fase 3 Y Fase 4** → no es contenido
curricular nombrado. Y la ÚNICA lección SEP titulada «palabras compuestas» (NEM Digital, 1.º) usa **paloma · soldado ·
caracol · pantalón · autopista** — **4 de 5 NO son compuestas**. Eso es **calambur**, que la Fase 3 sí nombra literal.
→ **El propio material de SEP enseña LO CONTRARIO de la regla alemana.** *Un caracol no es una especie de col.*
**«Alemania enseña CONFÍA en las partes; México enseña REVISA las partes.»** Es OTRA actividad con OTRA tesis = la
definición de design-not-fan.
📋 **Comisión futura `compound-vn-core.js`** (hermano limpio, patrón number-bond/clock/array): V+N «algo que [V] [N]»;
part1 como **chip de verbo** (nunca un verbo dibujado), part2 la imagen real; **el cog `head` se INVIERTE** en la
guarda del calambur («¿un sacapuntas es una especie de PUNTA o una COSA QUE HACE ALGO?»); el distractor `made-of` muere
(no tiene lectura en español); `supply` **florece** (el sustantivo de V+N siempre es ilustrable). ~7 compuestos limpios
(el piso §A.13.60): rompecabezas · abrelatas · lavaplatos · cortaúñas · **cubrebocas** (LA palabra mexicana; España =
*mascarilla*) · lavamanos · girasol. **Tamiz MX:** `cascanueces` RECHAZADO (albur «cascársela» + registro peninsular),
`picaflor`, `sacaleches`, `mamey`, cualquier *chupa-* RECHAZADOS.
⚠⚠ **#99 `hattie-whose-is-it` ES LA MISMA CLASE** — Francia la difirió por la razón idéntica (el francés no tiene
morfema posesivo); **el español tampoco** («el hueso del perro»). **Esperar la misma disposición.**

## #88 `pim-comma-mail` — "El correo de Pim" (L.2.2.b → **3.º**, eje **Ortografía y puntuación**) `aebcbe3f`
Pim, la paloma mensajera: cada ronda muestra el saludo o la despedida de una carta en 3 versiones; el niño toca la bien
puntuada. 8 rondas (**5 saludos / 3 despedidas**). Sin audio → la clase del bug del 🔊 no aplica. 0 líneas de core.
**LA RECONSTRUCCIÓN MÁS FUERTE DEL PROGRAMA.**

🚨 **EL HECHO:** en español el **SALUDO lleva DOS PUNTOS** («Querida abuela:») — **RAE, Ortografía §3.4.3**, que
además declara *por su cuenta* que la coma ahí es **«costumbre anglosajona, que debe evitarse»**. La **DESPEDIDA sí
lleva coma**. → **shipear el objetivo de en/de/fr le enseñaría a un niño mexicano un ANGLICISMO DOCUMENTADO como
correcto** = error factual, no hueco de localización. **Nuestro distractor «Querida abuela,» es LITERALMENTE la cadena
que las otras tres locales enseñan como correcta.** ⚠ **El alemán NO es precedente**: el *Gruß* alemán no lleva coma →
de **no podía** shipear despedidas (fallarían `okHasComma`); su forma sólo-saludos fue **forzada por la ortografía**,
no elegida.

🚨 **EL BLOQUEADOR + SU ARREGLO (clase reusable: UNA COMPUERTA PUEDE MEDIR LO EQUIVOCADO PARA UN LOCALE).**
`verify-letter-comma-core.js:43` asertaba `okHasComma` — **la compuerta EXIGE que la forma correcta lleve coma** — y 5
de las 8 rondas es la violan **correctamente**. Sólo no disparaba porque **:31 leía `params.rounds` (EN) y nunca
`roundsL10n`** → **es habría shipeado SIN COMPUERTA: ése es el peligro, no el indulto.** Arreglo en el SCRIPT (0 core):
**tabla de signo esperado POR LOCALE**. §A.13.62: *se arregla QUÉ mide la compuerta, nunca el umbral.*
✅ **PROBADO POR MUTACIÓN** — al "corregir" el saludo es a coma: «[es] abuela: the correct greeting must end with ":" —
got ","». La regresión exacta es ahora **estructuralmente imposible**. 🔑 **Verde no es prueba: MUTA la compuerta.**
🔎 **Y al extender la compuerta a TODOS los locales cazó algo real de inmediato:** el mazo **alemán es 8 saludos / 0
despedidas** y fallaba `kindMix` — **no es defecto alemán**: el Gruß no lleva NINGÚN signo → una despedida alemana no
tendría forma correcta. O sea que **`kindMix` TAMBIÉN presupone que ambos tipos cargan un signo comprobable, y esa
presuposición es dependiente del locale** (la misma clase que `okHasComma`) → la tabla maneja AMBAS: `closing: null` =
«este locale no marca despedidas → son incomprobables → sólo-saludos es CORRECTO» (se asserta `closing === 0`).

**GRADO 3.º** — ⚠ **NO heredado de Alemania; el ancla está en CÓDIGO SHIPEADO** (verificado): **`wally`** (L.2.2.a,
MAYÚSCULAS, manifest "2") shipea es **2.º SIN override**, mientras **`cleo`** (L.1.2.b, LA COMA, manifest "1") shipea
**es:'3' = salto de +2**. 🔑 **La frontera ya estaba trazada: PUNTO + MAYÚSCULA ≤2.º; cualquier otro signo ≥3.º.**
Segunda ruta: **recado 1.º-2.º / carta 3.º**. ⚠ El comentario fr de :55 es **OBSOLETO** (llama "CP" a cleo; cleo shipea
fr:'3') — no cambia nada pero **nadie debe razonar desde esa frase**.
**EJE «Ortografía y puntuación»** — el chip de booker+cleo+wally; el comentario shipeado de cleo da la razón es
verbatim: *«ES puntuación = ortografía, not "Reflexión sobre la lengua" (grammar)»*.

**MAZO MIXTO 5/3** — lo exige `kindMix` **y** es pedagógico: sólo-saludos autorizaría «las cartas en español no llevan
comas», **un error que causaríamos nosotros**. Las despedidas son **guardarraíl, no adorno**. **Distractor anglicismo
SHIPEADO** (es el error real; justo porque hay pistas / sin puntaje / reintentos ilimitados) ⚠ **con la regla FUERA de
la etiqueta siempre visible** («✉️ El saludo» — nombrar el signo filtraría la respuesta). 🆕 **Distractor espejo «Con
cariño:»** — el que **sólo el español puede tener**. **«Hola, Diego:» hace el mazo, pero SÓLO porque la coma vocativa
es INVARIANTE en las 3 formas** → 🔒 **la coma vocativa NUNCA es la variable comprobada**. **«Estimada maestra Ruiz:»
no «profesor Fuentes»** (profesor = secundaria/prepa; el trato por apellido es adulto). ⚠ **«Querido papa:» =
"Querido tubérculo"** — los acentos son carga estructural. Bots: longest **0.0%** / shortest **0.0%** (el distractor
anglicismo difiere en **UN carácter** → fuga por longitud estructuralmente cero, **mejor que en/de/fr**).

**STRINGS:** «los dos puntos» (⚠ **NUNCA «el colon»** — anglicismo Y el intestino); «el saludo»/«la despedida» son
palabras de SEP → verbatim; ⚠ **NUNCA «dos puntos y coma»** (se lee *punto y coma* «;») — **la «o» del título es carga
estructural**. 🆕 **PIM ES FEMENINA («la paloma»)** — el `win` alemán dice „Pim ist **stolz**"; copiarlo da «Pim está
orgulloso» = MAL → **todas las cadenas es de Pim llevan CERO adjetivos**. «paloma» pasa el tamiz MX (⚠ evitar
«palomita»=palomitas, «palomo»=ingenuo).

🐛 **UN DEFECTO QUE EL READ PERSONAL CAZÓ Y LA COMPUERTA DEJÓ PASAR — clase reusable.** **`.pcm-say` es
`-webkit-line-clamp:2` + `overflow:hidden` → lo que pase de 2 líneas se RECORTA EN SILENCIO, y como el recorte es POR
DISEÑO del contenedor, el harness NO lo puntúa como overflow.** Mi `pimIntro` (66 ch) se recortaba a media frase en
360. Arreglado **acortando el CONTENIDO** → 45 ch, dentro del sobre de en(48)/fr(50). 🚩 **de mide 65 ch y casi seguro
se recorta igual — defecto alemán PREEXISTENTE, surfaceado, NO arreglado.** 🔑 **Medir los globos con clamp contra el
sobre en/fr; el harness no los ve.**

⚠⚠ **EL VERIFICADOR ESTABA SIN TRACKEAR EN GIT → `git add` explícito** (entró como `create mode`). Sin eso el arreglo
de la compuerta habría vivido **sólo en disco**: invisible a revisión, perdido en un clon → **no habría protegido a
nadie, que era todo su propósito**. Contexto: **118 de 125 `verify-*-core.js` están sin trackear (sólo 7 lo están)** —
patrón preexistente. 🔑 **Si tocas un gate, revisa `git ls-files` ANTES de creer que lo commiteaste.**

**SEO:** slug `los-dos-puntos-en-el-saludo-de-una-carta-tercer-grado`. ⚠ **de/fr nombran LA COMA en sus slugs — es NO
debe.** 🚫 **«partes de la carta» = la misma forma que «partes de un libro»** (SERP de DIAGRAMA/ficha → rebote).
**«la carta» se nombra sólo como MODIFICADOR PROFUNDO** — el SIGNO va en posición de cabeza; 🔒 «carta» nunca junto a
«partes de»/«estructura de»/«cómo escribir» (**eso**, no la palabra, invoca el SERP de diagramas). **Aquí el TOKEN DE
GRADO es el convertidor de intención** (no hace falta verbo, a diferencia de `identificar-la-moraleja`): «los dos
puntos en el saludo» resuelve a Fundéu; **+ «tercer grado» resuelve a práctica escolar.** vs `cleo` (también
puntuación, también 3.º, mismo eje): diferenciado en **AMBOS** ejes — signo **y** contexto. 🚨 **EL ANGLICISMO:
CAPTURARLO, NO TARGETEARLO** — hay volumen real pero (1) es consulta de 3 segundos → hasta el #1 rebota, y (2)
**FUNDÉU es dueño de esa duda** (no le ganamos a una autoridad normativa en una pregunta normativa) → **el intro lo
resuelve en el snippet y la prosa lo lleva como FAQ; nunca en el slug ni el título.**
⚠ **El precedente del token de grado NO es unánime** (lo verifiqué): `<ordinal>-grado` en 6 de 8 (bea/inky/opposites/
author-purpose/gabby/juniper); **cleo shipea `-3-primaria` y wally `-2-primaria`** (outliers de registro peninsular);
booker/fern shipean `-primaria` pelado. **`-tercer-grado` gana por mayoría Y por registro** («tercer grado» es SEP/MX).

## 🔒🔒 REGLA DE PROCESO NUEVA (de #86, la más importante del arco) — **NUNCA PARAFRASEAR UNA REGLA RATIFICADA DENTRO DE UN BRIEF. CITARLA DESDE EL ARCHIVO.**
En #86 **YO** metí una tercera cláusula inventada («cómo se reconoce») en el texto de la compuerta 0 dentro de mi
propio brief al ensamble. La maestra la leyó **como doctrina shipeada**, ruleó sobre ella, y me la **citó de vuelta**
afirmando «está en la compuerta desde el principio». **El texto real dice sólo «(qué tipo es, para qué sirve)»** y la
enmienda #84 dice «la **FORMA/PROPÓSITO** del texto vs su MENSAJE». Es el modo de falla de #84 —*verificar la cita, no
confiar en ella*— **salvo que la cita mala era MÍA**. Peor: el :177 ratificado dice «el «(título/portada/formato)» de
#81 era la **LISTA DE EJEMPLOS** de bea, **no la definición**» → **la cláusula inventada RE-PROMOVÍA justo lo que #84
tumbó**. Ella verificó mi corrección **ella misma** antes de aceptarla («ésa es toda la lección de #84») y la retractó.
🔑 **Su tell, guardarlo: «cuando una regla tiene que crecer para alcanzar tu respuesta, la respuesta suele estar fuera
de la regla.»**

## #86 `inky-book-workshop` — "El taller de libros de Inky" (RL.K.6 → **1.º**, eje **Diversidad textual**) `1e85ef86`
Inky el pulpo: cada ronda = un libro + un aviso de qué hizo alguien; el niño toca ✍️ Autor / 🎨 Ilustrador / 📖 Lector.
8 rondas. El core grada desde el tag `job` → 0 líneas.

🚨 **EJE COLOCADO *FUERA* DE LA REGLA DE 3 COMPUERTAS (ratificado).** ⚠⚠ **Un agente futuro que corra las compuertas NO
reproducirá esta colocación — está fuera A PROPÓSITO. NO LA "CORRIJAS" DE VUELTA.** Las tres fallan: (0) el objeto no
es el TIPO (bea) ni el PROPÓSITO (author-purpose) — es **QUIÉN HIZO EL LIBRO**, una TERCERA cosa que la compuerta no
nombra; (1) la prueba del frell **PASA** (el blurb es 100% decorativo; la respuesta está entera en el verbo del
prompt); (2) sin aparato de búsqueda. **La regla de 3 compuertas es un instrumento de COMPRENSIÓN LECTORA y la cultura
del libro es su LÍMITE CONOCIDO, no un defecto.**
**El chip es correcto por TRES patas independientes:** (a) **EXCLUSIÓN SEP (~95%, la que carga)** — autor/ilustrador
son contenido SEP indudable; comprensión excluida (el niño no aprende nada de lo que el libro DICE) + búsqueda excluida
(sin aparato) → queda TEXTO-COMO-OBJETO = «Propiedades y tipos de textos», que es lo que este chip renombra. ⚠ **La
maestra estratificó su confianza:** la enumeración «portada/título/autor/ilustrador/editorial» sólo **~75-80% → 🚩
FRASEO FIEL, NO shipear como verbatim**; **el fallo descansa en la EXCLUSIÓN (~95%), no en la enumeración.** (b) **el
set de chips es está CERRADO** → única sobreviviente. (c) 🔎 **LA PARTICIÓN de/fr — hallazgo mío, verificable en código,
reusable:** el par de overrides **de+fr de inky es BYTE-IDÉNTICO al de bea y al de author-purpose** (las 2 que ya están
en la cubeta), mientras picture-story+juniper («Comprensión de textos literarios») llevan otra firma. **Alemania y
Francia particionan estas cinco igual que es.** ← *prueba barata para cualquier colocación futura.*
**NO se enmienda:** una enmienda redactada **en el mismo aliento que el caso que rescata es un RETROFIT** — la de #84
fue legítima porque **DISCIPLINÓ** la compuerta a costa de rigor; una cláusula «quién lo hizo» la **AFLOJARÍA**.
**NO 4.ª cubeta (4 candidatas rechazadas):** «Acceso a la cultura escrita» (no es eje ni tema → acuñar) · «Apropiación
de las culturas…» (real pero es **EJE ARTICULADOR** transversal; ningún chip lo es) · «Intercambio de experiencias de
lectura» (el niño no intercambia nada) · **«Propiedades y tipos de textos»** (el nombre SEP, **el más honesto** — pero
churnea bea+author-purpose → **anotada como la conversión correcta si se hace una pasada de renombrado**).
📋 **TRIGGER PERMANENTE: con una SEGUNDA actividad de cultura del libro → entonces nombrar la cubeta.** Así se construyó
(bea fundó #81; author-purpose entró por enmienda #84 — **se nombró bien sólo al tener un SEGUNDO miembro**). **Un solo
miembro es cómo se acaba con un chip cuyas dos palabras no cuadran con su extensión** (la enfermedad que «Diversidad
textual» YA tiene).

**GRADO 1.º.** 🚨 **La prueba decisiva salió de LEER EL MOTOR:** `speak()` sólo dispara en el handler del tap (:116,
feedback DESPUÉS de elegir) y **no existe afordancia 🔊 en ninguna parte** (grep = 0) → **nada se lee en voz alta ANTES
de responder**, y la respuesta vive entera en el verbo del prompt ESCRITO → **todo el canal es TEXTO MUDO** →
**A FORTIORI sobre picture-story** (cuyo 🔊 SÍ leía el cuento y aun así fue 1.º, por «el audio baja la carga del
ESTÍMULO, nunca de la RESPUESTA»). **Emoji RECHAZADO** (línea #83): desambigua la TARJETA, no la RONDA; y en promptRead
**estorba** — 📖 es icono de un LIBRO (objeto) mientras ✍️🎨 son MANOS HACIENDO (acciones) → el set no es
autodescriptivo. 🔑 **El criterio real del K-cluster: MANDA LA SUPERFICIE DE RESPUESTA** — comparison-creek bajó a 'PK'
porque la suya eran NUMERALES; aquí son PALABRAS.

**ETIQUETAS Autor / Ilustrador / Lector.** «Ilustrador» **pre-resuelto por §A.13.61** (estándar de NOMBRAR → término
formal); Alemania peleó esta bifurcación, **es no tuvo que**. 🔎 **El caso MX es MÁS FUERTE: los libros que edita la SEP
imprimen «Autor:»/«Ilustrador:» EN LA PORTADA** (Libros de Texto Gratuitos, Libros del Rincón) — el niño se encuentra
la palabra **impresa en los libros que tiene en las manos**; Alemania la defendió por doctrina, México la tiene en la
tapa. ⚠ `dibujar` ✓ / `pintar`+`colorear` ✗ (la falla que de prohibió como «malen»). ⚠ **NO-corregir:** rompemos la
derivación ilustrador↔ilustrar **a propósito** (el verbo transparente carga el peso); el objeto es **«las imágenes»**
nunca «los dibujos» (tartamudeo); **masculino genérico en la TARJETA** — inclusivizar metería paréntesis + un morfema a
descifrar **justo en la superficie de respuesta que fija el grado** → el eje NEM Igualdad-de-género se honra **en la
prosa**.

**🐙 El pun de la tinta NO sobrevive** (de eligió „Tintenfisch" sobre „Krake" *por* el pun Inky→Tinte; es no tiene
equivalente: pulpo<polypus sin tinta, calamar es otro animal, sepia es el color/registro adulto) → **la tinta vive en
la PROSA**, igual que ya hace fr («avec son encre») → «Inky el pulpo hace libros con su tinta». `pulpo` **no tiene
femenino** (⚠ `la pulpa` = pulpa de fruta). **aria «Inky el pulpo» SIN COMA** (aposición del español: *Simba el león*;
la coma de de es regla alemana).

**BLURBS:** ⚠ decorativo para el RUTEO, **no para el NIÑO**. **`papalote` NO `cometa`** — no es preferencia regional
sino **ERROR DE COMPRENSIÓN: en México «cometa» es el CUERPO CELESTE**. ⚠ **El español NO tiene la colisión alemana**
(su palabra para papalote *Drachen* = también *dragón*, chocando con d1) — `dragón`/`papalote` no comparten nada → **no
desambiguar; no lo "arreglen"**. **`remolcador` fuera → «un barquito valiente»**: la razón filosa es que **el blurb es
decorativo → la actividad NUNCA enseña la palabra → la PRESUPONDRÍA = justo lo que #82 prohíbe.** ⚠ **`ilustrado`
PROHIBIDO en todo blurb** (ambos expertos, independientemente): registro de editorial peninsular **+ comparte raíz con
la tarjeta-respuesta** → «un libro de dibujos», marcador **sólo en d1+d3** (paridad en/de). ⚠ **Trampa de parseo que el
lingüista cazó en el borrador de la MAESTRA:** «un cuento para dormir **sobre la luna**» parsea como *dormir ENCIMA DE
la luna* → «un cuento de la luna para dormir». `granja` no `rancho` (es LA colocación de libro infantil aunque el
referente real MX sea rancho); `chistosos` no `graciosos`/`divertidos` (fun ≠ funny); **`arcoíris` = UNA palabra con
tilde**.

**STRINGS:** 🚨 **«trabajo» ✓ / «tarea» ✗ — el fallo del que depende la actividad**: en México **`tarea` es TAREA
ESCOLAR**; «¿Quién hace esa tarea?» le suena a un niño de 6 a *"¿quién hace esa tarea de la escuela?"* (más fuerte en
MX que en España, donde *deberes* carga ese sentido). **«¿Quién hace ese trabajo?» = desviación DELIBERADA del marco
POSESIVO de de/fr** (`de quién es X` en español es **PROPIEDAD**, no atribución de rol; «¿a quién le toca?» = turnos)
→ **no restaurar el posesivo para igualar a de/fr**. ⚠ **La RAE conserva tildes en MAYÚSCULAS → ESCRIBIÓ/DIBUJÓ, y
`DIBUJO` sin tilde es OTRA PALABRA** (el sustantivo). promptRead conserva el **progresivo** (autor/ilustrador
terminaron; el lector lo hace AHORA).

🐛 **TERCERA APARICIÓN DEL BUG DEL 🔊 — CLASE CONFIRMADA: #84 + #85 + #86 = TODOS los motores hasta ahora.** `speak()`
sin rama es en **ninguno de sus dos brazos** → «Ilustrador» en voz inglesa. **REVISAR EL SITIO DE LLAMADA DEL 🔊 EN
CADA MOTOR, LOS DOS BRAZOS.** (También faltaban `LABEL.es` y la rama es del aria.)

**SEO:** 🚫 **«partes de un libro» = DOBLE MUERTE**: (a) ese SERP MX es de **DIAGRAMA/ficha** (portada, lomo,
contraportada) — quieren un diagrama de un **OBJETO FÍSICO**, nosotros damos **OFICIOS DE PERSONAS** → rebote; (b)
**`field-guide` ya posee `partes-del-libro-…-segundo-grado`** → dos páginas nuestras compitiendo. Slug
`autor-e-ilustrador-quien-escribe-y-quien-dibuja-primer-grado`. **«quién escribe y quién dibuja» hace tres trabajos**:
cola larga de registro infantil, convierte la consulta en una de **PRÁCTICA**, y **nos cerca de author-purpose — la
nuestra es «quién lo hizo», la suya «para qué se escribió»**. **`e` no `o`** («autor E ilustrador» = la cadena de la
lista SEP, `e` ante i-). NO targeteado: roles del libro (**CALCO** de Buchrollen/rôles du livre, volumen cero) · qué es
un autor / diferencia entre (definición → rebote) · cualquier ficha/para-imprimir · cultura del libro (formación
docente).

**⚠ El envoltorio 2+1 en 360 que el lingüista PREDIJO se confirmó** («Ilustrador» = 11 chars vs `min-width:72px`) — es
**centrado y la palabra renderiza completa** → **aceptado; NO se acorta la palabra (§A.13.61 la fija): se arregla el
layout, nunca la palabra.**

## #85 `juniper-story-lantern` — "El farolito de Juniper" (RL.1.2 → **3.º**, eje **Comprensión de textos literarios**) `627a43b9`
Juniper el erizo cuenta una fábula de Esopo en 3 renglones (📖); el niño toca la **moraleja** vs un `detail` (renglón
verdadero del cuento) y una `wrongmoral`. 8 fábulas, bandas 3/3/2. Core grada `kind==='moral'` → 0 líneas.

🚨 **EL ANTI-CUE = la propiedad de diseño que lo sostiene todo (CLASE NUEVA, aplica a todo engine de 3-tarjetas).**
El `detail` REUSA a propósito los sustantivos del cuento (es la trampa); **la moraleja no reusa NINGUNO** (copiar
palabras ALEJA de la respuesta); la `wrongmoral` es plausible-pero-falsa. **Si una moraleja reusa un sustantivo del
cuento, el anti-cue SE INVIERTE y la actividad se rompe.** ⚠ **El core NO lo protege**: su helper `words`/`overlap` es
un regex de letras inglesas `/[^a-z ]/g` = **ayudante MUERTO de auditoría** (`verify-central-message-core.js` corre los
bots sólo sobre `params.rounds` = el pool EN). **El assert es lo tiene que suplir.** También correr los **bots de
longitud** (#79 longestBot): es quedó 37.5%/12.5%, techo 45%.

🐛 **UN DEFECTO REAL QUE MI ASSERT ATRAPÓ Y EL EXPERTO NO — la CLASE «fuga entre rondas».** Un contenido que aparece en
**exactamente 2 moralejas Y EN NINGÚN OTRO LADO** enseña «esa palabra → la tarjeta de la moraleja». El lingüista cazó
«problemas» (rondas 4+8) y reescribió la 8 — **pero metió «difícil», que choca con «un problema difícil» de la 4:
cambió una fuga por otra de la misma clase.** Ni en («A clever idea solves a problem.») ni de llevan el adjetivo → era
añadido sólo del es. Fix: ronda 4 → «Una buena idea resuelve un problema.» ⚠ **El lint debe exigir «y en ningún otro
lado»** — «amigo» está en 2 moralejas PERO también en el cuento/detail de bear → NO es fuga (falso positivo).

🔎 **EL MURO FRANCÉS ESTÁ INTERNAMENTE INVERTIDO — verificado en el código, no en el comentario (#84).** Francia shipea
**author-purpose CE2** y **juniper CE1**: coloca «propósito del autor» (respuesta EN la superficie) un año ARRIBA de
«inferir la moraleja» (respuesta FUERA). Residuo aritmético (+1 desde CP saltándose el peldaño metatextual, que en
Francia está en CE2). **NO transfiere — no bajar es a 2.º citando a fr.** de Klasse 3 = híbrido: «abstraction +
inference» CONTENIDO → transfiere; «fest verortete Klasse-3/4-**Textsorte**» = dónde PONE la KMK el género =
**calendario** → no. ⚠ **#82 CORTÓ HACIA ARRIBA POR PRIMERA VEZ** (en #84 cortó abajo): el calendario de México es el
**DESTINO**, no una transferencia. Aritmética desde el piso mexicano: picture-story 1.º (literal) → author-purpose 2.º
(metatextual, aún EN superficie) → **juniper 3.º** (metatextual + FUERA + trampa anti-superficie activa). El muro: los
2 hermanos de 3.º lo son por **«exige un SISTEMA»** (booker) y **«el significado NO está en la superficie»** (gabby) —
y ese 2.º criterio ES el mecanismo de ésta. SEP: introduce «fábula»+«moraleja» como contenido NOMBRADO en **3.º**; en
2.º tendría que INTRODUCIR su término = violación #82. Ancla literal (única que la maestra defiende, tras
autocorregirse): la práctica social **«Comparar el contenido de fábulas y refranes»** (Español 3.º) — que PRESUPONE la
moraleja como categoría ya poseída.

🚨 **strand-names.ts NO SE TOCA — y no es preferencia.** `'Reading: Literature'` tiene sólo en+de y **CINCO** actividades
vivas comparten ese strand, ya localizadas de **TRES** maneras por actividad: picture-story→«Comprensión de textos
literarios», bea→«Diversidad textual», **story-spine/otto/willow→el eje NARRADO de escucha** (precedente fr « Écouter
de l'écrit et comprendre »). **Una fila es etiquetaría mal a cuatro.** (`localizeStrand` cae a `row.en`; los 3 narrados
aún NO son es-shipped → cada uno toma su propio override cuando le toque.) **En SEP el eje lo decide la MODALIDAD DE
ACCESO = propiedad de la ACTIVIDAD**; Alemania puede usar la tabla porque en la KMK el Bereich es del STRAND.
**Compuerta 0 → la PRUEBA DEL FRELL SE ROMPE** («El frell se glomió porque era mucho más zibo que el grobo…» → nada
rutea) → objeto = CONTENIDO → gate 1 → literario. **El instrumento se valida solo**: bea/author-purpose frelleados SÍ
rutean por marcadores de forma — por eso ELLOS son gate 0 y éste no. ⚠ **NO existe eje SEP de interpretación** —
«Comprensión e interpretación» sería CALCAR a fr (« Comprendre et interpréter » es un dominio francés REAL) → RECHAZAR.
**Compartir el chip de picture-story (1.º) es CORRECTO**: el eje es un ÁREA CURRICULAR, no un peldaño de dificultad —
ésa la carga el chip de GRADO.

🚨 **REFRANES RECHAZADOS — y la pata TERRITORIO se RETRACTÓ (no relitigar).** Razones de CONSTRUCTO: (1) **la pista de
FORMATO es fatal sola** — un refrán se reconoce por su FORMA, y ni el detail (pasado narrativo) ni la wrongmoral
(declarativa) pueden cargarla → «la tarjeta con forma de proverbio» con CERO comprensión: **el diseño quita la pista de
superficie y un refrán devuelve una MEJOR**; (2) **el premio al conocimiento previo rompe RL.1.2** (quien se sabe el
refrán contesta SIN LEER). *(El precedente fr no transfiere: la moral de La Fontaine es el verso final memorizado de la
fábula MISMA; los refranes españoles son fórmulas EXTERNAS.)* 🔎 **La maestra alegó territorio («gabby posee los
dichos») — FALSO, verificado por el lingüista Y por mí: gabby EXPULSÓ los refranes** (su #79 rechazó «dicho» porque va
en par con «refrán» = «PROVERBIO de oración completa CON MORALEJA», shipea un LINT, su prosa se contrasta contra ellos,
su SEO los rechaza). **Las 8 rondas es de gabby son MODISMOS; la llave del manifest es literalmente `idiom`.** → **el
único dueño de «una enseñanza» es juniper**. Quitar la pata FORTALECE el fallo (validez de tarea, no territorio).
📋 **BACKLOG: fábula↔refrán = hermano FUTURO de 3.º** (la práctica social literal de SEP; territorio VACÍO). Lo
elegante: **si las TRES tarjetas son refranes, «con forma de proverbio» deja de discriminar** — formato CONSTANTE
restaura el significado como único discriminador. Secuenciar DESPUÉS de juniper (su insumo es el producto de juniper).

**RONDA 6 — síntesis a tres bandas.** «fuerte» es palabra del cuento DOS VECES → la moraleja literal (fuerza) INVIERTE
el anti-cue; en/de esquivan con otra raíz (force/Gewalt), el español no puede. Murieron: «ser fuerte» (maestra —
invierte; se autocorrigió: «me infligí la falla que acababa de prohibir»), «con gritos» (lingüista — **INVENTA UN
REFERENTE**, nadie grita; concedió: «un referente inventado es peor defecto que el que arreglaba»), «brusquedad»
(nominalización -dad que un 3.º no posee). → **«Tratar bien consigue más que obligar.»** = la 2.ª opción INDEPENDIENTE
de AMBOS; gana porque **nombra el MÉTODO, no un rasgo** («ser rudo» = rasgo + código lucha libre), **«obligar» ES lo
que hace el viento** (abstracción de un suceso DE la fábula), y **«consigue» no «logra»** (la ronda 1 ya dice «lo
logra» → sería la fuga entre rondas). Brecha más ancha del mazo: detail 4 vs moraleja 0.

**CONTRATO DE REGISTRO (cómo sobrevive el anti-cue):** detail = pasado narrativo; **moraleja Y wrongmoral = presente
genérico impersonal** → 2 de 3 tarjetas comparten la voz de la moraleja, así que el registro aísla al DETAIL, nunca a
la moraleja. Corolario: **prohibidas las moralejas en 2.ª persona.** 7 aperturas distintas en 8 (Quien ×2, bandas
distintas). 🚩 **bear «amigo» TAMIZADA-NO-OLVIDADA**: en/de/fr rompen la regla idénticamente (el punto de la fábula ES
la amistad) → **DEGRADADA, NO INVERTIDA** (detail 2 sustantivos vs moraleja 1; la wrongmoral carga «oso» → ninguna
tarjeta es la única sin sustantivos). 🚩 **lion «pequeño»** = ADJETIVO, no sustantivo — en echa «small» igual; **la
regla es SUSTANTIVOS**.

**FÁBULAS: 0 cambios, 1 renombre** «El viento del norte y el sol»→«El viento y el Sol» (Bóreas = marco europeo-anglo).
La actividad **CUENTA** la fábula → nunca PRESUPONE que la conozcan (#82 tamiza vocabulario + modelo de mundo).
🚫 **NO importar Samaniego/Iriarte** (aunque SEP use a los tres): están **EN VERSO y CIERRAN ENUNCIANDO LA MORALEJA** →
**dirían la respuesta DENTRO del cuento**. Esopo en prosa con moraleja no enunciada es DECISIÓN de diseño.

**🚩 Tamices:** `pico` y `huevos` **CLAREADOS** con la lógica de la doctrina (los albures disparan por **MARCO
SINTÁCTICO**, no por lema — la regla «cola» de #83): pico = poseedor ave, sin cópula; **`huevos` porque el PLURAL nunca
aparece en cadena que vea el niño** (singular «un huevo de oro»; el "eggs stopped" → «nunca más hubo oro», que además
conserva «oro» que la moraleja evita). Tachados: `calientita`→`abrigada` · `nieve` fuera (no es invierno mexicano) ·
**`cantó` no `jugó`** (la cigarra CANTA es lo canónico; el "played" inglés es el outlier) · `piedritas` no «guijarros»
· `Aventó` no «Echó» (roza *echar aguas*) · `tomó agua` no «bebió» · `a mordidas` · **NUNCA `palo`** (albur). **`Se
rio` SIN ACENTO (RAE 2010)** — un agente futuro lo "arreglará" a «se rió»: **ESTÁ MAL**. El esquive del lobo: el cuento
nunca dice «mintió» → «miente» es libre, y la moraleja usa **«confianza» no «creer»** porque «creyó» está en L3; **un
agente futuro querrá «nadie le cree» — eso reintroduce el solape. NO.**
🔎 **CORRECCIÓN DE DOCTRINA: «pájaro» es la forma llana SEGURA; «pajarito» es el eufemismo MX vivo** (#83). Ningún
"pase de calidez" futuro puede escribir «pajarito».

**STRINGS:** «historia» PROHIBIDA → el título de/fr no se calca. 🔎 **«linterna» es el OBJETO EQUIVOCADO: en México es
una LÁMPARA DE MANO** → **«farolito»** (farol de vela, posadas). `title` «El farolito de Juniper» (22). **«fábulas» en
el título = REPETICIÓN, no ganancia** (el prompt lo dice cada ronda; el valor SEO vive en slug/page_title). Término =
**«moraleja»** (término SEP, contraparte de „die Lehre", **ya asignado a esta actividad por un fallo previo del
operador**: la adjudicación #82 nombra a juniper por id como «el hermano que enseña exactamente la moraleja» y fija que
**«fábula» es un TÉRMINO CURRICULAR**). Split verbo/sustantivo como el alemán: **VERBO «enseña» andamia**
(prompt/juniperIntro/hintPick), **SUSTANTIVO «moraleja» nombra dónde vive la respuesta** (theAsk/hintWrong/win).

🐛 **SEGUNDO CASO DEL BUG DEL 🔊 — CLASE CONFIRMADA RECURRENTE (#84 + #85): REVISAR EL SITIO DE LLAMADA EN CADA MOTOR.**
`speak()` no tenía rama es en **NINGUNO de sus dos brazos** (`LCSAudio.speak({lang: LANG})` pelado + el fallback
`SpeechSynthesis` con `fr→fr-FR/de→de-DE/else→en-US`) → la fábula se habría leído **en voz inglesa**. También el aria
del erizo.

**SEO:** 🚨 **«fábulas con moraleja» = consulta de BIBLIOTECA DE TEXTOS → DECLINAR pese al volumen** (ese SERP es Mundo
Primaria / Bosque de Fantasías / listicles / YouTube: quieren una fábula COPIABLE; nosotros damos 3 renglones y luego
preguntamos → rebote). **Pero sólo el término cabecera PELADO es de intención-texto — átalo a un VERBO y la intención
se invierte**: «**identificar** la moraleja de una fábula» = la redacción del aprendizaje esperado SEP = consulta de
PRÁCTICA. **Ese verbo es toda la cerca de intención.** Slug `identificar-la-moraleja-de-una-fabula-tercer-grado`.
Registro: «fábula»/«moraleja» son de primaria (≠ la trampa de secundaria de «propósito comunicativo») y «identificar la
moraleja» está anclado en 3.º → **3.er voto independiente por 3.º**. **Diferenciador vs gabby (ambos en 3.º):** gabby =
EXPRESIÓN fija cuyo significado ≠ sus palabras (nivel oración); Juniper = RELATO cuya lección es una regla general
extraída de los sucesos (nivel discurso) — **cero solape de tokens; la cerca es la TERMINOLOGÍA, no el grado.**

⚠ **GAP DE HERRAMIENTA (no bloqueante, no arreglado):** `visual-qa-activity.js` reportó **`cards=0`** en las 8 rondas —
su selector de tarjetas no matchea las clases `.jsl-*` de este motor, así que **sparse/tiny/tap midieron NADA** (FITS/
corte sí corrió y pasó; el Read personal 360/768/1024 confirmó las 3 tarjetas sin truncar). Vale arreglar el selector
del harness compartido en su propio work unit.

## #84 `author-purpose` — "El correo del puerto de Marlow" (RI.2.6 → **2.º**, eje **Diversidad textual**) `2780dff4`
Marlow el pelícano: 9 notas de 2 oraciones, 3 buzones = **para qué se escribió** (informar/entretener/instruir).
Core grada `isAnswer(round, purpose)` → 0 líneas de core. **Dos bifurcaciones ratificadas por el operador.**

🔎 **HALLAZGO REUSABLE — la premisa del CE2 francés era FALSA.** El comentario fr en `page.tsx:111` justificaba CE2
como «un cran au-dessus du genre **(bea #50 CE1)**» — pero **bea es CP** (sin fila en GRADE_OVERRIDE, manifest
`grade:"1"`, auto-map fr identidad, slug `histoire-ou-documentaire-cp`). La aritmética que Francia MISMA declara
(género +1) aterriza en **CE1**. El escalón extra vino sólo de «repères annuels … fin de cycle 2» = **CALENDARIO**.
Klasse 3 igual (ahí PONE la KMK el Bereich; Klasse 1-2 se la come el Erstlesen). **#82: ninguno transfiere; la
RELACIÓN +1 sí** → bea 1.º → propósito **2.º**. ⚠ **PRIMERA VEZ que #82 corta HACIA ABAJO de de Y fr.**
⚠ **AUDITAR otros comentarios fr que citen el grado de un hermano — éste citaba uno que nunca existió.**
Contra 3.º: booker exige un SISTEMA, gabby tiene el significado FUERA de la superficie; aquí la respuesta ESTÁ en la
superficie (el diseño prohíbe inferir). A la par de field-guide (2.º) a propósito: aquél fue CARGA DE DECODIFICACIÓN
(~9 renglones), esto lee 2 oraciones + 🔊. SEP: informar/entretener/instruir = las 3 familias que la **Fase 3** ya
trabaja → nombrarlas es su CONSOLIDACIÓN, y 2.º es su año de cierre. **México corre MÁS TEMPRANO que de/fr aquí.**

🚨 **ENMIENDA RATIFICADA a la compuerta 0 (regla RI/RL de 3 compuertas):** la compuerta 0 gira sobre el **OBJETO**
del aprendizaje (forma/propósito del texto vs su mensaje), **NO sobre la UBICACIÓN de la pista — superficie ≠
paratexto**; el «(título/portada/formato)» de #81 era la lista de EJEMPLOS de bea, no la definición.
**Instrumento = la PRUEBA DEL FRELL**: sustituye todo sustantivo de contenido por sinsentido → si las rondas siguen
ruteando bien, la respuesta sobrevive a la destrucción total del contenido = «no necesita entender lo que DICE».
→ 2.º miembro de la cubeta de bea (que la maestra de #81 **prenombró** con esta pregunta). Sin la enmienda la cubeta
se congela en bea para siempre. `strand-names.ts` 'Reading: Informational Text' **sólo tiene en+de** → el override es
OBLIGATORIO (si no, fuga en inglés §20.10).

🚨 **«¿PARA QUÉ…?» NO «¿POR QUÉ…?»** — divergencia de de `Warum`/fr `Pourquoi` **forzada por el español**:
¿Por qué?→Porque… = CAUSA; ¿Para qué?→Para… = PROPÓSITO, y los buzones dicen «Para …». **NO lo "arreglen".**
Y **SIN AGENTE** («¿Para qué se escribió esta nota?»): «el autor» ×9 = genérico masculino (eje NEM Igualdad de
género) + referente fantasma (correo ANÓNIMO) + **el core enuncia el estándar sin agente** ("judge WHY a text was
written") → la **ley del author-move ata a los BUZONES, no a la pregunta**. `se` impersonal > 3.ª plural
`escribieron` (denota agentes plurales indeterminados → cambia un fantasma singular por una MULTITUD).

🚨 **LOS BOTES DICEN PROPÓSITO; NUNCA GÉNERO** (regla nueva). Dos candidatos bloqueados por razones distintas:
«Para contar un **cuento**» → `cuento` nombra el **TIPO** = la tarea de **bea (1.º)** → colapsa las páginas y borra
el +1 que sostiene el 2.º. «Para **divertirnos**» → **EFECTO EN EL LECTOR**, que el encabezado del core prohíbe
literalmente (*"author-MOVE bin labels (never reader-effect)"*) + un «nos» que ningún hermano carga.
→ **«Para dar información» (20) · «Para contar algo chistoso» (25) · «Para decir cómo se hace» (23)**.
`chistoso` se libra porque **el estrechamiento a chiste vive en el SUSTANTIVO «chiste», no en el adjetivo**.
`información` > `datos` porque **bea (1.º) ya instala «texto informativo» — el niño LLEGA con la palabra puesta**.
⚠ **La restricción real NO es el conteo de chars sino el TOKEN sin cortes**: `.ap-cand` a 380px = flex-basis 30% /
**min-width:0** → ~14 chars/token, y min-width:0 = **DESBORDA en vez de encoger**. `información` (11) es el único
cerca del techo → nunca `informaciones` (13) ni `entretenimiento` (15).

🚨 **ap-e1 = RECONSTRUCCIÓN (Mischform Rule A) — fr/de SHIPEAN el defecto.** Su ap-e1 (perrito persiguiéndose la
cola y cayendo en las hojas) es **conducta canina REAL**, en el mismo mazo que datos de búhos/abejas → un niño
informado defiende "da datos de verdad" **con mejor evidencia que la nuestra** = ítem discutible, que el core
prohíbe. Las 2 pistas que "lo separan" no sirven: **el «!» es PUNTUACIÓN, no propósito** (enseñaría la regla FALSA
"«!» = cuento", que se cae con la no-ficción entusiasta — saturada en MX), y **nombrar también es movimiento de
no-ficción**. → **la acción IMPOSIBLE es la única evidencia que carga el juicio, y es lo que permite tener datos
REALES de animales en el bote de informar**. Las 3 entertain la llevan (hojas que aplauden · luna que guiña ·
calcetines que salen corriendo solos — e3 endurecida; el fr se apoya en la CREENCIA interior de la gata = nada
externamente imposible). **Lo confirma bea**: su prosa es ya enseña «animales que hacen cosas imposibles» como LA
pista de cuento en 1.º. **NO restaurar paridad con el francés.**

🚨 **`Michi el gato` MASCULINO** — dos defectos convergen, sólo el masculino arregla ambos: «**la gata**» = insulto
clasista vivo («no seas gata») → **precedente ratificado #82 zorra→zorro verbatim**; y «**Mira** la gata se creía…»
se lee como IMPERATIVO → **el nombre propio desaparece**, dañando la pista misma (personaje con nombre) del bote de
entretener (defecto exclusivo del español). `Pelusa` arregla el 2.º pero deja «la gata» en pantalla.

**Palabras de paso: `primero` / `después` / `al final`.** ⚠ **`después` NO `luego`** — en habla infantil MX `luego`
es sobre todo conector **NARRATIVO** («y luego…, y luego…») = el registro de ENTERTAIN; el set de instruct debe
quedar libre de marcadores narrativo-ambiguos. `al final` no `por último`/`finalmente` (registro de maestra).
⚠ `al final` son **DOS tokens** — un SEQ regex es no puede ser `\b(a|b)\b` ingenuo.

**Reconstrucciones (NO "corregir"):** Pip→**Firulais** · búhos→**mariposas monarca** (ambos tacharon `tecolote` por
el refrán del mal agüero; la monarca es identidad nacional Y **mejor prototipo de informar** — datos concretos +
presente habitual, sin personaje, sin evento único) · graine→**sembrar un frijol** en maceta (EL experimento escolar
MX) · **barquito**.
**🚩 Tamices:** `coger`→`atrapar` (calco más catastrófico) · `caliente` para el sol → `que arde sin parar` (los
libros SEP SÍ dicen «estrella muy caliente» → **evitar la risita, no corregir un error**) · `meter…adentro`→`pon y
cúbrelo` · **`hoyo/hoyito` = el arreglo "obvio" de meter es PEOR** (jerga anatómica — puerta trampa) ·
frotar→tallar · colmena→panal · recolectan→juntan · mare→charco.
**CLAREADOS, no sobre-corregir:** `cola` (rabo; la lectura de trasero exige poseedor HUMANO; «el perro se persigue
la cola» es imagen fija e inocente — prohibirla cuesta la mejor estampa) · `mariposas` (mariposón insulta sólo
APLICADO A PERSONA) · `mojar` (la jerga vive en el modismo). **`distraer` = FALSO AMIGO** del fr `distraire` («la
nota quiere distraerte» se lee como CRÍTICA) → `entretener`.

🐛 **CLASE DE BUG NUEVA — revisar el sitio de llamada del 🔊 en CADA motor futuro:** `author-purpose` pasaba
`lang: LANG` **PELADO**, sin mapa `es`→`es-MX`, mientras TODOS los hermanos ya shipeados lo mapean en el sitio de
llamada (`atlas-fact-files :23`, `bea-two-bookshelves :20`, `booker-glossary-desk :24`). El 🔊 era el ÚNICO audio y
las notas SON el contenido → habría leído todo con voz genérica/peninsular. Igual: **`_srMirror` ramificaba
de/fr/else→en** → el es habría emitido «Note: … Bins: …» EN INGLÉS a lectores de pantalla (**fuga silenciosa que
ningún QA visual atrapa**); y `strings.title`/`instruction` sin es → caían a inglés.

**SEO:** «propósito **comunicativo**» / «intención del autor» = término de **SECUNDARIA/prepa** → NO encabezar
(regla #83: Google resuelve consultas de grado ambiguo hacia el grado donde el término se enseña canónicamente).
**«Propósito DEL texto»** = registro primaria → el líder. Señal de banda gratis: la tríada de secundaria es
informar/**persuadir**/entretener; **`instruir` es propósito de PRIMARIA** → la tríada misma aleja del clúster.
Slug `proposito-del-texto-informar-entretener-instruir-segundo-grado`. **Diferenciador vs bea** (la vecina):
bea = ¿qué **TIPO** es? (2 clases, por la portada, 1.º); Marlow = ¿**para qué** se escribió? (3 propósitos, por el
texto, 2.º). NO targeteado: comprensión lectora (cerca) · tipos de texto (bea) · textos informativos segundo grado
(cabecera de familia — aplanaría atlas+field-guide+Marlow) · **«para imprimir» (NO cortejar intención imprimible en
una URL interactiva)** · «para qué se escribió este texto» como líder (consulta → rebote; viaja gratis en el intro).
El slug sirve el término de la **maestra** (es la palabra impresa en el encabezado de la ficha SEP).

## 🔧 RECETA DE BUILD que se probó en #83 (usarla cuando "solo las palabras se localizan")
Si el engine dice «structure KEPT VERBATIM, only the words localise»: **CLONA las rondas fr y sustituye SOLO las
palabras** (`JSON.parse(JSON.stringify(fr))` + un mapa `frWord→esWord`) → **la paridad estructural queda garantizada por
construcción**, y un assert de paridad (strip de `word`/`flipWord`/`sceneLabel` y comparar el resto) la prueba.
**⚠ PERO la paridad NO puede cachar residuo del idioma origen** (las palabras son justo lo que ignora) → **añadir SIEMPRE un
assert de residuo fr/de explícito**. Esto no es teórico: en #83 las `pairs` del oddpair son **`{a:{word}, b:{word}}`, NO
`{words:[...]}`** → mi loop de traducción fue un **no-op silencioso** y la ronda 5 se quedó ENTERA en francés. **Inspeccionar la
forma real del dato antes de escribir el loop.**
⚠ **el plan alemán está STALE en la sección "B) Engine localization" de CADA actividad** (#77, #78, #79 y #80 lo confirmaron
CUATRO veces seguidas): describe añadir `var LANG` / el wiring de `roundsL10n` / los arias — **el de-fanout y el fr-fanout YA los
shipearon**. **SIEMPRE leer el engine real antes de planear**; el job es casi siempre solo `strings.es` (+ `L.es` si el engine usa
el patrón `txt()`) + speak es-MX (si hay TTS) + arias (si no son aria-hidden) + `roundsL10n.es` + manifest + prose + `?v` +
page.tsx. **El FRANCÉS suele ser el mejor modelo estructural para es** (infinitivos tras preposición, sin fusión) — leer las
rondas fr ANTES de diseñar las es.
Recent commits: #76 fern-clue-garden `0748c2aa` · #77 jasper-just-right `8cbea2eb` · #78 atlas-fact-files `ca2862e9` ·
#79 gabby-sayings `cdf029ce` · #80 field-guide `2a1b2dcc`.

## 🔑 REGLA es RI/RL VIGENTE (amended en #81, operator-ratified — SUPERSEDE la de 2 compuertas de #80, que a su vez superseó la de un solo eje de #78)
**TRES compuertas, EN ORDEN:**
0. **¿El objeto del aprendizaje es el TEXTO MISMO (qué tipo es, para qué sirve, cómo se reconoce), o su CONTENIDO?**
   - **El texto mismo / su tipo** → **«Diversidad textual»**
   - **El contenido** → pasa a la 1
   - 🔒 **GUARDRAIL:** la 0 dispara **SOLO cuando el niño NO necesita entender lo que el texto DICE** — clasifica por
     **pistas de superficie** (título/portada/formato). Si para responder hace falta entender el contenido, es la 1.
     *(Esto es lo que mantiene a #80 en la compuerta 1.)*
   - ⚠ **La 0 va PRIMERO**: puesta al final nunca se alcanzaría — «clasificar por tipo» se colaría en la 1 como un
     «comprender» difuso y etiquetaría mal.
1. **¿El aprendizaje es COMPRENDER el contenido, o LOCALIZAR información?**
   - **Localizar** → **«Búsqueda y manejo de información»** *(sin importar la modalidad)*
   - **Comprender** → pasa a la 2
2. **¿El niño LEE o ESCUCHA el texto?**
   - Lee → **«Comprensión de textos informativos»** (RL: **«Comprensión de textos literarios»** — **RECLAMADO en #82**)
   - Escucha → **«Escucha y comprensión de textos»** (aún reservado)
   - 🔑 **CRITERIO LEE-vs-ESCUCHA (afilado en #82 — la forma durable):** NO es «la superficie de respuesta es texto» sino
     **«¿hay texto que el niño DEBE descifrar SIN apoyo de audio?»**. El 🔊 típicamente lee **el estímulo** (el cuento/texto),
     NO la pregunta ni las tarjetas de respuesta → ésas son **texto SIN VOZ**. **El audio baja la carga del ESTÍMULO, nunca de
     la RESPUESTA** → aun usando todos los apoyos, el niño tiene que leer → **LEE**. Contraste: los hermanos narrados
     (story-spine/willow/otto/nila) tienen **superficie de respuesta NO textual** → ESCUCHA.

Chips es vivos: **«Diversidad textual»** (bea #81) · **«Búsqueda y manejo de información»** (field-guide #80) · **«Comprensión de
textos informativos»** (atlas #78) · **«Comprensión de textos literarios»** (picture-story #82). Reservado: «Escucha y comprensión
de textos» (para el 1.º hermano narrado es — story-spine/willow/otto/nila).

## 🔑 DOCTRINA CULTURAL: **INTRODUCE vs PRESUPONE** (nueva en #82 — **ESTRECHA #81, no lo revoca**)
> Un elemento ajeno / de clima frío / lejano es **ACEPTABLE cuando el material lo INTRODUCE** — lo nombra en el texto, lo dibuja,
> le da contexto, y el niño lo adquiere **desde la página**. Es **INACEPTABLE cuando el material lo PRESUPONE** — le pide al niño
> reconocerlo/nombrarlo/elegirlo **sin apoyo**, como un objeto que ya posee.

Probada contra los dos precedentes: **#78** (pingüino/hielo) → el texto INFORMA sobre el hielo; **la extrañeza ES el contenido** →
limpio ✅. **#81** (el «guante» como pista de portada) → un objeto desconocido que el niño debía leer **sin apoyo**, fuera de
contexto, en una actividad cuyo objeto de aprendizaje NO era el guante = puro costo de decodificación, cero retorno → rechazado ✅.
**⚠ La hipótesis ficción-vs-objeto-cotidiano da la respuesta correcta pero es el MECANISMO EQUIVOCADO** (una ronda de FICCIÓN que
pregunte «¿qué te pones para la nieve?» esperando «guante» SIGUE fallando — ficción, pero presupone; un texto INFORMATIVO sobre
mitones pasa — no-ficción, pero introduce). **La ficción es un buen PROXY de "introduce"; INTRODUCE/PRESUPONE es la regla que
generaliza.** 🚩 **El wording de #81 («los niños MX no usan guantes») era una afirmación EMPÍRICA demasiado amplia** (el altiplano
y el norte usan gorro/bufanda/guantes cada invierno; la nieve es familiar por medios per #78): era **correcto PARA EL MECANISMO de
#81** y **NO es una prohibición general de objetos de clima frío**. Sin este registro, un agente futuro que lea #81 al pie de la
letra mataría por error una historia válida.

## 🔑 REFINAMIENTO del es-K-CLUSTER (nuevo en #82 — por qué NO siempre protege)
El K-cluster bloquea un **DESFASE DE SISTEMA ESCOLAR**: Alemania mueve K→Klasse 1 en parte porque **el Kindergarten alemán NO es
escuela**, así que todo lo escolar se empuja hacia arriba = **artefacto de CALENDARIO ajeno** que con razón NO heredamos.
**PERO Francia TIENE GS y SÍ es escuela, y aun así movió esto a CP** → ése override es **DEMANDA DE CONTENIDO, no calendario**.
**México está en la posición de Francia** (nuestro kínder ES escuela, 3.º obligatorio) → **el razonamiento francés SÍ transfiere;
el alemán por sí solo NO.** ⚠ Regla práctica: cuando de Y fr coinciden en subir el grado, preguntar **¿es calendario o demanda de
contenido?** — si el fr lo argumenta por contenido, transfiere.

## 🚨 PROHIBICIONES PERMANENTES (albur / falsedad de categoría)
- **«nabo» = HARD NO PERMANENTE** — vulgar para pene, plenamente legible en MX. Si alguien "corrige" zanahoria→nabo por
  fidelidad al folclore (*El nabo gigante*), está metiendo un albur en un producto infantil mexicano. (Además: nabo casi no
  existe en la cocina MX → sería el error PRESUPONE exacto.)
- **«la zorra» = insulto sexual → el zorro es SIEMPRE MASCULINO**, en toda cadena, aria, alt-text y variante futura. Jamás
  feminizar. El sustantivo masculino lo hace estructuralmente imposible.
- **«pajarito»** = eufemismo MX vivo para los genitales de un niño → usar **«pájaro»** (no bloqueo, pero la forma plana no cuesta
  nada y es más corta; no dejar que entre en un futuro "warmth-pass").
- **«historia» ELIMINADA** (de #81, reforzada en #82): significa *Historia* (la materia) **Y** *un relato VERDADERO* → usar
  **«cuento»**. En #82 el argumento es más fuerte: el hermano de al lado (bea #81) enseña literalmente **cuento vs texto
  informativo** = ficción vs verdad → llamarle «historia» a la ficción **desdibuja la distinción que la plataforma enseña en la
  puerta de junto**. (El SEO converge: «cuentos cortos» ≫ «historias cortas» en MX.)

Siempre **per-activity `STRAND_OVERRIDE`; `strand-names.ts` NO se toca** (en SEP el eje es propiedad de la ACTIVIDAD, no del
strand US). **⚠ NUNCA «Comprensión lectora»** — ya es el chip es de `Reading: Foundational Skills` (fonética) en 5 actividades
vivas, y ese mapeo está MAL (debería ser «Alfabetización inicial»; comisión aparte, `strand-names.ts:116`).
**🚩 Candidato de reconciliación (NO relitigar):** booker #75 shipeó «Ortografía» pero consultar el diccionario para ENCONTRAR
una palabra es *localizar* → candidato al bucket nuevo. Operator's call, comisión futura.

**#83 note (ANTÓNIMOS / «lo contrario» K.L.5.b; GRADE 1.º + STRAND «Ampliación del vocabulario», SIN fork — converge con de+fr+
doctrina+la pared de hermanos):** engine YA i18n en/de/fr, `txt()` lee `LCS.i18n.current` → **NO `var LANG`** → job es = `L.es`
[15] + `strings.es` [8] + `roundsL10n.es` [11] + **3 ramas es hardcoded** (generate prompt / oddpair aria joiner / scene aria);
`?v=3→4`; wrapper 9.313→9.314. Core `opposites-core.js`: **`oracle(round)` devuelve el ÍNDICE** del opposite para
pick/generate/balance/verb (no un booleano). El diseño: el opposite se discrimina de un **SAME-DIMENSION SIBLING** (negro→blanco
opposite, **rojo** = la trampa) — el assert verifica que el sibling **Y** el opposite compartan el `oppositionId` del target (si
no, el atajo "escoge la del mismo tipo" funcionaría).
**GRADE 1.º (`GRADE_OVERRIDE es:'1'`, native "K")** — la **cláusula de escape del es-K-cluster (#82) en pleno**: (1) Francia TIENE
GS y SÍ es escuela y aun así movió a CP por «la maternelle travaille les contraires à l'ORAL» = **demanda de contenido**; (2)
**«lo contrario» SÍ es competencia ORAL de preescolar en SEP — y por eso mismo esto es 1.º**: la Fase 2 los USA en interacción
oral, nunca los NOMBRA como relación; la actividad **escribe** la capa oral y la vuelve reflexiva (patrón de 2 capas #74); (3)
**el contraargumento del glyph, RECHAZADO** (yo lo levanté, la maestra lo respondió): sí, un no-lector rutearía negro→blanco por
el swatch en `pick`, **pero `oddpair` pregunta cuál de dos PAREJAS ESCRITAS no es de contrarios = un juicio sobre una RELACIÓN, y
NINGÚN GLYPH ENTREGA UNA RELACIÓN**; y `route` exige leer las etiquetas de las puertas; (4) **la pared de hermanos**: jasper #77
(también con apoyo de imagen) es 1.º = «el piso de primaria» y los antónimos son MÁS reflexivos (exigen sostener la DIMENSIÓN y
elegir el POLO) → **no puede shipear por debajo de jasper**.
**🆕 TRES REVERSIONES DELIBERADAS (registrar para que un agente futuro NO las "corrija"):**
- **grande / pequeño, NO «chico»** — reversión del instinto "la palabra más MX": el homónimo **chico = muchacho** está vivo y en
  una tarjeta escrita pelada eso es ambigüedad de decodificación con retorno cero. «pequeño» NO es peninsular: es el par que
  escribe el SEP; «chico» es el registro ORAL. Misma jugada que el oben/unten-sobre-hoch/runter alemán: elegir el par sin fuga.
- **contento, NO «feliz»** — **feliz→infeliz es antónimo POR PREFIJO = otra destreza = fuga.** «contento» = alegría externa/
  situacional = lo que dice una carita feliz; su contrario «triste» es inequívoco.
- **arriba / abajo** — RECHAZADOS «alto/bajo» (fuga a la dimensión TAMAÑO → chocaría con grande/pequeño) y «encima/debajo»
  (relación de objetos; una flecha es DIRECCIÓN).
Además: **«jalar» obligatorio** (peninsular *tirar de*; **«tirar» pelón en MX = aventar** → error de plano); «levantar» sobre
«alzar» **y la trampa funciona porque el contrario verdadero de levantar es «bajar», no «jalar»**; «prendida/apagada» («prender»
es el verbo MX de la luz). Kid term **«lo contrario»**; **«antónimo» es palabra de MAESTRA** (SEP ~2.º/3.º) → solo prosa docente
+ SEO (aserrado ausente de toda cadena kid-facing). Puertas **«Lo contrario» / «Mismo tipo»** — NO «Parecido», **semánticamente
FALSO** (rojo no se PARECE a negro; es del mismo TIPO). **🚩 sol/luna NO son antónimos léxicos** (el real es día/noche; sol/luna
son sus emblemas) → **la ronda `scene` se enmarca «al revés», nunca «lo contrario»**. **🚩 GUARDS: «caliente»/«prendido» solo
sobre OBJETOS/clima, jamás sobre Quill ni el niño** («estar caliente» exige cópula + sujeto PERSONA); **«jalar» solo transitivo
pelado** (el albur es «jalársela» — exige reflexivo + clítico); **las tarjetas son INFINITIVOS** y la resonancia de letrero
**EMPUJE/JALE** es IMPERATIVA → vive en la PROSA, nunca mezclada en las tarjetas.
**🐛 CUATRO BUGS REALES:** (1) **las `pairs` del oddpair son `{a:{word},b:{word}}` NO `{words:[]}`** → mi loop fue un no-op
silencioso y la **ronda 5 se quedó ENTERA en francés**; la paridad estructural NO puede cacharlo (las palabras son lo que ignora)
→ **añadido un assert de residuo fr explícito**. (2) **`trade`: «¡Cámbialo!» sería un BUG DE GÉNERO** — su referente es la tarjeta
que tocó el niño, que incluye «derecha» (f) y «jalar» (verbo) → **«¡A cambiar!»** (invariante). (3) **el aria de `scene`**: un
« (réparé)» al estilo fr da «Lámpara prendida (arreglado)» = género mal en 2 de 3 → **«(ya está)»**; **⚠ el FRANCÉS SHIPEADO
carga exactamente ese desliz** («réparé» tras «lampe éteinte») — NO copiarlo. (4) **el `{a}` de la línea `route` llega
CAPITALIZADO** (`txt(cog,{a:cap(anchor.word)})` L~395) → «¿Lo contrario de **Negro** o…?» es agramatical en español (un adjetivo
de color a media oración va en minúscula — la MISMA regla que quita el `cap()` del generate prompt); **lo cachó el Read personal,
ningún gate**; fix a la alemana: **el string route de es DROPEA `{a}`** (el de tampoco lo tiene) — no se pierde nada, la tarjeta
del ancla está en pantalla. (El fr shipeado tiene el mismo desliz latente.)
**⚠ VISUAL-QA CACHÓ UN CUT-OFF es REAL y se arregló acortando CONTENIDO, nunca el gate:** r3 (`route`) @320 ctrlBottom **681 >
640** (en 579 / fr 600 — **el español simplemente corre más largo**) → `doorSame` «Del mismo tipo»→**«Mismo tipo»** (paridad fr,
misma semántica, sigue evitando el falso «Parecido») + línea `route` apretada → **589, mejor que fr**.
Otros: **el generate prompt necesita el «¿» de apertura** (específico del español — de/fr no) **y dropea `cap()`**; **«el otro
extremo» NO «el otro lado»** (el segundo es *literalmente cierto* en 4 de 11 rondas — izquierda/derecha/arriba/abajo — y se
leería como instrucción espacial); «balanza» nunca «báscula»; **«¿Cuál…?» no «¿Qué…?»** (el niño ELIGE de un conjunto; «¿qué
es…?» pide una definición). **🚩 GUARD Y→E:** la «y» española se vuelve **«e»** ante sonido i-/hi-; el oddpair autorado está a
salvo (negro/blanco · arriba/abajo · rojo/azul) **pero «izquierda» está en este set** → un oddpair futuro con palabra i-/hi- en
el slot `b` daría «Arriba y izquierda» (agramatical) → **aserrado**. **A-CUE flagged + SHIPPED:** arriba/abajo comparten «a-»
inicial; riesgo BAJO (abstraer una regla de letra inicial está muy por encima de 1.º; el par es maestra-locked sin alternativa MX;
de/fr/en no tienen equivalente) — registrado para que no se "descubra" luego como defecto.
**SEO: el slug carga AMBOS registros pero LIDERA con la palabra del niño** — «palabras contrarias» = lo que teclea un papá de 1.º
(poca competencia; **su SERP entero es nuestra banda de edad, porque es la palabra que se usa justo cuando el niño aún no tiene el
término técnico**); «antónimos» = lo que teclea la maestra. **NO liderar con «antónimos»**: el SEP lo introduce ~2.º/3.º → ese
SERP head está **dominado por 2.º-6.º/secundaria** y Google resuelve las queries educativas ambiguas de grado hacia el grado donde
el término se enseña canónicamente. Espeja al alemán; el fr pudo soltar la palabra docente porque el francés no tiene capa
"antonymes CP" de volumen — **el español sí**. **NO targeteados:** «sinónimos y antónimos» [**la trampa de más volumen**: quiere
AMBOS conceptos como ficha pareada y es material de 4.º-6.º/secundaria → volumen real, no NUESTRO volumen]; «vocabulario primer
grado» [head de familia — **OCHO** páginas competirían y se aplanarían]; «comprensión lectora» [valla vigente]; «significado de
las palabras» [choca con fern #76 + gabby #79 — nuestro diferenciador es *contrariedad*, no *significado*]; «palabras que se
parecen» [es la **mecánica de la trampa**, y literalmente el tema de olive #27 + ziggy #35]; «opuestos» [sesgo preescolar];
«lista de antónimos» [intención de consulta → rebote]. 5 files, 0 core/shell/CSS/strand-names; DoD GREEN (oracle + paridad fr +
sin residuo fr + trampa same-dim + guards + lints, verify-es 144, visual-qa 320–1366 ×11 es+en+es, Read 360/768/1024, 0 EN leaks,
prior locales byte-intact).
**#82 note (COMPRENSIÓN DE UN CUENTO / detalles clave RL.K.1; **el chip reservado «Comprensión de textos literarios» POR FIN
DISPARA**; GRADE 1.º + character «Fabio» operator-ruled):** engine YA i18n en/de/fr → job es = `L.es` [4] + `strings.es` [3] +
speak es-MX + `storiesL10n.es` [3 cuentos × 3 viñetas] + `roundsL10n.es` [11]; `?v=3→4`; wrapper 9.312→9.313. **NO hay aria de
zorro** (decorativo) y solo 1 llamada a speak. Core `picture-story-core.js` grada por `text === round.answer`.
**⚠ EL CONTRATO:** `answer` verbatim ∈ `options` + 3 distintas + **GROUNDING: la palabra clave del answer (≥4 chars) debe estar en
un caption de SU cuento** (el gate pedagógico — la respuesta debe ser hallable en el cuento, no inventada). Glyph dict FIJO
(bunny/mouse/bird/friend/tree/mitten/carrot/snow/**sun**/rain/umbrella/basket — `sun` queda LIBRE); los glyph arrays es son
**byte-idénticos a los fr** (aserrado).
**GRADE 1.º (`GRADE_OVERRIDE es:'1'`, native "K")** — ver el REFINAMIENTO del K-cluster arriba + el CRITERIO lee-vs-escucha
afilado. Lo sella el hermano: **atlas #78 (RI.K.1, el gemelo informativo, misma superficie) es 1.º** — ésta tiene MÁS andamiaje
(dibujos + audio) pero la **MISMA demanda de respuesta**; shipear el gemelo RL en Kínder con su gemelo RI en 1.º sería incoherente
en la pared de chips. **Más apoyo ≠ menor grado cuando la superficie de respuesta no cambia.**
**STRAND «Comprensión de textos literarios»** — recorrido de compuertas: (0) CONTENIDO [el niño DEBE entender lo que el cuento
dice] → (1) COMPRENDER [**la respuesta tentadora es "localizar" porque quién/qué/dónde parecen recuperación literal — se rechaza:
«Búsqueda y manejo de información» es operar el APARATO DE BÚSQUEDA de una fuente, que posee #80; aquí NO hay aparato ni fuente
que navegar y el material es literario. **TELL DECISIVO: el set incluye ORDEN, POR QUÉ y EMOCIÓN — ninguna es escaneable; cada una
exige sostener el cuento completo**] → (2) LEE → el chip reservado. **1.ª actividad es en el ámbito de LITERATURA** (atlas #78 y
field-guide #80 viven en ESTUDIO) — por eso la cubeta dispara ahora. **⚠ per-activity override; `strand-names.ts` BYTE-IDÉNTICO
para es** — el alemán SÍ metió entry de tabla (`Reading: Literature`→de) pero para es **produciría un MISLABEL VIVO, no
hipotético**: el strand ya contiene **`story-spine.role.rl-k-3`** y **`willow-story-corner.compare-tales.rl-k-9`** (NARRADAS, el
niño ESCUCHA, sin override es) → una entry las estamparía «…literarios» cuando son «Escucha y comprensión de textos». (También
contiene bea #81, protegida por su override — lo que prueba **strand ≠ eje**.)
**CHARACTER «Fabio el zorro» (operator-ruled; el pun *fable* SE CAE)** — argumento de la maestra que el linguist NO tenía: **una
FÁBULA es un GÉNERO específico (animales + moraleja); estos 3 cuentos NO tienen moraleja — y la plataforma tiene un hermano
(`juniper-story-lantern` RL.1.2) que enseña exactamente la moraleja** → bautizar al zorro «Fábula» **afirma una categoría FALSA en
una plataforma que además enseña la verdadera** (misma clase de error que «dicho»≡refrán #79 y «historia» #81). **La asimetría que
mata el pun: en inglés *fable* se lee coloquial ("cuentito"); en español «fábula» es un TÉRMINO CURRICULAR.** (El alemán tiene el
mismo problema latente y no lo cachó.) «Fabio» conserva el parentesco F-a-b con Fable/Fabel, es MX-real, masculino, albur-limpio.
**Cuento 1 (guante/nieve) SHIPEA tal cual** — pasa INTRODUCE/PRESUPONE limpio (el caption NOMBRA la nieve y el guante, el glyph
los DIBUJA → el niño nunca aporta el mundo, el cuento se lo entrega; la ficción tiene licencia de ser lejana — los niños MX leen
Caperucita en un bosque cada semana). **Reencuadrar a `sun` sería PEOR**: "The Mitten" tiene un motor narrativo real (pérdida →
hallazgo → devolución) del que dependen **4 rondas**, y un guante de invierno bajo un glyph de sol es **visualmente incoherente**.
**El único defecto MX es la PALABRA, no el clima:** «mitón» = guante sin dedos (palabra de especialidad), «manopla» = peninsular →
**«guante»**. Distractores plausibles-para-el-entorno («un gorro azul», «una bufanda de lana») a propósito: distractores
*implausibles para el entorno* regalarían la respuesta por escenografía en vez de por comprensión.
**TENSE: SIN split caption/pregunta** — el split alemán existe porque el Präteritum es libresco y el Perfekt hablado; **el español
no tiene ese split** (el pretérito simple es a la vez el tiempo de cuento y lo que dice un niño de 6). **⚠ el pasado compuesto es
un TELL PENINSULAR y está BANEADO** («¿Quién **ha brincado**…?» = el default de Madrid). Excepción principiada: `ps-pic-what` /
`ps-pic-feel` usan **imperfecto** («¿Qué **hacían**…?», «¿Cómo **se sentían**…?») porque preguntan por una actividad/estado en
curso, no por un evento acotado — exactamente lo que hace un hablante mexicano.
**Pedagogía (maestra, más apretada que el alemán):** el *por qué* debe tener su causa **DICHA TEXTUALMENTE en un caption** (no
solo deducible — inferir causa no dicha es Fase 4/5 y saca la actividad de RL.K.1); la *emoción* debe estar **NOMBRADA en el
caption del panel 3** (si no, la ronda se vuelve inferencia). **⚠ 2 captions son load-bearing para el grounding — NO "mejorarlos":
`picnic` p2 es «llovió» NO «empezó a llover» (el answer es «porque llovió» y el assert necesita el token literal); `picnic` p3
termina en «contentos» (masc. plural, concuerda con «los amigos») para que el answer del feeling quede grounded verbatim.**
Opciones del feeling **todas masculino-plural** («contentos/asustados/enojados» — **«enojados» NUNCA «enfadados»** peninsular).
Orden: **«¿Qué pasó PRIMERO?» / «¿Qué pasó AL FINAL?»** nunca «al último». **Tightening de albur del linguist (costo cero):**
«zanahoria» NO es sustantivo de albur, pero el stack verbal francés (*jaló y jaló … empujó … salió* alrededor de una raíz gigante)
sonaba albur-adyacente a oído adulto y «jalársela» es un albur reflexivo vivo → la reduplicación ahora lleva **objeto explícito**
(«Jaló **la zanahoria** una y otra vez») y **«empujó» desapareció** («Su amiga **llegó a ayudar**»); grounding intacto.
Léxico MX: **«jaló»** (no *tiró de* peninsular; *tiró* pelón en MX = aventó) · **«atorada»** (no *atascada*) · **«se cayó»** (el
pronominal es obligatorio en MX para una caída accidental) · **«brincó»** (más MX/cálido que *saltó* para un conejo) · **«canasta»**
(no *cesta*) · **«día de campo»** (no *picnic*) · **«paraguas»** (no *sombrilla* = de playa/parasol) · **«chiquita»** (no
*pequeñita*). Nombres **Bo** + **Millie** KEPT (consistencia cross-locale; «ratona» = registro estándar de medios infantiles MX).
**SEO: posee «cuentos cortos con preguntas»** — **NO caniboliza** a `lecturas-cortas-con-preguntas-primer-grado` porque **en la
búsqueda MX «lecturas» y «cuentos» NO son sinónimos**: *lecturas* se lee como *ficha/ejercicio escolar de comprensión*
(informativo), *cuentos* como *narrativa/literatura* → los SERPs divergen fuerte; el andamio compartido
`-cortas/-cortos-con-preguntas-primer-grado` es **el patrón probado replicado del otro lado de una división real de tipo de texto
— la misma valla informativo-vs-literario que dibujan los ámbitos del SEP**. **«en línea» es load-bearing** (el SERP MX es ~90%
PDF/imprimible/Pinterest → es el diferenciador Y el gancho de CTR). **NO targeteados:** «comprensión lectora» [vallado + carga
técnica SisAT/PLANEA → la query sesga a *evaluación diagnóstica/rúbricas/instrumentos*]; **«cuentos cortos para primer grado»**
[query de MATERIAL — el buscador quiere un cuento para LEER, ve un quiz y rebota; además arrastra «cuentos para dormir» =
intención de papá-a-la-hora-de-dormir → **el calificador `con preguntas` es exactamente lo que filtra eso; NO quitarlo para
perseguir el número más grande**]; «secuencia de imágenes» [OTRA competencia — ordenar viñetas revueltas; las nuestras vienen
pre-ordenadas]; «tipos de texto» [de bea #81]. Mascota nunca en title/H1 (cero demanda, se lee como inglés en MX).
5 files, 0 core/shell/CSS/strand-names; DoD GREEN (assert contra el core + grounding + paridad de glyphs + pedagogía + lints +
vallas SEO, verify-es 143, visual-qa 320–1366 ×11 es+en+es [66 renders c/u], Read 360/768/1024 [el glyph del guante se lee
inequívocamente como guante y el caption lo nombra → la regla "la palabra era el defecto, no el clima" funciona en vivo], 0 EN
leaks, prior locales byte-intact). ⚠ **Gotcha de tooling:** el mensaje de commit era demasiado largo/complejo para un heredoc de
bash (`unexpected EOF`) → escribirlo a un archivo y usar `git commit -F <file>`.
**#81 note (CUENTO vs TEXTO INFORMATIVO / tipos de texto RL.1.5; GRADE 1.º auto + **CHIP NUEVO «Diversidad textual»**
operator-ruled):** engine YA i18n en/de/fr → job es = 8 `strings.es` + speak es-MX + wormSVG aria «Bea, la oruga lectora» +
`roundsL10n.es` [8 rondas, set de 10 libros]; `?v=4→5`; wrapper 9.311→9.312. Core `story-fact-core.js` grada por
**`book.type === round.ask`**. ⚠ **este engine NO tiene shelf-labels** — el ensemble propuso «Cuentos»/«Cosas de verdad» como
etiquetas de librero pero **esa superficie NO existe** (solo 8 strings); NO inventar elementos de engine.
**🆕 CHIP «Diversidad textual» + la compuerta 0 (ver la REGLA arriba).** El tell decisivo de la maestra: **la compuerta 2
pregunta «¿el niño LEE o ESCUCHA EL TEXTO?» — en SINGULAR; aquí hay TRES textos de DOS clases y la CLASE es el aprendizaje.**
Rechazos con argumento: «Comprensión de textos literarios» [en la MITAD de las rondas lo correcto es RECHAZAR el libro
literario]; «Comprensión de textos informativos» [espejo: el niño nunca aprende nada de lo que dice el libro de datos];
**«Búsqueda y manejo de información» = la respuesta TENTADORA y el patrón alemán literal** [elegir fuente SÍ es práctica del
ámbito de Estudio, pero solo en las 4 rondas de datos — las 4 de cuento son Literatura pura → **cruza AMBOS ámbitos y no
pertenece a la práctica social de ninguno**]; «Estrategias de lectura» [ya rechazado en #80]. **2.ª vez que dispara el patrón
«el fr colapsó PORQUE el francés no tiene dominio aparte; el español SÍ tiene la estructura de ámbitos» → es el patrón es.**
**🚨 LA TRAMPA MISCHFORM (el riesgo central de la actividad): el MEDIO INDEFINIDO — una *Sachgeschichte* (cuento sobre un
animal REAL) es genuinamente ambas.** Regla alemana: todo CUENTO lleva marcador de fantasía con CERO señal de dato; todo libro
de DATOS lleva señal de realidad; **la pista vive en el BLURB, no solo en el título**. **DOS libros REEMPLAZADOS por la
maestra:** ❌ «una ardilla y sus bellotas» — **DOS strikes**: (1) **imán de Mischform** — ardilla + bellotas es *literalmente
conducta real de ardilla* = la trampa Sachgeschichte con etiqueta de nombre; (2) **culturalmente ajeno** — los niños MX NO
juntan bellotas (tropo de bosque nórdico/anglo) → «La ardilla que quiere volar» (**acción IMPOSIBLE**); ❌ «un conejo que perdió
su guante» — los guantes son tropo de clima frío, los niños MX no usan → «Tito y su sombrero». También: el barquito ahora va
NOMBRADO + con un miedo [existen libros de datos sobre barcos y tormentas]; «excavadoras» aligerado a «máquinas grandes» [5
sílabas + trabadas xc/gr = muro de decodificación de 1.º]; el libro de abejas KEPT **CON VALLA** [las abejas son el tema #1 de
los *cuentos* también — la abejita Maya] y hecho **solo-distractor**.
**🆕 DOS REGLAS DE DISEÑO QUE EL ALEMÁN NO TIENE (ambas aserradas en el gate):**
- **REGLA A (composición de ronda):** **nunca poner un CUENTO de animal junto a un libro de DATOS de animal** salvo que el
  cuento lleve una **acción IMPOSIBLE** (volar/hablar/usar sombrero). Una ardilla nombrada junto a «cómo hacen la miel» es un
  volado para un niño de 6 por buenos que sean los blurbs. Con «volar» y «sombrero» la valla aguanta **estructuralmente, no por
  redacción**. (Visible en vivo en sf8: 2 cuentos de animal + 1 dato de animal, exentos por acción imposible.)
- **REGLA B (variedad de marcadores; el guard de word-match de #80 portado):** **ningún marcador en >2 de los 10 blurbs**, o el
  niño gana pattern-matcheando «Había una vez» sin leer. Audit: Había-una-vez 2 · de-verdad 2 · reales 2 · datos-curiosos 1;
  el lado CUENTO lleva **5 marcadores DISTINTOS**. **Tensión honesta registrada:** 4 de 5 blurbs de datos llevan señal de
  realidad porque todo libro de datos DEBE señalarla — en `ask=fact` un niño podría atajar, **pero ESO ES la competencia
  RL.1.5**; en `ask=story` el atajo colapsa contra 5 marcadores.
**⚠ CONDICIÓN DE CARGA LECTORA (de la maestra, BINDING — el grado DEPENDE de ella):** título ≤5 palabras · blurb ≤8 palabras /
~45 chars · vocabulario de alta frecuencia · **la pista en la PRIMERA MITAD del blurb**. Si los blurbs engordan, la actividad se
vuelve 2.º en silencio **y el grado es una mentira**. (Actuales 29–42 chars ✓; aserrado en el gate.) **El linguist anuló DOS
títulos de la propia maestra por violar SU PROPIA regla de ≤5 palabras**, moviendo las pistas al blurb.
**TERMINOLOGÍA:** par kid **«cuento» vs «cosas de verdad»**. 🚨 **«historia» ELIMINADA — es la Mischform EN EL VOCABULARIO:** en
español significa *Historia* (la materia) **Y** *un relato VERDADERO* («la historia de mi abuelo») → un libro «que cuenta una
historia» **podría ser cierto**; el draft solo sobrevivía porque «inventada» hacía todo el trabajo. ❌ **«documental» = palabra
de CINE en español**, no de libro (el «documentaire» fr NO transfiere). ❌ «libro de datos» (suena a base de datos).
«libro informativo» = solo capa docente. 🚩 **«librero» es LA palabra MX para el mueble** (en España = vendedor de libros).
🎁 **«datos curiosos» — un regalo que el alemán no tuvo**: los niños MX ya la poseen de sus libros y YouTube; grita *libro de
datos* más rápido que nada. ❌ **«de a de veras» BANEADA** (solo hablada, regional; desastre de decodificación escrita).
Character **«Bea, la oruga lectora»** [femenino, concuerda con Bea, matchea 🐛; ❌ «ratón de biblioteca» = ratón + modismo ADULTO
+ masculino → choca; ❌ «gusano» = masculino + registro asqueroso MX]. §A.13.54: `win` ancla en **«el libro»** — sustantivo
masculino FIJO dentro de la cadena, no concuerda con nada externo; **nunca cambiarlo por un pronombre**.
**GRADE 1.º (manifest "1" auto, NO override)** — maestra DECISIVE, converge de(Klasse 1)+fr(CP): el preescolar solo lo toca vía
**lectura NO convencional** (la docente lee, el niño anticipa por la ilustración); en cuanto el juicio se hace desde un **título
+ blurb ESCRITOS que el niño descifra solo**, cruza a Fase 3 — y se para en el **PISO** de la Fase 3 (una pista binaria por
ronda, sin sistema metalingüístico, sin navegación). El trabajo de acervo/Biblioteca de Aula de 1.º SEP explícitamente hace que
los de primero separen *los libros que cuentan historias* de *los que informan*. Escalera sin inversión: atlas #78=1.º < **bea
=1.º** < field-guide #80=2.º < booker #75=3.º.
**SEO:** posee **«cuento o texto informativo»** [volumen bajo × intención ~100% — es literalmente la tarea del niño, sin
competencia] apilado antes del head **«tipos de texto»**, con `primer-grado` cercando el pantano de secundaria. **NO
targeteados:** 🚫 **«diversidad textual»** — el SEO confirmó independientemente la lectura de la maestra desde el lado búsqueda:
es **query de PLANEACIÓN docente** («…planeación», «…campo formativo»), la busca una maestra que quiere un PDF y rebotaría de
una actividad interactiva → **sin conflicto con usarla de CHIP** (el chip es credibilidad docente; el slug es intención de
búsqueda): úsala **1 vez en la prosa**, nunca en slug/title/meta; 🚫 «partes del libro»/«localizar información» [de #80 —
autocanibalización + factualmente falso: aquí se juzga la PORTADA]; 🚫 «comprensión lectora» [la valla vigente + falso aquí].
Prosa: el gancho es que **los dos libreros de Bea = el Rincón de lecturas / Biblioteca de Aula** (el encuadre más nativo posible
para una maestra MX) + decir que la actividad **CRUZA los ámbitos de Literatura y Estudio** (es el encuadre honesto Y el
argumento del chip). 5 files, 0 core/shell/CSS/strand-names; DoD GREEN (assert contra el core + carga-lectora + REGLA A + REGLA
B + posición-de-pista + todo-libro-de-datos-lleva-señal + askBalanced 4/4 + cada libro respuesta ≤1× + S5/F5 solo-distractor +
lints + vallas SEO, verify-es 142, visual-qa 320–1366 ×8 es+en+es, Read 360/768/1024 [sf8 muestra la REGLA A en vivo], 0 EN
leaks, prior locales byte-intact).
**#80 note (LOCALIZAR INFO con las PARTES DEL LIBRO 1.RI.5; **2.ª RI**; GRADE 2.º + STRAND «Búsqueda y manejo de información»,
AMBOS operator-ruled):** engine YA i18n en/de/fr; **NO tiene `var LANG`, NO tiene `speak()`/TTS, NO usa image-library, los SVG son
`aria-hidden`** → job es = `L.es` [7 keys] + `strings.es` [10] + `roundsL10n.es` [12] + manifest + prose + `?v=8→9` + page.tsx.
`txt()` lee `LCS.i18n.current`; `_loadActivity` YA ramifica a `roundsL10n[lang]`. `?v=8→9`; wrapper 9.310→9.311.
**⚠ EL CONTRATO DEL CORE:** `field-guide-core.js` calcula la respuesta = **el item cuyo array `functions` CONTIENE el
`functionPhrase` (match exacto de string)** → por ronda: exactamente UNO lo tiene, el correcto NO va en índice 0, 3 labels
distintos, y **el `functionPhrase` NO debe aparecer en el LABEL del correcto** (guard `questionWordNotInLabel` — si está, un niño
gana haciendo match de palabras sin leer la herramienta, que es TODA la actividad). **La GLOSA no se matchea** → por eso r6-r9
usan la forma conjugada («cómo brilla» vs `functionPhrase:"brillar"`); ese paso infinitivo→conjugado es DESEABLE (bloquea el
string-matching puro; el fr shipeado hace lo mismo). **⚠ el `contentTokens` del core usa STOP list INGLESA + `/[^a-z0-9\s-]/g`
que STRIPEA los acentos → su tokenizer no sirve para es; computar el guard Spanish-aware por cuenta propia.**
**Gramática de plantillas: el español fusiona SOLO a+el→al / de+el→del, y ninguna plantilla termina en preposición que pueda
encontrarse con un artículo → todo slot `{fn}` toma un INFINITIVO PELÓN; NO hace falta la nominalización capitalizada del alemán
(el español se comporta como el francés).** Verificado con el reflexivo «esconderse» en las 6 plantillas.
**🚨 LA COLISIÓN «ÍNDICE» (trampa es-específica; ni de ni fr la tuvieron):** en español **«índice» es AMBOS** — el índice del
frente (tabla de contenidos) Y el índice alfabético del final (de: Inhaltsverzeichnis/Register; fr: Sommaire/Index = palabras
distintas). Ambos expertos rechazaron «Índice»+«Índice alfabético» [comparten el núcleo; el único discriminador es un adjetivo de
5 sílabas que el niño debe descifrar → convierte una prueba de CONCEPTO-de-herramienta en una prueba de LECTURA-de-palabra; y
pega justo donde duele: la ronda cuya respuesta correcta ES «Índice»]. También rechazado renombrar la tabla de contenidos a
«Contenido» → **🆕 PRINCIPIO: NUNCA re-etiquetar la herramienta que el niño SÍ conoce** (los Libros de Texto Gratuitos de la SEP
imprimen «Índice» al frente). **Operator ruled el fix ESTRUCTURAL de la maestra sobre la acuñación del linguist («Lista
alfabética»): DROP del cog `index` → 12 rondas es (de/fr tienen 13).** Razón: **un niño mexicano de 2.º prácticamente NUNCA se
topa con un índice alfabético al final** (los libros SEP, incl. los Proyectos NEM 2023, traen «Índice» al frente y ya) — es un
artefacto de cultura-de-libro anglo/alemana a esa edad; enseñar una herramienta que el niño nunca ha tenido en las manos
contradice la premisa misma de la actividad. La colisión queda eliminada ESTRUCTURALMENTE (un solo «Índice» en toda la actividad)
y la tríada which-feature queda coherente: **Índice / Glosario / Pie de imagen** — 3 núcleos distintos, y las 3 son herramientas
que la actividad misma enseña (cogs toc/glossary/diagram). ⚠ **es diverge estructuralmente de de/fr — sancionado por
rebuild-not-translate, pero se SURFACEÓ, no se enterró.**
**GRADE 2.º de primaria (`GRADE_OVERRIDE es:'2'`, native "1")** — maestra DECISIVE, converge de(Klasse 2)+fr(CE1): 1.º es el año
de la **alfabetización inicial**; el SEP de 1.º sí EXPLORA las partes del libro, pero eso es *reconocer que el índice existe*, no
hojearlo estratégicamente; aquí hay lectura silenciosa de ~9 renglones/ronda + sostener la pregunta + comparar 3 glosas =
**lectura autónoma al servicio de una tarea**. **El override es DENTRO de la Fase 3** (1.º-2.º) → colocación honesta, no salto
curricular. **Escalera: atlas #78 = 1.º (solo LEE 2 oraciones) < ésta (leer + navegar) < booker #75 = 3.º (exige el SISTEMA
alfabético; aquí no se alfabetiza NADA).**
**STRAND — SPLIT del chip de comprensión (modelo ALEMÁN, no francés):** el fr colapsó **PORQUE el francés no tiene dominio de
medios/textos aparte**; el español SÍ → el **ámbito de ESTUDIO** del SEP lleva la práctica social **«búsqueda y manejo de
información»** (literalmente usar índice/títulos/glosario para LOCALIZAR) y abarca **fuentes impresas Y DIGITALES** → cubre la
ronda del menú de forma nativa. Colapsar etiquetaría mal: **el niño nunca tiene que entender qué ES un frell, solo operar el
aparato de búsqueda del libro.** Rechazado «Estrategias de lectura» (demasiado amplio: predecir/inferir → se traslaparía con
comprensión).
Reconciliaciones: título **«La guía del detective Dewey»** (27c, 1 línea) — del linguist, sobre el más exacto «guía de campo» de
la maestra (35c → envolvería y se cortaría); ambos rechazaron «cuaderno» (el «carnet» del fr) porque el objeto es un **libro
PUBLICADO** con índice/capítulos/glosario, no una libreta personal. **«pie de imagen» NO «pie de foto»** (es un dibujo).
**⚠ «chispear» = LLOVIZNAR en México** — jamás para "spark"; «brillar» cubre el campo (destellar/relumbrar descartados por estar
arriba del vocabulario de un niño de 8). «escarbar» no *cavar* · «trepar» · «renglón» NO *línea* (la palabra escolar MX) ·
«dato» NO *hecho* (calco EN) · «botón» · «pasar la página». Headers kid: «Palabras importantes» / **«Índice»** — este último
DELIBERADAMENTE idéntico al label de la tríada: en un libro mexicano real el encabezado de sección Y el nombre de la herramienta
son la misma palabra, y la ronda pregunta por una FUNCIÓN → refuerza, no telegrafía (coherencia que es gana y de/fr no).
**Constraint de nombres formales ACEPTADO por ambos:** la tríada conserva «Glosario» (la palabra real del SEP) — un label
transparente («palabras para buscar») metería el keyword de la pregunta en el label y filtraría la respuesta.
**Nombres de criaturas KEPT** (Snoud/Frell/Tarn/Blorp/Gline/Fid/Quib/Sten/Vorl — ambos expertos los auditaron albur-limpios; son
FICTICIOS a propósito para que el niño LEA la herramienta en vez de adivinar por conocimiento del mundo). Criaturas en minúscula
en texto corrido («los snouds»). **SEO:** posee «partes del libro» (lección nombrada de la primaria MX) + «localizar información»
(el verbo SEP); **«comprensión lectora» NO se targetea a propósito** — mismatch de contenido **Y canibalizaría a nuestro propio
hermano** `lecturas-cortas-con-preguntas-primer-grado` (fence aserta que no esté en slug/title/intro). 5 files, 0 core/shell/CSS/
strand-names; DoD GREEN (assert contra el core real + guard Spanish-aware + lints + fence, verify-es 141, visual-qa es 72 renders/
12 rondas + en 84/14 [EN intacto] + es restore, Read 360/768/1024 [tríada Índice/Glosario/Pie de imagen], 0 EN leaks en la
superficie renderizada [las keys internas meaning/topic/picture se excluyen por diseño — son los tokens de match del core, nunca
se renderizan], prior locales byte-intact).
**#79 note (SENTIDO LITERAL vs FIGURADO / expresiones L.3.5.a; el caso INSIGNIA de "rebuild-not-translate" — los modismos NO se
traducen, las 8 rondas son dichos MEXICANOS reales; GRADE 3.º auto + STRAND «Ampliación del vocabulario»; el ALBUR SCREEN
operator-ruled):** engine YA i18n en/de/fr → job es = 7 `strings.es` + speak es-MX + 2 arias [goose «Gabby la gansa», speaker
«escuchar la expresión»] + `roundsL10n.es` [8 rondas]; `?v=3→4`; wrapper 9.309→9.310.
**🆕 TERMINOLOGÍA — la palabra kid-facing es «expresión»; «dicho» RECHAZADO (ambos expertos, independientemente).** En MX «dicho»
viaja en par fijo con «refrán» («refranes y dichos populares») y denota un **PROVERBIO de oración completa con moraleja** ("El que
madruga, Dios lo ayuda"); el niño lo conoce ASÍ en su libro de texto. Llamarle «dicho» a «¡Ya ponte las pilas!» enseñaría una
categoría FALSA **justo en el grado donde el SEP construye esa categoría** — peor que el near-miss alemán Redewendung-vs-Sprichwort,
porque «dicho» ES el término SEP de la OTRA cosa. «modismo» = registro de secundaria (el niño tendría que descifrar la etiqueta
antes de empezar); **«sentido figurado» = el CONCEPTO, no una etiqueta para la frase** (solo prosa). Gate: lint de dicho/refrán
sobre la superficie del manifest; la PROSA sí los usa, pero SOLO para contrastarlos explícitamente (la joya de la maestra para
padres: «a diferencia de los refranes y los dichos, que son oraciones completas con una enseñanza, aquí se trata de expresiones que
aparecen dentro de una oración»). Prompt **«¿Qué quiere decir en realidad esta expresión?»** — «en realidad» es el portador
MX-natural de la bisagra literal↔figurado (como el de conservó „wirklich"); un «¿Qué significa…?» pelón pierde el contraste y hace
que la tarjeta literal se vea defendible.
**🆕 ALBUR SCREEN — DOCTRINA (el riesgo definitorio de cualquier actividad de modismos en MX):** el español mexicano está DENSO de
albures. **La tarjeta LITERAL lo vuelve agudo: es la única tarjeta que DEBE mostrar las palabras concretas del modismo en su lectura
física, de forma prominente.** → **REGLA (de la maestra): toda expresión cuya TARJETA LITERAL haría reír a un niño de 8 años por la
razón equivocada queda FUERA, aunque el modismo en sí sea limpio.** Operator ruled la línea CONSERVADORA:
**DROPPED «echar aguas»** [el buque insignia del linguist, sin contraparte EN/DE — la maestra lo rechazó por **MODELADO** antes que
por albur: significa vigilar mientras alguien hace una travesura → "no pongo 'hacer de halcón' en una actividad de 3.º; la queja del
padre se escribe sola"; la propia oración del linguist lo probaba: «Échame aguas mientras escondo el regalo»]; **DROPPED «hacerse
bolas»** [linguist: «bolas»=testículos; la maestra limpió el MODISMO pero **su propia regla lo condena** — no le aplicó la regla a
la tarjeta literal]. **KEPT «meter la pata»**, stress-testeado a propósito [«meter» ES el verbo albur de MX; ambos lo limpiaron —
está tan lexicalizado y las maestras mismas lo usan que «la pata» bloquea la lectura]. **STRUCK del archivo de candidatos:
«empinar el codo»** [alcohol + «empinarse» explícitamente sexualizado — escalación de la maestra]. También rechazados: «no tener
pelos en la lengua» [albur-adyacente + risa garantizada], «agarrar con las manos en la masa» [«agarrar» albur], «poner el dedo»,
«hasta la madre». **«estar hasta la coronilla» = REGIONALMENTE MAL para MX** → la forma mexicana es «hasta el copete».
**«quedarse de a seis» = generacional** (registro de abuelo). **🆕 REGLA SÍMIL≠MODISMO: «dormir como tronco»/«tomar el pelo»
rechazados por ser SÍMILES — el sentido figurado ≈ la comparación literal, así que el contraste que enseña la actividad NO EXISTE.**
«buscarle tres pies al gato»/«irse por las ramas» = conceptos abstractos de Fase 5. Los ítems struck se asertan AUSENTES en el gate.
**🐛 DEFECTO ANTI-CUE ENCONTRADO Y CORREGIDO (el hallazgo técnico de esta actividad):** el primer draft dio **longestBot 0.625** —
la tarjeta `correct` era la ÚNICA más larga en 5 de 8 rondas → un niño que solo escoge la tarjeta más larga ganaba el 62% sin
entender nada (el set alemán tenía 0.125). Fix: rebalancear las **FOILS** (nunca añadiendo palabras del modismo — rompería el
word-echo) **y evitar darle a todas las literales la misma cola «de verdad»**, que se habría vuelto un tell aprendible nuevo →
**longestBot 0.0, shortestBot 0.25**. **⚠ EL INVARIANTE WORD-ECHO: la tarjeta `literal` — NUNCA la `correct` — debe ser la que más
ecoa las palabras del modismo** (si no, un niño que solo hace match de palabras gana sin entender). **⚠ El `overlapCount` del core
usa una STOP list INGLESA → su `overlapBot` es RUIDO para es; `deckFacts` es audit-only + NO gated, así que es un caveat de reporte,
NO un defecto — verificar con un overlap Spanish-aware propio.** **⚠ El ancla del assert idiom-en-oración debe ser la COLA NOMINAL
invariable** («la pata»/«el avión»), NO los content-tokens: el verbo se conjuga («meter la pata»→«metí la pata», «darle el avión»→
«me dio el avión») y cualquier ancla con el infinitivo falla en falso. **⚠ «hay» es español** — no meterlo en un regex EN-leak (me
mordió). Las 8 rondas: agua-boca/codos/nubes [b1] · pilas/pata/oso [b2] · ojo-cara/avion [b3]; cada modismo proyecta UNA imagen
literal dibujable (eso es lo que hace escribible la trampa). **GRADE 3.º de primaria (manifest "3" auto, NO override)** — maestra
DECISIVE, converge de(Klasse 3)+fr(CE2); NEM **Fase 4**, «Lenguajes»; NO Fase 3 (a los 6-7 aún consolidan la lectura literal;
SUSPENDERLA es el paso metalingüístico que no tienen); escalera: fern #76 (2.º, elegir el sentido LITERAL correcto) → esta (3.º,
RECHAZAR la lectura literal) → booker #75 (3.º, misma banda). **STRAND «Ampliación del vocabulario» (es override añadido a
`{de:'Wortschatz untersuchen', fr:'Le lexique'}`)** — una expresión es **unidad léxica fija** (significado recuperado entero, no
calculado desde la gramática) → NO «Reflexión sobre la lengua»; la maestra pesó la alternativa REAL (en SEP los refranes y dichos
viven en el ámbito de **Literatura**) y la rechazó: la tarea es recuperación de significado, no apreciación literaria.
**SEO — dos head terms deliberadamente NO targeteados:** «dichos/modismos mexicanos» = **query de ENTRETENIMIENTO ADULTO**
(listicles "50 dichos mexicanos", nostalgia, blogs ELE para extranjeros, contenido albur-adyacente) — volumen altísimo, intención
pésima: nunca le ganaríamos a los listicles y si lo hiciéramos rebotaríamos ~90%; «refranes y dichos para niños» = **mismatch de
contenido** (un refrán es un proverbio; nuestras 8 rondas tienen CERO refranes → targetearlo sería deshonesto). **Poseemos
«sentido literal y figurado (+ tercer grado)»** — el par metalingüístico SEP exacto que teclea una maestra; «lenguaje figurado»
pelón se salta (sesga a secundaria/prepa: metáfora, símil, hipérbole). Título "Las expresiones de Gabby" (24c, 1 línea @320);
character «Gabby la gansa» KEPT; 5 files, 0 core/shell/CSS/strand-names; **prior locales aserted byte-intact** (el diff de 740
líneas del manifest es re-indentación de `JSON.stringify` + el bloque es — SIEMPRE aserta esto tras reescribir un JSON entero);
DoD GREEN (assert contra el core real + word-echo Spanish-aware + lints de terminología/albur, verify-es 140, visual-qa 320–1366 ×8
es+en+es, Read 360/768/1024 [la trampa literal visible y ecoando], 0 EN leaks).
**#78 note (COMPRENSIÓN LECTORA LITERAL / localizar info explícita RI.K.1; **la 1.ª actividad es de LECTURA — abre RI.\***;
GRADE 1.º + STRAND «Comprensión de textos informativos», AMBOS operator-ruled vía AskUserQuestion):** engine YA i18n en/de/fr →
job es = 7 `strings.es` + speak es-MX + 2 arias [armadilloSVG «Atlas, el armadillo» — **«armadillo» es MX; NO «tatú» (sudamericano)
ni «cusuco» (centroamericano)**; fact-card «Escuchar el texto»] + `roundsL10n.es` [8 rondas]; `?v=3→4`; wrapper 9.308→9.309.
**⚠ EL CONSTRAINT DE DATOS (load-bearing, el gate que más importa):** el `answer` debe ser character-identical a UNA de las 3
`options` **Y** substring VERBATIM del `fact` (`Core.facts().answerInFact`, lowercase) → **trampas de contracción del español
evitadas POR DISEÑO**: «cae **de las** nubes» (plural → nunca `de+el→del`), «**moja** el suelo» (transitivo, sin preposición),
«vive **en** el hielo» (nunca `a+el→al`); lint añadido al assert (`\bde el\b` / `\ba el\b` = FAIL). El assert corre contra el CORE
real: one-match + answerInFact + oracle-true + todos-los-foils-false + fact de 2 oraciones + `¿…?` + `deckFacts` bot-checks
[fixedGuessBot 0.125, spread 1,0,2,0,1,2,0,1].
**🆕 REGLA FOIL-SINÓNIMO (maestra — DOCTRINA para las ~6 RI futuras):** *un distractor es INVÁLIDO si un niño mexicano informado
podría defenderlo como correcto — **los sinónimos coloquiales de la respuesta no son distractores, son respuestas***. Dos trampas
concretas BANEADAS (aserción en el gate): **«panal»** [lo que los niños MX de verdad llaman la casa de las abejas; «colmena» es la
palabra escolar → «panal» castigaría el conocimiento correcto] y **«la tierra»** [≡ «el suelo» para un niño]. El linguist ya las
había esquivado por su cuenta (cueva/charca; cielo/sol) pero la regla queda escrita.
**🆕 REGLA RI/RL es — CLASIFICAR *lee-vs-escucha* ANTES del chip (operator-ruled; arquitectura FRANCESA, NO alemana):** en SEP el
eje lo decide la **modalidad de acceso al texto**, una propiedad de la ACTIVIDAD, no del strand US → **per-activity
`STRAND_OVERRIDE`, `strand-names.ts` NO se toca**. Una entry de tabla etiquetaría mal a los hermanos NARRADOS (nila-pond RI.K.2 =
texto LEÍDO EN VOZ ALTA). Para cada una de las ~6 RI/RL futuras: **lee → «Comprensión de textos informativos»** (RL: «…de textos
literarios»); **escucha → «Escucha y comprensión de textos»**. **⚠ NUNCA «Comprensión lectora»** — ya es el chip es de
`Reading: Foundational Skills` (fonética) en 5 actividades vivas; la maestra: el término tiene un significado técnico durísimo en MX
(SisAT/PLANEA) y verlo sobre una actividad de sílabas lee como "esta plataforma le llama comprensión a descodificar" = fuga de
credibilidad. El fr hizo exactamente esto (declinó la entry por la misma razón lee-vs-escucha; page.tsx L133/L140).
**🚩 HALLAZGO ARCHIVADO (NO tocado — comisión aparte):** el mapeo **`Reading: Foundational Skills` es = «Comprensión lectora»
(`strand-names.ts:116`) está MAL** — RF es descodificación/conciencia fonológica, no comprensión. La maestra: debería ser
**«Alfabetización inicial»** (el término vivo de la NEM: principio alfabético, conciencia fonológica, correspondencia
sonoro-gráfica, sílabas, palabras de uso frecuente). Radio de impacto: **5 actividades es vivas** + probablemente la misma decisión
en otros locales → comisión separada, NO se dobla aquí.
**GRADE 1.º de primaria (`GRADE_OVERRIDE es:'1'`; native "K" → override HACIA ARRIBA; operator-ruled)** — maestra DECISIVE +
converge con de (Klasse 1) + fr (CP): el preescolar SEP solo espera **lectura NO convencional** (la docente lee en voz alta; el niño
interpreta imágenes/anticipa); la descodificación convencional es **Fase 3 = 1.º-2.º**. Aquí el niño descodifica solo 2 oraciones
**+ 3 opciones escritas** = cinco actos de lectura convencional. **El corte lee-vs-escucha es decisivo en SEP igual que en fr**
(preescolar «escucha/comenta/interpreta» vs primaria «lee y localiza») — es sobre **QUIÉN DESCODIFICA**, no dificultad.
**El es-K-cluster NO se viola**: protege K-native de subir *cuando el contenido ES de kínder*; aquí se cumple su cláusula de escape
(contenido de primaria formal); precedente #67 (native-K → es '1'). Dejarlo en «Kínder» le prometería a la maestra de preescolar
una tarea que sus niños no pueden hacer solos.
Conflictos linguist↔maestra resueltos: **«leche blanca» → «leche fresca»** [maestra: "Suena mal. Nadie dice «leche blanca»" — la
leche es blanca por definición; el linguist había calcado el EN "white milk"]; **sustantivo kid-facing → «el texto»** [la palabra
de aula diaria de 1.º + el SEP "lee el texto y localiza información"] sobre «los datos» del linguist — **el título conserva
«fichas»** [la metáfora de la ficha + 📁] y el win «el dato clave» [la ficha es la tarjeta, los datos su contenido]; **«en el día»
NO «de día»** [razón de ingeniería del linguist: las 3 options deben ser shape-parallel «en la noche»/«en la cueva»/«en el día»];
«miel dulce» KEPT [redundante pero decoración, no lift — la respuesta es «en una colmena»]; «moscas chicas» KEPT [ambos nativos
rechazaron «bichos» = informal/despectivo en MX]. **§A.13.54:** win/hintWrong salen en CUALQUIER ronda y las respuestas cruzan
géneros (leche fresca f / ocho patas f-pl / en el hielo frío m) → win ancla en el masculino FIJO «el dato clave», hintWrong en el
**clítico NEUTRO «lo»** («la parte que **lo** dice»), hintPick's «Léelo» en el fijo «el texto». Registro: **patas** nunca *piernas*,
**pasto** nunca *césped*, **jugo** nunca *zumo*; las 2 palabras más difíciles (*telaraña*, *pingüino*) van en el FACT, nunca en una
option → un tropiezo de descodificación jamás cuesta la respuesta. Pingüino/hielo/nieve = OK para México (maestra: fauna canónica
de libro infantil; además el texto lo está INFORMANDO, que es el punto). **SEO: split head-vs-long-tail deliberado** — el slug posee
el long-tail ganable de intención exacta `lecturas-cortas-con-preguntas-primer-grado` (literalmente SOMOS un texto corto con una
pregunta); el head «comprensión lectora» es enorme pero **dominado por PDF/cuadernillos en MX** (su buscador quiere un paquete
imprimible, no un juego de tocar) y **pertenece a un hub futuro**, no a la actividad #1 de ~6 (los hermanos la canibalizarían); el
title+intro sí lo cargan on-page. Título "Las fichas de Atlas" (19c, 1 línea @320); character «Atlas» KEPT; 5 files, 0 core/shell/
CSS/strand-names; DoD GREEN (assert contra el core real, verify-es 139, visual-qa 320–1366 ×8 rondas es+en+es, Read 360/768/1024
[colmena/ocho patas/leche fresca/el suelo — la respuesta VISIBLE en el texto], 0 EN leaks + registro MX limpio).
**#77 note (USO REAL DE PALABRAS / palabra↔función cotidiana L.1.5.c; GRADE 1.º primaria manifest-auto + STRAND «Ampliación del
vocabulario» override, ambos maestra-decisive + convergentes, NO surfaced):** engine YA i18n en/de/fr (`var LANG` + roundsL10n
wiring + el label-split en render **ya existían** — el plan alemán estaba STALE) → job es = 7 `strings.es` + speak es-MX (LCSAudio
`lang:(LANG==='es'?'es-MX':LANG)` + u.lang) + jay aria «Jasper el arrendajo» + `roundsL10n.es` [8 rondas: situation + label por
choice]; `?v=3→4`; wrapper 9.307→9.308. **THE `label`-SPLIT (cómo funciona el 0-core):** `Core.childView` STRIPEA todo campo extra
(mapea choices → `{id,noun,themeDir}`), así que el label es se lee en render desde `this.round.choices[o.id].label || o.noun`; la
URL de la imagen conserva `o.noun` (la key EN, locale-neutral) y el grading matchea por `noun` → **el label es 100% cosmético,
imposible que rompa el grading**. **EL SWAP cup→glass (precedente FR, replicado):** «la taza» + agua está ROTO en MX (taza = café/
chocolate/atole; nadie toma AGUA en taza) → el fr ya había cambiado `correctNoun` cup→**glass** («le verre») en la ronda drink;
es hace lo mismo → «el vaso» (`themeDir:"kitchen tools"`). **VINDICADO al leer el webp: el arte de `cup` tiene líquido café
CALIENTE dentro.** `cup` sobrevive como foil en write+cut («la taza»), y **ninguna ronda muestra glass Y cup juntos** → cero
ambigüedad. La maestra proponía en cambio reescribir la situación (agua→chocolate caliente) — rechazado: el swap conserva la
situación universal del agua y tiene precedente shipped. **⚠ LECCIÓN: `roundsL10n` PUEDE cambiar noun/themeDir/correctNoun por
locale** (no solo texto) mientras se cumpla exactly-one-noun===correctNoun — es la palanca para arreglar un objeto culturalmente
equivocado sin tocar el core. **mitten → «el guante» (DESVIACIÓN deliberada de `image-vocabulary.js` «Manopla»):** ambos nativos
lo marcaron — en MX «manopla» = manopla de béisbol / de horno, NO ropa de invierno; «mitón» = sin dedos, factualmente falso vs el
arte (leí el webp: ES una manopla real, pulgar + un compartimento); MX no lexicaliza el split mitten/glove → «guante» es la única
palabra que un niño de 6 tiene; **precedente alemán EXACTO** («der Handschuh», no el «Fäustling» de la tabla); es foil-only.
`crayon` = «el crayón» (SEP-correct + tabla; el linguist prefería «la crayola» genericizada pero él mismo la marcó como "la que
hay que ceder"). **§A.13.54 gender-safety (lo cacé yo en la síntesis, ningún agente lo marcó):** `win`/`hintWrong` se muestran en
CUALQUIER ronda pero los objetos cruzan géneros (**el** vaso / **la** cama / **las** tijeras) → «Ese es el indicado» del linguist
era masculino-locked → **anclar en el demostrativo NEUTRO «eso»** (invariante en español): win «¡Sí! Eso es justo lo que
necesitas. 🐦» + hintWrong «Eso no va del todo. Vuelve a leer la situación.»; `theAsk` ya ancla en el sustantivo fijo fem «la
imagen». Título **«La mochila de Jasper»** (19c, 1 línea @320) — «mochila» (maestra: todo niño MX tiene una) sobre «bolsa»
(= bolsa de mandado/bolso en MX); character «Jasper» KEPT. Verbo **«usar»** — **«ocupar» BANEADO** (regionalismo que las maestras
corrigen; SEP nunca lo usa así). SEO posee «para qué sirven los objetos» (demanda real MX, competencia = PDFs); **NO** el head term
«vocabulario primer grado» (canibalizaría los 5 hermanos vivos); slug `para-que-sirven-los-objetos-primer-grado`. **GRADE 1.º
(manifest "1" auto → chip «1.º de primaria»; NO GRADE_OVERRIDE)** — maestra DECISIVE: el saber es preescolar/ORAL pero el niño
DEBE LEER una oración escrita (+ cada tile lleva palabra escrita) → capa ESCRITA, Lenguajes **Fase 3**; **el precedente #74**
(nexos temporales) gobierna; **el es-K-cluster NO alcanza este caso** — protege contenido K-native de SUBIR, y aquí el manifest ya
es "1" (bajar a Kínder sería un override INVERSO contra 3 nativos convergentes); debajo de olive #27/fern #76 (2.º = operaciones
léxicas reflexivas), esta es la capa más concreta = el piso de primaria; **NO surfaced** (manifest+de+fr+es convergen).
**STRAND «Ampliación del vocabulario» (es-only añadido al `{de:'Wortschatz untersuchen', fr:'Le lexique'}` existente, L173)** —
léxico puro, 0 gramática → NO «Reflexión sobre la lengua»; reusa el chip registrado de la familia vocab. 5 files, 0 core/shell/
CSS/strand-names; DoD GREEN (invariantes de ronda graded contra el CORE real [one-match, 3 distinct, todos con label, oracle
grada true + todos los foils false, paridad noun/themeDir con en EXCEPTO el swap drink, los 14 webps existen, spread de posición
0,1,2,0,1,2,0,1], verify-es 138, visual-qa 320–1366 ×8 rondas es+en+es [48 renders c/u], Read 360/768/1024 [vaso/taza-con-café/
guante/ventilador-eléctrico], 0 EN leaks). Nota: la burbuja `.jjr-say` de Jasper tiene el 2-line clamp universal (trunca en móvil,
decorativo, idéntico en en/de/fr — NO control cut-off; visual-qa GREEN).
**#76 note (PALABRAS CON VARIOS SIGNIFICADOS / significado por contexto L.2.4.a; GRADE 2.º manifest-auto + STRAND «Ampliación
del vocabulario» override, ambos maestra-decisive + precedent-backed, NO surfaced):** `roundsL10n` activity → REBUILD 9 rondas
es. **THE `\b`-EDGE CONSTRAINT (load-bearing, es analog):** el highlight regex `\b(word)\b` (case-insensitive, first-match) cae
SILENCIOSAMENTE [fallback graceful a texto sin resaltar, sin crash] si la target `word` empieza/termina con acento o ñ [`\b` es
ASCII-word-boundary] → **todas las 9 target words son EDGE-ASCII [primera+última letra plain a-z; accents mid-word OK]:
gato/hoja/vela/carta/pila/llave/planta/pata/pico**; las oraciones + glosses SÍ pueden tener acentos libres (solo la word se
regex-matchea). **correct-gloss comparte 0 sustantivos con la oración** [regla anti-cheat; sinónimos deliberados: ramas≠árbol,
mueble≠mesa, ave≠pájaro; oraciones evitan "luz"/"agua"]. round shape `{id, band, word, sentence, choices:[{text,kind}×3]}`;
kind ∈ correct/no-context/off [1 c/u; no-context=otro sentido REAL; off=no-relacionado]; cards shuffled en setupTask; verificado
programáticamente [1 correct, verbatim first-match, edge-ASCII, 3 distinct, band 3/3/3, pos 3/3/3]. engine YA i18n en/de/fr →
7 `strings.es` [theAsk mantiene `{word}` para `.replace`] + speak es-MX + fawn aria "Fern el cervatillo" + speaker aria
"escuchar la oración"; `?v=3→4`; **GRADE 2.º de primaria (manifest "2" auto → chip "2.º de primaria"; NO override)** — maestra
DECISIVE SEP: "identifica el significado de palabras a partir del contexto" = estrategia léxico-semántica de 2.º; MÁS BAJA que
booker #75 (3.º); matches manifest+de Klasse 2+fr CE1+US → NO fork; **STRAND «Ampliación del vocabulario» (es-only
`STRAND_OVERRIDE` añadido al `{de:'Wortschatz untersuchen', fr:'Le lexique'}` existente)** — tarea de VOCABULARIO/significado, NO
gramática; la maestra revisó strand-names.ts: `'Language'`→es «Reflexión sobre la lengua» (gramática) vs `'Vocabulary Acquisition
and Use'`→es «Ampliación del vocabulario» (el chip vocab registrado); reusa el chip de la familia vocab es [sage #26/olive #27/
roary #34/ziggy #35 TODOS usan es:'Ampliación del vocabulario', page.tsx L154/187/193/194]; **⚠ term MX: NUNCA «doble sentido»
con niños [albur/innuendo] — usar «palabra con varios significados»**; character «Fern» el cervatillo KEPT [la maestra sugirió
«venadito» más MX-cálido pero el linguist + SEO usaron cervatillo → mantener por consistencia, no rewrite]; título "El jardín de
acertijos de Fern"; 5 files, 0 core/shell/CSS; DoD GREEN (round-invariant sim, verify-es 137 ["vale mucho dinero"=verbo valer,
NO peninsular; el detector smart pasó], visual-qa 320–1366 ×3 [9 rondas], Read 360/768/1024 confirmando la word RESALTADA
[gato/llave/planta] + first-match-safe [lavabo/lavarme NO capturados]).
**#75 note (USAR EL DICCIONARIO / orden alfabético + palabras guía L.2.4.e; GRADE 3.º de primaria + STRAND «Ortografía y
puntuación», AMBOS overrides es maestra-decisive + de/fr-convergentes, NO surfaced):** `roundsL10n` activity → REBUILD 9 rondas
es. **THE ACCENT/ñ CONSTRAINT (load-bearing, es analog del umlaut):** el core `glossary-guide-core.js` grada por `lc(g1) <=
lc(w) <= lc(g2)` (JS codepoints), y á/é/í/ó/ú/ñ ordenan DESPUÉS de "z" → **todas las g1/g2/words son plain a-z SIN acento NI ñ**
(el linguist hand-verified las 45 palabras) → DATA-DESIGN rule, mantiene 0-core. 9 rondas verificadas programáticamente
[exactly-one-in-range, g1<g2, distinct, band 3/3/3, pos 3/3/3; band1 difieren-1ª-letra, band2 comparten-1ª→2ª, band3
comparten-2→3ª]. render VERBATIM (0 text-transform) → los nouns es lowercase se muestran como se escriben (el de capitaliza por
ortografía alemana; es queda lowercase). engine YA i18n en/de/fr → job es = 7 `strings.es` + speak es-MX + range join `' a '`
[L98 "casa a foco"] + bear aria "Booker el oso"; `?v=3→4`; **GRADE 3.º de primaria (es-only `GRADE_OVERRIDE '3'` añadido al
`{de:'3',fr:'3'}` existente; en stays Grade 2)** — maestra DECISIVE SEP: 1.º-2.º = abecedario + ordenar por 1ª letra; comparar
2ª/3ª letra + palabras guía + uso sistemático del diccionario = competencia de 3.º; override deliberado del manifest "2";
**NO surfaced** — TRES ensembles nativos convergen (de Klasse 3 + fr CE2 ya en el map + es 3.º) ≠ clock-read #73 que divergía;
**STRAND «Ortografía y puntuación» (es-only `STRAND_OVERRIDE` añadido al `{de:'Richtig schreiben'}` existente)** — uso del
diccionario/orden alfabético = conocimiento del sistema de escritura y ortografía (NO «Reflexión sobre la lengua» grammar);
reusa el CHIP ESTABLECIDO de la familia ortografía es (cleo #30 comma + wally #32 mayúsculas, page.tsx L188/L189) → chip-family
consistency (el precedente tempo-day-plan #74 "keep the established family label"); terms: «palabras guía» (NO "palabras clave"),
«orden alfabético», «el diccionario»; character «Booker» el oso KEPT; título "El diccionario de Booker"; 5 files, 0 core/shell/
CSS; DoD GREEN (accent/ñ+alfabético invariant sim, verify-es 136, visual-qa 320–1366 ×3 [9 rondas], Read 360/768/1024
[band1 casa-foco/band2 mesa-mora/band3 codo-cola]). Nota: el bookerIntro speech-bubble tiene el 2-line clamp universal
(trunca en móvil, decorativo, NO control cut-off — visual-qa GREEN).
**#74 note (NEXOS TEMPORALES antes de/durante/después de L.1.1.i; GRADE 1.º de primaria maestra-decisive, NO surfaced — matches
manifest+de; 1.ª LITERACY pick):** `roundsL10n` activity → hubo que REBUILD las 8 oraciones en es (NO solo UI). engine YA
i18n'd en/de/fr → job es = **`FORMS_ES = ['antes de', 'durante', 'después de']`** [multi-word cards; el engine maneja FORMS
multi-palabra] + tdpGrade es arm + setupTask es arm + speak es-MX + turtle aria "Tempo la tortuga" + `strings.es` [7]; **THE
"de"-TRAP (load-bearing):** el francés avant/après toman noun directo ("avant le spectacle") pero **el español antes/después
REQUIEREN "de" (durante NO)** → se hornea la "de" en las CARDS (FORMS_ES) NO en el frame, así el card "durante" nunca da
"durante de la…"; PARED con el **noun FEM-SG invariant** en las 8 rondas [after="la <fem>." → "de la" nunca contrae a "del";
un masc "el viaje" rompería "antes de el viaje"] → los 3 cards surface-swap gramaticalmente; `roundsL10n.es` 8 rondas
[caminata/función/clase de gimnasia/excursión/canción/fiesta/comida/vuelta, todas fem; dist antes de:3/durante:3/después de:2];
`?v=3→4`; **GRADE 1.º de primaria (manifest "1" auto → chip "1.º de primaria"; NO GRADE_OVERRIDE)** — maestra DECISIVE: la
secuencia temporal vive en 2 capas — preescolar=ORAL/vivida (narrar "primero…luego…"), 1.º primaria=ESCRITA (**leer una oración
escrita + elegir el nexo/conector temporal** = «Estudio/Reflexión sobre la lengua», NEM Fase 3); esta actividad REQUIERE leer
una oración → capa escrita = 1.º; **NO es fork divergente** (1.º matches manifest "1" + de Klasse 1) → aplicado sin surfacing
[≠ clock-read #73 que SÍ se surfaced porque divergía]; **STRAND «Reflexión sobre la lengua» auto** (strand-names.ts "Language"
es, el mapeo ESTABLECIDO reusado por todo activity es de gramática/ortografía; la maestra nombró «Reflexión sobre la lengua»
como el framing NEM de su recomendado «Estudio de la lengua» → mantener el mapeo establecido por consistencia; NO override);
character «Tempo» la tortuga KEPT; título "El día de Tempo"; 5 files, 0 core/shell/CSS; DoD GREEN (8-round assembly sim
[todas fem, sin "durante de", dist 3/3/2], verify-es 135, visual-qa 320–1366 ×3 [8 rondas], Read 360/768/1024 [antes-de/durante/
después-de]). Nota: `.tdp-say` (la burbuja de Tempo) tiene un 2-line clamp que trunca el tempoIntro en móvil — universal en/de/fr,
decorativo, NO un control cut-off (visual-qa GREEN); no es un defecto es.
**#73 note (LEER Y PONER LA HORA 1.MD.B.3; GRADE 2.º de primaria OPERATOR-RULED vía AskUserQuestion — 1.er override de PRIMARIA
del run):** engine YA i18n'd en/de/fr [branching centralizado en 4 wrappers wordFor/setWordFor/eventLabel/cueLabel] → job es =
**`wordForES(h,m)`** [MX idiom, la llamada load-bearing: m0→«las N»/«la una» (h=1 SINGULAR: emitir la PALABRA «una» no el dígito
— es-MX TTS lee «1»=«uno»→«la uno»); m15→«y cuarto»; m30→«y media» EN LA HORA ACTUAL (8:30=«las 8 y media», NO el «halb 9»
alemán next-hour); m45→«cuarto para las <next>» (12:45→«cuarto para la una»; **peninsular «menos cuarto» BANNED**); five-min→
numeric h:mm parity con de/fr] + `EVENT_ES` [7 keys, EN-key exactas incl. las de espacio 'Garden time'/'Morning tea': comida=
midday NO almuerzo, refrigerio=mid-morning NO 'el lunch', merienda=afternoon] + `CUE_ES` [2: dawn/noon] + 4 wrapper es arms +
speak es-MX + `strings.es` [11] + 3 aria [carátula del reloj NO esfera / manecilla de la hora-de los minutos NO horario-minutero /
Reloj N]; NO roundsL10n/image-lib; `?v=8→9`; **GRADE 2.º de primaria (es-only `GRADE_OVERRIDE {es:'2'}` NUEVO en page.tsx; de/fr
caen al manifest grade "1")** — maestra DECISIVE SEP: leer reloj analógico = PRIMARIA (preescolar solo trabaja rutina mañana/
tarde/noche, NO reloj preciso); dentro de primaria «Magnitudes y medida» separa **1.º=en punto+y media, 2.º=cuartos («y cuarto»/
«cuarto para las…»)**; el techo de la actividad es cuarto-para = objetivo de 2.º → **override deliberado del manifest "1" + de
Klasse 1; SURFACED como fork contestado cross-locale → operator eligió 2.º**; **STRAND «Magnitudes y medida» auto** (strand-
names.ts "Measurement & Data" es); character **«Tecolín»** [diminutivo MX de tecolote — el equiv cultural del alemán «Eulchen»;
la prosa SEO venía con «Luli la lechuza»→harmonizada a Tecolín en TODA la prosa]; título "El reloj de cucú de Tecolín"; 5 files,
0 core/shell/CSS; DoD GREEN (wordForES sim [la una/las 8 y media/cuarto para las 4/cuarto para la una, sin menos-cuarto], verify-
es 134, visual-qa 320–1366 ×3 [14 rondas], Read 360/768/1024 [read-eventos/set-¡Despierta al cucú!/half-«las 8 y media»]).
**#72 note (RELACIONES ESPACIALES / palabras de ubicación K.G.A.1; GRADE maestra-decisive KÍNDER, NO surfaced; la localización
math MÁS PESADA):** engine YA i18n'd en/de/fr → **mirror el FR model `{bare,def,de}`**: `VEHICLE_ES` [5, **CAMIÓN=BUS en MX
trap resuelto**→bus=autobús/van=camioneta[fem]/car=carro/truck=**tráiler**/boat=barco; campos bare/def/art/noun], `PREP_ES`
{above:'encima',below:'debajo','next-to':'junto'}, un **`esFused(rel,k)` helper** [de+el→del, a+el→al; fem "camioneta"→"de la"/
"a la"] cableado en los es-arms de makeTasks (lmVal/lmDef/moverVal/relVal), `strings.es` [13; promptReverse+promptTwoTruck
BAKEAN "tráiler"/"tráileres" = en "his truck"/"your two trucks"], tower-label es (.bare), beaver aria "Beto el castor",
candidate aria "un tráiler"/"un lugar vacío para estacionar", speak es-MX; `?v=4→5`; **GRADE KÍNDER native (NO GRADE_OVERRIDE
es; L109 deja `{de:'1'}` intacto; L151 STRAND_OVERRIDE fr-only intacto)** — maestra DECISIVE SEP (relaciones espaciales/
ubicación/puntos-de-referencia/«entre» = marcadores DEFINITORIOS de preescolar «Forma, espacio y medida»; 1.º pasa a
desplazamientos/trayectorias→NO tocado; es-K-cluster rule, sin fork; el de Klasse-1 = artefacto Kita); **STRAND «Forma, espacio
y medida» auto** (strand-names.ts "Geometry" es=FEM fijado #52); título "El estacionamiento de Beto"; 5 files, 0 core/shell/CSS;
DoD GREEN (verify-es 133, assembled-prompt sim del/al/de-la gramaticales, visual-qa 320–1366 ×3, Read 360/768/1024 place/next-
al/reverse-del).
**#71 note (COUNT-OUT SIN FEEDBACK / self-stop + numeral-formation commit K.CC.B.5; GRADE precedent-locked KÍNDER, NO
surfaced):** engine YA i18n'd en/de/fr (el de-fanout ya hizo LIVE `callNumeral`/`callKind` — el "_callCard lift" del plan
alemán quedó STALE, no hizo falta) → 24 `strings.es` [NO 25], `WORDS_ES` 0–9 + numWord es, `COLOR_ES` {amarillos/amarillo,
cafés/café} [**«café» MX, no «marrón»**; post-nominal "patitos amarillos"], speak u.lang es-MX, 4 inline es arms
[recall aria L169 "regresar un patito" · raft-duck L175 "patito {sg} — toca para enviarlo" · brood-duck L184 "patito"+", contado"
· commit-speak-zero L291 "cero"] + kindWord es branch L143; `?v=7→8`; **GRADE KÍNDER native (NO GRADE_OVERRIDE es; L108 deja
`{de:'1'}` intacto)** — maestra DECISIVE (contar+producir cantidad hasta 9 + trazar = 3.º preescolar SEP/NEM; el trazo es
sello no lectura-de-cifras→NO como pips; NO fork contestado, precedent-lock a mochi #57/twinsies #69 count-out es-KÍNDER);
**STRAND «Sentido numérico» auto (L146 tiene fr-only STRAND_OVERRIDE — NO añadí es)**; terms: pase de lista/pasar lista, firmar,
la parvada, hoja de nenúfar, el niño forma «el número» (no «la cifra» en UI runtime), «el cero también es un número»;
character «Mamá Pata» KEPT; título "El pase de lista de Mamá Pata"; 5 files, 0 core/shell/CSS/strand-names; DoD todo GREEN
(verify-es 132, visual-qa 320–1366 ×3, Read 360/768/1024 count-out/distract/zero/sign-layout).
**#70 note (COUNT-ENACTED NUMERAL PRODUCTION K.CC.A.3; GRADE surfaced→operator-ruled KÍNDER):** el engine más grande — `var
LANG` + WORDS table + KIND map + 27 `strings` + 8 inline arms → job es = `WORDS_ES` [object 0–20] + numWord es + `KIND_ES`
[4 kinds keyed por acorn/button/firefly/marble; art/bare/pl **+ ct** para gender de "counted"] + speak() u.lang es-MX +
`strings.es` [27] + 8 inline es arms [promptSubset ×2, tenframe/ones/tap/parade aria, mintedZero+_win speak]; NO number-word-
issue/image-lib/roundsL10n; core `numeral-album-core.js` 0 lines. **GRADE = KÍNDER (operator-ruled 2026-07 vía AskUserQuestion;
native "K", NO override; chip «Kínder»)** [maestra DECISIVE: el ACT del niño es CONTAR (correspondencia uno a uno + cardinalidad)
—mismo acto cognitivo que twinsies/mochi/digby (todos es KÍNDER); el numeral es el OUTPUT auto-forjado, no una tarea de leer
numerales como pips; preescolar cuenta+asocia hasta 20 → el teen range (14) no requiere valor posicional; **los K.CC.A.3 siblings
SPLIT** (digby writing=Kínder, pips reading-to-20=1.º) y rivets está en medio — surfaced (contested, el de/fr treatment lo
agrupa con pips) → operator eligió **Kínder**]. **STRAND «Sentido numérico» (auto, NO override)** [matches counting siblings].
**UNIT «forjar»/«la forja»** [linguist — kid-warm, la actividad ES una forja; la maestra prefería «acuñar» pero es más frío]; ticket=«boleto»;
4 kinds gender **las bellotas/los botones/las luciérnagas/las canicas** [botón masc → «los botones»; ct field para agreement].
Character «Rivet» KEPT [rivetSVG aria "Rivet" NO tocado]; título "La forja de números de Rivet"; 1 prose block; 0 core;
VISUAL-QA GREEN 320–1366 [54 renders] + Read 360/768/1024 [count-mint/subset-«las bellotas»/reverse-boleto].
**#69 note (GLEICH VIELE/hacer la misma cantidad K.CC.B.5; CLEAN no-fork):** engine tiene `var LANG` + 14 `strings` vía
api.t → job es = add `es` a las 14 [12 base + 2 readout readCounted/readTwin] + spriteSVG aria es + speak() u.lang es-MX +
_declare combo speak es «{n} y {n} — ¡gemelos!» + _renderDone eq es «— ¡gemelos!»; NO number-word/image-lib/roundsL10n;
core `count-twin-core.js` 0 lines. **GRADE = KÍNDER (native "K", NO override; chip «Kínder»)** [maestra DECISIVE +
PRECEDENT-LOCKED: conteo/cardinalidad/conservación hasta 12 = preescolar; los hermanos del MISMO counting-cluster
mochi-feast #57 (K.CC.B.5) + necklace #55 (K.CC.B.4) son native-K «Kínder» sin override → twinsies matches; **NO el patrón
'PK' de comparison-creek/nesting-pots (ese es el K.CC.C.7 cluster)**; DIVERGE del alemán Klasse 1 correctamente]. **STRAND
«Sentido numérico» (auto, NO es override; STRAND_OVERRIDE tiene entry fr-only, dejar)**. Terminología [maestra+linguist]:
«la misma cantidad» [kid-warm, NO «el mismo número»], «contar», «¿cuántas?» [bellotas fem], «gemelo/gemelos» [Sg/Pl split:
UN gemelo→singular en imperativos, plural SOLO en el win «¡Somos gemelos!»], «bellotas», «el duende gemelo» [descriptor;
character «Zwicke» KEPT], «el plato», peek=«👀 Espía». **§A.13.62 fix**: el es `prompt` «¡Arma un gemelo con la misma
cantidad!» (38c) envolvía a 3 líneas @320 y cortaba el widget del numeral round [r4, 661>640]→acortado a «¡Un gemelo con la
misma cantidad!» (33c, noun-phrase, 2 líneas, conserva la misma cantidad)→638<640; EN sin regresión [el numeralHint pill es
fixed-height→clip idéntico en/es, no era el driver]. Título "¡Gemelos — la misma cantidad!"; 1 prose block; 0 core;
VISUAL-QA GREEN 320–1366 [42 renders] + Read 360/768/1024 [count/numeral/count-on].
**#68 note (EL NÚMERO QUE FALTA en cualquier posición 1.OA.D.8; CLEAN no-fork):** engine tiene `var LANG` + 28 `strings`
vía api.t → job es = add `es` a las 28 + fixitSVG aria es + speak() u.lang es-MX; NO number-word/image-lib/roundsL10n;
core `missing-part-core.js` 0 lines. **GRADE = 1.º primaria (native "1", NO override; matches sibling sharing-jar #16
1.OA.D.8)** + **STRAND «Sentido numérico» (auto, NO es override; el STRAND_OVERRIDE tiene entry de-only, dejar)**. Terminología
[maestra+linguist]: «el número que falta», «familia de operaciones» [término SEP, NO «familia de sumas y restas»], «marco
de diez» [ten-frame; NO «tabla de diez»→choca con tablas de multiplicar], «recta numérica», «el signo igual»/«en equilibrio»/
«balanza», «el todo/una parte», hop=«Brinca», slide=«Junta», «De {a}, ¿cuántos quitas para que queden {b}?», read-aloud
«más…es igual a…» [en el `model` string, refuerza el signo igual]. **Check button → «Comprobar»** [shell es label, alineado
en instruction/hintCheck — NO «Revisar»]. **§A.13.62 fix**: es promptBalance «Haz que los dos lados queden iguales.» (37c)
cortaba el balance-beam widget @320 [r9, 655>640]→acortado a «Equilibra los dos lados.» (24c, 1 línea, refuerza equilibrio)
→632<640; EN sin regresión. Character «Fixit» kept [aria "Fixit, el topo reparador"]; título "El rincón de arreglos de Fixit";
1 prose block; 0 core; VISUAL-QA GREEN 320–1366 [66 renders] + Read 360/768/1024 [make10/ten-frame + subtraction/recta + balance].
**#67 note (COMPONER un número K.OA.A.3; GRADE surfaced→operator-ruled 1.º):** engine tiene `var LANG` + WORDS
number-word table + speak + 24 `strings` vía api.t → job es = `WORDS_ES` [0–20, object-literal] + numWord es branch +
speak() u.lang es-MX + `strings.es` [24] + `_win` combo join « y » + spoken verb « son » + 2 speak literals es + 2 aria es
[wall-cubby + tray-chip locked/unlocked]. **GRADE = 1.º DE PRIMARIA (operator-ruled 2026-07 vía AskUserQuestion; es
GRADE_OVERRIDE '1'; native="K")** [maestra: componer hasta 14 CRUZANDO la decena + suma mental de varios sumandos =
composición aditiva formal de 1.º (preescolar es concreto, por conteo, ≤10); matches ten-tank #58 (cruzar la decena→1.º);
**DIVERGE del hermano de MISMO estándar chuffer K.OA.A.3 (≤10→es "Kínder") por dificultad de contenido** — surfaced (grade
+ sibling-diverging)→operator eligió 1.º]. **STRAND «Sentido numérico» (auto, NO override)** [strand-names.ts "Operations
& Algebraic Thinking" es=«Sentido numérico»; matches chuffer+ten-tank]. **UNIT «botana(s)»** [maestra+linguist]; LUNCHBOX
«lonchera»; **COMBO «N y N son N»** [join « y », verb « son »]; win {n}=dígito, {combo}=numWords; character «Clunk» KEPT
[clunkSVG aria="Clunk" NO tocado]; título "El almuerzo perdido de Clunk" [«almuerzo»=comida escolar MX]; 1 prose block;
0 core; VISUAL-QA GREEN 320–1366 [54 renders, strings largos qMulti/hintFeed OK] + Read 360/768/1024 [free/multi/two-ways-14].
**#66 note (ORDENAR/seriar números K.CC.C.7; TODO PRECEDENT-LOCKED, NO surface):** the CLEANEST engine — TODOS los
strings son `api.t` (content-locale aware) → job es = add `es` a las 13 keys `strings` + es arms a los 3 character SVG
aria [grandpaSVG/weeOlenSVG/dootSVG]; `var LANG` existe SOLO para esos 3 aria; NO speak/roundsL10n/image-lib/number-word;
core `ordering-core.js` 0 lines. **GRADE = PREESCOLAR (es GRADE_OVERRIDE 'PK' → «Preescolar»; native="K")** [PRECEDENT-
LOCKED: el hermano de compare comparison-creek (MISMO estándar K.CC.C.7) es es:'PK'/«Preescolar»; maestra: seriar vive en
la MISMA banda de preescolar que comparar; el reto de 2 cifras es UN round; el Klasse-1 alemán NO transfiere; **sibling-
consistency (mismo estándar) → «Preescolar», NO el «Kínder» de digby** que era otro estándar]. **STRAND «Sentido numérico»
(auto, NO override)** [matches comparison-creek]. **COMPARISON WORDS «mayor/menor» (iguales) — maestra DECISIVE** [el decoy
tamaño≠número EXIGE palabras inequívocas del número; «más grande» chocaría con el tamaño de la olla; «mayor/menor/igual» ES
el registro SEP de 3.º preescolar; gender-invariant; NOTA comparison-creek UI usa «más grande/más chico» pero nesting-pots
diverge legítimamente por su decoy de tamaño]. Character names **Abuelo Pip / Bebé Wee Olen / Doot el pato**; título "Las
ollitas del Abuelo Pip" [«ollitas» diminutivo]; 1 prose block; 0 core; VISUAL-QA GREEN 320–1366 [48 renders] + Read
360/768/1024 [nest + gap-fill].
**#65 note (FLAGSHIP a.m./p.m.→day-parts REBUILD; FRAMING surfaced→operator-ruled day-parts):** engine tiene `var LANG`
+ per-round `activityL10n` → job es = `L.es` [6 keys q/am/pm/winAM/winPM/hint] + `strings.es` [title/instruction] +
`activityL10n.es` ×9 + es arms en activity-render/time-render/_srMirror. **FRAMING = SOL «Mañana» / LUNA «Tarde y noche»
(operator-ruled 2026-07 vía AskUserQuestion; la recomendación unánime del ensemble, espeja el alemán)** [México SÍ usa
a.m./p.m. pero es una NOTACIÓN posterior; para K-2 los day-parts son el framing SEP-primario + icónico; **HARD RULE: el
binario = antes/después del MEDIODÍA, NO día/noche** — la ronda 4:00-jugar es de día pero después del mediodía → LUNA =
«tarde Y noche», nunca «noche/oscuro»; la prosa menciona que los adultos escriben a.m./p.m., honra 2.MD.C.7 sin cargar los
botones]. **GRADE = 1.º DE PRIMARIA (es GRADE_OVERRIDE '1'; native="2")** [maestra: leer la hora en punto = medición del
tiempo formal de 1.º, clears K-cluster; más simple que el elapsed #62 (native 3.º); matches de Klasse 1]. **STRAND
«Magnitudes y medida» (auto, NO override)** [tiempo=magnitud, como #62]. **Time «las N»** [linguist; ninguna ronda es 1:00,
guard la/las]. **§A.13.62 SPARSE FIX**: "Tarde y noche" (dual label largo) infló los botones `.ap-choice` → SPARSE
(area 0.30 < 0.32) en ≥412px; EN pasaba (labels cortos). Fix = mirror el patrón `.ap-de`/`.ap-fr` YA existente: add `ap-es`
al root class + `.ap-es .ap-choice{font-size:1.05rem;max-width:128px}` + `.ap-es .ap-icon{88px}` + `@media≤380{.92rem}`
[CSS del activity-injected `<style>`, es-scoped, 0 lcs-shell/Direction-A; EN sin regresión]. Character «Sprocket» KEPT;
título "El reloj de Sprocket — mañana o noche" [subtítulo distingue de #62 "El reloj de Sprocket"]; 1 prose block; 0 core;
VISUAL-QA GREEN 320–1366 [54 renders] + Read 360/768/1024 [incl. la ronda 4:00-jugar].
**#64 note (numeral WRITING/trazar 0–9; GRADE surfaced→operator-ruled KÍNDER; DIVERGE del alemán Klasse 1 Y del hermano
de lectura pips #60 1.º):** engine tiene `var LANG` [en/de/fr; strings vía `api.t`, no interpola → `.replace()`] → job es =
add `es` a las 13 keys de `strings` + dogSVG aria es arm [L42] + speak() **es-MX arms** [L24 `lang:(LANG==='es'?'es-MX':LANG)`
+ L25 u.lang]. **GRADE = KÍNDER (operator-ruled 2026-07 via AskUserQuestion; NO es GRADE_OVERRIDE → native "K" auto →
chip «Kínder» vía GRADE_KEY_MAP['K']='kindergarten' → es.json seo.educational_level.kindergarten="Kínder")** [maestra
DECISIVE: trazo/grafomotricidad de dígitos 0–9 = preescolar puro, no «primaria formal real» → K-cluster default; DIVERGE
del alemán Klasse 1 Y de pips #60 1.º — leer números hasta 20 (rango→1.º) ≠ formar el trazo de un dígito (motricidad→kínder),
competencias distintas]. **STRAND = «Sentido numérico» (auto, NO es STRAND_OVERRIDE)** [escribir/leer numeral = representación
del número, mismo eje; el alemán separó a "Zahlen und Operationen" pero es NO; matches pips #60 sin override]. **Chip verb
«Traza el {d}»** [trazar = verbo SEP para formación del numeral; art masc «el 5»; «repasar»=sinónimo en hints para evitar
eco traza/trazo]. Character **«Digby» KEPT** [el perrito]. Título "Digby traza los números". 1 prose block, distinct opener
"Digby el perrito"; 0 core; VISUAL-QA GREEN 320–1366 [60 renders, cards=0 trace-canvas] + Read 360/768/1024.
**#63 note (área/geometría — 2.ª non-«Sentido numérico», 1.ª «Forma, espacio y medida»; sibling de mosaic-menders #13):**
`txt` lee LCS.i18n.current → **NO var LANG** [patrón #13/#37/#42]; engine YA expandido a 4.º locale (L en/de/fr + strings
en/de/fr + areaUnitPhrase locale-aware + todos los aria/SR vía `txt`) → job es = solo AÑADIR sub-bloques es (0 call sites,
0 core). **L.es 18 keys** [9 base + 9 aria/SR ya existían en en/de/fr] + **strings.es** [7] + **areaUnitPhrase es arm**
[`n===1?'1 cuadrito':n+' cuadritos'`]. Grade **3.º de primaria (native '3', NO override)** [maestra: área por
recubrimiento sin fórmula = 3.º SEP, precursor de base×altura de 5.º-6.º; el `fr:'4'` CM1 NO transfiere]. STRAND **es
OVERRIDE→«Forma, espacio y medida»** [FORZADO: "Measurement & Data" auto-mapea a «Magnitudes y medida» que es MAGNITUDES
PURAS — área/superficie es magnitud GEOMÉTRICA de una figura → FEM; DOS precedentes es ya lo hacen: mosaic-menders +
mending-fences `es:'Forma, espacio y medida'`]. **Unit word «cuadrito(s)» REUSADO de #13 mosaic-menders** [maestra+linguist:
match sibling]; área=«área», cubrir=«cubrir», «sin huecos ni encimados», win «Área: N cuadritos». **Flor-bed «jardín»**
[linguist RECHAZA «cantero» = no-mexicano/peninsular]. Character **«Sprout» KEPT** [como «Sprocket» #62; serie]. Título
"El prado de retazos de Sprout" (fits 320, 2 líneas móvil). 1 fila, 1 prose block; VISUAL-QA GREEN 320–1366 [66 renders,
tile/estimate/build] + Read 360/768/1024.
**#62 note (FIRST time/measurement activity + FIRST non-«Sentido numérico» strand this run):** grade **3.º de
primaria (native '3', NO override)** [maestra DECISIVE: 1.º-2.º LEER el reloj, 3.º CALCULAR tiempo transcurrido].
STRAND **«Magnitudes y medida» (auto, NO override)** [Explore CONFIRMÓ strand-names.ts "Measurement & Data" es=
'Magnitudes y medida' — el tiempo es magnitud; el hermano #8 clock-digital también auto, sin override]. **Reloj
idiom es REUSADO de #8 clock-digital**, adaptado a fragmento inline (_srMirror "El reloj marca {spoken}"): art
"la"/"las" sin verbo, "un cuarto para las {h+1}" [mexicano, NO "menos cuarto"], "es la una" singular, wrap 12→1,
digit-mm fallback. L.es 6 keys + spoken() es + strings.es + clockSVG aria "carátula del reloj" + _srMirror es. TWO
manifest rows [what-time + add-subtract] + TWO prose blocks; será/era tense-split. 0 core; VISUAL-QA GREEN ambas
filas + Read 360/768/1024.
Recent commits: #57 mochi-feast `8d710c12` · #58 ten-tank `831c124a` · #59 wondering-jar `0b2a0abe` ·
#60 pips-round `a7e94a3c` · #61 posy-egg-cartons `16e193d4`.
**#61 note:** grade **1.º de primaria (es GRADE_OVERRIDE '1')** — maestra DECISIVE + "no escalation needed":
contar de 10 en 10 hasta 100 + la decena = 1.º mexicano; la **Klasse-2 alemana NO transfiere** (artefacto de
estratificación DE bis-20/bis-100); alinea los hermanos base-ten es within-100 (bundle-bot/track-repair/ten-tank
='1', solo bis-1000 comet-kangaroo='3'). STRAND «Sentido numérico» auto. carton=**caja** (mejor que "cartón"=charola
de 30; caja=box de 10). CLEANEST engine: var LANG ya existía → solo **8 strings.es + 2 aria es arms**. Título 27ch
2-líneas SIN cut-off.
**#60 note (FIRST numeral-reading + 2.º grade-override es this run):** grade **1.º de primaria (es GRADE_OVERRIDE
'1') — OPERATOR-RULED** (maestra DECISIVE: la inversión 13/31 = posición de cifra cambia el valor = valor posicional
naciente = primaria formal, misma lógica que #58; alineado con alemán Klasse 1; palanca: depende de que la ronda
13/31 esté). Primera actividad de lectura-de-numerales → surfaced → operador eligió 1.º (fija precedente). STRAND
«Sentido numérico» AUTO. **RESIDENT_ES map (15, artículo baked) + win gender-safe «{w} — ¡es {name}! ¡Entregada!»**
(§A.13.54: "es" invariante + "Entregada" concuerda con la carta = invariante). WORDS_ES 0–20 + numWord es + speak
es-MX + 3 speak-phrase es arms + 2 aria + 12 strings.es. leer números / «cifra»=posición. Check button "Comprobar"
(no "Revisar"). Título "Pip trae el correo" (18ch) sin cut-off.
**#59 note:** grade Kínder (maestra DECISIVE: estimar+contar oral ≤20 = counting cluster = preescolar; estimation-
before-counting IS a real SEP competence "por percepción"; back with #54–#57). **Honored-guess word = «tu
estimación» (operator-ruled)** — linguist wanted "tu deseo" (wish-metaphor/star/"can't be wrong"), maestra objected
("deseo=querer≠anticipar; the SEP competence is ESTIMACIÓN; ‹tu deseo fue 5› reads odd") → **operator chose
estimación** (no-shame carried by direction-only feedback). owl=lechuza, jar=frasco, candies=dulces, vsLabel="y"
(no competitive frame), whichSame=gemelos. Cleanest engine (28 strings.es + speak es-MX, 0 inline/override edits).
Título 33ch cut-off@320 → acortado 20→16 "Frasco preguntón"; ALSO prompt 52ch→37ch "Estima cuántos hay… ¡luego
cuéntalos!" (the two-jar round r4 was 13px over — the LONG prompt wrapped 3 lines; trimming it cleared it, activity-
layer only, 0 core).
**#58 note (FIRST base-ten + FIRST es grade-override this run):** grade **1.º de primaria (es GRADE_OVERRIDE '1')**
— maestra DECISIVE: unitizar diez→una decena + valor posicional = entrada de primaria (preescolar NO tiene decena);
reuses the es base-ten sibling pattern EXACTLY (track-repair/bundle-bot es='1', comet-kangaroo es='3' bis-1000).
STRAND «Sentido numérico» AUTO (NO es override — all 3 base-ten siblings fall through; strand-names.ts "Number &
Operations in Base Ten" es='Sentido numérico'). Terms decena/unidades/valor posicional/agrupar; bundle-verb child-
facing "formar una decena". 29 strings.es + WORDS_ES 10–19 + speak es-MX + 5 inline speak() es arms. Título 29ch
envuelve 2 líneas SIN cut-off.
**#57 note:** grade Kínder (maestra: producir/formar colección = preescolar, distinct from #55 receptive). 3 dialect
flags resolved on merit/EVIDENCE: feed-verb "¡Dale a Mochi {n}…!", dish/bowl plato/tazón, cupcake/muffin = BORROWED
"cupcakes"/"muffins" (Read the actual webp → Western frosted+domed-chip art → loanwords fit, native pastelitos/
mantecadas would mismatch). Engine = single 16-key strings edit (Object.assign-over-core, no var LANG/speak).
Prose framed PRODUCIR/FORMAR (not "cuántos hay") per maestra guardrail vs #55.
**#56 note:** grade Kínder = maestra DECISIVE (German Klasse-1 count-on-as-addition-basis does NOT transfer;
sobreconteo + serie numérica oral son preescolar en MX). Runtime title shortened "¡Cuenta y despierta las
estrellas!" (34ch, cut-off@320) → **"¡Cuenta las estrellas!"** (22ch) to clear the #46 320px cut-off; SEO
page_title unaffected. CREATURE_ES gender-trap map (§A.13.54) resolved via "¡Despertaste a {c}!" personal-'a'
template. Button verb = maestra's "Sigue contando" (not linguist "Cuenta más"), harmonizes with prompt.
**#54 strand ruling (operator, this session):** maestra flagged preescolar eje divergence («Pensamiento
matemático» would be the coherent preescolar term; «Sentido numérico» reads as primaria) → operator chose
**«Sentido numérico» (auto, NO override)** for consistency with all prior Kínder counting siblings. So the
K-cluster C&C auto-map «Sentido numérico» STANDS platform-wide; do NOT re-litigate per activity.
German blow-by-blow SoT = out-of-tree `C:\Users\rkgen\.claude\plans\the-previous-session-you-groovy-pie.md`.
**es Geometry strand pattern SET at #52 (operator "FEM global"):** strand-names.ts "Geometry" es was "Sentido
espacial" (NOT a SEP eje) → changed to **«Forma, espacio y medida»** (doctrine: figuras→FEM). All es Geometry
activities now auto-map to FEM. **Known K-label divergence to reconcile later:** `comparison-creek k-cc-c-7`
uses `{es:'PK'}`→"Preescolar" (a prior es K activity) vs the #51-locked K-native "Kínder" — outlier, not fixed.

## Workflow (per activity)
"continue" → EnterPlanMode → read the German `## ACTIVITY #NN` section → 1 Explore agent (engine facts, line-
precise) **in parallel with** 3 general-purpose es-MX ensemble agents (linguist / maestra / SEO) → synthesize →
surface GENUINE forks via AskUserQuestion (grade/strand/name that diverge from precedent) → write plan →
ExitPlanMode (the ONLY approval gate) → build → full §A.13.62 LOCAL DoD → **AUTO commit+push, NEVER ask** →
**NO deploy** (batched to the very end) → update this file + the MEMORY.md pointer.

## Locked doctrines
- **AUTO-COMMIT after DoD** (never ask to commit) → [[feedback-es-fanout-autocommit]].
- **es-STRAND DOCTRINE** (already in code: strand-names.ts comments on mosaic-menders L126 + mending-fences
  L199 — RESPECT, don't re-litigate; run `grep "Magnitudes y medida\|Forma, espacio y medida" strand-names.ts
  page.tsx` BEFORE deciding any MD/geometry eje):
  - «Magnitudes y medida» = pure magnitudes (longitud/masa/**capacidad**/tiempo/dinero) — the auto/default for MD.
  - «Forma, espacio y medida» (FEM) = geometry-measurement ONLY (área/perímetro/superficie/figuras), via es override.
  - «Sentido numérico» = número/operaciones/problemas/**fracciones** (fractions have no separate eje in SEP/NEM).
  - «Análisis de datos» = gráficas/datos (graph-it/line-plot).
  (At #49 the maestra proposed FEM-global for length; WRONG per this doctrine — length is a pure magnitude →
  «Magnitudes y medida». Operator confirmed "respetar doctrina". Don't repeat.)
- **es K-CLUSTER PATTERN** (operator-ruled at #51): grade-K content stays **K-native → chip "Kínder"** (NO es
  GRADE_OVERRIDE). Do NOT follow the German K→Klasse-1 override — Mexican preescolar/kínder IS a real obligatory
  school stage (unlike German "Kindergarten"=daycare), and pre-numeric K content is canonical preescolar.
  Override to '1' (1.º de primaria) ONLY when the content is genuinely formal primaria maths.
- **GRADE precedents:** bis-1000 place-value (2.NBT) → es '3'; multiplication/division/OA-strategy → es '2';
  1.NBT-within-100 place-value/number (bundle-bot/bos-berry-pantry) → **es native '1'** (operator-locked #45;
  de/fr go Klasse-2/CP); word-problems-within-20 CGI (vet-diagnosis) → es GRADE_OVERRIDE '2' (maestra merit,
  converges de:'2'+fr:'2'); fractions (fox-forge 3.NF) → es native '3'. When the maestra's grade diverges from
  precedent/consistency, SURFACE via AskUserQuestion (did so at #37 strand, #41 name, #45 grade, #49 strand, #51 K-label).

## Build recipe (the 5-file activity-layer surface; 0 protected-core / lcs-shell / Direction-A lines)
1. `mini tools/<eng>-activity.js` — add `es` everywhere de/fr branch: strings/L-pack, speak (`lang: LANG==='es'
   ?'es-MX':LANG` + u.lang es-MX), aria sites, number/fraction word helpers (`numWordES`/`fracWordES`), win-speak.
   Engine variants: (a) `var LANG` set in init [most]; (b) `txt()` reads `LCS.i18n.current`, NO var LANG/speak
   [bramble #51, #18/#37/#42 — es = `L.es` pack + strings.es, no code branches]. `_pPrompt` helper is often
   already generic → per-round prompts localize via manifest data only.
2. `mini tools/<eng>-activities.json` — es slug/page_title/page_intro; + per-round `promptL10n.es` OR
   `roundsL10n.es` when the engine uses it (roundsL10n: copy ALL non-story fields VERBATIM from en → grading
   preserved; deep-equal self-check).
3. `frontend/messages/activity-content/es.json` — prepend `prose[<id>]` (about[3]/practices[4]/howToPlay[3]/
   learningGoals[3]; « » guillemets; distinct about-opener; no code/"Common Core"). Count +1 per activity.
4. `mini tools/<eng>-activity.html` — bump `<eng>-activity.js?v=N` (verify the actual current ?v first).
5. `frontend/app/[locale]/activities/[slug]/page.tsx` — bump `ACTIVITY_WRAPPER_VERSION`; MERGE es into
   GRADE_OVERRIDE/STRAND_OVERRIDE only when an override is needed (tsc TS1117 catches dup keys).
   (+ occasionally `frontend/lib/seo/strand-names.ts` — ADD an `es:` key to an existing strand entry when a NEW
   strand debuts, e.g. Fractions es→"Sentido numérico" at #50; this is the additive German-plan §C pattern, NOT
   the reverted MD situation.)

## Register rules (no peninsular tells)
No vosotros/coger/vale/ordenador/móvil/tirachinas/zumo(→jugo)/rebosa(→se derrama)/coche(→carro)/césped(→pasto);
no "-e" inclusive neomorphemes. Character names KEPT (Gus/Bo/Pip/Tildy/Bramble…), transparent word-names may
localize per operator fork (Comet→Cometa #41). `verify-activity-content-es.js` MX_BAD regex enforces this.

## DoD (LOCAL only; §A.13.62) → then AUTO commit+push, NO deploy
`node --check` js → JSON valid (manifest + es.json) → engine-specific asserts (numWordES/fracWordES values;
roundsL10n deep-equal en; L.es key-set == L.en) → `node scripts/verify-activity-content-es.js` (count +1; 0
templates/leaks/peninsular/code/"Common Core"; unique about[0]) → `node scripts/preflight-activity-routes.js`
(es slug unique) → tsc TS1117 on page.tsx → `node scripts/visual-qa-activity.js --activity=<id> --locale=es`
(GREEN 320–1366) then `--locale=en` (regression) then `--locale=es` (restore) → **⚠ WATCH the runtime title at
320px** — if it wraps 2 lines → cut-off (the #46 lesson: shorten strings.title.es, re-run) → **personal Read
360/768/1024** → EN-leak grep → `git diff --name-only` = exactly the intended files, 0 core/shell/CSS.
Commit `[FEAT][ACTIVITY][es] Mexican rebuild — <title> / <skill> (<eng> <code>, <grade>)` --no-verify + push.

Related: [[feedback-es-fanout-autocommit]] · [[feedback-cognate-aware-verify-discipline]] ·
[[feedback-activity-i18n-fanout-gender-anchor]] · [[project-german-secondbatch-fanout]].
