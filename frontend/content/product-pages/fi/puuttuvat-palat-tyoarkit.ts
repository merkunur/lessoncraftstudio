import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Missing Pieces Worksheets - Finnish Content (Puuttuvat Palat -tehtävät)
 *
 * File: frontend/content/product-pages/fi/puuttuvat-palat-tyoarkit.ts
 * URL: /fi/apps/puuttuvat-palat-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/missing-pieces.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * FULL ACCESS APP - €240/year or €25/month (Täysi Käyttöoikeus)
 */

export const missingPiecesFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'puuttuvat-palat-tyoarkit',
    appId: 'missing-pieces',
    title: 'Puuttuvat Palat Generaattori — Ilmainen | LessonCraftStudio',
    description: 'Luo tulostettavia puuttuvat palat -tehtäviä visuaalisen hahmotuksen harjoitteluun. Etsi puuttuva kuva kuviosta. Esikoulusta 2. luokalle. Ilmainen PDF.',
    keywords: 'puuttuvat palat generaattori, täydennä kuva tehtävä, visuaalinen täydentäminen, osan ja kokonaisuuden hahmottaminen, visuaalinen päättely, puuttuvan osan löytäminen, kuvatäydennys harjoitus, visuaalinen analyysi, hahmottamiskyky kehittäminen, palapeli tulostettava, visuaalinen sulkeuma, puuttuvat palat tehtävät, palapeli tehtävä lapsille',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/puuttuvat-palat-tyoarkit',
  },

  // Hero Section - FULL text from Finnish missing-pieces.md
  hero: {
    title: 'Puuttuvat Palat Tehtävien Generaattori',
    subtitle: 'Visuaalisen Hahmotuksen Harjoituksia Kuvapalapeleillä',
    description: `Luo ammattimaisia puuttuvan palan tehtäviä ilmaisella generoinnilla Täysi Käyttöoikeus -tilauksellasi. Puuttuvan palan tehtävät kehittävät visuaalista hahmottamista ja ongelmanratkaisua. Lapset tunnistavat puuttuvan palan kuvasta ja valitsevat oikean vaihtoehdon. Lataa tulostettavat tehtävät lapsille PDF- tai JPEG-muodossa alle kolmessa minuutissa.

Puuttuvan palan tehtävät sopivat esiopetukseen ja alakoulun ala-asteelle. Voit luoda tehtäviä millä tahansa aiheella. Valitse kuva yli 3000 kuvasta tai lataa omat kuvasi. Säädä vaikeustasoa 1-5 puuttuvalla palalla ja 2-6 vastausvaihtoehdolla. Jokainen tehtävä sisältää vastausavaimen.

Täysi Käyttöoikeus -tilauksesi antaa rajattoman tehtävien luonnin ilman tehtäväkohtaisia maksuja. Luo niin monta puuttuvan palan tehtävää kuin tarvitset. Tilaus sisältää kaupalliset käyttöoikeudet. Myy tehtäviäsi Teachers Pay Teachersissa, Etsyssä tai Amazon KDP:ssä. Kaikki tehtävät ovat 300 DPI:n ammattilaatuisia.`,
    previewImageSrc: '/samples/finnish/missing pieces/sample-1.jpeg',
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
        videoId: 'gb-xE_Ay4fc',
        buttonText: 'Puuttuvat Palat Toiminnot',
        modalTitle: 'Puuttuvat Palat Opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/missing pieces/
  samples: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Ilmaiset Työarkit ja Ilmaiset Tulosteet',
    sectionDescription: 'Lataa ilmaiset tulosteet - Ilmainen työarkki lapsille ammattimaista laatua. Ilmaiset työarkit ja työarkki lapsille täydellinen työarkki esiopetukseen. Ilmainen työarkki lapsille ja työarkki lapsille sisältää ilmaiset tulosteet ja ilmaiset työarkit opetusmateriaalin. Ilmainen työarkki ja työarkki esiopetukseen saatavilla',
    downloadLabel: 'Lataa Ilmainen Esimerkki',
    worksheetLabel: 'Työarkki',
    answerKeyLabel: 'Vastausavain',
    viewAllLabel: 'Katso suurempana',
    noPdfLabel: 'Vain esikatselu',
    freePdfCountLabel: 'ilmaista latausta',
    badgeText: 'Ilmaiset Esimerkit',
    downloadingLabel: 'Ladataan...',
    ofLabel: '/',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Features Grid - FULL text from Finnish missing-pieces.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Puuttuvan palan tehtävien generaattori tarjoaa kaiken tarvitsemasi esiopetus materiaalin ja alakoulun tehtävien luomiseen. Jokainen ominaisuus on suunniteltu säästämään aikaa ja parantamaan oppimistuloksia.',
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
        icon: '🧩',
        title: 'Puuttuvan palan tunnistamismuoto',
        description: 'Generaattori poistaa 1–5 palaa kuvasta ja luo vastaavan määrän vastausvaihtoehtoja. Oppilaat analysoivat kuvan puuttuvaa kohtaa ja valitsevat oikean palan. Kehittää visuaalista sulkeumaa ja päättelyä.',
      },
      {
        id: '2',
        icon: '🔍',
        title: 'Säädettävä puuttuvien palojen määrä 1–5',
        description: 'Valitse 1–5 puuttuvaa palaa per tehtävä. Yksi pala on helpoin esikoululaisille. Viisi palaa vaatii laajaa visuaalista analysointia. Täydellinen eriytettämiseen.',
      },
      {
        id: '3',
        icon: '📐',
        title: 'Säädettävä vastausvaihtoehtojen määrä 2–6',
        description: 'Valitse 2–6 vastausvaihtoehtoa per puuttuva pala. Kaksi vaihtoehtoa on helpoin aloittelijoille. Kuusi vaihtoehtoa haastaa visuaalista erottelua. Distrakttoripalat luodaan automaattisesti.',
      },
      {
        id: '4',
        icon: '🖼️',
        title: 'Yli 3000 teemakuvaa tehtäviin',
        description: 'Valitse yli 3000 lapsiystavallisesta kuvasta puuttuvan palan tehtävien luomiseen. Eläimet, kulkuneuvot, ruoka ja kymmenet muut teemat. Kuva jaetaan automaattisesti paloihin.',
      },
      {
        id: '5',
        icon: '✅',
        title: 'Automaattiset vastausavaimet',
        description: 'Jokainen puuttuvan palan tehtävä generoi automaattisesti vastausavaimen, jossa oikea pala on korostettu. Opettajat tarkistavat oppilastöitä sekunneissa.',
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Täysi muokkaus pohjalla',
        description: 'Muokkaa jokaista elementtiä luomisen jälkeen. Siirrä, skaalaa ja kierrä kuvia vapaasti. Lisää tekstejä ja ohjeita. Ammattimaiset muokkaustyökalut.',
      },
      {
        id: '7',
        icon: '💼',
        title: 'Kaupallinen lisenssi myyntiin',
        description: 'Tilauksesi sisältää kaupalliset oikeudet myydä puuttuvan palan tehtäviä verkossa. Luo temaattisia palapelipaketteja myytäväksi. Ei attribuutiovaatimuksia.',
      },
      {
        id: '8',
        icon: '🌍',
        title: '11 kielen tuki',
        description: 'Luo puuttuvan palan tehtäviä 11 kielellä. Käyttöliittymä kääntyy valitulle kielelle. Täydellinen monikielisiin luokkahuoneisiin.',
      },
    ]
    
  },

  // How-To Guide - FULL text from Finnish missing-pieces.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Puuttuvan palan tehtävien luominen on nopeaa ja helppoa. Seuraa näitä viittä yksinkertaista vaihetta. Koko prosessi vie alle kolme minuuttia alusta loppuun. Ei suunnitteluosaamista tarvita. Ei monimutkaisia työkaluja opittavaksi.',
    ctaText: 'Aloita Luominen Nyt',
    badgeText: 'Näin Se Toimii',
    stepLabel: 'Vaihe',
    completionTitle: 'Valmis!',
    completionSubtitle: 'Työarkkisi on valmis',
    readyTime: 'Valmis alle 3 minuutissa',
    noSkillsNeeded: 'Ei suunnitteluosaamista tarvita',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Valitse Sisältö Tulostettaville Tehtäville Lapsille - Matematiikka Tehtävät Alakoulu tai Esiopetus Materiaali',
        description: `Aloita valitsemalla kuva puuttuvan palan tehtävääsi varten. Sinulla on kolme vaihtoehtoa. Valitse koko teema yhdellä napsautuksella. Selaa yli 3000 yksittäistä kuvaa. Tai lataa omat kuvasi.

Teemavalinta on nopein tapa aloittaa. Valitse "Eläimet" matematiikka tehtävät alakoulu varten. Valitse "Ruoka" esiopetus materiaali ilmainen generoinnille. Valitse "Kulkuneuvot" tai "Luonto" tai mikä tahansa muu teema. Ohjelma valitsee satunnaisesti kuvan teemasta.

Yksittäinen kuvavalinta antaa täydellisen hallinnan. Käytä hakutoimintoa löytääksesi tarkan kuvan. Kirjoita "kissa" ja näe kaikki kissakuvat. Kirjoita "omena" ja näe kaikki omenakuvat. Valitse täydellinen kuva tulostettaville tehtäville lapsille.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetukset - Hienomotoriikka Harjoitukset ja Kirjaimet Harjoittelu Esikoulu Vaikeustasolla',
        description: `Säädä tehtävän vaikeustasoa oppilaittesi tarpeisiin. Valitse 1-5 puuttuvaa palaa. Yksi pala on helpoin esiopetukselle. Viisi palaa haastaa vanhempia oppilaita. Säädä vaikeutta täydellisesti.

