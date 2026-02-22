/**
 * SEO Part 181: Enrich FI theme hub pages 15-21 with 14 enrichment fields each
 * Themes: seasons, holidays, weather, colors, shapes, numbers, alphabet
 */
const fs = require('fs');
const path = require('path');

// ── 1. Seasons (vuodenajat) ─────────────────────────────────────────────

const seasonsFields = `
  // -- SEO Enrichment (Part 181) --

  classroomScenarios: [
    {
      situation: 'Ensimm\u00e4isen luokan opettaja huomaa, ett\u00e4 oppilaat sekoittavat vuodenaikojen j\u00e4rjestyksen ja eiv\u00e4t ymm\u00e4rr\u00e4, miksi s\u00e4\u00e4 muuttuu vuoden aikana.',
      solution: 'H\u00e4n ottaa k\u00e4ytt\u00f6\u00f6n vuodenaika-aiheiset ty\u00f6lehdet, joissa oppilaat j\u00e4rjest\u00e4v\u00e4t vuodenajat oikeaan kiertoon, yhdist\u00e4v\u00e4t s\u00e4\u00e4ilmi\u00f6t oikeisiin vuodenaikoihin ja v\u00e4ritt\u00e4v\u00e4t saman maiseman nelj\u00e4n\u00e4 eri vuodenaikana.',
      outcome: 'Kuukauden j\u00e4lkeen oppilaat osaavat nimetj\u00e4 vuodenajat oikeassa j\u00e4rjestyksess\u00e4, kuvailla jokaisen vuodenajan tyypillisi\u00e4 piirteit\u00e4 ja selitt\u00e4\u00e4, miksi p\u00e4iv\u00e4nvalo muuttuu vuoden aikana.',
    },
    {
      situation: 'Kotikouluvanhempi etsii teemaa, joka yhdist\u00e4\u00e4 luonnontieteen, matematiikan ja \u00e4idinkielen esikoululaiselle, joka on kiinnostunut ulkoilusta.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 vuodenaikaisia ty\u00f6lehti\u00e4 ympj\u00e4ri vuoden: kev\u00e4\u00e4ll\u00e4 lasketaan kukkia, kes\u00e4ll\u00e4 mitataan p\u00e4iv\u00e4nvalon pituutta, syksyll\u00e4 lajitellaan lehti\u00e4 ja talvella vertaillaan l\u00e4mp\u00f6tiloja.',
      outcome: 'Lapsi ymm\u00e4rt\u00e4\u00e4 vuodenaikasyklin kokonaisuutena ja osaa ennustaa tulevia muutoksia. H\u00e4n k\u00e4ytt\u00e4\u00e4 vuodenaikasanastoa arjessa ja kirjoittaa oma-aloitteisesti s\u00e4\u00e4p\u00e4iv\u00e4kirjaa.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '11 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Vuodenaikojen kirjo', value: '4 vuodenaikaa + siirtym\u00e4t' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota nelj\u00e4n vuodenajan vertailukuvia, joissa sama maisema n\u00e4kyy eri vuodenaikoina. Aikajanaharjoitukset ja vuodenaikakellot auttavat hahmottamaan syklisen rakenteen visuaalisesti.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Vie oppilaat ulos havainnoimaan vuodenajan merkkej\u00e4 ennen ty\u00f6lehtiteht\u00e4v\u00e4\u00e4. Ker\u00e4\u00e4 luonnonmateriaaleja (lehti\u00e4, k\u00e4pyj\u00e4, kukkia) ja yhdist\u00e4 ne ty\u00f6lehden lajitteluteht\u00e4viin konkreettisesti.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Vuodenajat ovat universaaleja \u2014 jokainen lapsi on kokenut s\u00e4\u00e4n vaihtelua. Aloita kuvapohjaisista vuodenaika-kohtausten tunnistamisesta ja lis\u00e4\u00e4 suomenkielist\u00e4 sanastoa asteittain. Kuvitetut sanakortit vuodenaika-sanoista tukevat oppimista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta tieteellisill\u00e4 selityksill\u00e4: maapallon kaltevuuskulma, p\u00e4iv\u00e4ntasaukset ja p\u00e4iv\u00e4nseisaukset. L\u00e4mp\u00f6tiladatan ker\u00e4\u00e4minen ja graafien piirt\u00e4minen sek\u00e4 pohjoisen ja etel\u00e4isen pallonpuoliskon vertailu tarjoavat syvemm\u00e4n haasteen.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolioarviointi',
      criteria: 'Ker\u00e4\u00e4 vuodenaika-aiheisia ty\u00f6lehti\u00e4 koko lukuvuoden ajalta. Vertaa vuodenaikasanaston laajuutta, luonnontieteen ymm\u00e4rryksen kehittymist\u00e4 ja kuvailevien vastausten rikastumista ajan my\u00f6t\u00e4.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Vuodenaikap\u00e4iv\u00e4kirja',
      criteria: 'Oppilas pit\u00e4\u00e4 kuukauden ajan s\u00e4\u00e4p\u00e4iv\u00e4kirjaa, johon h\u00e4n piirt\u00e4\u00e4 s\u00e4\u00e4symbolin ja kirjoittaa havainnon. Arvioi havaintojen tarkkuutta, sanaston k\u00e4ytt\u00f6\u00e4 ja kyky\u00e4 yhdist\u00e4\u00e4 havainnot vuodenaikaan.',
      gradeLevel: '1.\u20133. lk',
    },
    {
      method: 'Vuodenaikojen vertailuteht\u00e4v\u00e4',
      criteria: 'Pyyd\u00e4 oppilasta vertaamaan kahta vuodenaikaa viiless\u00e4 kohdassa: s\u00e4\u00e4, p\u00e4iv\u00e4nvalo, vaatteet, kasvit ja el\u00e4imet. Arvioi vertailun j\u00e4sentelj\u00e4, tietosis\u00e4ll\u00f6n tarkkuutta ja kyky\u00e4 esitt\u00e4\u00e4 syytt\u00e4 ja seurausta.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (luonnon vuodenaikaisrytmi)',
      connection: 'Vuodenaikateema kytkeytyy POPS 2014:n ymp\u00e4rist\u00f6opin tavoitteisiin s\u00e4\u00e4kuvioista, el\u00e4inten sopeutumisesta vuodenaikoihin ja kasvien kasvusykleist\u00e4. Ty\u00f6lehdet tekev\u00e4t abstrakteista luonnontieteen k\u00e4sitteist\u00e4 konkreettisia.',
      activity: 'Vuodenaikojen j\u00e4rjestysteht\u00e4v\u00e4n j\u00e4lkeen oppilaat menevj\u00e4t ulos havainnoimaan nykyisen vuodenajan merkkej\u00e4 ja kirjaavat l\u00f6yd\u00f6ksens\u00e4 havainnointilomakkeelle.',
    },
    {
      subject: 'Matematiikka',
      connection: 'Vuodenajat tarjoavat luonnollisen kontekstin laskemiselle, mittaamiselle ja vertailulle: l\u00e4mp\u00f6tilojen vertailu, p\u00e4iv\u00e4nvalon tuntien laskeminen ja kalenterimatematiikka yhdist\u00e4v\u00e4t matemaattiset taidot arkitodellisuuteen.',
      activity: 'L\u00e4mp\u00f6tilavertailuteht\u00e4v\u00e4n j\u00e4lkeen oppilaat piirt\u00e4v\u00e4t yksinkertaisen pylv\u00e4sdiagrammin kuukauden l\u00e4mp\u00f6tiloista ja vertailevat vuodenaikojen eroja.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Vuodenaikateema rikastaa kuvailevaa kieltj\u00e4: aistihavainnot, s\u00e4\u00e4sanat ja luontokuvaukset kehitt\u00e4v\u00e4t sanaston laajuutta ja ilmaisun tarkkuutta.',
      activity: 'Sanahaun j\u00e4lkeen oppilaat kirjoittavat lyhyen aistikuvauksen nykyisest\u00e4 vuodenajasta: mit\u00e4 n\u00e4en, kuulen, haistan ja tunnen ulkona t\u00e4n\u00e4\u00e4n.',
    },
  ],

  uniqueAngle: 'Vuodenaika-aiheiset ty\u00f6lehdet ovat pedagogisesti poikkeuksellisia, koska ne ovat ainoa teema, joka on aina ajankohtainen \u2014 jokaisena p\u00e4iv\u00e4n\u00e4 vuodessa lapsi el\u00e4\u00e4 jossain vuodenajassa. T\u00e4m\u00e4 jatkuva ajankohtaisuus tekee vuodenajat yhdeksi monipuolisimmista oppimisteemoista, koska teht\u00e4v\u00e4t voidaan yhdist\u00e4\u00e4 suoraan lapsen senhetkisiin kokemuksiin. Suomessa nelivuodenaika-rakenne on erityisen dramaattinen: pitk\u00e4t, pime\u00e4t talvet lumipeitteell\u00e4 ja valoisat kes\u00e4y\u00f6t luovat maailman selv\u00e4piirteisimm\u00e4t vuodenaikakontrastit. T\u00e4m\u00e4 tekee suomalaisista lapsista luontaisia vuodenaika-asiantuntijoita, joilla on runsaasti omakohtaisia kokemuksia oppimisteht\u00e4vien pohjaksi. POPS 2014:n ymp\u00e4rist\u00f6oppi korostaa luonnon vuodenaikaisrytmin ymm\u00e4rt\u00e4mist\u00e4, ja vuodenaikaty\u00f6lehdet tukevat t\u00e4t\u00e4 tavoitetta konkreettisesti. Vuodenaikateeman syklinen rakenne opettaa samalla matemaattista ajattelua: toistuvat kuviot, ennustaminen ja kalenterilaskenta syntyvj\u00e4t luonnostaan vuodenaikojen kiertoon. Luonnontieteen, matematiikan, \u00e4idinkielen ja kuvaamataidon yhdist\u00e4minen yhdess\u00e4 teemassa tekee vuodenajoista ihanteellisen integroivan oppimiskokonaisuuden.',

  researchCitation: 'Lehrer, R. & Schauble, L. (2006). Cultivating Model-Based Reasoning in Science Education. Cambridge University Press. Tutkimus osoitti, ett\u00e4 lasten luonnonilmi\u00f6iden havainnointi ja mallintaminen \u2014 kuten vuodenaikojen seuranta \u2014 kehitt\u00e4\u00e4 tieteellist\u00e4 ajattelua tehokkaammin kuin pelkk\u00e4 faktojen opettelu.',

  culturalNotes: 'Suomessa vuodenajat ovat kulttuurin ytimess\u00e4: juhannus merkitsee kes\u00e4n alkua, ruska syksyn v\u00e4rikkytt\u00e4 ja joulu talven pimeyden vastakohtaa. POPS 2014:n ymp\u00e4rist\u00f6oppi korostaa luonnon vuodenaikaisrytmin ymm\u00e4rt\u00e4mist\u00e4 ja omien havaintojen tekemist\u00e4. Suomen dramaattiset vuodenaikaerot tekev\u00e4t teemasta erityisen rikkaan oppimiskontekstin.',

  snippetDefinition: 'Vuodenaika-aiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t kev\u00e4\u00e4n, kes\u00e4n, syksyn ja talven ilmi\u00f6it\u00e4 matematiikan, lukutaidon ja luonnontieteen opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t lajitteluteht\u00e4vi\u00e4, sanahakuja, l\u00e4mp\u00f6tilavertailuja ja v\u00e4ritysteht\u00e4vi\u00e4.',

  snippetHowTo: [
    'Valitse ty\u00f6lehdet nykyisen vuodenajan mukaan, jotta teht\u00e4v\u00e4t yhdistyv\u00e4t lapsen senhetkisiin havaintoihin ulkomaailmasta.',
    'Valitse kaksi tai kolme ty\u00f6lehtityyppi\u00e4 eri taitoalueille \u2014 esimerkiksi lajitteluteht\u00e4v\u00e4 luokitteluun, laskuteht\u00e4v\u00e4 matematiikkaan ja sanahaku sanastoon.',
    'Aloita ulkohavainnolla: mene lasten kanssa ulos ja listatkaa yhdess\u00e4, mit\u00e4 vuodenajan merkkej\u00e4 n\u00e4ette, kuulette ja tunnette.',
    'Jaa ty\u00f6lehdet vaikeustason mukaan: aloita vuodenaikojen tunnistamisesta ennen vertailua ja tieteellisi\u00e4 selityksi\u00e4.',
    'Kierr\u00e4 lasten joukossa ja esit\u00e4 avoimia kysymyksi\u00e4 kuten Miksi puut pudottavat lehtens\u00e4 syksyll\u00e4 tai Mik\u00e4 vuodenaika tulee seuraavaksi ja mist\u00e4 tied\u00e4t sen.',
    'Yhdist\u00e4 ty\u00f6lehti vuodenaikakalenterin pit\u00e4miseen: oppilaat merkitsev\u00e4t joka p\u00e4iv\u00e4 s\u00e4\u00e4havainnon ja seuraavat muutoksia.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet portfoliokansioon ja vertailkaa vuodenaikojen vaihtuessa, miten havainnot ja sanasto ovat kehittyneet.',
  ],

  limitations: 'Vuodenaikaty\u00f6lehdet kuvaavat tyypillisesti pohjoisen pallonpuoliskon vuodenaikoja, mik\u00e4 voi h\u00e4mment\u00e4\u00e4 lapsia, joiden perheill\u00e4 on kokemusta etel\u00e4isen pallonpuoliskon tai trooppisten alueiden s\u00e4\u00e4st\u00e4. Opettajien tulee huomioida, ett\u00e4 kaikki oppilaat eiv\u00e4t ole kokeneet tyypillist\u00e4 suomalaista talvea. Luonnontieteen yksinkertaistukset kuten nelj\u00e4n selv\u00e4rajaisen vuodenajan malli eiv\u00e4t vastaa t\u00e4ysin todellisuutta, jossa siirtymj\u00e4t ovat asteittaisia.',

  themeComparisons: [
    {
      vsThemeId: 'nature',
      summary: 'Luontoty\u00f6lehdet tutkivat el\u00e4imi\u00e4, kasveja ja ekosysteemej\u00e4 yleisell\u00e4 tasolla. Vuodenaikaty\u00f6lehdet keskittyv\u00e4t siihen, miten luonto muuttuu vuoden kiertoon yhdist\u00e4en aikaperspektiivin luontohavaintoihin.',
    },
    {
      vsThemeId: 'weather',
      summary: 'S\u00e4\u00e4ty\u00f6lehdet tutkivat yksitt\u00e4isi\u00e4 s\u00e4\u00e4ilmi\u00f6it\u00e4 kuten sadetta ja tuulta. Vuodenaikaty\u00f6lehdet asettavat s\u00e4\u00e4ilmi\u00f6t laajempaan sykliseen kehykseen, selitt\u00e4en miksi tiettyj\u00e4 s\u00e4\u00e4tyyppej\u00e4 esiintyy tiettyihin aikoihin.',
    },
    {
      vsThemeId: 'spring',
      summary: 'Kev\u00e4tty\u00f6lehdet syventyv\u00e4t yhteen vuodenaikaan ja sen yksityiskohtiin. Vuodenaikaty\u00f6lehdet kattavat kaikki nelj\u00e4 vuodenaikaa ja niiden v\u00e4liset vertailut, tarjoten kokonaiskuvan vuoden kierrosta.',
    },
    {
      vsThemeId: 'winter',
      summary: 'Talvity\u00f6lehdet keskittyv\u00e4t lumeen, j\u00e4\u00e4h\u00e4n ja talvisiin aktiviteetteihin. Vuodenaikaty\u00f6lehdet sijoittavat talven osaksi nelj\u00e4n vuodenajan kiertoa, mahdollistaen vertailun muihin vuodenaikoihin.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'vuodenaika-aiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Vuodenaika-aiheiset v\u00e4ritysteht\u00e4v\u00e4t esittelev\u00e4t saman maiseman eri vuodenaikoina, kehitt\u00e4en hienomotoriikkaa ja opettaen vuodenaikojen visuaalisia piirteit\u00e4.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'vuodenaika-esineiden laskuteht\u00e4v\u00e4t',
      context: 'Laskuteht\u00e4v\u00e4t yhdist\u00e4v\u00e4t aritmetiikan vuodenaikakuviin, kun lapset etsiv\u00e4t ja laskevat lehti\u00e4, lumihiutaleita, kukkia tai aurinkoja kohtauskuvista.',
    },
    {
      appId: 'word-search',
      anchorText: 'vuodenaikasanaston sanahaku-ty\u00f6lehdet',
      context: 'Vuodenaikasanaston oppiminen sanahakuteht\u00e4viss\u00e4, joissa lapset etsiv\u00e4t termej\u00e4 kuten p\u00e4iv\u00e4ntasaus, halla, helle ja muuttolintu sanaruudukosta.',
    },
    {
      appId: 'pattern-train',
      anchorText: 'vuodenaikojen kuviojuna-teht\u00e4v\u00e4t',
      context: 'Kuviojunateht\u00e4v\u00e4t k\u00e4ytt\u00e4v\u00e4t vuodenaikasymboleita toistuvien sarjojen harjoitteluun, opettaen matemaattista kuvioajattelua luonnollisessa kontekstissa.',
    },
  ],

  expertTips: [
    {
      tip: 'Perusta luokkaan vuodenaikap\u00f6yt\u00e4, jota p\u00e4ivitet\u00e4\u00e4n kuukausittain luonnonmateriaaleilla. Ty\u00f6lehtiteht\u00e4v\u00e4t saavat konkreettisen vastineen, kun oppilaat voivat koskettaa ja tutkia oikeita lehti\u00e4, k\u00e4pyj\u00e4 ja kukkia.',
      source: 'Luokanopettaja, luontokasvatus',
      gradeRange: 'Esiopetus\u20132. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 vuodenaikavalokuvausprojektia rinnalla: oppilaat kuvaavat saman paikan joka kuukausi ja vertaavat muutoksia. Ty\u00f6lehtien havaintoharjoitukset syventyv\u00e4t, kun niill\u00e4 on visuaalinen vertailupohja.',
      source: 'Ymp\u00e4rist\u00f6kasvattaja, pitk\u00e4kestoiset projektit',
      gradeRange: '1.\u20133. lk',
    },
    {
      tip: 'Yhdist\u00e4 vuodenaikatyj\u00f6lehdet koulun puutarhatoimintaan: kylv\u00e4minen kev\u00e4\u00e4ll\u00e4, hoitaminen kes\u00e4ll\u00e4, sadonkorjuu syksyll\u00e4 ja suunnittelu talvella. T\u00e4m\u00e4 antaa vuodenajoille konkreettisen merkityksen.',
      source: 'Puutarhakasvattaja, kokemuksellinen oppiminen',
      gradeRange: 'Esiopetus\u20133. lk',
    },
  ],`;

