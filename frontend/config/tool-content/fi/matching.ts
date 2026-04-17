import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'ilmainen yhdistämistehtävä verkossa',
    secondaryKeywords: [
      'yhdistämistehtäviä ilmaiseksi verkossa',
      'yhdistämisgeneraattori ilman rekisteröitymistä',
      'kokeile yhdistämistehtävää ilmaiseksi',
      'tulostettava yhdistämistehtävä ilmainen kokeilu',
    ],
    lsiKeywords: [
      'ilmainen',
      'verkossa',
      'vesileima',
      'kokeile',
      'ei rekisteröitymistä',
      'yhdistämistehtävä',
    ],
    titleTag: 'Ilmainen yhdistämistehtävä verkossa | Kokeile heti',
    metaDescription: 'Tee yhdistämistehtäviä ilmaiseksi verkossa — ei rekisteröitymistä. Kaikki ominaisuudet käytössä, vesileima poistettavissa lisenssillä.',
  },

  hero: {
    title: 'Yhdistämistehtävägeneraattori',
    tagline: 'Neljän tilan piirrä viiva -yhdistämistehtävägeneraattori Alkukirjain-, Kuva+Sana-, Sekoitettu- ja Mukautettu Sana -tiloilla, automaattisesti luoduilla vastausavaimilla yhdistysviivoin, konfiguroitavilla parimäärillä, lokalisoidulla Etsi Parit -otsikolla 11 kielellä ja 104 temaattisella kuvakokoelmalla',
    description: 'Luo ammattimaisia piirrä viiva -yhdistämistehtäviä, joissa käyttäjät yhdistävät parit piirtämällä viivoja kahden sarakkeen välillä — neljällä eri yhdistystilalla yhdessä generaattorissa. Alkukirjaintila sijoittaa kuvat vasemmalle ja niiden alkukirjaimet oikealle. Kuva+Sana-tila näyttää nimetyt kuvaparit molemmin puolin sanavaraston vahvistamiseen. Kuva/Sana Sekoitettu -tila käyttää rivikohtaisia pudotusvalitsimia. Mukautettu Sana -tila yhdistää kuvia omiin kirjoittamiisi matchaustermeihin. Konfiguroi 4, 5 tai 6 paria per tehtäväarkki (oletus 6). Vaihda artikkelin numero (oletus PÄÄLLÄ) ja pistemerkinnät (oletus PÄÄLLÄ) itsenäisesti. Jokainen tehtäväarkki sisältää automaattisesti luodun lokalisoidun "Etsi Parit!" -otsikon. Kaksoiskangasjärjestelmä luo samanaikaisesti tehtäväarkin ja vastausavaimen — vastausavain piirtää vaakasuorat yhdistysviivat oikeiden matchausten välille. Tämä generaattori on kielitietoinen: Alkukirjain- ja Kuva+Sana-tilat käyttävät lokalisoituja kuvanimiä, joten kielen vaihtaminen muuttaa sanat ja alkukirjaimet. Selaa 104 temaattista kokoelmaa yli 3 100 kuvituksella. Käytä tausta- ja kehysteemoja. Lisää nimi- ja päivämääräkentät. Vie neljä tiedostoa: tehtäväarkki-JPEG, -PDF, vastausavain-JPEG ja -PDF — 300 DPI:llä. Ilmainen kokeilu vesileimalla. Osta lisenssi sen poistamiseksi.',
  },

  tutorial: {
    title: 'Näin Teet Yhdistämistehtäviä 8 Vaiheessa',
    steps: [
      { title: 'Avaa Yhdistämistehtävägeneraattori', description: 'Napsauta "Kokeile ilmaiseksi nyt". Kaksoiskangasnäkymä tehtäväarkille ja vastausavaimelle. Ei tiliä tarvita.' },
      { title: 'Valitse yhdistystila', description: 'Neljä tilaa: Alkukirjain (kuva → ensimmäinen kirjain), Kuva+Sana (nimetyt kuvaparit), Kuva/Sana Sekoitettu (rivikohtaiset valinnat), Mukautettu Sana (omat termit).' },
      { title: 'Konfiguroi parit, numerot ja muotoilu', description: 'Aseta parimäärä 4, 5 tai 6. Vaihda artikkelin numero ja pistemerkinnät. Valitse nimi/päivämäärä-kentät.' },
      { title: 'Valitse kuvat kirjastosta', description: 'Selaa 104 teemaa yli 3 100 kuvituksella. Alkukirjain-tilassa valitse tarkat kuvat. Mukautettu Sana -tilassa kirjoita omat matchaustermit. Lataa omia kuvia.' },
      { title: 'Aseta sivun asettelu ja koristeet', description: 'Valitse sivukoko, taustaväri, tausta- ja kehysteemat riippumattomilla läpinäkyvyyssäätimillä.' },
      { title: 'Luo yhdistämistehtäväarkki', description: 'Napsauta Luo. Kahden sarakkeen asettelu lokalisoidulla "Etsi Parit!" -otsikolla. Artikkelinumerot ja pistemerkinnät asetusten mukaan.' },
      { title: 'Tarkastele vastausavainta', description: 'Vastausavain toistaa asettelun ja lisää vaakasuorat yhdistysviivat (#555, viivan leveys 2) oikeiden parien välille.' },
      { title: 'Lataa kaikki neljä tiedostoa', description: 'Tehtäväarkki ja vastausavain JPEG:nä ja PDF:nä 300 DPI:llä. Vaihda kieltä lokalisoiduille versioille — Alkukirjain- ja Kuva+Sana-tilat tuottavat eri sanat ja kirjaimet jokaisella kielellä.' },
    ],
  },

  whatYouCanCreate: [
    { title: 'Temaattiset yhdistämistehtäväpaketit tilan mukaan', description: 'Yksi eläinteema tuottaa neljä erillistä tuotetyyppiä: Alkukirjain-matchaus äänneharjoitukseen, Kuva+Sana-matchaus sanavarastonrakennukseen, Sekoitettu-matchaus vaihtelevaan vaikeuteen ja Mukautettu Sana -matchaus tavausharjoituksiin.' },
    { title: 'KDP varhaisen lukutaidon yhdistämistyökirjoja', description: 'Kokoa 60–80 yhdistämistehtäväarkkia KDP-työkirjoiksi. Alkukirjaintila rakentaa foneemitietoisuutta. Jäsennä luvut vaikeuden mukaan. Kielitietoinen tuloste mahdollistaa erilliset kieliversiot.' },
    { title: 'Tuotelinjan yhdistämisasema-aktiviteetteja', description: 'Tuotevalmiit yhdistämistyöarkit nimi/päivämäärä-kenttien, artikkelinumeroiden ja vastausavainten kanssa. Matchausvalmiita asemaresursseja Gumroad-ostajille.' },
    { title: 'Monikielisiä sanavarastoyhdistämiskokoelmia', description: 'Hyödynnä kielitietoisia Alkukirjain- ja Kuva+Sana-tiloja luodaksesi yhdistämistehtäviä kaikilla 11 tuetulla kielellä. Samat kuvat tuottavat eri matchaussisällön jokaisella kielellä.' },
    { title: 'Mukautetun Sanan tavaus- ja sanavaraston paketteja', description: 'Käytä Mukautettu Sana -tilaa kirjoittaaksesi omia matchaustermejä — korkean frekvenssin sanat, viikoittaiset sanavarastolistat tai aihekohtainen terminologia.' },
    { title: 'Kausittaisia yhdistämisaktiviteettikokoelmia', description: 'Rakenna kausittaisia yhdistämiskokoelmia juhlapyhä- ja luontoteemoilla. Sisällytä kaikki neljä yhdistystilaa jokaisessa kausisarjassa.' },
  ],

  businessIdeas: [
    { title: 'Neljän tilan yhdistämistehtäväkauppa Etsyssä', description: 'Jokainen teema tukee neljää erillistä tuotelistausta — Alkukirjain, Kuva+Sana, Sekoitettu ja Mukautettu Sana — moninkertaistaen katalogisi yhdestä kuvasarjasta. 104 teemaa × 4 tilaa = 416 potentiaalista tuotekonseptia.', platform: 'Etsy' },
    { title: 'Amazon KDP varhaisen lukutaidon työkirjasarja', description: 'Alkukirjaintila rakentaa foneemitietoisuutta. Kielitietoinen tuloste mahdollistaa erilliset kieliversiot kansainvälisille KDP-markkinapaikoille.', platform: 'Amazon KDP' },
    { title: 'Gumroad yhdistämisasema-aktiviteettipaketit', description: 'Nimi/päivämäärä-kentät, artikkelinumerot ja automaattiset vastausavaimet nøglemyyntipisteinä. Lokalisoitu Etsi Parit -otsikko mukautuu 11 kieleen.', platform: 'Gumroad' },
    { title: 'Pinterest yhdistämistehtävä-liikennekeila', description: 'Kahden sarakkeen piirrä viiva -muoto tekee visuaalisesti erottuvat Pinterest-pinnaukset. Pinnaa eri tiloja: Alkukirjain, Kuva+Sana, Mukautettu Sana.', platform: 'Pinterest' },
    { title: 'Gumroad täydellinen yhdistämisaktiviteetti-työkalupaketti', description: 'Pakkaa tehtäväarkkeja kaikista neljästä tilasta ja kaikista 104 teemasta. 300+ tehtäväarkkia vastausavaimineen — 600+ tiedostoa.', platform: 'Gumroad' },
    { title: 'Monikielinen yhdistämistuotelinja', description: 'Kielitietoinen — Alkukirjain- ja Kuva+Sana-tilat tuottavat lokalisoituja sanoja ja kirjaimia. Samat eläinkuvat luovat eri matchaussisällön 11 kielellä.', platform: 'Etsy / Gumroad' },
  ],

  proTips: [
    { title: 'Hyödynnä neljää tilaa moninkertaistaaksesi katalogisi', description: 'Jokainen teema tukee neljää erillistä tuotetta — Alkukirjain, Kuva+Sana, Sekoitettu, Mukautettu Sana. 104 teemaa × 4 tilaa = 416 konseptia.' },
    { title: 'Käytä automaattista vastausavainta ydinmyyntipisteenä', description: 'Automaattinen vastausavain yhdistysviivoin erottaa ammattimaiset yhdistämistehtäväarkit perustehtävistä. Näytä vastausavain aina tuotelistauksissa.' },
    { title: 'Vaihtele parimäärää tasoitettuun vaikeuteen', description: 'Luo porrastettuja paketteja konfiguroitavalla parimäärällä. 4 paria esikoululaisille. 5 paria ensimmäisen luokan käyttäjille. 6 paria edistyneille.' },
    { title: 'Hyödynnä kielitietoisuutta monikielisiin tuotteisiin', description: 'Alkukirjain- ja Kuva+Sana-tilat ovat kielitietoisia. Luo samat yhdistämistehtäväarkit 11 kielellä.' },
    { title: 'Käytä Mukautettu Sana -tilaa erikoistuotteisiin', description: 'Mukautettu Sana -tilaa avaa erikoistuneen tuotekategorioita, joita muut generaattorit eivät palvele. Korkean frekvenssin sanat, aihekohtainen sanavarastomatchaus.' },
    { title: 'Yhdistä tausta- ja kehysteemat premium-esitykseen', description: 'Riippumaton tausta- ja kehysteema-järjestelmä erillisillä läpinäkyvyyssäätimillä luo visuaalisesti kiiltäviä tehtäväarkkeja.' },
    { title: 'Sisällytä nimi/päivämäärä-kentät tuotevalmiisiin tuotteisiin', description: 'Nimi/päivämääräkentät muuttavat yhdistämistehtäväarkit jäsennellyiksi tuoteaktiviteeteiksi.' },
  ],

  faq: [
    { question: 'Onko ilmainen kokeilu saatavilla?', answer: 'Kyllä. Kaikki ominaisuudet vesileimalla — neljä tilaa, konfiguroitavat parit, vastausavaimet, 104 teemaa, lokalisoitu otsikko 11 kielellä, tausta- ja kehysteemat, nimi/päivämäärä-kentät, harmaasävy ja kaikki vientimuodot. Ei rekisteröitymistä, ei luottokorttia.' },
    { question: 'Mitä ovat neljä yhdistystilaa?', answer: 'Alkukirjain: kuva → ensimmäinen kirjain. Kuva+Sana: nimetyt kuvaparit molemmin puolin. Kuva/Sana Sekoitettu: rivikohtaiset pudotusvalinnat. Mukautettu Sana: kuvat paritetaan omiin termeihin.' },
    { question: 'Miten vastausavain toimii?', answer: 'Vastausavain toistaa asettelun ja lisää vaakasuorat yhdistysviivat (#555, viivan leveys 2) oikeiden parien välille. Neljä tuotantovalmista tiedostoa per luonti.' },
    { question: 'Miten konfiguroitava parimäärä toimii?', answer: 'Valitse 4, 5 tai 6 pudotusvalikosta (oletus 6). Vähemmän pareja tuottaa isommat kuvat ja enemmän tilaa — nuoremmille käyttäjille. Enemmän pareja lisää vaikeutta.' },
    { question: 'Onko generaattori kielitietoinen?', answer: 'Kyllä. Alkukirjain- ja Kuva+Sana-tilat käyttävät lokalisoituja kuvanimiä. Kielen vaihtaminen muuttaa sanat ja alkukirjaimet — kissankuva näyttää K suomeksi mutta C englanniksi (Cat) ja K saksaksi (Katze).' },
    { question: 'Mitä kuvateeamoja ja vientimuotoja on saatavilla?', answer: '104 teemaa yli 3 100 kuvituksella. JPEG tai PDF 300 DPI:llä. Letter, A4, Neliö ja mukautetut koot. Harmaasävy. Neljä tiedostoa per luonti.' },
    { question: 'Voinko myydä tehtäviä kaupallisesti?', answer: 'Kyllä. Kaupallinen lisenssi antaa täydet myyntioikeudet kaikille alustoille.' },
    { question: 'Mikä on palautuspolitiikkanne?', answer: 'Ilmainen kokeilu antaa täyden pääsyn. Emme tarjoa hyvityksiä. Kokeile ennen ostamista.' },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'yhdistamis-tehtavat', anchorText: 'Yhdistämistehtävät — Täydet Tuotetiedot' },
    { pageType: 'tool', slug: 'ruudukkoyhdistamis-luoja', anchorText: 'Ruudukkoyhdistämisgeneraattori' },
    { pageType: 'tool', slug: 'varjoyhdistamis-luoja', anchorText: 'Varjoyhdistämisgeneraattori' },
    { pageType: 'tool', slug: 'kuvabingo-luoja', anchorText: 'Kuvabingogeneraattori' },
    { pageType: 'tool', slug: 'lajittele-kuvat-luoja', anchorText: 'Lajittele Kuvat -generaattori' },
    { pageType: 'tool', slug: 'aakkosjuna-luoja', anchorText: 'Aakkosjunageneraattori' },
    { pageType: 'tool', slug: 'sananhaku-luoja', anchorText: 'Sananhakugeneraattori' },
    { pageType: 'tool', slug: 'yhteenlasku-tehtava-luoja', anchorText: 'Yhteenlaskutehtävägeneraattori' },
    {
      pageType: 'app',
      slug: 'matching-worksheets',
      anchorText: 'Ready to sell what you make? Get the commercial license.',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/finnish/matching/yhdistä-parit-1.webp',
      primaryAlt: 'Piirrä viiva -yhdistämistehtäväarkki temaattisilla kuvilla kahteen sarakkeeseen järjestettynä lokalisoidulla Etsi Parit -otsikolla, artikkelinumeroilla ja koristeellisilla pistemerkinnöillä',
    },
    sampleGallery: [
      { src: '/samples/finnish/matching/yhdistä-parit-1.webp', alt: 'Alkukirjain-yhdistämistehtäväarkki kuvilla vasemmalla ja alkukirjaimilla oikealla äänneharjoitukseen', caption: 'Alkukirjaintila — käyttäjät yhdistävät kuvat alkukirjaimiin isoilla tai pienillä kirjaimilla' },
      { src: '/samples/finnish/matching/yhdistä-parit-2.webp', alt: 'Kuva ja sana -yhdistämistehtäväarkki nimetyillä pareilla molemmin puolin sanavaraston vahvistamiseen', caption: 'Kuva+Sana-tila — nimetyt kuvaparit molemmin puolin sanavarastomatchaukseen ja sanantunnistukseen' },
      { src: '/samples/finnish/matching/yhdistä-parit-1-answer-key.webp', alt: 'Yhdistämistehtäväarkin vastausavain vaakasuorilla yhdistysviivoilla oikeiden parien välillä välittömään varmistukseen', caption: 'Automaattisesti luotu vastausavain — yhdistysviivat (#555) oikeiden parien välillä välittömään varmistukseen' },
    ],
    youtubeId: 'y3ghkjt_67s',
    videoTitle: 'Näin Teet Yhdistämistehtäviä 4 Tilalla, Automaattisilla Vastausavaimilla ja Lokalisoiduilla Otsikoilla — Vaiheittainen Opas',
  },
};

export default content;
