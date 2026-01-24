import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Pattern Train Worksheets - Finnish Content (Kuviojuna Tehtävät)
 *
 * File: frontend/content/product-pages/fi/kuviojuna-tyoarkit.ts
 * URL: /fi/apps/kuviojuna-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/kuviojuna.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * FULL ACCESS APP - €240/year or €25/month (Täysi Pääsy)
 */

export const patternTrainFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'kuviojuna-tyoarkit',
    appId: 'pattern-train',
    title: 'Kuviojuna Tehtävät - Tulostettavat Tehtävät Lapsille Ilmainen - Matematiikka Tehtävät Alakoulu',
    description: 'Luo ammattimaisia kuviojuna tehtävämonisteet kuviontunnistusjärjestelmällämme. Täysi Pääsy -tilauksesi antaa sinulle rajattoman tehtävien luomisen ilman tehtäväkohtaisia maksuja. Lataa korkealaatuisia PDF-tehtävämonisteitä alle kolmessa minuutissa.',
    keywords: 'kuviojuna tehtävät, tulostettavat tehtävät lapsille ilmainen, matematiikka tehtävät alakoulu, esiopetus materiaali ilmainen, kuviontunnistus, kuvioharjoitukset lapsille',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/kuviojuna-tyoarkit',
  },

  // Hero Section - FULL text from Finnish kuviojuna.md
  hero: {
    title: 'Kuviojuna',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen - Matematiikka Tehtävät Alakoulu ja Esiopetus Materiaali',
    description: `Luo ammattimaisia kuviojuna tehtävämonisteet kuviontunnistusjärjestelmällämme. Täysi Pääsy -tilauksesi antaa sinulle rajattoman tehtävien luomisen ilman tehtäväkohtaisia maksuja. Luo tulostettavia kuviojuna tehtäviä lapsille, jotka sopivat täydellisesti esikoululaisille ja alakouluikäisille. Lataa korkealaatuisia PDF-tehtävämonisteitä alle kolmessa minuutissa.

Kuviojuna on visuaalinen matematiikan työkalu, joka opettaa kuviontunnistusta junan teemalla. Lapset harjoittelevat AB-, AAB-, ABB-, ABC- ja AABB-kuvioita hauskan junamallin avulla. Tämä menetelmä yhdistää matematiikan oppimisen visuaaliseen ajatteluun.

Tehtävämonisteet tukevat esiopetuksen ja alakoulun matematiikan opetussuunnitelmaa. Kuviontunnistus on perustaito, joka johtaa algebran ymmärtämiseen. Opettajat käyttävät kuviojunaa havainnollisten matematiikkatehtävien luomiseen, jotka pitävät lapset kiinnostuneina.

Jokaisessa tehtävässä on selkeät esimerkit ja vastausavain. Voit mukauttaa vaikeustasoa valitsemalla kuviotyypin ja vihjeiden määrän. Täydellinen sekä esiopetukseen että alakoulun ensimmäisille luokille.`,
    previewImageSrc: '/samples/english/pattern train/pattern_train portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/pattern train/
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
        worksheetSrc: '/samples/english/pattern train/pattern_train portrait.jpeg',
        answerKeySrc: '/samples/english/pattern train/pattern_train portrait answer_key.jpeg',
        altText: 'Kuviojuna tehtävä pystysuunta esiopetukseen ja alakouluun',
        pdfDownloadUrl: '/samples/english/pattern train/pattern_train portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/pattern train/pattern_train landscape.jpeg',
        answerKeySrc: '/samples/english/pattern train/pattern_train landscape answer_key.jpeg',
        altText: 'Kuviojuna tehtävä vaakasuunta kuviontunnistukseen',
        pdfDownloadUrl: '/samples/english/pattern train/pattern_train landscape.pdf',
      },
    ],
  },

  // Features Grid - FULL text from Finnish kuviojuna.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Kuviojuna tehtävämonisteen luoja tarjoaa ammattimaiset työkalut kuviontunnistuksen opettamiseen. Täysi Pääsy -tilaus antaa sinulle pääsyn kaikkiin 33 tehtävämonisteen luojaan, mukaan lukien kuviojuna. Luo rajattomasti tulostettavia tehtäviä lapsille ilman lisämaksuja. Jokainen ominaisuus on suunniteltu helpottamaan esiopetuksen ja alakoulun opettajien työtä.',
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
        description: `Kuviojuna tehtävien luominen on nopeaa ja helppoa. Valitse kuviotyppi viidestä vaihtoehdosta. Valitse vihjeiden määrä väliltä 4-10. Klikkaa Luo ja tehtävämoniste ilmestyy näytölle. Koko prosessi kestää alle minuutin.

Järjestelmä luo automaattisesti sekä tehtävämonisteen että vastausavaimen. Tehtävämoniste sisältää junamallin kuvioruuduilla. Vastausavain näyttää täydennetyn kuvion. Ei manuaalista työtä, ei ulkoasun suunnittelua.

Valitse kuviot kolmesta lähteestä. Käytä 3000+ kuvan kirjastoa teemojen mukaan. Anna järjestelmän valita kuvat automaattisesti teemasta. Tai lataa omia kuvia. Kaikki matematiikka tehtävät alakoulu luodaan ammattimaisen näköisiksi.

Esiopetuksen opettajat luovat yksinkertaisia AB-kuvioita. Alakoulun opettajat luovat haastavampia AABB- tai ABC-kuvioita. Sama työkalu, eri vaikeustasot. Täydellinen eriyttämiseen.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Muokkaa Kaikkea Esiopetus Materiaali Ilmainen - Hienomotoriikka Harjoitukset Mukaan',
        description: `Jokainen elementti kuviojuna tehtävässä on muokattavissa. Vedä, kierrä, skaalaa ja poista mitä tahansa kohdetta hiirellä. Ei lukittuja elementtejä. Täysi hallinta tehtävämonisteen ulkoasuun.

