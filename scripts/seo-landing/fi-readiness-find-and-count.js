/**
 * fi-readiness-find-and-count.js — suomenkielinen (fi) laskeutumissivun teksti find-and-count-tehtävälle.
 *
 * Tehtävä (Etsi ja laske): KAKSI tilaa. Esiopetus, 5–6-vuotiaat. EI standardia (readiness-tyyppi).
 * Teksti on teema-agnostinen: teeman substantiivi tulee aina fi-render.js:n paikkamerkeistä
 * (käsin tarkistetut suomen sijamuodot fi-themes.js:stä).
 *
 *   hidden-object  (token "Etsi ja laske"): iso, täynnä yksityiskohtia oleva kuva; lapsi ETSII
 *           piilotetut kuvat ja sitten LASKEE, montako niitä on, ja kirjoittaa luvun.
 *           LASKEMINEN ON TEHTÄVÄN YDIN. Tämä tyyppi OMISTAA laskemissanaston:
 *           laske / laskea / montako / kuinka monta / lukumäärä / etsi ja laske.
 *           ({N_PART_SG} laskukysymyksessä "montako ...?", {N_PART_PL} "laske/etsi ...".)
 *           Tämä on PÄINVASTAINEN tehtävä kuin Wave-A:n find-objects/i-spy (jossa EI lasketa).
 *           Strand: Lukumäärän hahmottaminen.
 *   letter-spotting (token "Etsi kirjain"): yksi kohdekirjain piiloutuu kuvaan; lapsi etsii
 *           kirjaimen joka kerta ja laskee, montako kertaa se esiintyy. Esilukutaito + laskeminen.
 *           Rekisteri: etsi kirjain / kirjain / ensimmäinen kirjain / äänne / montako kertaa /
 *           laske kirjaimet / ympyröi kirjain. EI lukemista — tunnistetaan kirjaimen MUOTO ja
 *           lasketaan se, EI lueta sanoja (ei koskaan "yhdistä/lue sana"). Strand: Kielellinen tietoisuus.
 *
 * Käytössä olevat paikkamerkit ja niiden sijat:
 *   {H1}        nominatiivin monikko, isolla (otsikko/karuselli/sivun H1)
 *   {N_PL}      nominatiivin monikko, pienellä — SUBJEKTI ("{N_PL} ovat piilossa kuvassa")
 *   {N_PART_PL} partitiivin monikko, pienellä — OBJEKTI ("laske {N_PART_PL}", "etsi {N_PART_PL}")
 *   {N_PART_SG} partitiivin yksikkö, pienellä — LASKUKYSYMYS ("montako {N_PART_SG}?")
 *   {N_GEN}     genetiivin monikko, pienellä — "{N_GEN} kuvat" = X:n kuvat
 *
 * Mitään teeman substantiivia ei kirjoiteta kovakoodattuna. Ei numeroita. [NSR-FLAG][fi] §17.5.1.
 */
'use strict';

const TOK = (mk) => (mk === 'letter-spotting' ? 'Etsi kirjain' : 'Etsi ja laske');

