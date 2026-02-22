import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Chart Count Worksheets - Finnish Content (Kuvakaavio Työarkit)
 *
 * File: frontend/content/product-pages/fi/kuvakaavio-tyoarkit.ts
 * URL: /fi/apps/kuvakaavio-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/chart-count.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const chartCountFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'kuvakaavio-tyoarkit',
    appId: 'chart-count',
    title: 'Kuvakaavio Generaattori — Ilmainen | LessonCraftStudio',
    description: 'Luo tulostettavia kuvakaavio-tehtäviä laskemisen ja tiedon visualisoinnin harjoitteluun. Laske ja väritä kuviot esikoulusta 3. luokalle. Ilmainen.',
    keywords: 'kuvakaavio generaattori, tilastokuva lapsille, pylväsdiagrammi harjoitus, tiedon kerääminen tehtävä, graafinen esitys oppiminen, datan tulkinta lapset, tilastojen lukeminen harjoitus, kuvadiagrammi työarkki, taulukkolaskenta esikoulu, visuaalinen data-analyysi, matemaattinen tilastoajattelu, kuvakaavio tehtävät, laske ja väritä',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/kuvakaavio-tyoarkit',
  },

  // Hero Section - FULL text from Finnish chart-count.md
  hero: {
    title: 'Kuvakaavio — Laske ja Väritä Generaattori',
    subtitle: 'Tiedon Visualisointi ja Laskemisharjoituksia Lapsille',
    description: `Luo ammattimaisia kuvakaaviotehtäviä laskemisen ja tietojen visualisoinnin harjoitteluun. Täysi Käyttöoikeus -tilaus antaa rajattoman pääsyn kaikkiin 33 tehtävämonisteen luontityökaluun. Generoi tulostettavat matematiikan tehtävämonisteet, jotka sopivat täydellisesti esiopetukseen ja alakoulun ala-asteelle. Lataa korkealaatuiset PDF-tehtävät alle kolmessa minuutissa.

Kuvakaaviot opettavat lapsille tärkeitä datataidonedustuksen periaatteita. Oppilaat laskevat kuvia ja värittävät ruutuja luodakseen pylväsdiagrammin. Tämä kehittää sekä laskutaitoja että graafisen esitystavan ymmärtämistä. Tehtävät ovat ihanteellisia esikoulusta kolmanteen luokkaan.

Tulostettavat tehtävät lapsille sisältävät kaksi osaa. Ensimmäinen osa näyttää 20 kuvaa satunnaisessa järjestyksessä. Toinen osa sisältää tyhjän kaavion, johon lapset värittävät laskemansa määrät. Vastausavain näyttää oikean ratkaisun opettajille ja vanhemmille. Jokainen tehtävä on ainutlaatuinen ja muokattavissa.`,
    previewImageSrc: '/samples/finnish/chart count/sample-1.jpeg',
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
        videoId: 'CDgIihDQX6U',
        buttonText: 'Kuvakaavio Toiminnot',
        modalTitle: 'Kuvakaavio Opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/chart count/
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

  // Features Grid - FULL text from Finnish chart-count.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Kuvakaavion generaattorimme tarjoaa kaikki työkalut, joita tarvitset ammattimaisten matematiikan tehtävien luomiseen. Täysi Käyttöoikeus -tilaus antaa pääsyn kaikkiin ominaisuuksiin ilman lisämaksuja. Luo tulostettavat matematiikka tehtävät alakoulu -oppilaille kolmessa minuutissa. Jokainen tehtävä on muokattavissa ja personoitavissa oppilaittesi tarpeisiin. Työkalumme sopii esiopetuksesta alakoulun kolmanteen luokkaan.',
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
        title: 'Kuvakaaviot laske ja väritä -muodossa',
        description: 'Generaattori luo tehtäviä, joissa 20 kuvaa näytetään satunnaisessa järjestyksessä. Oppilaat laskevat kunkin kuvatyypin määrän ja värittävät vastaavan määrän ruutuja kaavioon. Tämä kehittää sekä laskutaitoja että tiedon visualisointia.',
      },
      {
        id: '2',
        icon: '🔢',
        title: 'Säädettävä kuvamäärä ja kategoriat',
        description: 'Valitse 3–6 eri kuvatyyppiä kaavioon ja säädä kunkin kategorian lukumäärää. 20 kuvan ruudukko tarjoaa riittävästi dataa merkityksellisten kaavioiden luomiseen. Vaikeustaso mukautuu kuvatyyppien määrällä.',
      },
      {
        id: '3',
        icon: '🖼️',
        title: 'Yli 3000 teemakuvaa datavisualisointiin',
        description: 'Selaa yli 3000 lapsiystavallista kuvaa kaaviotehtavien luomiseen. Teemapohjaiset kuvat luovat johdonmukaisia datavisualisointeja. Elain-, ruoka- ja kulkuneuvoteemat tekevat tilastoharjoittelusta kiinnostavaa.',
      },
      {
        id: '4',
        icon: '✅',
        title: 'Automaattiset vastausavaimet',
        description: 'Jokainen kaaviotehtävä generoi automaattisesti vastausavaimen, jossa oikeat lukumäärät ja väritetyt ruudut näkyvät selkeästi. Opettajat tarkistavat oppilastöiden ratkaisut nopeasti. Vastausavain tulostuu erilliselle sivulle.',
      },
      {
        id: '5',
        icon: '🎨',
        title: 'Täysin muokattavat tehtävät',
        description: 'Muokkaa jokaista elementtiä luomisen jälkeen. Siirrä, skaalaa ja kierrä kuvia vapaasti. Lisää omaa tekstiä, taustavärejä ja koristeellisia kehyksiä. Luo ammattitasoisia kaaviotehtäviä nopeasti.',
      },
      {
        id: '6',
        icon: '📤',
        title: 'Omien kuvien lataus',
        description: 'Lataa rajattomasti omia kuvia luodaksesi personoituja kaaviotehtäviä. Käytä luokkahuoneen teemoihin sopivia kuvia. Yhdistä omia kuvia 3000+ kuvakirjaston kanssa samassa tehtävässä.',
      },
      {
        id: '7',
        icon: '💼',
        title: 'Kaupallinen lisenssi myyntiin',
        description: 'Tilauksesi sisältää kaupalliset oikeudet myydä kaaviotehtäviä verkossa. Luo datataitojen harjoituspaketteja myytäväksi. Ei attribuutiovaatimuksia eikä ylimääräisiä lisenssimaksuja.',
      },
      {
        id: '8',
        icon: '🌍',
        title: '11 kielen tuki',
        description: 'Luo kaaviotehtäviä 11 kielellä mukaan lukien suomi. Käyttöliittymä ja ohjeet kääntyvät valitulle kielelle. Tiedonkäsittely on universaali matemaattinen taito kielirajoista riippumatta.',
      },
    ]
    
  },

  // How-To Guide - FULL text from Finnish chart-count.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Kuvakaavion luominen vie alle kolme minuuttia. Nämä viisi vaihetta opettavat sinulle koko prosessin. Ei aiempaa kokemusta tarvita. Ei suunnittelutaitoja vaadita. Seuraa näitä ohjeita luodaksesi ammattimaisia tehtäviä. Esiopetus materiaali ilmainen -tilaus antaa sinulle pääsyn kaikkiin työkaluihin.',
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
        title: 'Valitse Kuusi Kuvaa Kuvakaavioon - Tulostettavat Tehtävät Lapsille Ilmainen Matematiikka',
        description: `Ensimmäinen askel on valita kuusi kuvaa tehtävääsi varten. Sinulla on kolme vaihtoehtoa. Valitse teema automaattiseen valintaan. Valitse kuvat manuaalisesti kirjastosta. Tai lataa omia kuvia tietokoneeltasi. Kaikki vaihtoehdot tuottavat ammattilaatuisia tuloksia.

Teemavalinnan käyttö on nopein tapa. Klikkaa "Tehtävän kuvien lähde" -pudotusvalikko. Näet yli 50 eri teemaa. Eläimet, ajoneuvot, ruoka, urheilu, luonto ja paljon muuta. Valitse teema joka sopii oppituntisi aiheeseen. Generaattori valitsee automaattisesti kuusi satunnaista kuvaa kyseisestä teemasta.

Manuaalinen valinta antaa sinulle täyden hallinnan. Valitse "Manuaalinen valinta alla" pudotusvalikosta. Selaa kuvakirjastoa teemoittain. Tai käytä hakutyökalua löytääksesi tiettyjä kuvia. Kirjoita "kissa" nähdäksesi kaikki kissakuvat. Klikkaa kuvaa lisätäksesi sen valintaasi. Valitse tarkalleen kuusi kuvaa ennen jatkamista.

Kuuden kuvan valinta on pakollista. Generaattori varoittaa jos valitset vähemmän tai enemmän. Kuusi kategoriaa luo täydellisen tasapainon kaaviolle. Liian vähän kategorioita tekee tehtävästä liian helpon. Liian monta kategoriaa hämmentää nuoria oppilaita. Kuusi on ihanteellinen määrä esikoulusta kolmanteen luokkaan.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Sivuasetukset - Esiopetus Materiaali Ilmainen Personointiin',
        description: `Toinen vaihe on asetusten säätäminen tarpeidesi mukaan. Valitse sivun koko pudotusvalikosta. Letter portrait on oletusarvo amerikkalaisille tulostimille. A4 portrait on eurooppalaisten tulostimien standardi. Voit valita myös vaakasuuntaisen asettelun tai neliön muodon. Jopa mukautetut mitat ovat mahdollisia.