// ── 2. Holidays (juhlapäivät) ────────────────────────────────────────────

const holidaysFields = `
  // -- SEO Enrichment (Part 181) --

  classroomScenarios: [
    {
      situation: 'Tokaluokan opettaja haluaa k\u00e4sitell\u00e4 eri kulttuurien juhlapyhj\u00e4 inklusiivisesti, mutta tarvitsee konkreettisia teht\u00e4vi\u00e4 keskustelun tueksi.',
      solution: 'H\u00e4n k\u00e4ytt\u00e4\u00e4 juhla-aiheisia ty\u00f6lehti\u00e4, joissa oppilaat vertailevat eri kulttuurien juhlatraditioita yhdist\u00e4misteht\u00e4viss\u00e4, laskevat juhlatarvikkeita ja kirjoittavat oman perheen juhlamuistoja.',
      outcome: 'Oppilaat oppivat kunnioittamaan eri kulttuurien perinteit\u00e4 ja huomaavat yht\u00e4l\u00e4isyyksi\u00e4 omiin juhliinsa. Luokkahuoneen ilmapiiri muuttuu avoimemmaksi monikulttuurisille keskusteluille.',
    },
    {
      situation: 'Kotikouluvanhempi haluaa hy\u00f6dynt\u00e4\u00e4 joulunodotusaikaa oppimiseen, mutta lapsi haluaa vain askarrella.',
      solution: 'Vanhempi yhdist\u00e4\u00e4 juhla-aiheiset ty\u00f6lehdet askarteluun: joulukalenterissa joka luukun takana on laskuteht\u00e4v\u00e4, juhlaruoka-aiheinen sanahaku rikastaa sanastoa ja korttien tekeminen harjoittaa kirjoittamista.',
      outcome: 'Lapsi ei edes huomaa oppivansa, koska teht\u00e4v\u00e4t ovat osa juhlavalmisteluja. Matemaattiset taidot ja sanasto kehittyv\u00e4t luonnollisesti juhlan kontekstissa.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '11 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Juhlapyhien kirjo', value: '10+ juhlaa' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota juhla-aiheisia v\u00e4rityskuvia ja yhdist\u00e4misteht\u00e4vi\u00e4, joissa juhlatarvikkeet paritetaan oikeaan juhlaan. Juhlien aikajanateht\u00e4v\u00e4t kalenterilla tukevat visuaalista hahmotusta.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdist\u00e4 ty\u00f6lehdet konkreettiseen juhlintaan: leivo joulupipareita laskuteht\u00e4v\u00e4n j\u00e4lkeen, askartele p\u00e4\u00e4si\u00e4iskoriste v\u00e4ritysteht\u00e4v\u00e4n pohjalta tai rakenna juhlakoriste ty\u00f6lehden ohjeiden mukaan.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Juhlap\u00e4iv\u00e4t ovat kulttuurien yhteinen piirre \u2014 jokaisella lapsella on kokemuksia juhlista. Aloita kuvapohjaisista juhlien tunnistamisteht\u00e4vist\u00e4 ja lis\u00e4\u00e4 suomenkielist\u00e4 juhla- ja perinnesanastoa asteittain.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta tutkimusteht\u00e4vill\u00e4 juhlien historiasta ja alkuper\u00e4st\u00e4. Vertaileva essee kahdesta eri kulttuurin juhlasta kehitt\u00e4\u00e4 analyyttist\u00e4 kirjoittamista. Juhlakalenterin luominen aikajanamuodossa yhdist\u00e4\u00e4 historian ja matematiikan.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolioarviointi',
      criteria: 'Ker\u00e4\u00e4 juhla-aiheisia ty\u00f6lehti\u00e4 vuoden ajalta \u2014 jouluteht\u00e4vi\u00e4, p\u00e4\u00e4si\u00e4isteht\u00e4vi\u00e4, itsen\u00e4isyysp\u00e4iv\u00e4teht\u00e4vi\u00e4. Vertaa juhlasanaston laajuutta ja kulttuurisen ymm\u00e4rryksen kehittymist\u00e4.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Juhlien vertailuteht\u00e4v\u00e4',
      criteria: 'Pyyd\u00e4 oppilasta vertaamaan kahta juhlaa kolmessa kohdassa: perinteet, ruoka ja symbolit. Arvioi vertailun j\u00e4sentelj\u00e4, tietosis\u00e4ll\u00f6n tarkkuutta ja kulttuurista herkkytt\u00e4.',
      gradeLevel: '1.\u20133. lk',
    },
    {
      method: 'Oma juhlaesitys',
      criteria: 'Oppilas piirt\u00e4\u00e4 ja kuvaa oman perheen lempijuhlan: mit\u00e4 perinteit\u00e4, ruokia ja aktiviteetteja siihen kuuluu. Arvioi kuvailun rikkautta, sanastoa ja esitystaitoja.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (kulttuuri ja yhteiskunta)',
      connection: 'Juhlateemat kytkeytyv\u00e4t POPS 2014:n ymp\u00e4rist\u00f6opin kulttuurisen moninaisuuden ja yhteiskunnallisten perinteiden tavoitteisiin. Juhlapyhien tutkiminen opettaa kulttuurista lukutaitoa.',
      activity: 'Juhlavertailuteht\u00e4v\u00e4n j\u00e4lkeen oppilaat haastattelevat eri taustaista perheenj\u00e4sent\u00e4 h\u00e4nen t\u00e4rkeimm\u00e4st\u00e4 juhlastaan ja jakavat tulokset luokalle.',
    },
    {
      subject: 'Matematiikka',
      connection: 'Juhlateema tarjoaa kontekstin laskemiselle ja mittaamiselle: juhlatarvikkeiden laskeminen, reseptien mittasuhteet ja juhlakalenterin p\u00e4iv\u00e4laskenta yhdist\u00e4v\u00e4t matematiikan iloiseen kontekstiin.',
      activity: 'Laskuteht\u00e4v\u00e4n j\u00e4lkeen oppilaat suunnittelevat luokkajuhlan budjetin: kuinka monta koristetta, karkkia ja lautasta tarvitaan jokaiselle oppilaalle.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Juhlateema kehitt\u00e4\u00e4 kuvailevaa kirjoittamista ja perinnesanastoa. Juhlamuistojen kirjoittaminen harjoittaa narratiivista tekstilajia ja tunnesanaston k\u00e4ytt\u00f6\u00e4.',
      activity: 'Sanahaun j\u00e4lkeen oppilaat kirjoittavat lyhyen muistelutekstin parhaasta juhlamuistostaan k\u00e4ytt\u00e4en v\u00e4hint\u00e4\u00e4n viitt\u00e4 opittua juhlasanaa.',
    },
  ],

  uniqueAngle: 'Juhla-aiheiset ty\u00f6lehdet hy\u00f6dynt\u00e4v\u00e4t lasten luonnollista innostusta ja odotusta, jotka liittyv\u00e4t juhlapyhiin. Kun oppiminen kytket\u00e4\u00e4n juhlan iloiseen kontekstiin, motivaatio on valmiiksi korkealla \u2014 lapsi ei erota oppimista juhlasta. T\u00e4m\u00e4 tekee juhla-aiheisista ty\u00f6lehdist\u00e4 pedagogisesti erityisen tehokkaita. Suomalaisessa kulttuurissa juhlapyhill\u00e4 on syvj\u00e4 merkitys: joulu, p\u00e4\u00e4si\u00e4inen, juhannus, itsen\u00e4isyysp\u00e4iv\u00e4 ja vappu muodostavat vuoden rytmin, joka jjj\u00e4sent\u00e4\u00e4 sek\u00e4 perheiden ett\u00e4 koulun arkea. POPS 2014 korostaa kulttuuriperinteen tuntemusta ja monikulttuurisen ymm\u00e4rryksen kehitt\u00e4mist\u00e4, ja juhlateemat tukevat molempia tavoitteita. Juhlat ovat my\u00f6s erinomainen monikulttuurisuuskasvatuksen v\u00e4line: kun luokassa tutkitaan eri kulttuurien juhlia, lapset oppivat kunnioittamaan erilaisuutta ja l\u00f6yt\u00e4m\u00e4\u00e4n yht\u00e4l\u00e4isyyksi\u00e4 omiin perinteisiins\u00e4. Juhlateemat yhdist\u00e4v\u00e4t luontevasti matematiikan, \u00e4idinkielen, kuvataiteen ja ymp\u00e4rist\u00f6opin, koska jokaiseen juhlaan liittyy laskemista, kirjoittamista, askartelua ja kulttuurista sis\u00e4lt\u00f6\u00e4.',

  researchCitation: 'Pleck, E.H. (2000). Celebrating the Family: Ethnicity, Consumer Culture, and Family Rituals. Harvard University Press. Tutkimus osoitti, ett\u00e4 juhlarituaalit vahvistavat perheen yhteenkuuluvuutta ja kulttuurista identiteetti\u00e4, ja n\u00e4iden perinteiden tuominen oppimiseen syvent\u00e4\u00e4 lasten kulttuurista ymm\u00e4rryst\u00e4.',

  culturalNotes: 'Suomessa juhlapyhien vietto on syvj\u00e4\u00e4n juurtunut kulttuuri-identiteettiin: itsen\u00e4isyysp\u00e4iv\u00e4n kynttil\u00e4t ikkunalla, joulurauhan julistus Turusta ja juhannuksen kokot ovat perinteit\u00e4, jotka yhdist\u00e4v\u00e4t sukupolvia. POPS 2014 korostaa kulttuuriperinteen tuntemusta ja monikulttuurista ymm\u00e4rryst\u00e4. Suomen monikulttuuristuva yhteiskunta tekee juhlateemoista t\u00e4rke\u00e4n v\u00e4lineen inklusiiviseen kasvatukseen.',

  snippetDefinition: 'Juhla-aiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t joulun, p\u00e4\u00e4si\u00e4isen, juhannuksen ja muiden juhlap\u00e4ivien teemoja matematiikan, lukutaidon ja kulttuurisen ymm\u00e4rryksen opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t laskuteht\u00e4vi\u00e4, sanahakuja, v\u00e4ritysteht\u00e4vi\u00e4 ja vertailuharjoituksia.',

  snippetHowTo: [
    'Valitse ty\u00f6lehdet l\u00e4hestyv\u00e4n juhlapyh\u00e4n mukaan, jotta oppiminen kytkeytyy lasten senhetkiseen innostukseen ja odotukseen.',
    'Valitse kaksi tai kolme ty\u00f6lehtityyppi\u00e4 eri taitoalueille \u2014 esimerkiksi laskuteht\u00e4v\u00e4 matematiikkaan, sanahaku sanastoon ja v\u00e4ritysteht\u00e4v\u00e4 hienomotoriikkaan.',
    'Aloita keskustelulla: kysy lapsilta, miten heid\u00e4n perheens\u00e4 viett\u00e4\u00e4 l\u00e4hestyv\u00e4\u00e4 juhlaa ja mitkj\u00e4 perinteet ovat t\u00e4rkeit\u00e4.',
    'Jaa ty\u00f6lehdet vaikeustason mukaan: aloita juhlasymbolien tunnistamisesta ennen vertailu- ja kirjoitusteht\u00e4vi\u00e4.',
    'Kierr\u00e4 lasten joukossa ja esit\u00e4 avoimia kysymyksi\u00e4 kuten Miksi t\u00e4t\u00e4 juhlaa vietet\u00e4\u00e4n tai Mitk\u00e4 perinteet ovat samankaltaisia eri maissa.',
    'Yhdist\u00e4 ty\u00f6lehti konkreettiseen juhlintaan: askartele, leivo tai koristele luokka ty\u00f6lehdell\u00e4 opitun pohjalta.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet portfoliokansioon ja rakentakaa vuoden mittaan juhlakalenteri, johon ker\u00e4t\u00e4\u00e4n joka juhlan ty\u00f6lehdet.',
  ],

  limitations: 'Juhla-aiheiset ty\u00f6lehdet voivat painottua kristillisiin juhliin, jolloin muiden uskontojen ja kulttuurien juhlat jjj\u00e4\u00e4v\u00e4t vähemmälle huomiolle. Opettajien tulee varmistaa, ett\u00e4 juhlavalikoima on inklusiivinen. Perherakenteiden moninaisuus on huomioitava: kaikki lapset eiv\u00e4t viet\u00e4 samoja juhlia. Kaupallisten juhlien korostaminen voi olla ristiriidassa perheiden arvojen kanssa.',

  themeComparisons: [
    {
      vsThemeId: 'xmas',
      summary: 'Jouluty\u00f6lehdet syventyv\u00e4t yhteen juhlaan ja sen traditioihin. Juhla-aiheiset ty\u00f6lehdet kattavat laajasti vuoden eri juhlapy\u00e4t ja niiden vertailun, tarjoten monikulttuurisen n\u00e4k\u00f6kulman.',
    },
    {
      vsThemeId: 'easter',
      summary: 'P\u00e4\u00e4si\u00e4isty\u00f6lehdet keskittyv\u00e4t kev\u00e4\u00e4n juhlaan, muniin ja pupuihin. Juhla-aiheiset ty\u00f6lehdet sijoittavat p\u00e4\u00e4si\u00e4isen osaksi vuoden juhlakiertoa ja vertaavat sit\u00e4 muihin juhliin.',
    },
    {
      vsThemeId: 'birthday',
      summary: 'Syntymp\u00e4iv\u00e4ty\u00f6lehdet keskittyv\u00e4t henkil\u00f6kohtaiseen juhlaan. Juhla-aiheiset ty\u00f6lehdet kattavat sek\u00e4 yhteisj\u00f6lliset juhlapyh\u00e4t ett\u00e4 henkil\u00f6kohtaiset juhlat, tarjoten laajemman kulttuurisen kontekstin.',
    },
    {
      vsThemeId: 'seasons',
      summary: 'Vuodenaikaty\u00f6lehdet tutkivat luonnon sykli\u00e4. Juhla-aiheiset ty\u00f6lehdet tutkivat kulttuurin sykli\u00e4: miten ihmiset j\u00e4sent\u00e4v\u00e4t vuotta juhlien kautta luonnonilmi\u00f6iden sijaan.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'juhla-aiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Juhla-aiheiset v\u00e4ritysteht\u00e4v\u00e4t tuovat juhlapyhien tunnelman oppimiseen, kun lapset v\u00e4ritt\u00e4v\u00e4t joulutonttuja, p\u00e4\u00e4si\u00e4ismuneja ja juhannuskokkoja.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'juhlatarvikkeiden laskuteht\u00e4v\u00e4t',
      context: 'Laskuteht\u00e4v\u00e4t yhdist\u00e4v\u00e4t aritmetiikan juhlakohtauksiin, kun lapset etsiv\u00e4t ja laskevat kynttil\u00f6it\u00e4, lahjoja, muneja ja koristeita teemakuvista.',
    },
    {
      appId: 'word-search',
      anchorText: 'juhlasanaston sanahaku-ty\u00f6lehdet',
      context: 'Juhlasanaston oppiminen sanahakuteht\u00e4viss\u00e4, joissa lapset etsiv\u00e4t termej\u00e4 kuten koristella, perinne, viett\u00e4\u00e4 ja juhlia sanaruudukosta.',
    },
    {
      appId: 'word-scramble',
      anchorText: 'juhlasanojen sekoitusteht\u00e4v\u00e4t',
      context: 'Sanojen sekoitusteht\u00e4v\u00e4t haastavat lapsia j\u00e4rjest\u00e4m\u00e4\u00e4n sekoitetut juhlasanat oikeaan muotoon, vahvistaen oikeinkirjoitusta ja sanantunnistusta.',
    },
  ],

  expertTips: [
    {
      tip: 'Rakenna luokkaan juhlakalenteri, johon lis\u00e4t\u00e4\u00e4n jokainen juhla sit\u00e4 mukaa kun se l\u00e4hestyy. Ty\u00f6lehdet liitet\u00e4\u00e4n kalenteriin, jolloin vuoden lopussa on t\u00e4ydellinen kulttuurinen aikajana.',
      source: 'Luokanopettaja, kulttuurikasvatus',
      gradeRange: '1.\u20133. lk',
    },
    {
      tip: 'Kutsu eri kulttuuritaustaisia perheit\u00e4 esittelm\u00e4\u00e4n omia juhliaan luokkaan. Ty\u00f6lehdet valmistavat oppilaat vierailuun ja antavat rakenteen keskustelulle.',
      source: 'Monikulttuurisuuskasvattaja, inklusiivinen opetus',
      gradeRange: 'Esiopetus\u20133. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 juhlateemaa tunnetaitojen opettamiseen: juhlia odottaessa harjoitellaan k\u00e4rsiv\u00e4llisyytt\u00e4, lahjan antamisessa anteliaisuutta ja yhdess\u00e4 viett\u00e4ess\u00e4 sosiaalisia taitoja. Ty\u00f6lehdet tarjoavat keskustelun pohjan.',
      source: 'Kasvatuspsykologi, sosio-emotionaalinen oppiminen',
      gradeRange: 'Esiopetus\u20132. lk',
    },
  ],`;