const SKEL_HIDDEN = [
  `Löytääkö pieni tutkijasi kaikki ja osaako sitten laskea, montako niitä on? Tässä tehtävässä iso ja yksityiskohtainen kuva on aivan täynnä piilopaikkoja, ja {N_PL} ovat piiloutuneet sinne tänne kaikkialle näkymään. Tehtävä etenee kahdessa vaiheessa: ensin etsitään, sitten lasketaan. Lapsi katsoo kuvaa tarkasti, etsii {N_PART_PL} yksi kerrallaan, ympyröi jokaisen löytönsä ja kirjoittaa lopuksi luvun ruutuun. Montako {N_PART_SG}? Juuri tähän kysymykseen pieni vastaa, kun hän on bongannut ne kaikki ja laskenut yhdessä ääneen. Etsiminen ja sen jälkeen laskeminen yhdistää tarkkaavaisuuden lukumäärän hahmottamiseen — juuri sitä esiopetus tarvitsee. Jos lapsi jää miettimään, näkikö hän varmasti kaikki, hän kiertää kuvan rauhassa vielä kerran ja laskee uudelleen ennen kuin merkitsee luvun. Mukana ei ole ajanottoa eikä kilpailua, joten pieni saa etsiä ja laskea aivan omassa tahdissaan. Tehtävä on täysin ilmainen, valmiina tulostettavaksi tai pelattavaksi netissä, juuri silloin kun se lapselle parhaiten sopii.`,

  `Montako {N_PART_SG} mahtaa piileskellä tässä kuvassa? Tästä yksinkertaisesta kysymyksestä koko tehtävä lähtee liikkeelle. Hyvin täyteen ja eloisaan kuvaan ovat sujahtaneet {N_PL}, osa aivan näkyville, osa hieman piiloon kaiken keskelle. Lapsi etsii ne yksi kerrallaan, ympyröi jokaisen löytönsä ja laskee lopuksi, montako niitä oli, ja anna luvun löytää paikkansa ruutuun. Kahta taitoa harjoitellaan samaan aikaan: piilotettujen kuvien etsimistä ja niiden laskemista lopuksi. Kun lapsi luulee löytäneensä kaikki, hän kiertää näkymän mielellään vielä kerran ja laskee {N_PART_PL} uudelleen varmuuden vuoksi. Näin etsimisestä ja laskemisesta tulee rauhallinen, kiireetön leikki kaikkein pienimmille, ja se rakentaa sekä tarkkaa katsetta että lukumäärän tajua — pienen omassa tahdissa, kokonaan ilman kelloa. Lapsen ei tarvitse osata lukea, vain katsoa tarkasti ja laskea rauhassa. Tehtävä on täysin ilmainen ja valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Ensin etsitään, sitten lasketaan: lapsi löytää kuvaan piiloutuneet {N_PL}, laskee montako niitä on ja kirjoittaa luvun ruutuun. Osa esineistä on aivan näkyvillä, osaa taas saa etsiä tarkemmin ja huolellisemmin, joten kuvaa kannattaa tutkia kaikessa rauhassa. Kun kaikki on löydetty, lapsi laskee {N_PART_PL} yhdessä aikuisen kanssa ja merkitsee lopputuloksen ylös. Tämä työtapa sopii esiopetukseen kuin nenä päähän, koska se yhdistää tarkan katsomisen ja laskemisen luontevasti toisiinsa. Pieni voi osoittaa sormella jokaista löytämäänsä esinettä ja laskea samalla ääneen, jottei yksikään jää huomaamatta tai tule lasketuksi kahdesti. Ilman pisteitä ja ilman kelloa: lapsi käyttää juuri niin paljon aikaa kuin tarvitsee, laskee tarvittaessa uudelleen ja iloitsee siitä, kun {N_GEN} kuvat tulevat lasketuiksi oikein. Tehtävä on täysin ilmainen, valmiina tulostettavaksi tai pelattavaksi netissä, lapsen omaan tahtiin sovitettuna.`,

  `Iso kuva, eloisa näkymä aivan täynnä piiloon mennyttä — ja kaksi mukavaa työvaihetta. Jossakin kuvan sisällä ovat hyvin piilossa {N_PL}, ja lapsen tehtävä on ensin löytää ne kaikki ja sitten laskea, montako niitä on. Katse vaeltaa ensin rauhassa pitkin koko kuvaa ja kerää {N_PART_PL} yksi kerrallaan, sitä mukaa kun ne paljastuvat. Sen jälkeen lapsi laskee, kuinka monta niitä löytyi, ja kirjoittaa luvun ruutuun. Etsiminen ja laskeminen samalla kertaa on kaunis harjoitus pienille: lukumäärä pitää pitää mielessä, vaikka tutkiminen vielä jatkuu. Epävarmassa kohdassa lapsi osoittaa sormella jokaista löytöä ja laskee ääneen, jottei mikään jää yli. Tehtävä on rauhallinen ja ilmainen: ei kelloa, ei pisteitä, vain lapsi, iso kuva ja ilo siitä, kun {N_GEN} kuvat tulevat lasketuiksi oikein. Voit istua aivan vierellä ja laskea yhdessä pienen kanssa ääneen. Tehtävä on valmiina tulostettavaksi tai pelattavaksi netissä, juuri sopivana hetkenä.`,

  `Silmät valmiina etsimään ja sormet valmiina laskemaan! Tämä tehtävä tarjoaa lapselle eloisan ja täyden kuvan, johon {N_PL} ovat löytäneet mitä parhaimmat piilopaikat kuvan joka kolkasta. Ohje tulee kahdessa osassa: löydä piilotetut esineet ja laske sitten, kuinka monta niitä on. Lapsi kuljettaa katsetta rauhassa pitkin isoa kuvaa, ympyröi avaamansa löydöt ja laskee lopuksi kaiken yhteen. Kun luku on selvillä, hän merkitsee sen ruutuun. Tämä on mainio tehtävä esiopetukseen, sillä se harjoittaa yhtä aikaa etsimistä ja laskemista, kahta hyvin lähekkäistä taitoa. Lapsi työskentelee omassa tahdissaan ja laskee {N_PART_PL} uudelleen aina, kun siltä tuntuu, eikä mikään hoputa häntä. Jos jokin esine meinaa jäädä hyvin piiloon, sitä etsitään rauhassa vielä kerran. Kaikki tämä on ilmaista, ilman pisteitä ja ilman ajanottoa, ja lapsi saa laskea kaikessa rauhassa. Tehtävä on valmiina tulostettavaksi tai pelattavaksi netissä, lapsen omaan tahtiin sovitettuna.`,

  `Saadaanko {N_PART_PL} laskettua kaikki? Tässä eloisassa näkymässä {N_PL} ovat levittäytyneet sinne tänne, osa helposti nähtävillä, osa piiloon muiden kuvan asioiden taakse. Lapsi löytää ne yksi kerrallaan, laskee montako niitä oli ja kirjoittaa luvun ruutuun. Etsiminen ja laskeminen kulkevat tässä käsi kädessä: oikeaa lukua ei voi merkitä ennen kuin kaikki on löydetty ja kerätty katseella yhteen. Kun lapsi luulee päässeensä loppuun, kannattaa kiertää kuva vielä kerran ja laskea uudelleen, jottei yksikään jää huomaamatta. Pienille tämä on rauhallinen ja turvallinen tehtävä, joka rakentaa tarkkaa katsetta ja lukumäärän hahmottamista — ilman ajanottoa, ilman pisteitä ja lapsen itsensä valitsemassa tahdissa. Montako {N_PART_SG} kuvasta löytyikään? Sen lapsi saa selvittää aivan rauhassa. Tehtävä on täysin ilmainen, valmiina tulostettavaksi tai pelattavaksi netissä, juuri sopivana hetkenä.`,

  `Lapsen tehtävä on etsiä {N_PART_PL} värikkäästä kuvasta ja laskea, kuinka monta niitä on. Ensin etsiminen: pieni kuljettaa katsetta rauhassa pitkin kuvaa ja kerää {N_PART_PL} yksi kerrallaan. Sitten laskeminen: hän laskee, montako niitä löytyi, ja merkitsee luvun ruutuun. Tämä kaksoistehtävä — ensin etsi, sitten laske — sopii esiopetukseen hyvin, koska se harjoittaa sekä tarkkaa katsomista että laskemista lopuksi. Matkan varrella lapsi voi osoittaa sormella jokaista piiloon mennyttä esinettä ja laskea ääneen, jottei yhtäkään unohdu tai tule laskettua kahteen kertaan. Jos laskut menevät sekaisin, ne saa aloittaa rauhassa alusta. Kaikki on ilmaista, ja lapsi etenee omassa tahdissaan, ilman pisteitä ja ilman kelloa, kun {N_GEN} kuvat lasketaan huolellisesti yhteen. Tehtävä on valmiina tulostettavaksi tai pelattavaksi netissä, lapsen omaan tahtiin sovitettuna.`,

  `Tässä kuvassa {N_PL} ovat menneet piiloon monen muun asian keskelle, ja lapsen tehtävä on löytää ne kaikki ja laskea sitten lukumäärä. Pieni etsii {N_PART_PL} rauhassa, yksi kerrallaan, pitäen mielessä, kuinka monta hän on jo löytänyt. Kun kaikki on bongattu, hän laskee yhdessä aikuisen kanssa ja kirjoittaa luvun ruutuun. Etsiminen ja laskeminen samalla kertaa on hieno harjoitus pienille: silmät tekevät töitä ja samalla opitaan laskemaan se määrä, jonka lapsi on itse koonnut. Jos lukumäärää on vaikea pysyä mukana, lapsi voi ympyröidä jokaisen esineen laskiessaan, tai laskea ääneen aikuisen kanssa. Lopuksi hän kiertää näkymän mielellään vielä kerran. Montako {N_PART_SG} kuvasta lopulta löytyi? Koko tehtävä on ilmainen, rauhallinen ja pisteetön — ei kelloa, ja lapsi päättää itse tahdin. Tehtävä on valmiina tulostettavaksi tai pelattavaksi netissä, juuri sopivana hetkenä.`,
];

