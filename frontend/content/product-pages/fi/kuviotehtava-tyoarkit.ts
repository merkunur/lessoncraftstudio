import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Pattern Worksheet - Finnish Content (Kuviotehtävä)
 *
 * File: frontend/content/product-pages/fi/kuviotehtava-tyoarkit.ts
 * URL: /fi/apps/kuviotehtava-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/kuviotehtava.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * FULL ACCESS APP - €240/year or €25/month (Täysi Pääsy)
 */

export const patternWorksheetFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'kuviotehtava-tyoarkit',
    appId: 'pattern-worksheet',
    title: 'Kuviotehtävä - Tulostettavat Tehtävät Lapsille Ilmainen -',
    description: 'Luo ammattimaisia kuviotehtävämonisteet kuviontunnistusjärjestelmällämme. Täysi Pääsy -tilauksesi antaa sinulle rajattoman tehtävien luomisen ilman.',
    keywords: 'kuviotehtävä, tulostettavat tehtävät lapsille ilmainen, matematiikka tehtävät alakoulu, esiopetus materiaali ilmainen, kuviontunnistus, kuvioharjoitukset lapsille',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/kuviotehtava-tyoarkit',
  },

  // Hero Section - FULL text from Finnish kuviotehtava.md
  hero: {
    title: 'Kuviotehtävä',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen - Matematiikka Tehtävät Alakoulu ja Esiopetus Materiaali',
    description: `Luo ammattimaisia kuviotehtävämonisteet kuviontunnistusjärjestelmällämme. Täysi Pääsy -tilauksesi antaa sinulle rajattoman tehtävien luomisen ilman tehtäväkohtaisia maksuja. Luo tulostettavia tehtäviä lapsille ilmainen, jotka sopivat täydellisesti esikoululaisille ja alakouluikäisille. Lataa korkealaatuisia PDF-tehtävämonisteitä alle kolmessa minuutissa.

Kuviotehtävä on visuaalinen matematiikan työkalu, joka opettaa kuviontunnistusta yhdeksällä eri kuviotyypillä. Lapset harjoittelevat AB-, AAB-, ABB-, ABC-, AABB-, ABBC-, AABC-, ABCC- ja ABCD-kuvioita ammattimaisen tehtävämonisteen avulla. Tämä menetelmä yhdistää matematiikan oppimisen visuaaliseen ajatteluun ja loogiseen päättelyyn.

Tehtävämonisteet tukevat esiopetuksen ja alakoulun matematiikan opetussuunnitelmaa. Kuviontunnistus on perustaito, joka johtaa algebran ja kertolaskun ymmärtämiseen. Opettajat käyttävät kuviotehtävää luodakseen havainnollisia matematiikka tehtävät alakoulu, jotka pitävät lapset kiinnostuneina.

Jokaisessa tehtävässä on selkeät esimerkit ja vastausavain. Voit mukauttaa vaikeustasoa valitsemalla kuviotyypin, kysymystyypin ja kuvien määrän. Täydellinen sekä esiopetukseen että alakoulun ensimmäisille luokille. Luo esiopetus materiaali ilmainen muutamassa minuutissa.`,
    previewImageSrc: '/samples/finnish/pattern worksheet/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/pattern worksheet/
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
        worksheetSrc: '/samples/finnish/pattern worksheet/sample-1.jpeg',
        answerKeySrc: '/samples/finnish/pattern worksheet/sample-1-answer.jpeg',
        altText: 'Kuviotehtävä pystysuunta esiopetukseen ja alakouluun',
        pdfDownloadUrl: '/samples/finnish/pattern worksheet/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/finnish/pattern worksheet/sample-2.jpeg',
        answerKeySrc: '/samples/finnish/pattern worksheet/sample-2-answer.jpeg',
        altText: 'Kuviotehtävä vaakasuunta kuviontunnistukseen',
        pdfDownloadUrl: '/samples/finnish/pattern worksheet/sample-2.pdf',
      },
    ],
  },

  // Features Grid - FULL text from Finnish kuviotehtava.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Kuviotehtävän luoja tarjoaa ammattimaiset työkalut kuviontunnistuksen opettamiseen. Täysi Pääsy -tilaus antaa sinulle pääsyn kaikkiin 33 tehtävämonisteen luojaan, mukaan lukien kuviotehtävä. Luo rajattomasti tulostettavia tehtäviä lapsille ilmainen ilman lisämaksuja. Jokainen ominaisuus on suunniteltu helpottamaan esiopetuksen ja alakoulun opettajien työtä.',
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
        title: 'Luo Matematiikka Tehtävät Alakoulu Kolmella Klikkauksella - Tulostettavat Tehtävät Lapsille Ilmainen',
        description: `Kuviotehtävän luominen on nopeaa ja helppoa. Valitse kuviotyyppi yhdeksästä vaihtoehdosta. Valitse kysymystyyppi ja tehtävien määrä. Klikkaa Luo ja tehtävämoniste ilmestyy näytölle. Koko prosessi kestää alle minuutin.

Järjestelmä luo automaattisesti sekä tehtävämonisteen että vastausavaimen. Tehtävämoniste sisältää kuviot selkeässä muodossa. Vastausavain näyttää täydennetyt kuviot. Ei manuaalista työtä, ei ulkoasun suunnittelua.

Valitse kuviot kolmesta lähteestä. Käytä 3000+ kuvan kirjastoa teemojen mukaan. Anna järjestelmän valita kuvat automaattisesti teemasta. Tai lataa omia kuvia personoiduista aiheista. Kaikki matematiikka tehtävät alakoulu luodaan ammattimaisen näköisiksi.

Esiopetuksen opettajat luovat yksinkertaisia AB-kuvioita. Alakoulun opettajat luovat haastavampia ABC- tai ABCD-kuvioita. Sama työkalu, eri vaikeustasot. Täydellinen eriyttämiseen ja esiopetus materiaali ilmainen luomiseen.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Muokkaa Kaikkea Esiopetus Materiaali Ilmainen - Hienomotoriikka Harjoitukset ja Kuviontunnistus',
        description: `Jokainen elementti kuviotehtävässä on muokattavissa. Vedä, kierrä, skaalaa ja poista mitä tahansa kohdetta hiirellä. Ei lukittuja elementtejä. Täysi hallinta tehtävämonisteen ulkoasuun.

