/* =====================================================================
   two-tales-activity.js — ACTIVITY #120 of the one-by-one rebuild:
   "Two Moons" → THE PLANK ACROSS TWO BOOKS (RL.1.9; all 11 locales).
   Model: two-tales-core.js (TwoTalesCore).
   Design: docs/activities-rebuild/designs/120-two-tales.md
   ---------------------------------------------------------------------
   Two little picture books on Mossbeard's table — the gold-moon book and
   the silver-moon book — each three pages of library pictures and one
   sentence a page; a bridge across the top; a tray of planks, each an
   experience ("Lost it, then found it"). Tap a plank, then tap where it
   goes: the bridge (in both stories), a book (only in that story) or the
   basket (in neither). Check: each end of the plank walks its book page by
   page; where a page shows that experience a wooden prop rises and the
   end rests; with a page in both books the plank lies flat across, with
   one it tips into that book, with none it drops through. From miss 2
   every plank shows a gold dot if the gold book has it and a silver dot
   if the silver book has it. On phones one book shows at a time, between
   its gold and silver tabs. No timer, no score. Test seams:
   window.TwoTalesActivity.st / ._pool / ._order / ._ensurePool / ._start
   / ._dims / ._render2 / .FAST / .OK_MS.
   ===================================================================== */
var TwoTalesActivity = {
  id: 'two-tales',
  /* the drawn apparatus (the hierarchy gate): the planks and the bridge they lie on */
  apparatusClasses: ['tt-plankart', 'tt-moonart'],
  /*STRINGS-BEGIN*/strings: {
    title: {en:"Two Moons",de:"Zwei Monde",fr:"Deux lunes",es:"Dos lunas",pt:"Duas luas",it:"Due lune",nl:"Twee manen",sv:"Två månar",da:"To måner",no:"To måner",fi:"Kaksi kuuta"},
    instruction: {en:"Read both stories. Find what happened in BOTH, and lay that plank across the books.",de:"Lies beide Geschichten. Finde, was in BEIDEN passiert ist, und leg dieses Brett über die Bücher.",fr:"Lis les deux histoires. Trouve ce qui arrive dans les DEUX et pose cette planche par-dessus les livres.",es:"Lee los dos cuentos. Busca lo que pasó en LOS DOS y pon esa tabla de un libro al otro.",pt:"Leia as duas histórias. Ache o que aconteceu nas DUAS e ponha essa tábua de um livro ao outro.",it:"Leggi le due storie. Trova che cosa succede in TUTTE E DUE e metti quell’asse da un libro all’altro.",nl:"Lees beide verhalen. Zoek wat in ALLEBEI gebeurde en leg die plank over de boeken.",sv:"Läs båda berättelserna. Hitta det som hände i BÅDA och lägg den plankan över böckerna.",da:"Læs begge historier. Find det, der skete i BEGGE, og læg den planke hen over bøgerne.",no:"Les begge historiene. Finn det som skjedde i BEGGE, og legg den planken over bøkene.",fi:"Lue molemmat tarinat. Etsi, mitä tapahtui MOLEMMISSA, ja laita se lauta kirjojen yli."},
    instrBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    check: {en:"Check",de:"Prüfen",fr:"Vérifier",es:"Comprobar",pt:"Verificar",it:"Controlla",nl:"Controleer",sv:"Kontrollera",da:"Tjek",no:"Sjekk",fi:"Tarkista"},
    tSame: {en:"Read both stories. Find what happened in BOTH, and lay that plank across the books.",de:"Lies beide Geschichten. Finde, was in BEIDEN passiert ist, und leg dieses Brett über die Bücher.",fr:"Lis les deux histoires. Trouve ce qui arrive dans les DEUX et pose cette planche par-dessus les livres.",es:"Lee los dos cuentos. Busca lo que pasó en LOS DOS y pon esa tabla de un libro al otro.",pt:"Leia as duas histórias. Ache o que aconteceu nas DUAS e ponha essa tábua de um livro ao outro.",it:"Leggi le due storie. Trova che cosa succede in TUTTE E DUE e metti quell’asse da un libro all’altro.",nl:"Lees beide verhalen. Zoek wat in ALLEBEI gebeurde en leg die plank over de boeken.",sv:"Läs båda berättelserna. Hitta det som hände i BÅDA och lägg den plankan över böckerna.",da:"Læs begge historier. Find det, der skete i BEGGE, og læg den planke hen over bøgerne.",no:"Les begge historiene. Finn det som skjedde i BEGGE, og legg den planken over bøkene.",fi:"Lue molemmat tarinat. Etsi, mitä tapahtui MOLEMMISSA, ja laita se lauta kirjojen yli."},
    tOnly: {en:"Read both stories. Find what happened in only one, and put that plank on that story's book.",de:"Lies beide Geschichten. Finde, was nur in einer passiert ist, und leg dieses Brett auf ihr Buch.",fr:"Lis les deux histoires. Trouve ce qui arrive dans une seule histoire et pose cette planche sur son livre.",es:"Lee los dos cuentos. Busca lo que pasó en un solo cuento y pon esa tabla sobre su libro.",pt:"Leia as duas histórias. Ache o que aconteceu em uma só história e ponha essa tábua no livro dela.",it:"Leggi le due storie. Trova che cosa succede in una sola storia e metti quell’asse sul suo libro.",nl:"Lees beide verhalen. Zoek wat maar in één verhaal gebeurde en leg die plank op zijn boek.",sv:"Läs båda berättelserna. Hitta det som bara hände i en och lägg den plankan på dess bok.",da:"Læs begge historier. Find det, der kun skete i én historie, og læg den planke på dens bog.",no:"Les begge historiene. Finn det som bare skjedde i én historie, og legg den planken på boka dens.",fi:"Lue molemmat tarinat. Etsi, mitä tapahtui vain yhdessä tarinassa, ja laita se lauta sen kirjan päälle."},
    tSort: {en:"Read both stories. Give every plank its place.",de:"Lies beide Geschichten. Gib jedem Brett seinen Platz.",fr:"Lis les deux histoires. Donne une place à chaque planche.",es:"Lee los dos cuentos. Pon cada tabla en su lugar.",pt:"Leia as duas histórias. Ponha cada tábua no lugar dela.",it:"Leggi le due storie. Metti ogni asse al suo posto.",nl:"Lees beide verhalen. Geef elke plank een plek.",sv:"Läs båda berättelserna. Ge varje planka sin plats.",da:"Læs begge historier. Giv hver planke sin plads.",no:"Les begge historiene. Gi hver planke sin plass.",fi:"Lue tarinat. Anna jokaiselle laudalle oma paikka."},
    nudge: {en:"Tap a plank, then tap where it goes.",de:"Tippe ein Brett an, dann die Stelle, wo es hingehört.",fr:"Touche une planche, puis l’endroit où elle va.",es:"Toca una tabla y luego el lugar donde va.",pt:"Toque em uma tábua e depois no lugar dela.",it:"Tocca un’asse, poi il posto dove va.",nl:"Tik op een plank en dan op de plek waar hij hoort.",sv:"Tryck på en planka och sedan där den ska ligga.",da:"Tryk på en planke og så der, hvor den skal ligge.",no:"Trykk på en planke og så der den skal ligge.",fi:"Napauta lautaa ja sitten paikkaa, johon se kuuluu."},
    hintPick: {en:"Tap a plank first.",de:"Tippe zuerst ein Brett an.",fr:"Touche d’abord une planche.",es:"Primero toca una tabla.",pt:"Primeiro toque em uma tábua.",it:"Prima tocca un’asse.",nl:"Tik eerst op een plank.",sv:"Tryck först på en planka.",da:"Tryk først på en planke.",no:"Trykk først på en planke.",fi:"Napauta ensin lautaa."},
    hintEmpty: {en:"Pick up a plank and lay it where it belongs.",de:"Nimm ein Brett und leg es dorthin, wo es hingehört.",fr:"Prends une planche et pose-la là où elle va.",es:"Toma una tabla y ponla donde va.",pt:"Pegue uma tábua e ponha no lugar dela.",it:"Prendi un’asse e mettila dove va.",nl:"Pak een plank en leg hem waar hij hoort.",sv:"Ta en planka och lägg den där den hör hemma.",da:"Tag en planke, og læg den der, hvor den hører til.",no:"Ta en planke og legg den der den hører hjemme.",fi:"Ota lauta ja laita se paikkaan, johon se kuuluu."},
    hintSortEmpty: {en:"Every plank needs a place.",de:"Jedes Brett braucht einen Platz.",fr:"Chaque planche a besoin d’une place.",es:"Cada tabla necesita un lugar.",pt:"Cada tábua precisa de um lugar.",it:"Ogni asse ha bisogno di un posto.",nl:"Elke plank heeft een plek nodig.",sv:"Varje planka behöver en plats.",da:"Hver planke skal have en plads.",no:"Hver planke trenger en plass.",fi:"Jokainen lauta tarvitsee paikan."},
    hintMiss1: {en:"Watch where the plank can rest. Read the page it found.",de:"Schau, wo das Brett liegen bleiben kann. Lies die Seite, die es gefunden hat.",fr:"Regarde où la planche peut se poser. Lis la page qu’elle a trouvée.",es:"Mira dónde se puede apoyar la tabla. Lee la página que encontró.",pt:"Veja onde a tábua consegue se apoiar. Leia a página que ela achou.",it:"Guarda dove l’asse si può appoggiare. Leggi la pagina che ha trovato.",nl:"Kijk waar de plank kan blijven liggen. Lees de bladzijde die hij vond.",sv:"Titta var plankan kan ligga kvar. Läs sidan den hittade.",da:"Se, hvor planken kan ligge. Læs den side, den fandt.",no:"Se hvor planken kan ligge. Les siden den fant.",fi:"Katso, mihin lauta voi jäädä. Lue sivu, jonka se löysi."},
    hintMiss2: {en:"Each end of a plank looks in one book. Does the gold book have it? Does the silver book?",de:"Jedes Ende vom Brett sucht in einem Buch. Hat das goldene Buch es? Und das silberne?",fr:"Chaque bout de planche cherche dans un livre. Le livre doré l’a-t-il ? Et le livre argenté ?",es:"Cada punta de la tabla busca en un libro. ¿Lo tiene el libro dorado? ¿Y el plateado?",pt:"Cada ponta da tábua procura em um livro. O livro dourado tem isso? E o prateado?",it:"Ogni estremità dell’asse cerca in un libro. Il libro dorato ce l’ha? E quello argentato?",nl:"Elk uiteinde van de plank zoekt in één boek. Heeft het gouden boek het? En het zilveren?",sv:"Varje ände av plankan letar i en bok. Har den gyllene boken det? Och den silvriga?",da:"Hver ende af planken leder i én bog. Har den gyldne bog det? Og den sølvfarvede?",no:"Hver ende av planken leter i én bok. Har gullboka det? Og sølvboka?",fi:"Laudan kumpikin pää etsii yhdestä kirjasta. Onko se kultaisessa kirjassa? Entä hopeisessa?"},
    okSame: {en:"Yes! It happened in both stories: «{tag}». The plank rests in both books.",de:"Ja! Das ist in beiden Geschichten passiert: „{tag}“. Das Brett liegt in beiden Büchern.",fr:"Oui ! C’est arrivé dans les deux histoires : « {tag} ». La planche se pose dans les deux livres.",es:"¡Sí! Pasó en los dos cuentos: «{tag}». La tabla se apoya en los dos libros.",pt:"Isso! Aconteceu nas duas histórias: “{tag}”. A tábua se apoia nos dois livros.",it:"Sì! È successo in tutte e due le storie: «{tag}». L’asse si appoggia sui due libri.",nl:"Ja! Het gebeurde in allebei: ‘{tag}’. De plank ligt op beide boeken.",sv:"Ja! Det hände i båda berättelserna: ”{tag}”. Plankan ligger på båda böckerna.",da:"Ja! Det skete i begge historier: ”{tag}”. Planken ligger på begge bøger.",no:"Ja! Det skjedde i begge historiene: «{tag}». Planken ligger på begge bøkene.",fi:"Kyllä! Se tapahtui molemmissa tarinoissa: ”{tag}”. Lauta lepää molempien kirjojen päällä."},
    okOnly: {en:"Yes! Only in «{name}»: «{tag}». The other story doesn't have it.",de:"Ja! Nur in „{name}“: „{tag}“. Die andere Geschichte hat das nicht.",fr:"Oui ! Seulement dans « {name} » : « {tag} ». L’autre histoire ne l’a pas.",es:"¡Sí! Solo en «{name}»: «{tag}». El otro cuento no lo tiene.",pt:"Isso! Só em “{name}”: “{tag}”. A outra história não tem isso.",it:"Sì! Solo in «{name}»: «{tag}». L’altra storia non ce l’ha.",nl:"Ja! Alleen in ‘{name}’: ‘{tag}’. Het andere verhaal heeft het niet.",sv:"Ja! Bara i ”{name}”: ”{tag}”. Den andra berättelsen har det inte.",da:"Ja! Kun i ”{name}”: ”{tag}”. Den anden historie har det ikke.",no:"Ja! Bare i «{name}»: «{tag}». Den andre historien har det ikke.",fi:"Kyllä! Vain kirjassa ”{name}”: ”{tag}”. Toisessa tarinassa sitä ei ole."},
    okSort: {en:"Yes! Every plank has its place.",de:"Ja! Jedes Brett hat seinen Platz.",fr:"Oui ! Chaque planche est à sa place.",es:"¡Sí! Cada tabla está en su lugar.",pt:"Isso! Cada tábua está no lugar dela.",it:"Sì! Ogni asse è al suo posto.",nl:"Ja! Elke plank ligt op zijn plek.",sv:"Ja! Varje planka har sin plats.",da:"Ja! Hver planke har sin plads.",no:"Ja! Hver planke har sin plass.",fi:"Kyllä! Jokainen lauta on paikallaan."},
    aGold: {en:"Gold moon book: {name}",de:"Buch mit dem goldenen Mond: {name}",fr:"Livre de la lune d’or : {name}",es:"Libro de la luna dorada: {name}",pt:"Livro da lua dourada: {name}",it:"Libro della luna d’oro: {name}",nl:"Boek van de gouden maan: {name}",sv:"Boken med den gyllene månen: {name}",da:"Bogen med den gyldne måne: {name}",no:"Boka med gullmånen: {name}",fi:"Kultaisen kuun kirja: {name}"},
    aSilver: {en:"Silver moon book: {name}",de:"Buch mit dem silbernen Mond: {name}",fr:"Livre de la lune d’argent : {name}",es:"Libro de la luna plateada: {name}",pt:"Livro da lua prateada: {name}",it:"Libro della luna d’argento: {name}",nl:"Boek van de zilveren maan: {name}",sv:"Boken med den silvriga månen: {name}",da:"Bogen med den sølvfarvede måne: {name}",no:"Boka med sølvmånen: {name}",fi:"Hopeisen kuun kirja: {name}"},
    aPage: {en:"Page {i}: {t}",de:"Seite {i}: {t}",fr:"Page {i} : {t}",es:"Página {i}: {t}",pt:"Página {i}: {t}",it:"Pagina {i}: {t}",nl:"Bladzijde {i}: {t}",sv:"Sida {i}: {t}",da:"Side {i}: {t}",no:"Side {i}: {t}",fi:"Sivu {i}: {t}"},
    aAcross: {en:"Across both books",de:"Über beide Bücher",fr:"Par-dessus les deux livres",es:"De un libro al otro",pt:"De um livro ao outro",it:"Da un libro all’altro",nl:"Over beide boeken",sv:"Över båda böckerna",da:"Hen over begge bøger",no:"Over begge bøkene",fi:"Molempien kirjojen yli"},
    aBasket: {en:"In neither story",de:"In keiner Geschichte",fr:"Dans aucune histoire",es:"En ningún cuento",pt:"Em nenhuma história",it:"In nessuna storia",nl:"In geen van beide verhalen",sv:"I ingen av berättelserna",da:"I ingen af historierne",no:"I ingen av historiene",fi:"Ei kummassakaan tarinassa"},
    aPlaced: {en:"{tag}. Tap to take it back.",de:"{tag}. Tippen, um es zurückzunehmen.",fr:"{tag}. Touche pour la reprendre.",es:"{tag}. Toca para regresarla.",pt:"{tag}. Toque para tirar.",it:"{tag}. Tocca per riprenderla.",nl:"{tag}. Tik om hem terug te pakken.",sv:"{tag}. Tryck för att ta tillbaka den.",da:"{tag}. Tryk for at tage den tilbage.",no:"{tag}. Trykk for å ta den tilbake.",fi:"{tag}. Napauta, niin otat sen takaisin."},
    srRests: {en:"Each end found a page: the plank lies flat across both books.",de:"Jedes Ende hat eine Seite gefunden: Das Brett liegt flach über beiden Büchern.",fr:"Chaque bout a trouvé une page : la planche est bien à plat sur les deux livres.",es:"Cada punta encontró una página: la tabla queda plana sobre los dos libros.",pt:"Cada ponta achou uma página: a tábua fica reta sobre os dois livros.",it:"Ogni estremità ha trovato una pagina: l’asse sta dritta sui due libri.",nl:"Elk uiteinde vond een bladzijde: de plank ligt plat over beide boeken.",sv:"Varje ände hittade en sida: plankan ligger plant över båda böckerna.",da:"Hver ende fandt en side: planken ligger fladt hen over begge bøger.",no:"Hver ende fant en side: planken ligger flatt over begge bøkene.",fi:"Kumpikin pää löysi sivun: lauta on suorassa molempien kirjojen yli."},
    srTips: {en:"Only one book has it: the plank tips into that book.",de:"Nur ein Buch hat das: Das Brett kippt in dieses Buch.",fr:"Un seul livre l’a : la planche bascule dans ce livre.",es:"Solo un libro lo tiene: la tabla se inclina hacia ese libro.",pt:"Só um livro tem isso: a tábua tomba para esse livro.",it:"Solo un libro ce l’ha: l’asse si inclina verso quel libro.",nl:"Maar één boek heeft het: de plank kantelt naar dat boek.",sv:"Bara en bok har det: plankan tippar ner i den boken.",da:"Kun én bog har det: planken vipper ned i den bog.",no:"Bare én bok har det: planken vipper ned i den boka.",fi:"Vain yhdessä kirjassa on se: lauta kallistuu siihen kirjaan."},
    srDrops: {en:"Neither book has it: the plank drops through the gap.",de:"Kein Buch hat das: Das Brett fällt durch die Lücke.",fr:"Aucun livre ne l’a : la planche tombe dans le vide.",es:"Ningún libro lo tiene: la tabla se cae por el hueco.",pt:"Nenhum livro tem isso: a tábua cai no vão.",it:"Nessun libro ce l’ha: l’asse cade nel vuoto.",nl:"Geen van beide boeken heeft het: de plank valt erdoor.",sv:"Ingen bok har det: plankan faller ner i springan.",da:"Ingen af bøgerne har det: planken falder ned i hullet.",no:"Ingen av bøkene har det: planken faller ned i glipen.",fi:"Kummassakaan kirjassa sitä ei ole: lauta putoaa väliin."},
    setTask: {en:"Task",de:"Aufgabe",fr:"Activité",es:"Actividad",pt:"Atividade",it:"Attività",nl:"Opdracht",sv:"Uppgift",da:"Opgave",no:"Oppgave",fi:"Tehtävä"},
    mSame: {en:"What is the same?",de:"Was ist gleich?",fr:"Qu’est-ce qui est pareil ?",es:"¿Qué es igual?",pt:"O que é igual?",it:"Che cosa è uguale?",nl:"Wat is hetzelfde?",sv:"Vad är likadant?",da:"Hvad er ens?",no:"Hva er likt?",fi:"Mikä on samaa?"},
    mOnly: {en:"What happened in only one?",de:"Was passiert nur in einer?",fr:"Qu’est-ce qui arrive dans une seule ?",es:"¿Qué pasó en uno solo?",pt:"O que aconteceu em uma só?",it:"Che cosa succede in una sola?",nl:"Wat gebeurde maar in één?",sv:"Vad hände bara i en?",da:"Hvad skete kun i én?",no:"Hva skjedde bare i én?",fi:"Mitä tapahtui vain yhdessä?"},
    mSort: {en:"Sort every plank",de:"Jedes Brett sortieren",fr:"Ranger chaque planche",es:"Ordenar cada tabla",pt:"Separar cada tábua",it:"Sistemare ogni asse",nl:"Elke plank sorteren",sv:"Sortera varje planka",da:"Sortér hver planke",no:"Sorter hver planke",fi:"Lajittele jokainen lauta"},
    setPages: {en:"Pages",de:"Seiten",fr:"Pages",es:"Páginas",pt:"Páginas",it:"Pagine",nl:"Bladzijden",sv:"Sidor",da:"Sider",no:"Sider",fi:"Sivut"},
    p3: {en:"3 pages",de:"3 Seiten",fr:"3 pages",es:"3 páginas",pt:"3 páginas",it:"3 pagine",nl:"3 bladzijden",sv:"3 sidor",da:"3 sider",no:"3 sider",fi:"3 sivua"},
    p2: {en:"2 pages",de:"2 Seiten",fr:"2 pages",es:"2 páginas",pt:"2 páginas",it:"2 pagine",nl:"2 bladzijden",sv:"2 sidor",da:"2 sider",no:"2 sider",fi:"2 sivua"},
  },/*STRINGS-END*/

  defaults: { task: 'same', pages: '3' },
  settings: [
    { key: 'task', type: 'choice', labelKey: 'setTask', options: [{ value: 'same', labelKey: 'mSame' }, { value: 'only', labelKey: 'mOnly' }, { value: 'sort', labelKey: 'mSort' }] },
    { key: 'pages', type: 'choice', labelKey: 'setPages', options: [{ value: '3', labelKey: 'p3' }, { value: '2', labelKey: 'p2' }] }
  ],
  OK_MS: 4200, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._at = 0;
    this._timers = []; this._ro = null; this._view = {}; this._nudged = false; this._anim = null; this._book = 'gold';
    injectTwoTalesCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; this._anim = null; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return TwoTalesCore.locale(((this.api && this.api.lang) || 'en')); },
  _mode: function () { return TwoTalesCore.modeOf(this._setting('task')); },
  _pages: function () { return TwoTalesCore.pagesOf(this._setting('pages')); },
  _key: function () { return this._loc() + '/' + this._mode() + '/' + this._pages(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = TwoTalesCore.rounds(this._mode()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = TwoTalesCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._mode(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._orderForPool = pool; this._pass = pass; }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'twotales.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var m = this.st.mode, line = this._t(m === 'only' ? 'tOnly' : m === 'sort' ? 'tSort' : 'tSame'); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers(); this._at = at || 0; this._book = 'gold';
    this.st = TwoTalesCore.newState(this._loc(), this._mode(), r, this._pages());
    this._view = { note: '', ok: '' };
    if (!this._nudged) { this._view.note = this._t('nudge'); this._view.nudge = true; }
    this._setPrompt();
  },
  _clearHelp: function () { if (this._view.nudge) this._nudged = true; this._view.note = ''; this._view.nudge = false; },
  _tale: function (side) { return TwoTalesCore.tale(this._loc(), side === 'gold' ? this.st.gold : this.st.silver, this.st.pages); },
  _label: function (tag) { return TwoTalesCore.label(this._loc(), tag); },

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
    var wrap = api.el('div', 'tt-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="tt-bridgerow"></div><div class="tt-books"></div><div class="tt-tray"></div><div class="tt-foot"></div><p class="tt-note" aria-live="polite"></p><p class="tt-sr" aria-live="polite"></p>';
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
  _dims: function () {
    var W = this._width(), B = TwoTalesCore.band(W), two = this.st && this.st.pages === 2;
    return { W: W, wide: B.wide, tiny: B.tiny, xs: B.xs, pic: B.wide ? (two ? 120 : 96) : (two ? 80 : 64), turtle: B.wide ? 96 : 64 };
  },
  _img: function (pic, size) { return '<img src="/image-library-webp/themes/' + pic + '@2x.webp" alt="" width="' + size + '" height="' + size + '" draggable="false">'; },
  _sr: function (s) { var el = this._qs('.tt-sr'); if (el) el.textContent = s; },
  _moon: function (side, size) { var f = side === 'gold' ? '#F2C14E' : '#C3CCD4', s = side === 'gold' ? '#B8862A' : '#8C98A3'; return '<svg class="tt-moonart" viewBox="0 0 24 24" width="' + size + '" height="' + size + '" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="' + f + '" stroke="' + s + '" stroke-width="2"/><circle cx="16" cy="9" r="7" fill="' + (side === 'gold' ? '#FFF6E2' : '#F5F7F8') + '" opacity=".55"/></svg>'; },
  /* a plank: wood, grain, and its words */
  _plankHTML: function (tag, extra) { return '<span class="tt-grain" aria-hidden="true"></span><span class="tt-plabel">' + esc(this._label(tag)) + '</span>' + (extra || ''); },

  _paint_: function () {
    var C = TwoTalesCore, st = this.st, D = this._dims(), v = this._view, self = this, help = C.help(st), an = this._anim;
    if (an && an.book && !D.wide) this._book = an.book;
    this._wrap.className = 'tt-wrap ' + (D.wide ? 'is-wide' : 'is-narrow') + (D.tiny ? ' is-tiny' : '') + (D.xs ? ' is-xs' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' m-' + st.mode + ' pg-' + st.pages + (help ? ' is-help' : '');
    /* the bridge across the top (and, on phones, the two book tabs either side of it) */
    var row = this._qs('.tt-bridgerow'); row.innerHTML = '';
    if (!D.wide) row.appendChild(this._tab('gold'));
    var turtle = document.createElement('span'); turtle.className = 'tt-turtle' + (st.done && !an && C.placed(st).some(function (p) { return st.place[p] === 'across'; }) ? ' is-walk' : ''); turtle.setAttribute('aria-hidden', 'true');
    turtle.innerHTML = this._img(C.DATA.PICS.turtle, D.turtle);
    if (D.wide) row.appendChild(turtle);
    row.appendChild(this._zone('across', D));
    if (!D.wide) row.appendChild(this._tab('silver'));
    /* the books */
    var books = this._qs('.tt-books'); books.innerHTML = '';
    if (D.wide) { books.appendChild(this._bookEl('gold', D)); books.appendChild(this._bookEl('silver', D)); }
    else books.appendChild(this._bookEl(this._book, D));
    /* the tray */
    var tray = this._qs('.tt-tray'); tray.innerHTML = '';
    st.planks.forEach(function (tag, i) {
      if (st.place[tag]) { var g = document.createElement('span'); g.className = 'tt-slot'; g.setAttribute('aria-hidden', 'true'); tray.appendChild(g); return; }
      var d = help ? C.dots(st, tag) : null;
      var b = self._btn('tt-plank' + (st.sel === tag ? ' is-sel' : ''), 'plank-' + tag, self._label(tag), self._plankHTML(tag, d ? '<span class="tt-dots" aria-hidden="true"><i class="tt-dot dg' + (d.gold ? ' is-on' : '') + '"></i><i class="tt-dot ds' + (d.silver ? ' is-on' : '') + '"></i></span>' : ''));
      b.disabled = st.done || !!an; b.setAttribute('aria-pressed', st.sel === tag ? 'true' : 'false');
      b.addEventListener('click', function () { self._pick(tag); });
      tray.appendChild(b);
    });
    /* Check, and the basket for "in neither story" */
    var foot = this._qs('.tt-foot'); foot.innerHTML = '';
    if (st.mode === 'sort') foot.appendChild(this._zone('basket', D));
    var chk = this._btn('tt-check', 'check', null, '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + esc(this._t('check')) + '</span>');
    chk.disabled = st.done || !!an; chk.addEventListener('click', function () { self._check(); });
    /* on phones three planks leave a cell free in the tray: Check takes it */
    if (!D.wide && st.mode !== 'sort') { chk.classList.add('in-tray'); tray.appendChild(chk); } else foot.appendChild(chk);
    var note = this._qs('.tt-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'tt-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'tt-note' + (v.nudge ? ' is-nudge' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'tt-note'; }
  },
  /* phones: the tab that shows one book */
  _tab: function (side) {
    var self = this, t = this._tale(side), on = this._book === side, n = this.st.planks.filter(function (p) { return self.st.place[p] === side; }).length;
    var b = this._btn('tt-tab tab-' + side + (on ? ' is-on' : ''), 'tab-' + side, this._t(side === 'gold' ? 'aGold' : 'aSilver', { name: t.name }), this._moon(side, 26) + (n ? '<span class="tt-count" aria-hidden="true">' + new Array(n + 1).join('▬') + '</span>' : ''));
    b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.disabled = !!this._anim;
    b.addEventListener('click', function () { self._show(side); });
    return b;
  },
  /* a drop zone: across (the bridge), a book's foot, or the basket — showing the planks laid there */
  _zone: function (target, D, headHTML) {
    var st = this.st, self = this, an = this._anim, on = st.planks.filter(function (p) { return st.place[p] === target; });
    var z = document.createElement('div'); z.className = 'tt-zone z-' + target + (on.length ? ' has' : '') + (headHTML ? ' is-head' : '');
    if (headHTML) { var hd = document.createElement('span'); hd.className = 'tt-bhead'; hd.innerHTML = headHTML; z.appendChild(hd); }
    var labelKey = target === 'across' ? 'aAcross' : target === 'basket' ? 'aBasket' : (target === 'gold' ? 'aGold' : 'aSilver');
    var allowed = TwoTalesCore.TARGETS[st.mode].indexOf(target) >= 0;
    var t = this._btn('tt-target', 'zone-' + target, target === 'gold' || target === 'silver' ? this._t(labelKey, { name: this._tale(target).name }) : this._t(labelKey),
      target === 'basket' ? '<svg class="tt-basketart" viewBox="0 0 60 36" width="60" height="36" aria-hidden="true"><path d="M4 8 H56 L50 34 H10 Z" fill="#D9A866" stroke="#7A5638" stroke-width="2.5"/><path d="M12 8 L18 34 M24 8 L27 34 M36 8 L33 34 M48 8 L42 34 M7 18 H53 M9 27 H51" stroke="#9C7448" stroke-width="2"/></svg>' : '');
    t.disabled = st.done || !!an || !allowed; t.addEventListener('click', function () { self._lay(target); });
    z.appendChild(t);
    on.forEach(function (tag) {
      var ok = st.locked[tag], cls = 'tt-plank is-laid' + (ok ? ' is-ok' : '');
      if (an && an.tag === tag && an.outcome) cls += ' out-' + an.outcome + (an.outcome === 'tip' ? '-' + an.toward : '');
      var b = self._btn(cls, 'laid-' + tag, self._t('aPlaced', { tag: self._label(tag) }), self._plankHTML(tag));
      b.disabled = st.done || !!an || !!ok; b.addEventListener('click', function () { self._takeBack(tag); });
      z.appendChild(b);
    });
    if (target === 'across' && !on.length) { var e = document.createElement('span'); e.className = 'tt-empty'; e.setAttribute('aria-hidden', 'true'); e.innerHTML = '<svg class="tt-plankart" viewBox="0 0 120 20" width="120" height="20"><rect x="2" y="4" width="116" height="12" rx="3" fill="none" stroke="#B98A55" stroke-width="2" stroke-dasharray="6 5"/></svg>'; z.appendChild(e); }
    return z;
  },
  /* a book: its moon, its name, its pages; its foot is where a plank for only this story lies */
  _bookEl: function (side, D) {
    var st = this.st, t = this._tale(side), an = this._anim, self = this;
    var b = document.createElement('section'); b.className = 'tt-book bk-' + side; b.setAttribute('aria-label', this._t(side === 'gold' ? 'aGold' : 'aSilver', { name: t.name }));
    var headHTML = this._moon(side, D.wide ? 28 : 24) + '<b>' + esc(t.name) + '</b>', takes = TwoTalesCore.TARGETS[st.mode].indexOf(side) >= 0;
    /* the book's head names it; where a plank may lie on this book, the head is that place */
    if (takes) b.appendChild(this._zone(side, D, headHTML)); else { var hh = document.createElement('header'); hh.className = 'tt-bhead'; hh.innerHTML = headHTML; b.appendChild(hh); }
    /* the proof pages to show: the plank under test, or every plank that rests in this book once checked */
    var proofs = {}, glows = {}, walkAt = an && an.book === side ? an.page : -1;
    if (an && an.book === side) { if (an.proof != null && an.page >= an.proof) proofs[an.proof] = 1; if (an.glow != null && an.page >= an.glow) glows[an.glow] = 1; }
    if (!an) Object.keys(st.locked).forEach(function (tag) { var where = st.place[tag]; if (where === side || where === 'across') { var w = TwoTalesCore.walk(tag, side === 'gold' ? st.gold : st.silver, st.pages); if (w.proof != null) proofs[w.proof] = 1; } });
    var pages = document.createElement('div'); pages.className = 'tt-pages';
    t.pages.forEach(function (p, i) {
      var pg = document.createElement('div'); pg.className = 'tt-page' + (p.night ? ' is-night' : '') + (p.lit ? ' is-lit' : '') + (walkAt === i ? ' is-walk' : '') + (proofs[i] ? ' is-proof' : '') + (glows[i] && !proofs[i] ? ' is-glow' : '');
      pg.setAttribute('role', 'note'); pg.setAttribute('aria-label', self._t('aPage', { i: i + 1, t: p.caption }));
      pg.innerHTML = '<span class="tt-pic" aria-hidden="true">' + self._img(p.pic, D.pic) + '</span><span class="tt-cap">' + esc(p.caption) + '</span><span class="tt-pmark" aria-hidden="true">' + new Array(i + 2).join('<i></i>') + '</span><span class="tt-prop" aria-hidden="true"></span>';
      pg.addEventListener('click', function () { pg.classList.remove('is-twitch'); void pg.offsetWidth; pg.classList.add('is-twitch'); });
      pages.appendChild(pg);
    });
    b.appendChild(pages);
    return b;
  },

  /* ---------------- the hand ---------------- */
  _pick: function (tag) { if (this._anim) return; if (TwoTalesCore.pick(this.st, tag) === 'no') return; this.api.sound(480); this._clearHelp(); this._paint(); },
  _lay: function (target) {
    if (this._anim) return; var st = this.st;
    if (!st.sel) { this._view.nudge = false; this._view.note = this._t('hintPick'); this.api.sound(200); this._paint(); return; }
    var r = TwoTalesCore.lay(st, target); if (r === 'no') return; this.api.sound(r === 'laid' ? 520 : 320); this._clearHelp(); this._paint();
  },
  /* a laid plank tapped: with a plank in hand, that plank goes there instead (the tap meant the place); otherwise it comes back */
  _takeBack: function (tag) {
    if (this._anim) return; var st = this.st;
    if (st.sel && st.sel !== tag) { this._lay(st.place[tag]); return; }
    if (TwoTalesCore.back(st, tag) === 'no') return; this.api.sound(320); this._clearHelp(); this._paint();
  },
  _show: function (side) { if (this._anim) return; this._book = side; this.api.sound(side === 'gold' ? 600 : 500); this._paint(); },

  /* ---------------- Check: each end walks its book ---------------- */
  _check: function () {
    var C = TwoTalesCore, st = this.st, v = this._view, self = this;
    if (st.done || this._anim) return;
    this._nudged = true;
    var placedAt = {}; C.placed(st).forEach(function (p) { placedAt[p] = st.place[p]; });
    var a = C.check(st);
    if (a.result === 'empty') { v.nudge = false; v.note = this._t(C.hint(st).key); this.api.sound(200); this._paint(); this.api.announce(v.note); return; }
    var finish = function () {
      self._anim = null; self._book = 'gold';
      if (a.result === 'ok') { self._success(); return; }
      v.nudge = false; v.note = self._t(C.hint(st).key); self.api.sound(180); self._paint(); self.api.announce(v.note);
    };
    if (this.FAST) { finish(); return; }
    /* the walks: every laid plank, its gold end then its silver end, page by page; then where it ends up */
    var steps = [], n = st.pages;
    a.tests.forEach(function (x) {
      ['gold', 'silver'].forEach(function (side) {
        var w = x[side], stop = w.proof != null ? w.proof : n - 1;
        for (var p = 0; p <= stop; p++) steps.push({ tag: x.tag, book: side, page: p, proof: w.proof, glow: w.glow, ms: 230 });
      });
      var out = x.truth === 'across' ? 'rest' : x.truth === 'basket' ? 'drop' : 'tip';
      steps.push({ tag: x.tag, outcome: out, toward: x.truth, ms: 650, sr: out === 'rest' ? 'srRests' : out === 'drop' ? 'srDrops' : 'srTips' });
    });
    /* the planks keep their places while they are walked (the core has already sent the wrong ones back) */
    var after = {}; Object.keys(placedAt).forEach(function (p) { after[p] = st.place[p]; st.place[p] = placedAt[p]; });
    var i = 0, step = function () {
      if (i >= steps.length) { Object.keys(after).forEach(function (p) { st.place[p] = after[p]; }); finish(); return; }
      var s = steps[i++]; self._anim = s; if (s.sr) self._sr(self._t(s.sr));
      self.api.sound(s.outcome ? (s.outcome === 'rest' ? 880 : s.outcome === 'drop' ? 160 : 260) : (s.page === s.proof ? 660 : 420));
      self._paint(); self._later(step, s.ms);
    };
    step();
  },
  _success: function () {
    var st = this.st, v = this._view, C = TwoTalesCore;
    if (st.mode === 'same') v.ok = this._t('okSame', { tag: this._label(st.answer) });
    else if (st.mode === 'only') { var side = C.truth(st.answer, st.gold, st.silver); v.ok = this._t('okOnly', { name: this._tale(side).name, tag: this._label(st.answer) }); }
    else v.ok = this._t('okSort');
    this.api.sound(988); this._paint(); this.api.announce(v.ok);
    this._advance(v.ok.length * 60 + 3800);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, Math.max(this.OK_MS, this.OK_MS === 4200 ? ms : 0));
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectTwoTalesCSS() {
  if (typeof document === 'undefined' || document.getElementById('tt-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B', WOOD = '#E9C48F';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.tt-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;} .tt-wrap:focus{outline:none;}'
  /* the bridge row */
  + '.tt-bridgerow{position:relative;display:flex;align-items:center;gap:10px;width:100%;}'
  + '.tt-turtle{flex:none;display:flex;transition:transform 1.2s ease-in-out;} .tt-turtle img,.tt-pic img{display:block;object-fit:contain;pointer-events:none;} .tt-turtle.is-walk{animation:ttWalk 1.6s ease-in-out;}'
  + '@keyframes ttWalk{0%{transform:none;}60%{transform:translateX(420px);}100%{transform:none;}}'
  + '.tt-zone{position:relative;flex:1;min-width:0;min-height:56px;display:flex;flex-direction:column;justify-content:center;gap:6px;padding:6px 10px;box-sizing:border-box;border-radius:12px;background:#F3E2C4;box-shadow:inset 0 0 0 2px #C9A36B;}'
  + '.tt-zone.z-across{padding:6px 34px;box-shadow:inset 0 0 0 2px #C9A36B,0 3px 0 #C9A36B;} .tt-zone.z-across::before,.tt-zone.z-across::after{content:"";position:absolute;top:50%;width:18px;height:18px;margin-top:-9px;border-radius:50%;pointer-events:none;} .tt-zone.z-across::before{left:8px;background:#F2C14E;box-shadow:0 0 0 2px #B8862A;} .tt-zone.z-across::after{right:8px;background:#C3CCD4;box-shadow:0 0 0 2px #8C98A3;}'
  + '.tt-target{position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:12px;background:transparent;cursor:pointer;z-index:1;} .tt-target:disabled{cursor:default;}'
  + '.tt-zone .tt-plank{position:relative;z-index:2;} .tt-empty{display:flex;justify-content:center;pointer-events:none;}'
  + '.tt-zone.z-basket{flex:none;width:120px;min-height:56px;align-items:center;background:#FBF4E8;} .tt-zone.z-basket .tt-target{display:flex;align-items:center;justify-content:center;} .tt-zone.z-basket.has .tt-target svg{display:none;}'
  /* phones: the book tabs */
  + '.tt-tab{flex:none;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:56px;min-height:56px;padding:4px;border:0;border-radius:12px;background:#FBF4E8;box-shadow:inset 0 0 0 2px #E2CDA4;cursor:pointer;} .tt-tab.is-on{background:#FFF6E2;box-shadow:inset 0 0 0 3px #B98A55;}'
  + '.tt-count{font-size:10px;line-height:1;color:#8C5E33;letter-spacing:-1px;}'
  /* the books */
  + '.tt-books{display:grid;grid-template-columns:1fr 1fr;gap:14px;width:100%;} .tt-wrap.is-narrow .tt-books{grid-template-columns:1fr;}'
  + '.tt-book{display:flex;flex-direction:column;gap:6px;padding:8px 10px 10px 18px;border-radius:6px 14px 14px 6px;background:#FFFDF7;box-shadow:0 4px 0 #D9C29A,inset 0 0 0 2px #E2CDA4;min-width:0;}'
  + '.tt-book.bk-gold{box-shadow:0 4px 0 #D9C29A,inset 0 0 0 2px #E2CDA4,inset 10px 0 0 #F2C14E;} .tt-book.bk-silver{box-shadow:0 4px 0 #D9C29A,inset 0 0 0 2px #E2CDA4,inset 10px 0 0 #C3CCD4;}'
  + '.tt-bhead{display:flex;align-items:center;gap:8px;font-family:' + H + ';font-weight:800;font-size:18px;line-height:1.2;color:' + INK + ';}'
  + '.tt-pages{display:flex;flex-direction:column;gap:6px;}'
  + '.tt-page{position:relative;display:flex;align-items:center;gap:10px;padding:4px 8px 4px 4px;border-radius:10px;background:#EEF6E8;box-shadow:inset 0 0 0 2px #2F2A3B;transition:background .2s,box-shadow .2s;}'
  + '.tt-page.is-night{background:#2E3A63;} .tt-page.is-night .tt-cap{color:#F4F1FF;} .tt-page.is-lit{background:radial-gradient(circle at 18% 50%,#FFF3B0 0,#EEF6E8 55%);}'
  + '.tt-pic{flex:none;display:flex;} .tt-cap{flex:1;min-width:0;font-family:' + B + ';font-weight:700;font-size:15px;line-height:1.3;color:' + INK + ';}'
  + '.tt-pmark{position:absolute;right:6px;top:4px;display:flex;gap:3px;} .tt-pmark i{display:block;width:6px;height:6px;border-radius:50%;background:#B9AFA0;}'
  + '.tt-page.is-walk{box-shadow:inset 0 0 0 3px #F2784B;} .tt-page.is-glow{box-shadow:inset 0 0 0 3px #F4CF62;background:#FFF6D6;} .tt-page.is-night.is-glow{background:#3E4A78;}'
  + '.tt-prop{position:absolute;right:10px;bottom:-2px;width:16px;height:0;background:#B98A55;border-radius:3px 3px 0 0;box-shadow:inset 0 0 0 2px #7A5638;transition:height .15s;} .tt-page.is-proof .tt-prop{height:20px;} .tt-page.is-proof{box-shadow:inset 0 0 0 3px #2E8C7E;}'
  + '.tt-page.is-twitch .tt-pic{animation:ttTwitch .45s ease-in-out;} @keyframes ttTwitch{0%,100%{transform:none;}30%{transform:rotate(-8deg) translateY(-3px);}70%{transform:rotate(6deg);}}'
  + '.tt-book .tt-zone{flex:none;min-height:44px;padding:4px 8px;} .tt-zone.is-head .tt-bhead{pointer-events:none;position:relative;z-index:0;} .tt-zone.is-head{box-shadow:inset 0 0 0 2px #C9A36B;background:#F7EDDA;}'
  /* the planks */
  + '.tt-tray{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%;} .tt-wrap.m-sort .tt-tray{grid-template-columns:repeat(4,1fr);} .tt-wrap.is-narrow .tt-tray{grid-template-columns:1fr 1fr;}'
  + '.tt-slot{min-height:48px;border-radius:8px;box-shadow:inset 0 0 0 2px #E8DCC2;background:repeating-linear-gradient(135deg,#FBF4E8 0 8px,#F5EBDA 8px 16px);}'
  + '.tt-plank{position:relative;display:flex;align-items:center;justify-content:center;min-height:48px;padding:6px 10px;border:0;border-radius:8px;background:' + WOOD + ';box-shadow:inset 0 0 0 3px #7A5638,0 3px 0 #7A5638;font-family:' + B + ';font-weight:800;font-size:16px;line-height:1.2;color:#3A2A1C;text-align:center;cursor:pointer;overflow:hidden;}'
  + '.tt-grain{position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent 0 9px,rgba(122,86,56,.18) 9px 10px);pointer-events:none;} .tt-plabel{position:relative;hyphens:auto;-webkit-hyphens:auto;overflow-wrap:break-word;min-width:0;}'
  + '.tt-plank.is-sel{transform:translateY(-4px);box-shadow:inset 0 0 0 3px #7A5638,0 0 0 4px #F2784B,0 8px 8px rgba(0,0,0,.18);} .tt-plank:disabled{cursor:default;}'
  + '.tt-plank.is-laid{width:100%;min-height:44px;font-size:15px;} .tt-plank.is-ok{box-shadow:inset 0 0 0 3px #2E8C7E,0 3px 0 #1B5F55;}'
  + '.tt-plank.out-rest{box-shadow:inset 0 0 0 3px #2E8C7E,0 3px 0 #1B5F55;} .tt-plank.out-tip-gold{transform:rotate(-7deg);transition:transform .35s ease-out;} .tt-plank.out-tip-silver{transform:rotate(7deg);transition:transform .35s ease-out;} .tt-plank.out-drop{transform:translateY(16px) rotate(4deg);opacity:.5;transition:transform .3s,opacity .3s;}'
  + '.tt-dots{position:absolute;inset:0;pointer-events:none;} .tt-dot{position:absolute;top:50%;margin-top:-8px;display:block;width:16px;height:16px;border-radius:50%;box-shadow:inset 0 0 0 2px #7A5638;background:#F7EEDD;opacity:.55;} .tt-dot.dg{left:6px;} .tt-dot.ds{right:6px;} .tt-dot.is-on{opacity:1;} .tt-wrap.is-help .tt-tray .tt-plank{padding-left:28px;padding-right:28px;} .tt-dot.dg.is-on{background:#F2C14E;} .tt-dot.ds.is-on{background:#C3CCD4;}'
  /* Check */
  + '.tt-foot{display:flex;justify-content:center;align-items:center;gap:12px;width:100%;} .tt-foot:empty{display:none;} .tt-check.in-tray{min-width:0;width:100%;justify-content:center;padding:6px 10px;}'
  + '.tt-check{display:inline-flex;align-items:center;gap:8px;min-width:150px;min-height:54px;padding:8px 26px;border:0;border-radius:16px;background:#146B5E;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;box-shadow:0 4px 0 #0D4A41;cursor:pointer;} .tt-check:disabled{opacity:.5;cursor:default;}'
  + '.tt-note{margin:0;min-height:1.3em;max-width:620px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .tt-note.is-hint{color:#8A3B1F;} .tt-note.is-nudge{color:#5E6770;}'
  + '.tt-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* two pages: bigger pictures */
  + '.tt-wrap.pg-2 .tt-cap{font-size:16px;}'
  /* phones */
  + '.tt-wrap.is-narrow{gap:8px;} .tt-wrap.is-narrow .tt-bhead{font-size:16px;} .tt-wrap.is-narrow .tt-plank{font-size:15px;min-height:46px;padding:4px 8px;} .tt-wrap.is-narrow .tt-note{font-size:17px;}'
  + '.tt-wrap.is-narrow .tt-zone.z-across{min-height:56px;} .tt-wrap.is-narrow .tt-book{padding:6px 8px 8px 16px;}'
  + '.tt-wrap.is-tiny{gap:6px;} .tt-wrap.is-tiny .tt-check{min-width:112px;min-height:48px;padding:6px 14px;font-size:20px;} .tt-wrap.is-tiny .tt-page{gap:8px;padding:3px 6px 3px 3px;} .tt-wrap.is-tiny .tt-tray{gap:6px;} .tt-wrap.is-tiny .tt-zone.z-basket{width:96px;}'
  + '.tt-wrap.is-xs{gap:4px;} .tt-wrap.is-xs .tt-tab{width:50px;min-height:46px;} .tt-wrap.is-xs .tt-zone.z-across{min-height:46px;padding:4px 26px;} .tt-wrap.is-xs.is-help .tt-tray .tt-plank{padding-left:24px;padding-right:24px;} .tt-wrap.is-xs .tt-dot.dg{left:4px;} .tt-wrap.is-xs .tt-dot.ds{right:4px;} .tt-wrap.is-xs .tt-pages{gap:2px;} .tt-wrap.is-xs .tt-book{gap:3px;padding:4px 6px 6px 14px;} .tt-wrap.is-xs .tt-bhead{font-size:15px;} .tt-wrap.is-xs .tt-page{padding:1px 6px 1px 2px;} .tt-wrap.is-xs .tt-tray{gap:4px;} .tt-wrap.is-xs .tt-plank{min-height:44px;padding:2px 6px;} .tt-wrap.is-xs .tt-zone.z-basket{min-height:46px;width:88px;} .tt-wrap.is-xs .tt-check{min-height:46px;}'
  + '@media (prefers-reduced-motion: reduce){.tt-turtle,.tt-page .tt-pic,.tt-plank{animation:none !important;transition:none !important;}}'
  + '.tt-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'tt-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.TwoTalesActivity = TwoTalesActivity;
