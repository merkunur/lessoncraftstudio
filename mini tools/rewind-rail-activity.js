/* =====================================================================
   rewind-rail-activity.js — ACTIVITY #74 of the one-by-one rebuild:
   "Snippy's Letter Trace" → THE REWIND RAIL (L.K.1.a, 11 locales).
   Design sheet: docs/activities-rebuild/designs/074-snippy.md
   ---------------------------------------------------------------------
   THE INVENTION: the child's letter is recorded as it is written and plays
   back beside Snippy's. The library snail on the rail is the knob of both
   replays — drag it and the two letters un-write and re-write in step — and
   the rail fills with one colour band per stroke (yours on top, Snippy's
   below), so a wrong start, a stroke the other way or the strokes in
   another order can be SEEN. Steps per letter: guided → with the road →
   on my own (graded). Free play: tap a letter in the family strip and watch
   Snippy write it (not the letter being written on your own).

   ACTIVITY LAYER ONLY: the model is rewind-rail-core.js (it judges with
   stroke-trace-core.js and draws the glyphs of alphabet-trace-core.js /
   writing-carriage-core.js, all read-only); lcs-shell.js is untouched (the
   shell's Check is hidden and pressed by this activity on success).
   Test seams: window.RewindRailActivity.st / ._pool / ._order /
   ._ensurePool / .FAST / ._toClient(pad, pt) / ._railClient(u).
   ===================================================================== */
'use strict';

