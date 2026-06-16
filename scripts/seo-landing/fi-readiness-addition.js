/**
 * fi-readiness-addition.js — suomenkielinen (fi) laskeutumissivun teksti yhteenlasku-tehtävälle.
 *
 * Tehtävä (Yhteenlasku): kuvapohjainen yhteenlasku. STANDARD-BEARING (1. luokka, OPS 2014,
 * sisältöalue Luvut ja laskutoimitukset). HUOM: tämä config EI vie level- eikä standard-kenttää
 * — ne tulevat per-koordinaatti-annotaatiosta (generaattori injektoi co.level / co.standard).
 *
 * NELJÄ tilaa — lapsi laskee ja LISÄÄ YHTEEN saadakseen selville KUINKA MONTA YHTEENSÄ:
 *   image-image  (token "Yhteenlasku"): kaksi kuvaryhmää YHDISTETTÄVÄKSI — laske ensimmäinen
 *                ryhmä, laske toinen, lisää ne yhteen ja kirjoita kuinka monta yhteensä.
 *   image-number (token "Kuvat ja luku yhteen"): kuvaryhmä JA kirjoitettu luku — laske kuvat,
 *                lue luku ja lisää nämä kaksi yhteen.
 *   find-addend  (token "Etsi puuttuva luku"): yhteenlasku, jossa on aukko, "… + ? = …";
 *                summa on tiedossa, yksi luku puuttuu, ja lapsi etsii MIKÄ LUKU PUUTTUU,
 *                jotta päästään summaan.
 *   mixed        (token "Yhteenlaskua sekaisin"): sekoitus edellä olevia yhteenlaskuja.
 *
 * KRIITTINEN AITA #1 — operaatio-totuus (yhteenlasku vs. vähennyslasku). OPERAATIO kantaa
 * JOKAISEN lauseen. Yhteenlasku OMISTAA sen, että summa KASVAA: laske yhteen / yhteensä /
 * kuinka monta yhteensä / lisää / plus / plus-merkki / +. Avainkysymys on aina
 * "Kuinka monta yhteensä?". KIELLETYT (kuuluvat vähennyslaskuun): vähennä, vähennyslasku,
 * ota pois, yliviivaa, kuinka monta jää, kuinka monta on jäljellä, jäljelle jää, miinus,
 * miinus-merkki, −. EI yhtään geneeristä "laske vastaus" -täytettä — johda aina
 * YHDISTÄMISELLÄ / KASVAMISELLA. find-addend OMISTAA puuttuvan luvun kehyksen: mikä luku
 * puuttuu / kuinka monta pitää lisätä / paljonko tarvitaan vielä, jotta päästään summaan.
 *
 * Teksti on LUKUALUE-AGNOSTINEN: lukualue (esim. kymmeneen asti) elää SERP-otsikossa,
 * EI tässä leipätekstissä. Ei kovakoodattua lukualuetta, ei numeroita. Teeman substantiivi
 * tulee aina fi-render.js:n paikkamerkeistä:
 *   {H1}        nominatiivin monikko, isolla (otsikko/karuselli/sivun H1)
 *   {N_PL}      nominatiivin monikko, pienellä — SUBJEKTI ("{N_PL} ovat kahdessa ryhmässä")
 *   {N_PART_PL} partitiivin monikko, pienellä — laskemisen/lisäämisen OBJEKTI ("laske {N_PART_PL} yhteen")
 *   {N_PART_SG} partitiivin yksikkö, pienellä — kysymys "montako {N_PART_SG} yhteensä?"
 *   {N_GEN}     genetiivin monikko, pienellä — "{N_GEN} kuvat"
 *
 * Ei kovakoodattua teeman substantiivia. Ei numeroita. [NSR-FLAG][fi] §17.5.1.
 */
'use strict';

