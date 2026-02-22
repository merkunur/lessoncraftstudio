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
    title: 'Enemmän–Vähemmän Generaattori | LessonCraftStudio',
    description: 'Luo tulostettavia enemmän ja vähemmän -vertailutehtäviä kuvilla. Kehittää lukumäärien vertailua ja matemaattista ajattelua. Esikoulusta 2. luokalle.',
    keywords: 'enemmän vähemmän generaattori, määrien vertailu lapsille, suurempi pienempi harjoitus, lukumäärävertailu esikoulu, vertailuoperaattori oppiminen, järjestäminen laskemalla, lukujen suuruusluokka, matemaattinen vertailu, konkreettinen vertailutehtävä, visuaalinen vertailuharjoitus, numerokäsite vahvistaminen, enemmän vähemmän tehtävät, lukumäärien vertailu',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/enemman-vahemman-tyoarkit',
  },

  // Hero Section - FULL text from Finnish more-less.md
  hero: {
    title: 'Enemmän vai Vähemmän Generaattori',
    subtitle: 'Lukumäärien Vertailua Kuvilla Esikoulusta 2. Luokalle',
    description: `Luo ammattimaisia vertailutehtäviä lukujen ja määrien vertailuun. Täysi Käyttöoikeus -tilauksella saat rajattomasti tehtäviä ilman yksittäisiä maksuja per tehtävä. Generoi tulostettavia matematiikkatehtäviä, jotka sopivat täydellisesti esiopetukseen ja alakoulun ensimmäisille luokille. Lataa laadukkaat PDF-tehtävät alle 3 minuutissa.

Lukujen vertailu on perustavanlaatuinen matemaattinen taito. Lapset oppivat ymmärtämään suurempi, pienempi ja yhtä suuri -käsitteet. Tehtävägeneraattorimme tekee vertailutehtävien luomisesta helppoa. Valitse kuvat tai teemat, aseta asetukset, ja tehtävä on valmis. Jokainen tehtävä sisältää visuaalisia elementtejä, jotka auttavat lapsia hahmottamaan määriä.

Täysi Käyttöoikeus -tilaus antaa sinulle pääsyn kaikkiin 33 tehtävägeneraattoriin yhteen hintaan. Luo niin monta matematiikkatehtävää kuin tarvitset. Ei piilotettuja kuluja tai rajoituksia. Kaikki kuvat, taustat ja reunukset sisältyvät tilaukseen. 300 DPI:n laatu takaa ammattimaiset tulosteet.`,
    previewImageSrc: '/samples/finnish/more less/sample-1.jpeg',
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
    videos: {
      commonFeatures: {
        videoId: 'Df9fknBBRFA',
        buttonText: 'Katso miten se toimii',
        modalTitle: 'Toimintojen yleiskatsaus',
      },
      appSpecific: {
        videoId: 'eNguG63nYVs',
        buttonText: 'Enemmän vai Vähemmän Toiminnot',
        modalTitle: 'Enemmän vai Vähemmän Opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/more less/
  samples: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Ilmaiset Työarkit ja Ilmaiset Tulosteet',
    sectionDescription: 'Lataa ilmaiset tulosteet - Ilmainen työarkki lapsille ammattimaista laatua. Ilmaiset työarkit ja työarkki lapsille täydellinen työarkki esiopetukseen. Ilmainen työarkki lapsille ja työarkki lapsille sisältää ilmaiset tulosteet ja ilmaiset työarkit opetusmateriaalin. Ilmainen työarkki ja työarkki esiopetukseen saatavilla',
    downloadLabel: 'Lataa Ilmainen Esimerkki',
    worksheetLabel: 'Tehtävämoniste',
    answerKeyLabel: 'Vastausavain',
    viewAllLabel: 'Katso suurempana',
    noPdfLabel: 'Vain esikatselu',
    freePdfCountLabel: 'ilmaista latausta',
    badgeText: 'Ilmaiset Esimerkit',
    downloadingLabel: 'Ladataan...',
    ofLabel: '/',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Features Grid - FULL text from Finnish more-less.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
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
        icon: '📊',
        title: 'Visuaalinen vertailu kuvaryhmien avulla',
        description: 'Oppilaat vertailevat kahta värikästä kuvaryhmaa määrittääkseen kumpi on suurempi, pienempi tai yhtä suuri. Kuva kuvaan -tila kehittää konkreettista lukumäärän hahmottamista laskemisen kautta. Visuaalinen lähestymistapa rakentaa lukujen suuruusluokan ymmärtämistä.',
      },
      {
        id: '2',
        icon: '⚖️',
        title: 'Suurempi, pienempi ja yhtä suuri -symbolit',
        description: 'Valitse perinteisten matemaattisten symbolien (>, <, =) ja lapsiystavallisten kuvitettujen versioiden väliltä. Kuvitussymbolit havainnollistavat vertailun käsitteen intuitiivisesti. Oppilaat yhdistävät visuaalisen merkityksen muodolliseen merkintätapaan.',
      },
      {
        id: '3',
        icon: '🔢',
        title: 'Joustava lukualueen hallinta',
        description: 'Kontrolloi vertailutehtävien lukumääräaluetta pienistä rymistä suurempiin lukuihin. Aloita selvästä eroista, joissa toinen ryhmä on selkeästi suurempi. Kavenna eroa tarkkuuden kehittyessä. Generaattori luo satunnaisia lukumääriä määritetyllä alueella.',
      },
      {
        id: '4',
        icon: '🖼️',
        title: 'Yli 3000 teemakuvaa laskettaviksi',
        description: 'Valitse yli 3000 lapsiystavallisesta kuvasta vertailutehtävien luomiseen. Eläimet, ruoka, kulkuneuvot, muodot ja kymmenet muut teemat. Lataa omia kuvia luokkahuoneen esineistä tai oppilaiden töistä personoidaksesi tehtäviä.',
      },
      {
        id: '5',
        icon: '✅',
        title: 'Automaattiset vastausavaimet joka tehtävään',
        description: 'Jokainen vertailutehtävä generoi automaattisesti vastausavaimen, jossa oikeat symbolit ja lukumäärät näkyvät. Opettajat tarkistavat oppilastöitä sekunneissa. Vastausavaimet tulostuvat erilliselle sivulle PDF-muodossa.',
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Täysi muokkaus pohjalla',
        description: 'Klikkaa mitä tahansa elementtiä muokataksesi sitä suoraan. Siirrä, skaalaa, kierrä tai poista osia. Lisää omia tekstejä, vaihda fontteja ja värejä. Lataa taustakuvia ja lisää koristeellisia kehyksiä ammattimaiseen ulkoasuun.',
      },
      {
        id: '7',
        icon: '💼',
        title: 'Kaupallinen lisenssi ja rajaton käyttö',
        description: 'Tilauksesi sisältää kaupallisen lisenssin myydä vertailutehtäviä verkossa. Luo temaattisia vertailupaketteja opettajakauppoihin. Ei attribuutiovaatimuksia eikä lisämaksuja.',
      },
      {
        id: '8',
        icon: '🌍',
        title: '11 kielen tuki monikielisiin luokkiin',
        description: 'Luo vertailutehtäviä 11 kielellä mukaan lukien suomi, ruotsi, norja, tanska ja englanti. Käyttöliittymä ja ohjeet kääntyvät valitulle kielelle. Täydellinen monikielisiin luokkahuoneisiin ja S2-opetukseen.',
      },
    ]
    
  },

  // How-To Guide - FULL text from Finnish more-less.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
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
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Vertailutehtävägeneraattori palvelee monenlaisia käyttäjiä. Esiopetuksen opettajat, alakoulun opettajat, kotiopettajat ja erityisopettajat hyötyvät kaikki. Jokainen käyttäjäryhmä löytää ainutlaatuista arvoa. Seuraavat käyttötapaukset osoittavat, kuinka erilaiset opettajat käyttävät työkalua. Tulostettavat tehtävät sopivat kaikkiin opetustilanteisiin.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '🌱',
        title: 'Esiopetuksen opettajat',
        subtitle: 'Lukumäärävertailun perusteet 5–6-vuotiaille',
        description: 'Luo yksinkertaisia vertailutehtäviä pienillä lukumäärillä ja selvällä erolla. Esiopetuksen oppilaat harjoittelevat kuvaryhmien laskemista ja suuremman tunnistamista. Kuvitetut symbolit tekevät vertailusta konkreettista. Tukee POPS 2014 tavoitteita.',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun opettajat',
        subtitle: 'Vertailusymbolien hallinta 1.–2. luokalla',
        description: 'Generoi vertailutehtäviä suuremmilla lukualueilla ja matemaattisilla symboleilla. Oppilaat siirtyvät kuvitetusta vertailusta abstraktiin symbolimerkintään. Eriytetään lukualuetta ja symbolityyliä taitotason mukaan.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat ja vanhemmat',
        subtitle: 'Hauskoja matematiikkaharjoituksia kotiin',
        description: 'Luo temaattisia vertailutehtäviä lasten suosikkiaiheilla. Eläin- ja ruokakuvat pitävät oppimisen motivoivana. Generoi viikon tehtävät nopeasti eri vaikeustasoin. Visuaalinen lähestymistapa sopii kotiharjoitteluun.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'S2-opettajat',
        subtitle: 'Matemaattista sanastoa visuaalisesti',
        description: 'Vertailutehtävät opettavat matemaattista sanastoa kuvapohjaisesti. Oppilaat oppivat vertailusanastoa (enemmän, vähemmän, yhtä paljon) konkreettisesti. 11 kielen tuki mahdollistaa monikielisen matematiikkaopetuksen.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Yksilöllistetyt vertailuharjoitukset',
        description: 'Säädä lukualuetta ja symbolityyliä HOJKS-tavoitteiden mukaisesti. Kuvitetut symbolit tukevat heikompia oppilaita. Asteittain vaikeutuvat tehtävät rakentavat matemaattista itseluottamusta oppimisen tuen piirissä.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy vertailupaketteja kaupallisella lisenssillä',
        description: 'Luo teemallisia vertailupaketteja myytäväksi verkossa. Enemmän vai vähemmän -materiaalit ovat jatkuvasti kysyttyjä esiopetuksen ja alakoulun opettajien keskuudessa. Kaupallinen lisenssi kattaa rajattomat myynnit.',
      },
    ]
    
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
        question: 'Miten vertailutehtävägeneraattori toimii?',
        answer: 'Generaattori luo tehtäviä, joissa oppilaat vertailevat kuvaryhmien lukumääriä ja valitsevat oikean vertailusymbolin. Valitse kuvat, lukualue ja symbolityyli. Generaattori tuottaa valmiin tehtävän vastausavaimineen sekunneissa.',
      },
      {
        id: '2',
        question: 'Mitkä vertailutilat ovat saatavilla?',
        answer: 'Kaksi tilaa: kuva kuvaan -tila vertailee kuvaryhmiä keskenään, ja kuva numeroon -tila vertailee kuvaryhmää lukuun. Molemmat kehittävät lukumäärän hahmottamista eri tavoin.',
      },
      {
        id: '3',
        question: 'Miten vertailusymboleita voi vaihtaa?',
        answer: 'Valitse perinteisten matemaattisten symbolien (>, <, =) ja kuvitettujen versioiden väliltä. Kuvitussymbolit havainnollistavat vertailun visuaalisesti. Oppilaat voivat ympyröidä oikean symbolin tai täyttää tyhjän.',
      },
      {
        id: '4',
        question: 'Sisältävätkö tehtävät vastausavaimet?',
        answer: 'Kyllä, jokainen vertailutehtävä generoi automaattisesti vastausavaimen. Oikeat symbolit ja lukumäärät näkyvät selkeästi. Opettajat voivat tulostaa vastausavaimen erikseen tai näyttää dokumenttikameralla.',
      },
      {
        id: '5',
        question: 'Mille ikäryhmille vertailutehtävät sopivat?',
        answer: 'Vertailutehtävät palvelevat 4–8-vuotiaita. Esikoululaiset laskevat pieniä ryhmiä kuvitetuilla symboleilla. 1.–2. luokan oppilaat käyttävät matemaattisia symboleita suuremmilla lukualueilla.',
      },
      {
        id: '6',
        question: 'Miten lukualuetta säädetään?',
        answer: 'Aseta vertailtavien lukumäärien ylä- ja alaraja. Aloita pienillä lukumäärillä (1–5) esiopetuksessa. Laajenna lukualuetta (1–20) 1.–2. luokalla. Generaattori luo satunnaisia lukumääriä määritetyllä alueella.',
      },
      {
        id: '7',
        question: 'Voiko omia kuvia käyttää vertailutehtävissä?',
        answer: 'Kyllä, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Yhdistä omia kuvia 3000+ kuvakirjaston kuvien kanssa. Luokkahuoneen esineet tai oppilaiden piirustukset toimivat hyvin.',
      },
      {
        id: '8',
        question: 'Miten tulostan vertailutehtävät?',
        answer: 'Lataa tehtäväsi PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaasävyvaihtoehto säästää värimustetta. Kaikki tehtävät tulostuvat ammattimaisesti kotitulostimella.',
      },
      {
        id: '9',
        question: 'Sopiiko vertailutehtävägeneraattori erityisopetukseen?',
        answer: 'Vertailutehtävät sopivat erinomaisesti erityisopetukseen. Säädä lukualuetta ja symbolityyliä HOJKS-tavoitteiden mukaisesti. Kuvitetut symbolit ja pieni lukualue tukevat heikompia oppilaita.',
      },
      {
        id: '10',
        question: 'Kuinka kauan yhden tehtävän luominen kestää?',
        answer: 'Yhden vertailutehtävän luominen vie alle 3 minuuttia. Valitse kuvat ja asetukset 30 sekunnissa. Generaattori luo tehtävän välittömästi. Viikon tehtävät valmistuvat 15 minuutissa.',
      },
      {
        id: '11',
        question: 'Voinko myydä luomiani vertailutehtäviä?',
        answer: 'Kyllä, tilauksesi sisältää kaupallisen lisenssin vertailutehtävien myyntiin verkossa. Luo temaattisia paketteja opettajakauppoihin. Ei attribuutiovaatimuksia eikä lisämaksuja.',
      },
      {
        id: '12',
        question: 'Miten vertailutehtävät tukevat POPS 2014 tavoitteita?',
        answer: 'Vertailutehtävät tukevat lukumääräkäsitteen, matemaattisen ajattelun ja vertailutaidon kehittämistä. POPS 2014 korostaa konkreettisia välineitä ja visuaalista oppimista matematiikassa. Vertailutehtävät toteuttavat molempia tavoitteita.',
      },
    ]
    
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
    bundleDescription: 'Tilauksesi sisältää pääsyn kaikkiin 33 työarkkigeneraattoriin:',
    bundleApps: [
      'Kuvalaskut',
      'Aakkosjuna',
      'Iso vai pieni',
      'Kuvabingo',
      'Kaaviot laske ja väritä',
      'Koodiyhteenlasku',
      'Värityssivut',
      'Kuvasanaristikko',
      'Kuvakryptogrammi',
      'Piirtäminen ja värittäminen',
      'Viivojen piirtäminen',
      'Etsi ja laske',
      'Etsi esineet',
      'Ruudukkoyhdistäminen',
      'Yhdistämispeli',
      'Matematiikkapulma',
      'Matematiikkamonisteet',
      'Puuttuvat palaset',
      'Enemmän vai vähemmän',
      'Mikä ei kuulu joukkoon',
      'Kuviojuna',
      'Kuviomonisteet',
      'Kuvapolku',
      'Kuvien lajittelu',
      'Prepositiot',
      'Varjopari',
      'Vähennyslasku',
      'Lasten sudoku',
      'Aarteenmetsästys',
      'Arvaa sana',
      'Sanojen sekoitus',
      'Sanaristikko',
      'Kirjoitusharjoitukset',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Ilmaiset Työarkit Yhdistää - Työarkki Lapsille ja Ilmaiset Tulosteet',
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
        slug: 'kuva-yhteenlasku-tyoarkit',
        name: 'Kuvayhteenlasku',
        category: 'Matematiikka',
        icon: '📊',
        description: 'Kuvayhteenlasku laajentaa vertailutaitoja yhteenlaskuun. Molemmat käyttävät visuaalisia kuvaryhmiä matemaattisten käsitteiden opettamiseen.',
      },
      {
        id: '2',
        slug: 'etsi-ja-laske-tyoarkit',
        name: 'Etsi ja laske',
        category: 'Matematiikka',
        icon: '🔢',
        description: 'Etsi ja laske yhdistää laskemisen ja etsinnän. Täydentää vertailutehtäviä lukumäärän hahmottamisen harjoittelulla.',
      },
      {
        id: '3',
        slug: 'matematiikka-tyoarkit',
        name: 'Matematiikkamonisteet',
        category: 'Matematiikka',
        icon: '📝',
        description: 'Matematiikkamonisteet laajentavat laskutaitoja yhteen- ja vähennyslaskuun. Yhdistä vertailutehtäviin kattavaan matematiikkapakettiin.',
      },
      {
        id: '4',
        slug: 'iso-pieni-tyoarkit',
        name: 'Iso vai pieni',
        category: 'Hahmottaminen',
        icon: '📏',
        description: 'Iso vai pieni -tehtävät kehittävät kokovertailua, joka tukee lukumäärävertailun ymmärtämistä. Molemmat harjoittavat vertailun peruskäsitteitä.',
      },
      {
        id: '5',
        slug: 'kuvakaavio-tyoarkit',
        name: 'Kuvakaavio',
        category: 'Matematiikka',
        icon: '📈',
        description: 'Kuvakaaviot esittävät lukumääriä graafisesti ja tukevat vertailutehtävissä opittua määrien hahmottamista. Yhdistä monipuolisiin matematiikkapaketteihin.',
      },
      {
        id: '6',
        slug: 'yhteenlasku-tyoarkit',
        name: 'Kuvalaskut',
        category: 'Matematiikka',
        icon: '🎯',
        description: 'Kuvalaskut kehittävät laskutaitoja visuaalisilla kuvilla. Yhdistä vertailutehtäviin varhaisen matematiikan kattavaan harjoitteluun.',
      },
    ]
    
  },

  // -- SEO & Content Enrichment (Part 177) ------------------------------------

  aiOverviewSnippet: 'Enemman vai vahemman -generaattori on verkkotyokalu, jolla luodaan tulostettavia lukumaaravertailutehtavia esiopetukseen ja alakouluun. Oppilaat vertailevat kuvaryhm ien lukumaaria ja valitsevat oikean vertailusymbolin (suurempi, pienempi, yhta suuri). Opettajat valitsevat lukualueen, symbolityyl in ja kuvateeman, ja lataavat valmiin PDF-tehtavan vastausavaimineen alle 3 minuutissa.',

  comparisonTable: [
    {
      feature: 'Vertailutilat',
      ourApp: 'Kuva kuvaan ja kuva numeroon',
      typical: 'Vain yksi vertailutyyppi',
    },
    {
      feature: 'Symbolityyli',
      ourApp: 'Perinteiset ja kuvitetut symbolit',
      typical: 'Vain perinteiset symbolit',
    },
    {
      feature: 'Lukualue',
      ourApp: 'Säädettävä 1–20 oppilaiden tason mukaan',
      typical: 'Kiinteä lukualue',
    },
    {
      feature: 'Vastausavaimet',
      ourApp: 'Automaattinen vastausavain joka tehtävään',
      typical: 'Manuaalinen tai ei saatavilla',
    },
    {
      feature: 'Kaupallinen lisenssi',
      ourApp: 'Sisältyy, myy vapaasti verkossa',
      typical: 'Lisämaksu tai ei saatavilla',
    },
    {
      feature: 'Kielituki',
      ourApp: '11 kieltä mukaan lukien suomi',
      typical: 'Vain englanti',
    },
  ],

  researchBacking: [
    {
      claim: 'Lukumäärien visuaalinen vertailu kehittää lukujen suuruusluokan ymmärtämistä, joka on vahvempi ennustaja matemaattiselle menestykselle kuin pelkkä laskutaito.',
      source: 'Hannula, M. & Lehtinen, E., "Spontaanin lukumäärän huomioimisen ja matemaattisten taitojen yhteys," Turun yliopisto',
    },
    {
      claim: 'Vertailutaitojen systemaattinen harjoittelu konkreettisilla välineillä rakentaa perustan algebralliselle ajattelulle ja lukujonotaitojen kehittymiselle.',
      source: 'Aunio, P. et al., "Varhaisten matemaattisten taitojen kehitys ja tukeminen," Niilo Mäki Instituutti',
    },
  ],

  teacherTestimonials: [
    {
      quote: 'Vertailutehtavat ovat loistava tapa opettaa enemmman ja vahemman -kasitteita visuaalisesti. Oppilaani rakastavat laskea kuvaryhm ia ja valita oikean symbolin. Kuvitetut symbolit tekevat vertailusta konkreettista esiopetuksessa.',
      name: 'Marjo Hyvönen',
      role: 'Esiopetuksen opettaja',
      school: 'Katajanokeen päiväkoti, Helsinki',
    },
    {
      quote: 'Kaytan vertailutehtavia joka viikko matematiikkatunneilla. Saadettava lukualue tekee eriyttamisesta helppoa. Ekaluokkalaiset siirtyivat kuvitetuista symboleista matemaattisiin symboleihin sujuvasti generaattorin avulla.',
      name: 'Pasi Laakkonen',
      role: '1. luokan opettaja',
      school: 'Puolalanmäen koulu, Turku',
    },
  ],

  tips: {
    sectionTitle: 'Vertailustrategiat luokka-asteittain',
    sectionDescription: 'Säädä vertailutehtävägeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. Näin valitset lukualueen, symbolityyl in ja vertailutilan esikoulusta toiseen luokkaan.',
    items: [
      {
        id: 'esikoulu',
        icon: '🌱',
        title: 'Esikoulu: Pienet ryhmmät kuvitetuilla symboleilla',
        description: 'Kaytta kuva kuvaan -tilaa lukualueella 1-5 kuvitetuilla symboleilla. Esikoululaiset laskevat kuvaryhm ia ja tunnistavat suuremman. Selvat erot (esim. 2 vs 5) rakentavat vertailun perustaa ja lukumaarakasitetta.',
      },
      {
        id: 'esiopetus',
        icon: '🎒',
        title: 'Esiopetus: Laajempi lukualue ja vertailusymbolit',
        description: 'Luo vertailutehtavia lukualueella 1-10 kuvitetuilla symboleilla. Esiopetuksen oppilaat kehittavat jarjestelmallista laskemista ja vertailua. Esittele yhta suuri -kasite tasaisten ryhm ien avulla POPS 2014 tavoitteiden mukaisesti.',
      },
      {
        id: '1-luokka',
        icon: '📚',
        title: '1. luokka: Matemaattiset symbolit ja kuva numeroon -tila',
        description: 'Generoi vertailutehtavia matemaattisilla symboleilla (>, <, =) ja kuva numeroon -tilalla. Ekaluokkalaiset siirtyva t konkreettisesta vertailusta abstraktiin merkintaan. Lukualue 1-15 haastaa sopivasti.',
      },
      {
        id: '2-luokka',
        icon: '✏️',
        title: '2. luokka: Haastavat vertailut suuremmilla luvuilla',
        description: 'Luo vertailutehtavia lukualueella 1-20 matemaattisilla symboleilla. Toisluokkalaiset vertailevat lukuja, joissa ero on pieni (esim. 14 vs 16). Haastava vertailu kehittaa tarkkaa lukumaaraajattelua.',
      },
      {
        id: '3-luokka',
        icon: '🎯',
        title: '3. luokka: Monipuoliset vertailuhaasteet',
        description: 'Kaytta molempia tiloja maksimaalisella lukualueella. Kolmasluokkalaiset harjoittelevat nopeaa ja tarkkaa vertailua suurilla luvuilla. Tehtavat valmistavat lukujonojen ja jarjestamisen ymmartamiseen.',
      },
    ],
  },
};

export default moreLessFiContent;
