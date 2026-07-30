/* =====================================================================
   TOOL #27 — PART–WHOLE FRAME   (part-whole-frame.js)
   ---------------------------------------------------------------------
   Free-play manipulative (no `tasks` — the shell renders zero activity
   chrome). The Math Table. Premium Tools v2, build #1.

   The whole-and-two-parts instrument: number bonds (en), splitsen (nl),
   Zerlegen (de). A nest at the top holds the whole; two trays below hold
   the parts; the child carries ONE counter across at a time and watches
   the nest refuse to change.

   THE ONE THESIS — THE WHOLE NEVER CHANGES. Conservation is not asserted
   in copy and not enforced by a check: it is UNREPRESENTABLE. The model
   is {whole, a} and nothing else; part B is `whole - a`, derived on every
   read, with no slot of its own to corrupt. (The same derived-not-stored
   discipline open-number-line holds for its landings.) The child's only
   affordance is carry; there is no add and no remove on the child's side.

   ⚠ COLLISION / DIFFERENTIATION — this tool sits in occupied territory
   and the fences are load-bearing. `number-bond-activities.json` ships
   SIX graded activities on `number-bond-core.js`, and Rekenrek is already
   a free-play conserved-total drag manipulative.

     the six numberbond.* activities  |  THIS TOOL
     -------------------------------- | --------------------------------
     a target whole, a given part     | no target, no given
     tap-to-increment ONE empty part  | carry between two co-equal parts
     a `?` unknown node               | no unknown; nothing is asked
     Check, isCorrect(), readOnly lock| nothing to check — every split of
                                      | N is correct BY DEFINITION
     circle-triple bond diagram       | a frame: nest + two trays

     Rekenrek (tool #6)               |  THIS TOOL
     -------------------------------- | --------------------------------
     no numerals (that absence is its | the whole is LABELLED and
     pedagogy); locked to 10/20/…     | teacher-set, any 3-20
     parked-right vs counted-left     | two CO-EQUAL named parts
     an ordinal rod                   | cardinal containers
     one push moves MANY beads        | exactly ONE counter per carry

   0 bytes are read from number-bond-core.js: its `_cssInjected` is a
   singleton on a shared object and its `.nb-` selectors are global, so
   consuming it would risk six shipped activities for no gain. The
   precedent for building beside an owned mechanic is ten-stones-core.js
   :14-17, which overlapped number-bond knowingly and was allowed because
   the REPRESENTATION differs. Same argument, same bar.

   ⚠ A NAME MAY NOT PROMISE A CONVENTION THE RENDERER DOES NOT DRAW.
   The German draft was 'Zerlegehaus' while the all-ways record renders as
   a plain ladder — the name sold a Zahlenhaus that is not there. Draft is
   now the neutral 'Zahlen zerlegen'. If the de ensemble rules that the
   Zahlenhaus IS the convention, that ruling ships WITH a `ways:'house'`
   renderer, never as a name alone.

   THE DIAGRAM IS PER-LOCALE DATA. `DIAGRAM` + `diagramFor(locale)` follow
   letter-studio.js:104-152 exactly: EVERY LOCALE SHIPS `default` UNTIL
   ITS NATIVE ENSEMBLE RULES. The German Zahlenhaus, the Dutch
   splitsschema and the Nordic ten-friends framing are hypotheses for the
   ensembles, not facts this file may assert. Renderer-true fields only.

   NUMBER WORDS 0-20 x 11 are a literal table DERIVED FROM the live
   place-value-core.js `_NUMBER_WORD_HELPERS` (the match-pairs precedent
   for a small range — copy, never import, because this page does not load
   that core). verify-part-whole-frame.js re-compares all 21 x 11 against
   the live core on every build, so the copy cannot rot silently.

   FREE = the frame, wholes 3-10, all three covers, numerals/notation/
   voice. PREMIUM = wholes to 20, the all-ways record, the sequenced
   repertoire, saved frames, print. Premium wholes are ABSENT from the
   band stepper for free visitors, not merely disabled.

   REFUSES, FOREVER: no right/wrong on any split · no "ways found 3/6" ·
   no timer, score, streak or completion celebration · no auto-arranging
   the found rows · no equation notation while notation is off · the child
   can never change the whole. Any future "check the bond" request is to
   be refused.
   ===================================================================== */
