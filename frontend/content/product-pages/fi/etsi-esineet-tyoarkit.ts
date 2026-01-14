import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Find Objects Worksheets - Finnish Content (Etsi Esineet -tehtävät)
 *
 * File: frontend/content/product-pages/fi/etsi-esineet-tyoarkit.ts
 * URL: /fi/apps/etsi-esineet-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/find-objects.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * FULL ACCESS APP - €240/year or €25/month (Täysi Pääsy)
 */

export const findObjectsFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'etsi-esineet-tyoarkit',
    appId: 'find-objects',
    title: 'Tulostettavat Tehtävät Lapsille Ilmainen - Etsi Kätketyt Esineet Esiopetus Materiaali Ilmainen',
    description: 'Luo ammattimaisia etsintätehtäviä Find Objects -työkalumallamme. Täysi Pääsy -tilauksesi antaa sinulle rajoittamattoman tehtävien luomisen ilman maksua tehtävää kohden. Generoi mukautettuja tulostettavia tehtäviä lapsille, jotka sopivat täydellisesti esiopetukseen ja alakoulun oppilaille.',
    keywords: 'tulostettavat tehtävät lapsille ilmainen, etsi kätketyt esineet, esiopetus materiaali ilmainen, hienomotoriikka harjoitukset, visuaalinen havainnointi, matematiikka tehtävät alakoulu',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/etsi-esineet-tyoarkit',
  },

  // Hero Section - FULL text from Finnish find-objects.md
  hero: {
    title: 'Etsi Esineet -tehtävät',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen - Etsi Kätketyt Esineet Esiopetus Materiaali Ilmainen',
    description: `Luo ammattimaisia etsintätehtäviä Find Objects -työkalumallamme. Täysi Pääsy -tilauksesi antaa sinulle rajoittamattoman tehtävien luomisen ilman maksua tehtävää kohden. Generoi mukautettuja tulostettavia tehtäviä lapsille, jotka sopivat täydellisesti esiopetukseen ja alakoulun oppilaille. Lataa korkealaatuiset PDF-tehtävät alle 3 minuutissa.

Find Objects -generaattorimme luo kaksi erityyppistä visuaalista havainnointi tehtävää. I Spy -tilassa lapset etsivät 1-5 kätkettyä esinettä 8-12 häiritsevan kuvan joukosta. Odd One Out -tilassa lapset löytävät parittomat kuvat 8-12 kuvaparrin joukosta. Molemmat toiminnot kehittävät visuaalista havainnointia ja tarkkaavaisuustaitoja.

Työkalumme sisältää yli 3000 lapsille sopivaa kuvaa 11 kielellä. Kuvien tiedostonimet ovat suomeksi, mikä tekee työkalusta erinomaisen kieltenoppimiseen. Täysi Pääsy -tilauksesi sisältää kaupallisen lisenssin, 11 kielen tuen ja ammattimaisen 300 DPI laadun. Luo tulostettavat tehtävät lapsille ilmainen hakusanalla, mutta Täysi Pääsy -tilaus antaa rajattomat mahdollisuudet.`,
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

  // Sample Gallery - REAL file paths from samples/english/find objects/
  samples: {
    sectionTitle: 'Etsi Esineet -tehtävät Esimerkit',
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

  // Use Cases - FULL text from Finnish find-objects.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille ja Vanhemmille - Tulostettavat Tehtävät Lapsille Ilmainen Kaikille Tarpeille',
    sectionDescription: 'Find Objects -generaattori palvelee laajaa käyttäjäkuntaa esiopetuksen opettajista kotiopettajiin. Jokainen käyttäjäryhmä hyötyy eri tavalla työkalun monipuolisuudesta. Täysi Pääsy -tilaus antaa kaikille pääsyn kaikkiin ominaisuuksiin ja kaupalliseen lisenssiin.',
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
    sectionTitle: 'Yhdistä Find Objects Muihin Tulostettavat Tehtävät Lapsille Ilmainen Työkaluihin',
    sectionDescription: 'LessonCraft Studio tarjoaa 33 työkalua opettajille. Yhdistä Find Objects -etsintätehtävät muihin työkaluihin luodaksesi täydellisiä oppimispaketteja. Täysi Pääsy -tilaus antaa pääsyn kaikkiin työkaluihin yhteen hintaan.',
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

export default findObjectsFiContent;
