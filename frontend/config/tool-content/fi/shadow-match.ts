import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'varjoyhdistely-tehtavat generaattori',
    secondaryKeywords: [
      'varjoyhdistely-tehtavien generaattori myyjille',
      'tee siluettiyhdistely-tehtavia myyntiin',
      'tulostettava varjopalapeli-generaattori kaupallinen kaytto',
      'varjoyhdistely-tehtavien generaattori KDP ja Etsy',
    ],
    lsiKeywords: [
      'kaksoistila siluetti ja jaettu kuva yhdistelytyo kalu',
      'pikselitason varjogenerointi sekoitusalgoritmi generaattori',
      'automaattinen vastausavain varjopalapeli-tehtavien generaattori',
    ],
    titleTag: 'Varjoyhdistely-generaattori — Tehtavageneraattori — Myyjaopas',
    metaDescription: 'Tee varjoyhdistely-tehtavia pikselitason silueteilla ja Taydenna Kuva -kuvanjaolla, automaattisilla vastausavaimilla, 104 teemaa. Ilmainen kokeilu vesileimalla.',
  },

  hero: {
    title: 'Varjoyhdistely-generaattori',
    tagline: 'Kaksoistilan varjoyhdistely-tehtavageneraattori pikselitason siluettien luomisella, Taydenna Kuva -jaetun kuvan puoliskoilla vaaka- ja pystyleikkaussuunnilla, Fisher-Yates-sekoituksella joka takaa, ettei triviaaleja vastaavuuksia synny, automaattisesti generoiduilla vastausavaimilla kirjain-numero-tunnisteilla ja 104 teemallisella kuvakokoelmalla',
    description: 'Tee ammattimaisia varjoyhdistely-tehtavia kahdella erillisella harjoitustilalla. Varjoyhdistely-tila asettaa 4 varikuvaa merkittyina A, B, C, D ylariville ja 4 automaattisesti generoitua mustaa siluettia merkittyina 1, 2, 3, 4 alariville — siluetit luodaan pikselitason kuvankasittelylla, joka muuntaa jokaisen pikselin, jonka alfa > 10, puhtaaksi mustaksi. Taydenna Kuva -tila jakaa 4 kuvaa puoliskoihin — valitse vaaka- (yla/ala) tai pysty- (vasen/oikea) leikkaussuunta. Molemmat tilat kayttavat Fisher-Yates-sekoitusta, joka takaa, ettei mikaan kohde esiinny alkuperaisessa paikassaan. Kaksoistyoalueen jarjestelma generoi samanaikaisesti tehtavan ja vastausavaimen — vastausavain nayttaa jokaisen oikean kirjain-numero-parinnon. Varjoyhdistely EI ole kieliriippuvainen — taysin visuaalinen tuotos, maailmanlaajuisesti myytavissa ilman kaannosta. Selaa 104 teemallista kokoelmaa yli 3 100 kuvituksella tai lataa omia kuvia. Vie nelja tiedostoa per istunto 300 DPI:lla. Ilmainen kokeilu sisaltaa kaikki ominaisuudet vesileimalla. Osta lisenssi poistaaksesi vesileiman ja myydaksesi kaupallisesti.',
  },

  tutorial: {
    title: 'Nain teet varjoyhdistely-tehtavia 8 vaiheessa',
    steps: [
      {
        title: 'Avaa varjoyhdistely-generaattori',
        description: 'Klikkaa "Kokeile ilmaiseksi nyt" kaynnistaksesi varjoyhdistely-tehtavageneraattorin. Tyokalu latautuu suoraan asetussivupaneelilla vasemmalla ja kaksoisvalilehti-tyoalueella oikealla. Ei tilia, ei latausta, ei asennusta tarvita.',
      },
      {
        title: 'Valitse harjoitustila',
        description: 'Avaa Harjoituksen asetukset -paneeli ja valitse tila. Varjoyhdistely generoi mustia siluetteja pikselitason kasittelylla — jokainen pikseli, jonka alfa > 10, muunnetaan puhtaaksi mustaksi. Taydenna Kuva jakaa kuvat puoliskoihin — valitse vaaka- (yla/ala) tai pysty- (vasen/oikea) leikkaussuunta. Kukin tila tuottaa perustavanlaatuisesti erilaisen yhdistelytoiminnon.',
      },
      {
        title: 'Maarita tunnisteet ja nimi/paivamaara-kentat',
        description: 'Vaihda "Nayta tunnisteet" (oletuksena PAALLA) A/B/C/D- ja 1/2/3/4-tunnisteille. Tunnisteet PAALLA — kayttajat kirjoittavat kirjain-numero-pareja vastauksiksi. Tunnisteet POIS — puhdas visuaalinen yhdistelyhaaaste, ihanteellinen palapelihoihin. Valitse "Sisallyta Nimi/Paivamaara-kentat" tunnistamista varten.',
      },
      {
        title: 'Valitse 4 kuvaa kirjastosta tai lataa omat',
        description: 'Selaa 104 teemallista kokoelmaa yli 3 100 varikkaalla kuvituksella. Klikkaa kuvia valitaksesi — laskuri nayttaa edistymisesi kohti 4 kuvaa. Molemmat tilat kayttavat aina tarkalleen 4 kuvaa. Tai lataa omia PNG-, JPG- tai GIF-tiedostoja.',
      },
      {
        title: 'Aseta sivun asettelu ja koristeet',
        description: 'Valitse sivukoko: Letter pysty, Letter vaaka, A4, Nelio (1200x1200) tai mukautettu. Valitse sivun taustavari. Valitse koristeellinen taustateema ja kehystemma itsenaisilla lapinakyvyyden liukusaatimilla (0-1, askel 0,05).',
      },
      {
        title: 'Generoi varjoyhdistely-tehtava',
        description: 'Klikkaa Generoi. Varjoyhdistely-tilassa sovellus kasittelee jokaisen kuvan pikselitasolla tuottaakseen oikeat siluetit. Taydenna Kuva -tilassa kuvat jaetaan valitsemasi leikkaussuunnan mukaan. Molemmat tilat kayttavat Fisher-Yates-sekoitusta — mikaan siluetti ei istu vastaavan kuvansa alla. Tyylitelty otsikko keltaisella taustalla (#FFC107) ilmestyy.',
      },
      {
        title: 'Tarkista automaattisesti generoitu vastausavain',
        description: 'Klikkaa Vastausavain-valilehteae. Varjoyhdistely-tilassa kukin solu nayttaa alkuperaisen kuvan siluettinsa vieressa tunnisteella kuten "A -> 2". Taydenna Kuva -tilassa kukin solu nayttaa tayden alkuperaisen kuvan vastaavuustunnisteellaan. Vastausavain generoidaan samanaikaisesti tehtavan kanssa.',
      },
      {
        title: 'Lataa kaikki nelja tiedostoa',
        description: 'Vaihda harmaasavy musteystaevaellisiin versioihin. Lataa kaikki nelja tiedostoa: tehtava-JPEG, tehtava-PDF, vastausavain-JPEG ja vastausavain-PDF — kaikki 300 DPI:lla. Klikkaa Generoi uudelleen samoilla kuvilla saadaksesi erilaisen sekoitusjarjestyksen, tai vaihda kuvia ja tiloja nopeaan vaihteluun.',
      },
    ],
  },

  whatYouCanCreate: [
    {
      title: 'Teemakohtaiset varjoyhdistelypakettit tilan mukaan',
      description: 'Luo varjoyhdistely-aktiviteettipaketteja tilan ja teeman mukaan 104 kuvakokoelmasta. Yksittainen elainteema tuottaa kolme erillistae tehtavatyyppia: Varjoyhdistely siluettien tunnistamiseen, Taydenna Kuva vaakasuuntaisilla leikkauksilla ja Taydenna Kuva pystysuuntaisilla leikkauksilla. Pakkaa 15-20 tehtavaa per paketti automaattisilla vastausavaimilla. Fisher-Yates-sekoitus tuottaa erilaisen jarjestyksen jokaisella generoinnilla.',
    },
    {
      title: 'KDP visuaalisen hahmottamisen palapelikirjat',
      description: 'Kokoa 50-80 varjoyhdistely-tehtavaa painettuihin tyokirjoihin Amazon KDP:lle. Rakenteen luvut: Luku 1 Varjoyhdistely-tila, Luku 2 Taydenna Kuva vaakaleikkauksilla, Luku 3 Taydenna Kuva pystyleikkauksilla. Vastaussivut loppuun. Vaihda harmaasavy. Taysin visuaalinen muoto ei vaadi kaannosta.',
    },
    {
      title: 'Myyntivalmiit varjopalapeli-aktiviteetit',
      description: 'Rakenna myyntivalmiita varjoyhdistely-tehtavia nimi/paivamaara-kentilla ja vastausavaimilla. Tunnistekytkin tuottaa tuettuja versioita (tunnisteilla) ja haaste-versioita (ilman tunnisteita) samalla generoinnilla. Jokainen tehtava viedaan automaattisella vastausavaimella.',
    },
    {
      title: 'Mukautetut valokuva-varjoyhdistely-tuotteet',
      description: 'Lataa omia kuvia perhevalokuva-siluettipalapaleihin, lemmikit-varjoyhdistely- ja ryhmakuva-jaettu kuva -aktiviteetteihin. Pikselitason siluettigenerointi toimii milla tahansa ladatulla kuvalla.',
    },
    {
      title: 'Kausittaiset varjoyhdistely-kokoelmat',
      description: 'Halloween-varjoyhdistely on luonnollisesti suosittua — siluettiaktiviteetit sopivat taydellisesti varjo- ja mysteeri-teemoihin. Joulu, paasiinen, ystavanpaiva ja kesa-teemat tukevat kukin omia pakettejaan. Sisallyta seka Varjoyhdistely etta Taydenna Kuva. Sekoitusalgoritmi varmistaa ainutlaatuiset tehtavat.',
    },
    {
      title: 'Moniformaattiset visuaalisen oppimisen paketit',
      description: 'Yhdista varjoyhdistely ruudukkoyhdistely-palapaleihin, yhdistamistehtaviin, puuttuvat palat -aktiviteetteihin ja kuvalajittelu-tehtaviin koordinoiduilla teemoilla. Kukin formaatti kohdistuu eri kognitiiviseen taitoon. Moniformaattipakettit oikeuttavat premium-hinnoittelun.',
    },
  ],

  businessIdeas: [
    {
      title: 'Teemakohtainen varjopalahelikauppa Etsyssa',
      description: 'Avaa Etsy-kauppa erikoistuen varjoyhdistely-palapelipaketteihin 104 kuvakokoelmalla. Jokainen palapeli sisaltaa automaattisesti generoidun vastausavaimen kirjain-numero-tunnisteilla. Pikselitason siluettigenerointi tuottaa ammattimaista laatua.',
      platform: 'Etsy',
    },
    {
      title: 'Amazon KDP visuaalisen hahmottamisen tyokirjasarja',
      description: 'Kokoa 50-80 varjoyhdistely-tehtavaa teematyokirjoihin Amazon KDP:lle. Rakenteen aktiviteettityypin mukaan: "Varjoyhdistely-palapelit" siluettien tunnistamiseen, "Taydenna Kuva -palapelit" jaetun kuvan kokoamiseen. Vastaussivut loppuun. Vaihda harmaasavy. Taysin visuaalinen muoto julkaistaan identtisena kaikilla kansainvalisilla KDP-markkinapaikoilla.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Gumroad varjoyhdistely-aktiviteettipaketit',
      description: 'Lataa varjoyhdistely-aktiviteettipaketteja Gumroadiin nimi/paivamaara-kentilla, vaihdettavilla tunnisteilla ja automaattisilla vastausavaimilla. Myyjat etsivat visuaalisen erottelun aktiviteetteja. Tee tuoteluetteloon sopivia sarjoja.',
      platform: 'Gumroad',
    },
    {
      title: 'Pinterest varjopalapeli-liikennetsuppilo',
      description: 'Varjoyhdistely-tehtavat tekevat visuaalisesti vaikuttavia Pinterest-pinnejae — kontrasti varikkeiden kuvien ja mustien siluettien valilla luo valittomasti silmaanpistavan formaatin. Halloween-varjoaktiviteetit menestyvat erityisen hyvin Pinterestissa syksylla.',
      platform: 'Pinterest',
    },
    {
      title: 'Gumroad taysi varjoyhdistely-tyokalupaketti',
      description: 'Pakkaa varjoyhdistely-tehtavat kaikista 104 teemasta ja molemmista harjoitustiloista kattavaksi tyokalupaketiksi Gumroadiin. Sisallyta 300+ tehtavaa Varjoyhdistely-silueteilla, Taydenna Kuva vaakaleikkauksilla ja Taydenna Kuva pystyleikkauksilla — kolme aktiviteettityyppia per teema automaattisilla vastausavaimilla.',
      platform: 'Gumroad',
    },
    {
      title: 'Globaali visuaalinen palapeli-tuotelinja',
      description: 'Varjoyhdistely tuottaa taydellisesti visuaalisia palapeleita — kuvat, siluetit ja jaetut puoliskot ovat universaaleja ilman kielisidonnaista tekstia. Samat tuotetiedostot toimivat jokaisessa maassa ilman kaannosta. Yksi suunnitteluistunto tuottaa globaalisti myytavan luettelon.',
      platform: 'Etsy / Amazon KDP',
    },
  ],

  proTips: [
    {
      title: 'Valitse kuvia erottuvilla silueteilla varjoyhdistely-tilaan',
      description: 'Laatu riippuu siita, kuinka tunnistettava kukin siluetti on. Valitse kuvia erottuvilla aariviivilla — elaimet ainutlaatuisilla kehomuodoilla (kirahvi, norsu, mustekala), ajoneuvot selvilla profiileilla (lentokone, polkupyora, laiva) ja esineet tunnistettavilla aariviivoilla (kitara, sateenvarjo, kruunu).',
    },
    {
      title: 'Kayta molempia leikkaussuuntia Taydenna Kuva -tilassa maksimaalisen vaihtelun saamiseksi',
      description: 'Taydenna Kuva tarjoaa vaaka- (yla/ala) ja pysty- (vasen/oikea) leikkaussuunnat. Sisallyta molemmat tuotepaketeissasi — vaakaleikkaukset luovat erilaisia yhdistelyhaasteita kuin pystyleikkaukset. Molempien leikkaussuuntien kayttaminen kaksinkertaistaa ainutlaatuisten tehtavien maaran.',
    },
    {
      title: 'Kytke tunnisteet pois premium-palapelihakirja-tuotteisiin',
      description: 'Kun Nayta tunnisteet on POIS, tehtavasta tulee puhdas visuaalinen yhdistelyhaaaste ilman A/B/C/D- ja 1/2/3/4-tunnisteita. Tama luo siistimman, ammattimaisemman palapelisivun, joka on ihanteellinen painetuille palapelihoille ja premium-digitaalisille latauksille.',
    },
    {
      title: 'Hyodynna sekoitusalgoritmia nopeaan pakettien luomiseen',
      description: 'Fisher-Yates-sekoitus lasketaan uudelleen jokaisella generoinnilla. Klikkaamalla Generoi toistuvasti identtisilla asetuksilla luot useita ainutlaatuisia tehtavia. Generoi 5-10 ainutlaatuista tehtavaa per kuvasarja, kerrosta sitten 104 teeman yli.',
    },
    {
      title: 'Hyodynna taydellisesti visuaalista muotoa globaaliin myyntiin',
      description: 'Varjoyhdistely-tehtavat sisaltavat vain kuvia, siluetteja ja jaettuja puoliskoja — ei kielisidonnaista tekstia. Jokainen luomasi palapeli on valittomasti myytavissa maailmanlaajuisesti ilman kaannosta.',
    },
    {
      title: 'Hyodynna halloween-ajoitusta varjoteema-tuotteisiin',
      description: 'Varjo- ja siluettiaktiviteeteilla on erityinen kausittainen vetovoima halloweenin aikana. Tee erityisia halloween-varjoyhdistely-kokoelmia karmivilla kuvilla 4-6 viikkoa ennen 31. lokakuuta.',
    },
    {
      title: 'Kayta tausta- ja kehystemoja yhtenaisen tuotebranding in saamiseksi',
      description: 'Riippumaton tausta- ja kehystemmajarjestelma erillisilla lapinakyvyyden liukusaatimilla antaa sinun luoda yhtenaisenae visuaalisen identiteetin varjoyhdistely-paketeissasi.',
    },
  ],

  faq: [
    {
      question: 'Onko ilmainen kokeilu saatavilla?',
      answer: 'Kylla. Tyokalu tarjoaa ilmaisen kokeilun kaikilla ominaisuuksilla — molemmat harjoitustilat, pikselitason siluettigenerointi, vaaka- ja pystyleikkaussuunnat, automaattisesti generoitu vastausavain, vaihdettavat tunnisteet, kaikki 104 teemallista kuvakokoelmaa, mukautettu kuvien lataus, tausta- ja kehysteemat, nimi/paivamaara-kentat, harmaasavykytkin ja kaikki latausmuodot. Ei rekisteroitymista, ei luottokorttia. Ilmaisen kokeilun lataukset sisaltavat vesileiman.',
    },
    {
      question: 'Mitka ovat kaksi harjoitustilaa?',
      answer: 'Generaattori tarjoaa kaksi erillistae tilaa. Varjoyhdistely asettaa 4 varikuvaa merkittyina A-D ylariville ja 4 automaattisesti generoitua mustaa siluettia merkittyina 1-4 alariville — siluetit luodaan pikselitason kasittelylla (alfa > 10 -> puhdas musta). Taydenna Kuva jakaa 4 kuvaa puoliskoihin — ensimmaiset puoliskot A-D, toiset puoliskot 1-4 — ja kayttajat yhdistaevaet osat. Valitse vaaka- (yla/ala) tai pysty- (vasen/oikea) leikkaussuunta.',
    },
    {
      question: 'Miten pikselitason siluettigenerointi toimii?',
      answer: 'Varjoyhdistely-tilassa sovellus lataa jokaisen kuvan kankaalle, poimii jokaisen pikselin getImageData-toiminnolla ja muuntaa kaikki pikselit, joiden alfa-arvo on suurempi kuin 10, puhtaaksi mustaksi (R=0, G=0, B=0, A=255). Tama sailyttaa jokaisen lahdekuvan tarkan lapinakyvyysprofiilin ja tuottaa oikeat mustat siluetit hienoilla yksityiskohdilla.',
    },
    {
      question: 'Miten Fisher-Yates-sekoitusalgoritmi toimii?',
      answer: 'Molemmat tilat kayttavat sekoitusalgoritmia, joka takaa, ettei mikaan kohde esiinny alkuperaisessa paikassaan. Varjoyhdistelyssae siluetti ei istu vastaavan kuvansa alla. Taydenna Kuvassa toista puoliskoa ei esiinny vastaavan ensimmaisen puoliskon vieressa. Sekoitus lasketaan uudelleen jokaisella generoinnilla.',
    },
    {
      question: 'Mitka leikkaussuuntavaihtoehdot ovat Taydenna Kuva -tilassa?',
      answer: 'Vaakaleikkaukset jakavat kuvat ylaosa- ja alaosapuoliskoihin. Pystyleikkaukset jakavat kuvat vasen- ja oikeapuoliskoihin. Leikkaussuunta koskee kaikkia 4 kuvaa. Eri leikkaussuunnat tuottavat erilaisia yhdistelyhaasteita samoista kuvista.',
    },
    {
      question: 'Miten automaattisesti generoitu vastausavain toimii?',
      answer: 'Kaksoistyoalue-jarjestelma generoi samanaikaisesti tehtavan ja vastausavaimen. Varjoyhdistelyssae vastausavain nayttaa alkuperaiset kuvat siluettien vieressa "A -> 2" -tunnisteilla. Taydenna Kuvassa kukin solu nayttaa tayden kuvan vastaavuustunnisteellaan. Lataa kukin versio itsenaisesti — nelja tuotantovalmista tiedostoa.',
    },
    {
      question: 'Voinko kytkeae A/B/C/D- ja 1/2/3/4-tunnisteet paaelle ja pois?',
      answer: 'Kylla. "Nayta tunnisteet" (oletus PAALLA) ohjaa tunnisteita. PAALLA — strukturoitu tuki kirjain-numero-pareilla. POIS — puhdas visuaalinen yhdistelyhaaaste ilman aakkosnumerisia vihjeitae, ihanteellinen palapelihoille.',
    },
    {
      question: 'Miksi kohteita on aina tarkalleen 4?',
      answer: 'Molemmat tilat kayttavat 4 yhdistelaekohdetta — optimaalinen tasapaino varjo- ja jaetun kuvan yhdistamiseen: riittava vaihtelu sekoitushaasteeseen, samalla kun kukin kuva pysyy riittavan suurena yksityiskohtien tutkimiseen.',
    },
    {
      question: 'Onko varjoyhdistely-generaattori kieliriippuvainen?',
      answer: 'Ei. Varjoyhdistely on taydellisesti visuaalista — kuvia, siluetteja ja jaettuja puoliskoja ilman lokalisoitua sanasisaltoa. Sovelluksen kaytettoliittyma tukee kaikkia 11 kielta, mutta generoitu tehtava toimii identtisesti kielivalinnasta riippumatta. Universaalisti myytavissa ilman kaannosta.',
    },
    {
      question: 'Mitka sivukoot ja vientimuodot ovat saatavilla?',
      answer: 'Sivukoot: Letter pysty, Letter vaaka, A4, Nelio (1200x1200) ja mukautetut mitat. Vie korkearesoluutioisena JPEG:na tai painovalmiina PDF:na 300 DPI:lla. Vaihda harmaasavy. Jokainen generointi tuottaa nelja lataustiedostoa.',
    },
    {
      question: 'Voinko myyda varjoyhdistely-tehtavia kaupallisesti?',
      answer: 'Kylla. Kaupallisella lisenssilla sinulla on taydet oikeudet myyda varjoyhdistely-tehtavia digitaalisina latauksina Etsyssa, painettuina tyokirjoina Amazon KDP:ssa, resursseinaGumroadissa tai minka tahansa muun myyntikanavan kautta.',
    },
    {
      question: 'Mika on palautuskaytantonne?',
      answer: 'Kokeile ennen ostoa ilmaisella kokeilujaksollamme — kaikki ominaisuudet kaytettavissa. Koska ilmainen kokeilu antaa tayden paasynae, emme tarjoa palautuksia. Varmista, etta tyokalu sopii tarpeisiisi kokeilujakson avulla.',
    },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'varjoyhdistely-tehtavat', anchorText: 'Varjoyhdistely-tehtavat — Taydet tuotetiedot' },
    { pageType: 'tool', slug: 'yhdistamistehtava-tyokalu', anchorText: 'Yhdistamistehtava-generaattori' },
    { pageType: 'tool', slug: 'ruudukkopeli-tyokalu', anchorText: 'Ruudukkopalapeli-generaattori' },
    { pageType: 'tool', slug: 'kuvabingo-tyokalu', anchorText: 'Kuvabingo-generaattori' },
    { pageType: 'tool', slug: 'puuttuvat-palat-tyokalu', anchorText: 'Puuttuvat palat -generaattori' },
    { pageType: 'tool', slug: 'etsi-erilainen-tyokalu', anchorText: 'Etsi erilainen -generaattori' },
    { pageType: 'tool', slug: 'kuvalajittelu-tyokalu', anchorText: 'Kuvalajittelu-generaattori' },
    { pageType: 'tool', slug: 'varitys-tyokalu', anchorText: 'Varitys-generaattori' },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/english/shadow match/shadow-match-worksheet.webp',
      primaryAlt: 'Varjoyhdistely-tehtava varikuvilla ylarivillae ja automaattisesti generoiduilla mustilla silueteilla alarivilla keltaisella otsikolla ja kirjain-numero-tunnisteilla',
    },
    sampleGallery: [
      {
        src: '/samples/english/shadow match/shadow-match-horizontal.webp',
        alt: 'Varjoyhdistely-tehtava, jossa nelja varikuvaa yhdistetaan neljaan pikselitason mustaan siluettiin A B C D ja 1 2 3 4 tunnisteilla',
        caption: 'Varjoyhdistely-tila — kayttajat yhdistaevaet kuvia automaattisesti generoituihin pikselitason siluetteihin',
      },
      {
        src: '/samples/english/shadow match/shadow-match-vertical.webp',
        alt: 'Taydenna Kuva -tehtava jaetuilla kuvapuoliskoilla, jotka kayttajat yhdistaevaet A-D ja 1-4 tunnisteilla',
        caption: 'Taydenna Kuva -tila — kayttajat yhdistaevaet jaetut kuvapuoliskot kuvan taydentamiseksi vaaka- tai pystyleikkauksilla',
      },
      {
        src: '/samples/english/shadow match/shadow-match-horizontal answer-key.webp',
        alt: 'Varjoyhdistely-vastausavain, jossa alkuperaiset kuvat siluettien vieressa oikeilla kirjain-numero-vastaavuustunnisteilla kuten A to 2',
        caption: 'Automaattisesti generoitu vastausavain — kirjain-numero-tunnisteet nayttavat oikeat vastaavuudet molemmille harjoitustiloille',
      },
    ],
    youtubeId: 'TYvUXJeMI98',
    videoTitle: 'Nain teet varjoyhdistely-tehtavia pikselitason silueteilla, jaetuilla kuvapuoliskoilla ja automaattisilla vastausavaimilla — vaiheittainen opas',
  },
};

export default content;
