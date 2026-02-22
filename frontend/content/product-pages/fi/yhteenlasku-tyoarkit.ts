import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Addition Worksheets - Finnish Content (Yhteenlasku Tehtävät)
 *
 * File: frontend/content/product-pages/fi/yhteenlasku-tyoarkit.ts
 * URL: /fi/apps/yhteenlasku-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/addition.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const additionFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'yhteenlasku-tyoarkit',
    appId: 'addition',
    title: 'Ilmainen Yhteenlasku Generaattori | LessonCraftStudio',
    description: 'Luo tulostettavia yhteenlaskutehtäviä kuvilla esikoulusta 3. luokalle. 3 000+ kuvan kirjasto, muokattavat asetukset ja vastausavaimet. Lataa PDF heti.',
    keywords: 'yhteenlasku generaattori, summa laskeminen, muistinumero yhteenlasku, paikka-arvo harjoitus, lukujono harjoittelu, peruslaskutoimitukset, matemaattinen ajattelu, laskustrategia esikoulu, kymmenjärjestelmä oppiminen, luvun hajoittaminen, laskusujuvuus harjoitus, yhteenlasku tehtävät tulostettava, yhteenlaskuharjoitukset esikoulu',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/yhteenlasku-tyoarkit',
  },

  // Hero Section - FULL text from Finnish addition.md
  hero: {
    title: 'Yhteenlaskutehtävien Generaattori',
    subtitle: 'Luo Kuvapohjaisia Yhteenlaskuharjoituksia Esikoulusta 3. Luokalle',
    description: `Luo ammattimaisia yhteenlaskun tehtäviä kuvilla yhteenlaskugeneraattorillamme. Peruspaketti-tilauksesi antaa sinulle rajattoman tehtävien luonnin ilman maksuja per tehtävä. Generoi tulostettavia matematiikka tehtävät alakoulu ja esiopetus materiaali ilmainen -oppilaille. Lataa korkealaatuisia PDF-tehtäviä alle 3 minuutissa.

Yhteenlaskun tehtävätyökalu tekee matematiikan oppimisesta visuaalista ja hauskaa. Luo yhteenlaskutehtäviä käyttäen yli 3000 lapsystävällistä kuvaa. Valitse eläinten, ruoan, lelujen tai kouluvälineiden kuvista. Jokainen yhteenlaskun tehtävä on täysin mukautettavissa. Muokkaa kaikkea pohjasta, reunoista ja tekstiin.

Generaattori luo sekä oppilaiden työarkin että opettajan vastausavaimen. Valitse 1-10 tehtävää per työarkki. Säädä vaikeustasoa muuttamalla esineiden määrää ryhmissä. Minimi 1 esine ja maksimi 10 esinettä per ryhmä. Neljä erilaista tehtävätyyppiä sopivat kaikille oppijatasoille.

Kuva-kuva -tila näyttää yhteenlaskut pelkillä kuvilla. Kuva-numero -tila yhdistää kuvat numeroihin. Puuttuva yhteenlaskettava -tila opettaa käänteistä ajattelua. Sekoitettu tila tarjoaa vaihtelua yhdessä työarkissa. Jokainen tila tukee erilaista oppimistyyliä ja kehitysvaihetta.`,
    previewImageSrc: '/samples/finnish/addition/sample-1.jpeg',
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
        videoId: '6O5aCzHkh8M',
        buttonText: 'Yhteenlasku-toiminnot',
        modalTitle: 'Yhteenlasku-opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/addition/
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

  // Features Grid - FULL text from Finnish addition.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Yhteenlaskun tehtävägeneraattori tarjoaa kaikki työkalut tulostettavat tehtävät lapsille ilmainen luontiin. Luo yhteenlasku ja vähennyslasku tehtävät minuuteissa. Jokainen ominaisuus on suunniteltu säästämään aikaa ja parantamaan oppimistuloksia. Peruspaketti-tilauksesi antaa täyden pääsyn kaikkiin näihin ammattimaisen tason työkaluihin.',
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
        title: 'Nelja tehtavatyyppia visuaaliseen laskemiseen',
        description: 'Valitse neljästä tehtävätyypistä: kuva+kuva, kuva+numero, puuttuva yhteenlaskettava ja sekamuoto. Kuva+kuva sopii konkreettisen vaiheen oppijoille. Puuttuvan yhteenlaskettavan etsintä kehittää algebrallista ajattelua.',
      },
      {
        id: '2',
        icon: '🖼️',
        title: 'Yli 3000 teemakuvaa laskutehtaviin',
        description: 'Selaa yli 3000 lapsiystavallista kuvaa teemoittain: elaimet, kulkuneuvot, ruoka, lelut ja kymmenia muita kategorioita. Valitse teema tai yksittaiset kuvat vastaamaan opetussuunnitelman aihealuetta. Kaikki kuvat soveltuvat esiopetukseen ja alakouluun.',
      },
      {
        id: '3',
        icon: '📊',
        title: 'Saadettava vaikeustaso ja lukualue',
        description: 'Aseta yhteenlaskujen lukualue 1–20 ja tehtävien määrä sivua kohti 1–10. Esiopetuksen oppilaille summat 5:een asti ja 1–2 tehtävää sivulla. Kolmasluokkalaisille kaikki yhteenlaskufaktat ja 8–10 tehtävää sivulla.',
      },
      {
        id: '4',
        icon: '✅',
        title: 'Automaattiset vastausavaimet',
        description: 'Jokainen yhteenlaskutehtävä generoi automaattisesti vastausavaimen, jossa kaikki oikeat vastaukset näkyvät selkeästi. Opettajat tarkistavat oppilastyöt sekunneissa. Tulosta vastausavaimet erikseen itsetarkistuspisteille.',
      },
      {
        id: '5',
        icon: '🎨',
        title: 'Taustakuvat ja koristeelliset kehykset',
        description: 'Valitse kymmenistä taustamuodoista kuten liitutaulu, ruutuvihko, sateenkaari ja vuodenaikaisuunnittelu. Lisää koristeellisia kehyksiä tähdin, sydamin tai koulutarvikkein. Ammattimainen ulkoasu lisää oppilaiden sitoutumista.',
      },
      {
        id: '6',
        icon: '📤',
        title: 'Omien kuvien lataus',
        description: 'Lataa rajattomasti omia kuvia luodaksesi henkilökohtaisia yhteenlaskutehtäviä. Käytä luokkahuonekuvia, oppilaiden piirustuksia tai opetussuunnitelmaan sopivia kuvia. Yhdistä omia kuvia 3000+ kuvakirjaston kanssa.',
      },
      {
        id: '7',
        icon: '💼',
        title: 'Kaupallinen lisenssi myyntiin',
        description: 'Tilauksesi sisältää kaupalliset oikeudet myydä luomiasi yhteenlaskutehtäviä verkossa. Luo teemapaketteja ja myy niitä digitaalisina latauksina. Ei attribuutiovaatimuksia eikä ylimääräisiä lisenssimaksuja.',
      },
      {
        id: '8',
        icon: '🌍',
        title: '11 kielen tuki',
        description: 'Luo yhteenlaskutehtäviä 11 kielellä. Täydellinen monikielisille luokkahuoneille ja S2-opetukseen. Käyttöliittymän kieli ja tehtävän kieli vaihtuvat itsenäisesti. Vaihda kielen välillä yhdellä klikkauksella.',
      },
    ]
    
  },

  // How-To Guide - FULL text from Finnish addition.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Yhteenlaskutehtävien luominen vie alle 3 minuuttia alusta loppuun. Seuraa näitä viittä yksinkertaista vaihetta. Ei suunnittelukokemusta tarvita. Ei monimutkaista ohjelmistoa opittavaksi. Jokainen vaihe on selkeä ja intuitiivinen. Peruspaketti-tilauksesi antaa välittömän pääsyn kaikkiin työkaluihin.',
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
        description: `Aloita valitsemalla kuvat yhteenlaskutehtävillesi. Klikkaa "Kuvakirjasto" -välilehteä sivupaneelissa. Näet pudotusvalikon yli 50 teemalla. Valitse teema nähdäksesi kaikki sen kategorian kuvat. Eläimet, ruoka, koulu, lelut, ajoneuvot ja paljon muuta.

Klikkaa yksittäisiä kuvia valitaksesi ne. Valitut kuvat näkyvät "Valitut kuvat ongelmille" -alueella. Tarvitset yhden kuvan per yhteenlaskutehtävä. Jos luot 6 tehtävää, valitse 6 kuvaa. Laskuri näyttää: "Valittu: 6 / 6". Poista kuva klikkaamalla sitä uudestaan.

Hakutoiminto nopeuttaa kuvien löytämistä. Kirjoita hakukenttään "kissa" tai "auto". Generaattori suodattaa kuvat avainsanan mukaan. Nopeampi kuin selaaminen satojen kuvien läpi. Matematiikka tehtävät alakoulu -luonti alkaa oikeilla kuvilla.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetuksia',
        description: `Avaa "Tehtävien Konfigurointi" -välilehti. Valitse tehtävätila pudotusvalikosta. Neljä vaihtoehtoa: Kuva + Kuva, Kuva + Numero, Etsi Yhteenlaskettava, Sekoitettu tila. Kuva + Kuva sopii esiopetukseen. Kuva + Numero sopii alakoulun 1. luokalle. Etsi yhteenlaskettava haastavampi vanhemmille oppilaille.