const P2_HIDDEN = [
  `Tämä etsimisen ja laskemisen tehtävä on suunniteltu juuri pienille, esiopetusikäisille noin viisi- tai kuusivuotiaille. Lapsi löytää {N_PART_PL} kuvasta ja laskee, montako niitä on, omassa tahdissaan ja aivan ilman stressiä. Tehtävä on täysin ilmainen: tulosta se paperille tai pelaa netissä suoraan selaimessa. Mukana ei ole ajanottoa eikä pisteitä — vain rauhallinen ilo etsiä ja laskea {N_PART_PL} omin ehdoin.`,

  `Iso ja eloisa kuva kaikkein pienimmille, jossa lapsi etsii {N_PART_PL} ja laskee, montako hän löysi. Tehtävä sopii niin kotiin kuin esiopetukseen, ja lapsi työskentelee omassa tahdissaan. Voit tulostaa tehtävän paperille tai pelata sen netissä — se on täysin ilmainen, pisteetön, ja lapsi päättää itse tahdin koko ajan. Montako {N_PART_SG} kuvasta löytyy, sen pieni saa selvittää rauhassa.`,

  `Pienimmille, jotka harjoittelevat etsimistä ja laskemista. Täällä lapsi löytää {N_PART_PL} eloisasta kuvasta ja kirjoittaa luvun, jonka hän sai. Tehtävä on täysin ilmainen: tulosta se paperille tai pelaa netissä selaimessa. Ilman pisteitä ja ilman kelloa — vain rauhallinen etsiminen ja laskeminen, lapsen omassa tahdissa ja juuri niin kauan kuin hän haluaa.`,

  `Tämä etsimisen ja laskemisen tehtävä sopii kotiin ja esiopetukseen. Lapsi löytää {N_PART_PL} eloisasta kuvasta ja laskee, kuinka monta niitä on, kaikessa rauhassa. Valitse vain: tulosta tehtävä paperille tai pelaa se netissä suoraan selaimessa. Se on ilmainen ja pisteetön, ja pieni etenee niin rauhallisesti kuin haluaa — ilman kelloa ja ilman stressiä, omin ehdoin laskien.`,

  `Rauhoittava tehtävä pienimmille, jossa lapsi etsii {N_PART_PL}, laskee ne yhteen ja kirjoittaa luvun. Tehtävä sopii kotiin ja esiopetukseen, ja lapsi työskentelee omassa tahdissaan. Sen voi tulostaa paperille tai pelata ilmaiseksi netissä. Ilman pisteitä ja ilman ajanottoa, joten lapsi saa käyttää kaiken ajan maailmassa ja laskea {N_PART_PL} uudelleen niin monta kertaa kuin haluaa.`,

  `Pienille suunniteltu, niin kotiin kuin esiopetukseen, missä lapsi löytää {N_PART_PL} kuvasta ja laskee, montako hän bongasi. Tehtävä on ilmainen: tulosta se paperille tai pelaa netissä suoraan selaimessa. Se on rauhallinen ja täysin pisteetön leikki, jossa lapsi päättää itse tahdin ja saa laskea uudelleen aina, kun siltä tuntuu.`,

  `Aivan yksinkertainen etsimisen ja laskemisen tehtävä pienille, jossa lapsi löytää {N_PART_PL} ja laskee lukumäärän omassa tahdissaan. Se sopii hyvin kotiin ja esiopetukseen. Tehtävä on täysin ilmainen: tulosta paperille tai pelaa netissä selaimessa. Mukana ei ole ajanottoa eikä pisteitä, vain rauhallinen ilo etsiä ja laskea {N_PART_PL} kaikkein pienimpienkin kanssa.`,
];

