/* =====================================================================
   paint-wells-activity.js — ACTIVITY #110 of the one-by-one rebuild:
   "Build Blend and Digraph Words" → THE PAINT WELLS (RF.1.3;
   en de nl sv no es it pt).
   Design: docs/activities-rebuild/designs/110-cvc-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: paint wells where two letters that make one sound mix
   into one new colour, and letters that keep their own sounds refuse to
   mix. Every letter is a glass dropper of its own colour (s blue, h
   yellow, c red…). Pour the picture's word into six wells — always six,
   so the wells never tell how many sounds — one well for each sound. A
   tap pours into the next EMPTY well; only a drag can put a second
   letter into a well, so sharing a well is always a decision. Press
   Check and the paddle stirs: s + h in one well swirl into a brand-new
   green (sh); f + r in one well refuse and run in stripes (two sounds);
   an sh broken across two wells leans across the wall. When every well
   is right the paint dries into the word's colour strip, which goes on
   the colour shelf — every sh is the same green wherever it sits.
   Clues: Pour the word · Team jars (the word poured but its team; pick
   the jar) · Sentence (en: tap every word with sh).
   ACTIVITY LAYER ONLY: the model is paint-wells-core.js; pictures are the
   library's (bank rows); lcs-shell.js untouched (the shell's Check is
   hidden and pressed by this activity when right).
   Test seams: window.PaintWellsActivity.st / ._pool / ._order / ._ensurePool /
   ._start / ._dims / ._render2 / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var PaintWellsActivity = {
  id: 'paint-wells',
  apparatusClasses: ['pw-'],

  /*STRINGS-BEGIN*/strings: {
    title:        {en:'Build Blend and Digraph Words',de:'Die Farbnäpfchen',nl:'De verfbakjes',da:'Farveskålene',sv:'Färgskålarna',no:'Fargeskålene',es:'Los pocillos de pintura',it:'I pozzetti di colore',pt:'Os potinhos de tinta',fr:'Les godets de peinture',fi:'Maalikupit'},
    instrBubble:  {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:     {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    check:        {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    tPour:        {en:'Pour the letters for the picture: one well for each sound.',de:'Füll die Buchstaben für das Bild ein: ein Näpfchen für jeden Laut.',nl:'Giet de letters voor het plaatje: één bakje voor elke klank.',da:'Hæld bogstaverne til billedet: én skål til hver lyd.',sv:'Häll i bokstäverna till bilden: en skål för varje ljud.',no:'Hell bokstavene til bildet: én skål for hver lyd.',es:'Vierte las letras del dibujo: un pocillo para cada sonido.',it:'Versa le lettere della figura: un pozzetto per ogni suono.',pt:'Despeje as letras da figura: um potinho para cada som.',fr:'Verse les lettres de l’image : un godet pour chaque son.',fi:'Kaada kuvan kirjaimet: yksi kuppi jokaiselle äänteelle.'},
    tJars:        {en:'Which letter team is missing? Pour the right jar into the empty well.',de:'Welche Buchstabengruppe fehlt? Gieß das richtige Glas in das leere Näpfchen.',nl:'Welke lettergroep ontbreekt? Giet het goede potje in het lege bakje.',da:'Hvilken bogstavgruppe mangler? Hæld den rigtige krukke i den tomme skål.',sv:'Vilken bokstavsgrupp saknas? Häll rätt burk i den tomma skålen.',no:'Hvilken bokstavgruppe mangler? Hell riktig krukke i den tomme skålen.',es:'¿Qué grupo de letras falta? Vierte el frasco correcto en el pocillo vacío.',it:'Quale gruppo di lettere manca? Versa il barattolo giusto nel pozzetto vuoto.',pt:'Qual grupo de letras está faltando? Despeje o pote certo no potinho vazio.',fr:'Quel groupe de lettres manque ? Verse le bon pot dans le godet vide.',fi:'Mikä kirjainpari puuttuu? Kaada oikea purkki tyhjään kuppiin.'},
    tSent:        {en:'Tap every word with sh.',de:'Tippe jedes Wort mit sh an.',nl:'Tik elk woord met sh aan.',da:'Tryk på hvert ord med sh.',sv:'Tryck på varje ord med sh.',no:'Trykk på hvert ord med sh.',es:'Toca cada palabra con sh.',it:'Tocca ogni parola con sh.',pt:'Toque em cada palavra com sh.',fr:'Touche chaque mot avec sh.',fi:'Napauta jokaista sanaa, jossa on sh.'},
    hintEmpty:    {en:'Say the word slowly. Pour one well for each sound.',de:'Sprich das Wort langsam. Füll ein Näpfchen für jeden Laut.',nl:'Zeg het woord langzaam. Vul één bakje voor elke klank.',da:'Sig ordet langsomt. Fyld én skål til hver lyd.',sv:'Säg ordet långsamt. Fyll en skål för varje ljud.',no:'Si ordet sakte. Fyll én skål for hver lyd.',es:'Di la palabra despacio. Llena un pocillo para cada sonido.',it:'Di’ la parola lentamente. Riempi un pozzetto per ogni suono.',pt:'Fale a palavra devagar. Encha um potinho para cada som.',fr:'Dis le mot lentement. Remplis un godet pour chaque son.',fi:'Sano sana hitaasti. Täytä yksi kuppi jokaiselle äänteelle.'},
    hintWrong:    {en:'One well did not dry. Say the word slowly and listen to each sound.',de:'Ein Näpfchen ist nicht getrocknet. Sprich das Wort langsam und hör auf jeden Laut.',nl:'Eén bakje is niet opgedroogd. Zeg het woord langzaam en luister naar elke klank.',da:'Én skål tørrede ikke. Sig ordet langsomt, og lyt til hver lyd.',sv:'En skål torkade inte. Säg ordet långsamt och lyssna på varje ljud.',no:'Én skål tørket ikke. Si ordet sakte og lytt til hver lyd.',es:'Un pocillo no se secó. Di la palabra despacio y escucha cada sonido.',it:'Un pozzetto non si è asciugato. Di’ la parola lentamente e ascolta ogni suono.',pt:'Um potinho não secou. Fale a palavra devagar e escute cada som.',fr:'Un godet n’a pas séché. Dis le mot lentement et écoute chaque son.',fi:'Yksi kuppi ei kuivunut. Sano sana hitaasti ja kuuntele jokainen äänne.'},
    hintWrong2:   {en:'Is it this sound or that one? Only two droppers are still bright.',de:'Ist es dieser Laut oder jener? Nur zwei Pipetten leuchten noch.',nl:'Is het deze klank of die? Nog maar twee pipetten zijn fel.',da:'Er det den ene lyd eller den anden? Kun to pipetter lyser stadig.',sv:'Är det det här ljudet eller det där? Bara två pipetter lyser fortfarande.',no:'Er det den ene lyden eller den andre? Bare to pipetter lyser fortsatt.',es:'¿Es este sonido o ese otro? Solo dos goteros siguen brillando.',it:'È questo suono o quell’altro? Solo due contagocce sono ancora accesi.',pt:'É este som ou aquele? Só dois conta-gotas continuam acesos.',fr:'Est-ce ce son-ci ou celui-là ? Il ne reste que deux pipettes allumées.',fi:'Onko se tämä äänne vai tuo? Vain kaksi pipettiä on yhä kirkkaana.'},
    hintGap:      {en:'A sound is missing. Say the word slowly: what comes after the coral well?',de:'Ein Laut fehlt. Sprich das Wort langsam: Was kommt nach dem roten Näpfchen?',nl:'Er ontbreekt een klank. Zeg het woord langzaam: wat komt er na het rode bakje?',da:'Der mangler en lyd. Sig ordet langsomt: Hvad kommer efter den røde skål?',sv:'Ett ljud saknas. Säg ordet långsamt: vad kommer efter den röda skålen?',no:'En lyd mangler. Si ordet sakte: Hva kommer etter den røde skålen?',es:'Falta un sonido. Di la palabra despacio: ¿qué viene después del pocillo rojo?',it:'Manca un suono. Di’ la parola lentamente: che cosa viene dopo il pozzetto rosso?',pt:'Está faltando um som. Fale a palavra devagar: o que vem depois do potinho vermelho?',fr:'Il manque un son. Dis le mot lentement : qu’est-ce qui vient après le godet rouge ?',fi:'Yksi äänne puuttuu. Sano sana hitaasti: mitä tulee punaisen kupin jälkeen?'},
    hintGap2:     {en:'Stretch the word out. Pour the sound you hear right after the coral well.',de:'Zieh das Wort lang. Füll den Laut ein, den du direkt nach dem roten Näpfchen hörst.',nl:'Rek het woord uit. Giet de klank die je direct na het rode bakje hoort.',da:'Stræk ordet ud. Hæld den lyd i, du hører lige efter den røde skål.',sv:'Dra ut ordet. Häll i ljudet du hör direkt efter den röda skålen.',no:'Strekk ordet ut. Hell i lyden du hører rett etter den røde skålen.',es:'Alarga la palabra. Vierte el sonido que oyes justo después del pocillo rojo.',it:'Allunga la parola. Versa il suono che senti subito dopo il pozzetto rosso.',pt:'Estique a palavra. Despeje o som que você ouve logo depois do potinho vermelho.',fr:'Étire le mot. Verse le son que tu entends juste après le godet rouge.',fi:'Venytä sanaa. Kaada äänne, jonka kuulet heti punaisen kupin jälkeen.'},
    hintLean:     {en:'Some paints lean toward each other. Do those letters make one sound together?',de:'Manche Farben lehnen sich aneinander. Sind diese Buchstaben zusammen ein Laut?',nl:'Sommige verven leunen naar elkaar toe. Maken die letters samen één klank?',da:'Nogle farver læner sig mod hinanden. Laver de bogstaver én lyd sammen?',sv:'Några färger lutar sig mot varandra. Gör de bokstäverna ett ljud tillsammans?',no:'Noen farger lener seg mot hverandre. Lager de bokstavene én lyd sammen?',es:'Algunas pinturas se inclinan una hacia otra. ¿Esas letras hacen un solo sonido juntas?',it:'Alcuni colori si piegano uno verso l’altro. Quelle lettere fanno un solo suono insieme?',pt:'Algumas tintas se inclinam uma para a outra. Essas letras fazem um som só juntas?',fr:'Des peintures se penchent l’une vers l’autre. Ces lettres font-elles un seul son ensemble ?',fi:'Jotkin värit kallistuvat toisiaan kohti. Tekevätkö ne kirjaimet yhdessä yhden äänteen?'},
    hintLean2:    {en:'Two letters, one sound: they share one well. Drag one letter into its partner\'s well.',de:'Zwei Buchstaben, ein Laut: Sie teilen sich ein Näpfchen. Zieh einen Buchstaben zu seinem Partner.',nl:'Twee letters, één klank: ze delen één bakje. Sleep een letter naar het bakje van zijn maatje.',da:'To bogstaver, én lyd: De deler én skål. Træk det ene bogstav over til sin makker.',sv:'Två bokstäver, ett ljud: de delar en skål. Dra en bokstav till sin kompis skål.',no:'To bokstaver, én lyd: De deler én skål. Dra den ene bokstaven over til makkeren sin.',es:'Dos letras, un sonido: comparten un pocillo. Arrastra una letra al pocillo de su compañera.',it:'Due lettere, un suono: dividono un pozzetto. Trascina una lettera nel pozzetto della compagna.',pt:'Duas letras, um som: elas dividem um potinho. Arraste uma letra para o potinho da parceira.',fr:'Deux lettres, un son : elles partagent un godet. Fais glisser une lettre dans le godet de sa partenaire.',fi:'Kaksi kirjainta, yksi äänne: ne jakavat yhden kupin. Vedä kirjain parinsa kuppiin.'},
    hintSplit:    {en:'One well would not mix: its letters keep their own sounds.',de:'Ein Näpfchen wollte sich nicht mischen: Seine Buchstaben behalten ihre eigenen Laute.',nl:'Eén bakje wilde niet mengen: de letters houden hun eigen klank.',da:'Én skål ville ikke blande sig: Dens bogstaver beholder deres egne lyde.',sv:'En skål ville inte blandas: bokstäverna behåller sina egna ljud.',no:'Én skål ville ikke blande seg: Bokstavene beholder sine egne lyder.',es:'Un pocillo no se quiso mezclar: sus letras guardan su propio sonido.',it:'Un pozzetto non si è mescolato: le sue lettere tengono il proprio suono.',pt:'Um potinho não quis misturar: as letras dele guardam o próprio som.',fr:'Un godet n’a pas voulu se mélanger : ses lettres gardent leur propre son.',fi:'Yksi kuppi ei sekoittunut: sen kirjaimet pitävät omat äänteensä.'},
    hintSplit2:   {en:'Letters that keep their own sounds need a well each. Drag one into an empty well.',de:'Buchstaben mit eigenen Lauten brauchen je ein Näpfchen. Zieh einen in ein leeres Näpfchen.',nl:'Letters met een eigen klank krijgen elk een bakje. Sleep er een naar een leeg bakje.',da:'Bogstaver med hver sin lyd skal have hver sin skål. Træk det ene over i en tom skål.',sv:'Bokstäver med egna ljud behöver en skål var. Dra en till en tom skål.',no:'Bokstaver med hver sin lyd trenger hver sin skål. Dra den ene over i en tom skål.',es:'Las letras con su propio sonido necesitan un pocillo cada una. Arrastra una a un pocillo vacío.',it:'Le lettere con il proprio suono vogliono un pozzetto ciascuna. Trascinane una in un pozzetto vuoto.',pt:'Letras com som próprio precisam de um potinho cada. Arraste uma para um potinho vazio.',fr:'Les lettres qui gardent leur son ont chacune leur godet. Fais-en glisser une dans un godet vide.',fi:'Kirjaimet, joilla on oma äänne, tarvitsevat kukin oman kupin. Vedä yksi tyhjään kuppiin.'},
    hintJarEmpty: {en:'Say the word slowly. Which letter team is missing? Tap a jar.',de:'Sprich das Wort langsam. Welche Buchstabengruppe fehlt? Tippe ein Glas an.',nl:'Zeg het woord langzaam. Welke lettergroep ontbreekt? Tik een potje aan.',da:'Sig ordet langsomt. Hvilken bogstavgruppe mangler? Tryk på en krukke.',sv:'Säg ordet långsamt. Vilken bokstavsgrupp saknas? Tryck på en burk.',no:'Si ordet sakte. Hvilken bokstavgruppe mangler? Trykk på en krukke.',es:'Di la palabra despacio. ¿Qué grupo de letras falta? Toca un frasco.',it:'Di’ la parola lentamente. Quale gruppo di lettere manca? Tocca un barattolo.',pt:'Fale a palavra devagar. Qual grupo de letras está faltando? Toque em um pote.',fr:'Dis le mot lentement. Quel groupe de lettres manque ? Touche un pot.',fi:'Sano sana hitaasti. Mikä kirjainpari puuttuu? Napauta purkkia.'},
    hintJar:      {en:'That paint is not this word\'s team. Say the word slowly and listen.',de:'Diese Farbe ist nicht die Gruppe dieses Wortes. Sprich das Wort langsam und hör genau hin.',nl:'Die verf is niet de groep van dit woord. Zeg het woord langzaam en luister goed.',da:'Den farve er ikke ordets gruppe. Sig ordet langsomt, og lyt godt efter.',sv:'Den färgen är inte ordets grupp. Säg ordet långsamt och lyssna noga.',no:'Den fargen er ikke ordets gruppe. Si ordet sakte og lytt godt etter.',es:'Esa pintura no es el grupo de esta palabra. Di la palabra despacio y escucha.',it:'Quel colore non è il gruppo di questa parola. Di’ la parola lentamente e ascolta.',pt:'Essa tinta não é o grupo desta palavra. Fale a palavra devagar e escute.',fr:'Cette peinture n’est pas le groupe de ce mot. Dis le mot lentement et écoute.',fi:'Se väri ei ole tämän sanan kirjainpari. Sano sana hitaasti ja kuuntele.'},
    hintJarStart: {en:'Listen to the very start of the word. Which team do you hear?',de:'Hör auf den Anfang des Wortes. Welche Gruppe hörst du?',nl:'Luister naar het begin van het woord. Welke groep hoor je?',da:'Lyt til begyndelsen af ordet. Hvilken gruppe hører du?',sv:'Lyssna på början av ordet. Vilken grupp hör du?',no:'Lytt til begynnelsen av ordet. Hvilken gruppe hører du?',es:'Escucha el principio de la palabra. ¿Qué grupo oyes?',it:'Ascolta l’inizio della parola. Quale gruppo senti?',pt:'Escute o começo da palavra. Qual grupo você ouve?',fr:'Écoute le tout début du mot. Quel groupe entends-tu ?',fi:'Kuuntele sanan alkua. Minkä kirjainparin kuulet?'},
    hintJarEnd:   {en:'Listen to the very end of the word. Which team do you hear?',de:'Hör auf das Ende des Wortes. Welche Gruppe hörst du?',nl:'Luister naar het eind van het woord. Welke groep hoor je?',da:'Lyt til slutningen af ordet. Hvilken gruppe hører du?',sv:'Lyssna på slutet av ordet. Vilken grupp hör du?',no:'Lytt til slutten av ordet. Hvilken gruppe hører du?',es:'Escucha el final de la palabra. ¿Qué grupo oyes?',it:'Ascolta la fine della parola. Quale gruppo senti?',pt:'Escute o final da palavra. Qual grupo você ouve?',fr:'Écoute la toute fin du mot. Quel groupe entends-tu ?',fi:'Kuuntele sanan loppua. Minkä kirjainparin kuulet?'},
    hintJarMid:   {en:'Listen to the middle of the word. Which team do you hear?',de:'Hör auf die Mitte des Wortes. Welche Gruppe hörst du?',nl:'Luister naar het midden van het woord. Welke groep hoor je?',da:'Lyt til midten af ordet. Hvilken gruppe hører du?',sv:'Lyssna på mitten av ordet. Vilken grupp hör du?',no:'Lytt til midten av ordet. Hvilken gruppe hører du?',es:'Escucha el medio de la palabra. ¿Qué grupo oyes?',it:'Ascolta il centro della parola. Quale gruppo senti?',pt:'Escute o meio da palavra. Qual grupo você ouve?',fr:'Écoute le milieu du mot. Quel groupe entends-tu ?',fi:'Kuuntele sanan keskikohtaa. Minkä kirjainparin kuulet?'},
    hintSentEmpty:{en:'Look for s and h side by side. Tap each word that has them.',de:'Such s und h nebeneinander. Tippe jedes Wort an, das sie hat.',nl:'Zoek s en h naast elkaar. Tik elk woord aan dat ze heeft.',da:'Find s og h side om side. Tryk på hvert ord, der har dem.',sv:'Leta efter s och h bredvid varandra. Tryck på varje ord som har dem.',no:'Let etter s og h ved siden av hverandre. Trykk på hvert ord som har dem.',es:'Busca la s y la h juntas. Toca cada palabra que las tenga.',it:'Cerca la s e la h vicine. Tocca ogni parola che le ha.',pt:'Procure o s e o h lado a lado. Toque em cada palavra que tiver os dois.',fr:'Cherche le s et le h côte à côte. Touche chaque mot qui les a.',fi:'Etsi s ja h vierekkäin. Napauta jokaista sanaa, jossa ne ovat.'},
    hintSentMiss: {en:'Some words with sh are still clear. Read every word again.',de:'Einige Wörter mit sh sind noch leer. Lies jedes Wort noch einmal.',nl:'Een paar woorden met sh zijn nog leeg. Lees elk woord nog eens.',da:'Nogle ord med sh er stadig tomme. Læs hvert ord igen.',sv:'Några ord med sh är fortfarande tomma. Läs varje ord igen.',no:'Noen ord med sh er fortsatt tomme. Les hvert ord på nytt.',es:'Algunas palabras con sh siguen sin color. Lee otra vez cada palabra.',it:'Alcune parole con sh sono ancora senza colore. Rileggi ogni parola.',pt:'Algumas palavras com sh ainda estão sem cor. Leia cada palavra de novo.',fr:'Des mots avec sh sont encore sans couleur. Relis chaque mot.',fi:'Osa sanoista, joissa on sh, on yhä värittä. Lue jokainen sana uudelleen.'},
    hintSentExtra:{en:'A word you tapped has no sh. Tap it again to take the drop away.',de:'Ein angetipptes Wort hat kein sh. Tippe es noch einmal an.',nl:'Een woord dat je aantikte heeft geen sh. Tik het nog eens aan.',da:'Et ord, du trykkede på, har ikke sh. Tryk på det igen.',sv:'Ett ord du tryckte på har inget sh. Tryck på det igen.',no:'Et ord du trykket på, har ikke sh. Trykk på det igjen.',es:'Una palabra que tocaste no tiene sh. Tócala otra vez.',it:'Una parola che hai toccato non ha sh. Toccala di nuovo.',pt:'Uma palavra que você tocou não tem sh. Toque nela de novo.',fr:'Un mot que tu as touché n’a pas de sh. Touche-le encore.',fi:'Yhdessä napauttamassasi sanassa ei ole sh:ta. Napauta sitä uudelleen.'},
    okTeam:       {en:'{sounds}: {word}! The letters {team} share one sound.',de:'{sounds}: {word}! Die Buchstaben {team} teilen sich einen Laut.',nl:'{sounds}: {word}! De letters {team} maken samen één klank.',da:'{sounds}: {word}! Bogstaverne {team} deler én lyd.',sv:'{sounds}: {word}! Bokstäverna {team} delar ett ljud.',no:'{sounds}: {word}! Bokstavene {team} deler én lyd.',es:'{sounds}: ¡{word}! Las letras {team} forman un solo sonido.',it:'{sounds}: {word}! Le lettere {team} fanno un solo suono.',pt:'{sounds}: {word}! As letras {team} formam um som só.',fr:'{sounds} : {word} ! Les lettres {team} font un seul son.',fi:'{sounds}: {word}! Kirjaimet {team} ovat yksi äänne.'},
    okDouble:     {en:'{sounds}: {word}! {team} is the same letter twice for one sound.',de:'{sounds}: {word}! {team} ist zweimal derselbe Buchstabe für einen Laut.',nl:'{sounds}: {word}! {team} is twee keer dezelfde letter voor één klank.',da:'{sounds}: {word}! {team} er det samme bogstav to gange for én lyd.',sv:'{sounds}: {word}! {team} är samma bokstav två gånger för ett ljud.',no:'{sounds}: {word}! {team} er den samme bokstaven to ganger for én lyd.',es:'{sounds}: ¡{word}! {team} es la misma letra dos veces para un sonido.',it:'{sounds}: {word}! {team} è la stessa lettera due volte: una doppia, un suono più lungo.',pt:'{sounds}: {word}! {team} é a mesma letra duas vezes para um som.',fr:'{sounds} : {word} ! {team}, c’est deux fois la même lettre pour un son.',fi:'{sounds}: {word}! {team} on sama kirjain kahdesti.'},
    okBlend:      {en:'{sounds}: {word}! Every letter kept its own sound.',de:'{sounds}: {word}! Jeder Buchstabe hat seinen eigenen Laut behalten.',nl:'{sounds}: {word}! Elke letter hield zijn eigen klank.',da:'{sounds}: {word}! Hvert bogstav beholdt sin egen lyd.',sv:'{sounds}: {word}! Varje bokstav behöll sitt eget ljud.',no:'{sounds}: {word}! Hver bokstav beholdt sin egen lyd.',es:'{sounds}: ¡{word}! Cada letra guardó su propio sonido.',it:'{sounds}: {word}! Ogni lettera ha tenuto il suo suono.',pt:'{sounds}: {word}! Cada letra guardou o próprio som.',fr:'{sounds} : {word} ! Chaque lettre a gardé son propre son.',fi:'{sounds}: {word}! Jokainen kirjain piti oman äänteensä.'},
    okJarStart:   {en:'{word} starts with {team}!',de:'{word} fängt mit {team} an!',nl:'{word} begint met {team}!',da:'{word} begynder med {team}!',sv:'{word} börjar med {team}!',no:'{word} begynner med {team}!',es:'¡{word} empieza con {team}!',it:'{word} comincia con {team}!',pt:'{word} começa com {team}!',fr:'{word} commence par {team} !',fi:'Sana {word} alkaa kirjaimilla {team}!'},
    okJarEnd:     {en:'{word} ends with {team}!',de:'{word} hört mit {team} auf!',nl:'{word} eindigt op {team}!',da:'{word} slutter med {team}!',sv:'{word} slutar på {team}!',no:'{word} slutter på {team}!',es:'¡{word} termina en {team}!',it:'{word} finisce con {team}!',pt:'{word} termina com {team}!',fr:'{word} finit par {team} !',fi:'Sana {word} loppuu kirjaimiin {team}!'},
    okJarMid:     {en:'{team} sits in the middle of {word}!',de:'{team} steckt mitten in {word}!',nl:'{team} zit midden in {word}!',da:'{team} sidder midt i {word}!',sv:'{team} sitter mitt i {word}!',no:'{team} sitter midt i {word}!',es:'¡{team} está en medio de {word}!',it:'{team} sta in mezzo a {word}!',pt:'{team} fica no meio de {word}!',fr:'{team} est au milieu de {word} !',fi:'{team} on keskellä sanaa {word}!'},
    okSent:       {en:'{n} words with sh!',de:'{n} Wörter mit sh!',nl:'{n} woorden met sh!',da:'{n} ord med sh!',sv:'{n} ord med sh!',no:'{n} ord med sh!',es:'¡{n} palabras con sh!',it:'{n} parole con sh!',pt:'{n} palavras com sh!',fr:'{n} mots avec sh !',fi:'{n} sanaa, joissa on sh!'},
    aShelf:       {en:'Colour shelf: the words you finished',de:'Farbregal: deine fertigen Wörter',nl:'Kleurenplank: je afgemaakte woorden',da:'Farvehylde: dine færdige ord',sv:'Färghylla: dina färdiga ord',no:'Fargehylle: de ferdige ordene dine',es:'Estante de colores: las palabras que terminaste',it:'Mensola dei colori: le parole che hai finito',pt:'Prateleira de cores: as palavras que você terminou',fr:'Étagère des couleurs : les mots que tu as finis',fi:'Värihylly: valmiit sanasi'},
    aPic:         {en:'Picture: {name}. Tap to hear it.',de:'Bild: {name}. Tippen zum Anhören.',nl:'Plaatje: {name}. Tik om het te horen.',da:'Billede: {name}. Tryk for at høre det.',sv:'Bild: {name}. Tryck för att höra.',no:'Bilde: {name}. Trykk for å høre det.',es:'Dibujo: {name}. Tócalo para oírlo.',it:'Figura: {name}. Toccala per sentirla.',pt:'Figura: {name}. Toque para ouvir.',fr:'Image : {name}. Touche pour l’entendre.',fi:'Kuva: {name}. Napauta kuullaksesi.'},
    aWell:        {en:'Well {n}: {letters}',de:'Näpfchen {n}: {letters}',nl:'Bakje {n}: {letters}',da:'Skål {n}: {letters}',sv:'Skål {n}: {letters}',no:'Skål {n}: {letters}',es:'Pocillo {n}: {letters}',it:'Pozzetto {n}: {letters}',pt:'Potinho {n}: {letters}',fr:'Godet {n} : {letters}',fi:'Kuppi {n}: {letters}'},
    aWellEmpty:   {en:'Well {n}: empty',de:'Näpfchen {n}: leer',nl:'Bakje {n}: leeg',da:'Skål {n}: tom',sv:'Skål {n}: tom',no:'Skål {n}: tom',es:'Pocillo {n}: vacío',it:'Pozzetto {n}: vuoto',pt:'Potinho {n}: vazio',fr:'Godet {n} : vide',fi:'Kuppi {n}: tyhjä'},
    aLetter:      {en:'{letter} in well {n}: tap to take it out',de:'{letter} in Näpfchen {n}: tippen zum Herausnehmen',nl:'{letter} in bakje {n}: tik om eruit te halen',da:'{letter} i skål {n}: tryk for at tage det op',sv:'{letter} i skål {n}: tryck för att ta upp',no:'{letter} i skål {n}: trykk for å ta den ut',es:'{letter} en el pocillo {n}: toca para sacarla',it:'{letter} nel pozzetto {n}: tocca per toglierla',pt:'{letter} no potinho {n}: toque para tirar',fr:'{letter} dans le godet {n} : touche pour l’enlever',fi:'{letter} kupissa {n}: napauta ottaaksesi pois'},
    aDropper:     {en:'Dropper {letter}: tap to pour into the next empty well, Shift+Enter to share the last well',de:'Pipette {letter}: tippen füllt das nächste leere Näpfchen, Umschalt+Enter teilt das letzte',nl:'Pipet {letter}: tik om in het volgende lege bakje te gieten, Shift+Enter deelt het laatste',da:'Pipette {letter}: tryk for at hælde i den næste tomme skål, Shift+Enter deler den sidste',sv:'Pipett {letter}: tryck för att hälla i nästa tomma skål, Skift+Enter delar den sista',no:'Pipette {letter}: trykk for å helle i neste tomme skål, Shift+Enter deler den siste',es:'Gotero {letter}: toca para verter en el siguiente pocillo vacío, Shift+Enter comparte el último',it:'Contagocce {letter}: tocca per versare nel prossimo pozzetto vuoto, Maiusc+Invio divide l’ultimo',pt:'Conta-gotas {letter}: toque para despejar no próximo potinho vazio, Shift+Enter divide o último',fr:'Pipette {letter} : touche pour verser dans le prochain godet vide, Maj+Entrée partage le dernier',fi:'Pipetti {letter}: napauta kaataaksesi seuraavaan tyhjään kuppiin, Vaihto+Enter jakaa viimeisen'},
    aJar:         {en:'Jar {team}',de:'Glas {team}',nl:'Potje {team}',da:'Krukke {team}',sv:'Burk {team}',no:'Krukke {team}',es:'Frasco {team}',it:'Barattolo {team}',pt:'Pote {team}',fr:'Pot {team}',fi:'Purkki {team}'},
    aWord:        {en:'Word: {w}',de:'Wort: {w}',nl:'Woord: {w}',da:'Ord: {w}',sv:'Ord: {w}',no:'Ord: {w}',es:'Palabra: {w}',it:'Parola: {w}',pt:'Palavra: {w}',fr:'Mot : {w}',fi:'Sana: {w}'},
    aPoured:      {en:'{letter} poured into well {n}',de:'{letter} in Näpfchen {n} gefüllt',nl:'{letter} in bakje {n} gegoten',da:'{letter} hældt i skål {n}',sv:'{letter} hälld i skål {n}',no:'{letter} hellet i skål {n}',es:'{letter} vertida en el pocillo {n}',it:'{letter} versata nel pozzetto {n}',pt:'{letter} despejada no potinho {n}',fr:'{letter} versée dans le godet {n}',fi:'{letter} kaadettu kuppiin {n}'},
    aBack:        {en:'{letter} went back to the tray',de:'{letter} ist zurück bei den Pipetten',nl:'{letter} is terug bij de pipetten',da:'{letter} er tilbage ved pipetterne',sv:'{letter} är tillbaka bland pipetterna',no:'{letter} er tilbake blant pipettene',es:'{letter} volvió a los goteros',it:'{letter} è tornata tra i contagocce',pt:'{letter} voltou para os conta-gotas',fr:'{letter} est revenue avec les pipettes',fi:'{letter} palasi pipettien joukkoon'},
    setClue:      {en:'Clue',de:'Aufgabe',nl:'Opdracht',da:'Opgave',sv:'Uppgift',no:'Oppgave',es:'Actividad',it:'Attività',pt:'Atividade',fr:'Indice',fi:'Tehtävä'},
    cPour:        {en:'Pour the word',de:'Wort einfüllen',nl:'Giet het woord',da:'Hæld ordet',sv:'Häll ordet',no:'Hell ordet',es:'Vierte la palabra',it:'Versa la parola',pt:'Despeje a palavra',fr:'Verse le mot',fi:'Kaada sana'},
    cJars:        {en:'Team jars',de:'Gruppengläser',nl:'Groeppotjes',da:'Gruppekrukker',sv:'Gruppburkar',no:'Gruppekrukker',es:'Frascos de grupos',it:'Barattoli dei gruppi',pt:'Potes de grupos',fr:'Pots de groupes',fi:'Paripurkit'},
    cSent:        {en:'Sentence',de:'Satz',nl:'Zin',da:'Sætning',sv:'Mening',no:'Setning',es:'Frase',it:'Frase',pt:'Frase',fr:'Phrase',fi:'Lause'},
    setHelp:      {en:'Help',de:'Hilfe',nl:'Hulp',da:'Hjælp',sv:'Hjälp',no:'Hjelp',es:'Ayuda',it:'Aiuto',pt:'Ajuda',fr:'Aide',fi:'Apu'},
    hFirst:       {en:'First letter given',de:'Erster Buchstabe steht schon',nl:'Eerste letter staat er al',da:'Første bogstav er givet',sv:'Första bokstaven är ifylld',no:'Første bokstav er gitt',es:'Primera letra puesta',it:'Prima lettera già messa',pt:'Primeira letra já colocada',fr:'Première lettre donnée',fi:'Ensimmäinen kirjain annettu'},
    hNone:        {en:'Picture only',de:'Nur das Bild',nl:'Alleen het plaatje',da:'Kun billedet',sv:'Bara bilden',no:'Bare bildet',es:'Solo el dibujo',it:'Solo la figura',pt:'Só a figura',fr:'Image seule',fi:'Vain kuva'}
  },/*STRINGS-END*/

  defaults: { clue: 'pour', help: 'first' },
  settings: [
    { key: 'clue', type: 'choice', labelKey: 'setClue', options: [{ value: 'pour', labelKey: 'cPour' }, { value: 'jars', labelKey: 'cJars' }, { value: 'sentence', labelKey: 'cSent' }] },
    { key: 'help', type: 'choice', labelKey: 'setHelp', options: [{ value: 'first', labelKey: 'hFirst' }, { value: 'none', labelKey: 'hNone' }] }
  ],
  OK_MS: 4200, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._at = 0;
    this._timers = []; this._ro = null; this._view = {}; this._shelf = []; this._drag = null; this._dragEl = null; this._dragEnd = 0;
    /* the clues this locale has (Team jars: en de; Sentence: en): the settings offer only those, and a locale with
       one clue has no clue setting at all */
    var have = PaintWellsCore.clues(this._loc());
    if (have.length < 3) {
      this.settings = this.settings.map(function (f) { return f.key === 'clue' ? { key: f.key, type: f.type, labelKey: f.labelKey, options: f.options.filter(function (o) { return have.indexOf(o.value) >= 0; }) } : f; })
        .filter(function (f) { return f.key !== 'clue' || f.options.length > 1; });
      if (api.settings && have.indexOf(api.settings.clue) < 0) api.settings.clue = have[0];
    }
    injectPaintWellsCSS();
  },
  destroy: function () { this._clearTimers(); this._endDrag(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return PaintWellsCore.locale(((this.api && this.api.lang) || 'en')); },
  _clue: function () { return PaintWellsCore.clueOf(this._loc(), this._setting('clue')); },
  _help: function () { return this._setting('help') === 'none' ? 'none' : 'first'; },
  _key: function () { return this._loc() + '/' + this._clue() + '/' + this._help(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = PaintWellsCore.rounds(this._loc(), this._clue(), 0).map(function (x, i) { return i; }); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._ids = null; this._R = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = PaintWellsCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var P = C.plan(this._loc(), this._clue(), Math.random, fresh ? null : this._ids, pass), R = C.rounds(this._loc(), this._clue(), P.set);
      this._ids = P.order; this._R = R; this._order = P.order.map(function (x) { return R.indexOf(x); }); this._pos = P.pos; this._set = P.set; this._orderForPool = pool; this._pass = pass;
    }
    var r = this._roundAt(at), pa = { msg: '' }; this._pa = pa;
    return {
      id: 'paintwells.' + this._key() + '.' + (this._set || 0) + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  /* the round at a position of the pass: _order holds positions into the rounds of the pass's set */
  _roundAt: function (at) { var R = this._R || PaintWellsCore.rounds(this._loc(), this._clue(), this._set || 0); return R[this._order ? this._order[at] : at]; },
  _setPrompt: function () { var line = this._t({ pour: 'tPour', jars: 'tJars', sentence: 'tSent' }[this.st.clue]); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers(); this._endDrag(); this._at = at || 0;
    var pos = this._pos ? this._pos[this._at] : null;
    this.st = PaintWellsCore.newState(this._loc(), this._clue(), this._set || 0, r, { pos: pos, help: this._help(), rnd: Math.random });
    this._view = { note: '', ok: '', stirring: false, hover: -1 };
    this._setPrompt();
  },
  _clearHelp: function () { this._view.note = ''; },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._roundAt(0), 0); this._render2(); this._watchWidth(); },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected || self._drag) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'pw-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="pw-shelf" role="list"></div><div class="pw-top"></div><div class="pw-wells" role="group"></div><div class="pw-tray"></div><div class="pw-foot"></div><p class="pw-note" aria-live="polite"></p><p class="pw-sr" aria-live="polite"></p>';
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
    var C = PaintWellsCore, W = this._width(), w = Math.min(W, 700), B = C.band(W);
    var gap = B.wide ? 12 : 6, pad = B.tiny ? 16 : 28, well = Math.max(44, Math.min(64, Math.floor((w - 5 * gap - pad) / 6))), perRow = 6 * well + 5 * gap + pad <= w ? 6 : 3;
    var pic = B.wide ? 150 : B.tiny ? 96 : Math.max(96, Math.min(120, Math.floor(w * 0.34)));
    var dw = B.wide ? 56 : B.tiny ? 46 : 50, dh = B.wide ? 72 : B.tiny ? 60 : 64;
    return { w: w, wide: B.wide, tiny: B.tiny, gap: gap, well: well, pic: pic, dw: dw, dh: dh, rail: perRow * well + (perRow - 1) * gap + pad };
  },
  _img: function (w) { return '/image-library-webp/themes/' + w.themeDir + '/' + w.noun + '@2x.webp'; },
  _speak: function (text) { try { if (window.LCSAudio && window.LCSAudio.speak) window.LCSAudio.speak({ type: 'word', text: text, lang: this._loc(), rate: 0.85 }); } catch (e) {} },
  _sr: function (s) { var el = this._qs('.pw-sr'); if (el) el.textContent = s; },

  _paint_: function () {
    var C = PaintWellsCore, st = this.st, D = this._dims(), v = this._view, self = this;
    this._wrap.className = 'pw-wrap ' + (D.wide ? 'is-wide' : 'is-narrow') + (D.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (v.stirring ? ' is-stirring' : '') + (this.FAST ? ' is-fast' : '') + ' clue-' + st.clue;
    this._wrap.style.setProperty('--pw-well', D.well + 'px'); this._wrap.style.setProperty('--pw-gap', D.gap + 'px');
    this._wrap.style.setProperty('--pw-dw', D.dw + 'px'); this._wrap.style.setProperty('--pw-rail', D.rail + 'px'); this._wrap.style.setProperty('--pw-dh', D.dh + 'px');
    /* the colour shelf: one dried strip per finished word */
    var shelf = this._qs('.pw-shelf'); shelf.innerHTML = ''; shelf.setAttribute('aria-label', this._t('aShelf'));
    this._shelf.slice(-9).forEach(function (s) { var c = document.createElement('div'); c.className = 'pw-dried'; c.setAttribute('role', 'listitem'); c.setAttribute('aria-label', s.word); c.innerHTML = s.tiles.map(function (t) { return '<span style="background:' + t.col + '"></span>'; }).join(''); shelf.appendChild(c); });
    var top = this._qs('.pw-top'); top.innerHTML = '';
    var wells = this._qs('.pw-wells'); wells.innerHTML = '';
    var tray = this._qs('.pw-tray'); tray.innerHTML = '';
    if (st.clue === 'sentence') this._paintSentence(top, D);
    else {
      var w = C.word(st.loc, st.id), card = document.createElement('div'); card.className = 'pw-card';
      var pic = this._btn('pw-pic', 'pic', this._t('aPic', { name: w.display }), '<img src="' + this._img(w) + '" alt="" width="' + D.pic + '" height="' + D.pic + '" draggable="false">');
      pic.style.width = pic.style.height = (D.pic + 10) + 'px';
      pic.addEventListener('click', function () { self._speak(w.display); });
      card.appendChild(pic);
      if (st.done) { var strip = document.createElement('div'); strip.className = 'pw-strip'; strip.innerHTML = this._tiles(st.loc, st.id, true); card.appendChild(strip); }
      top.appendChild(card);
      wells.setAttribute('aria-label', w.display);
      if (st.clue === 'pour') { this._paintWells(wells, D); this._paintTray(tray, D); }
      else { this._paintJarWells(wells, D); this._paintJars(tray, D); }
    }
    var foot = this._qs('.pw-foot'); foot.innerHTML = '';
    var chk = this._btn('pw-check', 'check', null, '<svg class="pw-paddle" viewBox="0 0 30 30" width="26" height="26" aria-hidden="true"><path d="M7 26 L19 8" stroke="#FFF8EC" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="21" cy="6" rx="5" ry="3.4" transform="rotate(-56 21 6)" fill="#FFF8EC"/></svg><span>' + esc(this._t('check')) + '</span>');
    chk.disabled = st.done || v.stirring; chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.pw-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'pw-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'pw-note is-hint'; }
    else { note.textContent = ''; note.className = 'pw-note'; }
  },
  /* the word's colour code: one tile per sound */
  _tiles: function (loc, id, letters) {
    var w = PaintWellsCore.word(loc, id), s = PaintWellsCore.strip(loc, id);
    return s.map(function (t, i) { var col = gColour(loc, t.g); return '<span class="pw-tile" style="background:' + col + ';color:' + inkOn(col) + '">' + (letters ? esc(w.boxes[i]) : '') + '</span>'; }).join('');
  },
  /* ---- Pour: six wells, each a glass of paint with its letters floating on it ---- */
  _paintWells: function (wells, D) {
    var C = PaintWellsCore, st = this.st, v = this._view, self = this, marks = st.marks ? st.marks.wells : null, ghosts = C.ghosts(st);
    for (var i = 0; i < C.WELLS; i++) (function (i) {
      var ds = st.wells[i], m = marks ? marks[i] : null, letters = ds.map(function (d) { return st.tray[d].c; });
      var last = ds.length - 1, lastLocked = last >= 0 && ds[last] === st.locked;
      var el = self._btn('pw-well' + (ds.length ? '' : ' is-empty') + (m ? ' is-' + m : '') + (v.hover === i ? ' is-hover' : '') + (st.done ? ' is-dry' : '') + (lastLocked ? ' is-locked' : ''), 'well-' + i,
        ds.length ? self._t('aWell', { n: i + 1, letters: letters.join(' ') }) + (lastLocked || st.done ? '' : '. ' + self._t('aLetter', { letter: letters[last], n: i + 1 })) : self._t('aWellEmpty', { n: i + 1 }));
      el.setAttribute('data-well', String(i));
      el.disabled = st.done; if (!ds.length || lastLocked) el.tabIndex = -1;
      if (ds.length && !lastLocked && !st.done) {
        self._wireDrag(el, { type: 'well', w: i, k: last });
        el.addEventListener('click', function () { if (self._afterDrag(el)) return; self._take(i, last); });
        el.addEventListener('keydown', function (e) { if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); self._take(i, last); } });
      }
      var txt = letters.join('').toLowerCase(), mixed = m === 'ok' || st.done;
      var paint = document.createElement('div'); paint.className = 'pw-paint';
      if (ds.length && mixed) paint.style.background = gColour(st.loc, txt);
      else if (ds.length && m === 'split') paint.style.background = 'linear-gradient(90deg,' + letters.map(function (c, k) { var col = letterColour(c); return col + ' ' + Math.round(k * 100 / letters.length) + '%,' + col + ' ' + Math.round((k + 1) * 100 / letters.length) + '%'; }).join(',') + ')';
      else if (ds.length && m === 'wrong') paint.style.background = '#A9A49A';
      el.appendChild(paint);
      if (m === 'split') { var crack = document.createElement('div'); crack.className = 'pw-crack'; el.appendChild(crack); }
      var row = document.createElement('div'); row.className = 'pw-lets';
      ds.forEach(function (d, k) {
        var c = st.tray[d].c, b = document.createElement('span'); b.className = 'pw-let' + (mixed ? ' is-mixed' : '') + (d === st.locked ? ' is-locked' : ''); b.setAttribute('aria-hidden', 'true'); b.textContent = c;
        if (!mixed) { var col = m === 'wrong' ? '#8D877C' : letterColour(c); b.style.background = col; b.style.color = inkOn(col); }
        else b.style.color = inkOn(gColour(st.loc, txt));
        row.appendChild(b);
      });
      el.appendChild(row);
      if (!ds.length && ghosts && ghosts[i]) { var gh = document.createElement('span'); gh.className = 'pw-ghost'; gh.textContent = ghosts[i]; el.appendChild(gh); }
      if (m === 'gap') { var notch = document.createElement('span'); notch.className = 'pw-notch'; el.appendChild(notch); }
      wells.appendChild(el);
    })(i);
  },
  _paintTray: function (tray, D) {
    var C = PaintWellsCore, st = this.st, self = this, bright = C.bright(st);
    tray.setAttribute('aria-label', '');
    st.tray.forEach(function (x, d) {
      var inWell = C.used(st, d) >= 0, col = letterColour(x.c), dim = bright && bright.indexOf(x.c.toLowerCase()) < 0;
      var b = self._btn('pw-drop' + (inWell ? ' is-used' : '') + (dim ? ' is-dim' : ''), 'drop-' + d, self._t('aDropper', { letter: x.c }),
        '<svg class="pw-bulb" viewBox="0 0 40 20" aria-hidden="true"><path d="M8 18 Q8 3 20 3 Q32 3 32 18 Z" fill="#3A2E1F"/></svg><span class="pw-drip" style="background:' + (inWell ? 'transparent' : col) + ';color:' + inkOn(col) + '">' + esc(x.c) + '</span>');
      b.disabled = inWell || st.done;
      self._wireDrag(b, { type: 'drop', d: d });
      b.addEventListener('click', function () { if (self._afterDrag(b)) return; self._pour(d, 'next'); });
      b.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && e.shiftKey) { e.preventDefault(); var last = -1; st.wells.forEach(function (x2, i) { if (x2.length) last = i; }); self._pour(d, last >= 0 ? last : 'next'); }
      });
      tray.appendChild(b);
    });
  },
  /* ---- Team jars: the word poured but one well; three jars of team paint ---- */
  _paintJarWells: function (wells, D) {
    var C = PaintWellsCore, st = this.st, self = this, w = C.word(st.loc, st.id);
    w.boxes.forEach(function (g, i) {
      var el = document.createElement('div'), empty = i === st.e, picked = empty && st.picked != null ? st.jars[st.picked] : null;
      var wrong = empty && st.marks && st.marks.kind === 'jar';
      el.className = 'pw-well' + (empty && !picked ? ' is-empty is-target' : '') + (wrong ? ' is-wrong' : '') + (st.done ? ' is-dry' : '');
      el.setAttribute('role', 'group');
      var t = empty ? picked : g.toLowerCase(), col = t ? (wrong ? '#A9A49A' : gColour(st.loc, t)) : null;
      el.setAttribute('aria-label', t ? self._t('aWell', { n: i + 1, letters: empty ? picked : g }) : self._t('aWellEmpty', { n: i + 1 }));
      el.innerHTML = '<div class="pw-paint"' + (col ? ' style="background:' + col + '"' : '') + '></div>' + (t ? '<div class="pw-lets"><span class="pw-let is-mixed is-static" style="color:' + inkOn(col) + '">' + esc(empty ? picked : g) + '</span></div>' : '');
      wells.appendChild(el);
    });
  },
  _paintJars: function (tray, D) {
    var st = this.st, self = this;
    st.jars.forEach(function (team, k) {
      var col = gColour(st.loc, team), b = self._btn('pw-jar' + (st.picked === k ? ' is-sel' : ''), 'jar-' + k, self._t('aJar', { team: team }),
        '<span class="pw-jarlid"></span><span class="pw-jarbody" style="background:' + col + ';color:' + inkOn(col) + '">' + esc(team) + '</span>');
      b.disabled = st.done; b.setAttribute('aria-pressed', st.picked === k ? 'true' : 'false');
      b.addEventListener('click', function () { if (PaintWellsCore.pourJar(st, k) === 'poured') { self.api.sound(620); self._clearHelp(); self._sr(self._t('aPoured', { letter: team, n: st.e + 1 })); self._paint(); } });
      tray.appendChild(b);
    });
  },
  /* ---- Sentence: a paper strip of words; tap the ones with sh; Check runs green into them ---- */
  _paintSentence: function (top, D) {
    var st = this.st, self = this, checked = st.marks || st.done;
    var paper = document.createElement('div'); paper.className = 'pw-paper';
    st.words.forEach(function (wd, i) {
      var html = esc(wd.t);
      if (checked && st.tapped[i] && wd.has) html = esc(wd.t).replace(/(sh)/gi, '<b class="pw-sh">$1</b>');
      var b = self._btn('pw-word' + (st.tapped[i] ? ' is-tap' : '') + (checked && st.tapped[i] && !wd.has ? ' is-clear' : '') + (st.done && wd.has ? ' is-found' : ''), 'word-' + i, self._t('aWord', { w: wd.t }), html);
      b.setAttribute('aria-pressed', st.tapped[i] ? 'true' : 'false'); b.disabled = st.done;
      b.addEventListener('click', function () { if (PaintWellsCore.tapWord(st, i) !== 'no') { self.api.sound(st.tapped[i] ? 640 : 380); self._clearHelp(); self._paint(); } });
      paper.appendChild(b);
    });
    top.appendChild(paper);
    var n = st.done ? st.words.filter(function (w) { return w.has; }).length : 0, jar = document.createElement('div'); jar.className = 'pw-countjar'; jar.setAttribute('aria-hidden', 'true');
    jar.innerHTML = '<span class="pw-jarlid"></span><span class="pw-jarglass">' + new Array(n + 1).join('<i></i>') + '</span>';
    top.appendChild(jar);
  },

  /* ---------------- the hand: tap pours into the next empty well, a drag pours into the well under it ---------------- */
  _wireDrag: function (el, src) {
    var self = this;
    el.addEventListener('pointerdown', function (e) {
      if (e.button != null && e.button !== 0) return; if (el.disabled || self.st.done) return;
      var dr = { src: src, el: el, x: e.clientX, y: e.clientY, moved: false, ghost: null };
      self._endDrag(); self._drag = dr;
      dr.move = function (ev) {
        if (!dr.moved && Math.abs(ev.clientX - dr.x) + Math.abs(ev.clientY - dr.y) < 8) return;
        if (!dr.moved) {
          dr.moved = true; el.classList.add('is-dragging');
          var c = src.type === 'drop' ? self.st.tray[src.d].c : self.st.tray[self.st.wells[src.w][src.k]].c, col = letterColour(c);
          var g = document.createElement('div'); g.className = 'pw-dragdrop'; g.textContent = c; g.style.background = col; g.style.color = inkOn(col); document.body.appendChild(g); dr.ghost = g;
        }
        ev.preventDefault();
        dr.ghost.style.left = ev.clientX + 'px'; dr.ghost.style.top = ev.clientY + 'px';
        var w = self._wellAt(ev.clientX, ev.clientY); if (w !== self._view.hover) { self._view.hover = w; self._markHover(w); }
      };
      dr.up = function (ev) {
        var moved = dr.moved, w = moved ? self._wellAt(ev.clientX, ev.clientY) : -1, onTray = moved && self._onTray(ev.clientX, ev.clientY);
        self._endDrag();
        if (!moved) return;
        self._dragEl = el; self._dragEnd = Date.now();
        if (src.type === 'drop') { if (w >= 0) self._pour(src.d, w); else self._paint(); }
        else if (w >= 0 && w !== src.w) self._move(src.w, src.k, w);
        else if (onTray) self._take(src.w, src.k);
        else self._paint();
      };
      window.addEventListener('pointermove', dr.move, { passive: false }); window.addEventListener('pointerup', dr.up); window.addEventListener('pointercancel', dr.up);
    });
  },
  /* the click a browser fires after a drag released over the element it started from — not a tap */
  _afterDrag: function (el) { return this._dragEl === el && Date.now() - this._dragEnd < 400; },
  _endDrag: function () {
    var dr = this._drag; if (!dr) return;
    window.removeEventListener('pointermove', dr.move); window.removeEventListener('pointerup', dr.up); window.removeEventListener('pointercancel', dr.up);
    if (dr.ghost && dr.ghost.parentNode) dr.ghost.parentNode.removeChild(dr.ghost);
    if (dr.el) dr.el.classList.remove('is-dragging');
    this._drag = null; this._view.hover = -1; this._markHover(-1);
  },
  _wellAt: function (x, y) { var els = this._wrap ? this._wrap.querySelectorAll('[data-well]') : []; for (var i = 0; i < els.length; i++) { var r = els[i].getBoundingClientRect(); if (x >= r.left - 4 && x <= r.right + 4 && y >= r.top - 6 && y <= r.bottom + 6) return +els[i].getAttribute('data-well'); } return -1; },
  _onTray: function (x, y) { var t = this._qs('.pw-tray'); if (!t) return false; var r = t.getBoundingClientRect(); return x >= r.left && x <= r.right && y >= r.top - 10 && y <= r.bottom + 10; },
  _markHover: function (w) { if (!this._wrap) return; var els = this._wrap.querySelectorAll('[data-well]'); for (var i = 0; i < els.length; i++) els[i].classList.toggle('is-hover', +els[i].getAttribute('data-well') === w); },
  _pour: function (d, w) {
    var st = this.st, r = PaintWellsCore.pour(st, d, w);
    if (r === 'full') { this.api.sound(200); this._paint(); return; }
    if (r !== 'poured') { this._paint(); return; }
    var at = PaintWellsCore.used(st, d);
    this.api.sound(520 + at * 30); this._clearHelp(); this._sr(this._t('aPoured', { letter: st.tray[d].c, n: at + 1 }));
    this._paint();
  },
  _take: function (w, k) {
    var st = this.st, d = st.wells[w] ? st.wells[w][k] : null, r = PaintWellsCore.take(st, w, k);
    if (r !== 'taken') { if (r === 'locked') this.api.sound(200); return; }
    this.api.sound(330); this._clearHelp(); this._sr(this._t('aBack', { letter: st.tray[d].c })); this._paint();
  },
  _move: function (w, k, to) {
    var st = this.st, d = st.wells[w][k], r = PaintWellsCore.move(st, w, k, to);
    if (r !== 'moved') { this.api.sound(200); this._paint(); return; }
    this.api.sound(560); this._clearHelp(); this._sr(this._t('aPoured', { letter: st.tray[d].c, n: to + 1 })); this._paint();
  },

  /* ---------------- Check: the paddle stirs ---------------- */
  _check: function () {
    var C = PaintWellsCore, st = this.st, v = this._view, self = this;
    if (st.done || v.stirring) return;
    var a = C.check(st);
    if (a.result === 'tray') { this.api.sound(200); v.note = this._t(C.hint(st).key); this._paint(); this.api.announce(v.note); return; }
    var finish = function () {
      v.stirring = false;
      if (a.result === 'ok') { self._success(); return; }
      self.api.sound(220); v.note = self._t(C.hint(st).key); self._paint(); self.api.announce(v.note);
    };
    if (this.FAST) { finish(); return; }
    v.stirring = true; v.note = ''; this._paint(); this.api.sound(440);
    this._later(finish, 520);
  },
  _success: function () {
    var C = PaintWellsCore, st = this.st, v = this._view, self = this;
    if (st.clue === 'sentence') {
      v.ok = this._t('okSent', { n: st.words.filter(function (w) { return w.has; }).length });
    } else {
      var w = C.word(st.loc, st.id), sounds = w.boxes.join('–');
      if (st.clue === 'jars') { var team = w.boxes[st.e], p = C.place(st); v.ok = this._t('okJar' + p, { word: w.display, team: team }); }
      else { var L = C.lead(st.loc, st.id); v.ok = this._t(!L ? 'okBlend' : L.kind === 'team' ? 'okTeam' : 'okDouble', { sounds: sounds, word: w.display, team: L ? w.boxes[C.graphemes(st.loc, st.id).indexOf(L.g)] : '' }); }
      this._shelf.push({ word: w.display, tiles: C.strip(st.loc, st.id).map(function (t) { return { col: gColour(st.loc, t.g) }; }) });
    }
    this.api.sound(988); this._paint(); this.api.announce(v.ok);
    this._advance(v.ok.length * 60 + 3600);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, Math.max(this.OK_MS, this.OK_MS === 4200 ? ms : 0));
  }
};

