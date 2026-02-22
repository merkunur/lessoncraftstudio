import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Matching Worksheets - Finnish Content (Yhdistä Parit Tehtävät)
 *
 * File: frontend/content/product-pages/fi/yhdista-parit-tyoarkit.ts
 * URL: /fi/apps/yhdista-parit-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/matching.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const matchingFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'yhdista-parit-tyoarkit',
    appId: 'matching',
    title: 'Yhdistä Parit Generaattori — Ilmainen | LessonCraftStudio',
    description: 'Luo tulostettavia yhdistä parit -tehtäviä kuvilla. Kehitä muistia ja hahmontunnistusta esikoulusta 3. luokalle. 50 teemaa. Lataa PDF ilmaiseksi.',
    keywords: 'yhdistä parit generaattori, parin yhdistäminen tehtävä, muistipeli tulostettava, visuaalinen yhdistäminen, kuvaparien tunnistaminen, kognitiivinen harjoitus lapset, loogiset yhdistelmät, assosiaatio harjoitus, muistin kehittäminen, vastaavuuksien löytäminen, yhteenkuuluvuus tehtävä, yhdistä parit tehtävät, yhdistämistehtävät lapsille',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/yhdista-parit-tyoarkit',
  },

  // Hero Section - FULL text from Finnish matching.md
  hero: {
    title: 'Yhdistä Parit Tehtävien Generaattori',
    subtitle: 'Tulostettavat Yhdistämistehtävät 50 Teemalla',
    description: `Luo ammattitasoisia yhdistä parit -tehtävämonisteet MatchUp Maker -työkalulla. Peruspaketti-tilauksellasi saat rajattoman määrän tehtävämonisteiden luomista ilman lisämaksuja per tehtävä. Tämä on täydellinen työkalu esiopetuksen ja alakoulun opettajille. Lataa laadukkaita PDF-tehtäviä alle kolmessa minuutissa.

MatchUp Maker on helppokäyttöinen generaattori yhdistä parit -tehtäville. Valitse neljästä eri yhdistämistilasta. Voit yhdistää kuvia ja kirjaimia. Voit yhdistää kuvia ja sanoja. Voit yhdistää kuvia ja omia sanojasi. Työkalu sopii erinomaisesti kirjainten harjoitteluun esiopetuksessa.

Työkalulla luodut tehtävämonisteet ovat ammattilaistason tulostettavia tehtäviä lapsille. Jokaisessa tehtävämonisteessa voi olla 4, 5 tai 6 paria. Voit muokata kaikkea pohjalla olevaa sisältöä. Voit lisätä omia kuvia. Voit muuttaa fontteja ja värejä. Voit lisätä taustakuvia ja reunuksia. Kaikki elementit ovat muokattavissa vedä ja pudota -toiminnolla.

Peruspaketti-tilaus sisältää kaupallisen lisenssin. Voit myydä luomiasi tehtävämonisteitä Teachers Pay Teachers -palvelussa. Voit myydä niitä Etsy-kaupassa. Voit käyttää niitä Amazon KDP -julkaisuissa. 300 DPI -laatu takaa ammattimaiset tulosteet. Ei vesileimoja. Ei tekijätunnistusta vaadita. Kaikki tulostettavat tehtävät lapsille ovat myyntivalmiita heti latauksen jälkeen.`,
    previewImageSrc: '/samples/finnish/matching/sample-1.jpeg',
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
        videoId: 'y3ghkjt_67s',
        buttonText: 'Yhdistä Parit Toiminnot',
        modalTitle: 'Yhdistä Parit Opas',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/matching/
  samples: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Ilmaiset Työarkit ja Ilmaiset Tulosteet',
    sectionDescription: 'Lataa ilmaiset tulosteet - Ilmainen työarkki lapsille ammattimaista laatua. Ilmaiset työarkit ja työarkki lapsille täydellinen työarkki esiopetukseen. Ilmainen työarkki lapsille ja työarkki lapsille sisältää ilmaiset tulosteet ja ilmaiset työarkit opetusmateriaalin. Ilmainen työarkki ja työarkki esiopetukseen saatavilla',
    downloadLabel: 'Lataa Ilmainen Esimerkki',
    worksheetLabel: 'Tehtävämoniste',
    answerKeyLabel: 'Vastausavain',
    viewAllLabel: 'Katso suurempana',
    noPdfLabel: 'Vain esikatselu',
    freePdfCountLabel: 'ilmaista latausta',
    badgeText: 'Ilmaiset Esimerkit',
    downloadingLabel: 'Ladataan...',
    ofLabel: '/',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Features Grid - FULL text from Finnish matching.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'MatchUp Maker tarjoaa kattavan valikoiman työkaluja ammattitasoisten yhdistä parit -tehtävien luomiseen. Peruspaketti-tilauksellasi saat käyttöösi kaikki seitsemän pääominaisuutta. Nämä ominaisuudet tekevät tehtävien luomisesta nopeaa ja helppoa. Työkalulla voit luoda esiopetus materiaalia ilmaiseksi ilman lisämaksuja. Jokaisella ominaisuudella on tärkeä rooli ammattitasoisten tehtävien luomisessa.',
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
        icon: '🤝',
        title: 'Kuvaparien yhdistäminen visuaalisilla harjoituksilla',
        description: 'Luo ammattimaisia yhdistämistehtäviä, joissa oppilaat piirtävät viivoja yhdistääkseen toisiinsa liittyviä kuvapareja. Jokainen tehtävä esittää kuvaparit, jotka vaativat visuaalista assosiaatiota, muistin käyttöä ja loogista yhdistämistä. Muoto kehittää kriittistä ajattelua visuaalisen suhdeanalyysin kautta.',
      },
      {
        id: '2',
        icon: '🔀',
        title: 'Neljä yhdistämistilaa eri taitotasoille',
        description: 'Valitse yhdistämistiloista, jotka kehittävät eri kognitiivisia taitoja. Identtisten kuvien yhdistäminen rakentaa visuaalista erottelua. Varjo-kuva-yhdistäminen kehittää muodon tunnistamista. Liittyvät parit yhdistävät toisiinsa liittyviä käsitteitä. Kategoriapohjaiset tehtävät ryhmittelevät teeman mukaan.',
      },
      {
        id: '3',
        icon: '⚙️',
        title: 'Säädettävä parimäärä 3–8 per tehtävä',
        description: 'Aseta 3–8 yhdistämispäriä per tehtävä hallitaksesi vaikeustasoa ja ajankäyttöä. Kolme paria sopii täydellisesti esikoululaisille. Kuudesta kahdeksaan paria haastaa esiopetuksen ja alakoulun oppilaita rakentaen tarkkaavaisuutta ja työmuistia.',
      },
      {
        id: '4',
        icon: '🖼️',
        title: 'Yli 3000 teemakuvaa yhdistämistehtäviin',
        description: 'Selaa yli 3000 lapsiystavallista kuvaa teemoittain kiinnostavien yhdistamisharjoitusten luomiseen. Valitse elaimista, ruoasta, kulkuneuvoista, muodoista ja kymmenista muista kategorioista. Teemapohjaiset tehtavat yllapitavat oppilaiden kiinnostusta.',
      },
      {
        id: '5',
        icon: '✅',
        title: 'Automaattiset vastausavaimet joka tehtävään',
        description: 'Jokainen yhdistämistehtävä generoi automaattisesti vastausavaimen, jossa oikeat parit on yhdistetty viivoilla. Opettajat tarkistavat oppilastyöt sekunneissa. Tulosta vastausavaimet erikseen itsetarkistuspisteille tai dokumenttikameralle.',
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Muokkaustyökalu täydelliseen kustomointiin',
        description: 'Klikkaa mitä tahansa elementtiä muokataksesi sitä suoraan. Siirrä, skaalaa, kierrä tai poista tehtävän osia. Lisää mukautettua tekstiä, vaihda fontteja ja värejä, lataa taustakuvia ja lisää koristeellisia kehyksiä ammattimaiseen ulkoasuun.',
      },
      {
        id: '7',
        icon: '💼',
        title: 'Kaupallinen lisenssi myyntiin',
        description: 'Tilauksesi sisältää täydet kaupalliset oikeudet myydä yhdistämistehtäviä verkossa. Ei attribuutiovaatimuksia eikä ylimääräisiä lisenssimaksuja. Rakenna kannattava oppimateriaaliliiketoiminta.',
      },
      {
        id: '8',
        icon: '🌍',
        title: '11 kielen tuki sanastoharjoitteluun',
        description: 'Luo yhdistämistehtäviä 11 kielellä mukaan lukien suomi, ruotsi, norja ja tanska. Kuva-sana-tila luo monikielisiä sanastoharjoituksia. Täydellinen S2-opetukseen ja kielikylpyohjelmiin.',
      },
    ]
    
  },

  // How-To Guide - FULL text from Finnish matching.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Yhdistä parit -tehtävän luominen MatchUp Maker -työkalulla on nopea prosessi. Koko prosessi vie alle kolme minuuttia alusta loppuun. Ei vaadi teknistä osaamista tai suunnittelutaitoja. Seuraa näitä viittä yksinkertaista vaihetta. Luo ammattitasoisia tehtäviä esiopetukseen ja alakouluun. Aloita käyttämään luokassasi tänään.',
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
        title: 'Valitse Sisältö Tulostettavat Tehtävät Lapsille Ilmainen',
        description: `Ensimmäinen vaihe on sisällön valitseminen yhdistä parit -tehtävällesi. Valitse yksi neljästä yhdistämistilasta vasemmasta sivupalkista. Kuva alkukirjain -tila on täydellinen kirjainten harjoittelu esikoulu oppimiseen. Kuva sana -tila sopii sanaston harjoitteluun. Kuva tai sana -tila tarjoaa maksimaalisen joustavuuden. Oma sana -tila antaa sinun kirjoittaa omia määritelmiä tai käännöksiä.

Sisällön valintamenetelmä riippuu valitsemastasi tilasta. Satunnainen teema ja kuvat -vaihtoehto valitsee kaiken automaattisesti. Työkalu valitsee satunnaisen teeman kuvakirjastosta. Työkalu valitsee satunnaiset kuvat kyseisestä teemasta. Tämä on nopein tapa luoda tulostettavat tehtävät lapsille ilmainen. Ei päätöksiä tarvitse tehdä. Klikkaa vain generoi.

Valitse tietyt kuvat -vaihtoehto antaa täyden kontrollin. Selaa kuvakirjastoa teemoittain tai hakutoiminnolla. Klikkaa kuvia lisätäksesi ne valittujen kuvien listaan. Voit myös ladata omia kuvia. Yhdistä kirjaston kuvia ja omia kuvia samassa tehtävässä. Luo täysin personoituja lukemaan oppiminen tehtävät oppilaillesi.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetukset - Esiopetus Materiaali Ilmainen Asetukset',
        description: `Tehtävän asetusten mukauttaminen on toinen vaihe. Valitse parien määrä pudotusvalikosta. Vaihtoehdot ovat neljä viisi tai kuusi paria. Suurempi parimäärä luo haastavamman tehtävän. Pienempi parimäärä sopii nuoremmille oppilaille tai aloittelijoille. Säädä vaikeustaso oppilaiden taitotason mukaan.

