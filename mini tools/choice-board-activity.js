/* =====================================================================
   CHOICE BOARD — ACTIVITY   (choice-board-activity.js)
   ---------------------------------------------------------------------
   Task-driven variant of choice-board. Reuses choice-board-core.js for
   the DOM/paint/state. Task source depends on the URL:

   • ?activity=<id>   → fetches choice-board-activities.json, finds the
                         row, instantiates tasks from the row's
                         task_template + params.
   • no ?activity     → falls back to a static demo set so the
                         /mini-tools/choice-board-activity.html direct-
                         load shows the same kind of board.

   First task_template: 'shape-id' — Tap the {shape}.
   ===================================================================== */

/* Localized chrome strings for activity tasks. Per-locale templates use
   {shape} interpolation; the activity-task-builder injects the localized
   shape label at build time.

   Tier-3+4 (sv/da/no/fi) NSR-flagged per CLAUDE.md §17.5.1; review
   recommended on native speakers but acceptable for ship. */
var ACTIVITY_STRINGS = {
  promptTapShape: {
    en: 'Tap the {shape}',
    de: 'Tippe auf das {shape}',
    fr: 'Touche le {shape}',
    it: 'Tocca il {shape}',
    es: 'Toca el {shape}',
    pt: 'Toque no {shape}',
    nl: 'Tik op het {shape}',
    sv: 'Tryck på {shape}',
    da: 'Tryk på {shape}',
    no: 'Trykk på {shape}',
    fi: 'Napauta {shape}'
  },
  /* E9 RF.K.3.c — Read common high-frequency words by sight. The target word
     is SPOKEN (wrapper-driven LCSAudio); the prompt is generic so the displayed
     text does NOT reveal the target (genuine reading, not a string-match). No fi
     (transparent orthography → no sight-word tradition; excluded per native evidence). */
  promptReadSight: {
    en: 'Tap the word you hear.',
    de: 'Tippe auf das Wort, das du hörst.',
    fr: 'Touche le mot que tu entends.',
    it: 'Tocca la parola che senti.',
    es: 'Toca la palabra que escuchas.',
    pt: 'Toque na palavra que você ouve.',
    nl: 'Tik op het woord dat je hoort.',
    sv: 'Tryck på ordet du hör.',
    da: 'Tryk på ordet, du hører.',
    no: 'Trykk på ordet du hører.'
  },
  /* E9 #2 RF.K.3.c — Tell the Words Apart (near-word discrimination). Same
     hear→tap mechanic; the prompt cues careful listening because the distractors
     are minimal-pair near-twins of the target. */
  promptTellApart: {
    en: 'Listen carefully. Tap the word you hear.',
    de: 'Hör genau hin. Tippe auf das Wort, das du hörst.',
    fr: 'Écoute bien. Touche le mot que tu entends.',
    it: 'Ascolta bene. Tocca la parola che senti.',
    es: 'Escucha con atención. Toca la palabra que escuchas.',
    pt: 'Ouça com atenção. Toque na palavra que você ouve.',
    nl: 'Luister goed. Tik op het woord dat je hoort.',
    sv: 'Lyssna noga. Tryck på ordet du hör.',
    da: 'Lyt godt efter. Tryk på ordet, du hører.',
    no: 'Lytt godt. Trykk på ordet du hører.'
  },
  /* Batch 1 K.G.B.4 — Count the sides */
  promptCountSides: {
    en: 'How many sides does this shape have?',
    de: 'Wie viele Seiten hat diese Form?',
    fr: 'Combien de côtés a cette forme ?',
    it: 'Quanti lati ha questa forma?',
    es: '¿Cuántos lados tiene esta forma?',
    pt: 'Quantos lados tem esta forma?',
    nl: 'Hoeveel zijden heeft deze vorm?',
    sv: 'Hur många sidor har formen?',
    da: 'Hvor mange sider har formen?',
    no: 'Hvor mange sider har formen?',
    fi: 'Kuinka monta sivua tällä muodolla on?'
  },
  /* Batch 1 K.CC.C.7 — Which number is bigger */
  promptPickBigger: {
    en: 'Which number is bigger?',
    de: 'Welche Zahl ist größer?',
    fr: 'Quel nombre est plus grand ?',
    it: 'Quale numero è più grande?',
    es: '¿Qué número es mayor?',
    pt: 'Qual número é maior?',
    nl: 'Welk getal is groter?',
    sv: 'Vilket tal är större?',
    da: 'Hvilket tal er størst?',
    no: 'Hvilket tall er størst?',
    fi: 'Kumpi luku on suurempi?'
  },
  /* Batch 3 K.CC.C.7 — Which number is smaller (mirror of pick-bigger) */
  promptPickSmaller: {
    en: 'Which number is smaller?',
    de: 'Welche Zahl ist kleiner?',
    fr: 'Quel nombre est plus petit ?',
    it: 'Quale numero è più piccolo?',
    es: '¿Qué número es menor?',
    pt: 'Qual número é menor?',
    nl: 'Welk getal is kleiner?',
    sv: 'Vilket tal är mindre?',
    da: 'Hvilket tal er mindst?',
    no: 'Hvilket tall er minst?',
    fi: 'Kumpi luku on pienempi?'
  },
  /* Batch 3 K.CC.B.5 — How many are there (count + match the numeral) */
  promptMatchNumberToGroup: {
    en: 'How many are there?',
    de: 'Wie viele sind es?',
    fr: 'Combien y en a-t-il ?',
    it: 'Quanti ce ne sono?',
    es: '¿Cuántos hay?',
    pt: 'Quantos há?',
    nl: 'Hoeveel zijn er?',
    sv: 'Hur många finns det?',
    da: 'Hvor mange er der?',
    no: 'Hvor mange er det?',
    fi: 'Montako niitä on?'
  },
  /* Batch 2 K.CC.C.6 — Which group has more */
  promptWhichMore: {
    en: 'Which group has more?',
    de: 'Welche Gruppe hat mehr?',
    fr: 'Quel groupe en a plus ?',
    it: 'Quale gruppo ne ha di più?',
    es: '¿Qué grupo tiene más?',
    pt: 'Qual grupo tem mais?',
    nl: 'Welke groep heeft er meer?',
    sv: 'Vilken grupp har fler?',
    da: 'Hvilken gruppe har flest?',
    no: 'Hvilken gruppe har flest?',
    fi: 'Kummalla ryhmällä on enemmän?'
  },
  /* Batch 2 2.OA.C.3 — Even or odd */
  promptEvenOrOdd: {
    en: 'Is this number even or odd?',
    de: 'Ist diese Zahl gerade oder ungerade?',
    fr: 'Ce nombre est-il pair ou impair ?',
    it: 'Questo numero è pari o dispari?',
    es: '¿Este número es par o impar?',
    pt: 'Este número é par ou ímpar?',
    nl: 'Is dit getal even of oneven?',
    sv: 'Är talet jämnt eller udda?',
    da: 'Er tallet lige eller ulige?',
    no: 'Er tallet partall eller oddetall?',
    fi: 'Onko luku parillinen vai pariton?'
  },
  /* 1.NBT.B.3 — compare two two-digit numbers. The 3 option tiles are the
     full comparison statements ("47 < 52" / "47 = 52" / "47 > 52", universal
     numerals+symbols); this prompt asks which is true. EN now; 10 non-EN folded
     by the native ensemble (§A.13.48). */
  promptCompareTrue: {"en":"Which one is true?","de":"Welche Aussage stimmt?","es":"¿Cuál es la verdadera?","it":"Quale è vero?","pt":"Qual está correto?","fr":"Laquelle est vraie ?","nl":"Welke is waar?","sv":"Vilken stämmer?","da":"Hvilken er rigtig?","no":"Hvilken er riktig?","fi":"Mikä näistä on totta?"},
  /* 1.NBT.C.5 — mentally find 10 more / 10 less than a two-digit number (the
     number is the subject; the prompt names the ±10 operation). Two variants
     selected by round.op. EN authoritative; the 10 non-EN are authored by the
     native ensemble (§A.13.48). Universal numerals → only the prompt is
     localized. No-competition lock (no race/timer/score framing). */
  promptTenMore: {"en":"What is 10 more?","de":"Was ist 10 mehr?","es":"¿Cuánto es 10 más?","it":"Quanto fa 10 in più?","pt":"Quanto é 10 a mais?","fr":"Combien font 10 de plus ?","nl":"Hoeveel is 10 meer?","sv":"Vad är 10 mer?","da":"Hvad er 10 mere?","no":"Hva er 10 mer?","fi":"Paljonko on 10 enemmän?"},
  promptTenLess: {"en":"What is 10 less?","de":"Was ist 10 weniger?","es":"¿Cuánto es 10 menos?","it":"Quanto fa 10 in meno?","pt":"Quanto é 10 a menos?","fr":"Combien font 10 de moins ?","nl":"Hoeveel is 10 minder?","sv":"Vad är 10 mindre?","da":"Hvad er 10 mindre?","no":"Hva er 10 mindre?","fi":"Paljonko on 10 vähemmän?"},
  /* 2.MD.A.1 — read the length (cm) of a to-scale object off a code-drawn
     centimeter ruler. Unit = cm in EVERY locale (operator ruling). The number
     tiles are bare universal numerals; the unit lives in this prompt. EN
     authoritative; the 10 non-EN authored by the native ensemble (§A.13.48). */
  promptHowManyCm: {"en":"How many centimeters long?","de":"Wie viele Zentimeter lang?","es":"¿Cuántos centímetros mide?","it":"Quanti centimetri è lungo?","pt":"Quantos centímetros tem?","fr":"Combien de centimètres ?","nl":"Hoeveel centimeter lang?","sv":"Hur många centimeter lång?","da":"Hvor mange centimeter lang?","no":"Hvor mange centimeter lang?","fi":"Kuinka monta senttimetriä?"},
  /* RF.K.1.d — match upper/lowercase letters. Shown one letter (subject), the
     child taps its OTHER-CASE match. promptFindSmall = the answer is lowercase
     ("tap the small letter"); promptFindBig = the answer is uppercase. The
     wrapper picks by the answer's case. Per-locale native alphabets (incl.
     diacritics) ride in params.byLocale.<loc>.rounds, NOT a shared A–Z. */
  promptFindSmall: {"en":"Tap the small letter","de":"Tippe auf den kleinen Buchstaben","es":"Toca la letra minúscula","it":"Tocca la lettera minuscola","pt":"Toque na letra minúscula","fr":"Touche la petite lettre","nl":"Tik op de kleine letter","sv":"Tryck på den lilla bokstaven","da":"Tryk på det lille bogstav","no":"Trykk på den lille bokstaven","fi":"Napauta pientä kirjainta"},
  promptFindBig: {"en":"Tap the big letter","de":"Tippe auf den großen Buchstaben","es":"Toca la letra mayúscula","it":"Tocca la lettera maiuscola","pt":"Toque na letra maiúscula","fr":"Touche la grande lettre","nl":"Tik op de grote letter","sv":"Tryck på den stora bokstaven","da":"Tryk på det store bogstav","no":"Trykk på den store bokstaven","fi":"Napauta isoa kirjainta"},
  /* RF.K.3.a — beginning sound. A consonant LETTER is the subject; the child
     taps the PICTURE whose locale-word starts with that letter's primary sound.
     Per-locale picture↔sound pairings (native-owned) ride in
     params.byLocale.<loc>.rounds. NO audio — the letter is the visual stimulus. */
  promptStartsWith: {"en":"Which picture starts with this sound?","de":"Welches Bild beginnt mit diesem Laut?","es":"¿Qué imagen empieza con este sonido?","it":"Quale immagine inizia con questo suono?","pt":"Qual imagem começa com este som?","fr":"Quelle image commence par ce son ?","nl":"Welke afbeelding begint met deze klank?","sv":"Vilken bild börjar med detta ljud?","da":"Hvilket billede begynder med denne lyd?","no":"Hvilket bilde begynner med denne lyden?","fi":"Mikä kuva alkaa tällä äänteellä?"},
  /* RF.K.3 — read a whole printed CVC word + tap its picture (decode-to-meaning).
     EN-only (the cvc/decode exception); slug.en-only → 404 non-EN. The 10 non-EN
     entries are EN fallbacks that never route. */
  promptReadWord: {"en":"Read the word. Tap the picture that matches it.","de":"Lies das Wort. Tippe das Bild, das dazu passt.","es":"Read the word. Tap the picture that matches it.","it":"Read the word. Tap the picture that matches it.","pt":"Read the word. Tap the picture that matches it.","fr":"Read the word. Tap the picture that matches it.","nl":"Read the word. Tap the picture that matches it.","sv":"Read the word. Tap the picture that matches it.","da":"Read the word. Tap the picture that matches it.","no":"Read the word. Tap the picture that matches it.","fi":"Read the word. Tap the picture that matches it."},
  /* RF.K.2.c — blend onset + rime (REDUCED FAN: en/nl/da native-confirmed; de/no/sv
     excluded their language uses syllable not onset-rime). The onset is shown as a
     letter-chunk + the rime is SPOKEN (TTS-safe syllable; isolated-onset TTS is
     unreliable) → the child blends → taps the picture; a same-rime distractor makes
     the onset load-bearing. Only the fan locales have a string; excluded locales never
     load this template (404 by design). */
  promptBlend: {"en":"Blend the parts. Which picture do they make?","de":"Schleif den Anlaut und den Rest zusammen. Welches Bild ist es?","nl":"Plak de delen aan elkaar. Welk plaatje is het?","da":"Sæt forlyd og resten af ordet sammen. Hvilket billede passer?"},
  /* Batch 2 K.G.A.3 — Flat or solid (2D vs 3D) */
  promptFlatOrSolid: {
    en: 'Is this shape flat or solid?',
    de: 'Ist diese Form flach oder ein Körper?',
    fr: 'Cette forme est-elle plate ou solide ?',
    it: 'Questa forma è piatta o solida?',
    es: '¿Esta forma es plana o sólida?',
    pt: 'Esta forma é plana ou sólida?',
    nl: 'Is deze vorm plat of een lichaam?',
    sv: 'Är formen platt eller solid?',
    da: 'Er formen flad eller rumlig?',
    no: 'Er formen flat eller solid?',
    fi: 'Onko muoto litteä vai kappale?'
  },
  /* Even/Odd tile labels */
  labelEven: {
    en: 'Even', de: 'Gerade', fr: 'Pair', it: 'Pari', es: 'Par', pt: 'Par',
    nl: 'Even', sv: 'Jämnt', da: 'Lige', no: 'Partall', fi: 'Parillinen'
  },
  labelOdd: {
    en: 'Odd', de: 'Ungerade', fr: 'Impair', it: 'Dispari', es: 'Impar', pt: 'Ímpar',
    nl: 'Oneven', sv: 'Udda', da: 'Ulige', no: 'Oddetall', fi: 'Pariton'
  },
  /* Flat/Solid tile labels */
  labelFlat: {
    en: 'Flat', de: 'Flach', fr: 'Plate', it: 'Piatta', es: 'Plana', pt: 'Plana',
    nl: 'Plat', sv: 'Platt', da: 'Flad', no: 'Flat', fi: 'Litteä'
  },
  labelSolid: {
    en: 'Solid', de: 'Körper', fr: 'Solide', it: 'Solida', es: 'Sólida', pt: 'Sólida',
    nl: 'Lichaam', sv: 'Solid', da: 'Rumlig', no: 'Solid', fi: 'Kappale'
  },
  /* Batch 4 K.MD.A.2 — Comparing length (taller / longer / shorter).
     Direct attribute comparison of the SAME object at two sizes; no
     counting. Nordic (sv/da/no/fi) NSR-flagged per §17.5.1. EN-only
     ships now; the 11-locale dict keeps the engine fan-out-ready. */
  promptTapTaller: {
    en: 'Tap the taller one',
    de: 'Tippe auf das höhere',
    fr: 'Touche l\'image la plus grande',
    it: 'Tocca l\'immagine più alta',
    es: 'Toca la imagen más alta',
    pt: 'Toque na imagem mais alta',
    nl: 'Tik op het hoogste plaatje',
    sv: 'Tryck på den högre bilden',
    da: 'Tryk på det højere billede',
    no: 'Trykk på det høyere bildet',
    fi: 'Napauta korkeampaa'
  },
  promptTapLonger: {
    en: 'Tap the longer one',
    de: 'Tippe auf das längere',
    fr: 'Touche l\'image la plus longue',
    it: 'Tocca l\'immagine più lunga',
    es: 'Toca la imagen más larga',
    pt: 'Toque na imagem mais comprida',
    nl: 'Tik op het langste plaatje',
    sv: 'Tryck på den längre bilden',
    da: 'Tryk på det længere billede',
    no: 'Trykk på det lengre bildet',
    fi: 'Napauta pidempää'
  },
  promptTapShorter: {
    en: 'Tap the shorter one',
    de: 'Tippe auf das kürzere',
    fr: 'Touche l\'image la plus courte',
    it: 'Tocca l\'immagine più corta',
    es: 'Toca la imagen más corta',
    pt: 'Toque na imagem mais curta',
    nl: 'Tik op het kortste plaatje',
    sv: 'Tryck på den kortare bilden',
    da: 'Tryk på det kortere billede',
    no: 'Trykk på det kortere bildet',
    fi: 'Napauta lyhyempää'
  },
  /* Size adjectives used only for per-tile aria-labels (bigger/smaller
     + raw noun key), mirroring which-more's "5 cat" label pattern.
     Never rendered on screen — the size relationship is the content. */
  labelBigger: {
    en: 'bigger', de: 'größer', fr: 'plus grand', it: 'più grande', es: 'más grande', pt: 'maior',
    nl: 'groter', sv: 'större', da: 'større', no: 'større', fi: 'isompi'
  },
  labelSmaller: {
    en: 'smaller', de: 'kleiner', fr: 'plus petit', it: 'più piccolo', es: 'más pequeño', pt: 'menor',
    nl: 'kleiner', sv: 'mindre', da: 'mindre', no: 'mindre', fi: 'pienempi'
  },
  /* Activity 10 K.MD.B.3 — Sort and Count. The kid sees a MIXED set of
     objects (≥2 categories, interleaved), the prompt names ONE category,
     and they tap how many objects belong to it. Classify-then-count —
     structurally distinct from how-many-group (K.CC.B.5, homogeneous set)
     and which-more (K.CC.C.6, magnitude compare).

     PER-CATEGORY FULL prompt strings (not a {category} template) so every
     locale is grammatically perfect — fi partitive-singular, fr elision,
     es/pt gendered interrogative — per §A.13.54 (author-correct, don't
     inflect fragilely). The sort-count branch picks promptCount<Category>
     by the round's target. Locales are added one per fan-out commit; an
     unpopulated locale has no published slug yet, so the EN fallback never
     reaches a live non-EN page. */
  promptCountAnimals: {
    en: 'How many animals?',
    de: 'Wie viele Tiere?',
    fr: 'Combien d\'animaux ?',
    es: '¿Cuántos animales?',
    it: 'Quanti animali?',
    pt: 'Quantos animais?',
    nl: 'Hoeveel dieren?',
    sv: 'Hur många djur?',
    da: 'Hvor mange dyr?',
    no: 'Hvor mange dyr?',
    fi: 'Kuinka monta eläintä?'
  },
  promptCountFruits: {
    en: 'How many fruits?',
    de: 'Wie viele Früchte?',
    fr: 'Combien de fruits ?',
    es: '¿Cuántas frutas?',
    it: 'Quanti frutti?',
    pt: 'Quantas frutas?',
    nl: 'Hoeveel vruchten?',
    sv: 'Hur många frukter?',
    da: 'Hvor mange frugter?',
    no: 'Hvor mange frukter?',
    fi: 'Kuinka monta hedelmää?'
  },
  promptCountVehicles: {
    en: 'How many vehicles?',
    de: 'Wie viele Fahrzeuge?',
    fr: 'Combien de véhicules ?',
    es: '¿Cuántos vehículos?',
    it: 'Quanti veicoli?',
    pt: 'Quantos veículos?',
    nl: 'Hoeveel voertuigen?',
    sv: 'Hur många fordon?',
    da: 'Hvor mange køretøjer?',
    no: 'Hvor mange kjøretøy?',
    fi: 'Kuinka monta kulkuneuvoa?'
  },
  /* Neutral noun for the mixed-set's group aria-label ("6 objects") so the
     screen-reader summary never leaks per-category counts (the answer).
     fi uses partitive-singular "esinettä" (reads correctly after a count). */
  labelObjects: {
    en: 'objects', de: 'Dinge', fr: 'images', it: 'oggetti', es: 'objetos', pt: 'objetos',
    nl: 'voorwerpen', sv: 'bilder', da: 'billeder', no: 'bilder', fi: 'esinettä'
  },
  /* Activity 11 K.MD.A.1 — Describe Measurable Attributes. Show ONE object;
     the kid taps the measurement-attribute WORD (long / tall / heavy =
     length / height / weight) that describes it. Curated single-salient
     objects only (pencil→long, giraffe→tall, rock→heavy) so exactly one
     tile is defensible — describing a measurable attribute of a SINGLE
     object, structurally distinct from compare-length (K.MD.A.2, compares
     two instances) and sort-count (K.MD.B.3, classify-then-count).

     EN-only ships now. i18n.t() resolves entry[locale] || entry.en, so the
     non-EN locales fall back to the EN string until the native-ensemble
     fan-out (§A.13.56) authors them; no non-EN slug is published yet, so
     that EN fallback never reaches a live non-EN page. */
  promptDescribeAttribute: {
    en: 'Which word describes the {noun}?',
    fi: 'Millainen {noun} on?',
    de: 'Wie ist {noun}?',
    fr: 'Comment est l\'objet ?',
    es: '¿Cómo es esto?',
    it: 'Com\'è questo?',
    nl: 'Hoe is {noun}?',
    pt: 'Como é isto?',
    sv: 'Hur är {noun}?',
    da: 'Hvordan er det her?',
    no: 'Hvordan er dette?'
  },
  labelLong:  { en: 'Long',  fi: 'Pitkä',   de: 'Lang',   fr: 'Long',  es: 'Largo',  it: 'Lungo',   nl: 'Lang',  pt: 'Comprido', sv: 'Lång', da: 'Langt', no: 'Langt' },
  labelTall:  { en: 'Tall',  fi: 'Korkea',  de: 'Hoch',   fr: 'Haut',  es: 'Alto',   it: 'Alto',    nl: 'Hoog',  pt: 'Alto',     sv: 'Hög',  da: 'Højt',  no: 'Høyt'  },
  labelHeavy: { en: 'Heavy', fi: 'Painava', de: 'Schwer', fr: 'Lourd', es: 'Pesado', it: 'Pesante', nl: 'Zwaar', pt: 'Pesado',   sv: 'Tung', da: 'Tungt', no: 'Tungt' },
  /* E14 Activity 1.G.A.3 — Equal Halves and Fourths (Geometry). Show 4
     same-shape tiles; the kid taps the one split into equal halves/fourths.
     TWO FULL prompt strings (promptTapHalves / promptTapFourths) — NOT a
     {fraction}-interpolation template: the FI native ensemble flushed that the
     fraction-noun-in-a-case-slot is the §A.13.56 fixed-token trap (FI divides
     "into N equal PARTS / N yhtä suureen osaan", count differs per fraction).
     Per-fraction full strings are author-correct for every locale. The task
     branch selects the key by round.fraction (no promptArgs). Honestly scoped
     to the IDENTIFY/recognize facet (the kid recognizes; does not partition).
     EN + FI authoritative; the other 9 locales are authored at their fan-out
     turn (they fall back to EN, unpublished so never rendered). */
  promptTapHalves: {
    en: 'Tap the shape split into equal halves',
    fi: 'Napauta muotoa, joka on jaettu kahteen yhtä suureen osaan',
    de: 'Tippe auf die Form, die in zwei gleiche Teile geteilt ist',
    fr: 'Touche la forme partagée en deux parts égales',
    es: 'Toca la forma dividida en dos partes iguales',
    it: 'Tocca la forma divisa in due parti uguali',
    pt: 'Toque na forma dividida em duas partes iguais',
    nl: 'Tik op de vorm die in twee gelijke delen verdeeld is',
    sv: 'Tryck på formen som är delad i två lika stora delar',
    da: 'Tryk på formen, der er delt i to lige store dele',
    no: 'Trykk på formen som er delt i to like store deler'
  },
  promptTapFourths: {
    en: 'Tap the shape split into equal fourths',
    fi: 'Napauta muotoa, joka on jaettu neljään yhtä suureen osaan',
    de: 'Tippe auf die Form, die in vier gleiche Teile geteilt ist',
    fr: 'Touche la forme partagée en quatre parts égales',
    es: 'Toca la forma dividida en cuatro partes iguales',
    it: 'Tocca la forma divisa in quattro parti uguali',
    pt: 'Toque na forma dividida em quatro partes iguais',
    nl: 'Tik op de vorm die in vier gelijke delen verdeeld is',
    sv: 'Tryck på formen som är delad i fyra lika stora delar',
    da: 'Tryk på formen, der er delt i fire lige store dele',
    no: 'Trykk på formen som er delt i fire like store deler'
  },
  /* E14 #2 (2.G.A.3, non-congruence clause) — anchor-and-match prompts. The
     anchor figure shows "this shape"; the kid taps the tile that is ALSO split
     into the same number of equal parts (correct = a DIFFERENT-looking equal
     partition → centers "equal shares need not have the same shape"). Passive
     "is split" (state of the shape), recognition verb "Tap" — NEVER "partition"
     by the child (recognition clause only; active-partition is a future #3).
     Per-count full strings (no {n}-interpolation) per §A.13.56. EN ships now;
     the other 10 locales authored at the #2 fan-out turn (fall back to EN,
     unpublished so never rendered). */
  promptTapMatchHalves: {
    en: 'This shape is split into 2 equal parts. Tap another shape that is also split into 2 equal parts.',
    fi: 'Tämä muoto on jaettu kahteen yhtä suureen osaan. Napauta toista muotoa, joka on myös jaettu kahteen yhtä suureen osaan.',
    de: 'Diese Form ist in zwei gleiche Teile geteilt. Tippe auf eine andere Form, die auch in zwei gleiche Teile geteilt ist.',
    fr: 'Cette forme est partagée en deux parts égales. Touche une autre forme qui est aussi partagée en deux parts égales.',
    es: 'Esta forma está dividida en dos partes iguales. Toca otra forma que también está dividida en dos partes iguales.',
    it: 'Questa forma è divisa in due parti uguali. Tocca un\'altra forma che è anche divisa in due parti uguali.',
    pt: 'Esta forma está dividida em duas partes iguais. Toque em outra forma que também está dividida em duas partes iguais.',
    nl: 'Deze vorm is in twee gelijke delen verdeeld. Tik op een andere vorm die ook in twee gelijke delen verdeeld is.',
    sv: 'Den här formen är delad i två lika stora delar. Tryck på en annan form som också är delad i två lika stora delar.',
    da: 'Denne form er delt i to lige store dele. Tryk på en anden form, der også er delt i to lige store dele.',
    no: 'Denne formen er delt i to like store deler. Trykk på en annen form som også er delt i to like store deler.'
  },
  promptTapMatchThirds: {
    en: 'This shape is split into 3 equal parts. Tap another shape that is also split into 3 equal parts.',
    fi: 'Tämä muoto on jaettu kolmeen yhtä suureen osaan. Napauta toista muotoa, joka on myös jaettu kolmeen yhtä suureen osaan.',
    de: 'Diese Form ist in drei gleiche Teile geteilt. Tippe auf eine andere Form, die auch in drei gleiche Teile geteilt ist.',
    fr: 'Cette forme est partagée en trois parts égales. Touche une autre forme qui est aussi partagée en trois parts égales.',
    es: 'Esta forma está dividida en tres partes iguales. Toca otra forma que también está dividida en tres partes iguales.',
    it: 'Questa forma è divisa in tre parti uguali. Tocca un\'altra forma che è anche divisa in tre parti uguali.',
    pt: 'Esta forma está dividida em três partes iguais. Toque em outra forma que também está dividida em três partes iguais.',
    nl: 'Deze vorm is in drie gelijke delen verdeeld. Tik op een andere vorm die ook in drie gelijke delen verdeeld is.',
    sv: 'Den här formen är delad i tre lika stora delar. Tryck på en annan form som också är delad i tre lika stora delar.',
    da: 'Denne form er delt i tre lige store dele. Tryk på en anden form, der også er delt i tre lige store dele.',
    no: 'Denne formen er delt i tre like store deler. Trykk på en annen form som også er delt i tre like store deler.'
  },
  promptTapMatchFourths: {
    en: 'This shape is split into 4 equal parts. Tap another shape that is also split into 4 equal parts.',
    fi: 'Tämä muoto on jaettu neljään yhtä suureen osaan. Napauta toista muotoa, joka on myös jaettu neljään yhtä suureen osaan.',
    de: 'Diese Form ist in vier gleiche Teile geteilt. Tippe auf eine andere Form, die auch in vier gleiche Teile geteilt ist.',
    fr: 'Cette forme est partagée en quatre parts égales. Touche une autre forme qui est aussi partagée en quatre parts égales.',
    es: 'Esta forma está dividida en cuatro partes iguales. Toca otra forma que también está dividida en cuatro partes iguales.',
    it: 'Questa forma è divisa in quattro parti uguali. Tocca un\'altra forma che è anche divisa in quattro parti uguali.',
    pt: 'Esta forma está dividida em quatro partes iguais. Toque em outra forma que também está dividida em quatro partes iguais.',
    nl: 'Deze vorm is in vier gelijke delen verdeeld. Tik op een andere vorm die ook in vier gelijke delen verdeeld is.',
    sv: 'Den här formen är delad i fyra lika stora delar. Tryck på en annan form som också är delad i fyra lika stora delar.',
    da: 'Denne form er delt i fire lige store dele. Tryk på en anden form, der også er delt i fire lige store dele.',
    no: 'Denne formen er delt i fire like store deler. Trykk på en annen form som også er delt i fire like store deler.'
  },
  /* Batch (workflow pilot) K.CC.A.2 — What number comes next.
     {n} = the given number; the kid taps n+1. Native per-locale authoring
     (one native-linguist agent per language); sv/da/no/fi NSR-flagged. */
  promptNextNumber: {
    en: 'What number comes after {n}?',
    de: 'Welche Zahl kommt nach {n}?',
    fr: 'Quel nombre vient juste après {n} ?',
    it: 'Quale numero viene dopo il {n}?',
    es: '¿Qué número viene después del {n}?',
    pt: 'Qual número vem depois do {n}?',
    nl: 'Welk getal komt na {n}? Tik erop!',
    sv: 'Vilket tal kommer efter {n}? Tryck på det!',
    da: 'Hvilket tal kommer efter {n}? Tryk på det.',
    no: 'Hvilket tall kommer etter {n}? Trykk på det!',
    fi: 'Mikä luku tulee luvun {n} jälkeen? Napauta oikeaa lukua.'
  },
  hintPickOne: {
    en: 'Pick one of the shapes first',
    de: 'Wähle zuerst eine Form aus',
    fr: 'Choisis d\'abord une forme',
    it: 'Scegli prima una forma',
    es: 'Elige primero una forma',
    pt: 'Escolhe primeiro uma forma',
    nl: 'Kies eerst een vorm',
    sv: 'Välj först en form',
    da: 'Vælg først en form',
    no: 'Velg først en form',
    fi: 'Valitse ensin muoto'
  },
  hintTryAgain: {
    en: 'Try a different shape',
    de: 'Versuche eine andere Form',
    fr: 'Essaie une autre forme',
    it: 'Prova un\'altra forma',
    es: 'Prueba otra forma',
    pt: 'Tenta outra forma',
    nl: 'Probeer een andere vorm',
    sv: 'Försök en annan form',
    da: 'Prøv en anden form',
    no: 'Prøv en annen form',
    fi: 'Kokeile toista muotoa'
  },
  /* read-cvc-word (Erstlesen) — reading-appropriate hints (the generic
     hintPickOne/hintTryAgain say „shape"; wrong for a word-reading task). */
  hintPickPicture: {
    en: 'Pick a picture first.',
    de: 'Tippe zuerst ein Bild an.'
  },
  hintReadWhole: {
    en: 'Read the whole word again — letter by letter. Which picture fits?',
    de: 'Lies das ganze Wort noch einmal – Buchstabe für Buchstabe. Welches Bild passt?'
  },
  /* onset-rime-blend (Lautsynthese) — blend-appropriate wrong-answer hint */
  hintBlend: {
    en: 'Blend the first sound with the rest — which word do they make?',
    de: 'Schleif den ersten Laut und den Reim ganz langsam zusammen – welches Wort entsteht?'
  }
};