const SKEL_II = [
  `Tällä tehtävällä pieni laskijasi yhdistää kaksi ryhmää ja saa selville, kuinka monta on yhteensä. Jokainen yhteenlasku on piirretty: yhdellä puolella on pieni kasa {N_PART_PL}, toisella puolella toinen kasa. Lapsi laskee ensin ensimmäisen ryhmän, sitten toisen, lisää kaikki yhteen ja kirjoittaa kuinka monta on kaikkiaan. Yhteenlasku muuttuu näin hyvin konkreettiseksi: {N_PL} kerätään yhteen, lapsi näkee sen omin silmin, ja summa kasvaa hänen edessään. Kuinka monta yhteensä? Se on ainoa kysymys. Tämä sopii erinomaisesti 1. luokalle, jolloin ensimmäiset yhteenlaskut alkavat ja lapsi laskee vielä parhaiten kuvien avulla. Mikään ei kiirehdi: jokainen etenee omassa tahdissaan, ilman ajanottoa ja ilman arvosanaa. Joka laskussa pieni lisää molempien ryhmien {N_PART_PL} yhteen ja kirjoittaa summan pieneen ruutuun. Tehtävä on täysin ilmainen, valmiina tulostettavaksi tai pelattavaksi netissä, kotona tai koulussa.`,

  `Tässä tehtävässä luvut eivät tule kirjoitettuina numeroina vaan piirrettyinä {N_GEN} ryhminä — ja juuri se muuttaa kaiken lapselle, joka aloittaa 1. luokalla. Pieni laskee ensimmäisen ryhmän, laskee toisen ja lisää nämä kaksi yhteen löytääkseen, kuinka monta on yhteensä. Koska kaikki tapahtuu kuvina, yhteenlaskusta tulee pieni tarina: yksi ryhmä lisätään toiseen ja summa kasvaa. Osoita {N_PART_PL} sormella, yksi kerrallaan, ja laskekaa ääneen — lapsi aistii, kuinka kahdesta kasasta tulee yksi ainoa. Ilman stressiä: jokainen yhteenlasku saa kestää juuri niin kauan kuin tarvitsee. Yhä uudelleen pieni lisää kaiken yhteen, laskee ryhmät yhteen ja kirjoittaa kuinka monta on yhteensä. Tehtävä on ilmainen ja tulostuu hetkessä keittiön pöydälle.`,

  `Tämä tehtävä tekee kuvapohjaisesta yhteenlaskusta hyvin konkreettista: jokainen lasku koostuu kahdesta {N_GEN} ryhmästä, jotka lapsi laskee ja sitten lisää yhteen. Ensin kuinka monta on ensimmäisessä ryhmässä, sitten kuinka monta toisessa — ja yhdessä niistä tulee summa. 1. luokan lapset rakastavat tätä, koska he laskevat vielä parhaiten yhteen sellaisen avulla, mitä voi osoittaa sormella. Kun pieni laskee {N_PART_PL} ääneen, hän aistii, kuinka kaksi osaa muuttuvat yhdeksi määräksi ja kuinka summa kasvaa. Tästä avautuu itse yhteenlaskun ja plus-merkin (+) tarkoitus. Mitään ei ole pakotettu, ei painetta, ei ajanottoa. Joka laskussa lapsi lisää toisen ryhmän ensimmäiseen ja kirjoittaa kuinka monta on yhteensä. Tulosta {N_PART_PL} kuvineen niin monta kertaa kuin haluat, täysin ilmaiseksi.`,

  `Kaipaatko hyvin lempeää sisäänkäyntiä yhteenlaskuun? Tässä pieni harjoittelee aitoja yhteenlaskuja, mutta pelkillä kuvilla: laskun molemmat luvut tulevat piirrettyinä {N_GEN} ryhminä. Lapsi laskee ensimmäisen ryhmän, laskee toisen ja lisää nämä yhteen löytääkseen ja kirjoittaakseen summan. 1. luokan aloittajalle tämä on kaunein polku laskuun, koska yhteenlaskusta tulee yksinkertaisesti kahden kasan yhdistämistä. Osoittakaa {N_PART_PL} yhdessä sormella — näet oivalluksen saapuvan ja summan kasvavan. Kaikki rauhassa, ilman painetta ja lapsen omaan tahtiin. Yhä uudelleen pieni lisää kaiken yhteen, laskee ryhmät yhteen ja merkitsee kuinka monta on yhteensä. Kaikki tehtävät ovat ilmaisia tulostettaviksi kotona.`,

  `Moni lapsi ymmärtää yhteenlaskun jo kauan ennen numeroita — ja juuri siitä tämä tehtävä lähtee liikkeelle. Yhteenlaskut tulevat piirrettyinä {N_GEN} ryhminä irrallisten lukujen sijaan, jotta pieni löytää summan laskemalla. Ensin ensimmäinen ryhmä, sitten toinen, ja sen jälkeen ne kaksi lisätään yhteen. Kun lapsi osoittaa {N_PART_PL} ja laskee ääneen, hän huomaa, että yhteenlasku on kahden osan yhdistämistä yhdeksi. Tämä kokemus on arvokas 1. luokalla, kun laskut alkavat toden teolla. Kukaan ei vaadi kiirettä: vain rauha ajatella, ilman ajanottoa ja ilman arvosanaa. Joka yhteenlaskussa pieni lisää {N_PART_PL} yhteen ja kirjoittaa pieneen ruutuun, kuinka monta on yhteensä. Tehtävä on ilmainen ja valmiina tulostettavaksi.`,

  `Laske, lisää yhteen, kirjoita kuinka monta yhteensä — tämä on tehtävän rytmi, jossa jokainen yhteenlasku koostuu {N_GEN} ryhmistä. Pieni katsoo ensimmäistä ryhmää, katsoo toista, laskee molemmat ja lisää kaiken yhdeksi ainoaksi määräksi. Yhteenlaskusta tulee laskemisen tarina abstraktin sijaan, ja se sopii hyvin 1. luokan lapsille, jotka pitävät vielä siitä, että näkevät, mitä laskevat yhteen. Laske {N_PART_PL} sormella matkan varrella — se auttaa enemmän kuin äkkiä uskoisi, ja summa kasvaa. Ei kiirettä: työskennellään rauhassa, omassa tahdissa. Yhä uudelleen pieni lisää toisen ryhmän ensimmäiseen ja kirjoittaa kuinka monta on yhteensä. Ilmainen tulostettavaksi aina kun tekee mieli.`,

  `Kädet ja silmät ovat parhaat laskuvälineet 1. luokalla, ja siksi tämän tehtävän yhteenlaskut tulevat piirrettyinä {N_GEN} ryhminä. Pieni osoittaa, laskee ensimmäisen ryhmän, laskee toisen ja lisää kaiken yhteen, jolloin summa ilmestyy melkein itsestään. Kun laskun voi nähdä ja melkein koskea, yhteenlasku pysyy rauhallisena sille, joka vasta keksii ensimmäisiä summia. Laskekaa {N_PART_PL} ääneen yhdessä ja antakaa lapsen viedä tarinaa omaan tahtiinsa — tehtävässä ei ole mitään painetta. Joka laskussa pieni lisää kaiken yhteen, laskee ryhmät yhteen ja kirjoittaa kuinka monta yhteensä. Vähitellen yhdistämisestä tulee aito yhteenlasku, ja summa kasvaa. Tulosta ilmaiseksi, kotona tai koulussa.`,

  `Pohjimmiltaan yhteenlasku tiivistyy yhteen asiaan: selvittää, kuinka monta on YHTEENSÄ. Tällä tehtävällä pieni harjoittelee juuri sitä, yhteenlaskuilla, joissa molemmat luvut ovat {N_GEN} ryhmiä. Lapsi laskee ensimmäisen ryhmän, laskee toisen ja lisää nämä kaksi yhteen ennen kuin kirjoittaa summan pieneen ruutuun. Tämä tapa on järkevä 1. luokalla, koska yhteenlasku alkaa sen laskemisesta, minkä näkee. Osoita {N_PART_PL} yhdessä ja laskekaa ääneen — yhteys tulee selväksi ja summa kasvaa. Aikaa on niin paljon kuin tarvitsee, ilman painetta ja lapsen omaan tahtiin. Yhä uudelleen pieni laskee yhteen, lisää {N_PART_PL} ja päätyy yhteen ainoaan summaan. Tehtävä on ilmainen tulostettavaksi aina kun haluat.`,
];

