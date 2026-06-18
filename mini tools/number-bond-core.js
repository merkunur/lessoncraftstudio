/* =====================================================================
   NUMBER BOND — MAKE-10 CORE   (number-bond-core.js)
   ---------------------------------------------------------------------
   E18 #1 — the PART-PART-WHOLE VERB engine. A bond shows a WHOLE (10) at
   the top joined to two PART circles; one part is given (filled with
   counters), the other is empty. The child taps the empty part to add
   counters until the two parts make the whole, then taps Check. This
   instantiates CCSS K.OA.A.4 ("for any number 1-9, find the number that
   makes 10 when added to the given number") — the iconic missing-part
   number bond.

   A genuinely NEW verb (decompose-a-whole / find-the-missing-part on a
   part-part-whole DIAGRAM) — distinct from E4 match-pairs' tap-to-pair
   (which holds K.OA.A.3 "Make the Number"), E13 array-build, E12 place-
   value columns. The bond diagram (whole + two parts + connecting lines)
   is a render no existing core produces.

   CLEAN SIBLING CORE — zero lines to any of the protected cores
   (choice-board / cvc-builder / match-pairs / place-value / ten-frame /
   word-builder / fractions / array / sort-bins / clock) and zero lines to
   lcs-shell.{js,css}. It mirrors their public contract (init / setupTask /
   render / paint / reset / isCorrect + an 11-locale strings dict +
   idempotent injectCSS) so a thin wrapper (number-bond-activity.js) merges
   it via Object.assign exactly like array-activity.js does.

   DISCRETE-STATE MODEL — `whole` (10), `given` (1-9, the filled part), and
   `filled` (the count the child has put in the empty part). The child taps
   the empty part to +1 (cap at whole) and a "−" control to −1.
   isCorrect = given + filled === whole (single targeted answer = whole −
   given; discrete, exact). MEASURED by the build-time gate — every round's
   parts sum to the whole; the gate accepts the correct missing part and
   rejects a wrong one. answerType:'state' (the bond IS the answer surface).

   CULTURE-NEUTRAL — numerals + counters are universal (7 + 3 = 10 in every
   locale); ONLY the title/instruction/prompt/hint + sr labels localize.

   TOUCH + POINTER PARITY — the part is a TAP target (pointerdown +
   touch-action:manipulation, the fractions/array tap precedent; no drag).
   ===================================================================== */
