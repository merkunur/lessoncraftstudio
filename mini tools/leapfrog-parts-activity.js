/* =====================================================================
   leapfrog-parts-activity.js — ACTIVITY #135 of the one-by-one rebuild:
   "Add It Both Ways" → THE LEAPFROG PARTS (1.OA.B.3; all 11 locales).
   Model: leapfrog-parts-core.js (LeapfrogPartsCore).
   Design: docs/activities-rebuild/designs/135-match-pairs.md
   ---------------------------------------------------------------------
   The invention: the two numbers on every card are blocks of snap-cubes.
   The child taps a card (it lifts — nothing changes yet), then the card
   they PREDICT is its twin: the lifted card's blocks leapfrog over the
   "+" (4 + 7 → 7 + 4, the total bar never changes length) and it is laid
   on the chosen card. Twins fit cube on cube and fuse into a twin plate;
   an impostor with the same total shows the cube where the colours
   disagree. Take-away cards swap their parts across the "="; tap the "−"
   and the whole bounces back — it never jumps over its own part.
   No timer, no score.
   Test seams: window.LeapfrogPartsActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._pick / ._minus /
   ._unmatch / .FAST / .OK_MS.
   ===================================================================== */
var LeapfrogPartsActivity = {
  id: 'leapfrog-parts',
  /* the drawn apparatus (the hierarchy gate): the cards with their cube blocks, the twin shelf */
  apparatusClasses: ['lp-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {en:"Add It Both Ways",de:"Beide Wege rechnen",fr:"Dans les deux sens",es:"Suma de las dos maneras",pt:"Some de duas maneiras",it:"Nei due ordini",nl:"Op twee manieren",sv:"Lägg ihop på två sätt",da:"Begge veje",no:"Begge veier",fi:"Kumpaankin suuntaan"},
    instruction: {en:"Tap a card, then tap the card you think is its twin. On the way, its two numbers leapfrog and swap places: twins fit cube on cube.",de:"Tippe eine Karte an und dann die Karte, die du für ihren Zwilling hältst. Unterwegs machen die zwei Zahlen Bockspringen und tauschen die Plätze: Zwillinge passen Würfel auf Würfel.",fr:"Touche une carte, puis la carte qui est sa jumelle, à ton avis. En chemin, ses deux nombres jouent à saute-mouton et changent de place : les jumelles s’emboîtent cube sur cube.",es:"Toca una tarjeta y luego la tarjeta que crees que es su gemela. En el camino, sus dos números juegan a brincar el burro y cambian de lugar: las gemelas coinciden cubo con cubo.",pt:"Toque em um cartão e depois no cartão que você acha que é o gêmeo dele. No caminho, os dois números brincam de pular carniça e trocam de lugar: gêmeos se encaixam cubo com cubo.",it:"Tocca una carta, poi la carta che secondo te è la sua gemella. Durante il viaggio i suoi due numeri giocano alla cavallina e si scambiano di posto: le gemelle combaciano cubo su cubo.",nl:"Tik op een kaart en dan op de kaart die volgens jou zijn tweelingkaart is. Onderweg spelen de twee getallen haasje-over en ruilen ze van plaats: tweelingkaarten passen blokje op blokje.",sv:"Tryck på ett kort och sedan på kortet du tror är dess tvilling. På vägen hoppar de två talen bock över varandra och byter plats: tvillingar passar kub på kub.",da:"Tryk på et kort og så på det kort, du tror er dets tvilling. På vejen springer de to tal buk over hinanden og bytter plads: tvillinger passer terning på terning.",no:"Trykk på et kort og så på kortet du tror er tvillingen. På veien hopper de to tallene bukk over hverandre og bytter plass: tvillinger passer kube på kube.",fi:"Napauta korttia ja sitten korttia, jonka arvelet olevan sen kaksonen. Matkalla sen kaksi lukua hyppäävät pukkia ja vaihtavat paikkaa: kaksoset sopivat kuutio kuution päälle."},
    instrBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    tAdd: {en:"Find the twin that adds the same numbers the other way.",de:"Finde den Zwilling, der dieselben Zahlen andersherum addiert.",fr:"Trouve la jumelle qui additionne les mêmes nombres dans l’autre sens.",es:"Encuentra la gemela que suma los mismos números al revés.",pt:"Encontre o gêmeo que soma os mesmos números ao contrário.",it:"Trova la gemella che somma gli stessi numeri al contrario.",nl:"Zoek de tweelingkaart die dezelfde getallen andersom optelt.",sv:"Hitta tvillingen som lägger ihop samma tal åt andra hållet.",da:"Find tvillingen, der lægger de samme tal sammen den anden vej.",no:"Finn tvillingen som legger sammen de samme tallene andre veien.",fi:"Etsi kaksonen, jossa samat luvut lasketaan yhteen toisin päin."},
    tTake: {en:"Find the twin that takes away the other part.",de:"Finde den Zwilling, der den anderen Teil wegnimmt.",fr:"Trouve la jumelle qui enlève l’autre partie.",es:"Encuentra la gemela que quita la otra parte.",pt:"Encontre o gêmeo que tira a outra parte.",it:"Trova la gemella che toglie l’altra parte.",nl:"Zoek de tweelingkaart die het andere deel weghaalt.",sv:"Hitta tvillingen som tar bort den andra delen.",da:"Find tvillingen, der tager den anden del væk.",no:"Finn tvillingen som tar bort den andre delen.",fi:"Etsi kaksonen, josta otetaan pois toinen osa."},
    setNum: {en:"Numbers",de:"Zahlen",fr:"Nombres",es:"Números",pt:"Números",it:"Numeri",nl:"Getallen",sv:"Tal",da:"Tal",no:"Tall",fi:"Luvut"},
    n10: {en:"To 10",de:"Bis 10",fr:"Jusqu’à 10",es:"Hasta 10",pt:"Até 10",it:"Fino a 10",nl:"Tot 10",sv:"Upp till 10",da:"Op til 10",no:"Opp til 10",fi:"10:een asti"},
    n20: {en:"To 20",de:"Bis 20",fr:"Jusqu’à 20",es:"Hasta 20",pt:"Até 20",it:"Fino a 20",nl:"Tot 20",sv:"Upp till 20",da:"Op til 20",no:"Opp til 20",fi:"20:een asti"},
    setCards: {en:"Cards",de:"Karten",fr:"Cartes",es:"Tarjetas",pt:"Cartões",it:"Carte",nl:"Kaarten",sv:"Kort",da:"Kort",no:"Kort",fi:"Kortit"},
    cAdd: {en:"Turnarounds",de:"Tauschaufgaben",fr:"Additions retournées",es:"Sumas al revés",pt:"Somas ao contrário",it:"Somme al contrario",nl:"Wisselsommen",sv:"Byta ordning",da:"Byttestykker",no:"Byttestykker",fi:"Vaihdetut yhteenlaskut"},
    cTake: {en:"Take-away twins",de:"Minus-Zwillinge",fr:"Jumelles de soustraction",es:"Gemelas de resta",pt:"Gêmeos de subtração",it:"Gemelle di sottrazione",nl:"Min-tweelingen",sv:"Minus-tvillingar",da:"Minus-tvillinger",no:"Minus-tvillinger",fi:"Vähennyskaksoset"},
    cMix: {en:"Mixed",de:"Gemischt",fr:"Mélangées",es:"Mezcladas",pt:"Misturados",it:"Mescolate",nl:"Gemengd",sv:"Blandat",da:"Blandet",no:"Blandet",fi:"Sekaisin"},
    missSame: {en:"Same total, but not the same numbers.",de:"Gleiches Ergebnis, aber nicht dieselben Zahlen.",fr:"Même total, mais pas les mêmes nombres.",es:"El mismo total, pero no los mismos números.",pt:"O mesmo total, mas não os mesmos números.",it:"Stesso totale, ma non gli stessi numeri.",nl:"Zelfde uitkomst, maar niet dezelfde getallen.",sv:"Samma summa, men inte samma tal.",da:"Samme resultat, men ikke de samme tal.",no:"Samme sum, men ikke de samme tallene.",fi:"Sama summa, mutta eri luvut."},
    missTotal: {en:"Not the same total: one row sticks out.",de:"Nicht dasselbe Ergebnis: Eine Reihe ragt heraus.",fr:"Pas le même total : une rangée dépasse.",es:"No es el mismo total: una fila sobresale.",pt:"Não é o mesmo total: uma fileira fica para fora.",it:"Non è lo stesso totale: una fila sporge.",nl:"Niet dezelfde uitkomst: één rij steekt uit.",sv:"Inte samma summa: en rad sticker ut.",da:"Ikke samme resultat: en række stikker ud.",no:"Ikke samme sum: en rad stikker ut.",fi:"Ei sama summa: yksi rivi jää yli."},
    missHelp: {en:"Find the card that looks exactly like this one now.",de:"Finde die Karte, die jetzt genau so aussieht wie diese.",fr:"Trouve la carte qui ressemble exactement à celle-ci maintenant.",es:"Encuentra la tarjeta que ahora se ve igualita a esta.",pt:"Encontre o cartão que agora está igualzinho a este.",it:"Trova la carta che ora è identica a questa.",nl:"Zoek de kaart die er nu precies zo uitziet als deze.",sv:"Hitta kortet som nu ser precis ut som det här.",da:"Find det kort, der nu ser præcis ud som dette.",no:"Finn kortet som nå ser akkurat ut som dette.",fi:"Etsi kortti, joka näyttää nyt täsmälleen tältä."},
    hintMinus: {en:"The whole can't jump over its own part. Only the two parts trade places.",de:"Das Ganze kann nicht über seinen eigenen Teil springen. Nur die zwei Teile tauschen.",fr:"Le tout ne peut pas sauter par-dessus sa propre partie. Seules les deux parties changent de place.",es:"El total no puede saltar sobre su propia parte. Solo las dos partes cambian de lugar.",pt:"O todo não pode pular por cima da própria parte. Só as duas partes trocam de lugar.",it:"Il tutto non può saltare sopra la sua parte. Solo le due parti si scambiano di posto.",nl:"Het geheel kan niet over zijn eigen deel springen. Alleen de twee delen ruilen.",sv:"Helheten kan inte hoppa över sin egen del. Bara de två delarna byter plats.",da:"Helheden kan ikke springe over sin egen del. Kun de to dele bytter plads.",no:"Helheten kan ikke hoppe over sin egen del. Bare de to delene bytter plass.",fi:"Kokonaisuus ei voi hypätä oman osansa yli. Vain kaksi osaa vaihtavat paikkaa."},
    okAdd: {en:"{a} + {b} = {b} + {a}. The parts swapped, still {s}!",de:"{a} + {b} = {b} + {a}. Die Teile haben getauscht, immer noch {s}!",fr:"{a} + {b} = {b} + {a}. Les parties ont changé de place, toujours {s} !",es:"{a} + {b} = {b} + {a}. Las partes cambiaron de lugar, ¡sigue siendo {s}!",pt:"{a} + {b} = {b} + {a}. As partes trocaram de lugar, continua {s}!",it:"{a} + {b} = {b} + {a}. Le parti si sono scambiate, è sempre {s}!",nl:"{a} + {b} = {b} + {a}. De delen ruilden van plaats, nog steeds {s}!",sv:"{a} + {b} = {b} + {a}. Delarna bytte plats, fortfarande {s}!",da:"{a} + {b} = {b} + {a}. Delene byttede plads, stadig {s}!",no:"{a} + {b} = {b} + {a}. Delene byttet plass, fortsatt {s}!",fi:"{a} + {b} = {b} + {a}. Osat vaihtoivat paikkaa, yhä {s}!"},
    okTake: {en:"{w} − {a} = {b} and {w} − {b} = {a}: the parts swapped, the {w} stayed.",de:"{w} − {a} = {b} und {w} − {b} = {a}: Die Teile haben getauscht, die {w} ist geblieben.",fr:"{w} − {a} = {b} et {w} − {b} = {a} : les parties ont changé de place, le {w} est resté.",es:"{w} − {a} = {b} y {w} − {b} = {a}: las partes cambiaron de lugar, el {w} se quedó en su lugar.",pt:"{w} − {a} = {b} e {w} − {b} = {a}: as partes trocaram de lugar, o {w} ficou no lugar.",it:"{w} − {a} = {b} e {w} − {b} = {a}: le parti si sono scambiate, il numero {w} è rimasto al suo posto.",nl:"{w} − {a} = {b} en {w} − {b} = {a}: de delen ruilden, de {w} bleef staan.",sv:"{w} − {a} = {b} och {w} − {b} = {a}: delarna bytte plats, {w} stod kvar.",da:"{w} − {a} = {b} og {w} − {b} = {a}: delene byttede plads, {w} blev stående.",no:"{w} − {a} = {b} og {w} − {b} = {a}: delene byttet plass, {w} ble stående.",fi:"{w} − {a} = {b} ja {w} − {b} = {a}: osat vaihtoivat paikkaa, {w} pysyi paikallaan."},
    okRound: {en:"Three twins! Add both ways: the total stays the same.",de:"Drei Zwillinge! Rechne in beide Richtungen: Das Ergebnis bleibt gleich.",fr:"Trois jumelles ! Additionne dans les deux sens : le total reste le même.",es:"¡Tres gemelas! Suma de las dos maneras: el total sigue igual.",pt:"Três gêmeos! Some dos dois jeitos: o total continua o mesmo.",it:"Tre gemelle! Somma nei due ordini: il totale resta uguale.",nl:"Drie tweelingen! Tel op twee manieren op: de uitkomst blijft hetzelfde.",sv:"Tre tvillingar! Lägg ihop åt båda hållen: summan blir densamma.",da:"Tre tvillinger! Læg sammen begge veje: resultatet er det samme.",no:"Tre tvillinger! Legg sammen begge veier: summen blir den samme.",fi:"Kolmet kaksoset! Laske kumpaankin suuntaan: summa pysyy samana."},
    okRoundTake: {en:"Three twins! The parts trade places, the whole stays first.",de:"Drei Zwillinge! Die Teile tauschen, das Ganze bleibt vorn.",fr:"Trois jumelles ! Les parties changent de place, le tout reste en premier.",es:"¡Tres gemelas! Las partes cambian de lugar y el total se queda adelante.",pt:"Três gêmeos! As partes trocam de lugar e o todo fica na frente.",it:"Tre gemelle! Le parti si scambiano, il tutto resta davanti.",nl:"Drie tweelingen! De delen ruilen, het geheel blijft vooraan.",sv:"Tre tvillingar! Delarna byter plats, helheten står kvar först.",da:"Tre tvillinger! Delene bytter plads, helheden bliver stående forrest.",no:"Tre tvillinger! Delene bytter plass, helheten blir stående først.",fi:"Kolmet kaksoset! Osat vaihtavat paikkaa, kokonaisuus pysyy ensimmäisenä."},
    aCard: {en:"Card: {e}",de:"Karte: {e}",fr:"Carte : {e}",es:"Tarjeta: {e}",pt:"Cartão: {e}",it:"Carta: {e}",nl:"Kaart: {e}",sv:"Kort: {e}",da:"Kort: {e}",no:"Kort: {e}",fi:"Kortti: {e}"},
    aNow: {en:"Now {e}",de:"Jetzt {e}",fr:"Maintenant {e}",es:"Ahora {e}",pt:"Agora {e}",it:"Ora {e}",nl:"Nu {e}",sv:"Nu {e}",da:"Nu {e}",no:"Nå {e}",fi:"Nyt {e}"},
    aTwins: {en:"Twins: {e}",de:"Zwillinge: {e}",fr:"Jumelles : {e}",es:"Gemelas: {e}",pt:"Gêmeos: {e}",it:"Gemelle: {e}",nl:"Tweeling: {e}",sv:"Tvillingar: {e}",da:"Tvillinger: {e}",no:"Tvillinger: {e}",fi:"Kaksoset: {e}"},
    aPlate: {en:"{e}. Tap to take the twins apart.",de:"{e}. Tippe, um die Zwillinge zu trennen.",fr:"{e}. Touche pour séparer les jumelles.",es:"{e}. Toca para separar las gemelas.",pt:"{e}. Toque para separar os gêmeos.",it:"{e}. Tocca per separare le gemelle.",nl:"{e}. Tik om de tweeling te scheiden.",sv:"{e}. Tryck för att dela på tvillingarna.",da:"{e}. Tryk for at skille tvillingerne ad.",no:"{e}. Trykk for å skille tvillingene.",fi:"{e}. Napauta erottaaksesi kaksoset."},
    missSameTake: {en:"Same whole, but not the same numbers.",de:"Das gleiche Ganze, aber nicht dieselben Zahlen.",fr:"Même tout, mais pas les mêmes nombres.",es:"El mismo total, pero no los mismos números que se quitan.",pt:"O mesmo todo, mas não os mesmos números.",it:"Stesso tutto, ma non gli stessi numeri.",nl:"Hetzelfde geheel, maar niet dezelfde getallen.",sv:"Samma helhet, men inte samma tal.",da:"Samme helhed, men ikke de samme tal.",no:"Samme helhet, men ikke de samme tallene.",fi:"Sama kokonaisuus, mutta eri luvut."},
    missTotalTake: {en:"Not the same whole: one row sticks out.",de:"Nicht dasselbe Ganze: Eine Reihe ragt heraus.",fr:"Pas le même tout : une rangée dépasse.",es:"No es el mismo total: una fila sobresale.",pt:"Não é o mesmo todo: uma fileira fica para fora.",it:"Non è lo stesso tutto: una fila sporge.",nl:"Niet hetzelfde geheel: één rij steekt uit.",sv:"Inte samma helhet: en rad sticker ut.",da:"Ikke samme helhed: en række stikker ud.",no:"Ikke samme helhet: en rad stikker ut.",fi:"Ei sama kokonaisuus: yksi rivi jää yli."},
  },/*STRINGS-END*/

  defaults: { num: '20', cards: 'add' },
  settings: [
    { key: 'num', type: 'choice', labelKey: 'setNum', options: [{ value: '10', labelKey: 'n10' }, { value: '20', labelKey: 'n20' }] },
    { key: 'cards', type: 'choice', labelKey: 'setCards', options: [{ value: 'add', labelKey: 'cAdd' }, { value: 'take', labelKey: 'cTake' }, { value: 'mix', labelKey: 'cMix' }] }
  ],
  OK_MS: 500, FAST: false, LAY_MS: 1400,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._plan = null;
    this._timers = []; this._ro = null; this._view = {};
    injectLeapfrogCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _num: function () { return LeapfrogPartsCore.numOf(this._setting('num')); },
  _cards: function () { return LeapfrogPartsCore.cardsOf(this._setting('cards')); },
  _key: function () { return this._num() + '/' + this._cards(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = LeapfrogPartsCore.rounds(); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._plan = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = LeapfrogPartsCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._num(), this._cards(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._plan = P; this._orderForPool = pool; this._pass = pass; }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'leapfrog.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t(this.st && this.st.rd.kind === 'take' ? 'tTake' : 'tAdd'); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers();
    /* never a round without a plan: an unplanned grid would stand every twin in a fixed place */
    if (!this._plan || this._plan.order.indexOf(r) < 0) this._plan = LeapfrogPartsCore.plan(this._num(), this._cards(), Math.random, null);
    this.st = LeapfrogPartsCore.newState(this._num(), this._cards(), r, { order: this._plan.orders[r] });
    this._view = { note: '', ok: '', pairOk: '', showLay: false, bounce: null, spin: false, leapNow: null };
    this._setPrompt();
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : this._pool[0], 0); this._render2(); this._watchWidth();
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _dims: function () { var W = this._width(), B = LeapfrogPartsCore.band(W); return { W: W, wide: B.wide, cramp: W < 310 }; },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'lp-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<p class="lp-note" aria-live="polite"></p><div class="lp-grid"></div><div class="lp-shelf"></div><p class="lp-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    wrap.addEventListener('keydown', function (e) { self._key_(e); });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _sr: function (s) { var el = this._qs('.lp-sr'); if (el) el.textContent = s; },
  _expr: function (c) { return c.kind === 'take' ? c.w + ' − ' + c.a + ' = ' + c.b : c.a + ' + ' + c.b; },
  _plateText: function (pair) {
    var rd = this.st.rd, cs = rd.cards.filter(function (c) { return c.pair === pair; }), x = cs[0].a < cs[0].b ? cs[0] : cs[1], y = x === cs[0] ? cs[1] : cs[0];
    return x.kind === 'take' ? this._expr(x) + ' · ' + this._expr(y) : x.a + ' + ' + x.b + ' = ' + x.b + ' + ' + x.a;
  },
  _paint_: function () {
    var st = this.st, rd = st.rd, D = this._dims(), v = this._view, self = this, C = LeapfrogPartsCore;
    this._wrap.className = 'lp-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' k-' + rd.kind;
    var grid = this._qs('.lp-grid'); grid.innerHTML = '';
    rd.cards.forEach(function (c, i) { grid.appendChild(self._cardEl(c, i, D)); });
    var shelf = this._qs('.lp-shelf'); shelf.innerHTML = '';
    shelf.className = 'lp-shelf lp-art' + (v.spin ? ' is-spin' : '');
    for (var k = 0; k < 3; k++) {
      var pair = st.matched[k];
      if (pair == null) { shelf.insertAdjacentHTML('beforeend', '<span class="lp-slot" aria-hidden="true"></span>'); continue; }
      var txt = this._plateText(pair);
      var pl = this._btn('lp-plate', 'plate-' + pair, this._t('aPlate', { e: txt }), '<span class="lp-ptext">' + esc(txt) + '</span>');
      pl.disabled = st.done;
      (function (pr) { pl.addEventListener('click', function () { self._unmatch(pr); }); })(pair);
      shelf.appendChild(pl);
    }
    var note = this._qs('.lp-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'lp-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'lp-note is-hint'; }
    else if (v.pairOk) { note.textContent = v.pairOk; note.className = 'lp-note is-pair'; }
    else { note.textContent = ''; note.className = 'lp-note'; }
  },
  /* one card: numerals riding on their cube blocks, the sign, the total bar */
  _cardEl: function (c, i, D) {
    var st = this.st, rd = st.rd, v = this._view, self = this, C = LeapfrogPartsCore;
    var matched = C.isMatched(st, i), held = st.held === i, lay = st.lay;
    /* the lifted card shows its leapfrog while it is laid (and stays so as the miss-2 help) */
    var leapt = (lay && v.showLay && lay.from === i && !lay.twins) || st.help === i || v.leapNow === i;
    var show = leapt ? C.leap(c) : c, cmp = lay && v.showLay && !lay.twins && lay.to === i ? lay : null;
    var cls = 'lp-card lp-art' + (held ? ' is-held' : '') + (matched ? ' is-matched' : '') + (leapt ? ' is-leapt' : '') + (cmp ? ' is-bad' : '') + (st.help === i ? ' is-help' : '') + (v.bounce === i ? ' is-bounce' : '');
    var label = (leapt ? this._t('aNow', { e: this._expr(show) }) : this._t('aCard', { e: this._expr(c) }));
    var b = this._btn(cls, 'card-' + i, matched ? this._t('aTwins', { e: this._expr(c) }) : label, this._svg(show, rd.max, leapt && v.leapNow !== 'none' ? c : null, cmp, st.help != null ? C.leap(rd.cards[st.help]) : null));
    b.disabled = st.done || matched;
    b.setAttribute('aria-pressed', held ? 'true' : 'false');
    b.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('[data-minus]')) { self._minus(i); return; } self._pick(i); });
    return b;
  },
  /* the card drawing (user units: a cube is 10): tags y 0–18, cubes y 22–34, total bar y 38 */
  _svg: function (c, max, from, cmp, help) {
    var C = LeapfrogPartsCore, U = 10, X0 = 4, cols = C.cubes(c), small = Math.min(c.a, c.b), col = function (n) { return n === small ? 'lp-s' : 'lp-l'; };
    var W = X0 * 2 + max * U + 12, h = '', bad = cmp ? cmp.bad : [], over = cmp ? cmp.over : 0;
    var under = function (n) { return help && (n === help.a || n === help.b) ? ' lp-u' : ''; };
    /* the cube rows */
    var cube = function (k, x, y, cls, extra) { return '<rect class="lp-cube ' + cls + (bad.indexOf(k) >= 0 ? ' lp-bad' : '') + (extra || '') + '" x="' + x + '" y="' + y + '" width="' + (U - 0.8) + '" height="' + (U - 0.8) + '" rx="1.6"/>'; };
    if (c.kind === 'take') {
      /* the whole in its frame; the part that stays solid, the part taken away lifted and dashed */
      h += '<rect class="lp-frame" x="' + (X0 - 1.5) + '" y="20.5" width="' + (c.w * U + 2.2) + '" height="' + (U + 2.2) + '" rx="2.5"/>';
      for (var k = 0; k < c.w; k++) { var lift = k >= c.b; h += cube(k, X0 + k * U + 0.4, 22.4 - (lift ? 5 : 0), (k < c.b ? col(c.b) : col(c.a)) + (lift ? ' lp-lift' : '')); }
      var ta = '<tspan class="lp-num">' + c.w + '</tspan><tspan class="lp-sign" data-minus="1" dx="3">−</tspan><tspan class="lp-num ' + col(c.a) + 't' + under(c.a) + '" dx="3">' + c.a + '</tspan><tspan class="lp-sign" dx="3">=</tspan><tspan class="lp-num ' + col(c.b) + 't' + under(c.b) + '" dx="3">' + c.b + '</tspan>';
      h = '<text class="lp-tags" x="' + X0 + '" y="15">' + ta + '</text>' + h;
    } else {
      var leapCls = from ? ' lp-anim' : '';
      var ga = '', gb = '';
      for (var p = 0; p < c.a; p++) ga += cube(p, X0 + p * U + 0.4, 22.4, col(c.a));
      for (var q = 0; q < c.b; q++) gb += cube(c.a + q, X0 + (c.a + q) * U + 0.4, 22.4, col(c.b));
      /* tags over their blocks, kept apart when a block is small */
      var xa = X0 + c.a * U / 2, xp = X0 + c.a * U, xb = X0 + c.a * U + c.b * U / 2;
      xa = Math.max(xa, X0 + 5); xp = Math.max(xp, xa + 13); xb = Math.max(xb, xp + 13);
      ga = '<text class="lp-num ' + col(c.a) + 't' + under(c.a) + '" x="' + xa + '" y="15" text-anchor="middle">' + c.a + '</text>' + ga;
      gb = '<text class="lp-num ' + col(c.b) + 't' + under(c.b) + '" x="' + xb + '" y="15" text-anchor="middle">' + c.b + '</text>' + gb;
      /* in flight: the block now in front jumps over the other (an arc); the other slides back */
      var jA = from ? ' style="--dx:' + (c.b * U) + 'px"' : '', jB = from ? ' style="--dx:' + (-c.a * U) + 'px"' : '';
      h += '<g class="lp-blk' + (from ? ' lp-jump' : '') + '"' + jA + '>' + ga + '</g><g class="lp-blk' + (from ? ' lp-slide' : '') + '"' + jB + '>' + gb + '</g>';
      h += '<text class="lp-sign" x="' + xp + '" y="15" text-anchor="middle">+</text>';
    }
    var len = C.total(c);
    /* a row laid on it that is longer: the overhang, dashed */
    if (over > 0) for (var o = 0; o < over; o++) h += '<rect class="lp-cube lp-over" x="' + (X0 + (len + o) * U + 0.4) + '" y="22.4" width="' + (U - 0.8) + '" height="' + (U - 0.8) + '" rx="1.6"/>';
    if (over < 0) h += '<rect class="lp-short" x="' + (X0 + (len + over) * U) + '" y="20.6" width="' + (-over * U) + '" height="' + (U + 1.8) + '" rx="2"/>';
    h += '<line class="lp-bar" x1="' + X0 + '" y1="37.5" x2="' + (X0 + len * U) + '" y2="37.5"/>';
    return '<svg class="lp-svg lp-art" viewBox="0 0 ' + W + ' 41" preserveAspectRatio="xMinYMid meet" aria-hidden="true">' + h + '</svg>';
  },

  /* ---------------- the hand ---------------- */
  _pick: function (i) {
    var C = LeapfrogPartsCore, st = this.st, v = this._view, self = this, held = st.held;
    var res = C.pick(st, i); if (res.result === 'no') return;
    this._clearTimers(); v.note = ''; v.ok = ''; v.bounce = null; v.showLay = false; v.leapNow = null;
    if (res.result === 'lift' || res.result === 'drop') { v.pairOk = ''; this.api.sound(res.result === 'lift' ? 560 : 380); this._paint(); this._sr(this._t('aCard', { e: this._expr(st.rd.cards[i]) })); return; }
    if (res.result === 'twins') {
      var a = st.rd.cards[held], msg = a.kind === 'take' ? this._t('okTake', { w: a.w, a: Math.min(a.a, a.b), b: Math.max(a.a, a.b) }) : this._t('okAdd', { a: Math.min(a.a, a.b), b: Math.max(a.a, a.b), s: a.s });
      v.pairOk = msg; this.api.sound(880);
      if (res.done) { this._success(); return; }
      this._paint(); this.api.announce(msg); return;
    }
    /* a miss: the laid card shows where it does not fit, then hops home */
    v.pairOk = ''; v.showLay = true; v.leapNow = null; v.note = this._t(C.hint(st));
    this.api.sound(240); this._paint(); this.api.announce(v.note);
    if (!this.FAST) this._later(function () { v.showLay = false; self._paint(); }, this.LAY_MS);
  },
  /* the minus is not a hinge: the whole tries to jump over its part and bounces back */
  _minus: function (i) {
    var v = this._view, self = this; if (LeapfrogPartsCore.minusSwap(this.st, i) !== 'refused') { this._pick(i); return; }
    this._clearTimers(); v.bounce = i; v.note = this._t('hintMinus'); v.pairOk = ''; this.api.sound(180); this._paint(); this.api.announce(v.note);
    if (!this.FAST) this._later(function () { v.bounce = null; self._paint(); }, 450);
  },
  _unmatch: function (pair) { if (LeapfrogPartsCore.unmatch(this.st, pair) === 'no') return; this._clearTimers(); this._view.pairOk = ''; this._view.note = ''; this.api.sound(380); this._paint(); },
  /* keyboard: L (or long press is not needed) leapfrogs the lifted card in place once, never a pick */
  _key_: function (e) {
    var st = this.st, v = this._view, self = this;
    if ((e.key === 'l' || e.key === 'L') && st.held != null && !st.done) { e.preventDefault(); v.leapNow = st.held; this._paint(); if (!this.FAST) this._later(function () { v.leapNow = null; self._paint(); }, 1000); }
    if (e.key === 'Escape' && st.held != null) { e.preventDefault(); this._pick(st.held); }
  },
  _success: function () {
    var st = this.st, v = this._view, self = this, msg = this._t(st.rd.kind === 'take' ? 'okRoundTake' : 'okRound');
    v.note = ''; v.ok = msg; v.spin = true; v.showLay = false;
    if (this._pa) this._pa.msg = msg;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectLeapfrogCSS() {
  if (typeof document === 'undefined' || document.getElementById('lp-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.lp-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .lp-wrap:focus{outline:none;}'
  + '.lp-note{margin:0;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .lp-note:empty{display:none;} .lp-note.is-hint{color:#9A3D1C;} .lp-note.is-pair{color:#146B5E;} .lp-note.is-ok{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.lp-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.lp-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;}'
  + '.lp-card{position:relative;display:flex;align-items:center;height:104px;padding:6px 12px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 3px #2F2A3B,0 4px 0 #CDBFA4;cursor:pointer;font:inherit;transition:transform .12s ease,box-shadow .12s ease;}'
  + '.lp-card:disabled{cursor:default;} .lp-card.is-held{transform:translateY(-6px);box-shadow:inset 0 0 0 3px #F2784B,0 0 0 4px rgba(242,120,75,.25),0 8px 0 #CDBFA4;background:#FFF6EA;}'
  + '.lp-card.is-matched{background:#FFF4CC;box-shadow:inset 0 0 0 3px #E9B92E,0 4px 0 #D9B24A;} .lp-card.is-bad{box-shadow:inset 0 0 0 3px #E0663A,0 4px 0 #CDBFA4;animation:lpWob .35s ease-in-out 2;} @keyframes lpWob{25%{transform:rotate(-1.2deg);}75%{transform:rotate(1.2deg);}}'
  + '.lp-card.is-leapt{background:#FFF6EA;outline:3px dashed #F2784B;outline-offset:3px;}'
  + '.lp-card.is-help{box-shadow:inset 0 0 0 3px #F4CF62,0 0 14px rgba(244,207,98,.8),0 8px 0 #CDBFA4;} .lp-card.is-bounce .lp-svg{animation:lpBonk .42s ease-out;} @keyframes lpBonk{30%{transform:translateY(-8px);}60%{transform:translateY(2px);}}'
  + '.lp-svg{display:block;height:100%;width:100%;overflow:visible;}'
  + '.lp-cube{stroke:#2F2A3B;stroke-width:.8;} .lp-cube.lp-s{fill:#F2784B;} .lp-cube.lp-l{fill:#2E9C88;} .lp-cube.lp-lift{fill-opacity:.35;stroke-dasharray:1.6 1.2;}'
  + '.lp-cube.lp-bad{stroke:#C0392B;stroke-width:1.6;filter:drop-shadow(0 0 1.5px #F2784B);} .lp-cube.lp-over{fill:#FBE3D8;stroke:#E0663A;stroke-dasharray:1.6 1.2;stroke-width:1.2;} .lp-short{fill:none;stroke:#E0663A;stroke-width:1.2;stroke-dasharray:2 1.4;}'
  + '.lp-frame{fill:#EEE9E0;stroke:#9B958A;stroke-width:.8;} .lp-bar{stroke:#2F2A3B;stroke-width:1.4;stroke-linecap:round;}'
  + '.lp-num,.lp-sign,.lp-tags{font-family:' + H + ';font-weight:800;font-size:14px;fill:' + INK + ';} .lp-sign{fill:#6B6478;} .lp-s.lp-st,.lp-st{fill:#C8532A;} .lp-lt{fill:#1E7A69;} .lp-u{text-decoration:underline;text-decoration-thickness:1.6px;}'
  + '.lp-sign[data-minus]{cursor:pointer;}'
  + '.lp-blk{transform-box:view-box;} .lp-jump{animation:lpLeap .5s ease-in-out;} .lp-slide{animation:lpSlide .5s ease-in-out;}'
  + '@keyframes lpLeap{0%{transform:translate(var(--dx),0);}50%{transform:translate(calc(var(--dx) / 2),-14px);}100%{transform:translate(0,0);}} @keyframes lpSlide{0%{transform:translateX(var(--dx));}100%{transform:translateX(0);}}'
  /* the twin shelf */
  + '.lp-shelf{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;padding:8px;border-radius:12px;background:#EFE4CF;box-shadow:inset 0 0 0 2px #D9C29A;}'
  + '.lp-slot{display:block;min-height:48px;border-radius:10px;border:2px dashed #D3BF95;}'
  + '.lp-plate{min-height:48px;padding:4px 8px;border:0;border-radius:10px;background:#FFF4CC;box-shadow:inset 0 0 0 2px #E9B92E,0 3px 0 #D9B24A;cursor:pointer;font:inherit;color:' + INK + ';} .lp-plate:disabled{cursor:default;}'
  + '.lp-ptext{font-family:' + H + ';font-weight:800;font-size:18px;white-space:nowrap;} .lp-shelf.is-spin .lp-plate{animation:lpSpin .9s ease-in-out;} @keyframes lpSpin{100%{transform:rotate(360deg);}}'
  /* phones: one column of six cards; the shelf holds three plates in a short strip */
  + '.lp-wrap.is-narrow{gap:8px;} .lp-wrap.is-narrow .lp-grid{grid-template-columns:1fr;gap:6px;} .lp-wrap.is-narrow .lp-card{height:70px;padding:4px 10px;} .lp-wrap.is-narrow .lp-note{font-size:16px;}'
  + '.lp-wrap.is-narrow .lp-shelf{gap:6px;padding:6px;} .lp-wrap.is-narrow .lp-plate,.lp-wrap.is-narrow .lp-slot{min-height:44px;} .lp-wrap.is-narrow .lp-ptext{font-size:13px;white-space:normal;}'
  + '.lp-wrap.is-narrow.is-done .lp-grid{display:none;} .lp-wrap.is-narrow.is-done .lp-shelf{grid-template-columns:1fr;} .lp-wrap.is-narrow.is-done .lp-ptext{font-size:18px;white-space:nowrap;}'
  + '.lp-wrap.is-cramp .lp-card{height:62px;padding:3px 8px;} .lp-wrap.is-cramp .lp-grid{gap:5px;} .lp-wrap.is-cramp .lp-note{font-size:15px;}'
  + '.lp-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.lp-wrap *{animation:none !important;transition:none !important;}}'
  + '.lp-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'lp-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.LeapfrogPartsActivity = LeapfrogPartsActivity;