const P2_II = [
  `Hyvä kotivinkki: anna pienen laskea jokainen {N_GEN} ryhmä ääneen ennen kuin kaikki lisätään yhteen. Sormella osoittaminen matkan varrella auttaa paljon, koska lapsi näkee, mitkä {N_PART_PL} hän on jo laskenut ja kuinka summa kasvaa. Tehtävä on ilmainen ja tulostuu hetkessä: istahtakaa pöydän ääreen, kun tekee mieli.`,

  `Onko pieni epävarma? Laita sormi ensimmäiseen ryhmään, laske se, ja jatka rauhassa toiseen lisäten. Näin laskien lapsi aistii, että yhteenlasku on yhdistämistä — {N_PART_PL} apureina koko ajan. Tulosta tehtävä ilmaiseksi tai pelaa netissä, jos se on teille kätevämpää.`,

  `Hyvä puoli {N_GEN} kanssa työskentelyssä on, että pieni voi aina tarkistaa summan: jos se ei tunnu oikealta, lisätään uudelleen yhteen ja lasketaan {N_PART_PL} taas rauhassa, ilman minkäänlaista painetta. Lataa tehtävä ilmaiseksi tulostettavaksi ja jätä se pöydälle — yksi yhteenlasku on mukava hetki päivässä.`,

  `Haluatko mennä pidemmälle? Ota kotoa muutama pieni esine, pyydä pientä kokoamaan kaksi ryhmää kuten {N_PL} tehtävässä — ja sitten lisätkää ne yhteen nähdäksenne, kuinka monta yhteensä. Tämä käsillä tekeminen näyttää selvästi, mitä yhteen lisääminen tarkoittaa. Kaikki tehtävät tulostuvat ilmaiseksi niin monta kertaa kuin haluat.`,

  `Jotkut lapset laskevat ensimmäisen {N_GEN} ryhmän kahteen kertaan. Ei se mitään: aloitetaan rauhassa alusta, osoitetaan sormella ja lisätään {N_PART_PL} kaikessa rauhassa yhteen. Jokainen yhteenlasku saa kestää oman aikansa. Tulosta tehtävä ilmaiseksi ja säilytä se — on kiva nähdä summan osuvan kohdalleen ensi kerralla.`,

  `Anna pienen jokaisen yhteenlaskun jälkeen kertoa, miten hän löysi summan: "minulla oli kolme, lisäsin vielä kaksi". Kun {N_PL} ja kuinka monta yhteensä puetaan sanoiksi, lasku painuu paremmin mieleen. Ilman stressiä, vain rauhallista harjoittelua askel kerrallaan. Ja koska tehtävät ovat ilmaisia, aina voi tehdä vielä yhden.`,

  `Lopuksi rauhassa: laskekaa yhdessä, viimeisen kerran, kaikki {N_PART_PL} tehtävästä yhteen. Näin pieni harjoittelee leikiten yhdistämään kaiken ja näkemään summan kasvavan. Tehtävä on ilmainen, pelattavaksi netissä tai tulostettavaksi paperille, jotta into kuvapohjaiseen yhteenlaskuun kasvaa vähitellen siellä kotona.`,
];

