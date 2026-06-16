/**
 * fi-readiness-word-scramble.js — suomenkielinen (fi) laskeutumissivun teksti kirjainsekoitus-tehtävälle.
 *
 * Tehtävä (Kirjainsekoitus): kuva näytetään, ja sen sanan KIRJAIMET OVAT SEKAISIN (väärässä
 * järjestyksessä). Lapsi järjestää kirjaimet uudelleen ja muodostaa oikean sanan.
 * STANDARD-BEARING (1. luokka, OPS 2014, sisältöalue Lukemisen perustaidot).
 *
 * KAKSI tilaa:
 *   easy   (helpot sanat): lyhyet ja helpot sanat — muutama kirjain järjestettäväksi.
 *   normal (haastavammat sanat): pidemmät ja haastavammat sanat — useampi kirjain.
 *
 * KRIITTINEN AITA #1 — FENCE-A: kirjainsekoitus (kirjaimet SEKAISIN) vs. word-guess
 * (kirjaimet PUUTTUVAT). Tämä tehtävä ei täydennä puuttuvia kirjaimia — se järjestää
 * sekoitetut kirjaimet uudelleen. Kaikki kirjaimet ovat tallella, mutta väärässä
 * järjestyksessä. Kirjainsekoitus OMISTAA tämän kehyksen: sekoitetut kirjaimet /
 * kirjaimet sekaisin / väärässä järjestyksessä / järjestä kirjaimet / muodosta sana
 * kirjaimista / kirjainsekoitus / oikeaan järjestykseen. KIELLETYT (kuuluvat word-guessiin):
 * puuttuva kirjain, puuttuvat kirjaimet, täydennä sana, mitkä kirjaimet puuttuvat,
 * aukko sanassa, kirjoita puuttuvat kirjaimet. Mikään ei puutu — kaikki on sekaisin.
 *
 * Teemasubstantiivit ovat KUVAT, joiden sanoja lapsi järjestää. Substantiivi tulee aina
 * fi-render.js:n paikkamerkeistä:
 *   {H1}        nominatiivin monikko, isolla (otsikko/karuselli/sivun H1)
 *   {N_PL}      nominatiivin monikko, pienellä — SUBJEKTI ("{N_PL} ovat kuvina")
 *   {N_PART_PL} partitiivin monikko, pienellä — OBJEKTI ("katso {N_PART_PL}")
 *   {N_GEN}     genetiivin monikko, pienellä — "{N_GEN} nimet"
 *
 * Ei kovakoodattua teeman substantiivia. Ei numeroita. [NSR-FLAG][fi] §17.5.1.
 */
'use strict';

