/**
 * fi-readiness-word-guess.js — suomenkielinen (fi) laskeutumissivun teksti "Arvaa sana" -tehtävälle.
 *
 * Tehtävä (Arvaa sana): kuva näytetään yhdessä sanansa kanssa, mutta sanasta PUUTTUU KIRJAIMIA.
 * Lapsi kirjoittaa puuttuvat kirjaimet ja täydentää sanan. STANDARD-BEARING (fi 1. luokka):
 * level on aina '1-luokka', mutta CC-koodi on irrotettu kaistasta — easy = K-tason taito
 * (L.K.2.d), normal = 1. luokan taito (L.1.2.d). Sisältöalue: Lukemisen perustaidot.
 *
 * KAKSI tilaa:
 *   easy   (helpot sanat): lyhyet, helpot sanat, joista puuttuu vain muutama kirjain.
 *   normal (haastavammat sanat): pidemmät, haastavammat sanat, joista puuttuu useampi kirjain.
 *
 * KRIITTINEN AITA #1 — AITA-A (Arvaa sana = PUUTTUVAT kirjaimet vs. Sanasekoitus = SEKAISIN
 * olevat kirjaimet). Sisartehtävä "word-scramble" järjestää sekoitetut kirjaimet uudelleen;
 * TÄMÄ tehtävä täydentää PUUTTUVAT kirjaimet. Arvaa sana OMISTAA puuttuvan kirjaimen kehyksen:
 * puuttuva kirjain / puuttuvat kirjaimet / täydennä sana / mitkä kirjaimet puuttuvat /
 * aukko sanassa / kirjoita puuttuvat kirjaimet. Sanan kirjaimet ovat OIKEASSA järjestyksessä
 * mutta osa on jätetty AUKOIKSI; lapsi täyttää aukot — mitään ei sekoiteta.
 * KIELLETYT (kuuluvat sanasekoitukseen): sekoitetut kirjaimet, sekaisin, väärässä
 * järjestyksessä, järjestä kirjaimet, muodosta sana kirjaimista, kirjainsekoitus.
 *
 * PITUUSSUHDE-kuri: saman teeman Arvaa sana -sivut jakavat SKEL:n, joten P2:n on oltava
 * SISÄLLÖKÄS (~60–75 sanaa) ja jokaisen tilan on luettava selvästi erilaiselta:
 *   easy   → lyhyet / helpot sanat / muutama puuttuva kirjain.
 *   normal → pidemmät / haastavammat sanat / useampi puuttuva kirjain.
 *
 * Teksti on KAISTA-AGNOSTINEN: ei numeroita. Teeman substantiivi (kuvat, joiden sanoja lapsi
 * tavaa) tulee aina fi-render.js:n paikkamerkeistä:
 *   {H1}        nominatiivin monikko, isolla (otsikko/karuselli/sivun H1)
 *   {N_PL}      nominatiivin monikko, pienellä — SUBJEKTI ("{N_PL} odottavat")
 *   {N_PART_PL} partitiivin monikko, pienellä — kirjoittamisen OBJEKTI ("kirjoita {N_PART_PL}")
 *   {N_GEN}     genetiivin monikko, pienellä — "{N_GEN} nimet" / "{N_GEN} kuvat"
 *
 * Ei kovakoodattua teeman substantiivia. Ei numeroita. [NSR-FLAG][fi] §17.5.1.
 */
'use strict';

