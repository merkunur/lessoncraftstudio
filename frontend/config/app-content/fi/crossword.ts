import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'sanaristikko-generaattori',
    secondaryKeywords: [
      'luo sanaristikko',
      'ristikko tulostaa',
      'sanaristikko kuvilla',
      'ristikkogeneraattori',
    ],
    lsiKeywords: [
      'vihjeet',
      'ruudukko',
      'vaakasuora',
      'pystysuora',
      'vastaukset',
    ],
    titleTag: 'Sanaristikko-generaattori | Luo kuvilla ja vastauksilla',
    metaDescription: 'Luo sanaristikoita kuvavihjein 15×15-ruudukossa. 4 syöttötapaa, 104 teemaa, automaattiset vastaukset. Kokeile ilmaiseksi — kaupallinen lisenssi.',
  },

  hero: {
    title: 'Luo ristikko-palapeleja myytäväksi Etsyssä, KDP:ssä ja TPT:ssä',
    tagline: 'Korvaa perinteiset tekstivihjeet kuvavihjei llä 15×15-ristikkoruudukossa — neljä syöttötapaa (teeman automaattivalinta, manuaalinen kuvanimieditointi, mukautettu sanalista ja kuvien lataus), automaattisesti luotu vastausavain täytetyllä ruudukolla ja lokalisoitu "Kuvaristikko" -otsikko 104 temaattisessa kuvakokoelmassa.',
    description:
      'Kuvaristikko-palapelit erottuvat jokaisesta muusta tulostettavasta muodosta Etsyssä — värilliset kuvavihjeei korvaavat tylsät tekstimääritelmät, tehden ilmoituksistasi visuaalisesti erottuvia ja vastustamattomia ostajille. Tämä ristikko-palapeelin tekijä luo ammattimaisia ristikkoruudukoita temaattisilla kuvilla vihjeeinä, automaattisilla vastausavaimilla ja 300 DPI:n tulostusvalmiilla vienneillä — kaikki alle 3 minuutissa. Valitse yli 3 000 kuvituksesta 104 teemasta tai lataa omia kuvia. Sisäänrakennettu 11 kielen tuki tuottaa aidosti eri ristikkosanoja per kieli, joten yksi työkalu luo tuotteita englannin, saksan, ranskan, espanjan ja seitsemän muun markkinan tarpeisiin. Jokainen luomasi ristikko sisältää täyden kaupallisen lisenssin. Ilmainen kokeilu kaikilla ominaisuuksilla — ei rekisteröitymistä, ei luottokorttia. Latauksissa on vesileima; osta lisenssi poistaaksesi sen.',
  },

  howItWorks: {
    title: 'Näin luot ristikko-palapeleja alle 3 minuutissa',
    steps: [
      {
        title: 'Aseta sivuasettelu',
        description:
          'Avaa Sivu-paneeli ja valitse sivukoko: Letter pysty, Letter vaaka, A4 pysty, A4 vaaka tai mukautettu koko. Valitse taustaväri, taustateema läpinäkyvyydellä ja kehysteema omalla itsenäisellä läpinäkyvyyden säätimellään.',
      },
      {
        title: 'Valitse syöttötapa',
        description:
          'Päätä, miten toimitat 8 sanaa ristikkoon. Nopea teemagenerointi (oletus) valitsee automaattisesti 8 satunnaista kuvaa valitusta teemasta ja luo heti. Manuaalinen kuvanimieditointi mahdollistaa kuvien napsauttamisen ja nimeämisen uudelleen ennen luontia. Mukautettu sanalista vihjeineen avaa tekstikentän, johon syötät SANA: vihje -parit perinteisiin tekstivihjeristikkoihin. Omien kuvien lataus mahdollistaa omien kuvatiedostojen lisäämisen kirjaston rinnalle.',
      },
      {
        title: 'Valitse tai määritä 8 kuvaa tai sanaa',
        description:
          'Teemapohjaiseen luontiin selaa 104 temaattista kokoelmaa yli 3 100 värikkäällä kuvituksella. Suodata teeman mukaan pudotusvalikosta tai hae avainsanalla. Manuaaliseen editointiin napsauta yksittäisiä kuvia ja muokkaa niiden nimiä. Mukautettuihin sanalistoihin kirjoita 8 tai useampi SANA: vihje -merkintä. Latauksiinsä lisää JPEG-, PNG-, GIF- tai WebP-tiedostoja. Generaattori vaatii vähintään 8 kohdetta ristikon rakentamiseksi.',
      },
      {
        title: 'Luo kuvaristikko-palapeli',
        description:
          'Napsauta Luo tuottaaksesi ristikon kiinteälle 15×15-ruudukolle. Algoritmi poimii sanat kuvanimistä, poistaa välilyönnit, muuntaa isoiksi kirjaimiksi, sekoittaa ja lajittelee pituuden mukaan (pisin ensin), sitten sijoittaa sanat ruudukkoon optimaaliseen risteämiseen. Numeroidut vihjepaikat merkitsevät jokaisen sanan alun. Kuvavihjeeet näkyvät ruudukon vieressä vastaavilla numeroilla. Tyylikäs "Kuvaristikko" -otsikko näkyy yläosassa sinisellä taustalla (#5B9BD5) ja lokalisoidulla otsikkotekstillä.',
      },
      {
        title: 'Luo vastausavain ja lataa',
        description:
          'Siirry Vastausavain-välilehdelle nähdäksesi täytetyn ruudukon kaikki ristikkovastaukset näkyvissä. Lataa molemmat versiot neljällä painikkeella pudotusvalikossa: Työlehti-JPEG, Vastausavain-JPEG, Työlehti-PDF ja Vastausavain-PDF. Tiedostot viedään 300 DPI:llä tulostusvalmiina. Vaihda harmaasävy päälle musteystävällisiin versioihin.',
      },
    ],
  },

  keyFeatures: {
    title: 'Miksi kuvaristikot myyvät paremmin kuin pelkäteksti-muodot Etsyssä',
    features: [
      {
        title: 'Kuvaristikko-palapelit kuvavihjei llä kiinteällä 15×15-ruudukolla',
        description:
          'Luo ristikko-palapeleja, joissa värilliset kuvat korvaavat perinteiset tekstivihjeet. Kahdeksan kuvaa tuottavat kahdeksan sanaa, jotka algoritmi sijoittaa kiinteälle 15×15-ruudukolle — mustat solut muodostavat taustan värillisillä ääriviivoilla merkiten vastaussoluja. Sijoitusalgoritmi poimii sanat kuvanimistä, lajittelee pituuden mukaan (pisin ensin) optimaaliseen ruudukon kattavuuteen ja sijoittaa sanat risteävillä kirjaimilla.',
      },
      {
        title: 'Neljä syöttötapaa: Teeman automaattivalinta, Manuaalinen editointi, Mukautettu sanalista ja Kuvien lataus',
        description:
          'Yksi generaattori tukee neljää erillistä tapaa toimittaa ristikkosisältöä. Nopea teemagenerointi poimii 8 satunnaista kuvaa teemasta ja luo heti. Manuaalinen kuvanimieditointi mahdollistaa kuvien valinnan ja nimeämisen uudelleen ennen luontia — tarkan hallinnan ruudukon sanoihin. Mukautettu sanalista vihjeineen vaihtaa perinteiseen ristikkotilaan: syötä SANA: vihje -parit tekstikenttään tekstipohjaisia vihjeitä varten ilman kuvia. Omien kuvien lataus lisää omia tiedostoja kirjastokuvien rinnalle.',
      },
      {
        title: 'Automaattisesti luotu vastausavain täytetyllä ristikkoruudukolla',
        description:
          'Jokainen kuvaristikko luo automaattisesti vastausavaimen erilliselle kangas-välilehdelle. Vastausavain toistaa tarkan palapeliasettelu ja täyttää ruudukon kaikilla oikeilla vastauksilla näkyvissä soluissa. Ei manuaalista vastausten luontia, ei erillistä tiedostoa — vastausavain pysyy täydellisesti synkronoituna palapelin kanssa.',
      },
      {
        title: 'Lokalisoidut palapeelisanat 11 kielellä Image Vocabulary -järjestelmän kautta',
        description:
          'Kuvaristikko-generaattori on kieliriippuvainen: palapeelisanat tulevat lokalisoiduista kuvanimistä Image Vocabulary -järjestelmän kautta. Sisältökielen vaihtaminen muuttaa todellisia sanoja ristikkoruudukossa. Esimerkiksi kissakuva tuottaa "KISSA" suomeksi mutta "CAT" englanniksi ja "KATZE" saksaksi — tuottaen täysin eri ristikko-palapeleja samoista kuvista. Kaupallinen paketti sisältää englannin; Täysi pääsy avaa kaikki 11 kieltä lokalisoituihin palapeelisanoihin.',
      },
      {
        title: 'Mukautettu sanalista tekstivihjei llä perinteisiin ristikkoihin',
        description:
          'Aktivoi Mukautettu sanalista vihjeineen -valintaruutu vaihtaaksesi kuvaristikosta perinteiseen tekstivihjeiden ristikkoon. Syötä sanat ja vihjeet SANA: vihjeteksti -muodossa, yksi per rivi, vähintään 8 merkintää. Sama 15×15-ruudukkoalgoritmi sijoittaa mukautetut sanasi optimaaliseen risteämiseen. Tämä tila mahdollistaa sanastoristikkojen, oikeinkirjoitusristikkojen tai aihekohtaisten ristikkojen luomisen myyjän määrittelemällä sisällöllä.',
      },
      {
        title: 'Kuvakirjasto 104 temaattisella kokoelmalla ja yli 3 100 kuvituksella',
        description:
          'Selaa 104 temaattista kuvakokoelmaa. Jokainen teema tarjoaa yhtenäisen värikkäiden kuvitusten sarjan, joka toimii visuaalisina vihjei nä ristikko-palapeleissäsi. Kaupallinen paketti sisältää 10 värikästä teemaa; Täysi pääsy avaa kaikki 104 teemaa.',
      },
      {
        title: 'Tulostusvalmiit PDF- ja JPEG-viennit 300 DPI:llä ja harmaasävyvaihto',
        description:
          'Lataa ristikko-palapeleja ja vastausavaimia korkearesoluutioisina JPEG-kuvina tai tulostusvalmiina PDF-dokumentteina 300 DPI:n tarkkuudella (6× kerroin). Sivukoot sisältävät Letter pysty, Letter vaaka, A4 pysty, A4 vaaka ja täysin mukautetut mitat. Vaihda harmaasävy päälle musteystävällisiin versioihin.',
      },
    ],
  },

  businessUseCases: {
    title: 'Luo ristikko-palapelikirjoja Amazon KDP:lle',
    cases: [
      {
        title: 'Temaattiset kuvaristikkopaketit Etsyssä',
        description:
          'Luo temaattisia kuvaristikko-paketteja 104 kuvakokoelmalla — eläinristikot, ruokaristikot, ajoneuvoristikot, juhlapyhäristikot ja kymmeniä muita. Pakkaa 10–20 kuvaristikoita per teema vastausavaimet mukaan lukien, ja myy 3–7 € per paketti. Kuvavihjeiden muoto tekee näistä ristikoista visuaalisesti houkuttelevia Etsy-ilmoitusten esikatselukuvissa, nostaen klikkausprosentteja verrattuna pelkäteksti-ristikkotuotteisiin.',
        platform: 'Etsy (etsy.com)',
      },
      {
        title: 'Kuvaristikko-aktiviteettityökirjat Amazon KDP:ssä',
        description:
          'Kokoa 40–80 kuvaristikoita painetuksi työkirjaksi Amazon KDP -muodossa. Järjestä luvut teemoittain — eläimet, ruoka, luonto, juhlapyhät — asteittaisella sanastovaikeudella osioiden välillä. Sisällytä vastausavaimet kirjan loppuun. Harmaasävyvaihto tuottaa musteystävällisiä sivuja mustavalkoisten kirjansisäsivujen valmiiksi.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Monikieliset kuvaristikkosarjat kieliriippuvaisella luonnilla',
        description:
          'Hyödynnä kieliriippuvaista sanojen luontia luodaksesi kuvaristikko-palapeleja 11 kielellä. Samat kuvat tuottavat täysin eri ristikkoruudukkoja kielen vaihtuessa. Luo monikielisiä ristikkopaketteja, joissa jokainen kieliversio käyttää samoja temaattisia kuvia mutta tuottaa uniikkeja palapeleja lokalisoiduilla sanoilla. Myy kielikohtaisia paketteja tai monikielisiä megapaketteja premium-hintaan.',
        platform: 'Etsy / Gumroad (monikielinen markkina)',
      },
      {
        title: 'Mukautetut sanastoristikot Gumroadiin',
        description:
          'Käytä Mukautettu sanalista vihjeineen -tilaa luodaksesi niche-kohtaisia ristikko-palapeleja myyjän määrittelemällä sanastolla. Syötä aihekohtaisia termejä ja määritelmiä SANA: vihje -muodossa. Luo luokka-tason sanastoristikkosarjoja vastausavaimineen sekä PDF- että JPEG-muodossa.',
        platform: 'Gumroad (gumroad.com)',
      },
      {
        title: 'Kausittaiset kuvaristikkokokoelmat',
        description:
          'Nuo 104 temaattista kuvakokoelmaa kattavat jokaisen kausi- ja juhlapyhätilaisuuden. Luo aikarajoitettuja kuvaristikkokokoelmia, jotka ajoittuvat huippuostosjaksoihin. Kuvaristikkojen visuaalisuus tekee kausiteemoista erityisen houkuttelevia — juhlapyhäkuvat vihjeinä luovat välitöntä kausivetovoimaa.',
        platform: 'Etsy / Amazon KDP / Gumroad (kausittainen)',
      },
    ],
  },

  faq: [
    {
      question: 'Mikä on kuvaristikko ja miten se eroaa perinteisestä ristikosta?',
      answer:
        'Kuvaristikko korvaa perinteiset tekstivihjeet kuvavihjeil lä. Sen sijaan, että lukisi kirjoitetun määritelmän ja täyttäisi vastauksen, ratkaisija katsoo värillistä kuvaa ja kirjoittaa sen edustaman sanan ristikkoruudukkoon. Generaattori sijoittaa 8 kuvasta johdettua sanaa kiinteälle 15×15-ruudukolle numeroiduilla paikoilla, jotka yhdistävät jokaisen kuvan aloitussolunsa.',
    },
    {
      question: 'Mitkä ovat neljä syöttötapaa?',
      answer:
        'Nopea teemagenerointi (oletus) valitsee automaattisesti 8 satunnaista kuvaa valitusta teemasta ja luo heti. Manuaalinen kuvanimieditointi mahdollistaa kuvien valinnan ja uudelleen nimeämisen — hyödyllistä sanaston tarkkaan hallintaan. Mukautettu sanalista vihjeineen avaa tekstikentän SANA: vihje -pareille perinteisiin tekstivihjeristikkoihin ilman kuvia. Omien kuvien lataus lisää omia JPEG-, PNG-, GIF- tai WebP-tiedostoja kirjastokuvien rinnalle.',
    },
    {
      question: 'Onko Kuvaristikko-generaattori kieliriippuvainen?',
      answer:
        'Kyllä. Palapeelisanat tulevat lokalisoiduista kuvanimistä Image Vocabulary -järjestelmän kautta. Sisältökielen vaihtaminen muuttaa todellisia sanoja ristikkoruudukossa. Kissakuva tuottaa "KISSA" suomeksi mutta "CAT" englanniksi, "KATZE" saksaksi ja "GATTO" italiaksi — luoden täysin eri ristikko-palapeleja identtisistä kuvavalinnoista. Lokalisoitu "Kuvaristikko" -otsikko vaihtuu myös valitun kielen mukaan.',
    },
    {
      question: 'Miten automaattisesti luotu vastausavain toimii?',
      answer:
        'Generaattori käyttää kaksikangas-järjestelmää Työlehti-välilehdellä (palapeli) ja Vastausavain-välilehdellä (täytetty ruudukko). Työlehti näyttää tyhjän ristikkoruudukon numeroiduilla paikoilla ja kuva- tai tekstivihjeillä. Vastausavain toistaa identtisen asettelun ja täyttää jokaisen solun oikeilla kirjaimilla. Molemmat versiot viedään erikseen neljällä erillisellä latauspainikkeella.',
    },
    {
      question: 'Onko ilmainen kokeilu?',
      answer:
        'Kyllä. Voit käyttää kaikkia ominaisuuksia — kaikkia neljää syöttötapaa, 15×15-ruudukko-generaattoria, automaattisesti luotua vastausavainta, koko kuvakirjastoa, tausta- ja kehysteemoja, kaikkia latausmuotoja ja harmaasävyvaihtoa — ilman tilin luomista, luottokortin syöttämistä tai ohjelmiston asentamista. Ilmaisen kokeilun latauksissa on pieni vesileima. Kaupallinen lisenssi poistaa vesileiman ja antaa täydet myyntioikeudet.',
    },
    {
      question: 'Voinko myydä tällä työkalulla luotuja kuvaristikko-palapeleja Etsyssä ja Amazon KDP:ssä?',
      answer:
        'Kyllä. Kaupallisella lisenssillä sinulla on täydet oikeudet myydä kuvaristikko-palapelisi digitaalisina latauksina Etsyssä, painettuina työkirjoina Amazon KDP:ssä, digitaalisina tuotteina Gumroadissa tai millä tahansa muulla myyntikanavalla.',
    },
    {
      question: 'Sopivatko sanaristikkotehtävät esiopetukseen, alkuopetukseen ja alakouluun?',
      answer:
        'Sanaristikot sopivat parhaiten alkuopetukseen (1.\u20132. luokka) ja alakouluun (3.\u20136. luokka), kun lapset osaavat kirjoittaa kirjaimia. Kuvavihjeet tekevät tehtävistä saavutettavia jo 1. luokalla.',
    },
    {
      question: 'Noudattavatko sanaristikkotehtävät OPS 2014 -opetussuunnitelmaa?',
      answer:
        'Kyllä. Sanaristikot tukevat OPS 2014:n äidinkielen tavoitteita T3 (sanavaraston laajentaminen), T4 (oikeinkirjoituksen harjoittelu) ja T7 (kirjoitetun kielen ymmärtäminen). Kuvavihjeet yhdistävät visuaalisen ja kielellisen oppimisen.',
    },
    {
      question: 'Miten luon sanaristikon nopeasti?',
      answer:
        'Avaa generaattori, valitse sisältölähde (kuvakirjasto, manuaalinen tai oma sanalista), aseta ruudukon koko, valitse teemakuvat vihjekuviksi ja napsauta Luo. Generaattori sijoittaa sanat automaattisesti ristikkoon ja luo vastausavaimen.',
    },
    {
      question: 'Sisältyvätkö vastaukset automaattisesti?',
      answer:
        'Kyllä. Jokainen sanaristikko sisältää automaattisesti luodun vastausavaimen, jossa kaikki sanat on täytetty ruudukkoon. Vastausavain on erillisellä sivulla.',
    },
    {
      question: 'Voinko myydä näitä tehtäviä Etsyssä ja Amazon KDP:ssä?',
      answer:
        'Kyllä. Kaupallisella lisenssillä sinulla on täydet oikeudet myydä sanaristikkotehtäviä digitaalisina latauksina Etsyssä, painettuina pulmakirjoina Amazon KDP:ssä tai millä tahansa muulla alustalla.',
    },
    {
      question: 'Kuinka monella kielellä voin luoda tehtäviä?',
      answer:
        'Generaattori tukee 11 kieltä: suomi, englanti, saksa, ranska, espanja, portugali, italia, hollanti, ruotsi, tanska ja norja. Sanojen sijoittelu ja ruudukon täyttökirjaimet mukautuvat automaattisesti kieleen. Jokainen kieliversio on erillinen tuote.',
    },
    {
      question: 'Mikä on palautuskäytäntö?',
      answer:
        'Koska ilmainen kokeilu antaa pääsyn kaikkiin ominaisuuksiin, emme tarjoa palautuksia kaupallisten lisenssien ostoista. Ilmainen kokeilu on palautuskäytäntö — varmista, että työkalu sopii tarpeisiisi ennen lisenssin hankkimista.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'sanaristikko-tyolehdat',
      anchorText: 'Sanaristikko-palapeleja täydentäviin palapeelipaketteihin',
    },
    {
      pageType: 'guide',
      slug: 'luo-ristikko-palapeleja',
      anchorText: 'Vaihe vaiheelta -opas myytävien ristikko-palapelien luomiseen',
    },
    {
      pageType: 'guide',
      slug: 'julkaise-palapelikirjoja-kdp',
      anchorText: 'Näin julkaiset palapelikirjoja Amazon KDP:ssä',
    },
    {
      pageType: 'app',
      slug: 'sanasokkelo-tyoarkit',
      anchorText: 'Sanasokkelo Työarkkien Generaattori',
    },
    {
      pageType: 'bundle',
      slug: 'lukeminen-kieli-paketti',
      anchorText: 'Lukeminen & Kieli Paketti — Kaikki Kielityökalut',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/finnish/crossword/kuvaristikko-1.webp',
      primaryAlt: 'Kuvaristikko-palapeli kuvavihjei llä 15×15-ruudukossa lokalisoidulla Kuvaristikko-otsikolla ja numeroiduilla vihjepaikoilla',
    },
    sampleGallery: [
      {
        src: '/samples/finnish/crossword/kuvaristikko-1.webp',
        alt: 'Kuvaristikko-palapeli temaattisilla kuvavihjei llä 15×15-ristikkoruudukon vieressä',
        caption: 'Kuvaristikko — kuvavihjeeet korvaavat perinteiset tekstivihjeet 15×15-ruudukossa',
      },
      {
        src: '/samples/finnish/crossword/kuvaristikko-2.webp',
        alt: 'Mukautettu sanalista -ristikko tekstivihjeillä ja täytetyllä ristikkoruudukolla',
        caption: 'Mukautettu sanalista -tila — perinteiset tekstivihjeen ristikot omalla sanastollasi',
      },
      {
        src: '/samples/finnish/crossword/kuvaristikko-1-answer-key.webp',
        alt: 'Ristikko-palapelin vastausavain kaikki oikeat kirjaimet täytettynä ruudukkoon',
        caption: 'Automaattisesti luotu vastausavain — täytetty ruudukko näyttää kaikki oikeat vastaukset',
      },
    ],
    youtubeId: 'b3WKDrzif-w',
    videoTitle: 'Näin luot kuvaristikko-palapeleja kuvavihjei llä ja automaattisilla vastausavaimilla — Vaihe vaiheelta -opas',
  },
};

export default content;
