import type { ToolContent } from '../types';

const content: ToolContent = {
  seo: {
    primaryKeyword: 'ilmainen lajittelutehtävä verkossa',
    secondaryKeywords: [
      'lajittelutehtäviä ilmaiseksi verkossa',
      'lajittelugeneraattori ilman rekisteröitymistä',
      'kokeile lajittelutehtävää ilmaiseksi',
      'tulostettava lajittelutehtävä ilmainen kokeilu',
    ],
    lsiKeywords: [
      'ilmainen',
      'verkossa',
      'vesileima',
      'kokeile',
      'ei rekisteröitymistä',
      'lajittelutehtävä',
    ],
    titleTag: 'Ilmainen lajittelutehtävä verkossa | Kokeile heti',
    metaDescription: 'Tee lajittelutehtäviä ilmaiseksi verkossa — ei rekisteröitymistä. Kaikki ominaisuudet käytössä, vesileima poistettavissa lisenssillä.',
  },

  hero: {
    title: 'Kuvalajittelu-generaattori',
    tagline: 'Kahden kategorian lajittelutehtava-generaattori teemapohjaisella ja manuaalisella kuvavalinnalla, sekoitetuilla leikkausruudukoilla 4-12 kuvalla, katkoviivareunaisilla kategoriakehyksilla, automaattisesti generoiduilla vastausavaimilla 6-kertaisilla kuvilla kategoriaruuduissa, lokalisoidulla Lajittele kuvat -otsikolla 11 kielella ja 104 teemallisella kuvakokoelmalla',
    description: 'Tee ammattimaisia lajittelutehtavia, joissa kayttajat leikkaavat kuvia sekoitetusta ruudukosta ja luokittelevat ne kahteen kategoriaan — vasen ja oikea. Valitse Teematila autotaeyttaaksesi kategoriat: valitse vasen teema ja oikea teema, sovellus hakee 4-6 satunnaista kuvaa per teema. Tai vaihda Manuaalitilaan valitaksesi yksittaiset kuvat kasin ja osoittaaksesi kukin vasemmalle tai oikealle. Jokainen tehtava sisaltaa kaksi vierekkaeistae katkoviivareunallista kategoriakehystae ylhaaella ja sekoitetun leikkausruudukon alapuolella. Maarita 4-12 kuvaa yhteensa, 2-10 per kategoria. Kaksoistyoalue-jarjestelma generoi samanaikaisesti tehtavan ja vastausavaimen — vastausavain nayttaa kuvat 6-kertaisella koolla kategoriaruuduissa. Kuvalajittelu-generaattori on kieliriippuvainen: kategoriatunnisteet kayttavat lokalisoituja kuvanimitiedostoja. Lokalisoitu otsikko gengiversu mintunvihreaellae taustalla (#4DB6AC). Selaa 104 teemallista kokoelmaa. Vie nelja tiedostoa per istunto 300 DPI:lla. Ilmainen kokeilu sisaltaa kaikki ominaisuudet vesileimalla. Osta lisenssi poistaaksesi vesileiman.',
  },

  tutorial: {
    title: 'Nain teet lajittelutehtavia 8 vaiheessa',
    steps: [
      {
        title: 'Avaa kuvalajittelu-generaattori',
        description: 'Klikkaa "Kokeile ilmaiseksi nyt" kaynnistaksesi lajittelutehtava-generaattorin. Tyokalu latautuu asetussivupaneelilla vasemmalla ja kaksoisvalilehti-tyoalueella oikealla. Ei tilia, ei latausta, ei asennusta tarvita.',
      },
      {
        title: 'Valitse valintatila',
        description: 'Avaa Lajittelukategoriat-paneeli. Teematila — valitse teema vasemmalle kategorialle ja toinen oikealle — sovellus autovalitsee 4-6 kuvaa per teema. Manuaalitila — valitse yksittaiset kuvat kasin ja osoita kukin vasemmalle tai oikealle. Teematila on nopeampi massatuotantoon; Manuaalitila on ihanteellinen tuoteluetteloon raataloityihin lajitteluaktiviteetteihin.',
      },
      {
        title: 'Maarita kuvamaara ja kategoriatasapaino',
        description: 'Aseta kokonaiskuvamaeaerae 4-12, kunkin kategorian 2-10. Teematilassa sovellus hakee 4-6 kuvaa per teema automaattisesti. Manuaalitilassa hallitset tarkan maeaeraen per kategoria. Leikkausruudukko saataa sarakeasettelunsa (3-4 saraketta) siistiin valistykseen.',
      },
      {
        title: 'Valitse kuvia tai lataa omia',
        description: 'Selaa 104 teemallista kokoelmaa yli 3 100 varikkaalla kuvituksella. Manuaalitilassa osoita kukin kuva vasemmalle tai oikealle. Vaihtoehtoisesti lataa omia PNG-, JPG- tai GIF-kuvia.',
      },
      {
        title: 'Aseta sivun asettelu ja koristeet',
        description: 'Valitse sivukoko: Letter, A4, Nelio (1200x1200) tai mukautettu. Valitse koristeellinen taustateema ja kehystemma itsenaisilla lapinakyvyyden liukusaatimilla. Valitse "Sisallyta Nimi/Paivamaara-kentat".',
      },
      {
        title: 'Generoi lajittelutehtava',
        description: 'Klikkaa Generoi. Sovellus jarjestaa sisallon katkoviivareunoilla varustettuihin kategoriakehyksiin ylhaaelle ja sekoitettuun leikkausruudukkoon alapuolelle. Kuvat nakyvaet satunnaisessa jarjestyksessa 3-4 sarakkeessa. Tyylitelty otsikko mintunvihreaellae taustalla (#4DB6AC) ja oranssilla kuvauksella (#FF7043) renderoidaan.',
      },
      {
        title: 'Tarkista automaattisesti generoitu vastausavain',
        description: 'Klikkaa Vastausavain-valilehteae. Vastausavain nayttaa kaksi kategoriaruutua kuvilla lajiteltuina oikeaan ryhmaan — renderoituna 6-kertaisella leikkausruudukon solujen koolla. Vastausavain generoidaan samanaikaisesti tehtavan kanssa.',
      },
      {
        title: 'Lataa kaikki nelja tiedostoa',
        description: 'Vaihda harmaasavy musteystaevaellisiin versioihin. Lataa kaikki nelja tiedostoa: tehtava-JPEG, tehtava-PDF, vastausavain-JPEG ja vastausavain-PDF 300 DPI:lla. Vaihda teemoja, saada kuvamaeaeraeat tai vaihda teema- ja manuaalitilan valilla nopeaan vaihteluun.',
      },
    ],
  },

  whatYouCanCreate: [
    {
      title: 'Teemakohtaiset lajittelutehtavapaketit kategoriaparin mukaan',
      description: 'Luo lajitteluaktiviteettipaketteja luonnollisilla kategoriapareilla: Elaimet vs Ruoka, Maa vs Vesi, Hedelmat vs Vihannekset, Sisalla vs Ulkona, Lemmikit vs Villielaimet. Pakkaa 15-20 lajittelutehtavaa per paketti automaattisilla vastausavaimilla. Vaihtele kuvamaeaeraet progressiivista vaikeutta varten.',
    },
    {
      title: 'KDP luokittelutyokirjat progressiivisella vaikeudella',
      description: 'Kokoa 50-80 lajittelutehtavaa painetuiksi tyokirjoiksi Amazon KDP:lle. Rakenteen luvut vaikeuden mukaan: varhaiset luvut 4-6 kuvaa selvilla kategoriajaoilla, keskitason 8-10, edistyneet 12 kuvaa. Vastaussivut lukujen loppuun.',
    },
    {
      title: 'Myyntivalmiit lajitteluasema-aktiviteetit nimi/pvm-kentilla',
      description: 'Rakenna myyntivalmiita lajittelutehtavia nimi/paivamaara-kentilla ja vastausavaimilla. Tee tuoteluetteloon sopivia sarjoja: elava vs eloton, terveellinen vs epaeterveellinen ruoka, paivae- vs yoelaimet.',
    },
    {
      title: 'Monikieliset lajittelutuotteet kansainvalisille markkinoille',
      description: 'Kuvalajittelu-generaattori on kieliriippuvainen — kategoriatunnisteet kayttavat lokalisoituja kuvanimia. Luo lajittelutehtavia kaikilla 11 tuetulla kielella samoista kuvista. Lokalisoitu Lajittele kuvat -otsikko kaantyy automaattisesti.',
    },
    {
      title: 'Mukautetut valokuva-lajittelutehtavat',
      description: 'Lataa omia kuvia perhelaehtoisiin lajitteluaktiviteetteihin, tuotelinjakohtaisiin lajittelutehtaviin tai brandastyihin lajittelutehtaviin. Manuaalitila antaa sinun osoittaa kunkin kuvan. Yhdistettyna automaattiseen vastausavaimeen mukautetut valokuvalajittelutehtavat ovat ainutlaatuisia, personoituja tuotteita.',
    },
    {
      title: 'Kausittaiset ja juhlapy haien lajittelukokoelmat',
      description: 'Joulukoristeet vs jouluruoka, halloween-asut vs halloween-karkit, kesaktiviateetti vs talviaktiviteetit — kausittaiset kategoriaparisuhteet tuottavat luonnollisia lajitteluaktiviteetteja. Julkaise 4-6 viikkoa ennen juhlapyhaa.',
    },
  ],

  businessIdeas: [
    {
      title: 'Teemakohtainen lajittelutehtava-kauppa Etsyssa',
      description: 'Avaa Etsy-kauppa lajitteluaktiviteettipaketeilla kategoriaparin mukaan 104 kuvakokoelmalla. Elaimet vs Ruoka, Maa vs Vesi — kukin pari tulee erilliseksi listaukseksi 15-20 tehtavalla ja vastausavaimilla.',
      platform: 'Etsy',
    },
    {
      title: 'Amazon KDP luokittelutyokirjasarja',
      description: 'Kokoa 50-80 lajittelutehtavaa teemallisiksi tyokirjoiksi Amazon KDP:lle. Rakenteen sarjana: "Elainlajittelu", "Ruokaluokittelu", "Luontolajittelu". Jokainen kirja etenee yksinkertaisista 4 kuvan lajitteluista haastaviin 12 kuvan luokitteluihin.',
      platform: 'Amazon KDP',
    },
    {
      title: 'Gumroad lajitteluaktiviteettipaketit',
      description: 'Lataa lajittelupaketteja Gumroadiin nimi/paivamaara-kentilla, tuoteluetteloon raataloityailla kategorioilla ja automaattisilla vastausavaimilla. Myyjat etsivat lajitteluaktiviteetteja.',
      platform: 'Gumroad',
    },
    {
      title: 'Pinterest lajittelutehtava-liikennetsuppilo',
      description: 'Lajittelutehtavat kahden kategorian sommittelulla ja sekoitetulla leikkausruudukolla luovat visuaalisesti vaikuttavia Pinterest-pinnejae.',
      platform: 'Pinterest',
    },
    {
      title: 'Gumroad taysi lajittelutehtava-tyokalupaketti',
      description: 'Pakkaa lajittelutehtavat kaikista 104 teemasta ja molemmista valintatiloista kattavaksi tyokalupaketiksi Gumroadiin. Sisallyta 400+ tehtavaa vastausavaimilla.',
      platform: 'Gumroad',
    },
    {
      title: 'Monikieliset lajittelutuotteet globaaleille markkinoille',
      description: 'Kuvalajittelu-generaattori on kieliriippuvainen — kategoriatunnisteet ja Lajittele kuvat -otsikko kayttavat lokalisoituja kuvanimia. Tuota lajittelutehtavia kaikilla 11 kielella.',
      platform: 'Etsy / Gumroad',
    },
  ],

  proTips: [
    {
      title: 'Kayta teematilaa nopeaan massatuotantoon',
      description: 'Teematila autovalitsee 4-6 kuvaa per kategoria kuvakirjastosta. Valitse vasen ja oikea teema, klikkaa Generoi, ja sovellus tuottaa tayden lajittelutehtavan sekunneissa. Klikkaamalla Generoi uudelleen samoilla teemoilla luot erilaisen tehtavan eri kuvilla.',
    },
    {
      title: 'Kayta manuaalitilaa tuoteluetteloon raataloityyn tarkkuuteen',
      description: 'Manuaalitila antaa sinun valita yksittaiset kuvat kasin ja osoittaa kukin vasemmalle tai oikealle kategoriaan. Valttamatonta tuotelinjakohtaisille lajitteluaktiviteeteille, joissa tarkat kuvat ovat tarkeat.',
    },
    {
      title: 'Vaihtele kuvamaaeriae progressiivisia vaikeustuotteita varten',
      description: 'Saadettava kuvamaara 4-12 on vaikeudensaaetotyokalusi. Luo paketteja progressiivisella vaikeudella: aloita 4 kuvan tehtavilla selvilla kategorioilla, etene 8 kuvaan, paata 12 kuvan edentyneisiin tehtaviin.',
    },
    {
      title: 'Hyodynna kieliriippuvaisia tunnisteita monikielisiin tuotteisiin',
      description: 'Kategoriatunnisteet kayttavat lokalisoituja kuvanimia — kielen vaihtaminen muuttaa tekstin. Generoi teemallinen lajittelusarja suomeksi, vaihda sitten englanniksi, saksaksi tai mihin tahansa 11 tuetusta kielesta ja regeneroi. Nolla uudelleensuunnittelua.',
    },
    {
      title: 'Sisallyta seka tehtava etta vastausavain jokaiseen listaukseen',
      description: 'Automaattisesti generoitu vastausavain 6-kertaisilla kuvilla kategoriaruuduissa tekee lajittelutehtavistasi tayden, itsetarkistavan tuotteen. Sisallyta aina vastausavaimet. Kaksoistyoalue-jarjestelma generoi molemmat versiot samanaikaisesti.',
    },
    {
      title: 'Kayta tausta- ja kehystemoja yhtenaisen tuotebranding in saamiseksi',
      description: 'Riippumaton tausta- ja kehystemmajarjestelma erillisilla lapinakyvyyden liukusaatimilla antaa sinun luoda yhtenaisenae visuaalisen identiteetin lajittelupaketeissasi.',
    },
    {
      title: 'Kohdista luonnollisiin kategoriaparisuhtiin maksimaalisen hakunakyvyyden saamiseksi',
      description: 'Menestyneimat lajittelutehtavatuotteet kayttavat kategoriapareja, jotka vastaavat ostajien ajattelua: elaimet vs ruoka, maa vs vesi, elava vs eloton. Nimeae tuotelistauksesi todellisella kategoriapariilla.',
    },
  ],

  faq: [
    {
      question: 'Onko ilmainen kokeilu saatavilla?',
      answer: 'Kylla. Kaikki ominaisuudet — molemmat valintatilat, saadettaevat kuvamaarat 4-12, automaattisesti generoitu vastausavain 6-kertaisilla kuvilla, kaikki 104 teemallista kuvakokoelmaa, mukautettu kuvien lataus, tausta- ja kehysteemat, nimi/paivamaara-kentat, lokalisoitu Lajittele kuvat -otsikko 11 kielella, harmaasavykytkin ja kaikki latausmuodot. Ei rekisteroitymista, ei luottokorttia. Vesileima latauksissa.',
    },
    {
      question: 'Mitka ovat kaksi valintatilaa?',
      answer: 'Teematila — valitse teema kummallekin kategorialle, sovellus autovalitsee 4-6 kuvaa per teema. Manuaalitila — valitse yksittaiset kuvat kasin ja osoita kukin vasemmalle tai oikealle. Teematila on nopeampi; Manuaalitila antaa tuoteluetteloon raataloityyn kontrollin.',
    },
    {
      question: 'Miten kahden kategorian lajitteluasettelu toimii?',
      answer: 'Jokaisessa tehtavassa on tarkalleen kaksi kategoriaa — vasen ja oikea. Kaksi katkoviivareunallista kategoriakehystae ylhaaella ja sekoitettu leikkausruudukko alapuolella kaikki kuvat sekoitettuina. Kayttajat leikkaavat kuvat ja lajittelevat oikeaan kategoriaruutuun.',
    },
    {
      question: 'Montako kuvaa voin sisallyttaa?',
      answer: 'Jokainen tehtava tukee 4-12 kuvaa yhteensa, kunkin kategorian 2-10. Teematila hakee 4-6 per teema. Manuaalitila antaa tarkat maarat. Leikkausruudukko saataa sarakeasettelunsa (3-4 saraketta) automaattisesti.',
    },
    {
      question: 'Miten automaattisesti generoitu vastausavain toimii?',
      answer: 'Kaksoistyoalue-jarjestelma generoi samanaikaisesti tehtavan ja vastausavaimen. Vastausavain nayttaa kaksi kategoriaruutua kuvilla lajiteltuina oikeaan ryhmaan — renderoituna 6-kertaisella koolla. Nelja tuotantovalmista tiedostoa per generointi.',
    },
    {
      question: 'Onko kuvalajittelu-generaattori kieliriippuvainen?',
      answer: 'Kylla. Kategoriatunnisteet kayttavat lokalisoituja kuvanimia — kielen vaihtaminen muuttaa tekstin. Kissakuva nakyy "Kissa" suomeksi, "Cat" englanniksi, "Katze" saksaksi. Lokalisoitu Lajittele kuvat -otsikko kaantyy automaattisesti kaikille 11 tuetulla kielelle.',
    },
    {
      question: 'Mitka sivukoot ja vientimuodot ovat saatavilla?',
      answer: 'Sivukoot: Letter, A4, Nelio (1200x1200) ja mukautetut mitat. Vie JPEG:na tai PDF:na 300 DPI:lla. Vaihda harmaasavy. Jokainen generointi tuottaa nelja tiedostoa.',
    },
    {
      question: 'Voinko myyda lajittelutehtavia kaupallisesti?',
      answer: 'Kylla. Kaupallisella lisenssilla sinulla on taydet oikeudet myyda lajittelutehtavia digitaalisina latauksina Etsyssa, painettuina tyokirjoina Amazon KDP:ssa, resursseina Gumroadissa tai minka tahansa muun myyntikanavan kautta.',
    },
    {
      question: 'Mika on palautuskaytantonne?',
      answer: 'Kokeile ennen ostoa ilmaisella kokeilujaksollamme — kaikki ominaisuudet kaytettavissa. Koska ilmainen kokeilu antaa tayden paasynae, emme tarjoa palautuksia. Varmista, etta tyokalu sopii tarpeisiisi kokeilujakson avulla.',
    },
  ],

  internalLinks: [
    { pageType: 'app', slug: 'kuvalajittelu-tehtavat', anchorText: 'Kuvalajittelu-tehtavat — Taydet tuotetiedot' },
    { pageType: 'tool', slug: 'yhdistamistehtava-tyokalu', anchorText: 'Yhdistamistehtava-generaattori' },
    { pageType: 'tool', slug: 'ruudukkopeli-tyokalu', anchorText: 'Ruudukkopalapeli-generaattori' },
    { pageType: 'tool', slug: 'varjoyhdistely-tyokalu', anchorText: 'Varjoyhdistely-generaattori' },
    { pageType: 'tool', slug: 'kuvabingo-tyokalu', anchorText: 'Kuvabingo-generaattori' },
    { pageType: 'tool', slug: 'etsi-erilainen-tyokalu', anchorText: 'Etsi erilainen -generaattori' },
    { pageType: 'tool', slug: 'sanahaku-tyokalu', anchorText: 'Sanahaku-generaattori' },
    { pageType: 'tool', slug: 'varitys-tyokalu', anchorText: 'Varitys-generaattori' },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/finnish/picture%20sort/lajittele-kuvat-1.webp',
      primaryAlt: 'Kahden kategorian kuvalajittelu-tehtava katkoviivareunoilla varustetuilla kategoriakehyksilla ylhaaella ja sekoitetulla leikkausruudukolla alapuolella lokalisoidulla mintunvihreaellae Lajittele kuvat -otsikolla',
    },
    sampleGallery: [
      {
        src: '/samples/finnish/picture%20sort/lajittele-kuvat-2.webp',
        alt: 'Teematilan lajittelutehtava automaattisesti taeyttyilla vasemmalla ja oikealla kategorioilla kuvakirjastosta sekoitetulla leikkausruudukolla',
        caption: 'Teematila — automaattisesti taeytetyt kategoriat kuvakirjastosta satunnaisella leikkausruudukolla',
      },
      {
        src: '/samples/finnish/picture%20sort/lajittele-kuvat-3.webp',
        alt: 'Manuaalitilan lajittelutehtava kasin valituilla kuvilla osoitettuina vasemmalle ja oikealle kategorioille',
        caption: 'Manuaalitila — valitse kuvat kasin ja osoita kukin vasemmalle tai oikealle kategoriaan',
      },
      {
        src: '/samples/finnish/picture%20sort/lajittele-kuvat-1-answer-key.webp',
        alt: 'Kuvalajittelun vastausavain 6-kertaisilla kuvilla jarjestettyina oikeisiin kategoriaruutuihin katkoviivareunoilla',
        caption: 'Automaattisesti generoitu vastausavain — 6-kertaiset kuvat kategoriaruuduissa max 2 saraketta per ruutu',
      },
    ],
    youtubeId: '9kzmlABtNVQ',
    videoTitle: 'Nain teet kahden kategorian lajittelutehtavia teema- ja manuaalitiloilla, sekoitetuilla leikkausruudukoilla ja automaattisilla vastausavaimilla — vaiheittainen opas',
  },
};

export default content;
