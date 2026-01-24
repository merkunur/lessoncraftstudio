import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Coloring Worksheets - Finnish Content (Värityskuvat)
 *
 * File: frontend/content/product-pages/fi/varityskuvat-tyoarkit.ts
 * URL: /fi/apps/varityskuvat-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/coloring.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const coloringFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'varityskuvat-tyoarkit',
    appId: 'coloring',
    title: 'Värityskuvia Lapsille Tulostettava | Tulostettavat Tehtävät Lapsille Ilmainen - Esiopetus Materiaali',
    description: 'Luo ammattimaisia värityskuvia värityskuvasuunnittelullamme. Peruspaketti-tilauksesi antaa sinulle rajattoman värityskuvien luomisen ilman per-sivu maksuja. Luo mukautettuja tulostettavia värityskuvia täydellisiä esikoululle ja alakoululle.',
    keywords: 'värityskuvia lapsille tulostettava, tulostettavat tehtävät lapsille ilmainen, esiopetus materiaali ilmainen, hienomotoriikka harjoitukset, kirjaimet harjoittelu esikoulu, värityskuvat lapsille',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/varityskuvat-tyoarkit',
  },

  // Hero Section - FULL text from Finnish coloring.md
  hero: {
    title: 'Värityskuvia Lapsille Tulostettava',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen - Esiopetus Materiaali',
    description: `Luo ammattimaisia värityskuvia värityskuvasuunnittelullamme. Peruspaketti-tilauksesi antaa sinulle rajattoman värityskuvien luomisen ilman per-sivu maksuja. Luo mukautettuja tulostettavia värityskuvia täydellisiä esikoululle ja alakoululle. Lataa korkealaatuisia PDF-värityskuvia alle 3 minuutissa.

Peruspaketti-tilaus sisältää 10 suosittua tehtävägeneraattoria. Luo värityskuvia lapsille tulostettava, hienomotoriikka harjoitukset ja matematiikka tehtävät alakoulu samalla tilauksella. Suunnittelutyökalu tukee 11 kieltä ja sisältää kaupallisen lisenssin. Täydellinen esiopetukselle ja alakoulun opettajille.

Värityskuvasuunnittelija yhdistää helppokäyttöisyyden ammattimaisen laadun kanssa. Valitse teema tai yksittäiset kuvat yli 3000 lapsystävällisen kuvan kirjastosta. Lisää tekstiä, piirrä vapaalla kädellä tai lataa omia kuvia. Muokkaa kaikkea pohjalla vetämällä, kiertämällä ja skaalaamalla. Lataa tulostettavat tehtävät lapsille ilmainen tilauksen kautta ilman lisämaksuja per sivu.

Jokainen värityskuva vie sekunteja luoda. Ei suunnittelutaitoja tarvita. Ei monimutkaisia työkaluja opittavaksi. Vain kolme klikkausta täydellisiin värityskuviin esiopetukseen. Säästä tunteja viikoittain ammattimaisilla esiopetus materiaali ilmainen tulostettavilla tehtävillä jotka herättävät oppilaiden mielenkiinnon.`,
    previewImageSrc: '/samples/english/coloring/coloring portrait 1.png',
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

  // Sample Gallery - REAL file paths from samples/english/coloring/
  samples: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Ilmaiset Työarkit ja Ilmaiset Tulosteet',
    sectionDescription: 'Lataa ilmaiset tulosteet - Ilmainen työarkki lapsille ammattimaista laatua. Ilmaiset työarkit ja työarkki lapsille täydellinen työarkki esiopetukseen. Ilmainen työarkki lapsille ja työarkki lapsille sisältää ilmaiset tulosteet ja ilmaiset työarkit opetusmateriaalin. Ilmainen työarkki ja työarkki esiopetukseen saatavilla',
    downloadLabel: 'Lataa Ilmainen Esimerkki',
    worksheetLabel: 'Värityskuva',
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
        worksheetSrc: '/samples/english/coloring/coloring portrait 1.png',
        answerKeySrc: '',
        altText: 'Värityskuva lapsille pystysuuntainen tulostettava tehtävä esiopetukseen',
        pdfDownloadUrl: '',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/coloring/coloring portrait 2.png',
        answerKeySrc: '',
        altText: 'Värityskuva lapsille pystysuuntainen tulostettava tehtävä alakoululaisille',
        pdfDownloadUrl: '',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/coloring/coloring portrait 3.png',
        answerKeySrc: '',
        altText: 'Värityskuva lapsille hienomotoriikka harjoitus pystysuuntainen',
        pdfDownloadUrl: '',
      },
      {
        id: '4',
        worksheetSrc: '/samples/english/coloring/coloring landscape 1.png',
        answerKeySrc: '',
        altText: 'Värityskuva lapsille vaakasuuntainen tulostettava esiopetus materiaali',
        pdfDownloadUrl: '',
      },
      {
        id: '5',
        worksheetSrc: '/samples/english/coloring/coloring landscape 2.png',
        answerKeySrc: '',
        altText: 'Värityskuva lapsille vaakasuuntainen hienomotoriikka harjoitus',
        pdfDownloadUrl: '',
      },
      {
        id: '6',
        worksheetSrc: '/samples/english/coloring/coloring landscape 3.png',
        answerKeySrc: '',
        altText: 'Värityskuva lapsille vaakasuuntainen tulostettava tehtävä',
        pdfDownloadUrl: '',
      },
    ],
  },

  // Features Grid - FULL text from Finnish coloring.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Värityskuvasuunnittelijamme yhdistää tehokkaan toiminnallisuuden yksinkertaiseen käyttöön. Luo esiopetus materiaali ilmainen, hienomotoriikka harjoitukset ja värityskuvia lapsille tulostettava samalla työkalulla. Jokainen ominaisuus on suunniteltu säästämään aikaa ja tuottamaan ammattimaisia tuloksia. Ei vaadi teknistä osaamista tai suunnittelukokemusta.',
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
        title: 'Luo Värityskuvia Kolmella Klikkauksella',
        description: `Aloita luomalla ammattimaisia värityskuvia alle kolmessa klikkauksessa. Valitse teema kuvakirjastostamme jossa on yli 3000 lapsystävällistä kuvaa. Klikkaa Luo ja värityskuvasi ilmestyy välittömästi. Ei odottelua, ei monimutkaisia vaiheita, ei hämmennystä.

Teemavalinta tekee tulostettavat tehtävät lapsille ilmainen luomisesta nopeaa. Valitse Eläimet, Ajoneuvot, Ruoka tai mikä tahansa 50 teemasta. Jokainen teema sisältää aiheeseen sopivia kuvia. Täydellinen esiopetukselle ja alakoulun 1-3 luokille. Luo hienomotoriikka harjoitukset jotka sopivat oppituntisuunnitelmaasi.

Vaihtoehtoisesti selaa yksittäisiä kuvia kirjaimellisesti katsottuna. Etsi tiettyä kuvaa hakutoiminnolla. Valitse tarkalleen oikeat kuvat värityskuvia lapsille tulostettava tehtäviisi. Yhdistä useita kuvia yhdelle sivulle. Luo temaattisia tehtäviä jotka vastaavat opetussuunnitelmaasi.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Muokkaa Kaikkea Pohjalla',
        description: `Jokainen elementti pohjalla on täysin muokattavissa. Vedä kuvia uusiin sijainteihin. Kierrä mitä tahansa elementtiä täydelliseen asentoon. Skaalaa kuvia suuremmiksi tai pienemmiksi. Poista elementit joita et tarvitse yhdellä klikkauksella.