Valitse sivun koko ja suunta. Letter pysty on amerikkalainen standardikoko. Letter vaaka sopii leveämmille asetelmille. A4 pysty on eurooppalainen standardi. A4 vaaka tarjoaa vaihtoehtoisen ulkoasun. Valitse koko joka sopii tulostimeesi ja alueellisiin standardeihin. Kaikki koot tulostavat täydellisesti kotitulostimella.

Valintaruutuasetukset antavat lisäkontrollia. Sisällytä nimi päivämäärä -kentät lisää Nimi ja Päivämäärä -rivit tehtävän yläosaan. Oppilaat voivat täyttää nimensä ennen tehtävän aloittamista. Sisällytä kohdenumerot näyttää numerot jokaisen kohteen vieressä. Näytä pisteet näyttää pienet pallot jokaisen kohteen edessä. Nämä visuaaliset apuvälineet auttavat oppilaita järjestämään työtään.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi Tehtäväsi - Välitön Esikatselu',
        description: `Kolmas vaihe on tehtävän generointi. Klikkaa Generoi Tehtävä -painiketta vasemman sivupalkin alareunassa. Työkalu luo tehtävän välittömästi. Generointiprosessi vie alle sekunnin. Näet valmiin tehtävän pohjalla heti.

Generoidut kohteet ilmestyvät kahdessa sarakkeessa. Vasen sarake sisältää ensimmäiset puoliskot pareista. Oikea sarake sisältää toisen puoliskot pareista. Oikean sarakkeen kohteet on sekoitettu satunnaisesti. Oppilaat piirtävät viivoja yhdistääkseen oikeat parit. Tämä on klassinen yhdistä parit -tehtävämuoto jota opettajat ovat käyttäneet vuosikymmeniä.

Esikatselu näyttää tarkalleen miltä tulostettu tehtävä näyttää. Ei yllätyksiä tulostuksen jälkeen. Näet tarkan asettelun värit ja koon. Jos et ole tyytyväinen tulokseen muuta asetuksia ja generoi uudelleen. Kokeile eri teemoja parimääriä tai asetuksia. Löydä täydellinen yhdistelmä tarpeisiisi.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Pohjalla - Personoi Kirjaimet Harjoittelu Esikoulu Tehtävät',
        description: `Neljäs vaihe on pohjamuokkaus. Tämä on vaihe jossa tehtävästäsi tulee ainutlaatuinen. Klikkaa mitä tahansa elementtiä pohjalla valitaksesi sen. Valitut elementit näyttävät valintalaatikon kulmissa. Kontekstuaalinen työkalupalkki ilmestyy näytön yläosaan.