Lisää tekstiä mihin tahansa kohtaan tehtävää. Muuta fonttia, kokoa ja väriä. Lisää ohjeita suomeksi tai millä tahansa kielellä. Luo personoituja tehtävämonisteitä oppilaillesi. Kaikki hienomotoriikka harjoitukset ja matematiikan tehtävät mukautettavissa.

Siirrä kuvioita uusiin paikkoihin. Muuta junamallin kokoa tai sijaintia. Lisää ylimääräisiä kuvia tai koristeita. Järjestelmä ei rajoita luovuuttasi. Luo esiopetus materiaali ilmainen, joka näyttää juuri sellaiselta kuin haluat.

Tasojen hallinta antaa sinulle täydellisen kontrollin. Siirrä elementtejä eteen tai taakse. Tasaa objekteja sivulle. Ryhmittele elementtejä yhteen. Ammattimaiset asettelutyökalut ilman monimutkaista ohjelmistoa.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Lataa Omia Kuvia - Tulostettavat Tehtävät Lapsille Ilmainen Personoidulla Sisällöllä',
        description: `Kuviojuna tukee monilatkausta. Valitse useita kuvia kerralla tietokoneeltasi. Lataa JPEG, PNG tai GIF -kuvia. Ei tiedostokokorajoituksia järkevissä rajoissa. Lataa niin monta kuvaa kuin tarvitset.

Yhdistä lataamasi kuvat kirjaston 3000+ kuvaan. Käytä omia kuvia A-kuviona ja kirjaston kuvia B-kuviona. Luo täysin personoituja matematiikka tehtävät alakoulu. Täydellinen teemayksiköihin tai erityisopetukseen.

Lataa oppilaidesi valokuvia luokasta. Lataa paikallisia maamerkkejä tai eläimiä. Lataa kuvia aiheista, joita opiskelet. Luo tulostettavat tehtävät lapsille ilmainen, jotka koskettavat heidän elämäänsä.

Ladatut kuvat tallennetaan istuntokohtaisesti. Ne pysyvät käytettävissä koko työskentelyn ajan. Luo useita tehtävämonisteitä samoilla kuvilla. Ei tarvitse ladata uudelleen joka kerta.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Kielen Tuki - Esiopetus Materiaali Ilmainen Monikieliseen Opetukseen',
        description: `Kuviojuna käyttöliittymä toimii 11 kielellä. Vaihda kieli pudotusvalikosta. Kaikki painikkeet, otsikot ja ohjeet muuttuvat välittömästi. Suomi, englanti, saksa, ranska, espanja, portugali, italia, hollanti, ruotsi, tanska ja norja.

Luo tulostettavat tehtävät lapsille ilmainen missä tahansa näistä kielistä. Täydellinen kielikylpyopettajille. Täydellinen kaksikielisille luokkahuoneille. Täydellinen kansainvälisille kouluille.

Monikielinen tuki on kriittinen suomalaisille opettajille, jotka opettavat englantia. Luo matematiikka tehtävät alakoulu englanniksi samalla työkalulla. Sama käyttöliittymä, eri kieli. Ei tarvetta oppia uutta ohjelmistoa.

Kuvatiedostojen nimet määrittävät sisällön monikielisissä tehtävissä. Kuviojuna käyttää kuvia visuaalisesti, joten kieli ei rajoita käyttöä. Luo esiopetus materiaali ilmainen millä tahansa kieliyhdistelmällä.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Print-on-Demand Kaupallinen Lisenssi - Myy Matematiikka Tehtävät Alakoulu',
        description: `Täysi Pääsy -tilaus sisältää täydellisen kaupallisen print-on-demand -lisenssin. Myy luomasi kuviojuna tehtävämonisteet Teachers Pay Teachers -palvelussa. Myy Etsyssä tulostettavina tuotteina. Myy Amazon KDP:ssä pienikontenttikirjoina.

Ei ylimääräisiä lisenssimaksuja tilauksen lisäksi. Kilpailijat veloittavat 79-199 dollaria vuodessa kaupallisista oikeuksista. Täysi Pääsy sisältää kaupallisen lisenssin 240 dollarin vuosihinnassa. Säästä satoja dollareita vuodessa.

Luo esiopetus materiaali ilmainen tuotteita myytäväksi. Luo tulostettavat tehtävät lapsille ilmainen -paketteja opettajayrittäjille. Luo matematiikka tehtävät alakoulu -kokoelmia. Ammattimainen 300 DPI -laatu sopii täydellisesti myyntiin.

Ei attribuutiovaatimusta. Myy tehtävämonisteet omalla tuotemerkillä. Opettajayrittäjät tienaavat 500-5000 dollaria kuukaudessa myymällä tehtävämonisteitä. Täysi Pääsy maksaa itsensä takaisin yhdellä myydyllä tuotteella.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Kuvakirjasto - Hienomotoriikka Harjoitukset ja Lukemaan Oppiminen Tehtävät',
        description: `Pääsy yli 3000 lapsille sopivaan kuvaan. Järjestetty teemojen mukaan helppoa selaamista varten. Eläimet, ruoka, lelut, välineet, kulkuneuvot, luonto ja paljon muuta. Jokainen kuva on piirretty lapsille sopivalla tyylillä.