const SKEL_LETTER = [
  `Tässä kirjainjahdissa yksi ja sama kirjain piiloutuu {N_GEN} kuvien sekaan. Lapsi etsii kirjaimen joka kerta, kun se ilmestyy näkymään, laskee montako kertaa se on siellä ja kirjoittaa luvun ruutuun. Tehtävä etenee kahdessa vaiheessa: ensin etsitään piilossa oleva kirjain, sitten lasketaan, montako kertaa se esiintyy. Sen tietäminen, mikä kirjain on kyseessä, on mukava lisä, mutta varsinaisesti lapsi harjoittelee etsimistä ja laskemista. Katse kulkee rauhassa pitkin koko kuvaa, ja pieni ympyröi kirjaimen joka kerta, kun se bongaa sen {N_PART_PL} joukosta. Lopuksi hän laskee yhdessä aikuisen kanssa ja merkitsee luvun. Epävarmassa kohdassa kannattaa kiertää näkymä vielä kerran ja laskea uudelleen. Kaikki on ilmaista, lapsen omassa tahdissa, ilman ajanottoa ja ilman pisteitä — kirjaimet saa laskea niin monta kertaa kuin haluaa. Tehtävä on valmiina tulostettavaksi tai pelattavaksi netissä, juuri sopivana hetkenä.`,

  `Montako kertaa kirjain piileskelee {N_GEN} kuvien seassa? Lapsi etsii kirjaimen kerta toisensa jälkeen ja laskee sitten yhteen. Yksi ainoa kirjain on sujahtanut sinne tänne kuvaan, ja pienen tehtävä on etsiä kirjain joka kerta ja laskea, montako kertaa se esiintyy. Tämä on kirjainjahti kaikkein pienimmille: ensin etsitään, sitten lasketaan. Lukutaitoa ei tarvita — riittää, että lapsi tunnistaa kirjaimen muodon ja pitää lukumäärän mielessä matkan varrella. Kun kaikki on löydetty, hän laskee yhdessä ja kirjoittaa luvun ruutuun. Jos laskut menevät sekaisin, ne saa aloittaa rauhassa alusta ja laskea uudelleen. Lapsi katsoo {N_PART_PL} kuvaa kaikessa rauhassa ja keskittyy vain tähän yhteen kirjaimeen. Tehtävä on ilmainen, rauhallinen ja pisteetön. Mukana ei ole kelloa, ja pieni etenee omassa tahdissaan koko ajan. Se on valmiina tulostettavaksi tai pelattavaksi netissä, juuri sopivana hetkenä.`,

  `Nyt etsimään kirjainta ja laskemaan! Yksi kirjain piiloutuu {N_GEN} kuvien sekaan, ja lapsen tehtävä on etsiä kirjain joka kerta ja laskea, montako kertaa se ilmestyy. Hän kuljettaa katsetta rauhassa pitkin kuvaa, etsii kirjaimen sieltä, missä se näkyy, ja pitää lukumäärän mielessä matkan varrella. Lopuksi hän laskee yhteen ja kirjoittaa luvun ruutuun. Tärkeintä ei ole lukea sanoja vaan etsiä kirjain ja laskea se — juuri siksi tämä tehtävä sopii niin hyvin esiopetuksen pienimmille. Jos lapsi kadottaa laskunsa, hän ympyröi jokaisen kirjaimen laskiessaan ääneen, tai laskee yhdessä aikuisen kanssa. Lopuksi hän kiertää näkymän mielellään vielä kerran varmuuden vuoksi. Lapsi etsii kirjaimen {N_PART_PL} joukosta omassa tahdissaan. Kaikki on ilmaista, ilman pisteitä ja ilman kelloa, pienen omaan tahtiin sovitettuna. Tehtävä on valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Yksi kirjain on piiloutunut {N_GEN} kuvien sekaan tässä tehtävässä. Lapsen on etsittävä kirjain joka kerta, kun se ilmestyy, ja laskettava, montako kertaa niin kävi. Ensin etsiminen, sitten laskeminen: pieni antaa katseen vaeltaa rauhassa pitkin koko kuvaa, etsii kirjaimen ja laskee yhteen. Kun hän on valmis, hän kirjoittaa luvun ruutuun. Kirjaimen tunnistaminen on mukava lisä — varsinaisesti lapsi harjoittelee etsimistä ja laskemista. Epävarmassa kohdassa hän osoittaa sormella jokaista kirjainta laskiessaan ääneen, jottei yksikään jää huomaamatta. Tämä kirjainjahti on rauhallinen ja turvallinen pienille, ja lapsi tutkii {N_PART_PL} kuvaa kaikessa rauhassa. Mukana ei ole kelloa eikä pisteitä, joten pieni saa käyttää kaiken ajan, laskea uudelleen ja iloita onnistumisesta. Tehtävä on täysin ilmainen, valmiina tulostettavaksi tai pelattavaksi netissä, juuri sopivana hetkenä.`,

  `Tässä tehtävässä yksi kirjain piileskelee monen {N_GEN} kuvan seassa. Lapsen on etsittävä kirjain joka kerta ja laskettava, montako kertaa se on siellä. Kirjainjahti on pienille etsimistä ja laskemista, ei lukemista — lapsi vain tunnistaa kirjaimen muodon ja pitää lukumäärän mielessä matkan varrella. Kuljetettuaan katseen rauhassa pitkin {N_PART_PL} kuvaa hän laskee yhteen ja kirjoittaa luvun ruutuun. Kannattaa kiertää näkymä vielä kerran, jottei mikään jäänyt huomaamatta, ja laskea sitten uudelleen. Lapsi voi osoittaa sormella jokaista kirjainta laskiessaan ääneen. Tehtävä on ilmainen, pisteetön ja ilman ajanottoa, ja pieni työskentelee rauhassa omassa tahdissaan. Montako kertaa kirjain kuvasta lopulta löytyikään? Sen lapsi saa selvittää aivan rauhassa. Tehtävä on valmiina tulostettavaksi tai pelattavaksi netissä.`,

  `Etsi kirjain ja laske! Yksi kirjain sujahtaa {N_GEN} kuvien sekaan, ja lapsen tehtävä on etsiä kirjain joka kerta ja laskea, montako kertaa se ilmestyy. Hän katsoo koko kuvan rauhassa läpi, etsii kirjaimen sieltä, missä se näyttäytyy, ja laskee lopuksi yhteen. Sitten hän merkitsee luvun ruutuun. Tärkeintä ei ole lukea sanaa vaan etsiä tämä yksi kirjain ja laskea se — kaunis harjoitus esiopetuksen pienille. Lapsi voi ympyröidä jokaisen kirjaimen laskiessaan ääneen, jottei yksikään unohdu tai tule laskettua kahdesti {N_PART_PL} seasta. Jos laskut menevät sekaisin, ne saa aloittaa rauhassa alusta. Kaikki on täysin ilmaista, ilman pisteitä ja ilman kelloa, pienen omaan tahtiin sovitettuna. Tehtävä on valmiina tulostettavaksi tai pelattavaksi netissä, juuri sopivana hetkenä.`,

  `Tässä on kirjainjahti kaikkein pienimmille. Yksi kirjain piiloutuu {N_GEN} kuvien sekaan, ja lapsen on etsittävä kirjain joka kerta ja laskettava, montako kertaa niin kävi. Hän kuljettaa katsetta rauhassa pitkin {N_PART_PL} kuvaa, ympyröi kirjaimen siellä, missä se ilmestyy, ja laskee lopuksi yhteen. Sitten hän kirjoittaa luvun ruutuun. Kirjaimen etsiminen ja laskeminen, sitä lapsi tässä harjoittelee — lukutaitoa ei tarvita, riittää että hän tunnistaa tämän yhden kirjaimen muodon. Jos lukumäärää on vaikea pysyä mukana, lapsi voi laskea ääneen yhdessä aikuisen kanssa. Kun hän luulee päässeensä loppuun, hän laskee mielellään vielä kerran. Kaikki on ilmaista, rauhallista ja pisteetöntä — ei kelloa, ja lapsi päättää itse tahdin. Tehtävä on valmiina tulostettavaksi tai pelattavaksi netissä, juuri sopivana hetkenä.`,

  `Montako kertaa kirjain piileskelee {N_GEN} kuvien seassa? Tässä kirjainjahdissa lapsen on etsittävä tämä yksi kohdekirjain joka kerta ja laskettava yhteen. Hän antaa katseen vaeltaa rauhassa pitkin {N_PART_PL} kuvaa, etsii kirjaimen ja pitää mielessä, kuinka monta kertaa se ilmestyy matkan varrella. Lopuksi hän laskee yhdessä ja kirjoittaa luvun ruutuun. Kyse ei ole lukemisesta vaan etsimisestä ja laskemisesta — siksi tämä tehtävä sopii niin hyvin esiopetuksen pienille. Jos laskut menevät sekaisin, lapsi ympyröi jokaisen kirjaimen laskiessaan ääneen ja aloittaa mielellään rauhassa alusta. Tehtävä on ilmainen, pisteetön ja ilman ajanottoa, ja pieni etenee omassa tahdissaan. Tehtävä on valmiina tulostettavaksi tai pelattavaksi netissä, juuri sopivana hetkenä.`,
];