const SKEL_EASY = [
  `Tällä tehtävällä pieni lukijasi harjoittelee muodostamaan sanoja, joiden kirjaimet ovat sekaisin. Jokaisen kuvan vieressä samat kirjaimet ovat väärässä järjestyksessä, ja lapsi järjestää ne uudelleen oikeaan järjestykseen. Tässä versiossa sanat ovat lyhyitä ja helppoja, vain muutama kirjain kerrallaan, jotta 1. luokan aloittaja saa varman ja iloisen alun. Kuva auttaa: kun pieni näkee, mitkä {N_PL} ovat kyseessä, hän tietää, mikä sana kirjaimista pitää muodostaa. Mikään ei puutu — kaikki kirjaimet ovat tallella, ne ovat vain sekaisin, ja tehtävä on järjestää ne. Mikään ei kiirehdi: jokainen etenee omassa tahdissaan, ilman ajanottoa ja ilman arvosanaa. Lapsi katsoo {N_PART_PL}, lukee sekoitetut kirjaimet ja kirjoittaa sanan oikeaan järjestykseen. Tehtävä on täysin ilmainen, valmiina tulostettavaksi tai pelattavaksi netissä, kotona tai koulussa.`,

  `Tässä tehtävässä jokainen sana saapuu kirjaimet sekaisin — ja juuri se tekee siitä mukavan pulman 1. luokan lapselle. Pieni katsoo kuvaa, lukee väärässä järjestyksessä olevat kirjaimet ja järjestää ne uudelleen, kunnes oikea sana syntyy. Helpossa versiossa sanat ovat lyhyitä, vain muutaman kirjaimen mittaisia, jotta järjestäminen pysyy iloisena ja tehtävä onnistuu. Kuva näyttää aina, mistä on kyse: kun lapsi tunnistaa {N_PART_PL}, hän voi koota sanan kirjaimista. Muista, ettei mitään puutu — kaikki kirjaimet ovat siinä, ne ovat vain sekaisin. Ilman stressiä: jokainen kirjainsekoitus saa kestää juuri niin kauan kuin tarvitsee. Yhä uudelleen pieni järjestää kirjaimet ja muodostaa {N_GEN} nimet oikeaan järjestykseen. Tehtävä on ilmainen ja tulostuu hetkessä keittiön pöydälle.`,

  `Tämä tehtävä tekee lukemisesta leikkiä: jokaisen kuvan kirjaimet ovat väärässä järjestyksessä, ja pieni järjestää ne uudelleen muodostaakseen sanan. Helposta versiosta löytyy lyhyitä, tuttuja sanoja, vain muutama kirjain kerrallaan, jolloin 1. luokan lapsi onnistuu varmasti. Kuva on lapsen apuna: kun hän näkee, mitkä {N_PL} ovat kyseessä, hän tietää, mihin järjestykseen kirjaimet kuuluvat. Mitään ei tarvitse keksiä tyhjästä — sekoitetut kirjaimet ovat kaikki tallella, niitä pitää vain liikutella oikeaan järjestykseen. Mitään ei ole pakotettu, ei painetta, ei ajanottoa. Joka kohdassa pieni lukee {N_PART_PL}, järjestää kirjaimet ja kirjoittaa sanan. Näin kirjaimista ja sanan rakentumisesta tulee tuttua. Tulosta tehtävä niin monta kertaa kuin haluat, täysin ilmaiseksi.`,

  `Kaipaatko hyvin lempeää tapaa harjoitella sanojen muodostamista? Tässä pieni järjestää sekoitettuja kirjaimia oikeaan järjestykseen, mutta lyhyillä ja helpoilla sanoilla. Jokaisen kuvan vieressä samat kirjaimet ovat sekaisin, ja lapsi liikuttelee niitä, kunnes oikea sana syntyy. 1. luokan aloittajalle tämä on kaunis polku, koska kuva näyttää aina vastauksen suunnan: kun pieni tunnistaa {N_PART_PL}, hän osaa rakentaa sanan. Tärkeintä on muistaa, ettei mitään puutu — kirjaimet ovat kaikki paikalla, vain väärässä järjestyksessä. Kaikki rauhassa, ilman painetta ja lapsen omaan tahtiin. Yhä uudelleen pieni järjestää kirjaimet ja muodostaa {N_GEN} nimet oikein. Kaikki tehtävät ovat ilmaisia tulostettaviksi kotona.`,

  `Moni lapsi rakastaa pulmia jo ennen kuin lukeminen sujuu — ja juuri siitä tämä tehtävä ottaa kiinni. Jokaisen kuvan kirjaimet ovat sekaisin, ja pieni järjestää ne uudelleen löytääkseen oikean sanan. Helpossa versiossa sanat ovat lyhyitä, muutaman kirjaimen mittaisia, jotta järjestäminen onnistuu varmasti 1. luokalla. Kun lapsi katsoo {N_PART_PL} kuvassa, hän tietää, mihin järjestykseen kirjaimet kuuluvat. Tärkeää: mikään ei puutu — kaikki sekoitetut kirjaimet ovat siinä, ne ovat vain väärässä järjestyksessä. Kukaan ei vaadi kiirettä: vain rauha ajatella, ilman ajanottoa ja ilman arvosanaa. Joka kohdassa pieni järjestää kirjaimet oikeaan järjestykseen ja kirjoittaa sanan pieneen ruutuun. Tehtävä on ilmainen ja valmiina tulostettavaksi.`,

  `Katso, järjestä, kirjoita — tämä on tehtävän rytmi, jossa jokaisen kuvan kirjaimet ovat sekaisin. Pieni katsoo kuvaa, lukee väärässä järjestyksessä olevat kirjaimet ja järjestää ne uudelleen, kunnes sana on valmis. Helpossa versiossa sanat ovat lyhyitä, jolloin tämä sopii hyvin 1. luokan lapsille, jotka vasta opettelevat kokoamaan sanoja kirjaimista. Kun lapsi tunnistaa, mitä {N_PART_PL} kuva esittää, kirjainten oikea järjestys löytyy helpommin. Pidä mielessä: mikään ei puutu — kaikki kirjaimet ovat tallella, vain sekaisin. Ei kiirettä: työskennellään rauhassa, omassa tahdissa. Yhä uudelleen pieni järjestää {N_GEN} kirjaimet oikeaan järjestykseen ja muodostaa sanan. Ilmainen tulostettavaksi aina kun tekee mieli.`,

  `Silmät ja sormet ovat parhaat apuvälineet 1. luokalla, ja siksi tässä tehtävässä lapsi siirtelee kirjaimia paikoilleen. Jokaisen kuvan sana on annettu kirjaimet sekaisin, ja pieni järjestää ne uudelleen oikeaan järjestykseen. Helpossa versiossa sanat ovat lyhyitä ja tuttuja, jotta sanan kokoaminen sujuu iloisesti. Kuva johdattaa lasta: kun hän näkee {N_PART_PL}, hän aavistaa, mihin järjestykseen sekoitetut kirjaimet asettuvat. Tärkeää muistaa, ettei mitään puutu — kaikki kirjaimet ovat siinä, ne ovat vain väärässä järjestyksessä, ja tehtävä on järjestää ne. Mitään painetta ei ole. Joka kohdassa pieni järjestää kirjaimet ja kirjoittaa sanan. Vähitellen sanojen kokoamisesta tulee tuttua ja mukavaa. Tulosta ilmaiseksi, kotona tai koulussa.`,

  `Pohjimmiltaan tämä tehtävä tiivistyy yhteen iloiseen asiaan: järjestää sekoitetut kirjaimet oikeaan järjestykseen. Jokaisen kuvan vieressä kirjaimet ovat sekaisin, ja pieni liikuttelee niitä, kunnes oikea sana syntyy. Helpossa versiossa sanat ovat lyhyitä, vain muutaman kirjaimen mittaisia, mikä sopii erinomaisesti 1. luokalle. Kuva on aina apuna: kun lapsi tunnistaa, mitä {N_PL} ovat, hän tietää, mikä sana kirjaimista pitää muodostaa. Pidä mielessä, ettei mitään puutu — kaikki sekoitetut kirjaimet ovat tallella, niitä pitää vain järjestää. Aikaa on niin paljon kuin tarvitsee, ilman painetta ja lapsen omaan tahtiin. Yhä uudelleen pieni järjestää {N_GEN} kirjaimet ja kirjoittaa sanan. Tehtävä on ilmainen tulostettavaksi aina kun haluat.`,
];

