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
    title: 'Yhteenlaskun Tehtävät Generaattori | Tulostettavat Matematiikka',
    description: 'Luo ammattimaisia yhteenlaskun tehtäviä kuvilla yhteenlaskugeneraattorillamme. Peruspaketti-tilauksesi antaa sinulle rajattoman tehtävien luonnin ilman maksuja.',
    keywords: 'yhteenlasku tehtävät, matematiikka tehtävät alakoulu, esiopetus materiaali ilmainen, tulostettavat tehtävät lapsille ilmainen, yhteenlasku ja vähennyslasku tehtävät, hienomotoriikka harjoitukset',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/yhteenlasku-tyoarkit',
  },

  // Hero Section - FULL text from Finnish addition.md
  hero: {
    title: 'Yhteenlaskun Tehtävät',
    subtitle: 'Tulostettavat Matematiikka Tehtävät Alakoulu ja Esiopetus',
    description: `Luo ammattimaisia yhteenlaskun tehtäviä kuvilla yhteenlaskugeneraattorillamme. Peruspaketti-tilauksesi antaa sinulle rajattoman tehtävien luonnin ilman maksuja per tehtävä. Generoi tulostettavia matematiikka tehtävät alakoulu ja esiopetus materiaali ilmainen -oppilaille. Lataa korkealaatuisia PDF-tehtäviä alle 3 minuutissa.

Yhteenlaskun tehtävätyökalu tekee matematiikan oppimisesta visuaalista ja hauskaa. Luo yhteenlaskutehtäviä käyttäen yli 3000 lapsystävällistä kuvaa. Valitse eläinten, ruoan, lelujen tai kouluvälineiden kuvista. Jokainen yhteenlaskun tehtävä on täysin mukautettavissa. Muokkaa kaikkea pohjasta, reunoista ja tekstiin.

Generaattori luo sekä oppilaiden työarkin että opettajan vastausavaimen. Valitse 1-10 tehtävää per työarkki. Säädä vaikeustasoa muuttamalla esineiden määrää ryhmissä. Minimi 1 esine ja maksimi 10 esinettä per ryhmä. Neljä erilaista tehtävätyyppiä sopivat kaikille oppijatasoille.

Kuva-kuva -tila näyttää yhteenlaskut pelkillä kuvilla. Kuva-numero -tila yhdistää kuvat numeroihin. Puuttuva yhteenlaskettava -tila opettaa käänteistä ajattelua. Sekoitettu tila tarjoaa vaihtelua yhdessä työarkissa. Jokainen tila tukee erilaista oppimistyyliä ja kehitysvaihetta.`,
    previewImageSrc: '/samples/english/addition/addition_worksheet portrait.jpeg',
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
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/addition/addition_worksheet portrait.jpeg',
        answerKeySrc: '/samples/english/addition/addition_answer_key portrait.jpeg',
        altText: 'Yhteenlaskutehtävä pystysuunnassa kuva-kuva tilassa esiopetukseen',
        pdfDownloadUrl: '/samples/english/addition/addition_worksheet portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/addition/addition_worksheet landscape.jpeg',
        answerKeySrc: '/samples/english/addition/addition_answer_key landscape.jpeg',
        altText: 'Yhteenlaskutehtävä vaakasuunnassa värikkäillä kuvilla alakoululaisille',
        pdfDownloadUrl: '/samples/english/addition/addition_worksheet landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/addition/image and number.jpeg',
        answerKeySrc: '/samples/english/addition/image and number answer_key.jpeg',
        altText: 'Kuva ja numero -tila yhteenlaskutehtävä numeroiden tunnistamiseen',
        pdfDownloadUrl: '/samples/english/addition/image and number.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/english/addition/find addend.jpeg',
        answerKeySrc: '/samples/english/addition/find addend answer_key.jpeg',
        altText: 'Puuttuva yhteenlaskettava -tehtävä käänteisen ajattelun harjoitteluun',
        pdfDownloadUrl: '/samples/english/addition/find addend.pdf',
      },
      {
        id: '5',
        worksheetSrc: '/samples/english/addition/mixed mode.jpeg',
        answerKeySrc: '/samples/english/addition/mixed mode answer_key.jpeg',
        altText: 'Sekoitettu tila yhteenlaskutehtävä monipuoliseen harjoitteluun',
        pdfDownloadUrl: '/samples/english/addition/mixed mode.pdf',
      },
    ],
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
        title: 'Luo Matematiikka Tehtävät Kolmella Klikkauksella',
        description: `Yhteenlaskutehtävien luominen on uskomattoman nopeaa. Valitse teema tai yksittäiset kuvat kuvakirjastosta. Klikkaa "Generoi" nähdäksesi välittömän esikatselun. Lataa PDF tai JPEG alle minuutissa. Ei monimutkaista ohjelmistoa opittavaksi. Ei suunnittelutaitoja tarvita.

Generaattori luo automaattisesti sekä oppilaan työarkin että opettajan vastausavaimen. Molemmat latautuvat korkealla 300 DPI resoluutiolla. Täydellinen tulostamiseen kotitulostimella tai ammattilaispainopalvelussa. Matematiikka tehtävät alakoulu valmistuvat nopeammin kuin perinteiset menetelmät. Säästät 30-60 minuuttia per työarkki verrattuna käsinluontiin.

Valitse neljästä eri tehtävätyypistä. Kuva-kuva tila visuaaliseen oppimiseen. Kuva-numero tila numeroiden tunnistamiseen. Puuttuva yhteenlaskettava tila ongelmanratkaisuun. Sekoitettu tila monipuoliseen harjoitteluun. Jokainen klikki vie sinua lähemmäs täydellistä yhteenlaskun tehtävää.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Täysi Muokattavuus Pohjalla',
        description: `Jokainen elementti pohjalla on täysin muokattavissa. Raahaa kuvia uusiin paikkoihin hiirellä. Kierrä elementtejä kahvoista. Skaalaa kuvia suuremmiksi tai pienemmiksi. Poista elementtejä Delete-näppäimellä. Tuo elementtejä eteen tai lähetä taakse kerrosjärjestyksessä.

