/* =====================================================================
   TOOL #26 — OPEN NUMBER LINE   (open-number-line.js)
   ---------------------------------------------------------------------
   Free-play manipulative (no `tasks` — the shell renders zero activity
   chrome). The Math Table.

   THE EMPTY LINE. Not a number line with the ticks hidden: a line with
   no ticks at all, where the child places the numbers and draws the
   jumps. 47 + 25 becomes +10, +10, +5 landing on 72 — the strategy, not
   the answer. Nothing here is graded, there is no Check, and the tool
   never says a jump was wrong. The jumps ARE the child's reasoning; the
   teacher reads them out loud with the class.

   ⚠ WHY THIS IS NOT Hopper's Number Line. `docs/character-art-spec.md`
   (~:1019) carries an explicit in-repo collision warning: add/subtract
   BY HOPPING on a number line is already OWNED by the shipped
   2.MD.B.6 activity. The split is real and must stay real:

       Hopper's (activity)          | Open Number Line (this tool)
       ---------------------------- | ----------------------------
       marked line, fixed ticks     | EMPTY line, no ticks
       the round sets the landmarks | THE CHILD places them
       dial the landing             | DRAW the arc; landing DERIVED
       graded, has a right answer   | never graded, no right answer

   Hopper's frog is that activity's character and is deliberately NOT
   reused here (it is also only an emoji there, not art). This tool
   travels its own marker along the arc.

   THE MODEL. A line is `{start, deltas[]}` and NOTHING else. Every
   landing is RECOMPUTED from that sequence, never stored — the same
   derived-not-stored discipline graph-it-core and numberline-jump-core
   hold. Undo is `deltas.pop()`; there is no other state to unwind.

   NUMBER WORDS are a byte-faithful copy of place-value-core's
   `_NUMBER_WORD_HELPERS` (0-999 × 11 locales), the rekenrek precedent —
   COPY, never import, because the tool page does not load that core.
   `scripts/verify-open-number-line.js` runs a DRIFT GATE that loads the
   live core and asserts every one of 0-999 × 11 still matches, so the
   copy cannot rot silently. Landings are spoken as words, which is the
   whole moat: a German class hears "siebenundvierzig" while the marker
   sits on 47.
   ===================================================================== */
