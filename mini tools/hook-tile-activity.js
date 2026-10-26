/* =====================================================================
   hook-tile-activity.js — ACTIVITY #122 of the one-by-one rebuild:
   "Hattie's Whose-Is-It" → THE HOOK TILE (L.1.1.b; all 11 locales).
   Model: hook-tile-core.js (HookTileCore).
   Design: docs/activities-rebuild/designs/122-hattie-whose-is-it.md
   ---------------------------------------------------------------------
   Hattie's lost-and-found. On the left an owner stands on a shelf under a
   brass peg (a library picture, or a name card); on the right the lost
   thing waits in a basket; below lies the word bar with an empty slot, and
   the tray holds the tiles. Tap a tile to seat it in the slot (tap it again
   to pull it out). A hook tile catches the thing and swings it up onto the
   owner's peg — only the form the language really uses catches; the wrong
   hook slips and the thing drops back. The plain plural tile (en s, fi t)
   makes MORE owners: a second one pops up beside the first. Where several
   owners stand and there is nothing to own, a hook dangles empty. Check
   decides; each solved round hangs a tag on the wall behind. No timer, no
   score. Test seams: window.HookTileActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / .FAST / .OK_MS.
   ===================================================================== */
var HookTileActivity = {
  id: 'hook-tile',
  /* the drawn apparatus (the hierarchy gate): the peg wall, the pegs, the shelf, the basket, the hooks, the string */
  apparatusClasses: ['hk-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {en:"Hattie's Whose-Is-It",de:"Hatties Fundkiste",fr:"Les objets trouvés de Hattie",es:"Los objetos perdidos de Hattie",pt:"Achados e perdidos da Hattie",it:"Gli oggetti smarriti di Hattie",nl:"Hatties gevonden voorwerpen",sv:"Hatties hittegods",da:"Hatties hittegods",no:"Hatties hittegods",fi:"Hattien löytötavarat"},
    instruction: {en:"Hang the lost thing on its owner.",de:"Häng das verlorene Ding an seinen Besitzer.",fr:"Rends l’objet perdu à son propriétaire.",es:"Cuelga la cosa perdida en el gancho de su dueño.",pt:"Pendure a coisa perdida no gancho do dono.",it:"Appendi l’oggetto smarrito al suo proprietario.",nl:"Hang het verloren ding bij de eigenaar.",sv:"Häng den borttappade saken på ägarens krok.",da:"Hæng den tabte ting på ejerens krog.",no:"Heng den mistede tingen på kroken til eieren.",fi:"Ripusta kadonnut tavara omistajalleen."},
    instrBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    t1: {en:"Whose is it? Or are there more? Pick a tile for the word.",de:"Wem gehört es? Setz das richtige Ende an den Namen.",fr:"À qui est-ce ? Choisis le bon petit mot.",es:"¿De quién es? Elige la palabrita correcta.",pt:"De quem é? Escolha a palavrinha certa.",it:"Di chi è? Scegli la parolina giusta.",nl:"Van wie is het? Kies het goede stukje voor de naam.",sv:"Vems är det? Välj rätt slut på namnet.",da:"Hvis er det? Vælg den rigtige endelse på navnet.",no:"Hvem sin er det? Velg riktig ending på navnet.",fi:"Kenen se on? Vai onko niitä monta? Valitse pala sanaan."},
    t2: {en:"One owner — or more? Finish the word.",de:"Wem gehört es? Vom oder von der?",fr:"À qui est-ce ? Du, de la ou de l’ ?",es:"¿De quién es? ¿Del o de la?",pt:"De quem é? Do ou da?",it:"Di chi è? Scegli la parolina giusta.",nl:"Van wie is het? Kies het goede stukje voor de naam.",sv:"Vems är det? Välj rätt slut på ordet.",da:"Hvis er det? Vælg den rigtige endelse.",no:"Hvem sin er det? Velg riktig ending.",fi:"Yksi omistaja vai monta? Täydennä sana."},
    t3: {en:"Whose is it? Finish the name.",de:"Wem gehört es? Setz das richtige Stück ein.",fr:"À qui est-ce ? Choisis le bon petit mot.",es:"¿De quién es? Elige la palabrita correcta.",pt:"De quem é? Do ou da?",it:"Di chi è? Scegli la parolina giusta.",nl:"Van wie is het? Van de of van het?",sv:"Vems är det? Välj rätt slut.",da:"Hvis er det? Vælg den rigtige endelse.",no:"Hvem sin er det? Velg riktig ending.",fi:"Kenen se on? Valitse pala sanaan."},
    hintEmpty: {en:"Put a tile in the slot.",de:"Leg ein Stück in die Lücke.",fr:"Mets un petit mot dans la case.",es:"Pon una palabrita en el hueco.",pt:"Coloque uma palavrinha no espaço.",it:"Metti una parolina nello spazio.",nl:"Leg een stukje in het gat.",sv:"Lägg en bricka i luckan.",da:"Læg en brik i hullet.",no:"Legg en brikke i luka.",fi:"Laita pala aukkoon."},
    missTwin: {en:"Now there are more of them! Who owns the thing? Try the 's tile.",de:"Jetzt sind es mehr! Wem gehört das Ding?",fr:"Maintenant, il y en a plus !",es:"¡Ahora hay más!",pt:"Agora tem mais!",it:"Adesso ce ne sono di più!",nl:"Nu zijn het er meer!",sv:"Nu blev de fler!",da:"Nu blev de flere!",no:"Nå ble de flere!",fi:"Nyt niitä on monta! Kenen tavara on? Kokeile palaa, jossa on koukku."},
    missDangle: {en:"There is nothing to hang here. The word wants more than one.",de:"Hier gibt es nichts aufzuhängen.",fr:"Il n’y a rien à accrocher ici.",es:"Aquí no hay nada que colgar.",pt:"Aqui não tem nada para pendurar.",it:"Qui non c’è niente da appendere.",nl:"Hier valt niets op te hangen.",sv:"Här finns inget att hänga upp.",da:"Her er intet at hænge op.",no:"Her er det ingenting å henge opp.",fi:"Täällä ei ole mitään ripustettavaa. Sana tarkoittaa montaa."},
    missGlow: {en:"Try the tile that is glowing.",de:"Probier das Stück, das leuchtet.",fr:"Essaie le petit mot qui brille.",es:"Prueba la palabrita que brilla.",pt:"Experimente a palavrinha que está brilhando.",it:"Prova la parolina che brilla.",nl:"Probeer het stukje dat oplicht.",sv:"Prova brickan som lyser.",da:"Prøv den brik, der lyser.",no:"Prøv brikken som lyser.",fi:"Kokeile palaa, joka hehkuu."},
    okPoss: {en:"Yes! {phrase} — back with its owner!",de:"Ja! {phrase} – wieder beim Besitzer!",fr:"Oui ! {phrase} : chaque chose à son propriétaire !",es:"¡Sí! {phrase}: ¡cada cosa con su dueño!",pt:"Isso! {phrase}: cada coisa com seu dono!",it:"Sì! {phrase}: ogni cosa al suo proprietario!",nl:"Ja! {phrase} – terug bij de eigenaar!",sv:"Ja! {phrase} – tillbaka hos ägaren!",da:"Ja! {phrase} – tilbage hos ejeren!",no:"Ja! {phrase} – tilbake hos eieren!",fi:"Oikein! {phrase} – takaisin omistajalle!"},
    okMany: {en:"Yes! {phrase} — more than one!",de:"Ja! {phrase}",fr:"Oui ! {phrase}",es:"¡Sí! {phrase}",pt:"Isso! {phrase}",it:"Sì! {phrase}",nl:"Ja! {phrase}",sv:"Ja! {phrase}",da:"Ja! {phrase}",no:"Ja! {phrase}",fi:"Oikein! {phrase} – monta!"},
    check: {en:"Check",de:"Prüfen",fr:"Vérifier",es:"Comprobar",pt:"Verificar",it:"Controlla",nl:"Controleer",sv:"Kontrollera",da:"Tjek",no:"Sjekk",fi:"Tarkista"},
    setLevel: {en:"Owners",de:"Besitzer",fr:"Propriétaires",es:"Dueños",pt:"Donos",it:"Proprietari",nl:"Eigenaars",sv:"Ägare",da:"Ejere",no:"Eiere",fi:"Omistajat"},
    l1: {en:"Things and owners",de:"Namen",fr:"Prénoms",es:"Nombres y animales",pt:"Nomes",it:"Nomi e animali",nl:"Namen",sv:"Namn",da:"Navne",no:"Navn",fi:"Kenen? Vai monta?"},
    l2: {en:"One or more?",de:"Vom oder von der?",fr:"Du, de la ou de l’ ?",es:"¿Del o de la?",pt:"Bichos e pessoas",it:"Del, della, dello o dell’?",nl:"Namen op een s-klank",sv:"Namn och ord",da:"Navne og ord",no:"Navn og ord",fi:"Lauseet"},
    l3: {en:"Names",de:"Gemischt",fr:"Mélange",es:"Mezcla",pt:"Misturado",it:"Misto",nl:"Van de of van het?",sv:"Blandat",da:"Blandet",no:"Blandet",fi:"Nimet"},
    setHook: {en:"Hook tiles",de:"Haken",fr:"Crochets",es:"Ganchos",pt:"Ganchos",it:"Ganci",nl:"Haakjes",sv:"Krokar",da:"Kroge",no:"Kroker",fi:"Koukut"},
    hookShow: {en:"Show the hook",de:"Haken zeigen",fr:"Montrer le crochet",es:"Mostrar el gancho",pt:"Mostrar o gancho",it:"Mostra il gancio",nl:"Haakje tonen",sv:"Visa kroken",da:"Vis krogen",no:"Vis kroken",fi:"Näytä koukku"},
    hookPlain: {en:"Plain tiles",de:"Ohne Haken",fr:"Sans crochet",es:"Sin gancho",pt:"Sem gancho",it:"Senza gancio",nl:"Zonder haakje",sv:"Utan krok",da:"Uden krog",no:"Uten krok",fi:"Ilman koukkua"},
    aOwner: {en:"Owner",de:"Besitzer",fr:"Propriétaire",es:"Dueño",pt:"Dono",it:"Proprietario",nl:"Eigenaar",sv:"Ägare",da:"Ejer",no:"Eier",fi:"Omistaja"},
    aOwners: {en:"{n} owners",de:"{n} Besitzer",fr:"{n} propriétaires",es:"{n} dueños",pt:"{n} donos",it:"{n} proprietari",nl:"{n} eigenaars",sv:"{n} ägare",da:"{n} ejere",no:"{n} eiere",fi:"{n} omistajaa"},
    aThing: {en:"The lost thing",de:"Das verlorene Ding",fr:"L’objet perdu",es:"La cosa perdida",pt:"A coisa perdida",it:"L’oggetto smarrito",nl:"Het verloren ding",sv:"Den borttappade saken",da:"Den tabte ting",no:"Den mistede tingen",fi:"Kadonnut tavara"},
    aBar: {en:"The words: {bar}",de:"Die Wörter: {bar}",fr:"Les mots : {bar}",es:"Las palabras: {bar}",pt:"As palavras: {bar}",it:"Le parole: {bar}",nl:"De woorden: {bar}",sv:"Orden: {bar}",da:"Ordene: {bar}",no:"Ordene: {bar}",fi:"Sanat: {bar}"},
    aSlot: {en:"empty slot",de:"Lücke",fr:"case vide",es:"hueco vacío",pt:"espaço vazio",it:"spazio vuoto",nl:"leeg gat",sv:"tom lucka",da:"tomt hul",no:"tom luke",fi:"tyhjä aukko"},
    aTile: {en:"Tile {t}",de:"Stück {t}",fr:"Petit mot {t}",es:"Palabrita {t}",pt:"Palavrinha {t}",it:"Parolina {t}",nl:"Stukje {t}",sv:"Bricka {t}",da:"Brik {t}",no:"Brikke {t}",fi:"Pala {t}"},
    aNothing: {en:"nothing",de:"nichts",fr:"rien",es:"nada",pt:"nada",it:"niente",nl:"niets",sv:"ingenting",da:"ingenting",no:"ingenting",fi:"ei mitään"},
    srHang: {en:"The thing hangs on its owner's peg.",de:"Das Ding hängt am Haken des Besitzers.",fr:"L’objet pend au crochet de son propriétaire.",es:"La cosa cuelga del gancho de su dueño.",pt:"A coisa está pendurada no gancho do dono.",it:"L’oggetto è appeso al gancio del proprietario.",nl:"Het ding hangt aan de haak van de eigenaar.",sv:"Saken hänger på ägarens krok.",da:"Tingen hænger på ejerens krog.",no:"Tingen henger på kroken til eieren.",fi:"Tavara roikkuu omistajan koukussa."},
    srTwins: {en:"Now there are more owners. The thing is still in the basket.",de:"Jetzt sind es mehr Besitzer. Das Ding liegt noch im Korb.",fr:"Il y a maintenant plusieurs propriétaires. L’objet est encore dans le panier.",es:"Ahora hay más dueños. La cosa sigue en la canasta.",pt:"Agora tem mais donos. A coisa continua no cesto.",it:"Ora ci sono più proprietari. L’oggetto è ancora nel cesto.",nl:"Nu zijn er meer eigenaars. Het ding ligt nog in de mand.",sv:"Nu finns det fler ägare. Saken ligger kvar i korgen.",da:"Nu er der flere ejere. Tingen ligger stadig i kurven.",no:"Nå er det flere eiere. Tingen ligger fortsatt i kurven.",fi:"Nyt omistajia on monta. Tavara on yhä korissa."},
    srDangle: {en:"The hook finds nothing to hang.",de:"Der Haken findet nichts zum Aufhängen.",fr:"Le crochet ne trouve rien à accrocher.",es:"El gancho no encuentra nada que colgar.",pt:"O gancho não acha nada para pendurar.",it:"Il gancio non trova niente da appendere.",nl:"Het haakje vindt niets om op te hangen.",sv:"Kroken hittar inget att hänga upp.",da:"Krogen finder intet at hænge op.",no:"Kroken finner ingenting å henge opp.",fi:"Koukku ei löydä mitään ripustettavaa."},
    srSlip: {en:"The hook does not catch. The thing drops back.",de:"Der Haken hält nicht. Das Ding fällt zurück.",fr:"Le crochet ne tient pas. L’objet retombe.",es:"El gancho no agarra. La cosa vuelve a caer.",pt:"O gancho não segura. A coisa cai de volta.",it:"Il gancio non tiene. L’oggetto ricade.",nl:"Het haakje houdt niet. Het ding valt terug.",sv:"Kroken fastnar inte. Saken faller tillbaka.",da:"Krogen holder ikke. Tingen falder tilbage.",no:"Kroken holder ikke. Tingen faller tilbake.",fi:"Koukku ei pidä. Tavara putoaa takaisin."},
  },/*STRINGS-END*/

  defaults: { level: '1', hook: 'show' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: '1', labelKey: 'l1' }, { value: '2', labelKey: 'l2' }, { value: '3', labelKey: 'l3' }] },
    { key: 'hook', type: 'choice', labelKey: 'setHook', options: [{ value: 'show', labelKey: 'hookShow' }, { value: 'plain', labelKey: 'hookPlain' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._trays = {};
    this._timers = []; this._ro = null; this._view = {}; this._nudged = false; this._wall = []; this._fresh = null; this._rects = null;
    injectHookTileCSS();
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
  _loc: function () { return HookTileCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return HookTileCore.levelOf(this._setting('level')); },
  _hooks: function () { return this._setting('hook') !== 'plain'; },
  _key: function () { return this._loc() + '/' + this._level(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = HookTileCore.rounds(); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._trays = {}; this._wall = []; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = HookTileCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._loc(), this._level(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._trays = P.trays; this._orderForPool = pool; if (pass > this._pass) this._wall = []; this._pass = pass; }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'hooktile.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t('t' + this._level()); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers(); this._fresh = null; this._rects = null;
    this.st = HookTileCore.newState(this._loc(), this._level(), r, this._trays && this._trays[r]);
    this._view = { note: '', ok: '' };
    this._setPrompt();
  },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : this._pool[0], 0); this._render2(); this._watchWidth(); },
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
  _render2: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'hk-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="hk-wall"></div><div class="hk-scene"></div><div class="hk-bar"></div><div class="hk-tray"></div><div class="hk-foot"></div><p class="hk-note" aria-live="polite"></p><p class="hk-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
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
  _el: function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; },
  _dims: function () {
    var W = this._width(), B = HookTileCore.band(W), many = this.st ? HookTileCore.effect(this.st).owners > 1 : false;
    return { W: W, wide: B.wide, tiny: B.tiny, xs: B.xs, owner: B.wide ? (many ? 96 : 128) : B.tiny ? (many ? 64 : 80) : (many ? 64 : 96), thing: B.wide ? 112 : B.tiny ? 72 : 88 };
  },
  _img: function (pic, size, cls) { return '<img' + (cls ? ' class="' + cls + '"' : '') + ' src="/image-library-webp/themes/' + pic + '@2x.webp" alt="" width="' + size + '" height="' + size + '" draggable="false">'; },
  _sr: function (s) { var el = this._qs('.hk-sr'); if (el) el.textContent = s; },
  /* the tile face: its text, a brass hook over it when it is a hook (and the hooks are shown); the empty tile is a dotted blank */
  _tileFace: function (t) {
    var C = HookTileCore, ro = C.role(this.st.loc, t), hook = ro === 'hook' && this._hooks();
    return (hook ? '<svg class="hk-art hk-hook" viewBox="0 0 24 30" width="24" height="30" aria-hidden="true"><path d="M12 2 V16 a6 6 0 1 1 -6 -6" fill="none" stroke="#B8862A" stroke-width="3.5" stroke-linecap="round"/><circle cx="12" cy="3" r="2.6" fill="#B8862A"/></svg>' : '')
      + '<span class="hk-tt' + (t === '' ? ' is-nothing' : '') + '">' + (t === '' ? '' : esc(t.replace(/ $/, ''))) + '</span>';
  },
  _tileLabel: function (t) { return this._t('aTile', { t: t === '' ? this._t('aNothing') : t.trim() }); },

  _paint_: function () {
    var C = HookTileCore, st = this.st, rd = st.rd, D = this._dims(), v = this._view, self = this, ef = C.effect(st), clue = C.clue(st), glow = C.glow(st);
    /* remember where the thing and the owners were, so a change can glide from there (FLIP) */
    var before = {}; if (this._wrap) this._wrap.querySelectorAll('[data-flip]').forEach(function (e) { before[e.getAttribute('data-flip')] = e.getBoundingClientRect(); });
    this._wrap.className = 'hk-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.tiny ? ' is-tiny' : '') + (D.xs ? ' is-xs' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    /* the wall of returned things */
    var wall = this._qs('.hk-wall'); wall.innerHTML = '';
    var pegs = ''; for (var i = 0; i < 9; i++) pegs += '<span class="hk-peg' + (i < this._wall.length ? ' has' : '') + '"><i class="hk-art"></i>' + (i < this._wall.length ? '<b class="hk-tag t' + (i % 4) + (this._fresh === 'done' && i === this._wall.length - 1 ? ' is-new' : '') + '"></b>' : '') + '</span>';
    wall.innerHTML = '<span class="hk-rail hk-art" aria-hidden="true"></span>' + pegs; wall.setAttribute('aria-hidden', 'true');
    /* the scene: the owner shelf (peg, hanging place, owners) and the basket */
    var scene = this._qs('.hk-scene'); scene.innerHTML = '';
    var shelf = this._el('div', 'hk-shelf');
    var top = this._el('div', 'hk-top'); if (rd.thing) top.style.minHeight = (D.thing + 36) + 'px';
    top.appendChild(this._el('span', 'hk-tpeg hk-art' + (st.slot !== null ? ' is-lit' : ''), ''));
    if (ef.thing === 'peg') { var hang = this._el('span', 'hk-hang' + (this._fresh === 'hang' ? ' is-swing' : ''), '<i class="hk-string hk-art"></i>' + this._img(rd.thing.pic, D.thing)); hang.setAttribute('data-flip', 'thing'); hang.setAttribute('role', 'img'); hang.setAttribute('aria-label', this._t('srHang')); top.appendChild(hang); }
    if (rd.thing && ef.thing !== 'peg') { var spot = this._el('span', 'hk-spot hk-art', ''); spot.style.width = D.thing + 'px'; spot.style.height = D.thing + 'px'; top.appendChild(spot); }
    if (ef.dangle) top.appendChild(this._el('span', 'hk-dangle hk-art', '<i class="hk-string"></i><svg viewBox="0 0 24 30" width="26" height="32" aria-hidden="true"><path d="M12 2 V16 a6 6 0 1 1 -6 -6" fill="none" stroke="#B8862A" stroke-width="3.5" stroke-linecap="round"/></svg>'));
    if (clue && clue.art) top.appendChild(this._el('span', 'hk-art-ghost', esc(clue.art)));
    shelf.appendChild(top);
    var row = this._el('div', 'hk-owners'); row.setAttribute('role', 'img'); row.setAttribute('aria-label', ef.owners > 1 ? this._t('aOwners', { n: ef.owners }) : this._t('aOwner') + ': ' + (rd.owner.name || C.filled(rd, '').replace(/\s+/g, ' ').trim()));
    for (var k = 0; k < ef.owners; k++) {
      var o = rd.owner.name ? this._el('span', 'hk-card', '<i class="hk-pin hk-art"></i>' + esc(rd.owner.name)) : this._el('span', 'hk-owner', this._img(rd.owner.pic, D.owner));
      if (k >= rd.n0 && this._fresh === 'twin') o.classList.add('is-pop');
      o.setAttribute('data-flip', 'owner' + k); row.appendChild(o);
    }
    shelf.appendChild(row);
    shelf.appendChild(this._el('span', 'hk-board hk-art', ''));
    scene.appendChild(shelf);
    var basket = this._el('div', 'hk-basket');
    if (rd.thing && ef.thing !== 'peg') { var th = this._el('span', 'hk-thing' + (ef.thing === 'slip' && this._fresh === 'slip' ? ' is-slip' : ''), this._img(rd.thing.pic, D.thing)); th.setAttribute('data-flip', 'thing'); th.setAttribute('role', 'img'); th.setAttribute('aria-label', this._t('aThing')); basket.appendChild(th); }
    basket.appendChild(this._el('span', 'hk-wicker hk-art', ''));
    /* on a phone a plural round's empty basket gives its room to the shelf: two or three owners need it */
    if (rd.thing || D.wide) scene.appendChild(basket);
    /* the word bar */
    var b = C.bar(rd, st.slot), barEl = this._qs('.hk-bar'), shown = C.filled(rd, st.slot === null ? '' : st.slot);
    barEl.setAttribute('aria-label', this._t('aBar', { bar: st.slot === null ? (b.pre + this._t('aSlot') + b.post) : shown }));
    var pre = esc(b.pre);
    var post = esc(b.post), lit = function (txt, j) { return esc(txt.slice(0, j + clue.letter)) + '<b class="hk-last">' + esc(txt.charAt(j + clue.letter)) + '</b>' + esc(txt.slice(j + clue.letter + 1)); };
    if (clue && clue.letter != null && rd.owner.name) { var nm = rd.owner.name, j = b.pre.lastIndexOf(nm), j2 = b.post.indexOf(nm); if (j >= 0) pre = lit(b.pre, j); else if (j2 >= 0) post = lit(b.post, j2); }
    var slotHtml = st.slot === null ? '<span class="hk-slot' + (/ $/.test(rd.right) ? ' sp-after' : '') + '" aria-hidden="true"></span>' : '<button type="button" class="hk-slot is-full' + (st.done ? ' is-ok' : '') + (/ $/.test(st.slot) ? ' sp-after' : '') + '" data-k="slot"' + (st.done ? ' disabled' : '') + ' aria-label="' + esc(this._tileLabel(st.slot)) + '">' + (st.slot === '' ? '<span class="hk-tt is-nothing"></span>' : esc(st.slot.replace(/ $/, ''))) + '</button>';
    barEl.innerHTML = '<span class="hk-words">' + pre + slotHtml + post + '</span>';
    var sb = barEl.querySelector('button.hk-slot'); if (sb) sb.addEventListener('click', function () { self._pull(); });
    /* the tray */
    var tray = this._qs('.hk-tray'); tray.innerHTML = '';
    st.tray.forEach(function (t, i) {
      var on = st.slot === t;
      var bt = self._btn('hk-tile' + (on ? ' is-seated' : '') + (glow && t === rd.right ? ' is-glow' : '') + (C.role(st.loc, t) === 'hook' && self._hooks() ? ' has-hook' : ''), 'tile-' + i, self._tileLabel(t), self._tileFace(t));
      bt.disabled = st.done; bt.setAttribute('aria-pressed', on ? 'true' : 'false');
      bt.addEventListener('click', function () { self._seat(t); });
      tray.appendChild(bt);
    });
    var foot = this._qs('.hk-foot'); foot.innerHTML = '';
    var chk = this._btn('hk-check', 'check', null, '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + esc(this._t('check')) + '</span>');
    chk.disabled = st.done; chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.hk-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'hk-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'hk-note is-hint'; }
    else { note.textContent = ''; note.className = 'hk-note'; }
    /* glide the thing from where it was (the basket) to where it is (the peg), and back */
    if (!this.FAST) this._wrap.querySelectorAll('[data-flip]').forEach(function (e) {
      var k2 = e.getAttribute('data-flip'), r0 = before[k2]; if (!r0) return; var r1 = e.getBoundingClientRect(), dx = r0.left - r1.left, dy = r0.top - r1.top;
      if (Math.abs(dx) < 2 && Math.abs(dy) < 2) return;
      e.style.transition = 'none'; e.style.transform = 'translate(' + dx + 'px,' + dy + 'px)'; void e.offsetWidth;
      e.style.transition = 'transform .42s cubic-bezier(.3,1.2,.5,1)'; e.style.transform = '';
    });
    this._fresh = null;
  },

  /* ---------------- the hand ---------------- */
  _seat: function (t) {
    var C = HookTileCore, st = this.st; if (st.done) return;
    var r = C.seat(st, t); if (r === 'no') return;
    this._view.note = ''; this._view.ok = '';
    var ef = C.effect(st);
    this._fresh = r === 'pulled' ? null : ef.thing === 'peg' ? 'hang' : ef.thing === 'slip' ? 'slip' : ef.owners > st.rd.n0 ? 'twin' : null;
    this.api.sound(r === 'pulled' ? 300 : ef.thing === 'peg' ? 784 : ef.owners > st.rd.n0 ? 600 : ef.dangle ? 330 : ef.thing === 'slip' ? 240 : 500);
    this._paint();
    this._sr(r === 'pulled' ? '' : ef.thing === 'peg' ? this._t('srHang') : ef.owners > st.rd.n0 && st.rd.kind === 'poss' ? this._t('srTwins') : ef.dangle ? this._t('srDangle') : ef.thing === 'slip' ? this._t('srSlip') : '');
  },
  _pull: function () { if (HookTileCore.pull(this.st) === 'no') return; this._view.note = ''; this.api.sound(300); this._paint(); },
  _check: function () {
    var C = HookTileCore, st = this.st, v = this._view; if (st.done) return;
    var res = C.check(st);
    if (res.result === 'ok') { this._success(); return; }
    var h = C.hint(st); v.ok = ''; v.note = h.key ? this._t(h.key) : C.ruleText(st.loc, h.data);
    this.api.sound(res.result === 'empty' ? 400 : 220); this._paint(); this.api.announce(v.note);
  },
  _success: function () {
    var C = HookTileCore, st = this.st, v = this._view, phrase = C.filled(st.rd, st.slot).replace(/[.!]$/, '');
    phrase = phrase.charAt(0).toUpperCase() + phrase.slice(1);
    v.note = ''; v.ok = this._t(st.rd.kind === 'poss' ? 'okPoss' : 'okMany', { phrase: phrase });
    this._wall.push(st.r); this._fresh = 'done';
    this.api.sound(988); this._later(function () {}, 0); this._paint(); this.api.announce(v.ok);
    if (typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'word', text: C.filled(st.rd, st.slot), lang: this.api.lang, rate: 0.9 }); } catch (e) {} }
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectHookTileCSS() {
  if (typeof document === 'undefined' || document.getElementById('hk-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B', WOOD = '#C99A62', BRASS = '#B8862A';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.hk-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:10px;user-select:none;-webkit-user-select:none;} .hk-wrap:focus{outline:none;}'
  /* the wall */
  + '.hk-wall{position:relative;display:flex;justify-content:space-around;align-items:flex-start;height:46px;padding:0 10px;} .hk-rail{position:absolute;left:0;right:0;top:6px;height:12px;border-radius:6px;background:' + WOOD + ';box-shadow:inset 0 0 0 2px #8C6239;}'
  + '.hk-peg{position:relative;z-index:1;width:22px;display:flex;flex-direction:column;align-items:center;} .hk-peg i{display:block;width:10px;height:10px;margin-top:7px;border-radius:50%;background:' + BRASS + ';box-shadow:0 0 0 2px #6E4F18;}'
  + '.hk-tag{display:block;width:18px;height:22px;margin-top:3px;border-radius:3px 3px 6px 6px;box-shadow:inset 0 0 0 2px ' + INK + ';} .hk-tag.t0{background:#F2784B;} .hk-tag.t1{background:#2E8C7E;} .hk-tag.t2{background:#F4CF62;} .hk-tag.t3{background:#7E9BD8;} .hk-tag.is-new{animation:hkTag .5s ease-out;transform-origin:top center;} @keyframes hkTag{0%{transform:translateY(40px) scale(1.6);opacity:.2;}}'
  /* the scene */
  + '.hk-scene{display:flex;align-items:flex-end;gap:16px;padding:0 4px;}'
  + '.hk-shelf{position:relative;flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;}'
  + '.hk-top{position:relative;display:flex;flex-direction:column;align-items:center;min-height:34px;width:100%;}'
  + '.hk-tpeg{display:block;width:16px;height:16px;border-radius:50%;background:' + BRASS + ';box-shadow:0 0 0 2px #6E4F18;transition:box-shadow .15s;} .hk-tpeg.is-lit{box-shadow:0 0 0 2px #6E4F18,0 0 0 7px rgba(244,207,98,.55);}'
  + '.hk-hang{display:flex;flex-direction:column;align-items:center;margin-top:-2px;} .hk-hang img{display:block;object-fit:contain;} .hk-string{display:block;width:2px;height:16px;background:' + INK + ';}'
  + '.hk-hang.is-swing img{animation:hkSwing .9s ease-out;transform-origin:top center;} @keyframes hkSwing{0%{transform:rotate(14deg);}35%{transform:rotate(-9deg);}65%{transform:rotate(5deg);}100%{transform:none;}}'
  + '.hk-dangle{display:flex;flex-direction:column;align-items:center;animation:hkDangle 2.2s ease-in-out infinite;transform-origin:top center;} .hk-dangle .hk-string{height:22px;} @keyframes hkDangle{0%,100%{transform:rotate(-10deg);}50%{transform:rotate(10deg);}}'
  + '.hk-spot{display:block;margin-top:14px;border-radius:50%;border:3px dashed #D9C29A;box-sizing:border-box;opacity:.8;} .hk-art-ghost{margin-top:6px;padding:2px 10px;border-radius:8px;background:#FFF6D6;box-shadow:inset 0 0 0 2px #F4CF62;font-family:' + B + ';font-weight:800;font-size:20px;color:#7A5638;}'
  + '.hk-owners{display:flex;justify-content:center;align-items:flex-end;gap:10px;min-height:80px;} .hk-owner{display:flex;} .hk-owner img{display:block;object-fit:contain;}'
  + '.hk-card{position:relative;display:flex;align-items:center;justify-content:center;min-width:120px;min-height:64px;padding:6px 18px;margin-bottom:6px;border-radius:10px;background:#FFFDF4;box-shadow:inset 0 0 0 2px #D9C29A,0 4px 0 #D9C29A;font-family:' + H + ';font-weight:800;font-size:34px;color:' + INK + ';} .hk-pin{position:absolute;top:-6px;left:50%;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:#D9534F;box-shadow:0 0 0 2px #8C2E2B;}'
  + '.hk-owner.is-pop,.hk-card.is-pop{animation:hkPop .3s cubic-bezier(.3,1.5,.5,1);} @keyframes hkPop{0%{transform:scale(.5);opacity:0;}}'
  + '.hk-board{display:block;width:100%;max-width:340px;height:14px;border-radius:4px;background:' + WOOD + ';box-shadow:inset 0 0 0 2px #8C6239,0 4px 0 #8C6239;}'
  + '.hk-basket{position:relative;flex:none;width:190px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;min-height:150px;} .hk-thing{position:relative;z-index:1;display:flex;margin-bottom:-26px;} .hk-thing img{display:block;object-fit:contain;}'
  + '.hk-thing.is-slip{animation:hkSlip .6s ease-in;} @keyframes hkSlip{0%{transform:translate(-60px,-70px) rotate(-12deg);}60%{transform:translateY(-6px);}}'
  + '.hk-wicker{display:block;width:100%;height:58px;border-radius:6px 6px 22px 22px;background:repeating-linear-gradient(45deg,#D9A866 0 6px,#C18E4E 6px 12px);box-shadow:inset 0 0 0 3px #7A5638;} .hk-wicker::before{content:"";display:block;height:12px;border-radius:6px;background:#B98243;box-shadow:inset 0 0 0 3px #7A5638;}'
  /* the word bar */
  + '.hk-bar{display:flex;justify-content:center;align-items:center;min-height:72px;padding:8px 14px;border-radius:12px;background:#E9C48F;box-shadow:inset 0 0 0 3px #7A5638,0 4px 0 #7A5638;}'
  + '.hk-words{font-family:' + H + ';font-weight:800;font-size:34px;line-height:1.35;color:#3A2A1C;text-align:center;overflow-wrap:break-word;hyphens:manual;}'
  + '.hk-slot{display:inline-block;vertical-align:middle;min-width:52px;height:50px;margin:0 2px;border-radius:8px;background:#5B3F28;box-shadow:inset 0 0 0 3px ' + BRASS + ',inset 0 6px 8px rgba(0,0,0,.35);}'
  + '.hk-slot.is-full{min-width:44px;height:auto;min-height:48px;padding:0 6px;border:0;background:#FFF8E8;box-shadow:inset 0 0 0 3px ' + BRASS + ';font:inherit;color:#B04A26;cursor:pointer;} .hk-slot.is-ok{color:#1B6B5E;box-shadow:inset 0 0 0 3px #2E8C7E;cursor:default;}'
  + '.hk-slot.sp-after{margin-right:10px;} .hk-last{color:#C8503A;text-decoration:underline;text-decoration-thickness:4px;text-underline-offset:5px;}'
  /* the tray */
  + '.hk-tray{display:flex;justify-content:center;gap:16px;flex-wrap:wrap;}'
  + '.hk-tile{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:76px;min-height:58px;padding:6px 14px;border:0;border-radius:12px;background:#FFF8E8;box-shadow:inset 0 0 0 3px #7A5638,0 4px 0 #7A5638;font-family:' + H + ';font-weight:800;font-size:30px;line-height:1;color:#3A2A1C;cursor:pointer;}'
  + '.hk-tile.has-hook{padding-top:34px;} .hk-hook{position:absolute;top:4px;left:50%;margin-left:-12px;} .hk-tile:disabled{cursor:default;opacity:.7;}'
  + '.hk-tile.is-seated{background:#F3E2C4;box-shadow:inset 0 0 0 3px #B98A55;opacity:.55;} .hk-tile.is-glow{box-shadow:inset 0 0 0 3px #2E8C7E,0 0 0 5px rgba(46,140,126,.35),0 4px 0 #1B5F55;transform:translateY(-6px);}'
  + '.hk-tt.is-nothing{display:block;width:36px;height:30px;border-radius:6px;border:3px dashed #9C7A4A;}'
  + '.hk-foot{display:flex;justify-content:center;} .hk-check{display:inline-flex;align-items:center;gap:8px;min-width:150px;min-height:54px;padding:8px 26px;border:0;border-radius:16px;background:#146B5E;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;box-shadow:0 4px 0 #0D4A41;cursor:pointer;} .hk-check:disabled{opacity:.5;cursor:default;}'
  + '.hk-note{margin:0;min-height:1.3em;max-width:640px;align-self:center;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .hk-note.is-hint{color:#8A3B1F;}'
  + '.hk-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* phones */
  + '.hk-wrap.is-narrow{gap:8px;} .hk-wrap.is-narrow .hk-wall{height:38px;} .hk-wrap.is-narrow .hk-peg{width:16px;} .hk-wrap.is-narrow .hk-tag{width:14px;height:18px;}'
  + '.hk-wrap.is-narrow .hk-scene{gap:8px;} .hk-wrap.is-narrow .hk-basket{width:120px;min-height:120px;} .hk-wrap.is-narrow .hk-wicker{height:44px;} .hk-wrap.is-narrow .hk-thing{margin-bottom:-20px;}'
  + '.hk-wrap.is-narrow .hk-owners{gap:6px;min-height:64px;} .hk-wrap.is-narrow .hk-card{min-width:90px;min-height:52px;padding:4px 12px;font-size:28px;}'
  + '.hk-wrap.is-narrow .hk-bar{min-height:60px;padding:6px 10px;} .hk-wrap.is-narrow .hk-words{font-size:26px;} .hk-wrap.is-narrow .hk-slot{min-width:44px;height:44px;} .hk-wrap.is-narrow .hk-slot.is-full{min-height:44px;height:auto;}'
  + '.hk-wrap.is-narrow .hk-tile{min-width:64px;min-height:52px;font-size:26px;} .hk-wrap.is-narrow .hk-tray{gap:12px;} .hk-wrap.is-narrow .hk-note{font-size:17px;} .hk-wrap.is-narrow .hk-spot{display:block;margin-top:14px;border-radius:50%;border:3px dashed #D9C29A;box-sizing:border-box;opacity:.8;} .hk-art-ghost{font-size:17px;}'
  + '.hk-wrap.is-tiny .hk-basket{width:96px;} .hk-wrap.is-tiny .hk-words{font-size:23px;} .hk-wrap.is-tiny .hk-check{min-height:48px;min-width:120px;padding:6px 16px;font-size:20px;} .hk-wrap.is-tiny .hk-tray{gap:6px;flex-wrap:nowrap;} .hk-wrap.is-tiny .hk-tile{min-width:52px;padding-left:6px;padding-right:6px;font-size:22px;} .hk-wrap.is-tiny .hk-tile.has-hook{padding-top:30px;} .hk-wrap.is-tiny .hk-hook{width:20px;height:24px;margin-left:-10px;}'
  + '.hk-wrap.is-xs .hk-card{min-width:72px;font-size:24px;padding:4px 8px;} .hk-wrap.is-xs .hk-words{font-size:21px;}'
  + '.hk-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.hk-wrap *{animation:none !important;transition:none !important;}}'
  + '.hk-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'hk-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.HookTileActivity = HookTileActivity;
