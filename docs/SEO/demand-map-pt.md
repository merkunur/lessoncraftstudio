# Brazilian-Portuguese (pt) demand map — topic-page keyword targeting

**Purpose:** map real Brazilian K-3 search demand → the single-axis topic pages (`/pt/topic/<slug>`) and type×grade intersection pages that should own it. Method per §17.5 (strategic, no invented volumes): the real autocomplete harvest `docs/SEO/harvests/pt.json` (657 requests, hl=pt&gl=br, 2026-07-06, 1,946 unique suggestions) + 19 SERP samples (WebSearch) + the live pt deck inventory. Companion machine artifact: `docs/SEO/demand-terms-pt.json`. Date: 2026-07-06.

**Surface ownership (locked, do not cannibalize):** subject×grade hubs own "Atividades de matemática 1º ano – para imprimir grátis (PDF)" and siblings; deck landings own type+theme long-tail ("… | atividades para imprimir grátis"). **This map targets only single-axis topic pages (type-head, theme-head, level-head) and type×grade intersections.**

## 1. Core finding — how Brazil searches

Brazilian K-3 search is organized around the noun **"atividades"** (never "fichas" — that is pt-PT; "exercícios" is a weaker secondary) with a fixed qualifier stack: **para imprimir · grátis · PDF · educação infantil / 1º ano / 2º ano / anos iniciais**. Three structural registers matter:

1. **"atividades de X para imprimir"** — the universal frame. Autocomplete depth is enormous on the core seeds ("atividades para imprimir" → pdf, educação infantil, alfabetização, 1 ano, 2 ano…).
2. **The alfabetização cluster** — "atividades de alfabetização" is its own head ecosystem (vogais, sílabas simples/complexas, letra X, alfabeto pontilhado, 1 ano). Literacy demand routes through "alfabetização", not through "português".
3. **The "continhas" register** — arithmetic drill sheets are colloquially "continhas" ("continhas de somar", "continhas de adição e subtração", harvest: "continhas subtração educação infantil"). SERP owners (Toda Matéria, Guia da Criança) title with it. Our adição/subtração/picture-arithmetic pages should lead with it where honest.

Grade tokens: **educação infantil** (dominant, covers 0-5), **pré-escola/pré-escolar** (4-5), **1º/2º/3º ano** (typed "1 ano"/"1o ano"), **anos iniciais** (teacher register, grades 1-5), **maternal/creche/berçário** (below our range). BNCC is the credibility framework (harvest: "adição educação infantil bncc", "pareamento educação infantil bncc").

**Dominant SERP owners** (recur across nearly every sampled query): Toda Matéria, Tudo Sala de Aula, Acessaber, Via Carreira, Educador, Mestre do Saber, Escola Educação, plus Pinterest boards and paid-product shops (Hotmart/Elo7-style "arquivos"). Wordwall owns much of the "online" intent. The paid-product density ("arquivo para imprimir" R$) is an opening: **free + instant PDF + online play** beats a checkout for the same query.

## 2. Inventory backing (pt published decks = 3,934 across 59 types)

Level distribution (ageRange → pt level): 5-7 pré-escola/educação infantil ≈ **2,790** · 6-8 1º ano ≈ **560** · 3-5 educação infantil (creche) ≈ **444** · 7-9 2º ano ≈ **168** · 8-10 3º ano ≈ **134**. The catalog is overwhelmingly educação-infantil-weighted; grade-2/3 demand (frações, multiplicação, valor posicional, relógio) has thin substrate.

Biggest types: pattern-train 251, addition 200, subtraction 199, math-worksheet 151, more-less 150, sudoku 150, math-puzzle 148, code-addition 147, big-small 144, shadow-match 134, odd-one-out 131, picture-sort 123, prepositions 101, treasure-hunt 100, cryptogram 100, find-objects 98, missing-pieces 97, word-guess 95, word-scramble 94, matching 94, picture-path 93, science-sort 90, find-and-count 88, telling-time 81, bingo 80.