const SKEL_IN = [
  `Tämä tehtävä rakentaa sillan kuvasta lukuun: jokaisessa yhteenlaskussa {N_GEN} kuvaryhmä on kirjoitetun luvun vieressä, yhteen lisättäväksi. Pieni laskee ensin {N_PART_PL}, yhdistää määrän lukuun ja lisää sitten nämä kaksi osaa yhteen. Näin hän oppii, että luku ja ryhmä tarkoittavat täsmälleen samaa, ja että summa kasvaa, lähdettiinpä liikkeelle kuvista tai numeroista. Tämä on tärkeä 1. luokan askel, jolloin lapsi siirtyy vähitellen kaiken laskemisesta lukujen avulla yhteen laskemiseen. Anna hänen osoittaa sormella ja laskea uudelleen, ilman painetta, omassa tahdissaan. Joka laskussa pieni yhdistää kuvan ja luvun, lisää yhteen ja kirjoittaa kuinka monta on yhteensä. Kuvasta lukuun, yksi yhteenlasku kerrallaan. Ilmainen tulostettavaksi.`,

  `Tässä pieni kohtaa yhteenlaskuja, joissa sekoittuvat kuvat ja luvut: {N_GEN} kuvaryhmä yhdellä puolella, luku toisella, yhteen lisättäväksi. Laskemalla {N_PART_PL} ja vertaamalla niitä numeroon lapsi huomaa, että ne kaksi tarkoittavat samaa — silloin voi lisätä yhteen ja summa kasvaa. Tämä silta on 1. luokan ytimessä, kun lapsi oppii tunnistamaan luvut laskematta kaikkea uudestaan alusta. Mikään ei kiirehdi: työskennellään rauhassa, omassa tahdissa, ilman minkäänlaista painetta. Yhä uudelleen hän yhdistää {N_PART_PL} oikeaan lukuun, lisää yhteen ja päättää laskun summalla. Näin laskemisesta yhteen laskemiseen siirtyminen tuntuu turvalliselta ja luontevalta. Tehtävä on ilmainen tulostettavaksi.`,

  `Näissä tehtävissä jokainen yhteenlasku asettaa {N_GEN} kuvaryhmän luvun viereen, jotta pieni oppii yhdistämään kuvan ja numeron ja sitten lisäämään ne kaksi yhteen. Ensin lapsi laskee {N_PART_PL}, sitten huomaa, että luku näyttää juuri sen määrän, ja lopuksi lisää nämä kaksi osaa yhteen. 1. luokan lapselle tämä on juuri se puuttuva silta, jolla laskemisesta tulee yhteen laskemista. Osoittakaa yhdessä sormella, lukekaa luku ääneen — kaikki loksahtaa kohdalleen. Aikaa on kaikessa rauhassa niin paljon kuin tarvitsee, ilman painetta ja ilman hoputusta. Joka yhteenlaskussa pieni yhdistää kuvan ja luvun ja kirjoittaa viereen, kuinka monta on yhteensä. Vähitellen numero tulee yhtä tutuksi kuin kuvat. Tulosta ilmaiseksi.`,

  `Kuvasta lukuun siirtyminen on 1. luokan virstanpylväs, ja juuri sitä tämä tehtävä harjoittaa. Jokaisessa yhteenlaskussa {N_GEN} kuvaryhmän kanssa kulkee kirjoitettu luku; pieni laskee ensin nähdäkseen, että määrä ja numero sopivat yhteen. Sitten hän lisää nämä kaksi osaa yhteen ja merkitsee summan. Näin lapsi oppii lukemaan luvut laskematta kaikkea uudelleen ja näkee, että yhdistäminen kasvattaa summaa. Anna hänen osoittaa {N_PART_PL} sormella matkan varrella — rauhassa, ilman painetta ja omassa tahdissaan. Askel kerrallaan pieni yhdistää kuvan ja luvun ja ratkaisee laskun oikealla summalla. Ryhmästä numeroon, omaan tahtiinsa. Tehtävä on ilmainen ja valmiina tulostettavaksi.`,

  `Kuvat ja luvut kohtaavat tässä tehtävässä: jokaisessa yhteenlaskussa {N_GEN} kuvaryhmä on aivan kirjoitetun luvun lähellä, yhteen lisättäväksi. Pieni laskee {N_PART_PL}, tunnistaa, että luku sopii yhteen, ja lisää sitten nämä kaksi osaa yhdeksi summaksi. Näin rakentuu vankka silta sen välille, mitä lapsi näkee ja mitä hän lukee, ja summa kasvaa molemmin puolin. 1. luokalla tämä silta on kullan arvoinen, koska luottamus lukuihin alkaa kasvaa. Lukekaa numero yhdessä ääneen ja laskekaa uudelleen — oivallus tulee itsestään. Ilman stressiä, vain aikaa ja rauhaa ajatella. Joka laskussa pieni yhdistää kuvan ja luvun ja kirjoittaa kuinka monta on yhteensä. Ilmainen tulostettavaksi kotona.`,

  `Anna luvun ja kuvan auttaa toisiaan: tässä tehtävässä pieni laskee {N_GEN} kuvaryhmän ja katsoo sitten vieressä olevaa numeroa huomaten, että molemmat näyttävät täsmälleen saman määrän. Sen jälkeen hän lisää nämä kaksi osaa yhteen ja kirjoittaa summan laskuun. Tämä edestakaisin liikkuminen laskemisen ja lukemisen välillä on juuri sitä, mitä 1. luokan lapsi tarvitsee, jotta yhteenlaskusta tulee sujuvaa. Osoita {N_PART_PL} sormella, sano luku ääneen, ja anna lapsen löytää oma tahtinsa — ei painetta, ei hoputusta tehtävässä. Lasku laskulta ymmärrys kasvaa, ja laskeminen liukuu vähitellen aidoksi yhteenlaskuksi, jossa summa kasvaa kohti loppusummaa. Tulosta niin monta kertaa kuin haluat, ilmaiseksi.`,

  `Tämä tehtävä sekoittaa tarkoituksella kuvat ja luvut, jotta yhteenlaskusta tulee silta laskemisen ja yhteen laskemisen välille. {N_GEN} kuvaryhmän vieressä on numero, ja pieni laskee nähdäkseen, että luku näyttää sen määrän. Sitten hän lisää nämä kaksi osaa yhteen ja merkitsee oikean summan. 1. luokan lapsi oppii näin luottamaan lukuihin sen sijaan, että laskisi kaiken uudestaan alusta, ja näkee summan kasvavan. Anna hänen osoittaa {N_PART_PL} sormella, ihan rauhassa, ilman painetta ja omassa tahdissaan. Yhä uudelleen lapsi asettaa kuvan ja luvun rinnakkain, lisää yhteen ja ratkaisee laskun. Ryhmästä numeroon, yhteenlasku etenee turvallisesti. Tehtävä on ilmainen tulostettavaksi.`,

  `Jokainen tämän tehtävän kuva auttaa pientä ymmärtämään vieressä olevan luvun: {N_GEN} kuvaryhmä kulkee kirjoitetun numeron kanssa yhteenlaskussa, yhteen lisättäväksi. Ensin lapsi laskee {N_PART_PL}, sitten huomaa, että luku vastaa juuri sitä määrää, ja lopuksi lisää nämä kaksi osaa yhteen. Tämä yhteys on 1. luokalla turvallinen ja rauhallinen askel kohti laskua puhtailla luvuilla. Lukekaa luku yhdessä ääneen ja laskekaa uudelleen sormella — se osuu kohdalleen itsestään. Rauhaa ja aikaa on, ilman painetta. Joka yhteenlaskussa lapsi yhdistää kuvan ja numeron, lisää yhteen ja kirjoittaa kuinka monta on yhteensä. Vähitellen luku tulee yhtä tutuksi kuin kuvat. Ilmainen tulostettavaksi aina.`,
];

const P2_IN = [
  `Hyödyllinen vinkki: anna pienen laskea ensin {N_PART_PL}, ja osoittaa sitten viereistä numeroa. Sano "katso, sama määrä", kun yhdistelmä osuu kohdalleen — silta kuvan ja luvun välillä vahvistuu joka kierroksella, ja summa kasvaa. Tehtävä on ilmainen tulostettavaksi: tehkää tämä pieni oivallus uudelleen niin monta kertaa kuin haluatte kotona.`,

  `Vastustaako numero vielä? Aseta silloin pieni {N_GEN} ryhmä luvun viereen ja anna pienen laskea molemmat. Hän näkee mustaa valkoisella, että luku ja ryhmä ovat samankokoiset — ja että ne voi lisätä yhteen. Kaikki rauhassa, ilman painetta. Ja koska tehtävät tulostuvat ilmaiseksi, voi aina yrittää uudelleen huomenna.`,

  `Pelatkaa silloin tällöin käänteinen peli: sano luku, ja anna pienen laittaa yhtä monta {N_PART_PL} kuin luku osoittaa, ja sitten lisätä toinen pieni kasa. Tämä silta luvusta kuvaan vahvistaa yhteenlaskua molemmin puolin ja herättää luvut eloon. Kaiken voi ladata ja tulostaa ilmaiseksi kotona, kun teille sopii.`,

  `Lukeeko pieni numeron epäröiden? Ei se mitään: laskekaa {N_PART_PL} yhdessä ja sanokaa luku ääneen perään — niin monta kertaa kuin tarvitsee. Jokainen yhteenlasku saa kestää oman aikansa, ilman painetta. Tehtävä on aina käden ulottuvilla, ilmaiseksi tulostettavaksi, yhtä yhteenlaskua varten vaikka ihan rauhallisena iltapäivänä.`,

  `Muutaman yhteenlaskun jälkeen anna pienen kertoa, mikä luku kuuluu mihinkin {N_GEN} kuvaryhmään. Yhteyden sanominen ääneen kiinnittää sen mieleen ja antaa luvuille merkityksen; silloin summan näkee kasvavan varmemmin. Ilman stressiä, vain rauhallista harjoittelua askel kerrallaan. Ja koska tehtävät ovat ilmaisia, aina voi tehdä vielä yhden.`,

  `Vielä yksi kaunis harjoitus: laita numero ja {N_GEN} kuvaryhmä rinnakkain ja kysy "onko niissä sama määrä?". Tämä vertailu on juuri se silta, jonka pieni tarvitsee lisätäkseen yhteen ja kasvattaakseen summaa. Tulosta tehtävä ilmaiseksi ja palatkaa leikkiin vähitellen viikon mittaan — ilman koskaan hoputtamatta.`,

  `Lopuksi: anna pienen samassa yhteenlaskussa yhtä aikaa laskea {N_PART_PL}, lukea luku ja kirjoittaa molemmat. Kahden tien näkeminen oikeaan summaan rauhoittaa paljon ja ilahduttaa sitä, joka laskee yhteen. Kaikki tehtävät tulostuvat vapaasti kotona, jotta askel laskemisesta yhteen laskemiseen kasvaa rauhassa — yksi oivallus kerrallaan.`,
];