const P2_EASY = [
  `Hyvä kotivinkki: anna pienen sanoa ensin ääneen, mitä {N_PART_PL} kuva esittää, ja vasta sitten järjestää sekoitetut kirjaimet. Kun sana on mielessä, kirjainten oikea järjestys löytyy kuin itsestään, ja koska sanat ovat lyhyitä, järjestäminen onnistuu helposti. Sormella osoittaminen yksi kirjain kerrallaan auttaa paljon. Tehtävä on ilmainen ja tulostuu hetkessä: istahtakaa pöydän ääreen, kun tekee mieli kotona.`,

  `Onko pieni epävarma? Pyydä häntä lukemaan väärässä järjestyksessä olevat kirjaimet ääneen ja etsimään ensin sanan ensimmäinen kirjain. Lyhyessä helpossa sanassa loput asettuvat sen jälkeen nopeasti oikeaan järjestykseen. Anna {N_GEN} kuvan johdattaa — se näyttää aina, mikä sana on kyseessä. Tulosta tehtävä ilmaiseksi tai pelaa netissä, jos se on teille kätevämpää, kaikessa rauhassa lapsen tahtiin.`,

  `Hyvä puoli näissä helpoissa sanoissa on, että pieni voi aina tarkistaa itse: kun kirjaimet on järjestetty, lukekaa sana yhdessä ja katsokaa {N_PART_PL} kuvaa — sopivatko ne yhteen? Jos ei, järjestetään kirjaimet uudelleen, ilman minkäänlaista painetta. Sanat ovat niin lyhyitä, että uusi yritys on aina kevyt. Lataa tehtävä ilmaiseksi tulostettavaksi ja jätä se pöydälle — yksi kirjainsekoitus on mukava hetki päivässä.`,

  `Haluatko mennä pidemmälle helpoilla sanoilla? Kirjoittakaa kotona muutaman lyhyen sanan kirjaimet pienille lapuille, sekoittakaa ne pöydällä ja antakaa pienen järjestää ne oikeaan järjestykseen kuten tehtävän {N_PL}. Tämä käsillä tekeminen näyttää selvästi, mitä kirjainten järjestäminen tarkoittaa, kun yksikään kirjain ei ole kadonnut, vain sekaisin. Kaikki tehtävät tulostuvat ilmaiseksi niin monta kertaa kuin haluat.`,

  `Sekoittaako pieni kaksi kirjainta keskenään? Ei se mitään: aloitetaan rauhassa alusta, luetaan kuvan {N_PART_PL} ja järjestetään lyhyt sana uudelleen kaikessa rauhassa. Koska sanat ovat helppoja ja lyhyitä, jokainen kirjainsekoitus saa kestää oman aikansa. Tulosta tehtävä ilmaiseksi ja säilytä se — on kiva nähdä, kun kirjaimet osuvat oikeaan järjestykseen ensi kerralla.`,

  `Anna pienen jokaisen sanan jälkeen kertoa, miten hän järjesti kirjaimet: "tämä tuli ensin, sitten tämä". Kun lyhyen sanan rakentaminen kirjaimista puetaan sanoiksi, järjestys painuu paremmin mieleen, ja {N_GEN} kuvat tekevät siitä mukavaa. Ilman stressiä, vain rauhallista harjoittelua askel kerrallaan. Ja koska tehtävät ovat ilmaisia, aina voi tehdä vielä yhden helpon kirjainsekoituksen.`,

  `Lopuksi rauhassa: ottakaa yksi lyhyt sana ja järjestäkää sen sekoitetut kirjaimet yhdessä, viimeisen kerran. Näin pieni harjoittelee leikiten panemaan kirjaimet oikeaan järjestykseen ja näkemään sanan syntyvän, kun {N_PART_PL} kuva johdattaa matkalla. Muista, ettei mitään puutu — kaikki on tallella, vain sekaisin. Tehtävä on ilmainen, pelattavaksi netissä tai tulostettavaksi paperille, jotta into helppojen sanojen kokoamiseen kirjaimista kasvaa vähitellen siellä kotona.`,
];