Valitse teema kuvavalikosta. Järjestelmä näyttää kaikki kyseisen teeman kuvat. Vedä kuvat kuviojuna tehtävään. Ei hakua, ei selaamista satoja kuvia. Nopea ja tehokas.

Kaikki kuvat sisältyvät Täysi Pääsy -tilaukseen. Ei lisämaksuja kuvista. Kilpailijat veloittavat 1-5 dollaria clipart-setistä. Säästä 200-400 dollaria vuodessa kuvamaksuissa. Käytä mitä tahansa kuvaa missä tahansa tehtävässä.

Yhdistä kuvakirjaston kuvat hienomotoriikka harjoitukset -tehtäviin. Yhdistä lukemaan oppiminen tehtävät -kuviin. Luo tulostettavat tehtävät lapsille ilmainen, jotka kattavat kaikki aiheet. Yksi kirjasto, rajattomat mahdollisuudet.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Ammattimainen 300 DPI -Laatu - Tulostettavat Tehtävät Lapsille Ilmainen Korkealaatuisena',
        description: `Kaikki kuviojuna tehtävämonisteet viedään 300 DPI -tarkkuudella. Täydellinen tulostamiseen kotitulostimella. Täydellinen myyntiin Teachers Pay Teachers -palvelussa. Täydellinen Amazon KDP -kirjoille. Ammattimainen laatu jokaisessa tehtävässä.

Lataa JPEG- tai PDF-muodossa. JPEG nopeaa tulostamista varten. PDF säilyttää vektorigrafiikan ja tekstin terävänä. Molemmat muodot 300 DPI -laadulla. Valitse paras muoto tarpeisiisi.

Harmaasävyvaihtoehto säästää mustetta. Klikkaa Harmaasävy-valintaruutua ennen lataamista. Järjestelmä muuntaa kaikki värit harmaasävyiksi. Täydellinen kouluille, joilla on rajalliset mustebudjetit. Luo esiopetus materiaali ilmainen, joka on edullinen tulostaa.

Kumoamis- ja tekeminen uudelleen -toiminnot suojaavat työtäsi. Tee virhe? Klikkaa Kumoa. Muutit mieltäsi? Klikkaa Tee uudelleen. Ei pelkoa kokeiluista. Luo matematiikka tehtävät alakoulu luottavaisesti.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from Finnish kuviojuna.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Kuviojuna tehtävämonisteen luominen kestää alle kolme minuuttia alusta loppuun. Ei vaadita suunnittelutaitoja tai teknistä kokemusta. Seuraa viittä yksinkertaista vaihetta ammattimaiseen tehtävämonistiin. Jokainen vaihe on suunniteltu nopeaksi ja intuitiiviseksi.',
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
        title: 'Valitse Kuviotyppi ja Vihjeet - Yhteenlasku ja Vähennyslasku Tehtävät Kuviontunnistuksella',
        description: `Aloita valitsemalla kuviotyppi viidestä vaihtoehdosta. AB-kuvio on yksinkertaisin, täydellinen esikoululaisille. AAB ja ABB ovat keskivaikeita, sopivia alakoulun 1. luokalle. ABC ja AABB ovat haastavia, parhaita alakoulun 2-3. luokalle.

Kuviotyyppi määrittää tehtävän vaikeustason. AB-kuvio: omena, banaani, omena, banaani. AAB-kuvio: omena, omena, banaani, omena, omena, banaani. AABB-kuvio: omena, omena, banaani, banaani. ABC-kuvio: omena, banaani, kirsi. Oppilaat oppivat kuviontunnistuksen näiden esimerkkien kautta.

Valitse seuraavaksi vihjeiden määrä liukusäätimestä. 4-10 vihjesäädin antaa sinun säätää vaikeutta. Vähemmän vihjeitä = vaikeampi tehtävä. Enemmän vihjeitä = helpompi tehtävä. Esiopetuksen opettajat käyttävät yleensä 6-8 vihjettä. Alakoulun opettajat käyttävät 4-6 vihjettä.

Kuviontunnistus on perusmatematiikan taito. Se johtaa algebran ymmärtämiseen. Lapset, jotka hallitsevat kuviot, pärjäävät paremmin yhteenlasku ja vähennyslasku tehtävät -oppimisessa. Kuviojuna tekee abstraktista matematiikasta konkreettista.`,
        icon: '⚙️',
      },
      {
        id: '2',
        number: 2,
        title: 'Valitse Kuvat Kuviolle - Värityskuvia Lapsille Tulostettava ja Kirjaimet Harjoittelu Esikoulu',
        description: `Valitse kuvat kuviolle kolmesta vaihtoehdosta. Ensimmäinen vaihtoehto: valitse teema pudotusvalikosta. Järjestelmä valitsee automaattisesti sopivat kuvat kyseisestä teemasta. Nopein tapa luoda tehtävämoniste.

Toinen vaihtoehto: selaa kuvakirjastoa manuaalisesti. Valitse teema nähdäksesi kaikki kyseisen teeman kuvat. Vedä kuvat kuviojuna tehtävään. Tämä antaa sinulle täydellisen hallinnan siitä, mitkä kuvat näkyvät. Täydellinen teemayksiköihin.

Kolmas vaihtoehto: lataa omia kuvia. Klikkaa Lataa Omia Kuvia -painiketta. Valitse JPEG, PNG tai GIF -kuvia tietokoneeltasi. Lataa niin monta kuin tarvitset. Käytä oppilaittesi valokuvia, paikallisia maamerkkejä tai mitä tahansa haluamaasi.

