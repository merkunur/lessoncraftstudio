/* =====================================================================
   word-elastic-activity.js — ACTIVITY #58 of the one-by-one rebuild:
   "Build the CVC Word" → THE WORD ELASTIC (RF.K.3, 11 locales).
   Design sheet: docs/activities-rebuild/designs/058-cvc-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: the word is an elastic between a peg and a knob. Pull
   the knob and one bead pops out per sound; put one letter on each bead;
   let go (Check, or pull the knob back) and the band snaps — the beads
   clack into the word, and a bead with the wrong sound for its place is
   kicked up out of the line. Seven Clues (letter beads · first sound given
   · one sound missing · word bank · write it · stretch it yourself · blend
   and find) × two Words settings (3 sounds / letter teams).

   ACTIVITY LAYER ONLY: the model is word-elastic-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.WordElasticActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var WordElasticActivity = {
  id: 'word-elastic',
  apparatusClasses: ['wel-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:        {en:'The Word Elastic',de:'Das Wortgummi',nl:'Het woordelastiek',da:'Ordelastikken',sv:'Ordgummit',no:'Ordstrikken',es:'La liga de las palabras',it:'L’elastico delle parole',pt:'O elástico das palavras',fr:'L’élastique à mots',fi:'Sanakuminauha'},
    instruction:  {en:'Stretch the word, put one letter on each bead, then let go.',de:'Zieh das Wort auseinander, leg auf jede Perle einen Buchstaben und lass dann los.',nl:'Rek het woord uit, leg op elke kraal een letter en laat dan los.',da:'Stræk ordet ud, læg et bogstav på hver perle, og slip så.',sv:'Sträck ut ordet, lägg en bokstav på varje pärla och släpp sedan.',no:'Strekk ut ordet, legg en bokstav på hver perle, og slipp så.',es:'Estira la palabra, pon una letra en cada cuenta y luego suelta.',it:'Allunga la parola, metti una lettera su ogni perlina e poi lascia andare.',pt:'Estique a palavra, coloque uma letra em cada conta e depois solte.',fr:'Étire le mot, mets une lettre sur chaque perle, puis lâche.',fi:'Venytä sanaa, laita jokaiseen helmeen yksi kirjain ja päästä sitten irti.'},
    check:        {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kolla',no:'Sjekk',es:'Revisar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    pBeads:       {en:'Stretch the word and give each sound its letter.',de:'Zieh das Wort auseinander und gib jedem Laut seinen Buchstaben.',nl:'Rek het woord uit en geef elke klank zijn letter.',da:'Stræk ordet ud, og giv hver lyd sit bogstav.',sv:'Sträck ut ordet och ge varje ljud sin bokstav.',no:'Strekk ut ordet og gi hver lyd sin bokstav.',es:'Estira la palabra y dale a cada sonido su letra.',it:'Allunga la parola e dai a ogni suono la sua lettera.',pt:'Estique a palavra e dê a cada som a sua letra.',fr:'Étire le mot et donne à chaque son sa lettre.',fi:'Venytä sanaa ja anna jokaiselle äänteelle sen kirjain.'},
    pBank:        {en:'Find the word in the bank, then build it on the elastic.',de:'Finde das Wort in der Wörterliste und bau es dann auf dem Gummi.',nl:'Zoek het woord in de woordenlijst en bouw het dan op het elastiek.',da:'Find ordet i ordlisten, og byg det så på elastikken.',sv:'Hitta ordet i ordlistan och bygg det sedan på gummit.',no:'Finn ordet i ordlisten, og bygg det så på strikken.',es:'Busca la palabra en la lista y luego fórmala en la liga.',it:'Trova la parola nell’elenco, poi costruiscila sull’elastico.',pt:'Encontre a palavra na lista e depois monte-a no elástico.',fr:'Trouve le mot dans la liste, puis construis-le sur l’élastique.',fi:'Etsi sana listasta ja rakenna se sitten kuminauhaan.'},
    pWrite:       {en:'Type one letter for each sound.',de:'Tippe für jeden Laut einen Buchstaben.',nl:'Typ voor elke klank een letter.',da:'Skriv ét bogstav for hver lyd.',sv:'Skriv en bokstav för varje ljud.',no:'Skriv én bokstav for hver lyd.',es:'Escribe una letra por cada sonido.',it:'Scrivi una lettera per ogni suono.',pt:'Digite uma letra para cada som.',fr:'Tape une lettre pour chaque son.',fi:'Kirjoita jokaista äännettä kohti yksi kirjain.'},
    pStretch:     {en:'Pull out one bead for each sound you hear, then type the letters.',de:'Zieh für jeden Laut, den du hörst, eine Perle heraus und tippe dann die Buchstaben.',nl:'Trek voor elke klank die je hoort een kraal uit en typ dan de letters.',da:'Træk en perle ud for hver lyd, du hører, og skriv så bogstaverne.',sv:'Dra ut en pärla för varje ljud du hör och skriv sedan bokstäverna.',no:'Trekk ut én perle for hver lyd du hører, og skriv så bokstavene.',es:'Saca una cuenta por cada sonido que oyes y luego escribe las letras.',it:'Tira fuori una perlina per ogni suono che senti, poi scrivi le lettere.',pt:'Puxe uma conta para cada som que você ouve e depois digite as letras.',fr:'Sors une perle pour chaque son que tu entends, puis tape les lettres.',fi:'Vedä esiin yksi helmi jokaista kuulemaasi äännettä kohti ja kirjoita sitten kirjaimet.'},
    pLong:        {en:'Pull out one bead for each sound you hear, then give each bead its letter.',de:'Zieh für jeden Laut, den du hörst, eine Perle heraus und gib jeder Perle ihren Buchstaben.',nl:'Trek voor elke klank die je hoort een kraal uit en geef elke kraal zijn letter.',da:'Træk en perle ud for hver lyd, du hører, og giv hver perle sit bogstav.',sv:'Dra ut en pärla för varje ljud du hör och ge varje pärla sin bokstav.',no:'Trekk ut én perle for hver lyd du hører, og gi hver perle sin bokstav.',es:'Saca una cuenta por cada sonido que oyes y dale a cada cuenta su letra.',it:'Tira fuori una perlina per ogni suono che senti e dai a ogni perlina la sua lettera.',pt:'Puxe uma conta para cada som que você ouve e dê a cada conta a sua letra.',fr:'Sors une perle pour chaque son que tu entends, puis donne à chaque perle sa lettre.',fi:'Venytä sanaa: pitkä äänne saa kaksi helmeä. Anna jokaiselle helmelle sen kirjain.'},
    pBlend:       {en:'Close the elastic slowly and read the word. Which picture is it?',de:'Schieb das Gummi langsam zusammen und lies das Wort. Welches Bild ist es?',nl:'Laat het elastiek langzaam los en lees het woord. Welk plaatje is het?',da:'Lad elastikken langsomt gå sammen, og læs ordet. Hvilket billede er det?',sv:'Låt gummit sakta dra ihop sig och läs ordet. Vilken bild är det?',no:'La strikken trekke seg sakte sammen, og les ordet. Hvilket bilde er det?',es:'Cierra la liga despacio y lee la palabra. ¿Qué dibujo es?',it:'Chiudi piano l’elastico e leggi la parola. Qual è il disegno?',pt:'Feche o elástico devagar e leia a palavra. Qual é a figura?',fr:'Referme doucement l’élastique et lis le mot. Quelle image est-ce ?',fi:'Anna kuminauhan vetäytyä hitaasti kokoon ja lue sana. Mikä kuva se on?'},
    hintEmpty:    {en:'Every bead needs one sound. Say the picture’s name slowly.',de:'Jede Perle braucht einen Laut. Sprich den Namen des Bildes langsam.',nl:'Elke kraal heeft één klank nodig. Zeg de naam van het plaatje langzaam.',da:'Hver perle skal have én lyd. Sig billedets navn langsomt.',sv:'Varje pärla behöver ett ljud. Säg bildens namn långsamt.',no:'Hver perle trenger én lyd. Si navnet på bildet sakte.',es:'Cada cuenta necesita un sonido. Di despacio el nombre del dibujo.',it:'Ogni perlina ha bisogno di un suono. Di’ piano il nome del disegno.',pt:'Cada conta precisa de um som. Diga devagar o nome da figura.',fr:'Chaque perle a besoin d’un son. Dis lentement le nom de l’image.',fi:'Jokainen helmi tarvitsee yhden äänteen. Sano kuvan nimi hitaasti.'},
    hintPull:     {en:'Pull the knob to stretch the word.',de:'Zieh am Knopf, um das Wort auseinanderzuziehen.',nl:'Trek aan de knop om het woord uit te rekken.',da:'Træk i knoppen for at strække ordet ud.',sv:'Dra i knoppen för att sträcka ut ordet.',no:'Dra i knotten for å strekke ut ordet.',es:'Jala la perilla para estirar la palabra.',it:'Tira il pomello per allungare la parola.',pt:'Puxe o puxador para esticar a palavra.',fr:'Tire le bouton pour étirer le mot.',fi:'Vedä nupista, niin sana venyy.'},
    hintWrong:    {en:'A bead was kicked out: its letter does not belong in that place. Say the word slowly and listen for each sound.',de:'Eine Perle ist herausgesprungen: Ihr Buchstabe passt nicht an diese Stelle. Sprich das Wort langsam und hör auf jeden Laut.',nl:'Er is een kraal uit de rij gesprongen: die letter hoort niet op die plek. Zeg het woord langzaam en luister naar elke klank.',da:'En perle røg ud: Dens bogstav er ikke lyden på den plads. Sig ordet langsomt, og lyt efter hver lyd.',sv:'En pärla åkte ut: dess bokstav hör inte hemma på den platsen. Säg ordet långsamt och lyssna efter varje ljud.',no:'En perle ble sparket ut: bokstaven hører ikke hjemme på den plassen. Si ordet sakte og lytt etter hver lyd.',es:'Una cuenta salió disparada: su letra no es el sonido de ese lugar. Di la palabra despacio y escucha cada sonido.',it:'Una perlina è saltata fuori: la sua lettera non è il suono di quel posto. Di’ piano la parola e ascolta ogni suono.',pt:'Uma conta pulou fora: a letra dela não é o som daquele lugar. Diga a palavra devagar e escute cada som.',fr:'Une perle a sauté : sa lettre ne fait pas le son qu’on entend à cet endroit. Dis le mot lentement et écoute chaque son.',fi:'Helmi lensi pois rivistä: sen kirjain ei ole sen kohdan äänne. Sano sana hitaasti ja kuuntele jokainen äänne.'},
    hintOrder:    {en:'All the right letters, but not in the right places. Say the word from the first sound to the last.',de:'Das sind die richtigen Buchstaben, aber nicht an den richtigen Stellen. Sprich das Wort vom ersten bis zum letzten Laut.',nl:'Allemaal goede letters, maar niet op de goede plek. Zeg het woord van de eerste tot de laatste klank.',da:'Alle de rigtige bogstaver, men ikke på de rigtige pladser. Sig ordet fra første til sidste lyd.',sv:'Alla rätt bokstäver, men inte på rätt plats. Säg ordet från första till sista ljudet.',no:'Alle de riktige bokstavene, men ikke på riktig plass. Si ordet fra første til siste lyd.',es:'Todas son las letras correctas, pero no en su lugar. Di la palabra del primer sonido al último.',it:'Sono le lettere giuste, ma non al posto giusto. Di’ la parola dal primo all’ultimo suono.',pt:'São as letras certas, mas não no lugar certo. Diga a palavra do primeiro ao último som.',fr:'Ce sont les bonnes lettres, mais pas à la bonne place. Dis le mot du premier au dernier son.',fi:'Kirjaimet ovat oikeat, mutta eivät oikeilla paikoilla. Sano sana ensimmäisestä äänteestä viimeiseen.'},
    hintFirstSound:  {en:'Listen for the first sound.',de:'Hör auf den ersten Laut.',nl:'Luister naar de eerste klank.',da:'Lyt efter den første lyd.',sv:'Lyssna efter det första ljudet.',no:'Lytt etter den første lyden.',es:'Escucha el primer sonido.',it:'Ascolta il primo suono.',pt:'Escute o primeiro som.',fr:'Écoute le premier son.',fi:'Kuuntele ensimmäistä äännettä.'},
    hintMiddleSound: {en:'Listen for the middle sound.',de:'Hör auf den Laut in der Mitte.',nl:'Luister naar de middelste klank.',da:'Lyt efter lyden i midten.',sv:'Lyssna efter ljudet i mitten.',no:'Lytt etter lyden i midten.',es:'Escucha el sonido de en medio.',it:'Ascolta il suono in mezzo.',pt:'Escute o som do meio.',fr:'Écoute le son du milieu.',fi:'Kuuntele keskellä olevaa äännettä.'},
    hintLastSound:   {en:'Listen for the last sound.',de:'Hör auf den letzten Laut.',nl:'Luister naar de laatste klank.',da:'Lyt efter den sidste lyd.',sv:'Lyssna efter det sista ljudet.',no:'Lytt etter den siste lyden.',es:'Escucha el último sonido.',it:'Ascolta l’ultimo suono.',pt:'Escute o último som.',fr:'Écoute le dernier son.',fi:'Kuuntele viimeistä äännettä.'},
    hintTeam:     {en:'Two letters can make one sound. They share one bead.',de:'Zwei Buchstaben können einen Laut machen. Sie teilen sich eine Perle.',nl:'Twee letters kunnen samen één klank maken. Ze delen één kraal.',da:'To bogstaver kan lave én lyd. De deler én perle.',sv:'Två bokstäver kan göra ett ljud. De delar på en pärla.',no:'To bokstaver kan lage én lyd. De deler én perle.',es:'Dos letras pueden hacer un solo sonido. Comparten una cuenta.',it:'Due lettere possono fare un solo suono, anche quando sono doppie. Stanno su una perlina sola.',pt:'Duas letras podem fazer um só som. Elas dividem uma conta.',fr:'Deux lettres peuvent faire un seul son. Elles partagent une perle.',fi:'Pitkä äänne kirjoitetaan kahdella kirjaimella. Kumpikin kirjain saa oman helmen.'},
    hintTooMany:  {en:'One bead too many: the word has fewer sounds. Say it slowly and let one bead go.',de:'Eine Perle zu viel: Das Wort hat weniger Laute. Sprich es langsam und lass eine Perle zurückschnappen.',nl:'Eén kraal te veel: het woord heeft minder klanken. Zeg het langzaam en laat er één kraal terugschieten.',da:'Én perle for meget: Ordet har færre lyde. Sig det langsomt, og lad en perle smutte tilbage.',sv:'En pärla för mycket: ordet har färre ljud. Säg det långsamt och släpp tillbaka en pärla.',no:'Én perle for mye: ordet har færre lyder. Si det sakte og slipp en perle tilbake.',es:'Sobra una cuenta: la palabra tiene menos sonidos. Dila despacio y regresa una cuenta.',it:'C’è una perlina di troppo: la parola ha meno suoni. Dilla piano e rimettine dentro una.',pt:'Sobrou uma conta: a palavra tem menos sons. Diga devagar e devolva uma conta.',fr:'Une perle de trop : le mot a moins de sons. Dis-le lentement et rentre une perle.',fi:'Yksi helmi liikaa: sanassa on vähemmän äänteitä. Sano se hitaasti ja päästä yksi helmi takaisin.'},
    hintTooFew:   {en:'A sound is missing here. Pull out one more bead.',de:'Hier fehlt ein Laut. Zieh noch eine Perle heraus.',nl:'Hier mist een klank. Trek nog een kraal uit.',da:'Her mangler en lyd. Træk en perle mere ud.',sv:'Här saknas ett ljud. Dra ut en pärla till.',no:'Her mangler en lyd. Trekk ut én perle til.',es:'Aquí falta un sonido. Saca una cuenta más.',it:'Qui manca un suono. Tira fuori un’altra perlina.',pt:'Aqui falta um som. Puxe mais uma conta.',fr:'Il manque un son ici. Sors une perle de plus.',fi:'Tästä puuttuu äänne. Vedä esiin yksi helmi lisää.'},
    hintPick:     {en:'Tap the picture that shows the word.',de:'Tippe auf das Bild, das zum Wort passt.',nl:'Tik op het plaatje dat bij het woord hoort.',da:'Tryk på det billede, der passer til ordet.',sv:'Tryck på bilden som visar ordet.',no:'Trykk på bildet som viser ordet.',es:'Toca el dibujo que muestra la palabra.',it:'Tocca il disegno che mostra la parola.',pt:'Toque na figura que mostra a palavra.',fr:'Touche l’image qui montre le mot.',fi:'Napauta kuvaa, joka näyttää sanan.'},
    hintBlend:    {en:'Close the elastic slowly and say each sound, then look again.',de:'Schieb das Gummi langsam zusammen, sprich jeden Laut und schau noch einmal.',nl:'Laat het elastiek langzaam los, zeg elke klank en kijk nog eens.',da:'Lad elastikken langsomt gå sammen, sig hver lyd, og kig igen.',sv:'Låt gummit sakta dra ihop sig, säg varje ljud och titta igen.',no:'La strikken trekke seg sakte sammen, si hver lyd og se en gang til.',es:'Cierra la liga despacio, di cada sonido y vuelve a mirar.',it:'Chiudi piano l’elastico, di’ ogni suono e guarda di nuovo.',pt:'Feche o elástico devagar, diga cada som e olhe de novo.',fr:'Referme doucement l’élastique, dis chaque son et regarde encore.',fi:'Anna kuminauhan vetäytyä hitaasti kokoon, sano jokainen äänne ja katso uudelleen.'},
    hintBlendHelp:{en:'Read the beads one by one: {sounds}.',de:'Lies die Perlen eine nach der anderen: {sounds}.',nl:'Lees de kralen één voor één: {sounds}.',da:'Læs perlerne én ad gangen: {sounds}.',sv:'Läs pärlorna en i taget: {sounds}.',no:'Les perlene én etter én: {sounds}.',es:'Lee las cuentas una por una: {sounds}.',it:'Leggi le perline una alla volta: {sounds}.',pt:'Leia as contas uma de cada vez: {sounds}.',fr:'Lis les perles une par une : {sounds}.',fi:'Lue helmet yksi kerrallaan: {sounds}.'},
    ok:           {en:'{sounds} … {word}! You stretched it and snapped it back together.',de:'{sounds} … {word}! Du hast es auseinandergezogen und wieder zusammenschnappen lassen.',nl:'{sounds} … {word}! Je hebt het uitgerekt en weer laten terugspringen.',da:'{sounds} … {word}! Du strakte det ud og lod det smække sammen igen.',sv:'{sounds} … {word}! Du sträckte ut det och lät det smälla ihop igen.',no:'{sounds} … {word}! Du strakk det ut og lot det smekke sammen igjen.',es:'{sounds} … ¡{word}! La estiraste y la juntaste otra vez.',it:'{sounds} … {word}! L’hai allungata e poi riunita di colpo.',pt:'{sounds} … {word}! Você esticou e juntou de novo.',fr:'{sounds} … {word} ! Tu l’as étiré, puis tu l’as fait claquer.',fi:'{sounds} … {word}! Venytit sanan ja päästit sen napsahtamaan takaisin yhteen.'},
    okBlend:      {en:'{sounds} makes {word}!',de:'{sounds} – das ist {word}!',nl:'{sounds} wordt {word}!',da:'{sounds} bliver til {word}!',sv:'{sounds} blir {word}!',no:'{sounds} blir {word}!',es:'¡{sounds} forma {word}!',it:'{sounds} fa {word}!',pt:'{sounds} forma {word}!',fr:'{sounds}, ça fait {word} !',fi:'{sounds} – siitä tulee {word}!'},
    setClue:      {en:'Clue',de:'Hilfe',nl:'Hulp',da:'Hjælp',sv:'Ledtråd',no:'Hjelp',es:'Pista',it:'Aiuto',pt:'Pista',fr:'Indice',fi:'Vihje'},
    cBeads:       {en:'Letter beads',de:'Buchstabenperlen',nl:'Letterkralen',da:'Bogstavperler',sv:'Bokstavspärlor',no:'Bokstavperler',es:'Cuentas con letras',it:'Perline con lettere',pt:'Contas com letras',fr:'Perles à lettres',fi:'Kirjainhelmet'},
    cFirst:       {en:'First sound given',de:'Erster Laut vorgegeben',nl:'Eerste klank staat er al',da:'Første lyd er givet',sv:'Första ljudet är givet',no:'Første lyd er gitt',es:'El primer sonido ya está',it:'Primo suono già dato',pt:'O primeiro som já está',fr:'Premier son donné',fi:'Ensimmäinen äänne valmiina'},
    cMissing:     {en:'One sound missing',de:'Ein Laut fehlt',nl:'Eén klank ontbreekt',da:'Én lyd mangler',sv:'Ett ljud saknas',no:'Én lyd mangler',es:'Falta un sonido',it:'Manca un suono',pt:'Falta um som',fr:'Un son manque',fi:'Yksi äänne puuttuu'},
    cBank:        {en:'Word bank',de:'Wörterliste',nl:'Woordenlijst',da:'Ordliste',sv:'Ordlista',no:'Ordliste',es:'Lista de palabras',it:'Elenco di parole',pt:'Lista de palavras',fr:'Liste de mots',fi:'Sanalista'},
    cWrite:       {en:'Write it',de:'Selbst schreiben',nl:'Zelf schrijven',da:'Skriv selv',sv:'Skriv själv',no:'Skriv selv',es:'Escríbela',it:'Scrivila tu',pt:'Escreva você',fr:'Écris-le',fi:'Kirjoita itse'},
    cStretch:     {en:'Stretch it yourself',de:'Selbst auseinanderziehen',nl:'Zelf uitrekken',da:'Stræk selv',sv:'Sträck själv',no:'Strekk selv',es:'Estírala tú',it:'Allungala tu',pt:'Estique você',fr:'Étire-le toi-même',fi:'Venytä itse'},
    cBlend:       {en:'Blend and find',de:'Zusammenziehen und finden',nl:'Samenvoegen en vinden',da:'Træk sammen og find',sv:'Dra ihop och hitta',no:'Trekk sammen og finn',es:'Junta y encuentra',it:'Unisci e trova',pt:'Junte e encontre',fr:'Fusionne et trouve',fi:'Yhdistä ja etsi'},
    setWords:     {en:'Words',de:'Wörter',nl:'Woorden',da:'Ord',sv:'Ord',no:'Ord',es:'Palabras',it:'Parole',pt:'Palavras',fr:'Mots',fi:'Sanat'},
    wSimple:      {en:'3 sounds',de:'3 Laute',nl:'3 klanken',da:'3 lyde',sv:'3 ljud',no:'3 lyder',es:'Palabras cortas',it:'Parole corte',pt:'Palavras curtas',fr:'Sons simples',fi:'Lyhyet äänteet'},
    wTeams:       {en:'Letter teams',de:'Buchstabengruppen',nl:'Tweetekenklanken',da:'Bogstavgrupper',sv:'Två bokstäver – ett ljud',no:'To bokstaver – én lyd',es:'Dígrafos',it:'Doppie e digrammi',pt:'Dígrafos',fr:'Sons complexes et lettres muettes',fi:'Pitkät äänteet'},
    ariaSay:      {en:'Say the word',de:'Wort anhören',nl:'Woord laten horen',da:'Hør ordet',sv:'Hör ordet',no:'Hør ordet',es:'Escuchar la palabra',it:'Ascolta la parola',pt:'Ouvir a palavra',fr:'Écouter le mot',fi:'Kuuntele sana'},
    ariaKnob:     {en:'Elastic: {n} beads',de:'Gummi: {n} Perlen',nl:'Elastiek: {n} kralen',da:'Elastik: {n} perler',sv:'Gummi: {n} pärlor',no:'Strikk: {n} perler',es:'Liga: {n} cuentas',it:'Elastico: {n} perline',pt:'Elástico: {n} contas',fr:'Élastique : {n} perles',fi:'Kuminauha: {n} helmeä'},
    ariaBead:     {en:'Bead {n} of {total}: {letter}',de:'Perle {n} von {total}: {letter}',nl:'Kraal {n} van {total}: {letter}',da:'Perle {n} af {total}: {letter}',sv:'Pärla {n} av {total}: {letter}',no:'Perle {n} av {total}: {letter}',es:'Cuenta {n} de {total}: {letter}',it:'Perlina {n} di {total}: {letter}',pt:'Conta {n} de {total}: {letter}',fr:'Perle {n} sur {total} : {letter}',fi:'Helmi {n}/{total}: {letter}'},
    ariaEmpty:    {en:'Bead {n} of {total}: empty',de:'Perle {n} von {total}: leer',nl:'Kraal {n} van {total}: leeg',da:'Perle {n} af {total}: tom',sv:'Pärla {n} av {total}: tom',no:'Perle {n} av {total}: tom',es:'Cuenta {n} de {total}: vacía',it:'Perlina {n} di {total}: vuota',pt:'Conta {n} de {total}: vazia',fr:'Perle {n} sur {total} : vide',fi:'Helmi {n}/{total}: tyhjä'},
    ariaTile:     {en:'Letter {letter}',de:'Buchstabe {letter}',nl:'Letter {letter}',da:'Bogstav {letter}',sv:'Bokstav {letter}',no:'Bokstav {letter}',es:'Letra {letter}',it:'Lettera {letter}',pt:'Letra {letter}',fr:'Lettre {letter}',fi:'Kirjain {letter}'},
    ariaBack:     {en:'Delete',de:'Löschen',nl:'Wissen',da:'Slet',sv:'Radera',no:'Slett',es:'Borrar',it:'Cancella',pt:'Apagar',fr:'Effacer',fi:'Poista'},
    ariaChoice:   {en:'Picture {n} of 3',de:'Bild {n} von 3',nl:'Plaatje {n} van 3',da:'Billede {n} af 3',sv:'Bild {n} av 3',no:'Bilde {n} av 3',es:'Dibujo {n} de 3',it:'Disegno {n} di 3',pt:'Figura {n} de 3',fr:'Image {n} sur 3',fi:'Kuva {n}/3'},
    ariaShelf:    {en:'Words built: {list}',de:'Gebaute Wörter: {list}',nl:'Gebouwde woorden: {list}',da:'Byggede ord: {list}',sv:'Byggda ord: {list}',no:'Bygde ord: {list}',es:'Palabras formadas: {list}',it:'Parole costruite: {list}',pt:'Palavras montadas: {list}',fr:'Mots construits : {list}',fi:'Rakennetut sanat: {list}'}
    /*STRINGS-END*/
  },

  defaults: { clue: 'beads', words: 'simple' },
  settings: [
    { key: 'clue', type: 'choice', labelKey: 'setClue', options: [{ value: 'beads', labelKey: 'cBeads' }, { value: 'first', labelKey: 'cFirst' }, { value: 'missing', labelKey: 'cMissing' }, { value: 'bank', labelKey: 'cBank' }, { value: 'write', labelKey: 'cWrite' }, { value: 'stretch', labelKey: 'cStretch' }, { value: 'blend', labelKey: 'cBlend' }] },
    { key: 'words', type: 'choice', labelKey: 'setWords', options: [{ value: 'simple', labelKey: 'wSimple' }, { value: 'teams', labelKey: 'wTeams' }] }
  ],

  OK_MS: 500, FAST: false, SHELF: 9,
  CLUE_KEY: { beads: 'cBeads', first: 'cFirst', missing: 'cMissing', bank: 'cBank', write: 'cWrite', stretch: 'cStretch', blend: 'cBlend' },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._deals = null; this._dealKey = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._drag = null; this._view = {}; this._shelf = [];
    var ws = WordElasticCore.wordModes(this._loc()), self = this;
    this.settings = [
      { key: 'clue', type: 'choice', labelKey: 'setClue', options: WordElasticCore.CLUES.map(function (c) { return { value: c, labelKey: self.CLUE_KEY[c] }; }) },
      { key: 'words', type: 'choice', labelKey: 'setWords', options: ws.map(function (w) { return { value: w, labelKey: w === 'teams' ? 'wTeams' : 'wSimple' }; }) }
    ];
    if (ws.length < 2) this.settings.pop();   /* da: no letter-team rows in its bank */
    injectElasticCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () { if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); } },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return WordElasticCore.locale(((this.api && this.api.lang) || 'en').slice(0, 2)); },
  _clue: function () { return WordElasticCore.clue(this._set('clue')); },
  _words: function () { return WordElasticCore.wordMode(this._loc(), this._set('words')); },
  _key: function () { return this._loc() + '/' + this._clue() + '/' + this._words(); },
  _say: function (text, rate) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'word', text: text, lang: this._loc(), rate: rate || 0.9 }); } catch (e) {} },
  /* how a bead's letter is printed (German: a typed first letter shows its capital) */
  _show: function (g, i) { return this._loc() === 'de' && i === 0 ? g.charAt(0).toLocaleUpperCase('de') + g.slice(1) : g; },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { this._pool = WordElasticCore.rounds(this._loc(), this._clue(), this._words()); this._poolKey = k; this._order = null; } return this._pool; },
  _deal: function (pool) {
    var C = WordElasticCore, n = pool.length, ch = C.dealChoices(n, Math.random), bk = C.dealBank(n, Math.random);
    return pool.map(function (r, i) { return { tray: C.dealTray(r, Math.random), choice: ch[i], bank: bk[i] }; });
  },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = WordElasticCore;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); this._deals = null; }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); this._deals = null; }
    if (!this._deals || this._dealKey !== this._poolKey || this._deals.length !== n) { this._deals = this._deal(pool); this._dealKey = this._poolKey; }
    var r = pool[this._order[index % n]], d = this._deals[this._order[index % n]];
    var pk = r.clue === 'bank' ? 'pBank' : r.clue === 'write' ? 'pWrite' : r.clue === 'stretch' ? 'pStretch' : r.clue === 'blend' ? 'pBlend' : r.stopless ? 'pLong' : 'pBeads';
    return {
      id: 'word-elastic.' + r.loc + '.' + r.id, promptKey: pk, promptArgs: {}, celebrateKey: r.clue === 'blend' ? 'okBlend' : 'ok', answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._view = {}; tool._drag = null;
        tool.st = C.newState(r, { trayOrder: d.tray, choiceOrder: d.choice, bankOrder: d.bank });
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = WordElasticCore, r0 = C.rounds(this._loc(), 'beads', 'simple')[0]; this.st = C.newState(r0, {}); }
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected || self._busy || self._drag) return; last = w; self._render2(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var L = this._L = WordElasticCore.layout(this._width());
    var wrap = api.el('div', 'wel-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + (L.W < 340 ? ' is-tiny' : '')); this._wrap = wrap; wrap.tabIndex = -1;
    [['pic', L.pic], ['bead', L.bead], ['tile', L.tile], ['knob', L.knob]].forEach(function (p) { wrap.style.setProperty('--wel-' + p[0], p[1] + 'px'); });
    this._shelfEl = api.el('div', 'wel-shelf'); wrap.appendChild(this._shelfEl);
    this._top = api.el('div', 'wel-top'); wrap.appendChild(this._top);
    this._bandEl = api.el('div', 'wel-band'); wrap.appendChild(this._bandEl);
    this._below = api.el('div', 'wel-below'); wrap.appendChild(this._below);
    var ask = api.el('div', 'wel-ask'); wrap.appendChild(ask);
    var note = api.el('p', 'wel-note'); note.setAttribute('aria-live', 'polite'); this._note = note; ask.appendChild(note);
    var chk = api.el('button', 'wel-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; ask.appendChild(chk);
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
    if (!this._bandEl) return;
    var st = this.st, C = WordElasticCore, r = st.r, v = this._view;
    this._wrap.className = this._wrap.className.replace(/ is-c-\w+| is-kb/g, '') + ' is-c-' + r.clue + (r.keyboard ? ' is-kb' : '');
    this._wrap.classList.toggle('is-fast', !!this.FAST);
    this._paintShelf(); this._paintTop(); this._paintBand(); this._paintBelow();
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : (v.won ? this._okText() : '');
    else if (h && !this._busy) msg = this._t(h, { sounds: this._soundsText() });
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.last && st.last.result !== 'empty'));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
  },
  _soundsText: function () { var r = this.st.r, self = this; return r.sounds.map(function (s, i) { return self._show(s, i); }).join('–'); },
  _okText: function () { var r = this.st.r; return this._t(r.clue === 'blend' ? 'okBlend' : 'ok', { sounds: this._soundsText(), word: r.word }); },

  _paintShelf: function () {
    var el = this._shelfEl, self = this; el.innerHTML = '';
    for (var i = 0; i < this.SHELF; i++) {
      var s = this._shelf[i], c = this.api.el('span', 'wel-slot' + (s ? ' is-full' : ''));
      if (s) { c.innerHTML = '<img alt="" draggable="false" src="' + this._pic(s.pic) + '"><span class="wel-slotword">' + s.word + '</span>'; }
      c.setAttribute('aria-hidden', 'true'); el.appendChild(c);
    }
    el.setAttribute('aria-label', this._t('ariaShelf', { list: this._shelf.map(function (s) { return s.word; }).join(', ') }));
  },
  _paintTop: function () {
    var el = this._top, st = this.st, r = st.r, self = this, v = this._view; el.innerHTML = '';
    if (r.clue === 'blend') { el.hidden = true; return; }
    el.hidden = false;
    var card = this.api.el('div', 'wel-pic' + (v.won ? ' is-hop' : ''));
    card.innerHTML = '<img alt="" draggable="false" src="' + this._pic(r.pic) + '">';
    if (st.done && v.won) { var tag = this.api.el('span', 'wel-tag'); tag.textContent = r.word; card.appendChild(tag); }
    el.appendChild(card);
    var say = this.api.el('button', 'wel-say'); say.type = 'button'; say.setAttribute('data-k', 'say'); say.setAttribute('aria-label', this._t('ariaSay'));
    say.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a4.5 4.5 0 010 7M18.5 6a8 8 0 010 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    say.addEventListener('click', function () { self._say(r.word, 0.75); });
    el.appendChild(say);
    if (r.bank) {
      var bk = this.api.el('div', 'wel-bank'); bk.setAttribute('aria-hidden', 'false');
      st.bankOrder.forEach(function (bi) { var row = self.api.el('span', 'wel-bankrow'); row.textContent = r.bank[bi]; bk.appendChild(row); });
      el.appendChild(bk);
    }
  },
  /* the elastic: a peg, the band, the beads, the knob */
  _paintBand: function () {
    var el = this._bandEl, st = this.st, r = st.r, C = WordElasticCore, self = this, v = this._view, L = this._L; el.innerHTML = '';
    var n = r.sounds.length, shown = r.stopless ? st.beads.length : (st.stretch || 0);
    /* the beads share the band's room: a wide pill counts 1.33; never below 44 px */
    var units = 0, room = this._bandRoom(), many = r.stopless ? Math.max(shown, n + 1) : n;
    for (var u = 0; u < many; u++) units += (!r.stopless && u < n && Array.from(r.sounds[u]).length > 1) ? 1.33 : 1;
    if (r.quiet) units += 0.7;
    var gap = this._gap(), bead = Math.max(44, Math.min(L.bead, Math.floor((room - (many - 1) * gap) / units)));
    el.style.setProperty('--wel-bead', bead + 'px'); el.style.setProperty('--wel-gap', gap + 'px');
    if (v.won && !r.stopless) shown = n;
    var help = C.helpOn(st), ghost = C.ghostOn(st), wrong = (st.show && st.last && st.last.result === 'wrong') ? st.last.wrong : [];
    var peg = this.api.el('span', 'wel-peg'); peg.setAttribute('aria-hidden', 'true'); el.appendChild(peg);
    var line = this.api.el('span', 'wel-line' + (v.won ? ' is-snap' : '')); line.setAttribute('aria-hidden', 'true'); el.appendChild(line);
    var row = this.api.el('div', 'wel-beads' + (v.won ? ' is-snap' : '') + (shown ? '' : ' is-shut')); this._rowEl = row;
    if (v.won) {
      var wt = this.api.el('span', 'wel-word'); wt.textContent = r.word; row.appendChild(wt);
    } else {
      var total = shown;
      for (var i = 0; i < shown; i++) (function (i) {
        var b = st.beads[i], team = !r.stopless && i < n && Array.from(r.sounds[i]).length > 1;
        var cls = 'wel-bead' + (b ? ' is-full' : '') + (b && b.given ? ' is-given' : '') + (team ? ' is-team' : '') + (wrong.indexOf(i) >= 0 ? ' is-kick' : '') + (st.last && st.last.result === 'empty' && !b ? ' is-pulse' : '');
        if (st.show && st.last && st.last.result === 'tooMany' && i >= n) cls += ' is-pip';
        if (help && st.last.team === i) cls += ' is-teamhelp';
        if (v.read !== undefined && i <= v.read) cls += ' is-read';
        var be = self.api.el('button', cls); be.type = 'button'; be.setAttribute('data-k', 'bead' + i); be.setAttribute('data-bead', i);
        be.textContent = b ? self._show(b.g, i) : '';
        be.setAttribute('aria-label', b ? self._t('ariaBead', { n: i + 1, total: total, letter: self._show(b.g, i) }) : self._t('ariaEmpty', { n: i + 1, total: total }));
        be.addEventListener('click', function () { self._beadTap(i); });
        if (help && wrong.indexOf(i) >= 0) { var ar = self.api.el('span', 'wel-arrow'); ar.setAttribute('aria-hidden', 'true'); be.appendChild(ar); }
        if (ghost && wrong.indexOf(i) >= 0) { var gh = self.api.el('span', 'wel-ghost'); gh.textContent = self._show(r.sounds[i], i); gh.setAttribute('aria-hidden', 'true'); be.appendChild(gh); }
        if (st.show && st.last && st.last.result === 'tooFew' && st.last.gap === i) { var gp = self.api.el('span', 'wel-gap'); gp.setAttribute('aria-hidden', 'true'); row.appendChild(gp); }
        row.appendChild(be);
      })(i);
      if (st.show && st.last && st.last.result === 'tooFew' && st.last.gap >= shown) { var gp2 = this.api.el('span', 'wel-gap'); gp2.setAttribute('aria-hidden', 'true'); row.appendChild(gp2); }
      /* fr: the quiet bead holds the silent letters; it is never a sound */
      if (r.quiet && (shown >= n || r.stopless)) { var qb = this.api.el('span', 'wel-quiet'); qb.textContent = r.quiet; qb.setAttribute('aria-hidden', 'true'); row.appendChild(qb); }
    }
    el.appendChild(row);
    if (L.mode !== 'wide') { var br = this.api.el('span', 'wel-break'); br.setAttribute('aria-hidden', 'true'); el.appendChild(br); }
    var knob = this.api.el('button', 'wel-knob'); knob.type = 'button'; knob.setAttribute('data-k', 'knob'); knob.setAttribute('aria-label', this._t('ariaKnob', { n: shown }));
    knob.setAttribute('role', 'slider'); knob.setAttribute('aria-valuemin', '0'); knob.setAttribute('aria-valuemax', String(r.stopless ? C.MAX_BEADS : n)); knob.setAttribute('aria-valuenow', String(shown));
    if (r.clue !== 'blend' || !v.closed) this._bindKnob(knob);
    el.appendChild(knob);
    /* the band runs from the peg to the knob: it is as long as it is stretched */
    var place = function () {
      if (!knob.isConnected) return; var a = el.getBoundingClientRect();
      if (L.mode !== 'wide') {   /* the knob hangs under the band's end */
        var last = row.lastElementChild, end = last ? last.getBoundingClientRect().right - a.left : 30;
        knob.style.marginLeft = Math.max(0, Math.min(a.width - L.knob, end - L.knob / 2)) + 'px';
        line.style.setProperty('--wel-len', Math.max(20, end - 4) + 'px'); return;
      }
      var k = knob.getBoundingClientRect(); line.style.setProperty('--wel-len', Math.max(20, k.left + k.width / 2 - a.left - 16) + 'px');
    };
    place(); requestAnimationFrame(place);
    line.style.setProperty('--wel-len', Math.max(20, (shown * (L.bead + 8)) + 40) + 'px');
  },
  _paintBelow: function () {
    var el = this._below, st = this.st, r = st.r, C = WordElasticCore, self = this, v = this._view; el.innerHTML = '';
    if (r.clue === 'blend') {
      var row = this.api.el('div', 'wel-choices');
      for (var s = 0; s < 3; s++) (function (s) {
        var w = C.choiceAt(st, s), b = self.api.el('button', 'wel-choice' + (st.pick === s ? ' is-pick' : '') + (st.done && w.key === r.key ? ' is-win' : '') + (st.show && st.last && st.last.result === 'wrongPick' && st.last.pick === s ? ' is-shake' : ''));
        b.type = 'button'; b.setAttribute('data-k', 'choice' + s); b.setAttribute('data-i', s); b.setAttribute('aria-label', self._t('ariaChoice', { n: s + 1 })); b.setAttribute('aria-pressed', String(st.pick === s));
        b.innerHTML = '<img alt="" draggable="false" src="' + self._pic(w.pic) + '">';
        if (st.done && w.key === r.key && v.won) { var tg = self.api.el('span', 'wel-tag'); tg.textContent = r.word; b.appendChild(tg); }
        b.addEventListener('click', function () { self._pick(s); });
        row.appendChild(b);
      })(s);
      el.appendChild(row); return;
    }
    if (r.keyboard) {
      var kb = this.api.el('div', 'wel-keys'), lit = [];
      C.letters(r.loc, r.words).forEach(function (g, i) {
        var k = self.api.el('button', 'wel-key' + (Array.from(g).length > 1 ? ' is-team' : '')); k.type = 'button'; k.setAttribute('data-k', 'key' + i); k.setAttribute('data-g', g);
        k.textContent = g; k.setAttribute('aria-label', self._t('ariaTile', { letter: g }));
        k.addEventListener('click', function () { self._type(g); });
        kb.appendChild(k);
      });
      var bs = this.api.el('button', 'wel-key is-back'); bs.type = 'button'; bs.setAttribute('data-k', 'back'); bs.setAttribute('aria-label', this._t('ariaBack'));
      bs.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9 6h11v12H9l-6-6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 9.5l5 5M17 9.5l-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
      bs.addEventListener('click', function () { self._back(); });
      kb.appendChild(bs);
      el.appendChild(kb); return;
    }
    var tray = this.api.el('div', 'wel-tray'), lit2 = C.litTiles(st);
    st.trayOrder.forEach(function (tid, slot) {
      var t = r.tray[tid], usedT = C.used(st, tid);
      var b = self.api.el('button', 'wel-tile' + (Array.from(t.g).length > 1 ? ' is-team' : '') + (usedT ? ' is-used' : '') + (lit2.length && lit2.indexOf(tid) < 0 ? ' is-dim' : '') + (lit2.indexOf(tid) >= 0 ? ' is-lit' : ''));
      b.type = 'button'; b.setAttribute('data-k', 'tile' + tid); b.setAttribute('data-t', tid); b.textContent = t.g; b.disabled = usedT;
      b.setAttribute('aria-label', self._t('ariaTile', { letter: t.g }));
      self._bindTile(b, tid);
      tray.appendChild(b);
    });
    el.appendChild(tray);
  },

  /* ---------------- the hand ---------------- */
  _beadTap: function (i) { if (this._busy) return; if (WordElasticCore.clearBead(this.st, i)) { this.api.sound(330); this._view = {}; this._paint(); } },
  _place: function (tid, bead) {
    if (this._busy) return;
    var st = this.st, opened = !st.r.stopless && st.stretch < st.r.sounds.length;
    if (WordElasticCore.place(st, tid, bead)) { this.api.sound(opened ? 440 : 587); this._view = {}; this._paint(); }
  },
  _type: function (g) { if (this._busy) return; if (WordElasticCore.type(this.st, g)) { this.api.sound(587); this._view = {}; this._paint(); } },
  _back: function () { if (this._busy) return; if (WordElasticCore.backspace(this.st)) { this.api.sound(330); this._view = {}; this._paint(); } },
  _pick: function (s) { var st = this.st; if (this._busy || st.done) return; if (WordElasticCore.pick(st, s)) { this.api.sound(560); this._say(WordElasticCore.choiceAt(st, s).word); this._view = { closed: this._view.closed }; this._paint(); } },
  /* how many beads the band has room for at this width (never smaller than a 44 px bead) */
  _cap: function () { var room = this._bandRoom(), g = this._gap(); return Math.min(WordElasticCore.MAX_BEADS, Math.max(this.st.r.sounds.length + 1, Math.floor((room + g) / (44 + g)))); },
  /* the beads' room on the band; on a phone the knob sits on its own line under the band's end, so the beads get the whole width */
  _bandRoom: function () { var L = this._L; return Math.min(560, L.W) - (L.mode === 'wide' ? 26 + L.knob + 40 : (L.W < 340 ? 4 : 30)); },
  _gap: function () { return this._L.mode === 'wide' ? 8 : (this._L.W < 340 ? 2 : 4); },
  _stretch: function (k) {
    var st = this.st, C = WordElasticCore, before = st.r.stopless ? st.beads.length : st.stretch;
    if (st.r.stopless) k = Math.min(k, this._cap());
    if (C.stretchTo(st, k)) { var after = st.r.stopless ? st.beads.length : st.stretch; this.api.sound(after > before ? 523 + after * 30 : 300); this._view = {}; this._paint(); return true; }
    return false;
  },
  _bindKnob: function (knob) {
    var self = this;
    knob.addEventListener('pointerdown', function (ev) {
      var st = self.st, r = st.r; if (self._busy || st.done || (ev.button !== undefined && ev.button !== 0)) return;
      var sx = ev.clientX, start = r.stopless ? st.beads.length : st.stretch, step = self._L.bead + 8, moved = false;
      self._drag = {};   /* the listeners live on the window: every bead that pops out repaints the band, and the knob with it */
      var move = function (e) {
        var dx = e.clientX - sx; if (!moved && Math.abs(dx) < 6) return; moved = true;
        if (r.clue === 'blend') { var k = Math.max(0, Math.min(r.sounds.length - 1, Math.floor(-dx / step))); if (k !== self._view.read) { self._view = { read: k, closed: self._view.closed }; self._say(r.sounds[k], 0.6); self._paint(); } return; }
        self._stretch(start + Math.round(dx / step));
      };
      var up = function () {
        window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
        self._drag = null;
        if (r.clue === 'blend') { if (moved) { self._view = { closed: true, read: r.sounds.length - 1 }; self._say(r.word); self._paint(); } return; }
        if (!moved) { if (!r.stopless && st.stretch < r.sounds.length) self._stretch(r.sounds.length); return; }
        /* letting the band go back past half-way with letters on it = Check */
        var filled = st.beads.some(function (b) { return b && !b.given; });
        if (!r.stopless && filled && st.stretch < Math.ceil(r.sounds.length / 2)) { st.stretch = r.sounds.length; self._check(); }
      };
      window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
      ev.preventDefault();
    });
    knob.addEventListener('keydown', function (ev) {
      var st = self.st, r = st.r, cur = r.stopless ? st.beads.length : st.stretch;
      if (ev.key === 'ArrowRight') { ev.preventDefault(); ev.stopPropagation(); self._stretch(cur + 1); }
      if (ev.key === 'ArrowLeft') { ev.preventDefault(); ev.stopPropagation(); self._stretch(cur - 1); }
    });
  },
  _bindTile: function (b, tid) {
    var self = this;
    b.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.done || (ev.button !== undefined && ev.button !== 0)) return;
      var sx = ev.clientX, sy = ev.clientY, moved = false, ghost = null;
      try { b.setPointerCapture(ev.pointerId); } catch (e) {}
      var hitAt = function (x, y) { var bs = self._wrap.querySelectorAll('.wel-bead'); for (var z = 0; z < bs.length; z++) { var rc = bs[z].getBoundingClientRect(); if (x >= rc.left - 8 && x <= rc.right + 8 && y >= rc.top - 10 && y <= rc.bottom + 10) return +bs[z].getAttribute('data-bead'); } var band = self._bandEl.getBoundingClientRect(); return (y >= band.top - 12 && y <= band.bottom + 12) ? -2 : -1; };
      var move = function (e) {
        if (!moved && Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) < 8) return;
        if (!moved) { moved = true; self._drag = {}; ghost = self.api.el('div', 'wel-dragtile'); ghost.textContent = b.textContent; document.body.appendChild(ghost); b.classList.add('is-lifted'); }
        ghost.style.left = (e.clientX - 28) + 'px'; ghost.style.top = (e.clientY - 30) + 'px';
        var h = hitAt(e.clientX, e.clientY);
        [].forEach.call(self._wrap.querySelectorAll('.wel-bead'), function (s) { s.classList.toggle('is-over', +s.getAttribute('data-bead') === h); });
      };
      var up = function (e) {
        b.removeEventListener('pointermove', move); b.removeEventListener('pointerup', up); b.removeEventListener('pointercancel', up);
        if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
        b.classList.remove('is-lifted'); self._drag = null;
        if (!moved) { if (e.type === 'pointerup') self._place(tid); return; }
        var h = hitAt(e.clientX, e.clientY);
        if (h >= 0) self._place(tid, h); else if (h === -2) self._place(tid); else self._paint();
      };
      b.addEventListener('pointermove', move); b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up);
      ev.preventDefault();
    });
    b.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); ev.stopPropagation(); self._place(tid); } });
  },
  _onKey: function (ev) {
    var st = this.st, r = st.r;
    if (r.keyboard && ev.key && ev.key.length === 1 && !ev.ctrlKey && !ev.metaKey) { var g = ev.key.toLocaleLowerCase(); if (WordElasticCore.letters(r.loc, r.words).indexOf(g) >= 0) { ev.preventDefault(); this._type(g); return; } }
    if (r.keyboard && ev.key === 'Backspace') { ev.preventDefault(); this._back(); return; }
    if (ev.key === 'Enter' && ev.target === this._wrap) { ev.preventDefault(); this._check(); }
  },

  _check: function () {
    if (this._busy || this.st.done) return;
    var self = this, st = this.st, C = WordElasticCore, r = st.r;
    var res = C.check(st);
    if (res.kase === 'empty') { this.api.sound(460); this._view = {}; this._paint(); return; }
    if (res.ok) return this._win();
    /* the snap: right beads clack home, a wrong bead is kicked up on a loop and wobbles */
    this._busy = true; this._view = {}; this.api.sound(220); this._paint();
    if (st.help >= 2 && r.clue !== 'blend') this._say(r.word, 0.6);
    this._later(function () { self._busy = false; self._paint(); self.api.announce(self._note.textContent || ''); }, this._ms(450));
  },
  _win: function () {
    var self = this, st = this.st, r = st.r;
    this._busy = true; this.api.sound(196);
    this._later(function () {
      self._view = { won: true };
      self.api.sound(659); self._later(function () { self.api.sound(988); }, 120);
      self._busy = false;
      if (!self._shelf.some(function (s) { return s.word === r.word; })) { self._shelf.push({ word: r.word, pic: r.pic }); if (self._shelf.length > self.SHELF) self._shelf.shift(); }
      self._paint(); self._say(r.word); self.api.announce(self._note.textContent || '');
    }, this._ms(320));
    this._later(function () { self._afterOk = true; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this._ms(320 + this.OK_MS));
  }
};