const SKEL_NORMAL = [
  `Tällä tehtävällä pieni lukijasi ottaa askeleen eteenpäin: kirjaimet ovat sekaisin pidemmissä ja haastavammissa sanoissa. Jokaisen kuvan vieressä samat kirjaimet ovat väärässä järjestyksessä, ja lapsi järjestää ne uudelleen oikeaan järjestykseen. Koska sanoissa on useampi kirjain, järjestäminen vaatii hieman enemmän tarkkaavaisuutta — ja juuri se tekee siitä mukavan haasteen 1. luokan lapselle, joka jo osaa lyhyemmät sanat. Kuva auttaa: kun pieni näkee, mitkä {N_PL} ovat kyseessä, hän tietää, mikä sana kirjaimista pitää muodostaa. Mikään ei puutu — kaikki kirjaimet ovat tallella, ne ovat vain sekaisin. Mikään ei kiirehdi: jokainen etenee omassa tahdissaan, ilman ajanottoa ja ilman arvosanaa. Lapsi katsoo {N_PART_PL}, lukee sekoitetut kirjaimet ja kirjoittaa pidemmän sanan oikeaan järjestykseen. Tehtävä on täysin ilmainen, valmiina tulostettavaksi tai pelattavaksi netissä, kotona tai koulussa.`,

  `Tässä tehtävässä sanat ovat pidempiä ja kirjaimet sekaisin — ja juuri se tekee pulmasta jännittävämmän 1. luokan lapselle, joka kaipaa jo haastetta. Pieni katsoo kuvaa, lukee väärässä järjestyksessä olevat kirjaimet ja järjestää ne uudelleen, kunnes oikea sana syntyy. Koska kirjaimia on useampi, järjestäminen vie hetken kauemmin, mutta sitä mukavampi on lopputulos, kun pidempi sana loksahtaa oikeaan järjestykseen. Kuva näyttää aina, mistä on kyse: kun lapsi tunnistaa {N_PART_PL}, hän voi koota sanan kirjaimista. Muista, ettei mitään puutu — kaikki kirjaimet ovat siinä, ne ovat vain sekaisin. Ilman stressiä: jokainen kirjainsekoitus saa kestää juuri niin kauan kuin tarvitsee. Yhä uudelleen pieni järjestää kirjaimet ja muodostaa {N_GEN} nimet oikeaan järjestykseen. Tehtävä on ilmainen ja tulostuu hetkessä keittiön pöydälle.`,

  `Tämä tehtävä tarjoaa hieman isomman pulman: jokaisen kuvan kirjaimet ovat väärässä järjestyksessä, ja sanat ovat pidempiä kuin helpossa versiossa. Pieni järjestää sekoitetut kirjaimet uudelleen muodostaakseen sanan, ja useamman kirjaimen kanssa tehtävä vaatii vähän enemmän pohdintaa. Kuva on lapsen apuna: kun hän näkee, mitkä {N_PL} ovat kyseessä, hän tietää, mihin järjestykseen kirjaimet kuuluvat. Mitään ei tarvitse keksiä tyhjästä — sekoitetut kirjaimet ovat kaikki tallella, niitä pitää vain liikutella oikeaan järjestykseen. Mitään ei ole pakotettu, ei painetta, ei ajanottoa. Joka kohdassa pieni lukee {N_PART_PL}, järjestää pidemmän sanan kirjaimet ja kirjoittaa sanan. Näin haastavampien sanojen kokoaminen kirjaimista tulee tutuksi. Tulosta tehtävä niin monta kertaa kuin haluat, täysin ilmaiseksi.`,

  `Onko pieni jo valmis isompaan pulmaan? Tässä lapsi järjestää sekoitettuja kirjaimia oikeaan järjestykseen, mutta pidemmillä ja haastavammilla sanoilla. Jokaisen kuvan vieressä useampi kirjain on sekaisin, ja lapsi liikuttelee niitä, kunnes oikea sana syntyy. 1. luokan lapselle, joka jo osaa lyhyet sanat, tämä on kaunis seuraava askel, koska kuva näyttää aina vastauksen suunnan: kun pieni tunnistaa {N_PART_PL}, hän osaa rakentaa pidemmänkin sanan. Tärkeintä on muistaa, ettei mitään puutu — kirjaimet ovat kaikki paikalla, vain väärässä järjestyksessä. Kaikki rauhassa, ilman painetta ja lapsen omaan tahtiin. Yhä uudelleen pieni järjestää kirjaimet ja muodostaa {N_GEN} nimet oikein. Kaikki tehtävät ovat ilmaisia tulostettaviksi kotona.`,

  `Moni lapsi nauttii suuremmasta haasteesta, kun pienet sanat ovat jo hallussa — ja juuri sille tämä tehtävä on tehty. Jokaisen kuvan kirjaimet ovat sekaisin, ja sanat ovat pidempiä, useamman kirjaimen mittaisia. Pieni järjestää kirjaimet uudelleen löytääkseen oikean sanan, ja haastavammat sanat tekevät pulmasta tyydyttävän, kun se aukeaa. Kun lapsi katsoo {N_PART_PL} kuvassa, hän saa vihjeen, mihin järjestykseen kirjaimet kuuluvat. Tärkeää: mikään ei puutu — kaikki sekoitetut kirjaimet ovat siinä, ne ovat vain väärässä järjestyksessä. Kukaan ei vaadi kiirettä: vain rauha ajatella, ilman ajanottoa ja ilman arvosanaa. Joka kohdassa pieni järjestää useamman kirjaimen oikeaan järjestykseen ja kirjoittaa pidemmän sanan. Tehtävä on ilmainen ja valmiina tulostettavaksi.`,

  `Katso, mieti, järjestä — tämä on tehtävän rytmi, jossa jokaisen kuvan kirjaimet ovat sekaisin pidemmissä sanoissa. Pieni katsoo kuvaa, lukee väärässä järjestyksessä olevat kirjaimet ja järjestää ne uudelleen, kunnes sana on valmis. Koska sanat ovat haastavampia, tämä sopii 1. luokan lapsille, jotka jo kokoavat lyhyitä sanoja ja kaipaavat lisää. Kun lapsi tunnistaa, mitä {N_PART_PL} kuva esittää, useamman kirjaimen oikea järjestys löytyy helpommin. Pidä mielessä: mikään ei puutu — kaikki kirjaimet ovat tallella, vain sekaisin. Ei kiirettä: työskennellään rauhassa, omassa tahdissa. Yhä uudelleen pieni järjestää {N_GEN} kirjaimet oikeaan järjestykseen ja muodostaa pidemmän sanan. Ilmainen tulostettavaksi aina kun tekee mieli.`,

  `Silmät ja kärsivällisyys ovat parhaat apuvälineet, kun sanat kasvavat pidemmiksi, ja siksi tässä tehtävässä lapsi siirtelee useampaa kirjainta paikoilleen. Jokaisen kuvan sana on annettu kirjaimet sekaisin, ja pieni järjestää ne uudelleen oikeaan järjestykseen. Haastavammassa versiossa sanat ovat pidempiä, jotta pulma tarjoaa juuri sopivasti pohdittavaa. Kuva johdattaa lasta: kun hän näkee {N_PART_PL}, hän aavistaa, mihin järjestykseen sekoitetut kirjaimet asettuvat. Tärkeää muistaa, ettei mitään puutu — kaikki kirjaimet ovat siinä, ne ovat vain väärässä järjestyksessä, ja tehtävä on järjestää ne. Mitään painetta ei ole. Joka kohdassa pieni järjestää kirjaimet ja kirjoittaa pidemmän sanan. Vähitellen haastavienkin sanojen kokoaminen tulee tutuksi. Tulosta ilmaiseksi, kotona tai koulussa.`,

  `Pohjimmiltaan tämä tehtävä tiivistyy yhteen palkitsevaan asiaan: järjestää sekoitetut kirjaimet oikeaan järjestykseen pidemmässä sanassa. Jokaisen kuvan vieressä useampi kirjain on sekaisin, ja pieni liikuttelee niitä, kunnes oikea sana syntyy. Haastavammassa versiossa sanoissa on enemmän kirjaimia, mikä sopii 1. luokan lapselle, joka jo osaa lyhyet sanat. Kuva on aina apuna: kun lapsi tunnistaa, mitä {N_PL} ovat, hän tietää, mikä sana kirjaimista pitää muodostaa. Pidä mielessä, ettei mitään puutu — kaikki sekoitetut kirjaimet ovat tallella, niitä pitää vain järjestää. Aikaa on niin paljon kuin tarvitsee, ilman painetta ja lapsen omaan tahtiin. Yhä uudelleen pieni järjestää {N_GEN} kirjaimet ja kirjoittaa pidemmän sanan. Tehtävä on ilmainen tulostettavaksi aina kun haluat.`,
];

