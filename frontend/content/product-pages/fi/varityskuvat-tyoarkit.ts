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

  // Sample Gallery - REAL file paths from samples/english/coloring/
  samples: {
    sectionTitle: 'Värityskuvia Lapsille Esimerkit',
    sectionDescription: 'Lataa ilmaiset esimerkkivärityskuvat nähdäksesi ammattimaisen laatumme',
    downloadLabel: 'Lataa Ilmainen Esimerkki',
    worksheetLabel: 'Värityskuva',
    answerKeyLabel: 'Vastausavain',
    viewAllLabel: 'Katso suurempana',
    noPdfLabel: 'Vain esikatselu',
    freePdfCountLabel: 'ilmaista latausta',
    badgeText: 'Ilmaiset Esimerkit',
    downloadingLabel: 'Ladataan...',
    ofLabel: '/',
    items: [],
  },

  // Use Cases - FULL text from Finnish coloring.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille, Vanhemmille ja Kasvattajille',
    sectionDescription: 'Värityskuvasuunnittelijamme palvelee erilaisia käyttäjiä eri koulutusolosuhteissa. Esiopetuksen opettajat, alakoulun opettajat, kotiopettajat ja erikoisopettajat kaikki hyötyvät. Jokainen käyttäjätyyppi löytää ainutlaatuisia tapoja integroida värityskuvia lapsille tulostettava opetukseensa.',
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
    sectionTitle: 'Yhdistä Muihin Tehtävägeneraattoreihin',
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
    items: [],
  },
};

export default coloringFiContent;
