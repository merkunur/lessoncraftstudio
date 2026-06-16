/**
 * fi-readiness-math-worksheet.js — suomenkielinen (fi) laskeutumissivun teksti
 * matematiikkatehtävälle (math-worksheet). STANDARD-BEARING (1.–2. luokka, OPS 2014,
 * sisältöalue Luvut ja laskutoimitukset). HUOM: tämä config EI vie level- eikä standard-kenttää
 * — ne tulevat per-koordinaatti-annotaatiosta (generaattori injektoi co.level / co.standard;
 * lukualue jakaa koordinaatit 1-luokka / 2-luokka -kaistaan).
 *
 * KASVO = PIILOTETTU ARVO, ILMAN VALMISTA AVAINTA: jokainen kuva tarkoittaa salaista lukua,
 * jonka lapsi PÄÄTTELEE itse SUORAAN LASKUISTA — mitään koodia tai avainta ei anneta. Lapsi
 * selvittää, mikä luku kukin kuva on, sijoittaa luvut paikoilleen ja täydentää laskun.
 *
 * KAKSI tilaa — lapsi PÄÄTTELEE kunkin kuvan arvon ja ratkaisee laskun:
 *   two-symbols-add-sub   (token "Päättele kahdella kuvalla"): kaksi erilaista kuvaa ja yksi
 *                          merkki; yksi ainoa lasku; ensimmäinen kosketus kuva-lukuihin.
 *   three-symbols-add-sub (token "Päättele kolmella kuvalla"): kolme erilaista kuvaa ja kaksi
 *                          merkkiä; pidempi lasku; välitulos pidetään mielessä.
 *
 * KRIITTINEN AITA — 3 KASVOA (math-worksheet = PIILOTETTU ARVO, EI avainta; muut kaksi ovat
 * sisar-tyyppejä). math-worksheet OMISTAA: päättele kunkin kuvan arvo / mikä luku kukin kuva on /
 * ratkaise ILMAN valmista avainta / päättely / mikä arvo kullakin kuvalla on.
 * KIELLETYT (kuuluvat code-additioniin + math-puzzleen): koodi, avain, salasana, salakoodi
 * (code-addition ANTAA avaimen — tämä tyyppi EI) JA kuva paljastuu, palapeli, kuva ilmestyy,
 * paljastuu (se on math-puzzlen kuvan paljastuminen). Lapsi PÄÄTTELEE kunkin kuvan arvon
 * järkeilemällä laskujen yli; mitään ei pureta annetusta avaimesta eikä piilokuvaa paljasteta.
 *
 * Kahden ja kolmen kuvan tilat ovat MODE-TRUE: two-symbols OMISTAA "kahdella kuvalla / kaksi
 * erilaista kuvaa", three-symbols OMISTAA "kolmella kuvalla / kolme erilaista kuvaa".
 *
 * Teksti on LUKUALUE-AGNOSTINEN: lukualue elää SERP-otsikossa, EI tässä leipätekstissä. Ei
 * kovakoodattua lukualuetta, ei numeroita. Teeman substantiivi tulee aina fi-render.js:n
 * paikkamerkeistä:
 *   {H1}        nominatiivin monikko, isolla (otsikko/karuselli/sivun H1)
 *   {N_PL}      nominatiivin monikko, pienellä — SUBJEKTI ("{N_PL} ovat lukuja")
 *   {N_PART_PL} partitiivin monikko, pienellä — laskemisen/päättelyn OBJEKTI ("päättele {N_PART_PL} arvot")
 *   {N_GEN}     genetiivin monikko, pienellä — "{N_GEN} arvot"
 *
 * Ei kovakoodattua teeman substantiivia. Ei numeroita. [NSR-FLAG][fi] §17.5.1.
 */
'use strict';

