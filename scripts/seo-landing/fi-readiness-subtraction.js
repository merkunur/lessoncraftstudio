/**
 * fi-readiness-subtraction.js — suomenkielinen (fi) laskeutumissivun teksti vähennyslaskutehtävälle.
 *
 * Tehtävä (Vähennyslasku): kuviin perustuva pois ottaminen. STANDARD-BEARING fi 1. luokalle.
 * `level` JA `standard` JÄTETÄÄN POIS module.exportsista — ne tulevat koordinaatin annotaatiosta.
 * Teksti on lukualue-agnostinen: lukualue elää SERP-otsikossa, ei tekstissä (EI "kymmeneen asti",
 * EI numeroita tekstissä). Teksti kertoo TOIMINNASTA: yliviivataan, otetaan pois, lasketaan jäljelle jäänyt.
 *
 *   cross-out       — YLIVIIVAA JA LASKE: lapsi yliviivaa pois lähtevät kuvat ja laskee, kuinka monta JÄÄ.
 *                     Omistaa: yliviivaa / ota pois / kuinka monta jää / kuinka monta on jäljellä.
 *   image-number    — KUVA MIINUS LUKU: kuvajoukosta otetaan pois kirjoitettu luku — silta
 *                     konkreettisesta (ota pois) kirjoitettuun miinus-merkkiin (−).
 *   find-subtrahend — PUUTTUVA VÄHENNETTÄVÄ: "… − ? = …"; tulos tiedetään, vähennettävä puuttuu;
 *                     lapsi etsii MIKÄ LUKU OTETTIIN POIS. Omistaa: mikä luku otettiin pois /
 *                     kuinka monta vähennettiin / paljonko otettiin pois, jotta jäljelle jäi.
 *   mixed           — VÄHENNYSLASKUA SEKAISIN: tilojen vuorottelu, tuore katse joka laskuun.
 *
 * ⚠️ #1 FENCE — operaatio-tosi (vähennyslasku, EI yhteenlasku). OPERAATIO kantaa JOKAISEN lauseen.
 *   Vähennyslasku OMISTAA: jotakin OTETAAN POIS / määrä PIENENEE — vähennä / vähennyslasku /
 *   ota pois / yliviivaa / kuinka monta jää / kuinka monta on jäljellä / jäljelle jää / miinus /
 *   miinus-merkki / −. KIELLETYT (kuuluvat yhteenlaskuun): laske yhteen / yhteenlasku / yhteensä /
 *   kuinka monta yhteensä / lisää / plus / plus-merkki / +. EI yhtään "laske vastaus" -täytettä.
 *
 * Käytössä olevat paikkamerkit ja niiden sijat:
 *   {H1}        nominatiivin monikko, isolla (otsikko/karuselli/sivun H1)
 *   {N_PL}      nominatiivin monikko, pienellä — SUBJEKTI ("{N_PL} ovat sivulla")
 *   {N_PART_PL} partitiivin monikko, pienellä — OBJEKTI ("yliviivaa {N_PART_PL}", "vähennä {N_PART_PL}")
 *   {N_PART_SG} partitiivin yksikkö, pienellä — laskukysymys ("kuinka monta {N_PART_SG} jää?")
 *   {N_GEN}     genetiivin monikko, pienellä — "{N_GEN} kuvat" = X:n kuvat
 *
 * Mitään teeman substantiivia ei kirjoiteta kovakoodattuna. Ei numeroita. [NSR-FLAG][fi] §17.5.1.
 */
'use strict';

