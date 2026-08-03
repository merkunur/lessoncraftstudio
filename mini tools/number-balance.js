/* =====================================================================
   TOOL #31 — NUMBER BALANCE   (number-balance.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v3 catalog, build #2.

   A beam on a fulcrum with a pan hanging at each end. Drag number tiles
   into either pan. A pan is worth the SUM of its tiles. The beam's angle
   is a continuous function of the difference, and level happens only when
   the two sides are worth the same.

   THE ONE THESIS — EQUALITY IS A STATE OF THE WORLD YOU CAN SEE, NOT AN
   INSTRUCTION TO COMPUTE. Children read `=` as "and here comes the
   answer". So 8 = 3 + 5 looks backwards to them, and asked to complete
   3 + 5 = _ + 2 a large majority of K-2 children write 8. It is the most
   documented arithmetic misconception in the world and it is invisible on
   a worksheet. Here the equals sign gets its meaning from a beam that is
   level, not from a box waiting to be filled.

   ⚠ WHAT THE CLASS TALKS ABOUT (the gate-5 test — a tool that cannot
   answer this in one sentence is not finished): they argue about WHICH
   WAY IT WILL TIP before it is let go, and then about WHAT TO CHANGE to
   make it level.

   THREE INVENTIONS:
     1. THE TIP IS ANALOG, AND IT IS THE ONLY FEEDBACK. A near-miss leans
        a little; a wild miss slams down. That is an error signal a
        six-year-old can read and act on with no verdict in it — strictly
        MORE information than right/wrong and strictly less judgemental.
        Gate-asserted: |angle| is strictly monotone in |difference|.
     2. HOLD. Freeze the beam while tiles are placed, so the class
        PREDICTS which way it will go, then let go and it settles. This is
        Number Talk Easel's curtain applied to equality, and it is the
        best teaching move in the tool. Default is live; Hold is the
        teacher's dramatic device, never automatic.
     3. NOTATION FOLLOWS THE BEAM, NEVER PRECEDES IT. With notation on the
        tool writes what the beam is DOING: level -> "=", tipped -> ">" or
        "<" pointing at the heavier side. A description of a physical
        state, not a mark on a child's work — and exactly how > and <
        should first be met. OFF by default (meaning before notation, the
        Fraction Kitchen rule). The pan TOTALS are off by default for the
        same reason: if the totals are showing, the child computes and the
        beam has nothing left to tell them.

   Plus the classic lever: a CLOTH over a pan — "what must be under here
   for it to balance?" The lean is a legitimate clue the child reads, not
   a leak, because the question is find-the-value, not guess-the-verdict.

   FENCES — the equals-sign space here is crowded and this must not drift:
     judge-balance-core.js   Numbers Court, 1.OA.D.7. The tool AUTHORS the
     (1 activity)            equation and holds the beam LEVEL so the tip
                             cannot leak its verdict; the child judges
                             true/false; rounds are generated; isTrue and
                             repairLevels are grading. THIS TOOL INVERTS
                             IT: the child authors both sides and the beam
                             tips ALWAYS, because there is no hidden
                             verdict to leak.
     compare-balance-core.js Friendship Bridge, K.CC.C.6. Its beam is
     (1 activity)            LOCKED FLAT BY DESIGN because tipping would
                             hand over the 1-to-1 matching cognition. Here
                             the quantities are WRITTEN ON THE TILES, so
                             nothing is hidden and the tip gives nothing
                             away.
     measurement-bench.js    weighs an OBJECT against CUBES — measurement.
     (tool #17)              This weighs a NUMBER EXPRESSION against
                             another — equivalence. Its beam physics is
                             copied as a PATTERN (balanceAngle/_panAnchor/
                             damped settle); it is a standalone tool, not
                             a core, and ZERO lines are imported.
     part-whole-frame        CONSERVATION: {whole, a}, part B
     (tool #27)              unrepresentable as changing, never tips. This
                             is EQUIVALENCE: two independently authored
                             expressions, no shared total, and that they
                             CAN differ is the whole content.
     fix-it-corner / sharing-jar / match-pairs (1.OA.D.7, 1.OA.D.8)
                             five graded child activities that pose a
                             problem and want an answer. Nothing is posed
                             here, nothing is answered, nothing is marked.

   REFUSES, FOREVER: no tick, no cross, no "correct!", no score, no count
   of balances found, no timer · THE BEAM NEVER SNAPS LEVEL AS A REWARD —
   it settles by physics · no "not equal" sign and no red, because a
   tipped beam is a TRUE statement about the world, not a mistake ·
   nothing is graded, because a beam has no opinion · any future "check
   the equation" request is to be refused.
   ===================================================================== */