const SKEL_TWO = [
  `Tällä tehtävällä kuvat ovat muuttuneet luvuiksi: jokainen kuva tarkoittaa lukua, jonka pieni laskijasi joutuu päättelemään itse, sillä mitään valmista avainta ei anneta vastausta varten. Joka laskussa kaksi erilaista {N_GEN} kuvaa ottaa numeroiden paikan, yhdistettynä yhdellä merkillä — milloin lisätään yhteen, milloin otetaan pois. Lapsen tehtävä on päätellä, mikä luku kukin kuva on, järkeilemällä suoraan itse laskusta, sijoittaa kuvien tilalle niiden luvut ja täydentää sitten lasku. Luvut pysyvät pieninä, juuri sopivina sille, joka ottaa ensiaskeleitaan laskussa. Tämä on pieni päättelypulma leikiksi naamioituna, jossa kuvat muuttuvat luvuiksi päättelyä varten. Ei ajanottoa, ei pelättävää pistemäärää: lapsi etsii arvon ja laskee rauhassa, omaan tahtiinsa. Tehtävä on ilmainen ja helppo tulostaa.`,

  `Mikä luku tämä kuva on? Sitä nämä laskut kysyvät, kun kaksi erilaista kuvaa on numeroiden tilalla. Jokainen kuva kätkee arvon, ja sama kuva tarkoittaa aina samaa lukua: kun arvo on kerran päätelty yhdessä kohdassa, se auttaa taas koko muun tehtävän ajan. Joka laskussa pieni kohtaa kaksi {N_PART_PL} yhteen lisättäväksi tai toisistaan vähennettäväksi, aina pienillä luvuilla, yhdellä ainoalla merkillä kahden välissä. Ensin hän päättelee arvon, sitten laskee ja kirjoittaa tuloksen. Tärkeintä on, ettei mikään tule valmiina, mikään avain ei tee työtä hänen puolestaan: hänen on itse järkeiltävä. Ei kelloa eikä arvosanaa, vain rauhallinen ilo ajatella ja tulla pikkuisen viisaammaksi, lasku laskulta. Tehtävä on tulostettavaksi ja ilmainen.`,

  `Lasku voi mainiosti koostua kuvista numeroiden sijaan. Tässä jokainen {N_GEN} kuva säilyttää salaisen lukunsa, ja lapsen täytyy päätellä piilotettu arvo ilman minkäänlaista avainta avuksi. Kaksi kuvaa kerrallaan: ne lisätään yhteen tai toinen vähennetään toisesta, ja etsitään tulos. Koska luvut pysyvät pieninä, lapsi voi keskittää koko tarmonsa päivän kauniiseen ajatukseen: kuva voi olla luvun tilalla. Se on hänen ensimmäinen askeleensa ajattelutapaan, jonka isommat kohtaavat myöhemmin oikeissa yhtälöissä — mutta täällä lempeänä ja kuvitettuna versiona. Ei kelloa, ei pistemäärää: hän päättelee arvot ja laskee niin kauan kuin haluaa. Tehtävä on ilmainen ja valmiina tulostettavaksi.`,

  `Tällä tehtävällä luvut leikkivät piilosta: ne ovat naamioituneet {N_GEN} kuviksi, ja lapsen pitää löytää ne uudelleen. Jokainen lasku näyttää kaksi erilaista kuvaa yhden ainoan merkin erottamana, plus tai miinus, ja jokainen kuva kätkee arvon. Heti kun pieni oivaltaa, mikä luku kukin kuva on, hän sijoittaa kuvien tilalle niiden luvut ja täydentää laskun, aina pienin luvuin, jotta päässälasku pysyy mukana rasittumatta. Matkan varrella hän huomaa arvokkaan säännön: sama kuva tarkoittaa aina samaa, oli se missä laskussa tahansa. Ja koska mitään ei tule valmiina — ei avainta — hänen on todella itse järkeiltävä. {N_PL} tekevät sivusta iloisen, ja koska kello ei käy, lapsella on kaikki aika ajatella tarkkaan. Tulostettavaksi ja ilmaiseksi.`,

  `Kaksi kuvaa, yksi tulos: tällaisia ovat tämän tehtävän laskut, joissa lapsi laskee {N_GEN} kuvilla numeroiden sijaan. Jokainen kuva kätkee luvun, ja hänen ensimmäinen tehtävänsä on päätellä se arvo, joka piiloutuu kunkin kuvan taakse, järkeillen aivan itse, ilman avainta. Sitten tulee lasku: jotkin ovat yhteenlaskuja, toiset vähennyslaskuja, ja luvut pysyvät aina pieninä. Koska laskussa on vain yksi kuvapari, tämä on rauhoittava ensikosketus kuva-lukuihin — riittävän yksinkertainen, jotta lapsi pitää ajatuksen mielessä tulokseen asti. Ei pistemäärää tavoiteltavaksi, ei hoputtavaa kelloa: vain tyyni ilo ratkaista yksi lasku toisensa jälkeen, omaan tahtiin. Tehtävä on ilmainen ja tulostettavaksi.`,

  `Tässä yhteen- ja vähennyslasku muodostavat parin {N_GEN} kanssa: joka laskussa on kaksi kuvaa, ja kukin kuva kätkee luvun. Lapsi päättelee arvon, palauttaa luvun paikalleen ja laskee — se on hyvin yksinkertaista, ja silti tavattoman fiksua. Huomaamattaan hän harjoittelee kahta asiaa yhtä aikaa: laskemista varmasti pienillä luvuilla ja sen ymmärtämistä jo varhain, että merkki voi olla luvun tilalla. Monelle lapselle tämä tuntuu salapoliisin työltä: etsitään kuvaan kätketty johtolanka, ja loppu tulee melkein itsestään — ilman että mikään avain tekee työtä heidän puolestaan. Tehtävän voi ratkaista siinä järjestyksessä kuin haluaa, ilman ajanottoa ja arvosanaa. Kun kuvia on vain kaksi laskussa, harjoitus pysyy kevyenä. Tehtävä on tulostettavaksi ja ilmainen.`,

  `Entä jos kuva olisikin luku? Tässä tehtävässä on juuri näin: {N_PL} ovat laskuissa numeroiden tilalla, ja jokainen kuva kätkee arvonsa. Lapsi katsoo laskun kahta kuvaa, arvaa päättelemällä, mitä ne ovat — ilman mitään avainta ohjaamassa — ja lisää sitten yhteen tai vähentää, aina pienin luvuin. Se kuulostaa yksinkertaiselta, mutta on suuri lapsen kokoinen oivallus: se, että jokin saa olla luvun paikalla, on tulevan matematiikan pieni siemen. Ja koska kaikki on kääritty ystävällisiin kuviin, se tuntuu leikiltä. Hän saa laskea sormilla, tehdä pieniä viivoja tai laskea päässä — jokainen polku tulokseen on tervetullut, eikä aikaa koskaan mitata. Tehtävä on ilmainen ja valmiina tulostettavaksi.`,

  `Nämä {N_GEN} laskut harjoittavat yhteen- ja vähennyslaskua tavalla, jota harva lapsi on vielä kohdannut: kuvat ovat lukuja. Joka laskussa on kaksi erilaista kuvaa ja yksi ainoa merkki, ja ennen kuin voi laskea, lapsen täytyy päätellä se arvo, jonka kukin kuva kätkee. Mitään avainta ei hänelle tarjota: päättelemällä hän löytää luvut uudelleen. Mikä ilo aina, kun kuva luovuttaa lukunsa — ja koska sama kuva tarkoittaa aina samaa, lasku selkenee yhä enemmän. Luvut pysyvät pieninä, täydellisinä lapselle, joka opettelee ensimmäisiä laskujaan. Ei arvosanaa, ei kelloa, ei painetta: vain kuva-lukuja päätelläksesi, omaan tahtiin. Tehtävä on tulostettavaksi ja ilmainen.`,
];

