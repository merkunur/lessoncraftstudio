import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'ilmainen piirrustustehtävä verkossa',
    secondaryKeywords: [
      'piirrustustehtäviä ilmaiseksi verkossa',
      'piirrosgeneraattori ilman rekisteröitymistä',
      'kokeile piirrustustehtävää ilmaiseksi',
      'tulostettava piirrustustehtävä ilmainen kokeilu',
    ],
    lsiKeywords: [
      'ilmainen',
      'verkossa',
      'vesileima',
      'kokeile',
      'ei rekisteröitymistä',
      'piirrostehtävä',
    ],
    titleTag: 'Ilmainen piirrustustehtävä verkossa | Kokeile heti',
    metaDescription: 'Tee piirrustustehtäviä ilmaiseksi verkossa — ei rekisteröitymistä. Kaikki ominaisuudet käytössä, vesileima poistettavissa lisenssillä.',
  },

  hero: {
    title: 'Piirrä ja Väritä Tehtävägeneraattori',
    tagline: 'Luo kaksoisruudukko-piirustustehtäviä säädettävällä vihjemäärällä, kolmella symmetriatilalla ja täysin visuaalisella tekstittömällä tulosteella, joka myy maailmanlaajuisesti ilman käännöstä',
    description: 'Luo ammattimaisia ruudukkopiirrostehtäviä, joissa käyttäjät toistavat viitekuvan kopioimalla sen solu solulta vihjeruudukosta tyhjään harjoitteluruudukkoon. Kaksi ruudukkoa näkyy per valittu kuva: Harjoitteluruudukko tyhjillä soluilla piirtämistä varten ja Vihjeruudukko, jossa konfiguoitava prosenttiosuus viitekuvasta näkyviin visuaalisina vihjeinä. Säädä vihjemäärää 10%:sta 75%:iin hallitaksesi vaikeusastetta — vähemmän vihjeitä tarkoittaa vaikeampia harjoituksia. Konfiguroi ruudukon ulottuvuudet 3×3:sta (9 solua) 10×10:een (100 solua), rivit ja sarakkeet itsenäisesti säädettävinä. Kolme symmetriatilaa lisää tilallisen arvioinnin ulottuvuuden: Satunnainen levittää vihjeitä mielivaltaisiin kohtiin, Vaakasuora peilaa vihjeitä vasen-oikea, ja Pystysuora peilaa vihjeitä ylhäältä-alas. Sisältö haetaan sisäänrakennetusta mustavalkoisten ääriviivojen kirjastosta 100+ kokoelmalla yli 3 000 mustavalkoisella kuvituksella, jotka on erityisesti suunniteltu piirustukseen ja väritykseen — puhtaat ääriviivat, jotka käyttäjät toistavat ja sitten värittävät. Tämä on täysin visuaalinen sovellus: tehtäväarkit sisältävät vain ruudukkokuvia ilman tekstiä, tehden tuotteista yleismaailmallisesti myytäviä ilman käännöstä. Erillistä vastausavainta ei ole, koska vihjeruudukko itse toimii viiteratkaisuna. Vie tulostusvalmiita PDF-tiedostoja ja JPEG-kuvia 300 DPI:llä Letter-, A4-, Neliö (1200×1200)- tai mukautetuissa koissa. Vaihda harmaasävy musteystävällistä tulostetta varten. Ilmainen kokeilu sisältää kaikki ominaisuudet vesileimalla. Osta lisenssi poistaaksesi vesileiman ja myydäksesi kaupallisesti.',
  },

  tutorial: {
    title: 'Näin Teet Ruudukkopiirrostehtäviä 8 Vaiheessa',
    steps: [
      { title: 'Avaa Piirrä ja Väritä -generaattori', description: 'Napsauta "Kokeile ilmaiseksi nyt" käynnistääksesi generaattorin selaimessasi. Työkalu avautuu suoraan asetusten sivupalkilla vasemmalla ja esikatselukankaalla oikealla. Ei tiliä, latausta tai asennusta tarvita.' },
      { title: 'Aseta sivun asettelu ja tausta', description: 'Sivuasetukset-osiossa valitse sivukoko: Letter Pysty, Letter Vaaka, A4 Pysty, A4 Vaaka, Neliö (1200×1200) tai mukautettu koko. Valitse taustaväri, valitse koristeellinen taustateema kuvakirjastosta säädettävällä läpinäkyvyydellä ja lisää kehys riippumattomalla läpinäkyvyyssäätimellä.' },
      { title: 'Konfiguroi ruudukon ulottuvuudet', description: 'Aseta ruudukon rivit (3–10) ja sarakkeet (3–10) itsenäisesti hallitaksesi solumäärää ja kuvasuhdetta. 3×3-ruudukko 9 isolla solulla on yksinkertainen aloittelijoille ja nuorille käyttäjille. 10×10-ruudukko 100 pienellä solulla haastaa edistyneet käyttäjät vaatien tarkkaa toistoa. Ei-neliömäiset ruudukot kuten 4×6 tai 8×5 sopivat eri kuvasuhteiden kuviin.' },
      { title: 'Aseta vihjemäärä', description: 'Säädä vihjemäärän liukusäädintä 10%:sta 75%:iin hallitaksesi, kuinka paljon viitekuvasta paljastetaan vihjeruudukossa. 75%:lla suurin osa soluista näyttää kuvan, ja käyttäjät täyttävät jäljellä olevan neljäsosan. 50%:lla puolet soluista on näkyvissä kohtuullista haastetta varten. 25%:lla käyttäjät työskentelevät levitettyjen fragmenttien pohjalta. 10%:lla lähes mitään viitettä ei näy — käyttäjät rekonstruoivat kuvan lähes tyhjästä.' },
      { title: 'Valitse symmetriatila', description: 'Valitse symmetriatila hallitaksesi vihjesolujen sijoittelua. Satunnainen levittää vihjesolut mielivaltaisiin kohtiin yleistä piirustusharjoitusta varten. Vaakasuora peilaa vihjesolut vasen-oikea opettaen bilateraalista symmetriaa. Pystysuora peilaa vihjesolut ylhäältä-alas pystysuoraa symmetriaharjoitusta varten. Kun Vaakasuora tai Pystysuora on valittuna, osa-paljastamisen valitsin antaa sinun valita, kumpi puoli näytetään vihjeinä.' },
      { title: 'Valitse mustavalkoinen teemakuva tai lataa oma', description: 'Selaa 100+ mustavalkoiseten ääriviivakokoelmien yli 3 000 kuvitusta kategorioittain — eläimet, ajoneuvot, ruoka, luonto, ammatit, juhlapyhät ja kymmeniä muita. Jokainen teema tarjoaa puhtaita ääriviivapiirroksia, jotka on erityisesti suunniteltu solu-solulta toistoon ja sen jälkeiseen väritykseen. Tai lataa oma mukautettu kuva. Valitut kuvat käsitellään automaattisesti kaksoisruudukkomuotoon konfiguroituvilla vihjemäärä- ja symmetria-asetuksilla.' },
      { title: 'Lisää tekstiä ja mukauta kangasta', description: 'Käytä Tekstityökalut-paneelia lisätäksesi tehtäväarkin otsikon, ohjeita tai koristeellista tekstiä. Valitse fonteista kuten Lexend Deca, Baloo 2, Nunito, Quicksand ja Fredoka. Vaihda nimi/päivämäärä-kentät tunnistusalueita varten. Automaattisesti luotu otsikko lokalisoituu kaikille 11 tuetulle kielelle. Raahaa, muuta kokoa, kierrä ja siirrä jokaista elementtiä Fabric.js-kankaalla.' },
      { title: 'Vaihda harmaasävy ja lataa', description: 'Ota harmaasävy käyttöön musteystävällisiä versioita varten, jotka sopivat massatulostukseen ja KDP-sisäsivuihin. Lataa tehtäväarkkisi korkearesoluutioisena JPEG-kuvana tai tulostusvalmiina PDF-tiedostona 300 DPI:llä. Jokainen vienti sisältää sekä harjoitteluruudukon (tyhjät solut piirtämistä varten) että vihjeruudukon (osittainen viitekuva). Erillistä vastausavainta ei tarvita — vihjeruudukko itse toimii ratkaisuviitteenä. Jokainen vienti on tuotantovalmis.' },
    ],
  },

  whatYouCanCreate: [
    { title: 'Progressiivisen vaikeuden ruudukkopiirrospaketit', description: 'Luo temaattisia piirustuspaketteja 15–25 tehtäväarkilla, jotka etenevät helposta asiantuntijatasolle vihjemäärällä vaikeusakseli. Aloita jokainen paketti 75% vihjeillä 4×4-ruudukoilla helposti lähestyttäviä lämmittelyjä varten, etene 50% vihjeisiin 6×6-ruudukoilla kohtuullisia haasteita varten ja lopeta 10–15% vihjeiden 8×8 tai 10×10-ruudukoilla asiantuntijatason toistoa varten. Mustavalkoinen ääriviivatyyli kutsuu värittämään piirtämisen jälkeen lisäten ylimääräisen aktiviteettikerroksen.' },
    { title: 'KDP piirustustaitojen työkirjoja', description: 'Kokoa 60–100 ruudukkopiirrosharjoitusta painetuiksi työkirjoiksi Amazon KDP:lle. Jäsennä piirustuseteneminen lukujen kautta: Luku 1 käyttää 3×3-ruudukoita 75% vihjeillä yksinkertaiseen toistoon. Luku 2 etenee 5×5-ruudukoihin 50% vihjeillä. Luku 3 esittelee 7×7-ruudukoita 25% vihjeillä. Luku 4 haastaa 10×10-ruudukoilla 10% vihjeillä. Mustavalkoiset ääriviivakuvat toistuvat täydellisesti mustavalkotulostuksessa.' },
    { title: 'Symmetria ja tilallinen arviointi -tehtäväarkit', description: 'Käytä Vaakasuoraa ja Pystysuoraa peilitilaa luodaksesi tehtäväarkkeja, jotka yhdistävät taiteen ja matematiikan. Käyttäjät näkevät vihjesolut ruudukon toisella puolella ja heidän on rekonstruoitava peilikuva vastakkaiselle puolelle. Vaakasuora symmetriapaketti opettaa bilateraalista symmetriaa — perustavanlaatuinen geometrialle ja biologialle. Pystysuora symmetriapaketti kohdistuu ylhäältä-alas peilin tunnistamiseen. Nämä resurssit myyvät poikkeuksellisen hyvin sekä taide- että matematiikkakategorioissa Gumroadissa.' },
    { title: 'Temaattiset mustavalkoiset väritä-piirtämisen-jälkeen -sarjat', description: 'Hyödynnä mustavalkoista ääriviivakirjastoa luodaksesi piirustusharjoituksia, jotka toimivat myös väritysaktiviteetteina. Käyttäjät toistavat ensin ääriviivan kopioimalla soluja vihjeruudukosta, sitten värittävät valmiin piirustuksensa. Maatilaeläimet, dinosaurukset, merieläimet, ajoneuvot ja juhlapyhäteemat muodostavat kukin erillisiä tuotelistauksia. Piirrä-sitten-väritä -muoto tarjoaa kaksi aktiviteettia per sivu.' },
    { title: 'Mukautetun kuvan aihekohtaisia ruudukkoharjoituksia', description: 'Lataa mukautettuja kuvia luodaksesi ruudukkopiirrostehtäviä erikoistuneille kohderyhmille sisäänrakennetun kirjaston ulkopuolelta. Käytä kasvikaavioita luonnontieteisiin, arkkitehtonisia piirroksia suunnitteluopetukseen, geometrisiä muotoja matematiikan integraatioon tai historiallisten esineiden kuvia yhteiskuntaoppiin. Säädettävä vihjemäärä antaa sinun sovittaa vaikeuden mihin tahansa ikäryhmään.' },
    { title: 'Ristiformaattisia visuaalisen oppimisen paketteja', description: 'Yhdistä ruudukkopiirrostehtäväarkit värityssivuihin, viivojen piirtämisen harjoituksiin, kuviotehtäviin ja yhdistämistoimintoihin koordinoiduilla mustavalkoisilla teemoilla. Ruudukkopiirros kehittää solu-solulta tilallista toistoa. Värityssivut rakentavat värintunnistusta ja hienomotoriikkaa. Viivojen piirtämisen tehtäväarkit harjoittavat kynänhallintaa. Moniformaattiset paketit myyvät enemmän.' },
  ],

  businessIdeas: [
    { title: 'Vihjemäärän mukaan porrastettu piirustuskauppa Etsyssä', description: 'Avaa Etsy-kauppa erikoistuneena ruudukkopiirrostehtäväarkkeihin, jotka on järjestetty vaikeustason mukaan vihjemäärällä ensisijaisena erottautumispisteenä. Helpot paketit 75% vihjeillä 4×4-ruudukoilla. Keskitason paketit 40–50% vihjeillä 6×6-ruudukoilla. Vaikeat paketit 15–25% vihjeillä 8×8-ruudukoilla. Asiantuntijapaketit 10% vihjeillä 10×10-ruudukoilla. Kaksoisruudukkomuoto luo premium-tuotteen, joka erottuu perusvärityssivuista.', platform: 'Etsy' },
    { title: 'Amazon KDP ruudukkopiirros-työkirjasarja', description: 'Kokoa 80+ ruudukkopiirrosharjoitusta temaattisiksi työkirjoiksi Amazon KDP:lle. Jäsennä sarja etenemisen mukaan: "Aloittelijoiden Ruudukkopiirros" kattaa 3×3–5×5 ruudukot 50–75% vihjeillä. "Keskitason Ruudukkopiirros" etenee 6×6 ja 7×7 ruudukoihin 25–50% vihjeillä. "Edistynyt Ruudukkopiirros" esittelee 8×8–10×10 ruudukoita 10–25% vihjeillä. Mustavalkoiset ääriviivakuvat tulostuvat täydellisesti tavanomaisessa mustavalkotulostuksessa.', platform: 'Amazon KDP' },
    { title: 'Gumroad symmetria-asemat', description: 'Lataa ruudukkopiirros-tehtäväarkkipaketteja Gumroadiin symmetriatilan mukaan järjestettyinä opetusfokuksena. Taso 1 käyttää Satunnaista vihjesolujen sijoittelua yleiseen piirustusharjoitukseen. Taso 2 esittelee Vaakasuoran peilitilan. Taso 3 käyttää Pystysuoraa peilitilaa. Taso 4 yhdistää matalan vihjemäärän peilitilaan. Nämä resurssit yhdistävät taide- ja matematiikkastandardit.', platform: 'Gumroad' },
    { title: 'Pinterest ruudukkopiirros visuaalinen keila', description: 'Ruudukkopiirrostehtäväarkit erottuvalla kaksoisruudukkoulkoasulla tekevät silmiinpistäviä Pinterest-pinnauksia. Pinnaa näytetehtäväarkkeja vesileimalla, jotka osoittavat eri vihjemääriä ja symmetriatiloja. Tekstitön muoto tarkoittaa, että pinnaukset vetoavat vanhempiin ja myyjiin jokaisessa maassa.', platform: 'Pinterest' },
    { title: 'Gumroad täydellinen piirustustaitojen työkalupaketti', description: 'Pakkaa ruudukkopiirrostehtäväarkit värityssivujen, viivojen piirtämisen harjoitusten ja kirjoitusharjoitusten kanssa kattavaksi piirustus- ja hienomotoriseksi taitopaketti Gumroadiin. Jokainen muoto kohdistuu eri taitoon: ruudukkopiirros kehittää tilallista toistoa, värityssivut rakentavat luovaa ilmaisua, viivojen piirtäminen harjoittaa kynänhallintaa, kirjoitusharjoitus yhdistää visuaalis-motorisen ja lukutaidon.', platform: 'Gumroad' },
    { title: 'Tekstitön globaali tuotelinja', description: 'Piirrä ja Väritä -tehtäväarkit sisältävät vain ruudukkokuvia ilman tekstiä tulosteessa. Sama tuote toimii kaikilla kielillä ilman muutosta. Mustavalkoinen ääriviivatyyli on kulttuurisesti neutraali ja yleismaailmallisesti ymmärrettävä. Tee yhden sarjan ruudukkopiirrosharjoituksia ja myy maailmanlaajuisesti.', platform: 'Etsy / Amazon KDP' },
  ],

  proTips: [
    { title: 'Käytä kahta riippumatonta vaikeusakselia maksimaaliseen tuotevaihteluun', description: 'Ruudukon koko ja vihjemäärä luovat kaksi riippumatonta vaikeusulottuvuutta. 5×5-ruudukko 50% vihjeillä on kohtalainen. 5×5-ruudukko 10% vihjeillä on vaikea. 10×10-ruudukko 50% vihjeillä on myös vaikea, mutta eri tavalla. 10×10-ruudukko 10% vihjeillä on asiantuntijataso. Tämä tarkoittaa kymmeniä erillisiä vaikeusyhdistelmiä yhdestä ainoasta teemakuvasta.' },
    { title: 'Hyödynnä symmetriatiloja opetusutyökaluna', description: 'Vaakasuora ja Pystysuora peilitila muuttavat ruudukkopiirroksen taideaktiviteetista tilallisen arvioinnin harjoitukseksi, joka yhdistää taide- ja matematiikkatuotekategoriat. Käyttäjät näkevät vihjesolut toisella puolella ja heidän on rekonstruoitava peilikuva vastakkaisella puolella. Tämä opettaa bilateraalista ja pystysuoraa symmetriaa piirtämisharjoituksen aikana — kaksi oppimistavoitetta yhdestä tehtäväarkista.' },
    { title: 'Korosta mustavalkoisia ääriviivoja kaksoisaktiviteettimuotona', description: 'Mustavalkoinen ääriviivakirjasto on suunniteltu piirtämistä ensin, väritystä sitten varten. Käyttäjien toistettua ääriviivan kopioimalla soluja vihjeruudukosta he värittävät valmiin piirustuksensa. Tämä tarjoaa kaksi aktiviteettia per sivu — tilallisen toiston ja luovan värityksen.' },
    { title: 'Korosta kaksoisruudukkoa premium-muotona', description: 'Harjoitteluruudukon ja vihjeruudukon asettelu on ydineroavaisuus yksinkertaisista värityssivuista. Kuvaile kaksoisruudukkojärjestelmä selkeästi jokaisessa tuotelistauksessa: "Kaksi liitännäistä ruudukkoa per kuva — tyhjä harjoitteluruudukko piirtämistä varten ja vihjeruudukko, jossa osittaiset viitevihjeet."' },
    { title: 'Luo progressiivisia työkirjoja vihjemääräluvuilla', description: 'Jäsennä työkirjoja, joissa jokainen luku vähentää vihjemäärää: Luku 1 75%, Luku 2 50%, Luku 3 25%, Luku 4 10%. Jokaisen luvun sisällä kasvata myös ruudukon kokoa 4×4:stä 8×8:aan. Tämä kaksoiseteneminen tarjoaa tyydyttävän vaikeuskäyrän.' },
    { title: 'Käytä harmaasävyä KDP:lle ja massatulostukseen', description: 'Ota harmaasävykytkin käyttöön tehtäväarkeille, jotka on tarkoitettu Amazon KDP -sisäsivuihin tai tuotelinjan massatulostukseen. Mustavalkoiset ääriviivteemat sopivat luonnollisesti harmaasävyvientiin — puhtaat viivat toistuvat täydellisesti mustavalkotulostuksessa.' },
    { title: 'Yhdistä ruudukkopiirros muihin visuaalisiin työkaluihin premiumpaketteihin', description: 'Yhdistä ruudukkopiirrostehtäväarkit värityssivuihin, viivojen piirtämiseen, yhdistämiseen ja varjoyhdistämistoimintoihin koordinoiduilla teemoilla. Jokainen työkalu harjoittaa eri visuaalis-motorista taitoa. Moniformaattiset visuaaliset paketit myyvät enemmän.' },
  ],

  faq: [
    { question: 'Onko ilmainen kokeilu saatavilla?', answer: 'Kyllä. Työkalu tarjoaa ilmaisen kokeiluversion kaikilla ominaisuuksilla — kaikki ruudukkokoot, kaikki vihjemäärät, kaikki symmetriatilat, mustavalkoinen teemakuvakirjasto, mukautettu kuvalataus ja kaikki vientimuodot. Ei rekisteröitymistä, ei luottokorttia. Ilmaisen kokeiluversion lataukset sisältävät vesileiman. Osta kaupallinen lisenssi poistaaksesi vesileiman ja avataksesi myyntioikeudet.' },
    { question: 'Miten kaksoisruudukkojärjestelmä toimii?', answer: 'Jokainen valitsemasi kuva luo kaksi liitännäistä ruudukkoa. Harjoitteluruudukossa on tyhjiä soluja kevyillä ääriviivoilla, joihin käyttäjät piirtävät toistonsa. Vihjeruudukko näyttää konfiguoitavan prosenttiosuuden viitekuvasta — tietyt solut täytetty kuvan osilla, muut jätetty tyhjiksi. Käyttäjät katsovat vihjeruudukkoa, tunnistavat mitkä solut näyttävät viitesisältöä ja toistavat koko kuvan solu solulta harjoitteluruudukossa.' },
    { question: 'Mitä vihjemäärän liukusäädin hallitsee?', answer: 'Vihjemäärä (10%–75%) määrittää, kuinka suuri osuus vihjeruudukon soluista paljastaa viitekuvan. 75%:lla kolme neljäsosaa soluista näyttää kuvan, ja käyttäjät täyttävät vain jäljellä olevan neljäsosan. 50%:lla puolet soluista on näkyvissä kohtuullista haastetta varten. 25%:lla käyttäjät rekonstruoivat levitetyistä fragmenteista. 10%:lla lähes mitään viitettä ei näy maksimaalista haastetta varten.' },
    { question: 'Miten symmetria- ja peilitilat toimivat?', answer: 'Kolme tilaa hallitsee vihjesolujen sijoittelua. Satunnainen levittää vihjesolut mielivaltaisiin kohtiin yleistä piirustusharjoitusta varten. Vaakasuora peilaa vihjesolut vasen-oikea — käyttäjät näkevät toisen puolen ja heidän on piirrettävä peilikuva toiselle. Pystysuora peilaa vihjesolut ylhäältä-alas. Kun Vaakasuora tai Pystysuora on valittuna, osa-paljastamisen valitsin antaa sinun valita, kumpi puoli näytetään vihjeinä.' },
    { question: 'Miksi tässä sovelluksessa käytetään mustavalkoisia ääriviivateemoja värikkäiden sijaan?', answer: 'Piirrä ja Väritä käyttää mustavalkoisia ääriviivakuvituksia, jotka on erityisesti suunniteltu piirustus- ja väritysaktiviteetteihin. Puhtaat ääriviivat ovat ihanteellisia solu-solulta toistoon — käyttäjät näkevät selkeästi viivat, jotka heidän on kopioitava. Piirustuksen valmistuttua käyttäjät voivat värittää toistoksensa lisäaktiviteettina. Mustavalkomuoto tulostuu täydellisesti mustavalkona.' },
    { question: 'Miksi erillistä vastausavainta ei ole?', answer: 'Vihjeruudukko itse toimii viiteratkaisuna. Käyttäjät vertaavat valmista harjoitteluruudukkoaan alkuperäiseen lähde kuvaan milloin tahansa. Erillistä vastausavaintiedostoa ei tarvita — kaksoisruudukkomuoto sisältää luonnollisesti ratkaisuviitteen.' },
    { question: 'Mitä ruudukkokokoja voin konfiguroida?', answer: 'Rivit ja sarakkeet ovat itsenäisesti säädettävissä 3–10. 3×3-ruudukossa on 9 isoa solua — yksinkertainen nuorille käyttäjille. 10×10-ruudukossa on 100 pientä solua — vaativa edistyneille käyttäjille. Ei-neliömäiset ruudukot kuten 4×6 tai 8×5 sopivat eri kuvasuhteiden kuviin.' },
    { question: 'Ovatko tehtäväarkit kielitietoisia?', answer: 'Eivät. Piirrä ja Väritä on täysin visuaalinen sovellus — tehtäväarkit sisältävät vain ruudukkokuvia ilman tekstiä tulosteessa. Kielen vaihtaminen vaikuttaa vain käyttöliittymän nimikkeisiin generaattorissa, ei painettuun tehtäväarkkiin. Tämä tekee tuotteistasi yleismaailmallisesti myytäviä ilman käännöstä.' },
    { question: 'Mitä tiedostomuotoja ja sivukokoja on saatavilla?', answer: 'Lataa korkearesoluutioisena JPEG-kuvana tai tulostusvalmiina PDF-tiedostona 300 DPI:llä. Sivukoot sisältävät Letter Pysty, Letter Vaaka, A4 Pysty, A4 Vaaka, Neliö (1200×1200) ja mukautetut mitat. Vaihda harmaasävy musteystävällistä tulostetta varten.' },
    { question: 'Voinko myydä tällä työkalulla tehtyjä tehtäviä kaupallisesti?', answer: 'Kyllä. Kaupallisella lisenssillä sinulla on täydet oikeudet myydä ruudukkopiirrostehtäväarkkeja digitaalisina latauksina Etsyssä, painettuina työkirjoina Amazon KDP:ssä, myyjäresursseina Gumroadissa tai minkä tahansa muun myyntikanavan kautta.' },
    { question: 'Mikä on palautuspolitiikkanne?', answer: 'Kokeile ennen ostamista ilmaisella kokeilullamme — kaikki ominaisuudet ovat käytettävissä. Koska ilmainen kokeilu antaa sinulle täyden pääsyn, emme tarjoa hyvityksiä lisenssiostoista. Varmista, että työkalu sopii tarpeisiisi ilmaisella kokeilulla ennen ostamista.' },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'piirra-ja-varita-tehtavat', anchorText: 'Piirrä ja Väritä Tehtävät — Täydet Tuotetiedot' },
    { pageType: 'tool', slug: 'kuviojuna-luoja', anchorText: 'Kuviojunageneraattori' },
    { pageType: 'tool', slug: 'kuvio-tehtava-luoja', anchorText: 'Kuviotehtävägeneraattori' },
    { pageType: 'tool', slug: 'suuri-pieni-tehtava-luoja', anchorText: 'Suuri ja Pieni Tehtävägeneraattori' },
    { pageType: 'tool', slug: 'viivaharjoitus-luoja', anchorText: 'Viivojen Piirtämisen Generaattori' },
    { pageType: 'tool', slug: 'varityssivut-luoja', anchorText: 'Värityssivugeneraattori' },
    { pageType: 'tool', slug: 'yhdistamis-tehtava-luoja', anchorText: 'Yhdistämistehtävägeneraattori' },
    { pageType: 'tool', slug: 'varjoyhdistamis-luoja', anchorText: 'Varjoyhdistämisgeneraattori' },
    {
      pageType: 'app',
      slug: 'piirra-varita-tyoarkit',
      anchorText: 'Ready to sell what you make? Get the commercial license.',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/finnish/draw%20and%20color/piirrä-ja-väritä-1.webp',
      primaryAlt: 'Piirrä ja väritä -ruudukkopiirrostehtäväarkki kaksoisruudukkojärjestelmällä, jossa tyhjä harjoitteluruudukko ja osittain paljastettu vihjeruudukko mustavalkoisella ääriviivateemalla',
    },
    sampleGallery: [
      { src: '/samples/finnish/draw%20and%20color/piirrä-ja-väritä-1.webp', alt: 'Ruudukkopiirrostehtäväarkki eläinten mustavalkoinen ääriviivateemalla, jossa harjoitteluruudukko ja vihjeruudukko vierekkäin', caption: 'Eläinteema — käyttäjät toistavat ääriviivan ruudukkövihjeistä ja värittävät sitten piirustuksensa' },
      { src: '/samples/finnish/draw%20and%20color/piirrä-ja-väritä-2.webp', alt: 'Ruudukkopiirrostehtäväarkki vaakasuoralla symmetrian peilitilalla vihjesolut paljasteettuna vasemmalla puoliskolla tilallista arviointia varten', caption: 'Vaakasuora symmetriatila — vihjesolut peilaavat vasen-oikea tilallista arviointia ja bilateraalista symmetriaharjoitusta varten' },
      { src: '/samples/finnish/draw%20and%20color/piirrä-ja-väritä-3.webp', alt: 'Ruudukkopiirrostehtäväarkki matalalla vihjemäärällä, jossa minimaalisia viitesoluja suuressa ruudukossa asiantuntijatason toistohaasteeksi', caption: 'Matala vihjemäärä -asiantuntijahaaste — minimaaliset viitesolut vaativat tarkkaa havainnointia ja tilallista arviointia' },
    ],
    youtubeId: '1uZubAOGIkM',
    videoTitle: 'Näin Teet Ruudukkopiirrostehtäviä Säädettävällä Vihjemäärällä ja Symmetriatilalla — Vaiheittainen Opas',
  },
};

export default content;