var NumberBalance = {
  id: 'number-balance',

  /* ⚠ CURATION: en authored here; the other ten are added by the locale
     pass and corrected by the per-locale native 3-agent ensembles
     (§A.13.48); [NSR-FLAG] sv/da/no/fi; pt Brazilian per §6.
     ⚠ THE MOAT IS `equalsFrame` — the spoken equals-sign language carries
     the misconception per locale: German "ist gleich" against the
     read-aloud trap "gibt", nl "is evenveel als", sv "är lika med". The
     ensembles author that line; it is never translated from English. */
  strings: {
    title:        { en: 'Number Balance', de: 'Zahlenwaage', fr: 'Balance des nombres', it: 'Bilancia dei numeri', es: 'Balanza numérica', pt: 'Balança numérica', nl: 'Getallenbalans', sv: 'Talvåg', da: 'Talvægt', no: 'Tallvekt', fi: 'Lukuvaaka' },
    instruction:  { en: 'Put numbers in the pans. The beam is level only when both sides are worth the same.', de: 'Legt Zahlen in die Schalen. Der Balken ist nur waagerecht, wenn beide Seiten gleich viel wert sind.', fr: 'Mettez des nombres dans les plateaux. Le fléau n’est horizontal que si les deux côtés valent la même chose.', it: 'Mettete i numeri nei piatti. L’asta è dritta solo quando i due lati valgono la stessa cosa.', es: 'Poned números en los platillos. El brazo solo queda recto cuando los dos lados valen lo mismo.', pt: 'Coloquem números nos pratos. O braço só fica reto quando os dois lados valem a mesma coisa.', nl: 'Leg getallen in de schalen. De balk is alleen recht als beide kanten evenveel waard zijn.', sv: 'Lägg tal i skålarna. Balken är rak bara när båda sidorna är värda lika mycket.', da: 'Læg tal i skålene. Bjælken er kun lige, når begge sider er lige meget værd.', no: 'Legg tall i skålene. Bjelken er bare rett når begge sidene er verdt like mye.', fi: 'Laittakaa lukuja vaakakuppeihin. Vipu on suorassa vain silloin, kun molemmat puolet ovat yhtä arvokkaat.' },
    trayLabel:    { en: 'Numbers', de: 'Zahlen', fr: 'Nombres', it: 'Numeri', es: 'Números', pt: 'Números', nl: 'Getallen', sv: 'Tal', da: 'Tal', no: 'Tall', fi: 'Luvut' },
    panLeft:      { en: 'Left pan', de: 'Linke Schale', fr: 'Plateau de gauche', it: 'Piatto di sinistra', es: 'Platillo izquierdo', pt: 'Prato da esquerda', nl: 'Linkerschaal', sv: 'Vänster skål', da: 'Venstre skål', no: 'Venstre skål', fi: 'Vasen kuppi' },
    panRight:     { en: 'Right pan', de: 'Rechte Schale', fr: 'Plateau de droite', it: 'Piatto di destra', es: 'Platillo derecho', pt: 'Prato da direita', nl: 'Rechterschaal', sv: 'Höger skål', da: 'Højre skål', no: 'Høyre skål', fi: 'Oikea kuppi' },
    hold:         { en: 'Hold the beam', de: 'Balken festhalten', fr: 'Bloquer le fléau', it: 'Tieni ferma l’asta', es: 'Sujetar el brazo', pt: 'Segurar o braço', nl: 'Balk vasthouden', sv: 'Håll balken', da: 'Hold bjælken', no: 'Hold bjelken', fi: 'Pidä vipua paikallaan' },
    letGo:        { en: 'Let go', de: 'Loslassen', fr: 'Lâcher', it: 'Lascia andare', es: 'Soltar', pt: 'Soltar', nl: 'Loslaten', sv: 'Släpp', da: 'Slip', no: 'Slipp', fi: 'Päästä irti' },
    heldNote:     { en: 'The beam is held. Which way will it go?', de: 'Der Balken wird festgehalten. Wohin wird er kippen?', fr: 'Le fléau est bloqué. De quel côté va-t-il pencher ?', it: 'L’asta è ferma. Da che parte penderà?', es: 'El brazo está sujeto. ¿Hacia dónde se va a inclinar?', pt: 'O braço está preso. Para que lado vai pender?', nl: 'De balk wordt vastgehouden. Welke kant gaat hij op?', sv: 'Balken hålls fast. Åt vilket håll kommer den att luta?', da: 'Bjælken holdes fast. Hvilken vej vipper den?', no: 'Bjelken holdes fast. Hvilken vei kommer den til å vippe?', fi: 'Vipua pidetään paikallaan. Kummalle puolelle se kallistuu?' },
    coverLeft:    { en: 'Cover the left pan', de: 'Linke Schale zudecken', fr: 'Couvrir le plateau de gauche', it: 'Copri il piatto di sinistra', es: 'Tapar el platillo izquierdo', pt: 'Tapar o prato da esquerda', nl: 'Linkerschaal afdekken', sv: 'Täck vänster skål', da: 'Dæk venstre skål', no: 'Dekk til venstre skål', fi: 'Peitä vasen kuppi' },
    coverRight:   { en: 'Cover the right pan', de: 'Rechte Schale zudecken', fr: 'Couvrir le plateau de droite', it: 'Copri il piatto di destra', es: 'Tapar el platillo derecho', pt: 'Tapar o prato da direita', nl: 'Rechterschaal afdekken', sv: 'Täck höger skål', da: 'Dæk højre skål', no: 'Dekk til høyre skål', fi: 'Peitä oikea kuppi' },
    uncover:      { en: 'Take the cloth off', de: 'Tuch wegnehmen', fr: 'Enlever le tissu', it: 'Togli il telo', es: 'Quitar la tela', pt: 'Tirar o pano', nl: 'Doek weghalen', sv: 'Ta bort tyget', da: 'Tag klædet af', no: 'Ta bort kledet', fi: 'Ota liina pois' },
    coveredNote:  { en: 'What must be under the cloth to make it level?', de: 'Was muss unter dem Tuch liegen, damit es waagerecht wird?', fr: 'Que faut-il sous le tissu pour que ce soit horizontal ?', it: 'Che cosa deve esserci sotto il telo perché sia dritta?', es: '¿Qué tiene que haber debajo de la tela para que quede recto?', pt: 'O que tem de estar debaixo do pano para ficar reto?', nl: 'Wat moet er onder de doek liggen om het recht te krijgen?', sv: 'Vad måste ligga under tyget för att den ska bli rak?', da: 'Hvad skal der ligge under klædet, for at den bliver lige?', no: 'Hva må ligge under kledet for at den skal bli rett?', fi: 'Mitä liinan alla pitää olla, jotta vipu on suorassa?' },
    showTotals:   { en: 'Show what each pan is worth', de: 'Zeigen, wie viel jede Schale wert ist', fr: 'Montrer ce que vaut chaque plateau', it: 'Mostra quanto vale ogni piatto', es: 'Mostrar cuánto vale cada platillo', pt: 'Mostrar quanto vale cada prato', nl: 'Laten zien hoeveel elke schaal waard is', sv: 'Visa vad varje skål är värd', da: 'Vis, hvad hver skål er værd', no: 'Vis hva hver skål er verdt', fi: 'Näytä, paljonko kumpikin kuppi on arvoltaan' },
    showNotation: { en: 'Write what the beam is doing', de: 'Aufschreiben, was der Balken macht', fr: 'Écrire ce que fait le fléau', it: 'Scrivi che cosa fa l’asta', es: 'Escribir lo que hace el brazo', pt: 'Escrever o que o braço faz', nl: 'Opschrijven wat de balk doet', sv: 'Skriv vad balken gör', da: 'Skriv, hvad bjælken gør', no: 'Skriv hva bjelken gjør', fi: 'Kirjoita, mitä vipu tekee' },
    clearPans:    { en: 'Empty the pans', de: 'Schalen leeren', fr: 'Vider les plateaux', it: 'Svuota i piatti', es: 'Vaciar los platillos', pt: 'Esvaziar os pratos', nl: 'Schalen leegmaken', sv: 'Töm skålarna', da: 'Tøm skålene', no: 'Tøm skålene', fi: 'Tyhjennä kupit' },
    sayIt:        { en: 'Say it out loud', de: 'Laut vorlesen', fr: 'Le dire à voix haute', it: 'Dillo ad alta voce', es: 'Decirlo en voz alta', pt: 'Dizer em voz alta', nl: 'Hardop zeggen', sv: 'Säg det högt', da: 'Sig det højt', no: 'Si det høyt', fi: 'Sano se ääneen' },
    andWord:      { en: 'and', de: 'und', fr: 'et', it: 'e', es: 'y', pt: 'e', nl: 'en', sv: 'och', da: 'og', no: 'og', fi: 'ja' },
    equalsFrame:  { en: '{left} is equal to {right}', de: '{left} ist gleich {right}', fr: '{left} est égal à {right}', it: '{left} è uguale a {right}', es: '{left} es igual a {right}', pt: '{left} é igual a {right}', nl: '{left} is evenveel als {right}', sv: '{left} är lika med {right}', da: '{left} er lig med {right}', no: '{left} er lik {right}', fi: '{left} on yhtä paljon kuin {right}' },
    heavierFrame: { en: '{heavy} is more than {light}', de: '{heavy} ist mehr als {light}', fr: '{heavy} est plus que {light}', it: '{heavy} è più di {light}', es: '{heavy} es más que {light}', pt: '{heavy} é mais do que {light}', nl: '{heavy} is meer dan {light}', sv: '{heavy} är mer än {light}', da: '{heavy} er mere end {light}', no: '{heavy} er mer enn {light}', fi: '{heavy} on enemmän kuin {light}' },
    emptyPan:     { en: 'nothing', de: 'nichts', fr: 'rien', it: 'niente', es: 'nada', pt: 'nada', nl: 'niets', sv: 'ingenting', da: 'ingenting', no: 'ingenting', fi: 'ei mitään' },
    gateBig:      { en: 'Numbers past ten are part of the Teacher plan.', de: 'Zahlen über zehn gehören zum Lehrer-Paket.', fr: 'Les nombres au-delà de dix font partie de l’offre Enseignant.', it: 'I numeri oltre il dieci fanno parte del piano Insegnante.', es: 'Los números por encima de diez son parte del plan Docente.', pt: 'Os números acima de dez fazem parte do plano Professor.', nl: 'Getallen boven de tien horen bij het Leerkracht-pakket.', sv: 'Tal över tio ingår i Lärarpaketet.', da: 'Tal over ti er en del af Lærerpakken.', no: 'Tall over ti er en del av Lærerpakken.', fi: 'Kymmentä suuremmat luvut kuuluvat Opettaja-tilaukseen.' },
    gatePrint:    { en: 'Printing is part of the Teacher plan.', de: 'Das Drucken gehört zum Lehrer-Paket.', fr: 'L’impression fait partie de l’offre Enseignant.', it: 'La stampa fa parte del piano Insegnante.', es: 'La impresión es parte del plan Docente.', pt: 'A impressão faz parte do plano Professor.', nl: 'Afdrukken hoort bij het Leerkracht-pakket.', sv: 'Utskrift ingår i Lärarpaketet.', da: 'Udskrivning er en del af Lærerpakken.', no: 'Utskrift er en del av Lærerpakken.', fi: 'Tulostus kuuluu Opettaja-tilaukseen.' },
    printBtn:     { en: 'Print the balance', de: 'Waage drucken', fr: 'Imprimer la balance', it: 'Stampa la bilancia', es: 'Imprimir la balanza', pt: 'Imprimir a balança', nl: 'Balans afdrukken', sv: 'Skriv ut vågen', da: 'Udskriv vægten', no: 'Skriv ut vekta', fi: 'Tulosta vaaka' },
    unlock:       { en: 'See the Teacher plan', de: 'Lehrer-Paket ansehen', fr: 'Voir l’offre Enseignant', it: 'Vedi il piano Insegnante', es: 'Ver el plan Docente', pt: 'Ver o plano Professor', nl: 'Bekijk het Leerkracht-pakket', sv: 'Se Lärarpaketet', da: 'Se Lærerpakken', no: 'Se Lærerpakken', fi: 'Katso Opettaja-tilaus' },
    privacyLine:  { en: 'Nothing here is saved, counted or sent anywhere.', de: 'Hier wird nichts gespeichert, gezählt oder irgendwohin gesendet.', fr: 'Rien ici n’est enregistré, compté ni envoyé où que ce soit.', it: 'Qui non si salva, non si conta e non si invia nulla.', es: 'Aquí no se guarda, no se cuenta ni se envía nada.', pt: 'Aqui nada é guardado, contado nem enviado para lugar nenhum.', nl: 'Hier wordt niets bewaard, geteld of ergens naartoe gestuurd.', sv: 'Ingenting här sparas, räknas eller skickas någonstans.', da: 'Intet her bliver gemt, talt eller sendt nogen steder hen.', no: 'Ingenting her blir lagret, talt eller sendt noe sted.', fi: 'Täällä ei tallenneta, lasketa eikä lähetetä mitään.' },
    setSpeak:     { en: 'Say the number when a tile is placed', de: 'Die Zahl sagen, wenn ein Plättchen gelegt wird', fr: 'Dire le nombre quand on pose un jeton', it: 'Di’ il numero quando si mette una tessera', es: 'Decir el número al poner una ficha', pt: 'Dizer o número ao pôr uma peça', nl: 'Het getal zeggen als je een fiche neerlegt', sv: 'Säg talet när en bricka läggs i', da: 'Sig tallet, når en brik lægges i', no: 'Si tallet når en brikke legges i', fi: 'Sano luku, kun laatta asetetaan' },
  },

  STORE_KEY: 'lcs:number-balance:v1',
  ENT_TRUST_DAYS: 14,

  defaults: { speak: true, totals: false, notation: false },
  settings: [
    { key: 'speak', type: 'toggle', labelKey: 'setSpeak' },
    { key: 'totals', type: 'toggle', labelKey: 'showTotals' },
    { key: 'notation', type: 'toggle', labelKey: 'showNotation' }
  ],

  premium: false,
  premiumKnown: false,

  /* =================================================================
     GEOMETRY + PHYSICS
     Pattern copied from measurement-bench.js (balanceAngle :777,
     _panAnchor :994, _runBalance :1163, _paintBalance :1191) — a
     STANDALONE tool, not a core, so zero blast radius. Zero lines
     imported; the constants and the sign convention are our own.
     ================================================================= */
  /* ⚠ THE PANS HANG. A first pass positioned each pan AT its anchor and the
     result read as two boxes floating beside a see-saw, with the captions
     colliding with the arm. A pan hangs from a rope, vertically, BELOW the
     beam end — so the anchor moves with the beam, the rope is always
     vertical (gravity does not rotate), and the pan hangs ROPE below it. */
  BAL: { maxAngle: 17, k: 6, arm: 210, cx: 350, cy: 66, hangInset: 26 },
  ROPE: 38,
  VIEW: { w: 700, h: 268 },
  SPRING: { stiff: 0.11, damp: 0.78 },

  /* ⚠ PURE, and the sign convention is load-bearing: POSITIVE angle means
     the RIGHT pan is heavier and therefore LOWER on screen. Derived every
     frame, never stored — there is no "settled" or "correct" flag that a
     reward could snap. */
  tilt: function (left, right) {
    return this.BAL.maxAngle * Math.tanh((right - left) / this.BAL.k);
  },

  panAnchor: function (side, angleDeg) {
    var a = angleDeg * Math.PI / 180;
    var r = this.BAL.arm - this.BAL.hangInset;
    var sgn = side === 'left' ? -1 : 1;
    return { x: this.BAL.cx + sgn * r * Math.cos(a), y: this.BAL.cy + sgn * r * Math.sin(a) };
  },

  /* =================================================================
     THE MODEL — and it is the no-grading proof.
       { left: [n...], right: [n...], held, heldAngle, cloth }
     Everything else is DERIVED. There is no field anywhere that could
     hold a verdict, so "nothing can be marked" is structural.
     ================================================================= */
  newState: function () { return { left: [], right: [], held: false, heldAngle: 0, cloth: null }; },

  sum: function (arr) {
    var t = 0, i;
    if (!arr) return 0;
    for (i = 0; i < arr.length; i++) t += (arr[i] || 0);
    return t;
  },

  /* '=' when the two sides are worth the same, otherwise the symbol
     points at the heavier side. A DESCRIPTION of the beam, never a mark. */
  symbol: function (st) {
    var l = this.sum(st.left), r = this.sum(st.right);
    if (l === r) return '=';
    return l > r ? '>' : '<';
  },

  /* the angle the beam is TRYING to reach; while held it does not move */
  targetAngle: function (st) {
    if (st.held) return st.heldAngle;
    return this.tilt(this.sum(st.left), this.sum(st.right));
  },

  /* immutable, and a pan will not take more than it can show */
  PAN_MAX: 6,
  add: function (st, side, n) {
    var next = { left: st.left.slice(), right: st.right.slice(), held: st.held, heldAngle: st.heldAngle, cloth: st.cloth };
    if (side !== 'left' && side !== 'right') return next;
    if (next[side].length >= this.PAN_MAX) return next;
    next[side] = next[side].concat([n]);
    return next;
  },
  removeAt: function (st, side, i) {
    var next = { left: st.left.slice(), right: st.right.slice(), held: st.held, heldAngle: st.heldAngle, cloth: st.cloth };
    if (side !== 'left' && side !== 'right') return next;
    if (i < 0 || i >= next[side].length) return next;
    next[side] = next[side].slice(0, i).concat(next[side].slice(i + 1));
    return next;
  },
  /* HOLD freezes the beam WHERE IT IS — the class predicts from a still
     beam, so the frozen angle is captured at the moment of holding. */
  hold: function (st) {
    if (st.held) return st;
    var a = this.tilt(this.sum(st.left), this.sum(st.right));
    return { left: st.left.slice(), right: st.right.slice(), held: true, heldAngle: a, cloth: st.cloth };
  },
  release: function (st) {
    if (!st.held) return st;
    return { left: st.left.slice(), right: st.right.slice(), held: false, heldAngle: 0, cloth: st.cloth };
  },

  /* =================================================================
     LIFECYCLE
     ================================================================= */
  init: function (api) {
    this.api = api;
    injectNumberBalanceCSS();
    document.body.classList.add('nbal-wide');

    this._store = this._loadStore();
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];
    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';

    this.st = this.newState();
    this._angle = 0;      /* the rendered angle — chases the target */
    this._vel = 0;
    this._raf = null;

    this._fetchEntitlement();
    this.render();
    this._run();
  },

  reset: function () {
    this.st = this.newState();
    this.render();
  },

  onSettings: function () { this._store.settings = this.api.settings; this._saveStore(); this.render(); },

  _loadStore: function () {
    var s = null;
    try { s = JSON.parse(localStorage.getItem(this.STORE_KEY)); } catch (_) {}
    if (!s || typeof s !== 'object') s = {};
    if (!s.v) s.v = 1;
    return s;
  },
  _saveStore: function () { try { localStorage.setItem(this.STORE_KEY, JSON.stringify(this._store)); } catch (_) {} },

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
      if (self._wrap) self.render();
    };
    /* repaint like the branches around it — see class-graph for the note */
    if (!token) { self.premium = false; self.premiumKnown = true; if (self._wrap) self.render(); return; }
    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) { self.premium = false; self.premiumKnown = true; if (self._wrap) self.render(); return; }
        var tier = j.user && j.user.subscriptionTier, sub = j.subscription;
        self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
        self._saveStore();
        self.premiumKnown = true;
        if (self._wrap) self.render();
      })
      .catch(trustCache);
  },

  /* the damped settle — the beam ARRIVES, it never snaps */
  _run: function () {
    var self = this;
    var step = function () {
      var target = self.targetAngle(self.st);
      var d = target - self._angle;
      self._vel = (self._vel + d * self.SPRING.stiff) * self.SPRING.damp;
      self._angle += self._vel;
      if (Math.abs(d) < 0.02 && Math.abs(self._vel) < 0.02) { self._angle = target; self._vel = 0; }
      self._paint();
      self._raf = window.requestAnimationFrame(step);
    };
    if (this._raf) window.cancelAnimationFrame(this._raf);
    this._raf = window.requestAnimationFrame(step);
  },

  destroy: function () { if (this._raf) window.cancelAnimationFrame(this._raf); },

  /* reads the pans as the locale says them: '4 and 3 is equal to 7', or
     the heavier-side frame when it is tipped. Digits, so no per-locale
     number-word table is needed — TTS speaks a numeral in its own
     language. Never spoken unprompted. */
  panPhrase: function (side) {
    var arr = this.st[side];
    if (!arr.length) return this.api.t('emptyPan');
    return arr.join(' ' + this.api.t('andWord') + ' ');
  },
  frameText: function () {
    var l = this.sum(this.st.left), r = this.sum(this.st.right);
    if (l === r) return this.api.t('equalsFrame')
      .replace('{left}', this.panPhrase('left')).replace('{right}', this.panPhrase('right'));
    var heavy = l > r ? 'left' : 'right', light = l > r ? 'right' : 'left';
    return this.api.t('heavierFrame')
      .replace('{heavy}', this.panPhrase(heavy)).replace('{light}', this.panPhrase(light));
  },
  _sayFrame: function () {
    if (!this.api.settings.speak) return;
    try { LCSAudio.speak({ type: 'ui', text: this.frameText(), lang: this.api.lang, rate: 0.9 }); } catch (_) {}
  },

  _say: function (n) {
    if (!this.api.settings.speak) return;
    try { LCSAudio.speak({ type: 'number', text: String(n), lang: this.api.lang, rate: 0.95 }); } catch (_) {}
  },

  /* =================================================================
     RENDER
     ================================================================= */
  render: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'nbal-wrap');
    this._wrap = wrap;
    wrap.appendChild(this._buildBar());
    wrap.appendChild(this._buildStage());
    var note = this._buildNote();
    if (note) wrap.appendChild(note);
    wrap.appendChild(this._buildTray());
    wrap.appendChild(this._buildFoot());
    api.stage.appendChild(wrap);
    this._wireDrag();
    this._paint();
  },

  _chip: function (label, on, fn, extra) {
    var b = this.api.el('button', 'nbal-chip' + (on ? ' nbal-on' : '') + (extra ? ' ' + extra : ''));
    b.type = 'button';
    b.textContent = label;
    b.addEventListener('click', fn);
    return b;
  },

  _buildBar: function () {
    var api = this.api, self = this;
    var bar = api.el('div', 'nbal-bar');
    bar.appendChild(this._chip(api.t(this.st.held ? 'letGo' : 'hold'), this.st.held, function () {
      self.st = self.st.held ? self.release(self.st) : self.hold(self.st);
      self.render();
    }));
    var cl = this.st.cloth;
    bar.appendChild(this._chip(api.t(cl ? 'uncover' : 'coverLeft'), !!cl, function () {
      self.st.cloth = cl ? null : 'left';
      self.render();
    }));
    if (!cl) {
      bar.appendChild(this._chip(api.t('coverRight'), false, function () { self.st.cloth = 'right'; self.render(); }));
    }
    /* ⚠ THE MOAT, and it is a LEVER not a reward. The spoken equals-sign
       frame is what carries the misconception per locale — German 'ist
       gleich' against the read-aloud trap 'gibt', nl 'is evenveel als',
       sv 'ar lika med'. The teacher decides when the class hears it; the
       tool never announces it on its own, because saying it the moment
       the beam goes level would make level a prize. */
    bar.appendChild(this._chip(api.t('sayIt'), false, function () { self._sayFrame(); }));
    bar.appendChild(this._chip(api.t('clearPans'), false, function () {
      self.st = self.newState();
      self.render();
    }));
    return bar;
  },

  _buildStage: function () {
    var api = this.api, self = this;
    var box = api.el('div', 'nbal-stage');

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'nbal-svg');
    svg.setAttribute('viewBox', '0 0 ' + this.VIEW.w + ' ' + this.VIEW.h);
    svg.setAttribute('aria-hidden', 'true');
    var B = this.BAL;
    var mk = function (tag, attrs) {
      var e = document.createElementNS('http://www.w3.org/2000/svg', tag);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    };
    /* stand */
    svg.appendChild(mk('path', { d: 'M' + (B.cx - 30) + ' ' + (this.VIEW.h - 16) + ' L' + B.cx + ' ' + (B.cy + 6)
      + ' L' + (B.cx + 30) + ' ' + (this.VIEW.h - 16) + ' Z', class: 'nbal-stand' }));
    svg.appendChild(mk('rect', { x: B.cx - 54, y: this.VIEW.h - 20, width: 108, height: 9, rx: 4, class: 'nbal-base' }));
    /* the beam group — rotated every frame, never re-created */
    var g = mk('g', { class: 'nbal-beamg' });
    g.appendChild(mk('rect', { x: B.cx - B.arm, y: B.cy - 5, width: B.arm * 2, height: 10, rx: 5, class: 'nbal-beam' }));
    g.appendChild(mk('circle', { cx: B.cx - B.arm + B.hangInset, cy: B.cy, r: 4.5, class: 'nbal-hang' }));
    g.appendChild(mk('circle', { cx: B.cx + B.arm - B.hangInset, cy: B.cy, r: 4.5, class: 'nbal-hang' }));
    svg.appendChild(g);
    svg.appendChild(mk('circle', { cx: B.cx, cy: B.cy, r: 8, class: 'nbal-pivot' }));
    /* ropes hang VERTICALLY from the moving anchors — outside the rotated
       group, because gravity does not rotate with the beam */
    ['left', 'right'].forEach(function (side) {
      svg.appendChild(mk('line', { x1: 0, y1: 0, x2: 0, y2: 0, class: 'nbal-rope nbal-rope-' + side }));
    });
    box.appendChild(svg);
    this._svg = svg;

    ['left', 'right'].forEach(function (side) {
      var pan = api.el('div', 'nbal-pan nbal-pan-' + side);
      pan.setAttribute('data-pan', side);
      /* ⚠ the side name is an ARIA label, not a caption. As visible text it
         sat on top of the beam; a real balance has no labels on its pans. */
      pan.setAttribute('aria-label', api.t(side === 'left' ? 'panLeft' : 'panRight'));
      var slot = api.el('div', 'nbal-slot');
      slot.setAttribute('data-slot', side);
      /* ⚠ A COVERED PAN LEAVES THE DOM ENTIRELY — not hidden with CSS.
         The numeral-leak discipline: what is under the cloth must not be
         readable from the DOM, aria, or an announcement. */
      if (self.st.cloth === side) {
        var cloth = api.el('div', 'nbal-cloth');
        cloth.textContent = '';
        cloth.setAttribute('aria-label', api.t('coveredNote'));
        slot.appendChild(cloth);
      } else {
        self.st[side].forEach(function (n, i) {
          slot.appendChild(self._tile(n, side, i));
        });
      }
      pan.appendChild(slot);
      if (api.settings.totals && self.st.cloth !== side) {
        var tot = api.el('div', 'nbal-total');
        tot.textContent = String(self.sum(self.st[side]));
        pan.appendChild(tot);
      }
      box.appendChild(pan);
      self['_pan' + side] = pan;
    });

    /* notation is a description of the beam, and only when asked for */
    if (api.settings.notation) {
      var sym = api.el('div', 'nbal-symbol');
      sym.textContent = this.symbol(this.st);
      box.appendChild(sym);
      this._sym = sym;
    } else this._sym = null;

    return box;
  },

  /* the note is a SIBLING of the stage, never absolutely placed inside
     it — as an absolute child it collided with the beam. */
  _buildNote: function () {
    var api = this.api;
    if (!this.st.held && !this.st.cloth) return null;
    var n = api.el("div", "nbal-note");
    n.textContent = api.t(this.st.held ? "heldNote" : "coveredNote");
    return n;
  },

  _tile: function (n, side, i) {
    var api = this.api, self = this;
    var t = api.el('button', 'nbal-tile');
    t.type = 'button';
    t.textContent = String(n);
    t.setAttribute('data-n', String(n));
    if (side) { t.setAttribute('data-side', side); t.setAttribute('data-i', String(i)); }
    t.setAttribute('aria-label', String(n));
    if (side) {
      t.addEventListener('click', function () {
        if (self._dragged) return;
        self.st = self.removeAt(self.st, side, i);
        self.render();
      });
    }
    return t;
  },

  _buildTray: function () {
    var api = this.api, self = this;
    var box = api.el('div', 'nbal-tray');
    var lab = api.el('div', 'nbal-traylabel');
    lab.textContent = api.t('trayLabel');
    box.appendChild(lab);
    var slot = api.el('div', 'nbal-slot nbal-slot-tray');
    var max = this.premium ? 20 : 10;
    for (var n = 1; n <= max; n++) slot.appendChild(this._tile(n, null, -1));
    box.appendChild(slot);
    if (!this.premium && this.premiumKnown) {
      var g = api.el('div', 'nbal-gate');
      var s = api.el('span');
      s.textContent = api.t('gateBig');
      var a = document.createElement('a');
      a.href = '/' + api.lang + '/pricing?from=tool-number-balance';
      a.target = '_top'; a.rel = 'noopener';
      a.textContent = api.t('unlock');
      g.append(s, a);
      box.appendChild(g);
    }
    void self;
    return box;
  },

  _buildFoot: function () {
    var api = this.api, self = this;
    var foot = api.el('div', 'nbal-foot');
    var pr = this._chip(api.t('printBtn'), false, function () {
      if (!self.premium) { self._gateInline(foot, 'gatePrint'); return; }
      try { window.print(); } catch (_) {}
    }, this.premium ? '' : 'nbal-locked');
    foot.appendChild(pr);
    var pv = api.el('div', 'nbal-privacy');
    pv.textContent = api.t('privacyLine');
    foot.appendChild(pv);
    return foot;
  },

  _gateInline: function (host, key) {
    var api = this.api;
    if (!host || !this._wrap) return;
    var old = this._wrap.querySelector('.nbal-gate-inline');
    if (old) old.remove();
    var g = api.el('div', 'nbal-gate nbal-gate-inline');
    var s = api.el('span');
    s.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-number-balance';
    a.target = '_top'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(s, a);
    host.insertAdjacentElement('beforebegin', g);
    setTimeout(function () { if (g.parentNode) g.remove(); }, 12000);
  },

  /* the only thing that runs every frame */
  _paint: function () {
    if (!this._svg) return;
    var B = this.BAL, a = this._angle;
    var g = this._svg.querySelector('.nbal-beamg');
    if (g) g.setAttribute('transform', 'rotate(' + a.toFixed(2) + ' ' + B.cx + ' ' + B.cy + ')');
    var self = this;
    ['left', 'right'].forEach(function (side) {
      var pan = self['_pan' + side];
      if (!pan) return;
      var p = self.panAnchor(side, a);
      pan.style.left = (p.x / self.VIEW.w * 100) + '%';
      pan.style.top = ((p.y + self.ROPE) / self.VIEW.h * 100) + '%';
      var rope = self._svg.querySelector('.nbal-rope-' + side);
      if (rope) {
        rope.setAttribute('x1', p.x); rope.setAttribute('y1', p.y);
        rope.setAttribute('x2', p.x); rope.setAttribute('y2', p.y + self.ROPE);
      }
    });
    if (this._sym) this._sym.textContent = this.symbol(this.st);
  },

  /* =================================================================
     DRAG — pattern from sort-bins-core.js:350-435 (body-level ghost,
     pointer capture, rect hit-test, re-parent). ZERO lines imported.
     ================================================================= */
  _wireDrag: function () {
    var self = this;
    var tiles = this._wrap.querySelectorAll('.nbal-tile');
    Array.prototype.forEach.call(tiles, function (tile) {
      tile.addEventListener('pointerdown', function (e) {
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        e.preventDefault();
        self._startDrag(tile, e);
      });
      tile.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        var n = parseInt(tile.getAttribute('data-n'), 10);
        var side = tile.getAttribute('data-side');
        if (side) { self.st = self.removeAt(self.st, side, parseInt(tile.getAttribute('data-i'), 10)); }
        else {
          /* speak only what actually landed — `add` refuses at PAN_MAX, and
             announcing a number that never arrived is the tool claiming a
             success it did not have */
          var before = self.st.left.length;
          self.st = self.add(self.st, 'left', n);
          if (self.st.left.length > before) self._say(n);
        }
        self.render();
      });
    });
  },

  _startDrag: function (tile, e) {
    var self = this;
    var rect = tile.getBoundingClientRect();
    var ghost = document.createElement('div');
    ghost.className = 'nbal-ghost';
    ghost.style.width = rect.width + 'px';
    ghost.style.height = rect.height + 'px';
    ghost.textContent = tile.textContent;
    document.body.appendChild(ghost);
    var move = function (ev) {
      ghost.style.left = ev.clientX + 'px';
      ghost.style.top = ev.clientY + 'px';
    };
    var done = function (ev) {
      tile.removeEventListener('pointermove', move);
      tile.removeEventListener('pointerup', done);
      tile.removeEventListener('pointercancel', done);
      try { tile.releasePointerCapture(ev.pointerId); } catch (_) {}
      if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
      tile.classList.remove('nbal-dragging');
      var target = self._panAt(ev.clientX, ev.clientY);
      self._dragged = true;
      setTimeout(function () { self._dragged = false; }, 0);
      if (!target) return;
      var n = parseInt(tile.getAttribute('data-n'), 10);
      var from = tile.getAttribute('data-side');
      /* ⚠ A NUMBER MUST NEVER LEAVE A PAN IT CANNOT ENTER. `add` refuses
         silently at PAN_MAX, so removing first and adding second DESTROYED
         the tile when the destination was full — gone from both pans, and
         _say() still announced it as though it had landed. Ask before
         taking, and if the answer is no, nothing moves at all. */
      if (self.st[target].length >= self.PAN_MAX) return;
      if (from) {
        if (from === target) return;
        self.st = self.removeAt(self.st, from, parseInt(tile.getAttribute('data-i'), 10));
      }
      self.st = self.add(self.st, target, n);
      self._say(n);
      self.render();
    };
    tile.classList.add('nbal-dragging');
    try { tile.setPointerCapture(e.pointerId); } catch (_) {}
    tile.addEventListener('pointermove', move);
    tile.addEventListener('pointerup', done);
    tile.addEventListener('pointercancel', done);
    move(e);
  },

  _panAt: function (x, y) {
    var pans = this._wrap.querySelectorAll('[data-slot]');
    var i, r;
    for (i = 0; i < pans.length; i++) {
      r = pans[i].getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return pans[i].getAttribute('data-slot');
    }
    return null;
  }
};