var RewindRailActivity = {
  id: 'rewind-rail',
  apparatusClasses: ['rr-'],

  strings: {
    title:        {en:'Snippy\'s Letter Trace',de:'Buchstaben schreiben mit Snippy',nl:'Letters schrijven met Snippy',da:'Skriv bogstaver med Snippy',sv:'Skriv bokstäver med Snippy',no:'Skriv bokstaver med Snippy',es:'Escribe letras con Snippy',it:'Scrivi le lettere con Snippy',pt:'Escreva as letras com o Snippy',fr:'Écris les lettres avec Snippy',fi:'Kirjoita kirjaimia Snippyn kanssa'},
    instrBubble:  {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:     {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    tGuided:      {en:'Start at dot 1 and follow the arrows.',de:'Fang bei Punkt 1 an und folge den Pfeilen.',nl:'Begin bij stip 1 en volg de pijlen.',da:'Start ved prik 1, og følg pilene.',sv:'Börja vid prick 1 och följ pilarna.',no:'Start ved prikk 1, og følg pilene.',es:'Empieza en el punto 1 y sigue las flechas.',it:'Parti dal puntino 1 e segui le frecce.',pt:'Comece no ponto 1 e siga as setas.',fr:'Commence au point 1 et suis les flèches.',fi:'Aloita pisteestä 1 ja seuraa nuolia.'},
    tCkpt:        {en:'Follow the road. Remember where to start.',de:'Fahr den Weg entlang. Denk daran, wo du anfängst.',nl:'Volg het pad. Weet je nog waar je begint?',da:'Følg vejen. Husk, hvor du skal starte.',sv:'Följ vägen. Kom ihåg var du ska börja.',no:'Følg veien. Husk hvor du skal starte.',es:'Sigue el camino. Recuerda dónde se empieza.',it:'Segui la strada. Ricorda da dove si parte.',pt:'Siga o caminho. Lembre onde começar.',fr:'Suis le chemin. Rappelle-toi où commencer.',fi:'Seuraa tietä. Muista, mistä aloitetaan.'},
    tOwn:         {en:'Now on your own: start at the right dot.',de:'Jetzt allein: Fang am richtigen Punkt an.',nl:'Nu zelf: begin bij de goede stip.',da:'Nu selv: Start ved den rigtige prik.',sv:'Nu själv: börja vid rätt prick.',no:'Nå selv: Start ved riktig prikk.',es:'Ahora tú solo: empieza en el punto correcto.',it:'Ora da solo: parti dal puntino giusto.',pt:'Agora sozinho: comece no ponto certo.',fr:'Maintenant tout seul : commence au bon point.',fi:'Nyt itse: aloita oikeasta pisteestä.'},
    check:        {en:'Check',de:'Prüfen',nl:'Controleren',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Revisar',it:'Controlla',pt:'Conferir',fr:'Vérifier',fi:'Tarkista'},
    hEmpty:       {en:'Start at a dot and write the letter. Then we play it back.',de:'Fang an einem Punkt an und schreib den Buchstaben. Dann spielen wir ihn ab.',nl:'Begin bij een stip en schrijf de letter. Daarna spelen we hem af.',da:'Start ved en prik, og skriv bogstavet. Så afspiller vi det.',sv:'Börja vid en prick och skriv bokstaven. Sedan spelar vi upp den.',no:'Start ved en prikk, og skriv bokstaven. Så spiller vi den av.',es:'Empieza en un punto y escribe la letra. Luego la volvemos a ver.',it:'Parti da un puntino e scrivi la lettera. Poi la riguardiamo.',pt:'Comece num ponto e escreva a letra. Depois vemos tudo de novo.',fr:'Commence à un point et écris la lettre. Ensuite, on la rejoue.',fi:'Aloita pisteestä ja kirjoita kirjain. Sitten katsotaan se uudestaan.'},
    hUnfinished:  {en:'Finish the letter on the road. Start at the green dot.',de:'Schreib den Buchstaben auf dem Weg fertig. Fang am grünen Punkt an.',nl:'Maak de letter op het pad af. Begin bij de groene stip.',da:'Skriv bogstavet færdigt på vejen. Start ved den grønne prik.',sv:'Skriv klart bokstaven på vägen. Börja vid den gröna pricken.',no:'Skriv ferdig bokstaven på veien. Start ved den grønne prikken.',es:'Termina la letra sobre el camino. Empieza en el punto verde.',it:'Finisci la lettera sulla strada. Parti dal puntino verde.',pt:'Termine a letra no caminho. Comece no ponto verde.',fr:'Finis la lettre sur le chemin. Commence au point vert.',fi:'Kirjoita kirjain loppuun tiellä. Aloita vihreästä pisteestä.'},
    hWrongEnd:    {en:'Start at the green dot and go along the road the right way.',de:'Fang am grünen Punkt an und fahr den Weg richtig herum entlang.',nl:'Begin bij de groene stip en volg het pad de goede kant op.',da:'Start ved den grønne prik, og følg vejen den rigtige vej.',sv:'Börja vid den gröna pricken och följ vägen åt rätt håll.',no:'Start ved den grønne prikken, og følg veien riktig vei.',es:'Empieza en el punto verde y sigue el camino en la dirección correcta.',it:'Parti dal puntino verde e segui la strada nel verso giusto.',pt:'Comece no ponto verde e siga o caminho na direção certa.',fr:'Commence au point vert et suis le chemin dans le bon sens.',fi:'Aloita vihreästä pisteestä ja kulje tietä oikeaan suuntaan.'},
    hStart:       {en:'Look where the two sparks begin. Start where Snippy starts.',de:'Schau, wo die beiden Funken anfangen. Fang da an, wo Snippy anfängt.',nl:'Kijk waar de twee vonkjes beginnen. Begin waar Snippy begint.',da:'Se, hvor de to gnister starter. Start der, hvor Snippy starter.',sv:'Titta var de två gnistorna börjar. Börja där Snippy börjar.',no:'Se hvor de to gnistene starter. Start der Snippy starter.',es:'Mira dónde empiezan las dos chispas. Empieza donde empieza Snippy.',it:'Guarda dove partono le due scintille. Parti da dove parte Snippy.',pt:'Veja onde as duas faíscas começam. Comece onde o Snippy começa.',fr:'Regarde où commencent les deux étincelles. Commence là où Snippy commence.',fi:'Katso, mistä kaksi kipinää lähtevät. Aloita siitä, mistä Snippy aloittaa.'},
    hDirection:   {en:'Your spark went the other way. Go the way Snippy goes.',de:'Dein Funke ist andersherum gefahren. Fahr so wie Snippy.',nl:'Jouw vonkje ging de andere kant op. Ga dezelfde kant op als Snippy.',da:'Din gnist løb den anden vej. Gå samme vej som Snippy.',sv:'Din gnista gick åt andra hållet. Gå samma väg som Snippy.',no:'Gnisten din gikk andre veien. Gå samme vei som Snippy.',es:'Tu chispa fue hacia el otro lado. Ve por donde va Snippy.',it:'La tua scintilla è andata dall’altra parte. Vai come va Snippy.',pt:'A sua faísca foi para o outro lado. Vá para onde o Snippy vai.',fr:'Ton étincelle est partie dans l’autre sens. Va dans le même sens que Snippy.',fi:'Kipinäsi kulki toiseen suuntaan. Kulje samaan suuntaan kuin Snippy.'},
    hOrder:       {en:'Snippy wrote the {c} line first. Look at the colours on the rail.',de:'Snippy hat zuerst die {c} Linie geschrieben. Schau dir die Farben auf der Schiene an.',nl:'Snippy schreef eerst de {c} lijn. Kijk naar de kleuren op de rails.',da:'Snippy skrev den {c} streg først. Se på farverne på skinnen.',sv:'Snippy skrev det {c} strecket först. Titta på färgerna på skenan.',no:'Snippy skrev den {c} streken først. Se på fargene på skinnen.',es:'Snippy hizo primero la línea {c}. Mira los colores del riel.',it:'Snippy ha fatto prima la linea {c}. Guarda i colori sul binario.',pt:'O Snippy fez primeiro a linha {c}. Veja as cores no trilho.',fr:'Snippy a d’abord tracé le trait {c}. Regarde les couleurs sur le rail.',fi:'Snippy kirjoitti ensin {c} viivan. Katso kiskon värejä.'},
    hShape:       {en:'One line is missing. Look at Snippy’s letter.',de:'Eine Linie fehlt. Schau dir Snippys Buchstaben an.',nl:'Er mist een lijn. Kijk naar de letter van Snippy.',da:'Der mangler en streg. Se på Snippys bogstav.',sv:'Ett streck saknas. Titta på Snippys bokstav.',no:'Det mangler en strek. Se på bokstaven til Snippy.',es:'Falta una línea. Mira la letra de Snippy.',it:'Manca una linea. Guarda la lettera di Snippy.',pt:'Falta uma linha. Veja a letra do Snippy.',fr:'Il manque un trait. Regarde la lettre de Snippy.',fi:'Yksi viiva puuttuu. Katso Snippyn kirjainta.'},
    hMiss2:       {en:'Follow the spark on the road, then try on your own again.',de:'Fahr dem Funken auf dem Weg nach, dann versuch es noch mal allein.',nl:'Volg het vonkje op het pad en probeer het dan weer zelf.',da:'Følg gnisten på vejen, og prøv så selv igen.',sv:'Följ gnistan på vägen och försök sedan själv igen.',no:'Følg gnisten på veien, og prøv så selv igjen.',es:'Sigue la chispa por el camino y luego vuelve a intentarlo tú solo.',it:'Segui la scintilla sulla strada, poi riprova da solo.',pt:'Siga a faísca no caminho e depois tente de novo sozinho.',fr:'Suis l’étincelle sur le chemin, puis réessaie tout seul.',fi:'Seuraa kipinää tiellä ja yritä sitten taas itse.'},
    nStroke:      {en:'Stroke done. The next one starts at the green dot.',de:'Strich fertig. Der nächste beginnt am grünen Punkt.',nl:'Deze haal is klaar. De volgende begint bij de groene stip.',da:'Stregen er færdig. Den næste starter ved den grønne prik.',sv:'Strecket är klart. Nästa börjar vid den gröna pricken.',no:'Streken er ferdig. Den neste starter ved den grønne prikken.',es:'Trazo terminado. El siguiente empieza en el punto verde.',it:'Tratto finito. Il prossimo parte dal puntino verde.',pt:'Traço pronto. O próximo começa no ponto verde.',fr:'Trait fini. Le suivant commence au point vert.',fi:'Veto valmis. Seuraava alkaa vihreästä pisteestä.'},
    nShow:        {en:'Watch your letter play back next to Snippy’s.',de:'Schau zu, wie dein Buchstabe neben Snippys noch mal entsteht.',nl:'Kijk hoe jouw letter naast die van Snippy opnieuw verschijnt.',da:'Se dit bogstav blive skrevet igen ved siden af Snippys.',sv:'Titta när din bokstav skrivs igen bredvid Snippys.',no:'Se bokstaven din bli skrevet igjen ved siden av Snippys.',es:'Mira cómo tu letra se vuelve a escribir junto a la de Snippy.',it:'Guarda la tua lettera che si riscrive accanto a quella di Snippy.',pt:'Veja a sua letra se escrever de novo ao lado da do Snippy.',fr:'Regarde ta lettre se réécrire à côté de celle de Snippy.',fi:'Katso, kun kirjaimesi kirjoittuu uudestaan Snippyn kirjaimen viereen.'},
    okLetter:     {en:'{g}: the right start, the right way, the right order. Just like Snippy!',de:'{g}: richtiger Anfang, richtige Richtung, richtige Reihenfolge. Genau wie Snippy!',nl:'{g}: goed begonnen, de goede kant op, in de goede volgorde. Net als Snippy!',da:'{g}: rigtig start, rigtig retning, rigtig rækkefølge. Ligesom Snippy!',sv:'{g}: rätt start, rätt håll, rätt ordning. Precis som Snippy!',no:'{g}: riktig start, riktig retning, riktig rekkefølge. Akkurat som Snippy!',es:'{g}: buen comienzo, buena dirección y buen orden. ¡Igual que Snippy!',it:'{g}: partenza giusta, verso giusto, ordine giusto. Proprio come Snippy!',pt:'{g}: começo certo, direção certa, ordem certa. Igualzinho ao Snippy!',fr:'{g} : bon départ, bon sens, bon ordre. Exactement comme Snippy !',fi:'{g}: oikea alku, oikea suunta, oikea järjestys. Ihan kuin Snippy!'},
    c0:           {en:'green',de:'grüne',nl:'groene',da:'grønne',sv:'gröna',no:'grønne',es:'verde',it:'verde',pt:'verde',fr:'vert',fi:'vihreän'},
    c1:           {en:'orange',de:'orange',nl:'oranje',da:'orange',sv:'orange',no:'oransje',es:'naranja',it:'arancione',pt:'laranja',fr:'orange',fi:'oranssin'},
    c2:           {en:'yellow',de:'gelbe',nl:'gele',da:'gule',sv:'gula',no:'gule',es:'amarilla',it:'gialla',pt:'amarela',fr:'jaune',fi:'keltaisen'},
    c3:           {en:'purple',de:'lila',nl:'paarse',da:'lilla',sv:'lila',no:'lilla',es:'morada',it:'viola',pt:'roxa',fr:'violet',fi:'violetin'},
    c4:           {en:'blue',de:'blaue',nl:'blauwe',da:'blå',sv:'blå',no:'blå',es:'azul',it:'blu',pt:'azul',fr:'bleu',fi:'sinisen'},
    c5:           {en:'pink',de:'rosa',nl:'roze',da:'lyserøde',sv:'rosa',no:'rosa',es:'rosa',it:'rosa',pt:'rosa',fr:'rose',fi:'vaaleanpunaisen'},
    setLetters:   {en:'Letters',de:'Buchstaben',nl:'Letters',da:'Bogstaver',sv:'Bokstäver',no:'Bokstaver',es:'Letras',it:'Lettere',pt:'Letras',fr:'Lettres',fi:'Kirjaimet'},
    s1:           {en:'Snippy’s letters',de:'Snippys Buchstaben',nl:'De letters van Snippy',da:'Snippys bogstaver',sv:'Snippys bokstäver',no:'Snippys bokstaver',es:'Las letras de Snippy',it:'Le lettere di Snippy',pt:'As letras do Snippy',fr:'Les lettres de Snippy',fi:'Snippyn kirjaimet'},
    s2:           {en:'Round and down',de:'Rund und runter',nl:'Rond en omlaag',da:'Runde og ned',sv:'Runda och neråt',no:'Runde og ned',es:'Redondas y hacia abajo',it:'Tonde e in giù',pt:'Redondas e para baixo',fr:'Rondes et descentes',fi:'Pyöreät ja alaspäin'},
    s3:           {en:'Bumps and slants',de:'Bögen und Schrägen',nl:'Boogjes en schuine lijnen',da:'Buer og skrå streger',sv:'Bågar och sneda streck',no:'Buer og skrå streker',es:'Puentes e inclinadas',it:'Ponti e linee oblique',pt:'Pontes e linhas inclinadas',fr:'Ponts et traits penchés',fi:'Kaaret ja vinot viivat'},
    s4:           {en:'Mirror twins and zigzags',de:'Spiegelzwillinge und Zickzack',nl:'Spiegeltweelingen en zigzag',da:'Spejltvillinger og zigzag',sv:'Spegeltvillingar och sicksack',no:'Speiltvillinger og sikksakk',es:'Gemelas de espejo y zigzag',it:'Gemelle allo specchio e zigzag',pt:'Letras espelhadas e zigue-zague',fr:'Lettres miroirs et zigzags',fi:'Peilikaksoset ja siksakit'},
    st:           {en:'Capitals: straight lines',de:'Großbuchstaben: gerade Linien',nl:'Hoofdletters: rechte lijnen',da:'Store bogstaver: lige streger',sv:'Stora bokstäver: raka streck',no:'Store bokstaver: rette streker',es:'Mayúsculas: líneas rectas',it:'Maiuscole: linee dritte',pt:'Maiúsculas: linhas retas',fr:'Majuscules : traits droits',fi:'Isot kirjaimet: suorat viivat'},
    sl:           {en:'Capitals: slanted lines',de:'Großbuchstaben: schräge Linien',nl:'Hoofdletters: schuine lijnen',da:'Store bogstaver: skrå streger',sv:'Stora bokstäver: sneda streck',no:'Store bokstaver: skrå streker',es:'Mayúsculas: líneas inclinadas',it:'Maiuscole: linee oblique',pt:'Maiúsculas: linhas inclinadas',fr:'Majuscules : traits penchés',fi:'Isot kirjaimet: vinot viivat'},
    cu:           {en:'Capitals: curves',de:'Großbuchstaben: Bögen',nl:'Hoofdletters: bochten',da:'Store bogstaver: buer',sv:'Stora bokstäver: bågar',no:'Store bokstaver: buer',es:'Mayúsculas: curvas',it:'Maiuscole: curve',pt:'Maiúsculas: curvas',fr:'Majuscules : courbes',fi:'Isot kirjaimet: kaaret'},
    bs:           {en:'Capitals: the right way round',de:'Großbuchstaben: richtig herum',nl:'Hoofdletters: niet omdraaien',da:'Store bogstaver: den rigtige vej',sv:'Stora bokstäver: rätt håll',no:'Store bokstaver: riktig vei',es:'Mayúsculas: sin voltearlas',it:'Maiuscole: dal verso giusto',pt:'Maiúsculas: sem espelhar',fr:'Majuscules : dans le bon sens',fi:'Isot kirjaimet: oikein päin'},
    setSteps:     {en:'Steps',de:'Schritte',nl:'Stappen',da:'Trin',sv:'Steg',no:'Steg',es:'Pasos',it:'Passaggi',pt:'Etapas',fr:'Étapes',fi:'Vaiheet'},
    pAll:         {en:'All three steps',de:'Alle drei Schritte',nl:'Alle drie de stappen',da:'Alle tre trin',sv:'Alla tre stegen',no:'Alle tre stegene',es:'Los tres pasos',it:'Tutti e tre i passaggi',pt:'As três etapas',fr:'Les trois étapes',fi:'Kaikki kolme vaihetta'},
    pP:           {en:'Road, then on my own',de:'Erst mit Weg, dann allein',nl:'Eerst met pad, dan zelf',da:'Først med vej, så selv',sv:'Först med väg, sedan själv',no:'Først med vei, så selv',es:'Con camino y luego solo',it:'Con la strada, poi da solo',pt:'Com caminho e depois sozinho',fr:'Avec le chemin, puis tout seul',fi:'Ensin tien kanssa, sitten itse'},
    pOwn:         {en:'On my own only',de:'Nur allein',nl:'Alleen zelf',da:'Kun selv',sv:'Bara själv',no:'Bare selv',es:'Yo solo',it:'Soltanto da solo',pt:'Somente sozinho',fr:'Tout seul uniquement',fi:'Vain itse'},
    tabYou:       {en:'Yours',de:'Deiner',nl:'Van jou',da:'Dit',sv:'Din',no:'Din',es:'La tuya',it:'La tua',pt:'A sua',fr:'La tienne',fi:'Sinun'},
    tabSnip:      {en:'Snippy’s',de:'Snippys',nl:'Van Snippy',da:'Snippys',sv:'Snippys',no:'Snippys',es:'La de Snippy',it:'Quella di Snippy',pt:'A do Snippy',fr:'Celle de Snippy',fi:'Snippyn'},
    tabBoth:      {en:'Both',de:'Beide',nl:'Allebei',da:'Begge',sv:'Båda',no:'Begge',es:'Las dos',it:'Tutte e due',pt:'As duas',fr:'Les deux',fi:'Molemmat'},
    ariaYou:      {en:'Your pad. Letter {g}.',de:'Deine Tafel. Buchstabe {g}.',nl:'Jouw blad. Letter {g}.',da:'Dit ark. Bogstavet {g}.',sv:'Ditt blad. Bokstaven {g}.',no:'Arket ditt. Bokstaven {g}.',es:'Tu hoja. Letra {g}.',it:'Il tuo foglio. Lettera {g}.',pt:'A sua folha. Letra {g}.',fr:'Ta feuille. Lettre {g}.',fi:'Sinun paperisi. Kirjain {g}.'},
    ariaSnip:     {en:'Snippy’s pad. Letter {g}.',de:'Snippys Tafel. Buchstabe {g}.',nl:'Het blad van Snippy. Letter {g}.',da:'Snippys ark. Bogstavet {g}.',sv:'Snippys blad. Bokstaven {g}.',no:'Arket til Snippy. Bokstaven {g}.',es:'La hoja de Snippy. Letra {g}.',it:'Il foglio di Snippy. Lettera {g}.',pt:'A folha do Snippy. Letra {g}.',fr:'La feuille de Snippy. Lettre {g}.',fi:'Snippyn paperi. Kirjain {g}.'},
    ariaRail:     {en:'Rewind rail: drag Snippy to rewind',de:'Spulschiene: Zieh Snippy, dann spult es zurück',nl:'Terugspoelrails: sleep Snippy om terug te spoelen',da:'Spol-tilbage-skinne: Træk Snippy for at spole tilbage',sv:'Spola-tillbaka-skena: dra Snippy för att spola tillbaka',no:'Spol-tilbake-skinne: Dra Snippy for å spole tilbake',es:'Riel para rebobinar: arrastra a Snippy para rebobinar',it:'Binario per riavvolgere: trascina Snippy per riavvolgere',pt:'Trilho de voltar: arraste o Snippy para voltar',fr:'Rail pour rembobiner : fais glisser Snippy pour revenir en arrière',fi:'Kelauskisko: vedä Snippyä, niin kelaat taaksepäin'},
    ariaStep:     {en:'Step {n} of {total}: {kind}',de:'Schritt {n} von {total}: {kind}',nl:'Stap {n} van {total}: {kind}',da:'Trin {n} af {total}: {kind}',sv:'Steg {n} av {total}: {kind}',no:'Steg {n} av {total}: {kind}',es:'Paso {n} de {total}: {kind}',it:'Passaggio {n} di {total}: {kind}',pt:'Etapa {n} de {total}: {kind}',fr:'Étape {n} sur {total} : {kind}',fi:'Vaihe {n}/{total}: {kind}'},
    kGuided:      {en:'with dots and arrows',de:'mit Punkten und Pfeilen',nl:'met stippen en pijlen',da:'med prikker og pile',sv:'med prickar och pilar',no:'med prikker og piler',es:'con puntos y flechas',it:'con puntini e frecce',pt:'com pontos e setas',fr:'avec les points et les flèches',fi:'pisteiden ja nuolten kanssa'},
    kCkpt:        {en:'with the road',de:'mit dem Weg',nl:'met het pad',da:'med vejen',sv:'med vägen',no:'med veien',es:'con el camino',it:'con la strada',pt:'com o caminho',fr:'avec le chemin',fi:'tien kanssa'},
    kOwn:         {en:'on my own',de:'allein',nl:'zelf',da:'selv',sv:'själv',no:'selv',es:'yo solo',it:'da solo',pt:'sozinho',fr:'tout seul',fi:'itse'},
    ariaErase:    {en:'Rub out',de:'Wegradieren',nl:'Uitgummen',da:'Visk ud',sv:'Sudda ut',no:'Visk ut',es:'Borrar',it:'Cancella',pt:'Apagar',fr:'Effacer',fi:'Pyyhi pois'},
    ariaTile:     {en:'Watch Snippy write {g}',de:'Schau zu, wie Snippy {g} schreibt',nl:'Kijk hoe Snippy de {g} schrijft',da:'Se Snippy skrive {g}',sv:'Titta när Snippy skriver {g}',no:'Se Snippy skrive {g}',es:'Mira cómo Snippy escribe la {g}',it:'Guarda Snippy che scrive la {g}',pt:'Veja o Snippy escrever o {g}',fr:'Regarde Snippy écrire le {g}',fi:'Katso, kun Snippy kirjoittaa kirjaimen {g}'}
  },

  defaults: { letters: 's1', steps: 'all' },
  settings: [
    { key: 'letters', type: 'choice', labelKey: 'setLetters', options: [{ value: 's1', labelKey: 's1' }, { value: 's2', labelKey: 's2' }, { value: 's3', labelKey: 's3' }, { value: 's4', labelKey: 's4' }, { value: 'st', labelKey: 'st' }, { value: 'sl', labelKey: 'sl' }, { value: 'cu', labelKey: 'cu' }, { value: 'bs', labelKey: 'bs' }] },
    { key: 'steps', type: 'choice', labelKey: 'setSteps', options: [{ value: 'all', labelKey: 'pAll' }, { value: 'p', labelKey: 'pP' }, { value: 'own', labelKey: 'pOwn' }] }
  ],

  OK_MS: 500, FAST: false, SPEED: 0.8,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._view = { mode: 'rest', u: 0 }; this._ptr = null; this._raf = null; this._tab = 'both';
    this._done = {}; this._pics = {};
    injectRewindCSS();
  },
  destroy: function () { this._clearTimers(); this._stopPlay(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this.st && this.st.r.kinds.join() !== RewindRailCore.round(this._loc(), this._set(), this.st.r.id, this._steps()).kinds.join()) { if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return RewindRailCore.locale(((this.api && this.api.lang) || 'en')); },
  _set: function () { return RewindRailCore.setOf(this._setting('letters')); },
  _steps: function () { return RewindRailCore.stepsOf(this._setting('steps')); },
  _key: function () { return this._loc() + '/' + this._set(); },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = RewindRailCore.letters(this._loc(), this._set()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  /* every pass (the first too) is an order-only reshuffle of the set; the id names the letter */
  nextTask: function (opts) {
    var C = RewindRailCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.map(function (i) { return pool[i]; });
      this._order = C.plan(this._loc(), this._set(), Math.random, prev).map(function (x) { return pool.indexOf(x); }); this._orderForPool = pool;
      this._pass = pass;
    }
    var id = pool[this._order[pos]], r = C.round(this._loc(), this._set(), id, this._steps());
    var pa = { msg: this._taskLine(r.kinds[0]) }; this._pa = pa;
    return {
      id: 'rewind.' + this._loc() + '.' + this._set() + '.' + id, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(id); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function (k) { return this._t(k === 'guided' ? 'tGuided' : k === 'ckpt' ? 'tCkpt' : 'tOwn'); },
  _start: function (id) {
    var C = RewindRailCore, r = C.round(this._loc(), this._set(), id, this._steps());
    this._clearTimers(); this._stopPlay(); this._busy = false; this._ptr = null; this._view = { mode: 'rest', u: 0 }; this._tab = 'both';
    this.st = C.newState(r);
    this._setTaskLine(r.kinds[0]);
    this._loadPics(r);
  },
  /* the library pictures: the round's word picture and the snail knob */
  _loadPics: function (r) {
    var self = this, need = ['insects and bugs'];
    if (r && r.word) need.push(r.word.theme);
    if (typeof LCSPictures === 'undefined') return;
    need.forEach(function (dir) {
      if (self._pics[dir]) return;
      LCSPictures.load(dir).then(function (th) { self._pics[dir] = th; if (self._wrap && self._wrap.isConnected && !self._ptr && !self._raf) self._paint(); }).catch(function () {});
    });
  },
  /* the word under the picture, with the round's letter marked where it stands */
  _wordParts: function (r) {
    if (!r.word) return null;
    var th = this._pics[r.word.theme]; if (!th) return null;
    var loc = this._loc(), w;
    try { w = LCSPictures.label(th, r.word.key, loc, { plural: false }); } catch (e) { return null; }
    if (r.level === 'lower' && loc !== 'de') w = w.toLocaleLowerCase(loc);
    var at = r.level === 'upper' || loc !== 'de' ? (w.charAt(0) === r.letter ? 0 : -1) : w.indexOf(r.letter, 1);
    if (at < 0) return null;
    return { pre: w.slice(0, at), mark: w.charAt(at), post: w.slice(at + 1), word: w, img: th.nouns[r.word.key] ? th : null };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = RewindRailCore; this.st = C.newState(C.round(this._loc(), this._set(), C.letters(this._loc(), this._set())[0], this._steps())); this._loadPics(this.st.r); }
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected || self._ptr || self._raf) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'rr-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    this._targetEl = api.el('div', 'rr-target'); wrap.appendChild(this._targetEl);
    this._tabsEl = api.el('div', 'rr-tabs'); wrap.appendChild(this._tabsEl);
    this._padsEl = api.el('div', 'rr-pads'); wrap.appendChild(this._padsEl);
    this._railEl = api.el('div', 'rr-rail'); wrap.appendChild(this._railEl);
    this._railEl.addEventListener('pointerdown', function (ev) { self._railDown(ev); });
    var note = api.el('p', 'rr-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    var row = api.el('div', 'rr-row'); wrap.appendChild(row);
    var er = api.el('button', 'rr-erase'); er.type = 'button'; er.setAttribute('data-k', 'erase');
    er.innerHTML = '<svg viewBox="0 0 40 40" aria-hidden="true"><g transform="rotate(-35 20 20)"><rect x="8" y="13" width="24" height="14" rx="3" fill="#F2A6C0" stroke="#2A2A35" stroke-width="2.4"/><rect x="8" y="13" width="9" height="14" rx="2" fill="#7FB3D5" stroke="#2A2A35" stroke-width="2.4"/></g><path d="M9 34 H31" stroke="#2A2A35" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 4"/></svg>';
    er.addEventListener('click', function () { self._erase(); }); this._eraseBtn = er; row.appendChild(er);
    var chk = api.el('button', 'rr-check'); chk.type = 'button'; chk.setAttribute('data-k', 'check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; row.appendChild(chk);
    this._stripEl = api.el('div', 'rr-strip'); wrap.appendChild(this._stripEl);
    wrap.addEventListener('keydown', function (ev) {
      if (ev.target && ev.target.tagName === 'BUTTON' && (ev.key === 'Enter' || ev.key === ' ')) return;
      if (ev.key === 'Enter') { ev.preventDefault(); self._check(); }
    });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx || this._wrap).focus(); }
  },
  _hasRec: function () { var v = this._view; return v.mode !== 'rest' && !!v.rec; },
  _paint_: function () {
    if (!this._padsEl) return;
    var C = RewindRailCore, st = this.st, L = this._L = C.layout(this._width()), v = this._view;
    this._wrap.className = 'rr-wrap is-' + L.mode + (L.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + v.mode;
    this._paintTarget();
    this._paintTabs();
    this._paintPads();
    this._paintRail();
    this._paintStrip();
    var h = C.hint(st), msg = '';
    if (v.msg) msg = v.msg;
    else if (h) { var kh = h === 'hMiss2' ? ({ start: 'hStart', direction: 'hDirection', order: 'hOrder', shape: 'hShape' })[st.last.kind] : h; msg = kh === 'hOrder' ? this._t('hOrder', { c: this._t('c' + (st.graded ? st.graded.model % 6 : 0)) }) : kh ? this._t(kh) : ''; if (h === 'hMiss2') msg = (msg ? msg + ' ' : '') + this._t('hMiss2'); }
    this._note.textContent = msg;
    this._note.className = 'rr-note' + (st.done ? ' is-ok' : (h && h !== 'hEmpty' ? ' is-hint' : ''));
    this._checkBtn.textContent = this._t('check'); this._checkBtn.disabled = !!this._busy || st.done || !!st.shown;
    this._eraseBtn.setAttribute('aria-label', this._t('ariaErase')); this._eraseBtn.disabled = !!this._busy || st.done || !!st.shown;
  },
  /* the target: the round's library picture, its word with the letter marked, and the letter in print */
  _paintTarget: function () {
    var st = this.st, r = st.r, L = this._L, v = this._view, el = this._targetEl, wp = this._wordParts(r);
    var show = v.mode === 'rest' || L.mode === 'narrow';
    var key = [r.id, this._loc(), wp ? wp.word : '-', L.mode, show].join('|');
    el.className = 'rr-target' + (show ? '' : ' is-off') + (v.mode === 'won' ? ' is-won' : '');
    if (this._targetKey === key && el.firstChild) return;
    this._targetKey = key; el.innerHTML = '';
    if (L.mode === 'wide') return;      /* on a wide card the target sits on Snippy's pad */
    this._fillTarget(el, wp, L.pic);
  },
  _fillTarget: function (el, wp, size) {
    var r = this.st.r, api = this.api;
    if (wp && typeof LCSPictures !== 'undefined') { var im = LCSPictures.img(wp.img, r.word.key, this._loc(), { size: size, plural: false }); im.className = 'rr-pic'; im.style.width = size + 'px'; im.style.height = size + 'px'; el.appendChild(im); }
    var col = api.el('div', 'rr-tcol');
    var big = api.el('span', 'rr-print'); big.textContent = r.letter; col.appendChild(big);
    if (wp) { var w = api.el('span', 'rr-word'); w.appendChild(document.createTextNode(wp.pre)); var m = api.el('b', 'rr-mark'); m.textContent = wp.mark; w.appendChild(m); w.appendChild(document.createTextNode(wp.post)); col.appendChild(w); }
    el.appendChild(col);
  },
  _paintTabs: function () {
    var self = this, L = this._L, el = this._tabsEl, on = L.mode === 'narrow' && this._hasRec();
    el.className = 'rr-tabs' + (on ? '' : ' is-off'); el.innerHTML = '';
    if (!on) return;
    [['you', 'tabYou'], ['snip', 'tabSnip'], ['both', 'tabBoth']].forEach(function (p) {
      var b = self.api.el('button', 'rr-tab' + (self._tab === p[0] ? ' is-on' : '')); b.type = 'button'; b.setAttribute('data-k', 'tab-' + p[0]); b.setAttribute('aria-pressed', self._tab === p[0] ? 'true' : 'false'); b.textContent = self._t(p[1]);
      b.addEventListener('click', function () { self._tab = p[0]; self._paint(); });
      el.appendChild(b);
    });
  },

  /* ---------------- the pads ---------------- */
  _vb: function () { var L = this._L, cx = 50; return { x0: cx - L.vbW / 2, y0: 2, w: L.vbW, h: 102 }; },
  _ruling: function (vb) {
    var rl = RewindRailCore.ruling(this._loc()), s = '', x0 = vb.x0, w = vb.w, lines = rl.zones.map(function (z) { return z.y; });
    if (lines.indexOf(44) >= 0 || rl.band) { s += '<rect class="rr-sky" x="' + x0 + '" y="14" width="' + w + '" height="30"/><rect class="rr-grass" x="' + x0 + '" y="44" width="' + w + '" height="40"/>'; }
    if (lines.indexOf(96) >= 0) s += '<rect class="rr-ground" x="' + x0 + '" y="84" width="' + w + '" height="12"/>';
    rl.zones.forEach(function (z) { s += '<line class="rr-rule is-' + z.tone + (z.kind === 'dashed' ? ' is-dashed' : '') + '" x1="' + x0 + '" x2="' + (x0 + w) + '" y1="' + z.y + '" y2="' + z.y + '"/>'; });
    return s;
  },
  _padSvg: function (which, inner, label) {
    var vb = this._vb(), L = this._L;
    return '<svg class="rr-svg" data-pad="' + which + '" viewBox="' + vb.x0.toFixed(2) + ' ' + vb.y0 + ' ' + vb.w.toFixed(2) + ' ' + vb.h + '" width="' + L.pw + '" height="' + L.ph + '" role="group" aria-label="' + esc(label) + '">' + this._ruling(vb) + inner + '</svg>';
  },
  _paintPads: function () {
    var L = this._L, st = this.st, v = this._view, self = this, el = this._padsEl, g = st.r.letter;
    var youInner = this._youLayer(), snipInner = this._snipLayer();
    var html = '';
    if (L.mode === 'wide') {
      html += '<div class="rr-padbox is-you">' + this._pipsHtml() + this._padSvg('you', youInner, this._t('ariaYou', { g: g })) + '</div>';
      html += '<div class="rr-padbox is-snip"><div class="rr-snipname" aria-hidden="true"></div>' + this._padSvg('snip', snipInner, this._t('ariaSnip', { g: g })) + '<div class="rr-onpad"></div></div>';
    } else {
      var t = this._hasRec() ? this._tab : 'you', inner = '';
      if (t !== 'you' && this._hasRec()) inner += '<g class="rr-snipghost">' + snipInner + '</g>';
      if (t !== 'snip' || !this._hasRec()) inner += youInner;
      html += '<div class="rr-padbox is-one">' + this._pipsHtml() + this._padSvg('one', inner, this._t('ariaYou', { g: g })) + '</div>';
    }
    el.innerHTML = html;
    if (L.mode === 'wide') { var on = el.querySelector('.rr-onpad'); if (v.mode === 'rest' || v.mode === 'won') this._fillTarget(on, this._wordParts(st.r), L.pic); on.className = 'rr-onpad' + (v.mode === 'rest' ? '' : v.mode === 'won' ? ' is-won' : ' is-off'); }
    this._youSvg = el.querySelector('svg[data-pad="you"]') || el.querySelector('svg[data-pad="one"]');
    this._youSvg.addEventListener('pointerdown', function (ev) { self._down(ev); });
  },
  _pipsHtml: function () {
    var st = this.st, n = st.kinds.length, k = Math.min(st.step, n - 1), s = '<div class="rr-pips" role="group" aria-label="' + esc(this._t('ariaStep', { n: k + 1, total: n, kind: this._t(st.kinds[k] === 'guided' ? 'kGuided' : st.kinds[k] === 'ckpt' ? 'kCkpt' : 'kOwn') })) + '">';
    for (var i = 0; i < n; i++) s += '<span class="rr-pip' + (i < st.step || st.done ? ' is-done' : i === st.step ? ' is-now' : '') + ' is-' + st.kinds[i] + '" data-pip="' + i + '"></span>';
    return s + '</div>';
  },
  /* what the child's pad shows: the live page (roads, dots, ink), or the replay of the recording */
  _youLayer: function () {
    var C = RewindRailCore, st = this.st, v = this._view, s = '', Ls = C.lanes(st.r.strokes);
    if (this._hasRec()) return this._replayLayer(v.rec, v.al, v.u, 'you');
    if (st.done) return s;
    C.roads(st).forEach(function (i) { var d = spline(st.r.strokes[i]); s += '<path class="rr-road" d="' + d + '"/><path class="rr-hair" d="' + d + '"/>'; });
    if (st.ghost && st.tr && !this._ptr) { var lane = st.tr.lanes[st.tr.idx]; if (lane) s += '<circle class="rr-gspark" r="3.6"><animateMotion dur="1.4s" repeatCount="indefinite" path="' + poly(lane.pts) + '"/></circle>'; }
    st.ink.forEach(function (stroke, i) { s += '<path class="rr-ink' + (stroke.pale ? ' is-pale' : '') + '" data-ink="' + i + '" d="' + poly(stroke.pts) + '"/>'; });
    if (!this._ptr) C.startDots(st).forEach(function (d) {
      s += '<circle class="rr-dothalo" cx="' + d.x + '" cy="' + d.y + '" r="6"/><circle class="rr-dot" cx="' + d.x + '" cy="' + d.y + '" r="3.8"/>';
      if (d.n) s += '<text class="rr-dotn" x="' + d.x + '" y="' + (d.y + 1.6) + '">' + d.n + '</text>';
      if (d.arrow) { var len = Math.sqrt(d.dx * d.dx + d.dy * d.dy) || 1, ux = d.dx / len, uy = d.dy / len, ax = d.x + ux * 7, ay = d.y + uy * 7; s += '<path class="rr-arrow" d="M' + (ax + ux * 6).toFixed(2) + ' ' + (ay + uy * 6).toFixed(2) + ' L' + (ax - uy * 3.4).toFixed(2) + ' ' + (ay + ux * 3.4).toFixed(2) + ' L' + (ax + uy * 3.4).toFixed(2) + ' ' + (ay - ux * 3.4).toFixed(2) + 'Z"/>'; }
    });
    return s;
  },
  _snipLayer: function () {
    var C = RewindRailCore, st = this.st, v = this._view;
    if (v.mode === 'demo') return this._replayLayer(C.modelPolys(v.demo.strokes), null, v.u, 'snip');
    if (!this._hasRec()) return st.done ? this._replayLayer(C.modelPolys(st.r.strokes), null, 1, 'snip') : '';
    return this._replayLayer(C.modelPolys(st.r.strokes), null, v.u, 'snip');
  },
  /* a replay at u: whole strokes in their colour, the current stroke thick to its spark; on a miss, rings mark the two starts */
  _replayLayer: function (polys, al, u, who) {
    var C = RewindRailCore, sc = C.scrub(polys, u), s = '', COL = C.DATA.COLORS, v = this._view;
    var colOf = function (i) { if (!al) return COL[i % COL.length]; var a = al[i]; return a && a.match >= 0 ? COL[a.match % COL.length] : '#8A8A96'; };
    sc.done.forEach(function (i) { s += '<path class="rr-rp" stroke="' + colOf(i) + '" d="' + poly(polys[i]) + '"/>'; });
    if (sc.cur !== null) s += '<path class="rr-rp is-cur" stroke="' + colOf(sc.cur) + '" d="' + poly(C.partial(polys[sc.cur], sc.frac)) + '"/>';
    if (v.mode === 'frozen' && v.g && v.g.kind === 'start') {
      var p = who === 'you' ? (polys[v.g.child] || [])[0] : (polys[v.g.model] || [])[0];
      if (p) s += '<circle class="rr-ring" cx="' + p.x + '" cy="' + p.y + '" r="8"/>';
    }
    if (sc.spark && u > 0 && u < 1) s += '<circle class="rr-spark is-' + who + '" cx="' + sc.spark.x.toFixed(2) + '" cy="' + sc.spark.y.toFixed(2) + '" r="3.2"/>';
    if (v.mode === 'frozen' && v.g && v.g.kind === 'direction' && sc.spark) s += '<circle class="rr-ring" cx="' + sc.spark.x.toFixed(2) + '" cy="' + sc.spark.y.toFixed(2) + '" r="7"/>';
    return s;
  },

  /* ---------------- the rail ---------------- */
  _paintRail: function () {
    var C = RewindRailCore, L = this._L, v = this._view, self = this, el = this._railEl, st = this.st;
    var W = L.W, k = L.knob, pad = Math.round(k * 0.42), tw = W - 2 * pad, top = k - 6, th = L.mode === 'wide' ? 14 : 12;
    var mb = this._hasRec() || v.mode === 'demo' ? C.bands(C.modelPolys(v.mode === 'demo' ? v.demo.strokes : st.r.strokes), null) : [];
    var yb = this._hasRec() ? C.bands(v.rec, v.al) : [];
    var s = '<svg class="rr-railsvg" viewBox="0 0 ' + W + ' ' + (top + th * 2 + 14) + '" width="' + W + '" height="' + (top + th * 2 + 14) + '" aria-hidden="true">';
    s += '<rect class="rr-bar" x="' + (pad - 8) + '" y="' + (top - 2) + '" width="' + (tw + 16) + '" height="' + (th * 2 + 8) + '" rx="' + (th * 0.7) + '"/>';
    var track = function (y, list, cls) {
      var o = '<rect class="rr-track" x="' + pad + '" y="' + y + '" width="' + tw + '" height="' + th + '" rx="3"/>';
      list.forEach(function (b) {
        var x = pad + b.u0 * tw, w = Math.max(2, (b.u1 - b.u0) * tw), fill = b.color || '#B8B8C2';
        o += '<rect class="rr-band ' + cls + (b.lost ? ' is-lost' : '') + '" x="' + x.toFixed(1) + '" y="' + y + '" width="' + w.toFixed(1) + '" height="' + th + '" rx="2.5" fill="' + fill + '"/>';
        if (b.reversed) for (var cx = x + 8; cx < x + w - 4; cx += 12) o += '<path class="rr-chev" d="M' + (cx + 3).toFixed(1) + ' ' + (y + 3) + ' L' + (cx - 2).toFixed(1) + ' ' + (y + th / 2) + ' L' + (cx + 3).toFixed(1) + ' ' + (y + th - 3) + '"/>';
      });
      return o;
    };
    s += track(top + 2, yb, 'is-you') + track(top + th + 4, mb, 'is-snip');
    if (v.mode === 'frozen' && v.g && !v.g.ok) { var fx = pad + v.u * tw; s += '<g class="rr-flag"><line x1="' + fx.toFixed(1) + '" x2="' + fx.toFixed(1) + '" y1="' + (top - 22) + '" y2="' + (top + th * 2 + 6) + '"/><path d="M' + fx.toFixed(1) + ' ' + (top - 22) + ' l14 5 l-14 5 Z"/></g>'; }
    s += '</svg>';
    var tl = this._hasRec() || v.mode === 'demo';
    el.className = 'rr-rail' + (tl ? ' is-live' : '') + (v.mode === 'won' ? ' is-won' : '');
    el.innerHTML = s;
    el.style.height = (top + th * 2 + 14) + 'px';
    var knob = this.api.el('div', 'rr-knob'); knob.setAttribute('role', 'slider'); knob.setAttribute('tabindex', '0'); knob.setAttribute('data-k', 'knob');
    knob.setAttribute('aria-label', this._t('ariaRail')); knob.setAttribute('aria-valuemin', '0'); knob.setAttribute('aria-valuemax', '100'); knob.setAttribute('aria-valuenow', String(Math.round((v.u || 0) * 100)));
    if (!tl) knob.setAttribute('aria-disabled', 'true');
    knob.style.width = k + 'px'; knob.style.height = k + 'px'; knob.style.left = (pad + (v.u || 0) * tw - k / 2) + 'px';
    var bug = this._pics['insects and bugs'];
    if (bug && typeof LCSPictures !== 'undefined') { var im = LCSPictures.img(bug, 'snail', this._loc(), { size: k, plural: false }); im.className = 'rr-snail'; im.style.width = k + 'px'; im.style.height = k + 'px'; knob.appendChild(im); }
    el.appendChild(knob);
    this._knob = knob; this._railGeom = { pad: pad, tw: tw };
    knob.addEventListener('keydown', function (ev) {
      if (!self._hasRec()) return;
      if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') { ev.preventDefault(); self._stopPlay(); self._view.u = Math.max(0, Math.min(1, (self._view.u || 0) + (ev.key === 'ArrowRight' ? 0.05 : -0.05))); if (self._view.mode === 'won') self._view.mode = 'scrub'; self._paintLive(); }
      else if (ev.key === ' ' || ev.key === 'Enter') { ev.preventDefault(); ev.stopPropagation(); if (self._raf) self._stopPlay(); else self._play(self._view.u >= 0.999 ? 0 : self._view.u, 1, null); }
    });
  },
  /* only the pads and the rail during a replay: no other node is touched */
  _paintLive: function () { this._paintPads(); this._paintRail(); },
  _railDown: function (ev) {
    if (!this._hasRec() || this._ptr || (ev.button !== undefined && ev.button !== 0)) return;
    ev.preventDefault();
    var self = this, el = this._railEl, onKnob = ev.target && ev.target.closest && ev.target.closest('.rr-knob'), sx = ev.clientX, moved = false;
    this._stopPlay();
    try { el.setPointerCapture(ev.pointerId); } catch (e) {}
    var at = function (cx) { var r = el.getBoundingClientRect(), g = self._railGeom; return Math.max(0, Math.min(1, (cx - r.left - g.pad) / g.tw)); };
    if (!onKnob) { this._view.u = at(ev.clientX); moved = true; if (this._view.mode === 'won') this._view.mode = 'scrub'; this._paintLive(); }
    var id = ev.pointerId;
    var mv = function (e) { if (e.pointerId !== id) return; if (Math.abs(e.clientX - sx) > 3) moved = true; if (!moved) return; self._view.u = at(e.clientX); if (self._view.mode === 'won') self._view.mode = 'scrub'; self._paintLive(); };
    var upf = function (e) {
      if (e.pointerId !== id) return;
      el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', upf); el.removeEventListener('pointercancel', upf);
      /* a tap on Snippy (no drag) plays from where he stands */
      if (onKnob && !moved) self._play(self._view.u >= 0.999 ? 0 : self._view.u, 1, null);
    };
    el.addEventListener('pointermove', mv); el.addEventListener('pointerup', upf); el.addEventListener('pointercancel', upf);
  },
  /* the family strip: the set's letters; a done one is filled; on a wide card a tap shows Snippy writing it */
  _paintStrip: function () {
    var self = this, L = this._L, st = this.st, el = this._stripEl, list = RewindRailCore.letters(this._loc(), this._set());
    el.innerHTML = ''; el.className = 'rr-strip is-' + L.mode;
    list.forEach(function (ch) {
      var cur = ch === st.r.letter, done = !!self._done[self._loc() + ch];
      if (L.mode === 'wide') {
        var b = self.api.el('button', 'rr-tile' + (done ? ' is-done' : '') + (cur ? ' is-cur' : '')); b.type = 'button'; b.textContent = ch; b.setAttribute('data-k', 'tile-' + ch);
        b.setAttribute('aria-label', self._t('ariaTile', { g: ch }));
        /* the letter being written on your own is not shown: that would give its start and order away */
        if ((cur && !st.done && RewindRailCore.kind(st) === 'own') || st.shown) b.disabled = true;
        b.addEventListener('click', function () { self._demo(ch); });
        el.appendChild(b);
      } else { var sp = self.api.el('span', 'rr-tile is-mini' + (done ? ' is-done' : '') + (cur ? ' is-cur' : '')); sp.textContent = ch; sp.setAttribute('aria-hidden', 'true'); el.appendChild(sp); }
    });
  },

  /* ---------------- the hand ---------------- */
  _glyphPt: function (ev) {
    var svg = this._youSvg, m = svg && svg.getScreenCTM(); if (!m) return null;
    var p = svg.createSVGPoint(); p.x = ev.clientX; p.y = ev.clientY; p = p.matrixTransform(m.inverse());
    return { x: p.x, y: p.y };
  },
  /* test seams: a glyph-unit point on a pad → client coordinates; a rail position → client coordinates */
  _toClient: function (pad, pt) {
    var svg = this._padsEl && (this._padsEl.querySelector('svg[data-pad="' + (pad || 'you') + '"]') || this._padsEl.querySelector('svg[data-pad="one"]'));
    var m = svg && svg.getScreenCTM(); if (!m) return null;
    var p = svg.createSVGPoint(); p.x = pt.x; p.y = pt.y; p = p.matrixTransform(m);
    return { x: p.x, y: p.y };
  },
  _railClient: function (u) { var r = this._railEl.getBoundingClientRect(), g = this._railGeom; return { x: r.left + g.pad + u * g.tw, y: r.top + this._L.knob / 2 }; },
  _down: function (ev) {
    var st = this.st;
    if (this._busy || st.done || st.shown || (ev.button !== undefined && ev.button !== 0) || this._ptr) return;
    var pt = this._glyphPt(ev); if (!pt) return;
    ev.preventDefault();
    var self = this, C = RewindRailCore, svg = this._youSvg;
    this._stopPlay();
    /* writing again puts the replay away: the pad is the page again */
    if (this._view.mode !== 'rest') { this._view = { mode: 'rest', u: 0 }; this._wrap.classList.remove('is-frozen', 'is-replay', 'is-scrub', 'is-demo'); }
    try { svg.setPointerCapture(ev.pointerId); } catch (e) {}
    C.down(st, pt);
    this._ptr = ev.pointerId;
    /* no repaint while the finger is down (a repaint would replace the svg under the finger): drop the dots, add this stroke's ink */
    [].forEach.call(svg.querySelectorAll('.rr-dot,.rr-dothalo,.rr-dotn,.rr-arrow'), function (n) { n.parentNode.removeChild(n); });
    /* the page again, in place (the svg under the finger is kept): ruling, roads, the ink that stays */
    var keep = st.ink.slice(0, -1); st.cleared = false;
    svg.innerHTML = this._ruling(this._vb()) + keep.map(function (k) { return '<path class="rr-ink' + (k.pale ? ' is-pale' : '') + '" d="' + poly(k.pts) + '"/>'; }).join('') + C.roads(st).map(function (i) { var d = spline(st.r.strokes[i]); return '<path class="rr-road" d="' + d + '"/><path class="rr-hair" d="' + d + '"/>'; }).join('');
    this._note.textContent = ''; this._note.className = 'rr-note';
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path'); path.setAttribute('class', 'rr-ink'); path.setAttribute('d', poly(st.cur.pts));
    svg.appendChild(path);
    var onMove = function (e) {
      if (e.pointerId !== self._ptr) return;
      var evs = (e.getCoalescedEvents && e.getCoalescedEvents()) || [e]; if (!evs.length) evs = [e];
      for (var i = 0; i < evs.length; i++) { var q = self._glyphPt(evs[i]); if (q) C.move(st, q); }
      if (path && st.cur) path.setAttribute('d', poly(st.cur.pts));
    };
    var onUp = function (e) {
      if (e.pointerId !== self._ptr) return;
      svg.removeEventListener('pointermove', onMove); svg.removeEventListener('pointerup', onUp); svg.removeEventListener('pointercancel', onUp);
      self._ptr = null;
      self._lift(C.up(st));
    };
    svg.addEventListener('pointermove', onMove); svg.addEventListener('pointerup', onUp); svg.addEventListener('pointercancel', onUp);
  },
  _lift: function (res) {
    var self = this, st = this.st;
    if (!res) { this._paint(); return; }
    if (res.res === 'incomplete') {
      this._paint();
      if (st.ink.some(function (s) { return s.pale; })) this._later(function () { st.ink = st.ink.filter(function (s) { return !s.pale; }); if (self.st === st && !self._ptr && self._view.mode === 'rest') self._paint(); }, 1100);   /* the fade is seen, so it keeps real time */
      return;
    }
    if (res.res === 'recorded') { this._paint(); return; }
    if (res.res === 'stroke') { this.api.sound(587); this._paint(); this.api.announce(this._t('nStroke')); return; }
    /* a guided / road letter is formed: the rewind shows it, then the next step */
    var C = RewindRailCore, rec = st.shown.rec, al = C.align(st.r.strokes, rec);
    this.api.sound(660);
    this._view = { mode: 'replay', u: 0, rec: rec, al: al, msg: this._t('nShow') };
    this._busy = true; this._paint(); this.api.announce(this._t('nShow'));
    this._play(0, 1, function () {
      self._later(function () {
        self._busy = false; C.advance(st); self._view = { mode: 'rest', u: 0 };
        if (st.done) return self._win();
        self._setTaskLine(C.kind(st)); self._paint();
      }, self._ms(700));
    });
  },
  _setTaskLine: function (k) {
    var msg = this._taskLine(k); if (this._pa) this._pa.msg = msg;
    var el = document.querySelector('.lcs-activity-prompt-text'); if (el) el.textContent = msg;
  },
  _erase: function () { if (this._busy || this.st.done || this.st.shown) return; this._stopPlay(); if (RewindRailCore.erase(this.st)) { this.api.sound(260); this._view = { mode: 'rest', u: 0 }; this._paint(); } },
  _check: function () {
    var st = this.st, C = RewindRailCore, self = this;
    if (this._busy || st.done || st.shown || this._ptr) return;
    this._stopPlay();
    var res = C.check(st);
    if (!res.graded) { this.api.sound(460); this._view = { mode: 'rest', u: 0 }; this._paint(); this.api.announce(this._note.textContent || ''); return; }
    var g = res.graded, rec = g.rec, al = g.al;
    /* the rewind always plays: to the end on a right letter, to the first disagreement on a miss */
    this._view = { mode: 'replay', u: 0, rec: rec, al: al, g: g };
    this._busy = true; this.api.sound(res.ok ? 880 : 300);
    if (res.back) this._setTaskLine('ckpt');
    this._paint();
    this._play(0, g.stop, function () {
      self._busy = false;
      if (res.ok) return self._win();
      self._view.mode = 'frozen'; self._view.u = g.stop;
      self._paint();
      self.api.announce(self._note.textContent || '');
    });
  },
  /* the replay: u from a to b at the replay speed (a 1.6–3 s rewind), only the pads and the rail repaint */
  _play: function (a, b, done) {
    var self = this, C = RewindRailCore, v = this._view;
    this._stopPlay();
    var polys = v.mode === 'demo' ? C.modelPolys(v.demo.strokes) : (v.rec || []);
    var len = C.timeline(polys.length ? polys : [[{ x: 0, y: 0 }, { x: 1, y: 0 }]]).total;
    var dur = Math.max(1600, Math.min(3000, len * 9 / this.SPEED)) * Math.max(0.15, b - a);
    if (this.FAST || b <= a) { v.u = b; this._paintLive(); if (done) done(); return; }
    var t0 = null;
    if (v.mode === 'frozen' || v.mode === 'won') v.mode = 'scrub';
    var tick = function (ts) {
      if (t0 === null) t0 = ts;
      var f = Math.min(1, (ts - t0) / dur);
      v.u = a + (b - a) * f; self._paintLive();
      if (f < 1) self._raf = requestAnimationFrame(tick);
      else { self._raf = null; if (done) done(); }
    };
    this._raf = requestAnimationFrame(tick);
  },
  _stopPlay: function () { if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; } },
  /* free play: Snippy writes a letter of the family on his pad (never graded) */
  _demo: function (ch) {
    var st = this.st, self = this;
    if (this._busy || this._ptr || st.shown) return;
    if (ch === st.r.letter && !st.done && RewindRailCore.kind(st) === 'own') return;
    var g = RewindRailCore.Carriage.glyph(ch); if (!g) return;
    this._view = { mode: 'demo', u: 0, demo: { letter: ch, strokes: g } };
    this._paint();
    this._play(0, 1, function () { self._later(function () { if (self._view.mode === 'demo') { self._view = { mode: 'rest', u: 0 }; self._paint(); } }, self._ms(900)); });
  },
  _win: function () {
    var self = this, st = this.st, pa = this._pa || {}, msg = this._t('okLetter', { g: st.r.letter });
    this._done[this._loc() + st.r.letter] = true;
    var v = this._view; v.mode = 'won'; v.u = 1; v.msg = msg; pa.msg = msg;
    this.api.sound(1046); this._later(function () { self.api.sound(1318); }, this._ms(140));
    this._paint(); this.api.announce(msg);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

/* Catmull-Rom → cubic Bézier through every point (the road; the same curve the tracer flattens) */
function spline(pts) {
  if (!pts || !pts.length) return '';
  if (pts.length < 3) return 'M ' + pts.map(function (p) { return p.x + ' ' + p.y; }).join(' L ');
  var d = 'M ' + pts[0].x + ' ' + pts[0].y;
  for (var k = 0; k < pts.length - 1; k++) {
    var p0 = pts[k - 1] || pts[k], p1 = pts[k], p2 = pts[k + 1], p3 = pts[k + 2] || p2;
    d += ' C ' + (p1.x + (p2.x - p0.x) / 6).toFixed(2) + ' ' + (p1.y + (p2.y - p0.y) / 6).toFixed(2) + ' ' + (p2.x - (p3.x - p1.x) / 6).toFixed(2) + ' ' + (p2.y - (p3.y - p1.y) / 6).toFixed(2) + ' ' + p2.x + ' ' + p2.y;
  }
  return d;
}
function poly(pts) { if (!pts || !pts.length) return ''; var d = 'M' + pts[0].x.toFixed(1) + ' ' + pts[0].y.toFixed(1); for (var i = 1; i < pts.length; i++) d += ' L' + pts[i].x.toFixed(1) + ' ' + pts[i].y.toFixed(1); if (pts.length === 1) d += ' l0.01 0'; return d; }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

var rrCssDone = false;
function injectRewindCSS() {
  if (rrCssDone || typeof document === 'undefined') return;
  rrCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.rr-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;}'
  + '.rr-wrap:focus{outline:none;}'
  /* the target (phone: above the pad; wide: on Snippy's pad) */
  + '.rr-target{display:flex;align-items:center;justify-content:center;gap:12px;min-height:64px;} .rr-target.is-off{display:none;} .rr-wrap.is-wide .rr-target{display:none;}'
  + '.rr-pic{display:block;object-fit:contain;}'
  + '.rr-tcol{display:flex;flex-direction:column;align-items:center;line-height:1;}'
  + '.rr-print{font-family:' + H + ';font-weight:700;font-size:56px;line-height:1;color:#146B5E;}'
  + '.rr-word{font-family:' + B + ';font-weight:700;font-size:20px;color:#2A2A35;margin-top:2px;} .rr-mark{font-weight:900;color:#FFFFFF;background:#146B5E;border-radius:6px;padding:0 3px;margin:0 1px;}'
  + '.rr-onpad{position:absolute;left:0;right:0;top:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;pointer-events:none;transition:opacity .3s;} .rr-onpad.is-off{opacity:0;}'
  + '.rr-onpad.is-won{opacity:1;align-items:flex-end;justify-content:flex-start;padding:6px 8px;animation:rrSlide .5s ease-out;} .rr-onpad.is-won .rr-pic{width:96px !important;height:96px !important;} .rr-onpad.is-won .rr-print{display:none;}'
  + '@keyframes rrSlide{from{transform:translateY(16px);opacity:0;}to{transform:none;opacity:1;}}'
  + '.rr-onpad .rr-tcol{flex-direction:row;gap:12px;align-items:baseline;padding:2px 12px 4px;border-radius:14px;background:rgba(255,254,251,.92);box-shadow:0 1px 0 #E6DCC6;}'
  /* the pads */
  + '.rr-pads{display:flex;justify-content:center;gap:14px;width:100%;}'
  + '.rr-padbox{position:relative;border-radius:14px;background:#FFFEFB;box-shadow:inset 0 0 0 2px #D9CDB4,0 3px 0 #E6DCC6;padding-top:0;}'
  + '.rr-padbox.is-snip{background:#F4FAF8;}'
  + '.rr-svg{display:block;touch-action:none;}'
  + '.rr-padbox.is-you .rr-svg,.rr-padbox.is-one .rr-svg{cursor:crosshair;}'
  + '.rr-sky{fill:#E9F3FB;} .rr-grass{fill:#EEF7EA;} .rr-ground{fill:#F6EFE6;}'
  + '.rr-rule{stroke:#146B5E;vector-effect:non-scaling-stroke;} .rr-rule.is-faint{stroke:#A9C9C1;stroke-width:1px;} .rr-rule.is-mid{stroke:#6FA597;stroke-width:1.5px;} .rr-rule.is-strong{stroke:#146B5E;stroke-width:2.4px;} .rr-rule.is-dashed{stroke-dasharray:6 5;}'
  + '.rr-road{fill:none;stroke:rgba(20,107,94,.26);stroke-width:7;stroke-linecap:round;stroke-linejoin:round;}'
  + '.rr-hair{fill:none;stroke:rgba(20,107,94,.8);stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round;}'
  + '.rr-ink{fill:none;stroke:#2A2A35;stroke-width:4.6;stroke-linecap:round;stroke-linejoin:round;}'
  + '.rr-ink.is-pale{stroke-width:2.2;opacity:.45;animation:rrFade 1s ease-in forwards;} @keyframes rrFade{to{opacity:0;}}'
  + '.rr-dothalo{fill:rgba(47,165,106,.22);} .rr-dot{fill:#2FA56A;stroke:#FFFFFF;stroke-width:1;} .rr-arrow{fill:#2FA56A;}'
  + '.rr-dotn{font-family:' + H + ';font-weight:800;font-size:5.2px;fill:#FFFFFF;text-anchor:middle;dominant-baseline:middle;pointer-events:none;}'
  + '.rr-gspark{fill:#FFD23F;stroke:#E8833A;stroke-width:1.1;}'
  + '.rr-rp{fill:none;stroke-width:4.6;stroke-linecap:round;stroke-linejoin:round;} .rr-rp.is-cur{stroke-width:6.4;}'
  + '.rr-snipghost{opacity:.6;}'
  + '.rr-spark{stroke:#FFFFFF;stroke-width:1.2;} .rr-spark.is-you{fill:#F2784B;} .rr-spark.is-snip{fill:#146B5E;}'
  + '.rr-ring{fill:none;stroke:#C64A22;stroke-width:1.6;stroke-dasharray:3 2;}'
  + '.rr-wrap.is-won .rr-padbox{box-shadow:inset 0 0 0 3px #2FA56A,0 0 0 4px rgba(47,165,106,.25),0 3px 0 #E6DCC6;transition:box-shadow .4s;}'
  /* the step pips */
  + '.rr-pips{position:absolute;left:10px;top:8px;display:flex;gap:6px;z-index:1;pointer-events:none;}'
  + '.rr-pip{width:12px;height:12px;border-radius:50%;background:#FFFFFF;box-shadow:inset 0 0 0 2px #146B5E;} .rr-pip.is-now{background:#146B5E;} .rr-pip.is-done{background:#2FA56A;box-shadow:inset 0 0 0 2px #2FA56A;}'
  /* the tabs (phone) */
  + '.rr-tabs{display:flex;gap:6px;} .rr-tabs.is-off{display:none;}'
  + '.rr-tab{min-height:44px;padding:0 14px;border:0;border-radius:22px;background:#FFF8EC;color:#2A2A35;font-family:' + B + ';font-weight:800;font-size:16px;box-shadow:inset 0 0 0 2px #D9CDB4;cursor:pointer;} .rr-tab.is-on{background:#146B5E;color:#FFFFFF;box-shadow:none;}'
  /* the rail */
  + '.rr-rail{position:relative;width:100%;touch-action:none;}'
  + '.rr-railsvg{position:absolute;left:0;top:0;display:block;overflow:visible;}'
  + '.rr-bar{fill:#D8B25A;stroke:#8C6A26;stroke-width:1.2;}'
  + '.rr-track{fill:#FBF3E4;stroke:#B48C3E;stroke-width:1;}'
  + '.rr-chev{fill:none;stroke:#FFFFFF;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;}'
  + '.rr-band.is-lost{opacity:.7;}'
  + '.rr-flag line{stroke:#C64A22;stroke-width:2;} .rr-flag path{fill:#C64A22;} .rr-flag{animation:rrPop .3s ease-out;} @keyframes rrPop{from{opacity:0;transform:translateY(-6px);}to{opacity:1;transform:none;}}'
  + '.rr-knob{position:absolute;top:0;display:flex;align-items:flex-end;justify-content:center;cursor:grab;outline:none;} .rr-knob:focus-visible{outline:3px solid #146B5E;outline-offset:2px;border-radius:12px;}'
  + '.rr-rail:not(.is-live) .rr-knob{cursor:default;}'
  + '.rr-snail{display:block;object-fit:contain;pointer-events:none;filter:drop-shadow(0 2px 0 rgba(0,0,0,.12));}'
  + '.rr-rail.is-won .rr-snail{animation:rrHop .6s ease-out;} @keyframes rrHop{40%{transform:translateY(-8px);}100%{transform:none;}}'
  /* the controls and the bubble */
  + '.rr-row{display:flex;align-items:center;justify-content:center;gap:14px;}'
  + '.rr-erase{width:52px;height:52px;padding:4px;border:0;border-radius:14px;background:#FFF8EC;box-shadow:inset 0 0 0 2.5px #2A2A35,0 3px 0 #D8C9A6;cursor:pointer;} .rr-erase svg{width:100%;height:100%;display:block;} .rr-erase:disabled{opacity:.45;cursor:default;}'
  + '.rr-check{min-height:52px;min-width:120px;padding:0 26px;border:0;border-radius:26px;background:#146B5E;color:#FFFFFF;font-family:' + B + ';font-weight:800;font-size:20px;box-shadow:0 4px 0 #0C4A41;cursor:pointer;} .rr-check:disabled{opacity:.5;cursor:default;}'
  + '.rr-erase:focus-visible,.rr-check:focus-visible,.rr-tile:focus-visible,.rr-tab:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
  + '.rr-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;}'
  + '.rr-note.is-hint{color:#B5461F;} .rr-note.is-ok{color:#146B5E;}'
  /* the family strip */
  + '.rr-strip{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;}'
  + '.rr-tile{min-width:44px;height:44px;padding:0 6px;border:0;border-radius:12px;background:#FFF8EC;color:#146B5E;font-family:' + H + ';font-weight:700;font-size:24px;line-height:1;box-shadow:inset 0 0 0 2px #D9CDB4;cursor:pointer;} .rr-tile.is-done{background:#146B5E;color:#FFFFFF;box-shadow:none;} .rr-tile.is-cur{box-shadow:inset 0 0 0 3px #F2784B;} .rr-tile:disabled{cursor:default;opacity:.55;}'
  + '.rr-tile.is-mini{min-width:24px;height:26px;padding:0 3px;font-size:17px;border-radius:7px;display:inline-flex;align-items:center;justify-content:center;cursor:default;}'
  + '.rr-wrap.is-narrow .rr-note{font-size:17px;} .rr-wrap.is-narrow .rr-check{font-size:18px;min-width:104px;}'
  + '.rr-wrap.is-narrow .rr-print{font-size:44px;} .rr-wrap.is-narrow .rr-word{font-size:18px;}'
  + '@media print{.rr-row,.rr-note,.rr-rail,.rr-strip,.rr-tabs{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.rr-wrap *{animation-duration:.2s !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'rr-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.RewindRailActivity = RewindRailActivity;