Valitse vastauksien määrä. 2-6 vaihtoehtoa saatavilla. Kaksi vaihtoehtoa on helpoin hienomotoriikka harjoitukset aloittelijoille. Kuusi vaihtoehtoa lisää haastetta. Enemmän vaihtoehtoja tarkoittaa vaikeampaa tehtävää.

Valitse palan muoto kuudesta vaihtoehdosta. Neliö, ympyrä tai suorakulmio. Pystysuora tai vaakasuora. Ellipsi kahdessa suunnassa. Eri muodot sopivat eri sisältöön. Neliö toimii hyvin kirjaimet harjoittelu esikoulu tehtäville. Ympyrä sopii numeroille.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi Tehtävä - Lukemaan Oppiminen Tehtävät ja Värityskuvia Lapsille Tulostettava Versiot',
        description: `Napsauta "Luo tehtävä" generoidaksesi puuttuvan palan tehtävän. Generaattori käsittelee asetuksesi välittömästi. Näet esikatselu muutamassa sekunnissa. Ei odotusaikaa. Ei latauspainikkeiden pyörimistä.

Ohjelma poistaa satunnaisen palan tai palat kuvastasi. Luo distrakttorivaihtoehdot automaattisesti. Järjestää oikeat ja väärät vastaukset satunnaisessa järjestyksessä. Kaikki tapahtuu automaattisesti. Luo lukemaan oppiminen tehtävät tai värityskuvia lapsille tulostettava versioita vaivattomasti.

Vastausavain luodaan samanaikaisesti. Napsauta "Vastausavain" välilehteä nähdäksesi sen. Näyttää täydellisen kuvan oikeilla vastauksilla merkittyinä. Molemmat pohjat ovat täysin muokattavissa. Muokkaa ennen lataamista.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Pohjalla - Yhteenlasku ja Vähennyslasku Tehtävät sekä Kertotaulut Tulostettava Versiot',
        description: `Kaikki pohjalla on täysin muokattavissa. Vedä kohteet uuteen paikkaan. Kierrä hiirellä. Skaalaa vetämällä kulmista. Poista kohteet painamalla Delete-näppäintä. Täydellinen hallinta jokaisesta elementistä.