const P2_TWO = [
  `Kuvitettujen laskujen kaunis puoli on, että ne tekevät abstraktista konkreettista: lapsi näkee luvut {N_GEN} kuvina, ja heti tekee mieli päätellä. Anna hänen sanoa arvo ääneen — "tämä kuva on neljä!" — ennen kuin hän laskee. Tehtävä on ilmainen: sen voi ratkaista ruudulla tai tulostaa kynällä laskettavaksi, ilman valmista avainta annettuna.`,

  `Aloita siitä laskusta, joka näyttää helpoimmalta: pieni voitto alussa antaa rohkeutta jatkaa. Jos jokin lasku tuntuu vastustavan, auta lasta päättelemään ensin kunkin {N_GEN} kuvan arvo; sen jälkeen lasku tekee itse itsensä melkein valmiiksi. Tehtävä ei maksa mitään, ja sen voi ratkaista ruudulla tai tulostaa pdf:nä rauhalliseen hetkeen.`,

  `Kun kuvia on vain kaksi laskua kohden, tämä tehtävä sopii täydellisesti ensikosketukseen kuva-lukuihin. Lapsi ei tarvitse muuta kuin yhteen- ja vähennyslaskua pienin luvuin — uteliaisuus hoitaa loput. Ei arvosanaa, ei kelloa: kaikki aika päätellä {N_GEN} arvot. Lataa tehtävä ilmaiseksi, tulosta tai ratkaise suoraan ruudulla, kuten haluat.`,

  `Keskustelkaa tehtävästä yhdessä: "Mikä luku tämä kuva on? Miten sen päättelit?" Kun lapsi selittää oman ajattelunsa {N_GEN} arvoista, tekemisen tapa painuu paljon paremmin mieleen. Ja muista, että virhe on vain uusi yritys. Tehtävä on vapaasti käytettävissä — tulosta keittiön pöydälle tai anna hänen ratkaista se tabletilla maksamatta senttiäkään.`,

  `Kuvitettu lasku on lempeä silta sormella osoittamisen ja oikean laskemisen välillä: kuvat pitävät konkreettisen, luvut tekevät työn. Anna lapsen ratkaista laskut siinä järjestyksessä kuin haluaa ja laskea sormilla, jos se auttaa. Voit tulostaa tehtävän ilmaiseksi tai avata sen ruudulla — kummallakin tavalla, ilman kelloa ja pistemäärää, hän päättelee {N_GEN} arvot rauhassa.`,

  `Jos lapsi on jo kotonaan pienissä laskuissa, {N_GEN} kuva-luvut ovat uusi ja hauska haaste ilman että mikään muuttuu vaikeammaksi: luvut pysyvät pieninä, mutta ne täytyy ensin päätellä kunkin kuvan takaa, ilman avainta. Näin harjoitetaan laskua ja päättelyä yhtä aikaa. Tehtävä on ilmainen, tulostettavaksi tai ruudulla ratkaistavaksi, ja sen toistaa mielellään muilla teemoilla.`,

  `Yksinkertainen idea kotiin: anna lapsen keksiä sinulle kuvalasku, päättäen itse, mitkä luvut {N_PL} ovat. Laskun rakentaminen alusta loppuun näyttää todella, että ajatus on ymmärretty. Tehtävä taas on ilmainen tässä sivulla — tulosta tai laske suoraan ruudulla, omaan tahtiin ja ilman kelloa.`,
];

