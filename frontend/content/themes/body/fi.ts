import { registerThemeContent } from '../registry';
import type { EnrichedThemeContent } from '../types';

const content: EnrichedThemeContent = {
  // -- SEO fields --
  name: 'Keho',
  title: 'Keho ja Kehon Osat \u2014 Teht\u00e4v\u00e4t Lapsille | LessonCraftStudio',
  description: 'Tutustu kehoaiheisiin teht\u00e4viin lapsille: kehon osat, aistit, terveys ja anatomia. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle. Tulostettavia.',
  keywords: 'kehonosat tehtävät lapsille, ihmiskeho oppimateriaali, kehonosien tunnistaminen harjoitus, terveyskasvatus työlehdet, kehon toiminnot tehtävä, aistit oppiminen lapset, anatomia esikoulu, kehontuntemus harjoitus, motoriikka ja keho, kehon osat teht\u00e4v\u00e4t lapsille, ihmiskeho ty\u00f6lehdet',
  heading: 'Kehon Osat ja Aistit \u2014 Teht\u00e4vi\u00e4 Lapsille',

  // -- Rich narrative content --
  intro: 'Ihmiskeho on henkil\u00f6kohtaisin ja yleismaailmallisesti kiehtovimn aihe, jota pieni lapsi voi tutkia, koska jokainen oppihetki alkaa oppijasta itsest\u00e4\u00e4n. Kun lapsi koskettaa nen\u00e4\u00e4ns\u00e4, heiluttaa sormiaan tai kuuntelee omaa syd\u00e4menly\u00f6nti\u00e4\u00e4n, h\u00e4n tekee tieteellist\u00e4 koetta maailman saatavimmalla laboratoriolla. Kehoaiheiset ty\u00f6lehdet muuttavat t\u00e4m\u00e4n luonnollisen uteliaisuuden j\u00e4sennellyksi oppimiseksi ohjaten lapsia anatomian sanaston, viiden aistin tieteen ja kehon osien laskemisen matematiikan l\u00e4pi. Tulostettavat kehoaiheisett ty\u00f6lehtemme sis\u00e4lt\u00e4v\u00e4t yst\u00e4v\u00e4llisi\u00e4, ik\u00e4tasoisia kuvia p\u00e4ist\u00e4, k\u00e4sist\u00e4, jaloista, silmist\u00e4, korvista ja kokovartalopiirustuksista, jotka kutsuvat v\u00e4ritt\u00e4m\u00e4\u00e4n, nime\u00e4m\u00e4\u00e4n ja j\u00e4ljent\u00e4m\u00e4\u00e4n. Matematiikkateht\u00e4v\u00e4t k\u00e4ytt\u00e4v\u00e4t sormia ja varpaita luonnollisina laskureina tehden yhteen- ja v\u00e4hennyslaskusta intuitiivista, koska lapset voivat tarkistaa vastaukset omista k\u00e4sist\u00e4\u00e4n. Lukutaidon ty\u00f6lehdet tutustuttavat sanastoon kuten luuranko, lihas, kyyn\u00e4rp\u00e4\u00e4 ja ranne \u2013 sanoja, jotka antavat lapsille omistajuuden fyysiseen kokemukseensa ja kielen kuvata sit\u00e4 l\u00e4\u00e4k\u00e4reille, opettajille ja yst\u00e4ville. Pulmat ja havainnointiteht\u00e4v\u00e4t pyyt\u00e4v\u00e4t lapsia l\u00f6yt\u00e4m\u00e4\u00e4n puuttuvat kehon osat kuvasta, yhdist\u00e4m\u00e4\u00e4n elimet niiden teht\u00e4viin tai tunnistamaan, mit\u00e4 aistia k\u00e4ytet\u00e4\u00e4n erilaisissa tilanteissa. Kehoteema avaa my\u00f6s rikkaita keskusteluja terveydest\u00e4 ja hygieniasta, koska omien kehon osien ymm\u00e4rt\u00e4minen motivoi lapsia huolehtimaan niist\u00e4. Hampaiden pesu on t\u00e4rke\u00e4mp\u00e4\u00e4, kun tiet\u00e4\u00e4, mit\u00e4 hampaat tekev\u00e4t. K\u00e4sienpesu on j\u00e4rkev\u00e4\u00e4, kun ymm\u00e4rt\u00e4\u00e4, miten taudinaiheuttajat leviävt kosketuksen kautta. Opettajille keho tarjoaa luontevan integraation luonnontieteen, matematiikan, \u00e4idinkielen ja tunne- ja vuorovaikutustaitojen oppimiselle, koska kehokeskustelut johtavat luontevasti keskusteluihin erilaisuudesta, kyvyist\u00e4 ja kunnioituksesta. Suomalaisessa esiopetuksessa ja perusopetuksessa terveyskasvatuksella on vahva rooli, ja kehoaiheiset ty\u00f6lehdet tukevat Perusopetuksen opetussuunnitelman perusteiden (POPS) tavoitteita. Vanhemmat huomaavat kehoaiheisten ty\u00f6lehtien olevan erityisen tehokkaita, koska oppimista voi tapahtua kaikkialla \u2013 kehon osien nime\u00e4misest\u00e4 kylpyhetkell\u00e4 varpaiden laskemiseen nukkumaanmenon yhteydess\u00e4. Jokainen ty\u00f6lehti on peili, joka auttaa lapsia ymm\u00e4rt\u00e4m\u00e4\u00e4n itse\u00e4\u00e4n paremmin samalla kun rakennetaan koulussa tarvittavia akateemisia taitoja.',

  educationalOverview: 'Kehoaiheiset ty\u00f6lehdet tarjoavat poikkeuksellisen pedagogisen arvon, koska ne yhdist\u00e4v\u00e4t abstrakteja akateemisia k\u00e4sitteit\u00e4 konkreettisimpaan viitekehykseen, joka lapsella on: omaan fyysiseen it\u00e4\u00e4n. Anatominen lukutaito on terveysasvatuksen peruskomponentti, ja kehoaiheiset ty\u00f6lehdet tuovat sen luontevasti esiin nime\u00e4mis-, yhdist\u00e4mis- ja sanastoteht\u00e4vien kautta, jotka tekev\u00e4t tieteellisest\u00e4 terminologiasta saavutettavaa nuorille oppijoille. Kun oppilaat laskevat sormia k\u00e4dest\u00e4, vertaavat k\u00e4sivarsien ja jalkojen pituuksia tai tunnistavat vasemman ja oikean puolen, he harjoittelevat matemaattista p\u00e4\u00e4ttely\u00e4 k\u00e4ytt\u00e4en mittausv\u00e4linett\u00e4, jota kantavat aina mukanaan. Kehokonteksti tukee ainutlaatuisella tavalla kinesteettist\u00e4 oppimista, koska lapset voivat koskettaa, liikuttaa ja havainnoida juuri niit\u00e4 aiheita, joita he tutkivat paperilla. Aistien tutkimisharjoitukset rakentavat tieteellist\u00e4 ajattelua pyyt\u00e4m\u00e4ll\u00e4 lapsia luokittelemaan kokemuksia k\u00e4ytetyn aistin mukaan, luoden pohjaa my\u00f6hemmille oppitunneille havainnoinnista, tiedonkeruusta ja luokittelusta. Hienomotoriset taidot kehittyv\u00e4t yksityiskohtaisten kehopiirrosten j\u00e4ljent\u00e4misess\u00e4, anatomisten kuvien v\u00e4ritt\u00e4misess\u00e4 ja tarkkaa kyn\u00e4nhallintaa vaativien teht\u00e4vien t\u00e4ytt\u00e4misess\u00e4. Sanaston omaksuminen kiihtyy, koska kehosanasto on v\u00e4litt\u00f6m\u00e4sti todennettavissa \u2013 lapsi, joka oppii sanan kyyn\u00e4rp\u00e4\u00e4, voi osoittaa sit\u00e4 heti, luoden vahvemman muistiankkurin kuin abstrakti sanasto. Kehoteema tukee luonnollisesti tunne- ja vuorovaikutustaitojen oppimista, kun lapset keskustelevat kehojen samanlaisuuksista ja erilaisuuksista rakentaen empatiaa, kunnioitusta ja positiivista minäkuvaa. Perusopetuksen opetussuunnitelman perusteiden (POPS) mukaisessa opetuksessa kehoaiheiset ty\u00f6lehdet kytkeytyyv\u00e4t suoraan ymp\u00e4rist\u00f6opin eliöiden rakennetta ja toimintaa koskeviin tavoitteisiin, matematiikan laskemisen ja mittaamisen tavoitteisiin sek\u00e4 terveyskasvatuksen henkil\u00f6kohtaista hyvinvointia ja hygieniaa koskeviin tavoitteisiin.',

  parentGuide: 'Kehoaiheiset ty\u00f6lehdet yhdistyv\u00e4t lapsesi p\u00e4ivitt\u00e4iseen kokemukseen l\u00e4heisemmin kuin mik\u00e4\u00e4n muu teema, koska aihe on kirjaimellisesti aina l\u00e4sn\u00e4. Kehon osien nime\u00e4misteht\u00e4v\u00e4n j\u00e4lkeen pelatkaa Simo sanoo -peli\u00e4, jossa k\u00e4ytet\u00e4\u00e4n samaa sanastoa: kosketa kyyn\u00e4rp\u00e4\u00e4t\u00e4si, hypi vasemmalla jalalla, peit\u00e4 korvasi. Kylpyhetkell\u00e4 pyyd\u00e4 lastasi nime\u00e4m\u00e4\u00e4n jokainen kehon osa sit\u00e4 pestiess\u00e4, vahvistaen paperilla harjoiteltuja sanoja. Tehk\u00e4\u00e4 t\u00e4ysikokoinen kehopiirros: lapsesi makaa suurella paperilla, kun piirr\u00e4t h\u00e4nen ääriviivansa, ja sitten nime\u00e4tte yhdess\u00e4 opitut kehon osat. K\u00e4ytt\u00e4k\u00e4\u00e4 ateriahetkiä kehotyölehtien yhdist\u00e4miseen terveyskeskusteluihin selitt\u00e4en, ett\u00e4 sy\u00f6tyje ruoka antaa energiaa v\u00e4ritetille lihaksille ja luille. Nuorempien lasten kohdalla pid\u00e4 ty\u00f6lehtihetket noin kymmenessa\u00e4 minuutissa ja yhdist\u00e4 ne aina fyysiseen toimintaan, jossa k\u00e4ytet\u00e4\u00e4n samoja kehon osia. Kun lapsesi k\u00e4y l\u00e4\u00e4k\u00e4riss\u00e4 tai hammasl\u00e4\u00e4k\u00e4riss\u00e4, muistuta h\u00e4nt\u00e4 ty\u00f6lehtien kehosanastosta antaen h\u00e4nelle itseluottamusta viesti\u00e4 omasta terveydest\u00e4\u00e4n. Yhdess\u00e4 ruoanlaitto tarjoaa luonnollisia kehoyhteyksi\u00e4, kun lapset k\u00e4ytt\u00e4v\u00e4t k\u00e4si\u00e4\u00e4n sekoittamiseen, nen\u00e4\u00e4ns\u00e4 haistamiseen ja kielt\u00e4\u00e4n maistamiseen, vahvistaen viitt\u00e4 aistia todellisessa kontekstissa, joka tekee ty\u00f6lehtien oppimisesta merkityksellist\u00e4 ja el\u00e4v\u00e4\u00e4.',

  // -- Curated apps (IDENTICAL to English) --
  curatedAppIds: [
    'coloring', 'draw-and-color', 'find-and-count', 'matching-app', 'missing-pieces',
    'image-addition',
    'word-search', 'writing-app', 'word-scramble',
    'odd-one-out', 'drawing-lines',
  ],
  appCategories: [
    { category: 'math', appIds: ['image-addition'] },
    { category: 'literacy', appIds: ['word-search', 'writing-app', 'word-scramble'] },
    { category: 'visual', appIds: ['coloring', 'draw-and-color', 'find-and-count', 'matching-app', 'missing-pieces'] },
    { category: 'puzzles', appIds: ['odd-one-out', 'drawing-lines'] },
  ],

  // -- Educational sections --
  teachingTips: [
    { title: 'Luo luokan kehokartta', description: 'Kiinnit\u00e4 suuri kehon ääriviiva luokan sein\u00e4lle ja lis\u00e4\u00e4 nimettyyj\u00e4 tarralappuja viikon aikana sit\u00e4 mukaa, kun oppilaat kohtaavat uutta kehosanastoa ty\u00f6lehdiss\u00e4\u00e4n. Jakson lopussa kartasta on tullut yhteinen hakuteos. Anna oppilaiden vuorotellen olla osoittajana kertaushetkiss\u00e4 koskettaen jokaista nimilappua ja sanoen sanan \u00e4\u00e4neen sanaston ja avaruudellisen hahmotuksen vahvistamiseksi.', audience: 'teacher' },
    { title: 'Viiden aistin kiertoasemat', description: 'Pyst\u00e4 luokkaan viisi asemaa, joista jokainen on omistettu yhdelle aistille. Aisteja k\u00e4sittelev\u00e4n ty\u00f6lehden j\u00e4lkeen oppilaat kiert\u00e4v\u00e4t asemilta toiselle haistaen mausteita, kosketellen erilaisia pintoja, kuunnellen \u00e4\u00e4ni\u00e4, maistaen turvallisia n\u00e4ytteit\u00e4 ja tarkastellen optisia harhoja. Jokaisella asemalla he kirjaavat havaintonsa minity\u00f6lehdelle yhdist\u00e4en abstraktin aistik\u00e4sitteen el\u00e4v\u00e4\u00e4n henkil\u00f6kohtaiseen kokemukseen.', audience: 'teacher' },
    { title: 'Kehon osien jumppahetki', description: 'Kun lapsesi on t\u00e4ytt\u00e4nyt kehon osia k\u00e4sittelev\u00e4n ty\u00f6lehden, luokaa yhdess\u00e4 yksinkertainen jumppahetki, jossa k\u00e4ytet\u00e4\u00e4n jokaista nimetty\u00e4 kehon osaa. Jos ty\u00f6lehti k\u00e4sitteli k\u00e4sivarsia, jalkoja ja p\u00e4\u00e4t\u00e4, suunnnitelkaa kolme harjoitusta, jotka liikuttavat kutakin. T\u00e4m\u00e4 fyysinen jatkoharjoitus vahvistaa sanastoa lihasmuistin kautta ja antaa lapsille aivoille tauon, joka silti liittyy oppimiseen.', audience: 'parent' },
    { title: 'Yhdist\u00e4 kehosanasto p\u00e4ivitt\u00e4isiin terveysrutiineihin', description: 'Aina kun lapsesi pesee hampaita, pesee k\u00e4si\u00e4\u00e4n tai laittaa aurinkovoidetta, viittaa ty\u00f6lehtien kehon osien sanastoon. Kysy kysymyksi\u00e4 kuten mit\u00e4 kehon osaa suojaat juuri nyt tai miksi on t\u00e4rke\u00e4\u00e4 pit\u00e4\u00e4 ihosta huolta. N\u00e4m\u00e4 pienet keskustelut rakentavat terveystietoisuutta akateemisen sanaston rinnalla vahvistaen molempia ilman lis\u00e4opiskeluaikaa.', audience: 'both' },
  ],
  activities: [
    {
      title: 'T\u00e4ysikokoinen kehon nime\u00e4misprojekti',
      description: 'Jokainen lapsi makaa suurelle kartonkipaperille kaverin piirt\u00e4ess\u00e4 h\u00e4nen ääriviivansa. Lapset nime\u00e4v\u00e4t mahdollisimman monta kehon osaa ty\u00f6lehtien sanastoa hy\u00f6dynt\u00e4en. He v\u00e4ritt\u00e4v\u00e4t ääriviivan, lis\u00e4\u00e4v\u00e4t kasvojen piirteet ja piirt\u00e4v\u00e4t vaatteet. Esitelk\u00e4\u00e4 t\u00e4ysikokoiset kehot luokan sein\u00e4lle. Teht\u00e4v\u00e4\u00e4 voi laajentaa laskemalla kehon osia, jotka esiintyv\u00e4t pareittain verrattuna yksitt\u00e4isiin, yhdist\u00e4en anatomian matemaattisiin k\u00e4sitteisiin.',
      materials: ['suuria kartonkipapereita', 'tusseja tai v\u00e4rikyn\u00e4i\u00e4', 'kehon osien sanakortit', 'teippi'],
      duration: '25\u201330 minuuttia',
      skillAreas: ['cognitive', 'motor'],
    },
    {
      title: 'Aistien lajitteluhaaste',
      description: 'Tulosta kuvakortteija, joissa n\u00e4kyy erilaisia kokemuksia kuten musiikin kuuntelu, kukan haistaminen, omenan maistaminen, kissan silitt\u00e4minen ja auringonlaskun katsominen. Lapset lajittelevat kortit viiteen ryhm\u00e4\u00e4n sen mukaan, mik\u00e4 aisti on p\u00e4\u00e4asiallisesti k\u00e4yt\u00f6ss\u00e4. Lajittelun j\u00e4lkeen he t\u00e4ytt\u00e4v\u00e4t tukkimiehen kirjanpidon laskien, kuinka monta korttia p\u00e4\u00e4tyi kuhunkin aistikategoriaan yhdist\u00e4en tieteen luokittelun matemaattisiin datataitoihin.',
      materials: ['aistikokemusten kuvakortit', 'viisi nimettyyj\u00e4 lajittelumattoa', 'tukkimiehen kirjanpito -ty\u00f6lehti', 'kyn\u00e4t'],
      duration: '15\u201320 minuuttia',
      skillAreas: ['cognitive', 'math'],
    },
    {
      title: 'Vasen ja oikea -esterata',
      description: 'Luo yksinkertainen sis\u00e4esterata suuntakylteill\u00e4, joissa lukee k\u00e4\u00e4nny vasemmalle, nosta oikea k\u00e4si, hypi vasemmalla jalalla ja kosketa oikeaa korvaa. Lapset kiertev\u00e4t radan suuntaohjeita noudattaen. Radan j\u00e4lkeen he t\u00e4ytt\u00e4v\u00e4t ty\u00f6lehden merkkien, mit\u00e4 k\u00e4tt\u00e4 tai jalkaa he k\u00e4yttiv\u00e4t kullakin asemalla vahvistaen vasen-oikea -hahmotusta fyysisen liikkeen ja kirjallisen dokumentoinnin kautta.',
      materials: ['tulostetut suuntakyltit', 'kartiot tai merkkirenaat', 'kirjaamisty\u00f6lehti', 'kyn\u00e4t'],
      duration: '20\u201325 minuuttia',
      skillAreas: ['motor', 'cognitive'],
    },
  ],
  curriculumAlignment: [
    {
      standard: 'POPS.YL.1-2.T4',
      framework: 'POPS 2014',
      description: 'Tunnistaa kehon osat ja ymmärtää niiden toiminta',
      relatedAppIds: ['find-and-count', 'matching-app'],
    },
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Laskea ja luokitella kehon osia matemaattisesti',
      relatedAppIds: ['image-addition'],
    },
    {
      standard: 'POPS.AI.1-2.T2',
      framework: 'POPS 2014',
      description: 'Oppia kehon osiin liittyvää sanastoa',
      relatedAppIds: ['word-search', 'image-crossword'],
    },
  ],

  // -- Grade-specific content --
  gradeContent: {
    'preschool': {
      seoTitle: 'Kehotehtävät Esikouluun — Nimeä ja Väritä | LCS',
      seoDescription: 'Tulostettavia kehotehtäviä esikouluun (3–4v). Nimeä kehonosia, väritä hahmoja, yhdistä varjoja ja lajittele kokoja. Ilmaisia työlehtiä.',
      seoKeywords: 'kehotehtävät esikoululaisille, hienomotoriikka harjoitus, väritys ja jäljentäminen, koon tunnistaminen, yksinkertainen laskeminen, kehonosien tunnistaminen, terveyskasvatus, anatomia, kehotehtävät esikoulu, kehon oppiminen 3-4v',
      intro: 'Kolme- ja nelj\u00e4vuotiaat esikoululaiset ovat loputtoman kiinnostuneita omasta kehostaan, l\u00f6yt\u00e4en jatkuvasti, mit\u00e4 heid\u00e4n k\u00e4tens\u00e4 osaavat, kuinka korkealle he voivat hyp\u00e4t\u00e4 ja mit\u00e4 tapahtuu, kun he sulkevat silm\u00e4ns\u00e4. T\u00e4m\u00e4 luonnollinen itsetietoisuus tekee kehoaiheisista ty\u00f6lehdist\u00e4 ihanteellisen v\u00e4lineen j\u00e4sennellyn oppimisen aloittamiseen esikoulussa. T\u00e4ss\u00e4 kehitysvaiheessa lapset harjoittelevat perussanastoa, kehitt\u00e4v\u00e4t pinsettiotetta ja alkavat ymm\u00e4rt\u00e4\u00e4 yksi yhteen -vastaavuutta laskemisessa. Esikoululaisille suunnitellut kehoaiheiset ty\u00f6lehdet sis\u00e4lt\u00e4v\u00e4t suuria, yst\u00e4v\u00e4llisi\u00e4 kuvia kasvoista, k\u00e4sist\u00e4, jaloista ja kokovartalohahmioista, jotka kutsuvat v\u00e4ritt\u00e4m\u00e4\u00e4n, j\u00e4ljent\u00e4m\u00e4\u00e4n ja osoittamaan. Tyypillinen teht\u00e4v\u00e4 voi pyyt\u00e4\u00e4 lasta laskemaan k\u00e4den sormet ja ympyr\u00f6im\u00e4\u00e4n vastaavan numeron k\u00e4ytt\u00e4en omaa k\u00e4tt\u00e4\u00e4n sis\u00e4\u00e4nrakennettuna vastausavaimena. Sanojen silm\u00e4, korva tai nen\u00e4 j\u00e4ljent\u00e4minen kehitt\u00e4\u00e4 kirjainten muodostamista samalla kun yhdist\u00e4\u00e4 kirjoitetun sanan kehon osaan, jota lapsi voi v\u00e4litt\u00f6m\u00e4sti koskettaa. Yhdist\u00e4misteht\u00e4v\u00e4t, jotka parittavat kehon osia niiden teht\u00e4viin kuten korvat kuulemiseen tai silm\u00e4t n\u00e4kemiseen, rakentavat varhaista loogista ajattelua ja tutustuttavat viiden aistin k\u00e4sitteeseen. Kehooppimisen moniaistisuus tarkoittaa, ett\u00e4 jokainen ty\u00f6lehti voi johtaa fyysiseen toimintaan: heiluta varpaitasi laskemisen j\u00e4lkeen, taputa k\u00e4si\u00e4si j\u00e4ljent\u00e4misen j\u00e4lkeen, r\u00e4pyt\u00e4 silmi\u00e4si v\u00e4ritt\u00e4misen j\u00e4lkeen. Opettajien ja vanhempien kannattaa pit\u00e4\u00e4 tuokiot lyhyin\u00e4, noin kahdeksasta kahteentoista minuuttiin, ja yhdist\u00e4\u00e4 aina paperiteht\u00e4v\u00e4t liikkeeseen kunnioittaen esikoululaisten tarvetta kinesteettiseen osallistumiseen.',
      objectives: [
        { skill: 'Tunnista ja nime\u00e4 v\u00e4hint\u00e4\u00e4n 10 t\u00e4rke\u00e4\u00e4 kehon osaa', area: 'cognitive' },
        { skill: 'Laske sormet ja varpaat 10:een yksi yhteen -vastaavuudella', area: 'math' },
        { skill: 'J\u00e4ljenn\u00e4 kehosanastosanoja oikealla kirjainten muodostuksella', area: 'literacy' },
      ],
      developmentalNotes: 'Kolme\u2013nelj\u00e4vuotiaat lapset hioovat pinsettiotetta, jota tarvitaan v\u00e4rikynien ja kynien pitelemiseen. K\u00e4sien ja jalkojen paksuilla ääriviivoilla varustetut kehoaiheisett j\u00e4ljent\u00e4misteht\u00e4v\u00e4t tukevat t\u00e4t\u00e4 motorista kehityst\u00e4. Kognitiivisesti esikoululaiset rakentavat kehonkaavaa, sis\u00e4ist\u00e4 karttaa omasta kehostaan, ja nime\u00e4misteht\u00e4v\u00e4t vahvistavat suoraan t\u00e4t\u00e4 tietoisuutta tukien sek\u00e4 fyysist\u00e4 koordinaatiota ett\u00e4 avaruudellista hahmotusta.',
      teachingTips: [
        'Anna lasten katsoa peiliin kasvojen nime\u00e4misteht\u00e4v\u00e4n aikana, jotta he voivat osoittaa jokaisen piirteen itsest\u00e4\u00e4n ennen kuin merkkaavat sen paperille \u2013 n\u00e4in ylitet\u00e4\u00e4n kuilu itsetietoisuuden ja symbolisen esityksen v\u00e4lill\u00e4.',
        'K\u00e4yt\u00e4 kehoaiheisia ty\u00f6lehti\u00e4 siirtymätehtävinä ennen fyysist\u00e4 leikkiä pyyt\u00e4en lapsia v\u00e4ritt\u00e4m\u00e4\u00e4n ne kehon osat, joita he aikovat k\u00e4ytt\u00e4\u00e4 ulkoleikkien aikana.',
      ],
      faq: [
        { question: 'Sopivatko kehoaiheiset ty\u00f6lehdet kolmevuotiaille?', answer: 'Kyll\u00e4, kun niiss\u00e4 on suuria kuvia, yksinkertaisia yhden vaiheen teht\u00e4vi\u00e4 ja tuttuja kehon osia kuten k\u00e4det, jalat, silm\u00e4t ja suu. Esikoululaisten kehoaiheiset ty\u00f6lehdet keskittyv\u00e4t v\u00e4ritt\u00e4miseen, j\u00e4ljent\u00e4miseen ja osoittamiseen lukemisen tai monimutkaisen nime\u00e4misen sijaan, tehden niist\u00e4 saavutettavia my\u00f6s nuorimmille oppijoille.' },
        { question: 'Miten kehoaiheiset ty\u00f6lehdet tukevat esikoululaisten fyysist\u00e4 kehityst\u00e4?', answer: 'Ne kehitt\u00e4v\u00e4t hienomotorisia taitoja kehon ääriviivojen j\u00e4ljent\u00e4misen ja viivojen sis\u00e4ll\u00e4 v\u00e4ritt\u00e4misen kautta. Viel\u00e4 t\u00e4rke\u00e4mp\u00e4\u00e4 on, ett\u00e4 ne rakentavat kehotietoisuutta ja kehonkaavaa, sis\u00e4ist\u00e4 tunnetta siit\u00e4, miss\u00e4 kehon osat ovat ja mit\u00e4 ne tekev\u00e4t, mik\u00e4 tukee koordinaatiota, tasapainoa ja fyysist\u00e4 itseluottamusta.' },
        { question: 'Voivatko kehoaiheiset ty\u00f6lehdet opettaa esikoululaisille terveydest\u00e4 ja hygieniasta?', answer: 'Ehdottomasti. Ty\u00f6lehdet, joissa n\u00e4ytet\u00e4\u00e4n k\u00e4sienpesun vaiheet, hampaiden harjausrutiini tai terveet ruokavalinnat, tutustuttavat hygieniakäsitteisiin visuaalisten sarjojen kautta. Kun lapset osaavat nimetä asianosaiset kehon osat, he ymm\u00e4rt\u00e4v\u00e4t, miksi n\u00e4m\u00e4 rutiinit ovat t\u00e4rkeit\u00e4 \u2013 terveyskasvatuksesta tulee henkil\u00f6kohtaista ja merkityksellist\u00e4.' },
      ],

      snippetAnswer: 'Kehoaiheiset työlehdet esikoululaisille (3–4-vuotiaat) opettavat tunnistamaan ja nimeämään kehon osia, laskemaan sormia ja varpaita sekä kehittämään kehonkuvan hahmottamista ihmishahmojen värittämisen kautta. Oma keho on lapselle tutuimman tuttu oppimiskonteksti.',
      uniqueGradeAngle: 'Keho on esikoululaiselle kaikkein henkilökohtaisin teema, koska se käsittelee juuri sitä, mitä kolme- ja neljävuotiaat tutkivat aktiivisimmin — omaa itseään. Tässä iässä kehonkuvan kehitys on voimakasta: lapset oppivat erottamaan vasemman oikeasta, hahmottamaan kehon symmetriaa ja ymmärtämään, että keho koostuu nimeättävistä osista. VASU:n itsestä huolehtimisen ja terveyden tavoitteet toteutuvat suoraan: lapsi oppii tuntemaan kehonsa ja arvostamaan sitä. Matemaattisesti keho tarjoaa luonnollisen kontekstin laskemiselle (viisi sormea, kymmenen varvasta, kaksi silmää, yksi nenä), symmetriaharjoituksille (vasen käsi, oikea käsi) ja mittaamiselle (kuinka pitkä käteni on). Kehoteema integroituu luontevasti liikuntaan, terveyskasvatukseen ja tunnekasvatukseen. Kehon osien värittäminen kehittää samaan aikaan hienomotoriikkaa ja kehonkuvan hahmottamista, mikä on ainutlaatuinen kaksoishyöty.',
      developmentalMilestones: [
        { milestone: 'Kehon osien nimeäminen (3–4-vuotiaat oppivat systemaattisesti kehon anatomian perussanaston)', howWeAddress: 'Kuvayhdistämistehtävät, joissa nimeätään pää, kädet, jalat, silmät ja korvet, rakentavat kehosanastoa visuaalisesti' },
        { milestone: 'Sormien ja varpaiden laskeminen (luonnollinen konteksti laskemiselle viidestä kymmeneen)', howWeAddress: 'Sormi- ja varvaslaskutehtävät tarjoavat aina saatavilla olevan laskuvälineen, jota lapsi voi verrata omaan kehoonsa' },
        { milestone: 'Kehon symmetrian alustava ymmärtäminen (esikoululaiset huomaavat, että keho on peilikuva)', howWeAddress: 'Tehtävät, joissa kehon toinen puoli väritetään saman kuvion mukaan, esittelevät symmetrian henk ilökohtaisimmassa kontekstissa' },
        { milestone: 'Itsetunnon ja kehopositiivisuuden vahvistuminen (esikoululaiset kehittävät myönteistä suhdetta omaan kehoonsa)', howWeAddress: 'Oman kehon piirustus- ja väritystehtävät vahvistavat positiivista kehonkuvaa ja itsetuntemusta' },
      ],
      differentiationNotes: 'Tukea tarvitseville esikoululaisille aloita suurimmista kehon osista (pää, kädet, jalat), käytä peiliä ohjausvälineenä ja yksinkertaista laskeminen sormiin (viisi). Edistyneille esikoululaisille lisää sisäelimiä (sydän, keuhkot, aivot), pyydä mittaamaan kehon osia langalla ja vertailemaan mittoja sekä kannusta piirtämään yksityiskohtainen omakuva.',
      parentTakeaway: 'Kehoteema on vanhemmille helpoin oppimisväline, koska se on aina mukana. Laskekaa yhdessä sormia ja varpaita, nimetkAä kehon osia pukeutumisen yhteydessä ja harjoitelkaa oikea–vasen-erottelua arkisissa tilanteissa. Kylpyhetki on luonteva tilanne kehon osien nimeämiseen. Tärkeintä on tukea positiivista kehonkuvaa: jokainen keho on ihmeellinen ja arvokas riippumatta koosta tai muodosta.',
      classroomIntegration: 'Kehoteema yhdistyy esikoulun terveyskasvatus- ja liikuntahetkiin: aamupiirissä tehdään kehoharjoituksia (koske päätäsi, osoita polveasi), oppimispisteissä väritetään kehokuvia ja lasketaan kehon osia, liikuntahetkessä liikutaan eri kehon osilla. Taidetehtävänä piirretään oma kuva luonnollisessa koossa lattialle levitetylle paperille. Tämä kokonaisvaltainen lähestymistapa yhdistää terveyskasvatuksen, matematiikan ja liikunnan VASU:n hengessä.',
      assessmentRubric: [
        { skill: 'Kehon osien laskeminen', emerging: 'laskee sormia kolmeen asti aikuisen avulla', proficient: 'laskee sormia viiteen ja varpaita kymmeneen itsenäisesti', advanced: 'laskee sormia ja varpaita sujuvasti, vertailee määriä ja tunnistaa numerot' },
        { skill: 'Kehon osien nimeäminen', emerging: 'nimeää kolme kehon osaa (pää, käsi, jalka) aikuisen avulla', proficient: 'nimeää itsenäisesti kahdeksan kehon osaa ja osoittaa ne omasta kehostaankin', advanced: 'nimeää kymmenen tai useampi kehon osa ja selittää niiden tehtävän yksinkertaisesti' },
        { skill: 'Hienomotorinen hallinta', emerging: 'värittää ihmishahmoja laajoilla liikkeillä rajojen yli', proficient: 'pysyy kehon osien ääriviivojen sisällä ja erottelee osat väreillä', advanced: 'värittää tarkasti yksityiskohtia ja piirtää oman kehon eri osia' },
      ],
    },
    'kindergarten': {
      seoTitle: 'Kehotehtävät Esiopetukseen — Lue ja Piirrä | LCS',
      seoDescription: 'Tulostettavia kehotehtäviä esiopetukseen (5–6v). Opettele kehonosanastoa, piirrä kehon osia ja ratkaise pulmia. Ilmaisia työlehtiä.',
      seoKeywords: 'kehotehtävät esiopetukseen, alkuäänteet harjoitus, kirjaintunnistus oppiminen, lukuvalmius tukeminen, yhteenlasku kymmeneen, kehonosien tunnistaminen, terveyskasvatus, anatomia, kehotehtävät esiopetus, kehon oppiminen 5-6v',
      intro: 'Esiopetusik\u00e4iset tuovat laajentuvan sanaston ja kasvavan itsen\u00e4isyyden kehoaiheisiin ty\u00f6lehtiin, valmiina siirtym\u00e4\u00e4n perustunnistamisen ohi syvempään tutkimiseen siit\u00e4, miten heid\u00e4n kehonsa toimii ja miksi jokainen osa on t\u00e4rke\u00e4. Viisi- ja kuusivuotiaat osaavat laskea luotettavasti kahteenkymmeneen, kirjoittaa useita kirjaimia muistista ja noudattaa kaksivaiheisia ohjeita, mik\u00e4 mahdollistaa kehoaiheisten tyylehtien monimutkaisempien teht\u00e4vien k\u00e4ytt\u00f6\u00f6noton. Matematiikkateht\u00e4v\u00e4t k\u00e4ytt\u00e4v\u00e4t kehon osia luonnollisina k\u00e4sitelt\u00e4vin\u00e4: kymmenen sormen ja kymmenen varpaan laskeminen yhteenlaskuharjoituksena kahteenkymmeneen, k\u00e4sien jalkien vertailu mittaamisk\u00e4sitteiden esittelyksi tai kehon osien lajittelu pareittain ja yksitt\u00e4in esiintyviin. Sanahakuteht\u00e4v\u00e4t kehosanastolla kuten olkap\u00e4\u00e4, vatsa ja luuranko rakentavat n\u00e4k\u00f6sanatunnistusta ja kirjainten skannauksen sujuvuutta. V\u00e4rityskuvat tarkentuvat n\u00e4ytt\u00e4en luuston rakenteita tai elinten sijaintia haastaen hienomotorista tarkkuutta samalla kun her\u00e4tt\u00e4v\u00e4t uteliaisuutta siit\u00e4, mit\u00e4 kehon sis\u00e4ll\u00e4 on. Esiopetus on my\u00f6s ihanteellinen vaihe viiden aistin tutkimisen syvent\u00e4miselle ty\u00f6lehdill\u00e4, jotka pyyt\u00e4v\u00e4t lapsia ennustamaan, mit\u00e4 aistia he k\u00e4ytt\u00e4isiv\u00e4t eri tilanteissa, ja perustelemaan p\u00e4\u00e4t\u00f6ksi\u00e4\u00e4n. Kehoteema yll\u00e4pit\u00e4\u00e4 kiinnostusta viikkojen ajan, koska aina on uusi j\u00e4rjestelm\u00e4 tutkittavana: luut yhdell\u00e4 viikolla, lihakset seuraavalla, sitten aistit ja lopuksi terveys ja hygienia. Jokainen kierros tuo uutta sanastoa samalla kun vahvistaa samoja ydinmatikka- ja lukutaitoja tyydytt\u00e4en esiopetuksen tarpeen sek\u00e4 uutuudelle ett\u00e4 johdonmukaisuudelle.',
      objectives: [
        { skill: 'Laske kehoon liittyvi\u00e4 joukkoja 20:een asti ja vertaile m\u00e4\u00e4ri\u00e4 k\u00e4ytt\u00e4en enemm\u00e4n, v\u00e4hemm\u00e4n ja yht\u00e4 paljon', area: 'math' },
        { skill: 'Lue ja kirjoita kehon osien sanoja mukaan lukien olkap\u00e4\u00e4, kyyn\u00e4rp\u00e4\u00e4, ranne ja nilkka', area: 'literacy' },
        { skill: 'Luokittele aistikokemuks oikean aistin mukaan ja perustele p\u00e4\u00e4t\u00f6kset', area: 'cognitive' },
      ],
      developmentalNotes: 'Esiopetusikäiset kehittävät työmuistia, jota tarvitaan useiden kehon osien nimien mielessä pitämiseen yhdistämis- tai nimeämistehtävien aikana. Heidän kasvava sanastonsa mahdollistaa samankaltaisten termien kuten käsi ja käsivarsi tai jalka ja sääri erottamisen. Kehotietoisuus tässä iässä tukee suoraan kirjoittamisen kehittymistä, sillä lapset, jotka ymmärtävät ranteensa ja sormiensa liikkeet, pystyvät paremmin hallitsemaan kynän painetta ja kirjainten muodostamista.',
      teachingTips: [
        'Kehon nimeämistehtävän jälkeen pyydä lapsia työskentelemään pareittain piirtäen toistensa ääriviivat suurelle paperille ja vertaamaan, mitkä kehon osat ovat pidempiä tai lyhyempiä, yhdistäen mittaustaidot anatomian sanastoon.',
        'Käytä kehon sanahakutehtäviä lämmittelytehtävinä terveysjakson aikana esitellen uutta sanastoa joka viikko ja kerraten aiempia sanoja kumulatiivisen tiedon rakentamiseksi.',
      ],
      faq: [
        { question: 'Mitä matemaattisia käsitteitä esiopetuksen kehoaiheiset työlehdet kattavat?', answer: 'Ne keskittyvät kehon osien laskemiseen kahteenkymmeneen, yhteenlaskuun sormien ja varpaiden avulla, käsivarsien ja jalkojen mittojen vertailuun ja kehon osien lajitteluun kategorioihin. Nämä tehtävät tukevat Perusopetuksen opetussuunnitelman perusteiden (POPS) esiopetuksen matematiikkatavoitteita laskemisessa, operaatioissa ja mittaamisessa.' },
        { question: 'Miten kehoaiheiset työlehdet opettavat esiopetusikäisille viidestä aistista?', answer: 'Lajittelu- ja yhdistämistehtävät pyytävät lapsia yhdistämään kokemuksia oikeaan aistielimeen. Työlehti voi näyttää kuvan kellosta ja kysyä, mikä kehon osa auttaa sinua kuulemaan sen, rakentaen loogista yhteyttä aistielinten ja niiden toimintojen välillä toistuvan ja kiinnostavan harjoittelun kautta.' },
        { question: 'Voivatko kehoaiheiset työlehdet tukea esiopetuksen terveyskasvatusta?', answer: 'Kyllä. Ne vahvistavat hygieniarutiineja nimeämällä käsienpesuun, hampaiden harjaamiseen ja peseytymiseen liittyvät kehon osat. Kun lapset ymmärtävät oman kehonsa sanaston, terveyskasvatuksesta tulee konkreettisempaa ja henkilökohtaisesti merkityksellisempää, mikä parantaa sekä tiedon säilymistä että käyttäytymisen noudattamista.' },
      ],

      snippetAnswer: 'Kehoaiheiset työlehdet esiopetukseen (5–6-vuotiaat) opettavat kehon toimintoja ja terveyttä, kehittävät mittaamista ja laskemista kehonjIäsenten avulla sekä vahvistavat itsestä huolehtimisen taitoja. Esiopetussuunnitelman terveyskasvatuksen ja itsetuntemuksen tavoitteet toteutuvat.',
      uniqueGradeAngle: 'Esiopetusikäisille kehoteema saa tieteellisen syvyyden, koska viisi- ja kuusivuotiaat kykenevät ensimmäistä kertaa ymmärtämään, että kehon sisällä tapahtuu asioita: sydän lyIö, keuhkot hengittävät, vatsa sulattaa ruokaa. Tämä näkymättömien prosessien ymmärtämisen alku on merkittävä kognitiivinen askel, jota kehoteema tukee konkreettisesti. Matemaattisesti keho tarjoaa lähimmän mittauskohteen: sormien ja varpaiden lukumäärä, pituus senttimetreinä, syömisten määrä. Kielitietoisuus kehittyy kehonosasanaston kautta, joka on perussanastoa: olka-pää, kyy-när-pää, nil-kka. Esiopetussuunnitelman itsestä huolehtimisen osaamisalue saa syvyyta, kun lapset ymmärtävät, miksi uni, liikunta ja ravinto ovat tärkeitä. Kehon yksityisyyden opettaminen on esiopetusiIässä kriittisen tärkeää ja integroituu luontevasti kehoteemaan.',
      developmentalMilestones: [
        { milestone: 'Sisäisten elinten perusymmärrys (5–6-vuotiaat oppivat, että kehon sisällä on elimIä)', howWeAddress: 'Kehon poikkileikkaustehtävät, joissa lapsi nimeää ja sijoittaa sydämen, keuhkot ja vatsan, rakentavat peruskäsitystä anatomiasta' },
        { milestone: 'Terveyslukutaidon alku (esiopetusikäiset ymmärtävät terveyskäyttäytymisen merkityksen)', howWeAddress: 'Terveystottummustehtävät, joissa lapsi yhdistää toiminnon (syö vihanneksia, liiku, nuku) sen hyötyyn, kehittävät terveyslukutaitoa' },
        { milestone: 'Kehon mittaaminen ja vertailu (viisi- ja kuusivuotiaat oppivat käyttämään mittanauhaa)', howWeAddress: 'Mittaustehtävät, joissa mitataan käsivarren pituus, jalan pituus ja pIään ympärys, yhdistävät mittaamisen ja itsekäsityksen' },
        { milestone: 'Kehonosasanaston kirjoittaminen (esiopetusikäiset harjoittelevat yhdyssanoja)', howWeAddress: 'Tavutus- ja kirjoitustehtävät kehonosasanoilla (olka-pää, pol-vi, sor-mi) kehittävät yhdyssanojen hahmottamista' },
      ],
      differentiationNotes: 'Tukea tarvitseville esiopetusikäisille rajaa kehonosat kymmeneen pääosaan, käytä lapsen omaa kehoa mallina (osoita ja nimeä) ja yksinkertaista mittaustehtävät yhteen mittauskohteeseen. Edistyneille esiopetusikäisille lisää sisäiset elimet, pyydä kirjoittamaan oma terveyssuunnitelma ja haasta vertailemaan oman kehon mittoja luokkakavereiden kanssa tilastollisesti.',
      parentTakeaway: 'Kehoteema on esiopetusikäiselle tärkeä itsetuntemuksen rakennusväline. Mittatkaa yhdessä lapsen pituus, käden pituus ja jalanjälki ja verratkaa muiden perheenjIäsenten mittoihin. Keskustelkaa terveyden perusasioista: miksi unta tarvitaan, miksi vihannekset ovat hyväksi, miksi liikunta on tärkeää. Tärkeintä on luoda positiivinen suhde omaan kehoon ja opettaa kehon yksityisyyttä luontevasti arjen tilanteissa.',
      classroomIntegration: 'Kehoteema integroituu esiopetuksen terveyskasvatukseen luontevasti: aamupiirissä keskustellaan päivän terveysteemasta, työlehtihetkellä nimetIään kehonosia ja harjoitellaan mittaamista, liikuntahetkellä tutkitaan kehon liikkumista ja iltapäivän rauhoittumishetkellä harjoitellaan hengitystä. Esiopetussuunnitelman itsestä huolehtimisen, terveyden ja turvallisuuden tavoitteet toteutuvat kokonaisvaltaisesti kehoteeman kautta.',
      assessmentRubric: [
        { skill: 'Kehonosien nimeäminen', emerging: 'nimeää viisi pääosaa (pää, käsi, jalka, vatsa, selkä) aikuisen osoittaessa', proficient: 'nimeää itsenäisesti kymmenen kehonosaa mukaan lukien nivel- ja yksityiskohtaisempia osia', advanced: 'nimeää yli viisitoista kehonosaa, tietää sisäisiä elimIä ja selittää niiden tehtävät' },
        { skill: 'Kehon mittaaminen', emerging: 'ymmärtää pituuden käsitteen mutta ei käytä mittanauhaa', proficient: 'mittaa käsivarren ja jalan pituuden mittanauhalla ja kirjoittaa tuloksen', advanced: 'mittaa useita kehonosia, vertailee tuloksia ja muodostaa vertailutaulukon' },
        { skill: 'Terveyskäyttäytymisen ymmärtäminen', emerging: 'tunnistaa yhden terveellisen tavan aikuisen kerrottua', proficient: 'nimeää itsenäisesti kolme terveellistä tottumusta ja niiden hyödyt', advanced: 'suunnittelee terveellisen päivän ja perustelee jokaisen valinnan' },
      ],
    },
    'first-grade': {
      seoTitle: 'Kehotehtävät 1. Luokalle — Aistit ja Sanat | LCS',
      seoDescription: 'Tulostettavia kehotehtäviä 1. luokalle (6–7v). Opettele aisteista, täytä kehoristikkoja ja kirjoita kehonosista. Ilmaisia työlehtiä.',
      seoKeywords: 'kehotehtävät 1. luokalle, yhteenlasku vähennyslasku, näkösanat tunnistaminen, luetun ymmärtäminen, oikeinkirjoitus harjoitus, kehonosien tunnistaminen, terveyskasvatus, anatomia, kehotehtävät 1. luokka, kehon oppiminen 6-7v',
      intro: 'Ensimmäisen luokan oppilaat ovat valmiita kehoaiheisiin työlehtiiin, jotka haastavat heitä monivaiheisilla ongelmilla, pidemmillä sanastotehtävillä ja monimutkaisemmilla tieteellisillä yhteyksillä ihmisen anatomiaan. Kuusi- ja seitsemänvuotiaat osaavat laskea yhteen ja vähentää kahdenkymmenen sisällä kasvavalla sujuvuudella, lukea yksinkertaisia lauseita itsenäisesti ja soveltaa loogista päättelyä uusiin tilanteisiin. Kehoaiheisissa matematiikkatehtävissä esitetään sanallisia tehtäviä kuten Marialla on kymmenen sormea ja hän pitää sormuksia kolmessa niistä, kuinka monessa sormessa ei ole sormusta, ankkuroiden aritmetiikan skenaarioon, jonka lapset voivat välittömästi visualisoida ja todentaa. Lukutehtävät voivat sisältää lyhyitä tekstejä siitä, miten luut suojaavat elimiä tai miten lihakset toimivat pareina, ymmärtämiskysymysten vaatiessa muistamista, päättelyä ja järjestämistä. Sanahakutehtävät ja kirjainpulmat pidemmällä kehosanastolla kuten luuranko, ruoansulatus ja jänne haastavat oikeinkirjoitustaitoja ja tutustuttavat tieteelliseen termistöön. Ensimmäinen luokka on myös aikaa, jolloin lapset kehittävät vahvempia perspektiivinottokykyä, mikä tekee tästä ihanteellisen ajankohdan työlehteille, jotka tutkivat erilaisten kehojen erilaisia kykyjä rakentaen empatiaa ja kunnioitusta moninaisuutta kohtaan. Kuviotunnistustehtävät liikesarjojen avulla, kuten taputa-tömistä-taputa-tömistä, kehittävät algebrallista ajattelua pitäen oppimisen fyysisenä ja hauskana. Henkilökohtaisen merkityksellisyyden ja akateemisen vaativuuden yhdistelmä tekee kehoaiheisista työlehteistä monipuolisen ensimmäisen luokan resurssin, joka innostaa lapsia, jotka saattaisivat muuten kokea abstraktit harjoitukset tylsinä, koska jokainen tehtävä liittyy kaikkein mielenkiintoisimpaan aiheeseen: heihin itseensä.',
      objectives: [
        { skill: 'Ratkaise yhteen- ja vähennyslaskun sanallisia tehtäviä 20:n sisällä kehoaiheisissa konteksteissa', area: 'math' },
        { skill: 'Lue lyhyitä tietotekstejä kehon järjestelmistä ja vastaa ymmärtämiskysymyksiin', area: 'literacy' },
        { skill: 'Aseta monivaiheisia prosesseja järjestykseen, kuten miten ruoka kulkee kehon läpi', area: 'cognitive' },
      ],
      developmentalNotes: 'Ensimmäisen luokan oppilaat ovat kehittäneet riittävän pitkäjänteisyyden työskennelläkseen kokonaisen työlehden sivun läpi itsenäisesti, ylläpitäen keskittymistä yleensä viidestätoista kahteenkymmeneen minuuttiin. Heidän kasvava tieteellinen uteliaisuutensa tarkoittaa, että he esittävät syvempiä kysymyksiä siitä, miten keho toimii, ja työlehdet, jotka tutustuttavat perusanatomiaan ja kehon järjestelmiin, tyydyttävät tätä uteliaisuutta samalla kun rakentavat pohjaa myöhemmälle luonnontieteen opetukselle.',
      teachingTips: [
        'Anna kehon tutkimuksen miniprojekteja, joissa kukin oppilas valitsee yhden kehon järjestelmän ja tekee sarjan työlehtiä, joissa tutkitaan sen osia, tehtäviä ja terveydenhoitoa.',
        'Käytä kehosanastopulmia esiopetusharjoituksina ennen tietotekstien käsittelyä terveydestä, liikunnasta tai ravitsemuksesta lukuohjelmassasi.',
      ],
      faq: [
        { question: 'Millä lukutasolla ensimmäisen luokan kehoaiheiset työlehdet ovat?', answer: 'Ne käyttävät yksinkertaisia lauseita yleisillä näkösanoilla ja purettavissa olevalla kehosanastolla. Lukutekstit ovat tyypillisesti kolmesta viiteen lauseeseen pitkiä ja kuvaavat, miten kehon osat toimivat tai miksi terveystottumukset ovat tärkeitä, ymmärtämiskysymysten pyytäessä lapsia muistamaan faktoja tai tekemään yksinkertaisia päätelmiä.' },
        { question: 'Miten kehoaiheiset työlehdet tukevat ensimmäisen luokan luonnontieteen tavoitteita?', answer: 'Ne tukevat ympäristöopin tavoitteita rakenteesta ja toiminnasta pyytämällä lapsia tunnistamaan kehon osia ja niiden rooleja. Aisteja käsittelevät työlehdet kytkeytyvät havainnoinnin ja todisteiden keräämisen tavoitteisiin, ja terveyteen keskittyvät tehtävät tukevat henkilökohtaista hyvinvointia ja tautien ehkäisyä koskevia tavoitteita.' },
        { question: 'Ovatko ensimmäisen luokan kehoaiheiset työlehdet akateemisesti riittävän vaativia?', answer: 'Kyllä. Ne sisältävät monivaiheisia sanallisia tehtäviä kehoskenaarioilla, sanastopulmia jopa kymmenen kirjaimen sanoilla, päättelyä vaativaa luetun ymmärtämistä ja tieteellisiä järjestämistehtäviä. Kehoteema ylläpitää sitoutumista samalla kun akateeminen sisältö täyttää ensimmäisen luokan odotukset matematiikassa, lukutaidossa ja luonnontieteissä.' },
      ],
    },
    'second-grade': {
      seoTitle: 'Kehotehtävät 2. Luokalle — Elimistö ja Terveys | LCS',
      seoDescription: 'Tulostettavia kehotehtäviä 2. luokalle (7–8v). Tutki elimistön toimintaa, analysoi ravintoa ja kirjoita terveyskuvauksia. Ilmaisia työlehtiä.',
      seoKeywords: 'kehotehtävät 2. luokalle, kertotaulu harjoittelu, data-analyysi oppiminen, tietoteksti lukeminen, paikka-arvo ymmärtäminen, kehonosien tunnistaminen, terveyskasvatus, anatomia, kehotehtävät 2. luokka, kehon oppiminen 7-8v',
      intro: 'Toisen luokan oppilaat tuovat aidon tieteellisen uteliaisuuden, itsenäisen lukusujuvuuden ja moninumeroisten laskutoimitusten taidot kehoaiheisiin työlehteiin, mahdollistaen tehtäviä, jotka yhdistävät ihmisen anatomian terveysdatan seurantaan, tietotekstien lukemiseen kehon järjestelmistä ja järjestettyyn tieteelliseen kirjoittamiseen. Seitsemän- ja kahdeksanvuotiaat osaavat laskea yhteen ja vähentää sadan sisällä, mitata vakioyksiköillä ja lukea monikappaleisia tietotekstejä itsenäisesti, mikä tekee heistä valmiita kehoaiheisiin tehtäviin, jotka ylittävät osien nimeämisen ja siirtyvät järjestelmien yhteistoiminnan ymmärtämiseen. Matematiikkatehtävissä käytetään terveys- ja kehodataa aitoon laskentaan: jos leposyke on seitsemänkymmentäkaksi lyöntiä minuutissa ja liikunnan jälkeen se nousee sataakahdeksaan, kuinka paljon se nousi, tai jos tarvitset kahdeksan lasillista vettä päivässä ja olet juonut viisi, kuinka monta vielä tarvitset. Mittaustehtävissä kirjataan oikeita kehon mittoja kuten pituus, käsivarren jänneväli ja käden pituus senttimetreinä, järjestetään data taulukoihin ja verrataan mittoja luokkatovereiden kesken. Lukutekstit tutkivat, miten luusto tarjoaa tukirankaa, miten ruoansulatusjärjestelmä hajottaa ruoan energiaksi tai miten hengityselimistö kuljettaa happea lihaksille, ymmärtämiskysymysten vaatiessa pääajatusten tunnistamista, prosessien jäljittämistä useiden vaiheiden läpi ja johtopäätösten tekemistä tieteellisestä tiedosta. Kirjoitustehtävät haastavat oppilaita kirjoittamaan tietokappaleita kehon järjestelmästä, mielipidekirjoituksia siitä, miksi tietty terveystapa on tärkeä tukevine todisteineen, tai kuvauksia siitä, miten keho suorittaa toimintoja kuten ruoansulatus tai hengitys. Tieteellinen sanasto laajenee merkittävästi sisältäen termejä kuten nikama, happi, ravintoaineet, verenkierto ja jänne rakentaen ainekohtaista kieltä, joka tukee luonnontieteen lukutaitoa.',
      objectives: [
        { skill: 'Ratkaise kaksivaiheisia sanallisia tehtäviä 100:n sisällä kehon mittoja, terveysdataa ja anatomisia määriä käyttäen', area: 'math' },
        { skill: 'Lue monikappaleisia tietotekstejä kehon järjestelmistä ja jäljitä prosesseja alusta loppuun', area: 'literacy' },
        { skill: 'Kirjoita järjesteltyjä tieto- ja mielipidekappaleita terveysaiheista tieteellistä sanastoa ja tukevaa todistusaineistoa käyttäen', area: 'cognitive' },
      ],
      developmentalNotes: 'Toisen luokan oppilaat ovat kehittäneet tieteellisen ajattelun ymmärtääkseen, että kehon järjestelmillä on syötteet, prosessit ja tuotokset, kuten ruoka ruoansulatusjärjestelmään ja energia tuloksena. Heidän mittaustaitonsa mahdollistavat oikean kehodatan keräämisen ja järjestämisen, ja heidän kirjoitustaitonsa tukevat monilauseisia selityksiä biologisista prosesseista. Kasvava kiinnostus siihen, miten asiat toimivat sisällä, tekee kehon järjestelmien tutkimisesta aidosti jännittävää tässä iässä.',
      teachingTips: [
        'Pyydä oppilaita mittaamaan oma pituutensa, käsivarren jännevälinsä ja kätensä pituuden senttimetreinä, kirjaamaan data luokkataulukkoon ja laskemaan erotuksia sekä vastaamaan vertailukysymyksiin yhdistäen kehoteema suoraan mittaamisen ja datan standardeihin.',
        'Anna kehon järjestelmän tutkimusprojekti, jossa oppilaat lukevat yhdestä järjestelmästä, luovat nimetyn kaavion ja kirjoittavat tietokappaleen selittäen, mitä järjestelmä tekee ja miksi se on tärkeä kokonaisterveydelle.',
      ],
      faq: [
        { question: 'Miten toisen luokan kehoaiheiset työlehdet kytkeytyvät luonnontieteen tavoitteisiin?', answer: 'Ne käsittelevät ympäristöopin tavoitteita tutkimalla kehon järjestelmiä ja niiden toimintoja, mukaan lukien miten luusto tarjoaa tuen, miten lihakset mahdollistavat liikkeen ja miten ruoansulatusjärjestelmä prosessoi ruokaa. Oppilaat jäljittävät biologisia prosesseja useiden vaiheiden läpi ja käyttävät tieteellistä sanastoa kuten ravintoaineet, happi ja verenkierto kontekstissa rakentaen luonnontieteen lukutaitoa.' },
        { question: 'Mitä mittaus- ja datataitoja toisen luokan kehoaiheiset työlehdet kehittävät?', answer: 'Oppilaat mittaavat kehon mittoja viivoittimilla ja mittanauhoilla vakioyksiköissä, kirjaavat dataa järjestettyihin taulukoihin, vertaavat mittoja useiden kohteiden välillä ja laskevat arvojen eroja. Tämä aito tiedonkeruu ja analyysi vastaa suoraan toisen luokan mittaamisen ja datan tavoitteisiin tehden tilastoista henkilökohtaisesti merkityksellisiä.' },
        { question: 'Miten kehoaiheiset työlehdet tukevat toisen luokan tietokirjoittamista?', answer: 'Oppilaat laativat jäsenneltyjä kappaleita kehon järjestelmistä aihevirkkeillä, tieteellisillä tosiasioilla tukevina yksityiskohtina ja päätösvirkkeillä. He kirjoittavat mielipidekirjoituksia terveystottumuksista lukemisestaan saatujen todisteiden tukemana. Tämä tieteellisen sisällön ja järjestetyn kappalekirjoittamisen yhdistelmä rakentaa sekä ainesisältöosaamista että kirjoitustaitoja.' },
      ],
    },
    'third-grade': {
      seoTitle: 'Kehotehtävät 3. Luokalle — Tutkimus ja Anatomia | LCS',
      seoDescription: 'Tulostettavia kehotehtäviä 3. luokalle (8–9v). Kirjoita tutkimuksia elimistöstä, analysoi ruuansulatusta ja ratkaise pulmia. Ilmaisia työlehtiä.',
      seoKeywords: 'kehotehtävät 3. luokalle, kertolasku jakolasku, tutkimusraportti kirjoittaminen, mielipidekirjoitus harjoitus, kriittinen ajattelu, kehonosien tunnistaminen, terveyskasvatus, anatomia, kehotehtävät 3. luokka, kehon oppiminen 8-9v',
      intro: 'Kolmannen luokan oppilaat tuovat kertolaskun sujuvuuden, data-analyysitaidot ja monilähteisen tutkimuskirjoittamisen kyvyn kehoaiheisiin työlehteiin, jotka kanavoivat heidän luonnollisen uteliaisuutensa ihmiskehon toiminnasta aidoksi tieteelliseksi tutkimukseksi vaativan matemaattisen päättelyn tukemana. Kahdeksan- ja yhdeksänvuotiaat osaavat kertoa ja jakaa sadan sisällä, luoda ja tulkita kaavioita ja laatia järjesteltyjä monikappleisia tutkimusraportteja todistusaineistoa useista teksteistä käyttäen, mikä tekee heistä ihanteellisia ehdokkaita työlehteille, jotka lähestyvät ihmisbiologiaa samalla kvantitatiivisella tarkkuudella ja analyyttisellä syvyydellä, jota oikeat terveystieteilijät käyttävät. Kertolasku ohjaa terveysdatan analyysia ongelmilla kuten jos sydämesi lyö seitsemänkymmentäkaksi kertaa minuutissa, kuinka monta kertaa se lyö viidessä minuutissa, työntäen oppilaita soveltamaan kertolaskua kiehtoviin biologisiin lukuihin, jotka tuntuvat henkilökohtaisesti merkityksellisiltä, koska ne kuvaavat heidän omaa kehoaan. Jakolasku mallintaa terveysmittareiden laskentaa, kuten päivittäisen vedensaannin keskiarvon selvittämistä jakamalla viikkosumma seitsemällä tai kuukausittaisen kasvun keskiarvoa jakamalla vuotuinen pituudenlisäys kahdellatoista. Tiedonkeruu tulee keskeiseksi, kun oppilaat mittaavat omia lepo- ja aktiivisykkeitään, seuraavat liikuntaminuutteja viikon ajan ja kirjaavat ruokavalintojaan jäsenneltyihin lokeihin käyttäen kertolaskua raakamittausten muuntamiseen merkityksellisiksi nopeuksiksi ja summiksi. Lukutekstit laajenevat käsittelemään kehon järjestelmiä, liikuntatieiettä ja ravitsemustiedettä vaatien oppilaita ymmärtämään, miten toisiinsa kytkeytyvät järjestelmät toimivat yhdessä, jäljittämään käyttäytymisen ja terveystulosten syy-seuraussuhteita ja yhdistämään tietoa useista lähteistä yhtenäisiksi tieteellisiksi selityksiksi. Tutkimusraportit haastavat oppilaita valitsemaan yhden kehon järjestelmän, keräämään todistusaineistoa useista teksteistä ja datanäytöistä ja järjestämään löydöksensä jäsennellyiksi monikappaleisiksi raporteiksi. Murtolukukäsitteet nousevat esiin kehon mittasuhteiden analyysin, ravintoaineprosenttilaskelmien ja sen kautta, kuinka suuren osan päivästä oppilaat käyttävät eri toimintoihin kuten nukkumiseen, opiskeluun ja leikkimiseen.',
      objectives: [
        { skill: 'Käytä kertolaskua ja data-analyysia terveysmittareiden ja kehon mittausmallien tutkimiseen', area: 'math' },
        { skill: 'Kirjoita tutkimusraportteja ihmiskehon järjestelmistä todistusaineistoa useista tietolähteistä käyttäen', area: 'literacy' },
        { skill: 'Analysoi ravitsemuksen, liikunnan ja terveyden välisiä yhteyksiä yhdistämällä dataa useista lähteistä', area: 'cognitive' },
      ],
      developmentalNotes: 'Kehoteema hyödyntää kolmannen luokan oppilaiden luonnollista uteliaisuutta omasta kehostaan tarjoten sisäistä motivaatiota sekä tieteelliselle lukemiselle että matemaattiselle data-analyysille. Heidän kasvava kykynsä ymmärtää toisiinsa kytkeytyneitä järjestelmiä mahdollistaa mielekkään tutkimisen siitä, miten elimet, lihakset ja luut toimivat yhdessä.',
      teachingTips: [
        'Luo syketutkimus, jossa oppilaat mittaavat lepo- ja aktiivisykkeet, käyttävät kertolaskua lyöntien laskemiseen viiden minuutin ja tunnin aikana, laativat datasta pylväskaavioita ja kirjoittavat analyyttisen raportin, jossa verrataan tuloksia ja selitetään liikunnan tehon ja syketiheyden välistä suhdetta.',
        'Suunnittele kehon järjestelmien tutkimusprojekti, jossa oppilaat valitsevat yhden järjestelmän tutkittavaksi useista lähteistä, järjestävät löydökset elimistä, tehtävistä ja yhteyksistä muihin järjestelmiin datataulukkoon ja kirjoittavat kolmikapaleisen raportin johdannolla, yksityiskohtaisella todisteisiin perustuvalla kappaleella ja johtopäätöksellä.',
      ],
      faq: [
        { question: 'Miten kolmannen luokan kehoaiheiset työlehdet kehittävät data-analyysitaitoja terveysmittareiden avulla?', answer: 'Oppilaat keräävät oikeaa dataa mittaamalla sykkeitä, seuraamalla liikuntaa ja kirjaamalla ruokavalintoja. He käyttävät kertolaskua mittausten muuntamiseen nopeuksiksi, luovat pylväskaavioita ja viivakuvioita datastaan, laskevat keskiarvoja jakolaskulla ja kirjoittavat analyyttisiä kappaleita tulkiten omasta terveystiedostaan löytyviä malleja.' },
        { question: 'Mitä tutkimuskirjoitustaitoja kehoaiheiset työlehdet rakentavat kolmannen luokan tasolla?', answer: 'Oppilaat valitsevat kehon järjestelmän, keräävät tietoa useista teksteistä ja kaavioista, järjestävät löydöksensä jäsennellyiksi tutkimusraporteiksi selkeine johdantoineen, todisteisiin perustuvine kappeleineen ja johtopäätöksineen. He oppivat viittaamaan tiettyihin lähteisiin, käyttämään tieteellistä sanastoa tarkasti ja yhdistämään yksittäisiä faktoja yhtenäisiksi selityksiksi järjestelmien toiminnasta.' },
        { question: 'Miten kehoaiheiset työlehdet yhdistävät luonnontieteen matemaattiseen päättelyyn?', answer: 'Jokainen tieteellinen käsite yhdistyy kvantitatiiviseen analyysiin. Oppilaat kertovat sykelukuja ajan yli, jakavat päivittäisten keskiarvojen selvittämiseksi, laativat liikuntadatasta kaavioita mallien tunnistamiseksi ja käyttävät murtolukuja kehon mittasuhteiden kuvaamiseen. Tämä integraatio osoittaa oppilaille, että matematiikka on olennainen työkalu biologisten ilmiöiden ymmärtämiseen.' },
      ],
    },
  },

  // -- FAQ --
  faq: [
    { question: 'Millaisia kehoaiheisia työlehtiä voin luoda?', answer: 'Voit luoda laajan valikoiman kehoaiheisia työlehtiä, mukaan lukien yhteen- ja vähennyslaskuja sormia ja varpaita laskureina käyttäen, kehon osien nimeämis- ja jäljentämistehtäviä, sanahakuja anatomian sanastolla kuten luuranko ja lihas, värityskuvia kehon ääriviivoista ja elimistä, yhdistämistehtäviä kehon osien ja niiden tehtävien parittamiseen, puuttuvien osien pulmia kasvojen piirteillä ja viiden aistin havainnointitehtäviä.' },
    { question: 'Ovatko kehoaiheiset työlehdet ilmaisia?', answer: 'Kyllä, LessonCraftStudiolla voit luoda ja ladata kehoaiheisia työlehtiä ilmaiseksi. Valitse haluamasi työlehden tyyppi, valitse kehoteema, mukauta asetuksia kuten vaikeustasoa ja kohteiden määrää ja luo tulostuskelpoinen PDF luokkahuoneen tai kodin oppimishetkeä varten.' },
    { question: 'Mille ikäryhmille kehoaiheiset työlehdet sopivat?', answer: 'Kehoaiheiset työlehdet on suunniteltu 3\u20139-vuotiaille lapsille esikoulusta kolmanteen luokkaan. Nuoremmat lapset hyötyvät kehon ääriviivojen värittämisestä ja yksinkertaisten sanojen kuten käsi ja jalka jäljentämisestä, kun taas vanhemmat oppilaat ratkaisevat anatomian sanapulmia, kehon järjestelmien tekstejä ja monivaiheisia matemaattisia ongelmia.' },
    { question: 'Miten kehoaiheiset työlehdet auttavat lapsia oppimaan aisteistaan?', answer: 'Kehoaiheisissa työlehdentehtävissä on yhdistämis- ja lajittelutehtäviä, jotka yhdistävät aistikokeumuksia viiteen aistielimeen. Lapset yhdistävät kuvia kokemuksista kuten linnun kuuleminen tai kukan haistaminen oikeaan aistiin rakentaen loogista yhteyttä havaitsemisen ja anatomian välille. Tämä perusta tukee myöhempää luonnontieteen oppimista havainnoinnista, tiedonkeruusta ja hermostosta.' },
    { question: 'Voivatko kehoaiheiset työlehdet opettaa vasemman ja oikean suunnan?', answer: 'Kyllä, monissa kehoaiheisissa työlehdentehtävissä on vasen-oikea -tunnistustehtäviä. Lapset värittävät vasemman käden eri väriseksi kuin oikean, noudattavat suuntaohjeita kuten ympyröi oikea korva tai tekevät symmetriatehtäviä piirtämällä vastaavat piirteet kehon kummallekin puolelle. Nämä harjoitukset rakentavat avaruudellista hahmotusta, joka tukee kirjoittamista, lukusuuntaa ja fyysistä koordinaatiota.' },
    { question: 'Miten kehoaiheiset työlehdet tukevat terveyskasvatusta?', answer: 'Kehoaiheiset työlehdet tutustuttavat luonnostaan terveys- ja hygieniakäsitteisiin auttamalla lapsia ymmärtämään, mitä heidän kehon osansa tekevät ja miksi niistä huolehtiminen on tärkeää. Käsienpesua, hampaiden harjausta, ravitsemusta ja liikuntaa käsittelevät tehtävät tulevat merkityksellisemmiksi, kun lapset osaavat nimetä asianomaiset kehon osat. Tämä tiedon ja toiminnan välinen yhteys rakentaa elinikäistä terveystietoisuutta.' },
    { question: 'Sopivatko kehoaiheiset työlehdet erilaisille lapsille?', answer: 'Kehoaiheiset työlehdet ovat yksi osallistavimmista teemoista, koska jokaisella lapsella on keho johon viitata. Tehtävät voidaan mukauttaa keskittymään kunkin oppijan kannalta merkityksellisimpiin kehon osiin. Teema avaa myös luonnollisia keskusteluja siitä, miten kaikki kehot ovat erilaisia ja arvokkaita, tukien tunne- ja vuorovaikutustaitojen oppimista akateemisen sisällön rinnalla.' },
    { question: 'Voinko käyttää kehoaiheisia työlehtiä luonnontieteen jaksossa ihmiskehosta?', answer: 'Kehoaiheiset työlehdet sopivat täydellisesti ihmiskehon luonnontieteelliseen jaksoon. Käytä nimeämistehtäviä kehon järjestelmien esittelyyn, yhdistämistehtäviä elinten ja tehtävien yhdistämiseen ja järjestämistehtäviä prosessien kuten ruoansulatuksen tai hengityksen jäljittämiseen. Työlehdet tarjoavat sanaston ja visuaalisen vahvistuksen, joka tekee tieteellisistä käsitteistä pysyviä.' },
    { question: 'Miten tulostan tai lataan kehoaiheiset työlehdet?', answer: 'Kun olet muokannut työlehteäsi, napsauta luo-painiketta tulostuskelpoisen PDF:n luomiseksi. Voit sitten ladata tiedoston tietokoneellesi tai käyttää selaimesi tulostustoimintoa. Kaikki työlehdet on muotoiltu tavallisille letter- ja A4-paperikooille helppoa kotona tai koulussa tulostamista varten.' },
    { question: 'Kuinka usein lasten tulisi tehdä kehoaiheisia työlehtiä?', answer: 'Kahdesta neljään lyhyttä kertaa viikossa toimii useimmille lapsille hyvin. Jokaisen kerran tulisi kestää kymmenestä kahteenkymmeneen minuuttiin iästä riippuen. Syvempää temaattista jaksoa varten omista kokonainen viikko kehoteemalle kierrättäen matikka-, lukutaito-, väritys- ja pulmatehtäviä päivittäin kattaen viisi aistia, kehon osat ja terveyskäsitteet ilman toistoa.' },
  ],

  // -- Cross-linking (IDENTICAL to English) --
  relatedThemes: ['clothing', 'food', 'emotions', 'sports', 'household'],
  relatedBlogCategories: [],

  // -- SEO Enrichment (Part 180) --

  classroomScenarios: [
    {
      situation: 'Esiopetusryhmän opettaja huomaa, että monet lapset eivät osaa nimetjä kehon osia tarkasti ja sekoittavat käsitteitä kuten ranne ja kyynärpää.',
      solution: 'Hän ottaa käyttöön kehoaiheiset yhdistämis- ja nimeämistehtävät, joissa lapset yhdistävät kehon osan kuvan oikeaan sanaan. Joka aamu luokassa pelataan Simon sanoo -peliä käyttäen työlehtien sanastoa.',
      outcome: 'Kolmen viikon jälkeen oppilaat tunnistavat ja nimeävät yli kaksikymmentä kehon osaa oikein. Lääkärikäynnillä vanhemmat raportoivat lasten kuvanneen oireitaan tarkemmin kehosanastoa käyttäen.',
    },
    {
      situation: 'Kotikouluvanhempi etsii tapaa yhdistää terveyskasvatus ja matematiikka tokaluokkalaiselle, joka pitää laskemista tyljänä.',
      solution: 'Vanhempi käyttää kehoaiheisia laskutehtäviä, joissa lapsi laskee sormia, varpaita ja luita kuvatuloksista. Mittaustehtävät käyttävät omaa kehoa: käsivarren pituus, jalanjäljen koko ja sydämen lyöntitiheys.',
      outcome: 'Lapsi innostuu laskemisesta, koska tehtävät ovat henkilökohtaisia. Kuukauden sisällä hän mittaa ja kirjaa kehon mittojaan omatoimisesti ja laskee niistä erotuksia.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ikähaarukka', value: '3–9 vuotta' },
    { label: 'Työlehtisovellusten määrä', value: '11 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus–3. lk' },
    { label: 'Keskimääräinen työskentelyaika', value: '10–20 min' },
    { label: 'Kehon osien kirjo', value: '25+ osaa' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Painota väritystehtäviä anatomisilla kuvilla ja yhdistämistehtäviä, joissa kehon osat paritetaan toimintoihinsa. Kehon osan kuvakorttien lisääminen sanapohjaisiin työlehtiin tukee visuaalista muistia.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdistä jokaiseen työlehtiin fyysinen harjoitus: lapsi koskettaa jokaista kehon osaa sen nimeämisen jälkeen. Piirrä ja väritä -tehtävät kehon ääriviivoista tukevat kinesteettistä hahmotusta.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Kehon osat ovat universaaleja — jokainen lapsi tunnistaa kädet, jalat ja silmät. Aloita kuvapohjaisista tehtävistä ja lisää suomenkielisiä sanoja asteittain. Kaksikielinen kehon osien sanalista auttaa yhdistämään kotikielen sanastoon.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta tieteellisillä termeinä kuten luuranko, lihas, nivel ja jänne. Kehon järjestelmien tutkimustehtävät, joissa oppilas kirjoittaa miten ruoka kulkee kehon läpi, tarjoavat syvemmän haasteen.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Portfolioarviointi',
      criteria: 'Kerää kehoaiheisia työlehtiä neljän viikon ajalta. Vertaa kehon osien nimeämistarkkuutta, anatomisen sanaston laajuutta ja kirjallisten vastausten kehittymistä ajan myötä.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Havainnointilista',
      criteria: 'Seuraa, pystyykö lapsi nimeämään kehon osat oikein (esikoulu), selittämään niiden toimintoja (1. lk) vai kuvaamaan kehon järjestelmien yhteistyötä (2.–3. lk). Kirjaa kehosanaston monipuolisuus.',
      gradeLevel: 'Esiopetus–3. lk',
    },
    {
      method: 'Kehon karttatehtävä',
      criteria: 'Anna oppilaalle tyhjä kehon ääriviiva ja pyydä nimeämään mahdollisimman monta osaa. Arvioi osien tunnistamista, nimeämisen tarkkuutta ja mahdollisia selityksiä osien tehtävistä.',
      gradeLevel: 'Esiopetus–2. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ympäristöoppi (terveystieto)',
      connection: 'Kehoaiheiset työlehdet kytkeytyvät suoraan POPS 2014:n ympäristöopin tavoitteisiin ihmiskehon rakenteesta ja toiminnasta sekä terveyskasvatuksen tavoitteisiin hygieniasta ja omasta hyvinvoinnista.',
      activity: 'Kehon osien nimeämistehtävän jälkeen oppilaat piirtävät terveysrutiinikartan: mitkä kehon osat hyötyvät hampaiden pesusta, käsienpesusta ja liikunnasta.',
    },
    {
      subject: 'Matematiikka',
      connection: 'Kehon osat tarjoavat luonnollisen kontekstin laskemiselle, mittaamiselle ja vertailulle. Sormet ja varpaat ovat luontaisia laskureita, ja kehon mittaukset esittelevät mittayksiköitä.',
      activity: 'Oppilaat mittaavat käsivartensa, jalkateränsä ja päänsä ympäryksen ja kirjaavat tulokset taulukkoon. Erotuksia lasketaan ja tuloksia vertaillaan luokan kanssa.',
    },
    {
      subject: 'Äidinkieli ja kirjallisuus',
      connection: 'Kehosanasto rikastuttaa kielellistä ilmaisua ja tukee tieteellisen tekstin lukemisen valmiuksia. Anatominen terminologia kehittää täsmällistä kuvailutaitoa.',
      activity: 'Sanahaun jälkeen jokainen oppilas valitsee kolme kehon osaa ja kirjoittaa niistä lyhyen tietotekstin, jossa kuvataan osan sijainti ja tehtävä.',
    },
  ],

  uniqueAngle: 'Kehoaiheiset työlehdet ovat pedagogisesti ainutlaatuisia, koska ne hyödyntävät maailman saavutettavinta oppimisvälinettä — oppijan omaa kehoa. Toisin kuin teemat, jotka vaativat ulkoisia materiaaleja tai mielikuvitusta, kehoteema on aina läsnä: lapsi voi koskettaa, liikuttaa ja havainnoida juuri sitä aihetta, jota hän tutkii paperilla. Tämä välittömyys luo poikkeuksellisen vahvan oppimisankkurin. Kun lapsi oppii sanan kyynärpää, hän voi osoittaa sitä heti, ja kun hän laskee sormiaan, laskurin voi tarkistaa silmäyksenä. Suomalaisessa koulutustraditiossa kehon ymmärtäminen yhdistyy laajempiin hyvinvoinnin tavoitteisiin: POPS 2014 korostaa itsestä huolehtimista ja arjen taitoja laaja-alaisessa osaamisessa L3, ja terveyskasvatus on integroitu osaksi ympäristöoppia jo alkuopetuksesta. Kehotyölehdet tukevat tätä kokonaisvaltaista lähestymistapaa yhdistämällä anatomian, hygienian ja terveyskasvatuksen matemaattisiin ja kielellisiin taitoihin. Kehoteema avaa myös rikkaita keskusteluja erilaisuudesta ja kunnioituksesta: jokainen keho on erilainen ja arvokas, mikä tukee sosioemotionaalista oppimista. Lisäksi kehosanasto on kriittinen elämäntaito — lapsi, joka osaa kuvata oireitaan lääkärille tai kertoa loukkaantumisestaan opettajalle, saa parempaa hoitoa ja apua.',

  researchCitation: 'Marjanen, P., Ojala, M. & Peltonen, J. (2021). Finnish Early Childhood Education and Care: A Multi-Theoretical Perspective on Research and Practice. Springer. Tutkimus korostaa suomalaisen varhaiskasvatuksen kokonaisvaltaista lähestymistapaa, jossa fyysisen kehityksen, terveyden ja oppimisen integraatio on opetussuunnitelman perusta.',

  culturalNotes: 'Suomessa terveyskasvatus on POPS 2014:n mukaan osa ympäristöoppia alkuopetuksessa, ja laaja-alainen osaaminen L3 (itsestä huolehtiminen ja arjen taidot) korostaa kehon tuntemusta ja terveellisiä elämäntapoja. Suomalainen neuvola- ja kouluterveydenhoitojärjestelmä on maailmankuulu, ja kehoaiheiset työlehdet tukevat samaa ennaltaehkäisevää ajattelua: kun lapsi ymmärtää kehonsa, hän osaa myös huolehtia siitä.',

  snippetDefinition: 'Kehoaiheiset työlehdet lapsille ovat tulostettavia oppimistehtäviä, jotka käyttävät ihmiskehon osia, aisteja ja terveystietoa matematiikan, lukutaidon ja päättelytaitojen opettamiseen. Ne on suunniteltu 3–9-vuotiaille ja sisältävät nimeämistehtäviä, sanahakuja, väritystehtäviä ja yhdistämispulmia.',

  snippetHowTo: [
    'Valitse viikolle kehon alateema, kuten aistit, luusto, terveys tai kehon mittaukset, jotta oppitunneilla on yhtenäinen fokus.',
    'Valitse kaksi tai kolme työlehtityyppiä eri taitoalueille — esimerkiksi nimeämistehtävä sanastoon, laskutehtävä matematiikkaan ja väritystehtävä hienomotoriikkaan.',
    'Aloita lyhyellä fyysisellä harjoituksella: Simon sanoo -peli tai kehon osien jumppahetki, joka aktivoi kehosanaston.',
    'Jaa työlehdet vaikeustason mukaan: aloita väritystehtävällä ennen vaativampia nimeämis- ja kirjoitustehtäviä.',
    'Kierrä lasten joukossa ja esitä avoimia kysymyksiä kuten Miksi tarvitsemme luita tai Mitä aistia käytät, kun haistat kukkia.',
    'Yhdistä työlehti käytännön terveysrutiiniin: pesekää kädet ja nimetkää samalla sormien, kämmenen ja ranteen osat.',
    'Kerää valmiit työlehdet portfoliokansioon ja vertailkaa kehosanaston laajenemista lukukauden aikana.',
  ],

  limitations: 'Kehoaiheiset työlehdet voivat olla herkkjä lapsille, joilla on fyysisiä rajoitteita, kroonisia sairauksia tai kehoaan koskevia epävarmuuksia. Opettajien tulee korostaa, että jokainen keho on arvokas ja erilainen. Anatomisten yksityiskohtien tasossa on löydettävä ikätasoon sopiva tasapaino: liian yksityiskohtaiset kuvat voivat hämmentää pienempiä lapsia. Kulttuurierot kehon paljastamisessa ja käsittelyssä tulee huomioida monikulttuurisissa luokissa.',

  themeComparisons: [
    {
      vsThemeId: 'clothing',
      summary: 'Vaatetyölehdet keskittyvät pukeutumiseen, vuodenaikoihin ja lajitteluun. Kehotyölehdet syventyvät kehon rakenteeseen ja toimintaan, tarjoten tieteellisemmän näkökulman, joka täydentää vaateteeman arjen taitoja.',
    },
    {
      vsThemeId: 'food',
      summary: 'Ruokatyölehdet käsittelevät ravintoa ja ruoanlaittoa. Kehotyölehdet tutkivat, miten keho käyttää ravintoa, yhdistäen teemat luontevasti ruoansulatuksen ja energian kautta.',
    },
    {
      vsThemeId: 'emotions',
      summary: 'Tunnetyölehdet käsittelevät sisäistä tunne-elämää. Kehotyölehdet tarjoavat fyysisen vastineen: miten tunteet näkyvät kehossa, kuten sydämen syke jännityksessä tai lihasten rentoutuminen rauhassa.',
    },
    {
      vsThemeId: 'sports',
      summary: 'Urheilutyölehdet käyttävät kehoa aktiivisissa liikuntatilanteissa. Kehotyölehdet tutkivat anatomiaa ja toimintaa syvemmin, tarjoten tieteellisen perustan, joka selittää miksi liikunta on terveellistä.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'kehoaiheiset väritystehtävät',
      context: 'Kehoaiheiset väritystehtävät tutustuttavat lapset kehon osiin ja anatomisiin rakenteisiin värikkjäiden kuvien kautta, kehittäen hienomotoriikkaa ja kehon tuntemusta.',
    },
    {
      appId: 'draw-and-color',
      anchorText: 'kehon osien piirustustehtävät',
      context: 'Piirustus- ja väritystehtävät antavat lasten luoda omia kehokuvia, vahvistaen anatomista sanastoa ja avaruudellista hahmotusta luovan ilmaisun kautta.',
    },
    {
      appId: 'word-search',
      anchorText: 'kehosanaston sanahaku-työlehdet',
      context: 'Kehosanaston oppiminen onnistuu sanahakutehtävissä, joissa lapset etsivät kehon osien, aistien ja anatomisten termien nimiä sanaruudukosta.',
    },
    {
      appId: 'matching-app',
      anchorText: 'kehon osien yhdistämistehtävät',
      context: 'Yhdistämistehtävät, joissa kehon osat paritetaan niiden toimintoihin tai kuvat sanoihin, rakentavat loogista ajattelua ja anatomista tietopohjaa.',
    },
  ],

  expertTips: [
    {
      tip: 'Aloita jokainen kehoaiheinen työlehtihetki lyhyellä kehojumpalla, jossa lapset liikuttavat juuri niitä kehon osia, joita työlehti käsittelee. Tämä fyysinen aktivointi luo muistiankkurin ja parantaa sanaston säilymistä.',
      source: 'Liikunnanopettaja, 12 vuoden kokemus',
      gradeRange: 'Esiopetus–2. lk',
    },
    {
      tip: 'Käytä peiliä nimeämistehtävien yhteydessä: lapsi katsoo peiliin ja osoittaa jokaista kehon osaa samalla kun nimeää sen. Peilityöskentely vahvistaa kehotietoisuutta ja kehonkaavaa tehokkaammin kuin pelkkä paperityö.',
      source: 'Varhaiskasvatuksen opettaja, motorinen kehitys',
      gradeRange: 'Esiopetus–1. lk',
    },
    {
      tip: 'Yhdistä kehoaiheiset työlehdet kouluterveydenhoitajan vierailuun: oppilaat valmistautuvat tekemmällä kehon osien työlehtiä ja laativat kysymyksiä terveydenhoitajalle. Tämä tekee vierailusta interaktiivisemman ja pedagogisesti syvemmän.',
      source: 'Luokanopettaja, terveyskasvatuksen integrointi',
      gradeRange: '1.–3. lk',
    },
  ],
};

registerThemeContent('body', 'fi', content);
