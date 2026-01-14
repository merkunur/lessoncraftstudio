import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Math Puzzle Worksheets - Finnish Content (Matematiikkapulmat Tehtävät)
 *
 * File: frontend/content/product-pages/fi/matematiikkapulmat-tyoarkit.ts
 * URL: /fi/apps/matematiikkapulmat-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/math-puzzle.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Math Puzzle is a FULL ACCESS app ($240/year or $25/month)
 * Finnish: "Täysi Käyttöoikeus" = Full Access
 *
 * TRANSLATIONS VERIFIED:
 * - "Full Access" → "Täysi Käyttöoikeus"
 * - All UI labels in Finnish
 */

export const mathPuzzleFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'matematiikkapulmat-tyoarkit',
    appId: 'math-puzzle',
    title: 'Matematiikkapulmat Lapsille - Tulostettavat Tehtävät Ilmainen | Alakoulun Tehtävät',
    description: 'Luo ammattimaisia matematiikkapulmia yhteenlaskun ja vähennyslaskun harjoitteluun. Täysi Käyttöoikeus -tilauksesi antaa rajattoman tehtävien luomisen. Matematiikkapulmat sopivat esiopetukseen ja alakoulun 1-3 luokille.',
    keywords: 'matematiikkapulmat, tulostettavat tehtävät lapsille ilmainen, matematiikka tehtävät alakoulu, yhteenlasku ja vähennyslasku tehtävät, esiopetus materiaali ilmainen',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/matematiikkapulmat-tyoarkit',
  },

  // Hero Section - FULL text from Finnish math-puzzle.md
  hero: {
    title: 'Matematiikkapulmat Lapsille',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen - Yhteenlasku ja Vähennyslasku Tehtävät',
    description: `Luo ammattimaisia matemaattisia pulmatehtäviä yhteenlaskun ja vähennyslaskun harjoitteluun. Täysi Käyttöoikeus -tilauksesi (240 € vuodessa tai 25 € kuukaudessa) antaa rajattoman määrän tehtävien luomista ilman tehtäväkohtaisia maksuja. Generoi mukautettavia tulostettavia matematiikka tehtäviä alakoululaisille. Lataa korkealaatuiset PDF-tiedostot alle 3 minuutissa.

Matematiikkapulmat yhdistävät laskutehtävät visuaaliseen oppimiseen. Oppilaasi ratkaisevat yhteenlasku- ja vähennyslaskutehtäviä etsimällä oikeita lukuarvoja kuville. Jokaisessa pulmassa on 2×2 - 4×4 ruudukko. Kukin ruutu sisältää kuvan ja matemaattisen yhtälön. Oppilaat laskevat vastauksen ja yhdistävät sen oikeaan kuvaan.

Generaattori tukee esiopetuksesta 3. luokkaan. Valitse vaikeustaso säätämällä ruudukon kokoa ja laskutyyppiä. Käytä 3000+ lasten kuvakirjastoa. Lataa omat kuvat henkilökohtaista oppimista varten. Muokkaa kaikkea pohjalla olevalla editorilla. Jokaiselle tehtävälle luodaan automaattisesti vastausavain. Lataa sekä oppilastehtävä että opettajan vastausavain erikseen. Molemmat PDF- ja JPEG-muodoissa 300 DPI -tarkkuudella. Täysi Käyttöoikeus sisältää kaupalliset oikeudet. Myy tehtäviäsi Teachers Pay Teachers -palvelussa, Etsyssä tai Amazon KDP:ssä.`,
    previewImageSrc: '',
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

  // Sample Gallery - REAL file paths from samples/english/math puzzle/
  samples: {
    sectionTitle: 'Matematiikkapulmat Esimerkit',
    sectionDescription: 'Lataa ilmaiset esimerkkitehtävät nähdäksesi ammattimaisen laatumme',
    downloadLabel: 'Lataa Ilmainen Esimerkki',
    worksheetLabel: 'Tehtäväsivu',
    answerKeyLabel: 'Vastaussivu',
    viewAllLabel: 'Katso suurempana',
    noPdfLabel: 'Vain esikatselu',
    freePdfCountLabel: 'ilmaista latausta',
    badgeText: 'Ilmaiset Esimerkit',
    downloadingLabel: 'Ladataan...',
    ofLabel: '/',
    items: [],
  },

  // Use Cases - FULL text from Finnish math-puzzle.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille ja Vanhemmille - Matematiikka Tehtävät Alakoulu ja Tulostettavat Tehtävät Lapsille',
    sectionDescription: 'Matematiikkapulmageneraattori palvelee monia käyttäjiä. Esiopetuksen opettajat rakentavat laskutaitoja. Alakoulun opettajat vahvistavat matematiikan perusteita. Kotiopettajat luovat monipuolisia oppimispaketteja. Täysi Käyttöoikeus -tilaus (240 € vuodessa) antaa rajattoman pääsyn.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [],
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
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä matematiikkapulmat näihin täydentäviin generaattoreihin.',
    ctaTitle: 'Valmiina Luomaan Upeita Matematiikkapulmia?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia matematiikkapulmatehtäviä. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
    primaryCtaText: 'Aloita Ilmainen Kokeilu',
    secondaryCtaText: 'Katso Kaikki 33 Sovellusta',
    badgeText: 'Toimii Hyvin Yhdessä',
    exploreText: 'Tutustu kaikkiin sovelluksiin',
    trustBadges: {
      securePayment: 'Turvallinen maksu',
      cancelAnytime: 'Peruuta milloin tahansa',
    },
    items: [],
  },
};

export default mathPuzzleFiContent;