const P2_NORMAL = [
  `Hyvä kotivinkki pidempiin sanoihin: anna pienen sanoa ensin ääneen, mitä {N_PART_PL} kuva esittää, ja jakaa sitten sana mielessään pieniin osiin ennen kuin järjestää sekoitetut kirjaimet. Kun haastavampi sana on selvillä, useampikin kirjain asettuu vähitellen oikeaan järjestykseen. Osoita yksi kirjain kerrallaan sormella. Tehtävä on ilmainen ja tulostuu hetkessä: istahtakaa pöydän ääreen, kun tekee mieli kotona.`,

  `Onko pidempi sana vaikea? Pyydä pientä lukemaan väärässä järjestyksessä olevat kirjaimet ääneen ja etsimään ensin sanan alku. Kun ensimmäiset kirjaimet ovat oikeassa järjestyksessä, loput haastavammankin sanan kirjaimet löytävät paikkansa helpommin. Anna {N_GEN} kuvan johdattaa — se näyttää aina, mikä sana on kyseessä. Tulosta tehtävä ilmaiseksi tai pelaa netissä, jos se on teille kätevämpää, kaikessa rauhassa lapsen tahtiin.`,

  `Hyvä puoli haastavissa sanoissa on, että pieni voi aina tarkistaa itse: kun useampi kirjain on järjestetty, lukekaa pidempi sana yhdessä ja katsokaa {N_PART_PL} kuvaa — sopivatko ne yhteen? Jos ei, järjestetään kirjaimet uudelleen, ilman minkäänlaista painetta. Pidemmänkin sanan voi koota rauhassa monta kertaa. Lataa tehtävä ilmaiseksi tulostettavaksi ja jätä se pöydälle — yksi haastava kirjainsekoitus on mukava hetki päivässä.`,

  `Haluatko mennä pidemmälle haastavilla sanoilla? Kirjoittakaa kotona muutaman pidemmän sanan kirjaimet pienille lapuille, sekoittakaa ne pöydällä ja antakaa pienen järjestää ne oikeaan järjestykseen kuten tehtävän {N_PL}. Käsillä siirtely näyttää selvästi, miten useampi sekoitettu kirjain järjestyy sanaksi, kun yksikään kirjain ei ole kadonnut, vain sekaisin. Kaikki tehtävät tulostuvat ilmaiseksi niin monta kertaa kuin haluat.`,

  `Menevätkö kaksi kirjainta pidemmässä sanassa ristiin? Ei se mitään: aloitetaan rauhassa alusta, luetaan kuvan {N_PART_PL} ja järjestetään haastavampi sana uudelleen kaikessa rauhassa. Koska sanat ovat pidempiä, jokainen kirjainsekoitus saa kestää oman aikansa, ilman painetta. Tulosta tehtävä ilmaiseksi ja säilytä se — on kiva nähdä, kun useampikin kirjain osuu oikeaan järjestykseen ensi kerralla.`,

  `Anna pienen jokaisen pidemmän sanan jälkeen kertoa, miten hän järjesti kirjaimet: "ensin löysin alun, sitten loput". Kun haastavamman sanan rakentaminen kirjaimista puetaan sanoiksi, järjestys painuu paremmin mieleen, ja {N_GEN} kuvat tekevät siitä mukavaa. Ilman stressiä, vain rauhallista harjoittelua askel kerrallaan. Ja koska tehtävät ovat ilmaisia, aina voi tehdä vielä yhden haastavan kirjainsekoituksen.`,

  `Lopuksi rauhassa: ottakaa yksi pidempi sana ja järjestäkää sen sekoitetut kirjaimet yhdessä, viimeisen kerran. Näin pieni harjoittelee leikiten panemaan useammankin kirjaimen oikeaan järjestykseen ja näkemään haastavamman sanan syntyvän, kun {N_PART_PL} kuva näyttää suunnan. Muista, ettei mitään puutu — kaikki on tallella, vain sekaisin. Tehtävä on ilmainen, pelattavaksi netissä tai tulostettavaksi paperille, jotta into haastavien sanojen kokoamiseen kirjaimista kasvaa vähitellen siellä kotona.`,
];

