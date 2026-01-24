import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Prepositions Worksheets - Finnish Content (Prepositioharjoitukset)
 *
 * File: frontend/content/product-pages/fi/prepositio-tyoarkit.ts
 * URL: /fi/apps/prepositio-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/prepositions.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * TRANSLATIONS VERIFIED:
 * - "Full Access" → "Täysi Käyttöoikeus" (from messages/fi.json)
 * - Prepositions is a FULL ACCESS app ($240/year), NOT Core Bundle
 * - All UI labels in Finnish
 */

export const prepositionsFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'prepositio-tyoarkit',
    appId: 'prepositions',
    title: 'Prepositioharjoitukset - Tulostettavat Tehtävät Lapsille Ilmainen | Esiopetus Materiaali',
    description: 'Luo ammattimaisia prepositioharjoituksia alakoululaisille ja esikoululaisille. Täysi Käyttöoikeus -tilauksesi antaa rajattoman mahdollisuuden luoda tulostettavia tehtäviä lapsille. Prepositioharjoitukset sopivat täydellisesti esiopetukseen ja alakoulun 1-3 luokille.',
    keywords: 'prepositioharjoitukset, tulostettavat tehtävät lapsille ilmainen, esiopetus materiaali ilmainen, sijaintisanat, prepositiot lapsille, kielioppi tehtävät',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/prepositio-tyoarkit',
  },

  // Hero Section - FULL text from Finnish prepositions.md
  hero: {
    title: 'Prepositioharjoitukset',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen - Esiopetus Materiaali',
    description: `Luo ammattimaisia prepositioiden harjoittelutehtäviä alakoululaisille ja esikoululaisille. Täysi Käyttöoikeus -tilaus antaa sinulle rajoittamattoman mahdollisuuden luoda tehtäviä ilman maksuja yksittäisistä tehtävistä. Generoi tulostettavia prepositioharjoituksia, jotka opettavat sijaintisuhteita hauska tavalla. Lataa korkealaatuiset PDF-tehtävät alle kolmessa minuutissa.

Prepositioiden tehtävägeneraattori tukee kahta harjoitustyyppiä. Valitse täydennysharjoitukset tai monivalintatehtävät. Molemmat muodot auttavat lapsia oppimaan sijaintisanat konkreettisten esimerkkien avulla. Tehtävät sopivat 1. luokasta 3. luokkaan sekä esiopetukseen.

Generaattori sisältää yli 3000 lapsille sopivaa kuvaa. Kaikki kuvat on järjestetty teemoittain helppoa valintaa varten. Valitse yksittäisiä kuvia tai anna generaattorin valita satunnaisesti kaikista teemoista. Voit myös ladata omia kuvia personoidaksesi tehtävät oppilaillesi.`,
    previewImageSrc: '/samples/english/prepositions/prepositions_worksheet.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/prepositions/
  samples: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Ilmaiset Työarkit ja Ilmaiset Tulosteet',
    sectionDescription: 'Lataa ilmaiset tulosteet - Ilmainen työarkki lapsille ammattimaista laatua. Ilmaiset työarkit ja työarkki lapsille täydellinen työarkki esiopetukseen. Ilmainen työarkki lapsille ja työarkki lapsille sisältää ilmaiset tulosteet ja ilmaiset työarkit opetusmateriaalin. Ilmainen työarkki ja työarkki esiopetukseen saatavilla',
    downloadLabel: 'Lataa Ilmainen Esimerkki',
    worksheetLabel: 'Tehtäväsivu',
    answerKeyLabel: 'Vastaussivu',
    viewAllLabel: 'Katso suurempana',
    noPdfLabel: 'Vain esikatselu',
    freePdfCountLabel: 'ilmaista latausta',
    badgeText: 'Ilmaiset Esimerkit',
    downloadingLabel: 'Ladataan...',
    ofLabel: '/',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/prepositions/prepositions_worksheet.jpeg',
        answerKeySrc: '/samples/english/prepositions/prepositions_answer_key.jpeg',
        altText: 'Prepositioharjoitus täydennystyypillä sijaintisanojen oppimiseen',
        pdfDownloadUrl: '/samples/english/prepositions/prepositions_worksheet.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/prepositions/prepositions multiple choice.jpeg',
        answerKeySrc: '/samples/english/prepositions/prepositions multiple choice answer_key.jpeg',
        altText: 'Prepositioharjoitus monivalintatyypillä aloittelijoille',
        pdfDownloadUrl: '/samples/english/prepositions/prepositions multiple choice.pdf',
      },
    ],
  },

  // Features Grid - FULL text from Finnish prepositions.md feature sections
  features: {
    sectionTitle: 'Ilmaiset Työarkit ja Työarkki Lapsille - Ilmaiset Tulosteet ja Työarkki Esiopetukseen',
    sectionDescription: 'Prepositioiden tehtävägeneraattori tarjoaa kattavat työkalut opettajille ja vanhemmille. Täysi Käyttöoikeus -tilaus antaa pääsyn kaikkiin ominaisuuksiin ilman rajoituksia. Luo esiopetuksen materiaaleja, alakoulun tehtäviä ja kielenoppimisen harjoituksia yhdellä alustalla. Kaikki ominaisuudet on suunniteltu helpottamaan opettajien arkea ja säästämään aikaa.',
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
        title: 'Luo Tulostettavia Tehtäviä Kolmella Klikkauksella',
        description: `Prepositioiden tehtävien luominen on uskomattoman yksinkertaista. Valitse harjoitusten määrä yhdestä kahdeksaan tehtävää per työarkki. Valitse prepositiot, joita haluat harjoitella. Napsauta "Generoi" ja tehtävä on valmis. Koko prosessi kestää alle kolme minuuttia alusta loppuun.

Valitse kahdesta harjoitustyypistä. Täydennysharjoitukset sopivat itsenäiseen työskentelyyn. Monivalintatehtävät tarjoavat tukea vaikeuksissa oleville oppilaille. Molemmat muodot luodaan samoista kuvista ja teemoista. Vaihda harjoitustyyppiä yhdellä klikkauksella.

Generaattori luo automaattisesti vastausavaimen. Napsauta "Vastausavain" -välilehteä nähdäksesi oikeat vastaukset. Vastausavain säästää aikaa tarkistamisessa. Tulosta vastausavain erikseen tai pidä se digitaalisena.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Muokkaa Kaikkea Työalueella',
        description: `Jokainen elementti tehtävällä on täysin muokattavissa. Vedä kuvia uusiin paikkoihin hiirellä. Muuta kokoa vetämällä kulmista. Kierrä objekteja täydelliseen asentoon. Poista tarpeettomat elementit yhdellä klikkauksella.

Lisää omia tekstejä tehtävään milloin tahansa. Muuta tekstin kokoa, väriä ja fonttia. Valitse seitsemästä lapsille sopivasta fontista. Säädä tekstin ääriviivaa parempaan luettavuuteen. Kaikki tekstit mukautuvat valitsemaasi kieleen.

Järjestä elementtejä kerrosjärjestyksessä. Tuo elementtejä etualalle tai lähetä taustalle. Tasaa objekteja toisiinsa nähden tai sivun reunoihin. Kohdistustyökalut nopeuttavat siistin asettelun luomista.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Lataa Omia Kuvia',
        description: `Lataa omia kuvia suoraan generaattoriin. Tukee JPEG-, PNG- ja GIF-muotoja. Lataa useita tiedostoja kerralla nopeaan työskentelyyn. Kuvat näkyvät välittömästi kuvagalleriassa.

Yhdistä omat kuvasi kirjaston kuviin. Luo personoituja tehtäviä oppilaidesi kiinnostuksen kohteiden mukaan. Lataa luokkahuoneen esineiden kuvia konkreettiseen oppimiseen. Käytä oppilaiden nimiä ja tuttuja paikkoja prepositioharjoituksissa.

Omat kuvat sopivat erityisesti monikielisiin luokkahuoneisiin. Kuvaa luokkahuoneen esineitä ja luo niistä sanastoa. Lataa kulttuurisesti merkityksellisiä kuvia maahanmuuttajaoppilaille. Personoidut kuvat lisäävät oppilaiden sitoutumista tehtäviin.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Kielen Tuki',
        description: `Generaattori toimii täydellä tuella 11 kielellä. Valitse suomi, ruotsi, englanti, saksa, ranska, espanja, portugali, italia, hollanti, tanska tai norja. Sekä käyttöliittymä että tehtävien sisältö mukautuvat valittuun kieleen. Kielivalinta vaikuttaa prepositiolauseisiin automaattisesti.

Kuvien tiedostonimet generoivat lauseita valitulla kielellä. Jokainen kuva sisältää metatiedot kaikilla 11 kielellä. Lauseet muodostuvat automaattisesti oikealla kieliopilla. Ei tarvetta kääntää tehtäviä manuaalisesti.

Täydellinen ESL- ja kielenoppimisen opettajille. Luo samoja tehtäviä eri kielillä vertailua varten. Opeta prepositioita äidinkielellä ennen vierasta kieltä. Vahvista kielitaitoa konkreettisten esimerkkien avulla.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kaupalliset Oikeudet Sisältyvät',
        description: `Täysi Käyttöoikeus -tilaus sisältää täyden kaupallisen POD-lisenssin ilman lisäkuluja. Myy luomiasi tehtäviä Teachers Pay Teachersissa, Etsyssä tai Amazon KDP:ssä. Ei tekijänoikeusmerkintöjä tarvita. Täydellinen opettajayrittäjille, jotka haluavat ansaita lisätuloja.

Monet opettajat ansaitsevat 500-5000 euroa kuukaudessa myymällä tehtäviä. Luo tehtäväpaketteja eri teemoista ja prepositioista. Myy digitaalisia tulostettavia materiaaleja passiivisena tulona. Generaattori nopeuttaa tuotekehitystä valtavasti.

Kilpailijoiden alustat veloittavat 79-199 euroa vuodessa lisensseistä erikseen. LessonCraft Studion Täysi Käyttöoikeus sisältää kaupalliset oikeudet hintaan 240 euroa vuodessa. Säästät 100-200 euroa vuodessa verrattuna muihin alustoihin.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Yli 3000 Lapsille Sopivaa Kuvaa',
        description: `Kuvasto sisältää yli 3000 huolellisesti valittua kuvaa. Kaikki kuvat on suunniteltu lapsille sopiviksi ja opettavaisiksi. Teemapohjaiset kokoelmat helpottavat oikeiden kuvien löytämistä. Selaa teemoja tai valitse yksittäisiä kuvia manuaalisesti.

Prepositioihin sopivat kuvat esittävät sijaintisuhteita selkeästi. Esineet, eläimet ja hahmot eri paikoissa. Kuvat auttavat lapsia ymmärtämään abstrakteja käsitteitä konkreettisesti. Visuaalinen oppiminen tehostaa muistamista.

Manuaalinen valinta antaa täyden kontrollin. Valitse tietyt kuvat tiettyjen prepositioiden harjoitteluun. Luo temaattisia tehtäväpaketteja. Yhdistä aiheeseen sopivia kuvia muuhun opetukseen.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Ammattimainen 300 DPI -Laatu',
        description: `Kaikki tehtävät viedään ammattilaatuisella 300 DPI tarkkuudella. Täydellinen laatu kotitulostimilla ja ammattitulostimilla. Tekstit pysyvät terävänä ja luettavana. Kuvat näyttävät ammattimaisilta tulostetussa muodossa.

Valitse PDF- tai JPEG-vientimuoto. PDF säilyttää vektorigrafiikan terävänä kaikissa koissa. JPEG sopii suoraan jakamiseen digitaalisesti. Molemmat muodot tukevat 300 DPI laatua.

Harmaasävyvaihtoehto säästää värimustetta. Muunna värilliset tehtävät mustavalkoisiksi yhdellä klikkauksella. Oppilaat voivat värittää mustavalkoisia versioita. Säästä kymmeniä euroja mustekustannuksissa vuodessa.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from Finnish prepositions.md step sections
  howTo: {
    sectionTitle: 'Ilmainen Työarkki Lapsille Luoda - Työarkki Esiopetukseen',
    sectionDescription: 'Prepositioiden tehtävien luominen vie alle kolme minuuttia alusta loppuun. Täysi Käyttöoikeus -tilaus antaa sinulle rajoittamattoman pääsyn kaikkiin ominaisuuksiin. Viisi yksinkertaista vaihetta johtavat valmiiseen tehtävään. Ei suunnittelutaitoja tai teknistä osaamista tarvita. Seuraa näitä ohjeita luodaksesi ensimmäisen tehtäväsi minuuteissa.',
    ctaText: 'Aloita Luominen Nyt',
    badgeText: 'Näin Se Toimii',
    stepLabel: 'Vaihe',
    completionTitle: 'Valmis!',
    completionSubtitle: 'Prepositioharjoituksesi on valmis',
    readyTime: 'Valmis alle 3 minuutissa',
    noSkillsNeeded: 'Ei suunnitteluosaamista tarvita',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Valitse Sisältö Prepositioharjoituksiin',
        description: `Aloita valitsemalla harjoitusten määrä. Säädä liukusäädintä 1-8 harjoituksen välillä per työarkki. Enemmän harjoituksia sopii pidempiin tuntijaksoihin. Vähemmän harjoituksia toimii lyhyempiin istuntoihin tai nuoremmille oppilaille.

Valitse harjoitustyyppi kahdesta vaihtoehdosta. Täydennysharjoitukset jättävät tyhjän tilan oikealle prepositiolle. Oppilaat kirjoittavat vastauksen itse. Tämä muoto sopii itsenäiseen työskentelyyn ja arviointiin.

Monivalintatehtävät tarjoavat useita vaihtoehtoja. Oppilaat valitsevat oikean preposition annetuista vaihtoehdoista. Tämä muoto sopii paremmin aloittelijoille ja tukea tarvitseville. Vähentää kirjoittamisen tarvetta ja tarjoaa vihjeitä.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetuksia',
        description: `Valitse paperikoko tehtävälle. Letter Portrait sopii amerikkalaisiin tulostimiin. A4 Portrait on eurooppalainen standardi. Landscape-muodot sopivat laajempiin asetteluihin. Neliömuoto toimii sosiaalisessa mediassa.

Valitse taustateema tehtävälle. Selaa yli 3000 taustakuvaa teemoittain. Valitse aiheeseen sopiva tausta. Säädä taustan läpinäkyvyyttä luettavuuden takaamiseksi. Tyhjä tausta säästää mustetta tulostuksessa.

Lisää reunukset tehtävän ympärille. Selaa reunustyylejä teemoittain. Valitse lapsille houkutteleva reunus. Reunukset tekevät tehtävistä visuaalisesti kiinnostavampia.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generoi Tehtävä',
        description: `Napsauta "Generoi" -painiketta luodaksesi tehtävän. Generaattori luo tehtävän alle 3 sekunnissa. Näet välittömän esikatselun tehtävästä pohjalla. Kaikki elementit näkyvät täsmälleen kuten tulostetussa versiossa.

Generaattori valitsee automaattisesti sopivat kuvat. Jokainen kuva esittää eri sijaintisuhteen. Prepositiolauseet muodostuvat automaattisesti valitulla kielellä. Kaikki prepositiot ovat kieliopillisesti oikein.

Vastausavain luodaan automaattisesti. Napsauta "Vastausavain" -välilehteä nähdäksesi vastaukset. Vastausavain näyttää kaikki oikeat prepositiot. Tulosta vastausavain erikseen nopeaa tarkistusta varten.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Työalueella',
        description: `Jokainen elementti tehtävällä on täysin muokattavissa. Napsauta mitä tahansa kuvaa, tekstiä tai muotoa valitaksesi sen. Valitun objektin ympärille ilmestyy reunus. Muokkaustyökalut aktivoituvat automaattisesti.

Siirrä elementtejä vetämällä hiirellä. Aseta kuvat täsmälleen haluamaasi paikkaan. Tasaa elementtejä toisiinsa nähden tasaustyökaluilla. Luo ammattimaisen näköisiä asetteluita vaivattomasti.

Lisää omia tekstejä tehtävään. Kirjoita otsikko, ohje tai lisäselitys. Valitse sopiva fontti seitsemästä vaihtoehdosta. Säädä tekstin kokoa, väriä ja ääriviivaa.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta',
        description: `Napsauta "Lataa" -painiketta viedäksesi tehtävän. Valitse PDF- tai JPEG-muoto alasvetovalikosta. PDF säilyttää parhaan laadun kaikissa koissa. JPEG sopii digitaaliseen jakamiseen ja sosiaaliseen mediaan.

Valitse värillinen tai harmaasävytulostus. Harmaasävy säästää värimustetta merkittävästi. Oppilaat voivat värittää harmaasävyiset versiot. Luo värityskuvia lapsille tulostettava -tyyppisiä tehtäviä.

Kaikki tehtävät viedään 300 DPI -laadulla. Täydellinen terävyys kotitulostimilla ja ammattitulostimilla. Tekstit pysyvät luettavina kaikissa koissa. Kuvat näyttävät ammattimaisilta tulostetussa muodossa.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish prepositions.md use case sections
  useCases: {
    sectionTitle: 'Ilmainen Työarkki Lapsille - Työarkki Esiopetukseen ja Ilmaiset Tulosteet. Työarkki Lapsille',
    sectionDescription: 'Prepositioiden tehtävägeneraattori palvelee laajaa opettajien ja vanhempien joukkoa. Täysi Käyttöoikeus -tilaus sopii esiopetuksen opettajille, alakoulun opettajille ja kotiopettajille. Luo matematiikka tehtävät alakoulu, kirjaimet harjoittelu esikoulu ja lukemaan oppiminen tehtävät samalla alustalla. Jokainen käyttäjäryhmä hyötyy generaattorin ainutlaatuisista ominaisuuksista.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Esiopetuksen Opettajat',
        subtitle: 'Hienomotoriikka Harjoitukset ja Esiopetus Materiaali 6-Vuotiaille',
        description: `Esiopetuksen opettajat valmistavat 6-vuotiaita lapsia alakouluun. Prepositioharjoitukset opettavat sijaintisuhteita leikkisästi. Yhdistä prepositiot hienomotoriikan harjoituksiin kattavaan oppimiseen. Luo värityskuvia lapsille tulostettava -tyyppisiä tehtäviä, joissa oppilaat värittävät kuvia.

Esiopetuksessa prepositiot opetetaan konkreettisten esimerkkien kautta. Kuvat eläimistä, leluista ja arjen esineistä toimivat täydellisesti. Oppilaat oppivat sanoja "päällä", "alla", "vieressä", "sisällä" ja "ulkona". Visuaaliset esimerkit tekevät abstrakteista käsitteistä konkreettisia.

Monivalintatehtävät sopivat parhaiten esiopetukseen. Kuusivuotiaat oppilaat eivät vielä kirjoita sujuvasti. Valitseminen on helpompaa kuin kirjoittaminen. Tarjoa 2-3 vaihtoehtoa selkeyden vuoksi.`,
        quote: 'Prepositioharjoitukset tekevät sijaintisanojen oppimisesta hauskaa!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun Opettajat 1.-3. Luokka',
        subtitle: 'Matematiikka Tehtävät Alakoulu ja Kielioppi Tehtävät',
        description: `Alakoulun opettajat käyttävät prepositioharjoituksia kieliopin tunneilla. Ensimmäinen luokka oppii perus prepositiot. Toinen ja kolmas luokka syventävät ymmärrystä monimutkaisemmilla prepositioilla. Yhdistä prepositiot matematiikka tehtäviin alakoulu kokonaisvaltaiseen oppimiseen.

Täydennysharjoitukset sopivat paremmin alakoululaisille. Oppilaat kirjoittavat prepositiot tyhjille viivoille. Kirjoittaminen vahvistaa oikeinkirjoitusta. Testaa ymmärrystä ilman apuvihjeitä.

Luo eriytettyjä tehtäviä eri taitotasoille. Vahvemmille oppilaille monimutkaisempia prepositioita. Tukea tarvitseville yksinkertaisempia harjoituksia. Kaikki oppilaat työskentelevät samalla aiheella eri tasoilla.`,
        quote: 'Prepositioharjoitukset tukevat kieliopin oppimista erinomaisesti!',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat',
        subtitle: 'Tulostettavat Tehtävät Useille Luokkatasoille',
        description: `Kotiopettajat opettavat usein useita lapsia eri ikäisenä. Prepositioiden generaattori luo tehtäviä kaikille tasoille. Generoi 1. luokan tehtävät yksinkertaisilla prepositioilla. Luo 3. luokan tehtävät monimutkaisemmilla sijaintisuhteilla. Kaikki tehtävät samalla alustalla.

Säästä tunteja valmistelua kotiopetuksessa. Generoi viikon tehtävät kymmenessä minuutissa. Luo eri versioita eri lapsille. Ei tarvetta etsiä eri lähteitä eri aiheisiin.

Personoi tehtävät lasten kiinnostuksen kohteiden mukaan. Lataa kuvia perheen lemmikeistä tai kiinnostavista aiheista. Personoidut tehtävät lisäävät motivaatiota. Lapset oppivat paremmin henkilökohtaisilla yhteyksillä.`,
        quote: 'Yksi työkalu kattaa kaikkien lasteni tarpeet.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Kielenopetuksen Opettajat',
        subtitle: 'Lukemaan Oppiminen Tehtävät 11 Kielellä',
        description: `Suomea toisena kielenä opettavat hyötyvät valtavasti. Prepositiot ovat haastavia maahanmuuttajaoppilaille. Visuaaliset esimerkit selventävät merkityksiä. Luo prepositioharjoituksia suomeksi ja oppilaiden äidinkielellä vertailuun.

Opeta prepositioita äidinkielellä ensin. Varmista ymmärrys käsitteestä. Sitten siirry suomen kielelle. Käännä sama tehtävä molemmille kielille yhdellä klikkauksella.

Kaksikielisissä luokissa luo rinnakkaisia tehtäviä. Osa oppilaista työskentelee suomeksi. Toiset työskentelevät ruotsiksi tai englanniksi. Kaikki oppilaat harjoittelevat samoja prepositioita.`,
        quote: 'Monikielisyystuki on ratkaisevaa luokkahuoneessani.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Värityskuvia Lapsille ja Eriyttäminen',
        description: `Erityisopettajat tarvitsevat eriytettyä materiaalia eri oppimistyyleihin. Prepositioiden generaattori mahdollistaa täydellisen mukautuksen. Luo yksinkertaisia tehtäviä kehitysvammaisille oppilaille. Generoi haastavampia harjoituksia lahjakkaammille.

Visuaaliset oppijat hyötyvät kuvista valtavasti. Suurenna kuvia selkeyden vuoksi. Käytä kirkkaita, kontrastisia värejä. Vähennä tekstiä vain olennaiseen.

Luo värityskuvia lapsille tulostettava keskittymisen parantamiseksi. Värittäminen rauhoittaa levottomia oppilaita. Yhdistä värittäminen prepositioiden oppimiseen. Kaksoistoiminta pitää oppilaat kiinnittyneinä.`,
        quote: 'Voin nopeasti mukauttaa tehtäviä jokaisen oppilaan tarpeisiin.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy Tehtäviä Kaupallisella Lisenssillä',
        description: `Opettajayrittäjät myyvät tehtäviä Teachers Pay Teachersissa ja Etsyssä. Täysi Käyttöoikeus -tilaus sisältää kaupalliset oikeudet. Luo tehtäväpaketteja myyntiin ilman lisälisenssikuluja. Monet opettajat ansaitsevat 500-5000 euroa kuukaudessa.

Luo temaattisia prepositiopaketteja eri aiheista. Myy eläinteemaisia prepositiopaketteja. Luo juhlapyhäversiot (joulu, pääsiäinen, halloween). Temaattiset paketit myyvät paremmin kuin yksittäiset tehtävät.

Myy valmiita tehtäväkirjoja Amazon KDP:ssä. Yhdistä 50-100 prepositioharjoitusta kirjaksi. Lataa PDF Amazon KDP:hen. Ansaitse rojalteja jokaisesta myynnistä passiivisesti.`,
        quote: 'Tilaukseni maksoi itsensä takaisin ensimmäisessä kuussa!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from Finnish prepositions.md
  faq: {
    sectionTitle: 'FAQ - Ilmainen Työarkki Lapsille ja Työarkki Esiopetukseen. Työarkki Lapsille',
    sectionDescription: 'Yleisimmät kysymykset prepositioharjoitusten generaattorista ja prepositiotehtävistä.',
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
        question: 'Onko Tämä Prepositioiden Generaattori Todella Ilmainen?',
        answer: 'Prepositioiden tehtävägeneraattori vaatii Täysi Käyttöoikeus -tilauksen, joka maksaa 240 euroa vuodessa tai 25 euroa kuukaudessa. Tilauksesi antaa sinulle rajoittamattoman prepositioharjoitusten luomisen ilman maksuja yksittäisistä tehtävistä. Peruspaketti sisältää 10 suosittua tehtävägeneraattoria ja maksaa 144 euroa vuodessa. Molemmat tilaukset sisältävät kaupalliset oikeudet ja 11 kielen tuen.',
      },
      {
        id: '2',
        question: 'Voinko Tulostaa Prepositioharjoitukset Kotona?',
        answer: 'Kyllä voit tulostaa kaikki prepositioharjoitukset kotitulostimella. 300 DPI -laatu toimii täydellisesti tavallisilla kotitulostimilla. A4-paperi on suositeltu koko Suomessa. Väritulostus tekee tehtävistä värikkäitä ja houkuttelevia. Harmaasävytulostus säästää mustetta ja toimii yhtä hyvin.',
      },
      {
        id: '3',
        question: 'Tarvitsenko Suunnittelutaitoja Prepositioharjoitusten Luomiseen?',
        answer: 'Ei tarvitse mitään suunnittelutaitoja. Prepositioiden generaattori on suunniteltu opettajille ilman teknistä taustaa. Kolme klikkausta luo valmiin tehtävän. Valitse harjoitusten määrä ja prepositiot. Napsauta Generoi. Tehtävä on valmis. Ei Photoshoppia. Ei InDesigniä. Ei oppimiskäyrää.',
      },
      {
        id: '4',
        question: 'Voinko Käyttää Prepositioharjoituksia Luokassani?',
        answer: 'Täysi Käyttöoikeus -tilaus sisältää rajattoman luokkahuonekäytön prepositioharjoituksille. Tulosta niin monta kappaletta kuin luokassasi on oppilaita. Jaa tehtävät oppilaille. Käytä tehtäviä kotitehtävinä. Käytä tehtäviä kokeissa ja arvioinneissa. Kaikki tämä sisältyy tilaukseen.',
      },
      {
        id: '5',
        question: 'Millä Kielillä Prepositioharjoitukset Ovat Saatavilla?',
        answer: 'Kaikki 11 kieltä toimivat täydellisesti prepositioiden generaattorissa. Suomi, ruotsi, norja, tanska, englanti, saksa, ranska, espanja, italia, portugali ja hollanti. Vaihda kieltä yhdellä klikkauksella asetuksista. Kuvien nimet ja prepositiolauseet näytetään valitsemallasi kielellä.',
      },
      {
        id: '6',
        question: 'Voinko Myydä Prepositioharjoituksia, Jotka Luon?',
        answer: 'Kyllä voit. Täysi Käyttöoikeus -tilaus sisältää täyden kaupallisen print-on-demand -lisenssin ilman lisämaksuja. Myy prepositioharjoituksia Teachers Pay Teachers -alustalla. Myy Etsy-verkkokaupassa digitaalisina latauksina. Myy Amazon KDP -palvelussa matalan sisällön kirjoina. Ei tekijänoikeusmerkintöjä vaadittu.',
      },
      {
        id: '7',
        question: 'Mille Ikäryhmille Prepositioharjoitukset Sopivat Parhaiten?',
        answer: 'Prepositioharjoitukset sopivat erinomaisesti 6-9-vuotiaille lapsille. Esiopetuksessa monivalintatehtävät sopivat 6-vuotiaille. Täydennysharjoitukset sopivat paremmin 1.-3. luokkalaisille. Vaikeustasoa voi säätää prepositioiden valinnalla ja tehtävien määrällä.',
      },
      {
        id: '8',
        question: 'Voinko Ladata Omia Kuvia Prepositioharjoituksiin?',
        answer: 'Kyllä voit ladata omia kuvia helposti. Monilataus tukee useita tiedostoja kerralla. PNG, JPEG ja GIF formaatit tuettu. Yhdistä omia kuvia 3000+ kuvan kirjaston kuviin. Lataa luokkahuoneen esineiden kuvia konkreettiseen oppimiseen.',
      },
      {
        id: '9',
        question: 'Kuinka Kauan Prepositioharjoituksen Luominen Kestää?',
        answer: 'Prepositioharjoituksen luominen kestää alle kolme minuuttia. Yksi minuutti asetusten valintaan. 10 sekuntia generointiin. 1-2 minuuttia muokkaukseen ja lataamiseen. Voit luoda viikon tehtävät alle 15 minuutissa.',
      },
      {
        id: '10',
        question: 'Sisältyykö Vastausavain Prepositioharjoituksiin?',
        answer: 'Kyllä sisältyy aina. Vastausavain luodaan automaattisesti jokaisen prepositioharjoituksen yhteydessä. Näet vastaukset "Vastausavain" -välilehdellä. Lataa vastausavain erikseen PDF-muodossa. Tulosta vastausavain itsellesi nopeaa tarkistusta varten.',
      },
    ],
  },

  // Pricing - Finnish terminology
  pricing: {
    title: 'Täysi Käyttöoikeus',
    price: '240€',
    priceInterval: '/vuosi',
    priceSuffix: 'Laskutetaan vuosittain',
    benefits: [
      'Rajoittamaton prepositioharjoitusten luonti',
      'Kaupallinen lisenssi sisältyy',
      '11 kielen tuki',
      '3000+ teemaattista kuvaa',
      '300 DPI tulostuslaatu',
      'Vastausavaimet sisältyvät',
    ],
    ctaText: 'Aloita Luominen Nyt',
    bundleDescription: 'Tilauksesi sisältää pääsyn kaikkiin 33 työarkkigeneraattoriin:',
    bundleApps: [
      'Kuvalaskut', 'Aakkosjuna', 'Iso vai pieni', 'Kuvabingo',
      'Kaaviot laske ja väritä', 'Koodiyhteenlasku', 'Värityssivut', 'Kuvasanaristikko',
      'Kuvakryptogrammi', 'Piirtäminen ja värittäminen', 'Viivojen piirtäminen', 'Etsi ja laske',
      'Etsi esineet', 'Ruudukkoyhdistäminen', 'Yhdistämispeli', 'Matematiikkapulma',
      'Matematiikkamonisteet', 'Puuttuvat palaset', 'Enemmän vai vähemmän', 'Mikä ei kuulu joukkoon',
      'Kuviojuna', 'Kuviomonisteet', 'Kuvapolku', 'Kuvien lajittelu',
      'Prepositiot', 'Varjopari', 'Vähennyslasku', 'Lasten sudoku',
      'Aarteenmetsästys', 'Arvaa sana', 'Sanojen sekoitus', 'Sanaristikko', 'Kirjoitusharjoitukset',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Ilmaiset Työarkit Yhdistää - Työarkki Lapsille ja Ilmaiset Tulosteet',
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä prepositioharjoitukset näihin täydentäviin generaattoreihin.',
    ctaTitle: 'Valmiina Luomaan Upeita Prepositioharjoituksia?',
    ctaDescription: 'Liity tuhansien opettajien joukkoon, jotka luovat ammattimaisia prepositioharjoituksia. Rajoittamaton generointi, kaupallinen lisenssi sisältyy.',
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
        slug: 'matching',
        name: 'Yhdistä Parit',
        category: 'Visuaalinen Oppiminen',
        icon: '🔗',
        description: 'Yhdistä prepositioharjoitukset yhdistämistehtäviin sijaintisanojen vahvistamiseksi.',
      },
      {
        id: '2',
        slug: 'find-and-count',
        name: 'Etsi ja Laske',
        category: 'Matematiikka',
        icon: '🔍',
        description: 'Yhdistä prepositiot laskutehtäviin sanallisten ongelmien harjoitteluun.',
      },
      {
        id: '3',
        slug: 'coloring',
        name: 'Värityskuvat',
        category: 'Luovuus',
        icon: '🎨',
        description: 'Tulosta prepositioharjoitukset harmaasävyinä väritystehtäviksi.',
      },
      {
        id: '4',
        slug: 'drawing-lines',
        name: 'Viivojen Piirtäminen',
        category: 'Hienomotoriikka',
        icon: '✏️',
        description: 'Yhdistä prepositiot piirustusharjoituksiin motoristen taitojen kehittämiseksi.',
      },
      {
        id: '5',
        slug: 'word-search',
        name: 'Sananhaku',
        category: 'Kieli',
        icon: '🔤',
        description: 'Vahvista prepositiosanastoa sananhakutehtävillä.',
      },
      {
        id: '6',
        slug: 'picture-sort',
        name: 'Kuvalajittelu',
        category: 'Logiikka',
        icon: '📊',
        description: 'Yhdistä prepositiot lajittelutehtäviin kategorioiden harjoitteluun.',
      },
    ],
  },
};

export default prepositionsFiContent;
