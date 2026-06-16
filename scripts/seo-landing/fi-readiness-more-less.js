/**
 * fi-readiness-more-less.js — suomenkielinen (fi) laskeutumissivun teksti more-less-tehtävälle.
 *
 * Tehtävä (Enemmän vai vähemmän): KOLME tilaa. Lapsi vertailee kahden ryhmän LUKUMÄÄRÄÄ ja
 * päättää, kummassa on ENEMMÄN ja kummassa VÄHEMMÄN. Esiopetus, 5–6-vuotiaat.
 * EI laskemista pakollisena, EI standardia (readiness-tyyppi). Teksti on teema-agnostinen:
 * teeman substantiivi tulee aina fi-render.js:n paikkamerkeistä (käsin tarkistetut suomen
 * sijamuodot fi-themes.js:stä).
 *
 *   check-cross  (token "Merkitse ja yliviivaa ryhmät"): lapsi MERKITSEE / YLIVIIVAA sen ryhmän,
 *                jossa on enemmän (tai vähemmän, kun tehtävä niin pyytää). Kynätehtävän kehys:
 *                merkitse / yliviivaa / kummassa on enemmän.
 *   image-image  (token "Vertaa kuvaryhmiä"): kaksi kuvaryhmää rinnakkain; lapsi vertailee niitä
 *                ja päättää, kummassa ryhmässä on enemmän / kummassa on vähemmän.
 *   image-number (token "Vertaa kuvia ja numeroa"): kuvaryhmää verrataan kirjoitettuun lukuun;
 *                onko kuvia enemmän vai vähemmän kuin luku.
 *
 * ⚠️ KANTAVA AITA — more-less (LUKUMÄÄRÄ) EI saa lukea kuin big-small (KOKO).
 *   PAKOLLISET määräsanat: enemmän, vähemmän, määrä / lukumäärä / kumpi on enemmän /
 *   kummassa on enemmän.
 *   KIELLETTYÄ kokokehystä EI esiinny missään: ei iso, ei pieni, ei isompi, ei pienempi,
 *   ei suurempi, ei suurin, ei pienin, ei koko, ei suuruusjärjestys. Tämä sivu kertoo,
 *   kummassa ryhmässä on ENEMMÄN — ei koskaan kumpi on SUUREMPI (se on big-small-tyyppi).
 *
 * Käytössä olevat paikkamerkit ja niiden sijat:
 *   {H1}        nominatiivin monikko, isolla (otsikko/karuselli)
 *   {N_PL}      nominatiivin monikko, pienellä — SUBJEKTI ("{N_PL} on jaettu kahteen ryhmään")
 *   {N_PART_PL} partitiivin monikko, pienellä — OBJEKTI ("vertaile {N_PART_PL}")
 *   {N_GEN}     genetiivin monikko, pienellä — "{N_GEN} kuvat" = X:n kuvat
 *   {N_PART_SG} partitiivin yksikkö, pienellä — "montako kuvaa" -tyyppinen lukumääräkysymys
 *               (sallittu, koska more-less on lukumäärä; ydintehtävä on silti VERTAILU)
 *
 * Mitään teeman substantiivia ei kirjoiteta kovakoodattuna. Ei numeroita. [NSR-FLAG][fi] §17.5.1.
 */
'use strict';

const TOK = (mk) =>
  mk === 'image-image'
    ? 'Vertaa kuvaryhmiä'
    : mk === 'image-number'
      ? 'Vertaa kuvia ja numeroa'
      : 'Merkitse ja yliviivaa ryhmät';