Tekstiä voi lisätä mistä tahansa pohjalle. Muuta fonttikokoa 8 pikselistä ylöspäin. Valitse seitsemästä lapsystävällisestä fontista. Säädä tekstin väriä värivalitsimella. Lisää tekstin ääriviivoja 0-10 pikseliä paksuudelle. Täydellinen otsikkojen, ohjeiden ja mukautettujen nimikentien luomiseen.

Tausta- ja reunateemat ovat täysin säädettävissä. Valitse yli 50 eri teemasta. Säädä taustan läpinäkyvyyttä liukusäätimellä. Kokeile erilaisia yhdistelmiä löytääksesi täydellisen ulkoasun. Matematiikka tehtävät alakoulu muuttuvat visuaalisesti houkutteleviksi esiopetus materiaali ilmainen -materiaaleiksi. Oppilaat rakastavat värikkäitä, mukautettuja tehtäviä.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Lataa Omia Kuvia',
        description: `Monitiedostolataus tukee useamman kuvan lataamisen kerralla. Kaikki yleiset kuvaformaatit toimivat: JPEG, PNG, GIF. Yhdistä kirjaston kuvat omiin kuvaasi. Luo täysin personoituja yhteenlasku ja vähennyslasku tehtävät oppilaiden nimillä tai luokkahuoneen esineillä.

Lataa luokkahuoneen esineiden kuvia. Käytä oppilaiden lempieläinten kuvia motivointiin. Lisää kulttuurisesti relevantteja kuvia kansainvälisiin luokkahuoneisiin. Luo tehtäviä tiettyjen oppimisteemojen ympärille. Ominaisuus tekee jokaisesta yhteenlaskutehtävästä ainutlaatuisen.

Ladatut kuvat näkyvät istunnon aikana esikatselualueella. Klikkaa kuvaa lisätäksesi sen pohjalle. Poista klikkaamalla uudestaan. Yhdistä 3000+ kirjaston kuvat omiin kuvaasi rajattomiin yhdistelmiin. Matematiikka tehtävät alakoulu muuttuvat henkilökohtaisiksi oppimistyökaluiksi. Oppilaat sitoutuvat paremmin tutuilla kuvilla.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Kielen Tuki',
        description: `Käyttöliittymä saatavilla 11 kielellä. Sisältökieli tehtäville saatavilla samoilla 11 kielellä. Vaihda kieliä valikosta milloin tahansa. Täydellinen ESL- ja kaksikieliseen opetukseen. Kansainväliset koulut saavat tukea useille kielille.

