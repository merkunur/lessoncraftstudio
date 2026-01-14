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
    appId: 'image-addition',
    title: 'Yhteenlaskun Tehtävät Generaattori | Tulostettavat Matematiikka Tehtävät Alakoulu ja Esiopetus',
    description: 'Luo ammattimaisia yhteenlaskun tehtäviä kuvilla yhteenlaskugeneraattorillamme. Peruspaketti-tilauksesi antaa sinulle rajattoman tehtävien luonnin ilman maksuja per tehtävä. Generoi tulostettavia matematiikka tehtävät alakoulu ja esiopetus materiaali ilmainen -oppilaille.',
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

  // Sample Gallery - REAL file paths from samples/english/addition/
  samples: {
    sectionTitle: 'Yhteenlaskun Tehtävät Esimerkit',
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
    items: [],
  },

  // Use Cases - FULL text from Finnish addition.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille, Vanhemmille ja Kasvattajille',
    sectionDescription: 'Yhteenlaskutehtävägeneraattori palvelee erilaisia käyttäjäryhmiä koulutusjärjestelmän läpi. Esiopetuksen opettajista alakoulun opettajiin. Kotiopettajista erikoisopettajiin. Jokainen ryhmä hyötyy mukautetuista matematiikka tehtävät alakoulu -työkaluista. Peruspaketti-tilaus antaa kaikille pääsyn samoihin ammattimaisiin ominaisuuksiin.',
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
    sectionTitle: 'Yhdistä Muihin Työarkki Generaattoreihin',
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
    items: [],
  },
};

export default additionFiContent;
