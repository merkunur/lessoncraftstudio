/**
 * SEO Part 183: Enrich FI theme hub pages 29-35 with 14 enrichment fields each
 * Themes: dinosaurs, insects, fruits, vegetables, flowers, birds, pets
 */
const fs = require('fs');
const path = require('path');

// ── 1. Dinosaurs (dinosaurukset) ─────────────────────────────────────────

const dinosaursFields = `
  // -- SEO Enrichment (Part 183) --

  classroomScenarios: [
    {
      situation: 'Esiopetuksen opettaja huomaa, ett\u00e4 oppilaat ovat \u00e4\u00e4rimm\u00e4isen innostuneita dinosauruksista, mutta heid\u00e4n tietonsa rajoittuu vain T-Rexiin eiv\u00e4tk\u00e4 he osaa yhdist\u00e4\u00e4 dinosaurusteemaa matemaattisiin tai kielellisiin taitoihin.',
      solution: 'H\u00e4n ottaa k\u00e4ytt\u00f6\u00f6n dinosaurusaiheiset ty\u00f6lehdet, joissa oppilaat laskevat eri dinosauruslajeja, vertailevat kokoja, yhdist\u00e4v\u00e4t lajeja niiden varjoihin ja t\u00e4ytt\u00e4v\u00e4t monitavuisten dinosaurusnimien tavutusharjoituksia.',
      outcome: 'Nelj\u00e4n viikon j\u00e4lkeen oppilaat tunnistavat yli kymmenen dinosauruslajia, k\u00e4ytt\u00e4v\u00e4t vertailev\u00e4\u00e4 sanastoa sujuvasti ja suorittavat laskuteht\u00e4vi\u00e4 innostuneesti, koska dinosauruskonteksti yll\u00e4pit\u00e4\u00e4 motivaatiota.',
    },
    {
      situation: 'Kotikouluvanhempi etsii teemaa, joka yhdist\u00e4\u00e4 luonnontieteet, historian ja kielitaidon lapselle, joka haluaa tiet\u00e4\u00e4 kaiken esihistoriallisesta el\u00e4m\u00e4st\u00e4.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 dinosaurusty\u00f6lehti\u00e4 yhdistettyn\u00e4 museovierailuihin ja fossiilikaivausprojektiin: lapsi laskee dinosauruksia, kirjoittaa lajien nimi\u00e4, vertailee kokoja mittanauhalla ja pit\u00e4\u00e4 paleontologin kentt\u00e4p\u00e4iv\u00e4kirjaa.',
      outcome: 'Lapsi ymm\u00e4rt\u00e4\u00e4 geologisen ajan k\u00e4sitteen, k\u00e4ytt\u00e4\u00e4 tieteellist\u00e4 sanastoa luontevasti ja osaa selitt\u00e4\u00e4 dinosaurusten sukupuuton syit\u00e4 omin sanoin.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '12 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '5 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201325 min' },
    { label: 'Dinosauruslajien kirjo', value: '20+ lajia' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'K\u00e4yt\u00e4 suuria, yksityiskohtaisia dinosauruskuvituksia ja kokovertailukaavioita. Visuaaliset aikajanat triaskaudesta liitukauteen auttavat hahmottamaan geologista aikaa, ja lajien tunnistuskortit kuvilla tukevat visuaalista muistia.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdist\u00e4 ty\u00f6lehdet fossiilikaivausprojektiin hiekkalaatikossa ja dinosaurushahmojen k\u00e4sittelyyn. Kokovertailussa mittaa lattialle piirrettyj\u00e4 dinosaurusten \u00e4\u00e4riviivoja mittanauhalla ennen paperiteht\u00e4v\u00e4\u00e4.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Dinosaurukset ovat universaalisti kiehtova aihe kaikissa kulttuureissa. Aloita kuvallisella lajien tunnistamisella ja nime\u00e4misell\u00e4, lis\u00e4\u00e4 suomenkielist\u00e4 tieteellist\u00e4 sanastoa asteittain. Dinosaurusten kansainv\u00e4liset nimet helpottavat oppimista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta tutkimusteht\u00e4vill\u00e4: vertaile eri geologisten kausien dinosaurusten ominaisuuksia, laske todellisten mittasuhteiden perusteella nopeuksia ja pituuksia, ja kirjoita tietokortti uudesta dinosauruslajista tieteellisen mallin mukaan.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Dinosaurusten tietokansio',
      criteria: 'Ker\u00e4\u00e4 oppilaan dinosaurusty\u00f6lehdet ja tietokortit koko jakson ajalta. Arvioi tieteellisen sanaston kehittymist\u00e4, lajien tunnistamisen tarkkuutta ja kyky\u00e4 verrata dinosaurusten ominaisuuksia.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Paleontologin kentt\u00e4raportti',
      criteria: 'Pyyd\u00e4 oppilasta kirjoittamaan lyhyt raportti kuvitteellisesta fossiilinl\u00f6yd\u00f6st\u00e4: mit\u00e4 l\u00f6ydettiin, mink\u00e4 kokoinen dinosaurus oli, mit\u00e4 se s\u00f6i ja mill\u00e4 kaudella se eli. Arvioi tieteellisen kirjoittamisen tarkkuutta ja tiedon soveltamista.',
      gradeLevel: '2.\u20133. lk',
    },
    {
      method: 'Kokovertailun mittausteht\u00e4v\u00e4',
      criteria: 'Anna oppilaalle viiden dinosauruksen pituustiedot ja pyyd\u00e4 j\u00e4rjest\u00e4m\u00e4\u00e4n ne pienimm\u00e4st\u00e4 suurimpaan, piirt\u00e4m\u00e4\u00e4n mittakaavaan ja laskemaan kokoeroja. Arvioi mittaamisen, j\u00e4rjest\u00e4misen ja laskutaitojen hallintaa.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (biologia ja maantiede)',
      connection: 'Dinosaurukset tarjoavat luontevan portin geologiseen aikaan, fossiilitieteeseen ja evoluution perusteisiin. POPS 2014:n ymp\u00e4rist\u00f6opin tavoitteet menneisyyden el\u00e4m\u00e4n tutkimisesta toteutuvat suoraan dinosauruskontekstissa.',
      activity: 'Kokovertailuteht\u00e4v\u00e4n j\u00e4lkeen oppilaat piirt\u00e4v\u00e4t aikajanan, johon sijoitetaan dinosauruksia eri geologisille kausille ja merkitaan merkitt\u00e4v\u00e4t tapahtumat kuten sukupuutto.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Dinosaurusten monitavuiset tieteelliset nimet tarjoavat erinomaista tavutusharjoitusta ja rikastuttavat tieteellist\u00e4 sanastoa luonnollisessa kontekstissa.',
      activity: 'Dinosaurusnimien tavutusharjoituksen j\u00e4lkeen oppilaat kirjoittavat lyhyen kertomuksen, jossa dinosauruslaji seikkailee omassa elinymps\u00e4rist\u00f6ss\u00e4\u00e4n k\u00e4ytt\u00e4en v\u00e4hint\u00e4\u00e4n viitt\u00e4 tieteellist\u00e4 termi\u00e4.',
    },
    {
      subject: 'Matematiikka (mittaaminen ja vertailu)',
      connection: 'Dinosaurusten \u00e4\u00e4rimm\u00e4iset kokoerot tarjoavat luontevan kontekstin mittaamiselle, vertailulle ja lukujonoille. POPS 2014:n mittaamisen tavoitteet toteutuvat konkreettisesti.',
      activity: 'Kokovertailuty\u00f6lehden j\u00e4lkeen oppilaat mittaavat dinosaurusten pituuksia mittakaavassa ja laskevat, kuinka monta oppilasta tarvitaan muodostamaan Brachiosauruksen pituinen jono.',
    },
  ],

  uniqueAngle: 'Dinosaurusaiheiset ty\u00f6lehdet hy\u00f6dynt\u00e4v\u00e4t yht\u00e4 lapsuuden voimakkaimmista luontaisista kiinnostuksen kohteista \u2014 esihistoriallisia j\u00e4ttil\u00e4isi\u00e4, jotka kiehtovat l\u00e4hes jokaista lasta riippumatta taustasta tai temperamentista. T\u00e4m\u00e4 syv\u00e4 motivaatio tekee dinosauruksista ainutlaatuisen tehokkaan pedagogisen v\u00e4lineen: lapset suorittavat vaativampia teht\u00e4vi\u00e4, k\u00e4ytt\u00e4v\u00e4t enemm\u00e4n aikaa ja siet\u00e4v\u00e4t enemm\u00e4n turhautumista, kun kontekstina ovat Tyrannosaurus Rex ja Triceratops. Paleontologian elementit \u2014 fossiilien tutkiminen, lajien luokittelu, geologisen ajan ymm\u00e4rt\u00e4minen \u2014 tarjoavat lapsille aidon kokemuksen tieteellisest\u00e4 tutkimusprosessista. Suomessa paleontologia ei ole osa arkikokemusta samalla tavalla kuin luonnonhavainnointi, mik\u00e4 tekee dinosaurusteemasta erityisen arvokaan ikkunan kansainv\u00e4liseen tieteeseen ja geologiseen aikak\u00e4sitykseen. POPS 2014 korostaa tutkivan oppimisen menetelmi\u00e4 ja laaja-alaista osaamista, ja dinosaurusty\u00f6lehdet yhdist\u00e4v\u00e4t luonnollisesti matematiikan, kielen ja luonnontieteiden oppisisilt\u00f6j\u00e4 yhdeksi motivoivaksi kokonaisuudeksi. Kokovertailuteht\u00e4v\u00e4t rakentavat mittaamisintuitiota tavalla, johon abstraktit mittausteht\u00e4v\u00e4t eiv\u00e4t pysty.',

  researchCitation: 'DeLoache, J. S., Simcock, G. & Macari, S. (2007). Planes, Trains, Automobiles\u2014and Tea Sets: Extremely Intense Interests in Very Young Children. Developmental Psychology. Tutkimus osoitti, ett\u00e4 intensiiviset kiinnostuksen kohteet, kuten dinosaurukset, kehitt\u00e4v\u00e4t merkitt\u00e4v\u00e4sti lasten itseohjautuvuutta, tiedonhankintastrategioita ja pitk\u00e4j\u00e4nteisyytt\u00e4 oppimisessa.',

  culturalNotes: 'Suomessa dinosaurukset eiv\u00e4t ole osa paikallista fossiilihistoriaa, mik\u00e4 tekee niist\u00e4 erityisen kiehtovan ikkunan kansainv\u00e4liseen tieteeseen ja geologiseen historiaan. POPS 2014 painottaa tutkivaa oppimista ja laaja-alaista osaamista, ja dinosaurusteema yhdist\u00e4\u00e4 luonnollisesti ymp\u00e4rist\u00f6opin, matematiikan ja \u00e4idinkielen tavoitteita. Suomalaisten museoiden dinosaurusn\u00e4yttelyt, kuten Luonnontieteellisen museon kokoelmat, tarjoavat erinomaisen jatkon ty\u00f6lehtioppimiselle.',

  snippetDefinition: 'Dinosaurusaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t T-Rexi\u00e4, Triceratopsia, Stegosaurusta ja muita esihistoriallisia lajeja matematiikan, lukemisen ja luonnontieteen opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t kokovertailua, lajien tunnistamista, sanaharjoituksia ja fossiilintutkimusta.',

  snippetHowTo: [
    'Valitse ty\u00f6lehdet lapsen kehitystason mukaan: nuoremmille yksinkertaista v\u00e4ritt\u00e4mist\u00e4 ja laskemista, vanhemmille tutkimusteht\u00e4vi\u00e4 ja tietotekstej\u00e4.',
    'Aloita tutustumalla dinosauruslajeihin kuvien ja nimien avulla \u2014 kerro lyhyesti jokaisen lajin erityispiirteist\u00e4 ennen teht\u00e4v\u00e4n aloittamista.',
    'Yhdist\u00e4 ty\u00f6lehti k\u00e4yt\u00e4nn\u00f6n toimintaan: fossiilikaivausprojektiin, kokovertailuun mittanauhalla tai leludinosaurusten lajitteluun.',
    'Harjoittele tieteellist\u00e4 sanastoa arjessa: kysy, miksi T-Rexill\u00e4 oli pienet k\u00e4det, kumpi oli suurempi ja mit\u00e4 lihansyj\u00e4 tarkoittaa.',
    'Lis\u00e4\u00e4 aikajanan ulottuvuus: auta lasta sijoittamaan dinosaurukset oikeille geologisille kausille.',
    'Kannusta lasta esitt\u00e4m\u00e4\u00e4n omia kysymyksi\u00e4 ja etsim\u00e4\u00e4n vastauksia kirjoista tai museok\u00e4ynneilt\u00e4.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet dinosaurustietokansioon ja vertailkaa tieteellisen sanaston ja paleontologisen ymm\u00e4rryksen kehittymist\u00e4.',
  ],

  limitations: 'Dinosaurusty\u00f6lehdet perustuvat v\u00e4ist\u00e4m\u00e4tt\u00e4 tieteellisiin rekonstruktioihin, jotka muuttuvat uusien l\u00f6yt\u00f6jen my\u00f6t\u00e4 \u2014 esimerkiksi k\u00e4sitys monien dinosaurusten h\u00f6yhenpeitteisuudest\u00e4 on muuttunut merkitt\u00e4v\u00e4sti. Sukupuuttoteema voi olla her\u00e4tt\u00e4v\u00e4 aihe herkille lapsille, joten opettajan kannattaa k\u00e4sitell\u00e4 sit\u00e4 ik\u00e4tasoisesti ja korostaa tutkimuksen jatkumista.',

  themeComparisons: [
    {
      vsThemeId: 'animals',
      summary: 'El\u00e4inty\u00f6lehdet keskittyv\u00e4t nykyajan lajeihin ja niiden elinymps\u00e4rist\u00f6ihin. Dinosaurusty\u00f6lehdet laajentavat n\u00e4k\u00f6kulman esihistoriaan, geologiseen aikaan ja sukupuuton k\u00e4sitteeseen.',
    },
    {
      vsThemeId: 'zoo',
      summary: 'El\u00e4intarhaty\u00f6lehdet tutkivat el\u00e4vi\u00e4 el\u00e4imi\u00e4 ihmisen hoivassa. Dinosaurusty\u00f6lehdet k\u00e4sittelev\u00e4t lajeja, joita kukaan ei ole n\u00e4hnyt el\u00e4v\u00e4n\u00e4, ja esittelev\u00e4t fossiilitutkimuksen menetelmit\u00e4.',
    },
    {
      vsThemeId: 'space',
      summary: 'Avaruusty\u00f6lehdet tutkivat kosmosta ja t\u00e4htitiedett\u00e4. Dinosaurusty\u00f6lehdet jakavat saman ihmetyksen tunteen mutta kohdistuvat Maan menneisyyteen, ja asteroidin t\u00f6rm\u00e4ys yhdist\u00e4\u00e4 molemmat teemat.',
    },
    {
      vsThemeId: 'nature',
      summary: 'Luontoty\u00f6lehdet tutkivat nykyisi\u00e4 ekosysteemej\u00e4 ja vuodenaikoja. Dinosaurusty\u00f6lehdet avaavat n\u00e4kym\u00e4n muinaisiin ekosysteemeihin ja opettavat, miten el\u00e4m\u00e4 Maalla on muuttunut miljoonien vuosien aikana.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'dinosaurusaiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Dinosaurusten v\u00e4rityssivut kehitt\u00e4v\u00e4t hienomotoriikkaa samalla kun lapset tutustuvat eri lajien ulkon\u00e4k\u00f6\u00f6n ja yksityiskohtiin T-Rexist\u00e4 Stegosaurukseen.',
    },
    {
      appId: 'find-objects',
      anchorText: 'dinosaurusten etsimispelit',
      context: 'Piilotettujen dinosaurusten etsiminen esihistoriallisista maisemista kehitt\u00e4\u00e4 visuaalista tarkkaavaisuutta ja lajien tunnistamista.',
    },
    {
      appId: 'word-search',
      anchorText: 'dinosaurussanaston sanahaku-ty\u00f6lehdet',
      context: 'Sanahakuteht\u00e4v\u00e4t vahvistavat paleontologista sanastoa, kun lapset etsiv\u00e4t termej\u00e4 kuten fossiili, lihansyj\u00e4, triaskausi ja luuranko sanaruudukosta.',
    },
    {
      appId: 'word-scramble',
      anchorText: 'dinosaurusnimien kirjainpulmateht\u00e4v\u00e4t',
      context: 'Kirjainpulmateht\u00e4v\u00e4t haastavat lapsia kokoamaan monitavuisia dinosaurusnimi\u00e4 ja tieteellisi\u00e4 termej\u00e4 sekoitetuista kirjaimista.',
    },
  ],

  expertTips: [
    {
      tip: 'K\u00e4yt\u00e4 dinosaurusten kokovertailua mittaamisen opettamiseen: piirt\u00e4k\u00e4\u00e4 lattille Compsognathuksen ja Brachiosauruksen \u00e4\u00e4riviivat todellisessa mittakaavassa ja anna lasten k\u00e4vell\u00e4 niiden l\u00e4pi.',
      source: 'Paleontologian opetuksen k\u00e4sikirja',
      gradeRange: 'Esiopetus\u20132. lk',
    },
    {
      tip: 'Tavuta dinosaurusten nimet yhdess\u00e4 ennen ty\u00f6lehtiteht\u00e4v\u00e4\u00e4: Ty-ran-no-sau-rus on viisitavuinen, mik\u00e4 tekee siit\u00e4 erinomaisen tavutusharjoituksen joka motivoi oppilaita.',
      source: 'Alkuopetuksen \u00e4idinkielen menetelm\u00e4opas',
      gradeRange: '1.\u20133. lk',
    },
    {
      tip: 'Rakenna luokkaan dinosaurusaikajana, johon oppilaat lis\u00e4\u00e4v\u00e4t piirustuksia ja tietokortteja viikkojen aikana \u2014 t\u00e4m\u00e4 visualisoi geologista aikaa ja vahvistaa kronologista ajattelua.',
      source: 'POPS 2014, ymp\u00e4rist\u00f6opin opetuksen suositukset',
      gradeRange: 'Esiopetus\u20133. lk',
    },
  ],`;

