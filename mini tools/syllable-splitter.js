/* =====================================================================
   TOOL #22 — SYLLABLE SPLITTER   (syllable-splitter.js)
   ---------------------------------------------------------------------
   Free-play manipulative (no `tasks` — the shell renders zero activity
   chrome). Reading Corner. Ships in ALL ELEVEN locales.

   PEDAGOGY: a picture card appears with NO WORD ON IT. The class says the
   word and claps its parts; a child taps the drum once per clap and a
   plain beat marker drops for each tap. Only when the class has committed
   to a number does the teacher reveal the word — and the taps become
   syllable ARCS under it, the German Silbenboegen convention. The word
   then snaps into syllable cards to scramble and rebuild, and a sorting
   mode drops picture cards into clap-count pens.

   ⭐ WHY THE WORD STARTS HIDDEN (the ruling this rebuild turns on).
   Syllable awareness is an ORAL skill and in all eleven curricula it
   precedes decoding. A printed word is a scaffold that will not exist
   when a child must segment a spoken word — and in a class of 25 the two
   strong readers read it aloud within a second and the other 23 never
   clap at all. Revealing costs the Grade-2 teacher one tap; having no
   hide costs the Kindergarten teacher the skill. That asymmetry decides
   it. Build mode keeps its word, because ITS task is orthographic.

   THE TWO CONVENTIONS (the subtlest thing in this tool):
     ARCS follow `oralChunks` — arcs are what the class CLAPS.
     CARDS follow `chunks`    — cards are how the word is WRITTEN.
   They are identical in 10 of 11 locales. French diverges: `pomme` takes
   ONE arc and TWO cards, because French CP teaches syllabes orales and
   syllabes ecrites as different things. When a deck declares an
   oralConvention other than same-as-written, the tool says so on screen
   — on BOTH the clap face and the build face, because build is the one
   place where both conventions are visible at once and therefore the one
   place a difference most looks like a bug.

   WHAT IS VERIFIED: the syllable COUNT comes from the platform's
   multi-source syllable gate and is never re-authored here (the build
   gate asserts it byte-equal). The displayed BOUNDARY is native-ratified
   — English pipeline boundaries are typographic by design, so the en
   deck authors them. Copy must claim the count, never the boundary.

   ⭐ AND THEREFORE THE TOOL NEVER SPEAKS A SYLLABLE. An earlier build
   called speak() on each chunk, which made English say "ie" (cookie),
   "el" (camel), "guin" (penguin) out loud. Speaking a boundary is the
   strongest possible claim about it, and it contradicted the line above
   in this very header. Whole words only.

   ⭐ THE TEACHER'S OWN WORDS, AND WHY NOTHING IS PROPOSED. A teacher can
   type her class's names and this week's topic words. Every seam opens
   CLOSED and she taps the breaks she hears. The machine offers no guess
   — not even for words it happens to know. In the sibling Heart Words a
   wrong split is visible and correctable at a glance, so the machine may
   propose one; HERE THE SPLIT IS THE TAUGHT CONTENT, which puts it on
   the far side of that line. Two facts finish it: the English rule
   syllabifier ships no boundaries at all, so there is nothing to
   propose; and the gated picture bank has real holes (209 of 923 keys
   carry no English count), so every child's name is outside it. A tool
   that answers confidently for `carrot` and blankly for `Amara` teaches
   trust and then fails on the words she came for.

   NO GRADING: the drum accepts any number of taps. The tool never tells
   a child the clap count was wrong — the teacher and the class decide.
   No scores, no timers, no streaks, no verdicts.

   ⚠ HEIGHT: this tool does NOT bind `#lcs-root{height:100%}`, so
   `.lcs-app{height:100%}` resolves against an auto-height parent and is
   therefore content-driven. MEASURED at the production embed geometry:
   the shell posts 420 -> 737 -> 766 and nothing is clipped. Do NOT add a
   `body.ss-wide` scroll escape here; it would switch on body scrolling
   to solve a problem this tool does not have. (The dead half-written
   rule that used to sit at the bottom of this file has been removed.)
   ===================================================================== */