const SKEL_EASY = [
  `Tällä tehtävällä pieni lukijasi täydentää sanoja, joista puuttuu kirjaimia. Jokaisen kuvan vieressä on sen sana, mutta yksi tai pari kohtaa on jätetty tyhjäksi pieneksi aukoksi. Lapsi katsoo kuvaa, sanoo sanan ja kirjoittaa puuttuvat kirjaimet täydentääkseen sen. Sanat on tähän valittu lyhyiksi ja helpoiksi, ja niistä puuttuu vain muutama kirjain — juuri sopivasti sille, joka vasta opettelee tavaamaan. Kuvina näkyvät {N_PL} auttavat tunnistamaan sanan ja keksimään, mitkä kirjaimet puuttuvat. Tämä sopii hyvin 1. luokalle, jolloin lukeminen ja kirjoittaminen alkavat yhdessä. Mikään ei kiirehdi: jokainen etenee omassa tahdissaan, ilman ajanottoa ja ilman arvosanaa. Joka sanassa pieni täyttää aukot ja kirjoittaa puuttuvat kirjaimet pieneen ruutuun. Tehtävä on täysin ilmainen, valmiina tulostettavaksi tai pelattavaksi netissä, kotona tai koulussa.`,

  `Tässä tehtävässä jokainen sana on melkein valmis — vain pari kirjainta puuttuu, ja lapsi täydentää ne. Kuva näyttää, mistä on kyse, sana on sen vieressä, ja aukkoihin pieni kirjoittaa puuttuvat kirjaimet. Koska sanat ovat lyhyitä ja helppoja ja niistä puuttuu vain muutama kirjain, sanan täydentäminen tuntuu turvalliselta ja palkitsevalta. Kuvina näkyvät {N_GEN} nimet ovat tuttuja, joten lapsi tunnistaa sanan nopeasti ja huomaa, mitkä kirjaimet ovat kadonneet. 1. luokan aloittajalle tämä on lempeä tie kirjoittamiseen: hän ei kirjoita koko sanaa tyhjästä, vaan täyttää vain aukot. Osoita {N_PART_PL} sormella ja sanokaa sana ääneen — puuttuva kirjain löytyy melkein itsestään. Ilman painetta, lapsen omaan tahtiin. Tehtävä on ilmainen ja tulostuu hetkessä keittiön pöydälle.`,

  `Mitkä kirjaimet puuttuvat? Tämä on tehtävän avainkysymys: jokaisessa sanassa on aukko, ja pieni täydentää sen. Kuva ja sana ovat rinnakkain, mutta osa kirjaimista on jätetty pois — lapsi sanoo sanan ja kirjoittaa puuttuvat kirjaimet kohdalleen. Sanat ovat lyhyitä ja helppoja, ja niistä puuttuu vain muutama kirjain, joten 1. luokan lapsi pääsee heti alkuun. Kuvina näkyvät {N_PL} antavat vihjeen: kun tietää, mikä sana on kyseessä, aukon täyttäminen käy luontevasti. Tämä on tärkeä askel, jolloin lukeminen ja oikeinkirjoitus alkavat tukea toisiaan. Kaikki rauhassa, ilman painetta ja lapsen omaan tahtiin. Yhä uudelleen pieni katsoo {N_PART_PL}, sanoo sanan ja kirjoittaa puuttuvat kirjaimet. Tulosta ilmaiseksi niin monta kertaa kuin haluat.`,

  `Kaipaatko hyvin lempeää sisäänkäyntiä kirjoittamiseen? Tässä pieni täydentää oikeita sanoja, mutta vain pari kirjainta kerrallaan: jokaisesta sanasta puuttuu muutama kirjain, ja lapsi kirjoittaa ne aukkoihin. Kuva näyttää sanan, jonka jälkeen täytyy vain keksiä, mitkä kirjaimet ovat kadonneet. Sanat on pidetty lyhyinä ja helppoina, joten 1. luokan aloittajalle tämä on kaunis polku: ei koko sanaa tyhjästä, vaan rauhallista aukkojen täyttämistä. Kuvina näkyvät {N_GEN} nimet ovat tuttuja, ja se tekee puuttuvan kirjaimen etsimisestä mukavaa. Sanokaa {N_PART_PL} yhdessä ääneen — näet oivalluksen saapuvan. Kaikki rauhassa, ilman painetta. Kaikki tehtävät ovat ilmaisia tulostettaviksi kotona.`,

  `Moni lapsi tunnistaa sanan jo ennen kuin osaa kirjoittaa sitä kokonaan — ja juuri siitä tämä tehtävä lähtee liikkeelle. Sanat näytetään melkein valmiina, mutta niistä puuttuu kirjaimia, jotka pieni täydentää. Kuva ja sana ovat vierekkäin, ja lapsi kirjoittaa puuttuvat kirjaimet aukkoihin. Koska sanat ovat lyhyitä ja helppoja ja niistä puuttuu vain muutama kirjain, kokemus on turvallinen heti ensimmäisestä sanasta. Kuvina näkyvät {N_PL} johdattavat oikealle jäljelle. Tämä on arvokas askel 1. luokalla, kun kirjoittaminen alkaa toden teolla. Kukaan ei vaadi kiirettä: vain rauha ajatella, ilman ajanottoa ja ilman arvosanaa. Joka sanassa pieni täyttää aukon ja kirjoittaa puuttuvat kirjaimet. Tehtävä on ilmainen ja valmiina tulostettavaksi.`,

  `Katso kuvaa, sano sana, täytä aukot — tämä on tehtävän rytmi, jossa jokaisesta sanasta puuttuu kirjaimia. Pieni tunnistaa kuvan, sanoo sanan mielessään ja kirjoittaa sitten puuttuvat kirjaimet kohdalleen. Sanat ovat lyhyitä ja helppoja, ja niistä puuttuu vain muutama kirjain, joten sanan täydentäminen pysyy kepeänä sille, joka vasta opettelee. Kuvina näkyvät {N_PL} antavat lämpimän vihjeen, ja luvun sijaan pääosassa ovat kirjaimet ja äänteet. Tämä sopii hyvin 1. luokan lapsille, jotka pitävät vielä siitä, että näkevät, mistä sana kertoo. Sanokaa {N_PART_PL} ääneen matkan varrella — se auttaa enemmän kuin äkkiä uskoisi. Ei kiirettä, omassa tahdissa. Ilmainen tulostettavaksi aina kun tekee mieli.`,

  `Silmät ja korvat ovat parhaat apuvälineet 1. luokalla, ja siksi tässä tehtävässä jokaisesta sanasta puuttuu kirjaimia, jotka pieni täydentää. Lapsi katsoo kuvaa, kuuntelee, miltä sana kuulostaa, ja kirjoittaa puuttuvat kirjaimet aukkoihin. Kun sanat ovat lyhyitä ja helppoja ja niistä puuttuu vain muutama kirjain, täydentäminen pysyy rauhallisena sille, joka vasta keksii ensimmäisiä sanoja. Kuvina näkyvät {N_GEN} nimet ovat tuttuja, joten oikea kirjain löytyy luontevasti. Sanokaa {N_PART_PL} ääneen yhdessä ja antakaa lapsen edetä omaan tahtiinsa — tehtävässä ei ole mitään painetta. Joka sanassa pieni täyttää aukon ja kirjoittaa puuttuvan kirjaimen. Vähitellen tavaamisesta tulee aitoa kirjoittamista. Tulosta ilmaiseksi, kotona tai koulussa.`,

  `Pohjimmiltaan tämä tehtävä tiivistyy yhteen asiaan: täydennä sana kirjoittamalla puuttuvat kirjaimet. Tällä tehtävällä pieni harjoittelee juuri sitä lyhyillä ja helpoilla sanoilla, joista puuttuu vain muutama kirjain. Lapsi katsoo kuvaa, sanoo sanan ja kirjoittaa puuttuvat kirjaimet aukkoihin. Tämä tapa on järkevä 1. luokalla, koska kirjoittaminen alkaa sen täydentämisestä, minkä lukija jo melkein osaa. Kuvina näkyvät {N_PL} antavat juuri sen vihjeen, jota tarvitaan. Sano {N_PART_PL} yhdessä ja kuunnelkaa, mikä kirjain puuttuu — yhteys tulee selväksi. Aikaa on niin paljon kuin tarvitsee, ilman painetta ja lapsen omaan tahtiin. Yhä uudelleen pieni täyttää aukot ja täydentää sanan. Tehtävä on ilmainen tulostettavaksi aina kun haluat.`,
];