Themes: 50 tags. Top: 4th_of_july 197 (**zero BR demand — dead weight, exclude from targeting**), animals 151, fruits 112, vehicles 106, toys 104, shapes 90, flowers 73, dinosaurs 60, then a broad 42-55 band (easter, winter, christmas, occupations, ocean_life, space, body_parts, zoo_animals, farm_animals, pets, emotions, colors…).

## 3. Per-type demand analysis (exercise-type axis)

Legend: **W** = winnable, **W-mid** = winnable with work / long-tail, **HARD** = strong owners, target long-tail only, **SKIP** = no real demand or dishonest fit. "Verbatim" = exact harvest suggestion. Decks = pt published.

| axis-key | BR demand formulation (verbatim evidence) | Decks | Verdict | Notes |
|---|---|---|---|---|
| wordsearch | "caça-palavras para imprimir" · "caça-palavras para imprimir infantil" · "caça-palavras grátis" · "caça-palavras 1o ano" | 51 | HARD head / **W-mid** infantil | Geniol + Racha Cuca + Toda Matéria own the head. Own "infantil"+grade tail. |
| crossword | "palavras cruzadas para imprimir" · "palavras cruzadas para imprimir infantil" · "cruzadinha" synonym · "palavras cruzadas 2o ano" | 47 | **W-mid** | Head owned by Coquetel/Geniol (adult). Infantil face = craft blogs only. |
| sudoku | "sudoku ilustrado" (exact product match) · SERP "sudoku infantil para imprimir" | 150 | **W** | SERP is Spanish-site dominated (edufichas, abcfichas) — real BR gap. |
| cryptogram | "criptograma para imprimir" · "criptograma infantil para imprimir" · "criptograma para imprimir grátis" | 100 | **W** | SERP Spanish-dominated + adult Coquetel. Infantil face open. |
| addition | "adição para imprimir" · "atividade adição para imprimir" · "adição educação infantil" · "continhas" register | 200 | **W-mid** | "atividades de adição 1º ano" head is HARD (Toda Matéria/TSA) and hub-adjacent; own "continhas de adição para imprimir" + educação-infantil face. |
| subtraction | "subtração para imprimir" · "atividade subtração para imprimir" · "subtração educação infantil" · "contas subtração para imprimir" | 199 | **W-mid** | Same shape as addition; "subtração simples para imprimir" open. |
| more-less | "atividades mais ou menos" · "atividades mais ou menos educação infantil" | 150 | **W (proven)** | `/pt/topic/mais-ou-menos` ALREADY ranks in the live SERP sample. Keep + strengthen. |
| big-small | "grande ou pequeno atividade" · "atividades grande ou pequeno" · "grande ou pequeno educação infantil" | 144 | **W** | No strong owner; head noise is a children's book. |
| math-puzzle | "quebra-cabeça matemático para imprimir" · "quebra cabeça matemático 1 ano" · "quebra cabeça matemático online" | 148 | **W** | Weak SERP (focoemalfabetizar, Pinterest, Scribd). |
| math-worksheet | "atividades de matematica pre escolar" · "atividade de matemática para imprimir pré 2" | 151 | **W-mid, hub-caution** | "atividade de matemática <grade>" belongs to the subject hubs. Key this page to the pré-escola/contas face only. |
| code-addition | (nothing real: "adição código bncc") | 147 | **SKIP-key** | Product-coined. Keep page, ride "atividade adição para imprimir" secondary face; no dedicated demand. |
| pattern-train | "atividade sequência de padrões" · "atividades padrões e sequências" · "padrões matemáticos no pré escolar" | 251 | **W** | "Sequências e padrões" is the teacher formulation; low competition. |
| pattern-worksheet | "atividade de padrões" · "atividade padrões 1 ano" | 50 | **W-mid** | Differentiate from pattern-train on the printable-drill face. |
| patterns | "ficha de atividade padrões e regularidades" | 17 | W-low | BNCC term "padrões e regularidades"; thin substrate. |
| bingo | "bingo para imprimir infantil" · "bingo para imprimir educação infantil" · "bingo de palavras" · "bingo das letras" · "atividades bingo de numeros" | 80 | **W-mid** | Cartelas intent; many blogs but no authority. Letters/numbers sub-faces strong. |
| matching | "pareamento" · "atividades pareamento para imprimir" · "pareamento educação infantil" · "atividades pareamento autismo" | 94 | **W** | Big genuine niche; TEA/autismo audience is a real secondary face (Toda Matéria targets it). |
| grid-match | "jogo pareamento para imprimir" | 50 | W-low | Coined name; ride the pareamento cluster. |
| shadow-match | "pareamento de sombras" · "pareamento de sombras para imprimir" · "…animais / frutas / educação infantil / pdf" | 134 | **W (high value)** | Dedicated harvest cluster; SERP = Pinterest + PAID products (jatapronto, educamarket). Free wins. |
| picture-sort | "ordenar imagens" (thin) | 123 | W-low | Real face is "classificar"; keep honest, low priority. |
| alphabet-train | "trem do alfabeto" · "trem do alfabeto para imprimir" · "atividade trem do alfabeto" | 62 | **W** | Exact-match product name with real demand ("trenzinho das letras" variant); only espacoprofessor owns it. |
| prepositions | "preposições para imprimir" (mostly 4º-7º ano + English intent) | 101 | HARD/W-low | K-3 face is "noções de posição" (unharvested). Keep modest. |
| word-guess | "adivinhe a palavra jogo" (online/Wordle intent) | 95 | HARD | Term-Wordle SERP. Target "jogo de adivinhar palavras" long-tail only. |
| word-scramble | "letras embaralhadas" · "letras embaralhadas para formar palavras" · "…para imprimir" | 94 | **W** | Weak SERP (anagram solvers, one paid shop, Pinterest). |
| find-objects | "encontre os objetos escondidos" · "…para imprimir" · "…educação infantil" | 98 | **W** | SERP = Pinterest/Etsy/Scribd/HP — no real owner. |
| find-and-count | "encontre e conte" · "atividade encontre e conte" | 88 | **W (niche)** | Exact match exists; near-zero competition. |
| odd-one-out | SERP: "qual é o intruso" / "encontre o intruso" / "ache o intruso" | 131 | **W** | BR term is *intruso*, NOT "qual é diferente". SERP = paid products (Pandagógico, Hotmart) + educlub. Free wins. Re-key H1. |
| treasure-hunt | "caça ao tesouro para imprimir" · "…grátis / pdf / infantil / pistas" | 100 | **W-mid, honesty-gated** | BR intent = clue/pista hunts; our decks are treasure MAZES. Copy must say tabuleiro/labirinto do tesouro — never promise "pistas". |
| picture-path | "atividades para imprimir labirinto" | 93 | **W** | Key to **labirinto** — the real BR term for this mechanic; "caminho ilustrado" is coined. |
| missing-pieces | "peças faltantes" (LEGO noise) | 97 | W-low | Re-key face to "complete a figura / o que está faltando". |
| counting-pictures | "atividade de contar figuras" · "atividades para imprimir numeros e quantidades" | 27 | **W (niche)** | "Números e quantidades" is the BNCC-flavored face teachers type. |
| counting-frames | "quadro de dez" (thin; harvest deflects to dezena/unidade) | 9 | SKIP-key | Thin decks + thin demand. |
| tally-counting | "marcas de contagem" (retail noise) | 4 | **SKIP** | No demand, 4 decks. |
| number-charts | "quadro numérico" · "…para imprimir" · "…para completar até 100" · "…de 0 a 100" | 34 | **W** | Strong dedicated cluster; blogs + shops only. "para completar" matches our fill-in decks exactly. |
| comparing-numbers | "comparar números naturais" (BNCC phrasing, school-task intent) | 6 | W-low | "maior ou menor" face; thin substrate. |
| comparing-groups | "comparar grupos" (SPSS noise) | 8 | SKIP-key | Ride more-less. |
| comparing-sizes | "comparar tamanhos" (TV/pneus noise) | 15 | SKIP-key | Demand owned by grande-pequeno. |
| number-lines | "reta numérica" · "…para imprimir" · "…educação infantil / 1 ano / 2 ano" | 9 | **W demand, thin decks** | Strong cluster, weak substrate — **deck-production flag**. |
| base-ten | "valor posicional atividades" · "…2 ano / 3 ano" · "quadro valor posicional para imprimir" | 12 | **W-mid demand, thin decks** | 2º/3º-ano demand strong (gov PDFs + TSA in SERP) — **deck-production flag**. |
| telling-time | "atividades para aprender ver as horas" · SERP head "atividades de relógio para imprimir" | 81 | **W-mid** | Key to **relógio/horas** — "ver as horas" alone is numerology noise (11:11). |
| fractions | "frações atividades para imprimir" · "frações 2o ano" · "frações atividades 3 ano" | 68 | **W-mid** | Demand center is 4º-6º ano; own the 2º/3º-ano fringe honestly. |
| graphing-data | "graficos de dados" (academic noise) | 28 | W-low | Face: "gráficos e tabelas atividades". |
| arrays-multiplication | "multiplicação para imprimir" · "multiplicação 2o ano" · "multiplicação para imprimir 3 ano" | 31 | **W-mid** | NOTE: "tabuada …para imprimir" is the giant adjacent head but our decks are arrays/repeated addition, NOT tabuada charts — do not claim tabuada. |
| geometry | "geometria atividades 1 ano / 2 ano" ("formas geométricas" head belongs to the shapes THEME page) | 37 | **W-mid** | Split: geometry type = "geometria <ano>"; shapes theme = "formas geométricas educação infantil". |
| measurement | "atividades medidas de comprimento" · "medidas atividades 1 ano / 2 ano" | 35 | **W-mid** | "medidas" bare is mattress-size noise; always qualify. |
| visual-logic | "atividades de raciocinio logico para educação infantil para imprimir" | 14 | **W (re-keyed)** | "lógica visual" is programming noise; the real term is **raciocínio lógico**. |
| visual-discrimination | "discriminação visual atividades de atenção e concentração para imprimir" · "…educação infantil" | 15 | **W (niche)** | Psychopedagogy/TEA audience; exact long queries in harvest. |
| visual-matching | "jogos de associação visual" (thin) | 5 | SKIP-key | Ride pareamento. |
| position-words | "palavras de posição" (thin) | 8 | W-low | Real face "noções de posição / em cima e embaixo" — unharvested; verify at build. |
| sorting-categories | (definition-lookup noise) | 4 | **SKIP** | — |
| picture-arithmetic | "adição ilustrada educação infantil" · "subtração ilustrada" · continhas register | 14 | **W (niche)** | "Continhas ilustradas" is the natural face; 1º-ano level fills the adição-1º-ano demand our addition decks (pré-escola) can't honestly claim. |
| science-sort | "ciencias educação infantil atividades" · "atividades ciencias educação infantil para imprimir" · "atividades animais vertebrados e invertebrados" | 90 | **W-mid, hub-caution** | Check whether a pt ciências subject-hub exists before keying; the vertebrados/invertebrados face is deck-honest. |
| science-match | (none distinct) | 10 | SKIP-key | — |
| science-sequence | — | 1 | **SKIP** | — |
| beginning-sounds | "sons iniciais das palavras" · "atividade sons iniciais" · "bingo dos sons iniciais para imprimir" | 10 | **W (niche)** | Alfabetização audience; thin substrate but exact demand. |
| letter-knowledge | "atividades para imprimir letras do alfabeto" · "atividades de educação infantil alfabeto" | 20 | **W-mid** | Sits inside the huge alfabetização cluster; differentiate from alphabet-train. |
| word-building | "montagem de palavras" · "…com silabas" · "…para alfabetização" · "junte as silabas" | 10 | **W (niche)** | Sílabas demand is real ("atividades de alfabetização silabas simples/complexas"). |
| picture-vocabulary | "vocabulario figuras" (thin) | 10 | W-low | — |
| phonological-awareness | "consciência fonológica atividades" · "…para imprimir / pdf / educação infantil" | 25 | **W-mid** | Strong pedagogy owners (apostilas, NeuroSaber) on the head; educação-infantil tail open. High-authority topic — worth the fight. |