// ── 2. Insects (hy\u00f6nteiset) ──────────────────────────────────────────────

const insectsFields = `
  // -- SEO Enrichment (Part 183) --

  classroomScenarios: [
    {
      situation: 'Ensimm\u00e4isen luokan opettaja huomaa, ett\u00e4 oppilaat pelk\u00e4\u00e4v\u00e4t hy\u00f6nteisi\u00e4 ja v\u00e4ltt\u00e4v\u00e4t niiden tutkimista luonnossa, mik\u00e4 est\u00e4\u00e4 ymp\u00e4rist\u00f6opin tavoitteiden saavuttamista.',
      solution: 'H\u00e4n aloittaa hy\u00f6nteisteemaiset ty\u00f6lehdet turvallisella et\u00e4isyydell\u00e4: oppilaat v\u00e4ritt\u00e4v\u00e4t yst\u00e4v\u00e4llisi\u00e4 hy\u00f6nteiskuvituksia, laskevat jalkoja ja siivi\u00e4, lajittelevat hy\u00f6nteiset ruumiinrakenteen mukaan ja yhdist\u00e4v\u00e4t lajeja niiden elinymps\u00e4rist\u00f6ihin.',
      outcome: 'Kolmen viikon j\u00e4lkeen pelko on muuttunut uteliaisuudeksi: oppilaat tutkivat pihalla muurahaisia suurennuslasilla, k\u00e4ytt\u00e4v\u00e4t tieteellist\u00e4 sanastoa ja ymm\u00e4rt\u00e4v\u00e4t hy\u00f6nteisten merkityksen ekosysteemeille.',
    },
    {
      situation: 'Kotikouluvanhempi haluaa opettaa ekologiaa ja biologiaa konkreettisesti lapselle, joka viett\u00e4\u00e4 paljon aikaa puutarhassa ja on kiinnostunut pienist\u00e4 el\u00e4imist\u00e4.',
      solution: 'Vanhempi yhdist\u00e4\u00e4 hy\u00f6nteisteemaiset ty\u00f6lehdet puutarhan tutkimiseen: lapsi tunnistaa hy\u00f6nteisi\u00e4 suurennuslasilla, piirt\u00e4\u00e4 havaintop\u00e4iv\u00e4kirjaa, laskee eri lajeja ja t\u00e4ytt\u00e4\u00e4 ty\u00f6lehtien luokitteluteht\u00e4vi\u00e4 oikeiden havaintojen pohjalta.',
      outcome: 'Lapsi ymm\u00e4rt\u00e4\u00e4 hy\u00f6nteisten el\u00e4m\u00e4nkierron perusperiaatteet, tunnistaa kymmeni\u00e4 lajeja ja osaa selitt\u00e4\u00e4 p\u00f6lyt\u00e4jien merkityksen ruoantuotannolle.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '11 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Hy\u00f6nteislajien kirjo', value: '15+ lajia' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'K\u00e4yt\u00e4 tarkkoja hy\u00f6nteiskuvituksia ja el\u00e4m\u00e4nkiertokaavioita. Suurennuskuvat hy\u00f6nteisten ruumiinosista \u2014 tuntosarvet, siivet, jalkaparit \u2014 auttavat erottamaan lajeja ja rakentamaan visuaalista luokittelutaitoa.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdist\u00e4 ty\u00f6lehdet ulkona teht\u00e4v\u00e4\u00e4n hy\u00f6nteistutkimukseen: oppilaat ker\u00e4\u00e4v\u00e4t hy\u00f6nteisi\u00e4 havaintorasioihin suurennuslasilla tutkittaviksi ja vertaavat l\u00f6yt\u00f6j\u00e4\u00e4n ty\u00f6lehden lajeihin. Hy\u00f6nteisliikuntahetki (ry\u00f6mi kuin muurahainen, lenn\u00e4 kuin perhonen) aktivoi koko kehon.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Hy\u00f6nteiset ovat tuttu aihe kaikissa kulttuureissa. Aloita kuvallisella lajien tunnistamisella ja hy\u00f6nteisten ruumiinosien nime\u00e4misell\u00e4. Kuvitetut sanakortit hy\u00f6nteistermeist\u00e4 (tuntosarvet, siivet, toukka, kotelo) tukevat sanaston oppimista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta el\u00e4m\u00e4nkiertotutkimuksilla: vertaile t\u00e4ydellist\u00e4 ja ep\u00e4t\u00e4ydellist\u00e4 muodonvaihdosta, tutki hy\u00f6nteisten roolia ekosysteemeiss\u00e4 ravintoketjujen kautta ja kirjoita tutkimusraportti p\u00f6lyt\u00e4jien v\u00e4henemisest\u00e4.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Hy\u00f6nteisten havaintop\u00e4iv\u00e4kirja',
      criteria: 'Ker\u00e4\u00e4 oppilaan hy\u00f6nteishavainnot ja piirrokset koko jakson ajalta. Arvioi lajien tunnistamisen tarkkuutta, tieteellisen sanaston kehittymist\u00e4 ja havainnoinnin yksityiskohtaisuuden kasvua.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Hy\u00f6nteisten luokitteluteht\u00e4v\u00e4',
      criteria: 'Anna oppilaalle kymmenen hy\u00f6nteiskuvaa ja pyyd\u00e4 lajittelemaan ne kolmeen ryhm\u00e4\u00e4n valitsemansa ominaisuuden mukaan. Arvioi luokitteluperusteen j\u00e4rkevyytt\u00e4, johdonmukaisuutta ja kyky\u00e4 perustella valintaansa.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
    {
      method: 'El\u00e4m\u00e4nkierron kuvasarja',
      criteria: 'Pyyd\u00e4 oppilasta j\u00e4rjest\u00e4m\u00e4\u00e4n perhosen el\u00e4m\u00e4nkierron vaiheet oikeaan j\u00e4rjestykseen ja nime\u00e4m\u00e4\u00e4n jokainen vaihe. Arvioi vaiheiden tunnistamista, oikean j\u00e4rjestyksen hallintaa ja tieteellisten termien k\u00e4ytt\u00f6\u00e4.',
      gradeLevel: '1.\u20133. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (biologia ja ekologia)',
      connection: 'Hy\u00f6nteiset ovat ekosysteemien avainlajeja: p\u00f6lytt\u00e4ji\u00e4, hajottajia ja ravintoketjun peruslenkkej\u00e4. POPS 2014:n ymp\u00e4rist\u00f6opin tavoitteet el\u00e4v\u00e4n luonnon tutkimisesta toteutuvat konkreettisesti hy\u00f6nteishavainnoinnissa.',
      activity: 'Hy\u00f6nteisten luokitteluteht\u00e4v\u00e4n j\u00e4lkeen oppilaat tutkivat koulun pihalla hy\u00f6nteisi\u00e4 suurennuslaseilla ja t\u00e4ytt\u00e4v\u00e4t havaintolomakkeen lajista, koosta ja elinymps\u00e4rist\u00f6st\u00e4.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Hy\u00f6nteisteema rikastuttaa tieteellist\u00e4 sanastoa: tuntosarvet, siivet, jalkaparit, toukka, kotelo, muodonvaihdos. N\u00e4m\u00e4 termit kehitt\u00e4v\u00e4t tarkkaajattelua ja kuvailevaa kirjoittamista.',
      activity: 'Sanastoty\u00f6lehden j\u00e4lkeen oppilaat kirjoittavat lyhyen tarinan perhosen matkasta toukasta aikuiseksi k\u00e4ytt\u00e4en v\u00e4hint\u00e4\u00e4n viitt\u00e4 tieteellist\u00e4 termi\u00e4.',
    },
    {
      subject: 'Kuvataide',
      connection: 'Hy\u00f6nteisten symmetriset kuviot, siipien v\u00e4rimaailmat ja monimuotoiset muodot inspiroivat luovaa ilmaisua ja opettavat symmetriaa luonnollisessa kontekstissa.',
      activity: 'V\u00e4ritysteht\u00e4v\u00e4n j\u00e4lkeen oppilaat suunnittelevat oman kuvitteellisen hy\u00f6nteisen, jonka siivet noudattavat symmetriaa ja v\u00e4ritys perustuu luonnon malleihin.',
    },
  ],

  uniqueAngle: 'Hy\u00f6nteisteemaiset ty\u00f6lehdet ovat pedagogisesti poikkeuksellisia, koska ne yhdist\u00e4v\u00e4t luonnontieteellisen tarkkailun, ekologisen ymm\u00e4rryksen ja emotionaalisen kasvun ainutlaatuisella tavalla. Hy\u00f6nteiset ovat lasten arkiymp\u00e4rist\u00f6n helpoimmin tutkittavia el\u00e4vi\u00e4 olentoja \u2014 muurahainen pihalla, perhonen puutarhassa, leppis k\u00e4dell\u00e4 \u2014 ja t\u00e4m\u00e4 v\u00e4lit\u00f6n saavutettavuus tekee niist\u00e4 ihanteellisen portin tieteelliseen tutkimukseen. Muodonvaihdos toukasta aikuiseksi on yksi luonnon n\u00e4ytt\u00e4vimmist\u00e4 prosesseista, ja sen ymm\u00e4rt\u00e4minen ty\u00f6lehtien ja oikean havainnoinnin kautta rakentaa pohjaa biologisen prosessiajattelun kehittymiselle. Suomessa hy\u00f6nteisten havainnointi on olennainen osa ymp\u00e4rist\u00f6kasvatusta, ja POPS 2014 painottaa el\u00e4v\u00e4n luonnon tutkimista l\u00e4hiymp\u00e4rist\u00f6ss\u00e4. Hy\u00f6nteisteema auttaa my\u00f6s k\u00e4sittelem\u00e4\u00e4n pelkoja turvallisesti: kun lapsi oppii tunnistamaan ja ymm\u00e4rt\u00e4m\u00e4\u00e4n hy\u00f6nteisi\u00e4, pelko muuttuu kunnioitukseksi ja uteliaisuudeksi.',

  researchCitation: 'Kellert, S. R. (2002). Experiencing Nature: Affective, Cognitive, and Evaluative Development in Children. MIT Press. Tutkimus osoitti, ett\u00e4 lasten suora vuorovaikutus pienten el\u00e4inten, kuten hy\u00f6nteisten, kanssa kehitt\u00e4\u00e4 merkitt\u00e4v\u00e4sti empatiaa, tieteellist\u00e4 ajattelua ja ymp\u00e4rist\u00f6vastuullisuutta.',

  culturalNotes: 'Suomessa hy\u00f6nteisten havainnointi on olennainen osa ymp\u00e4rist\u00f6kasvatusta kaikilla luokkatasoilla. POPS 2014 korostaa l\u00e4hiymp\u00e4rist\u00f6n tutkimista ja el\u00e4v\u00e4n luonnon havainnointia. Suomalainen luontokasvatus, mets\u00e4p\u00e4iv\u00e4kodit ja ulkona oppimisen perinne tarjoavat erinomaisen kehyksen hy\u00f6nteisteemaisille ty\u00f6lehdille, joissa paperiteht\u00e4v\u00e4t yhdistyv\u00e4t aitoon luontohavainnointiin.',

  snippetDefinition: 'Hy\u00f6nteisaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t perhosia, muurahaisia, mehil\u00e4isi\u00e4, lepp\u00e4kerttuja ja muita hy\u00f6nteisi\u00e4 biologian, matematiikan ja sanaston opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t lajien tunnistamista, el\u00e4m\u00e4nkierron tutkimista, luokittelua ja lukum\u00e4\u00e4r\u00e4teht\u00e4vi\u00e4.',

  snippetHowTo: [
    'Valitse ty\u00f6lehdet lapsen kehitystason mukaan: nuoremmille v\u00e4ritt\u00e4mist\u00e4 ja yksinkertaista laskemista, vanhemmille el\u00e4m\u00e4nkiertotutkimuksia.',
    'Aloita tutustumalla hy\u00f6nteislajeihin kuvien avulla \u2014 nime\u00e4 ruumiinosat ja erityispiirteet yhdess\u00e4 lapsen kanssa.',
    'Yhdist\u00e4 ty\u00f6lehti ulkona teht\u00e4v\u00e4\u00e4n havainnointiin: tutki pihan hy\u00f6nteisi\u00e4 suurennuslasilla teht\u00e4v\u00e4n j\u00e4lkeen.',
    'Harjoittele tieteellist\u00e4 sanastoa: kysy, miksi perhosella on tuntosarvet, mik\u00e4 ero on toukalla ja aikuisella, ja miten mehil\u00e4inen p\u00f6lytt\u00e4\u00e4.',
    'Lis\u00e4\u00e4 ekologinen ulottuvuus: keskustele hy\u00f6nteisten merkityksest\u00e4 ruoantuotannolle ja luonnon monimuotoisuudelle.',
    'Kannusta lasta pit\u00e4m\u00e4\u00e4n hy\u00f6nteisten havaintop\u00e4iv\u00e4kirjaa piirroksin ja muistiinpanoin.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet ja havainnot kansioon ja vertailkaa lajitunnistuksen ja tieteellisen sanaston kehittymist\u00e4.',
  ],

  limitations: 'Hy\u00f6nteisteema voi olla haastava lapsille, jotka kokevat voimakasta pelkoa hy\u00f6nteisi\u00e4 kohtaan \u2014 t\u00e4ll\u00f6in on t\u00e4rke\u00e4\u00e4 aloittaa rauhallisesti kauniista lajeista kuten perhosista. Osa lapsista voi olla allergisia hy\u00f6nteisten pistoille, joten ulkona teht\u00e4v\u00e4ss\u00e4 havainnoinnissa on noudatettava varovaisuutta.',

  themeComparisons: [
    {
      vsThemeId: 'animals',
      summary: 'El\u00e4inty\u00f6lehdet kattavat laajan lajien kirjon nisikk\u00e4ist\u00e4 kaloihin. Hy\u00f6nteisteema syventyy pienimpiin el\u00e4imiin ja opettaa ruumiinosien tarkkaa havainnointia ja ekologisia rooleja.',
    },
    {
      vsThemeId: 'garden',
      summary: 'Puutarhaty\u00f6lehdet k\u00e4sittelev\u00e4t kasvien viljelyuml\u00e4 ja hoitoa. Hy\u00f6nteisteema t\u00e4ydent\u00e4\u00e4 puutarhaa tarkastelemalla p\u00f6lytt\u00e4jien ja tuholaisten rooleja puutarhan ekosysteemiss\u00e4.',
    },
    {
      vsThemeId: 'flowers',
      summary: 'Kukkaty\u00f6lehdet tutkivat kasvien kauneutta ja rakennetta. Hy\u00f6nteisteema yhdist\u00e4\u00e4 kukat p\u00f6lytykseen ja opettaa el\u00e4inten ja kasvien vuorovaikutusta.',
    },
    {
      vsThemeId: 'forest',
      summary: 'Mets\u00e4ty\u00f6lehdet tutkivat mets\u00e4ekosysteemi\u00e4 kokonaisuutena. Hy\u00f6nteisteema tarkentaa mets\u00e4n pienimpiin asukkaisiin ja niiden ratkaisevan t\u00e4rke\u00e4\u00e4n rooliin hajottajina ja p\u00f6lytt\u00e4jin\u00e4.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'hy\u00f6nteisaiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Hy\u00f6nteisten v\u00e4rityssivut kehitt\u00e4v\u00e4t hienomotoriikkaa samalla kun lapset tutustuvat siipien kuvioihin, ruumiinosiin ja lajien monimuotoisuuteen.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'hy\u00f6nteisten etsi ja laske -teht\u00e4v\u00e4t',
      context: 'Etsi ja laske -teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t lukum\u00e4\u00e4r\u00e4k\u00e4sitett\u00e4 ja visuaalista tarkkaavaisuutta, kun lapset etsiv\u00e4t ja laskevat eri hy\u00f6nteislajeja kuvasta.',
    },
    {
      appId: 'word-search',
      anchorText: 'hy\u00f6nteissanaston sanahaku-ty\u00f6lehdet',
      context: 'Sanahakuteht\u00e4v\u00e4t vahvistavat biologista sanastoa, kun lapset etsiv\u00e4t termej\u00e4 kuten perhonen, muurahainen, tuntosarvi ja muodonvaihdos.',
    },
    {
      appId: 'pattern-train',
      anchorText: 'hy\u00f6nteisteemaiset kuviojunateht\u00e4v\u00e4t',
      context: 'Kuviojunateht\u00e4v\u00e4t kehitt\u00e4v\u00e4t loogista ajattelua, kun lapset tunnistavat ja jatkavat hy\u00f6nteisaiheisia sarjoja ja kuvioita.',
    },
  ],

  expertTips: [
    {
      tip: 'Aloita hy\u00f6nteisteema perhosilla ja lepp\u00e4kertuilla, jotka her\u00e4tt\u00e4v\u00e4t positiivisia tunteita. Siirry vasta my\u00f6hemmin h\u00e4m\u00e4h\u00e4kkeihin ja kov\u00e4kuoriaisiin, kun uteliaisuus on rakentunut.',
      source: 'Ymp\u00e4rist\u00f6kasvatuksen opas',
      gradeRange: 'Esiopetus\u20131. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 havaintorasioita ja suurennuslaseja ty\u00f6lehtien rinnalla: todellisten hy\u00f6nteisten tutkiminen vahvistaa paperilla opittua ja rakentaa tieteellisen tutkimuksen taitoja.',
      source: 'Luonnontieteellisen opetuksen menetelm\u00e4opas',
      gradeRange: '1.\u20133. lk',
    },
    {
      tip: 'Yhdist\u00e4 hy\u00f6nteisty\u00f6lehdet perhosen kasvatusprojektiin: seuraa toukan muodonvaihdosta kotelon kautta aikuiseksi ja dokumentoi prosessi piirroksin ty\u00f6lehtien rinnalla.',
      source: 'POPS 2014, ymp\u00e4rist\u00f6opin opetuksen suositukset',
      gradeRange: 'Esiopetus\u20133. lk',
    },
  ],`;