Yhdistä eri kuvalähteitä. Käytä kirjaston eläinkuvia A-kuviona. Lataa värityskuvia lapsille tulostettava B-kuviona. Tai yhdistä kirjaimet harjoittelu esikoulu -kuviin kuviontunnistuksen kanssa. Rajattomat yhdistelmät.`,
        icon: '🖼️',
      },
      {
        id: '3',
        number: 3,
        title: 'Luo Tehtävämoniste - Kertotaulut Tulostettava ja Pisteestä Pisteeseen Tehtävät',
        description: `Klikkaa Luo-painiketta, kun olet valinnut asetukset ja kuvat. Järjestelmä luo kuviojuna tehtävämonisteen välittömästi. Ei odottelua, ei lataamista. Tehtävämoniste ilmestyy kankaalle 1-2 sekunnissa.

Tehtävämoniste sisältää junamallin kuvioruutuineen. Ensimmäiset ruudut näyttävät kuvion esimerkkejä. Viimeiset ruudut ovat tyhjiä oppilaiden täytettäväksi. Selkeä visuaalinen muoto auttaa lapsia ymmärtämään tehtävän.

Järjestelmä luo myös vastausavaimen automaattisesti. Klikkaa Vastausavain-välilehteä nähdäksesi sen. Vastausavain näyttää kaikki ruudut täytettyinä. Opettajat käyttävät tätä tarkistaakseen oppilaiden työt nopeasti.

Molemmat versiot ovat täysin muokattavissa. Siirrä junamallia. Muuta kokoa. Lisää tekstiä tai lisäkuvia. Järjestelmä ei lukitse mitään. Kaikki elementit ovat vapaasti siirrettäviä ja muokattavia. Kuviojuna tehtävämonisteet toimivat hyvin yhdessä muiden matematiikan tehtävien kanssa. Yhdistä kertotaulut tulostettava -tehtäviin viikottaisissa paketeissa. Yhdistä pisteestä pisteeseen tehtävät -harjoituksiin.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Kankaalla - Hienomotoriikka Harjoitukset ja Lukemaan Oppiminen Tehtävät',
        description: `Kangas on täysin interaktiivinen työtila. Klikkaa mitä tahansa elementtiä valitaksesi sen. Vedä siirtääksesi. Vedä nurkista skaalataksesi. Vedä kierrä-kuvakkeesta kierrättääksesi. Kaikki muokkaus tapahtuu suoraan kankaalla.

Lisää otsikkoteksti tehtävämonisteen yläosaan. Kirjoita "Kuviojuna" tai "Kuvioharjoitus". Valitse fontti, koko ja väri. Siirrä teksti täydelliseen kohtaan. Muotoile se näyttämään ammattimaiselta.

Lisää ohjeteksti oppilaita varten. "Katso kuviota ja täytä tyhjät ruudut" suomeksi. Tai millä tahansa kielellä opettamasi mukaan. Tekstityökalut tukevat kaikkia Unicoden merkkejä. Kirjoita ohjeita suomeksi, englanniksi tai missä tahansa kielessä.

Muokkaa taustaa ja reunuksia. Valitse taustateema Sivu Asetukset -paneelista. Säädä läpinäkyvyyttä. Lisää juhlavat reunukset jouluna tai pääsiäisenä. Luo värikkäitä tehtävämonisteitä, jotka motivoivat oppilaita. Yhdistä hienomotoriikka harjoitukset -elementtejä tehtävään. Lisää leikattavia viivoja. Lisää värityskuvia reunoille. Luo lukemaan oppiminen tehtävät -tekstejä kuvion alle.`,
        icon: '🔧',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta - Tulostettavat Tehtävät Lapsille Ilmainen PDF ja JPEG Muodossa',
        description: `Klikkaa Lataa-painiketta, kun tehtävämoniste on valmis. Valitse joko Tehtävämoniste (PDF) tai Tehtävämoniste (JPEG). PDF säilyttää tekstin terävänä. JPEG on pienempi tiedostokoko. Molemmat ovat 300 DPI -laadulla.

Lataa myös vastausavain. Klikkaa Vastausavain (PDF) tai Vastausavain (JPEG). Tallenna molemmat tiedostot tietokoneellesi. Järjestä ne kansioihin aiheittain tai viikoittain. Rakenna digitaalinen tehtävämonisteiden kirjasto.

Harmaasävy-vaihtoehto säästää värimusteita. Klikkaa Harmaasävy-valintaruutua ennen lataamista. Järjestelmä muuntaa kaikki värit harmaasävyiksi. Täydellinen kouluille, joilla on rajalliset mustebudjetit. Kaikki tulostettavat tehtävät lapsille ilmainen tulostuvat taloudellisesti.

Tulosta kotitulostimella tai koulukopiokoneella. 300 DPI -laatu näyttää ammattimaiselta molemmilla. A4- tai Letter-koko sopii kaikille tavallisille tulostimille. Ei erikoispaperia tai erikoisasetuksia tarvita.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish kuviojuna.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Kuviojuna palvelee monipuolisesti eri käyttäjäryhmiä. Esiopetuksen opettajista alakoulun opettajiin, kotiopettajavanhemmista erityisopettajiin. Jokainen käyttäjäryhmä löytää oman tapansa hyödyntää kuviojuna tehtävämonisteitä. Matematiikka tehtävät alakoulu sopivat kaikille ikätasoille ja oppimistarpeille.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Esiopetuksen Opettajat - Värityskuvia Lapsille Tulostettava ja Hienomotoriikka Harjoitukset',
        subtitle: 'Matematiikan Perustaitojen ja Visuaalisen Hahmotuksen Kehittäminen',
        description: `Esiopetuksen opettajat käyttävät kuviojunaa matematiikan perustaitojen opettamiseen. Kuviontunnistus on keskeinen taito, joka tukee logiikan kehitystä. 5-6-vuotiaat lapset oppivat tunnistamaan yksinkertaisia AB- ja AAB-kuvioita visuaalisesti.