var PartWholeFrame = {
  id: 'part-whole-frame',

  /* ⚠ CURATION: en is authored here; the other ten are builder drafts and
     are corrected in place by scripts/apply-part-whole-frame-fanout.js
     from the per-locale native 3-agent ensembles (§A.13.48). ONE PHYSICAL
     LINE PER KEY — the applier does a surgical single-locale regex swap on
     that line and dies rather than reflow a file the verify gate reads by
     line. sv/da/no/fi carry [NSR-FLAG] until reviewed. */
  strings: {
    title:        {en:'Number Bonds Board',de:'Zahlen zerlegen',fr:'Le cadre des parts',it:'Il telaio delle parti',es:'El marco de las partes',pt:'O quadro das partes',nl:'Splitsen',sv:'Dela upp talet',da:'Del tallet op',no:'Del opp tallet',fi:'Luvun hajotelma'},
    instruction:  {en:'Carry one counter across — look at the top: the whole never changes.',de:'Trage ein Plättchen hinüber — schau oben hin: das Ganze bleibt gleich.',fr:'Fais passer un jeton — regarde en haut : le tout ne change jamais.',it:'Sposta un gettone — guarda in alto: il tutto non cambia mai.',es:'Pasa una ficha al otro lado — mira arriba: el total nunca cambia.',pt:'Leve uma ficha para o outro lado — olhe para cima: o total nunca muda.',nl:'Schuif één fiche naar de andere kant — kijk naar boven: het geheel blijft gelijk.',sv:'Flytta en bricka — titta uppåt: det hela ändras aldrig.',da:'Flyt en brik — se opad: det hele ændrer sig aldrig.',no:'Flytt en brikke — se oppover: det hele endrer seg aldri.',fi:'Siirrä yksi nappula — katso ylös: kokonaisuus ei muutu koskaan.'},
    wholeLabel:   {en:'Altogether',de:'Das Ganze',fr:'En tout',it:'In tutto',es:'En total',pt:'No total',nl:'Het geheel',sv:'Allt tillsammans',da:'I alt',no:'Til sammen',fi:'Yhteensä'},
    partOne:      {en:'This part',de:'Dieser Teil',fr:'Cette part',it:'Questa parte',es:'Esta parte',pt:'Esta parte',nl:'Dit deel',sv:'Den här delen',da:'Denne del',no:'Denne delen',fi:'Tämä osa'},
    partTwo:      {en:'That part',de:'Jener Teil',fr:'L’autre part',it:'L’altra parte',es:'La otra parte',pt:'A outra parte',nl:'Dat deel',sv:'Den andra delen',da:'Den anden del',no:'Den andre delen',fi:'Toinen osa'},
    moreWhole:    {en:'One more altogether',de:'Eins mehr im Ganzen',fr:'Un de plus en tout',it:'Uno in più in tutto',es:'Uno más en total',pt:'Mais um no total',nl:'Eén meer in het geheel',sv:'En mer allt tillsammans',da:'En mere i alt',no:'Én mer til sammen',fi:'Yksi lisää yhteensä'},
    fewerWhole:   {en:'One fewer altogether',de:'Eins weniger im Ganzen',fr:'Un de moins en tout',it:'Uno in meno in tutto',es:'Uno menos en total',pt:'Menos um no total',nl:'Eén minder in het geheel',sv:'En mindre allt tillsammans',da:'En mindre i alt',no:'Én mindre til sammen',fi:'Yksi vähemmän yhteensä'},
    coverBtn:     {en:'Cover',de:'Zudecken',fr:'Cacher',it:'Copri',es:'Tapar',pt:'Cobrir',nl:'Afdekken',sv:'Täck över',da:'Dæk til',no:'Dekk til',fi:'Peitä'},
    uncoverBtn:   {en:'Uncover',de:'Aufdecken',fr:'Découvrir',it:'Scopri',es:'Destapar',pt:'Descobrir',nl:'Openmaken',sv:'Ta bort täcket',da:'Tag klædet af',no:'Ta av kledet',fi:'Paljasta'},
    coveredAria:  {en:'covered',de:'zugedeckt',fr:'caché',it:'coperto',es:'tapado',pt:'coberto',nl:'afgedekt',sv:'övertäckt',da:'tildækket',no:'tildekket',fi:'peitetty'},
    carryAria:    {en:'Carry one across',de:'Ein Plättchen hinübertragen',fr:'Faire passer un jeton',it:'Sposta un gettone',es:'Pasar una ficha',pt:'Levar uma ficha',nl:'Eén fiche overzetten',sv:'Flytta en bricka',da:'Flyt en brik',no:'Flytt en brikke',fi:'Siirrä yksi nappula'},
    splitFrame:   {en:'{whole} is {a} and {b}',de:'{whole} ist {a} und {b}',fr:'{whole}, c’est {a} et {b}',it:'{whole} è {a} e {b}',es:'{whole} es {a} y {b}',pt:'{whole} é {a} e {b}',nl:'{whole} is {a} en {b}',sv:'{whole} är {a} och {b}',da:'{whole} er {a} og {b}',no:'{whole} er {a} og {b}',fi:'{whole} on {a} ja {b}'},
    allWays:      {en:'All the ways',de:'Alle Zerlegungen',fr:'Toutes les façons',it:'Tutti i modi',es:'Todas las maneras',pt:'Todas as maneiras',nl:'Alle splitsingen',sv:'Alla sätt',da:'Alle måder',no:'Alle måter',fi:'Kaikki tavat'},
    waysHint:     {en:'Each new way you find is written down here.',de:'Jede neue Zerlegung, die ihr findet, wird hier notiert.',fr:'Chaque nouvelle façon trouvée s’écrit ici.',it:'Ogni nuovo modo che trovate viene scritto qui.',es:'Cada manera nueva que encuentren se anota aquí.',pt:'Cada maneira nova que vocês acharem é anotada aqui.',nl:'Elke nieuwe splitsing die jullie vinden komt hier te staan.',sv:'Varje nytt sätt ni hittar skrivs upp här.',da:'Hver ny måde, I finder, bliver skrevet op her.',no:'Hver ny måte dere finner, blir skrevet opp her.',fi:'Jokainen löytämänne uusi tapa kirjataan tähän.'},
    showEmpty:    {en:'Show the empty rows',de:'Leere Zeilen zeigen',fr:'Afficher les lignes vides',it:'Mostra le righe vuote',es:'Mostrar las filas vacías',pt:'Mostrar as linhas vazias',nl:'Lege rijen tonen',sv:'Visa de tomma raderna',da:'Vis de tomme rækker',no:'Vis de tomme radene',fi:'Näytä tyhjät rivit'},
    todaysWhole:  {en:'Today’s number',de:'Zahl des Tages',fr:'Le nombre du jour',it:'Il numero di oggi',es:'El número de hoy',pt:'O número de hoje',nl:'Het getal van vandaag',sv:'Dagens tal',da:'Dagens tal',no:'Dagens tall',fi:'Päivän luku'},
    printBtn:     {en:'Print',de:'Drucken',fr:'Imprimer',it:'Stampa',es:'Imprimir',pt:'Imprimir',nl:'Afdrukken',sv:'Skriv ut',da:'Udskriv',no:'Skriv ut',fi:'Tulosta'},
    resetBtn:     {en:'Start again',de:'Neu beginnen',fr:'Recommencer',it:'Ricomincia',es:'Empezar de nuevo',pt:'Começar de novo',nl:'Opnieuw beginnen',sv:'Börja om',da:'Start forfra',no:'Start på nytt',fi:'Aloita alusta'},
    setBand:      {en:'Numbers up to',de:'Zahlenraum bis',fr:'Nombres jusqu’à',it:'Numeri fino a',es:'Números hasta',pt:'Números até',nl:'Getallen tot',sv:'Tal upp till',da:'Tal op til',no:'Tall opp til',fi:'Luvut enintään'},
    setNumerals:  {en:'Show the numbers',de:'Zahlen anzeigen',fr:'Afficher les nombres',it:'Mostra i numeri',es:'Mostrar los números',pt:'Mostrar os números',nl:'Getallen tonen',sv:'Visa talen',da:'Vis tallene',no:'Vis tallene',fi:'Näytä luvut'},
    setNotation:  {en:'Show it written',de:'Als Rechnung zeigen',fr:'Afficher l’écriture',it:'Mostra la scrittura',es:'Mostrar la escritura',pt:'Mostrar a escrita',nl:'Als som tonen',sv:'Visa som uttryck',da:'Vis som regnestykke',no:'Vis som regnestykke',fi:'Näytä laskuna'},
    setVoice:     {en:'Say it aloud',de:'Laut vorlesen',fr:'Dire à voix haute',it:'Leggi ad alta voce',es:'Decirlo en voz alta',pt:'Dizer em voz alta',nl:'Hardop zeggen',sv:'Säg det högt',da:'Sig det højt',no:'Si det høyt',fi:'Sano ääneen'},
    gateBand:     {en:'Numbers past ten are part of the Teacher plan.',de:'Zahlen über zehn gehören zum Lehrer-Paket.',fr:'Les nombres au-delà de dix font partie de l’offre Enseignant.',it:'I numeri oltre il dieci fanno parte del piano Insegnante.',es:'Los números mayores que diez son parte del plan Docente.',pt:'Os números acima de dez fazem parte do plano Professor.',nl:'Getallen boven tien horen bij het Leerkracht-pakket.',sv:'Tal över tio ingår i Lärarpaketet.',da:'Tal over ti er en del af Lærerpakken.',no:'Tall over ti er en del av Lærerpakken.',fi:'Kymmentä suuremmat luvut kuuluvat Opettaja-tilaukseen.'},
    gateWays:     {en:'The all-the-ways record is part of the Teacher plan.',de:'Die Übersicht aller Zerlegungen gehört zum Lehrer-Paket.',fr:'Le relevé de toutes les façons fait partie de l’offre Enseignant.',it:'Il registro di tutti i modi fa parte del piano Insegnante.',es:'El registro de todas las maneras es parte del plan Docente.',pt:'O registo de todas as maneiras faz parte do plano Professor.',nl:'Het overzicht van alle splitsingen hoort bij het Leerkracht-pakket.',sv:'Sammanställningen av alla sätt ingår i Lärarpaketet.',da:'Oversigten over alle måder er en del af Lærerpakken.',no:'Oversikten over alle måter er en del av Lærerpakken.',fi:'Kaikkien tapojen kooste kuuluu Opettaja-tilaukseen.'},
    gatePrint:    {en:'Printing is part of the Teacher plan.',de:'Das Drucken gehört zum Lehrer-Paket.',fr:'L’impression fait partie de l’offre Enseignant.',it:'La stampa fa parte del piano Insegnante.',es:'La impresión es parte del plan Docente.',pt:'A impressão faz parte do plano Professor.',nl:'Afdrukken hoort bij het Leerkracht-pakket.',sv:'Utskrift ingår i Lärarpaketet.',da:'Udskrivning er en del af Lærerpakken.',no:'Utskrift er en del av Lærerpakken.',fi:'Tulostus kuuluu Opettaja-tilaukseen.'},
    unlock:       {en:'See the Teacher plan',de:'Lehrer-Paket ansehen',fr:'Voir l’offre Enseignant',it:'Vedi il piano Insegnante',es:'Ver el plan Docente',pt:'Ver o plano Professor',nl:'Bekijk het Leerkracht-pakket',sv:'Se Lärarpaketet',da:'Se Lærerpakken',no:'Se Lærerpakken',fi:'Katso Opettaja-tilaus'}
  },

  /* =================================================================
     THE DIAGRAM — per-locale classroom convention.

     Positions are percentages of the sheet box, so the containers and
     the connectors agree by construction at every viewport.

     EVERY LOCALE SHIPS 'default' UNTIL ITS NATIVE ENSEMBLE RULES.
     The German Zahlenhaus, the Dutch splitsschema and the Nordic
     ten-friends framing are real traditions, but their exact geometry
     exists nowhere in this repo — inventing one would look authoritative
     and be wrong (the letter-studio RULING lesson, where six ensembles
     independently reported that an Anglo convention was not theirs).
     The descriptor below is deliberately ready for them and deliberately
     not yet filled in. Renderer-true fields ONLY: whole, parts,
     connector, ways. A field nothing draws is dead data.
     ================================================================= */
  DIAGRAM: {
    'default': { system: 'bond', layout: 'whole-above', legs: [25, 75], ways: 'ladder' }
  },
  diagramFor: function (locale) { return this.DIAGRAM[locale] || this.DIAGRAM['default']; },

  /* Number words 0-20 x 11 — DERIVED from the live place-value-core.js
     `_NUMBER_WORD_HELPERS.<loc>(n,'cardinal')` and kept honest by the
     drift gate in verify-part-whole-frame.js. Do not hand-edit: fix the
     core, re-derive, re-run the gate. */
  NUM_WORDS: {
    en: ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'],
    de: ['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn','zwanzig'],
    fr: ['zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix','onze','douze','treize','quatorze','quinze','seize','dix-sept','dix-huit','dix-neuf','vingt'],
    it: ['zero','uno','due','tre','quattro','cinque','sei','sette','otto','nove','dieci','undici','dodici','tredici','quattordici','quindici','sedici','diciassette','diciotto','diciannove','venti'],
    es: ['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte'],
    pt: ['zero','um','dois','três','quatro','cinco','seis','sete','oito','nove','dez','onze','doze','treze','quatorze','quinze','dezesseis','dezessete','dezoito','dezenove','vinte'],
    nl: ['nul','een','twee','drie','vier','vijf','zes','zeven','acht','negen','tien','elf','twaalf','dertien','veertien','vijftien','zestien','zeventien','achttien','negentien','twintig'],
    sv: ['noll','ett','två','tre','fyra','fem','sex','sju','åtta','nio','tio','elva','tolv','tretton','fjorton','femton','sexton','sjutton','arton','nitton','tjugo'],
    da: ['nul','en','to','tre','fire','fem','seks','syv','otte','ni','ti','elleve','tolv','tretten','fjorten','femten','seksten','sytten','atten','nitten','tyve'],
    no: ['null','én','to','tre','fire','fem','seks','sju','åtte','ni','ti','elleve','tolv','tretten','fjorten','femten','seksten','sytten','atten','nitten','tjue'],
    fi: ['nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän','kymmenen','yksitoista','kaksitoista','kolmetoista','neljätoista','viisitoista','kuusitoista','seitsemäntoista','kahdeksantoista','yhdeksäntoista','kaksikymmentä'],
  },

  STORE_KEY: 'lcs:part-whole-frame:v1',
  ENT_TRUST_DAYS: 14,

  MIN_WHOLE: 3,
  FREE_MAX_WHOLE: 10,
  MAX_WHOLE: 20,

  defaults: { band: '10', numerals: true, notation: false, voice: true },
  settings: [
    { key: 'band', type: 'choice', labelKey: 'setBand', options: ['10', '20'] },
    { key: 'numerals', type: 'toggle', labelKey: 'setNumerals' },
    { key: 'notation', type: 'toggle', labelKey: 'setNotation' },
    { key: 'voice', type: 'toggle', labelKey: 'setVoice' }
  ],

  premium: false,

  /* =================================================================
     PURE ENGINE — no DOM, no storage, no api. Everything below is a
     function of {whole, a}; part B is derived on every read and has no
     slot of its own, so the parts CANNOT fail to sum to the whole.
     ================================================================= */
  newFrame: function (whole, a) {
    var w = this.clampWhole(whole);
    var pa = (typeof a === 'number') ? a : Math.floor(w / 2);
    return { whole: w, a: Math.max(0, Math.min(w, pa)) };
  },

  clampWhole: function (n) {
    n = Math.round(Number(n) || 0);
    if (n < this.MIN_WHOLE) return this.MIN_WHOLE;
    if (n > this.MAX_WHOLE) return this.MAX_WHOLE;
    return n;
  },

  /* the ONLY reader of part two. Never stored. */
  partB: function (f) { return f.whole - f.a; },

  /* carry exactly one counter. dir 'toB' takes one out of part one.
     Immutable; a no-op at either bound rather than a wrap or an error. */
  carry: function (f, dir) {
    var next = dir === 'toB' ? f.a - 1 : f.a + 1;
    if (next < 0 || next > f.whole) return { whole: f.whole, a: f.a };
    return { whole: f.whole, a: next };
  },

  /* the teacher's move. `a` is clamped, never scaled: growing the whole
     drops the new counter into part two, which is why the nest and a tray
     change together and the invariant never breaks mid-change. */
  setWhole: function (f, n) {
    var w = this.clampWhole(n);
    return { whole: w, a: Math.max(0, Math.min(w, f.a)) };
  },

  /* ordered pairs, 0+N .. N+0 — N+1 of them. Ordered because 0+7 and 7+0
     are distinct rows in the traditions that stack them into a house. */
  waysFor: function (n) { return Math.max(0, this.clampWhole(n) + 1); },

  splitKey: function (f) { return f.a + '+' + this.partB(f); },

  /* append if new; preserves discovery order — never sorted into the
     canonical staircase, because the child's route through the splits is
     theirs and re-ordering it silently corrects them. */
  recordSplit: function (list, f) {
    var k = this.splitKey(f);
    for (var i = 0; i < list.length; i++) if (list[i] === k) return list;
    return list.concat([k]);
  },

  /* teacher-facing tags only — never rendered on the stage. */
  familiesFor: function (f) {
    var out = [], b = this.partB(f);
    if (f.a === b) out.push('doubles');
    if (Math.abs(f.a - b) === 1) out.push('near-doubles');
    if (f.whole === 10) out.push('ten-friends');
    return out;
  },

  numberWord: function (n, lang) {
    var t = this.NUM_WORDS[lang] || this.NUM_WORDS.en;
    return (n >= 0 && n < t.length) ? t[n] : String(n);
  },

  /* =================================================================
     LIFECYCLE
     ================================================================= */
  init: function (api) {
    this.api = api;
    injectPartWholeFrameCSS();
    document.body.classList.add('pwf-wide');

    this._store = this._loadStore();
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];

    /* an optimistic pre-paint from the cached verdict, so a subscriber
       never sees a flash of the locked band (the heart-words idiom) */
    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';

    this.frame = this.newFrame(this._todaysWhole());
    this.ways = [];
    this.covers = { whole: false, a: false, b: false };
    this.showEmpty = false;
    this._drag = null;
    this._timers = [];

    this._fetchEntitlement();
    this.render();
  },

  destroy: function () { this._clearTimers(); },
  _after: function (ms, fn) { var id = setTimeout(fn, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },

  /* ⚠ NUMERIC day key. A 'Y-M-D' string is NOT comparable without zero
     padding ('2026-7-9' > '2026-7-10' is true) — the recorded date-key
     trap. Numeric, and compared only for equality. */
  _dayKey: function () {
    var d = new Date();
    return d.getUTCFullYear() * 10000 + (d.getUTCMonth() + 1) * 100 + d.getUTCDate();
  },

  /* Today's number: a deterministic rotation over the FREE band, so the
     tool opens on a shaped ritual rather than an arbitrary default and
     every classroom sees the same one (the Easel's _freshSession idiom). */
  _todaysWhole: function () {
    var span = this.FREE_MAX_WHOLE - this.MIN_WHOLE + 1;
    return this.MIN_WHOLE + (this._dayKey() % span);
  },

  _maxWhole: function () {
    var band = parseInt(this.api.settings.band, 10) || 10;
    if (!this.premium) return this.FREE_MAX_WHOLE;
    return Math.min(band, this.MAX_WHOLE);
  },

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)) || {}; }
    catch (_) { return {}; }
  },

  _saveStore: function () {
    var s = this._store || {};
    s.v = 1;
    s.settings = {};
    for (var i = 0; i < this.settings.length; i++) {
      var key = this.settings[i].key;
      s.settings[key] = this.api.settings[key];
    }
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(s)); } catch (_) {}
    this._store = s;
  },

  _fetchEntitlement: function () {
    var self = this;
    var tok = null;
    try { tok = localStorage.getItem('accessToken'); } catch (_) {}
    if (!tok) return;
    try {
      fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + tok } })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          var tier = d && d.user && d.user.subscriptionTier;
          var sub = d && d.subscription;
          self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
          self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
          self._saveStore();
          if (self._wrap) self.render();
        })
        .catch(function () {});
    } catch (_) {}
  },

  _say: function (text) {
    if (!this.api.settings.voice || !text) return;
    try { LCSAudio.speak({ type: 'number', text: String(text), lang: this.api.lang }); } catch (_) {}
  },

  /* the spoken frame IS the moat: the locale's own way of saying a split */
  _sayerSplit: function () {
    var lang = this.api.lang, f = this.frame;
    var line = this.api.t('splitFrame')
      .replace('{whole}', this.numberWord(f.whole, lang))
      .replace('{a}', this.numberWord(f.a, lang))
      .replace('{b}', this.numberWord(this.partB(f), lang));
    if (!this.api.settings.voice) return;
    try { LCSAudio.speak({ type: 'ui', text: line, lang: lang }); } catch (_) {}
  },

  /* =================================================================
     MOVES
     ================================================================= */
  _carry: function (dir) {
    var before = this.frame;
    var next = this.carry(this.frame, dir);
    if (next.a === before.a) return false;      /* at a bound: a real no-op */
    this.frame = next;
    this.ways = this.recordSplit(this.ways, this.frame);
    this.api.sound(dir === 'toB' ? 520 : 620);
    this.render();
    this._sayerSplit();
    this.api.announce(this.api.t('splitFrame')
      .replace('{whole}', String(this.frame.whole))
      .replace('{a}', String(this.frame.a))
      .replace('{b}', String(this.partB(this.frame))));
    return true;
  },

  _setWhole: function (n) {
    var max = this._maxWhole();
    if (n > max) {
      if (!this.premium && n <= this.MAX_WHOLE) this._gateInline(this._wrap.querySelector('.pwf-head'), 'gateBand');
      return;
    }
    if (n < this.MIN_WHOLE) return;
    this.frame = this.setWhole(this.frame, n);
    this.ways = [];                    /* a new whole is a new question */
    this.render();
    this._say(this.numberWord(this.frame.whole, this.api.lang));
  },

  _toggleCover: function (which) {
    this.covers[which] = !this.covers[which];
    this.render();
  },

  _resetAll: function () {
    this.frame = this.newFrame(this._todaysWhole());
    this.ways = [];
    this.covers = { whole: false, a: false, b: false };
    this.render();
  },

  reset: function () { this._resetAll(); },

  onSettings: function (key) {
    if (key === 'band' && !this.premium && parseInt(this.api.settings.band, 10) > this.FREE_MAX_WHOLE) {
      this.api.settings.band = '10';
      this._saveStore();
      var self = this;
      requestAnimationFrame(function () {
        if (self._wrap) self._gateInline(self._wrap.querySelector('.pwf-head') || self._wrap, 'gateBand');
      });
      return;
    }
    this.frame = this.setWhole(this.frame, Math.min(this.frame.whole, this._maxWhole()));
    this._saveStore();
    if (this._wrap) this.render();
  },

  /* =================================================================
     RENDER
     ================================================================= */
  render: function () {
    var self = this, api = this.api;
    this._clearTimers();
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'pwf-wrap');
    this._wrap = wrap;

    wrap.appendChild(this._buildHead());

    /* ⚠ On a wide screen the record sits BESIDE the frame, not under it.
       Stacked, a whole of 20 pushed the record's own controls to 960px —
       past the bottom of a 900px desktop, which is the operator's
       viewport and the one the DoD measures hardest. Side by side is also
       the truer classroom layout: the teacher wants the frame and the
       list of ways in view at the same time. */
    var main = api.el('div', 'pwf-main');
    var left = api.el('div', 'pwf-col');
    left.appendChild(this._buildSheet());
    if (api.settings.notation && !this._anyCovered()) left.appendChild(this._buildNotation());
    left.appendChild(this._buildControls());
    main.appendChild(left);
    if (this.premium) main.appendChild(this._buildWays());
    wrap.appendChild(main);

    if (this.premium) wrap.appendChild(this._buildPrintSheet());

    api.stage.appendChild(wrap);
  },

  _anyCovered: function () { return this.covers.whole || this.covers.a || this.covers.b; },

  /* ---- the whole stepper: the teacher's lever ---- */
  _buildHead: function () {
    var self = this, api = this.api;
    var head = api.el('div', 'pwf-head');

    var lbl = api.el('span', 'pwf-headlbl');
    lbl.textContent = api.t('todaysWhole');
    head.appendChild(lbl);

    /* ⚠ each button's accessible name is its own phrase, never
       `label + number` concatenation — that construction broke Finnish
       case-marking on open-number-line and three ensembles caught it. */
    var mk = function (delta, labelKey) {
      var b = api.el('button', 'pwf-step'); b.type = 'button';
      b.textContent = delta < 0 ? '−' : '+';
      b.setAttribute('aria-label', api.t(labelKey));
      b.title = api.t(labelKey);
      b.addEventListener('click', function () { self._setWhole(self.frame.whole + delta); });
      return b;
    };
    head.appendChild(mk(-1, 'fewerWhole'));
    var val = api.el('span', 'pwf-headval');
    val.textContent = String(this.frame.whole);
    val.setAttribute('aria-live', 'polite');
    head.appendChild(val);
    head.appendChild(mk(1, 'moreWhole'));

    return head;
  },

  /* ---- the frame itself ----
     ⚠ FLOW, NOT ABSOLUTE COORDINATES. The first build placed the three
     containers at x/y percentages from the descriptor. That works only
     while every container is the same height: at a whole of 20 the nest
     grows to five rows, overflows the frame, collides with the header,
     and leaves the connector legs ending in mid-air — visible instantly
     in the 1024 capture and invisible to every measured gate, because
     nothing overflowed horizontally and every control still fitted.
     The descriptor now names the ARRANGEMENT and the leg positions; the
     browser does the layout, so any tray can grow to any depth. */
  _buildSheet: function () {
    var api = this.api;
    var d = this.diagramFor(api.lang);
    var sheet = api.el('div', 'pwf-sheet pwf-layout-' + d.layout);
    sheet.setAttribute('data-system', d.system);
    /* JS reports the DEPTH; CSS owns every size. An inline --pwf-dot beat
       the phone media query (inline styles win), so the tray width and the
       dot size drifted apart and the counters packed six to a row instead
       of five — five is what makes a tray countable at a glance. */
    var rows = Math.max(1, Math.min(4, Math.ceil(this.frame.whole / 5)));
    sheet.setAttribute('data-rows', String(rows));

    sheet.appendChild(this._buildContainer('whole', this.frame.whole, 'wholeLabel'));

    /* the legs, between the two rows, drawn to the descriptor's x's */
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'pwf-legs');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < d.legs.length; i++) {
      var ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      ln.setAttribute('x1', '50'); ln.setAttribute('y1', '0');
      ln.setAttribute('x2', String(d.legs[i])); ln.setAttribute('y2', '100');
      ln.setAttribute('class', 'pwf-leg');
      svg.appendChild(ln);
    }
    sheet.appendChild(svg);

    var row = api.el('div', 'pwf-parts');
    row.appendChild(this._buildContainer('a', this.frame.a, 'partOne'));
    row.appendChild(this._buildContainer('b', this.partB(this.frame), 'partTwo'));
    sheet.appendChild(row);

    return sheet;
  },

  /* One container. When covered, the counters and the numeral are REMOVED
     from the DOM — not hidden, not aria-hidden. A hidden count is still a
     count to anything that reads the tree, and the whole point of the
     cloth is that the number is genuinely not available.

     ⚠ THE TRAY IS THE HANDLE, NOT THE COUNTER. The first build made every
     counter a button and the sweep measured them at 19-22px — a fifth of
     the K-2 tap floor, on the one control a six-year-old actually uses.
     Twenty 44px buttons cannot fit a phone tray, so the fix is not a
     bigger dot: the counters are interchangeable, so ONE affordance per
     tray is the honest model. You reach into the bowl and take one out,
     which is also closer to the real manipulative than pinching a
     specific disc. Dots are now decorative; the tray is a real button and
     is measured at 150x76 or more. */
  _buildContainer: function (which, count, labelKey) {
    var self = this, api = this.api;
    var covered = this.covers[which];
    var live = which !== 'whole' && !covered;
    var box = api.el('div', 'pwf-box pwf-box-' + which + (covered ? ' pwf-covered' : ''));

    /* caption and cloth share one 44px line — stacked they cost the frame
       ~60px it cannot spare once the trays are four rows deep */
    var caprow = api.el('div', 'pwf-caprow');
    var cap = api.el('div', 'pwf-cap');
    cap.textContent = api.t(labelKey);
    caprow.appendChild(cap);
    var cbtn = api.el('button', 'pwf-clothbtn'); cbtn.type = 'button';
    cbtn.textContent = covered ? api.t('uncoverBtn') : api.t('coverBtn');
    cbtn.setAttribute('aria-pressed', covered ? 'true' : 'false');
    cbtn.addEventListener('click', function () { self._toggleCover(which); });
    caprow.appendChild(cbtn);
    box.appendChild(caprow);

    var dish;
    if (live) {
      dish = api.el('button', 'pwf-dish pwf-dish-live');
      dish.type = 'button';
      dish.setAttribute('aria-label', api.t(labelKey) + ' — ' + api.t('carryAria'));
      var dir = which === 'a' ? 'toB' : 'toA';
      dish.addEventListener('click', function (e) {
        if (self._dragMoved) { self._dragMoved = false; return; }
        e.preventDefault();
        self._carry(dir);
      });
      dish.addEventListener('keydown', function (e) {
        var fwd = (e.key === 'ArrowRight' && which === 'a') || (e.key === 'ArrowLeft' && which === 'b');
        if (fwd) { e.preventDefault(); self._carry(dir); }
      });
      dish.addEventListener('pointerdown', function (e) { self._startDrag(dish, dir, e); });
    } else {
      dish = api.el('div', 'pwf-dish');
      dish.setAttribute('role', 'group');
      dish.setAttribute('aria-label', api.t(labelKey) + (covered ? ', ' + api.t('coveredAria') : ''));
    }
    if (which !== 'whole') dish.setAttribute('data-drop', which);

    if (covered) {
      var cloth = api.el('div', 'pwf-cloth');
      cloth.setAttribute('aria-hidden', 'true');
      dish.appendChild(cloth);
    } else {
      for (var i = 0; i < count; i++) dish.appendChild(this._buildCounter(which, i));
    }
    box.appendChild(dish);

    if (!covered && api.settings.numerals) {
      var num = api.el('div', 'pwf-num');
      num.textContent = String(count);
      box.appendChild(num);
    }

    return box;
  },

  /* Counters are decorative: the tray owns the interaction (see
     _buildContainer). The nest's dots are the same shape as the parts'
     so the eye reads them as the same things, gathered — but the nest is
     never a drop target, because it is a count, not a place. */
  _buildCounter: function (which) {
    var d = this.api.el('span', 'pwf-dot' + (which === 'whole' ? ' pwf-dot-whole' : ''));
    d.setAttribute('aria-hidden', 'true');
    return d;
  },

  /* Drag: a body-level ghost, a rect hit-test, and a carry only when the
     pointer is released over the OTHER tray. Released anywhere else, the
     counter simply stays where it was — there is no way to drop a counter
     into the nest or onto the floor, so no state exists in which the
     parts do not sum to the whole. */
  _startDrag: function (tile, dir, e) {
    if (e.button !== undefined && e.button !== 0) return;
    var self = this;
    e.preventDefault();
    this._dragMoved = false;

    var r = tile.getBoundingClientRect();
    var ghost = document.createElement('span');
    ghost.className = 'pwf-ghost';
    ghost.style.width = r.width + 'px';
    ghost.style.height = r.height + 'px';
    ghost.style.left = r.left + 'px';
    ghost.style.top = r.top + 'px';
    document.body.appendChild(ghost);
    tile.classList.add('pwf-lifted');

    var target = dir === 'toB' ? 'b' : 'a';
    var dropEl = this._wrap.querySelector('[data-drop="' + target + '"]');
    var ox = e.clientX - r.left, oy = e.clientY - r.top;

    try { tile.setPointerCapture(e.pointerId); } catch (_) {}

    var move = function (ev) {
      self._dragMoved = true;
      ghost.style.left = (ev.clientX - ox) + 'px';
      ghost.style.top = (ev.clientY - oy) + 'px';
      if (dropEl) dropEl.classList.toggle('pwf-over', self._inside(dropEl, ev.clientX, ev.clientY));
    };
    var up = function (ev) {
      tile.removeEventListener('pointermove', move);
      tile.removeEventListener('pointerup', up);
      tile.removeEventListener('pointercancel', up);
      try { tile.releasePointerCapture(ev.pointerId); } catch (_) {}
      if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
      tile.classList.remove('pwf-lifted');
      if (dropEl) dropEl.classList.remove('pwf-over');
      if (self._dragMoved && dropEl && self._inside(dropEl, ev.clientX, ev.clientY)) self._carry(dir);
    };
    tile.addEventListener('pointermove', move);
    tile.addEventListener('pointerup', up);
    tile.addEventListener('pointercancel', up);
  },

  _inside: function (el, x, y) {
    var r = el.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  },

  /* ---- the written form, only when the teacher asks for it ---- */
  _buildNotation: function () {
    var api = this.api, f = this.frame;
    var n = api.el('div', 'pwf-notation');
    n.textContent = f.whole + ' = ' + f.a + ' + ' + this.partB(f);
    return n;
  },

  /* ---- controls. No Check: there is nothing to check. ---- */
  _buildControls: function () {
    var self = this, api = this.api;
    var row = api.el('div', 'pwf-controls');

    var again = api.el('button', 'pwf-linkbtn'); again.type = 'button';
    again.textContent = api.t('resetBtn');
    again.addEventListener('click', function () { self._resetAll(); });
    row.appendChild(again);

    var pr = api.el('button', 'pwf-linkbtn' + (this.premium ? '' : ' pwf-locked')); pr.type = 'button';
    pr.textContent = api.t('printBtn');
    pr.addEventListener('click', function () {
      if (!self.premium) { self._gateInline(row, 'gatePrint'); return; }
      try { window.print(); } catch (_) {}
    });
    row.appendChild(pr);

    if (!this.premium) {
      var ways = api.el('button', 'pwf-linkbtn pwf-locked'); ways.type = 'button';
      ways.textContent = api.t('allWays');
      ways.addEventListener('click', function () { self._gateInline(row, 'gateWays'); });
      row.appendChild(ways);
    }

    return row;
  },

  /* ---- all the ways (premium). Rows appear AS FOUND. Empty rows are
     never pre-drawn by default: a pre-drawn empty row is a "you missed
     three" verdict wearing a costume. The teacher can opt in when the
     class is deliberately hunting systematically. ---- */
  _buildWays: function () {
    var self = this, api = this.api;
    var box = api.el('div', 'pwf-ways');

    var h = api.el('div', 'pwf-wayshead');
    var t = api.el('span', 'pwf-wayslbl'); t.textContent = api.t('allWays');
    h.appendChild(t);

    var toggle = api.el('button', 'pwf-waystoggle'); toggle.type = 'button';
    toggle.textContent = api.t('showEmpty');
    toggle.setAttribute('aria-pressed', this.showEmpty ? 'true' : 'false');
    toggle.addEventListener('click', function () { self.showEmpty = !self.showEmpty; self.render(); });
    h.appendChild(toggle);
    box.appendChild(h);

    var hint = api.el('div', 'pwf-wayshint'); hint.textContent = api.t('waysHint');
    box.appendChild(hint);

    var list = api.el('div', 'pwf-wayslist');
    var seen = {};
    for (var i = 0; i < this.ways.length; i++) {
      seen[this.ways[i]] = true;
      list.appendChild(this._wayRow(this.ways[i], false));
    }
    if (this.showEmpty) {
      for (var a = 0; a <= this.frame.whole; a++) {
        var k = a + '+' + (this.frame.whole - a);
        if (!seen[k]) list.appendChild(this._wayRow(k, true));
      }
    }
    box.appendChild(list);
    return box;
  },

  _wayRow: function (key, blank) {
    var api = this.api;
    var parts = key.split('+');
    var row = api.el('div', 'pwf-wayrow' + (blank ? ' pwf-wayblank' : ''));
    var l = api.el('span', 'pwf-waycell'); l.textContent = blank ? '' : parts[0];
    var r = api.el('span', 'pwf-waycell'); r.textContent = blank ? '' : parts[1];
    row.append(l, r);
    return row;
  },

  /* ---- the printable (premium). Built only when entitled, so the
     premium DOM does not exist for a free visitor. ---- */
  _buildPrintSheet: function () {
    var api = this.api;
    var sheet = api.el('div', 'pwf-printsheet');
    var head = api.el('div', 'pwf-printhead');
    head.textContent = api.t('wholeLabel') + ': ' + this.frame.whole;
    sheet.appendChild(head);
    for (var a = 0; a <= this.frame.whole; a++) {
      var row = api.el('div', 'pwf-printrow');
      var c1 = api.el('span', 'pwf-printcell');
      var c2 = api.el('span', 'pwf-printcell');
      sheet.appendChild(row);
      row.append(c1, c2);
    }
    return sheet;
  },

  /* ---- the upsell strip: non-modal, single-instance, self-expiring ---- */
  _gateInline: function (host, key) {
    var api = this.api;
    if (!host) return;
    var old = this._wrap.querySelector('.pwf-gate');
    if (old) old.remove();
    var g = api.el('div', 'pwf-gate');
    var txt = api.el('span');
    txt.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-part-whole-frame';
    a.target = '_top';
    a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(txt, a);
    host.insertAdjacentElement('beforebegin', g);
    this._after(12000, function () { if (g.parentNode) g.remove(); });
  }
};