// ── cross-out: YLIVIIVAA JA LASKE ────────────────────────────────────────────
const SKEL_CO = [
  `Tässä tehtävässä pois ottamisesta tulee jotakin, jonka lapsi voi nähdä ja tehdä ihan omin käsin. Joka laskussa sivulla on joukko kuvia, joissa on {N_PL}, ja osa niistä lähtee pois: lapsi yliviivaa pienellä viivalla ne, jotka otetaan pois, ja laskee sitten rauhassa, kuinka monta jää. Yliviivattu kuva ei enää kuulu joukkoon — ja juuri siinä lapsi tuntee, mitä pois ottaminen tarkoittaa. Ensimmäiselle luokalle tämä on rauhallisin tapa astua vähennyslaskuun, sillä joka laskusta tulee pieni tarina: otetaan pois muutama, ja loput jäävät jäljelle. Yliviivaa ensimmäinen joukko ja laske ääneen, kuinka monta on jäljellä, niin leikki on jo alkanut. Mukana ei ole ajanottoa eikä pisteitä; lapsi yliviivaa, laskee jäljelle jääneet ja kirjoittaa luvun omassa tahdissaan, kaikessa rauhassa. Voit istua aivan vierellä ja kysellä lempeästi, mikä lähti pois ja mikä jäi.`,

  `Kuvittele, että kolme niistä otetaan pois — kuinka monta sitten jää? Tämä kysymys vie jokaista tämän tehtävän vähennyslaskua eteenpäin. Lapsi näkee joukon kuvia, joissa on {N_PL}, yliviivaa ne, jotka lähtevät pois, ja laskee ne, jotka jäivät ilman viivaa. Yliviivaaminen on helppo ymmärtää: mikä on yliviivattu, on otettu pois eikä kuulu enää joukkoon. Juuri siksi tämä tapa sopii niin hyvin ensimmäiselle luokalle, jossa vähennyslasku on vielä uutta — lapsen ei tarvitse kuvitella mitään, hän näkee kaiken sivulla. Jäljelle jäänyt määrä kirjoitetaan vastaukseksi, ja sitten seuraava lasku odottaa. Ei pisteitä, ei mitään, mikä hoputtaisi: pieni yliviivaa ja tarkistaa, kuinka monta on jäljellä, kaikessa rauhassa ja juuri niin kauan kuin haluaa.`,

  `Joskus asioita otetaan pois — ja juuri siitä vähennyslasku kertoo. Sivulla on piirrettyinä {N_PL}, ja joka laskussa osa täytyy ottaa pois kynänviivalla. Lapsi yliviivaa ne yksi kerrallaan ja näkee määrän pienenevän aivan silmiensä edessä. Sitten lasketaan, kuinka monta jää: kuinka monta {N_PART_SG} jäi ilman viivaa? Se luku on vastaus. Näin vähennyslasku ei ole koskaan abstrakti sääntö vaan jotakin, jonka lapsi tekee itse omalla kynällään. Ensimmäisellä luokalla tämä on lämmin alku, sillä silmät ja käsi auttavat ajatusta ymmärtämään, mikä katosi. Ei ajanottoa eikä pisteitä — vain viivoja, jäljelle jäävä määrä ja vastaus, joka osuu kohdalleen, lapsen omassa tahdissa.`,

  `Yliviivaa — ja katso, kuinka monta jää. Tässä tehtävässä lapsi ratkaisee vähennyslaskuja ottamalla itse pois sen, mikä lähtee: hän yliviivaa {N_PART_PL}, jotka otetaan pois, ja laskee sitten, kuinka monta jäi. Jokainen yliviivattu kuva on pieni, näkyvä hyvästi, ja juuri se tekee laskusta helpon ymmärtää. Aluksi niitä oli monta, sitten otimme muutaman pois, ja nyt loput jäävät jäljelle — näin jokainen vähennyslasku kertoo oman pienen tarinansa. Lapsi kirjoittaa jäljelle jääneen luvun vastaukseksi ja siirtyy seuraavaan laskuun. Ensimmäiselle luokalle tämä on konkreettisin tapa oppia ottamaan pois. Ei pisteitä, ei ajanottoa; vain viivoja, rauhallinen laskeminen ja kaikki aika maailmassa tarkistaa vielä kerran.`,

  `Millainen vähennyslasku on, ennen kuin sen osaa tehdä päässä? Tällainen: lapsi näkee rivin kuvia, joissa on {N_PL}, päättelee kuinka monta lähtee pois ja yliviivaa juuri sen verran. Sitten hän laskee jäljelle jääneet ja kirjoittaa, kuinka monta jää, vastaukseksi. Tämä järjestys — ensin otetaan pois, sitten lasketaan jäljelle jäänyt — on vähennyslaskun sydän, ja täällä lapsi harjoittaa sitä kädellä, ei vain ajatuksella. Yliviivattu kuva on otettu pois; jäljelle jäänyt kuuluu yhä joukkoon. Istu aivan vierellä ja anna lapsen kertoa, mikä matkan varrella katosi. Ei pisteitä eikä ajanottoa, joten jokainen vähennyslasku saa kestää juuri sen ajan, jonka se tarvitsee tullakseen ymmärretyksi.`,

  `Lasku voi aivan hyvin alkaa kuvana. Näissä vähennyslaskuissa lapsi kohtaa sivulla siististi aseteltuja {N_PART_PL} — kunnes osa täytyy ottaa pois. Lapsi yliviivaa ne ja elää aivan läheltä, kuinka määrä pienenee. Loput jäävät jäljelle, ja ne lasketaan rauhassa ennen vastauksen kirjoittamista. Tämä näkyvä muutos, monesta harvaan, tekee vähennyslaskusta heti ymmärrettävän ensimmäisen luokan lapselle. Ja koska tehtävä ei pyydä pitkiä selityksiä, pieni työskentelee pian aivan itse. Ei ajanottoa eikä pisteitä sivulla — vain {N_PL}, viivoja ja luvut, jotka osuvat kohdalleen. Näin kasvaa aito ensimmäinen ymmärrys siitä, mitä pois ottaminen on, hiljalleen ja varmasti, viiva viivalta.`,

  `Kuinka monta jää, kun osa on otettu pois? Pieni oppii pian vastaamaan tähän kysymykseen aidolla vähennyslaskulla. Tehtävä näyttää {N_PART_PL}, ja joka laskussa tietty määrä täytyy ottaa pois: lapsi yliviivaa ne ja laskee, kuinka monta jäi ilman viivaa. Jäljelle jäänyt on vastaus — katso, kuinka yksinkertaisesti sivu kertoo, mitä pois ottaminen tarkoittaa. Koska lapsi tekee viivat itse, hän tuntee, että vähennyslasku on jotakin, mitä tehdään, ei vain jotakin, mitä kirjoitetaan. Tämä sopii hyvin ensimmäiselle luokalle, jossa laskun täytyy yhä olla nähtävissä ja melkein kosketettavissa. Ei ajanottoa eikä pisteitä; vain lapsi, kynä ja vähennyslaskut, jotka käyvät joka kerralla rauhallisemmiksi.`,

  `Pohjimmiltaan jokainen vähennyslasku kertoo jäljelle jääneestä — ja tässä tehtävässä lapsi voi nähdä sen. Ensin hän laskee, kuinka monta {N_PART_SG} sivulla on. Sitten hän yliviivaa ne, jotka otetaan pois, tukevin viivoin, jottei kenellekään jää epäselväksi, mikä katosi. Ja lopuksi hän laskee, kuinka monta jää, ja kirjoittaa luvun vastaukseksi. Nämä ovat kolme askelta, jotka käsi muistaa paremmin kuin mikään selitys ja jotka tekevät vähennyslaskusta liikkeen, eivät sääntöä. Näin ensimmäisen luokan lapsi rakentaa pois ottamisesta ymmärryksen, joka kestää, kun luvut myöhemmin kasvavat. Matkan varrella ei ole pisteitä juostavaksi eikä aikaa, joka hoputtaisi; pieni saa yliviivata, laskea uudelleen ja korjata, kunnes jäljelle jäänyt osuu kohdalleen.`,
];

const P2_CO = [
  `Hyvä vinkki kotiin: anna lapsen laskea kaikki {N_PART_PL} ääneen ennen viivojen vetämistä. Kun hän sitten laskee vain ne, jotka jäivät ilman viivaa, vähennyslaskun toiminta tulee selväksi. Tarkistakaa lopuksi yhdessä, kuinka monta jää. Tehtävän voi pelata ilmaiseksi selaimessa tai tulostaa keittiön pöydälle — ilman ajanottoa ja pisteitä, lapsen omassa tahdissa.`,

  `Jos lapsi epäröi, näytä yliviivattua kuvaa ja sano: tämä otettiin pois. Ne {N_PART_PL}, jotka jäivät ilman viivaa, laskette myöhemmin yhdessä. Näin pieni tuntee, että pois ottaminen tarkoittaa yliviivaamista ja jäljelle jääneen laskemista — rauhassa ja ilman painetta. Tehtävä on valmiina ja ilmainen: tulosta se, tai ratkaise suoraan ruudulla.`,

  `Yliviivaamisessa on se kaunis puoli, että aina voi tarkistaa: jos jäljelle jäänyt ei osu kohdalleen, lasketaan vapaat {N_PART_PL} yksinkertaisesti vielä kerran. Ei pisteitä eikä ajanottoa — vain rauha yrittää uudelleen, kunnes onnistuu. Voit ottaa tehtävän maksutta ja tulostaa sen, tai antaa lapsen ratkaista sen netissä silloin, kun se sinulle parhaiten sopii.`,

  `Laajenna tätä kotona vapaasti: aseta pöydälle muutama pieni esine ja anna lapsen siirtää kaksi tai kolme syrjään, samalla tavalla kuin hän yliviivaa {N_PART_PL} tehtävässä. Tämä ele — jotakin otetaan pois, loput jäävät — näyttää juuri sen, mitä vähentäminen tarkoittaa, ilman minkäänlaista aikapainetta. Sitten tehtävä odottaa valmiina tulostettavaksi tai pelattavaksi netissä, ilmaiseksi.`,

  `Jos viivoja tulee liikaa, ei se mitään. Laskekaa {N_PART_PL} alusta uudelleen ja yliviivatkaa oikea määrä rauhassa. Jokainen vähennyslasku saa kestää tarvitsemansa ajan — mukana ei ole aikaa eikä pisteitä noudatettavana. Tehtävä ei maksa mitään: pelaa ruudulla, tai tulosta se rauhalliseen hetkeen pöydän ääreen.`,

  `Anna lapsen kertoa jokaisen laskun jälkeen, kuinka vastaus syntyi: niitä oli viisi, otimme pois kaksi, jäljelle jäi kolme. Yliviivattujen {N_GEN} pukeminen sanoiksi tekee laskusta varmemman, eikä sen tarvitse olla nopeaa tai täydellistä. Tehtävä on ilmainen — tulosta se, tai ratkaise netissä, kumpi teille parhaiten sopii.`,

  `Mukava lopetus: anna lapsen laskea vähennyslaskussa erikseen yliviivatut {N_PART_PL} ja erikseen jäljelle jääneet. Näin tulee mustaa valkoisella kirjoitetuksi, että alkumäärä miinus pois otettu antaa jäljelle jääneen. Tehtävän voi käyttää yhä uudelleen: tulosta kotona, tai pelaa netissä — ilmaiseksi, ilman aikaa ja pisteitä, omassa tahdissa.`,
];