// ── 3. Fruits (hedelm\u00e4t) ────────────────────────────────────────────────

const fruitsFields = `
  // -- SEO Enrichment (Part 183) --

  classroomScenarios: [
    {
      situation: 'Esiopetuksen opettaja huomaa, ett\u00e4 oppilaat tunnistavat vain omenan ja banaanin eiv\u00e4tk\u00e4 osaa nimetill\u00e4 tai luokitella muita hedelmi\u00e4, mik\u00e4 rajoittaa sanavarastoa ja ravintotietoa.',
      solution: 'H\u00e4n ottaa k\u00e4ytt\u00f6\u00f6n hedelm\u00e4aiheiset ty\u00f6lehdet, joissa oppilaat v\u00e4ritt\u00e4v\u00e4t eri hedelmi\u00e4, lajittelevat niit\u00e4 v\u00e4rin ja muodon mukaan, laskevat hedelm\u00e4ryhmi\u00e4 ja yhdist\u00e4v\u00e4t hedelm\u00e4n sen puolikkaan leikkauskuvaan.',
      outcome: 'Kolmen viikon j\u00e4lkeen oppilaat tunnistavat yli viisitoista hedelm\u00e4\u00e4, k\u00e4ytt\u00e4v\u00e4t luokittelusanastoa sujuvasti ja ymm\u00e4rt\u00e4v\u00e4t hedelmien merkityksen terveellisess\u00e4 ruokavaliossa.',
    },
    {
      situation: 'Kotikouluvanhempi haluaa yhdist\u00e4\u00e4 ravitsemuskasvatuksen, matematiikan ja kielen oppimisen lapselle, joka on kiinnostunut ruoanlaitosta.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 hedelm\u00e4ty\u00f6lehti\u00e4 yhdistettyn\u00e4 keitti\u00f6n tutkimiseen: lapsi tunnistaa hedelmi\u00e4 kaupassa, mittaa ja punnitsee niit\u00e4, laskee kustannuksia ja valmistaa hedelm\u00e4salaatin reseptity\u00f6lehden ohjeiden mukaan.',
      outcome: 'Lapsi ymm\u00e4rt\u00e4\u00e4 hedelmien alkuper\u00e4n, tunnistaa trooppiset ja kotimaiset hedelm\u00e4t, hallitsee perusmittaamisen ja osaa seurata yksinkertaista resepti\u00e4 itsen\u00e4isesti.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Hedelm\u00e4lajien kirjo', value: '20+ hedelm\u00e4\u00e4' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'K\u00e4yt\u00e4 v\u00e4rikk\u00e4it\u00e4, realistisia hedelm\u00e4kuvituksia ja poikkileikkauskuvia. V\u00e4ri- ja muotopohjaiset lajittelukortit auttavat hahmottamaan hedelmien monimuotoisuutta. Hedelm\u00e4kartta, joka n\u00e4ytt\u00e4\u00e4 trooppisten hedelmien alkuper\u00e4maat, laajentaa maantieteellist\u00e4 ymm\u00e4rryst\u00e4.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Tuo oikeita hedelmi\u00e4 luokkaan: oppilaat tunnustelevat pintoja (sile\u00e4 omena, karhea ananas, pehme\u00e4 persikka), punnitsevat ja mittaavat hedelmi\u00e4 ja valmistavat hedelm\u00e4salaatin teht\u00e4v\u00e4n j\u00e4lkeen.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Hedelm\u00e4t ovat universaali ja kulttuurirajat ylitt\u00e4v\u00e4 aihe \u2014 jokaisella lapsella on kokemuksia hedelmist\u00e4. Aloita tuttujen hedelmien suomenkielisist\u00e4 nimist\u00e4 ja laajenna trooppisiin hedelmiin. Kuvitetut sanakortit hedelm\u00e4nimist\u00e4 tukevat oppimista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta tutkimusteht\u00e4vill\u00e4: tutki hedelmien alkuper\u00e4maita maailmankartalla, laske ravintoarvoja vertailuteht\u00e4viss\u00e4, kirjoita hedelm\u00e4tietokortit ja tutki kasvien lis\u00e4\u00e4ntymist\u00e4 siementen kautta.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Hedelm\u00e4tunnistuskoe',
      criteria: 'N\u00e4yt\u00e4 oppilaalle viisitoista hedelm\u00e4kuvaa ja pyyd\u00e4 nime\u00e4m\u00e4\u00e4n ne suomeksi. Arvioi nimien oikeellisuutta, v\u00e4rien ja muotojen kuvailua sek\u00e4 kyky\u00e4 ryhmi tell\u00e4 hedelm\u00e4t esimerkiksi v\u00e4rin tai alkuper\u00e4n mukaan.',
      gradeLevel: 'Esiopetus\u20131. lk',
    },
    {
      method: 'Hedelm\u00e4reseptiteht\u00e4v\u00e4',
      criteria: 'Anna oppilaalle yksinkertainen hedelm\u00e4salaattiresepti ja pyyd\u00e4 laskemaan tarvittavat m\u00e4\u00e4r\u00e4t nelj\u00e4lle hengelle. Arvioi kertolaskun hallintaa, mittayksik\u00f6iden tuntemusta ja reseptin seuraamisen tarkkuutta.',
      gradeLevel: '2.\u20133. lk',
    },
    {
      method: 'Hedelm\u00e4lajittelun perusteluteht\u00e4v\u00e4',
      criteria: 'Pyyd\u00e4 oppilasta lajittelemaan kymmenen hedelm\u00e4\u00e4 kahteen ryhm\u00e4\u00e4n ja perustelemaan lajitteluperuste suullisesti tai kirjallisesti. Arvioi luokittelun loogisuutta ja perustelun selkeytt\u00e4.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (terveystieto ja biologia)',
      connection: 'Hedelm\u00e4t yhdist\u00e4v\u00e4t ravitsemuskasvatuksen ja biologian: vitamiinit, kuidut ja kasvien lis\u00e4\u00e4ntyminen siementen kautta. POPS 2014:n terveystiedon tavoitteet terveellisest\u00e4 ruokavaliosta toteutuvat luonnollisesti.',
      activity: 'Hedelm\u00e4lajitteluteht\u00e4v\u00e4n j\u00e4lkeen oppilaat tutkivat oikean hedelm\u00e4n siemeni\u00e4, halkaisevat omenan ja tarkkailevat sis\u00e4rakennetta suurennuslasilla.',
    },
    {
      subject: 'Matematiikka (laskeminen ja mittaaminen)',
      connection: 'Hedelm\u00e4t tarjoavat konkreettisen kontekstin laskemiselle, mittaamiselle ja lajittelulle. Punnitseminen, mittaaminen ja kustannuslaskenta kehittyv\u00e4t luonnollisesti hedelm\u00e4kontekstissa.',
      activity: 'Laskuteht\u00e4v\u00e4n j\u00e4lkeen oppilaat punnitsevat oikeita hedelmi\u00e4 vaa\u0027alla, vertailevat painoja ja laskevat kokonaiskustannuksia kilohinnoin.',
    },
    {
      subject: 'Maantieto ja kulttuurit',
      connection: 'Trooppiset hedelm\u00e4t avaavat ikkunan eri maanosiin ja ilmastov\u00f6hykkeisiin. Hedelm\u00e4kartta opettaa, mist\u00e4 banaanit, ananakset ja mangot tulevat Suomeen.',
      activity: 'Hedelm\u00e4tunnistuksen j\u00e4lkeen oppilaat merkitsev\u00e4t maailmankarttaan hedelmien alkuper\u00e4maat ja piirt\u00e4v\u00e4t kuljetusreittej\u00e4 Suomeen.',
    },
  ],

  uniqueAngle: 'Hedelm\u00e4aiheiset ty\u00f6lehdet yhdist\u00e4v\u00e4t ravitsemuskasvatuksen, aistikokemuksen ja akateemiset taidot tavalla, joka on sekil v\u00e4lit\u00f6m\u00e4sti merkityksellinen ett\u00e4 pedagogisesti monitahoinen. Jokainen lapsi sy\u00f6 hedelmi\u00e4 p\u00e4ivitt\u00e4in, joten oppiminen siirtyy v\u00e4litt\u00f6m\u00e4sti arkeen: kaupassa, keitti\u00f6ss\u00e4 ja ruokapyyd\u00e4ss\u00e4. Hedelm\u00e4t tarjoavat rikkaan aistikokemuksen \u2014 v\u00e4rit, muodot, tuoksut, pintarakenteet ja maut \u2014 joka tekee oppimisesta moniaistista ja syvempill\u00e4\u00e4. Suomessa hedelm\u00e4teema yhdistyy luontevasti terveellisen ruokavalion kasvatukseen, joka on POPS 2014:n terveystiedon keskeinen tavoite. Trooppisten hedelmien tutkiminen avaa ikkunan maantieteeseen ja globaaleihin ruokaj\u00e4rjestelmiin, kun taas kotimaisten marjojen ja hedelmien tunnistaminen vahvistaa suomalaista luontosuhdetta. Hedelm\u00e4ty\u00f6lehdet rakentavat luokittelutaitoja, v\u00e4ri- ja muotosanastoa sek\u00e4 mittaamistaitoja kontekstissa, joka on lapsille v\u00e4litt\u00f6m\u00e4sti tuttu ja motivoiva.',

  researchCitation: 'Cooke, L. (2007). The Importance of Exposure for Healthy Eating in Childhood. Journal of Human Nutrition and Dietetics. Tutkimus osoitti, ett\u00e4 toistuva altistuminen erilaisille hedelmille ja vihanneksille \u2014 mukaan lukien kuvien, nimien ja ty\u00f6lehtiteht\u00e4vien kautta \u2014 lis\u00e4\u00e4 lasten halukkuutta maistaa ja sy\u00f6d\u00e4 niit\u00e4.',

  culturalNotes: 'Suomessa hedelm\u00e4t ja erityisesti kotimaiset marjat ovat t\u00e4rke\u00e4 osa ruokakulttuuria. POPS 2014 painottaa terveellisen ruokavalion ymm\u00e4rt\u00e4mist\u00e4 osana ymp\u00e4rist\u00f6opin ja terveystiedon opetusta. Hedelm\u00e4ty\u00f6lehdet yhdist\u00e4v\u00e4t luonnollisesti kotimaisten marjojen tunnistamisen ja trooppisten hedelmien maantieteen, rakentaen sek\u00e4 suomalaista luontosuhdetta ett\u00e4 globaalia ymm\u00e4rryst\u00e4.',

  snippetDefinition: 'Hedelm\u00e4aiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t omenoita, banaaneja, mansikoita ja muita hedelmi\u00e4 laskemisen, luokittelun, sanaston ja ravitsemustiedon opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t v\u00e4ri- ja muotolajittelua, mittaamista ja reseptiteht\u00e4vi\u00e4.',

  snippetHowTo: [
    'Valitse ty\u00f6lehdet lapsen kehitystason mukaan: nuoremmille v\u00e4ritt\u00e4mist\u00e4 ja yksinkertaista lajittelua, vanhemmille mittaus- ja laskuteht\u00e4vi\u00e4.',
    'Aloita tutustumalla hedelmiin moniaistisesti: anna lapsen koskettaa, haistaa ja maistaa oikeita hedelmi\u00e4 ennen paperiteht\u00e4v\u00e4\u00e4.',
    'Yhdist\u00e4 ty\u00f6lehti kauppareissuun: tunnistakaa hedelmi\u00e4 hedelmil\u00e4osastolla ja vertailkaa hintoja ja painoja.',
    'Harjoittele luokittelua arjessa: lajitelkaa hedelm\u00e4t v\u00e4rin, koon, muodon tai alkuper\u00e4n mukaan.',
    'Lis\u00e4\u00e4 keitti\u00f6ulottuvuus: valmistakaa yhdess\u00e4 hedelm\u00e4salaatti tai smoothie teht\u00e4v\u00e4n j\u00e4lkeen.',
    'Keskustele ravitsemuksesta: miksi hedelm\u00e4t ovat t\u00e4rkeit\u00e4, mit\u00e4 vitamiineja niiss\u00e4 on ja montako annosta p\u00e4iv\u00e4ss\u00e4 tarvitaan.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet kansioon ja seuratkaa hedelm\u00e4sanaston ja luokittelutaitojen kehittymist\u00e4.',
  ],

  limitations: 'Hedelm\u00e4ty\u00f6lehdet kuvaavat usein l\u00e4hinn\u00e4 kaupassa myyt\u00e4vi\u00e4 hedelmi\u00e4, mik\u00e4 voi j\u00e4tt\u00e4\u00e4 kotimaisten marjojen ja villihedelmien maailman k\u00e4sittelem\u00e4tt\u00e4. Allergiset lapset saattavat tarvita erityishuomiota, jos teht\u00e4viss\u00e4 k\u00e4sitell\u00e4\u00e4n oikeita hedelmi\u00e4 \u2014 sitrusallergiat ja ristiallergiiat ovat yleisi\u00e4.',

  themeComparisons: [
    {
      vsThemeId: 'vegetables',
      summary: 'Vihannesty\u00f6lehdet keskittyv\u00e4t juureksiin, lehtivihanneksiin ja palkokasvehin. Hedelm\u00e4ty\u00f6lehdet tutkivat makeita ja meheikk\u00e4it\u00e4 hedelmi\u00e4, trooppisia lajeja ja siementen kautta kasvien lis\u00e4\u00e4ntymist\u00e4.',
    },
    {
      vsThemeId: 'food',
      summary: 'Ruokaty\u00f6lehdet kattavat koko ruokavalion aterioista v\u00e4lipaloihin. Hedelm\u00e4teema syventyy yhteen ruokaryhm\u00e4\u00e4n ja tutkii hedelmien biologiaa, alkuper\u00e4\u00e4 ja ravintosis\u00e4lt\u00f6\u00e4.',
    },
    {
      vsThemeId: 'garden',
      summary: 'Puutarhaty\u00f6lehdet k\u00e4sittelev\u00e4t kasvien viljelyuml\u00e4 ja hoitoa kokonaisvaltaisesti. Hedelm\u00e4teema keskittyy hedelmien tunnistamiseen, luokitteluun ja ravitsemukselliseen merkitykseen.',
    },
    {
      vsThemeId: 'cooking',
      summary: 'Kokkausty\u00f6lehdet opettavat reseptien seuraamista ja keitti\u00f6taitoja. Hedelm\u00e4teema tarjoaa ainesosatietoa ja luokittelutaitoja, jotka t\u00e4ydent\u00e4v\u00e4t kokkausteemaa.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'hedelm\u00e4aiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Hedelmien v\u00e4rityssivut kehitt\u00e4v\u00e4t hienomotoriikkaa ja v\u00e4rien tunnistamista, kun lapset v\u00e4ritt\u00e4v\u00e4t omenoita, banaaneja ja mansikoita oikein v\u00e4rein.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'hedelmien etsi ja laske -teht\u00e4v\u00e4t',
      context: 'Etsi ja laske -teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t lukum\u00e4\u00e4r\u00e4k\u00e4sitett\u00e4, kun lapset etsiv\u00e4t ja laskevat eri hedelm\u00e4lajeja v\u00e4rikk\u00e4ist\u00e4 kuvista.',
    },
    {
      appId: 'word-search',
      anchorText: 'hedelm\u00e4sanaston sanahaku-ty\u00f6lehdet',
      context: 'Sanahakuteht\u00e4v\u00e4t vahvistavat hedelm\u00e4sanastoa, kun lapset etsiv\u00e4t termej\u00e4 kuten mansikka, vesimeloni, ananas ja p\u00e4\u00e4ryn\u00e4 sanaruudukosta.',
    },
    {
      appId: 'picture-sort',
      anchorText: 'hedelmien lajitteluteht\u00e4v\u00e4t',
      context: 'Lajitteluteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t luokittelutaitoja, kun lapset lajittelevat hedelmi\u00e4 v\u00e4rin, muodon, koon tai alkuper\u00e4n mukaan.',
    },
  ],

  expertTips: [
    {
      tip: 'Tuo oikeita hedelmi\u00e4 luokkaan ty\u00f6lehtien rinnalle: moniaistinen kokemus \u2014 n\u00e4k\u00f6, haju, tunto, maku \u2014 syvent\u00e4\u00e4 oppimista merkitt\u00e4v\u00e4sti verrattuna pelkkiin kuviin.',
      source: 'Ravitsemuskasvatuksen opas',
      gradeRange: 'Esiopetus\u20132. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 hedelm\u00e4karttaa globaalin ymm\u00e4rryksen rakentamiseen: n\u00e4yt\u00e4 miss\u00e4 banaanit, ananakset ja mangot kasvavat ja keskustele kuljetuksen ymp\u00e4rist\u00f6vaikutuksista.',
      source: 'Globaalikasvatuksen menetelm\u00e4opas',
      gradeRange: '2.\u20133. lk',
    },
    {
      tip: 'Yhdist\u00e4 hedelm\u00e4ty\u00f6lehdet v\u00e4lipalakasvatukseen: laske yhdess\u00e4, montako hedelm\u00e4annosta p\u00e4iv\u00e4ss\u00e4 tarvitaan, ja suunnittele viikon v\u00e4lipalakalenteri hedelmist\u00e4.',
      source: 'POPS 2014, terveystiedon opetuksen suositukset',
      gradeRange: 'Esiopetus\u20133. lk',
    },
  ],`;