// ── 3. Weather (sää) ──────────────────────────────────────────────────────

const weatherFields = `
  // -- SEO Enrichment (Part 181) --

  classroomScenarios: [
    {
      situation: 'Esiopetusryhm\u00e4n opettaja huomaa, ett\u00e4 lapset k\u00e4ytt\u00e4v\u00e4t vain sanoja kylm\u00e4 ja l\u00e4mmin kuvaamaan s\u00e4\u00e4t\u00e4, eivätkä osaa erotella s\u00e4\u00e4ilmi\u00f6it\u00e4 tarkemmin.',
      solution: 'H\u00e4n ottaa k\u00e4ytt\u00f6\u00f6n s\u00e4\u00e4aiheiset ty\u00f6lehdet, joissa lapset yhdist\u00e4v\u00e4t s\u00e4\u00e4symbolit oikeisiin s\u00e4\u00e4kuvauksiin, lajittelevat s\u00e4\u00e4vaatteita ja pit\u00e4v\u00e4t kuvallista s\u00e4\u00e4p\u00e4iv\u00e4kirjaa viikon ajan.',
      outcome: 'Kolmen viikon j\u00e4lkeen lapset k\u00e4ytt\u00e4v\u00e4t monipuolista s\u00e4\u00e4sanastoa kuten tihkusade, lumipyry, selke\u00e4 ja pilvinen. He alkavat tehdj\u00e4 omia s\u00e4\u00e4ennusteita aamun taivaan perusteella.',
    },
    {
      situation: 'Kotikouluvanhempi etsii tapaa yhdist\u00e4\u00e4 luonnontiede ja matematiikka kolmasluokkalaiselle, joka pit\u00e4\u00e4 tilastoja tylj\u00e4n\u00e4.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 s\u00e4\u00e4aiheisia ty\u00f6lehti\u00e4, joissa lapsi mittaa l\u00e4mp\u00f6tilaa joka p\u00e4iv\u00e4, piirt\u00e4\u00e4 diagrammeja sademj\u00e4\u00e4rist\u00e4 ja vertailee eri kuukausien s\u00e4\u00e4dataa.',
      outcome: 'Lapsi innostuu datank\u00e4sittelyst\u00e4, koska h\u00e4n ker\u00e4\u00e4 oman datansa oikeista havainnoista. Kuukauden sis\u00e4ll\u00e4 h\u00e4n osaa lukea ja piirt\u00e4\u00e4 pylv\u00e4sdiagrammeja ja laskea keskim\u00e4\u00e4ri\u00e4.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'S\u00e4\u00e4ilmi\u00f6iden kirjo', value: '15+ ilmi\u00f6t\u00e4' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota s\u00e4\u00e4symbolikortteja ja s\u00e4\u00e4karttateht\u00e4vi\u00e4, joissa s\u00e4\u00e4ilmi\u00f6t esitet\u00e4\u00e4n kuvallisesti. Diagrammien piirt\u00e4minen s\u00e4\u00e4datasta yhdist\u00e4\u00e4 visuaalisen esityksen tieteelliseen ajatteluun.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Vie oppilaat ulos mittaamaan s\u00e4\u00e4t\u00e4 oikeasti: l\u00e4mp\u00f6mittari, sademittari ja tuuliviiri tekev\u00e4t s\u00e4\u00e4havainnoista konkreettisia. Ty\u00f6lehdet t\u00e4ydennet\u00e4\u00e4n oikeilla mittaustuloksilla.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'S\u00e4\u00e4 on universaali kokemus \u2014 jokainen lapsi tuntee sateen, auringonpaisteen ja tuulen. Aloita s\u00e4\u00e4symbolien tunnistamisesta ja lis\u00e4\u00e4 suomenkielist\u00e4 s\u00e4\u00e4sanastoa asteittain. Kuvitetut s\u00e4\u00e4kortit helpottavat sanaston rakentamista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta s\u00e4\u00e4datan analyysill\u00e4: keskim\u00e4\u00e4r\u00e4iset l\u00e4mp\u00f6tilat, sadem\u00e4\u00e4r\u00e4vertailut ja s\u00e4\u00e4ennusteiden tarkkuuden seuranta. Ilmastonmuutoksen perusselitykset tuovat tieteellist\u00e4 syvyytt\u00e4.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolioarviointi',
      criteria: 'Ker\u00e4\u00e4 s\u00e4\u00e4aiheisia ty\u00f6lehti\u00e4 usean viikon ajalta. Vertaa s\u00e4\u00e4sanaston laajuutta, mittaustulosten tarkkuutta ja kyky\u00e4 selitt\u00e4\u00e4 s\u00e4\u00e4ilmi\u00f6iden syit\u00e4.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'S\u00e4\u00e4p\u00e4iv\u00e4kirja-arviointi',
      criteria: 'Oppilas pit\u00e4\u00e4 kahden viikon ajan s\u00e4\u00e4p\u00e4iv\u00e4kirjaa, johon h\u00e4n merkitsee s\u00e4\u00e4tilan, l\u00e4mp\u00f6tilan ja omat havainnot. Arvioi havaintojen tarkkuutta, sanaston monipuolisuutta ja datan esittj\u00e4mist\u00e4.',
      gradeLevel: '1.\u20133. lk',
    },
    {
      method: 'S\u00e4\u00e4ennusteleikki',
      criteria: 'Pyyd\u00e4 oppilasta ennustamaan huomisen s\u00e4\u00e4 perustellen ennusteensa t\u00e4n\u00e4\u00e4n n\u00e4hdyill\u00e4 merkeill\u00e4. Arvioi p\u00e4\u00e4ttelytaitoja, s\u00e4\u00e4sanaston k\u00e4ytt\u00f6\u00e4 ja perustelujen loogisuutta.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (s\u00e4\u00e4 ja ilmasto)',
      connection: 'S\u00e4\u00e4teema kytkeytyy POPS 2014:n ymp\u00e4rist\u00f6opin tavoitteisiin s\u00e4\u00e4ilmi\u00f6iden havainnoinnista, mittaamisesta ja selitt\u00e4misest\u00e4. S\u00e4\u00e4ty\u00f6lehdet kehitt\u00e4v\u00e4t tutkivaa oppimista konkreettisten havaintojen kautta.',
      activity: 'S\u00e4\u00e4symboliteht\u00e4v\u00e4n j\u00e4lkeen oppilaat perustavat luokan s\u00e4\u00e4aseman: mittaavat l\u00e4mp\u00f6tilaa, sadetta ja tuulen suuntaa p\u00e4ivitt\u00e4in ja kirjaavat tulokset yhteiseen taulukkoon.',
    },
    {
      subject: 'Matematiikka',
      connection: 'S\u00e4\u00e4data tarjoaa autenttisen kontekstin mittaamiselle, taulukoimiselle ja diagrammien piirt\u00e4miselle. L\u00e4mp\u00f6tilaerot ja sademj\u00e4\u00e4r\u00e4vertailut harjoittavat laskutoimituksia todellisella datalla.',
      activity: 'L\u00e4mp\u00f6tilamittausviikon j\u00e4lkeen oppilaat piirt\u00e4v\u00e4t viivakuvaajan ja laskevat viikon keskim\u00e4\u00e4r\u00e4isen l\u00e4mp\u00f6tilan.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'S\u00e4\u00e4teema rikastaa kuvailevaa kieltj\u00e4: aistihavainnot tuulesta, sateesta ja auringonpaisteesta kehitt\u00e4v\u00e4t adjektiivien ja vertailumuotojen k\u00e4ytt\u00f6\u00e4.',
      activity: 'Sanahaun j\u00e4lkeen oppilaat kirjoittavat s\u00e4\u00e4runon, jossa jokainen s\u00e4e kuvaa eri s\u00e4\u00e4ilmi\u00f6t\u00e4 aistihavaintojen kautta.',
    },
  ],

  uniqueAngle: 'S\u00e4\u00e4aiheiset ty\u00f6lehdet ovat pedagogisesti erityisen arvokkaita, koska s\u00e4\u00e4 on luonnontieteen ainoa aihe, jonka jokainen lapsi kokee joka p\u00e4iv\u00e4 omakohtaisesti. T\u00e4m\u00e4 arkip\u00e4iv\u00e4inen kokemus tekee s\u00e4\u00e4st\u00e4 ihanteellisen tieteellisen ajattelun l\u00e4ht\u00f6kohdan: lapsi voi heti yhdist\u00e4\u00e4 ty\u00f6lehden sis\u00e4ll\u00f6n omiin havaintoihinsa. Suomessa s\u00e4\u00e4 on erityisen monipuolinen oppimisteema, koska s\u00e4\u00e4vaihtelut ovat dramaattisia: kesj\u00e4n helteest\u00e4 talven paukkupakkasiin, syksyn myrskyst\u00e4 kev\u00e4\u00e4n sulamisen. POPS 2014:n ymp\u00e4rist\u00f6oppi korostaa s\u00e4\u00e4ilmi\u00f6iden havainnointia ja mittaamista, ja s\u00e4\u00e4ty\u00f6lehdet tukevat t\u00e4t\u00e4 tutkivan oppimisen l\u00e4hestymistapaa konkreettisesti. S\u00e4\u00e4teema yhdist\u00e4\u00e4 luontevasti luonnontieteen ja matematiikan: l\u00e4mp\u00f6tilamittaukset, sademj\u00e4\u00e4r\u00e4tilastot ja tuulisuunnan kirjaaminen ovat samalla sek\u00e4 tieteellisi\u00e4 havaintoja ett\u00e4 matemaattisia harjoituksia. Datan ker\u00e4\u00e4minen, taulukoiminen ja diagrammien piirt\u00e4minen kehitt\u00e4v\u00e4t tilastollista ajattelua luonnollisessa kontekstissa.',

  researchCitation: 'Ahi, B. (2017). Thinking about Meteorological Events in Kindergarten: A Study of Turkish Preschool Children\u2019s Conceptual Understanding of Weather. Early Childhood Education Journal, 45(5), 607\u2013617. Tutkimus osoitti, ett\u00e4 konkreettiset s\u00e4\u00e4havainnot ja -teht\u00e4v\u00e4t parantavat esiopetusik\u00e4isten lasten tieteellis\u00e4 ymm\u00e4rryst\u00e4 s\u00e4\u00e4ilmi\u00f6ist\u00e4 merkitt\u00e4v\u00e4sti.',

  culturalNotes: 'Suomessa s\u00e4\u00e4 on p\u00e4ivitt\u00e4isen keskustelun aihe, ja suomalaisilla on rikas s\u00e4\u00e4sanasto (nuoska, loska, r\u00e4nt\u00e4, puuteri). POPS 2014:n ymp\u00e4rist\u00f6oppi korostaa s\u00e4\u00e4havaintojen tekemist\u00e4 ja luonnonilmi\u00f6iden ymm\u00e4rt\u00e4mist\u00e4. Suomen s\u00e4\u00e4palvelu Ilmatieteen laitos on kansainv\u00e4lisesti tunnustettu, ja s\u00e4\u00e4ennusteiden seuraaminen on osa suomalaista arkea.',

  snippetDefinition: 'S\u00e4\u00e4aiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t sadetta, aurinkoa, lunta, tuulta ja muita s\u00e4\u00e4ilmi\u00f6it\u00e4 matematiikan, lukutaidon ja luonnontieteen opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t mittausteht\u00e4vi\u00e4, sanahakuja, s\u00e4\u00e4symbolien tunnistamista ja v\u00e4ritysteht\u00e4vi\u00e4.',

  snippetHowTo: [
    'Aloita p\u00e4iv\u00e4 s\u00e4\u00e4havainnolla: katso ikkunasta yhdess\u00e4 lasten kanssa ja kirjaa senhetkinen s\u00e4\u00e4tila ennen ty\u00f6lehden aloittamista.',
    'Valitse kaksi tai kolme ty\u00f6lehtityyppi\u00e4 eri taitoalueille \u2014 esimerkiksi mittausteht\u00e4v\u00e4 matematiikkaan, sanahaku sanastoon ja s\u00e4\u00e4symboliteht\u00e4v\u00e4 luokitteluun.',
    'Yhdist\u00e4 ty\u00f6lehdet oikeisiin mittauksiin: l\u00e4mp\u00f6mittarin lukeminen, sademittarin tarkistaminen ja tuulen suunnan havainnointi tekev\u00e4t oppimisesta konkreettista.',
    'Jaa ty\u00f6lehdet vaikeustason mukaan: aloita s\u00e4\u00e4symbolien tunnistamisesta ennen mittaamista ja datan analysointia.',
    'Kierr\u00e4 lasten joukossa ja esit\u00e4 avoimia kysymyksi\u00e4 kuten Miksi sataa t\u00e4n\u00e4\u00e4n tai Miten teid\u00e4n s\u00e4\u00e4huomenne eroaa eilisest\u00e4.',
    'Pid\u00e4 viikon mittainen s\u00e4\u00e4seurantajakso, jonka lopussa oppilaat piirt\u00e4v\u00e4t yhteenvetokuvaajan tuloksistaan.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet portfoliokansioon ja seuratkaa s\u00e4\u00e4sanaston ja tieteellisen ajattelun kehittymist\u00e4.',
  ],

  limitations: 'S\u00e4\u00e4ty\u00f6lehdet voivat yksinkertaistaa monimutkaisia ilmastotieteellisi\u00e4 ilmi\u00f6it\u00e4 liikaa. Opettajien tulee erottaa s\u00e4\u00e4 ja ilmasto k\u00e4sitteellisesti. Ulkohavainnot vaativat sopivia olosuhteita ja varusteita. Ilmastonmuutos voi olla ahdistava aihe pienille lapsille, joten se tulee k\u00e4sitell\u00e4 ik\u00e4tasoisesti ja toiveikkaasti.',

  themeComparisons: [
    {
      vsThemeId: 'seasons',
      summary: 'Vuodenaikaty\u00f6lehdet tutkivat vuoden sykli\u00e4 kokonaisuutena. S\u00e4\u00e4ty\u00f6lehdet keskittyv\u00e4t yksitt\u00e4isiin s\u00e4\u00e4ilmi\u00f6ihin ja niiden mittaamiseen p\u00e4iv\u00e4kohtaisella tarkkuudella.',
    },
    {
      vsThemeId: 'nature',
      summary: 'Luontoty\u00f6lehdet tutkivat el\u00e4imi\u00e4 ja kasveja. S\u00e4\u00e4ty\u00f6lehdet tutkivat ilmakeh\u00e4n ilmi\u00f6it\u00e4, jotka vaikuttavat luontoon \u2014 ne yhdistyv\u00e4t luontevasti pohdittaessa s\u00e4\u00e4n vaikutusta el\u00e4imiin ja kasveihin.',
    },
    {
      vsThemeId: 'winter',
      summary: 'Talvity\u00f6lehdet keskittyv\u00e4t yhden vuodenajan kokemuksiin. S\u00e4\u00e4ty\u00f6lehdet kattavat kaikki s\u00e4\u00e4ilmi\u00f6t l\u00e4pi vuoden, mahdollistaen vertailun eri vuodenaikojen s\u00e4\u00e4tyyppien v\u00e4lill\u00e4.',
    },
    {
      vsThemeId: 'ocean',
      summary: 'Meriteematy\u00f6lehdet tutkivat vesimaailmaa. S\u00e4\u00e4ty\u00f6lehdet tutkivat ilmakeh\u00e4n ilmi\u00f6it\u00e4, ja molemmat yhdistyv\u00e4t vesikierron kautta: meri haihduttaa, pilvet muodostuvat ja sade palaa.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 's\u00e4\u00e4aiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'S\u00e4\u00e4aiheiset v\u00e4ritysteht\u00e4v\u00e4t esittelev\u00e4t eri s\u00e4\u00e4tiloja kuten aurinkoista p\u00e4iv\u00e4\u00e4, sadesj\u00e4\u00e4t\u00e4 ja lumimyrskyj\u00e4, kehitt\u00e4en hienomotoriikkaa ja s\u00e4\u00e4sanastoa.',
    },
    {
      appId: 'draw-and-color',
      anchorText: 's\u00e4\u00e4ilmi\u00f6iden piirustusteht\u00e4v\u00e4t',
      context: 'Piirustus- ja v\u00e4ritysteht\u00e4v\u00e4t antavat lasten piirt\u00e4\u00e4 omia s\u00e4\u00e4kohtauksia, vahvistaen visuaalista s\u00e4\u00e4sanaston muistamista luovan ilmaisun kautta.',
    },
    {
      appId: 'word-search',
      anchorText: 's\u00e4\u00e4sanaston sanahaku-ty\u00f6lehdet',
      context: 'S\u00e4\u00e4sanaston oppiminen sanahakuteht\u00e4viss\u00e4, joissa lapset etsiv\u00e4t termej\u00e4 kuten ukkonen, huurre, tihkusade ja helle sanaruudukosta.',
    },
    {
      appId: 'matching-app',
      anchorText: 's\u00e4\u00e4symbolien yhdist\u00e4misteht\u00e4v\u00e4t',
      context: 'Yhdist\u00e4misteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t visuaalista muistia ja luokittelutaitoja, kun lapset parittavat s\u00e4\u00e4symboleja kuvauksiin, vaatteisiin tai vuodenaikoihin.',
    },
  ],

  expertTips: [
    {
      tip: 'Perusta luokkaan s\u00e4\u00e4asema, jossa on l\u00e4mp\u00f6mittari, sademittari ja tuuliviiri. Joka aamu s\u00e4\u00e4p\u00e4ivyst\u00e4j\u00e4 lukee mittarit ja kirjaa tulokset. Ty\u00f6lehdet sy\u00f6tet\u00e4\u00e4n oikealla datalla.',
      source: 'Luonnontieteen opettaja, tutkiva oppiminen',
      gradeRange: '1.\u20133. lk',
    },
    {
      tip: 'Yhdist\u00e4 s\u00e4\u00e4ty\u00f6lehdet p\u00e4ivitt\u00e4iseen s\u00e4\u00e4piiriin: joka aamu yksi oppilas esittelee s\u00e4\u00e4havainnon ja t\u00e4ytt\u00e4\u00e4 s\u00e4\u00e4kalenterin. Viikon lopussa tehdj\u00e4\u00e4n yhteenveto ty\u00f6lehdelle.',
      source: 'Luokanopettaja, rutiinit ja rakenne',
      gradeRange: 'Esiopetus\u20132. lk',
    },
    {
      tip: 'Hy\u00f6dynn\u00e4 Ilmatieteen laitoksen avointa dataa oppitunneilla: vertaile luokan mittauksia virallisiin lukemiin. T\u00e4m\u00e4 opettaa tieteellist\u00e4 vertaisarviointia ja datan luotettavuuden arviointia.',
      source: 'Tietotekniikkaopettaja, datanlukutaito',
      gradeRange: '2.\u20133. lk',
    },
  ],`;