// ── image-number: KUVA MIINUS LUKU ───────────────────────────────────────────
const SKEL_IN = [
  `Tämä tehtävä rakentaa sillan kuvien ja merkkien välille: joka laskussa on joukko kuvia, joissa on {N_PL}, ja siitä otetaan pois kirjoitettu luku. Lapsi laskee ensin, kuinka monta kuvaa on, lukee sitten pois otettavan luvun ja päättelee lopuksi, kuinka monta jää, ja kirjoittaa vastauksen. Tämä on ensimmäisten kouluvuosien herkin siirtymä: yhdistää asioiden konkreettinen maailma lukujen kieleen. Kun lapsi työskentelee {N_GEN} kuvien parissa, hän lähtee siitä, minkä näkee, ja pääsee vähitellen lukumerkkiin. Tämä side kuvan ja merkin välillä tekee vähennyslaskusta ymmärrettävän, ei koskaan mekaanisen — miinus-merkki alkaa kertoa yksinkertaisesti, että jotakin on otettu pois. Ei ajanottoa, ei pisteitä: vain ilo laskea ja löytää jäljelle jäävä luku rauhassa. Tehtävä on ilmainen ja valmiina tulostettavaksi, mainio kouluun tai rauhalliseen hetkeen kotona.`,

  `Kuvista lukuihin: tämä tehtävä auttaa lasta ottamaan ison harppauksen. Joka laskussa on joukko kuvia, joissa on {N_PL}, ja siitä otetaan pois kirjoitettu luku. Lapsi laskee kuvat, lukee pois vähennettävän lukumerkin ja päättelee, kuinka monta jää. Tämä tehtävä yhdistää silmän ja ajatuksen, sillä se lähtee jostakin näkyvästä ja pääsee merkkiin. {N_GEN} kuvien parissa työskentely tekee luvuista tuttuja ja ystävällisiä, ja se auttaa ottamaan pois varmasti. Näin lapsi oppii, että kirjoitettu lukumerkki kuvaa juuri sitä määrää asioita, joka viedään pois. Täällä kukaan ei mittaa nopeutta: ei aikaa noudatettavana eikä pisteitä, vain rauhallinen ilo laskea askel askeleelta, kuinka monta on jäljellä. Tehtävä on ilmainen ja tulostuu hetkessä, mainio luokkaan tai kotiin.`,

  `Tämä tehtävä yhdistää kuvan ja lukumerkin luontevasti: lähdetään joukosta kuvia, joissa on {N_PL}, ja otetaan pois kirjoitettu luku. Lapsi laskee kuvat, lukee pois vähennettävän lukumerkin ja päättelee, kuinka monta jää. Tämä on tärkeä silta, sillä se totuttaa pienen kääntämään näkemänsä lukujen kielelle. Kun lapsi laskee {N_PART_PL} ja ottaa sitten pois lukumerkin osoittaman määrän, hän ymmärtää, että merkki on vain oikotie sanoa "kuinka monta". Tämä yhteys tekee vähennyslaskusta selkeän ja mielekkään, ei koskaan mekaanisen. Mukana ei ole aikaa, pisteitä tai tähtiä juoksemassa: tehtävä on rauhallinen ja kunnioittaa kunkin omaa tahtia. Tehtävä on ilmainen ja valmiina tulostettavaksi, mainio kouluun ja kotiin, aina konkreettisesta lähtien.`,

  `Oppia ottamaan pois siirtymällä kuvista merkkeihin: tämä on tehtävän ajatus. Joka lasku näyttää joukon kuvia, joissa on {N_PL}, ja siitä vähennetään kirjoitettu luku; lapsi laskee kuvat, lukee pois otettavan luvun ja päättelee, kuinka monta jää. Tämä tehtävä arvostaa katsetta ja esittelee lempeästi lukujen kielen. Kun {N_PART_PL} ovat edessä, pieni lähtee jostakin konkreettisesta ja pääsee merkkiin ilman jyrkkiä hyppyjä. Tämä tasapaino kuvan ja lukumerkin välillä tekee laskusta aidosti ymmärrettävän ensimmäisinä kouluviikkoina. Ei kiirettä: ei aikaa, ei pisteitä, vain tilaa laskea ja päätellä rauhassa, kuinka monta on jäljellä. Tehtävä on ilmainen ja tulostuu heti, niin luokkaan kuin kotiin.`,

  `Tämä tehtävä yhdistää näkemisen ja laskemisen: katsotaan joukkoa kuvia, joissa on {N_PL}, ja otetaan pois kirjoitettu luku. Lapsi laskee kuvat, lukee pois vähennettävän lukumerkin ja kirjoittaa, kuinka monta jää. Tämä on hetki, jolloin konkreettiset määrät alkavat puhua lukujen kieltä, ja se on yksi ensimmäisen luokan tärkeimmistä askelista. {N_GEN} kuvien parissa työskentely pitää kaiken lähellä kokemusta, kun taas pois otettava luku esittelee vähitellen abstraktion. Näin lapsi ymmärtää, että jokaisen luvun takana on aito määrä. Täällä ei mitata nopeutta: ei aikaa, ei kilpailua, vain rauhallinen hetki laskea huolella, kuinka monta jää. Tehtävä on ilmainen ja valmiina tulostettavaksi muutamassa sekunnissa, mainio kouluun tai rauhalliseen iltapäivään kotona.`,

  `Konkreettisesta abstraktiin hymyillen: tämä tehtävä tuo kuvia, joissa on {N_PL}, ja niistä otetaan pois kirjoitettu luku. Lapsi laskee kuvat, lukee pois vähennettävän lukumerkin ja päättelee, kuinka monta jää. Tämä on arvokas harjoitus, sillä se yhdistää kaksi maailmaa: asioiden näkyvän ja lukujen merkkikielisen. Kun {N_PART_PL} ovat edessä, pieni lähtee siitä, minkä tunnistaa, ja pääsee lukumerkkiin luontevasti ymmärtäen, että luvun pois ottaminen tarkoittaa juuri sen määrän viemistä. Tämä yhteys tekee vähennyslaskusta selkeän eikä koskaan mekaanisen. Ei pisteitä eikä aikaa juostavaksi: tehtävä on rauhallinen ja lämmin, ja erehdykset ovat vain oppimisen vaiheita. Tehtävä on ilmainen ja tulostuu hetkessä, kouluun ja kotiin.`,

  `Tämä tehtävä saattaa lasta yhdellä ensimmäisten kouluvuosien herkimmistä askelista: ottaa pois kirjoitettu luku joukosta kuvia, joissa on {N_PL}. Pieni laskee kuvat, lukee pois otettavan lukumerkin ja päättelee, kuinka monta jää. Kuvien näkeminen ja sitten kirjoitetun luvun käsittely luo luontevan sillan konkreettisen ja abstraktin välille. {N_GEN} kuvien kanssa lasku pysyy ystävällisenä ja lähellä kokemusta, kun taas lukumerkki esittelee lempeästi matemaattisen kielen. Lapsi oppii, että luvut kertovat aitoja määriä. Ei aikaa eikä pisteitä: vain ilo laskea ja löytää, kuinka monta jää, rauhassa. Tarvitaan vain kynä ja vähän rauhaa, ja siitä tulee löytämisen hetki.`,

  `Laske kuvat, lue lukumerkki, etsi jäljelle jäänyt: tämä tehtävä yhdistää yhdessä eleessä konkreettisen ja merkkikielisen. Joka laskussa on joukko kuvia, joissa on {N_PL}, ja siitä otetaan pois kirjoitettu luku, ja lapsi päättelee, kuinka monta jää. Tämä on ihanteellinen silta sille, joka opettelee käsittelemään lukuja, sillä se lähtee näkyvästä ja pääsee lukumerkkiin. {N_GEN} kuvien parissa työskentely pitää kaiken tuttuna ja rauhoittavana, kun taas kirjoitetun määrän pois ottaminen avaa aidon laskun oven. Täällä ei rikota ennätyksiä: ei aikaa, ei sijoituksia, vain seesteisyys, joka tarvitaan päättelyyn. Tehtävä on ilmainen ja tulostuu hetkessä, mainio kouluun ja kotiin, matkalla kuvasta merkkiin.`,
];

