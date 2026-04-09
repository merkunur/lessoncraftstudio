import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'ilmainen aarteenetsintätehtävä verkossa',
    secondaryKeywords: [
      'aarteenetsintää ilmaiseksi verkossa',
      'aarteenetsintägeneraattori ilman rekisteröitymistä',
      'kokeile aarteenetsintää ilmaiseksi',
      'tulostettava aarteenetsintä ilmainen kokeilu',
    ],
    lsiKeywords: [
      'ilmainen',
      'verkossa',
      'vesileima',
      'kokeile',
      'ei rekisteröitymistä',
      'aarteenetsintä',
    ],
    titleTag: 'Ilmainen aarteenetsintätehtävä verkossa | Kokeile',
    metaDescription: 'Tee aarteenetsintätehtäviä ilmaiseksi verkossa — ei rekisteröitymistä. Kaikki ominaisuudet käytössä, vesileima poistettavissa lisenssillä.',
  },

  hero: {
    title: 'Aarteenetsintae-generaattori',
    tagline: 'Polunetsintae-aarteenetsintaetehtavageneraattori kiinteaella 5x5-koordinaattiruudukolla (A-E rivit, 1-5 sarakkeet), kahdella suuntatyypilla (Perus: ylos/alas/vasemmalle/oikealle esikoulusta 1. luokkaan, ja Kardinaali: pohjoinen/etela/ita/lansi 2. luokasta+), 6 teemallista maamerkuvaa, tarkalleen 4 suuntaliiketta per palapeli, automaattisesti generoitu vastausavain vaaleankeltaisella korostetulla aarresolulla kaksoiskanvasjarjestelman kautta, taysin lokalisoidut suuntavihjeet 11 kielella ja aarteenetsintae-teemaisella teal-otsikolla (#2C8C7C) kultaisella Fredoka-otsikolla 104 teemallisessa kuvakokoelmassa',
    description: 'Tee ammattimaisia aarteenetsintaetehtavia, joissa kayttajat seuraavat perakkaisia suuntavihjeitae piilotettun aarteen loytaemiseksi 5x5-koordinaattiruudukossa kirjainriveilla (A-E) ja numerosarakkeilla (1-5). Jokainen palapeli levittaa 6 teemallista kuvaa ruudukolle visuaalisina maamerkkeinaeae, generoi aloitussijainnin ja tarkalleen 4 suuntaliiketta aarresoluun. Valitse kahdesta suuntatyypista. Perustila kayttaa ylos, alas, vasemmalle ja oikealle. Kardinaalitila kayttaa pohjoinen, etela, ita ja lansi. Aarteenetsintae-generaattori on kieliriippuvainen: suuntavihjeet ja kuvasiseaelto muuttuvat molemmat kielen vaihtuessa. Kaikki suunnat on taysin kaannetty 11 tuettuun kieleen. Kaksoiskanvasjarjestelma generoi seka tehtava- etta vastausavainvalilehden — vastausavain merkitsee viimeisen aarresolun vaaleankeltaisella (rgba(255, 250, 205, 0.8)) tummanharmaalla reunuksella. Selaa 104 kokoelmaa. Vie nelja tiedostoa 300 DPI:lla. Ilmainen kokeilu vesileimalla.',
  },

  tutorial: {
    title: 'Nain teet aarteenetsintaetehtavia 8 vaiheessa',
    steps: [
      { title: 'Avaa aarteenetsintae-generaattori', description: 'Klikkaa "Kokeile ilmaiseksi nyt" kaynnistaksesi generaattorin. Tyokalu latautuu kaksoisvalilehti-kankaalla. Ei tilia, ei latausta tarvita.' },
      { title: 'Aseta sivun asettelu', description: 'Valitse sivukoko: Letter pysty, Letter vaaka, A4 pysty, A4 vaaka, Nelio (1200x1200) tai mukautettu. Valitse tausta- ja kehystemat itsenaisilla lapinakyvyyden liukusaatimilla (0-1, askel 0,05).' },
      { title: 'Valitse suuntatyyppi', description: 'Perustila kayttaa ylos, alas, vasemmalle ja oikealle — tuttuja suuntasanoja esikoulusta 1. luokkaan. Kardinaalitila kayttaa pohjoinen, etela, ita ja lansi — kompassisuunnat 2. luokasta ylos karttanlukutaitojen johdannoksi.' },
      { title: 'Valitse sisaltokieli', description: 'Kieliriippuvainen — kaikki suunnat on taysin kaannetty 11 tuettuun kieleen. "Aloita", "Liiku", suuntasanat, "ruutu(a)" ja "Missa on aarre?" lokalisoituvat kaikki. Kielen vaihtaminen tuottaa aitoja aeidinkielisia aarteenetsintaetehtavia.' },
      { title: 'Valitse kuvia 5x5-ruudukolle', description: 'Generoi teemasta (oletus) autovalitsee 6 satunnaista kuvaa. Manuaalinen kuvavalinta antaa selata 104 kokoelmaa ja valita tarkalleen 6 kuvaa. Omien kuvien lataus antaa lisata omia tiedostoja.' },
      { title: 'Generoi aarteenetsintaepalapeli', description: 'Klikkaa Generoi. Generaattori levittaa 6 valittua kuvaa 25 soluun maamerkkeinaeae, valitsee satunnaisen aloitussolun ja luo tarkalleen 4 suuntaliiketta. Tehtava nayttaa 5 ohjerivia aarteenetsintae-teemaisella teal-otsikolla (#2C8C7C) ja kultaisella otsikolla.' },
      { title: 'Tarkista automaattisesti generoitu vastausavain', description: 'Klikkaa Vastausavain-valilehteae nahdaksesi ratkaisun viimeinen aarresolu korostettuna vaaleankeltaisella (rgba(255, 250, 205, 0.8)) tummanharmaalla reunuksella. Vastausavain toistaa tarkan palapelisommittelun ja merkitsee aarteen maaeraenpaen selvaesti.' },
      { title: 'Lataa kaikki nelja tiedostoa', description: 'Vaihda harmaasavy. Lataa tehtava-JPEG, vastausavain-JPEG, tehtava-PDF ja vastausavain-PDF 300 DPI:lla. Vaihda teemaa, kielta ja suuntatyyppeja, generoi sitten uudelleen nopeaan vaihteluun.' },
    ],
  },

  whatYouCanCreate: [
    { title: 'Teemakohtaiset aarteenetsintaepaketit kuvakokoelman mukaan', description: 'Luo aarteenetsintaepaketteja teeman mukaan 104 kuvakokoelmasta — elainaarteenetsinnaeae, meri-, avaruus-, dinosaurus-, juhlapy ha-aarteenetsinnaeae. Generoi teemasta autovalitsee 6 satunnaista kuvaa ja luo ainutlaatuiset aloitussijainnit ja liikesarjat. Pakkaa 10-20 tehtavaa per teema automaattisilla vastausavaimilla.' },
    { title: 'Progressiiviset suuntataitotyokirjat', description: 'Rakenna jaesennettyja tyokirjoja, jotka opettavat suuntasanastoa aarteenetsintaepalapaleihin kautta. Aloita perussuuntatehtavilla (ylos/alas/vasemmalle/oikealle), etene sitten kardinaalisuuntatehtaviin (pohjoinen/etela/ita/lansi). Sama 5x5-ruudukko ja 4 liikkeen palapeliformaatti pysyy yhtenaesenaemolemmissa suuntatyypeissa.' },
    { title: 'Monikieliset aarteenetsintaesarjat kansainvalisille markkinoille', description: 'Hyodynna taysin lokalisoituja suuntavihjeitae aarteenetsintaetehtavien luomiseen kaikilla 11 tuetulla kielella. Kielen vaihtaminen muuttaa kaiken suuntatekstin aidoksi aeidinkieliseksi sisalloksi. Yksi palapelisuunnittelu tuottaa 11 myytavaa kieliversiota.' },
    { title: 'KDP koordinaattiruudukko-aktiviteettityokirjat', description: 'Kokoa 40-80 aarteenetsintaetehtavaa painettaviksi tyokirjoiksi Amazon KDP:lle. 5x5 kirjain-numero-koordinaattiruudukko esittelee ruudukkoluukutaitoja. Vastaussivut loppuun vaaleankeltaisilla korostetuilla aarresoluilla.' },
    { title: 'Kausittaiset aarteenetsintaekokoelmat', description: 'Joulu, halloween, paasiinen, ystavanpaiva, koulun alku ja kesa-teemat tukevat kukin omia kausipakettejaan. Sisallyta molemmat suuntatyypit kuhunkin kokoelmaan.' },
    { title: 'Moniformaattiset navigointi- ja avaruudellisen taidon paketit', description: 'Yhdista aarteenetsintaetehtavat kuvareitti-labyrintteihin, yhdistamistehtaviin ja etsi ja laske -aktiviteetteihin koordinoiduilla teemoilla. Moniformaattipakettit oikeuttavat premium-hinnoittelun.' },
  ],

  businessIdeas: [
    { title: 'Teemakohtainen aarteenetsintaeaktiviteetti-kauppa Etsyssa', description: 'Avaa Etsy-kauppa aarteenetsintaepaketeilla 104 kuvakokoelmalla. Kukin teema tulee erilliseksi listaukseksi 10-20 ainutlaatuisella palapelilla molemmilla suuntatyypeilla. Jokainen paketti sisaltaa automaattisesti generoidut vastausavaimet vaaleankeltaisilla korostetuilla aarresoluilla.', platform: 'Etsy' },
    { title: 'Amazon KDP suuntataitotyokirjasarja', description: 'Kokoa 40-80 aarteenetsintaetehtavaa temaattisiksi tyokirjoiksi. Rakenteen progression ja aiheen mukaan. Vastaussivut loppuun. Vaihda harmaasavy.', platform: 'Amazon KDP' },
    { title: 'Gumroad koordinaattiruudukko- ja suuntasanasto-aktiviteettipaketit', description: 'Lataa aarteenetsintaeaktiviteettipaketteja Gumroadiin. 5x5 kirjain-numero-ruudukko esittelee ruudukkoluukutaitoja. Luo luokka-astekohtaisia sarjoja: perussuunnat esikoulusta 1. luokkaan ja kardinaalisuunnat 2.-4. luokalle.', platform: 'Gumroad' },
    { title: 'Monikielinen suuntasanastoliiketoiminta', description: 'Taysin lokalisoidut suuntavihjeet tuottavat aitoja aeidinkielisia aarteenetsintaepalapaleja kielen vaihtuessa. Kaikki ohjistusteksti kaantyy 11 tuettuun kieleen. Yksi palapelisuunnittelu tuottaa 11 myytavaa kieliversiota.', platform: 'Etsy / Gumroad' },
    { title: 'Pinterest aarteenetsintaetehtava-liikennetsuppilo', description: 'Aarteenetsintaetehtavat varikkailla koordinaattiruudukoilla ja hajautetuilla teemakuvilla luovat visuaalisesti kiinnostavia Pinterest-pinnejaeae. Nayta vastausavaimen esikatselut vaaleankeltaisella korostetulla aarresolulla.', platform: 'Pinterest' },
    { title: 'Gumroad taysi aarteenetsintaepalapeli-tyokalupaketti', description: 'Pakkaa aarteenetsintaepalapelit kaikista 104 teemasta, molemmista suuntatyypeista ja useista kielista kattavaksi tyokalupaketiksi. Sisallyta 200+ tehtavaa automaattisilla vastausavaimilla — 400+ tiedostoa.', platform: 'Gumroad' },
  ],

  proTips: [
    { title: 'Kayta molempia suuntatyyppeja progressiiviseen vaikeuteen jokaisessa paketissa', description: 'Sisallyta seka perus- (ylos/alas/vasemmalle/oikealle) etta kardinaali- (pohjoinen/etela/ita/lansi) suuntatehtavat. Aloita perussuuntaaarteenetsinnoeilla ja jatka kardinaalisuuntaversioilla. Tama progressio luo jaesennettyae vaikeuskasvua.' },
    { title: 'Klikkaa Generoi toistuvasti nopeaan eratuotantoon', description: 'Jokainen klikkaus Generoi-painikkeella luo taysin ainutlaatuisen aarteenetsintaepalapelin — erilainen satunnainen kuvasijoittelu, erilainen aloitussijainti ja erilainen liikesarja. Eratuota 10+ ainutlaatuista aarteenetsintaaeper teema minuuteissa.' },
    { title: 'Hyodynna lokalisoituja suuntia monikielisiin aarteenetsintaetuotteisiin', description: 'Sama palapelirakenne tuottaa aitoja aeidinkielisia aarteenetsintaetehtavia kielen vaihtuessa. Kaikki suuntateksti kaantyy tays in — "Aloita", "Liiku", suuntasanat, "ruutu(a)" ja "Missa on aarre?" lokalisoituvat 11 kielelle.' },
    { title: 'Korosta vastausavain jokaisessa markkinapaikkalistauksen esikatselussa', description: 'Automaattisesti generoitu vastausavain vaaleankeltaisella korostetulla aarresolulla on vahvin erottautumistekijasi. Sisallyta aina vastausavaimen esikatselukuvat listauksissa.' },
    { title: 'Sijoita aarteenetsinnaeaekoordinaattiruudukko-oppimisaktiviteeteiksi', description: '5x5 kirjain-numero-ruudukko (A-E rivit, 1-5 sarakkeet) opettaa samoja ruudukkoluukutaitoja joita kaytetaan maantieteessa, matematiikassa ja kartanlukemisessa. Sisallyta koordinaatteihin liittyvia avainsanoja listauksissa.' },
    { title: 'Kayta harmaasavya KDP- ja massatulostustuotteisiin', description: 'Vaihda harmaasavy musteystaevaellisiin aarteenetsintaetehtaviin KDP print-on-demand -sisaesivuihin. Koordinaattiruudukko, suuntavihjeet ja teemakuvat renderoituvat selvaesti harmaasavyssa.' },
    { title: 'Yhdista aarteenetsinnaeaekuvareitti-labyrintteihin kattaviin navigointipaketteihin', description: 'Yhdista aarteenetsintaetehtavat kuvareitti-labyrinttiaktiviteetteihin samoilla teemoilla. Aarteenetsinnaeae rakentavat peraekkaistae suunnan seuraamista ja koordinaattiruudukon tuntemusta. Moniformaattiset navigointipaketit oikeuttavat korkeammat hinnat.' },
  ],

  faq: [
    { question: 'Onko ilmainen kokeilu saatavilla?', answer: 'Kylla. Kaikki ominaisuudet — molemmat suuntatyypit, 5x5-koordinaattiruudukko, 6 kuvan palapelingenerointi tarkalleen 4 suuntaliikkeella, automaattisesti generoitu vastausavain vaaleankeltaisella korostetulla aarresolulla, koko kuvakirjasto 104 kokoelmaa ja 3 100+ kuvitusta, kolme kuvan syoetemenetelmaa, tausta- ja kehysteemat, kielivalinta 11 lokalisoidulle suuntasarjalle, harmaasavykytkin ja kaikki latausmuodot. Ei rekisteroitymista, ei luottokorttia. Vesileima latauksissa.' },
    { question: 'Mika on aarteenetsintaetehtava ja miten palapeli toimii?', answer: 'Aarteenetsintaetehtava on polunetsintaepalapeli kiinteaella 5x5-koordinaattiruudukossa kirjainriveilla (A-E) ja numerosarakkeilla (1-5). Kuusi teemallista kuvaa levitetaan 25 soluun visuaalisina maamerkkeinaeae. Tehtava antaa 5 ohjerivia: aloitussijainti, tarkalleen 4 suuntaliiketta ja loppukysymys "Missa on aarre?" Kayttajat seuraavat perakkaisia vihjeitae ruudukossa.' },
    { question: 'Mitka ovat kaksi suuntatyyppia?', answer: 'Perustila kayttaa ylos, alas, vasemmalle ja oikealle — tuttuja suuntasanoja esikoulusta 1. luokkaan. Kardinaalitila kayttaa pohjoinen, etela, ita ja lansi — kompassisuunnat 2. luokasta ylos. Molemmat tuottavat saman 4 liikkeen palapelirakentee n samalla 5x5-ruudukolla.' },
    { question: 'Miten vastausavain toimii?', answer: 'Kaksoiskanvasjarjestelma Tehtava- ja Vastausavain-valilehdilla. Tehtava nayttaa 5x5-ruudukon hajautetuilla kuvilla ja suuntavihjeilla. Vastausavain toistaa identtisen sommittelun ja korostaa viimeisen aarresolun vaaleankeltaisella (rgba(255, 250, 205, 0.8)) tummanharmaalla reunuksella. Nelja lataustiedostoa per generointi.' },
    { question: 'Onko aarteenetsintae-generaattori kieliriippuvainen?', answer: 'Kylla kahdella tavalla. Ensinnaekin kaikki suuntateksti — "Aloita", "Liiku", suuntasanasto, "ruutu(a)" ja "Missa on aarre?" — on taysin kaannetty kaikille 11 tuettuun kieleen. Toiseksi kuvasiseaelto paivittyy valitun kielen mukaan. Kielen vaihtaminen tuottaa aitoja aeidinkielisia aarteenetsintaetehtavia.' },
    { question: 'Miksi jokaisessa palapelissa on tarkalleen 4 liiketta 5x5-ruudukossa?', answer: 'Yhtenainenae 4 liikkeen rakenne kiinteaella 5x5-ruudukolla luo vakioidun palapelimuodon, joka toimii luotettavasti polunetsintaeaktiviteeteille. Nelja liiketta tarjoavat riittavasti monimutkaisuutta merkityksellisiin suuntahaasteisiin ylittamaettae nuorempia kayttajia.' },
    { question: 'Mitka ovat kolme kuvan syoetemenetelmaa?', answer: 'Generoi teemasta (oletus) autovalitsee 6 satunnaista kuvaa. Manuaalinen kuvavalinta antaa selata 104 kokoelmaa ja valita tarkalleen 6 kuvaa. Omien kuvien lataus antaa lisata omia tiedostoja. Kaikki kolme menetelmaa tayttavat saman 5x5-koordinaattiruudukon.' },
    { question: 'Mitka sivukoot ja vientimuodot ovat saatavilla?', answer: 'Letter pysty, Letter vaaka, A4 pysty, A4 vaaka, Nelio (1200x1200) ja mukautetut mitat. Vie JPEG:na tai PDF:na 300 DPI:lla. Vaihda harmaasavy. Nelja tiedostoa per generointi.' },
    { question: 'Voinko myyda aarteenetsintaetehtavia kaupallisesti?', answer: 'Kylla. Kaupallisella lisenssilla taydet oikeudet myydaeadigitaalisina latauksina Etsyssa, painettuina tyokirjoina Amazon KDP:ssa, resursseina Gumroadissa tai minka tahansa muun kanavan kautta.' },
    { question: 'Mika on palautuskaytantonne?', answer: 'Kokeile ennen ostoa ilmaisella kokeilujaksollamme — kaikki ominaisuudet kaytettavissa. Koska ilmainen kokeilu antaa tayden paasynae, emme tarjoa palautuksia.' },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'aarteenetsinta-tehtavat', anchorText: 'Aarteenetsintae — Taydet tuotetiedot' },
    { pageType: 'tool', slug: 'kuvaristikko-tyokalu', anchorText: 'Kuvaristikko-generaattori' },
    { pageType: 'tool', slug: 'etsi-ja-laske-tyokalu', anchorText: 'Etsi ja laske -generaattori' },
    { pageType: 'tool', slug: 'piilotetut-esineet-tyokalu', anchorText: 'Piilotetut esineet -generaattori' },
    { pageType: 'tool', slug: 'sanahaku-tyokalu', anchorText: 'Sanahaku-generaattori' },
    { pageType: 'tool', slug: 'kuvareitti-tyokalu', anchorText: 'Kuvareitti-generaattori' },
    { pageType: 'tool', slug: 'yhdistamistehtava-tyokalu', anchorText: 'Yhdistamistehtava-generaattori' },
    { pageType: 'tool', slug: 'matemaattinen-palapeli-tyokalu', anchorText: 'Matemaattinen palapeli -generaattori' },
  ],

  visuals: {
    heroImages: { primary: '/samples/finnish/treasure%20hunt/aarteenetsint%c3%a4%201.webp', primaryAlt: 'Aarteenetsintae polunetsintaetehtava 5x5-koordinaattiruudukolla, 6 hajautetulla teemakuvalla maamerkkeinaeae, suuntavihjeilla ja aarteenetsintae-teemaisella teal-otsikolla kultaisella otsikolla' },
    sampleGallery: [
      { src: '/samples/finnish/treasure%20hunt/aarteenetsint%c3%a4%201.webp', alt: 'Aarteenetsintaepalapelitehtava kardinaalisuuntavihjeilla pohjoinen etela ita lansi 5x5-koordinaattiruudukossa', caption: 'Kardinaalitila — kompassisuunnat edentyneeseen avaruudelliseen paeaettelyyn ja kartanlukutaitoihin' },
      { src: '/samples/finnish/treasure%20hunt/aarteenetsint%c3%a4%201%20answer-key.webp', alt: 'Aarteenetsinnaevaen vastausavain viimeisella aarresolulla korostettuna vaaleankeltaisella 5x5-koordinaattiruudukossa', caption: 'Automaattisesti generoitu vastausavain — vaaleankeltainen korostus merkitsee aarteen maaeraenpaen itsetarkistukseen' },
    ],
    youtubeId: 'flHiBXsYLLA',
    videoTitle: 'Nain teet aarteenetsintae polunetsintaetehtavia suuntavihjeilla, kahdella suuntatyypilla ja automaattisilla vastausavaimilla — vaiheittainen opas',
  },
};

export default content;