/* Shape labels per locale — interpolated into promptTapShape via {shape}.
   Singular-form locales use whichever grammatical form fits the prompt
   template's article (the template uses neuter/masculine forms; some
   locales need an article rebuild for full grammatical correctness,
   tracked as NSR-flag for Nordic + fi). */
var SHAPE_LABELS = {
  circle: {
    en:'circle',de:'Kreis',fr:'cercle',it:'cerchio',es:'círculo',pt:'círculo',nl:'cirkel',sv:'cirkeln',da:'cirklen',no:'sirkelen',fi:'ympyrää'
  },
  square: {
    en:'square',de:'Quadrat',fr:'carré',it:'quadrato',es:'cuadrado',pt:'quadrado',nl:'vierkant',sv:'kvadraten',da:'kvadratet',no:'kvadratet',fi:'neliötä'
  },
  triangle: {
    en:'triangle',de:'Dreieck',fr:'triangle',it:'triangolo',es:'triángulo',pt:'triângulo',nl:'driehoek',sv:'triangeln',da:'trekanten',no:'trekanten',fi:'kolmiota'
  },
  rectangle: {
    en:'rectangle',de:'Rechteck',fr:'rectangle',it:'rettangolo',es:'rectángulo',pt:'retângulo',nl:'rechthoek',sv:'rektangeln',da:'rektanglet',no:'rektangelet',fi:'suorakulmiota'
  },
  hexagon: {
    en:'hexagon',de:'Sechseck',fr:'hexagone',it:'esagono',es:'hexágono',pt:'hexágono',nl:'zeshoek',sv:'sexhörningen',da:'sekskanten',no:'sekskanten',fi:'kuusikulmiota'
  },
  oval: {
    en:'oval',de:'Oval',fr:'ovale',it:'ovale',es:'óvalo',pt:'oval',nl:'ovaal',sv:'ovalen',da:'ovalen',no:'ovalen',fi:'soikiota'
  },
  star: {
    en:'star',de:'Stern',fr:'étoile',it:'stella',es:'estrella',pt:'estrela',nl:'ster',sv:'stjärnan',da:'stjernen',no:'stjernen',fi:'tähteä'
  },
  diamond: {
    en:'diamond',de:'Raute',fr:'losange',it:'rombo',es:'rombo',pt:'losango',nl:'ruit',sv:'romben',da:'rumben',no:'rombe',fi:'vinoneliötä'
  },
  heart: {
    en:'heart',de:'Herz',fr:'cœur',it:'cuore',es:'corazón',pt:'coração',nl:'hart',sv:'hjärtat',da:'hjertet',no:'hjertet',fi:'sydäntä'
  },
  pentagon: {
    en:'pentagon',de:'Fünfeck',fr:'pentagone',it:'pentagono',es:'pentágono',pt:'pentágono',nl:'vijfhoek',sv:'femhörningen',da:'femkanten',no:'femkanten',fi:'viisikulmiota'
  },
  /* 3D shapes — used as flat-solid subject ARIA labels. Not interpolated
     into promptTapShape (that template is 2D-only). */
  cube: {
    en:'cube',de:'Würfel',fr:'cube',it:'cubo',es:'cubo',pt:'cubo',nl:'kubus',sv:'kub',da:'terning',no:'terning',fi:'kuutio'
  },
  sphere: {
    en:'sphere',de:'Kugel',fr:'sphère',it:'sfera',es:'esfera',pt:'esfera',nl:'bol',sv:'sfär',da:'kugle',no:'kule',fi:'pallo'
  },
  cylinder: {
    en:'cylinder',de:'Zylinder',fr:'cylindre',it:'cilindro',es:'cilindro',pt:'cilindro',nl:'cilinder',sv:'cylinder',da:'cylinder',no:'sylinder',fi:'lieriö'
  },
  cone: {
    en:'cone',de:'Kegel',fr:'cône',it:'cono',es:'cono',pt:'cone',nl:'kegel',sv:'kon',da:'kegle',no:'kjegle',fi:'kartio'
  },
  pyramid: {
    en:'pyramid',de:'Pyramide',fr:'pyramide',it:'piramide',es:'pirámide',pt:'pirâmide',nl:'piramide',sv:'pyramid',da:'pyramide',no:'pyramide',fi:'pyramidi'
  }
};