var SyllableSplitter = {
  id: 'syllable-splitter',

  strings: {
    title:        {en:'Syllable Splitter',de:'Silbenklatschen',fr:'Frappe les syllabes',it:'Batti le sillabe',es:'Palmas y sílabas',pt:'Bata palmas nas sílabas',nl:'Klap de klankgroepen',sv:'Klappa stavelser',da:'Klap stavelserne',no:'Klapp stavelsene',fi:'Taputa tavut'},
    /* ⚠ RE-AUTHORED. The shipped English read "tap the drum once for every
       clap you hear" — you do not HEAR a clap, you hear a beat and MAKE a
       clap, so the sentence inverted the very perception it teaches, and
       ten locales inherited the inversion. It also opened with "Say the
       word", which is now what the picture is for. */
    /* ⚠ RE-AUTHORED TWICE. The shipped English said "tap the drum once
       for every clap you hear" — you do not HEAR a clap, you hear a beat
       and MAKE a clap, so it inverted the perception it teaches. The first
       repair fixed that and introduced a second fault the German panel
       caught: it referred to "each clap" while no clause ever told the
       class to clap at all. In a tool literally called Silbenklatschen,
       the German contained no `klatschen`. */
    instruction:  {en:'Look at the picture, say the word together and clap it — then tap the drum once for each clap.',de:'Bild ansehen, das Wort gemeinsam sprechen und klatschen – für jedes Klatschen einmal auf die Trommel tippen.',fr:'Regardez l’image, dites le mot ensemble en frappant dans les mains, puis tapez une fois sur le tambour pour chaque frappe.',it:'Guardate l’immagine, dite insieme la parola battendo le mani, poi battete il tamburo una volta per ogni battito.',es:'Miren el dibujo, digan la palabra juntos dando palmadas y toquen el tambor una vez por cada palmada.',pt:'Olhem a figura, digam a palavra juntos batendo palmas e batam no tambor uma vez a cada palma.',nl:'Kijk naar het plaatje, zeg het woord samen en klap het — tik dan één keer op de trommel voor elke klap.',sv:'Titta på bilden, säg ordet tillsammans och klappa det – tryck sedan på trumman en gång för varje klapp.',da:'Se på billedet, sig ordet sammen, og klap det – tryk så på trommen én gang for hvert klap.',no:'Se på bildet, si ordet sammen og klapp det – trykk så på trommen én gang for hvert klapp.',fi:'Katsokaa kuvaa, sanokaa sana yhdessä ja taputtakaa se – napauttakaa sitten rumpua kerran jokaisen taputuksen kohdalla.'},

    /* modes */
    modeClap:     {en:'Clap it',de:'Klatschen',fr:'Frapper',it:'Batti',es:'Dar palmas',pt:'Bater palmas',nl:'Klappen',sv:'Klappa',da:'Klappe',no:'Klappe',fi:'Taputa'},
    modeBuild:    {en:'Build it',de:'Zusammensetzen',fr:'Reconstruire',it:'Ricomponi',es:'Armar',pt:'Montar',nl:'Bouwen',sv:'Bygga',da:'Bygge',no:'Bygge',fi:'Kokoa'},
    modeSort:     {en:'Sort them',de:'Sortieren',fr:'Trier',it:'Smista',es:'Clasificar',pt:'Separar',nl:'Sorteren',sv:'Sortera',da:'Sortere',no:'Sortere',fi:'Lajittele'},

    /* clap face */
    tapDrum:      {en:'Tap the drum',de:'Auf die Trommel tippen',fr:'Taper sur le tambour',it:'Batti il tamburo',es:'Toca el tambor',pt:'Bata no tambor',nl:'Tik op de trommel',sv:'Tryck på trumman',da:'Tryk på trommen',no:'Trykk på trommen',fi:'Napauta rumpua'},
    /* ⚠ RE-AUTHORED from "Start again". It clears the ARCS only, while the
       shell's own Reset four inches away in the same chrome restarts the
       whole tool — two controls, one apparent meaning, different scopes.
       Now glyph-only, so this string is its accessible name. */
    clearArcs:    {en:'Clear the claps',de:'Silben löschen',fr:'Effacer les frappes',it:'Cancella i battiti',es:'Borrar las palmadas',pt:'Apagar as palmas',nl:'Klappen wissen',sv:'Rensa klappen',da:'Ryd klappene',no:'Tøm klappene',fi:'Tyhjennä taputukset'},
    showWord:     {en:'Show the word',de:'Wort zeigen',fr:'Montrer le mot',it:'Mostra la parola',es:'Mostrar la palabra',pt:'Mostrar a palavra',nl:'Laat het woord zien',sv:'Visa ordet',da:'Vis ordet',no:'Vis ordet',fi:'Näytä sana'},
    hideWord:     {en:'Hide the word',de:'Wort verbergen',fr:'Cacher le mot',it:'Nascondi la parola',es:'Ocultar la palabra',pt:'Esconder a palavra',nl:'Verberg het woord',sv:'Dölj ordet',da:'Skjul ordet',no:'Skjul ordet',fi:'Piilota sana'},
    hearWord:     {en:'Hear the word',de:'Wort anhören',fr:'Écouter le mot',it:'Ascolta la parola',es:'Escuchar la palabra',pt:'Ouvir a palavra',nl:'Luister naar het woord',sv:'Lyssna på ordet',da:'Hør ordet',no:'Hør ordet',fi:'Kuuntele sana'},
    /* ⚠ NARROWED. Announced on the FINAL tap only — on any earlier tap it
       would tell a screen-reader user the total before the class has
       finished counting, in a tool whose whole rule is that it never
       announces the count. */
    arcOf:        {en:'Clap {i} of {n}',de:'Silbe {i} von {n}',fr:'Frappe {i} sur {n}',it:'Sillaba {i} di {n}',es:'Palmada {i} de {n}',pt:'Sílaba {i} de {n}',nl:'Klankgroep {i} van {n}',sv:'Klapp {i} av {n}',da:'Klap {i} af {n}',no:'Klapp {i} av {n}',fi:'Tavu {i}/{n}'},
    /* ⚠ LABEL:VALUE, DELIBERATELY. The natural phrasing "{i} claps so
       far" renders "1 claps so far" on the FIRST tap of every
       multi-syllable word — the most frequent announcement the tool makes.
       BOTH native panels found it independently: Finnish "1 taputusta" is
       ungrammatical (a numeral takes partitive singular above one) and
       French gives "1 frappes". `penOne` exists three keys away precisely
       to dodge this, and it was missed here. Label:value needs no
       agreement in any of the eleven. */
    beatCount:    {en:'Claps so far: {i}',de:'Bisher geklatscht: {i}',fr:'Frappes jusqu’ici : {i}',it:'Battiti finora: {i}',es:'Palmadas hasta ahora: {i}',pt:'Palmas até agora: {i}',nl:'Klappen tot nu toe: {i}',sv:'Klapp hittills: {i}',da:'Klap indtil nu: {i}',no:'Klapp så langt: {i}',fi:'Taputuksia tähän mennessä: {i}'},
    oralNote:     {en:'We clap what we hear — the writing can split differently.',de:'Wir klatschen, was wir hören – geschrieben kann es anders getrennt sein.',fr:'On frappe ce qu’on entend : à l’écrit, le e final ajoute souvent une syllabe de plus.',it:'Battiamo quello che sentiamo: nello scritto la divisione può essere diversa.',es:'Damos palmas a lo que oímos: la separación escrita puede ser distinta.',pt:'Batemos palmas no que ouvimos — na escrita a separação pode ser diferente.',nl:'We klappen wat we horen — op papier kan de verdeling anders zijn.',sv:'Vi klappar det vi hör – i skrift kan delningen se annorlunda ut.',da:'Vi klapper det, vi hører – på skrift kan delingen være en anden.',no:'Vi klapper det vi hører – i skrift kan delingen bli en annen.',fi:'Taputamme sen, minkä kuulemme – kirjoitettuna jako voi olla toinen.'},

    /* build face */
    buildHint:    {en:'Put the parts back in order.',de:'Setzt die Silben wieder in die passende Reihenfolge.',fr:'Remets les syllabes dans l’ordre.',it:'Rimetti le sillabe in ordine.',es:'Ordena las sílabas para armar la palabra.',pt:'Coloquem as sílabas de volta na ordem.',nl:'Zet de stukjes weer op volgorde.',sv:'Lägg delarna i ordning igen.',da:'Sæt delene i rækkefølge igen.',no:'Sett delene sammen igjen i rekkefølge.',fi:'Järjestä tavut takaisin sanaksi.'},
    scramble:     {en:'Mix them up',de:'Mischen',fr:'Mélanger',it:'Mescola',es:'Mezclar',pt:'Misturar',nl:'Husselen',sv:'Blanda',da:'Bland dem',no:'Bland dem',fi:'Sekoita'},

    /* sort face */
    /* ⚠ ENGLISH SAYS "field", NOT "pen". In a tool full of letters and
       writing, `pen` lands on the writing instrument first — and `hoop`
       and `ring` are owned by the sibling Sorting Hoops. The other ten
       locales escaped this by accident, because Gehege / enclos / recinto /
       corral / hage / fold / aitaus are unambiguous. Both panels found it
       independently. */
    sortHint:     {en:'Tap a picture, then tap the field it belongs in.',de:'Tippt ein Bild an und dann den Korb, in den es gehört.',fr:'Touchez une image, puis l’enclos où elle va.',it:'Toccate un’immagine, poi il recinto in cui va.',es:'Toquen una imagen y luego el corral al que pertenece.',pt:'Toquem numa figura e depois no curral a que ela pertence.',nl:'Tik op een plaatje en dan op de wei waar het hoort.',sv:'Tryck på en bild och sedan på hagen där den hör hemma.',da:'Tryk på et billede, og tryk så på den fold, det hører til.',no:'Trykk på et bilde, og trykk så på innhegningen det hører hjemme i.',fi:'Napauta kuvaa ja sitten aitausta, johon se kuuluu.'},
    penLabel:     {en:'{n} claps',de:'{n} Silben',fr:'{n} frappes',it:'{n} sillabe',es:'{n} palmadas',pt:'{n} sílabas',nl:'{n} klankgroepen',sv:'{n} klapp',da:'{n} klap',no:'{n} klapp',fi:'{n} tavua'},
    penOne:       {en:'1 clap',de:'1 Silbe',fr:'1 frappe',it:'1 sillaba',es:'1 palmada',pt:'1 sílaba',nl:'1 klankgroep',sv:'1 klapp',da:'1 klap',no:'1 klapp',fi:'1 tavu'},
    /* ⚠ the handler is `penOf = {}` — it empties EVERY pen. "Back to the
       pile" described returning ONE card, and tapping the pile already does
       exactly that, so the tool had two gestures under one name and the
       button was the destructive one. */
    backToPile:   {en:'Send them all back',de:'Alle zurücklegen',fr:'Tout renvoyer',it:'Rimanda tutte indietro',es:'Devolver todas',pt:'Devolver todas',nl:'Alles terugleggen',sv:'Skicka tillbaka alla',da:'Send dem alle tilbage',no:'Send alle tilbake',fi:'Palauta kaikki'},

    /* shelves + premium */
    shelfPick:    {en:'Word sets',de:'Wortsammlungen',fr:'Séries de mots',it:'Gruppi di parole',es:'Grupos de palabras',pt:'Grupos de palavras',nl:'Woordsets',sv:'Ordgrupper',da:'Ordsæt',no:'Ordsett',fi:'Sanaryhmät'},
    shelfClose:   {en:'Close',de:'Schließen',fr:'Fermer',it:'Chiudi',es:'Cerrar',pt:'Fechar',nl:'Sluiten',sv:'Stäng',da:'Luk',no:'Lukk',fi:'Sulje'},
    lockedShelf:  {en:'Premium set',de:'Premium-Sammlung',fr:'Série Premium',it:'Gruppo Premium',es:'Grupo Premium',pt:'Grupo Premium',nl:'Premium-set',sv:'Premiumgrupp',da:'Premiumsæt',no:'Premiumsett',fi:'Premium-ryhmä'},
    /* ⚠ RE-AUTHORED to name the three paid things honestly, now that
       typing your own words is free. */
    /* ⚠⚠ THIS STRING USED TO SELL SOMETHING THAT WAS ALREADY FREE.
       It said Premium "keeps your own words between lessons" — but
       `_saveStore()` writes `store.custom` to localStorage with NO premium
       check, `customShelf()` is hard-coded `free:true`, and
       `wordsForShelf()` returns the custom words BEFORE the entitlement
       gate. A free teacher's words already survive the lesson, the day and
       the term. Found by the German panel reading the model rather than
       the copy. Two repairs were possible — gate the persistence, or stop
       claiming it — and gating it would have been theatre anyway, since
       `copyList` exports the same list in one click. The honest sentence
       is also the better acquisition story. */
    gatePremium:  {en:'Premium adds the other word sets and the sorting baskets. Your own words stay free.',de:'Premium bringt die weiteren Wortsammlungen und die Silbenkörbe. Ihre eigenen Wörter bleiben kostenlos.',fr:'Premium ajoute les autres séries de mots et les paniers de tri. Vos propres mots restent gratuits.',it:'Premium aggiunge gli altri gruppi di parole e i cesti per smistare. Le vostre parole restano gratuite.',es:'Premium añade los demás grupos de palabras y las cestas para clasificar. Tus propias palabras siguen siendo gratis.',pt:'O Premium acrescenta os outros grupos de palavras e os cestos de separação. As suas próprias palavras continuam gratuitas.',nl:'Premium voegt de andere woordsets en de sorteermanden toe. Je eigen woorden blijven gratis.',sv:'Premium lägger till de andra ordgrupperna och sorteringskorgarna. Dina egna ord är fortsatt gratis.',da:'Premium giver de øvrige ordsæt og sorteringskurvene. Dine egne ord er fortsat gratis.',no:'Premium gir de andre ordsettene og sorteringskurvene. Dine egne ord er fortsatt gratis.',fi:'Premium tuo muut sanaryhmät ja lajittelukorit. Omat sanasi pysyvät ilmaisina.'},
    unlock:       {en:'See Premium',de:'Premium ansehen',fr:'Découvrir Premium',it:'Scopri Premium',es:'Ver Premium',pt:'Ver o Premium',nl:'Bekijk Premium',sv:'Se Premium',da:'Se Premium',no:'Se Premium',fi:'Katso Premium'},

    /* ---- the desk (an ADULT surface; the design law bans sentences on
       the apparatus, and none of these render on the board) ---- */
    deskMine:     {en:'My words',de:'Meine Wörter',fr:'Mes mots',it:'Le mie parole',es:'Mis palabras',pt:'Minhas palavras',nl:'Mijn woorden',sv:'Mina ord',da:'Mine ord',no:'Mine ord',fi:'Omat sanat'},
    deskPrint:    {en:'Print',de:'Drucken',fr:'Imprimer',it:'Stampa',es:'Imprimir',pt:'Imprimir',nl:'Afdrukken',sv:'Skriv ut',da:'Udskriv',no:'Skriv ut',fi:'Tulosta'},
    pasteHint:    {en:'One word per line',de:'Ein Wort pro Zeile',fr:'Un mot par ligne',it:'Una parola per riga',es:'Una palabra por línea',pt:'Uma palavra por linha',nl:'Eén woord per regel',sv:'Ett ord per rad',da:'Ét ord pr. linje',no:'Ett ord per linje',fi:'Yksi sana riviä kohden'},
    addWords:     {en:'Add the words',de:'Diese Wörter übernehmen',fr:'Ajouter les mots',it:'Aggiungi le parole',es:'Agregar las palabras',pt:'Adicionar as palavras',nl:'De woorden toevoegen',sv:'Lägg till orden',da:'Tilføj ordene',no:'Legg til ordene',fi:'Lisää sanat'},
    /* the control TOGGLES; the shipped sentence described only one
       direction, so a teacher who mis-tapped had no stated way back.
       ⚠ AND THE DESK IS AN ADULT SURFACE — it takes the formal address in
       every locale that has one. The shipped German and French used the
       children's form here, on a panel the class never sees. */
    seamHint:     {en:'Tap between the letters where you hear a new clap. Tap again to undo it.',de:'Tippen Sie zwischen die Buchstaben, wo Sie eine neue Silbe hören. Noch einmal tippen löst die Trennung.',fr:'Touchez entre les lettres, là où vous entendez une nouvelle frappe. Touchez à nouveau pour annuler.',it:'Toccate tra le lettere dove sentite un nuovo battito. Toccate di nuovo per annullare.',es:'Toquen entre las letras donde oigan una palmada nueva. Toquen otra vez para deshacerlo.',pt:'Toquem entre as letras onde ouvirem uma palma nova. Toquem outra vez para desfazer.',nl:'Tik tussen de letters waar u een nieuwe klap hoort. Tik nogmaals om het ongedaan te maken.',sv:'Tryck mellan bokstäverna där ni hör ett nytt klapp. Tryck igen för att ångra.',da:'Tryk mellem bogstaverne, hvor I hører et nyt klap. Tryk igen for at fortryde.',no:'Trykk mellom bokstavene der dere hører et nytt klapp. Trykk igjen for å angre.',fi:'Napauta kirjainten väliä siitä kohdasta, jossa uusi taputus alkaa. Napauta uudelleen, niin jako poistuu.'},
    /* the per-seam accessible name. `seamHint` is the panel's instruction
       PARAGRAPH, and naming every seam with it made up to 23 controls in
       one word announce the same full sentence — a screen-reader user
       could not tell seam 1 from seam 4. */
    seamLabel: {en:'Syllable break',de:'Silbengrenze',fr:'Coupure de syllabe',it:'Divisione di sillaba',es:'Corte de sílaba',pt:'Divisão de sílaba',nl:'Klankgroepgrens',sv:'Stavelsegräns',da:'Stavelsesgrænse',no:'Stavelsesgrense',fi:'Tavuraja'},
    /* ⭐ THE REQUIRED SENTENCE. Permanent, never a toast, never behind a
       help icon. The tool may not imply it has checked a teacher's split. */
    ownWordsNote: {en:'These are your words, split the way you split them — we don’t check them.',de:'Das sind Ihre Wörter, so getrennt, wie Sie sie trennen – wir prüfen das nicht nach.',fr:'Ce sont vos mots, découpés comme vous les découpez : nous ne les vérifions pas.',it:'Queste sono le vostre parole, divise come le dividete voi: noi non le controlliamo.',es:'Estas son sus palabras, separadas como usted las separa: nosotros no las comprobamos.',pt:'Estas são as suas palavras, divididas como você as divide — nós não as verificamos.',nl:'Dit zijn uw woorden, verdeeld zoals u ze verdeelt — wij controleren ze niet.',sv:'Det här är dina ord, delade som du delar dem – vi kontrollerar dem inte.',da:'Det er dine ord, delt som du deler dem – vi tjekker dem ikke.',no:'Dette er dine ord, delt slik du deler dem – vi kontrollerer dem ikke.',fi:'Nämä ovat sinun sanasi ja sinun tavujakosi – emme tarkista niitä.'},
    deleteWord:   {en:'Delete',de:'Löschen',fr:'Supprimer',it:'Elimina',es:'Eliminar',pt:'Excluir',nl:'Verwijderen',sv:'Ta bort',da:'Slet',no:'Slett',fi:'Poista'},
    /* ⚠ BROWSER, not merely device. localStorage is per-browser: the same
       teacher on the same laptop in a different browser sees nothing. The
       sibling Heart Words already said this correctly. */
    deviceOnly:   {en:'Your words stay in this browser, on this device.',de:'Gespeichert wird nur in diesem Browser, auf diesem Gerät.',fr:'Vos mots restent dans ce navigateur, sur cet appareil.',it:'Le vostre parole restano in questo browser, su questo dispositivo.',es:'Tus palabras se quedan en este navegador, en este dispositivo.',pt:'As suas palavras ficam neste navegador, neste aparelho.',nl:'Je woorden blijven in deze browser, op dit apparaat.',sv:'Dina ord stannar i den här webbläsaren, på den här enheten.',da:'Dine ord bliver i denne browser, på denne enhed.',no:'Ordene dine blir i denne nettleseren, på denne enheten.',fi:'Sanasi säilyvät vain tässä selaimessa tällä laitteella.'},
    copyList:     {en:'Copy a link to my list',de:'Link zur Liste kopieren',fr:'Copier un lien vers ma liste',it:'Copia un link al mio elenco',es:'Copiar un enlace a mi lista',pt:'Copiar um link para a minha lista',nl:'Kopieer een link naar mijn lijst',sv:'Kopiera en länk till min lista',da:'Kopiér et link til min liste',no:'Kopier en lenke til lista mi',fi:'Kopioi linkki listaani'},
    copied:       {en:'Link copied',de:'Kopiert',fr:'Lien copié',it:'Link copiato',es:'Enlace copiado',pt:'Link copiado',nl:'Link gekopieerd',sv:'Länken kopierad',da:'Linket kopieret',no:'Lenken kopiert',fi:'Linkki kopioitu'},
    listFull:     {en:'The list is full. Delete a word to add another.',de:'Die Liste ist voll – bitte zuerst ein Wort löschen.',fr:'La liste est pleine. Retirez un mot pour en ajouter un autre.',it:'L’elenco è pieno. Elimina una parola per aggiungerne un’altra.',es:'La lista está llena. Elimina una palabra para añadir otra.',pt:'A lista está cheia. Exclua uma palavra para adicionar outra.',nl:'De lijst is vol. Verwijder een woord om er een toe te voegen.',sv:'Listan är full. Ta bort ett ord för att lägga till ett nytt.',da:'Listen er fuld. Slet et ord for at tilføje et nyt.',no:'Lista er full. Slett et ord for å legge til et nytt.',fi:'Lista on täynnä. Poista jokin sana, niin voit lisätä uuden.'},
    /* ⚠ THESE TWO USED TO BE A BARE `continue`: the word vanished out of
       the box and the teacher was told nothing, which is indistinguishable
       from the tool being broken. German is where it bites — a
       Sachunterricht topic word is routinely over the letter cap. */
    tooLong: {en:'That word is too long for the letter row.',de:'Dieses Wort ist zu lang für die Buchstabenreihe.',fr:'Ce mot est trop long pour la rangée de lettres.',it:'Questa parola è troppo lunga per la riga di lettere.',es:'Esa palabra es demasiado larga para la fila de letras.',pt:'Essa palavra é comprida demais para a linha de letras.',nl:'Dat woord is te lang voor de letterrij.',sv:'Det ordet är för långt för bokstavsraden.',da:'Det ord er for langt til bogstavrækken.',no:'Det ordet er for langt for bokstavraden.',fi:'Tuo sana on liian pitkä kirjainriville.'},
    duplicateSkip: {en:'That word is already in the list.',de:'Dieses Wort steht schon in der Liste.',fr:'Ce mot est déjà dans la liste.',it:'Questa parola è già nell’elenco.',es:'Esa palabra ya está en la lista.',pt:'Essa palavra já está na lista.',nl:'Dat woord staat al in de lijst.',sv:'Det ordet finns redan i listan.',da:'Det ord står allerede på listen.',no:'Det ordet står allerede i lista.',fi:'Tuo sana on jo listalla.'},
    copyFailed: {en:'The link could not be copied.',de:'Der Link konnte nicht kopiert werden.',fr:'Le lien n’a pas pu être copié.',it:'Non è stato possibile copiare il link.',es:'No se pudo copiar el enlace.',pt:'Não foi possível copiar o link.',nl:'De link kon niet worden gekopieerd.',sv:'Länken kunde inte kopieras.',da:'Linket kunne ikke kopieres.',no:'Lenken kunne ikke kopieres.',fi:'Linkkiä ei voitu kopioida.'},
    printSheet:   {en:'Print a worksheet',de:'Arbeitsblatt drucken',fr:'Imprimer une fiche',it:'Stampa una scheda',es:'Imprimir una ficha',pt:'Imprimir uma ficha',nl:'Werkblad afdrukken',sv:'Skriv ut ett arbetsblad',da:'Udskriv et arbejdsark',no:'Skriv ut et arbeidsark',fi:'Tulosta tehtäväsivu'},
    printHint:    {en:'One page of pictures and words. The class claps, then draws an arc under each part.',de:'Eine Seite mit den Wörtern der gewählten Sammlung. Die Klasse klatscht und malt dann unter jede Silbe einen Bogen.',fr:'Une page d’images et de mots. La classe frappe, puis trace un arc sous chaque partie.',it:'Una pagina di immagini e parole. La classe batte e poi traccia un archetto sotto ogni parte.',es:'Una página de dibujos y palabras. La clase da palmadas y luego traza un arco bajo cada parte.',pt:'Uma página de figuras e palavras. A turma bate palmas e depois traça um arco sob cada parte.',nl:'Eén pagina met plaatjes en woorden. De klas klapt en tekent daarna een boog onder elk deel.',sv:'En sida med bilder och ord. Klassen klappar och ritar sedan en båge under varje del.',da:'En side med billeder og ord. Klassen klapper og tegner derefter en bue under hver del.',no:'En side med bilder og ord. Klassen klapper og tegner så en bue under hver del.',fi:'Sivullinen kuvia ja sanoja. Luokka taputtaa ja piirtää sitten kaaren jokaisen osan alle.'},

    /* nav + settings */
    prevWord:     {en:'Previous word',de:'Vorheriges Wort',fr:'Mot précédent',it:'Parola precedente',es:'Palabra anterior',pt:'Palavra anterior',nl:'Vorig woord',sv:'Föregående ord',da:'Forrige ord',no:'Forrige ord',fi:'Edellinen sana'},
    nextWord:     {en:'Next word',de:'Nächstes Wort',fr:'Mot suivant',it:'Parola successiva',es:'Palabra siguiente',pt:'Próxima palavra',nl:'Volgend woord',sv:'Nästa ord',da:'Næste ord',no:'Neste ord',fi:'Seuraava sana'},
    /* ⚠ NAMED FOR WHAT IT DOES. `settings.voice` is consulted at exactly
       ONE line in this file — the auto-speak after a word is rebuilt in
       Build mode. It is not a global mute: the speaker button speaks
       regardless. "Say the word aloud" therefore read as a mute that is
       not one, and used the same verb the instruction gives the CLASS. */
    setVoice:     {en:'Say the word after building it',de:'Wort nach dem Zusammensetzen vorsprechen',fr:'Dire le mot une fois reconstruit',it:'Pronuncia la parola dopo averla ricomposta',es:'Decir la palabra al terminar de armarla',pt:'Dizer a palavra depois de montá-la',nl:'Het woord zeggen na het bouwen',sv:'Läs ordet när det är byggt',da:'Sig ordet, når det er bygget',no:'Si ordet når det er bygd',fi:'Sano sana, kun se on koottu'},
    setDrum:      {en:'Drum sound',de:'Trommelklang',fr:'Son du tambour',it:'Suono del tamburo',es:'Sonido del tambor',pt:'Som do tambor',nl:'Trommelgeluid',sv:'Trumljud',da:'Trommelyd',no:'Trommelyd',fi:'Rummun ääni'},

    /* sibling phonics tools — desk only, never on the board */
    trioLabel:    {en:'Phonics tools:',de:'Werkzeuge zum Lesenlernen:',fr:'Outils de phonologie :',it:'Strumenti fonologici:',es:'Herramientas de conciencia fonológica:',pt:'Ferramentas de alfabetização:',nl:'Hulpmiddelen voor klanken:',sv:'Ljudverktyg:',da:'Lydværktøjer:',no:'Lydverktøy:',fi:'Lukemisen työkalut:'},
    siblingSbx:   {en:'Sound Boxes',de:'Lautboxen',fr:'Boîtes à sons',it:'Caselle dei suoni',es:'Cajas de sonidos',pt:'Caixas de sons',nl:'Klankdozen',sv:'Ljudrutor',da:'Lydbokse',no:'Lydbokser',fi:'Äännelaatikot'},
    siblingBbd:   {en:'Blending Board',de:'Lesemaschine',fr:'Tableau de syllabes',it:'Tabellone delle sillabe',es:'Tablero de sílabas',pt:'Quadro de sílabas',nl:'Klankenbord',sv:'Ljudtavla',da:'Lydtavle',no:'Lydtavle',fi:'Tavutaulu'},
    siblingLtl:   {en:'Letter Tiles',de:'Magnetbuchstaben',fr:'Lettres magnétiques',it:'Lettere magnetiche',es:'Letras magnéticas',pt:'Alfabeto móvel',nl:'Letterdoos',sv:'Magnetbokstäver',da:'Magnetbogstaver',no:'Magnetbokstaver',fi:'Magneettikirjaimet'},
    siblingHwd:   {en:'Heart Words',de:'Merkwörter',fr:'Mots à cœur',it:'Parole del cuore',es:'Palabras con corazón',pt:'Palavras de coração',nl:'Hartwoorden',sv:'Hjärteord',da:'Hjerteord',no:'Hjerteord',fi:'Sydänsanat'}
  },

  /* Emergency deck if the per-locale fetch 404s. ⚠ Its label is NOT an
     English string: a French class hitting a 404 used to get English words
     under the English heading "Two-clap words" with no signal at all that
     anything had failed. The label now comes from the tool's own
     translated `shelfPick`, resolved at fetch time. */
  FALLBACK_DECK: {
    locale: 'en', version: 1, oralConvention: 'same-as-written', curation: 'fallback',
    pens: [1, 2, 3],
    shelves: [{ id: 's1', label: '', free: true, fallback: true }],
    words: [
      { id:'baby',   display:'baby',   count:2, chunks:['ba','by'],    oralCount:2, oralChunks:['ba','by'],    noun:'baby',   imageDir:'toys',                imageFile:'baby',   shelf:'s1' },
      { id:'bunny',  display:'bunny',  count:2, chunks:['bun','ny'],   oralCount:2, oralChunks:['bun','ny'],   noun:'bunny',  imageDir:'easter',              imageFile:'bunny',  shelf:'s1' },
      { id:'carrot', display:'carrot', count:2, chunks:['car','rot'],  oralCount:2, oralChunks:['car','rot'],  noun:'carrot', imageDir:'At the Supermarket',  imageFile:'carrot', shelf:'s1' },
      { id:'tiger',  display:'tiger',  count:2, chunks:['ti','ger'],   oralCount:2, oralChunks:['ti','ger'],   noun:'tiger',  imageDir:'animals',             imageFile:'tiger',  shelf:'s1' },
      { id:'monkey', display:'monkey', count:2, chunks:['mon','key'],  oralCount:2, oralChunks:['mon','key'],  noun:'monkey', imageDir:'zoo animals',         imageFile:'monkey', shelf:'s1' },
      { id:'pencil', display:'pencil', count:2, chunks:['pen','cil'],  oralCount:2, oralChunks:['pen','cil'],  noun:'pencil', imageDir:'around the house',    imageFile:'pencil', shelf:'s1' }
    ]
  },

  defaults: { voice: true, drum: true },
  settings: [
    { key: 'voice', type: 'toggle', labelKey: 'setVoice' },
    { key: 'drum', type: 'toggle', labelKey: 'setDrum' }
  ],

  STORE_KEY: 'lcs:syllable-splitter:v1',
  ENT_TRUST_DAYS: 14,
  CUSTOM_SHELF: 'my',
  MAX_CUSTOM: 60,
  MAX_LETTERS: 24,

  /* =================================================================
     PURE ENGINE — no DOM. The build gate calls these directly.
     ================================================================= */

  shelfById: function (id) {
    if (id === this.CUSTOM_SHELF) return this.customShelf();
    var sh = (this.deck && this.deck.shelves) || [];
    for (var i = 0; i < sh.length; i++) if (sh[i].id === id) return sh[i];
    return null;
  },

  customShelf: function () {
    return { id: this.CUSTOM_SHELF, label: this.api ? this.api.t('deskMine') : 'My words', free: true, custom: true };
  },

  _shelfUnlocked: function (shelf) { return !!(shelf && (shelf.free || this.premium)); },

  firstFreeShelf: function () {
    var sh = (this.deck && this.deck.shelves) || [];
    for (var i = 0; i < sh.length; i++) if (sh[i].free) return sh[i].id;
    return sh.length ? sh[0].id : null;
  },

  /* The teacher's own words. Namespaced ids (`my:`) so they can never
     collide with a deck id, and `custom:true` so the pens can mark them.
     Her split serves BOTH conventions — she placed it by ear, so the oral
     and written splits are the same thing here by construction. */
  customWords: function () {
    var list = (this._store && this._store.custom) || [];
    var out = [];
    for (var i = 0; i < list.length; i++) {
      var c = list[i];
      if (!c || !c.display || !c.chunks || !c.chunks.length) continue;
      out.push({
        id: c.id, display: c.display,
        count: c.chunks.length, chunks: c.chunks.slice(),
        oralCount: c.chunks.length, oralChunks: c.chunks.slice(),
        custom: true, noImage: true, shelf: this.CUSTOM_SHELF
      });
    }
    return out;
  },

  /* THE STRUCTURAL GATE — a locked shelf yields nothing at all, so
     premium words never reach the DOM. */
  wordsForShelf: function (shelfId) {
    if (shelfId === this.CUSTOM_SHELF) return this.customWords();
    if (!this._shelfUnlocked(this.shelfById(shelfId))) return [];
    var all = (this.deck && this.deck.words) || [], out = [];
    for (var i = 0; i < all.length; i++) if (all[i].shelf === shelfId) out.push(all[i]);
    return out;
  },

  /* THE TWO-CONVENTION CONTRACT.
     Arcs are what the class CLAPS; cards are how the word is WRITTEN. */
  arcsFor: function (word) { return (word && word.oralChunks) || []; },
  cardsFor: function (word) { return (word && word.chunks) || []; },

  hasOralDivergence: function () {
    return !!(this.deck && this.deck.oralConvention && this.deck.oralConvention !== 'same-as-written');
  },

  wordDiverges: function (w) {
    if (!w) return false;
    var a = this.arcsFor(w), c = this.cardsFor(w);
    if (a.length !== c.length) return true;
    for (var i = 0; i < a.length; i++) if (a[i] !== c[i]) return true;
    return false;
  },

  /* The per-word caveat the deck authors. ⚠ 18 French words carry a
     `note` that gate D14 REQUIRES and that nothing in the shipped tool
     ever read — the gate was enforcing a promise the product did not
     keep. It is rendered now, on both faces that can show a divergence. */
  /* ⚠ THE DECK-LEVEL CHECK IS LOAD-BEARING AND WAS MISSING. `hasOralDivergence()`
     and `deck.oralConvention` were both DEAD — declared, never called — while
     this file's own header promised "when a deck declares an oralConvention
     other than same-as-written, the tool says so on screen." It did not: it
     said so per WORD, and only when that word's two arrays happened to
     differ. Found by the French/Finnish panel.
     Now the deck's declaration is what opens the door, `w.note` carries the
     specific reason where the deck author wrote one, and `oralNote` is the
     locale's general statement — so all three are reachable and the header
     is true. */
  noteFor: function (w) {
    if (!w || !this.hasOralDivergence() || !this.wordDiverges(w)) return null;
    return w.note || this.api.t('oralNote');
  },

  /* ⚠ oralCount, NOT count. The pens are filled by what the class CLAPS.
     The shipped gate asserted `count` against the pens while the runtime
     filled them from `oralCount` — the wrong field, latent only because
     no word currently sits outside its pens. French is exactly where the
     two differ (18 of 55 words). */
  wordsWithCount: function (n, pool) {
    var src = pool || this._visibleWords(), out = [];
    for (var i = 0; i < src.length; i++) if (src[i].oralCount === n) out.push(src[i]);
    return out;
  },

  _visibleWords: function () {
    var sh = (this.deck && this.deck.shelves) || [], out = [];
    for (var i = 0; i < sh.length; i++) {
      if (!this._shelfUnlocked(sh[i])) continue;
      out = out.concat(this.wordsForShelf(sh[i].id));
    }
    return out;
  },

  /* The sort pool. Deliberately UNEQUAL across the pens (5/4/3) so a child
     who has placed eight tiles cannot deduce the last four by arithmetic —
     with equal pens the final third stops being a phonological judgement.
     Shuffled per mount: the shipped build took the first three of each band
     and cached them, so a class met the same nine tiles every lesson for
     ever. Teacher words are NEVER mixed in here (see the desk). */
  buildSortPool: function (pens, pool, rnd) {
    var shares = [5, 4, 3], out = [], i, j;
    var order = pens.slice();
    for (i = 0; i < order.length; i++) {
      var band = this.wordsWithCount(order[i], pool).slice();
      for (j = band.length - 1; j > 0; j--) {
        var k = Math.floor(rnd() * (j + 1)), t = band[j]; band[j] = band[k]; band[k] = t;
      }
      var want = shares[i] === undefined ? 3 : shares[i];
      for (j = 0; j < want && j < band.length; j++) out.push(band[j]);
    }
    for (i = out.length - 1; i > 0; i--) {
      var m = Math.floor(rnd() * (i + 1)), tt = out[i]; out[i] = out[m]; out[m] = tt;
    }
    return out;
  },

  resolveDeepLink: function (params, premium) {
    if (!params) return null;
    var sid = params.set, wid = params.word;
    if (!sid && !wid) return null;
    var all = (this.deck && this.deck.words) || [], i;
    if (!sid && wid) for (i = 0; i < all.length; i++) if (all[i].id === wid) { sid = all[i].shelf; break; }
    var shelf = this.shelfById(sid);
    if (!shelf) return null;
    if (!shelf.free && !premium) return null;
    var idx = 0, list = [];
    for (i = 0; i < all.length; i++) if (all[i].shelf === sid) list.push(all[i]);
    if (wid) for (i = 0; i < list.length; i++) if (list[i].id === wid) { idx = i; break; }
    /* Sorting pens are premium — refuse the mode HERE rather than trusting
       the caller to filter it, so the pure function is the whole gate. */
    var mode = params.mode || null;
    if (mode === 'sort' && !premium) mode = null;
    if (mode && mode !== 'clap' && mode !== 'build' && mode !== 'sort') mode = null;
    return { shelf: sid, index: idx, mode: mode };
  },

  /* ---- the teacher's split, as cuts between letters ---- */
  chunksToCuts: function (chunks) {
    var cuts = {}, at = 0;
    for (var i = 0; i < chunks.length - 1; i++) { at += chunks[i].length; cuts[at] = true; }
    return cuts;
  },
  cutsToChunks: function (letters, cuts) {
    var out = [], cur = '';
    for (var i = 0; i < letters.length; i++) {
      cur += letters[i];
      if (cuts[i + 1] && i < letters.length - 1) { out.push(cur); cur = ''; }
    }
    if (cur) out.push(cur);
    return out;
  },

  /* deterministic scramble seeded off the word, with an identity guard so
     a rebuild never opens already solved (the syllable-builder precedent) */
  scrambleOrder: function (n, seedStr) {
    var seed = 0, i, j, t, a = [];
    for (i = 0; i < n; i++) a.push(i);
    for (i = 0; i < String(seedStr).length; i++) seed = (seed * 31 + String(seedStr).charCodeAt(i)) >>> 0;
    seed = (seed + (this._scrambleSalt || 0)) >>> 0;
    for (i = a.length - 1; i > 0; i--) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      j = seed % (i + 1);
      t = a[i]; a[i] = a[j]; a[j] = t;
    }
    var same = true;
    for (i = 0; i < a.length; i++) if (a[i] !== i) { same = false; break; }
    if (same && a.length > 1) { t = a[0]; a[0] = a[1]; a[1] = t; }
    return a;
  },

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
    injectSyllableSplitterCSS();
    /* see the ss-scroll block in the stylesheet: measured UNREACHABLE
       controls at 320x568 and 360x640 standalone, where nothing grows */
    try { document.body.classList.add('ss-scroll'); } catch (_) {}

    this.deck = null;
    this.shelfId = null;
    this.index = 0;
    this.mode = 'clap';
    this.surface = 'board';
    this.deskTab = 'sets';
    this.taps = 0;
    this.revealed = false;
    this.built = [];
    this.order = [];
    this.penOf = {};
    this.premiumKnown = false;
    this._deepPending = this._readParams();
    this._timers = [];
    this._store = this._loadStore();
    this._scrambleSalt = 0;
    this._notice = null;
    this._picked = null;

    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';

    this._fetchDeck();
    this._fetchEntitlement();

    /* ⚠ BIND ONCE. The shipped build added this to `document` on every
       init and never removed it, so a second mount double-fired the drum.
       ⚠ AND SCOPE IT. It excluded only INPUT/TEXTAREA, so Space while a
       <button> had focus fired the drum AND swallowed the button's own
       activation — Space could not press anything anywhere in the tool.
       Arrow keys also flipped the word behind an open panel. */
    if (!this._keysBound) {
      this._keysBound = true;
      this._onKey = function (e) {
        if (!self._wrap) return;
        var t = e.target || {};
        var tag = t.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || t.isContentEditable) return;
        if (e.key === 'Escape') { if (self.surface !== 'board') { self.closeDesk(); e.preventDefault(); } return; }
        if (self.surface !== 'board') return;
        if (tag === 'BUTTON' || tag === 'A') { if (e.key === ' ' || e.key === 'Enter') return; }
        /* ⚠ NOT IN SORT MODE. render() omits the word arrows there, but
           this handler did not — so an arrow key ran go() ->
           _resetWordState(), which silently DESELECTED the tile a child had
           just picked, with no visible cause. */
        if (self.mode === 'sort') return;
        if (e.key === 'ArrowRight') { self.go(1); e.preventDefault(); }
        else if (e.key === 'ArrowLeft') { self.go(-1); e.preventDefault(); }
        else if (e.key === ' ' && self.mode === 'clap') { self.onDrum(); e.preventDefault(); }
      };
      document.addEventListener('keydown', this._onKey);
    }

    /* ⚠ ARCS ARE ABSOLUTE PIXEL GEOMETRY measured off the rendered word,
       so anything that changes the word's metrics without a re-render
       leaves every arc offset from the syllable it belongs to. The
       shipped build repainted only inside render(); entering fullscreen,
       rotating a tablet or a late font swap all desynced it. */
    if (!this._resizeBound) {
      this._resizeBound = true;
      this._onResize = function () { self._paintArcs(); };
      window.addEventListener('resize', this._onResize);
      document.addEventListener('fullscreenchange', this._onResize);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { self._paintArcs(); });
    }
  },

  _readParams: function () {
    var q = {};
    try {
      var p = new URLSearchParams(location.search);
      if (p.get('set')) q.set = p.get('set');
      if (p.get('word')) q.word = p.get('word');
      if (p.get('mode')) q.mode = p.get('mode');
      if (p.get('add')) q.add = p.get('add');
    } catch (_) {}
    return (q.set || q.word || q.mode || q.add) ? q : null;
  },

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)) || {}; } catch (_) { return {}; }
  },
  _saveStore: function () {
    var s = this._store || {};
    s.v = 1; s.lastShelf = this.shelfId;
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(s)); } catch (_) {}
  },

  _fetchDeck: function () {
    var self = this;
    fetch('/mini-tools/syllable-splitter-' + this.api.lang + '.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .catch(function () { return self._localisedFallback(); })
      .then(function (d) {
        self.deck = (d && d.words && d.words.length) ? d : self._localisedFallback();
        self._applyEntryState();
        self.render();
      });
  },

  /* the fallback's shelf carries the tool's own translated heading rather
     than a hard-coded English one */
  _localisedFallback: function () {
    var d = JSON.parse(JSON.stringify(this.FALLBACK_DECK));
    d.shelves[0].label = this.api.t('shelfPick');
    return d;
  },

  _fetchEntitlement: function () {
    var self = this, token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}

    var trustCache = function () {
      var ent = self._store.ent;
      if (ent && ent.checkedAt) {
        var age = (Date.now() - new Date(ent.checkedAt).getTime()) / 86400000;
        self.premium = (age <= self.ENT_TRUST_DAYS) ? ent.tier !== 'free' : false;
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

  _settle: function () { if (!this.deck) return; this._applyEntryState(); if (this._wrap) this.render(); },

  _applyEntryState: function () {
    if (!this.deck) return;
    if (this._deepPending && this._deepPending.add) {
      this._ingestShared(this._deepPending.add);
      delete this._deepPending.add;
    }
    var d = this._deepPending ? this.resolveDeepLink(this._deepPending, this.premium) : null;
    if (d) {
      this.shelfId = d.shelf; this.index = d.index;
      if (d.mode && (d.mode === 'clap' || d.mode === 'build' || (d.mode === 'sort' && this.premium))) this.mode = d.mode;
      if (this.premiumKnown) this._deepPending = null;
    } else if (!this.shelfId || !this._shelfUnlocked(this.shelfById(this.shelfId))) {
      this.shelfId = (this._store.lastShelf && this._shelfUnlocked(this.shelfById(this._store.lastShelf)))
        ? this._store.lastShelf : this.firstFreeShelf();
      this.index = 0;
    }
    if (this.mode === 'sort' && !this.premium) this.mode = 'clap';
    /* ⚠ the shipped build never cleared this here, so a premium user whose
       entitlement resolved AFTER the first paint kept a pool that had been
       built from the free shelf alone. */
    this._sortPool = null;
    this._resetWordState();
  },

  _resetWordState: function () { this.taps = 0; this.revealed = false; this.built = []; this.order = []; this._picked = null; },

  list: function () { return this.wordsForShelf(this.shelfId); },

  current: function () {
    var l = this.list();
    if (!l.length) return null;
    if (this.index >= l.length) this.index = 0;
    if (this.index < 0) this.index = l.length - 1;
    return l[this.index];
  },

  go: function (d) {
    var l = this.list();
    if (!l.length) return;
    this.index = (this.index + d + l.length) % l.length;
    this._resetWordState();
    this.render();
  },

  /* =================================================================
     SPEECH — WHOLE WORDS ONLY. Never a syllable, never a phoneme.
     ================================================================= */

  speakWord: function () { var w = this.current(); if (w) this.speakWordOf(w); },
  speakWordOf: function (w) {
    try { LCSAudio.speak({ type: 'word', text: w.display, lang: this.api.lang }); } catch (_) {}
  },

  /* =================================================================
     THE DRUM — a noise burst through a lowpass plus a pitch-dropping
     thump, velocity-varied so repeated taps never machine-gun.
     ================================================================= */

  _ctx: function () {
    if (this._audio === undefined || this._audio === null) {
      try {
        var AC = window.AudioContext || window.webkitAudioContext;
        this._audio = AC ? new AC() : false;
      } catch (_) { this._audio = false; }
    }
    return this._audio;
  },

  _noiseBuf: function (ctx) {
    if (!this._noise) {
      var len = Math.floor(ctx.sampleRate * 0.1), buf = ctx.createBuffer(1, len, ctx.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      this._noise = buf;
    }
    return this._noise;
  },

  boom: function () {
    if (!this.api.settings.drum) return;
    var now = Date.now();
    if (now - (this._lastBoom || 0) < 30) return;
    this._lastBoom = now;
    var ctx = this._ctx();
    if (!ctx) return;
    if (ctx.state === 'suspended') { try { ctx.resume(); } catch (_) {} }
    var t = ctx.currentTime, decay = 0.25;

    var noise = ctx.createBufferSource();
    noise.buffer = this._noiseBuf(ctx);
    var lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 480 * (0.92 + Math.random() * 0.16);
    lp.Q.value = 2;
    var ng = ctx.createGain();
    ng.gain.setValueAtTime(0.22, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + decay * 0.5);
    noise.connect(lp); lp.connect(ng); ng.connect(ctx.destination);
    noise.start(t); noise.stop(t + decay);

    var osc = ctx.createOscillator();
    osc.type = 'sine';
    var f0 = 92 * (0.95 + Math.random() * 0.1);
    osc.frequency.setValueAtTime(f0, t);
    osc.frequency.exponentialRampToValueAtTime(f0 * 0.55, t + decay);
    var og = ctx.createGain();
    og.gain.setValueAtTime(0.26, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + decay);
    osc.connect(og); og.connect(ctx.destination);
    osc.start(t); osc.stop(t + decay + 0.02);
  },

  onDrum: function () {
    if (this.mode !== 'clap' || this.surface !== 'board') return;
    var w = this.current();
    if (!w) return;
    var arcs = this.arcsFor(w);
    this.boom();
    /* ⚠⚠ TAPS ARE NEVER REFUSED — AND FOR THREE VERSIONS THIS COMMENT WAS
       A LIE SITTING DIRECTLY ABOVE THE CODE THAT REFUSED THEM.
       The guard was `if (this.taps < arcs.length)`, so a class that claps
       four for a three-syllable word got the drum sound, NO fourth marker,
       and — for a screen-reader user — no announcement at all, one tap
       after being told "Clap 3 of 3". That is a verdict delivered on two
       channels by a tool forbidden to deliver one, and it is the deck
       silently overruling the class. The count now runs as far as the
       class takes it; only the ARCS are bounded, because an arc must sit
       under a syllable that exists. Found by the French/Finnish panel. */
    this.taps++;
    this._paintBeats();
      /* ⚠⚠ THE TOTAL IS ANNOUNCED ONLY ONCE THE WORD IS REVEALED, and the
         German panel is why. The previous form fired `arcOf` whenever
         `taps === arcs.length` with no `revealed` check — so a
         screen-reader user tapping a HIDDEN word heard "Clap 3 of 3", the
         deck's own answer, at the exact moment the sighted class is still
         arguing about it. That defeats this tool's central ruling for
         precisely one user, which is the worst way to defeat it.
         It also meant `{i}` could only ever equal `{n}`: the placeholder
         pair was a fiction. `arcOf` now describes a revealed arc, and
         every tap on a hidden word gets the neutral running count. */
    if (this.revealed && this.taps === arcs.length) this.api.announce(this.fmt('arcOf', { i: this.taps, n: arcs.length }));
    else this.api.announce(this.fmt('beatCount', { i: this.taps }));
  },

  _after: function (ms, fn) { var id = setTimeout(fn, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },

  /* =================================================================
     RENDER
     ================================================================= */

  render: function () {
    var self = this, api = this.api;
    this._clearTimers();
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'ss-wrap');
    this._wrap = wrap;

    if (!this.deck) { wrap.appendChild(this._skeleton()); api.stage.appendChild(wrap); return; }

    if (this.surface === 'desk') {
      wrap.appendChild(this._buildDesk());
      api.stage.appendChild(wrap);
      wrap.appendChild(this._buildPrintSheet());
      var ft = wrap.querySelector('.ss-tab');
      if (ft && this._focusDesk) { ft.focus(); this._focusDesk = false; }
      return;
    }

    wrap.appendChild(this._buildTopRow());

    /* ⚠ THE SHELL HIDES `.lcs-instruction` IN EVERY EMBED
       (`lcs-shell.css: .lcs-app.embed .lcs-instruction{display:none}`), and
       every tool page builds its iframe with `&embed=1`. This tool's whole
       explanation lived in that one sentence, so on its own landing page it
       shipped with no guidance at all. It is carried in-stage now, using
       the SAME string — no new translation.
       ⚠ EMBED ONLY. Rendering it unconditionally printed the sentence
       TWICE when the tool is opened standalone, where the shell's own copy
       is visible. This is the compensating half of a shell rule, not a
       second instruction. */
    if (this.mode === 'clap' && api.embed) {
      var cue = api.el('p', 'ss-cue');
      cue.textContent = api.t('instruction');
      wrap.appendChild(cue);
    }

    if (this.mode === 'sort') wrap.appendChild(this._buildSort());
    else wrap.appendChild(this._buildCard());

    if (this.mode !== 'sort') {
      var nav = api.el('div', 'ss-nav');
      var p = api.el('button', 'ss-navbtn'); p.type = 'button'; p.innerHTML = this._chevronSVG('left');
      p.setAttribute('aria-label', api.t('prevWord'));
      p.addEventListener('click', function () { self.go(-1); });
      var n = api.el('button', 'ss-navbtn'); n.type = 'button'; n.innerHTML = this._chevronSVG('right');
      n.setAttribute('aria-label', api.t('nextWord'));
      n.addEventListener('click', function () { self.go(1); });
      nav.appendChild(p); nav.appendChild(n);
      wrap.appendChild(nav);
    }

    api.stage.appendChild(wrap);
    wrap.appendChild(this._buildPrintSheet());

    if (this.mode === 'clap') this._after(0, function () { self._paintBeats(); });
  },

  /* the loading state draws the card's own silhouette rather than leaving
     a blank void where the apparatus will be */
  _skeleton: function () {
    var api = this.api, s = api.el('div', 'ss-skel');
    ['ss-skel-pic', 'ss-skel-word', 'ss-skel-drum'].forEach(function (c) { s.appendChild(api.el('div', c)); });
    return s;
  },

  /* ---- top row: the set MENU, then the mode control ---- */
  _buildTopRow: function () {
    var self = this, api = this.api;
    var top = api.el('div', 'ss-toprow');

    /* ⭐ THE SET BUTTON. It used to be a capsule showing only the set's
       name, sitting in a row of three identically-shaped capsules — one
       menu among three radio buttons, all `border-radius:999px`, all teal
       on cream. The teacher who reported this did not misread it; the
       design told her it was the fourth mode. A rounded RECTANGLE with a
       left-aligned label over its value and a caret at the edge is the
       universal shape of a select. Both strings already exist. */
    var pill = api.el('button', 'ss-pill');
    pill.type = 'button';
    pill.setAttribute('aria-haspopup', 'dialog');
    pill.setAttribute('aria-expanded', 'false');
    var shelf = this.shelfById(this.shelfId);
    var col = api.el('span', 'ss-pill-col');
    var eyebrow = api.el('span', 'ss-pill-eyebrow'); eyebrow.textContent = api.t('shelfPick');
    var val = api.el('span', 'ss-pill-value'); val.textContent = shelf ? shelf.label : api.t('shelfPick');
    col.appendChild(eyebrow); col.appendChild(val);
    pill.appendChild(col);
    var car = api.el('span', 'ss-pill-caret'); car.innerHTML = this._caretSVG();
    pill.appendChild(car);
    pill.setAttribute('aria-label', api.t('shelfPick') + ': ' + (shelf ? shelf.label : ''));
    pill.addEventListener('click', function () { self.openDesk('sets'); });
    top.appendChild(pill);

    /* Clap and Build act on the SAME card; Sort is a different apparatus
       with no card and no word nav. They are not three peers, so they are
       not three identical chips: a joined two-segment track, then a gap,
       then Sort standing on its own. */
    var right = api.el('div', 'ss-moderow');
    var seg = api.el('div', 'ss-seg');
    seg.setAttribute('role', 'radiogroup');
    seg.setAttribute('aria-label', api.t('modeClap') + ' / ' + api.t('modeBuild'));
    [['clap', 'modeClap'], ['build', 'modeBuild']].forEach(function (m) {
      var b = api.el('button', 'ss-segbtn' + (self.mode === m[0] ? ' ss-on' : ''));
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', String(self.mode === m[0]));
      b.innerHTML = self._modeGlyph(m[0]);
      var lab = api.el('span', 'ss-seglabel'); lab.textContent = api.t(m[1]);
      b.appendChild(lab);
      b.addEventListener('click', function () { self.mode = m[0]; self._resetWordState(); self.render(); });
      seg.appendChild(b);
    });
    right.appendChild(seg);

    /* ⚠ A LOCKED CONTROL KEEPS FULL CONTRAST. `opacity:.62` is the
       universal *disabled* signal and says nothing about why. A padlock
       says exactly one thing, and tapping it opens the DESK — so a child
       who taps it never meets a price. */
    var sortBtn = api.el('button', 'ss-sortbtn' + (this.mode === 'sort' ? ' ss-on' : '') + (this.premium ? '' : ' ss-locked'));
    sortBtn.type = 'button';
    sortBtn.innerHTML = this._modeGlyph('sort');
    var sl = api.el('span', 'ss-seglabel'); sl.textContent = api.t('modeSort');
    sortBtn.appendChild(sl);
    if (!this.premium) {
      var lk = api.el('span', 'ss-lockglyph'); lk.innerHTML = this._lockSVG();
      sortBtn.appendChild(lk);
      sortBtn.setAttribute('aria-label', api.t('modeSort') + ' — ' + api.t('lockedShelf'));
    }
    sortBtn.addEventListener('click', function () {
      if (!self.premium) { self.openDesk('sets'); self._notice = 'gate'; self.render(); return; }
      self.mode = 'sort'; self._resetWordState(); self.render();
    });
    right.appendChild(sortBtn);
    top.appendChild(right);
    return top;
  },

  _imgUrl: function (w) {
    return '/image-library-webp/themes/' + encodeURIComponent(w.imageDir) + '/' + w.imageFile + '@2x.webp';
  },

  _picture: function (w, cls) {
    var api = this.api;
    var img = api.el('img', cls || 'ss-pic');
    img.src = this._imgUrl(w);
    /* ⚠ alt was `w.display` — which put the word into the accessibility
       tree before the class had clapped it, and would hand a screen-reader
       user the answer the sighted class is still working out. The picture
       is decorative while the word is hidden; the word has its own live
       announcement when it is revealed. */
    img.alt = '';
    img.setAttribute('role', 'presentation');
    img.draggable = false;
    img.addEventListener('dragstart', function (e) { e.preventDefault(); });
    return img;
  },

  _buildCard: function () {
    var self = this, api = this.api;
    var w = this.current();
    /* ⭐ THE PICTURE STEPS BACK WHEN THE WORD ARRIVES. While the word is
       hidden the picture is the only content and should be big; once it is
       revealed the word carrying the arcs is the thing being taught, and a
       picture four times its height buries it. Rather than pick a global
       ratio out of the air and chase it, the hierarchy simply follows the
       state: reveal demotes the picture. */
    var card = api.el('div', 'ss-card' + (this.mode === 'clap' && this.revealed ? ' ss-revealed' : ''));
    if (!w) {
      card.appendChild(this._skeleton());
      var b = api.el('button', 'ss-again');
      b.type = 'button'; b.textContent = api.t('shelfPick');
      b.addEventListener('click', function () { self.openDesk('sets'); });
      card.appendChild(b);
      return card;
    }

    /* the speaker is a utility, not a step — it used to sit between the
       word and the drum, directly across the path from reading to hitting */
    var spk = api.el('button', 'ss-speak');
    spk.type = 'button';
    spk.setAttribute('aria-label', api.t('hearWord'));
    spk.innerHTML = this._speakerSVG(22);
    spk.addEventListener('click', function () { self.speakWord(); });
    card.appendChild(spk);

    /* ⚠⚠ THE TEACHER'S OWN WORDS USED TO DEFEAT THE TOOL'S CENTRAL RULING.
       A custom word has no picture, so it rendered as a big name card at
       the top — permanently, before a single clap, while the clap face
       below still drew its veil and still offered a Show/Hide eye that
       changed nothing a child could not already read. The whole reveal
       ceremony was void on exactly the shelf the teacher came for. Found
       by the French/Finnish panel reading the model.
       The name card now obeys the same rule as everything else: it appears
       when the word is revealed, and until then the card carries a blank
       plaque, so a teacher's word is clapped before it is read. */
    if (w.noImage) {
      var showName = !(this.mode === 'clap' && !this.revealed);
      var nameCard = api.el('div', 'ss-namecard' + (showName ? '' : ' ss-namecard-veiled'));
      nameCard.textContent = showName ? w.display : '';
      card.appendChild(nameCard);
    } else {
      card.appendChild(this._picture(w));
    }

    if (this.mode === 'clap') {
      card.appendChild(this._buildClapFace(w));
    } else {
      card.appendChild(this._buildRebuild(w));
    }
    return card;
  },

  /* ---- clap face ---- */
  _buildClapFace: function (w) {
    var self = this, api = this.api;
    var box = api.el('div', 'ss-clap');
    var arcs = this.arcsFor(w);

    /* THE BEAT LANE. While the word is hidden this is where the taps land
       — plain markers, no letters, no numeral, and nothing that could read
       as a verdict if the class clapped a different number from the deck. */
    var lane = api.el('div', 'ss-beatlane');
    this._beatLane = lane;
    box.appendChild(lane);

    if (this.revealed) {
      var wordRow = api.el('div', 'ss-wordrow');
      this._wordRow = wordRow;
      this._spanEls = [];
      for (var i = 0; i < arcs.length; i++) {
        var sp = api.el('span', 'ss-syl');
        sp.textContent = arcs[i];
        wordRow.appendChild(sp);
        this._spanEls.push(sp);
      }
      box.appendChild(wordRow);
    } else {
      this._wordRow = null; this._spanEls = [];
      var veil = api.el('div', 'ss-veil');
      veil.setAttribute('aria-hidden', 'true');
      box.appendChild(veil);
    }

    var drum = api.el('button', 'ss-drum');
    drum.type = 'button';
    drum.setAttribute('aria-label', api.t('tapDrum'));
    drum.innerHTML = this._drumSVG();
    drum.addEventListener('click', function () {
      drum.classList.remove('ss-hit'); void drum.offsetWidth; drum.classList.add('ss-hit');
      self._after(220, function () { drum.classList.remove('ss-hit'); });
      self.onDrum();
    });
    box.appendChild(drum);

    var row = api.el('div', 'ss-cardfoot');

    var eye = api.el('button', 'ss-ghostbtn');
    eye.type = 'button';
    eye.setAttribute('aria-label', api.t(this.revealed ? 'hideWord' : 'showWord'));
    eye.innerHTML = this._eyeSVG(this.revealed);
    eye.addEventListener('click', function () {
      self.revealed = !self.revealed;
      self.render();
      if (self.revealed) self.api.announce(self.current().display);
    });
    row.appendChild(eye);

    /* the clear is hidden until there is something to clear — a reset for
       a state that does not exist is furniture */
    if (this.taps > 0) {
      var again = api.el('button', 'ss-ghostbtn');
      again.type = 'button';
      again.setAttribute('aria-label', api.t('clearArcs'));
      again.innerHTML = this._undoSVG();
      again.addEventListener('click', function () { self.taps = 0; self.render(); });
      row.appendChild(again);
    }
    box.appendChild(row);

    var note = this.noteFor(w);
    if (note && this.revealed) {
      var n = api.el('p', 'ss-oralnote');
      n.textContent = note;
      box.appendChild(n);
    }
    return box;
  },

  /* beats while hidden; arcs once revealed. One function so a reveal
     mid-count never loses the taps already made. */
  _paintBeats: function () {
    if (this.mode !== 'clap' || this.surface !== 'board') return;
    var api = this.api;
    if (this._beatLane) {
      this._beatLane.innerHTML = '';
      var w = this.current();
      if (w && !this.revealed) {
        for (var i = 0; i < this.taps; i++) {
          var d = api.el('span', 'ss-beat');
          d.style.animationDelay = (i * 40) + 'ms';
          this._beatLane.appendChild(d);
        }
      }
    }
    this._paintArcs();
  },

  _paintArcs: function () {
    var row = this._wordRow;
    if (this._arcEl) { this._arcEl.remove(); this._arcEl = null; }
    if (!row || this.mode !== 'clap' || !this.revealed) return;
    var rowR = row.getBoundingClientRect();
    if (!rowR.width) return;
    /* ⭐ GEOMETRY IN em. The shipped arc was a flat 3.5px stroke in a flat
       26px box: proportionally fine under a 42px word and a hairline under
       the 88px word the wide tiers produce — the one mark this tool exists
       to teach, and the least visible thing on the board. */
    var fs = parseFloat(getComputedStyle(row).fontSize) || 42;
    var lane = Math.round(fs * 0.62);
    var depth = fs * 0.44;
    var stroke = Math.max(3, fs * 0.085);

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'ss-arcs');
    svg.setAttribute('width', rowR.width);
    svg.setAttribute('height', lane);
    svg.style.top = rowR.height + 'px';
    for (var i = 0; i < this.taps && i < this._spanEls.length; i++) {
      var r = this._spanEls[i].getBoundingClientRect();
      var x1 = r.left - rowR.left + 2, x2 = r.right - rowR.left - 2;
      var c = (x2 - x1) * 0.28;
      var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', 'M' + x1 + ' 3 C' + (x1 + c) + ' ' + depth + ' ' + (x2 - c) + ' ' + depth + ' ' + x2 + ' 3');
      p.setAttribute('class', 'ss-arc');
      p.setAttribute('stroke-width', stroke.toFixed(2));
      /* ⚠ pathLength normalises the dash to the drawn length. The shipped
         rule was a fixed `stroke-dasharray:120` with `dashoffset:120`,
         which starts the pattern in its GAP phase — so any arc longer than
         120 user units popped an ink fragment in at frame zero. Latent at
         42px, guaranteed once the word ramps. */
      p.setAttribute('pathLength', '100');
      svg.appendChild(p);
    }
    row.appendChild(svg);
    this._arcEl = svg;
  },

  /* ---- build face: scramble + rebuild using the WRITTEN chunks ---- */
  _buildRebuild: function (w) {
    var self = this, api = this.api;
    var cards = this.cardsFor(w);
    if (!this.order.length) this.order = this.scrambleOrder(cards.length, w.id);
    if (!this.built.length) for (var z = 0; z < cards.length; z++) this.built.push(null);

    var done = this.built.every(function (x, n) { return x === n; });

    var box = api.el('div', 'ss-build' + (done ? ' ss-done' : ''));
    var hint = api.el('p', 'ss-hint'); hint.textContent = api.t('buildHint');
    box.appendChild(hint);

    var slots = api.el('div', 'ss-slots');
    this._slotRow = slots;
    for (var i = 0; i < cards.length; i++) {
      (function (idx) {
        var filled = self.built[idx] !== null;
        var s = api.el('button', 'ss-slot' + (filled ? ' ss-filled' : ''));
        s.type = 'button';
        s.textContent = filled ? cards[self.built[idx]] : '';
        s.addEventListener('click', function () {
          if (self.built[idx] === null) return;
          self.built[idx] = null;
          try { self.api.sound(440); } catch (_) {}
          self.render();
        });
        slots.appendChild(s);
      })(i);
    }
    box.appendChild(slots);

    var tray = api.el('div', 'ss-tray');
    for (var k = 0; k < this.order.length; k++) {
      (function (ci) {
        var used = self.built.indexOf(ci) >= 0;
        var t = api.el('button', 'ss-piece' + (used ? ' ss-used' : ''));
        t.type = 'button';
        t.textContent = used ? '' : cards[ci];
        t.disabled = used;
        t.addEventListener('click', function () {
          var free = self.built.indexOf(null);
          if (free < 0) return;
          self.built[free] = ci;
          try { self.api.sound(660); } catch (_) {}
          self.render();
        });
        tray.appendChild(t);
      })(this.order[k]);
    }
    box.appendChild(tray);

    /* ⭐ THE COMPLETION MOMENT. It used to be `speakWord()` gated on the
       voice setting — and LCSAudio silently substitutes a missing voice,
       so in six of eleven locales finishing the word produced NOTHING AT
       ALL. The arcs now draw under the assembled word: the same mark as
       the clap face, so both faces teach one thing, and it depends on no
       voice being installed. */
    if (done) {
      var seal = api.el('div', 'ss-sealrow');
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'ss-sealarcs');
      svg.setAttribute('viewBox', '0 0 100 12');
      svg.setAttribute('preserveAspectRatio', 'none');
      var n = cards.length, seg = 100 / n;
      for (var q = 0; q < n; q++) {
        var a = q * seg + 1, b = (q + 1) * seg - 1;
        var pp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pp.setAttribute('d', 'M' + a + ' 1 C' + (a + seg * 0.28) + ' 11 ' + (b - seg * 0.28) + ' 11 ' + b + ' 1');
        pp.setAttribute('class', 'ss-arc ss-sealarc');
        pp.setAttribute('pathLength', '100');
        pp.style.animationDelay = (q * 110) + 'ms';
        svg.appendChild(pp);
      }
      seal.appendChild(svg);
      box.appendChild(seal);
      if (this.api.settings.voice) this._after(260, function () { self.speakWord(); });
    }

    /* ⚠ ONLY WHEN IT CAN ACTUALLY CHANGE SOMETHING. MEASURED: the
       deterministic scramble plus its identity guard yields exactly ONE
       reachable order for a two-piece word (5 for three pieces, 8 for
       four) — so on every two-syllable word, which is the entire free
       shelf, "Mix them up" did nothing at all. It still has a consequence
       once pieces are placed, because it clears them. A control whose only
       possible effect is nothing is furniture, and the shared liveness
       gate is what named it: it scored DEAD across all three entitlement
       states while every other gate stayed green. */
    var canMix = cards.length > 2 || self.built.some(function (x) { return x !== null; });
    if (canMix) {
      var mix = api.el('button', 'ss-again');
      mix.type = 'button';
      mix.textContent = api.t('scramble');
      mix.addEventListener('click', function () {
        self._scrambleSalt = (self._scrambleSalt || 0) + 7;
        self.built = []; self.order = [];
        self.render();
      });
      box.appendChild(mix);
    }

    /* the divergence caveat MUST reach this face: build is the one place
       where both conventions are visible at once (French `pomme` shows two
       cards for one clap) and therefore the one place the difference most
       looks like a bug. The shipped build appended it to the clap branch
       only. */
    var note = this.noteFor(w);
    if (note) {
      var nn = api.el('p', 'ss-oralnote');
      nn.textContent = note;
      box.appendChild(nn);
    }
    return box;
  },

  /* ---- sort face: picture cards into clap pens (premium) ---- */
  _buildSort: function () {
    var self = this, api = this.api;
    var box = api.el('div', 'ss-sort');
    var hint = api.el('p', 'ss-hint'); hint.textContent = api.t('sortHint');
    box.appendChild(hint);

    var pens = (this.deck && this.deck.pens) || [1, 2, 3];
    var pool = this._visibleWords();
    if (!this._sortPool) {
      var seed = Math.random;
      this._sortPool = this.buildSortPool(pens, pool, seed);
    }

    var penRow = api.el('div', 'ss-pens');
    this._penEls = {};
    for (var p = 0; p < pens.length; p++) {
      (function (pn) {
        var pen = api.el('div', 'ss-pen');
        pen.dataset.pen = pn;
        /* ⭐ DOTS FIRST. "2 claps" at 13px is unreadable from row three and
           unreadable full stop by a four-year-old — in a tool whose whole
           audience is pre-readers. The numeral plus that many arcs is the
           tool's own mark, and it makes the pen language-free. The words
           survive as the pen's accessible name. */
        var lab = api.el('div', 'ss-penlab');
        var num = api.el('span', 'ss-pennum'); num.textContent = String(pn);
        lab.appendChild(num);
        var marks = api.el('span', 'ss-penmarks');
        marks.innerHTML = self._penArcsSVG(pn);
        lab.appendChild(marks);
        pen.appendChild(lab);
        var txt = pn === 1 ? api.t('penOne') : self.fmt('penLabel', { n: pn });
        pen.setAttribute('role', 'button');
        pen.setAttribute('tabindex', '0');
        pen.setAttribute('aria-label', txt);
        var slot = api.el('div', 'ss-penslot');
        pen.appendChild(slot);
        var place = function () { if (self._picked) { self.penOf[self._picked] = pn; self._picked = null; try { self.api.sound(660); } catch (_) {} self.render(); } };
        pen.addEventListener('click', place);
        pen.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); place(); } });
        penRow.appendChild(pen);
        self._penEls[pn] = { pen: pen, slot: slot };
      })(pens[p]);
    }
    box.appendChild(penRow);

    var pile = api.el('div', 'ss-pile');
    this._pileEl = pile;
    var placeBack = function () { if (self._picked) { delete self.penOf[self._picked]; self._picked = null; try { self.api.sound(440); } catch (_) {} self.render(); } };
    pile.addEventListener('click', placeBack);
    box.appendChild(pile);

    this._sortPool.forEach(function (w) {
      var tile = api.el('div', 'ss-tile' + (self._picked === w.id ? ' ss-picked' : ''));
      tile.appendChild(self._picture(w, 'ss-tilepic'));
      /* the printed caption is gone: a word under the picture converts a
         phonological sort into letter-counting */
      tile.setAttribute('tabindex', '0');
      tile.setAttribute('role', 'button');
      tile.setAttribute('aria-label', w.display);
      tile.setAttribute('aria-pressed', String(self._picked === w.id));
      self._wireTile(tile, w);
      var pen = self.penOf[w.id];
      if (pen && self._penEls[pen]) self._penEls[pen].slot.appendChild(tile);
      else pile.appendChild(tile);
    });

    var back = api.el('button', 'ss-again');
    back.type = 'button';
    back.textContent = api.t('backToPile');
    back.addEventListener('click', function () { self.penOf = {}; self._picked = null; self.render(); });
    box.appendChild(back);
    return box;
  },

  /* ⭐ TAP-THEN-TAP IS THE PRIMARY VERB. Drag survives for a mouse, but a
     five-year-old dragging a tile two metres across an interactive
     whiteboard, through a 10px threshold and a pointer capture, is the
     failure mode of every IWB sort ever built. The tap gesture used to be
     spent on speaking the word; removing syllable speech freed it. */
  _wireTile: function (tile, w) {
    var self = this;
    tile.addEventListener('dragstart', function (e) { e.preventDefault(); });
    tile.addEventListener('pointerdown', function (e) {
      if (e.button) return;
      e.preventDefault();
      var sx = e.clientX, sy = e.clientY, moved = false, ghost = null;
      try { tile.setPointerCapture(e.pointerId); } catch (_) {}

      var onMove = function (ev) {
        var dx = ev.clientX - sx, dy = ev.clientY - sy;
        if (!moved && Math.sqrt(dx * dx + dy * dy) < 10) return;
        if (!moved) {
          moved = true;
          var r = tile.getBoundingClientRect();
          ghost = tile.cloneNode(true);
          ghost.className = 'ss-tile ss-ghost';
          ghost.style.width = r.width + 'px';
          ghost.style.height = r.height + 'px';
          document.body.appendChild(ghost);
          tile.classList.add('ss-dragging');
        }
        ghost.style.left = (ev.clientX - 34) + 'px';
        ghost.style.top = (ev.clientY - 34) + 'px';
        self._hover(ev.clientX, ev.clientY);
      };
      var onUp = function (ev) {
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
        document.removeEventListener('pointercancel', onUp);
        try { tile.releasePointerCapture(e.pointerId); } catch (_) {}
        if (ghost) { ghost.remove(); ghost = null; }
        tile.classList.remove('ss-dragging');
        self._clearHover();
        if (!moved) { self._picked = (self._picked === w.id) ? null : w.id; self.render(); return; }
        var pen = self._penAt(ev.clientX, ev.clientY);
        if (pen === null) delete self.penOf[w.id]; else self.penOf[w.id] = pen;
        self._picked = null;
        try { self.api.sound(pen ? 660 : 440); } catch (_) {}
        self.render();
      };
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
      document.addEventListener('pointercancel', onUp);
    });
    tile.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      self._picked = (self._picked === w.id) ? null : w.id;
      self.render();
    });
  },

  _penAt: function (x, y) {
    for (var k in this._penEls) {
      if (!Object.prototype.hasOwnProperty.call(this._penEls, k)) continue;
      var r = this._penEls[k].pen.getBoundingClientRect();
      if (x >= r.left - 16 && x <= r.right + 16 && y >= r.top - 24 && y <= r.bottom + 24) return parseInt(k, 10);
    }
    return null;
  },
  _hover: function (x, y) {
    var pen = this._penAt(x, y);
    for (var k in this._penEls) {
      if (!Object.prototype.hasOwnProperty.call(this._penEls, k)) continue;
      this._penEls[k].pen.classList.toggle('ss-over', parseInt(k, 10) === pen);
    }
  },
  _clearHover: function () {
    for (var k in this._penEls) {
      if (!Object.prototype.hasOwnProperty.call(this._penEls, k)) continue;
      this._penEls[k].pen.classList.remove('ss-over');
    }
  },

  /* =================================================================
     THE DESK — an ADULT surface, IN FLOW.

     ⚠ NOT a fixed modal. A `position:fixed` scrim inside a
     content-height iframe resolves `max-height:82vh` against the iframe,
     which on the landing page is a few hundred pixels — a word editor in
     a letterbox. In flow, the iframe simply grows to hold it.
     ================================================================= */

  openDesk: function (tab) {
    this.surface = 'desk';
    this.deskTab = tab || 'sets';
    this._focusDesk = true;
    this.render();
  },
  closeDesk: function () {
    this.surface = 'board';
    this._notice = null;
    this.render();
    var p = this._wrap && this._wrap.querySelector('.ss-pill');
    if (p) p.focus();
  },

  _buildDesk: function () {
    var self = this, api = this.api;
    var desk = api.el('div', 'ss-desk');

    var head = api.el('div', 'ss-desk-head');
    var tabs = api.el('div', 'ss-tabs');
    tabs.setAttribute('role', 'tablist');
    [['sets', 'shelfPick'], ['mine', 'deskMine'], ['print', 'deskPrint']].forEach(function (t) {
      var on = self.deskTab === t[0];
      var b = api.el('button', 'ss-tab' + (on ? ' ss-on' : ''));
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', String(on));
      b.textContent = api.t(t[1]);
      /* ⚠ THE SELECTED TAB IS NOT A CONTROL. Clicking what is already
         showing changes nothing, and the shared liveness gate is right to
         score that DEAD — it did, in all three entitlement states, and it
         was the last dead control left in the tool. `aria-selected` already
         carries the state; `disabled` stops us offering an action that
         cannot happen. You cannot select what is selected. */
      if (on) b.disabled = true;
      else b.addEventListener('click', function () { self.deskTab = t[0]; self.render(); });
      tabs.appendChild(b);
    });
    head.appendChild(tabs);
    var close = api.el('button', 'ss-desk-close'); close.type = 'button';
    close.textContent = api.t('shelfClose');
    close.addEventListener('click', function () { self.closeDesk(); });
    head.appendChild(close);
    desk.appendChild(head);

    var body = api.el('div', 'ss-desk-body');
    if (this.deskTab === 'sets') this._deskSets(body);
    else if (this.deskTab === 'mine') this._deskMine(body);
    else this._deskPrint(body);
    desk.appendChild(body);

    desk.appendChild(this._buildSiblings());
    return desk;
  },

  _deskSets: function (body) {
    var self = this, api = this.api;

    if (this.customWords().length) {
      body.appendChild(this._shelfBlock(this.customShelf(), true));
    }

    (this.deck.shelves || []).forEach(function (shelf) {
      body.appendChild(self._shelfBlock(shelf, self._shelfUnlocked(shelf)));
    });

    /* ⚠ ON DEMAND, NOT ALWAYS. This used to render for every non-premium
       visitor the moment the sets list opened — so tapping a locked set
       changed NOTHING, and the shared liveness gate scored all three
       locked rows DEAD in every entitlement state. Showing it only when a
       teacher reaches for a locked set makes those rows consequential and
       stops the desk opening with a price on it. */
    if (this._notice === 'gate') body.appendChild(this._gateLine());
  },

  _shelfBlock: function (shelf, open) {
    var self = this, api = this.api;
    var sec = api.el('div', 'ss-sec' + (open ? '' : ' ss-locked'));
    var row = api.el('button', 'ss-secrow'); row.type = 'button';
    var lbl = api.el('span', 'ss-seclabel'); lbl.textContent = shelf.label;
    row.appendChild(lbl);
    if (!open) { var lk = api.el('span', 'ss-lock'); lk.textContent = api.t('lockedShelf'); row.appendChild(lk); }
    row.addEventListener('click', function () {
      if (!open) { self._notice = 'gate'; self.render(); return; }
      self.shelfId = shelf.id; self.index = 0;
      self._sortPool = null; self._resetWordState(); self._saveStore();
      self.closeDesk();
    });
    sec.appendChild(row);
    /* THE STRUCTURAL GATE — a locked set emits no word list at all */
    if (open) {
      var grid = api.el('div', 'ss-wordgrid');
      this.wordsForShelf(shelf.id).forEach(function (word) {
        var c = api.el('button', 'ss-wordchip'); c.type = 'button';
        c.textContent = word.display;
        c.addEventListener('click', function () {
          self.shelfId = shelf.id;
          var l = self.list();
          for (var z = 0; z < l.length; z++) if (l[z].id === word.id) { self.index = z; break; }
          self._resetWordState(); self._saveStore();
          self.closeDesk();
        });
        grid.appendChild(c);
      });
      sec.appendChild(grid);
    }
    return sec;
  },

  /* ---- MY WORDS ---- */
  _deskMine: function (body) {
    var self = this, api = this.api;

    var hint = api.el('p', 'ss-desknote');
    hint.textContent = api.t('seamHint');
    body.appendChild(hint);

    /* ⭐ THE REQUIRED SENTENCE — permanent, never a toast. */
    var own = api.el('p', 'ss-ownnote');
    own.textContent = api.t('ownWordsNote');
    body.appendChild(own);

    var field = api.el('label', 'ss-ed-field');
    var ta = api.el('textarea', 'ss-ed-area');
    ta.rows = 3;
    ta.placeholder = api.t('pasteHint');
    ta.setAttribute('aria-label', api.t('pasteHint'));
    field.appendChild(ta);
    body.appendChild(field);

    var addb = api.el('button', 'ss-ed-btn');
    addb.type = 'button';
    addb.textContent = api.t('addWords');
    addb.addEventListener('click', function () { var v = ta.value; ta.value = ''; self._addFromText(v); });
    body.appendChild(addb);

    if (this._notice && this._notice !== 'gate') {
      var nf = api.el('p', 'ss-desknote ss-warn'); nf.textContent = api.t(this._notice); body.appendChild(nf);
    }

    var saved = (this._store.custom || []);
    for (var i = 0; i < saved.length; i++) body.appendChild(this._customRow(saved[i]));

    if (saved.length) {
      var dev = api.el('p', 'ss-desknote ss-tiny');
      dev.textContent = api.t('deviceOnly');
      body.appendChild(dev);

      var cp = api.el('button', 'ss-ed-btn ss-edghost');
      cp.type = 'button';
      cp.textContent = this._copied ? api.t('copied') : api.t('copyList');
      cp.addEventListener('click', function () { self._copyList(cp); });
      body.appendChild(cp);
    }
  },

  /* ⚠ APPEND, never replace. The shipped sibling precedent for this
     editor does `_draft = words.map(...)`, which destroys every seam the
     teacher has already corrected the moment she adds one more word. */
  _addFromText: function (text) {
    var parts = String(text || '').split(/[\n,;]+/), i;
    var store = this._store;
    store.custom = store.custom || [];
    this._notice = null;
    for (i = 0; i < parts.length; i++) {
      /* the teacher's capital survives: a German teacher's "Kuh" must not
         ship as "kuh" while every noun in her bank keeps its capital */
      var shown = parts[i].trim().replace(/'/g, '’').replace(/[^\p{L}’-]/gu, '');
      if (!shown) continue;
      if (store.custom.length >= this.MAX_CUSTOM) { this._notice = 'listFull'; break; }
      /* ⚠ REFUSE WITH A REASON, NEVER IN SILENCE. Both of these used to be
         a bare `continue`: the word simply vanished out of the box and the
         teacher was told nothing. German is where it bites hardest — a
         Sachunterricht topic word like `Nachmittagsbetreuung` is over the
         letter cap, and disappearing without a word is indistinguishable
         from the tool being broken. */
      if (shown.length > this.MAX_LETTERS) { this._notice = 'tooLong'; continue; }
      var id = 'my:' + shown.toLowerCase();
      var dup = false;
      for (var j = 0; j < store.custom.length; j++) if (store.custom[j].id === id) dup = true;
      if (dup) { this._notice = 'duplicateSkip'; continue; }
      /* ⭐ EVERY SEAM OPENS CLOSED — one word, one clap. The machine offers
         no guess, not even for a word it happens to know. */
      store.custom.push({ id: id, display: shown, chunks: [shown] });
    }
    this._saveStore();
    this.render();
  },

  _customRow: function (c) {
    var self = this, api = this.api;
    var row = api.el('div', 'ss-myrow');

    var seam = api.el('div', 'ss-seamrow');
    var letters = c.display.split('');
    var cuts = this.chunksToCuts(c.chunks);
    for (var i = 0; i < letters.length; i++) {
      var tile = api.el('span', 'ss-seamtile');
      tile.textContent = letters[i];
      seam.appendChild(tile);
      if (i < letters.length - 1) {
        (function (at) {
          var s = api.el('button', 'ss-seam' + (cuts[at] ? ' ss-cut' : ''));
          s.type = 'button';
          s.setAttribute('aria-pressed', cuts[at] ? 'true' : 'false');
          /* ⚠ NOT `seamHint`. That is the panel's instruction PARAGRAPH,
             and setting it here named every one of up to 23 seam buttons
             in a word with the same full imperative sentence — a
             screen-reader user could not tell seam 1 from seam 4. One
             element wearing two jobs under one label, the recorded
             defect. `aria-pressed` already carries the state. */
          s.setAttribute('aria-label', api.t('seamLabel'));
          s.addEventListener('click', function () {
            var cc = self.chunksToCuts(c.chunks);
            if (cc[at]) delete cc[at]; else cc[at] = true;
            c.chunks = self.cutsToChunks(c.display.split(''), cc);
            self._saveStore();
            self.render();
          });
          seam.appendChild(s);
        })(i + 1);
      }
    }
    row.appendChild(seam);

    /* The live preview is the apparatus rather than an abstract box row.
       ⚠ It is an APPROXIMATION and the comment used to overclaim: these
       arcs are laid out on LETTER COUNTS, while the board measures the
       rendered width of each span, so a word with wide and narrow letters
       (`lune`, `Wilhelmiina`) shows slightly different proportions here
       than on the board. It is faithful about WHERE THE BREAKS ARE, which
       is the only thing the teacher is deciding. */
    var prev = api.el('div', 'ss-mypreview');
    var pw = api.el('div', 'ss-mypreview-word'); pw.textContent = c.display;
    prev.appendChild(pw);
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'ss-myarcs');
    svg.setAttribute('viewBox', '0 0 100 13');
    svg.setAttribute('preserveAspectRatio', 'none');
    var total = c.display.length, at2 = 0;
    for (var k = 0; k < c.chunks.length; k++) {
      var a = (at2 / total) * 100 + 1;
      at2 += c.chunks[k].length;
      var b = (at2 / total) * 100 - 1;
      var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', 'M' + a + ' 1 C' + (a + (b - a) * 0.28) + ' 12 ' + (b - (b - a) * 0.28) + ' 12 ' + b + ' 1');
      p.setAttribute('class', 'ss-arc ss-myarc');
      p.setAttribute('pathLength', '100');
      svg.appendChild(p);
    }
    prev.appendChild(svg);
    row.appendChild(prev);

    var del = api.el('button', 'ss-del');
    del.type = 'button';
    del.setAttribute('aria-label', api.t('deleteWord') + ' — ' + c.display);
    del.innerHTML = '&#10005;';
    del.addEventListener('click', function () {
      var list = self._store.custom || [];
      for (var z = 0; z < list.length; z++) if (list[z].id === c.id) { list.splice(z, 1); break; }
      if (self.shelfId === self.CUSTOM_SHELF && !self.customWords().length) self.shelfId = self.firstFreeShelf();
      self._saveStore();
      self.render();
    });
    row.appendChild(del);
    return row;
  },

  _copyList: function (btn) {
    var self = this;
    /* ⚠ NOT '-'. The sanitiser deliberately KEEPS the hyphen as a letter
       (`porte-clé`, `arc-en-ciel`, `Etelä-Suomi`), so joining chunks with
       one and splitting the payload on one destroyed exactly those words:
       `porte-clé` came back as `porteclé` with the hyphen deleted AND a
       syllable break invented that the teacher never tapped — in a tool
       whose founding rule is that the machine proposes no split. The
       separator must be something that cannot occur inside a word. */
    var list = (this._store.custom || []).map(function (c) { return c.chunks.join('|'); }).join(',');
    var url = location.origin + location.pathname + '?lang=' + this.api.lang + '&add=' + encodeURIComponent(list);
    var done = function () { self._copied = true; self.render(); self._after(2000, function () { self._copied = false; self.render(); }); };
    /* ⚠ "Copied" must never fire when the copy failed. */
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        /* ⚠ the rejection path used to be an empty function followed by a
           `return`, so the execCommand fallback below was unreachable
           whenever the async API existed and FAILED — which is the common
           case here: this tool ships inside an iframe, where the clipboard
           permission is routinely denied. "Copied" correctly never lied;
           there was simply no path to "could not copy". Fall through. */
        navigator.clipboard.writeText(url).then(done, function () { self._notice = 'copyFailed'; self.render(); });
        return;
      }
    } catch (_) {}
    try {
      var ta = document.createElement('textarea');
      ta.value = url; document.body.appendChild(ta); ta.select();
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      if (ok) done();
    } catch (_) {}
  },

  _ingestShared: function (payload) {
    var store = this._store;
    store.custom = store.custom || [];
    var items = String(payload).split(',');
    for (var i = 0; i < items.length; i++) {
      if (store.custom.length >= this.MAX_CUSTOM) break;
      var chunks = items[i].split('|').filter(function (x) { return x; });
      if (!chunks.length) continue;
      var display = chunks.join('');
      if (display.length > this.MAX_LETTERS) continue;
      var id = 'my:' + display.toLowerCase();
      var dup = false;
      for (var j = 0; j < store.custom.length; j++) if (store.custom[j].id === id) dup = true;
      if (dup) continue;
      store.custom.push({ id: id, display: display, chunks: chunks });
    }
    this._saveStore();
  },

  _deskPrint: function (body) {
    var self = this, api = this.api;
    var h = api.el('p', 'ss-desknote');
    h.textContent = api.t('printHint');
    body.appendChild(h);
    var b = api.el('button', 'ss-ed-btn');
    b.type = 'button';
    b.textContent = api.t('printSheet');
    b.addEventListener('click', function () { self._print(); });
    body.appendChild(b);
  },

  _print: function () {
    try { window.print(); } catch (_) {}
  },

  /* THE PRINT SHEET.

     ⚠ `lcs-shell.css` ships NO `@media print` block at all, so the shell's
     `html,body{height:100%;overflow:hidden}` and `.lcs-app{max-width:720px;
     overflow:hidden}` survive into print. The shipped tool reset none of
     them and simply printed a clipped 720px fragment of one viewport. The
     print CSS below therefore has to undo the SHELL before it can lay out
     a page of its own.

     ⚠ The arcs are NEVER pre-drawn. An empty ruled lane is the worksheet;
     a printed arc is the answer key. */
  _buildPrintSheet: function () {
    var api = this.api;
    var sheet = api.el('div', 'ss-printsheet');
    var words = this.shelfId === this.CUSTOM_SHELF ? this.customWords() : this.wordsForShelf(this.shelfId);
    var page = api.el('div', 'ss-printpage');
    for (var i = 0; i < words.length && i < 6; i++) {
      var w = words[i];
      var cell = api.el('div', 'ss-printcell');
      if (!w.noImage) {
        var img = api.el('img', 'ss-printpic');
        img.src = this._imgUrl(w);
        img.alt = '';
        cell.appendChild(img);
      }
      var word = api.el('div', 'ss-printword');
      word.textContent = w.display;
      cell.appendChild(word);
      var lane = api.el('div', 'ss-printlane');
      cell.appendChild(lane);
      page.appendChild(cell);
    }
    sheet.appendChild(page);
    return sheet;
  },

  _gateLine: function () {
    var api = this.api;
    var g = api.el('div', 'ss-gate');
    var p = api.el('p', 'ss-gate-line'); p.textContent = api.t('gatePremium');
    g.appendChild(p);
    var a = api.el('a', 'ss-gate-cta');
    a.href = '/' + api.lang + '/pricing?from=tool-syllable-splitter';
    a.target = '_top';
    a.textContent = api.t('unlock');
    g.appendChild(a);
    return g;
  },

  _buildSiblings: function () {
    var api = this.api;
    var f = api.el('div', 'ss-siblings');
    var lbl = api.el('span', 'ss-sib-label'); lbl.textContent = api.t('trioLabel') + ' ';
    f.appendChild(lbl);
    var defs = [
      { file: 'sound-boxes', key: 'siblingSbx' },
      { file: 'blending-board', key: 'siblingBbd' },
      { file: 'letter-tiles', key: 'siblingLtl' }
    ];
    /* Heart Words ships in TEN locales — never link it from the fi build. */
    if (['en','de','fr','it','es','pt','nl','sv','da','no'].indexOf(api.lang) >= 0)
      defs.push({ file: 'heart-words', key: 'siblingHwd' });
    for (var i = 0; i < defs.length; i++) {
      if (i) { var sep = api.el('span', 'ss-sib-sep'); sep.textContent = ' · '; f.appendChild(sep); }
      var a = api.el('a', 'ss-sib-link');
      a.href = '/mini-tools/' + defs[i].file + '.html?lang=' + api.lang;
      a.target = '_top';
      a.textContent = api.t(defs[i].key);
      f.appendChild(a);
    }
    return f;
  },

  /* =================================================================
     ART
     ================================================================= */

  /* ⭐ THE DRUM. The shipped drum was five paths — a flat ellipse, a flat
     coral body and three white sticks — hard-sized as width/height
     ATTRIBUTES, so no CSS tier could ever reach it and it stayed 72px on a
     2560 board. This one is a real object: ground shadow, a waisted barrel
     with a lit and a shaded flank, a counter hoop, a lit head and a
     tension lacing.
     ⚠ THE LACING IS ONE CONTINUOUS PATH, NOT LUGS. Four to six countable
     metal items on the face of an instrument whose entire job is producing
     the numbers one to four is an invitation to count the wrong thing.
     ⚠ NO GRADIENTS — the same markup has to survive a monochrome printer. */
  _drumSVG: function () {
    return '<svg class="ss-drumsvg" viewBox="0 0 120 106" aria-hidden="true" focusable="false">'
      + '<ellipse class="ss-drum-shadow" cx="60" cy="97" rx="40" ry="6" fill="#3A3226" opacity=".14"/>'
      + '<g class="ss-drum-body">'
      +   '<path d="M22 30 C18 52 20 71 27 85 C36 93 84 93 93 85 C100 71 102 52 98 30 Z" fill="#F2784B" stroke="#146B5E" stroke-width="3.2" stroke-linejoin="round"/>'
      +   '<path d="M77 31 C81 53 80 72 75 87 C83 87 89 89 93 85 C100 71 102 52 98 30 Z" fill="#3A3226" opacity=".13"/>'
      +   '<path d="M22 30 C18 52 20 71 27 85 C31 88 35 90 40 91 C34 72 33 51 37 31 Z" fill="#FFFDF7" opacity=".20"/>'
      +   '<path d="M27 40 L43 60 L37 40 L53 60 L47 40 L63 60 L57 40 L73 60 L67 40 L83 60 L77 40 L93 58" fill="none" stroke="#FFF3DC" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/>'
      + '</g>'
      + '<g class="ss-drum-head">'
      +   '<ellipse cx="60" cy="29" rx="40" ry="13" fill="#E2653C" stroke="#146B5E" stroke-width="3.2"/>'
      +   '<ellipse cx="60" cy="26" rx="33" ry="10" fill="#FFF3DC" stroke="#146B5E" stroke-width="2.4"/>'
      +   '<path d="M33 23 C40 17 50 14 60 14 C70 14 80 17 87 23 C79 19 70 17 60 17 C50 17 41 19 33 23 Z" fill="#FFFDF7"/>'
      + '</g>'
      + '</svg>';
  },

  _penArcsSVG: function (n) {
    var out = '<svg viewBox="0 0 ' + (n * 14) + ' 10" aria-hidden="true" focusable="false" class="ss-penarcsvg">';
    for (var i = 0; i < n; i++) {
      var a = i * 14 + 2, b = i * 14 + 12;
      out += '<path d="M' + a + ' 2 C' + (a + 3) + ' 9 ' + (b - 3) + ' 9 ' + b + ' 2" fill="none" stroke="#F2784B" stroke-width="2" stroke-linecap="round"/>';
    }
    return out + '</svg>';
  },

  _modeGlyph: function (m) {
    if (m === 'clap') return '<svg class="ss-glyph" viewBox="0 0 28 14" aria-hidden="true" focusable="false">'
      + '<path d="M2 3 C4 12 10 12 12 3" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>'
      + '<path d="M16 3 C18 12 24 12 26 3" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
    if (m === 'build') return '<svg class="ss-glyph" viewBox="0 0 28 14" aria-hidden="true" focusable="false">'
      + '<rect x="2" y="2" width="11" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.2"/>'
      + '<rect x="15" y="2" width="11" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>';
    return '<svg class="ss-glyph" viewBox="0 0 28 14" aria-hidden="true" focusable="false">'
      + '<rect x="1.5" y="4" width="7" height="8" rx="1.8" fill="none" stroke="currentColor" stroke-width="2"/>'
      + '<rect x="10.5" y="4" width="7" height="8" rx="1.8" fill="none" stroke="currentColor" stroke-width="2"/>'
      + '<rect x="19.5" y="4" width="7" height="8" rx="1.8" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
  },

  _lockSVG: function () {
    return '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" class="ss-lockicon">'
      + '<rect x="3" y="7" width="10" height="7" rx="2" fill="currentColor"/>'
      + '<path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
  },

  _caretSVG: function () {
    return '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" class="ss-careticon">'
      + '<path d="M4 6.5L8 10.5L12 6.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  },

  _chevronSVG: function (dir) {
    var d = dir === 'left' ? 'M14 5L8.5 11L14 17' : 'M8 5L13.5 11L8 17';
    return '<svg viewBox="0 0 22 22" aria-hidden="true" focusable="false" class="ss-chev">'
      + '<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  },

  _eyeSVG: function (on) {
    if (on) return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="ss-icon">'
      + '<path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" fill="none" stroke="currentColor" stroke-width="2"/>'
      + '<circle cx="12" cy="12" r="2.6" fill="currentColor"/>'
      + '<path d="M4 20L20 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="ss-icon">'
      + '<path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" fill="none" stroke="currentColor" stroke-width="2"/>'
      + '<circle cx="12" cy="12" r="2.6" fill="currentColor"/></svg>';
  },

  /* ⚠ NOT AN UNDO ARROW. This button sets `taps = 0` — it erases every
     clap, not the last one — and a back-arrow promises "take back one".
     The glyph is the tool's OWN mark with a stroke through it, which says
     exactly what the button does and belongs to no other control. */
  _undoSVG: function () {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="ss-icon">'
      + '<path d="M3.5 8.5C5.5 15 9.5 15 11.5 8.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>'
      + '<path d="M13 8.5C15 15 19 15 21 8.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" opacity=".45"/>'
      + '<path d="M4 19.5L20 4.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
  },

  _speakerSVG: function (s) {
    return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" aria-hidden="true" focusable="false">'
      + '<path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/>'
      + '<path d="M16.5 8.5a5 5 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  },

  reset: function () {
    this._clearTimers();
    this._resetWordState();
    this.penOf = {};
    this._sortPool = null;
    this.mode = 'clap';
    this.surface = 'board';
    this.deskTab = 'sets';
    this._notice = null;
    this.render();
  },

  onSettings: function () { this._saveStore(); this.render(); }
};

/* =====================================================================
   CSS — injected once, tool-scoped with the ss- prefix.
   ===================================================================== */
function injectSyllableSplitterCSS() {
  if (document.getElementById('ss-style')) return;
  var st = document.createElement('style');
  st.id = 'ss-style';
  st.textContent = ''
    /* ⭐⭐ THE DOCUMENT MUST BE ABLE TO SCROLL — AND THE CASE THAT NEEDS IT
       IS NOT THE ONE EVERYBODY ASSUMED.
       `lcs-shell.css:54` sets `html,body{height:100%;overflow:hidden}`.
       Two expert panels and my own source trace all concluded that this
       clipped the tool inside its landing-page iframe. It does not: this
       tool never binds `#lcs-root{height:100%}`, so `.lcs-app{height:100%}`
       resolves against an auto-height parent, the app is content-driven,
       and the shell's ResizeObserver grows the iframe 420 -> 737 -> 766.
       MEASURED at the production geometry: nothing is clipped, and the
       "fix" would have been cargo cult. I retracted it.
       THE REAL CASE IS STANDALONE ON A PHONE, where there is no iframe to
       grow and the window IS the viewport. MEASURED:
           320x568  app 886  scrollY max 0  lowest control 850  UNREACHABLE
           360x640  app 846  scrollY max 0  lowest control 810  UNREACHABLE
           412x820  app 771                                     reachable
       The reveal eye and the clear button simply could not be touched.
       So the rule is armed — for the case that was measured, not the one
       that was assumed. Unconditional, never keyed on a width: a sibling
       shipped `@media (max-width:700px)` and missed the 704px embed by
       four pixels.
       ⚠ AND NOTE WHAT ACTUALLY CARRIES IT. `html,body.ss-scroll` is a
       selector LIST — `html` OR `body.ss-scroll` — so the `html` half
       applies with or without the class, and the class is decorative. I
       found this by poisoning: removing the `classList.add` changed
       nothing and the reachability gate stayed green, which for a moment
       looked like the gate being vacuous. It is the RULE that must be
       poisoned, and deleting it fails 320 and 360 immediately. The four
       sibling tools carry the same shape, so the same is true of them. */
    + 'html,body.ss-scroll{overflow-y:auto;height:auto;min-height:100%}'
    + 'body.ss-scroll{overflow-x:hidden}'
    + '.ss-wrap{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;padding:4px 8px 12px;box-sizing:border-box}'

    /* ---- top row: a MENU and a MODE CONTROL, visibly different objects ---- */
    + '.ss-toprow{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;align-items:center;width:100%}'
    + '.ss-pill{display:flex;align-items:center;gap:10px;text-align:left;'
    + 'font:600 15px/1.2 Nunito,system-ui,sans-serif;color:#146B5E;background:#FFF9EE;'
    + 'border:2px solid #146B5E33;border-radius:14px;padding:7px 12px;min-height:56px;cursor:pointer}'
    + '.ss-pill-col{display:flex;flex-direction:column;gap:1px;min-width:0}'
    + '.ss-pill-eyebrow{font:700 11px/1 Nunito,system-ui,sans-serif;letter-spacing:.08em;'
    + 'text-transform:uppercase;color:#7A8F8A}'
    + '.ss-pill-value{font:700 17px/1.15 Nunito,system-ui,sans-serif;color:#146B5E;overflow-wrap:anywhere}'
    + '.ss-pill-caret{display:flex;margin-left:auto;color:#146B5E}'
    + '.ss-careticon{width:16px;height:16px}'

    + '.ss-moderow{display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:center}'
    + '.ss-seg{display:flex;background:#FFF3DC;border:2px solid #146B5E22;border-radius:14px;padding:3px;gap:2px}'
    + '.ss-segbtn{display:flex;align-items:center;gap:7px;font:600 14px/1 Nunito,system-ui,sans-serif;'
    + 'color:#146B5E;background:none;border:0;border-radius:11px;padding:10px 13px;min-height:46px;cursor:pointer}'
    + '.ss-segbtn.ss-on{background:#146B5E;color:#FFFDF7}'
    + '.ss-sortbtn{display:flex;align-items:center;gap:7px;font:600 14px/1 Nunito,system-ui,sans-serif;'
    + 'color:#146B5E;background:#FFFDF7;border:2px solid #146B5E22;border-radius:14px;'
    + 'padding:10px 13px;min-height:52px;cursor:pointer}'
    + '.ss-sortbtn.ss-on{background:#146B5E;color:#FFFDF7;border-color:#146B5E}'
    /* ⚠ a locked control keeps FULL contrast — the padlock carries the meaning */
    + '.ss-sortbtn.ss-locked{border-style:dashed}'
    + '.ss-lockglyph{display:flex;color:#9A8F7E}'
    + '.ss-lockicon{width:14px;height:14px}'
    + '.ss-glyph{width:24px;height:12px;flex:0 0 auto}'
    + '.ss-seglabel{white-space:nowrap}'

    + '.ss-cue{font:500 clamp(14px,2.2vw,17px)/1.45 Nunito,system-ui,sans-serif;color:#7A6A55;'
    + 'text-align:center;margin:0;max-width:min(520px,92%)}'

    /* ---- card ---- */
    + '.ss-card{position:relative;width:fit-content;max-width:100%;min-width:min(100%,300px);margin-inline:auto;'
    + 'background:#FFFDF7;border:2px solid #146B5E26;border-radius:24px;padding:18px 20px 16px;'
    + 'box-shadow:0 2px 0 #146B5E12,0 14px 30px -16px #146B5E66;display:flex;flex-direction:column;align-items:center;gap:12px}'
    + '.ss-pic{width:min(150px,36vw);height:auto;flex:0 0 auto;user-select:none;-webkit-user-drag:none;transition:width .2s ease}'
    + '.ss-card.ss-revealed .ss-pic{width:min(96px,24vw)}'
    + '.ss-namecard-veiled{background:#FFF3DC;border:2px dashed #146B5E22;border-radius:16px;min-width:min(240px,60vw);min-height:1.1em}'
    + '.ss-namecard{font:700 clamp(34px,10vw,58px)/1.1 "Baloo 2",Nunito,system-ui,sans-serif;'
    + 'color:#3A3226;text-align:center;padding:6px 4px;overflow-wrap:anywhere}'
    + '.ss-speak{position:absolute;top:12px;right:12px;width:44px;height:44px;flex:0 0 auto;border-radius:50%;'
    + 'border:2px solid #146B5E22;background:#FFF9EE;color:#146B5E;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2}'
    /* ⚠ THE SPEAKER IS OUT OF FLOW, SO EVERYTHING UNDER IT HAS TO RESERVE
       ITS ROOM. In the landscape card the build column sits at the card's
       right edge and its hint ran straight under the speaker — "Put the
       parts back in o⏵" clipped mid-word. Nothing caught it: every
       assertion in the suite measured ONE box against a floor, and not one
       asked whether two rendered things OVERLAP. (Now one does.) */
    + '.ss-build .ss-hint,.ss-clap .ss-hint{padding-right:52px}'
    /* ⚠ AND IN LANDSCAPE, PADDING IS NOT ENOUGH. Once the card turns into a
       row the right-hand column reaches the card's right edge, so the
       speaker overlapped the BOX of both the build hint and the word row
       whatever the text inset. The out-of-flow control has to move to a
       corner nothing else occupies: bottom-left, under the picture, which
       is also where "hear this word" belongs. Found by the new collision
       assertion, which caught the word-row overlap I had not even seen. */

    + '.ss-clap{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%}'

    /* the beat lane — where taps land while the word is hidden */
    + '.ss-beatlane{display:flex;gap:10px;align-items:center;justify-content:center;min-height:30px}'
    + '.ss-beat{width:22px;height:22px;border-radius:50%;background:#F2784B;display:block;'
    + 'animation:ss-pop .22s cubic-bezier(.2,1.5,.5,1) backwards}'
    + '@keyframes ss-pop{from{transform:scale(.2);opacity:0}to{transform:scale(1);opacity:1}}'
    + '.ss-veil{height:6px}'

    /* the word + arcs */
    + '.ss-wordrow{position:relative;display:flex;justify-content:center;align-items:flex-end;'
    + 'font:700 clamp(30px,9vw,48px)/1.05 "Baloo 2",Nunito,system-ui,sans-serif;color:#3A3226;'
    + 'letter-spacing:.5px;margin-bottom:.72em;flex:0 0 auto}'
    /* No gap between syllable spans: Silbenboegen sit under a NORMALLY
       written word. Spacing them out would read as separate words and
       give the split away before the class has clapped it. */
    + '.ss-syl{padding:0}'
    + '.ss-arcs{position:absolute;left:0;pointer-events:none;overflow:visible}'
    + '.ss-arc{fill:none;stroke:#F2784B;stroke-linecap:round;'
    + 'stroke-dasharray:100;stroke-dashoffset:100;animation:ss-draw .42s ease forwards}'
    + '@keyframes ss-draw{to{stroke-dashoffset:0}}'

    /* drum */
    + '.ss-drum{background:none;border:none;cursor:pointer;padding:2px;flex:0 0 auto;line-height:0;border-radius:50%}'
    + '.ss-drumsvg{width:clamp(104px,28vw,136px);height:auto;display:block}'
    + '.ss-drum-head{transform-origin:60px 26px;transition:transform .13s ease}'
    + '.ss-drum-shadow{transition:transform .13s ease,opacity .13s ease;transform-origin:60px 97px}'
    + '.ss-drum.ss-hit .ss-drum-head{transform:translateY(3px) scaleY(.94)}'
    + '.ss-drum.ss-hit .ss-drum-shadow{transform:scaleX(.9);opacity:.24}'

    + '.ss-cardfoot{display:flex;gap:10px;align-items:center;justify-content:center}'
    + '.ss-ghostbtn{width:44px;height:44px;border-radius:50%;border:2px solid #146B5E22;background:#FFF9EE;'
    + 'color:#146B5E;cursor:pointer;display:flex;align-items:center;justify-content:center;flex:0 0 auto}'
    + '.ss-icon{width:22px;height:22px}'
    + '.ss-again{font:600 14px/1 Nunito,system-ui,sans-serif;color:#146B5E;background:#FFF3DC;border:2px solid #146B5E33;'
    + 'border-radius:999px;padding:10px 16px;min-height:44px;cursor:pointer;flex:0 0 auto}'
    + '.ss-oralnote{font:italic 500 clamp(13px,1.7vw,19px)/1.45 Nunito,system-ui,sans-serif;color:#6B5B45;text-align:center;'
    + 'margin:0;max-width:min(380px,86vw)}'

    /* loading silhouette */
    + '.ss-skel{display:flex;flex-direction:column;align-items:center;gap:14px;padding:24px 10px;opacity:.3}'
    + '.ss-skel-pic{width:120px;height:120px;border-radius:18px;background:#146B5E}'
    + '.ss-skel-word{width:170px;height:30px;border-radius:8px;background:#146B5E}'
    + '.ss-skel-drum{width:104px;height:92px;border-radius:50%;background:#F2784B}'

    /* ---- build ---- */
    + '.ss-build{display:flex;flex-direction:column;align-items:center;gap:12px}'
    + '.ss-hint{font:500 clamp(14px,2vw,17px)/1.4 Nunito,system-ui,sans-serif;color:#7A6A55;margin:0;text-align:center}'
    /* ⚠ 2px, not 8px: a correct row has to re-form ONE card. */
    + '.ss-slots{display:flex;gap:2px;flex-wrap:wrap;justify-content:center}'
    + '.ss-slot{min-width:64px;min-height:58px;border:3px dashed #146B5E44;border-radius:6px;background:#FFF6E8;'
    + 'font:700 clamp(18px,4.6vw,26px)/1 "Baloo 2",Nunito,system-ui,sans-serif;color:#3A3226;cursor:pointer;padding:6px 10px;'
    + 'box-shadow:inset 0 2px 5px #146B5E14}'
    + '.ss-slots .ss-slot:first-child{border-top-left-radius:14px;border-bottom-left-radius:14px}'
    + '.ss-slots .ss-slot:last-child{border-top-right-radius:14px;border-bottom-right-radius:14px}'
    /* ⚠ the filled slot and the tray piece are THE SAME PAPER. They used to
       be coral-bordered piece -> teal-bordered slot, which reads to a
       six-year-old as wrong -> right: a verdict delivered by palette, in a
       tool that is forbidden to deliver verdicts. They now differ in KIND
       (recessed well vs raised card), not in hue. */
    + '.ss-slot.ss-filled{border-style:solid;border-color:#146B5E33;background:#FFFDF7;box-shadow:0 1px 0 #146B5E14}'
    + '.ss-tray{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}'
    + '.ss-piece{min-height:58px;min-width:64px;border:2px solid #146B5E33;border-radius:14px;background:#FFFDF7;'
    + 'font:700 clamp(17px,4.4vw,24px)/1 "Baloo 2",Nunito,system-ui,sans-serif;color:#3A3226;cursor:pointer;padding:8px 14px;'
    + 'box-shadow:0 2px 0 #146B5E14}'
    + '.ss-piece.ss-used{background:none;border-style:dashed;border-color:#146B5E1F;box-shadow:none;cursor:default}'
    + '.ss-sealrow{width:100%;display:flex;justify-content:center}'
    + '.ss-sealarcs{width:min(320px,80%);height:16px;overflow:visible}'
    + '.ss-sealarc{stroke-width:2.6;vector-effect:non-scaling-stroke}'

    /* ---- sort ---- */
    + '.ss-sort{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%}'
    + '.ss-pens{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;width:100%}'
    /* rails and posts — the pen metaphor every locale already names, and
       NO palings: a row of countable uprights beside a clap-count label
       invites counting the wrong thing. */
    + '.ss-pen{flex:1 1 150px;min-height:130px;border:3px solid #B98C5A;border-top-width:7px;border-bottom-width:7px;'
    + 'border-radius:10px;background:#FFF9EE;padding:8px;display:flex;flex-direction:column;gap:6px}'
    + '.ss-pen.ss-over{border-color:#F2784B;background:#FFF3DC}'
    + '.ss-penlab{display:flex;flex-direction:column;align-items:center;gap:2px}'
    + '.ss-pennum{font:700 clamp(20px,3vw,26px)/1 "Baloo 2",Nunito,system-ui,sans-serif;color:#146B5E}'
    + '.ss-penmarks{display:block;line-height:0}'
    + '.ss-penarcsvg{height:10px;width:auto}'
    + '.ss-penslot{display:flex;flex-wrap:wrap;gap:5px;justify-content:center;min-height:76px;align-content:flex-start}'
    /* the pile keeps a reserved height so the board never jumps under the
       class's hands as tiles leave it */
    + '.ss-pile{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;padding:10px;'
    + 'border:2px dashed #146B5E22;border-radius:14px;width:100%;min-height:96px;align-content:flex-start}'
    + '.ss-tile{width:78px;min-height:78px;background:#FFFDF7;border:2px solid #146B5E22;border-radius:12px;'
    + 'display:flex;align-items:center;justify-content:center;padding:5px;cursor:pointer;touch-action:none}'
    + '.ss-tile.ss-picked{border-color:#F2784B;box-shadow:0 0 0 3px #F2784B44}'
    + '.ss-tilepic{width:60px;height:auto;user-select:none;-webkit-user-drag:none;pointer-events:none}'
    + '.ss-tile.ss-dragging{opacity:.35}'
    + '.ss-ghost{position:fixed;z-index:90;pointer-events:none;opacity:.92;box-shadow:0 8px 20px -8px #00000066}'

    /* ---- nav ---- */
    + '.ss-nav{display:flex;gap:14px}'
    + '.ss-navbtn{width:48px;height:48px;border-radius:50%;border:2px solid #146B5E33;background:#FFF9EE;color:#146B5E;'
    + 'cursor:pointer;display:flex;align-items:center;justify-content:center}'
    + '.ss-chev{width:22px;height:22px}'

    /* ---- the desk: IN FLOW, never a fixed modal ---- */
    + '.ss-desk{width:100%;max-width:660px;margin-inline:auto;background:#FFFDF7;border:2px solid #146B5E22;'
    + 'border-radius:20px;padding:14px}'
    + '.ss-desk-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;flex-wrap:wrap}'
    + '.ss-tabs{display:flex;gap:6px;flex-wrap:wrap}'
    + '.ss-tab{font:700 14px/1 Nunito,system-ui,sans-serif;color:#146B5E;background:#FFF9EE;border:2px solid #146B5E22;'
    + 'border-radius:999px;padding:10px 15px;min-height:44px;cursor:pointer}'
    + '.ss-tab.ss-on{background:#146B5E;color:#FFFDF7;border-color:#146B5E}'
    /* the selected tab is `disabled` (see the tab builder) — it must NOT
       therefore look greyed out, because it is the ACTIVE one */
    + '.ss-tab:disabled{cursor:default;opacity:1}'
    + '.ss-desk-close{font:600 14px/1 Nunito,system-ui,sans-serif;color:#146B5E;background:#FFF3DC;border:2px solid #146B5E33;'
    + 'border-radius:999px;padding:10px 15px;min-height:44px;cursor:pointer}'
    + '.ss-desk-body{display:flex;flex-direction:column;gap:10px}'
    + '.ss-desknote{font:500 14px/1.5 Nunito,system-ui,sans-serif;color:#7A6A55;margin:0}'
    + '.ss-desknote.ss-tiny{font-size:12.5px}'
    + '.ss-desknote.ss-warn{color:#B4552F}'
    + '.ss-ownnote{font:600 13.5px/1.5 Nunito,system-ui,sans-serif;color:#6B5B45;background:#FFF3DC;'
    + 'border-left:4px solid #F2784B;border-radius:8px;padding:9px 12px;margin:0}'
    + '.ss-ed-field{display:block}'
    + '.ss-ed-area{width:100%;box-sizing:border-box;font:500 15px/1.5 Nunito,system-ui,sans-serif;color:#3A3226;'
    + 'background:#FFF9EE;border:2px solid #146B5E33;border-radius:12px;padding:10px 12px;resize:vertical}'
    + '.ss-ed-btn{font:700 14px/1 Nunito,system-ui,sans-serif;color:#FFFDF7;background:#146B5E;border:0;'
    + 'border-radius:999px;padding:12px 18px;min-height:44px;cursor:pointer;align-self:flex-start}'
    + '.ss-ed-btn.ss-edghost{color:#146B5E;background:#FFF3DC;border:2px solid #146B5E33}'

    + '.ss-myrow{display:flex;align-items:center;gap:10px;flex-wrap:wrap;border-top:1px solid #146B5E1A;padding:10px 0}'
    + '.ss-seamrow{display:flex;align-items:center}'
    + '.ss-seamtile{font:700 22px/1 "Baloo 2",Nunito,system-ui,sans-serif;color:#3A3226;padding:0 1px}'
    /* a real board-finger target — 32x56, corrected at arm's length on a wall */
    + '.ss-seam{width:32px;height:56px;background:none;border:0;cursor:pointer;padding:0;position:relative}'
    + '.ss-seam::after{content:"";position:absolute;left:50%;top:8px;bottom:8px;width:3px;margin-left:-1.5px;'
    + 'border-radius:2px;background:#146B5E22}'
    + '.ss-seam.ss-cut::after{background:#F2784B;width:5px;margin-left:-2.5px}'
    + '.ss-mypreview{position:relative;display:flex;flex-direction:column;gap:2px;min-width:120px}'
    + '.ss-mypreview-word{font:700 20px/1.1 "Baloo 2",Nunito,system-ui,sans-serif;color:#3A3226}'
    + '.ss-myarcs{width:100%;height:13px;overflow:visible}'
    + '.ss-myarc{stroke-width:2.4;vector-effect:non-scaling-stroke;animation:none;stroke-dashoffset:0}'
    + '.ss-del{margin-left:auto;width:44px;height:44px;border-radius:50%;border:2px solid #146B5E22;'
    + 'background:#FFF9EE;color:#7A6A55;font:700 15px/1 Nunito,system-ui,sans-serif;cursor:pointer}'

    + '.ss-sec{border-top:1px solid #146B5E1A;padding:10px 0}'
    + '.ss-secrow{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;background:none;'
    + 'border:none;cursor:pointer;padding:8px 4px;min-height:44px;text-align:left}'
    + '.ss-seclabel{font:700 15px/1.3 Nunito,system-ui,sans-serif;color:#3A3226}'
    + '.ss-lock{font:600 11px/1 Nunito,system-ui,sans-serif;color:#9A8F7E;background:#F3ECDD;border-radius:999px;padding:5px 9px;white-space:nowrap}'
    + '.ss-sec.ss-locked .ss-seclabel{color:#9A8F7E}'
    + '.ss-wordgrid{display:flex;flex-wrap:wrap;gap:6px;padding:4px 4px 0}'
    + '.ss-wordchip{font:600 14px/1 Nunito,system-ui,sans-serif;color:#3A3226;background:#FFF9EE;border:2px solid #146B5E22;'
    + 'border-radius:999px;padding:9px 13px;min-height:44px;cursor:pointer}'

    /* the gate is an inline LINE on an adult surface — never a full-screen
       scrim with a price projected in front of 25 children */
    + '.ss-gate{background:#FFF3DC;border:2px solid #F2784B44;border-radius:14px;padding:14px;margin-top:6px}'
    + '.ss-gate-line{font:600 14.5px/1.5 Nunito,system-ui,sans-serif;color:#5A4B36;margin:0 0 10px}'
    + '.ss-gate-cta{display:inline-block;font:700 14px/1 Nunito,system-ui,sans-serif;color:#FFFDF7;background:#F2784B;'
    + 'border-radius:999px;padding:13px 20px;text-decoration:none;min-height:44px;box-sizing:border-box}'
    + '.ss-siblings{font:500 13px/1.5 Nunito,system-ui,sans-serif;color:#7A6A55;text-align:center;margin-top:12px;'
    + 'border-top:1px solid #146B5E1A;padding-top:10px}'
    + '.ss-sib-link{color:#146B5E;text-decoration:underline}'

    + '@media (max-width:520px){'
    + '.ss-card{padding:14px 12px 12px;border-radius:20px}'
    + '.ss-toprow{gap:8px}'
    + '.ss-pill{width:100%}'
    + '.ss-moderow{width:100%}'
    + '.ss-seg{flex:1 1 auto}'
    + '.ss-segbtn{flex:1 1 0;justify-content:center}'
    /* pens become full-width LANES: three columns at 320px is 320px of pen
       in a 304px box, and a lane is a better finger target anyway */
    + '.ss-pens{flex-direction:column}'
    + '.ss-pen{flex:1 1 auto;width:100%;min-height:0;flex-direction:row;align-items:center;gap:10px}'
    + '.ss-penlab{flex:0 0 auto;flex-direction:row;gap:6px;align-items:center}'
    + '.ss-penslot{flex:1 1 auto;justify-content:flex-start;min-height:60px}'
    + '.ss-tile{width:64px;min-height:64px}'
    + '.ss-tilepic{width:48px}'
    + '}'

    /* =====================================================================
       WIDE VIEWPORTS.
       ⚠ KEYED ON WIDTH ALONE. The shipped tiers all carried a `min-height`
       term (880 / 1080 / 1150), and a 1280x800 classroom projector — the
       commonest classroom resolution in the world — matched NEITHER the
       width nor the height and got no ramp at all: a 180px picture and a
       42px word from twelve metres. A projector is short and wide, so
       gating a ramp on HEIGHT silently excludes exactly the device this
       tool exists for. MEASURED before and after.
       ⚠ `.ss-tile` ramps WITH `.ss-tilepic`. The shipped CSS ramped the
       picture to 72px and then 84px inside a tile fixed at 74px wide —
       a 62px content box — so tiles overflowed by 10px and then 22px.
       ===================================================================== */
    /* ⭐ THE CARD TURNS LANDSCAPE ON A WIDE BOARD. Below this it is a
       column, which is right on a phone; above it, a narrow portrait strip
       floating in the middle of a projected 1920 screen wastes most of the
       board and pushes the drum toward the bottom edge. Picture on the
       left, word and drum on the right, is the shape of the instrument a
       teacher stands beside. (It is also what stops the hub thumbnail
       cropping: a portrait card cannot be framed in a landscape card
       without cutting something off, and the generator reports "ok"
       either way — measured, not guessed.) */
    + '@media (min-width:1024px){'
    +   '.ss-card{flex-direction:row;align-items:center;gap:26px;padding:22px 30px}'
    +   '.ss-speak{top:auto;bottom:16px;right:auto;left:20px}'
    +   '.ss-build .ss-hint,.ss-clap .ss-hint{padding-right:0}'
    /* ⚠ the clap column stays CONTENT-SIZED. A min-width here (I tried
       46vw) pushes the picture and the word apart by half a metre on a
       projected board — and they are the same object to a child. */
    +   '.ss-clap{width:auto;min-width:0}'
    +   '.ss-build,.ss-sort{width:100%}'
    +   '.ss-wordrow{font-size:60px;}'
    +   '.ss-namecard{font-size:64px;}'
    +   '.ss-pic{width:min(230px,36vw);}'
    +   '.ss-card.ss-revealed .ss-pic{width:min(150px,24vw);}'
    +   '.ss-drumsvg{width:168px;}'
    +   '.ss-piece,.ss-slot{font-size:30px;min-height:70px;}'
    +   '.ss-segbtn,.ss-sortbtn{font-size:16px;min-height:52px;}'
    +   '.ss-pill-value{font-size:20px;}'
    +   '.ss-navbtn{width:58px;height:58px;}'
    +   '.ss-tile{width:104px;min-height:104px;}.ss-tilepic{width:80px;}'
    +   '.ss-pennum{font-size:30px;}.ss-penarcsvg{height:13px;}'
    +   '.ss-beat{width:26px;height:26px;}'
    +   '.ss-speak,.ss-ghostbtn{width:52px;height:52px;}'
    + '}'
    + '@media (min-width:1600px){'
    +   '.ss-wordrow{font-size:78px;}'
    +   '.ss-namecard{font-size:84px;}'
    +   '.ss-pic{width:min(310px,36vw);}'
    +   '.ss-card.ss-revealed .ss-pic{width:min(196px,24vw);}'
    +   '.ss-drumsvg{width:198px;}'
    +   '.ss-piece,.ss-slot{font-size:38px;min-height:82px;}'
    +   '.ss-segbtn,.ss-sortbtn{font-size:18px;min-height:58px;}'
    +   '.ss-pill-value{font-size:24px;}.ss-pill{min-height:70px;}'
    +   '.ss-navbtn{width:68px;height:68px;}'
    +   '.ss-tile{width:132px;min-height:132px;}.ss-tilepic{width:104px;}'
    +   '.ss-pennum{font-size:38px;}.ss-penarcsvg{height:16px;}'
    +   '.ss-beat{width:32px;height:32px;}'
    +   '.ss-speak,.ss-ghostbtn{width:60px;height:60px;}'
    +   '.ss-cue{font-size:22px;}.ss-hint{font-size:22px;}.ss-oralnote{font-size:22px;max-width:min(720px,86vw);}'
    + '}'
    + '@media (min-width:2200px){'
    +   '.ss-wordrow{font-size:96px;}'
    +   '.ss-namecard{font-size:104px;}'
    +   '.ss-pic{width:min(380px,36vw);}'
    +   '.ss-card.ss-revealed .ss-pic{width:min(240px,24vw);}'
    +   '.ss-drumsvg{width:228px;}'
    +   '.ss-piece,.ss-slot{font-size:46px;min-height:96px;}'
    +   '.ss-segbtn,.ss-sortbtn{font-size:20px;min-height:64px;}'
    +   '.ss-pill-value{font-size:28px;}.ss-pill{min-height:80px;}'
    +   '.ss-navbtn{width:78px;height:78px;}'
    +   '.ss-tile{width:160px;min-height:160px;}.ss-tilepic{width:128px;}'
    +   '.ss-pennum{font-size:46px;}.ss-penarcsvg{height:19px;}'
    +   '.ss-beat{width:38px;height:38px;}'
    +   '.ss-speak,.ss-ghostbtn{width:66px;height:66px;}'
    +   '.ss-cue{font-size:26px;}.ss-hint{font-size:26px;}.ss-oralnote{font-size:26px;max-width:min(860px,86vw);}'
    + '}'

    /* ⚠ reduced motion must not leave the drum DEAD. The shipped block
       cancelled `ss-thump` and gave nothing back, so a child who prefers
       reduced motion tapped a drum that did nothing at all. The head still
       moves — a 3px translate is not vestibular motion — and the arcs and
       beats appear instantly rather than not at all. */
    + '@media (prefers-reduced-motion:reduce){'
    + '.ss-arc{animation:none;stroke-dashoffset:0}'
    + '.ss-beat{animation:none}'
    + '.ss-drum-head,.ss-drum-shadow{transition:none}'
    + '}'

    /* =====================================================================
       PRINT — a real A4 worksheet.
       ⚠ lcs-shell.css ships NO @media print block, so the shell's
       html,body{height:100%;overflow:hidden} and
       .lcs-app{max-width:720px;overflow:hidden} survive into print. The
       shipped tool reset none of them and printed a clipped 720px fragment
       of a single viewport. Undo the SHELL first, then lay out the page.
       ⚠ LINE ART ONLY — Chrome ships "Background graphics" OFF by default,
       so anything carried by a background colour photocopies blank.
       ⚠ THE ARC LANE IS EMPTY. A printed arc is the answer key.
       ===================================================================== */
    + '.ss-printsheet{display:none}'
    + '@media print{'
    + '@page{size:A4 portrait;margin:12mm}'
    + 'html,body{height:auto!important;overflow:visible!important;background:#fff!important}'
    + '.lcs-app{height:auto!important;max-width:none!important;overflow:visible!important;'
    + 'box-shadow:none!important;background:none!important;border-radius:0!important}'
    + '.lcs-header,.lcs-controls,.lcs-drawer,.lcs-drawer-scrim,.lcs-instruction{display:none!important}'
    + '.ss-toprow,.ss-cue,.ss-card,.ss-nav,.ss-desk,.ss-sort,.ss-build,.ss-siblings{display:none!important}'
    + '.ss-printsheet{display:block!important}'
    + '.ss-printsheet,.ss-printsheet *{color:#000!important}'
    + '.ss-printpage{display:grid;grid-template-columns:1fr 1fr;gap:8mm}'
    + '.ss-printcell{border:1pt solid #000;border-radius:4mm;padding:5mm 4mm;text-align:center;'
    + 'break-inside:avoid;page-break-inside:avoid;display:flex;flex-direction:column;align-items:center;gap:3mm}'
    + '.ss-printpic{width:26mm;height:auto;filter:grayscale(1)}'
    + '.ss-printword{font:700 17pt/1.1 "Baloo 2",Nunito,serif;letter-spacing:.5pt}'
    + '.ss-printlane{width:44mm;height:9mm;border-bottom:0.8pt solid #000}'
    + '}';
  document.head.appendChild(st);
}