// ── 4. Colors (värit) ────────────────────────────────────────────────────

const colorsFields = `
  // -- SEO Enrichment (Part 181) --

  classroomScenarios: [
    {
      situation: 'Esiopetusryhm\u00e4n opettaja huomaa, ett\u00e4 monet lapset tunnistavat perv\u00e4rit mutta eiv\u00e4t osaa nimetj\u00e4 v\u00e4lv\u00e4rej\u00e4 kuten violetti, oranssi tai turkoosi.',
      solution: 'H\u00e4n k\u00e4ytt\u00e4\u00e4 v\u00e4riaiheisia ty\u00f6lehti\u00e4, joissa lapset sekoittavat v\u00e4rej\u00e4 (punainen + keltainen = oranssi), lajittelevat esineit\u00e4 v\u00e4rin mukaan ja tekev\u00e4t v\u00e4rin\u00e4ytteit\u00e4 luonnonmateriaaleista.',
      outcome: 'Kuukauden j\u00e4lkeen oppilaat tunnistavat ja nimej\u00e4v\u00e4t yli viisitoista v\u00e4ri\u00e4 sek\u00e4 ymm\u00e4rt\u00e4v\u00e4t v\u00e4rien sekoittumisen perusperiaatteet. V\u00e4risanasto laajenee my\u00f6s englanninkielisill\u00e4 termeill\u00e4.',
    },
    {
      situation: 'Kotikouluvanhempi haluaa opettaa esikoululaiselle v\u00e4rej\u00e4, mutta lapsi ei jaksa istua p\u00f6yd\u00e4n \u00e4\u00e4ress\u00e4 pitk\u00e4\u00e4n.',
      solution: 'Vanhempi yhdist\u00e4\u00e4 lyhyet v\u00e4rity\u00f6lehdet toiminnallisiin v\u00e4rileikkeihin: etsii talosta tietyn v\u00e4risi\u00e4 esineit\u00e4, lajittelee legoja v\u00e4reitt\u00e4in ty\u00f6lehden mallin mukaan ja maalaa sormimaaleilla v\u00e4rien sekoituskokeen.',
      outcome: 'Lapsi oppii v\u00e4rit leikkien lomassa ilman pitk\u00e4\u00e4 p\u00f6yt\u00e4ty\u00f6skentelyj\u00e4. V\u00e4risanasto vakiintuu arjessa: lapsi alkaa kuvailla ymp\u00e4rist\u00f6\u00e4\u00e4n v\u00e4reill\u00e4 oma-aloitteisesti.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '11 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'V\u00e4rien kirjo', value: '15+ v\u00e4ri\u00e4 + sekoitukset' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota v\u00e4rien vertailukuvia, v\u00e4ripyj\u00f6r\u00e4teht\u00e4vi\u00e4 ja lajitteluharjoituksia, joissa esineet ryhm\u00e4t\u00e4\u00e4n v\u00e4rin mukaan. V\u00e4rikarttojen ja sateenkaaren piirt\u00e4minen syvent\u00e4v\u00e4t v\u00e4rik\u00e4sitteit\u00e4.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdist\u00e4 v\u00e4rity\u00f6lehdet konkreettiseen v\u00e4rien tutkimiseen: sekoita maaleja, lajittele v\u00e4rillisi\u00e4 esineit\u00e4 ja rakennetaan v\u00e4rit\u00f6rnej\u00e4. Jokaiseen ty\u00f6lehteen liitet\u00e4\u00e4n k\u00e4sill\u00e4 tekemisen vaihe.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'V\u00e4rit ovat universaaleja \u2014 jokainen lapsi n\u00e4kee v\u00e4rej\u00e4 ymp\u00e4rill\u00e4\u00e4n. Aloita perusv\u00e4rien tunnistamisesta kuvien avulla ja lis\u00e4\u00e4 suomenkielisi\u00e4 v\u00e4risanoja asteittain. Kaksikielinen v\u00e4rikorttipakka helpottaa sanaston rakentamista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta v\u00e4riteorian syvemmill\u00e4 k\u00e4sitteill\u00e4: l\u00e4mpiml\u00e4t ja kylm\u00e4t v\u00e4rit, komplementtiv\u00e4rit ja v\u00e4rien psykologiset vaikutukset. Taideprojektit, joissa v\u00e4riteoriaa sovelletaan omaan luovaan ty\u00f6h\u00f6n, tarjoavat haastetta.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolioarviointi',
      criteria: 'Ker\u00e4\u00e4 v\u00e4riaiheisia ty\u00f6lehti\u00e4 usean viikon ajalta. Vertaa v\u00e4risanaston laajuutta, v\u00e4rien tunnistamisen tarkkuutta ja v\u00e4rien sekoittamisen ymm\u00e4rryst\u00e4.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'V\u00e4rihavainnointiteht\u00e4v\u00e4',
      criteria: 'Pyyd\u00e4 oppilasta etsim\u00e4\u00e4n luokkahuoneesta mahdollisimman monta eri v\u00e4ri\u00e4 ja kirjaamaan ne. Arvioi l\u00f6ydettyjen v\u00e4rien m\u00e4\u00e4r\u00e4\u00e4, nime\u00e4misen tarkkuutta ja kyky\u00e4 erottaa l\u00e4heisi\u00e4 v\u00e4ris\u00e4vyj\u00e4.',
      gradeLevel: 'Esiopetus\u20131. lk',
    },
    {
      method: 'V\u00e4rien sekoituskoe',
      criteria: 'Anna oppilaalle kolme perv\u00e4ri\u00e4 ja pyyd\u00e4 h\u00e4nt\u00e4 sekoittamaan mahdollisimman monta uutta v\u00e4ri\u00e4. Arvioi kokeen systemaattisuutta, tulosten dokumentointia ja selityksi\u00e4 sekoittumisesta.',
      gradeLevel: '1.\u20133. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Kuvataide',
      connection: 'V\u00e4riteema kytkeytyy suoraan POPS 2014:n kuvataiteen tavoitteisiin v\u00e4rien tunnistamisesta, sekoittamisesta ja sommittelusta. V\u00e4rity\u00f6lehdet rakentavat perustan, jonka p\u00e4\u00e4lle taiteellinen ilmaisu kehittyy.',
      activity: 'V\u00e4rien sekoitusteht\u00e4v\u00e4n j\u00e4lkeen oppilaat maalaavat maiseman k\u00e4ytt\u00e4en vain kolmea perv\u00e4ri\u00e4 ja valkoista \u2014 kaikki muut v\u00e4rit sekoitetaan itse.',
    },
    {
      subject: 'Matematiikka',
      connection: 'V\u00e4rit tarjoavat luonnollisen kontekstin lajittelulle, luokittelulle ja kuvioiden tunnistamiselle. V\u00e4risarjat ja -kuviot harjoittavat matemaattista ajattelua visuaalisessa kontekstissa.',
      activity: 'Lajitteluteht\u00e4v\u00e4n j\u00e4lkeen oppilaat luovat v\u00e4rikuviosarjoja ja haastavat tovereitaan jatkamaan kuviota.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'V\u00e4riteema rikastaa adjektiivien ja kuvailevien ilmausten k\u00e4ytt\u00f6\u00e4. V\u00e4risanasto laajentaa kielellist\u00e4 ilmaisua ja tukee kuvailevaa kirjoittamista.',
      activity: 'Sanahaun j\u00e4lkeen oppilaat kirjoittavat lyhyen runon, jossa jokainen rivi alkaa eri v\u00e4rill\u00e4 ja kuvaa sen tunnelmaa.',
    },
  ],

  uniqueAngle: 'V\u00e4riaiheiset ty\u00f6lehdet ovat pedagogisesti perustavanlaatuisia, koska v\u00e4rien tunnistaminen ja nime\u00e4minen kuuluvat varhaislapsuuden ensimm\u00e4isiin kognitiivisiin saavutuksiin. V\u00e4rit ovat universaali kieli, joka ylitt\u00e4\u00e4 kulttuurirajat ja tarjoaa luonnollisen l\u00e4ht\u00f6kohdan luokittelun, vertailun ja sanaston rakentamiselle. Suomalaisessa opetussuunnitelmassa v\u00e4riteema kytkeytyy sek\u00e4 kuvataiteeseen ett\u00e4 ymp\u00e4rist\u00f6oppiin, ja se on yksi harvoista teemoista, joka on yhtj\u00e4 relevantti esiopetuksesta kolmannelle luokalle asti syvyyden kasvaessa asteittain. V\u00e4rit ovat my\u00f6s erinomainen poikkitieteellinen teema: luonnontieteess\u00e4 tutkitaan valon taittumista ja v\u00e4rispektri\u00e4, matematiikassa v\u00e4rit ovat lajittelun ja kuvioiden perusta, ja \u00e4idinkieless\u00e4 v\u00e4riadjektiivit rikastaa kuvailevaa kieltj\u00e4. Konkreettiset v\u00e4rien sekoituskokeet tekev\u00e4t abstrakteista k\u00e4sitteist\u00e4 k\u00e4sin kosketeltavia ja tarjoavat lapsille v\u00e4litt\u00f6m\u00e4n oivalluksen ilon.',

  researchCitation: 'Pitchford, N.J. & Mullen, K.T. (2005). The Role of Perception, Language, and Preference in the Developmental Acquisition of Basic Colour Terms. Journal of Experimental Child Psychology, 90(4), 275\u2013302. Tutkimus osoitti, ett\u00e4 v\u00e4rien nime\u00e4minen kehittyy merkitt\u00e4v\u00e4sti harjoituksen my\u00f6t\u00e4 ja ett\u00e4 sek\u00e4 havainto- ett\u00e4 kielelliset harjoitukset tukevat v\u00e4rik\u00e4sitteiden hallintaa.',

  culturalNotes: 'Suomessa v\u00e4rikasvatus on osa POPS 2014:n kuvataiteen ja ymp\u00e4rist\u00f6opin tavoitteita. Suomalainen luonto tarjoaa dramaattisia v\u00e4rikokemuksia: ruskan punainen ja keltainen, talven valkoinen ja sininen sek\u00e4 kes\u00e4n vihre\u00e4 ja kultainen. N\u00e4m\u00e4 luontokokemukset tekev\u00e4t v\u00e4riteemasta erityisen eloisan suomalaisessa opetuskontekstissa.',

  snippetDefinition: 'V\u00e4riaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t v\u00e4rien tunnistamista, nime\u00e4mist\u00e4 ja sekoittamista sanaston, luokittelun ja luovan ilmaisun opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t lajitteluteht\u00e4vi\u00e4, v\u00e4ripyj\u00f6r\u00e4harjoituksia, sanahakuja ja v\u00e4ritysteht\u00e4vi\u00e4.',

  snippetHowTo: [
    'Aloita v\u00e4rihavainnolla: pyyd\u00e4 lapsia etsim\u00e4\u00e4n luokkahuoneesta kaikki punaiset esineet, sitten siniset ja niin edelleen.',
    'Valitse kaksi tai kolme ty\u00f6lehtityyppi\u00e4 eri taitoalueille \u2014 esimerkiksi lajitteluteht\u00e4v\u00e4 luokitteluun, v\u00e4ritysteht\u00e4v\u00e4 hienomotoriikkaan ja sanahaku sanastoon.',
    'Yhdist\u00e4 ty\u00f6lehti konkreettiseen v\u00e4rien tutkimiseen: maalien sekoittaminen, v\u00e4rillisten esineiden lajittelu tai luonnon v\u00e4rien havainnointi.',
    'Jaa ty\u00f6lehdet vaikeustason mukaan: aloita perusv\u00e4rien tunnistamisesta ennen v\u00e4lv\u00e4rej\u00e4 ja v\u00e4riteoriaa.',
    'Kierr\u00e4 lasten joukossa ja esit\u00e4 avoimia kysymyksi\u00e4 kuten Mik\u00e4 v\u00e4ri syntyy kun sekoitat sinisen ja keltaisen tai Miksi taivas on sininen.',
    'Rakenna luokkaan v\u00e4rikokoelma-seinj\u00e4, johon oppilaat lis\u00e4\u00e4v\u00e4t v\u00e4rin\u00e4ytteit\u00e4 luonnosta, lehdist\u00e4 ja omista piirustuksistaan.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet portfoliokansioon ja seuratkaa v\u00e4risanaston ja v\u00e4riteorian ymm\u00e4rryksen kehittymist\u00e4.',
  ],

  limitations: 'V\u00e4rity\u00f6lehdet eiv\u00e4t huomioi v\u00e4risokeutta, joka koskee noin kahdeksaa prosenttia pojista. Opettajien tulee tarjota vaihtoehtoja, joissa v\u00e4rien tunnistaminen ei perustu pelkk\u00e4\u00e4n n\u00e4k\u00f6aistiin. V\u00e4rien kulttuuriset merkitykset vaihtelevat: valkoinen symboloi puhtautta Suomessa mutta surua joissain Aasian kulttuureissa. N\u00e4m\u00e4 erot voivat olla opettavaisia keskusteluaiheita.',

  themeComparisons: [
    {
      vsThemeId: 'shapes',
      summary: 'Muototy\u00f6lehdet keskittyv\u00e4t geometrisiin ominaisuuksiin. V\u00e4rity\u00f6lehdet keskittyv\u00e4t visuaalisiin ominaisuuksiin \u2014 yhdess\u00e4 ne kattavat esineiden kaksi keskeist\u00e4 ulottuvuutta.',
    },
    {
      vsThemeId: 'flowers',
      summary: 'Kukkaty\u00f6lehdet k\u00e4ytt\u00e4v\u00e4t v\u00e4rej\u00e4 luontokontekstissa. V\u00e4rity\u00f6lehdet tutkivat v\u00e4rej\u00e4 abstraktimmin ja laajemmin, kattaen v\u00e4riteorian, sekoittamisen ja kulttuuriset merkitykset.',
    },
    {
      vsThemeId: 'nature',
      summary: 'Luontoty\u00f6lehdet k\u00e4ytt\u00e4v\u00e4t v\u00e4rej\u00e4 luonnon kuvaamiseen. V\u00e4rity\u00f6lehdet tekev\u00e4t v\u00e4reist\u00e4 itsest\u00e4\u00e4n oppimisen kohteen, tutkien v\u00e4rien ominaisuuksia, nime\u00e4mist\u00e4 ja teoriaa.',
    },
    {
      vsThemeId: 'alphabet',
      summary: 'Aakkosty\u00f6lehdet opettavat kirjaimia ja \u00e4\u00e4nteit\u00e4. V\u00e4rity\u00f6lehdet opettavat visuaalista luokittelua \u2014 molemmat rakentavat perustavanlaatuisia kognitiivisia taitoja, joita tarvitaan kouluvalmiudessa.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'v\u00e4riaiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'V\u00e4ritysteht\u00e4v\u00e4t ovat v\u00e4riteeman ytimess\u00e4: lapset harjoittelevat v\u00e4rien tunnistamista, nime\u00e4mist\u00e4 ja valintaa samalla kun kehitt\u00e4v\u00e4t hienomotoriikkaa.',
    },
    {
      appId: 'draw-and-color',
      anchorText: 'v\u00e4rien piirustus- ja maalausteht\u00e4v\u00e4t',
      context: 'Piirustus- ja v\u00e4ritysteht\u00e4v\u00e4t yhdist\u00e4v\u00e4t luovan ilmaisun v\u00e4riteoriaan, kun lapset piirt\u00e4v\u00e4t ja v\u00e4ritt\u00e4v\u00e4t v\u00e4rij\u00e4rjestyksen mukaisesti.',
    },
    {
      appId: 'word-search',
      anchorText: 'v\u00e4risanaston sanahaku-ty\u00f6lehdet',
      context: 'V\u00e4risanaston oppiminen sanahakuteht\u00e4viss\u00e4, joissa lapset etsiv\u00e4t v\u00e4rien nimi\u00e4 kuten turkoosi, violetti ja oranssi sanaruudukosta.',
    },
    {
      appId: 'chart-count-color',
      anchorText: 'v\u00e4rien laskenta- ja taulukkoteht\u00e4v\u00e4t',
      context: 'Laskenta- ja taulukkoteht\u00e4v\u00e4t yhdist\u00e4v\u00e4t v\u00e4rien tunnistamisen ja matemaattisen ajattelun, kun lapset laskevat ja taulukoivat eri v\u00e4risi\u00e4 esineit\u00e4.',
    },
  ],

  expertTips: [
    {
      tip: 'J\u00e4rjest\u00e4 v\u00e4rien sekoituslaboratorio: anna lapsille kolme perv\u00e4ri\u00e4 ja valkoista, ja anna heid\u00e4n l\u00f6yt\u00e4\u00e4 sekoittamalla mahdollisimman monta uutta v\u00e4ri\u00e4. Ty\u00f6lehti dokumentoi tulokset.',
      source: 'Kuvataideopettaja, kokeellinen oppiminen',
      gradeRange: '1.\u20133. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 luontoretke\u00e4 v\u00e4rien etsimiseen: anna lapsille v\u00e4rikortti ja pyyd\u00e4 etsim\u00e4\u00e4n luonnosta vastaava s\u00e4vy. T\u00e4m\u00e4 harjoittaa tarkkaa havainnointia ja v\u00e4rien nime\u00e4mist\u00e4.',
      source: 'Luontokasvattaja, havainnointi',
      gradeRange: 'Esiopetus\u20132. lk',
    },
    {
      tip: 'Yhdist\u00e4 v\u00e4riteema tunteisiin: kysy lapsilta, milt\u00e4 eri v\u00e4rit tuntuvat ja miksi tiettyj\u00e4 v\u00e4rej\u00e4 k\u00e4ytet\u00e4\u00e4n tietyiss\u00e4 yhteyksissj\u00e4 (punainen varoitus, vihre\u00e4 turvallisuus). T\u00e4m\u00e4 sy\u00f6vent\u00e4\u00e4 v\u00e4rik\u00e4sitteit\u00e4.',
      source: 'Kasvatuspsykologi, v\u00e4rien psykologia',
      gradeRange: '2.\u20133. lk',
    },
  ],`;