const P2_IN = [
  `Näissä laskuissa lähdetään joukosta kuvia, joissa on {N_PL}, ja otetaan pois kirjoitettu luku. Lapsi laskee kuvat, lukee pois vähennettävän lukumerkin ja etsii, kuinka monta jää. Tämä on silta konkreettisen ja merkin välillä, arvokas ensimmäisinä kouluviikkoina. {N_GEN} kuvien kanssa tehtävä pysyy ystävällisenä ja ensimmäisen luokan kokoisena.`,

  `Tehtävän ratkaisemiseksi lapsi laskee kuvat, joissa on {N_PL}, lukee pois otettavan luvun ja päättelee, kuinka monta jää. Näin kuvista tulee lukumerkkejä luontevasti. {N_GEN} kuvien parissa lasku pysyy konkreettisena. Ei aikaa eikä pisteitä: vain rauhallinen ilo laskea ja päätellä omin käsin, kuinka monta on jäljellä.`,

  `Tämä lasku yhdistää sen, minkä näkee, siihen, mikä kirjoitetaan. Joukon kuvia, joissa on {N_PL}, edessä lapsi laskee, ottaa pois osoitetun luvun ja päättelee, kuinka monta jää. {N_GEN} kuvien kanssa lasku pysyy lähellä kokemusta. Tehtävä on mainio ensimmäiselle luokalle, ja kun aikaa ei tarvitse noudattaa, se pysyy aidosti rauhallisena.`,

  `Kuvista merkkiin lempeästi: lapsi laskee kuvat, joissa on {N_PL}, lukee pois vähennettävän lukumerkin ja etsii jäljelle jääneen. Tämä on ensimmäisten vuosien avainaskel, sillä se totuttaa kääntämään konkreettisen luvuiksi. {N_GEN} kuvien kanssa lasku on selkeä ja ystävällinen. Tulosta ilmaiseksi ja tarjoa rauhassa, ilman minkäänlaista kiirettä.`,

  `Tehtävän käyttäminen vaatii vain katsomista ja laskemista: lapsi näkee kuvat, joissa on {N_PL}, ottaa pois kirjoitetun luvun ja päättelee, kuinka monta jää. Kuvat tekevät lukumerkistä konkreettisen, ja {N_GEN} kuvien käsittely antaa varmuutta. Ei pisteitä eikä aikaa: vain rauhallinen hetki laskea askel kerrallaan.`,

  `Lasku, joka yhdistää silmän ja ajatuksen: lasketaan joukko kuvia, joissa on {N_PL}, luetaan pois otettava luku ja etsitään, kuinka monta jää. Näin lapsi huomaa, että jokaisen lukumerkin takana on aito määrä. {N_GEN} kuvien kanssa työ pysyy konkreettisena, ja tehtävästä tulee ensimmäisten laskujen kokoinen. Kaunis ilmainen tehtävä, valmiina tulostettavaksi.`,

  `Tämä lasku saattaa lasta kuvasta merkkiin. Laske kuvat, joissa on {N_PL}, lue pois vähennettävä luku, kirjoita kuinka monta jää: kolme yksinkertaista ja kasvattavaa askelta. {N_GEN} kuvien parissa työskentely pitää kaiken tyynenä ja ensimmäisen luokan ulottuvilla. Ei kilpailua eikä aikaa noudatettavana, vain rauhallinen ilo laskea ja kasvaa matematiikassa.`,
];

