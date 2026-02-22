import { registerThemeContent } from '../registry';
import type { EnrichedThemeContent } from '../types';

const content: EnrichedThemeContent = {
  // -- SEO fields --
  name: 'Tunteet',
  title: 'Tunneteht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille | LessonCraftStudio',
  description: 'Tutustu tunneteht\u00e4viin lapsille: tunteiden tunnistaminen, ilmeet, empatia ja itses\u00e4\u00e4tely. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle.',
  keywords: 'tunnetehtävät lapsille, tunnekasvatus oppimateriaali, tunteiden tunnistaminen harjoitus, sosioemotionaalinen oppiminen, tunneilmaisu tehtävä, empatia harjoitus lapset, tunnesanasto esikoulu, itsesäätelytaidot oppiminen, tunnetaidot työlehdet, tunneteht\u00e4v\u00e4t lapsille, tunteet ty\u00f6lehdet tulostettava',
  heading: 'Tunnekasvatus \u2014 Teht\u00e4v\u00e4t ja Ty\u00f6lehdet Lapsille',

  // -- Rich narrative content --
  intro: 'Tunteet ovat n\u00e4kym\u00e4t\u00f6n moottori jokaisen sosiaalisen vuorovaikutuksen, oppimishetken ja p\u00e4\u00e4t\u00f6ksen takana, jonka lapsi tekee p\u00e4iv\u00e4n aikana. Lapsi, joka osaa nimetr\u00e4 tunteensa, pystyy paremmin hallitsemaan, viestim\u00e4\u00e4n ja ymm\u00e4rt\u00e4m\u00e4\u00e4n sit\u00e4 itsess\u00e4\u00e4n ja muissa. Tunneaiheiset ty\u00f6lehdet tuovat t\u00e4m\u00e4n kriittisen el\u00e4m\u00e4ntaidon luokkahuoneeseen ja kotiin antamalla lapsille visuaalisen, j\u00e4sennellyn tavan tutkia ihmisen tunteiden koko kirjoa. Tulostettavat tunneaiheiset ty\u00f6lehtemme sis\u00e4lt\u00e4v\u00e4t ilmeikk\u00e4it\u00e4 kasvokuvia, joissa n\u00e4kyy ilo, suru, viha, yll\u00e4tys, pelko, inho ja kymmeni\u00e4 hienovaraisempia tunteita kuten turhautuminen, innostus, h\u00e4pe\u00e4 ja ylpeys. Matematiikkateht\u00e4v\u00e4t k\u00e4ytt\u00e4v\u00e4t tunneaiheisia laskureita pyyt\u00e4en lapsia laskemaan iloiset kasvot, vertaamaan surullisten ja yll\u00e4ttyneiden ryhmi\u00e4 tai laskemaan yhteen rauhallisten ja innostuneiden hahmojen m\u00e4\u00e4r\u00e4t. Lukutaidon ty\u00f6lehdet tutustuttavat tunnesanastoon, joka ylitt\u00e4\u00e4 selk\u00e4sti ilon ja surun, opettaen sanoja kuten ahdistunut, kiitollinen, pettynyt ja itsevarma, jotka antavat lapsille tarkkuutta sis\u00e4isen maailmansa kuvaamiseen. Pulmat ja lajitteluteht\u00e4v\u00e4t pyyt\u00e4v\u00e4t lapsia yhdist\u00e4m\u00e4\u00e4n ilmeita tilanteisiin, tunnistamaan, mik\u00e4 tunne ei kuulu joukkoon, tai j\u00e4rjest\u00e4m\u00e4\u00e4n tunteita asteikolla lievimm\u00e4st\u00e4 voimakkaimpaan. Tunneaiheisten ty\u00f6lehtien opetuksellinen voima piilee niiden kaksoisteht\u00e4v\u00e4ss\u00e4: ne rakentavat akateemisia taitoja samalla kun kehitt\u00e4v\u00e4t tunne- ja vuorovaikutustaitoja. Lapsi, joka tekee sanahakua tunnesanoilla, harjoittelee kirjaintunnistusta ja visuaalista skannausta samalla kun laajentaa tunnesanastoaan. Lajitteluteht\u00e4v\u00e4, jossa ryhmitell\u00e4\u00e4n positiivisia ja negatiivisia tunteita, opettaa luokittelutaitoja itsetuntemuksen rinnalla. Suomalaisessa koulumaailmassa tunnetaidot ovat keskeinen osa Perusopetuksen opetussuunnitelman perusteita (POPS), ja n\u00e4m\u00e4 ty\u00f6lehdet tarjoavat konkreettista harjoitusmateriaalia, joka tukee tunnetaitojen opetusta kaikilla luokkatasoilla. Opettajille, jotka toteuttavat tunnekasvatusohjelma, n\u00e4m\u00e4 ty\u00f6lehdet tarjoavat k\u00e4yt\u00e4nn\u00f6n harjoitusmateriaalia, joka vahvistaa piiri-istuntojen keskusteluja, mindfulness-harjoituksia ja ristiriitojen ratkaisustrategioita. Vanhemmat huomaavat tunneaiheisten ty\u00f6lehtien olevan erityisen arvokkaita haastavien kehitysvaiheiden aikana, kun lapset kamppailevat suurten tunteiden ilmaisemisessa sanoilla tekojen sijaan. Jokainen ty\u00f6lehti on keskustelun avaaja siit\u00e4, milt\u00e4 tunteet n\u00e4ytt\u00e4v\u00e4t, miten ne muuttuvat ja mit\u00e4 voimme tehd\u00e4 niit\u00e4 kokiessamme.',

  educationalOverview: 'Tunneaiheiset ty\u00f6lehdet tuottavat ainutlaatuisen tehokkaita pedagogisia tuloksia, koska ne sijaitsevat akateemisen oppimisen ja tunne- ja vuorovaikutustaitojen kehityksen risteyskohdassa \u2013 kahdella alueella, joiden tutkimus johdonmukaisesti osoittaa olevan syv\u00e4sti toisiinsa kytkeytyneit\u00e4. Lapset, jotka osaavat tunnistaa ja s\u00e4\u00e4dell\u00e4 tunteitaan, osoittavat vahvempaa akateemista suoriutumista, parempia kaverisuhteia ja joustavampia oppimistapoja. Tunnelukutaito on kyky tunnistaa, nimet\u00e4 ja ymm\u00e4rt\u00e4\u00e4 tunteita itsess\u00e4 ja muissa, ja ty\u00f6lehdet tarjoavat turvallisen, j\u00e4sennellyn tilan harjoitella t\u00e4t\u00e4 taitoa j\u00e4rjestelm\u00e4llisesti. Kun oppilaat lajittelevat ilmeit\u00e4 tunteen mukaan, he harjoittavat samoja luokittelutaitoja, joita k\u00e4ytet\u00e4\u00e4n luonnontieteess\u00e4 ja matematiikassa, samalla rakentaen empatiaa ja sosiaalista kognitiota. Yhdist\u00e4misteht\u00e4v\u00e4t, jotka parittavat tunteita tilanteisiin, kehitt\u00e4v\u00e4t perspektiivinottoa \u2013 kognitiivista taitoa, joka tukee sek\u00e4 luetun ymm\u00e4rt\u00e4mist\u00e4 ett\u00e4 sosiaalista ongelmanratkaisua. Sanastoulottuvuus on erityisen vahva: tutkimus osoittaa, ett\u00e4 lapset, jotka tuntevat enemm\u00e4n tunnesanoja, kokevat tunteet vivahteikkaammin ja hallitsevat niit\u00e4 tehokkaammin. Siirtyminen kahden sanan sanastosta ilo ja suru rikkaaseen sanastoon, joka sis\u00e4lt\u00e4\u00e4 helpottuneisuuden, ylikuormittuneisuuden, toiveikkuuden ja kateuden, muuttaa lapsen kyky\u00e4 viesti\u00e4 tarpeistaan ja ymm\u00e4rt\u00e4\u00e4 muita. Hienomotoriset taidot kehittyv\u00e4t ilmeikk\u00e4iden kasvojen v\u00e4ritt\u00e4misess\u00e4, tunnesanojen j\u00e4ljent\u00e4misess\u00e4 ja kasvojen piirteiden piirt\u00e4misess\u00e4 tiettyj\u00e4 tunteita vastaaviksi. Perusopetuksen opetussuunnitelman perusteiden (POPS) mukaisessa opetuksessa tunneaiheiset ty\u00f6lehdet kytkeytyyv\u00e4t terveyskasvatuksen mielenterveystavoitteisiin, \u00e4idinkielen sanaston omaksumisen ja henkilöhahmojen analysoimisen tavoitteisiin sek\u00e4 yh\u00e4 enenevaan tunnetaitojen integrointiin kaikkiin oppiaineisiin.',

  parentGuide: 'Tunneaiheiset ty\u00f6lehdet luovat luonnollisia siltoja t\u00e4rkeimpiin keskusteluihin, joita voit k\u00e4yd\u00e4 lapsesi kanssa tunteista, ihmissuhteista ja itsens\u00e4 hallinnasta. Ilmeiden yhdist\u00e4misteht\u00e4v\u00e4n j\u00e4lkeen harjoitelkaa ilmeiden tekemist\u00e4 yhdess\u00e4 peilin edess\u00e4, liioitelkaa jokaista tunnetta ja keskustelkaa siit\u00e4, milloin olette kokeneet kyseisen tunteen. Luokaa perheen tunnekartta j\u00e4\u00e4kaapin oveen, jossa jokainen \u2013 vanhemmat mukaan lukien \u2013 voi siirt\u00e4\u00e4 nimikorttinsa p\u00e4iv\u00e4\u00e4ns\u00e4 parhaiten kuvaavan tunteen kohdalle. Kun lapsesi kokee voimakkaan tunteen, viittaa ty\u00f6lehtien sanastoon sanomalla kuulostaa silt\u00e4, ett\u00e4 saatat tuntea turhautumista \u2013 se on se sana, jonka opimme. Lukekaa kuvakirjoja, joissa hahmot kokevat erilaisia tunteita, ja pys\u00e4htyk\u00e4\u00e4 antamaan lapsenne tunnistaa tunteet ty\u00f6lehttisanastoaan k\u00e4ytt\u00e4en. Automatkoilla tai hiljaisina hetkin\u00e4 pelatkaa tunteiden arvausleikki\u00e4, jossa toinen kuvaa tilanteen ja toinen nime\u00e4\u00e4 tunteen, jonka kokisi. Nuorempien lasten kohdalla pid\u00e4 ty\u00f6lehtihetket noin kymmenness\u00e4 minuutissa ja vahvista aina lapsen ilmaisemat tunteet, my\u00f6s vaikeat. Tavoitteena ei ole poistaa negatiivisia tunteita vaan auttaa lapsia tunnistamaan, nime\u00e4m\u00e4\u00e4n ja navigoimaan niit\u00e4. Kun lapsesi n\u00e4kee, ett\u00e4 sin\u00e4kin koet monia tunteita ja puhut niist\u00e4 avoimesti, ty\u00f6lehtien oppiminen laajenee aidoksi tunne\u00e4lyksi, joka palvelee h\u00e4nt\u00e4 l\u00e4pi el\u00e4m\u00e4n.',

  // -- Curated apps (IDENTICAL to English) --
  curatedAppIds: [
    'coloring', 'draw-and-color', 'matching-app', 'picture-sort',
    'image-addition',
    'word-search', 'writing-app', 'word-guess',
    'odd-one-out', 'drawing-lines',
  ],
  appCategories: [
    { category: 'math', appIds: ['image-addition'] },
    { category: 'literacy', appIds: ['word-search', 'writing-app', 'word-guess'] },
    { category: 'visual', appIds: ['coloring', 'draw-and-color', 'matching-app', 'picture-sort'] },
    { category: 'puzzles', appIds: ['odd-one-out', 'drawing-lines'] },
  ],

  // -- Educational sections --
  teachingTips: [
    { title: 'Aloita jokainen p\u00e4iv\u00e4 tunnekuulumisella', description: 'Aseta luokan oven l\u00e4helle tunnejuliste, jossa on piirrettyyj\u00e4 kasvoja eri tunteilla. Saapuessaan oppilaat asettavat nimikkorttinsa aamuaan vastaavan tunteen viereen. K\u00e4yt\u00e4 t\u00e4t\u00e4 tietoa p\u00e4iv\u00e4n opetuksen suunnitteluun yhdist\u00e4en tunneaiheiset ty\u00f6lehdet eniten edustettuihin tunteisiin. Ajan mittaan lapset kehitt\u00e4v\u00e4t itsens\u00e4 tarkkailun tavan ja sanaston tunnettilansa ilmaisemiseen.', audience: 'teacher' },
    { title: 'K\u00e4yt\u00e4 tunnelajittelua ristiriitojen ratkaisun v\u00e4lineen\u00e4', description: 'Kun luokassa syntyy ristiriitoja, ota esiin kuvalajitteluty\u00f6lehdet, joissa n\u00e4kyy erilaisia tunneilmeit\u00e4. Pyyd\u00e4 jokaista osapuolta tunnistamaan, mik\u00e4 kasvokuva vastaa h\u00e4nen tunnettaan erimielisyyden aikana. T\u00e4m\u00e4 siirt\u00e4\u00e4 keskustelun sy\u00e4tt\u00e4misest\u00e4 tunteisiin auttaen lapsia harjoittamaan perspektiivinottoa juuri sill\u00e4 hetkell\u00e4, kun sill\u00e4 on eniten merkityst\u00e4. Jatka ty\u00f6lehdell\u00e4, joka tutkii, mit\u00e4 voimme tehd\u00e4, kun tunnemme n\u00e4in.', audience: 'teacher' },
    { title: 'Luo perheen tunnep\u00e4iv\u00e4kirja', description: 'Tunnesanastoty\u00f6lehden j\u00e4lkeen aloittakaa yhdess\u00e4 yksinkertainen tunnep\u00e4iv\u00e4kirja. Joka ilta lapsesi piirt\u00e4\u00e4 tai kirjoittaa p\u00e4iv\u00e4n voimakkaimman tunteen ja yhden lauseen siit\u00e4, mik\u00e4 sen aiheutti. Katselkaa p\u00e4iv\u00e4kirjaa viikoittain huomataksenne malleja ja juhllaaksenne tunnettaista kasvua. T\u00e4m\u00e4 harjoitus rakentaa itsetuntemusta, kirjoitustaitoja ja antaa lapsellesi turvallisen kanavan kokemustensa k\u00e4sittelyyn.', audience: 'parent' },
    { title: 'Mallinna tunnesanastoa arjen hetkiss\u00e4', description: 'Kun teette tunneaiheisia ty\u00f6lehti\u00e4 yhdess\u00e4, pyri tietoisesti k\u00e4ytt\u00e4m\u00e4\u00e4n samaa sanastoa p\u00e4iv\u00e4n mittaan. Sanon olen iloinen sijaan sano tunnen kiitollisuutta siit\u00e4, ett\u00e4 vietmme aikaa yhdess\u00e4. Olen vihainen sijaan sano tunnen turhautumista, koska liikenne oli hidasta. Lapset oppivat tunnesanastoa tehokkaimmin kuullessaan aikuisten k\u00e4ytt\u00e4v\u00e4n sit\u00e4 aidosti, muuttaen ty\u00f6lehtien sanat el\u00e4v\u00e4ksi kieleksi.', audience: 'both' },
  ],
  activities: [
    {
      title: 'Tunnekasvojen gallerikävely',
      description: 'Tulosta suuria tunnekasvokortteja ja kiinnit\u00e4 ne luokan sein\u00e4ille lasten silmien korkeudelle. Anna jokaiselle oppilaalle kirjoitusalusta ja kirjaamisarkki. Lapset kävelevät kasvolta kasvolle kirjoittaen tunteen nimen ja piirtäen tai kirjoittaen kerrasta, jolloin he tunsivat niin. Gallerikävelyn jälkeen kokoontukaa ryhmänä ja kutsukaa vapaaehtoisia jakamaan yksi vastauksistaan. Tämä tehtävä rakentaa tunnesanastoa, kirjoitustaitoja ja empatiaa jaettujen kokemusten kautta.',
      materials: ['suuria tunnekasvo-tulosteita', 'teippi', 'kirjoitusalustat', 'kirjaamisarkki-työlehdet', 'kyniä'],
      duration: '20\u201325 minuuttia',
      skillAreas: ['social', 'literacy'],
    },
    {
      title: 'Tunnemittari-askartelu',
      description: 'Anna jokaiselle lapselle paperisuikale, joka on jaettu viiteen osioon edustamaan tunteen voimakkuutta rauhallisesta alhaalla ylikuormittuneeseen ylh\u00e4\u00e4ll\u00e4. Lapset v\u00e4rittv\u00e4t jokaisen osion eri v\u00e4rill\u00e4 ja kirjoittavat tai piirt\u00e4v\u00e4t tunnesanan kullekin tasolle. Kiinnit\u00e4 liukuva paperinuoli. P\u00e4iv\u00e4n aikana lapset s\u00e4\u00e4t\u00e4v\u00e4t mittariaan n\u00e4ytt\u00e4m\u00e4\u00e4n nykyist\u00e4 tunnetilaansa. T\u00e4m\u00e4 itsens\u00e4\u00e4telyv\u00e4line syntyy suoraan tunneaiheisissä ty\u00f6lehdentehtävissä opitusta sanastosta.',
      materials: ['esileikattuja paperisuikaleita', 'v\u00e4rikyn\u00e4t tai tussit', 'paperinuolia', 'haaranauloja', 'tunnesanalista'],
      duration: '15\u201320 minuuttia',
      skillAreas: ['social', 'creative'],
    },
    {
      title: 'Tunnepantomiimi ja tukkimiehen kirjanpito',
      description: 'Kirjoita tunnesanoja korteille ja aseta ne kuvapuoli alas. Lapset nostavat vuorollaan kortin ja esittävät tunteen ilman sanoja luokkakavereiden arvatessa. Jokaisen kierroksen jälkeen tunne merkitään luokan tukkimiehen kirjanpitoon. Kun kaikki kortit on esitetty, analysoikaa kirjanpitoa yhdessä: mitkä tunteet olivat helpoimpia arvata, mitkä vaikeimpia ja miksi. Tämä yhdistää tunnetaitojen oppimisen matemaattisiin datataitoihin ja fyysiseen ilmaisuun.',
      materials: ['tunnesanakortit', 'tukkimiehen kirjanpito -juliste', 'tusseja', 'ajastin'],
      duration: '20\u201325 minuuttia',
      skillAreas: ['social', 'math'],
    },
  ],
  curriculumAlignment: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Laskea ja tunnistaa erilaisia tunteita kuvatehtävissä',
      relatedAppIds: ['image-addition'],
    },
    {
      standard: 'POPS.YL.1-2.T4',
      framework: 'POPS 2014',
      description: 'Tunnistaa ja nimetä erilaisia tunteita',
      relatedAppIds: ['matching-app', 'picture-sort'],
    },
    {
      standard: 'POPS.AI.1-2.T1',
      framework: 'POPS 2014',
      description: 'Ilmaista omia tunteita ja ajatuksia sanallisesti',
      relatedAppIds: ['word-guess'],
    },
  ],

  // -- Grade-specific content --
  gradeContent: {
    'preschool': {
      seoTitle: 'Tunnetehtävät Esikouluun — Tunnista ja Väritä | LCS',
      seoDescription: 'Tulostettavia tunnetehtäviä esikouluun (3–4v). Tunnista ilmeitä, väritä kasvoja, yhdistä tunnevarjoja ja lajittele tunteita. Ilmaisia työlehtiä.',
      seoKeywords: 'tunnetehtävät esikoululaisille, hienomotoriikka harjoitus, väritys ja jäljentäminen, koon tunnistaminen, yksinkertainen laskeminen, tunnekasvatus, empatia, itsesäätelytaidot, tunnetehtävät esikoulu, tunteiden oppiminen 3-4v',
      intro: 'Kolme- ja nelj\u00e4vuotiaat esikoululaiset ovat vasta alkamassa ymm\u00e4rt\u00e4\u00e4, ett\u00e4 heid\u00e4n sis\u00e4llean pyriv\u00e4ill\u00e4 tuntemuksilla on nimi\u00e4 ja ett\u00e4 muutkin ihmiset kokevat samoja tunteita. T\u00e4m\u00e4 syntym\u00e4ss\u00e4 oleva tunnetietoisuus tekee tunneaiheisista ty\u00f6lehdist\u00e4 elint\u00e4rke\u00e4n kehitysv\u00e4lineen esikoulussa. T\u00e4ss\u00e4 vaiheessa lapset tunnistavat tyypillisesti perustunteet kuten ilon, surun, vihan ja pelon, mutta kamppailevat hienovaraisemman kanssa. Esikoululaisille suunnitellut ty\u00f6lehdet k\u00e4ytt\u00e4v\u00e4t suuria, selkeit\u00e4 ilmekuvia, joissa tunnevihjeet on liioiteltu, mik\u00e4 helpottaa pienten lasten erottamaan hymyn surumielisest\u00e4 ilmeest\u00e4, suuret silm\u00e4t siristetyist\u00e4. Tyypillinen teht\u00e4v\u00e4 voi n\u00e4ytt\u00e4\u00e4 nelj\u00e4t kasvot ja pyyt\u00e4\u00e4 lasta ympyr\u00f6im\u00e4\u00e4n iloiset tai v\u00e4ritt\u00e4m\u00e4\u00e4n surulliset kasvot siniseksi. Yhdist\u00e4misteht\u00e4v\u00e4t parittavat tunnekasvoja yksinkertaisiin tilanteisiin kuten lahjan saaminen tai lelun kadottaminen, auttaen lapsia yhdist\u00e4m\u00e4\u00e4n tunteita niiden syihin. Sanojen ilo, suru tai viha j\u00e4ljent\u00e4minen kehitt\u00e4\u00e4 kyn\u00e4otetta ja kirjainten muodostamista samalla kun rakennetaan varhaisinta tunnesanastoa. Esikouluvuodet ovat aikaa, jolloin lapset kohtaavat ensimm\u00e4iset sosiaaliset ristiriidat ryhm\u00e4tilanteissa, ja jo pelk\u00e4st\u00e4\u00e4n perustunnesanaston hallitseminen antaa heille v\u00e4lineit\u00e4 ilmaista turhautumista sanoilla tekojen sijaan. Opettajien ja vanhempien kannattaa pit\u00e4\u00e4 tuokiot hyvin lyhyin\u00e4, noin viidest\u00e4 kymmeneen minuuttiin, ja seurata aina kysymyksell\u00e4 kuten oletko joskus tuntenut n\u00e4in, muuttaen jokaisen ty\u00f6lehden lyhyeksi mutta merkitykselliseksi keskusteluksi lapsen sis\u00e4isest\u00e4 maailmasta.',
      objectives: [
        { skill: 'Tunnista ja nime\u00e4 nelj\u00e4 perustunnetta ilmeist\u00e4', area: 'cognitive' },
        { skill: 'Yhdist\u00e4 tunnekasvot yksinkertaisiin arjen tilanteisiin', area: 'social' },
        { skill: 'J\u00e4ljenn\u00e4 tunnesanastosanoja oikealla kirjainten muodostuksella', area: 'literacy' },
      ],
      developmentalNotes: 'Kolme\u2013nelj\u00e4vuotiaat kehitt\u00e4v\u00e4t mieliteoriaa, ymm\u00e4rryst\u00e4 siit\u00e4, ett\u00e4 muilla ihmisill\u00e4 on itsest\u00e4 poikkeavia ajatuksia ja tunteita. Tunneiden yhdist\u00e4misteht\u00e4v\u00e4t tukevat suoraan t\u00e4t\u00e4 kognitiivista merkkipaalua. Motorinen kehitys t\u00e4ss\u00e4 vaiheessa tarkoittaa, ett\u00e4 tunnekasvojen paksut ääriviivat auttavat lapsia pysym\u00e4\u00e4n rajan sis\u00e4ll\u00e4 v\u00e4ritt\u00e4ess\u00e4, rakentaen sek\u00e4 hienomotoriikan hallintaa ett\u00e4 visuaalista tarkkaavaisuutta kasvojen yksityiskohtiin.',
      teachingTips: [
        'K\u00e4yt\u00e4 peili\u00e4 tunneaiheisten ty\u00f6lehtien vieress\u00e4, jotta esikoululaiset voivat tehd\u00e4 jokaisen ilmeen itse ennen kuin tunnistavat sen paperilla \u2013 yhdist\u00e4en fyysisen tuntemuksen visuaaliseen tunnistamiseen.',
        'Rajoita jokainen ty\u00f6lehti kolmeen tai nelj\u00e4\u00e4n tunnekasvooon esikoululaisten tarkkaavaisuuden ylikuormittumisen v\u00e4ltt\u00e4miseksi, ja nime\u00e4 tunne aina \u00e4\u00e4neen yhdess\u00e4 ennen teht\u00e4v\u00e4n aloittamista.',
      ],
      faq: [
        { question: 'Voivatko kolmevuotiaat todella hy\u00f6ty\u00e4 tunneaiheisista ty\u00f6lehdist\u00e4?', answer: 'Kyll\u00e4. Jo kolmevuotiaina lapset osaavat yhdist\u00e4\u00e4 hymyilev\u00e4t kasvot iloon ja itkev\u00e4t kasvot suruun. Esikoululaisten tunneaiheiset ty\u00f6lehdet k\u00e4ytt\u00e4v\u00e4t selkeit\u00e4, yksinkertaisia kuvituksia, jotka tekev\u00e4t n\u00e4ist\u00e4 yhteyksist\u00e4 visuaalisia ja konkreettisia luoden perustan rikkaamalle tunnesanastolle, joka kehittyy seuraavien vuosien aikana.' },
        { question: 'Miten tunneaiheiset ty\u00f6lehdet auttavat esikoululaisten k\u00e4yt\u00f6shaasteissa?', answer: 'Ne antavat lapsille sanoja sille, mit\u00e4 he tuntevat, mik\u00e4 v\u00e4hent\u00e4\u00e4 turhautumisesta johtuvia purkauksia. Kun lapsi voi osoittaa kuvaa ja sanoa tunnen vihaa, h\u00e4n on ottanut ensimm\u00e4isen askeleen tunteen rakentavaan hallintaan. Rauhallisena hetken\u00e4 harjoitellut ty\u00f6lehdet muuttuvat viitepisteiksi, joita lapset voivat k\u00e4ytt\u00e4\u00e4 todellisten tunnehetkien aikana.' },
        { question: 'Pit\u00e4isik\u00f6 korjata, jos esikoululaiseni nime\u00e4\u00e4 tunteen v\u00e4\u00e4rin ty\u00f6lehdess\u00e4?', answer: 'Ohjaa lempe\u00e4sti korjaamisen sijaan. Sano ymm\u00e4rr\u00e4n, miksi voisit ajatella, ett\u00e4 tuo ilme n\u00e4ytt\u00e4\u00e4 vihaiselta. Katso suuta \u2013 k\u00e4\u00e4ntyyk\u00f6 se yl\u00f6s vai alas? Selvitet\u00e4\u00e4n yhdess\u00e4, mit\u00e4 n\u00e4m\u00e4 kasvot tuntevat. Tavoitteena on tunnehavainnoinnin taitojen rakentaminen, ei oikean vastauksen saaminen, ja jokainen yritys on askel kohti suurempaa tunnelukutaitoa.' },
      ],

      snippetAnswer: 'Tunneaiheiset työlehdet esikoululaisille (3–4-vuotiaat) opettavat tunnistamaan perustunteita kasvojen ilmeistä, nimeämään tunteita ja kehittämään empatiaa ja itsesäätelytaitoja värittämisen ja yhdistämistehtävien kautta. Tunneteema on esikoululaisen sosioemotionaalisen kehityksen kulmakivi.',
      uniqueGradeAngle: 'Tunteet ovat esikoululaiselle kehityksellisesti kriittinen teema, koska kolme- ja neljävuotiaat ovat voimakkaan tunne-elämän kehityksen vaiheessa: he kokevat voimakkaita tunteita mutta heiltä puuttuu vielä sanasto ja strategiat niiden käsittelyyn. VASU korostaa sosioemotionaalista oppimista ja itsesäätelyn kehittymistä varhaiskasvatuksen keskeisinä tavoitteina. Tunneaiheiset työlehdet antavat lapsille turvallisen välineen harjoitella tunteiden tunnistamista ja nimeämistä paperilla ennen kuin näitä taitoja tarvitaan kipeissä reaalitilanteissa. Kasvojen ilmeiden tulkitseminen on yksi ihmisen perustavimmista sosiaalisista taidoista, ja työlehdet, joissa erilaisia ilmeitä yhdistetään tilanteisiin, rakentavat empatiaa systemaattisesti. Värittäminen itsessään on rauhoittava toiminta, mikä tekee tunneteemaisesta värityksestä kaksoistyökalun: samalla kun lapsi oppii tunteista, hän harjoittelee itsesäätelyä. Tunnesanaston oppiminen parantaa lapsen kykyä ilmaista tarpeitaan sanoin turvautumisen sijaan.',
      developmentalMilestones: [
        { milestone: 'Perustunteiden tunnistaminen kasvoista (3–4-vuotiaat oppivat lukemaan ilmeitä systemaattisesti)', howWeAddress: 'Tunnekasvokuvien yhdistämistehtävät opettavat erottamaan ilon, surun, vihan ja pelon toisistaan visuaalisten vihjeiden avulla' },
        { milestone: 'Tunnesanaston omaksuminen (esikoululaiset oppivat sanoittamaan kokemuksiaan)', howWeAddress: 'Tunne–sana-yhdistämistehtävät ankkuroivat tunnesanat kuten iloinen, surullinen, vihainen ja pelkäävä visuaalisiin mielikuviin' },
        { milestone: 'Empatian alkava kehittyminen (esikoululaiset oppivat, että muillakin on tunteita)', howWeAddress: 'Tehtävät, joissa lapsi yhdistää tilanteen oikeaan tunteeseen, rakentavat ymmärrystä siitä, miksi toiset tuntevat tietyssä tilanteessa tietyllä tavalla' },
        { milestone: 'Kasvojen yksityiskohtien värittäminen (siirtyminen yksinkertaisista muodoista ilmeiden piirtämiseen)', howWeAddress: 'Kasvojen väritystehtävät, joissa eri ilmeet väritetään tunnelman mukaan, kehittävät hienomotoriikkaa ja ilmeiden tulkintaa samanaikaisesti' },
      ],
      differentiationNotes: 'Tukea tarvitseville esikoululaisille aloita kahdella selkeällä tunnetilalla (iloinen ja surullinen), käytä suuria yksinkertaisia kasvokuvia ja yhdistä tehtävät konkreettisiin tilanteisiin ("miltä tuntuu kun saa halauksen"). Edistyneille esikoululaisille lisää monimutkaisempia tunteita (jännitys, hämmentynyt, ylpeä), pyydä kertomaan tilanteita, joissa on kokenut eri tunteita ja kannusta piirtämään oma kasvokuva eri tunnetiloissa.',
      parentTakeaway: 'Tunneteema tarjoaa vanhemmille arvokkaan välineen tunnekasvatukseen. Käyttäkää työlehtiä keskustelunavaajina: "miltä tämän hahmon näyttää tuntuvan? Oletko joskus tuntenut samoin?" Nimeäkää tunteita arkisissa tilanteissa: "näytät iloiselta" tai "ymmArrAn, että olet turhautunut". Tämä tunnesanaston aktiivinen käyttö auttaa lasta ilmaisemaan tarpeitaan sanoin ja vähentää turhautumisesta johtuvia kiukkukohtauksia merkittävästi.',
      classroomIntegration: 'Tunneteema integroituu esikoulun jokapäiväiseen arkeen: aamupiirissä jokainen lapsi kertoo päivän tunteensa tunnekortin avulla, oppimispisteissä väritetään tunnekuvia ja yhdistetään ilmeitä tilanteisiin. Ristiriitatilanteiden jälkeen palataan tunnetyöölehtiin: "miltä sinusta tuntui, kun..." Tämä jatkuva tunnekasvatuksen sykli toteuttaa VASU:n sosioemotionaalisen oppimisen tavoitteita yhdistämällä tunnekasvatuksen, kielen ja taiteen.',
      assessmentRubric: [
        { skill: 'Perustunteiden tunnistaminen', emerging: 'tunnistaa ilon ja surun kasvoista aikuisen avulla', proficient: 'tunnistaa itsenäisesti neljä perustunnetta (ilo, suru, viha, pelko) ja nimeää ne', advanced: 'tunnistaa kuusi tai useampi tunnetta, yhdistää ne tilanteisiin ja selittää miksi hahmo tuntee näin' },
        { skill: 'Tunnesanaston käyttö', emerging: 'käyttää sanoja iloinen ja surullinen aikuisen mallilla', proficient: 'käyttää itsenäisesti neljaä tunnesanaa ja yhdistää ne omiin kokemuksiinsa', advanced: 'käyttää laajaa tunnesanastoa ja kertoo tarinoita, joissa hahmot kokevat eri tunteita' },
        { skill: 'Hienomotorinen hallinta', emerging: 'värittää kasvokuvia laajoilla liikkeillä rajojen yli', proficient: 'värittää kasvojen osat ääriviivojen sisällä ja erottelee ne väreillä', advanced: 'piirtää itse kasvojen ilmeitä tunnistettavasti ja lisaa yksityiskohtia' },
      ],
    },
    'kindergarten': {
      seoTitle: 'Tunnetehtävät Esiopetukseen — Nimeä ja Keskustele | LCS',
      seoDescription: 'Tulostettavia tunnetehtäviä esiopetukseen (5–6v). Harjoittele tunnesanastoa, tunnista ilmeitä ja ratkaise pulmia. Ilmaisia työlehtiä.',
      seoKeywords: 'tunnetehtävät esiopetukseen, alkuäänteet harjoitus, kirjaintunnistus oppiminen, lukuvalmius tukeminen, yhteenlasku kymmeneen, tunnekasvatus, empatia, itsesäätelytaidot, tunnetehtävät esiopetus, tunteiden oppiminen 5-6v',
      intro: 'Esiopetusik\u00e4iset tuovat kasvavan sosiaalisen tietoisuuden tunneaiheisiin ty\u00f6lehtiin, valmiina laajentamaan perustunteiden ilo, suru ja viha yli rikkaampaan sanastoon, joka sis\u00e4lt\u00e4\u00e4 yll\u00e4ttynyt, huolestunut, innostunut, ylpe\u00e4 ja h\u00e4mmentynyt. Viisi- ja kuusivuotiaat navigoivat yh\u00e4 monimutkaisempia kaverisuhteita, hallitsevat kokonaisen koulup\u00e4iv\u00e4n odotuksia ja alkavat ymm\u00e4rt\u00e4\u00e4, ett\u00e4 ihminen voi tuntea useampaa tunnetta samanaikaisesti. T\u00e4m\u00e4n tason tunneaiheiset ty\u00f6lehdet hy\u00f6dynt\u00e4v\u00e4t n\u00e4it\u00e4 kehityksellisi\u00e4 harppauksia tuomalla esiin vivahteikkaan tunnistamisen, syy-seurausp\u00e4\u00e4ttelyn tunteista ja varhaisia empatiaharjoituksia. Matematiikkateht\u00e4v\u00e4t pyyt\u00e4v\u00e4t lapsia laskemaan tunnekasvoryhmi\u00e4, vertaamaan iloisten ja surullisten m\u00e4\u00e4ri\u00e4 tai ratkaisemaan yksinkertaisia yhteenlaskuteht\u00e4vi\u00e4 tunneaiheisilla laskureilla. Sanahakuteht\u00e4v\u00e4t tunnesanastolla rakentavat n\u00e4k\u00f6sanatunnistusta samalla kun altistavat lapsia laajemmalle tunteiden sanastolle. Lajitteluteht\u00e4v\u00e4t, jotka pyyt\u00e4v\u00e4t lapsia jaottelemaan tunteet mukaviin ja ep\u00e4mukaviin, tutustuttavat k\u00e4sitteeseen, ett\u00e4 kaikki tunteet ovat p\u00e4tevi\u00e4 vaikka joitakin on vaikeampi kokea. Piirustusteht\u00e4v\u00e4t, joissa lapset luovat omia tunnekasvojaan tietyille tilanteille, kehitt\u00e4v\u00e4t sek\u00e4 luovaa ilmaisua ett\u00e4 perspektiivinottokyky\u00e4. Esiopetusvuosi on kriittinen ikkuna tunne- ja vuorovaikutustaitojen oppimiselle, koska lapset muodostavat kaverisuhteiden malleja, jotka seuraavat heit\u00e4 l\u00e4pi alakoulun, ja ty\u00f6lehdet, jotka rakentavat empatiaa ja itsetuntemusta t\u00e4n\u00e4 aikana, vaikuttavat pysyv\u00e4sti sosiaaliseen osaamiseen.',
      objectives: [
        { skill: 'Tunnista ja nime\u00e4 v\u00e4hint\u00e4\u00e4n kahdeksan eri tunnetta ilmeist\u00e4 ja tilanteista', area: 'social' },
        { skill: 'Lajittele tunteet kategorioihin ja selitt\u00e4 ryhmittelyn perusteet', area: 'cognitive' },
        { skill: 'Lue ja kirjoita tunnesanastoa mukaan lukien yll\u00e4ttynyt, huolestunut ja ylpe\u00e4', area: 'literacy' },
      ],
      developmentalNotes: 'Esiopetusikäiset kehittävät kognitiivista joustavuutta ymmärtääkseen, että tunteet muuttuvat ja että sama tapahtuma voi aiheuttaa eri tunteita eri ihmisissä. Heidän kasvava sanastonsa mahdollistaa siirtymisen laajoista nimikkeistä tarkempiin tunnesanoihin. Sosiaalisesti he oppivat lukemaan ilmeitä ja kehonkieltä reaaliajassa, ja työlehtiharjoittelu kuvitetuilla tunteilla terävöittää tätä kriittistä sosiaalista taitoa.',
      teachingTips: [
        'Tunnelajittelutyölehden jälkeen pyydä lapsia esittämään jokainen tunne kaverille ja keskustelemaan siitä, miltä heidän kasvonsa ja kehonsa näyttävät tuntiessaan niin, yhdistäen visuaalisen tunnistamisen fyysiseen itsetuntemukseen.',
        'Luo luokan tunnesanaseinä, joka kasvaa uuden sanaston ilmaantuessa työlehdentehtävissä, kannustaen lapsia käyttämään näitä tarkkoja sanoja jakamishetkissä ja ristiriitojen ratkaisussa.',
      ],
      faq: [
        { question: 'Kuinka monta tunnetta esiopetusikäisten pitäisi pystyä tunnistamaan?', answer: 'Esiopetuksen loppuun mennessä useimmat lapset osaavat luotettavasti tunnistaa ja nimetä kahdeksasta kahteentoista tunnetta. Työlehdet rakentavat tätä sanastoa asteittain aloittaen neljästä perusvaiheesta ja lisäten vivahteikkaita tunteita kuten yllättynyt, huolestunut, ylpeä, hämmentynyt ja innostunut toistuvan visuaalisen harjoittelun ja tilanteisiin yhdistämisen kautta.' },
        { question: 'Miten tunneaiheiset työlehdet tukevat esiopetuksen lukutaitoa?', answer: 'Tunnesanat ovat erittäin motivoivaa sanastoa, koska ne kuvaavat lasten henkilökohtaisia kokemuksia. Sanahakutehtävät, sana-arvauspellit ja kirjoitustehtävät tunnesanoilla rakentavat näkösanatunnistusta, foneettista purkamista ja kirjoituksen sujuvuutta samalla kun laajentavat tunnesanastoa, jota lapset tarvitsevat sosiaaliseen menestymiseen.' },
        { question: 'Voivatko tunneaiheiset työlehdet auttaa ujoja tai ahdistuneita esiopetusikäisiä?', answer: 'Kyllä. Työlehdet tarjoavat matalan kynnyksen tavan tutkia tunteita paperilla ennen kuin niistä keskustellaan ääneen. Ujo lapsi, joka värittää huolestuneet kasvot ja nimeää ne, ei ehkä ole vielä valmis jakamaan suullisesti, mutta on silti harjoitellut tunteen tunnistamista ja nimeämistä rakentaen perustan tulevalle itseilmaisulle, kun hän tuntee olonsa turvalliseksi.' },
      ],

      snippetAnswer: 'Tunneaiheiset työlehdet esiopetukseen (5–6-vuotiaat) syventävät tunnetaitoja ja itsäsäätelystrategioita, kehittävät sosiaalista päättelyä ja vahvistavat kielitietoisuutta tunnesanaston avulla. Esiopetussuunnitelman tunne- ja vuorovaikutustaitojen tavoitteet toteutuvat kokonaisvaltaisesti.',
      uniqueGradeAngle: 'Esiopetusikäisille tunneteema saa ratkaisevan syvyyden, koska viisi- ja kuusivuotiaat kykenevät ensimmäistä kertaa itsäsäätelyyn tietoisesti — he eivät vain koe tunteita vaan voivat valita, miten niihin reagoivat. Tämä itsäsäätelyn tietoinen kehittäminen on yksi esiopetuksen tärkeimmistä koulunvalmiustaidoista ja koko elämän perusta. Esiopetussuunnitelman tunne- ja vuorovaikutustaitojen osaamisalue saa syvemmän merkityksen, kun lapset oppivat nimeämään hienojakoisempia tunteita (turhautunut, pettynyt, innostunut, huolestunut) erotuksena esikoulun perustunteista (iloinen, surullinen, vihainen). Kielitietoisuus kehittyy tunnesanaston kautta, joka on abstraktimpaa kuin konkreettinen sanasto ja vaatii syvempIää ajattelua. Matemaattisesti tunteet tarjoavat luokittelukontekstin, jossa rajat ovat hämäriä — tämä opettaa, ettei kaikki ole mustavalkoista. Suomalaisen esiopetuksen vahva painotus tunne- ja vuorovaikutustaidoissa tekee tästä teemasta pedagogisesti keskeisen.',
      developmentalMilestones: [
        { milestone: 'Itsäsäätelystrategioiden tietoinen käyttö (5–6-vuotiaat oppivat valitsemaan rauhoittumiskeinon)', howWeAddress: 'Strategiavalintatehtävät, joissa lapsi pohtii tilannetta ja valitsee sopivan itsäsäätelystrategian (hengitä, laske kymmeneen, puhu aikuiselle), kehittävät tietoista itsäsäätelyä' },
        { milestone: 'Hienojakoisten tunteiden tunnistaminen (esiopetusikäiset erottavat tunteiden vivähteita)', howWeAddress: 'Tunneympyrätehtävät, joissa lapsi tunnistaa ja nimeää kahdeksan–kymmenen eri tunnetta kasvoilmeistä ja tilanteista, laajentavat tunnelukutaitoa' },
        { milestone: 'Sosiaalinen päättely ristiriitatilanteissa (viisi- ja kuusivuotiaat oppivat ratkaisemaan konflikteja)', howWeAddress: 'Tilannekuvatehtävät, joissa lapsi analysoi ristiriitatilanteen, nimeää osapuolten tunteet ja ehdottaa ratkaisua, kehittävät sosiaalista päättelyä' },
        { milestone: 'Tunnesanaston kirjoittaminen (esiopetusikäiset oppivat abstraktia sanastoa)', howWeAddress: 'Tavutus- ja kirjoitustehtävät tunnesanoilla (iloi-nen, surul-li-nen, tur-hau-tu-nut) yhdistävät kielen ja tunnetaitojen oppimisen' },
      ],
      differentiationNotes: 'Tukea tarvitseville esiopetusikäisille rajaa tunteet viiteen perustunteeseen (iloinen, surullinen, vihainen, pelästynyt, innostunut), käytä selkeitä kasvokuvia ja tarjoa valmmiit strategiakortit rauhoittumiseen. Edistyneille esiopetusikäisille lisää hienojakoisempia tunteita (huolestunut, turhautunut, kiiitollinen, ylpeä), pyydä kirjoittamaan tunteiden syitä lauseilla ja haasta analysoimaan monitulkintaisia tilanteita, joissa ei ole yhtä oikeaa vastausta.',
      parentTakeaway: 'Tunneteema on esiopetusikäiselle ehkä tärkein kaikista teemoista koulunvalmiuden kannalta. Kotona voitte harjoitella tunteiden nimeämistä arjen tilanteissa: ”näytät turhautuneelta, haluatko kertoa mistä on kyse?” Harjoitelkaa yhdessä rauhoittumisstrategioita: syvIä hengityksiä, laskemista kymmeneen, lempipaikassa käyntiä mielenessä. Tärkeintä on näyttää lapselle, että kaikki tunteet ovat sallittuja — vain teot voivat olla vääriä.',
      classroomIntegration: 'Tunneteema läpäisee esiopetuksen koko päivän: aamupiirissä jokainen kertoo, miltä tuntuu tänään, työlehtihetkellä harjoitellaan tunnetaitoja ja sanastoa, ristiriitatilanteissa palataan työlehdillä opittuihin strategioihin ja iltapäivän rauhoittumishetkellä harjoitellaan hengitystä ja läsnäoloa. Esiopetussuunnitelman tunne- ja vuorovaikutustaitojen osaamisalue toteutuu kokonaisvaltaisesti, kun tunneteema ei ole erillinen hetki vaan koko päivän läpIäisevä periaate.',
      assessmentRubric: [
        { skill: 'Tunteiden tunnistaminen', emerging: 'tunnistaa kolme perustunnetta (iloinen, surullinen, vihainen) kuvista', proficient: 'tunnistaa ja nimeää kahdeksan tunnetta sekä kuvista että tilanteista', advanced: 'tunnistaa hienojakoisia tunteita, erottaa samankaltaisten tunteiden erot ja tulkitsee monitulkintaisia tilanteita' },
        { skill: 'Itsäsäätelystrategian valinta', emerging: 'tietää yhden rauhoittumiskeinon aikuisen muistutuksella', proficient: 'valitsee itsenäisesti tilanteeseen sopivan strategian kolmesta vaihtoehdosta', advanced: 'käyttää useita strategioita joustavasti, arvioi niiden toimivuutta ja auttaa muita' },
        { skill: 'Tunnesanaston kirjoittaminen', emerging: 'jäljentää tunnesanoja mallista', proficient: 'tavuttaa ja kirjoittaa neljä–viisi tunnesanaa itsenäisesti', advanced: 'kirjoittaa tunnesanoja lauseisiin ja kuvailee tunteiden syitä kirjallisesti' },
      ],
    },
    'first-grade': {
      seoTitle: 'Tunnetehtävät 1. Luokalle — Empatia ja Sanat | LCS',
      seoDescription: 'Tulostettavia tunnetehtäviä 1. luokalle (6–7v). Opettele tunnesanastoa, täytä ristikköja ja lue tunnetarinoita. Ilmaisia työlehtiä.',
      seoKeywords: 'tunnetehtävät 1. luokalle, yhteenlasku vähennyslasku, näkösanat tunnistaminen, luetun ymmärtäminen, oikeinkirjoitus harjoitus, tunnekasvatus, empatia, itsesäätelytaidot, tunnetehtävät 1. luokka, tunteiden oppiminen 6-7v',
      intro: 'Ensimmäisen luokan oppilaat ovat valmiita tunneaiheisiin työlehteiin, jotka siirtyvät tunnistamisesta analyysiin, empatiaan ja itsensäätelystrategioiden rakentamiseen. Kuusi- ja seitsemänvuotiaat osaavat lukea yksinkertaisia tekstejä itsenäisesti, ratkaista monivaiheisia ongelmia ja harjoittaa aitoa perspektiivinottoa ohjattujen tehtävien tukemana. Tämän tason tunneaiheiset työlehdet esittävät monimutkaisempia skenaarioita, joissa hahmot kokevat ristiriitaisia tunteita tai joissa sama tapahtuma herättää eri tunteita eri ihmisissä, haastaen lapsia ajattelemaan kriittisesti tunnekokemuksen subjektiivisesta luonteesta. Matematiikkatehtävät käyttävät tunneaiheista tiedonkeruuta pyytäen lapsia kyselemään luokkatovereilta suosikkitunteista, luomaan tukkimiehen kirjanpitoa ja vertaamaan tuloksia. Lukutehtävät sisältävät lyhyitä tekstejä hahmoista, jotka navigoivat sosiaalisia haasteita, ymmärtämiskysymysten vaatiessa tunteiden tunnistamista, reaktioiden ennustamista ja strategioiden ehdottamista. Sanapulmat esittelevät edistynyttä tunnesanastoa kuten ylikuormittunut, pettynyt, päättäväinen ja myötätuntoinen laajentaen sanastoa, jota lapset käyttävät yhä monimutkaisemman sisäisen maailmansa kuvaamiseen. Ensimmäinen luokka on aikaa, jolloin lapset alkavat sisäistää itsensäätelystrategioita, ja työlehdet, jotka esittävät tilanteita yhdistettynä selviytymisvaihtoehtoihin kuten syvä hengitys, ystävälle puhuminen tai piirtäminen tunteista, antavat lapsille valikoiman terveitä reaktioita, joita he voivat harjoitella paperilla ja soveltaa oikeassa elämässä.',
      objectives: [
        { skill: 'Analysoi skenaarioita, joihin liittyy ristiriitaisia tai sekoittuneita tunteita, ja selitä hahmojen näkökulmia', area: 'social' },
        { skill: 'Lue lyhyitä tekstejä tunnetilanteista ja vastaa päättelyyn perustuviin ymmärtämiskysymyksiin', area: 'literacy' },
        { skill: 'Kerää ja vertaa tunneaiheista dataa tukkimiehen kirjanpidon ja yksinkertaisten kaavioiden avulla', area: 'math' },
      ],
      developmentalNotes: 'Ensimmäisen luokan oppilaat ovat kehittäneet riittävän mieliteorian ymmärtääkseen, että kaksi ihmistä voi tuntea eri tavalla samasta tapahtumasta. Heidän kasvava lukutaitonsa mahdollistaa itsenäisen työskentelyn skenaariopohjaisissa työlehdentehtävissä. Tunne-elämän osalta he alkavat sisäistää itsensäätelystrategioita, ja työlehdet, jotka esittävät selviytymistaitovaihtoehtoja, antavat heille konkreettisen viitepisteen, jonka he voivat visualisoida todellisten tunnehetkien aikana.',
      teachingTips: [
        'Käytä tunnelukutekstejä ponnahduslautana luokkakeskusteluille siitä, miten hahmot voisivat reagoida eri tavoin, mallintaen selviytymisstrategioiden tuottamisen ja arvioinnin prosessia.',
        'Pyydä oppilaita luomaan omia tunneskenaariotyölehtiä luokkatovereiden ratkaistavaksi, mikä syventää sekä kirjoitustaitoja että empatiaa heidän joutuessaan kuvittelemaan, miltä erilaiset tilanteet tuntuisivat.',
      ],
      faq: [
        { question: 'Miten ensimmäisen luokan tunneaiheiset työlehdet eroavat esiopetuksen versioista?', answer: 'Ensimmäisen luokan työlehdet siirtyvät perustunnistamisesta analyysiin ja strategiaan. Sen sijaan, että vain nimettäisiin tunne, lapset analysoivat, miksi hahmo tuntee niin, pohtivat, miten muut saattaisivat tuntea eri tavalla, ja arvioivat selviytymisstrategioita. Lukutekstit ja monivaiheiset skenaariot korvaavat yksinkertaisen yhdistämisen heijastaen ensimmäisen luokan akateemista ja tunne-elämän kypsyyttä.' },
        { question: 'Voivatko tunneaiheiset työlehdet auttaa ensimmäisen luokan ystävyyshaasteiden kanssa?', answer: 'Kyllä. Skenaariopohjaisten työlehdentehtävien avulla käsitellään yleisiä sosiaalisia tilanteita kuten ulkopuolelle jääminen, eri mieltä oleminen ystävän kanssa tai mustasukkaisuuden tunteminen. Lapset harjoittelevat tunteiden tunnistamista ja sopivien reaktioiden valitsemista paperilla rakentaen strategioiden työkalupakin, jota he voivat hyödyntää todellisten ystävyyshaasteiden kohdatessa.' },
        { question: 'Miten tunneaiheiset työlehdet rakentavat ensimmäisen luokan kirjoitustaitoja?', answer: 'Ne tarjoavat erittäin motivoivia kirjoitusaiheita, koska lapset kirjoittavat omista kokemuksistaan ja tunteistaan. Tehtävät, joissa lapsia pyydetään kuvailemaan kertaa, jolloin he tunsivat ylpeyttä, kirjoittamaan siitä, mikä auttaa heitä rauhoittumaan, tai laatimaan kirjeen surulliselle ystävälle, kehittävät lauserakennetta ja henkilökohtaisen kerronnan taitoja samalla kun vahvistavat tunnesanastoa.' },
      ],

      snippetAnswer: 'Tunneaiheiset työlehdet ensimmäiselle luokalle (6–7-vuotiaat) kehittävät tunnesanaston laajentamista ja tunteiden tunnistamista erilaisissa tilanteissa, vahvistavat empatiaa ja sosiaalisia taitoja sekä opettavat tunteiden säätelyn strategioita. POPS 2014:n tunne- ja vuorovaikutustaitojen tavoitteet toteutuvat.',
      uniqueGradeAngle: 'Ensimmäisellä luokalla tunneteema saa sosiaalisen ja kognitiivisen syvyyden, koska kuusi- ja seitsemänvuotiaat kykenevät ensimmäistä kertaa reflektoimaan omia tunteitaan kirjallisesti ja ymmärtämään, että tunteet vaikuttavat käyttäytymiseen. POPS 2014:n laaja-alainen osaaminen edellyttää tunne- ja vuorovaikutustaitojen kehittämistä. Ensimmäisen luokan oppilas lukee tarinoita, joissa hahmoilla on erilaisia tunteita, ja tunnistaa tunteiden syitä ja seurauksia. Tunnesanasto laajenee perusnimistä (iloinen, surullinen) vivahteikkaammaksi (pettynyt, ylpeä, jännittynyt, helpottunut). Empatia kehittyy, kun oppilas pohtii miltä toisesta tuntuu ja miten voi lohduttaa. Tunteiden säätelyn strategiat (hengittäminen, puhuminen, rauhallisen paikan etsiminen) tulevat tietoisiksi. Kirjoittaminen yhdistyy tunnepäiväkirjaan ja tarinoiden kirjoittamiseen. Luokkayhteisön rakentaminen on ensimmäisen luokan keskeinen tehtävä, ja tunnetaidot ovat sen perusta.',
      developmentalMilestones: [
        { milestone: 'Tunnesanaston laajentaminen (6–7-vuotiaat oppivat vivahteikkaan tunnekielen)', howWeAddress: 'Tunnesanastotehtävät, joissa oppilas yhdistää tilanteen oikeaan tunteeseen ja nimeää sen, laajentavat tunnekieltä perusnimien yli' },
        { milestone: 'Tunteiden syiden ja seurausten ymmärtäminen (ensimmäisen luokan oppilaat analysoivat tunnereaktioita)', howWeAddress: 'Tarinatehtävät, joissa oppilas lukee tilanteen ja päättelee hahmon tunteen sekä sen syyn, kehittävät emotionaalista lukutaitoa' },
        { milestone: 'Empatiataitojen kehittyminen (kuusi- ja seitsemänvuotiaat ottavat toisen näkökulman)', howWeAddress: 'Näkökulmatehtävät, joissa oppilas kirjoittaa miltä toisesta henkilöstä tuntuu ja miten häntä voi auttaa, kehittävät sosiaalista herkkyyyttä' },
        { milestone: 'Tunteiden säätelyn strategiat (ensimmäisen luokan oppilaat oppivat rauhoittumiskeinoja)', howWeAddress: 'Strategiatehtävät, joissa oppilas valitsee tilanteeseen sopivan rauhoittumiskeinon ja perustelee valintansa, rakentavat itsensäätelyn taitoja' },
      ],
      differentiationNotes: 'Tukea tarvitseville ensimmäisen luokan oppilaille rajaa tunnesanasto kuuteen perustunteeseen, käytä tunnekasvokuvia tunnistamisen tueksi ja anna säätelystrategioissa konkreettiset kuvakortit. Edistyneille ensimmäisen luokan oppilaille laajenna tunnesanasto kahteentoista tunteeseen sisältäen sekatunteet, lisää monimutkaiset empatiatilanteet ja haasta kirjoittamaan oma tunnetarina kahdella päähenkilöllä.',
      parentTakeaway: 'Ensimmäisen luokan tunnetyIölehdet antavat sanoja tunteille. Kysykää päivittäin: miltä sinusta tuntui tänään? Opettakaa vivahteikkaampia tunnenimiIä: pettynyt on eri asia kuin vihainen, jännittynyt on eri asia kuin pelokas. Kun lapsi on turhautunut, harjoitelkaa yhdessä hengitystekniikkaa: hengitä sisään neljään laskien, ulos kuuteen laskien. Tärkeintä on osoittaa, että kaikki tunteet ovat sallittuja ja että tunteille voi oppia hallintakeinoja.',
      classroomIntegration: 'Tunnetyyölehdet ovat ensimmäisen luokan yhteisöllisyyden rakentamisen väline: aamupiirissä valitaan päivän tunne ja keskustellaan siitä, työlehtihetkellä harjoitellaan tunnesanastoa ja empatiaa, ja riitatilanteet ratkaistaan opittuja strategioita käyttäen. Tunnepäiväkirja on koko lukuvuoden kestävä projekti. POPS 2014:n tunne- ja vuorovaikutustaitojen tavoitteet toteutuvat päivittäisessä luokkayhteissössä.',
      assessmentRubric: [
        { skill: 'Tunnesanasto', emerging: 'nimeää neljä perustunnetta (iloinen, surullinen, vihainen, pelokas)', proficient: 'käyttää kahdeksaa tunneniMeä oikein ja erottaa lähikIäsitteet (esim. pettynyt vs. surullinen)', advanced: 'käyttää kahtatoista tunneniMeä sisältäen sekatunteet ja selittää eroja vivahteikkaasti' },
        { skill: 'Empatia ja näkökulmanotto', emerging: 'tunnistaa toisen ilon tai surun selkeässä tilanteessa', proficient: 'päättelee hahmon tunteen tarinasta ja ehdottaa miten auttaa', advanced: 'ottaa useamman henkilön näkökulman samasta tilanteesta ja pohtii ristiriitaisia tunteita' },
        { skill: 'Tunteiden säätely', emerging: 'nimeää yhden rauhoittumiskeinon', proficient: 'valitsee tilanteeseen sopivan strategian ja perustelee valintansa', advanced: 'arvioi useita strategioita, valitsee tehokkaimman ja opastaa vertaistaan rauhoittumisessa' },
      ],
    },
    'second-grade': {
      seoTitle: 'Tunnetehtävät 2. Luokalle — Tunnetaidot ja Data | LCS',
      seoDescription: 'Tulostettavia tunnetehtäviä 2. luokalle (7–8v). Analysoi tunnetilastoja, kirjoita tunnekuvauksia ja harjoittele empatiaa. Ilmaisia työlehtiä.',
      seoKeywords: 'tunnetehtävät 2. luokalle, kertotaulu harjoittelu, data-analyysi oppiminen, tietoteksti lukeminen, paikka-arvo ymmärtäminen, tunnekasvatus, empatia, itsesäätelytaidot, tunnetehtävät 2. luokka, tunteiden oppiminen 7-8v',
      intro: 'Toisen luokan oppilaat tuovat luetun ymmärtämisen, analyyttisen päättelyn ja kirjoituksen sujuvuuden tunneaiheisiin työlehdentehtäviin aidosti muuttavalla tasolla, siirtyen tunteiden tunnistamisesta tunnetilanteiden analysoimiseen, selviytymisstrategioiden arvioimiseen ja harkittuun kirjoittamiseen ihmisen tunnekokemuksen monimutkaisuudesta. Seitsemän- ja kahdeksanvuotiaat osaavat lukea monikappaleisia tekstejä itsenäisesti, laatia järjesteltyjä kirjallisia vastauksia ja ajatella kriittisesti siitä, miksi ihmiset tuntevat eri tavalla samassa tilanteessa, mikä tekee heistä valmiita tunne- ja vuorovaikutustaitojen tehtäviin, jotka kehittävät samanaikaisesti sekä akateemisia taitoja että tunneälyä. Lukutehtävät esittävät pidempiä kertomuksia, joissa hahmot kohtaavat realistisia sosiaalisia ongelmatilanteita kuten pelistä ulkopuolelle jääminen, kritiikin saaminen työstä tai todistaminen ystävän epäreilua kohtelua, ja ymmärtämiskysymykset vaativat oppilaita tunnistamaan useita tunteita, joita hahmo saattaa tuntea, analysoimaan miksi eri hahmot reagoivat eri tavalla ja arvioimaan, mitkä selviytymisstrategiat olisivat tehokkaimpia. Matematiikkatehtävät käyttävät tunnedataa kehittyneemmällä tasolla esittäen kyselytuloksia siitä, miten oppilaat tuntevat eri tilanteista, ja pyytäen lapsia tulkitsemaan pylväskaavioita, laskemaan eroja ja tekemään todisteisiin perustuvia johtopäätöksiä tunnemalleista. Sanasto laajenee dramaattisesti sisältäen vivahteikkaita sanoja kuten ristiriitainen, empaattinen, sisukas, ylikuormittunut, kiitollinen ja huolestunut antaen oppilaille tarkkuusinstrumentteja sisäisen maailmansa kuvaamiseen. Kirjoitustehtävät pyytävät oppilaita kirjoittamaan henkilökohtaisia kertomuskappaleita voimakkaasta tunnekokemuksesta, mielipidekirjoituksia siitä, mikä selviytymisstrategia toimii parhaiten ja miksi, tai hahmonanalyysikappaleita, joissa selitetään, miksi tarinahahmo teki tietyn valinnan.',
      objectives: [
        { skill: 'Analysoi monihenkilöskenaarioita tunnistaaksesi erilaisia tunnenäkökulmia ja arvioi sopivia reaktioita', area: 'social' },
        { skill: 'Lue kertovia tekstejä tunnetilanteista ja kirjoita hahmoa analysoivia kappaleita tekstin todistusaineistoa käyttäen', area: 'literacy' },
        { skill: 'Tulkitse tunneaiheista kyselydataa kaavioista ja taulukoista ja tee todisteisiin perustuvia johtopäätöksiä malleista', area: 'math' },
      ],
      developmentalNotes: 'Toisen luokan oppilaat ovat kehittäneet riittävän mieliteorian ymmärtääkseen, että sama tapahtuma voi tuottaa erilaisia tunteita eri ihmisissä heidän näkökulmiensa ja kokemustensa perusteella. Heidän kirjoituskykynsä mahdollistavat vivahteikkaan tunnepäättelyn ilmaisemisen järjestetyissä kappaleissa. Sosiaalisesti he ovat yhä tietoisempia ryhmädynamiikasta, reiluudesta ja sosiaalisista normeista, mikä tekee skenaariopohjaisista työlehdentehtävistä osallisuudesta, ristiriidoista ja empatiasta sekä ajankohtaisia että syvästi kiinnostavia.',
      teachingTips: [
        'Esitä skenaario, jossa kaksi hahmoa tuntee eri tavalla samasta tapahtumasta, ja pyydä oppilaita kirjoittamaan kappale kummankin hahmon näkökulmasta rakentaen empatiaa ja perspektiivinottoa jäsennellyn kirjoitusharjoittelun kautta.',
        'Luo luokan tunnekysely, jossa oppilaat raportoivat nimettömästi, miltä heistä tuntuu eri koulutilanteissa, ja käytä koottua dataa matikkatunnilla pylväskaavioiden tulkitsemiseen ja sen pohtimiseen, mitä mallit paljastavat jaetuista kokemuksista.',
      ],
      faq: [
        { question: 'Miten toisen luokan tunneaiheiset työlehdet eroavat aiemmista luokista akateemisessa vaativuudessa?', answer: 'Ne siirtyvät tunnistamisesta analyysiin ja arviointiin. Sen sijaan, että nimettäisiin tunne, oppilaat analysoivat, miksi hahmot tuntevat eri tavalla samasta tapahtumasta, arvioivat useita selviytymisstrategioita ja argumentoivat kirjallisesti tehokkaimpana pitämänsä puolesta. Lukutekstit ovat monikappaleisia kertomuksia, jotka vaativat päättelyä, ja kirjoitustehtävät edellyttävät järjesteltyjä kappaleita todisteineen.' },
        { question: 'Voivatko tunneaiheiset työlehdet auttaa toisen luokan oppilaita kiusaamisen ja syrjinnän kanssa?', answer: 'Kyllä. Skenaariopohjaisten työlehdentehtävien avulla käsitellään realistisia tilanteita, joihin liittyy syrjintää, kiusaamista ja epäreiluutta, jäsennellyssä muodossa, joka mahdollistaa oppilaiden analysoida tunteita, pohtia useita näkökulmia ja arvioida reagointistrategioita ennen kuin he kohtaavat vastaavia tilanteita oikeassa elämässä.' },
        { question: 'Miten toisen luokan tunneaiheiset työlehdet integroituvat akateemisten kirjoitustavoitteiden kanssa?', answer: 'Oppilaat kirjoittavat henkilökohtaisia kertomuksia tunnekokemuksista selkeällä alku-, keski- ja loppurakenteella. He laativat mielipidekappaleita, joissa argumentoivat tiettyjen selviytymisstrategioiden puolesta tukevilla perusteilla. He tuottavat hahmoa analysoivia kappaleita tekstin todistusaineistoa käyttäen. Tämä kirjoitustarkoitusten kirjo vastaa suoraan toisen luokan kerronta-, mielipide- ja tietokirjoittamisen tavoitteita.' },
      ],

      snippetAnswer: 'Tunneaiheiset työlehdet toiselle luokalle (7–8-vuotiaat) syventävät tunteiden säätelyn strategioita ja ristiriitatilanteiden ratkaisutaitoja, kehittävät näkökulmanottoa useamman henkilön tilanteissa sekä vahvistavat reflektoivaa kirjoittamista tunnepäiväkirjan avulla. POPS 2014:n tunne- ja vuorovaikutustaitojen vuosiluokkien 1–2 päättötavoitteet toteutuvat.',
      uniqueGradeAngle: 'Toisella luokalla tunneteema saavuttaa strategisen syvyyden, koska seitsemän- ja kahdeksanvuotiaat kykenevät tunnistamaan oman tunnereaktionsa, pysähtymään ja valitsemaan tietoisesti säätelystrategian. POPS 2014:n päättötavoitteet edellyttävät tunne- ja vuorovaikutustaitojen hallintaa. Toisen luokan oppilas ei vain nimeä tunteita vaan analysoi tunnereaktioiden ketjuja: tilanne–ajatus–tunne–toiminta. Ristiriitatilanteiden ratkaisutaidot kehittyvät: oppilas harjoittelee neuvottelua, kompromissia ja sovittelua. Näkökulmanotto syventyy useamman henkilön tilanteisiin: samassa tilanteessa eri ihmiset tuntevat eri tavoin. Reflektoiva kirjoittaminen tunnepäiväkirjassa kehittää metakognitiota: oppilas kirjoittaa päivän kokemuksista, tunnistaa tunteensa ja arvioi valintojaan. Sekatunteiden ymmärrys alkaa: voi olla samaan aikaan jännittynyt ja innostunut.',
      developmentalMilestones: [
        { milestone: 'Tunnereaktioketjun analysointi (7–8-vuotiaat ymmärtävät tilanne–ajatus–tunne–toiminta-yhteyden)', howWeAddress: 'Ketjutehtävät, joissa oppilas purkaa tilanteen osiin: mitä tapahtui, mitä ajattelin, mitä tunsin, mitä tein, kehittävät tunnetietoisuutta' },
        { milestone: 'Ristiriitatilanteiden ratkaiseminen (toisen luokan oppilaat harjoittelevat neuvottelua ja kompromissia)', howWeAddress: 'Tilannetehtävät, joissa oppilas lukee ristiriitatilanteen ja ehdottaa useita ratkaisuvaihtoehtoja perusteluineen, kehittävät sosiaalisia taitoja' },
        { milestone: 'Monen näkökulman huomioiminen (seitsemän- ja kahdeksanvuotiaat ymmärtävät että eri ihmiset tuntevat eri tavoin)', howWeAddress: 'Näkökulmatehtävät, joissa oppilas kirjoittaa saman tilanteen kolmen henkilön näkökulmasta, syventävät empatiaa ja perspektiivinottoa' },
        { milestone: 'Reflektoiva kirjoittaminen tunnepäiväkirjassa (toisen luokan oppilaat arvioivat omia tunteitaan ja valintojaan)', howWeAddress: 'Päiväkirjatehtävät, joissa oppilas kirjoittaa päivän tapahtumista, tunnistaa tunteensa ja arvioi mitä voisi tehdä toisin, kehittävät metakognitiota' },
      ],
      differentiationNotes: 'Tukea tarvitseville toisen luokan oppilaille rajaa tunnereaktioketju kolmeen osaan, anna ristiriitatilanteissa valmiit ratkaisuvaihtoehdot valittavaksi ja tarjoa päiväkirjassa tunnemittari (hymynaamat) kirjoittamisen tueksi. Edistyneille toisen luokan oppilaille laajenna sekatunteiden analyysi, lisää neljän henkilön näkökulmatilanne ja haasta kirjoittamaan novellimainen tunnetarina eri hahmojen näkökulmista.',
      parentTakeaway: 'Toisen luokan tunnetyIölehdet opettavat itsensäätelyä. Harjoitelkaa kotona tunnereaktioketjua: mitä tapahtui, mitä tunsit, mitä teit? Pohtikaa yhdessä vaihtoehtoisia toimintatapoja: mitä olisit voinut tehdä toisin? Pitäkää yhdessä tunnepäiväkirjaa: kirjoittakaa iltaisin yksi asia joka teki iloiseksi ja yksi asia joka oli vaikea. Tärkeintä on opettaa, että tunteet ovat tietoa ja niitä voi oppia hallitsemaan.',
      classroomIntegration: 'Tunnetyyölehdet ovat toisen luokan yhteisöllisyyden huipentuma: aamupiirissä harjoitellaan tunnecheck-iniä, työlehtihetkellä analysoidaan tunnereaktioketjuja ja ristiriitatilanteita, luokan sovittelumalli perustuu opituille taidoille. TunnepIäiväkirja kestää koko lukuvuoden. POPS 2014:n vuosiluokkien 1–2 päättöarvioinnissa tunneteema osoittaa tunne- ja vuorovaikutustaitojen kehityksen.',
      assessmentRubric: [
        { skill: 'Tunnereaktioketjun analysointi', emerging: 'nimeää tunteen tilanteessa mutta ei erittele ketjun osia', proficient: 'purkaa tilanteen osiin (tilanne–ajatus–tunne–toiminta) ja selittää yhteydet', advanced: 'analysoi monimutkaisia tilanteita, tunnistaa sekatunteita ja ehdottaa vaihtoehtoisia ajatus- ja toimintamalleja' },
        { skill: 'Ristiriitatilanteiden ratkaiseminen', emerging: 'ehdottaa yhtä ratkaisua aikuisen tuella', proficient: 'ehdottaa kolme ratkaisuvaihtoehtoa, arvioi seurauksia ja valitsee parhaan perusteluineen', advanced: 'sovittelee ristiriitatilanteen useamman osapuolen näkökulmasta ja löytää kaikkia tyydyttävän ratkaisun' },
        { skill: 'Reflektoiva kirjoittaminen', emerging: 'kirjoittaa mitä tapahtui mutta ei tunnista tunteita', proficient: 'kirjoittaa tapahtuman, tunnistaa tunteensa ja arvioi omaa toimintaansa', advanced: 'kirjoittaa syvIällisen reflektion usealla näkökulmalla, tunnistaa sekatunteet ja suunnittelee kehittymistavoitteen' },
      ],
    },
    'third-grade': {
      seoTitle: 'Tunnetehtävät 3. Luokalle — Tutkimus ja Hyvinvointi | LCS',
      seoDescription: 'Tulostettavia tunnetehtäviä 3. luokalle (8–9v). Kirjoita tunnetutkimuksia, analysoi tilanteita ja ratkaise sosiaalisia pulmia. Ilmaisia työlehtiä.',
      seoKeywords: 'tunnetehtävät 3. luokalle, kertolasku jakolasku, tutkimusraportti kirjoittaminen, mielipidekirjoitus harjoitus, kriittinen ajattelu, tunnekasvatus, empatia, itsesäätelytaidot, tunnetehtävät 3. luokka, tunteiden oppiminen 8-9v',
      intro: 'Kolmannen luokan oppilaat tuovat kertolaskuun perustuvan data-analyysin, reflektiivisen kirjoittamisen kyvyn ja kasvavan abstraktin ajattelun kapasiteetin tunneaiheisiin työlehteiin, jotka siirtyvät tunteiden nimeämisestä tunteiden tieteen tutkimiseen, tunnedatan mallien analysoimiseen ja todistusaineistoon perustuvien tunnensäätelystrategioiden kehittämiseen. Kahdeksan- ja yhdeksänvuotiaat osaavat kertoa ja jakaa sadan sisällä, luoda ja tulkita kaavioita ja laatia järjesteltyjä monikappaaleisia esseitä jäsennellyillä kappaleilla ja tarkalla sanastolla, mikä tekee heistä valmiita työlehteille, jotka lähestyvät tunneälyä sekä tieteellisellä tarkkuudella että henkilökohtaisella syvyydellä. Kertolasku ohjaa kyselydatan analyysia tehtävillä kuten jos kaksitoista oppilasta raportoi tuntevansa itseluottamusta, yhdeksän huolestuneisuutta ja kuusi innostusta ennen koetta, kuinka monta vastausta kerättiin yhteensä, ja jos kysely tehtiin kolmelle eri luokalle, käytä kertolaskua arvioidaksesi koululaajuisia kokonaismääriä. Kaavioiden luominen tulee keskeiseksi oppilaiden laatiessa pylväskaavioita, jotka esittävät tunnekuulumisten tuloksia viikon ajalta, vertaillessa eri tunteiden esiintymistiheyksiä kertolaskuun perustuvan skaalauksen avulla ja tulkitessa datansa malleja johtopäätösten tekemiseksi siitä, milloin ja miksi tietyt tunteet ovat vallitsevia. Lukutekstit laajenevat käsittelemään tunneälyä, aivojen tunteidenkäsittelyn neurotiedettä, miten eri kulttuurit ilmaisevat ja arvostavat erilaisia tunnetiloja ja todistusaineistoon perustuvaa tutkimusta siitä, mitkä selviytymisstrategiat ovat tehokkaimpia voimakkaiden tunteiden hallinnassa. Reflektiivinen kirjoittaminen saavuttaa uuden tason oppilaiden laatiessa monikappaleisia esseitä tunnekokemuksista jäsentäen pohdintansa johdannoilla, jotka luovat kontekstin, analysoivilla kappaleilla, jotka käyttävät tarkkaa sanastoa kuten turhautunut, ylikuormittunut ja päättäväinen, ja johtopäätöksillä, jotka yhdistävät henkilökohtaisen kokemuksen laajempiin oivalluksiin tunnekasvusta.',
      objectives: [
        { skill: 'Käytä kertolaskua ja kaavioiden luomista tunnemalleja ja hyvinvointia koskevien kyselytietojen analysointiin', area: 'math' },
        { skill: 'Kirjoita reflektiivisiä monikappaleisia esseitä tunnekokemuksista jäsennellyillä kappaleilla ja tarkalla sanastolla', area: 'literacy' },
        { skill: 'Arvioi tunnensäätelystrategioita analysoimalla todistusaineistoa useista tietolähteistä', area: 'cognitive' },
      ],
      developmentalNotes: 'Kolmannen luokan oppilaat ovat kehityksellisesti valmiita syvempään tunneanalyysiin siirtyen tunteiden nimeämisestä sen ymmärtämiseen, miksi tunteita syntyy ja miten niitä voidaan hallita rakentavasti. Heidän kasvava abstraktin ajattelun kapasiteettinsa mahdollistaa aivotieteen ymmärtämisen esittelytasolla ja reflektiivisen kirjoittamisen sisäisistä kokemuksistaan.',
      teachingTips: [
        'Suunnittele luokan tunnekyselyprojekti, jossa oppilaat luovat kysymyksiä tunnepohjaisesta hyvinvoinnista, keräävät dataa luokkatovereilta, käyttävät kertolaskua vastaustusumman laskemiseen useiden luokkien yli, luovat pylväskaavioita tuloksista ja kirjoittavat analyyttisiä kappaleita löytämiensä mallien tulkitsemiseksi.',
        'Luo tunnensäätelytutkimusprojekti, jossa oppilaat tutkivat kolmea eri selviytymisstrategiaa useista lähteistä, järjestävät todistusaineiston tehokkuudesta vertailutaulukkoon ja kirjoittavat monikappaleisen esseen, jossa suosittelevat tehokkainta strategiaa tukevilla perusteilla ja tutkimustodistusaineistolla.',
      ],
      faq: [
        { question: 'Miten kolmannen luokan tunneaiheiset työlehdet kehittävät data-analyysitaitoja kyselyjen avulla?', answer: 'Oppilaat suunnittelevat kyselykysymyksiä tunnepohjaisesta hyvinvoinnista, keräävät vastauksia luokkatovereilta, käyttävät kertolaskua summien laskemiseen ja koululaajuisten tulosten arvioimiseen, luovat pylväskaavioita datastaan, laskevat keskiarvoja jakolaskulla ja kirjoittavat analyyttisiä kappaleita mallien tulkitsemiseksi. Tämä prosessi opettaa tiedonkeruun, järjestämisen, analyysin ja viestinnän koko syklin.' },
        { question: 'Mitä reflektiivisen kirjoittamisen taitoja tunneaiheiset työlehdet rakentavat kolmannen luokan tasolla?', answer: 'Oppilaat laativat monikappaleisia esseitä tunnekokemuksista jäsennellyillä johdannoilla, tunnereaaktioitaan tarkalla tunnesanastolla analysoivilla kappaleilla ja johtopäätöksillä, jotka yhdistävät henkilökohtaiset kokemukset laajempiin oivalluksiin. He oppivat erottamaan tapahtuneen kuvailun ja sen analysoinnin, miksi he tunsivat tietyllä tavalla.' },
        { question: 'Miten tunneaiheiset työlehdet tukevat tunne- ja vuorovaikutustaitojen oppimista akateemisten taitojen rinnalla?', answer: 'Jokainen akateeminen tehtävä rakentaa samanaikaisesti tunneälyä. Kyselyprojektit kehittävät empatiaa luokkatovereiden tunteiden ymmärtämisen kautta, selviytymisstrategioiden tutkiminen tarjoaa käytännön säätelyvälineitä, reflektiivinen kirjoittaminen syventää itsetuntemusta ja data-analyysi paljastaa, että tunnekokemukset noudattavat malleja, joita voidaan ymmärtää ja hallita rakentavasti.' },
      ],

      snippetAnswer: 'Tunneaiheiset työlehdet kolmannelle luokalle (8–9-vuotiaat) kehittävät tunneälyn järjestelmällistä analysointia näkökulmanvaihtotehtävillä, vahvistavat konflikTinratkaisun strategista suunnittelua sekä opettavat empatian ja sosiaalisten taitojen argumentoivaa käsittelyä tutkimusraporteissa. POPS 2014:n vuosiluokkien 3–6 sosiaalis-emotionaalisen oppimisen tavoitteet käynnistyvät.',
      uniqueGradeAngle: 'Kolmannella luokalla tunneteema kehittyy tunnistamisesta järjestelmälliseksi analyysiksi ja strategiseksi soveltamiseksi. Kahdeksan- ja yhdeksänvuotiaat kykenevät abstraktimpaan näkökulmanvaihtoon: he voivat pohtia miltä toisesta tuntuu ja miksi, ja kirjoittaa analyyttisesti eri näkökulmista. Konfliktin ratkaiseminen etenee spontaanista reaktiosta suunniteltuun strategiaan: ongelman tunnistaminen, eri ratkaisuvaihtoehtojen arviointi, seurausten ennakointi. Empatian käsitteleminen tutkimusraporttina vaatii tiedonhankintaa ja lähteiden käyttöä. Tunteiden vaikutus oppimiseen ja päätöksentekoon avautuu tieteellisenä kysymyksenä: miten jännitys vaikuttaa koetulokseen. Kertolaskusujuvuus mahdollistaa tunnetutkimusdatan käsittelyn: luokan 24 oppilasta, 8 valitsi ilon — kolmasosa. Argumentoiva kirjoittaminen tunnetaidoista vaatii näyttöön perustuvaa päättelyä.',
      developmentalMilestones: [
        { milestone: 'Abstraktin näkökulmanvaihdon hallitseminen (8–9-vuotiaat analysoivat tilanteita eri näkökulmista)', howWeAddress: 'Näkökulmatehtävät, joissa oppilas analysoi sosiaalisia tilanteita usean henkilön näkökulmasta, kirjoittaa kunkin ajatukset ja tunteet ja tekee johtopäätöksiä' },
        { milestone: 'Konfliktinratkaisun strateginen suunnittelu (kolmannen luokan oppilaat arvioivat vaihtoehtoja)', howWeAddress: 'Strategiatehtävät, joissa oppilas tunnistaa konfliktin, listaa ratkaisuvaihtoehdot, arvioi seuraukset ja valitsee perustellusti parhaan strategian' },
        { milestone: 'Tunnetaitojen tutkiminen ja raportointi (kahdeksan- ja yhdeksänvuotiaat tutkivat empatian vaikutuksia)', howWeAddress: 'Tunnetutkimusprojektit, joissa oppilas kerää tietoa empatian tai tunnesäätelyn vaikutuksista ja kirjoittaa tutkimusraportin lähteisiin perustuen' },
        { milestone: 'Tunteiden ja oppimisen yhteyden analysointi (kolmannen luokan oppilaat reflektoivat metakognitiivisesti)', howWeAddress: 'Oppimisreflektiotehtävät, joissa oppilas tutkii miten tunteet (jännitys, innostus, turhautuminen) vaikuttavat omaan oppimiseen ja kirjoittaa analyyttisen reflektioesseen' },
      ],
      differentiationNotes: 'Tukea tarvitseville kolmannen luokan oppilaille rajaa näkökulmat kahteen henkilöön, anna konfliktinratkaisuun valmiit vaihtoehdot ja tarjoa raporttiin kuvalliset tukimateriaalit. Edistyneille kolmannen luokan oppilaille laajenna analyysi monimutkaisiin sosiaalisiin tilanteisiin usealla osapuolella, lisää psykologisen tutkimuksen perusteita ja haasta suunnittelemaan luokan tunnetaitokampanja perustellusti.',
      parentTakeaway: 'Kolmannen luokan tunnetyölehdet kehittävät empatiaa ja strategista ajattelua. Keskustelkaa yhdessä arjen tilanteista: miltä kaverista tuntui kun näin tapahtui? Harjoitelkaa ongelmien ratkaisua: mitä vaihtoehtoja on, mitkä seuraukset? Tutkikaa yhdessä: miten jännitys vaikuttaa suoritukseen? Tärkeintä on opettaa, että tunteita voi ymmärtää ja hallita tietoisesti.',
      classroomIntegration: 'Tunnetyölehdet integroituvat kolmannen luokan ympäristöoppiin, äidinkieleen ja koulun arkeen: näkökulmanvaihtotehtävät draamaharjoituksina, konfliktinratkaisustrategiat luokan sääntöjen yhteydessä, tunnetutkimusraportit tietotekstijaksossa ja oppimisreflektiot itsearviointijaksoissa. POPS 2014:n vuosiluokkien 3–6 ihmisuhteiden ja vuorovaikutuksen tavoitteet toteutuvat.',
      assessmentRubric: [
        { skill: 'Näkökulmanvaihdon hallinta', emerging: 'tunnistaa oman näkökulmansa mutta ei analysoi toisten tunteita', proficient: 'analysoi tilanteita usean henkilön näkökulmasta ja selittää tunteiden syitä', advanced: 'käsittelee monimutkaisia sosiaalisia tilanteita empaattisesti, tunnistaa piiloiset tunteet ja analysoi vuorovaikutusdynamiikkaa' },
        { skill: 'Konfliktinratkaisun strateginen suunnittelu', emerging: 'reagoi impulsIivisesti konfliktitilanteessa', proficient: 'tunnistaa ongelman, listaa vaihtoehdot ja valitsee perustellusti ratkaisun', advanced: 'suunnittelee monivaiheisen ratkaisustrategian, ennakoi seurauksia ja soveltaa joustavasti eri tilanteissa' },
        { skill: 'Tunnetaitojen tutkiminen ja raportointi', emerging: 'kuvailee omia tunteitaan mutta ei tutki laajemmin', proficient: 'tutkii empatian tai tunnesäätelyn vaikutuksia lähteisiin perustuen ja kirjoittaa jäsennellyn raportin', advanced: 'analysoi tunnetutkimusta kriittisesti, yhdistää omia havaintoja tieteelliseen tietoon ja ehdottaa sovelluksia' },
      ],
    },
  },

  // -- FAQ --
  faq: [
    { question: 'Millaisia tunneaiheisia työlehtiä voin luoda?', answer: 'Voit luoda laajan valikoiman tunneaiheisia työlehtiä, mukaan lukien ilmeiden yhdistämis- ja lajittelutehtäviä, tunnesanaston sanahakuja ja sana-arvauspellejä, ilmeikkäiden kasvojen värityskuvia, piirustustehtäviä, joissa lapset luovat omia tunnekuvituksiaan, yhteen- ja laskutehtäviä tunneaiheisilla laskureilla, tunteista kirjoittamisen tehtäviä ja ylimääräinen pois -pulmia, jotka haastavat lapsia tunnistamaan, mikä tunne ei kuulu joukkoon.' },
    { question: 'Ovatko tunneaiheiset työlehdet ilmaisia?', answer: 'Kyllä, LessonCraftStudiolla voit luoda ja ladata tunneaiheisia työlehtiä ilmaiseksi. Valitse haluamasi työlehden tyyppi, valitse tunneteema, mukauta asetuksia kuten vaikeustasoa ja kohteiden määrää ja luo tulostuskelpoinen PDF luokkahuoneen tai kodin oppimishetkeä varten.' },
    { question: 'Mille ikäryhmille tunneaiheiset työlehdet sopivat?', answer: 'Tunneaiheiset työlehdet on suunniteltu 3\u20139-vuotiaille lapsille esikoulusta kolmanteen luokkaan. Nuoremmat lapset työskentelevät perustunteiden kuten ilo, suru ja viha parissa selkeillä ilmekuvituksilla, kun taas vanhemmat oppilaat tutkivat vivahteikkaita tunteita kuten pettynyt, kiitollinen ja ylikuormittunut skenaariopohjaisilla tehtävillä ja luetun ymmärtämisellä.' },
    { question: 'Miten tunneaiheiset työlehdet tukevat tunnekasvatusohjelmia?', answer: 'Tunneaiheiset työlehdet tarjoavat konkreettista harjoitusmateriaalia, joka vahvistaa tunnekasvatuksen tavoitteita. Ne rakentavat tunnelukutaidon neljää ydintaitoa: tunteiden tunnistaminen itsessä, tunteiden tunnistaminen muissa, tunteiden syiden ymmärtäminen ja tunteiden hallintastrategioiden kehittäminen. Rauhallisena hetkenä harjoitellut työlehdet muuttuvat viitepisteiksi, joita lapset voivat hyödyntää todellisissa tunnetilanteissa.' },
    { question: 'Voivatko tunneaiheiset työlehdet auttaa lapsia, jotka kamppailevat tunteidensa ilmaisemisessa?', answer: 'Ehdottomasti. Lapsille, joille tunteiden sanoittaminen on vaikeaa, työlehdet tarjoavat visuaalisen ja kirjallisen vaihtoehdon. Tunteen kanssa täsmäävien kasvojen osoittaminen, tunnesanan ympyröiminen tai ilmeen piirtäminen antaa näille lapsille jäsennellyn polun tunneviestintään, joka voi vähitellen rakentaa kohti suullista ilmaisua.' },
    { question: 'Miten tunneaiheiset työlehdet opettavat empatiaa?', answer: 'Yhdistämis- ja lajittelutehtävät pyytävät lapsia pohtimaan, miltä hahmoista tuntuu eri tilanteissa, mikä on perspektiivinoton perusta. Kun lapsi katsoo skenaariota, jossa joku menettää lemmikin, ja valitsee surulliset kasvot, hän harjoittaa kognitiivista taitoa toisen ihmisen tunnetilan kuvittelemiseksi, mikä rakentaa suoraan empaattista kapasiteettia.' },
    { question: 'Sopivatko tunneaiheiset työlehdet tunneellisesti vaikeina aikoina?', answer: 'Tunneaiheiset työlehdet voivat olla erityisen hyödyllisiä haastavien ajanjaksojen aikana, koska ne normalisoivat koko tunteiden kirjoa. Rauhallisina hetkinä tehdyt tehtävät rakentavat sanastoa ja strategioita, joita lapset voivat käyttää vaikeina aikoina. Noudata kuitenkin aina lapsen johtoa äläkä pakota tunnekeskusteluja lapsen ollessa aktiivisesti ahdistunut.' },
    { question: 'Miten tunneaiheiset työlehdet kytkeytyvät lukutaitoihin?', answer: 'Tunnesanasto kuuluu henkilökohtaisesti merkityksellisimpään kieleen, jota lapset oppivat, mikä tekee siitä erittäin pysyvää. Sanahakutehtävät rakentavat kirjaintunnistusta ja visuaalista skannausta, kirjoitustehtävät kehittävät lauserakennetta ja henkilökohtaisen kerronnan taitoja, ja sana-arvauspeli vahvistavat foneemista tietoisuutta ja oikeinkirjoitusta \u2013 kaikki samalla laajentaen tunnesanastoa, joka tukee henkilöhahmojen motivaatioiden ymmärtämistä lukemisessa.' },
    { question: 'Miten tulostan tai lataan tunneaiheiset työlehdet?', answer: 'Kun olet muokannut työlehteäsi, napsauta luo-painiketta tulostuskelpoisen PDF:n luomiseksi. Voit sitten ladata tiedoston tietokoneellesi tai käyttää selaimesi tulostustoimintoa. Kaikki työlehdet on muotoiltu tavallisille letter- ja A4-paperikooille helppoa kotona tai koulussa tulostamista varten.' },
    { question: 'Kuinka usein lasten tulisi tehdä tunneaiheisia työlehtiä?', answer: 'Kahdesta kolmeen kertaa viikossa toimii hyvin, ihanteellisesti osana laajempaa tunnekasvatusrutiinia. Jokaisen kerran tulisi kestää kymmenestä viiteentoista minuuttiin nuoremmille lapsille ja enintään kaksikymmentä minuuttia vanhemmille. Johdonmukaisuus on tiheyttä tärkeämpää, sillä säännöllinen tunnesanaston parissa työskentely rakentaa kumulatiivista sujuvuutta, joka siirtyy todellisiin tunnetilanteisiin.' },
  ],

  // -- Cross-linking (IDENTICAL to English) --
  relatedThemes: ['body', 'music', 'pets', 'fairy-tales', 'school'],
  relatedBlogCategories: [],

  // -- SEO Enrichment (Part 179) --

  classroomScenarios: [
    {
      situation: 'Ekaluokan opettaja huomaa, että useat oppilaat eivät osaa nimetjä tunteitaan ja reagoivat voimakkaasti ristiriitatilanteissa ilman sanoja.',
      solution: 'Hän ottaa käyttöön tunneaiheiset työlehdet, joissa lapset tunnistavat ilmeitä, nimeävät tunteita ja lajittelevat tilanteita tunteiden mukaan. Jokainen työlehtihetki alkaa lyhyellä tunnekierroksella, jossa jokainen lapsi kertoo päivän tunteensa.',
      outcome: 'Neljän viikon jälkeen oppilaat käyttävät tunnesanoja spontaanisti ristiriitatilanteissa. Konflikttien määrä vähenee, ja opettaja raportoi, että luokan ilmapiiri on rauhallisempi.',
    },
    {
      situation: 'Vanhempi huomaa, että esikoululainen reagoi turhautumiseen itkulla tai kiukulla eikä osaa säädellä tunteitaan.',
      solution: 'Vanhempi käyttää tunneaiheisia väritys- ja piirustustyölehtiä iltahetkenä: lapsi värittää eri tunteita esittäviä kasvoja ja keskustelee vanhemman kanssa siitä, milloin hän itse tuntee samoin. Piirustustehtävät auttavat ilmaisemaan tunteita kuvallisesti.',
      outcome: 'Lapsi oppii nimeämään perustunteet ja alkaa kertoa tunteistaan sanallisesti turhautumisen sijaan. Vanhempi-lapsi-suhde vahvistuu yhteisten tunnehetkien myötä.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ikähaarukka', value: '3–9 vuotta' },
    { label: 'Työlehtisovellusten määrä', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus–3. lk' },
    { label: 'Keskimääräinen työskentelyaika', value: '10–20 min' },
    { label: 'Tunnekategorioiden kirjo', value: '8+ tunnetta' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota väritys- ja piirustustehtäviä, joissa ilmeiden ja eleiden kuvat tukevat tunteiden visuaalista tunnistamista. Tunteiden ja värien yhdistäminen auttaa luomaan muistisiltoja.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdistä työlehtiin kehollisia harjoituksia: lapsi näyttää tunteen ilmeen ja asennon ennen kuin värittää tai piirtää sen. Leikkaa ja liimaa -tehtävät, joissa yhdistetään tilanne ja tunne, tukevat konkreettista oppimista.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Tunnesanasto on universaalia — ilmeet ylittävät kielimuurit. Aloita ilmekuvista ja lisää suomenkielisiä tunnesanoja asteittain. Kaksikielinen tunnesanalista auttaa yhdistämään kotikielen tunnesanoihin.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta kirjoitustehtävillä, joissa oppilas kuvailee monimutkaisia tunnetilanteita ja ehdottaa ratkaisuja. Sana-arvoitustehtävät pitemmmillä tunnesanoilla kuten turhautunut ja innostunut tarjoavat kielellisen haasteen.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolioarviointi',
      criteria: 'Kerää tunnetyölehtiä lukukauden ajalta. Vertaa tunteiden tunnistamisen tarkkuutta, tunnesanaston laajuutta ja kirjallisten vastausten syvyyttä ajan mittaan.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Tunnekierros-havainnointi',
      criteria: 'Seuraa päivittäisissä tunnekierroksissa, laajeneeko lapsen tunnesanasto pelkästä iloisesta ja surullisesta monimuotoisempiin tunteisiin kuten ylpeä, pettynyt tai jännittynyt.',
      gradeLevel: 'Esiopetus–2. lk',
    },
    {
      method: 'Tilannekuva-arviointi',
      criteria: 'Näytä oppilaalle tilannekuvia ja pyydä tunnistamaan hahmojen tunteet sekä ehdottamaan, mitä hahmo voisi tehdä seuraavaksi. Arvioi tunteen tunnistamista, empatiaa ja ongelmanratkaisukykyä.',
      gradeLevel: '1.–3. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Sosioemotionaalinen oppiminen (laaja-alainen osaaminen)',
      connection: 'Tunnetyölehdet kytkeytyvät POPS 2014:n laaja-alaisen osaamisen tavoitteisiin L2 (kulttuurinen osaaminen ja vuorovaikutus) ja L3 (itsestä huolehtiminen). Tunteiden tunnistaminen ja säätely ovat sosiaalisen kompetenssin perusta.',
      activity: 'Työlehden jälkeen oppilaat harjoittelevat tunnetilanteen ratkaisua parienä: toinen esittää tilanteen ja toinen ehdottaa rauhoittumiskeinoa.',
    },
    {
      subject: 'Äidinkieli ja kirjallisuus',
      connection: 'Tunnesanasto rikastuttaa kielellistä ilmaisua ja tukee tarinankerronnan taitoja. Tunteiden kuvailu vaatii adjektiiveja ja syy-seuraussuhteita, jotka kehittävät kirjoittamisen rakennetta.',
      activity: 'Sanahaun jälkeen oppilaat kirjoittavat lyhyen tarinan, jossa päähenkilö kokee kolme eri tunnetta ja ratkaisee tilanteen.',
    },
    {
      subject: 'Kuvataide',
      connection: 'Tunteiden ilmaiseminen kuvallisesti kehittää sekä taiteellista ilmaisua että tunnelukutaitoa. Värit, muodot ja ilmeet ovat visuaalisia keinoja tunteiden välittämiseen.',
      activity: 'Väritys- ja piirustustehtävän jälkeen oppilaat luovat oman tunnevärikartan, jossa jokainen tunne yhdistetään omaan väriin ja muotoon.',
    },
  ],

  uniqueAngle: 'Tunneteemaiset työlehdet ovat pedagogisesti korvaamattomia, koska ne käsittelevät ihmisen kehityksen perustavanlaatuisinta haastetta: tunteiden ymmärtämistä ja säätelyä. Suomalaisessa koulujärjestelmässä sosioemotionaalinen oppiminen on integroitu osaksi kaikkea opetusta POPS 2014:n laaja-alaisten osaamistavoitteiden kautta, ja Suomi on tunnettu KiVa-koulun kaltaisista kiusaamisenvastaisista ohjelmista, jotka perustuvat tunnetaitojen kehittämiseen. Tunnetyölehdet tarjoavat turvallisen, yksityisen tilan tunteiden käsittelylle — lapsi voi värittää surullisen kasvojen kuvan tai kirjoittaa turhautumisestaan ilman sosiaalista painetta. Tämä yksityisyys on erityisen tärkeää lapsille, joille tunteista puhuminen ryhmässä on vaikeaa. Tunnesanasto on myös kielellisen kehityksen kulmakivi: lapsi, joka osaa nimetjä tunteensa, osaa myös pyytää apua, ratkaista ristiriitoja ja ilmaista tarpeitaan. Monikulttuurisissa luokissa tunteet ovat universaali kieli — ilmeet ja eleet ylittävät kielimuurit, mikä tekee tunneteemasta erinomaisen lähtökohdan yhteiseen oppimiseen.',

  researchCitation: 'Durlak, J.A., Weissberg, R.P., Dymnicki, A.B., Taylor, R.D. & Schellinger, K.B. (2011). The Impact of Enhancing Students Social and Emotional Learning: A Meta-Analysis of School-Based Universal Interventions. Child Development, 82(1), 405–432. Meta-analyysi osoitti, että sosioemotionaalisen oppimisen ohjelmat paransivat akateemista suoriutumista keskimmäärin 11 prosenttiyksikköä ja vähensivät käytösongelmia merkittävästi.',

  culturalNotes: 'Suomessa sosioemotionaalinen oppiminen on integroitu osaksi perusopetusta POPS 2014:n laaja-alaisten osaamistavoitteiden kautta, erityisesti L2 (kulttuurinen osaaminen ja vuorovaikutus) ja L3 (itsestä huolehtiminen ja arjen taidot). KiVa-koulu-ohjelma, joka on kehitetty Turun yliopistossa, on kansainvälisesti tunnustettu kiusaamisenvastainen ohjelma, jonka perustana ovat tunnetaidot ja empatia. Suomalainen kasvatuskulttuuri korostaa lapsen kokonaisvaltaista hyvinvointia, mikä tekee tunnetyölehdistä luontevan osan opetusta.',

  snippetDefinition: 'Tunnetyölehdet lapsille ovat tulostettavia oppimistehtäviä, jotka käyttävät ilmeitä, tilanteita ja tunnesanoja sosioemotionaalisen oppimisen, lukutaidon ja itsetuntemuksen tukemiseen. Ne on suunniteltu 3–9-vuotiaille ja sisältävät väritystehtäviä, piirustustehtäviä, sanahakuja, lajittelutehtäviä ja kirjoitusharjoituksia.',

  snippetHowTo: [
    'Valitse viikolle tunneteeman alateema, kuten perustunteet, empatia tai tunteiden säätely, jotta oppitunneilla on yhtenäinen fokus.',
    'Valitse kaksi tai kolme työlehtityyppiä eri taitoalueille — esimerkiksi väritystehtävä tunteiden tunnistamiseen, sanahaku tunnesanastoon ja kirjoitustehtävä itseilmaisuun.',
    'Aloita tunnekierroksella: jokainen lapsi kertoo tai näyttää tunnekortista, miltä tänään tuntuu.',
    'Jaa työlehdet vaikeustason mukaan: aloita ilmeiden värittämisestä ennen haastavampia tilanneanalyysi- ja kirjoitustehtäviä.',
    'Kierrä lasten joukossa ja kysy avoimia kysymyksiä kuten Miltä tästä hahmosta tuntuu tai Mitä sinä tekisit tässä tilanteessa.',
    'Päätä tuokio rauhoittumisharjoituksella: syvjähengitys tai lyhyt mindfulness-hetki, joka yhdistää työlehden opit käytäntöön.',
    'Kerää valmiit työlehdet tunnepäiväkirjaan, joka dokumentoi lapsen tunnetaitojen kehittymistä lukukauden aikana.',
  ],

  limitations: 'Tunnetyölehdet käsittelevät herkkiiä aiheita, ja joillakin lapsilla voi olla traumaattisia kokemuksia, jotka nousevat pintaan tunnetyyöskentelyn yhteydessä. Opettajien tulee olla valmiita tukemaan lasta ja tarvittaessa ohjaamaan lisätuen piiriin. Tunteiden yksinkertaistaminen kategorioihin kuten iloinen tai surullinen voi olla riittämätöntä — lasten todelliset tunnekokemukset ovat usein monimutkaisia ja ristiriitaisia. Kulttuuriset erot tunteiden ilmaisussa ovat merkittäviä: joissain kulttuureissa tunteiden avoin näyttäminen ei ole normi, joten opettajien tulee kunnioittaa erilaisia tapoja käsitellä tunteita.',

  themeComparisons: [
    {
      vsThemeId: 'body',
      summary: 'Kehotyölehdet käsittelevät fyysistä olemusta ja toimintoja. Tunnetyölehdet syventyvät sisäiseen kokemusmaailmaan ja tarjoavat välineitä tunteiden tunnistamiseen, nimeämiseen ja säätelyyn.',
    },
    {
      vsThemeId: 'music',
      summary: 'Musiikkityölehdet käyttävät ääntä ja rytmiä oppimisen välineenjä. Tunnetyölehdet lähestyvät samaa tunne-elämän aluetta visuaalisen ja kirjallisen ilmaisun kautta, tarjoten vaihtoehtoiseen keinon tunteiden käsittelyyn.',
    },
    {
      vsThemeId: 'fairy-tales',
      summary: 'Satutyölehdet käsittelevät tunteita tarinan ja mielikuvituksen kautta. Tunnetyölehdet lähestyvät tunteita suoremmin ja konkreettisemmin, tarjoten välineitä tunteiden tunnistamiseen omassa elämässä.',
    },
    {
      vsThemeId: 'school',
      summary: 'Koulutyölehdet keskittyvät oppimisvalmiuksiin ja akateemisiin taitoihin. Tunnetyölehdet vahvistavat koulumenestyksen emotionaalista perustaa — lapsi, joka osaa säädellä tunteitaan, oppii tehokkaammin kaikissa aineissa.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'tunneaiheiset väritystehtävät',
      context: 'Tunneaiheiset väritystehtävät tarjoavat rauhallisen tavan tunnistaa ja käsitellä tunteita, kun lapset värittävät eri ilmeitä ja tunnetiloja esittäviä kuvia.',
    },
    {
      appId: 'draw-and-color',
      anchorText: 'tunteiden piirustustehtävät',
      context: 'Piirustustehtävät tarjoavat luovan kanavan tunteiden ilmaisemiseen, kun lapsi piirtää eri tunnetiloja ja tilanteita omalla tavallaan.',
    },
    {
      appId: 'word-search',
      anchorText: 'tunnesanahaku-työlehdet',
      context: 'Tunnesanaston laajentaminen onnistuu sanahakutehtävissä, joissa lapset etsivät tunteiden nimiä ja tunne-elämään liittyviä sanoja sanaruudukosta.',
    },
    {
      appId: 'word-guess',
      anchorText: 'tunnesanojen arvauspeli',
      context: 'Tunnesanojen arvauspeli haastaa lapsia päättelemään tunnesanoja vihjeistä, kehittäen sekä tunnesanastoa että loogista ajattelua leikillisessä muodossa.',
    },
  ],

  expertTips: [
    {
      tip: 'Aloita jokainen tunnetyölehtihetki lyhyellä tunnekierroksella, jossa jokainen lapsi kertoo tai näyttää päivän tunteensa. Tämä luo turvallisen ilmapiirin ja aktivoi tunnesanaston ennen työlehden aloittamista.',
      source: 'Koulupsykologi, sosioemotionaalinen oppiminen',
      gradeRange: 'Esiopetus–2. lk',
    },
    {
      tip: 'Yhdistä tunnetyölehdet KiVa-koulun teemoihin: käytä työlehtiä empatiaharjoituksena ennen KiVa-oppituntia, jotta oppilaat ovat virittyneet tunneaiheeseen.',
      source: 'Luokanopettaja, KiVa-koulun vastuuhenkilö',
      gradeRange: '1.–3. lk',
    },
    {
      tip: 'Älä pakota lasta nimeämään tunteitaan ääneen, jos hän ei halua. Työlehdet tarjoavat yksityisen tavan käsitellä tunteita värittämällä tai piirtämällä, mikä on joillekin lapsille turvallisempaa kuin puhuminen.',
      source: 'Erityisopettaja, tunnetaitojen tukeminen',
      gradeRange: 'Kaikki luokka-asteet',
    },
  ],
};

registerThemeContent('emotions', 'fi', content);