## 4. Level pages (educational-level axis)

| axis-key (pt slug) | Demand (verbatim) | Decks | Verdict |
|---|---|---|---|
| preschool `educacao-infantil-creche-3-5-anos` | "atividades educativas para criança de 3 anos" · "atividades para imprimir criança de 3 anos" | ~444 | **W** — age-qualified face ("3 a 5 anos") avoids colliding with kindergarten's educação-infantil head |
| kindergarten `educacao-infantil-pre-escola-5-7-anos` | "atividades para imprimir educação infantil" · "exercicios para imprimir pré escola" · "atividades de pré escola para imprimir" | ~2,790 | **W-mid** — biggest head; strong owners but we have the deepest substrate. Own it as the cross-subject level page (subject hubs own "matemática/português educação infantil"). |
| grade-1 `1-ano-fundamental` | "atividades para imprimir 1 ano" | ~560 | **W-mid** — bare-grade cross-subject face (hubs own subject×grade) |
| grade-2 `2-ano-fundamental` | "atividades para imprimir 2 ano" · "exercicios para imprimir 2 ano" | ~168 | **W-mid** — thin substrate |
| grade-3 `3-ano-fundamental` | "atividades para imprimir 3 ano" | ~134 | **W-mid** — thin substrate; demand actually strongest of the grades in the core seed |

