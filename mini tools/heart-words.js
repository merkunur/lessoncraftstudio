/* =====================================================================
   TOOL #21 — HEART WORDS   (heart-words.js)
   ---------------------------------------------------------------------
   Free-play manipulative (no `tasks` — the shell renders zero activity
   chrome). Reading Corner.

   PEDAGOGY (the Science-of-Reading "heart word" routine):
     A high-frequency IRREGULAR word sits in sound boxes with its
     spelling ALWAYS VISIBLE (this is not a spelling test — you cannot
     map a word to a spelling you cannot see). The child taps each box
     to mark the sounds. Regular parts get a quiet seat line; the part
     that CANNOT be got from the code gets a HEART SEAL on the corner of
     the tile — letters still fully readable — with a warm spoken
     "this part we learn by heart".

     - `boxes[]` are grapheme chunks ALIGNED 1:1 TO PHONEMES (the Sound
       Boxes contract), so join(boxes)+splitTail+silentTail always spells
       the word.
     - `heart[]` are INDEXES into boxes[]. The ratio invariant is
       heart.length <= min(2, floor(boxes/2)) and exactly 1 in the K band
       (gate D8'): a word where most parts are hearted is whole-word
       memorisation, the exact pedagogy SoR replaced. The regular parts
       ARE the lesson.
     - THE ROUTINE HAS AN ENDING. say -> map -> WRITE -> check. Ehri's
       account of orthographic mapping is that the spelling-to-sound bond
       consolidates through RETRIEVAL, not through looking; a child who
       only ever looks at a mapped word has watched the lesson happen.
       `hw-face-write` is that ending, and the CHILD does the comparing —
       which is both the pedagogy and this tool's own no-verdict law.
     - NO isolated-phoneme TTS anywhere. Speech is locked to whole words
       (type:'word') and UI lines (type:'ui'). Synthetic "buh" is
       pedagogy poison; the teacher's mouth is the phoneme model.
     - NO VERDICTS. Every box is tappable and no tap is ever refused, so
       there is no wrong tap available. Confirmation is MATERIAL (the
       tile presses in, a seat line draws) — never a symbol, never a
       colour coding rightness, never a word.
     - NO scores, timers, streaks, counts. The bookshelf shows the words
       themselves, never "12 of 40".

   THREE SURFACES (this.surface):
     'board' — the child's surface, the one on the projector.
     'big'   — the same board as a presentation state. It exists because
               of a MEASUREMENT: the tool page pins the iframe at 704px on
               every desktop, where a 6-box word rendered 34px letters.
               Nobody at the back of a classroom reads 34px.
     'desk'  — adult-facing. IN FLOW, never a modal, and that is forced
               rather than chosen: the iframe height is content-driven by
               a ResizeObserver on .lcs-app, so a position:fixed panel is
               out of flow and CAN NEVER MAKE THE IFRAME GROW — it gets
               squeezed into ~610px, which does not fit the editor.

   THE LAW CHANGES AT THE SEAM. The no-verdict / no-words discipline binds
   the BOARD. The DESK is adult-facing and may use plain adult sentences —
   caps, duplicate notices, constraint reasons. Precedent: dictation-desk.

   TEN LOCALES — NOT Finnish. Finnish orthography is transparent: Seymour,
   Aro & Erskine (2003) measured Finnish Grade-1 word reading at near
   ceiling against ~34% for English. `nk`/`ng` is a regular grapheme (it
   is already in Sound Boxes' fi inventory), gradation is morphophonology
   with faithful spelling in BOTH forms, `-nut/-nyt` is connected speech,
   and loanwords are not K-2 frequency. Manufacturing a Finnish heart-word
   bank would be a fabricated product category. A fi visitor is routed to
   Sound Boxes instead — and that honesty is a credibility asset.

   PREMIUM (free-taste): shelf 1 is a COMPLETE routine — mapping, heart,
   WRITE, flip, sentence, illustration, bookshelf, review ring, and the
   printable word cards. Premium adds shelves 2-12, the saved custom-word
   list, and the wall/take-home sheets. The gate is STRUCTURAL:
   wordsForShelf() returns [] for a locked shelf, so premium words never
   reach the DOM, and deep links are held until entitlement is known.
   The taste is the ROUTINE, not the volume — a teacher who has run the
   whole routine once knows what 110 more words are worth; a teacher who
   has seen ten words and a locked door does not.
   ===================================================================== */