const SKEL_II = [
  `Kummassa on enemmän? Tämä yksinkertainen kysymys herättää esiopetusikäisen lapsen katseen heti tämän tehtävän äärellä. Toisella puolella on yksi ryhmä, jossa on {N_PL}, ja toisella puolella toinen ryhmä — ja kaikki ratkeaa siitä, kummassa niistä on enemmän ja kummassa vähemmän. Mitään ei tarvitse laskea: lapsi katsoo molempia ryhmiä ja huomaa yhdellä vilkaisulla, kumpi näyttää täydemmältä. Juuri tällainen vertailu silmämääräisesti, ilman numeroita, on arvokas taito, joka valmistaa kouluun, sillä se rakentaa pohjaa lukumäärän tajulle. Mitään kiirettä ei ole: vertaillaan kaikessa rauhassa omassa tahdissa. Pyydä lasta katsomaan ensin yhtä ryhmää, sitten toista, ja miettimään, kummassa hänen mielestään on enemmän. Jos hän epäröi aluksi, antakaa katseen levätä ja kokeilkaa rauhassa uudelleen yhdessä. Kun lapsi osoittaa ryhmää, jossa on enemmän, tyytyväisyys tulee aivan itsestään. Aikuisen vierellä, lempein sanoin ja ilman kiirettä koettuna tehtävästä tulee lämmin yhteinen hetki, joka on tehty pelkästään tarkoista silmistä eikä koskaan numeroista. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Ajattele toista koria, joka pursuaa täynnä, ja toista, joka on melkein tyhjä: jo pelkästä katsomisesta ymmärtää, kummassa on enemmän. Saman tunteen saa lapsi tämän tehtävän äärellä. Katsoessaan {N_PART_PL}, jotka on jaettu kahteen ryhmään, hän huomaa, että hänen tehtävänsä on päättää pelkillä silmillä, kummassa ryhmässä on enemmän ja kummassa vähemmän. Vertailuun keskittyessään lapsi harjoittaa lukumäärän tajua jo ennen numeroita, sillä hän oppii arvioimaan enemmän ja vähemmän silmämääräisesti. Mitään arvosanaa ei anneta, vain uteliaisuus ohjaa katsetta. Pyydä lasta kertomaan ääneen, mitä hän näkee, ja osoittamaan ryhmää, jossa hänestä on enemmän. Jos hän valitsee väärän ryhmän, hymyilkää yhdessä ja kokeilkaa rauhassa uudelleen. Jokainen oikea valinta on mukava voitto, joka täyttää lapsen ylpeydellä. Tyynessä ja kärsivällisessä tunnelmassa tästä tehtävästä tulee lämmin tilaisuus katsoa rauhassa ja kasvaa yhdessä, vertailu vertailun jälkeen, aivan ilman painetta. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Katso kahta ryhmää, joissa on {N_PL}: kummassa on enemmän? Tällä esiopetukseen suunnitellulla sivulla kaksi kuvaryhmää asettuvat vastakkain, toinen vasemmalle ja toinen oikealle. Lapsen tehtävä on tunnistaa, kummassa ryhmässä on enemmän ja kummassa vähemmän. Onnistuakseen riittää vertailla silmämääräisesti: näyttääkö tämä ryhmä täydemmältä vai tyhjemmältä kuin viereinen? Näin lapsi erottaa enemmän ja vähemmän ilman laskemista ja ilman numeroita. Tämä määrien vertailu on rauhallinen ja perustava taito, joka tulee paljon ennen laskemista. Mikään kello ei tikitä: edetään aivan rauhassa. Saata lasta lempein kysymyksin, kummassa ryhmässä hänestä on enemmän, ja anna hänelle aikaa miettiä. Jos hän muuttaa mieltään, hän saa osoittaa uudelleen ja jatkaa tyynesti. Sen ryhmän tunnistaminen, jossa on enemmän kuvia, vahvistaa tarkkaavaisuutta ja luottamusta itseen. Tämä on yksinkertainen kutsu olla aivan vierellä ja vaalia lapsen uteliasta katsetta. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Osaatko sanoa yhdellä vilkaisulla, kummassa on enemmän? Lapselle siitä tulee heti mukava leikki, joka ratkeaa pelkillä silmillä. Hänen edessään on kaksi ryhmää, joissa on {N_PL}, ja hän valitsee sen, jossa on enemmän, mitään laskematta. Tässä ei ole kyse numeroista vaan ryhmien vertaamisesta: kummassa on enemmän, kummassa vähemmän. Määrien arvioiminen silmämääräisesti on hauskaa ja valmistaa lempeästi kouluun, jossa lukumäärän tajusta on paljon hyötyä. Kaksi ryhmää ovat tarkoituksella vierekkäin, jotta vertailu olisi helppoa ja välitöntä. Kannusta lasta katsomaan ensin yhtä ryhmää, sitten toista, ja valitsemaan sen, jossa hänestä on enemmän. Erehdyskin on askel eteenpäin: kokeillaan rauhassa uudelleen hymyssä suin. Kun lapsi osoittaa oikeaa ryhmää, hänen keskittymisensä vahvistuu. Lempeän äänen ja rauhallisten hetkien äärellä koettuna tämä sivu muuttuu lämpimäksi tuokioksi, jossa opitaan katsomalla, ei koskaan laskemalla. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Enemmän vai vähemmän, kummanko sinä näet? Tällainen on tämän esiopetussivun lempeä kysymys. Sivulla kaksi ryhmää, joissa on {N_PL}, odottavat lapsen katsetta, ja hän päättää pelkästään katsomalla, kummassa ryhmässä on enemmän ja kummassa vähemmän. Tämä on lempeää harjoitusta silmille: valitakseen hyvin hänen täytyy vertailla huolellisesti, kuinka täydeltä kumpikin ryhmä näyttää. Mikään kello ei tikitä, vaan tärkeintä on katselemisen ilo. Tue lasta lämpimin kysymyksin ja anna hänen tutkia sivua omassa tahdissaan. Jos hän ei heti huomaa, kummassa on enemmän, kokeillaan rauhassa uudelleen, eikä kukaan hoputa häntä. Jokainen onnistunut vertailu vahvistaa lukumäärän tajua ja luottamusta itseen. Yhdessä koettuna, rauhallisin hetkin ja lempein sanoin, tästä tehtävästä tulee arvokas tuokio, jossa lapsi oppii katsomalla ja vertailemalla, askel kerrallaan. Täällä eivät auta numerot: riittävät vain kaksi tarkkaa ja uteliasta silmää. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Määrien vertailua ilman numeroita: tällä esiopetussivulla lapsi näkee kaksi kuvaryhmää ja päättää pelkällä katseella, kummassa niistä on enemmän ja kummassa vähemmän. Katsoessaan {N_PART_PL}, jotka on jaettu kahteen ryhmään, hän ei laske mitään — riittää, että hän huomaa tarkasti, kummassa ryhmässä on enemmän. Tämä katsominen laskemisen sijaan on hyvin hyödyllinen perustaito, ja se tekee lapset varmoiksi ryhmiä arvioidessaan. Kaksi ryhmää ovat vierekkäin juuri siksi, että ne kutsuvat vertailemaan. Kannusta lasta siirtämään katsetta yhdestä ryhmästä toiseen ja valitsemaan sen, jossa on enemmän. Jos hän osoittaa väärää ryhmää, hän valitsee toisen tyynesti ja ilman kiirettä. Jokainen oikea vertailu on ilo, jota juhlia yhdessä. Lämpimässä ja kärsivällisessä tunnelmassa tehtävä muuttuu mukavaksi löytämisen hetkeksi, joka eletään aivan vierekkäin, hyvin lempeästi ja ilman minkäänlaista painetta. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Kumpi ryhmä on täydempi? Tämä kysymys saa lapsen hymyilemään tehtävän äärellä. Katsoessaan {N_PART_PL}, jotka on aseteltu kahteen ryhmään, hän ymmärtää, että hänen on tunnistettava, kummassa ryhmässä on enemmän ja kummassa vähemmän, pelkästään katsomalla. Kaikki ratkeaa silmämääräisestä vertailusta, rauhallisesta taidosta, jolla on koulussa merkitystä, kun ensimmäiset lukumääriä koskevat päättelyt aikanaan alkavat. Ja kauneinta on, että täällä riittää katsominen, ei koskaan laskeminen. Kaksi ryhmää ovat tarkoituksella lähekkäin, jotta vertaileminen olisi välitön mukava seikkailu. Pyydä lasta osoittamaan täydempää ryhmää, vertaamaan sitä tyhjempään ja perustelemaan valintansa. Erehdyksen edessä riittää hymy ja uusi yritys. Kun hän löytää sen, jossa on enemmän, lapsen varmuus kasvaa hivenen, aina tyynessä ja lämpimässä tunnelmassa, juuri hänen omaan tahtiinsa sovitettuna. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Kaksi ryhmää, yksi katse. Tällä esiopetuksen sivulla lapsi kohtaa kaksi ryhmää, joissa on {N_PL}, ja hänen on valittava se, jossa on enemmän, laskematta. Vertaillessaan kahta ryhmää silmämääräisesti hän huomaa, kummassa on enemmän ja kummassa vähemmän. Tämä hiljainen tarkkaavaisuus määriä kohtaan on aitoa perustaitoa: se vahvistaa lukumäärän tajua jo ennen numeroita ja on hyödyksi myöhemmin, kun lapsi kohtaa ensimmäiset oikeat vertailut. Mukana ei ole kilpailua eikä pisteitä, vain tarkka katse ja halu yrittää. Kannusta katsomaan yhtä ryhmää kerrallaan, osoittamaan täydempää ja kertomaan, mitä hän huomaa. Jos hän valitsee väärän ryhmän, hän osoittaa toista rauhassa ja aloittaa uudelleen. Sen ryhmän löytäminen, jossa on enemmän kuvia, on voitto, joka tekee hyvää itseluottamukselle. Lempeässä ja rauhallisessa ilmapiirissä tehtävästä tulee arvokas katselemisen ja vertailemisen hetki, jota maistella yhdessä pehmein tahdein. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,
];

const P2_II = [
  `Kummassa on enemmän? Tästä kysymyksestä leikki alkaa. Kahden ryhmän edessä, joissa on {N_PL}, lapsi valitsee sen, jossa on enemmän, pelkästään katsomalla, mitään laskematta. Hän vertailee ryhmiä omassa tahdissaan, ilman kiirettä ja ilman arvosanaa; jos hän katsoo ensin tyhjemmän ryhmän, täydempi hyppää heti silmille. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Varatkaa rauhallinen hetki pöydän ääressä ja katsokaa yhdessä {N_PART_PL}, jotka on jaettu kahteen ryhmään. Kysy joka sivulla, kumpi ryhmä näyttää hänestä täydemmältä, ennen kuin hän osoittaa sitä, jossa on enemmän kuvia. Näin aika pysyy rauhallisena ja paine oven ulkopuolella. Täällä ei lasketa mitään: vertaillaan määriä katsomalla, ja jokainen oikea valinta ansaitsee hymyn.`,

  `Lempeä idea: täyttäkää ensin kaksi kulhoa, toinen monella korkilla ja toinen harvalla, ja kysykää, kummassa on enemmän; palatkaa sitten sivulle, jossa on {N_PL}. Näin lapsi ymmärtää leikkien, mitä enemmän ja vähemmän tarkoittavat. Sen jälkeen oikean ryhmän valitseminen on hyvin helppoa. Määrien katsominen ja vertailu, ei koskaan laskeminen, on tämän sivun salaisuus. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Pysy tyynesti lapsen vierellä, kun hän vertailee {N_PART_PL} kahdessa ryhmässä. Joku osoittaa sormella ja joku sanoo mieluummin ääneen: kumpikin tapa kelpaa. Tärkeää on, että hän löytää ryhmän, jossa on enemmän, ja valitsee sen mielellään. Ei kelloja eikä kilpaa; lämmin hymy kannustaa nuoria katsojia enemmän kuin mikään muu.`,

  `Luota lapsen ensimmäiseen katseeseen: useimmiten hän näkee heti, kummassa ryhmässä on enemmän, ilman että hänen tarvitsee laskea. Kannusta häntä katsomaan {N_PART_PL} kummassakin ryhmässä, seuraamaan vaikutelmaansa ja juttelemaan yhdessä siitä, kummassa on enemmän ja kummassa vähemmän. Tämä silmämääräinen vertailu ilman numeroita rakentaa juuri ensimmäistä lukumäärän tajua, ja se saa pysyä kevyenä ja rauhallisena leikkinä, joka on tehty pelkistä silmistä. Tehtävä on ilmainen ja valmiina tulostettavaksi.`,

  `Minkä näet ensimmäisenä? Pyydä lasta katsomaan {N_PART_PL} kahdessa ryhmässä ja sanomaan, kumpi näyttää hänestä täydemmältä. Ei lasketa, vaan vertaillaan: pelkkä katse paljastaa, kummassa on enemmän. Jutelkaa rauhassa siitä, kummassa on enemmän ja kummassa vähemmän, ja juhlikaa jokaista oivallusta. Näin ryhmien vertailusta tulee tyyni mukava leikki, joka ilman kiirettä valmistaa kouluun.`,

  `Saata lasta avoimin kysymyksin, kun hän katsoo {N_PART_PL}: kummassa ryhmässä hänestä on enemmän? Hän päättää pelkästään katsomalla, laskematta koskaan. Kehu tarkkaa katsetta, älä nopeaa vastausta. Ilman kelloja ja ilman pisteitä lapsi harjoittaa sen tunnistamista, kummassa on enemmän, ja ryhmien vertailua varmoin ottein, kevyt vertailu toisensa jälkeen. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,
];