## 5. Theme pages (theme axis, top demand-backed)

Formulation is uniformly **"atividades (de/com) <tema> educação infantil"** with para-imprimir tails. Verbatim evidence exists for: animais (grades 1-4 + educação infantil!), natal, páscoa, dinossauros (alfabetização + para imprimir), partes do corpo (1º/2º ano), formas geométricas (huge), emoções, profissões, frutas (mostly inglês-vocab intent — still fine), cores, primavera, inverno, verão, animais da fazenda (maternal/berçário skew), animais de estimação, animais do zoológico, brinquedos e brincadeiras, flores, vegetais, vida marinha, árvores, clima. SERP sample (animais, formas geométricas, meios de transporte): heads owned by Toda Matéria/Tudo Sala de Aula/Via Carreira → theme pages are **W-mid**, winning on breadth (a theme page aggregating 50-150 decks across mechanics is a stronger answer than a 10-image blog post).

Notable: **vehicles must be keyed "meios de transporte"** (SERP-verified; "veículos" is not the teacher term). **shapes theme owns "formas geométricas"** (geometry type page keys to "geometria <ano>" to avoid self-cannibalization). Zero-demand themes to leave template-titled: 4th_of_july (197 decks, US-only demand), accessories, bakery, post_office, at_the_supermarket, kitchen_tools, hospital, breakfast, camping (tourism/scout noise), beach (tourism), tools, furniture, accessories, miscellaneous, birds_2, thanksgivinng (minor real demand "dia de ação de graças atividades escolares" — optional).