const SKEL_FA = [
  `Tällä tehtävällä pienestä tulee lukujen salapoliisi: jokaisessa yhteenlaskussa yksi luku piiloutuu, esimerkiksi muotoon "kolme plus joku = viisi". Summa on jo siinä — täytyy vain löytää, kuinka monta pitää lisätä, jotta päästään siihen. Lapsi katsoo, mitä on kirjoitettu, ja etsii mikä luku puuttuu, jotta summa saavutetaan. Tehtävän {N_PL} auttavat hyvin: voi laskea, kuinka monta puuttuu vielä summaan asti. 1. luokalle tämä on kaunis askel, koska lapsi ei enää lisää kahta tuttua lukua, vaan hän etsii mikä puuttuu. Aikaa on niin paljon kuin tarvitsee, ilman painetta. Joka laskussa pieni kysyy itseltään: mikä luku puuttuu? {N_GEN} avulla hän laskee summaan asti ja täydentää laskun. Ilmainen tulostettavaksi kotona tai koulussa.`,

  `Tämä tehtävä on tehty puuttuvista luvuista: luetaan esimerkiksi "neljä plus joku = seitsemän", ja pienen täytyy löytää se luku, joka täydentää yhteenlaskun. Tämä on eri asia kuin kahden tutun luvun lisääminen yhteen — täällä summa on annettu, ja lapsi etsii mikä luku puuttuu, jotta siihen päästään. {N_GEN} avulla vieressä hän laskee ensimmäisestä luvusta summaan asti ja näkee, kuinka paljon summa kasvoi. 1. luokan lapset oivaltavat näin, että yhteen lisääminen ja täydentäminen kulkevat käsi kädessä. Osoita {N_PART_PL} sormella ja laske rauhassa, kunnes osuu kohdalleen — omassa tahdissa, ilman painetta. Yhä uudelleen pieni kysyy: mikä luku puuttuu, jotta päästään summaan? Ja kirjoittaa sitten luvun. Tehtävä on ilmainen tulostettavaksi.`,

  `Mikä luku puuttuu? Tämä on tehtävän avainkysymys, sillä jokaisessa yhteenlaskussa on aukko, esimerkiksi "kaksi plus joku = kuusi". Summa tiedetään, mutta yksi luku piiloutuu, ja pieni etsii kuinka monta pitää lisätä, jotta siihen päästään. {N_PL} antavat kauniin tuen: lapsi laskee tutusta luvusta, yksi kerrallaan, summaan asti — ja askelten määrä on juuri vastaus, se osa joka kasvattaa summan. 1. luokalla tämä on kaunis tutkimusmatka, koska lapsi oppii, että yhteenlaskussa voi olla aukkoja. Kaikki rauhassa, ilman painetta ja lapsen omaan tahtiin. Yhä uudelleen pieni löytää luvun, joka täydentää laskun — {N_PART_PL} uskollisina apureina. Tulosta ilmaiseksi niin monta kertaa kuin haluat.`,

  `Tässä käännetään lasku hieman nurin: muodon "kolme plus kaksi" sijaan luetaan "kolme plus joku = viisi", ja pienen täytyy keksiä se luku, joka täydentää yhteenlaskun. Tämä vaatii uuden pienen loikan — lapsi tuntee summan ja etsii puuttuvan osan, jotta hän pääsee siihen. Onneksi {N_PL} ovat siinä tehtävässä: laskemalla ensimmäisestä luvusta summaan asti lapsi näkee tarkalleen, kuinka monta pitää lisätä. 1. luokan lapselle tämä on haaste, joka tekee yhteenlaskusta joustavamman, koska summa kasvaa kohti maalia. Ei hoputusta, vain aikaa ajatella. Joka laskussa lapsi osoittaa {N_PART_PL} sormella, laskee summaan asti ja täydentää laskun puuttuvalla luvulla. Askel kerrallaan salapoliisin työ tulee tutuksi. Ilmainen tulostettavaksi.`,

  `Yhteenlasku salaisella luvulla herättää heti uteliaisuuden. Tässä tehtävässä jokaisessa yhteenlaskussa on piiloutunut luku, esimerkiksi "viisi plus joku = kahdeksan". Pieni katsoo alkua ja summaa, ja etsii kuinka monta pitää lisätä niiden väliin. {N_PL} auttavat tekemään tästä konkreettista: lapsi laskee tutusta luvusta, silmällä pitäen, kuinka paljon puuttuu vielä, jotta summa osuu kohdalleen. Näin 1. luokan lapsi oppii, että yhteenlaskua voi tehdä joustavasti, monelta kantilta. Ei kiirettä — rauha, ei painetta ja kaikki tila yrittää. Yhä uudelleen lapsi kysyy mikä luku puuttuu, ja täyttää aukon {N_GEN} tuella, kasvattaen summan kohti loppusummaa. Tehtävä on ilmainen tulostettavaksi.`,

  `Laske summaan asti — näin pieni ratkaisee laskut tässä. Jokaisessa yhteenlaskussa puuttuu luku, esimerkiksi "kuusi plus joku = kymmenen", ja lapsi lähtee tutusta luvusta ja laskee eteenpäin, kunnes saavuttaa summan. Matkan varrella otettujen askelten määrä on juuri se luku, joka pitää lisätä. Tehtävän {N_PL} tekevät tästä laskemisesta helppoa seurata: osoita, laske ja katso, kuinka paljon puuttuu, jotta summa kasvaa. Tämä ajattelutapa on arvokas 1. luokalla, koska se osoittaa, että yhteenlasku muodostaa kokonaisuuden. Ei hoputusta, ei painetta — lapsi löytää oman tahtinsa. Joka laskussa pieni laskee eteenpäin {N_GEN} avulla, löytää puuttuvan luvun ja täydentää laskun tyhjään kohtaan. Ilmainen tulostettavaksi aina.`,

  `Joskus tietää vastauksen jo ennen kuin tuntee koko laskua — ja juuri sitä pieni harjoittelee tässä. Yhteenlaskuissa on aukkoja kuten "yksi plus joku = viisi", joissa summa on jo lyöty lukkoon yhden luvun piiloutuessa. Pieni kysyy itseltään: kuinka monta puuttuu, jotta päästään summaan? Ja tehtävän {N_PL} tekevät kysymyksestä konkreettisen, jotta voi laskea askel askeleelta. 1. luokalle tämä on arvokas harjoitus, koska lapsi huomaa, että yhteen lisääminen ja täydentäminen kulkevat yhdessä kasvattaen summaa. Kaikki rauhassa, ilman painetta ja omassa tahdissa. Lasku laskulta lapsi löytää puuttuvan luvun, tarkistaa {N_GEN} avulla, että se osui kohdalleen, ja kirjoittaa sen. Tehtävä on ilmainen tulostettavaksi kotona.`,

  `Tämä tehtävä kutsuu pientä etsimään, mikä puuttuu: jokaisessa yhteenlaskussa luetaan jotakin kuten "neljä plus joku = yhdeksän". Sen sijaan, että lisäisi yhteen kaksi tuttua lukua, lapsi kysyy: kuinka monta pitää lisätä vielä, ennen kuin päästään summaan? {N_PL} auttavat laskemaan tämän välimatkan, ihan rauhassa, yksi kerrallaan. 1. luokan lapselle tämä on arvokas askel, koska se osoittaa, että yhteenlasku palvelee täydentämistä, ei vain jo annetun summan löytämistä. Osoittakaa {N_PART_PL} yhdessä sormella ja laskekaa, kunnes lasku osuu kohdalleen — ilman painetta ja omassa tahdissa. Yhä uudelleen pieni täyttää aukon ja tuntee, kuinka summan ohella kasvaa hänen luottamuksensa lukuihin. Tulosta ilmaiseksi niin monta kertaa kuin haluat.`,
];

