import { registerThemeContent } from '../registry';
import type { EnrichedThemeContent } from '../types';

const content: EnrichedThemeContent = {
  // -- SEO fields --
  name: 'Vaatteet',
  title: 'Vaateteht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  description: 'Tutustu vaateteht\u00e4viin lapsille: vuodenaikojen asut, koot, kuviot ja lajittelu. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  keywords: 'vaatetehtävät lapsille, vaatteet oppimateriaali lapset, pukeutuminen tehtävä, vaatesanasto harjoitus, vuodenajat ja vaatteet, vaatteiden lajittelu tehtävä, pukeutuminen sään mukaan, arjen taidot vaatteet, vaatteiden tunnistaminen, vaateteht\u00e4v\u00e4t lapsille, vaate ty\u00f6lehdet tulostettava',
  heading: 'Vaateaiheiset Teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille',

  // -- Rich narrative content --
  intro: 'Vaatteet ovat teema, johon jokainen lapsi tutustuu heti her\u00e4tess\u00e4\u00e4n aamulla, mik\u00e4 tekee siit\u00e4 voimakkaan ja henkil\u00f6kohtaisesti merkityksellisen yhteyden varhaiseen oppimiseen. Pukeutuminen sis\u00e4lt\u00e4\u00e4 yll\u00e4tt\u00e4v\u00e4n paljon kognitiivisia taitoja: s\u00e4\u00e4nmukaisten vaatteiden valitseminen vaatii p\u00e4\u00e4ttely\u00e4 vuodenajoista ja l\u00e4mp\u00f6tilasta, asukokonaisuuksien yhteensovittaminen hy\u00f6dynt\u00e4\u00e4 kuvioiden tunnistamista ja v\u00e4rien yhdistely\u00e4, ja oikean kokoisen paidan valinta kehitt\u00e4\u00e4 vertailu- ja mittausajattelua. Vaateaiheiset ty\u00f6lehdet valjasivat n\u00e4m\u00e4 arjen p\u00e4\u00e4t\u00f6ksentekohetket j\u00e4sennellyiksi oppimistoiminnoiksi, jotka tuntuvat tutuilta ja motivoivilta pienille lapsille. Tulostettavissa vaatety\u00f6lehdiss\u00e4mme on v\u00e4rikkäit\u00e4 kuvituksia paidoista, housuista, mekoista, kengist\u00e4, hatuista, takeista, sukista ja asusteista, jotka lapset voivat heti yhdist\u00e4\u00e4 omaan vaatekaappiinsa. Lajitteluteht\u00e4v\u00e4t ovat vaateteeman ytimess\u00e4, koska vaatteet soveltuvat luontevasti moniominaisuuksiseen luokitteluun. Lapset voivat lajitella vaatekappaleita vuodenajan mukaan pohtien, mitk\u00e4 kuuluvat talveen ja mitk\u00e4 kes\u00e4\u00e4n, tai tyypin mukaan kuten yl\u00e4osat, alaosat ja asusteet, tai v\u00e4rin, koon tai materiaalin perusteella. T\u00e4m\u00e4 joustavuus lajitteluperusteissa kehitt\u00e4\u00e4 juuri sellaista mukautuvaa luokitteluajattelua, joka on matemaattisen luokittelun ja tieteellisen taksonomian perusta. Kokovertailut vaatekappaleiden avulla opettavat k\u00e4sitteit\u00e4 kuten suurempi, pienempi, pisin ja lyhyin yhteyksiss\u00e4, jotka tuntuvat luontevilla, koska lapset kohtaavat s\u00e4\u00e4nn\u00f6llisesti vaatteita, jotka ovat liian suuria, liian pieni\u00e4 tai juuri sopivia. Matematiikkateht\u00e4viss\u00e4 sukkia k\u00e4ytet\u00e4\u00e4n parittaisen laskemisen harjoitteluun, nappeja yksi yhteen -vastaavuuden vahvistamiseen ja kenk\u00e4pareja parillisten lukujen k\u00e4sitteen esittelyyn. N\u00e4m\u00e4 konkreettiset vaatepohjaiset laskurit tekev\u00e4t abstrakteista lukuk\u00e4sitteist\u00e4 k\u00e4sin kosketeltavia ja muistettavia. Lukutaidon ty\u00f6lehdet esittelev\u00e4t sanastoa kuten kangas, vetoketju, hiha, kuvio ja vaatekaappi \u2013 sanoja, jotka laajentavat kuvailevaa kielt\u00e4 ja tukevat t\u00e4sm\u00e4llist\u00e4 viestint\u00e4\u00e4. Kuvioiden tunnistamisteht\u00e4v\u00e4t ovat erityisen tehokkaita vaateteemalla, koska lapset voivat tarkkailla raitoja, pilkkuja, ruutuja ja v\u00e4risarjoja kuvitetuissa vaatekappaleissa, yhdist\u00e4en visuaalisen kuviotaidon algebralliseen ajatteluun, jota matematiikan opetussuunnitelma vaatii jo varhaisista luokista alkaen. V\u00e4rityssivut asukokonaisuuksista ja muotisuunnitelmista kehitt\u00e4v\u00e4t hienomotoriikkaa ja kutsuvat luovaan ilmaisuun. Opettajille vaateteema yhdistyy luontevasti keskusteluihin s\u00e4\u00e4st\u00e4, vuodenajoista, kulttuureista ja itseilmaisusta, mik\u00e4 tekee siit\u00e4 monipuolisen teeman viikkojen integroidun opetuksen perustaksi. Vanhemmat pit\u00e4v\u00e4t vaatety\u00f6lehti\u00e4 erityisen k\u00e4yt\u00e4nn\u00f6llisin\u00e4, koska oppiminen siirtyy v\u00e4litt\u00f6m\u00e4sti p\u00e4ivitt\u00e4iseen pukeutumisrutiiniin, muuttaen jokaisen aamun minilektioksi s\u00e4\u00e4p\u00e4\u00e4ttelyst\u00e4, yhdistelyst\u00e4 ja itsen\u00e4isest\u00e4 p\u00e4\u00e4t\u00f6ksenteosta.',

  educationalOverview: 'Vaateaiheiset ty\u00f6lehdet tuottavat vahvoja pedagogisia tuloksia, koska ne kehitt\u00e4v\u00e4t ominaisuuksiin perustuvaa p\u00e4\u00e4ttelykyky\u00e4 eli kyky\u00e4 tunnistaa, kuvailla ja lajitella esineit\u00e4 usean ominaisuuden perusteella samanaikaisesti. T\u00e4m\u00e4 taito on perustavanlaatuinen matemaattiselle luokittelulle, tieteelliselle havainnoinnille ja luetun ymm\u00e4rt\u00e4miselle, mutta sit\u00e4 on usein vaikea opettaa abstraktisti. Vaatteet tarjoavat konkreettisen ja henkil\u00f6kohtaisesti merkityksellisen yhteyden, jossa lapset harjoittelevat moniominaisuuksista ajattelua luontevasti, koska he jo ymm\u00e4rt\u00e4v\u00e4t, ett\u00e4 takki voi olla samanaikaisesti sininen, vedenpit\u00e4v\u00e4 ja talvikappale. Kun he lajittelevat kuvitettuja vaatteita ty\u00f6lehdill\u00e4, he harjoittavat samaa kognitiivista joustavuutta, jota tarvitaan lukujen luokittelussa parillisiksi ja kymment\u00e4 suuremmiksi tai tarinan hahmojen tunnistamisessa usean piirteen perusteella. Kokovertailu on toinen alue, jossa vaatety\u00f6lehdet loistavat. Koska lapsilla on suoraa kokemusta sopivista ja sopimattomista vaatteista, k\u00e4sitteet kuten suurempi, pienempi, pitempi ja lyhyempi saavat v\u00e4litt\u00f6m\u00e4n merkityksen paitojen, kenkien ja housujen yhteydess\u00e4. T\u00e4m\u00e4 kehollinen ymm\u00e4rrys siirtyy matemaattisiin mittausteht\u00e4viin tehokkaammin kuin abstraktit vertailuharjoitukset. Kuvioiden tunnistaminen saa rikkaan visuaalisen yhteyden vaatekankaiden ja -suunnitelmien kautta. Raidallisen huivin toistuvan kuvion tunnistaminen tai pilkullisen kuvion seuraavan v\u00e4rin ennustaminen kehitt\u00e4\u00e4 algebrallista ajattelua, jota nykyaikaiset varhaisen matematiikan standardit korostavat. Vuodenaika-ajattelu yhdist\u00e4\u00e4 vaatteet luonnontieteen ja maantiedon k\u00e4sitteisiin, kun lapset oppivat, ett\u00e4 ilmasto m\u00e4\u00e4r\u00e4\u00e4 vaatevalinnat ja ett\u00e4 eri alueiden ihmiset pukeutuvat eri tavoin. Sanaston kehittyminen nopeutuu vaatety\u00f6lehtien kautta, koska termist\u00f6 on sek\u00e4 t\u00e4sm\u00e4llist\u00e4 ett\u00e4 k\u00e4yt\u00e4nn\u00f6llist\u00e4: lapset oppivat erottamaan takin, puseron ja liivin toisistaan tai puuvillan, villan ja polyesterin, rakentaen t\u00e4sm\u00e4llist\u00e4 kuvailevaa kielt\u00e4 tieteellist\u00e4 havainnointia ja vakuuttavaa kirjoittamista varten. Oppiainerajat ylitt\u00e4v\u00e4t yhteydet ulottuvat kulttuuritutkimukseen, kun ty\u00f6lehdill\u00e4 esitell\u00e4\u00e4n perinteisi\u00e4 asuja eri puolilta maailmaa, tunne- ja vuorovaikutustaitoihin, kun lapset pohtivat itseilmaisua vaatteiden kautta, sek\u00e4 arjen taitoihin, kun ty\u00f6lehdet mallintavat itsen\u00e4ist\u00e4 pukeutumista.',

  parentGuide: 'Vaatety\u00f6lehdet sulautuvat perheen arkeen vaivattomasti, koska pukeutuminen on jo p\u00e4ivitt\u00e4inen toiminto. Vuodenaikalajitteluteht\u00e4v\u00e4n j\u00e4lkeen voit ottaa lapsesi mukaan aamun asuvalintaan kysym\u00e4ll\u00e4, millainen s\u00e4\u00e4 t\u00e4n\u00e4\u00e4n on ja mitk\u00e4 vaatteet olisivat hyv\u00e4 valinta. T\u00e4m\u00e4 muuttaa rutiinihetken p\u00e4\u00e4ttelyharjoitukseksi, joka vahvistaa ty\u00f6lehtioppimista. K\u00e4yt\u00e4 pyykkihetke\u00e4 k\u00e4yt\u00e4nn\u00f6n matematiikkaan: pyyd\u00e4 lastasi lajittelemaan puhtaat vaatteet perheenj\u00e4senen mukaan, laskemaan sukkien m\u00e4\u00e4r\u00e4 ja parittamaan ne tai etsim\u00e4\u00e4n kaikki siniset vaatteet korista. Ostosreissuista tulee oppimismahdollisuuksia, kun lapsesi vertailee saman paidan eri kokoja, tunnistaa kankaiden kuvioita tai lukee vaatemerkeist\u00e4 materiaalinimet. Luo yksinkertainen paperinukka-askartelu, jossa lapsesi piirt\u00e4\u00e4 ja leikkaa vuodenajan asuja eri s\u00e4\u00e4tilanteisiin, harjoitellen sek\u00e4 ty\u00f6lehtien lajittelutaitoja ett\u00e4 hienomotoriikkaa. Nuoremmille lapsille pid\u00e4 ty\u00f6lehtihetket kymmenminuuttisina ja yhdist\u00e4 ne k\u00e4yt\u00e4nn\u00f6n palkintoon, kuten hauskan asun valitsemiseen. Kannusta kuvailevaa kielt\u00e4 pyyt\u00e4m\u00e4ll\u00e4 lastasi kertomaan ty\u00f6lehden vaatteista: mink\u00e4 v\u00e4rinen hattu on, onko takki iso vai pieni, mink\u00e4laisen kuvion n\u00e4et huivissa. T\u00e4m\u00e4 suullinen harjoittelu vahvistaa lukutaidon ty\u00f6lehtien sanastoa. Laita valmiit v\u00e4rityssivut lapsen huoneen sein\u00e4lle yhdist\u00e4m\u00e4\u00e4n ty\u00f6lehtien luovuus henkil\u00f6kohtaiseen tilaan ja oman oppimisen arvostamiseen.',

  // -- Curated apps --
  curatedAppIds: [
    'coloring', 'draw-and-color', 'matching-app', 'picture-sort',
    'shadow-match', 'big-small-app',
    'image-addition',
    'word-search',
    'pattern-train', 'odd-one-out',
  ],
  appCategories: [
    { category: 'math', appIds: ['image-addition'] },
    { category: 'literacy', appIds: ['word-search'] },
    { category: 'visual', appIds: ['coloring', 'draw-and-color', 'matching-app', 'picture-sort', 'shadow-match', 'big-small-app'] },
    { category: 'puzzles', appIds: ['pattern-train', 'odd-one-out'] },
  ],

  // -- Educational sections --
  teachingTips: [
    { title: 'Rakenna vuodenaikojen vaatekaappisein\u00e4', description: 'Jaa ilmoitustaulu nelj\u00e4\u00e4n vuodenaikaosioon: kev\u00e4t, kes\u00e4, syksy ja talvi. Vaatelajitteluteht\u00e4vien j\u00e4lkeen oppilaat piirt\u00e4v\u00e4t tai leikkaavat vaatekappaleita ja kiinnitt\u00e4v\u00e4t ne oikeaan vuodenaikaan. Todellisten vuodenaikojen vaihtuessa lukuvuoden aikana sein\u00e4\u00e4 p\u00e4ivitet\u00e4\u00e4n yhdess\u00e4, mik\u00e4 vahvistaa s\u00e4\u00e4n, l\u00e4mp\u00f6tilan ja vaatevalintojen v\u00e4list\u00e4 yhteytt\u00e4 kehittyv\u00e4n luokkaan\u00e4ytt\u00f6n kautta.', audience: 'teacher' },
    { title: 'J\u00e4rjest\u00e4 kuviomuo tin\u00e4yt\u00f6s', description: 'Kuviotunnistusteht\u00e4vien j\u00e4lkeen kutsu oppilaat luomaan omia kuviollisia asuja paperille leimojen, tarrojen tai v\u00e4rikynien avulla. Jokainen oppilas esittelee suunnitelmansa luokalle ja kuvaa luomansa toistuvan kuvion. T\u00e4m\u00e4 teht\u00e4v\u00e4 vahvistaa algebrallista ajattelua samalla rakentaen suullisen esityksen taitoja ja luovaa itsevarmuutta juhlallisessa yhteyless\u00e4.', audience: 'teacher' },
    { title: 'Tee pukeutumisesta oppimispeli', description: 'Anna lapsellesi joka aamu kaksi tai kolme asuvaihtoehtoa ja pyyd\u00e4 h\u00e4nt\u00e4 valitsemaan p\u00e4iv\u00e4n s\u00e4\u00e4n perusteella \u2013 aivan kuten ty\u00f6lehtien lajitteluteht\u00e4viss\u00e4. Kysy perusteluita: miksi valitsit takin eik\u00e4 t-paitaa? T\u00e4m\u00e4 p\u00e4ivitt\u00e4inen minilektio vahvistaa vuodenaika-ajattelua, p\u00e4\u00e4t\u00f6ksentekoa ja kuvailevaa sanastoa lis\u00e4\u00e4m\u00e4tt\u00e4 ylim\u00e4\u00e4r\u00e4ist\u00e4 aikaa arkeesi.', audience: 'parent' },
    { title: 'Muuta pyykinlajittelu oppimispisteeksi', description: 'Ota lapsesi mukaan puhtaiden pyykkien lajitteluun v\u00e4rin, perheenj\u00e4senen, vaatekappaleen tyypin tai s\u00e4ilytyspaikan mukaan. N\u00e4m\u00e4 ovat samoja luokittelutaitoja, joita vaatety\u00f6lehdill\u00e4 harjoitellaan, mutta aidoilla esineill\u00e4, jotka vahvistavat oppimista fyysisen k\u00e4sittelyn kautta. Sukkien laskeminen pareittain harjoittaa parittaista laskemista, ja taittelu kehitt\u00e4\u00e4 hienomotorista koordinaatiota.', audience: 'both' },
  ],
  activities: [
    {
      title: 'S\u00e4\u00e4pukeutumishaaste',
      description: 'N\u00e4yt\u00e4 nelj\u00e4 s\u00e4\u00e4tilannekuvaa: aurinkoinen, sateinen, luminen ja tuulinen. Tarjoa kokoelma leikattuja vaatekappaleita, kuten t-paitoja, sadetakkeja, talvikenkiä, huiveja, sandaaleja, lapasia ja sateenvarjoja. Lapset valitsevat sopivat vaatteet kuhunkin s\u00e4\u00e4tilanteeseen ja liimaavat valintansa paperinukkapohjaan. Kaikkien nelj\u00e4n tilanteen j\u00e4lkeen lapset vertaavat valintojaan parin kanssa ja keskustelevat, miksi tietyt vaatekappaleet sopivat tiettyihin olosuhteisiin.',
      materials: ['s\u00e4\u00e4tilannekortit', 'leikatut vaatekappaleet', 'paperinukkapohjat', 'liimap', 'sakset'],
      duration: '20\u201325 minuuttia',
      skillAreas: ['cognitive', 'social'],
    },
    {
      title: 'Sukkalajittelun matikkapiste',
      description: 'Ker\u00e4\u00e4 kokoelma eripariisia sukkia eri v\u00e4reiss\u00e4, kuvioissa ja koissa, tai tulosta kuvitettuja sukkapareja. Lapset etsiv\u00e4t yhteenkuuluvat parit, laskevat parien kokonaism\u00e4\u00e4r\u00e4n ja kirjaavat tuloksensa. Laajenna teht\u00e4v\u00e4\u00e4 matemaattisilla haasteilla: jos sinulla on kahdeksan sukkaa, montako paria se on, tai jos kolme paria on raidallisia ja kaksi paria pilkullisia, montako sukkaa sinulla on yhteens\u00e4? T\u00e4m\u00e4 k\u00e4yt\u00e4nn\u00f6n teht\u00e4v\u00e4 yhdist\u00e4\u00e4 vaateteeman parittaiseen laskemiseen, kertolaskuvalmiuteen ja yhteenlaskuun.',
      materials: ['kokoelma erilaisia sukkia tai tulostettuja sukkakuvia', 'kirjauslomakkeet', 'kyn\u00e4t'],
      duration: '15\u201320 minuuttia',
      skillAreas: ['math', 'motor'],
    },
    {
      title: 'Suunnittele oma kuviokangas',
      description: 'Anna jokaiselle lapselle tyhj\u00e4 suorakaide, joka esitt\u00e4\u00e4 kangaspalaa. Leimojen, tarrojen tai v\u00e4rikynien avulla lapset luovat kangaslleen oman toistuvan kuvion, kuten punainen-sininen-punainen-sininen tai ympyr\u00e4-t\u00e4hti-ympyr\u00e4-t\u00e4hti. Suunnittelun j\u00e4lkeen he kirjoittavat tai kertovat kuvios\u00e4\u00e4nt\u00f6ns\u00e4. Aseta kaikki kankaat luokan pyykkinarulle ja anna luokkatovereiden tunnistaa kunkin kuvio. T\u00e4m\u00e4 teht\u00e4v\u00e4 yhdist\u00e4\u00e4 vaateteeman algebralliseen ajatteluun ja kuvailevaan kirjoittamiseen.',
      materials: ['tyhj\u00e4t kangassuorakaiteet paperille', 'leimat, tarrat tai v\u00e4rikyn\u00e4t', 'naru pyykkinarulle', 'pyykkipojat'],
      duration: '20\u201325 minuuttia',
      skillAreas: ['math', 'motor'],
    },
  ],
  curriculumAlignment: [
    {
      standard: 'POPS.MA.1-2.T7',
      framework: 'POPS 2014',
      description: 'Luokitella ja lajitella vaatteita eri ominaisuuksien mukaan',
      relatedAppIds: ['big-small-app', 'shadow-match'],
    },
    {
      standard: 'POPS.YL.1-2.T4',
      framework: 'POPS 2014',
      description: 'Ymmärtää pukeutumisen merkitys sään ja tilanteen mukaan',
      relatedAppIds: ['picture-sort'],
    },
    {
      standard: 'POPS.AI.1-2.T2',
      framework: 'POPS 2014',
      description: 'Oppia vaatteisiin liittyvää sanastoa',
      relatedAppIds: ['word-search'],
    },
  ],

  // -- Grade-specific content --
  gradeContent: {
    'preschool': {
      seoTitle: 'Vaatetehtävät Esikouluun — Lajittele ja Väritä | LCS',
      seoDescription: 'Tulostettavia vaatetehtäviä esikouluun (3–4v). Lajittele vaatteita, väritä asuja, yhdistä varjoja ja laske kappaleita. Ilmaisia työlehtiä.',
      seoKeywords: 'vaatetehtävät esikoululaisille, hienomotoriikka harjoitus, väritys ja jäljentäminen, koon tunnistaminen, yksinkertainen laskeminen, vaatesanasto, pukeutuminen, vuodenajat ja vaatteet, vaatetehtävät esikoulu, vaatteiden oppiminen 3-4v',
      intro: 'Kolme- ja nelj\u00e4vuotiaat esikoululaiset ovat vaiheessa, jossa he alkavat ottaa vastuuta omasta pukeutumisestaan, mik\u00e4 tekee vaatteista syv\u00e4sti henkil\u00f6kohtaisen ja motivoivan teeman oppimiselle. T\u00e4ss\u00e4 kehitysvaiheessa lapset harjoittelevat perusluokittelua yhden ominaisuuden perusteella, tunnistavat v\u00e4rej\u00e4 ja yksinkertaisia kuvioita ja rakentavat sanastoa maailmansa kuvailemiseen. Esikoululaisille suunnitellut vaatety\u00f6lehdet k\u00e4ytt\u00e4v\u00e4t suuria, v\u00e4rikk\u00e4it\u00e4 kuvituksia paidoista, housuista, kengist\u00e4, hatuista ja takeista, jotka lapset voivat nimet\u00e4 ja yhdist\u00e4\u00e4 omaan vaatekaappiinsa. Tyypillisess\u00e4 lajitteluteht\u00e4v\u00e4ss\u00e4 lasta voidaan pyyt\u00e4\u00e4 ympyr\u00f6im\u00e4\u00e4n kaikki vaatteet, jotka puetaan p\u00e4\u00e4lle kylm\u00e4ll\u00e4 s\u00e4\u00e4ll\u00e4, mik\u00e4 kehitt\u00e4\u00e4 sek\u00e4 s\u00e4\u00e4p\u00e4\u00e4ttely\u00e4 ett\u00e4 kategoriaj\u00e4senyyden ymm\u00e4rt\u00e4mist\u00e4. Yhdist\u00e4misteht\u00e4v\u00e4t, joissa paritetaan identtiset sukat, k\u00e4sineet tai keng\u00e4t, vahvistavat visuaalista erottelukyky\u00e4 ja esittelev\u00e4t parien k\u00e4sitteen. Kokovertailuteht\u00e4v\u00e4t n\u00e4ytt\u00e4v\u00e4t ison kenk\u00e4n pienen vieress\u00e4 ja kysyv\u00e4t, kumpi sopisi aikuiselle ja kumpi lapselle, kiinnitt\u00e4en matemaattiset k\u00e4sitteet suurempi ja pienempi henkil\u00f6kohtaisesti merkitykselliseen yhteyteen. V\u00e4rityssivut hauskoista asuista, hassut hatuista ja kuviollisista huiveista kutsuvat luovaan ilmaisuun samalla kehitt\u00e4en hienomotoriikkaa. Varjoyhdist\u00e4misteht\u00e4v\u00e4t vaatesilhueteilla vahvistavat muotojen tunnistamista, koska lapsen on tunnistettava saappaan, hatun tai mekon \u00e4\u00e4riviiva ilman v\u00e4rivihjeit\u00e4. Opettajien ja vanhempien tulisi pit\u00e4\u00e4 harjoitukset kahdeksasta kahteentoista minuuttiin ja yhdist\u00e4\u00e4 ty\u00f6lehdet k\u00e4yt\u00e4nn\u00f6n pukeutumisharjoituksiin, kuten nappien, vetoketjujen ja neppareiden harjoitteluun pukeutumiskehyksell\u00e4, rakentaen sek\u00e4 akateemisia taitoja ett\u00e4 k\u00e4yt\u00e4nn\u00f6n itsen\u00e4isyytt\u00e4 samanaikaisesti.',
      objectives: [
        { skill: 'Vaatekappaleiden lajittelu yhden ominaisuuden kuten tyypin, v\u00e4rin tai vuodenajan mukaan', area: 'cognitive' },
        { skill: 'Identtisten vaateparien yhdist\u00e4minen ja vaatevarjojen tunnistaminen', area: 'math' },
        { skill: 'Yleisten vaatekappaleiden nime\u00e4minen ja kuvailu v\u00e4ri- ja kokosanoilla', area: 'literacy' },
      ],
      developmentalNotes: 'Kolme-nelj\u00e4vuotiaat hiovat hienomotorisia taitojaan p\u00e4ivitt\u00e4isten pukeutumistoimintojen kuten sukkien vet\u00e4misen, neppareiden kiinnitt\u00e4misen ja nappien pujottelun avulla. Vaatteiden v\u00e4rityssivut ja j\u00e4ljent\u00e4misteht\u00e4v\u00e4t t\u00e4ydent\u00e4v\u00e4t n\u00e4it\u00e4 todellisen maailman motorisia teht\u00e4vi\u00e4. Kognitiivisesti esikoululaiset rakentavat luokitteluajattelua, ja vaatteiden lajittelu yhden ominaisuuden kuten v\u00e4rin tai tyypin mukaan vahvistaa suoraan t\u00e4t\u00e4 perustavanlaatuista luokittelutaitoa.',
      teachingTips: [
        'Aseta oikeita vaatekappaleita kuten sukkia, lapasia ja hattuja ty\u00f6lehtien rinnalle, jotta lapset voivat k\u00e4sitell\u00e4 fyysisi\u00e4 esineit\u00e4 ennen paperiteht\u00e4v\u00e4n suorittamista, yhdist\u00e4en konkreettisen kokemuksen abstraktiin esitykseen.',
        'K\u00e4yt\u00e4 vain yht\u00e4 lajitteluperustetta kerrallaan esikoululaisille, kuten lajittele v\u00e4rin mukaan tai lajittele vuodenajan mukaan, jotta teht\u00e4v\u00e4 vastaa heid\u00e4n kehitystasoaan ja rakentaa itseluottamusta ennen moniominaisuuksisen lajittelun esittely\u00e4.',
      ],
      faq: [
        { question: 'Miten vaatety\u00f6lehdet auttavat esikoululaisia itsen\u00e4istymisess\u00e4?', answer: 'Vaatety\u00f6lehdet rakentavat itsen\u00e4isen pukeutumisen taustalla olevia kognitiivisia taitoja: mitkä kappaleet kuuluvat yhteen, mik\u00e4 sopii s\u00e4\u00e4h\u00e4n ja miten parit yhdistet\u00e4\u00e4n. Kun lapset harjoittelevat n\u00e4it\u00e4 p\u00e4\u00e4t\u00f6ksi\u00e4 paperilla, he kehitt\u00e4v\u00e4t p\u00e4\u00e4ttelyvarmuutta tehd\u00e4 samat valinnat joka aamu pukeutuessaan itsen\u00e4isesti.' },
        { question: 'Mitk\u00e4 vaatekappaleet toimivat parhaiten esikoulun ty\u00f6lehdill\u00e4?', answer: 'Tutut ja helposti tunnistettavat kappaleet kuten t-paidat, housut, keng\u00e4t, sukat, hatut ja takit toimivat parhaiten, koska esikoululaiset voivat v\u00e4litt\u00f6m\u00e4sti yhdist\u00e4\u00e4 kuvitukset omaan kokemukseensa. V\u00e4lt\u00e4 erikoistunutta vaatesanastoa t\u00e4ss\u00e4 vaiheessa ja keskity kappaleisiin, joita jokainen lapsi kohtaa p\u00e4ivitt\u00e4in.' },
        { question: 'Voivatko vaatety\u00f6lehdet opettaa s\u00e4\u00e4st\u00e4 esikoululaisille?', answer: 'Kyll\u00e4, vuodenaikainen vaatelajittelu on yksi tehokkaimmista tavoista esitell\u00e4 s\u00e4\u00e4k\u00e4sitteit\u00e4 kolme- ja nelj\u00e4vuotiaille. Kun lapset lajittelevat sandaalit kes\u00e4\u00e4n ja saappaat talveen, he harjoittelevat syy-seurausp\u00e4\u00e4ttely\u00e4 s\u00e4\u00e4olosuhteiden ja tarkoituksenmukaisten valintojen v\u00e4lill\u00e4, mik\u00e4 yhdist\u00e4\u00e4 luonnontieteen ja arjen taidot.' },
      ],

      snippetAnswer: 'Vaateaiheiset työlehdet esikoululaisille (3–4-vuotiaat) opettavat tunnistamaan vaatekappaleita, lajittelemaan niitä sään ja vuodenajan mukaan sekä kehittämään hienomotoriikkaa vaatekuvien värittämisen ja yhdistämisen kautta. Vaateteema yhdistää arjen taidot ja akateemisen oppimisen saumattomasti.',
      uniqueGradeAngle: 'Vaatetus on esikoululaiselle kehityksellisesti merkittävä teema, koska kolme- ja neljävuotiaat ovat juuri siirtymässä itsenäiseen pukeutumiseen — ja tämä itsenäistymisprosessi on yksi VASU:n itsestä huolehtimisen tavoitteiden kulmakivistä. Vaateteema yhdistää tämän käytännön taidon akateemiseen oppimiseen: lapsi oppii lajittelemaan vaatteita sään mukaan (sadetakki sadepäivänä, aurinkohattu helteellä), mikä on loogisen päättelyn harjoitusta puettuna arkiseen kontekstiin. Suomessa säävaihtelut tekevät pukeutumisesta erityisen monipuolisen aiheen: neljä vuodenaikaa vaatii täysin erilaista vaatetusta. Tämä tarjoaa luonnollisen luokittelukontekstin (talvivaatteet, kesävaatteet, sadeasut, ulkoilupuvut), joka on rikkaampaa kuin useimmissa muissa maissa. Vaatteiden laskeminen (montako nappia, montako taskua) kehittää havainnointitarkkuutta, ja vaatteiden järjestys pukeutuessa (ensin alusvaatteet, sitten housut, sitten paita) harjoittaa proseduraalista ajattelua.',
      developmentalMilestones: [
        { milestone: 'Itsenäisen pukeutumisen kehittyminen (3–4-vuotiaat oppivat pukemaan ja riisumaan vaatteita)', howWeAddress: 'Järjestystehtävät, joissa pukeutumisen vaiheet asetetaan oikeaan järjestykseen, tukevat itsenäistä pukeutumista kognitiivisella tasolla' },
        { milestone: 'Sään mukainen luokittelu (esikoululaiset oppivat yhdistämään säätilan oikeaan vaatetukseen)', howWeAddress: 'Lajittelutehtävät, joissa vaatteet yhdistetään sääkuviin, rakentavat loogista päättelykykyä arkisessa kontekstissa' },
        { milestone: 'Yksityiskohtien havainnointi vaatteissa (siirtyminen kokonaishahmosta nappien, taskujen ja vetoketjujen huomaamiseen)', howWeAddress: 'Väritystehtävät vaatteista, joissa on yksityiskohtia kuten napit, taskut ja kuviot, kehittävät havainnointitarkkuutta ja hienomotoriikkaa' },
        { milestone: 'Vuodenaikasanaston laajentaminen (esikoululaiset oppivat yhdistämään vaatteet vuodenaikoihin)', howWeAddress: 'Kuvayhdistämistehtävät, joissa vaatekappale liitetään vuodenaikaan, rakentavat sekä vaate- että vuodenaikasanastoa' },
      ],
      differentiationNotes: 'Tukea tarvitseville esikoululaisille aloita kolmella tutuimmalla vaatekappaleella (takki, housut, hattu), käytä selkeitä kuvia ja yksinkertaista sääluokittelu kahteen (lämmin ja kylmä). Edistyneille esikoululaisille lisää neljän vuodenajan vaateluokittelu, pyydä suunnittelemaan asu tietylle säälle valitsemalla kuvia ja kannusta kertomaan pukeutumisvaiheet oikeassa järjestyksessä kokonaisilla lauseilla.',
      parentTakeaway: 'Vaateteema on vanhemmille helpoin arjen oppimisresurssi: joka aamu pukeutuminen on työlehden jatke. Kysy lapselta, mitä vaatteita tänään tarvitaan sään perusteella, anna lapsen valita ja laskekaa yhdessä napit ja vetoketjut. Vaatteiden taittaminen ja lajittelu pyykkikorista on erinomainen lajitteluharjoitus. Tärkeintä on tukea itsenäistä pukeutumista kärsivällisesti — se on yksi kolmevuotiaan suurimmista saavutuksista.',
      classroomIntegration: 'Vaateteema yhdistyy esikoulun päivittäisiin siirtymiin luontevasti: ennen ulkoilua tutkitaan säätä ikkunasta ja valitaan oikea vaatetus työlehden ohjaamana. Oppimispisteissä lajitellaan vaatekuvia vuodenajan mukaan, väritetään vaatekuvituksia ja leikitaan kauppa- tai pukeutumisleikkiä rooliasuilla. Aamupiirissä keskustellaan päivän säästä ja sopivasta vaatetuksesta. Tämä arjelähtöinen lähestymistapa yhdistää itsestä huolehtimisen, matematiikan ja kielen VASU:n hengessä.',
      assessmentRubric: [
        { skill: 'Vaatekappaleiden laskeminen', emerging: 'laskee kolmeen asti osoittamalla vaatekuvia', proficient: 'laskee seitsemään asti ja kertoo kokonaismäärän', advanced: 'laskee kymmeneen, ryhmää vaatteet ja vertailee ryhmien kokoja' },
        { skill: 'Sään mukainen vaatevalinta', emerging: 'valitsee yhden oikean vaatteen kahdesta vaihtoehdosta aikuisen avulla', proficient: 'yhdistää itsenäisesti kolme vaatekappaletta oikeaan säätilaan', advanced: 'suunnittelee kokonaisen asun tietylle säälle ja perustelee valintansa' },
        { skill: 'Hienomotorinen hallinta', emerging: 'värittää vaatekuvia laajoilla liikkeillä rajojen yli', proficient: 'pysyy vaatekappaleiden ääriviivojen sisällä ja värittää yksityiskohtia', advanced: 'värittää tarkasti nappeja, taskuja ja kuvioita sekä piirtää omia vaatesuunnitelmia' },
      ],
    },
    'kindergarten': {
      seoTitle: 'Vaatetehtävät Esiopetukseen — Lue ja Pukeudu | LCS',
      seoDescription: 'Tulostettavia vaatetehtäviä esiopetukseen (5–6v). Opettele vaatesanastoa, laske vaatekappaleita ja ratkaise pulmia. Ilmaisia työlehtiä.',
      seoKeywords: 'vaatetehtävät esiopetukseen, alkuäänteet harjoitus, kirjaintunnistus oppiminen, lukuvalmius tukeminen, yhteenlasku kymmeneen, vaatesanasto, pukeutuminen, vuodenajat ja vaatteet, vaatetehtävät esiopetus, vaatteiden oppiminen 5-6v',
      intro: 'Esiopetusik\u00e4iset tuovat kasvavaa itsen\u00e4isyytt\u00e4 ja analyyttist\u00e4 ajattelua vaateaiheisiin ty\u00f6lehtiin, valmiina teht\u00e4viin, jotka yhdist\u00e4v\u00e4t ominaisuuksiin perustuvan lajittelun matemaattisiin ja lukutaidon perusteisiin. Viisi- ja kuusivuotiaat voivat lajitella kahden ominaisuuden perusteella samanaikaisesti, laskea luotettavasti kahteenkymmeneen ja rakentavat sanastoa esineiden yksityiskohtaiseen kuvailuun. T\u00e4m\u00e4n tason vaatety\u00f6lehdet hy\u00f6dynt\u00e4v\u00e4t n\u00e4it\u00e4 kasvavia kykj\u00e4 esittelem\u00e4ll\u00e4 monikriteerisen lajittelun: lapset saattavat etsi\u00e4 vaatteita, jotka ovat sek\u00e4 sinisi\u00e4 ett\u00e4 talvikappaleita, tai l\u00f6yt\u00e4\u00e4 asusteita, jotka sopivat my\u00f6s sateiseen s\u00e4\u00e4h\u00e4n. Yhteenlasku tulee mukaan vaateskenaarioiden kautta, kuten kolmen sukkiparin laskeminen kuudeksi yksitt\u00e4iseksi sukaksi tai laatikonssa olevien nelj\u00e4n paidan lis\u00e4\u00e4minen pyykkikorissa oleviin kahteen. Kuviotunnistusteht\u00e4v\u00e4t n\u00e4ytt\u00e4v\u00e4t sarjoja kuvitetuilla kankailla, huiveilla ja sukkakuvioilla ja pyyt\u00e4v\u00e4t lapsia tunnistamaan ja jatkamaan toistuvaa kuviota. Sanahaut esittelev\u00e4t vaatesanastoa kuten kangas, vetoketju, hiha, kuvio ja vaatekaappi, rakentaen n\u00e4k\u00f6sanojen tunnistamista k\u00e4yt\u00e4nn\u00f6llisen sanaston rinnalla. Kokovertailuteht\u00e4v\u00e4t monimutkaistuvat, kun lapset j\u00e4rjest\u00e4v\u00e4t kolme tai nelj\u00e4 kappaletta pienimm\u00e4st\u00e4 suurimpaan tai vertaavat eri huivien ja vy\u00f6iden pituuksia. Piirustus- ja v\u00e4ritysteht\u00e4v\u00e4t antavat lasten suunnitella omia asujaan, ilmaisten luovuutta samalla harjoitellen hienomotoriikkaa ja osoittaen ymm\u00e4rryst\u00e4 vuodenajoille sopivasta pukeutumisesta. Vaateteema yll\u00e4pit\u00e4\u00e4 korkeaa sitoutumista esiopetusiiss\u00e4, koska t\u00e4m\u00e4nik\u00e4iset lapset kehitt\u00e4v\u00e4t vahvoja henkil\u00f6kohtaisia mieltymyksi\u00e4 pukeutumiseensa, ja ty\u00f6lehdet, jotka kutsuvat tekemään valintoja ja ilmaisemaan mielipiteit\u00e4, tuntuvat voimaannuttavilta ja merkityksellisilt\u00e4.',
      objectives: [
        { skill: 'Vaatekappaleiden lajittelu kahden ominaisuuden perusteella samanaikaisesti ja lajittelus\u00e4\u00e4nt\u00f6jen selitt\u00e4minen', area: 'cognitive' },
        { skill: 'Vaatekappaleiden laskeminen yksitt\u00e4in ja pareittain sek\u00e4 yksinkertaisten yhteenlaskuteht\u00e4vien ratkaiseminen', area: 'math' },
        { skill: 'Vaatesanaston lukeminen ja kirjoittaminen sek\u00e4 vaatekappaleiden kuvailu usealla adjektiivilla', area: 'literacy' },
      ],
      developmentalNotes: 'Esiopetusik\u00e4iset kehitt\u00e4v\u00e4t joustavaa ajattelua, jota tarvitaan saman vaatekokoelman lajitteluun eri kriteereill\u00e4 \u2013 ensin v\u00e4rin, sitten vuodenajan ja lopuksi tyypin mukaan. T\u00e4m\u00e4 kognitiivinen joustavuus on keskeinen matemaattisen valmiuden mittari ja tukee luetun ymm\u00e4rt\u00e4mist\u00e4, kun lasten on huomioitava useita hahmopiirteit\u00e4 tai tarinaelementtej\u00e4 samanaikaisesti.',
      teachingTips: [
        'Haasta oppilaat lajittelemaan sama vaatekuvakokoelma kolmella eri tavalla yhden ty\u00f6lehtikerran aikana \u2013 v\u00e4rin, vuodenajan ja tyypin mukaan \u2013 kehitt\u00e4\u00e4kseen kognitiivista joustavuutta ja osoittaakseen, ett\u00e4 esineet voivat kuulua eri ryhmiin lajitteluperusteesta riippuen.',
        'Luo luokan l\u00f6yt\u00f6tavarapeli, jossa oppilaat kuvailevat puuttuvaa vaatekappaletta v\u00e4hint\u00e4\u00e4n kolmella ominaisuudella kuten suuri, punainen ja talvikappale harjoitellakseen t\u00e4sm\u00e4llist\u00e4 kuvailevaa kielt\u00e4.',
      ],
      faq: [
        { question: 'Mitk\u00e4 matemaattiset taidot esiopetuksen vaatety\u00f6lehdet kehitt\u00e4v\u00e4t?', answer: 'Ne rakentavat laskemista kahteenkymmeneen vaatekappaleiden avulla, yhteenlaskua vaateryhmien yhdist\u00e4misen kautta, parittaista laskemista sukka- ja kenk\u00e4parien kanssa, kokoon j\u00e4rjest\u00e4mist\u00e4 pienimm\u00e4st\u00e4 suurimpaan sek\u00e4 kuviotunnistusta kangassuunnitelmista. N\u00e4m\u00e4 taidot ovat linjassa Perusopetuksen opetussuunnitelman perusteiden (POPS) matematiikan tavoitteiden kanssa.' },
        { question: 'Miten vaatety\u00f6lehdet rakentavat kuvailevaa sanastoa?', answer: 'Vaatteita kuvaillaan usealla ominaisuudella samanaikaisesti: iso, punainen, villainen talvitakki k\u00e4ytt\u00e4\u00e4 kokoa, v\u00e4ri\u00e4, materiaalia ja vuodenaikaa yhdess\u00e4 ilmaisussa. Ty\u00f6lehdet, jotka pyyt\u00e4v\u00e4t lapsia kuvailemaan, lajittelemaan ja yhdist\u00e4m\u00e4\u00e4n vaatekappaleita, rakentavat luontevasti moniadjektiivista kuvailevaa kielt\u00e4, joka tukee sek\u00e4 kirjoittamisen kehityst\u00e4 ett\u00e4 tieteellist\u00e4 havainnointia.' },
        { question: 'Voivatko vaatety\u00f6lehdet k\u00e4sitell\u00e4 kulttuurista moninaisuutta?', answer: 'Kyll\u00e4, ty\u00f6lehdet, joissa esitell\u00e4\u00e4n perinteisi\u00e4 asuja eri kulttuurien, esittelev\u00e4t lapsille maailmanlaajuisia vaateperinteit\u00e4 samalla vahvistaen lajittelu- ja sanastotaitoja. T\u00e4m\u00e4 l\u00e4hestymistapa rakentaa kulttuuritietoisuutta ja kunnioitusta samalla osoittaen, ett\u00e4 vaatteiden tarve on universaali, vaikka tyylit vaihtelevat kauniisti.' },
      ],

      snippetAnswer: 'Vaateaiheiset työlehdet esiopetukseen (5–6-vuotiaat) opettavat itsenäistä pukeutumista ja säänhavainnointia, kehittävät luokittelutaitoja vuodenaikojen ja tilanteiden mukaan sekä vahvistavat kielitietoisuutta vaatesanaston avulla. Esiopetussuunnitelman itsestä huolehtimisen ja arjen taitojen tavoitteet toteutuvat.',
      uniqueGradeAngle: 'Esiopetusikäisille vaateteema saa uuden merkityksen, koska viisi- ja kuusivuotiaat kykenevät ensimmäistä kertaa tekemIään itsenäisiä pukeutumisvalintoja perustellusti — ei vain oman mieltymyksen vaan sään, tilanteen ja toiminnan vaatimusten mukaan. Tämä päätöksenteon ja perustelun taito on keskeinen koulunvalmiustaito. Matemaattisesti vaateteema tarjoaa luokittelukontekstin, jossa luokitteluperusteita on monia: materiaali, vuodenaika, tilanne, kehon osa. Kielitietoisuus kehittyy vaatesanaston kautta, joka sisältää yhdyssanoja ja materiaalitermejä: sade-tak-ki, vil-la-suk-ka, kumi-saa-pas. Esiopetussuunnitelman itsestä huolehtimisen osaamisalue saa konkreettisimman ilmauksensa, kun lapsi oppii valitsemaan oikean vaatetuksen itsenäisesti. Suomalainen neljän vuodenajan ilmasto tekee pukeutumisteemasta erityisen rikkaan: jokaiselle vuodenajalle on oma vaatekerrostusjIärjestelmänsä.',
      developmentalMilestones: [
        { milestone: 'Päätöksenteon perusteleminen (5–6-vuotiaat oppivat selittämään valintojaan)', howWeAddress: 'Vaatevalintatehtävät, joissa lapsi valitsee asun tietylle säälle ja perustelee valintansa, kehittävät päättelytaitoja ja suullista ilmaisua' },
        { milestone: 'Moniperusteinen luokittelu (esiopetusikäiset hallitsevat useamman luokitteluperusteen)', howWeAddress: 'Vaatelliajittelutehtävät, joissa ryhmätään vaatteita vuodenajan, materiaalin ja tilanteen mukaan, haastavat moniperusteista ajattelua' },
        { milestone: 'Itsenäinen pukeutuminen (viisi- ja kuusivuotiaat hallitsevat vetoketjut, napit ja kengännauhat)', howWeAddress: 'Pukeutumisvaihe-työlehdet, joissa lapsi järjestää kerrospukeutumisen oikeaan järjestykseen, tukevat itsenäistä arjen hallintaa' },
        { milestone: 'Yhdyssanojen hahmottaminen vaatesanastossa (esiopetusikäiset oppivat sanojen yhdistämisen)', howWeAddress: 'Tavutus- ja yhdyssanatehtävät vaatesanoilla (sade+takki, villa+sukka) kehittävät sanojen rakenteen ymmärtämistä' },
      ],
      differentiationNotes: 'Tukea tarvitseville esiopetusikäisille rajaa vaatevalinnat kahteen vaihtoehtoon per tilanne, käytä aitoja vaatteita kuvien rinnalla ja yksinkertaista kerrospukeutuminen kolmeen kerrokseen. Edistyneille esiopetusikäisille lisää materiaalitietoa (miksi villa lämmittää märkänäkin), pyydä suunnittelemaan retkivaatetus eri säätiloille perusteluineen ja haasta kirjoittamaan pukeutumisohjeet kokonaisilla lauseilla.',
      parentTakeaway: 'Vaateteema on esiopetusikäiselle tärkein arjen itsenIäistymisen väline. Anna lapsen valita aamulla vaatteensa: tutkikaa yhdessä säätä ikkunasta ja pohtikaa, mitIä tarvitaan. Harjoitelkaa vetoketjuja, nappeja ja kengIännauhoja kärsivällisesti. Vaatteiden lajittelu pyykkipäivänä (vaaleEt ja tummat, omat ja sisarusten) on erinomainen luokitteluharjoitus. Tärkeintä on tukea itsenIäisyyttä: anna aikaa ja kehu yrittämistä.',
      classroomIntegration: 'Vaateteema integroituu esiopetuksen päivittäisiin siirtymiin: ennen ulkoilua tutkitaan säätä ja pohditaan oikeaa pukeutumista työlehden ohjaamana. Aamupiirissä keskustellaan päivän säästä ja pukeutumisvalinnasta, oppimispisteissä lajitellaan vaatekuvia ja harjoitellaan yhdyssanoja, draamaleikissä pelataan vaatekauppa- tai muotinIäytösleikkiä. Esiopetussuunnitelman itsestä huolehtimisen, kielen ja matemaattisen luokittelun tavoitteet toteutuvat integroidusti.',
      assessmentRubric: [
        { skill: 'Säänmukainen vaatevalinta', emerging: 'valitsee oikean vaatteen kahdesta vaihtoehdosta aikuisen avulla', proficient: 'suunnittelee itsenäisesti kokonaisen asun sään mukaan ja nimeää vaatekappaleet', advanced: 'suunnittelee asun, perustelee valinnat ja ehdottaa vaihtoehtoja eri säätiloihin' },
        { skill: 'Vaatteiden moniperusteinen luokittelu', emerging: 'lajittelee vaatteet kahteen ryhmään yhden perusteen mukaan', proficient: 'lajittelee kahdella perusteella (vuodenaika ja tilanne) ja nimeää kriteerit', advanced: 'lajittelee kolmella perusteella, keksii oman luokittelun ja perustelee sen' },
        { skill: 'Vaatesanaston kirjoittaminen', emerging: 'jäljentää vaatesanoja mallista', proficient: 'tavuttaa ja kirjoittaa neljä–viisi vaatesanaa sekä yhdyssanoja', advanced: 'kirjoittaa vaatesanoja lauseisiin ja laatii pukeutumisohjeen' },
      ],
    },
    'first-grade': {
      seoTitle: 'Vaatetehtävät 1. Luokalle — Sanasto ja Laskut | LCS',
      seoDescription: 'Tulostettavia vaatetehtäviä 1. luokalle (6–7v). Ratkaise vaatelaskuja, opettele vaatesanastoa ja täytä ristikköja. Ilmaisia työlehtiä.',
      seoKeywords: 'vaatetehtävät 1. luokalle, yhteenlasku vähennyslasku, näkösanat tunnistaminen, luetun ymmärtäminen, oikeinkirjoitus harjoitus, vaatesanasto, pukeutuminen, vuodenajat ja vaatteet, vaatetehtävät 1. luokka, vaatteiden oppiminen 6-7v',
      intro: 'Ensimm\u00e4isen luokan oppilaat ovat valmiita vaatety\u00f6lehtiin, jotka haastavat heit\u00e4 monimutkaisemmalla luokittelulla, monivaiheisilla laskuteht\u00e4vill\u00e4 ja kuvailevilla kirjoitusharjoituksilla. Kuusi- ja seitsem\u00e4nvuotiaat osaavat lajitella usean ominaisuuden perusteella sujuvasti, laskea yhteen ja v\u00e4hent\u00e4\u00e4 kahteenkymmeneen asti, lukea lyhyit\u00e4 tekstej\u00e4 ja ilmaista ajatuksiaan kirjallisesti. Vaateaiheiset matematiikkaty\u00f6lehdet esitt\u00e4v\u00e4t sanallisia teht\u00e4vi\u00e4 kuten: Emmalla on kaksitoista paitaa ja h\u00e4n antaa kolme siskolleen, montako h\u00e4nelle j\u00e4\u00e4, tai kaupassa on viisitoista hattua ja kahdeksan myyd\u00e4\u00e4n, montako j\u00e4\u00e4 hyllylle. N\u00e4m\u00e4 skenaariot kehitt\u00e4v\u00e4t sek\u00e4 laskusujuvuutta ett\u00e4 kyky\u00e4 tulkita sanallisia teht\u00e4vi\u00e4 asiayhteydess\u00e4\u00e4n. Kuviotyölehdet monimutkaistuvat, ja lapsilta pyydet\u00e4\u00e4n tunnistamaan ja luomaan kuvioita kolmella tai nelj\u00e4ll\u00e4 elementill\u00e4 yksinkertaisten AB-kuvioiden sijaan. Kokovertailuteht\u00e4v\u00e4t vaativat viiden tai useamman kappaleen j\u00e4rjest\u00e4mist\u00e4 sek\u00e4 vertailu- ja superlatiivimuotojen k\u00e4ytt\u00f6\u00e4: lyhyin, pitempi kuin, pisin kaikista. Lukuteht\u00e4v\u00e4t sis\u00e4lt\u00e4v\u00e4t lyhyit\u00e4 tekstej\u00e4 vaatteiden valmistuksesta, eri vuodenaikoihin pukeutumisesta tai vaatteiden historian muutoksista, sek\u00e4 ymm\u00e4rt\u00e4miskysymyksi\u00e4, jotka vaativat muistamista ja p\u00e4\u00e4ttely\u00e4. Kirjoitusteht\u00e4v\u00e4t pyyt\u00e4v\u00e4t lapsia kuvaamaan asun v\u00e4hint\u00e4\u00e4n viidell\u00e4 kuvailevalla sanalla tai selitt\u00e4m\u00e4\u00e4n vaatevalintansa tietylle s\u00e4\u00e4tilanteelle, kehitt\u00e4en t\u00e4sm\u00e4llist\u00e4 kuvailevaa kirjoittamista, jota ensimm\u00e4isen luokan tavoitteet painottavat. Piirustus- ja suunnitteluteht\u00e4v\u00e4t haastavat lapsia luomaan asuja m\u00e4\u00e4r\u00e4tyill\u00e4 kuvioss\u00e4\u00e4nn\u00f6ill\u00e4, osoittaen algebrallista ajattelua luovan ilmaisun kautta. Vaateteema pysyy kiinnostavana ensimm\u00e4isell\u00e4 luokalla, koska se liittyy lasten kasvavaan henkil\u00f6kohtaiseen identiteettiin ja itseilmaisuun, mik\u00e4 tekee jokaisesta ty\u00f6lehdest\u00e4 merkityksellisen.',
      objectives: [
        { skill: 'Yhteen- ja v\u00e4hennyslaskun sanallisten teht\u00e4vien ratkaiseminen kahteenkymmeneen asti vaateskenaarioilla', area: 'math' },
        { skill: 'Kuvailevien lauseiden kirjoittaminen vaatteista k\u00e4ytt\u00e4en t\u00e4sm\u00e4llisi\u00e4 adjektiiveja v\u00e4rille, koolle, kuviolle ja materiaalille', area: 'literacy' },
        { skill: 'Monimutkaisten kuvioiden luominen ja jatkaminen kolmella tai useammalla elementill\u00e4 vaatesuunnitelmissa', area: 'cognitive' },
      ],
      developmentalNotes: 'Ensimm\u00e4isen luokan oppilaat ovat kehitt\u00e4neet kest\u00e4v\u00e4n keskittymisen ja lukusujuvuuden, joiden avulla he voivat ty\u00f6skennell\u00e4 vaateaiheisten sanallisten teht\u00e4vien ja kuvailevien tekstien parissa itsen\u00e4isesti. Kasvava kyky k\u00e4ytt\u00e4\u00e4 vertailu- ja superlatiivimuotoja kuten suurempi, suurin ja pitempi, pisin mahdollistaa kehittyneemm\u00e4t kokovertailuteht\u00e4v\u00e4t, jotka rakentavat sek\u00e4 matemaattista p\u00e4\u00e4ttely\u00e4 ett\u00e4 t\u00e4sm\u00e4llisi\u00e4 viestint\u00e4taitoja.',
      teachingTips: [
        'Anna kuvaileva kirjoitusprojekti, jossa oppilaat piirt\u00e4v\u00e4t asun ja kirjoittavat v\u00e4hint\u00e4\u00e4n viisi lausetta siit\u00e4 k\u00e4ytt\u00e4en v\u00e4ri-, koko-, kuvio-, materiaali- ja vuodenaikasanastoa harjoitellakseen t\u00e4sm\u00e4llist\u00e4 ja yksityiskohtaista kuvailevaa kielt\u00e4.',
        'K\u00e4yt\u00e4 vaatteiden kuviotyölehti\u00e4 siltana kertolaskun esittelyyn kysym\u00e4ll\u00e4, montako raitaa yhteens\u00e4 on nelj\u00e4ss\u00e4 huivissa, jos jokaisessa on kolme raitaa.',
      ],
      faq: [
        { question: 'Miten vaatety\u00f6lehdet kehitt\u00e4v\u00e4t ensimm\u00e4isen luokan kirjoitustaitoja?', answer: 'Vaatteet tarjoavat rikkaan aiheen kuvailevalle kirjoittamiselle, koska vaatekappaleilla on monia havaittavia ominaisuuksia. Ensimm\u00e4isen luokan oppilaat harjoittelevat t\u00e4sm\u00e4llisten adjektiivien k\u00e4ytt\u00f6\u00e4 v\u00e4rille, koolle, kuviolle, materiaalille ja k\u00e4ytt\u00f6tarkoitukselle kuvaillessaan asuja. T\u00e4m\u00e4 moniominaisuuksinen kuvailu rakentaa yksityiskohtaista ja t\u00e4sm\u00e4llist\u00e4 kirjoittamista, jota ensimm\u00e4isen luokan \u00e4idinkielen tavoitteet edellyttävät.' },
        { question: 'Mik\u00e4 tekee vaatety\u00f6lehdist\u00e4 akateemisesti vaativia ensimm\u00e4iselle luokalle?', answer: 'Niihin sis\u00e4ltyy monivaiheisia sanallisia teht\u00e4vi\u00e4, monimutkaista kuvioiden luomista kolmella tai useammalla elementill\u00e4, monikriteerist\u00e4 lajittelua, vertailu- ja superlatiivimuotojen k\u00e4ytt\u00f6\u00e4 kokoj\u00e4rjestelyst\u00e4 sek\u00e4 luetun ymm\u00e4rt\u00e4mist\u00e4 tietoteksteist\u00e4. Teema pit\u00e4\u00e4 lapset sitoutuneina samalla kun akateeminen sis\u00e4lt\u00f6 vastaa luokkatason vaatimuksia.' },
        { question: 'Voivatko vaatety\u00f6lehdet esitell\u00e4 mittausk\u00e4sitteit\u00e4?', answer: 'Kyll\u00e4. Huivien pituuksien, saappaiden korkeuksien ja hattujen leveyksien vertailu esittelee eP\u00e4standardeja mittayksik\u00f6it\u00e4. Ensimm\u00e4isen luokan oppilaat voivat mitata vaatekappaleita paperiliittimill\u00e4 tai nappipaloilla ja kirjata tuloksensa, yhdist\u00e4en vaatelajittelutaidot mittaamisen ja tiedon k\u00e4sittelyn alueeseen.' },
      ],

      snippetAnswer: 'Vaateaiheiset työlehdet ensimmäiselle luokalle (6–7-vuotiaat) opettavat vuodenaikaan sopivaa pukeutumista ja materiaalitietoisuutta, vahvistavat luokittelu- ja laskutaitoja vaatekauppakontekstissa sekä kehittävät itsenäistä päätöksentekoa. POPS 2014:n arjen taitojen ja ympäristöopin tavoitteet toteutuvat.',
      uniqueGradeAngle: 'Ensimmäisellä luokalla vaateteema saa käytännöllisen ja tieteellisen ulottuvuuden, koska kuusi- ja seitsemänvuotiaat alkavat pukeutua itsenäisesti ja tehdä vaatevalintoja sIään ja tilanteen mukaan. POPS 2014:n ympäristöoppi edellyttää arjen taitojen kehittämistä ja ihmisen ja ympäristön vuorovaikutuksen ymmärtämistä. Ensimmäisen luokan oppilas ymmärtää, miksi talvella pukeudutaan kerrospukeutumisella ja miksi sadevaatteet ovat vedenpitIäviä — tämä on materiaalitieteen alkutaitoa. Matemaattisesti vaatekauppa tarjoaa autenttisen kontekstin: hintojen vertailu, alennusprosenttien esimuodot (puoli hintaa) ja kokolajittelu. Luokittelu syventyy, kun oppilas ryhmittelee vaatteita vuodenajan, materiaalin ja käyttötarkoituksen mukaan. Kirjoittaminen yhdistyy vaatekuvauksiin ja pukeutumisohjeisiin. Suomen neljä vuodenaikaa tekevät pukeutumisesta jatkuvasti ajankohtaisen aiheen.',
      developmentalMilestones: [
        { milestone: 'Vuodenaikaan sopiva pukeutuminen (6–7-vuotiaat valitsevat vaatteet sään mukaan itsenäisesti)', howWeAddress: 'Pukeutumisvalintatehtävät, joissa oppilas valitsee vaatteet säätiedotuksen perusteella ja perustelee valintansa, kehittävät päätöksentekoa' },
        { milestone: 'Materiaalitietoisuus (ensimmäisen luokan oppilaat ymmärtävät eri materiaalien ominaisuuksia)', howWeAddress: 'Materiaalitehtävät, joissa oppilas yhdistää materiaalin (villa, puuvilla, gore-tex) ominaisuuteen (lämmin, viileä, vedenpitIävä), rakentavat materiaalitieteen alkutaitoja' },
        { milestone: 'Laskutaidot vaatekauppakontekstissa (kuusi- ja seitsemänvuotiaat vertailevat hintoja)', howWeAddress: 'Vaatekauppatehtävät, joissa oppilas laskee ostoskorin hinnan, vertailee tuotteita ja ymmärtää puoli hintaa -käsitteen, yhdistävät laskutoimitukset arkeen' },
        { milestone: 'Luokittelu usealla perusteella (ensimmäisen luokan oppilaat ryhmittelevät vaatteita järjestelmällisesti)', howWeAddress: 'Luokittelutehtävät, joissa vaatteet ryhmitellään vuodenajan, materiaalin ja käyttötarkoituksen mukaan, kehittävät moniperusteista ajattelua' },
      ],
      differentiationNotes: 'Tukea tarvitseville ensimmäisen luokan oppilaille rajaa pukeutumisvalinnat kahteen vuodenaikaan (talvi ja kesä), anna laskutehtävissä pyIöristetyt kokonaishinnat ja käytä vaatekuvia luokittelun tueksi. Edistyneille ensimmäisen luokan oppilaille lisää kerrospukeutumisen suunnittelu, laajenna hintalaskut yksinkertaisiin alennuksiin ja haasta kirjoittamaan pukeutumisopas eri vuodenajoille.',
      parentTakeaway: 'Ensimmäisen luokan vaatetyIölehdet tekevät pukeutumisesta oppimistilanteen. Antakaa lapsen valita vaatteensa säätiedotuksen perusteella aamulla ja pohtikaa yhdessä: miksi tämä on hyvä valinta? Vaatekaupassa lapsi voi vertailla hintoja ja laskea ostoskorin hinnan. Tutkikaa yhdessä vaatteiden materiaalilappuja: mistä tämä on tehty, miksi se on lämmin? Tärkeintä on opettaa itsenäistä päätöksentekoa ja materiaalitietoisuutta.',
      classroomIntegration: 'Vaatetyyölehdet ovat ensimmäisen luokan arjen taitojen ja ympäristöopin risteyskohdassa: aamulla pohditaan päivän pukeutumista sään mukaan, työlehtihetkellä ratkaistaan luokittelu- ja laskutehtäviä, ja tutkimustuokiossa tutkitaan materiaalien ominaisuuksia kokeellisesti (kasteleeko villa, pitiIääkö gore-tex vettä). POPS 2014:n arjen taitojen ja tutkivan oppimisen tavoitteet yhdistyvät.',
      assessmentRubric: [
        { skill: 'Vuodenaikaan sopiva pukeutuminen', emerging: 'valitsee yhden sopivan vaatteen säähän aikuisen avustuksella', proficient: 'kokoaa kokonaisen asun sään mukaan ja perustelee valinnat', advanced: 'suunnittelee kerrospukeutumisen, valitsee materiaalit tarkoituksenmukaisesti ja perustelee monipuolisesti' },
        { skill: 'Materiaalitietoisuus', emerging: 'nimeää yhden materiaalin (villa) ja sen ominaisuuden (lämmin)', proficient: 'yhdistää kolme materiaalia ominaisuuksiinsa ja selittää käyttötarkoituksen', advanced: 'vertailee materiaaleja kokeellisesti, selittää miksi tietty materiaali sopii tiettyyn tarkoitukseen ja ehdottaa vaihtoehtoja' },
        { skill: 'Laskutaidot vaatekaupassa', emerging: 'laskee kahden tuotteen yhteishinnan konkreettisin välinein', proficient: 'laskee ostoskorin hinnan itsenäisesti ja ymmärtää puoli hintaa -käsitteen', advanced: 'vertailee tuotteita hintalaatusuhteen perusteella, laskee alennuksia ja perustelee ostopäätöksensä' },
      ],
    },
    'second-grade': {
      seoTitle: 'Vaatetehtävät 2. Luokalle — Materiaalit ja Muoti | LCS',
      seoDescription: 'Tulostettavia vaatetehtäviä 2. luokalle (7–8v). Tutki kangasmateriaaleja, analysoi muotitilastoja ja kirjoita vaatekuvauksia. Ilmaisia työlehtiä.',
      seoKeywords: 'vaatetehtävät 2. luokalle, kertotaulu harjoittelu, data-analyysi oppiminen, tietoteksti lukeminen, paikka-arvo ymmärtäminen, vaatesanasto, pukeutuminen, vuodenajat ja vaatteet, vaatetehtävät 2. luokka, vaatteiden oppiminen 7-8v',
      intro: 'Toisen luokan oppilaat tuovat moninumeroisen aritmetiikan, itsen\u00e4isen lukusujuvuuden ja kasvavan analyyttisen ajattelun vaateaiheisiin ty\u00f6lehtiin, mahdollistaen teht\u00e4v\u00e4t, jotka yhdist\u00e4v\u00e4t vaatevalinnat todellisen maailman matematiikkaan, tietoteksteihin tekstiileist\u00e4 ja j\u00e4senneltyyn kuvailevaan kirjoittamiseen. Seitsem\u00e4n- ja kahdeksanvuotiaat osaavat laskea yhteen ja v\u00e4hent\u00e4\u00e4 sataan asti, ty\u00f6skennell\u00e4 paikka-arvok\u00e4sitteiden kanssa ja kirjoittaa j\u00e4senneltyj\u00e4 kappaleita, mik\u00e4 tekee heist\u00e4 valmiita vaateteht\u00e4viin, jotka ulottuvat selke\u00e4sti yksinkertaisen lajittelun yliP\u00e4\u00e4lle. Matematiikkaty\u00f6lehdet esitt\u00e4v\u00e4t teht\u00e4vi\u00e4 kuten: koulupuku maksaa nelj\u00e4kymment\u00e4seitsen\u00e4n euroa ja talvitakki kuusikymment\u00e4kolme euroa, paljonko molemmat maksaisivat yhteens\u00e4, tai kaupassa on kahdeksankymment\u00e4viisi paitaa ja kolmekymment\u00e4yhdeks\u00e4n myyd\u00e4\u00e4n alennusmyynniss\u00e4, montako j\u00e4\u00e4 j\u00e4ljelle. Hintavertailuteht\u00e4v\u00e4t haastavat oppilaita selvitt\u00e4m\u00e4\u00e4n, mik\u00e4 kolmesta asukokonaisuudesta maksaa v\u00e4hiten, vaatien monivaiheista yhteenlaskua ja kaksinumeroisten summien vertailua. Mittaaminen tulee mukaan k\u00e4yt\u00e4nn\u00f6llisesti, kun oppilaat mittaavat hihan pituutta, kenk\u00e4kokoa tai huivin mittaa senttimetreiss\u00e4 viivaimella, yhdist\u00e4en vaatteet vakiomittayksik\u00f6iden taitoihin. Luettavat tekstit tutkivat eri kankaiden valmistusta, miksi jotkut materiaalit ovat vedenpitävi\u00e4 ja toiset heng\u00e4tt\u00e4vi\u00e4, tai miten pukeutumistyylit heijastavat kulttuuriperinteit\u00e4 ja ilmastoa, sek\u00e4 ymm\u00e4rt\u00e4miskysymyksi\u00e4, jotka vaativat p\u00e4\u00e4ajatuksen tunnistamista ja tukevien todisteiden paikantamista useista kappaleista. Kirjoitusteht\u00e4v\u00e4t pyyt\u00e4v\u00e4t oppilaita laatimaan mielipidekappaleen lempivaatetyypist\u00e4\u00e4n kolmella perustelulla tai tietokappaleen siit\u00e4, miten tietty kangas kuten puuvilla tai villa tuotetaan raaka-aineesta valmiiksi vaatteeksi. Kuvioiden luomisteht\u00e4v\u00e4t haastavat oppilaita suunnittelemaan kangaskuvioita m\u00e4\u00e4r\u00e4ttyjen matemaattisten s\u00e4\u00e4nt\u00f6jen mukaan nelj\u00e4ll\u00e4 tai useammalla elementill\u00e4 ja kuvaamaan s\u00e4\u00e4nn\u00f6n kirjallisesti.',
      objectives: [
        { skill: 'Kaksivaiheisten sanallisten teht\u00e4vien ratkaiseminen sataan asti vaatehinnoilla, m\u00e4\u00e4rill\u00e4 ja mittausvertailuilla', area: 'math' },
        { skill: 'Tietotekstien lukeminen tekstiileist\u00e4, kulttuurisesta pukeutumisesta ja kankaan valmistuksesta sek\u00e4 p\u00e4\u00e4ajatusten koostaminen', area: 'literacy' },
        { skill: 'J\u00e4senneltyjen mielipide- ja tietokappaleiden kirjoittaminen vaatteista k\u00e4ytt\u00e4en kuvailevaa sanastoa ja perusteluja', area: 'cognitive' },
      ],
      developmentalNotes: 'Toisen luokan oppilaat ovat kehitt\u00e4neet matemaattisen p\u00e4\u00e4ttelyn, jolla he voivat vertailla moninumeroisia hintoja ja laskea kokonaissummia usean kappaleen yli \u2013 taitoja, joita vaateostosskenaariot luontevasti harjoittavat. Luetun ymm\u00e4rt\u00e4minen tukee tietoteksteihin perehtymist\u00e4 vaatteiden valmistuksesta, ja kirjoittaminen on kypsyntynyt tasolle, jolla he voivat tuottaa j\u00e4senneltyj\u00e4 kappaleita aihelauseineen, tukevine yksityiskohtineen ja p\u00e4\u00e4t\u00f6slauseineen henkil\u00f6kohtaisesti merkityksellisist\u00e4 vaateaiheista.',
      teachingTips: [
        'Perusta luokkaan vaatekauppa hintalapuin varustettuine kuvavaatteineen ja anna oppilaille sadan euron budjetti. Haasta heid\u00e4t suunnittelemaan kokonainen asu budjetin puitteissa ja kirjaamaan yhteenlaskuty\u00f6ns\u00e4 ty\u00f6lehdelle.',
        'Pyyd\u00e4 oppilaita tutkimaan yht\u00e4 kangastyyppi\u00e4 ja kirjoittamaan tietokappale, jossa selitet\u00e4\u00e4n, mist\u00e4 se tulee, mik\u00e4 tekee siit\u00e4 erityisen ja mitk\u00e4 vaatteet siit\u00e4 yleisesti valmistetaan, yhdist\u00e4en luetun ymm\u00e4rt\u00e4misen j\u00e4senneltyyn kirjoittamiseen.',
      ],
      faq: [
        { question: 'Miten toisen luokan vaatety\u00f6lehdet kehitt\u00e4v\u00e4t rahamatematiikan taitoja?', answer: 'Ne esitt\u00e4v\u00e4t realistisia ostostilanteita, joissa oppilaiden on laskettava yhteen moninumeroisia hintoja, vertailtava eri asukokonaisuuksien kustannuksia, laskettava vaihtorahaa annetusta budjetista ja selvitett\u00e4v\u00e4, paljonko enemm\u00e4n yksi kappale maksaa kuin toinen. N\u00e4m\u00e4 teht\u00e4v\u00e4t k\u00e4ytt\u00e4v\u00e4t eurom\u00e4\u00e4ri\u00e4 ja vertailup\u00e4\u00e4ttely\u00e4, joita toisen luokan matematiikka painottaa, henkil\u00f6kohtaisesti kiinnostavassa yhteydess\u00e4.' },
        { question: 'Mitk\u00e4 mittaustaidot toisen luokan vaatety\u00f6lehdet rakentavat?', answer: 'Oppilaat mittaavat vaatekappaleita kuten huiveja, nauhoja ja kenk\u00e4pohjia viivaimen avulla senttimetreiss\u00e4. He vertailevat mittauksia kappaleiden v\u00e4lill\u00e4, kirjaavat tiedot taulukoihin ja vastaavat kysymyksiin siit\u00e4, mik\u00e4 kappale on pisin tai lyhyin. T\u00e4m\u00e4 k\u00e4yt\u00e4nn\u00f6n mittaaminen vakioyksik\u00f6ill\u00e4 vastaa suoraan toisen luokan mittaamisen ja tiedonk\u00e4sittelyn tavoitteita.' },
        { question: 'Miten vaatety\u00f6lehdet tukevat toisen luokan tietokirjoittamista?', answer: 'Ne tarjoavat kiinnostavia aiheita j\u00e4sennellyille kappaleille: miten puuvillasta tulee t-paita, miksi pukeuDumme eri tavoin eri ilmastoissa tai mik\u00e4 kangas sopii parhaiten sateeseen. Oppilaat harjoittelevat ajatusten j\u00e4sent\u00e4mist\u00e4 aihelausein ja tukevin tosiasioIn, rakentaen tietokirjoittamisen taitoja, joita toisen luokan tavoitteet edellyttävät.' },
      ],

      snippetAnswer: 'Vaateaiheiset työlehdet toiselle luokalle (7–8-vuotiaat) syventävät materiaalitieteen ymmärrystä kokeellisen tutkimuksen kautta, kehittävät kestävän muodin perusajattelua sekä vahvistavat budjetointitaitoja ja mielipidekirjoittamista. POPS 2014:n ympäristöopin ja arjen taitojen vuosiluokkien 1–2 päättötavoitteet toteutuvat.',
      uniqueGradeAngle: 'Toisella luokalla vaateteema muuttuu tutkimukselliseksi, koska seitsemän- ja kahdeksanvuotiaat kykenevät suunnittelemaan yksinkertaisia materiaalikokePita ja tekemIään perusteltuJa kulutusvalintoja. POPS 2014:n päättötavoitteet edellyttävät arjen taitojen hallintaa ja kestävän kehityksen ymmärrystä. Toisen luokan oppilas tutkii materiaaleja kokeellisesti: imeytIääkö puuvilla vettä, pitIääkö gore-tex vettä, lämmiittääkö villa? Kestävän muodin ajattelu kehittyy: oppilas pohtii vaatteiden elinkaarta, kierrätystä ja kulutusvalintojen ympäristövaikutuksia. Budjetointitaidot syventyvät: oppilas suunnittelee vaateostokset budjetin puitteissa ja vertailee vaihtoehtoja. Kertolaskun soveltaminen: 3 paitaa × 15 euroa = 45 euroa. Mielipidekirjoittaminen kehittyy, kun oppilas perustelee kestävän muodin tärkeyttä. Suomen vuodenaikojen vaihtelu tekee vaatevalinnoista jatkuvan oppimisaiheen.',
      developmentalMilestones: [
        { milestone: 'Materiaalien kokeellinen tutkiminen (7–8-vuotiaat testaavat materiaalien ominaisuuksia kokeellisesti)', howWeAddress: 'Materiaalikoetehtävät, joissa oppilas testaa eri kankaiden vedenpitIävyyttä, lämmöneristystä ja joustavuutta, kirjaa tulokset ja tekee johtopäätökset, kehittävät kokeellista ajattelua' },
        { milestone: 'Kestävän muodin perusajattelu (toisen luokan oppilaat pohtivat vaatteiden elinkaarta)', howWeAddress: 'Elinkaaristehtävät, joissa oppilas seuraa vaatteen matkaa raaka-aineesta kierrätykseen ja pohtii miten omilla valinnoilla voi vaikuttaa, kasvattavat kestävän kulutuksen ajattelua' },
        { milestone: 'Vaateostosbudjetti ja vertailu (seitsemän- ja kahdeksanvuotiaat laskevat ja vertailevat kustannuksia)', howWeAddress: 'Budjetointitehtävät, joissa oppilas suunnittelee vaateostokset annetulla budjetilla, vertailee tuotteita ja perustelee valinnat, yhdistävät kertolaskun ja päätöksenteon' },
        { milestone: 'Mielipidekirjoitus kestävästä muodista (toisen luokan oppilaat perustelevat näkemyksiään)', howWeAddress: 'Kirjoitustehtävät, joissa oppilas kirjoittaa perustellun mielipiteen kierrätyksestä tai kestävistä vaatevalinnoista, kehittävät argumentointitaitoja' },
      ],
      differentiationNotes: 'Tukea tarvitseville toisen luokan oppilaille rajaa materiaalikoe kahteen kankaaseen, anna budjetoinnissa pyöristetyt hinnat ja tarjoa mielipidekirjoituksessa lausepohjat. Edistyneille toisen luokan oppilaille laajenna materiaalikoe viidelle kankaalle vertailutaulukkoineen, lisää hiilijälki-käsite yksinkertaistettuna ja haasta kirjoittamaan kestävän muodin kampanjakirje.',
      parentTakeaway: 'Toisen luokan vaatetyIölehdet opettavat kestävää kuluttamista. Tehkää yhdessä materiaalikoe: kastakaa eri kankaita ja testatkaa vedenpitIävyys. Vaatekaupassa pohtikaa yhdessä: tarvitaanko tätä oikeasti, voiko vanhaa korjata, löytyisikö kirpputorilta? Tutkikaa vaatteiden alkuperIämerkintöjä: mistä tämä on tehty, missä valmistettu? Tärkeintä on opettaa harkitsevia kulutusvalintoja.',
      classroomIntegration: 'Vaatetyyölehdet ovat toisen luokan ympäristöopin ja arjen taitojen risteyskohdassa: materiaalikokeet integroituvat tutkivaan oppimiseen, kestävän muodin pohdinta ympäristökasvatukseen, budjetointi matematiikkaan ja mielipidekirjoitukset äidinkieleen. Luokan vaatevaihtopäivä tai korjauspaja konkretisoi oppimisen. POPS 2014:n vuosiluokkien 1–2 päättöarvioinnissa vaateteema osoittaa kestävän kehityksen ja arjen taitojen hallinnan.',
      assessmentRubric: [
        { skill: 'Materiaalien kokeellinen tutkiminen', emerging: 'testaa yhtä materiaalia aikuisen ohjein mutta ei kirjaa tuloksia', proficient: 'testaa kolmea materiaalia itsenäisesti, kirjaa tulokset taulukkoon ja tekee johtopäätökset', advanced: 'suunnittelee oman materiaalikokeen, testaa useita ominaisuuksia ja kirjoittaa tutkimusraportin' },
        { skill: 'Kestävän muodin ymmärrys', emerging: 'tietää että kierrätys on hyvä mutta ei selitIä miksi', proficient: 'selittää vaatteen elinkaaren ja ehdottaa kolme kestävää valintaa perusteluineen', advanced: 'analysoi kulutuksen ympäristövaikutuksia, vertailee vaihtoehtoja ja suunnittelee kestävän vaatekaappikampanjan' },
        { skill: 'Budjetointi ja mielipidekirjoitus', emerging: 'valitsee yhden tuotteen budjetista mutta ei vertaile', proficient: 'suunnittelee ostokset budjetin puitteissa ja kirjoittaa mielipiteen kahdella perustelulla', advanced: 'optimoi budjetin vertaillen tuotteita, kirjoittaa jäsennellyn mielipidekirjoituksen ja ehdottaa konkreettisia toimenpiteitä' },
      ],
    },
    'third-grade': {
      seoTitle: 'Vaatetehtävät 3. Luokalle — Tutkimus ja Suunnittelu | LCS',
      seoDescription: 'Tulostettavia vaatetehtäviä 3. luokalle (8–9v). Kirjoita muotitutkimuksia, suunnittele asuja ja ratkaise budjettipulmia. Ilmaisia työlehtiä.',
      seoKeywords: 'vaatetehtävät 3. luokalle, kertolasku jakolasku, tutkimusraportti kirjoittaminen, mielipidekirjoitus harjoitus, kriittinen ajattelu, vaatesanasto, pukeutuminen, vuodenajat ja vaatteet, vaatetehtävät 3. luokka, vaatteiden oppiminen 8-9v',
      intro: 'Kolmannen luokan oppilaat tuovat kertolaskusujuvuuden, pinta-alan ja piirin ymm\u00e4rt\u00e4misen sek\u00e4 vakuuttavan kirjoittamisen taidot vaateaiheisiin ty\u00f6lehtiin, jotka yhdist\u00e4v\u00e4t matematiikan tekstiilisuunnitteluun, kuluttajap\u00e4\u00e4t\u00f6ksiin ja ymp\u00e4rist\u00f6tietoisuuteen tavalla, joka resonoi kahdeksan- ja yhdeks\u00e4nvuotiaiden kasvavan henkil\u00f6kohtaisen tyylin ja sosiaalisen vastuuntunnon kanssa. T\u00e4m\u00e4n tason oppilaat osaavat kertoa ja jakaa sataan asti, laskea suorakaiteiden pinta-alan ja piirin sek\u00e4 kirjoittaa j\u00e4senneltyj\u00e4 usean kappaleen esseesseit\u00e4 todisteineen useista l\u00e4hteist\u00e4, mik\u00e4 tekee heist\u00e4 ihanteellisia ty\u00f6lehtiin, jotka tutkivat matematiikan, suunnittelun ja globaalin kaupank\u00e4ynnin kiehtovaa risteyskohtaa. Kertolasku ohjaa kangaslaskentateht\u00e4vi\u00e4: jos jokainen paita vaatii kaksi metriä kangasta ja valmistajan on tuotettava kolmekymment\u00e4kuusi paitaa, montako metri\u00e4 kangasta tarvitaan yhteens\u00e4, yhdist\u00e4en laskusujuvuuden todellisiin tuotantop\u00e4\u00e4t\u00f6ksiin. Pinta-alan ja piirin laskenta tulee merkitykselliseksi kuviosuunnittelun kautta, kun oppilaat m\u00e4\u00e4ritt\u00e4v\u00e4t, paljonko kangasta suorakaiteen muotoinen kaavakappale vaatii ja laskevat piirin saumavaroja varten. Jakolasku mallintaa resurssien tasajakoa tekstiiliyhteyksiss\u00e4, kuten seitsem\u00e4nkymmenenenkahden napin jakamista tasan kahdeksalle vaatekappaleelle. Luettavat tekstit ulottuvat kuidusta valmiiksi vaatteeksi, vaatteiden historiaan eri sivilisaatioissa sek\u00e4 pikamuodin ymp\u00e4rist\u00f6vaikutuksiin verrattuna kest\u00e4viin vaatevalintoihin. N\u00e4m\u00e4 vaativat tekstit edellyttävät, ett\u00e4 oppilaat seuraavat monivaiheisia tuotantoprosesseja, arvioivat kilpailevia n\u00e4k\u00f6kulmia ymp\u00e4rist\u00f6vastuusta ja yhdist\u00e4v\u00e4t tietoa useista l\u00e4hteist\u00e4 johdonmukaisiksi argumenteiksi. Vakuuttava kirjoittaminen saavuttaa uuden tason, kun oppilaat laativat usean kappaleen esseeit\u00e4 kest\u00e4vien vaatevalintojen puolesta, rakentaen argumenttinsa v\u00e4itelauseilla, todisteita esitt\u00e4vill\u00e4 kappaleilla ja toimintakehotuksen sis\u00e4lt\u00e4vill\u00e4 p\u00e4\u00e4t\u00f6slauseilla. Murtolukuk\u00e4sitteet nousevat esiin kuviomuokkausten, alennushintojen ja vaatebudjetin osien kautta. Geometrinen analyysi syvenee, kun oppilaat tunnistavat yhdensuuntaisia viivoja, suoria kulmia ja symmetrialinjoja vaatteiden kaavoissa, yhdist\u00e4en geometrian vaatteiden valmistuksen k\u00e4yt\u00e4nn\u00f6n taitoon.',
      objectives: [
        { skill: 'Kertolaskun ja pinta-alan laskennan k\u00e4ytt\u00f6 kangasmittaus- ja vaatetuotanto-ongelmien ratkaisemiseen', area: 'math' },
        { skill: 'Vakuuttavien esseiden kirjoittaminen vaatteiden kest\u00e4vyydest\u00e4 k\u00e4ytt\u00e4en todisteita useista tietol\u00e4hteist\u00e4', area: 'literacy' },
        { skill: 'Vaatetuotannon ymp\u00e4rist\u00f6vaikutusten analysointi yhdist\u00e4m\u00e4ll\u00e4 tietoa useista l\u00e4hteist\u00e4', area: 'cognitive' },
      ],
      developmentalNotes: 'Vaatteet yhdist\u00e4v\u00e4t kolmannen luokan oppilaiden henkil\u00f6kohtaiset tyylikiinnostukset matematiikkaan ja sosiaaliseen vastuuseen. Kasvava tietoisuus globaaleista j\u00e4rjestelmist\u00e4 tekee toimitusketjuk\u00e4sitteist\u00e4 saavutettavia, kun taas kertolasku ja pinta-alan laskenta tulevat merkityksellisiksi, kun niit\u00e4 sovelletaan todellisten vaatteiden suunnitteluun ja tuotantoon.',
      teachingTips: [
        'Suunnittele vaatetuotantoprojekti, jossa oppilaat laskevat usean vaatekappaleen kangastarpeen pinta-alan ja kertolaskun avulla, vertaavat kustannuksia eri toimittajilta monivaiheisilla laskutoimituksilla ja kirjoittavat tuotantosuunnitelman budjettiperusteluineen j\u00e4sennellyiss\u00e4 kappaleissa.',
        'Luo kest\u00e4v\u00e4n muodin tutkimusprojekti, jossa oppilaat tutkivat vaatetuotantoa useista l\u00e4hteist\u00e4, j\u00e4rjest\u00e4v\u00e4t ymp\u00e4rist\u00f6vaikutustiedot vertailutaulukoihin ja kirjoittavat vakuuttavan esseen kest\u00e4v\u00e4mpien k\u00e4yt\u00e4nt\u00f6jen puolesta numeerisine todisteineen.',
      ],
      faq: [
        { question: 'Miten kolmannen luokan vaatety\u00f6lehdet kehitt\u00e4v\u00e4t pinta-alan ja piirin taitoja?', answer: 'Oppilaat laskevat suorakaiteen muotoisten kangaskappaleiden pinta-alan, m\u00e4\u00e4ritt\u00e4v\u00e4t piirin mitat saumavaroja ja reunanauhaostoksia varten, k\u00e4ytt\u00e4v\u00e4t kertolaskua usean kappaleen kangastarpeen selvitt\u00e4miseen ja vertaavat kaavojen kokoja. N\u00e4m\u00e4 k\u00e4yt\u00e4nn\u00f6n suunnitteluyhteydet tekev\u00e4t geometrisesta mittauksesta merkityksellist\u00e4 ja kiinnostavaa.' },
        { question: 'Mitk\u00e4 vakuuttavan kirjoittamisen taidot vaatety\u00f6lehdet rakentavat kolmannella luokalla?', answer: 'Oppilaat laativat usean kappaleen esseeit\u00e4 vaatteiden kest\u00e4vyydest\u00e4 selkein v\u00e4itelausein, tukevat argumenttejaan ymp\u00e4rist\u00f6tiedoilla ja tuotantotilastoilla useista l\u00e4hteist\u00e4, k\u00e4sittelev\u00e4t vasta-argumentteja ja kirjoittavat johtop\u00e4\u00e4t\u00f6ksi\u00e4, jotka ehdottavat konkreettisia toimia. Ymp\u00e4rist\u00f6aiheiden todellinen merkitys motivoi aitoa vakuuttavaa kirjoittamista.' },
        { question: 'Miten vaatety\u00f6lehdet kehitt\u00e4v\u00e4t todellisen maailman matemaattista p\u00e4\u00e4ttely\u00e4?', answer: 'Oppilaat k\u00e4ytt\u00e4v\u00e4t kertolaskua tuotantom\u00e4\u00e4rien ja kustannusten laskemiseen, soveltavat pinta-alan kaavoja kangasleikkausongelmiin, vertaavat hintoja eri toimittajilta monivaiheisilla laskutoimituksilla ja analysoivat valmistuksen ymp\u00e4rist\u00f6kustannuksia tietojen avulla. N\u00e4m\u00e4 teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t kuluttajamatematiikkaa ja talouslukutaitoa aritmeettisten ydintaitojen rinnalla.' },
      ],

      snippetAnswer: 'Vaateaiheiset työlehdet kolmannelle luokalle (8–9-vuotiaat) kehittävät tekstiilitieteen perusymmärrystä materiaalien ominaisuuksien tutkimisen kautta, vahvistavat kuluttajatietoisuutta ja budjettilaskentaa kerto- ja jakolaskulla sekä opettavat tuotantoketjun analysointia ja argumentoivaa kirjoittamista kestävästä kuluttamisesta. POPS 2014:n vuosiluokkien 3–6 tavoitteet käynnistyvät.',
      uniqueGradeAngle: 'Kolmannella luokalla vaateteema kehittyy nimeämisestä materiaalitieteen ja kuluttajatietoisuuden tasolle, kun kahdeksan- ja yhdeksänvuotiaat kykenevät ymmärtämään tuotantoketjuja ja tekemIään tietoisia valintoja. Tekstiilimateriaalien tutkiminen (puuvilla, villa, synteettinen) kehittää luokittelutaitoja ja tieteellistä ymmärrystä: miksi villa lämmittää, miksi tuulitakki on vesitiivis. Kertolaskusujuvuus mahdollistaa vaatebudjetoinnin: talvitakki 50 euroa, kengät 30 euroa, hansikkaat 8 euroa × 2 = 16 euroa. Tuotantoketjun analysointi kuidusta kauppaan avaa globaalin näkökulman: mistä puuvilla tulee, kuka ompelee vaatteet. Argumentoiva kirjoittaminen kestävästä kuluttamisesta (kierrätys, pikamuoti vs. kestävä muoti) vaatii näyttöön perustuvaa päättelyä. Suomen sääolosuhteet vaativat erityistä vaatesuunnittelua, mikä tarjoaa paikallisen kontekstin.',
      developmentalMilestones: [
        { milestone: 'Tekstiilimateriaalien tieteellinen tutkiminen (8–9-vuotiaat tutkivat materiaalien ominaisuuksia)', howWeAddress: 'Materiaalitutkimustehtävät, joissa oppilas testaa eri kankaiden ominaisuuksia (vedenpitIävyys, lämmittIävyys, joustavuus) kokeellisesti ja raportoi tulokset' },
        { milestone: 'Vaatebudjetoinnin hallitseminen kerto- ja jakolaskulla (kolmannen luokan oppilaat laskevat kustannuksia)', howWeAddress: 'Budjettilaskutehtävät, joissa oppilas suunnittelee vuodenajan vaateet budjetilla, laskee kokonaiskustannukset kertolaskulla ja vertailee vaihtoehtoja' },
        { milestone: 'Vaatetuotantoketjun analysointi kuidusta kauppaan (kahdeksan- ja yhdeksänvuotiaat hahmottavat globaaleja ketjuja)', howWeAddress: 'Tuotantoketjuanalyysit, joissa oppilas seuraa vaatteen matkaa raaka-aineesta valmiiksi tuotteeksi, tunnistaa välivaiheet ja kirjoittaa prosessikuvauksen' },
        { milestone: 'Argumentoiva kirjoittaminen kestävästä kuluttamisesta (kolmannen luokan oppilaat perustelevat valintoja)', howWeAddress: 'Kestävän muodin väittelykirjoitukset, joissa oppilas tutkii pikamuodin ja kestävän muodin eroja, kerää näyttöä ja kirjoittaa perustellun mielipidekirjoituksen' },
      ],
      differentiationNotes: 'Tukea tarvitseville kolmannen luokan oppilaille rajaa materiaalit kolmeen perustyyppiin, anna budjetointiin pienet luvut ja tarjoa tuotantoketjuun kuvallinen tuki. Edistyneille kolmannen luokan oppilaille laajenna analyysi globaaliin muotiteollisuuteen, lisää ympäristövaikutusten laskentaa ja haasta suunnittelemaan kestävän vaatemalliston laskelmIneen ja perusteluineen.',
      parentTakeaway: 'Kolmannen luokan vaatetyölehdet kehittävät kuluttajatietoisuutta ja tieteellistä ajattelua. Tutkikaa yhdessä vaatteiden materiaalilappuja: mistä vaate on tehty? Laskekaa kertolaskulla vuoden vaatekulut. Keskustelkaa: miksi joku vaate on kallis, toinen halpa? Pohtikaa kierrätystä: miten vaatteet saavat uuden elämän? Tärkeintä on oppia tekemään tietoisia kuluttajavalintoja.',
      classroomIntegration: 'Vaatetyölehdet yhdistävät kolmannen luokan ympäristöopin, matematiikan, käsitöiden ja äidinkielen: materiaalitutkimus tieteellisenä kokeena, vaatebudjetointi kertolaskuharjoituksena, tuotantoketjuanalyysi järjestelmäajatteluna ja kestävän kuluttamisen argumentointi mielipidekirjoituksena. POPS 2014:n vuosiluokkien 3–6 kestävän kehityksen ja arjen hallinnan tavoitteet toteutuvat.',
      assessmentRubric: [
        { skill: 'Tekstiilimateriaalien tutkiminen', emerging: 'tunnistaa joitakin materiaaleja mutta ei testaa ominaisuuksia', proficient: 'testaa materiaalien ominaisuuksia kokeellisesti ja raportoi tulokset järjestelmällisesti', advanced: 'vertailee materiaaleja monipuolisesti, selittää ominaisuuksien tieteellisen perustan ja ehdottaa käyttökohteita' },
        { skill: 'Vaatebudjetointi kertolaskulla', emerging: 'laskee yksittäisiä hintoja mutta ei suunnittele budjettia', proficient: 'suunnittelee vuodenajan vaatteet budjetilla ja laskee kokonaiskustannukset kertolaskulla', advanced: 'optimoi budjettia vertailemalla vaihtoehtoja, huomioi kestävyyden ja esittää perustellun suunnitelman' },
        { skill: 'Kestävän kuluttamisen argumentointi', emerging: 'tietää että kierrätys on hyvä mutta ei perustele syvemmin', proficient: 'vertailee pikamuotia ja kestävää muotia näytöllä ja kirjoittaa perustellun mielipidekirjoituksen', advanced: 'analysoi muotiteollisuuden ympäristö- ja sosiaalisia vaikutuksia monipuolisesti ja ehdottaa konkreettisia toimintastrategioita' },
      ],
    },
  },

  // -- FAQ --
  faq: [
    { question: 'Millaisia vaatety\u00f6lehti\u00e4 voin luoda?', answer: 'Voit luoda laajan valikoiman vaateaiheisia ty\u00f6lehti\u00e4, mukaan lukien vuodenaikojen asulajittelu, kokovertailu vaatekappaleilla, kuviotunnistus kuvitetuilla kankailla, sukkien ja kenkien paritysyhdist\u00e4minen, asujen ja muotisuunnitelmien v\u00e4rityssivut, vaatesanaston sanahaut, nappien ja asusteiden yhteenlaskuteht\u00e4v\u00e4t, varjoyhdist\u00e4minen vaatesilhueteilla sek\u00e4 luovat piirtämisteht\u00e4v\u00e4t, joissa lapset suunnittelevat omia asujaan.' },
    { question: 'Ovatko vaatety\u00f6lehdet ilmaisia?', answer: 'Kyll\u00e4, LessonCraftStudiolla voit luoda ja ladata vaateaiheisia ty\u00f6lehti\u00e4 maksutta. Valitse haluamasi ty\u00f6lehtityyppi, valitse vaateteema, muokkaa asetuksia kuten vaikeustasoa ja kappaleiden m\u00e4\u00e4r\u00e4\u00e4 ja luo tulostettava PDF luokkahuoneeseen tai kotiopetukseen.' },
    { question: 'Mille ik\u00e4ryhmille vaatety\u00f6lehdet sopivat?', answer: 'Vaatety\u00f6lehdet on suunniteltu 3\u20139-vuotiaille lapsille esikoulusta kolmannelle luokalle. Nuoremmat lapset ty\u00f6skentelev\u00e4t yksinkertaisen yhdist\u00e4misen, yhden ominaisuuden lajittelun ja v\u00e4ritt\u00e4misen parissa, kun taas vanhemmat oppilaat ratkaisevat moniominaisuuksista luokittelua, sanallisia teht\u00e4vi\u00e4, kuvioiden luomista ja kuvailevaa kirjoittamista.' },
    { question: 'Miten vaatety\u00f6lehdet opettavat lajittelua ja luokittelua?', answer: 'Vaatteet soveltuvat luontevasti moniominaisuuksiseen lajitteluun, koska jokaisella vaatekappaleella on v\u00e4ri, koko, tyyppi, vuodenaika ja materiaali. Ty\u00f6lehdet pyyt\u00e4v\u00e4t lapsia lajittelemaan ensin yhden ominaisuuden mukaan ja asteittain esittelev\u00e4t monikriteerist\u00e4 lajittelua, rakentaen joustavaa luokitteluajattelua, joka on matemaattisen luokittelun ja tieteellisen taksonomian perusta.' },
    { question: 'Voivatko vaatety\u00f6lehdet auttaa opettamaan vuodenajoista ja s\u00e4\u00e4st\u00e4?', answer: 'Ehdottomasti. Vuodenajoittainen pukeutuminen on yksi intuitiivisimmista tavoista opettaa s\u00e4\u00e4- ja vuodenaikak\u00e4sitteit\u00e4 pienille lapsille. Ty\u00f6lehdet, joissa lapset lajittelevat uimapukuja kes\u00e4\u00e4n ja lapasia talveen tai valitsevat sopivia asuja sateisiin ja aurinkoisiin p\u00e4iviin, rakentavat p\u00e4\u00e4ttely\u00e4 s\u00e4\u00e4olosuhteiden ja tarkoituksenmukaisten valintojen v\u00e4lisest\u00e4 suhteesta.' },
    { question: 'Miten vaatety\u00f6lehdet kehitt\u00e4v\u00e4t kuvioiden tunnistamista?', answer: 'Vaatekankaissa ja -suunnitelmissa on t\u00e4ynn\u00e4 toistuvia kuvioita: raitoja, pilkkuja, ruutuja ja v\u00e4risarjoja. Ty\u00f6lehdet, joissa lapsia pyydet\u00e4\u00e4n tunnistamaan, jatkamaan ja luomaan kuvioita kuvitetuissa vaatekappaleissa, rakentavat algebrallista ajattelua, jota varhaisen matematiikan opetussuunnitelma painottaa, yhdist\u00e4en visuaalisen luovuuden matemaattiseen p\u00e4\u00e4ttelyyn.' },
    { question: 'Mit\u00e4 sanastoa lapset oppivat vaatety\u00f6lehdilt\u00e4?', answer: 'Lapset oppivat vaatekappaleiden nimi\u00e4 kuten paita, housut, mekko ja takki sek\u00e4 kuvailevia termej\u00e4 kuten raidallinen, villainen, vedenpitävä ja lyhythihainen. He oppivat my\u00f6s luokkasanoja kuten asusteet, p\u00e4\u00e4llysvaatteet ja jalkineet sek\u00e4 materiaalitermej\u00e4 kuten puuvilla, villa ja polyesteri. T\u00e4m\u00e4 rikas sanasto tukee sek\u00e4 lukemista ett\u00e4 t\u00e4sm\u00e4llist\u00e4 kuvailevaa kirjoittamista.' },
    { question: 'Miten vaatety\u00f6lehdet tukevat hienomotoriikan kehityst\u00e4?', answer: 'Yksityiskohtaisten vaatekuvitusten v\u00e4ritt\u00e4minen kehitt\u00e4\u00e4 k\u00e4den hallintaa ja kyn\u00e4otetta. Asusuunnitelmien piirt\u00e4minen kehitt\u00e4\u00e4 luovia motorisia taitoja. Paperivaatteiden leikkaaminen lajitteluteht\u00e4viin vahvistaa saksien k\u00e4ytt\u00f6\u00e4. Vaatesanojen j\u00e4ljent\u00e4minen kehitt\u00e4\u00e4 kirjainten muodostamista. N\u00e4m\u00e4 monipuoliset motoriset teht\u00e4v\u00e4t varmistavat, ett\u00e4 lapset kehitt\u00e4v\u00e4t laajan valikoiman hienomotorisia taitoja kiinnostavien teht\u00e4vien kautta.' },
    { question: 'Sopivatko vaatety\u00f6lehdet kotiopetusperheille?', answer: 'Vaatety\u00f6lehdet ovat ihanteellisia kotiopetukseen, koska ne yhdistyv\u00e4t v\u00e4litt\u00f6m\u00e4sti p\u00e4ivitt\u00e4isiin rutiineihin. Joka-aamuinen pukeutumishetki muuttuu oppimisen jatkeeksi, pyykinlajittelu matematiikkateht\u00e4v\u00e4ksi ja ostosretket sanaston oppimishetkiksi. T\u00e4m\u00e4 saumaton paperiopetuksen ja arjen yhdist\u00e4minen on tehokkaan kotiopetuksen tunnusmerkki.' },
    { question: 'Kuinka usein lasten tulisi tehd\u00e4 vaatety\u00f6lehti\u00e4?', answer: 'Kaksi\u2013nelj\u00e4 kertaa viikossa toimii hyvin. Jokaisen kerran tulisi kest\u00e4\u00e4 kymmenest\u00e4 kahteenkymmeneen minuuttiin i\u00e4st\u00e4 riippuen. Syvemm\u00e4lle teemajaksolla omista yhden viikon vaatety\u00f6lehdille, kierr\u00e4tt\u00e4en lajittelun, matematiikan, kuvioiden, lukutaidon ja v\u00e4ritt\u00e4misen tyyppej\u00e4 p\u00e4ivitt\u00e4in usean taidon kattamiseksi samalla yll\u00e4pit\u00e4en kiinnostavaa vaateyhteytt\u00e4 l\u00e4pi koko jakson.' },
  ],

  // -- Cross-linking --
  relatedThemes: ['body', 'seasons', 'colors', 'household', 'weather', 'toys'],
  relatedBlogCategories: [],

  // -- SEO Enrichment (Part 180) --

  classroomScenarios: [
    {
      situation: 'Esiopetuksen opettaja huomaa, että lapset eivät osaa valita säänmukaisia vaatteita itsenäisesti ja sekoittavat talvi- ja kesävaatteita.',
      solution: 'Hän ottaa käyttöön vuodenaikojen vaatelajittelutehtävät, joissa lapset lajittelevat kuvitettuja vaatekappaleita neljjään vuodenaika-lokeroon. Joka aamu luokassa keskustellaan päivän säästä ja sopivista vaatteista.',
      outcome: 'Kahden viikon kuluttua lapset aloittavat itsenäisesti sääkeskustelun aamupiirissä. Vanhemmat raportoivat lasten valitsevan vaatteensa järkevämmin kotona ja selittävän valintojaan säällä.',
    },
    {
      situation: 'Kotikoululaisen vanhempi haluaa opettaa ekaluokkalaiselle kuvioiden tunnistamista, mutta abstraktit kuviosarjat eivät kiinnosta lasta.',
      solution: 'Vanhempi käyttää vaateaiheisia kuviotyölehtiä, joissa raidalliset, pilkulliset ja ruudulliset kankaat muodostavat toistuvia sarjoja. Lapsi tunnistaa kuviot ja suunnittelee sitten oman kangaskuvion.',
      outcome: 'Lapsi oivaltaa kuvioiden logiikan vaatteiden kautta ja siirtää taidon muihin yhteyksiin. Hän alkaa huomata kuvioita arjessa spontaanisti: sohvatyynyissä, tapeteissa ja lattialaatoissa.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ikähaarukka', value: '3–9 vuotta' },
    { label: 'Työlehtisovellusten määrä', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus–3. lk' },
    { label: 'Keskimääräinen työskentelyaika', value: '10–20 min' },
    { label: 'Vaatekategorioiden kirjo', value: '15+ tyyppiä' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota väritystehtäviä ja kuviotunnistusta, joissa vaatekankaiden visuaaliset kuviot ovat keskiössä. Värikoodattu lajittelu ja asukokonaisuuksien suunnittelu tukevat visuaalista hahmotusta.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Käytä oikeita vaatekappaleita työlehtien rinnalla: lapsi lajittelee fyysisiä sukkia, lapasia ja hattuja ennen paperitehtävää. Leikkaa ja liimaa -tehtävät vaatesilhueteilla tukevat konkreettista oppimista.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Vaatteet ovat universaali aihe — jokainen lapsi tuntee peruskappeleet. Aloita kuvapohjaisista lajittelutehtävistä ja lisää suomenkielisiä vaatesanoja asteittain. Kaksikieliset vaatekortit auttavat yhdistämään kotikielen sanastoon.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta suunnittelu- ja laskutehtävillä: laske kangasmenekki, vertaa hintoja ja kirjoita kuvaileva teksti asukokonaisuudesta. Materiaalien ominaisuuksien vertailu lisää tieteellistä ulottuvuutta.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolioarviointi',
      criteria: 'Kerää vaateaiheisia työlehtiä lukukauden ajalta. Vertaa lajittelun tarkkuutta, vaatesanaston laajuutta ja kuvailutaitojen kehittymistä yksinkertaisista adjektiiveista moniominaisuuksiseen kuvailuun.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Lajitteluhaaste',
      criteria: 'Anna oppilaalle vaatekuvakokoelma ja pyydä lajittelemaan se kolmella eri tavalla: värin, vuodenajan ja tyypin mukaan. Arvioi luokittelun oikeellisuutta, joustavuutta ja sääntöjen selittämistä.',
      gradeLevel: 'Esiopetus–2. lk',
    },
    {
      method: 'Kuvaileva kirjoitustehtävä',
      criteria: 'Pyydä oppilasta kirjoittamaan asukokonaisuuden kuvaus vähintään viidellä kuvailevalla sanalla. Arvioi adjektiivien monipuolisuutta, tarkkuutta ja lauserakennetta.',
      gradeLevel: '1.–3. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ympäristöoppi (sää ja vuodenajat)',
      connection: 'Vaatelajittelu yhdistää pukeutumisen säähän ja vuodenaikoihin, mikä kytkeytyy POPS 2014:n ympäristöopin tavoitteisiin luonnon ilmiöiden havainnoinnista ja arjen päätöksenteosta.',
      activity: 'Lajittelutehtävän jälkeen oppilaat pitävät viikon ajan sääpäiväkirjaa, johon merkitsevät päivän sään ja käytetyt vaatteet.',
    },
    {
      subject: 'Matematiikka',
      connection: 'Vaatteita laskemalla, parittamalla ja vertailemalla harjoitellaan laskemista, kuvioiden tunnistamista ja mittaamista. Sukkien parittaminen opettaa parillisia lukuja.',
      activity: 'Sukkaparitehtävän jälkeen oppilaat laskevat parit ja yksittäiset sukat, kertovat parien määrän kahdella ja vertaavat lukuja.',
    },
    {
      subject: 'Äidinkieli ja kirjallisuus',
      connection: 'Vaatesanasto kehittää kuvailevaa kieltä: väri-, koko-, materiaali- ja kuvioadjektiivit rakentavat täsmällistä ilmaisutaitoa, jota tarvitaan sekä kirjoittamisessa että tieteellisessä havainnoinnissa.',
      activity: 'Sanahakutehtävän jälkeen oppilaat kirjoittavat lyhyen kuvauksen lempiasustaan käyttäen vähintään neljää kuvailevaa sanaa.',
    },
  ],

  uniqueAngle: 'Vaateaiheiset työlehdet hyödyntävät teemaa, johon jokainen lapsi herää joka aamu: pukeutumista. Tämä päivittäinen yhteys tekee vaateteemasta pedagogisesti poikkeuksellisen tehokkaan, koska oppiminen siirtyy välittömästi luokkahuoneesta kotiin ja arjen rutiineihin. Vaatteet tarjoavat luontevimman kontekstin moniominaisuuksiselle luokittelulle, koska jokainen vaatekappale voidaan luokitella samanaikaisesti värin, koon, tyypin, materiaalin ja vuodenajan perusteella. Tämä joustava luokittelu kehittää kognitiivista joustavuutta, joka on matemaattisen, tieteellisen ja kielellisen ajattelun perusta. Suomalaisessa kontekstissa vaatteiden merkitys korostuu neljän selvästi toisistaan eroavan vuodenajan myötä: Suomessa lapsen on ymmärrettävä syvjällisesti sään ja vaatteiden yhteys, koska pukeutumiserot talven pakkasissa ja kesän helteissä ovat dramaattisia. POPS 2014:n arjen taitojen ja itsenäistymisen tavoitteet toteutuvat luontevasti, kun lapsi harjoittelee vaatevalintoja paperilla ennen käytännön soveltamista. Kuviotunnistus kangasten kautta yhdistää algebrallisen ajattelun luovaan suunnitteluun tavalla, joka motivoi lapsia, joille abstraktit kuviosarjat eivät innosta.',

  researchCitation: 'Siegler, R.S. & Ramani, G.B. (2009). Playing Linear Number Board Games Promotes Low-Income Children’s Numerical Development. Developmental Science, 12(5), 655–661. Tutkimus osoitti, että tuttuihin esineisiin kuten vaatteisiin kytketty laskeminen ja lajittelu parantavat numeerista ymmärrystä tehokkaasti, koska kontekstuaalinen oppiminen luo vahvempia muistijjälkiä.',

  culturalNotes: 'Suomen neljä selvästi toisistaan eroavaa vuodenaikaa tekevät pukeutumisesta kriittisen arjen taidon. POPS 2014:n laaja-alainen osaaminen L3 (itsestä huolehtiminen ja arjen taidot) sisältää itsenäisen pukeutumisen harjoittelun. Suomalaisessa päiväkotikulttuurissa ulkoilu säällä kuin säällä on perusperiaate, mikä tekee säänmukaisen pukeutumisen ymmärtämisestä käytännön välttämättömyydeksi.',

  snippetDefinition: 'Vaateaiheiset työlehdet lapsille ovat tulostettavia oppimistehtäviä, jotka käyttävät tuttuja vaatekappaleita — paitoja, housuja, kenkiä ja hattuja — lajittelun, laskemisen, kuviotunnistuksen ja sanaston opettamiseen. Ne on suunniteltu 3–9-vuotiaille ja sisältävät vuodenaikojen lajittelua, kokovertailuja, väritystehtäviä ja sanahakuja.',

  snippetHowTo: [
    'Valitse viikolle vaateteeman alateema, kuten talvivaatteet, kangaskuviot tai kokovertailu, jotta oppitunneilla on yhtenäinen fokus.',
    'Valitse kaksi tai kolme työlehtityyppiä eri taitoalueille — esimerkiksi lajittelutehtävä luokitteluun, sanahaku sanastoon ja väritystehtävä hienomotoriikkaan.',
    'Aloita keskustelemalla päivän säästä ja kysymällä lapsilta, miksi he valitsivat päivän vaatteensa.',
    'Jaa työlehdet vaikeustason mukaan: aloita yksinkertaisesta lajittelusta ennen moniominaisuuksista luokittelua.',
    'Kierrä lasten joukossa ja esitä avoimia kysymyksiä kuten Miksi et pueta sandaaleja talvella tai Minkä kuvion näet tässä kankaassa.',
    'Yhdistä työlehti käytännön harjoitukseen: lajitelkaa yhdessä puhtaita pyykkejä värin tai koon mukaan.',
    'Kerää valmiit työlehdet portfoliokansioon ja seuratkaa lajittelutaitojen kehittymistä.',
  ],

  limitations: 'Vaatetyölehdet voivat tahattomasti korostaa materiaalisiin eroihin liittyviä teemoja, jos tehtävissä vertaillaan kalliiden ja halpojen vaatteiden ominaisuuksia. Opettajien tulee painottaa vaatteiden käytännöllisyyttä statuksen sijaan. Sukupuolittuneet vaatestereotypiat ovat riski: tehtävissä tulisi välttää tiukkoja pojat-tytöt-jaotteluja ja esitellä monipuolisia pukeutumistyylejä. Kulttuuriset erot pukeutumisessa tulee käsitellä kunnioittavasti.',

  themeComparisons: [
    {
      vsThemeId: 'body',
      summary: 'Kehotyölehdet tutkivat ihmisen anatomiaa ja toimintaa. Vaatetyölehdet käsittelevät sitä, miten pukeudumme ja suojaamme kehoamme, tarjoten arjen taitojen ja luokittelun näkökulman.',
    },
    {
      vsThemeId: 'seasons',
      summary: 'Vuodenaikatyölehdet tutkivat luonnon muutoksia laajasti. Vaatetyölehdet keskittyvät siihen, miten vuodenajat vaikuttavat pukeutumiseen, tarjoten konkreettisen ja henkilökohtaisen yhteyden sääilmiöihin.',
    },
    {
      vsThemeId: 'colors',
      summary: 'Värityölehdet opettavat värien tunnistamista ja nimeämistä. Vaatetyölehdet käyttävät värejä yhtenä lajitteluperusteena usean joukossa, syventäen luokitteluajattelua monimutkaistamalla tehtävää.',
    },
    {
      vsThemeId: 'weather',
      summary: 'Säätyölehdet tutkivat sääilmiöitä tieteellisesti. Vaatetyölehdet yhdistävät säätiedon käytännön päätöksentekoon: mitä puetaan päälle, kun sataa tai paistaa.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'vaateaiheiset väritystehtävät',
      context: 'Vaateaiheiset väritystehtävät kehittävät hienomotoriikkaa ja luovaa ilmaisua, kun lapset värittävät asuja, kenkiä ja asusteita omilla värivalinnoillaan.',
    },
    {
      appId: 'matching-app',
      anchorText: 'vaatteiden yhdistämistehtävät',
      context: 'Yhdistämistehtävät vaatesilhueteilla ja -pareilla kehittävät visuaalista erottelukykyä ja loogista päättelyä tutun vaatekontekstin kautta.',
    },
    {
      appId: 'word-search',
      anchorText: 'vaatesanaston sanahaku-työlehdet',
      context: 'Vaatesanaston oppiminen onnistuu sanahakutehtävissä, joissa lapset etsivät vaatekappaleiden, materiaalien ja kuvioiden nimiä sanaruudukosta.',
    },
    {
      appId: 'shadow-match',
      anchorText: 'vaatteiden varjoyhdistämistehtävät',
      context: 'Vaatteiden varjoyhdistämistehtävät vahvistavat muotojen tunnistamista, kun lapset yhdistävät saappaiden, hattujen ja takkien silhuetit oikeisiin kuviin.',
    },
  ],

  expertTips: [
    {
      tip: 'Käytä oikeaa pyykkikoria lajittelupäivänä: oppilaat lajittelevat fyysisiä vaatekappaleita ennen paperitehtävää, jolloin konkreettinen kokemus ankkuroi abstraktin luokittelun.',
      source: 'Erityisopettaja, toiminnallinen oppiminen',
      gradeRange: 'Esiopetus–1. lk',
    },
    {
      tip: 'Yhdistä vaatetyölehdet säähavaintopäiväkirjaan: lapset tarkkailevat säätä ja vertaavat omia vaatevalintojaan työlehtien lajitteluperiaatteisiin. Tämä rakentaa pidemmän ajan datankeruun taitoja.',
      source: 'Luokanopettaja, ilmiöpohjainen oppiminen',
      gradeRange: '1.–2. lk',
    },
    {
      tip: 'Haasta kolmasluokkalaiset laskemaan kangasmenekin yksinkertaiselle vaatekappaleelle. Pinta-alan kaava tulee merkitykselliseksi, kun se yhdistyy todelliseen suunnitteluongelmaan.',
      source: 'Matematiikan aineenopettaja, käytännön sovellukset',
      gradeRange: '3. lk',
    },
  ],
};

registerThemeContent('clothing', 'fi', content);