Lisää tekstiä mihin tahansa kohtaan tehtävää. Muuta fonttia, kokoa ja väriä. Lisää ohjeita suomeksi tai millä tahansa kielellä. Luo personoituja matematiikka tehtävät alakoulu oppilaillesi. Kaikki hienomotoriikka harjoitukset ja kuviontunnistuksen tehtävät mukautettavissa.

Siirrä kuvioita uusiin paikkoihin. Muuta kuvion kokoa tai sijaintia. Lisää ylimääräisiä kuvia tai koristeita. Järjestelmä ei rajoita luovuuttasi. Luo esiopetus materiaali ilmainen, joka näyttää juuri sellaiselta kuin haluat.

Tasojen hallinta antaa sinulle täydellisen kontrollin. Siirrä elementtejä eteen tai taakse. Tasaa objekteja sivulle. Ryhmittele elementtejä yhteen. Ammattimaiset asettelutyökalut ilman monimutkaista ohjelmistoa käytettävissä tulostettavat tehtävät lapsille ilmainen luomiseen.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Lataa Omia Kuvia - Tulostettavat Tehtävät Lapsille Ilmainen Personoidulla Sisällöllä',
        description: `Kuviotehtävä tukee monilatausta. Valitse useita kuvia kerralla tietokoneeltasi. Lataa JPEG, PNG tai GIF -kuvia. Ei tiedostokokorajoituksia järkevissä rajoissa. Lataa niin monta kuvaa kuin tarvitset.

Yhdistä lataamasi kuvat kirjaston 3000+ kuvaan. Käytä omia kuvia A-kuviona ja kirjaston kuvia B-kuviona. Luo täysin personoituja matematiikka tehtävät alakoulu. Täydellinen teemayksiköihin tai erityisopetukseen.

Lataa oppilaidesi valokuvia luokasta. Lataa paikallisia maamerkkejä tai eläimiä. Lataa kuvia aiheista, joita opiskelet. Luo tulostettavat tehtävät lapsille ilmainen, jotka koskettavat heidän elämäänsä.

Ladatut kuvat tallennetaan istuntokohtaisesti. Ne pysyvät käytettävissä koko työskentelyn ajan. Luo useita esiopetus materiaali ilmainen -tehtävämonisteitä samoilla kuvilla. Ei tarvitse ladata uudelleen joka kerta.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Kielen Tuki - Esiopetus Materiaali Ilmainen Monikieliseen Opetukseen ja Lukemaan Oppiminen Tehtävät',
        description: `Kuviotehtävän käyttöliittymä toimii 11 kielellä. Vaihda kieli pudotusvalikosta. Kaikki painikkeet, otsikot ja ohjeet muuttuvat välittömästi. Suomi, englanti, saksa, ranska, espanja, portugali, italia, hollanti, ruotsi, tanska ja norja.

Luo tulostettavat tehtävät lapsille ilmainen missä tahansa näistä kielistä. Täydellinen kielikylpyopettajille. Täydellinen kaksikielisille luokkahuoneille. Täydellinen kansainvälisille kouluille.

Monikielinen tuki on kriittinen suomalaisille opettajille, jotka opettavat englantia tai ruotsia. Luo matematiikka tehtävät alakoulu englanniksi samalla työkalulla. Sama käyttöliittymä, eri kieli. Ei tarvetta oppia uutta ohjelmistoa.

Kuviotehtävä toimii visuaalisesti, joten kieli ei rajoita käyttöä. Luo esiopetus materiaali ilmainen millä tahansa kieliyhdistelmällä. Tue monikielisten oppilaiden lukemaan oppiminen tehtävät visuaalisen oppimisen kautta.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Print-on-Demand Kaupallinen Lisenssi - Myy Matematiikka Tehtävät Alakoulu ja Esiopetus Materiaali',
        description: `Täysi Pääsy -tilaus sisältää täydellisen kaupallisen print-on-demand -lisenssin. Myy luomasi kuviotehtävämonisteet Teachers Pay Teachers -palvelussa. Myy Etsyssä tulostettavina tuotteina. Myy Amazon KDP:ssä pienikontenttikirjoina.

Ei ylimääräisiä lisenssimaksuja tilauksen lisäksi. Kilpailijat veloittavat 79-199 dollaria vuodessa kaupallisista oikeuksista. Täysi Pääsy sisältää kaupallisen lisenssin 240 dollarin vuosihinnassa. Säästä satoja dollareita vuodessa.

Luo esiopetus materiaali ilmainen tuotteita myytäväksi. Luo tulostettavat tehtävät lapsille ilmainen -paketteja opettajayrittäjille. Luo matematiikka tehtävät alakoulu -kokoelmia. Ammattimainen 300 DPI -laatu sopii täydellisesti myyntiin.

Ei attribuutiovaatimusta. Myy tehtävämonisteet omalla tuotemerkillä. Opettajayrittäjät tienaavat 500-5000 dollaria kuukaudessa myymällä tehtävämonisteitä. Täysi Pääsy maksaa itsensä takaisin yhdellä myydyllä tuotteella. Luo hienomotoriikka harjoitukset ja kuviontunnistuksen materiaaleja myyntiin.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Kuvakirjasto - Värityskuvia Lapsille Tulostettava ja Kirjaimet Harjoittelu Esikoulu',
        description: `Pääsy yli 3000 lapsille sopivaan kuvaan. Järjestetty teemojen mukaan helppoa selaamista varten. Eläimet, ruoka, lelut, välineet, kulkuneuvot, luonto ja paljon muuta. Jokainen kuva on piirretty lapsille sopivalla tyylillä.