// ── find-subtrahend: PUUTTUVA VÄHENNETTÄVÄ ───────────────────────────────────
const SKEL_FS = [
  `Tämä tehtävä kutsuu lasta ajattelemaan takaperin: nämä ovat vähennyslaskuja, joissa täytyy etsiä mikä luku otettiin pois, eli päätellä, kuinka monta lähti matkan varrella. Pieni tietää, kuinka monta oli alussa ja kuinka monta jäi lopussa, ja hänen täytyy ymmärtää, kuinka monta vietiin välissä. Tämä on ylösalaisin ajattelun harjoitus, mainio vahvistamaan vähennyslaskun syvää merkitystä. Kuvien, joissa on {N_PL}, avulla lapsi voi laskea, vertailla ja kuvitella, mitä tapahtui. Kun kysytään "paljonko otettiin pois, jotta jäljelle jäi", lapsen mieli oppii kulkemaan molempiin suuntiin, kuten luvut tekevät. Ei aikaa eikä pisteitä: vain ilo tutkia rauhassa ja löytää puuttuva osa. Tehtävä on ilmainen ja valmiina tulostettavaksi, mainio luokkaan tai rauhalliseen hetkeen kotona.`,

  `Sen löytäminen, mikä luku puuttuu, on takaperin ajattelua, ja tämä tehtävä tarjoaa sitä lempeästi ja konkreettisesti. Lapsi tietää, kuinka monta oli alussa ja kuinka monta jäi jäljelle, ja hänen tehtävänsä on päätellä, kuinka monta vähennettiin. Kuvia, joissa on {N_PL}, katsoen hän voi laskea silmillään ja päätellä, mikä muuttui. Tämä tehtävä vahvistaa pois ottamisen ja jäljelle jääneen välistä yhteyttä, sillä puuttuvan osan löytämiseksi lasketaan usein jäljelle jääneestä alkuun. {N_GEN} kuvien parissa työskentely pitää kaiken lähellä lapsen kokemusta ja tekee päättelystä luontevampaa. Täällä kukaan ei mittaa nopeutta: ei kilpailua, arvosanoja tai tähtiä, vain tilaa ajatella seesteisesti. Tehtävä tulostuu ilmaiseksi hetkessä ja sopii kouluun tai kotiin.`,

  `Pieni matemaattinen tutkimus: tässä tehtävässä lapsen täytyy etsiä mikä luku otettiin pois, eli ymmärtää, kuinka monta lähti pois. Hän tuntee alkumäärän ja loppumäärän, ja välissä on arvoitus ratkaistavana. Kuvia, joissa on {N_PL}, katsoen hän voi laskea, vertailla ja koota uudelleen sen, mitä tapahtui. Tällainen päättely, joka kulkee tuloksesta laskuun, auttaa ymmärtämään vähennyslaskua syvällisesti eikä vain automaattisena eleenä. Takaperin ajattelu harjoittaa mielen joustavuutta ja on yksi rikkaimmista tavoista rakentaa lukukäsitettä. Ei aikaa eikä pisteytystä: lapsi etenee rauhassa ja erehdyksistä tulee tilaisuus yrittää uudelleen. Tehtävä on ilmainen ja valmiina tulostettavaksi.`,

  `Tämä tehtävä tuo vähennyslaskuja erityisellä haasteella: etsiä mikä luku otettiin pois, eli päätellä, kuinka monta lähti pois. Lapsi näkee, kuinka monta oli ja kuinka monta jäi jäljelle, ja hänen täytyy päätellä pois viety osa. Tämä on takaperin ajattelun harjoitus, arvokas siksi, että se näyttää, kuinka vähennyslaskua voi lukea myös lopusta lähtien. Kuvien, joissa on {N_PL}, avulla pieni laskee ja päättelee kuvitellen, mitä tapahtui. Usein vastauksen löytämiseksi hän laskee pienemmästä luvusta suurempaan: näin pois ottamisen ja jäljelle jääneen välinen yhteys tuntuu luontevalta. Ei aikaa noudatettavana eikä pisteitä tavoiteltavana: tehtävä on seesteinen ja kunnioittaa kunkin omaa tahtia. Tehtävä on ilmainen ja tulostuu heti, mainio kouluun ja kotiin.`,

  `Takaperin ajattelu on arvokas taito, ja tämä tehtävä vaalii sitä lempeästi. Lapsi tuntee alkumäärän ja jäljelle jäävän määrän, ja hänen täytyy etsiä puuttuva luku: kuinka monta otettiin pois? Kuvia, joissa on {N_PL}, katsoen hän laskee ja vertailee, kooten uudelleen sen, mitä tapahtui. Tämä harjoitus auttaa ymmärtämään, ettei vähennyslasku ole yksisuuntainen vaan sitä voi tutkia myös takaperin, tuloksesta lähtien. Se on mainio tapa vahvistaa lukukäsitettä ja varmuutta laskuissa. Täällä ei rikota ennätyksiä: ei aikaa, ei sijoituksia, vain se aika, joka tarvitaan päättelyyn rauhassa. Tehtävä on ensimmäisen luokan kokoinen, myös ensiaskelten ottajalle. Tehtävä on ilmainen ja valmiina tulostettavaksi muutamassa sekunnissa.`,

  `Tässä tehtävässä lapsi pukeutuu lukujen salapoliisiksi: hänen täytyy etsiä mikä luku otettiin pois, eli ymmärtää, kuinka monta lähti pois. Hän tietää, kuinka monta oli alussa ja kuinka monta jäi jäljelle, ja puuttuva pala on juuri se, mikä vietiin. Kuvien, joissa on {N_PL}, avulla hän voi laskea silmillään ja kuvitella pois ottamisen. Näin päätteleminen, lopusta alkuun, harjoittaa joustavaa ajattelutapaa, joka on monien tulevien laskujen pohjalla. Ei pisteitä eikä aikaa juostavaksi: tehtävä on rauhallinen ja lämmin, ja erehdykset ovat vain matkan vaiheita. Tehtävä on ensimmäisen luokan lapsille mainio. Se on ilmainen ja tulostuu hetkessä, kouluun ja kotiin. Puuttuvan osan löytäminen tuo aina hymyn.`,

  `Tehtävä, joka kutsuu päättelemään uteliaasti: nämä vähennyslaskut pyytävät etsimään mikä luku otettiin pois, eli kuinka monta lähti pois. Lapsi lähtee alku- ja loppumäärästä, ja hänen täytyy löytää pois viety osa. Kuvia, joissa on {N_PL}, katsoen hän laskee, vertailee ja kokoaa uudelleen sen, mitä tapahtui. Tämä takaperin ajattelu on yksi kasvattavimmista tavoista vakiinnuttaa vähennyslasku, sillä se pakottaa näkemään laskun monelta kannalta. Usein lapsi laskee eteenpäin täyttääkseen kahden luvun välimatkan, löytäen pois ottamisen ja jäljelle jääneen syvän yhteyden. Ei kilpailua, arvosanoja tai aikaa: vain seesteinen päättelyn hetki. Tehtävä on ajateltu ensimmäiselle luokalle ja ensiaskelten ottajalle. Se on ilmainen ja valmiina tulostettavaksi.`,

  `Puuttuvan löytäminen on yksi matematiikan kauneimmista haasteista, ja tämä tehtävä tarjoaa sen helposti lähestyttävänä. Lapsi tuntee, kuinka monta oli ja kuinka monta jäi jäljelle, ja hänen täytyy päätellä, kuinka monta vähennettiin: piiloon jäänyt luku. Kuvien, joissa on {N_PL}, avulla hän voi laskea ja kuvitella, mitä tapahtui, tehden konkreettiseksi päättelyn, joka muuten olisi abstrakti. Tämä takaperin tehtävä auttaa pientä ymmärtämään, että jokainen vähennyslasku kätkee enemmän tietoa kuin näyttää, ja totuttaa liikkumaan ketterästi lukujen välillä. Mukana ei ole minkäänlaista painetta: ei aikaa noudatettavana, ei pisteitä, vain rauha, joka tarvitaan ajatteluun. Tehtävä on ensimmäisen luokan lasten kokoinen. Se on ilmainen ja tulostuu hetkessä, mainio kouluun ja kotiin.`,
];

