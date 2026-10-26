/* =====================================================================
   inky-book-workshop-activity.js — ACTIVITY #66 of the one-by-one
   rebuild: "Inky's Book Workshop" → THE TWO INKS (RL.K.6, 11 locales).
   Design sheet: docs/activities-rebuild/designs/066-inky-book-workshop.md
   ---------------------------------------------------------------------
   THE INVENTION: each maker can only make their own mark. Inky (the
   library octopus) prints a page with one half missing — no picture, or
   no words. The child brings the page to the person who can finish it:
   the author's ink makes words, the illustrator's ink makes a picture,
   the reader has no ink and enjoys a finished page. The wrong person
   still makes their own mark — in the wrong place: tiny words crammed
   into the picture box, a squashed picture on the word lines, the reader
   stopping at the gap — the ink drips and the page comes back. When a
   book's pages are done, the author and the illustrator go on its cover.
   "Desks: name plates only" closes the desks so only the WORDS Author /
   Illustrator / Reader decide (RL.K.6 is naming the roles).

   ACTIVITY LAYER ONLY: the model is inky-workshop-core.js; lcs-shell.js
   and author-illustrator-core.js are untouched (the shell's Check is
   hidden and pressed by this activity when a book is done). Test seams:
   window.InkyBookWorkshopActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var InkyBookWorkshopActivity = {
  id: 'inky-book-workshop',
  apparatusClasses: ['iw-'],

  strings: {
    title:           {en:"Inky's Book Workshop",de:'Inkys Buchwerkstatt',nl:'De boekenwerkplaats van Inky',da:'Inkys bogværksted',sv:'Inkys bokverkstad',no:'Inkys bokverksted',es:'El taller de libros de Inky',it:'La bottega dei libri di Nino',pt:'A oficina de livros do Tinoco',fr:'L’atelier de livres d’Inky',fi:'Inkyn kirjapaja'},
    instr:           {en:'Who can finish this page? Bring it to them.',de:'Wer kann diese Seite fertig machen? Bring sie zu der Person.',nl:'Wie kan deze bladzijde afmaken? Breng hem naar die persoon.',da:'Hvem kan gøre siden færdig? Giv den til den person.',sv:'Vem kan göra klart sidan? Lämna den till den personen.',no:'Hvem kan gjøre ferdig siden? Gi den til den personen.',es:'¿Quién puede terminar esta página? Llévasela.',it:'Chi può finire questa pagina? Portagliela.',pt:'Quem pode terminar esta página? Leve até essa pessoa.',fr:'Qui peut finir cette page ? Apporte-la-lui.',fi:'Kuka voi tehdä sivun valmiiksi? Vie se hänelle.'},
    instrCover:      {en:'Put the author and the illustrator on the cover.',de:'Setz den Autor und den Illustrator auf den Buchdeckel.',nl:'Zet de schrijver en de illustrator op de kaft.',da:'Sæt forfatteren og illustratoren på forsiden.',sv:'Sätt författaren och illustratören på omslaget.',no:'Sett forfatteren og illustratøren på forsiden.',es:'Pon al autor y al ilustrador en la portada.',it:'Metti l’autore e l’illustratore sulla copertina.',pt:'Coloque o autor e o ilustrador na capa.',fr:'Mets l’auteur et l’illustrateur sur la couverture.',fi:'Laita kirjailija ja kuvittaja kanteen.'},
    okAuthor:        {en:'The author wrote the words!',de:'Der Autor hat die Wörter geschrieben!',nl:'De schrijver heeft de woorden geschreven!',da:'Forfatteren skrev ordene!',sv:'Författaren skrev orden!',no:'Forfatteren skrev ordene!',es:'¡El autor escribió las palabras!',it:'L’autore ha scritto le parole!',pt:'O autor escreveu as palavras!',fr:'L’auteur a écrit les mots !',fi:'Kirjailija kirjoitti sanat!'},
    okIllus:         {en:'The illustrator drew the picture!',de:'Der Illustrator hat das Bild gemalt!',nl:'De illustrator heeft het plaatje getekend!',da:'Illustratoren tegnede billedet!',sv:'Illustratören ritade bilden!',no:'Illustratøren tegnet bildet!',es:'¡El ilustrador hizo el dibujo!',it:'L’illustratore ha disegnato l’immagine!',pt:'O ilustrador desenhou a figura!',fr:'L’illustrateur a dessiné l’image !',fi:'Kuvittaja piirsi kuvan!'},
    okReader:        {en:'The reader enjoys the story!',de:'Der Leser freut sich über die Geschichte!',nl:'De lezer geniet van het verhaal!',da:'Læseren nyder historien!',sv:'Läsaren njuter av berättelsen!',no:'Leseren koser seg med fortellingen!',es:'¡El lector disfruta el cuento!',it:'Il lettore si gode la storia!',pt:'O leitor curte a história!',fr:'Le lecteur aime l’histoire !',fi:'Lukija nauttii tarinasta!'},
    okWin:           {en:'The author wrote the words. The illustrator drew the pictures. Now it’s a book!',de:'Der Autor hat die Wörter geschrieben. Der Illustrator hat die Bilder gemalt. Jetzt ist es ein Buch!',nl:'De schrijver schreef de woorden. De illustrator tekende de plaatjes. Nu is het een boek!',da:'Forfatteren skrev ordene. Illustratoren tegnede billederne. Nu er det en bog!',sv:'Författaren skrev orden. Illustratören ritade bilderna. Nu är det en bok!',no:'Forfatteren skrev ordene. Illustratøren tegnet bildene. Nå er det ei bok!',es:'El autor escribió las palabras. El ilustrador hizo los dibujos. ¡Ahora es un libro!',it:'L’autore ha scritto le parole. L’illustratore ha disegnato le immagini. Ora è un libro!',pt:'O autor escreveu as palavras. O ilustrador desenhou as figuras. Agora é um livro!',fr:'L’auteur a écrit les mots. L’illustrateur a dessiné les images. Maintenant, c’est un livre !',fi:'Kirjailija kirjoitti sanat. Kuvittaja piirsi kuvat. Nyt se on kirja!'},
    okBubble:        {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    hintAuthor:      {en:'The author writes the words. This page needs a picture.',de:'Der Autor schreibt die Wörter. Diese Seite braucht ein Bild.',nl:'De schrijver schrijft de woorden. Deze bladzijde heeft een plaatje nodig.',da:'Forfatteren skriver ordene. Denne side mangler et billede.',sv:'Författaren skriver orden. Den här sidan behöver en bild.',no:'Forfatteren skriver ordene. Denne siden trenger et bilde.',es:'El autor escribe las palabras. Esta página necesita un dibujo.',it:'L’autore scrive le parole. Questa pagina ha bisogno di un’immagine.',pt:'O autor escreve as palavras. Esta página precisa de uma figura.',fr:'L’auteur écrit les mots. Cette page a besoin d’une image.',fi:'Kirjailija kirjoittaa sanat. Tälle sivulle tarvitaan kuva.'},
    hintIllus:       {en:'The illustrator draws the pictures. This page needs words.',de:'Der Illustrator malt die Bilder. Diese Seite braucht Wörter.',nl:'De illustrator tekent de plaatjes. Deze bladzijde heeft woorden nodig.',da:'Illustratoren tegner billederne. Denne side mangler ord.',sv:'Illustratören ritar bilderna. Den här sidan behöver ord.',no:'Illustratøren tegner bildene. Denne siden trenger ord.',es:'El ilustrador hace los dibujos. Esta página necesita palabras.',it:'L’illustratore disegna le immagini. Questa pagina ha bisogno di parole.',pt:'O ilustrador desenha as figuras. Esta página precisa de palavras.',fr:'L’illustrateur dessine les images. Cette page a besoin de mots.',fi:'Kuvittaja piirtää kuvat. Tälle sivulle tarvitaan sanoja.'},
    hintReader:      {en:'The reader enjoys the book. Someone has to finish this page first.',de:'Der Leser freut sich über das Buch. Erst muss jemand diese Seite fertig machen.',nl:'De lezer geniet van het boek. Eerst moet iemand deze bladzijde afmaken.',da:'Læseren nyder bogen. Først skal nogen gøre siden færdig.',sv:'Läsaren njuter av boken. Först måste någon göra klart sidan.',no:'Leseren koser seg med boka. Først må noen gjøre ferdig siden.',es:'El lector disfruta el libro. Primero alguien tiene que terminar esta página.',it:'Il lettore si gode il libro. Prima qualcuno deve finire questa pagina.',pt:'O leitor curte o livro. Primeiro alguém precisa terminar esta página.',fr:'Le lecteur aime le livre. Quelqu’un doit d’abord finir cette page.',fi:'Lukija nauttii kirjasta. Ensin jonkun pitää tehdä sivu valmiiksi.'},
    hintDone:        {en:'This page is finished. Who enjoys it?',de:'Diese Seite ist fertig. Wer freut sich darüber?',nl:'Deze bladzijde is af. Wie geniet ervan?',da:'Denne side er færdig. Hvem skal nyde den?',sv:'Den här sidan är klar. Vem njuter av den?',no:'Denne siden er ferdig. Hvem skal kose seg med den?',es:'Esta página ya está terminada. ¿Quién la disfruta?',it:'Questa pagina è finita. Chi se la gode?',pt:'Esta página já está pronta. Quem vai curtir?',fr:'Cette page est finie. Qui va en profiter ?',fi:'Tämä sivu on valmis. Kuka nauttii siitä?'},
    hintLook:        {en:'Look at what is missing: words or a picture?',de:'Schau, was fehlt: Wörter oder ein Bild?',nl:'Kijk wat er mist: woorden of een plaatje?',da:'Se, hvad der mangler: ord eller et billede?',sv:'Titta vad som saknas: ord eller en bild?',no:'Se hva som mangler: ord eller et bilde?',es:'Mira qué falta: ¿palabras o un dibujo?',it:'Guarda che cosa manca: parole o un’immagine?',pt:'Veja o que está faltando: palavras ou uma figura?',fr:'Regarde ce qui manque : des mots ou une image ?',fi:'Katso, mitä puuttuu: sanoja vai kuva?'},
    hintCoverAuthor: {en:'The author wrote the words. Put the author by the lines.',de:'Der Autor hat die Wörter geschrieben. Setz den Autor neben die Linien.',nl:'De schrijver schreef de woorden. Zet de schrijver bij de lijnen.',da:'Forfatteren skrev ordene. Sæt forfatteren ved linjerne.',sv:'Författaren skrev orden. Sätt författaren vid linjerna.',no:'Forfatteren skrev ordene. Sett forfatteren ved linjene.',es:'El autor escribió las palabras. Pon al autor junto a las líneas.',it:'L’autore ha scritto le parole. Metti l’autore vicino alle righe.',pt:'O autor escreveu as palavras. Coloque o autor junto das linhas.',fr:'L’auteur a écrit les mots. Mets l’auteur près des lignes.',fi:'Kirjailija kirjoitti sanat. Laita kirjailija viivojen kohdalle.'},
    hintCoverIllus:  {en:'The illustrator drew the pictures. Put the illustrator by the frame.',de:'Der Illustrator hat die Bilder gemalt. Setz den Illustrator neben den Rahmen.',nl:'De illustrator tekende de plaatjes. Zet de illustrator bij het lijstje.',da:'Illustratoren tegnede billederne. Sæt illustratoren ved rammen.',sv:'Illustratören ritade bilderna. Sätt illustratören vid ramen.',no:'Illustratøren tegnet bildene. Sett illustratøren ved rammen.',es:'El ilustrador hizo los dibujos. Pon al ilustrador junto al marco.',it:'L’illustratore ha disegnato le immagini. Metti l’illustratore vicino alla cornice.',pt:'O ilustrador desenhou as figuras. Coloque o ilustrador junto da moldura.',fr:'L’illustrateur a dessiné les images. Mets l’illustrateur près du cadre.',fi:'Kuvittaja piirsi kuvat. Laita kuvittaja kehyksen kohdalle.'},
    setJobs:         {en:'Jobs',de:'Aufgaben',nl:'Rollen',da:'Roller',sv:'Roller',no:'Roller',es:'Trabajos',it:'Ruoli',pt:'Papéis',fr:'Rôles',fi:'Roolit'},
    jobs2:           {en:'Author and illustrator',de:'Autor und Illustrator',nl:'Schrijver en illustrator',da:'Forfatter og illustrator',sv:'Författare och illustratör',no:'Forfatter og illustratør',es:'Autor e ilustrador',it:'Autore e illustratore',pt:'Autor e ilustrador',fr:'Auteur et illustrateur',fi:'Kirjailija ja kuvittaja'},
    jobs3:           {en:'Author, illustrator and reader',de:'Autor, Illustrator und Leser',nl:'Schrijver, illustrator en lezer',da:'Forfatter, illustrator og læser',sv:'Författare, illustratör och läsare',no:'Forfatter, illustratør og leser',es:'Autor, ilustrador y lector',it:'Autore, illustratore e lettore',pt:'Autor, ilustrador e leitor',fr:'Auteur, illustrateur et lecteur',fi:'Kirjailija, kuvittaja ja lukija'},
    setDesks:        {en:'Desks',de:'Arbeitsplätze',nl:'Werkplekken',da:'Arbejdspladser',sv:'Arbetsplatser',no:'Arbeidsplasser',es:'Mesas de trabajo',it:'Postazioni',pt:'Mesas',fr:'Bureaux',fi:'Työpöydät'},
    desksOpen:       {en:'Open',de:'Offen',nl:'Open',da:'Åbne',sv:'Öppna',no:'Åpne',es:'Abiertas',it:'Aperte',pt:'Abertas',fr:'Ouverts',fi:'Avoimet'},
    desksPlates:     {en:'Name plates only',de:'Nur Namensschilder',nl:'Alleen naambordjes',da:'Kun navneskilte',sv:'Bara namnskyltar',no:'Bare navneskilt',es:'Solo letreros',it:'Solo targhette',pt:'Só plaquinhas',fr:'Seulement les plaques',fi:'Vain nimikyltit'},
    jobAuthor:       {en:'writes the words',de:'schreibt die Wörter',nl:'schrijft de woorden',da:'skriver ordene',sv:'skriver orden',no:'skriver ordene',es:'escribe las palabras',it:'scrive le parole',pt:'escreve as palavras',fr:'écrit les mots',fi:'kirjoittaa sanat'},
    jobIllus:        {en:'draws the pictures',de:'malt die Bilder',nl:'tekent de plaatjes',da:'tegner billederne',sv:'ritar bilderna',no:'tegner bildene',es:'hace los dibujos',it:'disegna le immagini',pt:'desenha as figuras',fr:'dessine les images',fi:'piirtää kuvat'},
    jobReader:       {en:'enjoys the book',de:'freut sich über das Buch',nl:'geniet van het boek',da:'nyder bogen',sv:'njuter av boken',no:'koser seg med boka',es:'disfruta el libro',it:'si gode il libro',pt:'curte o livro',fr:'aime le livre',fi:'nauttii kirjasta'},
    ariaInky:        {en:'{name} the octopus at the press',de:'{name}, der Tintenfisch an der Druckpresse',nl:'{name} de inktvis bij de drukpers',da:'Blæksprutten {name} ved trykpressen',sv:'Bläckfisken {name} vid tryckpressen',no:'Blekkspruten {name} ved trykkpressen',es:'{name} el pulpo junto a la imprenta',it:'{name} il polpo alla macchina da stampa',pt:'{name}, o polvo, na prensa',fr:'{name} la pieuvre à la presse',fi:'Mustekala {name} painokoneen luona'},
    ariaNeedPic:     {en:'Page: “{sentence}”, no picture yet',de:'Seite: „{sentence}“, noch kein Bild',nl:'Bladzijde: “{sentence}”, nog geen plaatje',da:'Side: “{sentence}”, intet billede endnu',sv:'Sida: ”{sentence}”, ingen bild än',no:'Side: «{sentence}», ikke noe bilde ennå',es:'Página: «{sentence}», todavía sin dibujo',it:'Pagina: «{sentence}», ancora senza immagine',pt:'Página: “{sentence}”, ainda sem figura',fr:'Page : « {sentence} », pas encore d’image',fi:'Sivu: ”{sentence}”, ei vielä kuvaa'},
    ariaNeedWords:   {en:'Page with a picture, no words yet',de:'Seite mit Bild, noch ohne Wörter',nl:'Bladzijde met een plaatje, nog zonder woorden',da:'Side med billede, ingen ord endnu',sv:'Sida med bild, inga ord än',no:'Side med bilde, ingen ord ennå',es:'Página con dibujo, todavía sin palabras',it:'Pagina con immagine, ancora senza parole',pt:'Página com figura, ainda sem palavras',fr:'Page avec une image, pas encore de mots',fi:'Sivu, jossa on kuva mutta ei vielä sanoja'},
    ariaDone:        {en:'Finished page: “{sentence}”',de:'Fertige Seite: „{sentence}“',nl:'Afgemaakte bladzijde: “{sentence}”',da:'Færdig side: “{sentence}”',sv:'Färdig sida: ”{sentence}”',no:'Ferdig side: «{sentence}»',es:'Página terminada: «{sentence}»',it:'Pagina finita: «{sentence}»',pt:'Página pronta: “{sentence}”',fr:'Page finie : « {sentence} »',fi:'Valmis sivu: ”{sentence}”'},
    ariaDesk:        {en:'{role}: {job}',de:'{role}: {job}',nl:'{role}: {job}',da:'{role}: {job}',sv:'{role}: {job}',no:'{role}: {job}',es:'{role}: {job}',it:'{role}: {job}',pt:'{role}: {job}',fr:'{role} : {job}',fi:'{role}: {job}'},
    ariaSlotWords:   {en:'Cover: the place for the words',de:'Buchdeckel: der Platz für die Wörter',nl:'Kaft: de plek voor de woorden',da:'Forside: pladsen til ordene',sv:'Omslag: platsen för orden',no:'Forside: plassen til ordene',es:'Portada: el lugar de las palabras',it:'Copertina: il posto delle parole',pt:'Capa: o lugar das palavras',fr:'Couverture : la place des mots',fi:'Kansi: sanojen paikka'},
    ariaSlotPic:     {en:'Cover: the place for the pictures',de:'Buchdeckel: der Platz für die Bilder',nl:'Kaft: de plek voor de plaatjes',da:'Forside: pladsen til billederne',sv:'Omslag: platsen för bilderna',no:'Forside: plassen til bildene',es:'Portada: el lugar de los dibujos',it:'Copertina: il posto delle immagini',pt:'Capa: o lugar das figuras',fr:'Couverture : la place des images',fi:'Kansi: kuvien paikka'}
  },

  defaults: { jobs: '2', desks: 'open' },
  settings: [
    { key: 'jobs', type: 'choice', labelKey: 'setJobs', options: [{ value: '2', labelKey: 'jobs2' }, { value: '3', labelKey: 'jobs3' }] },
    { key: 'desks', type: 'choice', labelKey: 'setDesks', options: [{ value: 'open', labelKey: 'desksOpen' }, { value: 'plates', labelKey: 'desksPlates' }] }
  ],

  OK_MS: 500, FAST: false, WORK_MS: 900, BACK_MS: 900,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0; this._deal = null;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._pa = {}; this._drag = null;
    injectInkCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () { if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); } else if (this._wrap) this._paint(); },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return InkyWorkshopCore.locale(((this.api && this.api.lang) || 'en').slice(0, 2)); },
  _jobs: function () { return InkyWorkshopCore.jobs(this._set('jobs')); },
  _closed: function () { return this._set('desks') === 'plates'; },
  _key: function () { return this._loc() + '/' + this._jobs(); },
  _role: function (r) { return InkyWorkshopCore.DATA.TEXT[this._loc()].roles[r]; },
  _say: function (text) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'sentence', text: text, lang: this._loc(), rate: 0.9 }); } catch (e) {} },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { this._pool = InkyWorkshopCore.rounds(this._loc(), this._jobs()); this._poolKey = k; this._order = null; this._deal = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = InkyWorkshopCore;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); this._deal = null; }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); this._deal = null; }
    if (!this._deal) this._deal = C.deal(pool, this._order, Math.random);
    var k = this._order[index % n], r = pool[k], dl = this._deal[k], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'inky.' + r.loc + '.' + r.id, promptKey: 'instr', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._clearTimers(); tool._busy = false; tool._view = {}; tool._drag = null; tool.st = C.newState(r, dl); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = InkyWorkshopCore, p0 = C.rounds(this._loc(), this._jobs()); this.st = C.newState(p0[0], C.deal(p0, p0.map(function (_, i) { return i; }), C.seeded('x'))[0]); }
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
    var wrap = api.el('div', 'iw-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    var top = api.el('div', 'iw-top'); wrap.appendChild(top);
    this._pressEl = api.el('div', 'iw-press'); top.appendChild(this._pressEl);
    this._sheetEl = api.el('div', 'iw-sheet'); top.appendChild(this._sheetEl);
    this._desksEl = api.el('div', 'iw-desks'); this._desksEl.setAttribute('role', 'group'); wrap.appendChild(this._desksEl);
    var note = api.el('p', 'iw-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    wrap.addEventListener('keydown', function (ev) { self._onKey(ev); });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx || this._wrap).focus(); }
  },
  _paint_: function () {
    if (!this._sheetEl) return;
    var st = this.st, C = InkyWorkshopCore, v = this._view, L = this._L = C.layout(this._width());
    this._wrap.className = 'iw-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + (L.W < 300 ? ' is-tiny' : '') + ' is-' + st.phase + (this._closed() ? ' is-closed' : '') + (this.FAST ? ' is-fast' : '');
    [['unit', L.unit], ['person', L.person], ['page-w', L.pageW], ['inky', L.inky]].forEach(function (p) { this._wrap.style.setProperty('--iw-' + p[0], p[1] + 'px'); }, this);
    this._paintPress();
    if (st.phase === 'page' || v.closing) this._paintPage(); else this._paintCover();
    this._paintDesks();
    var h = C.hint(st), msg = '';
    if (v.msg) msg = v.msg;
    else if (h && !this._busy) msg = this._t(h);
    else if (st.phase === 'cover' && !this._busy) msg = this._t('instrCover');
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!v.msg);
    this._note.classList.toggle('is-wrong', !!(h && !v.msg && !this._busy));
  },
  /* Inky behind the press, the finished pages stacked beside it */
  _paintPress: function () {
    var el = this._pressEl, api = this.api, st = this.st, v = this._view, C = InkyWorkshopCore;
    el.innerHTML = '';
    var ink = api.el('span', 'iw-inky' + (v.cheer ? ' is-cheer' : '')); var im = api.el('img', 'iw-img'); im.alt = ''; im.draggable = false; im.src = this._pic(C.INKY); ink.appendChild(im); el.appendChild(ink);
    el.appendChild(api.el('span', 'iw-rollers'));
    var stack = api.el('span', 'iw-stack'), n = Math.min(st.page, st.r.pages.length);
    for (var i = 0; i < n; i++) stack.appendChild(api.el('span', 'iw-leaf'));
    el.appendChild(stack);
    el.setAttribute('aria-label', this._t('ariaInky', { name: C.DATA.TEXT[this._loc()].inky }));
  },
  /* the page: a picture box above three word lines; the press left one half empty */
  _paintPage: function () {
    var el = this._sheetEl, api = this.api, st = this.st, v = this._view, C = InkyWorkshopCore, self = this;
    var p = v.closing ? null : (v.work && v.work.page) || C.current(st);
    el.innerHTML = '';
    if (!p) return;
    var help = C.helpOf(st) || {}, w = v.work || {};
    var pg = api.el('button', 'iw-page' + (st.sel === 'page' ? ' is-sel' : '') + (w.back ? ' is-back' : '') + (v.filed ? ' is-filed' : ''));
    pg.type = 'button'; pg.setAttribute('data-k', 'page');
    pg.setAttribute('aria-label', p.missing === 'picture' ? this._t('ariaNeedPic', { sentence: p.sentence }) : p.missing === 'words' ? this._t('ariaNeedWords') : this._t('ariaDone', { sentence: p.sentence }));
    var showPic = p.missing !== 'picture' || (w.ok && w.landed === 'box'), showWords = p.missing !== 'words' || (w.ok && w.landed === 'lines');
    var box = api.el('span', 'iw-box' + (showPic ? '' : ' is-empty') + (help.pulse === 'picture' ? ' is-pulse' : '') + (w.landed === 'read' ? ' is-lit' : ''));
    if (showPic) { var bi = api.el('img', 'iw-img' + (w.ok && w.landed === 'box' ? ' is-sweep' : '')); bi.alt = ''; bi.draggable = false; bi.src = this._pic(p.pic); box.appendChild(bi); }
    if (!w.ok && w.landed === 'box') { var sc = api.el('span', 'iw-scrawl'); sc.textContent = (p.sentence + ' ').repeat(12); box.appendChild(sc); }
    if (w.landed === 'gap' && !showPic) box.appendChild(api.el('span', 'iw-caret'));
    pg.appendChild(box);
    var lines = api.el('span', 'iw-lines' + (showWords ? '' : ' is-empty') + (help.pulse === 'words' ? ' is-pulse' : ''));
    for (var i = 0; i < 3; i++) lines.appendChild(api.el('span', 'iw-rule'));
    if (showWords) { var tx = api.el('span', 'iw-text' + (w.ok && w.landed === 'lines' ? ' is-type' : '') + (w.landed === 'read' ? ' is-read' : '')); tx.textContent = p.sentence; lines.appendChild(tx); }
    if (!w.ok && w.landed === 'lines') { var sq = api.el('img', 'iw-squash'); sq.alt = ''; sq.draggable = false; sq.src = this._pic(p.pic); lines.appendChild(sq); }
    if (w.landed === 'gap' && !showWords) lines.appendChild(api.el('span', 'iw-caret'));
    pg.appendChild(lines);
    if (w.landed === 'hover') { var hv = api.el('span', 'iw-hover iw-tool-' + w.role); pg.appendChild(hv); }
    pg.addEventListener('click', function () { if (!self._free()) return; st.sel = st.sel === 'page' ? null : 'page'; self.api.sound(st.sel ? 560 : 330); self._paint(); });
    this._bindDrag(pg, function () { return 'page'; });
    el.appendChild(pg);
  },
  /* the cover: the book's picture and two credit slots — ruled lines for the words, a frame for the picture */
  _paintCover: function () {
    var el = this._sheetEl, api = this.api, st = this.st, self = this, v = this._view;
    el.innerHTML = '';
    var cv = api.el('div', 'iw-cover' + (v.flip ? ' is-flip' : ''));
    var art = api.el('span', 'iw-coverart'); var im = api.el('img', 'iw-img'); im.alt = ''; im.draggable = false; im.src = this._pic(st.r.cover); art.appendChild(im); cv.appendChild(art);
    var slots = api.el('span', 'iw-credits'), order = st.coverSwap ? ['picture', 'words'] : ['words', 'picture'];
    order.forEach(function (slot) {
      var who = st.cover[slot], b = api.el('button', 'iw-credit iw-credit-' + slot + (who ? ' is-full' : '') + (v.smear && v.smear.slot === slot ? ' is-smear-' + v.smear.kind : ''));
      b.type = 'button'; b.setAttribute('data-k', 'credit-' + slot); b.setAttribute('data-slot', slot);
      b.setAttribute('aria-label', self._t(slot === 'words' ? 'ariaSlotWords' : 'ariaSlotPic') + (who ? ': ' + self._role(who) : ''));
      b.appendChild(api.el('span', 'iw-icon iw-icon-' + slot));
      if (who) { var pi = api.el('img', 'iw-img iw-portrait'); pi.alt = ''; pi.draggable = false; pi.src = self._pic(InkyWorkshopCore.PEOPLE[who]); b.appendChild(pi); }
      b.addEventListener('click', function () { self._tapSlot(slot); });
      slots.appendChild(b);
    });
    cv.appendChild(slots);
    el.appendChild(cv);
  },
  /* the desks: a person at work, their tool mark, their name plate; closed desks show only the plate */
  _paintDesks: function () {
    var el = this._desksEl, api = this.api, st = this.st, self = this, v = this._view, C = InkyWorkshopCore, help = C.helpOf(st) || {};
    el.innerHTML = ''; el.style.setProperty('--iw-n', st.seats.length);
    var closed = this._closed() && !help.open && !(st.phase !== 'page');
    st.seats.forEach(function (role, i) {
      var w = v.work || {}, active = w.role === role;
      var d = api.el('button', 'iw-desk iw-desk-' + role + (active ? ' is-working' : '') + (closed && !active ? ' is-door' : '') + (st.sel === 'portrait:' + role ? ' is-sel' : '') + (st.phase === 'cover' && (role === 'reader' || st.cover.words === role || st.cover.picture === role) ? ' is-off' : ''));
      d.type = 'button'; d.setAttribute('data-k', 'desk-' + role); d.setAttribute('data-role', role); d.setAttribute('data-seat', i);
      d.setAttribute('aria-label', closed ? self._role(role) : self._t('ariaDesk', { role: self._role(role), job: self._t(role === 'author' ? 'jobAuthor' : role === 'illustrator' ? 'jobIllus' : 'jobReader') }));
      d.appendChild(api.el('span', 'iw-tool iw-tool-' + role + (help.open ? ' is-pulse' : '')));
      var pw = api.el('span', 'iw-person'); var pi = api.el('img', 'iw-img'); pi.alt = ''; pi.draggable = false; pi.src = self._pic(C.PEOPLE[role]); pw.appendChild(pi); d.appendChild(pw);
      if (closed && !active) { var door = api.el('span', 'iw-door'); door.appendChild(api.el('span', 'iw-knob')); d.appendChild(door); }
      var plate = api.el('span', 'iw-plate'); plate.textContent = self._role(role); d.appendChild(plate);
      d.addEventListener('click', function () { self._tapDesk(role); });
      if (st.phase === 'cover' && role !== 'reader') self._bindDrag(pw, function () { return 'portrait:' + role; });
      el.appendChild(d);
    });
  },

  /* ---------------- the hand ---------------- */
  _free: function () { return !(this._busy || this.st.done); },
  _tapDesk: function (role) {
    if (!this._free()) return;
    var st = this.st;
    if (st.phase === 'page') { this._deliver(role); return; }
    if (role === 'reader' || st.cover.words === role || st.cover.picture === role) return;
    st.sel = st.sel === 'portrait:' + role ? null : 'portrait:' + role; this._view = {}; this.api.sound(st.sel ? 560 : 330); this._paint();
  },
  _tapSlot: function (slot) {
    if (!this._free() || this.st.phase !== 'cover' || !this.st.sel) return;
    this._place(this.st.sel.slice(9), slot);
  },
  _bindDrag: function (el, idOf) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      var id = idOf(); if (!id || !self._free() || (ev.button !== undefined && ev.button !== 0)) return;
      ev.stopPropagation();
      var ghost = null, sx = ev.clientX, sy = ev.clientY; try { el.setPointerCapture(ev.pointerId); } catch (e) {}
      var targets = function () { return id === 'page' ? self._wrap.querySelectorAll('.iw-desk') : self._wrap.querySelectorAll('.iw-credit'); };
      var at = function (x, y) { var ss = targets(); for (var z = 0; z < ss.length; z++) { var rc = ss[z].getBoundingClientRect(); if (x >= rc.left && x <= rc.right && y >= rc.top && y <= rc.bottom) return ss[z]; } return null; };
      var move = function (e) {
        if (!ghost && Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) < 8) return;
        if (!ghost) { self._drag = {}; ghost = el.cloneNode(true); ghost.className += ' iw-ghost'; ghost.style.width = el.offsetWidth + 'px'; document.body.appendChild(ghost); }
        ghost.style.left = (e.clientX - el.offsetWidth / 2) + 'px'; ghost.style.top = (e.clientY - 30) + 'px';
        var h = at(e.clientX, e.clientY); [].forEach.call(targets(), function (s) { s.classList.toggle('is-over', s === h); });
      };
      var up = function (e) {
        el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
        if (!ghost) return;
        if (ghost.parentNode) ghost.parentNode.removeChild(ghost); self._drag = null;
        var h = at(e.clientX, e.clientY);
        [].forEach.call(targets(), function (s) { s.classList.remove('is-over'); });
        if (!h) { self._paint(); return; }
        if (id === 'page') self._deliver(h.getAttribute('data-role'));
        else self._place(id.slice(9), h.getAttribute('data-slot'));
      };
      el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    });
  },
  _onKey: function (ev) {
    var st = this.st, k = ev.key;
    if (/^[1-3]$/.test(k) && st.seats[+k - 1]) { ev.preventDefault(); this._tapDesk(st.seats[+k - 1]); }
  },

  /* ---------------- the work ---------------- */
  _deliver: function (role) {
    var self = this, st = this.st, C = InkyWorkshopCore, p = C.current(st);
    if (!p) return;
    var res = C.deliver(st, role); if (!res) return;
    st.sel = null; this._busy = true;
    this._view = { work: { role: role, page: p, landed: res.landed, ok: res.ok } };
    this.api.sound(res.ok ? 620 : 300); this._paint();
    if (res.ok && res.landed === 'read') this._say(p.sentence);
    if (res.ok) {
      this._later(function () {
        self._view = { work: { role: role, page: p, landed: res.landed, ok: true }, filed: true, msg: self._t(C.okKey(role)) }; self._paint();
        self._later(function () {
          self._busy = false; self._view = st.phase === 'cover' ? { msg: '' } : {}; self._paint();
          self.api.announce(self._t(C.okKey(role)));
        }, self._ms(500));
      }, this._ms(this.WORK_MS));
      return;
    }
    this._later(function () {
      self._view = { work: { role: role, page: p, landed: res.landed, ok: false, back: true } }; self._paint(); self.api.sound(196);
      self._later(function () { self._busy = false; self._view = {}; self._paint(); self.api.announce(self._note.textContent || ''); }, self._ms(500));
    }, this._ms(this.BACK_MS));
  },
  _place: function (role, slot) {
    var self = this, st = this.st, C = InkyWorkshopCore;
    var res = C.placePortrait(st, role, slot); st.sel = null;
    if (!res) { this._paint(); return; }
    if (res.ok) { this.api.sound(520); this._view = {}; this._paint(); if (st.done) this._win(); return; }
    this._busy = true; this._view = { smear: { slot: slot, kind: res.smear } }; this.api.sound(196); this._paint();
    this._later(function () { self._busy = false; self._view = {}; self._paint(); self.api.announce(self._note.textContent || ''); }, this._ms(this.BACK_MS));
  },
  _win: function () {
    var self = this, pa = this._pa || {}, msg = this._t('okWin');
    pa.msg = msg; this._busy = true;
    this._view = { flip: true, cheer: true, msg: msg };
    this.api.sound(659); this._later(function () { self.api.sound(784); }, this._ms(110)); this._later(function () { self.api.sound(1046); }, this._ms(220));
    this._paint();
    this._later(function () { self._busy = false; self._paint(); self.api.announce(msg); }, this._ms(700));
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

var iwCssDone = false;
function injectInkCSS() {
  if (iwCssDone || typeof document === 'undefined') return;
  iwCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.iw-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;--iw-ink:#2A2A35;--iw-teal:#146B5E;--iw-coral:#F2784B;--iw-cream:#FFF8EC;--iw-gold:#E8B83A;--iw-blue:#3E6FB5;user-select:none;-webkit-user-select:none;}'
  + '.iw-wrap:focus{outline:none;}'
  + '.iw-top{display:flex;align-items:flex-start;justify-content:center;gap:14px;width:100%;max-width:660px;}'
  /* the press */
  + '.iw-press{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;flex:none;width:calc(var(--iw-inky) + 16px);}'
  + '.iw-inky{display:block;width:var(--iw-inky);height:var(--iw-inky);transform-origin:50% 90%;} .iw-inky.is-cheer{animation:iw-cheer .5s ease-in-out 3;} @keyframes iw-cheer{50%{transform:rotate(8deg);}}'
  + '.iw-rollers{display:block;width:100%;height:16px;border-radius:8px;background:repeating-linear-gradient(90deg,#8A8A96 0 10px,#B9B9C4 10px 20px);box-shadow:inset 0 0 0 2px var(--iw-ink);}'
  + '.iw-stack{position:relative;display:block;width:44px;height:52px;margin-top:4px;}'
  + '.iw-leaf{position:absolute;left:0;bottom:0;width:40px;height:48px;border-radius:4px;background:var(--iw-cream);box-shadow:inset 0 0 0 2px var(--iw-ink);} .iw-leaf:nth-child(2){left:3px;bottom:3px;} .iw-leaf:nth-child(3){left:6px;bottom:6px;}'
  + '.iw-img{width:100%;height:100%;object-fit:contain;display:block;pointer-events:none;}'
  /* the page */
  + '.iw-sheet{display:flex;justify-content:center;flex:0 1 var(--iw-page-w);min-width:0;}'
  + '.iw-page{position:relative;display:flex;flex-direction:column;gap:10px;width:var(--iw-page-w);box-sizing:border-box;padding:12px;border:0;border-radius:10px;background:var(--iw-cream);box-shadow:inset 0 0 0 3px var(--iw-ink),0 6px 14px rgba(0,0,0,.14);cursor:grab;touch-action:none;font:inherit;color:var(--iw-ink);animation:iw-print .35s ease-out;} @keyframes iw-print{0%{transform:translateY(-30px);opacity:0;}}'
  + '.iw-page.is-sel{box-shadow:inset 0 0 0 4px var(--iw-coral),0 6px 14px rgba(0,0,0,.14);transform:translateY(-4px);}'
  + '.iw-page.is-back{animation:iw-back .5s ease-in-out;} @keyframes iw-back{40%{transform:translateY(40px) rotate(-3deg);}}'
  + '.iw-page.is-filed{animation:iw-file .5s ease-in forwards;} @keyframes iw-file{to{transform:translateX(-60%) scale(.3);opacity:0;}}'
  + '.iw-box{position:relative;display:flex;align-items:center;justify-content:center;height:calc(var(--iw-unit) * 1.35);border-radius:6px;background:#EEF7FC;box-shadow:inset 0 0 0 2.5px var(--iw-ink);overflow:hidden;}'
  + '.iw-box .iw-img{width:calc(var(--iw-unit) * 1.2);height:calc(var(--iw-unit) * 1.2);}'
  + '.iw-box.is-empty{background:#fff;box-shadow:inset 0 0 0 2.5px var(--iw-ink);} .iw-box.is-empty::after{content:"";position:absolute;inset:14px;border:3px dashed #C9B999;border-radius:6px;}'
  + '.iw-box.is-pulse::after{border-color:var(--iw-gold);animation:iw-pulse 1s ease-in-out 3;} @keyframes iw-pulse{50%{opacity:.25;}}'
  + '.iw-box.is-lit::before{content:"";position:absolute;top:0;bottom:0;width:30%;background:linear-gradient(90deg,rgba(255,236,150,0),rgba(255,236,150,.7),rgba(255,236,150,0));animation:iw-light .9s ease-in-out;z-index:1;} @keyframes iw-light{0%{left:-30%;}100%{left:100%;}}'
  + '.iw-img.is-sweep{animation:iw-sweep .7s ease-out;} @keyframes iw-sweep{0%{clip-path:inset(0 100% 0 0);}}'
  + '.iw-scrawl{position:absolute;inset:8px;overflow:hidden;font-family:' + B + ';font-size:12px;line-height:1.1;color:var(--iw-blue);word-break:break-all;animation:iw-drip .9s ease-in forwards;} @keyframes iw-drip{0%,55%{transform:none;opacity:1;}100%{transform:translateY(30px);opacity:0;}}'
  + '.iw-lines{position:relative;display:block;height:calc(var(--iw-lh) * 3);margin:0 4px;--iw-lh:32px;}'
  + '.iw-rule{position:absolute;left:0;right:0;height:2px;background:#C9B999;} .iw-rule:nth-child(1){top:calc(var(--iw-lh) - 3px);} .iw-rule:nth-child(2){top:calc(var(--iw-lh) * 2 - 3px);} .iw-rule:nth-child(3){top:calc(var(--iw-lh) * 3 - 3px);}'
  + '.iw-lines.is-empty .iw-rule{background:repeating-linear-gradient(90deg,#C9B999 0 8px,transparent 8px 14px);} .iw-lines.is-pulse .iw-rule{background:repeating-linear-gradient(90deg,var(--iw-gold) 0 8px,transparent 8px 14px);animation:iw-pulse 1s ease-in-out 3;}'
  + '.iw-text{position:absolute;left:2px;right:2px;top:-3px;font-family:' + B + ';font-weight:800;font-size:19px;line-height:var(--iw-lh);color:var(--iw-ink);text-align:left;overflow-wrap:anywhere;}'
  + '.iw-text.is-type{animation:iw-type .9s steps(18,end);} @keyframes iw-type{0%{clip-path:inset(0 100% 0 0);}}'
  + '.iw-text.is-read{text-decoration:underline;text-decoration-color:var(--iw-gold);text-decoration-thickness:4px;text-underline-offset:4px;}'
  + '.iw-squash{position:absolute;left:30%;top:20%;width:var(--iw-unit);height:var(--iw-unit);object-fit:contain;transform:scaleY(.45);animation:iw-drip .9s ease-in forwards;}'
  + '.iw-caret{position:absolute;left:12%;top:30%;width:4px;height:36%;background:var(--iw-ink);animation:iw-blink .4s steps(2,end) infinite;} @keyframes iw-blink{50%{opacity:0;}}'
  + '.iw-hover{position:absolute;left:50%;top:40%;width:56px;height:44px;margin-left:-28px;animation:iw-wiggle .2s ease-in-out 4;} @keyframes iw-wiggle{50%{transform:rotate(10deg);}}'
  /* the tool marks (drawn): ruled lines / a frame / an open book */
  + '.iw-tool{display:block;width:44px;height:30px;}'
  + '.iw-tool-author{background:repeating-linear-gradient(180deg,transparent 0 6px,var(--iw-blue) 6px 9px);}'
  + '.iw-tool-illustrator{border:4px solid var(--iw-coral);border-radius:4px;box-sizing:border-box;background:linear-gradient(135deg,transparent 45%,#F7C77A 45%);}'
  + '.iw-tool-reader{border:3px solid var(--iw-teal);border-top:0;border-radius:0 0 10px 10px;box-sizing:border-box;background:linear-gradient(90deg,transparent 48%,var(--iw-teal) 48% 52%,transparent 52%);}'
  + '.iw-tool.is-pulse{animation:iw-pulse 1s ease-in-out 2;}'
  /* the desks */
  + '.iw-desks{display:grid;grid-template-columns:repeat(var(--iw-n),minmax(0,1fr));gap:10px;width:100%;max-width:660px;}'
  + '.iw-desk{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;min-height:44px;padding:8px 4px 6px;border:0;border-radius:14px;background:#F6E7CC;box-shadow:inset 0 0 0 3px var(--iw-ink),0 4px 0 #C9A87A;cursor:pointer;font:inherit;color:var(--iw-ink);overflow:hidden;}'
  + '.iw-desk.is-over{box-shadow:inset 0 0 0 4px var(--iw-teal),0 4px 0 #C9A87A;} .iw-desk.is-sel{box-shadow:inset 0 0 0 4px var(--iw-coral),0 4px 0 #C9A87A;}'
  + '.iw-desk.is-working{background:#FFF1BF;} .iw-desk.is-off{opacity:.5;cursor:default;}'
  + '.iw-person{display:block;width:var(--iw-person);height:var(--iw-person);touch-action:none;}'
  + '.iw-plate{display:block;padding:2px 8px;border-radius:6px;background:#fff;box-shadow:inset 0 0 0 2px var(--iw-ink);font-family:' + D + ';font-weight:800;font-size:18px;line-height:1.25;color:var(--iw-ink);white-space:nowrap;}'
  + '.iw-door{position:absolute;left:0;right:0;top:0;bottom:44px;border-radius:12px 12px 0 0;background:linear-gradient(90deg,#B07A4A 0 49%,#8C5C33 49% 51%,#B07A4A 51%);box-shadow:inset 0 0 0 3px var(--iw-ink);}'
  + '.iw-knob{position:absolute;right:16%;top:50%;width:12px;height:12px;border-radius:50%;background:var(--iw-gold);box-shadow:inset 0 0 0 2px var(--iw-ink);}'
  + '.iw-desk.is-door .iw-plate{position:relative;z-index:1;font-size:20px;} .iw-desk.is-door .iw-person,.iw-desk.is-door .iw-tool{visibility:hidden;} .iw-wrap.is-narrow .iw-door{bottom:34px;}'
  /* the cover */
  + '.iw-cover{display:flex;flex-direction:column;align-items:center;gap:10px;width:var(--iw-page-w);box-sizing:border-box;padding:12px;border-radius:10px 14px 14px 10px;background:var(--iw-blue);box-shadow:inset 8px 0 0 rgba(0,0,0,.22),inset 0 0 0 3px var(--iw-ink),0 6px 14px rgba(0,0,0,.16);}'
  + '.iw-cover.is-flip{animation:iw-flip .7s ease-in-out;} @keyframes iw-flip{30%{transform:perspective(600px) rotateY(-28deg);}70%{transform:perspective(600px) rotateY(10deg);}}'
  + '.iw-coverart{display:block;box-sizing:border-box;width:calc(var(--iw-unit) * 1.1 + 12px);height:calc(var(--iw-unit) * 1.1 + 12px);padding:6px;border-radius:8px;background:#EEF7FC;}'
  + '.iw-credits{display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%;}'
  + '.iw-credit{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-height:calc(var(--iw-unit) + 44px);padding:6px;border:0;border-radius:10px;background:rgba(255,255,255,.9);box-shadow:inset 0 0 0 3px var(--iw-ink);cursor:pointer;}'
  + '.iw-credit.is-over{box-shadow:inset 0 0 0 4px var(--iw-gold);} .iw-credit.is-full{background:#fff;}'
  + '.iw-icon{display:block;width:44px;height:30px;} .iw-icon-words{background:repeating-linear-gradient(180deg,transparent 0 6px,var(--iw-blue) 6px 9px);} .iw-icon-picture{border:4px solid var(--iw-coral);border-radius:4px;box-sizing:border-box;}'
  + '.iw-portrait{width:var(--iw-unit);height:var(--iw-unit);animation:iw-stamp .25s ease-out;} @keyframes iw-stamp{0%{transform:scale(1.4);}}'
  + '.iw-credit.is-smear-paint::after{content:"";position:absolute;left:10%;right:10%;top:40%;height:26%;border-radius:40%;background:linear-gradient(90deg,#F2784B,#E8B83A);opacity:.8;animation:iw-drip .9s ease-in forwards;}'
  + '.iw-credit.is-smear-letters::after{content:"abc abc abc";position:absolute;inset:30% 8%;font-family:' + B + ';font-size:12px;color:var(--iw-blue);animation:iw-drip .9s ease-in forwards;}'
  + '.iw-ghost{position:fixed;z-index:9999;pointer-events:none;opacity:.85;}'
  + '.iw-note{width:100%;max-width:660px;min-height:24px;margin:0;font-weight:700;font-size:clamp(15px,2.3vw,18px);line-height:1.3;font-family:' + B + ';color:var(--iw-teal);text-align:center;} .iw-note:empty{display:none;} .iw-note.is-ok{font-weight:800;} .iw-note.is-wrong{color:#A6461F;}'
  /* phones */
  + '.iw-wrap.is-narrow{gap:8px;} .iw-wrap.is-narrow .iw-top{gap:8px;} .iw-wrap.is-narrow .iw-page,.iw-wrap.is-narrow .iw-cover{padding:8px;gap:6px;}'
  + '.iw-wrap.is-narrow .iw-lines{--iw-lh:26px;} .iw-wrap.is-narrow .iw-text{font-size:16px;}'
  + '.iw-wrap.is-narrow .iw-desks{gap:6px;} .iw-wrap.is-narrow .iw-desk{padding:6px 2px 6px;gap:4px;} .iw-wrap.is-narrow .iw-tool{width:34px;height:22px;}'
  + '.iw-wrap.is-narrow .iw-plate{font-size:14px;padding:2px 4px;} .iw-wrap.is-narrow .iw-desk.is-door .iw-plate{font-size:15px;}'
  + '.iw-wrap.is-narrow .iw-stack{display:none;}'
  + '.iw-wrap.is-fast *,.iw-wrap.is-fast *::before,.iw-wrap.is-fast *::after{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.iw-wrap *{animation-duration:.2s !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'iw-css'; s.textContent = css; document.head.appendChild(s);
}