/* Build the strings dict the core+shell consume. Flat keys per shape
   so the i18n helper can look up shapeLabel_<key>. */
var FLATTENED_SHAPE_LABELS = {};
Object.keys(SHAPE_LABELS).forEach(function (key) {
  FLATTENED_SHAPE_LABELS['shapeLabel_' + key] = SHAPE_LABELS[key];
});

/* Activity 11 K.MD.A.1 — display nouns interpolated into
   promptDescribeAttribute via {noun}. The image path uses the vocab KEY
   (round.noun); these are the human display labels, looked up as
   nounLabel_<key> exactly like FLATTENED_SHAPE_LABELS above. EN authored
   now; non-EN fall back to EN via i18n.t() until the native-ensemble
   fan-out localizes them from image-vocabulary.js + the article/plural
   system. */
var NOUN_LABELS = {
  pencil:     { en: 'pencil',     fi: 'lyijykynä',     de: 'der Bleistift',     fr: 'le crayon',            es: 'el lápiz',     it: 'la matita',          nl: 'het potlood',   pt: 'o lápis',        sv: 'pennan',     da: 'en blyant',     no: 'en blyant' },
  ruler:      { en: 'ruler',      fi: 'viivain',       de: 'das Lineal',        fr: 'la règle',             es: 'la regla',     it: 'il righello',        nl: 'de liniaal',    pt: 'a régua',        sv: 'linjalen',   da: 'en lineal',     no: 'en linjal' },
  carrot:     { en: 'carrot',     fi: 'porkkana',      de: 'die Karotte',       fr: 'la carotte',           es: 'la zanahoria', it: 'la carota',          nl: 'de wortel',     pt: 'a cenoura',      sv: 'moroten',    da: 'en gulerod',    no: 'en gulrot' },
  giraffe:    { en: 'giraffe',    fi: 'kirahvi',       de: 'die Giraffe',       fr: 'la girafe',            es: 'la jirafa',    it: 'la giraffa',         nl: 'de giraf',      pt: 'a girafa',       sv: 'giraffen',   da: 'en giraf',      no: 'en sjiraff' },
  pine:       { en: 'pine tree' },
  lighthouse: { en: 'lighthouse' },
  rock:       { en: 'rock',       fi: 'kivi',          de: 'der Stein',         fr: 'une pierre',           es: 'la piedra',    it: 'il sasso',           nl: 'de steen',      pt: 'a pedra',        sv: 'stenen',     da: 'en sten',       no: 'en stein' },
  pumpkin:    { en: 'pumpkin',    fi: 'kurpitsa',      de: 'der Kürbis',        fr: 'la citrouille',        es: 'la calabaza',  it: 'la zucca',           nl: 'de pompoen',    pt: 'a abóbora',      sv: 'pumpan',     da: 'et græskar',    no: 'et gresskar' },
  crayon:     { en: 'crayon',     fi: 'vahaliitu',     de: 'der Wachsmalstift', fr: 'le crayon de couleur', es: 'el crayón',    it: 'il pastello a cera', nl: 'het waskrijtje', pt: 'o giz de cera',  sv: 'kritan',     da: 'et farvekridt', no: 'en fargestift' },
  marker:     { en: 'marker',     fi: 'tussi',         de: 'der Marker',        fr: 'le marqueur',          es: 'el marcador',  it: 'il pennarello',      nl: 'de stift',      pt: 'o marcador',     sv: 'tuschpennan', da: 'en tusch',     no: 'en tusj' },
  cucumber:   { en: 'cucumber',   fi: 'kurkku',        de: 'die Gurke',         fr: 'le concombre',         es: 'el pepino',    it: 'il cetriolo',        nl: 'de komkommer',  pt: 'o pepino',       sv: 'gurkan',     da: 'en agurk',      no: 'en agurk' },
  palm:       { en: 'palm tree' },
  oak:        { en: 'oak tree' },
  sunflower:  { en: 'sunflower',  fi: 'auringonkukka', de: 'die Sonnenblume',   fr: 'le tournesol',         es: 'el girasol',   it: 'il girasole',        nl: 'de zonnebloem', pt: 'o girassol',     sv: 'solrosen',   da: 'en solsikke',   no: 'en solsikke' }
};
var FLATTENED_NOUN_LABELS = {};
Object.keys(NOUN_LABELS).forEach(function (key) {
  FLATTENED_NOUN_LABELS['nounLabel_' + key] = NOUN_LABELS[key];
});

/* Static demo set used when /mini-tools/choice-board-activity.html is
   loaded directly without ?activity= (testability + sanity check). */
var STATIC_DEMO_TASKS = [
  /* Each demo task is structurally identical to the manifest-built
     tasks below — proves the engine works without manifest load. */
  {
    id: 'demo-circle',
    promptKey: 'promptTapShape',
    promptArgs: { shape: 'circle' },  /* untranslated — manifest path uses real labels */
    answerType: 'state',
    setup: function (tool) {
      var opts = ['circle', 'square', 'triangle', 'star'].map(buildOption);
      tool.setupTask(opts, 'circle');
    },
    check: function (tool) {
      var correct = tool.answer === 'circle';
      tool.showFeedback(correct);
      return correct;
    },
    hintKey: function (tool) {
      return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
    }
  }
];

function shapeImageUrl(key) {
  return '/image-library-webp/themes/shapes/' + key + '@2x.webp';
}

function buildOption(key) {
  return { key: key, imgUrl: shapeImageUrl(key), label: key };
}

/* Batch 4 K.MD.A.2 — wrapper-owned size-delta CSS for compare-length.
   The core renders both tiles' images identically (it stamps
   tile.dataset.key, but applies no per-option scale); to show the SAME
   noun at two visibly different sizes we inject our OWN scoped stylesheet
   keyed on the cl-big / cl-small option keys. This touches NEITHER
   choice-board-core.js NOR lcs-shell.css — all new visual logic lives
   here in the activity layer. The selectors are higher-specificity than
   the core's `.cb-tile-img` (and use !important defensively per §A.13.47
   rule 6), so they win regardless of inject order. Bottom-anchoring both
   images within the tile (align-items:end) + transform-origin:bottom
   seats them on a shared visual floor so "taller / longer" reads
   honestly. The cl-* keys exist only in this template and one activity
   loads per iframe, so there is zero cross-activity contamination. */
var _clCssInjected = false;
function injectCompareLengthCSS() {
  if (_clCssInjected) return;
  _clCssInjected = true;
  var css = [
    '.cb-tile[data-key^="cl-"]{align-items:end !important;}',
    '.cb-tile[data-key="cl-big"] .cb-tile-img{transform:scale(1) !important;transform-origin:bottom center;}',
    '.cb-tile[data-key="cl-small"] .cb-tile-img{transform:scale(0.5) !important;transform-origin:bottom center;}'
  ].join('\n');
  var tag = document.createElement('style');
  tag.setAttribute('data-cb-compare-length', '');
  tag.textContent = css;
  document.head.appendChild(tag);
}

/* Activity 11 K.MD.A.1 — wrapper-owned 3-word-tile layout for
   describe-attribute. The core sizes any >2-option board as cb-cols-4
   (small square tiles built for single digits / small images), which
   clips the word tiles "Long / Tall / Heavy" on narrow phones. We tag the
   board .cb-attr3 in the render() override below and style it here as a
   centered 3-up row of auto-height word tiles with a viewport-stable font
   (vw, NOT vmin, per §A.13.47 rule 1 — iframe-relative vmin would run away
   as auto-resize grows the iframe) that never overflows 280→768px. The
   .cb-board.cb-attr3-scoped selectors (specificity 0,3,0) beat the
   wrapper's .cb-cols-4 rules (0,2,0) regardless of inject order, and carry
   !important per §A.13.47 rule 6. Touches NEITHER choice-board-core.js NOR
   lcs-shell.css — all new visual logic lives in the activity layer, and the
   .cb-attr3 class exists only for this template (one activity per iframe →
   zero cross-activity contamination). */
