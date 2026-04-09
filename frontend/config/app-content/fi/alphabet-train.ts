import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'aakkostehtäviä tulostaa',
    secondaryKeywords: [
      'ABC tehtävä generaattori',
      'kirjaintunnistustehtävä',
      'opettele aakkoset tehtäviä',
      'kirjaimet tulostaa',
    ],
    lsiKeywords: [
      'ABC',
      'isot kirjaimet',
      'pienet kirjaimet',
      'aakkosjärjestys',
      'esiopetus',
      '1. luokka',
    ],
    titleTag: 'Aakkostehtäviä tulostaa | ABC-harjoitusgeneraattori',
    metaDescription: 'Luo aakkostehtäviä teemakuvilla kirjaintunnistusta varten. Automaattiset vastaukset, 11 kieltä. Kokeile ilmaiseksi.',
  },

  hero: {
    title: 'Aakkosjuna Tyoarkkien Generaattori Kirjaintunnistukseen',
    tagline: 'Jokainen vaunu kantaa kirjaimen ja vastaavan kuvan — rakenna kirjaintunnistusta vaunu vaunulta.',
    description:
      'Suunnittele silmiinpistavia aakkosjuna tyoarkkeja, joissa 11 varikaasta junavaunua kulkee sivun poikki, jokainen kirjaimella yhdistettynä vastaavaan kuvitukseen. Valitse Automaattinen Luonti -tila välittömiin satunnaisiin kirjainvalintoihin tai Manuaalinen tila valitaksesi tarkalleen 11 kirjainta aakkostosta kohdennettuun harjoitteluun. Lisaa 3–11 saadettavaa vihjettä tyoarkkia kohti — kuvavihjeet, jotka kayttajat yhdistävat oikeaan kirjainvaunuun — muuttaen passiivisen kirjaintunnistuksen aktiiviseksi ongelmanratkaisuharjoitukseksi. Selaa yli 3 100 kuvitusta 104 teemassa. Taysi Paasy avaa kaikki 11 tuettua kieltä omine aakkostoineen — suomi ä/ö:llä, saksa Ä/Ö/Ü:llä, tanska Æ/Ø/Å:llä ja lisaa — moninkertaistaen tuotekatalogisi yhdestatoista kertaa yhdesta työnkulusta. Jokainen tyoarkki luo automaattisen vastausavaimen. Vie tulostusvalmiita PDF- ja JPEG-tiedostoja yli 400 DPI:na Letter-, A4- tai Neliömuodossa. Ilmainen kokeilu kaikilla ominaisuuksilla — ei rekisteroitymista, ei luottokorttia. Lataukset sisaltavat vesileiman; osta lisenssi sen poistamiseksi.',
  },

  howItWorks: {
    title: 'Nain Luot Aakkosjuna Tyoarkkeja Viidessa Vaiheessa',
    steps: [
      {
        title: 'Aseta sivun asettelu',
        description:
          'Avaa Sivun Asetukset -paneeli ja valitse koko: Letter Pysty, Letter Vaaka, A4 Pysty, A4 Vaaka tai Nelio (1200x1200). Valitse taustavari, valitse koristeellinen taustateema kuvakirjastosta ja saada lapinakyvyytta. Lisaa yhteensopiva kehys ja valitse junamalli antaaksesi tyoarkeillesi viimeistellyn ulkoasun.',
      },
      {
        title: 'Valitse luontitilasi',
        description:
          'Avaa Aakkosjuna-asetukset ja valitse luontitila. Automaattinen Luonti tuottaa valittomasti tyoarkin 11 satunnaisesti valitulla kirjaimella ja vastaavilla kuvilla valitusta teemasta — ihanteellinen nopeaan eratuotantoon. Manuaalinen tila nayttaa koko aakkoston valitulle kielelle ja antaa sinun valita tarkalleen 11 kirjainta kohdennettuihin harjoitussarjoihin kuten pelkat vokaalit, konsonantiryhmat tai aakkoston alku.',
      },
      {
        title: 'Valitse kuvia teemakirjastosta',
        description:
          'Avaa Kuvakirjasto-paneeli ja selaa 104 teemaa. Jokainen kirjainvaunu nayttaa kuvan, jonka nimi alkaa kyseisella kirjaimella, vahvistaen kirjain-aani-yhteyttä. Suomeksi esimerkiksi koiran kuva yhdistetaan kirjaimeen K, kun taas englanniksi sama kuva yhdistetaan kirjaimeen D (dog). Voit myos ladata omia kuvia brandatyihin tyoarkkeihin.',
      },
      {
        title: 'Maarittele vihjeet ja tekstityyli',
        description:
          'Aseta vihjeiden maara 3:sta 11:een — nama ovat kuvavihjeitä, jotka nakyyvat erikseen ja jotka kayttajien on yhdistettava oikeaan kirjainvaunuun. Vahemmat vihjeet tekevat tyoarkista helpomman; useammat vihjeet lisaavat haastetta. Ota kayttoon tai poista kaytosta nimi- ja paivamaarakentat. Kaytta Tyokalut-paneelia lisataksesi otsikon, ohjeita tai mukautettua tekstia seitsemasta fontista.',
      },
      {
        title: 'Luo vastausavain ja lataa',
        description:
          'Siirry Vastausavain-valilehdelle ja napsauta Luo Vastausavain luodaksesi ratkaistun version, joka nayttaa jokaisen kirjainvaunun oikealla kuvayhdistelylla ja kaikilla vihjeilla vastattuina. Vie seka tyoarkki etta vastausavain korkearesoluutioisena JPEG- tai tulostusvalmiina PDF-tiedostona. Ota kayttoon harmaa-astevienti musteystävallisiin versioihin. Jokainen vienti renderoidaan yli 400 DPI:na.',
      },
    ],
  },

  keyFeatures: {
    title: 'Aakkosjuna Tyoarkkien Generaattorin Avainominaisuudet',
    features: [
      {
        title: 'Junavaunumuoto kirjain-kuva-yhdistelyllä',
        description:
          'Jokainen tyoarkki sisaltaa 11 varikaasta junavaunua, jotka kulkevat sivun poikki. Jokainen vaunu sisaltaa yhden kirjaimen ja vastaavan kuvituksen, jonka nimi alkaa kyseisella kirjaimella — A omenalla, K kissalla, T tahdella. Tama visuaalinen yhdistely vahvistaa kirjain-aani-assosiaatioita leikkisan kuljetusteeman kautta, joka kiinnittaa huomion paljon tehokkaammin kuin tavalliset kirjainharjoitusarkit.',
      },
      {
        title: 'Kaksi luontitilaa: Automaattinen ja Manuaalinen kirjainvalinta',
        description:
          'Automaattinen Luonti -tila tuottaa taysin tyoarkin yhdella napsautuksella valitsemalla satunnaisesti 11 kirjainta aakkostosta ja yhdistämällä jokaiseen vastaavan kuvan valitusta teemasta. Manuaalinen tila nayttaa koko aakkoston ja antaa sinun valita tarkalleen 11 kirjainta, mahdollistaen kohdennetut harjoitussarjat — pelkat vokaalit, vaikeat kirjainparit, aakkoston alku tai loppu.',
      },
      {
        title: 'Kielikohtainen aakkosstuki 11 kielelle',
        description:
          'Taysi Paasy avaa kaikki 11 tuettua kieltä, joista jokaisella on oma aakkoston ja kirjainjoukkonsa. Suomi kayttaa ä/ö:tä 28 kirjaimella, englanti 26 kirjainta, saksa 29 Ä/Ö/Ü:llä, ruotsi 29 Å/Ä/Ö:llä, espanja 27 Ñ:llä. Kuvatunnisteet kaannetaan jokaiselle kielelle, joten kirjain-kuva-yhdistely pysyy oikeana — koira yhdistetaan K:hon suomeksi, mutta D:hen englanniksi (dog) ja H:hon saksaksi (Hund). Tama tekee siita aidon monikielisen tuotegeneraattorin.',
      },
      {
        title: 'Saadettava vihjejärjestelmä vaikeustason saatamiseen',
        description:
          'Aseta 3:sta 11 vihjettä tyoarkkia kohti. Vihjeet ovat kuvavihjeitä, jotka nakyyvat erikseen junasta — kayttajien on tunnistettava, mihin kirjainvaunuun kukin vihjekuva kuuluu. Vahemmat vihjeet luovat helpomman yhdistamisharjoituksen, kun taas taydet 11 vihjettä haastavat kayttajat yhdistämään jokaisen vaunun.',
      },
      {
        title: '104 visuaalista teemaa yli 3 100 kuvalla kirjainyhdistelyyyn',
        description:
          'Tutustu kirjastoon, jossa on yli 3 100 korkearesoluutioista kuvitusta 104 teemassa. Jokainen kuva on yhdistetty kirjaimeen, jolla sen nimi alkaa jokaisella kielellä, joten teemavalinta tayttaa automaattisesti kirjain-kuva-yhdistelyt. Voit myos ladata omia kuvia brandatyihin tyoarkkeihin.',
      },
      {
        title: 'Automaattinen vastausavaimen luominen',
        description:
          'Napsauta yhta painiketta luodaksesi tayden vastausavaimen, joka nayttaa jokaisen junavaunun oikealla kirjain-kuva-yhdistelylla ja kaikilla vihjeilla vastattuina. Vie vastausavain erillisenä JPEG- tai PDF-tiedostona tuotepaketteihin.',
      },
      {
        title: 'Tulostuvalmis vienti 400+ DPI:na harmaa-asteilla',
        description:
          'Lataa tyoarkkeja ja vastausavaimia korkearesoluutioisina JPEG-kuvina tai tulostusvalmiina PDF-dokumentteina yli 400 DPI:na. Ota kayttoon harmaa-astevienti musteystävallisiin versioihin. Letter-, A4- ja Neliömuodot ovat kaikki tuettuja.',
      },
      {
        title: 'Taysi piirtoalustamuokkaus kumoa- ja tee uudelleen -toiminnolla',
        description:
          'Sisaanrakennettu Fabric.js-piirtoalusta antaa sinun vetaa, skaalata, kiertaa ja siirtaa jokaista elementtia. Kaytta tasonhallintaa, justeraustyokaluja ja lukitus/avaus-toimintoja enintaan 20 askeleen kumoa- ja tee uudelleen -toiminnolla.',
      },
    ],
  },

  businessUseCases: {
    title: 'Nain Myyat Aakkosjuna Tyoarkkeja Verkossa',
    cases: [
      {
        title: 'Teemakohtaiset aakkosjunapaketit Etsyssa',
        description:
          'Luo 10–20 aakkosjuna tyoarkin sarjoja ryhmiteltyina teemoittain ja tarjoa niita suorana latauksena Etsyssa. Jokainen tyoarkki sisaltaa eri kirjainvalikoimat ja vastaavat kuvat, joten jokainen sivu paketissa on ainutlaatuinen. Sisallyta vastausavaimet bonustiedostoina. Junamuoto erottuu visuaalisesti Etsy-hakutuloksissa. Hinnoittele yksittaiset teemapaketit 3–5 euroon ja moniteemaiset paketit 12–18 euroon.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Aakkos-aktiviteettikirjat Amazon KDP:ssa',
        description:
          'Kokoa 50–100 aakkosjuna tyoarkkia painetuksi aktiviteettikirjaksi Amazon KDP -muodossa. Kaytta nousevaa vaikeustasoa aloittamalla 3 vihjeella sivua kohti ja rakentamalla 11:een, esitellen kirjainryhmiä asteittain. Aakkos-aktiviteettikirjat 3–6-vuotiaille myyvat johdonmukaisesti ymparivuotisesti.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Tasoitetut kieliasemat Gumroadiin',
        description:
          'Rakenna aakkosjunasarjoja tasoittain vihjemaaralla vaikeustasona: Taso 1 (3 vihjettä, yleiset kirjaimet), Taso 2 (5 vihjettä, sekalaiset kirjaimet), Taso 3 (8 vihjettä, harvinaisemmat kirjaimet) ja Taso 4 (11 vihjettä, taysi yhdistamishaaste). Pakkaa jokainen taso vastausavaimella.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Monikiellset aakkostuotteet Täydellä Pääsyllä',
        description:
          'Taysi Paasy avaa kaikki 11 kieltä omine aakkostoineen. Luo suomenkielisia aakkosjunia ä/ö-vaunuilla, saksankielisia junia Ä/Ö/Ü:llä, espanjankielisia junia Ñ:llä ja lisaa. Jokainen kieliversio on erillinen tuote, jonka voit listata Etsyssa, Gumroadissa tai Amazon KDP:ssa — moninkertaistaen tuotekatalogisi yhdestatoista kertaa.',
        platform: 'Etsy / Amazon KDP / Gumroad (monikielinen)',
      },
      {
        title: 'Kirjaintunnistus verkossa ja yksityisopetuksessa',
        description:
          'Luo raataloityja aakkosjuna tyoarkkeja jokaiselle kayttajalle kirjaintuntemuksen mukaan. Kaytta Manuaalista tilaa valitaksesi ne tietyt kirjaimet, joiden parissa kayttaja työskentelee, ja saada vihjeiden maaraa tason mukaan. Junamuoto muuttaa kirjainharjoittelun yhdistamispeliksi, joka pitaa nuoret kayttajat sitoutuneina.',
        platform: 'Verkko / Yksityisopetus / Kotiopiskelu',
      },
    ],
  },

  faq: [
    {
      question: 'Mikä on aakkosjuna tyoarkkimuoto?',
      answer:
        'Jokainen tyoarkki sisaltaa 11 varikaasta junavaunua. Jokainen vaunu sisaltaa yhden kirjaimen yhdistettynä vastaavaan kuvaan, jonka nimi alkaa kyseisella kirjaimella. Junan alla tai vierellä nakyyvat vihjekuvat, jotka kayttajien on yhdistettava oikeaan vaunuun. Muoto yhdistaa kirjaintunnistuksen visuaaliseen yhdistamiseen.',
    },
    {
      question: 'Miten vihjejärjestelmä toimii?',
      answer:
        'Vihjeet ovat kuvavihjeitä, jotka nakyyvat erikseen junavaunuista. Kayttajat tarkastelevat jokaista vihjekuvaa, tunnistavat mita se esittaa, maarittelevat alkukirjaimen ja yhdistävat sen oikeaan vaunuun. Voit asettaa 3:sta 11 vihjettä tyoarkkia kohti — vahemmat vihjeet tekevat aktiviteetista helpomman, useammat vihjeet lisaävat haastetta.',
    },
    {
      question: 'Onko Aakkosjuna-sovellus kieliriippuvainen?',
      answer:
        'Kylla. Toisin kuin puhtaasti visuaaliset matematiikkasovellukset, Aakkosjuna muuttuu perustavanlaatuisesti valitun kielen perusteella. Jokaisella kielellä on oma aakkoston ja kirjainmaara — suomi 28 kirjainta ä/ö:llä, englanti 26 kirjainta, saksa 29 Ä/Ö/Ü:llä. Kuvatunnisteet kaannetaan, joten jokainen kirjain yhdistetaan kuvaan, jonka kaannetty nimi alkaa kyseisella kirjaimella.',
    },
    {
      question: 'Onko saatavilla ilmaista kokeilua?',
      answer:
        'Kylla. Sinulla on paasy kaikkiin ominaisuuksiin — molempiin luontitiloihin, tayteen kuvakirjastoon, kaikkiin vihjeasssetuksiin, vastausavaimen luomiseen ja kaikkiin vientimuotoihin — ilman tilin luomista tai luottokorttia. Ilmaisen kokeilun lataukset sisaltavat pienen vesileiman.',
    },
    {
      question: 'Mitä kaupallinen lisenssi sisaltaa?',
      answer:
        'Kaupallinen lisenssi tarjoaa vesileimattomia englanninkielisia vientejä taysilla myyntioikeuksilla. Taysi Paasy -lisenssi lisaa kaikki 11 kieltä omine aakkostoineen, moninkertaistaen tuotekatalogisi. Molemmat lisenssitasot antavat rajoittamattomat oikeudet myyntiin Etsyssa, Amazon KDP:ssa, Gumroadissa tai millä tahansa muulla alustalla.',
    },
    {
      question: 'Sopivatko aakkostehtävät esiopetukseen, alkuopetukseen ja alakouluun?',
      answer:
        'Kyllä. Aakkosjunatehtävät on suunniteltu erityisesti esiopetukseen (6-vuotiaat) ja alkuopetukseen (1.–2. luokka). Kuva-kirjain-yhdistäminen tekee kirjainoppimisesta visuaalista ja kiinnostavaa. Vaikeustaso säätyy vihjemäärällä: 3 vihjettä helpoin, 11 haastavin.',
    },
    {
      question: 'Noudattavatko aakkostehtävät OPS 2014 -opetussuunnitelmaa?',
      answer:
        'Kyllä. Aakkosjunatehtävät tukevat OPS 2014:n äidinkielen tavoitteita T1 (kielen havaitseminen) ja T3 (kirjoittamisen perustaidot). Kirjaintunnistus ja kirjain-kuva-yhdistäminen ovat keskeisiä esiopetuksen ja 1. luokan tavoitteita opetussuunnitelmassa.',
    },
    {
      question: 'Miten luon aakkostehtävän nopeasti?',
      answer:
        'Avaa generaattori, valitse luontitila (automaattinen tai manuaalinen), valitse 11 kirjainta, valitse teemakuvat kirjastosta ja napsauta Luo. Kuvat yhdistyvät automaattisesti oikeisiin kirjaimiin valitun kielen mukaan.',
    },
    {
      question: 'Sisältyvätkö vastaukset automaattisesti?',
      answer:
        'Kyllä. Jokainen aakkosjunatehtävä sisältää automaattisesti luodun vastausavaimen, jossa oikeat kuva-kirjain-parit on merkitty. Vastausavain on erillisellä sivulla.',
    },
    {
      question: 'Voinko myydä näitä tehtäviä Etsyssä ja Amazon KDP:ssä?',
      answer:
        'Kyllä. Kaupallisella lisenssillä sinulla on täydet oikeudet myydä aakkostehtäviä digitaalisina latauksina Etsyssä, painettuina aktiviteettikirjoina Amazon KDP:ssä tai millä tahansa muulla alustalla.',
    },
    {
      question: 'Kuinka monella kielellä voin luoda tehtäviä?',
      answer:
        'Generaattori tukee 11 kieltä: suomi, englanti, saksa, ranska, espanja, portugali, italia, hollanti, ruotsi, tanska ja norja. Työkalu mukauttaa automaattisesti aakkoset ja kuva-kirjain-yhdistykset jokaiselle kielelle. Jokainen kieliversio on erillinen tuote.',
    },
    {
      question: 'Mikä on palautuskäytäntö?',
      answer:
        'Koska ilmainen kokeilu antaa sinulle pääsyn kaikkiin ominaisuuksiin, emme tarjoa palautuksia kaupallisten lisenssien ostoista. Voit testata molemmat luontitilat, jokaisen vihjeasetuksen, jokaisen teeman ja jokaisen vientimuodon ennen ostamista.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'prepositiot-tyoarkit',
      anchorText: 'Prepositiot Tyoarkkien Generaattori',
    },
    {
      pageType: 'app',
      slug: 'arvaa-sana-tyoarkit',
      anchorText: 'Arvaa Sana Tyoarkkien Generaattori',
    },
    {
      pageType: 'app',
      slug: 'kirjainsekoitus-tyoarkit',
      anchorText: 'Kirjainsekoitus Tyoarkkien Generaattori',
    },
    {
      pageType: 'app',
      slug: 'sanahaku-tyoarkit',
      anchorText: 'Sanahaku Tyoarkkien Generaattori',
    },
    {
      pageType: 'bundle',
      slug: 'lukeminen-kieli-paketti',
      anchorText: 'Lukeminen & Kieli Paketti — Kaikki Kielisovellukset Yhdessa Paketissa',
    },
    {
      pageType: 'guide',
      slug: 'luo-aakkos-tyoarkkeja',
      anchorText: 'Opas Aakkos Tyoarkkien Luomiseen',
    },
    {
      pageType: 'start',
      slug: 'taysin-opas-tulostettavaan-liiketoimintaan',
      anchorText: 'Taysin Opas Tulostettavan Liiketoiminnan Aloittamiseen',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/finnish/alphabet%20train/aakkostjuna%201.webp',
      primaryAlt: 'Aakkosjuna tyoarkki varikkäilla junavaunuilla, jotka kantavat kirjaimia ja vastaavia elainkuvia',
    },
    sampleGallery: [
      {
        src: '/samples/finnish/alphabet%20train/aakkostjuna%201.webp',
        alt: 'Aakkosjuna tyoarkki eläinteemalla ja 11 kirjainvaunulla vihjekuvineen',
        caption: 'Automaattinen Luonti -tila — 11 satunnaista kirjainvaunua eläinteemaisilla vihjekuvilla',
      },
      {
        src: '/samples/finnish/alphabet%20train/aakkostjuna%202.webp',
        alt: 'Aakkosjuna tyoarkki ruokateemalla ja 5 vihjekuvalla yhdistettavaksi',
        caption: 'Manuaalinen tila — käsin valitut kirjaimet ruokateemalla ja 5 vihjettä helpompaan yhdistamiseen',
      },
      {
        src: '/samples/finnish/alphabet%20train/aakkostjuna%201%20answer-key.webp',
        alt: 'Aakkosjuna tyoarkki ajoneuvoteemalla ja kaikki 11 vihjettä edistyneeseen harjoitteluun',
        caption: 'Taysi vihjehaaste — 11 vihjettä taydelliseen kirjain-kuva-yhdistamisen harjoitteluun',
      },
    ],
    youtubeId: '_dDQegRq9JQ',
    videoTitle: 'Nain Luot Aakkosjuna Tyoarkkeja — Vaihe Vaiheelta Opas',
  },
};

export default content;
