import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Math Worksheets - Finnish Content (Matematiikka Tehtävät)
 *
 * File: frontend/content/product-pages/fi/matematiikka-tyoarkit.ts
 * URL: /fi/apps/matematiikka-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/math-worksheet.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const mathWorksheetsFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'matematiikka-tyoarkit',
    appId: 'math-worksheet',
    title: 'Matematiikkatehtävä Generaattori | LessonCraftStudio',
    description: 'Luo visuaalisia matematiikkatehtäviä kuvilla. Yhteenlasku, vähennyslasku, vertailu ja lukujonot esikoulusta 3. luokalle. Vastausavaimet mukana. Ilmainen PDF.',
    keywords: 'matematiikkatehtävä generaattori, laskutoimitukset harjoittelu, matemaattiset perustaidot, numerotaju kehittäminen, laskuharjoitukset tulostettava, matematiikan oppiminen, laskutaidon vahvistaminen, perusmatematiikka lapset, aritmetiikka harjoitus, lukumääräkäsite oppiminen, matematiikkapeli tulostettava, matematiikka tehtävät alakoulu, matikka tehtävät tulostettava',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/matematiikka-tyoarkit',
  },

  // Hero Section - FULL text from Finnish math-worksheet.md
  hero: {
    title: 'Matematiikkatehtävien Generaattori',
    subtitle: 'Visuaalisia Matematiikkaharjoituksia Esikoulusta 3. Luokalle',
    description: `Luo ammattimaisia visuaalisia matematiikkatehtäviä minuuteissa. Peruspaketti-tilauksesi antaa sinulle rajattoman matematiikkatehtävien luonnin ilman maksuja per tehtävä. Generoi tulostettavia matematiikkatehtäviä jotka sopivat täydellisesti esiopetuksen ja alakoulun oppilaille. Lataa korkealaatuiset PDF-tehtävät alle kolmessa minuutissa.

Visuaaliset matematiikkatehtävät auttavat lapsia oppimaan yhteenlaskua ja vähennyslaskua kuvien avulla. Jokainen tehtävä käyttää kuvia numeroiden esittämiseen. Lapset laskevat kuvia ja ratkaisevat matemaattisia ongelmia. Tämä visualisoinnin menetelmä tekee abstraktista matematiikasta konkreettista ja ymmärrettävää.

Matematiikkatehtävien generaattori tarjoaa neljä vaikeustasoa. Hyvin helppo ja helppo taso käyttävät kahta symbolia per tehtävä. Keskitaso käyttää kolmea symbolia. Vaikea taso käyttää neljää symbolia. Valitse vaikeustaso joka sopii oppilaittesi taitotasolle.

Luo tehtäviä joko pelkästään yhteenlaskusta tai yhteenlaskun ja vähennyslasku yhdistelmästä. Aseta minimiarvo ja maksimiarvo numeroille. Päätä salliiko tehtävät negatiiviset tulokset. Nämä asetukset antavat sinulle täydellisen kontrollin tehtävien sopivuudesta.`,
    previewImageSrc: '/samples/finnish/math worksheet/sample-1.jpeg',
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
        videoId: '-JIawojGNr0',
        buttonText: 'Matematiikkatehtävät Toiminnot',
        modalTitle: 'Matematiikkatehtävät Opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/math worksheet/
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

  // Features Grid - FULL text from Finnish math-worksheet.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Visuaalinen matematiikkatehtävien generaattori yhdistää helppokäyttöisyyden ja ammattimaisen laadun. Seitsemän pääominaisuutta tekevät matematiikkatehtävien luonnista nopeaa ja tehokasta. Jokainen ominaisuus on suunniteltu opettajien tarpeisiin. Luo tulostettavia matematiikkatehtäviä minuuteissa ilman graafisen suunnittelun taitoja.',
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
        title: 'Kuvapohjaiset logiikkapulmat',
        description: 'Visuaaliset logiikkapulmat, joissa kuvasymbolit edustavat piilotettuja lukuja yhtälöissä. Oppilaat analysoivat kuvayhtälöitä, päättelevät mitä kukin kuva edustaa ja ratkaisevat tehtävät. Kehittää algebrallisen ajattelun perusteita jo varhaisessa vaiheessa.',
      },
      {
        id: '2',
        icon: '📊',
        title: 'Neljä vaikeustasoa jokaiselle oppijalle',
        description: 'Valitse neljästä vaikeustasosta: erittäin helppo, helppo, normaali ja vaikea. Erittäin helppo käyttää kahta symbolia summilla 10 asti. Vaikea taso sisältää neljä symbolia sekaoperaatioilla. Tukee konkreetti-kuvallinen-abstrakti oppimispolkua.',
      },
      {
        id: '3',
        icon: '➕',
        title: 'Yhteen- ja vähennyslasku sekä sekaoperaatiot',
        description: 'Valitse pelkät yhteenlaskut, yhteen- ja vähennyslaskut tai sekamuoto. Esiopetuksen oppilaat aloittavat pelkillä yhteenlaskuilla. 2.–3. luokan oppilaat haastavat itsensä sekaoperaatioilla POPS 2014 tavoitteen T3 mukaisesti.',
      },
      {
        id: '4',
        icon: '🖼️',
        title: '3000+ teemakuvaa muuttujina',
        description: 'Käytä eläimiä, kulkuneuvoja, ruokaa ja leluja matemaattisina muuttujina. Oppilaat näkevät tutut kuvat yhtälöissä perinteisten x- ja y-muuttujien sijaan. Visuaalinen esitys tekee algebrasta helposti lähestyttävän.',
      },
      {
        id: '5',
        icon: '✅',
        title: 'Automaattiset vastausavaimet ratkaisuineen',
        description: 'Jokainen tehtävä generoi vastausavaimen, joka näyttää kunkin kuvan numeerisen arvon. Opettajat tarkistavat oppilastyöt sekunneissa. Vastausavaimet sopivat itsetarkistuspisteille ja dokumenttikameranäyttöön.',
      },
      {
        id: '6',
        icon: '🔢',
        title: 'Säädettävä lukualue ja tehtävämäärä',
        description: 'Aseta lukualue 0–100 ja valitse 1–6 pulmaa sivua kohti. Esiopetukseen sopii lukualue 1–10 ja 1–2 pulmaa. Kolmasluokkalaisille lukualue 1–50 ja 4–6 pulmaa tarjoaa riittävän haasteen.',
      },
      {
        id: '7',
        icon: '💼',
        title: 'Kaupallinen lisenssi myyntiin',
        description: 'Myy luomiasi matematiikkapulmakokoelmia verkossa. Kuvapulmat ovat ainutlaatuinen tuote, joka erottuu tavallisista laskutehtävistä. Kaupallinen lisenssi kattaa kaikki myyntikanavat ilman lisämaksuja.',
      },
      {
        id: '8',
        icon: '🧠',
        title: 'Algebrallisen ajattelun perusteet',
        description: 'Kuvapulmat opettavat algebrallista ajattelua ikaanmukaisesti. Oppilaat oppivat etta symbolit voivat edustaa tuntemattomia lukuja ja etta yhtaloita voi ratkaista loogisella paaattelyylla. Tama luo perustan myohemmalle algebra-opiskelulle.',
      },
    ]
    
  },

  // How-To Guide - FULL text from Finnish math-worksheet.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Visuaalisten matematiikkatehtävien luonti on nopeaa ja yksinkertaista. Koko prosessi alusta loppuun kestää alle kolme minuuttia. Ei tarvitse graafisen suunnittelun taitoja. Ei monimutkaisia ohjelmia. Vain viisi helppoa vaihetta ammattimaisilta näyttäviin matematiikkatehtäviin.',
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
        description: `Aloita valitsemalla kuinka haluat valita kuvat. Kaksi pääasiallista tapaa on käytettävissä. Teemapohjainen valinta on nopein tapa. Yksittäinen kuvavalinta antaa tarkemman kontrollin.

Teemapohjaisessa valinnassa valitset yhden teeman pudotusvalikosta. Kaikki kuvat tulevat automaattisesti siitä teemasta. Eläimet, ruoka, lelut, kulkuneuvot tai luonto. Yli kolmekymmentä teemaa valittavana. Generaattori käyttää satunnaisia kuvia valitusta teemasta.

Yksittäinen kuvavalinta antaa sinulle täyden kontrollin. Selaa kuvakirjastoa ja klikkaa kuvia jotka haluat käyttää. Suodata kirjasto teeman mukaan kaventaaksesi vaihtoehtoja. Hae tiettyjä kuvia hakutoiminnolla. Lisää vähintään kolme kuvaa luodaksesi mielenkiintoisia tehtäviä.

Lataa omia kuvia personoidaksesi matematiikkatehtävät. Klikkaa "Valitse Tiedostot" painiketta. Selaa kuvat tietokoneeltasi tai tabletiltasi. Lataa useita kuvia kerralla. Ladatut kuvat näkyvät omassa osiossaan. Klikkaa niitä lisätäksesi valittuun kuvapoolin.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetuksia',
        description: `Valitse vaikeustaso joka sopii oppilaidesi taitotasolle. Hyvin helppo käyttää kahta symbolia per laskutoimitus. Helppo taso myös kahta symbolia mutta suurempia numeroita. Keskitaso käyttää kolmea symbolia. Vaikea taso käyttää neljää symbolia per laskutoimitus.

