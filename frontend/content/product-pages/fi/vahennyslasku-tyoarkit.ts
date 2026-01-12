import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Subtraction Worksheets - Finnish Content (Vähennyslasku Tehtävät)
 *
 * File: frontend/content/product-pages/fi/vahennyslasku-tyoarkit.ts
 * URL: /fi/apps/vahennyslasku-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/subtraction.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Full Access ($240/year) - Täysi Käyttöoikeus
 */

export const subtractionFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'vahennyslasku-tyoarkit',
    appId: 'subtraction',
    title: 'Vähennyslasku Tehtävät Alakoulu | Tulostettavat Tehtävät Lapsille Ilmainen | Matematiikka Tehtävät',
    description: 'Luo ammattitason vähennyslasku tehtäviä kuva-aineiston avulla. Täysi Käyttöoikeus -tilauksesi mahdollistaa rajattoman tehtävien luomisen ilman yksittäisiä maksuja per tehtävä. Generoi tulostettavia vähennyslasku tehtäviä alakoulun ja esiopetuksen oppilaille.',
    keywords: 'vähennyslasku tehtävät, matematiikka tehtävät alakoulu, esiopetus materiaali ilmainen, tulostettavat tehtävät lapsille ilmainen, yhteenlasku ja vähennyslasku tehtävät, hienomotoriikka harjoitukset',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/vahennyslasku-tyoarkit',
  },

  // Hero Section - FULL text from Finnish subtraction.md
  hero: {
    title: 'Vähennyslasku Tehtävät',
    subtitle: 'Tulostettavat Matematiikka Tehtävät Alakoulu ja Esiopetus',
    description: `Luo ammattitason vähennyslasku tehtäviä kuva-aineiston avulla. Täysi Käyttöoikeus -tilauksesi mahdollistaa rajattoman tehtävien luomisen ilman yksittäisiä maksuja per tehtävä. Generoi tulostettavia vähennyslasku tehtäviä jotka sopivat täydellisesti alakoulun ja esiopetuksen oppilaille. Lataa laadukkaat PDF-tehtävät alle kolmessa minuutissa.

Vähennyslasku generaattorimme käyttää kuvapohjaista lähestymistapaa joka tekee matemaattisista käsitteistä konkreettisia lapsille. Oppilaiden on helpompi ymmärtää vähennyslaskun käsite kun he näkevät kuvia esineitä. Generaattori luo automaattisesti vastausavaimet jotka säästävät opettajien aikaa. Täysi Käyttöoikeus -tilaus sisältää kaupallisen lisenssin ja pääsyn kaikkiin 33 tehtävägeneraattoriin.

Vähennyslasku on perustaidoksi alakoulun matematiikan opetuksessa. Esiopetuksessa ja ensimmäisellä luokalla oppilaat aloittavat vähennyslaskun perusteiden oppimisen. Kuvat auttavat lapsia visualisoimaan vähennyslaskun käsitteen ennen siirtymistä abstrakteihin numeroihin. Tehtävägeneraattori tarjoaa neljä erilaista tehtävämuotoa jotka soveltuvat eri taitotasoille.`,
    previewImageSrc: '/samples/english/subtraction/cross out.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/subtraction/
  samples: {
    sectionTitle: 'Vähennyslasku Tehtävät Esimerkit',
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
        worksheetSrc: '/samples/english/subtraction/cross out.jpeg',
        answerKeySrc: '/samples/english/subtraction/cross out answer_key.jpeg',
        altText: 'Yliviivaa-muoto vähennyslaskutehtävä esiopetukseen konkreettisella visualisoinnilla',
        pdfDownloadUrl: '/samples/english/subtraction/cross out.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/subtraction/image number.jpeg',
        answerKeySrc: '/samples/english/subtraction/image number answer_key.jpeg',
        altText: 'Kuva ja numero -tila vähennyslaskutehtävä yhdistämään visuaalinen ja numeerinen esitys',
        pdfDownloadUrl: '/samples/english/subtraction/image number.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/subtraction/find subtrahend.jpeg',
        answerKeySrc: '/samples/english/subtraction/find subtrahend answer_key.jpeg',
        altText: 'Etsi vähentäjä -tehtävä ongelmanratkaisutaitojen kehittämiseen',
        pdfDownloadUrl: '/samples/english/subtraction/find subtrahend.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/english/subtraction/mixed.jpeg',
        answerKeySrc: '/samples/english/subtraction/mixed answer_key.jpeg',
        altText: 'Sekoitettu muoto vähennyslaskutehtävä monipuoliseen harjoitteluun',
        pdfDownloadUrl: '/samples/english/subtraction/mixed.pdf',
      },
    ],
  },

  // Features Grid - FULL text from Finnish subtraction.md feature sections
  features: {
    sectionTitle: 'Vähennyslasku Tehtävägeneraattorin Ominaisuudet - Kaikki Mitä Tarvitset Matematiikka Tehtävät Alakoulu Luomiseen',
    sectionDescription: 'Täysi Käyttöoikeus -tilaus antaa sinulle pääsyn kattavaan vähennyslasku tehtävien luomistyökaluun. Generaattori sisältää kaikki tarvittavat ominaisuudet ammattitason matematiikka tehtävien luomiseen. Jokainen ominaisuus on suunniteltu säästämään opettajien aikaa ja parantamaan oppilaiden oppimista.',
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
        title: 'Luo Vähennyslasku Tehtävät Kolmella Klikkauksella - Tulostettavat Tehtävät Lapsille Ilmainen',
        description: `Vähennyslasku tehtävien luominen on nopeaa ja helppoa. Valitse teeman kuvasto tai yksittäiset kuvat kirjastostamme. Klikkaa generoi-nappia ja tehtäväsi on valmis. Koko prosessi vie alle kolme minuuttia alusta loppuun.

Generaattori tarjoaa neljä erilaista tehtävämuotoa. Perinteinen "yliviivaa"-muoto sopii nuorimmille oppilaille. "Kuva - numero" -muoto yhdistää visuaalisen ja numeerisen esityksen. "Etsi vähentäjä" -muoto haastaa oppilaita ratkaisemaan puuttuvan luvun. Sekoitettu muoto yhdistelee eri tehtävätyyppejä monipuoliseen harjoitteluun.

Voit säätää tehtävien määrän yhdestä kymmeneen per tehtäväsivu. Vähennettävän maksimiluku on säädettävissä kahdesta kahteenkymmeneen. Tämä mahdollistaa tehtävien vaikeustason mukauttamisen oppilaan taitotasoon. Generaattori luo automaattisesti vastausavaimen jokaisen tehtäväsivun mukana.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Muokkaa Kaikkea Vähennyslasku Tehtäväsi Pohjalla - Täydellinen Muokattavuus Matematiikka Tehtävät Alakoulu',
        description: `Jokainen elementti tehtäväpohjalla on täysin muokattavissa. Raahaa kuvat haluamiisi paikkoihin hiirellä. Kierrä ja skaalaa elementtejä tarpeidesi mukaan. Poista tarpeettomat objektit yhdellä klikkauksella.

Tekstityökalut mahdollistavat ohjeiden ja otsikkojen lisäämisen. Valitse seitsemästä eri fontista joka sopii tehtäväsi tyyliin. Säädä fontin kokoa ja väriä luettavuuden parantamiseksi. Lisää tekstille reunus joka erottuu taustasta.

Tasaustyökalut auttavat elementtien järjestämisessä. Kohdista objektit vasempaan, keskelle tai oikeaan reunaan. Keskitä elementit pysty- tai vaakasuunnassa. Tuo elementtejä eteen tai lähetä taakse kerrosjärjestyksen hallintaan. Kumoa ja tee uudelleen -toiminnot mahdollistavat virheiden korjaamisen.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Lataa Omia Kuvia Vähennyslasku Tehtäviin - Personoidut Tulostettavat Tehtävät Lapsille Ilmainen',
        description: `Monilataus-ominaisuus mahdollistaa useiden tiedostojen lataamisen kerralla. Tuemme kaikkia yleisiä kuvaformaatteja mukaan lukien JPEG, PNG ja GIF. Yhdistä kirjaston kuvia omiin kuviisi ainutlaatuisten tehtävien luomiseksi.

Omat kuvat tekevät tehtävistä henkilökohtaisempia oppilaillesi. Lataa kuvia luokkahuoneen esineistä tai oppilaiden lempileluista. Käytä kausiluonteisia kuvia jotka liittyvät nykyiseen vuodenaikaan. Personoidut kuvat lisäävät oppilaiden motivaatiota ja sitoutumista.

Ladatut kuvat toimivat samalla tavalla kuin kirjaston kuvat. Raahaa, kierrä ja skaalaa niitä tehtäväpohjalla. Käytä niitä vähennyslaskuharjoituksissa yhtä helposti kuin valmiita kuvia. Tiedostot pysyvät selaimessasi kunnes poistat ne.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Vähennyslasku Tehtävät 11 Kielellä - Monikielinen Matematiikka Tehtävät Alakoulu Generaattori',
        description: `Kielivalikoima tukee kansainvälistä opetusta ja kaksikielistä koulutusta. Vaihda käyttöliittymän ja sisällön kieltä yhdellä klikkauksella. Tuemme suomea, englantia, saksaa, ranskaa, espanjaa, italiaa, portugalia, hollantia, tanskaa, ruotsia ja norjaa.

Kuvien tiedostonimet ovat käännetty kaikille kielille. Tämä on erityisen tärkeää sanastotehtävien luomisessa. Oppilaat oppivat matemaattisia käsitteitä omalla äidinkielellään. Monikielinen tuki tekee generaattorista ihanteellisen kansainvälisille kouluille.

Kielivalinta vaikuttaa myös kuvakirjaston teemojen nimiin. Etsi kuvia suomeksi käyttäen tuttuja termejä. Generaattori muuntaa automaattisesti termit valitulle kielelle. Tämä tekee kuvien löytämisestä nopeampaa ja intuitiivisempaa.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kaupallinen Lisenssi Vähennyslasku Tehtäville - Myy Tulostettavat Tehtävät Lapsille Ilmainen',
        description: `Täysi Käyttöoikeus -tilaus sisältää täyden print-on-demand kaupallisen lisenssin ilman lisäkuluja. Myy luomiasi tehtäviä Etsyssä, Teachers Pay Teachers -palvelussa tai Amazon KDP:ssä. Ei vaadita erillistä attribuutiota tai tekijänmainintaa.

300 DPI:n vientilaatuus takaa ammattimaiset tulosteet. Opettajayrittäjät voivat luoda ja myydä tehtäväpaketteja täydellä luottamuksella. Kaupallinen lisenssi on sisällytetty tilaukseesi ilman vuosittaisia lisämaksuja.

Kilpailijat veloittavat $100-200 vuodessa kaupallisista oikeuksista erikseen. Täysi Käyttöoikeus sisältää tämän $240 vuosihintaan yhdessä kaikkien 33 generaattorin kanssa. Säästät merkittävästi verrattuna erillisten lisenssien ostamiseen. Aloita opettajayrittäjyyden sivubisneksesi ilman suuria alkuinvestointeja.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Kuvakirjasto Vähennyslasku Tehtäviin - Laaja Matematiikka Tehtävät Alakoulu Valikoima',
        description: `Kuvakirjasto sisältää yli 3000 lapsiystävällistä kuvaa. Kuvat on järjestetty teemoittain helppoa selaamista varten. Valitse koko teema yhdellä klikkauksella tai selaa yksittäisiä kuvia. Hakutoiminto auttaa löytämään tietyt kuvat nopeasti.

Teemat kattavat kaikki alakoulun opetusaiheet. Eläinkuvat ovat suosittuja nuorimpien oppilaiden keskuudessa. Hedelmät ja vihannekset sopivat terveysaiheisiin tehtäviin. Kulkuneuvot, lelut ja kouluvälineet tarjoavat tuttujen esineiden tunnistamista.

Taustat ja reunukset sisältyvät kirjastoon ilman lisämaksuja. Kilpailijat veloittavat $1-5 per kuvapaketti tai kuukausimaksun. Täysi Käyttöoikeus sisältää kaikki visuaaliset materiaalit yhdessä tilaushinnassa. Säästät $200-400 vuodessa verrattuna kuva-alustapalveluihin.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Ammattimainen 300 DPI Laatu - Laadukkaat Tulostettavat Tehtävät Lapsille Ilmainen',
        description: `Korkearesoluutioinen vienti takaa täydellisen tulostusjäljen. 300 DPI on alan standardi ammattimaiselle painatukselle. Tehtävät näyttävät teräviltä ja selkeiltä sekä kotitulostimella että kaupallisessa painossa.

Lataa tehtävät JPEG- tai PDF-muodossa. PDF sopii parhaiten usean sivun tulostamiseen. JPEG on ihanteellinen yksittäisten kuvien jakamiseen digitaalisesti. Harmaasävy-vaihtoehto säästää mustetta kotitulostuksessa.

Vastausavaimet latautuvat automaattisesti tehtävän mukana. Ei tarvitse luoda erillistä dokumenttia vastausten tarkistamiseen. Opettajat säästävät aikaa kun arviointi on nopeampaa. Oppilaat voivat myös käyttää vastausavaimia itsenäiseen opiskeluun ja itsearvointiin.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from Finnish subtraction.md step sections
  howTo: {
    sectionTitle: 'Kuinka Luoda Vähennyslasku Tehtävät Viidessä Helpossa Vaiheessa - Tulostettavat Tehtävät Lapsille Ilmainen',
    sectionDescription: 'Vähennyslasku tehtävien luominen vie alle kolme minuuttia alusta loppuun. Seuraa näitä viittä yksinkertaista vaihetta ammattitason matematiikka tehtävien generoimiseksi. Ei tarvita suunnittelutaitoja tai teknistä osaamista. Generaattori hoitaa kaiken puolestasi automaattisesti.',
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
        title: 'Valitse Sisältö Vähennyslasku Tehtäviin - Matematiikka Tehtävät Alakoulu Teemoilla',
        description: `Aloita valitsemalla kuvat vähennyslaskuharjoituksiisi. Kolme vaihtoehtoa on saatavilla sisällön valintaan. Valitse koko teema kirjastostamme, selaa yksittäisiä kuvia tai lataa omia kuvia.

Teemat sisältävät yhteensopivia kuvia jotka sopivat hyvin yhteen. Eläinteemat ovat suosittuja alakoulun oppilaiden keskuudessa. Hedelmä- ja vihannesteemoja käytetään usein terveysaiheisiin oppitunteihin. Lelut ja kouluvälineet tarjoavat tuttuja esineitä joita lapset tunnistavat helposti.

Yksittäisten kuvien selaaminen antaa täyden hallinnan. Etsi tiettyjä kuvia hakutoiminnolla. Valitse tarkalleen ne kuvat jotka sopivat oppitunnin aiheeseen. Yhdistä kuvia eri teemoista ainutlaatuisten tehtävien luomiseksi.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetukset - Yhteenlasku ja Vähennyslasku Tehtävät Kaikille Tasoille',
        description: `Säädä tehtävien vaikeustaso oppilaidesi taitotasoon. Vähennettävän maksimiluku määrittää suurimman luvun josta vähennetään. Valitse kahdesta kahteenkymmeneen sopivan haasteen takaamiseksi. Esikoululaiset aloittavat usein luvuilla 1-5 kun taas tokan luokan oppilaat hallitsevat luvut 1-20.

Tehtävämuodon valinta vaikuttaa tehtävän tyyppiin. Perinteinen "yliviivaa"-muoto näyttää kuvia joista osa yliviivataan. Tämä on konkreettisin muoto nuorimmille oppilaille. "Kuva - numero" -muoto yhdistää kuvat ja numerot samassa laskutehtävässä.

"Etsi vähentäjä"-muoto haastaa oppilaita täyttämään puuttuvan luvun. Tämä kehittää ongelmanratkaisutaitoja ja matemaattista ajattelua. Sekoitettu muoto yhdistelee eri tehtävätyyppejä samalle sivulle. Monipuolinen harjoittelu pitää oppilaat kiinnostuneina.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi Tehtäväsi - Tulostettavat Tehtävät Lapsille Ilmainen Kolmessa Minuutissa',
        description: `Klikkaa generoi-nappia kun olet valinnut sisällön ja asetukset. Generaattori luo automaattisesti vähennyslaskuharjoituksia valitsemillasi kuvilla. Prosessi kestää vain muutaman sekunnin. Tehtäväsi ilmestyy välittömästi pohjalle.

Generaattori asettaa kuvat automaattisesti sopiviin paikkoihin. Vähennyslaskujen rakenne luodaan valitsemasi tehtävämuodon mukaan. Numerot ja matemaattiset symbolit lisätään oikeisiin kohtiin. Kaikki tapahtuu automaattisesti ilman manuaalista työtä.

Vastausavain generoidaan samanaikaisesti tehtävän kanssa. Vaihda välilehteä nähdäksesi ratkaisut jokaiseen tehtävään. Opettajien ei tarvitse laskea vastauksia itse. Säästä aikaa kun arvioit oppilaiden töitä.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Pohjalla - Esiopetus Materiaali Ilmainen Täydellä Muokattavuudella',
        description: `Jokainen elementti pohjalla on täysin muokattavissa generoinnin jälkeen. Klikkaa mitä tahansa kuvaa, numeroa tai tekstiä valitaksesi sen. Raahaa elementtejä uusiin paikkoihin hiirellä. Kaikki muutokset tapahtuvat reaaliajassa.

Kuvien koon muuttaminen tapahtuu vetämällä kulmista. Kierrä kuvia pyöreällä nuolella objektin yläpuolella. Säädä kokoa ja kulmaa kunnes sijainti on täydellinen. Poista tarpeettomat kuvat delete-näppäimellä tai poista-napilla.

Tekstityökalut mahdollistavat ohjeiden ja otsikoiden lisäämisen. Kirjoita teksti kenttään ja klikkaa lisää. Teksti ilmestyy pohjalle muokattavana objektina. Muuta fonttikokoa, väriä ja fonttia tekstiasetuksista.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta - Matematiikka Tehtävät Alakoulu PDF ja JPEG Muodossa',
        description: `Lataa valmis tehtävä kahdessa eri formaatissa. PDF sopii parhaiten tulostamiseen ja usean sivun dokumentteihin. JPEG on ihanteellinen yksittäisten kuvien jakamiseen digitaalisesti. Molemmat formaatit tarjoavat 300 DPI:n ammattilaadun.

Valitse lataa-valikosta tehtävä tai vastausavain. Voit ladata molemmat erikseen tai yhdistää ne samaan PDF-tiedostoon. Harmaasävy-vaihtoehto säästää mustetta kotitulostuksessa. Värilliset tuloste sopivat parhaiten myyntiin tai esittelyyn.

Täysi Käyttöoikeus -tilauksen kaupallinen lisenssi mahdollistaa tehtävien myynnin. Lataa tehtävät ja lataa ne myyntialustoillesi. Teachers Pay Teachers, Etsy ja Amazon KDP ovat suosittuja kanavia. Luo passiivista tuloa myymällä laadukkaita matematiikka tehtäviä opettajayhteisölle.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish subtraction.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille, Vanhemmille ja Kasvattajille - Tulostettavat Tehtävät Lapsille Ilmainen Jokaiseen Tarpeeseen',
    sectionDescription: 'Vähennyslasku generaattori palvelee monenlaisia käyttäjiä koulutuskentällä. Esiopetuksen opettajat, alakoulun opettajat, kotikoulutusvanhemmat ja erityisopettajat hyötyvät kaikki tästä työkalusta. Jokainen käyttäjäryhmä löytää ainutlaatuisia tapoja hyödyntää generaattoria opetuksessaan.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Esiopetuksen Opettajat - Esiopetus Materiaali Ilmainen Konkreettiseen Oppimiseen',
        subtitle: 'Visuaaliset Vähennyslasku Tehtävät 6-vuotiaille',
        description: `Esiopetuksessa lapset oppivat vähennyslaskun käsitteen ensimmäistä kertaa. Konkreettiset kuvat tekevät abstraktista käsitteestä ymmärrettävän. Kuusivuotiaat näkevät kuinka kolme omenaa miinus yksi omena jättää kaksi omenaa jäljelle.

Perinteinen "yliviivaa"-tehtävämuoto sopii täydellisesti esiopetuksen oppilaille. Lapset yliviivaavat kuvia fyysisesti kynällä tai tussilla. Tämä liike vahvistaa vähennyslaskun käsitettä motorisesti. Näkö- ja liikeopetus yhdistyvät tehokkaaseen oppimiskokemukseen.

Vähennettävän maksimiluvun säätäminen kahteen-viiteen sopii esiopetuksen taitotasolle. Pienet luvut eivät ylikuormita lapsia jotka opettelevat vielä numerotunnistusta. Visuaalinen lähestymistapa tukee lapsia jotka eivät vielä tunne kaikkia numeroita.`,
        quote: 'Yliviivaa-tehtävät tekevät vähennyslaskusta konkreettisen!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun Opettajat - Matematiikka Tehtävät Alakoulu Ensimmäiseltä Kolmannelle Luokalle',
        subtitle: 'Vähennyslasku Tehtävät 1.-3. Luokalle',
        description: `Ensimmäisen luokan opettajat käyttävät kuvapohjaisia vähennyslaskutehtäviä siirtymävaiheessa. Oppilaat siirtyvät vähitellen kuvista numeroihin. "Kuva - numero" -tehtävämuoto tukee tätä siirtymää täydellisesti. Lapset näkevät sekä visuaalisen että numeerisen esityksen samanaikaisesti.

Toisen luokan opettajat lisäävät vaikeustasoa nostamalla vähennettävän maksimilukua. Oppilaat jotka hallitsevat luvut 1-10 siirtyvät harjoittelemaan lukuja 1-20. Generaattori kasvaa oppilaiden mukana tarjoamalla joustavan vaikeustason säädön.

Kolmannen luokan opettajat käyttävät "etsi vähentäjä" -tehtävämuotoa haastamaan oppilaita. Puuttuvan luvun etsiminen kehittää ongelmanratkaisutaitoja ja käänteistä ajattelua. Oppilaat soveltavat yhteenlaskutaitojaan vähennyslaskun tarkistamiseen.`,
        quote: 'Eriyttäminen on helppoa eri vaikeustasoilla.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotikoulutusvanhemmat - Yhteenlasku ja Vähennyslasku Tehtävät Kotiopetukseen',
        subtitle: 'Räätälöidyt Tehtävät Useille Lapsille',
        description: `Kotikoulutusvanhemmat tarvitsevat joustavia oppimateriaaleja jotka sopivat usealle lapselle. Generaattori mahdollistaa eri vaikeustasoisten tehtävien luomisen sisaruksille. Kuusivuotias harjoittelee lukuja 1-5 samalla kun kahdeksanvuotias ratkaisee lukuja 1-20.

Teemojen valinta tukee kotikoulutuksen integroitua lähestymistapaa. Yhdistä vähennyslaskuharjoitus luonnontieteen aiheeseen valitsemalla eläinkuvat. Käytä hedelmäkuvia terveysaiheisessa oppitunnissa. Matematiikka nivoutuu luonnollisesti muihin oppiaineisiin.

Täysi Käyttöoikeus -tilaus tarjoaa erinomaista vastinetta rahalle kotikoulutusvanhemmille. $240 vuodessa saat pääsyn kaikkiin 33 generaattoriin. Tämä kattaa matematiikan, lukutaidon, kirjoittamisen ja muut oppiaineet. Verrattuna yksittäisiin oppikirjoihin säästät satoja euroja vuodessa.`,
        quote: 'Yksi työkalu kattaa kaikkien lasteni tarpeet.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Kielenopettajat - Matematiikka Tehtävät Alakoulu 11 Kielellä',
        subtitle: 'Monikielinen Matematiikka Ja Kielenoppiminen',
        description: `Suomi toisena kielenä -opettajat käyttävät matematiikkatehtäviä kielellisen sisällön opettamiseen. Oppilaat oppivat numeroiden nimiä, matemaattisia termejä ja suomalaisia esineiden nimiä. Vähennyslaskutehtävät tarjoavat kontekstin sanastoharjoituksille.

Kaksikielisessä opetuksessa matematiikka opetetaan usein kahdella kielellä. Vaihda generaattorin kieli suomen ja oppilaan äidinkielen välillä. Luo sama tehtävä molemmilla kielillä vertailua varten. Oppilaat näkevät yhteydet käsitteiden välillä eri kielillä.

Kansainväliset koulut palvelevat oppilaita monista eri maista. 11 kielen tuki tekee generaattorista käyttökelpoisen laajemmalle oppilasjoukolle. Jokainen oppilas voi saada tehtäviä omalla äidinkielellään tai opiskeltavalla kielellä.`,
        quote: 'Monikielisyystuki on korvaamaton kansainvälisessä koulussa.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat - Tulostettavat Tehtävät Lapsille Ilmainen Eriyttämiseen',
        subtitle: 'Yksilölliset Vähennyslasku Tehtävät Erityisoppilaille',
        description: `Erityisopetus vaatii voimakasta eriyttämistä ja yksilöllistä mukauttamista. Jokainen oppilas tarvitsee tehtäviä omalla taitotasollaan. Generaattori mahdollistaa nopean mukautettujen tehtävien luomisen jokaiselle oppilaalle erikseen.

Visuaalinen oppiminen on usein tehokkainta oppilailla joilla on oppimisvaikeuksia. Kuvat tekevät abstrakteista numeroista konkreettisia ja ymmärrettäviä. Vähennyslaskun näkeminen kuvina auttaa oppilaita jotka kamppailevat symbolisen ajattelun kanssa.

Tehtävien määrän säätäminen estää ylikuormittumisen. Oppilaat jotka väsyvät nopeasti saavat 2-3 tehtävää per sivu. Vahvemmat oppilaat voivat harjoitella 8-10 tehtävällä. Yksilöllinen määrä tukee jokaisen oppilaan tarkkaavaisuutta ja keskittymiskykyä.`,
        quote: 'Voin nopeasti mukauttaa tehtäviä jokaisen oppilaan tarpeisiin.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät - Myy Vähennyslasku Tehtäviä Kaupallisella Lisenssillä',
        subtitle: 'Teachers Pay Teachers, Etsy ja Amazon KDP',
        description: `Täysi Käyttöoikeus -tilaus sisältää täyden kaupallisen lisenssin ilman lisämaksuja. Myy luomiasi vähennyslaskutehtäviä Teachers Pay Teachers -palvelussa tai Etsyssä. 300 DPI laatu varmistaa ammattimaiset tulosteet asiakkaillesi.

Tehtäväpaketit myyvät hyvin kun ne on kohdistettu tietylle luokkatasolle. Luo "Esiopetuksen Vähennyslaskupaketit" luvuilla 1-5. Tee "Ensimmäisen Luokan Matematiikkapaketit" luvuilla 1-10. Tarkka kohdentaminen lisää myyntiä opettajamarkkina-paikoilla.

Kilpailijat veloittavat $100-200 vuodessa kaupallisista oikeuksista erikseen. Täysi Käyttöoikeus sisältää kaiken $240 vuosihintaan. Säästät rahaa ja saat pääsyn 33 eri generaattoriin. Monipuolista tuotevalikoimaasi ilman lisäinvestointeja.`,
        quote: 'Tilaukseni maksoi itsensä takaisin ensimmäisessä kuussa!',
      },
    ],
  },

  // FAQ Section - Finnish FAQs from subtraction.md
  faq: {
    sectionTitle: 'Usein Kysytyt Kysymykset Vähennyslasku Tehtävistä',
    sectionDescription: 'Yleisimmät kysymykset vähennyslaskugeneraattorista ja matematiikkatyöarkeista.',
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
        question: 'Onko Tämä Vähennyslasku Generaattori Todella Ilmainen Käyttää?',
        answer: 'Vähennyslaskugeneraattori vaatii Täysi Käyttöoikeus -tilauksen joka maksaa $240 vuodessa tai $25 kuukaudessa. Tilauksesi antaa sinulle rajattoman vähennyslaskutehtävien luomisen ilman yksittäisiä maksuja per tehtävä. Generoi niin monta matematiikka tehtävää kuin tarvitset ilman lisäkuluja. Täysi Käyttöoikeus sisältää kaikki 33 generaattoria yhteen hintaan. Peruspaketti sisältää 10 suosittua generaattoria ja maksaa $144 vuodessa. Molemmat tilaukset sisältävät kaupallisen lisenssin, 11 kielen tuen ja ammattimaisen 300 DPI laadun viennit.',
      },
      {
        id: '2',
        question: 'Voinko Tulostaa Vähennyslasku Tehtävät Kotona Tavallisella Tulostimella?',
        answer: 'Kyllä voit tulostaa kaikki tehtävät tavallisella kotitulostimella. 300 DPI laatu takaa terävät tulosteet kotilaitteilla. PDF-muoto on optimoitu tulostukseen. Kuvat ja tekstit näkyvät selkeästi paperilla. Harmaasävy-vaihtoehto säästää mustetta tulostuksessa. Vähennyslaskutehtävät toimivat yhtä hyvin mustavalkoisina kuin värillisinä. Ammattimaiset painotalot hyväksyvät 300 DPI tiedostot ilman ongelmia.',
      },
      {
        id: '3',
        question: 'Tarvitsenko Suunnittelutaitoja Luodakseni Vähennyslasku Tehtävät?',
        answer: 'Et tarvitse mitään suunnittelutaitoja vähennyslaskutehtävien luomiseen. Generaattori tekee kaiken automaattisesti puolestasi. Valitse kuvat, säädä asetukset, klikkaa generoi. Valmis tehtävä ilmestyy kolmessa minuutissa. Yksinkertaiset kontrollit tekevät käytöstä intuitiivista kaikille. Esiopetuksen opettajat ilman teknistä taustaa luovat ammattimaisia tehtäviä päivittäin.',
      },
      {
        id: '4',
        question: 'Voinko Käyttää Vähennyslasku Tehtäviä Luokkahuoneessani Oppilaiden Kanssa?',
        answer: 'Täysi Käyttöoikeus -tilaus sisältää rajattoman luokkahuonekäytön. Tulosta tehtäviä kaikille oppilaillesi niin monta kuin tarvitset. Ei ole rajoituksia oppilasmäärille tai tulosteiden määrille. Käytä tehtäviä päivittäisessä opetuksessa vapaasti. Yhdistä vähennyslaskutehtävät muihin oppimisaktiviteetteihin. Jaa tehtäviä kollegoiden kanssa koulussasi.',
      },
      {
        id: '5',
        question: 'Millä Kielillä Vähennyslasku Tehtävät Ovat Saatavilla?',
        answer: 'Generaattori tukee 11 kieltä: suomi, englanti, saksa, ranska, espanja, italia, portugali, hollanti, tanska, ruotsi ja norja. Vaihda käyttöliittymän ja sisällön kieltä yhdellä klikkauksella. Kuvien tiedostonimet käännetään automaattisesti valitulle kielelle. Monikielinen tuki on tärkeää kielenopetuksessa ja kansainvälisille kouluille.',
      },
      {
        id: '6',
        question: 'Voinko Myydä Luomiani Vähennyslasku Tehtäviä?',
        answer: 'Kyllä. Täysi Käyttöoikeus -tilaus sisältää täyden kaupallisen print-on-demand lisenssin ilman lisäkustannuksia. Myy luomiasi vähennyslaskutehtäviä Teachers Pay Teachers -palvelussa, Etsyssä tai Amazon KDP:ssä. Ei vaadita attribuutiota tai tekijänmainintaa. 300 DPI laatu varmistaa ammattimaiset tulosteet asiakkaillesi. Kilpailijat veloittavat $100-200 vuodessa kaupallisista oikeuksista erikseen.',
      },
      {
        id: '7',
        question: 'Kuinka Mukautan Vähennyslasku Tehtäviä Oppilailleni?',
        answer: 'Säädä vähennettävän maksimilukua 2-20 välillä oppilaan taitotason mukaan. Valitse yksi neljästä tehtävämuodosta sopivan haasteen takaamiseksi. Muuta tehtävien määrää 1-10 per sivu keskittymiskyvyn mukaan. Lataa omia kuvia personoidaksesi tehtävät oppilaillesi. Käytä kuvia luokkahuoneen esineistä tai oppilaan kiinnostuksen kohteista. Muokkaa kaikkea pohjalla generoinnin jälkeen.',
      },
      {
        id: '8',
        question: 'Mille Ikäryhmille Nämä Vähennyslasku Tehtävät Sopivat Parhaiten?',
        answer: 'Vähennyslaskutehtävät sopivat esiopetuksesta kolmannelle luokalle. Kuusivuotiaat aloittavat luvuilla 1-5 konkreettisilla kuvilla. Yhdeksänvuotiaat harjoittelevat lukuja 1-20 haastavammilla tehtävämuodoilla. Säädä vaikeustaso oppilaan kehitystasoon. Esiopetuksessa käytä perinteistä "yliviivaa"-muotoa. Ensimmäisellä luokalla siirrytään "kuva - numero" -muotoon.',
      },
      {
        id: '9',
        question: 'Voinko Ladata Omia Kuvia Vähennyslasku Tehtäviin?',
        answer: 'Kyllä voit ladata omia kuvia vähennyslaskutehtäviin. Monilataus-ominaisuus tukee useita tiedostoja kerralla. Tuemme JPEG, PNG ja GIF formaatteja. Yhdistä kirjaston kuvia omiin kuviisi. Omat kuvat personoivat tehtävät oppilaidesi tarpeisiin. Ota kuvia luokkahuoneen esineistä tai oppilaiden piirustuksista.',
      },
      {
        id: '10',
        question: 'Kuinka Kauan Vähennyslasku Tehtävän Luominen Kestää?',
        answer: 'Vähennyslasku tehtävän luominen kestää alle kolme minuuttia alusta loppuun. Valitse kuvat 30 sekunnissa. Säädä asetukset 30 sekunnissa. Generoi tehtävä 10 sekunnissa. Esikatsele ja lataa 30 sekunnissa. Perinteinen manuaalinen luominen vie 30-60 minuuttia per tehtävä. Generaattori automatisoi koko prosessin. Säästä 90% ajastasi.',
      },
      {
        id: '11',
        question: 'Sisältävätkö Vähennyslasku Tehtävät Vastausavaimet?',
        answer: 'Kyllä. Vastausavain generoidaan automaattisesti jokaisen tehtävän mukana. Vaihda välilehteä nähdäksesi oikeat vastaukset kaikille tehtäville. Ei tarvitse laskea vastauksia manuaalisesti. Säästä aikaa arvioinnissa. Lataa vastausavain erillisenä tiedostona tai yhdistä tehtävän kanssa. Oppilaat voivat käyttää vastausavaimia itsenäiseen oppimiseen.',
      },
      {
        id: '12',
        question: 'Voinko Luoda Vähennyslasku Tehtäviä Tietyistä Kouluaineista?',
        answer: 'Kyllä voit luoda aihekohtaisia vähennyslaskutehtäviä valitsemalla tietyn teeman. Eläinteemat sopivat luonnontieteen oppitunteihin. Hedelmä- ja vihannesteemoja käytetään terveysaiheissa. Kulkuneuvoteemoja käytetään liikenneturvallisuuden opetuksessa. Lataa omia kuvia jotka liittyvät opiskeltavaan aiheeseen. Matematiikka integroituu luonnollisesti muihin oppiaineisiin.',
      },
    ],
  },

  // Pricing - Finnish Full Access terminology
  pricing: {
    title: 'Täysi Käyttöoikeus',
    price: '240€',
    priceInterval: '/vuosi',
    priceSuffix: 'Laskutetaan vuosittain',
    benefits: [
      'Rajoittamaton työarkkien luonti',
      'Kaupallinen lisenssi sisältyy',
      '11 kielen tuki',
      '3000+ teemaattista kuvaa',
      '300 DPI tulostuslaatu',
      'Vastausavaimet sisältyvät',
      'Kaikki 33 generaattoria',
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
    sectionTitle: 'Yhdistä Muihin Työarkki Generaattoreihin',
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä vähennyslasku työarkit näihin täydentäviin generaattoreihin.',
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
        slug: 'addition',
        name: 'Yhteenlasku',
        category: 'Matematiikka',
        icon: '➕',
        description: 'Täydennä vähennyslaskuharjoittelua yhteenlaskutehtävillä täydelliseen peruslaskuoperaatioiden hallintaan.',
      },
      {
        id: '2',
        slug: 'math-worksheets',
        name: 'Matematiikka Työarkit',
        category: 'Matematiikka',
        icon: '🔢',
        description: 'Luo monipuolisia matematiikkatehtäviä numeroiden tunnistamiseen ja peruslaskutaitoihin.',
      },
      {
        id: '3',
        slug: 'more-less',
        name: 'Enemmän vai Vähemmän',
        category: 'Matematiikka',
        icon: '⚖️',
        description: 'Opeta vertailukäsitteitä ja lukujen suuruusjärjestystä hauskoilla tehtävillä.',
      },
      {
        id: '4',
        slug: 'find-and-count',
        name: 'Etsi ja Laske',
        category: 'Matematiikka',
        icon: '🔍',
        description: 'Yhdistä laskeminen etsintätehtäviin visuaalisen numerotuntemuksen kehittämiseksi.',
      },
      {
        id: '5',
        slug: 'coloring',
        name: 'Värityskuvat',
        category: 'Luovuus',
        icon: '🎨',
        description: 'Palkitse valmiit matematiikkatehtävät teemaattisilla värityskuvilla, jotka kehittävät hienomotoriikkaa.',
      },
      {
        id: '6',
        slug: 'math-puzzle',
        name: 'Matematiikkapulmat',
        category: 'Matematiikka',
        icon: '🧩',
        description: 'Haasta oppilaita matemaattisilla pulmilla jotka yhdistävät laskemisen ja ongelmanratkaisun.',
      },
    ],
  },
};

export default subtractionFiContent;
