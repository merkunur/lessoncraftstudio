/* =====================================================================
   TOOL #25 — LETTER STUDIO   (letter-studio.js)
   ---------------------------------------------------------------------
   Free-play manipulative (no `tasks` — the shell renders zero activity
   chrome). One huge letter on the writing guide the child's own country
   actually prints. A firefly walks the stroke order; then the child
   traces with a finger and the line inks ONLY where they have been.

   ---------------------------------------------------------------------
   WHAT THE 2026-08 REBUILD FIXED, AND WHY EACH ONE MATTERED

   1. THE COMPLAINT. "When I draw the lines it autocompletes the last
      parts of the lines." Measured: the tool drew 36.2% of every stroke
      FOR the child, 75% of capital I's serifs, and 14 strokes completed
      from a single tap. The judging moved to `stroke-trace-core.js`,
      which credits only arc length the finger actually swept. Read that
      file's header before touching anything here that feeds it.

   2. NUMBERS MODE WAS THEATRE. The renderer took digits from
      `NumberTraceCore`; the judge asked `AlphabetTraceCore` for the same
      key, got nothing, and fell back to lowercase "l". All ten digits
      were scored against a vertical line. The fix is structural, not a
      patched lookup: `_glyph()` returns ONE array and that SAME array is
      handed to both the renderer and the tracer. There is no lookup left
      to disagree with itself. Numbers also stops being a mode — the
      digits are the third band of the picker.

   3. THERE WAS NO LETTER PICKER. A teacher teaching /m/ pressed "Next
      one" twelve times in front of the class. Three of the four
      classroom ideas on this tool's own landing page were instructions a
      teacher could not follow. The picker is now the first control.

   4. THE PAYWALL LEAKED. The Print chip was premium-gated; the print
      stylesheet was injected for everybody, so Ctrl+P handed a free
      visitor the premium sheet. The stylesheet AND the sheet DOM are now
      built only when premium — absence is the gate.

   5. IT WAS 420px ON EVERY DESKTOP. `.ls-sheet` was capped flat at 420px
      and its wide tiers were keyed `min-width:1367px` — but the tool
      page pins this iframe at 704px at 1024, 1440, 1920 and 2560 alike,
      so those tiers could never match. They also demanded
      `min-height:880px`, which a 1280x800 classroom projector fails even
      standalone. Layout is now container queries on the element's OWN
      width, which is the only width that was ever true.

   6. A MID-STROKE LIFT DESTROYED THE WORK. A four-year-old who re-grips
      lost everything they had drawn. The tracer keeps it.

   7. THE GUIDE WAS 1.31:1 against the sheet — the lowest-contrast thing
      on a surface whose whole job is to be seen from the back of a
      classroom. See THE PALETTE below.

   ---------------------------------------------------------------------
   THE PALETTE (measured, not chosen — all ratios against #FFFEFB)

   A single translucent teal cannot both be visible at 3:1 AND stay out
   of the way of the child's ink: at the alpha that reaches 3:1 it is a
   grey slab the coral has to fight. So the guide is TWO things:

     the road      7.0u  rgba(20,107,94,.30)   1.58:1  — where to go
     the HAIRLINE  1.6u  rgba(20,107,94,.85)   4.56:1  — exactly where
     the ink       5.4u  #C64A22               4.73:1  — where they went

   The hairline is thin, so it never becomes a mass, and it carries the
   contrast duty on its own. The child's ink sits between them: over the
   road, under the hairline, so the exact path stays legible even after
   the letter is written. (#F2784B, the old ink, measured 2.75:1 and
   failed.)

   ---------------------------------------------------------------------
   NAMES ARE PII: the roster is READ from `lcs:my-classes:v1` and never
   written; that store belongs to Name Sticks. A free visitor never
   loads it at all, and `rosterFor` returns [] without a premium flag —
   the gate is in the model, not the UI.
   ===================================================================== */
