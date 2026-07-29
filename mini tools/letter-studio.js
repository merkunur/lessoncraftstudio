/* =====================================================================
   TOOL #25 — LETTER STUDIO   (letter-studio.js)
   ---------------------------------------------------------------------
   Free-play manipulative (no `tasks` — the shell renders zero activity
   chrome). The Word Workshop. Print only; cursive is deliberately v2.

   A huge letter on lined guides that match the locale's own school
   ruling. A firefly walks the stroke order first; then the child traces
   with a finger and THE LINE INKS ONLY WHILE THEY FOLLOW THE PATH —
   wobble-tolerant, strict on order, and never a red X. Letters chain
   into the child's own name from the class roster.

   WHY THIS FILE IS SMALL: it does not own a glyph table. It loads the
   already-gate-proven `alphabet-trace-core.js` + `number-trace-core.js`
   (the same pattern every core-consuming page uses: shell, core, then
   the consumer) and REGISTERS its composed glyphs into the core's own
   GLYPHS map. Two consequences worth stating:
     * zero duplication — the digits already exist twice in this repo
       (number-trace-core.js:22 copies them verbatim from
       numeral-trace-core.js); a third copy would have been worse.
     * the core's whole SOLVER GAUNTLET — oracle traces in order,
       scribbler fails, out-of-order rejected — applies to every glyph
       we add, for free. The gate drives it against å, ø, ß and the rest
       exactly as it drives it against a-z.

   THE GLYPH MODEL. Of the 23 non-ASCII graphemes across all eleven
   locales' letter trays, 21 are a base letter plus ONE MARK, so they are
   COMPOSED at load rather than hand-drawn. Only æ and ß are authored.
   Appending is also the right pedagogy — a diacritic is written AFTER
   the letter, so the core's strict stroke ordering enforces
   "letter first, then the mark" at no cost.
     ⚠ i and j are DOTLESS under a mark: í is a stem plus an acute, not
       a stem plus a dot plus an acute. The dot is REPLACED.

   THE RULING. Writing guides are per-locale and their geometry existed
   NOWHERE in this repo (Lineatur / seyès / Ausgangsschrift returned only
   SEO keyword hits), so every locale's ensemble ruled its own — see the
   RULING map below. What they found is the reason the fan-out was worth
   running: SIX of the ten independently reported that a DASHED midline is
   an Anglo convention their national paper does not print, Spain boxes
   lowercase between TWO equally strong lines (doble raya), Brazil has no
   x-height line at all, and Finland's official OPH grid draws four
   IDENTICAL lines with no emphasised baseline. Any of those would have
   shipped wrong under a translated English sheet. A locale whose ensemble
   could cite no national convention keeps the neutral 3-zone default on
   purpose — an honest placeholder beats a confident guess.

   NAMES ARE PII: the roster is READ from lcs:my-classes:v1 and never
   written; my-classes is a whole-blob last-writer-wins store owned by
   Name Sticks. A free visitor never loads it at all.
   ===================================================================== */