Yhdistä kuviojuna tehtävämonisteet värityskuvia lapsille tulostettava -aktiviteetteihin. Lapset täyttävät kuvion ja värittävät sen sitten. Kaksoistavoite: matematiikka ja hienomotoriikka harjoitukset yhdessä tehtävässä. Täydellinen esiopetuksen monipuolisiin oppimiskeskuksiin.

Suomalaisessa esiopetuksessa korostetaan leikin kautta oppimista. Kuviojuna tekee matematiikasta hauskaa junan teemalla. Lapset rakastavat junia. Kuviontunnistus muuttuu leikiksi, ei pakolliseksi tehtäväksi. Oppimisen innostus kasvaa.

Eriytetyt versiot tukevat eri kehitystasoilla olevia lapsia. Lahjakkaat lapset saavat ABC-kuvioita. Keskitason lapset saavat AAB-kuvioita. Tukea tarvitsevat lapset saavat AB-kuvioita. Kaikki oppivat omalla tasollaan. Luo tulostettavat tehtävät lapsille ilmainen jokaiselle lapselle.`,
        quote: 'Oppilaani rakastavat kuviojuna tehtäviä!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun Opettajat - Matematiikka Tehtävät Alakoulu ja Yhteenlasku ja Vähennyslasku Tehtävät',
        subtitle: 'Kuviontunnistus Tukee Algebran Perusteiden Oppimista',
        description: `Alakoulun 1-3. luokkien opettajat käyttävät kuviojunaa matematiikan tukimateriaalina. Kuviontunnistus tukee algebran perusteiden oppimista. Lapset, jotka ymmärtävät kuvioita, oppivat helpommin yhtälöitä myöhemmin.

Yhdistä kuviojuna tehtävämonisteet yhteenlasku ja vähennyslasku tehtävät -harjoituksiin. Käytä numeroita kuvioina. Luo kuvio: 2, 4, 2, 4. Tai 5, 10, 5, 10. Lapset näkevät matematiikan kuvioita lukujonoissa. Abstrakti matematiikka muuttuu konkreettiseksi.

1. luokan opettajat aloittavat AB- ja AAB-kuvioilla. 2. luokan opettajat siirtyvät ABC- ja ABB-kuvioihin. 3. luokan opettajat haastavat oppilaita AABB-kuvioilla. Progressiivinen vaikeus tukee oppimista.

Viikottaiset matematiikkapakettit sisältävät kuviojuna tehtävämonisteitä. Maanantaina uusi kuviotyyppi. Tiistaina harjoittelua. Keskiviikkona soveltamista. Torstaina arviointi. Perjantaina hauskat teemakuviot. Johdonmukainen rakenne auttaa oppimista.`,
        quote: 'Eriyttäminen on nyt helppoa ja nopeaa.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajavanhemmat - Esiopetus Materiaali Ilmainen ja Kertotaulut Tulostettava',
        subtitle: 'Monipuolisia Materiaaleja Eri Ikätasoille',
        description: `Kotiopettajavanhemmat tarvitsevat monipuolisia materiaaleja eri ikätasoille. Täysi Pääsy -tilaus antaa pääsyn kaikkiin 33 tehtävämonisteen luojaan. Luo kuviojuna tehtävämonisteitä nuorimmille. Luo kertotaulut tulostettava -tehtäviä vanhemmille. Yksi tilaus kattaa kaikki lapset.

Kotiopetuksessa vanhemmat opettavat usein 2-4 lasta samanaikaisesti eri ikätasoilla. Kuviojuna mahdollistaa nopean eriyttämisen. Luo helpompi versio nuoremmalle lapselle. Luo vaikeampi versio vanhemmalle lapselle. Molemmat työskentelevät samalla teemalla.

Suomalaiset kotiopettajavanhemmat noudattavat usein kansallista opetussuunnitelmaa. Kuviontunnistus on osa esiopetuksen ja alakoulun matematiikan tavoitteita. Kuviojuna tukee virallisia oppimisen tavoitteita. Ei tarvitse luoda materiaalia tyhjästä.

Kotiopetuksen joustavuus mahdollistaa luovan matematiikan opetuksen. Käytä kuviojunaa aamulla matematiikan aikana. Käytä samoja kuvioita iltapäivällä taidetyössä. Käytä kuvioita musiikissa rytmien opettamiseen. Sama konsepti, useita sovelluksia.`,
        quote: 'Yksi työkalu kattaa kaikkien lasteni tarpeet.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Kielenopettajat - Kirjaimet Harjoittelu Esikoulu ja Lukemaan Oppiminen Tehtävät',
        subtitle: 'Kuvioita Kirjaimilla ja Sanoilla Kieltenoppimiseen',
        description: `Kielenopettajat käyttävät kuviojunaa kirjainten ja sanojen kuvioiden opettamiseen. Luo kuvioita kirjaimilla: A, B, A, B. Tai vokaalien kuvio: A, E, I, A, E, I. Yhdistä kuviontunnistus kirjaimet harjoittelu esikoulu -aktiviteetteihin.

Suomalaiset englannin opettajat käyttävät kuviojunaa sanavaraston opettamiseen. Luo kuvio englanninkielisillä sanoilla: apple, banana, apple, banana. Lapset oppivat sanoja ja kuvioita samanaikaisesti. Visuaalinen oppiminen tukee kielten oppimista.