const H1 = {
  'easy': 'Kirjainsekoitus, helpot sanat: {H1} – {GRADE}',
  'normal': 'Kirjainsekoitus, haastavammat sanat: {H1} – {GRADE}',
};

const CAR = {
  'easy': 'Kirjainsekoitus, helpot sanat – ',
  'normal': 'Kirjainsekoitus, haastavammat sanat – ',
};

module.exports = {
  type: 'word-scramble',
  eyebrow: 'Tehtävä: Kirjainsekoitus',
  strand: 'Lukemisen perustaidot',
  slotWord: 'sanat',
  level: '1-luokka',
  standard: (mk) => (mk === 'easy' ? 'L.K.2.d' : 'L.1.2.d'),
  h1: (mk, lvl) =>
    H1[mk].replace('{GRADE}', lvl === '2-luokka' ? '2. luokan oppilaille' : '1. luokan oppilaille'),
  carousel: (mk, h1Display) => (CAR[mk] || '') + h1Display,
  modes: {
    'easy': { SKEL: SKEL_EASY, P2: P2_EASY },
    'normal': { SKEL: SKEL_NORMAL, P2: P2_NORMAL },
  },
  P3: `Pitikö pieni näistä kirjainsekoituksista? Silloin tutkittavaa riittää vielä paljon yhdessä. Vilkaiskaa tehtäviä, joissa on {nb1}, jolloin pieni voi jatkaa kirjainten järjestämistä samalla rauhalla, tai kokeilkaa jotakin, jossa on {nb2}, pienen vaihtelun vuoksi. Vaihtamalla teemaa silloin tällöin pulma pysyy elävänä, ja pieni jatkaa mielellään kirjainten järjestämistä oikeaan järjestykseen — muistaen, ettei mitään puutu, vaan kirjaimet ovat vain sekaisin. Kun lapsi katsoo {N_PART_PL} ja järjestää sekoitetut kirjaimet sanaksi, koko kokoelma on täysin ilmainen: pelatkaa tehtävät netissä tai tulostakaa ja tehkää ne pöydän ääressä kotona. Rauhaa ja aikaa on niin paljon kuin tarvitsee, ilman painetta ja lapsen omaan tahtiin. Näin pieni rakentaa askel askeleelta varmuuden sanojen muodostamiseen kirjaimista.`,
};
