import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Search Worksheets - Finnish Content
 *
 * File: frontend/content/product-pages/fi/word-search-worksheets.ts
 * URL: /fi/apps/sananhaku-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/wordsearch.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordSearchFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'sananhaku-tyoarkit',
    appId: 'word-search',
    title: 'Ilmainen Sanapeli Generaattori | Tulostettavat Tehtävät Lapsille Esiopetus ja Alakoulu',
    description: 'Luo ammattimaisia sanapelitehtäviä ilmaiseksi verkossa. Sanapeli generaattori on täydellinen esiopetuksen ja alakoulun opettajille. Tulostettavat tehtävät lapsille ilmainen versio sisältää vesileiman. Generoi mukautettuja sanapelitehtäviä alle 3 minuutissa.',
    keywords: 'sanapeli generaattori, tulostettavat tehtävät lapsille ilmainen, esiopetus materiaali ilmainen, matematiikka tehtävät alakoulu, kirjaimet harjoittelu esikoulu, kertotaulut tulostettava, värityskuvia lapsille tulostettava',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/sananhaku-tyoarkit',
  },

  // Hero Section - FULL text from Finnish wordsearch.md paragraphs 1-4
  hero: {
    title: 'Ilmainen Sanapeli Generaattori',
    subtitle: 'Tulostettavat Tehtävät Esiopetus ja Alakoulu',
    description: `Luo ammattimaisia sanapelitehtäviä ilmaiseksi verkossa. Sanapeli generaattori on täydellinen esiopetuksen ja alakoulun opettajille. Tulostettavat tehtävät lapsille ilmainen versio sisältää vesileiman. Generoi mukautettuja sanapelitehtäviä alle 3 minuutissa.

Valitse teema tai yksittäiset kuvat yli 3000 kuvan kirjastosta. Sanapeli generaattori luo automaattisesti sanastoristikon. Lataa tulostettavat tehtävät PDF- tai JPEG-muodossa. Täydellinen esiopetus materiaali ilmainen työväline opettajille.

Sanapelitehtävät sopivat esikoululaisille ja alakoululaisille. Tue lukemaan oppiminen tehtävät ja kirjaimet harjoittelu esikoulu tavoitteita. Käytä matematiikka tehtävät alakoulu sanastoa tai värityskuvia lapsille tulostettava nimiä. Kaikki tehtävät tulostuvat korkealla 300 DPI laadulla.

Ilmainen perusversio sisältää vesileiman henkilökohtaiseen käyttöön. Peruspaketti tai Täysi Pääsy tilaus poistaa vesileiman. Tilaus sisältää kaupallisen lisenssin ja kaikki premium-ominaisuudet. Luo rajoittamattomasti tulostettavat tehtävät lapsille ilmainen tilauksen kanssa.`,
    previewImageSrc: '/samples/english/wordsearch/wordsearch portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/wordsearch/
  samples: {
    sectionTitle: 'Sanapeli Työarkit Esimerkit',
    sectionDescription: 'Lataa ilmaiset esimerkkityöarkit nähdäksesi ammattimaisen laatumme',
    downloadLabel: 'Lataa Ilmainen Esimerkki',
    worksheetLabel: 'Työarkki',
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
        worksheetSrc: '/samples/english/wordsearch/wordsearch portrait.jpeg',
        answerKeySrc: '/samples/english/wordsearch/wordsearch portrait answer_key.jpeg',
        altText: 'Sanapeli pystysuunnassa teemaattisilla kuvilla esiopetuksen sanaston harjoitteluun',
        pdfDownloadUrl: '/samples/english/wordsearch/wordsearch portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/wordsearch/wordsearch landscape.jpeg',
        answerKeySrc: '/samples/english/wordsearch/wordsearch landscape answer_key.jpeg',
        altText: 'Sanapeli vaakasuunnassa värikkäillä kuvavinkeillä alakoululaisille',
        pdfDownloadUrl: '/samples/english/wordsearch/wordsearch landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/wordsearch/custom word list.jpeg',
        answerKeySrc: '/samples/english/wordsearch/custom word list answer_key.jpeg',
        altText: 'Mukautettu sanalista sanapeli oikeinkirjoituksen ja sanaston harjoitteluun',
        pdfDownloadUrl: '/samples/english/wordsearch/custom word list.pdf',
      },
    ],
  },

  // Features Grid - FULL text from Finnish wordsearch.md feature sections
  features: {
    sectionTitle: 'Sanapeli Generaattorin Ominaisuudet - Tulostettavat Tehtävät Lapsille Ilmainen Työkalu',
    sectionDescription: 'Sanapeli generaattori tarjoaa kaikki työkalut ammattimaisten tehtävien luomiseen. Luo tulostettavat tehtävät lapsille ilmainen tai premium-tilauksella. Kaikki ominaisuudet suunniteltu opettajien tarpeisiin. Helppokäyttöinen käyttöliittymä nopeuttaa tehtävien luomista.',
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
        title: 'Luo Sanapelitehtäviä 3 Klikkauksella',
        description: `Valitse teema tai kuvat yli 3000 kuvan kirjastosta. Generaattori luo automaattisesti sanapelin valituista kuvista. Kuvien nimet muodostavat sanastoristi sanat. Koko prosessi kestää alle 3 minuuttia.

Valitse matematiikka tehtävät alakoulu teema tai kirjaimet harjoittelu esikoulu kuvat. Voit myös valita värityskuvia lapsille tulostettava tai kertotaulut tulostettava sanastoon. Generaattori tukee kaikkia aiheita. Tulostettavat tehtävät lapsille ilmainen työväline on nopea käyttää.

Jokainen teema sisältää 8 kuvaa automaattista valintaa varten. Voit myös valita kuvat yksitellen selaamalla kirjastoa. Esiopetus materiaali ilmainen versio sisältää samat teemavalinnot. Kaikki tehtävät sopivat esikoulu ja alakoulu oppilaille.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Muokkaa Kaikkea Pohjalla',
        description: `Jokainen elementti tehtävällä on täysin muokattavissa. Raahaa, kierrä ja skaalaa mitä tahansa. Siirrä sanastoristikkoa tai muuta sen kokoa. Lisää tekstielementtejä mistä tahansa kohtaa.

Muuta taustavärit tai valitse taustateema yli 100 vaihtoehdosta. Lisää reunateema tehtävän ympärille. Kaikki muokkaustyökalut toimivat intuitiivisesti. Ei tarvitse suunnitteluosaamista.

Muokkaa matematiikka tehtävät alakoulu sanalistoja tai kirjaimet harjoittelu esikoulu tehtäviä. Lisää omia ohjeita tai tehtävänantoja. Luo ainutlaatuisia tulostettavat tehtävät lapsille ilmainen tai premium-versioilla. Täysi kontrolli tehtävän ulkoasuun.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Lataa Omat Kuvat',
        description: `Lataa omia kuvia suoraan generaattoriin. Tuetut formaatit: JPEG, PNG, GIF. Yhdistä omat kuvat kirjaston kuviin. Luo täysin personoituja tehtäviä oppilaillesi.

Lataa oppilaiden valokuvia tai luokkahuoneen esineitä. Käytä omia piirroksia tai värityskuvia lapsille tulostettava materiaalia. Generaattori käsittelee kaikki kuvatiedostot automaattisesti. Kuvien nimet tulevat sanoiksi sanastoristikkoon.

Tämä ominaisuus sopii erityisesti lukemaan oppiminen tehtävät personointiin. Käytä tuttuja esineitä esikoululaisille. Luo hienomotoriikka harjoitukset omista kuvista. Rajoittamaton kuvien lataus premium-tilauksella.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Kielen Tuki',
        description: `Sanapeli generaattori tukee 11 eri kieltä. Käyttöliittymä ja kuvakirjasto kaikilla kielillä. Kielivalinnat: suomi, englanti, saksa, ranska, espanja, portugali, italia, hollanti, ruotsi, tanska, norja.

Kuvien nimet näkyvät automaattisesti valitulla kielellä. Valitse kieli kuvakirjastolle ja generoi tehtävät. Täydellinen monikielisille luokkahuoneille. Tue kielenoppimista eri kielillä.

Luo matematiikka tehtävät alakoulu sanastoa englanniksi. Generoi kirjaimet harjoittelu esikoulu tehtäviä suomeksi. Käytä yhteenlasku ja vähennyslasku tehtävät sanastoa eri kielillä. Monikielisyys sisältyy ilmainen ja premium-versioihin.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kaupallinen Lisenssi',
        description: `Peruspaketti ja Täysi Pääsy tilaukset sisältävät täyden kaupallisen POD-lisenssin. Myy luomiasi tehtäviä Teachers Pay Teachers -palvelussa. Myy Etsy printable -kaupoissa tai Amazon KDP -palvelussa. Ei ylimääräisiä lisenssimaksuja.

Monet opettajat ansaitsevat 500-5000 euroa kuukaudessa myymällä tehtäviä. Luo kertotaulut tulostettava paketteja myyntiin. Tee värityskuvia lapsille tulostettava kokoelmia. Yhdistä pisteestä pisteeseen tehtävät ja hienomotoriikka harjoitukset paketeiksi.

Kaikki tehtävät viedään 300 DPI laadulla kaupallista käyttöä varten. Ei attribuuttiovaatimuksia. Täysi kaupallinen vapaus tilauksen kanssa. Ilmainen perusversio on vain henkilökohtaiseen käyttöön.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Kuvan Kirjasto',
        description: `Pääsy yli 3000 lapsiystävälliseen kuvaan. Kaikki kuvat järjestetty teemoittain. Selaa teemoja tai etsi kuvia hakusanalla. Kaikki kuvat sisältyvät tilaukseen ilman lisämaksuja.

Matematiikka tehtävät alakoulu aiheet: numerot, muodot, kellot, rahat. Kirjaimet harjoittelu esikoulu kuvat: eläimet, hedelmät, ajoneuvot, välineet. Kertotaulut tulostettava teemat numeroilla ja esineillä. Yhteenlasku ja vähennyslasku tehtävät visuaalisilla apuvälineillä.

Taustateemoja ja reunateemoja yli 100 vaihtoehtoa. Kaikki sopivat esiopetus ja alakoulu oppilaille. Uusia kuvia lisätään säännöllisesti. Täysi pääsy kuvakirjastoon Peruspaketti ja Täysi Pääsy tilauksilla.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Ammattimainen 300 DPI Laatu',
        description: `Kaikki tehtävät viedään 300 DPI resoluutiolla. Täydellinen tulostuslaatu kotitulostimilla ja ammattitulostimilla. Lataa PDF tai JPEG muodossa. Harmaasävyvaihtoehto säästää mustetta.

PDF-muoto säilyttää korkean laadun kaikilla laitteilla. JPEG sopii nopeaan jakamiseen ja tulostamiseen. Molemmat formaatit ammattimaista laatua. Ei pikselöitymistä tai epäselvyyttä.

Luo lukemaan oppiminen tehtävät terävällä tekstillä. Tulosta hienomotoriikka harjoitukset selkeillä viivoilla. Kaikki pisteestä pisteeseen tehtävät tulostuvat täydellisesti. Esiopetus materiaali ilmainen ja premium-versiot samaa laatua.`,
        highlighted: true,
      },
      {
        id: '8',
        icon: '✅',
        title: 'Vastausavaimen Generointi',
        description: `Generaattori luo automaattisesti vastausavaimen jokaiselle tehtävälle. Sanat korostettu väreillä sanastoristikossa. Helppo tarkistaa oppilaiden vastaukset. Säästää opettajan aikaa merkittävästi.

Lataa sekä tehtävä että vastausavain PDF-muodossa. Molemmat samalla asettelutyylillä. Tulosta vastausavain omaan käyttöösi. Oppilaat saavat vain tyhjän tehtävän.

Vastausavain toimii kaikilla tehtävillä. Matematiikka tehtävät alakoulu, kirjaimet harjoittelu esikoulu ja kaikki muut aiheet. Automaattinen värikoodaus selkeyttää ratkaisua. Sisältyy sekä ilmainen että premium-versioihin.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from Finnish wordsearch.md step sections
  howTo: {
    sectionTitle: 'Kuinka Luoda Tulostettavat Tehtävät Lapsille 5 Helpossa Vaiheessa',
    sectionDescription: 'Luo ammattimaisia sanapelitehtäviä alle 3 minuutissa. Koko prosessi on yksinkertainen ja intuitiivinen. Ei tarvitse suunnitteluosaamista tai teknistä kokemusta. Seuraa näitä viittä vaihetta täydellisiin tulostettavat tehtävät lapsille ilmainen tuloksiin.',
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
        title: 'Valitse Sisältö',
        description: `Aloita valitsemalla kuvat sanapeliisi. Kolme vaihtoehtoa sisällön valintaan. Ensimmäinen vaihtoehto: valitse teema teemavalitsimesta. Toinen vaihtoehto: selaa yksittäisiä kuvia kirjastosta. Kolmas vaihtoehto: lataa omat kuvat.

Teemavalinta on nopein tapa aloittaa. Valitse matematiikka tehtävät alakoulu teemasta numerot tai laskutoimitukset. Valitse kirjaimet harjoittelu esikoulu teemasta aakkoset tai eläimet. Valitse värityskuvia lapsille tulostettava teemasta värikynät tai muodot. Jokainen teema sisältää 8 sopivaa kuvaa.

Yksittäinen kuvavalinta antaa enemmän kontrollia. Selaa yli 3000 kuvaa kategorioittain. Etsi kuvia hakusanalla. Valitse täsmälleen haluamasi 8 kuvaa. Yhdistä kertotaulut tulostettava numeroita ja yhteenlasku ja vähennyslasku tehtävät symboleita.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetuksia',
        description: `Valitse ruudukon koko sanastoristikollesi. Rivit: 5-30, sarakkeet: 5-30. Pienempi ruudukko helpompi esikoululaisille. Suurempi ruudukko haastavampi alakoululaisille. Oletus 12x12 sopii useimmille.

Valitse sivun koko ja suunta. Letter Portrait kotitulostimille. A4 Portrait eurooppalaisille tulostimille. Landscape-suunta leveämmille tehtäville. Mukautettu koko erityistarpeisiin.

Aktivoi vaihtoehdot tehtävän vaikeustasoon. "Salli diagonaaliset sanat" lisää haastavuutta. "Salli käänteissanat" vaikeuttaa etsintää. "Näytä vain kuvat" luo visuaalisemman tehtävän. "Näytä vain sanat" luo tekstipohjaisen tehtävän.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi',
        description: `Klikkaa "Generoi Tehtävä" nappia. Generaattori luo sanastoristikon automaattisesti. Sijoittaa sanat vaakasuorasti, pystysuorasti ja diagonaalisesti. Täyttää tyhjät ruudut satunnaisilla kirjaimilla. Koko prosessi kestää 2-3 sekuntia.

Generaattori käyttää suomalaista aakkostoa. Sisältää Å, Ä, Ö kirjaimet. Kaikki skandinaaviset erikoismerkit tuettu. Sanat näkyvät oikein suomeksi. Täydellinen kirjaimet harjoittelu esikoulu tarkoituksiin.

Esikatsele tehtävä heti generoinnin jälkeen. Tarkista, että kaikki sanat sopivat ruudukkoon. Tarkista, että vaikeustaso on sopiva. Jos et ole tyytyväinen, klikkaa "Generoi Uudelleen". Jokainen generointi luo erilaisen asettelun.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa',
        description: `Kaikki elementit tehtävällä ovat muokattavissa. Raahaa sanastoristikkoa uuteen paikkaan. Skaalaa sitä suuremmaksi tai pienemmäksi. Kierrä sitä haluttuun kulmaan. Täysi vapaus asetteluun.

Muokkaa sanalistaa. Muuta fonttikokoa luettavuuden parantamiseksi. Vaihda fonttiperhe. Muuta tekstin väri. Lisää reunukset tekstiin. Tee listasta selkeämpi esikoululaisille.

Lisää omia tekstielementtejä. Kirjoita otsikko tehtävälle. Lisää ohjeet oppilaille. Kirjoita oppilaan nimi tai luokka. Lisää päivämäärä tai tehtävänumero. Kaikki teksti täysin muokattavissa.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta',
        description: `Klikkaa "Lataa" nappia valitaksesi latausvaihtoehto. Valitse PDF tai JPEG muoto. PDF säilyttää parhaan laadun kaikilla laitteilla. JPEG sopii nopeaan jakamiseen sähköpostilla.

Valitse ladataanko tehtävä vai vastausavain. Lataa molemmat myöhempää käyttöä varten. Kaikki ladattu 300 DPI laadulla. Täydellinen tulostuslaatu kotitulostimilla. Ammattimainen laatu kaupalliseen myyntiin.

Aktivoi harmaasävyvaihtoehto säästääksesi värimustetta. Tehtävät tulostuvat selkeästi mustavalkoisina. Säästää kustannuksia suurissa tulostusvolyymeissa. Värikuvat näkyvät silti tehtävässä selvästi.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille, Vanhemmille ja Kasvattajille',
    sectionDescription: 'Sanapeli generaattori palvelee monia käyttäjäryhmiä. Esiopetuksen opettajat, alakoulun opettajat ja kotiopettajat. Erityisopettajat ja kielenopettajat. Opettajayrittäjät myyvät tehtäviä verkossa. Jokainen ryhmä hyötyy ainutlaatuisilla tavoilla.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Esiopetuksen Opettajat',
        subtitle: 'Esiopetus Materiaali Ilmainen ja Kirjaimet Harjoittelu Esikoulu',
        description: `Esiopetuksen opettajat käyttävät sanapelitehtäviä kirjainten tunnistamiseen. Luo kirjaimet harjoittelu esikoulu tehtäviä Å, Ä, Ö kirjaimilla. Käytä värityskuvia lapsille tulostettava teemoja lapsiystävällisinä sanoina. Esiopetus materiaali ilmainen versio sopii kokeiluun.

6-vuotiaat esikoululaiset oppivat lukemaan sanapelien avulla. Valitse yksinkertaisia 3-4 kirjaimen sanoja. Käytä tuttuja eläimiä tai hedelmiä sanastoissa. Luo pisteestä pisteeseen tehtävät samoilla kuvilla motoristen taitojen tueksi.

Esiopetuksessa tärkeintä on leikkisä oppiminen. Sanapelitehtävät yhdistävät hauskan ja oppimisen. Lapset etsivät sanoja kuin aarteita. Tue lukemaan oppiminen tehtävät visuaalisilla vihjeillä. Yhdistä hienomotoriikka harjoitukset värittämällä kuvia.`,
        quote: 'Oppilaani rakastavat piilotettujen sanojen etsimistä!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun Opettajat',
        subtitle: 'Matematiikka Tehtävät Alakoulu ja Kertotaulut Tulostettava',
        description: `Alakoulun opettajat 1.-3. luokilla käyttävät sanapelitehtäviä sanavaraston laajentamiseen. Luo matematiikka tehtävät alakoulu sanastolla: numeroiden nimet, muodot, laskutoimitukset. Tulosta kertotaulut tulostettava teemoja kertolaskujen harjoitteluun.

7-9-vuotiaat oppilaat oppivat ainekohtaista sanastoa sanapeleillä. Käytä yhteenlasku ja vähennyslasku tehtävät termejä: plus, miinus, summa, erotus. Luo luonnontieteen tehtäviä eläinten ja kasvien nimillä. Tue lukemaan oppiminen tehtävät vaikeammilla sanoilla.

Eriyttäminen on helppoa sanapeligeneraattorilla. Luo helpompia versioita pienemmällä ruudukolla. Luo haastavampia versioita suuremmalla ruudukolla ja diagonaalisilla sanoilla. Sama aihe, eri vaikeustasot. Kaikki oppilaat oppivat omalla tasollaan.`,
        quote: 'Sanapeli tekee matikan harjoittelusta hauskaa peliä.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat',
        subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen Monikäyttöinen Työkalu',
        description: `Kotiopettajavanhemmat opettavat useita lapsia eri ikäryhmistä. Sanapeli generaattori sopii täydellisesti moniportaiseen opetukseen. Luo esiopetus materiaali ilmainen tyyppisiä tehtäviä 6-vuotiaalle. Luo matematiikka tehtävät alakoulu tehtäviä 8-vuotiaalle. Sama työkalu kaikille lapsille.

Kotiopetus vaatii paljon materiaalien valmistelua. Sanapeli generaattori säästää valtavasti aikaa. Luo viikon tehtävät 30 minuutissa. Tulosta kaikki kerralla tai päivittäin. Joustavuus on avainasemassa kotiopetuksessa.

Yhdistä eri aiheita teemaviikkoihin. Eläinteemaviikko: luo sanapelitehtäviä eläinten nimillä. Lisää värityskuvia lapsille tulostettava eläinkuvia. Yhdistä pisteestä pisteeseen tehtävät eläinaiheisina. Lisää hienomotoriikka harjoitukset eläimiin liittyen.`,
        quote: 'Yksi työkalu kattaa kaikkien lasteni vuosiluokat.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Kielenopettajat',
        subtitle: 'Monikielinen Lukemaan Oppiminen Tehtävät Työkalu',
        description: `Suomen kielen opettajat maahanmuuttajataustaisille lapsille käyttävät sanapelitehtäviä sanavaraston opettamiseen. 11 kielen tuki mahdollistaa kaksikielisen opetuksen. Luo tehtävät suomeksi ja vertaa oppilaan äidinkielellä. Tue siirtymää uuteen kieleen.

Kielikoulut ja kielikurssit hyötyvät sanapelitehtävistä. Luo sanastotehtäviä jokaiselle oppitunnille. Käytä kuvallista opetusta kielen oppimisessa. Kuvat auttavat ymmärtämään sanat ilman käännöksiä. Oppilaat oppivat nopeammin visuaalisilla vihjeillä.

Peruskoulun kielen ja kirjallisuuden opettajat käyttävät sanapelitehtäviä oikeinkirjoituksen harjoitteluun. Luo tehtäviä vaikeista sanoista. Harjoittele Å, Ä, Ö kirjaimia systemaattisesti. Tue lukemaan oppiminen tehtävät sanavaraston laajentamisessa.`,
        quote: 'Monikielisyystuki on ratkaisevaa luokkahuoneessani.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Mukautetut Työarkit ja Hienomotoriikka Harjoitukset Eriyttämiseen',
        description: `Erityisopettajat työskentelevät lasten kanssa, joilla on oppimisen haasteita. Sanapeli generaattori mahdollistaa täydellisen eriyttämisen. Luo yksinkertaisia 3-kirjaimen sanoja hahmotushäiriöisille lapsille. Luo suurempia fontteja näköhaasteisille oppilaille.

Lapset, joilla on keskittymisvaikeuksia, hyötyvät lyhyistä tehtävistä. Luo pieniä 5x5 sanastoristikkoja. Vain 3-4 sanaa etsittäväksi. Nopea onnistumisen kokemus motivoi jatkamaan. Kasvata vaikeustasoa vähitellen.

Yhdistä sanapelitehtävät muihin taitoihin. Lisää hienomotoriikka harjoitukset värittämällä kuvia. Luo pisteestä pisteeseen tehtävät numeroiden harjoitteluun. Yhdistä kirjaimet harjoittelu esikoulu tavoitteisiin kirjoittamalla sanoja. Monipuolinen harjoittelu tukee oppimista.`,
        quote: 'Voin nopeasti mukauttaa tehtäviä jokaisen oppilaan tarpeisiin.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy Tulostettavat Tehtävät Teachers Pay Teachers -palvelussa',
        description: `Monet opettajat ansaitsevat lisätuloja myymällä tehtäviä verkossa. Teachers Pay Teachers on suurin opetusmateriaalien myyntialusta. Etsy printable -kaupat myyvät tulostettavia tehtäviä. Amazon KDP -palvelussa myydään tehtäväkirjoja. Sanapeli generaattori sopii täydellisesti kaikkiin.

Luo tehtäväpaketteja myyntiin. Esimerkki: "20 Matematiikka Tehtävät Alakoulu Sanapelitehtävää". Sisällytä kertotaulut tulostettava teemoja. Lisää yhteenlasku ja vähennyslasku tehtävät termejä. Myy paketteja 3-5 eurolla kappale.

Premium-tilaus sisältää täyden kaupallisen POD-lisenssin. Ei ylimääräisiä lisenssimaksuja. Myy rajoittamattomasti luomiasi tehtäviä. Kilpailijat veloittavat 50-200 euroa vuodessa kaupallisista lisensseistä. Peruspaketti tai Täysi Pääsy sisältää kaiken.`,
        quote: 'Tilaukseni maksoi itsensä takaisin ensimmäisessä kuussa!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from Finnish wordsearch.md
  faq: {
    sectionTitle: 'Usein Kysytyt Kysymykset',
    sectionDescription: 'Yleisimmät kysymykset sanapeli generaattorista ja ilmaisista työarkeista.',
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
        question: 'Onko Tämä Sanapeli Generaattori Todella Ilmainen Käyttää?',
        answer: 'Sanapeli generaattori on ainoa ilmainen työkalu alustalla. Ilmainen versio sisältää vesileiman tulostettavat tehtävät lapsille ilmainen worksheeteihin. Henkilökohtaiseen käyttöön kotona tai luokassa. Ei kaupallista käyttöoikeutta ilmaisversiossa. Premium-tilaus poistaa vesileiman ja avaa kaikki ominaisuudet. Peruspaketti maksaa 144 euroa vuodessa tai 15 euroa kuukaudessa. Täysi Pääsy maksaa 240 euroa vuodessa tai 25 euroa kuukaudessa.',
      },
      {
        id: '2',
        question: 'Voinko Tulostaa Tulostettavat Tehtävät Kotitulostimella?',
        answer: 'Kyllä. Kaikki sanapelitehtävät tulostuvat täydellisesti tavallisilla kotitulostimilla. Käytä A4 tai Letter paperia. Ei tarvitse erikoistulostuspaperia. PDF-muoto säilyttää korkean laadun. 300 DPI resoluutio takaa terävän tekstin ja selkeät kuvat. Harmaasävyvaihtoehto säästää värimustetta. Tulosta värityskuvia lapsille tulostettava teemoja värillisenä. Tehtävät toimivat myös ammattitulostimilla kouluissa.',
      },
      {
        id: '3',
        question: 'Tarvitsenko Suunnitteluosaamista Luodakseni Tehtäviä?',
        answer: 'Ei. Generaattori on suunniteltu opettajille ilman suunnittelukokemusta. Helppokäyttöinen käyttöliittymä ohjaa jokaisen vaiheen läpi. Klikkaa, valitse ja generoi. Ei tarvitse osata grafiikkasuunnittelua. Kaikki toiminnot ovat intuitiivisia. Raahaa elementtejä hiirellä. Skaalaa kokoa vetämällä. Kierrä klikkaamalla. Yksinkertaiset kontrollit jokaista tehtävää varten.',
      },
      {
        id: '4',
        question: 'Voinko Käyttää Sanapelitehtäviä Luokassani Oppilaille?',
        answer: 'Kyllä. Sekä ilmainen että premium-versiot sallivat luokkahuonekäytön. Tulosta tehtävät kaikille oppilaille. Käytä matematiikka tehtävät alakoulu sanastoa opettamiseen. Luo kirjaimet harjoittelu esikoulu tehtäviä lukemaan oppiminen tavoitteisiin. Ilmainen versio sisältää vesileiman mutta toimii luokassa. Premium-tilaus poistaa vesileiman ammattimaisempaan ulkoasuun. Rajoittamaton tulostus kaikille oppilaille.',
      },
      {
        id: '5',
        question: 'Millä Kielillä Sanapelitehtävät Ovat Saatavilla?',
        answer: 'Sanapeli generaattori tukee 11 kieltä. Suomi, englanti, saksa, ranska, espanja, portugali, italia, hollanti, ruotsi, tanska, norja. Käyttöliittymä ja kuvakirjasto kaikilla kielillä. Vaihda kieli yhdellä klikkauksella. Kuvien nimet näkyvät automaattisesti valitulla kielellä. Täydellinen kielenopetukseen. Monikielisyys sisältyy sekä ilmainen että premium-versioihin.',
      },
      {
        id: '6',
        question: 'Voinko Myydä Luomiani Sanapelitehtäviä?',
        answer: 'Ilmainen versio on vain henkilökohtaiseen käyttöön. Ei kaupallista käyttöoikeutta. Peruspaketti ja Täysi Pääsy tilaukset sisältävät täyden kaupallisen POD-lisenssin. Myy rajoittamattomasti luomiasi tehtäviä. Myy Teachers Pay Teachers -palvelussa. Myy Etsy printable -kaupoissa. Myy Amazon KDP -palvelussa. Ei attribuuttiovaatimuksia. Ei rojaltimaksuja. Täysi kaupallinen vapaus tilauksen kanssa.',
      },
      {
        id: '7',
        question: 'Kuinka Mukautan Sanapelitehtäviä Oppilailleni?',
        answer: 'Täysi mukautus jokaiselle elementille. Muuta ruudukon kokoa 5x5 - 30x30. Valitse sivun koko ja suunta. Aktivoi tai poista diagonaaliset sanat. Salli tai estä käänteissanat. Muokkaa pohjalla kaikkea. Siirrä sanastoristikkoa. Muuta sanalistaa. Lisää omia tekstielementtejä. Lataa omia kuvia. Valitse taustat ja reunat. Rajoittamaton luovuus.',
      },
      {
        id: '8',
        question: 'Mille Ikäryhmille Nämä Sanapelitehtävät Sopivat Parhaiten?',
        answer: 'Sanapelitehtävät sopivat 5-10-vuotiaille lapsille. Esiopetus 6-vuotiaat esikoululaiset. Alakoulu 1.-3. luokka 7-9-vuotiaat. Eriyttäminen mahdollistaa laajemman ikäjakauman. Esikoululaisille: Pienet ruudukot 5x5 - 8x8. Yksinkertaiset 3-4 kirjaimen sanat. Ei diagonaaleja. Vain vaakasuorat ja pystysuorat sanat. Alakoululaisille: Suuremmat ruudukot 10x10 - 15x15. Pidempiä sanoja. Diagonaalit aktivoitu.',
      },
      {
        id: '9',
        question: 'Voinko Ladata Omia Kuvia Sanapelitehtäviin?',
        answer: 'Kyllä. Lataa omia kuvia suoraan generaattoriin. Tuetut formaatit: JPEG, PNG, GIF. Yhdistä omat kuvat kirjaston kuviin. Luo täysin personoituja tehtäviä. Lataa oppilaiden valokuvia tai luokkahuoneen esineitä. Käytä omia piirroksia. Kuvien nimet muodostavat sanat sanastoristikkoon. Rajoittamaton kuvien lataus premium-tilauksella.',
      },
      {
        id: '10',
        question: 'Kauanko Kestää Luoda Yksi Sanapelitehtävä?',
        answer: 'Alle 3 minuuttia alusta loppuun. Valitse kuvat tai teema: 30 sekuntia. Mukauta asetukset: 30 sekuntia. Generoi tehtävä: 10 sekuntia. Muokkaa pohjalla: 60 sekuntia. Lataa: 10 sekuntia. Kokeneemmat käyttäjät luovat tehtävät vielä nopeammin. 1-2 minuuttia per tehtävä. Verrattuna perinteiseen luomiseen: 30-60 minuuttia per tehtävä. Valtava ajansäästö.',
      },
      {
        id: '11',
        question: 'Sisältävätkö Sanapelitehtävät Vastausavaimet?',
        answer: 'Kyllä. Jokainen tehtävä sisältää automaattisen vastausavaimen. Generaattori luo sen samaan aikaan tehtävän kanssa. Sanat korostettu eri väreillä sanastoristikossa. Helppo tarkistaa oppilaiden vastaukset. Lataa sekä tehtävä että vastausavain PDF-muodossa. Molemmat samalla asettelutyylillä. Tulosta vastausavain omaan käyttöösi. Oppilaat saavat vain tyhjän tehtävän.',
      },
      {
        id: '12',
        question: 'Voinko Luoda Sanapelitehtäviä Tietyistä Kouluaineista?',
        answer: 'Kyllä. Luo sanapelitehtäviä mistä tahansa aiheesta. Matematiikka: luo matematiikka tehtävät alakoulu sanastolla. Numerot, muodot, laskutoimitukset. Kertotaulut tulostettava numeroilla. Äidinkieli: kirjaimet harjoittelu esikoulu sanastolla. Aakkoset, tavutus, sanat. Lukemaan oppiminen tehtävät eri vaikeusasteilla. Luonnontieteet: eläimet, kasvit, sää, vuodenajat. Esiopetus materiaali ilmainen kaikista aiheista.',
      },
    ],
  },

  // Pricing
  pricing: {
    title: 'Peruspaketti',
    price: '144€',
    priceInterval: '/vuosi',
    priceSuffix: 'Laskutetaan vuosittain',
    benefits: [
      'Rajoittamaton työarkkien luonti',
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
    sectionTitle: 'Yhdistä Muihin Työarkki Generaattoreihin',
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä sanapeli työarkit näihin täydentäviin generaattoreihin.',
    ctaTitle: 'Valmiina Luomaan Upeita Työarkkeja?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia työarkkeja. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
    primaryCtaText: 'Aloita Ilmainen Kokeilu',
    secondaryCtaText: 'Katso Kaikki 33 Sovellusta',
    badgeText: 'Toimii Hyvin Yhdessä',
    exploreText: 'Tutustu kaikkiin sovelluksiin',
    trustBadges: {
      guarantee: '30 päivän rahat takaisin -takuu',
      securePayment: 'Turvallinen maksu',
      cancelAnytime: 'Peruuta milloin tahansa',
    },
    items: [
      {
        id: '1',
        slug: 'crossword',
        name: 'Ristikkotehtävät',
        category: 'Kieli',
        icon: '📝',
        description: 'Täydennä sanapeliä ristikkotehtävillä samasta sanastoteemasta kattavaan sanaston harjoitteluun.',
      },
      {
        id: '2',
        slug: 'word-scramble',
        name: 'Sanasotkut',
        category: 'Kieli',
        icon: '🔤',
        description: 'Yhdistä sanapeli sekoitettujen sanojen tehtäviin vahvistaaksesi oikeinkirjoitusta ja sanastoa eri näkökulmista.',
      },
      {
        id: '3',
        slug: 'word-guess',
        name: 'Sanan Arvaus',
        category: 'Kieli',
        icon: '❓',
        description: 'Lisää sanan arvaustehtäviä lukemispisteeseesi sanapelitehtävien rinnalle monipuoliseen harjoitteluun.',
      },
      {
        id: '4',
        slug: 'cryptogram',
        name: 'Kryptogrammi',
        category: 'Logiikka',
        icon: '🔐',
        description: 'Haasta oppilaita koodinmurto-tehtävillä, jotka kehittävät loogista ajattelua ja kirjainten hahmottamista.',
      },
      {
        id: '5',
        slug: 'coloring',
        name: 'Värityskuvat',
        category: 'Luovuus',
        icon: '🎨',
        description: 'Palkitse valmiit sanapelitehtävät teemaattisilla värityskuvilla, jotka kehittävät hienomotoriikkaa.',
      },
      {
        id: '6',
        slug: 'alphabet-train',
        name: 'Aakkosjuna',
        category: 'Varhainen Oppiminen',
        icon: '🚂',
        description: 'Tasapainota sanapeliharjoittelua kirjaintunnistusharjoituksilla kattavaan varhaiseen lukemiseen.',
      },
    ],
  },
};

export default wordSearchFiContent;