## 6. SERP sampling (19 queries, 2026-07-06)

| # | Query | Verdict | Evidence |
|---|---|---|---|
| 1 | caça-palavras para imprimir infantil | HARD head, W-mid tail | Geniol, Racha Cuca, Toda Matéria, escolaeducacao + generators |
| 2 | pareamento de sombras para imprimir educação infantil | **W** | Pinterest boards + paid shops (jatapronto, educamarket) — no free authority |
| 3 | sudoku infantil para imprimir | **W** | SERP dominated by SPANISH sites (edufichas, abcfichas, proferecursos) + Scribd — BR gap |
| 4 | quadro numérico para imprimir até 100 | **W** | alfabetize.com, focoemalfabetizar, paid shops; "para completar" angle open |
| 5 | continhas de adição para imprimir 1 ano | HARD | Toda Matéria, TSA, viacarreira, educador — strong; own pré-escola/continhas face |
| 6 | letras embaralhadas para formar palavras | **W** | Anagram solvers + one paid shop + Pinterest — weak |
| 7 | atividades mais ou menos educação infantil | **W (proven)** | **lessoncraftstudio.com/pt/topic/mais-ou-menos already in SERP** |
| 8 | encontre os objetos escondidos para imprimir | **W** | Pinterest/Etsy/Scribd/HP — no owner |
| 9 | atividades ver as horas / relógio para imprimir | W-mid | TSA, ensinoja, atividadesescolares, reab.me — mid blogs |
| 10 | palavras cruzadas infantil para imprimir | W-mid | Craft blogs (revistaartesanato, artesanatoecia) — no pedagogy authority |
| 11 | criptograma infantil para imprimir | **W** | Spanish sites + Pinterest — BR infantil gap |
| 12 | atividades valor posicional 2 ano | W-mid | TSA + gov PDFs + paid; only 12 decks (production flag) |
| 13 | caça ao tesouro infantil para imprimir grátis | W-mid | Blogs with pista-PDFs — intent partially mismatched with our maze decks |
| 14 | bingo de letras para imprimir alfabetização | W-mid | Many small blogs; cartelas intent |
| 15 | consciência fonológica atividades para imprimir pdf | HARD-mid | Toda Matéria, apostila PDFs, NeuroSaber — pedagogy authority needed |
| 16 | reta numérica para imprimir educação infantil | **W** | Twinkl + Pinterest + shops; only 9 decks (production flag) |
| 17 | atividades de pareamento para imprimir | **W** | mestredosaber, viacarreira, TSA (autismo angle) — beatable |
| 18 | quebra-cabeça matemático para imprimir 1 ano | **W** | Acessaber, focoemalfabetizar, Pinterest — weak |
| 19a | qual é o intruso atividade educação infantil | **W** | Paid products (Pandagógico, Hotmart, etieneprof) + educlub — free wins |
| 19b | atividades formas geométricas educação infantil | HARD head, W-mid | Toda Matéria, soloinfantil, TSA — breadth play |
| 19c | atividades meios de transporte educação infantil | W-mid | educador, tudoeduca, TSA — mid |
| 19d | trem do alfabeto atividade para imprimir | **W** | espacoprofessor ("trenzinho das letras") + alfabetoslindos only |
| 19e | atividades de animais educação infantil | HARD head, W-mid | Toda Matéria, TSA, viacarreira — breadth play |