Valitse teema kuvavalikosta. Järjestelmä näyttää kaikki kyseisen teeman kuvat. Vedä kuvat kuviotehtävään. Ei hakua, ei selaamista satoja kuvia. Nopea ja tehokas tulostettavat tehtävät lapsille ilmainen luominen.

Kaikki kuvat sisältyvät Täysi Pääsy -tilaukseen. Ei lisämaksuja kuvista. Kilpailijat veloittavat 1-5 dollaria clipart-setistä. Säästä 200-400 dollaria vuodessa kuvamaksuissa. Käytä mitä tahansa kuvaa missä tahansa tehtävässä.

Yhdistä kuvakirjaston kuvat värityskuvia lapsille tulostettava -tehtäviin. Yhdistä kirjaimet harjoittelu esikoulu -tehtäviin. Luo esiopetus materiaali ilmainen, joka kattaa kaikki aiheet. Yksi kirjasto, rajattomat mahdollisuudet matematiikka tehtävät alakoulu luomiseen.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Ammattimainen 300 DPI -Laatu - Tulostettavat Tehtävät Lapsille Ilmainen Korkealaatuisena',
        description: `Kaikki kuviotehtävämonisteet viedään 300 DPI -tarkkuudella. Täydellinen tulostamiseen kotitulostimella. Täydellinen myyntiin Teachers Pay Teachers -palvelussa. Täydellinen Amazon KDP -kirjoille. Ammattimainen laatu jokaisessa tehtävässä.

Lataa JPEG- tai PDF-muodossa. JPEG nopeaa tulostamista varten. PDF säilyttää vektorigrafiikan ja tekstin terävänä. Molemmat muodot 300 DPI -laadulla. Valitse paras muoto matematiikka tehtävät alakoulu tarpeisiisi.

Harmaasävyvaihtoehto säästää mustetta. Klikkaa Harmaasävy-valintaruutua ennen lataamista. Järjestelmä muuntaa kaikki värit harmaasävyiksi. Täydellinen kouluille, joilla on rajalliset mustebudjetit. Luo esiopetus materiaali ilmainen, joka on edullinen tulostaa.

Kumoamis- ja tekeminen uudelleen -toiminnot suojaavat työtäsi. Tee virhe? Klikkaa Kumoa. Muutit mieltäsi? Klikkaa Tee uudelleen. Ei pelkoa kokeiluista. Luo tulostettavat tehtävät lapsille ilmainen luottavaisesti. Integroitu yhteenlasku ja vähennyslasku tehtävät ja kertotaulut tulostettava muiden tehtävätyyppien kanssa.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from Finnish kuviotehtava.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Kuviotehtävämonisteen luominen kestää alle kolme minuuttia alusta loppuun. Ei vaadita suunnittelutaitoja tai teknistä kokemusta. Seuraa viittä yksinkertaista vaihetta ammattimaiseen tehtävämonistiin. Jokainen vaihe on suunniteltu nopeaksi ja intuitiiviseksi.',
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
        title: 'Valitse Kuviotyppi ja Asetukset - Yhteenlasku ja Vähennyslasku Tehtävät Kuviontunnistuksella',
        description: `Aloita valitsemalla kuviotyppi yhdeksästä vaihtoehdosta. AB-kuvio on yksinkertaisin, täydellinen esikoululaisille. AAB ja ABB ovat keskivaikeita, sopivia alakoulun 1. luokalle. ABC ja AABB ovat haastavia, parhaita alakoulun 2-3. luokalle. ABBC, AABC, ABCC ja ABCD ovat edistyneitä kuvioita.

Kuviotyyppi määrittää tehtävän vaikeustason. AB-kuvio: omena, banaani, omena, banaani. AAB-kuvio: omena, omena, banaani, omena, omena, banaani. AABB-kuvio: omena, omena, banaani, banaani. ABC-kuvio: omena, banaani, kirsikka. Oppilaat oppivat kuviontunnistuksen näiden esimerkkien kautta.

Valitse kysymystyyppi kahdesta vaihtoehdosta. Tyhjä kohta -tyyppi näyttää kuvion tyhjällä ruudulla, jonka lapsi täyttää. Valitse vaihtoehdoista -tyyppi antaa 3-4 vaihtoehtoa, joista valita oikea kuva. Molemmat toimivat hyvin tulostettavat tehtävät lapsille ilmainen luomiseen.

Valitse tehtävien määrä väliltä 1-8. Esikoululaiset tarvitsevat 2-3 tehtävää per moniste. Alakoulun oppilaat käsittelevät 4-6 tehtävää. Edistyneet oppilaat voivat tehdä 7-8 tehtävää. Luo esiopetus materiaali ilmainen, joka sopii oppilaidesi tasolle. Integroitu yhteenlasku ja vähennyslasku tehtävät kuviontunnistukseen.`,
        icon: '⚙️',
      },
      {
        id: '2',
        number: 2,
        title: 'Valitse Kuvat Teemasta tai Kirjastosta - Värityskuvia Lapsille Tulostettava ja Hienomotoriikka Harjoitukset',
        description: `Valitse kuvat kolmesta lähteestä. Valitse teema pudotusvalikosta 50+ teemasta. Järjestelmä näyttää kaikki teeman kuvat. Klikkaa kuvia lisätäksesi ne kuvioon. Nopea ja helppo tapa luoda tulostettavat tehtävät lapsille ilmainen.

Selaa koko kuvakirjastoa 3000+ kuvasta. Käytä hakukenttää löytääksesi tiettyjä kuvia. Kirjoita "auto", "kukka" tai "eläin". Järjestelmä suodattaa tulokset välittömästi. Täydellinen personoituihin matematiikka tehtävät alakoulu tehtävämonisteihin.