// ── 4. Vegetables (vihannekset) ──────────────────────────────────────────

const vegetablesFields = `
  // -- SEO Enrichment (Part 183) --

  classroomScenarios: [
    {
      situation: 'Esiopetuksen opettaja huomaa, ett\u00e4 oppilaat torjuvat vihanneksia sek\u00e4 ruokapyyd\u00e4ss\u00e4 ett\u00e4 oppimistilanteissa, ja heid\u00e4n vihannessanastonsa rajoittuu muutamaan peruslajiin.',
      solution: 'H\u00e4n ottaa k\u00e4ytt\u00f6\u00f6n vihannessaiheiset ty\u00f6lehdet, joissa oppilaat v\u00e4ritt\u00e4v\u00e4t v\u00e4rikk\u00e4it\u00e4 vihanneksia, lajittelevat niit\u00e4 v\u00e4rin ja kasvutavan mukaan, laskevat juureksia ja lehtivihanneksia ja yhdist\u00e4v\u00e4t vihanneksen sen siemeneen.',
      outcome: 'Kolmen viikon j\u00e4lkeen oppilaat suhtautuvat vihanneksiin uteliaasti, tunnistavat yli kymmenen vihanneslajia, ymm\u00e4rt\u00e4v\u00e4t kasvien eri osia ja k\u00e4ytt\u00e4v\u00e4t luokittelusanastoa arjessa.',
    },
    {
      situation: 'Kotikouluvanhempi etsii teemaa, joka yhdist\u00e4\u00e4 puutarhanhoitoon, ravitsemukseen ja matematiikkaan lapselle, joka auttaa mielell\u00e4\u00e4n keitti\u00f6ss\u00e4 ja puutarhassa.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 vihannestyolehtia yhdistettyn\u00e4 puutarhan viljelyyn ja keitti\u00f6n teht\u00e4viin: lapsi kylv\u00e4\u00e4 siemeni\u00e4, mittaa kasvua, lajittelee satoa ja valmistaa yksinkertaisia vihannesruokia reseptity\u00f6lehden avulla.',
      outcome: 'Lapsi ymm\u00e4rt\u00e4\u00e4 kasvien kasvuprosessin siemenest\u00e4 sadoksi, hallitsee mittaamisen ja lajittelun ja arvostaa vihanneksia osana terveellist\u00e4 ruokavaliota.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Vihanneslajien kirjo', value: '20+ vihannesta' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'K\u00e4yt\u00e4 v\u00e4rikk\u00e4it\u00e4 vihannes kuvituksia ja poikkileikkauskuvia, jotka paljastavat sis\u00e4rakenteen. V\u00e4ripohjaiset lajittelukortit (vihre\u00e4t, oranssit, punaiset, violetit vihannekset) auttavat hahmottamaan monimuotoisuutta.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Tuo oikeita vihanneksia luokkaan: oppilaat tunnustelevat pintoja, halkaisevat vihanneksia n\u00e4hd\u00e4kseen sis\u00e4rakenteen, punnitsevat ja mittaavat niit\u00e4 ja kylv\u00e4v\u00e4t siemeni\u00e4 luokkahuoneen kasvatusastiaan.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Vihannekset ovat universaali ruokaryhm\u00e4, joka esiintyy kaikissa kulttuureissa. Aloita tuttujen vihannesten suomenkielisist\u00e4 nimist\u00e4 ja laajenna harvinaisempiin lajeihin. Kuvitetut sanakortit ja vihannes-kuva-sana-yhdist\u00e4misteht\u00e4v\u00e4t tukevat sanaston rakentamista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta tutkimusteht\u00e4vill\u00e4: vertaile kasvinosien (juuri, varsi, lehti, kukka, hedelm\u00e4) sy\u00f6t\u00e4vi\u00e4 osia eri vihanneksissa, tutki kasvuolosuhteita ja kirjoita viljelyopas luokan puutarhalle.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Vihannesten tunnistus- ja luokittelukoe',
      criteria: 'N\u00e4yt\u00e4 oppilaalle kaksitoista vihanneskuvaa ja pyyd\u00e4 nime\u00e4m\u00e4\u00e4n ne sek\u00e4 lajittelemaan kasvutavan mukaan (juurekset, lehtivihannekset, hedelmävihannekset). Arvioi nimien oikeellisuutta ja luokittelun perusteluja.',
      gradeLevel: 'Esiopetus\u20131. lk',
    },
    {
      method: 'Puutarhap\u00e4iv\u00e4kirja',
      criteria: 'Seuraa oppilaan kasvatusprojektia viiden viikon ajan. Arvioi mittaamisen tarkkuutta, havaintojen yksityiskohtaisuutta ja tieteellisen sanaston k\u00e4ytt\u00f6\u00e4 (siemen, iti, verso, lehti, juuri).',
      gradeLevel: '1.\u20133. lk',
    },
    {
      method: 'Ravitsemustiedon soveltamisteht\u00e4v\u00e4',
      criteria: 'Pyyd\u00e4 oppilasta suunnittelemaan p\u00e4iv\u00e4n ateriat, joissa on vihanneksia joka aterialla. Arvioi monipuolisuutta, v\u00e4rien kirjoa ja kyky\u00e4 perustella vihannesten terveyshyod\u00e4t.',
      gradeLevel: '2.\u20133. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (biologia ja terveystieto)',
      connection: 'Vihannekset yhdist\u00e4v\u00e4t kasvitieteen (kasvien osat, kasvuprosessi) ja ravitsemustiedon (vitamiinit, kivenn\u00e4isaineet). POPS 2014:n tavoitteet kasvien tutkimisesta ja terveellisest\u00e4 ruokavaliosta toteutuvat yhdess\u00e4.',
      activity: 'Vihannesluokitteluteht\u00e4v\u00e4n j\u00e4lkeen oppilaat halkaissevat todellisia vihanneksia ja tutkivat niiden sis\u00e4rakennetta: porkkanan juuri, salaatin lehti, kurkun hedelm\u00e4.',
    },
    {
      subject: 'Matematiikka (mittaaminen ja lajittelu)',
      connection: 'Vihannesten punnitseminen, mittaaminen ja lajittelu tarjoavat konkreettisen kontekstin matemaattisille k\u00e4sitteille. Puutarhan kasvun seuranta kehitt\u00e4\u00e4 taulukointia ja graafista esityst\u00e4.',
      activity: 'Laskuteht\u00e4v\u00e4n j\u00e4lkeen oppilaat punnitsevat vihanneksia, kirjaavat painot taulukkoon ja piirt\u00e4v\u00e4t pylv\u00e4sdiagrammin raskaimmasta kevyimpaan.',
    },
    {
      subject: 'K\u00e4sity\u00f6 ja kotitalous',
      connection: 'Vihannesten valmistaminen yhdist\u00e4\u00e4 keitti\u00f6taidot ja ravitsemustiedon. POPS 2014:n k\u00e4sity\u00f6n tavoitteet sis\u00e4lt\u00e4v\u00e4t arjen taitojen kehitt\u00e4misen.',
      activity: 'Vihannesreseptity\u00f6lehden j\u00e4lkeen oppilaat valmistavat yksinkertaisen vihannessalaatin tai keittodipistoksen, mitaten ja leikaten ohjatusti.',
    },
  ],

  uniqueAngle: 'Vihannesaiheiset ty\u00f6lehdet yhdist\u00e4v\u00e4t ravitsemuskasvatuksen, kasvitieteen ja arjen taidot tavalla, joka voi muuttaa lasten suhtautumista vihanneksiin. Tutkimukset osoittavat, ett\u00e4 toistuva altistuminen vihanneksille \u2014 my\u00f6s kuvien ja nimien kautta \u2014 lis\u00e4\u00e4 lasten halukkuutta maistaa ja sy\u00f6d\u00e4 niit\u00e4. Vihanneksissa piilee rikkas pedagoginen maailma: juurekset kasvavat maan alla, lehtivihannekset sen p\u00e4\u00e4ll\u00e4, palkokasvit koteloissa \u2014 ja jokainen kasvutapa tarjoaa oman biologisen oppituntinsa. Suomessa puutarhanhoito ja ruoantuotannon ymm\u00e4rt\u00e4minen ovat POPS 2014:n ymp\u00e4rist\u00f6opin keskeisi\u00e4 tavoitteita, ja vihannestyolehdet rakentavat siltaa luokkahuoneen ja puutarhan v\u00e4lille. Konkreettinen viljelyprojekti yhdistettyn\u00e4 ty\u00f6lehtiteht\u00e4viin on yksi tehokkaimmista tavoista opettaa k\u00e4rsiv\u00e4llisyytt\u00e4, vastuullisuutta ja luonnon prosessien kunnioittamista. Ravitsemuksen n\u00e4k\u00f6kulmasta vihannestyolehdet tukevat terveystiedon tavoitteita tekemall\u00e4 vihanneksista tuttuja ja kiinnostavia ennen ruokapyyt\u00e4\u00e4.',

  researchCitation: 'Nekitsing, C., Blundell-Birtill, P., Cockroft, J. E. & Hetherington, M. M. (2018). Systematic Review and Meta-analysis of Strategies to Increase Vegetable Consumption in Preschool Children. American Journal of Clinical Nutrition. Tutkimus osoitti, ett\u00e4 monipuolinen altistuminen vihanneksille, mukaan lukien kuvallinen ja nimetty tutustuminen, lis\u00e4\u00e4 lasten vihannesten sy\u00f6nti\u00e4 merkitt\u00e4v\u00e4sti.',

  culturalNotes: 'Suomessa vihannesten viljely on olennainen osa maatalouskulttuuria ja kotipuutarhaperinnett\u00e4. POPS 2014 korostaa ruoantuotannon ymm\u00e4rt\u00e4mist\u00e4 ja terveellisen ruokavalion merkityst\u00e4. Vihannesty\u00f6lehdet yhdist\u00e4v\u00e4t suomalaisen puutarhaperinteen, ravitsemuskasvatuksen ja kasvitieteen tavalla, joka tukee sek\u00e4 kotimaisten lajikkeiden tunnistamista ett\u00e4 globaalin ruoantuotannon ymm\u00e4rt\u00e4mist\u00e4.',

  snippetDefinition: 'Vihannesaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t porkkanoita, tomaatteja, kurkkuja ja muita vihanneksia lajittelun, laskemisen, sanaston ja ravitsemustiedon opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t luokittelua, mittaamista, kasvinosien tutkimista ja reseptiteht\u00e4vi\u00e4.',

  snippetHowTo: [
    'Valitse ty\u00f6lehdet lapsen kehitystason mukaan: nuoremmille v\u00e4ritt\u00e4mist\u00e4 ja tunnistamista, vanhemmille luokittelu- ja tutkimusteht\u00e4vi\u00e4.',
    'Aloita tutustumalla vihanneksiin moniaistisesti: tuo luokkaan oikeita vihanneksia kosketettaviksi, haistettaviksi ja tutkittaviksi.',
    'Yhdist\u00e4 ty\u00f6lehti puutarhaprojektiin: kylv\u00e4k\u00e4\u00e4 siemeni\u00e4 ja seuratkaa kasvua viikoittain mittaamalla.',
    'Harjoittele luokittelua: lajitelkaa vihannekset kasvutavan (juures, lehti, hedelm\u00e4), v\u00e4rin tai koon mukaan.',
    'Lis\u00e4\u00e4 keitti\u00f6ulottuvuus: valmistakaa yksinkertainen vihannesruoka teht\u00e4v\u00e4n j\u00e4lkeen.',
    'Keskustele terveellisest\u00e4 ruokavaliosta: miksi lautasmallissa on vihanneksia ja miten eri v\u00e4riset vihannekset sis\u00e4lt\u00e4v\u00e4t eri ravintoaineita.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet kansioon ja seuratkaa vihannessanaston ja luokittelutaitojen kehittymist\u00e4.',
  ],

  limitations: 'Vihannesty\u00f6lehdet voivat painottua tyypillisiin eurooppalaisiin vihanneksiin, jolloin eri kulttuurien perinteiset kasvikset j\u00e4\u00e4v\u00e4t v\u00e4h\u00e4lle huomiolle. Allergiat ja ruoka-ainerajoitukset on huomioitava, kun ty\u00f6lehtiteht\u00e4vi\u00e4 yhdistet\u00e4\u00e4n oikeiden vihannesten k\u00e4sittelyyn ja maistamiseen.',

  themeComparisons: [
    {
      vsThemeId: 'fruits',
      summary: 'Hedelm\u00e4ty\u00f6lehdet keskittyv\u00e4t makeisiin hedelmiin ja trooppisiin lajeihin. Vihannesty\u00f6lehdet tutkivat juureksia, lehtivihanneksia ja palkokasveja sek\u00e4 kasvien eri osien sy\u00f6t\u00e4vyytt\u00e4.',
    },
    {
      vsThemeId: 'food',
      summary: 'Ruokaty\u00f6lehdet kattavat ruokavalion kokonaisuutena. Vihannesty\u00f6lehdet syventyv\u00e4t yhteen ruokaryhm\u00e4\u00e4n ja tutkivat kasvien biologiaa, viljelyuml\u00e4 ja ravitsemuksellista merkityst\u00e4.',
    },
    {
      vsThemeId: 'garden',
      summary: 'Puutarhaty\u00f6lehdet k\u00e4sittelev\u00e4t puutarhan kokonaisvaltaista hoitoa. Vihannesty\u00f6lehdet keskittyv\u00e4t sy\u00f6t\u00e4vien kasvien tunnistamiseen, ravitsemukseen ja kasvuprosessiin.',
    },
    {
      vsThemeId: 'farm',
      summary: 'Maatilatyolehdet esittelev\u00e4t maatalouden kokonaisuutena el\u00e4imineen ja koneineen. Vihannesty\u00f6lehdet keskittyv\u00e4t kasvinviljelyyn ja vihannesviljelyn prosessiin siemenest\u00e4 sadoksi.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'vihannesaiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Vihannesten v\u00e4rityssivut kehitt\u00e4v\u00e4t hienomotoriikkaa ja v\u00e4rien tunnistamista, kun lapset v\u00e4ritt\u00e4v\u00e4t porkkanoita, tomaatteja ja paprikoita oikein v\u00e4rein.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'vihannesten etsi ja laske -teht\u00e4v\u00e4t',
      context: 'Etsi ja laske -teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t lukum\u00e4\u00e4r\u00e4k\u00e4sitett\u00e4, kun lapset etsiv\u00e4t ja laskevat eri vihanneslajeja v\u00e4rikk\u00e4ist\u00e4 puutarhakuvista.',
    },
    {
      appId: 'word-search',
      anchorText: 'vihannessanaston sanahaku-ty\u00f6lehdet',
      context: 'Sanahakuteht\u00e4v\u00e4t vahvistavat vihannessanastoa, kun lapset etsiv\u00e4t termej\u00e4 kuten porkkana, tomaatti, kurkku ja paprika sanaruudukosta.',
    },
    {
      appId: 'picture-sort',
      anchorText: 'vihannesten lajitteluteht\u00e4v\u00e4t',
      context: 'Lajitteluteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t luokittelutaitoja, kun lapset lajittelevat vihanneksia kasvutavan, v\u00e4rin tai koon mukaan.',
    },
  ],

  expertTips: [
    {
      tip: 'Aloita kasvatusprojekti nopeasti itavill\u00e4 siemenill\u00e4 kuten retiisin tai salaat in siemenill\u00e4: tulokset n\u00e4kyv\u00e4t viikossa, mik\u00e4 yll\u00e4pit\u00e4\u00e4 lasten motivaatiota ja yhdist\u00e4\u00e4 ty\u00f6lehdet todelliseen kasvuprosessiin.',
      source: 'Puutarhaopetuksen opas',
      gradeRange: 'Esiopetus\u20132. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 v\u00e4riryhmittely\u00e4 ravitsemuskasvatuksessa: vihre\u00e4t, oranssit, punaiset ja violetit vihannekset sis\u00e4lt\u00e4v\u00e4t eri ravintoaineita \u2014 v\u00e4rilajittelu opettaa sek\u00e4 luokittelua ett\u00e4 ravitsemusta samanaikaisesti.',
      source: 'Ravitsemuskasvatuksen k\u00e4sikirja',
      gradeRange: '1.\u20133. lk',
    },
    {
      tip: 'Yhdist\u00e4 vihannestyolehdet maistamishetkeen: tutkimusten mukaan lasten on maistettava uutta vihannesta 10\u201315 kertaa ennen kuin he hyv\u00e4ksyv\u00e4t sen \u2014 ty\u00f6lehtien kautta tapahtuva nimien oppiminen on osa t\u00e4t\u00e4 altistusprosessia.',
      source: 'POPS 2014, terveystiedon opetuksen suositukset',
      gradeRange: 'Esiopetus\u20133. lk',
    },
  ],`;

