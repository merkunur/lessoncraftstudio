/* =====================================================================
   level-rail-activity.js — ACTIVITY #168 of the one-by-one rebuild:
   "Pip's Stacking Fence — Build & Read a Bar Graph" (2.MD.D.10)
   → THE LEVEL RAIL. Model: level-rail-core.js. Design:
   docs/activities-rebuild/designs/168-graph-it.md
   ---------------------------------------------------------------------
   Pip's fence is the bar graph: a number post and up to four pickets of
   planks (or of library pictures in a picture fence). A spirit-level
   rail hangs on a slider on the post; its free end rests on a picket's
   top. Slide the post end until the bubble sits in the middle: the rail
   is level, the post reads the picket's number and every plank above
   the rail is striped — "how many more". Pickets stack (altogether),
   planks drop into Pip's basket (left). Next appears .OK_MS after
   success.
   ===================================================================== */
var LevelRailActivity = {
  id: 'level-rail-activity',
  THEMES: ['miscellaneous', 'fruits', 'vegetables', 'spring', 'forest-creatures'],
  /* the drawn apparatus (fence, post, planks, rail, card, dial, basket): declared for the hierarchy audit */
  apparatusClasses: ['lr-'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Pip's Stacking Fence","de":"Pips Stapelzaun","fr":"La palissade de Pip","es":"La cerca apilada de Pip","pt":"A cerca empilhada do Pip","it":"La staccionata di Pip","nl":"Pips stapelhek","sv":"Pips stapelstaket","da":"Pips stabelhegn","no":"Pips stabelgjerde","fi":"Pipin pinoaita"},
    instruction: {"en":"Build Pip's fence, then read it with the rail: lay it on a picket and slide its end on the post until the bubble sits in the middle.","de":"Bau Pips Zaun und lies ihn dann mit der Wasserwaage ab: Leg sie auf eine Säule und schieb ihr Ende am Pfosten, bis die Blase in der Mitte sitzt.","fr":"Construis la palissade de Pip, puis lis-la avec le niveau à bulle : pose-le sur une barre et fais glisser son bout le long du poteau jusqu’à ce que la bulle soit au milieu.","es":"Construye la cerca de Pip y luego léela con el nivel de burbuja: ponlo sobre una barra y desliza su extremo por el poste hasta que la burbuja quede en medio.","pt":"Construa a cerca do Pip e depois leia com o nível de bolha: coloque-o sobre uma barra e deslize a ponta dele no poste até a bolha ficar no meio.","it":"Costruisci la staccionata di Pip, poi leggila con la livella: appoggiala su una barra e fai scorrere la sua estremità sul palo finché la bolla è nel mezzo.","nl":"Bouw het hek van Pip en lees het dan af met de waterpas: leg hem op een staaf en schuif het uiteinde langs de paal tot de bel in het midden zit.","sv":"Bygg Pips staket och läs sedan av det med vattenpasset: lägg det på en stapel och skjut änden längs stolpen tills bubblan är i mitten.","da":"Byg Pips hegn, og aflæs det så med vaterpasset: læg det på en søjle, og skub enden langs pælen, til boblen er i midten.","no":"Bygg gjerdet til Pip, og les det så av med vaterpasset: legg det på en søyle, og skyv enden langs stolpen til boblen er i midten.","fi":"Rakenna Pipin aita ja lue se sitten vesivaa’alla: aseta vaaka pylvään päälle ja liu’uta sen päätä tolppaa pitkin, kunnes kupla on keskellä."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Comprobar","pt":"Verificar","it":"Verifica","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    setLevel: {"en":"Level","de":"Stufe","fr":"Étape","es":"Modo","pt":"Modo","it":"Livello","nl":"Niveau","sv":"Nivå","da":"Niveau","no":"Nivå","fi":"Taso"},
    lBuild: {"en":"Build","de":"Bauen","fr":"Construire","es":"Construir","pt":"Construir","it":"Costruire","nl":"Bouwen","sv":"Bygga","da":"Bygge","no":"Bygge","fi":"Rakenna"},
    lRead: {"en":"Read","de":"Ablesen","fr":"Lire","es":"Leer","pt":"Ler","it":"Leggere","nl":"Aflezen","sv":"Läsa av","da":"Aflæse","no":"Lese av","fi":"Lue"},
    lScaled: {"en":"Scaled","de":"Mit Maßstab","fr":"Avec une échelle","es":"Con escala","pt":"Com escala","it":"Con scala","nl":"Met schaal","sv":"Med skala","da":"Med skala","no":"Med skala","fi":"Asteikolla"},
    setRail: {"en":"Spirit level","de":"Wasserwaage","fr":"Niveau à bulle","es":"Nivel de burbuja","pt":"Nível de bolha","it":"Livella","nl":"Waterpas","sv":"Vattenpass","da":"Vaterpas","no":"Vaterpass","fi":"Vesivaaka"},
    rShow: {"en":"Show","de":"Zeigen","fr":"Afficher","es":"Mostrar","pt":"Mostrar","it":"Mostra","nl":"Tonen","sv":"Visa","da":"Vis","no":"Vis","fi":"Näytä"},
    rHide: {"en":"Hide","de":"Verstecken","fr":"Masquer","es":"Ocultar","pt":"Ocultar","it":"Nascondi","nl":"Verbergen","sv":"Dölj","da":"Skjul","no":"Skjul","fi":"Piilota"},
    postBy2: {"en":"The post counts by 2s.","de":"Der Pfosten zählt in Zweierschritten.","fr":"Le poteau compte de 2 en 2.","es":"El poste cuenta de 2 en 2.","pt":"O poste conta de 2 em 2.","it":"Il palo conta di 2 in 2.","nl":"De paal telt per 2.","sv":"Stolpen räknar 2 i taget.","da":"Pælen tæller 2 ad gangen.","no":"Stolpen teller 2 om gangen.","fi":"Tolpan luvut kasvavat kahden välein."},
    postBy5: {"en":"The post counts by 5s.","de":"Der Pfosten zählt in Fünferschritten.","fr":"Le poteau compte de 5 en 5.","es":"El poste cuenta de 5 en 5.","pt":"O poste conta de 5 em 5.","it":"Il palo conta di 5 in 5.","nl":"De paal telt per 5.","sv":"Stolpen räknar 5 i taget.","da":"Pælen tæller 5 ad gangen.","no":"Stolpen teller 5 om gangen.","fi":"Tolpan luvut kasvavat viiden välein."},
    postBy10: {"en":"The post counts by 10s.","de":"Der Pfosten zählt in Zehnerschritten.","fr":"Le poteau compte de 10 en 10.","es":"El poste cuenta de 10 en 10.","pt":"O poste conta de 10 em 10.","it":"Il palo conta di 10 in 10.","nl":"De paal telt per 10.","sv":"Stolpen räknar 10 i taget.","da":"Pælen tæller 10 ad gangen.","no":"Stolpen teller 10 om gangen.","fi":"Tolpan luvut kasvavat kymmenen välein."},
    qBuildTally: {"en":"Build the fence to match the tally.","de":"Bau den Zaun so, dass er zur Strichliste passt.","fr":"Construis la palissade d’après le tableau de comptage.","es":"Construye la cerca según la tabla de conteo.","pt":"Construa a cerca de acordo com a contagem de tracinhos.","it":"Costruisci la staccionata come nel conteggio a stanghette.","nl":"Bouw het hek volgens de turftabel.","sv":"Bygg staketet efter strecklistan.","da":"Byg hegnet efter tællestregerne.","no":"Bygg gjerdet etter tellestrekene.","fi":"Rakenna aita tukkimiehen kirjanpidon mukaan."},
    qBuildPics: {"en":"Build the fence to match the pictures.","de":"Bau den Zaun so, dass er zu den Bildern passt.","fr":"Construis la palissade d’après les images.","es":"Construye la cerca según los dibujos.","pt":"Construa a cerca de acordo com as figuras.","it":"Costruisci la staccionata come nelle figure.","nl":"Bouw het hek volgens de plaatjes.","sv":"Bygg staketet efter bilderna.","da":"Byg hegnet efter billederne.","no":"Bygg gjerdet etter bildene.","fi":"Rakenna aita kuvien mukaan."},
    qBuildTable: {"en":"Build the fence to match the table.","de":"Bau den Zaun so, dass er zur Tabelle passt.","fr":"Construis la palissade d’après le tableau.","es":"Construye la cerca según la tabla.","pt":"Construa a cerca de acordo com a tabela.","it":"Costruisci la staccionata come nella tabella.","nl":"Bouw het hek volgens de tabel.","sv":"Bygg staketet efter tabellen.","da":"Byg hegnet efter tabellen.","no":"Bygg gjerdet etter tabellen.","fi":"Rakenna aita taulukon mukaan."},
    qBuildBy: {"en":"{post} Build the fence to match the table.","de":"{post} Bau den Zaun so, dass er zur Tabelle passt.","fr":"{post} Construis la palissade d’après le tableau.","es":"{post} Construye la cerca según la tabla.","pt":"{post} Construa a cerca de acordo com a tabela.","it":"{post} Costruisci la staccionata come nella tabella.","nl":"{post} Bouw het hek volgens de tabel.","sv":"{post} Bygg staketet efter tabellen.","da":"{post} Byg hegnet efter tabellen.","no":"{post} Bygg gjerdet etter tabellen.","fi":"{post} Rakenna aita taulukon mukaan."},
    qBuildPicsBy: {"en":"Each picture means {s}. Build the picture fence to match the table.","de":"Jedes Bild steht für {s}. Bau den Bilderzaun so, dass er zur Tabelle passt.","fr":"Chaque image vaut {s}. Construis la palissade d’images d’après le tableau.","es":"Cada dibujo vale {s}. Construye la cerca de dibujos según la tabla.","pt":"Cada figura vale {s}. Construa a cerca de figuras de acordo com a tabela.","it":"Ogni figura vale {s}. Costruisci la staccionata di figure come nella tabella.","nl":"Elk plaatje telt voor {s}. Bouw het plaatjeshek volgens de tabel.","sv":"Varje bild betyder {s}. Bygg bildstaketet efter tabellen.","da":"Hvert billede betyder {s}. Byg billedhegnet efter tabellen.","no":"Hvert bilde betyr {s}. Bygg bildegjerdet etter tabellen.","fi":"Jokainen kuva tarkoittaa lukua {s}. Rakenna kuva-aita taulukon mukaan."},
    qFix: {"en":"One picket is wrong. Fix it to match the tally!","de":"Eine Säule stimmt nicht. Bring sie in Ordnung, damit sie zur Strichliste passt!","fr":"Une barre est fausse. Corrige-la d’après le tableau de comptage !","es":"Una barra está mal. ¡Arréglala según la tabla de conteo!","pt":"Uma barra está errada. Conserte-a de acordo com a contagem de tracinhos!","it":"Una barra è sbagliata. Correggila come nel conteggio a stanghette!","nl":"Eén staaf klopt niet. Maak hem goed volgens de turftabel!","sv":"En stapel är fel. Rätta den efter strecklistan!","da":"Én søjle er forkert. Ret den efter tællestregerne!","no":"Én søyle er feil. Rett den etter tellestrekene!","fi":"Yksi pylväs on väärin. Korjaa se tukkimiehen kirjanpidon mukaan!"},
    qMore: {"en":"How many more {a} than {bp}?","de":"Wie viele {a} gibt es mehr als {bp}?","fr":"Combien y a-t-il de {a} de plus que de {bp} ?","es":"{qa} {a} más que {bp} hay?","pt":"{qa} {a} há a mais do que {bp}?","it":"{qa} {a} ci sono in più rispetto {bp}?","nl":"Hoeveel {a} zijn er meer dan {bp}?","sv":"Hur många fler {a} än {bp} finns det?","da":"Hvor mange flere {a} end {bp} er der?","no":"Hvor mange flere {a} enn {bp} er det?","fi":"Kuinka monta {an} on enemmän kuin {bp}?"},
    qFewer: {"en":"How many fewer {a} than {bp}?","de":"Wie viele {a} gibt es weniger als {bp}?","fr":"Combien y a-t-il de {a} de moins que de {bp} ?","es":"{qa} {a} menos que {bp} hay?","pt":"{qa} {a} há a menos do que {bp}?","it":"{qa} {a} ci sono in meno rispetto {bp}?","nl":"Hoeveel {a} zijn er minder dan {bp}?","sv":"Hur många färre {a} än {bp} finns det?","da":"Hvor mange færre {a} end {bp} er der?","no":"Hvor mange færre {a} enn {bp} er det?","fi":"Kuinka monta {an} on vähemmän kuin {bp}?"},
    qTotal: {"en":"How many {a} and {b} altogether?","de":"Wie viele {a} und {b} sind es zusammen?","fr":"Combien y a-t-il de {a} et de {b} en tout ?","es":"{qab} {a} y {b} hay en total?","pt":"{qab} {a} e {b} há ao todo?","it":"{qab} {a} e {b} ci sono in tutto?","nl":"Hoeveel {a} en {b} zijn er samen?","sv":"Hur många {a} och {b} är det tillsammans?","da":"Hvor mange {a} og {b} er der i alt?","no":"Hvor mange {a} og {b} er det til sammen?","fi":"Kuinka monta {an} ja {bn} on yhteensä?"},
    qMost: {"en":"What is there the most of? Tap its picket.","de":"Wovon gibt es am meisten? Tippe die Säule an.","fr":"De quoi y a-t-il le plus ? Touche sa barre.","es":"¿De qué hay más? Toca su barra.","pt":"Do que há mais? Toque na barra.","it":"Di che cosa ce n’è di più? Tocca la sua barra.","nl":"Waarvan zijn er het meest? Tik de staaf aan.","sv":"Vad finns det mest av? Tryck på stapeln.","da":"Hvad er der flest af? Tryk på søjlen.","no":"Hva er det flest av? Trykk på søylen.","fi":"Mitä on eniten? Napauta sen pylvästä."},
    qLeft: {"en":"Pip eats {k} {an}. How many {a} are left?","de":"Pip frisst {k} {an}. Wie viele {a} sind übrig?","fr":"Pip mange {k} {an}. Combien de {a} reste-t-il ?","es":"Pip se come {k} {an}. {qa} {a} quedan?","pt":"O Pip come {k} {an}. {qa} {a} sobram?","it":"Pip mangia {k} {an}. {qa} {a} rimangono?","nl":"Pip eet {k} {an} op. Hoeveel {a} zijn er nog over?","sv":"Pip äter {k} {an}. Hur många {a} är kvar?","da":"Pip spiser {k} {an}. Hvor mange {a} er der tilbage?","no":"Pip spiser {k} {an}. Hvor mange {a} er igjen?","fi":"Pip syö {k} {an}. Kuinka monta {an} jää jäljelle?"},
    qTF: {"en":"True or false? There are {by} more {a} than {bp}.","de":"Stimmt das? Es gibt {by} {a} mehr als {bp}.","fr":"Vrai ou faux ? Il y a {by} {a} de plus que de {bp}.","es":"¿Verdadero o falso? Hay {by} {a} más que {bp}.","pt":"Verdadeiro ou falso? Há {by} {a} a mais do que {bp}.","it":"Vero o falso? Ci sono {by} {a} in più rispetto {bp}.","nl":"Waar of niet waar? Er zijn {by} {a} meer dan {bp}.","sv":"Sant eller falskt? Det finns {by} fler {a} än {bp}.","da":"Sandt eller falsk? Der er {by} flere {a} end {bp}.","no":"Sant eller usant? Det er {by} flere {a} enn {bp}.","fi":"Totta vai ei totta? {Ap} on {by} enemmän kuin {bp}."},
    qValuePics: {"en":"Each picture means {s}. How many {a} are there?","de":"Jedes Bild steht für {s}. Wie viele {a} sind es?","fr":"Chaque image vaut {s}. Combien y a-t-il de {a} ?","es":"Cada dibujo vale {s}. {qa} {a} hay?","pt":"Cada figura vale {s}. {qa} {a} há?","it":"Ogni figura vale {s}. {qa} {a} ci sono?","nl":"Elk plaatje telt voor {s}. Hoeveel {a} zijn er?","sv":"Varje bild betyder {s}. Hur många {a} finns det?","da":"Hvert billede betyder {s}. Hvor mange {a} er der?","no":"Hvert bilde betyr {s}. Hvor mange {a} er det?","fi":"Jokainen kuva tarkoittaa lukua {s}. Kuinka monta {an} on?"},
    qValuePost: {"en":"{post} How many {a} are there?","de":"{post} Wie viele {a} sind es?","fr":"{post} Combien y a-t-il de {a} ?","es":"{post} {qa} {a} hay?","pt":"{post} {qa} {a} há?","it":"{post} {qa} {a} ci sono?","nl":"{post} Hoeveel {a} zijn er?","sv":"{post} Hur många {a} finns det?","da":"{post} Hvor mange {a} er der?","no":"{post} Hvor mange {a} er det?","fi":"{post} Kuinka monta {an} on?"},
    qMorePost: {"en":"{post} How many more {a} than {bp}?","de":"{post} Wie viele {a} gibt es mehr als {bp}?","fr":"{post} Combien y a-t-il de {a} de plus que de {bp} ?","es":"{post} {qa} {a} más que {bp} hay?","pt":"{post} {qa} {a} há a mais do que {bp}?","it":"{post} {qa} {a} ci sono in più rispetto {bp}?","nl":"{post} Hoeveel {a} zijn er meer dan {bp}?","sv":"{post} Hur många fler {a} än {bp} finns det?","da":"{post} Hvor mange flere {a} end {bp} er der?","no":"{post} Hvor mange flere {a} enn {bp} er det?","fi":"{post} Kuinka monta {an} on enemmän kuin {bp}?"},
    qMorePics: {"en":"Each picture means {s}. How many more {a} than {bp}?","de":"Jedes Bild steht für {s}. Wie viele {a} gibt es mehr als {bp}?","fr":"Chaque image vaut {s}. Combien y a-t-il de {a} de plus que de {bp} ?","es":"Cada dibujo vale {s}. {qa} {a} más que {bp} hay?","pt":"Cada figura vale {s}. {qa} {a} há a mais do que {bp}?","it":"Ogni figura vale {s}. {qa} {a} ci sono in più rispetto {bp}?","nl":"Elk plaatje telt voor {s}. Hoeveel {a} zijn er meer dan {bp}?","sv":"Varje bild betyder {s}. Hur många fler {a} än {bp} finns det?","da":"Hvert billede betyder {s}. Hvor mange flere {a} end {bp} er der?","no":"Hvert bilde betyr {s}. Hvor mange flere {a} enn {bp} er det?","fi":"Jokainen kuva tarkoittaa lukua {s}. Kuinka monta {an} on enemmän kuin {bp}?"},
    tTrue: {"en":"True","de":"Stimmt","fr":"Vrai","es":"Verdadero","pt":"Verdadeiro","it":"Vero","nl":"Waar","sv":"Sant","da":"Sandt","no":"Sant","fi":"Totta"},
    tFalse: {"en":"False","de":"Stimmt nicht","fr":"Faux","es":"Falso","pt":"Falso","it":"Falso","nl":"Niet waar","sv":"Falskt","da":"Falsk","no":"Usant","fi":"Ei totta"},
    hintBuildStart: {"en":"Pull each picket up to match the card.","de":"Zieh jede Säule hoch, bis sie zur Karte passt.","fr":"Fais monter chaque barre pour qu’elle corresponde à la carte.","es":"Sube cada barra hasta que coincida con la tarjeta.","pt":"Puxe cada barra para cima até combinar com o cartão.","it":"Tira su ogni barra finché corrisponde alla scheda.","nl":"Trek elke staaf omhoog tot hij bij de kaart past.","sv":"Dra upp varje stapel tills den stämmer med kortet.","da":"Træk hver søjle op, til den passer med kortet.","no":"Dra hver søyle opp til den passer med kortet.","fi":"Vedä jokaista pylvästä ylös, kunnes se vastaa korttia."},
    hintReadStart: {"en":"Lay the rail on a picket and slide its end on the post until the bubble sits in the middle.","de":"Leg die Wasserwaage auf eine Säule und schieb ihr Ende am Pfosten, bis die Blase in der Mitte sitzt.","fr":"Pose le niveau sur une barre et fais glisser son bout le long du poteau jusqu’à ce que la bulle soit au milieu.","es":"Pon el nivel sobre una barra y desliza su extremo por el poste hasta que la burbuja quede en medio.","pt":"Coloque o nível sobre uma barra e deslize a ponta dele no poste até a bolha ficar no meio.","it":"Appoggia la livella su una barra e fai scorrere la sua estremità sul palo finché la bolla è nel mezzo.","nl":"Leg de waterpas op een staaf en schuif het uiteinde langs de paal tot de bel in het midden zit.","sv":"Lägg vattenpasset på en stapel och skjut änden längs stolpen tills bubblan är i mitten.","da":"Læg vaterpasset på en søjle, og skub enden langs pælen, til boblen er i midten.","no":"Legg vaterpasset på en søyle, og skyv enden langs stolpen til boblen er i midten.","fi":"Aseta vesivaaka pylvään päälle ja liu’uta sen päätä tolppaa pitkin, kunnes kupla on keskellä."},
    hintDial: {"en":"Turn the dial to your answer.","de":"Dreh die Zahlenrädchen auf deine Antwort.","fr":"Tourne les roues jusqu’à ta réponse.","es":"Gira las ruedas hasta tu respuesta.","pt":"Gire as rodas até a sua resposta.","it":"Gira le rotelle fino alla tua risposta.","nl":"Draai de wieltjes naar je antwoord.","sv":"Vrid hjulen till ditt svar.","da":"Drej hjulene hen på dit svar.","no":"Drei hjulene til svaret ditt.","fi":"Pyöritä rattaat vastaukseen."},
    hintTF: {"en":"Tap True or False.","de":"Tippe auf Stimmt oder Stimmt nicht.","fr":"Touche Vrai ou Faux.","es":"Toca Verdadero o Falso.","pt":"Toque em Verdadeiro ou Falso.","it":"Tocca Vero o Falso.","nl":"Tik op Waar of Niet waar.","sv":"Tryck på Sant eller Falskt.","da":"Tryk på Sandt eller Falsk.","no":"Trykk på Sant eller Usant.","fi":"Napauta Totta tai Ei totta."},
    hintMost: {"en":"Tap the picket of what there is the most of.","de":"Tippe die Säule von dem an, wovon es am meisten gibt.","fr":"Touche la barre de ce qu’il y a en plus grand nombre.","es":"Toca la barra de lo que hay más.","pt":"Toque na barra do que tem mais.","it":"Tocca la barra di ciò che è più numeroso.","nl":"Tik de staaf aan van wat er het meest is.","sv":"Tryck på stapeln för det som finns mest av.","da":"Tryk på søjlen for det, der er flest af.","no":"Trykk på søylen for det som det er flest av.","fi":"Napauta sen pylvästä, jota on eniten."},
    hintAgain: {"en":"Change something first, then press Check.","de":"Ändere zuerst etwas, dann tippe auf Prüfen.","fr":"Change d’abord quelque chose, puis appuie sur Vérifier.","es":"Primero cambia algo y luego toca Comprobar.","pt":"Primeiro mude alguma coisa e depois toque em Verificar.","it":"Prima cambia qualcosa, poi premi Verifica.","nl":"Verander eerst iets en tik dan op Controleer.","sv":"Ändra något först och tryck sedan på Kontrollera.","da":"Lav først noget om, og tryk så på Tjek.","no":"Endre noe først, og trykk så på Sjekk.","fi":"Muuta ensin jotain ja paina sitten Tarkista."},
    hintBuildWrong: {"en":"This picket says {n}. The card says {m}.","de":"Diese Säule zeigt {n}. Auf der Karte steht {m}.","fr":"Cette barre indique {n}. La carte indique {m}.","es":"Esta barra marca {n}. La tarjeta dice {m}.","pt":"Esta barra mostra {n}. O cartão diz {m}.","it":"Questa barra segna {n}. La scheda dice {m}.","nl":"Deze staaf zegt {n}. Op de kaart staat {m}.","sv":"Den här stapeln visar {n}. Kortet visar {m}.","da":"Denne søjle viser {n}. Kortet viser {m}.","no":"Denne søylen viser {n}. Kortet viser {m}.","fi":"Tämä pylväs näyttää {n}. Kortissa lukee {m}."},
    hintBuildEmpty: {"en":"This picket is still empty. The card says {m}.","de":"Diese Säule ist noch leer. Auf der Karte steht {m}.","fr":"Cette barre est encore vide. La carte indique {m}.","es":"Esta barra todavía está vacía. La tarjeta dice {m}.","pt":"Esta barra ainda está vazia. O cartão diz {m}.","it":"Questa barra è ancora vuota. La scheda dice {m}.","nl":"Deze staaf is nog leeg. Op de kaart staat {m}.","sv":"Den här stapeln är fortfarande tom. Kortet visar {m}.","da":"Denne søjle er stadig tom. Kortet viser {m}.","no":"Denne søylen er fortsatt tom. Kortet viser {m}.","fi":"Tämä pylväs on vielä tyhjä. Kortissa lukee {m}."},
    helpBuild: {"en":"One plank for each mark: {list}.","de":"Ein Brett für jeden Strich: {list}.","fr":"Une planche pour chaque trait : {list}.","es":"Un tablón por cada marca: {list}.","pt":"Uma tábua para cada tracinho: {list}.","it":"Un’asse per ogni stanghetta: {list}.","nl":"Eén plank voor elk streepje: {list}.","sv":"En bräda för varje streck: {list}.","da":"Ét bræt for hver streg: {list}.","no":"Én planke for hver strek: {list}.","fi":"Yksi lauta jokaista viivaa kohti: {list}."},
    helpBuildBy: {"en":"Each plank is {s}: {list}.","de":"Jedes Brett steht für {s}: {list}.","fr":"Chaque planche vaut {s} : {list}.","es":"Cada tablón vale {s}: {list}.","pt":"Cada tábua vale {s}: {list}.","it":"Ogni asse vale {s}: {list}.","nl":"Elke plank telt voor {s}: {list}.","sv":"Varje bräda är {s}: {list}.","da":"Hvert bræt er {s}: {list}.","no":"Hver planke er {s}: {list}.","fi":"Jokainen lauta on {s}: {list}."},
    helpBuildPics: {"en":"One picture for each picture on the card: {list}.","de":"Ein Bild für jedes Bild auf der Karte: {list}.","fr":"Une image pour chaque image de la carte : {list}.","es":"Un dibujo por cada dibujo de la tarjeta: {list}.","pt":"Uma figura para cada figura do cartão: {list}.","it":"Una figura per ogni figura della scheda: {list}.","nl":"Eén plaatje voor elk plaatje op de kaart: {list}.","sv":"En bild för varje bild på kortet: {list}.","da":"Ét billede for hvert billede på kortet: {list}.","no":"Ett bilde for hvert bilde på kortet: {list}.","fi":"Yksi kuva jokaista kortin kuvaa kohti: {list}."},
    helpBuildPicsBy: {"en":"Each picture is {s}: {list}.","de":"Jedes Bild steht für {s}: {list}.","fr":"Chaque image vaut {s} : {list}.","es":"Cada dibujo vale {s}: {list}.","pt":"Cada figura vale {s}: {list}.","it":"Ogni figura vale {s}: {list}.","nl":"Elk plaatje telt voor {s}: {list}.","sv":"Varje bild är {s}: {list}.","da":"Hvert billede er {s}: {list}.","no":"Hvert bilde er {s}: {list}.","fi":"Jokainen kuva on {s}: {list}."},
    hintMore: {"en":"The rail is level on the {lok} picket now. Count the striped part of the {hik} picket.","de":"Die Wasserwaage liegt jetzt waagerecht auf der Säule mit den {lok}. Zähle den gestreiften Teil der Säule mit den {hik}.","fr":"Le niveau est horizontal sur la barre des {lok}. Compte la partie rayée de la barre des {hik}.","es":"Ahora el nivel está derecho sobre la barra de {lok}. Cuenta la parte rayada de la barra de {hik}.","pt":"Agora o nível está reto sobre a barra de {lok}. Conte a parte listrada da barra de {hik}.","it":"Ora la livella è in bolla sulla barra {lok}. Conta la parte rigata della barra {hik}.","nl":"De waterpas ligt nu recht op de staaf met {lok}. Tel het gestreepte stuk van de staaf met {hik}.","sv":"Vattenpasset ligger nu vågrätt på stapeln med {lok}. Räkna den randiga delen av stapeln med {hik}.","da":"Vaterpasset ligger nu vandret på søjlen med {lok}. Tæl den stribede del af søjlen med {hik}.","no":"Vaterpasset ligger nå vannrett på søylen med {lok}. Tell den stripete delen av søylen med {hik}.","fi":"Vesivaaka on nyt vaakasuorassa {lok} pylvään päällä. Laske {hik} pylvään raidallinen osa."},
    hintTotal: {"en":"Stack the {ak} picket on the {bk} picket: tap one, then the other. Then read the top with the rail.","de":"Staple eine Säule auf die andere: Tippe die eine an, dann die andere. Dann lies die Spitze mit der Wasserwaage ab.","fr":"Empile une barre sur l’autre : touche l’une, puis l’autre. Puis lis le haut avec le niveau.","es":"Apila una barra sobre la otra: toca una y luego la otra. Después lee la parte de arriba con el nivel.","pt":"Empilhe uma barra sobre a outra: toque em uma e depois na outra. Depois leia o topo com o nível.","it":"Impila una barra sull’altra: toccane una, poi l’altra. Poi leggi la cima con la livella.","nl":"Stapel de ene staaf op de andere: tik de ene aan en dan de andere. Lees dan de top af met de waterpas.","sv":"Stapla den ena stapeln på den andra: tryck på den ena och sedan på den andra. Läs sedan av toppen med vattenpasset.","da":"Stabl den ene søjle oven på den anden: tryk på den ene og så på den anden. Aflæs så toppen med vaterpasset.","no":"Stable den ene søylen oppå den andre: trykk på den ene og så på den andre. Les så av toppen med vaterpasset.","fi":"Pinoa pylväs toisen päälle: napauta ensin yhtä ja sitten toista. Lue sitten huippu vesivaa’alla."},
    hintLeft: {"en":"Drag {k} planks from the glowing picket into Pip's basket, then read what is left.","de":"Nimm {k} Bretter von der leuchtenden Säule in Pips Korb, dann lies ab, was übrig ist.","fr":"Mets {k} planches de la barre qui brille dans le panier de Pip, puis lis ce qui reste.","es":"Pon {k} tablones de la barra que brilla en la canasta de Pip y luego lee lo que queda.","pt":"Coloque {k} tábuas da barra que brilha na cesta do Pip e depois leia o que sobrou.","it":"Metti {k} assi della barra che brilla nel cestino di Pip, poi leggi quello che resta.","nl":"Leg {k} planken van de staaf die oplicht in de mand van Pip en lees dan af wat er over is.","sv":"Lägg {k} brädor från stapeln som lyser i Pips korg och läs sedan av det som är kvar.","da":"Læg {k} brædder fra søjlen, der lyser, i Pips kurv, og aflæs så det, der er tilbage.","no":"Legg {k} planker fra søylen som lyser, i kurven til Pip, og les så av det som er igjen.","fi":"Siirrä {k} lautaa hohtavasta pylväästä Pipin koriin ja lue sitten, mitä jää jäljelle."},
    hintMost1: {"en":"Something still sticks up above the rail. Lay it on a taller picket: where nothing sticks up, there is the most.","de":"Über der Wasserwaage ragt noch etwas heraus. Leg sie auf eine höhere Säule: Wo nichts mehr herausragt, gibt es am meisten.","fr":"Quelque chose dépasse encore au-dessus du niveau. Pose-le sur une barre plus haute : là où rien ne dépasse, il y en a le plus.","es":"Todavía sobresale algo por encima del nivel. Ponlo sobre una barra más alta: donde nada sobresale, hay más.","pt":"Ainda tem algo acima do nível. Coloque-o numa barra mais alta: onde nada fica acima, há mais.","it":"Qualcosa sporge ancora sopra la livella. Mettila su una barra più alta: dove non sporge niente, ce n’è di più.","nl":"Er steekt nog iets boven de waterpas uit. Leg hem op een hogere staaf: waar niets meer uitsteekt, is er het meest van.","sv":"Något sticker fortfarande upp ovanför vattenpasset. Lägg det på en högre stapel: där inget sticker upp finns det mest.","da":"Der stikker stadig noget op over vaterpasset. Læg det på en højere søjle: hvor intet stikker op, er der flest.","no":"Det stikker fortsatt noe opp over vaterpasset. Legg det på en høyere søyle: der ingenting stikker opp, er det flest.","fi":"Vesivaa’an yläpuolelle jää vielä jotain. Aseta se korkeamman pylvään päälle: missä mitään ei jää yläpuolelle, sitä on eniten."},
    helpMost: {"en":"The rail rests on this picket, and nothing sticks up above it. Tap this picket.","de":"Auf dieser Säule ragt nichts über die Wasserwaage. Tippe sie an.","fr":"Sur cette barre, rien ne dépasse le niveau. Touche-la.","es":"En esta barra nada sobresale del nivel. Tócala.","pt":"Nesta barra nada fica acima do nível. Toque nela.","it":"Su questa barra niente sporge sopra la livella. Toccala.","nl":"Op deze staaf steekt niets boven de waterpas uit. Tik hem aan.","sv":"På den här stapeln sticker inget upp ovanför vattenpasset. Tryck på den.","da":"På denne søjle stikker intet op over vaterpasset. Tryk på den.","no":"På denne søylen stikker ingenting opp over vaterpasset. Trykk på den.","fi":"Tämän pylvään kohdalla mitään ei jää vesivaa’an yläpuolelle. Napauta sitä."},
    hintTF1: {"en":"The rail is level on the {lok} picket now. Count the striped part of the {hik} picket. Is it {by}?","de":"Die Wasserwaage liegt jetzt waagerecht auf der Säule mit den {lok}. Zähle den gestreiften Teil der Säule mit den {hik}. Sind es {by}?","fr":"Le niveau est horizontal sur la barre des {lok}. Compte la partie rayée de la barre des {hik}. Est-ce {by} ?","es":"Ahora el nivel está derecho sobre la barra de {lok}. Cuenta la parte rayada de la barra de {hik}. ¿Son {by}?","pt":"Agora o nível está reto sobre a barra de {lok}. Conte a parte listrada da barra de {hik}. São {by}?","it":"Ora la livella è in bolla sulla barra {lok}. Conta la parte rigata della barra {hik}. Sono {by}?","nl":"De waterpas ligt nu recht op de staaf met {lok}. Tel het gestreepte stuk van de staaf met {hik}. Zijn het er {by}?","sv":"Vattenpasset ligger nu vågrätt på stapeln med {lok}. Räkna den randiga delen av stapeln med {hik}. Är det {by}?","da":"Vaterpasset ligger nu vandret på søjlen med {lok}. Tæl den stribede del af søjlen med {hik}. Er det {by}?","no":"Vaterpasset ligger nå vannrett på søylen med {lok}. Tell den stripete delen av søylen med {hik}. Er det {by}?","fi":"Vesivaaka on nyt vaakasuorassa {lok} pylvään päällä. Laske {hik} pylvään raidallinen osa. Onko se {by}?"},
    hintValue: {"en":"The rail rests on the {ak} picket now. Slide its end on the post until the bubble sits in the middle, then read the post.","de":"Die Wasserwaage liegt jetzt auf der richtigen Säule. Schieb ihr Ende am Pfosten, bis die Blase in der Mitte ist, und lies dann den Pfosten ab.","fr":"Le niveau est maintenant posé sur la bonne barre. Fais glisser son bout le long du poteau jusqu’à ce que la bulle soit au milieu, puis lis le poteau.","es":"Ahora el nivel está sobre la barra correcta. Desliza su extremo por el poste hasta que la burbuja quede en medio y luego lee el poste.","pt":"Agora o nível está sobre a barra certa. Deslize a ponta dele no poste até a bolha ficar no meio e depois leia o poste.","it":"Ora la livella è sulla barra giusta. Fai scorrere la sua estremità sul palo finché la bolla è nel mezzo, poi leggi il palo.","nl":"De waterpas ligt nu op de goede staaf. Schuif het uiteinde langs de paal tot de bel in het midden zit en lees dan de paal af.","sv":"Vattenpasset ligger nu på rätt stapel. Skjut änden längs stolpen tills bubblan är i mitten och läs sedan av stolpen.","da":"Vaterpasset ligger nu på den rigtige søjle. Skub enden langs pælen, til boblen er i midten, og aflæs så pælen.","no":"Vaterpasset ligger nå på riktig søyle. Skyv enden langs stolpen til boblen er i midten, og les så av stolpen.","fi":"Vesivaaka on nyt oikean pylvään päällä. Liu’uta sen päätä tolppaa pitkin, kunnes kupla on keskellä, ja lue sitten tolppa."},
    helpCount: {"en":"Count them: {list}.","de":"Zähle sie: {list}.","fr":"Compte-les : {list}.","es":"Cuenta: {list}.","pt":"Conte: {list}.","it":"Conta: {list}.","nl":"Tel ze: {list}.","sv":"Räkna dem: {list}.","da":"Tæl dem: {list}.","no":"Tell dem: {list}.","fi":"Laske ne: {list}."},
    helpCountBy: {"en":"Count in steps of {s}: {list}.","de":"Zähle in {s}er-Schritten: {list}.","fr":"Compte de {s} en {s} : {list}.","es":"Cuenta de {s} en {s}: {list}.","pt":"Conte de {s} em {s}: {list}.","it":"Conta di {s} in {s}: {list}.","nl":"Tel per {s}: {list}.","sv":"Räkna {s} i taget: {list}.","da":"Tæl {s} ad gangen: {list}.","no":"Tell {s} om gangen: {list}.","fi":"Laske {s} kerrallaan: {list}."},
    okBuild: {"en":"Your fence matches the card!","de":"Dein Zaun passt zur Karte!","fr":"Ta palissade correspond à la carte !","es":"¡Tu cerca coincide con la tarjeta!","pt":"Sua cerca combina com o cartão!","it":"La tua staccionata corrisponde alla scheda!","nl":"Je hek klopt met de kaart!","sv":"Ditt staket stämmer med kortet!","da":"Dit hegn passer med kortet!","no":"Gjerdet ditt passer med kortet!","fi":"Aitasi vastaa korttia!"},
    okMore: {"en":"There are {n} more {a} than {bp}.","de":"Es gibt {n} {a} mehr als {bp}.","fr":"Il y a {n} {a} de plus que de {bp}.","es":"Hay {n} {a} más que {bp}.","pt":"Há {n} {a} a mais do que {bp}.","it":"Ci sono {n} {a} in più rispetto {bp}.","nl":"Er zijn {n} {a} meer dan {bp}.","sv":"Det finns {n} fler {a} än {bp}.","da":"Der er {n} flere {a} end {bp}.","no":"Det er {n} flere {a} enn {bp}.","fi":"{Ap} on {n} enemmän kuin {bp}."},
    okMore1: {"en":"There is 1 more {as} than {bp}.","de":"Es gibt 1 {as} mehr als {bp}.","fr":"Il y a 1 {as} de plus que de {bp}.","es":"Hay 1 {as} más que {bp}.","pt":"Há 1 {as} a mais do que {bp}.","it":"C’è 1 {as} in più rispetto {bp}.","nl":"Er is 1 {as} meer dan {bp}.","sv":"Det finns 1 {as} mer än {bp}.","da":"Der er 1 {as} mere end {bp}.","no":"Det er 1 {as} mer enn {bp}.","fi":"{Ap} on 1 enemmän kuin {bp}."},
    okFewer: {"en":"There are {n} fewer {a} than {bp}.","de":"Es gibt {n} {a} weniger als {bp}.","fr":"Il y a {n} {a} de moins que de {bp}.","es":"Hay {n} {a} menos que {bp}.","pt":"Há {n} {a} a menos do que {bp}.","it":"Ci sono {n} {a} in meno rispetto {bp}.","nl":"Er zijn {n} {a} minder dan {bp}.","sv":"Det finns {n} färre {a} än {bp}.","da":"Der er {n} færre {a} end {bp}.","no":"Det er {n} færre {a} enn {bp}.","fi":"{Ap} on {n} vähemmän kuin {bp}."},
    okTotal: {"en":"There are {n} {a} and {b} altogether.","de":"Zusammen sind es {n} {a} und {b}.","fr":"En tout, il y a {n} {a} et {b}.","es":"En total hay {n} {a} y {b}.","pt":"Ao todo, há {n} {a} e {b}.","it":"In tutto, {a} e {b} sono {n}.","nl":"Samen zijn het {n} {a} en {b}.","sv":"Tillsammans är det {n} {a} och {b}.","da":"Der er {n} {a} og {b} i alt.","no":"Til sammen er det {n} {a} og {b}.","fi":"{Ap} ja {bp} on yhteensä {n}."},
    okMost: {"en":"There are the most {m}.","de":"Am meisten gibt es {m}.","fr":"C’est de {m} qu’il y a le plus.","es":"Lo que más hay son {m}.","pt":"O que há mais são {m}.","it":"Di {m} ce ne sono di più.","nl":"Er zijn de meeste {m}.","sv":"Det finns flest {m}.","da":"Der er flest {m}.","no":"Det er flest {m}.","fi":"Eniten on {mp}."},
    okLeft: {"en":"There are {n} {a} left.","de":"Es sind {n} {a} übrig.","fr":"Il reste {n} {a}.","es":"Quedan {n} {a}.","pt":"Sobram {n} {a}.","it":"Rimangono {n} {a}.","nl":"Er zijn nog {n} {a} over.","sv":"Det är {n} {a} kvar.","da":"Der er {n} {a} tilbage.","no":"Det er {n} {a} igjen.","fi":"Jäljelle jää {n} {an}."},
    okTrue: {"en":"True — there are {by} more {a} than {bp}.","de":"Stimmt – es gibt {by} {a} mehr als {bp}.","fr":"Vrai : il y a {by} {a} de plus que de {bp}.","es":"Verdadero: hay {by} {a} más que {bp}.","pt":"Verdadeiro: há {by} {a} a mais do que {bp}.","it":"Vero: ci sono {by} {a} in più rispetto {bp}.","nl":"Waar: er zijn {by} {a} meer dan {bp}.","sv":"Sant – det finns {by} fler {a} än {bp}.","da":"Sandt – der er {by} flere {a} end {bp}.","no":"Sant – det er {by} flere {a} enn {bp}.","fi":"Totta: {ap} on {by} enemmän kuin {bp}."},
    okFalse: {"en":"False — there are {d} more {a}, not {by}.","de":"Stimmt nicht – es gibt {d} {a} mehr, nicht {by}.","fr":"Faux : il y a {d} {a} de plus, pas {by}.","es":"Falso: hay {d} {a} más, no {by}.","pt":"Falso: há {d} {a} a mais, não {by}.","it":"Falso: ci sono {d} {a} in più, non {by}.","nl":"Niet waar: er zijn {d} {a} meer, niet {by}.","sv":"Falskt – det finns {d} fler {a}, inte {by}.","da":"Falsk – der er {d} flere {a}, ikke {by}.","no":"Usant – det er {d} flere {a}, ikke {by}.","fi":"Ei totta: {ap} on {d} enemmän, ei {by}."},
    okValue: {"en":"There are {n} {a}.","de":"Es sind {n} {a}.","fr":"Il y a {n} {a}.","es":"Hay {n} {a}.","pt":"Há {n} {a}.","it":"Ci sono {n} {a}.","nl":"Er zijn {n} {a}.","sv":"Det finns {n} {a}.","da":"Der er {n} {a}.","no":"Det er {n} {a}.","fi":"{Ap} on {n}."},
    okValuePics: {"en":"Each picture is {s}, so {p} pictures are {n} {a}.","de":"Jedes Bild steht für {s}, also sind {p} Bilder {n} {a}.","fr":"Chaque image vaut {s}, donc {p} images font {n} {a}.","es":"Cada dibujo vale {s}, así que {p} dibujos son {n} {a}.","pt":"Cada figura vale {s}, então {p} figuras são {n} {a}.","it":"Ogni figura vale {s}, quindi {p} figure sono {n} {a}.","nl":"Elk plaatje telt voor {s}, dus {p} plaatjes zijn {n} {a}.","sv":"Varje bild är {s}, så {p} bilder är {n} {a}.","da":"Hvert billede er {s}, så {p} billeder er {n} {a}.","no":"Hvert bilde er {s}, så {p} bilder er {n} {a}.","fi":"Jokainen kuva on {s}, joten {p} kuvaa tarkoittaa {n} {an}."},
    okValueHalf: {"en":"Each picture is {s}, so one and a half pictures are {n} {a}.","de":"Jedes Bild steht für {s}, also sind anderthalb Bilder {n} {a}.","fr":"Chaque image vaut {s}, donc une image et demie fait {n} {a}.","es":"Cada dibujo vale {s}, así que un dibujo y medio son {n} {a}.","pt":"Cada figura vale {s}, então uma figura e meia são {n} {a}.","it":"Ogni figura vale {s}, quindi una figura e mezza sono {n} {a}.","nl":"Elk plaatje telt voor {s}, dus anderhalf plaatje is {n} {a}.","sv":"Varje bild är {s}, så en och en halv bild är {n} {a}.","da":"Hvert billede er {s}, så halvandet billede er {n} {a}.","no":"Hvert bilde er {s}, så halvannet bilde er {n} {a}.","fi":"Jokainen kuva on {s}, joten puolitoista kuvaa tarkoittaa {n} {an}."},
    helpBuildTable: {"en":"The table says {m}. Count the planks: {list}.","de":"In der Tabelle steht {m}. Zähle die Bretter: {list}.","fr":"Le tableau indique {m}. Compte les planches : {list}.","es":"La tabla dice {m}. Cuenta los tablones: {list}.","pt":"A tabela diz {m}. Conte as tábuas: {list}.","it":"La tabella dice {m}. Conta le assi: {list}.","nl":"In de tabel staat {m}. Tel de planken: {list}.","sv":"Tabellen visar {m}. Räkna brädorna: {list}.","da":"Tabellen viser {m}. Tæl brædderne: {list}.","no":"Tabellen viser {m}. Tell plankene: {list}.","fi":"Taulukossa lukee {m}. Laske laudat: {list}."},
    halfPlank: {"en":", and the half plank on top makes {n}","de":" und das halbe Brett oben macht {n}","fr":" et la demi-planche du haut fait {n}","es":" y el medio tablón de arriba hace {n}","pt":" e a meia tábua de cima faz {n}","it":" e la mezza asse in cima fa {n}","nl":" en de halve plank bovenop maakt {n}","sv":" och den halva brädan överst gör {n}","da":" og det halve bræt øverst giver {n}","no":" og den halve planken øverst gir {n}","fi":" ja ylin puolikas lauta tekee yhteensä {n}"},
    halfPic: {"en":", and the half picture makes {n}","de":" und das halbe Bild macht {n}","fr":" et la demi-image fait {n}","es":" y el medio dibujo hace {n}","pt":" e a meia figura faz {n}","it":" e la mezza figura fa {n}","nl":" en het halve plaatje maakt {n}","sv":" och den halva bilden gör {n}","da":" og det halve billede giver {n}","no":" og det halve bildet gir {n}","fi":" ja puolikas kuva tekee yhteensä {n}"},
    hintMoreBy: {"en":"The rail is level on the {lok} picket now. Count the striped part of the {hik} picket in steps of {s}.","de":"Die Wasserwaage liegt jetzt waagerecht auf der Säule mit den {lok}. Zähle den gestreiften Teil der Säule mit den {hik} in {s}er-Schritten.","fr":"Le niveau est horizontal sur la barre des {lok}. Compte de {s} en {s} la partie rayée de la barre des {hik}.","es":"Ahora el nivel está derecho sobre la barra de {lok}. Cuenta de {s} en {s} la parte rayada de la barra de {hik}.","pt":"Agora o nível está reto sobre a barra de {lok}. Conte de {s} em {s} a parte listrada da barra de {hik}.","it":"Ora la livella è in bolla sulla barra {lok}. Conta di {s} in {s} la parte rigata della barra {hik}.","nl":"De waterpas ligt nu recht op de staaf met {lok}. Tel het gestreepte stuk van de staaf met {hik} per {s}.","sv":"Vattenpasset ligger nu vågrätt på stapeln med {lok}. Räkna den randiga delen av stapeln med {hik}, {s} i taget.","da":"Vaterpasset ligger nu vandret på søjlen med {lok}. Tæl den stribede del af søjlen med {hik}, {s} ad gangen.","no":"Vaterpasset ligger nå vannrett på søylen med {lok}. Tell den stripete delen av søylen med {hik}, {s} om gangen.","fi":"Vesivaaka on nyt vaakasuorassa {lok} pylvään päällä. Laske {hik} pylvään raidallinen osa {s} kerrallaan."},
    aPicket: {"en":"{lab}, planks: {k}","de":"{lab}, Bretter: {k}","fr":"{lab}, planches : {k}","es":"{lab}, tablones: {k}","pt":"{lab}, tábuas: {k}","it":"{lab}, assi: {k}","nl":"{lab}, planken: {k}","sv":"{lab}, brädor: {k}","da":"{lab}, brædder: {k}","no":"{lab}, planker: {k}","fi":"{lab}, lautoja: {k}"},
    aPicketPics: {"en":"{lab}, pictures: {k}","de":"{lab}, Bilder: {k}","fr":"{lab}, images : {k}","es":"{lab}, dibujos: {k}","pt":"{lab}, figuras: {k}","it":"{lab}, figure: {k}","nl":"{lab}, plaatjes: {k}","sv":"{lab}, bilder: {k}","da":"{lab}, billeder: {k}","no":"{lab}, bilder: {k}","fi":"{lab}, kuvia: {k}"},
    aPicketVal: {"en":"{lab}: {v}","de":"{lab}: {v}","fr":"{lab} : {v}","es":"{lab}: {v}","pt":"{lab}: {v}","it":"{lab}: {v}","nl":"{lab}: {v}","sv":"{lab}: {v}","da":"{lab}: {v}","no":"{lab}: {v}","fi":"{lab}: {v}"},
    aSlider: {"en":"Rail end on the post, at {v}","de":"Ende der Wasserwaage am Pfosten, bei {v}","fr":"Bout du niveau sur le poteau, à {v}","es":"Extremo del nivel en el poste, en {v}","pt":"Ponta do nível no poste, em {v}","it":"Estremità della livella sul palo, a {v}","nl":"Uiteinde van de waterpas aan de paal, bij {v}","sv":"Vattenpassets ände på stolpen, vid {v}","da":"Vaterpassets ende på pælen, ved {v}","no":"Vaterpassets ende på stolpen, ved {v}","fi":"Vesivaa’an pää tolpalla, kohdassa {v}"},
    aFoot: {"en":"Rail rests on: {lab}","de":"Wasserwaage liegt auf: {lab}","fr":"Le niveau est posé sur : {lab}","es":"El nivel está sobre: {lab}","pt":"O nível está sobre: {lab}","it":"La livella è su: {lab}","nl":"De waterpas ligt op: {lab}","sv":"Vattenpasset ligger på: {lab}","da":"Vaterpasset ligger på: {lab}","no":"Vaterpasset ligger på: {lab}","fi":"Vesivaaka on pylvään päällä: {lab}"},
    aBasket: {"en":"Pip's basket, planks: {k}","de":"Pips Korb, Bretter: {k}","fr":"Panier de Pip, planches : {k}","es":"Canasta de Pip, tablones: {k}","pt":"Cesta do Pip, tábuas: {k}","it":"Cestino di Pip, assi: {k}","nl":"Mand van Pip, planken: {k}","sv":"Pips korg, brädor: {k}","da":"Pips kurv, brædder: {k}","no":"Kurven til Pip, planker: {k}","fi":"Pipin kori, lautoja: {k}"},
    aDial: {"en":"Answer dial","de":"Antwort-Rädchen","fr":"Roues de la réponse","es":"Ruedas de la respuesta","pt":"Rodas da resposta","it":"Rotelle della risposta","nl":"Antwoordwieltjes","sv":"Svarshjul","da":"Svarhjul","no":"Svarhjul","fi":"Vastausrattaat"},
    aTens: {"en":"Tens","de":"Zehner","fr":"Dizaines","es":"Decenas","pt":"Dezenas","it":"Decine","nl":"Tientallen","sv":"Tiotal","da":"Tiere","no":"Tiere","fi":"Kymmenet"},
    aOnes: {"en":"Ones","de":"Einer","fr":"Unités","es":"Unidades","pt":"Unidades","it":"Unità","nl":"Eenheden","sv":"Ental","da":"Enere","no":"Enere","fi":"Ykköset"},
    anLevel: {"en":"The rail is level.","de":"Die Wasserwaage liegt waagerecht.","fr":"Le niveau est horizontal.","es":"El nivel está derecho.","pt":"O nível está reto.","it":"La livella è in bolla.","nl":"De waterpas ligt recht.","sv":"Vattenpasset ligger vågrätt.","da":"Vaterpasset ligger vandret.","no":"Vaterpasset ligger vannrett.","fi":"Vesivaaka on vaakasuorassa."}
  },/*STRINGS-END*/
  /* the category words, authored per locale (design §9): sg, pl (label + lists), n (after a numeral and after "how many"),
     p (the compared-with form: "than raspberries", it "ai lamponi", fi partitive), g (gender for the agreeing interrogative) */
  /*NOUNS-BEGIN*/NOUNS: {
    en: {"leaf":{"sg":"leaf","pl":"leaves","n":"leaves","p":"leaves","g":null,"q":"","lab":"Leaves","k":"leaf"},"raspberry":{"sg":"raspberry","pl":"raspberries","n":"raspberries","p":"raspberries","g":null,"q":"","lab":"Rasp­berries","k":"raspberry"},"acorn":{"sg":"acorn","pl":"acorns","n":"acorns","p":"acorns","g":null,"q":"","lab":"Acorns","k":"acorn"},"pinecone":{"sg":"pinecone","pl":"pinecones","n":"pinecones","p":"pinecones","g":null,"q":"","lab":"Pinecones","k":"pinecone"},"mushroom":{"sg":"mushroom","pl":"mushrooms","n":"mushrooms","p":"mushrooms","g":null,"q":"","lab":"Mushrooms","k":"mushroom"},"flower":{"sg":"flower","pl":"flowers","n":"flowers","p":"flowers","g":null,"q":"","lab":"Flowers","k":"flower"}},
    de: {"leaf":{"sg":"Blatt","pl":"Blätter","n":"Blätter","p":"Blätter","g":null,"q":"","lab":"Blätter","k":"Blättern"},"raspberry":{"sg":"Himbeere","pl":"Himbeeren","n":"Himbeeren","p":"Himbeeren","g":null,"q":"","lab":"Him­beeren","k":"Himbeeren"},"acorn":{"sg":"Eichel","pl":"Eicheln","n":"Eicheln","p":"Eicheln","g":null,"q":"","lab":"Eicheln","k":"Eicheln"},"pinecone":{"sg":"Tannenzapfen","pl":"Tannenzapfen","n":"Tannenzapfen","p":"Tannenzapfen","g":null,"q":"","lab":"Tannen­zapfen","k":"Tannenzapfen"},"mushroom":{"sg":"Pilz","pl":"Pilze","n":"Pilze","p":"Pilze","g":null,"q":"","lab":"Pilze","k":"Pilzen"},"flower":{"sg":"Blume","pl":"Blumen","n":"Blumen","p":"Blumen","g":null,"q":"","lab":"Blumen","k":"Blumen"}},
    fr: {"leaf":{"sg":"feuille","pl":"feuilles","n":"feuilles","p":"feuilles","g":null,"q":"","lab":"Feuilles","k":"feuilles"},"raspberry":{"sg":"framboise","pl":"framboises","n":"framboises","p":"framboises","g":null,"q":"","lab":"Fram­boises","k":"framboises"},"acorn":{"sg":"gland","pl":"glands","n":"glands","p":"glands","g":null,"q":"","lab":"Glands","k":"glands"},"pinecone":{"sg":"pomme de pin","pl":"pommes de pin","n":"pommes de pin","p":"pommes de pin","g":null,"q":"","lab":"Pommes de pin","k":"pommes de pin"},"mushroom":{"sg":"champignon","pl":"champignons","n":"champignons","p":"champignons","g":null,"q":"","lab":"Cham­pignons","k":"champignons"},"flower":{"sg":"fleur","pl":"fleurs","n":"fleurs","p":"fleurs","g":null,"q":"","lab":"Fleurs","k":"fleurs"}},
    es: {"leaf":{"sg":"hoja","pl":"hojas","n":"hojas","p":"hojas","g":"f","q":"¿Cuántas","lab":"Hojas","k":"hojas"},"raspberry":{"sg":"frambuesa","pl":"frambuesas","n":"frambuesas","p":"frambuesas","g":"f","q":"¿Cuántas","lab":"Fram­buesas","k":"frambuesas"},"acorn":{"sg":"bellota","pl":"bellotas","n":"bellotas","p":"bellotas","g":"f","q":"¿Cuántas","lab":"Bellotas","k":"bellotas"},"pinecone":{"sg":"piña de pino","pl":"piñas de pino","n":"piñas de pino","p":"piñas de pino","g":"f","q":"¿Cuántas","lab":"Piñas de pino","k":"piñas de pino"},"mushroom":{"sg":"hongo","pl":"hongos","n":"hongos","p":"hongos","g":"m","q":"¿Cuántos","lab":"Hongos","k":"hongos"},"flower":{"sg":"flor","pl":"flores","n":"flores","p":"flores","g":"f","q":"¿Cuántas","lab":"Flores","k":"flores"}},
    pt: {"leaf":{"sg":"folha","pl":"folhas","n":"folhas","p":"folhas","g":"f","q":"Quantas","lab":"Folhas","k":"folhas"},"raspberry":{"sg":"framboesa","pl":"framboesas","n":"framboesas","p":"framboesas","g":"f","q":"Quantas","lab":"Fram­boesas","k":"framboesas"},"acorn":{"sg":"bolota","pl":"bolotas","n":"bolotas","p":"bolotas","g":"f","q":"Quantas","lab":"Bolotas","k":"bolotas"},"pinecone":{"sg":"pinha","pl":"pinhas","n":"pinhas","p":"pinhas","g":"f","q":"Quantas","lab":"Pinhas","k":"pinhas"},"mushroom":{"sg":"cogumelo","pl":"cogumelos","n":"cogumelos","p":"cogumelos","g":"m","q":"Quantos","lab":"Cogu­melos","k":"cogumelos"},"flower":{"sg":"flor","pl":"flores","n":"flores","p":"flores","g":"f","q":"Quantas","lab":"Flores","k":"flores"}},
    it: {"leaf":{"sg":"foglia","pl":"foglie","n":"foglie","p":"alle foglie","g":"f","q":"Quante","lab":"Foglie","k":"delle foglie"},"raspberry":{"sg":"lampone","pl":"lamponi","n":"lamponi","p":"ai lamponi","g":"m","q":"Quanti","lab":"Lamponi","k":"dei lamponi"},"acorn":{"sg":"ghianda","pl":"ghiande","n":"ghiande","p":"alle ghiande","g":"f","q":"Quante","lab":"Ghiande","k":"delle ghiande"},"pinecone":{"sg":"pigna","pl":"pigne","n":"pigne","p":"alle pigne","g":"f","q":"Quante","lab":"Pigne","k":"delle pigne"},"mushroom":{"sg":"fungo","pl":"funghi","n":"funghi","p":"ai funghi","g":"m","q":"Quanti","lab":"Funghi","k":"dei funghi"},"flower":{"sg":"fiore","pl":"fiori","n":"fiori","p":"ai fiori","g":"m","q":"Quanti","lab":"Fiori","k":"dei fiori"}},
    nl: {"leaf":{"sg":"blad","pl":"bladeren","n":"bladeren","p":"bladeren","g":null,"q":"","lab":"Bladeren","k":"bladeren"},"raspberry":{"sg":"framboos","pl":"frambozen","n":"frambozen","p":"frambozen","g":null,"q":"","lab":"Frambozen","k":"frambozen"},"acorn":{"sg":"eikel","pl":"eikels","n":"eikels","p":"eikels","g":null,"q":"","lab":"Eikels","k":"eikels"},"pinecone":{"sg":"dennenappel","pl":"dennenappels","n":"dennenappels","p":"dennenappels","g":null,"q":"","lab":"Dennen­appels","k":"dennenappels"},"mushroom":{"sg":"paddenstoel","pl":"paddenstoelen","n":"paddenstoelen","p":"paddenstoelen","g":null,"q":"","lab":"Padden­stoelen","k":"paddenstoelen"},"flower":{"sg":"bloem","pl":"bloemen","n":"bloemen","p":"bloemen","g":null,"q":"","lab":"Bloemen","k":"bloemen"}},
    sv: {"leaf":{"sg":"löv","pl":"löv","n":"löv","p":"löv","g":null,"q":"","lab":"Löv","k":"löv"},"raspberry":{"sg":"hallon","pl":"hallon","n":"hallon","p":"hallon","g":null,"q":"","lab":"Hallon","k":"hallon"},"acorn":{"sg":"ekollon","pl":"ekollon","n":"ekollon","p":"ekollon","g":null,"q":"","lab":"Ekollon","k":"ekollon"},"pinecone":{"sg":"kotte","pl":"kottar","n":"kottar","p":"kottar","g":null,"q":"","lab":"Kottar","k":"kottar"},"mushroom":{"sg":"svamp","pl":"svampar","n":"svampar","p":"svampar","g":null,"q":"","lab":"Svampar","k":"svampar"},"flower":{"sg":"blomma","pl":"blommor","n":"blommor","p":"blommor","g":null,"q":"","lab":"Blommor","k":"blommor"}},
    da: {"leaf":{"sg":"blad","pl":"blade","n":"blade","p":"blade","g":null,"q":"","lab":"Blade","k":"blade"},"raspberry":{"sg":"hindbær","pl":"hindbær","n":"hindbær","p":"hindbær","g":null,"q":"","lab":"Hind­bær","k":"hindbær"},"acorn":{"sg":"agern","pl":"agern","n":"agern","p":"agern","g":null,"q":"","lab":"Agern","k":"agern"},"pinecone":{"sg":"kogle","pl":"kogler","n":"kogler","p":"kogler","g":null,"q":"","lab":"Kogler","k":"kogler"},"mushroom":{"sg":"svamp","pl":"svampe","n":"svampe","p":"svampe","g":null,"q":"","lab":"Svampe","k":"svampe"},"flower":{"sg":"blomst","pl":"blomster","n":"blomster","p":"blomster","g":null,"q":"","lab":"Blomster","k":"blomster"}},
    no: {"leaf":{"sg":"blad","pl":"blader","n":"blader","p":"blader","g":null,"q":"","lab":"Blader","k":"blader"},"raspberry":{"sg":"bringebær","pl":"bringebær","n":"bringebær","p":"bringebær","g":null,"q":"","lab":"Bringe­bær","k":"bringebær"},"acorn":{"sg":"eikenøtt","pl":"eikenøtter","n":"eikenøtter","p":"eikenøtter","g":null,"q":"","lab":"Eike­nøtter","k":"eikenøtter"},"pinecone":{"sg":"kongle","pl":"kongler","n":"kongler","p":"kongler","g":null,"q":"","lab":"Kongler","k":"kongler"},"mushroom":{"sg":"sopp","pl":"sopper","n":"sopper","p":"sopper","g":null,"q":"","lab":"Sopper","k":"sopper"},"flower":{"sg":"blomst","pl":"blomster","n":"blomster","p":"blomster","g":null,"q":"","lab":"Blomster","k":"blomster"}},
    fi: {"leaf":{"sg":"lehti","pl":"lehdet","n":"lehteä","p":"lehtiä","g":null,"q":"","lab":"Lehdet","k":"lehtien"},"raspberry":{"sg":"vadelma","pl":"vadelmat","n":"vadelmaa","p":"vadelmia","g":null,"q":"","lab":"Vadelmat","k":"vadelmien"},"acorn":{"sg":"tammenterho","pl":"tammenterhot","n":"tammenterhoa","p":"tammenterhoja","g":null,"q":"","lab":"Tammen­terhot","k":"tammenterhojen"},"pinecone":{"sg":"käpy","pl":"kävyt","n":"käpyä","p":"käpyjä","g":null,"q":"","lab":"Kävyt","k":"käpyjen"},"mushroom":{"sg":"sieni","pl":"sienet","n":"sientä","p":"sieniä","g":null,"q":"","lab":"Sienet","k":"sienten"},"flower":{"sg":"kukka","pl":"kukat","n":"kukkaa","p":"kukkia","g":null,"q":"","lab":"Kukat","k":"kukkien"}}
  },/*NOUNS-END*/
  defaults: { level: 'read', rail: 'show' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'build', labelKey: 'lBuild' }, { value: 'read', labelKey: 'lRead' }, { value: 'scaled', labelKey: 'lScaled' }] },
    { key: 'rail', type: 'choice', labelKey: 'setRail', options: [{ value: 'show', labelKey: 'rShow' }, { value: 'hide', labelKey: 'rHide' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._drag = null; this._themes = {}; this._picsReady = false; this._sel = null;
    injectLevelRailCSS();
    if (typeof LCSPictures !== 'undefined') {
      Promise.all(this.THEMES.map(function (d) { return LCSPictures.load(d).then(function (t) { self._themes[d] = t; }); }))
        .then(function () { self._picsReady = true; if (self._wrap) self._paint(); })
        .catch(function () { self._picsReady = true; });
    } else this._picsReady = true;
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
  _level: function () { return LevelRailCore.levelOf(this._setting('level')); },
  /* the rail: hidden by the setting or in build rounds until a miss lays it */
  _railShown: function () { var st = this.st; if (st && LevelRailCore.isBuild(st.round)) return !!(st.misses && this._view.tool); return this._setting('rail') !== 'hide' || !!(st && (st.misses || this._view.tool)); },
  _loc: function () { return LevelRailCore.locOf(this.api && this.api.lang); },
  _key: function () { return this._level(); },
  _noun: function (c) { var N = this.NOUNS[this._loc()] || this.NOUNS.en; return N[c] || this.NOUNS.en[c]; },
  _cap: function (s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; },
  /* a value written the way the round counts: halves as «½» */
  _num: function (v) { return Math.floor(v) + (v % 1 ? '½' : ''); },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = LevelRailCore.rounds(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = LevelRailCore, pool = this._ensurePool(), n = C.passSize(this._level()), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(this._level(), Math.random, fresh ? null : this._prev); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'level-rail.' + this._key() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  /* the words for a round: every category token comes with its agreeing forms */
  _args: function () {
    var st = this.st, r = st.round, C = LevelRailCore, self = this, a = {};
    var put = function (pre, c) { if (!c) return; var N = self._noun(c); a[pre] = N.pl; a[pre + 'n'] = N.n; a[pre + 'p'] = N.p; a[pre + 's'] = N.sg; a[self._cap(pre)] = self._cap(N.pl); a[self._cap(pre) + 'p'] = self._cap(N.p); a[self._cap(pre) + 'n'] = self._cap(N.n); a['q' + pre] = N.q; };
    put('a', r.a); put('b', r.b);
    if (r.a) a.ak = this._noun(r.a).k; if (r.b) a.bk = this._noun(r.b).k;
    if (r.a && r.b) { var loC = r.data[r.a] <= r.data[r.b] ? r.a : r.b, hiC = loC === r.a ? r.b : r.a; a.lok = this._noun(loC).k; a.hik = this._noun(hiC).k; }
    /* before coordinated nouns the interrogative agrees with the first (es/pt/it) */
    if (r.a && r.b) a.qab = this._noun(r.a).q;
    a.k = r.eat; a.by = r.by; a.s = r.s;
    var ans = C.answerOf(r);
    if (typeof ans === 'number') a.n = ans;
    if (r.kind === 'more' || r.kind === 'tf') a.d = r.data[r.a] - r.data[r.b];
    if (r.kind === 'most') { put('m', ans); }
    if (r.kind === 'value' && r.pics) a.p = this._num(r.data[r.a] / r.s);
    a.post = r.s > 1 && !r.pics ? this._t('postBy' + r.s) : '';
    a.list = this._sayList(C.countList(st), r);
    /* a build miss: what this picket says, what the card says, one plank (or picture) per step */
    if (C.isBuild(r) && st.verdict && st.verdict.cat) { var bc = st.verdict.cat; a.n = this._num(st.fence[bc]); a.m = this._num(r.data[bc]); a.list = this._buildList(bc); }
    return a;
  },
  _taskLine: function () {
    var r = this.st.round, k = r.kind, key;
    if (k === 'build') key = r.s > 1 ? (r.pics ? 'qBuildPicsBy' : 'qBuildBy') : { tally: 'qBuildTally', pics: 'qBuildPics', table: 'qBuildTable' }[r.source];
    else if (k === 'fix') key = 'qFix';
    else if (k === 'value') key = r.pics ? 'qValuePics' : 'qValuePost';
    else if (k === 'more' && r.s > 1) key = r.pics ? 'qMorePics' : 'qMorePost';
    else key = { more: 'qMore', fewer: 'qFewer', total: 'qTotal', most: 'qMost', left: 'qLeft', tf: 'qTF' }[k];
    return this._t(key, this._args());
  },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers(); this._endDrag();
    this.st = LevelRailCore.newState(this._level(), k);
    this._sel = null;
    this._view = { note: '', soft: false, tags: false, tool: false, wobble: null, glow: null, run: -1 };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0); this._render2(); this._watchWidth(); },
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
    var wrap = api.el('div', 'lr-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="lr-main"><div class="lr-fencebox" data-qa="fence"></div></div><div class="lr-side"><div class="lr-card" data-qa="card"></div><div class="lr-answer" data-qa="answer"></div><p class="lr-note" data-qa="note" aria-live="polite"></p><div class="lr-ctrl"></div></div>';
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  /* the fence geometry for the card width: post, picket pitch, plank height, label pictures */
  _geometry: function (W) {
    var st = this.st, r = st.round, C = LevelRailCore, n = st.cats.length, wide = W >= 600, cramp = W < 300;
    var post = C.postNow(st), basket = r.kind === 'left';
    var fw = wide ? W - 196 : W, postW = wide ? 34 : 28, x0 = 4, bw = basket ? (wide ? 92 : 64) : 0;
    var pitch = Math.floor(Math.min(wide ? 128 : 92, (fw - x0 - postW - 6 - bw) / n));
    var lab = wide ? Math.min(96, pitch - 3) : cramp ? Math.min(52, pitch - 4) : Math.min(64, pitch - 4);
    var mark = r.pics ? (wide ? 48 : cramp ? 30 : 36) : 0;
    var uh = r.pics ? mark : (wide ? 26 : cramp ? 16 : 20) * (post.steps > 10 ? 0.5 : 1);
    /* a second label line only when a word (split at its soft hyphens) is wider than a picket */
    var self = this, two = st.cats.some(function (c) { var w = self._noun(c).lab; return w.length * (wide ? 9 : 8) > pitch - 4; });
    var top = wide ? 22 : cramp ? 10 : 16, labH = lab + (two ? 42 : 26);
    return { W: W, wide: wide, cramp: cramp, n: n, fw: fw, postW: postW, x0: x0, pitch: pitch, pw: Math.min(pitch - 12, wide ? 72 : 56), lab: lab, mark: mark, uh: uh, steps: post.steps, s: post.s,
      top: top, ground: top + post.steps * uh, H: top + post.steps * uh + labH, basket: bw };
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _paint_: function () {
    var st = this.st, v = this._view, g = this._g = this._geometry(this._width());
    this._wrap.className = 'lr-wrap is-' + st.round.kind + (g.wide ? ' is-wide' : ' is-narrow') + (g.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '');
    this._paintCard(); this._paintFence(); this._paintAnswer(); this._paintCtrl();
    var note = this._qs('.lr-note');
    note.textContent = v.note || ''; note.className = 'lr-note' + (v.note && !v.soft ? ' is-hint' : '');
    this._setPrompt();
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); },
  _pic: function (c, size, cls) {
    var p = c === 'squirrel' ? ['forest-creatures', 'squirrel'] : LevelRailCore.PIC[c], loc = this._loc();
    if (!this._picsReady || typeof LCSPictures === 'undefined' || !this._themes[p[0]]) { var d = this.api.el('div', cls + ' lr-picwait'); d.style.width = size + 'px'; d.style.height = size + 'px'; return d; }
    var im = LCSPictures.img(this._themes[p[0]], p[1], loc, { size: size }); im.className = cls; im.style.width = size + 'px'; im.style.height = size + 'px'; im.alt = ''; return im;
  },

  /* ---- the source card (build rounds) or the key card (picture fences) ---- */
  _paintCard: function () {
    var st = this.st, r = st.round, el = this._qs('.lr-card'), self = this, g = this._g, v = this._view;
    el.innerHTML = '';
    /* the key card (one picture = s) sits in the answer row on a phone */
    var show = LevelRailCore.isBuild(r) || (r.pics && r.s > 1 && g.wide);
    el.style.display = show ? '' : 'none'; if (!show) return;
    el.className = 'lr-card is-' + (LevelRailCore.isBuild(r) ? r.source : 'key') + (v.glowCard ? ' is-glow' : '');
    if (!LevelRailCore.isBuild(r)) {
      /* the key: one picture = s */
      var key = this.api.el('div', 'lr-key'); key.appendChild(this._pic(r.cats[0], g.wide ? 44 : 36, 'lr-keypic'));
      key.insertAdjacentHTML('beforeend', '<span class="lr-keyeq">= ' + r.s + '</span>'); el.appendChild(key); return;
    }
    var help = st.help && st.verdict && st.verdict.why === 'build' ? st.verdict.cat : null;
    r.cats.forEach(function (c) {
      var row = self.api.el('div', 'lr-row' + (help === c ? ' is-lit' : '')); row.setAttribute('data-cat', c);
      /* a picture card's marks name their own category; tally and table rows carry the category picture */
      if (r.source !== 'pics') row.appendChild(self._pic(c, g.wide ? 40 : 34, 'lr-rowpic'));
      var val = r.data[c], marks = self.api.el('span', 'lr-marks');
      if (r.source === 'tally') {
        var h = '<svg viewBox="0 0 ' + (Math.ceil(val / 5) * 44) + ' 30" width="' + (Math.ceil(val / 5) * 44) + '" height="30" aria-hidden="true">';
        for (var i = 0; i < val; i++) { var gi = Math.floor(i / 5), j = i % 5, x = gi * 44 + 5 + j * 7; h += j < 4 ? '<line x1="' + x + '" y1="4" x2="' + x + '" y2="26" class="lr-tally' + (help === c ? ' is-n' : '') + '"/>' : '<line x1="' + (gi * 44 + 1) + '" y1="22" x2="' + (gi * 44 + 31) + '" y2="8" class="lr-tally"/>'; }
        marks.innerHTML = h + '</svg>';
      } else if (r.source === 'pics') {
        for (var q = 0; q < val; q++) marks.appendChild(self._pic(c, g.wide ? 30 : 22, 'lr-dot'));
      } else marks.innerHTML = '<b class="lr-tnum">' + val + '</b>';
      marks.setAttribute('aria-label', String(val));
      row.appendChild(marks); el.appendChild(row);
    });
  },

  /* ---- the fence ---- */
  _y: function (val) { var g = this._g; return g.ground - (val / g.s) * g.uh; },
  _cx: function (i) { var g = this._g; return g.x0 + g.postW + 6 + g.pitch * (i + 0.5); },
  _paintFence: function () {
    var st = this.st, r = st.round, g = this._g, el = this._qs('.lr-fencebox'), self = this, C = LevelRailCore, v = this._view;
    el.innerHTML = '';
    var f = this.api.el('div', 'lr-fence'); this._fenceEl = f; f.style.width = (g.x0 + g.postW + 6 + g.pitch * g.n + g.basket) + 'px'; f.style.height = g.H + 'px';
    f.insertAdjacentHTML('beforeend', '<span class="lr-sky" aria-hidden="true"></span><span class="lr-ground" style="top:' + g.ground + 'px"></span>');
    /* the number post: a tick every unit step, a numeral every step of the scale (every 2nd on a 20-post) */
    var tickEvery = r.s === 2 ? 1 : r.s, every = g.steps > 10 ? 2 : 1;
    var p = '<svg class="lr-post" style="left:' + g.x0 + 'px;top:0" width="' + g.postW + '" height="' + (g.ground + 2) + '" aria-hidden="true"><rect x="' + (g.postW - 12) + '" y="' + (g.top - 10) + '" width="10" height="' + (g.ground - g.top + 12) + '" rx="3" class="lr-postwood"/>';
    for (var sv = 0; sv <= g.steps * g.s; sv += tickEvery) {
      var y = this._y(sv), whole = sv % g.s === 0, step = sv / g.s;
      p += '<line x1="' + (g.postW - (whole ? 16 : 10)) + '" y1="' + y + '" x2="' + (g.postW - 2) + '" y2="' + y + '" class="lr-tick"/>';
      if (whole && step % every === 0) p += '<text x="' + (g.postW - 18) + '" y="' + (y + 5) + '" text-anchor="end" class="lr-pnum">' + sv + '</text>';
    }
    f.insertAdjacentHTML('beforeend', p + '</svg>');
    /* guide lines at each numbered step */
    for (var gs = 1; gs <= g.steps; gs++) if (gs % every === 0) f.insertAdjacentHTML('beforeend', '<span class="lr-guide" style="top:' + this._y(gs * g.s) + 'px;left:' + (g.x0 + g.postW) + 'px;width:' + (g.pitch * g.n + 6) + 'px"></span>');
    var level = C.isLevel(st), over = level ? C.overhang(st) : [], railY = st.rail.y, tags = v.tags ? this._tagPlan() : {};
    st.cats.forEach(function (c, i) {
      var cx = self._cx(i), parts = [];
      /* the picket's own planks, then the stacked one's on top (each keeps its colour band) */
      if (!(st.stack && st.stack.from === c)) parts.push({ c: c, from: 0, to: st.fence[c] });
      if (st.stack && st.stack.onto === c) parts.push({ c: st.stack.from, from: st.fence[c], to: st.fence[c] + st.fence[st.stack.from] });
      var col = self.api.el('div', 'lr-picket' + (v.wobble && v.wobble.indexOf(c) >= 0 ? ' is-wobble' : '') + (v.glow === c ? ' is-glow' : '') + (self._sel === c ? ' is-sel' : '') + (st.answer === c ? ' is-chosen' : ''));
      col.style.left = (cx - g.pw / 2) + 'px'; col.style.width = g.pw + 'px'; col.style.top = g.top + 'px'; col.style.height = (g.ground - g.top) + 'px';
      col.setAttribute('data-cat', c);
      parts.forEach(function (pt, pi) {
        /* one plank (or picture) per step of the scale, counted from the part's foot; a last half step only where the scale is 2 */
        for (var lo = pt.from; lo < pt.to; lo = hi) {
          var hi = Math.min(pt.to, lo + r.s), half = hi - lo < r.s;
          var top = self._y(hi) - g.top, h = (hi - lo) / g.s * g.uh, over = level && hi > railY;
          var cls = 'lr-plank' + (pi ? ' is-stacked' : '') + (over ? ' is-over' : '') + (half ? ' is-half' : '') + (hi === pt.to && pi === parts.length - 1 ? ' is-cap' : '');
          var d;
          if (r.pics) { d = self.api.el('div', cls + ' lr-pmark' + (half ? ' is-halfpic' : '')); d.setAttribute('data-mark', '1'); d.appendChild(self._pic(pt.c, g.mark, 'lr-markpic')); }
          else d = self.api.el('div', cls);
          d.style.top = top + 'px'; d.style.height = h + 'px';
          var tg = tags[c] && tags[c][hi];
          if (tg != null) d.insertAdjacentHTML('beforeend', '<b class="lr-tag">' + self._num(tg) + '</b>');
          col.appendChild(d);
        }
      });
      /* the picket's hit area and its words */
      var shown = C.topOf(st, c), planks = Math.round(shown / r.s * 2) / 2;
      var hit = self._btn('lr-hit', 'picket-' + c, self._t(st.done || st.rail.on === c && level ? 'aPicketVal' : r.pics ? 'aPicketPics' : 'aPicket', { lab: self._noun(c).lab, k: self._num(planks), v: self._num(shown) }), '');
      hit.addEventListener('pointerdown', function (e) { if (e.button) return; self._pressPicket(e, c); });
      hit.addEventListener('keydown', function (e) { self._picketKey(e, c); });
      /* build rounds: a pull tab on every picket top, empty ones too, so the child sees where to pull */
      if (C.isBuild(r) && !st.done) { var grip = self.api.el('span', 'lr-grip'); grip.style.top = (self._y(st.fence[c]) - g.top - 14) + 'px'; grip.setAttribute('aria-hidden', 'true'); col.appendChild(grip); }
      col.appendChild(hit);
      f.appendChild(col);
      /* the label picture under the ground, with its word */
      var lab = self.api.el('div', 'lr-label'); lab.style.left = (cx - g.pitch / 2) + 'px'; lab.style.width = g.pitch + 'px'; lab.style.top = (g.ground + 4) + 'px';
      lab.appendChild(self._pic(c, g.lab, 'lr-labpic')); lab.insertAdjacentHTML('beforeend', '<span class="lr-labword">' + self._esc(self._noun(c).lab) + '</span>');
      f.appendChild(lab);
    });
    if (g.basket) this._paintBasket(f);
    if (this._railShown()) this._paintRail(f, level);
    if (v.run >= 0) this._paintPip(f);
    el.appendChild(f);
  },
  /* miss 2: which plank tops carry a counting tag, per picket (value at the plank top → tag) */
  _tagPlan: function () {
    var st = this.st, r = st.round, C = LevelRailCore, out = {}, list = C.countList(st);
    var mark = function (c, base) { out[c] = {}; list.forEach(function (n) { out[c][base + n] = n; }); };
    if (r.kind === 'more' || r.kind === 'fewer' || r.kind === 'tf') { var hiC = r.data[r.a] >= r.data[r.b] ? r.a : r.b, lo = Math.min(r.data[r.a], r.data[r.b]); mark(hiC, lo); }
    else if (r.kind === 'total') mark(st.stack ? st.stack.onto : r.b, 0);
    else if (r.kind === 'left' || r.kind === 'value') mark(r.a, 0);
    return out;
  },
  _paintBasket: function (f) {
    var st = this.st, g = this._g, self = this, n = st.basket.length;
    var b = this._btn('lr-basket' + (this._view.glow === 'basket' ? ' is-glow' : ''), 'basket', this._t('aBasket', { k: n }), '<svg viewBox="0 0 80 56" aria-hidden="true"><path d="M6 18 H74 L66 54 H14 Z" class="lr-wicker"/><path d="M14 18 Q40 -6 66 18" fill="none" class="lr-handle"/><path d="M10 30 H70 M12 42 H68" class="lr-weave"/></svg><b class="lr-bcount">' + (n || '') + '</b>');
    b.style.left = (g.x0 + g.postW + 6 + g.pitch * g.n + 4) + 'px'; b.style.top = (g.ground - (g.wide ? 60 : 46)) + 'px'; b.style.width = (g.basket - 8) + 'px'; b.style.height = (g.wide ? 58 : 44) + 'px';
    b.disabled = st.done || !n;
    b.addEventListener('click', function () { if (LevelRailCore.putBack(st)) { self.api.sound(420); self._moved(); } });
    f.appendChild(b);
  },
  /* the rail: from the brass slider on the post to its foot on the rested picket's top */
  _paintRail: function (f, level) {
    var st = this.st, g = this._g, self = this, C = LevelRailCore, i = st.rail.on == null ? -1 : st.cats.indexOf(st.rail.on);
    var x1 = g.x0 + g.postW - 2, y1 = this._y(st.rail.y), x2 = i < 0 ? this._cx(g.n - 1) + g.pw / 2 : this._cx(i), y2 = i < 0 ? y1 : this._y(C.topOf(st, st.rail.on));
    var len = Math.hypot(x2 - x1, y2 - y1), ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI, tilt = C.tiltOf(st);
    var rail = this.api.el('div', 'lr-rail' + (level ? ' is-level' : '')); rail.setAttribute('aria-hidden', 'true');
    rail.style.left = x1 + 'px'; rail.style.top = (y1 - 9) + 'px'; rail.style.width = len + 'px'; rail.style.transform = 'rotate(' + ang + 'deg)';
    /* the vial: the bubble rides to the high end, centred only when level */
    rail.innerHTML = '<span class="lr-vial"><span class="lr-bubble" style="left:calc(50% - 7px + ' + (-tilt * 18).toFixed(1) + 'px)"></span></span>';
    f.appendChild(rail);
    var sl = this._btn('lr-slider' + (this._view.pulse ? ' is-pulse' : ''), 'slider', this._t('aSlider', { v: this._num(st.rail.y) }), '<svg viewBox="0 0 30 44" aria-hidden="true"><rect x="3" y="4" width="24" height="36" rx="6" class="lr-brass"/><path d="M27 22 L33 22" class="lr-pointer"/></svg>');
    sl.style.left = (g.x0 + g.postW - 30) + 'px'; sl.style.top = (y1 - 22) + 'px'; sl.disabled = st.done;
    sl.addEventListener('pointerdown', function (e) { if (e.button) return; self._pressSlider(e); });
    sl.addEventListener('keydown', function (e) { var d = e.key === 'ArrowUp' ? 1 : e.key === 'ArrowDown' ? -1 : 0; if (!d) return; e.preventDefault(); self._slide(st.rail.y + d * C.unitOf(st.round)); });
    f.appendChild(sl);
    if (level) f.insertAdjacentHTML('beforeend', '<b class="lr-read" style="left:' + (g.x0 + g.postW + 2) + 'px;top:' + (y1 - 30) + 'px">' + this._num(st.rail.y) + '</b>');
    var foot = this._btn('lr-foot', 'foot', this._t('aFoot', { lab: i < 0 ? '—' : this._noun(st.rail.on).lab }), '<span class="lr-footpad"></span>');
    foot.style.left = (x2 - 22) + 'px'; foot.style.top = (y2 - 30) + 'px'; foot.disabled = st.done;
    foot.addEventListener('pointerdown', function (e) { if (e.button) return; self._pressFoot(e); });
    foot.addEventListener('keydown', function (e) { var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!d) return; e.preventDefault(); var j = st.rail.on == null ? (d > 0 ? 0 : g.n - 1) : (st.cats.indexOf(st.rail.on) + d + g.n) % g.n; self._lay(st.cats[j]); });
    f.appendChild(foot);
  },
  /* the success show: Pip hops along the picket tops */
  _paintPip: function (f) {
    var st = this.st, g = this._g, i = Math.min(this._view.run, g.n - 1), sz = g.wide ? 64 : 48;
    var pip = this._pic('squirrel', sz, 'lr-pip'); pip.style.left = (this._cx(i) - sz / 2) + 'px'; pip.style.top = (this._y(LevelRailCore.topOf(st, st.cats[i])) - sz + 6) + 'px';
    f.appendChild(pip);
  },

  /* ---- the answer: the number dial, the True / False tags, or nothing ---- */
  _paintAnswer: function () {
    var st = this.st, r = st.round, el = this._qs('.lr-answer'), self = this, ty = LevelRailCore.answerType(r), g = this._g;
    el.innerHTML = ''; el.className = 'lr-answer is-' + ty;
    if (g.wide) el.appendChild(this._pic('squirrel', 96, 'lr-pipseat'));
    if (!g.wide && r.pics && r.s > 1) { var key = this.api.el('div', 'lr-card is-key lr-key'); key.appendChild(this._pic(r.cats[0], 32, 'lr-keypic')); key.insertAdjacentHTML('beforeend', '<span class="lr-keyeq">= ' + r.s + '</span>'); el.appendChild(key); }
    if (ty === 'dial') {
      var dial = this.api.el('div', 'lr-dial'); dial.setAttribute('role', 'group'); dial.setAttribute('aria-label', this._t('aDial'));
      [['t', 'aTens'], ['o', 'aOnes']].forEach(function (w) {
        var wheel = self.api.el('div', 'lr-wheel'), val = st.dial[w[0]];
        var shownD = val == null || (w[0] === 't' && val === 0) ? '' : String(val);
        var up = self._btn('lr-arrow is-up', 'dial-' + w[0] + '-up', self._t(w[1]) + ' +', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 15 L12 8 L19 15" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
        var dn = self._btn('lr-arrow is-down', 'dial-' + w[0] + '-down', self._t(w[1]) + ' −', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9 L12 16 L19 9" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
        up.disabled = dn.disabled = st.done;
        up.addEventListener('click', function () { self._turn(w[0], 1); }); dn.addEventListener('click', function () { self._turn(w[0], -1); });
        wheel.appendChild(g.wide ? up : dn); wheel.insertAdjacentHTML('beforeend', '<span class="lr-digit" aria-hidden="true">' + shownD + '</span>'); wheel.appendChild(g.wide ? dn : up);
        dial.appendChild(wheel);
      });
      dial.insertAdjacentHTML('beforeend', '<span class="lr-sr" aria-live="off">' + (st.answer == null ? '' : st.answer) + '</span>');
      el.appendChild(dial);
    } else if (ty === 'tf') {
      [[true, 'tTrue'], [false, 'tFalse']].forEach(function (o) {
        var b = self._btn('lr-tag-btn' + (st.answer === o[0] ? ' is-chosen' : '') + (st.help && self._view.ring === o[0] ? ' is-ring' : ''), o[0] ? 'true' : 'false', self._t(o[1]), self._esc(self._t(o[1])));
        b.setAttribute('aria-pressed', st.answer === o[0] ? 'true' : 'false'); b.disabled = st.done;
        b.addEventListener('click', function () { if (LevelRailCore.choose(st, o[0])) { self.api.sound(560); self._moved(); } });
        el.appendChild(b);
      });
    }
  },
  _paintCtrl: function () {
    var st = this.st, el = this._qs('.lr-ctrl'), self = this;
    el.innerHTML = '';
    var go = this._btn('lr-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._esc(this._t('checkBtn')) + '</span>');
    go.disabled = st.done; go.addEventListener('click', function () { self._check(); });
    el.appendChild(go);
  },

  /* ---------------- the hand ---------------- */
  _moved: function () { var v = this._view; v.note = ''; v.tags = false; v.tool = false; v.wobble = null; v.glow = null; v.glowCard = false; v.pulse = false; v.ring = null; this._paint(); },
  _turn: function (w, d) {
    var st = this.st, dl = st.dial, cur = dl[w];
    var nx = cur == null ? (d > 0 ? (w === 't' ? 1 : 1) : 9) : (cur + d + 10) % 10;
    var t = w === 't' ? nx : dl.t, o = w === 'o' ? nx : dl.o;
    if (LevelRailCore.setDial(st, t, o)) { this.api.sound(500); this._moved(); }
  },
  _slide: function (y) { if (LevelRailCore.setSlider(this.st, y)) { var lv = LevelRailCore.isLevel(this.st); this.api.sound(lv ? 880 : 360); this._moved(); if (lv) this.api.announce(this._t('anLevel')); return true; } return false; },
  _lay: function (c) { if (LevelRailCore.layRail(this.st, c)) { this.api.sound(400); this._moved(); if (LevelRailCore.isLevel(this.st)) this.api.announce(this._t('anLevel')); return true; } return false; },
  /* a tap on a picket: build +1 · total: pick then stack · most: the answer · left: one plank into the basket · otherwise: lay the rail */
  _tapPicket: function (c) {
    var st = this.st, r = st.round, C = LevelRailCore;
    if (st.done) return;
    if (C.isBuild(r)) { if (C.setPicket(st, c, st.fence[c] + C.unitOf(r))) { this.api.sound(600); this._moved(); } return; }
    if (r.kind === 'total') {
      if (st.stack) { if (C.unstack(st)) { this.api.sound(380); this._sel = null; this._moved(); } return; }
      if (this._sel == null || this._sel === c) { this._sel = this._sel === c ? null : c; this.api.sound(500); this._paint(); return; }
      if (C.stack(st, this._sel, c)) { this._sel = null; this.api.sound(700); this._moved(); }
      return;
    }
    if (r.kind === 'most') { if (C.choose(st, c)) { this.api.sound(560); this._moved(); } return; }
    if (r.kind === 'left') { if (C.take(st, c)) { this.api.sound(260); this._moved(); } return; }
    this._lay(c);
  },
  _picketKey: function (e, c) {
    var st = this.st, r = st.round, C = LevelRailCore, d = e.key === 'ArrowUp' ? 1 : e.key === 'ArrowDown' ? -1 : 0;
    if (d && C.isBuild(r)) { e.preventDefault(); if (C.setPicket(st, c, st.fence[c] + d * C.unitOf(r))) { this.api.sound(600); this._moved(); } return; }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._tapPicket(c); }
  },
  /* pointer on a picket: build rounds drag its top; left rounds drag its top plank to the basket; otherwise a tap */
  _pressPicket: function (e, c) {
    var self = this, st = this.st, r = st.round, C = LevelRailCore, g = this._g, y0 = e.clientY, moved = false, v0 = st.fence[c], ghost = null;
    e.preventDefault(); this._endDrag();
    var build = C.isBuild(r), left = r.kind === 'left';
    var mv = function (ev) {
      ev.preventDefault();
      if (!moved && Math.abs(ev.clientY - y0) < 6 && Math.abs(ev.clientX - e.clientX) < 6) return;
      moved = true;
      if (build) { var u = C.unitOf(r), steps = Math.round((y0 - ev.clientY) / (g.uh * u / g.s)), before = st.fence[c]; if (C.setPicket(st, c, v0 + steps * u)) { if (st.fence[c] !== before) self.api.sound(600); self._view.note = ''; self._paint(); } return; }
      if (left) {
        if (!ghost && st.fence[c] >= r.s) { ghost = document.createElement('span'); ghost.className = 'lr-ghost'; document.body.appendChild(ghost); }
        if (ghost) { ghost.style.left = (ev.clientX - 24) + 'px'; ghost.style.top = (ev.clientY - 10) + 'px'; }
      }
    };
    var up = function (ev) {
      self._endDrag();
      if (ghost) { ghost.remove(); var hit = document.elementFromPoint(ev.clientX, ev.clientY), bk = hit && hit.closest ? hit.closest('.lr-basket') : null; if (bk && C.take(st, c)) { self.api.sound(260); self._moved(); } return; }
      if (build && moved) { self._moved(); return; }
      if (!moved) self._tapPicket(c);
    };
    this._drag = { mv: mv, up: up };
    document.addEventListener('pointermove', mv); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  /* the slider: drag up and down the post, it snaps to every tick */
  _pressSlider: function (e) {
    var self = this, st = this.st, g = this._g, C = LevelRailCore;
    e.preventDefault(); this._endDrag();
    var mv = function (ev) { ev.preventDefault(); var r = self._fenceEl.getBoundingClientRect(), val = (g.ground - (ev.clientY - r.top)) / g.uh * g.s; var u = C.unitOf(st.round); val = Math.round(val / u) * u; if (val !== st.rail.y) self._slide(val); };
    var up = function () { self._endDrag(); };
    this._drag = { mv: mv, up: up };
    document.addEventListener('pointermove', mv); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  /* the free end: drag it along the fence and lay it on the nearest picket */
  _pressFoot: function (e) {
    var self = this, st = this.st, g = this._g;
    e.preventDefault(); this._endDrag();
    var near = function (cx) { var r = self._fenceEl.getBoundingClientRect(), x = cx - r.left, best = 0, bd = 1e9; for (var i = 0; i < g.n; i++) { var dd = Math.abs(self._cx(i) - x); if (dd < bd) { bd = dd; best = i; } } return st.cats[best]; };
    var mv = function (ev) { ev.preventDefault(); var c = near(ev.clientX); if (c !== st.rail.on) self._lay(c); };
    var up = function (ev) { self._endDrag(); var c = near(ev.clientX); if (c !== st.rail.on) self._lay(c); };
    this._drag = { mv: mv, up: up };
    document.addEventListener('pointermove', mv); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _endDrag: function () {
    var d = this._drag; if (!d || typeof document === 'undefined') return;
    document.removeEventListener('pointermove', d.mv); document.removeEventListener('pointerup', d.up); document.removeEventListener('pointercancel', d.up);
    this._drag = null;
  },

  /* ---------------- Check ---------------- */
  _check: function () {
    var st = this.st, v = this._view, C = LevelRailCore, r = st.round; if (st.done) return;
    var res = C.check(st);
    if (res.result === 'no') return;
    if (res.result === 'note') {
      v.note = this._t(res.key, this._args()); v.soft = true;
      v.glowCard = res.key === 'hintBuildStart'; v.pulse = res.key === 'hintReadStart';
      this.api.sound(300); this._paint(); this.api.announce(v.note); return;
    }
    if (res.result === 'ok') { this._success(); return; }
    v.soft = false; v.tool = true;
    if (C.isBuild(r)) {
      v.wobble = st.verdict.wrong; C.canonicalRail(st); v.tags = st.help;
      v.note = this._t(C.hint(st), { n: this._num(st.fence[st.verdict.cat]), m: this._num(r.data[st.verdict.cat]), list: this._buildList(st.verdict.cat), s: r.s });
    } else {
      /* miss 1 lays the tool; miss 2 also stacks (totals) and counts with tags */
      if (r.kind === 'total' && st.help && !st.stack) { st.stack = { from: r.a, onto: r.b }; }
      if (r.kind === 'total' && !st.help) v.wobble = [r.a, r.b];
      if (r.kind === 'left') { v.glow = r.a; }
      C.canonicalRail(st);
      if (st.help && r.kind === 'tf') v.ring = C.answerOf(r);
      v.tags = st.help && r.kind !== 'most';
      v.note = this._t(C.hint(st), this._args());
    }
    this._paint(); this.api.announce(v.note); this.api.sound(240);
  },
  /* miss 2 in a build round: one plank for each mark, counted by the scale */
  _buildList: function (c) { var r = this.st.round, out = [], d = r.data[c]; for (var v = r.s; v <= d; v += r.s) out.push(v); if (d % r.s) out.push(d); return this._sayList(out, r); },
  _sayList: function (list, r) {
    var last = list[list.length - 1];
    if (list.length && r.s > 1 && last % r.s) { var whole = list.slice(0, -1); return whole.map(this._num).join(', ') + this._t(r.pics ? 'halfPic' : 'halfPlank', { n: this._num(last) }); }
    return list.map(this._num).join(', ');
  },
  _success: function () {
    var st = this.st, v = this._view, C = LevelRailCore, self = this;
    var msg = this._t(C.okKey(st), this._args());
    v.note = ''; v.tags = false; v.wobble = null; v.glow = null; v.ring = null; v.run = 0;
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg); this.api.sound(988);
    var hop = function () { if (!self.st || self.st !== st) return; v.run++; if (v.run < st.cats.length) { self.api.sound(660 + v.run * 110); self._paint(); self._later(hop, self.FAST ? 30 : 260); } };
    this._later(hop, this.FAST ? 30 : 260);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectLevelRailCSS() {
  if (typeof document === 'undefined' || document.getElementById('lr-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2B2B2B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.lr-wrap{position:relative;width:100%;max-width:900px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .lr-wrap:focus{outline:none;}'
  + '.lr-wrap.is-wide{flex-direction:row;align-items:flex-start;justify-content:center;gap:14px;} .lr-main{display:flex;justify-content:center;} .lr-side{display:flex;flex-direction:column;align-items:center;gap:10px;} .lr-wrap.is-wide .lr-side{width:180px;flex:none;} .lr-wrap.is-narrow .lr-side{width:100%;} .lr-wrap.is-narrow .lr-card{order:-2;}'
  + '.lr-wrap.is-narrow{flex-direction:column;} .lr-wrap.is-cramp{gap:6px;} .lr-wrap.is-narrow.is-done .lr-answer,.lr-wrap.is-narrow.is-done .lr-ctrl,.lr-wrap.is-narrow.is-done .lr-card{display:none;} .lr-wrap.is-narrow .lr-main{order:2;} .lr-wrap.is-narrow .lr-side{display:contents;} .lr-wrap.is-narrow .lr-card{order:1;} .lr-wrap.is-narrow .lr-answer{order:3;} .lr-wrap.is-narrow .lr-note{order:4;} .lr-wrap.is-narrow .lr-ctrl{order:5;}'
  /* the fence */
  + '.lr-fence{position:relative;border-radius:12px;overflow:hidden;} .lr-sky{position:absolute;inset:0;background:linear-gradient(#EEF6F2,#F8F2E4);pointer-events:none;} .lr-ground{position:absolute;left:0;right:0;bottom:0;background:#E8D7AE;box-shadow:inset 0 3px 0 ' + INK + ';}'
  + '.lr-post{position:absolute;overflow:visible;} .lr-postwood{fill:#B98552;stroke:' + INK + ';stroke-width:2;} .lr-tick{stroke:' + INK + ';stroke-width:2;} .lr-pnum{font-family:' + H + ';font-weight:800;font-size:15px;fill:' + INK + ';} .lr-wrap.is-wide .lr-pnum{font-size:17px;}'
  + '.lr-guide{position:absolute;height:0;border-top:1px dashed rgba(43,43,43,.18);pointer-events:none;}'
  + '.lr-picket{position:absolute;} .lr-plank{position:absolute;left:0;right:0;box-sizing:border-box;background:#C9965F;border:2px solid ' + INK + ';border-bottom-width:1px;border-radius:2px;} .lr-plank.is-stacked{background:#E2B36F;} .lr-plank.is-half{background:repeating-linear-gradient(90deg,#C9965F 0 50%,#E9CFA8 50% 100%);}'
  + '.lr-plank.is-cap{border-radius:10px 10px 2px 2px;} .lr-plank.is-over{background:repeating-linear-gradient(135deg,#C9965F 0 6px,#F6E3C2 6px 12px);outline:2px solid #146B5E;outline-offset:-3px;z-index:1;}'
  + '.lr-pmark{background:none;border:0;display:flex;align-items:center;justify-content:center;} .lr-pmark.is-cap{border-radius:0;} .lr-pmark.is-over{background:rgba(20,107,94,.12);outline:2px dashed #146B5E;} .lr-pmark.is-halfpic .lr-markpic{clip-path:inset(0 50% 0 0);} .lr-pmark.is-halfpic::after{content:"";position:absolute;right:6px;top:4px;bottom:4px;width:calc(50% - 6px);border:2px dashed rgba(43,43,43,.25);border-left:0;border-radius:0 8px 8px 0;}'
  + '.lr-picket.is-wobble{animation:lrWob .4s ease 2;} @keyframes lrWob{25%{transform:rotate(-2deg)}75%{transform:rotate(2deg)}} .lr-picket.is-glow .lr-plank,.lr-picket.is-sel .lr-plank{box-shadow:0 0 0 3px #F2784B;} .lr-picket.is-chosen .lr-plank{box-shadow:0 0 0 3px #146B5E;}'
  + '.lr-tag{position:absolute;right:-12px;top:-10px;min-width:24px;height:24px;padding:0 4px;border-radius:12px;background:#146B5E;color:#fff;font:800 14px/24px ' + H + ';text-align:center;z-index:3;}'
  + '.lr-hit{position:absolute;left:-6px;right:-6px;top:0;bottom:-4px;border:0;background:none;padding:0;cursor:pointer;z-index:2;touch-action:none;} .lr-hit:focus-visible{outline:3px solid #146B5E;outline-offset:2px;border-radius:8px;}'
  + '.lr-grip{position:absolute;left:50%;width:36px;height:12px;margin-left:-18px;border-radius:6px;background:#146B5E;box-shadow:0 2px 0 #0E4C43;pointer-events:none;z-index:1;} .lr-grip::before{content:"";position:absolute;left:12px;right:12px;top:4px;height:0;border-top:2px solid rgba(255,255,255,.7);}'
  + '.lr-wrap.is-build .lr-hit,.lr-wrap.is-fix .lr-hit{cursor:ns-resize;}'
  + '.lr-label{position:absolute;display:flex;flex-direction:column;align-items:center;gap:0;} .lr-labword{max-width:100%;font-family:' + B + ';font-weight:800;font-size:14px;color:' + INK + ';line-height:1.15;text-align:center;hyphens:manual;overflow-wrap:break-word;} .lr-wrap.is-wide .lr-labword{font-size:16px;} .lr-labpic,.lr-markpic,.lr-rowpic,.lr-dot,.lr-keypic,.lr-pip,.lr-pipseat{display:block;object-fit:contain;}'
  /* the rail */
  + '.lr-rail{position:absolute;height:18px;transform-origin:0 9px;background:rgba(255,255,255,.42);border:2px solid ' + INK + ';border-radius:5px;box-sizing:border-box;z-index:4;pointer-events:none;transition:transform .2s,top .2s;} .lr-rail.is-level{box-shadow:0 0 0 3px rgba(20,107,94,.35);}'
  + '.lr-vial{position:absolute;left:50%;top:1px;width:60px;height:12px;margin-left:-30px;border-radius:7px;background:#9BD27E;border:1.5px solid ' + INK + ';overflow:hidden;} .lr-bubble{position:absolute;top:1px;width:14px;height:8px;border-radius:5px;background:#fff;transition:left .25s;} .lr-rail.is-level .lr-vial{background:#6BBF59;}'
  + '.lr-slider{position:absolute;z-index:5;width:44px;height:44px;padding:0;border:0;background:none;cursor:ns-resize;touch-action:none;} .lr-slider svg{width:30px;height:44px;overflow:visible;} .lr-brass{fill:#D9A93A;stroke:' + INK + ';stroke-width:2;} .lr-pointer{stroke:' + INK + ';stroke-width:3;} .lr-slider:focus-visible{outline:3px solid #146B5E;border-radius:8px;} .lr-slider.is-pulse{animation:lrPulse .5s ease 3;} @keyframes lrPulse{50%{transform:scale(1.15)}}'
  + '.lr-foot{position:absolute;z-index:5;width:44px;height:44px;padding:0;border:0;background:none;cursor:ew-resize;touch-action:none;} .lr-footpad{position:absolute;left:12px;top:22px;width:20px;height:12px;border-radius:4px;background:#D9A93A;border:2px solid ' + INK + ';} .lr-foot:focus-visible{outline:3px solid #146B5E;border-radius:8px;}'
  + '.lr-read{position:absolute;z-index:6;min-width:28px;padding:0 6px;border-radius:8px;background:#146B5E;color:#fff;font:800 17px/26px ' + H + ';text-align:center;pointer-events:none;}'
  + '.lr-basket{position:absolute;z-index:3;padding:0;border:0;background:none;cursor:pointer;} .lr-basket svg{width:100%;height:100%;} .lr-wicker{fill:#C8955A;stroke:' + INK + ';stroke-width:2.5;} .lr-handle{stroke:' + INK + ';stroke-width:3;} .lr-weave{stroke:#8A5E2E;stroke-width:2;} .lr-basket.is-glow{filter:drop-shadow(0 0 6px #F2784B);} .lr-bcount{position:absolute;left:0;right:0;top:40%;font:800 16px ' + H + ';color:#fff;text-align:center;} .lr-basket:disabled{cursor:default;}'
  + '.lr-ghost{position:fixed;z-index:60;width:48px;height:20px;border-radius:3px;background:#C9965F;border:2px solid ' + INK + ';pointer-events:none;}'
  + '.lr-pip{position:absolute;z-index:7;transition:left .22s,top .22s;}'
  /* the card */
  + '.lr-card{display:flex;flex-direction:column;gap:4px;padding:8px 10px;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #E2D4B4;} .lr-card.is-glow{box-shadow:inset 0 0 0 3px #F2784B;} .lr-wrap.is-narrow .lr-card{flex-direction:row;flex-wrap:wrap;justify-content:center;gap:4px 12px;}'
  + '.lr-row{display:flex;align-items:center;gap:6px;padding:2px 4px;border-radius:8px;} .lr-row.is-lit{background:rgba(242,120,75,.18);} .lr-marks{display:flex;flex-wrap:wrap;align-items:center;gap:2px;} .lr-tally{stroke:' + INK + ';stroke-width:3;stroke-linecap:round;} .lr-tnum{font:800 28px ' + H + ';color:' + INK + ';}'
  + '.lr-key{display:flex;align-items:center;gap:6px;} .lr-keyeq{font:800 26px ' + H + ';color:' + INK + ';}'
  /* the answer */
  + '.lr-answer{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;} .lr-wrap.is-wide .lr-answer{flex-direction:column;} .lr-answer.is-none .lr-pipseat,.lr-answer.is-picket .lr-pipseat{margin:0;}'
  + '.lr-dial{display:flex;gap:8px;} .lr-wheel{display:flex;flex-direction:column;align-items:center;gap:2px;padding:4px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 2px #CFC6B4;} .lr-wrap.is-narrow .lr-wheel{flex-direction:row;}'
  + '.lr-digit{min-width:40px;height:52px;display:flex;align-items:center;justify-content:center;font:800 44px ' + H + ';color:' + INK + ';} .lr-arrow{width:48px;height:48px;padding:10px;border:0;border-radius:10px;background:#E6F0EC;color:#146B5E;cursor:pointer;} .lr-arrow:focus-visible{outline:3px solid #146B5E;} .lr-arrow:disabled{opacity:.5;}'
  + '.lr-tag-btn{min-width:130px;height:56px;padding:0 14px;border:0;border-radius:14px;background:#F1E8D6;box-shadow:inset 0 -3px 0 #D6C7A6;font:800 20px ' + H + ';color:' + INK + ';cursor:pointer;} .lr-tag-btn.is-chosen{background:#146B5E;color:#fff;box-shadow:none;} .lr-tag-btn.is-ring{box-shadow:0 0 0 3px #F2784B;} .lr-tag-btn:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
  + '.lr-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}'
  + '.lr-note{margin:0;min-height:1.3em;max-width:560px;font-family:' + B + ';font-weight:700;font-size:17px;color:#146B5E;text-align:center;} .lr-note.is-hint{color:#A3401F;} .lr-note:empty{display:none;} .lr-wrap.is-narrow .lr-note{font-size:16px;} .lr-wrap.is-cramp .lr-note{font-size:15px;line-height:1.25;} .lr-wrap.is-cramp .lr-go{min-height:46px;}'
  + '.lr-ctrl{display:flex;justify-content:center;} .lr-go{display:inline-flex;align-items:center;gap:8px;min-height:52px;padding:0 26px;border:0;border-radius:14px;background:#146B5E;color:#fff;font:800 20px ' + H + ';box-shadow:0 4px 0 #0E4C43;cursor:pointer;} .lr-go svg{width:22px;height:22px;} .lr-go:disabled{opacity:.45;cursor:default;} .lr-go:focus-visible{outline:3px solid #F2784B;outline-offset:3px;}'
  + '@media (prefers-reduced-motion:reduce){.lr-wrap *{animation:none !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'lr-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.LevelRailActivity = LevelRailActivity;