const SKEL_CC = [
  `Merkitse se ryhmä, jossa on enemmän! Tässä tehtävässä {N_PL} on aseteltu kahteen ryhmään, ja lapsi merkitsee sen, jossa on enemmän — tai sen, jossa on vähemmän, kun tehtävä niin pyytää. Tämä on kynätehtävä yksinkertaisimmillaan: katsotaan kahta ryhmää, vertaillaan määriä ja merkitään oikea. Kuvien laskeminen on aivan sallittua, mutta usein silmät löytävät vastauksen itsestään. Rivi riviltä lapsi etenee sivulla, ja jokainen merkki on päätös, jonka hän itse teki. Yleensä huomaa heti, kumpi ryhmä pursuaa täydempänä, ja juuri tällainen yleisvaikutelma määrästä halutaan herättää. Ilman kelloa ja ilman pisteitä hän harjoittaa sanoja enemmän, vähemmän ja yhtä monta — ensimmäistä loogista päättelyä kynä kädessä. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Yksi merkki, sitten toinen ja vielä yksi — rivi riviltä! Tällä {N_GEN} sivulla lapsi vertailee kahta ryhmää joka kerta ja merkitsee sen, jossa on enemmän, tai sen, jossa on vähemmän. Muoto on lempeä: sama kysymys, uudet kuvat, uusi merkki. Juuri tämä toistuvuus tekee lapsista varmoja, sillä jokainen rivi on uusi tilaisuus katsoa hyvin ja valita oikein. Lapsi saa laskea tarkistaakseen, mutta moni huomaa pian, että määrän näkee yhdellä vilkaisulla. Joskus voittava ryhmä pursuaa niin näkyvästi, ettei jää epäilystä; joskus täytyy katsoa vielä kerran, ja niinkin on aivan hyvä. Ruudulla tai paperilla — sinä päätät. Ei pisteitä, ei kilpaa — vain hyviä valintoja, merkki toisensa jälkeen. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Kumpi ryhmä, jossa on {N_PL}, ansaitsee merkin? Tässä tehtävässä lapsi merkitsee ryhmän, jossa on enemmän kuvia — tai sen, jossa on vähemmän, jos niin pyydetään. Ensin hän katsoo: kummassa on enemmän? Sitten hän vertailee määriä, joskus kevyellä laskemisella varmuuden vuoksi, ja lopuksi merkitsee. Tämä rauhallinen polku — katso, vertaa, merkitse — on juuri sellaista päätöksentekoa, jota esiopetuksessa harjoitellaan. Paperilla se tehdään kynällä, ruudulla napautuksella, ja molemmat toimivat yhtä hyvin. Määrien vertailu on ensimmäinen askel kohti numeroita, ja juuri sen lapsi ottaa täällä, kaikessa rauhassa. Ilman kelloa ja ilman kilpailua sana enemmän, vähemmän ja yhtä monta kehittyy, kun sivu täyttyy hiljalleen merkeistä. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Tällä {N_GEN} sivulla juuri merkki tekee työn näkyväksi. Lapsi vertailee kuvaryhmiä ja merkitsee joka kerta sen, jossa on enemmän — tai sen, jossa on vähemmän, tehtävän mukaan. Merkitsemisessä on kaunista se, että päätös tulee selväksi: noin, minä valitsin, ja siitä voi jutella. Kysy huoletta: mistä huomasit, että siinä on enemmän? Ehkä lapsi laski, ehkä näki heti — molemmat ovat hyviä vastauksia. Tehkää tästä yhteinen hetki: katsotaan yhdessä, sanotaan kummassa on enemmän, merkitään. Rivi riviltä hän varmistuu vertailemaan määriä, ilman pisteitä ja ilman kelloa, kotona pöydän ääressä tai luokassa. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Kynä, {N_GEN} sivu ja kysymys enemmästä ja vähemmästä — muuta ei tarvita. Tässä tehtävässä lapsi merkitsee ryhmän, jossa on enemmän kuvia, tai sen, jossa on vähemmän, kun tehtävä niin pyytää. Hän katsoo molempia määriä, punnitsee niitä yhdellä vilkaisulla ja merkitsee vastauksen. Laskeminen tarkistamiseksi on yhä sallittua, etenkin kun ryhmät muistuttavat toisiaan. Jokainen rivi on lyhyt tehtävä, joka tehdään rauhassa, eikä ylpeys oman merkin asettamisesta petä. Kun toisessa ryhmässä on selvästi enemmän, vastaus hyppää silmille; määrien vertailusta tulee silloin enemmän leikkiä kuin ponnistusta. Ilman kilpailua ja ilman pisteitä lapsi rakentaa varman määrien tajun — merkki toisensa jälkeen. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Merkitse oikea ryhmä! Tällä {N_GEN} sivulla lapsi merkitsee joka rivillä ryhmän, jossa on enemmän — tai sen, jossa on vähemmän, kun niin lukee. Hänen täytyy samaan aikaan katsoa hyvin ja muistaa, mitä pyydetään, ja juuri tämä yhdistelmä tekee sivusta kauniin jumpan esiopetuksen lapsille. Määrät vertaillaan yhdellä vilkaisulla, ja epäselvässä tilanteessa riittää laskea. Sivun voi tehdä ruudulla tai tulostaa, jotta sen saa merkata kynällä kuin koulussa. Sinulle se on myös tilaisuus kuulla lapsen päättelevän ääneen: täällä on enemmän, tuolla vähemmän. Ei pisteitä, ei kelloa — vain rauhallisia kuvarivejä ja lapsi, joka edistyy joka merkin myötä. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Jotkut rivit pyytävät sitä, jossa on enemmän, toiset sitä, jossa on vähemmän — ja tämä vaihtelu pitää mielen virkeänä. Tällä {N_GEN} sivulla lapsi merkitsee ryhmän, joka vastaa kysymystä. Hän harjoittaa kahta asiaa yhtä aikaa: määrien vertailua ja sen muistamista, mitä pyydetään. Molemmat ovat arvokasta harjoitusta ennen koulua. Määrät voi arvioida yhdellä vilkaisulla tai laskea, ja merkki tulee silloin, kun lapsi on varma. Aikaa riittää — ilman kelloa ja ilman pisteitä — niin että jokainen rivi saa ansaitsemansa rauhan. Määrien vertailu, yhä uudelleen, on se pohja, jolle numerot tulevat aikanaan nojaamaan. Näin enemmän ja vähemmän muuttuvat sanoiksi, joita lapsi käyttää luontevasti. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Tuttu merkitsemistehtävä, sellainen jonka sukupolvet lapsia ovat kohdanneet — tällä kertaa {N_GEN} kuvilla ja aivan ilman painetta. Lapsi vertailee kuvaryhmiä ja merkitsee sen, jossa on enemmän tai jossa on vähemmän. Muoto on tuttu ja rauhallinen: yksi rivi kerrallaan, yksi merkki kerrallaan, yksi voitto kerrallaan. Samalla olennainen tapahtuu päässä: määriä punnitaan toisiaan vasten, ehkä lasketaan, ja päätetään. Tulosta sivu kynällä merkittäväksi tai tee se suoraan ruudulla. Usein ryhmä, jossa on enemmän, pursuaa niin hyvin, että sen tunnistaa yhdellä vilkaisulla. Ilman kelloa ja ilman pisteitä lapsi harjoittaa tätä ensimmäistä loogista päättelyä: nähdä, kummassa on enemmän, ja näyttää se merkillä. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,
];

const P2_CC = [
  `Tämä merkitsemistehtävä sopii viisi- tai kuusivuotiaalle lapselle. Lapsen ei tarvitse osata lukea eikä tuntea numeroita: riittää, että hän vertailee {N_PART_PL} ryhmittäin ja merkitsee sen, jossa on enemmän. Tehtävän voi pelata ilmaiseksi netissä tai tulostaa keittiön pöydälle, ja kummin tahansa hän itse merkitsee ryhmän, jossa on enemmän tai vähemmän, omassa tahdissaan.`,

  `Esiopetukseen tämä on rauhallinen paperitehtävä — silloinkin kun se pelataan ruudulla. Ei kelloa, ei pisteitä; lapsi saa katsoa ja vertailla {N_PART_PL}, kunnes merkki osuu oikein. Tulosta sivu ja ota kynä, tai tee se tabletilla: kummatkin antavat kaiken tilan miettiä, katsoa kahta ryhmää ja merkitä rauhassa se, jossa on enemmän.`,

  `Tehtävä ei vaadi mitään esitietoja: lapsi tunnistaa {N_PL}, vertailee määriä ja asettaa merkkinsä siihen ryhmään, jossa on enemmän. Siksi se sopii kaikkein nuorimmillekin, jotka rakastavat tehdä kaiken itse. Se on ilmainen netissä ja tulostettavissa, niin että sitä voi tehdä missä vain: pöydän ääressä, odotushuoneessa tai koulussa. Ilman aikarajaa jokainen hyvin asetettu merkki on aito voitto, joka antaa itseluottamusta.`,

  `Pitää lapsi sitten enemmän kynällä paperille merkitsemisestä tai sormella ruudulla, tämä sivu toimii kaikkialla. Viisi- ja kuusivuotiaalle se on rauhallinen tehtävä: vertailla {N_PART_PL} ja päättää, kummassa ryhmässä on enemmän, valinta toisensa jälkeen. Lapsi käyttää tarvitsemansa ajan, eikä kukaan vahdi olan yli tai laske virheitä; tärkeintä on halu katsoa hyvin.`,

  `Sivu muistuttaa koulua, mutta ilman vaatimuksia: vain {N_PL} kahdessa ryhmässä ja merkki siihen, jossa on enemmän tai vähemmän. Lapsi voi pelata sitä ilmaiseksi netissä tai pyytää tulostamaan sen rauhalliseen hetkeen kotona. Ei pisteitä kerättäväksi — vain ilo valita oikein ja asettaa merkki aivan itse.`,

  `Sivu on tehty kaikkein nuorimmille, jotka alkavat aistia määriä. Lapsi vertailee {N_PART_PL} ja merkitsee sen ryhmän, jossa on enemmän — muuta ei tarvita. Pelaa netissä maksutta tai tulosta rauhalliseen hetkeen. Ilman kelloa ja ilman kilpailua kaikki huomio pysyy olennaisessa: katsoa hyvin kahta ryhmää ja merkitä oikein.`,

  `Esiopetuksen lapsille tämä on lämmin ja tuttu tehtävämuoto. Ilman aikarajaa, ilman pisteitä — vain lapsi, kaksi ryhmää, joissa on {N_PL}, ja yksi merkki kerrallaan sinne, missä on enemmän. Sivu on ilmainen netissä, ja se myös tulostuu retkelle tai keittiön pöydälle, juuri niin kuin päiväänne sopii, mitään lapsen tahdista hoputtamatta.`,
];

const SKEL_IN = [
  `Enemmän vai vähemmän kuin luku? Tässä tehtävässä kuvaryhmä, jossa on {N_PL}, on kirjoitetun luvun vieressä, ja lapsi päättää, onko ryhmässä enemmän vai vähemmän kuvia kuin luku osoittaa. Ensin hän katsoo määrää ja muodostaa käsityksen, kuinka monta niitä on — laskeminen tarkistamiseksi on sallittua — ja asettaa sitten tämän käsityksen luvun rinnalle. Näin lapsi rakentaa sillan määrien ja numeroiden välille, yhden ensimmäisten päättelyjen tärkeimmistä askelista. Kaikki tapahtuu rauhassa ja ilman painetta: hän katsoo, vertailee ja valitsee omassa tahdissaan, ja vähitellen sivun numerot saavat hyvin konkreettisen merkityksen. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Tällä {N_GEN} sivulla lapsi kohtaa yhtä aikaa kuvia ja numeroita. Jokainen tehtävä näyttää kuvaryhmän ja sen vieressä luvun, ja kysymys on, onko kuvia enemmän vai vähemmän kuin luku. Lapsi ehkä laskee määrän, ehkä näkee sen yhdellä vilkaisulla — molemmat kelpaavat — ja vertailee sitä sitten kirjoitettuun lukuun. Näin hän oppii, ettei luku ole vain kuvio, vaan että se edustaa tarkkaa määrää. Tämä on silta määrien näkemisen ja numeroiden ymmärtämisen välillä, ja se rakentuu parhaiten rauhassa. Ilman kelloa ja ilman pisteitä lapsi valitsee vastauksen ja tutustuu numeroihin yksi kerrallaan. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Onko ryhmässä enemmän kuin luku kertoo? Tällä sivulla lapsi vertailee kuvaryhmää, jossa on {N_PL}, kirjoitettuun lukuun. Ensin hän muodostaa kuvan määrästä: kuinka monta niitä suunnilleen on? Sitten hän katsoo lukua ja päättää, onko ryhmässä enemmän vai vähemmän. Jotkut lapset laskevat huolellisesti, toiset arvioivat silmillä — molemmat tiet johtavat vastaukseen. Matkan varrella jotakin tärkeää tapahtuu: numerot lakkaavat olemasta outoja merkkejä ja muuttuvat määriksi, jotka lapsi osaa kuvitella. Tämä yhteys on ensimmäisten päättelyjen sydämessä. Tehtävässä ei ole aikarajaa eikä kilpailua, joten lapsi saa miettiä niin kauan kuin haluaa. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Luku ja kuvaryhmä: tällä {N_GEN} sivulla ne täytyy asettaa rinnakkain. Lapsi selvittää, montako kuvaa ryhmässä on — laskien tai nähden — ja päättää sitten, onko se enemmän vai vähemmän kuin osoitettu luku. Näin hän harjoittaa kahta asiaa yhtä aikaa: lukea määrää ja tunnistaa kirjoitettuja numeroita. Monelle lapselle tämä on ensimmäinen oikea kohtaaminen numeroiden kanssa, ja siksi rauha on niin tärkeä: ei kelloa, ei pisteitä, vain aikaa. Sinulle se on tilaisuus asettaa numero sen päälle, mitä lapsi jo näkee: tässä on enemmän kuin tämä luku, vai vähemmän. Askel askeleelta lapsi huomaa, että jokainen luku kätkee määrän — ja että niitä kahta voi vertailla. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Numerot tulevat mukaan sivulle! Siellä missä lapsi ennen vertaili kahta kuvaryhmää, on nyt kuvaryhmä, jossa on {N_PL}, kirjoitetun luvun edessä. Tehtävä: onko kuvia enemmän vai vähemmän kuin luku ilmoittaa? Lapsi arvioi määrän, laskien jos on tarpeen, ja asettaa sen luvun rinnalle. Tämä on valtava askel — määrien näkemisestä numeroiden lukemiseen — ja juuri tämän askeleen sivu tekee lempeäksi ja selkeäksi. Yksi ryhmä, yksi luku, yksi päätös kerrallaan. Ilman kiirettä ja ilman kilpailua syntyy varma yhteys niiden määrien, jotka lapsi näkee, ja niiden numeroiden välille, joita hän pian koulussa tarvitsee. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Onko enemmän kuin luku? Tällä {N_GEN} sivulla lapsi vertailee määrää lukuun. Hän katsoo ryhmää, muodostaa käsityksen, montako kuvaa siinä on, ja valitsee sitten: enemmän vai vähemmän kuin viereinen luku? Laskeminen tarkistamiseksi on hyvä keino, ja vähitellen lapsi alkaa tunnistaa vähäiset määrät heti. Molemmat vahvistavat numeroiden tajua. Tässä tehtävässä on kaunista se, että luku saa merkityksen, jonka voi nähdä: seitsemän on enemmän kuin viisi, ja silmät voivat vahvistaa sen. Rauhassa ja ilman painetta lapsi etenee sivulla ja tutustuu numeroihin vähitellen — omassa tahdissaan. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Tällä sivulla numeroilla on kuvat tukenaan. Jokainen tehtävä näyttää kuvaryhmän, jossa on {N_PL}, ja luvun, ja lapsi päättää, ylittääkö määrä luvun vai jääkö sen alle. Esiopetusikäiselle se on kaunis haaste: ensin lukea määrä — silmillä tai laskien — ja sitten tunnistaa ja ymmärtää luku. Kun nämä kaksi osaa kohtaavat, syntyy aito numeroiden taju. Sivulla ei ole kelloa eikä pisteitä, vain ystävällisiä kuvia ja hyvin luettavia numeroita, niin että lapsi etenee, kunnes yhteys on luja. Jutelkaa vastauksista matkalla: mistä huomasit, että siinä on enemmän? Selitys on kullanarvoinen. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Määrä kohtaa luvun: tällä sivulla lapsi vertailee kuvaryhmiä, joissa on {N_PL}, kirjoitettuihin lukuihin. Kysymys on aina sama — enemmän vai vähemmän kuin luku? — mutta vastaus vaatii samaan aikaan lukemaan määrää ja tunnistamaan luvun. Siksi sivu on niin hyvä silta esiopetuksen katselemisleikkien ja koulun numeroiden välillä. Anna lapsen valita tiensä: jotkut laskevat jokaisen kuvan, toiset näkevät määrän yhdellä vilkaisulla ja vertailevat suoraan. Molemmat ovat aitoa päättelyä. Ilman aikarajaa ja ilman kilpailua jokaisesta tehtävästä tulee kevyt napautus, jossa numerot heräävät vähitellen eloon. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,
];