// ── 5. Flowers (kukat) ──────────────────────────────────────────────────

const flowersFields = `
  // -- SEO Enrichment (Part 183) --

  classroomScenarios: [
    {
      situation: 'Ensimm\u00e4isen luokan opettaja haluaa opettaa kasvien osia ja kasvuprosessia, mutta oppilaat pit\u00e4v\u00e4t biologiaa tylsana ja eiv\u00e4t jaksa keskittyy\u00e4 perinteisiin kasvitieteen teht\u00e4viin.',
      solution: 'H\u00e4n ottaa k\u00e4ytt\u00f6\u00f6n kukkateemaiset ty\u00f6lehdet, joissa oppilaat v\u00e4ritt\u00e4v\u00e4t kukkien osia ja nime\u00e4v\u00e4t ne (ter\u00e4lehti, hede, emi), seuraavat siemenen kasvua kukaksi, lajittelevat kukkia v\u00e4rin mukaan ja suunnittelevat kukkapenkin.',
      outcome: 'Nelj\u00e4n viikon j\u00e4lkeen oppilaat tunnistavat kukkien p\u00e4\u00e4osat, ymm\u00e4rt\u00e4v\u00e4t kasvuprosessin vaiheet, k\u00e4ytt\u00e4v\u00e4t kasvitieteen sanastoa sujuvasti ja ovat innostuneita puutarhan tutkimisesta.',
    },
    {
      situation: 'Kotikouluvanhempi etsii keV\u00e4\u00e4teemaa, joka yhdist\u00e4\u00e4 taiteen, luonnontieteen ja kielen oppimisen lapselle, joka rakastaa piirt\u00e4mist\u00e4 ja ulkona oloa.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 kukkaty\u00f6lehti\u00e4 yhdistettyn\u00e4 luontoretk\u00e4\u00e4n: lapsi piirt\u00e4\u00e4 l\u00f6yt\u00e4mi\u00e4\u00e4n kukkia luontop\u00e4iv\u00e4kirjaan, tunnistaa lajeja m\u00e4\u00e4ritysoppaan avulla, tutkii kukkien osia suurennuslasilla ja kirjoittaa havaintojaan.',
      outcome: 'Lapsi ymm\u00e4rt\u00e4\u00e4 p\u00f6lytyksen ja kasvien lis\u00e4\u00e4ntymisen perusperiaatteet, tunnistaa kotimaisia kukkia ja osaa kuvata havaintojaan tarkoilla biologisilla termeill\u00e4.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Kukkalajien kirjo', value: '15+ kukkalajia' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'K\u00e4yt\u00e4 yksityiskohtaisia kukkakuvituksia ja poikkileikkauskuvia, jotka paljastavat kukan sis\u00e4rakenteen. Symmetriakuviot kukkien ter\u00e4lehdist\u00e4 ja v\u00e4riympyr\u00e4n linkitt\u00e4minen kukkien v\u00e4reihin syvent\u00e4v\u00e4t visuaalista ymm\u00e4rryst\u00e4.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Tuo oikeita kukkia luokkaan tutkittaviksi: oppilaat purkavat kukan osiin, tunnistavat ter\u00e4lehdet, heteet ja emin, kylv\u00e4v\u00e4t siemeni\u00e4 ruukkuihin ja seuraavat kasvuprosessia viikoittain.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Kukat ovat universaalisti kaunis ja tuttu aihe kaikissa kulttuureissa. Aloita tuttujen kukkien (auringonkukka, ruusu, tulppaani) suomenkielisest\u00e4 nime\u00e4misest\u00e4 ja laajenna kasvitieteen sanastoon. Kuvitetut kukkasanakortit tukevat oppimista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta p\u00f6lytyksen tutkimuksella: vertaile hy\u00f6nteis- ja tuulip\u00f6lytteisi\u00e4 kukkia, tutki kukkien sopeutumia eri ymp\u00e4rist\u00f6ihin ja dokumentoi koulun pihan kukkien lajimonimuotoisuutta.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Kukan osien tunnistuskoe',
      criteria: 'Anna oppilaalle kukkakuva ja pyyd\u00e4 nime\u00e4m\u00e4\u00e4n viisi osaa (ter\u00e4lehti, hede, emi, varsi, lehti). Arvioi nimien oikeellisuutta, kyky\u00e4 selitt\u00e4\u00e4 kunkin osan teht\u00e4v\u00e4 ja biologisen sanaston k\u00e4ytt\u00f6\u00e4.',
      gradeLevel: '1.\u20133. lk',
    },
    {
      method: 'Kukkien havaintop\u00e4iv\u00e4kirja',
      criteria: 'Ker\u00e4\u00e4 oppilaan luontoretken havainnot ja piirrokset neli\u00e4n viikon ajalta. Arvioi havaintojen tarkkuutta, piirrosten yksityiskohtaisuutta ja tieteellisen sanaston kehittymist\u00e4.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Kasvatusprojektin dokumentointi',
      criteria: 'Seuraa siemenen kasvua kukaksi ja pyyd\u00e4 oppilasta dokumentoimaan jokainen vaihe piirroksin ja mittauksin. Arvioi mittaamisen tarkkuutta, vaiheiden tunnistamista ja kokonaisesityksen selkeytt\u00e4.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (biologia)',
      connection: 'Kukat ilment\u00e4v\u00e4t kasvien lis\u00e4\u00e4ntymisbiologiaa: p\u00f6lytys, hedelmöitys ja siementen leviöminen. POPS 2014:n ymp\u00e4rist\u00f6opin tavoitteet kasvien tutkimisesta ja el\u00e4m\u00e4nkierroista toteutuvat kukkateemassa luonnollisesti.',
      activity: 'Kukan osien tunnistamisteht\u00e4v\u00e4n j\u00e4lkeen oppilaat purkavat oikean kukan osiin, tunnistavat ter\u00e4lehdet, heteet ja emin ja piirt\u00e4v\u00e4t suurennetun kuvan rakenteesta.',
    },
    {
      subject: 'Kuvataide',
      connection: 'Kukkien symmetria, v\u00e4rimaailma ja orgaaniset muodot inspiroivat taiteellista ilmaisua. Kukat ovat olleet taiteen keskeinen aihe Monet\u0027sta Marimekkonn sek\u00e4 opettavat v\u00e4riteoriaa luonnollisessa kontekstissa.',
      activity: 'V\u00e4ritysteht\u00e4v\u00e4n j\u00e4lkeen oppilaat maalaavat oikeasta kukasta vesiväritaideteoksen kiinnitt\u00e4en huomiota v\u00e4rien sekoittamiseen ja symmetriaan.',
    },
    {
      subject: 'Matematiikka (symmetria ja kuviot)',
      connection: 'Kukkien ter\u00e4lehtien symmetria ja lukum\u00e4\u00e4r\u00e4kuviot tarjoavat luontevan kontekstin geometrialle ja laskemiselle. POPS 2014:n matematiikan tavoitteet symmetriasta ja kuvioista toteutuvat konkreettisesti.',
      activity: 'Kukkien lajitteluteht\u00e4v\u00e4n j\u00e4lkeen oppilaat laskevat eri kukkien ter\u00e4lehtien m\u00e4\u00e4r\u00e4t, piirt\u00e4v\u00e4t symmetriakuvioita ja vertailevat kukkien geometrisia muotoja.',
    },
  ],

  uniqueAngle: 'Kukkateemaiset ty\u00f6lehdet yhdist\u00e4v\u00e4t tieteellisen tarkkailun ja esteettisen kokemuksen tavalla, joka on ainutlaatuinen oppimateriaaleissa. Kukat ovat luonnon n\u00e4kyvin kauneus, ja niiden tutkiminen her\u00e4tt\u00e4\u00e4 lapsissa samanaikaisesti ihmetyksen, uteliaisuuden ja luontoyhteyden tunteen. Biologisesti kukat ovat kasvien lis\u00e4\u00e4ntymiselimi\u00e4, ja niiden tutkiminen avaa portin p\u00f6lytykseen, siementen leviämiseen ja ekosysteemien vuorovaikutussuhteisiin. Suomessa kev\u00e4\u00e4n ensimm\u00e4iset kukat \u2014 leskenlehtii, sinivuokko, valkovuokko \u2014 ovat kulttuurisesti merkitt\u00e4vi\u00e4 kev\u00e4\u00e4n merkkej\u00e4, ja niiden tunnistaminen on osa suomalaista luontosuhdetta. POPS 2014 korostaa l\u00e4hiymp\u00e4rist\u00f6n tutkimista ja kasvien havainnointia, ja kukkaty\u00f6lehdet rakentavat siltaa luokkahuoneen ja luonnon v\u00e4lille. Kukkien symmetria, v\u00e4rimaailma ja muotojen moninaisuus tarjoavat luontevan yhteyden my\u00f6s kuvataiteen ja matematiikan oppisis\u00e4lt\u00f6ihin.',

  researchCitation: 'Fancovicova, J. & Prokop, P. (2011). Plants Have a Chance: Outdoor Educational Programmes Alter Students\u0027 Knowledge and Attitudes Towards Plants. Environmental Education Research. Tutkimus osoitti, ett\u00e4 ulkona toteutettu kasvien tutkiminen yhdistettyn\u00e4 luokkahuoneteht\u00e4viin parantaa merkitt\u00e4v\u00e4sti lasten kasvitieteen osaamista ja my\u00f6nteist\u00e4 suhtautumista kasveihin.',

  culturalNotes: 'Suomessa kukat ovat syv\u00e4sti kulttuurisesti merkitt\u00e4vi\u00e4: kev\u00e4\u00e4n ensimm\u00e4iset kukat symboloivat talven p\u00e4\u00e4ttymist\u00e4, juhannuskukat ovat perinne ja Suomen kansalliskukka on kielo. POPS 2014 painottaa l\u00e4hiymp\u00e4rist\u00f6n kasvien tunnistamista ja tutkimista. Suomalaisten lasten luontokasvatus hy\u00f6tyy kukkateemaisista ty\u00f6lehdist\u00e4, jotka yhdist\u00e4v\u00e4t kotimaisten lajien tunnistamisen biologiseen ymm\u00e4rrykseen.',

  snippetDefinition: 'Kukkateemaiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t ruusuja, auringonkukkia, tulppaaneja ja muita kukkia kasvitieteen, v\u00e4rien, symmetrian ja sanaston opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t kukan osien tunnistamista, kasvuprosessin seurantaa ja lajien luokittelua.',

  snippetHowTo: [
    'Valitse ty\u00f6lehdet lapsen kehitystason mukaan: nuoremmille v\u00e4ritt\u00e4mist\u00e4 ja nime\u00e4mist\u00e4, vanhemmille kasvitieteen tutkimusteht\u00e4vi\u00e4.',
    'Aloita tutustumalla oikeisiin kukkiin: tuo luokkaan erilaisia kukkia ja anna lasten tutkia niit\u00e4 suurennuslasilla.',
    'Yhdist\u00e4 ty\u00f6lehti luontoretkeen: tunnistakaa koulun pihan ja l\u00e4himets\u00e4n kukkia m\u00e4\u00e4ritysoppaan avulla.',
    'Harjoittele kasvitieteen sanastoa: nime\u00e4k\u00e4\u00e4 yhdess\u00e4 kukan osat (ter\u00e4lehti, hede, emi, varsi, lehti) ja keskustele niiden teht\u00e4vist\u00e4.',
    'Lis\u00e4\u00e4 kasvatusprojekti: kylv\u00e4k\u00e4\u00e4 siemeni\u00e4 ja seuratkaa kasvua piirroksin ja mittauksin.',
    'Yhdist\u00e4 taide ja tiede: piirrr\u00e4 ja maalatkaa kukkia huomioiden symmetria ja v\u00e4rien tarkkuus.',
    'Ker\u00e4\u00e4 havainnot ja ty\u00f6lehdet kukkavihkoon ja vertailkaa kasvitieteen sanaston ja lajitunnistuksen kehittymist\u00e4.',
  ],

  limitations: 'Kukkateema sopii parhaiten kev\u00e4\u00e4seen ja kes\u00e4\u00e4n, kun elaVi\u00e4 kukkia on saatavilla luonnossa. Talvella oikeiden kukkien tutkiminen rajoittuu ruukkukasveihin ja leikkokukkiin. Siitep\u00f6lyallergiat on huomioitava, kun tuodaan kukkia luokkahuoneeseen tai tehd\u00e4\u00e4n retkia kukkiviin ymp\u00e4rist\u00f6ihin.',

  themeComparisons: [
    {
      vsThemeId: 'nature',
      summary: 'Luontoty\u00f6lehdet tutkivat ekosysteemej\u00e4 kokonaisvaltaisesti. Kukkateema syventyy kasvien lis\u00e4\u00e4ntymisbiologiaan, p\u00f6lytykseen ja kukkien rakenteeseen.',
    },
    {
      vsThemeId: 'garden',
      summary: 'Puutarhaty\u00f6lehdet kattavat koko puutarhan hoidon. Kukkateema keskittyy nimenomaan kukkien biologiaan, estetiikkaan ja lajien tunnistamiseen.',
    },
    {
      vsThemeId: 'spring',
      summary: 'Kev\u00e4tty\u00f6lehdet tutkivat vuodenajan muutosta laajasti. Kukkateema syvent\u00e4\u00e4 kev\u00e4\u00e4n n\u00e4kyvint\u00e4 ilmi\u00f6t\u00e4 \u2014 kukkien puhkeamista \u2014 biologisesta n\u00e4k\u00f6kulmasta.',
    },
    {
      vsThemeId: 'insects',
      summary: 'Hy\u00f6nteisteema tutkii pieni\u00e4 el\u00e4imi\u00e4 itsen\u00e4isesti. Kukkateema yhdist\u00e4\u00e4 hy\u00f6nteiset p\u00f6lytykseen ja opettaa kasvien ja el\u00e4inten vuorovaikutusta.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'kukkateemaiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Kukkien v\u00e4rityssivut kehitt\u00e4v\u00e4t hienomotoriikkaa ja v\u00e4rien hallintaa, kun lapset v\u00e4ritt\u00e4v\u00e4t ter\u00e4lehti\u00e4, varsia ja lehti\u00e4 luonnonmukaisin v\u00e4rein.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'kukkien etsi ja laske -teht\u00e4v\u00e4t',
      context: 'Etsi ja laske -teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t lukum\u00e4\u00e4r\u00e4k\u00e4sitett\u00e4 ja visuaalista tarkkaavaisuutta, kun lapset etsiv\u00e4t ja laskevat eri kukkalajeja puutarhakuvasta.',
    },
    {
      appId: 'word-search',
      anchorText: 'kukkasanaston sanahaku-ty\u00f6lehdet',
      context: 'Sanahakuteht\u00e4v\u00e4t vahvistavat kasvitieteen sanastoa, kun lapset etsiv\u00e4t termej\u00e4 kuten ruusu, auringonkukka, ter\u00e4lehti ja hede sanaruudukosta.',
    },
    {
      appId: 'pattern-train',
      anchorText: 'kukkateemaiset kuviojunateht\u00e4v\u00e4t',
      context: 'Kuviojunateht\u00e4v\u00e4t kehitt\u00e4v\u00e4t loogista ajattelua, kun lapset tunnistavat ja jatkavat kukkakuvioiden sarjoja symmetrian ja v\u00e4rien perusteella.',
    },
  ],

  expertTips: [
    {
      tip: 'Aloita keV\u00e4\u00e4ll\u00e4 kotimaisten kukkien tunnistamisesta: leskenlehtii, sinivuokko ja valkovuokko ovat helposti l\u00f6ydett\u00e4viss\u00e4 ja tuovat ty\u00f6lehtien sis\u00e4ll\u00f6n el\u00e4v\u00e4ksi luontoretkell\u00e4.',
      source: 'Luonnontieteellisen opetuksen menetelm\u00e4opas',
      gradeRange: 'Esiopetus\u20132. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 suurennuslasia kukan osien tutkimiseen: lasten ihmetys on suurinta, kun he n\u00e4kev\u00e4t siitep\u00f6lyhi ukkaset ja pienet rakenteen yksityiskohdat omin silmin.',
      source: 'Tutkivan oppimisen opas',
      gradeRange: '1.\u20133. lk',
    },
    {
      tip: 'Yhdist\u00e4 kukkaty\u00f6lehdet kasvatusprojektiin: kylv\u00e4 nopeasti kukkivien lajien siemeni\u00e4 (krassi, kehäkukka) ja dokumentoi kasvuprosessi ty\u00f6lehtien ja piirrosten avulla.',
      source: 'POPS 2014, ymp\u00e4rist\u00f6opin opetuksen suositukset',
      gradeRange: 'Esiopetus\u20133. lk',
    },
  ],`;

