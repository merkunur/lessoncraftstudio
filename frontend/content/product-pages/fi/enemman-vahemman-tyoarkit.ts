import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * More or Less Worksheets - Finnish Content (Enemmän vai Vähemmän Tehtävät)
 *
 * File: frontend/content/product-pages/fi/enemman-vahemman-tyoarkit.ts
 * URL: /fi/apps/enemman-vahemman-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/more-less.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const moreLessFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'enemman-vahemman-tyoarkit',
    appId: 'more-less',
    title: 'Matematiikka Tehtävät Alakoulu - Tulostettavat Tehtävät Lapsille Ilmainen - Esiopetus Materiaali Ilmainen',
    description: 'Luo ammattimaisia vertailutehtäviä lukujen ja määrien vertailuun. Täysi Käyttöoikeus -tilauksella saat rajattomasti tehtäviä ilman yksittäisiä maksuja per tehtävä. Generoi tulostettavia matematiikkatehtäviä, jotka sopivat täydellisesti esiopetukseen ja alakoulun ensimmäisille luokille. Lataa laadukkaat PDF-tehtävät alle 3 minuutissa.',
    keywords: 'matematiikka tehtävät alakoulu, tulostettavat tehtävät lapsille ilmainen, esiopetus materiaali ilmainen, vertailutehtävät, enemmän vähemmän, suurempi pienempi, lukujen vertailu',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/enemman-vahemman-tyoarkit',
  },

  // Hero Section - FULL text from Finnish more-less.md
  hero: {
    title: 'Enemmän vai Vähemmän Tehtävät',
    subtitle: 'Matematiikka Tehtävät Alakoulu - Tulostettavat Tehtävät Lapsille Ilmainen',
    description: `Luo ammattimaisia vertailutehtäviä lukujen ja määrien vertailuun. Täysi Käyttöoikeus -tilauksella saat rajattomasti tehtäviä ilman yksittäisiä maksuja per tehtävä. Generoi tulostettavia matematiikkatehtäviä, jotka sopivat täydellisesti esiopetukseen ja alakoulun ensimmäisille luokille. Lataa laadukkaat PDF-tehtävät alle 3 minuutissa.

Lukujen vertailu on perustavanlaatuinen matemaattinen taito. Lapset oppivat ymmärtämään suurempi, pienempi ja yhtä suuri -käsitteet. Tehtävägeneraattorimme tekee vertailutehtävien luomisesta helppoa. Valitse kuvat tai teemat, aseta asetukset, ja tehtävä on valmis. Jokainen tehtävä sisältää visuaalisia elementtejä, jotka auttavat lapsia hahmottamaan määriä.

Täysi Käyttöoikeus -tilaus antaa sinulle pääsyn kaikkiin 33 tehtävägeneraattoriin yhteen hintaan. Luo niin monta matematiikkatehtävää kuin tarvitset. Ei piilotettuja kuluja tai rajoituksia. Kaikki kuvat, taustat ja reunukset sisältyvät tilaukseen. 300 DPI:n laatu takaa ammattimaiset tulosteet.`,
    previewImageSrc: '/samples/english/more less/image to image.jpeg',
    ctaLabels: {
      tryFree: 'Kokeile Ilmaiseksi',
      viewSamples: 'Katso Esimerkkejä',
    },
    trustBadges: {
      languages: '11 Kieltä',
      images: '3000+ Kuvaa',
      license: 'Kaupallinen Lisenssi',
    },
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    floatingStats: {
      time: '3 min',
      action: 'Luo & Lataa',
      quality: '300 DPI',
    },
  },

  // Sample Gallery - REAL file paths from samples/english/more less/
  samples: {
    sectionTitle: 'Enemmän vai Vähemmän Tehtävät Esimerkit',
    sectionDescription: 'Lataa ilmaiset esimerkkityöarkit nähdäksesi ammattimaisen laatumme',
    downloadLabel: 'Lataa Ilmainen Esimerkki',
    worksheetLabel: 'Tehtävämoniste',
    answerKeyLabel: 'Vastausavain',
    viewAllLabel: 'Katso suurempana',
    noPdfLabel: 'Vain esikatselu',
    freePdfCountLabel: 'ilmaista latausta',
    badgeText: 'Ilmaiset Esimerkit',
    downloadingLabel: 'Ladataan...',
    ofLabel: '/',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/more less/image to image.jpeg',
        answerKeySrc: '/samples/english/more less/image to image answer_key.jpeg',
        altText: 'Enemmän vai vähemmän vertailutehtävä kuva kuvaan -tilassa esiopetukseen',
        pdfDownloadUrl: '/samples/english/more less/image to image.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/more less/image to number.jpeg',
        answerKeySrc: '/samples/english/more less/image to number answer_key.jpeg',
        altText: 'Vertailutehtävä kuva numeroon -tilassa matematiikan harjoitteluun',
        pdfDownloadUrl: '/samples/english/more less/image to number.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/more less/illustration.jpeg',
        answerKeySrc: '/samples/english/more less/illustration answer_key.jpeg',
        altText: 'Kuvitussymboleilla varustettu vertailutehtävä nuoremmille oppilaille',
        pdfDownloadUrl: '/samples/english/more less/illustration.pdf',
      },
    ],
  },

  // Features Grid - FULL text from Finnish more-less.md feature sections
  features: {
    sectionTitle: 'Matematiikka Tehtävät Alakoulu -ominaisuudet - Tulostettavat Tehtävät Lapsille Ilmainen Vertailutehtäviin',
    sectionDescription: 'Vertailutehtävägeneraattorimme sisältää kaikki tarvittavat työkalut ammattimaisten matematiikkatehtävien luomiseen. Täysi Käyttöoikeus -tilaus antaa sinulle pääsyn laajaan ominaisuusvalikoimaan. Luo, muokkaa ja lataa tehtäviä vaivattomasti. Jokainen ominaisuus on suunniteltu säästämään aikaa ja parantamaan tehtävien laatua. Seuraavat ominaisuudet tekevät tehtävien luomisesta helppoa ja tehokasta.',
    highlightBadgeText: 'Tärkeä Ominaisuus',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    badgeText: 'Ominaisuudet',
    trustBadges: {
      allFeatures: 'Kaikki ominaisuudet sisältyvät',
      noHiddenFees: 'Ei piilomaksuja',
      cancelAnytime: 'Peruuta milloin tahansa',
    },
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Luo Matematiikka Tehtävät Alakoulu Kolmella Klikkauksella - Esiopetus Materiaali Ilmainen',
        description: `Vertailutehtävien luominen on uskomattomat yksinkertaista. Valitse 1-5 kuvaa kuvapankistamme. Aseta määrien lukumäärä per tehtävä. Klikkaa "Luo tehtävä" -painiketta. Tehtävä ilmestyy kankaalle muokattavaksi. Koko prosessi kestää alle minuutin.

Ei tarvitse olla suunnittelutaitoja. Järjestelmä luo automaattisesti tasapainoisen asettelun. Kuvat, numerot ja vertailusymbolit asettuvat oikeille paikoilleen. Voit keskittyä opetussisältöön teknisten yksityiskohtien sijaan. Aloittelijat luovat ammattimaisia tehtäviä ensimmäisellä yrityksellä.

Valitse yksittäiset kuvat tai kokonaisia teemoja. Teemavaihtoehto valitsee satunnaisesti kuvia valitsemastasi kategoriasta. Yksittäinen kuvavalinta antaa sinulle täydellisen kontrollin. Molemmat menetelmät tuottavat korkealaatuisia tulostettavia matematiikkatehtäviä. Generaattori tukee 1-8 vertailutehtävää per sivu.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Muokkaa Tulostettavat Tehtävät Lapsille Ilmainen - Täysi Hallinta Kankaalla',
        description: `Jokainen elementti tehtävässä on muokattavissa. Raahaa kuvia uusiin sijainteihin. Kierrä elementtejä mihin tahansa kulmaan. Skaalaa objekteja suuremmiksi tai pienemmiksi. Poista tarpeettomat elementit yhdellä klikkauksella.

Lisää omia tekstejä tehtäviin. Muuta fontteja, kokoja ja värejä. Lisää reunaviivat teksteihin korostusta varten. Seitsemän erilaista fonttia sisältyy generaattoriin. Lexend Deca, Baloo 2, Nunito, Quicksand ja Fredoka ovat kaikki mukana. Arial ja Verdana tarjoavat perinteisemmät vaihtoehdot.

Kerrosjärjestyksen hallinta antaa täyden kontrollin. Siirrä elementtejä eteen tai taakse. Tasaa objekteja sivun reunoille tai keskelle. Valitse useita objekteja kerralla muokkausta varten. Lukitse elementit estääksesi vahingossa tapahtuvat muutokset. Peruuta ja tee uudelleen -toiminnot mahdollistavat virheiden korjaamisen.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Lataa Omat Kuvat - Yhteenlasku ja Vähennyslasku Tehtävät Personoitaviksi',
        description: `Tiedostojen monivalinta mahdollistaa useiden kuvien lataamisen kerralla. Tuetut tiedostomuodot sisältävät JPEG, PNG ja GIF. Yhdistä omat kuvat kirjaston 3000+ kuvan kanssa. Luo täysin personoituja tehtäviä oppilaittesi erityistarpeisiin.

Lataa luokkahuoneesi esineiden kuvia. Käytä oppilaiden lemmikkieläinten kuvia. Sisällytä paikallisia maamerkkejä tai kulttuurisia elementtejä. Ominaisuus tekee matematiikasta merkityksellisempää lapsille. He tunnistavat tutut kuvat ja pysyvät paremmin keskittyneenä.

Ladatut kuvat näkyvät välittömästi kuvavalikoimassa. Käytä niitä samalla tavalla kuin kirjaston kuvia. Raahaa, skaalaa ja kierrä omia kuvia. Yhdistä ne teemoihin ja taustoihin. Mahdollisuudet ovat rajattomat Täysi Käyttöoikeus -tilauksella.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Kielen Tuki - Kertotaulut Tulostettava ja Monikielinen Matematiikka',
        description: `Käyttöliittymä toimii 11 eri kielellä. Suomi, ruotsi, englanti, saksa, ranska, espanja, italia, portugali, hollanti, tanska ja norja ovat kaikki mukana. Kaikki painikkeet, nimiöt ja ohjeet kääntyvät automaattisesti. Vaihda kieli missä tahansa luomisprosessin vaiheessa.

Monikielinen tuki on kriittinen kieltenopettajille. Luo samoja tehtäviä eri kielillä. Tue kaksikielisiä oppilaita heidän äidinkielellään. Kansainväliset koulut hyötyvät valtavasti tästä ominaisuudesta. Kotiopettajat voivat opettaa useita kieliä samanaikaisesti.

Tehtävien otsikot mukautuvat valitun kielen mukaan. Suomeksi näkyy "Enemmän Vähemmän - Vertaile ja valitse oikea symboli!" Ruotsiksi otsikko muuttuu automaattisesti. Englanniksi näet "More Less - Compare and choose the right symbol!" Ammattimainen käyttökokemus jokaisella kielellä.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kaupallinen POD-lisenssi - Värityskuvia Lapsille Tulostettava Myyntiin',
        description: `Täysi Käyttöoikeus -tilaus sisältää täyden print-on-demand kaupallisen lisenssin. Myy luomiasi tehtäviä Teachers Pay Teachersissa. Avaa Etsy-kauppa tulostettaville matematiikkatehtäville. Julkaise Amazon KDP:ssä matalan sisällön kirjana. Ei lisälisensointimaksuja tilauksen päälle.

300 DPI:n laatu takaa ammattimaiset tulosteet. Asiakkaasi saavat terävät, selkeät kuvat. Tekstit pysyvät luettavina kaikissa ko'oissa. Värit tulostuvat kirkkaina ja elävinä. Harmaasävyvaihtoehto tarjoaa mustevälisiä vaihtoehtoja.

Ei attribuutiovaatimuksia. Ei vesileimoja maksullisessa versiossa. Luo tuotemerkkisi omilla suunnittelutyyleillä. Opettajayrittäjät ansaitsevat 500-5000 dollaria kuukaudessa. Pinterest-markkinointi ohjaa liikennettä kauppoihisi. Tilaus- ja jäsenliiketoimintamallit tuottavat passiivista tuloa.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Kuvapankki - Hienomotoriikka Harjoitukset Visuaaliseen Oppimiseen',
        description: `Yli 3000 lapsystävällistä kuvaa sisältyy kirjastoomme. Teemapohjainen organisointi tekee oikean kuvan löytämisestä helppoa. Eläimet, ruoka, lelut, kulkuneuvot, luonto ja paljon muuta. Jokainen teema sisältää kymmeniä laadukkaita kuvia.

Selaa kuvia teemoittain tai yksittäin. Teemavalinnat sisältävät kausi-aiheet, juhlapäivät ja koulutusaiheet. Yksittäinen kuvaselaus antaa täydellisen kontrollin. Hakutoiminto nopeuttaa tiettyjen kuvien löytämistä. Esikatselutoiminto näyttää kuvat ennen valintaa.

Taustoja ja reunuksia sisältyy ilman lisäkuluja. Kilpailijat veloittavat kuvaa kohden tai mallia kohden. LessonCraft Studiossa kaikki visuaaliset materiaalit sisältyvät tilaukseen. Säästät 200-400 dollaria vuodessa verrattuna muihin alustoihin. Ei piilotettuja maksuja kuvista tai malleista.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Ammattimainen 300 DPI Laatu - Pisteestä Pisteeseen Tehtävät Tulostuskelpoisina',
        description: `Korkearesoluutioinen vienti takaa täydelliset tulosteet. 300 DPI on alan standardi ammattimaiselle laadulle. Tulosta kotitulostimella tai ammattitulostuskeskuksessa. Tulokset ovat aina terävät ja selkeät.

JPEG- ja PDF-muodot ovat molemmat saatavilla. JPEG sopii nopeaan jakamiseen ja esikatseluun. PDF on ihanteellinen tulostamiseen ja jakamiseen vanhemmille. Molemmat muodot säilyttävät täyden laatunsa. Ei laatuhävikkiä vientiä tehtäessä.

Harmaasävyvaihtoehto muuntaa värit ennen latausta. Säästä väritulostusväriä luokkahuonekäyttöön. Mustavalkoiset tehtävät tulostuvat yhtä ammattimaisesti. Opettajat arvostavat mustesäästöjä. Yksi tilaus, rajattomat tulosteet, nolla lisämaksuja per tehtävä.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from Finnish more-less.md step sections
  howTo: {
    sectionTitle: 'Kuinka Luoda Matematiikka Tehtävät Alakoulu 5 Helppoa Askelta - Tulostettavat Tehtävät Lapsille Ilmainen',
    sectionDescription: 'Vertailutehtävien luominen vie alle 3 minuuttia alusta loppuun. Seuraa näitä viittä yksinkertaista askelta. Ei tarvitse teknistä osaamista tai suunnittelukokemusta. Jokainen askel on suoraviivainen ja intuitiivinen. Opettajat luovat ensimmäisen tehtävänsä minuuteissa. Kotiopettajat rakastavat nopeaa työnkulkua.',
    ctaText: 'Aloita Luominen Nyt',
    badgeText: 'Näin Se Toimii',
    stepLabel: 'Vaihe',
    completionTitle: 'Valmis!',
    completionSubtitle: 'Tehtävämoniste on valmis',
    readyTime: 'Valmis alle 3 minuutissa',
    noSkillsNeeded: 'Ei suunnitteluosaamista tarvita',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Valitse Sisältö Matematiikka Tehtävät Alakoulu - Kuvat, Teemat tai Esiopetus Materiaali Ilmainen',
        description: `Aloita valitsemalla kuvat vertailutehtäviisi. Kahdesta menetelmästä voit valita. Yksittäinen kuvavalinta antaa täydellisen kontrollin. Teemavalinta nopeuttaa prosessia satunnaisella valinnalla.

Yksittäisessä kuvatilassa selaa 3000+ kuvan kirjastoamme. Klikkaa kuvateemoja rajaaksesi vaihtoehtoja. Eläimet, ruoka, lelut, kulkuneuvot ja kausiaiheet ovat kaikki saatavilla. Valitse 1-5 kuvaa tehtäviisi. Valintalaskuri näyttää "0 / 5 valittu" edistymisesi. Esikatselutoiminto näyttää jokaisen kuvan ennen valintaa.

Teematilassa valitse yksi kokonainen teema. Järjestelmä valitsee satunnaisesti kuvia tästä teemasta. Täydellinen opettajille, jotka haluavat nopean luomisen. Jokainen tehtävä käyttää eri kuvia samasta teemasta. Monipuolisuus pitää tehtävät mielenkiintoisina oppilaille.

Lataa omia kuvia täydelliseen personointiin. Monivalinta tukee JPEG-, PNG- ja GIF-muotoja. Lataa kerralla useita tiedostoja. Yhdistä omat kuvat kirjaston kuviin. Luokkahuoneen esineet, oppilaiden työt tai paikalliset maamerkit toimivat hyvin. Ladatut kuvat näkyvät välittömästi valikoimassa käytettäviksi.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetukset - Tulostettavat Tehtävät Lapsille Ilmainen Mille Tahansa Luokkatasolle',
        description: `Määritä tehtäväsi erityisasetukset. Aseta tehtävien lukumäärä per sivu. Vaihtoehtoina on 1-8 tehtävää. Oletusarvo on 5 tehtävää, mikä toimii hyvin useimmille arkeille.

Valitse vertailusymbolit sisällytettäväksi. Suurempi kuin (>), pienempi kuin (<) ja yhtä suuri kuin (=) ovat kaikki käytettävissä. Valitse kaikki kolme täydelle harjoitukselle. Poista "yhtä suuri kuin" keskittyäksesi pelkkiin suurempi/pienempi -vertailuihin. Poista "suurempi kuin" harjoitellaksesi vain "pienempi kuin" -käsitettä.

Symbolin näyttötapa vaikuttaa visuaaliseen tyyliin. Kuvitus-tila käyttää söpöjä graafisia symboleja. Visuaaliset oppijat pitävät kuvitussymboleista. Normaali symbolitila näyttää perinteiset matemaattiset merkit (>, <, =). Molemmat vaihtoehdot tulostuvat selkeästi 300 DPI:n laadussa.

Vertailutilan valinta määrittää tehtävän tyypin. Kuva kuvaan -tila vertailee kuvaryhmiä. Esimerkiksi 5 kissaa vs 7 kissaa. Kuva numeroon -tila vertailee kuvia lukumääriin. Esimerkiksi 5 kissaa vs "7". Molemmat menetelmät opettavat määrien vertailua tehokkaasti.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi Tehtäväsi - Yhteenlasku ja Vähennyslasku Tehtävät Välitön Esikatselu',
        description: `Klikkaa "Luo tehtävä" -painiketta ylhäällä oikealla. Generaattori luo välittömästi tehtäväsi. Prosessi kestää alle 5 sekuntia. Tehtävä ilmestyy kankaalle täysin muokattavana.

Järjestelmä asettaa automaattisesti kaikki elementit. Kuvaryhmät asettuvat vasemmalle ja oikealle. Vertailusymbolit sijoittuvat keskelle. Tehtävänumerot ilmestyvät, jos valitsit ne. Nimi- ja päivämääräkentät näkyvät, jos aktivoit ne.

Satunnaiset määrät luodaan jokaiselle tehtävälle. Kunkin ryhmän objektien määrä vaihtelee 1-6 välillä. Sopii täydellisesti esiopetukselle ja alakoulun alaluokille. Järjestelmä varmistaa, että jokainen tehtävä on ainutlaatuinen. Ei kahta identtistä tehtävää samalla arkilla.

Esikatsele tehtäväsi välittömästi kankaalla. Zoomaa sisään yksityiskohtien tarkistamiseen. Zoomaa ulos kokonaisuuden näkemiseksi. Vieritä suurilla sivuilla. Kangas on täysin interaktiivinen ja reagoiva.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Kankaalla - Kertotaulut Tulostettava ja Värityskuvia Lapsille Tulostettava Personointi',
        description: `Nyt tulee luovuuden aika. Jokainen elementti kankaalla on muokattavissa. Klikkaa mitä tahansa objektia valitaksesi sen. Raahaa uusiin sijainteihin. Kierrä kulmapisteistä. Skaalaa kulmakahvoista.

Lisää omia tekstejä ohjeita tai otsikkoita varten. Kirjoita teksti tekstityökaluun. Klikkaa "Lisää teksti" luodaksesi se kankaalle. Muuta väri, koko ja fontti oikeanpuoleisesta paneelista. Seitsemän fonttivaihtoehtoa tarjoavat monipuolisuutta. Lisää reunaviivoja tekstiin korostusta varten.

Taustat ja reunukset muuttavat tehtävän ulkoasua kokonaan. Valitse kausiaiheisia taustoja juhlapäiviä varten. Halloween, joulu, pääsiäinen ja takaisin kouluun -teemat ovat kaikki saatavilla. Reunusteemoihin sisältyvät kehykset, koristeet ja koulutusreunat. Läpinäkyvyysliukusäätimet hienosäätävät vaikutusta.

Kerroksenhallintatyökalut järjestävät päällekkäiset objektit. Tuo eteen, siirrä eteenpäin, lähetä taaksepäin, lähetä taakse. Tasaustyökalut kohdista objekteja. Tasaa sivun vasempaan, oikeaan, ylä- tai alareunaan. Tasaa keskelle pysty- tai vaakasuunnassa. Valittujen tasaus kohdistaa useita objekteja toisiinsa nähden.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta - Hienomotoriikka Harjoitukset ja Pisteestä Pisteeseen Tehtävät Korkealaatuisina',
        description: `Viimeinen askel on lataaminen ja tulostaminen. Klikkaa lataa-pudotusvalikkoa ylhäällä oikealla. Neljä vaihtoehtoa näkyy. Tehtävä (JPEG), Vastausavain (JPEG), Tehtävä (PDF), Vastausavain (PDF).

JPEG-muoto sopii nopeaan jakamiseen. Lähetä sähköpostitse vanhemmille. Jaa oppimisalustoilla tai muilla alustoilla. Esikatsele tietokoneella ennen tulostamista. JPEG latautuu ja avautuu nopeasti.

PDF-muoto on paras tulostamiseen. Säilyttää tarkan ulkoasun kaikilla laitteilla. Tulostuu johdonmukaisesti kaikilla tulostimilla. Vanhemmat voivat avata PDF:t helposti kotona. Ammattimainen muoto jakamiseen ja arkistointiin.

Vastausavain luodaan erillisellä klikkauksella. Samanlainen ulkoasu kuin tehtävä, mutta oikeilla symboleilla täytetty. Jos valitsit kuvitussymbolit, vastausavaimessa näkyy symboligrafiikat. Jos valitsit normaalit symbolit, vastausavaimessa näkyy tekstisymbolit (>, <, =).

Harmaasävy-valintaruutu muuntaa ennen lataamista. Aktivoi se säästääksesi väritulostusväriä. Erityisen hyödyllinen luokkahuonekäyttöön. Mustavalkoiset tehtävät tulostuvat yhtä selkeästi. Opettajat arvostavat mustesäästöjä suurilla luokkamäärillä.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish more-less.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille ja Vanhemmille - Matematiikka Tehtävät Alakoulu Jokaiseen Tarpeeseen',
    sectionDescription: 'Vertailutehtävägeneraattori palvelee monenlaisia käyttäjiä. Esiopetuksen opettajat, alakoulun opettajat, kotiopettajat ja erityisopettajat hyötyvät kaikki. Jokainen käyttäjäryhmä löytää ainutlaatuista arvoa. Seuraavat käyttötapaukset osoittavat, kuinka erilaiset opettajat käyttävät työkalua. Tulostettavat tehtävät sopivat kaikkiin opetustilanteisiin.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Esiopetuksen Opettajat',
        subtitle: 'Esiopetus Materiaali Ilmainen ja Kirjaimet Harjoittelu Esikoulu',
        description: `Esiopetuksen opettajat rakentavat matemaattisia perustaitoja. Lukujen vertailu on ensimmäisiä käsitteitä, jotka lapset oppivat. Vertailutehtävät tekevät abstraktit käsitteet konkreettisiksi. Visuaaliset kuvat auttavat 6-vuotiaita lapsia hahmottamaan määriä.

Kuvitussymbolit ovat ihanteellisia esiopetukselle. Söpöt grafiikat kiinnittävät lasten huomion. Värikkäät eläimet, lelut ja ruoka tekevät matematiikasta hauskaa. Lapset oppivat leikkien laskemaan ja vertailemaan. Pelillistäminen parantaa sitoutumista ja muistamista.

Saman kuvan käyttö molemmilla puolilla yksinkertaistaa oppimista. 3 kissaa vs 5 kissaa keskittää huomion määrään. Ei hämmennystä eri objekteista. Lapset voivat keskittyä puhtaasti lukujen vertailuun. Kognitiivinen kuormitus pysyy alhaisena aloittelijoille.

Ympyriin merkintäsymbolit -toiminto on täydellinen esiopetukselle. Kirjoittamistaidot ovat vielä kehittymässä. Ympyröinti on helpompaa kuin symbolien kirjoittaminen. Lapset tunnistavat oikean symbolin visuaalisesti. Menestys rakentaa itseluottamusta matematiikkaan.`,
        quote: 'Lapset oppivat vertailun nopeasti visuaalisten tehtävien avulla!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun Opettajat',
        subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen 1.-3. Luokka',
        description: `Alakoulun opettajat tarvitsevat vertailutehtäviä 1.-3. luokkalaisille. Matematiikan opetussuunnitelmassa vertailu on keskeinen taito. Opettajat luovat viikottain uusia harjoituksia. Generaattori säästää tunteja valmistelua viikossa.

Normaalit symbolit (>, <, =) sopivat paremmin alakouluun. Lapset oppivat standardit matemaattiset merkinnät. Valmistautuminen koetilanteisiin ja testeille. Ammattimainen lähestymistapa tukee akateemista kehitystä.

Eri kuvien käyttö lisää haastavuutta vanhemmille oppilaille. 4 autoa vs 6 palloa vaatii enemmän kognitiivista prosessointia. Lapset harjoittelevat määrien abstraktia vertailua. Vaikeustason asteittainen lisääminen tukee oppimista.

Kuva numeroon -tila siirtää kohti abstraktimpaa matematiikkaa. 5 omenaa vs "8" yhdistää konkreettiset ja abstraktit esitykset. Täydellinen siirtymävaihe numerolinjaan ja perus laskutoimituksiin. 2. ja 3. luokkalaiset hyötyvät tästä menetelmästä.`,
        quote: 'Tehtävien luominen on nyt nopeaa ja vaivatonta.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat',
        subtitle: 'Yhteenlasku ja Vähennyslasku Tehtävät Monikieliseen Oppimiseen',
        description: `Kotiopettajat opettavat usea lasta eri tasoilla samanaikaisesti. Vertailutehtävägeneraattori tukee eriyttämistä täydellisesti. Luo helppoja tehtäviä 1. luokkalaiselle ja haastavampia 3. luokkalaiselle. Kaikki samalla työkalulla samassa istunnossa.

Teemavalinnat yhdistävät matematiikan yksikköopetukseen. Opiskeletko meren eläimiä? Käytä meren aiheisia kuvia vertailutehtävissä. Keskittymässä vuodenaikoihin? Valitse kausiaiheinen tausta ja kuvat. Integroitu oppiminen vahvistaa useiden aiheiden muistamista.

Lataa perheen valokuvat personointiin. Käytä lasten nimien kuvia motivaatioon. Sisällytä lemmikkieläimiä ja perheenjäseniä. Lapset rakastavat nähdä itsensä ja rakkaansa tehtävissä. Personointi lisää sitoutumista ja innostusta.

11 kielen tuki on kultaa kaksikielisille perheille. Opeta matematiikkaa suomeksi ja ruotsiksi. Luo samoja tehtäviä molemmilla kielillä. Lapset oppivat matemaattisia käsitteitä kahdella kielellä samanaikaisesti. Täydellinen kielelliseen uppoutumiseen ja kaksikieliseen kasvatukseen.`,
        quote: 'Personoidut tehtävät motivoivat lapsiani oppimaan.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Kieltenopettajat',
        subtitle: 'Kertotaulut Tulostettava ja Lukemaan Oppiminen Tehtävät',
        description: `Kieltenopettajat käyttävät visuaalisia vertailutehtäviä sanaston opetukseen. Objektien laskeminen yhdistää kielikyvyn ja matematiikan. Lapset oppivat eläinten nimiä laskiessaan kissoja ja koiria. Hedelmien nimiä vertaillessaan omenoita ja banaaneja.

Kuvakirjasto tarjoaa 3000+ objektia kielenoppimiseen. Jokaisella kuvalla on tiedostonimi, joka kuvastaa objektia. Opettajat käyttävät näitä nimiä sanaston harjoituksiin. Yhdistä visuaalinen tunnistaminen, kirjoitetut sanat ja puhuttu kieli.

Monikielinen käyttöliittymä tukee oppijoita heidän äidinkielellään. Aloita suomella rakentaaksesi itseluottamusta. Vaihda asteittain kohdekieleen. Tehtävien tuttuus pysyy samana kieltä vaihdettaessa. Vähentää ahdistusta ja kasvattaa oppimista.

Kaksoiskielisessä uppoutuksessa käytä kahta kieltä rinnakkain. Luo tehtävä suomeksi maanantaina. Luo sama tehtävä englanniksi tiistaina. Lapset näkevät samat käsitteet molemmilla kielillä. Vahvistaa ymmärrystä ja kieltenvälistä siirtoa.`,
        quote: 'Monikielinen tuki on korvaamaton kielenopetuksessa.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Värityskuvia Lapsille Tulostettava ja Hienomotoriikka Harjoitukset',
        description: `Erityisopettajat tarvitsevat räätälöityjä materiaaleja yksilöllisiin tarpeisiin. Vertailutehtävägeneraattori mahdollistaa täydellisen mukauttamisen. Säädä vaikeustasoa yksittäisten oppilaiden tasoille. Luo visuaalisesti yksinkertaisia tehtäviä herkille oppijoille.

Aloita yhdellä vertailutehtävällä per sivu. Vähentää visuaalista sekaannusta ja ahdistusta. Suuret, selkeät kuvat auttavat näköhäiriöisille. Yksinkertainen asettelu tukee keskittymistä. Lisää asteittain monimutkaisuutta kun oppilas edistyy.

Kuvitussymbolit auttavat oppilaita, joilla on oppimisen haasteita. Visuaaliset vihjeet vahvistavat abstrakteja symboleja. Värikäs grafiikka pitää huomion haastavissa tehtävissä. Moniaistinen lähestymistapa tukee erilaisia oppimistyylejä.

Lataa henkilökohtaisia kuvia motivaation lisäämiseksi. Käytä oppilaan lempilelujen kuvia. Sisällytä perheen lemmikkieläimiä tai kiinnostuksen kohteita. Personoidut tehtävät lisäävät sitoutumista merkittävästi. Menestys personoiduissa tehtävissä rakentaa itseluottamusta.`,
        quote: 'Voin räätälöidä tehtävät jokaisen oppilaan tarpeisiin.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Pisteestä Pisteeseen Tehtävät Teachers Pay Teachersiin Myyntiin',
        description: `Opettajayrittäjät myyvät tehtäviä Teachers Pay Teachersissa, Etsyssä ja Amazon KDP:ssä. Täysi Käyttöoikeus -tilaus sisältää täyden kaupallisen lisenssin. Luo rajattomasti tehtäviä myyntiin. Ei ylimääräisiä lisenssimaksuja tai rojalteja.

300 DPI:n laatu on välttämätön maksullisille tuotteille. Asiakkaat odottavat ammattimaisia, teräviä tulosteita. Kilpaile laatukustantajien kanssa. Erottaudu ainutlaatuisilla teema- ja tyylivalinnoilla. Korkea laatu johtaa parempiin arvosteluihin ja enemmän myyntiin.

Luo teemapaketteja kasvattaaksesi tuotteiden arvoa. Halloween-vertailupaketit lokakuussa. Joulu-teemat marraskuussa. Takaisin kouluun -tehtävät elokuussa. Kausiluonteiset tuotteet myyvät hyvin tiettyinä aikoina. Luo ja lataa vuoden ympäri.

Pinterest-markkinointi ohjaa liikennettä tuotelistauksiin. Luo visuaalisesti houkuttelevia tehtäviä esikatselukuville. Käytä teema taustoja ja reunuksia erottuaksesi. Persoonallinen brändi rakentuu johdonmukaisilla suunnitteluvalinnoilla. Seuraajat tunnistavat tyylisi.`,
        quote: 'Tilaukseni maksoi itsensä takaisin ensimmäisessä kuussa!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from Finnish more-less.md
  faq: {
    sectionTitle: 'Usein Kysyttyjä Kysymyksiä - Matematiikka Tehtävät Alakoulu ja Tulostettavat Tehtävät Lapsille Ilmainen',
    sectionDescription: 'Opettajilla ja vanhemmilla on kysymyksiä ennen tilausta. Seuraavat 12 kysymystä vastaavat yleisimpiin huolenaiheisiin. Jokainen vastaus tarjoaa selkeät, tosiasialliset tiedot. Lue nämä ymmärtääksesi täydellisesti, mitä Täysi Käyttöoikeus -tilaus sisältää.',
    showMoreText: 'Näytä lisää kysymyksiä',
    showLessText: 'Näytä vähemmän',
    badgeText: 'UKK',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    secureCheckout: 'Turvallinen maksu',
    cancelAnytime: 'Peruuta milloin tahansa',
    items: [
      {
        id: '1',
        question: 'Onko Tämä Vertailutehtävägeneraattori Todella Ilmainen Käyttää?',
        answer: 'Vertailutehtävägeneraattori vaatii Täysi Käyttöoikeus -tilauksen, joka maksaa 240 dollaria vuodessa tai 25 dollaria kuukaudessa. Tilauksesi antaa sinulle rajattoman vertailutehtävien luomisen ilman yksittäisiä maksuja per tehtävä. Generoi niin monta matematiikkatehtävää kuin tarvitset ilman lisäkuluja. Ei piilotettuja maksuja tai rajoituksia tehtävien määrässä. Peruspaketti sisältää 10 suosittua tehtävägeneraattoria ja maksaa 144 dollaria vuodessa. Täysi Käyttöoikeus maksaa 240 dollaria vuodessa ja sisältää kaikki 33 tehtävägeneraattorityyppiä mukaan lukien vertailutehtävägeneraattori. Molemmat tilaukset sisältävät kaupallisen lisensoinnin, 11 kielen tuen ja ammattimaisen 300 DPI:n laadun viennit.',
      },
      {
        id: '2',
        question: 'Voinko Tulostaa Värityskuvia Lapsille Tulostettava Kotona Tavallisella Tulostimella?',
        answer: 'Kyllä. Vertailutehtävät tulostuvat täydellisesti tavallisella kotitulostimella. 300 DPI:n laatu takaa terävät, selkeät kuvat missä tahansa tulostimessa. Ei tarvetta ammattitulostuskeskukseen tai erikoislaitteisiin. HP, Canon, Epson ja Brother tulostimet kaikki toimivat erinomaisesti. Lataa tehtävät PDF-muodossa parhaita tulosteita varten. PDF säilyttää tarkan ulkoasun kaikilla laitteilla ja tulostimilla. Avaa PDF:t Adobe Readerissa, selaimen PDF-katseluohjelmassa tai tulostimen ohjelmistossa. Tulosta välittömästi ilman muotoiluongelmia. Harmaasävy-vaihtoehto säästää väritulostusväriä. Aktivoi ennen lataamista muuntaaksesi värit mustavalkoisiksi. Erityisen hyödyllinen opettajille, jotka tulostavat kymmeniä kopioita. Mustavalkoinen säästää 70-80% tulostusvärin kustannuksista. Tehtävät pysyvät yhtä selkeinä ja ammattimaisina.',
      },
      {
        id: '3',
        question: 'Tarvitsenko Suunnittelutaitoja Luodakseni Hienomotoriikka Harjoitukset Vertailutehtäviä?',
        answer: 'Ei. Vertailutehtävägeneraattori on suunniteltu käyttäjille ilman suunnittelukokemusta. Kolme klikkausta luo ammattimaisen tehtävän. Valitse kuvat, klikkaa generoi, lataa PDF. Järjestelmä hoitaa kaiken asettelun ja muotoilun automaattisesti. Ei tarvitse osata Photoshopia, Canvaa tai muita suunnittelutyökaluja. Ei oppimiskäyrää tai koulutusta. Opettajat luovat ensimmäisen tehtävänsä minuuteissa. Intuitiivinen käyttöliittymä opastaa jokaisen vaiheen läpi. Esikatselutoiminnot näyttävät tarkalleen, miltä tehtävä näyttää ennen lataamista. Jos haluat mukautusta, täysi muokkaustoiminnallisuus on saatavilla. Raahaa, kierrä ja skaalaa elementtejä. Lisää omaa tekstiä ja grafiikkaa. Muuta värejä, fontteja ja tyylejä. Mutta nämä ovat valinnaisia. Perusgeneraattori toimii täydellisesti ilman muokkausta.',
      },
      {
        id: '4',
        question: 'Voinko Käyttää Pisteestä Pisteeseen Tehtävät Vertailutehtäviä Luokkahuoneessani Oppilaille?',
        answer: 'Kyllä. Täysi Käyttöoikeus -tilaus sisältää rajattoman luokkahuonekäytön. Luo tehtäviä kaikille oppilaillesi. Tulosta niin monta kopiota kuin tarvitset. Käytä tehtäviä oppitunneilla, läksyinä, arviointeina ja keskuksina. Ei rajoituksia oppilaiden määrään. Opeta yhtä lasta tai 300 oppilasta. Sama tilaus kattaa kaikki. Täydellinen alakouluopettajille, jotka opettavat useita luokkia. Peruskouluopettajat, jotka opettavat 100+ oppilasta päivässä, maksavat yhä vain yhden tilauksen. Jaa tehtäviä kollegoiden kanssa luokkahuoneessasi tai koulussa. Täysi Käyttöoikeus -ehdot sallivat jakamisen opetuskäyttöön. Luokka-aste tiimit voivat luoda ja jakaa tehtäviä. Yhteistyö säästää aikaa ja parantaa johdonmukaisuutta luokkahuoneiden välillä.',
      },
      {
        id: '5',
        question: 'Mitä Kieliä Kirjaimet Harjoittelu Esikoulu Vertailutehtävät Ovat Saatavilla?',
        answer: 'Käyttöliittymä toimii 11 kielellä. Suomi, ruotsi, englanti, saksa, ranska, espanja, italia, portugali (brasilialainen), hollanti, tanska ja norja. Kaikki painikkeet, ohjeet ja viestit kääntyvät täysin. Vaihda kieli milloin tahansa luomisprosessin aikana. Kieli vaikuttaa käyttöliittymän elementteihin, ei tehtävän sisältöön. Vertailutehtävät käyttävät visuaalisia kuvia ja numeroita. Nämä ovat universaaleja kaikilla kielillä. 3 kissaa vs 5 kissaa ymmärretään maailmanlaajuisesti. Symbolit >, < ja = ovat kansainvälisiä matemaattisia merkintöjä. Tehtävien otsikot mukautuvat kuitenkin valitun kielen mukaan. Suomeksi näet "Enemmän Vähemmän - Vertaile ja valitse oikea symboli!" Ruotsiksi otsikko muuttuu "Mer Mindre - Jämför och välj rätt symbol!" Ammattimainen kokemus jokaisella kielellä.',
      },
      {
        id: '6',
        question: 'Voinko Myydä Kertotaulut Tulostettava Vertailutehtäviä, Jotka Luon Tällä Generaattorilla?',
        answer: 'Kyllä. Täysi Käyttöoikeus -tilaus sisältää täyden print-on-demand kaupallisen lisenssin ilman lisäkuluja. Myy luomiasi tehtäviä Teachers Pay Teachersissa, Etsyssä, Amazon KDP:ssä tai millä tahansa alustalla. Pidä 100% voitoista. Ei rojaltimaksuja LessonCraft Studiolle. Ei attribuutiovaatimuksia tuotteissasi. Ei pakollisia vesileimoja tai mainintoja. Luo oma tuotemerkkisi omalla tyylilläsi. Opettajayrittäjät rakentavat menestyneitä liiketoimintoja käyttäen generaattoreitamme. Monet ansaitsevat 2000-5000 dollaria kuukaudessa. 300 DPI:n laatu vastaa alan standardeja kaupallisille tuotteille. Asiakkaasi saavat ammattimaisia, teräviä tulosteita. Kilpaile suurten kustantajien kanssa luottavaisesti. Korkea laatu johtaa parempiin arvosteluihin ja toistuviin asiakkaisiin.',
      },
      {
        id: '7',
        question: 'Kuinka Mukautan Yhteenlasku ja Vähennyslasku Tehtävät Vertailutehtäviä Oppilailleni?',
        answer: 'Täysi mukautus on saatavilla jokaiseen tehtävään. Aloita tehtävien lukumäärän asettamisella per sivu. Valitse 1-8 vertailutehtävää. Säädä vaikeustasoa muuttamalla, mitkä symbolit sisällytetään. Käytä vain suurempi kuin (>) yksinkertaisimmille oppilaille. Valitse symbolin näyttötapa oppilaiden ikäryhmän mukaan. Kuvitussymbolit sopivat esiopetukselle ja 1. luokalle. Söpöt grafiikat houkuttelevat nuoria oppijoita. Normaalit symbolit (>, <, =) sopivat 2. ja 3. luokalle. Valmistelee standardoiduille testeille. Aseta vertailutila kognitiiviseen tasoon. Kuva kuvaan -tila on helpoin aloittelijoille. Lapset laskevat konkreettisia objekteja molemmilla puolilla. Kuva numeroon -tila lisää abstraktiota. Yhdistää konkreettisen laskemisen numeeriseen esitykseen.',
      },
      {
        id: '8',
        question: 'Mille Ikäryhmille Lukemaan Oppiminen Tehtävät Vertailutehtävät Sopivat Parhaiten?',
        answer: 'Vertailutehtävät toimivat parhaiten 5-9-vuotiaille lapsille. Esiopetus (5-6-vuotiaat) oppii perus lukumäärien vertailun. 1. luokka (6-7-vuotiaat) hallitsee suurempi/pienempi käsitteet. 2. luokka (7-8-vuotiaat) siirtyy abstraktimpiin vertailuihin. 3. luokka (8-9-vuotiaat) yhdistää vertailun muihin matemaattisiin operaatioihin. Esiopetuksessa aloita 1-3 objektilla per ryhmä. Käytä kuvitussymboleita ja samoja kuvia. Yksinkertainen visuaalinen vertailu rakentaa itseluottamusta. Lapset oppivat laskemaan ja vertailemaan samanaikaisesti. Perusta matematiikalle asetetaan varhain. 1. luokassa kasvata 1-6 objektiin per ryhmä. Käytä sekä samoja että eri kuvia. Esittele kaikki kolme symbolia (>, <, =). Lapset alkavat tunnistaa matemaattiset merkinnät. Valmistautuminen kirjallisiin matemaattisiin lausekkeisiin.',
      },
      {
        id: '9',
        question: 'Voinko Ladata Omia Kuvia Esiopetus Materiaali Ilmainen Vertailutehtäviin?',
        answer: 'Kyllä. Lataa rajattomasti omia kuvia Täysi Käyttöoikeus -tilauksella. Monivalinta tukee useiden tiedostojen lataamista kerralla. JPEG, PNG ja GIF muodot ovat kaikki tuettuja. Ei tiedostokokorajoituksia tai määrärajoituksia. Lataa luokkahuoneen esineiden kuvia personointia varten. Oppilaiden työt, luokkahuoneen lemmikkieläin tai koulun maskotti. Paikalliset maamerkit tai kulttuuriset symbolit. Lapset innostuvat tunnistaessaan tuttuja kohteita. Personointi lisää sitoutumista ja motivaatiota. Käytä oppilaiden valokuvia perheiden suostumuksella. Vertaile kuvia Annikasta ja Matiasta. Lapset rakastavat nähdä itsensä tehtävissä. Vahvistaa identiteettiä ja yhteyttä oppimiseen. Tehtävät tulevat henkilökohtaisiksi ja merkityksellisiksi.',
      },
      {
        id: '10',
        question: 'Kuinka Kauan Kestää Luoda Värityskuvia Lapsille Tulostettava Vertailutehtävä?',
        answer: 'Keskimääräinen luomisaika on 2-3 minuuttia alusta loppuun. Valitse kuvat (30 sekuntia). Aseta asetukset (30 sekuntia). Generoi tehtävä (5 sekuntia). Esikatsele ja lataa (30 sekuntia). Yhteensä alle 3 minuuttia ammattimaiseen tehtävään. Jos muokkaat kankaalla, lisää 2-5 minuuttia. Lisää omaa tekstiä, säädä sijainteja, vaihda taustat. Kokonaisaika pysyy edelleen alle 10 minuutissa. Verrattuna 30-60 minuuttiin perinteisillä menetelmillä. 80-90% ajansäästö. Rutiinin opettajat luovat vielä nopeammin. Tutut asetukset nopeuttavat prosessia. Toista samoja kuva- ja teemavalinteita. Eräluonti useita tehtäviä 10-15 minuutissa. Luokkahuoneopettajat luovat viikon tehtävät kertaalleen.',
      },
      {
        id: '11',
        question: 'Sisältävätkö Hienomotoriikka Harjoitukset Vertailutehtävät Vastausavaimet?',
        answer: 'Kyllä. Vastausavain luodaan erillisellä klikkauksella. Samanlainen asettelu kuin tehtävä, mutta oikeilla symboleilla täytetty. Järjestelmä tietää jokaisen tehtävän oikean vastauksen. Ei tarvetta manuaaliseen luomiseen tai tarkistukseen. Jos valitsit kuvitussymbolit, vastausavaimessa näkyvät symboligrafiikat. Söpöt >, < ja = kuvat ilmestyvät oikeisiin paikkoihin. Jos valitsit normaalit symbolit, vastausavaimessa näkyvät tekstisymbolit. Johdonmukainen valintojen kanssa. Lataa vastausavain erikseen JPEG- tai PDF-muodossa. Pidä opettajan tiedostossa arviointia varten. Älä jaa oppilaille ennen tehtävän valmistumista. Jotkut opettajat tulostavat vastausavaimen värillisenä erottamiseksi. Vastausavain säästää tunteja arviointiaikaa. Ei tarvetta ratkaista jokaista tehtävää itse. Pikaisesti tarkista oppilaiden työt vastausavainta vasten.',
      },
      {
        id: '12',
        question: 'Voinko Luoda Pisteestä Pisteeseen Tehtävät Vertailutehtäviä Tietyistä Kouluaineista?',
        answer: 'Kyllä. Kuvakirjasto on järjestetty teemoittain. Eläimet, ruoka, lelut, kulkuneuvot, luonto, juhlapäivät ja monet muut. Valitse teema, joka vastaa yksikköopetustasi. Integroitu oppiminen vahvistaa useita aineita samanaikaisesti. Opiskeletko meren eläimiä tieteessä? Luo vertailutehtäviä kaloista, rauista ja valaista. Matematiikka vahvistaa tiedeoppia. Lapset oppivat meren eläinten nimiä laskiessaan niitä. Monitieteinen lähestymistapa parantaa muistamista. Hedelmät ja vihannekset tukevat terveysopetusta. Vertaile omenoita, banaaneja, porkkanoita ja paprikoita. Keskustele ravitsemuksesta laskennan aikana. Matematiikka tulee merkitykselliseksi jokapäiväisen elämän yhteydessä. Lapset ymmärtävät käytännön sovelluksia.',
      },
    ],
  },

  // Pricing - Finnish Täysi Käyttöoikeus terminology
  pricing: {
    title: 'Täysi Käyttöoikeus',
    price: '240€',
    priceInterval: '/vuosi',
    priceSuffix: 'Laskutetaan vuosittain',
    benefits: [
      'Rajoittamaton tehtävien luonti',
      'Kaupallinen lisenssi sisältyy',
      '11 kielen tuki',
      '3000+ teemaattista kuvaa',
      '300 DPI tulostuslaatu',
      'Vastausavaimet sisältyvät',
    ],
    ctaText: 'Aloita Luominen Nyt',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Yhdistä Muihin Tehtävämonistegeneraattoreihin',
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä vertailutehtävät näihin täydentäviin generaattoreihin.',
    ctaTitle: 'Valmiina Luomaan Upeita Tehtävämonisteitä?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia tehtävämonisteitä. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
    primaryCtaText: 'Aloita Ilmainen Kokeilu',
    secondaryCtaText: 'Katso Kaikki 33 Sovellusta',
    badgeText: 'Toimii Hyvin Yhdessä',
    exploreText: 'Tutustu kaikkiin sovelluksiin',
    trustBadges: {
      securePayment: 'Turvallinen maksu',
      cancelAnytime: 'Peruuta milloin tahansa',
    },
    items: [
      {
        id: '1',
        slug: 'image-addition',
        name: 'Yhteenlasku',
        category: 'Matematiikka',
        icon: '➕',
        description: 'Yhdistä vertailutehtävät yhteenlaskutehtäviin kokonaisvaltaiseen matematiikkaopetukseen.',
      },
      {
        id: '2',
        slug: 'image-subtraction',
        name: 'Vähennyslasku',
        category: 'Matematiikka',
        icon: '➖',
        description: 'Täydennä vertailua vähennyslaskuharjoituksilla matemaattisen ymmärryksen syventämiseen.',
      },
      {
        id: '3',
        slug: 'find-and-count',
        name: 'Etsi ja Laske',
        category: 'Matematiikka',
        icon: '🔢',
        description: 'Yhdistä laskeminen etsintätehtäviin visuaalisen numerotuntemuksen kehittämiseksi.',
      },
      {
        id: '4',
        slug: 'big-small-app',
        name: 'Iso ja Pieni',
        category: 'Matematiikka',
        icon: '📏',
        description: 'Laajenna vertailua kokovertailutehtävillä visuaalisen hahmottamisen harjoitteluun.',
      },
      {
        id: '5',
        slug: 'pattern-train',
        name: 'Kuviojuna',
        category: 'Looginen Ajattelu',
        icon: '🚂',
        description: 'Kehitä loogista ajattelua kuvioiden täydentämistehtävillä.',
      },
      {
        id: '6',
        slug: 'coloring',
        name: 'Värityskuvat',
        category: 'Luovuus',
        icon: '🎨',
        description: 'Yhdistä vertailutehtävät värityskuviin kaksinkertaiseen oppimiskokemukseen.',
      },
    ],
  },
};

export default moreLessFiContent;