Lataa omia kuvia Multi-lataus -painikkeella. Valitse useita JPEG-, PNG- tai GIF-kuvia kerralla. Lataa oppilaidesi piirustuksia. Lataa luokan valokuvia. Lataa teemayksiköiden kuvia. Luo esiopetus materiaali ilmainen, joka resonoi oppilaidesi kanssa.

Yhdistä teeman kuvat omiin kuviinsi. Käytä eläinteeman kuvia A- ja B-kuvioina. Käytä omia kuvia C-kuviona. Luo värityskuvia lapsille tulostettava yhdistämällä värilliset kuvat mustiin ääriviivoihin. Integroi hienomotoriikka harjoitukset kuviontunnistukseen.`,
        icon: '🖼️',
      },
      {
        id: '3',
        number: 3,
        title: 'Luo Tehtävämoniste Yhdellä Klikkauksella - Kertotaulut Tulostettava ja Pisteestä Pisteeseen Tehtävät',
        description: `Klikkaa Luo-painiketta. Järjestelmä generoi tehtävämonisteen välittömästi. Kuviot ilmestyvät näytölle selkeässä muodossa. Jokainen tehtävä on numeroitu. Tyhjät kohdat on merkitty selkeästi. Koko prosessi kestää 2-5 sekuntia.

Järjestelmä luo automaattisesti vastausavaimen. Vaihda Vastausavain-välilehteen nähdäksesi ratkaisun. Kaikki tyhjät kohdat on täytetty oikeilla kuvilla. Täydellinen opettajille, jotka tarvitsevat nopeita tarkistuksia. Luo tulostettavat tehtävät lapsille ilmainen vastausavaimella.

Tarkista tehtävämoniste ennen lataamista. Tarkista, että kaikki kuviot näyttävät oikealta. Tarkista, että kuvat ovat selkeitä. Tarkista, että tyhjät kohdat ovat oikeissa paikoissa. Jos jokin ei näytä hyvältä, klikkaa Luo uudelleen. Järjestelmä generoi uuden version.

Muokkaa tehtävämonistetta tarpeen mukaan. Lisää otsikko tai ohjeita. Muuta kuvien kokoa. Siirrä elementtejä. Järjestelmä antaa sinulle täyden hallinnan. Luo matematiikka tehtävät alakoulu, jotka näyttävät juuri sellaiselta kuin haluat. Integroi kertotaulut tulostettava ja pisteestä pisteeseen tehtävät kuviontunnistukseen.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Kankaalla - Kirjaimet Harjoittelu Esikoulu ja Lukemaan Oppiminen Tehtävät',
        description: `Vedä elementtejä hiirellä. Klikkaa kohdetta ja vedä se uuteen paikkaan. Järjestelmä ei rajoita sijoitusta. Siirrä kuvia, tekstiä tai koristeita minne haluat. Täysi vapaus tulostettavat tehtävät lapsille ilmainen muokkaamiseen.

Skaalaa kuvia koon muuttamiseksi. Klikkaa kohdetta ja vedä kulmakohdasta. Tee kuvia suuremmiksi tai pienemmiksi. Säilytä kuvasuhde automaattisesti. Ei vääristymiä, ei pikselöintiä. Ammattimainen laatu jokaisessa muokkauksessa.

Kierrä elementtejä haluttuun kulmaan. Klikkaa kohdetta ja vedä kiertokahvasta. Järjestelmä näyttää kulman reaaliajassa. Aseta elementit täydellisesti. Luo esiopetus materiaali ilmainen, joka näyttää ammattimaiselta.

Lisää tekstiä ohjeita varten. Lisää oppilaiden nimet. Lisää tehtävänumerot. Lisää päivämäärä. Muuta fonttia, kokoa ja väriä. Luo personoituja matematiikka tehtävät alakoulu. Integroi kirjaimet harjoittelu esikoulu ja lukemaan oppiminen tehtävät kuviontunnistukseen visuaalisen oppimisen kautta.`,
        icon: '🔧',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta - Esiopetus Materiaali Ilmainen PDF- tai JPEG-muodossa',
        description: `Klikkaa Lataa-painiketta. Valitse JPEG tai PDF. JPEG yksittäisille kuvatehtäville. PDF monisivuisille dokumenteille tai paremman tulostuslaadun saamiseksi. Molemmat muodot 300 DPI -tarkkuudella. Ammattimainen laatu jokaisessa latauksessa.

Valitse Harmaasävy-vaihtoehto musteen säästämiseksi. Järjestelmä muuntaa kaikki värit harmaasävyiksi säilyttäen kontrastin. Täydellinen kouluille, joilla on rajalliset tulostusbudjetit. Luo tulostettavat tehtävät lapsille ilmainen, jotka ovat edullisia tulostaa.

Lataa sekä tehtävämoniste että vastausavain. Klikkaa Tehtävämoniste (PDF) oppilaille. Klikkaa Vastausavain (PDF) itsellesi. Järjestä molemmat tiedostot kansiossa. Säilytä järjestys helpottamaan tulevaa käyttöä. Luo esiopetus materiaali ilmainen molemmissa muodoissa.

Tulosta välittömästi tai tallenna myöhempää käyttöä varten. Tallenna tiedostot pilveen. Tallenna teemayksiköiden kansioihin. Jaa kollegoiden kanssa. Luo matematiikka tehtävät alakoulu -kirjasto uudelleenkäyttöä varten. Integroi yhteenlasku ja vähennyslasku tehtävät, kertotaulut tulostettava ja hienomotoriikka harjoitukset kokonaisvaltaiseen opetukseen.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish kuviotehtava.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Kuviotehtävä palvelee monia käyttäjäryhmiä. Esiopetuksen opettajat luovat yksinkertaisia kuvioita 4-6-vuotiaille. Alakoulun opettajat luovat haastavia kuvioita 7-9-vuotiaille. Kotiopettajat luovat personoituja tehtävämonisteitä. Erityisopettajat eriyttävät vaikeustasoja. Opettajayrittäjät myyvät tehtävämonisteitä verkossa.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Esiopetuksen Opettajat - Esiopetus Materiaali Ilmainen ja Hienomotoriikka Harjoitukset Kuviontunnistukseen',
        subtitle: 'Matematiikan Perustaitojen ja Visuaalisen Hahmotuksen Kehittäminen',
        description: `Esiopetuksen opettajat tarvitsevat yksinkertaisia AB- ja AAB-kuvioita. 4-5-vuotiaat oppilaat harjoittelevat peruskuvioita. 5-6-vuotiaat oppilaat siirtyvät ABB- ja ABC-kuvioihin. Kuviontunnistus on keskeinen esiopetuksen taito Suomessa.

