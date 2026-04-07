import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'ilmainen mikä ei kuulu joukkoon -tehtävä verkossa',
    secondaryKeywords: [
      'mikä ei kuulu joukkoon ilmaiseksi verkossa',
      'etsi erilainen -generaattori ilman rekisteröitymistä',
      'kokeile etsi erilainen ilmaiseksi',
      'tulostettava etsi erilainen ilmainen kokeilu',
    ],
    lsiKeywords: [
      'ilmainen',
      'verkossa',
      'vesileima',
      'kokeile',
      'ei rekisteröitymistä',
      'erottelutehtävä',
    ],
    titleTag: 'Ilmainen mikä ei kuulu joukkoon verkossa | Kokeile',
    metaDescription: 'Tee mikä ei kuulu joukkoon -tehtäviä ilmaiseksi verkossa — ei rekisteröitymistä. Kaikki ominaisuudet käytössä, vesileima poistettavissa lisenssillä.',
  },

  hero: {
    title: 'Etsi erilainen -generaattori',
    tagline: 'Kaksoistilan etsi erilainen -tehtavageneraattori Identtinen-tilalla (3 kloonia + 1 erilainen samasta teemasta) ja Samanlainen-tilalla (3 Teemasta A + 1 Teemasta B), harjoituskohtaisella tilan ohituksella, 5-10 saadettaevalla harjoituksella, automaattisesti generoiduilla vastausavaimilla punaisilla ympyraemerkinnoeilla ja 104 teemallisella kuvakokoelmalla',
    description: 'Tee ammattimaisia etsi erilainen -tehtavia, joissa kayttajat tunnistavat ja ymparoivat kuvan, joka ei kuulu joukkoon jokaisessa neljanneltaen kuvan rivissa. Kaksi erillistae tilaa: Identtinen-tila asettaa kolme kloonia yhden erilaisen kuvan viereen samasta teemasta — kayttajat loytavat sen, joka ei ole kopio. Samanlainen-tila hakee kolme kuvaa Teemasta A ja yhden Teemasta B — kayttajat tunnistavat temaattisen poikkeajan. Harjoituskohtainen tilan ohitus pudotusvalikolla kullakin rivilla — sekoita Identtisiaejaae Samanlaisia harjoituksia yhdelle tehtavalle. Maarita 5-10 harjoitusta (oletus 6) 4 kuvaa per harjoitus. Kaksoistyoalue-jarjestelma generoi samanaikaisesti tehtavan ja vastausavaimen — vastausavain piirtaa punaiset ympyraereunukset poikkeavan kohteen ympaerille. EI kieliriippuvainen — taysin visuaalinen. Selaa 104 teemallista kokoelmaa. Vie nelja tiedostoa 300 DPI:lla. Ilmainen kokeilu vesileimalla.',
  },

  tutorial: {
    title: 'Nain teet etsi erilainen -tehtavia 8 vaiheessa',
    steps: [
      {
        title: 'Avaa etsi erilainen -generaattori',
        description: 'Klikkaa "Kokeile ilmaiseksi nyt" kaynnistaksesi generaattorin. Tyokalu latautuu kaksoisvalilehti-tyoalueella. Ei tilia, ei latausta tarvita.',
      },
      {
        title: 'Valitse generointitila',
        description: 'Avaa Harjoituksen asetukset -paneeli. Identtinen-tila — kolme kloonia samasta kuvasta yhden erilaisen kuvan vieressa samasta teemasta. Samanlainen-tila — kolme kuvaa Teemasta A ja yksi Teemasta B. Kukin tila tuottaa erilaisen kognitiivisen haasteen.',
      },
      {
        title: 'Aseta harjoitusmaara ja harjoituskohtaiset ohitukset',
        description: 'Aseta harjoitusmaara 5-10 (oletus 6). Kukin harjoitus sisaltaa aina 4 kuvaa. Sekoitetun vaikeuden tehtavia varten kayta harjoituskohtaista tilan pudotusvalikkoa kullakin rivilla — aloita helpoilla Identtisilla, etene haastavampiin Samanlaisiin. "Tyhjenna valinnat" -painike nollaa kaikki ohitukset.',
      },
      {
        title: 'Valitse teemat ja kuvat kirjastosta',
        description: 'Valitse Teema A pudotusvalikosta — antaa kolme tavallista kuvaa Samanlainen-tilassa. Valitse Teema B poikkeavaa kohdetta varten (esim. Teema A = elaimet, Teema B = ruoka). Selaa 104 teemallista kokoelmaa. Identtinen-tilassa tarvitaan vain yksi teema.',
      },
      {
        title: 'Aseta sivun asettelu ja koristeet',
        description: 'Valitse sivukoko: Letter, A4, Nelio (1200x1200) tai mukautettu. Valitse koristeellinen taustateema ja kehystemma itsenaisilla lapinakyvyyden liukusaatimilla.',
      },
      {
        title: 'Generoi etsi erilainen -tehtava',
        description: 'Klikkaa Generoi. Jokainen harjoituskortti nayttaa nelja kuvaa vaakarivissa — kolme tavallista ja yksi poikkeava satunnaisesti sekoitetulla sijainnilla. Tyylitelty otsikko korallireunuksella (#FF6B6B), meripihkareunuksella (#FFB84D) ja turkoosilla taustalla (#4ECDC4) nakyy lokalisoidulla otsikolla.',
      },
      {
        title: 'Tarkista automaattisesti generoitu vastausavain',
        description: 'Klikkaa Vastausavain-valilehteae. Vastausavain toistaa asettelun ja piirtaa punaiset ympyraereunukset poikkeavan kohteen ympaerille jokaisessa rivissa. Ympyran viivaleveys skaalautuu dynaamisesti kuvakoon mukaan (max(imageSize x 0,04, 3px)).',
      },
      {
        title: 'Lataa kaikki nelja tiedostoa',
        description: 'Vaihda harmaasavy. Lataa kaikki nelja tiedostoa 300 DPI:lla. Klikkaa Generoi uudelleen uudella satunnaisella sekoituksella, tai vaihda teemoja ja tiloja nopeaan vaihteluun.',
      },
    ],
  },

  whatYouCanCreate: [
    {
      title: 'Teemakohtaiset etsi erilainen -paketit tilan ja teemaparin mukaan',
      description: 'Luo aktiviteettipaketteja tilan ja teemaparin mukaan 104 kuvakokoelmasta. Yksittainen pari kuten elaimet vs ruoka tuottaa tehtavia molemmissa tiloissa. Pakkaa 15-20 tehtavaa per paketti. Kayta harjoituskohtaisia ohituksia sekoitetun vaikeuden tehtaviin.',
    },
    {
      title: 'KDP visuaalisen erottelun tyokirjat progressiivisella vaikeudella',
      description: 'Kokoa 50-80 tehtavaa painetuiksi tyokirjoiksi. Luku 1 Identtinen-tila, Luku 2 Samanlainen-tila selvilla kontrasteilla, Luku 3 Samanlainen hienoimmilla eroilla. Vastaussivut punaisilla ympyraemerkinnoilla loppuun. Taysin visuaalinen muoto ei vaadi kaannosta.',
    },
    {
      title: 'Kriittisen ajattelun aktiviteetit vastausavaimilla',
      description: 'Rakenna myyntivalmiita tehtavia nimi/paivamaara-kentilla, harjoitusnumeroilla ja vastausavaimilla. Harjoituskohtainen ohitus tuottaa tasoitettuja versioita samalla sivulla.',
    },
    {
      title: 'Sekoitetun vaikeuden progressiiviset palapelikortit',
      description: 'Kayta harjoituskohtaista tilan ohitusta progressiiviseen vaikeuteen — aloita 3 Identtisella harjoituksella lammietelyyn, etene 3 Samanlaiseen paahaastetta varten.',
    },
    {
      title: 'Kausittaiset etsi erilainen -kokoelmat',
      description: 'Joulu, halloween, paasiinen, koulun alku ja kesa-teemat tukevat kukin omia kausipakettejaan. Sekoita Identtinen- ja Samanlainen-tiloja. Julkaise 4-6 viikkoa ennen juhlapyhaa.',
    },
    {
      title: 'Moniformaattiset visuaalisen hahmottamisen paketit',
      description: 'Yhdista etsi erilainen varjoyhdistely-, puuttuvat palat -, ruudukkoyhdistely- ja kuvalajittelu-tehtaviin koordinoiduilla teemoilla. Moniformaattipakettit oikeuttavat premium-hinnoittelun.',
    },
  ],

  businessIdeas: [
    {
      title: 'Teemakohtainen etsi erilainen -palapeli-kauppa Etsyssa',
      description: 'Avaa Etsy-kauppa etsi erilainen -palapelipaketeilla 104 kuvakokoelmalla. Elaimet vs ruoka, ajoneuvot vs luonto — kukin yhdistelma tulee erilliseksi listaukseksi molemmilla tiloilla. Jokainen paketti sisaltaa automaattisesti generoidut vastausavaimet punaisilla ympyraemerkinnoilla.',
      platform: 'Etsy',
    },
    {
      title: 'Amazon KDP visuaalisen erottelun tyokirjasarja',
      description: 'Kokoa 50-80 tehtavaa teemallisiksi tyokirjoiksi. Rakenteen vaikeuden mukaan: "Helppoja etsi erilainen" Identtinen-tilalla, "Keskitason etsi poikkeava" Samanlainen-tilalla, "Edistyneita visuaalisen erottelun tehtavia" harjoituskohtaisilla sekoitetuilla tiloilla. Vastaussivut punaisilla ympaeroilla loppuun.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Gumroad etsi erilainen -aktiviteettipaketit',
      description: 'Lataa aktiviteettipaketteja Gumroadiin nimi/paivamaara-kentilla, harjoitusnumeroilla ja automaattisilla vastausavaimilla. Jokainen paketti sisaltaa Identtinen-tilan ohjattuun harjoitteluun ja Samanlainen-tilan itsenaiseen haasteeseen.',
      platform: 'Gumroad',
    },
    {
      title: 'Pinterest etsi erilainen -liikennetsuppilo',
      description: 'Nelja varikasta kuvaa rivissa, joista yksi selvaesti ei kuulu joukkoon, luo valittomasti kiinnostavan formaatin. Taysin visuaalinen muoto vetoaa kaikkiin maihin.',
      platform: 'Pinterest',
    },
    {
      title: 'Gumroad taysi etsi erilainen -tyokalupaketti',
      description: 'Pakkaa tehtavat kaikista 104 teemasta ja molemmista tiloista harjoituskohtaisilla sekoitetuilla sivuilla. Sisallyta 300+ tehtavaa automaattisilla vastausavaimilla — 600+ tiedostoa.',
      platform: 'Gumroad',
    },
    {
      title: 'Globaali visuaalinen palapelituotelinja',
      description: 'Etsi erilainen tuottaa taysin visuaalisia palapelejaae — nelja kuvaa per rivi ilman kielisidonnaista tekstia. Automaattinen otsikko kaantyy 11 kielelle. Samat tuotetiedostot toimivat jokaisessa maassa.',
      platform: 'Etsy / Amazon KDP',
    },
  ],

  proTips: [
    {
      title: 'Valitse erottuvat teemaparit Samanlainen-tilaan',
      description: 'Laatu riippuu siita, kuinka selvaesti poikkeava kohde erottuu. Valitse selvat kategoriaerot nuoremmille — elaimet vs ajoneuvot. Kayta hienovaraisempia pareja edentyneisiin tuotteisiin — lemmikit vs villit elaimet.',
    },
    {
      title: 'Kayta harjoituskohtaisia ohituksia premium-progressiiviseen vaikeuteen',
      description: 'Harjoituskohtainen tilan pudotusvalikko tuottaa progressiivisia tehtavia, jotka palvelevat useita tasoja yhdella sivulla. Aloita 2-3 Identtisella, etene 3-4 Samanlaiseen.',
    },
    {
      title: 'Hyodynna taysin visuaalista muotoa globaaliin myyntiin',
      description: 'Etsi erilainen -tehtavat sisaltavat vain kuvia — ei kielisidonnaista tekstia tehtavan sisallossa. Jokainen palapeli on suoraan myytavissa globaalisti.',
    },
    {
      title: 'Sisallyta molemmat tilat jokaiseen pakettiin maksimaalista koettua arvoa varten',
      description: 'Paketit molemmilla Identtinen- ja Samanlainen-tilalla tarjoavat enemman vaihtelua. Molempien sisallyttaminen kaksinkertaistaa vaihtelun ja oikeuttaa korkeamman hinnan.',
    },
    {
      title: 'Hyodynna harjoitusmaeraa ikaeryhmaan kohdistetuissa tuotteissa',
      description: 'Kayta 5 harjoitusta esikoulutuotteisiin suuremmilla kuvakorteilla. Kayta 8-10 vanhemmille. Asettelu mukautuu automaattisesti 2 sarakkeeseen.',
    },
    {
      title: 'Kayta harmaasavykytkintae budjettiystaevaellisiin tuotteisiin',
      description: 'Luo kaksoismuotoisia paketteja seka vari- etta harmaasavyversioilla. Ostajat kokevat taman kaksinkertaiseksi arvoksi. KDP-painatukset hyotyvaet myos harmaasavyoptimoinnista.',
    },
    {
      title: 'Sisallyta vastausavaimet jokaiseen listauksen esikatseluun',
      description: 'Automaattisesti generoitu vastausavain punaisilla ympyraemerkinnoilla on vahvin erottautumistekijasi. Nayta punaiset ympaerat selvaesti tuotekuvissa. Kaksoistyoalue-jarjestelma generoi molemmat versiot samanaikaisesti.',
    },
  ],

  faq: [
    {
      question: 'Onko ilmainen kokeilu saatavilla?',
      answer: 'Kylla. Kaikki ominaisuudet — molemmat generointitilat, harjoituskohtaiset ohitukset Tyhjenna valinnat -toiminnolla, saadettava harjoitusmaara (5-10), automaattisesti generoitu vastausavain punaisilla ympyraemerkinnoilla, kaksitilainen jarjestelma, kaikki 104 teemallista kuvakokoelmaa, mukautettu kuvien lataus, tausta- ja kehysteemat, nimi/paivamaara-kentat, harjoitusnumerot, harmaasavykytkin ja kaikki latausmuodot. Ei rekisteroitymista, ei luottokorttia. Vesileima latauksissa.',
    },
    {
      question: 'Mitka ovat kaksi generointitilaa?',
      answer: 'Identtinen-tila — kolme kloonia samasta kuvasta yhden erilaisen kuvan vieressa samasta teemasta, kayttajat loytavat sen joka ei ole kopio. Samanlainen-tila — kolme kuvaa Teemasta A ja yksi Teemasta B, kayttajat tunnistavat temaattisen poikkeajan. Ohita tila per harjoitus pudotusvalikolla kullakin rivilla.',
    },
    {
      question: 'Miten harjoituskohtainen tilan ohitus toimii?',
      answer: 'Jokaisella harjoitusrivilla on pudotusvalikko, joka ohittaa globaalin tilan. Aseta globaaliksi Samanlainen, vaihda sitten yksittaiset harjoitukset Identtiseksi. "Tyhjenna valinnat" nollaa kaikki. Tama tuottaa sekoitetun vaikeuden tehtavia.',
    },
    {
      question: 'Montako harjoitusta voin sisallyttaa?',
      answer: 'Saadettavissa 5-10, oletus 6. Kukin harjoitus sisaltaa aina 4 kuvaa — 3 tavallista + 1 poikkeava satunnaisella sijainnilla. Asettelu mukautuu automaattisesti 2 sarakkeeseen 7+ harjoituksella pystysivulla.',
    },
    {
      question: 'Miten vastausavain punaisilla ympaeroilla toimii?',
      answer: 'Kaksoistyoalue-jarjestelma generoi molemmat valilehdet samanaikaisesti. Tehtava — ei merkintoja. Vastausavain — punaiset ympyraereunukset poikkeavan kohteen ympaerille jokaisessa rivissa. Ympyran viivaleveys skaalautuu (max(imageSize x 0,04, 3px)). Nelja lataustiedostoa.',
    },
    {
      question: 'Onko etsi erilainen -generaattori kieliriippuvainen?',
      answer: 'Ei. Taysin visuaalinen muoto — ei tekstia tehtavan sisallossa. Nelja kuvaa per rivi ja punaiset ympyraemerkinnaetvastausavaimessa ovat universaaleja. Ainoa lokalisoitu elementti on otsikkoteksti, kaannetty 11 kielelle.',
    },
    {
      question: 'Mitka sivukoot ja vientimuodot ovat saatavilla?',
      answer: 'Letter, A4, Nelio (1200x1200) ja mukautetut mitat. JPEG tai PDF 300 DPI:lla. Vaihda harmaasavy. Nelja tiedostoa per generointi.',
    },
    {
      question: 'Voinko myyda etsi erilainen -tehtavia kaupallisesti?',
      answer: 'Kylla. Kaupallisella lisenssilla taydet oikeudet myydaeadigitaalisina latauksina Etsyssa, painettuina tyokirjoina Amazon KDP:ssa, resursseina Gumroadissa tai minka tahansa muun kanavan kautta.',
    },
    {
      question: 'Mika on palautuskaytantonne?',
      answer: 'Kokeile ennen ostoa ilmaisella kokeilujaksollamme — kaikki ominaisuudet kaytettavissa. Koska ilmainen kokeilu antaa tayden paasynae, emme tarjoa palautuksia.',
    },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'etsi-erilainen-tehtavat', anchorText: 'Etsi erilainen -palapelit — Taydet tuotetiedot' },
    { pageType: 'tool', slug: 'puuttuvat-palat-tyokalu', anchorText: 'Puuttuvat palat -generaattori' },
    { pageType: 'tool', slug: 'varjoyhdistely-tyokalu', anchorText: 'Varjoyhdistely-generaattori' },
    { pageType: 'tool', slug: 'ruudukkopeli-tyokalu', anchorText: 'Ruudukkopalapeli-generaattori' },
    { pageType: 'tool', slug: 'yhdistamistehtava-tyokalu', anchorText: 'Yhdistamistehtava-generaattori' },
    { pageType: 'tool', slug: 'kuvalajittelu-tyokalu', anchorText: 'Kuvalajittelu-generaattori' },
    { pageType: 'tool', slug: 'sanahaku-tyokalu', anchorText: 'Sanahaku-generaattori' },
    { pageType: 'tool', slug: 'varitys-tyokalu', anchorText: 'Varitys-generaattori' },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/finnish/odd%20one%20out/L%C3%B6yd%C3%A4%20Outo%20Lintu%201.webp',
      primaryAlt: 'Etsi erilainen -tehtava neljalla kuvalla per harjoitusrivi nayttaen kolme tavallista kohdetta ja yhden poikkeavan koralli-meripihka-turkoosi-otsikolla',
    },
    sampleGallery: [
      {
        src: '/samples/finnish/odd%20one%20out/L%C3%B6yd%C3%A4%20Outo%20Lintu%202.webp',
        alt: 'Samanlainen-tilan etsi erilainen -tehtava kolmella kuvalla Teemasta A ja yhdella temaattisella poikkeavalla Teemasta B per harjoitusrivi',
        caption: 'Samanlainen-tila — kolme kuvaa Teemasta A ja yksi poikkeava kohde Teemasta B teemojen valista erottelua varten',
      },
      {
        src: '/samples/finnish/odd%20one%20out/L%C3%B6yd%C3%A4%20Outo%20Lintu%203.webp',
        alt: 'Identtinen-tilan etsi erilainen -tehtava kolmella kloonilla samasta kuvasta ja yhdella erilaisella kuvalla samasta teemasta per rivi',
        caption: 'Identtinen-tila — kolme kloonia samasta kuvasta ja yksi erilainen kuva kopion loystaemishaasteita varten',
      },
      {
        src: '/samples/finnish/odd%20one%20out/L%C3%B6yd%C3%A4%20Outo%20Lintu%201%20answer-key.webp',
        alt: 'Etsi erilainen -vastausavain punaisilla ympyraereunuksilla piirrettyina poikkeavan kohteen ympaerille jokaisessa harjoitusrivissa',
        caption: 'Automaattisesti generoitu vastausavain — punaiset ympyraemerkinnae (viiva = max(imageSize x 0,04, 3px)) tunnistavat poikkeavan kohteen jokaisessa rivissa',
      },
    ],
    youtubeId: '0R6WFUfY7Mk',
    videoTitle: 'Nain teet etsi erilainen -tehtavia kahdella generointitilalla, harjoituskohtaisilla ohituksilla ja automaattisilla vastausavaimilla — vaiheittainen opas',
  },
};

export default content;
