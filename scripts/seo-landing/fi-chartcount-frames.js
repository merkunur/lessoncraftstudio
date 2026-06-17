'use strict';

// Native Finnish prose frames for the `chart-count` landing type (pictograph / pylväsdiagrammi).
// STANDARD-BEARING fi · 1. luokka · OPS strand "Tilastot ja todennäköisyys" · K.MD.B.3.
// Placeholders substituted per deck by the generator:
//   {T}    — theme name, Capitalized nominative noun (e.g. "Eläimet")
//   {CATS} — chart category names, nominative, already joined (e.g. "poro, norsu ja susi")
// Diversity requirement: 8 p1 × 6 p2 = 48 distinct cells > ~40 decks → every deck a unique combo.
// HARD RULES: no literal digits anywhere; never inflect a category noun (categories appear ONLY
// via {CATS}, nominative); counting described with the safe generic nouns kuvaa / pylväs /
// pylväät / pylväitä / ryhmä / ryhmät. The per-item lukumäärät live in a separate Quiz, not here.

const p1 = [
  // 1 — OPENING: question hook · leans on the sorting step
  'Montako kutakin kuvaa tästä kaaviosta löytyy? Tämä {T}-aiheinen pylväsdiagrammi pyytää lasta lajittelemaan kuvat omiin ryhmiinsä ja laskemaan, kuinka monta kuvaa kuhunkin ryhmään kuuluu. Kaaviossa näkyy tuttuja kuvia, kuten {CATS}, ja lapsi värittää yhden ruudun jokaista kuvaa kohti, jolloin pylväät kasvavat vähitellen ylöspäin. Kun kaikki ryhmät on käyty läpi, lapsi näkee yhdellä silmäyksellä, mikä pylväs on korkein ja mikä matalin. Tehtävä sopii ensimmäisen luokan oppilaalle, joka harjoittelee laskemista ja tutustuu samalla tilastojen lukemiseen. Harjoitus on maksuton, ja sen voi tulostaa paperille tai tehdä suoraan näytöllä rauhassa ilman kiirettä.',

  // 2 — OPENING: imperative · leans on the colouring-the-bars step
  'Lajittele, laske ja väritä yksi ruutu kerrallaan. Tässä {T}-aiheisessa kuvaajassa lapsi etenee selkeästi vaihe vaiheelta: ensin kuvat kerätään omiin ryhmiinsä, sitten kustakin ryhmästä lasketaan kuvat, ja lopuksi jokaista kuvaa kohti väritetään yksi ruutu. Kun ruutuja väritetään, pylväät nousevat ja kaaviosta tulee elävä. Kuvina ovat esimerkiksi {CATS}, jotka tekevät laskemisesta tutun ja mukavan tuntuista. Pylväiden korkeutta vertailemalla lapsi oppii näkemään, mistä kuvasta on eniten ja mistä vähiten. Harjoitus on suunniteltu ensimmäiselle luokalle, ja se on ilmainen sekä helppo tulostaa. Kaikessa rauhassa, ilman aikarajaa tai pistelaskua, lapsi pääsee tutustumaan tilastojen maailmaan.',

  // 3 — OPENING: scene-setting statement · leans on comparing tallest/shortest
  'Valmis kaavio kertoo tarinansa pylväiden korkeuden avulla. Tämä {T}-aiheinen pylväsdiagrammi täyttyy, kun lapsi laskee jokaisen ryhmän kuvat ja värittää niitä vastaavan määrän ruutuja. Lopputuloksena syntyy joukko eri korkuisia pylväitä, joita on hauska verrata keskenään. Kuvat, kuten {CATS}, muodostavat kaavion ryhmät, ja jokainen niistä saa oman pylväänsä. Lapsi pohtii, mikä pylväs kohoaa korkeimmalle ja mikä jää matalimmaksi, ja oppii samalla, että kaavio näyttää määrät havainnollisesti. Tämä on juuri sitä alkeismuotoista tilastojen lukemista, jota ensimmäisellä luokalla harjoitellaan. Tehtävä on maksuton, ja sen voi tulostaa tai tehdä näytöllä omassa tahdissa.',

  // 4 — OPENING: parent-tip · leans on the calm, no-pressure tone
  'Vanhemmalle pieni vinkki: anna lapsen edetä tässä omaan tahtiinsa, sillä kiirettä ei ole. Tämä {T}-aiheinen kuvaaja on rauhallinen harjoitus, jossa lapsi lajittelee kuvat ryhmiin ja laskee ne yksi kerrallaan. Kuvina ovat esimerkiksi {CATS}, ja jokaista laskettua kuvaa kohti väritetään yksi ruutu, jolloin pylväät kasvavat verkkaisesti. Ei ajastinta, ei pisteitä eikä kilpailua – vain laskemisen ja vertailun iloa. Kun kaavio on valmis, voitte yhdessä katsoa, mikä pylväs on korkein. Harjoitus tukee ensimmäisen luokan laskutaitoa ja tutustuttaa tilastojen lukemiseen lempeästi. Tehtävän voi tulostaa kotona ilmaiseksi tai tehdä suoraan ruudulta.',

  // 5 — OPENING: "when the chart is done…" framing · leans on the data-handling idea
  'Kun pylväät on väritetty valmiiksi, lapsella on edessään oikea pikku tilasto. Tämä {T}-aiheinen pylväsdiagrammi opettaa, että kuvien määrän voi esittää kasvavina pylväinä, joita on helppo lukea silmäyksellä. Lapsi lajittelee ensin kuvat omiin ryhmiinsä, laskee jokaisen ryhmän ja värittää sitten yhden ruudun jokaista kuvaa kohti. Kaavion ryhmät muodostuvat tutuista kuvista, kuten {CATS}. Tällä tavalla lapsi tutustuu ensimmäisellä luokalla siihen, miten tietoa kerätään ja esitetään kaavion muodossa. Korkeimman ja matalimman pylvään vertailu tekee tuloksesta konkreettisen. Harjoitus on ilmainen, tulostettava sekä näytöllä toimiva, eikä siihen liity minkäänlaista kiirettä tai kilpailua.',

  // 6 — OPENING: curiosity hook · leans on the counting step
  'Mitä kaaviosta löytyy eniten? Sen selvittäminen on tämän {T}-aiheisen kuvaajan ydin. Lapsi käy läpi kaikki kuvat, lajittelee ne ryhmiin ja laskee huolellisesti, kuinka monta kuvaa kuhunkin ryhmään kuuluu. Kuvat, kuten {CATS}, antavat laskemiselle konkreettisen ja mukavan kohteen. Jokaista laskettua kuvaa kohti lapsi värittää yhden ruudun, ja näin pylväät nousevat määrien mukaan. Kun työ on tehty, pylväiden korkeuksia on helppo verrata ja löytää korkein sekä matalin. Tämä laskemista ja tilastojen lukemista yhdistävä tehtävä on tarkoitettu ensimmäiselle luokalle. Se on maksuton ja sopii sekä tulostettavaksi että näytöllä tehtäväksi rauhassa.',

  // 7 — OPENING: home-vs-school angle · leans on the sorting + grouping idea
  'Tämä harjoitus toimii yhtä hyvin luokassa kuin kotonakin keittiönpöydän ääressä. Tässä {T}-aiheisessa pylväsdiagrammissa lapsi ryhmittelee kuvat ja laskee, montako kuvaa kuhunkin ryhmään tulee. Kuvina käytetään tuttuja aiheita, kuten {CATS}, joten lapsi tunnistaa ne helposti. Lajittelun jälkeen jokaista kuvaa vastaa yksi väritetty ruutu, ja pylväät kasvavat vähitellen. Valmis kaavio näyttää selkeästi, mikä ryhmä on suurin ja mikä pienin. Näin lapsi harjoittelee ensimmäisen luokan laskutaitoa ja oppii samalla esittämään tietoa kaavion avulla. Tehtävä on ilmainen, ja sen voi tulostaa paperille tai avata näytöllä – ilman ajastinta, pisteitä tai kilpailua.',

  // 8 — OPENING: warm encouraging tone · leans on the whole journey end-to-end
  'Jokainen lapsi pärjää tässä tehtävässä, kun saa edetä rauhassa askel askeleelta. Tämä {T}-aiheinen kuvaaja kuljettaa lapsen koko matkan: kuvat lajitellaan ryhmiin, ryhmät lasketaan ja jokaista kuvaa kohti väritetään yksi ruutu, kunnes pylväät ovat valmiit. Kaavion ryhmät syntyvät kuvista, kuten {CATS}. Lopuksi on hauska tutkia, mikä pylväs ylsi korkeimmalle ja mikä jäi matalimmaksi. Tällainen laskemisen ja vertailun yhdistäminen on juuri sitä, mitä ensimmäisen luokan tilasto-osio harjoittaa. Harjoitus on maksuton, tulostettava ja näytöllä toimiva, eikä siinä ole minkäänlaista kiirettä eikä kilpailua – vain oppimisen iloa omassa tahdissa.',
];