const P2_IN = [
  `Tämä sivu sopii viisi- ja kuusivuotiaille lapsille, jotka opettelevat tuntemaan numeroita. Lapsen ei tarvitse laskea — riittää, että hän vertailee ryhmää, jossa on {N_PL}, viereiseen lukuun. Sivun voi pelata ilmaiseksi netissä tai tulostaa keittiön pöydälle, ja kummin tahansa hän katsoo ryhmää, vertailee sitä lukuun ja valitsee itse enemmän tai vähemmän, omassa tahdissaan.`,

  `Esiopetukseen tämä on kaunis johdatus kirjoitettuihin numeroihin. Ei kelloa, ei pisteitä; lapsi saa laskea {N_PART_PL}, katsoa ja miettiä niin kauan kuin haluaa. Pelaa sivua ruudulla tai tulosta se ja osoittakaa yhdessä — molemmat antavat tarvittavan rauhan yhdistää tyynesti nähdyt määrät ja kirjoitetut numerot, yksi tehtävä kerrallaan.`,

  `Sivu ei vaadi lukutaitoa: lapsi tunnistaa {N_PL}, ja numerot ovat kirjoitettuna hyvin näkyvinä ja selvinä. Siksi se sopii kaikkein nuorimmillekin, jotka ovat juuri huomanneet numerot. Se on ilmainen netissä ja tulostuu, niin että sitä voi tehdä kaikkialla, luokasta kotiin. Jokainen oikea vastaus — enemmän vai vähemmän kuin luku? — on aito voitto, ilman minkäänlaista aikapainetta.`,

  `Pitää lapsi sitten tabletista tai tulostetusta sivusta, se toimii molemmin tavoin. Viisi- ja kuusivuotiaalle se on rauhallinen tehtävä, jossa {N_GEN} määrää vertaillaan kirjoitettuun lukuun ilman vaikeaa vaatimusta. Lapsi käyttää tarvitsemansa ajan, laskee jos haluaa, ja tuntee olonsa hivenen kotoisammaksi numeroiden kanssa joka tehtävän myötä.`,

  `Sivu, joka rakentaa sillan kuvien ja numeroiden välille: lapsi arvioi, montako {N_PART_SG} ryhmässä on, ja vertaa määrää viereiseen lukuun. Sen voi pelata ilmaiseksi netissä tai tulostaa rauhalliseen hetkeen kotona. Ei pisteitä eikä kelloa — vain aikaa katsoa ryhmää, laskea jos on tarpeen, miettiä ja valita enemmän tai vähemmän.`,

  `Sivu on tehty kaikkein nuorimmille, jotka ovat uteliaita numeroista. Lapsi tunnistaa {N_PL}, arvioi määrän ja asettaa sen luvun rinnalle — muuta ei tarvita. Pelaa netissä maksutta tai tulosta keittiön pöydälle. Ilman kilpailua ja ilman kelloa kaikki huomio menee olennaiseen: huomata, että määrät ja numerot kulkevat käsi kädessä.`,

  `Esiopetuksen lapsille tämä on lempeä polku numeroiden maailmaan. Ilman aikarajaa, ilman pisteitä — vain lapsi, ryhmä, jossa on {N_PL}, ja yksi luku kerrallaan, johon määrää verrataan: enemmän vai vähemmän? Löydät sivun ilmaiseksi netistä, ja se myös tulostuu, niin että numeroiden taju kehittyy kotona, retkellä tai missä vain teille parhaiten sopii.`,
];