const P2_FS = [
  `Tässä tehtävä on etsiä mikä luku otettiin pois: lapsi tietää, kuinka monta oli ja kuinka monta jäi jäljelle, ja hänen täytyy päätellä, kuinka monta lähti pois. Kuvia, joissa on {N_PL}, katsoen hän voi laskea ja päätellä, mitä tapahtui. Tämä on takaperin ajattelua, rauhallista ja kiireetöntä, ensimmäisen luokan kokoista.`,

  `Näiden harjoitusten ratkaisemiseksi lapsi ajattelee takaperin: alkumäärästä loppumäärään hän päättelee, kuinka monta otettiin pois. Kuvat, joissa on {N_PL}, auttavat laskemaan silmillä ja kuvittelemaan pois ottamisen. Ei aikaa eikä arvosanoja: vain ilo tutkia seesteisesti. Jokainen lapsi etenee omassa tahdissaan, ja jokainen erehdys on yksinkertaisesti tilaisuus yrittää rauhassa uudelleen.`,

  `Puuttuvan osan löytäminen on pieni tutkimus. Lapsi tuntee, kuinka monta jäi jäljelle ja kuinka monta oli alussa, ja hänen täytyy ymmärtää, kuinka monta otettiin pois. Kuvien, joissa on {N_PL}, ja {N_GEN} kuvien kanssa päättely pysyy konkreettisena. Tehtävä on ensimmäiselle luokalle mainio, ja kun aikaa ei tarvitse noudattaa, se pysyy aidosti rauhallisena.`,

  `Tämä harjoitus kääntää vähennyslaskun nurinpäin: tuloksen sijaan etsitään, kuinka monta otettiin pois. Kuvia, joissa on {N_PL}, katsoen lapsi laskee ja vertailee, mitä tapahtui, usein laskien eteenpäin täyttääkseen välimatkan. Tämä on arvokas tapa yhdistää pois ottaminen ja jäljelle jäänyt, ilman minkäänlaista aikapainetta. Pieni ajattelun harjoitus, seesteinen ja ensimmäisen luokan kokoinen.`,

  `Lapsesta tulee pieni salapoliisi: hän tietää, kuinka monta oli ja kuinka monta jäi jäljelle, ja hänen täytyy etsiä puuttuva luku. Kuvat, joissa on {N_PL}, antavat laskea ja kuvitella pois ottamisen. Takaperin ajattelu harjoittaa mieltä ja vakiinnuttaa vähennyslaskun. Ei pisteitä, vain ensimmäisen luokan kokoinen ja rauhallinen tehtävä.`,

  `Tehtävän käyttämiseksi lapsi katsoo, kuinka monta jäi jäljelle, muistaa, kuinka monta oli, ja päättelee, kuinka monta otettiin pois. Kuvat, joissa on {N_PL}, ja {N_GEN} kuvat pitävät päättelyn ankkuroituna konkreettiseen. Ei mitään aikaa: vain seesteinen hetki ajatella. Tämä on mainio harjoitus sille, joka vakiinnuttaa ensiaskeliaan ensimmäisellä luokalla.`,

  `Puuttuvan luvun löytäminen on päättelyä lopusta alkuun. Lapsi laskee jäljelle jääneet kuvat, joissa on {N_PL}, vertaa alkumäärään ja ymmärtää, kuinka monta otettiin pois. Tämä on joustavaa ja kasvattavaa ajattelua, tarjottuna rauhassa ja ilman kilpailua. Se on ensimmäisen luokan lapsille mainio. Tulosta ilmaiseksi milloin haluat.`,
];