Aseta tehtävien määrä. Liukusäädin 1-10 tehtävää. Aloittelijat tarvitsevat 3-4 tehtävää. Edistyneet oppilaat voivat tehdä 8-10 tehtävää. Säädä vaikeustasoa oppilaiden ikätason mukaan. Matematiikka tehtävät alakoulu vaativat enemmän tehtäviä kuin esiopetus materiaali ilmainen.

Säädä esineiden määrää ryhmissä. Minimi 1 esine, maksimi 10 esinettä. Aloittelijoille aseta min=1, max=3. Edistyneille oppijoille aseta min=3, max=10. Pienempi määrä = helpompi. Suurempi määrä = vaikeampi. Yhteenlasku ja vähennyslasku tehtävät mukautuvat jokaiselle tasolle.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi Työarkkisi',
        description: `Avaa "Sivun Asetus" -välilehti ennen generointia. Valitse sivukoko pudotusvalikosta. Letter Portrait (US-standardi), A4 Portrait (kansainvälinen), tai Landscape-versiot. Square-koko sosiaaliseen mediaan. Mukautettu koko erityistarpeisiin.

Valitse taustan teema jos haluat. Klikkaa "Taustan Teema" -pudotusvalikkoa. Valitse teema nähdäksesi esikatselun. Klikkaa taustakuvaa valitaksesi sen. Säädä taustan läpinäkyvyyttä liukusäätimellä. Sama prosessi reunateemoille. Tulostettavat tehtävät lapsille ilmainen näyttävät ammattimaisilta taustoilla ja reunoilla.

Klikkaa "Generoi" -painiketta. Generaattori luo yhteenlaskutehtäväsi välittömästi. Näet esikatselun pääpohjalla. Jokainen tehtävä asemoituu automaattisesti. Kuvat skaalautuvat oikeaan kokoon. Tekstit tasataan kauniisti. Matematiikka tehtävät alakoulu -työarkki on valmis muutamassa sekunnissa.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Pohjalla',
        description: `Jokainen elementti pohjalla on klikattavissa ja muokattavissa. Klikkaa mitä tahansa kuvaa valitaksesi sen. Raahaa kuvaa uuteen paikkaan hiirellä. Kierrä kuvaa kulmakahvoilla. Skaalaa kuvaa koon muuttamiseksi. Paina Delete poistaaksesi elementin kokonaan.