Siirrä elementtejä vetämällä niitä hiirellä. Asemoi kuvat tarkalleen haluamaasi paikkaan. Skaalaa kuvia suuremmiksi tai pienemmiksi kulmakahvoista vetämällä. Kierrä elementtejä pyöritys kahvalla. Luo dynaamisia asetelmia jotka erottuvat perusmalleista. Tämä joustavuus tekee jokaisesta tehtävästä ainutlaatuisen.

Lisää omaa tekstiä Teksti-työkalut -osiosta. Kirjoita teksti tekstikenttään. Valitse fontti pudotusvalikosta. Aseta fonttikoko numerona. Valitse tekstin väri värivalitsimesta. Klikkaa Lisää Teksti -painiketta. Teksti ilmestyy pohjalle. Siirrä ja koon muuttaminen kuten mitä tahansa muuta elementtiä. Käytä tätä lisätäksesi ohjeita tai vihjeitä kirjaimet harjoittelu esikoulu tehtäviin.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta - Tulostettavat Tehtävät Lapsille Ilmainen PDF JPEG Muodoissa',
        description: `Viimeinen vaihe on tehtävän lataaminen ja tulostaminen. Klikkaa Lataa-pudotusvalikkoa oikeassa yläkulmassa. Valitse tiedostomuoto tarpeisiisi. PDF-muoto on paras tulostusta varten. JPEG-muoto sopii digitaaliseen jakamiseen. Molemmat muodot viedään 300 DPI -laadulla.

Harmaasävy-valintaruutu muuntaa tehtävän harmaasävyksi ennen latausta. Tämä säästää värimustetta tulostuksessa. Erityisen hyödyllinen kun tulostat luokallisen tehtäviä. Harmaasävyversiot näyttävät edelleen ammattimaisilta. Teksti ja kuvat pysyvät selkeinä ja helppolukuisina. Säästä musteen kustannuksia menettämättä laatua.

Vastausavaimen lataus on yhtä helppoa. Klikkaa Generoi Vastausavain -painiketta. Työkalu luo erillisen vastausavaimen välittömästi. Vastausavain näyttää parit oikeassa järjestyksessä. Viivat yhdistävät oikeat parit automaattisesti. Lataa vastausavain samassa muodossa kuin tehtävä. Tulosta vastausavain omalle paperilleen.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish matching.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'MatchUp Maker palvelee monia erilaisia käyttäjäryhmiä kasvatusympäristöissä. Peruspaketti-tilaus tarjoaa arvoa kaikille jotka luovat oppimismateriaaleja lapsille. Esiopetuksen opettajat käyttävät työkalua päivittäin. Alakoulun opettajat rakentavat kirjainten harjoittelu esikoulu tehtäviä. Kotiopettajavanhemmat personoivat oppimiskokemuksia. Kielenopettajat luovat monikielisiä materiaaleja. Jokainen käyttäjäryhmä löytää ainutlaatuista arvoa työkalusta.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '🌱',
        title: 'Esiopetuksen opettajat',
        subtitle: 'Visuaaliset yhdistämisharjoitukset 5–6-vuotiaille',
        description: 'Luo helppoja 3–4 parin tehtäviä identtisellä kuvaparitilalla. Esiopetuksen oppilaat harjoittelevat visuaalista erottelua ja viivan piirtämistä samalla. Täydellinen POPS 2014 äidinkielen ja hienomotoriikan tavoitteiden tukemiseen.',
      },
      {
        id: '2',
        icon: '📖',
        title: 'Alakoulun opettajat',
        subtitle: 'Sanastoharjoittelua kuva-sana-yhdistämisellä',
        description: 'Generoi kuva-sana-yhdistämistehtäviä viikon sanalistojen mukaan. Käytä 6–8 paria 1.–2. luokalle. Yhdistä tehtävät sanahakuihin ja ristisanatehtäviin kattaviin sanastopaketteihin.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat ja vanhemmat',
        subtitle: 'Teemallisia yhdistämistehtäviä kotiin',
        description: 'Rakenna visuaalisia oppimispaketteja yhdistämistehtävillä. Yhdistä eläin-, luonto- tai vuodenaikateemoja useissa tehtävätyypeissä. Generoi koko viikon materiaalin 15 minuutissa mukautettavalla vaikeustasolla.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'S2-opettajat',
        subtitle: 'Monikieliset yhdistämisharjoitukset',
        description: 'Luo kuva-sana-yhdistämistehtäviä 11 kielellä sanavaraston rakentamiseen. Kuvat tarjoavat yleisen kontekstin samalla kun sanat vahvistavat kohdekielen oikeinkirjoitusta. Vaihda kieliä saumattomasti saman tehtävän sisällä.',
      },
      {
        id: '5',
        icon: '🧩',
        title: 'Erityisopettajat',
        subtitle: 'Säädettävä vaikeustaso jokaiselle oppijalle',
        description: 'Säädä parimäärää ja yhdistämistilaa jokaisen oppilaan taitotason mukaan. Pienet parimäärät ja identtiset kuvat tukevat heikompia oppilaita. Viivan piirtäminen kehittää hienomotoriikkaa oppimisen tuen piirissä.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy tehtäväkokoelmia kaupallisella lisenssillä',
        description: 'Luo teemallisia yhdistämiskokoelmia myytäväksi verkossa. Vuodenaikojen ja juhlapäivien mukaiset paketit myyvät tasaisesti. Kaupallinen lisenssi kattaa rajattomat myynnit ilman attribuutiovaatimuksia.',
      },
    ]
    
  },

  // FAQ Section - Selected FAQs from Finnish matching.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'MatchUp Maker herättää paljon kysymyksiä uusilta käyttäjiltä. Opettajat haluavat ymmärtää miten työkalu toimii ennen tilaamista. Vanhemmat kysyvät käyttömahdollisuuksista kotona. Yrittäjät tiedustelevat kaupallisista oikeuksista.',
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
        question: 'Miten yhdistämisgeneraattori luo tehtäviä?',
        answer: 'Generaattori asettelee kuvaparit kahdelle puolelle tehtäväsivua sekoitetussa järjestyksessä. Valitse teema, määritä parimäärä ja yhdistämistila, ja sovellus luo valmiin tehtävän vastausavaimineen sekunneissa. Oppilaat piirtävät viivoja oikeiden parien välille.',
      },
      {
        id: '2',
        question: 'Mitkä yhdistämistilat ovat saatavilla?',
        answer: 'Neljä yhdistämistilaa: kuva-alkukirjain yhdistää kuvan ja sen alkukirjaimen, kuva-sana yhdistää kuvan ja sanan, kuva-tai-sana tarjoaa joustavimman vaihtoehdon, ja oma sana mahdollistaa mukautettujen määritelmien käytön.',
      },
      {
        id: '3',
        question: 'Kuinka monta paria voi olla yhdessä tehtävässä?',
        answer: 'Valitse 4, 5 tai 6 paria per tehtävä. Neljä paria sopii parhaiten esikoululaisille ja esiopetuksen oppilaille. Viisi paria tarjoaa standardin harjoittelun. Kuusi paria haastaa vanhempia oppilaita vaatimalla enemmän muistia ja tarkkaavaisuutta.',
      },
      {
        id: '4',
        question: 'Sisältävätkö tehtävät vastausavaimet?',
        answer: 'Jokainen yhdistämistehtävä generoi automaattisesti vastausavaimen. Vastausavain näyttää oikeat yhdistämislinjat parien välillä. Opettajat voivat tulostaa vastausavaimen erikseen tai näyttää sen dokumenttikameralla.',
      },
      {
        id: '5',
        question: 'Mille ikäryhmille yhdistämistehtävät sopivat?',
        answer: 'Yhdistämistehtävät palvelevat 4–10-vuotiaita. Esikoululaiset yhdistävät identtisiä kuvia neljällä parilla. Esiopetuksen oppilaat harjoittelevat kuva-kirjain-yhdistämistä. 1.–2. luokan oppilaat ratkaisevat kuva-sana-tehtäviä kuudella parilla.',
      },
      {
        id: '6',
        question: 'Sopivatko yhdistämistehtävät esiopetukseen?',
        answer: 'Yhdistämistehtävät sopivat erinomaisesti esiopetukseen. Käytä identtistä kuvaparitilaa neljällä parilla. Kuva-alkukirjain-tila tukee kirjaintuntemuksen kehittämistä POPS 2014 tavoitteiden mukaisesti. Viivan piirtäminen kehittää samalla hienomotoriikkaa.',
      },
      {
        id: '7',
        question: 'Voiko tehtäviä luoda useilla kielillä?',
        answer: 'Generaattori luo tehtäviä 11 kielellä mukaan lukien suomi, ruotsi, norja, tanska ja englanti. Kuva-sana-tilassa sanat vaihdetaan valitun kielen mukaisesti. S2-opettajat hyödyntävät monikielisiä tehtäviä kotikielen ja kohdekielen yhdistämiseen.',
      },
      {
        id: '8',
        question: 'Miten tulostan yhdistämistehtävät?',
        answer: 'Lataa tehtäväsi PDF- tai JPEG-muodossa 300 DPI laadulla. Valitse A4 tai Letter-sivukoko ennen lataamista. Harmaasävyvaihtoehto säästää värimustetta suurissa erissä. Kaikki tehtävät tulostuvat ammattimaisesti kotitulostimella.',
      },
      {
        id: '9',
        question: 'Voiko omia kuvia ladata tehtäviin?',
        answer: 'Kyllä, lataa rajattomasti omia kuvia JPEG-, PNG- tai GIF-muodossa. Yhdistä omia kuvia 3000+ kuvakirjaston kuvien kanssa. Käytä luokkavalokuvia, oppilaiden piirustuksia tai opetussuunnitelmaan sopivia kuvia henkilökohtaiseen materiaaliin.',
      },
      {
        id: '10',
        question: 'Kuinka kauan yhden tehtävän luominen kestää?',
        answer: 'Yhden yhdistämistehtävän luominen vie noin 2–3 minuuttia. Valitse teema ja kuvat 30 sekunnissa. Määritä asetukset 20 sekunnissa. Generaattori rakentaa tehtävän välittömästi. Useimmat opettajat luovat viikon yhdistämisharjoitukset 15 minuutissa.',
      },
      {
        id: '11',
        question: 'Voinko myydä luomiani yhdistämistehtäviä?',
        answer: 'Kyllä, tilauksesi sisältää kaupallisen lisenssin yhdistämistehtävien myyntiin verkossa. Ei attribuutiovaatimuksia eikä ylimääräisiä lisenssimaksuja. Myy teemallisia yhdistämispaketteja digitaalisina latauksina.',
      },
      {
        id: '12',
        question: 'Miten yhdistämistehtävät tukevat POPS 2014 opetussuunnitelmaa?',
        answer: 'Yhdistämistehtävät tukevat äidinkielen tavoitteita sanavaraston laajentamisessa kuva-sana-assosiaation kautta. Kirjain-kuva-yhdistäminen vahvistaa kirjain-äännevastaavuutta. Viivan piirtäminen kehittää hienomotoriikkaa POPS 2014 eriytettämisperiaatteiden mukaisesti.',
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
      'Rajoittamaton tehtävien luonti',
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä yhdistä parit -tehtävät näihin täydentäviin generaattoreihin.',
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
        slug: 'sananhaku-tyoarkit',
        name: 'Sanahaku',
        category: 'Äidinkieli',
        icon: '🔍',
        description: 'Yhdistä kuvaparitehtävät sanahakupulmiin kattaviin sanastopaketteihin. Oppilaat yhdistävät kuvia sanoihin yhdessä tehtävässä ja etsivät samoja sanoja toisessa.',
      },
      {
        id: '2',
        slug: 'kuva-arvaus-tyoarkit',
        name: 'Kuva-arvaus',
        category: 'Äidinkieli',
        icon: '❓',
        description: 'Täytä-puuttuva-kirjain -tehtävät täydentävät yhdistämisharjoituksia. Oppilaat tunnistavat kuvia ja tuottavat puuttuvia kirjaimia oikeinkirjoituksen vahvistamiseksi.',
      },
      {
        id: '3',
        slug: 'varjoyhdistely-tyoarkit',
        name: 'Varjoyhdistely',
        category: 'Hahmottaminen',
        icon: '👻',
        description: 'Varjoyhdistely kehittää visuaalista erottelua tunnistamalla kuvan varjon. Yhdistä kuvaparitehtävien kanssa visuaalisten taitojen monipuoliseen harjoitteluun.',
      },
      {
        id: '4',
        slug: 'aakkosjuna-tyoarkit',
        name: 'Aakkosjuna',
        category: 'Varhaiskasvatus',
        icon: '🚂',
        description: 'Aakkosjunatehtävät yhdistettynä kuvapariyhdistämiseen luovat kattavia varhaisen lukutaidon paketteja. Esiopetuksen oppilaat harjoittelevat kirjaintuntemusta molemmissa muodoissa.',
      },
      {
        id: '5',
        slug: 'viivojen-piirtaminen-tyoarkit',
        name: 'Viivojen piirtäminen',
        category: 'Hienomotoriikka',
        icon: '✏️',
        description: 'Viivojen piirtämistehtävät kehittävät samoja hienomotorisia taitoja kuin yhdistämistehtävät. Yhdistä molemmat hienomotoriikan intensiivisiin harjoituspaketteihin.',
      },
      {
        id: '6',
        slug: 'ristisanatehtavat-tyoarkit',
        name: 'Ristisanatehtävät',
        category: 'Äidinkieli',
        icon: '➕',
        description: 'Ristisanatehtävät yhdistettynä kuvaparitehtäviin luovat monipuolisia sanastopaketteja. Oppilaat kohtaavat samat teemasanat eri muodoissa vahvistaen muistiin painamista.',
      },
    ]
    
  },

  // -- SEO & Content Enrichment (Part 175) ------------------------------------

  aiOverviewSnippet: 'Yhdista parit -generaattori on verkkotyokalu, jolla luodaan tulostettavia kuvaparien yhdistamistehtavia esiopetukseen ja alakouluun. Opettajat valitsevat yhdistamistilan, parien maaran ja teemakuvat, ja lataavat valmiin PDF-tehtavan automaattisella vastausavaimella alle 3 minuutissa.',

  comparisonTable: [
    {
      feature: 'Yhdistämistilat',
      ourApp: '4 tilaa: kuva-kirjain, kuva-sana, joustava, mukautettu',
      typical: '1–2 kiinteää tilaa',
    },
    {
      feature: 'Kuvavihjeet',
      ourApp: '3000+ teemakuvaa visuaalisina elementteinä',
      typical: 'Vain tekstipohjaiset tehtävät',
    },
    {
      feature: 'Vastausavaimet',
      ourApp: 'Automaattinen vastausavain joka tehtävään',
      typical: 'Manuaalinen tai lisämaksullinen',
    },
    {
      feature: 'Parimäärä',
      ourApp: '4–6 paria säädettävästi',
      typical: 'Kiinteä parimäärä',
    },
    {
      feature: 'Kaupallinen lisenssi',
      ourApp: 'Sisältyy, myy vapaasti verkossa',
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
      claim: 'Visuaalinen parien yhdistäminen kehittää työmuistia ja visuaalista erottelukykyä, jotka ovat varhaisen lukutaidon perusedellytyksiä. Kuva-sana-assosiaatioharjoitukset vahvistavat sanavaraston omaksumista merkittävästi.',
      source: 'Lerkkanen, M.-K., "Lukemaan oppiminen ja opettaminen," WSOY',
    },
    {
      claim: 'Yhdistämistehtävät, joissa oppilaat piirtävät viivoja kohteiden välille, kehittävät samanaikaisesti hienomotoriikkaa ja visuaalista hahmottamista, tukien kirjoittamisvalmiutta kokonaisvaltaisesti.',
      source: 'Niilo Mäki Instituutti, "Visuaalisen hahmottamisen ja motoristen taitojen yhteys," Jyväskylän yliopisto',
    },
  ],

  teacherTestimonials: [
    {
      quote: 'Kuva-kirjain-yhdistamistila on loistava esiopetuksen aamutyoskentelyyn. Oppilaat tunnistavat kuvan ja yhdistivat oikean alkukirjaimen tehden kirjainharjoittelusta hauskaa ja tehokasta.',
      name: 'Riikka Lahtinen',
      role: 'Esiopetuksen opettaja',
      school: 'Taitoniekkojen paivakoti, Turku',
    },
    {
      quote: 'Myyn teemallisia yhdistamiskokoelmia verkossa ja tama generaattori muutti tuotantoaikani tunnista viiteentoista minuuttiin. Neljan yhdistamistilan ansiosta voin luoda vaihtelevaa sisaltoa helposti.',
      name: 'Sami Heikkinen',
      role: 'Opettajayrittaja',
      school: 'OpeHeikkinen verkkokauppa',
    },
  ],

  tips: {
    sectionTitle: 'Yhdistämisstrategiat luokka-asteittain',
    sectionDescription: 'Säädä yhdistämisgeneraattori sopivaan haasteeseen kullekin kehitysvaiheelle. Näin asetat yhdistämistilan, parimäärän ja vaikeustason esikoulusta kolmanteen luokkaan.',
    items: [
      {
        id: 'esikoulu',
        icon: '🌱',
        title: 'Esikoulu: Identtiset kuvaparit',
        description: 'Kaytta identtista kuvaparitilaa neljalla parilla. Esikoululaiset harjoittelevat samanlaisten kuvien tunnistamista ja viivan piirtamista kahden kuvan valille. Yksinkertainen muoto rakentaa visuaalista erottelua ja kynanhallintaa.',
      },
      {
        id: 'esiopetus',
        icon: '🎒',
        title: 'Esiopetus: Kuva-kirjain-yhdistäminen',
        description: 'Luo kuva-alkukirjain-tehtavia viidella parilla. Esiopetuksen oppilaat tunnistavat kuvan ja yhdistivat oikean alkukirjaimen. Tama tukee kirjaintuntemuksen kehittamista POPS 2014 aidinkielen tavoitteiden mukaisesti.',
      },
      {
        id: '1-luokka',
        icon: '📚',
        title: '1. luokka: Kuva-sana-yhdistäminen',
        description: 'Generoi kuva-sana-tehtavia viidella tai kuudella parilla viikon sanalistojen sanoilla. Ekaluokkalaiset kehittavat lukutaitoa yhdistamalla kuvia ja sanoja. Tehtavat vahvistavat oikeinkirjoitusta ja sanan tunnistamista.',
      },
      {
        id: '2-luokka',
        icon: '✏️',
        title: '2. luokka: Kategoriapohjaiset yhdistämistehtävät',
        description: 'Rakenna oma sana -tilalla tehtavia kuudella parilla, joissa oppilaat yhdistivat kuvia maaritelmiin tai kaannoksiin. Toisluokkalaiset kehittavat luokittelutaitoja ja abstraktia ajattelua.',
      },
      {
        id: '3-luokka',
        icon: '🎯',
        title: '3. luokka: Monikieliset sanastohaasteet',
        description: 'Luo kuva-sana-tehtavia kahdella kielella kuudella parilla. Kolmasluokkalaiset harjoittelevat vieraan kielen sanastoa yhdistamalla kuvia kohdekielen sanoihin. Kaytta tehtavia aidinkielen ja vieraan kielen integroituun opetukseen.',
      },
    ],
  },
};

export default matchingFiContent;