// ── mixed: VÄHENNYSLASKUA SEKAISIN ───────────────────────────────────────────
const SKEL_MX = [
  `Tämä sekoitetun vähennyslaskun tehtävä yhdistää eri tapoja työstää pois ottamista, jotta lapsi harjoittelee kokonaisvaltaisesti. Joillakin riveillä on joukko kuvia, joissa on {N_PL}, ja siitä otetaan pois kirjoitettu luku: lasketaan kuvat, otetaan pois lukumerkki ja päätellään, kuinka monta jää. Toisilla riveillä täytyy etsiä puuttuva osa, päätellen, mikä vietiin pois. Tehtävien vuorottelu auttaa ymmärtämään vähennyslaskua monelta kannalta ja pitää tarkkaavaisuuden virkeänä. {N_GEN} kuvien parissa pieni siirtyy luontevasti kuvien laskemisesta takaperin ajatteluun, rakentaen vankan ja joustavan ymmärryksen. Tämä on rikas mutta aina seesteinen harjoitus: ei aikaa, ei pisteitä, vain ilo kohdata keskenään erilaisia pieniä haasteita. Tehtävä on ilmainen ja valmiina tulostettavaksi, mainio luokkaan tai rauhalliseen hetkeen kotona.`,

  `Kokonainen ja vaihteleva tehtävä: nämä sekoitetut vähennyslaskut vuorottelevat harjoitustyyppejä, jotta lapsi oppii ottamaan pois eri tavoin. Joillakin riveillä hän kohtaa joukon kuvia, joissa on {N_PL}, miinus kirjoitettu luku, ja hänen täytyy laskea kuvat, vähentää lukumerkki ja päätellä, kuinka monta jää. Toisilla riveillä hänen täytyy etsiä puuttuva osa, koota uudelleen, mikä otettiin pois. Tämä vaihtelu on arvokasta, sillä se totuttaa pienen katsomaan vähennyslaskua eri näkökulmista eikä tekemään sitä mekaanisesti. Kun {N_PART_PL} ovat edessä, joka tehtävä pysyy konkreettisena ja ystävällisenä. Tyypistä toiseen siirtyminen pitää uteliaisuuden korkealla ja vahvistaa ajattelun joustavuutta. Täällä kukaan ei mittaa nopeutta: ei aikaa, ei sijoituksia, vain ilo päätellä rauhassa. Tehtävä on ilmainen ja tulostuu hetkessä.`,

  `Tämä sekoitetun vähennyslaskun tehtävä tarjoaa mukavan tehtävien vaihtelun, jotta lapsi panee koetukselle erilaisia taitoja. Tietyillä riveillä on joukko kuvia, joissa on {N_PL}, ja siitä otetaan pois kirjoitettu luku: lasketaan kuvat, vähennetään lukumerkki ja etsitään, kuinka monta jää. Toisilla riveillä täytyy löytää puuttuva osa, ajatellen, mikä vietiin pois. Tämä konkreettisen laskun ja takaperin päättelyn risteäminen auttaa ymmärtämään vähennyslaskua syvällisesti ja kestävästi. {N_GEN} kuvien parissa pieni löytää aina konkreettisen tuen, silloinkin kun täytyy päätellä. Ei aikaa, arvosanoja tai tähtiä: tehtävä on rauhallinen ja kunnioittaa kunkin omaa tahtia, ja erehdyksistä tulee tilaisuus yrittää uudelleen. Tehtävä on ilmainen ja valmiina tulostettavaksi.`,

  `Vaihtelu tekee hyvää oppimiselle, ja tämä sekoitetun vähennyslaskun tehtävä tietää sen. Se vuorottelee kahta harjoitustyyppiä: joillakin riveillä lapsi kohtaa joukon kuvia, joissa on {N_PL}, miinus kirjoitettu luku, laskee kuvat, vähentää ja päättelee, kuinka monta jää; toisilla hänen täytyy etsiä puuttuva osa, päätellen, mikä otettiin pois. Tämä jatkuva siirtymä laskemisen ja takaperin ajattelun välillä tekee harjoituksesta rikkaan ja innostavan ilman, että siitä koskaan tulee toistavaa. {N_PART_PL} pitävät joka tehtävän konkreettisena ja lähellä lapsen kokemusta. Vaihtelu auttaa myös pitämään tarkkaavaisuuden virkeänä ja kehittämään joustavaa ajattelua, joka kohtaa vähennyslaskun monelta kannalta. Täällä ei rikota ennätyksiä: ei aikaa, ei pisteitä, vain seesteinen hetki päätellä. Tehtävä on ilmainen ja tulostuu heti, mainio kouluun ja kotiin.`,

  `Tämä sekoitetun vähennyslaskun tehtävä tarjoaa lapselle vaihtelevan ja kokonaisen harjoituksen. Joillakin riveillä on joukko kuvia, joissa on {N_PL}, ja siitä otetaan pois kirjoitettu lukumerkki: lasketaan kuvat, vähennetään luku ja etsitään, kuinka monta jää. Toisilla riveillä tehtävä muuttuu, ja täytyy löytää puuttuva osa kooten uudelleen, mikä vietiin pois. Molempien tyyppien kohtaaminen auttaa pientä ymmärtämään, että vähennyslaskulla on monta puolta, jotka kaikki liittyvät toisiinsa. {N_GEN} kuvien parissa työskentely pitää työn konkreettisena ja ystävällisenä niin laskettaessa kuin takaperin ajateltaessa. Tehtävä on suunniteltu seesteiseksi: ei aikaa noudatettavana, ei kilpailua, vain tilaa ajatella rauhassa. Tehtävä on ilmainen ja valmiina tulostettavaksi muutamassa sekunnissa.`,

  `Kaksi haastetta yhdellä sivulla: tämä sekoitetun vähennyslaskun tehtävä vuorottelee konkreettista laskua ja takaperin päättelyä. Tietyillä riveillä lapsi näkee joukon kuvia, joissa on {N_PL}, miinus kirjoitettu luku, laskee kuvat, ottaa pois lukumerkin ja etsii, kuinka monta jää. Toisilla hänen täytyy löytää puuttuva osa, kuvitellen, mikä vietiin pois. Tämä vuorottelu on arvokasta, sillä se harjoittaa mieltä liikkumaan ketterästi eikä tekemään vähennyslaskua automaattisesti. Joka rivi tuo pienen uutuuden, ja se pitää lapsen uteliaisuuden virkeänä. Ei pisteitä eikä aikaa juostavaksi: tehtävä on rauhallinen ja lämmin, ja jokainen erehdys on vain askel matkalla. Tehtävä on ensimmäiselle luokalle mainio. Se on ilmainen ja tulostuu hetkessä, kouluun ja kotiin.`,

  `Tämä sekoitetun vähennyslaskun tehtävä yhdistää tekemisen ja ajattelun vaihtelevaksi ja sopusointuiseksi poluksi. Joillakin riveillä lapsi kohtaa joukon kuvia, joissa on {N_PL}, ja siitä vähennetään kirjoitettu luku, ja hänen täytyy laskea kuvat ja päätellä, kuinka monta jää. Toisilla riveillä tehtävä kääntyy: täytyy etsiä puuttuva osa, päätellen, mikä otettiin pois. Tämä risteäminen tekee harjoituksesta kokonaisen ja koukuttavan, sillä se pitää konkreettisen laskun ja takaperin ajattelun yhdessä. {N_PART_PL} tekevät joka tehtävästä ystävällisen ja kokemukseen ankkuroidun. Vaihtelu auttaa myös levottomampia lapsia pitämään tarkkaavaisuutta, sillä joka rivi on pieni yllätys. Täällä ei mitata nopeutta: ei aikaa, ei kilpailua, vain seesteinen hetki päätellä hyvin. Tehtävä on ilmainen ja valmiina tulostettavaksi.`,

  `Yksi sivu, monta tapaa ottaa pois: tämä sekoitetun vähennyslaskun tehtävä vuorottelee erilaisia harjoituksia tarjotakseen kokonaisen treenin. Joillakin riveillä on joukko kuvia, joissa on {N_PL}, miinus kirjoitettu luku, ja lapsi laskee, vähentää ja etsii, kuinka monta jää. Toisilla riveillä hänen täytyy löytää puuttuva osa kooten uudelleen, mikä vietiin pois. Tehtävien sekoittaminen auttaa ymmärtämään vähennyslaskua syvällisesti, sillä jokainen harjoitustyyppi valaisee pois ottamisen eri puolta. {N_GEN} kuvien parissa pienellä on aina konkreettinen viite ajattelun tueksi. Tehtävä on suunniteltu seesteiseksi ja kiireettömäksi: ei aikaa juostavaksi, ei pisteitä, vain rauha, joka tarvitaan päättelyyn. Tehtävä on ensimmäisen luokan lasten kokoinen. Se on ilmainen ja tulostuu hetkessä, kouluun ja kotiin.`,
];