Luo esiopetus materiaali ilmainen, joka tukee opetussuunnitelman tavoitteita. Integroitu hienomotoriikka harjoitukset kuvioiden värittämiseen. Oppilaat tunnistavat kuviot, värittävät tyhjät kohdat ja kehittävät silmä-käsi-koordinaatiota. Kolme taitoa yhdessä tehtävässä.

Käytä suuria kuvia helpottamaan tunnistamista. Käytä tuttuja esineitä kuten hedelmiä, eläimiä ja leluja. Käytä kirkkaita värejä pitämään huomio. Luo tulostettavat tehtävät lapsille ilmainen, jotka innostavat nuoria oppilaita.

Esiopettajat luovat 2-3 tehtävää per moniste. Lyhyempi keskittymisaika edellyttää vähemmän tehtäviä. Suurempi kuvakoko helpottaa tunnistamista. Luo värityskuvia lapsille tulostettava yhdistämällä kuviontunnistus ja väritys yhdeksi aktiviteetiksi.`,
        quote: 'Oppilaani rakastavat kuviotehtäviä!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun 1-3. Luokan Opettajat - Matematiikka Tehtävät Alakoulu Kuviontunnistuksella',
        subtitle: 'Kuviontunnistus Tukee Algebran Perusteiden Oppimista',
        description: `Alakoulun opettajat luovat haastavampia kuvioita. 1. luokkalaiset (7-vuotiaat) harjoittelevat ABC- ja AABB-kuvioita. 2. luokkalaiset (8-vuotiaat) käsittelevät ABBC- ja AABC-kuvioita. 3. luokkalaiset (9-vuotiaat) ratkaisevat ABCD-kuvioita ja monimutkaisia sarjoja.

Kuviontunnistus liittyy suoraan matematiikan oppimiseen. Kuviot ovat kertolaskun perusta. AB-kuvio on 2:n taulu. ABC-kuvio on 3:n taulu. Oppilaat näkevät matemaattisen rakenteen visuaalisesti. Luo matematiikka tehtävät alakoulu, jotka valmistavat kertolaskuun.

Integroitu yhteenlasku ja vähennyslasku tehtävät kuviontunnistukseen. "Kuinka monta A-kuvaa on kahdessa toistossa?" (yhteenlasku). "Kuinka monta kuvaa puuttuu?" (vähennyslasku). Luo kertotaulut tulostettava -tehtäviä kuviopohjilla.

Alakoulun opettajat luovat 4-6 tehtävää per moniste. Pidemmät keskittymisjaksot sallivat enemmän tehtäviä. Pienemmät kuvat sopivat edistyneemmille oppilaille. Luo tulostettavat tehtävät lapsille ilmainen kaikille alakoulun luokka-asteille.`,
        quote: 'Eriyttäminen on nyt helppoa ja nopeaa.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat - Esiopetus Materiaali Ilmainen Monilapsisille Perheille ja Lukemaan Oppiminen Tehtävät',
        subtitle: 'Monipuolisia Materiaaleja Eri Ikätasoille',
        description: `Kotiopettajat tarvitsevat eriyttämistä monilapsisille perheille. 4-vuotias harjoittelee AB-kuvioita. 6-vuotias harjoittelee ABC-kuvioita. 8-vuotias harjoittelee ABCD-kuvioita. Luo kolme eri vaikeustasoa samasta teemasta.

Käytä samoja kuvia kaikissa tehtävissä. Sisarukset oppivat samoista teemoista eri tasoilla. Eläinteema toimii kaikille ikäryhmille. Muuta vain kuviotyypin monimutkaisuutta. Luo esiopetus materiaali ilmainen, joka palvelee koko perhettä.

Lataa perhekuvia ja henkilökohtaisia kuvia. Käytä lemmikkien kuvia kuvioissa. Käytä perheenjäsenten nimiä teksteinä. Luo tulostettavat tehtävät lapsille ilmainen, jotka resonoivat lapsen maailman kanssa.

Kotiopettajat yhdistävät kuviontunnistuksen lukemaan oppiminen tehtävät. Lisää kirjaimia kuvioihin. AB-kuvio kirjaimilla A ja B. Oppilaat oppivat sekä kuvioita että kirjaimet harjoittelu esikoulu samanaikaisesti. Kaksi taitoa yhdessä tehtävässä.`,
        quote: 'Yksi työkalu kattaa kaikkien lasteni tarpeet.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Vieraan Kielen Opettajat - Tulostettavat Tehtävät Lapsille Ilmainen 11 Kielellä',
        subtitle: 'Kuvioita Kirjaimilla ja Sanoilla Kieltenoppimiseen',
        description: `Englannin opettajat Suomessa käyttävät kuviotehtävää sanavaraston opettamiseen. Luo kuvioita englanninkielisillä eläinnimillä. Oppilaat oppivat "cat, dog, cat, dog" -kuvion kautta. Visuaalinen oppiminen tukee kielten oppimista.