const P2_LETTER = [
  `Tämä kirjainjahti on suunniteltu pienille, esiopetusikäisille lapsille. Lapsi etsii kirjaimen {N_GEN} kuvien seasta ja laskee, montako kertaa se ilmestyy, aivan rauhassa. Tehtävä on ilmainen: tulosta se paperille tai pelaa netissä suoraan selaimessa. Mukana ei ole kelloa eikä pisteitä — vain rauhallinen ilo etsiä ja laskea, lapsen omassa tahdissa.`,

  `Aivan rauhallinen etsimisen ja laskemisen tehtävä, jossa lapsi löytää kirjaimen {N_GEN} kuvien seasta ja laskee, montako kertaa niin kävi. Se sopii niin kotiin kuin esiopetukseen, ja lapsi työskentelee omassa tahdissaan. Voit tulostaa tehtävän paperille tai pelata sen netissä — se on ilmainen ja pisteetön, ja lapsi päättää itse tahdin koko ajan.`,

  `Pienille, jotka harjoittelevat etsimistä ja laskemista. Täällä lapsi löytää kirjaimen {N_GEN} kuvien seasta ja laskee, montako kertaa se näyttäytyy. Tehtävä on täysin ilmainen: tulosta se paperille tai pelaa netissä selaimessa. Ilman pisteitä ja ilman kelloa — vain rauhallinen etsiminen ja laskeminen, lapsen omassa tahdissa ja juuri niin kauan kuin hän haluaa.`,

  `Tämä kirjainjahti sopii kotiin ja esiopetukseen. Lapsi etsii kirjaimen {N_GEN} kuvien seasta ja laskee yhteen, kaikessa rauhassa. Valitse vain: tulosta tehtävä paperille tai pelaa se netissä suoraan selaimessa. Se on ilmainen ja pisteetön, ja pieni etenee niin rauhallisesti kuin haluaa — ilman kelloa ja ilman stressiä.`,

  `Rauhoittava tehtävä pienimmille, jossa lapsi etsii kirjaimen {N_GEN} kuvien seasta, laskee sen ja kirjoittaa luvun. Tehtävä sopii kotiin ja esiopetukseen, ja lapsi työskentelee omassa tahdissaan. Sen voi tulostaa paperille tai pelata ilmaiseksi netissä. Ilman pisteitä ja ilman ajanottoa, joten lapsi saa käyttää kaiken ajan ja laskea kirjaimet uudelleen niin monta kertaa kuin haluaa.`,

  `Pienille suunniteltu, niin kotiin kuin esiopetukseen, missä lapsi etsii kirjaimen {N_GEN} kuvien seasta ja laskee, montako kertaa se on siellä. Tehtävä on ilmainen: tulosta se paperille tai pelaa netissä suoraan selaimessa. Se on rauhallinen ja täysin pisteetön leikki, jossa lapsi päättää itse tahdin ja saa laskea uudelleen aina, kun siltä tuntuu.`,

  `Aivan yksinkertainen kirjainjahti pienille, jossa lapsi etsii kirjaimen {N_GEN} kuvien seasta ja laskee yhteen omassa tahdissaan. Se sopii hyvin kotiin ja esiopetukseen. Tehtävä on täysin ilmainen: tulosta paperille tai pelaa netissä selaimessa. Mukana ei ole ajanottoa eikä pisteitä, vain rauhallinen ilo etsiä ja laskea kirjaimia kaikkein pienimpienkin kanssa.`,
];