// ── 6. Birds (linnut) ───────────────────────────────────────────────────

const birdsFields = `
  // -- SEO Enrichment (Part 183) --

  classroomScenarios: [
    {
      situation: 'Toisen luokan opettaja huomaa, ett\u00e4 oppilaat eiv\u00e4t osaa tunnistaa yleisimpi\u00e4k\u00e4\u00e4n suomalaisia lintuja, vaikka ne n\u00e4kyv\u00e4t p\u00e4ivitt\u00e4in koulun pihalla.',
      solution: 'H\u00e4n ottaa k\u00e4ytt\u00f6\u00f6n lintuaiheiset ty\u00f6lehdet, joissa oppilaat v\u00e4ritt\u00e4v\u00e4t lintulajeja, yhdist\u00e4v\u00e4t linnun sen lauluun, lajittelevat lintuja elinymps\u00e4rist\u00f6n mukaan ja laskevat lintuja talviruokintataulusta.',
      outcome: 'Nelj\u00e4n viikon j\u00e4lkeen oppilaat tunnistavat yli kymmenen kotimaista lintulajia, osaavat kuvailla lintujen ominaisuuksia ja ovat innostuneita lintujen tarkkailusta koulun pihalla.',
    },
    {
      situation: 'Kotikouluvanhempi haluaa yhdist\u00e4\u00e4 luonnonharrastuksen ja akateemiset taidot lapselle, joka on kiinnostunut el\u00e4imist\u00e4 ja viett\u00e4\u00e4 paljon aikaa ulkona.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 lintuty\u00f6lehti\u00e4 yhdistettyn\u00e4 linturetkeilyyn: lapsi pit\u00e4\u00e4 lintup\u00e4iv\u00e4kirjaa, piirt\u00e4\u00e4 havaintoja, tunnistaa lajeja m\u00e4\u00e4ritysoppaan avulla ja t\u00e4ytt\u00e4\u00e4 lajittelu- ja laskuteht\u00e4vi\u00e4 oikeiden havaintojen pohjalta.',
      outcome: 'Lapsi tunnistaa kymmeni\u00e4 lintulajeja \u00e4\u00e4nen ja ulkon\u00e4\u00f6n perusteella, ymm\u00e4rt\u00e4\u00e4 muuttolintujen matkan ja osaa kertoa lintujen sopeutumista eri ymp\u00e4rist\u00f6ihin.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Lintulajien kirjo', value: '20+ lajia' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'K\u00e4yt\u00e4 tarkkoja lintukuvituksia, jotka n\u00e4ytt\u00e4v\u00e4t h\u00f6yhenien v\u00e4rit, nokan muodon ja jalkojen rakenteen. Vertailukortit samankaltaisista lajeista (esim. tali- ja sinitiainen) kehitt\u00e4v\u00e4t visuaalista erottelutaitoa.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdist\u00e4 ty\u00f6lehdet linturetkeen: oppilaat k\u00e4ytt\u00e4v\u00e4t kiikareita lintujen tarkkailuun, t\u00e4ytt\u00e4v\u00e4t havaintolomakkeita kent\u00e4ll\u00e4 ja rakentavat linnunp\u00f6nt\u00f6n tai ruokintalaudan k\u00e4sity\u00f6n\u00e4.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Linnut ovat universaali aihe kaikissa kulttuureissa. Aloita yleisimmist\u00e4 lajeista (varpunen, pulu, varis) ja rakenna sanastoa asteittain. Kuvitetut lintukortit suomenkielisine nimineen ja \u00e4\u00e4nilinkkeineen tukevat oppimista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta tutkimusteht\u00e4vill\u00e4: vertaile muutto- ja paikkalintujen sopeutumia, tutki nokan muodon ja ruokavalion yhteytt\u00e4, dokumentoi koulun pihan lintulajisto ja kirjoita lajiesittely tieteelliseen malliin.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Lintulajien tunnistuskoe',
      criteria: 'N\u00e4yt\u00e4 oppilaalle kymmenen lintukuvaa ja pyyd\u00e4 nime\u00e4m\u00e4\u00e4n lajit sek\u00e4 kertomaan kunkin linnun yksi erityispiirre. Arvioi tunnistuksen tarkkuutta ja kuvailun monipuolisuutta.',
      gradeLevel: '1.\u20133. lk',
    },
    {
      method: 'Lintup\u00e4iv\u00e4kirja',
      criteria: 'Ker\u00e4\u00e4 oppilaan lintuhavainnot nelj\u00e4n viikon ajalta. Arvioi havaintojen s\u00e4\u00e4nn\u00f6llisyytt\u00e4, lajien tunnistamisen kehittymist\u00e4 ja piirrosten yksityiskohtaisuuden kasvua.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Lintujen lajitteluteht\u00e4v\u00e4',
      criteria: 'Anna oppilaalle kaksitoista lintukuvaa ja pyyd\u00e4 lajittelemaan ne ryhmin: muuttolinnut ja paikkalinnut, tai ruokavalion mukaan (siemensyj\u00e4t, hy\u00f6nteissyj\u00e4t, sekasyoj\u00e4t). Arvioi luokitteluperusteiden hallintaa.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (biologia ja ekologia)',
      connection: 'Linnut ovat l\u00e4hiymp\u00e4rist\u00f6n n\u00e4kyvimpi\u00e4 villiel\u00e4imi\u00e4: muuttolintujen matkat, pes\u00e4k\u00e4ytt\u00e4ytyminen ja sopeutumat eri ymp\u00e4rist\u00f6ihin avaavat portin ekologiaan. POPS 2014 painottaa l\u00e4hiymp\u00e4rist\u00f6n el\u00e4imien tutkimista.',
      activity: 'Lintulajien tunnistamisteht\u00e4v\u00e4n j\u00e4lkeen oppilaat tarkkailevat koulun pihan lintuja 15 minuuttia, kirjaavat havainnot ja vertailevat tuloksia luokassa.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Lintuaihe rikastuttaa kuvailevaa sanastoa: h\u00f6yhenpuvun v\u00e4rit, laulun kuvaaminen sanoin ja lintujen k\u00e4ytt\u00e4ytymisen kerronta kehitt\u00e4v\u00e4t kielellist\u00e4 ilmaisua.',
      activity: 'Lintuty\u00f6lehden j\u00e4lkeen oppilaat kirjoittavat lyhyen tarinan lemmikkilinnustaan tai mielikuvituslintujen seikkailusta k\u00e4ytt\u00e4en v\u00e4hint\u00e4\u00e4n viitt\u00e4 kuvailevaa adjektiivia.',
    },
    {
      subject: 'Musiikki',
      connection: 'Lintujen laulu on luonnon musiikkia, ja monien lajien \u00e4\u00e4net ovat tunnistettavia. Lintuteema yhdist\u00e4\u00e4 biologian ja musiikin opetuksen luonnollisesti.',
      activity: 'Lintulajien tunnistuksen j\u00e4lkeen oppilaat kuuntelevat eri lintujen \u00e4\u00e4ni\u00e4 ja yritt\u00e4v\u00e4t tunnistaa lajin pelk\u00e4n laulun perusteella.',
    },
  ],

  uniqueAngle: 'Lintuaiheiset ty\u00f6lehdet tarjoavat yhden harvoista teemoista, joissa luokkahuoneopetus siirtyy v\u00e4litt\u00f6m\u00e4sti todelliseen luontohavainnointiin \u2014 lintuja n\u00e4kee joka p\u00e4iv\u00e4, kaikkialla, vuodenajasta riippumatta. T\u00e4m\u00e4 jatkuva saatavuus tekee linnuista ainutlaatuisen tehokkaan pedagogisen v\u00e4lineen: jokainen ikkunasta n\u00e4kyv\u00e4 lintu vahvistaa ty\u00f6lehdell\u00e4 opittua. Suomessa lintuharrastus on poikkeuksellisen suosittua, ja Pihalasku on kansallinen tapahtuma, johon osallistuvat tuhannet perheet. POPS 2014 korostaa l\u00e4hiymp\u00e4rist\u00f6n el\u00e4inten tutkimista, ja linnut ovat t\u00e4h\u00e4n tarkoitukseen ihantteelliset: ne ovat n\u00e4kyvi\u00e4, turvallisia tarkkailla ja monimuotoisia. Muuttolintujen matkat tarjoavat luontevan yhteyden maantieteeseen, ja pes\u00e4k\u00e4ytt\u00e4ytyminen avaa ikkunan el\u00e4inten sis\u00e4syntyiseen viisauteen. Linnunp\u00f6nt\u00f6n rakentaminen yhdist\u00e4\u00e4 k\u00e4sity\u00f6n ja biologian, ja talviruokinta opettaa vastuullisuutta ja empatiaa.',

  researchCitation: 'Louv, R. (2005). Last Child in the Woods. Algonquin Books. Tutkimus korostaa luontokokemusten, erityisesti lintujen ja muiden villiel\u00e4inten havainnoinnin, merkityst\u00e4 lasten kognitiiviselle, emotionaaliselle ja fyysiselle kehitykselle. S\u00e4\u00e4nn\u00f6llinen luontokontakti v\u00e4hent\u00e4\u00e4 stressii\u00e4 ja parantaa keskittymiskyky\u00e4.',

  culturalNotes: 'Suomessa lintuharrastus on poikkeuksellisen suosittua: BirdLife Suomi j\u00e4rjest\u00e4\u00e4 vuosittain Pihalaskun ja Talvilintulaskennan, joihin tuhannet perheet osallistuvat. Suomen kansallislintu on laulujoutsen, joka symboloi suomalaista er\u00e4maata ja puhtaita vesi\u00e4. POPS 2014 painottaa l\u00e4hiymp\u00e4rist\u00f6n el\u00e4inten tutkimista, ja lintuty\u00f6lehdet tukevat t\u00e4t\u00e4 tavoitetta yhdist\u00e4m\u00e4ll\u00e4 luokkahuoneopetuksen ja ulkona tapahtuvan havainnoinnin.',

  snippetDefinition: 'Lintuaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t tiaisia, punarrintoja, joutsenia ja muita lintuja lajitunnistuksen, ekologian, sanaston ja laskemisen opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t lintujen tunnistamista, elinymps\u00e4rist\u00f6jen tutkimista ja muuttolintujen maantiedett\u00e4.',

  snippetHowTo: [
    'Valitse ty\u00f6lehdet lapsen kehitystason mukaan: nuoremmille v\u00e4ritt\u00e4mist\u00e4 ja yksinkertaista tunnistamista, vanhemmille luokittelua ja tutkimusteht\u00e4vi\u00e4.',
    'Aloita tutustumalla koulun pihan tai kodin l\u00e4hiymp\u00e4rist\u00f6n lintuihin: tunnistakaa yhdess\u00e4 yleisimm\u00e4t lajit.',
    'Yhdist\u00e4 ty\u00f6lehti linturetkeen: tarkkailkaa lintuja kiikareilla ja vertailkaa havaintoja ty\u00f6lehden lajikuviin.',
    'Harjoittele tunnistusta: nokan muoto, v\u00e4ritys ja koko auttavat erottamaan lajeja toisistaan.',
    'Lis\u00e4\u00e4 \u00e4\u00e4niulottuvuus: kuunnelkaa lintujen lauluja verkosta ja yritt\u00e4k\u00e4\u00e4 tunnistaa laji pelk\u00e4n \u00e4\u00e4nen perusteella.',
    'Rakentakaa linnunp\u00f6ntt\u00f6 tai ruokkija ja seuratkaa, mitk\u00e4 lajit vierailevat \u2014 kirjatkaa havainnot lintup\u00e4iv\u00e4kirjaan.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet ja havainnot lintukansioon ja seuratkaa lajitunnistuksen ja ekologisen ymm\u00e4rryksen kehittymist\u00e4.',
  ],

  limitations: 'Lintuteema vaatii jonkin verran ulkona tapahtuvaa havainnointia optimaalisen oppimistuloksen saavuttamiseksi, mik\u00e4 voi olla haastavaa kaupunkiymp\u00e4rist\u00f6ss\u00e4 tai huonolla s\u00e4\u00e4ll\u00e4. Kiikareita ei ole k\u00e4ytett\u00e4viss\u00e4 kaikissa luokkahuoneissa, jolloin kuviin perustuva tunnistus ei anna yht\u00e4 rikaista kokemusta.',

  themeComparisons: [
    {
      vsThemeId: 'animals',
      summary: 'El\u00e4inty\u00f6lehdet kattavat laajan lajien kirjon. Lintuteema syventyy yhteen el\u00e4inryhm\u00e4\u00e4n ja opettaa h\u00f6yhenrakenteen, laulun ja muuton kaltaisia erityispiirteit\u00e4.',
    },
    {
      vsThemeId: 'farm',
      summary: 'Maatilaty\u00f6lehdet esittelev\u00e4t kotiel\u00e4imi\u00e4 mukaan lukien siipikarjaa. Lintuteema keskittyy luonnonvaraisiin lintuihin ja niiden ekologisiin rooleihin.',
    },
    {
      vsThemeId: 'insects',
      summary: 'Hy\u00f6nteisteema tutkii pienten el\u00e4inten ekologiaa. Lintuteema laajentaa elinymps\u00e4rist\u00f6tutkimuksen isompiin el\u00e4imiin ja opettaa saalistaja-saalis-suhdetta.',
    },
    {
      vsThemeId: 'forest',
      summary: 'Mets\u00e4ty\u00f6lehdet tutkivat mets\u00e4ekosysteemi\u00e4 kokonaisuutena. Lintuteema tarkentaa mets\u00e4n \u00e4\u00e4nekk\u00e4impiin asukkaisiin ja opettaa \u00e4\u00e4nipohjaista lajintunnistusta.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'lintuaiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Lintujen v\u00e4rityssivut kehitt\u00e4v\u00e4t hienomotoriikkaa ja v\u00e4rien tarkkuutta, kun lapset v\u00e4ritt\u00e4v\u00e4t h\u00f6yhenpukuja luonnonmukaisin v\u00e4rein lajin tunnistamiseksi.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'lintujen etsi ja laske -teht\u00e4v\u00e4t',
      context: 'Etsi ja laske -teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t lukum\u00e4\u00e4r\u00e4k\u00e4sitett\u00e4 ja tarkkaavaisuutta, kun lapset etsiv\u00e4t ja laskevat eri lintulajeja puisto- ja mets\u00e4kuvista.',
    },
    {
      appId: 'word-search',
      anchorText: 'lintusanaston sanahaku-ty\u00f6lehdet',
      context: 'Sanahakuteht\u00e4v\u00e4t vahvistavat lintusanastoa, kun lapset etsiv\u00e4t termej\u00e4 kuten tiainen, punarinta, joutsen ja muuttolintu sanaruudukosta.',
    },
    {
      appId: 'image-crossword',
      anchorText: 'lintuaiheiset kuvaristikot',
      context: 'Kuvaristikkoteht\u00e4v\u00e4t yhdist\u00e4v\u00e4t lintukuvien tunnistamisen ja oikeinkirjoituksen, kun lapset t\u00e4ytt\u00e4v\u00e4t lintulajien nimi\u00e4 ristikkoon kuvien perusteella.',
    },
  ],

  expertTips: [
    {
      tip: 'Aloita pihan yleisimmist\u00e4 lajeista (talitiainen, varpunen, harakka) ja laajenna harvemmin n\u00e4htyihin lajeihin vasta, kun perustunnistus on hallussa.',
      source: 'BirdLife Suomen koulutusmateriaali',
      gradeRange: 'Esiopetus\u20131. lk',
    },
    {
      tip: 'Rakentakaa luokan kanssa linnunruokkija ja seuratkaa vierailevia lajeja systemaattisesti viikon ajan \u2014 t\u00e4m\u00e4 yhdist\u00e4\u00e4 k\u00e4sity\u00f6n, biologian ja tiedonkeruun.',
      source: 'Ymp\u00e4rist\u00f6kasvatuksen opas',
      gradeRange: '1.\u20133. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 Pihalaskun materiaaleja opetuksessa: BirdLife Suomen vuotuinen lintulaskenta tarjoaa valmiin kehyksen lintujen tunnistamiselle ja tiedonkeruulle.',
      source: 'POPS 2014, ymp\u00e4rist\u00f6opin opetuksen suositukset',
      gradeRange: 'Esiopetus\u20133. lk',
    },
  ],`;