const P2_EASY = [
  `Hyvä kotivinkki: anna pienen sanoa koko sana ääneen ennen kuin hän kirjoittaa puuttuvat kirjaimet. Kun sanat ovat lyhyitä ja helppoja ja niistä puuttuu vain muutama kirjain, aukon täyttäminen tuntuu kepeältä, ja kuvina näkyvät {N_PL} antavat heti vihjeen oikeasta sanasta. Osoita aukkoa sormella ja kysykää yhdessä, mikä kirjain siihen kuuluu — niin puuttuva kirjain löytyy ihan rauhassa. Tehtävä on ilmainen ja tulostuu hetkessä: istahtakaa pöydän ääreen, kun tekee mieli, ja täydentäkää yksi sana kerrallaan.`,

  `Onko pieni epävarma siitä, mikä kirjain puuttuu? Sanokaa silloin sana hitaasti ja kuunnelkaa jokainen äänne erikseen. Koska sanat ovat tässä lyhyitä ja helppoja, lapsi kuulee yleensä heti, mikä äänne jää aukkoon, ja kirjoittaa sen kohdalleen. Kuvina näkyvät {N_PART_PL} muistuttavat, mistä sanasta on kyse, jos hetkeksi unohtaa. Kaikki rauhassa, ilman painetta, ja vain pari puuttuvaa kirjainta kerrallaan. Tulosta tehtävä ilmaiseksi tai pelaa netissä, jos se on teille kätevämpää — uusi sana odottaa aina vieressä.`,

  `Hyvä puoli lyhyissä ja helpoissa sanoissa on, että pieni voi aina tarkistaa työnsä: kun puuttuvat kirjaimet on kirjoitettu, lukekaa koko sana yhdessä ääneen ja katsokaa, kuulostaako se oikealta. Jos jokin tuntuu hassulta, palataan rauhassa aukkoon ja mietitään, mikä kirjain sinne sopisi paremmin. Kuvina näkyvät {N_GEN} nimet auttavat varmistamaan, että sana on valmis. Tässä puuttuu vain muutama kirjain kerrallaan, joten korjaaminen on helppoa eikä mikään tunnu vaikealta. Lataa tehtävä ilmaiseksi tulostettavaksi ja jätä se pöydälle — yksi täydennetty sana on mukava hetki päivässä.`,

  `Haluatko mennä askeleen pidemmälle? Sano lyhyt, helppo sana ääneen ja anna pienen kirjoittaa siitä yksi kirjain kerrallaan, ihan kuin tehtävän aukkoja täytettäessä. Kuvina näkyvät {N_PL} sopivat tähän hyvin, koska ne ovat tuttuja eikä niistä puutu kuin muutama kirjain. Tämä yhdessä tekeminen näyttää selvästi, miten puuttuva kirjain löytää paikkansa. Ei painetta, ei hoputusta — vain rauhallista tavaamista lapsen omaan tahtiin. Kaikki tehtävät tulostuvat ilmaiseksi niin monta kertaa kuin haluat, jotta harjoitusta riittää aina lisää.`,

  `Jotkut lapset kirjoittavat aluksi väärän kirjaimen aukkoon. Ei se mitään: pyyhitään rauhassa pois, sanotaan sana uudelleen ääneen ja kuunnellaan, mikä äänne sinne oikeasti kuuluu. Koska sanat ovat lyhyitä ja helppoja ja niistä puuttuu vain muutama kirjain, korjaus käy nopeasti eikä lannista. Kuvina näkyvät {N_PART_PL} muistuttavat koko ajan, mikä sana on tavoitteena. Jokainen sana saa kestää oman aikansa, ilman painetta. Tulosta tehtävä ilmaiseksi ja säilytä se — on kiva nähdä puuttuvan kirjaimen osuvan kohdalleen ensi kerralla.`,

  `Anna pienen jokaisen sanan jälkeen kertoa, minkä kirjaimen hän kirjoitti aukkoon ja miksi: "tähän tuli ässä, koska sana alkaa sillä äänteellä". Kun puuttuva kirjain puetaan sanoiksi, se painuu paremmin mieleen, ja kuvina näkyvät {N_PL} pysyvät tukena, jos sana hetkeksi karkaa. Tässä on vain pari puuttuvaa kirjainta kerrallaan, joten selittäminen on helppoa ja hauskaa. Ilman stressiä, vain rauhallista harjoittelua askel kerrallaan. Ja koska tehtävät ovat ilmaisia, aina voi täydentää vielä yhden sanan.`,

  `Lopuksi rauhassa: lukekaa yhdessä, viimeisen kerran, kaikki täydennetyt sanat ääneen ja katsokaa {N_PART_PL}, jotta jokainen sana kuulostaa valmiilta. Näin pieni harjoittelee leikiten täydentämään sanoja ja huomaamaan, että aukkoihin kirjoitetut kirjaimet tekivät sanasta kokonaisen. Koska sanat ovat lyhyitä ja helppoja, tämä loppukierros tuntuu palkitsevalta eikä raskaalta. Tehtävä on ilmainen, pelattavaksi netissä tai tulostettavaksi paperille, jotta into puuttuvien kirjainten täydentämiseen kasvaa vähitellen siellä kotona.`,
];