var OpenNumberLine = {
  id: 'open-number-line',

  /* CURATED: en authored; the other ten carry drafts until their native
     ensemble pass lands via apply-open-number-line-fanout.js.
     ⚠ number-line.js:19-21 carries a standing curation flag — the MATH
     name varies by national tradition and Nordic + Finnish especially
     need a native pass. That applies double here, because the EMPTY
     line has its own name in the traditions that invented it
     (nl "lege getallenlijn", de "Rechenstrich") and it must not collide
     with our own shipped `number-line` tool, which already owns the
     head term in all eleven locales. */
  strings: {
    title:        {en:'Open Number Line',de:'Rechenstrich',fr:'La ligne des sauts',it:'La linea dei salti',es:'Recta numérica abierta',pt:'Reta numérica vazia',nl:'Lege getallenlijn',sv:'Tom tallinje',da:'Den tomme tallinje',no:'Tom tallinje',fi:'Piirrä hypyt'},
    instruction:  {en:'Set where you start, then drag to draw each jump.',de:'Wähle deine Startzahl und ziehe dann jeden Sprung selbst.',fr:'Choisis ton point de départ, puis trace chaque saut.',it:'Scegli da dove parti, poi trascina per disegnare ogni salto.',es:'Elige dónde empiezas y arrastra para dibujar cada salto.',pt:'Escolha onde começar e arraste para desenhar cada salto.',nl:'Kies waar je begint en sleep om elke sprong te tekenen.',sv:'Välj var du börjar och dra sedan för att rita varje hopp.',da:'Vælg, hvor du starter, og træk for at tegne hvert hop.',no:'Velg hvor du starter, og dra for å tegne hvert hopp.',fi:'Valitse, mistä aloitat, ja piirrä sitten hypyt vetämällä.'},

    /* the line */
    startAt:      {en:'Start at',de:'Startzahl',fr:'Départ',it:'Parti da',es:'Empieza en',pt:'Começar em',nl:'Begin bij',sv:'Börja på',da:'Start på',no:'Start på',fi:'Aloituskohta'},
    dragHint:     {en:'Press the marker and drag to jump.',de:'Halte die Markierung gedrückt und ziehe sie – so entsteht ein Sprung.',fr:'Appuie sur le pion et fais-le glisser pour sauter.',it:'Tieni premuto il segnalino e trascinalo per saltare.',es:'Mantén presionado el marcador y arrástralo para saltar.',pt:'Segure o marcador e arraste para saltar.',nl:'Houd de markering vast en sleep om te springen.',sv:'Tryck på pricken och dra för att hoppa.',da:'Hold på markøren, og træk for at hoppe.',no:'Hold på brikken og dra for å hoppe.',fi:'Paina osoitinta ja vedä, niin hyppy piirtyy.'},
    nowAt:        {en:'Now at {n}',de:'Jetzt bei {n}',fr:'Tu es à {n}',it:'Ora sei a {n}',es:'Ahora en {n}',pt:'Agora em {n}',nl:'Nu op {n}',sv:'Nu på {n}',da:'Nu på {n}',no:'Nå på {n}',fi:'Nyt luvussa {n}'},
    totalSoFar:   {en:'altogether {n}',de:'insgesamt {n}',fr:'{n} en tout',it:'in tutto {n}',es:'en total {n}',pt:'ao todo {n}',nl:'in totaal {n}',sv:'sammanlagt {n}',da:'i alt {n}',no:'til sammen {n}',fi:'Yhteensä {n}'},
    jumpsSoFar:   {en:'Jumps: {n}',de:'Sprünge: {n}',fr:'Sauts : {n}',it:'salti: {n}',es:'Saltos: {n}',pt:'Saltos: {n}',nl:'{n} keer gesprongen',sv:'{n} hopp',da:'{n} hop indtil nu',no:'{n} hopp så langt',fi:'Hyppyjä: {n}'},

    /* controls */
    undoBtn:      {en:'Undo the last jump',de:'Letzten Sprung zurücknehmen',fr:'Annuler le dernier saut',it:'Annulla l’ultimo salto',es:'Deshacer el último salto',pt:'Desfazer o último salto',nl:'Laatste sprong weghalen',sv:'Ångra senaste hoppet',da:'Fortryd sidste hop',no:'Angre siste hopp',fi:'Kumoa viimeinen hyppy'},
    clearBtn:     {en:'Start over',de:'Neu beginnen',fr:'Recommencer',it:'Ricomincia',es:'Empezar de nuevo',pt:'Começar de novo',nl:'Opnieuw beginnen',sv:'Börja om',da:'Start forfra',no:'Start på nytt',fi:'Aloita alusta'},
    replayBtn:    {en:'Play my thinking',de:'Meinen Rechenweg abspielen',fr:'Rejouer mon raisonnement',it:'Rivedi il mio ragionamento',es:'Ver cómo lo pensé',pt:'Ver como eu pensei',nl:'Mijn aanpak afspelen',sv:'Spela upp hur jag tänkte',da:'Afspil min tankegang',no:'Spill av hvordan jeg tenkte',fi:'Näytä, miten laskin'},
    printBtn:     {en:'Print this line',de:'Druckvorlage',fr:'Imprimer la ligne',it:'Stampa questa linea',es:'Imprimir esta recta',pt:'Imprimir esta reta',nl:'Deze lijn printen',sv:'Skriv ut linjen',da:'Print linjen',no:'Skriv ut linja',fi:'Tulosta hypyt'},

    /* settings */
    setRange:     {en:'How far the line goes',de:'Zahlenraum',fr:'Jusqu’où va la ligne',it:'Fin dove arriva la linea',es:'Hasta dónde llega la recta',pt:'Até onde a reta vai',nl:'Hoe ver de lijn loopt',sv:'Hur långt linjen går',da:'Hvor langt linjen går',no:'Hvor langt linja går',fi:'Kuinka pitkälle lukusuora ulottuu'},
    setSnap:      {en:'Help me land on friendly numbers',de:'Hilf mir, auf glatten Zahlen zu landen',fr:'Aide-moi à arriver sur des nombres ronds',it:'Aiutami a fare tappa sui numeri tondi',es:'Ayúdame a caer en decenas exactas',pt:'Me ajude a parar em números redondos',nl:'Help me naar ronde getallen springen',sv:'Hjälp mig landa på runda tal',da:'Hjælp mig med at lande på runde tal',no:'Hjelp meg å lande på runde tall',fi:'Auta minua osumaan helppoihin lukuihin'},
    setVoice:     {en:'Say the number I land on',de:'Sag die Zahl, auf der ich lande',fr:'Dis le nombre où j’arrive',it:'Di’ il numero a cui arrivo',es:'Di el número en el que caigo',pt:'Diga o número onde eu paro',nl:'Zeg het getal waar ik uitkom',sv:'Säg talet jag landar på',da:'Sig tallet, jeg lander på',no:'Si tallet jeg lander på',fi:'Sano luku, johon hyppään'},

    /* gate */
    gatePremium:  {en:'Replaying your thinking, saved lines and the printable are part of Premium — the line itself is always free.',de:'Den Rechenweg abspielen, Rechenstriche speichern und die Druckvorlage gehören zu Premium – der Rechenstrich selbst bleibt immer kostenlos.',fr:'Rejouer le raisonnement, enregistrer ses lignes et les imprimer font partie de Premium — la ligne elle-même reste toujours gratuite.',it:'Rivedere il ragionamento, salvare le linee e stampare la linea fanno parte di Premium: la linea resta sempre gratuita.',es:'Reproducir el razonamiento, guardar rectas e imprimirlas son parte de Premium: la recta en sí siempre es gratis.',pt:'Ver o raciocínio outra vez, guardar retas e imprimir a reta fazem parte do Premium — a reta em si é sempre gratuita.',nl:'Je aanpak afspelen, lijnen bewaren en de lijn printen horen bij Premium — de lijn zelf blijft altijd gratis.',sv:'Att spela upp hur du tänkte, spara linjer och skriva ut linjen ingår i Premium — själva linjen är alltid gratis.',da:'At afspille tankegangen, gemme linjer og printe dem hører til Premium – selve linjen er altid gratis.',no:'Å spille av hvordan du tenkte, lagre linjer og skrive dem ut er en del av Premium – selve tallinja er alltid gratis.',fi:'Oman laskutavan toistaminen, lukusuorien tallentaminen ja tulostaminen kuuluvat Premiumiin – itse lukusuora on aina ilmainen.'},
    unlock:       {en:'See Premium',de:'Premium ansehen',fr:'Voir Premium',it:'Scopri Premium',es:'Ver Premium',pt:'Ver o Premium',nl:'Bekijk Premium',sv:'Se Premium',da:'Se Premium',no:'Se Premium',fi:'Katso Premium'},
    gateClose:    {en:'Not now',de:'Jetzt nicht',fr:'Pas maintenant',it:'Non ora',es:'Ahora no',pt:'Agora não',nl:'Nu niet',sv:'Inte nu',da:'Ikke nu',no:'Ikke nå',fi:'Ei nyt'}
  },

  STORE_KEY: 'lcs:open-number-line:v1',
  ENT_TRUST_DAYS: 14,

  defaults: { range: 100, snap: true, voice: true },
  settings: [
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [20, 100, 1000] },
    { key: 'snap',  type: 'toggle', labelKey: 'setSnap' },
    { key: 'voice', type: 'toggle', labelKey: 'setVoice' }
  ],

  premium: false,

  /* =================================================================
     PURE ENGINE — no DOM, no storage. The build gate calls all of it.
     ================================================================= */

  /* The drawing box. viewBox units, stretched with preserveAspectRatio
     "none" exactly as number-line.js does, so the geometry below is
     resolution-free and testable without a browser. */
  GEOM: { W: 1000, H: 300, INSET: 46, AXIS_Y: 232, ARC_MAX: 168, ARC_MIN: 26 },

  /* ---- the model: a line is a start and a list of deltas, full stop ---- */
  newLine: function (start) { return { start: start | 0, deltas: [] }; },

  /* immutable — the gate proves the input is untouched, because an
     in-place push would make undo and replay disagree about history */
  addJump: function (line, delta) {
    if (!line || !delta) return line;
    return { start: line.start, deltas: line.deltas.concat([delta | 0]) };
  },
  undoJump: function (line) {
    if (!line || !line.deltas.length) return line;
    return { start: line.start, deltas: line.deltas.slice(0, -1) };
  },

  /* every landing RECOMPUTED from the sequence — never stored */
  landings: function (line) {
    var out = [line.start], v = line.start, i;
    for (i = 0; i < line.deltas.length; i++) { v += line.deltas[i]; out.push(v); }
    return out;
  },
  landing: function (line) {
    var l = this.landings(line);
    return l[l.length - 1];
  },

  /* ---- notation: the label that writes itself above each arc ----
     ⚠ a real minus sign (U+2212), never a hyphen — on a projected
     number line a hyphen reads as a dash in the notation. */
  label: function (delta) {
    return (delta >= 0 ? '+' : '−') + Math.abs(delta | 0);
  },

  /* ---- the visible window ----
     An empty line still needs a scale, but it must never clip what the
     child drew. Take the span of everything on the line, pad it, and
     round outward to something readable. */
  viewFor: function (line, range) {
    var ls = this.landings(line), lo = Math.min.apply(null, ls), hi = Math.max.apply(null, ls);
    var max = range || 100;
    /* Room to jump INTO, without drowning the drawing. A flat slab of the
       range (0..77 for a 0..20 line) left three quarters of the sheet empty
       and read as unbalanced; a lookahead of a few friendly steps keeps the
       child's work prominent and still leaves somewhere to go. */
    var step = this.friendlyStep(max);
    var minSpan = Math.min(max, Math.max((hi - lo) * 1.6, step * 4));
    if (hi - lo < minSpan) {
      var grow = minSpan - (hi - lo);
      lo = Math.round(lo - grow * 0.25);
      hi = Math.round(hi + grow * 0.75);
    }
    var pad = Math.max(1, Math.round((hi - lo) * 0.12));
    lo -= pad; hi += pad;
    /* ⚠ never open negative territory. A K-3 child is not working below
       zero, and a window of -27..47 also shoves the whole drawing into the
       left third of the sheet, which reads as broken rather than as scale. */
    var floorAt = Math.min.apply(null, ls);
    /* Clamp and STOP — pushing the lost span onto `hi` preserved the window
       width but shoved the drawing into the left quarter. For a line that
       starts at 0, 0 belonging at the left edge is simply correct, and the
       tighter window makes the child's arcs bigger. */
    if (floorAt >= 0 && lo < 0) lo = 0;
    if (lo > 0 && lo < max * 0.15) lo = 0;     /* snap the left edge home when it is close */
    if (hi <= lo) hi = lo + 1;
    return { min: lo, max: hi };
  },

  /* value -> x, the same mapping number-line.js uses */
  xOf: function (value, view) {
    var g = this.GEOM, span = (view.max - view.min) || 1;
    return g.INSET + ((value - view.min) / span) * (g.W - 2 * g.INSET);
  },

  /* ---- THE ARC ----
     No arc renderer existed anywhere in this repo (Hopper's activity
     draws its hop as a rounded-rect span), so this is the one genuinely
     net-new piece and it is deliberately a pure function.

     A jump is a half-ellipse ABOVE the axis. rx is half the horizontal
     travel; ry is capped so a +100 jump does not draw a dome off the
     top of the sheet, and floored so a +1 jump is still visibly an arc
     rather than a flat smear. Sweep is 1 going right and 0 going left,
     which is what keeps a take-away arc above the line instead of
     flipping under it. */
  arcPath: function (from, to, view) {
    var g = this.GEOM;
    var x1 = this.xOf(from, view), x2 = this.xOf(to, view);
    var rx = Math.abs(x2 - x1) / 2;
    var ry = Math.max(g.ARC_MIN, Math.min(g.ARC_MAX, rx));
    var sweep = (to >= from) ? 1 : 0;
    if (rx < 0.5) {                            /* a zero-width jump would vanish */
      return 'M' + x1.toFixed(2) + ' ' + g.AXIS_Y + ' L' + x1.toFixed(2) + ' ' + (g.AXIS_Y - g.ARC_MIN).toFixed(2);
    }
    return 'M' + x1.toFixed(2) + ' ' + g.AXIS_Y +
           ' A' + rx.toFixed(2) + ' ' + ry.toFixed(2) + ' 0 0 ' + sweep + ' ' +
           x2.toFixed(2) + ' ' + g.AXIS_Y;
  },

  /* ---- how much of the box the drawing actually needs ----
     The arcs only reach as high as the longest jump, so a fixed-height
     sheet leaves a large dead band above a short line — the "sparse"
     class the visual DoD rejects. Crop it with the viewBox alone: every
     coordinate stays exactly as computed, only the visible window moves,
     so nothing downstream has to know. */
  cropFor: function (line, view) {
    var g = this.GEOM, top = g.AXIS_Y - g.ARC_MIN, ls = this.landings(line), i;
    for (i = 0; i < line.deltas.length; i++) {
      var y = this.arcApex(ls[i], ls[i + 1], view).y;
      if (y < top) top = y;
    }
    top -= 74;                                  /* headroom for the +10 label — 46 left only ~11px of ceiling */
    if (top < 0) top = 0;
    var bottom = g.AXIS_Y + 116;                 /* the landing numbers live here */
    var h = bottom - top;
    /* ...but do not crop so hard that the line becomes a thin strip on a
       projector. Keep a floor and give the extra room to the top, where the
       next arc will go. */
    var MIN_H = 210;
    if (h < MIN_H) { top -= (MIN_H - h); h = MIN_H; if (top < 0) { h += top; top = 0; } }
    return { y: Math.round(top), h: Math.round(h) };
  },

  /* the apex, for hanging the label and flying the marker */
  arcApex: function (from, to, view) {
    var g = this.GEOM;
    var x1 = this.xOf(from, view), x2 = this.xOf(to, view);
    var rx = Math.abs(x2 - x1) / 2;
    var ry = Math.max(g.ARC_MIN, Math.min(g.ARC_MAX, rx));
    return { x: (x1 + x2) / 2, y: g.AXIS_Y - ry };
  },

  /* ---- friendly numbers ----
     The Dutch/German move is to jump TO a round number, not by a round
     amount, so this snaps the LANDING. Off = the child's exact drag. */
  friendlyStep: function (range) { return range >= 1000 ? 100 : range >= 100 ? 10 : 5; },
  snapLanding: function (value, range, on) {
    if (!on) return Math.round(value);
    var step = this.friendlyStep(range);
    return Math.round(value / step) * step;
  },

  /* Snapping the LANDING is right, but plain rounding makes a small
     deliberate drag do NOTHING — the child pulls, lets go, and the tool
     sits there looking broken. Borrow the rekenrek commit rule: once
     they have travelled a quarter of a step in a clear direction, commit
     to the next friendly number THAT WAY. Below that it is a stray
     touch and is correctly ignored. */
  snapFrom: function (fromValue, rawValue, range, on) {
    if (!on) return Math.round(rawValue);
    var step = this.friendlyStep(range);
    var moved = rawValue - fromValue;
    var snapped = this.snapLanding(rawValue, range, true);
    /* ⚠ THE ZEHNERSTOPP IS DIRECTIONAL (German ensemble ruling, and a real
       bug before it): nearest-rounding could put a FORWARD drag from 47
       down on 40 — behind where the child started. A jump must never go
       the way the finger did not. */
    /* Order matters, and my first cut got it wrong: applying the direction
       guard before the commit threshold turned a 0.4-unit stray touch into
       a full +10. Threshold FIRST — below it there is no jump at all (the
       rekenrek commit rule) — and only then is direction guaranteed. */
    if (Math.abs(moved) < step * 0.25) return fromValue;
    if (moved > 0 && snapped <= fromValue) snapped = Math.ceil((fromValue + 1) / step) * step;
    else if (moved < 0 && snapped >= fromValue) snapped = Math.floor((fromValue - 1) / step) * step;
    return snapped;
  },

  /* ---- what the jumps add up to ----
     The German ensemble caught the real gap: for 72 − 47 the Klasse-2
     method is ERGÄNZEN — jump forward from 47 — and the answer is the SUM
     OF THE ARCS, not the landing. Without this the teacher adds the Bögen
     by hand at the board. Net sum, so a back-jump correctly cancels. */
  totalJumped: function (line) {
    var t = 0, i;
    for (i = 0; i < line.deltas.length; i++) t += line.deltas[i];
    return t;
  },

  fmt: function (key, args) {
    var s = this.api.t(key);
    for (var k in args) if (Object.prototype.hasOwnProperty.call(args, k))
      s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), args[k]);
    return s;
  },

  /* ---- number words: byte-faithful copy, drift-gated ---- */
  numberWord: function (n, lang, mode, capitalize) {
    lang = lang || 'en';
    mode = mode || 'cardinal';
    if (n < 0 || n > 999) return String(n);
    var helper = (this._NUMBER_WORD_HELPERS && this._NUMBER_WORD_HELPERS[lang])
                  ? this._NUMBER_WORD_HELPERS[lang]
                  : this._NUMBER_WORD_HELPERS.en;
    var word = helper(n, mode);
    if (capitalize && word && word.length > 0) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  },

  _NUMBER_WORD_HELPERS: {
    en: function (n, mode) {
      /* 0-19 lookup; 20-99 = tens-word + "-" + ones-word (or tens-word
         alone when ones===0). 100-999 = ones-word + "hundred" + " " +
         sub99(remainder) — US Common Core convention with NO "and"
         between hundreds and tens (305 = "three hundred five", NOT
         "three hundred and five"). Round hundreds: 200 = "two hundred".
         Zero-tens: 305 = "three hundred five". Zero-ones: 420 = "four
         hundred twenty". mode is ignored (cardinal===attributive). */
      var ones = ['zero','one','two','three','four','five','six','seven','eight','nine',
                  'ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
      var tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
      function sub99(m) {
        if (m < 20) return ones[m];
        var t = Math.floor(m / 10), o = m % 10;
        return (o === 0) ? tens[t] : (tens[t] + '-' + ones[o]);
      }
      if (n < 100) return sub99(n);
      var h = Math.floor(n / 100), rem = n % 100;
      var hPart = ones[h] + ' hundred';
      if (rem === 0) return hPart;
      return hPart + ' ' + sub99(rem);
    },
    de: function (n, mode) {
      /* German 0-999. 0-99 units-first compound (einundzwanzig = 1 +
         und + 20) — BYTE-IDENTICAL to prior shipped (load-bearing for
         the LIVE 1.NBT.B.2 DE tens-and-ones activity at /de/activities/
         zehner-und-einer; the existing logic is preserved verbatim
         under `if (n < 100)` guard).

         100-999 NEW layer (2.NBT.A.1 activity 2 DE fan-out):
         <ones-attributive>hundert + agglutinated 0-99 tail as a single
         word (zweihundertsiebenundvierzig). Classroom convention:
         100 = "einhundert" (NOT colloquial bare "hundert"); 101 =
         "einhunderteins" (cardinal `eins` at ones-only tail position,
         not attributive `ein`); 305 = "dreihundertfünf" (zero-tens
         skipped, no `null` inserted); 420 = "vierhundertzwanzig"
         (zero-ones, ends on tens-word). */
      var onesCard = ['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun'];
      var onesAttr = ['null','ein', 'zwei','drei','vier','fünf','sechs','sieben','acht','neun'];
      var teens    = ['zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn'];
      var tens     = ['','','zwanzig','dreißig','vierzig','fünfzig','sechzig','siebzig','achtzig','neunzig'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive') ? onesAttr[n] : onesCard[n];
        if (n < 20) return teens[n - 10];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        return onesAttr[o] + 'und' + tens[t];  // e.g. einundzwanzig
      }
      /* 100-999 layer */
      var h = Math.floor(n / 100), rem = n % 100;
      var hPart = onesAttr[h] + 'hundert';     // ein/zwei/.../neun + hundert
      if (rem === 0) return hPart;             // 200 → zweihundert
      if (rem < 10) return hPart + onesCard[rem];     // 305 → dreihundertfünf, 101 → einhunderteins
      if (rem < 20) return hPart + teens[rem - 10];   // 215 → zweihundertfünfzehn
      var t2 = Math.floor(rem / 10), o2 = rem % 10;
      if (o2 === 0) return hPart + tens[t2];          // 420 → vierhundertzwanzig
      return hPart + onesAttr[o2] + 'und' + tens[t2]; // 247 → zweihundertsiebenundvierzig
    },
    es: function (n, mode) {
      /* Spanish 0-999. 0-99 BYTE-IDENTICAL to prior shipped (load-bearing
         for the LIVE 1.NBT.B.2 ES tens-and-ones activity at /es/activities/
         decenas-y-unidades; existing logic preserved verbatim under
         `if (n < 100)` guard).

         100-999 NEW layer for 2.NBT.A.1 activity 2 ES fan-out:
         - n=100 → "cien" (standalone form; NOT "ciento")
         - n=101-199 → "ciento " + sub99(rem) (space-separated)
         - n=200-999 → hundreds[h] + (rem ? " " + sub99(rem) : "")
         - hundreds[2..9]: doscientos, trescientos, cuatrocientos,
           QUINIENTOS (irregular 500, NOT cincocientos), seiscientos,
           SETECIENTOS (irregular 700, NOT sietecientos), ochocientos,
           NOVECIENTOS (irregular 900, NOT nuevecientos)
         - "y" appears ONLY inside sub99 between tens and units
           (existing rule). NEVER between hundreds and tens:
           305 = "trescientos cinco", NOT "trescientos y cinco". */
      var lookup = [
        'cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve',
        'diez','once','doce','trece','catorce','quince',
        'dieciséis','diecisiete','dieciocho','diecinueve',
        'veinte','veintiuno','veintidós','veintitrés','veinticuatro',
        'veinticinco','veintiséis','veintisiete','veintiocho','veintinueve'
      ];
      var attrFem = ['cero','una','dos','tres','cuatro','cinco','seis','siete','ocho','nueve'];
      var tens = ['','','veinte','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive-fem') ? attrFem[n] : lookup[n];
        if (n < 30) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        return tens[t] + ' y ' + lookup[o];  // e.g. cuarenta y siete
      }
      /* 100-999 layer */
      if (n === 100) return 'cien';
      var hundredsBare = ['','ciento','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos'];
      var h = Math.floor(n / 100), rem = n % 100;
      var hPart = hundredsBare[h];
      if (rem === 0) return hPart;
      /* sub99 inline — cardinal-form tail; "y" between tens and units */
      function sub99(m) {
        if (m < 30) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        return tens[t2] + ' y ' + lookup[o2];
      }
      return hPart + ' ' + sub99(rem);
    },
    it: function (n, mode) {
      /* Italian 0-999. 0-99 BYTE-IDENTICAL to prior shipped (load-bearing
         for the LIVE 1.NBT.B.2 IT activity at /it/activities/decine-e-unita;
         existing logic — ventuno/ventotto vowel-elision + tré grave-accent
         in compound — preserved verbatim under `if (n < 100)` guard).

         100-999 NEW layer for 2.NBT.A.1 activity 2 IT fan-out:
         - n=100 → "cento" (standalone)
         - n=200-900 round → multiplier + "cento": duecento, trecento,
           ..., novecento. cento INVARIANT (NEVER "duecenti").
         - n=101-999 compound → hundreds-word + sub99(rem) AGGLUTINATED
           with VOWEL ELISION at cento boundary when sub99 starts with
           'o' or 'u':
             cento + uno → centuno
             cento + otto → centotto
             cento + ottanta → centottanta
             cinquecento + ottantatré → cinquecentottantatré
           No elision when sub99 starts with consonant or other vowel:
             cento + due → centodue
             cento + venti → centoventi (no cento elision; internal
             ventuno/ventotto elision preserved in sub99). */
      var lookup = [
        'zero','uno','due','tre','quattro','cinque','sei','sette','otto','nove',
        'dieci','undici','dodici','tredici','quattordici','quindici',
        'sedici','diciassette','diciotto','diciannove'
      ];
      var attrFem = ['zero','una','due','tre','quattro','cinque','sei','sette','otto','nove'];
      var tens = ['','','venti','trenta','quaranta','cinquanta','sessanta','settanta','ottanta','novanta'];
      /* Compound-position ones forms: same as standalone except 3 → 'tré'. */
      var onesForCompound = ['','uno','due','tré','quattro','cinque','sei','sette','otto','nove'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive-fem') ? attrFem[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        var tensStr = tens[t];
        if (o === 1 || o === 8) tensStr = tensStr.slice(0, -1);  // elision: ventuno, ventotto
        return tensStr + onesForCompound[o];
      }
      /* 100-999 layer */
      var hundredsMul = ['','','due','tre','quattro','cinque','sei','sette','otto','nove'];
      var h = Math.floor(n / 100), rem = n % 100;
      var hWord = (h === 1) ? 'cento' : hundredsMul[h] + 'cento';
      if (rem === 0) return hWord;
      /* sub99 inline — cardinal-form tail with internal ventuno/ventotto
         elision + tré grave-accent preserved. */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        var tensStr2 = tens[t2];
        if (o2 === 1 || o2 === 8) tensStr2 = tensStr2.slice(0, -1);
        return tensStr2 + onesForCompound[o2];
      }
      var tail = sub99(rem);
      /* Cento elision: drop final 'o' of hundreds-word when tail starts
         with 'o' or 'u' (cento+uno → centuno; cento+ottanta → centottanta;
         cinquecento+ottantatré → cinquecentottantatré). */
      var first = tail.charAt(0);
      if (first === 'o' || first === 'u') {
        hWord = hWord.slice(0, -1);
      }
      return hWord + tail;
    },
    fr: function (n, mode) {
      /* French 0-999. 0-99 BYTE-IDENTICAL to prior shipped (load-bearing
         for the LIVE 1.NBT.B.2 FR activity at /fr/activities/dizaines-
         et-unites; existing vigesimal 70s/80s/90s + "et un" at 21/31/…/
         71 + soixante-et-onze + quatre-vingts -s at exactly 80 logic
         preserved verbatim under `if (n < 100)` guard).

         100-999 NEW layer for 2.NBT.A.1 activity 2 FR fan-out — the
         TWO -s rules colliding:
         - n=100 → "cent" (bare, no multiplier, no -s)
         - n=200-900 round → multiplier + "cents" WITH -s (multiplied
           AND final): "deux cents", "cinq cents", "neuf cents"
         - n=201-999 non-final → multiplier + "cent" DROPS -s
           (multiplied but non-final): "deux cent quarante-sept",
           "trois cent cinq", "trois cent quatre-vingts" (cent drops;
           quatre-vingts keeps via sub99's own rule), "trois cent
           quatre-vingt-deux" (both drop)
         - "et" join preserved inside sub99 only (cent vingt et un = 121,
           deux cent soixante et onze = 271; NO "et" at 81/91 even in
           hundreds frame: quatre-vingt-un, quatre-vingt-onze) */
      var lookup = [
        'zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf',
        'dix','onze','douze','treize','quatorze','quinze','seize',
        'dix-sept','dix-huit','dix-neuf'
      ];
      var attrFem = ['zéro','une','deux','trois','quatre','cinq','six','sept','huit','neuf'];
      var tens20to60 = ['','','vingt','trente','quarante','cinquante','soixante'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive-fem') ? attrFem[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (t >= 2 && t <= 6) {
          /* 20-69 */
          if (o === 0) return tens20to60[t];
          if (o === 1) return tens20to60[t] + ' et un';
          return tens20to60[t] + '-' + lookup[o];
        }
        if (t === 7) {
          /* 70-79 = soixante + (10..19); "soixante et onze" at 71 */
          if (o === 0) return 'soixante-dix';
          if (o === 1) return 'soixante et onze';
          return 'soixante-' + lookup[10 + o];
        }
        if (t === 8) {
          /* 80 = "quatre-vingts" with -s; 81-89 = "quatre-vingt-" + ones (no -s, no "et") */
          if (o === 0) return 'quatre-vingts';
          return 'quatre-vingt-' + lookup[o];
        }
        /* t === 9: 90-99 = "quatre-vingt-" + (10..19), NO "et" */
        if (o === 0) return 'quatre-vingt-dix';
        return 'quatre-vingt-' + lookup[10 + o];
      }
      /* 100-999 layer */
      /* Inline sub99 for the tail — cardinal mode only. Replicates the
         0-99 logic above (no attributive-fem needed in compound
         position; gender-invariant cardinal). The vigesimal -s rule at
         exactly 80 emerges naturally: sub99(80)="quatre-vingts" with
         -s; sub99(82)="quatre-vingt-deux" without. This drives 380
         vs 382 distinction inside the hundreds frame. */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (t2 >= 2 && t2 <= 6) {
          if (o2 === 0) return tens20to60[t2];
          if (o2 === 1) return tens20to60[t2] + ' et un';
          return tens20to60[t2] + '-' + lookup[o2];
        }
        if (t2 === 7) {
          if (o2 === 0) return 'soixante-dix';
          if (o2 === 1) return 'soixante et onze';
          return 'soixante-' + lookup[10 + o2];
        }
        if (t2 === 8) {
          if (o2 === 0) return 'quatre-vingts';
          return 'quatre-vingt-' + lookup[o2];
        }
        if (o2 === 0) return 'quatre-vingt-dix';
        return 'quatre-vingt-' + lookup[10 + o2];
      }
      var hMul = ['','','deux','trois','quatre','cinq','six','sept','huit','neuf'];
      var h = Math.floor(n / 100), rem = n % 100;
      var hWord;
      if (h === 1) {
        hWord = 'cent';  // bare; no multiplier, no -s
      } else {
        /* h ≥ 2: multiplier + cent/cents. Rule: -s ONLY when rem === 0
           (multiplied AND final). Drop -s when rem > 0 (multiplied but
           non-final — tail follows). */
        hWord = hMul[h] + ' cent' + (rem === 0 ? 's' : '');
      }
      if (rem === 0) return hWord;
      return hWord + ' ' + sub99(rem);
    },
    pt: function (n, mode) {
      /* Brazilian Portuguese ('pt' canonical per CLAUDE.md §6; NEVER
         pt-BR). 0-99 BYTE-IDENTICAL to prior shipped (load-bearing for
         the LIVE 1.NBT.B.2 PT activity at /pt/activities/dezenas-e-
         unidades; existing BR forms preserved verbatim under `if (n <
         100)` guard: dezesseis/dezessete/dezenove + cinquenta/setenta
         + feminine duas at count=2).

         100-999 NEW layer for 2.NBT.A.1 activity 2 PT fan-out:
         - n=100 → "cem" (standalone)
         - n=101-199 → "cento e " + sub99(rem) (BR "e"-connector)
         - n=200-999 → hundreds[h] + (rem ? " e " + sub99(rem) : "")
         - hundreds[2..9] BR-canonical: duzentos, trezentos,
           quatrocentos, QUINHENTOS (irregular 500), seiscentos,
           SETECENTOS (irregular 700), oitocentos, NOVECENTOS
           (irregular 900) — distinct from ES doscientos/trescientos/
           cuatrocientos/quinientos/etc.
         - "e" appears BETWEEN hundreds and tail (BR-specific; ES omits
           "y" there): 305 = "trezentos e cinco". Internal "e" inside
           sub99 stays between tens and units. So 247 = "duzentos e
           quarenta e sete" (two "e"s). */
      var lookup = [
        'zero','um','dois','três','quatro','cinco','seis','sete','oito','nove',
        'dez','onze','doze','treze','quatorze','quinze',
        'dezesseis','dezessete','dezoito','dezenove'
      ];
      var attrFem = ['zero','uma','duas','três','quatro','cinco','seis','sete','oito','nove'];
      var tens = ['','','vinte','trinta','quarenta','cinquenta','sessenta','setenta','oitenta','noventa'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive-fem') ? attrFem[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        return tens[t] + ' e ' + lookup[o];  // e.g. quarenta e sete; setenta e dois
      }
      /* 100-999 layer */
      if (n === 100) return 'cem';
      var hundredsBare = ['','cento','duzentos','trezentos','quatrocentos','quinhentos','seiscentos','setecentos','oitocentos','novecentos'];
      var h = Math.floor(n / 100), rem = n % 100;
      var hPart = hundredsBare[h];
      if (rem === 0) return hPart;
      /* sub99 inline — cardinal-form tail; internal "e" between
         tens and units preserved (47 → "quarenta e sete"). */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        return tens[t2] + ' e ' + lookup[o2];
      }
      return hPart + ' e ' + sub99(rem);  // BR "e"-connector between hundreds and tail
    },
    nl: function (n, mode) {
      /* Dutch 0-999. 0-99 BYTE-IDENTICAL to prior shipped (load-bearing
         for the LIVE 1.NBT.B.2 NL activity at /nl/activities/tientallen-
         en-eenheden; existing units-first compound + trema "ën" at
         ones=2/3 + accented "één" at attributive 1 logic preserved
         verbatim under `if (n < 100)` guard).

         Standard Dutch. 0-12 direct lookup; 13-19 irregular teens with
         morphological stems (dertien/veertien). Tens 20-90 with irregular
         forms (dertig/veertig/tachtig). 20-99: units-first compound
         <onesForCompound> + connector + <tens-word> where connector is
         "ën" (TREMA) when ones is 2 or 3, else plain "en". The trema
         marks vowel-collision: twee+en→tweeën (two syllables); without
         trema "tweeen" could misread as a digraph.
         attributive: 1→"één" (with acute accents) to disambiguate from
         indefinite article "een" (which means "a/an"). K-1 readers benefit
         from the visual disambiguator before noun.

         100-999 NEW layer for 2.NBT.A.1 activity 2 NL fan-out:
         - n=100 → "honderd" (bare; K-1 classroom standard; "éénhonderd"
           is formal/archaic, not emitted)
         - n=101-199 → "honderd" + sub99(rem) (agglutinated; 101 →
           "honderdeen", 121 → "honderdeenentwintig", 122 →
           "honderdtweeëntwintig" with trema preserved)
         - n=200-999 → onesForCompound[h] + "honderd" + (rem ? sub99(rem) : "")
           — honderd INVARIANT (NEVER "honderden"). Examples:
             200 = tweehonderd
             247 = tweehonderdzevenenveertig
             305 = driehonderdvijf (zero-tens; NO "nul" inserted in cardinal)
             420 = vierhonderdtwintig (zero-ones; tens-only tail)
             583 = vijfhonderddrieëntachtig (trema at ones=3 preserved)
             906 = negenhonderdzes
             999 = negenhonderdnegenennegentig */
      var lookup = [
        'nul','een','twee','drie','vier','vijf','zes','zeven','acht','negen',
        'tien','elf','twaalf','dertien','veertien','vijftien','zestien',
        'zeventien','achttien','negentien'
      ];
      var attr = ['nul','één','twee','drie','vier','vijf','zes','zeven','acht','negen'];
      var tens = ['','','twintig','dertig','veertig','vijftig','zestig','zeventig','tachtig','negentig'];
      var onesForCompound = ['','een','twee','drie','vier','vijf','zes','zeven','acht','negen'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive') ? attr[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        var joinPart = (o === 2 || o === 3) ? 'ën' : 'en';  // trema when ones is 2 or 3
        return onesForCompound[o] + joinPart + tens[t];  // e.g. tweeëntwintig, zevenenveertig
      }
      /* 100-999 layer */
      /* sub99 inline — cardinal-form tail, units-first with trema preserved. */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        var joinPart2 = (o2 === 2 || o2 === 3) ? 'ën' : 'en';
        return onesForCompound[o2] + joinPart2 + tens[t2];
      }
      var h = Math.floor(n / 100), rem = n % 100;
      var hWord = (h === 1) ? 'honderd' : onesForCompound[h] + 'honderd';
      if (rem === 0) return hWord;
      return hWord + sub99(rem);  // agglutinated; no joiner
    },
    sv: function (n, mode) {
      /* Swedish 0-999. 0-99 BYTE-IDENTICAL to prior shipped (load-bearing
         for the LIVE 1.NBT.B.2 SV activity at /sv/activities/tiotal-och-
         ental; existing tens-first compound + irregular fyrtio/sjuttio +
         ett-at-1 logic preserved verbatim under `if (n < 100)` guard).

         Swedish. 0-19 lookup; 20-99 = tens-first concat (no space, no
         joiner). Tens-words have IRREGULAR forms (load-bearing):
           fyrtio (NOT fyratio — 40)
           sjuttio (NOT sjutio — 70)
         attributive: 1→"ett" (neuter form before neuter nouns tiotal/
         ental/hundratal). Cardinal[1] also "ett" (locked as Swedish K-1
         counting default; "en" is the common-gender variant, not
         emitted here).

         100-999 NEW layer for 2.NBT.A.1 activity 2 SV fan-out:
         - n=100 → "hundra" (bare; K-1 classroom standard; "etthundra"
           is formal/numerical, not emitted)
         - n=101-199 → "hundra" + sub99(rem) (agglutinated; 101 →
           "hundraett", 121 → "hundratjugoett", 147 → "hundrafyrtiosju")
         - n=200-999 → onesForCompound[h] + "hundra" + (rem ? sub99(rem) : "")
           — hundra INVARIANT (NEVER "hundror"). Examples:
             200 = tvåhundra
             247 = tvåhundrafyrtiosju (irregular fyrtio preserved)
             305 = trehundrafem (zero-tens; NO "noll" inserted in cardinal)
             420 = fyrahundratjugo (zero-ones; tens-only tail)
             583 = femhundraåttiotre (irregular åttio preserved)
             906 = niohundrasex
             999 = niohundranittionio */
      var lookup = [
        'noll','ett','två','tre','fyra','fem','sex','sju','åtta','nio',
        'tio','elva','tolv','tretton','fjorton','femton','sexton',
        'sjutton','arton','nitton'
      ];
      var attr = ['noll','ett','två','tre','fyra','fem','sex','sju','åtta','nio'];
      var tens = ['','','tjugo','trettio','fyrtio','femtio','sextio','sjuttio','åttio','nittio'];
      /* onesForCompound: ones-multiplier for hundreds layer. Swedish
         doesn't drop "ett" at sub-100 compound boundaries the way some
         Germanic locales do, but at n=100 standalone canonical Swedish
         emits bare "hundra" (not "etthundra"); so onesForCompound[1] is
         unused for hundreds construction (n=100 is handled by hWord
         shortcut). */
      var onesForCompound = ['','ett','två','tre','fyra','fem','sex','sju','åtta','nio'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive') ? attr[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        return tens[t] + lookup[o];  // e.g. fyrtiosju, sjuttiotvå, åttionio
      }
      /* 100-999 layer */
      /* sub99 inline — cardinal-form tail, tens-first agglutinated. */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        return tens[t2] + lookup[o2];
      }
      var h = Math.floor(n / 100), rem = n % 100;
      var hWord = (h === 1) ? 'hundra' : onesForCompound[h] + 'hundra';
      if (rem === 0) return hWord;
      return hWord + sub99(rem);  // agglutinated; no joiner
    },
    fi: function (n, mode) {
      /* Finnish 0-999 (Uralic; not Indo-European). 0-99 BYTE-IDENTICAL
         to prior shipped (load-bearing for the LIVE 1.NBT.B.2 FI
         activity at /fi/activities/kymmenet-ja-ykkoset; agglutinated
         tens-first compound + -toista teens + nolla-at-0 + kymmenen
         cardinal-10 logic preserved verbatim under `if (n < 100)`
         guard).

         Finnish. 0-19 lookup; 20-99 = AGGLUTINATED compound (tens-
         first, single word, no joiner, no space). Teens 11-19 use
         "-toista" suffix (yksitoista, kaksitoista, ...,
         yhdeksäntoista). Tens 20-90: Xkymmentä (kaksikymmentä 20, ...,
         yhdeksänkymmentä 90). Compound 21-99 is single agglutinated
         word: tens[t] + lookup[o] without space (neljäkymmentä-
         seitsemän 47, seitsemänkymmentäkaksi 72, kahdeksankymmentä-
         yhdeksän 89, yhdeksänkymmentäyhdeksän 99). Cardinal[10] =
         "kymmenen" — the genitive form of the noun "kymmen" functions
         as the standalone cardinal "10" in Finnish. Attributive mode:
         same as cardinal lookup for the number-word itself. Finnish
         has no gender — the number-word doesn't change form for
         attributive use. What CHANGES is the case of the COUNTED NOUN
         (nominative sg at 1, partitive sg at 0 or 2+) — that case-
         switch lives in speakDecomposition, not here.

         100-999 NEW layer for 2.NBT.A.1 activity 2 FI fan-out:
         - n=100 → "sata" (bare nominative; K-1 classroom standard;
           "yksisataa" with multiplier-1 is formal/redundant, not emitted)
         - n=101-199 → "sata" + sub99(rem) (agglutinated single word;
           101 → "satayksi", 110 → "satakymmenen", 147 →
           "sataneljäkymmentäseitsemän")
         - n=200-999 → onesForCompound[h] + "sataa" + (rem ? sub99(rem) : "")
           — multiplier governs partitive `sataa` inside cardinal
           (Finnish 2+ governs partitive). Agglutinated single word.
           Examples:
             200 = kaksisataa
             247 = kaksisataaneljäkymmentäseitsemän
             305 = kolmesataaviisi (zero-tens; NO "nolla" inserted)
             420 = neljäsataakaksikymmentä (zero-ones; tens-only tail)
             583 = viisisataakahdeksankymmentäkolme
             906 = yhdeksänsataakuusi
             999 = yhdeksänsataayhdeksänkymmentäyhdeksän */
      var lookup = [
        'nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän',
        'kymmenen','yksitoista','kaksitoista','kolmetoista','neljätoista','viisitoista','kuusitoista',
        'seitsemäntoista','kahdeksantoista','yhdeksäntoista'
      ];
      var attr = ['nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän'];
      var tens = ['','','kaksikymmentä','kolmekymmentä','neljäkymmentä','viisikymmentä','kuusikymmentä','seitsemänkymmentä','kahdeksankymmentä','yhdeksänkymmentä'];
      /* onesForCompound: ones-multiplier for hundreds layer. n=100 is
         bare "sata" (not "yksisataa"), so onesForCompound[1] is unused
         for hundreds construction (handled by hWord shortcut). For
         h=2..9, bare cardinal multiplier prepends to partitive "sataa". */
      var onesForCompound = ['','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive') ? attr[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        return tens[t] + lookup[o];  // agglutinated: neljäkymmentäseitsemän, kahdeksankymmentäyhdeksän
      }
      /* 100-999 layer */
      /* sub99 inline — cardinal-form tail, agglutinated tens-first; partitive `kymmentä` inside tens-word preserved. */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        return tens[t2] + lookup[o2];
      }
      var h = Math.floor(n / 100), rem = n % 100;
      var hWord = (h === 1) ? 'sata' : onesForCompound[h] + 'sataa';  // n=100 bare nominative; n=200+ multiplier+partitive
      if (rem === 0) return hWord;
      return hWord + sub99(rem);  // agglutinated single word (no joiner)
    },
    no: function (n, mode) {
      /* Norwegian Bokmål 0-999. 0-99 BYTE-IDENTICAL to prior shipped
         (load-bearing for the LIVE 1.NBT.B.2 NO activity at
         /no/activities/tiere-og-enere; modern post-1951 tens-first
         concat + irregular ø/å tens-words + acute én-at-1 + sju-
         preferred logic preserved verbatim under `if (n < 100)` guard).

         Norwegian Bokmål. 0-19 lookup; 20-99 = TENS-FIRST concat (no
         space, no joiner; modern post-1951 reform; mirrors SV pattern;
         OPPOSITE of DA's ones-first compound).
         Tens-words 20-90 IRREGULAR (load-bearing Norwegian-specific):
           tjue    (20; NOT pre-1951 "tyve" which is DA's form)
           tretti  (30; NOT pre-1951 "tredve")
           førti   (40; ø vowel — irregular)
           femti
           seksti
           sytti
           åtti    (80; å vowel — irregular)
           nitti
         "sju" preferred over "syv" per modern K-1 Bokmål convention.
         attributive: 1 → "én" with acute accent (K-1 emphatic form
         before noun, distinguishes from indefinite article "en").
         Cardinal[1] also "én". Compound examples: 21=tjueén,
         47=førtisju, 72=syttito, 89=åttini, 99=nittini.

         100-999 NEW layer for 2.NBT.A.1 activity 2 NO fan-out:
         - n=100 → "hundre" (bare; K-1 classroom standard; "etthundre"
           is formal/numerical, not emitted)
         - n=101-199 → "hundreog" + sub99(rem) (Bokmål agglutinated-with-
           og convention; 101 → "hundreogén", 147 → "hundreogførtisju")
         - n=200-999 → onesForCompound[h] + "hundre" + (rem ? "og" + sub99(rem) : "")
           — `hundre` is the cardinal hundreds-word, agglutinated to
           ones-multiplier (tohundre, trehundre, firehundre, ...,
           nihundre). NEVER pluralizes to "hundrer" inside cardinal
           (hundrer is the place-unit-noun singular reserved for column/
           decomp). Bokmål joins hundreds to tail with agglutinated "og"
           forming ONE orthographic word (DISTINCT from DA's spaced
           " og " convention). Examples:
             200 = tohundre
             247 = tohundreogførtisju (modern førti+sju tens-first)
             305 = trehundreogfem (zero-tens; "og"-join with bare-5)
             420 = firehundreogtjue (zero-ones; "og"-join with tens-only)
             583 = femhundreogåttitre (modern åtti=80, NOT DA firs)
             906 = nihundreogseks
             999 = nihundreognittini (modern nitti=90, NOT DA halvfems) */
      var lookup = [
        'null','én','to','tre','fire','fem','seks','sju','åtte','ni',
        'ti','elleve','tolv','tretten','fjorten','femten','seksten',
        'sytten','atten','nitten'
      ];
      var attr = ['null','én','to','tre','fire','fem','seks','sju','åtte','ni'];
      var tens = ['','','tjue','tretti','førti','femti','seksti','sytti','åtti','nitti'];
      /* onesForCompound: ones-multiplier for hundreds layer. n=100 is
         bare "hundre" (not "etthundre" — kid-natural K-1), so
         onesForCompound[1] is unused for hundreds construction
         (handled by hWord shortcut). */
      var onesForCompound = ['','én','to','tre','fire','fem','seks','sju','åtte','ni'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive') ? attr[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        return tens[t] + lookup[o];  // tens-first concat: førtisju, syttito, åttini
      }
      /* 100-999 layer */
      /* sub99 inline — cardinal-form tail, tens-first agglutinated; modern tens preserved. */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        return tens[t2] + lookup[o2];
      }
      var h = Math.floor(n / 100), rem = n % 100;
      var hWord = (h === 1) ? 'hundre' : onesForCompound[h] + 'hundre';
      if (rem === 0) return hWord;
      return hWord + 'og' + sub99(rem);  // agglutinated-with-og (single orthographic word per Bokmål convention)
    },
    da: function (n, mode) {
      /* Danish 0-999. 0-99 BYTE-IDENTICAL to prior shipped (load-bearing
         for the LIVE 1.NBT.B.2 DA activity at /da/activities/tiere-og-
         enere; vigesimal tens (halvtreds/tres/halvfjerds/firs/halvfems)
         + ones-first "og" compound + en-at-1 logic preserved verbatim
         under `if (n < 100)` guard. Strictest 0-99 preservation across
         the 11-locale set — DA has the most irregular sub-100 logic).

         Danish. 0-19 lookup; 20-99 = ONES-FIRST + "og" (and) + TENS-word
         compound (Germanic, like German "einundzwanzig").
         Tens-words 50/60/70/80/90 are VICESIMAL (base-20) — load-bearing
         irregulars rooted in Old Norse halv-tredje-sinds-tyve etc.:
           halvtreds (50 = 2.5 × 20)
           tres      (60 = 3   × 20)
           halvfjerds(70 = 3.5 × 20)
           firs      (80 = 4   × 20)
           halvfems  (90 = 4.5 × 20)
         Regular tens 20=tyve, 30=tredive, 40=fyrre.
         attributive: 1 → "en" (common-gender form before common-gender
         nouns tier / ener — both common gender, taking the "en" article).
         Cardinal[1] also "en" (locked as Danish K-1 default; "et" is the
         neuter variant, not emitted here for tier/ener). Compound
         examples: 21=enogtyve, 47=syvogfyrre, 50=halvtreds, 72=tooghalv-
         fjerds, 89=niogfirs, 90=halvfems, 99=niooghalvfems.

         100-999 NEW layer for 2.NBT.A.1 activity 2 DA fan-out:
         - n=100 → "hundrede" (bare; K-1 classroom standard; "ethundrede"
           is formal/numerical, not emitted)
         - n=101-199 → "hundrede og " + sub99(rem) (Danish "og"-join
           between hundreds-word and tail; 101 → "hundrede og en",
           147 → "hundrede og syvogfyrre" with vigesimal tens via sub99)
         - n=200-999 → onesForCompound[h] + "hundrede" + (rem ? " og " + sub99(rem) : "")
           — `hundrede` is the cardinal hundreds-word, agglutinated to
           ones-multiplier (tohundrede, trehundrede, firehundrede ...
           nihundrede). NEVER pluralizes to "hundreder" inside cardinal
           (hundreder is the place-unit-noun plural for column/decomp).
           DA joins hundreds to tail with explicit " og " (DISTINCT from
           DE's fully-agglutinated compound). Examples:
             200 = tohundrede
             247 = tohundrede og syvogfyrre
             305 = trehundrede og fem (zero-tens; bare-5 tail via "og")
             420 = firehundrede og tyve (zero-ones; tens-20 tail via "og")
             583 = femhundrede og treogfirs (VIGESIMAL firs=80 inside)
             906 = nihundrede og seks
             999 = nihundrede og niooghalvfems (VIGESIMAL halvfems=90) */
      var lookup = [
        'nul','en','to','tre','fire','fem','seks','syv','otte','ni',
        'ti','elleve','tolv','tretten','fjorten','femten','seksten',
        'sytten','atten','nitten'
      ];
      var attr = ['nul','en','to','tre','fire','fem','seks','syv','otte','ni'];
      var tens = ['','','tyve','tredive','fyrre','halvtreds','tres','halvfjerds','firs','halvfems'];
      /* onesForCompound: ones-multiplier for hundreds layer. n=100 is
         bare "hundrede" (not "ethundrede" — kid-natural K-1), so
         onesForCompound[1] is unused for hundreds construction (handled
         by hWord shortcut). */
      var onesForCompound = ['','en','to','tre','fire','fem','seks','syv','otte','ni'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive') ? attr[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        return lookup[o] + 'og' + tens[t];  // ones-first: syvogfyrre, niogfirs, tooghalvfjerds
      }
      /* 100-999 layer */
      /* sub99 inline — cardinal-form tail, ones-first; vigesimal tens preserved. */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        return lookup[o2] + 'og' + tens[t2];
      }
      var h = Math.floor(n / 100), rem = n % 100;
      var hWord = (h === 1) ? 'hundrede' : onesForCompound[h] + 'hundrede';
      if (rem === 0) return hWord;
      return hWord + ' og ' + sub99(rem);  // "og"-join between hundreds-word and tail
    }
  },

  /* =================================================================
     LIFECYCLE
     ================================================================= */
  init: function (api) {
    var self = this;
    this.api = api;
    injectOpenNumberLineCSS();
    document.body.classList.add('onl-wide');

    this.line = this.newLine(0);
    this._timers = [];
    this.gateOpen = false;
    this._drag = null;

    this._fetchEntitlement();
    this.render();
  },

  destroy: function () { this._clearTimers(); },

  _after: function (ms, fn) { var id = setTimeout(fn, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },

  _range: function () { return parseInt(this.api.settings.range, 10) || 100; },

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
          self.premium = !!(tier && tier !== 'free');
          if (self._wrap) self.render();
        })
        .catch(function () {});
    } catch (_) {}
  },

  _say: function (text) {
    if (!this.api.settings.voice || !text) return;
    try { LCSAudio.speak({ type: 'number', text: String(text), lang: this.api.lang }); } catch (_) {}
  },

  _speakLanding: function (v) {
    if (v < 0 || v > 999) { this._say(String(v)); return; }
    this._say(this.numberWord(v, this.api.lang));
  },

  /* value under a pointer x, the inverse of xOf */
  _valueAt: function (clientX, view) {
    var g = this.GEOM, r = this._svg.getBoundingClientRect();
    var vbx = ((clientX - r.left) / r.width) * g.W;
    var frac = (vbx - g.INSET) / (g.W - 2 * g.INSET);
    return view.min + frac * (view.max - view.min);
  },

  /* =================================================================
     RENDER
     ================================================================= */
  render: function () {
    var self = this, api = this.api;
    this._clearTimers();
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'onl-wrap');
    this._wrap = wrap;

    /* ---- the start chip: where this line begins ---- */
    var head = api.el('div', 'onl-head');
    var lbl = api.el('span', 'onl-startlbl'); lbl.textContent = api.t('startAt');
    head.appendChild(lbl);
    /* ⚠ DO NOT BUILD THE ACCESSIBLE NAME BY CONCATENATION. It used to be
       `t('startAt') + ' −10'`, which the Italian ensemble read back as
       "start from minus ten" — a state the engine actually forbids — and
       which breaks Finnish case-marking outright. Both caught it
       independently. The visible `startAt` text labels the group; each
       button's name is just its signed step, which every screen reader
       says as "minus ten" / "plus ten" in any language and cannot be
       ungrammatical because it is not prose. */
    var mk = function (delta, fn) {
      var b = api.el('button', 'onl-step'); b.type = 'button';
      var sign = self.label(delta);
      b.textContent = delta < 0 ? '−' : '+';
      b.setAttribute('aria-label', sign);
      b.title = sign;
      b.addEventListener('click', fn); return b;
    };
    var step = this.friendlyStep(this._range());
    head.appendChild(mk(-step, function () { self._setStart(self.line.start - step); }));
    var sv = api.el('span', 'onl-startval'); sv.textContent = String(this.line.start);
    sv.setAttribute('aria-live', 'polite');
    head.appendChild(sv);
    head.appendChild(mk(step, function () { self._setStart(self.line.start + step); }));
    wrap.appendChild(head);

    wrap.appendChild(this._buildLine());

    /* ---- controls. No Check. There is nothing to check. ---- */
    var row = api.el('div', 'onl-controls');
    var undo = api.el('button', 'onl-linkbtn'); undo.type = 'button';
    undo.textContent = api.t('undoBtn');
    undo.disabled = !this.line.deltas.length;
    undo.addEventListener('click', function () { self.line = self.undoJump(self.line); self.render(); });
    row.appendChild(undo);

    var clear = api.el('button', 'onl-linkbtn'); clear.type = 'button';
    clear.textContent = api.t('clearBtn');
    clear.addEventListener('click', function () { self.line = self.newLine(self.line.start); self.render(); });
    row.appendChild(clear);

    if (this.premium) {
      var rep = api.el('button', 'onl-go'); rep.type = 'button';
      rep.textContent = api.t('replayBtn');
      rep.disabled = !this.line.deltas.length;
      rep.addEventListener('click', function () { self._replay(); });
      row.appendChild(rep);

      var pr = api.el('button', 'onl-linkbtn'); pr.type = 'button';
      pr.textContent = api.t('printBtn');
      pr.addEventListener('click', function () { try { window.print(); } catch (_) {} });
      row.appendChild(pr);
    } else {
      var lock = api.el('button', 'onl-linkbtn onl-locked'); lock.type = 'button';
      lock.textContent = api.t('replayBtn');
      lock.addEventListener('click', function () { self.gateOpen = true; self.render(); });
      row.appendChild(lock);
    }
    wrap.appendChild(row);

    /* ---- the hint line. Progress, never a grade. ---- */
    var hint = api.el('p', 'onl-hint');
    if (!this.line.deltas.length) {
      hint.textContent = api.t('dragHint');
    } else {
      var bits = [this.fmt('nowAt', { n: this.landing(this.line) }),
                  this.fmt('jumpsSoFar', { n: this.line.deltas.length })];
      /* with one jump the total IS the jump, so saying it twice is noise */
      if (this.line.deltas.length > 1) bits.push(this.fmt('totalSoFar', { n: this.label(this.totalJumped(this.line)) }));
      hint.textContent = bits.join(' · ');
    }
    wrap.appendChild(hint);

    if (this.gateOpen) wrap.appendChild(this._buildGate());
    api.stage.appendChild(wrap);
  },

  _setStart: function (v) {
    var max = this._range();
    if (v < 0) v = 0;
    if (v > max) v = max;
    this.line = this.newLine(v);
    this.render();
  },

  /* ---- the empty line + every arc the child has drawn ---- */
  _buildLine: function () {
    var self = this, api = this.api, g = this.GEOM;
    var box = api.el('div', 'onl-sheet');
    var NS = 'http://www.w3.org/2000/svg';
    var view = this.viewFor(this.line, this._range());
    this._view = view;

    var crop = this.cropFor(this.line, view);
    this._crop = crop;
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 ' + crop.y + ' ' + g.W + ' ' + crop.h);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('class', 'onl-svg');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', this.fmt('nowAt', { n: this.landing(this.line) }));

    /* THE EMPTY LINE — an axis and two end caps. No ticks: the child's
       own landings are the only marks that ever appear. */
    var axis = document.createElementNS(NS, 'line');
    axis.setAttribute('x1', String(g.INSET - 18)); axis.setAttribute('x2', String(g.W - g.INSET + 18));
    axis.setAttribute('y1', String(g.AXIS_Y)); axis.setAttribute('y2', String(g.AXIS_Y));
    axis.setAttribute('class', 'onl-axis');
    svg.appendChild(axis);
    /* An open line has to look open. Terminating flat read as a finite
       segment, which quietly contradicts the whole premise — the child
       could not tell whether there was room to the right. */
    var tipX = g.W - g.INSET + 18, tip = document.createElementNS(NS, 'path');
    tip.setAttribute('d', 'M' + (tipX - 16) + ' ' + (g.AXIS_Y - 11) + ' L' + tipX + ' ' + g.AXIS_Y +
                          ' L' + (tipX - 16) + ' ' + (g.AXIS_Y + 11));
    tip.setAttribute('class', 'onl-tip');
    svg.appendChild(tip);

    var ls = this.landings(this.line), i;

    /* the arcs, oldest first, plus the notation that writes itself */
    for (i = 0; i < this.line.deltas.length; i++) {
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('d', this.arcPath(ls[i], ls[i + 1], view));
      p.setAttribute('class', 'onl-arc');
      p.setAttribute('data-jump', String(i));
      svg.appendChild(p);

      var ap = this.arcApex(ls[i], ls[i + 1], view);
      var tx = document.createElementNS(NS, 'text');
      tx.setAttribute('x', ap.x.toFixed(1)); tx.setAttribute('y', (ap.y - 10).toFixed(1));
      tx.setAttribute('text-anchor', 'middle');
      tx.setAttribute('class', 'onl-note');
      tx.textContent = this.label(this.line.deltas[i]);
      svg.appendChild(tx);
    }

    /* the live preview while a finger is down */
    this._preview = document.createElementNS(NS, 'path');
    this._preview.setAttribute('class', 'onl-arc onl-arc-live');
    svg.appendChild(this._preview);

    /* LANDMARKS — the numbers the child actually landed on. These are
       not ticks: nothing is drawn where the child has not been. */
    for (i = 0; i < ls.length; i++) {
      var x = this.xOf(ls[i], view);
      var m = document.createElementNS(NS, 'line');
      m.setAttribute('x1', x.toFixed(1)); m.setAttribute('x2', x.toFixed(1));
      m.setAttribute('y1', String(g.AXIS_Y - 12)); m.setAttribute('y2', String(g.AXIS_Y + 12));
      m.setAttribute('class', 'onl-mark' + (i === ls.length - 1 ? ' onl-mark-here' : ''));
      svg.appendChild(m);

      var t2 = document.createElementNS(NS, 'text');
      t2.setAttribute('x', x.toFixed(1)); t2.setAttribute('y', String(g.AXIS_Y + 86));
      t2.setAttribute('text-anchor', 'middle');
      t2.setAttribute('class', 'onl-num' + (i === ls.length - 1 ? ' onl-num-here' : ''));
      t2.textContent = String(ls[i]);
      svg.appendChild(t2);
    }

    this._svg = svg;
    box.appendChild(svg);

    /* the marker is a real focusable button so the whole tool works from
       a keyboard, not only from a finger */
    var here = this.landing(this.line);
    var mkr = api.el('button', 'onl-marker'); mkr.type = 'button';
    mkr.setAttribute('aria-label', this.fmt('nowAt', { n: here }));
    mkr.style.left = ((this.xOf(here, view) / g.W) * 100).toFixed(2) + '%';
    mkr.style.top = (((g.AXIS_Y - crop.y) / crop.h) * 100).toFixed(2) + '%';
    this._marker = mkr;
    box.appendChild(mkr);

    this._wireDrag(box, mkr);
    return box;
  },

  /* ---- drawing a jump ---- */
  _wireDrag: function (box, mkr) {
    var self = this;
    var begin = function (ev) {
      if (ev.button !== undefined && ev.button !== 0) return;
      ev.preventDefault();
      self._drag = { from: self.landing(self.line), to: self.landing(self.line) };
      try { mkr.setPointerCapture(ev.pointerId); } catch (_) {}
    };
    var move = function (ev) {
      if (!self._drag) return;
      var raw = self._valueAt(ev.clientX, self._view);
      var to = self.snapFrom(self._drag.from, raw, self._range(), !!self.api.settings.snap);
      if (to < 0) to = 0;
      self._drag.to = to;
      if (self._preview) self._preview.setAttribute('d', self.arcPath(self._drag.from, to, self._view));
      if (self._marker) self._marker.style.left = ((self.xOf(to, self._view) / self.GEOM.W) * 100).toFixed(2) + '%';
    };
    var end = function (ev) {
      if (!self._drag) return;
      var d = self._drag; self._drag = null;
      try { mkr.releasePointerCapture(ev.pointerId); } catch (_) {}
      var delta = d.to - d.from;
      if (!delta) { self.render(); return; }        /* no jump, no fuss */
      self.line = self.addJump(self.line, delta);
      self._speakLanding(self.landing(self.line));
      try { self.api.sound(660); } catch (_) {}
      self.render();
    };
    mkr.addEventListener('dragstart', function (e) { e.preventDefault(); });
    mkr.addEventListener('pointerdown', begin);
    mkr.addEventListener('pointermove', move);
    mkr.addEventListener('pointerup', end);
    mkr.addEventListener('pointercancel', end);
    /* keyboard parity — a jump of one friendly step either way */
    mkr.addEventListener('keydown', function (e) {
      var s = self.friendlyStep(self._range());
      if (e.key === 'ArrowRight') { e.preventDefault(); self._jumpBy(s); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); self._jumpBy(-s); }
    });
  },

  _jumpBy: function (delta) {
    var to = this.landing(this.line) + delta;
    if (to < 0) return;
    this.line = this.addJump(this.line, delta);
    this._speakLanding(this.landing(this.line));
    try { this.api.sound(660); } catch (_) {}
    this.render();
  },

  /* ---- replay: the child narrates their own thinking ---- */
  _replay: function () {
    var self = this, ls = this.landings(this.line);
    if (!this._svg || ls.length < 2) return;
    this._clearTimers();
    var arcs = this._svg.querySelectorAll('.onl-arc:not(.onl-arc-live)');
    var notes = this._svg.querySelectorAll('.onl-note');
    var i;
    for (i = 0; i < arcs.length; i++) { arcs[i].classList.add('onl-dim'); }
    for (i = 0; i < notes.length; i++) { notes[i].classList.add('onl-dim'); }
    ls.slice(1).forEach(function (landV, k) {
      self._after(k * 900, function () {
        if (arcs[k]) arcs[k].classList.remove('onl-dim');
        if (notes[k]) notes[k].classList.remove('onl-dim');
        if (self._marker) self._marker.style.left = ((self.xOf(landV, self._view) / self.GEOM.W) * 100).toFixed(2) + '%';
        self._speakLanding(landV);
      });
    });
  },

  _buildGate: function () {
    var self = this, api = this.api;
    var scrim = api.el('div', 'onl-scrim');
    scrim.addEventListener('click', function (e) { if (e.target === scrim) { self.gateOpen = false; self.render(); } });
    var g = api.el('div', 'onl-gate');
    var p = api.el('p', 'onl-gate-line'); p.textContent = api.t('gatePremium');
    g.appendChild(p);
    var a = api.el('a', 'onl-gate-cta');
    a.href = '/' + api.lang + '/pricing?from=tool-open-number-line';
    a.target = '_top'; a.textContent = api.t('unlock');
    g.appendChild(a);
    var c = api.el('button', 'onl-gate-close'); c.type = 'button';
    c.textContent = api.t('gateClose');
    c.addEventListener('click', function () { self.gateOpen = false; self.render(); });
    g.appendChild(c);
    scrim.appendChild(g);
    return scrim;
  },

  reset: function () {
    this.line = this.newLine(0);
    if (this._wrap) this.render();
  },
  onSettings: function () { if (this._wrap) this.render(); }
};