Monikielinen tuki on kriittinen kielikylpyopettajille. Vaihda käyttöliittymän kieli suomesta englantiin yhdellä klikkauksella. Luo tulostettavat tehtävät lapsille ilmainen molemmilla kielillä. Sama tehtävä, eri kieli. Johdonmukainen oppimiskokemus.

Kielenopettajat yhdistävät kuviojuna lukemaan oppiminen tehtävät -harjoituksiin. Luo kuvio CVC-sanoilla: cat, dog, cat, dog. Lapset harjoittelevat lukemista ja kuviontunnistusta. Integroitu lähestymistapa tukee molempia taitoja.`,
        quote: 'Monikielisyystuki on ratkaisevaa luokkahuoneessani.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat - Pisteestä Pisteeseen Tehtävät ja Hienomotoriikka Harjoitukset',
        subtitle: 'Mukautettuja Materiaaleja Visuaalisen Hahmotuksen Tukemiseen',
        description: `Erityisopettajat käyttävät kuviojunaa visuaalisen hahmotuksen tukemiseen. Kuviontunnistus on haastava taito lapsille, joilla on oppimisen vaikeuksia. Selkeä visuaalinen muoto auttaa ymmärtämään abstraktia konseptia.

Yhdistä kuviojuna pisteestä pisteeseen tehtävät -harjoituksiin ja hienomotoriikka harjoitukset -aktiviteetteihin. Luo kokonaisvaltaisia oppimispaketteja, jotka tukevat useita kehitysalueita. Kuviojuna matematiikkaan. Pisteestä pisteeseen lukujen tunnistamiseen. Hienomotoriikka leikkaamis- ja liimaustehtäviin.

Eriytettävyys on keskeinen erityisopetuksessa. Luo hyvin yksinkertaisia AB-kuvioita vain kahdella kuvalla. Lisää suuria, selkeitä kuvia. Käytä voimakkaita värejä erottuvuuteen. Mukauta jokainen tehtävä lapsen tarpeisiin.

Visuaaliset tukimateriaalit auttavat lapsia, joilla on keskittymisen haasteita. Selkeä junamalli pitää tehtävän fokusoituna. Rajoitettu määrä elementtejä vähentää häiriötekijöitä. Luo tulostettavat tehtävät lapsille ilmainen, jotka tukevat keskittymistä.`,
        quote: 'Voin nopeasti mukauttaa tehtäviä jokaisen oppilaan tarpeisiin.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät - Myy Matematiikka Tehtävät Alakoulu ja Värityskuvia Lapsille Tulostettava',
        subtitle: 'Kaupallinen Lisenssi Teachers Pay Teachers -myyntiin',
        description: `Opettajayrittäjät käyttävät kuviojunaa luomaan myytäviä tuotteita. Täysi Pääsy -tilaus sisältää kaupallisen print-on-demand -lisenssin. Myy luomasi tehtävämonisteet Teachers Pay Teachers -palvelussa, Etsyssä tai Amazon KDP:ssä.

Luo teemakohtaisia kuviojuna paketteja myytäväksi. Joulupaketti: lumihiutaleet, lahjat, piparkakut. Pääsiäispaketti: munat, puput, kukat. Halloween-paketti: kurpitsat, haamut, lepakot. Opettajat ostavat teemakohtaisia paketteja ympäri vuoden.

Yhdistä kuviojuna muihin tehtäviin kattaviksi paketeiksi. Myy "Talven Matematiikkapaketti" sisältäen kuviojuna tehtävämonisteitä, yhteenlasku tehtäviä ja värityskuvia lapsille tulostettava. Suuremmat paketit myyvät paremmin kuin yksittäiset tehtävät.

