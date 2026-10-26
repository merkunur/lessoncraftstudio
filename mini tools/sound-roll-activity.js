/* =====================================================================
   sound-roll-activity.js — ACTIVITY #109 of the one-by-one rebuild:
   "Stretch the Giraffe" → THE SOUND ROLL (RF.1.2.a; en de nl sv da no fi).
   Design: docs/activities-rebuild/designs/109-stretch-giraffe.md
   ---------------------------------------------------------------------
   THE INVENTION: a music-box roll you punch one hole per sound. A tap on
   the punch makes a round hole; HOLD it and the hole grows under your
   finger into a long slot at the stretch mark. Crank the box (Check): it
   plays your roll — a short plink for a round hole, a held plinnng for a
   slot, the giraffe on the lid rising on tiptoe for every long note — and
   the word's own roll slides up under yours: gold where they agree, coral
   where they do not. Clues: Long or short? (three pictures, punch each
   vowel), Count the sounds (one picture, a blank roll), Blend (a lettered
   roll: crank it, then pick the picture). Finished words go to the song
   book as little punched cards.
   ACTIVITY LAYER ONLY: the model is sound-roll-core.js; pictures are the
   library's (bank rows); lcs-shell.js untouched (the shell's Check is
   hidden and pressed by this activity when right).
   Test seams: window.SoundRollActivity.st / ._pool / ._order / ._ensurePool /
   ._start / ._view / ._dims / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var SoundRollActivity = {
  id: 'sound-roll',
  apparatusClasses: ['sr-'],

  /*STRINGS-BEGIN*/strings: {
    title:        {en:'Stretch the Giraffe',de:'Streck die Giraffe',nl:'Rek de giraf',da:'Stræk giraffen',sv:'Sträck giraffen',no:'Strekk giraffen',es:'Estira la jirafa',it:'Allunga la giraffa',pt:'Estique a girafa',fr:'Étire la girafe',fi:'Venytä kirahvia'},
    instrBubble:  {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:     {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    check:        {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    tLos:         {en:'Say each picture. Punch its vowel: tap for a quick one, hold for a long one that says its name.',de:'Sag, was auf jedem Bild ist. Stanze den Vokal: tippen für einen kurzen, gedrückt halten für einen langen.',nl:'Noem elk plaatje. Pons een gaatje voor de klinker: tik voor een korte, houd vast voor een lange.',da:'Sig, hvad hvert billede er. Slå et hul for vokalen: tryk for en kort, hold nede for en lang.',sv:'Säg vad varje bild är. Stansa vokalen: tryck för en kort, håll in för en lång.',no:'Si hva hvert bilde er. Slå hull for vokalen: trykk for en kort, hold inne for en lang.',es:'Di cada dibujo. Perfora la vocal: toca para una corta, mantén para una larga.',it:'Di’ ogni immagine. Fora la vocale: tocca per una breve, tieni premuto per una lunga.',pt:'Diga cada figura. Fure a vogal: toque para uma curta, segure para uma longa.',fr:'Dis chaque image. Perce la voyelle : touche pour une courte, garde appuyé pour une longue.',fi:'Sano jokaisen kuvan nimi. Tee reikä vokaalille: napauta lyhyelle, pidä pohjassa pitkälle.'},
    tCount:       {en:'Say the word slowly and punch one hole for each sound.',de:'Sag das Wort langsam und stanze ein Loch für jeden Laut.',nl:'Zeg het woord langzaam en pons een gaatje voor elke klank.',da:'Sig ordet langsomt, og slå et hul for hver lyd.',sv:'Säg ordet långsamt och stansa ett hål för varje ljud.',no:'Si ordet sakte, og slå et hull for hver lyd.',es:'Di la palabra despacio y perfora un agujero por cada sonido.',it:'Di’ la parola piano e fai un buco per ogni suono.',pt:'Diga a palavra devagar e faça um furo para cada som.',fr:'Dis le mot lentement et perce un trou pour chaque son.',fi:'Sano sana hitaasti ja tee yksi reikä jokaista äännettä kohti.'},
    tBlend:       {en:'Turn the crank and read the sounds. Which picture is it?',de:'Dreh die Kurbel und lies die Laute. Welches Bild ist es?',nl:'Draai aan de slinger en lees de klanken. Welk plaatje is het?',da:'Drej håndsvinget, og læs lydene. Hvilket billede er det?',sv:'Veva och läs ljuden. Vilken bild är det?',no:'Sveiv og les lydene. Hvilket bilde er det?',es:'Gira la manivela y lee los sonidos. ¿Qué dibujo es?',it:'Gira la manovella e leggi i suoni. Quale immagine è?',pt:'Gire a manivela e leia os sons. Qual é a figura?',fr:'Tourne la manivelle et lis les sons. Quelle image est-ce ?',fi:'Pyöritä kampea ja lue äänteet. Mikä kuva se on?'},
    hintEmpty:    {en:'Say the word slowly and punch its sounds.',de:'Sag das Wort langsam und stanze seine Laute.',nl:'Zeg het woord langzaam en pons zijn klanken.',da:'Sig ordet langsomt, og slå et hul for hver lyd.',sv:'Säg ordet långsamt och stansa ett hål för varje ljud.',no:'Si ordet sakte, og slå hull for hver lyd.',es:'Di la palabra despacio y perfora sus sonidos.',it:'Di’ la parola piano e fora i suoi suoni.',pt:'Diga a palavra devagar e fure os sons dela.',fr:'Dis le mot lentement et perce ses sons.',fi:'Sano sana hitaasti ja tee reikä jokaista äännettä kohti.'},
    hintPick:     {en:'Listen to the roll, then tap the picture it spells.',de:'Hör dir die Rolle an und tippe dann das passende Bild an.',nl:'Luister naar de rol en tik dan op het plaatje dat erbij hoort.',da:'Lyt til rullen, og tryk så på det billede, den staver.',sv:'Lyssna på rullen och tryck sedan på bilden den stavar.',no:'Lytt til rullen, og trykk så på bildet den staver.',es:'Escucha el rollo y toca el dibujo que deletrea.',it:'Ascolta il rullo e tocca l’immagine che scrive.',pt:'Escute o rolo e toque na figura que ele soletra.',fr:'Écoute le rouleau, puis touche l’image qu’il épelle.',fi:'Kuuntele rulla ja napauta sitten kuvaa, jonka se tavaa.'},
    hintLos:      {en:'Listen to the vowel again. Does it say its name, or is it quick?',de:'Hör noch einmal auf den Vokal. Ist er lang oder kurz?',nl:'Luister nog eens naar de klinker. Is hij lang of kort?',da:'Lyt til vokalen igen. Er den lang eller kort?',sv:'Lyssna på vokalen igen. Är den lång eller kort?',no:'Lytt til vokalen igjen. Er den lang eller kort?',es:'Escucha otra vez la vocal. ¿Es larga o corta?',it:'Ascolta di nuovo la vocale. È lunga o breve?',pt:'Ouça a vogal de novo. Ela é longa ou curta?',fr:'Écoute encore la voyelle. Est-elle longue ou courte ?',fi:'Kuuntele vokaalia uudelleen. Onko se pitkä vai lyhyt?'},
    hintLos2:     {en:'Look at the gold and coral holes: a long vowel is a slot, a quick one is a round hole. Punch the coral ones again.',de:'Schau auf die goldenen und roten Löcher: Ein langer Vokal ist ein Schlitz, ein kurzer ein rundes Loch. Stanze die roten neu.',nl:'Kijk naar de gouden en rode gaatjes: een lange klinker is een sleuf, een korte een rond gaatje. Pons de rode opnieuw.',da:'Se på de gyldne og røde huller: En lang vokal er en slids, en kort er et rundt hul. Slå de røde igen.',sv:'Titta på de gyllene och röda hålen: en lång vokal är en springa, en kort är ett runt hål. Stansa de röda igen.',no:'Se på de gylne og røde hullene: En lang vokal er en spalte, en kort er et rundt hull. Slå de røde på nytt.',es:'Mira los agujeros dorados y rojos: una vocal larga es una ranura y una corta, un agujero redondo. Vuelve a perforar los rojos.',it:'Guarda i buchi dorati e rossi: una vocale lunga è una fessura, una breve un buco tondo. Rifai quelli rossi.',pt:'Olhe os furos dourados e vermelhos: uma vogal longa é uma fenda, uma curta é um furo redondo. Fure de novo os vermelhos.',fr:'Regarde les trous dorés et rouges : une voyelle longue est une fente, une courte un trou rond. Reperce les rouges.',fi:'Katso kultaisia ja punaisia reikiä: pitkä vokaali on rako, lyhyt on pyöreä reikä. Tee punaiset uudelleen.'},
    hintCount:    {en:'One hole for every sound, not every letter.',de:'Ein Loch für jeden Laut – nicht für jeden Buchstaben.',nl:'Eén gaatje voor elke klank, niet voor elke letter.',da:'Ét hul for hver lyd, ikke for hvert bogstav.',sv:'Ett hål för varje ljud, inte för varje bokstav.',no:'Ett hull for hver lyd, ikke for hver bokstav.',es:'Un agujero por cada sonido, no por cada letra.',it:'Un buco per ogni suono, non per ogni lettera.',pt:'Um furo para cada som, não para cada letra.',fr:'Un trou pour chaque son, pas pour chaque lettre.',fi:'Yksi reikä jokaista äännettä kohti. Sano sana hitaasti.'},
    hintCount2:   {en:'Look at the word\'s roll under yours: sometimes two letters make one sound, and that is one hole.',de:'Schau auf die Rolle des Wortes unter deiner: Manchmal sind zwei Buchstaben ein Laut – das ist ein Loch.',nl:'Kijk naar de rol van het woord onder de jouwe: soms maken twee letters één klank, en dat is één gaatje.',da:'Se på ordets rulle under din: Nogle gange er to bogstaver én lyd, og det er ét hul.',sv:'Titta på ordets rulle under din: ibland blir två bokstäver ett ljud, och det är ett hål.',no:'Se på ordets rull under din: Noen ganger blir to bokstaver én lyd, og det er ett hull.',es:'Mira el rollo de la palabra debajo del tuyo: a veces dos letras hacen un sonido, y eso es un agujero.',it:'Guarda il rullo della parola sotto il tuo: a volte due lettere fanno un suono, ed è un buco.',pt:'Olhe o rolo da palavra embaixo do seu: às vezes duas letras fazem um som, e isso é um furo.',fr:'Regarde le rouleau du mot sous le tien : parfois deux lettres font un son, et c’est un trou.',fi:'Katso sanan rullaa omasi alla: pitkässä vokaalissa ja kaksoiskonsonantissa on kaksi samaa äännettä, ja ne ovat kaksi reikää.'},
    hintBlend:    {en:'Turn the crank again and say each sound, then put them together.',de:'Dreh noch einmal und sprich jeden Laut, dann zieh sie zusammen.',nl:'Draai nog eens en zeg elke klank, voeg ze dan samen.',da:'Drej igen, og sig hver lyd, og sæt dem så sammen.',sv:'Veva igen och säg varje ljud, och sätt sedan ihop dem.',no:'Sveiv igjen og si hver lyd, og sett dem så sammen.',es:'Gira otra vez y di cada sonido; luego júntalos.',it:'Gira di nuovo e di’ ogni suono, poi mettili insieme.',pt:'Gire de novo e diga cada som; depois junte todos.',fr:'Tourne encore et dis chaque son, puis assemble-les.',fi:'Pyöritä uudelleen ja sano jokainen äänne, yhdistä ne sitten.'},
    hintBlend2:   {en:'Say the sounds faster and faster until they make a word. Which picture is that word?',de:'Sprich die Laute immer schneller, bis ein Wort daraus wird. Welches Bild ist das Wort?',nl:'Zeg de klanken steeds sneller tot er een woord van komt. Welk plaatje is dat woord?',da:'Sig lydene hurtigere og hurtigere, til de bliver et ord. Hvilket billede er det ord?',sv:'Säg ljuden snabbare och snabbare tills de blir ett ord. Vilken bild är det ordet?',no:'Si lydene raskere og raskere til de blir et ord. Hvilket bilde er det ordet?',es:'Di los sonidos cada vez más rápido hasta que formen una palabra. ¿Qué dibujo es esa palabra?',it:'Di’ i suoni sempre più veloce finché diventano una parola. Quale immagine è quella parola?',pt:'Diga os sons cada vez mais rápido até virarem uma palavra. Qual figura é essa palavra?',fr:'Dis les sons de plus en plus vite jusqu’à former un mot. Quelle image est ce mot ?',fi:'Sano äänteet yhä nopeammin, kunnes niistä tulee sana. Mikä kuva se sana on?'},
    okLos3L:      {en:'All three stretch: every vowel is long!',de:'Alle drei sind lang gezogen: Jeder Vokal ist lang!',nl:'Alle drie rekken uit: elke klinker is lang!',da:'Alle tre strækker sig: Hver vokal er lang!',sv:'Alla tre sträcker sig: varje vokal är lång!',no:'Alle tre strekker seg: Hver vokal er lang!',es:'¡Las tres se estiran: todas las vocales son largas!',it:'Tutte e tre si allungano: ogni vocale è lunga!',pt:'As três se esticam: todas as vogais são longas!',fr:'Les trois s’étirent : chaque voyelle est longue !',fi:'Kaikki kolme venyvät: jokainen vokaali on pitkä!'},
    okLos3S:      {en:'All three are quick: every vowel is short!',de:'Alle drei sind schnell: Jeder Vokal ist kurz!',nl:'Alle drie zijn kort: elke klinker is kort!',da:'Alle tre er hurtige: Hver vokal er kort!',sv:'Alla tre är snabba: varje vokal är kort!',no:'Alle tre er raske: Hver vokal er kort!',es:'¡Las tres son rápidas: todas las vocales son cortas!',it:'Tutte e tre sono veloci: ogni vocale è breve!',pt:'As três são rápidas: todas as vogais são curtas!',fr:'Les trois sont rapides : chaque voyelle est courte !',fi:'Kaikki kolme ovat nopeita: jokainen vokaali on lyhyt!'},
    okLosMix:     {en:'You heard every vowel! The long ones stretch, the quick ones do not.',de:'Du hast jeden Vokal gehört! Die langen sind gezogen, die kurzen nicht.',nl:'Je hoorde elke klinker! De lange rekken uit, de korte niet.',da:'Du hørte hver vokal! De lange strækker sig, de korte gør ikke.',sv:'Du hörde varje vokal! De långa sträcker sig, de korta gör det inte.',no:'Du hørte hver vokal! De lange strekker seg, de korte gjør det ikke.',es:'¡Oíste cada vocal! Las largas se estiran, las cortas no.',it:'Hai sentito ogni vocale! Le lunghe si allungano, le brevi no.',pt:'Você ouviu cada vogal! As longas se esticam, as curtas não.',fr:'Tu as entendu chaque voyelle ! Les longues s’étirent, les courtes non.',fi:'Kuulit jokaisen vokaalin! Pitkät venyvät, lyhyet eivät.'},
    okCount:      {en:'{word} has {n} sounds, and you punched every one!',de:'{word} hat {n} Laute, und du hast jeden gestanzt!',nl:'{word} heeft {n} klanken, en je hebt ze allemaal geponst!',da:'{word} har {n} lyde, og du slog hul for dem alle!',sv:'{word} har {n} ljud, och du stansade vartenda ett!',no:'{word} har {n} lyder, og du slo hull for hver eneste en!',es:'{word} tiene {n} sonidos, ¡y perforaste todos!',it:'{word} ha {n} suoni, e li hai forati tutti!',pt:'{word} tem {n} sons, e você furou todos!',fr:'{word} a {n} sons, et tu les as tous percés !',fi:'Sanassa {word} on {n} äännettä, ja teit reiän jokaiselle!'},
    okBlend:      {en:'{sounds} makes {word}!',de:'{sounds} ergibt {word}!',nl:'{sounds} wordt {word}!',da:'{sounds} bliver til {word}!',sv:'{sounds} blir {word}!',no:'{sounds} blir {word}!',es:'¡{sounds} forma {word}!',it:'{sounds} fa {word}!',pt:'{sounds} forma {word}!',fr:'{sounds} donne {word} !',fi:'{sounds} – siitä tulee {word}!'},
    aBook:        {en:'Song book: the words you finished',de:'Liederbuch: deine fertigen Wörter',nl:'Liedjesboek: je afgemaakte woorden',da:'Sangbog: dine færdige ord',sv:'Sångbok: dina färdiga ord',no:'Sangbok: de ferdige ordene dine',es:'Cancionero: las palabras que terminaste',it:'Canzoniere: le parole che hai finito',pt:'Livro de músicas: as palavras que você terminou',fr:'Recueil : les mots que tu as finis',fi:'Laulukirja: valmiit sanasi'},
    aPic:         {en:'Picture: {name}. Tap to hear it.',de:'Bild: {name}. Tippen zum Anhören.',nl:'Plaatje: {name}. Tik om het te horen.',da:'Billede: {name}. Tryk for at høre det.',sv:'Bild: {name}. Tryck för att höra.',no:'Bilde: {name}. Trykk for å høre det.',es:'Dibujo: {name}. Toca para oírlo.',it:'Immagine: {name}. Tocca per sentirla.',pt:'Figura: {name}. Toque para ouvir.',fr:'Image : {name}. Touche pour l’entendre.',fi:'Kuva: {name}. Kuuntele napauttamalla.'},
    aRoll:        {en:'Roll for {name}: {n} holes',de:'Rolle für {name}: {n} Löcher',nl:'Rol voor {name}: {n} gaatjes',da:'Rulle til {name}: {n} huller',sv:'Rulle för {name}: {n} hål',no:'Rull for {name}: {n} hull',es:'Rollo de {name}: {n} agujeros',it:'Rullo di {name}: {n} buchi',pt:'Rolo de {name}: {n} furos',fr:'Rouleau de {name} : {n} trous',fi:'Rulla sanalle {name}: {n} reikää'},
    aBlendRoll:   {en:'A roll with the sounds {sounds}',de:'Eine Rolle mit den Lauten {sounds}',nl:'Een rol met de klanken {sounds}',da:'En rulle med lydene {sounds}',sv:'En rulle med ljuden {sounds}',no:'En rull med lydene {sounds}',es:'Un rollo con los sonidos {sounds}',it:'Un rullo con i suoni {sounds}',pt:'Um rolo com os sons {sounds}',fr:'Un rouleau avec les sons {sounds}',fi:'Rulla, jossa on äänteet {sounds}'},
    aChoice:      {en:'Picture {n}',de:'Bild {n}',nl:'Plaatje {n}',da:'Billede {n}',sv:'Bild {n}',no:'Bilde {n}',es:'Dibujo {n}',it:'Immagine {n}',pt:'Figura {n}',fr:'Image {n}',fi:'Kuva {n}'},
    aCrank:       {en:'Turn the crank: play the roll',de:'Kurbel drehen: die Rolle abspielen',nl:'Aan de slinger draaien: de rol afspelen',da:'Drej håndsvinget: spil rullen',sv:'Veva: spela rullen',no:'Sveiv: spill av rullen',es:'Gira la manivela: toca el rollo',it:'Gira la manovella: suona il rullo',pt:'Gire a manivela: toque o rolo',fr:'Tourne la manivelle : joue le rouleau',fi:'Pyöritä kampea: soita rulla'},
    aPunch:       {en:'Punch: tap for a short sound, hold for a long one (Shift+Enter)',de:'Stanze: tippen für einen kurzen Laut, halten für einen langen (Umschalt+Enter)',nl:'Pons: tik voor een korte klank, vasthouden voor een lange (Shift+Enter)',da:'Hullemaskine: tryk for en kort lyd, hold for en lang (Skift+Enter)',sv:'Stans: tryck för ett kort ljud, håll för ett långt (Skift+Enter)',no:'Hullemaskin: trykk for en kort lyd, hold for en lang (Skift+Enter)',es:'Perforadora: toca para un sonido corto, mantén para uno largo (Mayús+Intro)',it:'Foratrice: tocca per un suono breve, tieni premuto per uno lungo (Maiusc+Invio)',pt:'Furador: toque para um som curto, segure para um longo (Shift+Enter)',fr:'Perforatrice : touche pour un son court, garde appuyé pour un long (Maj+Entrée)',fi:'Rei\'itin: napauta lyhyelle äänteelle, pidä pohjassa pitkälle (Vaihto+Enter)'},
    aPunchedLong: {en:'Punched: a long slot',de:'Gestanzt: ein langer Schlitz',nl:'Geponst: een lange sleuf',da:'Slået: en lang slids',sv:'Stansat: en lång springa',no:'Slått: en lang spalte',es:'Perforada: una ranura larga',it:'Forato: una fessura lunga',pt:'Furado: uma fenda longa',fr:'Percé : une fente longue',fi:'Tehty: pitkä rako'},
    aPunchedRound:{en:'Punched: a round hole',de:'Gestanzt: ein rundes Loch',nl:'Geponst: een rond gaatje',da:'Slået: et rundt hul',sv:'Stansat: ett runt hål',no:'Slått: et rundt hull',es:'Perforado: un agujero redondo',it:'Forato: un buco tondo',pt:'Furado: um furo redondo',fr:'Percé : un trou rond',fi:'Tehty: pyöreä reikä'},
    setClue:      {en:'Clue',de:'Aufgabe',nl:'Opdracht',da:'Opgave',sv:'Uppgift',no:'Oppgave',es:'Pista',it:'Indizio',pt:'Pista',fr:'Indice',fi:'Tehtävä'},
    cLos:         {en:'Long or short?',de:'Lang oder kurz?',nl:'Lang of kort?',da:'Lang eller kort?',sv:'Lång eller kort?',no:'Lang eller kort?',es:'¿Larga o corta?',it:'Lunga o breve?',pt:'Longa ou curta?',fr:'Longue ou courte ?',fi:'Pitkä vai lyhyt?'},
    cCount:       {en:'Count the sounds',de:'Laute zählen',nl:'Klanken tellen',da:'Tæl lydene',sv:'Räkna ljuden',no:'Tell lydene',es:'Cuenta los sonidos',it:'Conta i suoni',pt:'Conte os sons',fr:'Compte les sons',fi:'Laske äänteet'},
    cBlend:       {en:'Blend',de:'Zusammenziehen',nl:'Samenvoegen',da:'Træk sammen',sv:'Ljuda ihop',no:'Trekk sammen',es:'Une los sonidos',it:'Fondi i suoni',pt:'Junte os sons',fr:'Fusionner',fi:'Yhdistä äänteet'},
    setLetters:   {en:'Letters under the holes',de:'Buchstaben unter den Löchern',nl:'Letters onder de gaatjes',da:'Bogstaver under hullerne',sv:'Bokstäver under hålen',no:'Bokstaver under hullene',es:'Letras bajo los agujeros',it:'Lettere sotto i buchi',pt:'Letras embaixo dos furos',fr:'Lettres sous les trous',fi:'Kirjaimet reikien alla'},
    lHidden:      {en:'Hidden',de:'Versteckt',nl:'Verborgen',da:'Skjult',sv:'Dolda',no:'Skjult',es:'Ocultas',it:'Nascoste',pt:'Ocultas',fr:'Cachées',fi:'Piilossa'},
    lShown:       {en:'Shown',de:'Sichtbar',nl:'Zichtbaar',da:'Vist',sv:'Visas',no:'Vist',es:'Visibles',it:'Visibili',pt:'Visíveis',fr:'Visibles',fi:'Näkyvissä'}
  },/*STRINGS-END*/

  defaults: { clue: 'los', letters: 'hidden' },
  settings: [
    { key: 'clue', type: 'choice', labelKey: 'setClue', options: [{ value: 'los', labelKey: 'cLos' }, { value: 'count', labelKey: 'cCount' }, { value: 'blend', labelKey: 'cBlend' }] },
    { key: 'letters', type: 'choice', labelKey: 'setLetters', options: [{ value: 'hidden', labelKey: 'lHidden' }, { value: 'shown', labelKey: 'lShown' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._at = 0;
    this._timers = []; this._ro = null; this._view = {}; this._book = []; this._hold = null; this._nudged = false;
    /* the clues this locale has (fi: no Long-or-short — length is a doubled letter; sv: no Count — its bank has only
       2- and 3-sound words): the settings offer only those */
    var C = SoundRollCore, have = C.clues(this._loc());
    if (have.length < 3) {
      this.settings = this.settings.map(function (f) { return f.key === 'clue' ? { key: f.key, type: f.type, labelKey: f.labelKey, options: f.options.filter(function (o) { return have.indexOf(o.value) >= 0; }) } : f; });
      if (api.settings && have.indexOf(api.settings.clue) < 0) api.settings.clue = have[0];
    }
    injectSoundRollCSS();
  },
  destroy: function () { this._clearTimers(); this._endHold(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return SoundRollCore.locale(((this.api && this.api.lang) || 'en')); },
  _clue: function () { return SoundRollCore.clueOf(this._loc(), this._setting('clue')); },
  _key: function () { return this._loc() + '/' + this._clue(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = SoundRollCore.ids(); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = SoundRollCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prevIds = fresh ? null : this._order.map(function (p) { return pool[p]; });
      var P = C.plan(this._loc(), this._clue(), Math.random, prevIds, pass);
      this._order = P.order.map(function (id) { return pool.indexOf(id); }); this._pos = P.pos; this._set = P.set; this._orderForPool = pool; this._pass = pass;
    }
    var r = pool[this._order[at]], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'soundroll.' + this._key() + '.' + (this._set || 0) + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t({ los: 'tLos', count: 'tCount', blend: 'tBlend' }[this.st.clue]); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers(); this._endHold(); this._at = at || 0;
    var pos = this._pos ? this._pos[this._at] : null;
    this.st = SoundRollCore.newState(this._loc(), this._clue(), this._set || 0, r, { pos: pos });
    this._resetView(); this._setPrompt();
  },
  _resetView: function () { this._view = { note: '', ok: '', master: false, playing: -1, playRoll: -1, tiptoe: false, nod: false, sel: null }; },
  _clearHelp: function () { var v = this._view; v.note = ''; v.master = false; v.wrongK = null; },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._pool[0], 0); this._render2(); this._watchWidth(); },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected || self._hold) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'sr-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="sr-book" role="list"></div><div class="sr-stage"></div><div class="sr-foot"></div><p class="sr-note" aria-live="polite"></p><p class="sr-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _dims: function () {
    var C = SoundRollCore, w = Math.min(this._width(), 700), B = C.band(this._width()), clue = this.st ? this.st.clue : 'los';
    var gap = B.wide ? 24 : 10, col = Math.floor((w - 2 * gap) / 3);
    var pic3 = Math.max(80, Math.min(120, col - 6)), pic1 = B.wide ? 150 : Math.min(130, Math.floor(w * 0.4));
    return { w: w, wide: B.wide, tiny: B.tiny, gap: gap, col: col, pic3: pic3, pic1: pic1, roll1: Math.min(w, 520), clue: clue };
  },
  _img: function (w) { return '/image-library-webp/themes/' + w.themeDir + '/' + w.noun + '@2x.webp'; },
  _speak: function (text) { try { if (window.LCSAudio && window.LCSAudio.speak) window.LCSAudio.speak({ type: 'word', text: text, lang: this._loc(), rate: 0.85 }); } catch (e) {} },
  _letters: function () { return this._setting('letters') === 'shown'; },

  /* ---- a roll, drawn: holes laid out left to right (a round hole one unit, a slot two), letters under them ---- */
  _roll: function (holes, W, H, opts) {
    opts = opts || {};
    var units = 0; holes.forEach(function (h) { units += h.len === 'long' ? 2.1 : 1; }); if (opts.ghost) units += 0.8; if (opts.minUnits) units = Math.max(units, opts.minUnits);
    var u = Math.min(W / (units + 0.9), H * 0.9, 46), r = Math.max(8, u * 0.32), x = (W - units * u) / 2 + u / 2, cy = H * (opts.letters ? 0.4 : 0.5);
    var out = '<svg class="sr-rollsvg' + (opts.cls ? ' ' + opts.cls : '') + '" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true" focusable="false">';
    out += '<rect x="1" y="1" width="' + (W - 2) + '" height="' + (H - 2) + '" rx="6" fill="' + (opts.master ? '#FFF4D6' : '#FFFDF6') + '" stroke="#C9B48F" stroke-width="1.5"/>';
    for (var sx = 8; sx < W - 4; sx += 14) out += '<circle cx="' + sx + '" cy="5" r="1.5" fill="#D9C9A8"/><circle cx="' + sx + '" cy="' + (H - 5) + '" r="1.5" fill="#D9C9A8"/>';
    var self = this, pos = [];
    holes.forEach(function (h, i) {
      var long = h.len === 'long', w = long ? u * 1.75 + 2 * r * 0 : 0, cx = x + (long ? u * 0.55 : 0), cls = 'sr-hole' + (h.cls ? ' ' + h.cls : '');
      if (h.empty) out += '<circle class="' + cls + ' is-empty" data-h="' + i + '" cx="' + f1(x) + '" cy="' + f1(cy) + '" r="' + f1(r) + '" fill="none" stroke="#8C7A5B" stroke-width="2" stroke-dasharray="4 3"/>';
      else if (long) out += '<rect class="' + cls + ' is-long" data-h="' + i + '" x="' + f1(x - r) + '" y="' + f1(cy - r) + '" width="' + f1(u * 1.1 + 2 * r) + '" height="' + f1(2 * r) + '" rx="' + f1(r) + '"/><line class="sr-mark" x1="' + f1(x - r + (u * 1.1 + 2 * r) * 0.67) + '" y1="' + f1(cy - r - 4) + '" x2="' + f1(x - r + (u * 1.1 + 2 * r) * 0.67) + '" y2="' + f1(cy - r + 3) + '"/>';
      else out += '<circle class="' + cls + '" data-h="' + i + '" cx="' + f1(x) + '" cy="' + f1(cy) + '" r="' + f1(r) + '"/>';
      if (opts.letters && h.g) out += '<text class="sr-let" x="' + f1(long ? x + u * 0.55 : x) + '" y="' + f1(H * 0.86) + '" text-anchor="middle">' + esc(h.g) + '</text>';
      pos.push(long ? x + u * 0.55 : x);
      x += long ? u * 2.1 : u;
      void w; void cx;
    });
    if (opts.ghost) { out += '<text class="sr-let sr-ghost" x="' + f1(x - u * 0.1) + '" y="' + f1(opts.letters ? H * 0.86 : cy + 6) + '" text-anchor="middle">' + esc(opts.ghost) + '</text>'; }
    void self;
    return out + '</svg>';
  },
  /* the child's roll for one picture, the word's own roll for it, and their comparison */
  _childHoles: function (i) {
    var C = SoundRollCore, st = this.st, v = this._view, id = st.words[i], m = C.master(st.loc, id), w = C.word(st.loc, id), letters = this._letters();
    if (st.clue === 'los') {
      var cmp = v.master ? C.compare(st)[i] : null;
      return m.holes.map(function (h, j) {
        if (j !== w.v) return { len: 'round', g: letters || v.master ? h.g : '', cls: 'is-pre' };
        var got = st.rolls[i];
        if (got == null) return { empty: true, len: 'round', g: letters || v.master ? h.g : '' };
        return { len: got, g: letters || v.master ? h.g : '', cls: cmp ? (cmp.ok ? 'is-gold' : 'is-coral') : (st.done ? 'is-gold' : '') };
      });
    }
    var cmp2 = v.master ? C.compare(st) : null;
    return st.holes.map(function (len, j) { return { len: len, g: '', cls: cmp2 ? (cmp2[j].ok ? 'is-gold' : 'is-coral') : (st.done ? 'is-gold' : '') }; });
  },
  _masterHoles: function (id, highlight) {
    var C = SoundRollCore, st = this.st, m = C.master(st.loc, id);
    return { holes: m.holes.map(function (h, j) { return { len: h.len, g: h.g, cls: (highlight === j ? 'is-play' : '') + ' is-master' }; }), ghost: m.ghost };
  },
  _paint_: function () {
    var C = SoundRollCore, st = this.st, D = this._dims(), v = this._view, self = this;
    this._wrap.className = 'sr-wrap ' + (D.wide ? 'is-wide' : 'is-narrow') + (D.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' clue-' + st.clue;
    /* the song book: a little punched card per finished word */
    var book = this._qs('.sr-book'); book.innerHTML = ''; book.setAttribute('aria-label', this._t('aBook'));
    this._book.slice(-9).forEach(function (b) { var c = document.createElement('div'); c.className = 'sr-card'; c.setAttribute('role', 'listitem'); c.innerHTML = self._roll(b.holes, 42, 22, { cls: 'sr-mini' }); book.appendChild(c); });
    var stage = this._qs('.sr-stage'); stage.innerHTML = '';
    if (st.clue === 'los') {
      var row = document.createElement('div'); row.className = 'sr-row3'; row.style.gap = D.gap + 'px';
      st.words.forEach(function (id, i) {
        var w = C.word(st.loc, id), col = document.createElement('div'); col.className = 'sr-col'; col.style.width = D.col + 'px';
        var pic = self._btn('sr-pic', 'pic-' + i, self._t('aPic', { name: w.display }), '<img src="' + self._img(w) + '" alt="" width="' + D.pic3 + '" height="' + D.pic3 + '" draggable="false">');
        pic.style.width = pic.style.height = (D.pic3 + 8) + 'px';
        pic.addEventListener('click', function () { self._speak(w.display); });
        col.appendChild(pic);
        var rw = Math.min(D.col, 170), rh = D.tiny ? 44 : 52, holes = self._childHoles(i);
        var roll = document.createElement('div'); roll.className = 'sr-roll' + (v.playRoll === i ? ' is-playing' : ''); roll.setAttribute('data-roll', String(i));
        roll.innerHTML = self._roll(holes, rw, rh + (self._letters() || v.master ? 14 : 0), { letters: self._letters() || v.master, ghost: (self._letters() || v.master) ? C.master(st.loc, id).ghost : null });
        roll.setAttribute('role', 'img'); roll.setAttribute('aria-label', self._t('aRoll', { name: w.display, n: holes.length }));
        self._wireHoles(roll, i);
        col.appendChild(roll);
        if (v.master) { var mm = self._masterHoles(id), mr = document.createElement('div'); mr.className = 'sr-roll sr-masterroll'; mr.innerHTML = self._roll(mm.holes, rw, rh + 14, { letters: true, master: true, ghost: mm.ghost }); col.appendChild(mr); }
        col.appendChild(self._punchKey(i, D.tiny ? 48 : 52));
        row.appendChild(col);
      });
      stage.appendChild(row);
    } else if (st.clue === 'count') {
      var id1 = st.words[0], w1 = C.word(st.loc, id1), box = document.createElement('div'); box.className = 'sr-one';
      var pic1 = self._btn('sr-pic sr-pic1', 'pic-0', self._t('aPic', { name: w1.display }), '<img src="' + self._img(w1) + '" alt="" width="' + D.pic1 + '" height="' + D.pic1 + '" draggable="false">');
      pic1.style.width = pic1.style.height = (D.pic1 + 8) + 'px';
      pic1.addEventListener('click', function () { self._speak(w1.display); });
      box.appendChild(pic1);
      var line = document.createElement('div'); line.className = 'sr-rollline';
      var rw1 = Math.max(200, D.roll1 - (D.tiny ? 56 : 84)), roll1 = document.createElement('div'); roll1.className = 'sr-roll sr-roll1'; roll1.setAttribute('data-roll', '0');
      var hs = self._childHoles(0); roll1.innerHTML = self._roll(hs, rw1, D.tiny ? 50 : 62, { minUnits: C.ROLL_UNITS });
      roll1.setAttribute('role', 'img'); roll1.setAttribute('aria-label', self._t('aRoll', { name: w1.display, n: hs.length }));
      self._wireHoles(roll1, 0);
      line.appendChild(roll1); line.appendChild(self._punchKey(0, D.tiny ? 50 : 64)); box.appendChild(line);
      if (v.master) { var m1 = self._masterHoles(id1), mr1 = document.createElement('div'); mr1.className = 'sr-roll sr-masterroll'; mr1.innerHTML = self._roll(m1.holes, rw1, (D.tiny ? 50 : 62) + 14, { letters: true, master: true, ghost: m1.ghost, minUnits: C.ROLL_UNITS }); box.appendChild(mr1); }
      stage.appendChild(box);
    } else {
      var tg = C.word(st.loc, st.target), mb = self._masterHoles(st.target, v.playing), b2 = document.createElement('div'); b2.className = 'sr-one';
      var rollB = document.createElement('div'); rollB.className = 'sr-roll sr-rollb'; rollB.innerHTML = self._roll(mb.holes, Math.min(D.w, 420), D.tiny ? 64 : 76, { letters: true, master: true, ghost: mb.ghost });
      rollB.setAttribute('role', 'img'); rollB.setAttribute('aria-label', self._t('aBlendRoll', { sounds: mb.holes.map(function (h) { return h.g; }).join(' ') }));
      b2.appendChild(rollB);
      var choices = document.createElement('div'); choices.className = 'sr-row3'; choices.style.gap = D.gap + 'px';
      st.choices.forEach(function (cid, k) {
        var cw = C.word(st.loc, cid), b = self._btn('sr-pic sr-choice' + (st.picked === k ? ' is-sel' : '') + (st.done && k === st.right ? ' is-right' : '') + (v.wrongK === k ? ' is-wrong' : ''), 'choice-' + k, self._t('aChoice', { n: k + 1 }), '<img src="' + self._img(cw) + '" alt="" width="' + D.pic3 + '" height="' + D.pic3 + '" draggable="false">');
        b.style.width = b.style.height = (D.pic3 + 8) + 'px'; b.setAttribute('aria-pressed', st.picked === k ? 'true' : 'false');
        b.addEventListener('click', function () { if (C.pick(st, k) === 'picked') { self.api.sound(540); self._clearHelp(); self._paint(); } });
        choices.appendChild(b);
      });
      b2.appendChild(choices); stage.appendChild(b2);
    }
    /* the music box: the giraffe on the lid, the comb, the crank; then Check */
    var foot = this._qs('.sr-foot'); foot.innerHTML = '';
    var boxEl = document.createElement('div'); boxEl.className = 'sr-box' + (v.tiptoe ? ' is-tiptoe' : '') + (v.nod ? ' is-nod' : '');
    boxEl.innerHTML = '<img class="sr-giraffe" src="/image-library-webp/themes/zoo animals/giraffe@2x.webp" alt="" draggable="false"><svg class="sr-boxsvg" viewBox="0 0 100 44" width="100" height="44" aria-hidden="true"><rect x="2" y="6" width="96" height="36" rx="6" fill="#B5763A" stroke="#5A3A1C" stroke-width="2"/><rect x="10" y="14" width="80" height="14" rx="3" fill="#E9C46A" stroke="#7A5B14" stroke-width="1.2"/>' + [0, 1, 2, 3, 4, 5, 6, 7].map(function (t) { return '<line x1="' + (16 + t * 10) + '" y1="16" x2="' + (16 + t * 10) + '" y2="' + (26 - t) + '" stroke="#7A5B14" stroke-width="2"/>'; }).join('') + '</svg>';
    var crank = this._btn('sr-crank', 'crank', this._t('aCrank'), '<svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true"><circle cx="20" cy="20" r="5" fill="#5A3A1C"/><line x1="20" y1="20" x2="34" y2="10" stroke="#5A3A1C" stroke-width="4" stroke-linecap="round"/><circle cx="34" cy="10" r="4.5" fill="#E9C46A" stroke="#5A3A1C" stroke-width="1.5"/></svg>');
    crank.disabled = st.done; crank.addEventListener('click', function () { self._check(); });
    boxEl.appendChild(crank); foot.appendChild(boxEl);
    var chk = this._btn('sr-check', 'check', null, esc(this._t('check'))); chk.disabled = st.done;
    chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.sr-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'sr-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'sr-note is-hint'; }
    else { note.textContent = ''; note.className = 'sr-note'; }
  },
  /* the punch key: a tap punches a round hole; hold it 450 ms and the hole grows into a long slot */
  _punchKey: function (i, px) {
    var self = this, st = this.st, k = this._btn('sr-punch', 'punch-' + i, this._t('aPunch'), '<span class="sr-punchgrow"></span>');
    k.style.width = k.style.height = px + 'px'; k.disabled = st.done;
    k.addEventListener('pointerdown', function (e) { if (e.button != null && e.button !== 0) return; e.preventDefault(); self._startHold(i, k); });
    k.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); self._punch(i, e.shiftKey ? 'long' : 'round'); } });
    return k;
  },
  _startHold: function (i, k) {
    var self = this, t0 = Date.now(), h = { i: i, el: k, t0: t0, long: false };
    this._endHold(); this._hold = h; k.classList.add('is-holding');
    h.timer = setTimeout(function () { if (self._hold !== h) return; h.long = true; k.classList.add('is-long'); self.api.sound(880); }, SoundRollCore.STRETCH_MS);
    var up = function () { window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); if (self._hold !== h) return; var ms = Date.now() - t0; self._endHold(); self._punch(i, SoundRollCore.holdToLen(ms)); };
    window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
  },
  _endHold: function () { var h = this._hold; if (!h) return; clearTimeout(h.timer); if (h.el) { h.el.classList.remove('is-holding'); h.el.classList.remove('is-long'); } this._hold = null; },
  _punch: function (i, len) {
    var r = SoundRollCore.punch(this.st, i, len);
    if (r === 'full') { this.api.sound(200); return; }
    if (r !== 'punched') return;
    this.api.sound(len === 'long' ? 520 : 760); this._clearHelp(); this._view.nudge = false;
    this._sr(this._t(len === 'long' ? 'aPunchedLong' : 'aPunchedRound'));
    this._paint();
  },
  /* a tap on a punched hole closes it */
  _wireHoles: function (roll, i) {
    var self = this, st = this.st;
    roll.addEventListener('click', function (e) {
      var h = e.target && e.target.closest ? e.target.closest('[data-h]') : null; if (!h || st.done) return;
      var j = +h.getAttribute('data-h');
      if (st.clue === 'los') { if (h.classList.contains('is-pre') || h.classList.contains('is-empty')) return; SoundRollCore.closeHole(st, i); }
      else SoundRollCore.closeHole(st, 0, j);
      self.api.sound(300); self._clearHelp(); self._paint();
    });
  },

  /* ---------------- Check: the box plays the roll ---------------- */
  _sr: function (s) { var el = this._qs('.sr-sr'); if (el) el.textContent = s; },
  /* play a roll's notes one after another: a plink for a round hole, a held plinnng (and the giraffe on tiptoe) for a slot */
  _play: function (lens, onNote, done) {
    var self = this, v = this._view, i = 0;
    if (this.FAST) { lens.forEach(function (l, k) { onNote(k); }); onNote(-1); v.tiptoe = false; done(); return; }
    var step = function () {
      if (i >= lens.length) { onNote(-1); v.tiptoe = false; v.nod = false; self._paint(); done(); return; }
      var l = lens[i]; onNote(i); v.nod = !v.nod; v.tiptoe = l === 'long'; self._paint();
      if (l === 'long') { [0, 90, 180, 270].forEach(function (d) { self._later(function () { self.api.sound(587); }, d); }); } else self.api.sound(784);
      i++; self._later(step, l === 'long' ? 520 : 240);
    };
    step();
  },
  _check: function () {
    var C = SoundRollCore, st = this.st, v = this._view, self = this;
    if (st.done || v.busy) return;
    if (st.clue === 'blend' && st.picked == null) {
      /* the crank plays the lettered roll even before a pick: each hole lights its letters */
      var m0 = C.master(st.loc, st.target).holes; v.busy = true;
      this._play(m0.map(function (h) { return h.len; }), function (k) { v.playing = k; }, function () { v.busy = false; var a0 = C.check(st); v.note = self._t(C.hint(st).key); void a0; self._paint(); self.api.announce(v.note); });
      return;
    }
    var a = C.check(st);
    if (a.result === 'tray') { this.api.sound(200); this._clearHelp(); v.note = this._t(C.hint(st).key); this._paint(); this.api.announce(v.note); return; }
    /* the box plays the child's roll (Long or short: every roll in turn), then shows the word's own roll */
    var lens = [], rolls = [];
    if (st.clue === 'los') st.words.forEach(function (id, i) { C.master(st.loc, id).holes.forEach(function (h, j) { lens.push(j === C.word(st.loc, id).v ? st.rolls[i] : 'round'); rolls.push(i); }); });
    else if (st.clue === 'count') st.holes.forEach(function (l) { lens.push(l); rolls.push(0); });
    else C.master(st.loc, st.target).holes.forEach(function (h) { lens.push(h.len); rolls.push(-2); });
    v.busy = true;
    this._play(lens, function (k) { if (st.clue === 'blend') v.playing = k; else v.playRoll = k >= 0 ? rolls[k] : -1; }, function () {
      v.busy = false; v.playRoll = -1; v.playing = -1;
      if (a.result === 'ok') { self._success(); return; }
      self.api.sound(220); v.master = st.clue !== 'blend'; if (st.clue === 'blend') v.wrongK = st.picked; v.note = self._t(C.hint(st).key, { name: '' });
      self._paint(); self.api.announce(v.note);
    });
  },
  _success: function () {
    var C = SoundRollCore, st = this.st, v = this._view, self = this;
    v.master = st.clue !== 'blend';
    if (st.clue === 'los') { var longs = C.compare(st).filter(function (c) { return c.want === 'long'; }).length; v.ok = this._t(longs === 3 ? 'okLos3L' : longs === 0 ? 'okLos3S' : 'okLosMix'); }
    else if (st.clue === 'count') { var w = C.word(st.loc, st.words[0]); v.ok = this._t('okCount', { word: w.display, n: w.boxes.length }); }
    else { var m = C.master(st.loc, st.target); v.ok = this._t('okBlend', { sounds: m.holes.map(function (h) { return h.g; }).join('–') + (m.ghost ? '(' + m.ghost + ')' : ''), word: C.word(st.loc, st.target).display }); }
    st.words.forEach(function (id) { self._book.push({ holes: C.master(st.loc, id).holes.map(function (h) { return { len: h.len }; }) }); });
    this.api.sound(988); this._paint(); this.api.announce(v.ok);
    this._advance(v.ok.length * 60 + 3600);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function f1(x) { return Math.round(x * 10) / 10; }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectSoundRollCSS() {
  if (typeof document === 'undefined' || document.getElementById('sr-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif";
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.sr-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:12px;user-select:none;-webkit-user-select:none;} .sr-wrap:focus{outline:none;} .sr-wrap.is-narrow{gap:8px;}'
  + '.sr-book{display:flex;gap:4px;min-height:30px;justify-content:center;flex-wrap:wrap;} .sr-card{line-height:0;border-radius:4px;box-shadow:0 1px 0 #C9B48F;} .sr-wrap.is-tiny .sr-book{display:none;}'
  + '.sr-stage{width:100%;display:flex;justify-content:center;} .sr-row3{display:flex;justify-content:center;align-items:flex-start;} .sr-col{display:flex;flex-direction:column;align-items:center;gap:6px;}'
  + '.sr-one{display:flex;flex-direction:column;align-items:center;gap:10px;} .sr-rollline{display:flex;align-items:center;gap:10px;}'
  + '.sr-pic{display:flex;align-items:center;justify-content:center;padding:0;border:3px solid #3A2E1F;border-radius:16px;background:#FFF8EC;cursor:pointer;} .sr-pic img{display:block;object-fit:contain;pointer-events:none;}'
  + '.sr-choice.is-sel{border-color:#F4CF62;box-shadow:0 0 0 4px #F4CF62;} .sr-choice.is-right{border-color:#1F8A78;box-shadow:0 0 0 4px #9FD9CC;} .sr-choice.is-wrong{border-color:#E0503C;}'
  + '.sr-roll{line-height:0;} .sr-roll.is-playing .sr-rollsvg{filter:drop-shadow(0 0 6px #F4CF62);} .sr-rollsvg{display:block;}'
  + '.sr-hole{fill:#3A2E1F;cursor:pointer;} .sr-hole.is-pre{fill:#B9A98A;cursor:default;} .sr-hole.is-master{fill:#5A4630;cursor:default;} .sr-hole.is-play{fill:#E9A23B;}'
  + '.sr-hole.is-gold{fill:#C9A54E;} .sr-hole.is-coral{fill:#E0503C;} .sr-mark{stroke:#146B5E;stroke-width:2;}'
  + '.sr-let{font-family:' + H + ';font-weight:800;font-size:15px;fill:#0E3B34;} .sr-ghost{fill:#8C7A5B;font-style:italic;}'
  + '.sr-punch{position:relative;border:0;border-radius:50%;background:#146B5E;box-shadow:0 4px 0 #0E3B34,inset 0 0 0 5px #E3F2EF;cursor:pointer;touch-action:none;overflow:hidden;} .sr-punch:disabled{opacity:.45;cursor:default;}'
  + '.sr-punchgrow{position:absolute;left:50%;top:50%;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:7px;background:#FFF8EC;transform-origin:7px 7px;} .sr-punch.is-holding .sr-punchgrow{animation:srGrow .45s linear forwards;} .sr-punch.is-long{background:#1F8A78;} @keyframes srGrow{to{width:34px;margin-left:-17px;}}'
  + '.sr-foot{display:flex;align-items:flex-end;justify-content:center;gap:16px;width:100%;}'
  + '.sr-box{position:relative;display:flex;align-items:flex-end;gap:4px;} .sr-giraffe{position:absolute;left:2px;bottom:40px;width:96px;height:96px;object-fit:contain;transition:transform .16s;} .sr-box.is-nod .sr-giraffe{transform:rotate(-8deg);} .sr-box.is-tiptoe .sr-giraffe{transform:translateY(-12px);} .sr-boxsvg{display:block;margin-top:92px;} .sr-wrap.is-narrow .sr-giraffe{width:64px;height:64px;left:18px;} .sr-wrap.is-narrow .sr-boxsvg{margin-top:60px;}'
  + '.sr-wrap.is-fast .sr-giraffe{transition:none;} .sr-wrap.is-done .sr-giraffe{transform:translateY(-12px) rotate(4deg);}'
  + '.sr-crank{min-width:48px;min-height:48px;border:2px solid #E2CFAE;border-radius:12px;background:#FFF8EC;cursor:pointer;} .sr-crank:disabled{opacity:.5;}'
  + '.sr-check{min-width:150px;min-height:54px;padding:8px 28px;border:0;border-radius:16px;background:#1F8A78;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;box-shadow:0 4px 0 #0E5A4D;cursor:pointer;} .sr-check:disabled{opacity:.5;cursor:default;}'
  + '.sr-note{margin:0;min-height:1.3em;max-width:560px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .sr-note.is-hint{color:#8A3B1F;} .sr-wrap.is-narrow .sr-note{font-size:17px;}'
  + '.sr-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.sr-wrap.is-tiny .sr-foot{gap:8px;} .sr-wrap.is-tiny .sr-boxsvg{width:72px;height:32px;} .sr-wrap.is-tiny .sr-check{min-width:112px;padding:8px 14px;font-size:20px;} .sr-wrap.is-tiny .sr-giraffe{width:52px;height:52px;left:10px;}'
  + '.sr-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'sr-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.SoundRollActivity = SoundRollActivity;