Ruotsin opettajat luovat kuvioita ruotsinkielisillä sanoilla. Kaksikielisessä opetuksessa käytä molempia kieliä samassa tehtävässä. Oppilaat näkevät sanaparit kuvioissa. Luo matematiikka tehtävät alakoulu monikieliseen opetukseen.

11 kielen tuki mahdollistaa kansainväliset koulut. Luo sama tehtävä englanniksi, saksaksi ja ranskaksi. Jaa kollegoiden kanssa ympäri maailmaa. Luo tulostettavat tehtävät lapsille ilmainen missä tahansa tuetusta kielestä.

Yhdistä kielten oppiminen kuviontunnistukseen. Oppilaat oppivat sanoja kontekstissa. Kuviot antavat rakenteen muistamiselle. Luo esiopetus materiaali ilmainen, joka yhdistää kielet ja matematiikan.`,
        quote: 'Monikielisyystuki on ratkaisevaa luokkahuoneessani.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat - Esiopetus Materiaali Ilmainen Eriyttämiseen ja Pisteestä Pisteeseen Tehtävät',
        subtitle: 'Mukautettuja Materiaaleja Visuaalisen Hahmotuksen Tukemiseen',
        description: `Erityisopettajat eriyttävät vaikeustasoja samoissa luokkahuoneissa. Luo yksinkertaisia AB-kuvioita oppilaille, jotka tarvitsevat tukea. Luo haastavia ABCD-kuvioita edistyneille oppilaille. Sama teema, eri vaikeustasot. Kaikki oppilaat tuntevat osallisuutta.

Käytä suuria kuvia oppilailla, joilla on näköhaasteita. Käytä kirkkaita kontrasteja. Käytä tuttuja kuvia. Luo tulostettavat tehtävät lapsille ilmainen, jotka ovat esteettömiä.

Yhdistä pisteestä pisteeseen tehtävät kuviontunnistukseen. Oppilaat yhdistävät pisteet numeroiden mukaan. Numerot muodostavat kuvion. Oppilaat oppivat numeroita ja kuvioita samanaikaisesti. Integroitu hienomotoriikka harjoitukset pisteistä pisteeseen -tehtäviin.

Erityisopettajat luovat 1-2 tehtävää kerrallaan. Lyhyemmät istunnot sopivat paremmin. Enemmän toistoja vahvistaa oppimista. Luo matematiikka tehtävät alakoulu, jotka tukevat jokaista oppijaa.`,
        quote: 'Voin nopeasti mukauttaa tehtäviä jokaisen oppilaan tarpeisiin.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät - Myy Matematiikka Tehtävät Alakoulu ja Värityskuvia Lapsille Tulostettava',
        subtitle: 'Kaupallinen Lisenssi Teachers Pay Teachers -myyntiin',
        description: `Opettajayrittäjät käyttävät kuviotehtävää luomaan myytäviä tuotteita. Täysi Pääsy -tilaus sisältää kaupallisen print-on-demand -lisenssin. Myy luomasi tehtävämonisteet Teachers Pay Teachers -palvelussa, Etsyssä tai Amazon KDP:ssä.

Luo teemakohtaisia kuviotehtävä paketteja myytäväksi. Joulupaketti: lumihiutaleet, lahjat, piparkakut. Pääsiäispaketti: munat, puput, kukat. Halloween-paketti: kurpitsat, haamut, lepakot. Opettajat ostavat teemakohtaisia paketteja ympäri vuoden.

Yhdistä kuviotehtävä muihin tehtäviin kattaviksi paketeiksi. Myy "Talven Matematiikkapaketti" sisältäen kuviotehtävämonisteitä, yhteenlasku tehtäviä ja värityskuvia lapsille tulostettava. Suuremmat paketit myyvät paremmin kuin yksittäiset tehtävät.

