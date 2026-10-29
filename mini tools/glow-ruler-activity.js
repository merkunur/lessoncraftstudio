/* =====================================================================
   glow-ruler-activity.js — ACTIVITY #152 of the one-by-one rebuild:
   "Read the Ruler" → THE GLOW RULER (2.MD.A.1; G2-235; all 11 locales).
   Model: glow-ruler-core.js (GlowRulerCore).
   Design: docs/activities-rebuild/designs/152-choice-board.md
   ---------------------------------------------------------------------
   The invention: a library picture lies on a glass ruler, its ink
   registered from 0 to N. The child slides a glow marker to where the
   object ends and presses Check: light fills the centimeter SPACES one
   by one from 0, each lit space showing its count, and stops at the
   marker. The number you stopped on is how many spaces it counted.
   Too far: the spaces past the end glow coral under nothing. Too short:
   the end of the object stays unlit and dims. Miss 2: a dashed line
   drops from the end to the ruler (level 2: count on from the printed
   5 or 10 below it). A win: the object wiggles, a tag drops onto it and
   it joins today's shelf, a little chart of lengths in order.
   No timer, no score, no words on the apparatus: numerals and the light.
   Test seams: window.GlowRulerActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._render2 / ._move / ._check / ._shelf /
   .FAST / .OK_MS.
   ===================================================================== */