Pohjamuokkaus toimii intuitiivisesti hiirellä tai kosketusnäytöllä. Klikkaa mitä tahansa kuvaa valitaksesi sen. Vedä kulmat koon muuttamiseksi. Käytä kiertokahvaa oikean kulman löytämiseen. Järjestä tasoja tuomaan elementtejä eteen tai lähettämään taakse.

Lisää tekstielementtejä tulostettavat tehtävät lapsille ilmainen tehtäviisi. Muuta fonttia, kokoa ja väriä. Lisää ohjeita, kysymyksiä tai oppilaiden nimiä. Valitse seitsemästä lapsystävällisestä fontista. Säädä tekstin läpinäkyvyyttä luoviin efekteihin.

Piirtotyökalut antavat sinun lisätä vapaakätisiä elementtejä. Piirrä nuolia, ympyröitä tai mukautettuja muotoja. Säädä siveltimen kokoa ja väriä. Täydellinen lisäämään korostuksia esiopetus materiaali ilmainen tehtäviin. Yhdistä piirretyt elementit kirjastokuviin luoviin värityskuviin.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Lataa Omia Kuvia',
        description: `Lataa omia kuvia suoraan värityskuvasuunnittelijaan. Tukee JPEG, PNG ja GIF formaatteja. Lataa useita kuvia kerralla. Yhdistä omat kuvasi kirjastokuviimme samoilla värityskuvia lapsille tulostettava tehtävillä.

Lataa oppilaittesi valokuvia personoituihin tehtäviin. Lisää luokkahuoneen lemmikkieläimen kuvia. Käytä kuvia kouluretkistä tai luokkahuoneen projekteista. Tee esiopetus materiaali ilmainen joka resonoi oppilaittesi kanssa. Personoidut värityskuvat lisäävät sitoutumista ja motivaatiota.

Omat kuvat säilyvät istunnossa käytettäväksi milloin tahansa. Klikkaa ladattua kuvaa lisätäksesi sen pohjalle. Vedä, kierrä ja skaalaa samalla tavalla kuin kirjastokuvia. Luo hienomotoriikka harjoitukset käyttäen kuvia jotka ovat merkityksellisiä oppilaillesi.

Kuvalataustoiminto toimii täydellisesti temaattisiin yksiköihin. Lataa perhosten kuvia tiedeyksikölle. Lisää historiallisia kuvia yhteiskuntatieteen tehtäviin. Yhdistä omat kuvasi värityskuviin luomaan kokonaisia oppipaketeja.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Kielen Tuki',
        description: `Käyttöliittymä tukee 11 kieltä täydelliseen monikieliseen käyttöön. Vaihda suomen, englannin, saksan, ranskan, espanjan, italian, portugalin, hollannin, tanskan, ruotsin tai norjan välillä. Jokainen käyttöliittymäelementti kääntyy välittömästi.

Kuvakirjaston kielituki on kriittinen monikielisille opettajille. Valitse kuvakirjaston kieli erikseen käyttöliittymän kielestä. Luo tulostettavat tehtävät lapsille ilmainen suomeksi aamulla ja englanniksi iltapäivällä. Täydellinen kaksikielisiin ohjelmiin ja kansainvälisiin kouluihin.

ESL-opettajat käyttävät monikielisyyttä päivittäin. Luo esiopetus materiaali ilmainen englanniksi äidinkielisille puhujille. Vaihda suomeen kotoperäiseen kieliohjelmaan. Opeta useita kieliä käyttäen samoja värityskuvia lapsille tulostettava työkaluja.