module.exports = {
  type: 'more-less',
  eyebrow: 'Tehtävä: Enemmän vai vähemmän',
  strand: 'Lukumäärän hahmottaminen',
  slotWord: 'kuvat',
  level: 'esikoulu',
  h1: (mk) => 'Enemmän vai vähemmän: {H1} – esikouluikäisille',
  carousel: (mk, h1Display) => 'Enemmän vai vähemmän – ' + h1Display,
  modes: {
    'check-cross': { SKEL: SKEL_CC, P2: P2_CC },
    'image-image': { SKEL: SKEL_II, P2: P2_II },
    'image-number': { SKEL: SKEL_IN, P2: P2_IN },
  },
  P3: `Jos lapsi piti määrien vertailusta, häntä odottaa vielä paljon muuta. Vilkaiskaa sivuja, joissa on {nb1}, missä uudet kuvaryhmät kutsuvat vertailemaan enemmän ja vähemmän, tai kokeilkaa jotakin aivan toista, kuten {nb2}, jos hän haluaa vaihtelua. Jokainen sivu on rauhallinen katselemisen ja miettimisen tehtävä, ilman kelloa, ilman pisteitä ja ilman painetta, niin että löytämisen ilo kestää, kun lapsi tutkii {N_GEN} kuvat omassa tahdissaan. Kaikki tehtävät ovat täysin ilmaisia: ne voi pelata netissä tabletilla tai tietokoneella, tai tulostaa rauhalliseen hetkeen keittiön pöydälle. Näin lapsi saa jatkaa katsomista, määrien vertailua ja omien oivallustensa juhlimista yksi kerrallaan, ryhmä toisensa jälkeen.`,
};
