/* =====================================================================
   pronoun-prism-activity.js — ACTIVITY #124 of the one-by-one rebuild:
   "The Borrowed Hat" → THE PRONOUN PRISM (L.1.1.d; all 11 locales).
   Model: pronoun-prism-core.js (PronounPrismCore).
   Design: docs/activities-rebuild/designs/124-pronoun.md
   ---------------------------------------------------------------------
   Hattie's hat shop. A referent block names who the gap stands for (a
   name, two names, the star = I) with a thread to the gap. The tray holds
   wooden prisms, one per person; each prism has three faces: the DOER
   (a bow), the DONE-TO (a target) and the OWNER (a knot). Tap a prism to
   lay it in the gap; tap the round turn button to roll it to its next
   face (the word in the sentence changes as it rolls). Check fires the
   sentence's action arrow — out of the gap, into the gap — or ties the
   owner string from the thing: only the right person with the right face
   up holds it. A solved round hangs a paper hat in the shop window.
   Level 4 ties a printed pronoun to its name(s); level 5 sorts names into
   the he / she / they bins. No timer, no score. Test seams:
   window.PronounPrismActivity.st / ._pool / ._order / ._ensurePool /
   ._start / ._dims / ._render2 / ._place / ._turn / ._tie / ._pick /
   ._drop / .FAST / .OK_MS.
   ===================================================================== */