var _daCssInjected = false;
function injectDescribeAttributeCSS() {
  if (_daCssInjected) return;
  _daCssInjected = true;
  var css = [
    '.cb-board.cb-attr3{grid-template-columns:repeat(3,1fr)!important;max-width:540px!important;gap:clamp(8px,2.2vw,16px)!important;}',
    '.cb-board.cb-attr3 .cb-tile{aspect-ratio:auto!important;width:auto!important;max-width:none!important;max-height:none!important;min-height:clamp(64px,16vw,108px)!important;padding:clamp(10px,3vw,22px) clamp(6px,2vw,12px)!important;}',
    '.cb-board.cb-attr3 .cb-tile-text{font-size:clamp(16px,5.4vw,34px)!important;white-space:nowrap!important;}'
  ].join('\n');
  var tag = document.createElement('style');
  tag.setAttribute('data-cb-describe-attr', '');
  tag.textContent = css;
  document.head.appendChild(tag);
}

/* E14 1.G.A.3 — code-drawn partition figures (Equal Halves and Fourths).
   PROFESSIONAL design system (synthesized from two senior-designer passes):
   every shape has a soft pale-teal BODY (reads as a solid object, not hollow
   line-art) + a deep-teal outline + cut lines (3.5px, round caps/joins), and
   every DIVIDED figure carries exactly ONE coral share (always the first
   reading-order share) at 0.2 opacity — because every divided tile has one
   coral share, shading never discriminates equal-vs-unequal (the kid must read
   the geometry), but it makes the tiles look designed and gives "a share"
   presence. UNEQUAL figures put the coral on the SMALLEST piece + use a bold
   ~1/3 offset so they read as deliberately unequal. The WHOLE foil (not split)
   = body + outline + a soft white inner rim, NO coral, NO cut — a premium
   finished solid, NOT an empty tile. id-free (no defs/gradients/filters) since
   4 SVGs share one page. Inset geometry (circle r40@50,50; square 10–90;
   rect x8–92 y28–72) never clips the tile's 28px radius. Injected post-render
   in the render() override; 0 lines to choice-board-core.js / lcs-shell.* /
   Direction A CSS — all visual logic lives here in the activity layer.
   Draw order per figure: body → coral share → outline → cut lines. */
var FR_T = '#146B5E', FR_BODY = '#E2F0EC', FR_SH = '#F2784B', FR_RIM = '#FFFFFF';
function _fsvg(inner) {
  return '<svg class="cb-frac" viewBox="0 0 100 100" aria-hidden="true">' + inner + '</svg>';
}
function _frLn(x1, y1, x2, y2) {
  return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 +
    '" stroke="' + FR_T + '" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>';
}
function _frShareP(d) { return '<path d="' + d + '" fill="' + FR_SH + '" opacity="0.2"/>'; }
function _frShareR(x, y, w, h) {
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="6" fill="' + FR_SH + '" opacity="0.2"/>';
}
function _circBody() { return '<circle cx="50" cy="50" r="40" fill="' + FR_BODY + '"/>'; }
function _circEdge() { return '<circle cx="50" cy="50" r="40" fill="none" stroke="' + FR_T + '" stroke-width="3.5"/>'; }
function _boxBody(x, y, w, h) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="6" fill="' + FR_BODY + '"/>'; }
function _boxEdge(x, y, w, h) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="6" fill="none" stroke="' + FR_T + '" stroke-width="3.5"/>'; }
/* rect body bounds x8..92 (w84), y28..72 (h44); square 10..90 (w80) */
var FR_RX = 8, FR_RY = 28, FR_RW = 84, FR_RH = 44, FR_RR = FR_RX + FR_RW, FR_RB = FR_RY + FR_RH;
var FR_SX = 10, FR_SW = 80, FR_SR = FR_SX + FR_SW;
var FRACTION_FIGURES = {
  /* CIRCLE (r40 @ 50,50; edge points top(50,10) bottom(50,90) left(10,50) right(90,50)) */
  'circle-halves-v':     function () { return _fsvg(_circBody() + _frShareP('M50 10 A40 40 0 0 0 50 90 Z') + _circEdge() + _frLn(50, 10, 50, 90)); },
  'circle-halves-h':     function () { return _fsvg(_circBody() + _frShareP('M10 50 A40 40 0 0 1 90 50 Z') + _circEdge() + _frLn(10, 50, 90, 50)); },
  'circle-halves-diag':  function () { return _fsvg(_circBody() + _frShareP('M21.72 78.28 A40 40 0 0 1 78.28 21.72 Z') + _circEdge() + _frLn(21.72, 78.28, 78.28, 21.72)); },
  'circle-fourths':      function () { return _fsvg(_circBody() + _frShareP('M50 50 L50 10 A40 40 0 0 0 10 50 Z') + _circEdge() + _frLn(50, 10, 50, 90) + _frLn(10, 50, 90, 50)); },
  'circle-halves-uneq':  function () { return _fsvg(_circBody() + _frShareP('M34 13.34 A40 40 0 0 0 34 86.66 Z') + _circEdge() + _frLn(34, 13.34, 34, 86.66)); }, /* off-center chord → small coral left, big right */
  'circle-fourths-uneq': function () { return _fsvg(_circBody() + _frShareP('M38 11.84 A40 40 0 0 0 11.84 38 L38 38 Z') + _circEdge() + _frLn(38, 11.84, 38, 88.16) + _frLn(11.84, 38, 88.16, 38)); }, /* off-center cross → 4 unequal */
  'circle-notsplit':     function () { return _fsvg(_circBody() + _circEdge() + '<circle cx="50" cy="50" r="33" fill="none" stroke="' + FR_RIM + '" stroke-width="3.5" opacity="0.55"/>'); }, /* WHOLE: no cut, no coral, soft inner rim */
  /* RECTANGLE (x8..92, y28..72) */
  'rect-halves-v':       function () { return _fsvg(_boxBody(FR_RX, FR_RY, FR_RW, FR_RH) + _frShareR(FR_RX, FR_RY, 42, FR_RH) + _boxEdge(FR_RX, FR_RY, FR_RW, FR_RH) + _frLn(50, FR_RY, 50, FR_RB)); },
  'rect-halves-h':       function () { return _fsvg(_boxBody(FR_RX, FR_RY, FR_RW, FR_RH) + _frShareR(FR_RX, FR_RY, FR_RW, 22) + _boxEdge(FR_RX, FR_RY, FR_RW, FR_RH) + _frLn(FR_RX, 50, FR_RR, 50)); },
  'rect-halves-diag':    function () { return _fsvg(_boxBody(FR_RX, FR_RY, FR_RW, FR_RH) + _frShareP('M13 31 L92 28 L92 72 Z') + _boxEdge(FR_RX, FR_RY, FR_RW, FR_RH) + _frLn(13, 31, 87, 69)); },  /* diag inset from the rx6 sharp corners so the line stays inside the rounded outline */
  'rect-fourths-grid':   function () { return _fsvg(_boxBody(FR_RX, FR_RY, FR_RW, FR_RH) + _frShareR(FR_RX, FR_RY, 42, 22) + _boxEdge(FR_RX, FR_RY, FR_RW, FR_RH) + _frLn(50, FR_RY, 50, FR_RB) + _frLn(FR_RX, 50, FR_RR, 50)); },
  'rect-fourths-strips': function () { return _fsvg(_boxBody(FR_RX, FR_RY, FR_RW, FR_RH) + _frShareR(FR_RX, FR_RY, 21, FR_RH) + _boxEdge(FR_RX, FR_RY, FR_RW, FR_RH) + _frLn(29, FR_RY, 29, FR_RB) + _frLn(50, FR_RY, 50, FR_RB) + _frLn(71, FR_RY, 71, FR_RB)); },
  'rect-halves-uneq':    function () { return _fsvg(_boxBody(FR_RX, FR_RY, FR_RW, FR_RH) + _frShareR(FR_RX, FR_RY, 26, FR_RH) + _boxEdge(FR_RX, FR_RY, FR_RW, FR_RH) + _frLn(34, FR_RY, 34, FR_RB)); },
  'rect-fourths-uneq':   function () { return _fsvg(_boxBody(FR_RX, FR_RY, FR_RW, FR_RH) + _frShareR(FR_RX, FR_RY, 26, 16) + _boxEdge(FR_RX, FR_RY, FR_RW, FR_RH) + _frLn(34, FR_RY, 34, FR_RB) + _frLn(FR_RX, 44, FR_RR, 44)); },
  'rect-notsplit':       function () { return _fsvg(_boxBody(FR_RX, FR_RY, FR_RW, FR_RH) + _boxEdge(FR_RX, FR_RY, FR_RW, FR_RH) + '<rect x="15" y="35" width="70" height="30" rx="4" fill="none" stroke="' + FR_RIM + '" stroke-width="3.5" opacity="0.55"/>'); },
  /* SQUARE (10..90) */
  'sq-halves-v':         function () { return _fsvg(_boxBody(FR_SX, FR_SX, FR_SW, FR_SW) + _frShareR(FR_SX, FR_SX, 40, FR_SW) + _boxEdge(FR_SX, FR_SX, FR_SW, FR_SW) + _frLn(50, FR_SX, 50, FR_SR)); },
  'sq-halves-h':         function () { return _fsvg(_boxBody(FR_SX, FR_SX, FR_SW, FR_SW) + _frShareR(FR_SX, FR_SX, FR_SW, 40) + _boxEdge(FR_SX, FR_SX, FR_SW, FR_SW) + _frLn(FR_SX, 50, FR_SR, 50)); },
  'sq-halves-diag':      function () { return _fsvg(_boxBody(FR_SX, FR_SX, FR_SW, FR_SW) + _frShareP('M15 15 L90 10 L90 90 Z') + _boxEdge(FR_SX, FR_SX, FR_SW, FR_SW) + _frLn(15, 15, 85, 85)); },  /* diag inset from the rx6 sharp corners so the line stays inside the rounded outline */
  'sq-fourths-grid':     function () { return _fsvg(_boxBody(FR_SX, FR_SX, FR_SW, FR_SW) + _frShareR(FR_SX, FR_SX, 40, 40) + _boxEdge(FR_SX, FR_SX, FR_SW, FR_SW) + _frLn(50, FR_SX, 50, FR_SR) + _frLn(FR_SX, 50, FR_SR, 50)); },
  'sq-halves-uneq':      function () { return _fsvg(_boxBody(FR_SX, FR_SX, FR_SW, FR_SW) + _frShareR(FR_SX, FR_SX, 26, FR_SW) + _boxEdge(FR_SX, FR_SX, FR_SW, FR_SW) + _frLn(36, FR_SX, 36, FR_SR)); },
  'sq-fourths-uneq':     function () { return _fsvg(_boxBody(FR_SX, FR_SX, FR_SW, FR_SW) + _frShareR(FR_SX, FR_SX, 25, 30) + _boxEdge(FR_SX, FR_SX, FR_SW, FR_SW) + _frLn(35, FR_SX, 35, FR_SR) + _frLn(FR_SX, 40, FR_SR, 40)); },
  'sq-notsplit':         function () { return _fsvg(_boxBody(FR_SX, FR_SX, FR_SW, FR_SW) + _boxEdge(FR_SX, FR_SX, FR_SW, FR_SW) + '<rect x="17" y="17" width="66" height="66" rx="4" fill="none" stroke="' + FR_RIM + '" stroke-width="3.5" opacity="0.55"/>'); },
  /* E14 #2 (2.G.A.3) additions — THIRDS (excluded from #1) + sq-fourths-strips,
     for the non-congruence anchor-and-match. Equal thirds drawn as 3 equal
     strips (v or h) → rect/square strip-thirds v-vs-h are clean equal-but-
     non-congruent thirds. thirds-uneq foils: one dominant piece reads as
     "not 3 equal" (coral on a smallest piece per the design doctrine). Same
     body/edge/share/line helpers; same draw order; 0 lines to the cores. */
  'rect-thirds-v':       function () { return _fsvg(_boxBody(FR_RX, FR_RY, FR_RW, FR_RH) + _frShareR(FR_RX, FR_RY, 28, FR_RH) + _boxEdge(FR_RX, FR_RY, FR_RW, FR_RH) + _frLn(36, FR_RY, 36, FR_RB) + _frLn(64, FR_RY, 64, FR_RB)); },
  'rect-thirds-h':       function () { return _fsvg(_boxBody(FR_RX, FR_RY, FR_RW, FR_RH) + _frShareR(FR_RX, FR_RY, FR_RW, 14.67) + _boxEdge(FR_RX, FR_RY, FR_RW, FR_RH) + _frLn(FR_RX, 42.67, FR_RR, 42.67) + _frLn(FR_RX, 57.33, FR_RR, 57.33)); },
  'rect-thirds-uneq':    function () { return _fsvg(_boxBody(FR_RX, FR_RY, FR_RW, FR_RH) + _frShareR(FR_RX, FR_RY, 16, FR_RH) + _boxEdge(FR_RX, FR_RY, FR_RW, FR_RH) + _frLn(24, FR_RY, 24, FR_RB) + _frLn(40, FR_RY, 40, FR_RB)); }, /* 16/16/52 → dominant right piece reads unequal */
  'sq-thirds-v':         function () { return _fsvg(_boxBody(FR_SX, FR_SX, FR_SW, FR_SW) + _frShareR(FR_SX, FR_SX, 26.67, FR_SW) + _boxEdge(FR_SX, FR_SX, FR_SW, FR_SW) + _frLn(36.67, FR_SX, 36.67, FR_SR) + _frLn(63.33, FR_SX, 63.33, FR_SR)); },
  'sq-thirds-h':         function () { return _fsvg(_boxBody(FR_SX, FR_SX, FR_SW, FR_SW) + _frShareR(FR_SX, FR_SX, FR_SW, 26.67) + _boxEdge(FR_SX, FR_SX, FR_SW, FR_SW) + _frLn(FR_SX, 36.67, FR_SR, 36.67) + _frLn(FR_SX, 63.33, FR_SR, 63.33)); },
  'sq-thirds-uneq':      function () { return _fsvg(_boxBody(FR_SX, FR_SX, FR_SW, FR_SW) + _frShareR(FR_SX, FR_SX, 16, FR_SW) + _boxEdge(FR_SX, FR_SX, FR_SW, FR_SW) + _frLn(26, FR_SX, 26, FR_SR) + _frLn(42, FR_SX, 42, FR_SR)); }, /* 16/16/48 → dominant right piece reads unequal */
  'sq-fourths-strips':   function () { return _fsvg(_boxBody(FR_SX, FR_SX, FR_SW, FR_SW) + _frShareR(FR_SX, FR_SX, 20, FR_SW) + _boxEdge(FR_SX, FR_SX, FR_SW, FR_SW) + _frLn(30, FR_SX, 30, FR_SR) + _frLn(50, FR_SX, 50, FR_SR) + _frLn(70, FR_SX, 70, FR_SR)); }
};
var _frCssInjected = false;
function injectFractionCSS() {
  if (_frCssInjected) return;
  _frCssInjected = true;
  var css = [
    '.cb-board.cb-frac-board{grid-template-columns:repeat(2,auto)!important;max-width:min(92vw,360px)!important;gap:clamp(8px,2.4vw,14px)!important;justify-content:center!important;}',
    /* Fold fix (2026-06-27): fixed-square tiles (not aspect-ratio of a wide
       column) so the 2×2 fraction board height tracks the tile size, not the
       container — clears the §A.13.62 desktop fold. */
    '.cb-board.cb-frac-board .cb-tile{width:clamp(92px,18vw,124px)!important;height:clamp(92px,18vw,124px)!important;max-width:none!important;max-height:none!important;aspect-ratio:auto!important;padding:clamp(7px,2vw,14px)!important;}',
    '.cb-board.cb-frac-board .cb-frac{width:100%;height:100%;display:block;pointer-events:none;user-select:none;}',
    /* E14 #2 anchor figure shown above the board (the "this shape" referent). */
    '.cb-frac-anchor{display:flex;justify-content:center;align-items:center;margin:0 auto clamp(6px,2vw,10px);width:clamp(48px,11vw,68px);height:clamp(48px,11vw,68px);}',
    '.cb-frac-anchor .cb-frac{width:100%;height:100%;display:block;pointer-events:none;user-select:none;}',
    /* Cap the (often long, multi-line) fraction prompt ONLY on fraction boards
       (:has scopes it — other choice-board activities keep the 48px hero font).
       The "...split into N equal parts. Tap another shape..." prompt wrapped to
       ~5 lines at 48px (~290px) and pushed the board off a 900-tall window. */
    '.lcs-app.activity:has(.cb-frac-board) .lcs-activity-prompt{font-size:clamp(20px,3vmin,28px)!important;}',
    '@media (max-width:599px){',
    '  .cb-board.cb-frac-board .cb-tile{width:clamp(76px,28vw,116px)!important;height:clamp(76px,28vw,116px)!important;}',
    '  .lcs-app.activity:has(.cb-frac-board) .lcs-activity-prompt{font-size:clamp(16px,4.2vw,21px)!important;}',
    '}'
  ].join('\n');
  var tag = document.createElement('style');
  tag.setAttribute('data-cb-fraction', '');
  tag.textContent = css;
  document.head.appendChild(tag);
}