// ── 7. Pets (lemmikit) ──────────────────────────────────────────────────

const petsFields = `
  // -- SEO Enrichment (Part 183) --

  classroomScenarios: [
    {
      situation: 'Esiopetuksen opettaja huomaa, ett\u00e4 oppilaat puhuvat jatkuvasti lemmikeist\u00e4\u00e4n, mutta eiv\u00e4t osaa kuvata el\u00e4inten tarpeita tai yhdist\u00e4\u00e4 lemmikkiteemaa oppimiseen.',
      solution: 'H\u00e4n ottaa k\u00e4ytt\u00f6\u00f6n lemmikkiaiheiset ty\u00f6lehdet, joissa oppilaat v\u00e4ritt\u00e4v\u00e4t eri lemmikkilajeja, lajittelevat lemmikkej\u00e4 hoitotarpeiden mukaan, laskevat ruokintam\u00e4\u00e4ri\u00e4 ja kirjoittavat lyhyit\u00e4 kuvauksia omasta tai unelmalemmikist\u00e4\u00e4n.',
      outcome: 'Kolmen viikon j\u00e4lkeen oppilaat ymm\u00e4rt\u00e4v\u00e4t lemmikkien perustarpeet, k\u00e4ytt\u00e4v\u00e4t el\u00e4intenhoitoon liittyv\u00e4\u00e4 sanastoa ja osoittavat empatiaa ja vastuullisuutta lemmikkien hoitoa kohtaan.',
    },
    {
      situation: 'Kotikouluvanhempi etsii teemaa, joka yhdist\u00e4\u00e4 vastuullisuuskasvatuksen, luonnontieteen ja tunnetaidot lapselle, joka toivoo omaa lemmikki\u00e4.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 lemmikkity\u00f6lehti\u00e4 yhdistettyn\u00e4 el\u00e4inten hoitoprojektiin: lapsi tutkii eri lemmikkilajien tarpeita, vertailee hoitovaatimuksia, suunnittelee hoitoaikataulun ja pit\u00e4\u00e4 lemmikkip\u00e4iv\u00e4kirjaa.',
      outcome: 'Lapsi ymm\u00e4rt\u00e4\u00e4 vastuullisen lemmikinoMistuksen periaatteet, vertailee lajien tarpeita ja osaa perustella, miksi lemmikin hoito vaatii p\u00e4ivitt\u00e4ist\u00e4 sitoutumista.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Lemmikkilajien kirjo', value: '15+ lajia' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'K\u00e4yt\u00e4 yksityiskohtaisia lemmikkikuvituksia ja vertailutaulukoita. Lemmikkien hoitoinfografiikat \u2014 ruokinta, liikunta, terveydenhoito \u2014 auttavat hahmottamaan vastuullisuuden kokonaisuutta visuaalisesti.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdist\u00e4 ty\u00f6lehdet luokan lemmikkinurkkaan tai el\u00e4invierailuun: oppilaat hoitavat luokan akvaariokaloja tai lemmikki\u00e4 ja vertaavat oikeita hoitoteht\u00e4vi\u00e4 ty\u00f6lehden sis\u00e4lt\u00f6\u00f6n. El\u00e4inturvatalossa vierailu syvent\u00e4\u00e4 empatiaa.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Lemmikit ovat universaali aihe, mutta lemmikkikulttuuri vaihtelee maittain. Aloita yleisimmist\u00e4 lemmikeist\u00e4 (koira, kissa, kani) ja rakenna sanastoa arjen hoitotoimien kautta. Kuvitetut sanakortit lemmikkisanoista tukevat oppimista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta tutkimusteht\u00e4vill\u00e4: vertaile eri lemmikkilajien elinkaaria ja hoitovaatimuksia, tutki vastuullisen el\u00e4intenpidon eettisi\u00e4 n\u00e4k\u00f6kulmia ja kirjoita lemmikkihoito-opas valitsemalleen lajille.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Lemmikkien hoitosuunnitelma',
      criteria: 'Pyyd\u00e4 oppilasta valitsemaan yksi lemmikkilaji ja laatia viikon hoitoaikataulu (ruokinta, liikunta, puhtaus, l\u00e4\u00e4k\u00e4rik\u00e4ynnit). Arvioi hoitotarpeiden ymm\u00e4rt\u00e4mist\u00e4, aikataulun realistisuutta ja vastuullisuuusn osoittamista.',
      gradeLevel: '2.\u20133. lk',
    },
    {
      method: 'Lemmikkitietovisa',
      criteria: 'Esit\u00e4 oppilaalle kymmenen kysymyst\u00e4 lemmikkien tarpeista, turvallisuudesta ja hyvinvoinnista. Arvioi tietojen oikeellisuutta ja kyky\u00e4 selitt\u00e4\u00e4, miksi kukin hoitotoimi on t\u00e4rke\u00e4.',
      gradeLevel: 'Esiopetus\u20131. lk',
    },
    {
      method: 'Lemmikkien vertailuteht\u00e4v\u00e4',
      criteria: 'Anna oppilaalle kolme lemmikkilajia (esim. koira, kala, kani) ja pyyd\u00e4 vertailemaan niiden tarpeita taulukossa. Arvioi vertailun j\u00e4senneltyisyytt\u00e4, erojen tunnistamista ja perustelujen selkeytt\u00e4.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (biologia ja etiikka)',
      connection: 'Lemmikkihoito opettaa el\u00e4inten perustarpeet (ravinto, suoja, liikunta, sosiaalinen vuorovaikutus) ja her\u00e4tt\u00e4\u00e4 eettisi\u00e4 pohdintoja el\u00e4inten oikeuksista. POPS 2014:n tavoitteet vastuullisuudesta ja empatiasta toteutuvat luonnollisesti.',
      activity: 'Lemmikkien lajitteluteht\u00e4v\u00e4n j\u00e4lkeen oppilaat keskustelevat ryhm\u00e4ss\u00e4: mit\u00e4 jokainen lemmikki tarvitsee ollakseen onnellinen, ja miten el\u00e4inten hyvinvoinnista huolehditaan.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Lemmikkiteema innoittaa kuvailevaa ja kerronnallista kirjoittamista: omasta lemmikist\u00e4 kertominen, unelmalemmkin kuvaus ja lemkkip\u00e4iv\u00e4kirjan pit\u00e4minen kehitt\u00e4v\u00e4t kielellist\u00e4 ilmaisua.',
      activity: 'Lemmikkity\u00f6lehden j\u00e4lkeen oppilaat kirjoittavat lyhyen tarinan lemmikkinsil tai unelmallemmikkinsil p\u00e4iv\u00e4st\u00e4 k\u00e4ytt\u00e4en v\u00e4hint\u00e4\u00e4n viitt\u00e4 kuvailevaa adjektiivia.',
    },
    {
      subject: 'Matematiikka (laskeminen ja aikataulut)',
      connection: 'Lemmikkien hoito tarjoaa konkreettisen kontekstin laskemiselle ja aikatauluttamiselle: ruokintam\u00e4\u00e4r\u00e4t, ulkoiluminuutit ja el\u00e4inl\u00e4\u00e4k\u00e4rik\u00e4yntien v\u00e4lit.',
      activity: 'Ruokintalaskuteht\u00e4v\u00e4n j\u00e4lkeen oppilaat laskevat, paljonko koiran ruokinta maksaa viikossa ja kuukaudessa, ja vertailevat eri lemmikkien ruokintakustannuksia.',
    },
  ],

  uniqueAngle: 'Lemmikkiaiheiset ty\u00f6lehdet ovat pedagogisesti ainutlaatuisia, koska ne yhdist\u00e4v\u00e4t akateemiset taidot, tunnetaidon ja vastuullisuuskasvatuksen tavalla, joka koskettaa l\u00e4hes jokaista lasta henkil\u00f6kohtaisesti. Lemmikki \u2014 olipa se oikea tai toivottu \u2014 on lapselle emotionaalisesti merkitt\u00e4v\u00e4, mik\u00e4 tekee oppimisesta syv\u00e4sti motivoivaa. Hoitovastuun k\u00e4sittely ty\u00f6lehtien kautta opettaa p\u00e4ivitt\u00e4ist\u00e4 sitoutumista, empatiaa ja el\u00e4inten tarpeiden ymm\u00e4rt\u00e4mist\u00e4 tavalla, joka kehitt\u00e4\u00e4 vastuullista kansalaisuutta. Suomessa el\u00e4inten hyvinvointi on lains\u00e4\u00e4d\u00e4nn\u00f6llisesti ja kulttuurisesti korkealla prioriteetilla, ja POPS 2014 painottaa empatiaa ja vastuullisuutta. Lemmikkity\u00f6lehdet rakentavat siltaa emotionaalisen kiintymyksen ja tieteellisen ymm\u00e4rryksen v\u00e4lille: lapsi oppii, ett\u00e4 rakkaus lemmikki\u00e4 kohtaan ilmenee p\u00e4ivitt\u00e4isen\u00e4 hoitona, ei vain halinana. Eri lemmikkilajien vertailu kehitt\u00e4\u00e4 analyyttist\u00e4 ajattelua ja p\u00e4\u00e4t\u00f6ksentekotaitoja.',

  researchCitation: 'Endenburg, N. & van Lith, H. A. (2011). The Influence of Animals on the Development of Children. The Veterinary Journal. Tutkimus osoitti, ett\u00e4 el\u00e4inten kanssa kasvaminen ja niiden hoitoon osallistuminen kehitt\u00e4v\u00e4t merkitt\u00e4v\u00e4sti lasten empatiaa, sosiaalisia taitoja ja vastuullisuutta.',

  culturalNotes: 'Suomessa lemmikkiel\u00e4inten hyvinvointi on lains\u00e4\u00e4d\u00e4nn\u00f6llisesti korkeatasoista, ja vastuullinen lemmikionomistaminen on kulttuurinen arvo. POPS 2014 korostaa empatiaa, vastuullisuutta ja el\u00e4inten kunnioittamista. Suomessa suosituimmat lemmikit ovat koirat ja kissat, mutta kanit, marssut ja akvaariokalat ovat my\u00f6s yleisi\u00e4. Lemmikkity\u00f6lehdet tukevat n\u00e4iden arvojen opettamista konkreettisten hoitoteht\u00e4vien kautta.',

  snippetDefinition: 'Lemmikkiaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t koiria, kissoja, kaneja ja muita lemmikkilajeja vastuullisuuden, laskemisen, sanaston ja empatiakasvatuksen opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t hoitotarpeiden tutkimista, lajien vertailua ja tunnetaitoteht\u00e4vi\u00e4.',

  snippetHowTo: [
    'Valitse ty\u00f6lehdet lapsen kehitystason mukaan: nuoremmille v\u00e4ritt\u00e4mist\u00e4 ja tunnistamista, vanhemmille hoitosuunnitelmia ja vertailuteht\u00e4vi\u00e4.',
    'Aloita keskustelemalla lasten omista lemmikkikokemuksista: kenell\u00e4 on lemmikki, millainen se on ja miten sit\u00e4 hoidetaan.',
    'Yhdist\u00e4 ty\u00f6lehti el\u00e4invierailuun: pyyd\u00e4 el\u00e4intenhoitajaa vierailulle tai vierailkaa el\u00e4inturvatalossa.',
    'Harjoittele vastuullisuutta: suunnitelkaa yhdess\u00e4 lemmikin hoitoaikataulu ja keskustelkaa, mit\u00e4 jokainen hoitotoimi tarkoittaa.',
    'Lis\u00e4\u00e4 tunnetaitoulottuvuus: keskustelkaa, milt\u00e4 lemmikeist\u00e4 tuntuu ja miten voimme huolehtia niiden hyvinvoinnista.',
    'Vertailkaa eri lemmikkilajien tarpeita: koira tarvitsee ulkoilua, kala puhdasta vett\u00e4, kani tilaa hyppi\u00e4.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet lemmikkikansioon ja seuratkaa el\u00e4intuntemuksen ja vastuullisuuden kehittymist\u00e4.',
  ],

  limitations: 'Lemmikkiteema voi olla her\u00e4tt\u00e4v\u00e4 lapsille, jotka ovat menett\u00e4neet lemmikin \u2014 opettajan kannattaa olla herkkil l\u00e4 surukokemuksille. Allergiset lapset saattavat tuntea ulkopuolisuutta, jos kaikki muut puhuvat koirista ja kissoista \u2014 varmista, ett\u00e4 ty\u00f6lehdiss\u00e4 on my\u00f6s allergiayst\u00e4v\u00e4llisi\u00e4 lemmikkej\u00e4 kuten kaloja ja kilpikonnia.',

  themeComparisons: [
    {
      vsThemeId: 'animals',
      summary: 'El\u00e4inty\u00f6lehdet kattavat villiel\u00e4imi\u00e4 ja kotiel\u00e4imi\u00e4 laajasti. Lemmikkiteema syventyy ihmisen ja el\u00e4imen suhteeseen, hoitovastuuseen ja emotionaaliseen kiintymykseen.',
    },
    {
      vsThemeId: 'farm',
      summary: 'Maatilaty\u00f6lehdet esittelev\u00e4t tuotantoel\u00e4imi\u00e4 ja maatalousymp\u00e4rist\u00f6\u00e4. Lemmikkiteema keskittyy kotiel\u00e4imiin kumppaneina ja perheen j\u00e4senin\u00e4.',
    },
    {
      vsThemeId: 'zoo',
      summary: 'El\u00e4intarhaty\u00f6lehdet tutkivat eksoottisia el\u00e4imi\u00e4 valvotussa ymp\u00e4rist\u00f6ss\u00e4. Lemmikkiteema keskittyy kotona pidett\u00e4viin el\u00e4imiin ja p\u00e4ivitt\u00e4iseen hoitovastuuseen.',
    },
    {
      vsThemeId: 'birds',
      summary: 'Lintuteema tutkii luonnonvaraisia lintuja ja niiden ekologiaa. Lemmikkiteema sis\u00e4lt\u00e4\u00e4 my\u00f6s lemmikkilintuja mutta laajemmin kaikkia kotiel\u00e4imi\u00e4 ja niiden hoitoa.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'lemmikkiaiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Lemmikkien v\u00e4rityssivut kehitt\u00e4v\u00e4t hienomotoriikkaa samalla kun lapset tutustuvat eri lemmikkilajien ulkon\u00e4k\u00f6\u00f6n ja erityispiirteisiin.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'lemmikkien etsi ja laske -teht\u00e4v\u00e4t',
      context: 'Etsi ja laske -teht\u00e4v\u00e4t kehitt\u00e4v\u00e4t lukum\u00e4\u00e4r\u00e4k\u00e4sitett\u00e4 ja visuaalista tarkkaavaisuutta, kun lapset etsiv\u00e4t ja laskevat eri lemmikkilajeja kuvasta.',
    },
    {
      appId: 'word-search',
      anchorText: 'lemmikkisanaston sanahaku-ty\u00f6lehdet',
      context: 'Sanahakuteht\u00e4v\u00e4t vahvistavat lemmikkisanastoa, kun lapset etsiv\u00e4t termej\u00e4 kuten koira, kissa, kani, marssu ja akvaario sanaruudukosta.',
    },
    {
      appId: 'word-scramble',
      anchorText: 'lemmikkinimien kirjainpulmateht\u00e4v\u00e4t',
      context: 'Kirjainpulmateht\u00e4v\u00e4t haastavat lapsia kokoamaan lemmikkilajien ja hoitotermien nimi\u00e4 sekoitetuista kirjaimista.',
    },
  ],

  expertTips: [
    {
      tip: 'Aloita keskustelulla lasten omista lemmikkikokemuksista \u2014 t\u00e4m\u00e4 henkil\u00f6kohtainen yhteys motivoi kaikkia teht\u00e4vi\u00e4 ja antaa opettajalle tietoa ryhmil n eri taustoista.',
      source: 'Tunnetaitokasvatuksen opas',
      gradeRange: 'Esiopetus\u20131. lk',
    },
    {
      tip: 'J\u00e4rjest\u00e4 el\u00e4inturvatalon vierailu tai el\u00e4intenhoitajan vierailu luokkaan: ammttilaisen kertomukset vastuullisesta el\u00e4intenpidosta j\u00e4tt\u00e4v\u00e4t pysyv\u00e4n vaikutuksen ja tuovat ty\u00f6lehtisisil l\u00f6n el\u00e4v\u00e4ksi.',
      source: 'Ymp\u00e4rist\u00f6kasvatuksen opas',
      gradeRange: '1.\u20133. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 lemmikkity\u00f6lehti\u00e4 vastuullisuuskasvatuksen v\u00e4lineen\u00e4: hoitoaikataulun suunnittelu opettaa p\u00e4ivitt\u00e4ist\u00e4 sitoutumista ja johdonmukaisuutta, jotka ovat yleisiakin el\u00e4m\u00e4ntaitoja.',
      source: 'POPS 2014, laaja-alaisen osaamisen suositukset',
      gradeRange: 'Esiopetus\u20133. lk',
    },
  ],`;