const SKEL_NORMAL = [
  `Tällä tehtävällä pieni lukijasi ottaa seuraavan askeleen: sanat ovat pidempiä ja haastavampia, ja niistä puuttuu useampi kirjain täydennettäväksi. Jokaisen kuvan vieressä on sen sana, jossa on useampi aukko, ja lapsi sanoo sanan ja kirjoittaa puuttuvat kirjaimet kohdalleen. Koska puuttuvia kirjaimia on enemmän, lapsi joutuu kuuntelemaan sanaa tarkemmin ja miettimään, mikä kirjain mihinkin aukkoon kuuluu. Kuvina näkyvät {N_PL} antavat vihjeen, mutta varsinaisen työn tekevät korva ja kynä. Tämä sopii hyvin 1. luokalle, jolloin lukeminen ja kirjoittaminen vahvistuvat yhdessä. Mikään ei kiirehdi: jokainen etenee omassa tahdissaan, ilman ajanottoa ja ilman arvosanaa. Joka sanassa pieni täyttää useamman aukon ja täydentää sanan kokonaiseksi. Tehtävä on täysin ilmainen, valmiina tulostettavaksi tai pelattavaksi netissä, kotona tai koulussa.`,

  `Tässä tehtävässä sanat ovat astetta pidempiä ja haastavampia, ja niistä puuttuu useampi kirjain kerralla. Kuva näyttää, mistä on kyse, sana on sen vieressä, ja useaan aukkoon pieni kirjoittaa puuttuvat kirjaimet. Koska puuttuvia kirjaimia on enemmän, sanan täydentäminen vaatii hieman enemmän kuuntelua ja tarkkuutta — ja juuri se vie eteenpäin. Kuvina näkyvät {N_GEN} nimet auttavat tunnistamaan sanan, jolloin lapsi voi keskittyä siihen, mitkä kirjaimet ovat kadonneet. 1. luokan lukijalle tämä on hyvä haaste: hän ei kirjoita koko sanaa tyhjästä, mutta useampi aukko pitää ajatuksen virkeänä. Sanokaa {N_PART_PL} ääneen ja kuunnelkaa jokainen äänne — puuttuvat kirjaimet löytyvät yksi kerrallaan. Ilman painetta, lapsen omaan tahtiin. Tehtävä on ilmainen ja tulostuu hetkessä keittiön pöydälle.`,

  `Mitkä kirjaimet puuttuvat? Tässä tehtävässä kysymys vaatii hieman enemmän, sillä sanat ovat pidempiä ja niistä puuttuu useampi kirjain. Kuva ja sana ovat rinnakkain, mutta monta kirjainta on jätetty aukoiksi — lapsi sanoo sanan hitaasti ja kirjoittaa puuttuvat kirjaimet kohdalleen, yksi äänne kerrallaan. Koska sanat ovat haastavampia, 1. luokan lapsi pääsee venyttämään taitojaan turvallisesti. Kuvina näkyvät {N_PL} antavat vihjeen, mutta useampi aukko saa lapsen todella kuuntelemaan. Tämä on tärkeä askel, jolloin oikeinkirjoitus vahvistuu sana sanalta. Kaikki rauhassa, ilman painetta ja lapsen omaan tahtiin. Yhä uudelleen pieni katsoo {N_PART_PL}, sanoo sanan ja täyttää useamman aukon. Tulosta ilmaiseksi niin monta kertaa kuin haluat.`,

  `Onko pieni valmis hieman isompaan haasteeseen? Tässä sanat ovat pidempiä ja haastavampia, ja niistä puuttuu useampi kirjain kerralla. Kuva näyttää sanan, jonka jälkeen täytyy keksiä, mitkä kirjaimet kuuluvat moneen eri aukkoon. Useampi puuttuva kirjain saa lapsen miettimään tarkemmin, miltä sana kuulostaa alusta loppuun. Kuvina näkyvät {N_GEN} nimet ovat tuttuja, mikä antaa varman pohjan, jolta venyttää taitoja. 1. luokan lukijalle tämä on innostava askel: lapsi tuntee jo kirjaimet ja pääsee nyt kokoamaan pidempiä sanoja. Sanokaa {N_PART_PL} yhdessä ääneen ja edetkää aukko kerrallaan — kaikki rauhassa, ilman painetta. Kaikki tehtävät ovat ilmaisia tulostettaviksi kotona.`,

  `Moni lapsi on valmis pidempiin sanoihin pian sen jälkeen, kun lyhyet alkavat sujua — ja juuri sitä varten tämä tehtävä on tehty. Sanat ovat haastavampia, ja niistä puuttuu useampi kirjain, jotka pieni täydentää. Kuva ja sana ovat vierekkäin, ja lapsi kirjoittaa puuttuvat kirjaimet useaan aukkoon kuunnellen sanaa tarkasti. Koska puuttuvia kirjaimia on enemmän, jokainen täydennetty sana tuntuu aidolta saavutukselta. Kuvina näkyvät {N_PL} johdattavat oikealle jäljelle, mutta korva ja kynä viimeistelevät työn. Tämä on arvokas askel 1. luokalla, kun kirjoittaminen vahvistuu. Kukaan ei vaadi kiirettä: vain rauha ajatella, ilman ajanottoa ja ilman arvosanaa. Joka sanassa pieni täyttää useamman aukon ja täydentää sanan. Tehtävä on ilmainen ja valmiina tulostettavaksi.`,

  `Katso kuvaa, sano sana hitaasti, täytä aukot — tämä on tehtävän rytmi, mutta nyt sanat ovat pidempiä ja niistä puuttuu useampi kirjain. Pieni tunnistaa kuvan, sanoo sanan mielessään ja kirjoittaa puuttuvat kirjaimet moneen kohtaan kuunnellen jokaista äännettä. Koska sanat ovat haastavampia, täydentäminen kehittää tarkkaa kuuntelua ja oikeinkirjoitusta yhdellä kertaa. Kuvina näkyvät {N_PL} antavat lämpimän vihjeen, ja pääosassa ovat edelleen kirjaimet ja äänteet. Tämä sopii hyvin 1. luokan lapsille, jotka pääsevät jo kokoamaan pidempiä sanoja. Sanokaa {N_PART_PL} ääneen matkan varrella — se auttaa enemmän kuin äkkiä uskoisi, kun aukkoja on monta. Ei kiirettä, omassa tahdissa. Ilmainen tulostettavaksi aina kun tekee mieli.`,

  `Silmät ja korvat tekevät yhä enemmän työtä, kun sanat pitenevät — ja siksi tässä tehtävässä jokaisesta sanasta puuttuu useampi kirjain, jotka pieni täydentää. Lapsi katsoo kuvaa, kuuntelee, miltä haastavampi sana kuulostaa alusta loppuun, ja kirjoittaa puuttuvat kirjaimet useaan aukkoon. Koska puuttuvia kirjaimia on enemmän, lapsen täytyy seurata sanaa äänne äänteeltä, ja juuri se vahvistaa taitoa. Kuvina näkyvät {N_GEN} nimet pysyvät tukena, jos jokin kohta tuntuu vaikealta. Sanokaa {N_PART_PL} ääneen yhdessä ja antakaa lapsen edetä omaan tahtiinsa — tehtävässä ei ole mitään painetta. Joka sanassa pieni täyttää useamman aukon ja täydentää pidemmän sanan. Vähitellen kirjoittamisesta tulee varmempaa. Tulosta ilmaiseksi, kotona tai koulussa.`,

  `Pohjimmiltaan tämä tehtävä tiivistyy yhteen asiaan: täydennä pidempi sana kirjoittamalla useampi puuttuva kirjain. Tällä tehtävällä pieni harjoittelee juuri sitä haastavammilla sanoilla, joista puuttuu monta kirjainta. Lapsi katsoo kuvaa, sanoo sanan hitaasti ja kirjoittaa puuttuvat kirjaimet useaan aukkoon. Tämä tapa on järkevä 1. luokalla, koska se vie lukijan turvallisesti pidempien sanojen pariin. Kuvina näkyvät {N_PL} antavat juuri sen vihjeen, jota tarvitaan, kun aukkoja on monta. Sano {N_PART_PL} yhdessä ja kuunnelkaa, mitkä kirjaimet puuttuvat — yhteys tulee selväksi äänne äänteeltä. Aikaa on niin paljon kuin tarvitsee, ilman painetta ja lapsen omaan tahtiin. Yhä uudelleen pieni täyttää useamman aukon ja täydentää sanan. Tehtävä on ilmainen tulostettavaksi aina kun haluat.`,
];