/* E2-math 2.MD.A.1 read-ruler — code-drawn CENTIMETER ruler + a to-scale object.
   Same activity-layer SVG-injection pattern as FRACTION_FIGURES: drawn inline,
   injected ABOVE the board in the render() override (the _fractionAnchor
   precedent). 0 lines to choice-board-core.js / lcs-shell.* / Direction A CSS.
   ONE scale fn `_rrX(cm)` places BOTH the ruler ticks AND the object's right
   edge → the drawn object honestly spans exactly N cm (the local-test asserts
   .cb-ruler-object's right edge === the [data-tick="N"] x in real pixels).
   Each object spans x(0)..x(N): leftmost point at x(0), rightmost at x(N). */
var RR_LEFT = 14, RR_PXCM = 11, RR_MAXCM = 20, RR_YTOP = 58;
function _rrX(cm) { return RR_LEFT + cm * RR_PXCM; }
function _rulerSlab() {
  var s = '<rect x="' + (_rrX(0) - 5) + '" y="' + RR_YTOP + '" width="' + (RR_MAXCM * RR_PXCM + 10) + '" height="26" rx="3" fill="#FBF3E4" stroke="' + FR_T + '" stroke-width="2"/>';
  for (var k = 0; k <= RR_MAXCM; k++) {
    var major = (k % 5 === 0), x = _rrX(k);
    s += '<line data-tick="' + k + '" x1="' + x + '" y1="' + RR_YTOP + '" x2="' + x + '" y2="' + (RR_YTOP + (major ? 12 : 6)) + '" stroke="' + FR_T + '" stroke-width="' + (major ? 2 : 1) + '"/>';
    if (major) s += '<text x="' + x + '" y="' + (RR_YTOP + 22) + '" text-anchor="middle" font-size="7" font-family="Nunito,sans-serif" fill="' + FR_T + '">' + k + '</text>';
  }
  return s;
}
/* Each builder draws an object from x0 (left, =x(0)) to xN (right, =x(N)),
   seated just above the ruler's top edge (y≈40..56). Distinct silhouettes so
   the rounds are genuinely distinct to the child (§A.13.60), not one bar
   recoloured. Every builder's leftmost point is x0 and rightmost is xN. */
var RULER_OBJECTS = {
  pencil: function (x0, xN) {
    return '<rect x="' + x0 + '" y="40" width="' + (xN - x0 - 7) + '" height="13" rx="2" fill="#F4C84B"/>'
      + '<rect x="' + x0 + '" y="40" width="5" height="13" rx="2" fill="#F2A6B0"/>'
      + '<polygon points="' + (xN - 7) + ',40 ' + xN + ',46.5 ' + (xN - 7) + ',53" fill="#E8A33D"/>'
      + '<polygon points="' + (xN - 3) + ',44.8 ' + xN + ',46.5 ' + (xN - 3) + ',48.2" fill="#5B4636"/>';
  },
  crayon: function (x0, xN) {
    return '<rect x="' + x0 + '" y="41" width="' + (xN - x0 - 6) + '" height="11" rx="2" fill="#F2784B"/>'
      + '<rect x="' + (x0 + 2) + '" y="41" width="2.5" height="11" fill="#D85F35"/>'
      + '<polygon points="' + (xN - 6) + ',42 ' + xN + ',46.5 ' + (xN - 6) + ',51" fill="#D85F35"/>';
  },
  marker: function (x0, xN) {
    return '<rect x="' + x0 + '" y="40" width="' + (xN - x0 - 7) + '" height="13" rx="2" fill="#6B4FA3"/>'
      + '<rect x="' + (xN - 7) + '" y="41" width="7" height="11" rx="2" fill="#4A3673"/>';
  },
  ribbon: function (x0, xN) {
    return '<rect x="' + x0 + '" y="42" width="' + (xN - x0) + '" height="10" rx="5" fill="#4FA3D1"/>';
  },
  worm: function (x0, xN) {
    return '<rect x="' + x0 + '" y="43" width="' + (xN - x0) + '" height="10" rx="5" fill="#8BC34A"/>'
      + '<circle cx="' + (xN - 4) + '" cy="46.5" r="1.4" fill="#2E3B2E"/>';
  },
  stick: function (x0, xN) {
    return '<rect x="' + x0 + '" y="44" width="' + (xN - x0) + '" height="7" rx="3.5" fill="#A9743B"/>'
      + '<circle cx="' + (x0 + (xN - x0) * 0.4) + '" cy="44" r="2.2" fill="#8A5E2E"/>';
  },
  straw: function (x0, xN) {
    var w = xN - x0, s = '<rect x="' + x0 + '" y="42" width="' + w + '" height="10" rx="3" fill="#E85D75"/>';
    for (var i = 1; i <= 3; i++) { var sx = x0 + w * i / 4; s += '<rect x="' + sx + '" y="42" width="1.6" height="10" fill="#FFFFFF" opacity="0.55"/>'; }
    return s;
  },
  eraser: function (x0, xN) {
    return '<rect x="' + x0 + '" y="41" width="' + (xN - x0) + '" height="12" rx="2.5" fill="#F2A6B0"/>'
      + '<rect x="' + x0 + '" y="41" width="' + (xN - x0) + '" height="4" rx="2.5" fill="#FFFFFF" opacity="0.5"/>';
  }
};
function _readRulerSvg(n, objKey) {
  var fn = RULER_OBJECTS[objKey] || RULER_OBJECTS.ribbon;
  return '<svg class="cb-ruler" viewBox="0 0 260 90" aria-hidden="true">'
    + _rulerSlab()
    + '<g class="cb-ruler-object" data-cm="' + n + '">' + fn(_rrX(0), _rrX(n)) + '</g>'
    + '</svg>';
}
var _rrCssInjected = false;
function injectReadRulerCSS() {
  if (_rrCssInjected) return;
  _rrCssInjected = true;
  var css = [
    '.cb-ruler-figure{display:flex;justify-content:center;align-items:center;margin:0 auto clamp(8px,2.6vw,18px);width:100%;max-width:min(94vw,460px);}',
    '.cb-ruler-figure .cb-ruler{width:100%;height:auto;display:block;pointer-events:none;user-select:none;}'
  ].join('\n');
  var tag = document.createElement('style');
  tag.setAttribute('data-cb-read-ruler', '');
  tag.textContent = css;
  document.head.appendChild(tag);
}

/* Number-tile builder for count-sides + similar templates. Seeded
   deterministically on the target so all 11 locales render identical
   tile ordering. Distractors are picked from `pool` excluding target,
   then target re-added and the whole set shuffled. */