var LetterStudio = {
  id: 'letter-studio',

  /* CURATED: en authored; the other ten carry drafts until their native
     ensemble pass lands via apply-letter-studio-fanout.js. */
  strings: {
    title:        {en:'Letter Studio',de:'Buchstabenwerkstatt',fr:'L’atelier des lettres',it:'La bottega delle lettere',es:'Trazo a trazo',pt:'A oficina das letras',nl:'Het letterhuisje',sv:'Bokstavsverkstaden',da:'Bogstavværkstedet',no:'Skriveverkstedet',fi:'Kirjainpaja'},
    instruction:  {en:'Watch the firefly, then trace the letter with your finger.',de:'Schau zuerst dem Glühwürmchen zu, dann fahre den Buchstaben mit dem Finger nach.',fr:'Regarde la luciole, puis suis le chemin du doigt.',it:'Guarda la lucciola, poi ripassa la lettera con il dito.',es:'Mira la luciérnaga y luego traza la letra con el dedo.',pt:'Olhe o vaga-lume e depois trace a letra com o dedo.',nl:'Kijk naar het vuurvliegje. Trek de letter daarna na met je vinger.',sv:'Titta på lysmasken och skriv sedan bokstaven med fingret.',da:'Se, hvor ildfluen flyver, og skriv så bogstavet med fingeren.',no:'Se på ildflua først, og skriv så bokstaven med fingeren.',fi:'Katso kiiltomatoa ja piirrä sitten kirjain sormella.'},
    privacyLine:  {en:'Names come from your class list on this device and never leave it.',de:'Die Namen stammen aus Ihrer Klassenliste auf diesem Gerät und verlassen es nie.',fr:'Les prénoms viennent de votre liste de classe sur cet appareil et n’en sortent jamais.',it:'I nomi arrivano dall’elenco della classe salvato su questo dispositivo e non escono mai da qui.',es:'Los nombres vienen de tu lista del grupo en este dispositivo y nunca salen de aquí.',pt:'Os nomes vêm da lista da sua turma neste aparelho e nunca saem dele.',nl:'De namen komen uit je klassenlijst op dit apparaat en blijven daar.',sv:'Namnen hämtas från klasslistan på den här enheten och skickas aldrig vidare.',da:'Navnene kommer fra din klasseliste og bliver på denne enhed.',no:'Navnene kommer fra klasselista på denne enheten og blir aldri sendt videre.',fi:'Nimet tulevat tämän laitteen luokkalistalta eivätkä poistu siitä koskaan.'},

    /* modes */
    modeLetters:  {en:'Letters',de:'Buchstaben',fr:'Lettres',it:'Lettere',es:'Letras',pt:'Letras',nl:'Letters',sv:'Bokstäver',da:'Bogstaver',no:'Bokstaver',fi:'Kirjaimet'},
    modeNumbers:  {en:'Numbers',de:'Zahlen',fr:'Chiffres',it:'Numeri',es:'Números',pt:'Números',nl:'Cijfers',sv:'Siffror',da:'Tal',no:'Tall',fi:'Numerot'},
    modeNames:    {en:'Names',de:'Namen',fr:'Prénoms',it:'Nomi',es:'Nombres',pt:'Nomes',nl:'Namen',sv:'Namn',da:'Navne',no:'Navn',fi:'Nimet'},

    /* case */
    caseLower:    {en:'small',de:'klein',fr:'minuscules',it:'minuscole',es:'minúsculas',pt:'minúsculas',nl:'klein',sv:'små',da:'små',no:'små',fi:'pienet'},
    caseUpper:    {en:'CAPITAL',de:'GROSS',fr:'CAPITALES',it:'MAIUSCOLE',es:'MAYÚSCULAS',pt:'MAIÚSCULAS',nl:'HOOFDLETTERS',sv:'STORA',da:'STORE',no:'STORE',fi:'ISOT'},

    /* the trace surface */
    showMe:       {en:'Show me',de:'Vormachen',fr:'Montre-moi',it:'Fammi vedere',es:'Muéstrame cómo',pt:'Me mostra',nl:'Doe maar voor',sv:'Visa mig',da:'Vis hvordan',no:'Vis meg',fi:'Näytä malli'},
    startDot:     {en:'Start at the green dot.',de:'Fang am grünen Punkt an.',fr:'Commence au point vert.',it:'Comincia dal punto verde.',es:'Empieza en el punto verde.',pt:'Comece no pontinho verde.',nl:'Begin bij de groene stip.',sv:'Börja vid den gröna pricken.',da:'Start ved den grønne prik.',no:'Start på den grønne prikken.',fi:'Aloita vihreästä pisteestä.'},
    strokeOf:     {en:'Stroke {a} of {b}',de:'Strich {a} von {b}',fr:'Trait {a} sur {b}',it:'Tratto {a} di {b}',es:'Trazo {a} de {b}',pt:'Traço {a} de {b}',nl:'Stap {a} van {b}',sv:'Streck {a} av {b}',da:'Streg {a} af {b}',no:'Strek {a} av {b}',fi:'Veto {a} / {b}'},
    keepGoing:    {en:'Keep following the path — the line joins in when you are on it.',de:'Folge der Spur weiter – die Linie kommt mit, sobald du darauf bist.',fr:'Continue de suivre le chemin : le trait te suit dès que tu es dessus.',it:'Continua a seguire il percorso: la linea compare quando ci passi sopra.',es:'Sigue el camino y la línea se va pintando sola.',pt:'Continue seguindo o caminho — a linha só aparece quando o dedo está em cima dele.',nl:'Blijf het pad volgen — de lijn schrijft mee zolang je erop blijft.',sv:'Fortsätt följa spåret – linjen hänger med så länge du är kvar på det.',da:'Bliv ved med at følge sporet — stregen kommer med, så længe du er på det.',no:'Fortsett å følge sporet – streken blir med når du holder deg på det.',fi:'Seuraa polkua – viiva piirtyy, kun kuljet sitä pitkin.'},
    donePraise:   {en:'You wrote it. Look at that.',de:'Das hast du geschrieben. Schau es dir an!',fr:'Ça y est ! Regarde ce que tu viens d’écrire.',it:'Ce l’hai fatta! Guarda che bel lavoro.',es:'¡La escribiste! Mira qué letra te quedó.',pt:'Você escreveu! Olhe só essa letra.',nl:'Je hebt het geschreven. Kijk eens hoe mooi.',sv:'Du skrev den! Titta så fin bokstav.',da:'Du skrev det helt selv. Se lige det bogstav.',no:'Du skrev den selv. Se så fin bokstaven ble!',fi:'Kirjoitit sen itse. Katsopa tuota jälkeä.'},
    nextOne:      {en:'Next one',de:'Weiter',fr:'On continue',it:'Avanti',es:'Siguiente',pt:'Próximo',nl:'Volgende',sv:'Nästa',da:'Næste',no:'Neste',fi:'Seuraava'},
    clearBtn:     {en:'Start over',de:'Von vorne beginnen',fr:'Recommencer',it:'Ricomincia',es:'Empezar de nuevo',pt:'Recomeçar',nl:'Opnieuw beginnen',sv:'Börja om',da:'Start forfra',no:'Start på nytt',fi:'Aloita alusta'},

    /* names mode */
    namesPick:    {en:'Whose name shall we write?',de:'Wessen Namen schreiben wir?',fr:'Quel prénom écrit-on ?',it:'Quale nome scriviamo?',es:'¿Qué nombre escribimos?',pt:'Qual nome vamos escrever?',nl:'Van wie schrijven we de naam?',sv:'Vems namn ska vi skriva?',da:'Hvis navn skal vi skrive?',no:'Hvilket navn skal vi skrive?',fi:'Kenen nimen kirjoitamme?'},
    letterOfName: {en:'{name} — letter {a} of {b}',de:'{name} – Buchstabe {a} von {b}',fr:'{name} — lettre {a} sur {b}',it:'{name} — lettera {a} di {b}',es:'{name} — letra {a} de {b}',pt:'{name} — letra {a} de {b}',nl:'{name} — letter {a} van {b}',sv:'{name} — bokstav {a} av {b}',da:'{name} — bogstav {a} af {b}',no:'{name} — bokstav {a} av {b}',fi:'{name} – kirjain {a} / {b}'},
    nameDone:     {en:'You wrote the whole name.',de:'Du hast den ganzen Namen geschrieben.',fr:'Tu as écrit tout le prénom !',it:'Hai scritto tutto il nome.',es:'¡Escribiste el nombre completo!',pt:'Você escreveu o nome inteiro!',nl:'Je hebt de hele naam geschreven.',sv:'Du skrev hela namnet!',da:'Du skrev hele navnet.',no:'Du skrev hele navnet.',fi:'Kirjoitit koko nimen.'},
    noClass:      {en:'Add a class in Name Sticks first — this studio reads the same list.',de:'Legen Sie zuerst in den Namensstäbchen eine Klasse an – diese Werkstatt liest dieselbe Liste.',fr:'Créez d’abord une classe dans les Bâtonnets de prénoms : cet atelier lit la même liste.',it:'Crea prima una classe in Bastoncini dei nomi: questa bottega legge lo stesso elenco.',es:'Crea primero un grupo en Palitos con nombre: aquí se lee esa misma lista.',pt:'Primeiro, crie uma turma em Palitos de nomes — esta oficina lê a mesma lista.',nl:'Maak eerst een klas aan in Beurtenstokjes — het letterhuisje leest dezelfde lijst.',sv:'Skapa först en klass i Namnpinnar — den här verkstaden läser samma lista.',da:'Opret først en klasse i Navnepinde — dette værksted læser den samme liste.',no:'Lag først en klasse i Navnepinner – dette verkstedet leser den samme lista.',fi:'Luo ensin luokka Nimitikuissa – tämä paja käyttää samaa listaa.'},

    /* gate */
    gateNames:    {en:'Name tracing and the printable sheets are part of Premium — the whole alphabet is always free.',de:'Namen und Druckvorlagen gehören zu Premium – das ganze Alphabet bleibt immer kostenlos.',fr:'Le tracé des prénoms et les fiches à imprimer font partie de Premium — tout l’alphabet reste gratuit.',it:'Scrivere i nomi della classe e le schede da stampare fanno parte di Premium: l’alfabeto intero resta sempre gratuito.',es:'El trazo de los nombres y las fichas para imprimir son parte de Premium: el alfabeto completo siempre es gratis.',pt:'O traçado dos nomes e as fichas para imprimir fazem parte do Premium — o alfabeto inteiro é sempre gratuito.',nl:'Namen natrekken en de printbladen horen bij Premium — het hele alfabet blijft altijd gratis.',sv:'Att skriva namn och att skriva ut arbetsblad ingår i Premium — hela alfabetet är alltid gratis.',da:'Navneskrivning og skrivearkene til print hører til Premium — hele alfabetet er altid gratis.',no:'Å skrive navn og å skrive ut ark hører til Premium – hele alfabetet er alltid gratis.',fi:'Nimien kirjoittaminen ja tulostettavat sivut kuuluvat Premiumiin – koko aakkosto on aina ilmainen.'},
    unlock:       {en:'See Premium',de:'Premium ansehen',fr:'Voir Premium',it:'Scopri Premium',es:'Ver Premium',pt:'Desbloquear nomes e fichas',nl:'Bekijk Premium',sv:'Se Premium',da:'Se Premium',no:'Se Premium',fi:'Tutustu Premiumiin'},
    gateClose:    {en:'Not now',de:'Jetzt nicht',fr:'Pas maintenant',it:'Non ora',es:'Ahora no',pt:'Agora não',nl:'Nu niet',sv:'Inte nu',da:'Ikke nu',no:'Ikke nå',fi:'Ei nyt'},
    printBtn:     {en:'Printable sheet',de:'Druckvorlage',fr:'Fiche à imprimer',it:'Scheda da stampare',es:'Ficha para imprimir',pt:'Ficha para imprimir',nl:'Werkblad printen',sv:'Skriv ut',da:'Skriveark til print',no:'Ark til utskrift',fi:'Tulostettava sivu'},

    /* settings */
    setVoice:     {en:'Say the letter',de:'Buchstaben und Zahlen vorlesen',fr:'Dire à voix haute',it:'Pronuncia il nome della lettera',es:'Decir la letra',pt:'Dizer a letra',nl:'Letter hardop zeggen',sv:'Säg bokstaven',da:'Sig bogstavet',no:'Si navnet på bokstaven',fi:'Sano ääneen'}
  },

  MC_KEY: 'lcs:my-classes:v1',       /* READ ONLY. getItem only, ever. */
  STORE_KEY: 'lcs:letter-studio:v1', /* the ONLY key this tool writes   */
  ENT_TRUST_DAYS: 14,

  defaults: { voice: true },
  settings: [{ key: 'voice', labelKey: 'setVoice', type: 'toggle' }],

  premium: false,

  /* =================================================================
     THE RULING — per-locale writing guides.

     Zones are in the SAME normalized 0..100 box as the glyphs, so the
     guide and the letterform agree by construction. (The shipped
     activity draws its midline at y=50 while its own x-height is y=44 —
     the guide and the letter disagree. Not here.)

     EVERY LOCALE SHIPS '3-zone' UNTIL ITS NATIVE ENSEMBLE RULES.
     German Lineatur zone counts differ by grade and French seyès has a
     specific subdivided grid; neither geometry exists anywhere in this
     repo, so inventing one would look authoritative and be wrong. The
     descriptor below is deliberately ready for them and deliberately
     not yet filled in.
     ================================================================= */
  RULING: {
    /* de — lineatur-1 */
    de: { system: 'lineatur-1', zones: [{ y: 14, kind: 'solid', tone: 'faint' }, { y: 44, kind: 'solid', tone: 'mid' }, { y: 84, kind: 'solid', tone: 'strong' }, { y: 96, kind: 'solid', tone: 'faint' }], band: { from: 44, to: 84 } },
    /* fr — seyes-agrandi */
    fr: { system: 'seyes-agrandi', zones: [{ y: 14, kind: 'dashed', tone: 'mid' }, { y: 29, kind: 'dashed', tone: 'faint' }, { y: 44, kind: 'dashed', tone: 'mid' }, { y: 84, kind: 'solid', tone: 'strong' }, { y: 96, kind: 'dashed', tone: 'faint' }] },
    /* it — rigatura-prima */
    it: { system: 'rigatura-prima', zones: [{ y: 14, kind: 'solid', tone: 'faint' }, { y: 44, kind: 'solid', tone: 'mid' }, { y: 84, kind: 'solid', tone: 'strong' }, { y: 96, kind: 'solid', tone: 'faint' }] },
    /* es — doble-raya */
    es: { system: 'doble-raya', zones: [{ y: 14, kind: 'solid', tone: 'faint' }, { y: 44, kind: 'solid', tone: 'strong' }, { y: 84, kind: 'solid', tone: 'strong' }] },
    /* pt — pauta-numerada-1-2-3 */
    pt: { system: 'pauta-numerada-1-2-3', zones: [{ y: 14, kind: 'solid', tone: 'faint' }, { y: 84, kind: 'solid', tone: 'strong' }, { y: 96, kind: 'solid', tone: 'faint' }], band: { from: 44, to: 84 } },
    /* nl — nl-blokschrift-liniatuur */
    nl: { system: 'nl-blokschrift-liniatuur', zones: [{ y: 14, kind: 'dashed', tone: 'faint' }, { y: 44, kind: 'solid', tone: 'mid' }, { y: 84, kind: 'solid', tone: 'strong' }, { y: 96, kind: 'dashed', tone: 'faint' }] },
    /* sv — stodlinjerat */
    sv: { system: 'stodlinjerat', zones: [{ y: 14, kind: 'solid', tone: 'faint' }, { y: 44, kind: 'solid', tone: 'faint' }, { y: 84, kind: 'solid', tone: 'strong' }, { y: 96, kind: 'solid', tone: 'faint' }] },
    /* da — skrivehus */
    da: { system: 'skrivehus', zones: [{ y: 14, kind: 'dashed', tone: 'faint' }, { y: 44, kind: 'dashed', tone: 'mid' }, { y: 84, kind: 'solid', tone: 'strong' }, { y: 96, kind: 'dashed', tone: 'faint' }] },
    /* no — skrivehus */
    no: { system: 'skrivehus', zones: [{ y: 14, kind: 'dashed', tone: 'faint' }, { y: 44, kind: 'dashed', tone: 'mid' }, { y: 84, kind: 'solid', tone: 'strong' }, { y: 96, kind: 'dashed', tone: 'faint' }] },
    /* fi — viivasto-4 */
    fi: { system: 'viivasto-4', zones: [{ y: 14, kind: 'solid', tone: 'mid' }, { y: 44, kind: 'solid', tone: 'mid' }, { y: 84, kind: 'solid', tone: 'mid' }, { y: 96, kind: 'solid', tone: 'mid' }] },
    /* en + any locale whose ensemble could cite no national convention */
    'default': {
      system: '3-zone',
      zones: [
        { y: 14, kind: 'dashed', tone: 'faint' },   /* ascender  */
        { y: 44, kind: 'dashed', tone: 'mid'   },   /* x-height  */
        { y: 84, kind: 'solid',  tone: 'strong'},   /* baseline  */
        { y: 96, kind: 'dashed', tone: 'faint' }    /* descender */
      ]
    }
  },
  rulingFor: function (locale) { return this.RULING[locale] || this.RULING['default']; },

  /* =================================================================
     PURE ENGINE — no DOM, no storage. The build gate calls these.
     ================================================================= */

  /* the eight marks. Each returns an ARRAY of strokes (a diaeresis is
     two dots = two strokes, and a child writes them as two), placed
     from the base glyph's measured box. */
  /* The eight marks. Each returns an ARRAY of strokes (a diaeresis is two
     dots, and a child writes two). Offsets are FRACTIONS of the band that
     is actually available above the base — an uppercase cap top sits at
     y=16, so a mark sized for lowercase would run off the top of the box
     (measured: a fixed-offset circumflex put Ê and Ô at y=-1).

     The two diaeresis dots carry their own `.tol`: at the shared TOL of 18
     two dots 20 units apart are MUTUALLY SATISFIABLE — a tap between them
     completes both strokes — so the tolerance must be smaller than half
     their separation for them to be separate letters at all. */
  DOT_TOL: 8,
  MARKS: {
    grave:      function (b, H) { return [[{ x: b.cx - 4, y: b.top - H }, { x: b.cx + 3, y: b.top - H * 0.45 }]]; },
    acute:      function (b, H) { return [[{ x: b.cx - 3, y: b.top - H * 0.45 }, { x: b.cx + 4, y: b.top - H }]]; },
    circumflex: function (b, H) { return [[{ x: b.cx - 6, y: b.top - H * 0.4 }, { x: b.cx, y: b.top - H }, { x: b.cx + 6, y: b.top - H * 0.4 }]]; },
    diaeresis:  function (b, H) {
      var y = b.top - H * 0.65, d = 10;
      return [[{ x: b.cx - d, y: y }, { x: b.cx - d, y: y + 2 }],
              [{ x: b.cx + d, y: y }, { x: b.cx + d, y: y + 2 }]];
    },
    tilde:      function (b, H) {
      var y = b.top - H * 0.6;
      return [[{ x: b.cx - 9, y: y + 3 }, { x: b.cx - 3, y: y - 2 }, { x: b.cx + 3, y: y + 3 }, { x: b.cx + 9, y: y - 2 }]];
    },
    ring:       function (b, H) {
      var r = Math.min(5, H * 0.34), cy = b.top - H * 0.55, p = [], i, t;
      for (i = 0; i <= 10; i++) { t = (270 + 360 * i / 10) * Math.PI / 180; p.push({ x: Math.round((b.cx + r * Math.cos(t)) * 10) / 10, y: Math.round((cy + r * Math.sin(t)) * 10) / 10 }); }
      return [p];
    },
    /* ø: a stroke THROUGH the bowl, not above it */
    stroke:     function (b) { return [[{ x: b.x0 - 4, y: b.base + 2 }, { x: b.x1 + 4, y: b.top - 4 }]]; },
    /* ç: a hook BELOW the baseline, hanging off the letter */
    cedilla:    function (b) { return [[{ x: b.cx, y: b.base - 1 }, { x: b.cx + 1, y: b.base + 6 }, { x: b.cx - 6, y: b.base + 9 }]]; }
  },

  /* base letter + mark, for every composed grapheme in the 11 trays */
  COMPOSE: {
    'à': ['a', 'grave'], 'á': ['a', 'acute'], 'â': ['a', 'circumflex'], 'ã': ['a', 'tilde'], 'ä': ['a', 'diaeresis'], 'å': ['a', 'ring'],
    'ç': ['c', 'cedilla'],
    'è': ['e', 'grave'], 'é': ['e', 'acute'], 'ê': ['e', 'circumflex'], 'ë': ['e', 'diaeresis'],
    'ì': ['i', 'grave'], 'í': ['i', 'acute'], 'î': ['i', 'circumflex'], 'ï': ['i', 'diaeresis'],
    'ñ': ['n', 'tilde'],
    'ò': ['o', 'grave'], 'ó': ['o', 'acute'], 'ô': ['o', 'circumflex'], 'õ': ['o', 'tilde'], 'ö': ['o', 'diaeresis'], 'ø': ['o', 'stroke'],
    'ù': ['u', 'grave'], 'ú': ['u', 'acute'], 'û': ['u', 'circumflex'], 'ü': ['u', 'diaeresis'],
    'ÿ': ['y', 'diaeresis'],
    'À': ['A', 'grave'], 'Á': ['A', 'acute'], 'Â': ['A', 'circumflex'], 'Ã': ['A', 'tilde'], 'Ä': ['A', 'diaeresis'], 'Å': ['A', 'ring'],
    'Ç': ['C', 'cedilla'],
    'È': ['E', 'grave'], 'É': ['E', 'acute'], 'Ê': ['E', 'circumflex'], 'Ë': ['E', 'diaeresis'],
    'Ì': ['I', 'grave'], 'Í': ['I', 'acute'], 'Î': ['I', 'circumflex'], 'Ï': ['I', 'diaeresis'],
    'Ñ': ['N', 'tilde'],
    'Ò': ['O', 'grave'], 'Ó': ['O', 'acute'], 'Ô': ['O', 'circumflex'], 'Õ': ['O', 'tilde'], 'Ö': ['O', 'diaeresis'], 'Ø': ['O', 'stroke'],
    'Ù': ['U', 'grave'], 'Ú': ['U', 'acute'], 'Û': ['U', 'circumflex'], 'Ü': ['U', 'diaeresis'],
    'Ÿ': ['Y', 'diaeresis']
  },

  /* ⚠ i and j lose their DOT when they take a mark: í is a stem plus an
     acute, never a stem plus a dot plus an acute. */
  DOTTED: { i: 1, j: 1 },

  /* the only two glyphs that are genuinely new letterforms */
  NOVEL: {
    'æ': [[{ x: 46, y: 50 }, { x: 36, y: 45 }, { x: 28, y: 52 }, { x: 27, y: 66 }, { x: 34, y: 80 }, { x: 46, y: 80 }, { x: 48, y: 70 }],
          [{ x: 48, y: 46 }, { x: 48, y: 84 }],
          [{ x: 50, y: 66 }, { x: 72, y: 66 }, { x: 72, y: 54 }, { x: 60, y: 46 }, { x: 50, y: 54 }, { x: 49, y: 66 }, { x: 56, y: 80 }, { x: 70, y: 82 }, { x: 74, y: 74 }]],
    'Æ': [[{ x: 52, y: 16 }, { x: 34, y: 84 }],
          [{ x: 52, y: 16 }, { x: 52, y: 84 }],
          [{ x: 40, y: 56 }, { x: 52, y: 56 }],
          [{ x: 52, y: 16 }, { x: 72, y: 16 }],
          [{ x: 52, y: 50 }, { x: 68, y: 50 }],
          [{ x: 52, y: 84 }, { x: 72, y: 84 }]],
    'ß': [[{ x: 34, y: 96 }, { x: 34, y: 60 }, { x: 34, y: 30 }, { x: 42, y: 22 }, { x: 54, y: 24 }, { x: 58, y: 34 }, { x: 50, y: 46 }, { x: 42, y: 52 }],
          [{ x: 42, y: 52 }, { x: 56, y: 54 }, { x: 64, y: 64 }, { x: 60, y: 78 }, { x: 46, y: 82 }, { x: 38, y: 78 }]]
  },

  bboxOf: function (strokes) {
    var x0 = Infinity, x1 = -Infinity, top = Infinity, base = -Infinity, i, j, p;
    for (i = 0; i < strokes.length; i++) for (j = 0; j < strokes[i].length; j++) {
      p = strokes[i][j];
      if (p.x < x0) x0 = p.x; if (p.x > x1) x1 = p.x;
      if (p.y < top) top = p.y; if (p.y > base) base = p.y;
    }
    return { x0: x0, x1: x1, top: top, base: base, cx: (x0 + x1) / 2 };
  },

  /* base glyph (dot dropped for i/j) + the mark's strokes, mark LAST */
  compose: function (baseStrokes, baseChar, markName) {
    var body = baseStrokes;
    if (this.DOTTED[baseChar]) body = baseStrokes.slice(0, baseStrokes.length - 1);
    var mark = this.MARKS[markName];
    if (!mark) return null;
    var bb = this.bboxOf(body);
    /* the band actually available above the letter, never off the sheet */
    var H = Math.max(6, Math.min(16, bb.top - 3));
    var strokes = mark(bb, H);
    if (markName === 'diaeresis') for (var i = 0; i < strokes.length; i++) strokes[i].tol = this.DOT_TOL;
    return body.concat(strokes);
  },

  /* every grapheme this tool can draw, composed once and registered into
     the core so its solver gauntlet covers them too */
  installGlyphs: function (core) {
    if (!core || !core.GLYPHS) return 0;
    var added = 0, ch, spec, g;
    for (ch in this.COMPOSE) if (Object.prototype.hasOwnProperty.call(this.COMPOSE, ch)) {
      if (core.GLYPHS[ch]) continue;
      spec = this.COMPOSE[ch];
      if (!core.GLYPHS[spec[0]]) continue;
      g = this.compose(core.GLYPHS[spec[0]], spec[0], spec[1]);
      if (g) { core.GLYPHS[ch] = g; added++; }
    }
    for (ch in this.NOVEL) if (Object.prototype.hasOwnProperty.call(this.NOVEL, ch)) {
      if (!core.GLYPHS[ch]) { core.GLYPHS[ch] = this.NOVEL[ch]; added++; }
    }
    return added;
  },

  /* a digraph is a letter SEQUENCE, never a glyph: a child forms each
     letter. Same mechanism as a name. */
  sequenceOf: function (grapheme) {
    var out = [], i;
    for (i = 0; i < grapheme.length; i++) out.push(grapheme.charAt(i));
    return out;
  },

  /* THE STRUCTURAL GATE — a free visitor gets no roster, ever. */
  modesFor: function (premium) { return premium ? ['letters', 'numbers', 'names'] : ['letters', 'numbers']; },

  rosterFor: function (mc, classId, premium) {
    if (!premium || !mc || !classId) return [];
    var classes = mc.classes || [], i, j, st, out;
    for (i = 0; i < classes.length; i++) if (classes[i].id === classId) {
      out = []; st = classes[i].students || [];
      for (j = 0; j < st.length; j++) out.push({ id: st[j].id, name: st[j].name });
      return out;
    }
    return [];
  },

  resolveDeepLink: function (params, premium) {
    if (!params) return null;
    var m = params.mode;
    if (m === 'names' && !premium) return null;      /* refused, never optimistic */
    if (['letters', 'numbers', 'names'].indexOf(m) < 0) return null;
    return { mode: m };
  },

  fmt: function (key, args) {
    var s = this.api.t(key);
    for (var k in args) if (Object.prototype.hasOwnProperty.call(args, k))
      s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), args[k]);
    return s;
  },

  /* =================================================================
     LIFECYCLE
     ================================================================= */

  init: function (api) {
    var self = this;
    this.api = api;
    injectLetterStudioCSS();

    this.core = (typeof AlphabetTraceCore !== 'undefined') ? AlphabetTraceCore : null;
    this.numCore = (typeof NumberTraceCore !== 'undefined') ? NumberTraceCore : null;
    if (this.core) this.installGlyphs(this.core);

    this.mode = 'letters';
    this.upper = false;
    this.tray = null;
    this.index = 0;
    this.state = null;
    this.drawn = [];          /* accepted strokes, for the inked letter */
    this.cur = [];            /* the in-progress on-path samples */
    this.nameSeq = null;      /* names mode: the letter sequence */
    this.nameAt = 0;
    this.selectedSid = null;
    this._mc = null;          /* LAZY — a free visitor never loads it */
    this._classId = null;
    this._timers = [];
    this.premiumKnown = false;
    this._deepPending = this._readParams();
    this._store = this._loadStore();

    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';

    this._loadTray();
    this._fetchEntitlement();
  },

  destroy: function () { this._clearTimers(); },

  _readParams: function () {
    try { var p = new URLSearchParams(window.location.search); return { mode: p.get('mode') }; }
    catch (_) { return null; }
  },

  _loadStore: function () {
    var s = null;
    try { s = JSON.parse(localStorage.getItem(this.STORE_KEY)); } catch (_) {}
    if (!s || typeof s !== 'object') s = {};
    if (!s.v) s.v = 1;
    return s;
  },
  _saveStore: function () {
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(this._store)); } catch (_) {}
  },

  /* my-classes is opened LAZILY and READ-ONLY */
  _loadMC: function () {
    if (!this.premium) return null;
    if (this._mc) return this._mc;
    try { this._mc = JSON.parse(localStorage.getItem(this.MC_KEY)); } catch (_) { this._mc = null; }
    return this._mc;
  },

  /* the locale's own letter inventory, from the shipped phonics tray */
  _loadTray: function () {
    var self = this, loc = this.api.lang;
    fetch('/mini-tools/letter-tiles-' + loc + '.json', { cache: 'force-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { self.tray = (j && j.tray) ? j.tray : null; self._settle(); })
      .catch(function () { self.tray = null; self._settle(); });
  },

  /* single-letter graphemes only — a digraph is traced as a sequence in
     names mode, not offered as one tile to form */
  letters: function () {
    var out = [], i, g;
    if (this.tray) {
      for (i = 0; i < this.tray.length; i++) {
        g = this.tray[i].g;
        if (g && g.length === 1) out.push(this.upper ? g.toUpperCase() : g);
      }
    }
    if (!out.length) {
      var az = 'abcdefghijklmnopqrstuvwxyz';
      for (i = 0; i < az.length; i++) out.push(this.upper ? az.charAt(i).toUpperCase() : az.charAt(i));
    }
    var seen = {}, uniq = [];
    for (i = 0; i < out.length; i++) if (!seen[out[i]] && this._drawable(out[i])) { seen[out[i]] = 1; uniq.push(out[i]); }
    return uniq;
  },

  digits: function () { return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']; },

  _drawable: function (ch) {
    if (!this.core) return false;
    return !!this.core.GLYPHS[ch];
  },

  _glyph: function (ch) {
    if (this.mode === 'numbers' && this.numCore && this.numCore.GLYPHS && this.numCore.GLYPHS[ch]) return this.numCore.GLYPHS[ch];
    return this.core ? this.core.GLYPHS[ch] : null;
  },

  _current: function () {
    if (this.mode === 'names' && this.nameSeq) return this.nameSeq[this.nameAt] || null;
    var list = this.mode === 'numbers' ? this.digits() : this.letters();
    return list[this.index % list.length] || null;
  },

  _fetchEntitlement: function () {
    var self = this, token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}

    var trustCache = function () {
      var ent = self._store.ent;
      if (ent && ent.checkedAt) {
        var age = (Date.now() - new Date(ent.checkedAt).getTime()) / 86400000;
        self.premium = (age <= self.ENT_TRUST_DAYS) ? ent.tier !== 'free' : false;
      } else self.premium = false;
      self.premiumKnown = true;
      self._settle();
    };

    if (!token) { self.premium = false; self.premiumKnown = true; self._settle(); return; }

    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) { self.premium = false; self.premiumKnown = true; self._settle(); return; }
        var tier = j.user && j.user.subscriptionTier;
        var sub = j.subscription;
        self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
        self._saveStore();
        self.premiumKnown = true;
        self._settle();
      })
      .catch(trustCache);
  },

  _settle: function () {
    var d = this._deepPending ? this.resolveDeepLink(this._deepPending, this.premium) : null;
    if (d && this.modesFor(this.premium).indexOf(d.mode) >= 0) this.mode = d.mode;
    if (this.premiumKnown) this._deepPending = null;
    if (this.modesFor(this.premium).indexOf(this.mode) < 0) this.mode = 'letters';
    if (this.premium) {
      var mc = this._loadMC();
      var classes = (mc && mc.classes) || [];
      this._classId = null;
      if (mc && mc.activeClassId) for (var i = 0; i < classes.length; i++) if (classes[i].id === mc.activeClassId) this._classId = mc.activeClassId;
      if (!this._classId && classes.length) this._classId = classes[0].id;
    } else { this._mc = null; this._classId = null; }
    this._reset();
    if (this._wrap) this.render();
  },

  _reset: function () {
    var ch = this._current();
    this.state = (this.core && ch) ? this.core.newState({ id: 'ls', letter: ch }) : null;
    this.drawn = [];
    this.cur = [];
    this.wandered = false;
  },

  _after: function (ms, fn) { var id = setTimeout(fn, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },

  _say: function (text) {
    this.api.announce(text);
    if (!this.api.settings.voice) return;
    try { LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.95 }); } catch (_) {}
  },
  _sayLetter: function (ch) {
    if (!this.api.settings.voice) return;
    try { LCSAudio.speak({ type: 'word', text: ch, lang: this.api.lang, rate: 0.9 }); } catch (_) {}
  },

  /* =================================================================
     RENDER
     ================================================================= */

  render: function () {
    var api = this.api;
    this._clearTimers();
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'ls-wrap');
    this._wrap = wrap;

    var modes = this.modesFor(this.premium);
    if (modes.length > 1) wrap.appendChild(this._buildModeStrip(modes));

    if (this.mode === 'names' && !this.nameSeq) wrap.appendChild(this._buildNamePicker());
    else wrap.appendChild(this._buildStudio());

    if (this.gateOpen) wrap.appendChild(this._buildGate());
    api.stage.appendChild(wrap);
  },

  _buildModeStrip: function (modes) {
    var self = this, api = this.api;
    var strip = api.el('div', 'ls-modes');
    for (var i = 0; i < modes.length; i++) {
      (function (m) {
        var b = api.el('button', 'ls-modebtn' + (self.mode === m ? ' ls-on' : ''));
        b.type = 'button';
        b.textContent = api.t(m === 'letters' ? 'modeLetters' : m === 'numbers' ? 'modeNumbers' : 'modeNames');
        b.addEventListener('click', function () {
          self.mode = m; self.nameSeq = null; self.nameAt = 0; self.index = 0; self._reset(); self.render();
        });
        strip.appendChild(b);
      })(modes[i]);
    }
    if (this.mode === 'letters') {
      var c = api.el('button', 'ls-casebtn');
      c.type = 'button';
      c.textContent = api.t(this.upper ? 'caseUpper' : 'caseLower');
      c.addEventListener('click', function () { self.upper = !self.upper; self.index = 0; self._reset(); self.render(); });
      strip.appendChild(c);
    }
    return strip;
  },

  _buildNamePicker: function () {
    var self = this, api = this.api;
    var box = api.el('div', 'ls-card');
    var roster = this.rosterFor(this._loadMC(), this._classId, this.premium);
    if (!roster.length) {
      var n = api.el('p', 'ls-lead'); n.textContent = api.t('noClass');
      box.appendChild(n);
      return box;
    }
    var lead = api.el('p', 'ls-lead'); lead.textContent = api.t('namesPick');
    box.appendChild(lead);
    var grid = api.el('div', 'ls-names');
    for (var i = 0; i < roster.length; i++) {
      (function (s) {
        var b = api.el('button', 'ls-name'); b.type = 'button';
        b.textContent = s.name;
        b.addEventListener('click', function () {
          self.selectedSid = s.id;
          var all = self.sequenceOf(s.name);
          self.nameSeq = all.filter(function (c) { return self._drawable(c); });
          /* ⚠ A roster is arbitrary text, so a letter we cannot draw is
             always possible. Dropping it silently is the harm: the child
             sees her full name, traces fewer letters than it has, and is
             then told she wrote the whole thing. Remember that we could
             not, and simply do not make that claim. (The Portuguese
             ensemble found this with Ângela, whose "â" had no glyph —
             now added, along with â î û ë ï ÿ and their capitals.) */
          self.namePartial = self.nameSeq.length !== all.length;
          self.nameAt = 0; self._reset(); self.render();
        });
        grid.appendChild(b);
      })(roster[i]);
    }
    box.appendChild(grid);
    var priv = api.el('p', 'ls-privacy'); priv.textContent = api.t('privacyLine');
    box.appendChild(priv);
    return box;
  },

  _buildStudio: function () {
    var self = this, api = this.api;
    var box = api.el('div', 'ls-card');
    var ch = this._current();
    if (!ch || !this.core) { box.appendChild(api.el('div', 'ls-loading')); return box; }

    if (this.mode === 'names' && this.nameSeq) {
      var who = api.el('p', 'ls-lead');
      who.textContent = this.fmt('letterOfName', { name: this._nameOf(), a: this.nameAt + 1, b: this.nameSeq.length });
      box.appendChild(who);
    }

    box.appendChild(this._buildSheet(ch));

    var row = api.el('div', 'ls-controls');
    var show = api.el('button', 'ls-go'); show.type = 'button';
    show.textContent = api.t('showMe');
    show.addEventListener('click', function () { self._demo(); });
    row.appendChild(show);

    var clear = api.el('button', 'ls-linkbtn'); clear.type = 'button';
    clear.textContent = api.t('clearBtn');
    clear.addEventListener('click', function () { self._reset(); self.render(); });
    row.appendChild(clear);

    if (this.premium) {
      var pr = api.el('button', 'ls-linkbtn'); pr.type = 'button';
      pr.textContent = api.t('printBtn');
      pr.addEventListener('click', function () { try { window.print(); } catch (_) {} });
      row.appendChild(pr);
    }
    box.appendChild(row);

    var hint = api.el('p', 'ls-hint');
    hint.textContent = this.state && this.state.formed
      ? api.t(this.mode === 'names' && !this.namePartial && this.nameAt + 1 >= this.nameSeq.length ? 'nameDone' : 'donePraise')
      : this.wandered ? api.t('keepGoing')
      : (this.state && this.state.strokesDone ? this.fmt('strokeOf', { a: this.state.strokesDone + 1, b: this._glyph(ch).length }) : api.t('startDot'));
    box.appendChild(hint);

    if (this.state && this.state.formed) {
      var next = api.el('button', 'ls-go'); next.type = 'button';
      next.textContent = api.t('nextOne');
      next.addEventListener('click', function () { self._next(); });
      box.appendChild(next);
    }
    return box;
  },

  _nameOf: function () {
    var roster = this.rosterFor(this._loadMC(), this._classId, this.premium);
    for (var i = 0; i < roster.length; i++) if (roster[i].id === this.selectedSid) return roster[i].name;
    return '';
  },

  _next: function () {
    if (this.mode === 'names' && this.nameSeq) {
      if (this.nameAt + 1 < this.nameSeq.length) this.nameAt++;
      else { this.nameSeq = null; this.nameAt = 0; }
    } else this.index++;
    this._reset();
    this.render();
  },

  /* ---- the sheet: ruling + guide letter + live ink ---- */
  _buildSheet: function (ch) {
    var self = this, api = this.api;
    var wrap = api.el('div', 'ls-sheet');
    var g = this._glyph(ch);
    var NS = 'http://www.w3.org/2000/svg';
    var sv = document.createElementNS(NS, 'svg');
    sv.setAttribute('viewBox', '0 0 100 110');
    sv.setAttribute('class', 'ls-svg');
    sv.setAttribute('role', 'img');
    sv.setAttribute('aria-label', ch);

    /* the ruling, first, behind everything */
    var ruling = this.rulingFor(api.lang);

    /* The tinted body band, BEHIND the lines. Several rulings are not just
       a set of lines: German Kontrastlineatur and the Dutch romphoogte
       shade the zone the small letters live in, and both native ensembles
       called it the most recognisable feature of their own sheet. A locale
       without one simply omits `band` and nothing is drawn. */
    if (ruling.band) {
      var bd = document.createElementNS(NS, 'rect');
      bd.setAttribute('x', '2'); bd.setAttribute('width', '96');
      bd.setAttribute('y', String(ruling.band.from));
      bd.setAttribute('height', String(ruling.band.to - ruling.band.from));
      bd.setAttribute('class', 'ls-band');
      sv.appendChild(bd);
    }

    for (var z = 0; z < ruling.zones.length; z++) {
      var zn = ruling.zones[z];
      var ln = document.createElementNS(NS, 'line');
      ln.setAttribute('x1', '2'); ln.setAttribute('x2', '98');
      ln.setAttribute('y1', String(zn.y)); ln.setAttribute('y2', String(zn.y));
      ln.setAttribute('class', 'ls-rule ls-rule-' + zn.tone + (zn.kind === 'dashed' ? ' ls-dashed' : ''));
      sv.appendChild(ln);
    }

    /* the guide letter — every stroke, faint */
    for (var i = 0; i < g.length; i++) {
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('d', this._d(g[i]));
      p.setAttribute('class', 'ls-guide');
      p.setAttribute('data-stroke', String(i));
      sv.appendChild(p);
    }

    /* strokes the child has already formed, inked */
    for (i = 0; i < this.drawn.length; i++) {
      var dp = document.createElementNS(NS, 'path');
      dp.setAttribute('d', this._d(this.drawn[i]));
      dp.setAttribute('class', 'ls-ink');
      sv.appendChild(dp);
    }

    /* the in-progress on-path samples */
    this._curPath = document.createElementNS(NS, 'path');
    this._curPath.setAttribute('class', 'ls-ink ls-ink-live');
    sv.appendChild(this._curPath);

    /* the green start dot for the NEXT stroke */
    if (this.state && !this.state.formed && g[this.state.strokesDone]) {
      var s0 = g[this.state.strokesDone][0];
      var dot = document.createElementNS(NS, 'circle');
      dot.setAttribute('cx', String(s0.x)); dot.setAttribute('cy', String(s0.y)); dot.setAttribute('r', '3.4');
      dot.setAttribute('class', 'ls-startdot');
      sv.appendChild(dot);
    }

    this._svg = sv;
    this._wireTrace(sv, ch);
    wrap.appendChild(sv);
    return wrap;
  },

  /* Catmull-Rom → cubic Bézier, passing THROUGH every point. COPIED from
     penny-alphabet-trace-activity.js:28-39 (copy, don't import — this page
     loads the core, not that activity).

     Not cosmetic. The core stores each stroke as sampled checkpoints, so
     straight M/L segments between them draw a visible POLYGON: at activity
     size a lowercase "a" passes for a circle, but this tool's whole point
     is one huge letter on a projector, where the same path reads as a
     heptagon and models the wrong letterform to a room of six-year-olds.
     The child's own ink is splined for the same reason — Catmull-Rom
     interpolates, so the line still passes exactly where their finger did. */
  _d: function (pts) {
    if (!pts || !pts.length) return '';
    if (pts.length < 3) return 'M ' + pts.map(function (p) { return p.x + ' ' + p.y; }).join(' L ');
    var d = 'M ' + pts[0].x + ' ' + pts[0].y, k, p0, p1, p2, p3, c1x, c1y, c2x, c2y;
    for (k = 0; k < pts.length - 1; k++) {
      p0 = pts[k - 1] || pts[k]; p1 = pts[k]; p2 = pts[k + 1]; p3 = pts[k + 2] || p2;
      c1x = p1.x + (p2.x - p0.x) / 6; c1y = p1.y + (p2.y - p0.y) / 6;
      c2x = p2.x - (p3.x - p1.x) / 6; c2y = p2.y - (p3.y - p1.y) / 6;
      d += ' C ' + c1x.toFixed(2) + ' ' + c1y.toFixed(2) + ' ' + c2x.toFixed(2) + ' ' + c2y.toFixed(2) + ' ' + p2.x + ' ' + p2.y;
    }
    return d;
  },

  /* THE LIVE INK. Every pointermove asks the core whether THIS sample is
     on the path; only then does the line join in. Off-path movement is
     simply not drawn — there is no buzzer, no red, no penalty. */
  _wireTrace: function (sv, ch) {
    var self = this;
    var toVB = function (ev) {
      var r = sv.getBoundingClientRect();
      return { x: ((ev.clientX - r.left) / r.width) * 100, y: ((ev.clientY - r.top) / r.height) * 110 };
    };
    sv.addEventListener('pointerdown', function (ev) {
      if (!self.state || self.state.formed) return;
      ev.preventDefault();
      self._drag = true; self.cur = [];
      try { sv.setPointerCapture(ev.pointerId); } catch (_) {}
      self._sample(toVB(ev), ch);
    });
    sv.addEventListener('pointermove', function (ev) {
      if (!self._drag) return;
      self._sample(toVB(ev), ch);
    });
    var end = function (ev) {
      if (!self._drag) return;
      self._drag = false;
      try { sv.releasePointerCapture(ev.pointerId); } catch (_) {}
      self._endStroke(ch);
    };
    sv.addEventListener('pointerup', end);
    sv.addEventListener('pointercancel', end);
  },

  _sample: function (pt, ch) {
    if (!this.state || !this.core.advance) return;
    var r = this.core.advance(this.state, this.state.strokesDone, pt);
    if (r.onPath) {
      this.cur.push(pt);
      if (this._curPath) this._curPath.setAttribute('d', this._d(this.cur));
    }
    if (r.done) { this._drag = false; this._endStroke(ch); }
  },

  _endStroke: function (ch) {
    /* A finger that never touched the path inks nothing — which is right,
       but silence alone reads as a broken screen to a six-year-old. Say
       WHY, once, in the hint line: the path is still there, the line is
       still willing. This is the whole of the feedback — there is no
       buzzer, no red, and nothing is taken away. */
    if (!this.state || !this.cur.length) { this.cur = []; this.wandered = true; this.render(); return; }
    var res = this.core.attemptStroke(this.state, this.state.strokesDone, this.cur);
    if (res === 'stroke-ok' || res === 'formed') {
      this.drawn.push(this.cur.slice());
      this.wandered = false;
      try { this.api.sound(660); } catch (_) {}
    } else this.wandered = true;
    this.cur = [];
    if (res === 'formed') {
      this._sayLetter(ch);
      this._say(this.api.t(this.mode === 'names' && this.nameSeq && !this.namePartial && this.nameAt + 1 >= this.nameSeq.length ? 'nameDone' : 'donePraise'));
    }
    this.render();
  },

  /* the firefly: walk each stroke in order, a chime per stroke */
  _demo: function () {
    var self = this, ch = this._current(), g = this._glyph(ch);
    if (!g || !this._svg) return;
    this._clearTimers();
    var NS = 'http://www.w3.org/2000/svg';
    var fly = document.createElementNS(NS, 'circle');
    fly.setAttribute('r', '3.2'); fly.setAttribute('class', 'ls-firefly');
    this._svg.appendChild(fly);
    var step = 0, seq = [];
    for (var i = 0; i < g.length; i++) for (var j = 0; j < g[i].length; j++) seq.push({ p: g[i][j], first: j === 0, s: i });
    seq.forEach(function (item, k) {
      self._after(k * 90, function () {
        fly.setAttribute('cx', String(item.p.x));
        fly.setAttribute('cy', String(item.p.y));
        if (item.first) { try { self.api.sound(880); } catch (_) {} }
      });
    });
    this._after(seq.length * 90 + 320, function () { if (fly.parentNode) fly.parentNode.removeChild(fly); });
    this._sayLetter(ch);
  },

  _buildGate: function () {
    var self = this, api = this.api;
    var scrim = api.el('div', 'ls-scrim');
    scrim.addEventListener('click', function (e) { if (e.target === scrim) { self.gateOpen = false; self.render(); } });
    var g = api.el('div', 'ls-gate');
    var p = api.el('p', 'ls-gate-line'); p.textContent = api.t('gateNames');
    g.appendChild(p);
    var a = api.el('a', 'ls-gate-cta');
    a.href = '/' + api.lang + '/pricing?from=tool-letter-studio';
    a.target = '_top'; a.textContent = api.t('unlock');
    g.appendChild(a);
    var c = api.el('button', 'ls-gate-close'); c.type = 'button';
    c.textContent = api.t('gateClose');
    c.addEventListener('click', function () { self.gateOpen = false; self.render(); });
    g.appendChild(c);
    scrim.appendChild(g);
    return scrim;
  },

  reset: function () {
    this.mode = 'letters'; this.index = 0; this.nameSeq = null; this.nameAt = 0;
    this._reset();
    if (this._wrap) this.render();
  },
  onSettings: function () { if (this._wrap) this.render(); }
};