const SKEL_THREE = [
  `Tässä tehtävässä laskussa ei olekaan kaksi vaan kolme kuvaa: {N_PL} asettuvat riviin plus- ja miinusmerkkien kanssa keskellä, ja lapsi laskee vasemmalta oikealle. Ensin hän päättelee arvon, jonka kukin kuva kätkee — ilman mitään avainta avuksi — sitten laskee kaksi ensimmäistä lukua ja pitää tuon välituloksen mielessä, kun kolmas kuva saapuu. Juuri tämä, laskemisen jatkaminen mielessä pidetystä tuloksesta, tekee laskusta pidemmän, ja täällä sitä harjoitellaan pienin, ystävällisin askelin, kaikkien lukujen pysyessä pieninä. Sama kuva tarkoittaa aina samaa, joten kokonaiskuva kasvaa matkan varrella. Ei kelloa eikä arvosanaa: vain kolme lukua, yksi tulos ja kaikki aika päätellä. Tehtävä on ilmainen ja tulostettavaksi.`,

  `Kolme lukua peräkkäin — siinä tämän tehtävän haaste, kun kolme erilaista {N_GEN} kuvaa kätkee luvut. Jokainen lasku koostuu kolmesta kuvasta, joiden välissä on plus tai miinus, ja lapsi etenee vasemmalta oikealle: ensin kaksi ensimmäistä kuvaa, sitten tulos kolmannen kanssa. Matkalla on pidettävä välitulos mielessä — pieni muistiharjoitus, joka vahvistaa laskua melkoisesti. Koska kaikki arvot pysyvät pieninä, hän voi keskittyä matkaan laskun läpi sen sijaan, että kamppailisi suurten lukujen kanssa. Ja koska mitään avainta ei anneta, juuri päättelemällä hän löytää kunkin arvon. Aikaa ei mitata, arvosanaa ei lasketa: lapsi laskee luottavaisesti, omaan tahtiin. Tehtävä on tulostettavaksi ja ilmainen.`,

  `Jos lapsi osaa jo laskea kahdella kuvalla, tässä on aivan luonteva seuraava askel: kolmen luvun laskut, joissa kolme erilaista {N_GEN} kuvaa on numeroiden tilalla. Hänen täytyy ensin päätellä kunkin kuvan taakse kätketty arvo, ilman avainta, ja sitten kulkea laskun läpi — vasemmalta oikealle, yksi luku toisensa jälkeen. Kaksi ensimmäistä kuvaa antavat osatuloksen, ja juuri sillä hän jatkaa, kun kolmas kuva saapuu. Näin lapsi oppii pitämään luvun mielessä työskennellessään — taito, joka kantaa pitkälle koulun matematiikassa. Luvut pysyvät pieninä, joten laskut pysyvät ystävällisinä loppuun asti. Ja kuten aina: ei kelloa, ei arvosanaa, vain rauha ajatella tarkkaan. Tehtävä on ilmainen ja tulostettavaksi.`,

  `Tässä laskun matka pitenee hieman: kolme {N_GEN} kuvaa joka laskussa, yhdistettynä plus- ja miinusmerkein. Lapsi laskee vasemmalta oikealle ja oivaltaa pian pidempien laskujen kepin: otetaan vain yksi luku kerrallaan. Ensin kaksi kuvaa, sitten mielessä pidetty tulos, ja lopuksi kolmas kuva, joka vie loppuun asti. Jokainen kuva kätkee kiinteän arvonsa, ja kun se on kerran päätelty, se pätee koko laskun ajan; mikään avain ei sitä anna, hän päättelee sen itse. Tästä syntyy kaunis järjestyksen ja kokonaiskuvan tunne. Luvut pysyvät pieninä, jotta pää saa keskittyä järjestykseen vaikean laskun sijaan. Ei kelloa eikä arvosanaa: vain hyvä ja tyyni keskittyminen. Tehtävä on tulostettavaksi ja ilmainen.`,

  `Plus, miinus — ja vielä yksi luku lisää! Tässä tehtävässä jokainen lasku koostuu kolmesta kuvasta, ja kolme erilaista {N_GEN} kuvaa kätkee arvot. Lapsi löytää ensin luvun kunkin kuvan takaa — päättelemällä, ilman avainta — ja laskee sitten vasemmalta oikealle. Jännittävä hetki on keskellä: kahden ensimmäisen luvun jälkeen hän pitää tuloksen mielessä, ja se täytyy muistaa ja käyttää, kun viimeinen luku saapuu. Tämä harjoitus — laskemisen jatkaminen siitä, minkä juuri löysi — on tasan se, mitä pidemmät laskut myöhemmin koulussa pyytävät. Täällä sitä harjoitellaan lempeästi, ystävällisin kuvin ja pienin luvuin. Ei kelloa, ei arvosanaa sivulla: vain kolme lukua odottamassa laskettavaksi. Ilmainen ja tulostettavaksi.`,

  `Näissä {N_GEN} laskuissa on kolme lukua, ja se muuttaa kaiken, hyvällä tavalla: kyse ei ole enää vain oikein laskemisesta, vaan myös laskun läpi kulkevan matkan huolellisesta seuraamisesta. Lapsi päättelee arvon kunkin kuvan takaa — ilman avainta — laskee kaksi ensimmäistä lukua yhteen ja vie osatuloksen viimeiseen lukuun asti. Jos jokin menee matkalla sekaisin, laskun voi aloittaa alusta — se kuuluu oppimiseen. Koska kaikki luvut pysyvät pieninä, jää tilaa varsinaiselle päättelytyölle. {N_PL} tekevät sivusta kutsuvan, ja ilman kelloa ja arvosanaa lapsi voi syventyä niin pitkäksi aikaa kuin haluaa, kunnes jokainen tulos on varma. Tehtävä on tulostettavaksi ja ilmainen.`,

  `Lasku voi mainiosti olla pieni polku: tässä lapsi kulkee kolmen luvun läpi, ensimmäisestä kuvasta osatulokseen ja aina lopputulokseen asti. Kolme erilaista {N_GEN} kuvaa kätkee luvut, ja koska sama kuva tarkoittaa aina samaa, lapsi voi luottaa omiin oivalluksiinsa — jotka hän päättelee itse, sillä mitään avainta ei anneta. Polku kulkee vasemmalta oikealle: ensin lisätään yhteen tai vähennetään kaksi ensimmäistä kuvaa, sitten lasketaan eteenpäin kolmannen kanssa. Matkalla lapsi harjoittelee juuri sitä, mikä erottaa pitkät laskut lyhyistä: luvun pitäminen mielessä, kun työstää seuraavaa. Kaikki etenee pienin luvuin, jotta jalat eivät väsy polulla. Ei arvosanaa, ei kelloa: yksi tyyni askel kerrallaan kohti tulosta. Ilmainen ja tulostettavaksi.`,

  `Kolme kuvaa, kaksi merkkiä, yksi tulos: tämän tehtävän laskut antavat hieman enemmän purtavaa — mukavalla tavalla. Kolme erilaista {N_GEN} kuvaa ottaa lukujen paikan, ja ennen kuin voi laskea, on pääteltävä se arvo, jonka kukin kuva kätkee, ilman mitään avainta. Sitten edetään vasemmalta oikealle: kaksi ensimmäistä lukua muuttuvat osatulokseksi, ja kolmas luku kädessä lapsi pääsee vihdoin tulokseen. Tämä harjoittaa yhtä aikaa yhteen- ja vähennyslaskua pienin luvuin ja arvokasta taitoa pitää luku mielessä matkan varrella. Jokainen onnistunut lasku herättää halun seuraavaan. Ja koska kello eikä arvosana sekaannu väliin, lapsi valitsee itse oman tahtinsa pitkin sivua. Tehtävä on ilmainen ja tulostettavaksi.`,
];

