/* =====================================================================
   picture-story-activity.js — ACTIVITY #63 of the one-by-one rebuild:
   "Fable's Picture Stories" → THE BOOKMARK (RL.K.1, 11 locales).
   Design sheet: docs/activities-rebuild/designs/063-picture-story.md
   ---------------------------------------------------------------------
   THE INVENTION: the answer is in the book. A little picture book lies
   open (library pictures on drawn pages, a caption under each page). Ask
   the book: the question is printed on a ribbon bookmark; the child slips
   the bookmark into the story — onto a picture, a phrase of a caption, or
   a whole page — and presses Check. The tag's answer line fills with what
   was marked; a right answer glows, the proving words get a gold
   underline and Fable the fox hops onto that page. Caption the pages: the
   bookmark carries a sentence; slipped into a page, the page acts out
   what it shows — only the right page does what the sentence says.

   ACTIVITY LAYER ONLY: the model is picture-story-core.js; lcs-shell.js
   is untouched (its Check is hidden and pressed by this activity on
   success). Test seams: window.PictureStoryActivity.st / ._order / ._pool
   / .FAST / ._page.
   ===================================================================== */
'use strict';

var PictureStoryActivity = {
  id: 'picture-story',
  apparatusClasses: ['pst-'],

  strings: {
    title:        {en:'Fable’s Picture Stories',de:'Fables Bilderbücher',nl:'Fabels prentenboekjes',da:'Fables billedbøger',sv:'Fables bilderböcker',no:'Fables bildebøker',es:'Los cuentos ilustrados de Fable',it:'I libri illustrati di Fabio',pt:'As histórias ilustradas do Fábio',fr:'Les albums de Fable',fi:'Fablen kuvakirjat'},
    instrAsk:     {en:'Read the story. Slip the bookmark onto the answer.',de:'Lies die Geschichte. Leg das Lesezeichen auf die Antwort.',nl:'Lees het verhaal. Steek de bladwijzer bij het antwoord.',da:'Læs historien. Sæt bogmærket på svaret.',sv:'Läs berättelsen. Sätt bokmärket på svaret.',no:'Les fortellingen. Sett bokmerket på svaret.',es:'Lee el cuento. Pon el separador en la respuesta.',it:'Leggi la storia. Metti il segnalibro sulla risposta.',pt:'Leia a história. Coloque o marcador na resposta.',fr:'Lis l’histoire. Glisse le marque-page sur la réponse.',fi:'Lue tarina. Laita kirjanmerkki vastauksen kohdalle.'},
    instrCap:     {en:'Read the bookmark. Slip it into the page it tells about.',de:'Lies das Lesezeichen. Steck es in die Seite, von der es erzählt.',nl:'Lees de bladwijzer. Steek hem in de bladzijde waar hij over vertelt.',da:'Læs bogmærket. Sæt det i den side, det fortæller om.',sv:'Läs bokmärket. Sätt det i sidan som det berättar om.',no:'Les bokmerket. Sett det i siden det forteller om.',es:'Lee el separador. Ponlo en la página de la que habla.',it:'Leggi il segnalibro. Mettilo nella pagina di cui parla.',pt:'Leia o marcador. Coloque-o na página de que ele fala.',fr:'Lis le marque-page. Glisse-le dans la page dont il parle.',fi:'Lue kirjanmerkki. Laita se sille sivulle, josta se kertoo.'},
    check:        {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kolla',no:'Sjekk',es:'Revisar',it:'Controlla',pt:'Conferir',fr:'Vérifier',fi:'Tarkista'},
    hintEmpty:    {en:'Slip the bookmark into the story.',de:'Steck das Lesezeichen in die Geschichte.',nl:'Steek de bladwijzer in het verhaal.',da:'Sæt bogmærket i historien.',sv:'Sätt bokmärket i berättelsen.',no:'Sett bokmerket i fortellingen.',es:'Pon el separador en el cuento.',it:'Metti il segnalibro nella storia.',pt:'Coloque o marcador na história.',fr:'Glisse le marque-page dans l’histoire.',fi:'Laita kirjanmerkki tarinaan.'},
    hintMiss:     {en:'Read the page again. Does it say that?',de:'Lies die Seite noch einmal. Steht das da?',nl:'Lees de bladzijde nog eens. Staat dat er?',da:'Læs siden igen. Står der det?',sv:'Läs sidan igen. Står det så?',no:'Les siden igjen. Står det det?',es:'Vuelve a leer la página. ¿Dice eso?',it:'Rileggi la pagina. C’è scritto questo?',pt:'Leia a página de novo. Está escrito isso?',fr:'Relis la page. Est-ce que c’est écrit ?',fi:'Lue sivu uudelleen. Lukeeko siinä niin?'},
    hintMiss2:    {en:'Find the question’s words in the story. The answer is on that page.',de:'Such die Wörter der Frage in der Geschichte. Die Antwort steht auf dieser Seite.',nl:'Zoek de woorden van de vraag in het verhaal. Het antwoord staat op die bladzijde.',da:'Find spørgsmålets ord i historien. Svaret står på den side.',sv:'Hitta frågans ord i berättelsen. Svaret står på den sidan.',no:'Finn ordene fra spørsmålet i fortellingen. Svaret står på den siden.',es:'Busca las palabras de la pregunta en el cuento. La respuesta está en esa página.',it:'Cerca le parole della domanda nella storia. La risposta è su quella pagina.',pt:'Procure as palavras da pergunta na história. A resposta está nessa página.',fr:'Cherche les mots de la question dans l’histoire. La réponse est sur cette page.',fi:'Etsi kysymyksen sanat tarinasta. Vastaus on sillä sivulla.'},
    hintMissPage: {en:'Read the pages in order. Which page tells that part?',de:'Lies die Seiten der Reihe nach. Welche Seite erzählt das?',nl:'Lees de bladzijden op volgorde. Welke bladzijde vertelt dat?',da:'Læs siderne i rækkefølge. Hvilken side fortæller det?',sv:'Läs sidorna i ordning. Vilken sida berättar det?',no:'Les sidene i rekkefølge. Hvilken side forteller det?',es:'Lee las páginas en orden. ¿Qué página cuenta esa parte?',it:'Leggi le pagine in ordine. Quale pagina racconta quella parte?',pt:'Leia as páginas em ordem. Qual página conta essa parte?',fr:'Lis les pages dans l’ordre. Quelle page raconte ce moment ?',fi:'Lue sivut järjestyksessä. Mikä sivu kertoo siitä?'},
    hintMiss2Page:{en:'Look at the page that lifts up. Read it again.',de:'Schau dir die Seite an, die sich hebt. Lies sie noch einmal.',nl:'Kijk naar de bladzijde die omhoog komt. Lees hem nog eens.',da:'Se på siden, der løfter sig. Læs den igen.',sv:'Titta på sidan som lyfter sig. Läs den igen.',no:'Se på siden som løfter seg. Les den igjen.',es:'Mira la página que se levanta. Vuelve a leerla.',it:'Guarda la pagina che si solleva. Rileggila.',pt:'Olhe a página que se levanta. Leia de novo.',fr:'Regarde la page qui se soulève. Relis-la.',fi:'Katso sivua, joka nousee. Lue se uudelleen.'},
    capEmpty:     {en:'Slip the sentence into a page.',de:'Steck den Satz in eine Seite.',nl:'Steek de zin in een bladzijde.',da:'Sæt sætningen i en side.',sv:'Sätt meningen i en sida.',no:'Sett setningen i en side.',es:'Pon la oración en una página.',it:'Metti la frase in una pagina.',pt:'Coloque a frase em uma página.',fr:'Glisse la phrase dans une page.',fi:'Laita lause jollekin sivulle.'},
    capMiss1:     {en:'Watch the page: does it do what the bookmark says?',de:'Schau dir die Seite an: Macht sie, was auf dem Lesezeichen steht?',nl:'Kijk naar de bladzijde: doet die wat op de bladwijzer staat?',da:'Se på siden: Gør den det, der står på bogmærket?',sv:'Titta på sidan: gör den det som står på bokmärket?',no:'Se på siden: gjør den det som står på bokmerket?',es:'Mira la página: ¿hace lo que dice el separador?',it:'Guarda la pagina: fa quello che dice il segnalibro?',pt:'Olhe a página: ela faz o que o marcador diz?',fr:'Regarde la page : fait-elle ce que dit le marque-page ?',fi:'Katso sivua: tekeekö se sen, mitä kirjanmerkissä lukee?'},
    capMiss2:     {en:'Watch every page. Which one does what the sentence says?',de:'Schau dir alle Seiten an. Welche macht, was der Satz sagt?',nl:'Kijk naar alle bladzijden. Welke doet wat de zin zegt?',da:'Se på alle siderne. Hvilken gør det, sætningen siger?',sv:'Titta på alla sidor. Vilken gör det som meningen säger?',no:'Se på alle sidene. Hvilken gjør det setningen sier?',es:'Mira todas las páginas. ¿Cuál hace lo que dice la oración?',it:'Guarda tutte le pagine. Quale fa quello che dice la frase?',pt:'Olhe todas as páginas. Qual faz o que a frase diz?',fr:'Regarde toutes les pages. Laquelle fait ce que dit la phrase ?',fi:'Katso kaikkia sivuja. Mikä niistä tekee sen, mitä lause sanoo?'},
    capRight:     {en:'Right page! Here comes the next sentence.',de:'Richtige Seite! Hier kommt der nächste Satz.',nl:'Goede bladzijde! Hier komt de volgende zin.',da:'Rigtig side! Her kommer den næste sætning.',sv:'Rätt sida! Här kommer nästa mening.',no:'Riktig side! Her kommer neste setning.',es:'¡Página correcta! Aquí viene la siguiente oración.',it:'Pagina giusta! Ecco la frase successiva.',pt:'Página certa! Lá vem a próxima frase.',fr:'Bonne page ! Voici la phrase suivante.',fi:'Oikea sivu! Tässä tulee seuraava lause.'},
    okAsk:        {en:'{q} — {a}. It’s right there in the story!',de:'{q} – {a}. Das steht in der Geschichte!',nl:'{q} – {a}. Het staat gewoon in het verhaal!',da:'{q} – {a}. Det står lige der i historien!',sv:'{q} – {a}. Det står precis där i berättelsen!',no:'{q} – {a}. Det står akkurat der i fortellingen!',es:'{q} — {a}. ¡Ahí lo dice el cuento!',it:'{q} — {a}. È scritto proprio nella storia!',pt:'{q} — {a}. Está escrito bem ali na história!',fr:'{q} — {a}. C’est écrit dans l’histoire !',fi:'{q} – {a}. Niin tarinassa lukee!'},
    okCap:        {en:'Every sentence matches its picture!',de:'Jeder Satz passt zu seinem Bild!',nl:'Elke zin past bij zijn plaatje!',da:'Hver sætning passer til sit billede!',sv:'Varje mening passar till sin bild!',no:'Hver setning passer til bildet sitt!',es:'¡Cada oración va con su dibujo!',it:'Ogni frase va con il suo disegno!',pt:'Cada frase combina com a sua figura!',fr:'Chaque phrase va avec son image !',fi:'Jokainen lause sopii kuvaansa!'},
    okBubble:     {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    setMode:      {en:'Game',de:'Spiel',nl:'Spel',da:'Spil',sv:'Spel',no:'Spill',es:'Juego',it:'Gioco',pt:'Jogo',fr:'Jeu',fi:'Peli'},
    mAsk:         {en:'Ask the book',de:'Frag das Buch',nl:'Vraag het boek',da:'Spørg bogen',sv:'Fråga boken',no:'Spør boka',es:'Pregúntale al libro',it:'Chiedi al libro',pt:'Pergunte ao livro',fr:'Interroge le livre',fi:'Kysy kirjalta'},
    mCap:         {en:'Caption the pages',de:'Sätze zu den Seiten',nl:'Zinnen bij de bladzijden',da:'Sætninger til siderne',sv:'Meningar till sidorna',no:'Setninger til sidene',es:'Oraciones para las páginas',it:'Frasi per le pagine',pt:'Frases para as páginas',fr:'Des phrases pour les pages',fi:'Lauseet sivuille'},
    setPages:     {en:'Book',de:'Buch',nl:'Boek',da:'Bog',sv:'Bok',no:'Bok',es:'Libro',it:'Libro',pt:'Livro',fr:'Livre',fi:'Kirja'},
    pg3:          {en:'3 pages',de:'3 Seiten',nl:'3 bladzijden',da:'3 sider',sv:'3 sidor',no:'3 sider',es:'3 páginas',it:'3 pagine',pt:'3 páginas',fr:'3 pages',fi:'3 sivua'},
    pg4:          {en:'4 pages',de:'4 Seiten',nl:'4 bladzijden',da:'4 sider',sv:'4 sidor',no:'4 sider',es:'4 páginas',it:'4 pagine',pt:'4 páginas',fr:'4 pages',fi:'4 sivua'},
    ariaPage:     {en:'Page {n}: {caption}',de:'Seite {n}: {caption}',nl:'Bladzijde {n}: {caption}',da:'Side {n}: {caption}',sv:'Sida {n}: {caption}',no:'Side {n}: {caption}',es:'Página {n}: {caption}',it:'Pagina {n}: {caption}',pt:'Página {n}: {caption}',fr:'Page {n} : {caption}',fi:'Sivu {n}: {caption}'},
    ariaThing:    {en:'{label}, page {n}',de:'{label}, Seite {n}',nl:'{label}, bladzijde {n}',da:'{label}, side {n}',sv:'{label}, sida {n}',no:'{label}, side {n}',es:'{label}, página {n}',it:'{label}, pagina {n}',pt:'{label}, página {n}',fr:'{label}, page {n}',fi:'{label}, sivu {n}'},
    ariaPhrase:   {en:'{text}, page {n}',de:'{text}, Seite {n}',nl:'{text}, bladzijde {n}',da:'{text}, side {n}',sv:'{text}, sida {n}',no:'{text}, side {n}',es:'{text}, página {n}',it:'{text}, pagina {n}',pt:'{text}, página {n}',fr:'{text}, page {n}',fi:'{text}, sivu {n}'},
    ariaEdge:     {en:'The whole page {n}',de:'Die ganze Seite {n}',nl:'De hele bladzijde {n}',da:'Hele side {n}',sv:'Hela sidan {n}',no:'Hele side {n}',es:'Toda la página {n}',it:'Tutta la pagina {n}',pt:'A página {n} inteira',fr:'Toute la page {n}',fi:'Koko sivu {n}'},
    ariaTag:      {en:'Bookmark: {q}',de:'Lesezeichen: {q}',nl:'Bladwijzer: {q}',da:'Bogmærke: {q}',sv:'Bokmärke: {q}',no:'Bokmerke: {q}',es:'Separador: {q}',it:'Segnalibro: {q}',pt:'Marcador: {q}',fr:'Marque-page : {q}',fi:'Kirjanmerkki: {q}'},
    ariaPrev:     {en:'Previous page',de:'Vorige Seite',nl:'Vorige bladzijde',da:'Forrige side',sv:'Förra sidan',no:'Forrige side',es:'Página anterior',it:'Pagina precedente',pt:'Página anterior',fr:'Page précédente',fi:'Edellinen sivu'},
    ariaNext:     {en:'Next page',de:'Nächste Seite',nl:'Volgende bladzijde',da:'Næste side',sv:'Nästa sida',no:'Neste side',es:'Página siguiente',it:'Pagina successiva',pt:'Próxima página',fr:'Page suivante',fi:'Seuraava sivu'},
    ariaSlot:     {en:'Empty line, page {n}',de:'Leere Zeile, Seite {n}',nl:'Lege regel, bladzijde {n}',da:'Tom linje, side {n}',sv:'Tom rad, sida {n}',no:'Tom linje, side {n}',es:'Renglón vacío, página {n}',it:'Riga vuota, pagina {n}',pt:'Linha vazia, página {n}',fr:'Ligne vide, page {n}',fi:'Tyhjä rivi, sivu {n}'}
  },

  defaults: { mode: 'ask', pages: '3' },
  settings: [
    { key: 'mode', type: 'choice', labelKey: 'setMode', options: [{ value: 'ask', labelKey: 'mAsk' }, { value: 'caption', labelKey: 'mCap' }] },
    { key: 'pages', type: 'choice', labelKey: 'setPages', options: [{ value: '3', labelKey: 'pg3' }, { value: '4', labelKey: 'pg4' }] }
  ],

  OK_MS: 3200, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._page = 1; this._drag = null; this._pa = {};
    injectStoryCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () { if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); } else if (this._wrap) this._paint(); },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return PictureStoryCore.locale(((this.api && this.api.lang) || 'en').slice(0, 2)); },
  _mode: function () { return this._set('mode') === 'caption' ? 'caption' : 'ask'; },
  _n: function () { return String(this._set('pages')) === '4' ? 4 : 3; },
  _key: function () { return this._loc() + '/' + this._mode() + '/' + this._n(); },
  _say: function (text) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'sentence', text: text, lang: this._loc(), rate: 0.9 }); } catch (e) {} },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { this._pool = PictureStoryCore.rounds(this._loc(), this._mode(), this._n()); this._poolKey = k; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = PictureStoryCore;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); }
    var r = pool[this._order[index % n]], pa = { msg: '' }; this._pa = pa;
    var ord = r.mode === 'caption' ? C.sentenceOrder(r.n, Math.random) : null;
    return {
      id: 'picture-story.' + r.loc + '.' + r.id, promptKey: r.mode === 'caption' ? 'instrCap' : 'instrAsk', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._busy = false; tool._view = {}; tool._drag = null; tool._page = 1;
        var bk = C.book(r.loc, r.story, r.n);
        tool.st = r.mode === 'caption' ? C.newCap(r, bk, ord) : C.newAsk(r, bk);
        if (r.mode === 'caption') tool._page = tool._firstFree();
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = PictureStoryCore, r0 = C.askRounds(this._loc(), 3)[0]; this.st = C.newAsk(r0, C.book(r0.loc, r0.story, 3)); }
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
    var wrap = api.el('div', 'pst-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    this._head = api.el('div', 'pst-head'); wrap.appendChild(this._head);
    this._bookEl = api.el('div', 'pst-book'); wrap.appendChild(this._bookEl);
    this._row = api.el('div', 'pst-row'); wrap.appendChild(this._row);
    var note = api.el('p', 'pst-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    var chk = api.el('button', 'pst-check'); chk.type = 'button'; chk.setAttribute('data-k', 'check');
    chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk;
    wrap.addEventListener('keydown', function (ev) { if (ev.key === ' ' && ev.target === wrap) { ev.preventDefault(); self._check(); } });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-tid')) sel = '[data-tid="' + a.getAttribute('data-tid') + '"]';
    else if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx || this._wrap).focus(); }
  },
  _paint_: function () {
    if (!this._bookEl) return;
    var st = this.st, C = PictureStoryCore, r = st.r, v = this._view, bk = st.book;
    var L = this._L = C.layout(this._width(), bk.n);
    this._wrap.className = 'pst-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + (L.W < 330 ? ' is-tiny' : '') + ' is-' + r.mode + ' is-n' + bk.n + (this.FAST ? ' is-fast' : '');
    this._wrap.style.setProperty('--pst-cols', L.cols); this._wrap.style.setProperty('--pst-scene', L.sceneH + 'px'); this._wrap.style.setProperty('--pst-unit', L.unit + 'px'); this._wrap.style.setProperty('--pst-fable', L.fable + 'px');
    var help = C.helpOf(st);
    this._bookEl.innerHTML = '';
    for (var p = 1; p <= bk.n; p++) { if (p !== this._page) continue; this._bookEl.appendChild(this._pageEl(bk.pages[p - 1], help)); }
    this._paintHead(L);
    this._paintRow();
    var h = C.hint(st), msg = '';
    if (st.done) msg = v.msg || '';
    else if (v.placed) msg = this._t('capRight');
    else if (h && !this._busy) msg = this._t(h);
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!(st.done || v.placed));
    this._note.classList.toggle('is-wrong', !!(!st.done && !v.placed && st.show && st.last && st.last.result === 'wrong'));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
    this._checkBtn.textContent = this._t('check');
  },
  /* one page of the book: (ask) the page edge, the scene with its pictures, the caption with its phrases; (caption) the whole page is the target and its caption line is empty until its sentence lands */
  _pageEl: function (pg, help) {
    var self = this, st = this.st, r = st.r, v = this._view, api = this.api, ask = r.mode !== 'caption';
    var proof = st.done && ask && pg.i === r.page;
    var cls = 'pst-page' + (help && help.curl === pg.i ? ' is-curl' : '') + (help && help.pulse === pg.i ? ' is-pulse' : '') + (proof ? ' is-proof' : '') + (v.act && v.act.indexOf(pg.i) >= 0 ? ' is-act' : '') + (st.mark === 'p' + pg.i || (!ask && st.mark === pg.i) ? ' is-marked' : '') + (v.hover === 'p' + pg.i ? ' is-hover' : '');
    var page = api.el(ask ? 'div' : 'button', cls); page.setAttribute('data-p', pg.i);
    if (!ask) {
      page.type = 'button'; page.setAttribute('data-tid', 'p' + pg.i);
      if (st.placed[pg.i]) page.disabled = true;
      page.setAttribute('aria-label', st.placed[pg.i] ? this._t('ariaPage', { n: pg.i, caption: pg.caption.text }) : this._t('ariaSlot', { n: pg.i }));
      page.addEventListener('click', function () { self._mark('p' + pg.i); });
    }
    /* the page edge: dots, not numerals; in Ask it is the "whole page" target */
    var edge = api.el(ask ? 'button' : 'span', 'pst-edge' + (st.mark === 'p' + pg.i ? ' is-marked' : ''));
    if (ask) { edge.type = 'button'; edge.setAttribute('data-tid', 'p' + pg.i); edge.setAttribute('aria-label', this._t('ariaEdge', { n: pg.i })); edge.addEventListener('click', function () { self._mark('p' + pg.i); }); }
    for (var d = 0; d < pg.i; d++) edge.appendChild(api.el('span', 'pst-dot'));
    if (st.mark === 'p' + pg.i) edge.appendChild(this._ribbon());
    page.appendChild(edge);
    var scene = api.el('div', 'pst-scene pst-sky-' + pg.sky + ' pst-ground-' + pg.ground);
    scene.addEventListener('click', function (ev) { if (ask && ev.target === scene) self._play(pg.i); });
    pg.things.forEach(function (t) {
      var tid = 't' + pg.i + '-' + t.i, size = 'calc(var(--pst-unit) * ' + t.s + ')';
      var b = api.el(ask ? 'button' : 'span', 'pst-thing' + (t.act ? ' pst-a-' + t.act : '') + (st.mark === tid ? ' is-marked' : '') + (proof && st.last && st.last.target === tid ? ' is-win' : '') + (v.hover === tid ? ' is-hover' : '') + (v.shrug === tid ? ' is-shrug' : ''));
      var on = t.on ? pg.things[t.on[0]] : null;
      b.style.left = (on ? on.x : t.x) + '%'; b.style.top = on ? 'calc(' + on.y + '% - var(--pst-unit) * ' + (on.s * t.on[1]) + ')' : t.y + '%'; b.style.setProperty('--sz', size);
      if (ask) { b.type = 'button'; b.setAttribute('data-tid', tid); b.setAttribute('aria-label', self._t('ariaThing', { label: t.label, n: pg.i })); b.addEventListener('click', function (ev) { ev.stopPropagation(); self._mark(tid); }); }
      var im = api.el('img', 'pst-img'); im.alt = ''; im.draggable = false; im.src = self._pic(t.pic); b.appendChild(im);
      if (st.mark === tid) b.appendChild(self._ribbon());
      scene.appendChild(b);
    });
    page.appendChild(scene);
    var cap = api.el('p', 'pst-cap');
    if (ask) {
      var lit = help && help.curl === pg.i ? help.words : [];
      pg.caption.segs.forEach(function (s) {
        if (s.k === undefined) { self._words(cap, s.t, lit); return; }
        var tid = 'f' + pg.i + '-' + s.k;
        var b = api.el('span', 'pst-phrase' + (st.mark === tid ? ' is-marked' : '') + (proof && (st.r.kind !== 'phrase' || (st.last && st.last.target === tid)) ? ' is-proofline' : '') + (v.hover === tid ? ' is-hover' : '') + (v.shrug === tid ? ' is-shrug' : ''));
        b.setAttribute('role', 'button'); b.tabIndex = 0; b.setAttribute('data-tid', tid); b.setAttribute('aria-label', self._t('ariaPhrase', { text: s.t, n: pg.i }));
        b.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); self._mark(tid); } });
        self._words(b, s.t, lit);
        b.addEventListener('click', function () { self._mark(tid); });
        cap.appendChild(b);
      });
      if (proof && st.r.kind !== 'phrase') cap.classList.add('is-proofall');
    } else if (st.placed[pg.i]) { cap.textContent = pg.caption.text; cap.classList.add('is-filled'); }
    else { cap.classList.add('is-slot'); cap.appendChild(api.el('span', 'pst-slotline')); }
    page.appendChild(cap);
    return page;
  },
  /* caption text as word spans, so miss 2 can light the words that repeat the question */
  _words: function (el, text, lit) {
    var parts = String(text).split(/(\s+)/);
    parts.forEach(function (w) {
      if (!w) return;
      if (/^\s+$/.test(w)) { el.appendChild(document.createTextNode(w)); return; }
      var core = w.normalize('NFC').toLocaleLowerCase().replace(/[^\p{L}\p{N}’'-]+/gu, '');
      var sp = document.createElement('span'); sp.textContent = w; if (lit && core && lit.indexOf(core) >= 0) sp.className = 'is-help';
      el.appendChild(sp);
    });
  },
  _ribbon: function () {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('class', 'pst-ribbon'); s.setAttribute('viewBox', '0 0 24 40'); s.setAttribute('aria-hidden', 'true');
    s.innerHTML = '<path d="M4 0h16v34l-8-7-8 7z" fill="#F2784B" stroke="#2A2A35" stroke-width="2"/>';
    return s;
  },
  /* the head: Fable and the book's title; on phones the page arrows sit either side of it */
  _paintHead: function (L) {
    var el = this._head, self = this, n = this.st.book.n, v = this._view; el.innerHTML = '';
    var fx = this.api.el('img', 'pst-fable' + (v.shrugFable ? ' is-shrug' : '') + (v.fable ? ' is-hop' : '')); fx.alt = ''; fx.src = this._pic(PictureStoryCore.FABLE); fx.draggable = false;
    var ttl = this.api.el('span', 'pst-title'); ttl.textContent = this.st.book.title;
    var prev = this.api.el('button', 'pst-navbtn'); prev.type = 'button'; prev.setAttribute('data-k', 'prev'); prev.setAttribute('aria-label', this._t('ariaPrev')); prev.textContent = '‹'; prev.disabled = this._page <= 1;
    prev.addEventListener('click', function () { self._go(self._page - 1); }); el.appendChild(prev);
    var mid = this.api.el('span', 'pst-headmid'); mid.appendChild(fx); mid.appendChild(ttl); el.appendChild(mid);
    var next = this.api.el('button', 'pst-navbtn'); next.type = 'button'; next.setAttribute('data-k', 'next'); next.setAttribute('aria-label', this._t('ariaNext')); next.textContent = '›'; next.disabled = this._page >= n;
    next.addEventListener('click', function () { self._go(self._page + 1); }); el.appendChild(next);
  },
  _go: function (p) { var n = this.st.book.n; p = Math.max(1, Math.min(n, p)); if (p === this._page) return; this._page = p; this._paint(); },
  _firstFree: function () { var st = this.st; for (var p = 1; p <= st.book.n; p++) if (!st.placed[p]) return p; return 1; },
  /* the bookmark: a ribbon with a tag that carries the question (or the sentence) and an answer line */
  _paintRow: function () {
    var el = this._row, st = this.st, r = st.r, self = this, v = this._view, api = this.api; el.innerHTML = '';
    var tag = api.el('button', 'pst-tag' + (v.wiggle ? ' is-wiggle' : '') + (st.mark !== null && st.mark !== undefined ? ' is-out' : '') + (st.done ? ' is-done' : ''));
    tag.type = 'button'; tag.setAttribute('data-k', 'tag');
    var ribbon = this._ribbon(); ribbon.setAttribute('class', 'pst-tagribbon'); tag.appendChild(ribbon);
    var body = api.el('span', 'pst-tagbody'); tag.appendChild(body);
    var qline = api.el('span', 'pst-q');
    if (r.mode === 'caption') { qline.textContent = st.done ? '' : PictureStoryCore.sentence(st); tag.setAttribute('aria-label', this._t('ariaTag', { q: qline.textContent })); }
    else { r.question.parts.forEach(function (p) { var e = p.em ? api.el('b', 'pst-em') : document.createElement('span'); e.textContent = p.t; qline.appendChild(e); }); tag.setAttribute('aria-label', this._t('ariaTag', { q: r.question.text })); }
    body.appendChild(qline);
    if (r.mode !== 'caption') {
      var ans = api.el('span', 'pst-ans'); ans.appendChild(document.createTextNode('— '));
      var shown = st.done ? null : (st.mark !== null ? st.mark : (st.show && st.last && st.last.result === 'wrong' ? st.last.target : null));
      if (st.done) { var aa = api.el('span', 'pst-anstext is-right'); aa.textContent = r.answer; ans.appendChild(aa); }
      else if (shown) ans.appendChild(this._display(shown));
      else ans.appendChild(api.el('span', 'pst-ansblank'));
      body.appendChild(ans);
    }
    this._bindTag(tag);
    tag.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') ev.preventDefault(); });
    el.appendChild(tag);
    el.appendChild(this._checkBtn);
  },
  /* what the answer line shows for a mark: a picture, the phrase, or the page's dots */
  _display: function (tid) {
    var t = PictureStoryCore.target(this.st.book, tid), api = this.api;
    if (!t) return api.el('span', 'pst-ansblank');
    if (t.kind === 'thing') { var lb = api.el('span', 'pst-anstext'); lb.textContent = PictureStoryCore.label(this.st.book.loc, t.pic); return lb; }
    if (t.kind === 'phrase') { var s = api.el('span', 'pst-anstext'); s.textContent = t.text; return s; }
    var d = api.el('span', 'pst-ansdots'); for (var i = 0; i < t.page; i++) d.appendChild(api.el('span', 'pst-dot')); return d;
  },
  _bindTag: function (tag) {
    var self = this;
    tag.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.done || (ev.button !== undefined && ev.button !== 0)) return;
      var ghost = null, sx = ev.clientX, sy = ev.clientY; try { tag.setPointerCapture(ev.pointerId); } catch (e) {}
      var at = function (x, y) { var el = document.elementFromPoint(x, y); el = el && el.closest ? el.closest('[data-tid]') : null; return el && self._wrap.contains(el) && !el.disabled ? el.getAttribute('data-tid') : null; };
      var move = function (e) {
        if (!ghost && Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) < 6) return;
        if (!ghost) { self._drag = {}; ghost = self._ribbon(); ghost.setAttribute('class', 'pst-ribbon pst-ghost'); document.body.appendChild(ghost); }
        ghost.style.left = (e.clientX - 12) + 'px'; ghost.style.top = (e.clientY - 36) + 'px';
        ghost.style.visibility = 'hidden'; var h = at(e.clientX, e.clientY); ghost.style.visibility = '';
        [].forEach.call(self._wrap.querySelectorAll('[data-tid]'), function (n) { n.classList.toggle('is-hover', n.getAttribute('data-tid') === h); });
      };
      var up = function (e) {
        tag.removeEventListener('pointermove', move); tag.removeEventListener('pointerup', up); tag.removeEventListener('pointercancel', up);
        if (!ghost) { var st = self.st; self._say(st.r.mode === 'caption' ? PictureStoryCore.sentence(st) : st.r.question.text); return; }
        ghost.style.visibility = 'hidden'; var h = at(e.clientX, e.clientY);
        if (ghost.parentNode) ghost.parentNode.removeChild(ghost); self._drag = null;
        if (h) self._mark(h); else self._paint();
      };
      tag.addEventListener('pointermove', move); tag.addEventListener('pointerup', up); tag.addEventListener('pointercancel', up);
    });
  },

  /* ---------------- the hand ---------------- */
  _mark: function (tid) {
    if (this._busy || this.st.done) return;
    if (PictureStoryCore.mark(this.st, tid)) {
      this._view = {}; this.api.sound(560); this._paint();
      /* Caption: the page the sentence goes into plays what it shows (silently — its caption is the answer) */
      if (this.st.r.mode === 'caption') this._play(+String(tid).replace(/^p/, ''), null, true);
    }
  },
  /* a page plays its little scene (its things' actions) */
  _play: function (p, done, quiet) {
    var self = this; this._view = Object.assign({}, this._view, { act: [p] }); this._paint();
    if (!quiet) this._say(this.st.book.pages[p - 1].caption.text);
    this._later(function () { var a = (self._view.act || []).filter(function (x) { return x !== p; }); self._view = Object.assign({}, self._view, { act: a }); self._paint(); if (done) done(); }, this._ms(950));
  },
  _check: function () {
    if (this._busy || this.st.done) return;
    var self = this, st = this.st, C = PictureStoryCore, r = st.r;
    var pre = st.mark;
    var res = C.check(st);
    if (res.kase === 'empty') { this.api.sound(460); this._view = { wiggle: true }; this._paint(); this._later(function () { self._view = {}; self._paint(); }, 1200); return; }
    if (r.mode === 'caption') return this._capResult(res);
    if (res.ok) return this._win();
    this.api.sound(196);
    /* the answer line shows what was marked; Fable shrugs; the bookmark slides back out */
    /* at miss 2 the book turns to the page that holds the answer (once — the child may turn away again) */
    if (st.help >= 2) this._page = r.page;
    this._busy = true; this._view = { shrug: pre, shrugFable: true }; this._paint();
    this._later(function () { self._busy = false; self._view = {}; self._paint(); self.api.announce(self._note.textContent || ''); }, this._ms(800));
  },
  _capResult: function (res) {
    var self = this, st = this.st;
    if (res.ok || res.kase === 'placed') {
      this.api.sound(659); this._busy = true; this._view = { act: [res.page] }; this._paint();
      if (res.ok) return this._later(function () { self._capWin(); }, this._ms(950));
      this._later(function () { self._busy = false; self._view = { placed: true }; self._page = self._firstFree(); self._paint(); self.api.announce(self._note.textContent || ''); }, this._ms(950));
      return;
    }
    /* the wrong page plays ITS OWN action; at miss 2 every page plays in turn and the right one pulses */
    this.api.sound(196); this._busy = true; this._view = { act: [res.page] }; this._paint();
    var seq = st.help >= 2 ? Object.keys(st.book.pages).map(function (i) { return +i + 1; }).filter(function (p) { return !st.placed[p]; }) : [];
    var step = function (k) {
      if (k >= seq.length) { self._busy = false; self._view = {}; self._paint(); self.api.announce(self._note.textContent || ''); return; }
      self._view = { act: [seq[k]] }; self._page = seq[k]; self._paint();
      self._later(function () { step(k + 1); }, self._ms(950));
    };
    this._later(function () { step(0); }, this._ms(950));
  },
  _capWin: function () {
    var self = this, st = this.st, pa = this._pa || {}, msg = this._t('okCap'), n = st.book.n, all = [];
    for (var p = 1; p <= n; p++) all.push(p);
    pa.msg = msg; this._busy = true; this._view = { act: [this._page], msg: msg };
    this.api.sound(659); this._later(function () { self.api.sound(784); }, this._ms(110));
    this._paint();
    this._later(function () { self._busy = false; self._view = { msg: msg }; self._paint(); self.api.announce(msg); }, this._ms(950));
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.FAST ? this.OK_MS : this.OK_MS);
  },
  _win: function () {
    var self = this, st = this.st, r = st.r, pa = this._pa || {};
    var msg = this._t('okAsk', { q: r.question.text, a: r.answer });
    pa.msg = msg;
    this._page = r.page;
    this._busy = true; this._view = { fable: r.page, msg: msg };
    this.api.sound(659); this._later(function () { self.api.sound(784); }, this._ms(110));
    this._paint();
    this._later(function () { self._busy = false; self._paint(); self.api.announce(msg); }, this._ms(500));
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

var pstCssDone = false;
function injectStoryCSS() {
  if (pstCssDone || typeof document === 'undefined') return;
  pstCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.pst-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;--pst-ink:#2A2A35;--pst-teal:#146B5E;--pst-coral:#F2784B;--pst-cream:#FFF8EC;--pst-gold:#E8B83A;user-select:none;-webkit-user-select:none;}'
  + '.pst-wrap:focus{outline:none;}'
  + '.pst-head{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;max-width:660px;font-family:' + D + ';font-weight:800;font-size:20px;line-height:1.2;color:var(--pst-teal);text-align:center;} .pst-headmid{display:flex;align-items:center;justify-content:center;gap:8px;flex:1;min-width:0;} .pst-title{min-width:0;}'
  /* the book */
  + '.pst-book{display:grid;grid-template-columns:repeat(var(--pst-cols),minmax(0,1fr));gap:10px;width:100%;max-width:660px;padding:10px;box-sizing:border-box;border-radius:16px;background:#E9DCC4;box-shadow:inset 0 0 0 3px var(--pst-ink);}'
  + '.pst-wrap.is-n4.is-wide .pst-book{max-width:600px;}'
  + '.pst-page{position:relative;display:flex;flex-direction:column;min-width:0;padding:0;border:0;border-radius:10px;background:var(--pst-cream);box-shadow:inset 0 0 0 3px var(--pst-ink),0 3px 0 #C9B999;color:var(--pst-ink);text-align:left;font:inherit;transition:transform .25s;transform-origin:50% 100%;}'
  + 'button.pst-page{cursor:pointer;} button.pst-page:disabled{cursor:default;}'
  + '.pst-page.is-curl{transform:translateY(-8px) rotate(-1.2deg);box-shadow:inset 0 0 0 3px var(--pst-coral),0 8px 0 #C9B999;}'
  + '.pst-page.is-pulse{animation:pst-pulse 1s ease-in-out 3;} @keyframes pst-pulse{50%{box-shadow:inset 0 0 0 3px var(--pst-ink),0 0 0 6px rgba(232,184,58,.6);}}'
  + '.pst-page.is-marked{box-shadow:inset 0 0 0 4px var(--pst-coral),0 3px 0 #C9B999;}'
  + '.pst-page.is-hover{box-shadow:inset 0 0 0 4px var(--pst-teal);}'
  + '.pst-page.is-proof{box-shadow:inset 0 0 0 4px var(--pst-gold),0 3px 0 #C9B999;}'
  + '.pst-edge{position:relative;display:flex;align-items:center;justify-content:center;gap:5px;height:44px;min-height:44px;padding:0;border:0;border-radius:10px 10px 0 0;background:transparent;cursor:pointer;}'
  + 'span.pst-edge{cursor:inherit;} button.pst-edge:hover,.pst-edge.is-hover{background:rgba(20,107,94,.12);} .pst-edge.is-marked{background:rgba(242,120,75,.18);}'
  + '.pst-dot{display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--pst-ink);}'
  + '.pst-edge .pst-ribbon{position:absolute;right:10px;top:-4px;}'
  + '.pst-scene{position:relative;height:var(--pst-scene);margin:0 6px;border-radius:6px;overflow:hidden;}'
  + '.pst-sky-day{background:linear-gradient(#CFE8F7 0,#E8F4FB 62%,transparent 62%);} .pst-sky-grey{background:linear-gradient(#B9C4CF 0,#D3DAE1 62%,transparent 62%);} .pst-sky-dusk{background:linear-gradient(#F4B78D 0,#F9DCC4 62%,transparent 62%);} .pst-sky-night{background:linear-gradient(#26305A 0,#3D4A7E 62%,transparent 62%);}'
  + '.pst-ground-snow{background-color:#F4F7FA;} .pst-ground-grass{background-color:#9CCB78;} .pst-ground-mud{background-color:#B08B60;}'
  + '.pst-thing{position:absolute;display:flex;align-items:flex-end;justify-content:center;width:max(44px,var(--sz));height:max(44px,var(--sz));margin:0;padding:0;border:0;border-radius:10px;background:transparent;transform:translate(-50%,-100%);cursor:pointer;}'
  + 'span.pst-thing{cursor:inherit;}'
  + '.pst-img{width:var(--sz);height:var(--sz);object-fit:contain;pointer-events:none;}'
  + 'button.pst-thing:hover,.pst-thing.is-hover{background:rgba(20,107,94,.16);}'
  + '.pst-thing.is-marked{background:rgba(242,120,75,.2);box-shadow:0 0 0 3px var(--pst-coral);}'
  + '.pst-thing.is-win{box-shadow:0 0 0 4px var(--pst-gold);background:rgba(232,184,58,.2);}'
  + '.pst-thing.is-shrug{animation:pst-no .2s ease-in-out 3;}'
  + '.pst-thing .pst-ribbon{position:absolute;right:-6px;top:-10px;}'
  + '.pst-ribbon{width:20px;height:34px;flex:none;}'
  + '.pst-ghost{position:fixed;z-index:9999;pointer-events:none;width:24px;height:40px;}'
  /* the caption */
  + '.pst-cap{margin:0;padding:4px 10px 6px;font-family:' + B + ';font-weight:700;font-size:16px;line-height:44px;color:var(--pst-ink);}'
  + '.pst-phrase{display:inline;margin:0;padding:14px 6px;border:0;border-radius:6px;outline-offset:2px;background:rgba(20,107,94,.08);box-shadow:inset 0 -2px 0 rgba(20,107,94,.35);font:inherit;color:inherit;cursor:pointer;-webkit-box-decoration-break:clone;box-decoration-break:clone;}'
  + '.pst-phrase:hover,.pst-phrase.is-hover{background:rgba(20,107,94,.2);}'
  + '.pst-phrase.is-marked{background:rgba(242,120,75,.25);box-shadow:inset 0 -3px 0 var(--pst-coral);}'
  + '.pst-phrase.is-shrug{animation:pst-no .2s ease-in-out 3;}'
  + '.pst-phrase.is-proofline,.pst-cap.is-proofall span{box-shadow:inset 0 -4px 0 var(--pst-gold);}'
  + '.pst-cap .is-help{color:#C2410C;text-shadow:0 0 6px rgba(242,120,75,.45);}'
  + '.pst-cap.is-slot{display:flex;align-items:center;min-height:52px;} .pst-slotline{display:block;width:100%;height:28px;border-radius:6px;border:2px dashed #B9A988;}'
  + '.pst-cap.is-filled{box-shadow:inset 0 -4px 0 var(--pst-gold);}'
  /* the page nav (phones) */
  + ''
  + '.pst-navbtn{width:48px;height:44px;border:0;border-radius:12px;background:var(--pst-cream);box-shadow:inset 0 0 0 3px var(--pst-ink);font-family:' + D + ';font-weight:800;font-size:28px;line-height:1;color:var(--pst-ink);cursor:pointer;} .pst-navbtn:disabled{opacity:.35;cursor:default;}'
  + ''
  /* the bookmark */
  + '.pst-row{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;max-width:660px;}'
  + '.pst-tag{position:relative;display:flex;align-items:stretch;gap:10px;flex:1;min-width:0;max-width:560px;min-height:64px;padding:8px 14px 8px 8px;border:0;border-radius:14px;background:#FFE3D6;box-shadow:inset 0 0 0 3px var(--pst-ink),0 3px 0 #C9B999;color:var(--pst-ink);text-align:left;cursor:grab;touch-action:none;font:inherit;}'
  + '.pst-tag.is-out .pst-tagribbon{opacity:.25;} .pst-tag.is-done{cursor:default;background:#FFF1BF;}'
  + '.pst-tag.is-wiggle{animation:pst-wig .45s ease-in-out 2;} @keyframes pst-wig{25%{transform:rotate(-2deg);}75%{transform:rotate(2deg);}}'
  + '.pst-tagribbon{width:22px;height:40px;align-self:center;}'
  + '.pst-tagbody{display:flex;flex-direction:column;justify-content:center;gap:4px;min-width:0;}'
  + '.pst-q{font-family:' + D + ';font-weight:700;font-size:19px;line-height:1.25;} .pst-em{font-weight:800;color:#A6461F;}'
  + '.pst-ans{display:flex;align-items:center;gap:6px;min-height:30px;font-family:' + B + ';font-weight:700;font-size:16px;color:var(--pst-teal);}'
  + '.pst-ansblank{display:inline-block;width:90px;border-bottom:2px solid #B9A988;height:18px;} .pst-ansdots{display:inline-flex;gap:4px;} .pst-anstext.is-right{font-weight:800;}'
  + '.pst-fable{width:var(--pst-fable);height:var(--pst-fable);object-fit:contain;flex:none;} .pst-fable.is-shrug{animation:pst-no .25s ease-in-out 3;} .pst-fable.is-hop{animation:pst-fhop .5s ease-out 2;} @keyframes pst-fhop{40%{transform:translateY(-14px);}}'
  + '@keyframes pst-no{25%{transform:rotate(-8deg);}75%{transform:rotate(8deg);}}'
  /* the ask strip */
  + ''
  + '.pst-note{width:100%;max-width:660px;min-height:24px;margin:0;font-weight:700;font-size:clamp(15px,2.3vw,18px);line-height:1.3;font-family:' + B + ';color:var(--pst-teal);text-align:center;} .pst-note:empty{display:none;} .pst-note.is-ok{font-weight:800;} .pst-note.is-wrong{color:#A6461F;}'
  + '.pst-check{min-height:52px;padding:0 22px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;font-family:' + D + ';cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .pst-check[hidden]{display:none;} .pst-check:disabled{opacity:.6;}'
  /* the page actions (each page plays its own when tapped, when its sentence lands, or when a wrong sentence lands on it) */
  + '.pst-page.is-act .pst-a-hop,.pst-page.is-act .pst-a-sit{animation:pst-hop .45s ease-out 2;} @keyframes pst-hop{40%{transform:translate(-50%,-118%);}}'
  + '.pst-page.is-act .pst-a-drop,.pst-page.is-act .pst-a-jumpin{animation:pst-drop .7s ease-in;} @keyframes pst-drop{0%{transform:translate(-50%,-200%);opacity:.3;}}'
  + '.pst-page.is-act .pst-a-land{animation:pst-land .8s ease-out;} @keyframes pst-land{0%{transform:translate(20%,-190%);}}'
  + '.pst-page.is-act .pst-a-turn{animation:pst-turn .7s ease-in-out;} @keyframes pst-turn{50%{transform:translate(-50%,-100%) scaleX(-1);}}'
  + '.pst-page.is-act .pst-a-puton,.pst-page.is-act .pst-a-return{animation:pst-puton .8s ease-out;} @keyframes pst-puton{0%{transform:translate(40%,-160%) rotate(20deg);}}'
  + '.pst-page.is-act .pst-a-slide{animation:pst-slide .8s ease-out;} @keyframes pst-slide{0%{transform:translate(-140%,-100%);opacity:0;}}'
  + '.pst-page.is-act .pst-a-back{animation:pst-back .8s ease-out;} @keyframes pst-back{0%{transform:translate(40%,-100%) rotate(200deg);}}'
  + '.pst-page.is-act .pst-a-lean{animation:pst-lean .45s ease-in-out 2;} @keyframes pst-lean{50%{transform:translate(-56%,-100%) rotate(-14deg);}}'
  + '.pst-page.is-act .pst-a-wobble,.pst-page.is-act .pst-a-wave,.pst-page.is-act .pst-a-look{animation:pst-wob .3s ease-in-out 3;} @keyframes pst-wob{25%{transform:translate(-50%,-100%) rotate(-8deg);}75%{transform:translate(-50%,-100%) rotate(8deg);}}'
  + '.pst-page.is-act .pst-a-push,.pst-page.is-act .pst-a-kick{animation:pst-push .35s ease-in-out 2;} @keyframes pst-push{50%{transform:translate(-30%,-100%);}}'
  + '.pst-page.is-act .pst-a-pop,.pst-page.is-act .pst-a-build{animation:pst-pop .7s ease-out;} @keyframes pst-pop{0%{transform:translate(-50%,-60%) scale(.3);}}'
  + '.pst-page.is-act .pst-a-open{animation:pst-open .7s ease-out;} @keyframes pst-open{0%{transform:translate(-50%,-100%) scaleX(.15);}}'
  + '.pst-page.is-act .pst-a-cloud{animation:pst-cloud .8s ease-out;} @keyframes pst-cloud{0%{transform:translate(-160%,-100%);opacity:0;}}'
  + '.pst-page.is-act .pst-a-rise{animation:pst-rise .9s ease-out;} @keyframes pst-rise{0%{transform:translate(-50%,-30%);opacity:0;}}'
  + '.pst-page.is-act .pst-a-sink{animation:pst-sink .9s ease-in;} @keyframes pst-sink{0%{transform:translate(-50%,-190%);}}'
  + '.pst-page.is-act .pst-a-roll,.pst-page.is-act .pst-a-downhill{animation:pst-roll .9s ease-out;} @keyframes pst-roll{0%{transform:translate(-160%,-100%) rotate(-360deg);}}'
  + '.pst-page.is-act .pst-a-fill{animation:pst-fill .45s ease-in-out 2;} @keyframes pst-fill{50%{transform:translate(-50%,-100%) scale(1.08);}}'
  + '.pst-page.is-act .pst-a-doze{animation:pst-doze .9s ease-in-out;} @keyframes pst-doze{50%{transform:translate(-50%,-96%) rotate(10deg);}}'
  + '.pst-page.is-act .pst-a-lift{animation:pst-lift .9s ease-out;} @keyframes pst-lift{0%{transform:translate(-50%,-30%);}}'
  + '.pst-page.is-act .pst-a-toss{animation:pst-toss .9s ease-in-out;} @keyframes pst-toss{0%{transform:translate(-200%,60%);}100%{transform:translate(-50%,-100%);}}'
  + '.pst-page.is-act .pst-a-flyoff{animation:pst-fly .9s ease-out;} @keyframes pst-fly{0%{transform:translate(-240%,20%) rotate(-30deg);}}'
  /* phones */
  + '.pst-wrap.is-narrow{gap:8px;} .pst-wrap.is-narrow .pst-book{padding:6px;} .pst-wrap.is-narrow .pst-head{font-size:18px;}'
  + '.pst-wrap.is-narrow .pst-row{gap:8px;} .pst-wrap.is-narrow .pst-q{font-size:17px;} .pst-wrap.is-narrow .pst-tag{min-height:56px;padding:6px 10px 6px 6px;}'
  + ''
  + '.pst-wrap.is-tiny .pst-cap{font-size:15px;padding:2px 8px 4px;} .pst-wrap.is-tiny .pst-phrase{padding:15px 6px;} .pst-wrap.is-tiny .pst-fable{display:none;} .pst-wrap.is-tiny{gap:6px;} .pst-wrap.is-tiny .pst-q{font-size:16px;} .pst-wrap.is-tiny .pst-ans{min-height:24px;font-size:15px;} .pst-wrap.is-tiny .pst-tag{min-height:52px;padding:4px 8px 4px 4px;} .pst-wrap.is-tiny .pst-check{min-height:48px;padding:0 14px;} .pst-wrap.is-tiny .pst-edge{height:44px;}'
  + '.pst-wrap.is-fast *,.pst-wrap.is-fast *::before,.pst-wrap.is-fast *::after{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.pst-wrap *{animation-duration:.2s !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'pst-css'; s.textContent = css; document.head.appendChild(s);
}