## 7. Intersection candidates (type × grade)

Inclusion bar: ≥12 pt decks at the (type, level) coordinate + a grade-qualified query distinct from the single-axis primary. pt catalog is mostly single-level-per-type, so most intersections re-face the same decks under the grade-qualified query (distinct query face = legitimate per §22.1 conditional-ship doctrine). **27 included** in `demand-terms-pt.json`; excluded candidates listed with reasons.

**Included** (key = alphabetically-sorted axis-keys): addition__kindergarten ("adição educação infantil", 200) · kindergarten__subtraction ("subtração educação infantil", 199) · grade-1__math-puzzle ("quebra cabeça matemático 1 ano", 148) · kindergarten__pattern-train ("padrões matemáticos no pré escolar", 251) · kindergarten__matching ("pareamento educação infantil", 94) · kindergarten__shadow-match ("pareamento de sombras educação infantil", 134) · kindergarten__odd-one-out ("atividade ache o intruso para educação infantil", 131) · bingo__kindergarten ("bingo educação infantil para imprimir", 80) · find-objects__kindergarten ("encontre os objetos escondidos educação infantil", 98) · grade-1__wordsearch ("caça-palavras 1o ano", 51) · crossword__grade-2 ("palavras cruzadas 2o ano", 47) · fractions__grade-2 ("frações 2o ano", 34) · fractions__grade-3 ("frações atividades 3 ano", 34) · geometry__grade-2 ("geometria 2o ano", 17) · geometry__grade-3 ("geometria atividades 3 ano", 14) · arrays-multiplication__grade-2 ("multiplicação 2o ano", 14) · arrays-multiplication__grade-3 ("multiplicação para imprimir 3 ano", 13) · grade-1__measurement ("medidas atividades 1 ano", 12) · grade-1__science-sort ("atividades ciencias anos iniciais", 30) · kindergarten__phonological-awareness ("consciência fonológica educação infantil atividades", 25) · grade-1__picture-arithmetic ("adição 1o ano atividades", 14) · big-small__preschool ("grande ou pequeno educação infantil", 144) · more-less__preschool ("atividades mais ou menos educação infantil", 150) · grade-1__pattern-worksheet ("atividade padrões 1 ano", 50) · grade-1__treasure-hunt ("caça ao tesouro infantil para imprimir", 100) · kindergarten__visual-discrimination ("discriminação visual educação infantil", 15) · kindergarten__letter-knowledge ("atividades de educação infantil alfabeto", 20).