function injectPartWholeFrameCSS() {
  if (document.getElementById('pwf-style')) return;
  var st = document.createElement('style');
  st.id = 'pwf-style';
  st.textContent = ''
    + '.pwf-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;}'

    /* the teacher's stepper */
    + '.pwf-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;}'
    + '.pwf-headlbl{font-family:Nunito,system-ui,sans-serif;font-size:15px;color:#3C7C72;}'
    + '.pwf-headval{font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-size:30px;line-height:1;'
    +   'min-width:52px;text-align:center;color:#146B5E;}'
    + '.pwf-step{min-width:44px;min-height:44px;border-radius:12px;border:2px solid rgba(20,107,94,.35);'
    +   'background:#FFFDF7;color:#146B5E;font-size:22px;line-height:1;cursor:pointer;}'
    + '.pwf-step:hover{background:#F3EADA;}'

    /* the frame */
    /* Flow layout: the sheet sizes itself to whatever the trays hold, so
       a whole of 3 and a whole of 20 are both contained by construction. */
    + '.pwf-sheet{display:flex;flex-direction:column;align-items:center;width:min(100%,620px);'
    +   'padding:16px 14px 18px;background:#FFFDF7;'
    +   'border:2px solid rgba(20,107,94,.22);border-radius:18px;'
    +   'box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 6px 18px rgba(20,107,94,.08);}'
    + '.pwf-legs{width:min(100%,340px);height:26px;flex:0 0 auto;}'
    + '.pwf-leg{stroke:rgba(20,107,94,.32);stroke-width:1.4;vector-effect:non-scaling-stroke;}'
    + '.pwf-parts{display:flex;gap:18px;align-items:flex-start;justify-content:center;'
    +   'flex-wrap:nowrap;width:100%;}'
    + '.pwf-box{display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0;}'
    + '.pwf-caprow{display:flex;align-items:center;gap:8px;min-height:44px;}'
    + '.pwf-cap{font-family:Nunito,system-ui,sans-serif;font-size:15px;color:#3C7C72;white-space:nowrap;}'
    /* The tray IS the control, so it carries the tap floor — comfortably,
       at 150x76 and up. Five dots per row keeps the count readable. */
    /* five counters per row, always: the tray width is DERIVED from the
       dot size rather than fixed, so the two can never drift apart */
    + '.pwf-sheet{--pwf-dot:22px;--pwf-gap:6px;--pwf-pad:10px;}'
    + '.pwf-sheet[data-rows="3"]{--pwf-dot:19px;}'
    + '.pwf-sheet[data-rows="4"]{--pwf-dot:16px;}'
    + '.pwf-dish{display:flex;flex-wrap:wrap;align-content:center;justify-content:center;'
    +   'gap:var(--pwf-gap);padding:var(--pwf-pad);'
    /* content-box: `width` is the CONTENT box, so padding must NOT be in
       the sum — adding it made every tray exactly one dot too wide and
       six packed per row instead of five. */
    +   'width:calc(5 * var(--pwf-dot) + 4 * var(--pwf-gap));'
    +   'min-height:calc(2 * var(--pwf-dot) + var(--pwf-gap));'
    +   'border-radius:14px;background:#F3EADA;'
    +   'border:2px solid rgba(20,107,94,.18);margin:0;font:inherit;color:inherit;box-sizing:content-box;}'
    + '.pwf-dish-live{cursor:grab;touch-action:none;}'
    + '.pwf-dish-live:hover{background:#EFE3CE;}'
    + '.pwf-dish-live:active{cursor:grabbing;}'
    + '.pwf-dish-live:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
    + '.pwf-box-whole .pwf-dish{background:#FBF3E4;border-style:dashed;}'
    + '.pwf-dish.pwf-over{border-color:#C2562F;background:#FBE6DA;}'
    + '.pwf-num{font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-size:26px;line-height:1;color:#146B5E;}'

    /* counters — ONE colour, and decorative. A five-and-five break is the
       rack's perceptual theory and belongs to Rekenrek, not here. */
    + '.pwf-dot{display:block;width:var(--pwf-dot);height:var(--pwf-dot);border-radius:50%;background:#F2784B;'
    +   'border:2px solid #C2562F;padding:0;flex:0 0 auto;}'
    + '.pwf-lifted{opacity:.5;}'
    + '.pwf-ghost{position:fixed;z-index:60;border-radius:50%;background:#F2784B;border:2px solid #C2562F;'
    +   'pointer-events:none;box-shadow:0 6px 14px rgba(0,0,0,.22);}'

    /* the cloth */
    + '.pwf-cloth{width:100%;min-height:58px;border-radius:10px;'
    +   'background:repeating-linear-gradient(45deg,#DCC9A8 0 8px,#D3BE9B 8px 16px);'
    +   'box-shadow:0 2px 6px rgba(0,0,0,.12) inset;}'
    + '.pwf-clothbtn{min-height:44px;min-width:44px;padding:6px 14px;border-radius:999px;'
    +   'border:1px solid rgba(20,107,94,.3);background:#FFFDF7;color:#3C7C72;'
    +   'font-family:Nunito,system-ui,sans-serif;font-size:14px;cursor:pointer;}'

    + '.pwf-notation{font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-size:26px;color:#146B5E;}'

    /* controls */
    + '.pwf-controls{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;}'
    + '.pwf-linkbtn{min-height:44px;padding:9px 16px;border-radius:12px;border:2px solid rgba(20,107,94,.3);'
    +   'background:#FFFDF7;color:#146B5E;font-family:Nunito,system-ui,sans-serif;font-size:15px;cursor:pointer;}'
    + '.pwf-linkbtn:hover{background:#F3EADA;}'
    /* ⚠ A gated control must not read as a broken one — the recorded
       open-number-line defect. Full opacity, a coral edge that marks it
       as premium, and a lock glyph so the state is stated, not implied. */
    + '.pwf-locked{opacity:1;border-color:rgba(242,120,75,.55);color:#C2562F;}'
    + '.pwf-locked::before{content:"";display:inline-block;width:11px;height:13px;margin-right:7px;'
    +   'vertical-align:-1px;border:2px solid currentColor;border-radius:2px;border-top-width:6px;'
    +   'border-top-left-radius:7px;border-top-right-radius:7px;box-sizing:border-box;}'

    /* the frame and the record: side by side when there is room */
    + '.pwf-main{display:flex;gap:16px;align-items:flex-start;justify-content:center;'
    +   'flex-wrap:wrap;width:100%;}'
    /* both bases must fit the shell's 720px app box at a 1024 viewport,
       or the record wraps under the frame and the desktop fold returns */
    + '.pwf-col{display:flex;flex-direction:column;align-items:center;gap:10px;'
    +   'flex:1 1 370px;min-width:0;max-width:620px;}'

    /* all the ways */
    + '.pwf-ways{flex:0 1 270px;min-width:246px;max-width:330px;align-self:stretch;'
    +   'padding:12px 14px;border-radius:14px;background:#FFFDF7;'
    +   'border:2px solid rgba(20,107,94,.18);'
    /* the record is a log and legitimately grows — it scrolls inside its
       own box rather than pushing the frame off the screen */
    +   'max-height:min(70vh,560px);overflow-y:auto;}'
    + '@media (max-width:899px){.pwf-ways{flex:1 1 100%;max-width:620px;max-height:none;overflow:visible;}}'
    + '.pwf-wayshead{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;}'
    + '.pwf-wayslbl{font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-size:19px;color:#146B5E;}'
    + '.pwf-waystoggle{min-height:44px;min-width:44px;padding:6px 14px;border-radius:999px;'
    +   'border:1px solid rgba(20,107,94,.3);background:#FBF3E4;color:#3C7C72;'
    +   'font-family:Nunito,system-ui,sans-serif;font-size:14px;cursor:pointer;}'
    + '.pwf-wayshint{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#3C7C72;margin:4px 0 8px;}'
    + '.pwf-wayslist{display:flex;flex-direction:column;gap:5px;}'
    + '.pwf-wayrow{display:flex;gap:8px;}'
    + '.pwf-waycell{flex:1;min-height:38px;display:flex;align-items:center;justify-content:center;'
    +   'border-radius:9px;background:#F3EADA;border:1.5px solid rgba(20,107,94,.18);'
    +   'font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-size:19px;color:#146B5E;}'
    + '.pwf-wayblank .pwf-waycell{background:transparent;border-style:dashed;}'

    + '.pwf-gate{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;'
    +   'margin:0 0 8px;padding:9px 13px;border-radius:12px;background:#FBE6DA;'
    +   'border:1px solid rgba(242,120,75,.45);font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#8A3B1B;}'
    + '.pwf-gate a{color:#C2562F;font-weight:700;}'

    + '.pwf-printsheet{display:none;}'

    /* ⚠ Phone widths shrink the DOTS, never the tray and never the text:
       the tray carries the tap floor and the caption carries the 14px
       reading floor. The first pass took the caption to 13px and the
       sweep caught it at three widths. */
    + '@media (max-width:480px){'
    +   '.pwf-sheet{--pwf-dot:18px;--pwf-gap:5px;--pwf-pad:8px;}'
    +   '.pwf-sheet[data-rows="3"]{--pwf-dot:16px;}'
    +   '.pwf-sheet[data-rows="4"]{--pwf-dot:14px;}'
    +   '.pwf-dot{border-width:1.5px;}'
    +   '.pwf-headval{font-size:26px;}'
    +   '.pwf-cap{font-size:14px;}'
    +   '.pwf-num{font-size:23px;}'
    + '}'
    /* long compound titles break mid-word at 360 (the shell's .lcs-title
       carries overflow-wrap:anywhere) — stack the header instead. */
    + 'body.pwf-wide .lcs-header{flex-direction:column;}'
    /* ⚠ PHONE SCROLL OPT-IN (the letter-studio precedent). The shell sets
       `html, body { height:100%; overflow:hidden }`, so anything past the
       fold is not merely off-screen — it is UNREACHABLE. At a whole of 20
       the trays grow four rows deep and the controls land ~670px down,
       which is below a 640px phone. Opting the body into scrolling is the
       only way the bottom of this tool exists on a phone at all. */
    + '@media (max-width:560px){body.pwf-wide{overflow-y:auto;overflow-x:hidden;height:auto;min-height:100%;}}'

    + '@media (prefers-reduced-motion:reduce){.pwf-dot,.pwf-ghost{transition:none !important;}}'

    /* PRINT — re-tone EVERY ink, not just the headline one. The screen
       palette is tuned to sit on cream under a projector; left alone it
       prints nearly blank, which is exactly what the letter-studio print
       defect was. */
    + '@media print{'
    +   '.pwf-head,.pwf-controls,.pwf-ways,.pwf-gate,.pwf-clothbtn{display:none !important;}'
    +   '.pwf-sheet{border:1.5pt solid #666;page-break-inside:avoid;break-inside:avoid;}'
    +   '.pwf-leg{stroke:rgba(0,0,0,.55);}'
    +   '.pwf-dish{background:#fff;border:1pt solid #777;}'
    +   '.pwf-box-whole .pwf-dish{border-style:dashed;}'
    +   '.pwf-dot{background:#fff;border:1pt solid #444;}'
    +   '.pwf-cap{color:#000;}'
    +   '.pwf-num{color:#000;}'
    +   '.pwf-notation{color:#000;}'
    +   '.pwf-printsheet{display:block !important;padding:8mm;}'
    +   '.pwf-printhead{font-size:14pt;color:#000;margin-bottom:6mm;}'
    +   '.pwf-printrow{display:flex;gap:6mm;margin-bottom:5mm;page-break-inside:avoid;break-inside:avoid;}'
    +   '.pwf-printcell{flex:1;height:14mm;border:1pt dashed #666;border-radius:3pt;}'
    + '}';
  document.head.appendChild(st);
}