var HeartWords = {
  id: 'heart-words',

  strings: {
    title:        {en:'Heart Words',de:'Merkwörter',fr:'Mots à cœur',it:'Parole del cuore',es:'Palabras con corazón',pt:'Palavras de coração',nl:'Hartwoorden',sv:'Hjärteord',da:'Hjerteord',no:'Hjerteord'},
    instruction:  {en:'Tap each box to mark the sounds. A heart marks the part we learn by heart.',de:'Tippe auf jede Lautbox und markiere die Laute. Ein Herz zeigt den Teil, den wir uns merken.',fr:'Touche chaque case pour marquer les sons. Le cœur montre la partie qui se retient.',it:'Tocca ogni casella per seguire la parola. Un cuore indica la parte da imparare a memoria.',es:'Toca cada caja para marcar los sonidos. Un corazón señala la parte que aprendemos de memoria.',pt:'Toque em cada caixa para marcar os sons. Um coração mostra a parte que guardamos de cor.',nl:'Tik op elk vakje om de klanken te markeren. Het hartje wijst het stukje aan dat je uit je hoofd leert.',sv:'Tryck på varje ruta för att markera ljuden. Ett hjärta visar delen vi lär oss utantill.',da:'Tryk på hver boks for at markere lydene. Et hjerte viser den del, vi lærer udenad.',no:'Trykk på hver boks for å markere lydene. Et hjerte viser den delen vi lærer utenat.'},

    /* the heart moment */
    heartLine:    {en:'This part we learn by heart.',de:'Diesen Teil merken wir uns.',fr:'Cette partie, on la retient par cœur.',it:'Questa parte la impariamo a memoria.',es:'Esta parte la aprendemos de memoria.',pt:'Esta parte a gente guarda de cor.',nl:'Dit stukje leren we uit ons hoofd.',sv:'Den här delen lär vi oss utantill.',da:'Den her del lærer vi udenad.',no:'Denne delen lærer vi utenat.'},
    wordKnown:    {en:'We know {word} by heart now.',de:'Jetzt kennen wir {word} auswendig.',fr:'Maintenant, on connaît {word} par cœur.',it:'Ora sappiamo {word} a memoria.',es:'Ya nos sabemos {word} de memoria.',pt:'Agora a gente sabe {word} de cor.',nl:'Nu kennen we {word} uit ons hoofd.',sv:'Nu kan vi {word} utantill.',da:'Nu kan vi {word} udenad.',no:'Nå kan vi {word} utenat.'},
    heartLegend:  {en:'The heart marks the part we learn by heart.',de:'Das Herz zeigt den Teil, den wir uns merken.',fr:'Le cœur montre la partie qui se retient par cœur.',it:'Il cuore indica la parte da imparare a memoria.',es:'El corazón señala la parte que aprendemos de memoria.',pt:'O coração mostra a parte que guardamos de cor.',nl:'Het hartje wijst het stukje aan dat je uit je hoofd leert.',sv:'Hjärtat visar delen vi lär oss utantill.',da:'Hjertet viser den del, vi lærer udenad.',no:'Hjertet viser delen vi lærer utenat.'},
    stateMapped:  {en:'marked',de:'markiert',fr:'marquée',it:'segnata',es:'marcada',pt:'marcada',nl:'gemarkeerd',sv:'markerad',da:'markeret',no:'markert'},
    boxOf:        {en:'Part {i} of {n}',de:'Teil {i} von {n}',fr:'Partie {i} sur {n}',it:'Parte {i} di {n}',es:'Parte {i} de {n}',pt:'Parte {i} de {n}',nl:'Vakje {i} van {n}',sv:'Del {i} av {n}',da:'Del {i} af {n}',no:'Del {i} av {n}'},
    heartPart:    {en:'a part to learn by heart',de:'ein Teil, den wir uns merken',fr:'une partie à retenir par cœur',it:'una parte da imparare a memoria',es:'una parte para aprender de memoria',pt:'uma parte para guardar de cor',nl:'een stukje om uit je hoofd te leren',sv:'en del att lära sig utantill',da:'en del at lære udenad',no:'en del å lære utenat'},

    /* card chrome */
    hearWord:     {en:'Hear the word',de:'Wort anhören',fr:'Écouter le mot',it:'Ascolta la parola',es:'Escuchar la palabra',pt:'Ouvir a palavra',nl:'Luister naar het woord',sv:'Lyssna på ordet',da:'Hør ordet',no:'Hør ordet'},
    hearSentence: {en:'Hear the sentence',de:'Satz anhören',fr:'Écouter la phrase',it:'Ascolta la frase',es:'Escuchar la oración',pt:'Ouvir a frase',nl:'Luister naar de zin',sv:'Lyssna på meningen',da:'Hør sætningen',no:'Hør setningen'},
    flipToSee:    {en:'See it in a sentence',de:'Das Wort im Satz sehen',fr:'Voir le mot dans une phrase',it:'Vedila in una frase',es:'Verla en una oración',pt:'Ver em uma frase',nl:'Bekijk het woord in een zin',sv:'Se ordet i en mening',da:'Se ordet i en sætning',no:'Se ordet i en setning'},
    flipBack:     {en:'Back to the word',de:'Zurück zum Wort',fr:'Revenir au mot',it:'Torna alla parola',es:'Volver a la palabra',pt:'Voltar à palavra',nl:'Terug naar het woord',sv:'Tillbaka till ordet',da:'Tilbage til ordet',no:'Tilbake til ordet'},
    prevWord:     {en:'Previous word',de:'Vorheriges Wort',fr:'Mot précédent',it:'Parola precedente',es:'Palabra anterior',pt:'Palavra anterior',nl:'Vorig woord',sv:'Föregående ord',da:'Forrige ord',no:'Forrige ord'},
    nextWord:     {en:'Next word',de:'Nächstes Wort',fr:'Mot suivant',it:'Parola successiva',es:'Palabra siguiente',pt:'Próxima palavra',nl:'Volgend woord',sv:'Nästa ord',da:'Næste ord',no:'Neste ord'},

    /* THE WRITE FACE — the routine's ending */
    writeIt:      {en:'Now write it',de:'Jetzt schreiben',fr:'Maintenant, écris-le',it:'Adesso scrivila',es:'Ahora escríbela',pt:'Agora escreva',nl:'Schrijf het nu',sv:'Skriv det nu',da:'Skriv det nu',no:'Skriv det nå'},
    writePrompt:  {en:'Write the word, then bring it back and look.',de:'Schreibt das Wort, holt es zurück und schaut nach.',fr:'Écris le mot, puis fais-le revenir et regarde.',it:'Scrivete la parola, poi fatela tornare e guardate.',es:'Escribe la palabra, luego hazla volver y mira.',pt:'Escrevam a palavra, depois tragam de volta e olhem.',nl:'Schrijf het woord, haal het dan terug en kijk.',sv:'Skriv ordet, ta sedan tillbaka det och titta.',da:'Skriv ordet, hent det så tilbage og se efter.',no:'Skriv ordet, hent det så tilbake og se etter.'},
    showWord:     {en:'Show the word',de:'Wort zeigen',fr:'Montrer le mot',it:'Mostra la parola',es:'Mostrar la palabra',pt:'Mostrar a palavra',nl:'Laat het woord zien',sv:'Visa ordet',da:'Vis ordet',no:'Vis ordet'},

    /* board tools */
    bigWord:      {en:'Big word',de:'Großes Wort',fr:'En grand',it:'Parola grande',es:'Palabra grande',pt:'Palavra grande',nl:'Groot woord',sv:'Stort ord',da:'Stort ord',no:'Stort ord'},
    bigWordLeave: {en:'Smaller again',de:'Wieder kleiner',fr:'Revenir en petit',it:'Torna piccola',es:'Volver al tamaño normal',pt:'Voltar ao tamanho normal',nl:'Weer kleiner',sv:'Mindre igen',da:'Mindre igen',no:'Mindre igjen'},
    bookshelf:    {en:'Words we know by heart',de:'Wörter, die wir auswendig kennen',fr:'Les mots qu’on connaît par cœur',it:'Le parole che sappiamo a memoria',es:'Palabras que sabemos de memoria',pt:'Palavras que sabemos de cor',nl:'Woorden die we uit ons hoofd kennen',sv:'Ord vi kan utantill',da:'Ord, vi kan udenad',no:'Ord vi kan utenat'},
    bookEmpty:    {en:'Your shelf fills up as you map words.',de:'Das Regal füllt sich, während ihr Wörter markiert.',fr:'L’étagère se remplit à mesure que vous marquez des mots.',it:'Lo scaffale si riempie man mano che segnate le parole.',es:'El estante se llena a medida que se marcan palabras.',pt:'A prateleira vai enchendo quando vocês marcam palavras.',nl:'De plank raakt voller terwijl jullie woorden markeren.',sv:'Hyllan fylls medan ni markerar ord.',da:'Hylden fyldes op, efterhånden som I markerer ord.',no:'Hylla fylles opp mens dere markerer ord.'},
    ringStart:    {en:'Visit words again',de:'Wörter noch einmal ansehen',fr:'Revoir des mots',it:'Rivedi le parole',es:'Volver a ver palabras',pt:'Ver as palavras de novo',nl:'Woorden opnieuw bekijken',sv:'Titta på ord igen',da:'Se ordene igen',no:'Besøk ord igjen'},
    ringLeave:    {en:'Back to the shelf',de:'Zurück zum Regal',fr:'Retour à l’étagère',it:'Torna allo scaffale',es:'Volver al estante',pt:'Voltar à prateleira',nl:'Terug naar de plank',sv:'Tillbaka till hyllan',da:'Tilbage til hylden',no:'Tilbake til hylla'},
    ringEmpty:    {en:'Map a word first, then you can visit it again.',de:'Markiert zuerst ein Wort, dann könnt ihr es noch einmal ansehen.',fr:'Marque d’abord un mot, puis tu pourras le revoir.',it:'Segnate prima una parola, poi potrete rivederla.',es:'Marca primero una palabra y luego podrás volver a verla.',pt:'Marquem uma palavra primeiro, depois vocês podem ver de novo.',nl:'Markeer eerst een woord, daarna kun je het opnieuw bekijken.',sv:'Markera ett ord först, sedan kan ni titta på det igen.',da:'Markér et ord først, så kan I se det igen.',no:'Markér et ord først, så kan dere besøke det igjen.'},

    /* ---- THE DESK (adult-facing) ---- */
    shelfPick:    {en:'Word shelves',de:'Wortregale',fr:'Étagères de mots',it:'Scaffali di parole',es:'Estantes de palabras',pt:'Prateleiras de palavras',nl:'Woordplanken',sv:'Ordhyllor',da:'Ordhylder',no:'Ordhyller'},
    deskWords:    {en:'Words',de:'Wörter',fr:'Mots',it:'Parole',es:'Palabras',pt:'Palavras',nl:'Woorden',sv:'Ord',da:'Ord',no:'Ord'},
    deskMine:     {en:'My words',de:'Meine Wörter',fr:'Mes mots',it:'Le mie parole',es:'Mis palabras',pt:'Minhas palavras',nl:'Mijn woorden',sv:'Mina ord',da:'Mine ord',no:'Mine ord'},
    deskPrint:    {en:'Print',de:'Drucken',fr:'Imprimer',it:'Stampa',es:'Imprimir',pt:'Imprimir',nl:'Afdrukken',sv:'Skriv ut',da:'Print',no:'Skriv ut'},
    deskBack:     {en:'Back to the board',de:'Zurück zur Tafel',fr:'Retour au tableau',it:'Torna alla lavagna',es:'Volver a la pizarra',pt:'Voltar ao quadro',nl:'Terug naar het bord',sv:'Tillbaka till tavlan',da:'Tilbage til tavlen',no:'Tilbake til tavla'},
    searchWords:  {en:'Find a word',de:'Wort suchen',fr:'Chercher un mot',it:'Cerca una parola',es:'Buscar una palabra',pt:'Procurar uma palavra',nl:'Zoek een woord',sv:'Hitta ett ord',da:'Find et ord',no:'Finn et ord'},
    searchNone:   {en:'Nothing here matches that.',de:'Dazu passt hier nichts.',fr:'Rien ne correspond ici.',it:'Qui non c’è nulla che corrisponda.',es:'Aquí no hay nada que coincida.',pt:'Aqui não há nada que corresponda.',nl:'Hier past niets bij.',sv:'Inget här stämmer med det.',da:'Der er ikke noget her, der passer.',no:'Ingenting her passer med det.'},
    teacherNote:  {en:'Why this one is tricky',de:'Warum dieses Wort knifflig ist',fr:'Pourquoi ce mot est piégeux',it:'Perché questa parola è insidiosa',es:'Por qué esta palabra es engañosa',pt:'Por que esta palavra engana',nl:'Waarom dit woord lastig is',sv:'Varför det här ordet lurar',da:'Hvorfor det her ord snyder',no:'Hvorfor dette ordet lurer'},
    teachShelf:   {en:'Teach this shelf',de:'Dieses Regal nehmen',fr:'Travailler cette étagère',it:'Usa questo scaffale',es:'Trabajar este estante',pt:'Usar esta prateleira',nl:'Deze plank nemen',sv:'Arbeta med den här hyllan',da:'Arbejd med den her hylde',no:'Jobb med denne hylla'},
    shelfClose:   {en:'Close',de:'Schließen',fr:'Fermer',it:'Chiudi',es:'Cerrar',pt:'Fechar',nl:'Sluiten',sv:'Stäng',da:'Luk',no:'Lukk'},

    /* ---- THE CUSTOM-WORD EDITOR (adult-facing) ---- */
    myWordsHint:  {en:'We have guessed where the sounds break. Say the word slowly and fix the breaks — then tap the part your class must learn by heart.',de:'Wir haben geraten, wo die Laute getrennt werden. Sprecht das Wort langsam und korrigiert die Trennungen – tippt dann den Teil an, den eure Klasse auswendig lernen soll.',fr:'Nous avons deviné où les sons se séparent. Dis le mot lentement et corrige les coupures, puis touche la partie que ta classe doit retenir par cœur.',it:'Abbiamo indovinato dove si separano i suoni. Di’ la parola lentamente e correggi le divisioni, poi tocca la parte che la classe deve imparare a memoria.',es:'Hemos adivinado dónde se separan los sonidos. Di la palabra despacio y corrige los cortes; luego toca la parte que tu clase debe aprender de memoria.',pt:'Nós adivinhamos onde os sons se separam. Diga a palavra devagar e corrija as divisões — depois toque na parte que a turma precisa guardar de cor.',nl:'Wij hebben geraden waar de klanken splitsen. Zeg het woord langzaam en verbeter de splitsingen – tik daarna het stukje aan dat je klas uit het hoofd moet leren.',sv:'Vi har gissat var ljuden delas. Säg ordet långsamt och rätta delningarna – tryck sedan på den del som klassen ska lära sig utantill.',da:'Vi har gættet, hvor lydene deles. Sig ordet langsomt, og ret delingerne – tryk så på den del, klassen skal lære udenad.',no:'Vi har gjettet hvor lydene deles. Si ordet langsomt og rett delingene – trykk så på den delen klassen skal lære utenat.'},
    workedExample:{en:'We will break “one” as o-n-e. Your mouth says /w/ + /u/ + /n/.',de:'Wir trennen „one“ als o-n-e. Euer Mund sagt /w/ + /u/ + /n/.',fr:'Nous coupons « one » en o-n-e. Ta bouche dit /w/ + /u/ + /n/.',it:'Dividiamo « one » in o-n-e. La bocca dice /w/ + /u/ + /n/.',es:'Cortamos « one » como o-n-e. Tu boca dice /w/ + /u/ + /n/.',pt:'Dividimos « one » como o-n-e. Sua boca diz /w/ + /u/ + /n/.',nl:'Wij splitsen « one » als o-n-e. Je mond zegt /w/ + /u/ + /n/.',sv:'Vi delar « one » som o-n-e. Munnen säger /w/ + /u/ + /n/.',da:'Vi deler « one » som o-n-e. Munden siger /w/ + /u/ + /n/.',no:'Vi deler « one » som o-n-e. Munnen sier /w/ + /u/ + /n/.'},
    pasteHint:    {en:'One word per line',de:'Ein Wort pro Zeile',fr:'Un mot par ligne',it:'Una parola per riga',es:'Una palabra por línea',pt:'Uma palavra por linha',nl:'Eén woord per regel',sv:'Ett ord per rad',da:'Ét ord per linje',no:'Ett ord per linje'},
    addWords:     {en:'Add',de:'Hinzufügen',fr:'Ajouter',it:'Aggiungi',es:'Añadir',pt:'Adicionar',nl:'Toevoegen',sv:'Lägg till',da:'Tilføj',no:'Legg til'},
    seamHint:     {en:'Tap between the letters to join or split them.',de:'Tippt zwischen die Buchstaben, um sie zu verbinden oder zu trennen.',fr:'Touche entre les lettres pour les joindre ou les séparer.',it:'Tocca tra le lettere per unirle o dividerle.',es:'Toca entre las letras para unirlas o separarlas.',pt:'Toque entre as letras para juntá-las ou separá-las.',nl:'Tik tussen de letters om ze samen te voegen of te splitsen.',sv:'Tryck mellan bokstäverna för att slå ihop eller dela dem.',da:'Tryk mellem bogstaverne for at samle eller dele dem.',no:'Trykk mellom bokstavene for å slå sammen eller dele dem.'},
    heartHint:    {en:'Tap the part your class must learn by heart.',de:'Tippt den Teil an, den eure Klasse auswendig lernen soll.',fr:'Touche la partie que ta classe doit retenir par cœur.',it:'Tocca la parte che la classe deve imparare a memoria.',es:'Toca la parte que tu clase debe aprender de memoria.',pt:'Toque na parte que a turma precisa guardar de cor.',nl:'Tik het stukje aan dat je klas uit het hoofd moet leren.',sv:'Tryck på den del som klassen ska lära sig utantill.',da:'Tryk på den del, klassen skal lære udenad.',no:'Trykk på den delen klassen skal lære utenat.'},
    sentenceOpt:  {en:'A sentence for this word (you can leave this empty)',de:'Ein Satz zu diesem Wort (kann leer bleiben)',fr:'Une phrase pour ce mot (tu peux laisser vide)',it:'Una frase per questa parola (puoi lasciarla vuota)',es:'Una oración para esta palabra (puedes dejarlo vacío)',pt:'Uma frase para esta palavra (pode deixar em branco)',nl:'Een zin bij dit woord (mag leeg blijven)',sv:'En mening till ordet (kan lämnas tom)',da:'En sætning til ordet (må gerne stå tom)',no:'En setning til ordet (kan stå tom)'},
    saveWord:     {en:'Use this word',de:'Dieses Wort verwenden',fr:'Utiliser ce mot',it:'Usa questa parola',es:'Usar esta palabra',pt:'Usar esta palavra',nl:'Dit woord gebruiken',sv:'Använd det här ordet',da:'Brug det her ord',no:'Bruk dette ordet'},
    showOnBoard:  {en:'Show on the board',de:'An der Tafel zeigen',fr:'Montrer au tableau',it:'Mostra sulla lavagna',es:'Mostrar en la pizarra',pt:'Mostrar no quadro',nl:'Op het bord tonen',sv:'Visa på tavlan',da:'Vis på tavlen',no:'Vis på tavla'},
    deleteWord:   {en:'Remove',de:'Entfernen',fr:'Retirer',it:'Rimuovi',es:'Quitar',pt:'Remover',nl:'Verwijderen',sv:'Ta bort',da:'Fjern',no:'Fjern'},
    myWordsShelf: {en:'My words',de:'Meine Wörter',fr:'Mes mots',it:'Le mie parole',es:'Mis palabras',pt:'Minhas palavras',nl:'Mijn woorden',sv:'Mina ord',da:'Mine ord',no:'Mine ord'},
    myWordMark:   {en:'your own word',de:'euer eigenes Wort',fr:'ton propre mot',it:'una vostra parola',es:'una palabra tuya',pt:'uma palavra sua',nl:'je eigen woord',sv:'ert eget ord',da:'jeres eget ord',no:'deres eget ord'},
    needHeart:    {en:'Mark a part by heart first — that is what makes it a heart word.',de:'Markiert zuerst einen Teil zum Merken – erst das macht es zu einem Merkwort.',fr:'Marque d’abord une partie à retenir – c’est ce qui en fait un mot à cœur.',it:'Segnate prima una parte da imparare a memoria: è questo che ne fa una parola del cuore.',es:'Marca primero una parte de memoria: eso es lo que la hace una palabra con corazón.',pt:'Marque primeiro uma parte de cor — é isso que faz dela uma palavra de coração.',nl:'Markeer eerst een stukje uit het hoofd – dat maakt het pas een hartwoord.',sv:'Markera först en del att kunna utantill – det är det som gör det till ett hjärteord.',da:'Markér først en del udenad – det er dét, der gør det til et hjerteord.',no:'Markér først en del utenat – det er det som gjør det til et hjerteord.'},
    tooManyHearts:{en:'If nearly all of it is a heart, the child learns the shape instead of the sounds.',de:'Wenn fast alles ein Herz trägt, lernt das Kind die Form statt der Laute.',fr:'Si presque tout porte un cœur, l’enfant apprend la forme au lieu des sons.',it:'Se quasi tutto è cuore, il bambino impara la forma invece dei suoni.',es:'Si casi todo lleva corazón, el niño aprende la forma en vez de los sonidos.',pt:'Se quase tudo tem coração, a criança aprende o formato em vez dos sons.',nl:'Als bijna alles een hartje krijgt, leert het kind de vorm in plaats van de klanken.',sv:'Om nästan allt är hjärta lär sig barnet formen i stället för ljuden.',da:'Hvis næsten alt er hjerte, lærer barnet formen i stedet for lydene.',no:'Hvis nesten alt er hjerte, lærer barnet formen i stedet for lydene.'},
    looksDecodable:{en:'This one looks like it can be sounded out. Sound Boxes may suit it better.',de:'Dieses Wort lässt sich anscheinend erlesen. Die Lautboxen passen vielleicht besser.',fr:'Ce mot semble pouvoir se déchiffrer. Les boîtes à sons conviennent peut-être mieux.',it:'Questa parola sembra leggibile suono per suono. Le caselle dei suoni forse vanno meglio.',es:'Esta palabra parece que se puede leer sonido a sonido. Las cajas de sonidos quizá le vayan mejor.',pt:'Esta palavra parece dar para ler som a som. As caixas de sons talvez sirvam melhor.',nl:'Dit woord lijkt te verklanken. De klankdozen passen er misschien beter bij.',sv:'Det här ordet går nog att ljuda. Ljudrutorna passar kanske bättre.',da:'Det her ord kan vist lydes. Lydboksene passer måske bedre.',no:'Dette ordet kan nok lydes. Lydboksene passer kanskje bedre.'},
    tooLong:      {en:'That one is too long for the boxes — try a shorter word.',de:'Das ist zu lang für die Boxen – nehmt ein kürzeres Wort.',fr:'Celui-là est trop long pour les cases – essaie un mot plus court.',it:'Questa è troppo lunga per le caselle: provate una parola più corta.',es:'Esa es demasiado larga para las cajas: prueba una palabra más corta.',pt:'Essa é comprida demais para as caixas — tentem uma palavra mais curta.',nl:'Dat woord is te lang voor de vakjes – probeer een korter woord.',sv:'Det ordet är för långt för rutorna – prova ett kortare ord.',da:'Det ord er for langt til boksene – prøv et kortere ord.',no:'Det ordet er for langt for boksene – prøv et kortere ord.'},
    duplicateSkip:{en:'That word is already here.',de:'Dieses Wort ist schon da.',fr:'Ce mot est déjà là.',it:'Questa parola c’è già.',es:'Esa palabra ya está aquí.',pt:'Essa palavra já está aqui.',nl:'Dat woord staat er al.',sv:'Det ordet finns redan.',da:'Det ord er der allerede.',no:'Det ordet er der allerede.'},
    capReached:   {en:'The list is full. Remove one to add another.',de:'Die Liste ist voll. Entfernt eines, um ein neues hinzuzufügen.',fr:'La liste est pleine. Retire un mot pour en ajouter un autre.',it:'L’elenco è pieno. Rimuovete una parola per aggiungerne un’altra.',es:'La lista está llena. Quita una para añadir otra.',pt:'A lista está cheia. Remova uma para adicionar outra.',nl:'De lijst is vol. Verwijder er één om een nieuw woord toe te voegen.',sv:'Listan är full. Ta bort ett ord för att lägga till ett nytt.',da:'Listen er fuld. Fjern ét for at tilføje et nyt.',no:'Lista er full. Fjern ett for å legge til et nytt.'},
    copyList:     {en:'Copy my list',de:'Liste kopieren',fr:'Copier ma liste',it:'Copia il mio elenco',es:'Copiar mi lista',pt:'Copiar minha lista',nl:'Mijn lijst kopiëren',sv:'Kopiera min lista',da:'Kopiér min liste',no:'Kopier lista mi'},
    copied:       {en:'Copied — paste it anywhere you keep your links.',de:'Kopiert – fügt es dort ein, wo ihr eure Links sammelt.',fr:'Copié – colle-le là où tu gardes tes liens.',it:'Copiato: incollatelo dove tenete i vostri link.',es:'Copiado: pégalo donde guardes tus enlaces.',pt:'Copiado — cole onde vocês guardam seus links.',nl:'Gekopieerd – plak het waar je je links bewaart.',sv:'Kopierat – klistra in det där ni sparar era länkar.',da:'Kopieret – sæt det ind, hvor I gemmer jeres links.',no:'Kopiert – lim det inn der dere lagrer lenkene deres.'},
    deviceOnly:   {en:'Your words stay in this browser, on this device.',de:'Eure Wörter bleiben in diesem Browser, auf diesem Gerät.',fr:'Tes mots restent dans ce navigateur, sur cet appareil.',it:'Le vostre parole restano in questo browser, su questo dispositivo.',es:'Tus palabras se quedan en este navegador, en este dispositivo.',pt:'Suas palavras ficam neste navegador, neste aparelho.',nl:'Je woorden blijven in deze browser, op dit apparaat.',sv:'Era ord stannar i den här webbläsaren, på den här enheten.',da:'Jeres ord bliver i denne browser, på denne enhed.',no:'Ordene deres blir i denne nettleseren, på denne enheten.'},

    /* premium */
    gatePremium:  {en:'These shelves are part of Premium — your first shelf is always free.',de:'Diese Regale gehören zu Premium – euer erstes Regal bleibt immer kostenlos.',fr:'Ces étagères font partie de Premium – la première reste toujours gratuite.',it:'Questi scaffali fanno parte di Premium: il primo resta sempre gratuito.',es:'Estos estantes son parte de Premium: el primero siempre es gratis.',pt:'Estas prateleiras fazem parte do Premium — a sua primeira prateleira é sempre gratuita.',nl:'Deze planken horen bij Premium – je eerste plank blijft altijd gratis.',sv:'De här hyllorna ingår i Premium – den första hyllan är alltid gratis.',da:'Disse hylder er en del af Premium – den første hylde er altid gratis.',no:'Disse hyllene er en del av Premium – den første hylla er alltid gratis.'},
    gateSave:     {en:'Keeping your own word list is part of Premium — building one is always free.',de:'Eine eigene Wortliste zu behalten gehört zu Premium – sie zu bauen ist immer kostenlos.',fr:'Garder sa propre liste de mots fait partie de Premium – la construire reste toujours gratuit.',it:'Conservare il proprio elenco fa parte di Premium: costruirlo è sempre gratuito.',es:'Guardar tu propia lista es parte de Premium: construirla siempre es gratis.',pt:'Guardar sua própria lista faz parte do Premium — montá-la é sempre gratuito.',nl:'Je eigen woordenlijst bewaren hoort bij Premium – hem maken is altijd gratis.',sv:'Att spara sin egen ordlista ingår i Premium – att bygga den är alltid gratis.',da:'At gemme sin egen ordliste er en del af Premium – at bygge den er altid gratis.',no:'Å lagre si egen ordliste er en del av Premium – å bygge den er alltid gratis.'},
    unlock:       {en:'See Premium',de:'Premium ansehen',fr:'Découvrir Premium',it:'Scopri Premium',es:'Ver Premium',pt:'Conhecer o Premium',nl:'Bekijk Premium',sv:'Se Premium',da:'Se Premium',no:'Se Premium'},
    lockedShelf:  {en:'Premium shelf',de:'Premium-Regal',fr:'Étagère Premium',it:'Scaffale Premium',es:'Estante Premium',pt:'Prateleira Premium',nl:'Premium-plank',sv:'Premiumhylla',da:'Premiumhylde',no:'Premiumhylle'},

    /* print */
    printCards:   {en:'Print the cards',de:'Karten ausdrucken',fr:'Imprimer les cartes',it:'Stampa le schede',es:'Imprimir las tarjetas',pt:'Imprimir os cartões',nl:'Kaarten afdrukken',sv:'Skriv ut korten',da:'Print kortene',no:'Skriv ut kortene'},
    sheetCards:   {en:'Fold-over word cards',de:'Faltkarten',fr:'Cartes à plier',it:'Schede da piegare',es:'Tarjetas plegables',pt:'Cartões dobráveis',nl:'Vouwkaartjes',sv:'Vikkort',da:'Foldekort',no:'Brettekort'},
    sheetStrip:   {en:'Wall strip',de:'Wandstreifen',fr:'Bande murale',it:'Striscia da parete',es:'Tira de pared',pt:'Faixa de parede',nl:'Muurstrook',sv:'Väggremsa',da:'Vægstrimmel',no:'Veggstripe'},
    sheetHome:    {en:'Take-home sheet',de:'Blatt für zu Hause',fr:'Feuille à emporter',it:'Foglio da portare a casa',es:'Hoja para casa',pt:'Folha para levar para casa',nl:'Blad voor thuis',sv:'Blad att ta hem',da:'Ark til hjemmet',no:'Ark til hjemmet'},
    scopeShelf:   {en:'This shelf',de:'Dieses Regal',fr:'Cette étagère',it:'Questo scaffale',es:'Este estante',pt:'Esta prateleira',nl:'Deze plank',sv:'Den här hyllan',da:'Den her hylde',no:'Denne hylla'},
    scopeMine:    {en:'My words',de:'Meine Wörter',fr:'Mes mots',it:'Le mie parole',es:'Mis palabras',pt:'Minhas palavras',nl:'Mijn woorden',sv:'Mina ord',da:'Mine ord',no:'Mine ord'},
    printNote:    {en:'Cut along the dashed line. Fold along the dotted line. The heart marks the part we learn by heart.',de:'Entlang der gestrichelten Linie schneiden. An der gepunkteten Linie falten. Das Herz zeigt den Teil, den wir uns merken.',fr:'Découpe le long des tirets. Plie le long des pointillés. Le cœur montre la partie qui se retient par cœur.',it:'Tagliate lungo la linea tratteggiata. Piegate lungo la linea punteggiata. Il cuore indica la parte da imparare a memoria.',es:'Corta por la línea discontinua. Dobla por la línea de puntos. El corazón señala la parte que aprendemos de memoria.',pt:'Corte pela linha tracejada. Dobre pela linha pontilhada. O coração mostra a parte que guardamos de cor.',nl:'Knip langs de streepjeslijn. Vouw langs de stippellijn. Het hartje wijst het stukje aan dat je uit je hoofd leert.',sv:'Klipp längs den streckade linjen. Vik längs den prickade linjen. Hjärtat visar delen vi lär oss utantill.',da:'Klip langs den stiplede linje. Fold langs den prikkede linje. Hjertet viser den del, vi lærer udenad.',no:'Klipp langs den stiplede linja. Brett langs den prikkete linja. Hjertet viser delen vi lærer utenat.'},
    homeNote:     {en:'Write the word in the empty boxes, then colour the heart.',de:'Schreibt das Wort in die leeren Kästchen und malt dann das Herz aus.',fr:'Écris le mot dans les cases vides, puis colorie le cœur.',it:'Scrivete la parola nelle caselle vuote, poi colorate il cuore.',es:'Escribe la palabra en las cajas vacías y luego colorea el corazón.',pt:'Escreva a palavra nas caixas vazias e depois pinte o coração.',nl:'Schrijf het woord in de lege vakjes en kleur daarna het hartje.',sv:'Skriv ordet i de tomma rutorna och färglägg sedan hjärtat.',da:'Skriv ordet i de tomme bokse, og farvelæg så hjertet.',no:'Skriv ordet i de tomme boksene, og fargelegg så hjertet.'},

    /* settings */
    setVoice:     {en:'Say words aloud',de:'Wörter vorlesen',fr:'Dire les mots à voix haute',it:'Pronuncia le parole ad alta voce',es:'Decir las palabras en voz alta',pt:'Dizer as palavras em voz alta',nl:'Woorden hardop zeggen',sv:'Läs orden högt',da:'Læs ordene højt',no:'Les ordene høyt'},
    setOrder:     {en:'Word order',de:'Reihenfolge',fr:'Ordre des mots',it:'Ordine delle parole',es:'Orden de las palabras',pt:'Ordem das palavras',nl:'Volgorde',sv:'Ordningsföljd',da:'Rækkefølge',no:'Rekkefølge'},
    orderListed:  {en:'In order',de:'Der Reihe nach',fr:'Dans l’ordre',it:'In ordine',es:'En orden',pt:'Em ordem',nl:'Op volgorde',sv:'I ordning',da:'I rækkefølge',no:'Som de står'},
    orderShuffled:{en:'Shuffled',de:'Gemischt',fr:'Mélangés',it:'Mescolate',es:'Mezcladas',pt:'Embaralhadas',nl:'Door elkaar',sv:'Blandad ordning',da:'Blandet rækkefølge',no:'Blandet'},

    /* sibling phonics tools (the quartet footer) */
    trioLabel:    {en:'Phonics tools:',de:'Werkzeuge zum Lesenlernen:',fr:'Outils de phonologie :',it:'Strumenti fonologici:',es:'Herramientas de conciencia fonológica:',pt:'Ferramentas de alfabetização:',nl:'Klankhulpjes:',sv:'Ljudverktyg:',da:'Lydværktøjer:',no:'Lydverktøy:'},
    siblingSbx:   {en:'Sound Boxes',de:'Lautboxen',fr:'Boîtes à sons',it:'Caselle dei suoni',es:'Cajas de sonidos',pt:'Caixas de sons',nl:'Klankdozen',sv:'Ljudrutor',da:'Lydbokse',no:'Lydbokser'},
    siblingBbd:   {en:'Blending Board',de:'Lesemaschine',fr:'Tableau de syllabes',it:'Tabellone delle sillabe',es:'Tablero de sílabas',pt:'Quadro de sílabas',nl:'Klankenbord',sv:'Ljudtavla',da:'Lydtavle',no:'Lydtavle'},
    siblingLtl:   {en:'Letter Tiles',de:'Magnetbuchstaben',fr:'Lettres magnétiques',it:'Lettere magnetiche',es:'Letras magnéticas',pt:'Alfabeto móvel',nl:'Letterdoos',sv:'Magnetbokstäver',da:'Magnetbogstaver',no:'Magnetbokstaver'}
  },

  /* Legal multi-char graphemes per locale. MUST stay deep-equal to
     GRAPHEMES in scripts/verify-heart-words.js (the drift gate) — extend
     BOTH, deliberately, or the build fails. */
  GRAPHEME_INVENTORY: {
    en: ['sh','ch','th','wh','ck','ng','ph','ee','oo','oa','ai','ay','ea','ie','ow','ou','oi','oy','aw','au','ew','ue','ar','or','er','ur','ir','igh','a_e','i_e','o_e','u_e','e_e','ll','ss','ff','zz','gg','tt','dd','nn','mm','bb','pp','oe','ere','oul','eo','our','eigh','eir','ear','ve'],
    de: ['sch','ch','ck','ei','ie','au','eu','äu','ll','ss','ff','tt','nn','mm','pp','rr','tz','ng','sp','st','qu','ah','eh','ih','oh','uh','aa','ee','oo','ieh','äh','öh','üh'],
    fr: ['ch','ou','oi','on','an','en','in','un','ai','ei','au','eau','eu','oeu','gn','ph','ll','ss','tt','nn','mm','rr','pp','qu','é','è','ê','em','om','am','ien','oy','ay','aim','ein'],
    es: ['ch','ll','rr','qu','gu','ñ','á','é','í','ó','ú','gü'],
    pt: ['ch','lh','nh','rr','ss','qu','gu','ão','ãe','õe','á','é','í','ó','ú','â','ê','ô','ç','ã','õ'],
    it: ['ch','gh','gn','gl','sc','ci','gi','ll','tt','ss','nn','mm','rr','pp','cc','bb','zz','ff','gg','dd','sci','cqu','gli','à','è','é','ì','ò','ù'],
    nl: ['aa','ee','oo','uu','oe','ie','ij','ei','ui','eu','ou','au','ch','ng','nk','eeu','ieu','aai','ooi','oei'],
    sv: ['ll','tt','ss','nn','mm','pp','rr','kk','gg','ck','ng','sj','skj','stj','kj','tj','hj','lj','dj','gj','rs','rt','rd','rn','rl'],
    da: ['ll','tt','ss','nn','mm','pp','rr','kk','gg','dd','bb','ng','sk','sj','hj','aa','hv','ej','øj','av'],
    no: ['ll','tt','ss','nn','mm','pp','rr','kk','gg','dd','bb','ng','sj','skj','kj','gj','hj','øy','ei','au','hv','rs','rt','eg']
  },

  /* Rising pentatonic, one soft pitch per box index. */
  PITCHES: [523, 587, 659, 698, 784, 880],

  /* Emergency bank if the per-locale fetch 404s. Free shelf only, so a
     network failure still leaves a complete working free tool.
     ⚠ Gate T12 runs every DATA invariant over this too — it is not a stub,
     and when the shipped bank moves this must move with it. */
  FALLBACK_BANK: {
    locale: 'en', version: 2, kind: 'irregular', curation: 'fallback', targetTotal: 10,
    shelves: [{ id: 'k-first', label: 'K · First words in every book', band: 'k', phase: 1,
                teachingPoint: 'the earliest ten — no family, these are simply first', free: true }],
    words: [
      { id:'the', display:'the', boxes:['th','e'], heart:[1], heartKind:'irregular',
        note:'the e says /uh/', noteFocus:[1], heartOverride:'e = schwa here, not its name or its short sound',
        sentence:'The cat sat on my lap.', shelf:'k-first', noImage:true },
      { id:'of', display:'of', boxes:['o','f'], heart:[1], heartKind:'irregular',
        note:'the only word in English where f says /v/', noteFocus:[1], heartOverride:'f = /v/ occurs in this word alone',
        sentence:'I drank all of my milk.', shelf:'k-first', noImage:true },
      { id:'to', display:'to', boxes:['t','o'], heart:[1], heartKind:'irregular',
        note:'the o says /oo/', noteFocus:[1], heartOverride:'o = long oo where the code predicts short o',
        sentence:'We run to the bus.', shelf:'k-first', noImage:true },
      { id:'do', display:'do', boxes:['d','o'], heart:[1], heartKind:'irregular',
        note:'the o says /oo/, like in to', noteFocus:[1], heartOverride:'o = long oo where the code predicts short o',
        sentence:'What can you do with a ball?', shelf:'k-first', noImage:true },
      { id:'was', display:'was', boxes:['w','a','s'], heart:[1], heartKind:'irregular',
        note:'the a says /o/ after w — like want and what', noteFocus:[1], heartOverride:'w-controlled a',
        sentence:'My dog was fast asleep.', shelf:'k-first', noImage:true },
      { id:'said', display:'said', boxes:['s','ai','d'], heart:[1], heartKind:'irregular',
        note:'ai says /e/ here, not its usual /ay/', noteFocus:[1],
        sentence:'Hello, said the little bird.', shelf:'k-first', noImage:true },
      { id:'you', display:'you', boxes:['y','ou'], heart:[1], heartKind:'irregular',
        note:'ou says /oo/ here, not its usual /ow/', noteFocus:[1],
        sentence:'Can you see the moon?', shelf:'k-first', noImage:true },
      { id:'have', display:'have', boxes:['h','a','ve'], heart:[2], heartKind:'irregular',
        note:'no English word ends in v, so an e is added — it does not make the a say its name', noteFocus:[2],
        sentence:'We have a big red box.', shelf:'k-first', noImage:true },
      { id:'come', display:'come', boxes:['c','o','m'], silentTail:'e', heart:[1], heartKind:'irregular',
        note:'the o says /u/, and the e on the end is doing no job', noteFocus:[1], heartOverride:'o = /uh/ where the code predicts short o',
        sentence:'Come and sit with me.', shelf:'k-first', noImage:true },
      { id:'some', display:'some', boxes:['s','o','m'], silentTail:'e', heart:[1], heartKind:'irregular',
        note:'the o says /u/, just like in come', noteFocus:[1], heartOverride:'o = /uh/ where the code predicts short o',
        sentence:'May I have some water?', shelf:'k-first', noImage:true }
    ]
  },

  defaults: { voice: true, order: 'listed' },
  settings: [
    { key: 'voice', type: 'toggle', labelKey: 'setVoice' },
    { key: 'order', type: 'choice', labelKey: 'setOrder',
      options: [{ value: 'listed', labelKey: 'orderListed' }, { value: 'shuffled', labelKey: 'orderShuffled' }] }
  ],

  STORE_KEY: 'lcs:heart-words:v1',
  ENT_TRUST_DAYS: 14,

  /* Custom-word caps. 60 not 20: sound-boxes and letter-tiles cap at 20
     because they are session tools; this is a year-long list and 20 is
     under one term. 60 is about six shelves and ~7KB of localStorage. */
  MAX_CUSTOM: 60,
  MAX_LETTERS: 14,
  MAX_BOXES: 6,
  CUSTOM_SHELF: 'my-words',

  /* =================================================================
     PURE ENGINE — no DOM. The build gate calls these directly.
     ================================================================= */

  shelfById: function (id) {
    if (id === this.CUSTOM_SHELF) {
      return { id: this.CUSTOM_SHELF, label: this.api ? this.api.t('myWordsShelf') : 'My words',
               band: 'k', phase: 1, free: true, custom: true };
    }
    var sh = (this.bank && this.bank.shelves) || [];
    for (var i = 0; i < sh.length; i++) if (sh[i].id === id) return sh[i];
    return null;
  },

  _shelfUnlocked: function (shelf) {
    if (!shelf) return false;
    return !!(shelf.free || this.premium);
  },

  firstFreeShelf: function () {
    var sh = (this.bank && this.bank.shelves) || [];
    for (var i = 0; i < sh.length; i++) if (sh[i].free) return sh[i].id;
    return sh.length ? sh[0].id : null;
  },

  /* The teacher's own saved words. Namespaced ids (`my:`) so a shared
     ?word= deep link can never silently resolve into the curated set. */
  customWords: function () {
    var list = (this._store && this._store.custom) || [];
    var out = [], i;
    for (i = 0; i < list.length; i++) {
      var w = list[i];
      if (!w || !w.display || !Array.isArray(w.boxes)) continue;
      out.push({
        id: w.id, display: w.display, boxes: w.boxes, heart: w.heart || [],
        heartKind: 'irregular', sentence: w.sentence || '', note: w.note || '',
        shelf: this.CUSTOM_SHELF, mine: true, noImage: true
      });
    }
    return out;
  },

  /* EVERY word the visitor may reach, curated + their own. The shelf-level
     gate still applies — this never widens entitlement, it only stops the
     bookshelf and the review ring silently dropping the teacher's own
     words, which is a bug that looks like nothing at all. */
  allWords: function () {
    var curated = (this.bank && this.bank.words) || [];
    return curated.concat(this.customWords());
  },

  /* THE STRUCTURAL GATE. A locked shelf yields nothing at all, so premium
     words never reach the DOM — not hidden, absent.
     ⚠ Every surface that lists words (the desk search, the accordion, the
     print chooser) MUST read through this. A search written
     `bank.words.filter(...)` leaks the whole premium catalogue in one line
     and looks perfectly correct. */
  wordsForShelf: function (shelfId) {
    if (shelfId === this.CUSTOM_SHELF) return this.customWords();
    var shelf = this.shelfById(shelfId);
    if (!this._shelfUnlocked(shelf)) return [];
    var all = (this.bank && this.bank.words) || [], out = [];
    for (var i = 0; i < all.length; i++) if (all[i].shelf === shelfId) out.push(all[i]);
    return out;
  },

  isHeart: function (word, i) {
    if (!word || !word.heart) return false;
    for (var k = 0; k < word.heart.length; k++) if (word.heart[k] === i) return true;
    return false;
  },

  reassemble: function (word) {
    var out = '', tail = '', i, m;
    for (i = 0; i < (word.boxes || []).length; i++) {
      m = /^(.+)_(.+)$/.exec(word.boxes[i]);
      if (m) { out += m[1]; tail += m[2]; } else out += word.boxes[i];
    }
    return out + tail + (word.silentTail || '');
  },

  /* The visible face of a box: the split-digraph token "a_e" shows only
     its main letter in the box; the tail rides after the last box. */
  boxFace: function (box) {
    var m = /^(.+)_(.+)$/.exec(box);
    return m ? m[1] : box;
  },

  tailText: function (word) {
    var tail = '', i, m;
    for (i = 0; i < (word.boxes || []).length; i++) {
      m = /^(.+)_(.+)$/.exec(word.boxes[i]);
      if (m) tail += m[2];
    }
    return tail + (word.silentTail || '');
  },

  /* Deep links resolve ONLY to content the visitor may actually have.
     Returns null for a locked target without premium — the caller holds
     the link until entitlement is known rather than falling back early. */
  resolveDeepLink: function (params, premium) {
    if (!params) return null;
    var sid = params.shelf, wid = params.word;
    if (!sid && !wid) return null;
    var shelf = null, i, all = (this.bank && this.bank.words) || [];
    if (!sid && wid) {
      for (i = 0; i < all.length; i++) if (all[i].id === wid) { sid = all[i].shelf; break; }
    }
    shelf = this.shelfById(sid);
    if (!shelf) return null;
    if (!shelf.free && !premium) return null;
    var idx = 0;
    if (wid) {
      var list = [];
      for (i = 0; i < all.length; i++) if (all[i].shelf === sid) list.push(all[i]);
      for (i = 0; i < list.length; i++) if (list[i].id === wid) { idx = i; break; }
    }
    return { shelf: sid, index: idx };
  },

  /* ---------------------------------------------------------------
     THE SEGMENTER — greedy longest-match over the locale's own legal
     graphemes. It PROPOSES; the teacher PUBLISHES.

     ⚠ It REFUSES rather than truncating. The version this replaces
     silently glued the overflow into the last box past six, producing a
     welded chunk with no signal to anyone — a silent wrong answer in the
     one place this tool cannot afford one. (It was also dead code: it had
     zero call sites, so the feature it was written for was declared and
     reachable by nobody.)
     --------------------------------------------------------------- */
  segment: function (text, lang) {
    var inv = (this.GRAPHEME_INVENTORY[lang] || []).slice()
      .filter(function (g) { return g.indexOf('_') < 0; })
      .sort(function (a, b) { return b.length - a.length; });
    var s = String(text || '').toLowerCase(), out = [], i = 0, k, hit;
    if (!s) return null;
    while (i < s.length) {
      hit = null;
      for (k = 0; k < inv.length; k++) {
        if (s.substr(i, inv[k].length) === inv[k]) { hit = inv[k]; break; }
      }
      if (hit) { out.push(hit); i += hit.length; } else { out.push(s.charAt(i)); i++; }
    }
    if (out.length < 2) out = s.split('');
    if (out.length < 2) return null;
    /* REFUSE, never truncate. */
    if (out.length > this.MAX_BOXES) return null;
    return out;
  },

  /* Boundary set <-> box list. The seam editor edits boundaries; the
     apparatus renders boxes. One conversion each way, so the two can
     never drift. */
  boxesToCuts: function (boxes) {
    var cuts = {}, at = 0, i;
    for (i = 0; i < boxes.length - 1; i++) { at += boxes[i].length; cuts[at] = true; }
    return cuts;
  },

  cutsToBoxes: function (letters, cuts) {
    var out = [], cur = '', i;
    for (i = 0; i < letters.length; i++) {
      cur += letters[i];
      if (cuts[i + 1] || i === letters.length - 1) { out.push(cur); cur = ''; }
    }
    return out;
  },

  /* Is every un-hearted box a plain grapheme of this locale? Used ONLY to
     WARN — never to block. A teacher may know something about her class
     that a grapheme list does not, and the curated expert bank produced
     exactly this defect once in forty (`goes`), so the warning is not
     hypothetical. */
  looksDecodable: function (boxes, heart, lang) {
    if (!boxes || !boxes.length) return false;
    if (heart && heart.length) return false;
    var inv = this.GRAPHEME_INVENTORY[lang] || [];
    for (var i = 0; i < boxes.length; i++) {
      var b = String(boxes[i]).toLowerCase();
      if (b.length === 1) continue;
      if (inv.indexOf(b) < 0) return false;
    }
    return true;
  },

  heartCap: function (n) { return Math.min(2, Math.floor(n / 2)); },

  fmt: function (key, args) {
    var s = this.api.t(key);
    for (var k in args) if (Object.prototype.hasOwnProperty.call(args, k))
      s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), args[k]);
    return s;
  },

  premium: false,

  /* =================================================================
     LIFECYCLE
     ================================================================= */

  init: function (api) {
    var self = this;
    this.api = api;
    document.body.classList.add('hw-wide');
    injectHeartWordsCSS();

    this.bank = null;
    this.shelfId = null;
    this.index = 0;
    this.mapped = {};
    this.face = 'map';            /* map | sentence | write */
    this.ring = false;
    this.ringList = [];
    this.surface = 'board';       /* board | big | desk */
    this.deskTab = 'words';
    this.query = '';
    this.openShelf = null;
    this.selected = null;
    this.transient = null;        /* a free draft shown live on the board */
    this.premiumKnown = false;
    this.notice = null;
    this._deepPending = null;
    this._timers = [];
    this._store = this._loadStore();
    this._draft = null;
    this._printSheet = 'cards';
    this._printScope = 'shelf';

    /* trust a cached verdict while the network answer is in flight */
    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';

    this._deepPending = this._readParams();

    this._fetchBank();
    this._fetchEntitlement();

    document.addEventListener('keydown', function (e) {
      if (!self._wrap) return;
      var t = e.target || {};
      var typing = t.tagName === 'INPUT' || t.tagName === 'TEXTAREA';
      if (typing) return;
      if (self.surface === 'desk') return;
      if (e.key === 'ArrowRight') { self.go(1); e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { self.go(-1); e.preventDefault(); }
      else if (e.key === 'f' || e.key === 'F') { self.showFace(self.face === 'sentence' ? 'map' : 'sentence'); e.preventDefault(); }
      else if (e.key === ' ' && !(t.classList && t.classList.contains('hw-box'))) { self.speakWord(); e.preventDefault(); }
    });
  },

  _readParams: function () {
    var q = {};
    try {
      var p = new URLSearchParams(location.search);
      if (p.get('shelf')) q.shelf = p.get('shelf');
      if (p.get('word')) q.word = p.get('word');
      if (p.get('ring')) q.ring = true;
      if (p.get('add')) q.add = p.get('add');
    } catch (_) {}
    return (q.shelf || q.word || q.ring || q.add) ? q : null;
  },

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)) || {}; }
    catch (_) { return {}; }
  },

  _saveStore: function () {
    var s = this._store || {};
    s.v = 1;
    s.known = s.known || {};
    s.lastShelf = this.shelfId;
    s.settings = this.api ? this.api.settings : s.settings;
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(s)); } catch (_) {}
  },

  _fetchBank: function () {
    var self = this;
    var url = '/mini-tools/heart-words-' + this.api.lang + '.json';
    fetch(url, { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .catch(function () { return self.FALLBACK_BANK; })
      .then(function (bank) {
        self.bank = bank && bank.words && bank.words.length ? bank : self.FALLBACK_BANK;
        self._applyEntryState();
        self.render();
      });
  },

  /* Entitlement: one seam, cached verdict trusted for ENT_TRUST_DAYS on a
     NETWORK failure only. Any other outcome falls to free. */
  _fetchEntitlement: function () {
    var self = this;
    var token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}

    var trustCache = function () {
      var ent = self._store.ent;
      if (ent && ent.checkedAt) {
        var age = (Date.now() - new Date(ent.checkedAt).getTime()) / 86400000;
        if (age <= self.ENT_TRUST_DAYS) self.premium = ent.tier !== 'free';
        else self.premium = false;
      } else self.premium = false;
      self.premiumKnown = true;
      self._settle();
    };

    if (!token) { self.premium = false; self.premiumKnown = true; self._settle(); return; }

    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) { self.premium = false; self.premiumKnown = true; self._settle(); return; }
        var tier = j.user && j.user.subscriptionTier;
        var sub = j.subscription;
        self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
        self._saveStore();
        self.premiumKnown = true;
        self._settle();
      })
      .catch(trustCache);
  },

  /* Runs once entitlement is known: applies any held deep link, then paints. */
  _settle: function () {
    if (!this.bank) return;
    this._applyEntryState();
    if (this._wrap) this.render();
  },

  _applyEntryState: function () {
    if (!this.bank) return;
    if (this._deepPending && this._deepPending.add && this.premiumKnown) {
      this._ingestSharedList(this._deepPending.add);
      this._deepPending.add = null;
    }
    var d = this._deepPending ? this.resolveDeepLink(this._deepPending, this.premium) : null;
    if (d) {
      this.shelfId = d.shelf;
      this.index = d.index;
      if (this._deepPending && this._deepPending.ring) this.ring = true;
      if (this.premiumKnown) this._deepPending = null;
    } else if (!this.shelfId || !this._shelfUnlocked(this.shelfById(this.shelfId))) {
      /* never strand the visitor on a shelf they cannot open */
      this.shelfId = (this._store.lastShelf && this._shelfUnlocked(this.shelfById(this._store.lastShelf)))
        ? this._store.lastShelf : this.firstFreeShelf();
      this.index = 0;
    }
    this.mapped = {};
  },

  /* ⚠ A shared list is UNTRUSTED INPUT. It is re-validated with the same
     validators the editor uses, and every string reaches the DOM through
     textContent. Never trust a URL to write a shelf. */
  _ingestSharedList: function (raw) {
    var parsed = null;
    try { parsed = JSON.parse(decodeURIComponent(raw)); } catch (_) { return; }
    if (!Array.isArray(parsed)) return;
    var store = this._store, added = 0, i;
    store.custom = store.custom || [];
    for (i = 0; i < parsed.length && store.custom.length < this.MAX_CUSTOM; i++) {
      var c = this._sanitiseCustom(parsed[i]);
      if (!c) continue;
      if (this._hasWord(c.display)) continue;
      store.custom.push(c);
      added++;
    }
    if (added) this._saveStore();
  },

  _sanitiseCustom: function (raw) {
    if (!raw || typeof raw !== 'object') return null;
    var display = String(raw.display || '').toLowerCase().replace(/[^\p{L}]/gu, '');
    if (!display || display.length > this.MAX_LETTERS) return null;
    if (!Array.isArray(raw.boxes) || raw.boxes.length < 2 || raw.boxes.length > this.MAX_BOXES) return null;
    var boxes = raw.boxes.map(function (b) { return String(b).toLowerCase().replace(/[^\p{L}]/gu, ''); });
    /* ⚠ An EMPTY box after stripping. `["c","a","4","t"]` strips to
       `["c","a","","t"]`, which still joins to "cat" and still equals a
       display of "cat" — so the reassembly check alone passes it and the
       apparatus renders a blank tile the child is asked to map. */
    for (var b = 0; b < boxes.length; b++) if (!boxes[b]) return null;
    if (boxes.join('') !== display) return null;
    var heart = Array.isArray(raw.heart) ? raw.heart.filter(function (i) {
      return Number.isInteger(i) && i >= 0 && i < boxes.length;
    }) : [];
    heart = heart.filter(function (v, i, a) { return a.indexOf(v) === i; }).sort(function (a, b) { return a - b; });
    if (!heart.length || heart.length > this.heartCap(boxes.length)) return null;
    var sentence = String(raw.sentence || '').slice(0, 90);
    return { id: 'my:' + display, display: display, boxes: boxes, heart: heart, sentence: sentence };
  },

  _hasWord: function (display) {
    var d = String(display).toLowerCase();
    var all = this.allWords(), i;
    for (i = 0; i < all.length; i++) {
      /* the curated half is only "present" if the visitor can reach it */
      if (all[i].shelf !== this.CUSTOM_SHELF && !this._shelfUnlocked(this.shelfById(all[i].shelf))) continue;
      if (String(all[i].display).toLowerCase() === d) return true;
    }
    return false;
  },

  /* =================================================================
     WORD ACCESS
     ================================================================= */

  list: function () {
    if (this.transient) return [this.transient];
    if (this.ring) return this.ringList;
    var w = this.wordsForShelf(this.shelfId);
    if (this.api && this.api.settings && this.api.settings.order === 'shuffled') {
      w = this._shuffleStable(w, this.shelfId);
    }
    return w;
  },

  /* Deterministic per-shelf shuffle: stable within a session so the strip
     does not reorder under the child's hand. */
  _shuffleStable: function (arr, seedStr) {
    var a = arr.slice(), seed = 0, i, j, t;
    for (i = 0; i < String(seedStr).length; i++) seed = (seed * 31 + String(seedStr).charCodeAt(i)) >>> 0;
    if (!this._shuffleSeed) this._shuffleSeed = (Date.now() % 100000);
    seed = (seed + this._shuffleSeed) >>> 0;
    for (i = a.length - 1; i > 0; i--) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      j = seed % (i + 1);
      t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  },

  current: function () {
    var l = this.list();
    if (!l.length) return null;
    if (this.index >= l.length) this.index = 0;
    if (this.index < 0) this.index = l.length - 1;
    return l[this.index];
  },

  go: function (d) {
    var l = this.list();
    if (l.length < 2) return;
    this.index = (this.index + d + l.length) % l.length;
    this.mapped = {};
    this.face = 'map';
    this.render();
    var w = this.current();
    if (w && this.api.settings.voice) this.speakWord();
  },

  /* =================================================================
     SPEECH — locked to whole words and UI lines. Never a phoneme.
     ================================================================= */

  speakWord: function () {
    var w = this.current();
    if (!w) return;
    try { LCSAudio.speak({ type: 'word', text: w.display, lang: this.api.lang }); } catch (_) {}
  },

  speakSentence: function () {
    var w = this.current();
    if (!w || !w.sentence) return;
    try { LCSAudio.speak({ type: 'ui', text: w.sentence, lang: this.api.lang, rate: 0.95 }); } catch (_) {}
  },

  speakLine: function (text) {
    try { LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.95 }); } catch (_) {}
  },

  /* =================================================================
     THE MAPPING INTERACTION
     ================================================================= */

  onBoxTap: function (i) {
    var w = this.current();
    if (!w) return;
    this._stopDemo();
    var heart = this.isHeart(w, i);
    var already = !!this.mapped[i];
    this.mapped[i] = true;

    var box = this._boxEls && this._boxEls[i];
    if (box) {
      box.classList.add('hw-mapped');
      if (heart) box.classList.add('hw-hearted');
    }
    this._paintBox(i);

    try { this.api.sound(this.PITCHES[Math.min(i, this.PITCHES.length - 1)]); } catch (_) {}

    if (heart && !already) {
      var line = this.api.t('heartLine');
      this.api.announce(line);
      if (this.api.settings.voice) {
        var self = this;
        this._after(180, function () { self.speakLine(line); });
      }
      try {
        var s = this;
        this._after(0, function () { s.api.sound(659); });
        this._after(150, function () { s.api.sound(880); });
      } catch (_) {}
    } else if (!already) {
      this.api.announce(this.fmt('boxOf', { i: i + 1, n: w.boxes.length }) + ' — ' + this.api.t('stateMapped'));
    }

    if (this._allMapped(w)) this._celebrate(w);
  },

  _allMapped: function (w) {
    for (var i = 0; i < w.boxes.length; i++) if (!this.mapped[i]) return false;
    return true;
  },

  _celebrate: function (w) {
    var self = this;
    if (this._celebrated === w.id) return;
    this._celebrated = w.id;

    if (this._row) this._row.classList.add('hw-row-done');

    this._after(140 * (w.boxes.length + 1), function () {
      if (self.api.settings.voice) self.speakWord();
      self.api.announce(self.fmt('wordKnown', { word: w.display }));
      if (self._writeBtn) self._writeBtn.classList.add('hw-shimmer');
    });

    /* the bookshelf remembers, quietly. A transient free draft is NOT a
       classroom record — it is a taste of the machinery, and writing it
       to the shelf would make a free preview look like saved content. */
    if (!this.transient) {
      var st = this._store;
      st.known = st.known || {};
      var now = new Date().toISOString();
      if (!st.known[w.id]) st.known[w.id] = { first: now, last: now };
      else st.known[w.id].last = now;
      this._saveStore();
      this._paintShelf();
    }

    /* the first-run legend has done its job the moment a word is mapped */
    if (!this._store.seen) { this._store.seen = 1; this._saveStore(); }
  },

  /* queued animation steps are cancelled on re-render (stale-node class) */
  _after: function (ms, fn) {
    var id = setTimeout(fn, ms);
    this._timers.push(id);
    return id;
  },

  _clearTimers: function () {
    for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]);
    this._timers = [];
  },

  showFace: function (face) {
    var w = this.current();
    if (!w) return;
    /* defensive skip, never a degraded face: a flip to an empty sentence
       side is worse than no flip control at all */
    if (face === 'sentence' && !w.sentence) return;
    this.face = face;
    if (this._card) {
      this._card.classList.toggle('hw-flipped', face === 'sentence');
      this._card.classList.toggle('hw-writing', face === 'write');
    }
    if (face === 'sentence' && this.api.settings.voice) {
      var self = this;
      this._after(320, function () { self.speakSentence(); });
    }
    if (face === 'write') this.api.announce(this.api.t('writePrompt'));
  },

  /* =================================================================
     RENDER — one entry, three surfaces
     ================================================================= */

  render: function () {
    var api = this.api;
    this._clearTimers();
    this._celebrated = null;
    api.stage.innerHTML = '';

    /* ⚠ the literal 'hw-wrap' stays a bare literal: the shared liveness
       gate derives a tool's class prefix by matching
       api.el('div','<pfx>-wrap'), and concatenating the surface class into
       the same argument makes it unable to resolve heart-words at all. */
    var wrap = api.el('div', 'hw-wrap');
    wrap.classList.add('hw-s-' + this.surface);
    this._wrap = wrap;

    if (!this.bank) {
      wrap.appendChild(api.el('div', 'hw-loading'));
      api.stage.appendChild(wrap);
      return;
    }

    if (this.surface === 'desk') this._renderDesk(wrap);
    else this._renderBoard(wrap);

    /* Sheet A is in the DOM for EVERYONE, filtered by the shelf gate, so a
       free teacher's Ctrl+P produces their free cards instead of the blank
       page this tool used to print. Sheets B and C are absent for a free
       visitor entirely — the absence IS the gate; the chooser is only a
       view, because Ctrl+P bypasses every button on the page. */
    wrap.appendChild(this._buildPrintSheet());

    api.stage.appendChild(wrap);
  },

  /* ---------------- BOARD ---------------- */

  _renderBoard: function (wrap) {
    var self = this, api = this.api;
    var big = this.surface === 'big';

    /* top row: the shelf pill is the ONLY door to the desk */
    if (!big) {
      var top = api.el('div', 'hw-toprow');
      var pill = api.el('button', 'hw-pill');
      pill.type = 'button';
      var shelf = this.shelfById(this.shelfId);
      pill.textContent = this.transient ? api.t('myWordsShelf')
        : (this.ring ? api.t('ringStart') : (shelf ? shelf.label : api.t('shelfPick')));
      pill.setAttribute('aria-label', api.t('shelfPick'));
      pill.addEventListener('click', function () { self.surface = 'desk'; self.deskTab = 'words'; self.render(); });
      top.appendChild(pill);
      wrap.appendChild(top);
    }

    /* the card, in its own container-query bed */
    var w = this.current();
    var bed = api.el('div', 'hw-cardbed');
    var stage = api.el('div', 'hw-cardstage');
    if (!w) {
      var empty = api.el('p', 'hw-empty');
      empty.textContent = this.ring ? api.t('ringEmpty') : api.t('bookEmpty');
      stage.appendChild(empty);
    } else {
      stage.appendChild(this._buildCard(w));
    }
    bed.appendChild(stage);
    wrap.appendChild(bed);

    /* nav */
    if (w && this.list().length > 1) {
      var nav = api.el('div', 'hw-nav');
      var prev = api.el('button', 'hw-navbtn');
      prev.type = 'button'; prev.innerHTML = this._chevronSVG(false);
      prev.setAttribute('aria-label', api.t('prevWord'));
      prev.addEventListener('click', function () { self.go(-1); });
      var next = api.el('button', 'hw-navbtn');
      next.type = 'button'; next.innerHTML = this._chevronSVG(true);
      next.setAttribute('aria-label', api.t('nextWord'));
      next.addEventListener('click', function () { self.go(1); });
      nav.appendChild(prev); nav.appendChild(next);
      wrap.appendChild(nav);
    }

    if (big) {
      var out = api.el('button', 'hw-toolbtn');
      out.type = 'button';
      out.textContent = api.t('bigWordLeave');
      out.addEventListener('click', function () { self.surface = 'board'; self.render(); });
      var brow = api.el('div', 'hw-tools');
      brow.appendChild(out);
      wrap.appendChild(brow);
      this._after(0, function () { self._paintBoxes(); });
      return;
    }

    /* first-run legend — one line, gone forever once a word is mapped */
    if (!this._store.seen && w) {
      var leg = api.el('p', 'hw-legend');
      leg.innerHTML = this._heartSVG() + '<span>' + this._esc(api.t('heartLegend')) + '</span>';
      wrap.appendChild(leg);
    }

    wrap.appendChild(this._buildShelf());
    wrap.appendChild(this._buildTools());

    /* the demonstration: two seconds, no state, once ever. The teacher SEES
       the routine before reading a word — which is the only way, because
       strings.instruction is display:none in every embed and the tool page
       always passes &embed=1. */
    if (!this._store.seen && w) this._after(700, function () { self._runDemo(); });
  },

  _buildCard: function (w) {
    var self = this, api = this.api;
    var card = api.el('div', 'hw-card'
      + (this.face === 'sentence' ? ' hw-flipped' : '')
      + (this.face === 'write' ? ' hw-writing' : ''));
    this._card = card;

    /* ---- FRONT: the mapping face ---- */
    var front = api.el('div', 'hw-face hw-face-map');

    var spk = api.el('button', 'hw-wordspeak');
    spk.type = 'button';
    spk.setAttribute('aria-label', api.t('hearWord'));
    spk.innerHTML = this._speakerSVG(26);
    spk.addEventListener('click', function () { self.speakWord(); });
    front.appendChild(spk);

    front.appendChild(this._buildRow(w, false));

    if (w.mine) {
      var mk = api.el('span', 'hw-minemark');
      mk.textContent = api.t('myWordMark');
      front.appendChild(mk);
    }

    var foot = api.el('div', 'hw-cardfoot');
    if (w.sentence) {
      var flip = api.el('button', 'hw-flip');
      flip.type = 'button';
      flip.textContent = api.t('flipToSee');
      flip.addEventListener('click', function () { self.showFace('sentence'); });
      foot.appendChild(flip);
    }
    var wr = api.el('button', 'hw-flip hw-flip-write');
    wr.type = 'button';
    wr.textContent = api.t('writeIt');
    wr.addEventListener('click', function () { self.showFace('write'); });
    this._writeBtn = wr;
    foot.appendChild(wr);
    front.appendChild(foot);

    card.appendChild(front);

    /* ---- BACK: the sentence face ---- */
    if (w.sentence) {
      var hasPic = !!(w.imageDir && w.imageFile);
      var back = api.el('div', 'hw-face hw-face-sentence' + (hasPic ? '' : ' hw-noimage'));
      if (hasPic) {
        var well = api.el('div', 'hw-picwell');
        var img = api.el('img', 'hw-pic');
        img.src = '/image-library-webp/themes/' + encodeURIComponent(w.imageDir) + '/' + w.imageFile + '@2x.webp';
        img.alt = w.nounForm || w.sentenceNoun || '';
        img.draggable = false;
        img.addEventListener('dragstart', function (e) { e.preventDefault(); });
        well.appendChild(img);
        back.appendChild(well);
      }
      var sent = api.el('p', 'hw-sentence');
      sent.innerHTML = this._sentenceHTML(w);
      back.appendChild(sent);

      var srow = api.el('div', 'hw-sentrow');
      var ss = api.el('button', 'hw-wordspeak hw-sentspeak');
      ss.type = 'button';
      ss.setAttribute('aria-label', api.t('hearSentence'));
      ss.innerHTML = this._speakerSVG(22);
      ss.addEventListener('click', function () { self.speakSentence(); });
      srow.appendChild(ss);
      var back2 = api.el('button', 'hw-flip');
      back2.type = 'button';
      back2.textContent = api.t('flipBack');
      back2.addEventListener('click', function () { self.showFace('map'); });
      srow.appendChild(back2);
      back.appendChild(srow);
      card.appendChild(back);
    }

    /* ---- THE WRITE FACE: the routine's ending ----
       The word goes away. The same boxes stand in the same places, empty.
       The child writes it, brings it back, and does the comparing —
       nothing is ever marked, which is both the pedagogy and the law. */
    var wf = api.el('div', 'hw-face hw-face-write');
    var wp = api.el('p', 'hw-writeprompt');
    wp.textContent = api.t('writePrompt');
    wf.appendChild(wp);
    wf.appendChild(this._buildRow(w, true));
    var wfoot = api.el('div', 'hw-cardfoot');
    var showb = api.el('button', 'hw-flip');
    showb.type = 'button';
    showb.textContent = api.t('showWord');
    showb.addEventListener('click', function () { self.showFace('map'); });
    wfoot.appendChild(showb);
    wf.appendChild(wfoot);
    card.appendChild(wf);

    this._after(0, function () { self._paintBoxes(); });
    return card;
  },

  /* One row builder for both the live apparatus and the blank write row —
     so the two can never drift apart in size or rhythm, which is the whole
     point of the write step. */
  _buildRow: function (w, blank) {
    var self = this, api = this.api;
    var row = api.el('div', 'hw-boxrow' + (blank ? ' hw-blankrow' : ''));
    var tail = this.tailText(w);
    row.style.setProperty('--hw-n', w.boxes.length + (tail ? 0.68 : 0));
    var els = [];
    for (var i = 0; i < w.boxes.length; i++) {
      (function (idx) {
        var b = api.el(blank ? 'div' : 'button', 'hw-box');
        if (!blank) {
          b.type = 'button';
          b.dataset.i = idx;
          b.addEventListener('click', function () { self.onBoxTap(idx); });
        } else {
          b.setAttribute('aria-hidden', 'true');
        }
        row.appendChild(b);
        els.push(b);
      })(i);
    }

    /* ⚠ THE TAIL BELONGS IN THE ROW. Appending it to the column-flex face
       put the silent `e` of a split digraph on its own LINE — `make`
       rendered [m][a][k] and then a floating grey e — so the file's own
       stated invariant ("join(boxes)+silentTail always spells the word")
       was true in the data and false on screen. */
    if (tail) {
      var tl = api.el('span', 'hw-tail');
      tl.textContent = blank ? '' : tail;
      row.appendChild(tl);
      /* the swoop: how many tiles sit between the split box and the tail */
      var splitAt = -1;
      for (var q = 0; q < w.boxes.length; q++) if (/_/.test(w.boxes[q])) splitAt = q;
      if (splitAt >= 0) row.style.setProperty('--hw-splitspan', (w.boxes.length - splitAt - 1));
      else tl.classList.add('hw-tail-plain');
    }

    if (!blank) { this._boxEls = els; this._row = row; }
    return row;
  },

  /* The heart word inside the sentence: weight + the tool's OWN heart.
     Never a system text glyph — its weight, shape and very presence are at
     the mercy of whatever the platform falls back to. */
  _sentenceHTML: function (w) {
    var s = this._esc(w.sentence || '');
    var d = this._esc(w.display || '');
    if (!d) return s;
    var re = new RegExp('(^|[^\\p{L}])(' + d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')([^\\p{L}]|$)', 'iu');
    var m = re.exec(s);
    if (!m) return s;
    var mark = '<b class="hw-sent-target">' + m[2]
      + '<span class="hw-sent-heart" aria-hidden="true">' + this._heartSVG() + '</span></b>';
    return s.slice(0, m.index) + m[1] + mark + m[3] + s.slice(m.index + m[0].length);
  },

  _esc: function (s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  },

  _paintBoxes: function () {
    var w = this.current();
    if (!w || !this._boxEls) return;
    for (var i = 0; i < this._boxEls.length; i++) this._paintBox(i);
  },

  _paintBox: function (i) {
    var w = this.current(), api = this.api;
    if (!w || !this._boxEls || !this._boxEls[i]) return;
    var b = this._boxEls[i];
    var face = this.boxFace(w.boxes[i]);
    var heart = this.isHeart(w, i);
    var mapped = !!this.mapped[i];

    var cls = 'hw-glyph' + (face.length > 1 ? ' hw-multi hw-g' + Math.min(face.length, 4) : '');
    var html = '<span class="' + cls + '">' + this._esc(face) + '</span>';
    if (heart && mapped) html += this._heartSVG();
    b.innerHTML = html;

    b.classList.toggle('hw-mapped', mapped);
    b.classList.toggle('hw-hearted', heart && mapped);

    var label = this.fmt('boxOf', { i: i + 1, n: w.boxes.length }) + ': ' + face;
    if (heart) label += ' — ' + api.t('heartPart');
    if (mapped) label += ' (' + api.t('stateMapped') + ')';
    b.setAttribute('aria-label', label);
  },

  /* ---- the silent demonstration ---- */
  _runDemo: function () {
    var self = this, w = this.current();
    if (!w || !this._boxEls || this._boxEls.length < 2 || this._store.seen) return;
    this._demo = true;
    var heartIdx = (w.heart && w.heart.length) ? w.heart[0] : 1;
    var plainIdx = heartIdx === 0 ? 1 : 0;
    var reduce = false;
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (_) {}

    var mark = function (i, hearted) {
      var b = self._boxEls && self._boxEls[i];
      if (!b || !self._demo) return;
      b.classList.add('hw-mapped', 'hw-demo');
      if (hearted) {
        b.classList.add('hw-hearted');
        b.innerHTML = b.innerHTML + self._heartSVG();
      }
    };
    var clear = function () {
      if (!self._demo) return;
      self._demo = false;
      if (!self._boxEls) return;
      for (var i = 0; i < self._boxEls.length; i++) {
        self._boxEls[i].classList.remove('hw-mapped', 'hw-hearted', 'hw-demo');
      }
      self._paintBoxes();
    };

    if (reduce) { mark(plainIdx, false); mark(heartIdx, true); this._after(1200, clear); return; }
    this._after(0,    function () { mark(plainIdx, false); });
    this._after(760,  function () { mark(heartIdx, true); });
    this._after(2000, clear);
  },

  _stopDemo: function () {
    if (!this._demo) return;
    this._demo = false;
    if (this._boxEls) for (var i = 0; i < this._boxEls.length; i++)
      this._boxEls[i].classList.remove('hw-mapped', 'hw-hearted', 'hw-demo');
    this._paintBoxes();
  },

  /* =================================================================
     THE BOOKSHELF — the words themselves. It never counts.
     ================================================================= */

  _buildShelf: function () {
    var api = this.api;
    var box = api.el('div', 'hw-shelf');
    this._shelfEl = box;
    var head = api.el('div', 'hw-shelf-head');
    head.textContent = api.t('bookshelf');
    box.appendChild(head);
    var rail = api.el('div', 'hw-shelf-rail');
    this._shelfRail = rail;
    box.appendChild(rail);
    this._paintShelf();
    return box;
  },

  _paintShelf: function () {
    var self = this, api = this.api;
    var rail = this._shelfRail;
    if (!rail) return;
    rail.innerHTML = '';
    var known = (this._store && this._store.known) || {};
    var all = this.allWords();
    var shown = 0;
    for (var i = 0; i < all.length; i++) {
      var w = all[i];
      if (!known[w.id]) continue;
      /* only words the visitor may actually open */
      if (!this._shelfUnlocked(this.shelfById(w.shelf))) continue;
      (function (word) {
        var sp = api.el('button', 'hw-spine' + (word.mine ? ' hw-spine-mine' : ''));
        sp.type = 'button';
        sp.textContent = word.display;
        sp.addEventListener('click', function () { self._jumpTo(word); });
        rail.appendChild(sp);
      })(w);
      shown++;
    }
    rail.classList.toggle('hw-rail-empty', !shown);
    if (!shown) {
      var p = api.el('p', 'hw-shelf-empty');
      p.textContent = api.t('bookEmpty');
      rail.appendChild(p);
    }
  },

  _jumpTo: function (word) {
    if (this.ring) this.ring = false;
    this.transient = null;
    this.shelfId = word.shelf;
    var l = this.list();
    for (var i = 0; i < l.length; i++) if (l[i].id === word.id) { this.index = i; break; }
    this.mapped = {};
    this.face = 'map';
    this.surface = 'board';
    this.render();
  },

  /* =================================================================
     BOARD TOOLS
     ================================================================= */

  _buildTools: function () {
    var self = this, api = this.api;
    var row = api.el('div', 'hw-tools');

    var bigb = api.el('button', 'hw-toolbtn');
    bigb.type = 'button';
    bigb.textContent = api.t('bigWord');
    bigb.addEventListener('click', function () { self.surface = 'big'; self.render(); });
    row.appendChild(bigb);

    var ring = api.el('button', 'hw-toolbtn');
    ring.type = 'button';
    ring.textContent = this.ring ? api.t('ringLeave') : api.t('ringStart');
    ring.addEventListener('click', function () { self._toggleRing(); });
    row.appendChild(ring);

    return row;
  },

  _toggleRing: function () {
    this.transient = null;
    if (this.ring) { this.ring = false; this.index = 0; this.mapped = {}; this.render(); return; }
    var known = (this._store && this._store.known) || {};
    var all = this.allWords(), list = [], i;
    for (i = 0; i < all.length; i++) {
      if (!known[all[i].id]) continue;
      if (!this._shelfUnlocked(this.shelfById(all[i].shelf))) continue;
      list.push(all[i]);
    }
    /* oldest visit first — the ordering signal is never displayed */
    list.sort(function (a, b) {
      return String(known[a.id].last).localeCompare(String(known[b.id].last));
    });
    this.ringList = list;
    this.ring = true;
    this.index = 0;
    this.mapped = {};
    this.face = 'map';
    this.render();
  },

  /* =================================================================
     THE DESK — adult-facing, IN FLOW (see the header note on why)
     ================================================================= */

  _renderDesk: function (wrap) {
    var self = this, api = this.api;
    var desk = api.el('div', 'hw-desk');

    var head = api.el('div', 'hw-desk-head');
    /* A real tablist. ⚠ The SELECTED tab is `disabled` and carries
       aria-selected, deliberately: a tab you are already on has nowhere to
       go, and leaving it clickable makes it a control whose click produces
       an identical DOM — precisely the consequence-free control the shared
       liveness gate scores as DEAD, and it scored this one dead three times
       over. The choice was to manufacture an effect for it or to stop
       presenting it as actionable; the second is the honest one, and it is
       also what a screen reader should hear. */
    var tabs = api.el('div', 'hw-tabs');
    tabs.setAttribute('role', 'tablist');
    var defs = [['words', 'deskWords'], ['mine', 'deskMine'], ['print', 'deskPrint']];
    for (var i = 0; i < defs.length; i++) {
      (function (key, lbl) {
        var on = self.deskTab === key;
        var t = api.el('button', 'hw-tab' + (on ? ' hw-tab-on' : ''));
        t.type = 'button';
        t.textContent = api.t(lbl);
        t.setAttribute('role', 'tab');
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        if (on) { t.disabled = true; return void tabs.appendChild(t); }
        t.addEventListener('click', function () {
          /* leaving a tab drops that tab's transient view state, so
             returning to it is a clean surface rather than a stale one */
          self.deskTab = key; self.notice = null;
          self.query = ''; self.openShelf = null; self.selected = null;
          self.render();
        });
        tabs.appendChild(t);
      })(defs[i][0], defs[i][1]);
    }
    head.appendChild(tabs);
    var back = api.el('button', 'hw-deskback');
    back.type = 'button';
    back.textContent = api.t('deskBack');
    back.addEventListener('click', function () { self.surface = 'board'; self.notice = null; self.render(); });
    head.appendChild(back);
    desk.appendChild(head);

    var body = api.el('div', 'hw-desk-body');
    if (this.deskTab === 'words') this._deskWords(body);
    else if (this.deskTab === 'mine') this._deskMine(body);
    else this._deskPrint(body);
    desk.appendChild(body);

    desk.appendChild(this._buildSiblings());
    wrap.appendChild(desk);
  },

  /* ---- Words tab: search + accordion + the note ---- */
  _deskWords: function (body) {
    var self = this, api = this.api;

    var sw = api.el('div', 'hw-searchwrap');
    var inp = api.el('input', 'hw-ed-input hw-search');
    inp.type = 'search';
    inp.value = this.query;
    inp.setAttribute('aria-label', api.t('searchWords'));
    inp.placeholder = api.t('searchWords');
    inp.addEventListener('input', function () {
      self.query = inp.value;
      self._paintWordList();
    });
    sw.appendChild(inp);
    body.appendChild(sw);

    var host = api.el('div', 'hw-wordlist');
    this._listHost = host;
    body.appendChild(host);
    this._paintWordList();
  },

  /* ⚠ EVERY path here reads through wordsForShelf(). Iterating bank.words
     directly would leak the whole premium catalogue into the DOM in one
     line that looks perfectly correct. */
  _paintWordList: function () {
    var self = this, api = this.api;
    var host = this._listHost;
    if (!host) return;
    host.innerHTML = '';

    var shelves = ((this.bank && this.bank.shelves) || []).slice();
    if (this.customWords().length) shelves.push(this.shelfById(this.CUSTOM_SHELF));

    var q = String(this.query || '').trim().toLowerCase();

    if (q) {
      var hits = [], i, k;
      for (i = 0; i < shelves.length; i++) {
        var ws = this.wordsForShelf(shelves[i].id);
        for (k = 0; k < ws.length; k++) {
          var d = String(ws[k].display).toLowerCase();
          if (d.indexOf(q) < 0) continue;
          hits.push({ w: ws[k], starts: d.indexOf(q) === 0 });
        }
      }
      hits.sort(function (a, b) { return (b.starts ? 1 : 0) - (a.starts ? 1 : 0); });
      if (!hits.length) {
        var none = api.el('p', 'hw-desknote');
        none.textContent = api.t('searchNone');
        host.appendChild(none);
        return;
      }
      var grid = api.el('div', 'hw-wordgrid');
      for (i = 0; i < hits.length; i++) grid.appendChild(this._wordChip(hits[i].w));
      host.appendChild(grid);
      return;
    }

    for (var s = 0; s < shelves.length; s++) {
      (function (shelf) {
        var unlocked = self._shelfUnlocked(shelf);
        var open = (self.openShelf || self.shelfId) === shelf.id;
        var sec = api.el('div', 'hw-shelfsec' + (unlocked ? '' : ' hw-locked'));

        var row = api.el('button', 'hw-shelfrow');
        row.type = 'button';
        row.setAttribute('aria-expanded', open ? 'true' : 'false');
        var lbl = api.el('span', 'hw-shelflabel');
        lbl.textContent = shelf.label;
        row.appendChild(lbl);
        if (!unlocked) {
          var lock = api.el('span', 'hw-lock');
          lock.textContent = api.t('lockedShelf');
          row.appendChild(lock);
        }
        row.addEventListener('click', function () {
          if (!unlocked) { self.notice = 'gatePremium'; self.openShelf = null; self.render(); return; }
          self.openShelf = open ? null : shelf.id;
          self.notice = null;
          self._paintWordList();
        });
        sec.appendChild(row);

        if (unlocked && open) {
          var teach = api.el('button', 'hw-teachbtn');
          teach.type = 'button';
          teach.textContent = api.t('teachShelf');
          teach.addEventListener('click', function () {
            self.transient = null; self.ring = false;
            self.shelfId = shelf.id; self.index = 0; self.mapped = {};
            self.face = 'map'; self.surface = 'board';
            self._saveStore(); self.render();
          });
          sec.appendChild(teach);

          /* THE STRUCTURAL GATE: the word grid is built only when the shelf
             is genuinely open — a locked shelf emits no displays. */
          var grid2 = api.el('div', 'hw-wordgrid');
          var words = self.wordsForShelf(shelf.id);
          for (var k = 0; k < words.length; k++) grid2.appendChild(self._wordChip(words[k]));
          sec.appendChild(grid2);
        }
        host.appendChild(sec);
      })(shelves[s]);
    }

    /* the selected word's note — ten locales of native teacher-grade
       "why is this word tricky", authored on every word and, until now,
       rendered nowhere at all */
    if (this.selected && this.selected.note) {
      var nb = api.el('div', 'hw-notebox');
      var nh = api.el('div', 'hw-notehead');
      nh.textContent = api.t('teacherNote') + ' — ' + this.selected.display;
      nb.appendChild(nh);
      var np = api.el('p', 'hw-noteline');
      np.textContent = this.selected.note;
      nb.appendChild(np);
      host.appendChild(nb);
    }

    if (this.notice) host.appendChild(this._buildGateLine(this.notice));
  },

  _wordChip: function (word) {
    var self = this, api = this.api;
    var t = api.el('button', 'hw-wordchip' + (word.mine ? ' hw-chip-mine' : ''));
    t.type = 'button';
    t.textContent = word.display;
    if (this._store.known && this._store.known[word.id]) t.classList.add('hw-chip-known');
    t.addEventListener('click', function () {
      self.selected = word;
      self.transient = null;
      self.ring = false;
      self.shelfId = word.shelf;
      var l = self.list();
      for (var z = 0; z < l.length; z++) if (l[z].id === word.id) { self.index = z; break; }
      self.mapped = {};
      self.face = 'map';
      self.surface = 'board';
      self._saveStore();
      self.render();
    });
    return t;
  },

  /* =================================================================
     THE CUSTOM-WORD EDITOR

     The machine PROPOSES a split. The teacher PUBLISHES it.
     ⭐ The tool NEVER guesses the heart, and that asymmetry is the whole
     design: a wrong SPLIT is visible on the surface and correctable at a
     glance, so the machine may offer one; a wrong HEART is an invisible
     pedagogical assertion the machine has no basis for, and a pre-stamped
     guess is accepted by a busy teacher PRECISELY BECAUSE it looks
     decided. There is no confidence score, no tick, no "looks good" —
     the same reasoning that forbids telling a child he is right forbids
     telling a teacher the split is right.
     ================================================================= */

  _deskMine: function (body) {
    var self = this, api = this.api;

    var hint = api.el('p', 'hw-desknote');
    hint.textContent = api.t('myWordsHint');
    body.appendChild(hint);

    /* the worked FAILURE, shown permanently. One concrete wrong answer
       calibrates a teacher's trust far better than a paragraph of
       hedging, and it costs one static row. */
    var ex = api.el('p', 'hw-worked');
    ex.textContent = api.t('workedExample');
    body.appendChild(ex);

    var field = api.el('label', 'hw-ed-field');
    var ta = api.el('textarea', 'hw-ed-input hw-ed-area');
    ta.rows = 3;
    ta.placeholder = api.t('pasteHint');
    ta.setAttribute('aria-label', api.t('pasteHint'));
    field.appendChild(ta);
    body.appendChild(field);

    var addb = api.el('button', 'hw-ed-btn');
    addb.type = 'button';
    addb.textContent = api.t('addWords');
    addb.addEventListener('click', function () { var v = ta.value; ta.value = ''; self._addFromText(v); });
    body.appendChild(addb);

    if (this.notice) body.appendChild(this._buildGateLine(this.notice));

    if (this._draft) body.appendChild(this._buildEditor());

    var drafts = (this._store.drafts || []);
    var saved = (this._store.custom || []);
    if (drafts.length || saved.length) {
      var dh = api.el('div', 'hw-listhead');
      dh.textContent = api.t('deskMine');
      body.appendChild(dh);
    }
    for (var i = 0; i < drafts.length; i++) body.appendChild(this._customRow(drafts[i], true));
    for (var k = 0; k < saved.length; k++) body.appendChild(this._customRow(saved[k], false));

    if (saved.length) {
      var dev = api.el('p', 'hw-desknote hw-tiny');
      dev.textContent = api.t('deviceOnly');
      body.appendChild(dev);

      var cp = api.el('button', 'hw-ed-btn hw-ed-ghost');
      cp.type = 'button';
      cp.textContent = api.t('copyList');
      cp.addEventListener('click', function () { self._copyList(); });
      body.appendChild(cp);
    }
  },

  /* ⚠ Add APPENDS. The shipped precedent this borrows from does
     `_draft = words.map(...)`, which destroys every seam correction the
     teacher already made the moment she adds one more word. */
  _addFromText: function (text) {
    var parts = String(text || '').split(/[\n,;]+/), i;
    var store = this._store;
    store.drafts = store.drafts || [];
    this.notice = null;
    for (i = 0; i < parts.length; i++) {
      var raw = parts[i].trim().toLowerCase().replace(/[^\p{L}]/gu, '');
      if (!raw) continue;
      if (store.drafts.length + (store.custom || []).length >= this.MAX_CUSTOM) { this.notice = 'capReached'; break; }
      if (raw.length > this.MAX_LETTERS) { this.notice = 'tooLong'; continue; }
      if (this._hasWord(raw) || this._inDrafts(raw)) { this.notice = 'duplicateSkip'; continue; }
      var boxes = this.segment(raw, this.api.lang);
      /* REFUSED, with a reason — never silently truncated */
      if (!boxes) { this.notice = 'tooLong'; continue; }
      /* ⭐ heart deliberately EMPTY. The machine does not guess it. */
      store.drafts.push({ id: 'my:' + raw, display: raw, boxes: boxes, heart: [], sentence: '' });
      this._draft = store.drafts[store.drafts.length - 1];
    }
    this._saveStore();
    this.render();
  },

  _inDrafts: function (d) {
    var list = this._store.drafts || [];
    for (var i = 0; i < list.length; i++) if (list[i].display === d) return true;
    return false;
  },

  _buildEditor: function () {
    var self = this, api = this.api;
    var d = this._draft;
    var ed = api.el('div', 'hw-editor');

    /* ---- seam row: letters + a real tap target between each pair ---- */
    var sh = api.el('p', 'hw-ed-label');
    sh.textContent = api.t('seamHint');
    ed.appendChild(sh);

    var letters = d.display.split('');
    var cuts = this.boxesToCuts(d.boxes);
    var seam = api.el('div', 'hw-seamrow');
    for (var i = 0; i < letters.length; i++) {
      var tile = api.el('span', 'hw-seamtile');
      tile.textContent = letters[i];
      seam.appendChild(tile);
      if (i < letters.length - 1) {
        (function (at) {
          var s = api.el('button', 'hw-seam' + (cuts[at] ? ' hw-seam-cut' : ''));
          s.type = 'button';
          s.setAttribute('aria-pressed', cuts[at] ? 'true' : 'false');
          s.setAttribute('aria-label', api.t('seamHint'));
          s.addEventListener('click', function () {
            var c = self.boxesToCuts(d.boxes);
            if (c[at]) delete c[at]; else c[at] = true;
            var nb = self.cutsToBoxes(d.display.split(''), c);
            if (nb.length > self.MAX_BOXES) { self.notice = 'tooLong'; self.render(); return; }
            d.boxes = nb;
            /* a heart index can no longer be trusted once the boxes move */
            d.heart = [];
            self.notice = null;
            self._saveStore();
            self.render();
          });
          seam.appendChild(s);
        })(i + 1);
      }
    }
    ed.appendChild(seam);

    /* ---- the live preview IS the apparatus, and IS the validator ---- */
    var hh = api.el('p', 'hw-ed-label');
    hh.textContent = api.t('heartHint');
    ed.appendChild(hh);

    var prev = api.el('div', 'hw-ed-preview');
    var prow = api.el('div', 'hw-boxrow');
    prow.style.setProperty('--hw-n', d.boxes.length);
    for (var k = 0; k < d.boxes.length; k++) {
      (function (idx) {
        var on = d.heart.indexOf(idx) >= 0;
        var b = api.el('button', 'hw-box hw-mapped' + (on ? ' hw-hearted' : ''));
        b.type = 'button';
        var face = d.boxes[idx];
        var cls = 'hw-glyph' + (face.length > 1 ? ' hw-multi hw-g' + Math.min(face.length, 4) : '');
        b.innerHTML = '<span class="' + cls + '">' + self._esc(face) + '</span>'
          + (on ? self._heartSVG() : '');
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        b.setAttribute('aria-label', self.fmt('boxOf', { i: idx + 1, n: d.boxes.length }) + ': ' + face);
        b.addEventListener('click', function () {
          var at = d.heart.indexOf(idx);
          if (at >= 0) d.heart.splice(at, 1);
          else {
            if (d.heart.length >= self.heartCap(d.boxes.length)) { self.notice = 'tooManyHearts'; self.render(); return; }
            d.heart.push(idx);
            d.heart.sort(function (a, b2) { return a - b2; });
          }
          self.notice = null;
          self._saveStore();
          self.render();
        });
        prow.appendChild(b);
      })(k);
    }
    prev.appendChild(prow);

    /* the reassembly, shown plainly. No error text, no red field, no icon —
       the teacher sees the parts and fixes them. The adult side of the same
       no-verdict discipline the child's side runs on.
       ⚠ Through reassemble(), not boxes.join(''), so a split-digraph token
       is handled by the one function that knows how. */
    if (this.reassemble(d) !== d.display) {
      var bad = api.el('p', 'hw-reassemble');
      bad.textContent = d.boxes.join(' · ');
      prev.appendChild(bad);
    }
    ed.appendChild(prev);

    /* ---- optional sentence ---- */
    var sf = api.el('label', 'hw-ed-field');
    var sl = api.el('span', 'hw-ed-label');
    sl.textContent = api.t('sentenceOpt');
    sf.appendChild(sl);
    var si = api.el('input', 'hw-ed-input');
    si.type = 'text';
    si.maxLength = 90;
    si.value = d.sentence || '';
    si.addEventListener('change', function () { d.sentence = si.value.trim(); self._saveStore(); });
    sf.appendChild(si);
    ed.appendChild(sf);

    /* ---- the fully-decodable WARNING (never a block) ---- */
    if (this.looksDecodable(d.boxes, d.heart, this.api.lang)) {
      var wl = api.el('p', 'hw-warnline');
      wl.textContent = api.t('looksDecodable') + ' ';
      var a = api.el('a', 'hw-sib-link');
      a.href = '/mini-tools/sound-boxes.html?lang=' + this.api.lang;
      a.target = '_top';
      a.textContent = api.t('siblingSbx');
      wl.appendChild(a);
      ed.appendChild(wl);
    }

    /* ---- the two exits ---- */
    var acts = api.el('div', 'hw-ed-acts');

    /* FREE: the teacher's own word, live, on their own board. That is a
       better taste than ten more words. */
    var showb = api.el('button', 'hw-ed-btn hw-ed-ghost');
    showb.type = 'button';
    showb.textContent = api.t('showOnBoard');
    showb.addEventListener('click', function () {
      if (!d.heart.length) { self.notice = 'needHeart'; self.render(); return; }
      self.transient = {
        id: d.id, display: d.display, boxes: d.boxes, heart: d.heart,
        heartKind: 'irregular', sentence: d.sentence || '', shelf: self.CUSTOM_SHELF,
        mine: true, noImage: true
      };
      self.index = 0; self.mapped = {}; self.face = 'map';
      self.surface = 'board'; self.notice = null;
      self.render();
    });
    acts.appendChild(showb);

    var save = api.el('button', 'hw-ed-btn' + (this.premium ? '' : ' hw-locked'));
    save.type = 'button';
    save.textContent = api.t('saveWord');
    /* ⭐ inert until the teacher has performed the marking act. The heart is
       the pedagogical claim; it must never be a default that survives
       inattention. */
    save.disabled = !d.heart.length;
    save.addEventListener('click', function () {
      if (!d.heart.length) { self.notice = 'needHeart'; self.render(); return; }
      if (!self.premium) { self.notice = 'gateSave'; self.render(); return; }
      var store = self._store;
      store.custom = store.custom || [];
      if (store.custom.length >= self.MAX_CUSTOM) { self.notice = 'capReached'; self.render(); return; }
      store.custom.push({ id: d.id, display: d.display, boxes: d.boxes, heart: d.heart, sentence: d.sentence || '' });
      store.drafts = (store.drafts || []).filter(function (x) { return x.id !== d.id; });
      self._draft = null;
      self.notice = null;
      self._saveStore();
      self.render();
    });
    acts.appendChild(save);
    ed.appendChild(acts);

    return ed;
  },

  _customRow: function (item, isDraft) {
    var self = this, api = this.api;
    var row = api.el('div', 'hw-customrow' + (isDraft ? ' hw-isdraft' : ''));
    var name = api.el('button', 'hw-customname');
    name.type = 'button';
    name.textContent = item.display;
    name.addEventListener('click', function () {
      self._draft = item;
      self.notice = null;
      self.render();
    });
    row.appendChild(name);

    var boxes = api.el('span', 'hw-customboxes');
    boxes.textContent = item.boxes.join(' · ');
    row.appendChild(boxes);

    var del = api.el('button', 'hw-customdel');
    del.type = 'button';
    del.setAttribute('aria-label', api.t('deleteWord') + ': ' + item.display);
    del.innerHTML = '&#10005;';
    del.addEventListener('click', function () {
      var key = isDraft ? 'drafts' : 'custom';
      self._store[key] = (self._store[key] || []).filter(function (x) { return x.id !== item.id; });
      if (self._draft && self._draft.id === item.id) self._draft = null;
      if (self.transient && self.transient.id === item.id) self.transient = null;
      self._saveStore();
      self.render();
    });
    row.appendChild(del);
    return row;
  },

  _copyList: function () {
    var self = this;
    var payload = (this._store.custom || []).map(function (w) {
      return { display: w.display, boxes: w.boxes, heart: w.heart, sentence: w.sentence || '' };
    });
    var url = location.origin + '/mini-tools/heart-words.html?lang=' + this.api.lang
      + '&add=' + encodeURIComponent(JSON.stringify(payload));
    var done = function () { self.notice = 'copied'; self.render(); };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, done);
        return;
      }
    } catch (_) {}
    done();
  },

  /* =================================================================
     THE GATE — inline, never blocking. A fixed modal cannot make a
     content-driven iframe grow, so it is not one.
     ================================================================= */

  _buildGateLine: function (key) {
    var self = this, api = this.api;
    var g = api.el('div', 'hw-gate');
    var art = api.el('div', 'hw-gate-art');
    art.setAttribute('aria-hidden', 'true');
    art.innerHTML = '<i></i><i></i><i class="hw-gate-seal">' + this._heartSVG() + '</i>';
    g.appendChild(art);
    var p = api.el('p', 'hw-gate-line');
    p.textContent = api.t(key);
    g.appendChild(p);
    if (key === 'gatePremium' || key === 'gateSave') {
      var a = api.el('a', 'hw-gate-cta');
      a.href = '/' + api.lang + '/pricing?from=tool-heart-words';
      a.target = '_top';
      a.textContent = api.t('unlock');
      g.appendChild(a);
    }
    var c = api.el('button', 'hw-gate-close');
    c.type = 'button';
    c.textContent = api.t('shelfClose');
    c.addEventListener('click', function () { self.notice = null; self.render(); });
    g.appendChild(c);
    return g;
  },

  /* =================================================================
     PRINT — three sheets, and the ENTITLEMENT IS THE DOM, not the chip.
     Ctrl+P bypasses every button on the page, so B and C are simply not
     built for a free visitor and the chooser is only a view.
     ================================================================= */

  _deskPrint: function (body) {
    var self = this, api = this.api;

    var sheets = [['cards', 'sheetCards', false], ['strip', 'sheetStrip', true], ['home', 'sheetHome', true]];
    var box = api.el('div', 'hw-radio');
    for (var i = 0; i < sheets.length; i++) {
      (function (val, lbl, paid) {
        if (paid && !self.premium) return;       /* absent, not disabled */
        var b = api.el('button', 'hw-radiobtn' + (self._printSheet === val ? ' hw-radio-on' : ''));
        b.type = 'button';
        b.setAttribute('aria-pressed', self._printSheet === val ? 'true' : 'false');
        b.textContent = api.t(lbl);
        b.addEventListener('click', function () { self._printSheet = val; self.render(); });
        box.appendChild(b);
      })(sheets[i][0], sheets[i][1], sheets[i][2]);
    }
    body.appendChild(box);

    var scopes = [['shelf', 'scopeShelf']];
    if (this.customWords().length) scopes.push(['mine', 'scopeMine']);
    var sbox = api.el('div', 'hw-radio');
    for (var k = 0; k < scopes.length; k++) {
      (function (val, lbl) {
        var b = api.el('button', 'hw-radiobtn' + (self._printScope === val ? ' hw-radio-on' : ''));
        b.type = 'button';
        b.setAttribute('aria-pressed', self._printScope === val ? 'true' : 'false');
        b.textContent = api.t(lbl);
        b.addEventListener('click', function () { self._printScope = val; self.render(); });
        sbox.appendChild(b);
      })(scopes[k][0], scopes[k][1]);
    }
    body.appendChild(sbox);

    /* what will actually come out of the printer, before it does */
    var what = api.el('p', 'hw-desknote');
    var sh = this.shelfById(this._printScope === 'mine' ? this.CUSTOM_SHELF : this.shelfId);
    what.textContent = (sh && sh.label) || '';
    body.appendChild(what);

    var pr = api.el('button', 'hw-ed-btn');
    pr.type = 'button';
    pr.textContent = api.t('printCards');
    pr.addEventListener('click', function () {
      try { window.print(); } catch (_) { /* no printer in a headless gate */ }
    });
    body.appendChild(pr);

    if (!this.premium) body.appendChild(this._buildGateLine('gatePremium'));
  },

  _printWords: function () {
    if (this._printScope === 'mine') return this.customWords();
    return this.wordsForShelf(this.shelfId);
  },

  _buildPrintSheet: function () {
    var api = this.api;
    var sheet = api.el('div', 'hw-printsheet');
    /* B and C are never BUILT for a free visitor, whatever the chooser
       last said — the absence is the gate. */
    var kind = (this._printSheet !== 'cards' && !this.premium) ? 'cards' : this._printSheet;
    sheet.setAttribute('data-sheet', kind);
    var words = this._printWords();
    if (!words.length) return sheet;

    var note = api.el('p', 'hw-printnote');
    note.textContent = kind === 'home' ? api.t('homeNote') : api.t('printNote');
    sheet.appendChild(note);

    var perPage = kind === 'strip' ? 5 : (kind === 'home' ? 4 : 6);
    var page = null, i;
    for (i = 0; i < words.length; i++) {
      if (i % perPage === 0) {
        page = api.el('div', 'hw-printpage');
        sheet.appendChild(page);
      }
      page.appendChild(this._printCard(words[i], kind));
    }
    return sheet;
  },

  _printCard: function (w, kind) {
    var api = this.api;
    var card = api.el('div', 'hw-printcard');
    var front = api.el('div', 'hw-printfront');
    var word = api.el('div', 'hw-printword');
    var html = '', k;
    /* On the take-home sheet the boxes print EMPTY and the heart prints
       OPEN, for the child to write into and colour. On screen the heart is
       stamped for you; on paper the child stamps it. That is what a
       printable is FOR. */
    var blank = kind === 'home';
    for (k = 0; k < w.boxes.length; k++) {
      var face = this.boxFace(w.boxes[k]);
      var isH = this.isHeart(w, k);
      html += '<span class="hw-printbox' + (face.length > 1 ? ' hw-pmulti' : '') + '">'
        + '<span>' + (blank ? '' : this._esc(face)) + '</span>'
        + (isH ? this._heartSVG('hw-printheart') : '') + '</span>';
    }
    var tail = this.tailText(w);
    if (tail) html += '<span class="hw-printtail">' + (blank ? '' : this._esc(tail)) + '</span>';
    word.innerHTML = html;
    front.appendChild(word);
    card.appendChild(front);

    if (kind !== 'strip') {
      var back = api.el('div', 'hw-printback');
      var s = api.el('div', 'hw-printsent');
      s.textContent = w.sentence || '';
      back.appendChild(s);
      card.appendChild(back);
    }
    /* the note becomes the note to the grown-up at home — the only place
       ten locales of authored teacher prose leaves the classroom */
    if (kind === 'home' && w.note) {
      var n = api.el('div', 'hw-printgrown');
      n.textContent = w.note;
      card.appendChild(n);
    }
    return card;
  },

  /* =================================================================
     SIBLING PHONICS TOOLS (the quartet footer — teacher navigation, so
     it lives on the desk, never on the child's touch surface)
     ================================================================= */

  _buildSiblings: function () {
    var api = this.api;
    var f = api.el('div', 'hw-siblings');
    var lbl = api.el('span', 'hw-sib-label');
    lbl.textContent = api.t('trioLabel') + ' ';
    f.appendChild(lbl);
    var defs = [
      { file: 'sound-boxes', key: 'siblingSbx' },
      { file: 'blending-board', key: 'siblingBbd' },
      { file: 'letter-tiles', key: 'siblingLtl' }
    ];
    for (var i = 0; i < defs.length; i++) {
      if (i) {
        var sep = api.el('span', 'hw-sib-sep');
        sep.textContent = ' · ';
        f.appendChild(sep);
      }
      var a = api.el('a', 'hw-sib-link');
      a.href = '/mini-tools/' + defs[i].file + '.html?lang=' + api.lang;
      a.target = '_top';
      a.textContent = api.t(defs[i].key);
      f.appendChild(a);
    }
    return f;
  },

  /* =================================================================
     SHELL HOOKS + ART
     ================================================================= */

  _speakerSVG: function (s) {
    return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" aria-hidden="true" focusable="false">'
      + '<path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/>'
      + '<path d="M16.5 8.5a5 5 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
      + '</svg>';
  },

  _chevronSVG: function (right) {
    var d = right ? 'M9 5l7 7-7 7' : 'M15 5l-7 7 7 7';
    return '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false">'
      + '<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="2.6" '
      + 'stroke-linecap="round" stroke-linejoin="round"/></svg>';
  },

  /* An OUTLINE heart with its HALO PAINTED INTO THE PATH, so it stays
     legible where it half-overhangs onto a neighbouring tile. The size is
     CSS, derived from the tile — one place, not an argument at every call
     site. Deliberately unlike Sound Boxes' solid decorative chip that
     fills a whole box. */
  _heartSVG: function (extraClass) {
    var d = 'M12 20.3S4.9 15.8 3 12.2C1.4 9 3.2 5.7 6.4 5.7c2 0 3.2 1.1 3.9 2.1.7-1 1.9-2.1 '
          + '3.9-2.1 3.2 0 5 3.3 3.4 6.5-1.9 3.6-9 8.1-9 8.1z';
    return '<svg class="hw-heart' + (extraClass ? ' ' + extraClass : '') + '" viewBox="0 0 24 24" '
      + 'aria-hidden="true" focusable="false">'
      + '<path d="' + d + '" fill="none" stroke="#FFFDF7" stroke-width="6.4" '
      + 'stroke-linejoin="round" stroke-linecap="round"/>'
      + '<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="2.6" '
      + 'stroke-linejoin="round" stroke-linecap="round"/>'
      + '</svg>';
  },

  reset: function () {
    this._clearTimers();
    this.mapped = {};
    this.face = 'map';
    this.ring = false;
    this.index = 0;
    this._celebrated = null;
    this.surface = 'board';
    this.transient = null;
    this.notice = null;
    this.query = '';
    this._demo = false;
    this.render();
  },

  onSettings: function () {
    this._saveStore();
    this.mapped = {};
    this.face = 'map';
    this.render();
  }
};