var LetterStudio = {
  id: 'letter-studio',

  /* Deliberately small. Everything the CHILD reads is a letter, a
     numeral or a shape — §23.2, no words on the apparatus. Most of what
     is left is screen-reader labelling for controls that are icons or
     glyphs on screen. The old build carried a four-message hint line in
     prose to a reader who cannot read; every message it used to carry
     now has a counterpart ON the sheet (the green dot, the pips, the
     travelling arrows, the guide fading out when the letter is done). */
  strings: {
    title:        {en:'Letter Studio',de:'Buchstabenwerkstatt',fr:'L’atelier des lettres',it:'La bottega delle lettere',es:'Trazo a trazo',pt:'A oficina das letras',nl:'Het letterhuisje',sv:'Bokstavsverkstaden',da:'Bogstavværkstedet',no:'Skriveverkstedet',fi:'Kirjainpaja'},
    instruction:  {en:'Watch the firefly, then trace the letter with your finger.',de:'Schau zuerst dem Glühwürmchen zu, dann fahre den Buchstaben mit dem Finger nach.',fr:'Regarde la luciole, puis suis le chemin du doigt.',it:'Guarda la lucciola, poi ripassa la lettera con il dito.',es:'Mira la luciérnaga y luego traza la letra con el dedo.',pt:'Olhe o vaga-lume e depois trace a letra com o dedo.',nl:'Kijk naar het vuurvliegje. Trek de letter daarna na met je vinger.',sv:'Titta på lysmasken och skriv sedan bokstaven med fingret.',da:'Se, hvor ildfluen flyver, og skriv så bogstavet med fingeren.',no:'Se på ildflua først, og skriv så bokstaven med fingeren.',fi:'Katso kiiltomatoa ja piirrä sitten kirjain sormella.'},

    /* screen-reader labels for controls that carry a glyph or an icon */
    a11ySheet:    {en:'Tracing sheet. Trace the letter {g} with your finger, starting at the green dot.',de:'Schreibblatt. Fahre den Buchstaben {g} mit dem Finger nach, beginne am grünen Punkt.',fr:'Feuille d’écriture. Suis la lettre {g} du doigt en partant du point vert.',it:'Foglio di scrittura. Ripassa la lettera {g} con il dito partendo dal punto verde.',es:'Hoja de trazo. Traza la letra {g} con el dedo empezando en el punto verde.',pt:'Folha de traçado. Trace a letra {g} com o dedo começando no ponto verde.',nl:'Schrijfblad. Trek de letter {g} na met je vinger, begin bij de groene stip.',sv:'Skrivblad. Skriv bokstaven {g} med fingret och börja vid den gröna pricken.',da:'Skriveark. Skriv bogstavet {g} med fingeren, og start ved den grønne prik.',no:'Skriveark. Skriv bokstaven {g} med fingeren, og start på den grønne prikken.',fi:'Kirjoitusarkki. Piirrä kirjain {g} sormella vihreästä pisteestä alkaen.'},
    a11yPicker:   {en:'Choose a letter or a number',de:'Buchstaben oder Zahl wählen',fr:'Choisir une lettre ou un chiffre',it:'Scegli una lettera o un numero',es:'Elegir una letra o un número',pt:'Escolher uma letra ou um número',nl:'Kies een letter of een cijfer',sv:'Välj en bokstav eller en siffra',da:'Vælg et bogstav eller et tal',no:'Velg en bokstav eller et tall',fi:'Valitse kirjain tai numero'},
    a11yMore:     {en:'Show every letter',de:'Alle Buchstaben zeigen',fr:'Afficher toutes les lettres',it:'Mostra tutte le lettere',es:'Mostrar todas las letras',pt:'Mostrar todas as letras',nl:'Alle letters tonen',sv:'Visa alla bokstäver',da:'Vis alle bogstaver',no:'Vis alle bokstavene',fi:'Näytä kaikki kirjaimet'},
    a11yDemo:     {en:'Show me how',de:'Zeig mir wie',fr:'Montre-moi',it:'Fammi vedere',es:'Muéstrame cómo',pt:'Me mostra como',nl:'Doe het voor',sv:'Visa hur',da:'Vis hvordan',no:'Vis meg hvordan',fi:'Näytä malli'},
    a11yUndo:     {en:'Start this letter again',de:'Diesen Buchstaben neu beginnen',fr:'Recommencer cette lettre',it:'Ricomincia questa lettera',es:'Empezar esta letra de nuevo',pt:'Recomeçar esta letra',nl:'Deze letter opnieuw',sv:'Börja om med bokstaven',da:'Start bogstavet forfra',no:'Start bokstaven på nytt',fi:'Aloita kirjain alusta'},
    a11yNext:     {en:'Next: {g}',de:'Weiter: {g}',fr:'Ensuite : {g}',it:'Avanti: {g}',es:'Siguiente: {g}',pt:'A seguir: {g}',nl:'Volgende: {g}',sv:'Nästa: {g}',da:'Næste: {g}',no:'Neste: {g}',fi:'Seuraava: {g}'},
    a11yCase:     {en:'Small or capital',de:'Klein oder groß',fr:'Minuscule ou majuscule',it:'Minuscola o maiuscola',es:'Minúscula o mayúscula',pt:'Minúscula ou maiúscula',nl:'Klein of hoofdletter',sv:'Liten eller stor',da:'Lille eller stort',no:'Liten eller stor',fi:'Pieni vai iso'},
    a11yPrint:    {en:'Printable sheet',de:'Druckvorlage',fr:'Fiche à imprimer',it:'Scheda da stampare',es:'Ficha para imprimir',pt:'Ficha para imprimir',nl:'Werkblad printen',sv:'Skriv ut skrivblad',da:'Skriveark til print',no:'Ark til utskrift',fi:'Tulostettava sivu'},
    a11yDone:     {en:'You wrote {g}.',de:'Du hast {g} geschrieben.',fr:'Tu as écrit {g}.',it:'Hai scritto {g}.',es:'Escribiste {g}.',pt:'Você escreveu {g}.',nl:'Je hebt {g} geschreven.',sv:'Du skrev {g}.',da:'Du skrev {g}.',no:'Du skrev {g}.',fi:'Kirjoitit {g}.'},

    /* names — premium chrome, and the PII honesty line */
    namesPick:    {en:'Whose name shall we write?',de:'Wessen Namen schreiben wir?',fr:'Quel prénom écrit-on ?',it:'Quale nome scriviamo?',es:'¿Qué nombre escribimos?',pt:'Qual nome vamos escrever?',nl:'Van wie schrijven we de naam?',sv:'Vems namn ska vi skriva?',da:'Hvis navn skal vi skrive?',no:'Hvilket navn skal vi skrive?',fi:'Kenen nimen kirjoitamme?'},
    privacyLine:  {en:'Names come from your class list on this device and never leave it.',de:'Die Namen stammen aus Ihrer Klassenliste auf diesem Gerät und verlassen es nie.',fr:'Les prénoms viennent de votre liste de classe sur cet appareil et n’en sortent jamais.',it:'I nomi arrivano dall’elenco della classe salvato su questo dispositivo e non escono mai da qui.',es:'Los nombres vienen de tu lista del grupo en este dispositivo y nunca salen de aquí.',pt:'Os nomes vêm da lista da sua turma neste aparelho e nunca saem dele.',nl:'De namen komen uit je klassenlijst op dit apparaat en blijven daar.',sv:'Namnen hämtas från klasslistan på den här enheten och skickas aldrig vidare.',da:'Navnene kommer fra din klasseliste og bliver på denne enhed.',no:'Navnene kommer fra klasselista på denne enheten og blir aldri sendt videre.',fi:'Nimet tulevat tämän laitteen luokkalistalta eivätkä poistu siitä koskaan.'},
    noClass:      {en:'Add a class in Name Sticks first — this studio reads the same list.',de:'Legen Sie zuerst in den Namensstäbchen eine Klasse an – diese Werkstatt liest dieselbe Liste.',fr:'Créez d’abord une classe dans les Bâtonnets de prénoms : cet atelier lit la même liste.',it:'Crea prima una classe in Bastoncini dei nomi: questa bottega legge lo stesso elenco.',es:'Crea primero un grupo en Palitos con nombre: aquí se lee esa misma lista.',pt:'Primeiro, crie uma turma em Palitos de nomes — esta oficina lê a mesma lista.',nl:'Maak eerst een klas aan in Beurtenstokjes — het letterhuisje leest dezelfde lijst.',sv:'Skapa först en klass i Namnpinnar — den här verkstaden läser samma lista.',da:'Opret først en klasse i Navnepinde — dette værksted læser den samme liste.',no:'Lag først en klasse i Navnepinner – dette verkstedet leser den samme lista.',fi:'Luo ensin luokka Nimitikuissa – tämä paja käyttää samaa listaa.'},
    a11yWord:     {en:'Type a word to trace',de:'Wort zum Nachfahren eingeben',fr:'Écris un mot à tracer',it:'Scrivi una parola da ripassare',es:'Escribe una palabra para trazar',pt:'Escreva uma palavra para traçar',nl:'Typ een woord om na te trekken',sv:'Skriv ett ord att skriva av',da:'Skriv et ord, der skal skrives',no:'Skriv et ord som skal skrives',fi:'Kirjoita jäljennettävä sana'},

    /* the gate. INLINE — never a scrim with a price projected in front
       of 25 children. */
    gateNames:    {en:'Class names and the printable sheets are part of Premium. Every letter, every number and any word you type stay free.',de:'Klassennamen und die Druckvorlagen gehören zu Premium. Alle Buchstaben, alle Zahlen und jedes selbst eingetippte Wort bleiben kostenlos.',fr:'Les prénoms de la classe et les fiches à imprimer font partie de Premium. Toutes les lettres, tous les chiffres et n’importe quel mot que vous tapez restent gratuits.',it:'I nomi della classe e le schede da stampare fanno parte di Premium. Tutte le lettere, tutti i numeri e qualsiasi parola scritta da voi restano gratis.',es:'Los nombres del grupo y las fichas para imprimir son parte de Premium. Todas las letras, todos los números y cualquier palabra que escribas siguen siendo gratis.',pt:'Os nomes da turma e as fichas para imprimir fazem parte do Premium. Todas as letras, todos os números e qualquer palavra que você escrever continuam gratuitos.',nl:'Klassennamen en de printbladen horen bij Premium. Alle letters, alle cijfers en elk woord dat je zelf typt blijven gratis.',sv:'Klassens namn och utskriftsarken ingår i Premium. Alla bokstäver, alla siffror och vilket ord du än skriver är fortsatt gratis.',da:'Klassens navne og skrivearkene til print hører til Premium. Alle bogstaver, alle tal og ethvert ord, du selv skriver, er stadig gratis.',no:'Navnene i klassen og arkene til utskrift hører til Premium. Alle bokstaver, alle tall og alle ord du selv skriver, er fortsatt gratis.',fi:'Luokan nimet ja tulostettavat arkit kuuluvat Premiumiin. Kaikki kirjaimet, kaikki numerot ja itse kirjoittamasi sanat pysyvät ilmaisina.'},
    unlock:       {en:'See Premium',de:'Premium ansehen',fr:'Voir Premium',it:'Scopri Premium',es:'Ver Premium',pt:'Ver o Premium',nl:'Bekijk Premium',sv:'Se Premium',da:'Se Premium',no:'Se Premium',fi:'Tutustu Premiumiin'},

    /* settings */
    setVoice:     {en:'Say the letter',de:'Buchstaben und Zahlen vorlesen',fr:'Dire à voix haute',it:'Pronuncia il nome della lettera',es:'Decir la letra',pt:'Dizer a letra',nl:'Letter hardop zeggen',sv:'Säg bokstaven',da:'Sig bogstavet',no:'Si navnet på bokstaven',fi:'Sano ääneen'},
    setArrows:    {en:'Show stroke numbers and arrows',de:'Strichfolge mit Zahlen und Pfeilen zeigen',fr:'Afficher les numéros et les flèches',it:'Mostra numeri e frecce dei tratti',es:'Mostrar números y flechas de los trazos',pt:'Mostrar números e setas dos traços',nl:'Cijfers en pijlen bij de streken tonen',sv:'Visa siffror och pilar för dragen',da:'Vis tal og pile for stregerne',no:'Vis tall og piler for strekene',fi:'Näytä vetojen numerot ja nuolet'},
    setWide:      {en:'Wider path for small hands',de:'Breitere Spur für kleine Hände',fr:'Chemin plus large pour les petites mains',it:'Percorso più largo per le mani piccole',es:'Camino más ancho para manos pequeñas',pt:'Caminho mais largo para mãos pequenas',nl:'Breder pad voor kleine handen',sv:'Bredare spår för små händer',da:'Bredere spor til små hænder',no:'Bredere spor for små hender',fi:'Leveämpi polku pienille käsille'}
  },

  MC_KEY: 'lcs:my-classes:v1',       /* READ ONLY. getItem only, ever. */
  STORE_KEY: 'lcs:letter-studio:v1', /* the ONLY key this tool writes   */
  ENT_TRUST_DAYS: 14,

  defaults: { voice: true, arrows: true, wide: false },
  settings: [
    { key: 'voice',  labelKey: 'setVoice',  type: 'toggle' },
    { key: 'arrows', labelKey: 'setArrows', type: 'toggle' },
    { key: 'wide',   labelKey: 'setWide',   type: 'toggle' }
  ],

  premium: false,

  /* =================================================================
     THE RULING — per-locale writing guides. The best thing in the old
     file and unchanged: ten native ensembles ruled their own national
     paper, and six independently reported that a DASHED midline is an
     Anglo convention their country does not print. Spain boxes lowercase
     between two equally strong lines; Brazil has no x-height line at
     all; Finland's OPH grid draws four IDENTICAL lines with no
     emphasised baseline. A locale whose ensemble could cite no national
     convention keeps the neutral 3-zone default ON PURPOSE — an honest
     placeholder beats a confident guess.

     Zones are in the SAME 0..100 box as the glyphs, so the guide and the
     letterform agree by construction.
     ================================================================= */
  RULING: {
    de: { system: 'lineatur-1', zones: [{ y: 14, kind: 'solid', tone: 'faint' }, { y: 44, kind: 'solid', tone: 'mid' }, { y: 84, kind: 'solid', tone: 'strong' }, { y: 96, kind: 'solid', tone: 'faint' }], band: { from: 44, to: 84 } },
    fr: { system: 'seyes-agrandi', zones: [{ y: 14, kind: 'dashed', tone: 'mid' }, { y: 29, kind: 'dashed', tone: 'faint' }, { y: 44, kind: 'dashed', tone: 'mid' }, { y: 84, kind: 'solid', tone: 'strong' }, { y: 96, kind: 'dashed', tone: 'faint' }] },
    it: { system: 'rigatura-prima', zones: [{ y: 14, kind: 'solid', tone: 'faint' }, { y: 44, kind: 'solid', tone: 'mid' }, { y: 84, kind: 'solid', tone: 'strong' }, { y: 96, kind: 'solid', tone: 'faint' }] },
    es: { system: 'doble-raya', zones: [{ y: 14, kind: 'solid', tone: 'faint' }, { y: 44, kind: 'solid', tone: 'strong' }, { y: 84, kind: 'solid', tone: 'strong' }] },
    pt: { system: 'pauta-numerada-1-2-3', zones: [{ y: 14, kind: 'solid', tone: 'faint' }, { y: 84, kind: 'solid', tone: 'strong' }, { y: 96, kind: 'solid', tone: 'faint' }], band: { from: 44, to: 84 } },
    nl: { system: 'nl-blokschrift-liniatuur', zones: [{ y: 14, kind: 'dashed', tone: 'faint' }, { y: 44, kind: 'solid', tone: 'mid' }, { y: 84, kind: 'solid', tone: 'strong' }, { y: 96, kind: 'dashed', tone: 'faint' }] },
    sv: { system: 'stodlinjerat', zones: [{ y: 14, kind: 'solid', tone: 'faint' }, { y: 44, kind: 'solid', tone: 'faint' }, { y: 84, kind: 'solid', tone: 'strong' }, { y: 96, kind: 'solid', tone: 'faint' }] },
    da: { system: 'skrivehus', zones: [{ y: 14, kind: 'dashed', tone: 'faint' }, { y: 44, kind: 'dashed', tone: 'mid' }, { y: 84, kind: 'solid', tone: 'strong' }, { y: 96, kind: 'dashed', tone: 'faint' }] },
    no: { system: 'skrivehus', zones: [{ y: 14, kind: 'dashed', tone: 'faint' }, { y: 44, kind: 'dashed', tone: 'mid' }, { y: 84, kind: 'solid', tone: 'strong' }, { y: 96, kind: 'dashed', tone: 'faint' }] },
    fi: { system: 'viivasto-4', zones: [{ y: 14, kind: 'solid', tone: 'mid' }, { y: 44, kind: 'solid', tone: 'mid' }, { y: 84, kind: 'solid', tone: 'mid' }, { y: 96, kind: 'solid', tone: 'mid' }], band: { from: 44, to: 84 } },
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

  /* The eight marks. Offsets are FRACTIONS of the band available above
     the base, because an uppercase cap top sits at y=16 and a mark sized
     for lowercase runs off the sheet (measured: a fixed-offset circumflex
     put Ê and Ô at y=-1).

     The two diaeresis dots carry their own tolerance: at a shared 18u two
     dots 20u apart were MUTUALLY SATISFIABLE — one tap between them
     completed both — so they were not two strokes at all. */
  DOT_TOL: 8,
  MARK_CEIL: 4.5,     /* nothing may be drawn above this: see _buildSheet */
  MARKS: {
    /* grave/acute — the LEAN was already right (grave falls left-to-right,
       acute rises). The PROPORTION was not: at H=16 the grave measured 11.2
       units long against a 7-wide stroke, and a 1.6:1 mark is a lozenge, not
       an accent. Longer, and pitched across more of the band. */
    grave:      function (b, H) { return [[{ x: b.cx - 5, y: b.top - H }, { x: b.cx + 4, y: b.top - H * 0.55 }]]; },
    acute:      function (b, H) { return [[{ x: b.cx - 4, y: b.top - H * 0.55 }, { x: b.cx + 5, y: b.top - H }]]; },
    /* ⚠ FOUR points, not three. With three, the Catmull-Rom's control
       vectors at the apex are horizontal and the circumflex renders as a
       BREVE — â drew ă. Doubling the apex pins the corner. (The 0.4 offset
       rather than an exact repeat keeps every segment non-degenerate, which
       the tracer's swept-segment test prefers.) Legs widened to ±7 and
       dropped to 0.55 of the band so it reads as a caret at sheet size. */
    circumflex: function (b, H) { return [[{ x: b.cx - 7, y: b.top - H * 0.55 }, { x: b.cx, y: b.top - H }, { x: b.cx + 0.4, y: b.top - H }, { x: b.cx + 7, y: b.top - H * 0.55 }]]; },
    /* diaeresis — the dots keep the full width and their round caps; what
       changes is that the SEPARATION now tracks the letter instead of being a
       fixed 10, which on `ï` (base bbox width ZERO — a bare stem) planted them
       20 units apart, far outside the letter. They are also centred on y now
       rather than hanging below it.
       ⚠ THE FLOOR IS 9, AND DOT_TOL IS WHAT SETS IT — not taste. Two dots 2d
       apart are separate strokes only while DOT_TOL < d; otherwise one tap
       BETWEEN them satisfies both and the umlaut is not two strokes for a
       child either. The panel's floor of 6 puts that tap 6 units from each,
       inside DOT_TOL=8, and G6b catches it. 9 is the tightest this permits. */
    diaeresis:  function (b, H) {
      var y = b.top - H * 0.70,
          d = Math.max(9, Math.min(11, (b.x1 - b.x0) * 0.26));
      return [[{ x: b.cx - d, y: y - 0.75 }, { x: b.cx - d, y: y + 0.75 }],
              [{ x: b.cx + d, y: y - 0.75 }, { x: b.cx + d, y: y + 0.75 }]];
    },
    /* tilde — ONE oscillation, terminals passing through mid-height. The old
       four points ran y+3, y-2, y+3, y-2: low, high, low, high, TERMINATING AT
       THE EXTREMES. That is two oscillations cut flat at the turns, and it
       read as a squiggle rather than a tilde. Width tracks the letter. */
    tilde:      function (b, H) {
      var y = b.top - H * 0.70, a = H * 0.20,
          w = Math.max(8, Math.min(11, (b.x1 - b.x0) * 0.26));
      return [[{ x: b.cx - w,        y: y + a * 0.7 },
               { x: b.cx - w * 0.55, y: y - a },
               { x: b.cx,            y: y },
               { x: b.cx + w * 0.55, y: y + a },
               { x: b.cx + w,        y: y - a * 0.7 }]];
    },
    /* ring — circular and counter-clockwise, both already right. What was
       wrong was SIZE and PLACEMENT: r = min(5, H*0.34) gave a lowercase ring
       25% of the x-height against an uppercase one only 13% of the cap
       height — half the size it should be relative to its own letter — and at
       cy = top - H*0.55 the lowercase ring's ink ran to 43.7 against the a's
       ink top of 40.5, a 3.2-unit COLLISION.
       ⚠ The floor is r + MARK_CEIL, not the panel's r + 3: its clearance
       table assumes a .ls-mark class at stroke-width 4.5, which is NOT part of
       this change — every mark still paints at .ls-road's 7. At r+3 an Å ring
       centres at y=7 and paints to y=-0.5, off the top of the sheet. */
    ring:       function (b, H) {
      var CEIL = (this && this.MARK_CEIL) || 4.5;
      var r  = Math.max(4, Math.min(6, H * 0.32)),
          cy = Math.max(r + CEIL, b.top - r - 7), p = [], i, t;
      for (i = 0; i <= 12; i++) {
        t = (300 - 360 * i / 12) * Math.PI / 180;
        p.push({ x: Math.round((b.cx + r * Math.cos(t)) * 10) / 10,
                 y: Math.round((cy   + r * Math.sin(t)) * 10) / 10 });
      }
      return [p];
    },
    /* ø: a stroke THROUGH the bowl, not above it — the best-judged mark in
       the file. For the rebuilt `o` it runs (25,89)->(75,39), 43.8 degrees
       against the bowl's own box diagonal of 45, so it tracks the letter. Its
       one defect was an asymmetric extension (+4/-4 in x but +2/-4 in y).
       It keeps the FULL stroke width: the slash of ø is part of the letter.
       ⚠ AND IT IS SAMPLED. Two points spanning the whole bowl was the largest
       checkpoint gap in the entire table — 96 units on Ø, against a rule of 15
       — so under the checkpoint judge a child could touch the two ends and be
       credited with the slash. The live tracer flattens for itself and does
       not care, but `traceScore` reads these points directly. Sampling a
       straight cannot change how it LOOKS (Catmull-Rom is exact on collinear
       points); it only stops the stroke being two taps. */
    stroke:     function (b) {
      var x0 = b.x0 - 5, y0 = b.base + 5, x1 = b.x1 + 5, y1 = b.top - 5,
          n = Math.max(2, Math.ceil(Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)) / 12)),
          p = [], i;
      for (i = 0; i <= n; i++) p.push({ x: Math.round((x0 + (x1 - x0) * i / n) * 10) / 10,
                                        y: Math.round((y0 + (y1 - y0) * i / n) * 10) / 10 });
      return [p];
    },
    /* ç: a hook BELOW the baseline. Direction and depth were right; the shape
       was a smooth quarter-turn rather than a hook that curls back up, which
       five points give it.
       It hangs from `footX` — the x of the letter's LOWEST point — not from
       the bbox centre. The panel condemned the centre anchor on `c` (bbox cx
       45 against a foot at x=50); the rebuilt `c` happens to make those equal,
       but `C` still measures cx 44.3 against a foot at 50, so the defect
       outlives the letter it was reported on. The foot closes it for both. */
    cedilla:    function (b) {
      var x = (typeof b.footX === 'number' ? b.footX : b.cx), y = b.base;
      return [[{ x: x,       y: y - 1 },
               { x: x + 1.5, y: y + 4 },
               { x: x - 1,   y: y + 8 },
               { x: x - 6,   y: y + 8.5 },
               { x: x - 8,   y: y + 5 }]];
    }
  },

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

  /* ⚠ i and j lose their DOT under a mark: í is a stem plus an acute,
     never a stem plus a dot plus an acute. */
  DOTTED: { i: 1, j: 1 },

  /* The three authored letterforms, rebuilt to the same ruling as the 52.
     Written with the SAME two helpers alphabet-trace-core builds its glyphs
     from, privately, because this object literal is evaluated before any core
     is guaranteed loaded — a hand-typed point list is what let the old æ ship
     a 21-unit a-bowl beside a 25-unit e-bowl and a 38-unit stem carrying TWO
     checkpoints. */
  NOVEL: (function () {
    function rnd(v) { return Math.round(v * 10) / 10; }
    function arc(cx, cy, rx, ry, d0, d1, n) {
      var pts = [], i, t;
      for (i = 0; i <= n; i++) { t = (d0 + (d1 - d0) * i / n) * Math.PI / 180; pts.push({ x: rnd(cx + rx * Math.cos(t)), y: rnd(cy + ry * Math.sin(t)) }); }
      return pts;
    }
    function line(x0, y0, x1, y1, n) {
      var pts = [], i;
      for (i = 0; i <= n; i++) pts.push({ x: rnd(x0 + (x1 - x0) * i / n), y: rnd(y0 + (y1 - y0) * i / n) });
      return pts;
    }
    return {
      /* æ — a-bowl (rx 15, tangent to the shared stem) + shared stem + an e at
         o-less-4. The old one crushed both halves into 47 units for a ligature
         of two letters that are 32 and 36 standing alone, and its a-bowl
         bottomed at 80 while its own stem ran to 84. Now 18..82, both halves
         on 44 and 84. */
      'æ': [arc(33, 64, 15, 20, 300, -60, 12),
            line(48, 44, 48, 84, 4),
            line(48, 64, 82, 64, 3).concat(arc(65, 64, 17, 20, 0, -300, 10).slice(1))],

      /* Æ — ONE bar height for both halves. The real defect was that the A's
         crossbar sat at y=56 and the E's middle arm at y=50: two near-parallel
         bars six units apart, which reads as a mistake because it is one. The
         E half was also 20 units wide against a standalone E's 35. Now 22..78,
         and the left diagonal passes x=32.6 at y=54, so the crossbar at 32
         lands flush with its outer edge. */
      'Æ': [line(46, 16, 22, 84, 5),
            line(46, 16, 46, 84, 5),
            line(32, 54, 46, 54, 2),
            line(46, 16, 78, 16, 3),
            line(46, 54, 74, 54, 3),
            line(46, 84, 78, 84, 3)],

      /* ß — STEM-FIRST, consistent with b/h/k. The old stroke 1 started at
         (34,96), the LOWEST point of the glyph, and travelled up: defensible
         as the long-s motion, but it was the only glyph in the file that began
         at its own floor, and the green start dot appearing down at the
         descender line reads as an error. The waist also sat at y=52, 20% down
         the x-height, where it belongs near 56; the lower bowl bottomed at 82.
         Stroke 3 starts 2 units from stroke 2's terminus — inside one stroke
         width, so they merge. */
      'ß': [line(30, 22, 30, 96, 8),
            arc(44, 37, 14, 19, 180, 450, 9),
            arc(46, 70, 16, 14, 270, 500, 10)]
    };
  }()),

  /* `footX` is the x of the letter's LOWEST point — where a cedilla hangs
     from. It is NOT the bbox centre: on `C` the centre is 44.3 while the
     foot is 50, so a centre-anchored hook dangles 5.7 units off the letter. */
  bboxOf: function (strokes) {
    var x0 = Infinity, x1 = -Infinity, top = Infinity, base = -Infinity, footX = 0, i, j, p;
    for (i = 0; i < strokes.length; i++) for (j = 0; j < strokes[i].length; j++) {
      p = strokes[i][j];
      if (p.x < x0) x0 = p.x; if (p.x > x1) x1 = p.x;
      if (p.y < top) top = p.y;
      if (p.y > base) { base = p.y; footX = p.x; }
    }
    return { x0: x0, x1: x1, top: top, base: base, cx: (x0 + x1) / 2, footX: footX };
  },

  compose: function (baseStrokes, baseChar, markName) {
    var body = baseStrokes;
    if (this.DOTTED[baseChar]) body = baseStrokes.slice(0, baseStrokes.length - 1);
    var mark = this.MARKS[markName];
    if (!mark) return null;
    var bb = this.bboxOf(body);
    /* The band actually available above the letter, never off the sheet.
       ⚠ TWO DIFFERENT CONSTRAINTS BIND AT THE TWO CASES, and only one of
       them is a choice. Over LOWERCASE (base top 44) there is room to spare,
       so the ceiling is the panel's ruling of 20 — the old 16 is what made
       the accents read as lozenges. Over a CAP (base top 16) nothing is
       chosen at all: MARK_CEIL is subtracted and the band comes out at 11.5,
       so the mark's apex lands exactly on the ceiling. The panel's listing
       said 12, which would put it at y=4.0 and breach that ceiling by half a
       unit; MARK_CEIL is the shipped invariant and wins. */
    var H = Math.max(8, Math.min(20, bb.top - this.MARK_CEIL));
    /* .call so a mark can read MARK_CEIL rather than re-hardcoding it */
    var strokes = mark.call(this, bb, H);
    if (markName === 'diaeresis') for (var i = 0; i < strokes.length; i++) strokes[i].tol = this.DOT_TOL;
    return body.concat(strokes);
  },

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

  /* a digraph is a letter SEQUENCE, never a glyph */
  sequenceOf: function (grapheme) {
    var out = [], i;
    for (i = 0; i < grapheme.length; i++) out.push(grapheme.charAt(i));
    return out;
  },

  /* ⚠ 'ß'.toUpperCase() is 'SS' — TWO characters. Uppercasing a tray
     naively drops that key silently, so German capitals went from 30 to
     29 with nothing to show for it. Return the original so the caller can
     render it disabled at full ink rather than vanish it. */
  upperOf: function (ch) {
    var u = ch.toUpperCase();
    return u.length === 1 ? u : ch;
  },
  hasCapital: function (ch) { return this.upperOf(ch) !== ch; },

  /* THE STRUCTURAL GATE — a free visitor gets no roster, ever. */
  modesFor: function (premium) { return premium ? ['letters', 'word', 'names'] : ['letters', 'word']; },

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
    if (['letters', 'word', 'names'].indexOf(m) < 0) return null;
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
    this.api = api;
    injectLetterStudioCSS();
    document.body.classList.add('ls-wide');

    this.core = (typeof AlphabetTraceCore !== 'undefined') ? AlphabetTraceCore : null;
    this.numCore = (typeof NumberTraceCore !== 'undefined') ? NumberTraceCore : null;
    this.tracer = (typeof StrokeTraceCore !== 'undefined') ? StrokeTraceCore : null;
    if (this.core) this.installGlyphs(this.core);

    this.mode = 'letters';
    this.upper = false;
    this.tray = null;
    this.index = 0;
    this.trace = null;        /* the tracer state for the CURRENT glyph  */
    this.drawn = [];          /* accepted strokes, for the inked letter  */
    this.cur = [];            /* the in-progress on-path samples         */
    this.seq = null;          /* names / typed word: the glyph sequence  */
    this.seqAt = 0;
    this.seqLabel = '';
    this.seqPartial = false;
    this.selectedSid = null;
    this.pickerOpen = false;
    this.stalls = 0;
    this._mc = null;          /* LAZY — a free visitor never loads it    */
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

  _loadMC: function () {
    if (!this.premium) return null;
    if (this._mc) return this._mc;
    try { this._mc = JSON.parse(localStorage.getItem(this.MC_KEY)); } catch (_) { this._mc = null; }
    return this._mc;
  },

  _loadTray: function () {
    var self = this, loc = this.api.lang;
    fetch('/mini-tools/letter-tiles-' + loc + '.json', { cache: 'force-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { self.tray = (j && j.tray) ? j.tray : null; self._settle(); })
      .catch(function () { self.tray = null; self._settle(); });
  },

  /* the locale's own letter inventory, split into the picker's bands */
  bands: function () {
    var base = [], own = [], i, g, seen = {};
    var az = 'abcdefghijklmnopqrstuvwxyz';
    if (this.tray) {
      for (i = 0; i < this.tray.length; i++) {
        g = this.tray[i].g;
        if (!g || g.length !== 1) continue;
        var shown = this.upper ? this.upperOf(g) : g;
        if (seen[shown]) continue;
        seen[shown] = 1;
        (az.indexOf(g) >= 0 ? base : own).push({ g: shown, src: g, kind: this.tray[i].kind });
      }
    }
    if (!base.length) for (i = 0; i < az.length; i++)
      base.push({ g: this.upper ? az.charAt(i).toUpperCase() : az.charAt(i), src: az.charAt(i), kind: 'aeiou'.indexOf(az.charAt(i)) >= 0 ? 'vowel' : 'consonant' });
    var digits = [];
    for (i = 0; i <= 9; i++) digits.push({ g: String(i), src: String(i), kind: 'digit' });
    return [base, own, digits];
  },

  /* every pickable glyph, flat, in picker order */
  keys: function () {
    var b = this.bands();
    return b[0].concat(b[1]).concat(b[2]);
  },

  isDigit: function (ch) { return ch >= '0' && ch <= '9'; },

  /* ⭐ ONE ARRAY. The renderer and the judge are handed the SAME object,
     so they cannot be looking at different glyphs — which is exactly what
     went wrong before: digits were drawn from NumberTraceCore and judged
     against AlphabetTraceCore's fallback, lowercase "l". */
  _glyph: function (ch) {
    if (ch == null) return null;
    if (this.isDigit(ch)) {
      if (!this.numCore) return null;
      return this.numCore.glyphFor ? this.numCore.glyphFor(ch, this.api.lang)
                                   : (this.numCore.GLYPHS && this.numCore.GLYPHS[ch]) || null;
    }
    return (this.core && this.core.GLYPHS[ch]) || null;
  },
  _drawable: function (ch) { return !!this._glyph(ch); },

  _current: function () {
    if (this.seq) return this.seq[this.seqAt] || null;
    var k = this.keys();
    if (!k.length) return null;
    return k[((this.index % k.length) + k.length) % k.length].g;
  },
  _nextGlyph: function () {
    if (this.seq) return this.seq[this.seqAt + 1] || null;
    var k = this.keys();
    if (!k.length) return null;
    return k[((this.index + 1) % k.length + k.length) % k.length].g;
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
    var ch = this._current(), g = this._glyph(ch);
    this.trace = (this.tracer && g) ? this.tracer.newTrace(g, { corridor: this.api.settings.wide ? this.tracer.WIDE : this.tracer.CORRIDOR }) : null;
    this.drawn = [];
    this.cur = [];
    this.stalls = 0;
    this._demoing = false;
  },

  _after: function (ms, fn) { var id = setTimeout(fn, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },

  _say: function (text) {
    this.api.announce(text);
    if (!this.api.settings.voice) return;
    try { LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.95 }); } catch (_) {}
  },
  _sayGlyph: function (ch) {
    if (!this.api.settings.voice) return;
    try { LCSAudio.speak({ type: this.isDigit(ch) ? 'number' : 'word', text: ch, lang: this.api.lang, rate: 0.9 }); } catch (_) {}
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

    wrap.appendChild(this._buildPicker());
    if (this.wordOpen) wrap.appendChild(this._buildWordPanel());
    wrap.appendChild(this._buildCard());

    if (!this.premium) wrap.appendChild(this._buildGateLine());

    /* ⚠ THE PRINT SHEET IS BUILT ONLY FOR A PREMIUM VISITOR, and so is
       its stylesheet. Gating the CHIP is not gating the FEATURE: the old
       build injected the print CSS at init for everybody, so Ctrl+P
       handed a free visitor the premium worksheet. Absence is the gate. */
    if (this.premium) {
      injectLetterStudioPrintCSS();
      document.body.classList.add('ls-paid');
      wrap.appendChild(this._buildPrintSheet());
    } else {
      document.body.classList.remove('ls-paid');
    }

    api.stage.appendChild(wrap);
    /* the firefly IS the instruction. `strings.instruction` is
       display:none in every embed (lcs-shell.css:261) and the tool page
       always embeds, so the only surface it renders on is one nobody
       ships. Run the demo once instead — the tool already owns the right
       wordless instruction and was simply not using it. */
    if (!this._greeted) {
      var self = this;
      this._greeted = true;
      this._after(420, function () { self._demo(); });
    }
  },

  /* ---- the word / roster panel ----
     One chip opens this, rather than a mode strip. The old strip cost
     three rows at 320px in German and was the single largest contributor
     to 908px of content in a 640px viewport. */
  _buildWordPanel: function () {
    var self = this, api = this.api;
    var box = api.el('div', 'ls-wordpanel');

    var form = api.el('div', 'ls-wordform');
    var inp = api.el('input', 'ls-wordinput');
    inp.type = 'text';
    inp.setAttribute('aria-label', api.t('a11yWord'));
    inp.setAttribute('maxlength', '24');
    inp.setAttribute('autocomplete', 'off');
    inp.value = this.seqLabel || '';
    var go = api.el('button', 'ls-wordgo');
    go.type = 'button';
    go.textContent = '▸';
    go.setAttribute('aria-label', api.t('a11yWord'));
    var submit = function () {
      var v = (inp.value || '').trim();
      if (!v) return;
      self.wordOpen = false;
      self._setSequence(v);
    };
    go.addEventListener('click', submit);
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
    form.appendChild(inp); form.appendChild(go);
    box.appendChild(form);

    /* the roster is premium, and `rosterFor` returns [] without the flag
       — the gate is in the model, so there is nothing here to hide */
    var roster = this.rosterFor(this._loadMC(), this._classId, this.premium);
    if (this.premium) {
      if (roster.length) {
        var rl = api.el('p', 'ls-rosterlead'); rl.textContent = api.t('namesPick');
        box.appendChild(rl);
        var grid = api.el('div', 'ls-names');
        for (var i = 0; i < roster.length; i++) {
          (function (s) {
            var b = api.el('button', 'ls-name'); b.type = 'button';
            b.textContent = s.name;
            b.addEventListener('click', function () {
              self.selectedSid = s.id; self.wordOpen = false; self._setSequence(s.name);
            });
            grid.appendChild(b);
          })(roster[i]);
        }
        box.appendChild(grid);
        var priv = api.el('p', 'ls-privacy'); priv.textContent = api.t('privacyLine');
        box.appendChild(priv);
      } else {
        var n = api.el('p', 'ls-privacy'); n.textContent = api.t('noClass');
        box.appendChild(n);
      }
    }
    return box;
  },

  /* ---- the picker: three bands, no labels, digits included ---- */
  _buildPicker: function () {
    var self = this, api = this.api;
    var box = api.el('div', 'ls-picker' + (this.pickerOpen ? ' ls-open' : ''));
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', api.t('a11yPicker'));

    var cur = this._current();
    var bands = this.bands();
    var rail = api.el('div', 'ls-rail');

    for (var bi = 0; bi < bands.length; bi++) {
      if (!bands[bi].length) continue;                 /* en/nl have no band 2 */
      if (bi > 0) rail.appendChild(api.el('span', 'ls-bandgap'));
      for (var i = 0; i < bands[bi].length; i++) {
        (function (item) {
          var k = api.el('button', 'ls-key ls-kind-' + (item.kind || 'consonant'));
          k.type = 'button';
          k.textContent = item.g;
          k.setAttribute('aria-label', item.g);
          if (item.g === cur) { k.classList.add('ls-cur'); k.setAttribute('aria-current', 'true'); }
          if (self._store.done && self._store.done[item.g]) k.classList.add('ls-did');
          if (!self._drawable(item.g)) {
            /* ß has no single-character capital. Show it, disabled, at
               full ink — vanishing a key the tray declares is worse. */
            k.disabled = true;
            k.classList.add('ls-nokey');
          } else {
            k.addEventListener('click', function () {
              var keys = self.keys();
              for (var n = 0; n < keys.length; n++) if (keys[n].g === item.g) { self.index = n; break; }
              self.seq = null; self.seqAt = 0;
              self.pickerOpen = false;
              self._reset(); self.render();
              self._demo();
            });
          }
          rail.appendChild(k);
        })(bands[bi][i]);
      }
    }
    box.appendChild(rail);

    var more = api.el('button', 'ls-more');
    more.type = 'button';
    more.setAttribute('aria-label', api.t('a11yMore'));
    more.setAttribute('aria-expanded', this.pickerOpen ? 'true' : 'false');
    more.textContent = this.pickerOpen ? '⌃' : '⌄';
    more.addEventListener('click', function () { self.pickerOpen = !self.pickerOpen; self.render(); });
    box.appendChild(more);

    this._rail = rail;
    /* bring the current key into view: a 36-key tray shows about twelve
       at the embed width, so without this a teacher choosing `w` sees a
       rail that looks like it stops at `l` */
    var self2 = this;
    this._after(0, function () {
      var ck = rail.querySelector('.ls-cur');
      if (ck && rail.scrollWidth > rail.clientWidth) {
        rail.scrollLeft = Math.max(0, ck.offsetLeft - (rail.clientWidth - ck.offsetWidth) / 2);
      }
      self2._paintRailFade(rail);
    });
    rail.addEventListener('scroll', function () { self2._paintRailFade(rail); });
    return box;
  },

  /* a scroller with no edge cue reads as a broken row that stops at `l` */
  _paintRailFade: function (rail) {
    if (!rail) return;
    var more = rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 2;
    var less = rail.scrollLeft > 2;
    rail.classList.toggle('ls-fade-r', more);
    rail.classList.toggle('ls-fade-l', less);
  },

  _buildCard: function () {
    var self = this, api = this.api;
    var box = api.el('div', 'ls-card');
    var ch = this._current();
    if (!ch || !this.core || !this.tracer) { box.appendChild(api.el('div', 'ls-loading')); return box; }

    if (this.seq) {
      var strip = api.el('div', 'ls-seq');
      for (var i = 0; i < this.seq.length; i++) {
        var s = api.el('span', 'ls-seqch' + (i === this.seqAt ? ' ls-seqnow' : (i < this.seqAt ? ' ls-seqdone' : '')));
        s.textContent = this.seq[i];
        strip.appendChild(s);
      }
      if (this.seqPartial) {
        /* ⚠ a letter we cannot draw is dropped from the trace but SHOWN
           as a skipped slot, so the child never sees her full name, traces
           fewer letters than it has, and is then told she wrote all of it. */
        var gap = api.el('span', 'ls-seqskip'); gap.textContent = '···';
        strip.appendChild(gap);
      }
      box.appendChild(strip);
    }

    box.appendChild(this._buildSheet(ch));
    box.appendChild(this._buildPips(ch));
    box.appendChild(this._buildDock(ch));
    return box;
  },

  /* the stroke counter, as pips. "Stroke 1 of 3" was prose on the
     apparatus, in a language the reader cannot read. */
  _buildPips: function (ch) {
    var api = this.api, g = this._glyph(ch) || [];
    var row = api.el('div', 'ls-pips');
    row.setAttribute('aria-hidden', 'true');
    var done = this.trace ? this.trace.strokesDone : 0;
    for (var i = 0; i < g.length; i++) {
      var p = api.el('span', 'ls-pip' + (i < done ? ' ls-pipdone' : (i === done ? ' ls-pipnow' : '')));
      row.appendChild(p);
    }
    return row;
  },

  /* ---- the dock: one row, built once, only `disabled` varies ---- */
  _buildDock: function (ch) {
    var self = this, api = this.api;
    var row = api.el('div', 'ls-dock');
    var formed = !!(this.trace && this.trace.formed);

    var undo = api.el('button', 'ls-chip');
    undo.type = 'button';
    undo.setAttribute('aria-label', api.t('a11yUndo'));
    undo.textContent = '↺';
    undo.disabled = !this.drawn.length && !formed;
    undo.addEventListener('click', function () { self._reset(); self.render(); });
    row.appendChild(undo);

    /* THE PRIMARY NEVER MOVES AND NEVER CHANGES ITS VERB. It always
       reads "play + the glyph that comes next", so a child who cannot
       read still knows what it does, and a teacher scanning the board
       never has to hunt for it between states. */
    var nxt = this._nextGlyph();
    var prim = api.el('button', 'ls-primary');
    prim.type = 'button';
    prim.setAttribute('aria-label', this.fmt('a11yNext', { g: nxt || '' }));
    var arrow = api.el('span', 'ls-primary-arrow'); arrow.textContent = '▸';
    var glyph = api.el('span', 'ls-primary-glyph'); glyph.textContent = nxt || '';
    prim.appendChild(arrow); prim.appendChild(glyph);
    prim.disabled = !nxt;
    if (formed) prim.classList.add('ls-ready');
    prim.addEventListener('click', function () { self._next(); });
    row.appendChild(prim);

    if (!this.seq && !this.isDigit(ch)) {
      /* the case control shows BOTH destinations, using this letter's own
         pair. A word toggle reading "small" told you the state you were
         in, not the one you were going to. */
      var base = this.upper ? ch.toLowerCase() : ch;
      var cap = this.upperOf(base);
      if (cap !== base) {
        var seg = api.el('div', 'ls-case');
        seg.setAttribute('role', 'group');
        seg.setAttribute('aria-label', api.t('a11yCase'));
        [[base, false], [cap, true]].forEach(function (pair) {
          var b = api.el('button', 'ls-caseb' + (self.upper === pair[1] ? ' ls-on' : ''));
          b.type = 'button'; b.textContent = pair[0];
          b.setAttribute('aria-label', pair[0]);
          b.setAttribute('aria-pressed', self.upper === pair[1] ? 'true' : 'false');
          b.addEventListener('click', function () {
            if (self.upper === pair[1]) return;
            self.upper = pair[1]; self._reset(); self.render();
          });
          seg.appendChild(b);
        });
        row.appendChild(seg);
      }
    }

    var wd = api.el('button', 'ls-chip' + (this.wordOpen ? ' ls-chipon' : ''));
    wd.type = 'button';
    wd.setAttribute('aria-label', api.t('a11yWord'));
    wd.setAttribute('aria-expanded', this.wordOpen ? 'true' : 'false');
    wd.textContent = '✎';
    wd.addEventListener('click', function () { self.wordOpen = !self.wordOpen; self.render(); });
    row.appendChild(wd);

    if (this.premium) {
      var pr = api.el('button', 'ls-chip');
      pr.type = 'button';
      pr.setAttribute('aria-label', api.t('a11yPrint'));
      pr.textContent = '⎙';
      pr.addEventListener('click', function () { try { window.print(); } catch (_) {} });
      row.appendChild(pr);
    }
    return row;
  },

  _next: function () {
    if (this.seq) {
      if (this.seqAt + 1 < this.seq.length) this.seqAt++;
      else { this.seq = null; this.seqAt = 0; if (this.mode === 'names') { this.render(); return; } }
    } else this.index++;
    this._reset();
    this.render();
    this._demo();
  },

  /* ---- the sheet ---- */
  _buildSheet: function (ch) {
    var api = this.api;
    var wrap = api.el('div', 'ls-sheet');
    var g = this._glyph(ch);
    var NS = 'http://www.w3.org/2000/svg';
    var sv = document.createElementNS(NS, 'svg');
    /* ⚠ CROPPED. Nothing in either glyph table is ever drawn above y=2
       (the mark ceiling) or below y=96 (the deepest descender), but the
       old viewBox was 0..110 — 26% of the sheet was permanently empty
       while the letter occupied 13% of it. */
    sv.setAttribute('viewBox', '0 2 100 98');
    sv.setAttribute('class', 'ls-svg');
    sv.setAttribute('role', 'img');
    sv.setAttribute('aria-label', this.fmt('a11ySheet', { g: ch }));

    var ruling = this.rulingFor(api.lang);

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

    var done = this.trace ? this.trace.strokesDone : 0;
    var formed = !!(this.trace && this.trace.formed);

    /* the road — wide and pale, all strokes */
    for (var i = 0; i < g.length; i++) {
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('d', this._d(g[i]));
      p.setAttribute('class', 'ls-road' + (i === done && !formed ? ' ls-roadnow' : '') + (this._isDot(g[i]) ? ' ls-dot' : ''));
      p.setAttribute('data-stroke', String(i));
      sv.appendChild(p);
    }

    /* the child's ink, over the road */
    for (i = 0; i < this.drawn.length; i++) {
      var dp = document.createElementNS(NS, 'path');
      dp.setAttribute('d', this._d(this.drawn[i]));
      dp.setAttribute('class', 'ls-ink' + (g[i] && this._isDot(g[i]) ? ' ls-dot' : ''));
      sv.appendChild(dp);
    }
    this._curPath = document.createElementNS(NS, 'path');
    this._curPath.setAttribute('class', 'ls-ink ls-ink-live');
    sv.appendChild(this._curPath);

    /* THE HAIRLINE — thin, high contrast, drawn LAST so the exact path
       stays readable over the child's own line. This is what carries the
       3:1 duty; the road is deliberately too pale to fight the ink. */
    for (i = 0; i < g.length; i++) {
      var h = document.createElementNS(NS, 'path');
      h.setAttribute('d', this._d(g[i]));
      h.setAttribute('class', 'ls-hair' + (formed ? ' ls-faded' : '') + (this._isDot(g[i]) ? ' ls-dot' : ''));
      sv.appendChild(h);
    }

    /* stroke numbers + direction arrows. A green dot says WHERE; it does
       not say which way, nor which stroke comes first — and on a round
       letter it is compatible with both directions. */
    if (this.api.settings.arrows && !formed) {
      var spots = this._numberSpots(g);
      for (i = 0; i < g.length; i++) this._annotate(sv, g[i], i, i === done, spots[i]);
    }

    if (this.trace && !formed && g[done]) {
      var s0 = this.tracer.startPoint(this.trace) || g[done][0];
      var dot = document.createElementNS(NS, 'circle');
      dot.setAttribute('cx', String(s0.x)); dot.setAttribute('cy', String(s0.y)); dot.setAttribute('r', '3.9');
      dot.setAttribute('class', 'ls-startdot');
      sv.appendChild(dot);
    }

    this._svg = sv;
    this._wireTrace(sv, ch);
    wrap.appendChild(sv);

    /* ⚠ REPLAY. Moving "Show me" out of the dock was right — two coral
       pills on the success screen gave a child scanning for the big
       orange button a coin-flip between advancing and replaying — but I
       removed the control and did not put it back anywhere, so a teacher
       had no way to run the stroke order again and `a11yDemo` sat
       authored in eleven locales and wired to nothing. It is a replay
       affordance, so it lives ON the sheet, small, in the corner the
       letter never occupies. */
    var self = this;
    var rep = this.api.el('button', 'ls-replay');
    rep.type = 'button';
    rep.textContent = '▶';
    rep.setAttribute('aria-label', this.api.t('a11yDemo'));
    rep.addEventListener('click', function (e) { e.stopPropagation(); self._demo(); });
    wrap.appendChild(rep);
    return wrap;
  },

  /* ⭐ THE STROKE NUMBERS MUST BE LAID OUT TOGETHER, NOT ONE AT A TIME.
     Two rules each failed alone, in opposite ways. Offsetting each
     numeral perpendicular to its own stroke put a's two side by side
     above the bowl reading "2 1" — the right labels in the wrong order,
     which is worse than none. Radiating them from the letter's centre
     fixed a, and then collapsed E, F, A, N and M to ZERO separation,
     because those strokes START AT THE SAME POINT and a radial offset
     from one shared origin is one offset.
     No per-numeral rule can work: separation is a property of the SET.
     So seed them radially and then push the set apart, which is the only
     formulation that has no counter-example in either glyph table. */
  _numberSpots: function (g) {
    var bb = this.bboxOf(g), cx = bb.cx, cy = (bb.top + bb.base) / 2;
    var spots = [], i, j, k;
    for (i = 0; i < g.length; i++) {
      var f = this.tracer.flatten(g[i]), a = f[0];
      var ox = a.x - cx, oy = a.y - cy, om = Math.hypot(ox, oy);
      if (om < 1) { ox = 0; oy = -1; om = 1; }
      /* tie-break shared origins by the stroke's own heading, so two
         strokes leaving one corner still separate */
      var b = f[Math.min(3, f.length - 1)];
      var hx = b.x - a.x, hy = b.y - a.y, hm = Math.hypot(hx, hy) || 1;
      spots.push({ x: a.x + (ox / om) * 9 - (hx / hm) * 3, y: a.y + (oy / om) * 9 - (hy / hm) * 3 });
    }
    var MIN = 11;
    for (k = 0; k < 40; k++) {
      var moved = false;
      for (i = 0; i < spots.length; i++) for (j = i + 1; j < spots.length; j++) {
        var dx = spots[j].x - spots[i].x, dy = spots[j].y - spots[i].y;
        var d = Math.hypot(dx, dy);
        if (d >= MIN) continue;
        if (d < 0.01) { dx = 1; dy = 0; d = 1; }
        var push = (MIN - d) / 2 + 0.1;
        spots[i].x -= (dx / d) * push; spots[i].y -= (dy / d) * push;
        spots[j].x += (dx / d) * push; spots[j].y += (dy / d) * push;
        moved = true;
      }
      /* ⚠ CLAMP INSIDE THE LOOP. Clamping after it undoes the separation
         it just achieved: seven glyphs came back to 8.2-8.4u because the
         push sent a numeral off the sheet and the clamp shoved it into
         its neighbour. Keeping them in the box is a constraint the
         separation has to satisfy, not a correction applied to it. */
      for (i = 0; i < spots.length; i++) {
        spots[i].x = Math.max(6, Math.min(94, spots[i].x));
        spots[i].y = Math.max(9, Math.min(96, spots[i].y));
      }
      if (!moved) break;
    }
    return spots;
  },

  /* the stroke's number at its start, and two arrowheads along it */
  _annotate: function (sv, stroke, idx, isNext, spot) {
    var NS = 'http://www.w3.org/2000/svg';
    var flat = this.tracer.flatten(stroke);
    if (flat.length < 2) return;
    var cls = isNext ? ' ls-now' : '';

    /* ⚠ THE NUMBER MUST NOT LAND ON THE START DOT. Both mark the same
       point, so a fixed perpendicular offset put "1" straight through the
       green dot on every letter whose first stroke runs vertically. Push
       it BACK along the incoming tangent as well as sideways, and flip
       the side if that would leave the sheet. */
    /* ⚠ PUSH THE NUMBER OUTWARD FROM THE LETTER'S CENTRE, not sideways
       from its own stroke. A perpendicular offset put a's two numerals
       side by side above the bowl reading "2 1" left to right — the
       right labels in the wrong order, which is worse than none. Radiating
       from the centroid separates them by construction, because two
       strokes that start in different places point in different
       directions from the middle. */
    var t = document.createElementNS(NS, 'text');
    var px = spot.x, py = spot.y;
    t.setAttribute('x', px.toFixed(2));
    t.setAttribute('y', (py + 2.2).toFixed(2));
    t.setAttribute('class', 'ls-num' + cls);
    t.textContent = String(idx + 1);
    sv.appendChild(t);

    if (!isNext) return;
    [0.35, 0.85].forEach(function (f) {
      var k = Math.min(flat.length - 2, Math.max(1, Math.round(f * (flat.length - 1))));
      var p = flat[k], q = flat[k + 1];
      var dx = q.x - p.x, dy = q.y - p.y, L = Math.hypot(dx, dy) || 1;
      var ang = Math.atan2(dy, dx) * 180 / Math.PI;
      var tri = document.createElementNS(NS, 'path');
      tri.setAttribute('d', 'M -2.6 -2.4 L 2.8 0 L -2.6 2.4 Z');
      tri.setAttribute('transform', 'translate(' + p.x.toFixed(2) + ' ' + p.y.toFixed(2) + ') rotate(' + ang.toFixed(1) + ')');
      tri.setAttribute('class', 'ls-arrow');
      sv.appendChild(tri);
    });
  },

  _isDot: function (pts) {
    if (!pts || pts.length < 2) return true;
    var len = 0, i;
    for (i = 1; i < pts.length; i++) len += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    return len < 6;
  },

  /* Catmull-Rom -> cubic Bezier, passing THROUGH every point. The tracer
     flattens the SAME curve (stroke-trace-core.js `flatten`), so what the
     child sees and what the judge measures are one shape. */
  /* ⚠ A CLOSED LOOP MUST WRAP ITS END TANGENTS, NOT CLAMP THEM.
     Clamping p0 to pts[0] and p3 to p2 is right for an open stroke and
     wrong for a ring: at the seam the control vector comes out ~50% of
     its correct length and 8.8-15.4 degrees off, which paints a visible
     notch. There are now TWELVE closed loops in the two tables (O Q a b
     d g o p q and digits 0 8 9) where there used to be four, so the
     defect landed on nine more glyphs the moment the round letters were
     rebuilt. `stroke-trace-core.flatten` carries the identical fix --
     if these two ever disagree the judge is measuring a different curve
     from the one the child can see, which is the whole reason the digits
     broke. */
  _closed: function (pts) {
    return pts.length > 3 && Math.abs(pts[0].x - pts[pts.length - 1].x) < 0.6
                          && Math.abs(pts[0].y - pts[pts.length - 1].y) < 0.6;
  },

  _d: function (pts) {
    if (!pts || !pts.length) return '';
    if (pts.length < 3) return 'M ' + pts.map(function (p) { return p.x + ' ' + p.y; }).join(' L ');
    var loop = this._closed(pts), n = pts.length;
    var d = 'M ' + pts[0].x + ' ' + pts[0].y, k, p0, p1, p2, p3, c1x, c1y, c2x, c2y;
    for (k = 0; k < pts.length - 1; k++) {
      p0 = pts[k - 1] || (loop ? pts[n - 2] : pts[k]);
      p1 = pts[k]; p2 = pts[k + 1];
      p3 = pts[k + 2] || (loop ? pts[1] : p2);
      c1x = p1.x + (p2.x - p0.x) / 6; c1y = p1.y + (p2.y - p0.y) / 6;
      c2x = p2.x - (p3.x - p1.x) / 6; c2y = p2.y - (p3.y - p1.y) / 6;
      d += ' C ' + c1x.toFixed(2) + ' ' + c1y.toFixed(2) + ' ' + c2x.toFixed(2) + ' ' + c2y.toFixed(2) + ' ' + p2.x + ' ' + p2.y;
    }
    return d;
  },

  /* THE LIVE INK. Every sample asks the tracer whether the finger has
     swept new ground; the line only ever appears where it has been. */
  _wireTrace: function (sv, ch) {
    var self = this;
    var toVB = function (ev) {
      var r = sv.getBoundingClientRect();
      return { x: ((ev.clientX - r.left) / r.width) * 100, y: 2 + ((ev.clientY - r.top) / r.height) * 98 };
    };
    sv.addEventListener('pointerdown', function (ev) {
      if (!self.trace || self.trace.formed || self._demoing) return;
      ev.preventDefault();
      self._drag = true;
      try { sv.setPointerCapture(ev.pointerId); } catch (_) {}
      self._sample(toVB(ev), ch);
    });
    sv.addEventListener('pointermove', function (ev) {
      if (!self._drag) return;
      /* coalesced events recover the real motion on a stuttering device,
         so a fast finger is never mistaken for a jump */
      var pts = (ev.getCoalescedEvents ? ev.getCoalescedEvents() : null) || [ev];
      for (var i = 0; i < pts.length; i++) self._sample(toVB(pts[i]), ch);
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
    if (!this.trace || this.trace.formed) return;
    var r = this.tracer.sample(this.trace, pt);
    if (r.on) {
      this.cur.push(pt);
      if (this._curPath) this._curPath.setAttribute('d', this._d(this.cur));
    }
    if (r.done) { this._drag = false; this._endStroke(ch); }
  },

  _endStroke: function (ch) {
    if (!this.trace) return;
    var res = this.tracer.endStroke(this.trace);
    if (res === 'stroke-ok' || res === 'formed') {
      this.drawn.push(this.cur.slice());
      this.cur = [];
      this.stalls = 0;
      try { this.api.sound(660); } catch (_) {}
    } else {
      /* ⚠ THE INK AND THE CURSOR SURVIVE. The old build threw away
         everything the child had drawn whenever the stroke did not
         complete, so a four-year-old who lifted to re-grip lost the lot.
         Escalate the ENVIRONMENT instead of delivering a verdict: after
         repeated stalls the arrows travel, then the firefly runs this one
         stroke, then the corridor silently widens. Never a red mark. */
      this.stalls++;
      if (this.stalls === 2 && this.api.settings.arrows) { /* the arrows are already shown */ }
      if (this.stalls === 3) { this.render(); this._demo(true); return; }
      if (this.stalls >= 4 && this.tracer.relax) this.tracer.relax(this.trace);
    }
    if (res === 'formed') {
      this._markDone(ch);
      this._sayGlyph(ch);
      this.api.announce(this.fmt('a11yDone', { g: ch }));
    }
    this.render();
  },

  _markDone: function (ch) {
    if (!this._store.done) this._store.done = {};
    this._store.done[ch] = 1;
    this._saveStore();
  },

  /* the firefly, paced by DISTANCE. At a fixed delay per checkpoint it
     ran ~4x faster across a sparse stroke than a dense one, so the demo
     of a letter varied in speed for reasons that had nothing to do with
     how the letter is written. */
  DEMO_SPEED: 55,   /* units per second */
  _demo: function (onlyNext) {
    var self = this, ch = this._current(), g = this._glyph(ch);
    if (!g || !this._svg || !this.tracer) return;
    this._clearTimers();
    var NS = 'http://www.w3.org/2000/svg';
    var fly = document.createElementNS(NS, 'circle');
    fly.setAttribute('r', '3.6'); fly.setAttribute('class', 'ls-firefly');
    this._svg.appendChild(fly);
    this._demoing = true;

    var from = onlyNext ? (this.trace ? this.trace.strokesDone : 0) : 0;
    var to = onlyNext ? from + 1 : g.length;
    var t = 0, plan = [];
    for (var i = from; i < to && i < g.length; i++) {
      var flat = this.tracer.flatten(g[i]);
      for (var j = 0; j < flat.length; j++) {
        if (j > 0) t += Math.hypot(flat[j].x - flat[j - 1].x, flat[j].y - flat[j - 1].y) / this.DEMO_SPEED * 1000;
        plan.push({ p: flat[j], at: t, first: j === 0 });
      }
      t += 260;      /* a beat between strokes */
    }
    plan.forEach(function (item) {
      self._after(item.at, function () {
        fly.setAttribute('cx', String(item.p.x));
        fly.setAttribute('cy', String(item.p.y));
        if (item.first) { try { self.api.sound(880); } catch (_) {} }
      });
    });
    this._after(t + 260, function () {
      if (fly.parentNode) fly.parentNode.removeChild(fly);
      self._demoing = false;
    });
    this._sayGlyph(ch);
  },

  /* ---- names + typed word: see _buildWordPanel ---- */

  _setSequence: function (text) {
    var all = this.sequenceOf(text), self = this;
    this.seq = all.filter(function (c) { return self._drawable(c); });
    this.seqPartial = this.seq.length !== all.length;
    this.seqLabel = text;
    this.seqAt = 0;
    this._reset();
    this.render();
    this._demo();
  },

  _buildGateLine: function () {
    var api = this.api;
    var box = api.el('p', 'ls-gateline');
    box.textContent = api.t('gateNames') + ' ';
    var a = api.el('a', 'ls-gatelink');
    a.href = '/' + api.lang + '/pricing?from=tool-letter-studio';
    a.target = '_top';
    a.textContent = api.t('unlock');
    box.appendChild(a);
    return box;
  },

  /* ---- the printable sheet: REAL DOM, premium only ---- */
  _buildPrintSheet: function () {
    var api = this.api;
    var ch = this._current();
    var sheet = api.el('div', 'ls-psheet');
    var page = api.el('div', 'ls-ppage');

    var head = api.el('div', 'ls-phead');
    head.appendChild(this._printModel(ch));
    var namebox = api.el('div', 'ls-pname');   /* deliberately unlabelled */
    head.appendChild(namebox);
    page.appendChild(head);

    /* six ruled rows: trace, trace, fade, fade, copy, free */
    var plan = ['trace', 'trace', 'fade', 'fade', 'copy', 'free'];
    for (var r = 0; r < plan.length; r++) page.appendChild(this._printRow(ch, plan[r]));
    sheet.appendChild(page);
    return sheet;
  },

  _printModel: function (ch) {
    var api = this.api, NS = 'http://www.w3.org/2000/svg';
    var g = this._glyph(ch) || [];
    var box = api.el('div', 'ls-pmodel');
    var sv = document.createElementNS(NS, 'svg');
    sv.setAttribute('viewBox', '0 2 100 98');
    sv.setAttribute('class', 'ls-psvg');
    this._printRuling(sv);
    var pspots = this._numberSpots(g);
    for (var i = 0; i < g.length; i++) {
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('d', this._d(g[i]));
      p.setAttribute('class', 'ls-phair' + (this._isDot(g[i]) ? ' ls-dot' : ''));
      sv.appendChild(p);
      this._annotate(sv, g[i], i, true, pspots[i]);
    }
    box.appendChild(sv);
    return box;
  },

  _printRuling: function (sv) {
    var NS = 'http://www.w3.org/2000/svg';
    var ruling = this.rulingFor(this.api.lang);
    for (var z = 0; z < ruling.zones.length; z++) {
      var zn = ruling.zones[z];
      var ln = document.createElementNS(NS, 'line');
      ln.setAttribute('x1', '0'); ln.setAttribute('x2', '100');
      ln.setAttribute('y1', String(zn.y)); ln.setAttribute('y2', String(zn.y));
      ln.setAttribute('class', 'ls-prule ls-prule-' + zn.tone + (zn.kind === 'dashed' ? ' ls-pdash' : ''));
      sv.appendChild(ln);
    }
  },

  _printRow: function (ch, kind) {
    var api = this.api, NS = 'http://www.w3.org/2000/svg';
    var g = this._glyph(ch) || [];
    var row = api.el('div', 'ls-prow');
    var COPIES = 8;
    var sv = document.createElementNS(NS, 'svg');
    sv.setAttribute('viewBox', '0 2 ' + (100 * COPIES) + ' 98');
    sv.setAttribute('class', 'ls-psvg ls-prowsvg');
    /* ⚠ NOT preserveAspectRatio="none". Stretching eight 100x98 cells to
       fill a 186mm row squashes every letter horizontally — the child
       copies a shape narrower than the one they will be marked on. Fit
       to HEIGHT and leave the remainder as margin; a row is 8.45:1 and
       eight cells are 8.16:1, so the loss is a few millimetres. */
    sv.setAttribute('preserveAspectRatio', 'xMinYMid meet');

    /* the ruling runs the whole row, unbroken, in the locale's own system */
    var ruling = this.rulingFor(api.lang);
    for (var z = 0; z < ruling.zones.length; z++) {
      var zn = ruling.zones[z];
      var ln = document.createElementNS(NS, 'line');
      ln.setAttribute('x1', '0'); ln.setAttribute('x2', String(100 * COPIES));
      ln.setAttribute('y1', String(zn.y)); ln.setAttribute('y2', String(zn.y));
      ln.setAttribute('class', 'ls-prule ls-prule-' + zn.tone + (zn.kind === 'dashed' ? ' ls-pdash' : ''));
      sv.appendChild(ln);
    }
    if (kind === 'free') { row.appendChild(sv); return row; }

    var n = kind === 'copy' ? 1 : COPIES;
    for (var c = 0; c < n; c++) {
      for (var i = 0; i < g.length; i++) {
        var p = document.createElementNS(NS, 'path');
        p.setAttribute('d', this._d(g[i]));
        p.setAttribute('transform', 'translate(' + (c * 100) + ' 0)');
        var cls = kind === 'fade' ? 'ls-pfade' : 'ls-phair';
        p.setAttribute('class', cls + (this._isDot(g[i]) ? ' ls-dot' : ''));
        sv.appendChild(p);
      }
    }
    row.appendChild(sv);
    return row;
  },

  reset: function () {
    this.mode = 'letters'; this.index = 0; this.seq = null; this.seqAt = 0;
    this.pickerOpen = false;
    this._reset();
    if (this._wrap) this.render();
  },
  onSettings: function () {
    if (this.trace && this.tracer) this.trace.corridor = this.api.settings.wide ? this.tracer.WIDE : this.tracer.CORRIDOR;
    if (this._wrap) this.render();
  }
};

/* the greeting demo runs once, because `strings.instruction` is
   display:none in every embed and the tool page always embeds — the
   firefly IS the instruction, and it is the one this tool already owns. */
function self_demo(t) { try { t._demo(); } catch (_) {} }

function injectLetterStudioCSS() {
  if (document.getElementById('ls-style')) return;
  var st = document.createElement('style');
  st.id = 'ls-style';
  st.textContent = ''
    /* ⭐ CONTAINER QUERIES, NOT VIEWPORT QUERIES. The tool page pins this
       iframe at 704px from 1024 all the way to 2560, and media queries
       inside an iframe resolve against the IFRAME. The old ladder was
       keyed (min-width:1367px) and (min-height:880px) and could not fire
       in the embed at all; standalone it still missed a 1280x800
       classroom projector. The element's own width is the only width
       that was ever true. */
    + '.ls-wrap{container-type:inline-size;container-name:ls;'
    + 'display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;'
    + '--ls-key:clamp(44px,7.6cqi,54px);--ls-sheet:min(96cqi,440px);}'

    /* ---- picker ---- */
    + '.ls-picker{position:relative;width:100%;display:flex;align-items:flex-start;gap:6px;}'
    + '.ls-rail{flex:1;display:flex;gap:5px;overflow-x:auto;overflow-y:hidden;scrollbar-width:thin;'
    + 'padding:2px 2px 6px;scroll-snap-type:x proximity;}'
    + '.ls-picker.ls-open .ls-rail{flex-wrap:wrap;overflow:visible;justify-content:center;}'
    + '.ls-rail.ls-fade-r{-webkit-mask-image:linear-gradient(90deg,#000 84%,transparent 100%);mask-image:linear-gradient(90deg,#000 84%,transparent 100%);}'
    + '.ls-rail.ls-fade-l.ls-fade-r{-webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 12%,#000 84%,transparent 100%);mask-image:linear-gradient(90deg,transparent 0%,#000 12%,#000 84%,transparent 100%);}'
    + '.ls-picker.ls-open .ls-rail{-webkit-mask-image:none;mask-image:none;}'
    + '.ls-key{flex:0 0 auto;width:var(--ls-key);height:var(--ls-key);scroll-snap-align:center;'
    + 'font:700 clamp(17px,3.4cqi,23px)/1 Nunito,system-ui,sans-serif;color:#1F3D38;background:#FFFDF7;'
    + 'border:2px solid rgba(20,107,94,.22);border-radius:12px;cursor:pointer;padding:0;'
    + 'display:flex;align-items:center;justify-content:center;}'
    + '.ls-key.ls-kind-vowel{background:#FDF3E2;}'
    + '.ls-key.ls-kind-digit{background:#EFF5F3;}'
    + '.ls-key.ls-cur{background:#146B5E;color:#FFFDF7;border-color:#146B5E;}'
    /* done is a dot, never a tick and never a count */
    + '.ls-key.ls-did{position:relative;}'
    + '.ls-key.ls-did::after{content:"";position:absolute;bottom:4px;left:50%;transform:translateX(-50%);'
    + 'width:6px;height:6px;border-radius:50%;background:#1F8A55;}'
    + '.ls-key.ls-cur.ls-did::after{background:#FFFDF7;}'
    + '.ls-key.ls-nokey{opacity:1;color:#9AA8A4;border-style:dashed;cursor:default;}'
    + '.ls-bandgap{flex:0 0 auto;width:1px;align-self:stretch;background:rgba(20,107,94,.22);margin:4px 5px;}'
    + '.ls-picker.ls-open .ls-bandgap{width:100%;height:1px;align-self:auto;margin:6px 0;}'
    + '.ls-more{flex:0 0 auto;width:var(--ls-key);height:var(--ls-key);min-width:44px;min-height:44px;'
    + 'font:700 18px/1 Nunito,system-ui,sans-serif;color:#146B5E;background:#EAF3F1;'
    + 'border:2px solid rgba(20,107,94,.28);border-radius:12px;cursor:pointer;}'

    /* ---- card + sheet ---- */
    + '.ls-card{position:relative;width:100%;background:#FFFDF7;'
    + 'border-radius:20px;box-shadow:0 6px 22px rgba(20,107,94,.10),0 1px 3px rgba(0,0,0,.06);'
    + 'padding:14px 12px 12px;display:flex;flex-direction:column;align-items:center;gap:10px;box-sizing:border-box;}'
    + '.ls-lead{font:600 clamp(15px,3.4cqi,19px)/1.4 Nunito,system-ui,sans-serif;color:#146B5E;text-align:center;margin:0;}'
    + '.ls-sheet{width:var(--ls-sheet);aspect-ratio:100/98;background:#FFFEFB;'
    + 'border:2px solid rgba(20,107,94,.18);border-radius:14px;overflow:hidden;}'
    + '.ls-svg{width:100%;height:100%;display:block;touch-action:none;cursor:crosshair;}'

    /* THE PALETTE — measured against #FFFEFB; see the file header */
    + '.ls-band{fill:rgba(242,120,75,.13);}'
    + '.ls-rule{stroke-width:.7;}'
    + '.ls-rule-faint{stroke:rgba(20,107,94,.26);}'
    + '.ls-rule-mid{stroke:rgba(20,107,94,.40);}'
    + '.ls-rule-strong{stroke:rgba(20,107,94,.64);stroke-width:1.1;}'
    + '.ls-dashed{stroke-dasharray:2 3;}'
    + '.ls-road{fill:none;stroke:rgba(20,107,94,.30);stroke-width:7;stroke-linecap:butt;stroke-linejoin:round;}'
    + '.ls-road.ls-roadnow{stroke:rgba(20,107,94,.46);}'
    + '.ls-ink{fill:none;stroke:#C64A22;stroke-width:5.4;stroke-linecap:round;stroke-linejoin:round;}'
    + '.ls-ink-live{stroke:#D9542A;}'
    + '.ls-hair{fill:none;stroke:rgba(20,107,94,.85);stroke-width:1.6;stroke-linecap:butt;stroke-linejoin:round;}'
    /* when the letter is written the guide steps back so the child sees
       their own line alone */
    + '.ls-hair.ls-faded{stroke:rgba(20,107,94,.28);}'
    + '.ls-dot{stroke-linecap:round;}'
    + '.ls-startdot{fill:#1F8A55;}'
    + '.ls-firefly{fill:#F2C879;stroke:#B8860B;stroke-width:.8;}'
    + '.ls-num{font:700 7px/1 Nunito,system-ui,sans-serif;fill:rgba(20,107,94,.45);text-anchor:middle;}'
    + '.ls-num.ls-now{fill:#146B5E;}'
    + '.ls-arrow{fill:rgba(20,107,94,.72);}'

    /* ---- pips + dock ---- */
    + '.ls-sheet{position:relative;}'
    + '.ls-replay{position:absolute;right:8px;bottom:8px;min-width:44px;min-height:44px;'
    + 'font:600 16px/1 Nunito,system-ui,sans-serif;color:#146B5E;background:rgba(255,253,247,.92);'
    + 'border:2px solid rgba(20,107,94,.28);border-radius:12px;cursor:pointer;padding:0;}'
    + '.ls-rosterlead{font:700 13px/1.3 Nunito,system-ui,sans-serif;color:#146B5E;margin:0;text-align:center;}'
    + '.ls-pips{display:flex;gap:6px;align-items:center;min-height:10px;}'
    + '.ls-pip{width:9px;height:9px;border-radius:50%;background:rgba(20,107,94,.20);}'
    + '.ls-pip.ls-pipnow{background:#1F8A55;transform:scale(1.25);}'
    + '.ls-pip.ls-pipdone{background:#C64A22;}'
    + '.ls-dock{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;align-items:center;width:100%;}'
    + '.ls-chip{min-width:48px;min-height:48px;font:600 20px/1 Nunito,system-ui,sans-serif;color:#146B5E;'
    + 'background:#FFF9EE;border:2px solid rgba(20,107,94,.22);border-radius:14px;cursor:pointer;}'
    + '.ls-chip:disabled{opacity:.4;cursor:default;}'
    + '.ls-primary{display:flex;align-items:center;gap:7px;min-height:48px;padding:10px 20px;'
    + 'font:700 16px/1 Nunito,system-ui,sans-serif;color:#FFFDF7;background:#C64A22;border:none;'
    + 'border-radius:999px;cursor:pointer;}'
    + '.ls-primary:disabled{opacity:.4;cursor:default;}'
    + '.ls-primary.ls-ready{box-shadow:0 0 0 4px rgba(198,74,34,.22);}'
    + '.ls-primary-arrow{font-size:15px;opacity:.85;}'
    + '.ls-primary-glyph{font:700 21px/1 Nunito,system-ui,sans-serif;}'
    + '.ls-case{display:flex;border:2px solid rgba(20,107,94,.28);border-radius:14px;overflow:hidden;}'
    + '.ls-caseb{min-width:44px;min-height:44px;font:700 19px/1 Nunito,system-ui,sans-serif;'
    + 'color:#146B5E;background:#FFFDF7;border:none;cursor:pointer;padding:0 10px;}'
    + '.ls-caseb.ls-on{background:#146B5E;color:#FFFDF7;}'

    /* ---- the word / name strip ---- */
    + '.ls-seq{display:flex;flex-wrap:wrap;gap:3px;justify-content:center;align-items:baseline;}'
    + '.ls-seqch{font:700 clamp(20px,4.6cqi,30px)/1.1 Nunito,system-ui,sans-serif;color:rgba(20,107,94,.35);padding:0 1px;}'
    + '.ls-seqch.ls-seqdone{color:#C64A22;}'
    + '.ls-seqch.ls-seqnow{color:#146B5E;border-bottom:3px solid #1F8A55;}'
    + '.ls-seqskip{font:700 18px/1 Nunito,system-ui,sans-serif;color:#9AA8A4;}'
    + '.ls-names{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;}'
    + '.ls-name{font:700 15px/1 Nunito,system-ui,sans-serif;color:#1F2A28;background:#F7E9CF;'
    + 'border:2.5px solid #146B5E;border-radius:999px;padding:11px 18px;min-height:44px;cursor:pointer;}'
    + '.ls-privacy{font:500 12px/1.45 Nunito,system-ui,sans-serif;color:#7A6A55;text-align:center;margin:4px 0 0;max-width:44ch;}'

    /* the gate is a LINE, never a scrim: nobody projects a price in
       front of twenty-five children */
    + '.ls-gateline{font:500 12.5px/1.5 Nunito,system-ui,sans-serif;color:#7A6A55;text-align:center;'
    + 'margin:2px 0 0;max-width:56ch;}'
    + '.ls-gatelink{color:#146B5E;font-weight:700;text-decoration:underline;white-space:nowrap;}'

    + '.ls-wordpanel{width:100%;background:#FFF9EE;border:2px solid rgba(20,107,94,.20);'
    + 'border-radius:16px;padding:12px;display:flex;flex-direction:column;gap:10px;align-items:center;box-sizing:border-box;}'
    + '.ls-wordform{display:flex;gap:8px;width:100%;max-width:420px;}'
    + '.ls-wordinput{flex:1;min-height:48px;font:700 18px/1 Nunito,system-ui,sans-serif;color:#1F2A28;'
    + 'background:#FFFDF7;border:2px solid rgba(20,107,94,.30);border-radius:12px;padding:0 12px;min-width:0;}'
    + '.ls-wordgo{min-width:48px;min-height:48px;font:700 20px/1 Nunito,system-ui,sans-serif;color:#FFFDF7;'
    + 'background:#146B5E;border:none;border-radius:12px;cursor:pointer;}'
    + '.ls-chip.ls-chipon{background:#146B5E;color:#FFFDF7;border-color:#146B5E;}'
    /* ---- container rungs. The embed lives at 704px forever. ---- */
    /* ⚠ A CONTAINER CANNOT STYLE ITSELF BY ITS OWN SIZE — only its
       DESCENDANTS. My first version set these variables on `.ls-wrap`,
       which IS the container, so not one rung ever applied and the sheet
       stayed at its 440px base on every desktop. It looked exactly like
       the flat 420px cap this rebuild exists to remove. Measured
       container widths: 320vp->296, 412vp->388, 640vp->609,
       704vp->670 (the embed, forever), 1366vp standalone->1268. */
    + '@container ls (min-width:380px){'
    +   '.ls-card{--ls-sheet:min(92cqi,470px);padding:16px 14px 14px;}'
    +   '.ls-picker{--ls-key:clamp(44px,7.6cqi,54px);}'
    + '}'
    + '@container ls (min-width:600px){'
    +   '.ls-card{--ls-sheet:min(80cqi,560px);padding:20px 18px 16px;border-radius:24px;}'
    +   '.ls-picker{--ls-key:clamp(46px,6.6cqi,56px);}'
    + '}'
    + '@container ls (min-width:960px){'
    +   '.ls-card{--ls-sheet:min(64cqi,700px);}'
    + '}'
    /* the ONE viewport rule, width-only: let the standalone page use the
       screen it actually has. No vh anywhere — a manipulative has no
       feedback path to the viewport inside an iframe. */
    + '@media (min-width:1100px){body.ls-wide .lcs-app{max-width:min(1400px,96vw);}}'
    + '@media (prefers-reduced-motion:reduce){.ls-firefly{display:none;}}'
    /* the print sheet only ever exists for a premium visitor, but if it
       is in the DOM it must not show on screen */
    + '.ls-psheet{display:none;}';
  document.head.appendChild(st);
}

/* ⚠ SEPARATE, AND PREMIUM-ONLY. Injecting this at init for everybody is
   how Ctrl+P handed a free visitor the paid worksheet: the chip was
   gated, the feature was not. */
function injectLetterStudioPrintCSS() {
  if (document.getElementById('ls-print-style')) return;
  var st = document.createElement('style');
  st.id = 'ls-print-style';
  st.textContent = '@media print{'
    /* ⚠ UNDO THE SHELL FIRST. lcs-shell.css ships NO print block at all,
       so html,body{height:100%;overflow:hidden} and .lcs-app{max-width:
       720px;overflow:hidden} survive into print and clip the sheet to a
       single screenful. */
    + 'html,body{height:auto !important;overflow:visible !important;background:#fff !important;}'
    + '.lcs-app{height:auto !important;max-width:none !important;overflow:visible !important;'
    + 'box-shadow:none !important;border-radius:0 !important;background:#fff !important;}'
    + '.lcs-header,.lcs-controls,.lcs-bar,.lcs-drawer,.lcs-drawer-scrim,.lcs-instruction{display:none !important;}'
    + '.ls-picker,.ls-dock,.ls-pips,.ls-gateline,.ls-privacy,.ls-names,.ls-seq{display:none !important;}'
    + '.ls-card{display:none !important;}'
    + '@page{size:A4 portrait;margin:12mm;}'
    /* LINE ART ONLY — Chrome ships "Background graphics" OFF by default,
       so a tinted band or a coral rule reduces to nothing on paper. */
    + 'body.ls-paid .ls-psheet{display:block !important;}'
    + '.ls-ppage{display:flex;flex-direction:column;gap:6mm;}'
    + '.ls-phead{display:flex;align-items:flex-start;gap:6mm;height:42mm;}'
    + '.ls-pmodel{width:42mm;height:42mm;flex:0 0 auto;}'
    + '.ls-pname{flex:1;height:14mm;border:0.4mm solid #444;border-radius:2mm;}'
    + '.ls-prow{height:22mm;break-inside:avoid;page-break-inside:avoid;}'
    + '.ls-psvg{width:100%;height:100%;display:block;}'
    + '.ls-prule{stroke:#333;stroke-width:.5;vector-effect:non-scaling-stroke;}'
    + '.ls-prule-faint{stroke:#999;}'
    + '.ls-prule-mid{stroke:#666;}'
    + '.ls-prule-strong{stroke:#222;stroke-width:.9;}'
    + '.ls-pdash{stroke-dasharray:2 3;}'
    + '.ls-phair{fill:none;stroke:#111;stroke-width:1.8;stroke-linecap:butt;stroke-linejoin:round;'
    + 'vector-effect:non-scaling-stroke;}'
    + '.ls-pfade{fill:none;stroke:#999;stroke-width:1.8;stroke-linecap:butt;stroke-linejoin:round;'
    + 'stroke-dasharray:3 3;vector-effect:non-scaling-stroke;}'
    + '.ls-num{fill:#333;}'
    + '.ls-arrow{fill:#333;}'
    + '}';
  document.head.appendChild(st);
}