const P2_MX = [
  `Tämä tehtävä vuorottelee kahta tehtävää: joillakin riveillä otetaan pois kirjoitettu luku joukosta kuvia, joissa on {N_PL}, toisilla etsitään puuttuva osa. Näin lapsi harjoittaa pois ottamista eri tavoin. {N_GEN} kuvien kanssa tehtävä pysyy konkreettisena ja ensimmäisen luokan kokoisena. Ei aikaa: vain ilo kohdata pieniä, vaihtelevia haasteita rauhassa.`,

  `Tehtävän ratkaisemiseksi lapsi siirtyy harjoituksesta toiseen: välillä hän laskee kuvat, joissa on {N_PL}, ja vähentää lukumerkin, välillä päättelee, kuinka monta otettiin pois. Tämä vaihtelu harjoittaa joustavaa ajattelua. {N_GEN} kuvien parissa kaikki pysyy konkreettisena, ja tehtävä on seesteinen ja ensimmäisen luokan lapsille sopiva.`,

  `Kokonainen treeni yhdellä sivulla: jotkin rivit pyytävät ottamaan pois kirjoitetun luvun kuvista, joissa on {N_PL}, toiset etsimään puuttuvan osan. Näin lapsi oppii katsomaan vähennyslaskua monelta kannalta. {N_GEN} kuvien kanssa työ pysyy ystävällisenä, ja tehtävä on ensimmäiselle luokalle mainio. Ei kilpailua eikä arvosanoja, vain rauhallista päättelyä.`,

  `Tämä tehtävä sekoittaa laskua ja päättelyä. Tietyillä riveillä lapsi laskee kuvat, joissa on {N_PL}, ja vähentää lukumerkin; toisilla etsii, kuinka monta otettiin pois. Tehtävien vaihtelu pitää tarkkaavaisuuden virkeänä ja vahvistaa pois ottamisen ymmärrystä. {N_GEN} kuvien kanssa harjoitus on rikas mutta aina seesteinen, mainio ensimmäisen luokan ensiaskeliin.`,

  `Kaksi harjoitustyyppiä yhdellä tehtävällä: välillä otetaan pois luku kuvista, joissa on {N_PL}, välillä etsitään puuttuva osa. Lapsi harjoittaa näin erilaisia taitoja, siirtyen laskemisesta takaperin ajatteluun. {N_GEN} kuvien parissa kaikki pysyy konkreettisena, ja tehtävä takaa rauhallisen ja ensimmäisen luokan kokoisen tason. Ei aikaa juostavaksi.`,

  `Tehtävän käyttämiseksi lapsi kohtaa erilaisia rivejä: joillakin hän laskee kuvat, joissa on {N_PL}, ja vähentää lukumerkin, toisilla päättelee, kuinka monta otettiin pois. Tämä vuorottelu tekee harjoituksesta koukuttavan ja kokonaisen. {N_GEN} kuvien kanssa työ pysyy lähellä kokemusta, ja tehtävä on helposti lähestyttävä. Ei aikaa tai pisteitä, vain seesteisyyttä ja keskittymistä.`,

  `Tämä tehtävä tarjoaa vaihtelevan treenin pois ottamisesta. Yksi rivi pyytää vähentämään kirjoitetun luvun kuvista, joissa on {N_PL}, toinen etsimään puuttuvan osan: lapsi panee peliin erilaisia taitoja ja kasvaa tasapainoisesti. {N_GEN} kuvien kanssa kaikki pysyy konkreettisena ja ensimmäisen luokan kokoisena. Tulosta ilmaiseksi ja tarjoa rauhassa, yksi rivi kerrallaan.`,
];

const H1 = {
  'cross-out': 'Vähennyslasku: {H1} – {GRADE}',
  'image-number': 'Vähennä luku kuvista: {H1} – {GRADE}',
  'find-subtrahend': 'Etsi vähennettävä luku: {H1} – {GRADE}',
  'mixed': 'Vähennyslaskua sekaisin: {H1} – {GRADE}',
};

const CAR = {
  'cross-out': 'Yliviivaa ja laske – ',
  'image-number': 'Vähennä luku kuvista – ',
  'find-subtrahend': 'Etsi vähennettävä luku – ',
  'mixed': 'Vähennyslaskua sekaisin – ',
};

module.exports = {
  type: 'subtraction',
  eyebrow: 'Tehtävä: Vähennyslasku',
  strand: 'Luvut ja laskutoimitukset',
  slotWord: 'kuvat',
  h1: (mk, lvl) =>
    (H1[mk] || H1['mixed']).replace(
      '{GRADE}',
      lvl === '2-luokka' ? '2. luokan oppilaille' : '1. luokan oppilaille'
    ),
  carousel: (mk, h1Display) => (CAR[mk] || '') + h1Display,
  modes: {
    'cross-out': { SKEL: SKEL_CO, P2: P2_CO },
    'image-number': { SKEL: SKEL_IN, P2: P2_IN },
    'find-subtrahend': { SKEL: SKEL_FS, P2: P2_FS },
    'mixed': { SKEL: SKEL_MX, P2: P2_MX },
  },
  P3: `Jos lapsesi piti tästä tehtävästä, kokeilkaa myös tehtäviä {nb1}, joissa hän ottaa pois aivan yhtä rauhallisesti, tai tarttukaa tehtäviin {nb2}, kun tekee mieli vaihtelua. Teeman vaihtaminen silloin tällöin pitää laskun tuoreena ja innon virkeänä, kun lapsi yliviivaa {N_PART_PL} ja laskee jäljelle jääneet aina uudessa näkymässä. Koko kokoelmamme on täysin ilmainen: tehtävät voi pelata netissä tai tulostaa keittiön pöydälle ratkaistaviksi. Mukana ei ole aikaa eikä pisteitä — kaikki saa tehdä askel askeleelta, lapsen omassa tahdissa. Näin pieni jatkaa rauhassa ja varmasti vähennyslaskunsa rakentamista.`,
};