Sivun väri vaikuttaa tehtävän ilmeeseen. Oletusarvo on valkoinen säästääksesi mustetta. Valitse kermanväri silmille helpompaan lukemiseen. Tai valitse vaalean sininen tai vihreä rauhoittavaan vaikutukseen. Värinvalitsin antaa rajattomat vaihtoehdot. Pidä väri vaaleana tekstin luettavuuden säilyttämiseksi.

"Sisällytä nimi/päivämäärä -kentät" -valintaruutu lisää tilat oppilaan nimelle ja päivämäärälle. Tämä auttaa tehtävien organisoinnissa. Oppilaat harjoittelevat myös nimensä kirjoittamista. Kentät näkyvät tehtävän alareunassa. Ne eivät vie liikaa tilaa pääsisällöltä.

Taustateema lisää visuaalista kiinnostavuutta. Valitse teema pudotusvalikosta. Dinosaurukset, avaruus, meri, vuodenajat ja paljon muuta. Säädä läpinäkyvyyttä liukusäätimellä. Tasapainota visuaalinen kiinnostavuus ja luettavuus.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi Kuvakaavio - Matematiikka Tehtävät Alakoulu Hetkessä',
        description: `Kolmas vaihe on tehtävän generoiminen. Klikkaa "Luo" -pudotusvalikkoa yläreunan työkalurivillä. Valitse "Uusi tehtävä" valikosta. Generaattori luo välittömästi ainutlaatuisen kuvakaavion. Koko prosessi kestää alle sekunnin. Tehtäväsi näkyy pohjalla muokattavaksi.

Generoitu tehtävä sisältää kaksi pääkomponenttia. Ensimmäinen on kuvien ruudukko 20 kuvalla. Toinen on tyhjä kaavio jossa on kuusi saraketta ja viisi riviä. Kunkin sarakkeen alapuolella näkyy yksi kuudesta valitsemastasi kuvasta. Vasen puoli näyttää numerot 1-5 laskemista varten.

Kuvien jakauma on satunnainen mutta tasapainoinen. Jokainen kuvatyyppi esiintyy 1-5 kertaa. Tämä varmistaa että kaikilla kuudella kategorialla on edustus. Ei kahta identtistä tehtävää koskaan. Jokainen generointi luo ainutlaatuisen laskuharjoituksen.

Jos et pidä tuloksesta, generoi uudelleen. Klikkaa "Luo" > "Uusi tehtävä" uudelleen. Saat täysin uuden satunnaisen jakauman. Kokeile useita kertoja löytääksesi täydellisen tehtävän. Rajattomat generointikerrat sisältyvät Täysi Käyttöoikeus -tilaukseesi.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Pohjalla - Tulostettavat Tehtävät Lapsille Ilmainen Personointiin',
        description: `Neljäs vaihe on tehtävän personointi. Kaikki pohjalla on muokattavissa. Klikkaa mitä tahansa elementtiä valitaksesi sen. Vihreät nurkkapisteet näkyvät valitussa objektissa. Vedä siirtääksesi elementtejä. Käännä tai skaalaa nurkista vetämällä.