// ── 5. Shapes (muodot) ──────────────────────────────────────────────────

const shapesFields = `
  // -- SEO Enrichment (Part 181) --

  classroomScenarios: [
    {
      situation: 'Ensimm\u00e4isen luokan opettaja huomaa, ett\u00e4 oppilaat tunnistavat ympy\u00f6r\u00e4n ja neli\u00f6n mutta eiv\u00e4t erota suorakulmiota neli\u00f6st\u00e4 ja kolmiosta ker\u00e4st\u00e4.',
      solution: 'H\u00e4n k\u00e4ytt\u00e4\u00e4 muotoaiheisia ty\u00f6lehti\u00e4, joissa oppilaat lajittelevat muotoja ominaisuuksien mukaan (kulmien lukum\u00e4\u00e4r\u00e4, sivujen pituudet), piirt\u00e4v\u00e4t muotoja pistem\u00e4\u00e4r\u00e4n mukaan ja etsiv\u00e4t muotoja luokkahuoneesta.',
      outcome: 'Kuukauden j\u00e4lkeen oppilaat erottavat yli kymmenen geometrist\u00e4 muotoa ja osaavat kuvailla niiden ominaisuuksia k\u00e4ytt\u00e4en termej\u00e4 kuten kulma, sivu ja symmetria.',
    },
    {
      situation: 'Kotikouluvanhempi haluaa opettaa geometriaa esikoululaiselle, joka rakastaa rakentamista mutta ei pid\u00e4 paperiteht\u00e4vist\u00e4.',
      solution: 'Vanhempi yhdist\u00e4\u00e4 muototy\u00f6lehdet rakentamiseen: ensin tunnistetaan muodot ty\u00f6lehdell\u00e4, sitten rakennetaan ne palikoilla, ja lopuksi etsit\u00e4\u00e4n talosta esineit\u00e4, joissa n\u00e4kyy sama muoto.',
      outcome: 'Lapsi oppii muodot k\u00e4yt\u00e4nn\u00f6n kautta ja alkaa n\u00e4hd\u00e4 geometriaa kaikkialla ymp\u00e4rist\u00f6ss\u00e4\u00e4n. Rakennusprojektit muuttuvat tietoisemmiksi muotojen k\u00e4yt\u00f6ss\u00e4.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '12 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Geometristen muotojen kirjo', value: '15+ muotoa' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota muotojen tunnistamisteht\u00e4vi\u00e4 kuvista, symmetriateht\u00e4vi\u00e4 ja muotomosaiikkeja. Muotojen piirt\u00e4minen ruudukkoon kehitt\u00e4\u00e4 avaruudellista hahmotusta.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Rakenna muotoja fyysisesti: taivuta piipunpuhdistajia muodoiksi, j\u00e4rjest\u00e4 palikat geometrisiin ryhmiin ja muodosta keholla eri muotoja lattialla. Konkreettiset materiaalit tekev\u00e4t abstrakteista muodoista k\u00e4sin kosketeltavia.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Geometriset muodot ovat samoja kaikissa kieliss\u00e4 \u2014 ympy\u00f6r\u00e4 on ympy\u00f6r\u00e4 kaikkialla. Aloita muotojen tunnistamisesta kuvista ja lis\u00e4\u00e4 suomenkielisi\u00e4 termej\u00e4 asteittain. Muotojen piirt\u00e4minen ei vaadi kielellist\u00e4 osaamista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta kolmiulotteisilla muodoilla (kuutio, kartio, sylinteri) ja symmetrian tutkimisella. Muotojen yhdist\u00e4minen monimutkaisemmiksi kuvioiksi ja tessellaaatioteht\u00e4v\u00e4t lis\u00e4\u00e4v\u00e4t matemaattista haastetta.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolioarviointi',
      criteria: 'Ker\u00e4\u00e4 muotoaiheisia ty\u00f6lehti\u00e4 usean viikon ajalta. Vertaa muotosanaston laajuutta, tunnistamisen tarkkuutta ja muotojen ominaisuuksien kuvailun kehittymist\u00e4.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Muotojen etsint\u00e4teht\u00e4v\u00e4',
      criteria: 'Pyyd\u00e4 oppilasta etsim\u00e4\u00e4n luokkahuoneesta tai koulupihassta mahdollisimman monta eri muotoa ja piirt\u00e4m\u00e4\u00e4n ne. Arvioi l\u00f6ydettyjen muotojen monipuolisuutta, nime\u00e4misen tarkkuutta ja ominaisuuksien kuvailua.',
      gradeLevel: 'Esiopetus\u20131. lk',
    },
    {
      method: 'Muotojen luokitteluteht\u00e4v\u00e4',
      criteria: 'Anna oppilaalle valikoima muotoja ja pyyd\u00e4 luokittelemaan ne eri kriteerein: kulmien lukum\u00e4\u00e4r\u00e4, sivujen pituudet, symmetria. Arvioi luokittelun johdonmukaisuutta ja k\u00e4ytettyj\u00e4 perusteita.',
      gradeLevel: '1.\u20133. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Matematiikka (geometria)',
      connection: 'Muototeema kytkeytyy suoraan POPS 2014:n matematiikan geometrian tavoitteisiin: muotojen tunnistaminen, ominaisuuksien vertailu, symmetria ja avaruudellinen hahmotus. Ty\u00f6lehdet konkretisoivat abstraktit geometriset k\u00e4sitteet.',
      activity: 'Muotojen lajitteluteht\u00e4v\u00e4n j\u00e4lkeen oppilaat rakentavat palikoista rakennuksen ja laskevat, montako kutakin muotoa rakennuksessa on.',
    },
    {
      subject: 'Kuvataide',
      connection: 'Geometriset muodot ovat sommittelun perusta. Muototy\u00f6lehdet harjoittavat muotojen piirt\u00e4mist\u00e4 ja yhdistelyj\u00e4, mikj\u00e4 tukee taiteellista ilmaisua ja arkkitehtonista ajattelua.',
      activity: 'Muotojen tunnistamisteht\u00e4v\u00e4n j\u00e4lkeen oppilaat luovat abstraktin taideteoksen k\u00e4ytt\u00e4en vain geometrisia perusmuotoja.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Muotosanasto (kulma, sivu, k\u00e4rki, symmetria) laajentaa matemaattista kieltj\u00e4 ja kehitt\u00e4\u00e4 kyky\u00e4 kuvailla esineit\u00e4 tarkasti. Ohjeiden antaminen ja noudattaminen muotojen piirt\u00e4misess\u00e4 harjoittaa ohjeistavaa tekstilajia.',
      activity: 'Sanahakuteht\u00e4v\u00e4n j\u00e4lkeen oppilaat kirjoittavat piirustustohjeen, jossa kuvaavat muodon niin tarkasti, ett\u00e4 toinen oppilas voi piirt\u00e4\u00e4 sen pelk\u00e4n kuvauksen perusteella.',
    },
  ],

  uniqueAngle: 'Muotoaiheiset ty\u00f6lehdet ovat geometrisen ajattelun perusta, ja geometria on matemaattisen ajattelun laji, joka kehitt\u00e4\u00e4 avaruudellista p\u00e4\u00e4ttelyj\u00e4 \u2014 taitoa, jota tarvitaan arkkitehtuurissa, suunnittelussa ja jokapj\u00e4iv\u00e4isess\u00e4 ongelmanratkaisussa. Muototy\u00f6lehdet tekev\u00e4t abstrakteista geometrisista k\u00e4sitteist\u00e4 konkreettisia, koska lapsi voi piirt\u00e4\u00e4, leikata ja rakentaa muotoja fyysisesti. Suomalaisessa POPS 2014:ss\u00e4 geometria alkaa jo esiopetuksesta muotojen tunnistamisella ja etenee ominaisuuksien vertailuun, symmetriaan ja avaruudelliseen hahmotukseen. Muotojen tunnistaminen ymp\u00e4rist\u00f6ss\u00e4 \u2014 ikkunan suorakulmio, kellon ympy\u00f6r\u00e4, katon kolmio \u2014 yhdist\u00e4\u00e4 matemaattisen ajattelun arkimaailmaan. T\u00e4m\u00e4 arjen yhteys tekee geometriasta vj\u00e4hemm\u00e4n abstraktia ja motivoivampaa. Muototeema yhdist\u00e4\u00e4 luontevasti matematiikan, kuvataiteen ja teknologian, koska geometriset muodot ovat sek\u00e4 matemaattisia objekteja ett\u00e4 taiteellisen sommittelun peruselementtej\u00e4.',

  researchCitation: 'Clements, D.H. & Sarama, J. (2011). Early Childhood Teacher Education: The Case of Geometry. Journal of Mathematics Teacher Education, 14(2), 133\u2013148. Tutkimus osoitti, ett\u00e4 varhainen geometrinen ajattelu ennustaa my\u00f6hemp\u00e4\u00e4 matemaattista menestyst\u00e4 ja ett\u00e4 konkreettiset muototeht\u00e4v\u00e4t kehitt\u00e4v\u00e4t avaruudellista p\u00e4\u00e4ttelyj\u00e4 tehokkaasti.',

  culturalNotes: 'Suomessa geometria on POPS 2014:n matematiikan keskeinen sis\u00e4lt\u00f6alue jo esiopetuksesta alkaen. Suomalainen arkkitehtuuri ja muotoilu (Alvar Aalto, Marimekko) tarjoavat kulttuurisesti relevantin kontekstin geometristen muotojen tutkimiseen. Luonnosta l\u00f6ytyv\u00e4t muodot \u2014 lumihiutaleiden kuusikulmiot, k\u00e4pyjen spiraalit \u2014 yhdist\u00e4v\u00e4t geometrian luonnontieteeseen.',

  snippetDefinition: 'Muotoaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t geometrisia muotoja kuten ympy\u00f6r\u00e4\u00e4, neli\u00f6t\u00e4, kolmiota ja suorakulmiota luokittelun, avaruudellisen ajattelun ja matemaattisen sanaston opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t tunnistamisteht\u00e4vi\u00e4, lajittelupulmia, piirustusteht\u00e4vi\u00e4 ja symmetriaharjoituksia.',

  snippetHowTo: [
    'Aloita muotohavainnolla: pyyd\u00e4 lapsia etsim\u00e4\u00e4n luokkahuoneesta ympy\u00f6r\u00f6it\u00e4, neli\u00f6it\u00e4 ja kolmioita ennen ty\u00f6lehtiteht\u00e4v\u00e4\u00e4.',
    'Valitse kaksi tai kolme ty\u00f6lehtityyppi\u00e4 eri taitoalueille \u2014 esimerkiksi tunnistamisteht\u00e4v\u00e4 geometriaan, v\u00e4ritysteht\u00e4v\u00e4 hienomotoriikkaan ja sanahaku sanastoon.',
    'Yhdist\u00e4 ty\u00f6lehti konkreettiseen rakentamiseen: palikat, piipunpuhdistajat ja muotopalapelit tekev\u00e4t geometriasta k\u00e4sin kosketeltavaa.',
    'Jaa ty\u00f6lehdet vaikeustason mukaan: aloita perusmuotojen tunnistamisesta ennen ominaisuuksien vertailua ja symmetriateht\u00e4vi\u00e4.',
    'Kierr\u00e4 lasten joukossa ja esit\u00e4 avoimia kysymyksi\u00e4 kuten Montako kulmaa t\u00e4ss\u00e4 muodossa on tai Miten neli\u00f6 eroaa suorakulmiosta.',
    'J\u00e4rjest\u00e4 muotojen metsj\u00e4stys koulupihalla: oppilaat kuvaavat tai piirt\u00e4v\u00e4t l\u00f6yt\u00e4mi\u00e4\u00e4n muotoja ja esittelev\u00e4t ne luokalle.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet portfoliokansioon ja seuratkaa muotosanaston ja geometrisen ajattelun kehittymist\u00e4.',
  ],

  limitations: 'Muototy\u00f6lehdet keskittyv\u00e4t tyypillisesti kaksiulotteisiin muotoihin, jolloin kolmiulotteinen ymm\u00e4rrys j\u00e4\u00e4 vajaaksi. Opettajien tulee t\u00e4ydent\u00e4\u00e4 paperiteht\u00e4vi\u00e4 konkreettisilla kolmiulotteisilla malleilla. Tarkka piirt\u00e4minen voi olla motorisesti haastavaa pienille lapsille, joten piirtj\u00e4misteht\u00e4v\u00e4t tulee mitoittaa ik\u00e4tasoisesti.',

  themeComparisons: [
    {
      vsThemeId: 'numbers',
      summary: 'Numeroty\u00f6lehdet keskittyv\u00e4t lukujen tunnistamiseen ja laskemiseen. Muototy\u00f6lehdet keskittyv\u00e4t avaruudelliseen ajatteluun ja geometriaan \u2014 yhdess\u00e4 ne kattavat matematiikan kaksi perustavaa osa-aluetta.',
    },
    {
      vsThemeId: 'colors',
      summary: 'V\u00e4rity\u00f6lehdet tutkivat visuaalisia ominaisuuksia. Muototy\u00f6lehdet tutkivat rakenteellisia ominaisuuksia \u2014 molemmat kehitt\u00e4v\u00e4t havainnointitaitoja eri n\u00e4k\u00f6kulmista.',
    },
    {
      vsThemeId: 'construction',
      summary: 'Rakennusteematy\u00f6lehdet k\u00e4ytt\u00e4v\u00e4t muotoja k\u00e4yt\u00e4nn\u00f6llisess\u00e4 kontekstissa. Muototy\u00f6lehdet opettavat geometrian perusk\u00e4sitteet, jotka mahdollistavat rakennusprojektien ymm\u00e4rt\u00e4misen.',
    },
    {
      vsThemeId: 'toys',
      summary: 'Leluty\u00f6lehdet k\u00e4ytt\u00e4v\u00e4t tuttuja esineit\u00e4 oppimiskontekstina. Muototy\u00f6lehdet auttavat lasta n\u00e4kem\u00e4\u00e4n lelujen geometriset perusrakenteet \u2014 pallon ympy\u00f6r\u00e4, laatikon suorakulmio.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'muotoaiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Muotoaiheiset v\u00e4ritysteht\u00e4v\u00e4t yhdist\u00e4v\u00e4t geometrian tunnistamisen ja hienomotoriikan, kun lapset v\u00e4ritt\u00e4v\u00e4t eri muotoja ja muotomosaiikkeja.',
    },
    {
      appId: 'matching-app',
      anchorText: 'muotojen yhdist\u00e4misteht\u00e4v\u00e4t',
      context: 'Yhdist\u00e4misteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t visuaalista muistia ja luokittelutaitoja, kun lapset parittavat samanmuotoisia esineit\u00e4 tai yhdist\u00e4v\u00e4t muodot niiden nimiin.',
    },
    {
      appId: 'word-search',
      anchorText: 'muotosanaston sanahaku-ty\u00f6lehdet',
      context: 'Muotosanaston oppiminen sanahakuteht\u00e4viss\u00e4, joissa lapset etsiv\u00e4t termej\u00e4 kuten ympy\u00f6r\u00e4, kolmio, suorakulmio ja symmetria sanaruudukosta.',
    },
    {
      appId: 'sudoku',
      anchorText: 'muotoaiheiset sudoku-pulmat',
      context: 'Muotoaiheiset sudoku-pulmat kehitt\u00e4v\u00e4t loogista p\u00e4\u00e4ttelyj\u00e4, kun lapset sijoittavat geometrisia muotoja ruudukkoon loogisten sj\u00e4\u00e4nt\u00f6jen mukaisesti.',
    },
  ],

  expertTips: [
    {
      tip: 'Rakenna luokkaan muotomuses: ker\u00e4tkj\u00e4\u00e4 esineit\u00e4, jotka edustavat eri muotoja (CD = ympy\u00f6r\u00e4, kirja = suorakulmio, kolmioviivain = kolmio) ja luokitelkaa ne yhdess\u00e4. Ty\u00f6lehdet saavat konkreettisen vastineen.',
      source: 'Luokanopettaja, konkreettiset materiaalit',
      gradeRange: 'Esiopetus\u20131. lk',
    },
    {
      tip: 'Yhdist\u00e4 muototy\u00f6lehdet koodaamisen alkeisiin: oppilaat ohjelmoivat yksinkertaisen piirto-ohjelman piirt\u00e4m\u00e4\u00e4n muotoja annetuilla parametreilla. T\u00e4m\u00e4 yhdist\u00e4\u00e4 geometrian ja laskennallisen ajattelun.',
      source: 'Tietotekniikkaopettaja, ohjelmointiajattelu',
      gradeRange: '2.\u20133. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 valokuvausprojektia: oppilaat kuvaavat koulussa ja kotona l\u00f6yt\u00e4mi\u00e4\u00e4n muotoja ja kokoavat niist\u00e4 muotokollaasin. Ty\u00f6lehdet tarjoavat sanaston ja luokittelukehyksen havainnointiin.',
      source: 'Kuvataidekasvattaja, visuaalinen lukutaito',
      gradeRange: '1.\u20133. lk',
    },
  ],`;