Monikielinen tuki laajentaa opetusmahdollisuuksia. Luo hienomotoriikka harjoitukset käyttäen sanastoa eri kielistä. Yhdistä kielenoppiminen motoristen taitojen kehitykseen. Anna oppilaiden harjoitella kirjaimia ja sanoja värittäessään.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kaupallinen Lisenssi Sisältyy',
        description: `Peruspaketti-tilaus sisältää täyden kaupallisen print-on-demand -lisenssin ilman lisämaksuja. Myy luomiasi värityskuvia lapsille tulostettava Etsyssä, Teachers Pay Teachersissa tai Amazon KDP:ssä. Ei tekijänoikeusmerkin mainintaa vaadittu. Täydellinen opettajayrittäjille.

Kaupallinen lisenssi kattaa kaikki luomasi värityskuvat. Myy yksittäisiä tehtäviä tai kokonaisia paketteja. Luo esiopetus materiaali ilmainen myytäväksi digitaalisena latauksena. Paketin matemaattiset työkirjat hienomotoriikka harjoitukset mukaan. Tuotetulot kuuluvat 100% sinulle.

300 DPI vientilaadussa varmistetaan ammattimaiset painetut tuotteet. Lataa tulostettavat tehtävät lapsille ilmainen JPEG- tai PDF-muodossa. Molemmat formaatit toimivat täydellisesti print-on-demand palveluissa. Asiakkaasi saavat terävän, ammattimaisen laadun värityskuvat.

Monet opettajat ansaitsevat 500-5000€ kuukaudessa myymällä värityskuvia. Aloita pienellä listaamalla muutamia tuotteita. Laajenna valikoimaa ajan myötä. Käytä Peruspaketti-tilausta luomaan rajattomasti myytäviä värityskuvia lapsille tulostettava ilman per-sivu maksuja.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Kuvakirjasto',
        description: `Pääset käsiksi yli 3000 lapsystävälliseen kuvaan sisältyy tilauksessasi. Kaikki kuvat on suunniteltu esi- ja alakoululaisille. Ei sopimattomia kuvia. Ei huolta lasten turvallisuudesta. Jokainen kuva on huolellisesti valittu kouluympäristöön.

Kuvat on järjestetty yli 50 teemaan helppoa selaamista varten. Valitse Eläimet-teema villieläin värityskuvia lapsille tulostettava varten. Selaa Ajoneuvot-teemaa liikenneaiheisiin tehtäviin. Käytä Ruoka-teemaa ravitsemusyksiköihin. Jokainen teema sisältää kymmeniä relevantteja kuvia.

Yksittäisten kuvien selaus antaa tarkan hallinnan. Kirjoita etsimäsi kuvan nimi hakukenttään. Selaa kaikkia kuvia aakkosellisesti. Klikkaa kuvaa lisätäksesi sen värityskuvaasi. Raahaa useita kuvia luodaksesi temaattisia tulostettavat tehtävät lapsille ilmainen tehtäviä.