function injectOpenNumberLineCSS() {
  if (document.getElementById('onl-style')) return;
  var st = document.createElement('style');
  st.id = 'onl-style';
  st.textContent = ''
    + '.onl-wrap{display:flex;flex-direction:column;gap:14px;align-items:center;width:100%;}'
    + '.onl-head{display:flex;align-items:center;gap:10px;flex-wrap:nowrap;}'
    + '.onl-startlbl{font:600 15px/1 Nunito,system-ui,sans-serif;color:#146B5E;}'
    + '.onl-startval{font:800 24px/1 "Baloo 2",Nunito,system-ui,sans-serif;color:#146B5E;min-width:2.4em;text-align:center;}'
    + '.onl-step{min-width:44px;min-height:44px;border-radius:14px;border:2px solid rgba(20,107,94,.35);'
    +   'background:#FFFDF7;color:#146B5E;font:700 20px/1 Nunito,system-ui,sans-serif;}'
    /* ⚠ ONE COORDINATE SYSTEM. The marker is an HTML button overlaid on the
       SVG, so its containing block must be EXACTLY the SVG box — any padding
       here and the marker drifts off the landing it is supposed to sit on
       (measured: 6px of padding was enough to make a drag land a whole
       friendly-step short). Visual inset belongs on the wrapper, never
       between these two. The harness asserts the marker is centred on the
       landing so this cannot come back silently. */
    + '.onl-sheet{position:relative;width:100%;max-width:860px;background:#FFFDF7;border-radius:18px;'
    +   'border:1.5px solid rgba(20,107,94,.14);padding:0;box-sizing:border-box;overflow:hidden;}'
    + '.onl-svg{display:block;width:100%;height:auto;touch-action:none;}'
    + '.onl-axis{stroke:rgba(20,107,94,.55);stroke-width:3;stroke-linecap:round;}'
    + '.onl-tip{fill:none;stroke:rgba(20,107,94,.55);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;}'
    + '.onl-arc{fill:none;stroke:#F2784B;stroke-width:5;stroke-linecap:round;}'
    + '.onl-arc-live{stroke:#F2A65A;stroke-dasharray:10 8;}'
    /* ⚠ THESE SIZES ARE IN viewBox UNITS, NOT PIXELS. Text inside an SVG
       scales with the box, so a 30-unit glyph renders ~10px on a 340px-wide
       phone sheet while every HTML label beside it stays 15px — the number
       line was the only thing that shrank, which is exactly the "tiny"
       class. Sized so the narrowest sheet still clears the 14px floor;
       the harness measures the rendered px at 320/360 so it cannot regress. */
    + '.onl-note{fill:#F2784B;font:700 42px/1 "Baloo 2",Nunito,system-ui,sans-serif;}'
    + '.onl-mark{stroke:rgba(20,107,94,.45);stroke-width:3;stroke-linecap:round;}'
    + '.onl-mark-here{stroke:#146B5E;stroke-width:4.5;}'
    + '.onl-num{fill:rgba(20,107,94,.7);font:600 40px/1 Nunito,system-ui,sans-serif;}'
    + '.onl-num-here{fill:#146B5E;font-weight:800;}'
    + '.onl-dim{opacity:.12;}'
    /* ⚠ 44px HIT AREA, smaller DISC. The tap gate needs 44; a 44px disc
       centred on the axis covered the very number the child had just
       landed on — the one thing they most need to read. */
    + '.onl-marker{position:absolute;transform:translate(-50%,-50%);width:44px;height:44px;'
    +   'border-radius:50%;border:0;background:none;padding:0;touch-action:none;cursor:grab;'
    +   'display:flex;align-items:center;justify-content:center;}'
    /* ⚠ The disc is FIXED px while the landing label lives in viewBox units
       and shrinks with the sheet, so on a phone the label climbs toward a
       disc that never moves. Trim the disc there as well as pushing the
       label down; the 44px hit target is untouched either way. */
    + '@media (max-width:480px){.onl-marker::after{width:20px;height:20px;}}'
    + '.onl-marker::after{content:"";width:26px;height:26px;border-radius:50%;'
    +   'background:#2FA56A;border:3px solid #FFFDF7;box-shadow:0 2px 5px rgba(0,0,0,.2);}'
    + '.onl-marker:active{cursor:grabbing;}'
    + '.onl-controls{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;}'
    + '.onl-go,.onl-linkbtn{min-height:44px;padding:0 18px;border-radius:999px;'
    +   'font:700 15px/1 Nunito,system-ui,sans-serif;}'
    + '.onl-go{background:#F2784B;color:#fff;border:0;}'
    + '.onl-linkbtn{background:#FFFDF7;color:#146B5E;border:2px solid rgba(20,107,94,.3);}'
    + '.onl-linkbtn[disabled]{opacity:.45;}'
    /* ⚠ A gated control read as a BROKEN one: it carried the same pale
       treatment as the genuinely-disabled Undo sitting next to it, so a
       teacher saw "that button doesn't work" rather than "that's the paid
       one". Full opacity, a coral edge that marks it as premium, and a
       lock glyph so the state is stated rather than implied. */
    + '.onl-locked{opacity:1;border-color:rgba(242,120,75,.55);color:#C2562F;}'
    + '.onl-locked::before{content:"";display:inline-block;width:11px;height:13px;margin-right:7px;'
    +   'vertical-align:-1px;border:2px solid currentColor;border-radius:2px;border-top-width:6px;'
    +   'border-top-left-radius:7px;border-top-right-radius:7px;box-sizing:border-box;}'
    + '.onl-hint{margin:0;text-align:center;font:600 16px/1.4 Nunito,system-ui,sans-serif;color:#146B5E;}'
    + '.onl-scrim{position:fixed;inset:0;background:rgba(20,107,94,.35);display:flex;align-items:center;'
    +   'justify-content:center;z-index:70;padding:20px;}'
    + '.onl-gate{background:#FBF3E4;border-radius:20px;padding:22px;max-width:420px;text-align:center;z-index:71;}'
    + '.onl-gate-line{margin:0 0 16px;font:600 16px/1.45 Nunito,system-ui,sans-serif;color:#146B5E;}'
    + '.onl-gate-cta{display:inline-block;min-height:44px;line-height:44px;padding:0 22px;border-radius:999px;'
    +   'background:#F2784B;color:#fff;font:700 15px/44px Nunito,system-ui,sans-serif;text-decoration:none;}'
    + '.onl-gate-close{display:block;margin:12px auto 0;min-height:44px;background:none;border:0;'
    +   'color:#146B5E;font:600 14px/1 Nunito,system-ui,sans-serif;text-decoration:underline;}'
    + '@media (max-width:560px){body.onl-wide{overflow-y:auto;}}'
    + '@media (max-width:480px){body.onl-wide .lcs-header{flex-direction:column;align-items:flex-start;gap:8px;}}'
    + '@media (prefers-reduced-motion:reduce){.onl-dim{transition:none;}}'
    + '@media print{'
    +   '.onl-controls,.onl-scrim,.onl-head{display:none !important;}'
    +   '.onl-sheet{border:1.5pt solid #666;page-break-inside:avoid;}'
    +   '.onl-axis{stroke:rgba(0,0,0,.55);}'
    +   '.onl-arc{stroke:rgba(0,0,0,.6);}'
    +   '.onl-note{fill:rgba(0,0,0,.75);}'
    +   '.onl-mark{stroke:rgba(0,0,0,.45);}.onl-mark-here{stroke:rgba(0,0,0,.7);}'
    +   '.onl-num{fill:rgba(0,0,0,.7);}'
    + '}';
  document.head.appendChild(st);
}