Aseta tehtävien lukumääräksi yksi kuuteen. Aloittelijoille yksi tai kaksi tehtävää per sivu toimii hyvin. Edistyneemmät oppilaat voivat tehdä kolmesta kuuteen tehtävää per sivu. Enemmän tehtäviä tarkoittaa enemmän harjoittelua yhdellä työarkilla.

Määritä minimiarvo ja maksimiarvo numeroille. Oletusarvot ovat nolla ja kaksikymmentä. Muuta näitä arvoja mukauttaaksesi vaikeutta. Esiopetukselle käytä nollasta kymmeneen. Alakoulun toiselle luokalle kokeile nollasta sataan. Numeroalue vaikuttaa suoraan tehtävien vaikeuteen.

Mukauta sivuasetus tulostintasi mukaan. Letter Portrait sopii amerikkalaisille tulostimille. A4 Portrait sopii eurooppalaisille tulostimille. Landscape-suuntaus antaa enemmän tilaa suurille kuvilla. Valitse koko joka sopii luokkahuoneesi tarpeisiin.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi Työarkkisi',
        description: `Klikkaa "Generoi Työarkki" painiketta. Generaattori luo matematiikkatehtävän välittömästi. Prosessi kestää muutaman sekunnin. Näet esikatselun heti kun se on valmis.

Tarkista että kaikki näyttää oikealta. Ovatko kuvat selkeitä ja tunnistettavia? Ovatko laskutoimitukset sopivan vaikeita? Onko asettelu tasapainoinen ja ammattimaisen näköinen? Jos kaikki näyttää hyvältä, siirry seuraavaan vaiheeseen.

Jos haluat erilaisia kuvia, klikkaa "Generoi Työarkki" uudelleen. Generaattori luo täysin uuden version satunnaisilla kuvilla. Kokeile useita kertoja löytääksesi täydellisen yhdistelmän. Ei rajoituksia kuinka monta kertaa voit generoida.

Generoi erillinen vastausavain klikkaamalla "Generoi Vastausavain". Vastausavain näyttää samat tehtävät vastausten kanssa. Tämä nopeuttaa tehtävien tarkistamista merkittävästi. Säästä vastausavain opettajan avustajille tai omaan arkistoosi.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Pohjalla',
        description: `Nyt voit muokata jokaista elementtiä suoraan pohjalla. Klikkaa mitä tahansa kuvaa valitaksesi sen. Raahaa kuvat uusiin paikkoihin. Kierrä kuvia kulmasta. Skaalaa kuvia suuremmiksi tai pienemmiksi vetämällä kulmia.