function pickNumberDistractors(pool, target, count) {
  var others = pool.filter(function (n) { return n !== target; });
  var seed = target * 31;
  function rand() {
    seed = (seed + 0x6D2B79F5) | 0;
    var t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  var picks = others.slice();
  for (var j = picks.length - 1; j > 0; j--) {
    var k = Math.floor(rand() * (j + 1));
    var tmp = picks[j]; picks[j] = picks[k]; picks[k] = tmp;
  }
  var distractors = picks.slice(0, count - 1);
  var numbers = distractors.concat([target]);
  for (var m = numbers.length - 1; m > 0; m--) {
    var n = Math.floor(rand() * (m + 1));
    var t2 = numbers[m]; numbers[m] = numbers[n]; numbers[n] = t2;
  }
  return numbers.map(function (val) {
    return { key: String(val), text: String(val) };
  });
}

/* Deterministic distractor picker. Same shape-key seed produces the same
   shuffled option order across all 11 locales so the 11 sibling URLs
   render identically (only language changes). */
function pickOptions(pool, targetKey, count) {
  var others = pool.filter(function (k) { return k !== targetKey; });
  /* Simple seeded RNG (mulberry32-lite) keyed on targetKey's char codes. */
  var seed = 0;
  for (var i = 0; i < targetKey.length; i++) seed = (seed * 31 + targetKey.charCodeAt(i)) | 0;
  function rand() {
    seed = (seed + 0x6D2B79F5) | 0;
    var t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  /* Pick (count-1) distinct distractors from `others`. */
  var picks = others.slice();
  /* Fisher-Yates partial shuffle. */
  for (var j = picks.length - 1; j > 0; j--) {
    var k = Math.floor(rand() * (j + 1));
    var tmp = picks[j]; picks[j] = picks[k]; picks[k] = tmp;
  }
  var distractors = picks.slice(0, count - 1);
  var optionsKeys = distractors.concat([targetKey]);
  /* Shuffle so target isn't always last. Second shuffle keyed on the
     same seed so still deterministic per-target. */
  for (var m = optionsKeys.length - 1; m > 0; m--) {
    var n = Math.floor(rand() * (m + 1));
    var t2 = optionsKeys[m]; optionsKeys[m] = optionsKeys[n]; optionsKeys[n] = t2;
  }
  return optionsKeys.map(buildOption);
}

/* Activity 10 K.MD.B.3 (sort-count) helpers — deterministic per round so
   every sibling locale URL renders an identical pile order + tile order
   (only the language changes), matching the determinism discipline used
   by pickOptions / pickNumberDistractors above. */
function _scRng(seed) {
  return function () {
    seed = (seed + 0x6D2B79F5) | 0;
    var t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seededShuffle(arr, seed) {
  var a = arr.slice(), rand = _scRng(seed);
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(rand() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}
/* Build 4 distinct number tiles for a sort-count round: the correct
   target-count + 3 distractors drawn (in priority order) from the
   classification traps — TOTAL (counted everything) and the OTHER-category
   counts (counted the wrong group) — then near-misses, padding from 1..9
   only if a tiny round left us short. Guarantees the total + at least one
   other-count surface so skipping classification lands on a wrong tile.
   All values clamped to 1..9 (K-friendly single-digit numerals). */
function buildSortCountTiles(correct, total, otherCounts, seed) {
  var seen = {}, vals = [];
  function add(v) {
    if (v == null) return;
    v = Math.round(v);
    if (v < 1 || v > 9 || seen[v]) return;
    seen[v] = 1; vals.push(v);
  }
  add(correct);
  add(total);
  otherCounts.slice().sort(function (a, b) { return b - a; }).forEach(add);
  add(correct + 1); add(correct - 1); add(correct + 2); add(correct - 2);
  for (var n = 1; n <= 9 && vals.length < 4; n++) add(n);
  vals = vals.slice(0, 4);
  return seededShuffle(vals, seed).map(function (v) {
    return { key: String(v), text: String(v) };
  });
}

/* E9 sight-word per-pass reshuffle (§A.13.60) — order-only Fisher–Yates, used
   ONLY by the read-sight-word template (every other choice-board skill keeps the
   shell's tasks[] per-mount shuffle, untouched). */
function _cbSameOrder(a, b) {
  if (!b || a.length !== b.length) return false;
  for (var i = 0; i < a.length; i++) { if (a[i] !== b[i]) return false; }
  return true;
}
function cbShuffledOrder(n, prev) {
  var idx = [], i, j, t;
  for (i = 0; i < n; i++) idx.push(i);
  if (n < 2) return idx;
  do {
    for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
  } while (_cbSameOrder(idx, prev));
  return idx;
}

window.ChoiceBoardActivity = Object.assign({}, ChoiceBoardCore, {
  id: 'choice-board-activity',
  strings: Object.assign({}, ChoiceBoardCore.strings, ACTIVITY_STRINGS, FLATTENED_SHAPE_LABELS, FLATTENED_NOUN_LABELS, {
    title: {en:'Choice Activity',de:'Auswahlaufgabe',fr:'Activité de choix',it:'Attività di scelta',es:'Actividad de elección',pt:'Atividade de escolha',nl:'Keuzeactiviteit',sv:'Valövning',da:'Valgøvelse',no:'Valgøvelse',fi:'Valintatehtävä'},
    instruction: {en:'Follow the prompt. Tap Check when you’re ready.',de:'Folge der Aufforderung. Tippe Prüfen, wenn du fertig bist.',fr:'Suis la consigne. Tape Vérifier quand tu es prêt.',it:'Segui l’istruzione. Tocca Verifica quando sei pronto.',es:'Sigue la indicación. Toca Comprobar cuando estés listo.',pt:'Siga a instrução. Toque em Verificar quando estiver pronto.',nl:'Volg de opdracht. Tik op Controleer als je klaar bent.',sv:'Följ uppmaningen. Tryck på Kontrollera när du är klar.',da:'Følg opgaven. Tryk på Tjek, når du er klar.',no:'Følg oppgaven. Trykk på Sjekk når du er klar.',fi:'Seuraa ohjetta. Paina Tarkista, kun olet valmis.'}
  }),

  tasks: STATIC_DEMO_TASKS,

  init: function (api) {
    ChoiceBoardCore.init.call(this, api);
    var params = (typeof window !== 'undefined' && window.location)
      ? new URLSearchParams(window.location.search) : null;
    this._activityId = params ? params.get('activity') : null;
    if (this._activityId) this._loadActivity();
  },

  _loadActivity: function () {
    var self = this;
    fetch('/mini-tools/choice-board-activities.json').then(function (r) {
      if (!r.ok) throw new Error('manifest fetch failed: ' + r.status);
      return r.json();
    }).then(function (rows) {
      var row = rows.find(function (r) { return r.id === self._activityId; });
      if (!row) return;
      self._activityRow = row;
      var built = self._buildTasksFromRow(row);
      if (row.task_template === 'read-sight-word' || row.task_template === 'compare-2digit' || row.task_template === 'ten-more-less' || row.task_template === 'read-ruler' || row.task_template === 'letter-case' || row.task_template === 'beginning-sound' || row.task_template === 'onset-rime-blend' || row.task_template === 'read-cvc-word') {
        /* per-pass reshuffle path: shell uses nextTask() when tasks is unset */
        self._pool = built; self._order = null; self._curPass = 0; self._orderForPool = null;
        self.tasks = null;
      } else {
        self.tasks = built;
      }
      if (typeof window.LCS_reloadFirstTask === 'function') {
        window.LCS_reloadFirstTask();
      }
    }).catch(function (e) {
      if (window.console && console.warn) console.warn('[choice-board-activity] manifest load failed; using fallback:', e.message);
    });
  },

  /* Per-pass reshuffle for the read-sight-word template (self._pool set + self.tasks
     null → the shell calls nextTask). Other templates set self.tasks, so the shell
     uses tasks[] and never calls this. */
  nextTask: function (opts) {
    var pool = this._pool;
    if (!pool || !pool.length) return null;
    var n = pool.length;
    var i = (opts && opts.index) || 0;
    if (!this._order || this._orderForPool !== pool || this._order.length !== n) {
      this._order = cbShuffledOrder(n, null); this._orderForPool = pool; this._curPass = 0;
    }
    var pass = Math.floor(i / n);
    if (pass > this._curPass) { this._order = cbShuffledOrder(n, this._order); this._curPass = pass; }
    return pool[this._order[i % n]];
  },

  _buildTasksFromRow: function (row) {
    var self = this;

    /* TEMPLATE: shape-id (K.G.A.2) — tap the named shape. */
    if (row.task_template === 'shape-id') {
      var pool = row.params.shapes;
      var choicesPerTask = row.params.choicesPerTask || 4;
      return pool.map(function (targetKey) {
        return {
          id: row.id + '.' + targetKey,
          promptKey: 'promptTapShape',
          promptArgs: { shape: self.api.t('shapeLabel_' + targetKey) },
          answerType: 'state',
          setup: function (tool) {
            var options = pickOptions(pool, targetKey, choicesPerTask);
            tool.setupTask(options, targetKey);
          },
          check: function (tool) {
            var correct = tool.answer === targetKey;
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: count-sides (K.G.B.4) — show a polygon, kid picks the
       number of sides from 4 number tiles. params.shapes = list of
       {key, sides} entries; we pick 4 number tiles per task (target +
       3 distractors from {3..8}). */
    if (row.task_template === 'count-sides') {
      var shapeEntries = row.params.shapes;  /* [{key:'triangle', sides:3}, ...] */
      var distractorPool = row.params.distractorPool || [3, 4, 5, 6, 7, 8];
      return shapeEntries.map(function (entry) {
        return {
          id: row.id + '.' + entry.key,
          promptKey: 'promptCountSides',
          answerType: 'state',
          setup: function (tool) {
            var numberOpts = pickNumberDistractors(distractorPool, entry.sides, 4);
            var subject = {
              type: 'image',
              imgUrl: '/image-library-webp/themes/shapes/' + entry.key + '@2x.webp',
              alt: entry.key
            };
            tool.setupTask(numberOpts, String(entry.sides), subject);
          },
          check: function (tool) {
            var correct = tool.answer === String(entry.sides);
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: next-number (K.CC.A.2) — show a number n as the subject,
       kid picks the number that comes next (n+1) from 4 number tiles.
       params.numbers = list of n values (keep n+1 within range);
       params.distractorPool default {0..10}. Activity-layer only — reuses
       the count-sides number-tile rendering; core untouched. */
    if (row.task_template === 'next-number') {
      var nextNumbers = row.params.numbers;
      var nextPool = row.params.distractorPool || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      return nextNumbers.map(function (n) {
        var answer = n + 1;
        return {
          id: row.id + '.n' + n,
          promptKey: 'promptNextNumber',
          promptArgs: { n: String(n) },
          answerType: 'state',
          setup: function (tool) {
            var numberOpts = pickNumberDistractors(nextPool, answer, 4);
            var subject = { type: 'text', text: String(n) };
            tool.setupTask(numberOpts, String(answer), subject);
          },
          check: function (tool) {
            var correct = tool.answer === String(answer);
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: pick-bigger (K.CC.C.7) — show 2 numbers, kid picks the
       bigger one. params.pairs = [[n1, n2], ...]. */
    if (row.task_template === 'pick-bigger') {
      var pairs = row.params.pairs;
      return pairs.map(function (pair, idx) {
        var a = pair[0], b = pair[1];
        var bigger = a > b ? a : b;
        return {
          id: row.id + '.' + a + '-vs-' + b,
          promptKey: 'promptPickBigger',
          answerType: 'state',
          setup: function (tool) {
            /* Deterministic left/right order — use idx-parity so half
               of the tasks have bigger on left, half on right. */
            var first = (idx % 2 === 0) ? a : b;
            var second = (idx % 2 === 0) ? b : a;
            var options = [
              { key: String(first),  text: String(first) },
              { key: String(second), text: String(second) }
            ];
            tool.setupTask(options, String(bigger), null);
          },
          check: function (tool) {
            var correct = tool.answer === String(bigger);
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: which-more (K.CC.C.6) — show 2 groups of objects, kid
       picks the group with more. params.pairs = [
         { noun: 'cat', themeDir: 'animals', counts: [3, 5] }, ...
       ]. Engine cap: counts ≤ 8 per side. */
    if (row.task_template === 'which-more') {
      var morePairs = row.params.pairs;
      return morePairs.map(function (pair, idx) {
        var imgUrl = '/image-library-webp/themes/' + pair.themeDir + '/' + pair.noun + '@2x.webp';
        var a = pair.counts[0], b = pair.counts[1];
        var more = a > b ? a : b;
        var moreKey = 'group_' + more;
        return {
          id: row.id + '.' + pair.noun + '-' + a + '-vs-' + b,
          promptKey: 'promptWhichMore',
          answerType: 'state',
          setup: function (tool) {
            /* idx-parity for deterministic left/right placement so
               bigger isn't always on the same side. */
            var first  = (idx % 2 === 0) ? a : b;
            var second = (idx % 2 === 0) ? b : a;
            var options = [
              { key: 'group_' + first,  group: { imgUrl: imgUrl, count: first  }, label: first  + ' ' + pair.noun },
              { key: 'group_' + second, group: { imgUrl: imgUrl, count: second }, label: second + ' ' + pair.noun }
            ];
            tool.setupTask(options, moreKey, null);
          },
          check: function (tool) {
            var correct = tool.answer === moreKey;
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: even-odd (2.OA.C.3) — show a numeral as subject, kid
       picks "Even" or "Odd" text tile. params.numbers = [2..9, ...]. */
    if (row.task_template === 'even-odd') {
      var numbers = row.params.numbers;
      return numbers.map(function (n) {
        var isEven = (n % 2 === 0);
        var targetKey = isEven ? 'even' : 'odd';
        return {
          id: row.id + '.n' + n,
          promptKey: 'promptEvenOrOdd',
          answerType: 'state',
          setup: function (tool) {
            var options = [
              { key: 'even', text: self.api.t('labelEven') },
              { key: 'odd',  text: self.api.t('labelOdd')  }
            ];
            var subject = { type: 'text', text: String(n) };
            tool.setupTask(options, targetKey, subject);
          },
          check: function (tool) {
            var correct = tool.answer === targetKey;
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: compare-2digit (1.NBT.B.3) — compare two TWO-DIGIT numbers
       using >, =, <. The 3 option tiles are the full comparison STATEMENTS
       ("47 < 52" / "47 = 52" / "47 > 52" — universal numerals+symbols); the
       child taps the TRUE one. EXACTLY ONE is true (no-two-correct by
       construction). Distinct from pick-bigger (tap a NUMBER, single-digit, no
       symbol/equal). params.pairs = [[a, b], ...] two-digit, mix of </=/>. */
    if (row.task_template === 'compare-2digit') {
      var cmpPairs = row.params.pairs;
      return cmpPairs.map(function (pair) {
        var a = pair[0], b = pair[1];
        var rel = (a < b) ? 'lt' : (a > b) ? 'gt' : 'eq';
        return {
          id: row.id + '.' + a + '-' + b,
          promptKey: 'promptCompareTrue',
          answerType: 'state',
          setup: function (tool) {
            var options = [
              { key: 'lt', text: a + ' < ' + b },
              { key: 'eq', text: a + ' = ' + b },
              { key: 'gt', text: a + ' > ' + b }
            ];
            tool.setupTask(options, rel, null);
          },
          check: function (tool) {
            var correct = tool.answer === rel;
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: ten-more-less (1.NBT.C.5) — given a two-digit number n (the
       text subject), mentally find 10 MORE or 10 LESS (without counting). The
       4 number tiles are the FIXED place-value offset set {n-10, n-1, n+1,
       n+10}: correct = (op==='more' ? n+10 : n-10); the foils are the genuine
       place-value traps — n±1 (ones-digit trap: "±1 not ±10"), n∓10 (wrong
       direction, = the OTHER op's answer), n∓1 (off-by-place). The four offsets
       are pairwise-distinct → EXACTLY ONE correct (no-two-correct by
       construction). Distinct from next-number (n+1, single-digit) and
       compare-2digit (pick a relation). params.rounds = [{ n, op }, ...] with
       n∈20..89 so every tile stays two-digit (10..99). */
    if (row.task_template === 'ten-more-less') {
      var tmlRounds = row.params.rounds;
      return tmlRounds.map(function (round) {
        var n = round.n, op = round.op;
        var correct = (op === 'more') ? n + 10 : n - 10;
        var vals = [n - 10, n - 1, n + 1, n + 10];
        return {
          id: row.id + '.' + op + '-' + n,
          promptKey: (op === 'more') ? 'promptTenMore' : 'promptTenLess',
          answerType: 'state',
          setup: function (tool) {
            var ordered = seededShuffle(vals, n * 31);
            var options = ordered.map(function (v) { return { key: String(v), text: String(v) }; });
            var subject = { type: 'text', text: String(n) };
            tool.setupTask(options, String(correct), subject);
          },
          check: function (tool) {
            var ok = tool.answer === String(correct);
            tool.showFeedback(ok);
            return ok;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: read-ruler (2.MD.A.1) — a to-scale object lies on a code-drawn
       CENTIMETER ruler, left end at 0; the kid reads where it ends and taps the
       length in cm. The ruler+object SVG is injected ABOVE the board in the
       render() override (the _fractionAnchor precedent; _readRulerSvg draws both
       from the SAME _rrX scale so the object honestly spans N cm). 4 bare-numeral
       tiles = the canonical-misread set {N-1, N, N+1, N+2}: correct = N; foils =
       read-one-short / counted-the-last-tick-edge / off-by-two. Pairwise-distinct
       → EXACTLY ONE correct. Unit = cm (in the prompt). params.rounds =
       [{ obj, n }, ...] with n∈3..18 (so all foils stay 1..20 on-scale). */
    if (row.task_template === 'read-ruler') {
      injectReadRulerCSS();
      var rrRounds = row.params.rounds;
      return rrRounds.map(function (round) {
        var n = round.n, objKey = round.obj;
        var vals = [n - 1, n, n + 1, n + 2];
        var svg = _readRulerSvg(n, objKey);
        var figKey = objKey + '-' + n;
        return {
          id: row.id + '.' + objKey + '-' + n,
          promptKey: 'promptHowManyCm',
          answerType: 'state',
          setup: function (tool) {
            tool._rulerFig = svg; tool._rulerFigKey = figKey;
            var seed = n * 131;
            for (var c = 0; c < objKey.length; c++) seed = (seed * 31 + objKey.charCodeAt(c)) | 0;
            var ordered = seededShuffle(vals, seed);
            var options = ordered.map(function (v) { return { key: String(v), text: String(v) }; });
            tool.setupTask(options, String(n), null);
          },
          check: function (tool) {
            var ok = tool.answer === String(n);
            tool.showFeedback(ok);
            return ok;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: letter-case (RF.K.1.d) — recognize & match upper/lowercase
       letters. A single letter is the text subject; the child taps its
       OTHER-CASE match from 4 letter tiles (answer + 3 visually-confusable
       same-case foils → EXACTLY ONE correct). Bidirectional: rounds mix
       UPPER→lower and lower→UPPER (the standard's "upper- AND lowercase"). The
       prompt (small/big) is derived from the answer's case. Per-locale native
       alphabets (incl. diacritics) ride in params.byLocale.<loc>.rounds — NEVER
       a shared A–Z (the sight-word byLocale shape; content locale via
       window.LCS.i18n.current). Each round = { prompt, answer, distractors }. */
    if (row.task_template === 'letter-case') {
      var lcLoc = (window.LCS && window.LCS.i18n && window.LCS.i18n.current) || 'en';
      var lcByLoc = (row.params && row.params.byLocale) || {};
      var lcL = lcByLoc[lcLoc] || lcByLoc.en;
      var lcRounds = (lcL && lcL.rounds) || [];
      return lcRounds.map(function (r, i) {
        var prompt = r.prompt, answer = r.answer, distractors = r.distractors || [];
        var answerIsLower = (answer === answer.toLowerCase() && answer !== answer.toUpperCase());
        return {
          id: row.id + '.r' + i + '-' + answer,
          promptKey: answerIsLower ? 'promptFindSmall' : 'promptFindBig',
          answerType: 'state',
          setup: function (tool) {
            var seed = (i + 1) * 131;
            for (var c = 0; c < answer.length; c++) seed = (seed * 31 + answer.charCodeAt(c)) | 0;
            var ordered = seededShuffle([answer].concat(distractors), seed);
            var options = ordered.map(function (g) { return { key: g, text: g }; });
            tool.setupTask(options, answer, { type: 'text', text: prompt });
          },
          check: function (tool) {
            var ok = tool.answer === answer;
            tool.showFeedback(ok);
            return ok;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: beginning-sound (RF.K.3.a) — primary consonant letter→sound. A
       consonant LETTER is the text subject; the child taps the PICTURE whose
       locale-word starts with that letter's primary sound. 4 image tiles =
       correct + 3 distractors whose words do NOT share the onset → EXACTLY ONE
       correct. Per-locale native picture↔sound pairings in
       params.byLocale.<loc>.rounds; content locale via window.LCS.i18n.current.
       NO audio (letter is the visual stimulus). 0-core (shape-id image-option +
       even-odd text-subject precedents). Each round = { letter, correct:{noun,
       themeDir, word}, distractors:[{noun,themeDir,word}×3] }. */
    if (row.task_template === 'beginning-sound') {
      var bsLoc = (window.LCS && window.LCS.i18n && window.LCS.i18n.current) || 'en';
      var bsByLoc = (row.params && row.params.byLocale) || {};
      var bsL = bsByLoc[bsLoc] || bsByLoc.en;
      var bsRounds = (bsL && bsL.rounds) || [];
      function _bsTile(o) {
        return { key: o.noun, imgUrl: '/image-library-webp/themes/' + o.themeDir + '/' + o.noun + '@2x.webp', label: o.word };
      }
      return bsRounds.map(function (r, i) {
        var letter = r.letter, correct = r.correct, distractors = r.distractors || [];
        return {
          id: row.id + '.r' + i + '-' + letter + '-' + correct.noun,
          promptKey: 'promptStartsWith',
          answerType: 'state',
          setup: function (tool) {
            var seed = (i + 1) * 131;
            for (var c = 0; c < correct.noun.length; c++) seed = (seed * 31 + correct.noun.charCodeAt(c)) | 0;
            var ordered = seededShuffle([correct].concat(distractors), seed);
            var options = ordered.map(_bsTile);
            tool.setupTask(options, correct.noun, { type: 'text', text: letter });
          },
          check: function (tool) {
            var ok = tool.answer === correct.noun;
            tool.showFeedback(ok);
            return ok;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: read-cvc-word (RF.K.3, EN-only) — whole-word DECODE-to-meaning. A
       printed CVC word is the text subject; the child reads/decodes it and taps
       the PICTURE it names (1-of-4 image tiles). Distinct from beginning-sound
       (initial-phoneme→picture), read-sight-word (heard word→word tile, no
       decode), and cvc-build (encode): here the artifact is a 3-letter printed
       word + the skill is full grapheme-phoneme decode. ≥1 distractor word SHARES
       THE FIRST TWO LETTERS (onset+vowel) but differs in the full word, so a child
       reading only the onset cannot disambiguate → decoding the whole word (incl.
       the final phoneme) is load-bearing. EXACTLY ONE correct (subject word ===
       correct word; every option is a distinct noun). NO audio. 0-core (the
       beginning-sound image-option + text-subject precedent). Each round =
       { word, correct:{noun,themeDir}, distractors:[{noun,themeDir}×3] }. */
    if (row.task_template === 'read-cvc-word') {
      /* per-locale content (de fan-out via roundsL10n; EN falls back to rounds).
         content locale via window.LCS.i18n.current, like onset-rime-blend. */
      var rwLoc = (window.LCS && window.LCS.i18n && window.LCS.i18n.current) || 'en';
      var rwRounds = (row.params && ((row.params.roundsL10n && row.params.roundsL10n[rwLoc]) || row.params.rounds)) || [];
      function _rwTile(o) {
        return { key: o.noun, imgUrl: '/image-library-webp/themes/' + o.themeDir + '/' + o.noun + '@2x.webp', label: o.word || o.noun };
      }
      return rwRounds.map(function (r, i) {
        var word = r.word, correct = r.correct, distractors = r.distractors || [];
        return {
          id: row.id + '.r' + i + '-' + word,
          promptKey: 'promptReadWord',
          answerType: 'state',
          setup: function (tool) {
            var seed = (i + 1) * 137;
            for (var c = 0; c < word.length; c++) seed = (seed * 31 + word.charCodeAt(c)) | 0;
            var ordered = seededShuffle([correct].concat(distractors), seed);
            var options = ordered.map(_rwTile);
            tool.setupTask(options, correct.noun, { type: 'text', text: word });
          },
          check: function (tool) {
            var ok = tool.answer === correct.noun;
            tool.showFeedback(ok);
            return ok;
          },
          hintKey: function (tool) {
            /* reading-appropriate hints (not the generic „shape" ones) */
            return tool.answer == null ? 'hintPickPicture' : 'hintReadWhole';
          }
        };
      });
    }

    /* TEMPLATE: onset-rime-blend (RF.K.2.c, REDUCED FAN en/nl/da) — scaffolded
       blend: the onset is shown as a letter-chunk + the rime is SPOKEN (TTS-safe
       syllable; isolated-onset TTS unreliable). The child blends onset+rime and
       taps the PICTURE of the word; ≥1 distractor shares the rime → the onset is
       load-bearing. EXACTLY ONE correct. Reuses the read-sight-word speak/replay
       plumbing (speak rime on setup + replay on wrong) + the E8 speakBlend (speak
       the whole word on correct). 0-core. params.byLocale.<loc>.rounds; content
       locale via window.LCS.i18n.current. Each round = { onset, rime, correct:
       {noun,themeDir,word}, distractors:[{noun,themeDir,word}×3] }. */
    if (row.task_template === 'onset-rime-blend') {
      var orLoc = (window.LCS && window.LCS.i18n && window.LCS.i18n.current) || 'en';
      var orByLoc = (row.params && row.params.byLocale) || {};
      var orL = orByLoc[orLoc] || orByLoc.en;
      var orRounds = (orL && orL.rounds) || [];
      function _orTile(o) {
        return { key: o.noun, imgUrl: '/image-library-webp/themes/' + o.themeDir + '/' + o.noun + '@2x.webp', label: o.word };
      }
      return orRounds.map(function (r, i) {
        var onset = r.onset, rime = r.rime, correct = r.correct, distractors = r.distractors || [];
        function speakRime() { if (window.LCSAudio && window.LCSAudio.speak) window.LCSAudio.speak({ type: 'syllable', text: rime, lang: orLoc, rate: 0.85 }); }
        function speakWord() { if (window.LCSAudio && window.LCSAudio.speak) window.LCSAudio.speak({ type: 'word', text: correct.word, lang: orLoc, rate: 0.8 }); }
        return {
          id: row.id + '.r' + i + '-' + onset + '-' + rime,
          promptKey: 'promptBlend',
          answerType: 'state',
          setup: function (tool) {
            var seed = (i + 1) * 131;
            for (var c = 0; c < correct.noun.length; c++) seed = (seed * 31 + correct.noun.charCodeAt(c)) | 0;
            var ordered = seededShuffle([correct].concat(distractors), seed);
            var options = ordered.map(_orTile);
            tool.setupTask(options, correct.noun, { type: 'text', text: onset + ' · ' + rime });
            speakRime();
          },
          check: function (tool) {
            var ok = tool.answer === correct.noun;
            if (ok) speakWord(); else speakRime();
            tool.showFeedback(ok);
            return ok;
          },
          hintKey: function (tool) {
            /* blend-appropriate hints (not the generic „shape" ones) */
            return tool.answer == null ? 'hintPickPicture' : 'hintBlend';
          }
        };
      });
    }

    /* TEMPLATE: pick-smaller (K.CC.C.7) — mirror of pick-bigger; kid
       picks the SMALLER of two numerals. params.pairs = [[n1, n2], ...]. */
    if (row.task_template === 'pick-smaller') {
      var smallerPairs = row.params.pairs;
      return smallerPairs.map(function (pair, idx) {
        var a = pair[0], b = pair[1];
        var smaller = a < b ? a : b;
        return {
          id: row.id + '.' + a + '-vs-' + b,
          promptKey: 'promptPickSmaller',
          answerType: 'state',
          setup: function (tool) {
            /* idx-parity left/right placement so smaller isn't always
               on the same side. */
            var first  = (idx % 2 === 0) ? a : b;
            var second = (idx % 2 === 0) ? b : a;
            var options = [
              { key: String(first),  text: String(first)  },
              { key: String(second), text: String(second) }
            ];
            tool.setupTask(options, String(smaller), null);
          },
          check: function (tool) {
            var correct = tool.answer === String(smaller);
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: how-many-group (K.CC.B.5) — show N objects as subject
       (uses subject.type === 'group' added in Batch 3 core.js), kid picks
       the matching numeral from 4 number tiles (target + 3 distractors).
       params.items = [{ noun, themeDir, count, distractors: [n,n,n] }, ...].
       Engine cap: count ≤ 8. */
    if (row.task_template === 'how-many-group') {
      var howManyItems = row.params.items;
      return howManyItems.map(function (entry) {
        var imgUrl = '/image-library-webp/themes/' + entry.themeDir + '/' + entry.noun + '@2x.webp';
        var target = entry.count;
        return {
          id: row.id + '.' + entry.noun + '-' + target,
          promptKey: 'promptMatchNumberToGroup',
          answerType: 'state',
          setup: function (tool) {
            /* 4-tile numeral choice: target + 3 hand-picked distractors.
               Distractors deterministic per task (from manifest); shuffle
               keyed on target so order stays consistent across locales. */
            var numbers = entry.distractors.concat([target]);
            var seed = target * 31;
            function rand() {
              seed = (seed + 0x6D2B79F5) | 0;
              var t = seed;
              t = Math.imul(t ^ (t >>> 15), t | 1);
              t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
              return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
            }
            for (var m = numbers.length - 1; m > 0; m--) {
              var n = Math.floor(rand() * (m + 1));
              var t2 = numbers[m]; numbers[m] = numbers[n]; numbers[n] = t2;
            }
            var options = numbers.map(function (val) {
              return { key: String(val), text: String(val) };
            });
            var subject = {
              type: 'group',
              imgUrl: imgUrl,
              count: target,
              alt: entry.noun
            };
            tool.setupTask(options, String(target), subject);
          },
          check: function (tool) {
            var correct = tool.answer === String(target);
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: flat-solid (K.G.A.3) — show a shape image as subject,
       kid picks "Flat" (2D) or "Solid" (3D) text tile.
       params.shapes = [{ key, kind: '2d' | '3d' }, ...]. */
    if (row.task_template === 'flat-solid') {
      var shapeList = row.params.shapes;
      return shapeList.map(function (entry) {
        var targetKey = entry.kind === '3d' ? 'solid' : 'flat';
        return {
          id: row.id + '.' + entry.key,
          promptKey: 'promptFlatOrSolid',
          answerType: 'state',
          setup: function (tool) {
            var options = [
              { key: 'flat',  text: self.api.t('labelFlat')  },
              { key: 'solid', text: self.api.t('labelSolid') }
            ];
            var subject = {
              type: 'image',
              imgUrl: '/image-library-webp/themes/shapes/' + entry.key + '@2x.webp',
              alt: self.api.t('shapeLabel_' + entry.key) || entry.key
            };
            tool.setupTask(options, targetKey, subject);
          },
          check: function (tool) {
            var correct = tool.answer === targetKey;
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: compare-length (K.MD.A.2, Measurement & Data) — show the
       SAME object at two visibly different sizes (one image instance
       scaled via the wrapper-injected CSS above, keyed on the option
       key), kid taps the taller / longer / shorter one. ONE object per
       tile + NO counting — structurally distinct from which-more
       (K.CC.C.6, which compares the COUNT of items in group tiles).
       params.rounds = [{ noun, themeDir, attribute:'taller'|'longer'|'shorter' }, ...].
       taller/longer → the bigger instance is correct; shorter → smaller. */
    if (row.task_template === 'compare-length') {
      injectCompareLengthCSS();
      var rounds = row.params.rounds;
      return rounds.map(function (round, idx) {
        var imgUrl = '/image-library-webp/themes/' + round.themeDir + '/' + round.noun + '@2x.webp';
        var attr = round.attribute;
        var targetKey = (attr === 'shorter') ? 'cl-small' : 'cl-big';
        var promptKey = (attr === 'taller') ? 'promptTapTaller'
                      : (attr === 'longer') ? 'promptTapLonger'
                      : 'promptTapShorter';
        return {
          id: row.id + '.' + round.noun + '-' + attr,
          promptKey: promptKey,
          answerType: 'state',
          setup: function (tool) {
            var bigOpt   = { key: 'cl-big',   imgUrl: imgUrl, label: self.api.t('labelBigger')  + ' ' + round.noun };
            var smallOpt = { key: 'cl-small', imgUrl: imgUrl, label: self.api.t('labelSmaller') + ' ' + round.noun };
            /* idx-parity left/right placement so the bigger tile isn't
               always on the same side across the round set. */
            var options = (idx % 2 === 0) ? [bigOpt, smallOpt] : [smallOpt, bigOpt];
            tool.setupTask(options, targetKey, null);
          },
          check: function (tool) {
            var correct = tool.answer === targetKey;
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: sort-count (K.MD.B.3, Measurement & Data) — show a MIXED
       set of objects (≥2 categories, interleaved), name ONE category in
       the prompt, kid taps how many objects belong to it from 4 number
       tiles. Classify-THEN-count: the distractors include the TOTAL
       (counted everything) + the OTHER-category counts (counted the wrong
       group), so skipping classification lands on a wrong tile. Distinct
       from how-many-group (K.CC.B.5, homogeneous set → pure count) and
       which-more (K.CC.C.6, magnitude compare → tap a group).

       The core's subject-group is homogeneous (N copies of one image), so
       we seat the right COUNT of group items via the engine and swap each
       item's src to the heterogeneous pile in the wrapper-owned render()
       override below — 0 lines to choice-board-core.js / lcs-shell.* /
       Direction A CSS (same activity-layer pattern as compare-length's
       injected CSS). params.rounds = [
         { target:'animals', items:[{noun,themeDir,cat}, ...] }, ...
       ]. Engine subject cap = 8, so keep each round's items ≤ 8. */
    if (row.task_template === 'sort-count') {
      var scRounds = row.params.rounds;
      return scRounds.map(function (round, idx) {
        var items = round.items || [];
        var target = round.target;
        var correct = items.filter(function (it) { return it.cat === target; }).length;
        var total = items.length;
        /* counts of every non-target category present (mis-classify traps) */
        var byCat = {};
        items.forEach(function (it) { byCat[it.cat] = (byCat[it.cat] || 0) + 1; });
        var otherCounts = Object.keys(byCat)
          .filter(function (c) { return c !== target; })
          .map(function (c) { return byCat[c]; });
        /* deterministic interleave of the pile so categories aren't shown
           in contiguous blocks (counting a block would skip classifying). */
        var pileSeed = 0;
        for (var s = 0; s < target.length; s++) pileSeed = (pileSeed * 31 + target.charCodeAt(s)) | 0;
        pileSeed = (pileSeed + total * 101 + idx * 7) | 0;
        var mixed = seededShuffle(items, pileSeed).map(function (it) {
          return { imgUrl: '/image-library-webp/themes/' + it.themeDir + '/' + it.noun + '@2x.webp' };
        });
        return {
          id: row.id + '.' + target + '-' + idx,
          promptKey: 'promptCount' + target.charAt(0).toUpperCase() + target.slice(1),
          answerType: 'state',
          setup: function (tool) {
            var tiles = buildSortCountTiles(correct, total, otherCounts, (pileSeed ^ 0x9E3779B9) | 0);
            /* stash the heterogeneous pile for the render() override below */
            tool._mixedItems = mixed;
            var subject = {
              type: 'group',
              imgUrl: mixed.length ? mixed[0].imgUrl : '',
              count: total,
              alt: self.api.t('labelObjects')
            };
            tool.setupTask(tiles, String(correct), subject);
          },
          check: function (tool) {
            var ok = tool.answer === String(correct);
            tool.showFeedback(ok);
            return ok;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: describe-attribute (K.MD.A.1, Measurement & Data) — show ONE
       object as the image subject; the kid taps the measurement-attribute
       WORD (long / tall / heavy = length / height / weight) that describes
       it. Describes a measurable attribute of a SINGLE object — structurally
       distinct from compare-length (K.MD.A.2, compares two instances) and
       sort-count (K.MD.B.3, classify-then-count). Curated single-salient
       objects only (pencil→long, giraffe→tall, rock→heavy); exactly one tile
       is defensible per round and co-salient objects (elephant=tall+heavy,
       a watermelon-slice that reads light) are excluded at the manifest.
       Structural twin of flat-solid (image subject + text tiles); the only
       activity-layer addition is the 3-word-tile layout (injectDescribe-
       AttributeCSS + the .cb-attr3 board tag in render()) — 0 lines to
       choice-board-core.js / lcs-shell.* / Direction A CSS. params.rounds = [
         { noun, themeDir, attribute:'long'|'tall'|'heavy' }, ...
       ]. */
    if (row.task_template === 'describe-attribute') {
      injectDescribeAttributeCSS();
      var attrRounds = row.params.rounds;
      var ATTR_ORDER = ['long', 'tall', 'heavy'];
      var ATTR_TILE = { long: 'labelLong', tall: 'labelTall', heavy: 'labelHeavy' };
      return attrRounds.map(function (round, idx) {
        var imgUrl = '/image-library-webp/themes/' + round.themeDir + '/' + round.noun + '@2x.webp';
        var targetKey = round.attribute;
        return {
          id: row.id + '.' + round.noun + '-' + targetKey,
          promptKey: 'promptDescribeAttribute',
          promptArgs: { noun: self.api.t('nounLabel_' + round.noun) },
          answerType: 'state',
          setup: function (tool) {
            /* Rotate the fixed long/tall/heavy triad by idx so the correct
               word isn't always in the same slot; deterministic (depends
               only on idx) so the 11 sibling locales render identically. */
            var r = idx % 3;
            var keys = ATTR_ORDER.slice(r).concat(ATTR_ORDER.slice(0, r));
            var options = keys.map(function (k) {
              return { key: k, text: self.api.t(ATTR_TILE[k]) };
            });
            var subject = {
              type: 'image',
              imgUrl: imgUrl,
              alt: self.api.t('nounLabel_' + round.noun) || round.noun
            };
            /* Flag for the render() override to tag the board .cb-attr3 so
               the wrapper-owned 3-word-tile CSS applies. */
            tool._attr3 = true;
            tool.setupTask(options, targetKey, subject);
          },
          check: function (tool) {
            var correct = tool.answer === targetKey;
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: fraction-equal-shares (1.G.A.3, Geometry) — show 4 same-shape
       tiles; the kid taps the one split into equal halves/fourths. The 3
       distractors are the SAME shape split into UNEQUAL parts (the load-bearing
       foil — separates "two parts" from "two EQUAL parts"), the WRONG NUMBER of
       equal parts, or marked with a line that does not split it. So the activity
       demonstrates EQUAL-SHARES recognition, not shape ID. Honestly scoped to the
       identify/recognize-equal-shares facet of 1.G.A.3 (the kid recognizes; the
       kid-partitions facet is a future build). Tiles are code-drawn inline SVG
       (FRACTION_FIGURES) injected post-render in the render() override below —
       0 lines to choice-board-core.js / lcs-shell.* / Direction A CSS (same
       activity-layer pattern as sort-count + compare-length). params.rounds = [
         { shape, fraction:'halves'|'fourths',
           tiles:[{ fig, correct?:true, label }, ...4] }, ...]. */
    if (row.task_template === 'fraction-equal-shares') {
      injectFractionCSS();
      var frRounds = row.params.rounds;
      return frRounds.map(function (round, idx) {
        /* Deterministic per-round tile order (correct isn't always first; the
           future locale siblings render identically). seededShuffle returns a
           new array — round.tiles is untouched. */
        var ordered = seededShuffle(round.tiles, (idx * 101 + 7) | 0);
        var targetKey = null, svgByKey = {}, optionSpecs = [];
        ordered.forEach(function (t, i) {
          var key = 'fr-' + idx + '-' + i;
          if (t.correct) targetKey = key;
          var fig = FRACTION_FIGURES[t.fig];
          svgByKey[key] = fig ? fig() : '';
          optionSpecs.push({ key: key, label: t.label || round.shape });
        });
        return {
          id: row.id + '.' + round.shape + '-' + round.fraction + '-' + idx,
          promptKey: round.fraction === 'halves' ? 'promptTapHalves' : 'promptTapFourths',
          answerType: 'state',
          setup: function (tool) {
            /* stash the per-key SVG payloads for the render() override */
            tool._fractionTiles = svgByKey;
            var options = optionSpecs.map(function (o) {
              return { key: o.key, label: o.label };  /* empty-tile path: no imgUrl/text/group */
            });
            tool.setupTask(options, targetKey, null);
          },
          check: function (tool) {
            var correct = tool.answer === targetKey;
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: fraction-noncongruent (2.G.A.3, Geometry) — anchor-and-match.
       An ANCHOR figure (a valid equal partition) is shown above the board; the
       kid taps the tile that is ALSO split into the SAME number of equal parts,
       where the correct tile is the SAME whole partitioned a DIFFERENT way
       (non-congruent but equal) — centering 2.G.A.3 clause (3) "equal shares of
       identical wholes need not have the same shape". Foil triad: equal-count-
       but-UNEQUAL-AREA (load-bearing), WRONG-COUNT, NOT-SPLIT (whole). Honestly
       scoped to the RECOGNITION clause (kid recognizes; never partitions — the
       active-partition verb is a future #3). Reuses _fractionTiles (tile SVG
       injection) + adds _fractionAnchor (prompt-zone SVG), both injected in the
       render() override — 0 lines to choice-board-core.js / lcs-shell.* /
       Direction A CSS. params.rounds = [{ shape, fraction:'halves'|'thirds'|
       'fourths', anchorFig, tiles:[{ fig, correct?:true, label }, ...4] }]. */
    if (row.task_template === 'fraction-noncongruent') {
      injectFractionCSS();
      var ncRounds = row.params.rounds;
      return ncRounds.map(function (round, idx) {
        var ordered = seededShuffle(round.tiles, (idx * 101 + 7) | 0);
        var targetKey = null, svgByKey = {}, optionSpecs = [];
        ordered.forEach(function (t, i) {
          var key = 'nc-' + idx + '-' + i;
          if (t.correct) targetKey = key;
          var fig = FRACTION_FIGURES[t.fig];
          svgByKey[key] = fig ? fig() : '';
          optionSpecs.push({ key: key, label: t.label || round.shape });
        });
        var anchorFn = FRACTION_FIGURES[round.anchorFig];
        var anchorSvg = anchorFn ? anchorFn() : '';
        var anchorKey = round.anchorFig + '-' + idx;
        var pKey = round.fraction === 'halves' ? 'promptTapMatchHalves'
          : (round.fraction === 'thirds' ? 'promptTapMatchThirds' : 'promptTapMatchFourths');
        return {
          id: row.id + '.' + round.shape + '-' + round.fraction + '-' + idx,
          promptKey: pKey,
          answerType: 'state',
          setup: function (tool) {
            tool._fractionTiles = svgByKey;
            tool._fractionAnchor = anchorSvg;
            tool._fractionAnchorKey = anchorKey;
            var options = optionSpecs.map(function (o) {
              return { key: o.key, label: o.label };
            });
            tool.setupTask(options, targetKey, null);
          },
          check: function (tool) {
            var correct = tool.answer === targetKey;
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* E9 RF.K.3.c — read common high-frequency words by sight. The target word
       is SPOKEN via window.LCSAudio (wrapper-driven; 0 core touch); 4 word tiles
       (target + 3 non-homophone visually-similar distractors); the kid taps the
       word they hear. Per-locale rounds in params.byLocale (fi absent → 404 by
       design). Target tile position rotated by round index (deterministic
       variety; no within-round randomness). */
    if (row.task_template === 'read-sight-word') {
      var swLoc = (window.LCS && window.LCS.i18n && window.LCS.i18n.current) || 'en';
      var swByLoc = (row.params && row.params.byLocale) || {};
      var swL = swByLoc[swLoc] || swByLoc.en;
      var swRounds = (swL && swL.rounds) || [];
      return swRounds.map(function (r, i) {
        var words = [r.target].concat(r.distractors || []);
        var rot = i % words.length;
        var ordered = words.slice(rot).concat(words.slice(0, rot));
        var options = ordered.map(function (w) { return { key: w, text: w }; });
        var targetKey = r.target;
        function speakTarget() {
          if (window.LCSAudio && window.LCSAudio.speak) {
            window.LCSAudio.speak({ type: 'word', text: targetKey, lang: swLoc, rate: 0.85 });
          }
        }
        return {
          id: row.id + '.round-' + i,
          promptKey: (row.params && row.params.promptKey) || 'promptReadSight',
          answerType: 'state',
          setup: function (tool) { tool.setupTask(options, targetKey, null); speakTarget(); },
          check: function (tool) {
            var correct = tool.answer === targetKey;
            if (!correct) speakTarget();   /* replay-on-retry */
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) { return tool.answer == null ? 'hintPickOne' : 'hintTryAgain'; }
        };
      });
    }

    return STATIC_DEMO_TASKS;
  },

  /* Activity 10 K.MD.B.3 — heterogeneous-subject augmentation. After the
     core builds the DOM (the shell calls tool.render() right after
     task.setup()), swap each subject group-item's src to the per-position
     image stashed on tool._mixedItems by the sort-count setup(). Runs
     synchronously after the core render (no rAF/timing fragility per
     §A.13.47); touches 0 lines of choice-board-core.js / lcs-shell.* /
     Direction A CSS. No-op for every other template + the static demo
     (_mixedItems unset), and one activity loads per iframe, so there is
     zero cross-activity contamination. paint() never rebuilds the subject,
     so the swap survives selection + Check feedback; Next re-runs
     setup → render → re-swap. */
  render: function () {
    ChoiceBoardCore.render.call(this);
    /* Activity 11 K.MD.A.1 — tag the board so the wrapper-owned 3-word-tile
       CSS (injectDescribeAttributeCSS) applies. Guarded on the per-task
       _attr3 flag set by the describe-attribute setup(); no-op for every
       other template + the static demo. Idempotent (classList.add). */
    if (this._attr3 && this.api && this.api.stage) {
      var attrBoard = this.api.stage.querySelector('.cb-board');
      if (attrBoard) attrBoard.classList.add('cb-attr3');
    }
    /* E14 1.G.A.3 fraction-equal-shares — tag the board for the wrapper-owned
       2×2 large-tile CSS, then inject each empty tile's code-drawn partition
       SVG. Guarded on the per-task _fractionTiles flag; no-op for every other
       template + the static demo. insertAdjacentHTML('afterbegin') keeps the
       core's .cb-tile-badge (✓/✕) intact; the .cb-frac guard prevents
       double-inject. paint() never rebuilds tiles, so the SVG survives
       selection + Check; Next re-runs setup → render → re-inject. */
    if (this._fractionTiles && this.api && this.api.stage) {
      var fbBoard = this.api.stage.querySelector('.cb-board');
      if (fbBoard) fbBoard.classList.add('cb-frac-board');
      var fTiles = this.api.stage.querySelectorAll('.cb-tile');
      for (var f = 0; f < fTiles.length; f++) {
        var fSvg = this._fractionTiles[fTiles[f].dataset.key];
        if (fSvg && !fTiles[f].querySelector('.cb-frac')) {
          fTiles[f].insertAdjacentHTML('afterbegin', fSvg);
        }
      }
    }
    /* E14 #2 fraction-noncongruent — inject the ANCHOR figure above the board
       (the "this shape" referent the prompt names). Guarded on _fractionAnchor:
       no-op for #1 fraction-equal-shares + every other template + the static
       demo. The data-fig guard updates the figure on Next without needless
       re-innerHTML on selection re-renders; survives paint() (selection/Check). */
    if (this._fractionAnchor && this.api && this.api.stage) {
      var ncBoard = this.api.stage.querySelector('.cb-board');
      if (ncBoard) {
        var aHost = this.api.stage.querySelector('.cb-frac-anchor');
        if (!aHost) {
          aHost = document.createElement('div');
          aHost.className = 'cb-frac-anchor';
          ncBoard.parentNode.insertBefore(aHost, ncBoard);
        }
        if (aHost.getAttribute('data-fig') !== this._fractionAnchorKey) {
          aHost.innerHTML = this._fractionAnchor;
          aHost.setAttribute('data-fig', this._fractionAnchorKey);
        }
      }
    }
    /* 2.MD.A.1 read-ruler — inject the code-drawn ruler + to-scale object ABOVE
       the board (same anchor-zone pattern as fraction-noncongruent). Guarded on
       the per-task _rulerFig flag: no-op for every other template + the demo.
       data-fig guard updates only on Next, survives paint() (selection/Check). */
    if (this._rulerFig && this.api && this.api.stage) {
      var rrBoard = this.api.stage.querySelector('.cb-board');
      if (rrBoard) {
        var rrHost = this.api.stage.querySelector('.cb-ruler-figure');
        if (!rrHost) {
          rrHost = document.createElement('div');
          rrHost.className = 'cb-ruler-figure';
          rrBoard.parentNode.insertBefore(rrHost, rrBoard);
        }
        if (rrHost.getAttribute('data-fig') !== this._rulerFigKey) {
          rrHost.innerHTML = this._rulerFig;
          rrHost.setAttribute('data-fig', this._rulerFigKey);
        }
      }
    }

    var mixed = this._mixedItems;
    if (!mixed || !mixed.length || !this.api || !this.api.stage) return;
    var imgs = this.api.stage.querySelectorAll('.cb-subject--group .cb-group-item');
    for (var i = 0; i < imgs.length && i < mixed.length; i++) {
      if (mixed[i] && mixed[i].imgUrl) imgs[i].src = mixed[i].imgUrl;
    }
  }
});

ChoiceBoardCore.injectCSS();