window.NumberBondCore = {

  /* CURATION FLAG: title / instruction / prompt frame + hint are the
     load-bearing per-locale strings (numerals universal). EN authored here;
     10 non-EN folded in by the per-locale native ensemble (§A.13.48). The
     prompt is an ICU template — {whole} is a DIGIT (universal). */
  strings: {
    title: {en:"Make 10",de:"Zehn voll machen",es:"Forma el 10",pt:"Faça o 10",fr:"Faire 10",it:"Forma il 10",nl:"Maak 10",sv:"Gör 10",da:"Lav 10",no:"Lag 10",fi:"Kympin kaverit"},
    instruction: {en:"The whole is at the top. One part is filled. Tap the empty part to add counters until the two parts make the whole. Tap Check when you're ready.",de:"Oben steht das Ganze. Ein Teil ist schon gefüllt. Tippe auf den leeren Teil und füge so viele Plättchen hinzu, bis beide Teile zusammen das Ganze ergeben. Tippe auf Prüfen, wenn du fertig bist.",es:"El todo está arriba. Una parte ya está completa. Toca la parte vacía para añadir fichas hasta que las dos partes formen el todo. Toca Comprobar cuando estés listo.",pt:"O todo está no alto. Uma parte já está preenchida. Toque na parte vazia para acrescentar fichas até que as duas partes formem o todo. Toque em Verificar quando estiver pronto.",fr:"Le tout est en haut. Une partie est déjà remplie. Touche la partie vide pour ajouter des jetons jusqu'à ce que les deux parties fassent le tout. Touche Vérifier quand tu es prêt.",it:"L'intero è in alto. Una parte è già piena. Tocca la parte vuota per aggiungere le pedine finché le due parti insieme formano l'intero. Tocca Controlla quando sei pronto.",nl:"Het geheel staat bovenaan. Eén deel is al gevuld. Tik op het lege deel om fiches toe te voegen totdat de twee delen samen het geheel maken. Tik op Controleer als je klaar bent.",sv:"Det hela står överst. En del är ifylld. Tryck på den tomma delen för att lägga till markörer tills de två delarna tillsammans blir det hela. Tryck på Kontrollera när du är klar.",da:"Det hele står øverst. Den ene del er fyldt. Tryk på den tomme del for at lægge brikker til, indtil de to dele tilsammen bliver det hele. Tryk på Tjek, når du er klar.",no:"Det hele tallet står øverst. Den ene delen er fylt. Trykk på den tomme delen for å legge til tellebrikker til de to delene blir det hele tallet. Trykk på Sjekk når du er klar.",fi:"Kokonaisluku on ylhäällä. Toinen osa on jo täytetty. Napauta tyhjää osaa ja lisää nappuloita, kunnes molemmat osat muodostavat kokonaisluvun. Napauta Tarkista, kun olet valmis."},
    prompt: {en:"Make {whole} — fill the empty part.",de:"Mach {whole} voll – fülle den leeren Teil.",es:"Forma {whole}: completa la parte vacía.",pt:"Faça {whole} — preencha a parte vazia.",fr:"Fais {whole} — remplis la partie vide.",it:"Forma il {whole}: riempi la parte vuota.",nl:"Maak {whole} — vul het lege deel.",sv:"Gör {whole} — fyll den tomma delen.",da:"Lav {whole} — fyld den tomme del.",no:"Lag {whole} – fyll den tomme delen.",fi:"Tee {whole} — täytä tyhjä osa."},
    hintWrong: {en:"Not yet — count both parts. Together they must make the whole.",de:"Noch nicht ganz – zähle beide Teile. Zusammen müssen sie das Ganze ergeben.",es:"Todavía no: cuenta las dos partes. Juntas deben formar el todo.",pt:"Ainda não — conte as duas partes. Juntas, elas precisam formar o todo.",fr:"Pas encore — compte les deux parties. Ensemble, elles doivent faire le tout.",it:"Non ancora: conta tutte e due le parti. Insieme devono formare l'intero.",nl:"Nog niet — tel beide delen. Samen moeten ze het geheel maken.",sv:"Inte än — räkna båda delarna. Tillsammans måste de bli det hela.",da:"Ikke endnu — tæl begge dele. Tilsammen skal de blive det hele.",no:"Ikke ennå – tell begge delene. Til sammen må de bli det hele tallet.",fi:"Ei vielä — laske molemmat osat. Yhdessä niiden pitää muodostaa kokonaisluku."},
    remove: {en:"Remove one",de:"Eins wegnehmen",es:"Quitar una ficha",pt:"Tirar uma",fr:"Enlever un jeton",it:"Togli una pedina",nl:"Eén weghalen",sv:"Ta bort en",da:"Fjern en",no:"Fjern én",fi:"Poista yksi"},
    srWhole: {en:"the whole",de:"das Ganze",es:"el todo",pt:"o todo",fr:"le tout",it:"l'intero",nl:"het geheel",sv:"det hela",da:"det hele",no:"det hele tallet",fi:"kokonaisluku"},
    srPartGiven: {en:"the filled part",de:"der gefüllte Teil",es:"la parte completa",pt:"a parte preenchida",fr:"la partie remplie",it:"la parte piena",nl:"het gevulde deel",sv:"den ifyllda delen",da:"den fyldte del",no:"den fylte delen",fi:"täytetty osa"},
    srPartFill: {en:"the empty part — tap to add counters",de:"der leere Teil – tippe, um Plättchen hinzuzufügen",es:"la parte vacía: toca para añadir fichas",pt:"a parte vazia — toque para acrescentar fichas",fr:"la partie vide — touche pour ajouter des jetons",it:"la parte vuota: tocca per aggiungere le pedine",nl:"het lege deel — tik om fiches toe te voegen",sv:"den tomma delen — tryck för att lägga till markörer",da:"den tomme del — tryk for at lægge brikker til",no:"den tomme delen – trykk for å legge til tellebrikker",fi:"tyhjä osa — napauta lisätäksesi nappuloita"},

    /* ── make-ten-to-add mode (1.OA.C.6) strings — EN authored; 10 non-EN
       folded in by the per-locale native ensemble. promptAdd is ICU:
       {first}/{second} are DIGITS (universal). ── */
    titleAdd: {en:"Make a Ten to Add",de:"Zehn machen beim Addieren",es:"Suma haciendo una decena",pt:"Faça uma dezena para somar",fr:"Faire dix pour additionner",it:"Fai dieci per addizionare",nl:"Aanvullen tot tien om op te tellen",sv:"Gör en tia när du adderar",da:"Lav en tier for at lægge sammen",no:"Lag en tier for å legge sammen",fi:"Täytä kymppi yhteenlaskussa"},
    instructionAdd: {en:"Break the second number into two parts so one part makes a ten with the first number. Tap the left part to fill it, then tap Check.",de:"Zerlege die zweite Zahl in zwei Teile, sodass ein Teil mit der ersten Zahl genau zehn ergibt. Tippe auf den linken Teil, um ihn zu füllen, und tippe dann auf Prüfen.",es:"Separa el segundo número en dos partes para que una de ellas forme una decena con el primero. Toca la parte de la izquierda para rellenarla y luego toca Comprobar.",pt:"Separe o segundo número em duas partes para que uma delas complete uma dezena com o primeiro número. Toque na parte da esquerda para preenchê-la e depois toque em Conferir.",fr:"Décompose le deuxième nombre en deux parties pour qu'une partie fasse dix avec le premier nombre. Touche la partie de gauche pour la remplir, puis touche Vérifier.",it:"Scomponi il secondo numero in due parti, in modo che una parte formi un dieci con il primo numero. Tocca la parte di sinistra per riempirla, poi tocca Controlla.",nl:"Splits het tweede getal in twee delen, zodat één deel samen met het eerste getal tien wordt. Tik op het linkerdeel om het te vullen en tik daarna op Controleer.",sv:"Dela upp det andra talet i två delar så att en del blir en tia tillsammans med det första talet. Tryck på den vänstra delen för att fylla den, och tryck sedan på Kontrollera.",da:"Del det andet tal i to dele, så den ene del bliver til ti sammen med det første tal. Tryk på den venstre del for at fylde den, og tryk så på Tjek.",no:"Del det andre tallet i to deler slik at den ene delen lager en tier sammen med det første tallet. Trykk på den venstre delen for å fylle den, og trykk så på Sjekk.",fi:"Jaa jälkimmäinen luku kahteen osaan niin, että toinen osa täyttää kympin ensimmäisen luvun kanssa. Napauta vasenta osaa täyttääksesi sen ja paina sitten Tarkista."},
    promptAdd: {en:"Make a ten: break {second} so one part makes 10 with {first}.",de:"Mach zehn: Zerlege {second} so, dass ein Teil mit {first} zusammen 10 ergibt.",es:"Haz una decena: separa {second} para que una parte forme 10 con {first}.",pt:"Faça uma dezena: separe {second} para que uma parte complete 10 com {first}.",fr:"Fais dix : décompose {second} pour qu'une partie fasse 10 avec {first}.",it:"Fai dieci: scomponi {second} in modo che una parte formi 10 con {first}.",nl:"Vul aan tot tien: splits {second} zodat één deel samen met {first} tien wordt.",sv:"Gör en tia: dela upp {second} så att en del blir 10 tillsammans med {first}.",da:"Lav en tier: del {second}, så den ene del bliver 10 sammen med {first}.",no:"Lag en tier: del opp {second} slik at den ene delen blir 10 sammen med {first}.",fi:"Täytä kymppi: jaa luku {second} niin, että toinen osa täyttää kympin luvun {first} kanssa."},
    hintAdd: {en:"Not yet — the left part should make exactly 10 with the first number.",de:"Noch nicht — der linke Teil muss mit der ersten Zahl zusammen genau 10 ergeben.",es:"Todavía no: la parte de la izquierda debe formar exactamente 10 con el primer número.",pt:"Ainda não — a parte da esquerda deve completar exatamente 10 com o primeiro número.",fr:"Pas encore — la partie de gauche doit faire exactement 10 avec le premier nombre.",it:"Non ancora — la parte di sinistra deve formare esattamente 10 con il primo numero.",nl:"Nog niet — het linkerdeel moet samen met het eerste getal precies tien worden.",sv:"Inte än – den vänstra delen ska bli precis 10 tillsammans med det första talet.",da:"Ikke helt endnu — den venstre del skal blive præcis 10 sammen med det første tal.",no:"Ikke helt ennå – den venstre delen skal bli akkurat 10 sammen med det første tallet.",fi:"Ei vielä — vasemman osan pitää täyttää tasan kymppi ensimmäisen luvun kanssa."},
    srMakeTenPart: {en:"the make-a-ten part — tap to add counters",de:"der Zehner-Teil — tippe, um Plättchen hinzuzufügen",es:"la parte para hacer la decena: toca para añadir fichas",pt:"a parte para fazer a dezena — toque para adicionar fichas",fr:"la partie pour faire dix — touche pour ajouter des jetons",it:"la parte per fare dieci — tocca per aggiungere le pedine",nl:"het deel om aan te vullen tot tien — tik om stippen toe te voegen",sv:"tia-delen – tryck för att lägga till markörer",da:"tier-delen - tryk for at tilføje brikker",no:"lag-en-tier-delen – trykk for å legge til brikker",fi:"kympin täyttävä osa — napauta lisätäksesi laskunappuloita"},

    /* ── whole-unknown mode (1.OA.A.1) strings — EN authored; 10 non-EN folded
       in by the per-locale native ensemble. promptWhole is argless (the bond
       shows the two parts; the child types the total on the keypad). ── */
    titleWhole: {en:"Find the Total",de:"Finde das Ganze",es:"Encuentra el total",pt:"Encontre o Total",fr:"Trouve le total",it:"Trova il totale",nl:"Vind het totaal",sv:"Hitta det hela",da:"Find det hele",no:"Finn summen",fi:"Etsi kokonaisuus"},
    instructionWhole: {en:"Both parts are filled. Count how many there are in all, then type the total and tap Check.",de:"Beide Teile sind gefüllt. Zähle, wie viele es zusammen sind, tippe dann das Ganze ein und tippe auf Prüfen.",es:"Las dos partes están completas. Cuenta cuántos hay en total, escribe el total y pulsa Comprobar.",pt:"As duas partes estão preenchidas. Conte quantos há ao todo, depois digite o total e toque em Verificar.",fr:"Les deux parties sont remplies. Compte combien il y en a en tout, puis écris le total et appuie sur Vérifier.",it:"Le due parti sono già riempite. Conta quanti sono in tutto, poi scrivi il totale e tocca Controlla.",nl:"Beide delen zijn ingevuld. Tel hoeveel het er in totaal zijn, typ dan het totaal en tik op Controleer.",sv:"Båda delarna är ifyllda. Räkna hur många det är tillsammans, skriv sedan summan och tryck på Kontrollera.",da:"Begge dele er fyldt ud. Tæl hvor mange der er i alt, skriv så det hele, og tryk på Tjek.",no:"Begge delene er fylt ut. Tell hvor mange det er til sammen, skriv summen og trykk på Sjekk.",fi:"Molemmat osat on täytetty. Laske, kuinka monta niitä on yhteensä, kirjoita summa ja napauta Tarkista."},
    promptWhole: {en:"How many in all? Type the total.",de:"Wie viele sind es zusammen? Tippe das Ganze ein.",es:"¿Cuántos hay en total? Escribe el total.",pt:"Quantos há ao todo? Digite o total.",fr:"Combien en tout ? Écris le total.",it:"Quanti sono in tutto? Scrivi il totale.",nl:"Hoeveel in totaal? Typ het totaal.",sv:"Hur många är det tillsammans? Skriv summan.",da:"Hvor mange er der i alt? Skriv det hele.",no:"Hvor mange til sammen? Skriv summen.",fi:"Kuinka monta yhteensä? Kirjoita summa."}
  },

  defaults: {},

  /* ---- design-system constants (Direction A teal) ---- */
  _C: { T: '#146B5E', BODY: '#E2F0EC', WHOLE: '#FBF3E4', DOT: '#F2784B', GIVEN: '#146B5E', LINE: '#146B5E' },

  /* ---- state + setup ---- */
  init: function (api) {
    this.api = api;
    this.mode = 'make-ten';  // 'make-ten' (K.OA.A.4) | 'make-ten-to-add' (1.OA.C.6)
    this.whole = 10;
    this.given = 7;          // the filled part this round (1-9)
    this.first = 8;          // make-ten-to-add: the first addend A
    this.second = 5;         // make-ten-to-add: the second addend B (= whole)
    this.filled = 0;         // counters the child has put in the empty/make-ten part
    this.readOnly = false;
    this._fillEl = null; this._minusEl = null;
  },

  /* opts = { whole, given, seed }  (make-ten, K.OA.A.4; whole defaults 10, given 1-9)
     OR  { mode:'make-ten-to-add', first, second, seed }  (1.OA.C.6: decompose the
     second addend B so one part makes a ten with the first addend A). */
  setupTask: function (opts) {
    opts = opts || {};
    if (opts.mode === 'make-ten-to-add') {
      this.mode = 'make-ten-to-add';
      this.first = opts.first;
      this.second = opts.second;
      this.whole = opts.second;   // the bond decomposes B
      this.given = null;
      this.filled = 0;
      this.readOnly = false;
      return;
    }
    if (opts.mode === 'whole-unknown') {
      /* 1.OA.A.1 putting-together: both parts given, find the total (whole).
         Display-only bond + the shell keypad is the answer surface. */
      this.mode = 'whole-unknown';
      this.first = opts.first;
      this.second = opts.second;
      this.whole = opts.first + opts.second;   // the answer key
      this.given = null;
      this.filled = 0;
      this.readOnly = false;
      return;
    }
    this.mode = 'make-ten';
    this.whole = opts.whole || 10;
    this.given = (typeof opts.given === 'number') ? opts.given : 7;
    this.filled = 0;
    this.readOnly = false;
  },

  /* the total (whole-unknown answer key) = both parts composed */
  total: function () { return this.first + this.second; },

  /* the single correct missing part + the discrete answer key (mode-aware) */
  missing: function () { return this.mode === 'make-ten-to-add' ? (10 - this.first) : (this.whole - this.given); },
  isCorrect: function () {
    return this.mode === 'make-ten-to-add'
      ? (this.filled === 10 - this.first)         // the make-ten part completes the ten with A
      : (this.given + this.filled === this.whole);
  },

  /* ---- render(): the part-part-whole bond + a "−" control ---- */
  render: function () {
    this.injectCSS();
    if (this.mode === 'make-ten-to-add') { this._renderAddMode(); return; }
    if (this.mode === 'whole-unknown') { this._renderWholeUnknown(); return; }
    var api = this.api, self = this, C = this._C;
    var stage = api.stage;
    stage.innerHTML = '';

    var wrap = api.el('div', 'nb-wrap');

    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 100 78');
    svg.setAttribute('class', 'nb-svg');
    svg.setAttribute('role', 'group');
    svg.setAttribute('aria-label', api.t('instruction'));
    function elNS(tag, attrs) { var e = document.createElementNS(ns, tag); for (var k in attrs) { if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]); } return e; }

    /* connecting lines (whole bottom → each part top) UNDER the circles */
    svg.appendChild(elNS('line', { x1: 50, y1: 26, x2: 28, y2: 48, stroke: C.LINE, 'stroke-width': 2.5, 'stroke-linecap': 'round', opacity: 0.7 }));
    svg.appendChild(elNS('line', { x1: 50, y1: 26, x2: 72, y2: 48, stroke: C.LINE, 'stroke-width': 2.5, 'stroke-linecap': 'round', opacity: 0.7 }));

    /* WHOLE (top) */
    svg.appendChild(elNS('circle', { cx: 50, cy: 15, r: 13, fill: C.WHOLE, stroke: C.T, 'stroke-width': 2.5 }));
    var wt = elNS('text', { x: 50, y: 15, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: C.T, 'font-size': 13, 'font-weight': 800, 'font-family': 'var(--lcs-font-display,"Baloo 2",system-ui,sans-serif)' });
    wt.textContent = String(this.whole);
    svg.appendChild(wt);

    /* the two parts: left = given (filled), right = empty (tappable) */
    this._partGroup(svg, elNS, 'given', 28, 61, this.given, false);
    this._fillEl = this._partGroup(svg, elNS, 'fill', 72, 61, this.filled, true);
    this._fillEl.setAttribute('role', 'button');
    this._fillEl.setAttribute('tabindex', '0');
    this._fillEl.setAttribute('aria-label', api.t('srPartFill'));

    wrap.appendChild(svg);

    /* "−" remove control (the part-tap adds; this removes one) */
    var minus = api.el('button', 'nb-minus');
    minus.type = 'button';
    minus.textContent = '−';
    minus.setAttribute('aria-label', api.t('remove'));
    minus.addEventListener('click', function () { if (self.readOnly) return; if (self.filled > 0) { self.filled--; self._beep(420); self.paint(); } });
    this._minusEl = minus;
    wrap.appendChild(minus);

    /* tap the empty part → +1 (cap at whole) */
    this._fillEl.addEventListener('pointerdown', function (e) {
      if (self.readOnly) return;
      if (e.button != null && e.button !== 0 && e.pointerType === 'mouse') return;
      e.preventDefault();
      if (self.filled < self.whole) { self.filled++; self._beep(720); self.paint(); }
    });
    this._fillEl.addEventListener('keydown', function (e) {
      if (self.readOnly) return;
      if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
      e.preventDefault();
      if (self.filled < self.whole) { self.filled++; self._beep(720); self.paint(); }
    });

    stage.appendChild(wrap);
    this.paint();
  },

  _beep: function (f) { if (this.api && this.api.sound) this.api.sound(f); if (this.api && this.api.track) this.api.track('bond', { filled: this.filled }); },

  /* build one part: a circle + `count` counter-dots + a numeral caption.
     Returns the group element. `tappable` parts get the fill styling. */
  _partGroup: function (svg, elNS, kind, cx, cy, count, tappable) {
    var ns = 'http://www.w3.org/2000/svg', C = this._C;
    var g = document.createElementNS(ns, 'g');
    g.setAttribute('class', 'nb-part nb-part-' + kind);
    g.appendChild(elNS('circle', { cx: cx, cy: cy, r: 15, fill: tappable ? C.BODY : '#D2E8E1', stroke: C.T, 'stroke-width': 2.5, 'class': 'nb-part-disc' }));
    /* counter dots, packed in up to 2 rows of 5 within the circle */
    var n = count, perRow = 5, dotR = 1.7, gap = 4.0;
    for (var i = 0; i < n; i++) {
      var row = Math.floor(i / perRow), col = i % perRow;
      var rowCount = Math.min(perRow, n - row * perRow);
      var dx = (col - (rowCount - 1) / 2) * gap;
      var dy = (row - (Math.ceil(n / perRow) - 1) / 2) * gap;
      g.appendChild(elNS('circle', { cx: (cx + dx).toFixed(2), cy: (cy + dy - 3).toFixed(2), r: dotR, fill: C.DOT }));
    }
    /* numeral caption below the circle */
    var t = elNS('text', { x: cx, y: cy + 11, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: C.T, 'font-size': 7, 'font-weight': 800, 'font-family': 'var(--lcs-font-display,"Baloo 2",system-ui,sans-serif)', 'class': 'nb-part-num' });
    t.textContent = String(count);
    g.appendChild(t);
    svg.appendChild(g);
    return g;
  },

  /* ---- paint(): re-render the fill part's dots + numeral + readout ---- */
  paint: function () {
    if (this.mode === 'make-ten-to-add') { this._paintAddMode(); return; }
    if (!this._fillEl) return;
    var ns = 'http://www.w3.org/2000/svg', C = this._C, self = this;
    /* rebuild the fill part group's dots + numeral (cheap; ≤10 dots) */
    var g = this._fillEl;
    // remove old dots + numeral, keep the disc (first child)
    while (g.childNodes.length > 1) g.removeChild(g.lastChild);
    var cx = 72, cy = 61, perRow = 5, dotR = 1.7, gap = 4.0, n = this.filled;
    function elNS(tag, attrs) { var e = document.createElementNS(ns, tag); for (var k in attrs) { if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]); } return e; }
    for (var i = 0; i < n; i++) {
      var row = Math.floor(i / perRow), col = i % perRow;
      var rowCount = Math.min(perRow, n - row * perRow);
      var dx = (col - (rowCount - 1) / 2) * gap;
      var dy = (row - (Math.ceil(n / perRow) - 1) / 2) * gap;
      g.appendChild(elNS('circle', { cx: (cx + dx).toFixed(2), cy: (cy + dy - 3).toFixed(2), r: dotR, fill: C.DOT }));
    }
    var t = elNS('text', { x: cx, y: cy + 11, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: C.T, 'font-size': 7, 'font-weight': 800, 'font-family': 'var(--lcs-font-display,"Baloo 2",system-ui,sans-serif)', 'class': 'nb-part-num' });
    t.textContent = String(this.filled);
    g.appendChild(t);
    if (this.readOnly) { g.classList.add('nb-locked'); if (this._minusEl) this._minusEl.disabled = true; }
    else { g.classList.remove('nb-locked'); if (this._minusEl) this._minusEl.disabled = false; }
    if (this.api && this.api.announce) this.api.announce(this.given + ' + ' + this.filled + ' / ' + this.whole);
  },

  /* ── make-ten-to-add (1.OA.C.6) render + paint. Isolated from the default
     make-ten path; only numerals/symbols appear in-stage (language-neutral —
     localized strings are title/instruction/prompt/hint/sr only). ── */
  _elNS: function (tag, attrs) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs) { if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]); }
    return e;
  },
  /* clear+redraw a part group's counter-dots + numeral caption (keeps the disc,
     the group's first child). Shared by both parts of the add-mode bond. */
  _fillPart: function (g, cx, cy, n) {
    var C = this._C, perRow = 5, dotR = 1.7, gap = 4.0;
    while (g.childNodes.length > 1) g.removeChild(g.lastChild);
    for (var i = 0; i < n; i++) {
      var row = Math.floor(i / perRow), col = i % perRow;
      var rowCount = Math.min(perRow, n - row * perRow);
      var dx = (col - (rowCount - 1) / 2) * gap;
      var dy = (row - (Math.ceil(n / perRow) - 1) / 2) * gap;
      g.appendChild(this._elNS('circle', { cx: (cx + dx).toFixed(2), cy: (cy + dy - 3).toFixed(2), r: dotR, fill: C.DOT }));
    }
    var t = this._elNS('text', { x: cx, y: cy + 11, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: C.T, 'font-size': 7, 'font-weight': 800, 'font-family': 'var(--lcs-font-display,"Baloo 2",system-ui,sans-serif)', 'class': 'nb-part-num' });
    t.textContent = String(n);
    g.appendChild(t);
  },
  _renderAddMode: function () {
    var api = this.api, self = this, C = this._C, elNS = this._elNS.bind(this);
    var stage = api.stage; stage.innerHTML = '';
    var A = this.first, B = this.second;
    var wrap = api.el('div', 'nb-wrap nb-add');

    /* equation strip: A + B = ?  (numerals/symbols — universal) */
    var eq = api.el('div', 'nb-eq');
    var eqA = api.el('span', 'nb-eq-n'); eqA.textContent = String(A);
    var op1 = api.el('span', 'nb-eq-op'); op1.textContent = '+';
    var eqB = api.el('span', 'nb-eq-n nb-eq-b'); eqB.textContent = String(B);
    var op2 = api.el('span', 'nb-eq-op'); op2.textContent = '=';
    var eqT = api.el('span', 'nb-eq-tot'); eqT.textContent = '?';
    eq.append(eqA, op1, eqB, op2, eqT);
    this._eqTotEl = eqT;
    wrap.appendChild(eq);

    /* bond on B: whole=B (top), left part = make-ten (tappable), right = rest (auto) */
    var svg = elNS('svg', { viewBox: '0 0 100 78', 'class': 'nb-svg', role: 'group' });
    svg.setAttribute('aria-label', api.t('instructionAdd'));
    svg.appendChild(elNS('line', { x1: 50, y1: 26, x2: 28, y2: 48, stroke: C.LINE, 'stroke-width': 2.5, 'stroke-linecap': 'round', opacity: 0.7 }));
    svg.appendChild(elNS('line', { x1: 50, y1: 26, x2: 72, y2: 48, stroke: C.LINE, 'stroke-width': 2.5, 'stroke-linecap': 'round', opacity: 0.7 }));
    svg.appendChild(elNS('circle', { cx: 50, cy: 15, r: 13, fill: C.WHOLE, stroke: C.T, 'stroke-width': 2.5 }));
    var wt = elNS('text', { x: 50, y: 15, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: C.T, 'font-size': 13, 'font-weight': 800, 'font-family': 'var(--lcs-font-display,"Baloo 2",system-ui,sans-serif)' });
    wt.textContent = String(B);
    svg.appendChild(wt);
    this._addLeft = this._partGroup(svg, elNS, 'fill', 28, 61, this.filled, true);
    this._addLeft.setAttribute('role', 'button');
    this._addLeft.setAttribute('tabindex', '0');
    this._addLeft.setAttribute('aria-label', api.t('srMakeTenPart'));
    this._addRight = this._partGroup(svg, elNS, 'given', 72, 61, B - this.filled, false);
    this._fillEl = this._addLeft;
    wrap.appendChild(svg);

    /* reasoning line (numerals/symbols) — updated in _paintAddMode */
    var steps = api.el('div', 'nb-steps'); this._stepsEl = steps; wrap.appendChild(steps);

    /* "−" remove control */
    var minus = api.el('button', 'nb-minus'); minus.type = 'button'; minus.textContent = '−';
    minus.setAttribute('aria-label', api.t('remove'));
    minus.addEventListener('click', function () { if (self.readOnly) return; if (self.filled > 0) { self.filled--; self._beep(420); self.paint(); } });
    this._minusEl = minus; wrap.appendChild(minus);

    /* tap the make-ten part → +1 (cap at B = whole) */
    function bump() { if (self.readOnly) return; if (self.filled < self.whole) { self.filled++; self._beep(720); self.paint(); } }
    this._addLeft.addEventListener('pointerdown', function (e) {
      if (e.button != null && e.button !== 0 && e.pointerType === 'mouse') return;
      e.preventDefault(); bump();
    });
    this._addLeft.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
      e.preventDefault(); bump();
    });

    stage.appendChild(wrap);
    this.paint();
  },
  _paintAddMode: function () {
    if (!this._addLeft) return;
    var A = this.first, B = this.second, f = this.filled, rest = B - f;
    this._fillPart(this._addLeft, 28, 61, f);
    this._fillPart(this._addRight, 72, 61, rest < 0 ? 0 : rest);
    var made = (f === 10 - A);
    if (this._stepsEl) {
      this._stepsEl.textContent = made
        ? (A + ' + ' + f + ' = 10   •   10 + ' + rest + ' = ' + (10 + rest))
        : (A + ' + ' + f + ' = ' + (A + f));
    }
    if (this._eqTotEl) this._eqTotEl.textContent = (this.readOnly && this.isCorrect()) ? String(A + B) : '?';
    if (this.readOnly) { this._addLeft.classList.add('nb-locked'); if (this._minusEl) this._minusEl.disabled = true; }
    else { this._addLeft.classList.remove('nb-locked'); if (this._minusEl) this._minusEl.disabled = false; }
    if (this.api && this.api.announce) this.api.announce(A + ' + ' + f + ' / ' + 'make 10');
  },

  /* ── whole-unknown (1.OA.A.1): both parts given, WHOLE shows "?" — the child
     reads the parts and types the total on the shell keypad (answerType
     'number'; the bond is display-only, no tap handlers). ── */
  _renderWholeUnknown: function () {
    var api = this.api, C = this._C, elNS = this._elNS.bind(this);
    var stage = api.stage; stage.innerHTML = '';
    var A = this.first, B = this.second;
    var wrap = api.el('div', 'nb-wrap nb-whole');

    var svg = elNS('svg', { viewBox: '0 0 100 78', 'class': 'nb-svg', role: 'group' });
    svg.setAttribute('aria-label', api.t('instructionWhole'));
    svg.appendChild(elNS('line', { x1: 50, y1: 26, x2: 28, y2: 48, stroke: C.LINE, 'stroke-width': 2.5, 'stroke-linecap': 'round', opacity: 0.7 }));
    svg.appendChild(elNS('line', { x1: 50, y1: 26, x2: 72, y2: 48, stroke: C.LINE, 'stroke-width': 2.5, 'stroke-linecap': 'round', opacity: 0.7 }));
    /* WHOLE (top) — unknown, shows "?" */
    svg.appendChild(elNS('circle', { cx: 50, cy: 15, r: 13, fill: C.WHOLE, stroke: C.T, 'stroke-width': 2.5 }));
    var qt = elNS('text', { x: 50, y: 15, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: C.DOT, 'font-size': 14, 'font-weight': 800, 'font-family': 'var(--lcs-font-display,"Baloo 2",system-ui,sans-serif)' });
    qt.textContent = '?';
    svg.appendChild(qt);
    qt.setAttribute('aria-label', api.t('srWhole'));
    /* the two given parts (filled, static) */
    this._partGroup(svg, elNS, 'given', 28, 61, A, false);
    this._partGroup(svg, elNS, 'given', 72, 61, B, false);

    wrap.appendChild(svg);
    stage.appendChild(wrap);
    this._fillEl = null;   // no tappable part; the keypad is the answer surface
  },

  reset: function () { this.filled = 0; this.readOnly = false; this.paint(); },

  /* ---- stage CSS — idempotent. Bond max-width:min(82vw,340px); the
     tappable part disc is a large tap zone (touch-action:manipulation). ---- */
  _cssInjected: false,
  injectCSS: function () {
    if (this._cssInjected) return;
    this._cssInjected = true;
    var C = this._C;
    var css = ''
      + '.nb-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;}'
      + '.nb-svg{width:min(82vw,340px)!important;height:auto!important;display:block;touch-action:manipulation;overflow:visible;}'
      + '.nb-part-fill{cursor:pointer;}'
      + '.nb-part-fill .nb-part-disc{transition:fill .12s var(--lcs-ease),stroke-width .12s var(--lcs-ease);}'
      + '.nb-part-fill:focus-visible{outline:none;}'
      + '.nb-part-fill:focus-visible .nb-part-disc{stroke-width:4;}'
      + '.nb-part-fill.nb-locked{cursor:default;}'
      /* "−" remove button (≥44px tap target) */
      + '.nb-minus{width:48px;height:44px;border-radius:14px;border:2px solid ' + C.T + ';'
      +   'background:#fff;color:' + C.T + ';font:800 26px/1 var(--lcs-font-display,"Baloo 2",system-ui,sans-serif);'
      +   'cursor:pointer;touch-action:manipulation;box-shadow:0 1px 3px rgba(20,107,94,.18);}'
      + '.nb-minus:active{transform:scale(.92);}'
      + '.nb-minus:disabled{opacity:.4;cursor:default;}'
      /* make-ten-to-add: equation strip + reasoning line (numerals/symbols) */
      + '.nb-eq{display:flex;align-items:center;justify-content:center;gap:8px;'
      +   'font:800 30px/1 var(--lcs-font-display,"Baloo 2",system-ui,sans-serif);color:' + C.T + ';}'
      + '.nb-eq-op{color:' + C.T + ';opacity:.7;}'
      + '.nb-eq-tot{min-width:1.2em;text-align:center;color:' + C.DOT + ';}'
      + '.nb-steps{font:700 16px/1.3 var(--lcs-font-display,"Baloo 2",system-ui,sans-serif);color:' + C.T + ';opacity:.85;text-align:center;min-height:1.3em;}';
    var tag = document.createElement('style');
    tag.setAttribute('data-number-bond-core', '');
    tag.textContent = css;
    document.head.appendChild(tag);
  }
};
