/* =====================================================================
   otto-picture-book-activity.js — ACTIVITY #67 of the one-by-one
   rebuild: "Otto's Picture Book" → THE PROOF PINS (RL.K.7, 11 locales).
   Design sheet: docs/activities-rebuild/designs/067-otto-picture-book.md
   ---------------------------------------------------------------------
   THE INVENTION: every important word of Otto's sentence is a pin (a
   bead under the word). On Check the pins fly into the picture: each
   sticks to the thing it names; a pin with nothing to stick to dangles
   back under its word, which turns coral — the word the picture does not
   show. Four tasks: Which picture? (dock the sentence under one of a
   story's four pictures; the panels carry no captions), Fill the blank
   (a word bank, or letter boxes with Two parts), Read and color (paint
   the discs behind the right pictures: number, noun, color, place),
   True or false? Pins fire only on Check — sliding the sentence around
   never gives the answer away.

   ACTIVITY LAYER ONLY: the model is otto-pins-core.js; lcs-shell.js and
   picture-moment-core.js are untouched (the shell's Check is hidden and
   pressed by this activity on success). Test seams:
   window.OttoPictureBookActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var OttoPictureBookActivity = {
  id: 'otto-picture-book',
  apparatusClasses: ['op-'],

  strings: {
    title:      {en:"Otto's Picture Book",de:'Ottos Bilderbuch',nl:'Het prentenboek van Otto',da:'Ottos billedbog',sv:'Ottos bilderbok',no:'Ottos bildebok',es:'El libro de imágenes de Otto',it:'Il libro illustrato di Otto',pt:'O livro de desenhos do Otto',fr:'Le livre d’images d’Otto',fi:'Oton kuvakirja'},
    instrWhich: {en:'Put Otto’s sentence under the picture that shows it.',de:'Leg Ottos Satz unter das Bild, das ihn zeigt.',nl:'Leg de zin van Otto onder het plaatje dat hem laat zien.',da:'Læg Ottos sætning under det billede, der viser den.',sv:'Lägg Ottos mening under bilden som visar den.',no:'Legg setningen til Otto under bildet som viser den.',es:'Pon la oración de Otto debajo del dibujo que la muestra.',it:'Metti la frase di Otto sotto il disegno che la mostra.',pt:'Coloque a frase do Otto embaixo da figura que mostra o que ela diz.',fr:'Place la phrase d’Otto sous l’image qui la montre.',fi:'Laita Oton lause sen kuvan alle, joka näyttää sen.'},
    instrFill:  {en:'Which word makes the sentence match the picture?',de:'Mit welchem Wort passt der Satz zum Bild?',nl:'Met welk woord past de zin bij het plaatje?',da:'Hvilket ord får sætningen til at passe til billedet?',sv:'Vilket ord gör att meningen passar till bilden?',no:'Hvilket ord gjør at setningen passer til bildet?',es:'¿Qué palabra hace que la oración vaya con el dibujo?',it:'Quale parola fa corrispondere la frase al disegno?',pt:'Qual palavra faz a frase combinar com a figura?',fr:'Avec quel mot la phrase correspond-elle à l’image ?',fi:'Millä sanalla lause sopii kuvaan?'},
    instrColor: {en:'Read and color.',de:'Lies und male an.',nl:'Lees en kleur.',da:'Læs og farvelæg.',sv:'Läs och färglägg.',no:'Les og fargelegg.',es:'Lee y colorea.',it:'Leggi e colora.',pt:'Leia e pinte.',fr:'Lis et colorie.',fi:'Lue ja väritä.'},
    instrTF:    {en:'Is it true? Tap ✓ or ✗, then check.',de:'Stimmt das? Tippe ✓ oder ✗ und prüfe dann.',nl:'Klopt het? Tik op ✓ of ✗ en controleer dan.',da:'Er det rigtigt? Tryk på ✓ eller ✗, og tjek så.',sv:'Stämmer det? Tryck på ✓ eller ✗ och kontrollera sedan.',no:'Stemmer det? Trykk på ✓ eller ✗, og sjekk så.',es:'¿Es verdad? Toca ✓ o ✗ y luego revisa.',it:'È vero? Tocca ✓ o ✗, poi controlla.',pt:'É verdade? Toque em ✓ ou ✗ e depois confira.',fr:'Est-ce vrai ? Touche ✓ ou ✗, puis vérifie.',fi:'Pitääkö se paikkansa? Napauta ✓ tai ✗ ja tarkista sitten.'},
    check:      {en:'Check',de:'Prüfen',nl:'Controleren',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Revisar',it:'Controlla',pt:'Conferir',fr:'Vérifier',fi:'Tarkista'},
    emptyWhich: {en:'Drop the sentence under a picture.',de:'Leg den Satz unter ein Bild.',nl:'Leg de zin onder een plaatje.',da:'Læg sætningen under et billede.',sv:'Lägg meningen under en bild.',no:'Legg setningen under et bilde.',es:'Pon la oración debajo de un dibujo.',it:'Metti la frase sotto un disegno.',pt:'Coloque a frase embaixo de uma figura.',fr:'Place la phrase sous une image.',fi:'Laita lause jonkin kuvan alle.'},
    emptyFill:  {en:'Put a word in the box.',de:'Leg ein Wort in das Kästchen.',nl:'Leg een woord in het vakje.',da:'Læg et ord i feltet.',sv:'Lägg ett ord i rutan.',no:'Legg et ord i ruta.',es:'Pon una palabra en el recuadro.',it:'Metti una parola nella casella.',pt:'Coloque uma palavra no quadrinho.',fr:'Mets un mot dans la case.',fi:'Laita sana ruutuun.'},
    emptyColor: {en:'Pick a color, then tap the pictures.',de:'Wähle eine Farbe und tippe dann die Bilder an.',nl:'Kies een kleur en tik dan op de plaatjes.',da:'Vælg en farve, og tryk så på billederne.',sv:'Välj en färg och tryck sedan på bilderna.',no:'Velg en farge, og trykk så på bildene.',es:'Elige un color y luego toca los dibujos.',it:'Scegli un colore, poi tocca i disegni.',pt:'Escolha uma cor e depois toque nas figuras.',fr:'Choisis une couleur, puis touche les images.',fi:'Valitse väri ja napauta sitten kuvia.'},
    emptyTF:    {en:'Tap ✓ or ✗.',de:'Tippe ✓ oder ✗.',nl:'Tik op ✓ of ✗.',da:'Tryk på ✓ eller ✗.',sv:'Tryck på ✓ eller ✗.',no:'Trykk på ✓ eller ✗.',es:'Toca ✓ o ✗.',it:'Tocca ✓ o ✗.',pt:'Toque em ✓ ou ✗.',fr:'Touche ✓ ou ✗.',fi:'Napauta ✓ tai ✗.'},
    hintWhich:  {en:'Look at the pin that is hanging. Find the picture where it sticks.',de:'Schau dir die Nadel an, die herunterhängt. Finde das Bild, in dem sie steckt.',nl:'Kijk naar de speld die loshangt. Zoek het plaatje waar hij blijft zitten.',da:'Se på nålen, der hænger. Find billedet, hvor den sidder fast.',sv:'Titta på nålen som hänger. Hitta bilden där den fastnar.',no:'Se på nåla som henger. Finn bildet der den sitter fast.',es:'Mira el alfiler que cuelga. Busca el dibujo donde se queda pegado.',it:'Guarda lo spillo che penzola. Trova il disegno dove resta attaccato.',pt:'Olhe o alfinete que ficou pendurado. Encontre a figura onde ele gruda.',fr:'Regarde l’épingle qui pend. Trouve l’image où elle reste accrochée.',fi:'Katso roikkuvaa neulaa. Etsi kuva, johon se tarttuu.'},
    hintWhich2: {en:'The dashed frame shows where that pin sticks.',de:'Der gestrichelte Rahmen zeigt, wo diese Nadel steckt.',nl:'Het gestippelde kader laat zien waar die speld blijft zitten.',da:'Den stiplede ramme viser, hvor nålen sidder fast.',sv:'Den streckade ramen visar var nålen fastnar.',no:'Den stiplede rammen viser hvor nåla sitter fast.',es:'El marco punteado muestra dónde se pega ese alfiler.',it:'La cornice tratteggiata mostra dove si attacca quello spillo.',pt:'A moldura tracejada mostra onde esse alfinete gruda.',fr:'Le cadre en pointillés montre où cette épingle s’accroche.',fi:'Katkoviivakehys näyttää, mihin neula tarttuu.'},
    hintFill:   {en:'That word’s pin can’t find anything in the picture.',de:'Die Nadel dieses Wortes findet im Bild nichts.',nl:'De speld van dat woord vindt niets op het plaatje.',da:'Det ords nål finder ikke noget på billedet.',sv:'Det ordets nål hittar inget på bilden.',no:'Nåla til det ordet finner ikke noe på bildet.',es:'El alfiler de esa palabra no encuentra nada en el dibujo.',it:'Lo spillo di quella parola non trova niente nel disegno.',pt:'O alfinete dessa palavra não encontra nada na figura.',fr:'L’épingle de ce mot ne trouve rien sur l’image.',fi:'Sen sanan neula ei löydä kuvasta mitään.'},
    hintFill2:  {en:'Try the word with the glowing frame.',de:'Probier das Wort mit dem leuchtenden Rahmen.',nl:'Probeer het woord met het oplichtende kader.',da:'Prøv ordet med den lysende ramme.',sv:'Prova ordet med den lysande ramen.',no:'Prøv ordet med den lysende rammen.',es:'Prueba la palabra con el marco que brilla.',it:'Prova la parola con la cornice che brilla.',pt:'Experimente a palavra com a moldura brilhante.',fr:'Essaie le mot au cadre qui brille.',fi:'Kokeile sanaa, jonka kehys hehkuu.'},
    hintSpell2: {en:'The grey letters show the word.',de:'Die grauen Buchstaben zeigen das Wort.',nl:'De grijze letters laten het woord zien.',da:'De grå bogstaver viser ordet.',sv:'De grå bokstäverna visar ordet.',no:'De grå bokstavene viser ordet.',es:'Las letras grises muestran la palabra.',it:'Le lettere grigie mostrano la parola.',pt:'As letras cinza mostram a palavra.',fr:'Les lettres grises montrent le mot.',fi:'Harmaat kirjaimet näyttävät sanan.'},
    hintTF:     {en:'Check the pins: does every word stick?',de:'Schau auf die Nadeln: Steckt jedes Wort?',nl:'Kijk naar de spelden: blijft elk woord zitten?',da:'Se på nålene: Sidder hvert ord fast?',sv:'Titta på nålarna: fastnar varje ord?',no:'Se på nålene: Sitter hvert ord fast?',es:'Mira los alfileres: ¿se pega cada palabra?',it:'Guarda gli spilli: ogni parola resta attaccata?',pt:'Olhe os alfinetes: cada palavra gruda?',fr:'Regarde les épingles : chaque mot s’accroche-t-il ?',fi:'Katso neuloja: tarttuuko jokainen sana?'},
    hintTF2:    {en:'Now look again: true or false?',de:'Schau noch einmal: Stimmt es oder nicht?',nl:'Kijk nog eens: klopt het of niet?',da:'Se igen: Er det rigtigt eller forkert?',sv:'Titta igen: stämmer det eller inte?',no:'Se igjen: Stemmer det eller ikke?',es:'Mira otra vez: ¿verdadero o falso?',it:'Guarda di nuovo: vero o falso?',pt:'Olhe de novo: verdadeiro ou falso?',fr:'Regarde encore : vrai ou faux ?',fi:'Katso uudelleen: totta vai ei?'},
    hintCount:  {en:'Count again: the sentence says {n}.',de:'Zähl noch einmal: Im Satz steht {n}.',nl:'Tel nog eens: in de zin staat {n}.',da:'Tæl igen: Der står {n} i sætningen.',sv:'Räkna igen: det står {n} i meningen.',no:'Tell igjen: Det står {n} i setningen.',es:'Cuenta otra vez: la oración dice {n}.',it:'Conta di nuovo: la frase dice {n}.',pt:'Conte de novo: a frase diz {n}.',fr:'Compte encore : la phrase dit {n}.',fi:'Laske uudelleen: lauseessa lukee {n}.'},
    hintNoun:   {en:'Look at the word “{noun}”.',de:'Schau auf das Wort „{noun}“.',nl:'Kijk naar het woord “{noun}”.',da:'Se på ordet “{noun}”.',sv:'Titta på ordet ”{noun}”.',no:'Se på ordet «{noun}».',es:'Mira la palabra «{noun}».',it:'Guarda la parola «{noun}».',pt:'Olhe a palavra “{noun}”.',fr:'Regarde le mot « {noun} ».',fi:'Katso sanaa ”{noun}”.'},
    hintColor:  {en:'Look at the color word “{color}”.',de:'Schau auf das Farbwort „{color}“.',nl:'Kijk naar het kleurwoord “{color}”.',da:'Se på farveordet “{color}”.',sv:'Titta på färgordet ”{color}”.',no:'Se på fargeordet «{color}».',es:'Mira la palabra del color: «{color}».',it:'Guarda la parola del colore: «{color}».',pt:'Olhe a palavra da cor: “{color}”.',fr:'Regarde le mot de la couleur : « {color} ».',fi:'Katso värisanaa ”{color}”.'},
    hintPlace:  {en:'Start at the arrow and count.',de:'Fang beim Pfeil an und zähl.',nl:'Begin bij de pijl en tel.',da:'Begynd ved pilen, og tæl.',sv:'Börja vid pilen och räkna.',no:'Begynn ved pila, og tell.',es:'Empieza en la flecha y cuenta.',it:'Parti dalla freccia e conta.',pt:'Comece na seta e conte.',fr:'Commence à la flèche et compte.',fi:'Aloita nuolesta ja laske.'},
    hintColor2: {en:'Paint only the ringed pictures.',de:'Male nur die eingekreisten Bilder an.',nl:'Kleur alleen de plaatjes met een cirkel.',da:'Farvelæg kun billederne med en ring.',sv:'Färglägg bara bilderna med en ring.',no:'Fargelegg bare bildene med ring rundt.',es:'Colorea solo los dibujos con un círculo.',it:'Colora solo i disegni cerchiati.',pt:'Pinte só as figuras com um círculo.',fr:'Colorie seulement les images entourées.',fi:'Väritä vain ympyröidyt kuvat.'},
    okWhich:    {en:'Yes! Every pin sticks.',de:'Ja! Jede Nadel steckt.',nl:'Ja! Elke speld blijft zitten.',da:'Ja! Hver nål sidder fast.',sv:'Ja! Varje nål fastnar.',no:'Ja! Hver nål sitter fast.',es:'¡Sí! Todos los alfileres se pegan.',it:'Sì! Tutti gli spilli restano attaccati.',pt:'Isso! Todos os alfinetes grudam.',fr:'Oui ! Toutes les épingles s’accrochent.',fi:'Kyllä! Jokainen neula tarttuu.'},
    okFill:     {en:'Every pin sticks — the picture shows it!',de:'Jede Nadel steckt – das Bild zeigt es!',nl:'Elke speld blijft zitten – het plaatje laat het zien!',da:'Hver nål sidder fast – billedet viser det!',sv:'Varje nål fastnar – bilden visar det!',no:'Hver nål sitter fast – bildet viser det!',es:'Todos los alfileres se pegan: ¡el dibujo lo muestra!',it:'Tutti gli spilli restano attaccati: il disegno lo mostra!',pt:'Todos os alfinetes grudam: a figura mostra isso!',fr:'Toutes les épingles s’accrochent : l’image le montre !',fi:'Jokainen neula tarttuu – kuva näyttää sen!'},
    okColor:    {en:'You read it and did it!',de:'Du hast es gelesen und gemacht!',nl:'Je hebt het gelezen en gedaan!',da:'Du læste det og gjorde det!',sv:'Du läste det och gjorde det!',no:'Du leste det og gjorde det!',es:'¡Lo leíste y lo hiciste!',it:'L’hai letto e l’hai fatto!',pt:'Você leu e fez!',fr:'Tu l’as lu et tu l’as fait !',fi:'Luit sen ja teit sen!'},
    okTrue:     {en:'True — every pin sticks!',de:'Stimmt – jede Nadel steckt!',nl:'Klopt – elke speld blijft zitten!',da:'Rigtigt – hver nål sidder fast!',sv:'Det stämmer – varje nål fastnar!',no:'Stemmer – hver nål sitter fast!',es:'Verdadero: ¡todos los alfileres se pegan!',it:'Vero: tutti gli spilli restano attaccati!',pt:'Verdadeiro: todos os alfinetes grudam!',fr:'Vrai : toutes les épingles s’accrochent !',fi:'Totta – jokainen neula tarttuu!'},
    okFalse:    {en:'False — one pin finds nothing in the picture!',de:'Stimmt nicht – eine Nadel findet nichts im Bild!',nl:'Klopt niet – één speld vindt niets op het plaatje!',da:'Forkert – en nål finder ikke noget på billedet!',sv:'Det stämmer inte – en nål hittar inget på bilden!',no:'Stemmer ikke – én nål finner ikke noe på bildet!',es:'Falso: ¡un alfiler no encuentra nada en el dibujo!',it:'Falso: uno spillo non trova niente nel disegno!',pt:'Falso: um alfinete não encontra nada na figura!',fr:'Faux : une épingle ne trouve rien sur l’image !',fi:'Ei totta – yksi neula ei löydä kuvasta mitään!'},
    okBubble:   {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    setTask:    {en:'Task',de:'Aufgabe',nl:'Opdracht',da:'Opgave',sv:'Uppgift',no:'Oppgave',es:'Tarea',it:'Attività',pt:'Tarefa',fr:'Activité',fi:'Tehtävä'},
    tWhich:     {en:'Which picture?',de:'Welches Bild?',nl:'Welk plaatje?',da:'Hvilket billede?',sv:'Vilken bild?',no:'Hvilket bilde?',es:'¿Qué dibujo?',it:'Quale disegno?',pt:'Qual figura?',fr:'Quelle image ?',fi:'Mikä kuva?'},
    tFill:      {en:'Fill the blank',de:'Lücke füllen',nl:'Woord invullen',da:'Udfyld hullet',sv:'Fyll i luckan',no:'Fyll inn ordet',es:'Completa el espacio',it:'Completa la frase',pt:'Complete a lacuna',fr:'Complète la phrase',fi:'Täydennä aukko'},
    tColor:     {en:'Read and color',de:'Lesen und malen',nl:'Lees en kleur',da:'Læs og farvelæg',sv:'Läs och färglägg',no:'Les og fargelegg',es:'Lee y colorea',it:'Leggi e colora',pt:'Leia e pinte',fr:'Lis et colorie',fi:'Lue ja väritä'},
    tTF:        {en:'True or false?',de:'Stimmt das?',nl:'Waar of niet waar?',da:'Rigtigt eller forkert?',sv:'Sant eller falskt?',no:'Riktig eller galt?',es:'¿Verdadero o falso?',it:'Vero o falso?',pt:'Verdadeiro ou falso?',fr:'Vrai ou faux ?',fi:'Totta vai ei?'},
    setParts:   {en:'Sentences',de:'Sätze',nl:'Zinnen',da:'Sætninger',sv:'Meningar',no:'Setninger',es:'Oraciones',it:'Frasi',pt:'Frases',fr:'Phrases',fi:'Lauseet'},
    parts1:     {en:'One part',de:'Ein Teil',nl:'Eén deel',da:'Én del',sv:'En del',no:'Én del',es:'Una parte',it:'Una parte',pt:'Uma parte',fr:'Une partie',fi:'Yksi osa'},
    parts2:     {en:'Two parts',de:'Zwei Teile',nl:'Twee delen',da:'To dele',sv:'Två delar',no:'To deler',es:'Dos partes',it:'Due parti',pt:'Duas partes',fr:'Deux parties',fi:'Kaksi osaa'},
    ariaOtto:   {en:'Otto the owl: hear the sentence',de:'Otto, die Eule: den Satz anhören',nl:'Otto de uil: luister naar de zin',da:'Uglen Otto: hør sætningen',sv:'Ugglan Otto: lyssna på meningen',no:'Ugla Otto: hør setningen',es:'Otto el búho: escucha la oración',it:'Otto il gufo: ascolta la frase',pt:'Otto, a coruja: ouça a frase',fr:'Otto le hibou : écoute la phrase',fi:'Otto-pöllö: kuuntele lause'},
    ariaStrip:  {en:'Sentence: {s}',de:'Satz: {s}',nl:'Zin: {s}',da:'Sætning: {s}',sv:'Mening: {s}',no:'Setning: {s}',es:'Oración: {s}',it:'Frase: {s}',pt:'Frase: {s}',fr:'Phrase : {s}',fi:'Lause: {s}'},
    ariaPanel:  {en:'Picture {n}',de:'Bild {n}',nl:'Plaatje {n}',da:'Billede {n}',sv:'Bild {n}',no:'Bilde {n}',es:'Dibujo {n}',it:'Disegno {n}',pt:'Figura {n}',fr:'Image {n}',fi:'Kuva {n}'},
    ariaTile:   {en:'Picture {n}',de:'Bild {n}',nl:'Plaatje {n}',da:'Billede {n}',sv:'Bild {n}',no:'Bilde {n}',es:'Dibujo {n}',it:'Disegno {n}',pt:'Figura {n}',fr:'Image {n}',fi:'Kuva {n}'},
    ariaPot:    {en:'{color} paint',de:'Farbe: {color}',nl:'Verf: {color}',da:'Farve: {color}',sv:'Färg: {color}',no:'Farge: {color}',es:'Pintura: {color}',it:'Colore: {color}',pt:'Tinta: {color}',fr:'Peinture : {color}',fi:'Väri: {color}'},
    ariaTrue:   {en:'True',de:'Stimmt',nl:'Waar',da:'Rigtigt',sv:'Sant',no:'Riktig',es:'Verdadero',it:'Vero',pt:'Verdadeiro',fr:'Vrai',fi:'Totta'},
    ariaFalse:  {en:'False',de:'Stimmt nicht',nl:'Niet waar',da:'Forkert',sv:'Falskt',no:'Galt',es:'Falso',it:'Falso',pt:'Falso',fr:'Faux',fi:'Ei totta'},
    ariaBox:    {en:'Letter box {n}',de:'Buchstabenkästchen {n}',nl:'Lettervakje {n}',da:'Bogstavfelt {n}',sv:'Bokstavsruta {n}',no:'Bokstavrute {n}',es:'Casilla de letra {n}',it:'Casella {n}',pt:'Quadrinho de letra {n}',fr:'Case de lettre {n}',fi:'Kirjainruutu {n}'}
  },

  defaults: { task: 'which', parts: 'one' },
  settings: [
    { key: 'task', type: 'choice', labelKey: 'setTask', options: [{ value: 'which', labelKey: 'tWhich' }, { value: 'fill', labelKey: 'tFill' }, { value: 'color', labelKey: 'tColor' }, { value: 'tf', labelKey: 'tTF' }] },
    { key: 'parts', type: 'choice', labelKey: 'setParts', options: [{ value: 'one', labelKey: 'parts1' }, { value: 'two', labelKey: 'parts2' }] }
  ],

  OK_MS: 3400, FAST: false, FLY_MS: 900,
  INSTR: { which: 'instrWhich', fill: 'instrFill', color: 'instrColor', tf: 'instrTF' },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0; this._deal = null;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._pa = {}; this._drag = null;
    injectPinsCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () { if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); } else if (this._wrap) this._paint(); },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return OttoPinsCore.locale(((this.api && this.api.lang) || 'en').slice(0, 2)); },
  _task: function () { var g = this._set('task'); return OttoPinsCore.TASKS.indexOf(g) >= 0 ? g : 'which'; },
  _two: function () { return this._set('parts') === 'two'; },
  _key: function () { return this._loc() + '/' + this._task() + '/' + (this._two() ? 2 : 1); },
  _say: function (text) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'sentence', text: text, lang: this._loc(), rate: 0.9 }); } catch (e) {} },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { this._pool = OttoPinsCore.rounds(this._loc(), this._task(), this._two()); this._poolKey = k; this._order = null; this._deal = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = OttoPinsCore;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); this._deal = null; }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); this._deal = null; }
    if (!this._deal) this._deal = C.deal(pool, this._order, Math.random);
    var k = this._order[index % n], r = pool[k], dl = this._deal[k], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'otto.' + r.loc + '.' + r.id, promptKey: this.INSTR[r.task], promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._clearTimers(); tool._busy = false; tool._view = {}; tool._drag = null; tool.st = C.newState(r, dl); if (r.task === 'which') tool.st.sel = 0; },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = OttoPinsCore, p0 = C.rounds(this._loc(), this._task(), this._two()); this.st = C.newState(p0[0], C.deal(p0, p0.map(function (_, i) { return i; }), C.seeded('x'))[0]); this.st.sel = 0; }
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
    var wrap = api.el('div', 'op-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    var top = api.el('div', 'op-top'); wrap.appendChild(top);
    this._ottoEl = api.el('button', 'op-otto'); this._ottoEl.type = 'button'; this._ottoEl.setAttribute('data-k', 'otto');
    this._ottoEl.addEventListener('click', function () { self._readAloud(); }); top.appendChild(this._ottoEl);
    this._stripsEl = api.el('div', 'op-strips'); top.appendChild(this._stripsEl);
    this._stageEl = api.el('div', 'op-stage'); wrap.appendChild(this._stageEl);
    this._toolsEl = api.el('div', 'op-tools'); wrap.appendChild(this._toolsEl);
    var row = api.el('div', 'op-row'); wrap.appendChild(row);
    var chk = api.el('button', 'op-check'); chk.type = 'button'; chk.setAttribute('data-k', 'check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; row.appendChild(chk);
    var note = api.el('p', 'op-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    this._pinsEl = api.el('div', 'op-pins'); this._pinsEl.setAttribute('aria-hidden', 'true'); wrap.appendChild(this._pinsEl);
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
    if (!this._stageEl) return;
    var st = this.st, C = OttoPinsCore, v = this._view, L = this._L = C.layout(this._width());
    this._wrap.className = 'op-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + (L.W < 300 ? ' is-tiny' : '') + ' is-' + st.task + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    [['unit', L.unit], ['panel-w', L.panelW], ['panel-h', L.panelH], ['scene-w', L.sceneW], ['scene-h', L.sceneH], ['tile', L.tile], ['otto', L.otto]].forEach(function (p) { this._wrap.style.setProperty('--op-' + p[0], p[1] + 'px'); }, this);
    this._ottoEl.innerHTML = ''; var oi = this.api.el('img', 'op-img'); oi.alt = ''; oi.draggable = false; oi.src = this._pic(C.OTTO); this._ottoEl.appendChild(oi);
    this._ottoEl.setAttribute('aria-label', this._t('ariaOtto'));
    this._paintStrips();
    this._stageEl.innerHTML = ''; this._toolsEl.innerHTML = '';
    if (st.task === 'which') this._paintPanels(); else if (st.task === 'color') this._paintColor(); else this._paintScene();
    if (st.task === 'fill') this._paintBank(); if (st.task === 'tf') this._paintTF(); if (st.task === 'color') this._paintPots();
    var h = C.hint(st), msg = '';
    if (v.msg) msg = v.msg; else if (h && !this._busy) msg = this._t(h, C.hintArgs(st));
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!v.msg); this._note.classList.toggle('is-wrong', !!(h && !v.msg && st.last && st.last.reason === 'wrong'));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy; this._checkBtn.textContent = this._t('check');
  },
  /* the sentence strip(s): the words, a bead under every pin word; after a check a dangling pin's word turns coral */
  _paintStrips: function () {
    var el = this._stripsEl, st = this.st, api = this.api, self = this, r = st.r, res = st.result, help = OttoPinsCore.helpOf(st) || {};
    el.innerHTML = '';
    var strips = st.task === 'which' ? r.strips.map(function (s) { return s.tokens; }) : [r.tokens];
    strips.forEach(function (tokens, k) {
      var strip = api.el(st.task === 'which' ? 'button' : 'div', 'op-strip' + (st.task === 'which' ? ' is-' + (k ? 'b' : 'a') : '') + (st.task === 'which' && st.sel === k && !st.done ? ' is-sel' : '') + (st.task === 'which' && st.docks[k] !== null ? ' is-docked' : ''));
      if (st.task === 'which') { strip.type = 'button'; strip.setAttribute('data-k', 'strip' + k); strip.setAttribute('data-strip', k); strip.addEventListener('click', function () { if (!self._free()) return; st.sel = k; self._paint(); }); self._bindDrag(strip, function () { return 'strip:' + k; }); }
      var pins = res ? (st.task === 'which' ? (res.strips && res.strips[k]) : res.pins) : null, pi = 0;
      tokens.forEach(function (t) {
        if (t.blank) { strip.appendChild(self._blank()); if (pins) pi++; return; }
        if (!t.tag) { strip.appendChild(document.createTextNode(t.text)); return; }
        var p = pins ? pins[pi++] : null, w = api.el('span', 'op-word' + (p && !p.stuck && (st.task !== 'tf' || st.show) ? ' is-dangle' : '') + (p && p.stuck ? ' is-stuck' : '') + (help.strip === k && help.tag === t.tag ? ' is-point' : ''));
        w.textContent = t.text; w.setAttribute('data-tag', t.tag); w.appendChild(api.el('span', 'op-bead'));
        strip.appendChild(w);
      });
      if (st.task === 'which') { var badge = api.el('span', 'op-letter'); badge.textContent = k ? '2' : '1'; strip.insertBefore(badge, strip.firstChild); strip.setAttribute('aria-label', self._t('ariaStrip', { s: OttoPinsCore.plain(tokens) })); }
      el.appendChild(strip);
    });
  },
  /* the blank of Fill the blank: one box (a bank word) or one box per letter */
  _blank: function () {
    var st = this.st, r = st.r, api = this.api, self = this, help = OttoPinsCore.helpOf(st) || {};
    var b = api.el('span', 'op-blank' + (r.letters ? ' is-letters' : '') + (st.result && !st.result.ok && st.show ? ' is-dangle' : ''));
    b.setAttribute('data-k', 'blank');
    if (r.letters) {
      st.spelled.forEach(function (ti, i) {
        var box = api.el('span', 'op-box' + (ti === null ? '' : ' is-full')); box.setAttribute('data-box', i); box.setAttribute('aria-label', self._t('ariaBox', { n: i + 1 }));
        box.textContent = ti === null ? (help.word ? Array.from(help.word)[i] : '') : st.tiles[ti];
        if (ti === null && help.word) box.classList.add('is-ghost');
        b.appendChild(box);
      });
    } else {
      b.textContent = st.choice === null ? '' : r.bank[st.bank[st.choice]].word;
      if (st.choice !== null) b.classList.add('is-full');
    }
    b.appendChild(api.el('span', 'op-bead'));
    return b;
  },
  /* a scene: library pictures placed on a drawn ground (with cues), pin heads on the things the pins stuck to */
  _scene: function (P, w, h, cls, pinned) {
    var api = this.api, L = this._L, self = this, d = P.d || {};
    var sc = api.el('span', 'op-pic op-sky-' + (d.indoor ? 'indoor' : (d.sky || 'day')) + (d.sand ? ' op-sand' : '') + (cls ? ' ' + cls : ''));
    sc.style.width = w + 'px'; sc.style.height = h + 'px';
    if (d.water) sc.appendChild(api.el('span', 'op-water op-water-' + d.water));
    if (d.soil === 'band') sc.appendChild(api.el('span', 'op-soil'));
    if (d.wind) { var wd = api.el('span', 'op-wind'); for (var q = 0; q < 3; q++) wd.appendChild(api.el('span', 'op-gust')); sc.appendChild(wd); }
    P.t.forEach(function (t, i) {
      var pl = OttoPinsCore.place(t, w, h, L.unit), s = api.el('span', 'op-pp');
      s.style.left = pl.left + 'px'; s.style.bottom = pl.bottom + 'px'; s.style.width = pl.size + 'px'; s.style.height = pl.size + 'px'; s.setAttribute('data-pic', i);
      var im = api.el('img', 'op-img'); im.alt = ''; im.draggable = false; im.src = self._pic(t[0]);
      im.style.transform = (t[5] ? 'scaleX(-1) ' : '') + (t[4] ? 'rotate(' + t[4] + 'deg)' : '');
      s.appendChild(im);
      if (pinned && pinned.indexOf(i) >= 0) s.appendChild(api.el('span', 'op-head'));
      sc.appendChild(s);
    });
    if (d.soil === 'cover') sc.appendChild(api.el('span', 'op-soil is-cover'));
    if (pinned && pinned.indexOf(-1) >= 0) sc.appendChild(api.el('span', 'op-head is-scene'));
    return sc;
  },
  _pinnedIn: function (pins) { return (pins || []).filter(function (p) { return p.stuck; }).map(function (p) { return p.at; }); },
  _paintPanels: function () {
    var el = this._stageEl, st = this.st, r = st.r, api = this.api, self = this, L = this._L, res = st.result, help = OttoPinsCore.helpOf(st) || {}, v = this._view;
    var grid = api.el('div', 'op-grid'); el.appendChild(grid);
    r.panels.forEach(function (P, i) {
      var docked = st.docks.map(function (d, k) { return d === i ? k : -1; }).filter(function (k) { return k >= 0; });
      var pinned = []; docked.forEach(function (k) { if (res && res.strips) pinned = pinned.concat(self._pinnedIn(res.strips[k])); });
      var b = api.el('button', 'op-panel' + (docked.length ? ' is-docked' : '') + (help.panel === i ? ' is-point' : '') + (st.done && docked.length ? ' is-won' : ''));
      b.type = 'button'; b.setAttribute('data-k', 'panel' + i); b.setAttribute('data-panel', i); b.setAttribute('aria-label', self._t('ariaPanel', { n: i + 1 }));
      b.appendChild(self._scene(P, L.panelW - 8, L.panelH, '', res && docked.length ? pinned : null));
      var num = api.el('span', 'op-num'); num.textContent = String(i + 1); b.appendChild(num);
      docked.forEach(function (k) { var tag = api.el('span', 'op-dock is-' + (k ? 'b' : 'a')); tag.textContent = String(k + 1); b.appendChild(tag); });
      if (st.done && docked.length) b.appendChild(api.el('span', 'op-star'));
      b.addEventListener('click', function () { self._tapPanel(i); });
      grid.appendChild(b);
    });
  },
  _paintScene: function () {
    var el = this._stageEl, st = this.st, r = st.r, L = this._L, res = st.result, show = st.task !== 'tf' || st.show || st.done || (OttoPinsCore.helpOf(st) || {}).pins;
    var box = this.api.el('div', 'op-scenebox' + (st.done ? ' is-won' : ''));
    box.appendChild(this._scene(r.scene, L.sceneW - 8, L.sceneH, 'is-scene', res && show ? this._pinnedIn(res.pins) : null));
    if (st.done) box.appendChild(this.api.el('span', 'op-star'));
    el.appendChild(box);
  },
  _paintBank: function () {
    var el = this._toolsEl, st = this.st, r = st.r, api = this.api, self = this, help = OttoPinsCore.helpOf(st) || {};
    if (r.letters) {
      st.tiles.forEach(function (c, i) {
        var used = st.spelled.indexOf(i) >= 0, b = api.el('button', 'op-tile is-letter' + (used ? ' is-used' : ''));
        b.type = 'button'; b.setAttribute('data-k', 'letter' + i); b.setAttribute('data-letter', i); b.textContent = c; b.disabled = st.done; b.setAttribute('aria-pressed', used ? 'true' : 'false');
        b.addEventListener('click', function () { if (!self._free()) return; var at = st.spelled.indexOf(i); if (at >= 0 ? OttoPinsCore.clearBox(st, at) : OttoPinsCore.putLetter(st, i)) { self._view = {}; self.api.sound(at >= 0 ? 460 : 560); self._paint(); } });
        el.appendChild(b);
      });
      return;
    }
    st.bank.forEach(function (bi, slot) {
      var w = r.bank[bi], b = api.el('button', 'op-tile' + (st.choice === slot ? ' is-sel' : '') + (help.glow === slot ? ' is-glow' : ''));
      b.type = 'button'; b.setAttribute('data-k', 'word' + slot); b.setAttribute('data-word', slot); b.textContent = w.word;
      b.addEventListener('click', function () { if (!self._free()) return; if (OttoPinsCore.choose(st, slot)) { self._view = {}; self.api.sound(560); self._paint(); } });
      self._bindDrag(b, function () { return 'word:' + slot; });
      el.appendChild(b);
    });
  },
  _paintTF: function () {
    var el = this._toolsEl, st = this.st, api = this.api, self = this;
    [[true, '✓', 'ariaTrue'], [false, '✗', 'ariaFalse']].forEach(function (x) {
      var b = api.el('button', 'op-tf is-' + (x[0] ? 'yes' : 'no') + (st.choice === x[0] ? ' is-sel' : ''));
      b.type = 'button'; b.setAttribute('data-k', x[0] ? 'true' : 'false'); b.setAttribute('data-tf', x[0] ? '1' : '0'); b.textContent = x[1]; b.setAttribute('aria-label', self._t(x[2]));
      b.addEventListener('click', function () { if (!self._free()) return; if (OttoPinsCore.chooseTF(st, x[0])) { self._view = {}; self.api.sound(560); self._paint(); } });
      el.appendChild(b);
    });
  },
  /* Read and color: a row of pictures, each on a disc the child paints; the arrow at the row's start shows where "first" is */
  _paintColor: function () {
    var el = this._stageEl, st = this.st, r = st.r, api = this.api, self = this, help = OttoPinsCore.helpOf(st) || {}, res = st.result;
    var row = api.el('div', 'op-tiles' + (st.done ? ' is-won' : '')), n = r.tiles.length; row.style.setProperty('--op-cols', this._L.mode === 'wide' ? (n <= 5 ? n : Math.ceil(n / 2)) : 4);
    row.appendChild(api.el('span', 'op-arrow'));
    r.tiles.forEach(function (noun, i) {
      var col = st.paint[i], b = api.el('button', 'op-ctile' + (col ? ' is-' + col : '') + (help.rings && help.rings[i] ? ' is-ring' : '') + (help.rings && col && !help.rings[i] ? ' is-notasked' : '') + (res && res.ok && col ? ' is-pinned' : ''));
      b.type = 'button'; b.setAttribute('data-k', 'ctile' + i); b.setAttribute('data-tile', i);
      b.setAttribute('aria-label', self._t('ariaTile', { n: i + 1 }) + (col ? ' — ' + OttoPinsCore.DATA.TEXT[self._loc()].colors[col] : ''));
      b.appendChild(api.el('span', 'op-disc'));
      var im = api.el('img', 'op-img'); im.alt = ''; im.draggable = false; im.src = self._pic(OttoPinsCore.DATA.NOUN_PIC[noun]); b.appendChild(im);
      b.addEventListener('click', function () { if (!self._free()) return; if (!st.pot) { self._view = { msg: '' }; st.show = true; st.last = { reason: 'empty' }; self._paint(); return; } if (OttoPinsCore.paint(st, i)) { self._view = {}; self.api.sound(600); self._paint(); } });
      row.appendChild(b);
    });
    if (st.done) row.appendChild(api.el('span', 'op-star'));
    el.appendChild(row);
  },
  _paintPots: function () {
    var el = this._toolsEl, st = this.st, api = this.api, self = this, names = OttoPinsCore.DATA.TEXT[this._loc()].colors;
    OttoPinsCore.COLORS.forEach(function (c, i) {
      var b = api.el('button', 'op-pot is-' + c + (st.pot === c ? ' is-sel' : ''));
      b.type = 'button'; b.setAttribute('data-k', 'pot-' + c); b.setAttribute('data-pot', c); b.setAttribute('aria-label', self._t('ariaPot', { color: names[c] }));
      b.addEventListener('click', function () { if (!self._free()) return; OttoPinsCore.pickPot(st, c); self.api.sound(st.pot ? 520 : 330); self._paint(); });
      el.appendChild(b);
    });
  },

  /* ---------------- the hand ---------------- */
  _free: function () { return !(this._busy || this.st.done); },
  _tapPanel: function (i) {
    if (!this._free()) return;
    var st = this.st, k = st.sel === null ? st.docks.indexOf(null) : st.sel; if (k < 0) k = 0;
    if (OttoPinsCore.dock(st, k, i)) { var nx = st.docks.indexOf(null); st.sel = nx >= 0 ? nx : k; this._view = {}; this.api.sound(600); this._paint(); }
  },
  _bindDrag: function (el, idOf) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      var id = idOf(); if (!id || !self._free() || (ev.button !== undefined && ev.button !== 0)) return;
      var ghost = null, sx = ev.clientX, sy = ev.clientY; try { el.setPointerCapture(ev.pointerId); } catch (e) {}
      var targets = function () { return id.indexOf('strip:') === 0 ? self._wrap.querySelectorAll('.op-panel') : self._wrap.querySelectorAll('.op-blank'); };
      var at = function (x, y) { var ss = targets(); for (var z = 0; z < ss.length; z++) { var rc = ss[z].getBoundingClientRect(); if (x >= rc.left && x <= rc.right && y >= rc.top && y <= rc.bottom) return ss[z]; } return null; };
      var move = function (e) {
        if (!ghost && Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) < 8) return;
        if (!ghost) { self._drag = {}; ghost = el.cloneNode(true); ghost.className += ' op-ghost'; ghost.style.width = el.offsetWidth + 'px'; document.body.appendChild(ghost); }
        ghost.style.left = (e.clientX - el.offsetWidth / 2) + 'px'; ghost.style.top = (e.clientY - 24) + 'px';
        var h = at(e.clientX, e.clientY); [].forEach.call(targets(), function (s) { s.classList.toggle('is-over', s === h); });
      };
      var up = function (e) {
        el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
        if (!ghost) return;
        if (ghost.parentNode) ghost.parentNode.removeChild(ghost); self._drag = null;
        var h = at(e.clientX, e.clientY), st = self.st;
        if (h) {
          if (id.indexOf('strip:') === 0) { st.sel = +id.slice(6); self._tapPanel(+h.getAttribute('data-panel')); return; }
          if (OttoPinsCore.choose(st, +id.slice(5))) { self._view = {}; self.api.sound(600); }
        }
        self._paint();
      };
      el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    });
  },
  _onKey: function (ev) {
    var st = this.st, k = ev.key;
    if (st.task === 'which' && /^[1-4]$/.test(k)) { ev.preventDefault(); this._tapPanel(+k - 1); return; }
    if (st.task === 'fill' && !st.r.letters && /^[1-3]$/.test(k)) { ev.preventDefault(); if (OttoPinsCore.choose(st, +k - 1)) { this._view = {}; this._paint(); } return; }
    if (st.task === 'color' && /^[1-6]$/.test(k)) { ev.preventDefault(); OttoPinsCore.pickPot(st, OttoPinsCore.COLORS[+k - 1]); this._paint(); return; }
    if (st.task === 'tf' && (k === 'ArrowLeft' || k === 'ArrowRight')) { ev.preventDefault(); OttoPinsCore.chooseTF(st, k === 'ArrowLeft'); this._paint(); return; }
    if (k === 'Enter' && ev.target === this._wrap) { ev.preventDefault(); this._check(); }
  },
  _readAloud: function () {
    var st = this.st, C = OttoPinsCore, texts = st.task === 'which' ? st.r.strips.map(function (s) { return C.plain(s.tokens); }) : [C.plain(st.r.tokens, '…')];
    this._say(texts.join(' '));
    this._ottoEl.classList.remove('is-talk'); void this._ottoEl.offsetWidth; this._ottoEl.classList.add('is-talk');
  },

  /* ---------------- the pins fly ---------------- */
  /* each pin word's bead flies to the picture it names in the docked panel / the scene; a pin with nothing to name flies to the
     middle, finds nothing, and falls back */
  _fly: function (res) {
    var self = this, st = this.st, wrapR = this._wrap.getBoundingClientRect(), layer = this._pinsEl;
    layer.innerHTML = '';
    if (this.FAST || st.task === 'color') return;
    var jobs = [];
    var strips = st.task === 'which' ? res.strips : [res.pins];
    strips.forEach(function (pins, k) {
      var words = self._stripsEl.querySelectorAll('.op-strip')[k], beads = words ? words.querySelectorAll('.op-word .op-bead, .op-blank > .op-bead') : [];
      var scene = st.task === 'which' ? self._stageEl.querySelector('[data-panel="' + st.docks[k] + '"] .op-pic') : self._stageEl.querySelector('.op-pic');
      if (!scene) return;
      var tokens = st.task === 'which' ? st.r.strips[k].tokens : st.r.tokens, bi = 0;
      tokens.forEach(function (t) { if (t.tag || t.blank) { var b = beads[bi], p = pins[bi]; bi++; if (b && p) jobs.push({ b: b, p: p, scene: scene }); } });
    });
    jobs.forEach(function (j, n) {
      var from = j.b.getBoundingClientRect(), target = j.p.stuck && j.p.at >= 0 ? j.scene.querySelector('[data-pic="' + j.p.at + '"]') : j.scene, to = target.getBoundingClientRect();
      var dart = self.api.el('span', 'op-dart' + (j.p.stuck ? ' is-stuck' : ' is-dangle'));
      dart.style.left = (from.left - wrapR.left + from.width / 2 - 8) + 'px'; dart.style.top = (from.top - wrapR.top + from.height / 2 - 8) + 'px';
      dart.style.setProperty('--dx', (to.left + to.width / 2 - from.left - from.width / 2) + 'px'); dart.style.setProperty('--dy', (to.top + Math.min(to.height / 2, 30) - from.top - from.height / 2) + 'px');
      dart.style.animationDelay = (n * 120) + 'ms';
      layer.appendChild(dart);
    });
  },
  _check: function () {
    if (!this._free()) return;
    var self = this, st = this.st, C = OttoPinsCore;
    var res = C.check(st);
    if (res.reason === 'empty') { this.api.sound(460); this._view = {}; this._paint(); return; }
    this._busy = true;
    this._fly(res);
    this.api.sound(res.ok ? 700 : 300);
    this._later(function () {
      self._pinsEl.innerHTML = '';
      if (res.ok) return self._win(res);
      if (st.task === 'fill' && st.r.letters) st.spelled = st.spelled.map(function () { return null; });
      self._busy = false; self.api.sound(196); self._view = {}; self._paint(); self.api.announce(self._note.textContent || '');
    }, this._ms(this.FLY_MS));
  },
  _win: function (res) {
    var self = this, st = this.st, pa = this._pa || {}, key = st.task === 'which' ? 'okWhich' : st.task === 'fill' ? 'okFill' : st.task === 'color' ? 'okColor' : (st.r.truth ? 'okTrue' : 'okFalse');
    var msg = this._t(key); pa.msg = msg; this._busy = true; this._view = { msg: msg };
    this.api.sound(659); this._later(function () { self.api.sound(784); }, this._ms(110)); this._later(function () { self.api.sound(1046); }, this._ms(220));
    this._paint();
    this._later(function () { self._busy = false; self._paint(); self.api.announce(msg); }, this._ms(500));
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

var opCssDone = false;
function injectPinsCSS() {
  if (opCssDone || typeof document === 'undefined') return;
  opCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.op-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;--op-ink:#2A2A35;--op-teal:#146B5E;--op-coral:#F2784B;--op-cream:#FFF8EC;--op-gold:#E8B83A;--op-a:#2F7FC1;--op-b:#9B59B6;user-select:none;-webkit-user-select:none;}'
  + '.op-wrap:focus{outline:none;}'
  + '.op-img{width:100%;height:100%;object-fit:contain;display:block;pointer-events:none;}'
  /* Otto and the strips */
  + '.op-top{display:flex;align-items:center;gap:12px;width:100%;max-width:660px;}'
  + '.op-otto{flex:none;width:var(--op-otto);height:var(--op-otto);padding:0;border:0;background:transparent;cursor:pointer;} .op-otto.is-talk{animation:op-talk .5s ease-in-out 2;} @keyframes op-talk{50%{transform:rotate(-6deg) scale(1.05);}}'
  + '.op-strips{display:flex;flex-direction:column;gap:8px;flex:1 1 auto;min-width:0;}'
  + '.op-strip{position:relative;display:block;padding:10px 14px 8px;border:0;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 3px var(--op-ink),0 3px 0 #C9B999;font-family:' + B + ';font-weight:800;font-size:20px;line-height:1.3;color:var(--op-ink);text-align:left;overflow-wrap:anywhere;}'
  + 'button.op-strip{cursor:grab;touch-action:none;font:inherit;font-family:' + B + ';font-weight:800;font-size:20px;line-height:1.3;}'
  + '.op-strip.is-sel{box-shadow:inset 0 0 0 4px var(--op-coral),0 3px 0 #C9B999;} .op-strip.is-docked{background:#F3F8FF;}'
  + '.op-letter{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;margin-right:8px;border-radius:50%;background:var(--op-a);color:#fff;font-size:15px;line-height:1;vertical-align:2px;} .op-strip.is-b .op-letter{background:var(--op-b);}'
  + '.op-word{position:relative;display:inline-block;max-width:100%;white-space:normal;line-height:1.3;padding-bottom:15px;vertical-align:baseline;} .op-bead{position:absolute;left:50%;bottom:0;width:14px;height:14px;margin-left:-7px;border-radius:50%;background:var(--op-gold);box-shadow:inset 0 0 0 2px var(--op-ink);}'
  + '.op-word.is-stuck .op-bead{background:var(--op-teal);} .op-word.is-dangle{color:#B2451F;text-decoration:underline;text-decoration-color:var(--op-coral);text-decoration-thickness:3px;text-underline-offset:4px;} .op-word.is-dangle .op-bead{background:var(--op-coral);animation:op-swing .6s ease-in-out 2;transform-origin:50% -10px;} @keyframes op-swing{25%{transform:rotate(18deg);}75%{transform:rotate(-18deg);}}'
  + '.op-word.is-point .op-bead{box-shadow:0 0 0 4px rgba(232,184,58,.7);}'
  + '.op-blank{position:relative;display:inline-flex;align-items:center;justify-content:center;min-width:90px;min-height:36px;margin:0 2px;padding:0 10px;border-radius:8px;border:3px dashed #C9B999;vertical-align:middle;line-height:1.2;} .op-blank.is-full{border-style:solid;border-color:var(--op-teal);} .op-blank.is-over{border-color:var(--op-teal);background:#EAF6F3;} .op-blank.is-dangle{border-color:var(--op-coral);color:#B2451F;}'
  + '.op-blank.is-letters{gap:4px;padding:3px;border-style:solid;min-width:0;} .op-blank > .op-bead{bottom:-9px;}'
  + '.op-box{display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;width:36px;height:40px;padding:0;border:0;border-radius:6px;background:#FBF6EC;box-shadow:inset 0 0 0 2px var(--op-ink);font-family:' + B + ';font-weight:800;font-size:20px;color:var(--op-ink);} .op-box.is-full{background:#fff;} .op-box.is-ghost{color:#B9B9C4;}'
  /* the stage */
  + '.op-stage{display:flex;justify-content:center;width:100%;max-width:660px;}'
  + '.op-grid{display:grid;grid-template-columns:repeat(2,var(--op-panel-w));gap:12px;}'
  + '.op-panel{position:relative;padding:4px;border:0;border-radius:12px;background:var(--op-cream);box-shadow:inset 0 0 0 3px var(--op-ink);cursor:pointer;} .op-panel.is-over{box-shadow:inset 0 0 0 5px var(--op-teal);} .op-panel.is-docked{box-shadow:inset 0 0 0 5px var(--op-a);} .op-panel.is-point{outline:4px dashed var(--op-gold);outline-offset:2px;}'
  + '.op-num{position:absolute;left:8px;top:8px;width:24px;height:24px;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 2px var(--op-ink);font-family:' + D + ';font-weight:800;font-size:15px;line-height:24px;text-align:center;color:var(--op-ink);z-index:2;}'
  + '.op-dock{position:absolute;right:8px;top:8px;width:28px;height:28px;border-radius:50%;background:var(--op-a);color:#fff;font-family:' + D + ';font-weight:800;font-size:16px;line-height:28px;text-align:center;z-index:2;} .op-dock.is-b{right:40px;background:var(--op-b);}'
  + '.op-pic{position:relative;display:block;border-radius:8px;overflow:hidden;}'
  + '.op-sky-day{background:linear-gradient(#D6ECF9 0,#EEF7FC 70%,#B8DB9A 70%);} .op-sky-rain{background:linear-gradient(#B9C6D3 0,#D9E1E8 70%,#A9C79A 70%);} .op-sky-night{background:linear-gradient(#2B3563 0,#46548A 70%,#4E6B4A 70%);} .op-sky-snow{background:linear-gradient(#DCE6EF 0,#F2F6FA 66%,#FFFFFF 66%);} .op-sky-indoor{background:linear-gradient(#F6E7CC 0,#F6E7CC 72%,#D9B98C 72%);}'
  + '.op-pic.op-sand{background:linear-gradient(#D6ECF9 0,#EEF7FC 62%,#EBD7A6 62%);}'
  + '.op-water{position:absolute;left:0;right:0;bottom:0;height:34%;background:#7DB8E3;box-shadow:inset 0 4px 0 rgba(255,255,255,.45);} .op-water-far{right:0;width:62%;left:auto;height:34%;border-radius:0;} .op-water-far::after{content:"";position:absolute;right:-1px;top:0;bottom:0;width:30%;background:#B8DB9A;border-radius:40% 0 0 0;}'
  + '.op-soil{position:absolute;left:0;right:0;bottom:0;height:30%;background:#8C5E3C;box-shadow:inset 0 4px 0 #6E4527;} .op-soil.is-cover{left:auto;right:0;width:60%;height:22%;border-radius:40% 40% 0 0;z-index:1;}'
  + '.op-wind{position:absolute;left:44%;top:22%;width:30%;display:flex;flex-direction:column;gap:8px;z-index:1;} .op-gust{display:block;height:4px;border-radius:2px;background:#5E7FA3;} .op-gust:nth-child(2){margin-left:18%;} .op-gust:nth-child(3){margin-left:8%;width:70%;}'
  + '.op-pp{position:absolute;display:block;}'
  + '.op-head{position:absolute;left:50%;top:6%;width:16px;height:16px;margin-left:-8px;border-radius:50%;background:var(--op-teal);box-shadow:0 0 0 3px #fff,0 2px 4px rgba(0,0,0,.3);z-index:2;} .op-head.is-scene{left:auto;right:10px;top:10px;margin:0;}'
  + '.op-star{position:absolute;right:10px;bottom:10px;width:40px;height:40px;background:var(--op-gold);clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);z-index:3;animation:op-stamp .35s ease-out;} @keyframes op-stamp{0%{transform:scale(2.2) rotate(-30deg);opacity:0;}}'
  + '.op-panel.is-won,.op-scenebox.is-won{transform:rotate(-1.5deg);box-shadow:inset 0 0 0 5px var(--op-teal),0 8px 16px rgba(0,0,0,.18);}'
  + '.op-scenebox{position:relative;padding:4px;border-radius:12px;background:var(--op-cream);box-shadow:inset 0 0 0 3px var(--op-ink);}'
  /* the bank, ✓ ✗, the pots */
  + '.op-tools{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;width:100%;max-width:660px;} .op-tools:empty{display:none;}'
  + '.op-tile{min-width:112px;min-height:48px;padding:0 16px;border:0;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 3px var(--op-ink),0 3px 0 #C9B999;font-family:' + B + ';font-weight:800;font-size:20px;color:var(--op-ink);cursor:grab;touch-action:none;} .op-tile.is-sel{box-shadow:inset 0 0 0 4px var(--op-teal),0 3px 0 #C9B999;background:#EAF6F3;} .op-tile.is-glow{box-shadow:inset 0 0 0 4px var(--op-gold),0 0 0 4px rgba(232,184,58,.5);}'
  + '.op-tile.is-letter{min-width:48px;padding:0;cursor:pointer;} .op-tile.is-used{opacity:.3;}'
  + '.op-tf{width:72px;height:64px;border:0;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 3px var(--op-ink),0 3px 0 #C9B999;font-size:34px;font-weight:800;cursor:pointer;} .op-tf.is-yes{color:var(--op-teal);} .op-tf.is-no{color:#C0392B;} .op-tf.is-sel{box-shadow:inset 0 0 0 5px var(--op-gold),0 3px 0 #C9B999;transform:translateY(2px);}'
  + '.op-tiles{position:relative;display:grid;grid-template-columns:repeat(var(--op-cols,4),var(--op-tile));gap:8px;padding:8px 8px 8px 30px;border-radius:12px;background:var(--op-cream);box-shadow:inset 0 0 0 3px var(--op-ink);}'
  + '.op-arrow{position:absolute;left:6px;top:50%;width:0;height:0;margin-top:-10px;border-left:16px solid var(--op-coral);border-top:10px solid transparent;border-bottom:10px solid transparent;}'
  + '.op-ctile{position:relative;width:var(--op-tile);height:var(--op-tile);padding:0;border:0;background:transparent;cursor:pointer;}'
  + '.op-disc{position:absolute;inset:0;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 2px #C9B999;}'
  + '.op-ctile .op-img{position:relative;display:block;width:100%;height:100%;margin:0;}'
  + '.op-ctile.is-red .op-disc,.op-pot.is-red{background:#E74C3C radial-gradient(circle,rgba(255,255,255,.55) 2px,transparent 2.5px) 0 0/10px 10px;} .op-ctile.is-blue .op-disc,.op-pot.is-blue{background:#3498DB repeating-linear-gradient(45deg,rgba(255,255,255,.45) 0 2px,transparent 2px 8px);} .op-ctile.is-yellow .op-disc,.op-pot.is-yellow{background:#F4D03F;} .op-ctile.is-green .op-disc,.op-pot.is-green{background:#2ECC71 repeating-linear-gradient(0deg,rgba(255,255,255,.45) 0 2px,transparent 2px 8px);} .op-ctile.is-orange .op-disc,.op-pot.is-orange{background:#F39C12 repeating-linear-gradient(90deg,rgba(255,255,255,.45) 0 2px,transparent 2px 8px);} .op-ctile.is-brown .op-disc,.op-pot.is-brown{background:repeating-linear-gradient(45deg,rgba(255,255,255,.35) 0 2px,transparent 2px 6px),repeating-linear-gradient(-45deg,rgba(255,255,255,.35) 0 2px,transparent 2px 6px),#8E5B3A;}'
  + '.op-ctile.is-ring::after{content:"";position:absolute;inset:-3px;border-radius:50%;border:3px dashed var(--op-gold);} .op-ctile.is-notasked::after{content:"";position:absolute;inset:-3px;border-radius:50%;border:3px solid #9A9AA6;} .op-ctile.is-pinned::before{content:"";position:absolute;left:50%;top:-4px;width:14px;height:14px;margin-left:-7px;border-radius:50%;background:var(--op-teal);box-shadow:0 0 0 2px #fff;z-index:2;}'
  + '.op-pot{width:48px;height:48px;border:0;border-radius:50%;box-shadow:inset 0 0 0 3px var(--op-ink),0 3px 0 #C9B999;cursor:pointer;} .op-pot.is-sel{transform:translateY(-6px);box-shadow:inset 0 0 0 3px var(--op-ink),0 0 0 4px var(--op-gold);}'
  + '.op-ghost{position:fixed;z-index:9999;pointer-events:none;opacity:.85;}'
  /* the darts */
  + '.op-pins{position:absolute;inset:0;pointer-events:none;z-index:20;}'
  + '.op-dart{position:absolute;width:16px;height:16px;border-radius:50%;background:var(--op-gold);box-shadow:inset 0 0 0 2px var(--op-ink);animation:op-fly .5s ease-in-out both;} .op-dart.is-dangle{animation:op-miss .8s ease-in-out both;} .op-dart.is-stuck{background:var(--op-teal);}'
  + '@keyframes op-fly{to{transform:translate(var(--dx),var(--dy));}} @keyframes op-miss{55%{transform:translate(var(--dx),var(--dy));}100%{transform:translate(0,0);opacity:.2;}}'
  /* Check */
  + '.op-row{display:flex;justify-content:flex-end;width:100%;max-width:660px;}'
  + '.op-check{min-height:52px;padding:0 26px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;font-family:' + D + ';cursor:pointer;box-shadow:0 3px 0 #C95A31;} .op-check[hidden]{display:none;} .op-check:disabled{opacity:.6;}'
  + '.op-note{width:100%;max-width:660px;min-height:24px;margin:0;font-weight:700;font-size:clamp(15px,2.3vw,18px);line-height:1.3;font-family:' + B + ';color:var(--op-teal);text-align:center;} .op-note:empty{display:none;} .op-note.is-ok{font-weight:800;} .op-note.is-wrong{color:#A6461F;}'
  /* phones */
  + '.op-wrap.is-narrow{gap:8px;} .op-wrap.is-narrow .op-grid{gap:8px;} .op-wrap.is-narrow .op-strip,.op-wrap.is-narrow button.op-strip{font-size:17px;padding:8px 10px 6px;} .op-wrap.is-narrow .op-tile{min-width:88px;font-size:17px;} .op-wrap .op-tile.is-letter{min-width:46px;min-height:46px;padding:0;font-size:19px;}'
  + '.op-wrap.is-narrow .op-tiles{gap:6px;padding:6px 6px 6px 24px;} .op-wrap.is-narrow .op-pot{width:44px;height:44px;} .op-wrap.is-narrow .op-tools{gap:6px;}'
  + '.op-wrap.is-narrow .op-box{width:32px;height:36px;font-size:18px;}'
  + '.op-wrap.is-tiny .op-tools{gap:4px;} .op-wrap.is-tiny .op-strip,.op-wrap.is-tiny button.op-strip{font-size:16px;line-height:1.3;padding:6px 8px 4px;} .op-wrap.is-tiny .op-grid{gap:6px;} .op-wrap.is-tiny .op-top{gap:6px;} .op-wrap.is-tiny .op-strips{gap:6px;}'
  + '.op-wrap.is-tiny .op-tiles{gap:3px;padding:4px 4px 4px 14px;} .op-wrap.is-tiny .op-arrow{left:2px;border-left-width:11px;border-top-width:8px;border-bottom-width:8px;margin-top:-8px;}'
  + '.op-wrap.is-fast *,.op-wrap.is-fast *::before,.op-wrap.is-fast *::after{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.op-wrap *{animation-duration:.2s !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'op-css'; s.textContent = css; document.head.appendChild(s);
}
