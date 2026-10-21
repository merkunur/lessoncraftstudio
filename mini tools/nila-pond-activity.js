/* =====================================================================
   nila-pond-activity.js — ACTIVITY #70 of the one-by-one rebuild:
   "Nila's Idea Pond" → THE IDEA UMBRELLA (RI.K.2, 11 locales).
   Design sheet: docs/activities-rebuild/designs/070-nila-pond.md
   ---------------------------------------------------------------------
   THE INVENTION: each idea is an umbrella. Hung over the pond it opens to
   the same full size as every other umbrella — so hanging one tells the
   child nothing. On Check it rains, and the canopy pulls in to exactly
   what the idea covers: the big idea stays wide over every lily pad (every
   detail sentence of the text); a detail idea shrinks to its own pad; an
   idea that is not in the text folds right in over open water. The rained-
   on pads' ink runs. Some rounds go on: a true but off-topic sentence
   drifts in under the umbrella (push it out into the rain), or two pads
   float at the edge (pull the one that belongs under).

   ACTIVITY LAYER ONLY: the model is nila-pond-core.js; lcs-shell.js and
   main-idea-core.js are untouched (the shell's Check is hidden and pressed
   by this activity on success). Test seams:
   window.NilaPondActivity.st / ._pool / ._order / ._ensurePool / .FAST.
   ===================================================================== */
'use strict';

