import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'ilmainen palapeli puuttuvat palat -tehtävä verkossa',
    secondaryKeywords: [
      'puuttuvat palat ilmaiseksi verkossa',
      'palapeligeneraattori ilman rekisteröitymistä',
      'kokeile palapelitehtävää ilmaiseksi',
      'tulostettava puuttuvat palat ilmainen kokeilu',
    ],
    lsiKeywords: [
      'ilmainen',
      'verkossa',
      'vesileima',
      'kokeile',
      'ei rekisteröitymistä',
      'palapelitehtävä',
    ],
    titleTag: 'Ilmainen puuttuvat palat -tehtävä verkossa',
    metaDescription: 'Tee puuttuvat palat -tehtäviä ilmaiseksi verkossa — ei rekisteröitymistä. Kaikki ominaisuudet käytössä, vesileima poistettavissa lisenssillä.',
  },

  hero: {
    title: 'Puuttuvat palat -generaattori',
    tagline: 'Palapelitehtava-generaattori 6 palamuodolla (nelio, ympyra, suorakaide pysty/vaaka, ellipsi pysty/vaaka), 1-5 puuttuvaa palaa 2-6 ratkaisuvaihtoehdolla harhauttajineen, alykaspalanpoiminta-algoritmi varivarianssin tunnistuksella ja 250 pikselin minimietaisyydella, automaattisesti generoidut vastausavaimet keltaisilla korostettuilla numerotunnisteilla, kaksoisreunusjarjestelma sinivihreaella ja kuumalla pinkilla, ja 104 teemallista kuvakokoelmaa',
    description: 'Tee ammattimaisia palapelitehtavia, joissa kuvasta on leikattu aukkoja ja kayttajat tunnistavat, mika numeroitu vaihtoehto tayttaa kunkin aukon. Alykaspalanpoiminta-algoritmi testaa jopa 150 sijoitusyritystae loystaakseen paloja riittaevalla varivariansilla (vaehaen kirkkausvarianssi 15) ja vaehintaen 250 pikselin etaisyydella palojen valilla. Valitse 6 palamuodosta. Maarita vaikeus kahdella itsenaisella saatimella: 1-5 puuttuvaa palaa ja 2-6 ratkaisuvaihtoehtoa. Harhauttajapalat poimitaan paelekkaisaeistymaettoemistae alueista. Kaksoistyoalue-jarjestelma generoi samanaikaisesti tehtavan ja vastausavaimen — vastausavain nayttaa keltaiset korostetut numerotunnisteet (rgba(255,255,0,0.7)) kunkin aukon sisalla. Puuttuvat palat EI ole kieliriippuvainen — taysin visuaalinen, universaalisti myytavissa. Selaa 104 kokoelmaa yli 3 100 kuvituksella. Vie nelja tiedostoa 300 DPI:lla. Ilmainen kokeilu vesileimalla.',
  },

  tutorial: {
    title: 'Nain teet palapelitehtavia 8 vaiheessa',
    steps: [
      {
        title: 'Avaa puuttuvat palat -generaattori',
        description: 'Klikkaa "Kokeile ilmaiseksi nyt" kaynnistaksesi generaattorin. Tyokalu latautuu kaksoisvalilehti-tyoalueella. Ei tilia, ei latausta tarvita.',
      },
      {
        title: 'Maarita palapelin vaikeus kahdella itsenaisella saatimella',
        description: 'Avaa Palapelin asetukset -paneeli. Aseta puuttuvien palojen maara 1-5 — hallitsee montako aukkoa leikataan. Aseta ratkaisuvaihtoehtojen maara 2-6 — hallitsee montako numeroitua valintaa kayttajat arvioivat, harhauttajat mukaan lukien. 1 puuttuva pala ja 2 vaihtoehtoa on helppo; 5 puuttuvaa palaa ja 6 vaihtoehtoa on haastava.',
      },
      {
        title: 'Valitse palamuoto 6 vaihtoehdosta',
        description: 'Valitse palamuoto: nelio (oletus), ympyra, suorakaide pysty (80 % leveys, 100 % korkeus), suorakaide vaaka (100 % leveys, 80 % korkeus), ellipsi pysty tai ellipsi vaaka. Kukin muoto tuottaa erilaisen visuaalisen haasteen.',
      },
      {
        title: 'Valitse kuva tai lataa oma',
        description: 'Selaa 104 teemallista kokoelmaa yli 3 100 varikkaalla kuvituksella. Kuvat vaihtelevilla vareilla ja erillisilla alueilla tuottavat kiinnostavimmat palapelit. Tai lataa omia PNG-, JPG- tai GIF-tiedostoja.',
      },
      {
        title: 'Aseta sivun asettelu ja koristeet',
        description: 'Valitse sivukoko: Letter, A4, Nelio (1200x1200) tai mukautettu. Valitse koristeellinen taustateema ja kehystemma itsenaisilla lapinakyvyyden liukusaatimilla.',
      },
      {
        title: 'Generoi palapelitehtava',
        description: 'Klikkaa Generoi. Alykaspalanpoiminta-algoritmi loystaaepalat riittaevalla varivariansilla ja vaehintaen 250 pikselin etaisyydella. Valkoiset aukot mustalla reunuksella (2px) nakyvaet. Numeroidut ratkaisuvaihtoehdot — oikeat palat ja harhauttajat — nakyvaet keltaisilla numerotunnisteilla.',
      },
      {
        title: 'Tarkista automaattisesti generoitu vastausavain',
        description: 'Klikkaa Vastausavain-valilehteae. Sama palapelituva aukoilla ja keltaiset korostetut numerotunnisteet (rgba(255,255,0,0.7)) kunkin aukon sisalla nayttavat oikean vaihtoehdon indeksin. Kirjasinkoko skaalautuu 60 %:iin palakoon koosta.',
      },
      {
        title: 'Lataa kaikki nelja tiedostoa',
        description: 'Vaihda harmaasavy musteystaevaellisiin versioihin. Lataa kaikki nelja tiedostoa 300 DPI:lla. Klikkaa Generoi uudelleen samalla kuvalla saadaksesi eri palasijoitukset, tai vaihda kuvia ja muotoja nopeaan vaihteluun.',
      },
    ],
  },

  whatYouCanCreate: [
    {
      title: 'Teemakohtaiset palapelitehtavapaketit palamuodon mukaan',
      description: 'Luo palapeli-aktiviteettipaketteja teeman ja palamuodon mukaan 104 kuvakokoelmasta. Yksittainen elainteema tuottaa kuusi erillistae tehtavael tyilia kaikilla palamuodoilla. Pakkaa 15-25 palapeliaeaeper paketti automaattisilla vastausavaimilla.',
    },
    {
      title: 'KDP visuaaliset palapelityokirjat progressiivisella vaikeudella',
      description: 'Kokoa 50-100 palapelitehtavaa painetuiksi tyokirjoiksi. Rakenteen luvut: Luku 1 yhdella puuttuvalla palalla ja 2 vaihtoehdolla, Luku 2 kolmella puuttuvalla ja 4 vaihtoehdolla, Luku 3 viidella puuttuvalla ja 6 vaihtoehdolla harhauttajineen. Vastaussivut loppuun. Taysin visuaalinen muoto ei vaadi kaannosta.',
    },
    {
      title: 'Visuaalisen erottelun aktiviteetit vastausavaimilla',
      description: 'Rakenna myyntivalmiita palapelitehtavia vastausavaimilla itsetarkistaviin asemiin. Kaksiakselinen vaikeusjaarjestelmae antaa sinun eriyttaa — 1 puuttuva pala kampaileville, 5 puuttuvaa harhauttajineen edentyneille.',
    },
    {
      title: 'Mukautetut valokuvapalapelituotteet',
      description: 'Lataa omia kuvia perhevalokuva-palapeleihin, lemmikkivalokuva-palapeleihin ja ryhmakuva-palapeleihin. Alykaspoiminta toimii milla tahansa ladatulla kuvalla. Sekoita palamuotoja maksimaalista vaihtelua varten.',
    },
    {
      title: 'Kausittaiset puuttuvat palat -kokoelmat',
      description: 'Joulu, halloween, paasiinen, koulun alku ja kesa-teemat tukevat kukin omia kausipakettejaan. Sisallyta useita palamuotoja ja vaikeustasoja. Harhauttajapalat lisaavat aitoa haastetta.',
    },
    {
      title: 'Moniformaattiset visuaalisen hahmottamisen paketit',
      description: 'Yhdista puuttuvat palat -palapelit varjoyhdistely-aktiviteetteihin, ruudukkoyhdistely-palapeleihin, etsi erilainen -tehtaviin ja kuvalajittelu-arkkeihin koordinoiduilla teemoilla. Moniformaattipakettit oikeuttavat premium-hinnoittelun.',
    },
  ],

  businessIdeas: [
    {
      title: 'Teemakohtainen palapelitehtava-kauppa Etsyssa',
      description: 'Avaa Etsy-kauppa palapelitehtavapaketeilla 104 kuvakokoelmalla. Kuusi palamuotoa tuottavat erillisia visuaalisia tuotteita. Automaattisesti generoitu vastausavain keltaisilla numerotunnisteilla poistaa tuotantonapullakaulaa.',
      platform: 'Etsy',
    },
    {
      title: 'Amazon KDP visuaalinen palapelityokirjasarja',
      description: 'Kokoa 50-100 palapeliaeaetemakohtaisiksi tyokirjoiksi. Rakenteen vaikeuden mukaan: "Helppoja puuttuvat palat", "Keskitason palapeliahaasteet", "Edistyneita visuaalisen erottelun palapelejaae". Vastaussivut loppuun. Vaihda harmaasavy. Taysin visuaalinen muoto julkaistaan identtisena globaalisti.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Gumroad palapeli-aktiviteettipaketit',
      description: 'Lataa palapeli-aktiviteettipaketteja Gumroadiin automaattisilla vastausavaimilla ja saadettaevalla vaikeudella. Kuusi palamuotoa antavat vaihtelua.',
      platform: 'Gumroad',
    },
    {
      title: 'Pinterest palapelitehtava-liikennetsuppilo',
      description: 'Palapelitehtavat aukoilla ja numeroiduilla vaihtoehdoilla luovat silmaanpistavan formaatin. Taysin visuaalinen muoto vetoaa kaikkiin maihin.',
      platform: 'Pinterest',
    },
    {
      title: 'Gumroad taysi palapelityokalupaketti',
      description: 'Pakkaa palapelit kaikista 104 teemasta, kaikista 6 palamuodosta ja kaikista vaikeustasoista. Sisallyta 400+ palapeliaeautomaattisilla vastausavaimilla.',
      platform: 'Gumroad',
    },
    {
      title: 'Globaali visuaalinen palapelituotelinja',
      description: 'Puuttuvat palat tuottaa taysin visuaalisia palapelejaae — kuvat, aukot ja numeroidut vaihtoehdot ovat universaaleja. Samat tuotetiedostot toimivat jokaisessa maassa ilman kaannosta.',
      platform: 'Etsy / Amazon KDP',
    },
  ],

  proTips: [
    {
      title: 'Valitse kuvia vaihtelevilla vareilla parempaan palanpoimintaan',
      description: 'Alykaspoiminta vaatii vaehintaen kirkkausvarianssin 15 per pala. Kuvat vaihtelevilla vareilla, erillisilla alueilla ja useilla visuaalisilla elementeilla tuottavat parempia palapelejaae.',
    },
    {
      title: 'Kayta kaikkia 6 palamuotoa tuotekatalogisi kertaamiseen',
      description: 'Sama lahdekuva tuottaa kuusi visuaalisesti erillistae palapeliaekauttakaikkien palamuotojen. 20 kuvan teema tuottaa jopa 120 ainutlaatuista palapeliaeae.',
    },
    {
      title: 'Hyodynna harhauttajapaloja premium-vaikeustuotteisiin',
      description: 'Kun ratkaisuvaihtoehdot ylittavat puuttuvien palojen maaran, ylimaaraiset ovat harhauttajia. Luo vaikeustasoja: helpot palapelit ilman harhauttajia ja vaikeat 2-3 ylimaaraisella harhauttajalla.',
    },
    {
      title: 'Hyodynna kaksiakselista vaikeutta progressiiviseen tyokirjasuunnitteluun',
      description: 'Itsenaiset puuttuvat palat (1-5) ja ratkaisuvaihtoehdot (2-6) luovat vaikeusmatriisin. Kartoita tama tyokirjan lukuihin: aloita 1 pala, 2 vaihtoehtoa, etene 3 palaa, 4 vaihtoehtoa, paata 5 palaa, 6 vaihtoehtoa harhauttajineen.',
    },
    {
      title: 'Hyodynna taysin visuaalista muotoa globaaliin myyntiin',
      description: 'Puuttuvat palat -palapelit sisaltavat vain kuvia, aukkoja ja numeroituja vaihtoehtoja — ei kielisidonnaista tekstia. Jokainen palapeli on suoraan myytavissa globaalisti ilman kaannosta.',
    },
    {
      title: 'Kayta kaksoisreunusjarjestelmaa ammattimaiseen tuoteesittelyyn',
      description: 'Automaattinen kaksoisreunus — sinivihrea ulko- (#14B8A6) ja kuuma pinkki sisae (#EC4899) — kehystaa jokaisen palapelin kiillotetulla ulkonaeolla.',
    },
    {
      title: 'Sisallyta vastausavaimet jokaiseen listaukseen kilpailijoiden paihittaemiseksi',
      description: 'Automaattisesti generoitu vastausavain keltaisilla numerotunnisteilla tekee palapeleistasi tayden, itsetarkistavan tuotteen. Sisallyta aina vastausavaimet. Kaksoistyoalue-jarjestelma generoi molemmat versiot samanaikaisesti.',
    },
  ],

  faq: [
    {
      question: 'Onko ilmainen kokeilu saatavilla?',
      answer: 'Kylla. Kaikki ominaisuudet — kaikki 6 palamuotoa, 1-5 puuttuvaa palaa, 2-6 ratkaisuvaihtoehtoa harhauttajineen, automaattisesti generoitu vastausavain, kaikki 104 teemallista kuvakokoelmaa, mukautettu kuvien lataus, tausta- ja kehysteemat, kaksoisreunusjarjestelma, harmaasavykytkin ja kaikki latausmuodot. Ei rekisteroitymista, ei luottokorttia. Vesileima latauksissa.',
    },
    {
      question: 'Miten puuttuvat palat -mekaaniikka toimii?',
      answer: 'Generaattori ottaa kuvan ja leikkaa 1-5 palaa, jattaen valkoiset aukot mustilla reunuksilla (2px). Se nayttaa sitten 2-6 numeroitua ratkaisuvaihtoehtoa — oikeat palat seka harhauttajat eri alueilta. Kayttajat tunnistavat, mika vaihtoehto tayttaa kunkin aukon.',
    },
    {
      question: 'Mitka 6 palamuotoa ovat saatavilla?',
      answer: 'Nelio (oletus), ympyra, suorakaide pysty (80 % leveys, 100 % korkeus), suorakaide vaaka (100 % leveys, 80 % korkeus), ellipsi pysty ja ellipsi vaaka. Kukin muoto tuottaa erilaisen visuaalisen haasteen.',
    },
    {
      question: 'Miten kaksi itsenaisestae vaikeussaadinta toimivat?',
      answer: 'Puuttuvat palat (1-5) maeaeraaeae aukkojen maaran. Ratkaisuvaihtoehdot (2-6) maeaeraaeae numeroitujen valintojen maaran. Kun vaihtoehdot ylittavat puuttuvien palojen maaran, ylimaaraiset ovat harhauttajia.',
    },
    {
      question: 'Mita harhauttajapalat ovat?',
      answer: 'Ylimaaraiset ratkaisuvaihtoehdot, jotka eivat vastaa mitaan aukkoa. Poimitaan eri alueilta jopa 200 yrityksella. Pakottavat kayttajat vertaamaan huolellisesti visuaalisia yksityiskohtia.',
    },
    {
      question: 'Onko puuttuvat palat -generaattori kieliriippuvainen?',
      answer: 'Ei. Taysin visuaalinen muoto — ei kielisidonnaisia elementteja tehtavassa. Ainoa lokalisoitu elementti on otsikkoteksti, kaannetty kaikille 11 kielelle. Universaalisti myytavissa.',
    },
    {
      question: 'Mitka sivukoot ja vientimuodot ovat saatavilla?',
      answer: 'Letter, A4, Nelio (1200x1200) ja mukautetut mitat. JPEG tai PDF 300 DPI:lla. Vaihda harmaasavy. Nelja tiedostoa per generointi.',
    },
    {
      question: 'Voinko myyda palapelitehtavia kaupallisesti?',
      answer: 'Kylla. Kaupallisella lisenssilla taydet oikeudet myydaeadigitaalisina latauksina Etsyssa, painettuina tyokirjoina Amazon KDP:ssa, resursseina Gumroadissa tai minka tahansa muun kanavan kautta.',
    },
    {
      question: 'Mika on palautuskaytantonne?',
      answer: 'Kokeile ennen ostoa ilmaisella kokeilujaksollamme — kaikki ominaisuudet kaytettavissa. Koska ilmainen kokeilu antaa tayden paasynae, emme tarjoa palautuksia.',
    },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'puuttuvat-palat-tehtavat', anchorText: 'Puuttuvat palat -palapelit — Taydet tuotetiedot' },
    { pageType: 'tool', slug: 'etsi-erilainen-tyokalu', anchorText: 'Etsi erilainen -generaattori' },
    { pageType: 'tool', slug: 'varjoyhdistely-tyokalu', anchorText: 'Varjoyhdistely-generaattori' },
    { pageType: 'tool', slug: 'ruudukkopeli-tyokalu', anchorText: 'Ruudukkopalapeli-generaattori' },
    { pageType: 'tool', slug: 'yhdistamistehtava-tyokalu', anchorText: 'Yhdistamistehtava-generaattori' },
    { pageType: 'tool', slug: 'kuvalajittelu-tyokalu', anchorText: 'Kuvalajittelu-generaattori' },
    { pageType: 'tool', slug: 'sanahaku-tyokalu', anchorText: 'Sanahaku-generaattori' },
    { pageType: 'tool', slug: 'varitys-tyokalu', anchorText: 'Varitys-generaattori' },
    {
      pageType: 'app',
      slug: 'missing-pieces-worksheets',
      anchorText: 'Ready to sell what you make? Get the commercial license.',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/finnish/missing%20pieces/puuttuvat-palat-1.webp',
      primaryAlt: 'Palapelitehtava aukoilla leikattuna varikkaasta kuvituksesta ja numeroiduilla ratkaisuvaihtoehdoilla harhauttajineen turkoosilla Puuttuvat palat -otsikolla ja sinivihrea-pinkilla kaksoisreunuksella',
    },
    sampleGallery: [
      {
        src: '/samples/finnish/missing%20pieces/puuttuvat-palat-2.webp',
        alt: 'Puuttuvat palat -palapeli nelionmuotoisilla aukoilla varikkaasta kuvituksesta ja numeroiduilla ratkaisuvaihtoehdoilla',
        caption: 'Neliopalamuoto — siistit geometriset leikkaukset numeroiduilla ratkaisuvaihtoehdoilla harhauttajineen',
      },
      {
        src: '/samples/finnish/missing%20pieces/puuttuvat-palat-3.webp',
        alt: 'Puuttuvat palat -palapeli pyoreilla aukoilla ja numeroiduilla ratkaisuvaihtoehdoilla harhauttajapaloilla',
        caption: 'Ymppyraepalamuoto — pyoristetyt leikkaukset harhauttajilla, jotka estaevat poissulkemisratkaisun',
      },
      {
        src: '/samples/finnish/missing%20pieces/puuttuvat-palat-1-answer-key.webp',
        alt: 'Puuttuvat palat -palapelin vastausavain keltaisilla koristetuilla numerotunnisteilla kunkin aukon sisalla oikean vaihtoehdon indeksilla',
        caption: 'Automaattisesti generoitu vastausavain — keltaiset korostetut tunnisteet (rgba(255,255,0,0.7)) nayttavat oikean vaihtoehdon jokaiselle aukolle',
      },
    ],
    youtubeId: 'gb-xE_Ay4fc',
    videoTitle: 'Nain teet palapelitehtavia 6 palamuodolla, alykkaaella poiminnalla, harhauttajilla ja automaattisilla vastausavaimilla — vaiheittainen opas',
  },
};

export default content;