const p2 = [
  // 1 — leans on the counting + colouring mechanics
  'Tehtävän idea on yksinkertainen: lapsi laskee jokaisen ryhmän kuvat ja värittää saman verran ruutuja pylvääseen. Kun kuvina ovat esimerkiksi {CATS}, jokainen niistä saa oman pylväänsä, jonka korkeus kertoo määrän. Ruutu kerrallaan etenevä värittäminen tekee laskemisesta konkreettista ja palkitsevaa. Lapsi näkee heti, miten määrä muuttuu pylvään korkeudeksi.',

  // 2 — leans on comparison
  'Kun pylväät on väritetty, alkaa hauskin osa: vertailu. Lapsi katsoo, mikä pylväs on korkein ja mikä matalin, ja huomaa, miten määrät erottuvat selvästi toisistaan. Kuvat, kuten {CATS}, näkyvät kaaviossa omina pylväinään, joten erot on helppo havaita. Näin lapsi oppii lukemaan kaaviota ja tekemään siitä pieniä päätelmiä.',

  // 3 — leans on the data-handling / tilastot idea
  'Tässä harjoituksessa lapsi kohtaa tilastojen perusajatuksen turvallisessa muodossa: tieto kerätään, ryhmitellään ja esitetään pylväinä. Kaavion ryhmät muodostuvat tutuista kuvista, kuten {CATS}, mikä tekee asiasta helposti ymmärrettävän. Lapsi huomaa, että kaavio kertoo määrät nopeammin kuin pelkkä kuvien rivi. Tämä on ensimmäisen luokan tilastotaitojen alku.',

  // 4 — leans on the sorting step
  'Ennen laskemista kuvat täytyy lajitella, ja juuri se on tehtävän ensimmäinen taito. Lapsi katsoo kaaviossa olevia kuvia, kuten {CATS}, ja sijoittaa jokaisen omaan ryhmäänsä. Vasta kun ryhmät ovat selvät, laskeminen sujuu ja pylväät voi värittää oikein. Lajittelu opettaa lasta huomaamaan, mitkä kuvat kuuluvat yhteen ja mitkä eivät.',

  // 5 — leans on the calm, no-competition tone
  'Tässä ei kiirehditä eikä kilpailla. Lapsi saa rauhassa laskea ryhmät ja värittää pylväät omaan tahtiinsa, ilman ajastinta tai pisteitä. Kuvat, kuten {CATS}, tekevät tehtävästä lempeän ja tutun tuntuisen. Tärkeintä on, että lapsi nauttii laskemisesta ja oppii samalla lukemaan valmista kaaviota – virheille on tilaa ja uudelleen yrittäminen on aina sallittua.',

  // 6 — leans on the visual "bars growing" experience
  'Pylväiden kasvaminen on tehtävän palkitsevin hetki. Jokainen väritetty ruutu nostaa pylvästä hieman ylemmäs, ja vähitellen kaavio täyttyy värikkäistä pylväistä. Kun ryhminä ovat kuvat, kuten {CATS}, lapsi näkee oman työnsä tuloksen heti edessään. Valmiista kaaviosta on helppo huomata, mikä ryhmä on suurin ja mikä pienin, ja siitä lapsi voi olla ylpeä.',
];