var NilaPondActivity = {
  id: 'nila-pond',
  apparatusClasses: ['np-'],

  strings: {
    title:       {en:'Nila\'s Idea Pond',de:'Nilas Ideen-Teich',nl:'De ideeënvijver van Nila',da:'Nilas idédam',sv:'Nilas idédamm',no:'Nilas idédam',es:'El estanque de las ideas de Nila',it:'Lo stagno delle idee di Nila',pt:'O lago das ideias da Nila',fr:'L’étang aux idées de Nila',fi:'Nilan idealampi'},
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    instr:       {en:'Read the text. Hang the umbrella that keeps every lily pad dry.',de:'Lies den Text. Häng den Schirm auf, unter dem jedes Seerosenblatt trocken bleibt.',nl:'Lees de tekst. Hang de paraplu op die elk waterlelieblad droog houdt.',da:'Læs teksten. Hæng den paraply op, der holder alle åkandeblade tørre.',sv:'Läs texten. Häng upp paraplyet som håller alla näckrosblad torra.',no:'Les teksten. Heng opp paraplyen som holder alle vannliljebladene tørre.',es:'Lee el texto. Cuelga el paraguas que deja secas todas las hojas de nenúfar.',it:'Leggi il testo. Appendi l’ombrello che tiene asciutte tutte le foglie di ninfea.',pt:'Leia o texto. Pendure o guarda-chuva que deixa todas as folhas de vitória-régia secas.',fr:'Lis le texte. Accroche le parapluie qui garde toutes les feuilles de nénuphar au sec.',fi:'Lue teksti. Ripusta sateenvarjo, joka pitää kaikki lehdet kuivina.'},
    instrStep2:  {en:'Push the lily pad that does not belong out into the rain.',de:'Schieb das Seerosenblatt, das nicht dazugehört, hinaus in den Regen.',nl:'Duw het waterlelieblad dat er niet bij hoort de regen in.',da:'Skub det åkandeblad, der ikke hører til, ud i regnen.',sv:'Knuffa ut i regnet det näckrosblad som inte hör hit.',no:'Dytt vannliljebladet som ikke hører til, ut i regnet.',es:'Empuja hacia la lluvia la hoja de nenúfar que no va.',it:'Spingi sotto la pioggia la foglia di ninfea che non c’entra.',pt:'Empurre para a chuva a folha de vitória-régia que não faz parte.',fr:'Pousse sous la pluie la feuille de nénuphar qui n’a rien à faire là.',fi:'Työnnä sateeseen se lumpeenlehti, joka ei kuulu joukkoon.'},
    instrSupply: {en:'Pull the lily pad that belongs under the umbrella.',de:'Zieh das Seerosenblatt, das dazugehört, unter den Schirm.',nl:'Trek het waterlelieblad dat erbij hoort onder de paraplu.',da:'Træk det åkandeblad, der hører til, ind under paraplyen.',sv:'Dra in näckrosbladet som hör hit under paraplyet.',no:'Dra vannliljebladet som hører til, inn under paraplyen.',es:'Jala bajo el paraguas la hoja de nenúfar que sí va.',it:'Tira sotto l’ombrello la foglia di ninfea che c’entra.',pt:'Puxe para debaixo do guarda-chuva a folha de vitória-régia que faz parte.',fr:'Tire sous le parapluie la feuille de nénuphar qui va avec.',fi:'Vedä sateenvarjon alle se lumpeenlehti, joka kuuluu joukkoon.'},
    check:       {en:'Check',de:'Prüfen',nl:'Controleren',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Revisar',it:'Controlla',pt:'Conferir',fr:'Vérifier',fi:'Tarkista'},
    hintEmpty:   {en:'Hang one umbrella over the pond.',de:'Häng einen Schirm über den Teich.',nl:'Hang een paraplu boven de vijver.',da:'Hæng en paraply over dammen.',sv:'Häng ett paraply över dammen.',no:'Heng en paraply over dammen.',es:'Cuelga un paraguas sobre el estanque.',it:'Appendi un ombrello sopra lo stagno.',pt:'Pendure um guarda-chuva em cima do lago.',fr:'Accroche un parapluie au-dessus de l’étang.',fi:'Ripusta yksi sateenvarjo lammen ylle.'},
    hintMiss1:   {en:'Some lily pads got wet. Which idea covers ALL of them?',de:'Einige Seerosenblätter sind nass geworden. Welche Idee deckt ALLE ab?',nl:'Sommige waterleliebladen zijn nat geworden. Welk idee dekt ze ALLEMAAL af?',da:'Nogle åkandeblade blev våde. Hvilken idé dækker dem ALLE?',sv:'Några näckrosblad blev blöta. Vilken idé täcker ALLA?',no:'Noen vannliljeblader ble våte. Hvilken idé dekker ALLE?',es:'Algunas hojas se mojaron. ¿Qué idea las cubre TODAS?',it:'Alcune foglie si sono bagnate. Quale idea le copre TUTTE?',pt:'Algumas folhas se molharam. Qual ideia cobre TODAS?',fr:'Des feuilles ont été mouillées. Quelle idée les couvre TOUTES ?',fi:'Osa lehdistä kastui. Mikä idea suojaa ne KAIKKI?'},
    hintMiss2:   {en:'Read every sentence. What are they all about?',de:'Lies jeden Satz. Worum geht es in allen?',nl:'Lees elke zin. Waar gaan ze allemaal over?',da:'Læs hver sætning. Hvad handler de alle om?',sv:'Läs varje mening. Vad handlar alla om?',no:'Les hver setning. Hva handler alle om?',es:'Lee cada oración. ¿De qué tratan todas?',it:'Leggi ogni frase. Di che cosa parlano tutte?',pt:'Leia cada frase. Sobre o que todas falam?',fr:'Lis chaque phrase. De quoi parlent-elles toutes ?',fi:'Lue jokainen lause. Mistä ne kaikki kertovat?'},
    hintStep2:   {en:'One lily pad is not about the big idea. Push it out into the rain.',de:'Ein Seerosenblatt passt nicht zur großen Idee. Schieb es hinaus in den Regen.',nl:'Eén waterlelieblad gaat niet over het grote idee. Duw het de regen in.',da:'Ét åkandeblad handler ikke om den store idé. Skub det ud i regnen.',sv:'Ett näckrosblad handlar inte om den stora idén. Knuffa ut det i regnet.',no:'Ett vannliljeblad handler ikke om den store ideen. Dytt det ut i regnet.',es:'Una hoja no trata de la idea principal. Empújala hacia la lluvia.',it:'Una foglia non parla dell’idea principale. Spingila sotto la pioggia.',pt:'Uma folha não fala da ideia principal. Empurre-a para a chuva.',fr:'Une feuille ne parle pas de la grande idée. Pousse-la sous la pluie.',fi:'Yksi lumpeenlehti ei kerro isosta ideasta. Työnnä se sateeseen.'},
    hintSupply:  {en:'Read the umbrella. Which sentence belongs under it?',de:'Lies den Schirm. Welcher Satz gehört darunter?',nl:'Lees de paraplu. Welke zin hoort eronder?',da:'Læs paraplyen. Hvilken sætning hører ind under den?',sv:'Läs paraplyet. Vilken mening hör hemma under det?',no:'Les paraplyen. Hvilken setning hører hjemme under den?',es:'Lee el paraguas. ¿Qué oración va debajo?',it:'Leggi l’ombrello. Quale frase va lì sotto?',pt:'Leia o guarda-chuva. Qual frase fica embaixo dele?',fr:'Lis le parapluie. Quelle phrase va dessous ?',fi:'Lue sateenvarjo. Mikä lause kuuluu sen alle?'},
    swapNote:    {en:'A new text about the same animal. Read it and try again.',de:'Ein neuer Text über dasselbe Tier. Lies ihn und versuch es noch einmal.',nl:'Een nieuwe tekst over hetzelfde dier. Lees hem en probeer het nog eens.',da:'En ny tekst om det samme dyr. Læs den, og prøv igen.',sv:'En ny text om samma djur. Läs den och försök igen.',no:'En ny tekst om det samme dyret. Les den og prøv igjen.',es:'Un texto nuevo sobre el mismo animal. Léelo e inténtalo otra vez.',it:'Un testo nuovo sullo stesso animale. Leggilo e riprova.',pt:'Um texto novo sobre o mesmo animal. Leia e tente de novo.',fr:'Un nouveau texte sur le même animal. Lis-le et réessaie.',fi:'Uusi teksti samasta eläimestä. Lue se ja yritä uudelleen.'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    setRead:     {en:'Reading',de:'Lesen',nl:'Lezen',da:'Læsning',sv:'Läsning',no:'Lesing',es:'Lectura',it:'Lettura',pt:'Leitura',fr:'Lecture',fi:'Lukeminen'},
    rSelf:       {en:'I read it',de:'Ich lese selbst',nl:'Ik lees zelf',da:'Jeg læser selv',sv:'Jag läser själv',no:'Jeg leser selv',es:'Yo lo leo',it:'Leggo io',pt:'Eu leio',fr:'Je lis seul',fi:'Luen itse'},
    rAloud:      {en:'Read it to me',de:'Vorlesen',nl:'Voorlezen',da:'Læs højt for mig',sv:'Läs högt för mig',no:'Les høyt for meg',es:'Léemelo',it:'Leggimelo',pt:'Leia para mim',fr:'Lis-le-moi',fi:'Lue minulle'},
    setUmb:      {en:'Umbrellas',de:'Schirme',nl:'Paraplu’s',da:'Paraplyer',sv:'Paraplyer',no:'Paraplyer',es:'Paraguas',it:'Ombrelli',pt:'Guarda-chuvas',fr:'Parapluies',fi:'Sateenvarjot'},
    u3:          {en:'3',de:'3',nl:'3',da:'3',sv:'3',no:'3',es:'3',it:'3',pt:'3',fr:'3',fi:'3'},
    u4:          {en:'4',de:'4',nl:'4',da:'4',sv:'4',no:'4',es:'4',it:'4',pt:'4',fr:'4',fi:'4'},
    ariaNila:    {en:'Nila: read the text aloud',de:'Nila: den Text vorlesen',nl:'Nila: lees de tekst voor',da:'Nila: læs teksten højt',sv:'Nila: läs texten högt',no:'Nila: les teksten høyt',es:'Nila: lee el texto en voz alta',it:'Nila: leggi il testo ad alta voce',pt:'Nila: leia o texto em voz alta',fr:'Nila : lis le texte à voix haute',fi:'Nila: lue teksti ääneen'},
    ariaCloud:   {en:'Rain cloud',de:'Regenwolke',nl:'Regenwolk',da:'Regnsky',sv:'Regnmoln',no:'Regnsky',es:'Nube de lluvia',it:'Nuvola di pioggia',pt:'Nuvem de chuva',fr:'Nuage de pluie',fi:'Sadepilvi'},
    ariaHook:    {en:'Umbrella hook',de:'Schirmhaken',nl:'Parapluhaak',da:'Paraplykrog',sv:'Paraplykrok',no:'Paraplykrok',es:'Gancho del paraguas',it:'Gancio dell’ombrello',pt:'Gancho do guarda-chuva',fr:'Crochet du parapluie',fi:'Sateenvarjon koukku'},
    ariaUmb:     {en:'Umbrella: {p}',de:'Schirm: {p}',nl:'Paraplu: {p}',da:'Paraply: {p}',sv:'Paraply: {p}',no:'Paraply: {p}',es:'Paraguas: {p}',it:'Ombrello: {p}',pt:'Guarda-chuva: {p}',fr:'Parapluie : {p}',fi:'Sateenvarjo: {p}'},
    ariaPad:     {en:'Lily pad: {s}',de:'Seerosenblatt: {s}',nl:'Waterlelieblad: {s}',da:'Åkandeblad: {s}',sv:'Näckrosblad: {s}',no:'Vannliljeblad: {s}',es:'Hoja de nenúfar: {s}',it:'Foglia di ninfea: {s}',pt:'Folha de vitória-régia: {s}',fr:'Feuille de nénuphar : {s}',fi:'Lumpeenlehti: {s}'},
    ariaUnder:   {en:'under the umbrella',de:'unter dem Schirm',nl:'onder de paraplu',da:'under paraplyen',sv:'under paraplyet',no:'under paraplyen',es:'bajo el paraguas',it:'sotto l’ombrello',pt:'embaixo do guarda-chuva',fr:'sous le parapluie',fi:'sateenvarjon alla'},
    ariaOut:     {en:'out in the rain',de:'draußen im Regen',nl:'buiten in de regen',da:'ude i regnen',sv:'ute i regnet',no:'ute i regnet',es:'afuera, bajo la lluvia',it:'fuori sotto la pioggia',pt:'lá fora, na chuva',fr:'dehors sous la pluie',fi:'ulkona sateessa'}
  },

  defaults: { read: 'self', umb: '4' },
  settings: [
    { key: 'read', type: 'choice', labelKey: 'setRead', options: [{ value: 'self', labelKey: 'rSelf' }, { value: 'aloud', labelKey: 'rAloud' }] },
    { key: 'umb', type: 'choice', labelKey: 'setUmb', options: [{ value: '3', labelKey: 'u3' }, { value: '4', labelKey: 'u4' }] }
  ],

  OK_MS: 3800, FAST: false, MISS_MS: 1700, STEP_MS: 1100,
  PEG_COLORS: ['#F2784B', '#146B5E', '#E8B83A', '#4F9BD9'],

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._curPass = 0; this._pass = 0; this._pegs = null; this._rails = null; this._pos = 0;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._pa = {}; this._drag = null; this._reading = -1;
    injectNilaCSS();
  },
  destroy: function () { this._clearTimers(); this._hush(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); return; }
    if (this._wrap) { this._paint(); if (this._aloud() && this.st && !this.st.done) this._readAll(); else this._hush(); }
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return NilaPondCore.locale(((this.api && this.api.lang) || 'en').slice(0, 2)); },
  _umb: function () { return NilaPondCore.umbrellas(this._set('umb')); },
  _aloud: function () { return this._set('read') === 'aloud'; },
  _key: function () { return this._loc() + '/' + this._umb(); },
  _hasVoice: function () { return !!(window.LCSAudio && window.LCSAudio.speak) || !!window.speechSynthesis; },
  _say: function (text) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'sentence', text: text, lang: this._loc(), rate: 0.9 }); else if (window.speechSynthesis && window.SpeechSynthesisUtterance && text) { var u = new SpeechSynthesisUtterance(text); u.lang = this._loc(); u.rate = 0.9; speechSynthesis.cancel(); speechSynthesis.speak(u); } } catch (e) {} },
  _hush: function () { this._reading = -1; if (this._readTimer) { clearTimeout(this._readTimer); this._readTimer = null; } try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {} },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = NilaPondCore.IDS.slice(); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._pegs = null; }
    return this._pool;
  },
  /* the round id names the paragraph: the next pass is the same twelve texts in a new order, with the big idea on new pegs */
  nextTask: function (opts) {
    var C = NilaPondCore, self = this, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.map(function (i) { return pool[i]; });
      this._order = C.plan(this._loc(), Math.random, prev).map(function (x) { return pool.indexOf(x); }); this._orderForPool = pool;
      this._pass = pass; this._pegs = null;
    }
    if (!this._pegs || this._pegs.length !== n) { this._pegs = C.pegs(Math.random, this._umb(), n); this._rails = {}; }
    var id = pool[this._order[pos]], pa = { msg: this._t('instr') }; this._pa = pa;
    return {
      id: 'nila.' + this._loc() + '.' + id, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._pos = pos; tool._start(id, pos); pa.msg = tool._t(C.prompt(tool.st)); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _start: function (id, pos) {
    var C = NilaPondCore, r = C.round(this._loc(), id), rail = C.deal(r, Math.random, this._pegs ? this._pegs[pos] : 0, this._umb());
    this._clearTimers(); this._hush(); this._busy = false; this._view = {}; this._drag = null;
    this.st = C.newState(r, rail);
    var self = this; if (this._aloud()) this._later(function () { self._readAll(); }, this._ms(500));
  },
  /* a third wrong umbrella: the target moves — a sibling text about the same animal takes this place (and this one comes later) */
  _swap: function () {
    var C = NilaPondCore, pool = this._pool, cur = this.st.r.id, sibs = C.siblings(cur), pos = this._pos, o = this._order, j = -1;
    for (var k = pos + 1; k < o.length; k++) if (sibs.indexOf(pool[o[k]]) >= 0) { j = k; break; }
    var nid;
    if (j >= 0) { nid = pool[o[j]]; var x = o[pos]; o[pos] = o[j]; o[j] = x; }
    else nid = sibs[Math.floor(Math.random() * sibs.length)];
    this._start(nid, pos); this._view = { swapped: true };
    this._setPrompt(); this._paint(); this.api.announce(this._t('swapNote'));
  },
  _setPrompt: function () {
    var pa = this._pa || {}; pa.msg = this._t(NilaPondCore.prompt(this.st));
    var el = document.querySelector('.lcs-activity-prompt-text'); if (el) el.textContent = pa.msg;
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = NilaPondCore; this._ensurePool(); this.st = C.newState(C.round(this._loc(), 'bear-warm'), C.deal(C.round(this._loc(), 'bear-warm'), C.seeded('x'), 1, this._umb())); }
    this._render2();
    this._watchWidth();
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected || self._busy || self._drag) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'np-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    this._body = api.el('div', 'np-body'); wrap.appendChild(this._body);
    var row = api.el('div', 'np-row'); wrap.appendChild(row);
    var chk = api.el('button', 'np-check'); chk.type = 'button'; chk.setAttribute('data-k', 'check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; row.appendChild(chk);
    var note = api.el('p', 'np-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx || this._wrap).focus(); }
  },
  _img: function (p, cls) { var im = this.api.el('img', cls || 'np-img'); im.alt = ''; im.draggable = false; im.src = this._pic(p); return im; },
  _paint_: function () {
    if (!this._body) return;
    var st = this.st, C = NilaPondCore, v = this._view, api = this.api, self = this, L = this._L = C.layout(this._width()), r = st.r;
    this._wrap.className = 'np-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + (L.W < 300 ? ' is-tiny' : '') + ' is-' + st.phase + (st.done ? ' is-done' : '') + (this._aloud() ? ' is-aloud' : '') + (this.FAST ? ' is-fast' : '');
    [['pic', L.pic], ['nila', L.nila], ['lead', L.lead], ['pad', L.pad], ['tag', L.tag]].forEach(function (p) { self._wrap.style.setProperty('--np-' + p[0], p[1] + 'px'); });
    this._body.innerHTML = '';
    var sents = [r.lead].concat(r.pads);

    /* the card: Nila (reads the text aloud), the lead sentence, the animal */
    var card = api.el('div', 'np-card');
    var nila = api.el('button', 'np-nila' + (this._reading >= 0 ? ' is-playing' : '') + (st.done && v.win ? ' is-swim' : '')); nila.type = 'button'; nila.setAttribute('data-k', 'nila'); nila.setAttribute('aria-label', this._t('ariaNila'));
    nila.appendChild(this._img(C.NILA)); var spk = api.el('span', 'np-spk'); spk.setAttribute('aria-hidden', 'true'); nila.appendChild(spk);
    nila.addEventListener('click', function () { if (self._reading >= 0) { self._hush(); self._paint(); } else self._readAll(); });
    card.appendChild(nila);
    var lead = api.el('p', 'np-lead' + (this._reading === 0 ? ' is-reading' : '')); lead.textContent = r.lead; card.appendChild(lead);
    var pic = api.el('div', 'np-pic'); pic.appendChild(this._img(r.pic)); card.appendChild(pic);
    this._body.appendChild(card);

    /* the pond: a rail over the water the umbrella hangs from, the dry place, and (step 2) the open water */
    var pond = api.el('div', 'np-pond'); this._pond = pond;
    var sky = api.el('div', 'np-sky');
    var cloud = api.el('div', 'np-cloud' + (v.rain ? ' is-rain' : '')); cloud.setAttribute('role', 'img'); cloud.setAttribute('aria-label', this._t('ariaCloud'));
    for (var c = 0; c < 4; c++) cloud.appendChild(api.el('span', 'np-puff np-puff' + c));
    cloud.addEventListener('click', function () { if (st.done && !self._busy) { self._view = { rain: true, win: false, replay: true }; self.api.sound(523); self._paint(); self._later(function () { self._view = {}; self._paint(); }, self._ms(1500)); } });
    sky.appendChild(cloud);
    sky.appendChild(api.el('div', 'np-bar'));
    pond.appendChild(sky);
    var water = api.el('div', 'np-water'); pond.appendChild(water);
    var dry = api.el('div', 'np-dry'); water.appendChild(dry); this._dry = dry;

    var cap = C.canopy(st), hungColor = st.hung !== null ? this.PEG_COLORS[st.rail.indexOf(st.hung)] : null;
    if (st.phase === 'step2' || st.done) { cap = { x: 0.5, w: 1 }; hungColor = this.PEG_COLORS[st.rail.indexOf(0)]; }
    var hook = api.el('div', 'np-hook' + (v.wiggle ? ' is-wiggle' : '')); hook.setAttribute('aria-label', this._t('ariaHook')); dry.appendChild(hook);
    if (cap) {
      var can = api.el('button', 'np-canopy' + (st.rained ? ' is-true' : '') + (v.twirl ? ' is-twirl' : '') + (cap.w <= C.FOLD + 1e-9 ? ' is-folded' : ''));
      can.type = 'button'; can.setAttribute('data-k', 'canopy');
      var tagIdx = (st.phase === 'step2' || st.done) ? 0 : st.hung;
      can.setAttribute('aria-label', this._t('ariaUmb', { p: r.tags[tagIdx] }));
      can.style.left = ((cap.x - cap.w / 2) * 100) + '%'; can.style.width = (cap.w * 100) + '%';
      can.innerHTML = '<svg viewBox="0 0 200 70" preserveAspectRatio="none" aria-hidden="true"><path d="M2 64 C 18 2, 182 2, 198 64 Q 173 52 149 64 Q 124 52 100 64 Q 75 52 51 64 Q 26 52 2 64 Z" fill="' + hungColor + '" stroke="#2A2A35" stroke-width="3" vector-effect="non-scaling-stroke"/></svg>';
      var hl = api.el('span', 'np-handle'); can.appendChild(hl);
      if (cap.w >= 0.99) { var tg = api.el('span', 'np-hangtag'); tg.textContent = r.tags[tagIdx]; can.appendChild(tg); }
      can.addEventListener('click', function () { if (self._busy) return; self._view = { twirl: true }; self._paint(); self._later(function () { self._view = {}; self._paint(); }, self._ms(700)); });
      dry.appendChild(can);
    }
    var padsRow = api.el('div', 'np-pads'); dry.appendChild(padsRow);
    var under = st.phase === 'hang' ? [0, 1, 2] : st.under, out = st.phase === 'hang' ? [] : st.out;
    under.forEach(function (p) { padsRow.appendChild(self._pad(p, true)); });
    if (st.phase !== 'hang') {
      var open = api.el('div', 'np-open'); open.setAttribute('data-zone', 'out'); water.appendChild(open); this._open = open;
      out.forEach(function (p) { open.appendChild(self._pad(p, false)); });
    } else this._open = null;

    /* rain */
    if (v.rain) {
      var drops = api.el('div', 'np-rain'); drops.setAttribute('aria-hidden', 'true');
      var lo = cap ? cap.x - cap.w / 2 : 2, hi = cap ? cap.x + cap.w / 2 : -1;
      for (var d = 0; d < 22; d++) {
        var x = (d + 0.5) / 22, sh = x > lo && x < hi, dr = api.el('span', 'np-drop' + (sh ? ' is-short' : ''));
        dr.style.left = (x * 100) + '%'; dr.style.top = (sh ? 4 + (d * 7) % 14 : 10 + (d * 53) % 120) + 'px'; dr.style.animationDelay = ((d * 37) % 300) + 'ms'; drops.appendChild(dr);
      }
      pond.appendChild(drops);
    }
    this._body.appendChild(pond);

    /* the peg rail: folded umbrellas with their idea tags (colour by peg, never by idea) */
    if (st.phase === 'hang') {
      var rail = api.el('div', 'np-rail np-rail' + st.rail.length), dim = C.dimmed(st);
      st.rail.forEach(function (tag, peg) {
        var b = api.el('button', 'np-umb' + (st.hung === tag ? ' is-hung' : '') + (dim.indexOf(tag) >= 0 ? ' is-dim' : '') + (st.tried.indexOf(tag) >= 0 ? ' is-tried' : ''));
        b.type = 'button'; b.setAttribute('data-k', 'umb' + peg); b.setAttribute('data-peg', peg); b.setAttribute('aria-label', self._t('ariaUmb', { p: r.tags[tag] })); b.setAttribute('aria-pressed', st.hung === tag ? 'true' : 'false');
        b.style.setProperty('--np-c', self.PEG_COLORS[peg]);
        b.innerHTML = '<svg class="np-fold" viewBox="0 0 40 96" aria-hidden="true"><path d="M20 4 L32 62 Q20 70 8 62 Z" fill="var(--np-c)" stroke="#2A2A35" stroke-width="3" stroke-linejoin="round"/><path d="M20 66 L20 84 Q20 92 13 90" fill="none" stroke="#2A2A35" stroke-width="4" stroke-linecap="round"/></svg>';
        var t = api.el('span', 'np-tag'); t.textContent = r.tags[tag]; b.appendChild(t);
        b.addEventListener('pointerdown', function (ev) { self._dragStart(ev, 'umb', peg, b); });
        b.addEventListener('click', function (ev) { if (self._suppressClick) { self._suppressClick = false; return; } self._hang(peg); });
        rail.appendChild(b);
      });
      this._body.appendChild(rail);
    }

    var h = C.hint(st), msg = '';
    if (v.msg) msg = v.msg; else if (v.swapped) msg = this._t('swapNote'); else if (h && !this._busy) msg = this._t(h);
    this._note.textContent = msg;
    this._note.className = 'np-note' + (st.done ? ' is-ok' : (h && !this._busy ? ' is-hint' : ''));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy; this._checkBtn.textContent = this._t('check');
  },
  _pad: function (p, under) {
    var st = this.st, r = st.r, api = this.api, self = this, v = this._view, text = p < 3 ? r.pads[p] : r.extra[p - 3].text;
    var wet = (v.rain || v.wetShow) && st.wet.indexOf(p) >= 0;
    var b = api.el('button', 'np-pad' + (p >= 3 ? ' is-new' : '') + (wet ? ' is-wet' : '') + (this._reading === p + 1 ? ' is-reading' : '') + (v.win ? ' is-glow' : '') + (v.drift === p ? ' is-drift' : '') + (v.back && v.back.indexOf(p) >= 0 ? ' is-back' : ''));
    b.type = 'button'; b.setAttribute('data-k', 'pad' + p); b.setAttribute('data-pad', p);
    b.setAttribute('aria-label', this._t('ariaPad', { s: text }) + ', ' + this._t(under ? 'ariaUnder' : 'ariaOut'));
    if (v.win) b.style.animationDelay = (p * 260) + 'ms';
    var s = api.el('span', 'np-padtxt'); s.textContent = text; b.appendChild(s);
    if (st.phase === 'step2' && !st.done) {
      b.addEventListener('pointerdown', function (ev) { self._dragStart(ev, 'pad', p, b); });
      b.addEventListener('click', function () { if (self._suppressClick) { self._suppressClick = false; return; } self._move(p); });
    } else if (!st.done) b.addEventListener('click', function () { self._say(text); });
    else b.addEventListener('click', function () { self._say(text); });
    return b;
  },

  /* ---------------- reading aloud ---------------- */
  _readAll: function () {
    var self = this, st = this.st; if (!st) return;
    var sents = [st.r.lead].concat(st.r.pads), i = 0;
    this._hush();
    var step = function () {
      if (i >= sents.length || !self.st || self.st !== st) { self._reading = -1; self._paint(); return; }
      self._reading = i; self._paint(); self._say(sents[i]);
      var ms = self.FAST ? 30 : 700 + sents[i].length * 62; i++;
      self._readTimer = setTimeout(step, ms);
    };
    step();
  },

  /* ---------------- the hand ---------------- */
  _free: function () { return !(this._busy || this.st.done); },
  _hang: function (peg) {
    var st = this.st, C = NilaPondCore;
    if (!this._free() || st.phase !== 'hang') return;
    if (st.hung === st.rail[peg]) { C.unhang(st); this.api.sound(330); }
    else { C.hang(st, peg); this.api.sound(587); this._view = { open: true }; }
    this._paint();
  },
  _move: function (p) {
    if (!this._free() || this.st.phase !== 'step2') return;
    if (NilaPondCore.move(this.st, p)) { this.api.sound(440); this._view = {}; this._paint(); }
  },
  _dragStart: function (ev, kind, idx, el) {
    if (!this._free() || (ev.button !== undefined && ev.button !== 0)) return;
    var self = this, sx = ev.clientX, sy = ev.clientY, moved = false, ghost = null;
    this._drag = { kind: kind, idx: idx };
    var onMove = function (e) {
      if (!moved && Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) < 10) return;
      if (!moved) { moved = true; ghost = el.cloneNode(true); ghost.className += ' np-ghost'; var rc = el.getBoundingClientRect(); ghost.style.width = rc.width + 'px'; document.body.appendChild(ghost); el.classList.add('is-lifted'); }
      ghost.style.left = (e.clientX - ghost.offsetWidth / 2) + 'px'; ghost.style.top = (e.clientY - ghost.offsetHeight / 2) + 'px';
    };
    var onUp = function (e) {
      document.removeEventListener('pointermove', onMove); document.removeEventListener('pointerup', onUp); document.removeEventListener('pointercancel', onUp);
      self._drag = null;
      if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
      el.classList.remove('is-lifted');
      if (!moved) return;
      self._suppressClick = true; setTimeout(function () { self._suppressClick = false; }, 0);
      var at = document.elementFromPoint(e.clientX, e.clientY);
      if (kind === 'umb') { if (at && self._pond && self._pond.contains(at) && self.st.hung !== self.st.rail[idx]) self._hang(idx); return; }
      var inOpen = at && self._open && self._open.contains(at), inDry = at && self._dry && self._dry.contains(at), isUnder = self.st.under.indexOf(idx) >= 0;
      if ((inOpen && isUnder) || (inDry && !isUnder)) self._move(idx);
    };
    document.addEventListener('pointermove', onMove); document.addEventListener('pointerup', onUp); document.addEventListener('pointercancel', onUp);
  },
  /* ---------------- Check ---------------- */
  _check: function () {
    if (!this._free()) return;
    var self = this, st = this.st, C = NilaPondCore;
    if (st.phase === 'hang') {
      var res = C.check1(st);
      if (res.reason === 'empty') { this.api.sound(460); this._view = { wiggle: true }; this._paint(); this._later(function () { self._view = {}; self._paint(); }, this._ms(600)); return; }
      this._busy = true; this._view = { rain: true }; this.api.sound(res.ok ? 523 : 300); this._paint();
      if (res.ok && !res.step2) return this._later(function () { self._win(); }, this._ms(this.STEP_MS));
      if (res.ok) return this._later(function () {
        self._busy = false; self._view = { drift: st.r.step === 'reject' ? 3 : -1 }; self._setPrompt(); self._paint(); self.api.announce(self._pa.msg || '');
      }, this._ms(this.STEP_MS));
      return this._later(function () {
        self.api.sound(196); self._busy = false;
        if (res.swap) return self._swap();
        C.fold(st); self._view = {}; self._paint(); self.api.announce(self._note.textContent || '');
      }, this._ms(this.MISS_MS));
    }
    var r2 = C.check2(st);
    this._busy = true; this._view = { rain: true, wetShow: true }; this.api.sound(r2.ok ? 523 : 300); this._paint();
    if (r2.ok) return this._later(function () { self._win(); }, this._ms(this.STEP_MS));
    this._later(function () { self.api.sound(196); self._busy = false; self._view = { back: r2.wrongOut }; self._paint(); self.api.announce(self._note.textContent || ''); }, this._ms(this.MISS_MS));
  },
  _win: function () {
    var self = this, pa = this._pa || {}, msg = this.st.r.ok;
    pa.msg = msg; this._busy = true; this._view = { msg: msg, win: true };
    this.api.sound(659); this._later(function () { self.api.sound(784); }, this._ms(110)); this._later(function () { self.api.sound(1046); }, this._ms(220));
    this._paint();
    this._later(function () { self._busy = false; self._paint(); self.api.announce(msg); }, this._ms(500));
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

var npCssDone = false;
function injectNilaCSS() {
  if (npCssDone || typeof document === 'undefined') return;
  npCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.np-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;--np-ink:#2A2A35;--np-teal:#146B5E;--np-coral:#F2784B;--np-cream:#FFF8EC;--np-water:#BFE3F2;--np-deep:#8CCBE6;--np-pad:#7CC27A;--np-padd:#4E9A55;user-select:none;-webkit-user-select:none;}'
  + '.np-wrap:focus{outline:none;} .np-body{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:12px;}'
  /* the card */
  + '.np-card{display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:16px;background:var(--np-cream);box-shadow:inset 0 0 0 3px var(--np-ink),0 4px 0 #D8C9A6;}'
  + '.np-nila{position:relative;flex:none;width:var(--np-nila);height:var(--np-nila);padding:0;border:0;background:transparent;cursor:pointer;border-radius:50%;}'
  + '.np-nila .np-img{width:100%;height:100%;object-fit:contain;display:block;} .np-nila:focus-visible{outline:3px solid var(--np-teal);outline-offset:2px;}'
  + '.np-spk{position:absolute;right:-4px;bottom:2px;width:26px;height:26px;border-radius:50%;background:var(--np-teal);box-shadow:0 0 0 3px #fff;}'
  + '.np-spk::before{content:"";position:absolute;left:6px;top:8px;width:6px;height:10px;background:#fff;clip-path:polygon(0 25%,45% 25%,100% 0,100% 100%,45% 75%,0 75%);}'
  + '.np-spk::after{content:"";position:absolute;left:13px;top:7px;width:7px;height:12px;border:2.5px solid #fff;border-left:0;border-radius:0 10px 10px 0;}'
  + '.np-wrap:not(.is-aloud) .np-spk{background:#9AA7A4;} .np-nila.is-playing .np-spk{animation:npPulse .8s ease-in-out infinite;background:var(--np-coral);}'
  + '.np-nila.is-swim .np-img{animation:npSwim 1.6s ease-in-out 2;}'
  + '.np-lead{flex:1;min-width:0;margin:0;font-family:' + B + ';font-weight:800;font-size:var(--np-lead);line-height:1.3;color:var(--np-ink);border-radius:8px;padding:2px 4px;}'
  + '.np-lead.is-reading{background:#FFE9A8;}'
  + '.np-pic{flex:none;width:var(--np-pic);height:var(--np-pic);} .np-pic .np-img{width:100%;height:100%;object-fit:contain;display:block;}'
  /* the pond */
  + '.np-pond{position:relative;border-radius:22px;padding:0 0 14px;background:linear-gradient(#EAF5FA,#EAF5FA 44px,var(--np-water) 44px);box-shadow:inset 0 0 0 3px #5E9DB8;overflow:hidden;}'
  + '.np-sky{position:relative;height:44px;display:flex;justify-content:center;align-items:flex-start;}'
  + '.np-cloud{position:relative;width:150px;height:38px;margin-top:3px;padding:0;border:0;background:transparent;cursor:pointer;}'
  + '.np-puff{position:absolute;bottom:2px;border-radius:50%;background:#C7CDD3;box-shadow:inset 0 -3px 0 #AEB6BE;} .np-puff0{left:10px;width:46px;height:26px;} .np-puff1{left:38px;width:52px;height:36px;} .np-puff2{left:76px;width:46px;height:30px;} .np-puff3{left:104px;width:36px;height:22px;}'
  + '.np-cloud.is-rain .np-puff{background:#98A3AE;box-shadow:inset 0 -3px 0 #7D8995;}'
  + '.np-bar{position:absolute;left:4%;right:4%;bottom:0;height:5px;border-radius:3px;background:#6B5A48;}'
  + '.np-water{position:relative;padding:0 10px;}'
  + '.np-dry{position:relative;padding-top:var(--np-cap,74px);}'
  + '.np-wrap.is-narrow .np-dry{--np-cap:52px;}'
  + '.np-hook{position:absolute;left:50%;top:-2px;width:14px;height:12px;margin-left:-7px;border:4px solid #6B5A48;border-top:0;border-radius:0 0 8px 8px;}'
  + '.np-hook.is-wiggle{animation:npShake .4s ease 2;}'
  + '.np-canopy{position:absolute;top:6px;height:calc(var(--np-cap,74px) - 4px);padding:0;border:0;background:transparent;cursor:pointer;transition:left .42s cubic-bezier(.3,1.4,.5,1),width .42s cubic-bezier(.3,1.4,.5,1);animation:npOpen .32s cubic-bezier(.3,1.6,.5,1);z-index:2;}'
  + '.np-canopy svg{position:absolute;left:0;top:0;width:100%;height:58%;display:block;overflow:visible;}'
  + '.np-handle{position:absolute;left:50%;top:50%;width:4px;height:16%;margin-left:-2px;background:#2A2A35;border-radius:2px;}'
  + '.np-hangtag{position:absolute;left:50%;bottom:0;transform:translateX(-50%);max-width:min(96%,320px);padding:2px 10px;border-radius:8px;background:#fff;box-shadow:inset 0 0 0 2px var(--np-ink);font-family:' + B + ';font-weight:800;font-size:14px;line-height:1.2;color:var(--np-ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}'
  + '.np-canopy.is-folded .np-hangtag{max-width:none;}'
  + '.np-canopy.is-twirl svg{animation:npTwirl .6s ease;}'
  + '.np-pads{position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:6px 0 4px;}'
  + '.np-pad{position:relative;min-height:62px;padding:13px 10px 11px;border:0;border-radius:46% 46% 40% 40% / 42% 42% 50% 50%;background:var(--np-pad);box-shadow:inset 0 0 0 3px var(--np-padd),0 3px 0 #3D7F44;cursor:pointer;touch-action:none;display:flex;align-items:center;justify-content:center;text-align:center;}'
  + '.np-pad::before{content:"";position:absolute;left:50%;top:-1px;width:10px;height:11px;margin-left:-5px;background:var(--np-water);clip-path:polygon(0 0,100% 0,50% 100%);}'
  + '.np-padtxt{hyphens:auto;-webkit-hyphens:auto;overflow-wrap:break-word;font-family:' + B + ';font-weight:800;font-size:var(--np-pad);line-height:1.25;color:#173B1C;transition:filter .3s,color .3s;}'
  + '.np-pad.is-new{background:#A6D49A;} .np-pad:focus-visible{outline:3px solid var(--np-teal);outline-offset:3px;}'
  + '.np-pad.is-wet{animation:npBob 1.6s ease;background:#8FB48E;} .np-pad.is-wet .np-padtxt{filter:blur(1.4px);color:#365A3A;}'
  + '.np-pad.is-reading{box-shadow:inset 0 0 0 4px #E8B83A,0 3px 0 #3D7F44;}'
  + '.np-pad.is-glow{animation:npGlow 1.2s ease both;} .np-pad.is-drift{animation:npDrift .9s ease-out both;} .np-pad.is-back{animation:npBack .7s ease-out both;}'
  + '.np-pad.is-lifted{opacity:.35;} .np-ghost{position:fixed;z-index:9999;pointer-events:none;opacity:.92;transform:rotate(-3deg);margin:0;}'
  + '.np-open{min-height:76px;margin-top:10px;padding:10px;border-radius:16px;background:repeating-linear-gradient(170deg,var(--np-deep) 0 10px,#9DD4EA 10px 20px);display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center;box-shadow:inset 0 0 0 2px #6FB2CF;}'
  + '.np-open .np-pad{flex:0 1 calc(33.3% - 10px);min-width:120px;}'
  + '.np-wrap.is-step2 .np-pads{grid-template-columns:repeat(3,1fr);}'
  + '.np-rain{position:absolute;left:10px;right:10px;top:40px;bottom:0;pointer-events:none;z-index:3;}'
  + '.np-drop{position:absolute;top:0;width:3px;height:14px;margin-left:-1px;border-radius:2px;background:#3E86B5;animation:npFall .7s linear infinite;}'
  + '.np-drop.is-short{animation-name:npFallShort;}'
  /* the rail */
  + '.np-rail{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;} .np-rail3{grid-template-columns:repeat(3,1fr);}'
  + '.np-wrap.is-narrow .np-rail{grid-template-columns:repeat(2,1fr);}'
  + '.np-umb{position:relative;display:flex;align-items:center;gap:8px;min-height:64px;padding:6px 10px 6px 6px;border:0;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 3px var(--np-c),0 3px 0 #D8C9A6;cursor:grab;touch-action:none;text-align:left;}'
  + '.np-fold{flex:none;width:22px;height:52px;}'
  + '.np-tag{hyphens:auto;-webkit-hyphens:auto;overflow-wrap:break-word;font-family:' + B + ';font-weight:800;font-size:var(--np-tag);line-height:1.22;color:var(--np-ink);}'
  + '.np-umb.is-hung{background:#F4F1EA;box-shadow:inset 0 0 0 3px var(--np-c),inset 0 0 0 6px #fff,0 0 0 2px var(--np-ink);} .np-umb.is-hung .np-fold{opacity:.25;}'
  + '.np-umb.is-tried .np-fold{filter:saturate(.5);} .np-umb.is-dim{opacity:.4;}'
  + '.np-umb:focus-visible{outline:3px solid var(--np-teal);outline-offset:2px;} .np-umb.is-lifted{opacity:.35;}'
  + '.np-row{display:flex;justify-content:center;}'
  + '.np-check{min-width:150px;min-height:52px;padding:8px 26px;border:0;border-radius:999px;background:var(--np-teal);color:#fff;font-family:' + D + ';font-weight:800;font-size:22px;cursor:pointer;box-shadow:0 4px 0 #0D4A41;}'
  + '.np-check:disabled{opacity:.55;cursor:default;} .np-check:focus-visible{outline:3px solid var(--np-coral);outline-offset:3px;}'
  + '.np-note{margin:0;min-height:1.4em;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.35;color:var(--np-ink);max-width:640px;}'
  + '.np-note.is-hint{color:#9A3D17;} .np-note.is-ok{color:var(--np-teal);}'
  + '.np-wrap.is-narrow .np-note{font-size:17px;} .np-wrap.is-narrow .np-check{min-height:48px;font-size:20px;}'
  + '.np-wrap.is-narrow .np-card{padding:8px 10px;gap:8px;} .np-wrap.is-narrow .np-pads{gap:6px;} .np-wrap.is-narrow .np-water{padding:0 6px;}'
  + '.np-wrap.is-narrow .np-pad{padding:11px 5px 8px;min-height:54px;}'
  + '.np-wrap.is-narrow .np-body{gap:10px;} .np-wrap.is-narrow .np-sky{height:38px;} .np-wrap.is-narrow .np-pond{background:linear-gradient(#EAF5FA,#EAF5FA 38px,var(--np-water) 38px);} .np-wrap.is-narrow .np-cloud{transform:scale(.8);transform-origin:50% 0;margin-top:2px;}'
  + '.np-wrap.is-narrow .np-rail{gap:8px;} .np-wrap.is-narrow .np-umb{min-height:52px;padding:4px 8px 4px 4px;} .np-wrap.is-narrow .np-fold{width:18px;height:44px;} .np-wrap.is-narrow .np-rain{top:34px;} .np-wrap.is-narrow .np-open .np-pad{min-width:96px;}'
  + '.np-wrap.is-tiny .np-card{padding:5px 8px;} .np-wrap.is-tiny .np-pond{padding-bottom:8px;} .np-wrap.is-tiny .np-pad{min-height:50px;} .np-wrap.is-tiny .np-umb{min-height:48px;} .np-wrap.is-tiny .np-tag{font-size:14px;} .np-wrap.is-tiny .np-check{min-height:46px;} .np-wrap.is-tiny .np-dry{--np-cap:48px;}'
  + '.np-wrap.is-tiny .np-body{gap:7px;} .np-wrap.is-tiny .np-sky{height:24px;} .np-wrap.is-tiny .np-pond{background:linear-gradient(#EAF5FA,#EAF5FA 24px,var(--np-water) 24px);} .np-wrap.is-tiny .np-cloud{transform:scale(.5);margin-top:0;} .np-wrap.is-tiny .np-rain{top:20px;} .np-wrap.is-tiny .np-rail{gap:6px;} .np-wrap.is-tiny .np-row{margin-top:-2px;}'
  + '.np-wrap.is-tiny .np-nila{display:none;} .np-wrap.is-tiny .np-water{padding:0 4px;} .np-wrap.is-tiny .np-pad{padding:9px 2px 7px;} .np-wrap.is-tiny .np-padtxt{line-height:1.18;} .np-wrap.is-tiny .np-tag{line-height:1.15;} .np-wrap.is-tiny .np-umb{gap:5px;padding:3px 6px 3px 3px;} .np-wrap.is-tiny .np-fold{width:14px;height:38px;} .np-wrap.is-tiny .np-open{margin-top:6px;padding:6px;gap:6px;min-height:60px;}'
  + '.np-wrap.is-tiny .np-pic{display:none;} .np-wrap.is-tiny .np-pads{gap:4px;} .np-wrap.is-tiny .np-pad{padding:8px 3px 10px;}'
  + '@keyframes npOpen{0%{transform:scaleX(.15) scaleY(.6);opacity:.3}100%{transform:none;opacity:1}}'
  + '@keyframes npTwirl{0%{transform:rotate(0)}50%{transform:rotate(-8deg) scaleX(.9)}100%{transform:rotate(0)}}'
  + '@keyframes npFall{0%{transform:translateY(0);opacity:0}10%{opacity:1}100%{transform:translateY(190px);opacity:.2}}'
  + '@keyframes npFallShort{0%{transform:translateY(0);opacity:0}10%{opacity:1}70%{transform:translateY(26px);opacity:1}100%{transform:translateY(30px) translateX(10px);opacity:0}}'
  + '@keyframes npBob{0%,100%{transform:translateY(0)}35%{transform:translateY(7px) scale(.98)}70%{transform:translateY(-2px)}}'
  + '@keyframes npGlow{0%{box-shadow:inset 0 0 0 3px var(--np-padd),0 3px 0 #3D7F44}50%{box-shadow:inset 0 0 0 5px #FFE45C,0 0 18px #FFE45C}100%{box-shadow:inset 0 0 0 3px var(--np-padd),0 3px 0 #3D7F44}}'
  + '@keyframes npDrift{0%{transform:translateY(60px) scale(.8);opacity:0}100%{transform:none;opacity:1}}'
  + '@keyframes npBack{0%{transform:translateY(40px);opacity:.4}100%{transform:none;opacity:1}}'
  + '@keyframes npSwim{0%,100%{transform:translate(0,0) rotate(0)}30%{transform:translate(10px,6px) rotate(-10deg)}60%{transform:translate(-6px,4px) rotate(8deg)}}'
  + '@keyframes npPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}'
  + '@keyframes npShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}'
  + '.np-wrap.is-fast *,.np-wrap.is-fast *::before,.np-wrap.is-fast *::after{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.np-wrap *{animation-duration:.2s !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'np-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.NilaPondActivity = NilaPondActivity;
