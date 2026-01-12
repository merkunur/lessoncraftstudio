import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Guess Worksheets - Finnish Content (Kuva-Arvaustehtävät)
 *
 * File: frontend/content/product-pages/fi/kuva-arvaus-tyoarkit.ts
 * URL: /fi/apps/kuva-arvaus-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/word-guess.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Full Access (Täysi Käyttöoikeus) - €240/year
 */

export const wordGuessFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'kuva-arvaus-tyoarkit',
    appId: 'word-guess',
    title: 'Tulostettavat Tehtävät Lapsille Ilmainen - Kuva-Arvaustehtävät Esiopetus Materiaali Ilmainen Alakoulu',
    description: 'Luo ammattimaisia kuva-arvaustehtäviä kuvan vihjeillä muutamassa minuutissa. Täysi Käyttöoikeus -tilauksesi antaa sinulle rajattoman kuva-arvaustehtävien luomisen ilman sivukohtaisia maksuja. Lataa laadukkaat PDF-tehtävät alle kolmessa minuutissa.',
    keywords: 'kuva-arvaustehtävät, tulostettavat tehtävät lapsille ilmainen, esiopetus materiaali ilmainen, kirjaimet harjoittelu esikoulu, lukemaan oppiminen tehtävät, matematiikka tehtävät alakoulu',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/kuva-arvaus-tyoarkit',
  },

  // Hero Section - FULL text from Finnish word-guess.md
  hero: {
    title: 'Kuva-Arvaustehtävät',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen Esiopetus Materiaali',
    description: `Luo ammattimaisia kuva-arvaustehtäviä kuvan vihjeillä muutamassa minuutissa. Täysi Käyttöoikeus -tilauksesi antaa sinulle rajattoman kuva-arvaustehtävien luomisen ilman sivukohtaisia maksuja. Luo tulostettavia tehtäviä lapsille, jotka sopivat täydellisesti esiopetukseen ja alakoululaisille. Lataa laadukkaat PDF-tehtävät alle kolmessa minuutissa.

Kuva-arvaustyökalu auttaa lapsia kehittämään kirjaimien tunnistustaitoja, kielellisiä taitoja ja loogista päättelyä. Jokainen tehtävä sisältää kuvia, joista osa kirjaimista on piilotettu vihjeiksi. Lapset täyttävät puuttuvat kirjaimet ja kirjoittavat koko sanan. Tämä yhdistää kirjainten harjoittelun esikoulussa visuaaliseen oppimiseen luonnollisella tavalla.

Täysi Käyttöoikeus -tilaus sisältää kaikkien 33 tehtävägeneraattorin käytön. Luo kuva-arvaustehtäviä, matematiikka tehtäviä alakouluun, kirjaimien harjoitteluun esikoululle, yhteenlasku ja vähennyslasku tehtäviä sekä kaikki muut tehtävätyypit yhdellä tilauksella. Ei ylimääräisiä maksuja. Ei sivukohtaisia veloituksia. Vain yksi yksinkertainen tilaus kaikille työkaluille.`,
    previewImageSrc: '/samples/english/word guess/clue-grid_worksheet.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/word guess/
  samples: {
    sectionTitle: 'Kuva-Arvaustehtävät Esimerkit',
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
        worksheetSrc: '/samples/english/word guess/clue-grid_worksheet.jpeg',
        answerKeySrc: '/samples/english/word guess/clue-grid_answer-key.jpeg',
        altText: 'Kuva-arvaustehtävä vihjeruudukolla esiopetukseen kirjainten tunnistus',
        pdfDownloadUrl: '/samples/english/word guess/clue-grid_worksheet.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/word guess/landscape.jpeg',
        answerKeySrc: '/samples/english/word guess/landscape answer-key.jpeg',
        altText: 'Kuva-arvaustehtävä vaakasuuntainen alakoululaisille sanasto',
        pdfDownloadUrl: '/samples/english/word guess/landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/word guess/custom word list.jpeg',
        answerKeySrc: '/samples/english/word guess/custom word list answer-key.jpeg',
        altText: 'Kuva-arvaustehtävä mukautetulla sanalistalla personoitu oppiminen',
        pdfDownloadUrl: '/samples/english/word guess/custom word list.pdf',
      },
    ],
  },

  // Features Grid - FULL text from Finnish word-guess.md feature sections
  features: {
    sectionTitle: 'Kuva-Arvaustehtävien Ominaisuudet - Tulostettavat Tehtävät Lapsille Ilmainen Esiopetukseen ja Alakouluun',
    sectionDescription: 'Kuva-arvaustehtävien suunnittelija sisältää kaiken tarvitsemasi tulostettavat tehtävät lapsille ilmainen luomiseen. Luo ammattimaisia tehtäviä kolmessa klikkauksessa. Muokkaa kaikkea canvasilla täydellä vapaudella. Lataa omia kuvia tai valitse yli 3000 kuvasta. Jokainen ominaisuus on suunniteltu opettajille jotka tarvitsevat nopeita, laadukkaita tulostettavia tehtäviä. Täysi Käyttöoikeus -tilauksesi antaa rajattoman käytön kaikkiin ominaisuuksiin.',
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
        title: 'Luo Kuva-Arvaustehtäviä Kolmessa Klikkauksessa - Tulostettavat Tehtävät Lapsille Ilmainen',
        description: `Valitse teema yli 3000 kuvasta tai valitse yksittäisiä kuvia. Määritä vaikeus valitsemalla, kuinka monta kirjainta näytetään vihjeenä. Klikkaa "Luo" ja tehtäväsi on valmis. Ei tarvitse suunnitteluosaamista. Ei tarvitse monimutkaisia ohjelmia. Vain nopea, yksinkertainen prosessi, joka vie alle kolme minuuttia.

Tehtävägeneraattori valitsee automaattisesti kuvat ja luo vihjeet. Voit valita "ei vihjeitä" täydelliseen haasteeseen. Tai valitse helppo (puolet kirjaimista), normaali (neljäsosa kirjaimista) tai vaikea (kuudesosa kirjaimista) vaikeustaso. Jokainen tehtävä on räätälöity oppilaittesi tasolle.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Muokkaa Kaikkea Kuva-Arvaustehtävässä - Esiopetus Materiaali Ilmainen',
        description: `Kaikki pohjalla on muokattavissa. Raahaa, kierrä, skaalaa tai poista mitä tahansa elementtiä. Vaihda taustan väri yhdellä klikkauksella. Lisää reunat tai taustateemoja 3000+ kuvakirjastosta. Muuta tekstin fontteja, kokoja ja värejä. Täydellinen hallinta jokaisesta yksityiskohdasta.

Kuva-arvaustehtävän luomisen jälkeen klikkaa mitä tahansa elementtiä muokataksesi sitä. Muuta kuvan kokoa vastaamaan oppilaidesi tarpeita. Lisää ohjetekstiä isommalla fontilla näkövammaisille oppilaille. Poista elementtejä yksinkertaistaaksesi esiopetuksen oppilaille. Luo uudelleen yhdellä klikkauksella, jos haluat eri kuvat.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Lataa Omat Kuvat Kuva-Arvaustehtäviin - Kirjaimet Harjoittelu Esikoulu',
        description: `Lataa omia kuvia monivalitsemalla. Kaikki yleiset kuvaformaatit toimivat: JPEG, PNG, GIF. Yhdistä ne kirjastokuvien kanssa luodaksesi personoituja tehtäviä. Käytä oppilaittesi omien esineiden kuvia. Lataa luokkahuoneen maskottien kuvia. Tee tehtävistä henkilökohtaisia ja sitouttavia.

Lataamasi kuvat toimivat täydellisesti kuvien tunnistamiseen perustuvien kuva-arvaustehtävien kanssa. Järjestelmä käyttää tiedostonnimiä sanoina tehtävissä. Nimeä kuvasi selkeästi: "koira.jpg", "kissa.png", "auto.jpg". Generaattori luo automaattisesti vihjeet tiedostonnimistä. Saat täysin personoituja tehtäviä oppilaittesi sanastosta.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Kuva-Arvaustehtävät 11 Kielellä - Lukemaan Oppiminen Tehtävät',
        description: `Käyttöliittymä: suomi, englanti, saksa, ranska, espanja, italia, portugali (Brasilia), hollanti, tanska, ruotsi, norja. Tehtävien sisältö: samat 11 kieltä. Tämä on erityisen tärkeää kuva-arvaustehtäville, jotka käyttävät kuvien tiedostonimiä luomaan sisältön.

Vaihda käyttöliittymän kieli yhdellä klikkauksella. Kaikki valikot, painikkeet ja ohjeet päivittyvät välittömästi. Luo kuva-arvaustehtäviä suomeksi esikouluopetukseen. Luo tehtäviä englanniksi ESL-oppilaille. Luo tehtäviä ruotsiksi kaksikielisiin ohjelmiin. Yksi työkalu, 11 kieltä, rajattomat mahdollisuudet.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kaupallinen POD-Lisenssi Kuva-Arvaustehtäville - Matematiikka Tehtävät Alakoulu',
        description: `Täysi Käyttöoikeus -tilaus sisältää täydellisen print-on-demand kaupallisen lisenssin ilman lisämaksuja. Myy kuva-arvaustehtäviä Etsyssä. Myy niitä Teachers Pay Teachers -palvelussa. Myy niitä Amazon KDP:ssä. Ei attribuutiota vaaditaan. Täydellinen opettajayrittäjille.

Kilpailijat veloittavat 79-199 dollaria vuodessa lisää kaupallisista oikeuksista. Täysi Käyttöoikeus -tilauksessasi se on mukana ilmaiseksi. Luo kuva-arvaustehtäviä aamulla. Myy niitä Teachers Pay Teachers -palvelussa iltapäivällä. Monet opettajat ansaitsevat 500-5000 dollaria kuukaudessa myymällä mukautettuja tehtäviä. Kaikki työkalut ovat tilauksessasi.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Kuvakirjasto Kuva-Arvaustehtäviin - Hienomotoriikka Harjoitukset',
        description: `Yli 3000 lapsille sopivaa kuvaa. Teemapohjainen organisointi helpottaa löytämistä. Helppokäyttöinen teemavalikko. Yksittäisten kuvien selaaminen. Taustat mukana. Reunat mukana. Hakutoiminto.

Valitse eläinteema ja saat välittömästi 200+ eläinkuvaa. Valitse ruokateema ja saat 150+ ruokakuvaa. Valitse liikenteema ja saat 100+ ajoneuvokuvia. Jokaisesta kuvasta on selkeä esikatselu. Klikkaa valitaksesi. Klikkaa uudelleen poistaaksesi. Yksinkertainen visuaalinen valinta ilman monimutkaisuutta.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Ammattimainen 300 DPI -Laatu Kuva-Arvaustehtävissä - Pisteestä Pisteeseen Tehtävät',
        description: `Korkearesoluutioinen vienti tulostamista varten. Täydellinen myyntiin. JPEG- ja PDF-muodot. Harmaasävyvaihtoehto (säästä mustetta). Ammattilaatuiset tehtävät joka kerta. Ei pikselöityjä kuvia. Ei epäselviä tekstejä. Vain teräväpiirtoinen, ammattimainen laatu.

Lataa PDF-muodossa täydellistä tulostusyhteensopivuutta varten. Lataa JPEG-muodossa digitaalista käyttöä tai verkossa myyntiä varten. Valitse harmaasävy säästääksesi värimustetta. Tulosta kotitulostimella tai ammattitulostimella. Laatu on aina täydellinen. 300 DPI tarkoittaa teräväpiirtoisia reunoja ja selkeitä kuvia jokaisessa tulostetussa tehtävässä.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from Finnish word-guess.md step sections
  howTo: {
    sectionTitle: 'Kuinka Luoda Tulostettavat Tehtävät Lapsille Ilmainen Viidessä Helpossa Vaiheessa',
    sectionDescription: 'Kuva-arvaustehtävän luominen vie alle kolme minuuttia alusta loppuun. Ei vaadi suunnitteluosaamista. Ei vaadi monimutkaisia ohjelmia. Vain viisi yksinkertaista vaihetta ja tehtäväsi on valmis tulostettavaksi. Esiopetuksen opettajat, alakoulun opettajat ja kotiopettajat luovat tehtäviä päivittäin tällä työkalulla. Prosessi on intuitiivinen ja nopea.',
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
        title: 'Valitse Sisältö Kuva-Arvaustehtävään - Tulostettavat Tehtävät Lapsille Ilmainen Esiopetus Materiaali Ilmainen',
        description: `Aloita valitsemalla teema 3000+ kuvan kirjastosta. Klikkaa "Valitse teema" -valikkoa ja näet kaikki saatavilla olevat teemat. Eläinteema antaa sinulle 200+ eläinkuvaa. Ruokateema antaa 150+ ruokakuvaa. Liikenteema antaa 100+ ajoneuvokuvaa. Jokainen teema on huolellisesti kuratoitu lapsille sopivilla kuvilla.

Voit myös selata yksittäisiä kuvia valitsemalla "Kaikki kuvat" teemavalikosta. Käytä hakupalkkia löytääksesi tiettyjä kuvia. Kirjoita "koira" nähdäksesi kaikki koirakuvat. Kirjoita "auto" nähdäksesi kaikki autokuvat. Hakutoiminto on välitön ja tarkka.

Tai lataa omia kuvia henkilökohtaisia tehtäviä varten. Klikkaa "Lataa omat kuvat" -osiota. Valitse useita kuvatiedostoja kerralla. Nimeä ne selkeästi: "omena.jpg", "banaani.png", "kirahvi.jpg". Järjestelmä käyttää tiedostonimiä sanoina tehtävissä. Tämä on täydellinen tapa luoda personoituja esiopetus materiaali ilmainen tehtäviä oppilaittesi sanastosta.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetukset Kuva-Arvaustehtävään - Kirjaimet Harjoittelu Esikoulu Lukemaan Oppiminen Tehtävät',
        description: `Valitse vaikeustaso oppilaidesi taitojen mukaan. "Ei vihjeitä" tarkoittaa tyhjää ruudukoa ilman kirjaimia. Tämä on täydellinen haaste edistyneille esikouluoppilaille, jotka osaavat kirjoittaa sanoja ulkomuistista. Oppilaat katsovat kuvaa ja kirjoittavat koko sanan alusta alkaen.

"Helppo" -taso näyttää puolet kirjaimista vihjeenä. Esimerkiksi sanassa "KISSA" voisi näkyä "K_S_A". Oppilaat täyttävät puuttuvat kirjaimet. Tämä on loistava aloittelijoille, jotka tarvitsevat enemmän tukea. Se antaa heille luottamusta kirjaimiin ja auttaa heitä yhdistämään äänet kirjaimiin.

"Normaali" -taso näyttää neljäsosan kirjaimista. Sanassa "KISSA" voisi näkyä "K____". Tämä on hyvä tasapaino haasteen ja tuen välillä. "Vaikea" -taso näyttää vain kuudesosan kirjaimista pitkemmille sanoille. Valitse, haluatko isoja vai pieniä kirjaimia. Isot kirjaimet ovat parempia esikouluoppilaille.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Luo Tehtävä - Matematiikka Tehtävät Alakoulu Yhteenlasku ja Vähennyslasku Tehtävät',
        description: `Klikkaa "Luo tehtävä" -painiketta. Generaattori luo välittömästi kuva-arvaustehtäväsi. Koko prosessi vie 2-3 sekuntia. Näet esikatselen pohjallasi välittömästi. Kaikki kuvat on sijoiteltu automaattisesti. Kaikki vihjeet on luotu valitsemasi vaikeustason mukaan.

Jos et pidä tuloksesta, klikkaa "Luo uudelleen" -painiketta. Generaattori luo uuden version eri kuvilla tai eri vihjeillä. Voit luoda uudelleen niin monta kertaa kuin haluat. Ei rajoituksia. Ei lisämaksuja. Jokaisella uudelleenluonnilla saat täysin erilaisen tehtävän.

Generaattori sovittaa automaattisesti tehtävät valitsemallesi sivukoolle. Letter-koko (612×792 pikselia) amerikkalaisille opettajille. A4-koko (595×842 pikselia) eurooppalaisille opettajille. Vaaka- tai pystysuunta. Neliömuoto sosiaalista mediaa varten (1200×1200 pikselia). Mukautetut koot ovat myös mahdollisia.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Pohjalla - Hienomotoriikka Harjoitukset Pisteestä Pisteeseen Tehtävät Kertotaulut Tulostettava',
        description: `Klikkaa mitä tahansa elementtiä pohjalla muokataksesi sitä. Raahaa kuvia uusiin paikkoihin. Kierrä niitä täydelliseen kulmaan. Skaalaa niitä suuremmiksi tai pienemmiksi. Poista elementtejä, joita et tarvitse. Lisää uusia elementtejä kuvakirjastosta. Täydellinen hallinta jokaisesta yksityiskohdasta.

Lisää tekstiä mukautettuihin ohjeisiin. Klikkaa "Lisää teksti" -painiketta. Kirjoita mitä haluat. Valitse fontti kuudesta lapsille sopivasta fontista. Muuta kokoa, väriä ja ääriviivaa. Raahaa teksti mihin tahansa kohtaan pohjalla. Tämä on täydellinen luodaksesi personoituja hienomotoriikka harjoitukset oppilaittesi tarpeisiin.

Lisää taustateemat tai reunateemat kuvakirjastostasi. Klikkaa "Taustateema" -valikkoa ja valitse yli 100 vaihtoehdosta. Eläintaustat. Avaruustaustat. Metsätaustat. Meriaiheiset taustat. Jokainen teema lisää visuaalista kiinnostavuutta ilman, että se häiritsee tehtävän luettavuutta.`,
        icon: '🎨',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta Kuva-Arvaustehtävät - Esiopetus Materiaali Ilmainen Värityskuvia Lapsille Tulostettava',
        description: `Klikkaa "Lataa PDF" -painiketta tallentaaksesi tehtäväsi PDF-tiedostona. PDF on paras muoto tulostamista varten. Se säilyttää täydellisen laadun. Se toimii kaikilla tulostimilla. Se avautuu kaikilla tietokoneilla. Täydellinen jakamiseen opettajatiimien kanssa.

Tai klikkaa "Lataa JPEG" -painiketta tallentaaksesi kuvana. JPEG on täydellinen digitaaliseen käyttöön. Lataa se Google Classroomiin. Jaa se Seesaw-palvelussa. Lähetä se sähköpostitse vanhemmille. Julkaise se Teachers Pay Teachers -palvelussa. JPEG toimii kaikkialla.

Valitse harmaasävyvaihtoehto säästääksesi värimustetta. Klikkaa "Harmaasävy" -valintaruutua ennen lataamista. Kaikki värit muunnetaan harmaasävyiksi. Tulosta kotitulostimella ilman, että värimustepatruunat kuluvat. Lataus vie 2-3 sekuntia. Koko prosessi alusta loppuun vie alle kolme minuuttia.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish word-guess.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille, Vanhemmille ja Kasvattajille - Tulostettavat Tehtävät Lapsille Ilmainen Jokaiseen Tarpeeseen',
    sectionDescription: 'Kuva-arvaustehtävät palvelevat monenlaisia opettajia ja kasvattajia. Esiopetuksen opettajat käyttävät niitä kirjainten tunnistuksen opettamiseen. Alakoulun opettajat käyttävät niitä sanaston laajentamiseen. Kotiopettajat käyttävät niitä personoituihin oppimispaketteihin. Kielten opettajat käyttävät niitä sanastonoppimiseen. Erityisopetuksen opettajat käyttävät niitä eriyttämiseen. Opettajayrittäjät käyttävät niitä myyntituotteisiin Teachers Pay Teachers -palvelussa.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Esiopetuksen Opettajat',
        subtitle: 'Kirjaimet Harjoittelu Esikoulu Esiopetus Materiaali Ilmainen',
        description: `Esiopetuksen opettajat tarvitsevat tehtäviä, jotka yhdistävät visuaalisen oppimisen kirjaintaitoihin. Kuva-arvaustehtävät ovat täydellisiä 6-vuotiaille lapsille esiopetuksessa. Kuvat pitävät lapset sitoutuneina. Kirjainvihjeet opettavat kirjaintunnistusta. Täyttötehtävä harjoittelee hienomotorisia taitoja.

Luo tehtäviä teemoilla, jotka vastaavat esiopetuksen opetussuunnitelmaa. Eläintehtävät syyskuulle. Ruokatehtävät terveysopetukseen. Liikennevälineet liikenneturvallisuuteen. Jokainen tehtävä yhdistää aihealueen lukutaidon kehittämiseen. Tämä on täydellinen monialaiseen oppimiseen.

Yhdistä kuva-arvaustehtävät muihin esiopetus materiaali ilmainen tehtäviin samasta tilauksesta. Luo kirjaimet harjoittelu esikoulu tehtäviä aamulla. Luo hienomotoriikka harjoitukset iltapäivällä. Luo pisteestä pisteeseen tehtävät seuraavana päivänä. Kaikki 33 työkalua ovat käytettävissäsi 240 euroa vuodessa Täysi Käyttöoikeus -tilauksella.`,
        quote: 'Kuva-arvaustehtävät tekevät kirjainten oppimisesta hauskaa!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun Opettajat 1.-3. Luokka',
        subtitle: 'Lukemaan Oppiminen Tehtävät Matematiikka Tehtävät Alakoulu',
        description: `Alakoulun opettajat 1. luokalla, 2. luokalla ja 3. luokalla tarvitsevat tehtäviä, jotka tukevat lukutaidon kehittymistä. Ensimmäisen luokan oppilaat tarvitsevat yksinkertaisia sanoja paljon vihjeillä. Toisen luokan oppilaat tarvitsevat keskivaikeita sanoja vähemmillä vihjeillä. Kolmannen luokan oppilaat tarvitsevat haastavia sanoja vain muutamilla vihjeillä tai ilman vihjeitä.

Mukauta vaikeustaso jokaiselle luokka-asteelle välittömästi. Valitse "helppo" ensimmäiselle luokalle. Valitse "normaali" toiselle luokalle. Valitse "vaikea" kolmannelle luokalle. Yksi työkalu, kaikki kolme luokka-astetta. Ei tarvitse kolmea eri työkalua. Ei tarvitse kolmea eri tilausta.

Täysi Käyttöoikeus -tilaus antaa sinulle pääsyn kaikkiin 33 tehtävägeneraattoriin. Luo lukemaan oppiminen tehtäviä aamulla. Luo matematiikka tehtävät alakouluun iltapäivällä. Luo yhteenlasku ja vähennyslasku tehtävät illalla. Yhdistä kuva-arvaustehtävät matematiikkatehtäviin täydellisiksi viikkopaketteiksi.`,
        quote: 'Voin eriyttää tehtävät jokaiselle luokka-asteelle helposti.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat',
        subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen Personoituun Oppimiseen',
        description: `Kotiopettajat tarvitsevat joustavia työkaluja, jotka mukautuvat jokaisen lapsen tahtiin. Kuva-arvaustehtävät antavat sinulle täydellisen hallinnan vaikeustasosta, sisällöstä ja tyylista. Luo tehtäviä, jotka vastaavat lapsesi tarkkoja kiinnostuksen kohteita. Käytä heidän lempieläimiään. Käytä heidän lempivärejään. Käytä heidän lempiteemojaan.

Lataa omia kuvia kotielämästäsi. Lataa kuvat lemmikkieläimistä. Lataa kuvat perheenjäsenistä (nimet tiedostonniminä). Lataa kuvat kotipihan kasveista. Luo täysin personoituja tulostettavat tehtävät lapsille ilmainen tehtäviä, jotka yhdistävät oppimisen perheen elämään.

Kotiopettajat arvostavat monipuolisuutta. Täysi Käyttöoikeus -tilaus antaa sinulle 33 tehtävätyyppiä yhdellä tilauksella. Luo kuva-arvaustehtäviä maanantaina. Luo värityskuvia lapsille tulostettava tiistaina. Luo kertotaulut tulostettava keskiviikkona. Viisi erilaista tehtävätyyppiä viidelle viikonpäivälle. Kaikki samasta tilauksesta.`,
        quote: 'Personoidut tehtävät pitävät lapseni motivoituneina oppimaan.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Kielten Opettajat ja Vieraan Kielen Opetus',
        subtitle: 'Esiopetus Materiaali Ilmainen Kirjaimet Harjoittelu Esikoulu',
        description: `Suomen kielen opettajat ulkomaalaisille oppilaille tarvitsevat visuaalisia työkaluja sanastonoppimiseen. Kuva-arvaustehtävät ovat täydellisiä, koska ne yhdistävät kuvan sanaan. Oppilaat näkevät kuvan koirasta. He näkevät vihjeet: "K O I _ _". He oppivat, että "KOIRA" on suomen sana tälle eläimelle.

Luo tehtäviä temaattisista sanaston yksiköistä. Luo eläinsanastotehtävä. Luo ruokasanastotehtävä. Luo liikennesanastotehtävä. Luo huonekalusanastotehtävä. Luo vaatesanastotehtävä. Jokainen teema opettaa 8-10 uutta sanaa visuaalisesti ja kirjallisesti.

Käytä samaa työkalua opettaaksesi suomea, englantia, ruotsia tai mitä tahansa kielistä 11 tuetusta kielestä. Vaihda käyttöliittymän kieli yhdellä klikkauksella. Luo sisältöä missä tahansa kielessä lataamalla kuvia tiedostonimillä kyseisellä kielellä. Yksi työkalu, 11 kieltä, rajattomat mahdollisuudet kieltenopetukseen.`,
        quote: 'Monikielinen tuki on korvaamaton S2-opetuksessa.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopetuksen Opettajat',
        subtitle: 'Lukemaan Oppiminen Tehtävät Hienomotoriikka Harjoitukset Eriyttämiseen',
        description: `Erityisopetuksen opettajat tarvitsevat työkaluja, jotka eriyttävät välittömästi. Kuva-arvaustehtävät antavat sinulle täydellisen hallinnan vaikeustasosta. Luo "ei vihjeitä" -versio edistyneille oppilaille. Luo "helppo" -versio aloittelijoille. Käytä samaa teemaa molemmille ryhmille. Jokainen oppilas saa haasteen omalla tasollaan.

Säädä tehtävän kokoa ja muotoilua visuaalisia tai motorisia haasteita varten. Tee kuvia suuremmiksi näkövammaisille oppilaille. Tee kirjoitusruudukot suuremmiksi motorisia haasteita varten. Muuta fontteja helpommin luettaviksi lukihäiriöisille oppilaille. Lisää visuaalisia reunoja visuaalisen tuen lisäämiseksi.

Yhdistä kuva-arvaustehtävät muihin hienomotoriikka harjoitukset tehtäviin. Luo pisteestä pisteeseen tehtävät motoriikan kehittämiseen. Luo värityskuvia lapsille tulostettava kynäotteen harjoitteluun. Luo kirjaimet harjoittelu esikoulu tehtäviä kirjaintunnistukseen. Kaikki työkalut ovat samassa Täysi Käyttöoikeus -tilauksessa 240 euroa vuodessa.`,
        quote: 'Voin räätälöidä tehtävät jokaisen oppilaan tarpeisiin.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy Tulostettavat Tehtävät Lapsille Ilmainen Teachers Pay Teachers -palvelussa',
        description: `Opettajayrittäjät myyvät mukautettuja tehtäviä Teachers Pay Teachers -palvelussa, Etsyssä ja Amazon KDP:ssä. Täysi Käyttöoikeus -tilaus sisältää täydellisen kaupallisen print-on-demand -lisenssin ilman lisämaksuja. Luo kuva-arvaustehtäviä aamulla. Myy niitä Teachers Pay Teachers -palvelussa iltapäivällä. Ei attribuutiota vaaditaan. Ei rojalteja maksettava.

Monet opettajat ansaitsevat 500-5000 euroa kuukaudessa myymällä mukautettuja tehtäviä. Luo teemapaketteja: "Eläin-kuva-arvaustehtävät esiopetukseen" (20 sivua, myy 8 eurolla). "Ruoka-kuva-arvaustehtävät alakouluun" (15 sivua, myy 6 eurolla). "Liikenne-kuva-arvaustehtävät kirjainharjoitteluun" (25 sivua, myy 10 eurolla).

Täysi Käyttöoikeus -tilauksesi antaa sinulle kaikki 33 generaattoria kaupallisella lisenssillä. Luo kuva-arvaustehtäviä. Luo matematiikka tehtävät alakouluun. Luo kertotaulut tulostettava -paketteja. Luo yhteenlasku ja vähennyslasku tehtävät -kokoelmia. Myy kaikkia. Kilpailijat veloittavat 79-199 euroa vuodessa lisää kaupallisista oikeuksista. Sinun tilauksessasi se on mukana ilmaiseksi 240 eurolla vuodessa.`,
        quote: 'Tilaukseni maksoi itsensä takaisin ensimmäisessä kuussa!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from Finnish word-guess.md
  faq: {
    sectionTitle: 'Usein Kysytyt Kysymykset - Tulostettavat Tehtävät Lapsille Ilmainen Kuva-Arvaustehtävistä',
    sectionDescription: 'Vastaukset yleisimpiin kysymyksiin kuva-arvaustehtävistä. Hinnoittelusta ominaisuuksiin. Käytöstä räätälöintiin. Kaikki mitä tarvitset tietää ennen aloittamista.',
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
        question: 'Onko Tämä Kuva-Arvaustehtävägeneraattori Todella Ilmainen Käyttää?',
        answer: 'Kuva-arvaustehtävägeneraattori vaatii Täysi Käyttöoikeus -tilauksen, joka maksaa 240 euroa vuodessa tai 25 euroa kuukaudessa. Tilauksesi antaa sinulle rajattoman kuva-arvaustehtävien luomisen ilman sivukohtaisia maksuja. Luo niin monta tulostettavat tehtävät lapsille ilmainen tehtävää kuin tarvitset ilman lisämaksuja. Peruspaketti sisältää 10 suosittua tehtävägeneraattoria ja maksaa 144 euroa vuodessa. Täysi Käyttöoikeus sisältää kaikki 33 tehtävägeneraattorityyppiä mukaan lukien kuva-arvaustehtävät.',
      },
      {
        id: '2',
        question: 'Voinko Tulostaa Kuva-Arvaustehtävät Kotona Tavallisella Tulostimella?',
        answer: 'Kyllä voit. Kuva-arvaustehtävät on suunniteltu tavallisille kotitulostimille. Lataa PDF-muodossa täydellistä tulostusyhteensopivuutta varten. Valitse harmaasävyvaihtoehto säästääksesi värimustetta. Tulosta Letter-koossa (612×792) tai A4-koossa (595×842). Kaikki elementit sopivat täydellisesti tavalliset kotitulostimen paperille. Ammattitulostus toimii myös loistavasti. 300 DPI -laatu varmistaa teräväpiirtoiset reunat ja selkeät kuvat ammattitulostimilla.',
      },
      {
        id: '3',
        question: 'Tarvitsenko Suunnitteluosaamista Luodakseni Kuva-Arvaustehtäviä?',
        answer: 'Ei. Kuva-arvaustehtävägeneraattori on suunniteltu opettajille, jotka eivät ole suunnittelijoita. Valitse teema. Säädä vaikeutta. Klikkaa "Luo". Valmis. Koko prosessi vie alle kolme minuuttia ilman suunnitteluosaamista. Generaattori tekee kaiken automaattisesti. Jos haluat muokata tehtäviä, raahaa-ja-pudota-käyttöliittymä on erittäin yksinkertainen.',
      },
      {
        id: '4',
        question: 'Voinko Käyttää Kuva-Arvaustehtäviä Luokkahuoneessa Oppilailleni?',
        answer: 'Kyllä. Täysi Käyttöoikeus -tilaus sisältää rajattoman luokkahuonekäytön. Luo kuva-arvaustehtäviä esiopetuksen oppilaille. Tulosta ne kaikille 20 oppilaalle. Luo uusia tehtäviä joka viikko. Ei rajoituksia luokkahuonekäyttöön. Ei lisämaksuja oppilasmäärän perusteella. Yhdistä kuva-arvaustehtävät muihin tulostettavat tehtävät lapsille ilmainen tehtäviin samasta tilauksesta.',
      },
      {
        id: '5',
        question: 'Millä Kielillä Kuva-Arvaustehtävät Ovat Saatavilla?',
        answer: 'Kuva-arvaustehtävät toimivat 11 kielellä: suomi, englanti, saksa, ranska, espanja, italia, portugali (Brasilia), hollanti, tanska, ruotsi, norja. Vaihda käyttöliittymän kieli yhdellä klikkauksella. Kaikki valikot, painikkeet ja ohjeet päivittyvät välittömästi valitsemallesi kielelle. Luo sisältöä millä tahansa näistä kielistä lataamalla kuvia tiedostonimillä kyseisellä kielellä.',
      },
      {
        id: '6',
        question: 'Voinko Myydä Luomiani Kuva-Arvaustehtäviä?',
        answer: 'Kyllä. Täysi Käyttöoikeus -tilaus sisältää täydellisen kaupallisen print-on-demand -lisenssin ilman lisämaksuja. Myy kuva-arvaustehtäviä Teachers Pay Teachers -palvelussa. Myy värityskuvia lapsille tulostettava Etsyssä. Myy kertotaulut tulostettava Amazon KDP:ssä. Myy yhteenlasku ja vähennyslasku tehtävät omassa verkkokaupassa. Ei attribuutiota vaaditaan. Ei rojalteja maksettava.',
      },
      {
        id: '7',
        question: 'Kuinka Mukautetaan Kuva-Arvaustehtäviä Oppilailleni?',
        answer: 'Kuva-arvaustehtävät antavat täydellisen hallinnan jokaisesta elementistä. Raahaa kuvia uusiin paikkoihin. Kierrä niitä täydelliseen kulmaan. Skaalaa niitä suuremmiksi tai pienemmiksi näkövammaisille oppilaille. Poista elementtejä yksinkertaistaaksesi esikouluoppilaille. Lisää tekstiä mukautettuihin ohjeisiin. Muuta värejä oppilaittesi lempiväreihin. Lisää taustateemat visuaalista kiinnostavuutta varten.',
      },
      {
        id: '8',
        question: 'Mille Ikäryhmille Nämä Kuva-Arvaustehtävät Sopivat Parhaiten?',
        answer: 'Kuva-arvaustehtävät sopivat 5-9-vuotiaille lapsille. Esiopetuksen oppilaat (6-vuotiaat) hyötyvät "helppo" -tasosta paljon vihjeillä. Ensimmäisen luokan oppilaat (7-vuotiaat) hyötyvät "normaali" -tasosta joillakin vihjeillä. Toisen ja kolmannen luokan oppilaat (8-9-vuotiaat) hyötyvät "vaikea" -tasosta vähillä vihjeillä tai ilman vihjeitä. Säädä vaikeutta välittömästi jokaiselle oppilaalle.',
      },
      {
        id: '9',
        question: 'Voinko Ladata Omia Kuvia Kuva-Arvaustehtäviin?',
        answer: 'Kyllä voit. Klikkaa "Lataa omat kuvat" -osiota. Valitse useita kuvatiedostoja kerralla. Kaikki yleiset muodot toimivat: JPEG, PNG, GIF. Yhdistä ne kirjastokuviin luodaksesi personoituja tehtäviä. Käytä oppilaittesi omien esineiden kuvia. Käytä luokkahuoneen maskottien kuvia. Järjestelmä käyttää tiedostonimiä sanoina tehtävissä.',
      },
      {
        id: '10',
        question: 'Kuinka Kauan Kuva-Arvaustehtävän Luominen Kestää?',
        answer: 'Kuva-arvaustehtävän luominen vie alle kolme minuuttia alusta loppuun. Valitse teema tai kuvat (30 sekuntia). Säädä vaikeustasoa ja asetuksia (30 sekuntia). Klikkaa "Luo" (2-3 sekuntia luontiin). Muokkaa pohjalla tarpeen mukaan (60-90 sekuntia). Lataa PDF tai JPEG (2-3 sekuntia). Yhteensä: alle 3 minuuttia. Perinteinen kuva-arvaustehtävän luominen ottaa 30-60 minuuttia.',
      },
      {
        id: '11',
        question: 'Sisältyvätkö Kuva-Arvaustehtäviin Vastausavaimet?',
        answer: 'Kuva-arvaustehtävät eivät sisällä erillistä vastausavainta, koska vastaukset ovat ilmeisiä kuvista. Jokainen kuva näyttää esineen tai eläimen. Sanan pitäisi vastata kuvaa. Esimerkiksi koiran kuva = sana "KOIRA". Kissan kuva = sana "KISSA". Auton kuva = sana "AUTO". Jos käytät omia kuvia mukautetuilla tiedostonimillä, pidä lista tiedostonimistä vastausavaimena.',
      },
      {
        id: '12',
        question: 'Voinko Luoda Kuva-Arvaustehtäviä Tietyistä Kouluaineista?',
        answer: 'Kyllä. Käytä 3000+ kuvakirjaston teemoja ainekohtaisiin tehtäviin. Luonnontieteet: luo eläinteema (200+ eläinkuvaa), kasviteema, avaruusteema. Matematiikka: yhdistä kuva-arvaustehtävät matematiikka tehtävät alakoulu tehtäviin, kertotaulut tulostettava tehtäviin, yhteenlasku ja vähennyslasku tehtävät harjoituksiin. Taide: yhdistä kuva-arvaustehtävät värityskuvia lapsille tulostettava tehtäviin.',
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
      'Rajoittamaton tehtävien luonti',
      'Kaupallinen lisenssi sisältyy',
      '11 kielen tuki',
      '3000+ teemaattista kuvaa',
      '300 DPI tulostuslaatu',
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
    sectionTitle: 'Yhdistä Muihin Tehtävämonistegeneraattoreihin',
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä kuva-arvaustehtävät näihin täydentäviin generaattoreihin.',
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
        slug: 'word-search',
        name: 'Sananetsintä',
        category: 'Kieli',
        icon: '🔤',
        description: 'Yhdistä kuva-arvaustehtävät sananetsintätehtäviin sanaston ja kirjaintunnistuksen vahvistamiseen.',
      },
      {
        id: '2',
        slug: 'word-scramble',
        name: 'Sanansekoitus',
        category: 'Kieli',
        icon: '🔀',
        description: 'Täydennä kuva-arvaustehtäviä sanansekoitustehtävillä oikeinkirjoituksen harjoitteluun.',
      },
      {
        id: '3',
        slug: 'matching-app',
        name: 'Yhdistä Parit',
        category: 'Kognitiivinen',
        icon: '🔗',
        description: 'Yhdistä kuva-arvaustehtävät yhdistämistehtäviin visuaalisen tunnistamisen kehittämiseen.',
      },
      {
        id: '4',
        slug: 'image-crossword',
        name: 'Ristisanatehtävät',
        category: 'Kieli',
        icon: '📝',
        description: 'Laajenna sanastotaitoja kuvapohjaisilla ristisanatehtävillä.',
      },
      {
        id: '5',
        slug: 'writing-app',
        name: 'Kirjoitustehtävät',
        category: 'Hienomotoriikka',
        icon: '✏️',
        description: 'Yhdistä kuva-arvaustehtävät kirjoitustehtäviin kirjainten muodostamisen harjoitteluun.',
      },
      {
        id: '6',
        slug: 'find-and-count',
        name: 'Etsi ja Laske',
        category: 'Matematiikka',
        icon: '🔍',
        description: 'Täydennä kuva-arvaustehtäviä etsi ja laske -tehtävillä laskemisen harjoitteluun.',
      },
    ],
  },
};

export default wordGuessFiContent;