300 DPI -laatu on ammattimainen myyntiin. Opettajat odottavat korkealaatuisia tuotteita. Kuviojuna täyttää laatustandardit. PDF-muoto on vakio Teachers Pay Teachers -palvelussa. Lataa ja myy välittömästi. Opettajayrittäjät tienaavat 500-5000 dollaria kuukaudessa myymällä tehtävämonisteitä.`,
        quote: 'Tilaukseni maksoi itsensä takaisin ensimmäisessä kuussa!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from Finnish kuviojuna.md
  faq: {
    sectionTitle: 'Usein Kysyttyjä Kysymyksiä Tulostettavat Tehtävät Lapsille Ilmainen - Matematiikka Tehtävät Alakoulu ja Esiopetus',
    sectionDescription: 'Opettajat kysyvät samoja kysymyksiä kuviojuna tehtävämonisteiden luojasta. Tässä osiossa vastataan 12 yleisimpään kysymykseen. Vastaukset perustuvat todellisiin opettajien kokemuksiin. Kaikki tulostettavat tehtävät lapsille ilmainen ja matematiikka tehtävät alakoulu -vastaukset täällä.',
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
        question: 'Onko Tämä Kuviojuna Tehtävämonisteen Luoja Todella Ilmainen - Yhteenlasku ja Vähennyslasku Tehtävät?',
        answer: 'Kuviojuna tehtävämonisteen luoja vaatii Täysi Pääsy -tilauksen, joka maksaa 240 dollaria vuodessa tai 25 dollaria kuukaudessa. Tilauksesi antaa sinulle rajattoman kuviojuna tehtävien luomisen ilman tehtäväkohtaisia maksuja. Luo niin monta yhteenlasku ja vähennyslasku tehtävät -tehtävää kuin tarvitset ilman lisämaksuja. Täysi Pääsy sisältää kaikki 33 tehtävämonisteen luojaa yhteen hintaan. Luo kuviojuna tehtävämonisteitä, matematiikan tehtäviä, lukemisen tehtäviä ja paljon muuta. Rajaton luominen kaikilla työkaluilla. Ei piilomaksuja, ei ylimääräisiä kuluja.',
      },
      {
        id: '2',
        question: 'Voinko Tulostaa Kuviojuna Tehtävämonisteet Kotona Tavallisella Tulostimella - Kirjaimet Harjoittelu Esikoulu?',
        answer: 'Kyllä. Täysi Pääsy -tilaus sisältää rajattoman luokkahuoneen käytön. Tulosta niin monta kuviojuna tehtävää kuin tarvitset. Kotitulostin toimii täydellisesti 300 DPI -laadulle. A4- ja Letter-koot sopivat kaikille tavallisille tulostimille. Lataa PDF- tai JPEG-muodossa. PDF säilyttää tekstin ja vektorit terävänä. JPEG on pienempi tiedostokoko nopeampaa tulostusta varten. Molemmat muodot tulostavat ammattimaisesti kotitulostimella tai koulukopiokoneella. Yhdistä kuviojuna kirjaimet harjoittelu esikoulu -tehtäviin.',
      },
      {
        id: '3',
        question: 'Tarvitsenko Suunnittelutaitoja Luodakseni Kuviojuna Tehtävämonisteet - Pisteestä Pisteeseen Tehtävät?',
        answer: 'Ei. Kuviojuna on suunniteltu opettajille, ei graafikoille. Ei tarvita suunnittelutaitoja tai teknistä osaamista. Klikkaa, valitse ja luo. Jokainen tehtävämoniste luodaan kolmessa minuutissa. Valitse kuviotyppi pudotusvalikosta. Valitse kuvat kirjastosta tai lataa omia. Klikkaa Luo. Järjestelmä luo ammattimaisen tehtävämonisteen automaattisesti. Ei ulkoasun suunnittelua, ei taitojen oppimista. Yhdistä pisteestä pisteeseen tehtävät -harjoituksiin samalla helppoudella.',
      },
      {
        id: '4',
        question: 'Voinko Käyttää Kuviojuna Tehtävämonisteet Luokassani Oppilaille - Kertotaulut Tulostettava?',
        answer: 'Kyllä. Täysi Pääsy -tilaus sisältää rajattoman luokkahuoneen käytön. Tulosta tehtävämonisteet kaikille oppilaille. Käytä kuviojuna tehtäviä päivittäisessä matematiikan opetuksessa. Ei rajoituksia oppilaiden määrään tai käyttökertaan. Luo viikoittaisia tehtäväpaketteja luokallesi. Yhdistä kertotaulut tulostettava -tehtäviin viikottaisiin paketteihin. Jaa tehtävämonisteet digitaalisesti Google Classroomissa. Tai tulosta ja jaa paperiversioina. Molemmat tavat ovat sallittuja tilauksellasi.',
      },
      {
        id: '5',
        question: 'Millä Kielillä Kuviojuna Tehtävämonisteet Ovat Saatavilla - Esiopetus Materiaali Ilmainen?',
        answer: 'Kuviojuna käyttöliittymä toimii 11 kielellä: suomi, englanti, saksa, ranska, espanja, portugali (Brasilian), italia, hollanti, ruotsi, tanska ja norja. Vaihda kieli pudotusvalikosta. Kaikki painikkeet ja ohjeet muuttuvat välittömästi. Luo esiopetus materiaali ilmainen missä tahansa näistä 11 kielestä. Täydellinen kielikylpyopettajille ja kaksikielisille luokkahuoneille. Monikielinen tuki on sisällytetty Täysi Pääsy -tilaukseen. Ei lisämaksuja per kieli.',
      },
      {
        id: '6',
        question: 'Voinko Myydä Luomani Kuviojuna Tehtävämonisteet - Värityskuvia Lapsille Tulostettava?',
        answer: 'Kyllä. Täysi Pääsy -tilaus sisältää täydellisen kaupallisen print-on-demand -lisenssin ilman lisäkustannuksia. Myy luomasi kuviojuna tehtävämonisteet Teachers Pay Teachers -palvelussa, Etsyssä ja Amazon KDP:ssä. Ei attribuutiovaatimusta. Myy omalla tuotemerkillä. Luo teemakohtaisia paketteja myytäväksi. Yhdistä kuviojuna tehtävämonisteitä värityskuvia lapsille tulostettava -tehtäviin. 300 DPI -laatu on ammattimainen myyntiin. Ei rojalteja, ei lisämaksuja. Myy rajattomasti.',
      },
      {
        id: '7',
        question: 'Kuinka Mukautun Kuviojuna Tehtävämonisteet Oppilailleni - Hienomotoriikka Harjoitukset?',
        answer: 'Kaikki elementit kankaalla ovat täysin muokattavissa. Klikkaa mitä tahansa kohdetta valitaksesi sen. Vedä siirtääksesi. Vedä nurkista skaalataksesi. Vedä kierrä-kuvakkeesta kierrättääksesi. Täysi hallinta jokaiseen elementtiin. Lisää personoitua tekstiä mihin tahansa kohtaan. Kirjoita oppilaan nimi, luokan nimi tai erikoisohjeet. Muuta taustoja ja reunuksia teemojen mukaan. Yhdistä hienomotoriikka harjoitukset -elementtejä leikkaus- ja väritystehtäviin.',
      },
      {
        id: '8',
        question: 'Mille Ikäryhmille Nämä Kuviojuna Tehtävämonisteet Sopivat Parhaiten - Lukemaan Oppiminen Tehtävät?',
        answer: 'Kuviojuna tehtävämonisteet sopivat 4-9-vuotiaille lapsille. Esiopetus (4-6 vuotta) käyttää yksinkertaisia AB- ja AAB-kuvioita. Alakoulun 1-3. luokat (6-9 vuotta) käyttävät monimutkaisempia ABC-, ABB- ja AABB-kuvioita. AB-kuvio on yksinkertaisin, täydellinen aloittaville esikoululaisille. AABB on vaikein, parhaiten 3. luokkalaisille. Valitse kuviotyppi oppilaittesi kehitystason mukaan. Yhdistä kuviojuna lukemaan oppiminen tehtävät -harjoituksiin integroidulle oppimiselle.',
      },
      {
        id: '9',
        question: 'Voinko Ladata Omia Kuvia Kuviojuna Tehtävämonistiin - Kirjaimet Harjoittelu Esikoulu?',
        answer: 'Kyllä. Kuviojuna tukee monilatkausta. Klikkaa Lataa Omia Kuvia -painiketta. Valitse useita kuvia kerralla tietokoneeltasi. Lataa JPEG, PNG tai GIF -tiedostoja. Ei tiedostokokorajoituksia järkevissä rajoissa. Yhdistä lataamasi kuvat 3000+ kuvan kirjastoon. Käytä omia kuvia A-kuviona ja kirjaston kuvia B-kuviona. Luo täysin personoituja tehtävämonisteitä. Yhdistä kirjaimet harjoittelu esikoulu -kuviin omiin kuvahaastioihisi.',
      },
      {
        id: '10',
        question: 'Kuinka Kauan Kestää Luoda Kuviojuna Tehtävämoniste - Pisteestä Pisteeseen Tehtävät?',
        answer: 'Kuviojuna tehtävämonisteen luominen kestää 2-3 minuuttia alusta loppuun. Valitse kuviotyppi ja vihjeiden määrä (30 sekuntia). Valitse kuvat kirjastosta tai lataa omia (1-2 minuuttia). Klikkaa Luo ja lataa (30 sekuntia). Yhteensä alle 3 minuuttia. Perinteinen luominen Word-tiedostolla tai PowerPointilla kestää 30-60 minuuttia. Kuviojuna tekee kaiken automaattisesti. Yhdistä pisteestä pisteeseen tehtävät samalla nopeudella.',
      },
      {
        id: '11',
        question: 'Sisältävätkö Kuviojuna Tehtävämonisteet Vastausavaimet - Yhteenlasku ja Vähennyslasku Tehtävät?',
        answer: 'Kyllä. Kuviojuna luo automaattisesti sekä tehtävämonisteen että vastausavaimen. Tehtävämoniste sisältää esimerkkejä ja tyhjiä ruutuja oppilaiden täytettäväksi. Vastausavain näyttää kaikki ruudut täytettyinä oikealla vastauksella. Vaihda tehtävämonisteen ja vastausavaimen välillä välilehdillä. Muokkaa molempia versiota erikseen. Lataa molemmat PDF- tai JPEG-muodossa. Tulosta tehtävämoniste oppilaille ja vastausavain itsellesi. Yhdistä yhteenlasku ja vähennyslasku tehtävät vastausavaimiin.',
      },
      {
        id: '12',
        question: 'Voinko Luoda Kuviojuna Tehtävämonisteitä Tietyistä Kouluaineista - Kertotaulut Tulostettava?',
        answer: 'Kyllä. Käytä kuvakirjaston teemavalikkoa aihekohtaisiin kuvioihin. Matematiikka: käytä numeroita, muotoja ja laskutoimitusmerkkejä kuvioina. Tiede: käytä eläimiä, kasveja ja luonnonilmiöitä. Historia: käytä kulttuurikohteita ja symboleja. Kirjallisuus: käytä kirjaimia, sanoja ja välimerkkejä kuvioina. Yhdistä kuviojuna muihin matematiikan tehtäviin. Luo paketti, joka sisältää kuviojuna tehtävämonisteitä, kertotaulut tulostettava -tehtäviä ja geometrian harjoituksia.',
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
    sectionDescription: 'Täysi Pääsy sisältää 33 ilmaista työkalua. Yhdistä kuviojuna tehtävät muihin generaattoreihin täydellisiin oppimispaketteihin. Luo viikon tehtäväpaketti kaikilla työkaluilla. Luo teemakohtaisia paketteja jotka yhdistävät useita taitoja.',
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
        slug: 'find-and-count',
        name: 'Etsi ja Laske',
        category: 'Matematiikka',
        icon: '🔢',
        description: 'Yhdistä visuaalinen etsintä laskentaharjoitteluun täydelliseen peruslaskuoperaatioiden hallintaan.',
      },
      {
        id: '2',
        slug: 'coloring',
        name: 'Värityskuvat',
        category: 'Luovuus',
        icon: '🎨',
        description: 'Palkitse valmiit kuviojuna tehtävät teemaattisilla värityskuvilla, jotka kehittävät hienomotoriikkaa.',
      },
      {
        id: '3',
        slug: 'pattern-worksheet',
        name: 'Kuviotyöarkki',
        category: 'Kuviot',
        icon: '🔷',
        description: 'Jatka kuviontunnistuksen harjoittelua perinteisemmillä kuviotyöarkeilla ilman junateemaa.',
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
        description: 'Täydennä kuviojuna tehtäviä luokitteluharjoituksilla loogisen ajattelun kehittämiseksi.',
      },
    ],
  },
};

export default patternTrainFiContent;
