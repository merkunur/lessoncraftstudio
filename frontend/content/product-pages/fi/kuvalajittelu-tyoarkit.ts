import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Picture Sort Worksheets - Finnish Content (Kuvalajittelu Tehtävät)
 *
 * File: frontend/content/product-pages/fi/kuvalajittelu-tyoarkit.ts
 * URL: /fi/apps/kuvalajittelu-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/picture-sort.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Full Access ($240/year) - Picture Sort requires Full Access subscription
 */

export const pictureSortFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'kuvalajittelu-tyoarkit',
    appId: 'picture-sort',
    title: 'Tulostettavat Tehtävät Lapsille Ilmainen - Kuvalajittelu ja Hienomotoriikka Harjoitukset Esikouluun',
    description: 'Luo ammattimaisia kuvalajittelutehtäviä helposti. Täysi Käyttöoikeus -tilaus antaa rajattoman tehtävien luonnin ilman tehtäväkohtaisia maksuja. Lataa tulostettavat PDF-tehtävät alle 3 minuutissa.',
    keywords: 'tulostettavat tehtävät lapsille ilmainen, kuvalajittelu tehtävät, esiopetus materiaali ilmainen, hienomotoriikka harjoitukset, lajittelutehtävät, kategorisointi tehtävät',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/kuvalajittelu-tyoarkit',
  },

  // Hero Section - FULL text from Finnish picture-sort.md
  hero: {
    title: 'Kuvalajittelu Tehtävät',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen Esiopetus Materiaali',
    description: `Luo ammattimaisia kuvalajittelutehtäviä helposti. Täysi Käyttöoikeus -tilauksesi antaa rajattoman tehtävien luonnin ilman tehtäväkohtaisia maksuja. Generoi mukautettavia tulostettavia tehtäviä lapsille ilmainen, jotka sopivat täydellisesti esiopetukseen ja alakouluun. Lataa korkealaatuisia PDF-tehtäviä alle 3 minuutissa.

Kuvalajittelugeneraattori auttaa lapsia oppimaan luokittelua ja kategorisointia. Lapset lajittelevat kuvia kahteen ryhmään. Vasen ja oikea kategoria. Jokainen tehtävä harjoittaa kriittistä ajattelua ja visuaalista erottelukykyä.

Työkalumme tekee laadukkaiden esiopetus materiaali ilmainen -tehtävien luomisesta nopeaa. Valitse kaksi teemaa automaattista generointia varten. Tai valitse yksittäisiä kuvia manuaalisesti 3000+ kuvan kirjastosta. Muokkaa kaikkea pohjalla suoraan. Lisää omia kuvia personoidaksesi tehtävät oppilaillesi.`,
    previewImageSrc: '/samples/english/picture sort/picture sort portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/picture sort/
  samples: {
    sectionTitle: 'Kuvalajittelu Tehtävät Esimerkit',
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
        worksheetSrc: '/samples/english/picture sort/picture sort portrait.jpeg',
        answerKeySrc: '/samples/english/picture sort/picture sort portrait answer_key.jpeg',
        altText: 'Kuvalajittelutehtävä pystysuunnassa esiopetukseen',
        pdfDownloadUrl: '/samples/english/picture sort/picture sort portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/picture sort/picture sort landscape.jpeg',
        answerKeySrc: '/samples/english/picture sort/picture sort landscape answer_key.jpeg',
        altText: 'Kuvalajittelutehtävä vaakasuunnassa hienomotoriikan harjoitteluun',
        pdfDownloadUrl: '/samples/english/picture sort/picture sort landscape.pdf',
      },
    ],
  },

  // Features Grid - FULL text from Finnish picture-sort.md feature sections
  features: {
    sectionTitle: 'Kuvalajittelu Tehtävät - Tulostettavat Tehtävät Lapsille Ilmainen ja Hienomotoriikka Harjoitukset',
    sectionDescription: 'Kuvalajittelutyökalumme sisältää kaiken mitä tarvitset ammattimaisten tehtävien luomiseen. Täysi Käyttöoikeus -tilauksesi antaa pääsyn kaikkiin ominaisuuksiin ilman lisämaksuja. Luo esiopetus materiaali ilmainen, matematiikka tehtävät alakoulu ja hienomotoriikka harjoitukset. Kaikki samalla alustalla. Kaikki samalla tilauksella.',
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
        title: 'Luo Tulostettavat Tehtävät Lapsille Ilmainen 3 Klikkauksella - Värityskuvia Lapsille Tulostettava Nopea',
        description: `Valitse kaksi kategoriaa kuvalajitteluun. Vasen kategoria ja oikea kategoria. Valitse teema jokaiselle kategorialle. Generaattori luo tehtävän automaattisesti. Yksinkertainen ja nopea.

Tai valitse manuaalinen tila täydelle kontrollille. Selaa kuvakirjastoa. Klikkaa kuvia lisätäksesi valintaan. Määritä jokaisen kuvan kategoria. Vasen tai oikea. Vähintään 6 kuvaa yhteensä. Enintään 12 kuvaa.

Generoi tehtävä yhdellä klikkauksella. Esikatselu näkyy välittömästi. Ei odottelua. Ei latautumisaikoja. Valmis muokattavaksi heti. Luo värityskuvia lapsille tulostettava ja pisteestä pisteeseen tehtävät samalla nopeudella. Kolme klikkausta alusta valmiiseen tehtävään.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Muokkaa Kaikkea Pohjalla - Hienomotoriikka Harjoitukset ja Matematiikka Tehtävät Alakoulu Mukautettavat',
        description: `Jokainen elementti pohjalla on muokattavissa. Raahaa kuvia uusiin paikkoihin. Kierrä ja skaalaa haluamallasi tavalla. Poista ei-toivotut elementit yhdellä klikkauksella. Täysi kontrolli lopputuloksesta.

Lajittelukehykset ovat säädettävissä. Siirrä vasenta ja oikeaa laatikkoa. Muuta kokoa tarpeen mukaan. Säädä väriä visuaalisen erottelun parantamiseksi. Luo matematiikka tehtävät alakoulu lisäämällä numeroita ja laskutoimituksia.

Lisää tekstielementtejä ohjeiden antamiseksi. Muuta fontteja ja värejä. Säädä tekstikokoa luettavuuden parantamiseksi. Luo kirjaimet harjoittelu esikoulu -tehtäviä lisäämällä kirjaimia lajittelukategorioihin. Rajaton luovuus.

Leikkuukuvat ovat irrotettavia. Lapset leikkaavat kuvat irti. Lajittelevat ne oikeisiin kategorioihin. Liimaa vasempaan tai oikeaan laatikkoon. Käytännön oppiminen saksia käyttämällä. Hienomotoriikka harjoitukset yhdistettynä kognitiiviseen ajatteluun.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Lataa Omat Kuvasi - Esiopetus Materiaali Ilmainen ja Lukemaan Oppiminen Tehtävät Personoituja',
        description: `Lataa useita kuvia kerralla. Kaikki yleisimmät tiedostomuodot tuettu. JPEG, PNG, GIF toimivat täydellisesti. Yhdistä omat kuvasi kirjaston kuviin. Luo täysin personoituja tulostettavia tehtäviä lapsille ilmainen.

Käytä oppilaittesi valokuvia. Lisää luokkahuoneen esineitä. Lataa paikallisia maamerkkejä tai kotieläimiä. Tee tehtävistä merkityksellisiä oppilaillesi. Parempi sitoutuminen tunnetuilla kuvilla.

Ladatut kuvat toimivat molemmissa kategorioissa. Käytä niitä vasemmassa tai oikeassa laatikossa. Lisää leikkuukuviksi. Lataa kerran, käytä rajattomasti. Luo kertotaulut tulostettava -tehtäviä numeroilla ja laskutoimituksilla. Täysi integraatio.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Monikielinen Tuki 11 Kielellä - Kirjaimet Harjoittelu Esikoulu Kaikilla Kielillä',
        description: `Käyttöliittymä toimii 11 kielellä. Suomi, englanti, saksa, ranska, espanja. Italia, portugali, hollanti, ruotsi. Tanska, norja. Kaikki täysin käännetty. Kaikki elementit omalla kielellä.

Sisältö mukautuu valittuun kieleen. Kuvatiedostojen nimet määräävät sisällön. Luo lukemaan oppiminen tehtävät suomeksi. Vaihda englanniksi ESL-opetukseen. Sama työkalu, eri kielet. Luo yhteenlasku ja vähennyslasku tehtävät omalla kielelläsi.

Erityisen tärkeä kielenoppimiseen. Luo sanaston harjoituksia missä tahansa tuetussa kielessä. Kaksikieliset koulut hyötyvät valtavasti. Kansainväliset opettajat käyttävät samaa työkalua eri luokissa. Monikielinen perhe luo esiopetus materiaali ilmainen -tehtävät kaikille lapsille.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kaupallinen POD-Lisenssi Sisältyy - Myy Tulostettavat Tehtävät Lapsille Ilmainen Verkossa',
        description: `Täysi Käyttöoikeus -tilaus sisältää täyden kaupallisen lisenssin. Myy luomasi tehtävät Etsyssä. Julkaise Teachers Pay Teachers -alustalla. Luo Amazon KDP -kirjoja. Ei erillistä lisenssimaksua. Kaupallinen käyttö sisältyy hintaan.

300 DPI laatu täyttää kaikki myyntivaatimukset. Ammattimainen ulkoasu kilpailee maksullisten mallien kanssa. Luo värityskuvia lapsille tulostettava -tuotteita myyntiin. Rakenna tulovirtoja opetusresursseista. Luo pisteestä pisteeseen tehtävät myyntituotteiksi.

Ei attribuutiovaatimusta. Myy omalla brändilläsi. Luo tuotepaketteja yhdistämällä eri tehtävätyyppejä. Monet opettajat tienaavat 500-3000 euroa kuukaudessa. Tilauksesi maksaa itsensä takaisin nopeasti. Luo matematiikka tehtävät alakoulu myyntikirjoja.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Valtava 3000+ Kuvakirjasto - Pisteestä Pisteeseen Tehtävät ja Hienomotoriikka Harjoitukset Valmiina',
        description: `Yli 3000 lapsille sopivaa kuvaa sisältyy. Järjestetty teemoittain helpon selauksen vuoksi. Eläimet, ruoka, ajoneuvot, kasvit. Lelut, vaatteet, urheilu, juhlapäivät. Jokainen kategoria täynnä vaihtoehtoja.

Valitse koko teema yhdellä klikkauksella. Generaattori valitsee automaattisesti sopivat kuvat. Tai selaa yksittäisiä kuvia täydelle kontrollille. Hakutoiminto auttaa löytämään tarkalleen oikeat kuvat. Luo kertotaulut tulostettava teemoilla.

Taustakuvat ja reunat mukana. Satoja valmiita taustoja. Kymmenittäin reunateemoja. Ei lisämaksuja visuaalisista elementeistä. Luo lukemaan oppiminen tehtävät kauniilla visuaalisilla teemoilla. Kaikki sisältyy Täysi Käyttöoikeus -tilaukseen.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Ammattilaislaatuinen 300 DPI Vienti - Esiopetus Materiaali Ilmainen ja Matematiikka Tehtävät Alakoulu PDF',
        description: `Jokainen tehtävä viedään 300 DPI tarkkuudella. Täydellinen tulostukseen kotitulostimella. Täydellinen myyntiin verkossa. Täydellinen kaupalliseen käyttöön. Ammattimainen laatu jokaisella kerralla.

Valitse PDF tai JPEG tiedostomuodoksi. PDF säilyttää vektorigrafiikan. JPEG toimii useimmissa sovelluksissa. Molemmat ladattavissa yhdellä klikkauksella. Molemmat samalla 300 DPI laadulla. Luo yhteenlasku ja vähennyslasku tehtävät tulostusvalmiina.

Harmaasävyvaihtoehto säästää mustetta. Erityisen hyödyllinen luokkahuonetulostuksissa. Vähennä tulostuskustannuksia 60-80 prosenttia. Säilytä silti selkeä, luettava tehtävä. Luo tulostettavat tehtävät lapsille ilmainen musteksi ystävällisessä muodossa.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from Finnish picture-sort.md step sections
  howTo: {
    sectionTitle: 'Kuinka Luoda Tulostettavat Tehtävät Lapsille Ilmainen 5 Helpossa Vaiheessa',
    sectionDescription: 'Luo ammattimaiset kuvalajittelutehtävät alle 3 minuutissa. Viisi yksinkertaista vaihetta alusta loppuun. Ei monimutkaisia asetuksia. Ei pitkää oppimiskäyrää. Pelkkä nopea, helppo tehtävien luominen.',
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
        title: 'Valitse Kategoriat - Esiopetus Materiaali Ilmainen ja Pisteestä Pisteeseen Tehtävät Teemalliset',
        description: `Aloita valitsemalla vasemman kategorian teema. Yli 50 teemaa saatavilla. Eläimet, ruoka, ajoneuvot, luonto. Lelut, vaatteet, urheilu, juhlapäivät. Valitse teema joka sopii oppituntiisi.

Valitse oikean kategorian teema. Voi olla sama kategoria kuin vasen tai erilainen. Esimerkiksi: lemmikkieläimet vasemmalla, villit eläimet oikealla. Tai hedelmiä vasemmalla, vihanneksia oikealla. Rajattomat mahdollisuudet.

Automaattinen tila luo tehtävän välittömästi. Generaattori valitsee satunnaisesti sopivat kuvat. 3-6 kuvaa per kategoria. Yhteensä 6-12 kuvaa. Nopea tapa luoda esiopetus materiaali ilmainen -tehtäviä.

Tai valitse manuaalinen tila täydelle kontrollille. Selaa kuvakirjastoa. Klikkaa kuvia lisätäksesi valintaan. Määritä jokaisen kuvan kategoria. Luo pisteestä pisteeseen tehtävät tarkasti haluamallasi tavalla. Täysi kontrolli sisällöstä.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Muokkaa Asetuksia - Kertotaulut Tulostettava ja Matematiikka Tehtävät Alakoulu Mukautettavia',
        description: `Valitse sivun koko A4 tai Letter-muodossa. Pysty- tai vaakasuunta. Neliö 1200x1200 pikseliä. Tai määritä oma mukautettu koko. Kaikki standardikoot tuettu.

Sisällytä Nimi ja Päivämäärä -kentät. Valintaruutu lisää nämä kentät automaattisesti. Lapset kirjoittavat nimensä ennen aloittamista. Hyvä seuranta tehtävien järjestämiseen. Luo kertotaulut tulostettava henkilökohtaisilla nimikentillä.

Valitse taustan väri tai teema. Satoja valmiita taustoja saatavilla. Säädä läpinäkyvyyttä visuaalisen tasapainon saavuttamiseksi. Lisää reunoja koristeluun. Kymmenittäin reunateemoja mukana. Luo matematiikka tehtävät alakoulu kauniilla visuaalisilla elementeillä.

Lisää omat kuvat tässä vaiheessa. Lataa useita tiedostoja kerralla. Yhdistä omasi kirjaston kuviin. Personoi tehtävät oppilaillesi. Parempi sitoutuminen tunnetuilla kuvilla.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi Tehtävä - Hienomotoriikka Harjoitukset ja Lukemaan Oppiminen Tehtävät Valmiina',
        description: `Klikkaa "Luo Tehtävä" -painiketta. Generaattori rakentaa tehtävän välittömästi. Ei latautumisaikaa. Ei viivettä. Valmis alle sekunnissa.

Tehtävä näkyy pohjalla. Vasen ja oikea lajittelukehys näkyvät. Leikkuukuvat näkyvät alhaalla. Otsikko ja ohjeet luodaan automaattisesti. Kaikki elementit paikoillaan. Luo hienomotoriikka harjoitukset yhden klikkauksen nopeudella.

Esikatsele tehtävää pohjalla. Zoomaa lähemmäs yksityiskohtien näkemiseksi. Zoomaa ulos kokonaiskuvan hahmottamiseksi. Kumoamis- ja tekemis uudelleen -painikkeet saatavilla. Täysi hallinta muokkaukseen.

Luo vastausavain erillisellä klikkauksella. "Luo Vastausavain" -painike aktivoituu. Vastausavain näyttää oikean lajittelun. Kuvat oikeissa kategorioissa. Täydellinen opettajan arviointiin. Luo lukemaan oppiminen tehtävät vastausavaimilla.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Pohjalla - Kirjaimet Harjoittelu Esikoulu ja Yhteenlasku ja Vähennyslasku Tehtävät Mukautettavat',
        description: `Raahaa elementtejä uusiin paikkoihin. Siirrä lajittelukehyksiä. Järjestä leikkuukuvia uudelleen. Jokainen elementti on muokattavissa. Täysi editointivapaus.

Kierrä ja skaalaa kuvia. Valitse kuva klikkaamalla. Raahaa kulmista koon muuttamiseen. Kierrä kiertämiskahvalla. Poista ei-toivotut elementit Delete-näppäimellä. Luo kirjaimet harjoittelu esikoulu -tehtäviä lisäämällä kirjaimia.

Lisää tekstielementtejä. Kirjoita teksti tekstikenttään. Klikkaa "Lisää Teksti". Teksti ilmestyy pohjalle. Raahaa haluamaasi paikkaan. Muuta väriä, kokoa, fonttia. Seitsemän fonttia saatavilla. Luo yhteenlasku ja vähennyslasku tehtävät lisäämällä numeroita ja laskutoimituksia.

Lukitse elementit estääksesi vahingossa tapahtuvan muokkauksen. Valitse elementti. Klikkaa lukituspainiketta. Lukitut elementit eivät siirry vahingossa. Avaa kaikki lukot tarvittaessa yhdellä klikkauksella. Säilytä ammattimaiset asettelut.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta - Värityskuvia Lapsille Tulostettava ja Kertotaulut Tulostettava PDF',
        description: `Valitse latausmuoto. PDF säilyttää vektorigrafiikan. JPEG toimii kaikissa sovelluksissa. Molemmat 300 DPI laadulla. Ammattimainen tulostuslaatu molemmissa.

Lataa tehtävä yhdellä klikkauksella. "Lataa Tehtävä JPEG" tai "Lataa Tehtävä PDF". Tiedosto latautuu välittömästi. Valmis tulostettavaksi tai myytäväksi. Luo värityskuvia lapsille tulostettava ja tallenna muutamassa sekunnissa.

Lataa vastausavain erikseen. Sama muotoilut saatavilla. JPEG tai PDF. Opettajat lataavat molemmat tiedostot. Tehtävä oppilaille, vastausavain itselleen. Nopea arviointi luokkahuoneessa.

Valitse harmaasävyvaihtoehto säästääksesi mustetta. Valintaruutu muuntaa värit harmaasävyiksi. Vähennä tulostuskustannuksia 60-80 prosenttia. Säilytä silti selkeä, luettava tehtävä. Luo kertotaulut tulostettava musteksi ystävällisessä muodossa.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish picture-sort.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille ja Vanhemmille - Esiopetus Materiaali Ilmainen ja Matematiikka Tehtävät Alakoulu Kaikille Tarpeille',
    sectionDescription: 'Kuvalajittelutehtävät toimivat kaikilla koulutustasoilla. Esiopetuksesta alakouluun. Kotiopetuksesta luokkahuoneeseen. Monikielisestä opetuksesta erityisopetukseen. Jokainen opettaja löytää arvon näistä tehtävistä.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Esiopetuksen Opettajat',
        subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen ja Hienomotoriikka Harjoitukset Päivittäin',
        description: `Esiopetuksen opettajat luovat kuvalajittelutehtäviä päivittäin. Kategorisointitaidot ovat tärkeitä 5-6-vuotiaille. Lajittelu värin, muodon, koon mukaan. Eläinten, ruoan, ajoneuvojen erottelu. Perusajattelutaidot kehittyvät.

Leikkuutehtävät kehittävät hienomotoriikkaa. Sakset, liimaus, sijoittelu. Käden ja silmän koordinaatio paranee. Yhdistä kognitiivinen oppiminen motorisiin taitoihin. Luo tulostettavat tehtävät lapsille ilmainen, jotka palvelevat molempia tarkoituksia.

Teemapohjaiset yksiköt toimivat hyvin esiopetuksessa. Syksy: lajittele lehtiä ja marjoja. Talvi: lajittele talvivaatteita ja aktiviteetteja. Kevät: lajittele kukkia ja hyönteisiä. Kesä: lajittele rantaesineitä ja kesäruokia. Luo esiopetus materiaali ilmainen kausiluonteisiin teemoihin.

11 kielen tuki auttaa monikielisiä esikouluja. Luo sama tehtävä suomeksi ja englanniksi. Lapset oppivat molemmilla kielillä. Kaksikielinen immersiokoulutus hyötyy valtavasti. Samat kuvat, eri kielet.`,
        quote: 'Kuvalajittelutehtävät kehittävät lasten kategorisointitaitoja hauskasti!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun Opettajat 1.-3. Luokka',
        subtitle: 'Matematiikka Tehtävät Alakoulu ja Kirjaimet Harjoittelu Esikoulu',
        description: `1.-3. luokan opettajat käyttävät kuvalajittelua opetusvälineenä. Matematiikassa: lajittele parilliset ja parittomat numerot. Lajittele geometriset muodot. Lajittele laskutoimitukset tulosten mukaan. Visuaalinen matematiikan oppiminen.

Lukemisessa: lajittele sanat alkukirjaimen mukaan. Lajittele kuvat tavumäärän mukaan. Lajittele substantiivit ja verbit. Kieliopin perusasiat visuaalisesti. Luo matematiikka tehtävät alakoulu ja kieliopin tehtävät samalla työkalulla.

Tieteessä: lajittele eläviä ja elottomia asioita. Lajittele kasvit ja eläimet. Lajittele nestemäiset, kiinteät, kaasumaiset. Peruskäsitteet selkeästi. Luo kirjaimet harjoittelu esikoulu ja luonnontiede tehtävät integroidusti.

Arviointitehtävät nopeasti. Luo kuvalajittelutehtävä oppitunnin lopussa. Tarkista ymmärrys. Tulosta ja jaa oppilaille. Kerää ja arvioi. 3 minuuttia luomiseen, 5 minuuttia arviointiin. Tehokas oppimisnäyttö.`,
        quote: 'Kuvalajittelu tekee oppitunneista interaktiivisia.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopetuksen Vanhemmat',
        subtitle: 'Värityskuvia Lapsille Tulostettava ja Pisteestä Pisteeseen Tehtävät Monipuolisia',
        description: `Kotiopetuksen vanhemmat tarvitsevat monipuolisia tehtäviä. Usein useampi lapsi eri ikätasoilla. 5-vuotias tarvitsee yksinkertaista lajittelua. 8-vuotias tarvitsee monimutkaista kategorisointia. Sama työkalu, eri vaikeudet.

Luo henkilökohtaisia tehtäviä perheellesi. Lajittele perheen lemmikkejä. Lajittele perheen harrastuksia. Lajittele kotimaan kaupunkeja. Tee oppiminen merkitykselliseksi lapsillesi. Luo värityskuvia lapsille tulostettava perheaiheilla.

Yhdistä oppiaineet luovasti. Kuvalajittelua ennen ruoanlaittohetkiä. Lajittele aineksia: proteiinit ja kasvikset. Lajittele työkalut: leikkaus- ja sekoitusvälineet. Integroitu oppiminen arjessa. Luo pisteestä pisteeseen tehtävät käytännön tilanteisiin.

Viikottaiset tehtäväpaketit helposti. Maanantai: matematiikka lajittelu. Tiistai: lukeminen lajittelu. Keskiviikko: tiede lajittelu. Torstai: maantieto lajittelu. Perjantai: taide lajittelu. 15 minuuttia sunnuntaina, koko viikon tehtävät valmiina.`,
        quote: 'Kotiopetuksessa henkilökohtaiset tehtävät ovat korvaamattomia.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Suomi Toisena Kielenä -Opettajat',
        subtitle: 'Lukemaan Oppiminen Tehtävät ja Kertotaulut Tulostettava Monikielisiä',
        description: `Suomi toisena kielenä -opettajat hyötyvät visuaalisesta oppimisesta. Sanaparin oppiminen kuvien kanssa. Lajittele kuvat kategorioihin. Opettaja sanoo suomalaisen sanan. Oppilaat tunnistavat ja lajittelevat. Visuaalinen sanaston rakentaminen.

11 kielen tuki on kriittinen. Luo sama tehtävä oppilaan äidinkielellä. Sitten suomeksi. Vertaa ja opi. Kaksikielinen siltaus helpottaa ymmärrystä. Luo lukemaan oppiminen tehtävät molemmilla kielillä.

Kulttuuriset konseptit visuaalisesti. Lajittele suomalaiset ja kansainväliset ruoat. Lajittele suomalaiset ja kansainväliset juhlapäivät. Lajittele suomalaiset ja kansainväliset urheilu. Kulttuurinen ymmärrys kasvaa. Luo kertotaulut tulostettava kulttuurisilla vertailuilla.

Lauseenmuodostus tehtävät. Lajittele subjektit ja predikaatit. Lajittele substantiivit ja adjektiivit. Kielioppi visuaalisesti selkeänä. Rakenna kielitaitoa lajittelun kautta. Konkreettinen lähestymistapa abstrakteihin käsitteisiin.`,
        quote: 'Monikielinen tuki on korvaamaton S2-opetuksessa.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Hienomotoriikka Harjoitukset ja Yhteenlasku ja Vähennyslasku Tehtävät Eriyttäen',
        description: `Erityisopettajat tarvitsevat eriytettyjä tehtäviä. Kuvalajittelu on ihanteellinen eriyttämiseen. Säädä vaikeutta kuvan määrällä. 6 kuvaa helppo. 12 kuvaa haastava. Sama konsepti, eri tasot.

Visuaalinen oppiminen auttaa monia oppijoita. Autismikirjon oppilaat hyötyvät selkeistä kategorioista. ADHD-oppilaat pysyvät keskittyneinä visuaalisissa tehtävissä. Dyslektiset oppilaat oppivat kuvin. Monet oppimistyylit tuettu. Luo hienomotoriikka harjoitukset eri tarpeiden mukaan.

Leikkuu- ja liimaustoiminnot ovat terapeuttisia. Hienomotoriikan kehitys käytännön tehtävien kautta. Aisti-integraatio saksia käytettäessä. Onnistumisen tunne valmiin tehtävän kanssa. Itsetunnon rakentaminen pienillä voitoilla.

Matematiikka konkreettisesti. Lajittele numerot suuriin ja pieniin. Lajittele laskutoimitukset yhteen- ja vähennyslaskuihin. Lajittele vastaukset oikeisiin ja vääriin. Visuaalinen matematiikka toimii. Luo yhteenlasku ja vähennyslasku tehtävät konkreettisella lähestymistavalla.`,
        quote: 'Voin räätälöidä tehtävät jokaisen oppilaan tarpeisiin.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opetusresurssien Myyjät',
        subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen ja Esiopetus Materiaali Ilmainen Myyntituotteiksi',
        description: `Teachers Pay Teachers -myyjät luovat tuotteita myyntiin. Kuvalajittelutehtävät myyvät hyvin. Opettajat hakevat valmiita, tulostettavia tehtäviä. Luo tehtäväpaketteja teemoittain. Myy Etsyssä, TPT:ssä, omalla verkkosivustolla.

Kaupallinen lisenssi sisältyy Täysi Käyttöoikeus -tilaukseen. Ei erillistä lisenssimaksua. Myy rajattomasti. 300 DPI laatu täyttää kaikki myyntivaatimukset. Ammattimaiset tehtävät kilpailevat kalliiden mallien kanssa. Luo tulostettavat tehtävät lapsille ilmainen myyntituotteiksi.

Luo tuotepaketteja nopeasti. Luo 10 kuvalajittelutehtävää tunnissa. Ryhmittele teemoittain. Myy pakettina 5-10 euroa. Monet myyjät tienaavat 500-3000 euroa kuukaudessa. Tilaus maksaa itsensä takaisin ensimmäisessä kuussa.

Yhdistä eri tehtävätyyppejä. Kuvalajittelu + värityskuvia lapsille tulostettava + pisteestä pisteeseen tehtävät. Täydelliset oppimispaketit. Korkeampi hinta paketeille. Enemmän arvoa asiakkaille. Luo esiopetus materiaali ilmainen kokonaisia opetusyksiköitä.`,
        quote: 'Tilaukseni maksoi itsensä takaisin ensimmäisessä kuussa!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from Finnish picture-sort.md
  faq: {
    sectionTitle: 'Usein Kysytyt Kysymykset Kuvalajittelusta ja Tulostettavat Tehtävät Lapsille Ilmainen',
    sectionDescription: 'Opettajat kysyvät samoja kysymyksiä kuvalajittelugeneraattorista. Hinnoittelu, käyttö, räätälöinti, tulostus. Kaupallinen käyttö, kielet, ikäryhmät. Alla vastaukset 12 yleisimpään kysymykseen.',
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
        question: 'Onko Kuvalajittelugeneraattori Ilmainen - Tulostettavat Tehtävät Lapsille Ilmainen ja Kertotaulut Tulostettava?',
        answer: 'Kuvalajittelugeneraattori vaatii Täysi Käyttöoikeus -tilauksen. 240 euroa vuodessa tai 25 euroa kuukaudessa. Tilauksesi antaa rajattoman kuvalajittelutehtävien luomisen ilman tehtäväkohtaisia maksuja. Luo niin monta tulostettavat tehtävät lapsille ilmainen kuin tarvitset ilman lisäkustannuksia. Täysi Käyttöoikeus sisältää kaikki 33 tehtävägeneraattoria. Luo kertotaulut tulostettava, värityskuvia lapsille tulostettava ja hienomotoriikka harjoitukset. Kaikki samalla tilauksella.',
      },
      {
        id: '2',
        question: 'Voinko Tulostaa Kuvalajittelutehtävät Kotitulostimella - Esiopetus Materiaali Ilmainen ja Yhteenlasku ja Vähennyslasku Tehtävät?',
        answer: 'Kyllä. Kuvalajittelutehtävät on suunniteltu kotitulostimille. 300 DPI laatu toimii täydellisesti tavallisilla mustesuihkutulostimilla ja lasertulostimilla. A4 ja Letter sivukoot tuettu. Luo esiopetus materiaali ilmainen ja tulosta heti. Harmaasävyvaihtoehto säästää mustetta. Vähennä tulostuskustannuksia 60-80 prosenttia.',
      },
      {
        id: '3',
        question: 'Tarvitsenko Suunnittelutaitoja - Kirjaimet Harjoittelu Esikoulu ja Pisteestä Pisteeseen Tehtävät Helposti?',
        answer: 'Ei. Ei suunnittelutaitoja tarvita. Kuvalajittelugeneraattori luo ammattimaiset tehtävät automaattisesti. Valitse kaksi teemaa. Klikkaa "Luo Tehtävä". Valmis. Luo kirjaimet harjoittelu esikoulu -tehtäviä ilman graafista osaamista. Käyttöliittymä on intuitiivinen. Uudet käyttäjät onnistuvat ensimmäisellä kerralla.',
      },
      {
        id: '4',
        question: 'Voinko Käyttää Kuvalajittelutehtäviä Luokassani - Lukemaan Oppiminen Tehtävät ja Matematiikka Tehtävät Alakoulu Oppilaille?',
        answer: 'Kyllä. Täysi Käyttöoikeus -tilaus sisältää rajattoman luokkahuonekäytön. Tulosta niin monta kopiota kuin tarvitset. Jaa kaikille oppilaillesi. Ei rajoituksia luokkahuonekäytölle. Luo lukemaan oppiminen tehtävät koko luokallesi. Käytä eri vaikeustasoilla. Luo helpompia versioita aloittelijoille. Luo haastavampia versioita edistyneille.',
      },
      {
        id: '5',
        question: 'Millä Kielillä Kuvalajittelutehtävät Ovat Saatavilla - Kertotaulut Tulostettava ja Värityskuvia Lapsille Tulostettava Monikielisesti?',
        answer: '11 kieltä tuettu täysin. Suomi, englanti, saksa, ranska, espanja. Italia, portugali, hollanti, ruotsi. Tanska, norja. Sekä käyttöliittymä että sisältö mukautuvat valittuun kieleen. Luo kertotaulut tulostettava millä tahansa kielellä. Vaihda kieltä milloin tahansa. Luo sama tehtävä suomeksi. Vaihda englanniksi ja luo uudelleen.',
      },
      {
        id: '6',
        question: 'Voinko Myydä Luomiani Kuvalajittelutehtäviä - Yhteenlasku ja Vähennyslasku Tehtävät ja Esiopetus Materiaali Ilmainen Kaupallisesti?',
        answer: 'Kyllä. Täysi Käyttöoikeus sisältää täyden kaupallisen print-on-demand -lisenssin. Myy Etsyssä, Teachers Pay Teachers, Amazon KDP. Ei erillistä lisenssimaksua. Ei rojalteja. Rajaton myynti. Luo yhteenlasku ja vähennyslasku tehtävät myyntituotteiksi. 300 DPI laatu täyttää kaikki myyntialustojen vaatimukset. Ei attribuutiovaatimusta. Myy omalla brändilläsi.',
      },
      {
        id: '7',
        question: 'Kuinka Räätälöidä Kuvalajittelutehtävät Oppilailleni - Hienomotoriikka Harjoitukset ja Pisteestä Pisteeseen Tehtävät Personoituja?',
        answer: 'Räätälöinti on helppoa. Lataa omia kuvia. Käytä oppilaittesi valokuvia. Lisää luokkahuoneen esineitä. Tee tehtävistä merkityksellisiä lapsillesi. Luo hienomotoriikka harjoitukset henkilökohtaisilla kuvilla. Muokkaa kaikkea pohjalla. Siirrä lajittelukehyksiä. Muuta värejä. Lisää tekstielementtejä ohjeisiin. Seitsemän fonttia saatavilla.',
      },
      {
        id: '8',
        question: 'Mille Ikäryhmille Kuvalajittelutehtävät Sopivat - Kirjaimet Harjoittelu Esikoulu ja Kertotaulut Tulostettava Eri Tasoille?',
        answer: 'Kuvalajittelutehtävät toimivat 4-10-vuotiaille. Esiopetus (5-6v): yksinkertainen lajittelu värin, muodon mukaan. Alakoulu 1. luokka (6-7v): kategoriointi teemoittain. 2.-3. luokka (7-9v): monimutkainen lajittelu. Luo kirjaimet harjoittelu esikoulu nuoremmille. Säädä vaikeutta kuvan määrällä. 6 kuvaa yhteensä helpoin. 12 kuvaa yhteensä haastavin.',
      },
      {
        id: '9',
        question: 'Voinko Ladata Omia Kuvia Kuvalajittelutehtäviin - Lukemaan Oppiminen Tehtävät ja Yhteenlasku ja Vähennyslasku Tehtävät Omilla Kuvilla?',
        answer: 'Kyllä. Lataa useita kuvia kerralla. Kaikki yleisimmät muodot tuettu: JPEG, PNG, GIF. Klikkaa "Valitse tiedostot". Valitse useita kuvia. Lataa yhdellä kertaa. Luo lukemaan oppiminen tehtävät omilla sanastokuvilla. Yhdistä omat kuvat kirjaston kuviin. 3000+ kuvakirjasto täydennykseen.',
      },
      {
        id: '10',
        question: 'Kuinka Kauan Kuvalajittelutehtävän Luominen Kestää - Värityskuvia Lapsille Tulostettava ja Matematiikka Tehtävät Alakoulu Nopeasti?',
        answer: 'Alle 3 minuuttia alusta loppuun. Valitse kaksi teemaa (30 sekuntia). Klikkaa "Luo Tehtävä" (1 sekunti). Muokkaa tarvittaessa (1-2 minuuttia). Lataa PDF (10 sekuntia). Valmis. Luo värityskuvia lapsille tulostettava samalla nopeudella. Verrattuna manuaaliseen luomiseen: 25-40 minuuttia per tehtävä. Säästä 22-37 minuuttia per tehtävä.',
      },
      {
        id: '11',
        question: 'Sisältyykö Vastausavain - Esiopetus Materiaali Ilmainen ja Kertotaulut Tulostettava Ratkaisulla?',
        answer: 'Kyllä. Erillinen "Luo Vastausavain" -painike. Klikkaa luodaksesi vastausavaimen. Näyttää kuvat oikeissa kategorioissa. Vasemmassa ja oikeassa laatikossa. Täydellinen opettajan arviointiin. Luo esiopetus materiaali ilmainen vastausavaimilla. Lataa vastausavain erikseen. JPEG tai PDF muodossa.',
      },
      {
        id: '12',
        question: 'Voinko Luoda Kuvalajittelutehtäviä Tietyistä Aineista - Hienomotoriikka Harjoitukset ja Yhteenlasku ja Vähennyslasku Tehtävät Ainekohtaisesti?',
        answer: 'Kyllä. Kuvalajittelu toimii kaikissa aineissa. Matematiikka: lajittele parilliset/parittomat, plus/miinus, geometriset muodot. Lukeminen: lajittele substantiivit/verbit, vokaalit/konsonantit. Luo hienomotoriikka harjoitukset integroituna aineopetukseen. Tiede: lajittele eläimet/kasvit, nestemäinen/kiinteä, eläviä/elottomia.',
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
    guaranteeText: '30 päivän rahat takaisin -takuu',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Yhdistä Muihin Tehtävämonistegeneraattoreihin',
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä kuvalajittelutehtävät näihin täydentäviin generaattoreihin.',
    ctaTitle: 'Valmiina Luomaan Upeita Tehtävämonisteitä?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia tehtävämonisteitä. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
    primaryCtaText: 'Aloita Ilmainen Kokeilu',
    secondaryCtaText: 'Katso Kaikki 33 Sovellusta',
    badgeText: 'Toimii Hyvin Yhdessä',
    exploreText: 'Tutustu kaikkiin sovelluksiin',
    trustBadges: {
      guarantee: '30 päivän rahat takaisin -takuu',
      securePayment: 'Turvallinen maksu',
      cancelAnytime: 'Peruuta milloin tahansa',
    },
    items: [
      {
        id: '1',
        slug: 'coloring',
        name: 'Värityskuvat',
        category: 'Luovuus',
        icon: '🎨',
        description: 'Yhdistä kuvalajittelutehtävät värityskuviin kaksinkertaiseen oppimiskokemukseen.',
      },
      {
        id: '2',
        slug: 'matching-app',
        name: 'Yhdistä Parit',
        category: 'Kognitiivinen',
        icon: '🔗',
        description: 'Laajenna visuaalista oppimista yhdistämistehtävillä käsitteiden vahvistamiseen.',
      },
      {
        id: '3',
        slug: 'find-and-count',
        name: 'Etsi ja Laske',
        category: 'Matematiikka',
        icon: '🔢',
        description: 'Yhdistä laskeminen etsintätehtäviin visuaalisen numerotuntemuksen kehittämiseksi.',
      },
      {
        id: '4',
        slug: 'odd-one-out',
        name: 'Poikkea Joukosta',
        category: 'Logiikka',
        icon: '🔍',
        description: 'Kehitä kategorisointitaitoja tunnistamalla poikkeava kuva joukosta.',
      },
      {
        id: '5',
        slug: 'big-small-app',
        name: 'Iso ja Pieni',
        category: 'Vertailu',
        icon: '📏',
        description: 'Kehitä kokovertailutaitoja visuaalisten kokovertailutehtävien avulla.',
      },
      {
        id: '6',
        slug: 'more-less',
        name: 'Enemmän Vähemmän',
        category: 'Matematiikka',
        icon: '⚖️',
        description: 'Laajenna visuaalista oppimista lukumäärien vertailulla matematiikan harjoitteluun.',
      },
    ],
  },
};

export default pictureSortFiContent;