function injectNumberBalanceCSS() {
  if (document.getElementById('nbal-style')) return;
  var st = document.createElement('style');
  st.id = 'nbal-style';
  st.textContent = ''
    + '.nbal-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;}'
    + '.nbal-bar{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;}'
    + '.nbal-chip{min-height:44px;padding:8px 14px;border-radius:999px;border:1.5px solid rgba(20,107,94,.3);'
    +   'background:#FFFDF7;color:#146B5E;font-family:Nunito,system-ui,sans-serif;font-size:15px;cursor:pointer;}'
    + '.nbal-chip:hover{background:#F3EADA;}'
    + '.nbal-chip.nbal-on{background:#146B5E;border-color:#146B5E;color:#FFFDF7;}'
    + '.nbal-chip:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
    /* THE STAGE — the SVG carries the beam, the pans are DOM boxes moved
       to the anchor the angle produces (measurement-bench pattern). */
    + '.nbal-stage{position:relative;width:min(100%,700px);aspect-ratio:700/268;}'
    + '.nbal-svg{position:absolute;inset:0;width:100%;height:100%;}'
    + '.nbal-stand{fill:rgba(20,107,94,.16);}'
    + '.nbal-base{fill:#146B5E;}'
    + '.nbal-beam{fill:#146B5E;}'
    + '.nbal-hang{fill:#0E4F45;}'
    + '.nbal-rope{stroke:#0E4F45;stroke-width:2;stroke-linecap:round;}'
    + '.nbal-pivot{fill:#F2784B;}'
    + '.nbal-pan{position:absolute;transform:translate(-50%,0);display:flex;flex-direction:column;'
    +   'align-items:center;gap:2px;width:clamp(120px,22vw,168px);}'
    + '.nbal-slot{display:flex;flex-wrap:wrap;gap:4px;justify-content:center;align-content:flex-start;'
    +   'min-height:52px;width:100%;padding:6px;border-radius:12px;'
    +   'border:2px solid rgba(20,107,94,.28);background:rgba(255,253,247,.92);}'
    + '.nbal-slot-tray{border:none;background:rgba(243,234,218,.6);min-height:56px;}'
    + '.nbal-total{font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-size:19px;color:#146B5E;}'
    + '.nbal-cloth{width:100%;min-height:40px;border-radius:9px;'
    +   'background:repeating-linear-gradient(45deg,#C9BBA4,#C9BBA4 7px,#BFAF95 7px,#BFAF95 14px);}'
    + '.nbal-symbol{position:absolute;left:50%;top:38%;transform:translate(-50%,0);background:#FBF3E4;border-radius:999px;padding:0 10px;line-height:1.1;'
    +   'font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-size:34px;color:#146B5E;}'
    + '.nbal-note{font-family:Nunito,system-ui,sans-serif;font-size:15px;color:#3C7C72;text-align:center;max-width:52ch;}'
    /* TILES */
    + '.nbal-tile{min-width:44px;min-height:44px;padding:4px 8px;border-radius:11px;'
    +   'border:1.5px solid rgba(20,107,94,.25);background:#FFFDF7;color:#146B5E;cursor:grab;'
    +   'font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-size:19px;line-height:1;'
    +   'touch-action:none;user-select:none;}'
    + '.nbal-tile:hover{background:#F3EADA;}'
    + '.nbal-tile:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
    + '.nbal-tile.nbal-dragging{opacity:.32;}'
    + '.nbal-ghost{position:fixed;z-index:99999;pointer-events:none;transform:translate(-50%,-50%);'
    +   'display:flex;align-items:center;justify-content:center;border-radius:11px;background:#FFFDF7;'
    +   'border:1.5px solid rgba(20,107,94,.35);color:#146B5E;'
    +   'font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-size:19px;opacity:.92;}'
    + '.nbal-tray{width:min(100%,700px);display:flex;flex-direction:column;gap:5px;}'
    + '.nbal-traylabel{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#6B6558;text-align:center;}'
    + '.nbal-foot{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;}'
    + '.nbal-privacy{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#6B6558;'
    +   'text-align:center;width:100%;}'
    + '.nbal-locked{border-color:rgba(242,120,75,.55);color:#C2562F;}'
    + '.nbal-gate{display:flex;align-items:center;gap:9px;flex-wrap:wrap;justify-content:center;'
    +   'padding:8px 12px;border-radius:12px;background:rgba(242,120,75,.1);'
    +   'font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#8A4A2E;}'
    + '.nbal-gate a{color:#C2562F;font-weight:700;}'
    + '@media (max-width:560px){'
        +   '.nbal-symbol{font-size:28px;}'
    +   '.nbal-note{font-size:14px;}'
    + '}'
    + 'body.nbal-wide .lcs-header{flex-direction:column;}'
    /* the shell sets html,body{overflow:hidden} — past the fold on a phone
       is UNREACHABLE, not merely off-screen (letter-studio precedent) */
    + '@media (max-width:700px){body.nbal-wide{overflow-y:auto;overflow-x:hidden;height:auto;min-height:100%;}}'
    /* the beam is physics, so it is NOT an animation to be switched off —
       but nothing else here moves */
    /* =====================================================================
       WIDE VIEWPORTS — GEOMETRY, and TWO caps, not one.
       The classifier put this in CARD-MAXED: the shell already gives it an
       1800px card at 2560 and the instrument is still 27.3% of the screen,
       so raising the card does nothing. The chain-walk names both binders:
           .nbal-tile   44 px   <== width:44px      (min-width, content-sized)
           .nbal-tray  700 px   <== width:min(100%,700px)
           .nbal-wrap 1752 px
           .lcs-app   1800 px   <== max-width:1800px
       ⚠⚠ THE TRAY CAP IS A `width:min(100%,700px)`, NOT A max-width, and my
       chain-walker's first version only tested max-width — it reported this
       tool as having NO cap anywhere and I said so out loud. Ramping the
       tile alone would then have measured ~unchanged, exactly as
       part-whole-frame's first attempt did. `width:min(100%,Npx)` is the
       house pattern here and it binds every bit as hard.

       So both move together, per tier. The tile is content-sized around a
       numeral, so its font goes with it or a 64px box holds 19px type:
           A  tray  900  tile min 56  font 24   slot min-h 66
           B  tray 1120  tile min 64  font 27   slot min-h 76
           C  tray 1320  tile min 72  font 30   slot min-h 84

       ⚠⚠ AND THE BALANCE ITSELF IS ON A SECOND BRANCH THE CHAIN-WALK NEVER
       SAW. I shipped tray + tile, read the render, and the beam and pans —
       the instrument this tool is NAMED for — were still ~420px beside a
       1320px tray. `.nbal-stage` carries its own `width:min(100%,700px)`.
       The walker starts from the most-REPEATED unit, so it walked the tray
       branch and stopped; a tool with a supply row and a separate apparatus
       stage has two chains and the widest one is not always the repeated
       one. Growing the supply and leaving the apparatus is the hollow-
       widening defect one level sideways, and the HOLLOW-WIDENING assertion
       passed it because the tile genuinely grew.
       The stage keeps its 700/268 aspect, so raising it costs height:
           A  stage  900 -> 344 tall -> card ~845 of  880
           B  stage 1120 -> 429 tall -> card ~954 of 1080
           C  stage 1320 -> 505 tall -> card ~1038 of 1150
       ⚠ `min-width`/`min-height` are RAISED, never replaced — 44px is the
       K-2 tap floor and every tier here is above it, so the floor still
       holds at every width including the ones these rules never touch.
       ===================================================================== */
    + '@media (min-width:1367px) and (min-height:880px){'
    +   'body.nbal-wide .nbal-tray{width:min(100%,900px);}'
    +   'body.nbal-wide .nbal-stage{width:min(100%,900px);}'
    +   'body.nbal-wide .nbal-tile{min-width:56px;min-height:56px;font-size:24px;}'
    +   'body.nbal-wide .nbal-slot{min-height:66px;}'
    +   'body.nbal-wide .nbal-slot-tray{min-height:70px;}'
    + '}'
    + '@media (min-width:1800px) and (min-height:1080px){'
    +   'body.nbal-wide .nbal-tray{width:min(100%,1120px);}'
    +   'body.nbal-wide .nbal-stage{width:min(100%,1120px);}'
    +   'body.nbal-wide .nbal-tile{min-width:64px;min-height:64px;font-size:27px;}'
    +   'body.nbal-wide .nbal-slot{min-height:76px;}'
    +   'body.nbal-wide .nbal-slot-tray{min-height:80px;}'
    + '}'
    + '@media (min-width:2400px) and (min-height:1150px){'
    +   'body.nbal-wide .nbal-tray{width:min(100%,1320px);}'
    +   'body.nbal-wide .nbal-stage{width:min(100%,1320px);}'
    +   'body.nbal-wide .nbal-tile{min-width:72px;min-height:72px;font-size:30px;}'
    +   'body.nbal-wide .nbal-slot{min-height:84px;}'
    +   'body.nbal-wide .nbal-slot-tray{min-height:88px;}'
    + '}'
    + '@media (prefers-reduced-motion:reduce){.nbal-tile{transition:none !important;}}'
    + '@media print{'
    +   '.nbal-bar,.nbal-tray,.nbal-foot,.nbal-gate{display:none !important;}'
    +   '.nbal-stage{page-break-inside:avoid;break-inside:avoid;}'
    +   '.nbal-beam,.nbal-base,.nbal-hang{fill:#000 !important;}'
    +   '.nbal-pivot{fill:#555 !important;}'
    +   '.nbal-stand{fill:#ccc !important;}'
    +   '.nbal-tile{color:#000 !important;border-color:#000 !important;background:#fff !important;}'
    +   '.nbal-total,.nbal-symbol,.nbal-pancap{color:#000 !important;}'
    + '}';
  document.head.appendChild(st);
}
