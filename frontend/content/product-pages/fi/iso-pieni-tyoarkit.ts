import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Big and Small Worksheets - Finnish Content (Iso ja Pieni Tehtävät)
 *
 * File: frontend/content/product-pages/fi/iso-pieni-tyoarkit.ts
 * URL: /fi/apps/iso-pieni-tyoarkit (Finnish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Finnish/big-small.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const bigSmallFiContent: ProductPageContent = {
  // SEO Metadata - Finnish language-specific
  seo: {
    slug: 'iso-pieni-tyoarkit',
    appId: 'big-small-app',
    title: 'Tulostettavat Tehtävät Lapsille Ilmainen - Iso ja Pieni Tehtävät Esiopetus - Matematiikka Tehtävät Alakoulu',
    description: 'Luo ammattimaisia kokovertailutehtäviä Iso ja Pieni -työkalulla. Täysi Käyttöoikeus -tilaus antaa rajattoman pääsyn kaikkiin 33 tehtävämonisteen luontityökaluun. Lataa tulostettavat tehtävät PDF- tai JPEG-muodossa alle 3 minuutissa.',
    keywords: 'tulostettavat tehtävät lapsille ilmainen, iso ja pieni tehtävät, esiopetus materiaali ilmainen, matematiikka tehtävät alakoulu, kokovertailu tehtävät, hienomotoriikka harjoitukset',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fi/apps/iso-pieni-tyoarkit',
  },

  // Hero Section - FULL text from Finnish big-small.md
  hero: {
    title: 'Iso ja Pieni Tehtävät',
    subtitle: 'Tulostettavat Tehtävät Lapsille Ilmainen Esiopetus Materiaali',
    description: `Iso ja pieni -tehtävämonisteiden luominen on helppoa tälle kokovertailutyökalulle. Luo ammattimaisia tehtäviä, joissa lapset oppivat erottamaan koot toisistaan. Täysi Käyttöoikeus -tilaus antaa rajattoman pääsyn kaikkiin 33 tehtävämonisteen luontityökaluun. Lataa tulostettavat tehtävät PDF- tai JPEG-muodossa alle 3 minuutissa.

Kokovertailutehtävät ovat tärkeitä esiopetuksen ja alakoulun matematiikassa. Lapset oppivat ymmärtämään käsitteet iso, pieni ja keskikokoinen. Tämä työkalu luo automaattisesti tehtäviä, joissa on 2-3 kuvaa eri kokoina. Valitse viidestä eri tehtävätyypistä. Ympyröi pienin, ympyröi suurin tai järjestä kuvat kokonsa mukaan.

Jokainen tehtävä sopii esiopetukseen ja matematiikan alkuopetukseen alakoulussa. Mukauta jokaista tehtävää täydellisesti. Vedä, kierrä ja muuta kaikkia elementtejä. Lisää omia kuvia. Valitse yli 3000 lapsille sopivasta kuvasta. Luo ainutlaatuisia tehtävämonsteita, jotka sopivat juuri sinun oppilaiden tarpeisiin.`,
    previewImageSrc: '/samples/english/big small/big-small-different images.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/big small/
  samples: {
    sectionTitle: 'Iso ja Pieni Tehtävät Esimerkit',
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
        worksheetSrc: '/samples/english/big small/big-small-different images.jpeg',
        answerKeySrc: '/samples/english/big small/big-small-different images answer_key.jpeg',
        altText: 'Iso ja pieni kokovertailutehtävä erilaisilla kuvilla esiopetukseen',
        pdfDownloadUrl: '/samples/english/big small/big-small-different images.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/big small/big-small identical images.jpeg',
        answerKeySrc: '/samples/english/big small/big-small identical images answer_key.jpeg',
        altText: 'Kokovertailutehtävä identtisillä kuvilla eri kokoina matematiikan harjoitteluun',
        pdfDownloadUrl: '/samples/english/big small/big-small identical images.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/big small/big-small number 1-2-3.jpeg',
        answerKeySrc: '/samples/english/big small/big-small number 1-2-3 answer_key.jpeg',
        altText: 'Järjestämistehtävä jossa oppilaat numeroivat kuvat pienimmästä suurimpaan',
        pdfDownloadUrl: '/samples/english/big small/big-small number 1-2-3.pdf',
      },
    ],
  },

  // Features Grid - FULL text from Finnish big-small.md feature sections
  features: {
    sectionTitle: 'Iso ja Pieni Tehtävät - Tulostettavat Tehtävät Lapsille Ilmainen ja Matematiikka Tehtävät Alakoulu',
    sectionDescription: 'Kokovertailutyökalumme tarjoaa kaiken tarvitsemasi ammattimaisten tehtävämonisteiden luomiseen. Täysi Käyttöoikeus -tilaus sisältää seitsemän tehokasta ominaisuutta. Nämä ominaisuudet tekevät tehtävien luomisesta nopeaa ja helppoa. Luo tulostettavat tehtävät lapsille alle kolmessa minuutissa. Jokainen ominaisuus on suunniteltu opettajien tarpeisiin.',
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
        title: 'Luo Esiopetus Materiaali Ilmainen Kolmessa Klikkauksessa - Tulostettavat Tehtävät Lapsille',
        description: `Tehtävän luominen on uskomattoman yksinkertaista. Valitse ensin kuinka monta tehtävää haluat. 1-10 tehtävää per moniste. Valitse sitten 2 tai 3 kuvaa per tehtävä. Kolmanneksi valitse tehtävätyyppi viidestä vaihtoehdosta. Klikkaa "Luo" ja tehtävä on valmis.

Järjestelmä luo automaattisesti kuvat eri kokoina. Kahden kuvan tehtävissä kokoero on 80 prosenttia. Kolmen kuvan tehtävissä saat pienen, keskikokoisen ja ison version. Kaikki koot ovat selvästi erotettavissa toisistaan. Lapset näkevät heti minkä kuva on suurin tai pienin.

Valitse viidestä eri tehtävätyypistä. "Ympyröi pienin" sopii nuorimmille lapsille. "Ympyröi suurin" on toinen perusvaihtoehto. "Ympyröi keskikokoinen" vaatii kolme kuvaa. Järjestämistehtävät "Numeroi 1-2-3 pienimmästä suurimpaan" opettavat järjestämistä. "Numeroi 1-2-3 suurimmasta pienimpään" on haastavampi versio.

Jokainen tehtävä generoidaan alle 10 sekunnissa. Ei odotusaikaa, ei latausongelmia. Klikkaa "Luo" ja tehtävä ilmestyy näytölle välittömästi. Voit luoda kymmeniä erilaisia tehtäviä minuuteissa. Täydellinen kiireisille opettajille jotka tarvitsevat nopeita ratkaisuja.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Muokkaa Matematiikka Tehtävät Alakoulu Täydellisesti - Hienomotoriikka Harjoitukset',
        description: `Jokainen elementti tehtävässä on täysin muokattavissa. Klikkaa mitä tahansa kuvaa, tekstiä tai muotoa. Vedä elementti uuteen paikkaan. Kierrä sitä millä kulmalla tahansa. Muuta kokoa vetämällä nurkkia. Poista elementtejä klikkaamalla ja painamalla Delete.

Tämä täydellinen muokattavuus tekee tehtävistä ainutlaatuisia. Muokkaa asettelua sopimaan oppilaiden tarpeisiin. Suurenna kuvia jos lapset tarvitsevat selkeämmän näkymän. Pienennä kuvia jos haluat enemmän tehtäviä yhdelle sivulle. Kierrä kuvia luomaan visuaalisesti mielenkiintoisia asetelmia.

Lisää tekstielementtejä antamaan ohjeita suomeksi. Kirjoita "Ympyröi pienin eläin" tai "Numeroi hedelmät kokonsa mukaan". Muuta tekstin kokoa 8-72 pikseliä. Valitse kuudesta selkeästä fontista. Muuta tekstin väriä sopimaan teeman kanssa. Lisää tekstiin reunaviiva korostamaan sitä.

Tasaustyökalut auttavat luomaan siistejä tehtäviä. Tasaa valitut kuvat vasemmalle, keskelle tai oikealle. Tasaa ne ylös, keskelle tai alas. Keskitä elementit sivulle vaaka- tai pystysuunnassa. Nämä työkalut tekevät ammattimaisista tehtävistä helppoja luoda.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Lataa Omia Kuvia - Tulostettavat Tehtävät Lapsille Ilmainen',
        description: `Lataa omia kuvia suoraan tietokoneeltasi. Tue monta tiedostoa kerralla. Kaikki yleiset kuvaformaatit toimivat. JPEG, PNG, GIF ja muut. Järjestelmä muuntaa kuvat automaattisesti oikeaan muotoon. Ladatut kuvat näkyvät heti esikatselussa.

Yhdistä ladattuja kuvia kirjaston kuviin. Luo tehtäviä luokan lemmikkieläimestä. Käytä koulusi logoa. Lisää oppilaiden piirustuksia. Käytä paikallisia maamerkkejä opetuksessa. Personoi tehtävät juuri sinun oppilaittesi kiinnostuksen kohteiden mukaan.

Ladatut kuvat säilyvät istunnon ajan. Voit käyttää niitä useissa eri tehtävissä. Luo sarja tehtäviä samoilla kuvilla. Muuta vain tehtävätyyppiä tai kuvien määrää. Ei tarvetta ladata samoja kuvia uudelleen. Säästä aikaa työskennellessäsi.

Omien kuvien käyttö tekee tehtävistä merkityksellisempiä lapsille. Lapset motivoituvat enemmän tutuista aiheista. Käytä kuvia luokan retkeltä. Lataa kuvia koulun tapahtumista. Luo tehtäviä oppilaidesi lempikirjojen hahmoista. Henkilökohtaiset tehtävät lisäävät oppimismotivaatiota.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Kieltä Kirjaimet Harjoittelu Esikoulu ja Lukemaan Oppiminen Tehtävät',
        description: `Kuvien tiedostonimet ovat 11 kielellä. Suomi, englanti, saksa, ranska ja espanja. Myös portugali, italia, hollanti, ruotsi, tanska ja norja. Tämä monikielisyys tukee kielenoppimista. Lapset näkevät sanaston eri kielillä kuvien kautta.

Käyttöliittymä on täysin suomeksi. Kaikki painikkeet, valikot ja ohjeet suomeksi. Ei tarvetta opetella vieraita termejä. Kaikki on välittömästi ymmärrettävää suomalaisille opettajille. Työkalu mukautuu automaattisesti valittuun kieleen.

Monikielisyys on erityisen tärkeä ESL-opettajille. Opeta samalla työkalulla suomea ja englantia. Vaihda kieltä kesken tunnin. Luo rinnakkaisia tehtäviä kahdella kielellä. Oppilaat oppivat käsitteet iso ja pieni molemmilla kielillä samanaikaisesti.

Kaksikielisille kouluille tämä on kultaakin kalliimpaa. Luo tehtävät suomeksi esiopetukseen. Luo samat tehtävät ruotsiksi samoilla kuvilla. Tue kielikylpyohjelmia täydellä kielituella. Ei tarvetta ostaa erillistä ohjelmistoa jokaiselle kielelle.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kaupallinen Lisenssi - Myy Tehtäviä Teachers Pay Teachers',
        description: `Täysi Käyttöoikeus -tilaus sisältää täyden kaupallisen print-on-demand -lisenssin. Ei ylimääräisiä lisenssimaksuja. Myy luomiasi tehtäviä Teachers Pay Teachers -sivustolla. Myy Etsyssä tulostettavien tuotteiden kauppana. Julkaise Amazon KDP:ssä sisältökirjoina. Kaikki tämä on sallittua tilauksesi puitteissa.

Kaikki tehtävät ladataan 300 DPI -tarkkuudella. Tämä on täysin ammattimaista painolaatua. Riittävän tarkka myyntiä varten. Asiakkaat saavat kristallinkirkkaat tulosteet. Ei pikselöitymistä, ei epätarkkuutta. Ammattilaatuiset tehtävät jotka kilpailevat kaupallisten kustantajien kanssa.

Monet opettajat ansaitsevat 500-5000 euroa kuukaudessa myymällä tehtäviä. Teachers Pay Teachers on valtava markkina. Yli 7 miljoonaa opettajaa maailmanlaajuisesti. Suomalaiset tehtävät ovat kysyttyjä. Erityisesti kaksikieliset suomi-englanti -materiaalit myyvät hyvin.

Ei vaadita tekijämainintaa. Tehtävät ovat täysin sinun. Brändinä ne omalla nimelläsi. Lisää oma logosi. Käytä omaa värimaailmaasi. Rakenna brändiä opettajayrittäjänä. Täysi Käyttöoikeus -tilaus antaa kaikki työkalut ammattimaiseen tuotantoon.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Yli 3000 Kuvaa - Kokovertailu Tehtävät Kaikilla Teemoilla',
        description: `Kuvakirjastossa on yli 3000 lapsille sopivaa kuvaa. Kaikki järjestetty teemoittain. Eläimet, hedelmät, ajoneuvot, muodot ja paljon muuta. Klikkaa teemaa nähdäksesi kaikki sen kuvat. Selaa kuvia helposti. Valitse juuri ne kuvat jotka sopivat oppituntiisi.

Jokainen kuva on huolellisesti valittu lasten opetukseen. Ei sopimatonta sisältöä. Ei monimutkaisia yksityiskohtia jotka häiritsevät. Selkeät, yksinkertaiset kuvat jotka lapset tunnistavat välittömästi. Täydellisiä esiopetukseen ja alakoulun ala-asteelle.

Teemat kattavat koko opetussuunnitelman. Luo matematiikkatehtäviä numeroilla ja muodoilla. Luo ympäristöopin tehtäviä eläimillä ja kasveilla. Luo kielitehtäviä esineillä ja toiminnoilla. Yksi kuvakirjasto palvelee kaikkia aineita.

Hakutoiminto löytää kuvat nopeasti. Kirjoita "kissa" ja näe kaikki kissakuvat. Kirjoita "pallo" ja näe kaikki palloihin liittyvät kuvat. Ei tarvetta selata satoja kuvia. Löydä tarvitsemasi sekunneissa. Säästä aikaa tehtävien valmistelussa.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Ammattilaatuinen 300 DPI Tulostettavat Tehtävät Lapsille Ilmainen PDF ja JPEG',
        description: `Kaikki tehtävät ladataan 300 DPI -tarkkuudella. Tämä on kansainvälinen ammattipainostandardi. Täydellinen tulostamiseen kotitulostimella. Täydellinen tulostamiseen koulussa. Täydellinen tulostamiseen painotalossa ammattimyyntiä varten.

Valitse PDF- tai JPEG-muodon välillä. PDF säilyttää täydellisen laadun. Täydellinen useampisivuisille tiedostoille. JPEG sopii nopeaan jakamiseen. Molemmat formaatit toimivat kaikilla laitteilla. Ei yhteensopivuusongelmia. Avaa ja tulosta missä tahansa.

Harmaasävyvaihtoehto säästää mustetta. Muunna värillinen tehtävä harmaasävyksi yhdellä klikkauksella. Säästä jopa 60 prosenttia musteen kustannuksista. Tärkeää kouluille joissa tulostetaan satoja tehtäviä kuukaudessa. Valitse väri tai harmaasävy lataushetkellä.

Lataa sekä tehtävä että vastausavain erikseen. Vastausavain näyttää oikeat vastaukset selkeästi. "Ympyröi suurin" -tehtävissä vihreä rasti näyttää oikean vastauksen. Järjestämistehtävissä numerot 1-2-3 näyttävät oikean järjestyksen. Säästä aikaa tarkistuksessa.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from Finnish big-small.md step sections
  howTo: {
    sectionTitle: 'Kuinka Luoda Tulostettavat Tehtävät Lapsille Ilmainen ja Matematiikka Tehtävät Alakoulu 5 Helpossa Vaiheessa',
    sectionDescription: 'Kokovertailutehtävän luominen kestää alle 3 minuuttia. Viisi yksinkertaista vaihetta vie sinut tyhjästä valmiiseen tulostettavaan tehtävään. Ei monimutkaisia asetuksia. Ei pitkää opettelukäyrää. Aloittelijat luovat ammattilaatuisia tehtäviä ensimmäisellä yrityksellä. Seuraa näitä vaiheita ja tehtäväsi on valmis.',
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
        title: 'Valitse Sisältö Esiopetus Materiaali Ilmainen - Kirjaimet Harjoittelu Esikoulu Tehtävät',
        description: `Aloita valitsemalla kuinka monta tehtävää haluat. Yksi tehtävä harjoitussivulle. Kymmenen tehtävää kattavaan arviointiin. Useimmille opettajille 4-6 tehtävää per sivu toimii parhaiten. Tämä antaa tarpeeksi harjoitusta ilman ylikuormitusta. Sopiva määrä esiopetuksen ja alakoulun 1. luokan oppilaille.

Valitse sitten montako kuvaa per tehtävä. Kaksi kuvaa on yksinkertaisin vaihtoehto. Sopii nuorimmille lapsille jotka opettelevat perusvertailua. Kolme kuvaa lisää vaikeusastetta. Mahdollistaa "keskikokoinen" -käsitteen opettamisen. Myös järjestämistehtävät vaativat kolme kuvaa.

Valitse kuvamoodi seuraavaksi. "Identtiset kuvat" -tila näyttää saman esineen eri kokoina. Täydellinen puhtaaseen kokovertailuun. Lapset keskittyvät vain kokoon, ei muihin eroihin. "Erilaiset kuvat" -tila näyttää eri esineitä. Haastavampi vaihtoehto. Opettaa vertailemaan kokoja riippumatta siitä mitä esinettä vertaillaan.

Valitse tehtävätyyppi viidestä vaihtoehdosta. "Ympyröi pienin" on helpoin aloittelijoille. "Ympyröi suurin" on yhtä yleinen. "Ympyröi keskikokoinen" vaatii kolmea kuvaa ja on haastavampi. Järjestämistehtävät "Numeroi 1-2-3" opettavat sarjallista järjestämistä. Valitse mikä sopii oppilaidesi taitotasolle.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Mukauta Asetuksia Lukemaan Oppiminen Tehtävät - Hienomotoriikka Harjoitukset',
        description: `Valitse sivun koko seuraavaksi. Letter Portrait (8.5×11 tuumaa) on amerikkalainen standardi. A4 Portrait (210×297mm) on eurooppalainen standardi. Suomessa käytetään A4-kokoa. Valitse mitä tulostimesi käyttää. Voit myös valita vaakasuuntaisen asettelun jos haluat enemmän tehtäviä vierekkäin.

Muokkaa sivun väriä tarvittaessa. Valkoinen on oletusarvo. Toimii parhaiten tulostamiseen. Voit valita kevyen taustavärin tehdäksesi tehtävästä visuaalisesti mielenkiintoisen. Vaalea keltainen tai vaaleansininen toimivat hyvin. Älä valitse liian tummaa väriä. Se kuluttaa mustetta ja vaikeuttaa lukemista.

Lisää nimi- ja päivämääräkentät tehtävän yläreunaan. Nämä ovat tärkeitä kouluympäristössä. Lapset kirjoittavat nimensä ja päivämäärän ennen tehtävän aloittamista. Opettaa vastuullisuutta omasta työstä. Helpottaa myös opettajaa järjestämään ja tallentamaan tehtäviä. Nimi- ja päivämääräkentät näkyvät automaattisesti oikeassa kohdassa.

Valitse taustateema jos haluat. Kymmeniä teemoja saatavilla. Eläimet, luonto, avaruus ja paljon muuta. Taustat tekevät tehtävästä houkuttelevan ilman häirintää. Säädä taustan läpinäkyvyyttä liukusäätimellä. 20-40 prosenttia on yleensä hyvä. Tarpeeksi näkyvä luomaan tunnelmaa, mutta ei häiritse tehtävää.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Luo Tehtävä - Välitön Esikatselu',
        description: `Klikkaa "Luo" -painiketta generoidaksesi tehtävän. Järjestelmä luo tehtävän välittömästi. Alle 10 sekuntia odotusaikaa. Näet tehtävän ilmestyvän canvasille silmiesi edessä. Jokainen kuva asetetaan automaattisesti oikeaan kokoon. Pieni, keskikokoinen ja iso versiot ovat selvästi erotettavissa.

Tehtävät sijoitetaan automaattisesti ruudukkoon. Pystysuuntaisilla sivuilla kaksi saraketta. Vaakasuuntaisilla sivuilla kolme saraketta. Rivejä lisätään automaattisesti tehtävien määrän mukaan. Välistys on optimoitu. Ei liian tiivistä, ei liian väljää. Täydellinen tasapaino luettavuuden kannalta.

Jos valitsit kuvia kirjastosta, järjestelmä käyttää niitä. Jos et valinnut kuvia, järjestelmä valitsee satunnaisesti valitsemastasi teemasta. "Eläimet"-teema antaa eläinkuvia. "Hedelmät"-teema antaa hedelmäkuvia. Jokainen tehtävä saa eri kuvat. Ei toistoa sivun sisällä. Pitää tehtävän mielenkiintoisena.

Vastausmerkinnät ilmestyvät jos valitsit ne. Tyhjät ympyrät oikeassa kohdassa "ympyröi"-tehtävissä. Tyhjät ruudut oikein sijoitettuina "numeroi"-tehtävissä. Tehtävänumerot näkyvät jos valitsit ne. Numerot ovat selkeitä ja hyvin sijoitettuja. Eivät häiritse tehtävää mutta ovat helposti nähtävissä.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Muokkaa Canvasilla - Personoi Kokovertailutehtävät',
        description: `Nyt voit muokata tehtävää täydellisesti. Klikkaa mitä tahansa kuvaa valitaksesi sen. Valitun kuvan ympärillä näkyy sininen kehys. Vedä kuvaa uuteen paikkaan. Suurenna tai pienennä vetämällä kulmista. Kierrä kuvaa vetämällä kiertoköydestä. Kaikki muutokset tapahtuvat reaaliajassa.

Tasaustyökalut auttavat luomaan siistejä asetelmia. Valitse useita kuvia pitämällä Shift pohjassa. Tasaa valitut kuvat vasemmalle, keskelle tai oikealle. Tasaa ne yläreunaan, keskelle tai alareunaan. Keskitä elementit koko sivulle. Nämä työkalut tekevät ammattimaisista asetelmista helppoja luoda.

Lisää tekstielementtejä klikkaamalla "Lisää teksti" -painiketta. Kirjoita otsikko tehtävälle. "Ympyröi pienin eläin" tai "Numeroi hedelmät pienimmästä suurimpaan". Muuta tekstin kokoa 8-72 pikseliä. Valitse selkeä fontti kuudesta vaihtoehdosta. Muuta tekstin väriä sopimaan teemaasi. Lisää reunaviiva tekstiin korostamaan sitä.

Kumoa-painike on ystäväsi. Teit virheen? Paina Kumoa. Muutit mieltäsi asettelusta? Kumoa viimeiset 5 muutosta. Kumoa tallentaa 20 viimeistä toimintoa. Tee uudelleen -painike palauttaa kumotun toiminnon. Kokeile rohkeasti erilaisia asetteluja. Kumoa-toiminto antaa sinulle vapauden kokeilla ilman pelkoa.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Lataa ja Tulosta Esiopetus Materiaali Ilmainen - Tulostettavat Tehtävät Lapsille Ilmainen',
        description: `Kun tehtävä on valmis, klikkaa "Lataa" -pudotusvalikkoa. Valitse "Tehtävä (PDF)" tai "Tehtävä (JPEG)". PDF on paras useimmille tulostimille. JPEG toimii hyvin nopeaan jakamiseen. Molemmat formaatit ladataan 300 DPI -tarkkuudella. Täydellinen ammattilaatuinen tuloste.

Rastita "Harmaasävy" -valintaruutu jos haluat säästää värimustetta. Järjestelmä muuntaa tehtävän mustavalkoiseksi ennen latausta. Säästää jopa 60 prosenttia musteen kustannuksista. Tärkeää kouluille jotka tulostavat satoja sivuja kuukaudessa. Harmaasävytehtävät ovat yhtä selkeitä kuin värilliset.

Luo vastausavain klikkaamalla "Luo vastausavain". Järjestelmä luo identtisen tehtävän vastauksin merkittynä. "Ympyröi suurin" -tehtävissä vihreä rasti näyttää oikean vastauksen. "Numeroi" -tehtävissä numerot 1-2-3 näkyvät oikeissa kohdissa. Lataa vastausavain samalla tavalla kuin tehtävä. PDF tai JPEG, väri tai harmaasävy.

Tallenna molemmat tiedostot tietokoneellesi. Anna niille selkeät nimet. "Iso-ja-pieni-esikoulu-1.pdf" tai "Kokovertailu-alakoulu-vastaukset.pdf". Järjestä tiedostot kansioihin aiheen mukaan. "Matematiikka", "Esiopetus", "Kokovertailu". Näin löydät ne helposti myöhemmin. Rakenna kirjastoa tehtäviä joita voit käyttää uudelleen vuodesta toiseen.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from Finnish big-small.md use case sections
  useCases: {
    sectionTitle: 'Täydellinen Opettajille ja Vanhemmille - Tulostettavat Tehtävät Lapsille Ilmainen Kaikille Tarpeille',
    sectionDescription: 'Kokovertailutehtävät palvelevat monenlaisia opettajia ja kasvattajia. Esiopetuksen opettajat käyttävät niitä päivittäin. Alakoulun opettajat rakentavat matematiikan oppimista niiden avulla. Kotiopettajat personoivat oppimisen omille lapsilleen. Kieltenopettajat yhdistävät kielenoppimisen ja käsitteiden oppimisen. Erityisopettajat eriyttävät materiaalin jokaisen oppilaan tasolle. Opettajayrittäjät myyvät niitä tulona.',
    badgeText: 'Kenelle Sopii',
    readMoreLabel: 'Lue lisää',
    showLessLabel: 'Näytä vähemmän',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Esiopetuksen Opettajat',
        subtitle: 'Esiopetus Materiaali Ilmainen ja Hienomotoriikka Harjoitukset Varhaiskasvatukseen',
        description: `Esiopetuksen opettajat käyttävät kokovertailutehtäviä matematiikan peruskäsitteiden opettamiseen. 6-vuotiaat lapset oppivat erottamaan ison ja pienen visuaalisesti. Tämä on tärkeä taito ennen alakoulua. Kokovertailu on osa esiopetuksen opetussuunnitelman perusteita. Lapset tarvitsevat paljon harjoitusta hallitakseen käsitteet.

Työkalu tekee esiopetusmateriaalin luomisesta nopeaa. Luo viikottaiset tehtävät alle tunnissa. 20-30 erilaista tehtävää eri teemoilla. Vaihtele eläimiä, hedelmiä ja leluja pitämään lasten mielenkiinto yllä. Käytä suuria, selkeitä kuvia jotka 6-vuotiaat tunnistavat helposti. Kaksi kuvaa per tehtävä on sopiva esiopetukseen.

Yhdistä kokovertailu hienomotoristen taitojen harjoitteluun. Lapset ympyröivät oikean vastauksen. Tämä harjoittaa kynän käyttöä. Valmistaa kirjoittamaan oppimiseen. Vahvistaa silmän ja käden yhteistyötä. Esiopetuksessa hienomotoriset taidot ovat yhtä tärkeitä kuin matemaattiset käsitteet. Yksi tehtävä harjoittaa molempia samanaikaisesti.

Lataa omia kuvia luokan lemmikkieläimistä tai retkikohteista. Personoi tehtävät tuttuihin aiheisiin. Lapset motivoituvat enemmän kun tunnistavat aiheet omasta elämästään. Luo tehtävä luokan nallesta kahdessa koossa. Lapset rakastavat nähdä tutut asiat tehtävissä. Oppiminen on tehokkaampaa kun se on merkityksellistä.`,
        quote: 'Lapseni oppivat kokovertailun nopeasti näillä tehtävillä!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alakoulun Opettajat 1-3 Luokka',
        subtitle: 'Matematiikka Tehtävät Alakoulu ja Järjestämistehtävät',
        description: `Alakoulun opettajat käyttävät kokovertailua matematiikan alkuopetuksessa. 1. luokalla kokovertailu on osa lukumäärien ymmärtämistä. Iso numero, pieni numero. 2. luokalla vertailu laajenee mittaamiseen. Kumpi on pidempi, lyhyempi. 3. luokalla oppilaat oppivat järjestämään sarjoja. Pienimmästä suurimpaan on tärkeä taito.

Kolmen kuvan järjestämistehtävät sopivat alakoulun 2-3 luokille. "Numeroi 1-2-3 pienimmästä suurimpaan" opettaa sarjallista ajattelua. Tämä taito on tärkeä myöhemmälle matematiikalle. Desimaalilukujen vertailu, murtolukujen järjestäminen. Kaikki alkaa visuaalisesta kokovertailusta alakoulun alussa.

Yhdistä kokovertailu muihin matematiikan aiheisiin. Luo tehtävä numeroilla 1-10 eri kokoina. Luo tehtävä muodoilla kolmio-neliö-ympyrä eri kokoina. Käytä geometrisia muotoja opettamaan sekä muotoja että kokoja samanaikaisesti. Alakoulun opettajat rakastavat tehtäviä jotka yhdistävät useita oppimisen tavoitteita yhdeksi tehtäväksi.

Luo viikoittaiset arvioinnit nopeasti. 10 tehtävää per arviointi. Tulosta jokaiselle oppilaalle oma kappale. Vastausavain tekee tarkistamisesta nopeaa. Alakoulun opettajilla on 20-25 oppilasta per luokka. Nopea tehtävien luominen ja tarkistaminen säästää tunteja viikossa. Käytä säästetty aika opettamiseen, ei tehtävien tekemiseen.`,
        quote: 'Järjestämistehtävät ovat täydellisiä matematiikan opetukseen.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Kotiopettajat',
        subtitle: 'Lukemaan Oppiminen Tehtävät ja Henkilökohtainen Oppiminen Kotona',
        description: `Kotiopettajat arvostavat täydellistä personointimahdollisuutta. Jokainen lapsi oppii omaan tahtiinsa. Toiset 5-vuotiaat hallitsevat kokovertailun nopeasti. Toiset tarvitsevat lisää harjoitusta 7-vuotiaina. Kotiopettajat voivat luoda juuri oikean vaikeusasteen kullekin lapselle. Ei standardoituja tehtäviä jotka eivät sovi kenellekään täydellisesti.

Lataa kuvia omista kodin esineistä. Leluista, huonekaluista, ruokatarvikkeista. Lapset oppivat paremmin tutuista esineistä. Luo tehtävä perheen lemmikeistä. Kissan ja koiran pentujen kokovertailua. Henkilökohtaiset tehtävät tekevät oppimisesta hauskempaa. Kotiopettajilla on ainutlaatuinen mahdollisuus personoida jokainen oppitunti.

Yhdistä kokovertailu muihin oppiaineisiin saumattomasti. Luo biologian tehtävä eläimistä eri kokoina. Samalla opitaan kokovertailua ja eläintietoa. Luo maantiedon tehtävä maamerkeistä. Eiffel-torni, kolosseum, pyramidit eri kokoina. Kotiopettajat voivat rakentaa integroituja oppimiskokonaisuuksia. Yksi työkalu palvelee kaikkia aineita.

Tallenna tehtävät lapsen portfolioon. Näytä edistymistä ajan myötä. Syyskuun tehtävät kahden kuvan vertailua. Toukokuun tehtävät kolmen kuvan järjestämistä. Vanhemmat näkevät konkreettisen edistymisen. Kotiopetuksessa dokumentointi on tärkeää. Tämä työkalu tekee portfolion rakentamisesta helppoa.`,
        quote: 'Personoidut tehtävät motivoivat lapsiani oppimaan.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Kieltenopettajat',
        subtitle: 'Kirjaimet Harjoittelu Esikoulu ja Tulostettavat Tehtävät Lapsille Ilmainen 11 Kielellä',
        description: `Kieltenopettajat hyötyvät 11 kielen tuesta enemmän kuin kukaan muu. Opeta suomea toisena kielenä kokovertailun kautta. Kuvien tiedostonimet näkyvät suomeksi. Lapset oppivat sanat "iso", "pieni", "keskikokoinen" visuaalisesti. Opeta englantia samalla työkalulla. Vaihda kieli englanniksi ja samat kuvat näyttävät "big", "small", "medium".

Luo rinnakkaisia tehtäviä kahdella kielellä. Sama tehtävä suomeksi ja ruotsiksi. Kaksikielisissä kouluissa tämä on kultaakin kalliimpaa. Opettaja luo tehtävän kerran ja käyttää sitä molemmilla kielillä. Ei tarvetta luoda kaikkea kahdesti. Säästää kymmeniä tunteja per lukukausi. Täysi Käyttöoikeus -tilaus toimii kaikilla 11 kielellä ilman lisämaksuja.

Käytä kokovertailua sanavaraston rakentamiseen. Luo tehtävä hedelmistä. Oppilaat oppivat sanat "omena", "banaani", "appelsiini". Samalla he oppivat kokovertailun. Kaksinkertainen oppiminen yhdessä tehtävässä. Kieltenopettajat rakastavat tehtäviä jotka yhdistävät kieliopin ja sanaston visuaaliseen oppimiseen.

ESL-opettajat käyttävät työkalua maahanmuuttajalapsille. Lapset jotka eivät puhu suomea kotona oppivat käsitteet visuaalisesti. Kuvat ylittävät kielirajat. "Ympyröi pienin" on helppo ymmärtää kuvista vaikka ei osaisi lukea ohjetta. Visuaalinen oppiminen tukee kielenoppimista. ESL-opettajat tarvitsevat työkaluja jotka toimivat ilman kielikykyä.`,
        quote: 'Monikielinen tuki on korvaamaton kielenopetuksessa.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Erityisopettajat',
        subtitle: 'Hienomotoriikka Harjoitukset Yksilölliseen Oppimiseen',
        description: `Erityisopettajat tarvitsevat täydellistä eriyttämismahdollisuutta. Jokainen oppilas tarvitsee yksilöllisen tason. Yksi lapsi tarvitsee vain kaksi suurta kuvaa. Toinen pystyy kolmeen pienempään kuvaan. Kolmas tarvitsee numeroituja vastausruutuja. Neljäs pystyy ilman apuvälineitä. Erityisopettajat voivat muokata jokaista tehtävää täydellisesti kunkin lapsen tarpeisiin.

Suurenna kuvia lapsille jotka tarvitsevat suurempia visuaalisia elementtejä. Pienennä tekstiä lapsille jotka häiriintyvät helposti. Poista tausta lapsille joilla on tarkkaavaisuusvaikeuksia. Lisää selkeät reunukset lapsille jotka tarvitsevat visuaalista rakennetta. Täydellinen muokattavuus tekee jokaisesta tehtävästä räätälöidyn. Erityisopetuksessa yksi koko ei sovi kaikille.

Yhdistä hienomotoriset harjoitukset kognitiivisiin taitoihin. Lapset jotka harjoittelevat kynän käyttöä hyötyvät ympyröintitehtävistä. Suuret ympyrät helpottavat aloittelijoita. Pienet ympyrät haastavat edistyneempiä. Numerointi harjoittaa numeroiden kirjoittamista. Jokainen tehtävä tukee useita kehitysalueita samanaikaisesti.

Luo sarja tehtäviä progressiivisella vaikeudella. Aloita kahdesta suuresta kuvasta. Etene kolmeen keskikokoiseen kuvaan. Päädy kolmeen pieneen kuvaan järjestettynä. Erityisopettajat näkevät oppilaan edistymisen konkreettisesti. Dokumentoi kehitys portfolioon. Näytä vanhemmille miten lapsi on edistynyt. Visuaalinen todiste motivoi kaikkia.`,
        quote: 'Voin räätälöidä tehtävät jokaisen oppilaan tarpeisiin.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Opettajayrittäjät',
        subtitle: 'Myy Tehtäviä Teachers Pay Teachers Palvelussa',
        description: `Opettajayrittäjät myyvät tulostettavia tehtäviä Teachers Pay Teachers -sivustolla. Kokovertailutehtävät ovat kysyttyjä. Vanhemmat ostavat niitä kotitehtäviksi. Opettajat ostavat niitä luokkahuonekäyttöön. Erityisopettajat ostavat niitä eriyttämiseen. Markkinat ovat valtavat. Täysi Käyttöoikeus -tilauksen kaupallinen lisenssi mahdollistaa kaiken tämän.

Luo tehtäväpaketteja myyntiin. 20 eri kokovertailutehtävää yhdessä paketissa. Teemalliset paketit myyvät hyvin. "Eläinten kokovertailu 20 tehtävää" tai "Hedelmät ja vihannekset kokovertailu". Hinnoittele 3-5 euroa per paketti. Myy 100 pakettia kuukaudessa. 300-500 euron kuukausitulo. Monet opettajat ansaitsevat 2000-5000 euroa kuukaudessa.

300 DPI -laatu on välttämätön myyntiin. Asiakkaat vaativat ammattilaatuisia tulosteita. Pikselöidyt kuvat saavat huonoja arvioita. Kristallinkirkaat tulosteet saavat 5 tähden arvioita. Täysi Käyttöoikeus varmistaa ammattilaatuisen lopputuloksen. Kilpailet kaupallisten kustantajien kanssa. Laatusi pitää olla yhtä hyvä tai parempi.

Pinterest-markkinointi toimii hyvin tulostettavien tehtävien kanssa. Luo kauniita esimerkkikuvia tehtävistä. Lisää värikkäät reunukset ja teemalliset taustat. Pinterestissä visuaaliset tuotteet leviävät nopeasti. Tuhansia katselukertoja johtavat satoihin myynteihin. Rakenna brändiä johdonmukaisella visuaalisella tyyillä. Täysi Käyttöoikeus -tilaus antaa kaikki työkalut ammatimaiseen tuotantoon.`,
        quote: 'Tilaukseni maksoi itsensä takaisin ensimmäisessä kuussa!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from Finnish big-small.md
  faq: {
    sectionTitle: 'Usein Kysytyt Kysymykset - Matematiikka Tehtävät Alakoulu ja Esiopetus Materiaali Ilmainen',
    sectionDescription: 'Opettajat kysyvät samoja kysymyksiä kokovertailutehtävistä. Tässä ovat vastaukset 12 yleisimpään kysymykseen. Nämä vastaukset auttavat sinua ymmärtämään työkalun täydellisesti. Täysi Käyttöoikeus -tilaus antaa kaiken tarvitsemasi. Ei piilomaksuja, ei yllätyksiä. Kaikki on selkeästi selitetty.',
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
        question: 'Onko Tämä Kokovertailugeneraattori Todella Ilmainen - Tulostettavat Tehtävät Lapsille Ilmainen?',
        answer: 'Kokovertailugeneraattori vaatii Täysi Käyttöoikeus -tilauksen joka maksaa 240 euroa vuodessa tai 25 euroa kuukaudessa. Tilauksesi antaa rajattoman kokovertailutehtävien luomisen ilman per-tehtävä -maksuja. Luo niin monta tehtävää kuin tarvitset ilman lisäkustannuksia. Peruspaketti sisältää 10 suosittua generaattoria ja maksaa 144 euroa vuodessa. Täysi Käyttöoikeus maksaa 240 euroa vuodessa ja sisältää kaikki 33 generaattorityyppiä mukaan lukien kokovertailun. Molemmat tilaukset sisältävät kaupallisen lisenssin, 11 kielen tuen ja ammattilaatuiset 300 DPI -viennit.',
      },
      {
        id: '2',
        question: 'Voinko Tulostaa Kokovertailutehtäviä Kotitulostimella Tavallisella Paperilla?',
        answer: 'Kyllä voit. Kokovertailutehtävät tulostuvat täydellisesti tavallisella A4-paperilla kotitulostimella. 300 DPI -tarkkuus varmistaa kristallinkirkkaat tulosteet. Kaikki viivat ja kuvat ovat teräviä. Ei pikselöitymistä tavallisellakaan tulostimella. Väritulostus näyttää kauniilta mutta ei ole pakollista. Harmaasävyvaihtoehto säästää mustetta. Mustavalkoiset tehtävät toimivat yhtä hyvin oppimiseen. Lapset voivat jopa värittää mustavalkoiset kuvat värikynillä. Yhdistää kokovertailun ja väritystehtävät yhdeksi aktiviteetiksi.',
      },
      {
        id: '3',
        question: 'Tarvitsenko Suunnittelutaitoja Luodakseni Hienomotoriikka Harjoitukset Tehtäviä?',
        answer: 'Ei tarvitse mitään suunnittelutaitoja. Työkalu tekee kaiken automaattisesti. Valitse vain kuinka monta tehtävää haluat. Valitse kuvat tai anna järjestelmän valita satunnaisesti. Klikkaa "Luo". Valmis tehtävä ilmestyy alle 10 sekunnissa. Muokkaaminen on yhtä helppoa. Vedä kuvaa siirtääksesi sitä. Vetämällä nurkkia muutat kokoa. Kierrä kuvaa vetämällä pyörimiskahvasta. Jos 5-vuotias osaa käyttää hiirtä, osaat käyttää tätä työkalua. Ei oppimiskäyrää, ei monimutkaisia valikoita.',
      },
      {
        id: '4',
        question: 'Voinko Käyttää Kokovertailutehtäviä Luokassani Oppilailleni?',
        answer: 'Täysi Käyttöoikeus -tilaus sisältää rajattoman luokkahuonekäytön. Luo tehtäviä kaikille oppilaillesi. Tulosta 25 kappaletta jokaisesta tehtävästä. Käytä tehtäviä päivittäin, viikoittain, kuukausittain. Ei rajoituksia kuinka monta tehtävää voit luoda tai tulostaa. Jaa tehtäviä myös kollegoillesi koulussa. Tilauksesi kattaa oman opetuksesi. Muut opettajat tarvitsevat omat tilauksensa jos luovat omia tehtäviä. Mutta tulosteiden jakaminen on täysin sallittua. Yhteistyö on helppoa Täysi Käyttöoikeus -tilauksen kanssa.',
      },
      {
        id: '5',
        question: 'Millä Kielillä Kokovertailutehtävät Ovat Saatavilla?',
        answer: 'Työkalu tukee 11 kieltä täydellisesti. Suomi, englanti, saksa, ranska, espanja, portugali, italia, hollanti, ruotsi, tanska ja norja. Sekä käyttöliittymä että sisältö toimivat kaikilla näillä kielillä. Vaihda kieltä milloin tahansa yhdellä klikkauksella. Kuvien tiedostonimet näkyvät valitulla kielellä. Tämä auttaa kielenoppimisessa. Suomenkielisissä tehtävissä kuva näyttää "kissa". Englanninkielisissä tehtävissä sama kuva näyttää "cat". Ruotsinkielisissä tehtävissä se on "katt". Monikielinen tuki on sisäänrakennettu ilman lisämaksuja.',
      },
      {
        id: '6',
        question: 'Voinko Myydä Tehtäviä Joita Luon Tällä Generaattorilla?',
        answer: 'Kyllä. Täysi Käyttöoikeus -tilaus sisältää täyden print-on-demand kaupallisen lisenssin ilman lisäkustannuksia. Myy luomiasi tehtäviä Teachers Pay Teachers -sivustolla, Etsyssä, Amazon KDP:ssä tai muilla alustoilla. Tulosta ja myy paikallisesti. Kaikki kaupallinen käyttö on sallittua. Kilpailijoiden työkalut veloittavat 79-199 euroa vuodessa kaupallisesta lisenssistä erikseen. Meidän 240 euron Täysi Käyttöoikeus -hinta sisältää kaiken. Ei piilomaksuja. Ei ylimääräisiä lisenssejä. Aloita myyminen heti tilauksen jälkeen. Ansaitse rahaa opettajien ja vanhempien auttamisesta.',
      },
      {
        id: '7',
        question: 'Kuinka Muokkaan Kokovertailutehtäviä Oppilailleni Sopiviksi?',
        answer: 'Jokainen elementti on täysin muokattavissa canvasilla. Klikkaa kuvaa valitaksesi sen. Vedä sitä uuteen paikkaan. Suurenna tai pienennä vetämällä nurkkia. Kierrä sitä vetämällä pyörimiskahvasta. Poista elementti painamalla Delete-näppäintä. Lisää tekstiä antamaan ohjeita suomeksi. "Ympyröi pienin eläin" tai "Numeroi hedelmät pienimmästä suurimpaan". Muuta tekstin kokoa, väriä ja fonttia. Lisää taustoja ja reunuksia. Lataa omia kuvia tuttujen aiheiden käyttämiseen. Täydellinen muokattavuus takaa että jokainen tehtävä sopii juuri sinun oppilaillesi.',
      },
      {
        id: '8',
        question: 'Mille Ikäryhmälle Kokovertailutehtävät Sopivat Parhaiten?',
        answer: 'Kokovertailutehtävät sopivat 4-9-vuotiaille lapsille parhaiten. Esiopetuksen 6-vuotiaat oppivat peruskäsitteet iso ja pieni. Alakoulun 1. luokan 7-vuotiaat harjoittelevat järjestämistä. 2-3 luokan 8-9-vuotiaat tekevät monimutkaisempia vertailuja numeroiden kanssa. Voit säätää vaikeustasoa sopimaan jokaiselle lapselle. Kahden kuvan vertailu on helpoin. Kolmen kuvan järjestäminen on haastavampi. "Ympyröi pienin" on helpointa. "Numeroi 1-2-3" vaatii enemmän ajattelua. Erityisopettajat käyttävät näitä tehtäviä jopa vanhemmille lapsille jotka tarvitsevat perustaitojen harjoittelua.',
      },
      {
        id: '9',
        question: 'Voinko Ladata Omia Kuvia Kokovertailutehtäviin?',
        answer: 'Kyllä voit ladata omia kuvia. Monivalintalataus tukee useita tiedostoja kerralla. Kaikki yleiset kuvaformaatit toimivat. JPEG, PNG, GIF. Järjestelmä käsittelee kuvat automaattisesti. Ladatut kuvat näkyvät heti esikatselupaneelissa. Klikkaa kuvaa käyttääksesi sitä tehtävässäsi. Lataa kuvia luokan lemmikkieläimestä, koulun tapahtumista tai oppilaiden piirustuksista. Personoi tehtävät tuttuihin aiheisiin. Lapset motivoituvat enemmän kun näkevät tuttuja asioita tehtävissä. Yhdistä ladattuja kuvia kirjaston 3000+ kuvaan. Rajattomat mahdollisuudet personointiin.',
      },
      {
        id: '10',
        question: 'Kuinka Kauan Kestää Luoda Kokovertailutehtävä?',
        answer: 'Kokovertailutehtävän luominen kestää alle 3 minuuttia. Valitse asetukset 30 sekunnissa. Klikkaa "Luo" ja odota 10 sekuntia. Muokkaa tehtävää 1-2 minuuttia. Lataa PDF tai JPEG 10 sekunnissa. Yhteensä 3 minuuttia tyhjästä valmiiseen tulosteeseen. Verrattuna perinteiseen tapaan joka vie 30-60 minuuttia, tämä on valtava ajansäästö. PowerPointilla suunnittelu, kuvien etsiminen, asettelun tekeminen käsin. Kaikki tämä vie aikaa. Täysi Käyttöoikeus tekee kaiken automaattisesti. Säästä 57 minuuttia per tehtävä. Käytä säästetty aika opettamiseen.',
      },
      {
        id: '11',
        question: 'Sisältävätkö Kokovertailutehtävät Vastausavaimet?',
        answer: 'Kyllä. Luo vastausavain yhdellä klikkauksella tehtävän luomisen jälkeen. Klikkaa "Luo vastausavain" -painiketta. Järjestelmä luo identtisen tehtävän vastaukset merkittyinä. "Ympyröi suurin" -tehtävissä vihreä rasti näyttää oikean vastauksen. "Numeroi" -tehtävissä numerot 1-2-3 ilmestyvät oikeisiin kohtiin. Lataa vastausavain erikseen tehtävästä. PDF tai JPEG, väri tai harmaasävy. Vastausavain nopeuttaa tarkistamista valtavasti. Alakoulun opettajilla on 20-25 oppilasta. Vastausavain säästää 10-15 minuuttia per tehtävä tarkistuksessa. Vuodessa satoja tunteja säästöä.',
      },
      {
        id: '12',
        question: 'Voinko Luoda Kokovertailutehtäviä Tietyistä Kouluaineista?',
        answer: 'Kyllä voit luoda ainekohtaisia tehtäviä. Valitse kuvat aineesi mukaan. Matematiikkaan valitse numeroita ja geometrisia muotoja. Biologiaan valitse eläimiä ja kasveja. Maantieteeseen valitse maamerkkejä ja karttoja. Kuvakirjastossa on yli 3000 kuvaa kattamaan kaikki aineet. Lataa omia kuvia oppikirjoistasi tai oppitunneilta. Luo integroituja tehtäviä jotka yhdistävät useita aineita. Kokovertailu matematiikassa, sanaston oppiminen kielissä, käsitteiden oppiminen tieteissä. Yksi työkalu palvelee kaikkia koulun aineita esiopetuksesta alakoulun 3. luokalle.',
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
      'Vastausavaimet sisältyvät',
    ],
    ctaText: 'Aloita Luominen Nyt',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Yhdistä Muihin Tehtävämonistegeneraattoreihin',
    sectionDescription: 'Luo kattavia oppimispaketteja yhdistämällä kokovertailutehtävät näihin täydentäviin generaattoreihin.',
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
        slug: 'coloring',
        name: 'Värityskuvat',
        category: 'Luovuus',
        icon: '🎨',
        description: 'Yhdistä kokovertailutehtävät värityskuviin kaksinkertaiseen oppimiskokemukseen.',
      },
      {
        id: '2',
        slug: 'drawing-lines',
        name: 'Viivan Piirtäminen',
        category: 'Hienomotoriikka',
        icon: '✏️',
        description: 'Täydennä kokovertailua viivan piirtämisharjoituksilla hienomotoriikan kehittämiseen.',
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
        slug: 'matching-app',
        name: 'Yhdistä Parit',
        category: 'Kognitiivinen',
        icon: '🔗',
        description: 'Laajenna visuaalista oppimista yhdistämistehtävillä käsitteiden vahvistamiseen.',
      },
      {
        id: '5',
        slug: 'shadow-match',
        name: 'Varjokuvan Yhdistäminen',
        category: 'Visuaalinen',
        icon: '👤',
        description: 'Kehitä visuaalista hahmottamista varjokuvan yhdistämistehtävillä.',
      },
      {
        id: '6',
        slug: 'more-less',
        name: 'Enemmän Vähemmän',
        category: 'Matematiikka',
        icon: '⚖️',
        description: 'Laajenna kokovertailua lukumäärien vertailulla matematiikan harjoitteluun.',
      },
    ],
  },
};

export default bigSmallFiContent;