/* =====================================================================
   CSS — injected once, tool-scoped with the hw- prefix. The tool writes
   no protected shell selectors.

   ⚠ ONE DRIVER. Everything on the card derives from --hw-u, which derives
   from a CONTAINER query on .hw-cardbed. The rule this replaces sized the
   tile as a percentage of .hw-boxrow, whose width came from
   .hw-card{width:fit-content}, whose width came from the boxes — CYCLIC,
   so the browser fell back to auto and every tile in every render ever
   shipped collapsed onto its 56px min-height. A 2-box word at 360px and a
   5-box word at 1024px measured the SAME.

   ⚠ container-type goes on .hw-cardbed and NOWHERE ELSE. On .hw-wrap its
   `contain:layout` would make any fixed-position descendant size to the
   wrap instead of the viewport; on .hw-cardstage it would fight the
   perspective that makes the flip work.

   ⚠ NO @media (min-width:1367px) TIERS. The tool page pins the iframe at
   704px on every desktop and media queries inside an iframe resolve
   against the IFRAME, so viewport tiers are decoration that only ever
   fires on the standalone URL.
   ===================================================================== */
function injectHeartWordsCSS() {
  if (document.getElementById('hw-style')) return;
  var st = document.createElement('style');
  st.id = 'hw-style';
  st.textContent = ''
    + '.hw-wrap{display:flex;flex-direction:column;align-items:center;'
    + 'gap:clamp(10px,2.2vmin,18px);width:100%;padding:4px 8px 12px;box-sizing:border-box;'
    + '--hw-ink:#2A2A35;--hw-warm:#EFE3CC;--hw-line:#EBDFC7;--hw-seal:#E0552A;--hw-teal:#146B5E}'
    + '.hw-loading{min-height:180px}'
    + '.hw-toprow{display:flex;justify-content:center;width:100%}'
    + '.hw-pill{font:600 15px/1.2 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#146B5E;'
    + 'background:#FFF9EE;border:2px solid #146B5E33;border-radius:999px;padding:9px 18px;'
    + 'min-height:44px;cursor:pointer}'
    + '.hw-pill:hover{background:#FFF3DC}'
    + '.hw-empty{font:500 15px/1.5 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#8A7C66;'
    + 'text-align:center;margin:24px 8px}'

    /* ---------- the one driver ---------- */
    + '.hw-cardbed{width:100%;max-width:640px;margin-inline:auto;'
    + 'margin-block:clamp(4px,1.4vmin,14px);container-type:inline-size;'
    + '--hw-pad:clamp(14px,3cqi,26px);--hw-g:clamp(6px,1.6cqi,18px);'
    + '--hw-row:calc(100cqi - 2 * var(--hw-pad) - 4px)}'
    + '.hw-s-big .hw-cardbed{max-width:none}'
    + '.hw-cardstage{width:100%;perspective:1200px}'
    + '.hw-card{position:relative;width:100%;transform-style:preserve-3d;'
    + 'transition:transform .52s cubic-bezier(.4,.1,.2,1)}'
    + '.hw-card.hw-flipped{transform:rotateY(180deg)}'

    + '.hw-face{width:100%;box-sizing:border-box;background:#FFFDF7;border:1.5px solid var(--hw-line);'
    + 'border-radius:clamp(20px,3.4cqi,30px);padding:var(--hw-pad);'
    + 'box-shadow:inset 0 1px 0 #FFFFFF,0 2px 0 var(--hw-warm),0 18px 34px -20px rgba(58,46,34,.34);'
    + 'display:flex;flex-direction:column;align-items:center;gap:clamp(12px,2.6cqi,24px);'
    + 'backface-visibility:hidden;-webkit-backface-visibility:hidden}'
    /* the card sizes to the VISIBLE face: whichever is showing stays in
       flow, the others go absolute. A fixed min-height sized to the front
       let the taller sentence face overflow and cover its neighbours. */
    + '.hw-face-map{position:relative}'
    + '.hw-face-sentence,.hw-face-write{position:absolute;inset:0;justify-content:center}'
    + '.hw-face-sentence{transform:rotateY(180deg)}'
    + '.hw-card.hw-flipped .hw-face-map{position:absolute;inset:0}'
    + '.hw-card.hw-flipped .hw-face-sentence{position:relative;inset:auto}'
    + '.hw-face-write{opacity:0;pointer-events:none;transition:opacity .2s var(--lcs-ease,ease)}'
    + '.hw-card.hw-writing .hw-face-write{position:relative;inset:auto;opacity:1;pointer-events:auto}'
    + '.hw-card.hw-writing .hw-face-map{position:absolute;inset:0;opacity:0;pointer-events:none}'

    + '.hw-wordspeak{width:44px;height:44px;flex:0 0 auto;border-radius:50%;'
    + 'border:2px solid #146B5E22;background:#FFF9EE;color:#146B5E;cursor:pointer;'
    + 'display:flex;align-items:center;justify-content:center}'
    + '.hw-wordspeak:hover{background:#FFF3DC}'

    /* ---------- the box row ---------- */
    + '.hw-boxrow{--hw-u:clamp(44px,calc((var(--hw-row) - (var(--hw-n) - 1) * var(--hw-g)) / var(--hw-n)),184px);'
    + 'display:flex;flex-wrap:nowrap;justify-content:center;align-items:stretch;'
    + 'gap:var(--hw-g);width:100%;position:relative}'
    + '.hw-box{position:relative;flex:0 0 auto;width:var(--hw-u);height:var(--hw-u);'
    + 'border:max(2px,calc(var(--hw-u) * .018)) solid #DCCFB4;'
    + 'border-radius:calc(var(--hw-u) * .155);background:#FFF9EE;'
    + 'box-shadow:0 calc(var(--hw-u) * .022) 0 #E4D7BC,'
    + '0 calc(var(--hw-u) * .05) calc(var(--hw-u) * .09) calc(var(--hw-u) * -.05) rgba(58,46,34,.20);'
    + 'display:flex;align-items:center;justify-content:center;padding:0;cursor:pointer;'
    + 'touch-action:manipulation;'
    + 'transition:transform .16s var(--lcs-ease,ease),box-shadow .16s var(--lcs-ease,ease),'
    + 'border-color .16s var(--lcs-ease,ease),background .16s var(--lcs-ease,ease)}'
    + '.hw-box:hover{background:#FFFDF7}'
    + '.hw-box:active{transform:translateY(calc(var(--hw-u) * .015))}'
    + '.hw-box:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);'
    + 'outline-offset:calc(var(--hw-u) * .04)}'
    + '.hw-glyph{position:relative;font-family:var(--lcs-font-display,"Baloo 2"),Nunito,system-ui,sans-serif;'
    + 'font-weight:700;line-height:1;color:var(--hw-ink);letter-spacing:0;'
    + 'font-variant-ligatures:none;font-size:max(13px,calc(var(--hw-u) * .46))}'
    /* negative tracking on a multi-letter grapheme. The +.5px this replaces
       was pushing `th` APART — actively teaching the opposite of "these
       letters are one sound". */
    + '.hw-glyph.hw-g2{font-size:max(13px,calc(var(--hw-u) * .355));letter-spacing:-.015em}'
    + '.hw-glyph.hw-g3{font-size:max(13px,calc(var(--hw-u) * .265));letter-spacing:-.02em}'
    + '.hw-glyph.hw-g4{font-size:max(13px,calc(var(--hw-u) * .205));letter-spacing:-.025em}'
    /* the tie is INK, not coral, and a pseudo-element of the glyph so its
       width is structural. Coral now means the heart and nothing else. */
    + '.hw-glyph.hw-multi::after{content:"";position:absolute;left:0;right:0;bottom:-.17em;'
    + 'height:max(2px,.058em);border-radius:999px;background:#8A7C66}'

    /* settled: a DEPTH change, not a colour one — legible to a colour-blind
       child and in a monochrome photocopy. The tile presses IN. */
    + '.hw-box.hw-mapped{background:#FFFFFF;border-color:var(--hw-teal);'
    + 'transform:translateY(calc(var(--hw-u) * .022));'
    + 'box-shadow:inset 0 calc(var(--hw-u) * .02) 0 rgba(20,107,94,.14),0 0 0 0 #E4D7BC,'
    + '0 calc(var(--hw-u) * .02) calc(var(--hw-u) * .05) calc(var(--hw-u) * -.03) rgba(58,46,34,.16)}'
    + '.hw-box.hw-mapped::after{content:"";position:absolute;left:16%;right:16%;'
    + 'bottom:calc(var(--hw-u) * -.075);height:max(3px,calc(var(--hw-u) * .026));'
    + 'border-radius:999px;background:var(--hw-teal);transform:scaleX(0);transform-origin:center;'
    + 'animation:hw-seat .24s var(--lcs-ease,ease) forwards}'
    + '@keyframes hw-seat{to{transform:scaleX(1)}}'

    /* THE SEAL. Half-overhanging the corner, so it can never touch the
       glyph at any tile size — structurally, not by tuning. The heart is
       ADDITIONAL, never ALTERNATIVE: every mapped tile settles the same. */
    + '.hw-heart{position:absolute;z-index:3;top:calc(var(--hw-u) * -.09);'
    + 'right:calc(var(--hw-u) * -.07);width:max(16px,calc(var(--hw-u) * .30));'
    + 'height:max(16px,calc(var(--hw-u) * .30));color:var(--hw-seal);'
    + 'animation:hw-seal .38s cubic-bezier(.34,1.56,.64,1) forwards;pointer-events:none}'
    + '@keyframes hw-seal{0%{transform:scale(.38) rotate(-14deg);opacity:0}'
    + '55%{transform:scale(1.14) rotate(3deg);opacity:1}'
    + '100%{transform:scale(1) rotate(0deg);opacity:1}}'
    /* the glow ring is what carries the room — a 55px glyph alone does not */
    + '.hw-box.hw-hearted::before{content:"";position:absolute;inset:0;border-radius:inherit;'
    + 'pointer-events:none;animation:hw-heartglow .62s ease-out 1}'
    + '@keyframes hw-heartglow{0%{box-shadow:0 0 0 0 rgba(224,85,42,.42)}'
    + '100%{box-shadow:0 0 0 calc(var(--hw-u) * .22) rgba(224,85,42,0)}}'
    + '.hw-row-done{animation:hw-rowdone .42s cubic-bezier(.34,1.56,.64,1) 1}'
    + '@keyframes hw-rowdone{50%{transform:translateY(-3px)}}'

    /* the tail: a dashed GHOST TILE inside the row, plus the swoop */
    + '.hw-tail{position:relative;flex:0 0 auto;align-self:stretch;'
    + 'width:calc(var(--hw-u) * .68);height:var(--hw-u);display:flex;align-items:center;'
    + 'justify-content:center;margin-left:calc(var(--hw-g) * -.15);'
    + 'border:max(2px,calc(var(--hw-u) * .016)) dashed #CFC3AC;'
    + 'border-radius:calc(var(--hw-u) * .155);background:transparent;'
    + 'font-family:var(--lcs-font-display,"Baloo 2"),Nunito,system-ui,sans-serif;'
    + 'font-weight:700;line-height:1;color:#A99B84;font-size:max(12px,calc(var(--hw-u) * .40))}'
    + '.hw-tail:not(.hw-tail-plain)::before{content:"";position:absolute;'
    + 'right:calc(var(--hw-u) * .34);'
    + 'left:calc(-1 * (var(--hw-splitspan,1) * (var(--hw-u) + var(--hw-g)) + var(--hw-u) * .16));'
    + 'bottom:calc(var(--hw-u) * -.10);height:calc(var(--hw-u) * .20);'
    + 'border:0 solid #8A7C66;border-bottom-width:max(2px,calc(var(--hw-u) * .018));'
    + 'border-radius:0 0 calc(var(--hw-u) * .5) calc(var(--hw-u) * .5) / 0 0 100% 100%;'
    + 'pointer-events:none}'
    /* the write row: the same geometry, empty */
    + '.hw-blankrow .hw-box{background:#FDFBF4;border-style:dashed;border-color:#D8CBB2;'
    + 'box-shadow:none;cursor:default}'
    + '.hw-blankrow .hw-tail{opacity:.45}'
    + '.hw-writeprompt{font:600 clamp(14px,2.6cqi,19px)/1.45 var(--lcs-font-body,Nunito),system-ui,sans-serif;'
    + 'color:#5D7A74;text-align:center;margin:0}'

    /* ---------- card foot ---------- */
    + '.hw-cardfoot{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;width:100%}'
    + '.hw-flip{font:600 14px/1.2 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#146B5E;'
    + 'background:#EFF6F3;border:1.5px solid #CFE2DB;border-radius:999px;padding:12px 18px;'
    + 'min-height:44px;cursor:pointer}'
    + '.hw-flip:hover{background:#E3EFEA}'
    + '.hw-flip-write{background:#FFF1E8;border-color:#F3D6C6;color:#B4491F}'
    + '.hw-flip-write:hover{background:#FFE7D9}'
    + '.hw-shimmer{animation:hw-shimmer 1.1s ease 2}'
    + '@keyframes hw-shimmer{50%{box-shadow:0 0 0 4px rgba(224,85,42,.20)}}'
    + '.hw-minemark{font:600 11px/1 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#8A7C66;'
    + 'text-transform:uppercase;letter-spacing:.07em}'

    /* ---------- sentence face ---------- */
    + '.hw-picwell{width:min(calc(100cqi * .46),250px);aspect-ratio:1/1;flex:0 0 auto;'
    + 'border-radius:calc(100cqi * .045);'
    + 'background:radial-gradient(ellipse 60% 40% at 50% 87%,rgba(58,46,34,.14),rgba(58,46,34,0) 72%),#FFF9EE;'
    + 'box-shadow:inset 0 0 0 1.5px var(--hw-warm);display:flex;align-items:center;'
    + 'justify-content:center;overflow:hidden}'
    + '.hw-pic{width:100%;height:100%;object-fit:contain;padding:7%;box-sizing:border-box;'
    + 'user-select:none;-webkit-user-drag:none;animation:hw-fadein .26s ease-out}'
    + '.hw-sentence{font-family:var(--lcs-font-body,Nunito),system-ui,sans-serif;font-weight:600;'
    + 'font-size:clamp(17px,calc(100cqi * .045),30px);line-height:1.42;color:#3A3226;'
    + 'text-align:center;margin:0;max-width:min(calc(100cqi * .82),460px);text-wrap:balance}'
    + '.hw-face-sentence.hw-noimage .hw-sentence{font-size:clamp(22px,calc(100cqi * .066),44px);'
    + 'font-weight:700;line-height:1.3;max-width:min(calc(100cqi * .88),520px);'
    + 'padding-block:clamp(14px,4cqi,40px)}'
    + '.hw-sentrow{display:flex;align-items:center;justify-content:center;gap:14px}'
    + '.hw-sent-target{font-weight:800;color:var(--hw-ink);white-space:nowrap}'
    + '.hw-sent-heart{display:inline-block;width:.62em;height:.62em;margin-left:.16em;'
    + 'vertical-align:-.04em;color:var(--hw-seal)}'
    + '.hw-sent-heart .hw-heart{position:static;width:100%;height:100%;animation:none}'

    /* ---------- nav / legend / tools ---------- */
    + '.hw-nav{display:flex;gap:16px;justify-content:center}'
    + '.hw-navbtn{width:48px;height:48px;border-radius:50%;border:2px solid #146B5E22;'
    + 'background:#FFF9EE;color:#146B5E;cursor:pointer;display:flex;align-items:center;'
    + 'justify-content:center}'
    + '.hw-navbtn:hover{background:#FFF3DC}'
    + '.hw-legend{display:flex;align-items:center;gap:8px;margin:0;'
    + 'font:600 13px/1.4 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#8A7C66;text-align:center}'
    + '.hw-legend .hw-heart{position:static;width:22px;height:22px;flex:0 0 auto;animation:none}'
    + '.hw-tools{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}'
    + '.hw-toolbtn{font:600 14px/1.2 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#3F6B62;'
    + 'background:#FFF9EE;border:1.5px solid #DCE6E2;border-radius:999px;padding:12px 18px;'
    + 'min-height:44px;cursor:pointer}'
    + '.hw-toolbtn:hover{background:#F1F7F5}'

    /* ---------- the bookshelf: readable words on a drawn board ----------
       The spines this replaces were 12px rotated vertical type in a hashed
       hue — mauve in en and olive in de for the same word, so a colour
       varied without meaning; and you could not READ them, which is the one
       thing a word shelf must do. width:fit-content on the rail is the
       progress-bar fix: the board can only ever be as wide as the cards
       standing on it, so a single word can never read as a 4% filled bar
       (the old hw-rail-empty guard only covered N=0, and the failure is at
       N=1-4, which is where every classroom starts). */
    + '.hw-shelf{width:100%;max-width:660px;background:#FFF9EE;border:1.5px solid var(--hw-warm);'
    + 'border-radius:18px;padding:12px 14px 14px;margin-top:clamp(10px,2.6vmin,22px);box-sizing:border-box}'
    + '.hw-shelf-head{font:700 12px/1.2 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#8A7C66;'
    + 'text-transform:uppercase;letter-spacing:.07em;text-align:center;margin-bottom:10px}'
    + '.hw-shelf-rail{display:flex;flex-wrap:wrap;gap:7px 8px;align-items:flex-end;'
    + 'justify-content:center;width:fit-content;max-width:100%;margin-inline:auto;min-width:0;'
    + 'max-height:calc(3 * 46px + 2 * 7px);overflow-y:auto;overscroll-behavior:contain;'
    + 'padding:2px 6px 0;position:relative}'
    + '.hw-shelf-rail::after{content:"";display:block;position:sticky;bottom:0;flex:1 0 100%;'
    + 'height:10px;margin-top:5px;'
    + 'background:linear-gradient(180deg,#E2C58A 0 3px,#C9A227 3px 7px,#A8871C 7px 100%);'
    + 'border-radius:2px 2px 5px 5px;box-shadow:0 4px 7px -4px rgba(58,46,34,.5)}'
    + '.hw-shelf-rail.hw-rail-empty{min-height:0}'
    + '.hw-shelf-rail.hw-rail-empty::after{display:none}'
    + '.hw-spine{writing-mode:horizontal-tb;min-height:44px;padding:8px 12px 9px;'
    + 'background:#FFFDF7;color:#3A3226;border:1.5px solid var(--hw-line);'
    + 'border-radius:5px 5px 2px 2px;box-shadow:0 1px 0 var(--hw-warm),1px 1px 0 rgba(58,46,34,.05);'
    + 'font:700 clamp(13px,1.6vmin,16px)/1 var(--lcs-font-body,Nunito),system-ui,sans-serif;'
    + 'cursor:pointer;transform-origin:bottom center;'
    + 'transition:transform .16s var(--lcs-ease,ease),box-shadow .16s var(--lcs-ease,ease)}'
    + '.hw-spine:nth-child(5n){transform:rotate(-2.2deg)}'
    + '.hw-spine:nth-child(7n){transform:rotate(1.8deg)}'
    + '.hw-spine:hover{transform:translateY(-3px) rotate(0deg);box-shadow:0 4px 0 var(--hw-warm)}'
    + '.hw-spine:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px}'
    + '.hw-spine-mine{border-style:dashed}'
    + '.hw-shelf-empty{font:italic 500 13px/1.45 var(--lcs-font-body,Nunito),system-ui,sans-serif;'
    + 'color:#A99B84;margin:4px 0 0;text-align:center}'

    /* ---------- THE DESK: cooler, flatter, tighter, RECTANGULAR ----------
       Pill -> rounded rect is the whole trick. It costs one number and a
       teacher knows in 200ms which side of the tool they are on, in every
       locale, without a word. */
    + '.hw-desk{width:100%;max-width:660px;background:#FFFFFF;border:1px solid #DCE6E2;'
    + 'border-radius:14px;border-top:4px solid var(--hw-teal);padding:16px;box-sizing:border-box;'
    + 'box-shadow:0 12px 30px -20px rgba(20,45,40,.4)}'
    + '.hw-desk-head{display:flex;flex-wrap:wrap;gap:10px;align-items:center;'
    + 'justify-content:space-between;margin-bottom:14px}'
    + '.hw-tabs{display:flex;gap:6px;flex-wrap:wrap}'
    + '.hw-tab{font:600 13px/1 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#3F6B62;'
    + 'background:#EEF4F2;border:1px solid #DCE6E2;border-radius:10px;padding:12px 14px;'
    + 'min-height:44px;cursor:pointer}'
    + '.hw-tab-on{background:var(--hw-teal);border-color:var(--hw-teal);color:#FFFFFF;cursor:default;opacity:1}'
    + '.hw-deskback{font:600 13px/1 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#3F6B62;'
    + 'background:none;border:1px solid #DCE6E2;border-radius:10px;padding:12px 14px;'
    + 'min-height:44px;cursor:pointer}'
    + '.hw-desk-body{display:flex;flex-direction:column;gap:12px}'
    + '.hw-desknote{font:500 13px/1.5 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#5D7A74;margin:0}'
    + '.hw-tiny{font-size:12px;color:#7A8F8A}'
    + '.hw-worked{font:500 12px/1.5 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#7A8F8A;'
    + 'background:#F7FAF9;border:1px dashed #DCE6E2;border-radius:10px;padding:9px 11px;margin:0}'
    + '.hw-listhead{font:700 12px/1.3 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#5D7A74;'
    + 'text-transform:uppercase;letter-spacing:.06em;margin-top:6px}'
    + '.hw-searchwrap{display:block}'
    + '.hw-ed-input{width:100%;font:600 16px/1.3 var(--lcs-font-body,Nunito),system-ui,sans-serif;'
    + 'color:var(--hw-ink);background:#FFFFFF;border:1px solid #DCE6E2;border-radius:10px;'
    + 'padding:11px 12px;min-height:44px;box-sizing:border-box}'
    + '.hw-ed-input:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:1px}'
    + '.hw-ed-area{resize:vertical;min-height:76px}'
    + '.hw-ed-field{display:block}'
    + '.hw-ed-label{display:block;font:700 12px/1.4 var(--lcs-font-body,Nunito),system-ui,sans-serif;'
    + 'color:#5D7A74;text-transform:uppercase;letter-spacing:.06em;margin:0 0 5px}'
    + '.hw-wordlist{display:flex;flex-direction:column;gap:2px}'
    + '.hw-shelfsec{border-top:1px solid #EEF2F0;padding:6px 0}'
    + '.hw-shelfrow{display:flex;align-items:center;justify-content:space-between;gap:10px;'
    + 'width:100%;background:none;border:0;border-radius:10px;padding:12px 8px;min-height:44px;'
    + 'cursor:pointer;text-align:left}'
    + '.hw-shelfrow:hover{background:#F7FAF9}'
    + '.hw-shelflabel{font:700 12px/1.35 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#5D7A74;'
    + 'text-transform:uppercase;letter-spacing:.06em}'
    + '.hw-lock{font:600 11px/1 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#3F6B62;'
    + 'background:#EEF4F2;border:1px solid #DCE6E2;border-radius:6px;padding:5px 9px;white-space:nowrap}'
    + '.hw-teachbtn{font:600 13px/1 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#FFFFFF;'
    + 'background:var(--hw-teal);border:0;border-radius:10px;padding:12px 14px;min-height:44px;'
    + 'cursor:pointer;margin:2px 0 8px}'
    + '.hw-wordgrid{display:flex;flex-wrap:wrap;gap:7px;padding:2px 0 8px}'
    + '.hw-wordchip{font:600 14px/1 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:var(--hw-ink);'
    + 'background:#FFFFFF;border:1px solid #DCE6E2;border-radius:10px;padding:10px 13px;'
    + 'min-height:44px;cursor:pointer}'
    + '.hw-wordchip:hover{background:#F7FAF9}'
    /* an inset bar, not a hue — "already on the shelf" needs a non-colour carrier */
    + '.hw-wordchip.hw-chip-known{border-color:var(--hw-teal);box-shadow:inset 3px 0 0 var(--hw-teal)}'
    + '.hw-chip-mine{border-style:dashed}'
    + '.hw-notebox{background:#F7FAF9;border:1px solid #DCE6E2;border-radius:10px;padding:11px 13px}'
    + '.hw-notehead{font:700 11px/1.3 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#5D7A74;'
    + 'text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px}'
    + '.hw-noteline{font:500 14px/1.5 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#2A2A35;margin:0}'

    /* ---------- the custom-word editor ---------- */
    + '.hw-editor{display:flex;flex-direction:column;gap:10px;background:#F7FAF9;'
    + 'border:1px solid #DCE6E2;border-radius:12px;padding:13px;container-type:inline-size;'
    + '--hw-pad:10px;--hw-g:6px;--hw-row:calc(100cqi - 26px)}'
    + '.hw-seamrow{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:0}'
    + '.hw-seamtile{display:inline-flex;align-items:center;justify-content:center;'
    + 'min-width:34px;height:44px;background:#FFFFFF;border:1px solid #DCE6E2;border-radius:7px;'
    + 'font:700 19px/1 var(--lcs-font-display,"Baloo 2"),Nunito,system-ui,sans-serif;color:var(--hw-ink)}'
    /* a real tap target between every pair — one tap toggles both ways, so
       there is one gesture, not a drag vocabulary a finger cannot hit */
    + '.hw-seam{width:24px;height:44px;background:none;border:0;padding:0;cursor:pointer;'
    + 'position:relative;flex:0 0 auto}'
    + '.hw-seam::before{content:"";position:absolute;left:50%;top:9px;bottom:9px;width:3px;'
    + 'margin-left:-1.5px;border-radius:2px;background:#C9D6D2}'
    + '.hw-seam.hw-seam-cut::before{background:var(--hw-seal);top:4px;bottom:4px}'
    + '.hw-seam:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:1px;border-radius:4px}'
    + '.hw-ed-preview{background:#FBF3E4;border:1px solid #E7DCC8;border-radius:12px;padding:14px 10px 18px}'
    + '.hw-ed-preview .hw-boxrow{--hw-u:clamp(40px,calc((var(--hw-row) - (var(--hw-n) - 1) * 6px) / var(--hw-n)),86px)}'
    + '.hw-reassemble{font:600 13px/1.4 var(--lcs-font-body,Nunito),system-ui,sans-serif;'
    + 'color:var(--hw-seal);text-align:center;margin:14px 0 0}'
    + '.hw-warnline{font:500 13px/1.5 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#8A6A3A;'
    + 'background:#FFF8EC;border:1px solid #EBD9B8;border-radius:10px;padding:9px 11px;margin:0}'
    + '.hw-ed-acts{display:flex;flex-wrap:wrap;gap:8px}'
    + '.hw-ed-btn{font:700 14px/1 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#FFFFFF;'
    + 'background:var(--hw-teal);border:0;border-radius:10px;padding:13px 18px;min-height:44px;'
    + 'cursor:pointer}'
    + '.hw-ed-btn:disabled{opacity:.45;cursor:not-allowed}'
    + '.hw-ed-ghost{background:#EEF4F2;color:#3F6B62;border:1px solid #DCE6E2}'
    + '.hw-ed-btn.hw-locked{background:#8FB3AB}'
    + '.hw-customrow{display:flex;align-items:center;gap:9px;background:#FFFFFF;'
    + 'border:1px solid #DCE6E2;border-radius:10px;padding:7px 9px}'
    + '.hw-isdraft{border-style:dashed}'
    + '.hw-customname{flex:1 1 auto;text-align:left;background:none;border:0;cursor:pointer;'
    + 'font:700 15px/1.2 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:var(--hw-ink);'
    + 'min-height:44px}'
    + '.hw-customboxes{font:500 12px/1 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#7A8F8A}'
    + '.hw-customdel{width:44px;height:44px;flex:0 0 auto;background:none;border:0;cursor:pointer;'
    + 'color:#7A8F8A;font-size:15px;border-radius:8px}'
    + '.hw-customdel:hover{background:#F1F5F4;color:#B4491F}'

    /* ---------- print chooser ---------- */
    + '.hw-radio{display:flex;flex-wrap:wrap;gap:7px}'
    + '.hw-radiobtn{font:600 13px/1 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#3F6B62;'
    + 'background:#FFFFFF;border:1px solid #DCE6E2;border-radius:10px;padding:12px 14px;'
    + 'min-height:44px;cursor:pointer}'
    + '.hw-radio-on{background:var(--hw-teal);border-color:var(--hw-teal);color:#FFFFFF}'

    /* ---------- the gate: drawn from the tool's own vocabulary ---------- */
    + '.hw-gate{background:#FFFFFF;border:1px solid #DCE6E2;border-radius:14px;'
    + 'border-top:4px solid var(--hw-teal);padding:18px 16px 12px;text-align:center;'
    + 'box-shadow:0 12px 30px -22px rgba(20,45,40,.45)}'
    + '.hw-gate-art{display:flex;gap:9px;justify-content:center;margin-bottom:14px}'
    + '.hw-gate-art i{width:46px;height:46px;border-radius:8px;border:2px solid #DCE6E2;'
    + 'background:#F7FAF9;position:relative;display:block}'
    + '.hw-gate-seal .hw-heart{position:absolute;top:-8px;right:-7px;width:22px;height:22px;animation:none}'
    + '.hw-gate-line{font:600 15px/1.45 var(--lcs-font-body,Nunito),system-ui,sans-serif;'
    + 'color:var(--hw-ink);margin:0 0 14px}'
    + '.hw-gate-cta{display:inline-block;font:700 15px/1 var(--lcs-font-body,Nunito),system-ui,sans-serif;'
    + 'color:#FFFFFF;background:#F2784B;border-radius:10px;padding:14px 24px;text-decoration:none;'
    + 'min-height:44px;box-sizing:border-box;'
    + 'box-shadow:0 2px 0 #D2603A,0 8px 16px -8px rgba(210,96,58,.6)}'
    + '.hw-gate-close{display:block;margin:12px auto 0;'
    + 'font:600 13px/1 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#7A8F8A;'
    + 'background:none;border:0;cursor:pointer;min-height:44px}'

    /* ---------- siblings ---------- */
    + '.hw-siblings{margin-top:14px;padding-top:12px;border-top:1px solid #EEF2F0;text-align:center;'
    + 'font:500 12px/1.6 var(--lcs-font-body,Nunito),system-ui,sans-serif;color:#7A8F8A}'
    + '.hw-sib-link{color:#3F6B62;text-decoration:underline}'
    + '.hw-printsheet{display:none}'
    + 'body.hw-wide{overflow-y:auto}'
    + '@keyframes hw-fadein{from{opacity:0}to{opacity:1}}'

    /* ---------- narrow ---------- */
    + '@media (max-width:420px){'
    + '.hw-wrap{padding:4px 6px 12px}'
    + '.hw-cardbed{--hw-pad:10px;--hw-g:6px}'
    + '.hw-desk{padding:12px}'
    + '}'

    /* ---------- reduced motion: meaning degrades to its END STATE ----------
       Rows that CARRY meaning (the seal arriving, the seat line drawn) keep
       their end state; only the pure-delight rows (the glow ring, the row
       bounce, the shimmer) are removed outright. */
    + '@media (prefers-reduced-motion:reduce){'
    + '.hw-card{transition:none}'
    + '.hw-card.hw-flipped{transform:none}'
    + '.hw-card.hw-flipped .hw-face-map{opacity:0;pointer-events:none}'
    + '.hw-face-sentence{transform:none;opacity:0;pointer-events:none;transition:opacity .2s}'
    + '.hw-card.hw-flipped .hw-face-sentence{opacity:1;pointer-events:auto}'
    + '.hw-heart{animation:hw-fadein .16s linear forwards}'
    + '.hw-box.hw-hearted::before{animation:none}'
    + '.hw-box.hw-mapped::after{animation:none;transform:scaleX(1)}'
    + '.hw-row-done,.hw-shimmer,.hw-pic{animation:none}'
    + '}'

    /* ---------- PRINT ----------
       All black line art, and NO print-color-adjust. The right answer to
       "many school printers are monochrome" is to DESIGN for monochrome —
       a forced coral heart reduces to an indistinct grey blob on exactly
       the machines most classrooms own. */
    + '@media print{'
    + '@page{size:A4 portrait;margin:12mm}'
    + '.hw-toprow,.hw-cardbed,.hw-nav,.hw-shelf,.hw-tools,.hw-siblings,.hw-desk,.hw-legend{display:none !important}'
    /* the SHELL chrome has to come off the paper too — a printed flashcard
       carrying the app header and the mute/fullscreen buttons is not a
       flashcard. Scoped strictly to @media print; the tool restyles no
       shell selector on screen. */
    + '.lcs-header,.lcs-controls,.lcs-bar,.lcs-drawer,.lcs-drawer-scrim{display:none !important}'
    + '.lcs-app,.lcs-stage{background:none !important;box-shadow:none !important;max-width:none !important}'
    + 'html,body{background:#fff !important}'
    + '.hw-printsheet{display:block !important;background:#fff !important}'
    + '.hw-printsheet,.hw-printsheet *{color:#000 !important}'
    + '.hw-printnote{font:400 9pt/1.4 var(--lcs-font-body,Nunito),sans-serif;margin:0 0 6mm}'
    + '.hw-printpage{display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:84mm;gap:0;break-after:page}'
    + '.hw-printpage:last-child{break-after:auto}'
    + '.hw-printcard{border:0.4mm dashed #555;padding:5mm 4mm;display:flex;flex-direction:column;'
    + 'break-inside:avoid;text-align:center;position:relative;justify-content:center;gap:3mm}'
    + '.hw-printcard::after{content:"";position:absolute;left:4mm;right:4mm;top:50%;'
    + 'border-top:0.3mm dotted #999}'
    + '.hw-printfront{height:50%;display:flex;flex-direction:column;align-items:center;'
    + 'justify-content:center;gap:3mm}'
    + '.hw-printback{height:50%;display:flex;align-items:center;justify-content:center;'
    + 'transform:rotate(180deg)}'
    + '.hw-printword{display:flex;align-items:center;justify-content:center;gap:1.6mm}'
    + '.hw-printbox{position:relative;display:inline-flex;align-items:center;justify-content:center;'
    + 'min-width:13mm;height:13mm;padding:0 1.5mm;border:0.5mm solid #000;border-radius:1.5mm;'
    + 'font-family:var(--lcs-font-display,"Baloo 2"),sans-serif;font-weight:700;font-size:15pt;line-height:1}'
    + '.hw-printbox.hw-pmulti > span{border-bottom:0.4mm solid #000;padding-bottom:0.4mm}'
    + '.hw-printheart{position:absolute;top:-2.4mm;right:-2.2mm;width:7mm;height:7mm;animation:none}'
    + '.hw-printheart path:first-child{stroke:#fff;stroke-width:6.4}'
    + '.hw-printheart path:last-child{stroke:#000;stroke-width:2.4}'
    + '.hw-printtail{min-width:9mm;height:13mm;display:inline-flex;align-items:center;'
    + 'justify-content:center;border:0.4mm dashed #555;border-radius:1.5mm;'
    + 'font-family:var(--lcs-font-display,"Baloo 2"),sans-serif;font-weight:700;font-size:15pt}'
    + '.hw-printsent{font:400 10.5pt/1.4 var(--lcs-font-body,Nunito),sans-serif;max-width:62mm}'
    + '.hw-printgrown{font:400 8pt/1.35 var(--lcs-font-body,Nunito),sans-serif;'
    + 'border-top:0.2mm solid #999;padding-top:1.5mm;margin-top:1.5mm}'
    + '.hw-printsheet[data-sheet="strip"] .hw-printpage{grid-template-columns:1fr;grid-auto-rows:48mm}'
    + '.hw-printsheet[data-sheet="strip"] .hw-printcard::after{display:none}'
    + '.hw-printsheet[data-sheet="strip"] .hw-printbox{min-width:20mm;height:20mm;font-size:24pt}'
    + '.hw-printsheet[data-sheet="home"] .hw-printpage{grid-template-columns:1fr;grid-auto-rows:62mm}'
    + '}';
  document.head.appendChild(st);
}

/* The shared print-sheet and liveness gates discover a tool by looking for
   a window-reachable object carrying id + STORE_KEY + a writable premium. */
if (typeof window !== 'undefined') window.HeartWords = HeartWords;
if (typeof module !== 'undefined' && module.exports) module.exports = HeartWords;