const P2_FA = [
  `Hyvä vinkki: anna pienen lähteä jo kirjoitetusta luvusta ja laskea eteenpäin {N_GEN} avulla, kunnes hän saavuttaa summan. Jokainen askel on yksi lisää — ja puuttuva luku ilmestyy itsestään. Tehtävä tulostuu ilmaiseksi kotona: salapoliisin peli voi alkaa heti, kun tekee mieli, teidän tahdissanne.`,

  `Onko piiloutuneen luvun löytäminen vaikeaa? Laita silloin yhtä monta {N_PART_PL} kuin summa osoittaa, ja peitä ensimmäinen osa kädellä. Se mikä jää näkyviin, on juuri se luku, joka pitää lisätä — abstraktista tulee konkreettista. Kaikki rauhassa, ilman painetta. Ja koska tehtävät tulostuvat ilmaiseksi, aina voi yrittää uudelleen huomenna.`,

  `Tehkää kotona pieni arvauspeli: "minulla on kolme — kuinka monta pitää lisätä, jotta on viisi?". Anna pienen täydentää lasku {N_GEN} avulla tai laatikosta löytyvillä pikkuesineillä. Puuttuvan luvun etsiminen ääneen vahvistaa yhteenlaskua monelta kantilta. Tulosta tehtävät ilmaiseksi ja säilytä rauhallista iltapäivää varten.`,

  `Kirjoittaako pieni liian suuren tai liian pienen luvun? Ei se mitään: lasketaan vielä kerran ensimmäisestä luvusta summaan asti, kaikessa rauhassa, käyttäen {N_PART_PL} tukena. Jokainen yhteenlasku saa kestää oman aikansa, ilman painetta. Ja koska tehtävä on ilmainen, uusi kopio on aina käden ulottuvilla aloittaa puhtaalta pöydältä.`,

  `Anna pienen tarkistaa vastaus jälkeenpäin: osuiko kohdalleen? Hän lisää yhteen aloitusluvun ja luvun, jonka hän lisäsi, ja katsoo, sopiiko summa. Itse tarkistaminen — laskemalla {N_PART_PL} vielä kerran — antaa kauniin luottamuksen. Tehtävät ovat ilmaisia, pelattaviksi netissä tai tulostettaviksi, joten tämä hyvä tapa ei ole koskaan kaukana.`,

  `Kaunis lisä: pyydä pientä pukemaan sanoiksi, mikä puuttui — "piti lisätä kaksi". Ääneen sanominen kiinnittää ajattelun ja helpottaa ensi kertaa. Ilman stressiä, vain rauhallista harjoittelua, {N_PART_PL} apureina matkan varrella. Lataa tehtävä ilmaiseksi tulostettavaksi ja anna tämän työn kasvaa vähitellen kotona.`,

  `Lopuksi: valitkaa yksi yhteenlasku ja antakaa pienen koota puuttuva luku oikeilla esineillä, tai osoittaa se {N_GEN} joukosta, kunnes summa tulee selväksi pöydällä. Tämä pieni ele näyttää aivan selvästi, mitä laskun täydentäminen tarkoittaa. Kaikki tehtävät tulostuvat vapaasti — piiloutuneen luvun etsinnästä voi tulla rauhallinen ja kaunis tapa.`,
];