const P2_NORMAL = [
  `Hyvä kotivinkki: anna pienen sanoa koko sana ääneen hitaasti ennen kuin hän kirjoittaa puuttuvat kirjaimet. Kun sanat ovat pidempiä ja niistä puuttuu useampi kirjain, hidas ääneen sanominen auttaa kuulemaan, mikä kirjain kuuluu mihinkin aukkoon, ja kuvina näkyvät {N_PL} pitävät mielessä, mistä sanasta on kyse. Osoittakaa aukot yksitellen sormella ja täyttäkää ne yksi kerrallaan — niin haastavampikin sana valmistuu rauhassa. Tehtävä on ilmainen ja tulostuu hetkessä: istahtakaa pöydän ääreen, kun tekee mieli, ja täydentäkää yksi sana kerrallaan.`,

  `Onko pieni epävarma, mitkä kirjaimet puuttuvat? Sanokaa silloin pidempi sana hitaasti ja kuunnelkaa jokainen äänne erikseen alusta loppuun. Koska sanat ovat tässä haastavampia ja niistä puuttuu useampi kirjain, kannattaa edetä aukko kerrallaan, jotta lapsi kuulee, mikä äänne jää kuhunkin kohtaan. Kuvina näkyvät {N_PART_PL} muistuttavat, mistä sanasta on kyse, jos ajatus karkaa. Kaikki rauhassa, ilman painetta, ja yksi aukko kerrallaan. Tulosta tehtävä ilmaiseksi tai pelaa netissä, jos se on teille kätevämpää — uusi sana odottaa aina vieressä.`,

  `Hyvä puoli pidemmissä sanoissa on, että valmis sana näyttää sitäkin hienommalta: kun kaikki puuttuvat kirjaimet on kirjoitettu, lukekaa koko sana yhdessä ääneen ja katsokaa, kuulostaako se oikealta. Jos jokin aukko tuntuu väärältä, palataan rauhassa siihen kohtaan ja mietitään, mikä kirjain sinne kuuluu. Kuvina näkyvät {N_GEN} nimet auttavat varmistamaan, että haastavampikin sana on valmis. Tässä puuttuu useampi kirjain kerralla, joten tarkistaminen kohta kohdalta on hyvä tapa. Lataa tehtävä ilmaiseksi tulostettavaksi ja jätä se pöydälle — yksi täydennetty pitkä sana on mukava hetki päivässä.`,

  `Haluatko mennä askeleen pidemmälle? Sano pidempi, haastavampi sana ääneen ja anna pienen kirjoittaa se kirjain kirjaimelta, ihan kuin täyttäen monta aukkoa peräkkäin. Kuvina näkyvät {N_PL} sopivat tähän hyvin, koska ne ovat tuttuja, vaikka sanat ovat pidempiä ja niistä puuttuu useampi kirjain. Tämä yhdessä tekeminen näyttää selvästi, miten jokainen puuttuva kirjain löytää paikkansa pitkässäkin sanassa. Ei painetta, ei hoputusta — vain rauhallista tavaamista lapsen omaan tahtiin. Kaikki tehtävät tulostuvat ilmaiseksi niin monta kertaa kuin haluat, jotta harjoitusta riittää aina lisää.`,

  `Jotkut lapset kirjoittavat aluksi väärän kirjaimen johonkin aukkoon, kun sanassa on monta täytettävää kohtaa. Ei se mitään: pyyhitään rauhassa pois, sanotaan pidempi sana uudelleen hitaasti ja kuunnellaan, mikä äänne kuuluu siihen kohtaan. Koska sanat ovat haastavampia ja niistä puuttuu useampi kirjain, kannattaa edetä yksi aukko kerrallaan. Kuvina näkyvät {N_PART_PL} muistuttavat koko ajan, mikä sana on tavoitteena. Jokainen sana saa kestää oman aikansa, ilman painetta. Tulosta tehtävä ilmaiseksi ja säilytä se — on kiva nähdä puuttuvien kirjainten osuvan kohdalleen ensi kerralla.`,

  `Anna pienen jokaisen sanan jälkeen kertoa, mitkä kirjaimet hän kirjoitti aukkoihin ja miksi: "tähän tuli koo ja tähän aa, koska kuulen ne sanassa". Kun puuttuvat kirjaimet puetaan sanoiksi, ne painuvat paremmin mieleen, ja kuvina näkyvät {N_PL} pysyvät tukena, jos haastavampi sana hetkeksi karkaa. Tässä on useampi puuttuva kirjain kerralla, joten selittäminen kohta kohdalta vahvistaa oikeinkirjoitusta. Ilman stressiä, vain rauhallista harjoittelua askel kerrallaan. Ja koska tehtävät ovat ilmaisia, aina voi täydentää vielä yhden sanan.`,

  `Lopuksi rauhassa: lukekaa yhdessä, viimeisen kerran, kaikki täydennetyt sanat ääneen ja katsokaa {N_PART_PL}, jotta jokainen pidempi sana kuulostaa valmiilta. Näin pieni harjoittelee leikiten täydentämään haastavampia sanoja ja huomaamaan, että useaan aukkoon kirjoitetut kirjaimet tekivät sanasta kokonaisen. Koska sanat ovat pidempiä ja niistä puuttui useampi kirjain, tämä loppukierros tuntuu erityisen palkitsevalta. Tehtävä on ilmainen, pelattavaksi netissä tai tulostettavaksi paperille, jotta into puuttuvien kirjainten täydentämiseen kasvaa vähitellen siellä kotona.`,
];

