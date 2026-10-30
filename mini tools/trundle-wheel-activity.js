/* =====================================================================
   trundle-wheel-activity.js — ACTIVITY #169 of the one-by-one rebuild:
   "Sort Shapes by Sides" (2.G.A.1) → THE TRUNDLE WHEEL.
   Model: trundle-wheel-core.js. Design:
   docs/activities-rebuild/designs/169-sort-bins.md
   ---------------------------------------------------------------------
   Drop a shape on the lane and roll it: it tips over its front corner
   onto its next side, again and again, printing a dash for each side and
   a mark for each corner (a little open square for a square corner) on
   the paper strip. The start side is coral; when it lands again the
   ticket is done and rides home under the shape. Then the child sorts
   the shapes on the board: sides crates, the quadrilateral cabinet or
   two rings. Next appears .OK_MS after success.
   ===================================================================== */
var TrundleWheelActivity = {
  id: 'trundle-wheel-activity',
  /* the drawn apparatus (lane, strip, shapes, tickets, crates, cabinet, rings): declared for the hierarchy audit */
  apparatusClasses: ['tw-'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Roll and Sort","de":"Rollen und sortieren","fr":"Rouler et trier","es":"Rueda y ordena","pt":"Role e organize","it":"Rotola e ordina","nl":"Rollen en sorteren","sv":"Rulla och sortera","da":"Rul og sortér","no":"Rull og sorter","fi":"Vieritä ja lajittele"},
    instruction: {"en":"Roll a shape along the lane to print its sides. Then put it where it belongs.","de":"Roll eine Form über die Bahn, dann druckt sie ihre Seiten. Leg sie danach an ihren Platz.","fr":"Fais rouler une forme sur la piste pour imprimer ses côtés. Puis range-la à sa place.","es":"Rueda una figura por la pista para imprimir sus lados. Luego ponla en su lugar.","pt":"Role uma figura na pista para imprimir os lados dela. Depois coloque-a no lugar certo.","it":"Fai rotolare una figura sulla pista per stampare i suoi lati. Poi mettila al suo posto.","nl":"Rol een vorm over de baan, dan drukt hij zijn zijden af. Zet hem daarna op zijn plek.","sv":"Rulla en form längs banan så trycker den sina sidor. Lägg den sedan på rätt plats.","da":"Rul en figur hen ad banen, så trykker den sine sider. Læg den så på sin plads.","no":"Rull en figur bortover banen, så trykker den sidene sine. Legg den så på riktig plass.","fi":"Vieritä kuviota radalla, niin se tulostaa sivunsa. Laita se sitten oikealle paikalle."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Comprobar","pt":"Verificar","it":"Verifica","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    setBoard: {"en":"Board","de":"Spielfeld","fr":"Plateau","es":"Tablero","pt":"Tabuleiro","it":"Tabellone","nl":"Speelbord","sv":"Spelbräde","da":"Spilleplade","no":"Spillebrett","fi":"Pelilauta"},
    bSides: {"en":"Crates by sides","de":"Seitenkisten","fr":"Caisses des côtés","es":"Cajas de lados","pt":"Caixas de lados","it":"Scatole dei lati","nl":"Zijdenkisten","sv":"Sidbackar","da":"Sidekasser","no":"Sidekasser","fi":"Sivulaatikot"},
    bQuads: {"en":"Quadrilaterals","de":"Vierecke","fr":"Quadrilatères","es":"Cuadriláteros","pt":"Quadriláteros","it":"Quadrilateri","nl":"Vierhoeken","sv":"Fyrhörningar","da":"Firkanter","no":"Firkanter","fi":"Nelikulmiot"},
    bRings: {"en":"Two rules","de":"Zwei Regeln","fr":"Deux règles","es":"Dos reglas","pt":"Duas regras","it":"Due regole","nl":"Twee regels","sv":"Två regler","da":"To regler","no":"To regler","fi":"Kaksi sääntöä"},
    setCrates: {"en":"Crates show","de":"Kisten zeigen","fr":"Les caisses montrent","es":"Las cajas muestran","pt":"As caixas mostram","it":"Le scatole mostrano","nl":"Kisten tonen","sv":"Backarna visar","da":"Kasserne viser","no":"Kassene viser","fi":"Laatikoissa näkyy"},
    cBoth: {"en":"Numbers and names","de":"Zahlen und Namen","fr":"Nombres et noms","es":"Números y nombres","pt":"Números e nomes","it":"Numeri e nomi","nl":"Getallen en namen","sv":"Tal och namn","da":"Tal og navne","no":"Tall og navn","fi":"Luvut ja nimet"},
    cNum: {"en":"Numbers","de":"Zahlen","fr":"Nombres","es":"Números","pt":"Números","it":"Numeri","nl":"Getallen","sv":"Tal","da":"Tal","no":"Tall","fi":"Luvut"},
    cName: {"en":"Names","de":"Namen","fr":"Noms","es":"Nombres","pt":"Nomes","it":"Nomi","nl":"Namen","sv":"Namn","da":"Navne","no":"Navn","fi":"Nimet"},
    qSides: {"en":"Put each shape in the crate with its number of sides.","de":"Leg jede Form in die Kiste mit so vielen Seiten, wie sie hat.","fr":"Range chaque forme dans la caisse qui a son nombre de côtés.","es":"Pon cada figura en la caja con su número de lados.","pt":"Coloque cada figura na caixa com o número de lados dela.","it":"Metti ogni figura nella scatola con il suo numero di lati.","nl":"Zet elke vorm in de kist met zijn aantal zijden.","sv":"Lägg varje form i backen med lika många sidor.","da":"Læg hver figur i kassen med dens antal sider.","no":"Legg hver figur i kassen med like mange sider.","fi":"Laita jokainen kuvio laatikkoon, jossa on sen sivujen määrä."},
    qQuads: {"en":"Put each four-sided shape in its drawer.","de":"Leg jedes Viereck in sein Fach.","fr":"Range chaque quadrilatère dans son tiroir.","es":"Pon cada cuadrilátero en su cajón.","pt":"Coloque cada quadrilátero na sua gaveta.","it":"Metti ogni quadrilatero nel suo cassetto.","nl":"Zet elke vierhoek in zijn laatje.","sv":"Lägg varje fyrhörning i sin låda.","da":"Læg hver firkant i sin skuffe.","no":"Legg hver firkant i sin skuff.","fi":"Laita jokainen nelikulmio omaan lokeroonsa."},
    qMissing: {"en":"Sort the shapes into the drawers. Then fill the empty drawer with the right shape from the shelf.","de":"Sortiere die Formen in die Fächer. Füll dann das leere Fach mit der passenden Form vom Regal.","fr":"Range les formes dans les tiroirs. Puis remplis le tiroir vide avec la bonne forme de l’étagère.","es":"Ordena las figuras en los cajones. Luego llena el cajón vacío con la figura correcta de la repisa.","pt":"Organize as figuras nas gavetas. Depois preencha a gaveta vazia com a figura certa da prateleira.","it":"Metti le figure nei cassetti. Poi riempi il cassetto vuoto con la figura giusta dello scaffale.","nl":"Zet de vormen in de laatjes. Vul dan het lege laatje met de goede vorm van de plank.","sv":"Sortera formerna i lådorna. Fyll sedan den tomma lådan med rätt form från hyllan.","da":"Sortér figurerne i skufferne. Fyld så den tomme skuffe med den rigtige figur fra hylden.","no":"Sorter figurene i skuffene. Fyll så den tomme skuffen med riktig figur fra hyllen.","fi":"Lajittele kuviot lokeroihin. Täytä sitten tyhjä lokero oikealla kuviolla hyllyltä."},
    qRings: {"en":"Put each shape in the right ring — or in both, or outside.","de":"Leg jede Form in den richtigen Ring – oder in beide oder nach draußen.","fr":"Place chaque forme dans le bon cerceau, dans les deux, ou dehors.","es":"Pon cada figura en el aro correcto, en los dos o afuera.","pt":"Coloque cada figura no aro certo, nos dois ou fora.","it":"Metti ogni figura nell’anello giusto, in tutti e due o fuori.","nl":"Zet elke vorm in de goede ring, in allebei of erbuiten.","sv":"Lägg varje form i rätt ring, i båda eller utanför.","da":"Læg hver figur i den rigtige ring, i begge eller udenfor.","no":"Legg hver figur i riktig ring, i begge eller utenfor.","fi":"Laita jokainen kuvio oikeaan renkaaseen, kumpaankin tai renkaiden ulkopuolelle."},
    hintPlace: {"en":"Every shape needs a place. Roll one on the lane if you are not sure.","de":"Jede Form braucht einen Platz. Roll eine über die Bahn, wenn du nicht sicher bist.","fr":"Chaque forme a besoin d’une place. Fais rouler une forme sur la piste si tu n’es pas sûr.","es":"Cada figura necesita un lugar. Rueda una por la pista si no estás seguro.","pt":"Cada figura precisa de um lugar. Role uma na pista se não tiver certeza.","it":"Ogni figura ha bisogno di un posto. Fai rotolare una figura sulla pista se non sei sicuro.","nl":"Elke vorm heeft een plek nodig. Rol er een over de baan als je het niet zeker weet.","sv":"Varje form behöver en plats. Rulla en på banan om du inte är säker.","da":"Hver figur skal have en plads. Rul en på banen, hvis du ikke er sikker.","no":"Hver figur trenger en plass. Rull en på banen hvis du ikke er sikker.","fi":"Jokainen kuvio tarvitsee paikan. Vieritä yksi radalla, jos et ole varma."},
    hintCount: {"en":"Count the dashes on its ticket. Which crate is for that many sides?","de":"Zähle die Striche auf ihrem Zettel. Welche Kiste ist für so viele Seiten?","fr":"Compte les traits sur son ticket. Quelle caisse est pour autant de côtés ?","es":"Cuenta las rayas de su boleto. ¿Qué caja es para esa cantidad de lados?","pt":"Conte os tracinhos do bilhete dela. Qual caixa é para esse número de lados?","it":"Conta i trattini sul suo biglietto. Quale scatola è per tanti lati?","nl":"Tel de streepjes op zijn kaartje. Welke kist is voor zoveel zijden?","sv":"Räkna strecken på lappen. Vilken back är för så många sidor?","da":"Tæl stregerne på sedlen. Hvilken kasse er til så mange sider?","no":"Tell strekene på lappen. Hvilken kasse er for så mange sider?","fi":"Laske viivat lapusta. Mikä laatikko on niin monelle sivulle?"},
    hintCabinet: {"en":"Look at its ticket: are the dashes all the same length? Are all the corner marks little squares?","de":"Schau auf ihren Zettel: Sind alle Striche gleich lang? Sind alle Eckzeichen kleine Quadrate?","fr":"Regarde son ticket : les traits ont-ils tous la même longueur ? Les marques des coins sont-elles toutes des petits carrés ?","es":"Mira su boleto: ¿todas las rayas miden lo mismo? ¿Todas las marcas de las esquinas son cuadraditos?","pt":"Olhe o bilhete: os tracinhos têm todos o mesmo tamanho? Todas as marcas dos cantos são quadradinhos?","it":"Guarda il suo biglietto: i trattini sono tutti lunghi uguali? I segni degli angoli sono tutti quadratini?","nl":"Kijk naar zijn kaartje: zijn alle streepjes even lang? Zijn alle hoektekens kleine vierkantjes?","sv":"Titta på lappen: är alla streck lika långa? Är alla hörnmärken små kvadrater?","da":"Se på sedlen: er alle stregerne lige lange? Er alle hjørnemærkerne små kvadrater?","no":"Se på lappen: er alle strekene like lange? Er alle hjørnemerkene små kvadrater?","fi":"Katso lappua: ovatko kaikki viivat yhtä pitkiä? Ovatko kaikki kulmamerkit pieniä neliöitä?"},
    hintRings: {"en":"Look at its ticket. Does it have four dashes? A square corner?","de":"Schau auf ihren Zettel. Hat er vier Striche? Einen rechten Winkel?","fr":"Regarde son ticket. A-t-il quatre traits ? Un angle droit ?","es":"Mira su boleto. ¿Tiene cuatro rayas? ¿Un ángulo recto?","pt":"Olhe o bilhete. Tem quatro tracinhos? Um ângulo reto?","it":"Guarda il suo biglietto. Ha quattro trattini? Un angolo retto?","nl":"Kijk naar zijn kaartje. Heeft het vier streepjes? Een rechte hoek?","sv":"Titta på lappen. Har den fyra streck? En rät vinkel?","da":"Se på sedlen. Har den fire streger? En ret vinkel?","no":"Se på lappen. Har den fire streker? En rett vinkel?","fi":"Katso lappua. Onko siinä neljä viivaa? Suora kulma?"},
    hintNumbers: {"en":"Count with the numbers, then find the place that matches the ticket.","de":"Zähle mit den Zahlen und such dann den Platz, der zum Zettel passt.","fr":"Compte avec les nombres, puis trouve la place qui va avec le ticket.","es":"Cuenta con los números y busca el lugar que va con el boleto.","pt":"Conte com os números e procure o lugar que combina com o bilhete.","it":"Conta con i numeri, poi trova il posto che va con il biglietto.","nl":"Tel met de getallen en zoek dan de plek die bij het kaartje past.","sv":"Räkna med siffrorna och hitta sedan platsen som passar lappen.","da":"Tæl med tallene, og find så den plads, der passer til sedlen.","no":"Tell med tallene, og finn så plassen som passer til lappen.","fi":"Laske numeroiden avulla ja etsi sitten paikka, joka sopii lappuun."},
    okSides: {"en":"Yes — {list}!","de":"Genau – {list}!","fr":"Oui : {list} !","es":"¡Sí! {list}.","pt":"Isso: {list}!","it":"Sì: {list}!","nl":"Ja: {list}!","sv":"Ja – {list}!","da":"Ja – {list}!","no":"Ja – {list}!","fi":"Kyllä: {list}!"},
    listAnd: {"en":" and ","de":" und ","fr":" et ","es":" y ","pt":" e ","it":" e ","nl":" en ","sv":" och ","da":" og ","no":" og ","fi":" ja "},
    okQuads: {"en":"Yes! A square has equal sides AND square corners — so it is a rectangle and a rhombus too.","de":"Ja! Ein Quadrat hat gleich lange Seiten UND rechte Winkel – also ist es auch ein Rechteck und eine Raute.","fr":"Oui ! Un carré a des côtés égaux ET des angles droits : c’est donc aussi un rectangle et un losange.","es":"¡Sí! Un cuadrado tiene lados iguales Y ángulos rectos: por eso también es un rectángulo y un rombo.","pt":"Isso! Um quadrado tem lados iguais E ângulos retos: por isso também é um retângulo e um losango.","it":"Sì! Un quadrato ha i lati uguali E gli angoli retti: quindi è anche un rettangolo e un rombo.","nl":"Ja! Een vierkant heeft gelijke zijden EN rechte hoeken – dus is het ook een rechthoek en een ruit.","sv":"Ja! En kvadrat har lika långa sidor OCH räta vinklar – så den är också en rektangel och en romb.","da":"Ja! Et kvadrat har lige lange sider OG rette vinkler – så det er også et rektangel og en rombe.","no":"Ja! Et kvadrat har like lange sider OG rette vinkler – så det er også et rektangel og en rombe.","fi":"Kyllä! Neliöllä on yhtä pitkät sivut JA suorat kulmat – joten se on myös suorakulmio ja neljäkäs."},
    okRings: {"en":"Yes! {k} shapes have four sides and a square corner — they go in both rings.","de":"Ja! {k} Formen haben vier Seiten und einen rechten Winkel – sie gehören in beide Ringe.","fr":"Oui ! {k} formes ont quatre côtés et un angle droit : elles vont dans les deux cerceaux.","es":"¡Sí! {k} figuras tienen cuatro lados y un ángulo recto: van en los dos aros.","pt":"Isso! {k} figuras têm quatro lados e um ângulo reto: elas vão nos dois aros.","it":"Sì! {k} figure hanno quattro lati e un angolo retto: vanno in tutti e due gli anelli.","nl":"Ja! {k} vormen hebben vier zijden en een rechte hoek – die horen in allebei de ringen.","sv":"Ja! {k} former har fyra sidor och en rät vinkel – de hör hemma i båda ringarna.","da":"Ja! {k} figurer har fire sider og en ret vinkel – de skal i begge ringe.","no":"Ja! {k} figurer har fire sider og en rett vinkel – de skal i begge ringene.","fi":"Kyllä! {k} kuviolla on neljä sivua ja suora kulma – ne kuuluvat kumpaankin renkaaseen."},
    okRings1: {"en":"Yes! 1 shape has four sides and a square corner — it goes in both rings.","de":"Ja! 1 Form hat vier Seiten und einen rechten Winkel – sie gehört in beide Ringe.","fr":"Oui ! 1 forme a quatre côtés et un angle droit : elle va dans les deux cerceaux.","es":"¡Sí! 1 figura tiene cuatro lados y un ángulo recto: va en los dos aros.","pt":"Isso! 1 figura tem quatro lados e um ângulo reto: ela vai nos dois aros.","it":"Sì! 1 figura ha quattro lati e un angolo retto: va in tutti e due gli anelli.","nl":"Ja! 1 vorm heeft vier zijden en een rechte hoek – die hoort in allebei de ringen.","sv":"Ja! 1 form har fyra sidor och en rät vinkel – den hör hemma i båda ringarna.","da":"Ja! 1 figur har fire sider og en ret vinkel – den skal i begge ringe.","no":"Ja! 1 figur har fire sider og en rett vinkel – den skal i begge ringene.","fi":"Kyllä! 1 kuviolla on neljä sivua ja suora kulma – se kuuluu kumpaankin renkaaseen."},
    aLane: {"en":"Lane: put a shape here to roll it","de":"Bahn: Leg eine Form hierher, um sie zu rollen","fr":"Piste : pose une forme ici pour la faire rouler","es":"Pista: pon aquí una figura para rodarla","pt":"Pista: coloque uma figura aqui para rolá-la","it":"Pista: metti qui una figura per farla rotolare","nl":"Baan: zet hier een vorm neer om hem te rollen","sv":"Bana: lägg en form här för att rulla den","da":"Bane: læg en figur her for at rulle den","no":"Bane: legg en figur her for å rulle den","fi":"Rata: laita kuvio tähän vierittääksesi sitä"},
    aLaneRoll: {"en":"Lane: roll the shape one side (arrow right)","de":"Bahn: Roll die Form eine Seite weiter (Pfeil rechts)","fr":"Piste : fais rouler la forme d’un côté (flèche droite)","es":"Pista: rueda la figura un lado más (flecha derecha)","pt":"Pista: role a figura mais um lado (seta para a direita)","it":"Pista: fai rotolare la figura di un lato (freccia destra)","nl":"Baan: rol de vorm één zijde verder (pijl rechts)","sv":"Bana: rulla formen en sida (pil höger)","da":"Bane: rul figuren én side (pil til højre)","no":"Bane: rull figuren én side (pil til høyre)","fi":"Rata: vieritä kuviota yhden sivun verran (nuoli oikealle)"},
    aShape: {"en":"Shape {k} of {n}, not rolled yet","de":"Form {k} von {n}, noch nicht gerollt","fr":"Forme {k} sur {n}, pas encore roulée","es":"Figura {k} de {n}, todavía sin rodar","pt":"Figura {k} de {n}, ainda não rolada","it":"Figura {k} di {n}, non ancora fatta rotolare","nl":"Vorm {k} van {n}, nog niet gerold","sv":"Form {k} av {n}, inte rullad än","da":"Figur {k} af {n}, ikke rullet endnu","no":"Figur {k} av {n}, ikke rullet ennå","fi":"Kuvio {k}/{n}, ei vielä vieritetty"},
    aShapeRolled: {"en":"Shape {k} of {n}, dashes printed: {d}","de":"Form {k} von {n}, gedruckte Striche: {d}","fr":"Forme {k} sur {n}, traits imprimés : {d}","es":"Figura {k} de {n}, rayas impresas: {d}","pt":"Figura {k} de {n}, tracinhos impressos: {d}","it":"Figura {k} di {n}, trattini stampati: {d}","nl":"Vorm {k} van {n}, gedrukte streepjes: {d}","sv":"Form {k} av {n}, tryckta streck: {d}","da":"Figur {k} af {n}, trykte streger: {d}","no":"Figur {k} av {n}, trykte streker: {d}","fi":"Kuvio {k}/{n}, tulostettuja viivoja: {d}"},
    aPlaced: {"en":"A placed shape (tap to pick it up again)","de":"Eine abgelegte Form (antippen, um sie wieder zu nehmen)","fr":"Une forme rangée (touche-la pour la reprendre)","es":"Una figura colocada (tócala para tomarla otra vez)","pt":"Uma figura colocada (toque para pegá-la de novo)","it":"Una figura sistemata (toccala per riprenderla)","nl":"Een geplaatste vorm (tik om hem weer te pakken)","sv":"En placerad form (tryck för att ta den igen)","da":"En placeret figur (tryk for at tage den igen)","no":"En plassert figur (trykk for å ta den igjen)","fi":"Paikalleen laitettu kuvio (napauta ottaaksesi sen uudelleen)"},
    aCrate: {"en":"Crate for {n} sides, {name}","de":"Kiste für {n} Seiten, {name}","fr":"Caisse pour {n} côtés, {name}","es":"Caja de {n} lados, {name}","pt":"Caixa de {n} lados, {name}","it":"Scatola per {n} lati, {name}","nl":"Kist voor {n} zijden, {name}","sv":"Back för {n} sidor, {name}","da":"Kasse til {n} sider, {name}","no":"Kasse for {n} sider, {name}","fi":"Laatikko, sivuja {n}, {name}"},
    aCrateNum: {"en":"Crate for {n} sides","de":"Kiste für {n} Seiten","fr":"Caisse pour {n} côtés","es":"Caja de {n} lados","pt":"Caixa de {n} lados","it":"Scatola per {n} lati","nl":"Kist voor {n} zijden","sv":"Back för {n} sidor","da":"Kasse til {n} sider","no":"Kasse for {n} sider","fi":"Laatikko, sivuja {n}"},
    aCrateName: {"en":"Crate: {name}","de":"Kiste: {name}","fr":"Caisse : {name}","es":"Caja: {name}","pt":"Caixa: {name}","it":"Scatola: {name}","nl":"Kist: {name}","sv":"Back: {name}","da":"Kasse: {name}","no":"Kasse: {name}","fi":"Laatikko: {name}"},
    aCellTL: {"en":"Drawer: all sides equal, square corners","de":"Fach: alle Seiten gleich, rechte Winkel","fr":"Tiroir : côtés tous égaux, angles droits","es":"Cajón: lados iguales, ángulos rectos","pt":"Gaveta: lados iguais, ângulos retos","it":"Cassetto: lati tutti uguali, angoli retti","nl":"Laatje: alle zijden gelijk, rechte hoeken","sv":"Låda: lika långa sidor, räta vinklar","da":"Skuffe: lige lange sider, rette vinkler","no":"Skuff: like lange sider, rette vinkler","fi":"Lokero: kaikki sivut yhtä pitkiä, suorat kulmat"},
    aCellTR: {"en":"Drawer: all sides equal, no square corners","de":"Fach: alle Seiten gleich, keine rechten Winkel","fr":"Tiroir : côtés tous égaux, pas d’angles droits","es":"Cajón: lados iguales, sin ángulos rectos","pt":"Gaveta: lados iguais, sem ângulos retos","it":"Cassetto: lati tutti uguali, niente angoli retti","nl":"Laatje: alle zijden gelijk, geen rechte hoeken","sv":"Låda: lika långa sidor, inga räta vinklar","da":"Skuffe: lige lange sider, ingen rette vinkler","no":"Skuff: like lange sider, ingen rette vinkler","fi":"Lokero: kaikki sivut yhtä pitkiä, ei suoria kulmia"},
    aCellBL: {"en":"Drawer: sides not all equal, square corners","de":"Fach: nicht alle Seiten gleich, rechte Winkel","fr":"Tiroir : côtés pas tous égaux, angles droits","es":"Cajón: lados no todos iguales, ángulos rectos","pt":"Gaveta: lados não todos iguais, ângulos retos","it":"Cassetto: lati non tutti uguali, angoli retti","nl":"Laatje: niet alle zijden gelijk, rechte hoeken","sv":"Låda: inte lika långa sidor, räta vinklar","da":"Skuffe: ikke lige lange sider, rette vinkler","no":"Skuff: ikke like lange sider, rette vinkler","fi":"Lokero: sivut eri pitkiä, suorat kulmat"},
    aCellBR: {"en":"Drawer: sides not all equal, no square corners","de":"Fach: nicht alle Seiten gleich, keine rechten Winkel","fr":"Tiroir : côtés pas tous égaux, pas d’angles droits","es":"Cajón: lados no todos iguales, sin ángulos rectos","pt":"Gaveta: lados não todos iguais, sem ângulos retos","it":"Cassetto: lati non tutti uguali, niente angoli retti","nl":"Laatje: niet alle zijden gelijk, geen rechte hoeken","sv":"Låda: inte lika långa sidor, inga räta vinklar","da":"Skuffe: ikke lige lange sider, ingen rette vinkler","no":"Skuff: ikke like lange sider, ingen rette vinkler","fi":"Lokero: sivut eri pitkiä, ei suoria kulmia"},
    aDrawer: {"en":"Shelf: shapes for the empty drawer","de":"Regal: Formen für das leere Fach","fr":"Étagère : formes pour le tiroir vide","es":"Repisa: figuras para el cajón vacío","pt":"Prateleira: figuras para a gaveta vazia","it":"Scaffale: figure per il cassetto vuoto","nl":"Plank: vormen voor het lege laatje","sv":"Hylla: former till den tomma lådan","da":"Hylde: figurer til den tomme skuffe","no":"Hylle: figurer til den tomme skuffen","fi":"Hylly: kuviot tyhjään lokeroon"},
    aRingA: {"en":"Ring: four sides","de":"Ring: vier Seiten","fr":"Cerceau : quatre côtés","es":"Aro: cuatro lados","pt":"Aro: quatro lados","it":"Anello: quattro lati","nl":"Ring: vier zijden","sv":"Ring: fyra sidor","da":"Ring: fire sider","no":"Ring: fire sider","fi":"Rengas: neljä sivua"},
    aRingB: {"en":"Ring: a square corner","de":"Ring: ein rechter Winkel","fr":"Cerceau : un angle droit","es":"Aro: un ángulo recto","pt":"Aro: um ângulo reto","it":"Anello: un angolo retto","nl":"Ring: een rechte hoek","sv":"Ring: en rät vinkel","da":"Ring: en ret vinkel","no":"Ring: en rett vinkel","fi":"Rengas: suora kulma"},
    aRingAB: {"en":"Both rings","de":"Beide Ringe","fr":"Les deux cerceaux","es":"Los dos aros","pt":"Os dois aros","it":"Tutti e due gli anelli","nl":"Allebei de ringen","sv":"Båda ringarna","da":"Begge ringe","no":"Begge ringene","fi":"Kumpikin rengas"},
    aRingout: {"en":"Outside the rings","de":"Außerhalb der Ringe","fr":"En dehors des cerceaux","es":"Fuera de los aros","pt":"Fora dos aros","it":"Fuori dagli anelli","nl":"Buiten de ringen","sv":"Utanför ringarna","da":"Uden for ringene","no":"Utenfor ringene","fi":"Renkaiden ulkopuolella"},
    anDocked: {"en":"The shape is on the lane.","de":"Die Form liegt auf der Bahn.","fr":"La forme est sur la piste.","es":"La figura está en la pista.","pt":"A figura está na pista.","it":"La figura è sulla pista.","nl":"De vorm ligt op de baan.","sv":"Formen ligger på banan.","da":"Figuren ligger på banen.","no":"Figuren ligger på banen.","fi":"Kuvio on radalla."},
    anTicket: {"en":"The ticket is done: dashes {d}.","de":"Der Zettel ist fertig: Striche {d}.","fr":"Le ticket est prêt : traits {d}.","es":"El boleto está listo: rayas {d}.","pt":"O bilhete está pronto: tracinhos {d}.","it":"Il biglietto è pronto: trattini {d}.","nl":"Het kaartje is klaar: streepjes {d}.","sv":"Lappen är klar: streck {d}.","da":"Sedlen er færdig: streger {d}.","no":"Lappen er ferdig: streker {d}.","fi":"Lappu on valmis: viivoja {d}."}
  },/*STRINGS-END*/
  /* the shape names per locale: n → [singular, plural, form after a numeral above 1, crate label with soft hyphens] */
  /*NOUNS-BEGIN*/NOUNS: {
    en: {"3":["triangle","triangles","triangles","Triangles"],"4":["quadrilateral","quadrilaterals","quadrilaterals","Quadri­laterals"],"5":["pentagon","pentagons","pentagons","Penta­gons"],"6":["hexagon","hexagons","hexagons","Hexa­gons"]},
    de: {"3":["Dreieck","Dreiecke","Dreiecke","Dreiecke"],"4":["Viereck","Vierecke","Vierecke","Vier­ecke"],"5":["Fünfeck","Fünfecke","Fünfecke","Fünf­ecke"],"6":["Sechseck","Sechsecke","Sechsecke","Sechs­ecke"]},
    fr: {"3":["triangle","triangles","triangles","Triangles"],"4":["quadrilatère","quadrilatères","quadrilatères","Quadri­latères"],"5":["pentagone","pentagones","pentagones","Penta­gones"],"6":["hexagone","hexagones","hexagones","Hexa­gones"]},
    es: {"3":["triángulo","triángulos","triángulos","Trián­gulos"],"4":["cuadrilátero","cuadriláteros","cuadriláteros","Cuadri­láteros"],"5":["pentágono","pentágonos","pentágonos","Pentá­gonos"],"6":["hexágono","hexágonos","hexágonos","Hexá­gonos"]},
    pt: {"3":["triângulo","triângulos","triângulos","Triân­gulos"],"4":["quadrilátero","quadriláteros","quadriláteros","Quadri­láteros"],"5":["pentágono","pentágonos","pentágonos","Pentá­gonos"],"6":["hexágono","hexágonos","hexágonos","Hexá­gonos"]},
    it: {"3":["triangolo","triangoli","triangoli","Trian­goli"],"4":["quadrilatero","quadrilateri","quadrilateri","Quadri­lateri"],"5":["pentagono","pentagoni","pentagoni","Penta­goni"],"6":["esagono","esagoni","esagoni","Esagoni"]},
    nl: {"3":["driehoek","driehoeken","driehoeken","Drie­hoeken"],"4":["vierhoek","vierhoeken","vierhoeken","Vier­hoeken"],"5":["vijfhoek","vijfhoeken","vijfhoeken","Vijf­hoeken"],"6":["zeshoek","zeshoeken","zeshoeken","Zes­hoeken"]},
    sv: {"3":["triangel","trianglar","trianglar","Trianglar"],"4":["fyrhörning","fyrhörningar","fyrhörningar","Fyr­hörningar"],"5":["femhörning","femhörningar","femhörningar","Fem­hörningar"],"6":["sexhörning","sexhörningar","sexhörningar","Sex­hörningar"]},
    da: {"3":["trekant","trekanter","trekanter","Trekanter"],"4":["firkant","firkanter","firkanter","Firkanter"],"5":["femkant","femkanter","femkanter","Femkanter"],"6":["sekskant","sekskanter","sekskanter","Seks­kanter"]},
    no: {"3":["trekant","trekanter","trekanter","Trekanter"],"4":["firkant","firkanter","firkanter","Firkanter"],"5":["femkant","femkanter","femkanter","Femkanter"],"6":["sekskant","sekskanter","sekskanter","Seks­kanter"]},
    fi: {"3":["kolmio","kolmiot","kolmiota","Kolmiot"],"4":["nelikulmio","nelikulmiot","nelikulmiota","Neli­kulmiot"],"5":["viisikulmio","viisikulmiot","viisikulmiota","Viisi­kulmiot"],"6":["kuusikulmio","kuusikulmiot","kuusikulmiota","Kuusi­kulmiot"]}
  },/*NOUNS-END*/
  defaults: { board: 'sides', crates: 'both' },
  settings: [
    { key: 'board', type: 'choice', labelKey: 'setBoard', options: [{ value: 'sides', labelKey: 'bSides' }, { value: 'quads', labelKey: 'bQuads' }, { value: 'rings', labelKey: 'bRings' }] },
    { key: 'crates', type: 'choice', labelKey: 'setCrates', options: [{ value: 'both', labelKey: 'cBoth' }, { value: 'num', labelKey: 'cNum' }, { value: 'name', labelKey: 'cName' }] }
  ],
  OK_MS: 500, FAST: false,
  TEAL: '#146B5E', CORAL: '#F2784B', INK: '#2B2B2B', FILL: '#CFE7E2',

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._drag = null; this._sel = null;
    injectTrundleWheelCSS();
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
  _board: function () { return TrundleWheelCore.boardOf(this._setting('board')); },
  _cratesShow: function () { var c = this._setting('crates'); return c === 'num' || c === 'name' ? c : 'both'; },
  _loc: function () { return TrundleWheelCore.locOf(this.api && this.api.lang); },
  _key: function () { return this._board(); },
  _noun: function (n) { var N = this.NOUNS[this._loc()] || this.NOUNS.en; return N[n] || this.NOUNS.en[n]; },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = TrundleWheelCore.rounds(this._board()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = TrundleWheelCore, pool = this._ensurePool(), n = C.passSize(this._board()), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(this._board(), Math.random, fresh ? null : this._prev); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'trundle-wheel.' + this._key() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function () { var st = this.st; return this._t(st.board === 'sides' ? 'qSides' : st.board === 'rings' ? 'qRings' : st.missing ? 'qMissing' : 'qQuads'); },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers(); this._endDrag();
    this.st = TrundleWheelCore.newState(this._board(), k);
    this._sel = null;
    this._view = { note: '', soft: false, t: 0, anim: null, nums: false, pulse: null, hop: false };
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
    var wrap = api.el('div', 'tw-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="tw-lanebox" data-qa="lane"></div><div class="tw-work"><div class="tw-tray" data-qa="tray"></div><div class="tw-boardbox" data-qa="board"></div></div><p class="tw-note" data-qa="note" aria-live="polite"></p><div class="tw-ctrl"></div>';
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _geometry: function (W) {
    var wide = W >= 600, cramp = W < 300, st = this.st, n = st.items.filter(function (it) { return it.from === 't'; }).length;
    var band = wide ? 130 : 84, strip = wide ? 30 : 24, laneW = W, laneH = band + strip + (wide ? 18 : 12);
    /* on a phone the lane rests as a short dock strip and opens while a shape is on it */
    var idle = !wide && st.docked == null && !(this._view && this._view.anim); if (idle) { band = 26; strip = 20; laneH = band + strip + 10; }
    var cols = wide ? 2 : 4, trayW = wide ? Math.min(300, Math.floor(W * 0.45)) : W, cellW = Math.floor((trayW - (cols - 1) * 8) / cols), cellH = wide ? 96 : cramp ? 58 : 70;
    return { W: W, wide: wide, cramp: cramp, band: band, strip: strip, laneW: laneW, laneH: laneH, budget: wide ? 470 : Math.min(236, W - 92), cols: cols, trayW: trayW, cellW: cellW, cellH: cellH,
      boardW: wide ? W - trayW - 16 : W, shapePx: wide ? 84 : cramp ? 46 : 56, n: n, idle: idle };
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
    this._wrap.setAttribute('lang', this._loc());
    this._wrap.className = 'tw-wrap is-' + st.board + (g.wide ? ' is-wide' : ' is-narrow') + (g.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this._sel ? ' is-holding' : '');
    this._paintLane(); this._paintTray(); this._paintBoard(); this._paintCtrl();
    var note = this._qs('.tw-note');
    note.textContent = v.note || ''; note.className = 'tw-note' + (v.note && !v.soft ? ' is-hint' : '');
    this._setPrompt();
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); },

  /* a shape as SVG, fitted to px (its bounding box), one fill for every shape so colour never tells */
  _shapeSvg: function (it, px, extra) {
    var v = TrundleWheelCore.verts(it.id, it.rot), xs = v.map(function (p) { return p[0]; }), ys = v.map(function (p) { return p[1]; });
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys), side = Math.max(x1 - x0, y1 - y0), pad = side * 0.06;
    var vb = (x0 - pad - (side - (x1 - x0)) / 2) + ' ' + (y0 - pad - (side - (y1 - y0)) / 2) + ' ' + (side + 2 * pad) + ' ' + (side + 2 * pad), sw = (side + 2 * pad) / px * 3;
    var sz = Math.round(px * (it.size || 1));
    return '<svg class="tw-shape' + (extra || '') + '" viewBox="' + vb + '" width="' + sz + '" height="' + sz + '" aria-hidden="true"><polygon points="' + v.map(function (p) { return p[0].toFixed(2) + ',' + p[1].toFixed(2); }).join(' ') + '" fill="' + this.FILL + '" stroke="' + this.INK + '" stroke-width="' + sw.toFixed(2) + '" stroke-linejoin="round"/></svg>';
  },
  /* a ticket: the dashes in roll order (the first coral), a mark after each (a dot, or an open square for a square corner) */
  _ticketSvg: function (tk, w, h, nums) {
    var total = tk.dashes.reduce(function (s, d) { return s + d; }, 0), gap = 6, scale = (w - gap * tk.dashes.length) / total, x = 2, self = this;
    var o = '<svg class="tw-ticket" viewBox="0 0 ' + (w + 4) + ' ' + (h + (nums ? 14 : 0)) + '" width="' + (w + 4) + '" height="' + (h + (nums ? 14 : 0)) + '" aria-hidden="true"><rect x="0" y="0" width="' + (w + 4) + '" height="' + h + '" rx="3" fill="#FFFDF6" stroke="#E2D4B4"/>';
    tk.dashes.forEach(function (d, i) {
      var len = d * scale, my = h / 2;
      o += '<line x1="' + x.toFixed(1) + '" y1="' + my + '" x2="' + (x + len).toFixed(1) + '" y2="' + my + '" stroke="' + (i === 0 ? self.CORAL : self.TEAL) + '" stroke-width="' + Math.max(2.5, h * 0.2).toFixed(1) + '" stroke-linecap="butt"/>';
      if (nums) o += '<text x="' + (x + len / 2).toFixed(1) + '" y="' + (h + 12) + '" text-anchor="middle" class="tw-tnum">' + (i + 1) + '</text>';
      x += len;
      var mx = x + gap / 2, ms = Math.max(4, h * 0.34);
      o += tk.marks[i] === 'sq' ? '<rect x="' + (mx - ms / 2).toFixed(1) + '" y="' + (my - ms / 2).toFixed(1) + '" width="' + ms.toFixed(1) + '" height="' + ms.toFixed(1) + '" fill="none" stroke="' + self.TEAL + '" stroke-width="1.6"/>' : '<circle cx="' + mx.toFixed(1) + '" cy="' + my + '" r="' + (ms * 0.3).toFixed(1) + '" fill="' + self.TEAL + '"/>';
      x += gap;
    });
    return o + '</svg>';
  },

  /* ---- the lane: the dock, the shape tumbling, the paper strip printing ---- */
  _paintLane: function () {
    var st = this.st, g = this._g, el = this._qs('.tw-lanebox'), C = TrundleWheelCore, v = this._view, self = this;
    el.innerHTML = '';
    var lane = this._btn('tw-lane' + (st.docked != null || v.anim ? ' is-busy' : '') + (this._sel ? ' is-target' : ''), 'lane', this._t(st.docked != null ? 'aLaneRoll' : 'aLane'), '');
    lane.setAttribute('data-place', 'dock'); lane.style.height = g.laneH + 'px';
    var key = v.anim ? v.anim.key : st.docked, it = key != null ? C.item(st, key) : null;
    var ground = g.band + 6, x0 = 14, o = '<svg class="tw-lanesvg" width="' + g.laneW + '" height="' + g.laneH + '" aria-hidden="true">';
    o += '<rect x="0" y="' + ground + '" width="' + g.laneW + '" height="' + (g.laneH - ground) + '" fill="#E9D3A8" stroke="' + this.INK + '" stroke-width="3"/>';
    o += '<rect x="' + x0 + '" y="' + (ground + 4) + '" width="' + (g.laneW - 2 * x0) + '" height="' + (g.strip - 6) + '" rx="3" fill="#FFFDF6"/>';
    o += '<rect x="2" y="' + (ground - 12) + '" width="' + (g.wide ? 72 : 48) + '" height="12" rx="3" fill="#C9965F" stroke="' + this.INK + '" stroke-width="2"/>';
    if (it) {
      var vv = C.verts(it.id, it.rot), plan = C.rollPlan(vv, C.bottomSide(vv)), P = plan.dashes.reduce(function (s, d) { return s + d; }, 0);
      var diag = 0; vv.forEach(function (p) { vv.forEach(function (q) { diag = Math.max(diag, Math.hypot(p[0] - q[0], p[1] - q[1])); }); });
      var k = Math.min(g.budget / P, (g.band - 8) / diag), step = v.anim ? v.anim.step : st.step, t = v.anim ? v.anim.t : v.t;
      var pose = C.poseAt(plan, Math.min(step, plan.order.length), t), sx = function (x) { return (x0 + x * k).toFixed(1); }, sy = function (y) { return (ground + y * k).toFixed(1); };
      /* the prints: the sides that have landed (the first coral), the corners tipped over */
      var cum = 0, my = ground + 4 + (g.strip - 6) / 2, landed = Math.min(step, plan.order.length - 1);
      for (var i = 0; i <= landed; i++) {
        o += '<line x1="' + sx(cum) + '" y1="' + my + '" x2="' + sx(cum + plan.dashes[i]) + '" y2="' + my + '" stroke="' + (i === 0 ? this.CORAL : this.TEAL) + '" stroke-width="5"/>';
        cum += plan.dashes[i];
        if (i < step) o += plan.marks[i] === 'sq' ? '<rect x="' + (x0 + cum * k - 4.5).toFixed(1) + '" y="' + (my - 9).toFixed(1) + '" width="9" height="9" fill="#FFFDF6" stroke="' + this.TEAL + '" stroke-width="2"/>' : '<circle cx="' + sx(cum) + '" cy="' + (my - 5) + '" r="3.5" fill="' + this.TEAL + '"/>';
      }
      /* the shape, its start side coral */
      var pts = pose.pts, n = pts.length, s0 = plan.start;
      o += '<polygon class="tw-roller" points="' + pts.map(function (p) { return sx(p[0]) + ',' + sy(p[1]); }).join(' ') + '" fill="' + this.FILL + '" stroke="' + this.INK + '" stroke-width="3" stroke-linejoin="round"/>';
      var a = pts[s0], b = pts[(s0 + 1) % n];
      o += '<line x1="' + sx(a[0]) + '" y1="' + sy(a[1]) + '" x2="' + sx(b[0]) + '" y2="' + sy(b[1]) + '" stroke="' + this.CORAL + '" stroke-width="5" stroke-linecap="round"/>';
    }
    lane.innerHTML = o + '</svg>' + (it ? '' : '<span class="tw-dockhint' + (g.idle ? ' is-small' : '') + '" aria-hidden="true"></span>');
    lane.addEventListener('pointerdown', function (e) { if (e.button) return; self._pressLane(e); });
    lane.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (self._sel != null) self._putSel('dock'); else self._roll(1); return; } if (e.key === 'ArrowRight') { e.preventDefault(); self._roll(1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); self._roll(-1); } });
    el.appendChild(lane);
  },

  /* ---- the tray: every shape not placed, with its ticket once rolled ---- */
  _paintTray: function () {
    var st = this.st, g = this._g, el = this._qs('.tw-tray'), self = this, v = this._view;
    el.innerHTML = ''; el.setAttribute('data-place', 'tray'); el.style.width = g.trayW + 'px';
    var home = st.items.filter(function (it) { return it.from === 't' && it.place == null && st.docked !== it.key && !(v.anim && v.anim.key === it.key); });
    var total = st.items.filter(function (it) { return it.from === 't'; }).length;
    /* only the shapes still in the tray, packed (placed ones leave no blank cells); an empty tray steps aside */
    var all = st.items.filter(function (it) { return it.from === 't'; });
    el.style.display = home.length ? '' : 'none';
    home.forEach(function (it) {
      var cell = self.api.el('div', 'tw-cell'); cell.style.width = g.cellW + 'px'; cell.style.height = (g.cellH + (it.ticket ? 16 : 0)) + 'px';
      cell.appendChild(self._shapeBtn(it, all.indexOf(it), total));
      el.appendChild(cell);
    });
  },
  _shapeBtn: function (it, i, total) {
    var self = this, g = this._g, st = this.st, v = this._view;
    var label = this._t(it.ticket ? 'aShapeRolled' : 'aShape', { k: i + 1, n: total, d: it.ticket ? it.ticket.dashes.length : '' });
    var b = this._btn('tw-piece' + (this._sel === it.key ? ' is-sel' : '') + (v.hop ? ' is-hop' : ''), 'shape-' + it.key, label, this._shapeSvg(it, g.shapePx));
    if (it.ticket) b.insertAdjacentHTML('beforeend', this._ticketSvg(it.ticket, Math.min(g.cellW - 12, 120), 12, v.nums && st.verdict && st.verdict.wrong.indexOf(it.key) >= 0));
    b.disabled = st.done;
    b.addEventListener('pointerdown', function (e) { if (e.button) return; self._pressShape(e, it.key); });
    b.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); self._tapShape(it.key); } });
    return b;
  },
  _thumb: function (it, px) {
    var self = this, st = this.st;
    var b = this._btn('tw-thumb' + (this._sel === it.key ? ' is-sel' : '') + (this._view.hop ? ' is-hop' : ''), 'shape-' + it.key, this._t('aPlaced'), this._shapeSvg(it, px));
    b.disabled = st.done;
    var into = function () { if (self._sel != null && self._sel !== it.key && it.place != null) { self._putSel(String(it.place)); return true; } return false; };
    b.addEventListener('pointerdown', function (e) { if (e.button) return; e.stopPropagation(); if (into()) { e.preventDefault(); return; } self._pressShape(e, it.key); });
    b.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); if (!into()) self._tapShape(it.key); } });
    return b;
  },

  /* ---- the boards ---- */
  _paintBoard: function () {
    var st = this.st, el = this._qs('.tw-boardbox'), g = this._g;
    el.innerHTML = ''; el.style.width = g.boardW + 'px';
    if (st.board === 'sides') this._paintCrates(el); else if (st.board === 'quads') this._paintCabinet(el); else this._paintRings(el);
  },
  _place: function (cls, place, label) {
    var self = this, b = this._btn(cls + (this._view.pulse && this._view.pulse.indexOf(String(place)) >= 0 ? ' is-pulse' : '') + (this._sel ? ' is-target' : ''), 'place-' + place, label, '');
    b.setAttribute('data-place', String(place));
    b.addEventListener('click', function () { if (self._sel != null) self._putSel(place); });
    return b;
  },
  _inPlace: function (box, place, px) { var self = this, st = this.st; st.items.forEach(function (it) { if (it.place != null && String(it.place) === String(place)) box.appendChild(self._thumb(it, px)); }); },
  _miniTicket: function (n, w, h) { var d = [], m = []; for (var i = 0; i < n; i++) { d.push(1); m.push('dot'); } return this._ticketSvg({ dashes: d, marks: m }, w, h, false); },
  _paintCrates: function (el) {
    var st = this.st, g = this._g, self = this, show = this._cratesShow();
    var row = this.api.el('div', 'tw-crates'); el.appendChild(row);
    var w = Math.min(g.wide ? 96 : 130, Math.floor((g.boardW - (st.crates.length - 1) * 8) / st.crates.length));
    st.crates.forEach(function (n) {
      var nm = self._noun(n)[3] || self._noun(n)[1];
      var c = self._place('tw-crate', n, self._t(show === 'name' ? 'aCrateName' : show === 'num' ? 'aCrateNum' : 'aCrate', { n: n, name: nm }));
      c.style.width = w + 'px';
      var front = '<span class="tw-front">' + (show !== 'name' ? self._miniTicket(n, Math.min(64, w - 16), 8) + '<b class="tw-cnum">' + n + '</b>' : '') + (show !== 'num' ? '<span class="tw-cname">' + self._esc(nm) + '</span>' : '') + '</span>';
      c.innerHTML = front + '<span class="tw-in"></span>';
      self._inPlace(c.querySelector('.tw-in'), n, g.wide ? 40 : 32);
      row.appendChild(c);
    });
  },
  /* a header: four corner marks (open squares or dots) or four dashes (all equal, or long and short); one teal, no start colour */
  _markRow: function (kind, w, h) {
    var o = '<svg class="tw-hdsvg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true">', T = this.TEAL, my = h / 2, i;
    if (kind === 'sq' || kind === 'dot') for (i = 0; i < 4; i++) { var cx = w * (i + 0.5) / 4, s = h * 0.62; o += kind === 'sq' ? '<rect x="' + (cx - s / 2).toFixed(1) + '" y="' + (my - s / 2).toFixed(1) + '" width="' + s.toFixed(1) + '" height="' + s.toFixed(1) + '" fill="none" stroke="' + T + '" stroke-width="2.5"/>' : '<circle cx="' + cx.toFixed(1) + '" cy="' + my + '" r="' + (h * 0.2).toFixed(1) + '" fill="' + T + '"/>'; }
    else { var d = kind === 'eq' ? [1, 1, 1, 1] : [1.7, 0.6, 1.7, 0.6], tot = d.reduce(function (a, b) { return a + b; }, 0), gap = 5, k = (w - gap * 3) / tot, x = 0; d.forEach(function (q) { o += '<line x1="' + x.toFixed(1) + '" y1="' + my + '" x2="' + (x + q * k).toFixed(1) + '" y2="' + my + '" stroke="' + T + '" stroke-width="' + (h * 0.28).toFixed(1) + '"/>'; x += q * k + gap; }); }
    return o + '</svg>';
  },
  /* the cabinet: columns = four square corners (yes / no), rows = four equal sides (yes / no); no words */
  _paintCabinet: function (el) {
    var st = this.st, g = this._g, self = this, hw = g.wide ? 92 : 70, hh = g.wide ? 20 : 16;
    var cab = this.api.el('div', 'tw-cabinet'); el.appendChild(cab);
    cab.innerHTML = '<span></span><span class="tw-hd">' + this._markRow('sq', hw, hh) + '</span><span class="tw-hd">' + this._markRow('dot', hw, hh) + '</span>';
    [['T', 'eq'], ['B', 'uneq']].forEach(function (r) {
      cab.insertAdjacentHTML('beforeend', '<span class="tw-hd tw-rowhd">' + self._markRow(r[1], g.wide ? 64 : 46, hh) + '</span>');
      ['L', 'R'].forEach(function (c) {
        var cell = r[0] + c, b = self._place('tw-cellbox' + (st.missing === cell ? ' is-missing' : ''), cell, self._t('aCell' + cell));
        b.innerHTML = '<span class="tw-in"></span>'; self._inPlace(b.querySelector('.tw-in'), cell, g.wide ? 46 : 38);
        cab.appendChild(b);
      });
    });
    /* the shelf (Q5–Q8): three candidates for the empty drawer */
    var dr = st.items.filter(function (it) { return it.from === 'd' && it.place == null; });
    if (st.missing) {
      var drawer = this.api.el('div', 'tw-drawer'); drawer.setAttribute('data-place', 'tray'); drawer.setAttribute('aria-label', this._t('aDrawer'));
      dr.forEach(function (it) { drawer.appendChild(self._thumb(it, g.wide ? 52 : g.cramp ? 38 : 44)); });
      el.appendChild(drawer);
    }
  },
  /* two rings: A "four sides" (four dashes), B "a square corner" (one open square); the outside is a band below them */
  _paintRings: function (el) {
    var st = this.st, g = this._g, self = this, W = Math.min(g.boardW, 380), r = Math.round(W * (g.wide ? 0.29 : g.cramp ? 0.21 : 0.25)), top = g.wide ? 34 : g.cramp ? 22 : 26, outH = g.wide ? 64 : 50;
    var cA = [W / 2 - r * 0.55, top + r], cB = [W / 2 + r * 0.55, top + r], ringH = top + 2 * r + 8, H = ringH + outH;
    var mat = this.api.el('div', 'tw-mat'); mat.style.width = W + 'px'; mat.style.height = H + 'px'; el.appendChild(mat);
    mat.insertAdjacentHTML('beforeend', '<svg class="tw-ringsvg" width="' + W + '" height="' + H + '" aria-hidden="true"><line x1="10" y1="' + ringH + '" x2="' + (W - 10) + '" y2="' + ringH + '" stroke="#E2D4B4" stroke-width="2" stroke-dasharray="6 5"/><circle cx="' + cA[0] + '" cy="' + cA[1] + '" r="' + r + '" fill="rgba(20,107,94,.07)" stroke="' + this.TEAL + '" stroke-width="3"/><circle cx="' + cB[0] + '" cy="' + cB[1] + '" r="' + r + '" fill="rgba(242,120,75,.07)" stroke="' + this.CORAL + '" stroke-width="3"/></svg>');
    mat.insertAdjacentHTML('beforeend', '<span class="tw-tag is-a" style="left:' + Math.max(4, cA[0] - r) + 'px">' + this._markRow('eq', g.wide ? 62 : 52, 14) + '</span><span class="tw-tag is-b" style="right:' + Math.max(4, W - cB[0] - r) + 'px"><svg width="22" height="22" aria-hidden="true"><rect x="4" y="4" width="14" height="14" fill="none" stroke="' + this.TEAL + '" stroke-width="2.5"/></svg></span>');
    var zone = function (place, x, y, w, h) { var b = self._place('tw-zone', place, self._t('aRing' + place)); b.style.left = x + 'px'; b.style.top = y + 'px'; b.style.width = w + 'px'; b.style.height = h + 'px'; b.innerHTML = '<span class="tw-in"></span>'; self._inPlace(b.querySelector('.tw-in'), place, g.wide ? 38 : 32); mat.appendChild(b); };
    var lensL = cB[0] - r, lensR = cA[0] + r, zh = r * 1.3, zy = top + r - zh / 2;
    zone('A', cA[0] - r * 0.86, zy, lensL - (cA[0] - r * 0.86) - 2, zh);
    zone('AB', lensL + 4, zy, lensR - lensL - 8, zh);
    zone('B', lensR + 2, zy, cB[0] + r * 0.86 - lensR - 2, zh);
    zone('out', 6, ringH + 3, W - 12, outH - 6);
  },
  _paintCtrl: function () {
    var st = this.st, el = this._qs('.tw-ctrl'), self = this;
    el.innerHTML = '';
    var go = this._btn('tw-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._esc(this._t('checkBtn')) + '</span>');
    go.disabled = st.done; go.addEventListener('click', function () { self._check(); });
    el.appendChild(go);
  },

  /* ---------------- the hand ---------------- */
  _moved: function () { var v = this._view; v.note = ''; v.nums = false; v.pulse = null; this._paint(); },
  _tapShape: function (key) { if (this.st.done) return; this._sel = this._sel === key ? null : key; this.api.sound(500); this._paint(); },
  _putSel: function (place) { var key = this._sel; this._sel = null; this._put(key, place); },
  _put: function (key, place) {
    var C = TrundleWheelCore, st = this.st;
    if (place === 'dock') { if (C.put(st, key, 'dock')) { this._view.t = 0; this.api.sound(420); this._moved(); this.api.announce(this._t('anDocked')); } else this._paint(); return; }
    var p = st.board === 'sides' && place !== 'tray' ? +place : place;
    if (C.put(st, key, p)) { this.api.sound(place === 'tray' ? 360 : 600); this._moved(); } else this._paint();
  },
  /* roll the docked shape one side; the last side brings the coral side home: the ticket rides back to the tray */
  _roll: function (d) {
    var st = this.st, C = TrundleWheelCore; if (st.docked == null) return;
    var key = st.docked, r = C.roll(st, d); this._view.t = 0;
    if (!r) return;
    if (r === 'done') { this.api.sound(1046); var it = C.item(st, key); this.api.announce(this._t('anTicket', { d: it.ticket.dashes.length })); }
    else this.api.sound(300 + 60 * st.step);
    this._moved();
  },
  _pressShape: function (e, key) {
    var self = this, st = this.st, x0 = e.clientX, y0 = e.clientY, moved = false, ghost = null, src = e.currentTarget;
    e.preventDefault(); this._endDrag();
    var mv = function (ev) {
      if (!moved && Math.hypot(ev.clientX - x0, ev.clientY - y0) < 6) return;
      ev.preventDefault();
      if (!moved) { moved = true; ghost = src.querySelector('svg').cloneNode(true); ghost.setAttribute('class', 'tw-ghost'); document.body.appendChild(ghost); src.style.opacity = '.35'; }
      ghost.style.left = (ev.clientX - ghost.getBoundingClientRect().width / 2) + 'px'; ghost.style.top = (ev.clientY - ghost.getBoundingClientRect().height / 2) + 'px';
    };
    var up = function (ev) {
      self._endDrag();
      if (!moved) { self._tapShape(key); return; }
      ghost.remove(); src.style.opacity = '';
      var hit = document.elementFromPoint(ev.clientX, ev.clientY), pl = hit && hit.closest ? hit.closest('[data-place]') : null;
      self._sel = null;
      if (pl) self._put(key, pl.getAttribute('data-place')); else self._paint();
    };
    this._drag = { mv: mv, up: up };
    document.addEventListener('pointermove', mv); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  /* on the lane: holding a shape → dock it; a docked shape → drag right to roll it (left to un-roll), a tap rolls one side */
  _pressLane: function (e) {
    var self = this, st = this.st, C = TrundleWheelCore;
    if (st.done || this._view.anim) return;
    if (this._sel != null) { this._putSel('dock'); return; }
    if (st.docked == null) return;
    e.preventDefault(); this._endDrag();
    var x0 = e.clientX, moved = false;
    var stepPx = function () { var it = C.item(st, st.docked), vv = C.verts(it.id, it.rot), plan = C.rollPlan(vv, C.bottomSide(vv)), P = plan.dashes.reduce(function (s, d) { return s + d; }, 0), diag = 0; vv.forEach(function (p) { vv.forEach(function (q) { diag = Math.max(diag, Math.hypot(p[0] - q[0], p[1] - q[1])); }); }); var k = Math.min(self._g.budget / P, (self._g.band - 8) / diag); return plan.dashes[Math.min(st.step + 1, plan.dashes.length - 1)] * k; };
    var mv = function (ev) {
      ev.preventDefault(); var dx = ev.clientX - x0; if (!moved && Math.abs(dx) < 6) return; moved = true;
      if (st.docked == null) return;
      var sp = stepPx();
      if (dx >= sp) { x0 += sp; self._roll(1); return; }
      if (dx <= -sp && st.step > 0) { x0 -= sp; self._roll(-1); return; }
      self._view.t = Math.max(0, dx / sp); self._paintLane();
    };
    var up = function () { self._endDrag(); if (!moved) { self._roll(1); return; } if (self._view.t > 0.5 && st.docked != null) self._roll(1); else { self._view.t = 0; self._paintLane(); } };
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
    var st = this.st, v = this._view, C = TrundleWheelCore, self = this; if (st.done || v.anim) return;
    var res = C.check(st);
    if (res.result === 'no') return;
    if (res.result === 'note') { v.note = this._t(res.key); v.soft = true; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    if (res.result === 'ok') { this._success(); return; }
    v.soft = false; v.nums = st.help;
    /* miss 2: the place each wrong shape belongs pulses (A: its crate; B: its cell; C: its region) */
    v.pulse = st.help ? res.keys.map(function (k) { return String(C.placeFor(st.board, C.infoOf(C.item(st, k)))); }) : null;
    v.note = this._t(C.hint(st));
    /* the wheel rolls each wrong shape for the child, one after another, then it sits in the tray wearing its ticket */
    var queue = res.keys.slice(), dur = this.FAST ? 0 : 900;
    var next = function () {
      if (!queue.length) { v.anim = null; self._paint(); return; }
      var key = queue.shift(), it = C.item(st, key), n = it.ticket.dashes.length, frames = Math.max(1, n * 4), f = 0;
      v.anim = { key: key, step: 0, t: 0 };
      var tick = function () { if (self.st !== st) return; f++; var p = f / frames * n; v.anim.step = Math.min(n, Math.floor(p)); v.anim.t = p - Math.floor(p); self._paintLane(); if (f < frames) self._later(tick, dur / frames); else self._later(next, self.FAST ? 0 : 200); };
      if (dur) self._later(tick, dur / frames); else next();
    };
    this._paint(); this.api.announce(v.note); this.api.sound(240);
    if (dur) next(); else { v.anim = null; this._paint(); }
  },
  /* the success line: board A lists the crates' counts ("2 triangles, 3 quadrilaterals and 1 pentagon") */
  _okLine: function () {
    var st = this.st, C = TrundleWheelCore, self = this;
    if (st.board === 'sides') {
      var parts = C.counts(st).map(function (c) { var nn = self._noun(c.n); return c.k + ' ' + (c.k === 1 ? nn[0] : nn[2]); });
      var list = parts.length > 1 ? parts.slice(0, -1).join(', ') + this._t('listAnd') + parts[parts.length - 1] : parts[0];
      return this._t('okSides', { list: list });
    }
    if (st.board === 'quads') return this._t('okQuads');
    var k = st.items.filter(function (it) { return it.place === 'AB'; }).length;
    return this._t(k === 1 ? 'okRings1' : 'okRings', { k: k });
  },
  _success: function () {
    var st = this.st, v = this._view, msg = this._okLine();
    v.note = ''; v.nums = false; v.pulse = null; v.hop = true;
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg); this.api.sound(988);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectTrundleWheelCSS() {
  if (typeof document === 'undefined' || document.getElementById('tw-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2B2B2B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.tw-wrap{position:relative;width:100%;max-width:900px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .tw-wrap:focus{outline:none;}'
  + '.tw-lanebox{width:100%;} .tw-lane{display:block;width:100%;padding:0;border:0;border-radius:12px;background:linear-gradient(#F3F8F5,#FBF5E8);cursor:pointer;position:relative;overflow:hidden;touch-action:none;} .tw-lane:focus-visible{outline:3px solid #146B5E;outline-offset:2px;} .tw-lane.is-target{box-shadow:0 0 0 3px #F2784B;} .tw-lanesvg{display:block;}'
  + '.tw-dockhint.is-small{top:3px;width:24px;height:24px;border-width:2px;} .tw-dockhint{position:absolute;left:10px;top:14px;width:60px;height:60px;border:3px dashed rgba(20,107,94,.35);border-radius:12px;pointer-events:none;}'
  + '.tw-work{display:flex;gap:16px;justify-content:center;align-items:flex-start;width:100%;} .tw-wrap.is-narrow .tw-work{flex-direction:column;align-items:center;gap:10px;}'
  + '.tw-tray{display:flex;flex-wrap:wrap;gap:8px;align-content:flex-start;justify-content:center;} .tw-cell{display:flex;align-items:center;justify-content:center;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #E8DCC2;}'
  + '.tw-piece,.tw-thumb{display:flex;flex-direction:column;align-items:center;gap:2px;padding:4px;border:0;border-radius:10px;background:none;cursor:grab;touch-action:none;} .tw-piece{min-width:44px;min-height:44px;} .tw-thumb{min-width:44px;min-height:44px;padding:2px;}'
  + '.tw-piece.is-sel,.tw-thumb.is-sel{box-shadow:0 0 0 3px #F2784B;background:rgba(242,120,75,.08);} .tw-piece:focus-visible,.tw-thumb:focus-visible{outline:3px solid #146B5E;} .tw-shape{display:block;overflow:visible;} .tw-ticket{display:block;}'
  + '.tw-tnum{font:800 10px ' + H + ';fill:#146B5E;}'
  + '.is-hop{animation:twHop .45s ease 2;} @keyframes twHop{50%{transform:translateY(-8px)}}'
  + '.tw-ghost{position:fixed;z-index:60;pointer-events:none;width:72px;height:72px;filter:drop-shadow(0 4px 6px rgba(0,0,0,.2));}'
  + '.tw-boardbox{display:flex;flex-direction:column;align-items:center;gap:8px;}'
  + '.tw-crates{display:flex;gap:8px;justify-content:center;} .tw-crate{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:4px;min-height:128px;padding:6px 4px;border:0;border-radius:6px 6px 12px 12px;background:#E2B36F;box-shadow:inset 0 0 0 3px ' + INK + ',inset 0 -10px 0 #C9965F;cursor:pointer;} .tw-wrap.is-narrow .tw-crate{min-height:108px;}'
  + '.tw-front{display:flex;flex-direction:column;align-items:center;gap:1px;padding:4px 6px;border-radius:8px;background:#FFFDF6;} .tw-cnum{font:800 30px/1 ' + H + ';color:' + INK + ';} .tw-cname{font:800 12px/1.15 ' + B + ';color:' + INK + ';text-align:center;hyphens:manual;overflow-wrap:normal;max-width:100%;}'
  + '.tw-in{display:flex;flex-wrap:wrap;justify-content:center;gap:2px;max-width:100%;}'
  + '.tw-crate:focus-visible,.tw-cellbox:focus-visible,.tw-zone:focus-visible{outline:3px solid #146B5E;outline-offset:2px;} .is-target.tw-crate,.is-target.tw-cellbox,.is-target.tw-zone{box-shadow:inset 0 0 0 3px #F2784B;} .is-pulse{animation:twPulse .5s ease 2;} @keyframes twPulse{50%{transform:scale(1.06);filter:drop-shadow(0 0 6px #F2784B)}}'
  + '.tw-cabinet{display:grid;grid-template-columns:auto 1fr 1fr;gap:6px;align-items:center;justify-items:center;} .tw-hd{display:flex;align-items:center;justify-content:center;} .tw-cellbox{width:132px;height:110px;padding:4px;border:0;border-radius:10px;background:#F6EBD3;box-shadow:inset 0 0 0 3px ' + INK + ';cursor:pointer;display:flex;align-items:center;justify-content:center;} .tw-cellbox.is-missing{background:#FFF7E8;box-shadow:inset 0 0 0 3px ' + INK + ',inset 0 0 0 6px rgba(242,120,75,.35);} .tw-wrap.is-narrow .tw-cellbox{width:118px;height:92px;} .tw-wrap.is-cramp .tw-cellbox{width:104px;height:76px;} .tw-wrap.is-cramp{gap:5px;} .tw-wrap.is-cramp .tw-work{gap:6px;} .tw-wrap.is-cramp .tw-drawer{min-height:48px;padding:3px 8px;}'
  + '.tw-drawer{display:flex;gap:10px;justify-content:center;padding:6px 10px;border-radius:12px;background:#E9D3A8;box-shadow:inset 0 0 0 3px ' + INK + ';min-height:60px;}'
  + '.tw-mat{position:relative;border-radius:14px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #E2D4B4;} .tw-ringsvg{position:absolute;inset:0;} .tw-hdsvg{display:block;} .tw-tag{position:absolute;top:6px;padding:3px 5px;border-radius:6px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.15);} .tw-zone{position:absolute;padding:2px;border:0;border-radius:12px;background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;}'
  + '.tw-note{margin:0;min-height:1.3em;max-width:600px;font-family:' + B + ';font-weight:700;font-size:17px;color:#146B5E;text-align:center;} .tw-note.is-hint{color:#A3401F;} .tw-note:empty{display:none;} .tw-wrap.is-narrow .tw-note{font-size:16px;} .tw-wrap.is-done .tw-ctrl{display:none;}'
  + '.tw-ctrl{display:flex;justify-content:center;} .tw-go{display:inline-flex;align-items:center;gap:8px;min-height:52px;padding:0 26px;border:0;border-radius:14px;background:#146B5E;color:#fff;font:800 20px ' + H + ';box-shadow:0 4px 0 #0E4C43;cursor:pointer;} .tw-go svg{width:22px;height:22px;} .tw-go:disabled{opacity:.45;cursor:default;} .tw-go:focus-visible{outline:3px solid #F2784B;outline-offset:3px;}'
  + '@media (prefers-reduced-motion:reduce){.tw-wrap *{animation:none !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'tw-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.TrundleWheelActivity = TrundleWheelActivity;