const SKEL_MX = [
  `Tässä tehtävässä yhteenlaskut tulevat sekaisin, jotta pieni harjoittelee vähän kaikkea. Milloin on kahden ryhmän yhdistäminen, milloin kuvan ja luvun lisääminen — ja juuri tämä vaihtelu pitää pään virkeänä, koska lapsen täytyy katsoa jokaista laskua tarkkaan valmiin järjestyksen seuraamisen sijaan. {N_PL} ilahduttavat sivua ja tekevät työstä mukavaa, kun luvut ovat pääosassa ja summa kasvaa joka kerta. 1. luokalla sekoitettu harjoittelu on kullan arvoista: vaihdellen yhteenlasku muuttuu vähitellen varmaksi taidoksi. Ilman stressiä — kaikki rauhassa, omassa tahdissa. Lasku laskulta pieni lisää kaksi osaa yhteen ja kirjoittaa kuinka monta on yhteensä, {N_PART_PL} iloisena seurana. Ilmainen tulostettavaksi.`,

  `Tässä odottaa monipuolinen kokoelma yhteenlaskuja: pienistä laskuista isompiin, sekaisin keskenään. Tämä vaihtelu tekee laskusta varmempaa, koska pieni ei seuraa yhtä ainoaa raidetta, vaan kohtaa uusia laskuja matkan varrella. {N_PL} tekevät sivusta lämpimän, kun laskut ovat sydän ja summa kasvaa. 1. luokalla, kun yhteenlaskut alkavat toden teolla, juuri tämä sekoitettu harjoittelu tekee lapsesta varman. Ei hoputusta: rauhaa ja aikaa ajatella, ilman painetta. Pieni valitsee laskun, lisää luvut yhteen ja kirjoittaa vastauksen. Askel kerrallaan luottamus kasvaa, {N_PART_PL} ihastuneina katsojina. Tehtävä on ilmainen tulostettavaksi.`,

  `Vaihtelu on tämän tehtävän salainen ainesosa: yhteenlaskut tulevat sekaisin, pieniä ja isoja keskenään, jotta pieni löytää aina jotakin uutta. Tämä estää laskua muuttumasta automaatiksi — lapsen täytyy katsoa, ajatella ja yhdistää joka yhteenlaskussa. {N_PL} antavat sivulle väriä ja iloa, mutta luvut tekevät varsinaisen työn, ja summa kasvaa. 1. luokan lapset hyötyvät paljon harjoittelusta joka suuntaan, koska yhteenlasku opitaan ymmärryksenä, ei ulkoa luetteluna. Aikaa on niin paljon kuin tarvitsee, ilman painetta ja omassa tahdissa. Yksi yhteenlasku kerrallaan pieni lisää luvut yhteen ja merkitsee summan, {N_PART_PL} yleisönä. Ilmainen tulostettavaksi aina kun haluat.`,

  `Tämä tehtävä kokoaa monta yhteenlaskua kauniiksi sekoitetuksi kimpuksi. Pieni kohtaa pieniä laskuja yhtä lailla kuin isompia, ja sekoitus saa hänet lisäämään yhteen vapaasti kiinteän järjestyksen ulkoa opettelemisen sijaan. {N_PL} elävöittävät sivua, kun yhteenlaskut pitävät pääosan ja summa kasvaa joka laskussa. Juuri 1. luokalla tämä vaihteleva toisto on tärkeää: yhteenlaskut palaavat uudessa asussa, ja ymmärrys asettuu vähitellen paikalleen. Mitään ei ole pakotettu — rauha, ei painetta ja tilaa ajatella. Pieni ottaa yhden laskun kerrallaan, lisää kaksi lukua yhteen ja kirjoittaa kuinka monta on yhteensä. {N_GEN} ollessa uskollisina kumppaneina ilo ja varmuus kasvavat. Tehtävä on ilmainen tulostettavaksi.`,

  `Vähän kaikkea — näin tätä tehtävää voi kuvailla, kun kaikenkokoiset yhteenlaskut ovat rinnakkain. Sekoitettu järjestys pitää pään virkeänä: pieni ei voi toistaa sokkona, vaan katsoo jokaista laskua uusin silmin. {N_PL} tekevät sivusta lämpimän ja kutsuvan, kun luvut tuovat aidon haasteen ja summa kasvaa. 1. luokalla tämä laaja harjoittelu luo vankan pohjan laskun alle. Kaikki rauhassa, ilman painetta ja lapsen omaan tahtiin. Lasku laskulta pieni lisää luvut yhteen, kirjoittaa summan ja iloitsee jokaisesta valmiista laskusta. Lopulta yhteenlaskusta tulee refleksi — {N_PART_PL} iloisina apureina. Ilmainen tulostettavaksi.`,

  `Toiston ei tarvitse olla yksitoikkoista. Tässä tehtävässä pieni harjoittelee yhteenlaskua vaihtelevalla laskusarjalla, jossa yksikään lasku ei ole edellisen kaltainen. Milloin lisätään pieni luku, milloin isompi — ja tämä vaihtelu saa lapsen ajattelemaan joka laskussa, näkien summan kasvavan. {N_PL} hymyilevät reunalta ja pitävät tunnelman kepeänä, kun luvut harjoittavat olennaisen. 1. luokan lapselle tämä laaja harjoitus rakentaa juuri sen varmuuden, johon laskun pitää nojata. Ilman painetta ja hoputusta; lapsi valitsee mistä aloittaa. Yksi yhteenlasku kerrallaan, lisätään luvut yhteen ja merkitään vastaus. Vähitellen sekoitetut yhteenlaskut muuttuvat rauhalliseksi leikiksi. Tehtävä on ilmainen tulostettavaksi.`,

  `Tämä tehtävä tarjoaa sekaisin tulevia yhteenlaskuja, sommiteltuna niin, että pieni kiertää koko kentän. Vaihtelu — milloin pieni lasku, milloin isompi — kutsuu katsomaan lukuja tarkkaan sen sijaan, että lisäisi yhteen sokkona, ja summa kasvaa joka yhteenlaskussa. {N_PL} ilahduttavat sivua ja pitävät intoa yllä, kun laskut tekevät työn. 1. luokalla juuri tämä toisto joka suuntaan tekee yhteenlaskusta joustavan ja varman. Ei hoputusta: rauha, ei painetta ja tilaa yrittää. Pieni ottaa yhteenlaskut haluamassaan järjestyksessä, lisää luvut yhteen ja kirjoittaa vastauksen. Vähitellen kaikki loksahtaa kohdalleen — ja {N_PL} juhlivat hiljaa reunalta. Ilmainen tulostettavaksi aina.`,

  `Lapsille, jotka ovat valmiita lisäämään kaiken yhteen, tämä tehtävä on kaunis päätös: yhteenlaskut tulevat sekaisin, jotta koko harjoittelu pääsee peliin yhdellä kertaa. Pieni tunnistaa pieniä laskuja, kohtaa toisia hieman isompia ja huomaa osaavansa jo ne kaikki. {N_PL} tekevät sivusta iloisen ja kutsuvan, kun luvut ovat akselina ja summa kasvaa. 1. luokalla tämä laaja toisto tekee laskusta kestävän — yhteenlaskun pitää palvella joka suuntaan. Aikaa on niin paljon kuin tarvitsee, ei painetta ja täysi vapaus valita järjestys. Lasku laskulta pieni lisää luvut yhteen ja merkitsee summan, {N_GEN} katsoessa lämpimästi. Näin harjoitus päättyy puhtaaseen ja rauhalliseen varmuuteen. Ilmainen tulostettavaksi.`,
];

