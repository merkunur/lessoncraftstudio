import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Code Addition Worksheets - Finnish Content (Kuvapohjainen Yhteenlasku Tehtävät)
 *
 * File: frontend/content/product-pages/fi/kuva-yhteenlasku-tyoarkit.ts
 * URL: /fi/apps/kuva-yhteenlasku-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/code-addition.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const codeAdditionFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'kuva-yhteenlasku-tyoarkit',
    appId: 'code-addition',
    title: 'Kuvapohjainen Yhteenlasku Tehtävämoniste | Tulostettavat Tehtävät Lapsille Ilmainen Matematiikka Alakoulu',
    description: 'Luo visuaalisia yhteenlaskutehtäviä käyttäen kuvia yli 3000 kuvan kirjastosta. Kuvapohjainen yhteenlaskugeneraattori tekee matematiikan oppimisesta konkreettista esiopetukseen ja alakouluun. Täysi Pääsy -tilauksesi antaa sinulle rajattoman pääsyn.',
    keywords: 'kuvapohjainen yhteenlasku, yhteenlasku ja vähennyslasku tehtävät, matematiikka tehtävät alakoulu, esiopetus materiaali ilmainen, tulostettavat tehtävät lapsille ilmainen, hienomotoriikka harjoitukset',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/kuva-yhteenlasku-tyoarkit',
  },

  // Hero Section - FULL text from Finnish code-addition.md
  hero: {
    title: 'Kuvapohjainen Yhteenlasku Tehtävämoniste',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen Matematiikka Alakoulu',
    description: `Luo visuaalisia yhteenlaskutehtäviä käyttäen kuvia yli 3000 kuvan kirjastosta. Kuvapohjainen yhteenlaskugeneraattori tekee matematiikan oppimisesta konkreettista esiopetukseen ja alakouluun. Täysi Pääsy -tilauksesi antaa sinulle rajattoman pääsyn luoda tulostettavat tehtävät lapsille ilmainen matematiikan harjoitteluun.

Yhteenlasku ja vähennyslasku tehtävät tulevat eläviksi kuvilla. Lapset näkevät kolme omenaa plus kaksi omenaa on viisi omenaa. Visuaalinen oppiminen toimii erityisen hyvin esiopetus materiaali ilmainen kehityksessä. Matematiikka tehtävät alakoulu -tasolla muuttuvat hauskemmiksi kun käytät todellisia kuvia numeroiden sijaan.

Generaattori luo automaattisesti sekä tehtävämonisteen että vastausavaimen. Valitse 3-5 kuvaa kirjastosta tai lataa omia kuvia. Aseta vähimmäis- ja enimmäisnumerot määrittääksesi vaikeustason. Klikkaa "Luo tehtävä" ja saat ammattimaisen matematiikkamonisteen alle kolmessa minuutissa.

Jokainen tehtävä on täysin muokattavissa luomisen jälkeen. Raahaa, kierrä, skaalaa tai poista mitä tahansa elementtiä. Lisää teksti, taustat ja reunat. Lataa PDF- tai JPEG-muodossa 300 DPI laadulla ammattimaiseen tulostukseen. Esiopetus materiaali ilmainen -hakutermi kuvaa täydellisesti sitä mitä opettajat etsivät, ja tämä työkalu vastaa tarpeeseen.`,
    previewImageSrc: '/samples/english/code addition/code addition portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/code addition/
  samples: {
    sectionTitle: 'Kuvapohjainen Yhteenlasku Tehtävät Esimerkit',
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
        worksheetSrc: '/samples/english/code addition/code addition portrait.jpeg',
        answerKeySrc: '/samples/english/code addition/code addition portrait answer_key.jpeg',
        altText: 'Kuvapohjainen yhteenlaskutehtävä pystysuunnassa esiopetukseen',
        pdfDownloadUrl: '/samples/english/code addition/code addition portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/code addition/code addition landscape.jpeg',
        answerKeySrc: '/samples/english/code addition/code addition landscape answer_key.jpeg',
        altText: 'Kuvapohjainen yhteenlaskutehtävä vaakasuunnassa alakoululaisille',
        pdfDownloadUrl: '/samples/english/code addition/code addition landscape.pdf',
      },
    ],
  },

  // Features Grid - FULL text from Finnish code-addition.md feature sections
  features: {
    sectionTitle: 'Kuvapohjaisen Yhteenlaskun Ominaisuudet - Matematiikka Tehtävät Alakoulu ja Tulostettavat Tehtävät Lapsille Ilmainen',
    sectionDescription: 'Kuvapohjainen yhteenlaskugeneraattori tarjoaa kaiken mitä tarvitset luodaksesi ammattimaisia matematiikka tehtävät alakoulu -tasolle. Täysi Pääsy -tilauksesi antaa sinulle pääsyn kaikkiin ominaisuuksiin ilman lisämaksuja. Luo niin monta yhteenlasku ja vähennyslasku tehtävät -monistetta kuin tarvitset. Ei per-moniste maksuja.',
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
        title: 'Luo Matematiikka Tehtävät Kolmessa Klikkauksessa - Tulostettavat Tehtävät Lapsille Ilmainen',
        description: `Tehtävien luominen vie alle kolme minuuttia alusta loppuun. Valitse 3-5 kuvaa teemasta tai selaa yksittäisiä kuvia. Aseta tehtävien määrä ja numerot vaikeustason mukaan. Klikkaa "Luo tehtävä" ja generaattori luo automaattisesti sekä tehtävämonisteen että vastausavaimen.

Ei tarvitse olla suunnittelutaitoja. Ei tarvitse opetella monimutkaista ohjelmistoa. Generaattori tekee kaiken automaattisesti. Saat ammattimaiset yhteenlasku ja vähennyslasku tehtävät valmiina tulostettavaksi. Jokainen tehtävä näyttää kaksi kuvaryhmää plus-merkillä, yhtäsuuruusmerkillä ja tilalla vastaukselle.

Nopeus on merkittävä etu. Perinteinen tapa luoda visuaalisia matematiikkatehtäviä vie 30-60 minuuttia per moniste. Kuvien etsiminen, koon muuttaminen, asettelu, numeroiden lisääminen. Tämä generaattori tekee kaiken kolmessa minuutissa. Säästät 90% ajastasi.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Täydellinen Muokattavuus Kaikille Matematiikka Tehtävät Alakoulu Elementeille - Esiopetus Materiaali Ilmainen',
        description: `Kaikki kankaalla on muokattavissa luomisen jälkeen. Raahaa kuvia uusiin paikkoihin. Kierrä niitä. Skaalaa suuremmiksi tai pienemmiksi. Poista elementtejä joita et tarvitse. Lisää uusia kuvia. Lisää tekstiä. Muuta värejä.

Tämä täydellinen muokattavuus erottaa generaattorin staattisista mallipohjista. Voit mukauttaa jokaisen tehtävän täsmälleen oppilaittesi tarpeisiin. Tee joku tehtävä helpommaksi käyttämällä isompia kuvia. Tee toinen tehtävä haastavammaksi lisäämällä häiriötekijöitä.

Muokkaustoiminnot toimivat intuitiivisesti. Klikkaa elementtiä valitaksesi sen. Raahaa siirtääksesi. Käytä kulmasta vetämällä skaalata. Paina Delete-näppäintä poistaaksesi. Ctrl+Z kumoaa toiminnon. Ctrl+Y tekee uudelleen. Kaikki tutut pikanäppäimet toimivat.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Lataa Omia Kuvia Yhteenlasku ja Vähennyslasku Tehtävät -Monisteiden Personointiin',
        description: `Monilataus mahdollistaa useiden kuvien lataamisen yhdellä kertaa. Klikkaa lataa-painiketta ja valitse 5-20 kuvaa tietokoneeltasi. Kaikki yleiset kuvaformaatit toimivat: JPEG, PNG, GIF. Generaattori skaalaa ne automaattisesti oikeaan kokoon.

Yhdistä omia kuvia kirjaston kuviin samalla monisteella. Voit käyttää kolme kirjastosta ja kaksi omaa kuvaa. Tämä antaa sinulle täydellisen vapauden personoida tehtävät oppilaillesi. Käytä luokkahuoneen lemmikkieläimen kuvaa. Käytä kuvaa koulun pihalta. Oppilaiden omat piirustukset toimivat erinomaisesti.

Personoidut kuvat tekevät matematiikasta relevantimpaa. Lapset innostuvat enemmän kun näkevät tuttuja asioita tehtävissä. "Laske montako kirjaa Matin hyllyssä on ja montako Liisan hyllyssä on." Tämä on paljon kiinnostavampaa kuin abstraktit numerot.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Kielen Tuki Kaikille Tulostettavat Tehtävät Lapsille Ilmainen - Monikielinen Esiopetus Materiaali Ilmainen',
        description: `Käyttöliittymä toimii 11 kielellä: suomi, englanti, saksa, ranska, espanja, italia, portugali, hollanti, ruotsi, tanska, norja. Vaihda kieli milloin tahansa yläreunan valikosta. Kaikki painikkeet, otsikot ja vaihtoehdot kääntyvät välittömästi.

Kuvakirjasto tukee samoja 11 kieltä. Tämä on erittäin tärkeää monikielisessä opetuksessa. Kuvan tiedostonimi määrittää sen nimen: "apple.png" näkyy nimellä "omena" suomen kielen tilassa. Sama kuva näkyy nimellä "äpple" ruotsin kielen tilassa.

Monikielinen tuki tekee generaattorista täydellisen kielikylpyluokille ja kaksikielisille kouluille. Luo matematiikka tehtävät alakoulu -tason suomeksi aamulla ja englanniksi iltapäivällä. Sama työkalu toimii molempiin.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kaupallinen Lisenssi Yhteenlasku ja Vähennyslasku Tehtävät Myyntiin - Tulostettavat Tehtävät Lapsille Ilmainen',
        description: `Täysi Pääsy -tilauksesi sisältää täyden kaupallisen tulostuksen mukaan -lisenssin ilman lisämaksuja. Myy luomiasi tehtäviä Etsyssä, Teachers Pay Teachers -palvelussa tai Amazon KDP:ssä. Ei tarvita attribuutiota. Ei rojalteja. Kaikki kuuluu tilaukseesi.

300 DPI kaupallinen laatu takaa että tehtäväsi näyttävät ammattimaisilta. Asiakkaat odottavat korkeaa laatua maksaessaan tulosteista. Tämä generaattori tuottaa kirkkaat, terävät kuvat jotka tulostavat täydellisesti kotitulostimilla ja ammattipainossa.

Monet opettajat rakentavat lisätuloja myymällä tehtäviä. Teachers Pay Teachers -myyjät tienaavat 500-5000 euroa kuukaudessa. Etsy-tulostemyyjät tienaavat 300-3000 euroa kuukaudessa. Kaupallinen lisenssi sisältyy tilaukseen, joten voit aloittaa välittömästi.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Yli 3000 Laadukasta Kuvaa Matematiikka Tehtävät Alakoulu Luomiseen - Esiopetus Materiaali Ilmainen',
        description: `Kuvakirjasto sisältää yli 3000 lapsiystävällistä kuvaa. Kaikki järjestetty teemoittain helpompaa selausta varten. Eläimet, ruoka, ajoneuvot, luonto, lelut, koulutarvikkeet. Jokainen teema sisältää kymmeniä kuvia.

Temaattinen organisointi nopeuttaa tehtävien luomista. Valitse "hedelmät"-teema ja saat välittömästi omenoita, banaaneja, päärynöitä, mansikoita. Generoi yhteenlasku ja vähennyslasku tehtävät kaikki hedelmäteemalla. Oppilaiden on helpompi keskittyä matematiikkaan kun kuvat ovat yhtenäisiä.

Hakutoiminto löytää tietyt kuvat nopeasti. Kirjoita "kissa" ja näet kaikki kissakuvat. Kirjoita "auto" ja näet kaikki autokuvat. Tämä on hyödyllinen kun tarvitset tietyn kuvan nopeasti. Kaikki taustat ja reunat sisältyvät ilman lisämaksua.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Ammattimainen 300 DPI Laatu Tulostettavat Tehtävät Lapsille Ilmainen Viimeistelyllä',
        description: `Lataa PDF- tai JPEG-muodossa. PDF säilyttää täydellisen tarkkuuden kaikille teksteille ja kuville. JPEG toimii hyvin sähköiseen jakamiseen. Molemmat formaatit tuottavat 300 DPI tulostuslaadun.

Harmaasävyvaihtoehto säästää mustetta. Kotitulostimet kuluttavat paljon värillistä mustetta. Muunna tehtävä harmaasävyksi ennen lataamista. Säästät 60-70% mustekuluissa menettämättä luettavuutta.

Ammattimainen laatu tarkoittaa että tehtävät näyttävät kustantajan laatuisilta. Terävät kuvat, selkeät fontit, täydellinen asettelu. Opettajat ovat ylpeitä jakaessaan näitä tehtävämonisteita vanhemmille ja kollegoille. Sekä tehtävämoniste että vastausavain latautuvat erikseen.`,
        highlighted: true,
      },
      {
        id: '8',
        icon: '✅',
        title: 'Automaattinen Vastausavain Generointi',
        description: `Generaattori luo automaattisesti sekä tehtävämonisteen että vastausavaimen samanaikaisesti. Klikkaa "Vastausavain"-välilehteä nähdäksesi sen. Vastausavain näyttää täsmälleen samat tehtävät mutta vastaukset on täytetty. Ei tarvetta laskea jokaista vastausta manuaalisesti.

Lataa molemmat erikseen. Klikkaa "Lataa"-pudotusvalikkoa. Valitse "Tehtävämoniste (PDF)" ja "Vastausavain (PDF)". Saat kaksi erillistä tiedostoa. Tulosta tehtävämoniste oppilaille. Säilytä vastausavain itsellesi.

Vastausavain on hyödyllinen nopeaan tarkistukseen. Oppilaat palauttavat tehtävät. Vertaa vastausavaimeen. Merkitse oikein tai väärin nopeasti. Tai näytä vastausavain yläprojektorilla. Käykää läpi vastaukset yhdessä luokan kanssa.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from Finnish code-addition.md step sections
  howTo: {
    sectionTitle: 'Kuinka Luoda Matematiikka Tehtävät Alakoulu Viidessä Helpossa Vaiheessa - Tulostettavat Tehtävät Lapsille Ilmainen',
    sectionDescription: 'Kuvapohjaisten yhteenlaskutehtävien luominen vie alle kolme minuuttia alusta loppuun. Viisi yksinkertaista vaihetta tuottaa ammattimaiset yhteenlasku ja vähennyslasku tehtävät. Ei tarvita suunnittelukokemusta. Ei monimutkaisia ohjelmistoja. Seuraa näitä ohjeita ja luo esiopetus materiaali ilmainen -tason tehtäviä välittömästi.',
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
        title: 'Valitse Kuvat Yhteenlasku ja Vähennyslasku Tehtävät Luomiseen - Esiopetus Materiaali Ilmainen',
        description: `Aloita valitsemalla 3-5 kuvaa kuvakirjastosta. Klikkaa "Kuvakirjasto"-välilehteä vasemmalla paneelilla. Näet teemavalinnan pudotusvalikon. Klikkaa sitä nähdäksesi kaikki saatavilla olevat teemat: eläimet, ruoka, ajoneuvot, lelut, luonto, koulutarvikkeet.

Valitse teema joka sopii oppitunnillesi. Jos opiskelet eläimiä, valitse eläinteema. Jos opiskelet ruokaa, valitse ruokateema. Generaattori näyttää kaikki kyseisen teeman kuvat pienoiskuvina. Jokainen teema sisältää 20-50 kuvaa.

Klikkaa 3-5 kuvaa valitaksesi ne. Valitut kuvat näkyvät sinisellä reunuksella. Voit nähdä valinnat esikatselualueella "Valitut kuvat" -otsikon alla. Jos haluat vaihtaa kuvan, klikkaa sitä uudelleen poistaaksesi valinnan.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Aseta Matematiikka Tehtävät Alakoulu Parametrit - Tulostettavat Tehtävät Lapsille Ilmainen',
        description: `Klikkaa "Tehtävän sisältö" -välilehteä vasemmalla paneelilla. Näet kolme tärkeää asetusta jotka määrittävät tehtäviesi vaikeustason. Aseta nämä huolellisesti oppilaittesi taitotason mukaan.

"Tehtävien määrä" määrittää montako yhteenlaskuongelmaa moniste sisältää. Vähimmäismäärä on 3 tehtävää. Enimmäismäärä on 10 tehtävää. Esiopetukseen sopii 3-5 tehtävää per moniste. Alakoulun 1. luokalle sopii 5-8 tehtävää. 2-3. luokalle voit käyttää 8-10 tehtävää.

"Vähimmäisnumero" asettaa pienimmän numeron jota tehtävissä käytetään. Aseta tämä arvoon 1 aloittelijoille. "Enimmäisnumero" asettaa suurimman numeron. Esiopetukseen aseta tämä arvoon 5 tai 10. Alakoulun 1. luokalle käytä 10-15.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Luo Yhteenlasku ja Vähennyslasku Tehtävät Välittömästi - Esiopetus Materiaali Ilmainen',
        description: `Klikkaa "Luo"-pudotusvalikkoa oikeassa yläkulmassa. Valitse "Luo tehtävämoniste". Generaattori työstää pyyntöäsi 2-5 sekunnissa. Näet edistymisindik aattorin lyhyesti. Sitten valmis tehtävämoniste ilmestyy pääkankaalle.

Jokainen tehtävä näyttää kaksi kuvaryhmää. Vasemmalla puolella näet ensimmäisen numeron verran kuvia. Keskellä näet plus-merkin (+). Oikealla puolella näet toisen numeron verran kuvia. Perässä yhtäsuuruusmerkki (=) ja tyhjä tila vastaukselle.

Asettelu on automaattinen. Generaattori järjestää kuvat tasaisesti. Kaikki kuvat ovat saman kokoisia. Välit ovat tasaiset. Plus- ja yhtäsuuruusmerkit ovat oikeassa koossa ja paikassa. Vastausavain luodaan automaattisesti samanaikaisesti.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Matematiikka Tehtävät Alakoulu Kankaalla - Tulostettavat Tehtävät Lapsille Ilmainen',
        description: `Kaikki kankaalla on täysin muokattavissa. Klikkaa mitä tahansa elementtiä valitaksesi sen. Näet sinisen rajauskehyksen valitun elementin ympärillä. Kulmissa näet kahvat joita voit vetää skalataksesi. Yläreunassa näet kiertokahdetta.

Raahaa elementtejä uusiin paikkoihin. Klikkaa ja pidä hiiren painike alhaalla. Siirrä hiirtä. Elementti seuraa. Päästä hiiren painike pudottaaksesi elementin uuteen paikkaan. Tämä toimii kaikille elementeille: kuvat, tekstit, numerot, symbolit.

Lisää tekstiä klikkaamalla "Tekstityökalut"-välilehteä vasemmalla. Kirjoita sisältö tekstikenttään. Klikkaa "Lisää Teksti". Teksti ilmestyy pohjan keskelle. Raahaa se haluttuun paikkaan. Säädä fonttikokoa numerokentällä. Täydellinen otsikkojen lisäämiseen.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa Tulostettavat Tehtävät Lapsille Ilmainen PDF tai JPEG Muodossa - Esiopetus Materiaali Ilmainen',
        description: `Kun olet tyytyväinen tehtävääsi, lataa se. Klikkaa "Lataa"-pudotusvalikkoa oikeassa yläkulmassa. Näet neljä vaihtoehtoa: Tehtävämoniste (JPEG), Vastausavain (JPEG), Tehtävämoniste (PDF), Vastausavain (PDF).

PDF-formaatti on paras tulostukseen. Se säilyttää täydellisen tarkkuuden kaikille teksteille ja kuville. Kaikki tulostimet ymmärtävät PDF:n. Värit säilyvät täsmälleen kuten näet näytöllä. Valitse tämä jos tulostat kotona tai koulussa.

Harmaasävyvaihtoehto säästää mustetta merkittävästi. Raksita "Muunna harmaasävyksi" -ruutu ennen lataamista. Generaattori muuntaa kaikki värit harmaasävyiksi. Säästät 60-70% värimustekustannuksissa. Tehtävät pysyvät täysin luettavina.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish code-addition.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Kaikille Opettajille ja Vanhemmille - Matematiikka Tehtävät Alakoulu ja Tulostettavat Tehtävät Lapsille Ilmainen',
    sectionDescription: 'Kuvapohjainen yhteenlaskugeneraattori palvelee monenlaisia käyttäjiä. Esiopetuksen opettajat luovat visuaalisia matematiikkatehtäviä 5-6-vuotiaille. Alakoulun opettajat tekevät yhteenlasku ja vähennyslasku tehtävät 1-3. luokkien oppilaille. Kotiopettajat personoivat tehtävät kunkin lapsen tasolle. S2-suomen opettajat yhdistävät matematiikan ja kieltenoppimisen.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Esiopetuksen Opettajat',
        subtitle: 'Esiopetus Materiaali Ilmainen Visuaaliseen Matematiikkaan',
        description: `Esiopetuksessa lapset oppivat laskemaan konkreettisten esineiden avulla. Kuvapohjainen yhteenlasku täyttää tämän tarpeen täydellisesti. Lapset näkevät kolme omenaa plus kaksi omenaa. He laskevat kaikki omenat yhteensä. Vastaus on viisi omenaa. Tämä on paljon selkeämpää kuin abstraktit numerot.

5-6-vuotiaat eivät ymmärrä numeroita samalla tavalla kuin vanhemmat lapset. He tarvitsevat visuaalisia edustuksia. Generaattori tarjoaa rajattomasti visuaalisia yhteenlaskutehtäviä. Vaihda teemoja pitääksesi asiat kiinnostavina. Käytä eläimiä maanantaina, ruokaa tiistaina, leluja keskiviikkona.

Vaikeustason hallinta on helppoa. Aseta enimmäisnumero arvoon 5 aloittelijoille. Vähitellen nosta sitä arvoon 10 kun lapset edistyvät. Luo 3-4 tehtävää per moniste esikouluikäisille. Personoidut kuvat toimivat loistavasti esiopetuksessa. Lapset rakastavat nähdä omat piirustuksensa matematiikkatehtävissä.`,
        quote: 'Oppilaani rakastavat kuvallisia matematiikkatehtäviä!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun 1-3. Luokan Opettajat',
        subtitle: 'Matematiikka Tehtävät Alakoulu Eriyttämiseen',
        description: `Alakoulun opettajat tarvitsevat eriyttämistä samassa luokassa. Jotkut oppilaat laskevat sujuvasti 20:een. Toiset kamppailevat yhä 10:n kanssa. Sama monistepohja ei toimi kaikille. Generaattori ratkaisee tämän ongelman.

Luo kolme versiota samasta tehtävästä. Versio A: numerot 1-5 heikoimmille oppilaille. Versio B: numerot 1-10 keskitason oppilaille. Versio C: numerot 5-20 vahvimmille oppilaille. Käytä samaa kuvateemaa kaikille versioille. Oppilaat eivät tunne olevansa erilaisia kun kaikilla on hedelmäteemaiset yhteenlaskutehtävät.

Visuaaliset yhteenlaskutehtävät toimivat myös vanhemmille alakoululaisille. 2. ja 3. luokan opettajat käyttävät niitä kamppailevien oppilaiden tukeen. Kun numeroiden kanssa laskeminen on vaikeaa, palaa visuaalisiin esityksiin. Kuvat auttavat oppilasta ymmärtämään mitä yhteenlasku todella tarkoittaa.`,
        quote: 'Eriyttäminen on nyt helppoa ja nopeaa.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajavanhemmat',
        subtitle: 'Yhteenlasku ja Vähennyslasku Tehtävät Usealle Lapselle Samanaikaisesti',
        description: `Kotiopettajilla on ainutlaatuinen haaste. He opettavat useita lapsia eri ikäryhmistä samanaikaisesti. 5-vuotias tarvitsee yhteenlaskua 5:een. 7-vuotias tarvitsee yhteenlaskua 20:een. 9-vuotias tarvitsee haastavampia tehtäviä. Sama työkalu palvelee kaikkia.

Generaattorin nopeus on ratkaiseva kotiopetuksessa. Luo yhteenlaskumoniste nuorimmalle aamiaisella. Luo toinen moniste keskimmäiselle ennen lounasta. Luo kolmas vanhimmalle iltapäivällä. Jokainen vie kolme minuuttia. Yhteensä yhdeksän minuuttia kattaa kaikki kolme lasta.

Teemapohjainen lähestymistapa toimii hyvin kotiopetuksessa. Tällä viikolla teemana ovat maatilan eläimet. Luo yhteenlaskutehtäviä käyttäen lehmiä, sikoja, kanoja. Yhdistä matematiikka teemaviikon kanssa. Lapset oppivat sekä yhteenlaskua että eläinten nimiä.`,
        quote: 'Yksi työkalu kattaa kaikkien lasteni vuosiluokat.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'S2-Suomen Opettajat',
        subtitle: 'Esiopetus Materiaali Ilmainen Monikieliseen Opetukseen',
        description: `Suomi toisena kielenä -opettajat hyötyvät valtavasti monikielisestä kuvakirjastosta. Generaattori tukee 11 kieltä. Kuvatiedostojen nimet kääntyvät automaattisesti. "Apple.png" näkyy nimellä "omena" suomeksi, "apple" englanniksi, "äpple" ruotsiksi.

Luo yhteenlaskutehtäviä jotka opettavat sekä matematiikkaa että sanastoa. Valitse hedelmä-teema. Oppilaat näkevät kolme omenaa plus kaksi omenaa. He oppivat sanan "omena" samalla kun oppivat että 3+2=5. Kaksois hyöty jokaisesta tehtävästä.

Visuaaliset tehtävät toimivat erityisen hyvin maahanmuuttajaoppilaille. He eivät tarvitse vahvaa suomen kielen taitoa ymmärtääkseen tehtävän. Kuvat kommunikoivat selkeästi. Laske kuinka monta kissaa yhteensä. Matematiikka on universaalia kieltä.`,
        quote: 'Monikielisyystuki on ratkaisevaa luokkahuoneessani.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen Yksilölliseen Tukeen',
        description: `Erityisopettajat tarvitsevat täydellistä joustavuutta. Jokainen oppilas on erilainen. Jokainen tarvitsee räätälöityä tukea. Generaattorin muokattavuus tekee tästä mahdollista. Luo yhteenlaskutehtävä. Muokkaa sitä täsmällisesti kunkin oppilaan tarpeisiin.

Oppilaat joilla on näköongelmia tarvitsevat suurempia kuvia. Klikkaa kuvaa. Skaalaa se suuremmaksi. Tee kaikki kuvat tehtävässä kaksinkertaiseksi normaalikoosta. Oppilas näkee selkeästi jokaisen elementin. Ei silmien rasittamista.

Oppilaat joilla on motoriikan haasteita tarvitsevat enemmän tilaa vastauksia varten. Lisää ylimääräistä tyhjää tilaa yhtäsuuruusmerkin jälkeen. Anna heille runsaasti tilaa kirjoittaa vastaus. Visuaaliset tehtävät auttavat oppilaita joilla on matemaattisia oppimishaasteita.`,
        quote: 'Voin nopeasti mukauttaa tehtäviä jokaisen oppilaan tarpeisiin.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Matematiikka Tehtävät Alakoulu Myyntiin Kaupallisella Lisenssillä',
        description: `Opettajayrittäjät myyvät tehtäviä Teachers Pay Teachersissa, Etsyssä ja Amazon KDP:ssä. Kaupallinen lisenssi sisältyy Täysi Pääsy -tilaukseen. Luo rajattomasti yhteenlaskumonisteita. Myy niitä haluamallasi hinnalla. Ei rojalteja. Ei lisämaksuja.

Generaattorin nopeus on ratkaisevaa tuotekatalogin rakentamisessa. Luo 10 erilaista yhteenlaskumonistetta päivässä. Lataa ne myyntiin samana iltana. Rakenna 100 tuotteen katalogi kahdessa viikossa. Kilpailijat jotka tekevät kaiken manuaalisesti tarvitsevat kuukausia.

Teemapaketit myyvät hyvin. Luo "Eläinten yhteenlasku" -paketti 20 monisteen kanssa. Luo "Ruoan yhteenlasku" -paketti. Luo "Ajoneuvojen yhteenlasku" -paketti. Paketointi lisää arvoa ja nostaa hintoja. 300 DPI laatu takaa että asiakkaat ovat tyytyväisiä.`,
        quote: 'Tilaukseni maksoi itsensä takaisin ensimmäisessä kuussa!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from Finnish code-addition.md
  faq: {
    sectionTitle: 'Usein Kysytyt Kysymykset',
    sectionDescription: 'Yleisimmät kysymykset kuvapohjaisesta yhteenlaskugeneraattorista ja matematiikkatyöarkeista.',
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
        question: 'Onko Kuvapohjainen Yhteenlaskugeneraattori Todella Ilmainen Käyttää?',
        answer: 'Kuvapohjainen yhteenlaskugeneraattori vaatii Täysi Pääsy -tilauksen joka maksaa 240 euroa vuodessa tai 25 euroa kuukaudessa. Tilauksesi antaa sinulle rajattoman yhteenlaskutehtävien luomisen ilman per-moniste maksuja. Luo niin monta matematiikka tehtävät alakoulu -tason monistetta kuin tarvitset ilman lisäkustannuksia.',
      },
      {
        id: '2',
        question: 'Voinko Tulostaa Yhteenlasku ja Vähennyslasku Tehtävät Kotona Tavallisella Tulostimella?',
        answer: 'Kyllä voit. Generaattori tuottaa standardeja PDF- ja JPEG-tiedostoja jotka toimivat kaikilla tulostimilla. Lataa tehtävämoniste PDF-muodossa. Avaa se tietokoneellasi. Tulosta normaalisti. Toimii kotitulostimilla, koulun tulostimilla ja ammattitulostimilla. Harmaasävyvaihtoehto säästää mustetta merkittävästi.',
      },
      {
        id: '3',
        question: 'Tarvitsenko Suunnittelutaitoja Luodakseni Matematiikka Tehtävät Alakoulu -Tason Monisteita?',
        answer: 'Ei tarvitse. Generaattori on suunniteltu opettajille ilman suunnittelukokemusta. Klikkaa muutamia painikkeita. Valitse muutamia kuvia. Aseta numerot. Klikkaa "Luo". Valmis. Koko prosessi on automaattinen. Jos haluat mukauttaa, se on yksinkertaista. Raahaa elementtejä uusiin paikkoihin.',
      },
      {
        id: '4',
        question: 'Voinko Käyttää Yhteenlasku ja Vähennyslasku Tehtävät Luokkahuoneessani Oppilaiden Kanssa?',
        answer: 'Täysi Pääsy -tilaus sisältää rajattoman luokkahuonekäytön. Luo monisteita kaikille oppilaillesi. Tulosta niin monta kopiota kuin tarvitset. Ei rajoituksia määrään. Ei lisämaksuja per oppilas. Kaikki kuuluu 240 euron vuosimaksuun. Jaa monisteita kollegoiden kanssa samassa koulussa.',
      },
      {
        id: '5',
        question: 'Mitä Kieliä on Saatavilla Matematiikka Tehtävät Alakoulu Generaattorissa?',
        answer: 'Generaattori tukee 11 kieltä: suomi, englanti, saksa, ranska, espanja, italia, portugali, hollanti, ruotsi, tanska, norja. Vaihda kieli milloin tahansa yläreunan kielen valitsimesta. Käyttöliittymä kääntyy välittömästi valitsemallesi kielelle. Kuvakirjasto tukee samoja 11 kieltä.',
      },
      {
        id: '6',
        question: 'Voinko Myydä Luomiani Yhteenlasku ja Vähennyslasku Tehtävät Monisteita?',
        answer: 'Kyllä. Täysi Pääsy -tilaus sisältää täyden kaupallisen tulostuksen mukaan -lisenssin ilman lisämaksuja. Myy luomiasi tehtäviä Teachers Pay Teachersissa, Etsyssä, Amazon KDP:ssä tai missä tahansa muussa alustassa. Ei rojalteja. Ei attribuutiota vaaditaan. 300 DPI ammattimainen laatu takaa että tuotteesi näyttävät ammattimaisilta.',
      },
      {
        id: '7',
        question: 'Minkä Ikäisille Lapsille Yhteenlasku ja Vähennyslasku Tehtävät Sopivat Parhaiten?',
        answer: 'Kuvapohjainen yhteenlasku sopii 5-9-vuotiaille lapsille. Esiopetus (5-6 vuotta) hyötyy visuaalisista esityksistä eniten. Alakoulun 1. luokka (6-7 vuotta) käyttää niitä päivittäin. 2-3. luokat (7-9 vuotta) käyttävät niitä tukiopetuksessa ja kertauksessa. Vaikeustason hallinta tekee generaattorista sopivan kaikille tasoille.',
      },
      {
        id: '8',
        question: 'Voinko Ladata Omia Kuvia Yhteenlaskutehtäviin?',
        answer: 'Kyllä voit. Klikkaa "Lataa omia kuvia" -painiketta. Valitse 5-20 kuvaa tietokoneeltasi. Kaikki yleiset kuvaformaatit toimivat: JPEG, PNG, GIF. Generaattori skaalaa ne automaattisesti oikeaan kokoon. Yhdistä omia kuvia kirjaston kuviin samalla tehtävässä. Luo täysin personoituja tehtäviä.',
      },
      {
        id: '9',
        question: 'Kuinka Kauan Kestää Luoda Matematiikka Tehtävät Alakoulu Tehtävämoniste?',
        answer: 'Alle kolme minuuttia alusta loppuun. Minuutti 1: Valitse 3-5 kuvaa teemasta. Minuutti 2: Aseta tehtävien määrä ja numerot. Minuutti 3: Klikkaa "Luo", tarkista tulos, lataa PDF. Sekä tehtävämoniste että vastausavain luodaan automaattisesti. Säästät 90% ajastasi verrattuna perinteiseen menetelmään.',
      },
      {
        id: '10',
        question: 'Sisältävätkö Yhteenlasku ja Vähennyslasku Tehtävät Vastausavaimet?',
        answer: 'Kyllä. Generaattori luo automaattisesti sekä tehtävämonisteen että vastausavaimen samanaikaisesti. Klikkaa "Vastausavain"-välilehteä nähdäksesi sen. Vastausavain näyttää täsmälleen samat tehtävät mutta vastaukset on täytetty. Lataa molemmat erikseen PDF- tai JPEG-muodossa.',
      },
      {
        id: '11',
        question: 'Voinko Luoda Eriyttämiseen Eri Vaikeustasoja?',
        answer: 'Kyllä. Aseta vähimmäis- ja enimmäisnumerot määrittääksesi vaikeustason. Versio A heikoille oppilaille: numerot 1-5. Versio B keskitason oppilaille: numerot 1-10. Versio C vahvoille oppilaille: numerot 5-20. Luo kaikki kolme versiota yhdeksässä minuutissa. Käytä samaa kuvateemaa kaikille.',
      },
      {
        id: '12',
        question: 'Mitä Eroa On Peruspaketti- ja Täysi Pääsy -Tilauksilla?',
        answer: 'Peruspaketti sisältää 10 suosittua generaattoria ja maksaa 144 euroa vuodessa. Täysi Pääsy sisältää kaikki 33 generaattoria mukaan lukien kuvapohjainen yhteenlasku ja maksaa 240 euroa vuodessa. Molemmat tilaukset sisältävät kaupallisen lisenssin, 11 kielen tuen ja ammattimaisen 300 DPI laadun.',
      },
    ],
  },

  // Pricing Section - Finnish translated (Full Access tier - code-addition is NOT in Core Bundle)
  pricing: {
    title: 'Täysi Pääsy',
    price: '240€',
    priceInterval: '/vuosi',
    priceSuffix: 'Laskutetaan vuosittain',
    benefits: [
      'Kaikki 33 generaattoria',
      'Rajoittamaton työarkkien luonti',
      'Kaupallinen lisenssi sisältyy',
      '11 kielen tuki',
      '3000+ teemaattista kuvaa',
      '300 DPI tulostuslaatu',
      'Vastausavaimet sisältyvät',
    ],
    ctaText: 'Hanki Täysi Pääsy',
  },

  // Related Apps Section - Finnish translated
  relatedApps: {
    sectionTitle: 'Liittyvät Matematiikkatyökalut',
    sectionDescription: 'Tutustu muihin matematiikka- ja oppimistyökaluihimme jotka täydentävät kuvapohjaista yhteenlaskugeneraattoria.',
    badgeText: 'Toimii Hyvin Yhdessä',
    ctaTitle: 'Valmiina Luomaan Upeita Työarkkeja?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia työarkkeja. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
    primaryCtaText: 'Aloita Ilmainen Kokeilu',
    secondaryCtaText: 'Katso Kaikki 33 Sovellusta',
    exploreText: 'Tutustu kaikkiin sovelluksiin',
    trustBadges: {
      securePayment: 'Turvallinen maksu',
      cancelAnytime: 'Peruuta milloin tahansa',
    },
    items: [
      {
        id: '1',
        icon: '➕',
        name: 'Yhteenlasku Tehtävät',
        category: 'Matematiikka',
        description: 'Luo perinteisiä yhteenlaskutehtäviä numeroilla ja kuvilla',
        slug: 'yhteenlasku-tyoarkit',
      },
      {
        id: '2',
        icon: '🧩',
        name: 'Sudoku Lapsille',
        category: 'Logiikka',
        description: 'Luo sudoku-tehtäviä lapsille eri vaikeustasoilla',
        slug: 'sudoku-tyoarkit',
      },
      {
        id: '3',
        icon: '🔢',
        name: 'Matematiikka Tehtävät',
        category: 'Matematiikka',
        description: 'Monipuolinen matematiikkatyöarkki-generaattori kaikille operaatioille',
        slug: 'matematiikka-tyoarkit',
      },
      {
        id: '4',
        icon: '🎨',
        name: 'Värityskuvat',
        category: 'Luovuus',
        description: 'Luo kauniita värityskuvia lapsille teemoittain',
        slug: 'varityskuvat-tyoarkit',
      },
      {
        id: '5',
        icon: '🔤',
        name: 'Aakkosjuna',
        category: 'Kirjaimet',
        description: 'Opeta kirjaimia ja äänteitä hauskoilla junatehtävillä',
        slug: 'aakkosjuna-tyoarkit',
      },
      {
        id: '6',
        icon: '🔍',
        name: 'Etsi ja Laske',
        category: 'Matematiikka',
        description: 'Visuaalinen laskutehtävä joka yhdistää etsimisen ja matematiikan',
        slug: 'etsi-ja-laske-tyoarkit',
      },
    ],
  },
};

export default codeAdditionFiContent;