// ── 6. Numbers (numerot) ─────────────────────────────────────────────────

const numbersFields = `
  // -- SEO Enrichment (Part 181) --

  classroomScenarios: [
    {
      situation: 'Ensimm\u00e4isen luokan opettaja huomaa, ett\u00e4 osa oppilaista hallitsee luvut 1\u201310 mutta ei ymm\u00e4rr\u00e4 lukujen suuruusj\u00e4rjestyst\u00e4 eik\u00e4 paikka-arvon alkeitta.',
      solution: 'H\u00e4n k\u00e4ytt\u00e4\u00e4 numeroaiheisia ty\u00f6lehti\u00e4, joissa oppilaat j\u00e4rjest\u00e4v\u00e4t lukuja suuruusj\u00e4rjestykseen, t\u00e4ytt\u00e4v\u00e4t lukujonoja ja laskevat esineit\u00e4 kuvista vertaillen m\u00e4\u00e4ri\u00e4 toisiinsa.',
      outcome: 'Kuukauden j\u00e4lkeen oppilaat hallitsevat lukujonot 1\u201320, ymm\u00e4rt\u00e4v\u00e4t suurempi ja pienempi -vertailun ja osaavat kirjoittaa lukuja oikeassa j\u00e4rjestyksess\u00e4.',
    },
    {
      situation: 'Kotikouluvanhempi etsii tapaa tehdj\u00e4 matematiikasta hauskempaa esikoululaiselle, joka pit\u00e4\u00e4 laskemista ikj\u00e4v\u00e4n\u00e4.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 numeroaiheisia ty\u00f6lehti\u00e4, joissa laskeminen yhdistyy v\u00e4ritt\u00e4miseen (v\u00e4rit\u00e4 oikea m\u00e4\u00e4r\u00e4), tarinaan (laske karhujen omenat) ja peliin (noppa ja lukusuorateht\u00e4v\u00e4).',
      outcome: 'Lapsi alkaa laskea arjessa oma-aloitteisesti: portaita, karkkeja, lehti\u00e4 puistossa. Laskemisesta tulee leikkj\u00e4 eik\u00e4 tyj\u00f6t\u00e4.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '12 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Lukualueen kirjo', value: '1\u2013100+' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota lukusuorateht\u00e4vi\u00e4, numeron ja m\u00e4\u00e4r\u00e4n yhdist\u00e4misteht\u00e4vi\u00e4 sek\u00e4 lukujen kirjoittamista pistem\u00e4\u00e4r\u00e4korttien avulla. Visuaaliset lukuvertailut auttavat hahmottamaan suuruusj\u00e4rjestyst\u00e4.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdist\u00e4 jokainen ty\u00f6lehti konkreettiseen laskemiseen: napnit, kivet tai legopalikat. Lattialle tapahtuvat lukusuorateht\u00e4v\u00e4t, joissa lapsi hyppii oikeaan lukuun, tekev\u00e4t laskemisesta liikunnallista.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Numerot ovat universaaleja symboleja \u2014 1, 2, 3 tarkoittavat samaa kaikissa kieliss\u00e4. Aloita lukujen tunnistamisesta ja m\u00e4\u00e4rien laskemisesta kuvista. Lis\u00e4\u00e4 suomenkielisi\u00e4 lukusanoja asteittain yhdist\u00e4en ne tuttuihin numeroihin.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta laajennetulla lukualueella (100\u20131000), kertolaskun alkeilla ja lukujen hajottamisteht\u00e4vill\u00e4. Matemaattiset palapelit ja loogiset p\u00e4\u00e4ttelyteht\u00e4v\u00e4t lis\u00e4\u00e4v\u00e4t haastetta.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolioarviointi',
      criteria: 'Ker\u00e4\u00e4 numeroty\u00f6lehti\u00e4 usean viikon ajalta. Vertaa lukujen kirjoittamisen sujuvuutta, lukualueen laajuutta ja matemaattisten operaatioiden hallintaa ajan my\u00f6t\u00e4.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Lukujonon t\u00e4ydennysarviointi',
      criteria: 'Anna oppilaalle keskener\u00e4inen lukujono ja pyyd\u00e4 t\u00e4ydent\u00e4m\u00e4\u00e4n puuttuvat luvut. Varioi vaikeustasoa: 1\u201310 (esikoulu), 1\u201350 (1. lk), parillinen/pariton -sarjat (2. lk), kertolaskusarjat (3. lk).',
      gradeLevel: 'Esiopetus\u20133. lk',
    },
    {
      method: 'Laskemisen sujuvuustesti',
      criteria: 'Mittaa, kuinka nopeasti ja tarkasti oppilas laskee esineit\u00e4 kuvasta. Esikoululaisille 1\u201310 esinett\u00e4, ensimm\u00e4iselle luokalle 10\u201320 ja toiselle\u2013kolmannelle luokalle suurempia m\u00e4\u00e4ri\u00e4 ryhmitellen.',
      gradeLevel: 'Esiopetus\u20132. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Matematiikka (luvut ja laskutoimitukset)',
      connection: 'Numeroteema on POPS 2014:n matematiikan ytimess\u00e4: lukujen tunnistaminen, lukujonot, suuruusvertailu ja peruslaskutoimitukset. Numeroty\u00f6lehdet konkretisoivat n\u00e4m\u00e4 tavoitteet monipuolisten harjoitusten kautta.',
      activity: 'Lukujonojen t\u00e4ydennysteht\u00e4v\u00e4n j\u00e4lkeen oppilaat pelaavat lukusuorapeliä, jossa nopanheitto m\u00e4\u00e4r\u00e4\u00e4 siirtymj\u00e4n ja oppilas nime\u00e4\u00e4 jokaisen luvun ääneeen.',
    },
    {
      subject: 'Ymp\u00e4rist\u00f6oppi',
      connection: 'Numerot ovat mittaamisen ja havainnoinnin perusta luonnontieteess\u00e4. Laskeminen luonnossa \u2014 el\u00e4inten jalanj\u00e4lkien m\u00e4\u00e4r\u00e4, puun vuosirenkaiden lukumäärä \u2014 yhdist\u00e4\u00e4 matematiikan tieteelliseen ajatteluun.',
      activity: 'Laskuteht\u00e4v\u00e4n j\u00e4lkeen oppilaat menevj\u00e4t ulos laskemaan luonnonkohteita: kukkia, lintuja tai pilvi\u00e4 ja kirjaavat tulokset.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Lukusanat ovat kielen osa, ja niiden hallinta tukee laskutarinoiden ymm\u00e4rt\u00e4mist\u00e4 ja kirjoittamista. Ohjeiden noudattaminen numeroteht\u00e4viss\u00e4 kehitt\u00e4\u00e4 luetun ymm\u00e4rt\u00e4mist\u00e4.',
      activity: 'Sanahaun j\u00e4lkeen oppilaat kirjoittavat oman laskutarinan, jossa esiintyy v\u00e4hint\u00e4\u00e4n kolme lukusanaa ja laskutoimitus.',
    },
  ],

  uniqueAngle: 'Numeroaiheiset ty\u00f6lehdet ovat matemaattisen oppimisen perusta \u2014 kaikki my\u00f6hempi matematiikka rakentuu lukujen ymm\u00e4rt\u00e4miselle. T\u00e4m\u00e4 tekee numeroty\u00f6lehdist\u00e4 ehk\u00e4 t\u00e4rkeimm\u00e4n yksitt\u00e4isen teeman koko kokoelmassa. Suomalaisessa POPS 2014:ss\u00e4 lukujen ymm\u00e4rt\u00e4minen on matematiikan ensimm\u00e4inen ja keskeisimmin painotettu tavoitealue, ja numeroty\u00f6lehdet tukevat t\u00e4t\u00e4 tavoitetta suoraan. Numeroteema on pedagogisesti monipuolinen: sama lukualue voidaan harjoitella laskemisena, j\u00e4rjest\u00e4misen\u00e4, vertailuna, kirjoittamisena ja pelien kautta, mik\u00e4 mahdollistaa saman taidon vahvistamisen eri oppimistyylein. Konkreettisten esineiden laskeminen kuvista yhdist\u00e4\u00e4 visuaalisen havainnoinnin ja matemaattisen ajattelun, ja temaattiset kuvitukset (el\u00e4imet, hedelm\u00e4t, t\u00e4hdet) pit\u00e4v\u00e4t motivaation yll\u00e4 myyös toistuvissa harjoituksissa. Numeroty\u00f6lehtien asteittain kasvava vaikeustaaso \u2014 yksittj\u00e4isist\u00e4 luvuista lukujonoihin, vertailuun ja laskutoimituksiin \u2014 tekee niist\u00e4 koko alkuopetuksen kattavan oppimispolun.',

  researchCitation: 'Jordan, N.C. et al. (2009). Early Math Matters: Kindergarten Number Competence and Later Mathematics Outcomes. Developmental Psychology, 45(3), 850\u2013867. Tutkimus osoitti, ett\u00e4 esiopetusik\u00e4isten lukujen ymm\u00e4rt\u00e4minen ennustaa vahvasti my\u00f6hemp\u00e4\u00e4 matemaattista menestyst\u00e4 ja ett\u00e4 monipuoliset lukuharjoitukset kaventavat osaamiseroja.',

  culturalNotes: 'Suomessa lukujen opettaminen alkaa esiopetuksessa ja etenee POPS 2014:n mukaan systemaattisesti. Suomalainen matemaattisen ajattelun painotus n\u00e4kyy kansainv\u00e4lisissj\u00e4 vertailuissa: PISA-tulokset osoittavat suomalaisten lasten vahvan numeerisen perusosaamisen. Konkreettiset v\u00e4lineet ja arjen kontekstit ovat suomalaisen matematiikan opetuksen perusta.',

  snippetDefinition: 'Numeroaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t lukujen tunnistamista, laskemista, vertailua ja peruslaskutoimituksia matemaattisen ajattelun kehitt\u00e4miseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t lukujonoja, laskuteht\u00e4vi\u00e4, numeron ja m\u00e4\u00e4r\u00e4n yhdist\u00e4misharjoituksia ja matemaattisia pulmia.',

  snippetHowTo: [
    'Aloita konkreettisella laskemisella: laske yhdess\u00e4 lasten kanssa luokkahuoneen esineit\u00e4 ennen ty\u00f6lehden aloittamista.',
    'Valitse kaksi tai kolme ty\u00f6lehtityyppi\u00e4 eri taitoalueille \u2014 esimerkiksi lukujonoharjoitus, laskuteht\u00e4v\u00e4 kuvilla ja m\u00e4\u00e4r\u00e4n ja numeron yhdist\u00e4misteht\u00e4v\u00e4.',
    'Tarjoa konkreettisia v\u00e4lineit\u00e4 (nappeja, legopaloja) laskemisen tueksi ennen siirtymist\u00e4 puhtaasti kuvallisiin teht\u00e4viin.',
    'Jaa ty\u00f6lehdet vaikeustason mukaan: aloita lukujen tunnistamisesta ennen lukujonoja, vertailua ja laskutoimituksia.',
    'Kierr\u00e4 lasten joukossa ja esit\u00e4 avoimia kysymyksi\u00e4 kuten Kumpi on enemm\u00e4n tai Mit\u00e4 luku tulee viiden j\u00e4lkeen.',
    'Yhdist\u00e4 numeroteht\u00e4v\u00e4t arkeen: laske portaita, hedelmi\u00e4 v\u00e4lipalapj\u00f6yd\u00e4ss\u00e4 tai oppilaita ryhm\u00e4ss\u00e4.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet portfoliokansioon ja seuratkaa lukualueen laajenemista ja laskutaidon kehittymist\u00e4.',
  ],

  limitations: 'Numeroty\u00f6lehdet voivat painottua mekaaniseen toistoon, jolloin ymm\u00e4rrys j\u00e4\u00e4 pinnalliseksi. Opettajien tulee varmistaa, ett\u00e4 lapset ymm\u00e4rt\u00e4v\u00e4t lukujen merkityksen eik\u00e4 vain toista symboleja. Abstraktit numerosymbolit voivat olla haastavia pienimmille lapsille \u2014 konkreettiset v\u00e4lineet ja kuvat ovat v\u00e4ltt\u00e4m\u00e4tt\u00f6mi\u00e4 tukia.',

  themeComparisons: [
    {
      vsThemeId: 'alphabet',
      summary: 'Aakkosty\u00f6lehdet opettavat kielen symbolij\u00e4rjestelm\u00e4n. Numeroty\u00f6lehdet opettavat matematiikan symbolij\u00e4rjestelm\u00e4n \u2014 yhdess\u00e4 ne kattavat kouluvalmiuden kaksi perustavinta taitoa.',
    },
    {
      vsThemeId: 'shapes',
      summary: 'Muototy\u00f6lehdet keskittyv\u00e4t avaruudelliseen ajatteluun. Numeroty\u00f6lehdet keskittyv\u00e4t numeeriseen ajatteluun \u2014 molemmat ovat matematiikan keskeisi\u00e4 osa-alueita, jotka tukevat toisiaan.',
    },
    {
      vsThemeId: 'school',
      summary: 'Kouluty\u00f6lehdet kattavat laajasti kouluaineita ja -taitoja. Numeroty\u00f6lehdet syventyv\u00e4t yhteen aineeseen ja tarjoavat systemaattisen harjoituspolun lukujen ymm\u00e4rt\u00e4miseen.',
    },
    {
      vsThemeId: 'animals',
      summary: 'El\u00e4inty\u00f6lehdet k\u00e4ytt\u00e4v\u00e4t el\u00e4imi\u00e4 oppimiskontekstina. Numeroty\u00f6lehdet voivat k\u00e4ytt\u00e4\u00e4 el\u00e4imi\u00e4 laskukuvituksena, mutta niiden p\u00e4\u00e4fokus on matemaattisen ajattelun kehitt\u00e4misess\u00e4.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'numeroaiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'V\u00e4rit\u00e4 numeron mukaan -teht\u00e4v\u00e4t yhdist\u00e4v\u00e4t lukujen tunnistamisen ja hienomotoriikan, kun lapset v\u00e4ritt\u00e4v\u00e4t alueet oikean numeron osoittamalla v\u00e4rill\u00e4.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'esineiden laskuteht\u00e4v\u00e4t',
      context: 'Laskuteht\u00e4v\u00e4t kehitt\u00e4v\u00e4t numeerista sujuvuutta, kun lapset etsiv\u00e4t ja laskevat esineit\u00e4 monipuolisista kohtauskuvista yhdist\u00e4en visuaalisen etsinn\u00e4n ja aritmetiikan.',
    },
    {
      appId: 'math-worksheet',
      anchorText: 'matemaattiset laskuty\u00f6lehdet',
      context: 'Laskuty\u00f6lehdet tarjoavat systemaattista harjoitusta yhteen- ja v\u00e4hennyslaskussa, kertotauluissa ja lukujonoissa eri vaikeustasoilla.',
    },
    {
      appId: 'sudoku',
      anchorText: 'numerosudoku-pulmat',
      context: 'Sudoku-pulmat kehitt\u00e4v\u00e4t loogista p\u00e4\u00e4ttelyj\u00e4 ja numerotuntemusta, kun lapset sijoittavat lukuja ruudukkoon loogisten sj\u00e4\u00e4nt\u00f6jen mukaisesti.',
    },
  ],

  expertTips: [
    {
      tip: 'K\u00e4yt\u00e4 kymmenen kehyksij\u00e4 (ten frames) konkreettisena v\u00e4lineen\u00e4 jokaisen numeroteht\u00e4v\u00e4n rinnalla. Ne auttavat lasta ymm\u00e4rt\u00e4m\u00e4\u00e4n lukujen rakenteen ja viiden ja kymmenen suhteen intuitiivisesti.',
      source: 'Matematiikan didaktikko, lukuk\u00e4sitteen kehitys',
      gradeRange: 'Esiopetus\u20131. lk',
    },
    {
      tip: 'Yhdist\u00e4 numeroty\u00f6lehdet p\u00e4ivitt\u00e4isiin rutiineihin: laske oppilaiden m\u00e4\u00e4r\u00e4, kalenterin p\u00e4iv\u00e4numero ja lounasjonossa olevat. T\u00e4m\u00e4 tekee luvuista arjen ty\u00f6kaluja.',
      source: 'Luokanopettaja, arjen matematiikka',
      gradeRange: 'Esiopetus\u20132. lk',
    },
    {
      tip: 'Anna lasten keksi\u00e4 omia laskutarinoita ty\u00f6lehtien teemoista: Jos pihalla on viisi lintua ja kolme lent\u00e4\u00e4 pois, monta j\u00e4\u00e4. T\u00e4m\u00e4 kehitt\u00e4\u00e4 matemaattista ajattelua ja kielellist\u00e4 ilmaisua.',
      source: 'Alkuopetuksen asiantuntija, laskutarinat',
      gradeRange: '1.\u20133. lk',
    },
  ],`;