300 DPI -laatu on ammattimainen myyntiin. Opettajat odottavat korkealaatuisia tuotteita. Kuviotehtävä täyttää laatustandardit. PDF-muoto on vakio Teachers Pay Teachers -palvelussa. Lataa ja myy välittömästi. Opettajayrittäjät tienaavat 500-5000 dollaria kuukaudessa myymällä tehtävämonisteitä.`,
        quote: 'Tilaukseni maksoi itsensä takaisin ensimmäisessä kuussa!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from Finnish kuviotehtava.md
  faq: {
    sectionTitle: 'Usein Kysyttyjä Kysymyksiä Tulostettavat Tehtävät Lapsille Ilmainen - Matematiikka Tehtävät Alakoulu ja Esiopetus',
    sectionDescription: 'Opettajat kysyvät samoja kysymyksiä kuviotehtävä tehtävämonisteiden luojasta. Tässä osiossa vastataan 12 yleisimpään kysymykseen. Vastaukset perustuvat todellisiin opettajien kokemuksiin. Kaikki tulostettavat tehtävät lapsille ilmainen ja matematiikka tehtävät alakoulu -vastaukset täällä.',
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
        question: 'Onko Tämä Kuviotehtävä Tehtävämonisteen Luoja Todella Ilmainen - Yhteenlasku ja Vähennyslasku Tehtävät?',
        answer: 'Kuviotehtävä tehtävämonisteen luoja vaatii Täysi Pääsy -tilauksen, joka maksaa 240 dollaria vuodessa tai 25 dollaria kuukaudessa. Tilauksesi antaa sinulle rajattoman kuviotehtävien luomisen ilman tehtäväkohtaisia maksuja. Luo niin monta yhteenlasku ja vähennyslasku tehtävät -tehtävää kuin tarvitset ilman lisämaksuja. Täysi Pääsy sisältää kaikki 33 tehtävämonisteen luojaa yhteen hintaan. Luo kuviotehtävämonisteitä, matematiikan tehtäviä, lukemisen tehtäviä ja paljon muuta. Rajaton luominen kaikilla työkaluilla. Ei piilomaksuja, ei ylimääräisiä kuluja.',
      },
      {
        id: '2',
        question: 'Voinko Tulostaa Kuviotehtävä Tehtävämonisteet Kotona Tavallisella Tulostimella - Kirjaimet Harjoittelu Esikoulu?',
        answer: 'Kyllä. Täysi Pääsy -tilaus sisältää rajattoman luokkahuoneen käytön. Tulosta niin monta kuviotehtävää kuin tarvitset. Kotitulostin toimii täydellisesti 300 DPI -laadulle. A4- ja Letter-koot sopivat kaikille tavallisille tulostimille. Lataa PDF- tai JPEG-muodossa. PDF säilyttää tekstin ja vektorit terävänä. JPEG on pienempi tiedostokoko nopeampaa tulostusta varten. Molemmat muodot tulostavat ammattimaisesti kotitulostimella tai koulukopiokoneella. Yhdistä kuviotehtävä kirjaimet harjoittelu esikoulu -tehtäviin.',
      },
      {
        id: '3',
        question: 'Tarvitsenko Suunnittelutaitoja Luodakseni Kuviotehtävä Tehtävämonisteet - Pisteestä Pisteeseen Tehtävät?',
        answer: 'Ei. Kuviotehtävä on suunniteltu opettajille, ei graafikoille. Ei tarvita suunnittelutaitoja tai teknistä osaamista. Klikkaa, valitse ja luo. Jokainen tehtävämoniste luodaan kolmessa minuutissa. Valitse kuviotyppi pudotusvalikosta. Valitse kuvat kirjastosta tai lataa omia. Klikkaa Luo. Järjestelmä luo ammattimaisen tehtävämonisteen automaattisesti. Ei ulkoasun suunnittelua, ei taitojen oppimista. Yhdistä pisteestä pisteeseen tehtävät -harjoituksiin samalla helppoudella.',
      },
      {
        id: '4',
        question: 'Voinko Käyttää Kuviotehtävä Tehtävämonisteet Luokassani Oppilaille - Kertotaulut Tulostettava?',
        answer: 'Kyllä. Täysi Pääsy -tilaus sisältää rajattoman luokkahuoneen käytön. Tulosta tehtävämonisteet kaikille oppilaille. Käytä kuviotehtäviä päivittäisessä matematiikan opetuksessa. Ei rajoituksia oppilaiden määrään tai käyttökertaan. Luo viikoittaisia tehtäväpaketteja luokallesi. Yhdistä kertotaulut tulostettava -tehtäviin viikottaisiin paketteihin. Jaa tehtävämonisteet digitaalisesti Google Classroomissa. Tai tulosta ja jaa paperiversioina. Molemmat tavat ovat sallittuja tilauksellasi.',
      },
      {
        id: '5',
        question: 'Millä Kielillä Kuviotehtävä Tehtävämonisteet Ovat Saatavilla - Esiopetus Materiaali Ilmainen?',
        answer: 'Kuviotehtävä käyttöliittymä toimii 11 kielellä: suomi, englanti, saksa, ranska, espanja, portugali (Brasilian), italia, hollanti, ruotsi, tanska ja norja. Vaihda kieli pudotusvalikosta. Kaikki painikkeet ja ohjeet muuttuvat välittömästi. Luo esiopetus materiaali ilmainen missä tahansa näistä 11 kielestä. Täydellinen kielikylpyopettajille ja kaksikielisille luokkahuoneille. Monikielinen tuki on sisällytetty Täysi Pääsy -tilaukseen. Ei lisämaksuja per kieli.',
      },
      {
        id: '6',
        question: 'Voinko Myydä Luomani Kuviotehtävä Tehtävämonisteet - Värityskuvia Lapsille Tulostettava?',
        answer: 'Kyllä. Täysi Pääsy -tilaus sisältää täydellisen kaupallisen print-on-demand -lisenssin ilman lisäkustannuksia. Myy luomasi kuviotehtävämonisteet Teachers Pay Teachers -palvelussa, Etsyssä ja Amazon KDP:ssä. Ei attribuutiovaatimusta. Myy omalla tuotemerkillä. Luo teemakohtaisia paketteja myytäväksi. Yhdistä kuviotehtävämonisteitä värityskuvia lapsille tulostettava -tehtäviin. 300 DPI -laatu on ammattimainen myyntiin. Ei rojalteja, ei lisämaksuja. Myy rajattomasti.',
      },
      {
        id: '7',
        question: 'Kuinka Mukautun Kuviotehtävä Tehtävämonisteet Oppilailleni - Hienomotoriikka Harjoitukset?',
        answer: 'Kaikki elementit kankaalla ovat täysin muokattavissa. Klikkaa mitä tahansa kohdetta valitaksesi sen. Vedä siirtääksesi. Vedä nurkista skaalataksesi. Vedä kierrä-kuvakkeesta kierrättääksesi. Täysi hallinta jokaiseen elementtiin. Lisää personoitua tekstiä mihin tahansa kohtaan. Kirjoita oppilaan nimi, luokan nimi tai erikoisohjeet. Muuta taustoja ja reunuksia teemojen mukaan. Yhdistä hienomotoriikka harjoitukset -elementtejä leikkaus- ja väritystehtäviin.',
      },
      {
        id: '8',
        question: 'Mille Ikäryhmille Nämä Kuviotehtävä Tehtävämonisteet Sopivat Parhaiten - Lukemaan Oppiminen Tehtävät?',
        answer: 'Kuviotehtävä tehtävämonisteet sopivat 4-9-vuotiaille lapsille. Esiopetus (4-6 vuotta) käyttää yksinkertaisia AB- ja AAB-kuvioita. Alakoulun 1-3. luokat (6-9 vuotta) käyttävät monimutkaisempia ABC-, ABB-, AABB- ja ABCD-kuvioita. AB-kuvio on yksinkertaisin, täydellinen aloittaville esikoululaisille. ABCD on vaikein, parhaiten 3. luokkalaisille. Valitse kuviotyyppi oppilaittesi kehitystason mukaan. Yhdistä kuviotehtävä lukemaan oppiminen tehtävät -harjoituksiin integroidulle oppimiselle.',
      },
      {
        id: '9',
        question: 'Voinko Ladata Omia Kuvia Kuviotehtävä Tehtävämonistiin - Kirjaimet Harjoittelu Esikoulu?',
        answer: 'Kyllä. Kuviotehtävä tukee monilatkausta. Klikkaa Lataa Omia Kuvia -painiketta. Valitse useita kuvia kerralla tietokoneeltasi. Lataa JPEG, PNG tai GIF -tiedostoja. Ei tiedostokokorajoituksia järkevissä rajoissa. Yhdistä lataamasi kuvat 3000+ kuvan kirjastoon. Käytä omia kuvia A-kuviona ja kirjaston kuvia B-kuviona. Luo täysin personoituja tehtävämonisteitä. Yhdistä kirjaimet harjoittelu esikoulu -kuviin omiin kuvahaastioihisi.',
      },
      {
        id: '10',
        question: 'Kuinka Kauan Kestää Luoda Kuviotehtävä Tehtävämoniste - Pisteestä Pisteeseen Tehtävät?',
        answer: 'Kuviotehtävä tehtävämonisteen luominen kestää 2-3 minuuttia alusta loppuun. Valitse kuviotyppi ja tehtävien määrä (30 sekuntia). Valitse kuvat kirjastosta tai lataa omia (1-2 minuuttia). Klikkaa Luo ja lataa (30 sekuntia). Yhteensä alle 3 minuuttia. Perinteinen luominen Word-tiedostolla tai PowerPointilla kestää 30-60 minuuttia. Kuviotehtävä tekee kaiken automaattisesti. Yhdistä pisteestä pisteeseen tehtävät samalla nopeudella.',
      },
      {
        id: '11',
        question: 'Sisältävätkö Kuviotehtävä Tehtävämonisteet Vastausavaimet - Yhteenlasku ja Vähennyslasku Tehtävät?',
        answer: 'Kyllä. Kuviotehtävä luo automaattisesti sekä tehtävämonisteen että vastausavaimen. Tehtävämoniste sisältää esimerkkejä ja tyhjiä ruutuja oppilaiden täytettäväksi. Vastausavain näyttää kaikki ruudut täytettyinä oikealla vastauksella. Vaihda tehtävämonisteen ja vastausavaimen välillä välilehdillä. Muokkaa molempia versiota erikseen. Lataa molemmat PDF- tai JPEG-muodossa. Tulosta tehtävämoniste oppilaille ja vastausavain itsellesi. Yhdistä yhteenlasku ja vähennyslasku tehtävät vastausavaimiin.',
      },
      {
        id: '12',
        question: 'Voinko Luoda Kuviotehtävä Tehtävämonisteitä Tietyistä Kouluaineista - Kertotaulut Tulostettava?',
        answer: 'Kyllä. Käytä kuvakirjaston teemavalikkoa aihekohtaisiin kuvioihin. Matematiikka: käytä numeroita, muotoja ja laskutoimitusmerkkejä kuvioina. Tiede: käytä eläimiä, kasveja ja luonnonilmiöitä. Historia: käytä kulttuurikohteita ja symboleja. Kirjallisuus: käytä kirjaimia, sanoja ja välimerkkejä kuvioina. Yhdistä kuviotehtävä muihin matematiikan tehtäviin. Luo paketti, joka sisältää kuviotehtävämonisteitä, kertotaulut tulostettava -tehtäviä ja geometrian harjoituksia.',
      },
    ],
  },

  // Pricing - Finnish Full Access terminology (€240/year or €25/month)
  pricing: {
    title: 'Täysi Pääsy',
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
    sectionDescription: 'Täysi Pääsy sisältää 33 ilmaista työkalua. Yhdistä kuviotehtävä muihin generaattoreihin täydellisiin oppimispaketteihin. Luo viikon tehtäväpaketti kaikilla työkaluilla. Luo teemakohtaisia paketteja jotka yhdistävät useita taitoja.',
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
        slug: 'pattern-train',
        name: 'Kuviojuna',
        category: 'Kuviot',
        icon: '🚂',
        description: 'Jatka kuviontunnistuksen harjoittelua hauskan junateeman avulla nuoremmille oppilaille.',
      },
      {
        id: '2',
        slug: 'find-and-count',
        name: 'Etsi ja Laske',
        category: 'Matematiikka',
        icon: '🔢',
        description: 'Yhdistä visuaalinen etsintä laskentaharjoitteluun täydelliseen peruslaskuoperaatioiden hallintaan.',
      },
      {
        id: '3',
        slug: 'coloring',
        name: 'Värityskuvat',
        category: 'Luovuus',
        icon: '🎨',
        description: 'Palkitse valmiit kuviotehtävät teemaattisilla värityskuvilla, jotka kehittävät hienomotoriikkaa.',
      },
      {
        id: '4',
        slug: 'matching',
        name: 'Yhdistämistehtävät',
        category: 'Logiikka',
        icon: '🔗',
        description: 'Opeta visuaalista tunnistamista ja muistia hauskoilla yhdistämistehtävillä.',
      },
      {
        id: '5',
        slug: 'shadow-match',
        name: 'Varjojen Yhdistäminen',
        category: 'Visuaalinen',
        icon: '👤',
        description: 'Kehitä visuaalista hahmottamista yhdistämällä esineet niiden varjoihin.',
      },
      {
        id: '6',
        slug: 'odd-one-out',
        name: 'Mikä Ei Kuulu Joukkoon',
        category: 'Logiikka',
        icon: '🔍',
        description: 'Täydennä kuviotehtäviä luokitteluharjoituksilla loogisen ajattelun kehittämiseksi.',
      },
    ],
  },
};

export default patternWorksheetFiContent;
