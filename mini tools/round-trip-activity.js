/* =====================================================================
   round-trip-activity.js — ACTIVITY #143 of the one-by-one rebuild:
   "Gus's Snack Cart" → THE ROUND-TRIP CART (2.NBT.B.5; G2-251/255/256/
   259, G2-393, G3-389; all 11 locales). Model: round-trip-core.js
   (RoundTripCore). Design: docs/activities-rebuild/designs/143-gus-snack-cart.md
   ---------------------------------------------------------------------
   The invention: the child types where the story leaves Gus's stock;
   on Check Gus's cart drives OUT to that number on a stock road ruled
   0–100, turns, and drives the story's INVERSE back — tens as arcs,
   ones as ticks. Only the right answer brings it home to its flag. A
   miss leaves the cart off the flag with the gap bracketed; a second
   miss re-drives the story forward from the flag to a ghost cart.
   The cart is parked on its flag during a round (the ruled road would
   read the answer off) and rolls freely once the round is home.
   Settings: one stop / a route of three stops; round first off / on.
   No timer, no score.
   Test seams: window.RoundTripActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._key / ._box / ._tap /
   ._check / ._post / ._turn / .FAST / .OK_MS.
   ===================================================================== */
var RoundTripActivity = {
  id: 'round-trip',
  /* the drawn apparatus (the hierarchy gate): the road, the cart, the cards */
  apparatusClasses: ['rt-art'],
  /*STRINGS-BEGIN*/strings: {
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    title: {"en":"Gus's Snack Cart","de":"Gus' Snackwagen","fr":"Le chariot de Gus","es":"El carrito de Gus","pt":"O carrinho do Gus","it":"Il carrello di Gus","nl":"De kar van Gus","sv":"Gus kioskvagn","da":"Gus' snackvogn","no":"Gus' snackvogn","fi":"Gusin herkkukärry"},
    instruction: {"en":"Type how many Gus has now. Then watch the cart try to drive home.","de":"Tippe ein, wie viele Gus jetzt hat. Dann sieh zu, ob der Wagen nach Hause fährt.","fr":"Écris combien Gus en a maintenant. Puis regarde le chariot essayer de rentrer.","es":"Escribe cuántos tiene Gus ahora. Luego mira si el carrito vuelve a casa.","pt":"Digite quantos o Gus tem agora. Depois veja o carrinho tentar voltar para casa.","it":"Scrivi quanti ne ha Gus adesso. Poi guarda il carrello che prova a tornare a casa.","nl":"Typ hoeveel Gus er nu heeft. Kijk dan of de kar naar huis rijdt.","sv":"Skriv hur många Gus har nu. Titta sedan när vagnen försöker köra hem.","da":"Skriv, hvor mange Gus har nu. Se så, om vognen kan køre hjem.","no":"Skriv hvor mange Gus har nå. Se så om vogna klarer å kjøre hjem.","fi":"Kirjoita, montako Gusilla on nyt. Katso sitten, pääseekö kärry kotiin."},
    pOne: {"en":"Type how many Gus has now. Then watch the cart try to drive home.","de":"Tippe ein, wie viele Gus jetzt hat. Dann sieh zu, ob der Wagen nach Hause fährt.","fr":"Écris combien Gus en a maintenant. Puis regarde le chariot essayer de rentrer.","es":"Escribe cuántos tiene Gus ahora. Luego mira si el carrito vuelve a casa.","pt":"Digite quantos o Gus tem agora. Depois veja o carrinho tentar voltar para casa.","it":"Scrivi quanti ne ha Gus adesso. Poi guarda il carrello che prova a tornare a casa.","nl":"Typ hoeveel Gus er nu heeft. Kijk dan of de kar naar huis rijdt.","sv":"Skriv hur många Gus har nu. Titta sedan när vagnen försöker köra hem.","da":"Skriv, hvor mange Gus har nu. Se så, om vognen kan køre hjem.","no":"Skriv hvor mange Gus har nå. Se så om vogna klarer å kjøre hjem.","fi":"Kirjoita, montako Gusilla on nyt. Katso sitten, pääseekö kärry kotiin."},
    pRoute: {"en":"Write Gus's number after every sign. The cart drives each one back.","de":"Schreib nach jedem Zeichen die Zahl von Gus auf. Der Wagen fährt jede Strecke zurück.","fr":"Écris le nombre de Gus après chaque signe. Le chariot refait chaque trajet à l’envers.","es":"Escribe el número de Gus después de cada signo. El carrito recorre cada tramo de regreso.","pt":"Escreva o número do Gus depois de cada sinal. O carrinho refaz cada trecho de volta.","it":"Scrivi il numero di Gus dopo ogni segno. Il carrello rifà ogni tratto all’indietro.","nl":"Schrijf na elk teken het getal van Gus op. De kar rijdt elk stuk terug.","sv":"Skriv Gus tal efter varje tecken. Vagnen kör tillbaka varje bit.","da":"Skriv Gus’ tal efter hvert tegn. Vognen kører hvert stykke tilbage.","no":"Skriv tallet til Gus etter hvert tegn. Vogna kjører hver bit tilbake.","fi":"Kirjoita Gusin luku jokaisen merkin jälkeen. Kärry ajaa jokaisen pätkän takaisin."},
    pRound: {"en":"Round both numbers to the nearest ten and add them. Then find the exact answer.","de":"Runde beide Zahlen auf den nächsten Zehner und rechne sie zusammen. Dann finde das genaue Ergebnis.","fr":"Arrondis les deux nombres à la dizaine la plus proche et additionne-les. Puis trouve le résultat exact.","es":"Redondea los dos números a la decena más cercana y súmalos. Luego encuentra el resultado exacto.","pt":"Arredonde os dois números para a dezena mais próxima e some. Depois encontre o resultado exato.","it":"Arrotonda i due numeri alla decina più vicina e sommali. Poi trova il risultato esatto.","nl":"Rond beide getallen af op het dichtstbijzijnde tiental en tel ze op. Zoek dan het precieze antwoord.","sv":"Avrunda båda talen till närmaste tiotal och addera dem. Räkna sedan ut det exakta svaret.","da":"Rund begge tal af til nærmeste tier, og læg dem sammen. Find så det præcise resultat.","no":"Rund av begge tallene til nærmeste tier, og legg dem sammen. Finn så det nøyaktige svaret.","fi":"Pyöristä molemmat luvut lähimpään kymmeneen ja laske ne yhteen. Laske sitten tarkka vastaus."},
    sOne0: {"en":"Gus had 45 cookies. He sold 8.","de":"Gus hatte 45 Kekse. Er hat 8 verkauft.","fr":"Gus avait 45 biscuits. Il en a vendu 8.","es":"Gus tenía 45 galletas. Vendió 8.","pt":"O Gus tinha 45 biscoitos. Ele vendeu 8.","it":"Gus aveva 45 biscotti. Ne ha venduti 8.","nl":"Gus had 45 koekjes. Hij verkocht er 8.","sv":"Gus hade 45 kakor. Han sålde 8.","da":"Gus havde 45 småkager. Han solgte 8.","no":"Gus hadde 45 kjekser. Han solgte 8.","fi":"Gusilla oli 45 keksiä. Hän myi 8."},
    sOne1: {"en":"Gus had 23 raspberries. He picked 15 more.","de":"Gus hatte 23 Himbeeren. Er hat noch 15 gepflückt.","fr":"Gus avait 23 framboises. Il en a cueilli 15 de plus.","es":"Gus tenía 23 frambuesas. Recogió 15 más.","pt":"O Gus tinha 23 framboesas. Ele colheu mais 15.","it":"Gus aveva 23 lamponi. Ne ha raccolti altri 15.","nl":"Gus had 23 frambozen. Hij plukte er nog 15 bij.","sv":"Gus hade 23 hallon. Han plockade 15 till.","da":"Gus havde 23 hindbær. Han plukkede 15 mere.","no":"Gus hadde 23 bringebær. Han plukket 15 til.","fi":"Gusilla oli 23 vadelmaa. Hän poimi vielä 15."},
    sOne2: {"en":"Gus had 60 bagels. He sold 25.","de":"Gus hatte 60 Bagels. Er hat 25 verkauft.","fr":"Gus avait 60 bagels. Il en a vendu 25.","es":"Gus tenía 60 bagels. Vendió 25.","pt":"O Gus tinha 60 bagels. Ele vendeu 25.","it":"Gus aveva 60 bagel. Ne ha venduti 25.","nl":"Gus had 60 bagels. Hij verkocht er 25.","sv":"Gus hade 60 bagels. Han sålde 25.","da":"Gus havde 60 bagels. Han solgte 25.","no":"Gus hadde 60 bagler. Han solgte 25.","fi":"Gusilla oli 60 bagelia. Hän myi 25."},
    sOne3: {"en":"Gus had 34 acorns. He found 9 more.","de":"Gus hatte 34 Eicheln. Er hat noch 9 gefunden.","fr":"Gus avait 34 glands. Il en a trouvé 9 de plus.","es":"Gus tenía 34 bellotas. Encontró 9 más.","pt":"O Gus tinha 34 bolotas. Ele achou mais 9.","it":"Gus aveva 34 ghiande. Ne ha trovate altre 9.","nl":"Gus had 34 eikels. Hij vond er nog 9 bij.","sv":"Gus hade 34 ekollon. Han hittade 9 till.","da":"Gus havde 34 agern. Han fandt 9 mere.","no":"Gus hadde 34 eikenøtter. Han fant 9 til.","fi":"Gusilla oli 34 tammenterhoa. Hän löysi vielä 9."},
    sOne4: {"en":"Gus had 70 carrots. He gave away 40.","de":"Gus hatte 70 Karotten. Er hat 40 verschenkt.","fr":"Gus avait 70 carottes. Il en a donné 40.","es":"Gus tenía 70 zanahorias. Regaló 40.","pt":"O Gus tinha 70 cenouras. Ele deu 40.","it":"Gus aveva 70 carote. Ne ha regalate 40.","nl":"Gus had 70 wortels. Hij gaf er 40 weg.","sv":"Gus hade 70 morötter. Han gav bort 40.","da":"Gus havde 70 gulerødder. Han gav 40 væk.","no":"Gus hadde 70 gulrøtter. Han ga bort 40.","fi":"Gusilla oli 70 porkkanaa. Hän antoi pois 40."},
    sOne5: {"en":"Gus had 27 apples. He bought 36 more.","de":"Gus hatte 27 Äpfel. Er hat noch 36 gekauft.","fr":"Gus avait 27 pommes. Il en a acheté 36 de plus.","es":"Gus tenía 27 manzanas. Compró 36 más.","pt":"O Gus tinha 27 maçãs. Ele comprou mais 36.","it":"Gus aveva 27 mele. Ne ha comprate altre 36.","nl":"Gus had 27 appels. Hij kocht er nog 36 bij.","sv":"Gus hade 27 äpplen. Han köpte 36 till.","da":"Gus havde 27 æbler. Han købte 36 mere.","no":"Gus hadde 27 epler. Han kjøpte 36 til.","fi":"Gusilla oli 27 omenaa. Hän osti vielä 36."},
    sOne6: {"en":"Gus had 88 pretzels. He sold 16.","de":"Gus hatte 88 Brezeln. Er hat 16 verkauft.","fr":"Gus avait 88 bretzels. Il en a vendu 16.","es":"Gus tenía 88 pretzels. Vendió 16.","pt":"O Gus tinha 88 pretzels. Ele vendeu 16.","it":"Gus aveva 88 pretzel. Ne ha venduti 16.","nl":"Gus had 88 pretzels. Hij verkocht er 16.","sv":"Gus hade 88 kringlor. Han sålde 16.","da":"Gus havde 88 kringler. Han solgte 16.","no":"Gus hadde 88 kringler. Han solgte 16.","fi":"Gusilla oli 88 rinkeliä. Hän myi 16."},
    sOne7: {"en":"Gus had 19 cherries. He added 47 more.","de":"Gus hatte 19 Kirschen. Er hat noch 47 dazugelegt.","fr":"Gus avait 19 cerises. Il en a ajouté 47 de plus.","es":"Gus tenía 19 cerezas. Agregó 47 más.","pt":"O Gus tinha 19 cerejas. Ele colocou mais 47.","it":"Gus aveva 19 ciliegie. Ne ha aggiunte altre 47.","nl":"Gus had 19 kersen. Hij deed er nog 47 bij.","sv":"Gus hade 19 körsbär. Han lade till 47.","da":"Gus havde 19 kirsebær. Han lagde 47 mere i.","no":"Gus hadde 19 kirsebær. Han la oppi 47 til.","fi":"Gusilla oli 19 kirsikkaa. Hän lisäsi vielä 47."},
    sRound0: {"en":"Gus had 38 cookies. He got 21 more.","de":"Gus hatte 38 Kekse. Er hat noch 21 bekommen.","fr":"Gus avait 38 biscuits. Il en a reçu 21 de plus.","es":"Gus tenía 38 galletas. Le dieron 21 más.","pt":"O Gus tinha 38 biscoitos. Ele ganhou mais 21.","it":"Gus aveva 38 biscotti. Ne ha ricevuti altri 21.","nl":"Gus had 38 koekjes. Hij kreeg er nog 21 bij.","sv":"Gus hade 38 kakor. Han fick 21 till.","da":"Gus havde 38 småkager. Han fik 21 mere.","no":"Gus hadde 38 kjekser. Han fikk 21 til.","fi":"Gusilla oli 38 keksiä. Hän sai vielä 21."},
    sRound1: {"en":"Gus had 43 raspberries. He got 36 more.","de":"Gus hatte 43 Himbeeren. Er hat noch 36 bekommen.","fr":"Gus avait 43 framboises. Il en a reçu 36 de plus.","es":"Gus tenía 43 frambuesas. Le dieron 36 más.","pt":"O Gus tinha 43 framboesas. Ele ganhou mais 36.","it":"Gus aveva 43 lamponi. Ne ha ricevuti altri 36.","nl":"Gus had 43 frambozen. Hij kreeg er nog 36 bij.","sv":"Gus hade 43 hallon. Han fick 36 till.","da":"Gus havde 43 hindbær. Han fik 36 mere.","no":"Gus hadde 43 bringebær. Han fikk 36 til.","fi":"Gusilla oli 43 vadelmaa. Hän sai vielä 36."},
    sRound2: {"en":"Gus had 25 bagels. He got 42 more.","de":"Gus hatte 25 Bagels. Er hat noch 42 bekommen.","fr":"Gus avait 25 bagels. Il en a reçu 42 de plus.","es":"Gus tenía 25 bagels. Le dieron 42 más.","pt":"O Gus tinha 25 bagels. Ele ganhou mais 42.","it":"Gus aveva 25 bagel. Ne ha ricevuti altri 42.","nl":"Gus had 25 bagels. Hij kreeg er nog 42 bij.","sv":"Gus hade 25 bagels. Han fick 42 till.","da":"Gus havde 25 bagels. Han fik 42 mere.","no":"Gus hadde 25 bagler. Han fikk 42 til.","fi":"Gusilla oli 25 bagelia. Hän sai vielä 42."},
    sRound3: {"en":"Gus had 17 acorns. He got 34 more.","de":"Gus hatte 17 Eicheln. Er hat noch 34 bekommen.","fr":"Gus avait 17 glands. Il en a reçu 34 de plus.","es":"Gus tenía 17 bellotas. Le dieron 34 más.","pt":"O Gus tinha 17 bolotas. Ele ganhou mais 34.","it":"Gus aveva 17 ghiande. Ne ha ricevute altre 34.","nl":"Gus had 17 eikels. Hij kreeg er nog 34 bij.","sv":"Gus hade 17 ekollon. Han fick 34 till.","da":"Gus havde 17 agern. Han fik 34 mere.","no":"Gus hadde 17 eikenøtter. Han fikk 34 til.","fi":"Gusilla oli 17 tammenterhoa. Hän sai vielä 34."},
    sRound4: {"en":"Gus had 61 carrots. He got 28 more.","de":"Gus hatte 61 Karotten. Er hat noch 28 bekommen.","fr":"Gus avait 61 carottes. Il en a reçu 28 de plus.","es":"Gus tenía 61 zanahorias. Le dieron 28 más.","pt":"O Gus tinha 61 cenouras. Ele ganhou mais 28.","it":"Gus aveva 61 carote. Ne ha ricevute altre 28.","nl":"Gus had 61 wortels. Hij kreeg er nog 28 bij.","sv":"Gus hade 61 morötter. Han fick 28 till.","da":"Gus havde 61 gulerødder. Han fik 28 mere.","no":"Gus hadde 61 gulrøtter. Han fikk 28 til.","fi":"Gusilla oli 61 porkkanaa. Hän sai vielä 28."},
    sRound5: {"en":"Gus had 46 apples. He got 45 more.","de":"Gus hatte 46 Äpfel. Er hat noch 45 bekommen.","fr":"Gus avait 46 pommes. Il en a reçu 45 de plus.","es":"Gus tenía 46 manzanas. Le dieron 45 más.","pt":"O Gus tinha 46 maçãs. Ele ganhou mais 45.","it":"Gus aveva 46 mele. Ne ha ricevute altre 45.","nl":"Gus had 46 appels. Hij kreeg er nog 45 bij.","sv":"Gus hade 46 äpplen. Han fick 45 till.","da":"Gus havde 46 æbler. Han fik 45 mere.","no":"Gus hadde 46 epler. Han fikk 45 til.","fi":"Gusilla oli 46 omenaa. Hän sai vielä 45."},
    sRound6: {"en":"Gus had 33 pretzels. He got 12 more.","de":"Gus hatte 33 Brezeln. Er hat noch 12 bekommen.","fr":"Gus avait 33 bretzels. Il en a reçu 12 de plus.","es":"Gus tenía 33 pretzels. Le dieron 12 más.","pt":"O Gus tinha 33 pretzels. Ele ganhou mais 12.","it":"Gus aveva 33 pretzel. Ne ha ricevuti altri 12.","nl":"Gus had 33 pretzels. Hij kreeg er nog 12 bij.","sv":"Gus hade 33 kringlor. Han fick 12 till.","da":"Gus havde 33 kringler. Han fik 12 mere.","no":"Gus hadde 33 kringler. Han fikk 12 til.","fi":"Gusilla oli 33 rinkeliä. Hän sai vielä 12."},
    sRound7: {"en":"Gus had 54 cherries. He got 19 more.","de":"Gus hatte 54 Kirschen. Er hat noch 19 bekommen.","fr":"Gus avait 54 cerises. Il en a reçu 19 de plus.","es":"Gus tenía 54 cerezas. Le dieron 19 más.","pt":"O Gus tinha 54 cerejas. Ele ganhou mais 19.","it":"Gus aveva 54 ciliegie. Ne ha ricevute altre 19.","nl":"Gus had 54 kersen. Hij kreeg er nog 19 bij.","sv":"Gus hade 54 körsbär. Han fick 19 till.","da":"Gus havde 54 kirsebær. Han fik 19 mere.","no":"Gus hadde 54 kirsebær. Han fikk 19 til.","fi":"Gusilla oli 54 kirsikkaa. Hän sai vielä 19."},
    sRoute: {"en":"Gus's cart starts at {a}. Follow the signs.","de":"Der Wagen von Gus startet bei {a}. Folge den Zeichen.","fr":"Le chariot de Gus part de {a}. Suis les signes.","es":"El carrito de Gus sale del número {a}. Sigue los signos.","pt":"O carrinho do Gus sai do número {a}. Siga os sinais.","it":"Il carrello di Gus parte dal numero {a}. Segui i segni.","nl":"De kar van Gus begint bij {a}. Volg de tekens.","sv":"Gus vagn börjar på {a}. Följ tecknen.","da":"Gus’ vogn starter ved {a}. Følg tegnene.","no":"Vogna til Gus starter på {a}. Følg tegnene.","fi":"Gusin kärry lähtee luvusta {a}. Seuraa merkkejä."},
    hintStart: {"en":"Type how many Gus has now.","de":"Tippe ein, wie viele Gus jetzt hat.","fr":"Écris combien Gus en a maintenant.","es":"Escribe cuántos tiene Gus ahora.","pt":"Digite quantos o Gus tem agora.","it":"Scrivi quanti ne ha Gus adesso.","nl":"Typ hoeveel Gus er nu heeft.","sv":"Skriv hur många Gus har nu.","da":"Skriv, hvor mange Gus har nu.","no":"Skriv hvor mange Gus har nå.","fi":"Kirjoita, montako Gusilla on nyt."},
    hintLeg: {"en":"Write a number after every sign.","de":"Schreib nach jedem Zeichen eine Zahl.","fr":"Écris un nombre après chaque signe.","es":"Escribe un número después de cada signo.","pt":"Escreva um número depois de cada sinal.","it":"Scrivi un numero dopo ogni segno.","nl":"Schrijf na elk teken een getal.","sv":"Skriv ett tal efter varje tecken.","da":"Skriv et tal efter hvert tegn.","no":"Skriv et tall etter hvert tegn.","fi":"Kirjoita luku jokaisen merkin jälkeen."},
    hintRound: {"en":"Send each number to its nearer ten first.","de":"Schick zuerst jede Zahl zu ihrem nächsten Zehner.","fr":"Envoie d’abord chaque nombre à sa dizaine la plus proche.","es":"Primero manda cada número a su decena más cercana.","pt":"Primeiro leve cada número para a dezena mais próxima.","it":"Prima porta ogni numero alla sua decina più vicina.","nl":"Stuur eerst elk getal naar het dichtstbijzijnde tiental.","sv":"Skicka först varje tal till närmaste tiotal.","da":"Send først hvert tal hen til nærmeste tier.","no":"Send først hvert tall til nærmeste tier.","fi":"Vie ensin jokainen luku lähimpään kymmeneen."},
    hintAbout: {"en":"Type the rounded total in the small box first.","de":"Tippe zuerst die gerundete Summe in das kleine Feld.","fr":"Écris d’abord le total arrondi dans la petite case.","es":"Primero escribe el total redondeado en la cajita.","pt":"Primeiro digite o total arredondado na caixinha.","it":"Prima scrivi il totale arrotondato nella casella piccola.","nl":"Typ eerst het afgeronde totaal in het kleine vakje.","sv":"Skriv först den avrundade summan i den lilla rutan.","da":"Skriv først den afrundede sum i den lille boks.","no":"Skriv først den avrundede summen i den lille ruta.","fi":"Kirjoita ensin pyöristetty summa pieneen ruutuun."},
    hintFar: {"en":"That ten is farther away. Count the lit ticks.","de":"Dieser Zehner ist weiter weg. Zähl die leuchtenden Striche.","fr":"Cette dizaine est plus loin. Compte les traits allumés.","es":"Esa decena está más lejos. Cuenta las rayitas iluminadas.","pt":"Essa dezena está mais longe. Conte os tracinhos acesos.","it":"Quella decina è più lontana. Conta le tacche illuminate.","nl":"Dat tiental ligt verder weg. Tel de verlichte streepjes.","sv":"Det tiotalet ligger längre bort. Räkna de tända strecken.","da":"Den tier ligger længere væk. Tæl de tændte streger.","no":"Den tieren ligger lenger unna. Tell de lysende strekene.","fi":"Tuo kymmen on kauempana. Laske valaistut viivat."},
    hintFive: {"en":"Halfway between two tens, we round up.","de":"Genau in der Mitte wird aufgerundet.","fr":"Pile au milieu, on arrondit à la dizaine supérieure.","es":"Justo a la mitad se redondea hacia arriba.","pt":"Bem no meio, arredondamos para cima.","it":"Esattamente a metà si arrotonda per eccesso.","nl":"Precies in het midden rond je naar boven af.","sv":"Precis i mitten avrundar vi uppåt.","da":"Lige i midten runder vi op.","no":"Midt mellom to tiere runder vi opp.","fi":"Tasan puolivälissä pyöristetään ylöspäin."},
    hintGap: {"en":"The cart came back to {r}, not home to {a}.","de":"Der Wagen kam bei {r} an, nicht zu Hause bei {a}.","fr":"Le chariot est revenu à {r}, pas chez lui à {a}.","es":"El carrito regresó al {r}, no a casa en el {a}.","pt":"O carrinho voltou para o {r}, não para casa no {a}.","it":"Il carrello è tornato al numero {r}, non a casa al numero {a}.","nl":"De kar kwam terug bij {r}, niet thuis bij {a}.","sv":"Vagnen kom tillbaka till {r}, inte hem till {a}.","da":"Vognen kom tilbage til {r}, ikke hjem til {a}.","no":"Vogna kom tilbake til {r}, ikke hjem til {a}.","fi":"Kärry palasi lukuun {r}, ei kotiin lukuun {a}."},
    hintOff: {"en":"The cart ran off the road before it got home.","de":"Der Wagen ist von der Straße gerollt, bevor er zu Hause war.","fr":"Le chariot est sorti de la route avant d’arriver chez lui.","es":"El carrito se salió del camino antes de llegar a casa.","pt":"O carrinho saiu da estrada antes de chegar em casa.","it":"Il carrello è uscito dalla strada prima di arrivare a casa.","nl":"De kar reed van de weg af voordat hij thuis was.","sv":"Vagnen körde av vägen innan den kom hem.","da":"Vognen kørte af vejen, før den kom hjem.","no":"Vogna kjørte av veien før den kom hjem.","fi":"Kärry ajoi tieltä ennen kuin pääsi kotiin."},
    hintHops: {"en":"Watch the story hops from {a}: {parts}.","de":"Sieh dir die Sprünge der Geschichte ab {a} an: {parts}.","fr":"Regarde les bonds de l’histoire à partir de {a} : {parts}.","es":"Mira los saltos de la historia desde el {a}: {parts}.","pt":"Veja os pulos da história a partir do {a}: {parts}.","it":"Guarda i salti della storia dal numero {a}: {parts}.","nl":"Kijk naar de sprongen van het verhaal vanaf {a}: {parts}.","sv":"Titta på berättelsens hopp från {a}: {parts}.","da":"Se historiens hop fra {a}: {parts}.","no":"Se hoppene i historien fra {a}: {parts}.","fi":"Katso tarinan hypyt luvusta {a}: {parts}."},
    pTens1: {"en":"1 ten","de":"1 Zehner","fr":"1 dizaine","es":"1 decena","pt":"1 dezena","it":"1 decina","nl":"1 tiental","sv":"1 tiotal","da":"1 tier","no":"1 tier","fi":"1 kymmen"},
    pTensN: {"en":"{k} tens","de":"{k} Zehner","fr":"{k} dizaines","es":"{k} decenas","pt":"{k} dezenas","it":"{k} decine","nl":"{k} tientallen","sv":"{k} tiotal","da":"{k} tiere","no":"{k} tiere","fi":"{k} kymmentä"},
    pOnes1: {"en":"1 one","de":"1 Einer","fr":"1 unité","es":"1 unidad","pt":"1 unidade","it":"1 unità","nl":"1 eenheid","sv":"1 ental","da":"1 ener","no":"1 ener","fi":"1 ykkönen"},
    pOnesN: {"en":"{k} ones","de":"{k} Einer","fr":"{k} unités","es":"{k} unidades","pt":"{k} unidades","it":"{k} unità","nl":"{k} eenheden","sv":"{k} ental","da":"{k} enere","no":"{k} enere","fi":"{k} ykköstä"},
    pAnd: {"en":"{t} and {o}","de":"{t} und {o}","fr":"{t} et {o}","es":"{t} y {o}","pt":"{t} e {o}","it":"{t} e {o}","nl":"{t} en {o}","sv":"{t} och {o}","da":"{t} og {o}","no":"{t} og {o}","fi":"{t} ja {o}"},
    okSub: {"en":"{a} take away {b} is {c} — and {c} and {b} bring it back to {a}!","de":"{a} minus {b} ist {c} — und {c} plus {b} bringt dich zurück zu {a}!","fr":"{a} moins {b}, ça fait {c} — et {c} plus {b} te ramène à {a} !","es":"¡{a} menos {b} es {c}, y {c} más {b} te regresa al {a}!","pt":"{a} menos {b} é {c} — e {c} mais {b} traz de volta ao {a}!","it":"{a} meno {b} fa {c} — e {c} più {b} ti riporta a {a}!","nl":"{a} min {b} is {c} — en {c} plus {b} brengt je terug bij {a}!","sv":"{a} minus {b} är {c} — och {c} plus {b} tar dig tillbaka till {a}!","da":"{a} minus {b} er {c} — og {c} plus {b} bringer dig tilbage til {a}!","no":"{a} minus {b} er {c} — og {c} pluss {b} tar deg tilbake til {a}!","fi":"{a} miinus {b} on {c} — ja {c} plus {b} vie takaisin lukuun {a}!"},
    okAdd: {"en":"{a} and {b} more is {c} — take {b} away and you are back at {a}!","de":"{a} plus {b} ist {c} — nimm {b} weg, und du bist wieder bei {a}!","fr":"{a} plus {b}, ça fait {c} — enlève {b} et tu reviens à {a} !","es":"¡{a} más {b} es {c}, y si quitas {b} regresas al {a}!","pt":"{a} mais {b} é {c} — tire {b} e você volta ao {a}!","it":"{a} più {b} fa {c} — togli {b} e torni a {a}!","nl":"{a} plus {b} is {c} — haal {b} weg en je bent terug bij {a}!","sv":"{a} plus {b} är {c} — ta bort {b} så är du tillbaka på {a}!","da":"{a} plus {b} er {c} — tag {b} væk, så er du tilbage ved {a}!","no":"{a} pluss {b} er {c} — ta bort {b}, så er du tilbake på {a}!","fi":"{a} plus {b} on {c} — ota {b} pois, niin olet taas luvussa {a}!"},
    okRoute: {"en":"{a}, {s1}, {s2}, {s3} — and the cart drove all the way home!","de":"{a}, {s1}, {s2}, {s3} — und der Wagen ist den ganzen Weg zurückgefahren!","fr":"{a}, {s1}, {s2}, {s3} — et le chariot a refait tout le trajet !","es":"¡{a}, {s1}, {s2}, {s3}, y el carrito regresó por todo el camino!","pt":"{a}, {s1}, {s2}, {s3} — e o carrinho fez todo o caminho de volta!","it":"{a}, {s1}, {s2}, {s3} — e il carrello ha rifatto tutta la strada!","nl":"{a}, {s1}, {s2}, {s3} — en de kar reed de hele weg terug!","sv":"{a}, {s1}, {s2}, {s3} — och vagnen körde hela vägen tillbaka!","da":"{a}, {s1}, {s2}, {s3} — og vognen kørte hele vejen tilbage!","no":"{a}, {s1}, {s2}, {s3} — og vogna kjørte hele veien tilbake!","fi":"{a}, {s1}, {s2}, {s3} — ja kärry ajoi koko matkan takaisin!"},
    okAbout: {"en":"{c} is close to {about}: a sensible answer.","de":"{c} liegt nah bei {about}: ein sinnvolles Ergebnis.","fr":"{c} est proche de {about} : c’est un résultat logique.","es":"{c} está cerca de {about}: un resultado razonable.","pt":"{c} fica perto de {about}: um resultado razoável.","it":"{c} è vicino a {about}: un risultato sensato.","nl":"{c} ligt dicht bij {about}: een logisch antwoord.","sv":"{c} ligger nära {about}: ett rimligt svar.","da":"{c} ligger tæt på {about}: et rimeligt resultat.","no":"{c} ligger nær {about}: et rimelig svar.","fi":"{c} on lähellä lukua {about}: järkevä vastaus."},
    setTrips: {"en":"Trips","de":"Fahrten","fr":"Trajets","es":"Recorridos","pt":"Percursos","it":"Percorsi","nl":"Ritten","sv":"Resor","da":"Ture","no":"Turer","fi":"Matkat"},
    tOne: {"en":"one stop","de":"ein Halt","fr":"un arrêt","es":"una parada","pt":"uma parada","it":"una fermata","nl":"één stop","sv":"ett stopp","da":"ét stop","no":"ett stopp","fi":"yksi pysähdys"},
    tRoute: {"en":"a route of three stops","de":"eine Strecke mit drei Halten","fr":"un parcours de trois arrêts","es":"una ruta de tres paradas","pt":"um percurso de três paradas","it":"un percorso di tre fermate","nl":"een route met drie stops","sv":"en rutt med tre stopp","da":"en rute med tre stop","no":"en rute med tre stopp","fi":"kolmen pysähdyksen reitti"},
    setRound: {"en":"Round first","de":"Erst runden","fr":"D’abord arrondir","es":"Primero redondear","pt":"Arredondar primeiro","it":"Prima arrotondare","nl":"Eerst afronden","sv":"Avrunda först","da":"Rund af først","no":"Rund av først","fi":"Pyöristä ensin"},
    rOff: {"en":"off","de":"aus","fr":"non","es":"no","pt":"não","it":"no","nl":"uit","sv":"av","da":"fra","no":"av","fi":"pois"},
    rOn: {"en":"on","de":"an","fr":"oui","es":"sí","pt":"sim","it":"sì","nl":"aan","sv":"på","da":"til","no":"på","fi":"päällä"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Revisar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    aTurnCol: {"en":"Write it in columns","de":"Untereinander schreiben","fr":"Poser en colonnes","es":"Escribir en columnas","pt":"Escrever em colunas","it":"Scrivere in colonna","nl":"Onder elkaar schrijven","sv":"Skriv som en uppställning","da":"Skriv det i kolonner","no":"Skriv det i kolonner","fi":"Kirjoita allekkain"},
    aTurnLine: {"en":"Write it in a line","de":"Nebeneinander schreiben","fr":"Écrire en ligne","es":"Escribir en una línea","pt":"Escrever em uma linha","it":"Scrivere in riga","nl":"Naast elkaar schrijven","sv":"Skriv på en rad","da":"Skriv det på én linje","no":"Skriv det på én linje","fi":"Kirjoita vierekkäin"},
    aRoad: {"en":"number road from 0 to 100, cart at {c}, home flag at {h}","de":"Zahlenstraße von 0 bis 100, Wagen bei {c}, Heimatfahne bei {h}","fr":"route des nombres de 0 à 100, chariot à {c}, drapeau de la maison à {h}","es":"camino de 0 a 100, carrito en el {c}, bandera de casa en el {h}","pt":"estrada de 0 a 100, carrinho no {c}, bandeira de casa no {h}","it":"strada dei numeri da 0 a 100, carrello sul numero {c}, bandiera di casa sul numero {h}","nl":"getallenweg van 0 tot 100, kar bij {c}, thuisvlag bij {h}","sv":"talväg från 0 till 100, vagnen på {c}, hemflaggan på {h}","da":"talvej fra 0 til 100, vognen ved {c}, hjemmeflaget ved {h}","no":"tallvei fra 0 til 100, vogna på {c}, hjemmeflagget på {h}","fi":"lukutie 0–100, kärry luvussa {c}, kotilippu luvussa {h}"},
    aAfter: {"en":"the cart came back to {r}, home is {h}, {g} apart","de":"der Wagen kam bei {r} an, zu Hause ist {h}, {g} auseinander","fr":"le chariot est revenu à {r}, la maison est à {h}, {g} d’écart","es":"el carrito regresó al {r}, la casa está en el {h}, a {g} de distancia","pt":"o carrinho voltou para o {r}, a casa fica no {h}, a {g} de distância","it":"il carrello è tornato al numero {r}, la casa è al numero {h}, {g} di distanza","nl":"de kar kwam bij {r}, thuis is {h}, {g} ertussen","sv":"vagnen kom till {r}, hem är {h}, {g} emellan","da":"vognen kom til {r}, hjem er {h}, {g} imellem","no":"vogna kom til {r}, hjem er {h}, {g} imellom","fi":"kärry palasi lukuun {r}, koti on luvussa {h}, väli {g}"},
    aDel: {"en":"Delete","de":"Löschen","fr":"Effacer","es":"Borrar","pt":"Apagar","it":"Cancella","nl":"Wissen","sv":"Radera","da":"Slet","no":"Slett","fi":"Poista"},
    aAbout: {"en":"about","de":"ungefähr","fr":"environ","es":"aproximadamente","pt":"aproximadamente","it":"circa","nl":"ongeveer","sv":"ungefär","da":"cirka","no":"omtrent","fi":"noin"},
    aAnswer: {"en":"answer","de":"Ergebnis","fr":"résultat","es":"resultado","pt":"resultado","it":"risultato","nl":"antwoord","sv":"svar","da":"resultat","no":"svar","fi":"vastaus"},
    aLeg: {"en":"number after sign {i}","de":"Zahl nach Zeichen {i}","fr":"nombre après le signe {i}","es":"número después del signo {i}","pt":"número depois do sinal {i}","it":"numero dopo il segno {i}","nl":"getal na teken {i}","sv":"tal efter tecken {i}","da":"tal efter tegn {i}","no":"tall etter tegn {i}","fi":"luku merkin {i} jälkeen"},
    aPost: {"en":"ten post {n}","de":"Zehnerpfosten {n}","fr":"poteau de la dizaine {n}","es":"poste de la decena {n}","pt":"poste da dezena {n}","it":"palo della decina {n}","nl":"tientalpaal {n}","sv":"tiotalsstolpe {n}","da":"tierpæl {n}","no":"tierstolpe {n}","fi":"kymmenpylväs {n}"},
    aTag: {"en":"rounded to {n} — tap to undo","de":"gerundet auf {n} — tippen zum Zurücknehmen","fr":"arrondi à {n} — touche pour annuler","es":"redondeado a {n} — toca para deshacer","pt":"arredondado para {n} — toque para desfazer","it":"arrotondato a {n} — tocca per annullare","nl":"afgerond op {n} — tik om terug te gaan","sv":"avrundat till {n} — tryck för att ångra","da":"rundet af til {n} — tryk for at fortryde","no":"rundet av til {n} — trykk for å angre","fi":"pyöristetty lukuun {n} — peru napauttamalla"},
  },/*STRINGS-END*/
  defaults: { trips: 'one', round: 'off' },
  settings: [
    { key: 'trips', type: 'choice', labelKey: 'setTrips', options: [{ value: 'one', labelKey: 'tOne' }, { value: 'route', labelKey: 'tRoute' }] },
    { key: 'round', type: 'choice', labelKey: 'setRound', options: [{ value: 'off', labelKey: 'rOff' }, { value: 'on', labelKey: 'rOn' }] }
  ],
  OK_MS: 500, FAST: false,
  MINUS: '−',

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {};
    injectRoundTripCSS();
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
  _mode: function () { return RoundTripCore.modeOf(this._setting('trips'), this._setting('round')); },
  _key: function () { return this._mode(); },
  _loc: function () { return String((this.api && this.api.lang) || 'en').slice(0, 2); },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _signed: function (s) { return (s < 0 ? this.MINUS : '+') + Math.abs(s); },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = RoundTripCore.rounds(this._mode()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = RoundTripCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._mode(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'round-trip.' + this._key() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function () { var m = this.st ? this.st.mode : this._mode(); return this._t(m === 'route' ? 'pRoute' : m === 'round' ? 'pRound' : 'pOne'); },
  _setPrompt: function () { if (this.st && this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers();
    this.st = RoundTripCore.newState(this._mode(), k);
    this._view = { note: '', ok: '', soft: false, anim: null, flash: null, drag: false };
    this._setPrompt();
    if (this._wrap) this._paint();
  },
  _story: function () {
    var st = this.st, rd = st.rd;
    if (st.mode === 'route') return this._t('sRoute', { a: rd.start });
    return this._t((st.mode === 'round' ? 'sRound' : 'sOne') + rd.k);
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
  _dims: function () { var W = this._width(), B = RoundTripCore.band(W); return { W: W, wide: B.wide, cramp: B.cramp }; },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'rt-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="rt-cards"><div class="rt-story rt-art"></div><div class="rt-eq rt-art"></div></div><div class="rt-road rt-art"></div><p class="rt-note" aria-live="polite"></p><p class="rt-sr" aria-live="polite"></p><div class="rt-pad"></div>';
    this._qs = function (s) { return wrap.querySelector(s); };
    wrap.addEventListener('keydown', function (e) { self._keyboard(e); });
    var road = this._qs('.rt-road');
    road.addEventListener('pointerdown', function (e) { self._roadDown(e); });
    road.addEventListener('pointermove', function (e) { self._roadMove(e); });
    road.addEventListener('pointerup', function () { self._view.drag = false; });
    road.addEventListener('pointercancel', function () { self._view.drag = false; });
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
  _paint_: function () {
    var st = this.st, D = this._dims(), v = this._view;
    this._wrap.className = 'rt-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + st.mode;
    this._paintStory(D); this._paintEq(D); this._paintRoad(D); this._paintPad(D);
    var note = this._qs('.rt-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'rt-note is-ok' + (st.done ? '' : ' is-step'); }
    else if (v.note) { note.textContent = v.note; note.className = 'rt-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'rt-note'; }
    this._setPrompt();
  },

  /* ---------- the story card ---------- */
  _paintStory: function (D) {
    var st = this.st, el = this._qs('.rt-story'), it = RoundTripCore.ITEMS[st.rd.item];
    el.innerHTML = (st.mode === 'route' ? '' : '<img class="rt-snack" src="' + this._pic(it.pic) + '" alt="" draggable="false">') + '<p class="rt-tale">' + esc(this._story()) + '</p>';
  },

  /* ---------- the equation card: a line, a column (turned), or the route ---------- */
  _boxHTML: function (box, cls) {
    var st = this.st, v = st.typed[box], foc = st.focus === box && !st.done, lab = box === 'about' ? this._t('aAbout') : box === 'answer' ? this._t('aAnswer') : this._t('aLeg', { i: +box.slice(3) + 1 });
    var shut = (box === 'about' || box === 'answer') && !RoundTripCore.roundingDone(st);
    var ghost = box === 'about' && st.trip && st.aboutOk === false ? '<span class="rt-pencil">' + RoundTripCore.aboutValue(st) + '</span>' : '';
    return '<button type="button" class="rt-box ' + (cls || '') + (foc ? ' is-focus' : '') + (shut ? ' is-shut' : '') + (st.aboutOk === false && box === 'about' && st.trip ? ' is-wobble' : '') + '" data-k="box-' + box + '" aria-label="' + esc(lab + (v ? ': ' + v : '')) + '"' + (shut || st.done ? ' disabled' : '') + '>' + esc(v) + ghost + '</button>';
  },
  _wavy: function () { return '<svg class="rt-wavy" viewBox="0 0 24 16" aria-hidden="true"><path d="M2 5 q5 -4 10 0 t10 0 M2 11 q5 -4 10 0 t10 0" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>'; },
  _paintEq: function (D) {
    var st = this.st, rd = st.rd, el = this._qs('.rt-eq'), self = this, s0 = rd.steps[0], h = '';
    if (st.mode === 'route') {
      h = '<div class="rt-route"><span class="rt-num">' + rd.start + '</span>' + rd.steps.map(function (s, i) {
        var dim = st.trip && st.trip.fail >= 0 && i > st.trip.fail;
        return '<span class="rt-leg' + (dim ? ' is-wait' : '') + '"><span class="rt-arrow">→</span><span class="rt-sign">' + self._signed(s) + '</span>' + self._boxHTML('leg' + i, 'is-leg') + '</span>';
      }).join('') + '</div>';
    } else if (st.column) {
      var ans = st.typed.answer, d = ans.length === 2 ? ans.split('') : ['', ans];
      h = '<div class="rt-col"><span class="rt-cr"></span><span class="rt-cd">' + Math.floor(rd.start / 10) + '</span><span class="rt-cd">' + rd.start % 10 + '</span>'
        + '<span class="rt-cr">' + (s0 < 0 ? this.MINUS : '+') + '</span><span class="rt-cd">' + (Math.abs(s0) >= 10 ? Math.floor(Math.abs(s0) / 10) : '') + '</span><span class="rt-cd">' + Math.abs(s0) % 10 + '</span>'
        + '<span class="rt-cline"></span>'
        + '<span class="rt-cr"></span><button type="button" class="rt-box is-digit' + (st.focus === 'answer' && !st.done ? ' is-focus' : '') + '" data-k="box-answer"' + (st.done ? ' disabled' : '') + ' aria-label="' + esc(this._t('aAnswer') + (ans ? ': ' + ans : '')) + '">' + esc(d[0]) + '</button><button type="button" class="rt-box is-digit' + (st.focus === 'answer' && !st.done ? ' is-focus' : '') + '" data-k="box-answer-o"' + (st.done ? ' disabled' : '') + ' aria-hidden="true" tabindex="-1">' + esc(d[1]) + '</button></div>';
    } else {
      var now = st.mode === 'round' && !st.done ? (st.rounded[0] == null ? 0 : st.rounded[1] == null ? 1 : -1) : -1;
      h = '<div class="rt-line"><span class="rt-num' + (now === 0 ? ' is-now' : '') + '">' + rd.start + '</span><span class="rt-op">' + (s0 < 0 ? this.MINUS : '+') + '</span><span class="rt-num' + (now === 1 ? ' is-now' : '') + '">' + Math.abs(s0) + '</span><span class="rt-op">=</span>' + this._boxHTML('answer') + '</div>';
    }
    if (st.mode === 'round') h += '<div class="rt-aboutrow"><span class="rt-abouthead">' + this._wavy() + '</span>' + this._boxHTML('about', 'is-about') + '</div>';
    el.innerHTML = h;
    if (st.mode !== 'route') {
      var tb = this._btn('rt-turn', 'turn', this._t(st.column ? 'aTurnLine' : 'aTurnCol'), st.column
        ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M4 7h16M4 17h10" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4v16M16 4v16M5 20h14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>');
      tb.addEventListener('click', function () { self._turn(); });
      el.appendChild(tb);
    }
    Array.prototype.forEach.call(el.querySelectorAll('.rt-box'), function (b) { b.addEventListener('click', function () { self._box(b.getAttribute('data-k').replace(/^box-/, '').replace(/-o$/, '')); }); });
  },

  /* ---------- the stock road ---------- */
  _geo: function (D) {
    var cs = D.wide ? 96 : 64, W = Math.max(240, D.W - (D.wide ? 8 : 4)), pad = D.wide ? 22 : 14, chip = D.wide ? 26 : D.cramp ? 20 : 22;
    var yRoad = chip + cs + (D.cramp ? 12 : 16), rh = D.wide ? 18 : 14, lab = D.wide ? 18 : 14, extra = this.st.mode === 'round' ? 48 + (RoundTripCore.roundingDone(this.st) || this.st.done ? 0 : 52) : 0;
    var yNums = yRoad + rh + 9 + lab, lanes = this.st.trip ? (this.st.trip.fail >= 0 ? 32 : 0) + (D.cramp ? 0 : 24) : 0, H = yNums + 10 + extra + lanes;
    return { W: W, H: H, pad: pad, cs: cs, chip: chip, yRoad: yRoad, rh: rh, lab: lab, extra: extra, yNums: yNums, yGap: yNums + 10 + extra + 8, x: function (n) { return pad + Math.max(-4, Math.min(104, n)) * (W - 2 * pad) / 100; } };
  },
  _frame: function () {
    /* what the road shows: an animation frame, or the settled picture of st.trip */
    var st = this.st, v = this._view;
    if (v.anim) return v.anim;
    var f = { pos: st.cart, flip: false, legs: [], ghost: null, gap: null, hops: null };
    if (st.trip) {
      st.trip.legs.forEach(function (L, i) { f.legs.push({ from: L.from, claim: L.claim, back: L.back, step: L.step, fade: st.trip.fail < 0 ? false : (i < st.trip.fail || st.help) }); });
      var last = st.trip.legs[st.trip.legs.length - 1];
      if (st.trip.fail >= 0) {
        f.pos = last.back; f.flip = true; f.gap = { a: last.back, b: last.from };
        if (st.help) f.ghost = { from: last.from, to: last.from + last.step };
      } else if (!st.done || !v.drag) { f.pos = st.mode === 'route' ? last.from : st.rd.start; }
      if (st.done) f.pos = st.cart;
    }
    return f;
  },
  _arcs: function (G, from, step, cls) {
    /* the story's hops: tens as arcs, then ones as tick-steps */
    var h = RoundTripCore.hops(step), p = from, out = '', y = G.yRoad - 2;
    for (var i = 0; i < h.tens; i++) { var q = p + 10 * h.dir, x1 = G.x(p), x2 = G.x(q), mx = (x1 + x2) / 2; out += '<path class="rt-arc ' + cls + '" d="M' + x1 + ' ' + y + ' Q' + mx + ' ' + (y - 26) + ' ' + x2 + ' ' + y + '"/>'; p = q; }
    for (var j = 0; j < h.ones; j++) { var r = p + h.dir, a1 = G.x(p), a2 = G.x(r); out += '<path class="rt-step ' + cls + '" d="M' + a1 + ' ' + y + ' Q' + ((a1 + a2) / 2) + ' ' + (y - 7) + ' ' + a2 + ' ' + y + '"/>'; p = r; }
    return out;
  },
  _paintRoad: function (D) {
    var st = this.st, self = this, el = this._qs('.rt-road'), G = this._geo(D), f = this._frame(), v = this._view, rd = st.rd, s = '';
    var yR = G.yRoad, x = G.x;
    /* the road: a cream strip, faint bands every ten, posts with numerals, a tick for every one */
    for (var b = 0; b < 10; b++) s += '<rect class="rt-band' + (b % 2 ? ' is-odd' : '') + '" x="' + x(b * 10) + '" y="' + yR + '" width="' + (x(b * 10 + 10) - x(b * 10)) + '" height="' + G.rh + '"/>';
    s += '<rect class="rt-edge" x="' + x(0) + '" y="' + yR + '" width="' + (x(100) - x(0)) + '" height="' + G.rh + '" rx="3"/>';
    for (var n = 0; n <= 100; n++) {
      if (n % 10) s += '<line class="rt-tick" x1="' + x(n) + '" x2="' + x(n) + '" y1="' + (yR + G.rh) + '" y2="' + (yR + G.rh + (D.wide ? 6 : 4)) + '"/>';
      else {
        s += '<line class="rt-post" x1="' + x(n) + '" x2="' + x(n) + '" y1="' + (yR - 6) + '" y2="' + (yR + G.rh + 9) + '"/>';
        if (D.W >= 380 || n % 20 === 0) s += '<text class="rt-postnum" x="' + x(n) + '" y="' + (yR + G.rh + 9 + G.lab) + '" text-anchor="middle">' + n + '</text>';
      }
    }
    /* the trip: the out-ribbon (coral, under) and the back-ribbon (teal, over), the hops */
    f.legs.forEach(function (L, i) {
      var faded = L.fade ? ' is-fade' : '';
      if (L.claim != null) s += '<line class="rt-out' + faded + '" x1="' + x(L.from) + '" x2="' + x(L.claim) + '" y1="' + (yR + G.rh - 3) + '" y2="' + (yR + G.rh - 3) + '"/>';
      if (L.back != null && L.drawn !== false) { s += '<line class="rt-back' + faded + '" x1="' + x(L.claim) + '" x2="' + x(L.back) + '" y1="' + (yR + 3) + '" y2="' + (yR + 3) + '"/>'; s += self._arcs(G, L.claim, -L.step, 'is-back' + faded); }
    });
    if (st.done && st.trip) st.trip.legs.forEach(function (L) { s += '<rect class="rt-loop" x="' + Math.min(x(L.from), x(L.claim)) + '" y="' + (yR + 1) + '" width="' + Math.abs(x(L.claim) - x(L.from)) + '" height="' + (G.rh - 2) + '" rx="4"/>'; });
    /* miss 2: the story's own hops forward from the flag to a ghost cart */
    if (f.ghost) s += this._arcs(G, f.ghost.from, f.ghost.to - f.ghost.from, 'is-ghost');
    /* the gap bracket: cart to flag, the gap in a chip */
    if (f.gap) {
      var g1 = x(f.gap.a), g2 = x(f.gap.b), gy = G.yGap + 4, gm = (g1 + g2) / 2, gn = Math.abs(f.gap.a - f.gap.b);
      s += '<path class="rt-gap" d="M' + g1 + ' ' + (gy - 8) + ' V' + gy + ' H' + g2 + ' V' + (gy - 8) + '"/>';
      s += '<rect class="rt-gapchip" x="' + (gm - 18) + '" y="' + (gy - 4) + '" width="36" height="22" rx="11"/><text class="rt-gapnum" x="' + gm + '" y="' + (gy + 12) + '" text-anchor="middle">' + gn + '</text>';
    }
    /* the home flag */
    var home = st.mode === 'route' && st.trip && st.trip.fail >= 0 ? st.trip.legs[st.trip.fail].from : (st.mode === 'route' && st.trip && st.trip.fail < 0 ? st.trip.legs[st.trip.legs.length - 1].from : rd.start);
    if (v.anim && v.anim.home != null) home = v.anim.home;
    var fx = x(home), wave = st.done ? ' is-wave' : '', top = '';
    top += '<line class="rt-pole" x1="' + fx + '" x2="' + fx + '" y1="' + (yR - 46) + '" y2="' + yR + '"/><path class="rt-flag' + wave + '" d="M' + fx + ' ' + (yR - 46) + ' L' + (fx + 22) + ' ' + (yR - 39) + ' L' + fx + ' ' + (yR - 32) + 'Z"/>';
    /* the cart's pin to its number */
    var cx = x(f.pos);
    s += '<path class="rt-pin" d="M' + (cx - 7) + ' ' + (yR - 12) + ' L' + (cx + 7) + ' ' + (yR - 12) + ' L' + cx + ' ' + (yR + 1) + 'Z"/>';
    /* round first: the number's tag with lit tick runs to its two posts, or the rounded tags */
    var postBtns = [];
    if (st.mode === 'round') {
      var ly = G.yNums + 8, i0 = st.rounded[0] == null ? 0 : st.rounded[1] == null ? 1 : -1;
      if (i0 >= 0 && !st.done) {
        var nn = i0 === 0 ? rd.start : rd.steps[0], P = RoundTripCore.posts(nn);
        P.forEach(function (pv) { var lo = Math.min(nn, pv), hi = Math.max(nn, pv), fl = v.flash === pv ? ' is-flash' : ''; for (var t = lo; t <= hi; t++) s += '<circle class="rt-lit' + fl + '" cx="' + x(t) + '" cy="' + (yR + G.rh + 3) + '" r="' + (D.wide ? 3.2 : 2.4) + '"/>'; postBtns.push(pv); });
        s += '<circle class="rt-mark" cx="' + x(nn) + '" cy="' + (yR + G.rh / 2) + '" r="' + (D.wide ? 8 : 6.5) + '"/>';
        if (P[1] - nn === 5) s += '<path class="rt-chev" d="M' + (x(P[1]) - 6) + ' ' + (yR - 12) + ' l6 -7 l6 7"/>';
      }
      [0, 1].forEach(function (i) { if (st.rounded[i] != null) s += self._tag(self._tagX(G, i), ly + 9, st.rounded[i], 'is-rounded' + (i ? ' is-second' : '')); });
    }
    var svg = '<svg class="rt-svg rt-art" width="' + G.W + '" height="' + G.H + '" viewBox="0 0 ' + G.W + ' ' + G.H + '" aria-hidden="true">' + s + '</svg>';
    /* the pictures sit over the svg as real images: the cart, the ghost */
    var img = '<img class="rt-cart' + (f.flip ? ' is-flip' : '') + '" src="' + this._pic(RoundTripCore.CART) + '" alt="" draggable="false" style="width:' + G.cs + 'px;height:' + G.cs + 'px;left:' + (cx - G.cs / 2) + 'px;top:' + G.chip + 'px">';
    var chip = '<span class="rt-chip" style="left:' + cx + 'px;top:0">' + (f.pos) + '</span>';
    var ghost = '';
    if (f.ghost) { var gx = x(f.ghost.to); ghost = '<img class="rt-cart is-ghost" src="' + this._pic(RoundTripCore.CART) + '" alt="" draggable="false" style="width:' + G.cs + 'px;height:' + G.cs + 'px;left:' + (gx - G.cs / 2) + 'px;top:' + G.chip + 'px"><span class="rt-chip is-ghost" style="left:' + gx + 'px;top:0">?</span>'; }
    var line = '';
    if (st.trip && !v.anim) { var L0 = st.trip.legs[st.trip.fail >= 0 ? st.trip.fail : st.trip.legs.length - 1]; line = '<p class="rt-written">' + L0.claim + ' ' + this._signed(-L0.step).replace(/^([+−])/, '$1 ') + ' → ' + L0.back + '</p>'; }
    el.style.height = G.H + 'px';
    var topSvg = '<svg class="rt-svg rt-top rt-art" width="' + G.W + '" height="' + G.H + '" viewBox="0 0 ' + G.W + ' ' + G.H + '" aria-hidden="true">' + top + '</svg>';
    el.innerHTML = svg + img + ghost + topSvg + chip + line;
    el.setAttribute('aria-label', this._t('aRoad', { c: f.pos, h: home }));
    var bmid = postBtns.length ? Math.max(G.pad + 50, Math.min(G.W - G.pad - 50, x(st.rounded[0] == null ? rd.start : rd.steps[0]))) : 0;
    postBtns.forEach(function (pv, j) {
      var pb = self._btn('rt-postbtn' + (v.flash === pv ? ' is-flash' : ''), 'post-' + pv, self._t('aPost', { n: pv }), String(pv));
      pb.style.left = (j ? bmid + 3 : bmid - 47) + 'px'; pb.style.top = (G.yNums + 8 + 48) + 'px';
      pb.addEventListener('click', function () { self._post(pv); });
      el.appendChild(pb);
    });
    if (st.mode === 'round' && !st.done) [0, 1].forEach(function (i) {
      if (st.rounded[i] == null || st.typed.about) return;
      var tb = self._btn('rt-tagbtn', 'tag-' + i, self._t('aTag', { n: st.rounded[i] }), '');
      tb.style.left = (self._tagX(G, i) - 22) + 'px'; tb.style.top = (G.yNums + 8) + 'px';
      tb.addEventListener('click', function () { if (RoundTripCore.unround(self.st, i)) { self._view.note = ''; self._paint(); } });
      el.appendChild(tb);
    });
  },
  /* a rounded tag sits on its ten; two tags on one ten stand side by side */
  _tagX: function (G, i) { var st = this.st, cx = G.x(st.rounded[i]); if (st.rounded[0] != null && st.rounded[0] === st.rounded[1]) cx += i ? 24 : -24; return Math.max(G.pad + 22, Math.min(G.W - G.pad - 22, cx)); },
  _tag: function (cx, y, n, cls) { var w = String(n).length * 11 + 18; return '<rect class="rt-tag ' + cls + '" x="' + (cx - w / 2) + '" y="' + y + '" width="' + w + '" height="26" rx="13"/><text class="rt-tagnum ' + cls + '" x="' + cx + '" y="' + (y + 19) + '" text-anchor="middle">' + n + '</text>'; },

  /* ---------- the keypad + Check ---------- */
  _paintPad: function (D) {
    var st = this.st, self = this, pad = this._qs('.rt-pad'); pad.innerHTML = '';
    /* the keypad sleeps until a box can take a digit: while rounding there is nothing to type */
    if (st.done || !RoundTripCore.roundingDone(st)) { pad.style.display = 'none'; return; }
    pad.style.display = '';
    var shut = !st.focus;
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del'].forEach(function (k) {
      var b = self._btn('rt-key' + (k === 'del' ? ' is-del' : ''), 'key-' + k, k === 'del' ? self._t('aDel') : null, k === 'del' ? '⌫' : k);
      b.disabled = shut || !!self._view.anim;
      b.addEventListener('click', function () { self._tap(k); });
      pad.appendChild(b);
    });
    var c = this._btn('rt-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5l12 7-12 7z" fill="currentColor"/></svg><span class="rt-golab">' + esc(this._t('checkBtn')) + '</span>');
    c.disabled = !!this._view.anim;
    c.addEventListener('click', function () { self._check(); });
    pad.appendChild(c);
  },

  /* ---------------- the hand ---------------- */
  _box: function (box) { if (this._view.anim) return; if (RoundTripCore.setFocus(this.st, box)) { this._view.note = ''; this._paint(); } },
  _tap: function (k) { if (this._view.anim) return; if (RoundTripCore.type(this.st, k)) { this._view.note = ''; this._view.ok = ''; this.api.sound(660); this._paint(); } },
  _turn: function () { if (this._view.anim || this.st.mode === 'route') return; this.st.column = !this.st.column; this.api.sound(420); this._paint(); },
  _post: function (pv) {
    var st = this.st, i = st.rounded[0] == null ? 0 : 1, r = RoundTripCore.roundTap(st, i, pv), v = this._view, self = this;
    if (r === 'ok') { v.note = ''; v.flash = null; this.api.sound(700); this._paint(); return; }
    if (r === 'far' || r === 'five') { v.flash = pv; v.note = this._t(r === 'five' ? 'hintFive' : 'hintFar'); v.soft = true; this.api.sound(300); this._paint(); this._later(function () { self._view.flash = null; self._paint(); }, 700); }
  },
  _keyboard: function (e) {
    var st = this.st; if (!st) return;
    if (/^[0-9]$/.test(e.key)) { e.preventDefault(); this._tap(e.key); }
    else if (e.key === 'Backspace') { e.preventDefault(); this._tap('del'); }
    else if (e.key === 'Enter' && e.target === this._wrap) { e.preventDefault(); this._check(); }
    else if (st.done && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) { e.preventDefault(); var d = (e.key === 'ArrowLeft' ? -1 : 1) * (e.shiftKey ? 10 : 1); if (RoundTripCore.drive(st, st.cart + d)) { this.api.sound(500); this._paint(); } }
  },
  /* free play: once home, the cart rolls anywhere; during a round it is parked on its flag */
  _roadX: function (e) { var r = this._qs('.rt-road').getBoundingClientRect(), G = this._geo(this._dims()); return (e.clientX - r.left - G.pad) * 100 / (G.W - 2 * G.pad); },
  _roadDown: function (e) {
    var st = this.st; if (!st || e.target.closest('button')) return;
    if (!st.done) { if (e.target.classList && e.target.classList.contains('rt-cart')) this.api.sound(200); return; }
    this._view.drag = true; if (RoundTripCore.drive(st, this._roadX(e))) { this.api.sound(500); this._paint(); }
  },
  _roadMove: function (e) { if (!this._view.drag || !this.st.done) return; var before = this.st.cart; if (RoundTripCore.drive(this.st, this._roadX(e))) { if (Math.floor(before / 10) !== Math.floor(this.st.cart / 10)) this.api.sound(520); this._paint(); } },

  _hopsPhrase: function (step) {
    var h = RoundTripCore.hops(step), parts = [];
    if (h.tens) parts.push(this._t(h.tens === 1 ? 'pTens1' : 'pTensN', { k: h.tens }));
    if (h.ones) parts.push(this._t(h.ones === 1 ? 'pOnes1' : 'pOnesN', { k: h.ones }));
    return parts.length === 2 ? this._t('pAnd', { t: parts[0], o: parts[1] }) : parts[0];
  },
  _check: function () {
    var st = this.st, v = this._view, self = this; if (v.anim || st.done) return;
    var r = RoundTripCore.check(st);
    if (r.result === 'note') { v.note = this._t(r.key); v.soft = true; v.ok = ''; this.api.sound(300); this._paint(); return; }
    if (r.result === 'no') return;
    v.note = ''; v.ok = '';
    this._drive(st.trip, function () {
      if (r.result === 'home') { self._success(self._okLine()); return; }
      var k = RoundTripCore.hint(st), L = st.trip.legs[st.trip.fail];
      if (k === 'hintHops') v.note = self._t('hintHops', { a: L.from, parts: self._hopsPhrase(L.step) });
      else if (k === 'hintOff') v.note = self._t('hintOff');
      else v.note = self._t('hintGap', { r: L.back, a: L.from });
      v.soft = false;
      self.api.sound(240); self._paint(); self.api.announce(v.note);
      var sr = self._qs('.rt-sr'); if (sr) sr.textContent = self._t('aAfter', { r: L.back, h: L.from, g: Math.abs(L.back - L.from) });
    });
  },
  _okLine: function () {
    var st = this.st, rd = st.rd, s0 = rd.steps[0], c = rd.start + s0;
    if (st.mode === 'route') { var self = this; return this._t('okRoute', { a: rd.start, s1: this._signed(rd.steps[0]), s2: this._signed(rd.steps[1]), s3: this._signed(rd.steps[2]) }); }
    var line = this._t(s0 < 0 ? 'okSub' : 'okAdd', { a: rd.start, b: Math.abs(s0), c: c });
    if (st.mode === 'round') line += ' ' + this._t('okAbout', { c: c, about: RoundTripCore.aboutValue(st) });
    return line;
  },
  /* the round trip, frame by frame: out, turn, back by the inverse (tens arcs, then ones ticks) */
  _drive: function (trip, done) {
    var self = this, v = this._view, frames = [];
    if (this.FAST) { v.anim = null; this._paint(); done(); return; }
    var legsShown = [];
    trip.legs.forEach(function (L, i) {
      var prior = legsShown.slice();
      if (i > 0) frames.push({ ms: 300, f: { pos: L.from, flip: false, legs: prior.slice(), home: L.from } });
      frames.push({ ms: 700, f: { pos: L.claim, flip: false, legs: prior.concat([{ from: L.from, claim: L.claim, back: null, step: L.step }]), home: L.from } });
      frames.push({ ms: 150, f: { pos: L.claim, flip: true, legs: prior.concat([{ from: L.from, claim: L.claim, back: null, step: L.step }]), home: L.from } });
      var h = RoundTripCore.hops(-L.step), p = L.claim;
      for (var t = 0; t < h.tens; t++) { p += 10 * h.dir; frames.push({ ms: 240, f: { pos: p, flip: true, legs: prior.concat([{ from: L.from, claim: L.claim, back: p, step: (L.claim - p) }]), home: L.from }, snd: 360 }); }
      for (var o = 0; o < h.ones; o++) { p += h.dir; frames.push({ ms: 90, f: { pos: p, flip: true, legs: prior.concat([{ from: L.from, claim: L.claim, back: p, step: (L.claim - p) }]), home: L.from }, snd: 880 }); }
      legsShown.push({ from: L.from, claim: L.claim, back: L.back, step: L.step, fade: true });
    });
    var i = 0;
    (function step() {
      if (i >= frames.length) { v.anim = null; self._paint(); done(); return; }
      var fr = frames[i++]; v.anim = fr.f; self._paint(); if (fr.snd) self.api.sound(fr.snd);
      self._later(step, fr.ms);
    })();
  },
  _success: function (msg) {
    var v = this._view;
    v.note = ''; v.ok = msg;
    if (this._pa) this._pa.msg = msg;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectRoundTripCSS() {
  if (typeof document === 'undefined' || document.getElementById('rt-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.rt-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .rt-wrap:focus{outline:none;}'
  + '.rt-cards{display:flex;gap:10px;align-items:stretch;} .rt-wrap.is-narrow .rt-cards,.rt-wrap.is-route .rt-cards{flex-direction:column;gap:8px;} .rt-wrap.is-narrow .rt-story,.rt-wrap.is-narrow .rt-eq,.rt-wrap.is-route .rt-story,.rt-wrap.is-route .rt-eq{flex:0 0 auto;} .rt-wrap.is-route .rt-story{justify-content:center;min-height:0;} .rt-wrap.is-route .rt-eq{padding-right:12px;min-height:0;}'
  + '.rt-story,.rt-eq{position:relative;flex:1 1 0;min-width:0;border-radius:16px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #E2D6BF,0 3px 0 #E2D6BF;padding:8px 12px;display:flex;align-items:center;gap:10px;}'
  + '.rt-snack{width:96px;height:96px;flex:0 0 auto;object-fit:contain;} .rt-wrap.is-narrow .rt-snack{width:64px;height:64px;}'
  + '.rt-tale{margin:0;font-family:' + B + ';font-weight:700;font-size:20px;line-height:1.3;color:' + INK + ';} .rt-wrap.is-narrow .rt-tale{font-size:16px;}'
  + '.rt-eq{justify-content:center;flex-wrap:wrap;padding-right:52px;min-height:112px;} .rt-wrap.is-narrow .rt-eq{min-height:72px;}'
  + '.rt-line,.rt-route{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;font-family:' + H + ';font-weight:800;color:' + INK + ';}'
  + '.rt-line{font-size:44px;} .rt-wrap.is-narrow .rt-line{font-size:34px;gap:6px;}'
  + '.rt-route{font-size:28px;gap:4px;} .rt-wrap.is-narrow .rt-route{font-size:22px;} .rt-leg{display:inline-flex;align-items:center;gap:4px;} .rt-leg.is-wait{opacity:.4;} .rt-arrow{color:#8E8A98;font-size:.8em;} .rt-sign{color:#146B5E;}'
  + '.rt-box{min-width:72px;height:60px;border:0;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 3px #CDBFA4;font-family:' + H + ';font-weight:800;font-size:36px;color:' + INK + ';cursor:pointer;padding:0 6px;position:relative;line-height:1;}'
  + '.rt-box.is-focus{box-shadow:inset 0 0 0 4px #F2784B;} .rt-box.is-shut{opacity:.4;cursor:default;} .rt-box:disabled{cursor:default;}'
  + '.rt-box.is-leg{min-width:58px;height:52px;font-size:28px;} .rt-wrap.is-narrow .rt-box{min-width:58px;height:50px;font-size:28px;} .rt-wrap.is-narrow .rt-box.is-leg{min-width:48px;height:46px;font-size:22px;}'
  + '.rt-box.is-wobble{animation:rtWob .45s 2;} @keyframes rtWob{25%{transform:translateX(-3px);}75%{transform:translateX(3px);}}'
  + '.rt-pencil{position:absolute;right:-6px;top:-14px;font-size:18px;color:#8E8A98;background:#FFFDF6;border-radius:8px;padding:0 4px;box-shadow:0 0 0 1px #CDBFA4;}'
  + '.rt-aboutrow{display:flex;align-items:center;gap:6px;width:100%;justify-content:center;margin-top:6px;} .rt-abouthead{color:#146B5E;display:inline-flex;} .rt-wavy{width:30px;height:20px;} .rt-box.is-about{min-width:64px;height:48px;font-size:28px;}'
  + '.rt-col{display:grid;grid-template-columns:36px 52px 52px;align-items:center;justify-items:center;font-family:' + H + ';font-weight:800;font-size:40px;color:' + INK + ';line-height:1.05;} .rt-wrap.is-narrow .rt-col{grid-template-columns:28px 44px 44px;font-size:32px;}'
  + '.rt-cline{grid-column:1 / -1;width:100%;height:4px;background:' + INK + ';border-radius:2px;margin:2px 0 4px;} .rt-box.is-digit{min-width:48px;width:48px;height:54px;font-size:34px;} .rt-wrap.is-narrow .rt-box.is-digit{min-width:44px;width:44px;height:48px;font-size:28px;}'
  + '.rt-turn{position:absolute;right:4px;top:4px;width:44px;height:44px;border:0;border-radius:12px;background:#EAF6F2;color:#146B5E;cursor:pointer;padding:9px;} .rt-turn svg{width:26px;height:26px;display:block;}'
  + '.rt-road{position:relative;width:100%;overflow:visible;border-radius:16px;background:linear-gradient(#F4FBF8,#EAF4EC);box-shadow:inset 0 0 0 2px #CFE3D8;}'
  + '.rt-svg{position:absolute;left:0;top:0;display:block;overflow:visible;}'
  + '.rt-band{fill:#FFF6E2;} .rt-band.is-odd{fill:#FBEBCB;} .rt-edge{fill:none;stroke:#C9B48E;stroke-width:1.5;}'
  + '.rt-tick{stroke:#9D9384;stroke-width:1.4;} .rt-post{stroke:' + INK + ';stroke-width:2.5;stroke-linecap:round;} .rt-postnum{font-family:' + H + ';font-weight:800;font-size:18px;fill:' + INK + ';} .rt-wrap.is-narrow .rt-postnum{font-size:14px;}'
  + '.rt-out{stroke:#F2784B;stroke-width:6;stroke-linecap:round;} .rt-back{stroke:#2E9C88;stroke-width:6;stroke-linecap:round;} .rt-out.is-fade,.rt-back.is-fade{opacity:.35;}'
  + '.rt-arc{fill:none;stroke:#2E9C88;stroke-width:3;stroke-linecap:round;} .rt-step{fill:none;stroke:#2E9C88;stroke-width:2;stroke-linecap:round;} .rt-arc.is-fade,.rt-step.is-fade{opacity:.35;} .rt-arc.is-ghost,.rt-step.is-ghost{stroke:#5E5A6B;stroke-width:3;stroke-dasharray:6 4;}'
  + '.rt-loop{fill:rgba(46,156,136,.16);}'
  + '.rt-gap{fill:none;stroke:#E0663A;stroke-width:3;stroke-linejoin:round;} .rt-gapchip{fill:#E0663A;} .rt-gapnum{font-family:' + H + ';font-weight:800;font-size:16px;fill:#fff;}'
  + '.rt-pole{stroke:' + INK + ';stroke-width:2.5;stroke-linecap:round;} .rt-flag{fill:#2E9C88;transform-box:fill-box;transform-origin:left center;} .rt-flag.is-wave{animation:rtWave .6s ease-in-out 3;} @keyframes rtWave{50%{transform:scaleX(.7);}}'
  + '.rt-pin{fill:#F2784B;}'
  + '.rt-lit{fill:#F4CF62;} .rt-lit.is-flash{fill:#E0663A;animation:rtFlash .7s;} @keyframes rtFlash{50%{opacity:.2;}}'
  + '.rt-chev{fill:none;stroke:#146B5E;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round;}'
  + '.rt-tag{fill:#fff;stroke:#F2784B;stroke-width:2.5;} .rt-tag.is-rounded{fill:#146B5E;stroke:#146B5E;} .rt-tagnum{font-family:' + H + ';font-weight:800;font-size:17px;fill:' + INK + ';} .rt-tagnum.is-rounded{fill:#fff;}'
  + '.rt-cart{position:absolute;object-fit:contain;transition:left .25s ease-out;pointer-events:auto;} .rt-wrap.is-fast .rt-cart{transition:none;} .rt-cart.is-flip{transform:scaleX(-1);} .rt-cart.is-ghost{opacity:.4;pointer-events:none;}'
  + '.rt-wrap.is-done .rt-cart{cursor:grab;}'
  + '.rt-chip{position:absolute;transform:translateX(-50%);min-width:30px;padding:0 8px;height:24px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 2px #F2784B;font-family:' + H + ';font-weight:800;font-size:18px;line-height:24px;text-align:center;color:' + INK + ';transition:left .25s ease-out;pointer-events:none;} .rt-wrap.is-fast .rt-chip{transition:none;} .rt-chip.is-ghost{opacity:.6;box-shadow:inset 0 0 0 2px #8E8A98;}'
  + '.rt-top{pointer-events:none;} .rt-written{position:absolute;left:0;right:0;bottom:2px;margin:0;text-align:center;font-family:' + H + ';font-weight:800;font-size:18px;color:#146B5E;}'
  + '.rt-postbtn,.rt-tagbtn{position:absolute;width:44px;height:44px;border:0;border-radius:12px;background:#FFF6D6;box-shadow:inset 0 0 0 2px #E9B92E,0 3px 0 #E9B92E;cursor:pointer;padding:0;font-family:' + H + ';font-weight:800;font-size:18px;color:' + INK + ';} .rt-postbtn.is-flash{animation:rtFlash .7s;} .rt-tagbtn{background:transparent;box-shadow:none;} .rt-mark{fill:#F2784B;stroke:#fff;stroke-width:2.5;} .rt-num.is-now{color:#E0663A;text-decoration:underline 4px #F4CF62;text-underline-offset:6px;}'
  + '.rt-note{margin:0;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .rt-wrap.is-narrow .rt-note{font-size:16px;line-height:1.25;} .rt-note:empty{display:none;} .rt-note.is-hint{color:#9A3D1C;}'
  + '.rt-note.is-ok{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;} .rt-note.is-ok.is-step{position:static;width:auto;height:auto;clip:auto;}'
  + '.rt-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.rt-pad{display:grid;grid-template-columns:repeat(12,minmax(44px,1fr));gap:6px;} .rt-wrap.is-narrow .rt-pad{grid-template-columns:repeat(6,1fr);} .rt-wrap.is-cramp .rt-pad{gap:4px;}'
  + '.rt-wrap.is-cramp{gap:8px;} .rt-wrap.is-cramp.is-route .rt-story,.rt-wrap.is-cramp.is-route .rt-eq{padding:4px 8px;} .rt-wrap.is-cramp.is-route .rt-tale{font-size:15px;} .rt-wrap.is-cramp .rt-key,.rt-wrap.is-cramp .rt-go{height:44px;}'
  + '.rt-wrap.is-cramp:not(.is-route) .rt-cards{display:grid;grid-template-columns:64px 1fr;gap:4px 8px;align-items:center;border-radius:16px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #E2D6BF,0 3px 0 #E2D6BF;padding:6px 8px;}'
  + '.rt-wrap.is-cramp:not(.is-route) .rt-story{display:contents;} .rt-wrap.is-cramp:not(.is-route) .rt-snack{grid-row:1 / span 2;} .rt-wrap.is-cramp:not(.is-route) .rt-tale{font-size:15px;}'
  + '.rt-wrap.is-cramp:not(.is-route) .rt-cards{position:relative;} .rt-wrap.is-cramp:not(.is-route) .rt-eq{position:static;background:none;box-shadow:none;padding:0;min-height:0;justify-content:flex-start;} .rt-wrap.is-cramp:not(.is-route) .rt-tale{padding-right:44px;} .rt-wrap.is-cramp .rt-written{display:none;} .rt-wrap.is-cramp .rt-line{font-size:28px;gap:4px;} .rt-wrap.is-cramp .rt-box{height:44px;min-width:52px;font-size:24px;}'
  + '.rt-key,.rt-go{height:48px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;font-family:' + H + ';font-weight:800;font-size:24px;color:' + INK + ';cursor:pointer;padding:0;} .rt-key:disabled,.rt-go:disabled{opacity:.4;cursor:default;}'
  + '.rt-go{background:#146B5E;color:#fff;box-shadow:0 3px 0 #0E4D44;font-size:17px;padding:0 6px;line-height:1.1;}'
  + '.rt-go svg{width:18px;height:18px;vertical-align:-3px;margin-right:4px;} .rt-wrap.is-narrow .rt-golab{display:none;} .rt-wrap.is-narrow .rt-go svg{width:24px;height:24px;margin:0;}'
  + '.rt-wrap.is-wide .rt-pad{grid-template-columns:repeat(11,minmax(40px,1fr)) minmax(96px,2.2fr);}';
  var st = document.createElement('style'); st.id = 'rt-css'; st.textContent = css; document.head.appendChild(st);
}
if (typeof window !== 'undefined') window.RoundTripActivity = RoundTripActivity;