// ── Injection function ──────────────────────────────────────────────────

function injectFields(filePath, newFields) {
  const src = fs.readFileSync(filePath, 'utf8');
  const marker = /\n\};\s*\n\nregisterThemeContent/;
  const match = src.match(marker);
  if (!match) {
    throw new Error(`Could not find closing marker in ${filePath}`);
  }
  const insertPos = match.index;
  const updated = src.slice(0, insertPos) + '\n' + newFields + '\n};\n\nregisterThemeContent' + src.slice(match.index + match[0].length);
  fs.writeFileSync(filePath, updated, 'utf8');
  console.log(`  Updated ${path.basename(path.dirname(filePath))}/${path.basename(filePath)}`);
}

// ── Main ─────────────────────────────────────────────────────────────────

const base = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const themes = [
  { id: 'dinosaurs', fields: dinosaursFields },
  { id: 'insects', fields: insectsFields },
  { id: 'fruits', fields: fruitsFields },
  { id: 'vegetables', fields: vegetablesFields },
  { id: 'flowers', fields: flowersFields },
  { id: 'birds', fields: birdsFields },
  { id: 'pets', fields: petsFields },
];

console.log('Part 183: Enriching 7 FI theme hub pages with 14 fields each...\n');
themes.forEach((t, i) => {
  console.log(`${i + 1}. Injecting fields into ${t.id}/fi.ts...`);
  injectFields(path.join(base, t.id, 'fi.ts'), t.fields);
});
console.log('\nDone! All 7 FI theme hub pages enriched with 14 SEO fields each.');
