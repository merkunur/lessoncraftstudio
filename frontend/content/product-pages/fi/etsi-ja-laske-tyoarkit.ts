import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Find and Count Worksheets - Finnish Content (Etsi ja Laske Tehtävät)
 *
 * File: frontend/content/product-pages/fi/etsi-ja-laske-tyoarkit.ts
 * URL: /fi/apps/etsi-ja-laske-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/find-and-count.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const findAndCountFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'etsi-ja-laske-tyoarkit',
    appId: 'find-and-count',
    title: 'Etsi ja Laske -tehtävät Generaattori | Tulostettavat Tehtävät Lapsille Ilmainen - Matematiikka Tehtävät Alakoulu',
    description: 'Luo ammattimaisia etsi ja laske -tehtäviä muutamassa minuutissa. Peruspaketti-tilauksesi antaa rajattoman tehtävien luomisen ilman tehtäväkohtaisia maksuja. Generoi tulostettavia etsi ja laske -tehtäviä täydellisiä esiopetukseen ja alakouluun.',
    keywords: 'etsi ja laske tehtävät, tulostettavat tehtävät lapsille ilmainen, matematiikka tehtävät alakoulu, esiopetus materiaali ilmainen, hienomotoriikka harjoitukset, visuaalinen havainnointi',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/etsi-ja-laske-tyoarkit',
  },

  // Hero Section - FULL text from Finnish find-and-count.md
  hero: {
    title: 'Etsi ja Laske -tehtävät',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen - Matematiikka Tehtävät Alakoulu',
    description: `Luo ammattimaisia etsi ja laske -tehtäviä muutamassa minuutissa. Peruspaketti-tilauksesi antaa rajattoman tehtävien luomisen ilman tehtäväkohtaisia maksuja. Generoi tulostettavia etsi ja laske -tehtäviä täydellisiä esiopetukseen ja alakouluun. Lataa laadukkaat PDF-tehtävät alle kolmessa minuutissa.

Etsi ja laske -tehtävät kehittävät laskutaitoja ja visuaalista havainnointia. Lapset etsivät ja laskevat tiettyjä kuvia ruudukosta. Tehtävät sopivat esiopetukseen ja alakoulun alimpiin luokkiin. Voit muokata jokaista elementtiä tehtävässä.

Generaattori käyttää 3000+ lapsille sopivaa kuvaa. Voit valita teemat tai yksittäiset kuvat. Voit myös ladata omia kuvia. Kaikki kuvat, taustat ja reunukset sisältyvät tilaukseen ilman lisämaksuja.

Jokainen tehtävä latautuu 300 DPI -laadulla. Täydellinen tulostamiseen ja myyntiin. PDF- ja JPEG-muodot saatavilla. Peruspaketti sisältää kaupallisen POD-lisenssin ilman lisäkustannuksia.`,
    previewImageSrc: '/samples/english/find and count/find and count portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/find and count/
  samples: {
    sectionTitle: 'Etsi ja Laske -tehtävät Esimerkit',
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
        worksheetSrc: '/samples/english/find and count/find and count portrait.jpeg',
        answerKeySrc: '/samples/english/find and count/find and count portrait answer_key.jpeg',
        altText: 'Etsi ja laske -tehtävä pystysuunnassa esiopetukseen ja alakouluun',
        pdfDownloadUrl: '/samples/english/find and count/find and count portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/find and count/find and count landscape.jpeg',
        answerKeySrc: '/samples/english/find and count/find and count landscape answer_key.jpeg',
        altText: 'Etsi ja laske -tehtävä vaakasuunnassa värikkäillä kuvilla',
        pdfDownloadUrl: '/samples/english/find and count/find and count landscape.pdf',
      },
    ],
  },

  // Features Grid - FULL text from Finnish find-and-count.md feature sections
  features: {
    sectionTitle: 'Etsi ja Laske -tehtävien Ominaisuudet - Kaikki Mitä Tarvitset Tulostettaviin Tehtäviin Lapsille Ilmainen',
    sectionDescription: 'Etsi ja laske -generaattori tarjoaa kaikki työkalut ammattimaisten tehtävien luomiseen. Voit luoda esiopetus materiaali ilmainen -tehtäviä tai alakoulun matematiikka tehtäviä. Jokainen ominaisuus on suunniteltu säästämään aikaasi. Peruspaketti-tilauksesi antaa täyden pääsyn kaikkiin näihin ammattimaisen tason työkaluihin.',
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
        title: 'Luo Tulostettavat Tehtävät Lapsille Kolmessa Klikkauksessa',
        description: `Valitse teema tai yksittäiset kuvat. Säädä ruudukon kokoa 5x5 - 10x10 välillä. Klikkaa "Luo tehtävä" -painiketta. Tehtäväsi on valmis alle kymmenessä sekunnissa.

Ei tarvitse suunnitteluosaamista. Ei monimutkaisia vaiheita. Generaattori tekee kaiken puolestasi. Valitse vain kuvat jotka haluat piilottaa tehtävään.

Voit luoda matematiikka tehtävät alakoulu -tehtäviä eri teemoista. Eläimet, ruoka, lelut, välineet. Yli 50 teemaa valittavana. Tai valitse täysin satunnaiset kuvat monipuolisempaan tehtävään. Tehtävä näkyy välittömästi esikatselussa. Voit muokata sitä ennen lataamista. Tai luo uusi tehtävä sekunneissa.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Muokkaa Kaikkea Esiopetus Materiaali Ilmainen -tehtävässä',
        description: `Jokainen elementti tehtävässä on muokattavissa. Vedä, kierrä, skaalaa mitä tahansa kuvaa. Poista tai lisää elementtejä vapaasti. Täysi hallinta lopputuloksesta.

Lisää tekstielementtejä mihin tahansa. Vaihda väriä, fonttia, kokoa. Siirrä tekstiä täsmälleen oikeaan paikkaan. Luo täysin räätälöityjä tehtäviä oppilaillesi.

Muuta taustaväriä tai lisää teemataustat. Säädä taustan läpinäkyvyyttä. Lisää reunuksia eri teemoista. Jokainen tehtävä näyttää ammattimaiselta. Tasaustyökalut auttavat järjestämään elementit. Kerrostyökalut hallitsevat päällekkäisyyksiä.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Lataa Omia Kuvia Matematiikka Tehtävät Alakoulu -tehtäviin',
        description: `Lataa useita tiedostoja kerralla. Kaikki yleiset muodot toimivat - JPEG, PNG, GIF. Yhdistä omat kuvasi kirjaston kuviin. Luo ainutlaatuisia tehtäviä oppilaidesi kiinnostuksen kohteiden mukaan.

Lataa luokkahuoneen kuvat. Lataa retkikuvia. Lataa oppilaiden lempihahmoja. Personointi lisää motivaatiota ja sitoutumista.

Omat kuvat toimivat täydellisesti generaattorissa. Vedä, kierrä, skaalaa samalla tavalla kuin kirjaston kuvia. Ei teknistä osaamista tarvita. Yksinkertainen vedä ja pudota -toiminto. Voit luoda teemakohtaisia tehtäväpaketteja. Oppilaat rakastavat tunnistaa tuttuja kuvia.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Tulostettavat Tehtävät Lapsille 11 Kielellä',
        description: `Käyttöliittymä toimii 11 kielellä. Suomi, englanti, saksa, ranska, espanja, italia, portugali, hollanti, ruotsi, tanska, norja. Vaihda kieltä milloin tahansa.

Kuvien tiedostonimet muuttuvat kielen mukaan. Tämä on tärkeää kielten opetuksessa. Kun valitset "eläimet" suomeksi, saat suomalaiset eläinten nimet. Kun vaihdat englantiin, tiedostonimet muuttuvat englanniksi.

Täydellinen ESL-opettajille ja kaksikielisille luokkahuoneille. Luo samoja tehtäviä eri kielillä. Oppilaat näkevät saman visuaalisen sisällön mutta eri kielellä. Kansainväliset koulut rakastavat tätä ominaisuutta.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kaupallinen POD-lisenssi Sisältyy Peruspakettiin',
        description: `Peruspaketti sisältää täyden kaupallisen print-on-demand -lisenssin. Ei lisämaksuja. Ei attribuutioita tarvita. Myy tehtäviäsi vapaasti.

Myy Etsyssä, Teachers Pay Teachers -palvelussa, Amazon KDP:ssä. Luo tehtävävihkoja. Luo digitaalisia latauksia. Luo tulostustehtäväpaketteja. Täydellinen opettajayrittäjille.

300 DPI -laatu takaa ammattimaisen lopputuloksen. Asiakkaasi saavat kristallinkirkkaat tulosteet. Ei pikselöityneitä kuvia. Ei epäselviä tekstejä. Kilpailijat veloittavat 50-200 dollaria vuodessa erillisestä kaupallisesta lisenssistä. Meidän lisenssimme sisältyy 144 euron vuosimaksuun.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Kuvien Kirjasto',
        description: `Pääsy yli 3000 lapsille sopivaan kuvaan. Järjestetty teemoittain helposti löydettäväksi. Eläimet, ruoka, lelut, välineet, ajoneuvot, kasvit. Yli 50 eri teemaa.

Hakutoiminto löytää kuvat nopeasti. Kirjoita "koira" ja näet kaikki koirakuvat. Kirjoita "omena" ja näet kaikki omenakuvat. Säästää aikaa selailulta.

Kaikki taustat sisältyvät. Yli 100 teemataustaa. Rantataustat, metsätaustat, avaruustaustat. Kaikki reunukset sisältyvät. Syntymäpäiväreunat, lomareunukset, vuodenaikareunukset. Kilpailijat veloittavat 1-5 dollaria per kuvakokoelma. Meillä kaikki 3000+ kuvaa sisältyvät tilaukseen.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Ammattimainen 300 DPI Laatu',
        description: `Jokainen tehtävä latautuu 300 DPI -tarkkuudella. Tämä on ammattimainen tulostustarkkuus. Täydellinen kotitulostimille ja kaupallisille tulostimille.

PDF- ja JPEG-muodot saatavilla. PDF säilyttää täydellisen laadun. JPEG toimii monissa sovelluksissa. Valitse muoto tarpeesi mukaan.

Harmaasävyvaihtoehto säästää mustetta. Täydellinen luokkahuoneisiin joissa tulostetaan paljon. Oppilaat voivat värittää tehtävät halutessaan. Yhdistää hienomotoriikka harjoitukset laskemisen kanssa. Kumoa ja tee uudelleen -toiminnot tekevät muokkauksesta helppoa.`,
        highlighted: true,
      },
      {
        id: '8',
        icon: '✅',
        title: 'Vastausavain Automaattisesti',
        description: `Generaattori luo automaattisesti vastausavaimen jokaiselle tehtävälle. Vastausavain näyttää oikeat määrät jokaiselle kuvalle. Opettajien ei tarvitse laskea itse. Välitön tarkistus.

Vastausavain latautuu erillisenä tiedostona. Klikkaa "Lataa vastausavain (PDF)". Saat erillisen PDF:n jossa on oikeat vastaukset. Pidä vastausavain itsellesi. Anna tehtävä oppilaille.

Vastausavain käyttää samaa 300 DPI -laatua. Tulostuu yhtä selkeästi kuin tehtävä. Ammattimaiset numerot ja muotoilu. Helppo lukea nopeaan tarkistukseen. Itsenäinen työskentely helpottuu.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from Finnish find-and-count.md step sections
  howTo: {
    sectionTitle: 'Kuinka Luoda Tulostettavat Tehtävät Lapsille Ilmainen 5 Helpossa Vaiheessa',
    sectionDescription: 'Etsi ja laske -tehtävien luominen on nopeaa ja yksinkertaista. Koko prosessi kestää alle kolme minuuttia. Ei suunnitteluosaamista tarvita. Ei monimutkaisia työkaluja. Viisi yksinkertaista vaihetta ammattimaisiin esiopetus materiaali ilmainen -tehtäviin.',
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
        description: `Aloita valitsemalla kuvat tehtävääsi. Kolme tapaa valita sisältö. Valitse teema nopeaan luomiseen. Valitse yksittäiset kuvat tarkempaan hallintaan. Tai lataa omia kuvia täydelliseen personointiin.

Teemavalinta on nopein tapa. Klikkaa "Kuvakirjasto" -painiketta. Selaa yli 50 teemaa. Eläimet, ruoka, lelut, välineet, ajoneuvot, kasvit. Valitse teema ja generaattori täyttää ruudukon automaattisesti.

Matematiikka tehtävät alakoulu toimivat hyvin teemavalinnalla. Valitse "Hedelmät" laskemaan omenoita ja banaaneja. Valitse "Eläimet" laskemaan kissoja ja koiria. Oppilaat rakastavat tunnistettavia kuvia. Voit vaihtaa kieltä tässä vaiheessa kielten opetukseen.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetukset',
        description: `Säädä tehtävän asetuksia tarpeisiisi. Ruudukon koko määrittää kuinka monta kuvaa tehtävässä on. Sivukoko määrittää tulostusmuodon. Kysymykset määrittävät mitä oppilaat laskevat.

Ruudukon rivit ja sarakkeet säätävät vaikeustasoa. 5x5 ruudukko = 25 kuvaa = helpompi esikouluun. 6x6 ruudukko = 36 kuvaa = keskivaikea 1. luokalle. 10x10 ruudukko = 100 kuvaa = vaikeampi vanhemmille lapsille.

Sivukoko määrittää tulostusmuodon. A4 Pysty on yleisin Euroopassa. Valitse mitkä kuvat oppilaat laskevat. Klikkaa "Etsi ja laske -kysymykset" -painiketta. Valitse 3-5 eri kuvaa kysymyksiksi.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Luo Tehtävä',
        description: `Klikkaa "Luo tehtävä" -painiketta. Generaattori luo tehtävän alle kymmenessä sekunnissa. Välitön esikatselu näyttää lopputuloksen. Tarkista että kaikki näyttää hyvältä.

Generaattori sijoittaa kuvat satunnaisesti ruudukkoon. Jokainen tehtävä on ainutlaatuinen. Luo sama tehtävä kahdesti ja kuvat ovat eri paikoissa. Täydellinen luokkahuoneisiin joissa tarvitaan useita versioita.

Laskentakysymykset näkyvät tehtävän alareunassa. "Kuinka monta omenaa näet?" Selkeät ohjeet lapsille. Jos tehtävä ei miellytä, luo uusi. Rajaton luominen tilauksellasi. Vastausavain luodaan automaattisesti.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Pohjalla',
        description: `Nyt muokkaa tehtävää täydelliseksi. Kaikki pohjalla on muokattavissa. Vedä kuvia uusiin paikkoihin. Kierrä kuvia. Skaalaa kuvia suuremmiksi tai pienemmiksi. Poista kuvia. Lisää uusia kuvia.

Lisää tekstielementtejä. Klikkaa "Lisää teksti" -painiketta. Kirjoita mitä tahansa haluat. Oppilaiden nimet. Luokkahuoneen numero. Erityisohjeet. Kannustavia viestejä.

Lisää taustateemat tehtävään. Klikkaa "Taustateema" -painiketta. Valitse yli 100 taustasta. Lisää reunuksia ammattimaiseen ulkoasuun. Käytä tasaustyökaluja täydelliseen asetteluun.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta',
        description: `Tehtäväsi on valmis. Aika ladata ja tulostaa. Kaksi muotovaihtoehtoa - PDF ja JPEG. Kaksi sisältövaihtoehtoa - tehtävä ja vastausavain. Molemmat ladataan korkealla 300 DPI -laadulla.

PDF-muoto on paras tulostamiseen. Säilyttää täydellisen laadun. Skaalautuu minkä tahansa kokoiseksi. JPEG-muoto toimii monissa sovelluksissa. Lisää PowerPointiin. Jaa sähköpostilla.

Harmaasävyvaihtoehto säästää mustetta dramaattisesti. Valitse "Harmaasävy" ennen lataamista. Täydellinen luokkahuoneisiin joissa tulostetaan paljon. Jaa digitaalisesti Google Classroomiin tai Microsoft Teamsiin.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish find-and-count.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille, Vanhemmille ja Kasvattajille',
    sectionDescription: 'Etsi ja laske -generaattori palvelee monenlaisia käyttäjiä. Esiopettajat luovat matematiikka tehtävät alakoulu -materiaaleja. Kotiopettajavanhemmat räätälöivät tehtäviä lapsilleen. Erityisopettajat eriyttävät tehtäviä oppilaidensa tasoille. Peruspaketti-tilaus palvelee kaikkia näitä ryhmiä tasavertaisesti.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Esiopetuksen Opettajat',
        subtitle: 'Esiopetus Materiaali Ilmainen ja Visuaalinen Havainnointi',
        description: `Esiopetuksen opettajat tarvitsevat ikätasoisia laskentatehtäviä. 6-vuotiaat lapset oppivat laskemaan 1-10. Visuaaliset tehtävät toimivat paremmin kuin abstraktit numerot. Etsi ja laske -tehtävät ovat täydellisiä tälle ikäryhmälle.

Pienemmät ruudukot 5x5 tai 6x6 sopivat esiopetukseen. Vähemmän kuvia = helpompi laskea. Suuremmat, selkeät kuvat auttavat tunnistamista. Teemavalinta pitää tehtävät kiinnostavina.

Voit yhdistää etsi ja laske -tehtävät muihin hienomotoriikka harjoitukset -aktiviteetteihin. Oppilaat voivat värittää tehtävät laskennan jälkeen. Harmaasävytuloste säästää mustetta ja rohkaisee värittämiseen.`,
        quote: 'Oppilaani rakastavat etsi ja laske -tehtäviä!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun Opettajat 1.-3. Luokka',
        subtitle: 'Matematiikka Tehtävät Alakoulu Eri Vaikeustasoille',
        description: `Alakoulun opettajat 1.-3. luokalla tarvitsevat eriytettyjä laskentatehtäviä. Oppilaat ovat eri tasoilla. Jotkut laskevat 1-10. Jotkut laskevat 1-50. Jotkut laskevat 1-100. Generaattori luo tehtäviä kaikille tasoille.

Säädä ruudukon kokoa vaikeustason muuttamiseksi. 6x6 helpommille oppilaille. 8x8 keskitason oppilaille. 10x10 edistyneemmille oppilaille. Kaikki saman teeman sisällä. Eriyttäminen tehty helpoksi.

Opettajat voivat luoda eri versioita samoista tehtävistä. Luo viisi versiota samalla teemalla. Kuvat ovat eri paikoissa jokaisessa versiossa. Oppilaat eivät voi kopioida naapuriltaan.`,
        quote: 'Eriyttäminen on nyt helppoa ja nopeaa.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajavanhemmat',
        subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen Monelle Lapselle',
        description: `Kotiopettajavanhemmat opettavat usein useita lapsia eri tasoilla. 6-vuotias tarvitsee helppoja tehtäviä. 8-vuotias tarvitsee keskitason tehtäviä. 10-vuotias tarvitsee haastavia tehtäviä. Generaattori luo tehtäviä kaikille kerralla.

Luo kolme versiota samasta teemasta eri ruudukkokoolla. 5x5 nuorimmalle. 7x7 keskimmäiselle. 10x10 vanhimmalle. Kaikki laskevat eläimiä mutta eri vaikeustasolla. Tehokas eriyttäminen.

Kotiopetus hyötyy personoinnista valtavasti. Lataa perheen lemmikkien kuvia. Lataa perheen lempiruokien kuvia. Tehtävät muuttuvat henkilökohtaisiksi ja merkityksellisiksi.`,
        quote: 'Yksi työkalu kattaa kaikkien lasteni vuosiluokat.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'ESL ja Kielten Opettajat',
        subtitle: 'Monikielinen Esiopetus Materiaali 11 Kielellä',
        description: `ESL-opettajat ja vieraan kielen opettajat rakastavat 11 kielen tukea. Opeta englantia suomalaisille lapsille. Opeta suomea maahanmuuttajalapsille. Opeta ruotsia kaksikielisessä luokassa. Generaattori tukee kaikkia skenaarioita.

Kuvien tiedostonimet muuttuvat kielen mukaan. Valitse "eläimet" englanniksi = englanninkieliset eläinten nimet. Valitse "eläimet" suomeksi = suomenkieliset eläinten nimet. Sanasto oppii visuaalisten vihjeiden kautta.

Luo rinnakkaisia tehtäviä eri kielillä. Sama teema englanniksi ja suomeksi. Oppilaat näkevät että sanat ovat erilaisia mutta kuvat samat.`,
        quote: 'Monikielisyystuki on ratkaisevaa luokkahuoneessani.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Eriyttäminen ja Hienomotoriikka Harjoitukset Yksilöllisiin Tarpeisiin',
        description: `Erityisopettajat tarvitsevat korkeasti räätälöityjä materiaaleja. Jokainen oppilas on ainutlaatuinen. Jokaisella on eri vahvuudet ja haasteet. Generaattori antaa täydellisen hallinnan eriyttämiseen.

Säädä ruudukon kokoa tarkasti oppilaan tasolle. 5x5 hyvin pienille laskijoille. Jopa 3x3 jos tarvitaan. Tai 10x10 edistyneemmille oppilaille. Tarkka mukauttaminen mahdollista.

Personoi tehtävät täysin oppilaan kiinnostuksen kohteiden mukaan. Oppilas rakastaa dinosauruksia? Lataa dinosauruskuvia. Motivaatio kasvaa eksponentiaalisesti personoinnin myötä.`,
        quote: 'Voin nopeasti mukauttaa tehtäviä jokaisen oppilaan tarpeisiin.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy Tehtäviä Teachers Pay Teachersissa',
        description: `Opettajayrittäjät myyvät tehtäviä Teachers Pay Teachers -palvelussa, Etsyssä ja Amazon KDP:ssä. Etsi ja laske -tehtävät myyvät erinomaisesti. Vanhemmat ja opettajat etsivät näitä tehtäviä jatkuvasti.

Peruspaketti sisältää täyden kaupallisen POD-lisenssin. Ei lisämaksuja. Ei kuukausimaksuja. Ei attribuutioita. Myy vapaasti kaikilla alustoilla. 144 euroa vuodessa = rajaton myyntipotentiaali.

Luo tehtävävihkoja myytäväksi. 20 etsi ja laske -tehtävää per vihko. Temaattiset vihot myyvät parhaiten. Monet opettajat ansaitsevat 500-2000 euroa kuukaudessa sivutulona.`,
        quote: 'Tilaukseni maksoi itsensä takaisin ensimmäisessä kuussa!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from Finnish find-and-count.md
  faq: {
    sectionTitle: 'Usein Kysytyt Kysymykset',
    sectionDescription: 'Yleisimmät kysymykset etsi ja laske -tehtävägeneraattorista ja tulostettavista tehtävistä.',
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
        question: 'Onko Tämä Etsi ja Laske -generaattori Todella Ilmainen Käyttää?',
        answer: 'Etsi ja laske -tehtävägeneraattori vaatii Peruspaketti-tilauksen joka maksaa 144 euroa vuodessa tai 15 euroa kuukaudessa. Tilauksesi antaa rajattoman tehtävien luomisen ilman tehtäväkohtaisia maksuja. Luo niin monta matematiikka tehtävät alakoulu -tehtävää kuin tarvitset ilman lisäkustannuksia. "Ilmainen" tarkoittaa että luot rajattomasti ilman per-tehtävä maksuja.',
      },
      {
        id: '2',
        question: 'Voinko Tulostaa Etsi ja Laske -tehtäviä Kotona Tavallisella Tulostimella?',
        answer: 'Kyllä. Etsi ja laske -tehtävät tulostuvat täydellisesti tavallisilla kotitulostimilla. 300 DPI -laatu takaa terävät tulosteet. Toimii inkjet- ja lasertulostimilla. Toimii väri- ja mustavalkotulostimilla. Harmaasävyvaihtoehto säästää mustetta dramaattisesti.',
      },
      {
        id: '3',
        question: 'Tarvitsenko Suunnitteluosaamista Luodakseni Etsi ja Laske -tehtäviä?',
        answer: 'Ei. Etsi ja laske -generaattori on suunniteltu opettajille, ei suunnittelijoille. Ei Photoshop-osaamista tarvita. Ei taittotyökaluja. Kolme vaihetta ammattimaisiin tehtäviin: Valitse teema. Säädä ruudukon koko. Klikkaa "Luo tehtävä". Valmis. Näet tuloksen välittömästi.',
      },
      {
        id: '4',
        question: 'Voinko Käyttää Etsi ja Laske -tehtäviä Luokkahuoneessani Oppilaille?',
        answer: 'Kyllä. Peruspaketti-tilaus sisältää rajattoman luokkahuonekäytön. Tulosta niin monta kopiota kuin tarvitset oppilaillesi. Ei rajoituksia oppilasmäärään. Jaa digitaalisesti Google Classroomissa, Microsoft Teamsissa tai Seesaw-palvelussa.',
      },
      {
        id: '5',
        question: 'Millä Kielillä Etsi ja Laske -tehtävät Ovat Saatavilla?',
        answer: 'Etsi ja laske -generaattori tukee 11 kieltä. Suomi, englanti, saksa, ranska, espanja, italia, portugali, hollanti, ruotsi, tanska, norja. Käyttöliittymä ja sisältö molemmissa kielissä. Kielenvaihto muuttaa kuvien tiedostonimiä. Täydellinen ESL-opettajille ja kaksikielisille luokkahuoneille.',
      },
      {
        id: '6',
        question: 'Voinko Myydä Luomiani Etsi ja Laske -tehtäviä?',
        answer: 'Kyllä. Peruspaketti-tilaus sisältää täyden kaupallisen print-on-demand -lisensoinnin ilman lisäkustannuksia. Myy Teachers Pay Teachers -palvelussa, Etsyssä, Amazon KDP:ssä. Ei attribuutioita tarvita. Pidä kaikki voitot. 300 DPI -laatu varmistaa tyytyväiset asiakkaat.',
      },
      {
        id: '7',
        question: 'Kuinka Mukautan Etsi ja Laske -tehtäviä Oppilailleni?',
        answer: 'Säädä ruudukon kokoa vaikeustason muuttamiseksi. 5x5 esiopetukseen. 6x6 1. luokalle. 8x8 2. luokalle. 10x10 3. luokalle. Valitse teemat oppilaiden kiinnostuksen mukaan. Lataa omia kuvia täydelliseen mukauttamiseen. Lisää tekstielementtejä henkilökohtaisiin viesteihin.',
      },
      {
        id: '8',
        question: 'Mille Ikäryhmille Etsi ja Laske -tehtävät Sopivat Parhaiten?',
        answer: 'Etsi ja laske -tehtävät toimivat 5-10-vuotiaille. Esiopetus (6-vuotiaat) käyttää pieniä ruudukoita 5x5 tai 6x6. 1. luokka (7-vuotiaat) käyttää 6x6 tai 7x7. 2.-3. luokka (8-10-vuotiaat) käyttää 8x8 tai 10x10. Erityisopetus voi käyttää kaikenikäisille säätämällä vaikeustasoa yksilöllisesti.',
      },
      {
        id: '9',
        question: 'Voinko Ladata Omia Kuvia Etsi ja Laske -tehtäviin?',
        answer: 'Kyllä. Etsi ja laske -generaattori tukee monilatauksia. Lataa useita kuvia kerralla. JPEG, PNG, GIF -muodot toimivat kaikki. Yhdistä omat kuvat kirjaston 3000+ kuvaan. Luo täysin ainutlaatuisia tehtäviä oppilaidesi kiinnostuksen kohteiden mukaan.',
      },
      {
        id: '10',
        question: 'Kuinka Kauan Etsi ja Laske -tehtävän Luominen Kestää?',
        answer: 'Yksinkertainen tehtävä alle kahdessa minuutissa. Valitse teema (20 sekuntia). Säädä ruudukon koko (10 sekuntia). Klikkaa "Luo tehtävä" (5 sekuntia). Lataa PDF (10 sekuntia). Yhteensä 45 sekuntia. Mukautettu tehtävä 3-5 minuutissa. Generaattori on 10-20 kertaa nopeampi kuin perinteinen tehtävien tekeminen.',
      },
      {
        id: '11',
        question: 'Sisältävätkö Etsi ja Laske -tehtävät Vastausavaimet?',
        answer: 'Kyllä. Jokainen etsi ja laske -tehtävä sisältää automaattisen vastausavaimen. Näyttää oikeat määrät jokaiselle kuvalle. Opettajien ei tarvitse laskea itse. Vastausavain latautuu erillisenä tiedostona. Klikkaa "Lataa vastausavain (PDF)". Vastausavain käyttää samaa 300 DPI -laatua.',
      },
      {
        id: '12',
        question: 'Voinko Luoda Tehtäviä Tietyistä Kouluaineista?',
        answer: 'Kyllä. Yli 50 teemaa kattavat kaikki pääaineet. Matematiikka = numerot, muodot, kuviot. Tiede = eläimet, kasvit, sää, avaruus. Sosiaaliset aineet = ammatit, rakennukset, kulkuneuvot. Kieliaineet toimivat erinomaisesti. 11 kieltä sisällön luomiseen. Lataa omia kuvia erikoisaiheisiin.',
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
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Yhdistä Muihin Työarkki Generaattoreihin',
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä etsi ja laske -työarkit näihin täydentäviin generaattoreihin.',
    ctaTitle: 'Valmiina Luomaan Upeita Työarkkeja?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia työarkkeja. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
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
        slug: 'image-addition',
        name: 'Yhteenlasku',
        category: 'Matematiikka',
        icon: '➕',
        description: 'Yhdistä visuaalinen laskenta yhteenlaskuharjoitteluun täydelliseen peruslaskuoperaatioiden hallintaan.',
      },
      {
        id: '2',
        slug: 'subtraction',
        name: 'Vähennyslasku',
        category: 'Matematiikka',
        icon: '➖',
        description: 'Täydennä laskentaharjoittelua vähennyslaskutehtävillä matemaattisten taitojen kehittämiseksi.',
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
        slug: 'coloring',
        name: 'Värityskuvat',
        category: 'Luovuus',
        icon: '🎨',
        description: 'Palkitse valmiit laskentatehtävät teemaattisilla värityskuvilla, jotka kehittävät hienomotoriikkaa.',
      },
      {
        id: '5',
        slug: 'connect-dots',
        name: 'Pisteestä Pisteeseen',
        category: 'Hienomotoriikka',
        icon: '🔗',
        description: 'Kehitä numerojärjestyksen ymmärtämistä ja käden hallintaa hauskoilla pisteestä pisteeseen -tehtävillä.',
      },
      {
        id: '6',
        slug: 'chart-count',
        name: 'Taulukon Laskenta',
        category: 'Matematiikka',
        icon: '📊',
        description: 'Opeta taulukoiden lukemista ja tulkintaa visuaalisilla laskentatehtävillä.',
      },
    ],
  },
};

export default findAndCountFiContent;