Lisää omaa tekstiä ohjeisiin tai kysymyksiin. Klikkaa "Lisää teksti" -painiketta sivupalkissa. Kirjoita tekstisi ja klikkaa "Lisää teksti". Uusi tekstikenttä ilmestyy pohjalle. Vedä se haluamaasi paikkaan. Muuta fonttia, kokoa ja väriä sivupalkin työkaluilla.

Muokkaa olemassa olevaa tekstiä kuten otsikkoa. Tuplaklikaa tekstiä muokataksesi sisältöä. Vaihda "Kuvakaavio" tekstiksi "Laskemiskaavio" tai "Pylväsdiagrammi". Mukauta ohjeet luokkatasi kielelle. Lisää oppilaiden nimiä tai luokan nimeä. Personointi tekee tehtävistä merkityksellisempiä.

Lukitse elementtejä estääksesi tahattomat muutokset. Valitse otsikko tai kaavio. Klikkaa lukkokuvaketta yläpalkissa. Lukitut elementit eivät liiku tai muutu. Tämä suojaa tärkeät osat muokkauksen aikana. Avaa lukitus milloin tahansa klikkaamalla uudelleen.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta - Matematiikka Tehtävät Alakoulu PDF-muodossa',
        description: `Viides ja viimeinen vaihe on tehtävän lataaminen. Klikkaa "Lataa" -pudotusvalikkoa yläpalkissa. Näet neljä vaihtoehtoa: Tehtävä JPEG, Vastausavain JPEG, Tehtävä PDF, Vastausavain PDF. Valitse haluamasi muodon ja version. Kaikki lataukset ovat 300 DPI ammattilaatua.

Vastausavain generoidaan automaattisesti. Se näyttää täsmälleen miten kaavio tulisi värittää. Kunkin kuvatyypin määrä lasketaan. Vastaava määrä ruutuja väritetään keltaisiksi kaaviossa. Opettajat säästävät aikaa tarkistuksessa. Oppilaat voivat itsearvioida työnsä.

PDF-muoto on paras tulostuslaatua varten. PDF säilyttää täydellisen tarkkuuden. Värit pysyvät kirkkaina. Tekstin reunat pysyvät terävinä. Ammattitulostamot suosittelevat PDF:ää. Myös kaupallinen myynti vaatii PDF:n.

Harmaasävyvaihtoehto säästää mustetta. Rastita "Harmaasävy" -valintaruutu ennen lataamista. Kaikki värit muunnetaan harmaasävyiksi. Tämä on ihanteellista luokkahuonekopioille. Säästät jopa 60 prosenttia musteesta. Laatu pysyy erinomaisena mustavalkoisena.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish chart-count.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Kuvakaavion generaattori palvelee monia eri käyttäjäryhmiä. Esiopetuksen opettajat, alakoulun opettajat, kotiopettajat ja erityisopettajat hyötyvät työkalusta. Jokainen ryhmä käyttää generaattoria eri tavoin. Kaikki löytävät arvokkaita sovelluksia omaan opetukseensa. Tulostettavat tehtävät lapsille ilmainen -työkalu mukautuu kaikkiin tarpeisiin.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '🌱',
        title: 'Esiopetuksen opettajat',
        subtitle: 'Laskeminen ja kaaviot 5–6-vuotiaille',
        description: 'Luo yksinkertaisia kaaviotehtäviä kolmella kuvatyypillä esiopetuksen laskuharjoitteluun. Oppilaat laskevat kuvia ja värittävät ruutuja kaavion luomiseksi. Täydellinen POPS 2014 matemaattisen tiedonkäsittelyn tavoitteiden tukemiseen.',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun opettajat',
        subtitle: 'Tiedonkäsittely ja tilastot 1.–3. luokalle',
        description: 'Generoi kaaviotehtäviä 4–6 kuvatyypillä tiedonkäsittelyn harjoitteluun. Oppilaat laskevat, vertaavat lukumääriä ja tulkitsevat kaavioita. Tehtävät integroivat matematiikkaa ja ympäristöoppia.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat ja vanhemmat',
        subtitle: 'Hauskaa laskemista ja graafista esitystä',
        description: 'Luo kiinnostavia kaaviotehtäviä lasten suosikkiteemoilla. Lapset nauttivat kuvien laskemisesta ja kaavioiden värittämisestä. Tehtävät yhdistävät laskemisen ja luovan ilmaisun luonnollisesti.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'S2-opettajat',
        subtitle: 'Visuaalinen dataharjoittelu ilman kielitaitoa',
        description: 'Kaaviotehtävät eivät vaadi lukutaitoa. Kuvien laskeminen ja ruutujen värittäminen ovat kieliriippumattomia. Opettaja voi lisätä matemaattista sanastoa kahdella kielellä samaan tehtävään.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Säädettävät tiedonkäsittelyn harjoitukset',
        description: 'Säädä kuvatyyppien määrää HOJKS-tavoitteiden mukaisesti. Kolme kuvatyyppiä tukee heikompia laskijoita. Värittäminen tarjoaa visuaalisen palautteen oikeasta vastauksesta.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy datataitojen harjoituspaketteja',
        description: 'Luo teemallisia kaaviotehtäväpaketteja myyntiin verkossa. Tiedonkäsittelyn materiaalit ovat kasvava kategoria opettajakauppoissa. Kaupallinen lisenssi kattaa rajattomat myynnit.',
      },
    ]
    
  },

  // FAQ Section - Selected FAQs from Finnish chart-count.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'Opettajat kysyvät samoja kysymyksiä kuvakaaviogeneraattorista. Tässä ovat vastaukset 12 yleisimpään kysymykseen. Nämä vastaukset auttavat sinua ymmärtämään työkalun täydellisesti. Täysi Käyttöoikeus -tilaus antaa kaiken tarvitsemasi. Ei piilomaksuja, ei yllätyksiä.',
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
        question: 'Miten kaaviogeneraattori toimii?',
        answer: 'Generaattori luo tehtävän, jossa 20 kuvaa näytetään satunnaisessa järjestyksessä ja tyhjä kaavio odottaa täyttämistä. Oppilaat laskevat kunkin kuvatyypin määrän ja värittävät vastaavan määrän ruutuja kaavioon. Vastausavain generoidaan automaattisesti.',
      },
      {
        id: '2',
        question: 'Kuinka monta kuvatyyppiä voi olla yhdessä tehtävässä?',
        answer: 'Valitse 3–6 eri kuvatyyppiä kaavioon. Vähemmän kuvatyyppejä sopii nuoremmille oppilaille. Kuusi kuvatyyppiä haastaa vanhempia oppilaita vaatimalla tarkkaa laskemista useammasta kategoriasta.',
      },
      {
        id: '3',
        question: 'Mille ikäryhmille kaaviotehtävät sopivat?',
        answer: 'Kaaviotehtävät palvelevat 5–10-vuotiaita. Esiopetuksen oppilaat laskevat 3 kuvatyyppiä ja värittävät yksinkertaisen kaavion. 1.–2. luokan oppilaat hallitsevat 4–5 kuvatyyppiä. 3. luokan oppilaat tulkitsevat 6 kategorian kaavioita.',
      },
      {
        id: '4',
        question: 'Sisältävätkö tehtävät vastausavaimet?',
        answer: 'Kyllä, jokainen kaaviotehtävä generoi automaattisesti vastausavaimen. Vastausavain näyttää oikeat lukumäärät ja väritetyt ruudut jokaiselle kuvatyypille. Opettajat tarkistavat oppilastöiden ratkaisut sekunneissa.',
      },
      {
        id: '5',
        question: 'Miten kaaviotehtävät opettavat tiedonkäsittelyä?',
        answer: 'Oppilaat keräävät dataa (laskevat kuvia), organisoivat sitä (värittävät kaavion) ja tulkitsevat tuloksia. Tämä prosessi opettaa tiedonkäsittelyn perusperiaatteet käytännössä POPS 2014 tavoitteiden mukaisesti.',
      },
      {
        id: '6',
        question: 'Voiko omia kuvia käyttää kaaviotehtävissä?',
        answer: 'Kyllä, lataa rajattomasti omia kuvia luodaksesi personoituja kaaviotehtäviä. Käytä luokan teemoihin sopivia kuvia. Yhdistä omia kuvia kirjaston kuvien kanssa samassa tehtävässä.',
      },
      {
        id: '7',
        question: 'Miten tulostan kaaviotehtävät?',
        answer: 'Lataa tehtäväsi PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko. Harmaasävyvaihtoehto säästää värimustetta. Kaikki tehtävät tulostuvat ammattimaisesti.',
      },
      {
        id: '8',
        question: 'Kuinka kauan yhden kaaviotehtävän luominen kestää?',
        answer: 'Yhden kaaviotehtävän luominen vie alle 3 minuuttia. Valitse teema ja kuvat 30 sekunnissa. Generaattori luo tehtävän välittömästi. Useimmat opettajat luovat viikon tiedonkäsittelyharjoitukset 15 minuutissa.',
      },
      {
        id: '9',
        question: 'Sopivatko kaaviotehtävät ympäristöopin opetukseen?',
        answer: 'Kaaviotehtävät sopivat erinomaisesti ympäristöopin tiedonkeräämisharjoituksiin. Oppilaat laskevat luontokuvia ja luovat kaavioita havainnoistaan. Tehtävät integroivat matematiikkaa ja ympäristöoppia luonnollisesti.',
      },
      {
        id: '10',
        question: 'Voinko myydä luomiani kaaviotehtäviä?',
        answer: 'Kyllä, tilauksesi sisältää kaupallisen lisenssin. Myy tiedonkäsittelyn paketteja verkossa ilman attribuutiovaatimuksia. Luo kaaviotehtäväkokoelmia digitaalisina latauksina.',
      },
      {
        id: '11',
        question: 'Mikä on 20 kuvan ruudukon tarkoitus?',
        answer: '20 kuvan ruudukko tarjoaa riittävästi dataa merkityksellisten kaavioiden luomiseen. Kuvatyyppien eri määrät luovat kiinnostavia vertailuja. Oppilaat harjoittelevat systemaattista laskemista ja datan organisointia.',
      },
      {
        id: '12',
        question: 'Miten kaaviotehtävät tukevat POPS 2014 tavoitteita?',
        answer: 'Kaaviotehtävät tukevat POPS 2014 matematiikan tiedonkäsittelyn tavoitteita. Oppilaat harjoittelevat datan keräämistä, organisointia ja tulkintaa kuvakaavioiden avulla. Tehtävät valmistavat tilastollisen ajattelun perusteita.',
      },
    ]
    
  },

  // Pricing - Finnish Full Access terminology
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä kuvakaaviotehtävät näihin täydentäviin generaattoreihin.',
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
        slug: 'etsi-ja-laske-tyoarkit',
        name: 'Etsi ja laske',
        category: 'Matematiikka',
        icon: '🔢',
        description: 'Etsi ja laske -tehtävät täydentävät kaaviotehtäviä visuaalisen etsinnän ja laskemisen harjoittelussa. Molemmat kehittävät systemaattista laskemista.',
      },
      {
        id: '2',
        slug: 'yhteenlasku-tyoarkit',
        name: 'Yhteenlasku',
        category: 'Matematiikka',
        icon: '➕',
        description: 'Yhteenlaskutehtävät jatkavat matemaattista oppimista kaaviotehtävien jälkeen. Oppilaat soveltavat laskutaitoja numeerisiin tehtäviin.',
      },
      {
        id: '3',
        slug: 'enemman-vahemman-tyoarkit',
        name: 'Enemmän-vähemmän',
        category: 'Matematiikka',
        icon: '⚖️',
        description: 'Enemmän-vähemmän -tehtävät laajentavat kaavioiden vertailua lukumäärävertailuiksi. Oppilaat vertaavat dataa eri muodoissa.',
      },
      {
        id: '4',
        slug: 'iso-pieni-tyoarkit',
        name: 'Iso-pieni',
        category: 'Matematiikka',
        icon: '📏',
        description: 'Kokovertailutehtävät täydentävät kaavioiden vertailua visuaalisella kokovertailulla. Molemmat kehittävät vertailutaitoja eri konteksteissa.',
      },
      {
        id: '5',
        slug: 'varityskuvat-tyoarkit',
        name: 'Värityskuvat',
        category: 'Taide ja luovuus',
        icon: '🎨',
        description: 'Värityskuvat tarjoavat luovan jatkon kaaviotehtävien värittämisen jälkeen. Yhdistä matemaattinen tiedonkäsittely ja taidekasvatus.',
      },
      {
        id: '6',
        slug: 'matematiikkapulmat-tyoarkit',
        name: 'Matematiikkapulmat',
        category: 'Logiikka',
        icon: '🧩',
        description: 'Matematiikkapulmat haastavat oppilaita soveltamaan laskutaitoja ongelmanratkaisukonteksteissa. Molemmat kehittävät matemaattista ajattelua.',
      },
    ]
    
  },

  // -- SEO & Content Enrichment (Part 175) ------------------------------------

  aiOverviewSnippet: 'Kuvakaavio-generaattori on verkkotyokalu, jolla luodaan tulostettavia laske ja varita -kaaviotehtavia. Oppilaat laskevat kuvia 20 kuvan ruudukosta ja varittavat vastaavan maaran ruutuja kaavioon. Opettajat valitsevat teeman ja kuvatyypit, ja lataavat valmiin PDF-tehtavan alle 3 minuutissa.',

  comparisonTable: [
    {
      feature: 'Tehtävämuoto',
      ourApp: 'Laske ja väritä -kaavio 20 kuvalla',
      typical: 'Vain tyhjat kaaviot ilman kuvia',
    },
    {
      feature: 'Kuvatyypit',
      ourApp: '3–6 kategoriaa 3000+ teemakuvasta',
      typical: 'Yksinkertaiset symbolit',
    },
    {
      feature: 'Vastausavaimet',
      ourApp: 'Automaattinen vastausavain joka tehtävään',
      typical: 'Usein lisämaksullinen',
    },
    {
      feature: 'Muokattavuus',
      ourApp: 'Täysi muokkaus: siirto, skaalaus, kierto, teksti',
      typical: 'Kiinteat pohjat',
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
      claim: 'Kuvakaaviot ovat tehokas tyokalu varhaisen tiedonkasittelytaidon kehittamiseen. Laske ja varita -muoto yhdistaa datan keraamisen ja visualisoinnin yhteen tehtavaan, tukien POPS 2014 tiedonkasittelyn tavoitteita.',
      source: 'Laine, A. et al., "Tiedonkasittely alkuopetuksen matematiikassa," Helsingin yliopisto',
    },
    {
      claim: 'Konkreettiset kuvapohjaiset datavisualisoinnit tuottavat paremman ymmaarryksen graafisista esityksista kuin abstraktit tilastoharjoitukset, erityisesti 5-8-vuotiailla oppijoilla.',
      source: 'Hannula, M. S., "Matemaattisten kasitteiden kehittyminen," Turun yliopisto',
    },
  ],

  teacherTestimonials: [
    {
      quote: 'Kuvakaaviot ovat loistava tapa opettaa tiedonkasittelya esiopetuksessa. Lapseni rakastavat laskea elainkuvia ja vaariittaa ruutuja kaavioon. He oppivat dataajattelua huomaamattaan leikkien kautta.',
      name: 'Laura Jarvinen',
      role: 'Esiopetuksen opettaja',
      school: 'Revontulen paivakoti, Rovaniemi',
    },
    {
      quote: 'Kaytan kaaviotehtavia ymparistopin oppitunneilla. Oppilaat keraavat dataa luontokuvista ja luovat kaavioita havainnoistaan. Tehtavat integroivat matematiikan ja ymparistopin taaydellisesti.',
      name: 'Juha Mikkola',
      role: '2. luokan opettaja',
      school: 'Linnanmaan koulu, Oulu',
    },
  ],

  tips: {
    sectionTitle: 'Kuvakaaviostrategiat luokka-asteittain',
    sectionDescription: 'Säädä kaaviogeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. Näin valitset kuvatyyppien määrän ja tiedonkäsittelyn syvyyden esikoulusta kolmanteen luokkaan.',
    items: [
      {
        id: 'esikoulu',
        icon: '🌱',
        title: 'Esikoulu: Laske ja väritä kolmella kuvalla',
        description: 'Kaytta kolmea kuvatyyppia yksinkertaisella teemalla kuten elaimet. Esikoululaiset laskevat kuvia ja varittavat ruutuja ohjatusti. Keskity laskemisen tarkkuuteen ja yksi-yhteen-vastaavuuteen.',
      },
      {
        id: 'esiopetus',
        icon: '🎒',
        title: 'Esiopetus: Neljän kuvatyypin kaaviot',
        description: 'Luo kaavioita neljalla kuvatyypilla. Esiopetuksen oppilaat harjoittelevat itsenaaista laskemista ja kaavion tayttamista. Vertaa kategorioiden lukumaaria: mika on yleisin, mika harvinaisin.',
      },
      {
        id: '1-luokka',
        icon: '📚',
        title: '1. luokka: Viiden kategorian tiedonkäsittely',
        description: 'Generoi kaavioita viidella kuvatyypilla. Ekaluokkalaiset kehittavat jarjestelmallista laskemista ja kaavion tulkintaa. Harjoittele vertailukysymyksia: kuinka paljon enemmaan, vahiten, yhteensa.',
      },
      {
        id: '2-luokka',
        icon: '✏️',
        title: '2. luokka: Kuuden kategorian datavertailu',
        description: 'Luo kaavioita kuudella kuvatyypilla tiedonkasittelyn syventamiseen. Toisluokkalaiset vertaavat kategorioita ja vastaavat monimutkaisiin kysymyksiin. Yhdista ymparistopin datankeraamiseen.',
      },
      {
        id: '3-luokka',
        icon: '🎯',
        title: '3. luokka: Soveltavat tiedonkäsittelytehtävät',
        description: 'Kaytta kuutta kuvatyyppia ja lisaa tulkintakysymyksia. Kolmasluokkalaiset harjoittelevat datan analysointia ja johtopaatosten tekemista kaavioiden pohjalta POPS 2014 tiedonkasittelyn tavoitteiden mukaisesti.',
      },
    ],
  },
};

export default chartCountFiContent;