const H1 = {
  'easy': 'Arvaa sana, helpot sanat: {H1} – {GRADE}',
  'normal': 'Arvaa sana, haastavammat sanat: {H1} – {GRADE}',
};

const CAR = {
  'easy': 'Arvaa sana, helpot sanat – ',
  'normal': 'Arvaa sana, haastavammat sanat – ',
};

module.exports = {
  type: 'word-guess',
  eyebrow: 'Tehtävä: Arvaa sana',
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
  P3: `Pitikö pieni näiden sanojen täydentämisestä? Silloin tutkittavaa riittää vielä paljon yhdessä. Vilkaiskaa tehtäviä, joissa on {nb1}, jolloin pieni voi jatkaa puuttuvien kirjainten kirjoittamista samalla rauhalla, tai kokeilkaa jotakin, jossa on {nb2}, pienen vaihtelun vuoksi. Vaihtamalla teemaa silloin tällöin sanojen täydentäminen pysyy elävänä, ja pieni jatkaa mielellään aukkojen täyttämistä ja näkee sanan tulevan kokonaiseksi. Kun lapsi katsoo {N_PART_PL}, sanoo sanan ja kirjoittaa puuttuvat kirjaimet, koko kokoelma on täysin ilmainen: pelatkaa tehtävät netissä tai tulostakaa ja tehkää ne pöydän ääressä kotona. Rauhaa ja aikaa on niin paljon kuin tarvitsee, ilman painetta ja lapsen omaan tahtiin. Näin pieni rakentaa askel askeleelta varmuuden lukemisen ja kirjoittamisen perustaitoihin.`,
};