const P2_THREE = [
  `Kolme {N_GEN} kuvaa voi ensi näkemältä tuntua liialta, mutta kikka on yksinkertainen: yksi luku kerrallaan, aina vasemmalta oikealle. Muistuta lasta sanomaan osatulos ääneen matkan varrella — sitä on paljon helpompi pitää mielessä, kun viimeistä lukua lasketaan. Tehtävä on ilmainen, ruudulla ratkaistavaksi tai tulostettavaksi kotoiseen laskuhetkeen.`,

  `Auta lasta pääsemään hyvin alkuun etsimällä {N_GEN} arvot ensin yhdessä: heti kun kullakin kuvalla on lukunsa, loppu on pelkkää laskemista. Sen jälkeen useimmat lapset päättävät laskun itse — ja ylpeys näkyy pian. Voit tulostaa tehtävän vapaasti tai antaa hänen ratkaista sen suoraan ruudulla, maksutta ja ilman ajan painetta.`,

  `Tärkeintä tällä sivulla ei ole tulos vaan polku sinne asti: laskemisen jatkaminen mielessä pidetystä tuloksesta on taito, joka auttaa monta kertaa koulussa. Kun {N_GEN} arvot on kerran päätelty, kehu siis tekemisen tapaa — "hienoa, pidit luvun mielessä matkan varrella!" Tehtävä on ilmainen sivulla, valmiina tulostettavaksi tai ruudulla ratkaistavaksi, kun sopii.`,

  `Jos osatulos karkaa, se on aivan tavallista alussa. Anna lapsen kirjoittaa tuo pieni luku laskun yläpuolelle tai käyttää {N_PART_PL} muistutuksena — sen tuen ottaa pois vähitellen, kun varmuus kasvaa. Tehtävä on ilmainen kummassakin muodossa: tulosta pdf:nä tai ratkaise tabletilla tai tietokoneella, omaan tahtiin.`,

  `Kolme {N_GEN} kuvaa synnyttää hyviä keskusteluja: kysy lapselta, minkä luvun hän laski ensin ja miksi. Järjestyksen pukeminen sanoiksi, vasemmalta oikealle, selkeyttää ajattelua ja tekee virheistä harvinaisempia. Kun olette valmiit, kokoelmassa odottaa muita teemoja. Tämä tehtävä ei maksa mitään — tulosta tai laske suoraan selaimessa.`,

  `Tehtävä sopii lapsille, jotka tuntevat jo yhteen- ja vähennyslaskun pienin luvuin ja ovat valmiita pikkuaskeleeseen eteenpäin. Kolme {N_GEN} kuvaa harjoittaa työmuistia ilman että luvut muuttuvat vaikeammiksi — kaunis tasapaino ensimmäisiin vuosiin. Käytä tehtävää täysin vapaasti: tulosta reppuun tai ratkaise ruudulla koulun jälkeen, ilman kelloa ja arvosanaa.`,

  `Hyvä tapa pidempiin laskuihin: anna lapsen tarkistaa tulos laskemalla lasku {N_GEN} arvoilla vielä kerran — jos tulos on sama, se on varma. Tämä tarkistus antaa luottamusta seuraavaan laskuun. Löydät tehtävän ilmaiseksi tästä sivulta; se tulostuu helposti ja ratkeaa yhtä hyvin ruudulla, kun laskemisen halu iskee.`,
];