Tuetut kielet: suomi, englanti, saksa, ranska, espanja, italia, portugali, hollanti, ruotsi, tanska, norja. Jokainen kieli sisältää täydelliset käännökset kaikille käyttöliittymän elementeille. Matematiikka tehtävät alakoulu toimivat kaikilla kielillä saumattomasti. Esiopetus materiaali ilmainen -työkalut tukevat monikielisiä oppimisohjelmia.

Kielituki on erityisen tärkeä kielen oppimisessa. Luo yhteenlaskutehtäviä opiskeltavalla kielellä. Opeta sekä matematiikkaa että kieltä samanaikaisesti. Kaksikielisten upotusluokkien opettajat säästävät tunteja. Perintökielten ohjelmat hyötyvät kotikielen tuesta. Aikuisten ESL-ohjelmat käyttävät numeroita kielenoppimiseen.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kaupallinen Lisenssi Tulostuksen Mukaan',
        description: `Peruspaketti-tilauksesi sisältää täyden kaupallisen tulostuksen mukaan -lisenssin ilman lisäkustannuksia. Myy luomiasi yhteenlasku ja vähennyslasku tehtävät Teachers Pay Teachersissa. Listaa tulostettavat tehtävät Etsyssä. Julkaise matematiikka tehtävät alakoulu -kirjoja Amazon KDP:ssä. Ei tekijäviitettä vaaditaan.

Monet opettajat ansaitsevat 500-5000 dollaria kuukaudessa myymällä tehtäviä. Luo tehtäväpaketteja sesonkiteemoilla. Yhdistä useita tehtävätyyppejä täydellisiksi oppimispaketeiksi. 300 DPI laatu varmistaa ammattimaiset tulosmyyntituotteet. Kilpailijat veloittavat 50-200 dollaria vuodessa lisää kaupallisista oikeuksista.

Peruspaketti sisältää kaupallisen lisenssin 144 euron vuosihinnassa. Täydellinen opettajayrittäjille. Rakenna passiivisia tuloja luokkahuoneen materiaalien myymisestä. Pinterest-markkinointi ohjaa liikennettä Etsy-kauppoihisi. Jäsen- ja tilausliikemalleja digitaalisille tuotteille. Esiopetus materiaali ilmainen -työkalut muuttuvat tulonlähteiksi.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Kuvakirjasto',
        description: `Yli 3000 lapsystävällistä kuvaa sisältyy tilaukseesi. Teemaperusteinen organisointi helpottaa oikeiden kuvien löytämistä. Eläimet, ruoka, koulu, urheilu, luonto, lelut, ajoneuvot ja muut. Valitse teema nähdäksesi kaikki sen kategorian kuvat. Tai selaa koko kirjastoa "Kaikki teemat" -vaihtoehdolla.

Hakutoiminto suodattaa kuvia avainsanan mukaan. Kirjoita "kissa" nähdäksesi kaikki kissaan liittyvät kuvat. Kirjoita "pallo" nähdäksesi pallo-opetuksen kuvat. Nopeampi kuin selaaminen sadoissa kuvissa. Löydä tarkalleen mitä tarvitset sekunneissa.