const P2_MX = [
  `Vinkki: anna pienen valita, mistä yhteenlaskusta aloittaa. Tämä vapaus tuo rauhaa ja merkitystä harjoitukseen. Jotkin laskut ovat helpompia kuin toiset, ja juuri sekoitus — {N_PART_PL} mukavana seurana — tekee kaikesta hauskaa. Tehtävä tulostuu ilmaiseksi: aloittakaa vain, kun tekee mieli kotona.`,

  `Jumittuiko jokin yhteenlasku? Ota muutama pikkuesine — tai käytä tehtävän {N_PART_PL} — ja lisätkää luvut yhdessä yhteen. Kun summan löytää silloin tällöin laskemalla, lasku säilyttää koko merkityksensä pienelle. Kaikki tehtävät tulostuvat ilmaiseksi, ja tauko on aina sallittu — kaikki rauhassa, lapsen tahdissa.`,

  `Sekoitettu harjoittelu toimii parhaiten pienissä erissä: muutama yhteenlasku, pieni tauko, ja taas muutama. Näin se pysyy raikkaana ja hauskana loppuun asti. Ei painetta, ei hoputusta — vain rauhallista yhteenlaskua, {N_PART_PL} iloisena seurana sivulla. Tulosta tehtävä ilmaiseksi ja paloittele harjoitus niin kuin päivääsi sopii.`,

  `Vuorotelkaa vapaasti tehtävää ja leikkiä: sano yhteenlasku ääneen, ja anna pienen vastata tai koota se {N_GEN} avulla tai pikkuesineillä. Yhteen lisääminen ääneen, paperin vierellä, kiinnittää laskut paremmin mieleen. Ei sen tarvitse olla täydellistä — tärkeintä on harjoitus. Entä tehtävät? Ilmaisia tulostettaviksi, niin monta kertaa kuin haluat.`,

  `Kysy silloin tällöin, mistä yhteenlaskusta pieni piti eniten. Niistä puhuminen auttaa muistamaan paremmin, ja tehtävän sekoitus antaa runsaasti valinnanvaraa — {N_PART_PL} värikkäänä seurana. Kaikki rauhassa, omassa tahdissa, ja koska tehtävä on ilmainen tulostettavaksi, uusi kierros odottaa aina nurkan takana.`,

  `Vielä yksi kaunis harjoitus: löytääkö pieni kaksi yhteenlaskua, joilla on sama summa, esimerkiksi neljä plus yksi ja kaksi plus kolme? Näiden yhteyksien etsiminen tekee yhteenlaskusta hyvin varman ja herättää luvut eloon. Ilman stressiä, vain jaettua uteliaisuutta — ja kun {N_PL} ovat sivulla, jahdista tulee vielä hauskempi. Tehtävät tulostuvat ilmaiseksi kotona.`,

  `Lopuksi anna pienen keksiä yhteenlasku {N_GEN} avulla ja antaa se sinun ratkaistavaksi. Laskun kokoaminen alusta loppuun näyttää, kuinka hyvin asia on hallussa. Kaikki tehtävät ovat ilmaisia — pelatkaa netissä tai tulostakaa keittiön pöydälle — ja varmuus yhteenlaskussa kasvaa vähitellen, yksi pieni tehtävä kerrallaan.`,
];

const H1 = {
  'image-image': 'Yhteenlasku: {H1} – {GRADE}',
  'image-number': 'Kuvat ja luku yhteen: {H1} – {GRADE}',
  'find-addend': 'Etsi puuttuva luku: {H1} – {GRADE}',
  'mixed': 'Yhteenlaskua sekaisin: {H1} – {GRADE}',
};

const CAR = {
  'image-image': 'Yhteenlasku – ',
  'image-number': 'Kuvat ja luku yhteen – ',
  'find-addend': 'Puuttuva luku – ',
  'mixed': 'Yhteenlaskua sekaisin – ',
};

module.exports = {
  type: 'addition',
  eyebrow: 'Tehtävä: Yhteenlasku',
  strand: 'Luvut ja laskutoimitukset',
  slotWord: 'kuvat',
  h1: (mk, lvl) =>
    H1[mk].replace('{GRADE}', lvl === '2-luokka' ? '2. luokan oppilaille' : '1. luokan oppilaille'),
  carousel: (mk, h1Display) => (CAR[mk] || '') + h1Display,
  modes: {
    'image-image': { SKEL: SKEL_II, P2: P2_II },
    'image-number': { SKEL: SKEL_IN, P2: P2_IN },
    'find-addend': { SKEL: SKEL_FA, P2: P2_FA },
    'mixed': { SKEL: SKEL_MX, P2: P2_MX },
  },
  P3: `Pitikö pieni näistä yhteenlaskuista? Silloin tutkittavaa riittää vielä paljon yhdessä. Vilkaiskaa tehtäviä, joissa on {nb1}, jolloin pieni voi jatkaa harjoittelua samalla rauhalla, tai kokeilkaa jotakin, jossa on {nb2}, pienen vaihtelun vuoksi. Vaihtamalla teemaa silloin tällöin lasku pysyy elävänä, ja pieni jatkaa yhteen lisäämistä mielellään ja näkee summan kasvavan. Kun lapsi laskee ja lisää {N_PART_PL} yhteen, koko kokoelma on täysin ilmainen: pelatkaa tehtävät netissä tai tulostakaa ja tehkää ne pöydän ääressä kotona. Rauhaa ja aikaa on niin paljon kuin tarvitsee, ilman painetta ja lapsen omaan tahtiin. Näin pieni rakentaa askel askeleelta varmuuden yhteenlaskuun.`,
};