/* ---- the paint: every letter its own colour; a team its own new colour; a doubled letter a deeper shade ---- */
var PW_LETTER = {
  a: '#E8603C', b: '#7A4E2D', c: '#C0392B', d: '#6B4FA3', e: '#E06A9A', f: '#B03A6B', g: '#2E7D32', h: '#F2C230', i: '#29A3A3',
  j: '#8D6CC0', k: '#5C7486', l: '#B97A3F', m: '#9E3D7F', n: '#1F7A8C', o: '#F08A24', p: '#5D6D1F', q: '#455A64', r: '#9B59B6',
  s: '#2C6FD1', t: '#B5513A', u: '#3BAA72', v: '#6C63D6', w: '#5A8F3A', x: '#9A5B2E', y: '#D4A72C', z: '#6E7F3A'
};
var PW_FOLD = { 'å': 'a', 'ä': 'a', 'æ': 'a', 'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ö': 'o', 'ø': 'o', 'ó': 'o', 'ò': 'o', 'ô': 'o', 'õ': 'o', 'ü': 'u', 'ú': 'u', 'é': 'e', 'è': 'e', 'ê': 'e', 'í': 'i', 'ì': 'i', 'ñ': 'n', 'ç': 'c', 'ß': 's' };
var PW_TEAM = { sh: '#2E9E5B', sch: '#2E9E5B', ch: '#E67E22', ck: '#4A6FA5', th: '#8E44AD', wh: '#4F8A8B', ng: '#2F7C8C', qu: '#8C6D1F', gn: '#7A4FB0', sc: '#2B7A78', lh: '#B0436E', nh: '#6F7F22', tz: '#9C4A1A', ll: '#B5442A', rr: '#A3304F' };
function letterColour(c) { c = String(c).toLowerCase(); c = PW_FOLD[c] || c; return PW_LETTER[c] || '#7A6A55'; }
function darken(hex, f) { var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; f = 1 - f; return '#' + [r, g, b].map(function (x) { return ('0' + Math.round(x * f).toString(16)).slice(-2); }).join(''); }
function gColour(loc, g) {
  g = String(g).toLowerCase(); var k = PaintWellsCore.gKind(loc, g);
  if (k === 'single') return letterColour(g);
  if (k === 'double') return darken(letterColour(g[0]), 0.28);
  return PW_TEAM[g] || darken(letterColour(g[0]), 0.4);
}
function inkOn(hex) { var n = parseInt(String(hex).slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; return (0.299 * r + 0.587 * g + 0.114 * b) > 160 ? '#2B1D0E' : '#FFFDF6'; }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectPaintWellsCSS() {
  if (typeof document === 'undefined' || document.getElementById('pw-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif";
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.pw-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:12px;user-select:none;-webkit-user-select:none;} .pw-wrap:focus{outline:none;} .pw-wrap.is-narrow{gap:9px;}'
  + '.pw-shelf{display:flex;gap:6px;min-height:22px;justify-content:center;flex-wrap:wrap;} .pw-dried{display:flex;height:18px;border-radius:5px;overflow:hidden;box-shadow:0 0 0 1.5px #3A2E1F;} .pw-dried span{display:block;width:14px;height:100%;} .pw-wrap.is-tiny .pw-shelf{display:none;}'
  + '.pw-top{display:flex;justify-content:center;width:100%;} .pw-card{display:flex;flex-direction:column;align-items:center;gap:8px;}'
  + '.pw-pic{display:flex;align-items:center;justify-content:center;padding:0;border:3px solid #3A2E1F;border-radius:18px;background:#FFF8EC;cursor:pointer;} .pw-pic img{display:block;object-fit:contain;pointer-events:none;}'
  + '.pw-strip{display:flex;gap:3px;animation:pwRise .5s ease-out;} .pw-tile{display:flex;align-items:center;justify-content:center;min-width:34px;height:34px;padding:0 6px;border-radius:7px;box-shadow:inset 0 0 0 2px rgba(43,29,14,.55);font-family:' + H + ';font-weight:800;font-size:22px;line-height:1;} .pw-wrap.is-fast .pw-strip{animation:none;} @keyframes pwRise{from{transform:translateY(18px);opacity:0;}to{transform:none;opacity:1;}}'
  + '.pw-wells{display:flex;flex-wrap:wrap;justify-content:center;gap:var(--pw-gap);box-sizing:border-box;width:var(--pw-rail);padding:10px 14px 12px;border-radius:18px;background:linear-gradient(#C99560,#A8743F);box-shadow:inset 0 -4px 0 rgba(58,46,31,.35),0 2px 0 #6B4A26;}'
  + '.pw-well{position:relative;width:var(--pw-well);height:var(--pw-well);padding:0;border:0;cursor:pointer;touch-action:none;font:inherit;border-radius:50%;background:radial-gradient(circle at 35% 30%,#FFFFFF 0,#EEF6F5 30%,#D3E3E1 100%);box-shadow:inset 0 3px 6px rgba(58,46,31,.35),0 0 0 3px #6B4A26;display:flex;align-items:center;justify-content:center;transition:transform .14s;}'
  + '.pw-well.is-hover{transform:scale(1.08);box-shadow:inset 0 3px 6px rgba(58,46,31,.35),0 0 0 3px #F4CF62;} .pw-well.is-target{box-shadow:inset 0 3px 6px rgba(58,46,31,.35),0 0 0 3px #F4CF62;animation:pwPulse 1.4s ease-in-out infinite;} .pw-wrap.is-fast .pw-well.is-target{animation:none;} @keyframes pwPulse{50%{transform:scale(1.06);}}'
  + '.pw-paint{position:absolute;inset:5px;border-radius:50%;} .pw-well.is-ok .pw-paint,.pw-well.is-dry .pw-paint{box-shadow:inset 0 0 0 2.5px #2B1D0E;}'
  + '.pw-wrap.is-stirring .pw-well:not(.is-empty) .pw-paint{animation:pwSwirl .5s linear;} @keyframes pwSwirl{to{transform:rotate(360deg);}}'
  + '.pw-well.is-split .pw-paint{box-shadow:inset 0 0 0 2.5px #2B1D0E;} .pw-crack{position:absolute;left:50%;top:2px;bottom:2px;width:0;border-left:2.5px dashed #2B1D0E;}'
  + '.pw-well.is-lean{box-shadow:inset 0 3px 6px rgba(58,46,31,.35),0 0 0 3px #E0503C;} .pw-well.is-lean .pw-lets{animation:pwLean 1.2s ease-in-out infinite;} .pw-wrap.is-fast .pw-well.is-lean .pw-lets{animation:none;transform:translateX(3px);} @keyframes pwLean{50%{transform:translateX(4px) rotate(4deg);}}'
  + '.pw-well.is-wrong{box-shadow:inset 0 3px 6px rgba(58,46,31,.35),0 0 0 3px #E0503C;} .pw-well.is-wrong .pw-let{box-shadow:0 0 0 2.5px #E0503C;}'
  + '.pw-notch{position:absolute;right:-9px;top:50%;width:14px;height:14px;margin-top:-7px;border-radius:50%;background:#E0503C;box-shadow:0 0 0 2px #FFF8EC;} .pw-well.is-gap{box-shadow:inset 0 3px 6px rgba(58,46,31,.35),0 0 0 3px #E0503C;}'
  + '.pw-lets{position:relative;display:flex;gap:2px;align-items:center;justify-content:center;}'
  + '.pw-let{display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:30px;padding:0 4px;border-radius:15px;font-family:' + H + ';font-weight:800;font-size:20px;line-height:1;box-shadow:0 1px 0 rgba(43,29,14,.4);pointer-events:none;} .pw-well.is-empty,.pw-well.is-locked,.pw-well:disabled{cursor:default;} .pw-let.is-mixed{background:transparent;box-shadow:none;font-size:23px;padding:0;min-width:0;} .pw-let.is-locked{cursor:default;outline:2px dotted rgba(43,29,14,.6);outline-offset:1px;} .pw-let.is-static{cursor:default;display:inline-flex;align-items:center;}'
  + '.pw-wrap.is-narrow .pw-let{min-width:18px;height:26px;font-size:17px;padding:0 3px;} .pw-wrap.is-narrow .pw-let.is-mixed{font-size:19px;padding:0;}'
  + '.pw-ghost{position:absolute;font-family:' + H + ';font-weight:800;font-size:22px;color:rgba(43,29,14,.28);}'
  + '.pw-tray{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;max-width:640px;} .pw-wrap.is-narrow .pw-tray{gap:7px;max-width:320px;}'
  + '.pw-drop{position:relative;width:var(--pw-dw);height:var(--pw-dh);padding:0;border:0;background:none;cursor:grab;touch-action:none;display:flex;flex-direction:column;align-items:center;} .pw-bulb{width:58%;height:auto;display:block;}'
  + '.pw-drip{display:flex;align-items:center;justify-content:center;width:100%;flex:1;margin-top:-2px;border-radius:12px 12px 50% 50%;box-shadow:inset 0 0 0 2.5px #3A2E1F;font-family:' + H + ';font-weight:800;font-size:30px;line-height:1;} .pw-wrap.is-narrow .pw-drip{font-size:26px;}'
  + '.pw-drop.is-used{cursor:default;} .pw-drop.is-used .pw-drip{color:transparent !important;box-shadow:inset 0 0 0 2px #C9B48F;} .pw-drop.is-used .pw-bulb path{fill:#C9B48F;} .pw-drop.is-dim{opacity:.28;} .pw-drop.is-dragging{opacity:.4;}'
  + '.pw-dragdrop{position:fixed;z-index:9999;pointer-events:none;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50% 50% 50% 8%;transform:rotate(45deg);display:flex;align-items:center;justify-content:center;font-family:' + H + ';font-weight:800;font-size:26px;box-shadow:0 4px 10px rgba(0,0,0,.25);} '
  + '.pw-jar{position:relative;width:76px;height:96px;padding:0;border:0;background:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;} .pw-jarlid{display:block;width:62%;height:12px;border-radius:4px;background:#6B4A26;} .pw-jarbody{display:flex;align-items:center;justify-content:center;width:100%;flex:1;margin-top:2px;border-radius:10px 10px 16px 16px;box-shadow:inset 0 0 0 3px #3A2E1F,inset 6px 0 0 rgba(255,255,255,.25);font-family:' + H + ';font-weight:800;font-size:28px;} .pw-jar.is-sel .pw-jarbody{box-shadow:inset 0 0 0 3px #3A2E1F,0 0 0 4px #F4CF62;} .pw-tray .pw-jar + .pw-jar{margin-left:10px;}'
  + '.pw-paper{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 10px;max-width:600px;padding:16px 18px;border-radius:10px;background:#FFFDF6;box-shadow:0 0 0 2px #E2CFAE,0 3px 0 #C9B48F;}'
  + '.pw-word{min-height:48px;min-width:48px;padding:4px 10px;border:2px solid transparent;border-radius:12px;background:transparent;font-family:' + H + ';font-weight:700;font-size:26px;color:#2B1D0E;cursor:pointer;} .pw-word.is-tap{border-color:#3A2E1F;background:#FFF2C9;} .pw-word.is-clear{border-color:#E0503C;background:#FFFDF6;} .pw-word.is-found{border-color:#2E9E5B;background:#E4F5EA;} .pw-sh{color:#FFFDF6;background:#2E9E5B;border-radius:6px;padding:0 2px;font-weight:800;}'
  + '.pw-clue-sentence .pw-top{flex-direction:column;align-items:center;gap:10px;} .pw-wrap.clue-sentence .pw-top{flex-direction:column;align-items:center;gap:10px;} .pw-wrap.clue-sentence .pw-wells,.pw-wrap.clue-sentence .pw-tray{display:none;}'
  + '.pw-countjar{display:flex;flex-direction:column;align-items:center;} .pw-jarglass{display:flex;flex-wrap:wrap-reverse;align-content:flex-start;justify-content:center;gap:3px;width:70px;min-height:56px;padding:6px;border-radius:8px 8px 14px 14px;box-shadow:inset 0 0 0 3px #3A2E1F;background:#EEF6F5;} .pw-jarglass i{display:block;width:14px;height:14px;border-radius:50% 50% 50% 10%;transform:rotate(45deg);background:#2E9E5B;}'
  + '.pw-foot{display:flex;justify-content:center;width:100%;}'
  + '.pw-check{display:inline-flex;align-items:center;gap:8px;min-width:150px;min-height:54px;padding:8px 26px;border:0;border-radius:16px;background:#1F8A78;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;box-shadow:0 4px 0 #0E5A4D;cursor:pointer;} .pw-check:disabled{opacity:.5;cursor:default;} .pw-wrap.is-stirring .pw-paddle{animation:pwPaddle .5s linear;} @keyframes pwPaddle{50%{transform:translateX(10px) rotate(14deg);}}'
  + '.pw-note{margin:0;min-height:1.3em;max-width:560px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .pw-note.is-hint{color:#8A3B1F;} .pw-wrap.is-narrow .pw-note{font-size:17px;}'
  + '.pw-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.pw-wrap.is-tiny .pw-check{min-width:112px;padding:8px 14px;font-size:20px;} .pw-wrap.is-tiny .pw-wells{padding:8px 8px 10px;} .pw-wrap.is-tiny .pw-word{font-size:22px;padding:4px 6px;}'
  + '.pw-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'pw-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.PaintWellsActivity = PaintWellsActivity;