var GlowRulerActivity = {
  id: 'glow-ruler',
  /* the drawn apparatus (the hierarchy gate): the ruler, its light and the shelf chart */
  apparatusClasses: ['gr-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Read the Ruler","de":"Das Lineal ablesen","fr":"Lire la règle","es":"Lee la regla","pt":"Ler a régua","it":"Leggi il righello","nl":"Lees de liniaal","sv":"Läs linjalen","da":"Læs linealen","no":"Les linjalen","fi":"Lue viivainta"},
    instruction: {"en":"Slide the glow marker to where the object ends, then press Check: the light counts the centimeter spaces from 0.","de":"Schieb den Leuchtzeiger dorthin, wo der Gegenstand endet, und tipp auf Prüfen: Das Licht zählt die Zentimeterabstände ab 0.","fr":"Fais glisser le curseur lumineux là où l’objet se termine, puis touche Vérifier : la lumière compte les intervalles d’un centimètre à partir de 0.","es":"Desliza el marcador luminoso hasta donde termina el objeto y toca Revisar: la luz cuenta los espacios de un centímetro desde el 0.","pt":"Deslize o marcador luminoso até onde o objeto termina e toque em Conferir: a luz conta os espaços de um centímetro a partir do 0.","it":"Fai scorrere il cursore luminoso fin dove finisce l’oggetto, poi tocca Controlla: la luce conta gli spazi di un centimetro a partire da 0.","nl":"Schuif de lichtwijzer naar de plek waar het voorwerp eindigt en tik op Controleer: het licht telt de stukjes van een centimeter vanaf 0.","sv":"Dra ljusmarkören dit där saken slutar och tryck på Kontrollera: ljuset räknar centimetermellanrummen från 0.","da":"Skub lysmarkøren derhen, hvor tingen slutter, og tryk på Tjek: Lyset tæller mellemrummene på en centimeter fra 0.","no":"Skyv lysmarkøren dit tingen slutter, og trykk på Sjekk: Lyset teller mellomrommene på en centimeter fra 0.","fi":"Liu’uta valomerkki kohtaan, jossa esine loppuu, ja paina Tarkista: valo laskee senttimetrin välit nollasta alkaen."},
    setNumbers: {"en":"Ruler numbers","de":"Zahlen am Lineal","fr":"Nombres sur la règle","es":"Números de la regla","pt":"Números da régua","it":"Numeri sul righello","nl":"Getallen op de liniaal","sv":"Tal på linjalen","da":"Tal på linealen","no":"Tall på linjalen","fi":"Viivaimen luvut"},
    nEvery: {"en":"every centimeter","de":"jeder Zentimeter","fr":"chaque centimètre","es":"cada centímetro","pt":"cada centímetro","it":"ogni centimetro","nl":"elke centimeter","sv":"varje centimeter","da":"hver centimeter","no":"hver centimeter","fi":"joka senttimetri"},
    nFives: {"en":"only 0, 5, 10, 15","de":"nur 0, 5, 10, 15","fr":"seulement 0, 5, 10, 15","es":"solo 0, 5, 10, 15","pt":"só 0, 5, 10, 15","it":"solo 0, 5, 10, 15","nl":"alleen 0, 5, 10, 15","sv":"bara 0, 5, 10, 15","da":"kun 0, 5, 10, 15","no":"bare 0, 5, 10, 15","fi":"vain 0, 5, 10, 15"},
    setCount: {"en":"Light count","de":"Zahlen im Licht","fr":"Comptage de la lumière","es":"Conteo de la luz","pt":"Contagem da luz","it":"Conteggio della luce","nl":"Tellen in het licht","sv":"Ljusets räkning","da":"Lysets tælling","no":"Lysets telling","fi":"Valon laskenta"},
    cEach: {"en":"a count in every space","de":"in jedem Abstand","fr":"dans chaque intervalle","es":"en cada espacio","pt":"em cada espaço","it":"in ogni spazio","nl":"in elk stukje","sv":"i varje mellanrum","da":"i hvert mellemrum","no":"i hvert mellomrom","fi":"joka välissä"},
    cEnd: {"en":"only at the end","de":"nur am Ende","fr":"seulement à la fin","es":"solo al final","pt":"só no fim","it":"solo alla fine","nl":"alleen aan het eind","sv":"bara i slutet","da":"kun til sidst","no":"bare til slutt","fi":"vain lopussa"},
    taskLine: {"en":"Where does it end? Slide the glow marker there.","de":"Wo ist das Ende? Schieb den Leuchtzeiger dorthin.","fr":"Où est le bout ? Fais glisser le curseur lumineux jusque-là.","es":"¿Dónde termina? Desliza ahí el marcador luminoso.","pt":"Onde é o fim? Deslize o marcador luminoso até lá.","it":"Dove finisce? Fai scorrere lì il cursore luminoso.","nl":"Waar houdt het op? Schuif de lichtwijzer daarheen.","sv":"Var är slutet? Dra ljusmarkören dit.","da":"Hvor er enden? Skub lysmarkøren derhen.","no":"Hvor er enden? Skyv lysmarkøren dit.","fi":"Missä se loppuu? Liu’uta valomerkki sinne."},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Revisar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    hintStart: {"en":"Slide the glow marker to the end of the {o}.","de":"Schieb den Leuchtzeiger an das Ende {o}.","fr":"Fais glisser le curseur lumineux jusqu’au bout {o}.","es":"Desliza el marcador luminoso hasta el final {o}.","pt":"Deslize o marcador luminoso até o fim {o}.","it":"Fai scorrere il cursore luminoso fino alla fine {o}.","nl":"Schuif de lichtwijzer naar het einde van {o}.","sv":"Dra ljusmarkören till slutet av {o}.","da":"Skub lysmarkøren hen til enden af {o}.","no":"Skyv lysmarkøren til enden av {o}.","fi":"Liu’uta valomerkki kohtaan, jossa {o} loppuu."},
    hintOver: {"en":"The light ran past the end. Count the spaces, not the lines.","de":"Das Licht ist über das Ende hinausgelaufen. Zähl die Abstände, nicht die Striche.","fr":"La lumière a dépassé le bout. Compte les intervalles, pas les traits.","es":"La luz pasó del final. Cuenta los espacios, no las rayitas.","pt":"A luz passou do fim. Conte os espaços, não os tracinhos.","it":"La luce è andata oltre la fine. Conta gli spazi, non le tacche.","nl":"Het licht is voorbij het einde gegaan. Tel de stukjes, niet de streepjes.","sv":"Ljuset gick förbi slutet. Räkna mellanrummen, inte strecken.","da":"Lyset løb forbi enden. Tæl mellemrummene, ikke stregerne.","no":"Lyset gikk forbi enden. Tell mellomrommene, ikke strekene.","fi":"Valo meni loppukohdan ohi. Laske välit, älä viivoja."},
    hintUnder: {"en":"Part of the {o} is not lit yet.","de":"Ein Teil {o} leuchtet noch nicht.","fr":"Une partie {o} n’est pas encore éclairée.","es":"Una parte {o} todavía no está iluminada.","pt":"Uma parte {o} ainda não está iluminada.","it":"Una parte {o} non è ancora illuminata.","nl":"Een deel van {o} is nog niet verlicht.","sv":"En del av {o} är inte upplyst än.","da":"En del af {o} er ikke oplyst endnu.","no":"En del av {o} er ikke opplyst ennå.","fi":"Valo ei vielä ulotu kohtaan, jossa {o} loppuu."},
    hintDrop1: {"en":"Follow the dashed line down from the end and read the number there.","de":"Folge der gestrichelten Linie vom Ende nach unten und lies die Zahl dort ab.","fr":"Suis la ligne pointillée qui descend du bout et lis le nombre à cet endroit.","es":"Sigue la línea punteada que baja desde el final y lee el número que está ahí.","pt":"Siga a linha tracejada que desce do fim e leia o número que está ali.","it":"Segui la linea tratteggiata che scende dalla fine e leggi il numero lì sotto.","nl":"Volg de stippellijn vanaf het einde naar beneden en lees daar het getal af.","sv":"Följ den streckade linjen ner från slutet och läs av talet där.","da":"Følg den stiplede linje ned fra enden, og aflæs tallet der.","no":"Følg den stiplede linjen ned fra enden, og les av tallet der.","fi":"Seuraa katkoviivaa lopusta alas ja lue luku siitä."},
    hintDrop5: {"en":"Follow the dashed line down from the end. Count on from {m}.","de":"Folge der gestrichelten Linie vom Ende nach unten. Zähl von {m} aus weiter.","fr":"Suis la ligne pointillée qui descend du bout. Compte à partir de {m}.","es":"Sigue la línea punteada que baja desde el final. Cuenta a partir del {m}.","pt":"Siga a linha tracejada que desce do fim. Conte a partir do {m}.","it":"Segui la linea tratteggiata che scende dalla fine. Conta andando avanti da {m}.","nl":"Volg de stippellijn vanaf het einde naar beneden. Tel verder vanaf {m}.","sv":"Följ den streckade linjen ner från slutet. Räkna vidare från {m}.","da":"Følg den stiplede linje ned fra enden. Tæl videre fra {m}.","no":"Følg den stiplede linjen ned fra enden. Tell videre fra {m}.","fi":"Seuraa katkoviivaa lopusta alas. Laske eteenpäin luvusta {m}."},
    unit: {"en":"cm","de":"cm","fr":"cm","es":"cm","pt":"cm","it":"cm","nl":"cm","sv":"cm","da":"cm","no":"cm","fi":"cm"},
    aRuler: {"en":"Centimeter ruler from 0 to 15. Tap it to move the glow marker.","de":"Zentimeterlineal von 0 bis 15. Tipp darauf, um den Leuchtzeiger zu bewegen.","fr":"Règle graduée en centimètres de 0 à 15. Touche-la pour déplacer le curseur lumineux.","es":"Regla en centímetros del 0 al 15. Tócala para mover el marcador luminoso.","pt":"Régua em centímetros de 0 a 15. Toque nela para mover o marcador luminoso.","it":"Righello in centimetri da 0 a 15. Toccalo per spostare il cursore luminoso.","nl":"Centimeterliniaal van 0 tot 15. Tik erop om de lichtwijzer te verplaatsen.","sv":"Centimeterlinjal från 0 till 15. Tryck på den för att flytta ljusmarkören.","da":"Centimeterlineal fra 0 til 15. Tryk på den for at flytte lysmarkøren.","no":"Centimeterlinjal fra 0 til 15. Trykk på den for å flytte lysmarkøren.","fi":"Senttimetriviivain 0–15. Napauta sitä, niin valomerkki siirtyy."},
    aMarker: {"en":"Glow marker at {n} centimeters","de":"Leuchtzeiger bei {n} Zentimetern","fr":"Curseur lumineux à {n} centimètres","es":"Marcador luminoso en {n} centímetros","pt":"Marcador luminoso em {n} centímetros","it":"Cursore luminoso a {n} centimetri","nl":"Lichtwijzer bij {n} centimeter","sv":"Ljusmarkören vid {n} centimeter","da":"Lysmarkøren ved {n} centimeter","no":"Lysmarkøren ved {n} centimeter","fi":"Valomerkki kohdassa {n} senttimetriä"},
    aBack: {"en":"One centimeter back","de":"Einen Zentimeter zurück","fr":"Un centimètre en arrière","es":"Un centímetro atrás","pt":"Um centímetro para trás","it":"Un centimetro indietro","nl":"Eén centimeter terug","sv":"En centimeter tillbaka","da":"En centimeter tilbage","no":"En centimeter tilbake","fi":"Senttimetri taaksepäin"},
    aOn: {"en":"One centimeter on","de":"Einen Zentimeter weiter","fr":"Un centimètre en avant","es":"Un centímetro adelante","pt":"Um centímetro para a frente","it":"Un centimetro avanti","nl":"Eén centimeter verder","sv":"En centimeter framåt","da":"En centimeter frem","no":"En centimeter fram","fi":"Senttimetri eteenpäin"},
    aLit: {"en":"The light counted {n} spaces.","de":"Das Licht hat {n} Abstände gezählt.","fr":"La lumière a compté {n} intervalles.","es":"La luz contó {n} espacios.","pt":"A luz contou {n} espaços.","it":"La luce ha contato {n} spazi.","nl":"Het licht heeft {n} stukjes geteld.","sv":"Ljuset räknade {n} mellanrum.","da":"Lyset talte {n} mellemrum.","no":"Lyset telte {n} mellomrom.","fi":"Valo laski {n} väliä."},
    oA_snail: {"en":"snail","de":"der Schnecke","fr":"de l’escargot","es":"del caracol","pt":"do caracol","it":"della chiocciola","nl":"de slak","sv":"snigeln","da":"sneglen","no":"sneglen","fi":"etana"},
    oA_seashell: {"en":"seashell","de":"der Muschel","fr":"du coquillage","es":"de la concha","pt":"da concha","it":"della conchiglia","nl":"de schelp","sv":"snäckan","da":"muslingeskallen","no":"skjellet","fi":"simpukankuori"},
    oA_car: {"en":"toy car","de":"des Spielzeugautos","fr":"de la petite voiture","es":"del carrito de juguete","pt":"do carrinho","it":"della macchinina","nl":"het speelgoedautootje","sv":"leksaksbilen","da":"legetøjsbilen","no":"lekebilen","fi":"leikkiauto"},
    oA_lemon: {"en":"lemon","de":"der Zitrone","fr":"du citron","es":"del limón","pt":"do limão","it":"del limone","nl":"de citroen","sv":"citronen","da":"citronen","no":"sitronen","fi":"sitruuna"},
    oA_key: {"en":"key","de":"des Schlüssels","fr":"de la clé","es":"de la llave","pt":"da chave","it":"della chiave","nl":"de sleutel","sv":"nyckeln","da":"nøglen","no":"nøkkelen","fi":"avain"},
    oA_centipede: {"en":"centipede","de":"des Tausendfüßlers","fr":"du mille-pattes","es":"del ciempiés","pt":"da centopeia","it":"del centopiedi","nl":"de duizendpoot","sv":"tusenfotingen","da":"tusindbenet","no":"tusenbeinet","fi":"tuhatjalkainen"},
    oA_glue: {"en":"glue bottle","de":"der Kleberflasche","fr":"du flacon de colle","es":"de la botella de pegamento","pt":"do tubo de cola","it":"del flacone di colla","nl":"de lijmfles","sv":"limflaskan","da":"limflasken","no":"limflasken","fi":"liimapullo"},
    oA_popsicle: {"en":"ice pop","de":"des Eises am Stiel","fr":"de la glace à l’eau","es":"de la paleta helada","pt":"do picolé","it":"del ghiacciolo","nl":"de ijslolly","sv":"isglassen","da":"ispinden","no":"ispinnen","fi":"mehujää"},
    oA_kiwi: {"en":"kiwi","de":"der Kiwi","fr":"du kiwi","es":"del kiwi","pt":"do kiwi","it":"del kiwi","nl":"de kiwi","sv":"kiwin","da":"kiwien","no":"kiwien","fi":"kiivi"},
    oA_train: {"en":"toy train","de":"der Spielzeuglok","fr":"du petit train","es":"del trencito de juguete","pt":"do trenzinho","it":"del trenino","nl":"het speelgoedtreintje","sv":"leksakståget","da":"legetøjstoget","no":"leketoget","fi":"leikkijuna"},
    ok_snail: {"en":"The snail starts at 0 and ends at {n}: it is {n} cm long.","de":"Die Schnecke beginnt bei 0 und endet bei {n}: Sie ist {n} cm lang.","fr":"L’escargot commence à 0 et finit à {n} : il mesure {n} cm.","es":"El caracol empieza en 0 y termina en {n}: mide {n} cm.","pt":"O caracol começa no 0 e termina no {n}: mede {n} cm.","it":"La chiocciola parte da 0 e arriva a {n}: è lunga {n} cm.","nl":"De slak begint bij 0 en eindigt bij {n}: hij is {n} cm lang.","sv":"Snigeln börjar vid 0 och slutar vid {n}: den är {n} cm lång.","da":"Sneglen begynder ved 0 og slutter ved {n}: Den er {n} cm lang.","no":"Sneglen begynner ved 0 og slutter ved {n}: Den er {n} cm lang.","fi":"Etana alkaa kohdasta 0 ja päättyy kohtaan {n}: se on {n} cm pitkä."},
    ok_seashell: {"en":"The seashell starts at 0 and ends at {n}: it is {n} cm long.","de":"Die Muschel beginnt bei 0 und endet bei {n}: Sie ist {n} cm lang.","fr":"Le coquillage commence à 0 et finit à {n} : il mesure {n} cm.","es":"La concha empieza en 0 y termina en {n}: mide {n} cm.","pt":"A concha começa no 0 e termina no {n}: mede {n} cm.","it":"La conchiglia parte da 0 e arriva a {n}: è lunga {n} cm.","nl":"De schelp begint bij 0 en eindigt bij {n}: hij is {n} cm lang.","sv":"Snäckan börjar vid 0 och slutar vid {n}: den är {n} cm lång.","da":"Muslingeskallen begynder ved 0 og slutter ved {n}: Den er {n} cm lang.","no":"Skjellet begynner ved 0 og slutter ved {n}: Det er {n} cm langt.","fi":"Simpukankuori alkaa kohdasta 0 ja päättyy kohtaan {n}: se on {n} cm pitkä."},
    ok_car: {"en":"The toy car starts at 0 and ends at {n}: it is {n} cm long.","de":"Das Spielzeugauto beginnt bei 0 und endet bei {n}: Es ist {n} cm lang.","fr":"La petite voiture commence à 0 et finit à {n} : elle mesure {n} cm.","es":"El carrito de juguete empieza en 0 y termina en {n}: mide {n} cm.","pt":"O carrinho começa no 0 e termina no {n}: mede {n} cm.","it":"La macchinina parte da 0 e arriva a {n}: è lunga {n} cm.","nl":"Het speelgoedautootje begint bij 0 en eindigt bij {n}: het is {n} cm lang.","sv":"Leksaksbilen börjar vid 0 och slutar vid {n}: den är {n} cm lång.","da":"Legetøjsbilen begynder ved 0 og slutter ved {n}: Den er {n} cm lang.","no":"Lekebilen begynner ved 0 og slutter ved {n}: Den er {n} cm lang.","fi":"Leikkiauto alkaa kohdasta 0 ja päättyy kohtaan {n}: se on {n} cm pitkä."},
    ok_lemon: {"en":"The lemon starts at 0 and ends at {n}: it is {n} cm long.","de":"Die Zitrone beginnt bei 0 und endet bei {n}: Sie ist {n} cm lang.","fr":"Le citron commence à 0 et finit à {n} : il mesure {n} cm.","es":"El limón empieza en 0 y termina en {n}: mide {n} cm.","pt":"O limão começa no 0 e termina no {n}: mede {n} cm.","it":"Il limone parte da 0 e arriva a {n}: è lungo {n} cm.","nl":"De citroen begint bij 0 en eindigt bij {n}: hij is {n} cm lang.","sv":"Citronen börjar vid 0 och slutar vid {n}: den är {n} cm lång.","da":"Citronen begynder ved 0 og slutter ved {n}: Den er {n} cm lang.","no":"Sitronen begynner ved 0 og slutter ved {n}: Den er {n} cm lang.","fi":"Sitruuna alkaa kohdasta 0 ja päättyy kohtaan {n}: se on {n} cm pitkä."},
    ok_key: {"en":"The key starts at 0 and ends at {n}: it is {n} cm long.","de":"Der Schlüssel beginnt bei 0 und endet bei {n}: Er ist {n} cm lang.","fr":"La clé commence à 0 et finit à {n} : elle mesure {n} cm.","es":"La llave empieza en 0 y termina en {n}: mide {n} cm.","pt":"A chave começa no 0 e termina no {n}: mede {n} cm.","it":"La chiave parte da 0 e arriva a {n}: è lunga {n} cm.","nl":"De sleutel begint bij 0 en eindigt bij {n}: hij is {n} cm lang.","sv":"Nyckeln börjar vid 0 och slutar vid {n}: den är {n} cm lång.","da":"Nøglen begynder ved 0 og slutter ved {n}: Den er {n} cm lang.","no":"Nøkkelen begynner ved 0 og slutter ved {n}: Den er {n} cm lang.","fi":"Avain alkaa kohdasta 0 ja päättyy kohtaan {n}: se on {n} cm pitkä."},
    ok_centipede: {"en":"The centipede starts at 0 and ends at {n}: it is {n} cm long.","de":"Der Tausendfüßler beginnt bei 0 und endet bei {n}: Er ist {n} cm lang.","fr":"Le mille-pattes commence à 0 et finit à {n} : il mesure {n} cm.","es":"El ciempiés empieza en 0 y termina en {n}: mide {n} cm.","pt":"A centopeia começa no 0 e termina no {n}: mede {n} cm.","it":"Il centopiedi parte da 0 e arriva a {n}: è lungo {n} cm.","nl":"De duizendpoot begint bij 0 en eindigt bij {n}: hij is {n} cm lang.","sv":"Tusenfotingen börjar vid 0 och slutar vid {n}: den är {n} cm lång.","da":"Tusindbenet begynder ved 0 og slutter ved {n}: Det er {n} cm langt.","no":"Tusenbeinet begynner ved 0 og slutter ved {n}: Det er {n} cm langt.","fi":"Tuhatjalkainen alkaa kohdasta 0 ja päättyy kohtaan {n}: se on {n} cm pitkä."},
    ok_glue: {"en":"The glue bottle starts at 0 and ends at {n}: it is {n} cm long.","de":"Die Kleberflasche beginnt bei 0 und endet bei {n}: Sie ist {n} cm lang.","fr":"Le flacon de colle commence à 0 et finit à {n} : il mesure {n} cm.","es":"La botella de pegamento empieza en 0 y termina en {n}: mide {n} cm.","pt":"O tubo de cola começa no 0 e termina no {n}: mede {n} cm.","it":"Il flacone di colla parte da 0 e arriva a {n}: è lungo {n} cm.","nl":"De lijmfles begint bij 0 en eindigt bij {n}: hij is {n} cm lang.","sv":"Limflaskan börjar vid 0 och slutar vid {n}: den är {n} cm lång.","da":"Limflasken begynder ved 0 og slutter ved {n}: Den er {n} cm lang.","no":"Limflasken begynner ved 0 og slutter ved {n}: Den er {n} cm lang.","fi":"Liimapullo alkaa kohdasta 0 ja päättyy kohtaan {n}: se on {n} cm pitkä."},
    ok_popsicle: {"en":"The ice pop starts at 0 and ends at {n}: it is {n} cm long.","de":"Das Eis am Stiel beginnt bei 0 und endet bei {n}: Es ist {n} cm lang.","fr":"La glace à l’eau commence à 0 et finit à {n} : elle mesure {n} cm.","es":"La paleta helada empieza en 0 y termina en {n}: mide {n} cm.","pt":"O picolé começa no 0 e termina no {n}: mede {n} cm.","it":"Il ghiacciolo parte da 0 e arriva a {n}: è lungo {n} cm.","nl":"De ijslolly begint bij 0 en eindigt bij {n}: hij is {n} cm lang.","sv":"Isglassen börjar vid 0 och slutar vid {n}: den är {n} cm lång.","da":"Ispinden begynder ved 0 og slutter ved {n}: Den er {n} cm lang.","no":"Ispinnen begynner ved 0 og slutter ved {n}: Den er {n} cm lang.","fi":"Mehujää alkaa kohdasta 0 ja päättyy kohtaan {n}: se on {n} cm pitkä."},
    ok_kiwi: {"en":"The kiwi starts at 0 and ends at {n}: it is {n} cm long.","de":"Die Kiwi beginnt bei 0 und endet bei {n}: Sie ist {n} cm lang.","fr":"Le kiwi commence à 0 et finit à {n} : il mesure {n} cm.","es":"El kiwi empieza en 0 y termina en {n}: mide {n} cm.","pt":"O kiwi começa no 0 e termina no {n}: mede {n} cm.","it":"Il kiwi parte da 0 e arriva a {n}: è lungo {n} cm.","nl":"De kiwi begint bij 0 en eindigt bij {n}: hij is {n} cm lang.","sv":"Kiwin börjar vid 0 och slutar vid {n}: den är {n} cm lång.","da":"Kiwien begynder ved 0 og slutter ved {n}: Den er {n} cm lang.","no":"Kiwien begynner ved 0 og slutter ved {n}: Den er {n} cm lang.","fi":"Kiivi alkaa kohdasta 0 ja päättyy kohtaan {n}: se on {n} cm pitkä."},
    ok_train: {"en":"The toy train starts at 0 and ends at {n}: it is {n} cm long.","de":"Die Spielzeuglok beginnt bei 0 und endet bei {n}: Sie ist {n} cm lang.","fr":"Le petit train commence à 0 et finit à {n} : il mesure {n} cm.","es":"El trencito de juguete empieza en 0 y termina en {n}: mide {n} cm.","pt":"O trenzinho começa no 0 e termina no {n}: mede {n} cm.","it":"Il trenino parte da 0 e arriva a {n}: è lungo {n} cm.","nl":"Het speelgoedtreintje begint bij 0 en eindigt bij {n}: het is {n} cm lang.","sv":"Leksakståget börjar vid 0 och slutar vid {n}: det är {n} cm långt.","da":"Legetøjstoget begynder ved 0 og slutter ved {n}: Det er {n} cm langt.","no":"Leketoget begynner ved 0 og slutter ved {n}: Det er {n} cm langt.","fi":"Leikkijuna alkaa kohdasta 0 ja päättyy kohtaan {n}: se on {n} cm pitkä."},
    oA_airplane: {"en":"toy airplane","de":"des Spielzeugflugzeugs","fr":"du petit avion","es":"del avioncito de juguete","pt":"do aviãozinho","it":"dell’aeroplanino","nl":"het speelgoedvliegtuigje","sv":"leksaksflygplanet","da":"legetøjsflyveren","no":"lekeflyet","fi":"leikkilentokone"},
    ok_airplane: {"en":"The toy airplane starts at 0 and ends at {n}: it is {n} cm long.","de":"Das Spielzeugflugzeug beginnt bei 0 und endet bei {n}: Es ist {n} cm lang.","fr":"Le petit avion commence à 0 et finit à {n} : il mesure {n} cm.","es":"El avioncito de juguete empieza en 0 y termina en {n}: mide {n} cm.","pt":"O aviãozinho começa no 0 e termina no {n}: mede {n} cm.","it":"L’aeroplanino parte da 0 e arriva a {n}: è lungo {n} cm.","nl":"Het speelgoedvliegtuigje begint bij 0 en eindigt bij {n}: het is {n} cm lang.","sv":"Leksaksflygplanet börjar vid 0 och slutar vid {n}: det är {n} cm långt.","da":"Legetøjsflyveren begynder ved 0 og slutter ved {n}: Den er {n} cm lang.","no":"Lekeflyet begynner ved 0 og slutter ved {n}: Det er {n} cm langt.","fi":"Leikkilentokone alkaa kohdasta 0 ja päättyy kohtaan {n}: se on {n} cm pitkä."},
    hintDrop0: {"en":"Follow the dashed line down from the end. Count the spaces from 0.","de":"Folge der gestrichelten Linie vom Ende nach unten. Zähl die Abstände ab 0.","fr":"Suis la ligne pointillée qui descend du bout. Compte les intervalles à partir de 0.","es":"Sigue la línea punteada que baja desde el final. Cuenta los espacios desde el 0.","pt":"Siga a linha tracejada que desce do fim. Conte os espaços a partir do 0.","it":"Segui la linea tratteggiata che scende dalla fine. Conta gli spazi a partire da 0.","nl":"Volg de stippellijn vanaf het einde naar beneden. Tel de stukjes vanaf 0.","sv":"Följ den streckade linjen ner från slutet. Räkna mellanrummen från 0.","da":"Følg den stiplede linje ned fra enden. Tæl mellemrummene fra 0.","no":"Følg den stiplede linjen ned fra enden. Tell mellomrommene fra 0.","fi":"Seuraa katkoviivaa lopusta alas. Laske välit nollasta alkaen."}
  },/*STRINGS-END*/
  defaults: { numbers: 'every', count: 'each' },
  settings: [
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: 'every', labelKey: 'nEvery' }, { value: 'fives', labelKey: 'nFives' }] },
    { key: 'count', type: 'choice', labelKey: 'setCount', options: [{ value: 'each', labelKey: 'cEach' }, { value: 'end', labelKey: 'cEnd' }] }
  ],
  OK_MS: 500, FAST: false, SPACE_MS: 80,
  THEMES: ['spring', 'beach', 'toys', 'fruits', 'around the house', 'insects and bugs', 'classroom', 'desserts and sweets'],
  TIK: [523, 587, 659, 784, 880],

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._drag = null; this._shelf = []; this._themes = {}; this._picsReady = false;
    injectGlowRulerCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') {
      Promise.all(this.THEMES.map(function (d) { return LCSPictures.load(d).then(function (t) { self._themes[d] = t; }); }))
        .then(function () { self._picsReady = true; if (self._wrap) self._paint(); })
        .catch(function (e) { if (typeof console !== 'undefined') console.error(e); });
    }
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } this._endDrag(); },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _level: function () { return GlowRulerCore.levelOf(this._setting('numbers')); },
  _perSpace: function () { return this._setting('count') !== 'end'; },
  _key: function () { return this._level(); },
  _loc: function () { return String((this.api && this.api.lang) || 'en').slice(0, 2); },
  /* the object's name as the hints need it (each locale authors its own case and article) */
  _obj: function () { return this._t('oA_' + this.st.round.obj); },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = GlowRulerCore.rounds(k); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = GlowRulerCore, pool = this._ensurePool(), lv = this._level(), n = C.passSize(lv), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { var P = C.plan(lv, pass, Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'glow-ruler.' + lv + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { if (this.st && this.st.done) return; var line = this._t('taskLine'); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers(); this._endDrag();
    this.st = GlowRulerCore.newState(this._level(), k);
    this._view = { note: '', soft: false, run: false, win: false };
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
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'gr-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="gr-bench"></div><div class="gr-ctl"></div><p class="gr-note" data-qa="note" aria-live="polite"></p><div class="gr-bar"></div><div class="gr-shelf"></div>';
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
  _geo: function () {
    var W = this._width(), g = GlowRulerCore.geo(W), st = this.st, r = st.round;
    g.RH = g.wide ? 64 : 52; g.MH = g.wide ? 56 : 52;
    var p = GlowRulerCore.place(r.obj, r.len, g.ppc, g.x0, 0);
    g.top = Math.ceil(p.inkH) + (g.wide ? 16 : 12);
    g.pl = GlowRulerCore.place(r.obj, r.len, g.ppc, g.x0, g.top);
    g.W = W; g.x = function (i) { return g.x0 + i * g.ppc; };
    return g;
  },
  _paint_: function () {
    var st = this.st, v = this._view, g = this._geo();
    this._g = g;
    this._wrap.className = 'gr-wrap' + (g.wide ? ' is-wide' : ' is-narrow') + (g.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (st.help ? ' is-help' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + st.level;
    this._paintBench(g);
    this._paintCtl(g);
    this._paintBar();
    this._paintShelf(g);
    var note = this._qs('.gr-note');
    if (v.note) { note.textContent = v.note; note.className = 'gr-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'gr-note'; }
    this._setPrompt();
  },

  /* ---------- the bench: the object lying on the glass ruler, the light, the marker ---------- */
  _paintBench: function (g) {
    var st = this.st, r = st.round, v = this._view, self = this, C = GlowRulerCore;
    var bench = this._qs('.gr-bench'); bench.innerHTML = '';
    var H = g.top + g.RH + g.MH;
    bench.style.width = g.W + 'px'; bench.style.height = H + 'px';
    /* the object: an <img> cropped to its ink rows (object-fit: cover keeps the full scale), turned when it stands upright */
    var pl = g.pl, th = this._themes[r.theme];
    if (th && typeof LCSPictures !== 'undefined') {
      var im = LCSPictures.img(th, r.obj, this._loc(), {}), f = C.inkFlat(r.obj), b = C.PICS[r.obj].ink;
      im.className = 'gr-pic' + (v.win ? ' is-win' : '') + (r.rot ? ' is-rot' : '');
      im.setAttribute('data-obj', r.obj);
      if (!r.rot) {
        var eh = f.h * pl.S;
        im.style.cssText = 'left:' + pl.left.toFixed(2) + 'px;top:' + pl.inkTop.toFixed(2) + 'px;width:' + pl.S.toFixed(2) + 'px;height:' + eh.toFixed(2) + 'px;object-position:0 ' + (100 * f.y / (1 - f.h)).toFixed(3) + '%;';
      } else {
        /* unturned: the full height S, the ink columns only; turned 90° clockwise about its centre it lies flat */
        var ew = b[0] * pl.S, cx = pl.left + pl.S / 2, cy = pl.inkTop + pl.inkH / 2;
        im.style.cssText = 'left:' + (cx - ew / 2).toFixed(2) + 'px;top:' + (cy - pl.S / 2).toFixed(2) + 'px;width:' + ew.toFixed(2) + 'px;height:' + pl.S.toFixed(2) + 'px;object-position:' + (100 * b[1] / (1 - b[0])).toFixed(3) + '% 0;';
      }
      bench.appendChild(im);
    }
    var lit = st.lit, over = st.verdict && st.verdict.kind === 'over', under = st.verdict && st.verdict.kind === 'under';
    /* too short: the unlit end of the object dims, its edge pulses */
    if (under) {
      var dm = document.createElement('div'); dm.className = 'gr-dim';
      dm.style.cssText = 'left:' + (g.x(lit) + 1).toFixed(1) + 'px;top:' + (pl.inkTop - 4).toFixed(1) + 'px;width:' + ((r.len - lit) * g.ppc + 4).toFixed(1) + 'px;height:' + (pl.inkH + 4).toFixed(1) + 'px;animation-delay:' + this._runMs(lit) + 'ms';
      bench.appendChild(dm);
    }
    /* miss 2: the drop line falls from the object's right ink edge to the ruler */
    if (st.help && !st.done) {
      var dl = document.createElement('div'); dl.className = 'gr-drop';
      dl.style.cssText = 'left:' + (g.x(r.len) - 1.5).toFixed(1) + 'px;top:' + (pl.inkTop + pl.inkH * 0.35).toFixed(1) + 'px;height:' + (g.top - pl.inkTop - pl.inkH * 0.35 + g.RH * 0.62).toFixed(1) + 'px';
      bench.appendChild(dl);
    }
    /* the tag drops onto the object after the win */
    if (st.done && v.win) {
      var tg = document.createElement('div'); tg.className = 'gr-tag'; tg.textContent = r.len + ' ' + this._t('unit');
      tg.style.left = ((pl.inkLeft + pl.inkRight) / 2).toFixed(1) + 'px'; tg.style.top = (pl.inkTop + pl.inkH / 2).toFixed(1) + 'px';
      bench.appendChild(tg);
    }
    bench.insertAdjacentHTML('beforeend', this._rulerSvg(g, over));
    /* the band under the ruler: tap anywhere on it (or on the ruler) to move the marker there */
    var band = document.createElement('div'); band.className = 'gr-band'; band.setAttribute('data-k', 'ruler');
    band.setAttribute('role', 'presentation');
    band.style.cssText = 'top:' + g.top + 'px;height:' + (g.RH + g.MH) + 'px;';
    band.addEventListener('pointerdown', function (e) { self._dragStart(e); });
    bench.appendChild(band);
    var mk = this._btn('gr-marker' + (st.marker === 0 ? ' is-park' : ''), 'marker', this._t('aMarker', { n: st.marker }),
      '<svg class="gr-art" width="44" height="' + (g.MH - 4) + '" viewBox="0 0 44 ' + (g.MH - 4) + '" aria-hidden="true"><path class="gr-mtip" d="M22 1 L33 15 H11 Z"/><rect class="gr-mgrip" x="4" y="15" width="36" height="' + (g.MH - 20) + '" rx="12"/><path class="gr-mline" d="M15 ' + (15 + (g.MH - 20) / 2 - 5) + 'h14M15 ' + (15 + (g.MH - 20) / 2 + 1) + 'h14"/></svg>');
    mk.style.left = (g.x(st.marker) - 22).toFixed(1) + 'px'; mk.style.top = (g.top + g.RH) + 'px';
    mk.addEventListener('pointerdown', function (e) { self._dragStart(e); });
    bench.appendChild(mk);
  },
  _runMs: function (n) { return this.FAST || !this._view.run ? 0 : n * this.SPACE_MS; },
  _rulerSvg: function (g, over) {
    var st = this.st, r = st.round, C = GlowRulerCore, W = g.W, RH = g.RH, top = g.top, x = g.x, ppc = g.ppc, o = '';
    var prn = C.printed(st.level), m = C.nearestPrinted(r.len, st.level), help5 = st.help && !st.done && st.level === 'fives';
    var tight = ppc < 26, fit = function (n, w) { return tight && n >= 10 ? ' textLength="' + w.toFixed(1) + '" lengthAdjust="spacingAndGlyphs"' : ''; };
    var chH = Math.round(RH * 0.5), cnt = Math.max(14, Math.min(18, Math.floor(ppc * 0.78))), numF = g.wide ? 20 : (st.level === 'every' ? 14 : 16);
    var gp = g.wide ? 20 : 11;
    o += '<rect class="gr-glass" x="' + (x(0) - gp) + '" y="1.5" width="' + (C.CM * ppc + 2 * gp).toFixed(1) + '" height="' + (RH - 3) + '" rx="8"/>';
    /* the light: space i (between tick i − 1 and tick i) fills and shows its count i */
    var sp = C.spaces(st.lit), per = this._perSpace();
    sp.forEach(function (s) {
      var beyond = over && s.count > r.len, d = this._runMs(s.count - 1);
      o += '<rect class="gr-lit' + (beyond ? ' is-over' : '') + '" data-space="' + s.count + '" x="' + (x(s.from) + 0.5).toFixed(1) + '" y="3" width="' + (ppc - 1).toFixed(1) + '" height="' + chH + '" style="animation-delay:' + d + 'ms"/>';
      var show = !help5 && (per || s.count === st.lit);
      if (show) o += '<text class="gr-count' + (beyond ? ' is-over' : '') + '" data-count="' + s.count + '" x="' + ((x(s.from) + x(s.to)) / 2).toFixed(1) + '" y="' + (3 + chH / 2 + cnt * 0.36).toFixed(1) + '" font-size="' + cnt + '"' + fit(s.count, ppc - 4) + ' style="animation-delay:' + d + 'ms">' + s.count + '</text>';
    }, this);
    /* miss 2 at level 2: count ON from the printed number below the end, one numeral per space */
    if (help5) for (var c = m + 1; c <= r.len; c++) o += '<text class="gr-count is-on" data-on="' + c + '" x="' + ((x(c - 1) + x(c)) / 2).toFixed(1) + '" y="' + (3 + chH / 2 + cnt * 0.36).toFixed(1) + '" font-size="' + cnt + '"' + fit(c, ppc - 3) + '>' + c + '</text>';
    /* ticks: every centimeter, long at 0, 5, 10, 15 */
    for (var i = 0; i <= C.CM; i++) {
      var long = i % 5 === 0, tl = g.wide ? (long ? 28 : 18) : (long ? 22 : 14), pulse = st.help && !st.done && i === r.len;
      o += '<path class="gr-tick' + (pulse ? ' is-pulse' : '') + '" data-tick="' + i + '" d="M' + x(i).toFixed(1) + ' 2v' + tl + '"/>';
    }
    /* the marker's line up through the ticks; the number under the marker turns coral instead of being crossed */
    if (st.marker > 0) o += '<path class="gr-mark" d="M' + x(st.marker).toFixed(1) + ' 2V' + (RH - numF - (g.wide ? 12 : 9)) + '"/>';
    prn.forEach(function (n) {
      var glow = help5 && n === m;
      o += '<text class="gr-num' + (glow ? ' is-glow' : '') + (st.marker > 0 && n === st.marker ? ' is-at' : '') + (st.level === 'every' && !g.wide && n >= 10 ? ' is-two' : '') + '" data-num="' + n + '" x="' + x(n).toFixed(1) + '" y="' + (RH - (g.wide ? 9 : 7)) + '" font-size="' + numF + '"' + (st.level === 'every' ? fit(n, ppc - 3) : '') + '>' + n + '</text>';
    });
    return '<svg class="gr-art gr-ruler" style="top:' + top + 'px" width="' + W + '" height="' + RH + '" viewBox="0 0 ' + W + ' ' + RH + '" role="presentation" aria-hidden="true">' + o + '</svg>';
  },

  /* ---------- the control row: one centimeter back · the readout · one centimeter on ---------- */
  _paintCtl: function (g) {
    var st = this.st, self = this, el = this._qs('.gr-ctl'); el.innerHTML = '';
    if (st.done) { el.style.display = 'none'; return; }
    el.style.display = '';
    var back = this._btn('gr-nudge', 'nudge-back', this._t('aBack'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    back.disabled = st.marker === 0;
    back.addEventListener('click', function () { self._move(self.st.marker - 1); });
    var read = document.createElement('div'); read.className = 'gr-read'; read.setAttribute('data-qa', 'readout');
    read.innerHTML = '<span class="gr-readn">' + (st.marker > 0 ? st.marker : '–') + '</span><span class="gr-readu">' + this._t('unit') + '</span>';
    var on = this._btn('gr-nudge', 'nudge-on', this._t('aOn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    on.disabled = st.marker === GlowRulerCore.CM;
    on.addEventListener('click', function () { self._move(self.st.marker + 1); });
    el.appendChild(back); el.appendChild(read); el.appendChild(on);
    el.setAttribute('aria-label', this._t('aRuler'));
  },
  _paintBar: function () {
    var st = this.st, self = this, el = this._qs('.gr-bar'); el.innerHTML = '';
    if (st.done) { el.style.display = 'none'; return; }
    el.style.display = '';
    var c = this._btn('gr-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._t('checkBtn') + '</span>');
    c.addEventListener('click', function () { self._check(); });
    el.appendChild(c);
  },
  /* ---------- today's shelf: the measured things as a little chart of lengths, shortest first ---------- */
  _paintShelf: function (g) {
    var el = this._qs('.gr-shelf'), self = this; el.innerHTML = '';
    if (!this._shelf.length) { el.style.display = 'none'; return; }
    el.style.display = '';
    var items = this._shelf.slice().sort(function (a, b) { return a.len - b.len || (a.obj < b.obj ? -1 : 1); });
    var u = g.wide ? 5 : 2.6, thumb = g.wide ? 40 : 30, cur = this.st && this.st.done ? this.st.level + '.' + this.st.k : null;
    var chart = document.createElement('div'); chart.className = 'gr-chart gr-art';
    items.forEach(function (it) {
      var col = document.createElement('div'); col.className = 'gr-col' + (it.id === cur ? ' is-new' : '');
      col.innerHTML = '<span class="gr-coln">' + it.len + '</span><span class="gr-colbar" style="height:' + Math.round(it.len * u) + 'px"></span>';
      var th = self._themes[it.theme];
      if (th && typeof LCSPictures !== 'undefined') { var im = LCSPictures.img(th, it.obj, self._loc(), { size: thumb }); im.className = 'gr-thumb'; im.setAttribute('data-mark', ''); col.appendChild(im); }
      chart.appendChild(col);
    });
    el.appendChild(chart);
    var unit = document.createElement('span'); unit.className = 'gr-shelfu'; unit.textContent = this._t('unit'); el.appendChild(unit);
  },

  /* ---------------- the hand ---------------- */
  _move: function (n) {
    var st = this.st, was = st.marker;
    if (!GlowRulerCore.setMarker(st, n)) return false;
    if (!st.done) { this._view.note = ''; this._view.run = false; }
    else { this._view.run = false; }
    this.api.sound(900);
    this._paint();
    return was !== st.marker;
  },
  _keyboard: function (e) {
    if (!this.st) return;
    var k = e.key;
    if (k === 'ArrowLeft' || k === 'ArrowRight') { e.preventDefault(); this._move(this.st.marker + (k === 'ArrowRight' ? 1 : -1)); }
    else if (k === 'Home') { e.preventDefault(); this._move(0); }
    else if (k === 'Enter' && (e.target === this._wrap || (e.target && e.target.getAttribute && e.target.getAttribute('data-k') === 'marker'))) { e.preventDefault(); this._check(); }
  },
  _check: function () {
    var st = this.st, v = this._view, C = GlowRulerCore; if (st.done) return;
    var r = C.check(st);
    if (r.result === 'no') return;
    if (r.result === 'note') { v.note = this._t(r.key, { o: this._obj() }); v.soft = true; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    v.run = true;
    this._tiks(st.lit);
    if (r.result === 'ok') { this._success(); return; }
    var key = C.hint(st), args = { o: this._obj() };
    if (key === 'hintDrop5') args.m = C.nearestPrinted(st.round.len, st.level);
    v.soft = false; v.note = this._t(key, args);
    this._paint();
    var say = this._t('aLit', { n: st.lit }) + ' ' + v.note;
    this.api.announce(say);
    this.api.sound(240);
  },
  /* a rising pentatonic tik per space as the light fills */
  _tiks: function (n) {
    if (this.FAST) return;
    var self = this;
    for (var i = 0; i < n; i++) (function (i) { self._later(function () { self.api.sound(self.TIK[i % 5] * (i >= 5 ? 2 : 1) * (i >= 10 ? 1.5 : 1)); }, i * self.SPACE_MS); })(i);
  },
  _success: function () {
    var st = this.st, v = this._view, r = st.round, msg = this._t('ok_' + r.obj, { n: r.len }), id = st.level + '.' + st.k;
    v.note = ''; v.win = true;
    if (!this._shelf.some(function (x) { return x.id === id; })) this._shelf.push({ id: id, obj: r.obj, theme: r.theme, len: r.len });
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg);
    var self = this;
    this._later(function () { self.api.sound(988); }, this._runMs(st.lit));
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  },

  /* drag the marker, or press anywhere on the ruler band: the marker jumps there and follows the finger, snapping to ticks */
  _dragStart: function (e) {
    if (e.button != null && e.button !== 0) return;
    var self = this, svg = this._qs('.gr-ruler');
    if (!svg) return;
    e.preventDefault();
    /* read the LIVE ruler every time: a repaint replaces it, and a detached element measures (0, 0) */
    var at = function (cx) { var el = self._qs('.gr-ruler') || svg, b = el.getBoundingClientRect(), g = self._g; return GlowRulerCore.snap(cx - b.left, g.x0, g.ppc); };
    this._move(at(e.clientX));
    var mv = function (ev) { ev.preventDefault(); self._move(at(ev.clientX)); };
    var up = function () { self._endDrag(); };
    this._drag = { mv: mv, up: up };
    document.addEventListener('pointermove', mv, { passive: false }); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _endDrag: function () {
    var d = this._drag; if (!d) return;
    document.removeEventListener('pointermove', d.mv); document.removeEventListener('pointerup', d.up); document.removeEventListener('pointercancel', d.up);
    this._drag = null;
  }
};

function injectGlowRulerCSS() {
  if (typeof document === 'undefined' || document.getElementById('gr-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.gr-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .gr-wrap:focus{outline:none;}'
  + '.gr-bench{position:relative;}'
  + '.gr-pic{position:absolute;display:block;object-fit:cover;pointer-events:none;transform-origin:50% 50%;} .gr-pic.is-rot{transform:rotate(90deg);}'
  + '.gr-pic.is-win{animation:grWiggle .6s ease-in-out 1;} .gr-pic.is-rot.is-win{animation:grWiggleR .6s ease-in-out 1;}'
  + '.gr-ruler{position:absolute;left:0;overflow:visible;pointer-events:none;}'
  + '.gr-glass{fill:rgba(251,243,228,.9);stroke:#146B5E;stroke-width:3;}'
  + '.gr-tick{stroke:#146B5E;stroke-width:2;fill:none;} .gr-tick.is-pulse{stroke:#F2784B;stroke-width:4;animation:grPulse 1s ease-in-out infinite;}'
  + '.gr-num{font-family:' + B + ';font-weight:800;fill:' + INK + ';text-anchor:middle;paint-order:stroke;stroke:#FBF3E4;stroke-width:4px;stroke-linejoin:round;}  .gr-num.is-at{fill:#C4522F;} .gr-num.is-glow{fill:#C4522F;paint-order:stroke;stroke:#FFE9C9;stroke-width:6px;}'
  + '.gr-lit{fill:#2E9C88;opacity:.85;animation:grFill .2s ease-out both;} .gr-lit.is-over{fill:#F2784B;opacity:.9;}'
  + '.gr-count{font-family:' + B + ';font-weight:800;fill:#fff;text-anchor:middle;letter-spacing:-.5px;animation:grFill .2s ease-out both;} .gr-count.is-on{fill:#9A3D1C;paint-order:stroke;stroke:#FFFDF6;stroke-width:4px;animation:none;}'
  + '.gr-mark{stroke:#F2784B;stroke-width:3;stroke-linecap:round;}'
  + '.is-fast .gr-lit,.is-fast .gr-count,.is-fast .gr-dim{animation:none !important;}'
  + '.gr-band{position:absolute;left:0;right:0;cursor:pointer;touch-action:none;}'
  + '.gr-marker{position:absolute;width:44px;padding:0;border:0;background:transparent;cursor:grab;touch-action:none;display:flex;justify-content:center;} .gr-marker svg{display:block;}'
  + '.gr-mtip{fill:#F2784B;} .gr-mgrip{fill:#F2784B;stroke:#C4522F;stroke-width:2;} .gr-mline{stroke:#fff;stroke-width:2.4;stroke-linecap:round;} .gr-marker.is-park .gr-mgrip{fill:#F7A07F;}'
  + '.gr-dim{position:absolute;background:rgba(251,243,228,.62);border:2px dashed #F2784B;border-radius:8px;box-sizing:border-box;animation:grDim .4s ease-out both;}'
  + '.gr-drop{position:absolute;width:0;border-left:3px dashed #C4522F;animation:grDrop .3s ease-out both;}'
  + '.gr-tag{position:absolute;transform:translate(-50%,-50%);padding:2px 10px;border-radius:10px;background:#FFE9C9;box-shadow:inset 0 0 0 2px #F2B33D;font-family:' + H + ';font-weight:800;font-size:22px;line-height:1.3;color:' + INK + ';white-space:nowrap;animation:grTag .45s ease-out both;}'
  + '.gr-ctl{display:flex;align-items:center;justify-content:center;gap:12px;}'
  + '.gr-nudge{width:48px;height:48px;border:0;border-radius:12px;background:#FFFDF6;color:#146B5E;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;} .gr-nudge svg{width:24px;height:24px;} .gr-nudge:disabled{opacity:.4;cursor:default;}'
  + '.gr-read{display:flex;align-items:baseline;justify-content:center;gap:6px;min-width:112px;height:52px;padding:0 14px;border-radius:14px;background:#FFFDF6;box-shadow:inset 0 0 0 3px #F2784B;box-sizing:border-box;}'
  + '.gr-readn{font-family:' + H + ';font-weight:800;font-size:34px;line-height:52px;color:' + INK + ';font-variant-numeric:tabular-nums;} .gr-readu{font-family:' + B + ';font-weight:800;font-size:20px;color:#146B5E;}'
  + '.gr-wrap.is-narrow .gr-read{min-width:96px;height:46px;} .gr-wrap.is-narrow .gr-readn{font-size:30px;line-height:46px;} .gr-wrap.is-narrow .gr-nudge{width:46px;height:46px;}'
  + '.gr-bar{display:flex;justify-content:center;} .gr-go{display:flex;align-items:center;justify-content:center;gap:8px;min-width:180px;height:48px;padding:0 22px;border:0;border-radius:14px;background:#146B5E;color:#fff;box-shadow:0 3px 0 #0E4D44;font-family:' + H + ';font-weight:800;font-size:22px;cursor:pointer;} .gr-go svg{width:22px;height:22px;display:block;}'
  + '.gr-wrap.is-narrow .gr-go{height:44px;font-size:20px;}'
  + '.gr-note{margin:0;max-width:640px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .gr-wrap.is-narrow .gr-note{font-size:16px;line-height:1.25;} .gr-note:empty{display:none;} .gr-note.is-hint{color:#9A3D1C;}'
  + '.gr-shelf{position:relative;display:flex;align-items:flex-end;max-width:100%;padding:6px 10px 4px 34px;border-radius:14px;background:#F3EBDD;box-shadow:inset 0 0 0 2px #CDBFA4;box-sizing:border-box;}'
  + '.gr-chart{display:flex;align-items:flex-end;justify-content:center;flex-wrap:wrap;gap:6px;} .gr-wrap.is-narrow .gr-chart{gap:2px;flex-wrap:nowrap;} .gr-wrap.is-narrow .gr-shelf{padding:4px 4px 4px 26px;}'
  + '.gr-col{display:flex;flex-direction:column;align-items:center;gap:2px;width:44px;} .gr-wrap.is-narrow .gr-col{width:30px;}'
  + '.gr-coln{font-family:' + H + ';font-weight:800;font-size:16px;line-height:1;color:' + INK + ';} .gr-colbar{display:block;width:16px;border-radius:4px 4px 0 0;background:#2E9C88;} .gr-col.is-new .gr-colbar{background:#F2784B;} .gr-col.is-new{animation:grTag .45s ease-out both;}'
  + '.gr-thumb{display:block;object-fit:contain;} .gr-shelfu{position:absolute;left:8px;top:6px;font-family:' + B + ';font-weight:800;font-size:14px;color:#146B5E;} .gr-wrap.is-narrow .gr-shelfu{left:4px;}'
  + '.gr-marker:focus-visible,.gr-nudge:focus-visible,.gr-go:focus-visible{outline:3px solid #2E5BD6;outline-offset:2px;}'
  + '@keyframes grFill{0%{opacity:0}100%{opacity:1}}'
  + '@keyframes grDim{0%{opacity:0}100%{opacity:1}}'
  + '@keyframes grDrop{0%{transform:scaleY(0);transform-origin:top}100%{transform:scaleY(1);transform-origin:top}}'
  + '@keyframes grPulse{0%,100%{opacity:1}50%{opacity:.45}}'
  + '@keyframes grTag{0%{opacity:0;margin-top:-14px}100%{opacity:1;margin-top:0}}'
  + '@keyframes grWiggle{0%,100%{transform:none}25%{transform:translateY(-6px) rotate(-2deg)}75%{transform:translateY(-3px) rotate(2deg)}}'
  + '@keyframes grWiggleR{0%,100%{transform:rotate(90deg)}25%{transform:translateY(-6px) rotate(88deg)}75%{transform:translateY(-3px) rotate(92deg)}}'
  + '@media (prefers-reduced-motion:reduce){.gr-pic.is-win,.gr-tick.is-pulse,.gr-lit,.gr-count,.gr-dim,.gr-drop,.gr-tag,.gr-col.is-new{animation:none !important;}}';
  var st = document.createElement('style'); st.id = 'gr-css'; st.textContent = css; document.head.appendChild(st);
}
if (typeof window !== 'undefined') window.GlowRulerActivity = GlowRulerActivity;