function injectLetterStudioCSS() {
  if (document.getElementById('ls-style')) return;
  var st = document.createElement('style');
  st.id = 'ls-style';
  st.textContent = ''
    + '.ls-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;}'
    + '.ls-modes{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;}'
    + '.ls-modebtn,.ls-casebtn{font:600 14px/1 Nunito,system-ui,sans-serif;color:#146B5E;background:#FFFDF7;'
    + 'border:2px solid #146B5E22;border-radius:999px;padding:11px 18px;min-height:44px;cursor:pointer;}'
    + '.ls-modebtn.ls-on{background:#146B5E;color:#FFFDF7;border-color:#146B5E;}'
    /* The case control is a TOGGLE, not a third mode, and it was carrying a
       dashed border to say so — which on the projector read as a disabled
       placeholder sitting next to two live pills. Say it with a tinted fill
       instead: unmistakably pressable, still visibly not one of the modes. */
    + '.ls-casebtn{background:#EAF3F1;border-color:rgba(20,107,94,.45);}'

    + '.ls-card{position:relative;width:100%;max-width:620px;margin-inline:auto;background:#FFFDF7;'
    + 'border-radius:22px;box-shadow:0 6px 22px rgba(20,107,94,.10),0 1px 3px rgba(0,0,0,.06);'
    + 'padding:18px 16px 16px;display:flex;flex-direction:column;align-items:center;gap:12px;box-sizing:border-box;}'
    + '.ls-lead{font:600 clamp(15px,3.4vw,19px)/1.4 Nunito,system-ui,sans-serif;color:#146B5E;text-align:center;margin:0;}'

    + '.ls-sheet{width:min(420px,86vw);aspect-ratio:100/110;background:#FFFEFB;border:2px solid #146B5E1f;'
    + 'border-radius:16px;overflow:hidden;}'
    + '.ls-svg{width:100%;height:100%;display:block;touch-action:none;cursor:crosshair;}'
    + '.ls-band{fill:rgba(242,120,75,.07);}'
    + '.ls-rule{stroke-width:.6;}'
    + '.ls-rule-faint{stroke:rgba(20,107,94,.14);}'
    + '.ls-rule-mid{stroke:rgba(20,107,94,.22);}'
    + '.ls-rule-strong{stroke:rgba(20,107,94,.5);stroke-width:.9;}'
    + '.ls-dashed{stroke-dasharray:2 3;}'
    + '.ls-guide{fill:none;stroke:rgba(20,107,94,.18);stroke-width:7;stroke-linecap:round;stroke-linejoin:round;}'
    + '.ls-ink{fill:none;stroke:#F2784B;stroke-width:5.4;stroke-linecap:round;stroke-linejoin:round;}'
    + '.ls-ink-live{stroke:#F2A65A;}'
    + '.ls-startdot{fill:#2FA56A;}'
    + '.ls-firefly{fill:#F2C879;stroke:#E0A63C;stroke-width:.8;}'

    + '.ls-controls{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;}'
    + '.ls-go{font:700 15px/1 Nunito,system-ui,sans-serif;color:#FFFDF7;background:#F2784B;border:none;'
    + 'border-radius:999px;padding:14px 24px;min-height:44px;cursor:pointer;}'
    + '.ls-linkbtn{font:600 14px/1 Nunito,system-ui,sans-serif;color:#146B5E;background:#FFF9EE;'
    + 'border:2px solid #146B5E22;border-radius:999px;padding:12px 18px;min-height:44px;cursor:pointer;}'
    + '.ls-hint{font:600 clamp(14px,3.2vw,17px)/1.4 Nunito,system-ui,sans-serif;color:#3A3226;text-align:center;margin:0;max-width:34ch;}'

    + '.ls-names{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;}'
    + '.ls-name{font:700 15px/1 Nunito,system-ui,sans-serif;color:#1F2A28;background:#F7E9CF;'
    + 'border:2.5px solid #146B5E;border-radius:999px;padding:11px 18px;min-height:44px;cursor:pointer;}'
    + '.ls-privacy{font:500 12px/1.45 Nunito,system-ui,sans-serif;color:#7A6A55;text-align:center;margin:4px 0 0;max-width:44ch;}'

    + '.ls-scrim{position:fixed;inset:0;background:rgba(20,30,28,.45);display:grid;place-items:center;padding:18px;z-index:70;}'
    + '.ls-gate{background:#FFFDF7;border-radius:20px;max-width:420px;width:100%;padding:20px;text-align:center;z-index:71;}'
    + '.ls-gate-line{font:600 16px/1.45 Nunito,system-ui,sans-serif;color:#3A3226;margin:0 0 14px;}'
    + '.ls-gate-cta{display:inline-block;font:700 15px/1 Nunito,system-ui,sans-serif;color:#FFFDF7;background:#F2784B;'
    + 'border-radius:999px;padding:14px 22px;text-decoration:none;min-height:44px;box-sizing:border-box;}'
    + '.ls-gate-close{display:block;margin:12px auto 0;font:600 14px/1 Nunito,system-ui,sans-serif;color:#7A6A55;'
    + 'background:none;border:none;cursor:pointer;min-height:44px;}'

    + '@media (max-width:420px){'
    + '.ls-card{padding:14px 10px 12px;border-radius:18px;}'
    + '.ls-sheet{width:min(340px,90vw);}'
    + '}'
    + '@media (prefers-reduced-motion:reduce){.ls-firefly{display:none;}}'
    + '@media print{'
    + '.ls-modes,.ls-controls,.ls-scrim,.ls-names{display:none !important;}'
    + '.ls-card{box-shadow:none;border:1.5pt solid #666;page-break-inside:avoid;break-inside:avoid;}'
    + '.ls-ink{display:none !important;}'
    + '.ls-guide{stroke:rgba(0,0,0,.35);}'
    + '}';
  document.head.appendChild(st);
}