// ── 7. Alphabet (aakkoset) ───────────────────────────────────────────────

const alphabetFields = `
  // -- SEO Enrichment (Part 181) --

  classroomScenarios: [
    {
      situation: 'Esiopetusryhm\u00e4n opettaja huomaa, ett\u00e4 osa lapsista tunnistaa kirjaimet mutta ei yhdist\u00e4 niit\u00e4 \u00e4\u00e4nteisiin, mik\u00e4 hidastaa lukemaan oppimista.',
      solution: 'H\u00e4n k\u00e4ytt\u00e4\u00e4 aakkosaiheisia ty\u00f6lehti\u00e4, joissa jokainen kirjain yhdistet\u00e4\u00e4n sanaan ja kuvaan (\u00c4 = \u00e4iti, K = kissa). Kirjainten j\u00e4ljent\u00e4misteht\u00e4v\u00e4t yhdistyv\u00e4t \u00e4\u00e4nt\u00e4misharjoituksiin.',
      outcome: 'Kuukauden j\u00e4lkeen lapset tunnistavat kaikki aakkosten kirjaimet ja osaavat yhdist\u00e4\u00e4 ne vastaaviin \u00e4\u00e4nteisiin. Ensimm\u00e4iset tavut alkavat synty\u00e4 kirjain\u2013\u00e4\u00e4nne-yhteyden vahvistuttua.',
    },
    {
      situation: 'Kotikouluvanhempi haluaa opettaa viisivuotiaan kirjoittamaan nimens\u00e4, mutta lapsi turhautuu tarkkaan piirt\u00e4miseen.',
      solution: 'Vanhempi k\u00e4ytt\u00e4\u00e4 aakkosty\u00f6lehti\u00e4, joissa kirjainten j\u00e4ljent\u00e4minen etenee asteittain: ensin sormiharjoitus, sitten paksu kyn\u00e4, lopuksi normaali kyn\u00e4. V\u00e4ritysteht\u00e4v\u00e4t, joissa kirjain on osa kuvaa, tekev\u00e4t harjoittelusta hauskaa.',
      outcome: 'Lapsi kirjoittaa nimens\u00e4 itsen\u00e4isesti kahden viikon kuluttua. Hienomotoriikka kehittyy ja turhautuminen v\u00e4henee, koska teht\u00e4v\u00e4t etenevj\u00e4t pienin askelin.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '12 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201320 min' },
    { label: 'Kirjainten kirjo', value: '29 kirjainta (\u00c5, \u00c4, \u00d6)' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota kirjain\u2013kuva-yhdist\u00e4misteht\u00e4vi\u00e4 ja kirjainten visuaalista vertailua (b vs. d, p vs. q). V\u00e4rikoodatut vokaalit ja konsonantit auttavat hahmottamaan kirjainryhmi\u00e4.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Muotoile kirjaimia savesta, piirr\u00e4 niit\u00e4 hiekkaan tai kirjoita ilmaan suurin liikkein ennen paperiteht\u00e4v\u00e4\u00e4. Kirjainjahti luokkahuoneessa yhdist\u00e4\u00e4 liikkumisen ja kirjainten tunnistamisen.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Suomen kirjaimisto on l\u00e4hes identtinen monien kielten kanssa, mik\u00e4 helpottaa aloitusta. Erikoiskirjaimet \u00c5, \u00c4 ja \u00d6 vaativat erityishuomiota. Kirjain\u2013kuva-kortit, joissa kuva selitt\u00e4\u00e4 sanan ilman kj\u00e4\u00e4nn\u00f6st\u00e4, tukevat oppimista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta tavuttamisteht\u00e4vill\u00e4, sanojen muodostamisella kirjaimista ja ristikkoharjoituksilla. Kirjainten \u00e4\u00e4nne-arvon syvempi tutkiminen (pitk\u00e4 vs. lyhyt vokaali, kaksoiskonsonantti) tarjoaa kielellist\u00e4 haastetta.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolioarviointi',
      criteria: 'Ker\u00e4\u00e4 aakkosty\u00f6lehti\u00e4 usean kuukauden ajalta. Vertaa kirjainten tunnistamisen laajuutta, j\u00e4ljent\u00e4misen tarkkuutta ja \u00e4\u00e4nne\u2013kirjain-yhteyden hallintaa.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Kirjainten tunnistustesti',
      criteria: 'N\u00e4yt\u00e4 oppilaalle kirjaimia satunnaisessa j\u00e4rjestyksess\u00e4 ja pyyd\u00e4 nime\u00e4m\u00e4\u00e4n jokainen. Arvioi tunnistamisen nopeutta, tarkkuutta ja erityisesti suomen erikoiskirjainten (\u00c5, \u00c4, \u00d6) hallintaa.',
      gradeLevel: 'Esiopetus\u20131. lk',
    },
    {
      method: 'Sananelimisteht\u00e4v\u00e4',
      criteria: 'Pyyd\u00e4 oppilasta kuuntelemaan sanan alkj\u00e4\u00e4nne ja valitsemaan oikea kirjain. Laajenna: kirjoita sana kuulemasi perusteella. Arvioi \u00e4\u00e4nne\u2013kirjain-vastaavuutta ja kirjoittamisen sujuvuutta.',
      gradeLevel: '1.\u20132. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Aakkoseteema on \u00e4idinkielen opetuksen perusta: POPS 2014 korostaa kirjain\u2013\u00e4\u00e4nne-vastaavuutta, lukemaan oppimista ja kirjoittamisen alkeitta. Aakkosty\u00f6lehdet tukevat suoraan n\u00e4it\u00e4 tavoitteita.',
      activity: 'Kirjainten j\u00e4ljent\u00e4misteht\u00e4v\u00e4n j\u00e4lkeen oppilaat kirjoittavat omia sanoja, jotka alkavat opitulla kirjaimella, ja piirt\u00e4v\u00e4t niihin kuvat.',
    },
    {
      subject: 'Kuvataide',
      connection: 'Kirjainten muotoilu yhdist\u00e4\u00e4 hienomotoriikan ja visuaalisen ilmaisun. Kirjainten koristelu, kirjaintaide ja typografian alkeet kehitt\u00e4v\u00e4t sek\u00e4 kirjoitustaitoa ett\u00e4 taiteellista n\u00e4kem\u00e4yst\u00e4.',
      activity: 'Aakkos-sanahakuteht\u00e4v\u00e4n j\u00e4lkeen oppilaat suunnittelevat ja koristelevat oman nimens\u00e4 alkukirjaimen taideteokseksi.',
    },
    {
      subject: 'Musiikki',
      connection: 'Aakkoslaulut ja riimittelyleikit yhdist\u00e4v\u00e4t \u00e4\u00e4nteiden opettelun rytmiin ja melodiaan. Suomalainen aakkosjlaulu on tuttu aloituspiste, josta voidaan edetj\u00e4 \u00e4\u00e4nneharjoituksiin.',
      activity: 'Kirjainteht\u00e4v\u00e4n j\u00e4lkeen oppilaat keksiv\u00e4t riimin opitulle kirjaimelle ja esitt\u00e4v\u00e4t sen luokalle.',
    },
  ],

  uniqueAngle: 'Aakkosaiheiset ty\u00f6lehdet ovat lukutaidon perusta \u2014 ilman kirjainten tuntemusta lukeminen ja kirjoittaminen eiv\u00e4t ole mahdollisia. T\u00e4m\u00e4 tekee aakkosty\u00f6lehdist\u00e4 ehk\u00e4 koko kokoelman t\u00e4rkeimm\u00e4n teeman yhdess\u00e4 numeroiden kanssa, koska ne rakentavat kouluvalmiuden kaksi perustavinta taitoa. Suomen kieli on fonologisesti l\u00e4pin\u00e4kyv\u00e4: jokainen kirjain vastaa l\u00e4hes aina yht\u00e4 \u00e4\u00e4nnett\u00e4, mik\u00e4 tekee suomen aakkosista erityisen tehokkaan lukemaan opettamisen v\u00e4lineen. POPS 2014 korostaa kirjain\u2013\u00e4\u00e4nne-vastaavuutta lukutaidon perustana, ja suomalainen alkuopetus on tunnettu nopeasta lukemaan oppimisesta. Suomen 29 kirjainta sis\u00e4lt\u00e4v\u00e4t erikoiskirjaimet \u00c5, \u00c4 ja \u00d6, jotka ovat olennainen osa suomalaista identiteetti\u00e4 ja erottavat suomen aakkoset useimmista muista kielistj\u00e4. Aakkosty\u00f6lehdet yhdist\u00e4v\u00e4t hienomotoriikan kehittj\u00e4misen, visuaalisen tunnistamisen ja \u00e4\u00e4nnetietoisuuden yhdeksi kokonaisuudeksi, joka on suunniteltu tukemaan luonnollista lukemaan oppimisen prosessia.',

  researchCitation: 'Lerkkanen, M.-K. et al. (2004). Development of Reading Skills Among Preschool and Primary School Pupils. Reading Research Quarterly, 39(1), 72\u201393. Suomalainen tutkimus osoitti, ett\u00e4 kirjain\u2013\u00e4\u00e4nne-vastaavuuden varhainen hallinta ennustaa vahvasti lukutaidon kehittymist\u00e4 ja ett\u00e4 monipuoliset kirjainharjoitukset nopeuttavat lukemaan oppimista.',

  culturalNotes: 'Suomi on kansainv\u00e4lisesti tunnettu nopeasta ja tehokkaasta lukemaan oppimisesta, mik\u00e4 johtuu suurelta osin kielen fonologisesta l\u00e4pin\u00e4kyvyydest\u00e4. POPS 2014 korostaa kirjain\u2013\u00e4\u00e4nne-vastaavuutta ja lukemisen sujuvuutta. Suomen 29 kirjainta sis\u00e4lt\u00e4v\u00e4t \u00c5:n, \u00c4:n ja \u00d6:n, jotka ovat kulttuurisesti merkitt\u00e4vi\u00e4 ja erottavat suomen aakkoset kansainv\u00e4lisest\u00e4 standardista.',

  snippetDefinition: 'Aakkosaiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t kirjainten tunnistamista, j\u00e4ljent\u00e4mist\u00e4 ja \u00e4\u00e4nne\u2013kirjain-yhteyden harjoittelua lukutaidon perustan rakentamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t kirjainten kirjoitusharjoituksia, sanahakuja, yhdist\u00e4misteht\u00e4vi\u00e4 ja aakkospulmia.',

  snippetHowTo: [
    'Valitse viikon kirjain tai kirjainryhm\u00e4 ja kokoa siihen liittyv\u00e4t ty\u00f6lehdet yhten\u00e4iseksi kokonaisuudeksi.',
    'Valitse kaksi tai kolme ty\u00f6lehtityyppi\u00e4 eri taitoalueille \u2014 esimerkiksi j\u00e4ljent\u00e4misteht\u00e4v\u00e4 hienomotoriikkaan, sanahaku sanastoon ja yhdist\u00e4misteht\u00e4v\u00e4 \u00e4\u00e4nnetietoisuuteen.',
    'Aloita \u00e4\u00e4nneharjoituksella: kuunnelkaa yhdess\u00e4, mit\u00e4 \u00e4\u00e4nnett\u00e4 kirjain vastaa, ja etsik\u00e4\u00e4 luokasta esineit\u00e4, jotka alkavat sill\u00e4 \u00e4\u00e4nteell\u00e4.',
    'Jaa ty\u00f6lehdet vaikeustason mukaan: aloita kirjaimen tunnistamisesta ennen j\u00e4ljent\u00e4mist\u00e4, sanojen muodostamista ja kirjoittamista.',
    'Kierr\u00e4 lasten joukossa ja esit\u00e4 avoimia kysymyksi\u00e4 kuten Mik\u00e4 sana alkaa kirjaimella K tai Kuuletko t\u00e4m\u00e4n kirjaimen sanassa koira.',
    'Yhdist\u00e4 ty\u00f6lehti moniaistiseen harjoitukseen: kirjoita kirjain hiekkaan, muotoile savesta, piirr\u00e4 ilmaan ja lopuksi kirjoita paperille.',
    'Ker\u00e4\u00e4 valmiit ty\u00f6lehdet portfoliokansioon ja seuratkaa kirjainten tunnistamisen, j\u00e4ljent\u00e4misen ja \u00e4\u00e4nnetietoisuuden kehittymist\u00e4.',
  ],

  limitations: 'Aakkosty\u00f6lehdet voivat painottua mekaaniseen j\u00e4ljent\u00e4miseen, jolloin \u00e4\u00e4nne-ymm\u00e4rrys j\u00e4\u00e4 pinnalliseksi. Opettajien tulee aina yhdist\u00e4\u00e4 kirjoittaminen \u00e4\u00e4nt\u00e4miseen. Kirjainten muotoilu vaatii hienomotoriikkaa, joka kehittyy eri tahtiin eri lapsilla \u2014 turhautuminen on yleist\u00e4 ja se tulee kohdata k\u00e4rsiv\u00e4llisesti. Vasenkj\u00e4tisill\u00e4 lapsilla kirjoitusasento vaatii erityishuomiota.',

  themeComparisons: [
    {
      vsThemeId: 'numbers',
      summary: 'Numeroty\u00f6lehdet opettavat matematiikan symbolij\u00e4rjestelm\u00e4n. Aakkosty\u00f6lehdet opettavat kielen symbolij\u00e4rjestelm\u00e4n \u2014 yhdess\u00e4 ne muodostavat kouluvalmiuden perustan.',
    },
    {
      vsThemeId: 'school',
      summary: 'Kouluty\u00f6lehdet kattavat laajasti kouluaineita. Aakkosty\u00f6lehdet syventyv\u00e4t yhteen keskeiseen taitoon \u2014 lukutaidon perustaan \u2014 ja tarjoavat systemaattisen harjoituspolun.',
    },
    {
      vsThemeId: 'animals',
      summary: 'El\u00e4inty\u00f6lehdet k\u00e4ytt\u00e4v\u00e4t el\u00e4imi\u00e4 oppimiskontekstina. Aakkosty\u00f6lehdet k\u00e4ytt\u00e4v\u00e4t usein el\u00e4inkuvia kirjainten yhteydess\u00e4 (\u00c4 = \u00e4iti, K = kissa), yhdist\u00e4en molemmat teemat.',
    },
    {
      vsThemeId: 'colors',
      summary: 'V\u00e4rity\u00f6lehdet opettavat visuaalista luokittelua. Aakkosty\u00f6lehdet opettavat kielellist\u00e4 luokittelua \u2014 molemmat rakentavat perustavanlaatuisia kognitiivisia taitoja.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'aakkosaiheiset v\u00e4ritysteht\u00e4v\u00e4t',
      context: 'Aakkosaiheiset v\u00e4ritysteht\u00e4v\u00e4t yhdist\u00e4v\u00e4t kirjainten tunnistamisen ja hienomotoriikan, kun lapset v\u00e4ritt\u00e4v\u00e4t kirjainkuvia ja kirjaimiin liittyvi\u00e4 esineit\u00e4.',
    },
    {
      appId: 'word-search',
      anchorText: 'aakkossanaston sanahaku-ty\u00f6lehdet',
      context: 'Sanahakuteht\u00e4v\u00e4t vahvistavat kirjainten tunnistamista sanojen kontekstissa, kun lapset etsiv\u00e4t kirjaimilla alkavia sanoja sanaruudukosta.',
    },
    {
      appId: 'alphabet-train',
      anchorText: 'aakkosjuna-ty\u00f6lehdet',
      context: 'Aakkosjunateht\u00e4v\u00e4t opettavat aakkosj\u00e4rjestyst\u00e4 leikkis\u00e4ll\u00e4 tavalla, kun lapset j\u00e4rjest\u00e4v\u00e4t kirjaimia junan vaunuihin oikeaan j\u00e4rjestykseen.',
    },
    {
      appId: 'writing-app',
      anchorText: 'kirjainten kirjoitusharjoitukset',
      context: 'Kirjoitusharjoitukset kehitt\u00e4v\u00e4t hienomotoriikkaa ja kirjainten muotoilua, kun lapset j\u00e4ljent\u00e4v\u00e4t kirjaimia oikeassa viivaj\u00e4rjestyksess\u00e4.',
    },
  ],

  expertTips: [
    {
      tip: 'Opeta kirjaimet ryhmiss\u00e4 \u00e4\u00e4nneominaisuuksien mukaan (vokaalit ensin, sitten yleisimm\u00e4t konsonantit) eikj\u00e4 aakkosj\u00e4rjestyksess\u00e4. T\u00e4m\u00e4 mahdollistaa sanojen muodostamisen jo varhain ja pit\u00e4\u00e4 motivaation yll\u00e4.',
      source: 'Lukemisen erityisopettaja, fonologinen tietoisuus',
      gradeRange: 'Esiopetus\u20131. lk',
    },
    {
      tip: 'Yhdist\u00e4 jokainen kirjainty\u00f6lehti moniaistiseen harjoitukseen: n\u00e4e kirjain (kortti), kuule \u00e4\u00e4nne (opettaja), tunne muoto (hiekka tai savi), sano \u00e4\u00e4nne (itse). Nelj\u00e4n aistin yht\u00e4aikainen aktivointi vahvistaa muistij\u00e4lke\u00e4.',
      source: 'Neuropsykologi, moniaistinen oppiminen',
      gradeRange: 'Esiopetus\u20131. lk',
    },
    {
      tip: 'K\u00e4yt\u00e4 aakkosty\u00f6lehti\u00e4 er\u00e4\u00e4nlaaisena diagnostisena v\u00e4lineen\u00e4: tarkkaile, mitk\u00e4 kirjaimet tuottavat vaikeuksia (b/d, p/q -sekaannukset) ja kohdista harjoittelu niihin. Varhainen tunnistaminen ehk\u00e4isee lukivaikeuksia.',
      source: 'Erityisopettaja, lukivaikeuksien ehk\u00e4isy',
      gradeRange: 'Esiopetus\u20132. lk',
    },
  ],`;

// ── Injection Logic ──────────────────────────────────────────────────────

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
  { id: 'seasons', fields: seasonsFields },
  { id: 'holidays', fields: holidaysFields },
  { id: 'weather', fields: weatherFields },
  { id: 'colors', fields: colorsFields },
  { id: 'shapes', fields: shapesFields },
  { id: 'numbers', fields: numbersFields },
  { id: 'alphabet', fields: alphabetFields },
];

console.log('Part 181: Enriching 7 FI theme hub pages with 14 fields each...\n');
themes.forEach((t, i) => {
  console.log(`${i + 1}. Injecting fields into ${t.id}/fi.ts...`);
  injectFields(path.join(base, t.id, 'fi.ts'), t.fields);
});
console.log('\nDone! All 7 FI theme hub files enriched.');