Taustakuvat ja reunat sisältyvät ilman lisämaksuja. Valitse kymmenistä reunateemoista. Lisää värillisiä taustoja luomaan visuaalisesti houkuttelevia hienomotoriikka harjoitukset. Kaikki visuaaliset elementit sisältyvät Peruspaketti-tilauksessasi.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Ammattimainen 300 DPI Laatu',
        description: `Jokainen värityskuva vientiä 300 DPI resoluutiossa. Täydellinen kotitulostimilla tulostukseen. Täydellinen ammattimaisen painatuksen palveluihin. Terävät, selkeät viivat jotka lapset rakastavat värittää.

Lataa JPEG-muodossa nopeita tulostuksia varten. Lataa PDF-muodossa parhaaseen laatuun ja yhteensopivuuteen. Molemmat formaatit säilyttävät täyden 300 DPI resoluution. Valitse muoto tulostustarpeidesi perusteella.

Harmaasävyvaihtoehto säästää mustetta kotitulostuksessa. Aktivoi harmaasävy-valintaruutu ennen lataamista. Värityskuvat muuntuvat optimoiduiksi harmaasävyksi versioiksi. Säästä 60-80% musteen kustannuksissa säilyttäen täyden laadun.

Ammattimainen laatu tarkoittaa että esiopetus materiaali ilmainen tehtäväsi näyttävät kustantajan painamilta. Vanhemmat huomaavat eron. Rehtorit arvostavat ammattimaista ulkoasua. Oppilaasi saavat korkealaatuisia värityskuvia lapsille tulostettava jotka ovat ilon värittää.`,
        highlighted: true,
      },
      {
        id: '8',
        icon: '📝',
        title: 'Luokkahuoneen Aputoiminnot',
        description: `Lisää luokkahuoneen aputoimintoja tehokkaampaan käyttöön. Klikkaa Lisää "Nimi: ___" -painiketta lisätäksesi nimikenttä. Oppilaat voivat kirjoittaa nimensä värityskuvan yläreunaan. Täydellinen luokkahuoneen organisointiin ja arvioinnin seurantaan.

Reunavalinnat lisäävät ammattimaista ulkoasua. Klikkaa Reuna-pudotusvalikkoa nähdäksesi saatavilla olevia reunateemoja. Valitse teemaan sopiva reuna. Tähdet, sydämet, eläimet ja kasviaiheet ovat saatavilla. Reunat tekevät värityskuvia lapsille tulostettava näyttävän kustantajan painamilta.

Sivun värin valinta luo taustan värityskuvallesi. Valkoinen tausta on standardi värityskuville. Värilliset taustat lisäävät visuaalista kiinnostavuutta. Muuta taustaväriä luodaksesi temaattisia tulostettavat tehtävät lapsille ilmainen tehtäviä.

Sivun orientaatio vaikuttaa värityskuvan asetteluun. Portrait-orientaatio toimii hyvin pystysuuntaisille kuvajärjestelyille. Landscape-orientaatio antaa enemmän vaakasuuntaista tilaa. Valitse orientaatio perustuen sisällön asetteluusi.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from Finnish coloring.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Luo ammattimaisia värityskuvia alle 3 minuutissa. Jokainen vaihe on suunniteltu yksinkertaiseksi ja intuitiiviseksi. Ei vaadi teknistä osaamista tai suunnittelukokemusta. Seuraa näitä viittä vaihetta luodaksesi täydellisiä esiopetus materiaali ilmainen tehtäviä.',
    ctaText: 'Aloita Luominen Nyt',
    badgeText: 'Näin Se Toimii',
    stepLabel: 'Vaihe',
    completionTitle: 'Valmis!',
    completionSubtitle: 'Värityskuvasi on valmis',
    readyTime: 'Valmis alle 3 minuutissa',
    noSkillsNeeded: 'Ei suunnitteluosaamista tarvita',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Valitse Sisältösi',
        description: `Aloita valitsemalla sisältö värityskuvaasi. Kolme vaihtoehtoa antaa sinulle täydellisen joustavuuden. Valitse teema nopeaan luomiseen. Selaa yksittäisiä kuvia tarkkaan hallintaan. Lataa omia kuvia personointiin.

Teemavalinta on nopein tapa. Klikkaa Kuvakirjasto-osiota sivupaneelissa. Valitse pudotusvalikosta yli 50 teemasta. Eläimet, Ajoneuvot, Ruoka, Numeroita ja Kirjaimia-teemat toimivat täydellisesti. Jokainen teema sisältää kymmeniä relevantteja kuvia värityskuvia lapsille tulostettava luomiseen.

Yksittäisten kuvien selaus antaa tarkan hallinnan. Käytä hakukenttää löytääksesi tiettyjä kuvia. Kirjoita "omena" löytääksesi hedelmäkuvia. Kirjoita "auto" löytääksesi ajoneuvokuvia. Klikkaa kuvaa lisätäksesi sen pohjalle. Luo temaattisia tulostettavat tehtävät lapsille ilmainen tehtäviä jotka sopivat oppituntisuunnitelmaasi.

Lataa omia kuvia personoidaksesi värityskuvat oppilaillesi. Klikkaa Lataa Omia Kuvia -osiota. Valitse JPEG, PNG tai GIF tiedostot tietokoneeltasi. Lataa useita kuvia kerralla. Täydellinen lisäämään oppilaiden valokuvia, luokkahuoneen projektikuvia tai temaattisia kuvia yksiköistäsi.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetuksia',
        description: `Muokauta sivuasetuksia täydelliseen tulostuskokoon. Avaa Sivun Asetus -osio sivupaneelissa. Valitse Letter Portrait (8.5×11") amerikkalaisille tulostimille. Valitse A4 Portrait (210×297mm) eurooppalaisille tulostimille. Molemmat koot toimivat täydellisesti kotitulostimille.

Sivun orientaatio vaikuttaa värityskuvan asetteluun. Portrait-orientaatio toimii hyvin pystysuuntaisille kuvajärjestelyille. Landscape-orientaatio antaa enemmän vaakasuuntaista tilaa. Valitse orientaatio perustuen sisällön asetteluusi.

Sivun värin valinta luo taustan värityskuvallesi. Valkoinen tausta on standardi värityskuville. Värilliset taustat lisäävät visuaalista kiinnostavuutta. Muuta taustaväriä luodaksesi temaattisia tulostettavat tehtävät lapsille ilmainen tehtäviä.

Reunavalinnat lisäävät ammattimaista ulkoasua. Klikkaa Reuna-pudotusvalikkoa nähdäksesi saatavilla olevia reunateemoja. Valitse teemaan sopiva reuna. Tähdet, sydämet, eläimet ja kasviaiheet ovat saatavilla.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Luo Värityskuvasi',
        description: `Luominen tapahtuu välittömästi kun valitset sisällön. Ei erillistä Luo-painiketta klikattavaksi. Kuvat ilmestyvät pohjalle heti kun klikkaat niitä. Yksinkertainen työnkulku säästää aikaa ja vähentää hämmennystä.

Katso värityskuvasi muodostuvan reaaliajassa. Jokainen kuva jonka lisäät ilmestyy pohjalle. Järjestä kuvia vetämällä niihin sijainteihin. Skaalaa kuvia suuremmiksi tai pienemmiksi. Luo tasapainoinen asettelu joka näyttää ammattimaiselta.

Yhdistä useita kuvatyyppejä luoviin tehtäviin. Sekoita eläinkuvia numerokuvien kanssa matematiikka tehtävät alakoulu luomiseen. Lisää kirjainkuvia lukemaan oppiminen tehtävät kehittämiseen.

Esikatselu näyttää tarkalleen miltä tulostettu värityskuva näyttää. Ei yllätyksiä tulostuksen jälkeen. Mitä näet pohjalla on mitä saat tulostettavat tehtävät lapsille ilmainen PDF:ssäsi. Tarkista asettelu ennen lataamista.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Pohjalla',
        description: `Pohjamuokkaus antaa sinulle täydellisen hallinnan jokaisesta elementistä. Klikkaa mitä tahansa kuvaa valitaksesi sen. Vetokahvat ilmestyvät kulkiin. Vedä kahvoja koon muuttamiseen. Vedä kiertokahvaa kulman säätämiseen.

Järjestä elementit tarkasti vetämällä niitä uusiin sijainteihin. Aseta kuvat päällekkäin mielenkiintoisiin komposiitioihin. Käytä tasotoimintoja tuomaan elementtejä eteen tai lähettämään taakse. Luo syvyyttä ja mielenkiintoa järjestämällä elementtejä kerroksittain.

Lisää tekstielementtejä luodaksesi opetuksellisia tulostettavat tehtävät lapsille ilmainen tehtäviä. Kirjoita ohjeita tekstikenttään. Klikkaa Lisää Teksti. Teksti ilmestyy pohjalle. Vedä teksti oikeaan sijaintiin. Muuta fonttia, kokoa ja väriä vastaamaan värityskuvasi tyyliä.

Piirtotyökalut antavat sinun lisätä vapaakätisiä elementtejä. Klikkaa Piirtotyökalu-painiketta. Valitse siveltimen väri ja koko. Piirrä nuolia, ympyröitä tai mukautettuja muotoja.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta',
        description: `Lataa värityskuvasi kahdessa ammattimaisen laadun formaatissa. Klikkaa Lataa-pudotuspainiketta oikeassa yläkulmassa. Valitse Lataa JPEG:nä nopeisiin tulostuksiin. Valitse Lataa PDF:nä parhaaseen laatuun ja yhteensopivuuteen.

JPEG-muoto toimii täydellisesti suoraan tulostukseen. Avaa JPEG tietokoneellasi. Paina tulosta. Värityskuvasi tulostuu täydellä 300 DPI laadulla. Ei tarvetta PDF-lukijalle tai erikoisohjelmille.

PDF-muoto tarjoaa parhaan laadun ja yhteensopivuuden. PDF-tiedostot säilyttävät täydellisen tarkkuuden kaikilla laitteilla. Täydellinen jakamiseen muiden opettajien kanssa. Täydellinen lataamaan pilvitallennukseen. PDF on ammattimainen standardi tulostettavat tehtävät lapsille ilmainen jakamiseen.

Harmaasävyvaihtoehto säästää mustetta dramaattisesti. Aktivoi Harmaasävy-valintaruutu ennen lataamista. Värityskuvasi muuntuu optimoiduksi harmaasävyksi versioksi. Säästä 60-80% musteen kustannuksissa.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish coloring.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Värityskuvasuunnittelijamme palvelee erilaisia käyttäjiä eri koulutusolosuhteissa. Esiopetuksen opettajat, alakoulun opettajat, kotiopettajat ja erikoisopettajat kaikki hyötyvät. Jokainen käyttäjätyyppi löytää ainutlaatuisia tapoja integroida värityskuvia lapsille tulostettava opetukseensa.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Esiopetuksen Opettajat',
        subtitle: 'Hienomotoriikka Harjoitukset ja Kirjaimet Harjoittelu Esikoulu',
        description: `Esiopetuksen opettajat käyttävät värityskuvia päivittäin hienomotoriikan kehittämiseen. Kuuden vuoden ikäiset oppilaat harjoittelevat kynäotetta värittäessään. Jokainen väritystehtävä vahvistaa pienlihasten hallintaa. Täydellinen valmistautumiseen kirjoittamisen oppimiseen.

Yhdistä kirjaimet harjoittelu esikoulu väritystehtäviin luovaan oppimiseen. Luo värityskuvia joissa on isoja kirjaimia oppilaat värittävät. Lisää kirjaintunnistuskysymyksiä jokaiseen tehtävään. Oppilaat oppivat aakkoset värittäessään hauskoja kuvia.

Esiopetus materiaali ilmainen luominen on nopeaa teemoilla. Valitse Eläimet-teema eläinaiheisiin värityskuviin. Lisää tekstiä "Mikä kirjain aloittaa KISSA?". Yhdistä värittäminen, kirjainten oppiminen ja hienomotoriikka harjoitukset yhdellä tehtävällä.

Esiopetuksessa lukemaan oppiminen tehtävät alkavat yksinkertaisilla sanoilla. Luo värityskuvia joissa on omenan kuva ja sana "OMENA". Oppilaat värittävät kuvan lukien sanan useita kertoja. Toista visuaalinen oppiminen vahvistaa lukutaitoa.`,
        quote: 'Oppilaani rakastavat värityskuvia osana päivittäistä rutiinia!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun Opettajat 1-3 Luokat',
        subtitle: 'Matematiikka Tehtävät Alakoulu ja Kertotaulut Tulostettava',
        description: `Alakoulun opettajat yhdistävät värityskuvat matemaattiseen oppimiseen. Ensimmäisen luokan opettajat lisäävät yksinkertaisia yhteenlasku ja vähennyslasku tehtävät värityskuviin. Oppilaat ratkaisevat matemaattiset ongelmat ennen värittämistä. Tekee matematiikasta hauskaa ja palkitsevaa.

Toisen luokan opettajat luovat monimutkaisempia matematiikka tehtävät alakoulu käyttäen värityskuvia. Lisää kaksinumeroisia yhteenlaskuja ja vähennyslaskuja. Luo "Väritä vastauksen mukaan" -tehtäviä. Jos vastaus on 12, väritä punainen. Jos vastaus on 15, väritä sininen.

Kolmannen luokan opettajat keskittyvät kertotauluihin. Luo kertotaulut tulostettava yhdistettynä värityskuviin. Lisää kertolaskutehtäviä jokaiseen värityskuvan osaan. Oppilaat harjoittelevat kertotauluja värittäessään.

Matematiikka tehtävät alakoulu tehostuvat visuaalisella palkinnolla. Oppilaat ratkaisevat ongelmat nähdäkseen mitä väritetään. Motivaatio pysyy korkeana. Opettajat raportoivat paremmasta sitoutumisesta verrattuna pelkkiin työarkkeihin.`,
        quote: 'Väritä vastauksen mukaan -tehtävät ovat luokkani suosikkeja.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajavanhemmat',
        subtitle: 'Esiopetus Materiaali Ilmainen Kaikille Ikätasoille',
        description: `Kotiopettajavanhemmat tarvitsevat esiopetus materiaali ilmainen monille ikätasoille samanaikaisesti. Luo värityskuvia lapsille tulostettava esikoululaisille aamulla. Luo matematiikka tehtävät alakoulu vanhemmille lapsille iltapäivällä. Yksi työkalu palvelee kaikkia ikäryhmiä.

Kirjaimet harjoittelu esikoulu on keskeinen painopiste kotiopetuksessa. Luo personoituja värityskuvia lapsen nimellä. Lisää kirjaimia joita lapsi harjoittelee. Yhdistä perheen valokuvia kirjainoppimiseen. Personoitu lähestymistapa lisää motivaatiota.

Kotiopettajat arvostavat joustavuutta. Luo hienomotoriikka harjoitukset aamulla. Luo kertotaulut tulostettava iltapäivällä. Vaihtele yhteenlasku ja vähennyslasku tehtävät päivittäin. Ei kahta samanlaista päivää.

Pisteestä pisteeseen tehtävät toimivat täydellisesti itsenäiseen työhön. Vanhemmat antavat nuoremmille lapsille väritystehtäviä. Työskentele vanhempien lasten kanssa monimutkaisissa aiheissa. Kaikki oppilaat pysyvät sitoutuneina omantasoisiin tehtäviin.`,
        quote: 'Yksi työkalu kattaa kaikkien lasteni ikätasot.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Suomen Kielen Opettajat',
        subtitle: 'Lukemaan Oppiminen Tehtävät ja Kirjaimet Harjoittelu Esikoulu',
        description: `Suomen kielen opettajat käyttävät värityskuvia sanastoharjoitteluun. Luo värityskuvia temaattisella sanastolla. Eläinteemat opettavat eläinten nimiä. Ruokateemat opettavat ruokasanoja. Visuaalinen oppiminen vahvistaa sanaston säilyttämistä.

Kirjaimet harjoittelu esikoulu on keskeistä suomen kielen luokissa. Luo värityskuvia joissa korostetaan yhtä kirjainta per sivu. Lisää useita sanoja jotka alkavat kyseisellä kirjaimella. Oppilaat värittävät kuvat toistaen kirjaimen äänen.

Lukemaan oppiminen tehtävät kehittyvät yksinkertaisista sanoista lauseisiin. Luo värityskuvia lyhyillä lauseilla. "KISSA ON PUUSSA." Oppilaat lukevat lauseen, värittävät kuvan, kirjoittavat lauseen uudelleen. Moniaistillinen lähestymistapa parantaa lukutaitoa.

Tavutusharjoittelu on ainutlaatuista suomessa. Luo värityskuvia sanoilla jotka on jaettu tavuihin. "O-PE-TTA-JA" kirjoitettuna erikseen. Oppilaat värittävät kuvan harjoitellen tavutusta ääneen.`,
        quote: 'Visuaalinen oppiminen auttaa oppilaita muistamaan sanoja.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erikoisopettajat',
        subtitle: 'Hienomotoriikka Harjoitukset ja Yksilölliset Esiopetus Materiaali Ilmainen',
        description: `Erikoisopettajat luovat yksilöllisiä hienomotoriikka harjoitukset jokaiselle oppilaalle. Säädä vaikeustasoa muuttamalla kuvien kokoa ja monimutkaisuutta. Isot yksinkertaiset kuvat aloittelijoille. Pienemmät monimutkaisemmat kuvat edistyneemmille oppilaille.

Luo esiopetus materiaali ilmainen joka vastaa yksilöllisiä oppimisen tavoitteita. Oppilas harjoittelee kirjaimet harjoittelu esikoulu? Luo henkilökohtaisia kirjainvärityskuvia. Oppilas tarvitsee matematiikka tehtävät alakoulu? Lisää laskuongelmia sopivalla tasolla.

Pisteestä pisteeseen tehtävät auttavat oppilaita jotka kamppailevat hienomotorisen hallinnan kanssa. Aloita isoilla numeroituilla pisteillä lähellä toisiaan. Edisty vähitellen pienempiin pisteisiin kauempana toisistaan. Säädettävä vaikeustaso vastaa yksilöllisiin tarpeisiin.

Yhteenlasku ja vähennyslasku tehtävät mukautuvat yksilöllisille tasoille. Luo tehtäviä numeroilla 1-5 aloittelijoille. Edisty numeroihin 1-20 oppilaan parantuessa. Visuaalinen palkinto värittämisestä pitää motivaation korkeana.`,
        quote: 'Voin nopeasti mukauttaa tehtäviä jokaisen oppilaan tarpeisiin.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy Tulostettavat Tehtävät Lapsille Teachers Pay Teachersissa',
        description: `Opettajayrittäjät luovat tuotteita myytäväksi Teachers Pay Teachersissa ja Etsyssä. Luo värityskuvia lapsille tulostettava paketteja temaattisille yksiköille. Myy 20-sivuisia värityspaketteja digitaalisina latauksina. Kaupallinen lisenssi sisältyy Peruspaketti-tilaukseen.

Luo erikoistuneita matematiikka tehtävät alakoulu paketteja. Paketin yhteenlasku ja vähennyslasku tehtävät yhdessä asiakirjassa. Lisää kertotaulut tulostettava paketit 2-12 kertotauluille. Opettajat etsivät valmiita matemaattisia resursseja.

Kirjaimet harjoittelu esikoulu paketit myyvät erityisen hyvin. Luo 26-sivuinen paketti yksi kirjain per sivu. Lisää lukemaan oppiminen tehtävät samaan pakettiin. Yhdistä hienomotoriikka harjoitukset lukutaidon kehitykseen kokonaisessa oppipaketissa.

Kausittaiset teemapaketit tuottavat huippumyyntiä. Luo esiopetus materiaali ilmainen paketteja jokaiselle lomakaudelle. Joulu, pääsiäinen, kesä ja takaisin kouluun -teemat. Monet opettajat ansaitsevat 500-5000€ kuukaudessa.`,
        quote: 'Tilaukseni maksoi itsensä takaisin ensimmäisessä kuussa!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from Finnish coloring.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'Yleisimmät kysymykset värityskuvasuunnittelijasta ja tulostettavista tehtävistä.',
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
        question: 'Onko Tämä Värityskuvia Lapsille Tulostettava Suunnittelija Todella Ilmainen Käyttää?',
        answer: 'Värityskuvasuunnittelija vaatii Peruspaketti-tilauksen joka maksaa 144€ vuosittain tai 15€ kuukausittain. Tilauksesi antaa sinulle rajattoman värityskuvien luomisen ilman per-sivu maksuja. Luo niin monta tulostettavat tehtävät lapsille ilmainen värityskuvaa kuin tarvitset ilman lisämaksuja. Peruspaketti sisältää 10 suosittua tehtävägeneraattoria. Full Access -tilaus maksaa 240€ vuosittain ja sisältää kaikki 33 tehtävägeneraattorityyppiä.',
      },
      {
        id: '2',
        question: 'Voinko Tulostaa Värityskuvia Lapsille Tulostettava Kotona Tavallisella Tulostimella?',
        answer: 'Kyllä. Jokainen värityskuva latautuu 300 DPI resoluutiossa täydelliseen kotitulostukseen. Lataa JPEG- tai PDF-muodossa. Avaa tiedosto tietokoneellasi. Tulosta tavallisella mustesuihku- tai lasertulostimella. Tulokset näyttävät ammattimaisesti painetulta. Harmaasävyvaihtoehto säästää mustetta dramaattisesti. Aktivoi harmaasävy ennen lataamista ja säästä 60-80% musteen kustannuksissa.',
      },
      {
        id: '3',
        question: 'Tarvitsenko Suunnittelutaitoja Luodakseni Värityskuvia Lapsille Tulostettava?',
        answer: 'Ei. Ei suunnittelutaitoja vaadittu. Ei grafiikkasuunnittelukokemusta tarvittu. Värityskuvasuunnittelija on rakennettu opettajille jotka eivät ole suunnittelijoita. Kolme klikkausta luomaan ammattimaisia värityskuvia. Valitse teema tai yksittäiset kuvat. Klikkaa muutamia kuvia. Lataa värityskuvasi. Koko prosessi vie alle 3 minuuttia.',
      },
      {
        id: '4',
        question: 'Voinko Käyttää Värityskuvia Lapsille Tulostettava Luokassani Oppilaille?',
        answer: 'Peruspaketti-tilaus sisältää rajattoman luokkahuonekäytön. Tulosta niin monta kopiota kuin tarvitset luokallesi. Jaa värityskuvia kaikille oppilaillesi. Ei rajoituksia oppilaiden määrässä. Ei lisämaksuja massakopioimisesta. Luo esiopetus materiaali ilmainen koko luokallesi. Tulosta 5 kopiota tai 50 kopiota. Jokainen tuloste maksaa vain paperin ja musteen.',
      },
      {
        id: '5',
        question: 'Millä Kielillä Värityskuvia Lapsille Tulostettava On Saatavilla?',
        answer: 'Käyttöliittymä tukee 11 kieltä: suomi, englanti, saksa, ranska, espanja, italia, portugali, hollanti, tanska, ruotsi ja norja. Vaihda kieliä välittömästi pudotusvalikosta. Jokainen käyttöliittymäelementti kääntyy valittuun kieleen. Kuvakirjasto tukee samoja 11 kieltä. Täydellinen ESL-opettajille, kaksikielisille ohjelmille ja kansainvälisille kouluille.',
      },
      {
        id: '6',
        question: 'Voinko Myydä Värityskuvia Lapsille Tulostettava Joita Luon Tällä Suunnittelijalla?',
        answer: 'Kyllä. Peruspaketti-tilaus sisältää täyden kaupallisen print-on-demand -lisenssin ilman lisämaksuja. Myy luomiasi värityskuvia Etsyssä, Teachers Pay Teachersissa tai Amazon KDP:ssä. Ei tekijänoikeusmerkintää vaadittu. Kaikki tulot ovat sinun. Monet opettajat ansaitsevat 500-5000€ kuukaudessa myymällä värityskuvia digitaalisina latauksina.',
      },
      {
        id: '7',
        question: 'Kuinka Mukautetaan Värityskuvia Lapsille Tulostettava Oppilailleni?',
        answer: 'Täysi pohjamuokkaus antaa rajattomia mukautusmahdollisuuksia. Vedä kuvia uusiin sijainteihin. Kierrä elementtejä täydelliseen asentoon. Skaalaa kuvia suuremmiksi tai pienemmiksi. Poista elementit joita et tarvitse. Lisää tekstielementtejä henkilökohtaisiin ohjeisiin. Kirjoita oppilaiden nimiä. Lataa omia kuvia täydelliseen personointiin.',
      },
      {
        id: '8',
        question: 'Mille Ikäryhmille Värityskuvia Lapsille Tulostettava Toimii Parhaiten?',
        answer: 'Värityskuvat toimivat täydellisesti esikoululaisille (6-vuotiaille). Hienomotoriikka harjoitukset kehittävät kynäotetta kirjoittamiseen valmistautumiseen. Kirjaimet harjoittelu esikoulu opettaa aakkosellista tunnistamista. Alakoulun 1-3 luokat hyötyvät valtavasti. Ensimmäisen luokan oppilaat harjoittelevat perusmatematiikkaa. Toisen luokan oppilaat työskentelevät yhteenlasku ja vähennyslasku tehtävät kanssa. Kolmannen luokan oppilaat harjoittelevat kertotauluja.',
      },
      {
        id: '9',
        question: 'Voinko Ladata Omia Kuvia Värityskuvia Lapsille Tulostettava Tehtäviin?',
        answer: 'Kyllä. Lataa rajattomasti omia kuvia suoraan suunnittelijaan. Tukee JPEG, PNG ja GIF formaatteja. Lataa useita kuvia kerralla. Yhdistä omat kuvasi kirjastokuviimme samoilla värityskuvia lapsille tulostettava tehtävillä. Lataa oppilaittesi valokuvia personoituihin tehtäviin. Lisää luokkahuoneen lemmikkieläimen kuvia. Personoidut värityskuvat lisäävät sitoutumista ja motivaatiota dramaattisesti.',
      },
      {
        id: '10',
        question: 'Kauanko Vie Luoda Värityskuvia Lapsille Tulostettava?',
        answer: 'Alle 3 minuuttia per värityskuva. Valitse teema tai yksittäiset kuvat (30 sekuntia). Järjestä elementit pohjalla (60 sekuntia). Lisää tekstiä tai mukautuksia tarvittaessa (60 sekuntia). Lataa JPEG tai PDF (30 sekuntia). Yhteensä alle 3 minuuttia. Massaluominen on vielä nopeampaa. Luo kymmeniä tulostettavat tehtävät lapsille ilmainen värityskuvia tunnissa.',
      },
      {
        id: '11',
        question: 'Sisältyykö Värityskuvia Lapsille Tulostettava Vastausavaimia?',
        answer: 'Värityskuvat eivät yleensä vaadi vastausavaimia. Oppilaat värittävät vapaasti. Ei oikeita tai vääriä vastauksia. Painopiste on luovuudessa ja hienomotoriikka harjoitukset kehityksessä. Jos lisäät matematiikka tehtävät alakoulu värityskuviin, luo erillinen vastausavain. Tallenna yksi värityskuva tyhjänä oppilaiden käyttöön. Täytä toinen värityskuva oikeilla vastauksilla opettajan vastausavaimeksi.',
      },
      {
        id: '12',
        question: 'Voinko Luoda Värityskuvia Lapsille Tulostettava Tietyistä Kouluaineista?',
        answer: 'Kyllä. Yli 3000 kuvan kirjasto kattaa kaikki perusainealueet. Luo matematiikka tehtävät alakoulu numerokuvilla ja muotokuvilla. Luo lukemaan oppiminen tehtävät kirjainkuvilla ja sanastokuvilla. Luo tiedeaiheisia värityskuvia eläin- ja kasvikuvilla. Temaattinen järjestely tekee aihekohtaisen luomisen helpoksi. Yhdistä teemoja luodaksesi poikkitieteellisiä tulostettavat tehtävät lapsille ilmainen tehtäviä.',
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
      'Rajoittamaton värityskuvien luonti',
      'Kaupallinen lisenssi sisältyy',
      '11 kielen tuki',
      '3000+ teemaattista kuvaa',
      '300 DPI tulostuslaatu',
      '10 tehtävägeneraattoria sisältyy',
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä värityskuvat näihin täydentäviin generaattoreihin.',
    ctaTitle: 'Valmiina Luomaan Upeita Värityskuvia?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia värityskuvia. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
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
        description: 'Yhdistä värityskuvat yhteenlaskutehtäviin täydelliseen matematiikan oppimispakettiin.',
      },
      {
        id: '2',
        slug: 'alphabet-train',
        name: 'Aakkosjuna',
        category: 'Kieli',
        icon: '🚂',
        description: 'Opeta kirjaimia hauskoilla junateemaisilla aakkostehtävillä värityskuvien ohella.',
      },
      {
        id: '3',
        slug: 'drawing-lines',
        name: 'Viivanjäljitys',
        category: 'Hienomotoriikka',
        icon: '✍️',
        description: 'Kehitä kynäotetta ja hienomotoriikkaa viivanjäljitystehtävillä.',
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
        slug: 'matching',
        name: 'Yhdistämistehtävät',
        category: 'Logiikka',
        icon: '🔗',
        description: 'Kehitä loogista ajattelua yhdistämistehtävillä värityskuvien rinnalla.',
      },
      {
        id: '6',
        slug: 'writing',
        name: 'Kirjoitusharjoitukset',
        category: 'Kieli',
        icon: '📝',
        description: 'Harjoittele kirjoittamista ja kirjainten muodostamista kirjoitustehtävillä.',
      },
    ],
  },
};

export default coloringFiContent;