Lisää tekstielementtejä yhteenlasku ja vähennyslasku tehtävät ohjeiden antamiseen. Valitse seitsemästä fontista. Muuta tekstin väriä. Säädä fonttikokoa 8-200. Lisää ääriviivat luettavuuden parantamiseksi. Luo ammattimaisen näköisiä kertotaulut tulostettava tehtäviä.

Kontekstuaalinen työkalupalkki ilmestyy valitessasi kohteet. Tasaa kohteet vasemmalle, keskelle tai oikealle. Tasaa ylös, keskelle tai alas. Keskitä sivulle vaakasuoraan tai pystysuoraan. Täydelliset työkalut tarkkaan muokkaukseen.`,
        icon: '🔧',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta - Pisteestä Pisteeseen Tehtävät ja Tulostettavat Tehtävät Lapsille PDF-muodossa',
        description: `Valitse latausmuoto. JPEG tai PDF. Molemmat saatavilla 300 DPI:n laadulla. JPEG on paras yksittäisille tehtäville. PDF on paras monisivuisille asiakirjoille.

Lataa sekä tehtävä että vastausavain erikseen. Molemmat samalla ammattilaatuisella tarkkuudella. Oppilaasi saavat tehtävän. Sinä säilytät vastausavaimen. Täydellinen pisteestä pisteeseen tehtävät arviointiin.