const H1 = {
  'two-symbols-add-sub': 'Päättele kuvien arvot, kaksi kuvaa: {H1} – {GRADE}',
  'three-symbols-add-sub': 'Päättele kuvien arvot, kolme kuvaa: {H1} – {GRADE}',
};

const CAR = {
  'two-symbols-add-sub': 'Päättele kahdella kuvalla – ',
  'three-symbols-add-sub': 'Päättele kolmella kuvalla – ',
};

module.exports = {
  type: 'math-worksheet',
  eyebrow: 'Tehtävä: Matematiikkatehtävä',
  strand: 'Luvut ja laskutoimitukset',
  slotWord: 'kuvat',
  h1: (mk, lvl) =>
    H1[mk].replace('{GRADE}', lvl === '2-luokka' ? '2. luokan oppilaille' : '1. luokan oppilaille'),
  carousel: (mk, h1Display) => (CAR[mk] || '') + h1Display,
  modes: {
    'two-symbols-add-sub': { SKEL: SKEL_TWO, P2: P2_TWO },
    'three-symbols-add-sub': { SKEL: SKEL_THREE, P2: P2_THREE },
  },
  P3: `Piditkö pieni näistä kuvilla laskettavista tehtävistä? Silloin tutkittavaa riittää vielä paljon: kokeilkaa myös tehtäviä, joissa on {nb1}, tai vilkaiskaa laskuja, joissa on {nb2} — jokainen teema antaa kuville uudet arvot päättelyä varten ja uudet laskut ratkaistaviksi. Koko {N_GEN} kokoelma on ilmainen: voitte ratkaista tehtävät suoraan ruudulla tai tulostaa ne kynällä laskettaviksi keittiön pöydän ääressä. Ei kelloa eikä arvosanaa, joten lapsi päättelee arvot ja laskee aivan omaan tahtiinsa — ja tulee vähitellen varmemmaksi yhteen- ja vähennyslaskussa lasku laskulta. Iloista päättelyä kuva-lukujen parissa, ilman valmista avainta ja ilman painetta!`,
};