const p3 = [
  // 1 — what the child learns + standard framing
  'Tämä {T}-aiheinen harjoitus tukee ensimmäisen luokan oppilaan laskutaitoa ja johdattaa tilastojen lukemiseen. Lapsi oppii lajittelemaan, laskemaan ja esittämään määrät pylväsdiagrammina sekä vertailemaan pylväiden korkeuksia keskenään. Nämä taidot ovat osa opetussuunnitelman tilastot ja todennäköisyys -sisältöjä, joissa harjoitellaan tiedon keräämistä ja sen havainnollista esittämistä. Harjoitus on maksuton, ja sen voi tulostaa paperille tai tehdä suoraan näytöllä rauhassa ja ilman kiirettä.',

  // 2 — practical use, parent/teacher angle
  'Tämän {T}-aiheisen kaavion voi ottaa käyttöön niin koulussa kuin kotonakin. Opettaja voi tulostaa sen koko luokalle, ja vanhempi voi tehdä sen lapsen kanssa keittiönpöydän ääressä. Harjoitus sopii hyvin laskutaidon vahvistamiseen ja tilastojen alkeisiin ensimmäisellä luokalla. Koska tehtävässä ei ole ajastinta, pisteitä eikä kilpailua, lapsi saa keskittyä rauhassa laskemiseen ja kaavion lukemiseen. Materiaali on ilmainen ja toimii sekä tulostettuna että näytöllä.',

  // 3 — ties counting to data interpretation
  'Kun {T}-aiheinen pylväsdiagrammi on valmis, lapsi ei ole vain laskenut kuvia vaan myös oppinut tekemään niistä pieniä päätelmiä. Korkein pylväs kertoo suurimman ryhmän ja matalin pienimmän, ja näiden vertailu on tärkeä osa tilastojen lukemista. Tällainen laskemisen ja tulkinnan yhdistäminen tukee opetussuunnitelman tilastot ja todennäköisyys -tavoitteita ensimmäisellä luokalla. Harjoitus on maksuton, helppo tulostaa ja se onnistuu myös näytöllä omassa tahdissa.',

  // 4 — emphasises step-by-step accessibility
  'Tämä {T}-aiheinen kuvaaja on rakennettu niin, että jokainen ensimmäisen luokan oppilas pärjää sen kanssa. Lajittelu, laskeminen ja ruutujen värittäminen etenevät selkeinä vaiheina, joissa lapsi voi pysähtyä ja edetä omaan tahtiinsa. Näin lapsi rakentaa varmuutta sekä laskutaidossa että kaavion lukemisessa. Tehtävä kuuluu tilastojen ja todennäköisyyden harjoituksiin, ja se on tarjolla maksuttomana, tulostettavana sekä näytöllä toimivana ilman minkäänlaista kiirettä tai kilpailua.',

  // 5 — repeat-friendly + skill growth
  'Tätä {T}-aiheista harjoitusta voi tehdä uudelleen ja uudelleen, sillä laskeminen ja kaavion lukeminen vahvistuvat toistolla. Joka kerta lapsi harjaantuu lajittelemaan kuvat nopeammin, laskemaan tarkemmin ja värittämään pylväät huolellisesti. Tilastojen lukeminen muuttuu vähitellen tutuksi, kun korkeimman ja matalimman pylvään löytäminen alkaa sujua kuin itsestään. Materiaali tukee ensimmäisen luokan opetussuunnitelmaa, ja se on ilmainen, tulostettava sekä näytöllä käytettävä.',

  // 6 — warm closing, big picture
  'Pieni {T}-aiheinen pylväsdiagrammi avaa lapselle ison oivalluksen: määrät voi esittää kuvina, jotka kertovat tarinansa yhdellä silmäyksellä. Laskemalla ryhmät ja värittämällä pylväät lapsi tekee ensimmäiset askeleensa tilastojen maailmassa ja oppii samalla vertailemaan ja päättelemään. Tämä taito kantaa pitkälle ja kuuluu ensimmäisen luokan tilastot ja todennäköisyys -sisältöihin. Harjoitus on maksuton, tulostettava ja näytöllä toimiva, eikä siihen liity ajastinta, pisteitä eikä kilpailua – vain rauhallista oppimisen iloa.',
];

module.exports = { p1, p2, p3 };