**Excluded (with reason):**
- math-worksheet×kindergarten "atividade de matemática educação infantil para imprimir" — **subject-hub ownership risk** (pt hubs own matemática×grade); do not build until reconciled with the live hub set.
- treasure-hunt×kindergarten "caça ao tesouro educação infantil para imprimir" — decks sit at 6-8 (1º ano); level-dishonest.
- wordsearch×grade-2 "caça-palavras 2o ano" / crossword×grade-1 "palavras cruzadas 1o ano" — 0 decks at that level (demand exists — **deck-production flag**).
- base-ten×grade-2 "valor posicional 2o ano" — 8 decks < 12 (**production flag**, demand verified).
- number-lines×grade-1/2 "reta numérica 1o/2o ano" — 5/1 decks (**production flag**).
- number-charts×kindergarten "quadro numérico educação infantil" — 8 decks < 12.
- sudoku/cryptogram/alphabet-train/picture-path × their level — grade-qualified query not distinct from the single-axis primary (single page owns both faces).
- telling-time×grade — no verbatim grade-qualified query; single-axis owns "relógio/horas".
- caça-palavras×educação-infantil "caça palavras educação infantil para imprimir" — 0 decks at 3-5/5-7; level-dishonest (production flag: easy K-vocab wordsearch would capture real demand).

## 8. Title pattern (locked for pt)

`[termo de demanda verbatim] – [qualificador honesto] ([nível])` — lead with the demand term, ≤51 chars ideal / 65 max, **º ordinals** ("1º ano", never "1 ano" in titles), BR register only (atividades — never fichas; educação infantil; pré-escola; anos iniciais for teacher-register pages).

Honest qualifiers: **para imprimir** ✓ (every deck has a PDF) · **grátis** ✓ · **PDF** ✓ · **online/interativo** ✓ only for the 29 interactive app types (worksheet-gen families — counting-pictures, number-charts, telling-time, fractions, geometry, measurement, base-ten, number-lines, science-*, beginning-sounds, letter-knowledge, word-building, picture-vocabulary, phonological-awareness, patterns, position-words, visual-*, sorting-categories, picture-arithmetic, comparing-*, tally/frames, graphing, arrays — are **printable-only**: never claim online/interativo there) · **com gabarito** ✓ only for interactive app types (printable-only families ship no answer key) · **tabuada** ✗ (we have none) · **pistas** ✗ on treasure-hunt (maze decks, not clue hunts).

Meta descriptions: 120-170 chars, unique per page, content-specific (mechanic + what the child does + the honest offer), never a swapped-noun template.

## 9. Priorities

**P0 (win now — demand ✓, substrate ✓, weak SERP):** shadow-match, sudoku, cryptogram-infantil, math-puzzle, word-scramble, find-objects, odd-one-out (re-key to *intruso*), matching/pareamento, alphabet-train, big-small, more-less (already ranking — strengthen), number-charts, picture-path (re-key to *labirinto*), pattern-train.
**P1 (strong demand, work the tail):** addition/subtraction (continhas face), bingo, crossword-infantil, wordsearch-infantil + grade-1 intersection, telling-time (relógio face), phonological-awareness, science-sort, visual-discrimination, visual-logic (raciocínio lógico face), the 5 level pages, top-12 theme pages.
**P2:** fractions/geometry/multiplication grade intersections, measurement, counting-pictures, beginning-sounds, word-building, letter-knowledge, picture-arithmetic (continhas ilustradas).
**Deck-production flags (demand verified, substrate missing):** reta numérica (9), valor posicional (12, 2º-ano demand), caça-palavras/cruzadinha for educação infantil (0 at K), wordsearch 2º ano (0), **tracing/pontilhado** ("alfabeto pontilhado", "números pontilhados", "vogais pontilhadas" — writing apps are PDF-only; same fork as de Schwungübungen/es grafomotricidad), **tabuada** charts, **festa junina** theme (recurrent in harvest: caça palavras junino, bingo junino — no theme exists), **jogo dos 7 erros** (spot-the-difference mechanic we don't have).
**Dead weight:** 4th_of_july (197 decks, zero BR demand).