module.exports = {
  type: 'find-and-count',
  eyebrow: 'Tehtävä: Etsi ja laske',
  strand: (mk) => (mk === 'letter-spotting' ? 'Kielellinen tietoisuus' : 'Lukumäärän hahmottaminen'),
  slotWord: 'kuvat',
  level: 'esikoulu',
  h1: (mk) =>
    mk === 'letter-spotting'
      ? 'Etsi kirjain: {H1} – esikouluikäisille'
      : 'Etsi ja laske: {H1} – esikouluikäisille',
  carousel: (mk, h1Display) =>
    (mk === 'letter-spotting' ? 'Etsi kirjain – ' : 'Etsi ja laske – ') + h1Display,
  modes: {
    'hidden-object': {
      SKEL: SKEL_HIDDEN,
      P2: P2_HIDDEN,
    },
    'letter-spotting': {
      SKEL: SKEL_LETTER,
      P2: P2_LETTER,
    },
  },
  P3: `Jos lapsi piti etsimisestä ja laskemisesta, hän voi jatkaa mukavaa oivaltamista muilla yhtä rauhallisilla tehtävillä, kuten {nb1} tai {nb2}. Ne kaikki on suunniteltu harjoittamaan tarkkaa katsetta ja lukumäärän hahmottamista leikin lomassa, kun pieni laskee {N_PART_PL} aivan kaikessa rauhassa. Tarjoa niitä lempein sanoin ja ilman kiirettä, antaen lapsen edetä omassa tahdissaan ja iloita siitä, kun määrä tulee lasketuksi oikein. Kaikki tehtävät ovat täysin ilmaisia, valmiina tulostettavaksi tai pelattavaksi netissä juuri silloin, kun se lapselle parhaiten sopii.`,
};