var PronounPrismActivity = {
  id: 'pronoun-prism',
  /* the drawn apparatus (the hierarchy gate): the prisms, the face marks, the gap, the thread, the arrow, the bins, the hats */
  apparatusClasses: ['vp-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {en:"The Borrowed Hat",de:"Hatties Hutladen",fr:"La boutique de Hattie",es:"La sombrerería de Hattie",pt:"A Chapelaria da Hattie",it:"La cappelleria di Hattie",nl:"Hatties hoedenwinkel",sv:"Hatties hattbutik",da:"Hatties hattebutik",no:"Hatties hattebutikk",fi:"Hattien hattukauppa"},
    instruction: {en:"Put a prism in the gap and turn it so the right face is up. Is the word doing it, getting it, or owning it?",de:"Leg ein Prisma in die Lücke und dreh es, bis die richtige Seite oben ist. Tut das Wort etwas, passiert ihm etwas, oder gehört ihm etwas?",fr:"Pose un prisme dans le trou et tourne-le pour mettre la bonne face en haut. Le mot fait-il l’action, la reçoit-il, ou possède-t-il quelque chose ?",es:"Pon un prisma en el hueco y gíralo hasta que quede arriba la cara correcta. ¿La palabra hace la acción, la recibe o tiene algo?",pt:"Coloque um prisma na lacuna e gire até a face certa ficar para cima. A palavra faz a ação, recebe a ação ou é dona de algo?",it:"Metti un prisma nello spazio e giralo finché la faccia giusta è in alto. La parola fa l’azione, la riceve o possiede qualcosa?",nl:"Leg een prisma in het gat en draai het tot de goede kant boven ligt. Doet het woord iets, overkomt het iets, of is iets van hem?",sv:"Lägg ett prisma i luckan och vrid det tills rätt sida är uppåt. Gör ordet något, händer något med det, eller äger det något?",da:"Læg et prisme i hullet, og drej det, til den rigtige side vender op. Gør ordet noget, sker der noget med det, eller ejer det noget?",no:"Legg et prisme i luka og snu det til riktig side er opp. Gjør ordet noe, skjer det noe med det, eller eier det noe?",fi:"Laita prisma aukkoon ja käännä se niin, että oikea puoli on ylhäällä. Tekeekö sana jotain, kohdistuuko tekeminen siihen vai omistaako se jotain?"},
    instrBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    t1: {en:"Which person? Which face?",de:"Welche Person? Welche Seite?",fr:"Quelle personne ? Quelle face ?",es:"¿Qué persona? ¿Qué cara?",pt:"Qual pessoa? Qual face?",it:"Quale persona? Quale faccia?",nl:"Welke persoon? Welke kant?",sv:"Vilken person? Vilken sida?",da:"Hvilken person? Hvilken side?",no:"Hvilken person? Hvilken side?",fi:"Kuka? Mikä puoli?"},
    t2: {en:"I or we? Which face?",de:"Ich oder wir? Welche Seite?",fr:"Je ou nous ? Quelle face ?",es:"¿Yo o nosotros? ¿Qué cara?",pt:"Eu ou nós? Qual face?",it:"Io o noi? Quale faccia?",nl:"Ik of wij? Welke kant?",sv:"Jag eller vi? Vilken sida?",da:"Jeg eller vi? Hvilken side?",no:"Jeg eller vi? Hvilken side?",fi:"Minä vai me? Mikä puoli?"},
    t3: {en:"Swap the name for a prism.",de:"Tausch den Namen gegen ein Prisma.",fr:"Remplace le prénom par un prisme.",es:"Cambia el nombre por un prisma.",pt:"Troque o nome por um prisma.",it:"Cambia il nome con un prisma.",nl:"Ruil de naam voor een prisma.",sv:"Byt ut namnet mot ett prisma.",da:"Byt navnet ud med et prisme.",no:"Bytt ut navnet med et prisme.",fi:"Vaihda nimi prismaan."},
    t4: {en:"Tie the word to the name it stands for.",de:"Knüpf das Wort an den Namen, für den es steht.",fr:"Attache le mot au prénom qu’il remplace.",es:"Ata la palabra al nombre que reemplaza.",pt:"Amarre a palavra ao nome que ela substitui.",it:"Lega la parola al nome che sostituisce.",nl:"Knoop het woord vast aan de naam waar het voor staat.",sv:"Knyt ordet till namnet det står för.",da:"Bind ordet til det navn, det står for.",no:"Knyt ordet til navnet det står for.",fi:"Sido sana nimeen, jonka tilalla se on."},
    t5: {en:"Sort the names: he, she or they?",de:"Sortier die Namen: er, sie oder sie?",fr:"Range les prénoms : il, elle, ils ou elles ?",es:"Ordena los nombres: ¿él, ella, ellos o ellas?",pt:"Separe os nomes: ele, ela, eles ou elas?",it:"Metti in ordine i nomi: lui, lei o loro?",nl:"Sorteer de namen: hij, zij of zij?",sv:"Sortera namnen: han, hon eller de?",da:"Sortér navnene: han, hun eller de?",no:"Sorter navnene: han, hun eller de?",fi:"Lajittele nimet: hän vai he?"},
    t6: {en:"Whose is it? Turn the owner face.",de:"Wem gehört es? Dreh die Besitzer-Seite nach oben.",fr:"À qui est-ce ? Tourne la face du propriétaire.",es:"¿De quién es? Gira la cara del dueño.",pt:"De quem é? Gire a face do dono.",it:"Di chi è? Gira la faccia del proprietario.",nl:"Van wie is het? Draai de kant van de eigenaar.",sv:"Vems är det? Vrid fram ägarsidan.",da:"Hvis er det? Drej ejersiden op.",no:"Hvem eier det? Snu eiersiden opp.",fi:"Kenen se on? Käännä omistajan puoli ylös."},
    check: {en:"Check",de:"Prüfen",fr:"Vérifier",es:"Comprobar",pt:"Verificar",it:"Controlla",nl:"Controleer",sv:"Kontrollera",da:"Tjek",no:"Sjekk",fi:"Tarkista"},
    setLevel: {en:"Jobs",de:"Aufgaben",fr:"Exercices",es:"Ejercicios",pt:"Exercícios",it:"Esercizi",nl:"Opdrachten",sv:"Övningar",da:"Øvelser",no:"Øvelser",fi:"Tehtävät"},
    l1: {en:"He · him · his",de:"er · ihn · sein",fr:"il · le · son",es:"él · lo",pt:"ele · dele",it:"lui · lo · suo",nl:"hij · hem · zijn",sv:"han · honom · hans",da:"han · ham · hans",no:"han · ham · hans",fi:"hän · hänet · hänen"},
    l2: {en:"I · me · my",de:"ich · mich · mein",fr:"je · me · mon",es:"yo · me · mi",pt:"eu · me · meu",it:"io · mi · mio",nl:"ik · mij · mijn",sv:"jag · mig · min",da:"jeg · mig · min",no:"jeg · meg · min",fi:"minä · minut · minun"},
    l3: {en:"Swap the name",de:"Namen tauschen",fr:"Remplacer le prénom",es:"Cambiar el nombre",pt:"Trocar o nome",it:"Cambiare il nome",nl:"Naam ruilen",sv:"Byt ut namnet",da:"Byt navnet ud",no:"Bytt ut navnet",fi:"Vaihda nimi"},
    l4: {en:"Who is it?",de:"Wer ist gemeint?",fr:"De qui parle-t-on ?",es:"¿De quién se habla?",pt:"De quem se fala?",it:"Di chi si parla?",nl:"Over wie gaat het?",sv:"Vem gäller det?",da:"Hvem drejer det sig om?",no:"Hvem gjelder det?",fi:"Kuka se on?"},
    l5: {en:"Sort the names",de:"Namen sortieren",fr:"Ranger les prénoms",es:"Ordenar los nombres",pt:"Separar os nomes",it:"Ordinare i nomi",nl:"Namen sorteren",sv:"Sortera namnen",da:"Sortér navnene",no:"Sorter navnene",fi:"Lajittele nimet"},
    l6: {en:"Mine · hers · theirs",de:"–",fr:"À moi · à elle · à eux",es:"Mío · de ella · de ellos",pt:"Meu · dela · deles",it:"–",nl:"–",sv:"Min · hennes · deras",da:"Min · hendes · deres",no:"Min · hennes · deres",fi:"Minun · hänen · heidän"},
    setMarks: {en:"Face marks",de:"Zeichen auf den Seiten",fr:"Signes sur les faces",es:"Signos en las caras",pt:"Sinais nas faces",it:"Segni sulle facce",nl:"Tekens op de kanten",sv:"Tecken på sidorna",da:"Tegn på siderne",no:"Tegn på sidene",fi:"Merkit puolissa"},
    marksShow: {en:"Show bow · target · knot",de:"Bogen · Zielscheibe · Knoten zeigen",fr:"Montrer arc · cible · nœud",es:"Mostrar arco · diana · nudo",pt:"Mostrar arco · alvo · nó",it:"Mostra arco · bersaglio · nodo",nl:"Boog · doelwit · knoop tonen",sv:"Visa båge · måltavla · knut",da:"Vis bue · skive · knude",no:"Vis bue · blink · knute",fi:"Näytä jousi · maalitaulu · solmu"},
    marksWords: {en:"Words only",de:"Nur Wörter",fr:"Seulement les mots",es:"Solo palabras",pt:"Só palavras",it:"Solo parole",nl:"Alleen woorden",sv:"Bara ord",da:"Kun ord",no:"Bare ord",fi:"Vain sanat"},
    hintEmpty: {en:"Put a prism in the gap. Who is it, and what is their job?",de:"Leg ein Prisma in die Lücke. Wer ist es, und was ist seine Aufgabe?",fr:"Pose un prisme dans le trou. Qui est-ce, et que fait ce mot ?",es:"Pon un prisma en el hueco. ¿Quién es y qué hace esa palabra?",pt:"Coloque um prisma na lacuna. Quem é, e o que essa palavra faz?",it:"Metti un prisma nello spazio. Chi è, e che cosa fa quella parola?",nl:"Leg een prisma in het gat. Wie is het, en wat doet het woord?",sv:"Lägg ett prisma i luckan. Vem är det, och vad gör ordet?",da:"Læg et prisme i hullet. Hvem er det, og hvad gør ordet?",no:"Legg et prisme i luka. Hvem er det, og hva gjør ordet?",fi:"Laita prisma aukkoon. Kuka se on, ja mitä sana tekee?"},
    hintTie: {en:"Tap the name the word stands for.",de:"Tipp auf den Namen, für den das Wort steht.",fr:"Touche le prénom que le mot remplace.",es:"Toca el nombre que la palabra reemplaza.",pt:"Toque no nome que a palavra substitui.",it:"Tocca il nome che la parola sostituisce.",nl:"Tik op de naam waar het woord voor staat.",sv:"Tryck på namnet som ordet står för.",da:"Tryk på det navn, ordet står for.",no:"Trykk på navnet ordet står for.",fi:"Napauta nimeä, jonka tilalla sana on."},
    hintSort: {en:"Put every name in a bin first.",de:"Leg zuerst jeden Namen in einen Korb.",fr:"Mets d’abord chaque prénom dans un bac.",es:"Primero pon cada nombre en una caja.",pt:"Primeiro coloque cada nome numa caixa.",it:"Prima metti ogni nome in una scatola.",nl:"Leg eerst elke naam in een bak.",sv:"Lägg först varje namn i en låda.",da:"Læg først hvert navn i en kasse.",no:"Legg først hvert navn i en kasse.",fi:"Laita ensin jokainen nimi laatikkoon."},
    missCount: {en:"How many people does it stand for? Count the names on the block.",de:"Für wie viele steht das Wort? Zähl die Namen auf dem Schild.",fr:"Le mot remplace combien de personnes ? Compte les prénoms sur l’étiquette.",es:"¿Cuántas personas reemplaza la palabra? Cuenta los nombres del letrero.",pt:"A palavra está no lugar de quantas pessoas? Conte os nomes na placa.",it:"Per quante persone sta la parola? Conta i nomi sul cartellino.",nl:"Voor hoeveel mensen staat het woord? Tel de namen op het bordje.",sv:"Hur många står ordet för? Räkna namnen på skylten.",da:"Hvor mange står ordet for? Tæl navnene på skiltet.",no:"Hvor mange står ordet for? Tell navnene på skiltet.",fi:"Monenko henkilön tilalla sana on? Laske nimet kyltistä."},
    missWho: {en:"Look at the block: who is it?",de:"Schau auf das Schild: Wer ist es?",fr:"Regarde l’étiquette : qui est-ce ?",es:"Mira el letrero: ¿quién es?",pt:"Olhe a placa: quem é?",it:"Guarda il cartellino: chi è?",nl:"Kijk naar het bordje: wie is het?",sv:"Titta på skylten: vem är det?",da:"Se på skiltet: hvem er det?",no:"Se på skiltet: hvem er det?",fi:"Katso kylttiä: kuka se on?"},
    missCover: {en:"Cover the other name. Read the sentence with just your word. Which face fits now?",de:"Deck den anderen Namen ab. Lies den Satz nur mit deinem Wort. Welche Seite passt jetzt?",fr:"Cache l’autre prénom. Lis la phrase avec ton mot seulement. Quelle face va maintenant ?",es:"Tapa el otro nombre. Lee la oración solo con tu palabra. ¿Qué cara va ahora?",pt:"Tape o outro nome. Leia a frase só com a sua palavra. Qual face serve agora?",it:"Copri l’altro nome. Leggi la frase solo con la tua parola. Quale faccia va bene ora?",nl:"Dek de andere naam af. Lees de zin met alleen jouw woord. Welke kant past nu?",sv:"Täck över det andra namnet. Läs meningen med bara ditt ord. Vilken sida passar nu?",da:"Dæk det andet navn. Læs sætningen med kun dit ord. Hvilken side passer nu?",no:"Dekk over det andre navnet. Les setningen med bare ditt ord. Hvilken side passer nå?",fi:"Peitä toinen nimi. Lue lause pelkällä sanallasi. Mikä puoli sopii nyt?"},
    missDoer: {en:"This word is doing the action. Turn the prism to the face with the bow.",de:"Dieses Wort tut etwas. Dreh das Prisma auf die Seite mit dem Bogen.",fr:"Ce mot fait l’action. Tourne le prisme sur la face avec l’arc.",es:"Esta palabra hace la acción. Gira el prisma a la cara con el arco.",pt:"Esta palavra faz a ação. Gire o prisma para a face com o arco.",it:"Questa parola fa l’azione. Gira il prisma sulla faccia con l’arco.",nl:"Dit woord doet iets. Draai het prisma naar de kant met de boog.",sv:"Det här ordet gör något. Vrid prismat till sidan med bågen.",da:"Dette ord gør noget. Drej prismet til siden med buen.",no:"Dette ordet gjør noe. Snu prismet til siden med buen.",fi:"Tämä sana tekee jotain. Käännä prisma puolelle, jossa on jousi."},
    missObj: {en:"The action lands on this word. Turn the prism to the face with the target.",de:"Die Handlung trifft dieses Wort. Dreh das Prisma auf die Seite mit der Zielscheibe.",fr:"L’action tombe sur ce mot. Tourne le prisme sur la face avec la cible.",es:"La acción cae sobre esta palabra. Gira el prisma a la cara con la diana.",pt:"A ação cai sobre esta palavra. Gire o prisma para a face com o alvo.",it:"L’azione cade su questa parola. Gira il prisma sulla faccia con il bersaglio.",nl:"De handeling komt bij dit woord terecht. Draai het prisma naar de kant met het doelwit.",sv:"Handlingen träffar det här ordet. Vrid prismat till sidan med måltavlan.",da:"Handlingen rammer dette ord. Drej prismet til siden med skiven.",no:"Handlingen treffer dette ordet. Snu prismet til siden med blinken.",fi:"Tekeminen kohdistuu tähän sanaan. Käännä prisma puolelle, jossa on maalitaulu."},
    missOwn: {en:"Something belongs to this person. Turn the prism to the face with the knot.",de:"Dieser Person gehört etwas. Dreh das Prisma auf die Seite mit dem Knoten.",fr:"Quelque chose appartient à cette personne. Tourne le prisme sur la face avec le nœud.",es:"Algo es de esta persona. Gira el prisma a la cara con el nudo.",pt:"Algo é dessa pessoa. Gire o prisma para a face com o nó.",it:"Qualcosa è di questa persona. Gira il prisma sulla faccia con il nodo.",nl:"Er is iets van deze persoon. Draai het prisma naar de kant met de knoop.",sv:"Något tillhör den här personen. Vrid prismat till sidan med knuten.",da:"Noget tilhører denne person. Drej prismet til siden med knuden.",no:"Noe tilhører denne personen. Snu prismet til siden med knuten.",fi:"Jokin kuuluu tälle henkilölle. Käännä prisma puolelle, jossa on solmu."},
    missAlone: {en:"Whose is it? Turn the prism to the face with the knot.",de:"Wem gehört es? Dreh das Prisma auf die Seite mit dem Knoten.",fr:"À qui est-ce ? Tourne le prisme sur la face avec le nœud.",es:"¿De quién es? Gira el prisma a la cara con el nudo.",pt:"De quem é? Gire o prisma para a face com o nó.",it:"Di chi è? Gira il prisma sulla faccia con il nodo.",nl:"Van wie is het? Draai het prisma naar de kant met de knoop.",sv:"Vems är det? Vrid prismat till sidan med knuten.",da:"Hvis er det? Drej prismet til siden med knuden.",no:"Hvem eier det? Snu prismet til siden med knuten.",fi:"Kenen se on? Käännä prisma puolelle, jossa on solmu."},
    missRings: {en:"Count the rings under the word: how many names does it need?",de:"Zähl die Ringe unter dem Wort: Wie viele Namen braucht es?",fr:"Compte les anneaux sous le mot : combien de prénoms lui faut-il ?",es:"Cuenta los aros debajo de la palabra: ¿cuántos nombres necesita?",pt:"Conte os anéis embaixo da palavra: de quantos nomes ela precisa?",it:"Conta gli anelli sotto la parola: di quanti nomi ha bisogno?",nl:"Tel de ringen onder het woord: hoeveel namen heeft het nodig?",sv:"Räkna ringarna under ordet: hur många namn behöver det?",da:"Tæl ringene under ordet: hvor mange navne skal det have?",no:"Tell ringene under ordet: hvor mange navn trenger det?",fi:"Laske sanan alla olevat renkaat: montako nimeä se tarvitsee?"},
    missTwho: {en:"Read the second sentence again. Who is it about?",de:"Lies den zweiten Satz noch einmal. Um wen geht es?",fr:"Relis la deuxième phrase. De qui parle-t-elle ?",es:"Vuelve a leer la segunda oración. ¿De quién habla?",pt:"Leia a segunda frase de novo. De quem ela fala?",it:"Rileggi la seconda frase. Di chi parla?",nl:"Lees de tweede zin nog eens. Over wie gaat het?",sv:"Läs den andra meningen igen. Vem handlar den om?",da:"Læs den anden sætning igen. Hvem handler den om?",no:"Les den andre setningen igjen. Hvem handler den om?",fi:"Lue toinen lause uudestaan. Kenestä siinä puhutaan?"},
    missSort: {en:"Some names came back. Is it one boy, one girl, or more than one?",de:"Ein paar Namen sind zurückgekommen. Ist es ein Junge, ein Mädchen oder sind es mehrere?",fr:"Des prénoms sont revenus. Est-ce un garçon, une fille, ou plusieurs ?",es:"Algunos nombres regresaron. ¿Es un niño, una niña o son varios?",pt:"Alguns nomes voltaram. É um menino, uma menina ou são vários?",it:"Alcuni nomi sono tornati indietro. È un bambino, una bambina o sono più di uno?",nl:"Een paar namen kwamen terug. Is het één jongen, één meisje, of zijn het er meer?",sv:"Några namn kom tillbaka. Är det en pojke, en flicka eller flera?",da:"Nogle navne kom tilbage. Er det en dreng, en pige eller flere?",no:"Noen navn kom tilbake. Er det en gutt, en jente eller flere?",fi:"Jotkin nimet palasivat. Tarkoittaako nimi yhtä vai useampaa?"},
    missGlow: {en:"Turn the glowing prism to the face that is shining.",de:"Dreh das leuchtende Prisma auf die Seite, die strahlt.",fr:"Tourne le prisme qui brille sur la face qui brille.",es:"Gira el prisma que brilla hasta la cara que brilla.",pt:"Gire o prisma que brilha até a face que brilha.",it:"Gira il prisma che brilla sulla faccia che brilla.",nl:"Draai het prisma dat oplicht naar de kant die oplicht.",sv:"Vrid prismat som lyser till sidan som lyser.",da:"Drej prismet, der lyser, til den side, der lyser.",no:"Snu prismet som lyser til siden som lyser.",fi:"Käännä hohtava prisma puolelle, joka hohtaa."},
    missGlowT: {en:"Tie the word to the glowing names.",de:"Knüpf das Wort an die leuchtenden Namen.",fr:"Attache le mot aux prénoms qui brillent.",es:"Ata la palabra a los nombres que brillan.",pt:"Amarre a palavra aos nomes que brilham.",it:"Lega la parola ai nomi che brillano.",nl:"Knoop het woord vast aan de namen die oplichten.",sv:"Knyt ordet till namnen som lyser.",da:"Bind ordet til de navne, der lyser.",no:"Knyt ordet til navnene som lyser.",fi:"Sido sana hohtaviin nimiin."},
    missGlowS: {en:"Put the name in the glowing bin.",de:"Leg den Namen in den leuchtenden Korb.",fr:"Mets le prénom dans le bac qui brille.",es:"Pon el nombre en la caja que brilla.",pt:"Coloque o nome na caixa que brilha.",it:"Metti il nome nella scatola che brilla.",nl:"Leg de naam in de bak die oplicht.",sv:"Lägg namnet i lådan som lyser.",da:"Læg navnet i den kasse, der lyser.",no:"Legg navnet i kassen som lyser.",fi:"Laita nimi hohtavaan laatikkoon."},
    okDoer: {en:"{s} — {W} is doing it!",de:"{s} – {W} tut es!",fr:"{s} : {W} fait l’action !",es:"{s}: ¡{W} hace la acción!",pt:"{s}: {W} faz a ação!",it:"{s}: {W} fa l’azione!",nl:"{s} – {W} doet het!",sv:"{s} – {W} gör det!",da:"{s} – {W} gør det!",no:"{s} – {W} gjør det!",fi:"{s} – {W} tekee sen!"},
    okObj: {en:"{s} — the action lands on {W}!",de:"{s} – die Handlung trifft {W}!",fr:"{s} : l’action tombe sur {W} !",es:"{s}: ¡la acción cae sobre {W}!",pt:"{s}: a ação cai sobre {W}!",it:"{s}: l’azione cade su {W}!",nl:"{s} – de handeling komt bij {W} terecht!",sv:"{s} – handlingen träffar {W}!",da:"{s} – handlingen rammer {W}!",no:"{s} – handlingen treffer {W}!",fi:"{s} – tekeminen kohdistuu sanaan {W}!"},
    okOwn: {en:"{s} — {W} tells whose it is!",de:"{s} – {W} sagt, wem es gehört!",fr:"{s} : {W} dit à qui c’est !",es:"{s}: ¡{W} dice de quién es!",pt:"{s}: {W} diz de quem é!",it:"{s}: {W} dice di chi è!",nl:"{s} – {W} zegt van wie het is!",sv:"{s} – {W} säger vems det är!",da:"{s} – {W} siger, hvis det er!",no:"{s} – {W} sier hvem det tilhører!",fi:"{s} – {W} kertoo, kenen se on!"},
    okAlone: {en:"{s} — {W} tells whose it is!",de:"{s} – {W} sagt, wem es gehört!",fr:"{s} : {W} dit à qui c’est !",es:"{s}: ¡{W} dice de quién es!",pt:"{s}: {W} diz de quem é!",it:"{s}: {W} dice di chi è!",nl:"{s} – {W} zegt van wie het is!",sv:"{s} – {W} säger vems det är!",da:"{s} – {W} siger, hvis det er!",no:"{s} – {W} sier hvem det tilhører!",fi:"{s} – {W} kertoo, kenen se on!"},
    okThread: {en:"Yes! {W} means {names}.",de:"Ja! {W} steht für {names}.",fr:"Oui ! {W}, c’est {names}.",es:"¡Sí! {W} quiere decir {names}.",pt:"Isso! {W} quer dizer {names}.",it:"Sì! {W} vuol dire {names}.",nl:"Ja! {W} staat voor {names}.",sv:"Ja! {W} står för {names}.",da:"Ja! {W} står for {names}.",no:"Ja! {W} står for {names}.",fi:"Oikein! {W} tarkoittaa: {names}."},
    okSort: {en:"Every name is in the right bin!",de:"Jeder Name liegt im richtigen Korb!",fr:"Chaque prénom est dans le bon bac !",es:"¡Cada nombre está en la caja correcta!",pt:"Cada nome está na caixa certa!",it:"Ogni nome è nella scatola giusta!",nl:"Elke naam ligt in de goede bak!",sv:"Varje namn ligger i rätt låda!",da:"Hvert navn ligger i den rigtige kasse!",no:"Hvert navn ligger i riktig kasse!",fi:"Jokainen nimi on oikeassa laatikossa!"},
    aPrism: {en:"Prism {w}",de:"Prisma {w}",fr:"Prisme {w}",es:"Prisma {w}",pt:"Prisma {w}",it:"Prisma {w}",nl:"Prisma {w}",sv:"Prisma {w}",da:"Prisme {w}",no:"Prisme {w}",fi:"Prisma {w}"},
    aSpin: {en:"Turn the prism",de:"Prisma drehen",fr:"Tourner le prisme",es:"Girar el prisma",pt:"Girar o prisma",it:"Girare il prisma",nl:"Prisma draaien",sv:"Vrid prismat",da:"Drej prismet",no:"Snu prismet",fi:"Käännä prismaa"},
    aGap: {en:"gap",de:"Lücke",fr:"trou",es:"hueco",pt:"lacuna",it:"spazio",nl:"gat",sv:"lucka",da:"hul",no:"luke",fi:"aukko"},
    aSentence: {en:"Sentence: {s}",de:"Satz: {s}",fr:"Phrase : {s}",es:"Oración: {s}",pt:"Frase: {s}",it:"Frase: {s}",nl:"Zin: {s}",sv:"Mening: {s}",da:"Sætning: {s}",no:"Setning: {s}",fi:"Lause: {s}"},
    aRef: {en:"The word stands for: {ref}",de:"Das Wort steht für: {ref}",fr:"Le mot remplace : {ref}",es:"La palabra está en lugar de: {ref}",pt:"A palavra está no lugar de: {ref}",it:"La parola sta per: {ref}",nl:"Het woord staat voor: {ref}",sv:"Ordet står för: {ref}",da:"Ordet står for: {ref}",no:"Ordet står for: {ref}",fi:"Sana on tämän tilalla: {ref}"},
    aMe: {en:"me, the one speaking",de:"ich, die Person, die spricht",fr:"moi, qui parle",es:"yo, quien habla",pt:"eu, quem fala",it:"io, chi parla",nl:"ik, degene die praat",sv:"jag, den som pratar",da:"jeg, den der taler",no:"jeg, den som snakker",fi:"minä, joka puhuu"},
    aBin: {en:"Bin {w}",de:"Korb {w}",fr:"Bac {w}",es:"Caja {w}",pt:"Caixa {w}",it:"Scatola {w}",nl:"Bak {w}",sv:"Låda {w}",da:"Kasse {w}",no:"Kasse {w}",fi:"Laatikko {w}"},
    srTied: {en:"Tied to: {names}",de:"Verknüpft mit: {names}",fr:"Attaché à : {names}",es:"Atado a: {names}",pt:"Amarrado a: {names}",it:"Legato a: {names}",nl:"Vastgeknoopt aan: {names}",sv:"Knutet till: {names}",da:"Bundet til: {names}",no:"Knyttet til: {names}",fi:"Sidottu: {names}"},
  },/*STRINGS-END*/

  defaults: { level: '1', marks: 'show' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: '1', labelKey: 'l1' }] },
    { key: 'marks', type: 'choice', labelKey: 'setMarks', options: [{ value: 'show', labelKey: 'marksShow' }, { value: 'words', labelKey: 'marksWords' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    /* the levels this locale has (de, it, nl: five — no honest stand-alone owner word) */
    var L = PronounPrismCore.levels(((api && api.lang) || 'en'));
    this.settings = [{ key: 'level', type: 'choice', labelKey: 'setLevel', options: L.map(function (v) { return { value: v, labelKey: 'l' + v }; }) }, this.settings[1]];
    if (api && api.settings && +api.settings.level > L.length) api.settings.level = '1';
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._hats = 0; this._fresh = null;
    injectPronounPrismCSS();
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
  _loc: function () { return PronounPrismCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return PronounPrismCore.levelOf(this._loc(), this._setting('level')); },
  _marks: function () { return this._setting('marks') !== 'words'; },
  _key: function () { return this._loc() + '/' + this._level(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = PronounPrismCore.rounds(); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._hats = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = PronounPrismCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var o = C.plan(this._loc(), this._level(), Math.random, fresh ? null : this._prev); this._prev = o; this._order = o.slice(); this._orderForPool = pool; if (pass > this._pass) this._hats = 0; this._pass = pass; }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'pronounprism.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t('t' + this._level()); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers(); this._fresh = null;
    this.st = PronounPrismCore.newState(this._loc(), this._level(), r);
    this._view = { note: '', ok: '', fire: null };
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
    var wrap = api.el('div', 'vp-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="vp-window" aria-hidden="true"></div><div class="vp-stage"></div><div class="vp-hand"></div><div class="vp-foot"></div><p class="vp-note" aria-live="polite"></p><p class="vp-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    var self = this;
    wrap.addEventListener('keydown', function (e) {
      if (!self.st || self.st.rd.kind !== 'prism' || self.st.placed == null) return;
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); self._turn(e.key === 'ArrowUp' ? -1 : 1); }
    });
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
  _dims: function () { var W = this._width(), B = PronounPrismCore.band(W); return { W: W, wide: B.wide, tiny: B.tiny, xs: B.xs }; },
  _svg: function () { var e = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); e.setAttribute('class', 'vp-lines vp-art'); e.setAttribute('aria-hidden', 'true'); return e; },
  _sr: function (s) { var el = this._qs('.vp-sr'); if (el) el.textContent = s; },
  /* the face marks: a bow (the action flies out), a target (the action lands), a knot (it ties to a thing) */
  _mark: function (fi, size) {
    size = size || 22;
    if (fi === 0) return '<svg class="vp-art vp-mk" viewBox="0 0 24 24" width="' + size + '" height="' + size + '" aria-hidden="true"><path d="M7 3 Q19 12 7 21" fill="none" stroke="#8C5A2B" stroke-width="2.6" stroke-linecap="round"/><path d="M7 3 V21" stroke="#3A2A1C" stroke-width="1.4"/><path d="M4 12 H21 M17.5 9.2 L21 12 L17.5 14.8" fill="none" stroke="#C8503A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    if (fi === 1) return '<svg class="vp-art vp-mk" viewBox="0 0 24 24" width="' + size + '" height="' + size + '" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#FFF" stroke="#C8503A" stroke-width="2.4"/><circle cx="12" cy="12" r="6" fill="#FFF" stroke="#C8503A" stroke-width="2.4"/><circle cx="12" cy="12" r="2.4" fill="#C8503A"/></svg>';
    return '<svg class="vp-art vp-mk" viewBox="0 0 24 24" width="' + size + '" height="' + size + '" aria-hidden="true"><path d="M3 15 C8 15 9 6 13 6 C17 6 17 12 13 13 C9 14 10 19 14 19 C17 19 18 16 21 16" fill="none" stroke="#2E8C7E" stroke-width="2.6" stroke-linecap="round"/></svg>';
  },
  _star: function (size) { return '<svg class="vp-art vp-star" viewBox="0 0 64 64" width="' + size + '" height="' + size + '" aria-hidden="true"><circle cx="32" cy="32" r="29" fill="#FFF3C4" opacity=".75"/><path d="M32 7l7.3 15.2 16.7 2.1-12.3 11.5 3.2 16.6L32 44.3l-14.9 8.1 3.2-16.6L8 24.3l16.7-2.1z" fill="#F4CF62" stroke="#B8862A" stroke-width="3" stroke-linejoin="round"/></svg>'; },
  /* the referent block's face: the star for I, the star + a name for we */
  _refHtml: function (ref, size) {
    var m = /^★(?: \+ (.+))?$/.exec(ref);
    if (!m) return '<span class="vp-rname">' + esc(ref) + '</span>';
    return this._star(size) + (m[1] ? '<span class="vp-rplus">+</span><span class="vp-rname">' + esc(m[1]) + '</span>' : '');
  },
  _refLabel: function (ref) { var m = /^★(?: \+ (.+))?$/.exec(ref); return m ? this._t('aMe') + (m[1] ? ' + ' + m[1] : '') : ref; },
  /* a word sized to its prism */
  _fit: function (w, room, base) { var n = Math.max(1, String(w).length); return Math.max(14, Math.min(base, Math.floor(room / (n * 0.56)))); },

  _paint_: function () {
    var st = this.st, D = this._dims();
    this._wrap.className = 'vp-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.tiny ? ' is-tiny' : '') + (D.xs ? ' is-xs' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + (this._marks() ? '' : ' no-marks') + ' k-' + st.rd.kind;
    /* the shop window: one paper hat for every solved round of this pass */
    var win = this._qs('.vp-window'), h = '';
    for (var i = 0; i < 9; i++) h += '<span class="vp-hat' + (i < this._hats ? ' on c' + (i % 4) : '') + (this._fresh === 'ok' && i === this._hats - 1 ? ' is-new' : '') + '"><i class="vp-art"></i></span>';
    win.innerHTML = h;
    if (st.rd.kind === 'prism') this._paintPrism(D); else if (st.rd.kind === 'thread') this._paintThread(D); else this._paintSort(D);
    var foot = this._qs('.vp-foot'), self = this; foot.innerHTML = '';
    var chk = this._btn('vp-check', 'check', null, '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + esc(this._t('check')) + '</span>');
    chk.disabled = st.done; chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.vp-note'), v = this._view;
    if (v.ok) { note.textContent = v.ok; note.className = 'vp-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'vp-note is-hint'; }
    else { note.textContent = ''; note.className = 'vp-note'; }
    this._drawLines();
    this._fresh = null;
  },

  /* ---- prism levels ---- */
  _paintPrism: function (D) {
    var C = PronounPrismCore, st = this.st, rd = st.rd, self = this, glow = C.glow(st), fire = this._view.fire, reason = st.last === 'miss' ? st.reason : null;
    var stage = this._qs('.vp-stage'); stage.innerHTML = '';
    var top = this._el('div', 'vp-top');
    var ref = this._el('div', 'vp-ref vp-art' + (reason === 'count' || reason === 'who' ? ' is-ping' : ''), this._refHtml(rd.ref, D.wide ? 40 : 30));
    ref.setAttribute('role', 'img'); ref.setAttribute('aria-label', this._t('aRef', { ref: this._refLabel(rd.ref) }));
    top.appendChild(ref);
    if (rd.orig) {
      /* level 3: the sentence with the name, the name marked — it is what the prism will stand for */
      var nm = /^★/.test(rd.ref) ? null : rd.ref, o = rd.orig, j = nm ? o.toLowerCase().indexOf(nm.toLowerCase()) : -1;
      var orig = this._el('p', 'vp-orig', j >= 0 ? esc(o.slice(0, j)) + '<b class="vp-oname">' + esc(o.slice(j, j + nm.length)) + '</b>' + esc(o.slice(j + nm.length)) : esc(o));
      top.appendChild(orig);
    }
    stage.appendChild(top);
    /* the sentence strip */
    var strip = this._el('div', 'vp-strip'), words = this._el('span', 'vp-words'), gw = C.gapWord(st);
    strip.setAttribute('aria-label', this._t('aSentence', { s: gw ? C.filled(rd, gw) : C.filled(rd, this._t('aGap')) }));
    rd.tokens.forEach(function (k) {
      if (k.t === 'p') {
        if (st.placed == null) { words.appendChild(self._el('span', 'vp-gap vp-art' + (glow ? ' is-glow' : ''), '')); return; }
        var fi = st.face[st.placed], g = self._el('span', 'vp-gapbox vp-art' + (st.done ? ' is-ok' : fire && !fire.ok ? ' is-bad' : '') + (self._fresh === 'roll' ? ' is-roll' : ''));
        var b = self._btn('vp-gw', 'gap', self._t('aPrism', { w: gw }), (self._marks() ? self._mark(fi, D.wide ? 22 : 18) : '') + '<span>' + esc(gw) + '</span>');
        b.disabled = st.done; b.addEventListener('click', function () { self._takeOut(); });
        g.appendChild(b);
        if (!st.done) { var tb = self._btn('vp-turn', 'turn', self._t('aSpin'), '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M19 12a7 7 0 1 1-2.1-5" fill="none" stroke="#FFF" stroke-width="2.8" stroke-linecap="round"/><path d="M19.5 3.5V8h-4.5" fill="none" stroke="#FFF" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'); tb.addEventListener('click', function () { self._turn(1); }); g.appendChild(tb); }
        words.appendChild(g); return;
      }
      if (k.t === 'verb') { words.appendChild(self._el('span', 'vp-verb', esc(k.s))); return; }
      if (k.t === 'thing') { words.appendChild(self._el('span', 'vp-thing', esc(k.s))); return; }
      /* the compound partner: on a "cover" miss it lifts away, leaving the word alone */
      var s = k.s, ci = rd.comp ? s.indexOf(rd.comp) : -1;
      if (ci >= 0) { words.appendChild(document.createTextNode(s.slice(0, ci))); words.appendChild(self._el('span', 'vp-comp' + (reason === 'cover' ? ' is-lift' : ''), esc(s.slice(ci, ci + rd.comp.length) + s.slice(ci + rd.comp.length).replace(/^(\s*\S+\s*).*$/, '$1')))); words.appendChild(document.createTextNode(s.slice(ci + rd.comp.length).replace(/^\s*\S+\s*/, ''))); return; }
      words.appendChild(document.createTextNode(s));
    });
    strip.appendChild(words);
    stage.appendChild(strip);
    stage.appendChild(this._svg());
    /* the tray of prisms */
    var hand = this._qs('.vp-hand'); hand.innerHTML = ''; hand.className = 'vp-hand vp-tray';
    var room = D.wide ? 132 : D.xs ? 66 : 74;
    rd.tray.forEach(function (p) {
      var fi = st.face[p], f = [0, 1, 2].map(function (x) { return C.faceWord(rd, p, x); }), up = f[fi], on = st.placed === p;
      var body = '<span class="vp-side vp-sup">' + esc(f[(fi + 2) % 3]) + '</span>'
        + '<span class="vp-face">' + (self._marks() ? self._mark(fi, D.wide ? 22 : 16) : '') + '<b style="font-size:' + self._fit(up, room, D.wide ? 34 : 26) + 'px">' + esc(up) + '</b></span>'
        + '<span class="vp-side vp-sdown">' + esc(f[(fi + 1) % 3]) + '</span>';
      var bt = self._btn('vp-prism vp-art' + (on ? ' is-in' : '') + (glow && p === rd.person ? ' is-glow' : ''), 'prism-' + p, self._t('aPrism', { w: up }), body);
      bt.disabled = st.done; bt.setAttribute('aria-pressed', on ? 'true' : 'false');
      bt.addEventListener('click', function () { self._place(p); });
      hand.appendChild(bt);
    });
    /* miss 2: the glowing prism wears the mark of the face it must show, on its own corner */
    if (glow && this._marks()) { var gp = hand.querySelector('[data-k="prism-' + rd.person + '"]'); if (gp) { var want = this._el('span', 'vp-want', this._mark(rd.ji, D.wide ? 24 : 20)); want.setAttribute('aria-hidden', 'true'); gp.appendChild(want); } }
  },

  /* ---- thread level ---- */
  _paintThread: function (D) {
    var C = PronounPrismCore, st = this.st, rd = st.rd, self = this, glow = C.glow(st);
    var stage = this._qs('.vp-stage'); stage.innerHTML = '';
    var s1 = this._el('p', 'vp-s1'), ni = 0;
    rd.s1.forEach(function (k) {
      if (k.t !== 'name') { s1.appendChild(document.createTextNode(k.s)); return; }
      var tied = st.tied.indexOf(k.s) >= 0, b = self._btn('vp-name vp-art' + (tied ? ' is-tied' : '') + (glow && rd.ans.indexOf(k.s) >= 0 ? ' is-glow' : ''), 'name-' + (ni++), k.s, esc(k.s));
      b.disabled = st.done; b.setAttribute('aria-pressed', tied ? 'true' : 'false'); b.setAttribute('data-name', k.s);
      b.addEventListener('click', function () { self._tie(k.s); });
      s1.appendChild(b);
    });
    var s2 = this._el('p', 'vp-s2');
    rd.s2.forEach(function (k) {
      if (k.t !== 'pro') { s2.appendChild(document.createTextNode(k.s)); return; }
      var rings = ''; for (var i = 0; i < rd.rings; i++) rings += '<i class="vp-ring' + (i < st.tied.length ? ' on' : '') + '"></i>';
      s2.appendChild(self._el('span', 'vp-pro vp-art' + (st.done ? ' is-ok' : ''), '<b>' + esc(k.s) + '</b><span class="vp-rings">' + rings + '</span>'));
    });
    stage.appendChild(s1); stage.appendChild(s2);
    stage.appendChild(this._svg());
    var hand = this._qs('.vp-hand'); hand.innerHTML = ''; hand.className = 'vp-hand';
  },

  /* ---- sort level ---- */
  _paintSort: function (D) {
    var C = PronounPrismCore, st = this.st, rd = st.rd, self = this, glow = C.glow(st);
    var stage = this._qs('.vp-stage'); stage.innerHTML = '';
    var shelf = this._el('div', 'vp-cards');
    rd.cards.forEach(function (c, i) {
      if (st.at[i] != null) return;
      var b = self._btn('vp-card' + (st.sel === i ? ' is-sel' : '') + (st.bounced && st.bounced.indexOf(i) >= 0 && self._fresh === 'miss' ? ' is-back' : ''), 'card-' + i, c.n, esc(c.n));
      b.disabled = st.done; b.addEventListener('click', function () { self._pick(i); });
      shelf.appendChild(b);
    });
    if (!shelf.children.length) shelf.appendChild(this._el('span', 'vp-shelfempty', ''));
    stage.appendChild(shelf);
    var hand = this._qs('.vp-hand'); hand.innerHTML = ''; hand.className = 'vp-hand vp-bins';
    rd.bins.forEach(function (bn) {
      var box = self._el('div', 'vp-bin vp-art' + (glow && st.sel != null && rd.cards[st.sel].b === bn.b ? ' is-glow' : ''));
      var rings = ''; for (var k = 0; k < bn.rings; k++) rings += '<i class="vp-ring on"></i>';
      var head = self._btn('vp-binhead', 'bin-' + bn.b, self._t('aBin', { w: bn.label }), '<b>' + esc(bn.label) + '</b><span class="vp-rings">' + rings + '</span>');
      head.disabled = st.done || st.sel == null; head.addEventListener('click', function () { self._drop(bn.b); });
      box.appendChild(head);
      var inside = self._el('div', 'vp-binin');
      rd.cards.forEach(function (c, i) {
        if (st.at[i] !== bn.b) return;
        var b = self._btn('vp-card is-in' + (st.done ? ' is-ok' : ''), 'card-' + i, c.n, esc(c.n));
        b.disabled = st.done; b.addEventListener('click', function () { self._pick(i); });
        inside.appendChild(b);
      });
      box.appendChild(inside);
      hand.appendChild(box);
    });
  },

  /* the lines over the stage: the referent thread, the action arrow / owner string, the pronoun's threads */
  _drawLines: function () {
    var svg = this._qs('.vp-lines'); if (!svg) return;
    var st = this.st, rd = st.rd, stage = this._qs('.vp-stage'), S = stage.getBoundingClientRect();
    if (S.width < 10) return;
    svg.setAttribute('viewBox', '0 0 ' + Math.round(S.width) + ' ' + Math.round(S.height)); svg.setAttribute('width', Math.round(S.width)); svg.setAttribute('height', Math.round(S.height));
    var at = function (el, where) { var q = el.getBoundingClientRect(); return { x: q.left - S.left + q.width / 2, y: where === 'top' ? q.top - S.top : where === 'bottom' ? q.bottom - S.top : q.top - S.top + q.height / 2, w: q.width, h: q.height }; };
    var out = '';
    if (rd.kind === 'prism') {
      /* the thread starts at the referent — on level 3 at the name marked in the sentence above */
      var ref = this._qs('.vp-oname') || this._qs('.vp-ref'), gap = this._qs('.vp-gap,.vp-gapbox');
      if (ref && gap) { var a = at(ref, 'bottom'), b = at(gap, 'top'); b.y = this._qs('.vp-strip').getBoundingClientRect().top - S.top + 1; out += '<path class="vp-thread" d="M' + a.x + ' ' + a.y + ' C' + a.x + ' ' + (a.y + 30) + ' ' + b.x + ' ' + (b.y - 30) + ' ' + b.x + ' ' + (b.y + 2) + '"/>'; }
      var f = this._view.fire;
      if (f && gap) {
        var from = rd.ji === 2 ? this._qs('.vp-thing') : this._qs('.vp-verb');
        if (from) {
          /* the arrow / string arcs UNDER the sentence (the referent thread comes from above): from the gap to the verb (the doer launches it), from the verb into the gap (it lands), from the thing to the gap (it ties) */
          var sb = this._qs('.vp-strip').getBoundingClientRect().bottom - S.top, p = at(from, 'bottom'), q = at(gap, 'bottom'), own = rd.ji === 2; p.y = q.y = sb;
          var A = rd.ji === 0 ? q : p, B = rd.ji === 0 ? p : q, span = Math.abs(B.x - A.x);
          var mx = (A.x + B.x) / 2, my = Math.max(A.y, B.y) + Math.max(26, Math.min(40, span * 0.35));
          var cls = own ? 'vp-string' : 'vp-arrow', ok = f.ok;
          if (ok) out += '<path class="' + cls + ' is-ok" d="M' + A.x + ' ' + (A.y + 2) + ' Q' + mx + ' ' + my + ' ' + B.x + ' ' + (B.y + 2) + '"/>' + (own ? '<circle class="vp-knot" cx="' + B.x + '" cy="' + (B.y + 3) + '" r="6"/>' : '<path class="vp-head is-ok" d="M' + (B.x - 9) + ' ' + (B.y + 13) + ' L' + B.x + ' ' + (B.y + 2) + ' L' + (B.x + 9) + ' ' + (B.y + 13) + '"/>');
          /* a miss: the arrow / string gets two-thirds of the way and drops */
          else { var ex = A.x + (B.x - A.x) * 0.66, ey = my - 6; out += '<path class="' + cls + ' is-bad" d="M' + A.x + ' ' + (A.y + 2) + ' Q' + (A.x + ex) / 2 + ' ' + (my + 4) + ' ' + ex + ' ' + ey + ' L' + (ex + (B.x > A.x ? 6 : -6)) + ' ' + (ey + 16) + '"/>'; }
        }
      }
    } else if (rd.kind === 'thread') {
      var pro = this._qs('.vp-pro');
      if (pro) st.tied.forEach(function (nm) {
        var el = stage.querySelector('.vp-name[data-name="' + nm.replace(/"/g, '\\"') + '"]'); if (!el) return;
        var a2 = at(pro, 'top'), b2 = at(el, 'bottom');
        out += '<path class="vp-thread is-tie' + (st.done ? ' is-ok' : '') + '" d="M' + a2.x + ' ' + a2.y + ' C' + a2.x + ' ' + (a2.y - 24) + ' ' + b2.x + ' ' + (b2.y + 24) + ' ' + b2.x + ' ' + b2.y + '"/><circle class="vp-knot" cx="' + b2.x + '" cy="' + b2.y + '" r="5"/>';
      });
    }
    svg.innerHTML = out;
  },

  /* ---------------- the hand ---------------- */
  _moved: function () { this._clearTimers(); this._view.note = ''; this._view.ok = ''; this._view.fire = null; },
  _place: function (p) { var r = PronounPrismCore.place(this.st, p); if (r === 'no') return; this._moved(); this.api.sound(r === 'in' ? 520 : 320); this._paint(); },
  _takeOut: function () { if (PronounPrismCore.takeOut(this.st) === 'no') return; this._moved(); this.api.sound(320); this._paint(); },
  /* roll the prism in the gap one face (tock) */
  _turn: function (dir) {
    var st = this.st; if (st.placed == null || st.done) return;
    PronounPrismCore.spin(st, st.placed, dir); this._moved(); this._fresh = 'roll';
    this.api.sound(440); this._paint(); this._sr(PronounPrismCore.gapWord(st));
  },
  _tie: function (nm) { var r = PronounPrismCore.tie(this.st, nm); if (r === 'no') return; this._moved(); this.api.sound(r === 'tied' ? 600 : 320); this._paint(); var rd = this.st.rd; this._sr(this._t('srTied', { names: this.st.tied.map(function (n) { var i = rd.ans.indexOf(n); return i >= 0 ? rd.shown[i] : n; }).join(', ') })); },
  _pick: function (i) { var r = PronounPrismCore.pick(this.st, i); if (r === 'no') return; this._moved(); this.api.sound(r === 'back' ? 320 : 480); this._paint(); },
  _drop: function (b) { var r = PronounPrismCore.drop(this.st, b); if (r === 'no') return; this._moved(); this.api.sound(560); this._paint(); },
  _check: function () {
    var C = PronounPrismCore, st = this.st, v = this._view; if (st.done) return;
    this._clearTimers();
    var res = C.check(st);
    if (res.result === 'ok') { this._success(); return; }
    v.ok = ''; v.note = this._t(C.hint(st)); v.fire = res.result === 'miss' && st.rd.kind === 'prism' ? { ok: false } : null; this._fresh = res.result === 'miss' ? 'miss' : null;
    this.api.sound(res.result === 'empty' ? 400 : 220); this._paint(); this.api.announce(v.note);
  },
  _success: function () {
    var C = PronounPrismCore, st = this.st, rd = st.rd, v = this._view, loc = this._loc(), msg;
    if (rd.kind === 'prism') { var w = C.gapWord(st); msg = this._t(C.okKey(rd), { s: C.filled(rd, w).replace(/[.!]$/, ''), W: w.toLocaleUpperCase(loc) }); v.fire = { ok: true }; }
    else if (rd.kind === 'thread') msg = this._t('okThread', { W: rd.pro.toLocaleUpperCase(loc), names: rd.shown.join(' + ') });
    else msg = this._t('okSort');
    v.note = ''; v.ok = msg; this._hats = Math.min(9, this._hats + 1); this._fresh = 'ok';
    this.api.sound(988); this._paint(); this.api.announce(msg);
    if (rd.kind === 'prism' && typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'word', text: C.filled(rd, C.gapWord(st)), lang: this.api.lang, rate: 0.9 }); } catch (e) {} }
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectPronounPrismCSS() {
  if (typeof document === 'undefined' || document.getElementById('vp-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B', WOOD = '#C99A62';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.vp-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:12px;user-select:none;-webkit-user-select:none;} .vp-wrap:focus{outline:none;}'
  /* the shop window */
  + '.vp-window{display:flex;justify-content:center;gap:8px;height:30px;align-items:flex-end;padding:0 10px 4px;border-bottom:6px solid ' + WOOD + ';border-radius:2px;}'
  + '.vp-hat{display:block;width:24px;height:22px;} .vp-hat i{display:block;width:100%;height:100%;clip-path:polygon(50% 0,100% 100%,0 100%);background:#E8DCC6;opacity:.6;}'
  + '.vp-hat.on i{opacity:1;} .vp-hat.c0 i{background:#F2784B;} .vp-hat.c1 i{background:#2E8C7E;} .vp-hat.c2 i{background:#F4CF62;} .vp-hat.c3 i{background:#7E9BD8;} .vp-hat.is-new i{animation:vpHat .5s ease-out;transform-origin:bottom center;} @keyframes vpHat{0%{transform:translateY(-30px) rotate(-30deg);opacity:.2;}}'
  /* the stage */
  + '.vp-stage{position:relative;display:flex;flex-direction:column;align-items:center;gap:18px;padding:14px 10px 18px;border-radius:14px;background:#FBF3E4;box-shadow:inset 0 0 0 3px #E2CFAE;}'
  + '.vp-wrap.k-prism .vp-stage{padding-bottom:50px;} .vp-wrap.is-narrow.k-prism .vp-stage{padding-bottom:44px;}'
  + '.vp-lines{position:absolute;left:0;top:0;z-index:2;pointer-events:none;overflow:visible;}'
  + '.vp-top{display:flex;flex-direction:column;align-items:center;gap:8px;}'
  + '.vp-ref{position:relative;z-index:1;display:inline-flex;align-items:center;gap:6px;min-height:52px;padding:4px 16px;border-radius:12px;background:#FFFDF4;box-shadow:inset 0 0 0 3px #D9C29A,0 4px 0 #D9C29A;font-family:' + H + ';font-weight:800;font-size:28px;color:' + INK + ';}'
  + '.vp-ref.is-ping{animation:vpPing .8s ease-out;} @keyframes vpPing{30%{box-shadow:inset 0 0 0 3px #F2784B,0 0 0 8px rgba(242,120,75,.25),0 4px 0 #D9C29A;}}'
  + '.vp-rplus{color:#9C7A4A;} .vp-orig{margin:0;font-family:' + B + ';font-weight:700;font-size:20px;color:#7A6A55;text-align:center;} .vp-oname{padding:0 4px;border-radius:6px;background:#FDE8DD;color:#B04A26;}'
  + '.vp-strip{position:relative;z-index:1;width:100%;display:flex;justify-content:center;padding:10px 12px;border-radius:12px;background:#FFF;box-shadow:inset 0 0 0 3px #D9C29A,0 4px 0 #D9C29A;box-sizing:border-box;}'
  + '.vp-words{font-family:' + H + ';font-weight:800;font-size:30px;line-height:1.7;color:' + INK + ';text-align:center;overflow-wrap:break-word;}'
  + '.vp-verb{text-decoration:underline;text-decoration-thickness:3px;text-underline-offset:6px;text-decoration-color:#C8503A;} .vp-thing{text-decoration:underline dotted;text-decoration-thickness:3px;text-underline-offset:6px;text-decoration-color:#2E8C7E;}'
  + '.vp-comp{display:inline-block;transition:transform .3s,opacity .3s;} .vp-comp.is-lift{transform:translateY(-18px);opacity:.25;}'
  + '.vp-gap{display:inline-block;vertical-align:middle;width:92px;height:44px;margin:0 4px;border-radius:8px;border:3px dashed #B98A55;box-sizing:border-box;background:#FBF3E4;} .vp-gap.is-glow{border-color:#2E8C7E;}'
  + '.vp-gapbox{display:inline-flex;vertical-align:middle;align-items:center;gap:4px;margin:0 4px;padding:2px;border-radius:10px;background:#F3E2C4;box-shadow:inset 0 0 0 3px #B98A55;} .vp-gapbox.is-ok{background:#DDF1EC;box-shadow:inset 0 0 0 3px #2E8C7E;} .vp-gapbox.is-bad{box-shadow:inset 0 0 0 3px #F2784B;}'
  + '.vp-gapbox.is-roll .vp-gw span{animation:vpRoll .2s ease-out;} @keyframes vpRoll{0%{transform:translateY(-60%);opacity:0;}}'
  + '.vp-gw{display:inline-flex;align-items:center;gap:4px;min-height:44px;min-width:44px;padding:0 8px;border:0;background:none;font:inherit;color:#B04A26;cursor:pointer;} .vp-gapbox.is-ok .vp-gw{color:#146B5E;cursor:default;}'
  + '.vp-turn{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border:0;border-radius:50%;background:#7A5638;box-shadow:0 3px 0 #4A321F;cursor:pointer;}'
  /* the tray */
  + '.vp-tray{position:relative;display:flex;justify-content:center;align-items:flex-end;gap:14px;flex-wrap:nowrap;}'
  + '.vp-prism{position:relative;display:flex;flex-direction:column;align-items:stretch;width:150px;padding:0;border:0;border-radius:10px;background:none;cursor:pointer;filter:drop-shadow(0 4px 0 #8C6239);}'
  + '.vp-side{display:block;height:24px;line-height:24px;font-family:' + B + ';font-weight:800;font-size:15px;color:#6E5232;text-align:center;overflow:hidden;white-space:nowrap;text-overflow:clip;}'
  + '.vp-sup{background:#E0BE8A;clip-path:polygon(10% 0,90% 0,100% 100%,0 100%);border-radius:6px 6px 0 0;} .vp-sdown{background:#B98A55;color:#FFF3DD;clip-path:polygon(0 0,100% 0,90% 100%,10% 100%);border-radius:0 0 6px 6px;}'
  + '.vp-face{display:flex;align-items:center;justify-content:center;gap:4px;height:62px;background:#F1D6A6;box-shadow:inset 0 0 0 3px #8C6239;} .vp-face b{font-family:' + H + ';font-weight:800;color:' + INK + ';white-space:nowrap;}'
  + '.vp-prism.is-in{opacity:.45;} .vp-prism:disabled{cursor:default;}'
  + '.vp-prism.is-glow{filter:drop-shadow(0 4px 0 #1B5F55) drop-shadow(0 0 8px rgba(46,140,126,.6));transform:translateY(-6px);} .vp-prism.is-glow .vp-face{box-shadow:inset 0 0 0 3px #2E8C7E;}'
  + '.vp-want{position:absolute;top:-12px;right:-10px;z-index:2;padding:2px;border-radius:50%;background:#DDF1EC;box-shadow:0 0 0 3px #2E8C7E;animation:vpPulse 1.2s ease-in-out infinite;} @keyframes vpPulse{50%{transform:scale(1.12);}}'
  + '.vp-wrap.no-marks .vp-mk{display:none;}'
  /* threads, arrows */
  + '.vp-thread{fill:none;stroke:#9C7A4A;stroke-width:2;stroke-dasharray:4 4;} .vp-thread.is-tie{stroke:#7A5638;stroke-width:2.6;stroke-dasharray:none;} .vp-thread.is-ok{stroke:#2E8C7E;}'
  + '.vp-arrow{fill:none;stroke-width:4;stroke-linecap:round;} .vp-arrow.is-ok,.vp-head.is-ok{stroke:#2E8C7E;fill:none;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;} .vp-arrow.is-bad,.vp-string.is-bad{stroke:#F2784B;stroke-dasharray:6 6;fill:none;stroke-width:4;stroke-linecap:round;}'
  + '.vp-string{fill:none;stroke-width:3;} .vp-string.is-ok{stroke:#2E8C7E;} .vp-knot{fill:#2E8C7E;}'
  /* thread level */
  + '.vp-s1,.vp-s2{position:relative;z-index:1;margin:0;font-family:' + H + ';font-weight:800;font-size:28px;line-height:1.8;color:' + INK + ';text-align:center;}'
  + '.vp-s2{margin-top:26px;}'
  + '.vp-name{display:inline-block;min-height:44px;min-width:44px;margin:0 3px;padding:0 10px;border:0;border-radius:10px;background:#FFFDF4;box-shadow:inset 0 0 0 3px #D9C29A,0 3px 0 #D9C29A;font:inherit;color:' + INK + ';cursor:pointer;} .vp-name.is-tied{background:#F3E2C4;box-shadow:inset 0 0 0 3px #7A5638,0 3px 0 #7A5638;} .vp-name.is-glow{box-shadow:inset 0 0 0 3px #2E8C7E,0 0 0 4px rgba(46,140,126,.3);}'
  + '.vp-pro{display:inline-flex;flex-direction:column;align-items:center;vertical-align:top;margin:0 3px;padding:0 10px;border-radius:10px;background:#FDE8DD;color:#B04A26;line-height:1.5;} .vp-pro.is-ok{background:#DDF1EC;color:#146B5E;}'
  + '.vp-rings{display:flex;gap:6px;justify-content:center;height:16px;} .vp-ring{display:block;width:12px;height:12px;border-radius:50%;box-shadow:inset 0 0 0 3px #B8862A;} .vp-ring.on{background:#F4CF62;}'
  /* sort level */
  + '.vp-cards{display:flex;justify-content:center;flex-wrap:wrap;gap:12px;min-height:56px;}'
  + '.vp-card{min-height:52px;min-width:64px;padding:4px 16px;border:0;border-radius:10px;background:#FFFDF4;box-shadow:inset 0 0 0 3px #D9C29A,0 4px 0 #D9C29A;font-family:' + H + ';font-weight:800;font-size:24px;color:' + INK + ';cursor:pointer;}'
  + '.vp-card.is-sel{box-shadow:inset 0 0 0 3px #7A5638,0 4px 0 #7A5638;background:#F3E2C4;transform:translateY(-4px);} .vp-card.is-back{animation:vpBack .5s ease-out;} @keyframes vpBack{0%{transform:translateY(60px);opacity:.3;}}'
  + '.vp-card.is-in{min-height:44px;font-size:19px;line-height:1.15;padding:4px 6px;white-space:normal;overflow-wrap:anywhere;hyphens:auto;} .vp-card.is-ok{box-shadow:inset 0 0 0 3px #2E8C7E;}'
  + '.vp-shelfempty{display:block;height:52px;}'
  + '.vp-bins{display:flex;justify-content:center;gap:12px;}'
  + '.vp-bin{flex:1 1 0;max-width:200px;min-width:0;display:flex;flex-direction:column;gap:6px;padding:6px;border-radius:12px;background:#F1D6A6;box-shadow:inset 0 0 0 3px #8C6239;} .vp-bin.is-glow{box-shadow:inset 0 0 0 3px #2E8C7E,0 0 0 5px rgba(46,140,126,.3);}'
  + '.vp-binhead{display:flex;flex-direction:column;align-items:center;min-height:56px;padding:4px;border:0;border-radius:8px;background:#FFF8E8;font-family:' + H + ';font-weight:800;font-size:22px;color:' + INK + ';cursor:pointer;} .vp-binhead:disabled{cursor:default;}'
  + '.vp-binin{display:flex;flex-direction:column;align-items:stretch;gap:6px;min-height:56px;}'
  + '.vp-foot{display:flex;justify-content:center;} .vp-check{display:inline-flex;align-items:center;gap:8px;min-width:150px;min-height:54px;padding:8px 26px;border:0;border-radius:16px;background:#146B5E;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;box-shadow:0 4px 0 #0D4A41;cursor:pointer;} .vp-check:disabled{opacity:.5;cursor:default;}'
  + '.vp-note{margin:0;min-height:1.3em;max-width:640px;align-self:center;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .vp-note.is-hint{color:#8A3B1F;}'
  + '.vp-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* phones */
  + '.vp-wrap.is-narrow{gap:9px;} .vp-wrap.is-narrow .vp-stage{gap:12px;padding:10px 6px 12px;} .vp-wrap.is-narrow .vp-ref{min-height:44px;font-size:22px;padding:2px 12px;} .vp-wrap.is-narrow .vp-orig{font-size:17px;}'
  + '.vp-wrap.is-narrow .vp-words{font-size:23px;line-height:1.75;} .vp-wrap.is-narrow .vp-gap{width:72px;height:40px;} .vp-wrap.is-narrow .vp-strip{padding:6px 6px;}'
  + '.vp-wrap.is-narrow .vp-tray{gap:8px;} .vp-wrap.is-narrow .vp-prism{width:88px;} .vp-wrap.is-narrow .vp-face{height:56px;} .vp-wrap.is-narrow .vp-side{font-size:13px;height:20px;line-height:20px;}'
  + '.vp-wrap.is-narrow .vp-s1,.vp-wrap.is-narrow .vp-s2{font-size:21px;} .vp-wrap.is-narrow .vp-card{font-size:20px;padding:4px 10px;} .vp-wrap.is-narrow .vp-bins{gap:6px;} .vp-wrap.is-narrow .vp-card.is-in{font-size:15px;padding:4px 3px;} .vp-wrap.is-narrow .vp-bin{padding:4px;} .vp-wrap.is-narrow .vp-binhead{font-size:17px;}'
  + '.vp-wrap.is-narrow .vp-check{min-height:48px;min-width:130px;padding:6px 18px;font-size:20px;} .vp-wrap.is-narrow .vp-note{font-size:17px;} .vp-wrap.is-narrow .vp-window{height:24px;gap:5px;} .vp-wrap.is-narrow .vp-hat{width:18px;height:16px;}'
  + '.vp-wrap.is-xs .vp-prism{width:80px;} .vp-wrap.is-xs .vp-words{font-size:21px;} .vp-wrap.is-xs .vp-tray{gap:6px;}'
  /* a solved round on a phone: the tray and Check have no job left — they give their room to the shell's Next */
  + '.vp-wrap.is-narrow.is-done .vp-hand,.vp-wrap.is-narrow.is-done .vp-foot{display:none;}'
  + '.vp-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.vp-wrap *{animation:none !important;transition:none !important;}}'
  + '.vp-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'vp-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.PronounPrismActivity = PronounPrismActivity;