Muokkaa tekstejä klikkaamalla niitä. Vaihda väriä vasemmassa sivupalkissa olevan värivalitsimen avulla. Muuta fonttikokoa numero-kentässä. Valitse eri fontti pudotusvalikosta. Lisää reunuksia teksteihin liukusäätimellä.

Lisää uutta tekstiä "Lisää Teksti" -työkalulla. Kirjoita haluamasi teksti syöttökenttään. Klikkaa "Lisää Teksti" painiketta. Uusi teksti ilmestyy pohjalle. Raahaa se haluamaasi paikkaan. Mukauta väri, koko ja fontti.

Kumoa virheet "Kumoa" painikkeella. Tee uudelleen "Tee uudelleen" painikkeella. Nämä painikkeet suojaavat vahingollisilta muutoksilta. Tee rohkeita muokkauksia ilman pelkoa. Voit aina palata edelliseen tilaan.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta',
        description: `Kun olet tyytyväinen työarkkiin, on aika ladata se. Klikkaa "Lataa" pudotusvalikkoa. Valitse haluamasi formaatti ja versio. Neljä vaihtoehtoa on käytettävissä.

Lataa työarkki JPEG-muodossa nopeaan jakamiseen. JPEG-tiedostot ovat pieniä ja latautuvat nopeasti sähköpostissa. Täydelliset yksittäisiin sivuihin. Toimivat erinomaisesti verkkokaupoissa. Säilyttävät 300 DPI laadun.

Lataa työarkki PDF-muodossa ammattimaiseen tulostukseen. PDF säilyttää tekstin terävyyden täydellisesti. Yhteensopiva kaikkien tulostimien kanssa. Paras vaihtoehto useampisivuisiin dokumentteihin. Säilyttää korkean laadun millä tahansa koolla.

Tulosta tehtävät kotona tavallisella tulostimella. Valitse harmaasävy säästääksesi väriä. Tulosta värillisiin lomakkeisiin lisätäksesi visuaalista kiinnostusta. Tai lähetä tiedostot ammattimaiseen tulostuspalveluun suurta määrää varten.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish math-worksheet.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Visuaalinen matematiikkatehtävien generaattori palvelee monia eri käyttäjäryhmiä. Jokainen ryhmä hyötyy työkalun joustavuudesta ja helppokäyttöisyydestä. Opettajat säästävät tunteja valmistelua viikossa. Vanhemmat löytävät laadukasta oppimateriaalia kotiin. Kasvattajat luovat ammattimaisilta näyttäviä tehtäviä ilman graafisen suunnittelun taitoja.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Esiopetuksen opettajat',
        subtitle: 'Kahden symbolin pulmat varhaiseen matemaattiseen ajatteluun',
        description: 'Luo erittäin helpoja kahden symbolin pulmia luvuilla 1–10. Ohjaa oppilaita päättelyprosessin läpi koko luokan harjoituksena. Kuvapohjaiset pulmat innostavat matemaattiseen ajatteluun POPS 2014 tavoitteen T1 mukaisesti.',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun opettajat',
        subtitle: 'Kriittisen ajattelun harjoittelu 1.–3. luokalle',
        description: 'Käytä kolmen ja neljän symbolin pulmia 1.–3. luokan kriittisen ajattelun harjoitteluun. Oppilaat soveltavat yhteen- ja vähennyslaskutaitojaan ongelmanratkaisukontekstissa. Pulmat eriyttyvät luontevasti vaikeustasovalinnalla.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat ja vanhemmat',
        subtitle: 'Kiinnostava vaihtoehto perinteisille laskuharjoituksille',
        description: 'Kuvapohjaiset pulmat tarjoavat motivoivan vaihtoehdon oppilaille, jotka vastustavat perinteisiä laskutehtäviä. Pulmien ratkaiseminen tuntuu pelaamiselta, ei läksyiltä. Eri vaikeustasot palvelevat kaikkia lapsia samassa perheessä.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'S2-opettajat',
        subtitle: 'Kieletön matemaattinen päättely',
        description: 'Kuvapohjaiset pulmat eivät vaadi kielitaitoa. Matemaattinen päättely toimii universaalisti kielirajojen yli. Oppilaat osoittavat matemaattista osaamistaan ilman kielimuurin estämiseen. Täydellinen vastavalmistuneille maahanmuuttajille.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Vaihtoehtoinen arviointimuoto oppimisen tueksi',
        description: 'Kuvapulmat tarjoavat vaihtoehtoisen tavan arvioida matemaattista ymmärristä. Visuaalinen muoto vähentää lukemisen kuormitusta. Säädettävät vaikeustasot mahdollistavat HOJKS-tavoitteiden mukaisen eriyttamisen.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Ainutlaatuiset matematiikkatuotteet myyntiin',
        description: 'Kuvapohjaiset logiikkapulmat erottuvat tavallisista laskutehtävistä oppimateriaalikaupoissa. Luo teemapaketteja eri vaikeustasoilla. Pulmat ovat suosittuja koska ne yhdistävät viihteen ja oppimisen.',
      },
    ]
    
  },

  // FAQ Section - Selected FAQs from Finnish math-worksheet.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'Yleisimmät kysymykset visuaalisesta matematiikkatehtävägeneraattorista ja tulostettavista tehtävistä.',
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
        question: 'Miten kuvapohjaisten logiikkapulmien ratkaiseminen toimii?',
        answer: 'Jokaisessa pulmassa kuvasymbolit edustavat piilotettuja lukuja. Oppilaat analysoivat kuvayhtälöitä, päättelevät kunkin kuvan numeerisen arvon ja ratkaisevat tehtävät hyödyntäen loogista päättelyä. Tämä prosessi opettaa algebrallista ajattelua ikäänmukaisesti.',
      },
      {
        id: '2',
        question: 'Mitka vaikeustasot ovat saatavilla?',
        answer: 'Neljä vaikeustasoa: erittäin helppo (2 symbolia, summat 10 asti), helppo (3 symbolia, summat 15 asti), normaali (3 symbolia, yhteen- ja vähennyslasku), vaikea (4 symbolia, sekaoperaatiot, laajempi lukualue).',
      },
      {
        id: '3',
        question: 'Mitka laskutoimitukset ovat mahdollisia?',
        answer: 'Valitse pelkät yhteenlaskut, yhteen- ja vähennyslaskut tai sekamuoto. Esiopetuksen oppilaat aloittavat yhteenlaskuilla. 2.–3. luokan oppilaat siirtyvät sekaoperaatioihin, jotka vaativat joustavampaa matemaattista ajattelua.',
      },
      {
        id: '4',
        question: 'Sisaltavatko tehtavat vastausavaimet?',
        answer: 'Kyllä, jokainen tehtävä generoi vastausavaimen, joka näyttää kunkin kuvan numeerisen arvon. Opettajat tarkistavat oppilastyöt nopeasti ja voivat tulostaa vastausavaimet itsetarkistuspisteille.',
      },
      {
        id: '5',
        question: 'Mille ikarryhmille kuvapulmat sopivat?',
        answer: 'Kuvapulmat palvelevat 5–10-vuotiaita. Esiopetusikäiset käyttävät erittäin helppoja pulmia opettajajohtoisesti. 1. luokan oppilaat ratkaisevat helppoja pulmia itsenäisesti. 2.–3. luokan oppilaat haastavat itsensä vaikeammilla tasoilla.',
      },
      {
        id: '6',
        question: 'Miten kuvapulmat kehittavat algebrallista ajattelua?',
        answer: 'Oppilaat oppivat että symbolit (kuvat) voivat edustaa tuntemattomia lukuja ja että yhtälöitä voi ratkaista loogisella päättelyyllä. Tämä on suora perusta myöhemmälle muuttujien ja yhtälöiden opiskelulle.',
      },
      {
        id: '7',
        question: 'Voiko teemakuvia valita vapaasti?',
        answer: 'Kyllä, valitse 3000+ kuvakirjastosta tai lataa omia kuvia muuttujiksi. Eläimet, ruoka, kulkuneuvot ja muut tutut kuvat tekevät abstrakteista matemaattisista käsitteistä konkreettisia ja kiinnostavia.',
      },
      {
        id: '8',
        question: 'Miten kuvapulmat tukevat POPS 2014 tavoitteita?',
        answer: 'Kuvapulmat tukevat matematiikan tavoitteita T1 (matemaattinen ajattelu ja ongelmanratkaisu) ja T3 (laskutaitojen sujuvuus). Visuaalinen ongelmanratkaisu on POPS 2014 toiminnallisen oppimisen periaatteiden mukaista.',
      },
      {
        id: '9',
        question: 'Kuinka kauan yhden tehtavan luominen kestaa?',
        answer: 'Yhden matematiikkapulmatehtävän luominen vie alle 3 minuuttia. Valitse teemakuvat, vaikeustaso ja lukualue. Generaattori rakentaa pulman automaattisesti. Luo koko viikon haastetehtävät 15 minuutissa.',
      },
      {
        id: '10',
        question: 'Voinko myydaa logiikkapulmakokoelmia?',
        answer: 'Kyllä, tilauksesi sisältää kaupallisen lisenssin. Kuvapulmat ovat ainutlaatuinen tuote, joka erottuu perinteisistä laskutehtävistä oppimateriaalikaupoissa. Luo teemapaketteja eri vaikeustasoilla.',
      },
      {
        id: '11',
        question: 'Sopivatko kuvapulmat eriytettyyn opetukseen?',
        answer: 'Kyllä, neljä vaikeustasoa mahdollistavat luontevan eriyttamisen. Luo helpompia pulmia tukea tarvitseville ja haastavampia lahjakkaiden oppilaiden lisätehtäviksi. Kaikki tehtävät näyttävät samanlaisilta, joten eriyttaminen on huomaamatonta.',
      },
      {
        id: '12',
        question: 'Mitka lukualueet ovat mahdollisia?',
        answer: 'Aseta lukualue 0–100. Esiopetukseen sopii 1–10. Ekaluokkalaisille 1–15. Toisluokkalaisille 1–20. Kolmasluokkalaisille 1–50 tai jopa 1–100 haastetehtäviin. Valitse 1–6 pulmaa sivua kohti.',
      },
    ]
    
  },

  // Pricing - Finnish Core Bundle terminology
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
    bundleDescription: 'Tilauksesi sisaltaa paasyn 10 tyoarkkigeneraattoriin:',
    bundleApps: [
      'Kuvayhdistely',
      'Aakkosjuna',
      'Varityskuvat',
      'Matematiikkatehtavat',
      'Sanansekoitus',
      'Etsi ja Laske',
      'Yhdistelypeli',
      'Piirralainjoja',
      'Kuvabingo',
      'Sudoku',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Ilmaiset Työarkit Yhdistää - Työarkki Lapsille ja Ilmaiset Tulosteet',
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä visuaaliset matematiikka työarkit näihin täydentäviin generaattoreihin.',
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
        slug: 'yhteenlasku-tyoarkit',
        name: 'Yhteenlasku',
        category: 'Matematiikka',
        icon: '➕',
        description: 'Yhdistä logiikkapulmat perinteisiin yhteenlaskutehtäviin kattavaan laskuharjoitteluun. Oppilaat ratkaisevat ensin kuvamuuttujia ja sitten soveltavat taitoja tavallisiin yhteenlaskuihin.',
      },
      {
        id: '2',
        slug: 'vahennyslasku-tyoarkit',
        name: 'Vähennyslasku',
        category: 'Matematiikka',
        icon: '➖',
        description: 'Yhdistä vähennyslaskutehtävät matematiikkapulmiin, jotka sisältävät vähennyslaskuoperaatioita. Oppilaat harjoittelevat samoja taitoja eri muodoissa.',
      },
      {
        id: '3',
        slug: 'matematiikkapulmat-tyoarkit',
        name: 'Matematiikkapulmat',
        category: 'Logiikka',
        icon: '🧩',
        description: 'Laajenna matemaattista päättelyä lisäpulmamuodoilla mukaan lukien lukuruudukot ja yhtälösokkelo. Eri pulmaformaatit kehittävät joustavaa ongelmanratkaisua.',
      },
      {
        id: '4',
        slug: 'kuviotehtava-tyoarkit',
        name: 'Kuviotehtävät',
        category: 'Logiikka',
        icon: '🔁',
        description: 'Kehitä samoja loogisen päättelyn taitoja kuvapulmissa käytettyinä. Kuvioiden tunnistaminen ja jatkaminen vahvistaa matemaattista hahmontunnistusta.',
      },
      {
        id: '5',
        slug: 'sudoku-tyoarkit',
        name: 'Sudoku',
        category: 'Logiikka',
        icon: '🧠',
        description: 'Täydennä kuvapulmia sudoku-tehtävillä, jotka kehittävät loogista päättelyä ja deduktiotaitoja samankaltaisessa visuaalisessa kontekstissa.',
      },
      {
        id: '6',
        slug: 'kuva-yhteenlasku-tyoarkit',
        name: 'Kuva-yhteenlasku',
        category: 'Matematiikka',
        icon: '🔑',
        description: 'Kuva-yhteenlaskutehtävät käyttävät samanlaista konseptia, jossa oppilaat ratkaisevat yhteenlaskutehtäviä koodatakseen piilotettuja viestejä. Molemmat muodot yhdistävät laskemisen ja ongelmanratkaisun.',
      },
    ]
    
  },

  // -- SEO & Content Enrichment (Part 174) ------------------------------------

  aiOverviewSnippet: 'Matematiikkapulmageneraattori luo tulostettavia logiikkapulmia, joissa kuvasymbolit edustavat piilotettuja lukuja yhtaloissa. Oppilaat analysoivat visuaalisia yhttaloita, paaatttelevat kunkin kuvan arvon ja ratkaisevat tehtavat. Opettajat valitsevat neljan vaikeustason ja teemakuvat 3000+ kirjastosta ja lataavat valmiin PDF:n vastausavaimineen.',

  comparisonTable: [
    {
      feature: 'Tehtävämuoto',
      ourApp: 'Visuaaliset logiikkapulmat kuvamuuttujilla',
      typical: 'Tavalliset numeroyhtälöt',
    },
    {
      feature: 'Vaikeustasot',
      ourApp: '4 tasoa: erittäin helposta vaikeaan',
      typical: '1–2 kiinteää tasoa',
    },
    {
      feature: 'Kuvakirjasto',
      ourApp: '3000+ teemakuvaa muuttujina',
      typical: 'Ei visuaalista tukea',
    },
    {
      feature: 'Operaatiot',
      ourApp: 'Yhteenlasku, vähennyslasku tai sekamuoto',
      typical: 'Vain yksi operaatio',
    },
    {
      feature: 'Vastausavaimet',
      ourApp: 'Automaattisesti kuvaratkaisuineen',
      typical: 'Manuaalinen luonti',
    },
    {
      feature: 'Kaupallinen käyttö',
      ourApp: 'Myyntilisenssi sisältyy',
      typical: 'Lisälisenssimaksu',
    },
  ],

  researchBacking: [
    {
      claim: 'Kuvallisten esitysten kayttoo matemaattisina muuttujina kehittaa varhaista algebrallista paattelya ilman muodollisen symboliikan aiheuttamaa kognitiivista kuormitusta.',
      source: 'Leino, K. et al., "Matemaattinen ajattelu ja ongelmanratkaisu perusopetuksessa," Koulutuksen tutkimuslaitos, Jyvaskyla',
    },
    {
      claim: 'Pulmapohjainen oppiminen lisaa oppilaiden sitoutumista ja motivaatiota erityisesti niilla oppilailla, jotka vastustavat perinteisia mekaanisia harjoituksia.',
      source: 'Hannula, M., "Motivaatio ja matematiikan oppiminen," Turun yliopisto',
    },
  ],

  teacherTestimonials: [
    {
      quote: 'Kuvapulmat esittelivat algebrallisen ajattelun ekaluokkalaisilleni ilman etta he edes tajusivat opetteleevansa algebraa. Oppilaat pyytavat lisaa pulmia joka tunti.',
      name: 'Laura Nieminen',
      role: '2. luokan opettaja',
      school: 'Ruusulan koulu, Turku',
    },
    {
      quote: 'Minulla on oppilaita, jotka kieltaytyivat tekemasta tavallisia matematiikkatehtavia mutta pyytavat nyt innokkaasti lisaa pulmia. Visuaalinen muoto muutti heidaan asenteensa matematiikkaa kohtaan.',
      name: 'Pekka Savolainen',
      role: 'Matematiikan opettaja',
      school: 'Rantalan koulu, Oulu',
    },
  ],

  tips: {
    sectionTitle: 'Matematiikkapulmastrategiat luokka-asteittain',
    sectionDescription: 'Saada matematiikkapulmageneraattori oikeaan haasteeseen kullekin kehitysvaiheelle. Nain valitset vaikeustason, operaatiot ja lukualueen esiopetuksesta kolmanteen luokkaan.',
    items: [
      {
        id: 'esikoulu',
        icon: '🌱',
        title: 'Esikoulu: Tutustu pulmiin opettajajohtoisesti',
        description: 'Kaytta erittain helppoja kahden symbolin pulmia luvuilla 1–10. Esittele pulmien ratkaisuprosessi koko luokan harjoituksena. Ohjaa oppilaita paattelemaan kuvasymbolien arvoja yhdessa. Toiminnallinen lahestymistapa POPS 2014 tavoitteen T1 mukaisesti.',
      },
      {
        id: 'esiopetus',
        icon: '🎒',
        title: 'Esiopetus: Kahden symbolin yhteenlasku',
        description: 'Luo helppoja kahden symbolin pulmia pelkilla yhteenlaskuilla ja luvuilla 1–10. Oppilaat ratkaisevat itsenaisesti kun prosessi on tuttu. Kaytta 1–2 pulmaa sivulla selkeyden vuoksi. Visuaaliset pulmat tukevat POPS 2014 matematiikan tavoitetta T2.',
      },
      {
        id: '1-luokka',
        icon: '📚',
        title: '1. luokka: Kolme symbolia ja yhteenlasku',
        description: 'Siirry kolmen symbolin pulmiin pelkilla yhteenlaskuilla ja luvuilla 1–15. Oppilaat kehittavat jarjestelmallista paattelystrategiaa. Kaytta 2–4 pulmaa sivulla.',
      },
      {
        id: '2-luokka',
        icon: '✏️',
        title: '2. luokka: Sekaoperaatiot ja laajempi lukualue',
        description: 'Esittele yhteen- ja vahennyslasku samoissa pulmissa lukualueella 1–20. Oppilaat oppivat joustavaa laskemista ja kasien kaanteisoperaatioita. Normaali vaikeustaso sopii useimmille toisluokkalaisille.',
      },
      {
        id: '3-luokka',
        icon: '🎯',
        title: '3. luokka: Nelja symbolia ja haastepulmat',
        description: 'Kaytta vaikeita neljan symbolin sekaoperaatiopulmia lukualueella 1–50. Oppilaat kirjoittavat paattelyketjunsa yloes. POPS 2014 vuosiluokkien 3–6 tavoitteen T1 mukaista matemaattisen ajattelun vahvistamista.',
      },
    ],
  },
};

export default mathWorksheetsFiContent;
