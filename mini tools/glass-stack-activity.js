/* =====================================================================
   glass-stack-activity.js — ACTIVITY #148 of the one-by-one rebuild:
   "Comet's Big Leaps" → THE GLASS STACK (2.NBT.B.8; G1-131, G1-132,
   G2-226, G2-321/322/323; all 11 locales). Model: glass-stack-core.js
   (GlassStackCore). Design: docs/activities-rebuild/designs/148-comet-kangaroo.md
   ---------------------------------------------------------------------
   The invention: the numbers live in a stack of glass hundred-charts.
   On a sheet, the row is the tens digit and the column the ones digit;
   the spine of ten sheet edges is the hundreds. One more is a step
   across, ten more a step down, a hundred more the same square one sheet
   deeper. The child types where Comet will land BEFORE she leaps; Check
   plants the child's number as a flag where THAT number lives, then
   Comet leaps — a miss is read by which axis the flag is off on. Off the
   bottom edge, Comet drops onto the next sheet (296 + 10 = 306).
   No timer, no score, no words on the apparatus: numerals and arrows.
   Test seams: window.GlassStackActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._geo / ._move / ._dive /
   ._box / ._check / ._tap / .FAST / .OK_MS.
   ===================================================================== */
var GlassStackActivity = {
  id: 'glass-stack',
  /* the drawn apparatus (the hierarchy gate): the glass sheet, the spine, the leap card, the answer boxes */
  apparatusClasses: ['gk-art'],
  /*STRINGS-BEGIN*/strings: {
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    title: {"en":"Comet's Big Leaps","de":"Komets große Sprünge","fr":"Les grands sauts de Comète","es":"Los grandes saltos de Cometa","pt":"Os grandes saltos de Cometa","it":"I grandi salti di Cometa","nl":"Komeets grote sprongen","sv":"Komets stora hopp","da":"Komets store hop","no":"Komets store hopp","fi":"Komeetan isot loikat"},
    instruction: {"en":"Type where Comet will land, then watch her leap. Down is 10 more and right is 1 more; 100 more is the same square on the next sheet.","de":"Tipp ein, wo Komet landet, und schau dann zu, wie sie springt. Nach unten ist 10 mehr, nach rechts 1 mehr; 100 mehr ist dasselbe Feld auf der nächsten Tafel.","fr":"Tape où Comète va atterrir, puis regarde-la sauter. Vers le bas, c’est 10 de plus ; vers la droite, 1 de plus ; 100 de plus, c’est la même case sur la plaque suivante.","es":"Escribe dónde va a caer Cometa y luego mírala saltar. Hacia abajo es 10 más y hacia la derecha, 1 más; 100 más es la misma casilla en la siguiente hoja.","pt":"Digite onde a Cometa vai cair e depois veja o salto dela. Para baixo é 10 a mais, para a direita é 1 a mais; 100 a mais é a mesma casa na próxima folha.","it":"Scrivi dove atterrerà Cometa, poi guardala saltare. In giù è 10 in più, a destra 1 in più; 100 in più è la stessa casella sulla lastra successiva.","nl":"Typ waar Komeet landt en kijk dan hoe ze springt. Naar beneden is 10 meer, naar rechts 1 meer; 100 meer is hetzelfde vakje op het volgende vel.","sv":"Skriv var Komet landar och titta sedan när hon hoppar. Nedåt är 10 mer, åt höger 1 mer; 100 mer är samma ruta på nästa glasskiva.","da":"Skriv, hvor Komet lander, og se hende så hoppe. Nedad er 10 mere, til højre 1 mere; 100 mere er det samme felt på den næste glasplade.","no":"Skriv hvor Komet lander, og se henne hoppe. Nedover er 10 mer, mot høyre 1 mer; 100 mer er den samme ruta på neste glassplate.","fi":"Kirjoita, mihin Komeetta laskeutuu, ja katso sitten sen loikka. Alas on 10 enemmän ja oikealle 1 enemmän; 100 enemmän on sama ruutu seuraavalla lasilevyllä."},
    qFollow: {"en":"Follow the arrows from {n}. Where does Comet end up?","de":"Folge den Pfeilen ab {n}. Wo landet Komet?","fr":"Suis les flèches à partir de {n}. Où arrive Comète ?","es":"Sigue las flechas desde {n}. ¿Dónde termina Cometa?","pt":"Siga as setas a partir de {n}. Onde a Cometa vai parar?","it":"Segui le frecce partendo da {n}. Dove arriva Cometa?","nl":"Volg de pijlen vanaf {n}. Waar komt Komeet uit?","sv":"Följ pilarna från {n}. Var hamnar Komet?","da":"Følg pilene fra {n}. Hvor ender Komet?","no":"Følg pilene fra {n}. Hvor havner Komet?","fi":"Seuraa nuolia luvusta {n}. Mihin Komeetta päätyy?"},
    qMystery: {"en":"Both arrows point to the same square. Which number is it?","de":"Beide Pfeile zeigen auf dasselbe Feld. Welche Zahl ist das?","fr":"Les deux flèches pointent vers la même case. Quel nombre est-ce ?","es":"Las dos flechas apuntan a la misma casilla. ¿Qué número es?","pt":"As duas setas apontam para a mesma casa. Que número é?","it":"Le due frecce indicano la stessa casella. Che numero è?","nl":"Beide pijlen wijzen naar hetzelfde vakje. Welk getal is het?","sv":"Båda pilarna pekar på samma ruta. Vilket tal är det?","da":"Begge pile peger på det samme felt. Hvilket tal er det?","no":"Begge pilene peker på den samme ruta. Hvilket tall er det?","fi":"Molemmat nuolet osoittavat samaan ruutuun. Mikä luku se on?"},
    qFar: {"en":"How many steps down and to the right from {a} to {b}?","de":"Wie viele Schritte nach unten und nach rechts von {a} bis {b}?","fr":"Combien de pas vers le bas et vers la droite de {a} à {b} ?","es":"¿Cuántos pasos hacia abajo y hacia la derecha hay de {a} a {b}?","pt":"Quantos passos para baixo e para a direita de {a} até {b}?","it":"Quanti passi in giù e a destra da {a} a {b}?","nl":"Hoeveel stappen naar beneden en naar rechts van {a} naar {b}?","sv":"Hur många steg nedåt och åt höger från {a} till {b}?","da":"Hvor mange skridt nedad og til højre fra {a} til {b}?","no":"Hvor mange steg nedover og mot høyre fra {a} til {b}?","fi":"Montako askelta alas ja oikealle luvusta {a} lukuun {b}?"},
    hintType: {"en":"Where will Comet land? Type the number first.","de":"Wo landet Komet? Tipp zuerst die Zahl ein.","fr":"Où Comète va-t-elle atterrir ? Tape d’abord le nombre.","es":"¿Dónde va a caer Cometa? Primero escribe el número.","pt":"Onde a Cometa vai cair? Primeiro digite o número.","it":"Dove atterrerà Cometa? Prima scrivi il numero.","nl":"Waar landt Komeet? Typ eerst het getal.","sv":"Var landar Komet? Skriv talet först.","da":"Hvor lander Komet? Skriv tallet først.","no":"Hvor lander Komet? Skriv tallet først.","fi":"Mihin Komeetta laskeutuu? Kirjoita ensin luku."},
    hintTypeFar: {"en":"Type the steps down and the steps to the right first.","de":"Tipp zuerst die Schritte nach unten und nach rechts ein.","fr":"Tape d’abord les pas vers le bas et vers la droite.","es":"Primero escribe los pasos hacia abajo y hacia la derecha.","pt":"Primeiro digite os passos para baixo e para a direita.","it":"Prima scrivi i passi in giù e a destra.","nl":"Typ eerst de stappen naar beneden en naar rechts.","sv":"Skriv först stegen nedåt och åt höger.","da":"Skriv først skridtene nedad og til højre.","no":"Skriv først stegene nedover og mot høyre.","fi":"Kirjoita ensin askeleet alas ja oikealle."},
    hintAxis: {"en":"{leap} moves along one line — only one digit changes.","de":"{leap} führt entlang einer Linie – nur eine Ziffer ändert sich.","fr":"{leap} fait avancer Comète sur une seule ligne : un seul chiffre change.","es":"{leap} avanza por una sola línea: solo cambia una cifra.","pt":"{leap} anda por uma só linha — só um algarismo muda.","it":"{leap} si muove lungo una sola linea: cambia una sola cifra.","nl":"{leap} gaat langs één lijn — er verandert maar één cijfer.","sv":"{leap} går längs en enda linje – bara en siffra ändras.","da":"{leap} går langs én linje – kun ét ciffer ændrer sig.","no":"{leap} går langs én linje – bare ett siffer endrer seg.","fi":"{leap} kulkee yhtä linjaa – vain yksi numero muuttuu."},
    hintEdge: {"en":"Comet went over the edge — look which sheet she is on now.","de":"Komet ist über den Rand gesprungen – schau, auf welcher Tafel sie jetzt ist.","fr":"Comète est passée par-dessus le bord : regarde sur quelle plaque elle est maintenant.","es":"Cometa pasó por el borde: mira en qué hoja está ahora.","pt":"A Cometa passou da borda — veja em que folha ela está agora.","it":"Cometa è andata oltre il bordo: guarda su quale lastra è adesso.","nl":"Komeet ging over de rand — kijk op welk vel ze nu staat.","sv":"Komet hoppade över kanten – titta vilken glasskiva hon är på nu.","da":"Komet hoppede ud over kanten – se, hvilken glasplade hun er på nu.","no":"Komet hoppet over kanten – se hvilken glassplate hun er på nå.","fi":"Komeetta hyppäsi reunan yli – katso, millä lasilevyllä se nyt on."},
    hintRowEnd: {"en":"Comet went past the edge of the row — look which row she is on now.","de":"Komet ist über den Rand der Reihe gesprungen – schau, in welcher Reihe Komet jetzt ist.","fr":"Comète a dépassé le bord de la ligne : regarde sur quelle ligne elle est maintenant.","es":"Cometa pasó del borde de la fila: mira en qué fila está ahora.","pt":"A Cometa passou da borda da linha — veja em que linha ela está agora.","it":"Cometa è andata oltre il bordo della riga: guarda in quale riga è adesso.","nl":"Komeet ging over de rand van de rij — kijk in welke rij ze nu staat.","sv":"Komet hoppade över radens kant – titta vilken rad hon är på nu.","da":"Komet hoppede ud over rækkens kant – se, hvilken række hun er i nu.","no":"Komet hoppet over kanten av raden – se hvilken rad hun er i nå.","fi":"Komeetta hyppäsi rivin reunan yli – katso, millä rivillä se nyt on."},
    hintTrail: {"en":"Follow the arrows one step at a time.","de":"Folge den Pfeilen Schritt für Schritt.","fr":"Suis les flèches un pas à la fois.","es":"Sigue las flechas paso a paso.","pt":"Siga as setas um passo de cada vez.","it":"Segui le frecce un passo alla volta.","nl":"Volg de pijlen stap voor stap.","sv":"Följ pilarna ett steg i taget.","da":"Følg pilene ét skridt ad gangen.","no":"Følg pilene ett steg om gangen.","fi":"Seuraa nuolia askel kerrallaan."},
    hintFar: {"en":"Count the steps down first, then the steps to the right.","de":"Zähl zuerst die Schritte nach unten, dann die nach rechts.","fr":"Compte d’abord les pas vers le bas, puis vers la droite.","es":"Cuenta primero los pasos hacia abajo y luego hacia la derecha.","pt":"Conte primeiro os passos para baixo, depois para a direita.","it":"Conta prima i passi in giù, poi quelli a destra.","nl":"Tel eerst de stappen naar beneden, dan naar rechts.","sv":"Räkna först stegen nedåt, sedan åt höger.","da":"Tæl først skridtene nedad, så til højre.","no":"Tell først stegene nedover, så mot høyre.","fi":"Laske ensin askeleet alas, sitten oikealle."},
    hintMove: {"en":"Move Comet yourself with the arrows and read where she lands.","de":"Bewege Komet selbst mit den Pfeilen und lies ab, wo sie landet.","fr":"Déplace Comète toi-même avec les flèches et lis où elle arrive.","es":"Mueve tú a Cometa con las flechas y lee dónde cae.","pt":"Mova a Cometa com as setas e veja onde ela cai.","it":"Muovi tu Cometa con le frecce e leggi dove arriva.","nl":"Verplaats Komeet zelf met de pijlen en lees af waar ze landt.","sv":"Flytta Komet själv med pilarna och läs var hon landar.","da":"Flyt selv Komet med pilene, og læs, hvor hun lander.","no":"Flytt Komet selv med pilene og les hvor hun lander.","fi":"Siirrä Komeettaa itse nuolilla ja katso, mihin se päätyy."},
    hintNoSheet: {"en":"That number is bigger than the whole stack.","de":"Diese Zahl ist größer als der ganze Stapel.","fr":"Ce nombre est plus grand que toute la pile.","es":"Ese número es más grande que toda la pila.","pt":"Esse número é maior que a pilha inteira.","it":"Quel numero è più grande di tutta la pila.","nl":"Dat getal is groter dan de hele stapel.","sv":"Det talet är större än hela högen.","da":"Det tal er større end hele stakken.","no":"Det tallet er større enn hele stabelen.","fi":"Se luku on suurempi kuin koko pino."},
    okOnes: {"en":"{start} {leap} is {land} — only the ones changed!","de":"{start} {leap} ist {land} – nur die Einer haben sich geändert!","fr":"{start} {leap}, c’est {land} — seules les unités ont changé !","es":"¡{start} {leap} es {land}: solo cambiaron las unidades!","pt":"{start} {leap} é {land} — só as unidades mudaram!","it":"{start} {leap} fa {land}: sono cambiate solo le unità!","nl":"{start} {leap} is {land} — alleen de eenheden zijn veranderd!","sv":"{start} {leap} är {land} – bara entalen ändrades!","da":"{start} {leap} er {land} – kun enerne ændrede sig!","no":"{start} {leap} er {land} – bare enerne endret seg!","fi":"{start} {leap} on {land} – vain ykköset muuttuivat!"},
    okTens: {"en":"{start} {leap} is {land} — only the tens changed!","de":"{start} {leap} ist {land} – nur die Zehner haben sich geändert!","fr":"{start} {leap}, c’est {land} — seules les dizaines ont changé !","es":"¡{start} {leap} es {land}: solo cambiaron las decenas!","pt":"{start} {leap} é {land} — só as dezenas mudaram!","it":"{start} {leap} fa {land}: sono cambiate solo le decine!","nl":"{start} {leap} is {land} — alleen de tientallen zijn veranderd!","sv":"{start} {leap} är {land} – bara tiotalen ändrades!","da":"{start} {leap} er {land} – kun tierne ændrede sig!","no":"{start} {leap} er {land} – bare tierne endret seg!","fi":"{start} {leap} on {land} – vain kympit muuttuivat!"},
    okHundreds: {"en":"{start} {leap} is {land} — only the hundreds changed!","de":"{start} {leap} ist {land} – nur die Hunderter haben sich geändert!","fr":"{start} {leap}, c’est {land} — seules les centaines ont changé !","es":"¡{start} {leap} es {land}: solo cambiaron las centenas!","pt":"{start} {leap} é {land} — só as centenas mudaram!","it":"{start} {leap} fa {land}: sono cambiate solo le centinaia!","nl":"{start} {leap} is {land} — alleen de honderdtallen zijn veranderd!","sv":"{start} {leap} är {land} – bara hundratalen ändrades!","da":"{start} {leap} er {land} – kun hundrederne ændrede sig!","no":"{start} {leap} er {land} – bare hundrerne endret seg!","fi":"{start} {leap} on {land} – vain sadat muuttuivat!"},
    okEdge: {"en":"{start} {leap} is {land} — over the edge onto another sheet!","de":"{start} {leap} ist {land} – über den Rand auf eine andere Tafel!","fr":"{start} {leap}, c’est {land} — par-dessus le bord, sur une autre plaque !","es":"¡{start} {leap} es {land}: por el borde hasta otra hoja!","pt":"{start} {leap} é {land} — pela borda até outra folha!","it":"{start} {leap} fa {land}: oltre il bordo, su un’altra lastra!","nl":"{start} {leap} is {land} — over de rand naar een ander vel!","sv":"{start} {leap} är {land} – över kanten till en annan glasskiva!","da":"{start} {leap} er {land} – ud over kanten til en anden glasplade!","no":"{start} {leap} er {land} – over kanten til en annen glassplate!","fi":"{start} {leap} on {land} – reunan yli toiselle lasilevylle!"},
    okRow: {"en":"{start} {leap} is {land} — past the edge of the row into another row!","de":"{start} {leap} ist {land} – über den Rand der Reihe in eine andere Reihe!","fr":"{start} {leap}, c’est {land} — au bout de la ligne, sur une autre ligne !","es":"¡{start} {leap} es {land}: por el borde de la fila hasta otra fila!","pt":"{start} {leap} é {land} — pela borda da linha até outra linha!","it":"{start} {leap} fa {land}: oltre il bordo della riga, in un’altra riga!","nl":"{start} {leap} is {land} — over de rand van de rij naar een andere rij!","sv":"{start} {leap} är {land} – över radens kant till en annan rad!","da":"{start} {leap} er {land} – ud over rækkens kant til en anden række!","no":"{start} {leap} er {land} – over kanten av raden til en annen rad!","fi":"{start} {leap} on {land} – rivin reunan yli toiselle riville!"},
    okTrail: {"en":"Comet got to {land}!","de":"Komet ist bei {land} angekommen!","fr":"Comète est arrivée à {land} !","es":"¡Cometa llegó a {land}!","pt":"A Cometa chegou a {land}!","it":"Cometa è arrivata a {land}!","nl":"Komeet is bij {land} aangekomen!","sv":"Komet kom fram till {land}!","da":"Komet nåede frem til {land}!","no":"Komet kom fram til {land}!","fi":"Komeetta pääsi lukuun {land}!"},
    okFar: {"en":"From {a} to {b}: {d} steps down and {r} to the right.","de":"Von {a} bis {b}: {d} Schritte nach unten und {r} nach rechts.","fr":"De {a} à {b} : {d} pas vers le bas et {r} vers la droite.","es":"De {a} a {b}: {d} pasos hacia abajo y {r} hacia la derecha.","pt":"De {a} até {b}: {d} passos para baixo e {r} para a direita.","it":"Da {a} a {b}: {d} passi in giù e {r} a destra.","nl":"Van {a} naar {b}: {d} stappen naar beneden en {r} naar rechts.","sv":"Från {a} till {b}: {d} steg nedåt och {r} åt höger.","da":"Fra {a} til {b}: {d} skridt nedad og {r} til højre.","no":"Fra {a} til {b}: {d} steg nedover og {r} mot høyre.","fi":"Luvusta {a} lukuun {b}: {d} askelta alas ja {r} oikealle."},
    aTyped: {"en":"Your number: {v}","de":"Deine Zahl: {v}","fr":"Ton nombre : {v}","es":"Tu número: {v}","pt":"Seu número: {v}","it":"Il tuo numero: {v}","nl":"Jouw getal: {v}","sv":"Ditt tal: {v}","da":"Dit tal: {v}","no":"Tallet ditt: {v}","fi":"Lukusi: {v}"},
    aBoxDown: {"en":"Steps down: {v}","de":"Schritte nach unten: {v}","fr":"Pas vers le bas : {v}","es":"Pasos hacia abajo: {v}","pt":"Passos para baixo: {v}","it":"Passi in giù: {v}","nl":"Stappen naar beneden: {v}","sv":"Steg nedåt: {v}","da":"Skridt nedad: {v}","no":"Steg nedover: {v}","fi":"Askeleet alas: {v}"},
    aBoxRight: {"en":"Steps to the right: {v}","de":"Schritte nach rechts: {v}","fr":"Pas vers la droite : {v}","es":"Pasos hacia la derecha: {v}","pt":"Passos para a direita: {v}","it":"Passi a destra: {v}","nl":"Stappen naar rechts: {v}","sv":"Steg åt höger: {v}","da":"Skridt til højre: {v}","no":"Steg mot høyre: {v}","fi":"Askeleet oikealle: {v}"},
    aToken: {"en":"Comet is on {n}","de":"Komet steht auf {n}","fr":"Comète est sur {n}","es":"Cometa está en {n}","pt":"A Cometa está no {n}","it":"Cometa è sul {n}","nl":"Komeet staat op {n}","sv":"Komet står på {n}","da":"Komet står på {n}","no":"Komet står på {n}","fi":"Komeetta on luvun {n} kohdalla"},
    aLanded: {"en":"Comet leapt. Your flag is on {f}.","de":"Komet ist gesprungen. Dein Fähnchen steht auf {f}.","fr":"Comète a sauté. Ton fanion est sur {f}.","es":"Cometa saltó. Tu banderín está en {f}.","pt":"A Cometa saltou. Sua bandeirinha está no {f}.","it":"Cometa ha saltato. La tua bandierina è sul {f}.","nl":"Komeet is gesprongen. Jouw vlaggetje staat op {f}.","sv":"Komet har hoppat. Din flagga står på {f}.","da":"Komet har hoppet. Dit flag står på {f}.","no":"Komet har hoppet. Flagget ditt står på {f}.","fi":"Komeetta loikkasi. Lippusi on luvun {f} kohdalla."},
    aDive: {"en":"Take Comet one sheet deeper (100 more)","de":"Komet eine Tafel tiefer bringen (100 mehr)","fr":"Emmener Comète une plaque plus bas (100 de plus)","es":"Llevar a Cometa una hoja más abajo (100 más)","pt":"Levar a Cometa uma folha mais para baixo (100 a mais)","it":"Portare Cometa una lastra più in basso (100 in più)","nl":"Komeet een vel dieper brengen (100 meer)","sv":"Flytta Komet en glasskiva djupare (100 mer)","da":"Flyt Komet én glasplade dybere (100 mere)","no":"Flytt Komet én glassplate dypere (100 mer)","fi":"Vie Komeetta yksi lasilevy syvemmälle (100 enemmän)"},
    aRise: {"en":"Take Comet one sheet up (100 less)","de":"Komet eine Tafel höher bringen (100 weniger)","fr":"Emmener Comète une plaque plus haut (100 de moins)","es":"Llevar a Cometa una hoja más arriba (100 menos)","pt":"Levar a Cometa uma folha mais para cima (100 a menos)","it":"Portare Cometa una lastra più in alto (100 in meno)","nl":"Komeet een vel hoger brengen (100 minder)","sv":"Flytta Komet en glasskiva högre upp (100 mindre)","da":"Flyt Komet én glasplade højere op (100 mindre)","no":"Flytt Komet én glassplate høyere opp (100 mindre)","fi":"Vie Komeetta yksi lasilevy ylemmäs (100 vähemmän)"},
    aUp: {"en":"Move Comet up","de":"Komet nach oben bewegen","fr":"Déplacer Comète vers le haut","es":"Mover a Cometa hacia arriba","pt":"Mover a Cometa para cima","it":"Spostare Cometa in su","nl":"Komeet naar boven verplaatsen","sv":"Flytta Komet uppåt","da":"Flyt Komet op","no":"Flytt Komet opp","fi":"Siirrä Komeettaa ylös"},
    aDown: {"en":"Move Comet down","de":"Komet nach unten bewegen","fr":"Déplacer Comète vers le bas","es":"Mover a Cometa hacia abajo","pt":"Mover a Cometa para baixo","it":"Spostare Cometa in giù","nl":"Komeet naar beneden verplaatsen","sv":"Flytta Komet nedåt","da":"Flyt Komet ned","no":"Flytt Komet ned","fi":"Siirrä Komeettaa alas"},
    aLeft: {"en":"Move Comet left","de":"Komet nach links bewegen","fr":"Déplacer Comète vers la gauche","es":"Mover a Cometa hacia la izquierda","pt":"Mover a Cometa para a esquerda","it":"Spostare Cometa a sinistra","nl":"Komeet naar links verplaatsen","sv":"Flytta Komet åt vänster","da":"Flyt Komet til venstre","no":"Flytt Komet mot venstre","fi":"Siirrä Komeettaa vasemmalle"},
    aRight: {"en":"Move Comet right","de":"Komet nach rechts bewegen","fr":"Déplacer Comète vers la droite","es":"Mover a Cometa hacia la derecha","pt":"Mover a Cometa para a direita","it":"Spostare Cometa a destra","nl":"Komeet naar rechts verplaatsen","sv":"Flytta Komet åt höger","da":"Flyt Komet til højre","no":"Flytt Komet mot høyre","fi":"Siirrä Komeettaa oikealle"},
    aDel: {"en":"Delete","de":"Löschen","fr":"Effacer","es":"Borrar","pt":"Apagar","it":"Cancella","nl":"Wissen","sv":"Radera","da":"Slet","no":"Slett","fi":"Poista"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Revisar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    setLeaps: {"en":"Leaps","de":"Sprünge","fr":"Sauts","es":"Saltos","pt":"Saltos","it":"Salti","nl":"Sprongen","sv":"Hopp","da":"Hop","no":"Hopp","fi":"Loikat"},
    lSmall: {"en":"1 and 10","de":"1 und 10","fr":"1 et 10","es":"1 y 10","pt":"1 e 10","it":"1 e 10","nl":"1 en 10","sv":"1 och 10","da":"1 og 10","no":"1 og 10","fi":"1 ja 10"},
    lBig: {"en":"10 and 100","de":"10 und 100","fr":"10 et 100","es":"10 y 100","pt":"10 e 100","it":"10 e 100","nl":"10 en 100","sv":"10 och 100","da":"10 og 100","no":"10 og 100","fi":"10 ja 100"},
    lTrails: {"en":"arrow trails","de":"Pfeilwege","fr":"chemins de flèches","es":"caminos de flechas","pt":"caminhos de setas","it":"percorsi di frecce","nl":"pijlenroutes","sv":"pilvägar","da":"pileveje","no":"pilveier","fi":"nuolipolut"},
    setGlass: {"en":"Glass","de":"Glas","fr":"Verre","es":"Vidrio","pt":"Vidro","it":"Vetro","nl":"Glas","sv":"Glas","da":"Glas","no":"Glass","fi":"Lasi"},
    gFrost: {"en":"frosted","de":"milchig","fr":"dépoli","es":"esmerilado","pt":"fosco","it":"smerigliato","nl":"mat","sv":"frostat","da":"matteret","no":"matt","fi":"huurrettu"},
    gClear: {"en":"clear","de":"klar","fr":"transparent","es":"transparente","pt":"transparente","it":"trasparente","nl":"helder","sv":"klart","da":"klart","no":"klart","fi":"kirkas"},
    qMore1: {"en":"What is 1 more than {n}?","de":"Was ist 1 mehr als {n}?","fr":"Quel nombre est 1 de plus que {n} ?","es":"¿Cuánto es 1 más que {n}?","pt":"Quanto é 1 a mais que {n}?","it":"Quanto fa 1 in più di {n}?","nl":"Wat is 1 meer dan {n}?","sv":"Vad är 1 mer än {n}?","da":"Hvad er 1 mere end {n}?","no":"Hva er 1 mer enn {n}?","fi":"Mikä on 1 enemmän kuin {n}?"},
    qMore10: {"en":"What is 10 more than {n}?","de":"Was ist 10 mehr als {n}?","fr":"Quel nombre est 10 de plus que {n} ?","es":"¿Cuánto es 10 más que {n}?","pt":"Quanto é 10 a mais que {n}?","it":"Quanto fa 10 in più di {n}?","nl":"Wat is 10 meer dan {n}?","sv":"Vad är 10 mer än {n}?","da":"Hvad er 10 mere end {n}?","no":"Hva er 10 mer enn {n}?","fi":"Mikä on 10 enemmän kuin {n}?"},
    qMore100: {"en":"What is 100 more than {n}?","de":"Was ist 100 mehr als {n}?","fr":"Quel nombre est 100 de plus que {n} ?","es":"¿Cuánto es 100 más que {n}?","pt":"Quanto é 100 a mais que {n}?","it":"Quanto fa 100 in più di {n}?","nl":"Wat is 100 meer dan {n}?","sv":"Vad är 100 mer än {n}?","da":"Hvad er 100 mere end {n}?","no":"Hva er 100 mer enn {n}?","fi":"Mikä on 100 enemmän kuin {n}?"},
    qLess1: {"en":"What is 1 less than {n}?","de":"Was ist 1 weniger als {n}?","fr":"Quel nombre est 1 de moins que {n} ?","es":"¿Cuánto es 1 menos que {n}?","pt":"Quanto é 1 a menos que {n}?","it":"Quanto fa 1 in meno di {n}?","nl":"Wat is 1 minder dan {n}?","sv":"Vad är 1 mindre än {n}?","da":"Hvad er 1 mindre end {n}?","no":"Hva er 1 mindre enn {n}?","fi":"Mikä on 1 vähemmän kuin {n}?"},
    qLess10: {"en":"What is 10 less than {n}?","de":"Was ist 10 weniger als {n}?","fr":"Quel nombre est 10 de moins que {n} ?","es":"¿Cuánto es 10 menos que {n}?","pt":"Quanto é 10 a menos que {n}?","it":"Quanto fa 10 in meno di {n}?","nl":"Wat is 10 minder dan {n}?","sv":"Vad är 10 mindre än {n}?","da":"Hvad er 10 mindre end {n}?","no":"Hva er 10 mindre enn {n}?","fi":"Mikä on 10 vähemmän kuin {n}?"},
    qLess100: {"en":"What is 100 less than {n}?","de":"Was ist 100 weniger als {n}?","fr":"Quel nombre est 100 de moins que {n} ?","es":"¿Cuánto es 100 menos que {n}?","pt":"Quanto é 100 a menos que {n}?","it":"Quanto fa 100 in meno di {n}?","nl":"Wat is 100 minder dan {n}?","sv":"Vad är 100 mindre än {n}?","da":"Hvad er 100 mindre end {n}?","no":"Hva er 100 mindre enn {n}?","fi":"Mikä on 100 vähemmän kuin {n}?"},
  },/*STRINGS-END*/
  defaults: { leaps: 'big', glass: 'frost' },
  settings: [
    { key: 'leaps', type: 'choice', labelKey: 'setLeaps', options: [{ value: 'small', labelKey: 'lSmall' }, { value: 'big', labelKey: 'lBig' }, { value: 'trails', labelKey: 'lTrails' }] },
    { key: 'glass', type: 'choice', labelKey: 'setGlass', options: [{ value: 'frost', labelKey: 'gFrost' }, { value: 'clear', labelKey: 'gClear' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {};
    injectGlassStackCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this.st) { this._start(this.st.k); }
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _face: function () { return GlassStackCore.faceOf(this._setting('leaps')); },
  _clear: function () { return this._setting('glass') === 'clear'; },
  _key: function () { return this._face(); },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = GlassStackCore.rounds(this._face()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = GlassStackCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._face(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'glass-stack.' + this._key() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  /* the leap, written with a true minus and spaces: "+ 10", "− 100" */
  _leapText: function (leap) { return (leap > 0 ? '+ ' : '− ') + Math.abs(leap); },
  _taskLine: function () {
    var st = this.st; if (!st) return '';
    var r = st.round;
    if (r.kind === 'leap') { var k = (r.leap > 0 ? 'qMore' : 'qLess') + Math.abs(r.leap); return this._t(k, { n: r.a }); }
    if (r.kind === 'follow') return this._t('qFollow', { n: r.a });
    if (r.kind === 'mystery') return this._t('qMystery');
    return this._t('qFar', { a: r.a, b: r.b });
  },
  _setPrompt: function () { if (this.st && this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers();
    this.st = GlassStackCore.newState(this._face(), k);
    this._view = { note: '', ok: '', soft: false, leapFrom: null, success: false };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0); this._render2(); this._watchWidth();
  },
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
  _dims: function () { var W = this._width(), B = GlassStackCore.band(W); return { W: W, wide: B.wide, cramp: B.cramp }; },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'gk-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="gk-work"><div class="gk-side"><div class="gk-comet"></div><div class="gk-card gk-art"></div><div class="gk-answer"></div></div>'
      + '<div class="gk-board"><div class="gk-sheet"></div><div class="gk-spine"></div></div></div>'
      + '<p class="gk-note" aria-live="polite"></p><div class="gk-movepad"></div><div class="gk-pad"></div><p class="gk-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    wrap.addEventListener('keydown', function (e) { self._keyboard(e); });
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

  /* every size in one place, from the stage width */
  _geo: function (D) {
    /* at 320 the strip above the sheet that holds the digit chips is given back at miss 2, where no chip is drawn */
    var wide = D.wide, cramp = D.cramp, small = this.st.face === 'small';
    var spineW = small ? 0 : wide ? 56 : cramp ? 36 : 44, sideW = wide ? 180 : 0, margin = wide ? 22 : cramp && this.st.help ? 6 : 18, mL = wide ? 44 : 38;
    var boardW = wide ? D.W - sideW - 16 : D.W, sheetRoom = boardW - spineW - (spineW ? (wide ? 10 : cramp ? 4 : 6) : 0) - mL - 4;
    var cell = Math.max(20, Math.min(wide ? 40 : 30, Math.floor(sheetRoom / 10)));
    return { W: D.W, wide: wide, cramp: cramp, small: small, spineW: spineW, sideW: sideW, margin: margin, mL: mL, cell: cell, sheet: cell * 10, num: wide ? 15 : cell >= 28 ? 12 : cell >= 22 ? 11 : 10, token: Math.round(cell * 0.8), comet: wide ? 96 : 64, edgeH: wide ? 26 : Math.max(16, Math.floor((cell * 10 - 9 * 4) / 10)) };
  },
  _paint_: function () {
    var st = this.st, D = this._dims(), G = this._geo(D), v = this._view;
    this._wrap.className = 'gk-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (st.help ? ' is-help' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + st.face + (G.small ? ' is-onesheet' : '');
    this._paintComet(G); this._paintCard(G); this._paintAnswer(G); this._paintSheet(G); this._paintSpine(G); this._paintMovePad(G); this._paintPad(G);
    var note = this._qs('.gk-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'gk-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'gk-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'gk-note'; }
    this._setPrompt();
    /* one-shot marks: they play on the paint that shows them, never on a later one */
    v.leapFrom = null;
  },

  /* ---------- arrows (drawn, never typed glyphs) ---------- */
  _arrow: function (dir, s) {
    s = s || 22;
    var body = dir === 'D' ? 'M12 4V18M6 12L12 18L18 12' : dir === 'U' ? 'M12 20V6M6 12L12 6L18 12' : dir === 'R' ? 'M4 12H18M12 6L18 12L12 18' : dir === 'L' ? 'M20 12H6M12 6L6 12L12 18'
      : dir === 'DIVE' ? 'M3 15H15M5 19H17M12 2V12M8 8L12 12L16 8' : 'M3 15H15M5 19H17M12 12V2M8 6L12 2L16 6';
    return '<svg class="gk-arrow gk-art" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" aria-hidden="true"><path d="' + body + '"/></svg>';
  },
  _paintComet: function (G) {
    var el = this._qs('.gk-comet'), s = G.comet;
    el.className = 'gk-comet' + (this._view.success ? ' is-hop' : '');
    el.innerHTML = '<img class="gk-cometimg" src="' + this._pic(GlassStackCore.COMET) + '" alt="" draggable="false" style="width:' + s + 'px;height:' + s + 'px">';
  },
  /* the leap card: the leap in numerals and an arrow, or the trail's chips */
  _paintCard: function (G) {
    var r = this.st.round, el = this._qs('.gk-card'), self = this, h = '';
    if (r.kind === 'leap') h = '<span class="gk-leap">' + this._leapText(r.leap) + '</span>' + this._arrow(GlassStackCore.leapDir(r.leap), G.wide ? 30 : 24);
    else if (r.kind === 'follow') h = '<span class="gk-from">' + r.a + '</span>' + r.chips.map(function (c) { return '<span class="gk-chip">' + self._arrow(c, G.wide ? 22 : 18) + '</span>'; }).join('');
    else if (r.kind === 'mystery') h = '<span class="gk-pair"><span class="gk-from">' + r.a + '</span><span class="gk-chip">' + this._arrow(r.ca, 18) + '</span></span><span class="gk-pair"><span class="gk-from">' + r.b + '</span><span class="gk-chip">' + this._arrow(r.cb, 18) + '</span></span>';
    else h = '<span class="gk-from">' + r.a + '</span>' + this._arrow('R', 18) + '<span class="gk-from">' + r.b + '</span>';
    el.innerHTML = h;
  },
  /* the answer: one box, or two (steps down, steps across) for "how far" */
  _paintAnswer: function () {
    var st = this.st, self = this, el = this._qs('.gk-answer'); el.innerHTML = '';
    if (st.round.kind !== 'far') {
      var b = document.createElement('span'); b.className = 'gk-box' + (st.verdict ? ' is-wrong' : '') + (st.done ? ' is-ok' : '');
      b.setAttribute('role', 'status'); b.setAttribute('aria-label', this._t('aTyped', { v: st.typed || '–' })); b.textContent = st.typed;
      el.appendChild(b); return;
    }
    [1, 2].forEach(function (n) {
      var val = n === 1 ? st.typed : st.typed2, wrong = st.verdict && st.verdict.far && !(n === 1 ? st.verdict.downOk : st.verdict.rightOk);
      var bb = self._btn('gk-box gk-boxbtn' + (st.box === n && !st.done ? ' is-active' : '') + (wrong ? ' is-wrong' : '') + (st.done ? ' is-ok' : ''), 'box-' + n, self._t(n === 1 ? 'aBoxDown' : 'aBoxRight', { v: val || '–' }),
        '<span class="gk-boxhead">' + self._arrow(n === 1 ? 'D' : 'R', 18) + '</span><span class="gk-boxval">' + val + '</span>');
      bb.disabled = st.done;
      bb.addEventListener('click', function () { self._box(n); });
      el.appendChild(bb);
    });
  },

  /* ---------- the glass sheet ---------- */
  _cleared: function () {
    var st = this.st, r = st.round, C = GlassStackCore, set = {};
    set[r.a] = 1; if (r.kind === 'mystery' || r.kind === 'far') set[r.b] = 1;
    if (st.done) set[r.kind === 'far' ? r.b : r.answer] = 1;
    if (st.help) { C.path(r).forEach(function (n) { var land = r.kind === 'far' ? r.b : r.answer; if (n !== land || st.visited.indexOf(n) >= 0) set[n] = 1; }); }
    return set;
  },
  _paintSheet: function (G) {
    var st = this.st, r = st.round, v = this._view, C = GlassStackCore, el = this._qs('.gk-sheet');
    var sheet = Math.floor(st.token / 100), c = G.cell, m = G.margin, mL = G.mL, S = G.sheet, W = S + mL + 4, H = S + m + 4, clear = this._clear(), cl = this._cleared();
    var cx = function (n) { return mL + (n % 10) * c; }, cy = function (n) { return m + (Math.floor(n / 10) % 10) * c; };
    var s = '<rect class="gk-glass" x="' + mL + '" y="' + m + '" width="' + S + '" height="' + S + '" rx="6"/>';
    /* miss 1 on a leap: the axis the leap moves along lights, and the start's digits stand beside it */
    var axis = st.verdict && !st.help && r.kind === 'leap' ? Math.abs(r.leap) : 0;
    if (axis === 10 && Math.floor(r.a / 100) === sheet) s += '<rect class="gk-band" x="' + cx(r.a) + '" y="' + m + '" width="' + c + '" height="' + S + '"/>';
    if (axis === 1 && Math.floor(r.a / 100) === sheet) s += '<rect class="gk-band" x="' + mL + '" y="' + cy(r.a) + '" width="' + S + '" height="' + c + '"/>';
    for (var i = 0; i < 100; i++) {
      var n = sheet * 100 + i, x = mL + (i % 10) * c, y = m + Math.floor(i / 10) * c, shown = clear || cl[n];
      s += '<rect class="gk-cell' + (shown ? ' is-clear' : '') + (n === r.a && Math.floor(r.a / 100) === sheet ? ' is-start' : '') + '" x="' + (x + 1) + '" y="' + (y + 1) + '" width="' + (c - 2) + '" height="' + (c - 2) + '" rx="3"/>';
      if (shown) s += '<text class="gk-num" x="' + (x + c / 2) + '" y="' + (y + c / 2 + G.num * 0.36) + '" text-anchor="middle" style="font-size:' + G.num + 'px">' + n + '</text>';
    }
    if (axis) {
      var A = C.addr(r.a), sign = r.leap > 0 ? '+1' : '−1';
      if (Math.floor(r.a / 100) === sheet) {
        s += this._chipR(mL - 3, cy(r.a) + c / 2, String(A.row) + (axis === 10 ? ' ' + sign : ''), axis === 10);
        s += this._chip(cx(r.a) + c / 2, m / 2, String(A.col) + (axis === 1 ? ' ' + sign : ''), axis === 1);
      }
    }
    /* the flag: the child's number, planted where it lives (on this sheet) */
    if (st.flag != null && C.inRange(st.flag) && Math.floor(st.flag / 100) === sheet && !st.done && !st.help) {
      var fx = cx(st.flag) + c * 0.3, fy = cy(st.flag) + c * 0.15;
      if (st.flag !== st.token) s += '<path class="gk-connector" d="M' + (cx(st.flag) + c / 2) + ' ' + (cy(st.flag) + c / 2) + ' L' + (cx(st.token) + c / 2) + ' ' + (cy(st.token) + c / 2) + '"/>';
      s += '<g class="gk-flag"><path class="gk-pole" d="M' + fx + ' ' + fy + ' V' + (fy + c * 0.72) + '"/><path class="gk-pennant" d="M' + fx + ' ' + fy + ' L' + (fx + c * 0.5) + ' ' + (fy + c * 0.16) + ' L' + fx + ' ' + (fy + c * 0.32) + ' Z"/></g>';
    }
    /* Comet's token (and the second token of a mystery) */
    var tok = function (n, cls) {
      if (n == null || Math.floor(n / 100) !== sheet) return '';
      var tx = cx(n) + c / 2, ty = cy(n) + c / 2, rr = G.token / 2, from = v.leapFrom, style = '';
      if (from != null && cls === '' && Math.floor(from / 100) === sheet) style = ' style="--gk-fx:' + (cx(from) - cx(n)) + 'px;--gk-fy:' + (cy(from) - cy(n)) + 'px"';
      /* a cleared square keeps its number readable: written in white on Comet's token */
      var showN = clear || cl[n], mark = showN ? '<text class="gk-toknum" x="' + tx + '" y="' + (ty + G.num * 0.36) + '" text-anchor="middle" style="font-size:' + G.num + 'px">' + n + '</text>' : '<path class="gk-tokmark" d="M' + (tx - rr * 0.45) + ' ' + (ty + rr * 0.25) + ' Q' + tx + ' ' + (ty - rr * 0.6) + ' ' + (tx + rr * 0.45) + ' ' + (ty + rr * 0.25) + '"/>';
      return '<g class="gk-token' + (cls ? ' ' + cls : '') + (from != null && cls === '' ? ' is-leap' : '') + (st.done ? ' is-home' : '') + '"' + style + '><circle cx="' + tx + '" cy="' + ty + '" r="' + (showN ? Math.max(rr, c * 0.46) : rr) + '"/>' + mark + '</g>';
    };
    s += tok(st.token, '') + (r.kind === 'mystery' && !st.done ? tok(st.token2, 'is-two') : '');
    el.style.width = W + 'px'; el.style.height = H + 'px';
    el.className = 'gk-sheet' + (v.dive ? ' is-dive' : '');
    el.innerHTML = '<svg class="gk-sheetsvg gk-art" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="group" aria-label="' + esc(this._sheetLabel()) + '">' + s + '</svg>';
    v.dive = false;
  },
  /* the sheet's spoken name: after a miss Comet stands on the true square, so it is not read out (the flag is) */
  _sheetLabel: function () { var st = this.st; return st.verdict && !st.help && !st.done && st.flag != null ? this._t('aLanded', { f: st.flag }) : this._t('aToken', { n: st.token }); },
  /* a chip whose right edge sits at x (beside the grid) */
  _chipR: function (xr, y, txt, axis) { var w = Math.max(18, txt.length * 8 + 8); return this._chip(xr - w / 2, y, txt, axis); },
  _chip: function (x, y, txt, axis) { var w = Math.max(18, txt.length * 8 + 8); return '<rect class="gk-dchip' + (axis ? ' is-axis' : '') + '" x="' + (x - w / 2) + '" y="' + (y - 9) + '" width="' + w + '" height="18" rx="9"/><text class="gk-dchipt" x="' + x + '" y="' + (y + 4.5) + '" text-anchor="middle">' + txt + '</text>'; },

  /* ---------- the spine: ten sheet edges, the hundreds ---------- */
  _paintSpine: function (G) {
    var st = this.st, self = this, el = this._qs('.gk-spine'); el.innerHTML = '';
    if (G.small) { el.style.display = 'none'; return; }
    el.style.display = ''; el.style.width = G.spineW + 'px';
    var cur = Math.floor(st.token / 100), r = st.round, flagSheet = st.flag != null && GlassStackCore.inRange(st.flag) && !st.done ? Math.floor(st.flag / 100) : null;
    var axisH = st.verdict && !st.help && r.kind === 'leap' && Math.abs(r.leap) === 100;
    for (var s = 0; s < 10; s++) {
      var lab = String(s * 100), cls = 'gk-edge' + (s === cur ? ' is-cur' : '') + (axisH && (s === Math.floor(r.a / 100)) ? ' is-axis' : '');
      var inner = '<span class="gk-edgelab">' + lab + '</span>' + (flagSheet === s && s !== cur ? '<span class="gk-pin" aria-hidden="true"></span>' : '');
      /* the spine is a label strip; diving is done from the move pad (44 px buttons) */
      var e = document.createElement('span'); e.className = cls; e.innerHTML = inner;
      e.style.height = G.edgeH + 'px';
      el.appendChild(e);
    }
    /* a number with no sheet (2470) hangs off the bottom of the spine */
    if (st.flag != null && !GlassStackCore.inRange(st.flag) && !st.done) { var off = document.createElement('span'); off.className = 'gk-offstack'; off.textContent = st.flag; el.appendChild(off); }
  },
  /* ---------- miss 2: move Comet yourself ---------- */
  _paintMovePad: function () {
    var st = this.st, self = this, el = this._qs('.gk-movepad'); el.innerHTML = '';
    if (!st.help || st.done) { el.style.display = 'none'; return; }
    el.style.display = '';
    var cur = Math.floor(st.token / 100);
    [['U', 'aUp'], ['L', 'aLeft'], ['R', 'aRight'], ['D', 'aDown']].forEach(function (d) {
      var b = self._btn('gk-move', 'move-' + d[0], self._t(d[1]), self._arrow(d[0], 24));
      b.addEventListener('click', function () { self._move(d[0]); });
      el.appendChild(b);
    });
    /* one sheet deeper / one sheet up: the same square, the hundreds change */
    if (st.face !== 'small') [['DIVE', 1, 'aDive'], ['RISE', -1, 'aRise']].forEach(function (d) {
      var b = self._btn('gk-move is-sheet', 'move-' + d[0], self._t(d[2]), self._arrow(d[0], 24));
      b.disabled = cur + d[1] < 0 || cur + d[1] > 9;
      b.addEventListener('click', function () { self._dive(Math.floor(self.st.token / 100) + d[1]); });
      el.appendChild(b);
    });
  },
  /* ---------- the keypad + Check ---------- */
  _paintPad: function () {
    var st = this.st, self = this, pad = this._qs('.gk-pad'); pad.innerHTML = '';
    if (st.done) { pad.style.display = 'none'; return; }
    pad.style.display = '';
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del'].forEach(function (k) {
      var b = self._btn('gk-key' + (k === 'del' ? ' is-del' : ''), 'key-' + k, k === 'del' ? self._t('aDel') : null, k === 'del' ? '⌫' : k);
      b.addEventListener('click', function () { self._tap(k); });
      pad.appendChild(b);
    });
    var c = this._btn('gk-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5l12 7-12 7z" fill="currentColor"/></svg>');
    c.addEventListener('click', function () { self._check(); });
    pad.appendChild(c);
  },

  /* ---------------- the hand ---------------- */
  _clearMarks: function () { var v = this._view; v.note = ''; v.ok = ''; },
  _say: function (k, a) { var sr = this._qs && this._qs('.gk-sr'); if (sr) sr.textContent = this._t(k, a); },
  _tap: function (k) { if (GlassStackCore.type(this.st, k)) { this._clearMarks(); this.api.sound(660); this._paint(); } },
  _box: function (n) { if (GlassStackCore.setBox(this.st, n)) { this.api.sound(520); this._paint(); } },
  _move: function (dir) {
    var st = this.st, from = st.token;
    if (!GlassStackCore.move(st, dir)) { this.api.sound(200); return; }
    this._view.leapFrom = from; this.api.sound(560); this._paint(); this._say('aToken', { n: st.token });
  },
  _dive: function (sheet) {
    var st = this.st;
    if (!GlassStackCore.dive(st, sheet)) { this.api.sound(200); return; }
    this._view.dive = true; this.api.sound(420); this._paint(); this._say('aToken', { n: st.token });
  },
  _keyboard: function (e) {
    if (!this.st) return;
    var map = { ArrowUp: 'U', ArrowDown: 'D', ArrowLeft: 'L', ArrowRight: 'R' };
    if (this.st.help && map[e.key]) { e.preventDefault(); this._move(map[e.key]); return; }
    if (this.st.help && (e.key === 'PageDown' || e.key === 'PageUp')) { e.preventDefault(); this._dive(Math.floor(this.st.token / 100) + (e.key === 'PageDown' ? 1 : -1)); return; }
    if (/^[0-9]$/.test(e.key)) { e.preventDefault(); this._tap(e.key); }
    else if (e.key === 'Backspace') { e.preventDefault(); this._tap('del'); }
    else if (e.key === 'Enter' && e.target === this._wrap) { e.preventDefault(); this._check(); }
  },
  _check: function () {
    var st = this.st, v = this._view; if (st.done) return;
    var from = st.token, wasLeapt = st.leapt, r = GlassStackCore.check(st);
    if (r.result === 'no') return;
    if (r.result === 'note') { v.note = this._t(r.key); v.soft = true; v.ok = ''; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    /* the leap plays once: from the start to where Comet really lands */
    if (!wasLeapt && from !== st.token) { v.leapFrom = from; v.dive = Math.floor(from / 100) !== Math.floor(st.token / 100); }
    if (r.result === 'ok') { this._success(this._okLine()); return; }
    v.ok = ''; var key = GlassStackCore.hint(st), R = st.round;
    v.note = this._t(key, { leap: R.kind === 'leap' ? this._leapText(R.leap) : '' }); v.soft = false;
    this.api.sound(240); this._paint(); this.api.announce(v.note);
    if (st.flag != null) this._say('aLanded', { f: st.flag });
  },
  _okLine: function () {
    var r = this.st.round, C = GlassStackCore;
    if (r.kind === 'far') return this._t('okFar', { a: r.a, b: r.b, d: r.answer.down, r: r.answer.right });
    if (r.kind !== 'leap') return this._t('okTrail', { land: r.answer });
    var a = { start: r.a, leap: this._leapText(r.leap), land: r.answer };
    if (C.isWrap(r)) return this._t(Math.abs(r.leap) === 1 ? 'okRow' : 'okEdge', a);
    var p = C.placeOf(r);
    return this._t(p === 'ones' ? 'okOnes' : p === 'tens' ? 'okTens' : 'okHundreds', a);
  },
  _success: function (msg) {
    var v = this._view;
    v.note = ''; v.ok = msg; v.success = true;
    if (this._pa) this._pa.msg = msg;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectGlassStackCSS() {
  if (typeof document === 'undefined' || document.getElementById('gk-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.gk-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .gk-wrap:focus{outline:none;}'
  + '.gk-work{display:flex;gap:16px;align-items:flex-start;} .gk-wrap.is-wide .gk-work{flex-direction:row-reverse;justify-content:center;} .gk-wrap.is-narrow .gk-work{flex-direction:column;align-items:center;gap:8px;}'
  + '.gk-side{display:flex;flex-direction:column;align-items:center;gap:10px;flex:0 0 auto;} .gk-wrap.is-wide .gk-side{width:180px;} .gk-wrap.is-narrow .gk-side{flex-direction:row-reverse;justify-content:center;width:100%;gap:8px;}'
  + '.gk-comet{flex:0 0 auto;} .gk-cometimg{display:block;object-fit:contain;} .gk-comet.is-hop .gk-cometimg{animation:gkHop .5s ease-out 2;} .gk-wrap.is-fast .gk-comet.is-hop .gk-cometimg{animation:none;} @keyframes gkHop{40%{transform:translateY(-14px);}}'
  + '.gk-card{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;min-height:56px;padding:6px 12px;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4;font-family:' + H + ';font-weight:800;color:' + INK + ';} .gk-wrap.is-wide .gk-card{width:176px;box-sizing:border-box;}'
  + '.gk-leap{font-size:32px;line-height:1;} .gk-wrap.is-narrow .gk-leap{font-size:26px;} .gk-from{font-size:24px;line-height:1;} .gk-wrap.is-narrow .gk-from{font-size:20px;}'
  + '.gk-pair{display:flex;align-items:center;gap:3px;} .gk-chip{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:8px;background:#E6F3EE;box-shadow:inset 0 0 0 1.5px #146B5E;}'
  + '.gk-arrow{display:block;fill:none;stroke:#146B5E;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round;}'
  + '.gk-answer{display:flex;gap:8px;justify-content:center;}'
  + '.gk-box{display:flex;align-items:center;justify-content:center;gap:4px;min-width:120px;height:58px;padding:0 10px;border:0;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 3px #146B5E;font-family:' + H + ';font-weight:800;font-size:40px;line-height:1;color:' + INK + ';box-sizing:border-box;} .gk-wrap.is-narrow .gk-box{min-width:92px;height:50px;font-size:32px;}'
  + '.gk-boxbtn{min-width:76px !important;cursor:pointer;} .gk-boxbtn.is-active{box-shadow:inset 0 0 0 4px #F2784B;} .gk-boxhead{display:inline-flex;} .gk-boxval{min-width:22px;text-align:center;}'
  + '.gk-box.is-wrong{box-shadow:inset 0 0 0 4px #E0663A;animation:gkWob .45s 1;} .gk-box.is-ok{box-shadow:inset 0 0 0 3px #2E9C88;background:#E6F3EE;} @keyframes gkWob{25%{transform:translateX(-4px);}75%{transform:translateX(4px);}}'
  + '.gk-board{display:flex;align-items:flex-start;gap:10px;} .gk-wrap.is-narrow .gk-board{gap:6px;} .gk-wrap.is-cramp .gk-board{gap:4px;}'
  + '.gk-sheet{position:relative;flex:0 0 auto;} .gk-sheetsvg{display:block;overflow:visible;}'
  + '.gk-sheet.is-dive .gk-sheetsvg{animation:gkDive .38s ease-out 1;} .gk-wrap.is-fast .gk-sheet.is-dive .gk-sheetsvg{animation:none;} @keyframes gkDive{0%{opacity:.25;transform:translateY(10px) scale(.98);}100%{opacity:1;transform:none;}}'
  + '.gk-glass{fill:#EAF2F1;stroke:#9DB8B3;stroke-width:2;}'
  + '.gk-cell{fill:#F8FBFA;fill-opacity:.75;stroke:#C9DAD6;stroke-width:1;} .gk-cell.is-clear{fill:#fff;fill-opacity:1;} .gk-cell.is-start{stroke:#146B5E;stroke-width:2.5;}'
  + '.gk-num{font-family:' + H + ';font-weight:700;fill:' + INK + ';}'
  + '.gk-band{fill:#2E9C88;fill-opacity:.18;}'
  + '.gk-dchip{fill:#fff;stroke:#146B5E;stroke-width:1.5;} .gk-dchip.is-axis{fill:#146B5E;} .gk-dchipt{font-family:' + H + ';font-weight:800;font-size:12px;fill:#146B5E;} .gk-dchip.is-axis + .gk-dchipt{fill:#fff;}'
  + '.gk-connector{stroke:#E0663A;stroke-width:2.5;stroke-dasharray:5 4;fill:none;}'
  + '.gk-pole{stroke:#0E4D44;stroke-width:2;} .gk-pennant{fill:#2E9C88;stroke:#0E4D44;stroke-width:1.2;}'
  + '.gk-toknum{font-family:' + H + ';font-weight:800;fill:#fff;} .gk-token circle{fill:#F2784B;stroke:#fff;stroke-width:3;filter:drop-shadow(0 2px 2px rgba(47,42,59,.3));} .gk-token.is-two circle{fill:#2E9C88;} .gk-tokmark{fill:none;stroke:#fff;stroke-width:2.2;stroke-linecap:round;}'
  + '.gk-token.is-leap{animation:gkLeap .3s ease-out 1;} .gk-wrap.is-fast .gk-token.is-leap{animation:none;} @keyframes gkLeap{0%{transform:translate(var(--gk-fx),var(--gk-fy));}}'
  + '.gk-token.is-home{animation:gkBounce .4s ease-out 2;} .gk-wrap.is-fast .gk-token.is-home{animation:none;} @keyframes gkBounce{50%{transform:translateY(-6px);}}'
  + '.gk-spine{display:flex;flex-direction:column;gap:4px;flex:0 0 auto;}'
  + '.gk-edge{position:relative;display:flex;align-items:center;justify-content:center;border:0;padding:0;border-radius:6px;background:linear-gradient(90deg,#DCEAE7,#C7DCD8);box-shadow:inset 0 0 0 1.5px #9DB8B3;font-family:' + H + ';font-weight:800;font-size:16px;color:' + INK + ';} .gk-wrap.is-narrow .gk-edge{font-size:11px;}'
  + 'button.gk-edge{cursor:pointer;min-height:44px;} .gk-edge.is-cur{background:#146B5E;color:#fff;box-shadow:none;transform:translateX(-6px);} .gk-edge.is-axis{box-shadow:inset 0 0 0 3px #2E9C88;}'
  + '.gk-pin{position:absolute;right:4px;top:50%;width:12px;height:12px;margin-top:-6px;border-radius:50%;background:#2E9C88;box-shadow:0 0 0 2px #fff;}'
  + '.gk-offstack{display:block;text-align:center;margin-top:4px;padding:2px 4px;border-radius:6px;background:#2E9C88;color:#fff;font-family:' + H + ';font-weight:800;font-size:13px;}'
  + '.gk-movepad{display:flex;justify-content:center;gap:8px;} .gk-move{flex:0 0 auto;width:52px;height:48px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #146B5E,0 3px 0 #CDBFA4;cursor:pointer;display:flex;align-items:center;justify-content:center;}'
  + '.gk-note{margin:0;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .gk-wrap.is-narrow .gk-note{font-size:16px;line-height:1.25;} .gk-note:empty{display:none;} .gk-note.is-hint{color:#9A3D1C;}'
  + '.gk-note.is-ok{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.gk-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.gk-pad{display:grid;grid-template-columns:repeat(12,minmax(44px,1fr));gap:6px;} .gk-wrap.is-narrow .gk-pad{grid-template-columns:repeat(6,minmax(44px,1fr));} .gk-wrap.is-cramp .gk-pad{gap:4px;} .gk-wrap.is-narrow .gk-movepad{gap:6px;} .gk-wrap.is-narrow .gk-move{width:48px;} .gk-wrap.is-cramp .gk-movepad{gap:4px;} .gk-wrap.is-cramp .gk-move{width:44px;height:44px;}'
  + '.gk-key,.gk-go{height:48px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;font-family:' + H + ';font-weight:800;font-size:24px;color:' + INK + ';cursor:pointer;padding:0;} .gk-wrap.is-narrow .gk-key,.gk-wrap.is-narrow .gk-go{height:44px;}'
  + '.gk-go{background:#146B5E;color:#fff;box-shadow:0 3px 0 #0E4D44;} .gk-go svg{width:24px;height:24px;display:block;margin:0 auto;}'
  + '.gk-wrap.is-cramp{gap:4px;} .gk-wrap.is-cramp .gk-work{gap:6px;} .gk-wrap.is-cramp .gk-note{line-height:1.18;}';
  var st = document.createElement('style'); st.id = 'gk-css'; st.textContent = css; document.head.appendChild(st);
}
if (typeof window !== 'undefined') window.GlassStackActivity = GlassStackActivity;