var welCssDone = false;
function injectElasticCSS() {
  if (welCssDone || typeof document === 'undefined') return;
  welCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.wel-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;--wel-ink:#2A2A35;--wel-teal:#146B5E;--wel-coral:#F2784B;--wel-cream:#FFF8EC;user-select:none;-webkit-user-select:none;}'
  + '.wel-wrap:focus{outline:none;}'
  /* the shelf */
  + '.wel-shelf{display:flex;gap:6px;justify-content:center;max-width:100%;overflow-x:auto;padding:2px;}'
  + '.wel-slot{position:relative;flex:none;width:44px;height:44px;border-radius:10px;border:2px dashed #CFC3AC;box-sizing:border-box;overflow:hidden;} .wel-slot.is-full{border:2px solid var(--wel-teal);background:#fff;}'
  + '.wel-slot img{width:100%;height:100%;object-fit:contain;} .wel-slotword{position:absolute;left:0;right:0;bottom:0;height:3px;background:var(--wel-teal);font-size:0;}'
  + '.wel-wrap.is-narrow .wel-slot{width:32px;height:32px;border-radius:8px;}'
  /* the picture */
  + '.wel-top{position:relative;display:flex;align-items:center;justify-content:center;gap:12px;width:100%;} .wel-top[hidden]{display:none;}'
  + '.wel-pic{position:relative;width:var(--wel-pic);height:var(--wel-pic);border-radius:18px;background:var(--wel-cream);box-shadow:inset 0 0 0 3px var(--wel-ink);display:flex;align-items:center;justify-content:center;}'
  + '.wel-pic img{width:86%;height:86%;object-fit:contain;} .wel-pic.is-hop{animation:wel-hop .5s ease-out;} @keyframes wel-hop{40%{transform:translateY(-12px);}}'
  + '.wel-tag{position:absolute;right:-10px;top:-12px;padding:3px 10px;border-radius:8px;background:#fff;box-shadow:inset 0 0 0 2px var(--wel-teal),0 3px 0 rgba(20,107,94,.25);font-family:' + D + ';font-weight:800;font-size:20px;color:var(--wel-ink);transform:rotate(6deg);animation:wel-tag .4s ease-out;} @keyframes wel-tag{0%{transform:translateY(40px) scale(.6);opacity:0;}}'
  + '.wel-say{width:44px;height:44px;border:0;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 2px #B2A794;color:var(--wel-teal);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;flex:none;}'
  + '.wel-bank{display:flex;flex-direction:column;gap:4px;padding:8px 12px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 2px #B2A794;transform:rotate(-2deg);} .wel-bankrow{font-family:' + D + ';font-weight:700;font-size:20px;line-height:1.15;color:var(--wel-ink);}'
  /* the elastic */
  + '.wel-band{position:relative;display:flex;align-items:center;justify-content:flex-start;width:100%;max-width:560px;min-height:calc(var(--wel-bead) + 30px);padding:0 4px;box-sizing:border-box;}'
  + '.wel-peg{flex:none;width:26px;height:26px;border-radius:50%;background:var(--wel-ink);z-index:2;}'
  + '.wel-line{position:absolute;left:16px;width:var(--wel-len,40px);top:50%;height:12px;margin-top:-6px;border-radius:6px;background:var(--wel-coral);box-shadow:inset 0 -2px 0 #C95A31;z-index:0;transition:right .28s cubic-bezier(.3,1.4,.6,1);}'
  + '.wel-beads{position:relative;flex:none;display:flex;align-items:center;justify-content:flex-start;gap:8px;padding:0 10px;z-index:1;min-height:calc(var(--wel-bead) + 24px);}'
  + '.wel-beads.is-shut{min-width:calc(var(--wel-bead) * .8);}'
  + '.wel-bead{position:relative;flex:none;width:var(--wel-bead);height:var(--wel-bead);padding:0;border:0;border-radius:50%;background:var(--wel-cream);box-shadow:inset 0 0 0 2.5px var(--wel-ink),0 3px 0 #CDBFA6;font-family:' + D + ';font-weight:800;font-size:calc(var(--wel-bead) * .58);line-height:1;color:var(--wel-ink);cursor:pointer;animation:wel-pop .16s ease-out;}'
  + '@keyframes wel-pop{0%{transform:scale(0);}70%{transform:scale(1.15);}100%{transform:scale(1);}}'
  + '.wel-bead.is-team{width:calc(var(--wel-bead) * 1.33);border-radius:calc(var(--wel-bead) / 2);font-size:calc(var(--wel-bead) * .48);}'
  + '.wel-bead.is-given{box-shadow:inset 0 0 0 3px var(--wel-teal),0 3px 0 #9EC6BC;cursor:default;}'
  + '.wel-bead.is-over{transform:scale(1.08);box-shadow:inset 0 0 0 3px var(--wel-coral),0 3px 0 #CDBFA6;}'
  + '.wel-bead.is-pulse{animation:wel-pulse 1s ease-in-out 2;} @keyframes wel-pulse{50%{box-shadow:inset 0 0 0 3px var(--wel-coral),0 0 0 6px rgba(242,120,75,.3);}}'
  + '.wel-bead.is-kick{transform:translateY(-18px) rotate(-8deg);box-shadow:inset 0 0 0 3px var(--wel-coral),0 3px 0 #E0A58C;background:#FFE3D6;animation:wel-kick .4s ease-out,wel-wobble 1.2s ease-in-out .4s infinite;}'
  + '.wel-bead.is-kick::before{content:"";position:absolute;left:50%;bottom:-20px;width:2px;height:20px;margin-left:-1px;background:var(--wel-coral);}'
  + '@keyframes wel-kick{0%{transform:none;}60%{transform:translateY(-26px) rotate(-12deg);}100%{transform:translateY(-18px) rotate(-8deg);}} @keyframes wel-wobble{50%{transform:translateY(-18px) rotate(6deg);}}'
  + '.wel-bead.is-pip{opacity:.45;transform:translateY(10px);box-shadow:inset 0 0 0 2px #B2A794;}'
  + '.wel-bead.is-teamhelp{box-shadow:inset 0 0 0 3px var(--wel-teal),0 0 0 5px rgba(20,107,94,.2);} .wel-bead.is-teamhelp::after{content:"";position:absolute;left:10%;right:-60%;bottom:-10px;height:8px;border:3px solid var(--wel-teal);border-top:0;border-radius:0 0 12px 12px;}'
  + '.wel-bead.is-read{box-shadow:inset 0 0 0 3px var(--wel-teal),0 0 0 6px rgba(226,178,58,.45);}'
  + '.wel-arrow{position:absolute;left:50%;bottom:-30px;margin-left:-9px;width:0;height:0;border-left:9px solid transparent;border-right:9px solid transparent;border-bottom:12px solid var(--wel-ink);}'
  + '.wel-ghost{position:absolute;left:0;right:0;top:-34px;font-size:calc(var(--wel-bead) * .42);color:rgba(42,42,53,.3);}'
  + '.wel-gap{flex:none;width:calc(var(--wel-bead) * .6);height:12px;border-radius:6px;background:repeating-linear-gradient(90deg,var(--wel-coral) 0 6px,transparent 6px 10px);transform:translateY(10px);}'
  + '.wel-quiet{flex:none;display:inline-flex;align-items:center;justify-content:center;min-width:calc(var(--wel-bead) * .62);height:calc(var(--wel-bead) * .62);padding:0 6px;border-radius:calc(var(--wel-bead) * .31);background:#fff;box-shadow:inset 0 0 0 2px #B9B2A6;font-family:' + D + ';font-weight:700;font-size:calc(var(--wel-bead) * .4);color:#9C958A;box-sizing:border-box;}'
  + '.wel-beads.is-snap{justify-content:center;flex:1;} .wel-word{padding:6px 18px;border-radius:14px;background:var(--wel-cream);box-shadow:inset 0 0 0 3px var(--wel-teal),0 4px 0 #9EC6BC;font-family:' + D + ';font-weight:800;font-size:calc(var(--wel-bead) * .62);color:var(--wel-ink);letter-spacing:.06em;animation:wel-clack .28s cubic-bezier(.3,1.5,.6,1);} @keyframes wel-clack{0%{letter-spacing:.9em;}}'
  + '.wel-line.is-snap{left:16px;}'
  + '.wel-knob{position:relative;flex:none;width:var(--wel-knob);height:var(--wel-knob);border:0;border-radius:50%;background:var(--wel-teal);box-shadow:inset 0 0 0 5px #0E4D44,0 4px 0 #0B3B34;cursor:grab;touch-action:none;z-index:2;}'
  + '.wel-knob::after{content:"";position:absolute;inset:14px;border-radius:50%;border:3px solid rgba(255,255,255,.6);}'
  /* the tray, the keyboard, the choices */
  + '.wel-below{display:flex;justify-content:center;width:100%;}'
  + '.wel-tray{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;max-width:560px;}'
  + '.wel-tile{min-width:var(--wel-tile);height:calc(var(--wel-tile) + 4px);padding:0 8px;border:0;border-radius:12px;background:var(--wel-cream);box-shadow:inset 0 0 0 3px var(--wel-ink),0 4px 0 #CDBFA6;font-family:' + D + ';font-weight:800;font-size:calc(var(--wel-tile) * .6);line-height:1;color:var(--wel-ink);cursor:pointer;touch-action:none;}'
  + '.wel-tile.is-team{min-width:calc(var(--wel-tile) * 1.4);} .wel-tile.is-used{opacity:.25;cursor:default;} .wel-tile.is-dim{opacity:.3;} .wel-tile.is-lit{box-shadow:inset 0 0 0 3px var(--wel-coral),0 0 0 4px rgba(242,120,75,.3),0 4px 0 #CDBFA6;animation:wel-lit 1.2s ease-in-out infinite;} @keyframes wel-lit{50%{transform:translateY(-4px);}}'
  + '.wel-tile.is-lifted{opacity:.35;} .wel-dragtile{position:fixed;z-index:9999;pointer-events:none;min-width:56px;height:60px;padding:0 8px;border-radius:12px;background:var(--wel-cream);box-shadow:inset 0 0 0 3px var(--wel-ink),0 10px 18px rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;font-family:' + D + ';font-weight:800;font-size:34px;color:var(--wel-ink);}'
  + '.wel-keys{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;max-width:600px;}'
  + '.wel-key{min-width:44px;height:46px;padding:0 6px;border:0;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 2px var(--wel-ink),0 3px 0 #CDBFA6;font-family:' + D + ';font-weight:700;font-size:22px;color:var(--wel-ink);cursor:pointer;} .wel-key.is-team{background:var(--wel-cream);min-width:56px;} .wel-key.is-back{display:inline-flex;align-items:center;justify-content:center;min-width:60px;color:#A6461F;}'
  + '.wel-choices{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}'
  + '.wel-choice{position:relative;padding:6px;border:0;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 2px var(--wel-ink),0 3px 0 rgba(42,42,53,.15);cursor:pointer;} .wel-choice img{display:block;width:104px;height:104px;object-fit:contain;pointer-events:none;}'
  + '.wel-wrap.is-narrow .wel-choice img{width:80px;height:80px;}'
  + '.wel-choice.is-pick{transform:translateY(-4px);box-shadow:inset 0 0 0 3px var(--wel-coral),0 0 0 4px rgba(242,120,75,.3);} .wel-choice.is-win{box-shadow:inset 0 0 0 3px var(--wel-teal),0 0 0 6px rgba(20,107,94,.25);} .wel-choice.is-shake{animation:wel-shake .3s ease-in-out 2;} @keyframes wel-shake{25%{transform:rotate(-4deg);}75%{transform:rotate(4deg);}}'
  /* the ask strip */
  + '.wel-ask{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;}'
  + '.wel-note{flex:1;min-height:28px;margin:0;font-weight:700;font-size:clamp(15px,2.3vw,18px);line-height:1.3;font-family:' + B + ';color:var(--wel-teal);text-align:center;} .wel-note:empty{display:none;} .wel-note.is-ok{font-weight:800;} .wel-note.is-wrong{color:#A6461F;}'
  + '.wel-check{min-height:48px;padding:0 22px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;font-family:' + D + ';cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .wel-check[hidden]{display:none;} .wel-check:disabled{opacity:.6;}'
  + '.wel-wrap.is-narrow .wel-note{text-align:left;} .wel-wrap.is-narrow .wel-tray{gap:8px;} .wel-wrap.is-narrow .wel-bank{position:absolute;right:0;top:0;transform:rotate(-3deg) scale(.86);transform-origin:top right;}'
  + '.wel-wrap.is-narrow .wel-band{min-height:calc(var(--wel-bead) + 24px);flex-wrap:wrap;padding:0;} .wel-break{flex-basis:100%;height:0;} .wel-wrap.is-narrow .wel-knob{margin-top:8px;} .wel-wrap.is-narrow .wel-knob::before{content:"";position:absolute;left:50%;top:-12px;width:8px;height:14px;margin-left:-4px;border-radius:3px;background:var(--wel-coral);} .wel-wrap.is-narrow .wel-line{top:calc(var(--wel-bead) / 2 + 12px);} .wel-wrap.is-narrow .wel-beads{gap:var(--wel-gap,4px);padding:0 2px;} .wel-wrap.is-tiny .wel-peg{display:none;} .wel-wrap.is-tiny .wel-line{left:0;}'
  + '.wel-wrap.is-narrow.is-kb .wel-ask{order:4;} .wel-wrap.is-narrow.is-kb .wel-below{order:5;} .wel-wrap.is-narrow.is-kb .wel-pic{width:80px;height:80px;} .wel-wrap.is-tiny .wel-shelf{gap:3px;} .wel-wrap.is-tiny .wel-slot{width:24px;height:24px;border-radius:6px;}'
  + '.wel-wrap.is-tiny{gap:6px;} .wel-wrap.is-tiny .wel-band{min-height:calc(var(--wel-bead) + 4px);} .wel-wrap.is-tiny .wel-beads{min-height:calc(var(--wel-bead) + 8px);} .wel-wrap.is-tiny .wel-knob{margin-top:2px;width:48px;height:48px;} .wel-wrap.is-tiny .wel-tray{gap:6px;} .wel-wrap.is-tiny .wel-top{gap:8px;} .wel-wrap.is-tiny .wel-ask{gap:8px;} .wel-wrap.is-tiny .wel-key{min-width:44px;height:44px;font-size:20px;} .wel-wrap.is-tiny .wel-keys{gap:4px;}'
  + '.wel-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.wel-wrap *{animation-duration:.2s !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'wel-css'; s.textContent = css; document.head.appendChild(s);
}