Lisää tekstiä klikkaamalla "Tekstityökalut" -välilehteä. Kirjoita sisältö tekstikenttään. Klikkaa "Lisää Teksti". Teksti ilmestyy pohjan keskelle. Raahaa se haluttuun paikkaan. Säädä fonttikokoa numerokentällä. Valitse seitsemän fontin väliltä pudotusvalikosta.

Muuta tekstin väriä värivalitsimella. Lisää tekstin ääriviiva erottumiseen. Säädä ääriviivan leveyttä 0-10 pikseliä. Täydellinen otsikkojen lisäämiseen. Täydellinen mukautettujen ohjeiden kirjoittamiseen. Esiopetus materiaali ilmainen -työarkit hyötyvät selkeistä ohjeista.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta',
        description: `Klikkaa "Lataa" -pudotusvalikkonappia. Neljä latausvaihtoehtoa näkyy. "Työarkki (JPEG)" lataa oppilaan version kuvana. "Vastausavain (JPEG)" lataa opettajan version kuvana. "Työarkki (PDF)" lataa oppilaan version asiakirjana. "Vastausavain (PDF)" lataa opettajan version asiakirjana.

PDF-formaatti sopii parhaiten tulostukseen. JPEG-formaatti sopii digitaaliseen jakamiseen. Molemmat formaatit viedään 300 DPI resoluutiolla. Täydellinen tulostamiseen kotitulostimella. Täydellinen tulostamiseen ammattilaispainopalvelulla. Yhteenlasku ja vähennyslasku tehtävät näyttävät ammattimaisilta joka kerta.

Valitse "Harmaasävy" -valintaruutu ennen lataamista. Muuntaa värilliset tehtävät mustavalkoisiksi. Säästää mustetta tulostuksessa. Säästää rahaa kotitulostuksessa. Ympäristöystävällinen valinta kouluille. Esiopetus materiaali ilmainen -työkalut tukevat kustannustehokasta tulostusta.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish addition.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Yhteenlaskutehtävägeneraattori palvelee erilaisia käyttäjäryhmiä koulutusjärjestelmän läpi. Esiopetuksen opettajista alakoulun opettajiin. Kotiopettajista erikoisopettajiin. Jokainen ryhmä hyötyy mukautetuista matematiikka tehtävät alakoulu -työkaluista. Peruspaketti-tilaus antaa kaikille pääsyn samoihin ammattimaisiin ominaisuuksiin.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Esiopetuksen opettajat',
        subtitle: 'Kuvapohjaiset yhteenlaskut 5–6-vuotiaille',
        description: 'Luo visuaalisia yhteenlaskutehtäviä, joissa oppilaat laskevat kuvia summan löytämiseksi. Kuva+kuva-muoto tukee konkreettista laskemista. Summat 5:een asti ja 1–2 tehtävää sivulla. Täydellinen POPS 2014 matematiikan tavoitteen T2 tukemiseen.',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun opettajat',
        subtitle: 'Laskusujuvuuden kehittäminen 1.–3. luokalle',
        description: 'Hyödynnä neljää tehtävätyyppiä progressiiviseen oppimiseen: kuva+kuva syksyllä, kuva+numero talvella, puuttuva yhteenlaskettava keväällä. Eriytä tehtäviä vaikeustason ja tehtävätyypin mukaan.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat ja vanhemmat',
        subtitle: 'Joustavia tehtäviä useille luokka-asteille',
        description: 'Luo eri vaikeustason tehtäviä kaikille lapsillesi yhdellä tilauksella. Henkilökohtaista tehtäviä lataamalla perhekuvia tai lemmikkejä. Oppilaat sitoutuvat enemmän tuttujen kuvien kanssa.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'S2-opettajat',
        subtitle: 'Kielirajat ylittävä matematiikan harjoittelu',
        description: 'Kuvapohjaiset tehtävät mahdollistavat matematiikan harjoittelun ilman kielitaitovaatimuksia. Luo tehtäviä oppilaan kotikielellä ensin ja siirry asteittain suomeen. 11 kielen tuki kattaa yleisimmät kotikielet.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Yksilöllistetyt tehtävät oppimisen tukeen',
        description: 'Säädä tehtävien määrää, lukualuetta ja tehtävätyyppiä HOJKS-tavoitteiden mukaisesti. Luo selkeitä tehtäviä vähemmillä elementeillä prosessointikuorman keventämiseksi. Visuaaliset tehtävät tukevat erilaisia oppijoita.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy matematiikkapaketteja kaupallisella lisenssillä',
        description: 'Luo teemallisia yhteenlaskupaketteja myyntiin verkossa. Matematiikkatehtävät ovat jatkuvasti suosituimpia oppimateriaalikauppojen tuotteita. Yhteenlaskutehtäväpaketit 10–20 tehtävää per paketti myyvät hyvin.',
      },
    ]
    
  },

  // FAQ Section - Selected FAQs from Finnish addition.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'Yleisimmät kysymykset yhteenlaskutehtävägeneraattorista ja matematiikkatyöarkeista.',
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
        question: 'Mitka tehtavatyypit ovat saatavilla yhteenlaskutehtaviin?',
        answer: 'Generaattori tarjoaa neljä tehtävätyyppiä: kuva+kuva näyttää kuvat molemmista luvuista, kuva+numero yhdistää kuvia ja numeroita, puuttuva yhteenlaskettava luo täytä-aukkotehtäviä, ja sekamuoto yhdistää eri tyyppejä samalle sivulle.',
      },
      {
        id: '2',
        question: 'Miten saadan vaikeustasoa yhteenlaskutehtavissa?',
        answer: 'Säädä lukualuetta 1–20, valitse tehtävien määrä sivua kohti (1–10) ja valitse tehtävätyyppi. Esiopetukseen sopii kuva+kuva summilla 5 asti. Kolmasluokkalaisille käytä sekamuotoa summilla 20 asti ja 8–10 tehtävää sivulla.',
      },
      {
        id: '3',
        question: 'Sisaltavatko yhteenlaskutehtavat vastausavaimet?',
        answer: 'Kyllä, jokainen tehtävä generoi automaattisesti vastausavaimen, jossa kaikki oikeat vastaukset näkyvät selkeästi. Tulosta vastausavaimet erikseen tai näytä dokumenttikameralla luokan yhteiseen tarkistukseen.',
      },
      {
        id: '4',
        question: 'Mille ikarryhmille yhteenlaskutehtavat sopivat?',
        answer: 'Yhteenlaskutehtävät palvelevat 4–9-vuotiaita. Esikouluikäiset harjoittelevat summia 5 asti kuvilla. Esiopetuksen oppilaat hallitsevat summat 10 asti. 1.–2. luokan oppilaat kehittävät laskusujuvuutta summiin 20 asti. 3. luokan oppilaat vahvistavat automaattista faktojen muistamista.',
      },
      {
        id: '5',
        question: 'Voiko tehtavia luoda 11 kielella?',
        answer: 'Kyllä, generaattori tukee 11 kieltä mukaan lukien suomi, ruotsi, norja ja tanska. Käyttöliittymän kieli ja tehtävän sisältökieli vaihtuvat itsenäisesti. Luo suomenkielisiä tehtäviä monikielisille luokkahuoneille.',
      },
      {
        id: '6',
        question: 'Tarvitaanko suunnitteluosaamista tehtavien luomiseen?',
        answer: 'Ei tarvita mitään suunnittelutaitoja. Generaattori hoitaa asettelun ja muotoilun automaattisesti. Valitse kuvat ja asetukset, klikkaa generoi, ja ammattimainen tehtävä ilmestyy välittömästi. Useimmat opettajat oppivat käyttämään generaattoria alle 10 minuutissa.',
      },
      {
        id: '7',
        question: 'Voinko ladata omia kuvia yhteenlaskutehtaviin?',
        answer: 'Kyllä, lataa rajattomasti omia kuvia luodaksesi henkilökohtaisia tehtäviä. Käytä luokkahuonekuvia, retk ikuvia tai lemmikkikuvia. Yhdistä omia kuvia 3000+ kuvakirjaston kuvien kanssa samalla tehtävällä.',
      },
      {
        id: '8',
        question: 'Miten yhteenlaskutehtavat tukevat POPS 2014 tavoitteita?',
        answer: 'Tehtävät tukevat suoraan POPS 2014 matematiikan tavoitteita T2 (lukumäärän ja laskemisen ymmärrys) ja T3 (sujuvuus yhteen- ja vähennyslaskussa). Kuvapohjaiset tehtävät konkretisoivat matemaattisia käsitteitä POPS 2014 toiminnallisen oppimisen periaatteiden mukaisesti.',
      },
      {
        id: '9',
        question: 'Kuinka kauan yhden tehtavan luominen kestaa?',
        answer: 'Yhden yhteenlaskutehtävän luominen vie alle 3 minuuttia. Valitse kuvat 30 sekunnissa, määritä asetukset 30 sekunnissa, generoi tehtävä 10 sekunnissa. Luo 10–20 tehtävää 30 minuutissa.',
      },
      {
        id: '10',
        question: 'Voinko myydaa luomiani yhteenlaskutehtavia?',
        answer: 'Kyllä, tilauksesi sisältää kaupallisen lisenssin. Myy tehtäviä verkossa ilman attribuutiovaatimuksia tai lisämaksuja. Monet opettajat ansaitsevat lisätuloja myymällä teemallisia matematiikkapaketteja.',
      },
      {
        id: '11',
        question: 'Miten harmaasavyvaihtoehto toimii?',
        answer: 'Aktivoi harmaasävyvaihtoehto ennen lataamista muuntaaksesi värilliset kuvat mustavalkoisiksi. Tehtävät tulostuvat selkeästi säästäen värimustetta merkittävästi. Tämä säästää tulostuskustannuksia erityisesti suurissa erissä.',
      },
      {
        id: '12',
        question: 'Mita kuvaformaatteja voi ladata?',
        answer: 'Lataa kuvia JPEG-, PNG- ja GIF-muodossa. Lataa useita tiedostoja kerralla nopeampaan työnkulkuun. Kaikki yleisimmät kuvaformaatit ovat tuettuja. Lataamasi kuvat yhdistyvät saumattomasti 3000+ kuvakirjaston kanssa.',
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä yhteenlasku työarkit näihin täydentäviin generaattoreihin.',
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
        slug: 'vahennyslasku-tyoarkit',
        name: 'Vähennyslasku',
        category: 'Matematiikka',
        icon: '➖',
        description: 'Yhdistä yhteenlasku- ja vähennyslaskutehtävät kattavaan lukukasiteen kehittämiseen. Oppilaat harjoittelevat molempia peruslaskutoimituksia samoilla teemakuvilla.',
      },
      {
        id: '2',
        slug: 'varityskuvat-tyoarkit',
        name: 'Värityskuvat',
        category: 'Taide ja luovuus',
        icon: '🎨',
        description: 'Yhdistä yhteenlaskutehtävät värityskuviin palkitseviksi oppimispaketeiksi. Oppilaat ratkaisevat laskutehtäviä ja palkitaan väritettävällä sivulla.',
      },
      {
        id: '3',
        slug: 'sananhaku-tyoarkit',
        name: 'Sanahaku',
        category: 'Äidinkieli',
        icon: '🔍',
        description: 'Yhdistä yhteenlaskutehtävät sanahakutehtäviin integroituihin oppimispaketteihin. Oppilaat harjoittelevat sekä matematiikkaa että lukemista aamutyöskentelyn aikana.',
      },
      {
        id: '4',
        slug: 'aakkosjuna-tyoarkit',
        name: 'Aakkosjuna',
        category: 'Varhaiskasvatus',
        icon: '🚂',
        description: 'Yhdistä yhteenlaskutehtävät aakkosharjoituksiin esiopetuksen kokonaisiin oppimispaketteihin. Nuorimmat oppijat tarvitsevat sekä varhaista matematiikkaa että lukutaitoa.',
      },
      {
        id: '5',
        slug: 'matematiikkapulmat-tyoarkit',
        name: 'Matematiikkapulmat',
        category: 'Logiikka',
        icon: '🧩',
        description: 'Matematiikkapulmat haastavat oppilaita soveltamaan yhteenlaskufaktoja ongelmanratkaisukonteksteissa. Luo lukuruudukoita, joissa oppilaat täyttävät puuttuvat yhteenlaskettavat.',
      },
      {
        id: '6',
        slug: 'viivojen-piirtaminen-tyoarkit',
        name: 'Viivojen piirtäminen',
        category: 'Hienomotoriikka',
        icon: '✏️',
        description: 'Viivojen piirtämistehtävät kehittävät kynäotetta ja silmä-käsi-koordinaatiota, jotka ovat tärkeitä numeroiden kirjoittamisessa. Yhdistä piirtamistehtävät ennen yhteenlaskuharjoittelua.',
      },
    ]
    
  },

  // -- SEO & Content Enrichment (Part 174) ------------------------------------

  aiOverviewSnippet: 'Yhteenlaskutehtavageneraattori on verkkotyokalu, jolla luodaan tulostettavia matematiikkatehtavia mukautettavilla yhteenlaskutehtavilla, visuaalisilla laskuapuvalineilla ja automaattisilla vastausavaimilla. Opettajat valitsevat vaikeustason, kuvateemat ja tehtavatyypit ja tuottavat valmiin PDF-tehtavan alle 3 minuutissa.',

  comparisonTable: [
    {
      feature: 'Mukautettava vaikeustaso',
      ourApp: '4 tehtävätyyppiä, lukualue 1–20',
      typical: 'Kiinteät vaikeustasot',
    },
    {
      feature: 'Visuaaliset tehtävät',
      ourApp: '3000+ teemakuvaa',
      typical: 'Vain numerotehtävät tai peruskuvitus',
    },
    {
      feature: 'Vastausavaimet',
      ourApp: 'Automaattisesti joka tehtävään',
      typical: 'Usein lisämaksullisia',
    },
    {
      feature: 'Luontiaika',
      ourApp: 'Alle 3 minuuttia per tehtävä',
      typical: '30–60 minuuttia per tehtävä',
    },
    {
      feature: 'Kaupallinen lisenssi',
      ourApp: 'Sisältyy, myy vapaasti',
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
      claim: 'Visuaaliset matemaattisten kasitteiden esitykset parantavat merkittavasti oppilaiden ymmarrysta yhteenlaskuoperaatioista, erityisesti esiopetuksen ja alakoulun oppilailla konkreetista abstraktiin siirtyessa.',
      source: 'Aunio, P. & Rasanen, P., "Matemaattisten taitojen kehitys ja tukeminen," NMI-bulletin',
    },
    {
      claim: 'Vaihtelevat harjoitusmuodot ja hajautettu kertaus eri tehtavatyypeilla tuottavat vahvemman laskusujuvuuden kuin toistuva mekaaninen harjoittelu.',
      source: 'Kinnunen, R. & Vauras, M., "Oppimisen tukeminen matematiikassa," Turun yliopisto',
    },
  ],

  teacherTestimonials: [
    {
      quote: 'Esiopetuksen oppilaani siirtyivat peruslaskuista luottavaiseen yhteenlaskuun viikossa. Kuvapohjaiset tehtavat tekevat abstrakteista kasitteista konkreettisia visuaalisille oppijoille.',
      name: 'Paivi Makinen',
      role: 'Esiopetuksen opettaja',
      school: 'Metasalan koulu, Espoo',
    },
    {
      quote: 'Luon erilaistetut yhteenlaskupaketit koko ekaluokan tiimille 20 minuutissa. Ennen samaan valmistelutyohon kului koko sunnuntai-iltapaiva.',
      name: 'Janne Laine',
      role: '1. luokan opettaja',
      school: 'Kallaveden koulu, Kuopio',
    },
  ],

  tips: {
    sectionTitle: 'Yhteenlaskustrategiat luokka-asteittain',
    sectionDescription: 'Saada yhteenlaskutehtavageneraattori kullekin kehitysvaiheelle sopivaksi. Nain valitset lukualueen, tehtavatyypin ja kuvien kayton esikoulusta kolmanteen luokkaan.',
    items: [
      {
        id: 'esikoulu',
        icon: '🌱',
        title: 'Esikoulu: Ryhma ja yhdista',
        description: 'Esittele yhteenlasku kahden pienen ryhman yhdistamisena. Aseta lukualue 1–5 ja 1–2 tehtavaa sivulla. Kaytta kuva+kuva-muotoa niin lapset laskevat kuvia molemmissa ryhmissa. Rakentaa yksi-yhteen vastaavuutta ja ryhman yhdistamisen kasitetta.',
      },
      {
        id: 'esiopetus',
        icon: '🎒',
        title: 'Esiopetus: Summat 10 asti visuaalisesti',
        description: 'Esiopetuksen oppilaat hallitsevat yhteenlaskufaktat 10 asti laskustrategioiden avulla. Aseta lukualue 1–10 ja 3–5 tehtavaa sivulla. Kaytta kuva+kuva-muotoa syyslukukaudella ja siirry kuva+numero-muotoon kevaalla.',
      },
      {
        id: '1-luokka',
        icon: '📚',
        title: '1. luokka: Laskusujuvuus ja paikanarvo',
        description: 'Ekaluokkalaiset kehittavat yhteenlaskusujuvuutta 20 asti ja alkavat ymmartaa paikanarvoa. Aseta lukualue 1–20 ja 5–8 tehtavaa sivulla. Vuorottele kuva+numero ja puuttuva yhteenlaskettava -muotojen valilla.',
      },
      {
        id: '2-luokka',
        icon: '✏️',
        title: '2. luokka: Paalaskenta ja muistinumero',
        description: 'Toisluokkalaiset harjoittelevat paalaskentastrategioita ja valmistautuvat monipaikkaiseen yhteenlaskuun. Kaytta sekamuotoa 6–10 tehtavalla sivulla. Oppilaat soveltavat hajoittamisstrategioita kuten kymmenen tekeminen.',
      },
      {
        id: '3-luokka',
        icon: '🎯',
        title: '3. luokka: Faktojen hallinta ja soveltaminen',
        description: 'Kolmasluokkalaiset saavuttavat automaattisen muistamisen kaikissa yksinumeroisissa yhteenlaskufaktoissa. Kaytta korkeinta vaikeustasoa 8–10 sekamuodon tehtavalla. Tehtavat toimivat lammittelyna ennen kertolaskutunteja POPS 2014 tavoitteen T4 mukaisesti.',
      },
    ],
  },
};

export default additionFiContent;