Jokainen kuva on optimoitu lapsille sopivaksi sisällöksi. Kirkkaat värit houkuttelevat nuoria oppijoita. Selkeät, yksinkertaiset kuvat ehkäisevät sekaannusta. Kaikki taustat ja reunat sisältyvät ilman lisämaksua. Toisin kuin kilpailijat, jotka veloittavat per kuva, kaikki visuaalinen sisältö sisältyy tilaukseesi. Säästät 200-400 euroa vuodessa verrattuna kuvamaksu-alustoihin.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Ammattimainen 300 DPI Laatu',
        description: `Korkearesoluutioinen vienti 300 DPI:ssä. Täydellinen tulostamiseen millä tahansa tulostimella. Täydellinen myyntiin ammattimaisilla tulospalveluilla. JPEG ja PDF -formaatit saatavilla. Harmaasävyvaihtoehto säästää mustetta tulostuksessa. Ympäristöystävällinen valinta koti- ja koulutulostukseen.

PDF-lataukset luovat tulostusvalmiita asiakirjoja. JPEG-lataukset luovat korkearesoluutioisia kuvatiedostoja. Lataa oppilaan versio (ei vastauksia) tai opettajan vastausavain. Molemmat formaatit molemmille versioille. Neljä latausvaihtoehtoa per generoitu tehtäväsarja.

Ammattimainen laatu rakentaa luottamusta vanhempien kanssa. Matematiikka tehtävät alakoulu näyttävät opetuskustantajien materiaaleilta. Esiopetus materiaali ilmainen -työkalut tuottavat ammattitason tuloksia. Oppilaat kohtelevat korkealaatuisia tehtäviä vakavammin. Tulostettavat tehtävät lapsille ilmainen -generaattori kilpailee kalliiden kaupallisten työkalujen kanssa. Peruspaketti-tilaus antaa ammattitason tulokset murto-osalla kustannuksista.`,
        highlighted: true,
      },
      {
        id: '8',
        icon: '✅',
        title: 'Vastausavaimen Generointi',
        description: `Generaattori luo automaattisesti sekä oppilaan työarkin että opettajan vastausavaimen. Molemmat latautuvat korkealla 300 DPI resoluutiolla. Vastausavain näyttää kaikki oikeat vastaukset selkeästi. Helppo tarkistaa oppilaiden vastaukset nopeasti.

Lataa molemmat PDF-muodossa arviointia varten. Tulosta vastausavain itsellesi. Tulosta oppilaan versio luokalle. Säilytä digitaaliset vastausavaimet nopeaa tarkistusta varten. Esiopetus materiaali ilmainen -generaattori luo molemmat versiot automaattisesti.

Vastausavaimet säästävät valtavasti opettajan aikaa. Ei manuaalista vastausten laskemista tarvita. Tarkista koko luokan työt minuuteissa. Matematiikka tehtävät alakoulu -arviointi muuttuu tehokkaaksi. Yhteenlasku ja vähennyslasku tehtävät sisältävät aina molemmat versiot.`,
        highlighted: false,
      },
    ],
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
        icon: '👶',
        title: 'Esiopetuksen Opettajat',
        subtitle: 'Esiopetus Materiaali Ilmainen ja Hienomotoriikka Harjoitukset',
        description: `Esiopetuksen opettajat rakentavat matematiikan perusteita 6-vuotiaille lapsille. Yhteenlaskutehtävät visuaalisilla kuvilla tekevät abstraktit käsitteet konkreettisiksi. Kuva + Kuva -tila sopii täydellisesti esiopetukseen. Lapset laskevat esineitä ennen numeroiden oppimista.

Valitse tutut teemat kiinnittääksesi lasten huomion. Eläinten kuvat motivoivat eläinystävällisiä lapsia. Ruoan kuvat yhdistävät matematiikan päivittäiseen elämään. Lelujen kuvat tekevät oppimisesta leikinomaisempaa. Esiopetus materiaali ilmainen -työkalut tukevat leikkipohjaista oppimista.

Aseta minimi 1 esine ja maksimi 3 esinettä esiopetukselle. Pienet määrät sopivat aloitteleville laskijoille. Generoi 3-4 tehtävää per työarkki. Lyhyemmät työarkit pitävät esioppilaiden huomion. Sisällytä värikkäät taustat ja reunat visuaaliseen kiinnostavuuteen. Hienomotoriikka harjoitukset yhdistyvät matematiikkaan kun lapset kirjoittavat numeroita vastauksiin.`,
        quote: 'Oppilaani rakastavat kuvallisia matematiikkatehtäviä!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun Opettajat',
        subtitle: 'Matematiikka Tehtävät Alakoulu 1.-3. Luokalle',
        description: `Alakoulun opettajat 1.-3. luokille tarvitsevat monipuolista matematiikkasisältöä. 1. luokan opettajat käyttävät Kuva + Numero -tilaa yhdistääkseen visuaalit numeroihin. 2. luokan opettajat sekoittavat tehtävätyyppejä taitojen kehittämiseksi. 3. luokan opettajat käyttävät Etsi Yhteenlaskettava -tilaa haastavampaan ajatteluun.

Säädä vaikeustasoa muuttamalla esineiden määrää. 1. luokalle: min=1, max=5. 2. luokalle: min=2, max=7. 3. luokalle: min=3, max=10. Matematiikka tehtävät alakoulu kasvavat oppilaiden kehityksen mukana. Sama työkalu palvelee useita luokka-asteita.

Luo eriytettyjä tehtäviä samalle luokalle. Vahvemmat oppijat saavat suurempia numeroita. Kamppailevat oppilaat saavat pienempiä numeroita. Kaikki työarkit näyttävät ammattimaisilta ja samanlaisilta. Kukaan ei tunne olevansa "helpossa ryhmässä". Yhteenlasku ja vähennyslasku tehtävät sopeutuvat jokaiselle oppilaalle.`,
        quote: 'Eriyttäminen on nyt helppoa ja nopeaa.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajavanhemmat',
        subtitle: 'Esiopetus Materiaali Ilmainen ja Matematiikka Tehtävät Useille Lapsille',
        description: `Kotiopettajavanhemmat opettavat usein useita lapsia eri ikäryhmistä. Yhteenlaskugeneraattori luo räätälöityjä tehtäviä jokaiselle lapselle. 6-vuotias saa yksinkertaisia Kuva + Kuva -tehtäviä. 8-vuotias saa haastavampia Kuva + Numero -tehtäviä. 10-vuotias saa Etsi Yhteenlaskettava -tehtäviä.

Valitse eri teemat jokaiselle lapselle kiinnostuksen ylläpitämiseksi. Yksi lapsi rakastaa eläimiä, toinen ajoneuvoja. Personoi tehtävät motivoidaksesi jokaista oppijaa. Peruspaketti-tilaus kattaa koko perheen ilman per-lapsi-maksuja. Tulostettavat tehtävät lapsille ilmainen -luonti tekee kotiopetuksesta edullisempaa.

Luo viikoittaiset matematiikkapaketit kaikille lapsille yhdellä istunnolla. Generoi maanantaista perjantaihin viiden päivän tehtävät. Säilytä vastausavaimet nopeaan arviointiin. Kotiopettajat säästävät tunteja valmistautumisajasta viikossa. Matematiikka tehtävät alakoulu -valmistelu muuttuu 30 minuutista 5 minuuttiin.`,
        quote: 'Yksi työkalu kattaa kaikkien lasteni vuosiluokat.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Kielenopettajat',
        subtitle: 'Yhteenlasku ja Vähennyslasku Tehtävät 11 Kielellä',
        description: `ESL-opettajat käyttävät yhteenlaskutehtäviä opettaakseen sekä matematiikkaa että kieltä. Vaihda sisältökieli valikkovalinnalla. Luo samoja tehtäviä suomeksi, englanniksi, ruotsiksi tai millä tahansa 11 tuetusta kielestä. Oppilaat oppivat numerosanoja kohdekielellä matematiikan yhteydessä.

Kaksikieliset upotusluokat hyötyvät monikielisestä tuesta. Opeta matematiikkaa molemmilla kielillä rinnakkain. Luo työarkki suomeksi maanantaina. Luo sama työarkki englanniksi tiistaina. Oppilaat näkevät matematiikan käsitteiden siirtyvän kielten välillä. Matematiikka tehtävät alakoulu muuttuvat kieltenoppimistyökaluiksi.

Kansainväliset koulut tarvitsevat sisältöä useilla kielillä. Sama generaattori palvelee kaikkia kieliä. Ei erillisiä tilauksia kielittäin. Ei käännöskustannuksia. Tulostettavat tehtävät lapsille ilmainen -luonti kaikilla 11 kielellä sisältyy Peruspaketti-hintaan. Säästät tuhansia euroja käännöspalveluista.`,
        quote: 'Monikielisyystuki on ratkaisevaa luokkahuoneessani.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erikoisopettajat',
        subtitle: 'Esiopetus Materiaali Ilmainen Eriyttämiseen ja Hienomotoriikka Harjoitukset',
        description: `Erikoisopettajat eriyttävät opetusta yksilöllisten oppimistavoitteiden mukaisesti. Yhteenlaskugeneraattori tarjoaa äärettömän eriyttämisen. Säädä tehtävien määrää oppilaiden keskittymiskyvyn mukaan. Aseta minimi ja maksimi esineet taitotason mukaan. Valitse tehtävätila oppimistyyliin sopivaksi.

Lataa omia kuvia oppilaan kiinnostuksen mukaan. Autistinen lapsi joka rakastaa junia? Käytä junien kuvia jokaisessa tehtävässä. ADHD-oppilas joka rakastaa koiria? Käytä koirien kuvia motivoidaksesi keskittymään. Personointi parantaa sitoutumista merkittävästi. Esiopetus materiaali ilmainen -työkalut mukautuvat jokaiseen oppilaaseen.

Luo visuaalisia aikatauluja ja sosiaalisia tarinoita yhteenlaskun ympärille. Käytä tuttuja kuvia luokkahuoneesta. Rakenna ennustettavuutta yhdenmukaisilla tehtävärakenteilla. Hienomotoriikka harjoitukset integroituvat kun oppilaat kirjoittavat numeroita. Matematiikka tehtävät alakoulu tukevat useita oppimistavoitteita samanaikaisesti.`,
        quote: 'Voin nopeasti mukauttaa tehtäviä jokaisen oppilaan tarpeisiin.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy Tulostettavat Tehtävät Teachers Pay Teachersissa',
        description: `Opettajayrittäjät myyvät luomiaan materiaaleja lisätuloihin. Peruspaketti sisältää täyden kaupallisen lisenssin 144 eurolla vuodessa. Myy yhteenlaskutehtäviä Teachers Pay Teachersissa. Listaa tulostettavat PDF:t Etsyssä. Julkaise matalan sisällön kirjoja Amazon KDP:ssä.

Luo sesonkiteemalla tehtäväpaketteja. Jouluaiset yhteenlaskutehtävät myyvät marras-joulukuussa. Kesäiset tehtävät myyvät touko-elokuussa. Takaisin kouluun -paketit myyvät elo-syyskuussa. Yhteenlasku ja vähennyslasku tehtävät pysyvät ajankohtaisina koko vuoden. Luo 12 sesonkipakettia ja myy niitä vuosittain.

Yhdistä useita tehtävätyyppejä täydellisiksi oppimispaketeiksi. Yhteenlasku + vähennyslasku + kertotaulut = täydellinen matematiikkapaketti. Myy pakettina korkeampaan hintaan. 300 DPI laatu varmistaa ammattimaiset tulostuotteet. Asiakkaat luottavat korkealaatuisiin materiaaleihin.`,
        quote: 'Tilaukseni maksoi itsensä takaisin ensimmäisessä kuussa!',
      },
    ],
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
        question: 'Onko Tämä Yhteenlaskutehtävägeneraattori Todella Ilmainen Käyttää?',
        answer: 'Yhteenlaskutehtävägeneraattori vaatii Peruspaketti-tilauksen joka maksaa 144 euroa vuodessa tai 15 euroa kuukaudessa. Tilauksesi antaa rajattoman yhteenlaskutehtävien luonnin ilman per-tehtävä-maksuja. Generoi niin monta matematiikka tehtävät alakoulu -työarkkia kuin tarvitset ilman lisäkustannuksia. Luo satoja tehtäviä vuodessa samalla kiinteällä hinnalla.',
      },
      {
        id: '2',
        question: 'Voinko Tulostaa Yhteenlaskutehtäviä Kotona Tavallisella Tulostimella?',
        answer: 'Kyllä. Yhteenlaskutehtävät latautuvat PDF- tai JPEG-muodossa. Molemmat formaatit tulostavat täydellisesti tavallisilla kotitulostimilla. 300 DPI resoluutio varmistaa terävän tekstin ja selkeät kuvat. Harmaasävyvaihtoehto säästää värimustetta tulostuksessa. Valitse Letter-koko (US-standardi) tai A4-koko (kansainvälinen) tulostimeesi sopivaksi.',
      },
      {
        id: '3',
        question: 'Tarvitsenko Suunnittelutaitoja Luodakseni Yhteenlaskutehtäviä?',
        answer: 'Ei. Yhteenlaskugeneraattori on suunniteltu opettajille ja vanhemmille ilman suunnitteluosaamista. Klikkaa "Generoi" ja työarkki luodaan automaattisesti. Kaikki elementit asemoituvat täydellisesti ilman säätöjä. Ei Photoshopia tarvita. Ei InDesignia tarvita. Jos haluat personoida, muokkaustyökalut ovat yksinkertaisia. Raahaa elementtejä hiirellä. Klikkaa värivalitsimia värien muuttamiseen.',
      },
      {
        id: '4',
        question: 'Voinko Käyttää Yhteenlaskutehtäviä Luokkahuoneessani Oppilaille?',
        answer: 'Kyllä. Peruspaketti-tilaus sisältää rajattoman luokkahuonekäytön. Tulosta työarkkeja kaikille oppilaillesi. Kopioi tehtäviä pienryhmille. Jaa digitaalisesti Google Classroomissa. Käytä LMS-alustallasi. Ei per-oppilas-maksuja. Ei kopiointirajoituksia. Luo eriytettyjä tehtäviä eri taitotasoille.',
      },
      {
        id: '5',
        question: 'Millä Kielillä Yhteenlaskutehtävät Ovat Saatavilla?',
        answer: 'Yhteenlaskugeneraattori tukee 11 kieltä täydellisesti. Suomi, englanti, saksa, ranska, espanja, italia, portugali, hollanti, ruotsi, tanska, norja. Käyttöliittymä ja sisältö molemmat vaihtuvat valitulle kielelle. Täydellinen ESL-opettajille ja kaksikielisille luokkahuoneille. Luo samoja tehtäviä useilla kielillä.',
      },
      {
        id: '6',
        question: 'Voinko Myydä Luomiani Yhteenlaskutehtäviä Tällä Generaattorilla?',
        answer: 'Kyllä. Peruspaketti-tilaus sisältää täyden kaupallisen tulostuksen mukaan -lisenssin ilman lisäkustannuksia. Myy yhteenlaskutehtäviä Teachers Pay Teachersissa. Listaa tulostettavia PDF-tiedostoja Etsyssä. Julkaise matalan sisällön kirjoja Amazon KDP:ssä. Ei tekijäviitettä vaaditaan. Ei rojaltimaksuja.',
      },
      {
        id: '7',
        question: 'Kuinka Mukautan Yhteenlaskutehtäviä Oppilailleni?',
        answer: 'Mukauttaminen alkaa tehtävätilan valinnalla. Kuva + Kuva -tila esiopetukselle. Kuva + Numero -tila alakoulun 1. luokalle. Etsi Yhteenlaskettava -tila haastavampaan ajatteluun. Säädä esineiden määrää minimi 1 - maksimi 10. Pienempi = helpompi, suurempi = vaikeampi. Lataa omia kuvia personointiin. Käytä oppilaan lempieläinten kuvia. Muokkaa tekstin värejä ja fontteja.',
      },
      {
        id: '8',
        question: 'Millaisille Ikäryhmille Nämä Yhteenlaskutehtävät Sopivat Parhaiten?',
        answer: 'Yhteenlaskutehtävät sopivat 5-9-vuotiaille lapsille. Esiopetus (6-vuotiaat) aloittavat Kuva + Kuva -tilalla. Alakoulun 1. luokka (7-vuotiaat) siirtyy Kuva + Numero -tilaan. 2.-3. luokat (8-9-vuotiaat) käyttävät Etsi Yhteenlaskettava -tilaa. Jokainen ikäryhmä saa sopivan haasteensa. Säädä vaikeustasoa ikäryhmän mukaan.',
      },
      {
        id: '9',
        question: 'Voinko Ladata Omia Kuvia Yhteenlaskutehtäviin?',
        answer: 'Kyllä. Monitiedostolataus tukee useiden kuvien lataamisen kerralla. Klikkaa "Valitse tiedostot" ja valitse JPEG, PNG tai GIF -tiedostoja tietokoneeltasi. Ladatut kuvat näkyvät esikatselualueella. Klikkaa kuvaa lisätäksesi sen tehtävääsi. Yhdistä kirjaston 3000+ kuvat omiin kuvaasi. Luo täysin personoituja tehtäviä.',
      },
      {
        id: '10',
        question: 'Kauanko Yhteenlaskutehtävän Luominen Kestää?',
        answer: 'Täydellinen yhteenlaskutehtävä valmistuu alle 3 minuutissa alusta loppuun. Valitse kuvat (30 sekuntia). Säädä asetukset (30 sekuntia). Generoi työarkki (10 sekuntia). Lataa PDF (10 sekuntia). Yhteensä alle 2 minuuttia peruskonfiguraatiolla. Jos personoit lisää, vie 3-5 minuuttia. Silti paljon nopeampaa kuin perinteiset menetelmät.',
      },
      {
        id: '11',
        question: 'Sisältyvätkö Yhteenlaskutehtäviin Vastausavaimet?',
        answer: 'Kyllä. Klikkaa "Generoi Vastausavain" -painiketta luodaksesi opettajan version. Vastausavain näyttää kaikki oikeat vastaukset. Sama asettelu kuin oppilaan versio. Helppo verrata oppilaiden töitä vastausavaimeen. Molemmat versiot latautuvat samassa 300 DPI laadussa. Lataa molemmat PDF-muodossa arviointia varten.',
      },
      {
        id: '12',
        question: 'Voinko Luoda Yhteenlaskutehtäviä Tietyistä Kouluaineista?',
        answer: 'Yhteenlaskugeneraattori keskittyy matematiikan yhteenlaskuun visuaalisilla kuvilla. Täydelliseksi opetuspaketiksi yhdistä se muiden 32 generaattorimme kanssa. Värityskuvia lapsille tulostettava -generaattori luo väritystehtäviä hienomotoriikkaan. Kirjaimet harjoittelu esikoulu -työkalut opettavat aakkosia ja kirjoittamista. Kaikki 33 generaattoria toimivat yhdessä täydellisiin oppimispaketteihin.',
      },
    ],
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
        slug: 'subtraction',
        name: 'Vähennyslasku',
        category: 'Matematiikka',
        icon: '➖',
        description: 'Täydennä yhteenlaskuharjoittelua vähennyslaskutehtävillä täydelliseen peruslaskuoperaatioiden hallintaan.',
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
        slug: 'code-addition',
        name: 'Koodiyhteenlasku',
        category: 'Matematiikka',
        icon: '🔐',
        description: 'Tee matematiikasta seikkailua salaisilla koodeilla ja yhteenlaskutehtävillä.',
      },
      {
        id: '4',
        slug: 'coloring',
        name: 'Värityskuvat',
        category: 'Luovuus',
        icon: '🎨',
        description: 'Palkitse valmiit matematiikkatehtävät teemaattisilla värityskuvilla, jotka kehittävät hienomotoriikkaa.',
      },
      {
        id: '5',
        slug: 'find-and-count',
        name: 'Etsi ja Laske',
        category: 'Matematiikka',
        icon: '🔍',
        description: 'Yhdistä laskeminen etsintätehtäviin visuaalisen numerotuntemuksen kehittämiseksi.',
      },
      {
        id: '6',
        slug: 'more-less',
        name: 'Enemmän vai Vähemmän',
        category: 'Matematiikka',
        icon: '⚖️',
        description: 'Opeta vertailukäsitteitä ja lukujen suuruusjärjestystä hauskoilla tehtävillä.',
      },
    ],
  },
};

export default additionFiContent;