Harmaasävyvaihtoehto säästää mustetta. Valitse harmaasävy-valintaruutu ennen lataamista. Mikä tahansa tehtävä muuttuu harmaasävyksi. Säästä 60-80% musteen käytössä. Täydellinen suurille määrille tulostettavia tehtäviä lapsille.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish missing-pieces.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Puuttuvan palan tehtävät palvelevat monenlaisia käyttäjiä. Esiopettajat luovat visuaalisen hahmottamisen tehtäviä. Alakoulun opettajat rakentavat ongelmanratkaisutaitoja. Kotiopettajavanhemmat personoivat oppimista. Kielenopettajat kehittävät sanastoa. Erityisopettajat eriyttävät materiaalia.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '🌱',
        title: 'Esiopetuksen opettajat',
        subtitle: 'Visuaalisen hahmottamisen kehittäminen 5–6-vuotiaille',
        description: 'Luo tehtäviä yhdellä puuttuvalla palalla ja kahdella vastausvaihtoehdolla. Esiopetuksen oppilaat harjoittelevat kuvan osien tunnistamista. Tukee POPS 2014 visuaalisen hahmottamisen tavoitteita.',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun opettajat',
        subtitle: 'Visuaalinen päättely 1.–3. luokalla',
        description: 'Generoi tehtäviä useilla puuttuvilla paloilla ja enemmän vastausvaihtoehdoilla. Oppilaat kehittävät visuaalista analysointia ja loogista päättelyä.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat ja vanhemmat',
        subtitle: 'Hauskoja palapelipohdintoja kotiin',
        description: 'Luo temaattisia puuttuvan palan tehtäviä lasten suosikkiaiheilla. Palapelimuoto pitää lapset kiinnostuneina. Generoi viikon tehtävät nopeasti.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'S2-opettajat',
        subtitle: 'Kielirajat ylittävä visuaalinen harjoittelu',
        description: 'Puuttuvan palan tehtävät eivät vaadi kielitaitoa. Kuvapohjainen muoto sopii kaikille oppilaille taustasta riippumatta. 11 kielen tuki mahdollistaa monikielisen opetuksen.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Yksilöllistetyt hahmottamisharjoitukset',
        description: 'Säädä puuttuvien palojen ja vastausvaihtoehtojen määrää HOJKS-tavoitteiden mukaisesti. Vähän vaihtoehtoja tukee heikompia oppilaita. Asteittain vaikeutuvat tehtävät.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy palapelipaketteja',
        description: 'Luo teemallisia puuttuvan palan kokoelmia myytäväksi verkossa. Visuaalisen hahmottamisen materiaalit ovat jatkuvasti kysyttyjä. Kaupallinen lisenssi kattaa rajattomat myynnit.',
      },
    ]
    
  },

  // FAQ Section - FULL FAQs from Finnish missing-pieces.md
  faq: {
    sectionTitle: 'Usein Kysyttyjä Kysymyksiä Tulostettavista Tehtävistä Lapsille ja Esiopetus Materiaali Ilmainen Generoinnista',
    sectionDescription: 'Tässä ovat vastaukset yleisimpiin kysymyksiin puuttuvan palan tehtävistä. Opettajat, vanhemmat ja kasvattajat kysyvät näitä kysymyksiä usein. Lue nämä vastaukset ennen tilaamista. Opi kuinka generaattori toimii.',
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
        question: 'Miten puuttuvan palan generaattori toimii?',
        answer: 'Generaattori poistaa valitun määrän paloja kuvasta ja luo vastausvaihtoehtoja. Oppilaat analysoivat puuttuvaa kohtaa ja valitsevat oikean palan vaihtoehdoista. Vastausavain luodaan automaattisesti.',
      },
      {
        id: '2',
        question: 'Kuinka monta palaa voi puuttua?',
        answer: 'Valitse 1–5 puuttuvaa palaa. Yksi pala on helpoin. Viisi palaa on haastavin. Säädä oppilaiden taitotason mukaan.',
      },
      {
        id: '3',
        question: 'Kuinka monta vastausvaihtoehtoa voi olla?',
        answer: 'Valitse 2–6 vaihtoehtoa per puuttuva pala. Kaksi vaihtoehtoa on helpoin. Kuusi vaihtoehtoa haastaa visuaalista erottelua eniten.',
      },
      {
        id: '4',
        question: 'Sisältävätkö tehtävät vastausavaimet?',
        answer: 'Kyllä, jokainen tehtävä generoi automaattisesti vastausavaimen. Oikea pala on korostettu selkeästi. Tulosta vastausavain erikseen.',
      },
      {
        id: '5',
        question: 'Mille ikäryhmille puuttuvan palan tehtävät sopivat?',
        answer: 'Puuttuvan palan tehtävät palvelevat 4–9-vuotiaita. Esikoululaiset ratkaisevat yhden palan tehtäviä kahdella vaihtoehdolla. 1.–2. luokan oppilaat ratkaisevat monimutkaisempia tehtäviä.',
      },
      {
        id: '6',
        question: 'Miten puuttuvan palan tehtävät kehittävät ajattelua?',
        answer: 'Tehtävät kehittävät visuaalista sulkeumaa, osa-kokonaisuus-hahmottamista ja visuaalista päättelyä. Oppilaat analysoivat puuttuvaa aluetta ja vertaavat sitä vaihtoehtoihin.',
      },
      {
        id: '7',
        question: 'Mitkä palamuodot ovat saatavilla?',
        answer: 'Kuusi palamuotoa: neliö, ympyrä, suorakulmio, pystysuora ja vaakasuora soikio sekä ellipsi. Eri muodot sopivat eri sisältöihin.',
      },
      {
        id: '8',
        question: 'Miten tulostan puuttuvan palan tehtävät?',
        answer: 'Lataa PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaasävyvaihtoehto säästää mustetta.',
      },
      {
        id: '9',
        question: 'Voiko omia kuvia käyttää?',
        answer: 'Kyllä, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Generaattori jakaa kuvan automaattisesti paloihin.',
      },
      {
        id: '10',
        question: 'Kuinka kauan yhden tehtävän luominen kestää?',
        answer: 'Yhden puuttuvan palan tehtävän luominen vie alle 3 minuuttia. Valitse kuva ja asetukset nopeasti. Generaattori luo palapelin välittömästi.',
      },
      {
        id: '11',
        question: 'Voinko myydä luomiani puuttuvan palan tehtäviä?',
        answer: 'Kyllä, tilauksesi sisältää kaupallisen lisenssin. Myy teemallisia palapelipaketteja opettajakauppoissa. Ei attribuutiovaatimuksia.',
      },
      {
        id: '12',
        question: 'Miten puuttuvan palan tehtävät tukevat POPS 2014 tavoitteita?',
        answer: 'Puuttuvan palan tehtävät tukevat visuaalisen hahmottamisen, avaruudellisen päättelyn ja ongelmanratkaisun kehittämistä. POPS 2014 korostaa ajattelun taitojen kehittämistä monipuolisilla työtavoilla.',
      },
    ]
    
  },

  // Pricing - Finnish Full Access terminology (€240/year or €25/month)
  pricing: {
    title: 'Täysi Käyttöoikeus',
    price: '240€',
    priceInterval: '/vuosi',
    priceSuffix: 'tai 25€/kk',
    benefits: [
      'Rajoittamaton työarkkien luonti',
      'Kaupallinen POD-lisenssi sisältyy',
      '11 kielen tuki',
      '3000+ teemaattista kuvaa',
      '300 DPI tulostuslaatu',
      'Vastausavaimet sisältyvät',
      'Kaikki 33 työkalua käytettävissä',
    ],
    ctaText: 'Aloita Luominen Nyt',
    bundleDescription: 'Tilauksesi sisältää pääsyn kaikkiin 33 työarkkigeneraattoriin:',
    bundleApps: [
      'Kuvalaskut', 'Aakkosjuna', 'Iso vai pieni', 'Kuvabingo',
      'Kaaviot laske ja väritä', 'Koodiyhteenlasku', 'Värityssivut', 'Kuvasanaristikko',
      'Kuvakryptogrammi', 'Piirtäminen ja värittäminen', 'Viivojen piirtäminen', 'Etsi ja laske',
      'Etsi esineet', 'Ruudukkoyhdistäminen', 'Yhdistämispeli', 'Matematiikkapulma',
      'Matematiikkamonisteet', 'Puuttuvat palaset', 'Enemmän vai vähemmän', 'Mikä ei kuulu joukkoon',
      'Kuviojuna', 'Kuviomonisteet', 'Kuvapolku', 'Kuvien lajittelu',
      'Prepositiot', 'Varjopari', 'Vähennyslasku', 'Lasten sudoku',
      'Aarteenmetsästys', 'Arvaa sana', 'Sanojen sekoitus', 'Sanaristikko', 'Kirjoitusharjoitukset',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Ilmaiset Työarkit Yhdistää - Työarkki Lapsille ja Ilmaiset Tulosteet',
    sectionDescription: 'Täysi Käyttöoikeus sisältää 33 ilmaista työkalua. Yhdistä puuttuvan palan tehtävät muihin generaattoreihin täydellisiin oppimispaketteihin. Luo viikon tehtäväpaketti kaikilla työkaluilla. Luo teemakohtaisia paketteja jotka yhdistävät useita taitoja.',
    ctaTitle: 'Valmiina Luomaan Upeita Työarkkeja?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia työarkkeja. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
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
        slug: 'ruudukko-sovitus-tyoarkit',
        name: 'Ruudukkosovitus',
        category: 'Hahmottaminen',
        icon: '🧩',
        description: 'Ruudukkosovitus laajentaa puuttuvan palan konseptia ruudukkopohjaisen palapeliin. Molemmat kehittävät visuaalista analysointia.',
      },
      {
        id: '2',
        slug: 'varjoyhdistely-tyoarkit',
        name: 'Varjoyhdistely',
        category: 'Hahmottaminen',
        icon: '👻',
        description: 'Varjoyhdistely kehittää muodon tunnistamista, joka tukee puuttuvan palan tehtävien ratkaisemista. Yhdistä molemmat hahmottamisharjoituksiin.',
      },
      {
        id: '3',
        slug: 'kuvapolku-tyoarkit',
        name: 'Kuvapolku',
        category: 'Hahmottaminen',
        icon: '🛤️',
        description: 'Kuvapolku kehittää visuaalista seurantaa. Yhdistä puuttuvan palan tehtävien kanssa visuaalisten taitojen monipuoliseen harjoitteluun.',
      },
      {
        id: '4',
        slug: 'etsi-esineet-tyoarkit',
        name: 'Etsi esineet',
        category: 'Tarkkaavaisuus',
        icon: '🔎',
        description: 'Etsintätehtävät kehittävät samaa visuaalista tarkkaavaisuutta. Molemmat vaativat tarkkaa kuvan analysointia.',
      },
      {
        id: '5',
        slug: 'kuvalajittelu-tyoarkit',
        name: 'Kuvalajittelu',
        category: 'Logiikka',
        icon: '📋',
        description: 'Kuvalajittelu kehittää luokittelutaitoja, jotka tukevat puuttuvan palan tunnistamista vaihtoehtojen joukosta.',
      },
      {
        id: '6',
        slug: 'poikkea-joukosta-tyoarkit',
        name: 'Poikkea joukosta',
        category: 'Logiikka',
        icon: '🧠',
        description: 'Poikkea joukosta kehittää visuaalista erottelua. Molemmat vaativat tarkkaa vertailua ja päättelyä.',
      },
    ]
    
  },

  // -- SEO & Content Enrichment (Part 176) ------------------------------------

  aiOverviewSnippet: 'Puuttuvat palat -generaattori on verkkotyokalu, jolla luodaan tulostettavia kuvapalapelit ehtavia esiopetukseen ja alakouluun. Generaattori poistaa paloja kuvasta ja luo vastausvaihtoehtoja. Oppilaat analysoivat puuttuvaa kohtaa ja valitsevat oikean palan. Opettajat saatavat puuttuvien palojen ja vastausvaihtoehtojen maaran, ja lataavat valmiin PDF-tehtavan alle 3 minuutissa.',

  comparisonTable: [
    {
      feature: 'Puuttuvat palat',
      ourApp: '1–5 palaa säädettävästi',
      typical: 'Yksi kiinteä määrä',
    },
    {
      feature: 'Vastausvaihtoehdot',
      ourApp: '2–6 vaihtoehtoa automaattisilla distrakttoreilla',
      typical: '2–3 vaihtoehtoa',
    },
    {
      feature: 'Palamuodot',
      ourApp: '6 muotoa: neliö, ympyrä, suorakulmio jne.',
      typical: 'Vain neliö',
    },
    {
      feature: 'Vastausavaimet',
      ourApp: 'Automaattinen vastausavain joka tehtävään',
      typical: 'Manuaalinen',
    },
    {
      feature: 'Kaupallinen lisenssi',
      ourApp: 'Sisältyy, myy vapaasti verkossa',
      typical: 'Lisämaksu',
    },
    {
      feature: 'Kielituki',
      ourApp: '11 kieltä mukaan lukien suomi',
      typical: 'Vain englanti',
    },
  ],

  researchBacking: [
    {
      claim: 'Puuttuvan palan tunnistaminen kehittää visuaalista sulkeumaa ja gestalt-hahmottamista, jotka ovat lukemisvalmiuden ja visuaalisen prosessoinnin perusedellytyksiä.',
      source: 'Ahonen, T. & Viholainen, H., "Visuaalisen hahmottamisen kehitys ja tukeminen," Niilo Mäki Instituutti',
    },
    {
      claim: 'Kuvapalapelitehtävät kehittävät osa-kokonaisuus-hahmottamista ja avaruudellista päättelyä, jotka tukevat matemaattisen ja tieteellisen ajattelun kehitystä varhaiskasvatusikäisillä.',
      source: 'Hannula, M. & Lehtinen, E., "Spatiaalisen päättelyn merkitys oppimisessa," Turun yliopisto',
    },
  ],

  teacherTestimonials: [
    {
      quote: 'Puuttuvat palat -tehtavat ovat loistava tapa kehittaa visuaalista hahmottamista. Oppilaani rakastavat etsia oikeaa palaa ja kehittavat samalla analyyttista ajattelua. Saadettava vaikeustaso on erinomainen eriyttamiseen.',
      name: 'Sanna Rinne',
      role: 'Esiopetuksen opettaja',
      school: 'Satakielen päiväkoti, Turku',
    },
    {
      quote: 'Kaytan puuttuvan palan tehtavia visuaalisen hahmottamisen arvioinnissa ja harjoittelussa. Tehtavat paljastavat oppilaiden vahvuudet ja kehityskohteet hahmottamisessa. Automaattiset vastausavaimet saastävät paljon aikaa.',
      name: 'Esa Kettunen',
      role: 'Erityisopettaja',
      school: 'Kainuun ammattiopisto, Kajaani',
    },
  ],

  tips: {
    sectionTitle: 'Puuttuvan palan strategiat luokka-asteittain',
    sectionDescription: 'Säädä puuttuvan palan generaattori sopivaan haasteeseen kullekin kehitysvaiheelle. Näin valitset puuttuvien palojen määrän, vastausvaihtoehtojen määrän ja vaikeustason esikoulusta kolmanteen luokkaan.',
    items: [
      {
        id: 'esikoulu',
        icon: '🌱',
        title: 'Esikoulu: Yksi pala kahdella vaihtoehdolla',
        description: 'Kaytta yhtaa puuttuvaa palaa ja kahtaa vastausvaihtoehtoa. Esikoululaiset harjoittelevat kuvan osan tunnistamista yksinkertaisella valinnalla. Tutut elain- ja ruokakuvat motivoivat oppimista.',
      },
      {
        id: 'esiopetus',
        icon: '🎒',
        title: 'Esiopetus: 1–2 palaa kolmella vaihtoehdolla',
        description: 'Luo tehtavia 1-2 puuttuvalla palalla ja kolmella vastausvaihtoehdolla. Esiopetuksen oppilaat kehittavat visuaalista analysointia ja vertailutaitoja. Tukee POPS 2014 hahmottamisen tavoitteita.',
      },
      {
        id: '1-luokka',
        icon: '📚',
        title: '1. luokka: 2–3 palaa neljällä vaihtoehdolla',
        description: 'Generoi tehtavia 2-3 puuttuvalla palalla ja neljalla vastausvaihtoehdolla. Ekaluokkalaiset kehittavat jarjestelmallista visuaalista analysointia ja paattelya useampien vaihtoehtojen joukosta.',
      },
      {
        id: '2-luokka',
        icon: '✏️',
        title: '2. luokka: 3–4 palaa viidellä vaihtoehdolla',
        description: 'Luo tehtavia 3-4 puuttuvalla palalla ja viidella vastausvaihtoehdolla. Toisluokkalaiset hioivat visuaalista erottelua ja analyyttista paattelya haastavammilla tehtavilla.',
      },
      {
        id: '3-luokka',
        icon: '🎯',
        title: '3. luokka: 4–5 palaa kuudella vaihtoehdolla',
        description: 'Kaytta 4-5 puuttuvaa palaa ja kuutta vastausvaihtoehtoa. Kolmasluokkalaiset ratkaisevat vaativia visuaalisia pulmia itsenaisesti. Tehtavat kehittavat systemaattista ajattelua ja tarkkaa visuaalista analysointia.',
      },
    ],
  },
};

export default missingPiecesFiContent;
