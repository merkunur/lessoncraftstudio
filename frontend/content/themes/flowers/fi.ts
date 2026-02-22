import { registerThemeContent } from '../registry';
import type { EnrichedThemeContent } from '../types';

const content: EnrichedThemeContent = {
  // -- SEO fields --
  name: 'Kukat',
  title: 'Kukkatehtävät ja Työlehdet Lapsille | LessonCraftStudio',
  description: 'Tutustu kukkatehtäviin lapsille: ruusut, auringonkukat, tulppaanit ja päivänkakkarat. Matematiikkaa, lukemista ja pulmia esikoulusta 3. luokalle.',
  keywords: 'kukkatehtävät lapsille, kukka-aiheinen oppimateriaali, kasvien osat oppiminen, kukkien tunnistaminen harjoitus, puutarha ja kasvit tehtävä, kasvun seuraaminen, luonnonkasvit esikoulu, kukkasanasto harjoitus, kasvien elinkierto, kukka työlehdet tulostettava, auringonkukka tehtävät esikoulu',
  heading: 'Kukka-aiheiset Tehtävät ja Työlehdet Lapsille',

  // -- Rich narrative content --
  intro: 'Kukat kiehtovat lapsia tavalla, johon harvat muut luonnon aiheet yltävät, sillä ne yhdistävät visuaalisen kauneuden ja tieteellisen ihmeen yhdessä organismissa, jonka lapsi voi pitää kädessään. Auringonkukka, joka kohoaa päiväkoti-ikäisen yläpuolelle, voikukka, joka muuttuu keltaisesta kukasta valkoiseksi höytyvänpalloksi, ruusu, joka tuoksuu erilaiselta kuin lilja – nämä ovat kokemuksia, jotka jäävät muistiin ja tekevät biologian abstrakteista käsitteistä käsin kosketeltavia ja henkilökohtaisia. Kukkaiheiset työlehdet kanavoivat tämän luonnollisen lumoutumisen jäsenneltyyn oppimiseen käyttäen terälehtiä, varsia, lehtiä ja siemeniä visuaalisena sanastona, jonka avulla lapset harjoittelevat laskemista, lukemista, lajittelua ja ongelmanratkaisua. Tulostettavat kukkatyölehtimme esittelevät ruusuja, auringonkukkia, tulppaaneja, päivänkakkaroita, liljoja ja villikukkaketoja – kaikki kuvitettu rikkaalla kasvitieteellisellä yksityiskohtaisuudella, joka kutsuu tarkkaan havainnointiin ja on samalla helposti lähestyttävä ja iloinen nuorille oppijoille. Matematiikkatehtävät käyttävät kukkia visuaalisina laskuvälineinä: terälehtiä ryhmitellään yhteenlaskua varten, varren pituuksia vertaillaan mittaamista varten ja kukkia järjestetään kuvioiksi, jotka kehittävät algebrallista ajattelua. Kun lapsi laskee kolmen eri kukan terälehdet ja huomaa niiden olevan yhteensä viisitoista, hän harjoittelee yhteenlaskua samalla kun omaksuu kasvitieteellisen tiedon, että eri lajeilla on eri määrä terälehtiä – yksityiskohta, joka ilahduttaa uteliaita mieliä. Lukutehtävät esittelevät sanastoa kuten pölytys, itäminen, terälehti, hede ja yhteyttäminen – sanoja, jotka saavat lapset tuntemaan itsensä oikeiksi tutkijoiksi ja jotka liittyvät suoraan luonnontieteen opetussuunnitelmiin kaikilla alkuopetuksen luokka-asteilla. Suomessa kukkien merkitys on erityinen: lyhyen kasvukauden aikana luonto räjähtää kukkaan, ja juhannuksen kukkaseppeleet, kevään sinivuokot ja kesän niittykukat ovat lasten elämässä tuttu ja rakastettu näky. Opettajille kukkatyölehdet sopivat erinomaisesti kevään ja luonnontieteen teemakokonaisuuksiin, mutta ne ovat käyttökelpoisia ympäri vuoden. Vanhemmat huomaavat, että kukkatyölehdet yhdistyvät luontevasti puutarhanhoitoon, luontoretkeisiin ja keittiöpöydän kokeiluihin, kuten siementen idättämiseen kostealla talouspaperilla, muuttaen jokaisen työlehden sillaksi paperilta elävään tieteeseen.',

  educationalOverview: 'Kukka-aiheiset työlehdet tuottavat rikkaita pedagogisia tuloksia, koska ne opettavat luonnontieteen käsitteitä visuaalisesti upeassa, henkilökohtaisesti kiinnostavassa kontekstissa, jota lapset haluavat luonnostaan tutkia. Kukan elinkaari – siemenestä itaimeksi, nupuksi, kukaksi ja jälleen siemeneksi – on yleisimmin opetettu biologinen prosessi alkuopetuksessa, ja työlehdet tekevät jokaisesta vaiheesta konkreettisen järjestystehtävien, nimeämistehtävien ja kuvitustehtävien kautta. Pölytys esittelee organismien välisen riippuvuuden käsitteen, sillä lapset oppivat, että kukat tarvitsevat mehiläisiä ja perhosia aivan kuten nuo hyönteiset tarvitsevat kukkia – perustavanlaatuinen ekologinen oppitunti, joka rakentaa empatiaa luontoa kohtaan. Kasvitieteellisen sanaston omaksuminen on nopeaa, koska kukkaterminologia on elävää ja todennettavissa: lapsi, joka oppii sanan terälehti, voi tutkia oikeaa kukkaa ja laskea sen terälehdet luoden palautesilmukan kielen ja havainnoinnin välille, joka nopeuttaa molempia. Matemaattinen ajattelu syvenee kukkakonteksteissa, koska kukat tarjoavat luonnollisia mahdollisuuksia laskemiseen, ryhmittelyyn, kuviointiin ja symmetrian tutkimiseen. Hienomotoriikka kehittyy yksityiskohtaisten terälehtikuvioiden värittämisen, monimutkaisten lehtien suonien jäljentämisen ja kukkien osien leikkaamisen kautta elinkaarilajittelumattoihin. Suomessa Perusopetuksen opetussuunnitelman perusteet (POPS) korostavat ympäristö- ja luontokasvatusta, ja kukkatyölehdet tukevat näitä tavoitteita erinomaisesti yhdistäen luonnontieteen, matematiikan ja äidinkielen oppimisen.',

  parentGuide: 'Kukkatyölehdet yhdistyvät luonnostaan käytännön kokemuksiin, joita perheet voivat jakaa yhdessä, tehden niistä yhden palkitsevimmista teemoista kotioppimiseen. Elinkaarijärjestys-työlehden jälkeen istuttakaa muutama kukkasiemen ruukkuun ja pyytäkää lastanne piirtämään tai valokuvaamaan jokainen kasvuvaihe verraten todellista edistymistä paperille järjesteltyihin vaiheisiin. Käykää puutarhamyymälässä tai kasvitieteellisessä puutarhassa ja haastakaa lapsenne tunnistamaan kukkia, joita he ovat kohdanneet työlehdillään – näin syntyy yhteys kuvitetun oppimisen ja elävien kasvien välille. Prässätkää kukkia paksujen kirjojen välissä ja käyttäkää kuivattuja kukkia askarteluprojekteissa, jotka laajentavat väritystuokioissa harjoiteltuja hienomotorisia taitoja. Perustakaa yksinkertainen kukkapäiväkirja, johon lapsenne piirtää joka viikko yhden löytämänsä kukan ja nimeää osat, jotka hän on oppinut työlehdiltä: terälehdet, varsi ja lehdet. Suomessa kevätretki sinivuokkojen tai valkovuokkojen äärelle on täydellinen tilaisuus yhdistää työlehtioppiminen oikeaan luontokokemukseen. Nuorempien lasten kanssa pitäkää työlehtihetket kymmenestä viiteentoista minuuttiin ja yhdistäkää ne luontoretken tai puutarhahetken kanssa. Nämä yhteydet todelliseen maailmaan varmistavat, että kukkatyölehdet eivät ole irrallisia akateemisia harjoituksia vaan lähtökohtia aidolle tieteelliselle uteliaisuudelle ja luonnon arvostamiselle.',

  // -- Curated apps (IDENTICAL to English) --
  curatedAppIds: [
    'coloring', 'draw-and-color', 'find-and-count', 'matching-app',
    'shadow-match', 'picture-sort', 'image-addition', 'word-search',
    'pattern-train', 'pattern-worksheet',
  ],
  appCategories: [
    { category: 'math', appIds: ['image-addition'] },
    { category: 'literacy', appIds: ['word-search'] },
    { category: 'visual', appIds: ['coloring', 'draw-and-color', 'find-and-count', 'matching-app', 'shadow-match', 'picture-sort'] },
    { category: 'puzzles', appIds: ['pattern-train', 'pattern-worksheet'] },
  ],

  // -- Educational sections --
  teachingTips: [
    { title: 'Luo luokan kukkien elinkaari -näyttely', description: 'Perusta ilmoitustaulu, jossa näkyy kukan elinkaaren vaiheet oikeilla valokuvilla oppilaiden työlehikuvitusten rinnalla. Kun lapset tekevät järjestys- ja nimeämistehtäviä itämisestä, kasvusta, kukkimisesta ja siementen tuotannosta, he lisäävät työnsä näyttelyyn. Jakson lopussa taulusta tulee yhteisöllinen visuaalinen viite, jota lapset käyttävät keskusteluissa ja joka esittelee heidän kasvavaa ymmärrystään biologisista prosesseista.', audience: 'teacher' },
    { title: 'Yhdistä kukkatyölehdet luokan puutarhaan', description: 'Jos koulullanne on puutarha tai edes muutama ruukku ikkunalaudalla, yhdistäkää kukkatyölehdet suoraan eläviin kasveihin. Nimeämistehtävän jälkeen viekää oppilaat tarkkailemaan oikeita kukkia ja tunnistamaan terälehtiä, varsia ja lehtiä. Laskutehtävän jälkeen oppilaat laskevat todellisia kukkia puutarhassa. Tämä rinnakkaisuus paperin ja todellisuuden välillä tekee abstrakteista käsitteistä konkreettisia ja antaa lapsille henkilökohtaisen panoksen oppimaansa tieteeseen.', audience: 'teacher' },
    { title: 'Aloita siementen idätyskoe kotona', description: 'Asettakaa muutama kukkasiemen kosteiden talouspapereiden väliin läpinäkyvän minigrip-pussin sisälle ja teipatkaa se aurinkoiseen ikkunaan. Pyytäkää lastanne piirtämään siemenet päivittäin kukkatyölehtien rinnalla tarkkaillen juuren ja verson ilmestymistä viikon aikana. Vertailkaa todellisia kasvuvaiheita työlehden elinkaarijärjestykseen. Tämä yksinkertainen koe ei vaadi puutarhatilaa ja tarjoaa voimakkaan visuaalisen todisteen siitä, että työlehden tiede kuvaa todellisia prosesseja, jotka tapahtuvat reaaliajassa.', audience: 'parent' },
    { title: 'Yhdistä kukkatyölehdet pölyttäjien havainnointiin', description: 'Kun yhdistämistehtävä kukista ja niiden pölyttäjistä on tehty, viettäkää aikaa ulkona katsellen mehiläisiä, perhosia ja muita hyönteisiä kukilla. Pyytäkää lastanne kuvailemaan, mitä hyönteinen tekee ja miksi, yhdistäen työlehtitieto pölytyksestä elävään havainnointiin. Ottakaa valokuva tai piirtäkää kuva pölyttäjän vierailusta ja keskustelkaa, miten tämä prosessi johtaa uusiin siemeniin ja uusiin kukkiin vahvistaen elinkaarikonseptia useista näkökulmista.', audience: 'both' },
  ],
  activities: [
    {
      title: 'Kukan elinkaaren järjestysmatto',
      description: 'Tulostakaa kortit, joissa näkyy kukan elinkaaren vaiheet: siemen, itu, taimi, nuppu, kukka ja siemenkota. Sekoittakaa kortit ja pyytäkää lapsia järjestämään ne oikeaan järjestykseen numeroidulle järjestysalustalle. Järjestyksen valmistuttua lapset piirtävät oman versionsa jokaisesta vaiheesta ja kirjoittavat tai sanelevat yhden lauseen kuvaten, mitä kussakin vaiheessa tapahtuu. Laajentakaa toimintaa istuttamalla oikea siemen ja pyytämällä lapsia ennustamaan, kuinka monta päivää kuhunkin vaiheeseen menee.',
      materials: ['elinkaaren vaihekortt', 'numeroitu järjestysmatto', 'piirustuspaperit', 'värikynät', 'kynät'],
      duration: '20-25 minuuttia',
      skillAreas: ['cognitive', 'motor'],
    },
    {
      title: 'Terälehtien laskemis- ja yhteenlaskupuutarha',
      description: 'Tulostakaa suuria kuvia eri kukista, joissa on vaihteleva määrä terälehtiä: tulppaani kuudella terälehdellä, päivänkakkara kolmellatoista, leinikki viidellä. Lapset laskevat kunkin kukan terälehdet ja kirjoittavat luvun kukan keskustaan. Sitten he valitsevat kaksi kukkaa ja laskevat niiden terälehdet yhteen kirjoittaen yhteenlaskulauseen alle. Haastakaa edistyneet oppilaat löytämään yhdistelmiä, joiden summa on tavoiteluku. Tämä tehtävä yhdistää kasvitieteellisen havainnoinnin aritmetiikkaan konkreettisella ja visuaalisesti miellyttävällä tavalla.',
      materials: ['kukkakuvitukset laskettavine terälehtineen', 'kynät', 'numerokortit tavoitesummille'],
      duration: '15-20 minuuttia',
      skillAreas: ['math', 'cognitive'],
    },
    {
      title: 'Pölyttäjien yhdistäminen ja roolileikki',
      description: 'Luokaa parikortit, joissa kukat yhdistetään pääasiallisiin pölyttäjiinsä: ruusut mehiläisiin, torvikukat kolibrieihin, yöllä kukkivat kukat lepakoihin ja villikukat perhosiin. Lapset yhdistävät parit ja keskustelevat, miksi kukin pölyttäjä sopii kukkaansa. Sitten lapset tekevät roolileikin pölyttäjinä: yksi ryhmä on kukkia paikallaan ja toinen ryhmä on mehiläisiä, jotka koskettavat kevyesti jokaista kukkaa ja keräävät kuvitteellista siitepölyä käsiinsä kiinnitetyille muistilapuille. Tämä kinesteettinen toiminta tekee pölytyksen abstraktista käsitteestä fyysisen ja mieleenpainuvan.',
      materials: ['kukka-pölyttäjä-yhdistämiskortit', 'muistilaput', 'kukkapannat tai -kyltit'],
      duration: '20-25 minuuttia',
      skillAreas: ['cognitive', 'social'],
    },
  ],
  curriculumAlignment: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Harjoitella laskemista kukka-aiheisilla tehtävillä',
      relatedAppIds: ['image-addition', 'find-and-count'],
    },
    {
      standard: 'POPS.YL.1-2.T3',
      framework: 'POPS 2014',
      description: 'Tunnistaa erilaisia kukkia ja ymmärtää kasvien kasvu',
      relatedAppIds: ['matching-app', 'find-objects'],
    },
    {
      standard: 'POPS.KU.1-2.T1',
      framework: 'POPS 2014',
      description: 'Havainnoida kukkien värejä ja muotoja kuvallisesti',
      relatedAppIds: ['coloring', 'draw-and-color'],
    },
  ],

  // -- Grade-specific content --
  gradeContent: {
    'preschool': {
      seoTitle: 'Kukkatehtävät Esikouluun — Laske ja Väritä | LCS',
      seoDescription: 'Tulostettavia kukkatehtäviä esikouluun (3–4v). Laske kukkia, väritä ruusuja, yhdistä kukkavarjoja ja lajittele kasveja. Ilmaisia työlehtiä.',
      seoKeywords: 'kukkatehtävät esikoululaisille, hienomotoriikka harjoitus, väritys ja jäljentäminen, koon tunnistaminen, yksinkertainen laskeminen, kasvien osat, kasvun seuraaminen, kasvien elinkierto, kukkatehtävät esikoulu, kukkien oppiminen 3-4v',
      intro: 'Kolme-neljävuotiaat esikoululaiset ovat luonnostaan kiinnostuneita kukista niiden kirkkaiden värien, mielenkiintoisten muotojen ja voikukkien poimisen ja siementen puhaltamisen yksinkertaisen ilon vuoksi. Esikoulun kukkatyölehdet kanavoivat tämän aisteihin vetoavan kiinnostuksen varhaisiin akateemisiin taitoihin suurten, värikkäiden kuvitusten kautta, jotka kutsuvat värittämään, laskemaan ja yhdistämään monimutkaisen kasvitieteellisen tutkimuksen sijaan. Tyypillinen tehtävä voi pyytää lasta laskemaan neljä tulppaania puutarhassa ja ympyröimään vastaavan numeron vahvistaen luvuntunnistusta kauniissa, luonnollisessa kontekstissa. Värityssivu, jossa on yksityiskohtaisia mutta helposti lähestyttäviä kukkakuvituksia, kehittää hienomotoriikkaa, kun lapset harjoittelevat pysymistä terälehtien ääriviivojen sisällä ja valitsevat värejä, jotka heijastavat todellisia havaintoja tai puhdasta mielikuvitusta. Yhdistämistehtävät yhdistävät kukkia niiden väreihin, kokoihin tai varjoihin rakentaen visuaalista erottelukykyä ja varhaisia logiikkataitoja. Lajittelutehtävät pyytävät lapsia ryhmittelemään kukkia ominaisuuden mukaan: kaikki punaiset kukat yhteen, kaikki korkeat kukat yhteen tai kaikki pyöreäteräiset kukat yhteen – kehittäen luokittelutaitoja, jotka tukevat myöhempää tieteellistä ajattelua. Jäljentämistehtävät käyttävät kukkasanastoa kuten ruusu, lilja ja siemen kynäotteen ja kirjainmuodostuksen kehittämiseen kontekstissa, joka tuntuu enemmän taiteelta kuin koulutyöltä. Suomessa keväisin ja kesäisin kukkien tarkkailu on luonnollinen osa lasten arkea, ja tämä tekee kukkatyölehdistä erityisen merkityksellisiä. Opettajien ja vanhempien kannattaa pitää tuokiot kahdeksasta kahteentoista minuuttiin ja yhdistää työlehdet oikeisiin kukkiin aina kun mahdollista – edes yksi päivänkakkara vesilasissa tarjoaa elävän vertailukohdan, joka rikastuttaa paperikokemusta mittaamattomasti.',
      objectives: [
        { skill: 'Laskea kukkia ja kukkien osia ryhmissä kymmeneen asti', area: 'math' },
        { skill: 'Lajitella kukkia yhden ominaisuuden kuten värin, koon tai muodon mukaan', area: 'cognitive' },
        { skill: 'Jäljentää kukkasanastoa kehittyvällä kynäkontrollilla', area: 'literacy' },
      ],
      developmentalNotes: 'Kolme-neljävuotiaat hiovat värien tunnistamista ja laajentavat kuvailevaa sanastoaan. Kukat tarjoavat ihanteellisen kontekstin molemmille, sillä lapset harjoittelevat värien nimeämistä osoittamalla terälehtiä ja oppivat uusia sanoja kuten kukka, nuppu ja varsi toistuvalla altistumisella työlehtiharjoituksissa. Heidän hienomotoriikkansa kehittyy nopeasti, ja terälehtien kaarevien ääriviivojen sisällä värittäminen tarjoaa kiinnostavamman haasteen kuin geometriset muodot.',
      teachingTips: [
        'Aseta oikea kukka tai laadukas silkkikukka pöydälle työlehtihetken ajaksi, jotta lapset voivat katsella vuorotellen oikeaa kasvia ja kuvitusta kehittäen havainnointitaitoja, jotka yhdistävät taiteen ja tieteen.',
        'Väritys- tai yhdistämistehtävän jälkeen viekää lapset ulos etsimään oikeita kukkia ja nimeämään niiden värit laskien, kuinka monta kutakin väriä he löytävät – näin matematiikkaharjoitus laajenee luontoon.',
      ],
      faq: [
        { question: 'Miten kukkatyölehdet auttavat esikoululaisia värien tunnistamisessa?', answer: 'Kukkia löytyy sateenkaaren jokaisena värinä, mikä tekee niistä täydellisen välineen värien nimien opettamiseen ja vahvistamiseen. Väritystehtävät pyytävät lapsia yhdistämään tiettyjä värejä tiettyihin kukkiin, lajittelutehtävät ryhmittävät kukkia värin mukaan ja yhdistämistehtävät yhdistävät kukat väripalasiin. Tämä toistuva väriharjoitus kiinnostavassa kontekstissa vahvistaa tunnistamis- ja nimeämistaitoja.' },
        { question: 'Sopivatko kukkatyölehdet vain kevääseen?', answer: 'Eivät. Vaikka kukat ovat näkyvimpiä keväällä ja kesällä, teema toimii ympäri vuoden, koska lapset kohtaavat kukkia kirjoissa, kaupoissa, taiteessa ja jopa vaatteissaan läpi vuoden. Sisätiloissa tehtäviä toimintoja kuten siementen idätystä voi tehdä milloin tahansa, ja kukkatyölehdet auttavat ylläpitämään yhteyttä luontoon myös vuodenaikoina, jolloin ulkopuutarhat nukkuvat.' },
        { question: 'Mikä on yksinkertaisin kukkatyölehti aloittelevalle esikoululaiselle?', answer: 'Aloittakaa värityssivulla, jossa on yksi suuri kukka paksuine ääriviivoineen ja vain muutama terälehti. Tämä antaa lapsen harjoitella ääriviivojen sisällä pysymistä ilman ylivoimaista tunnetta. Kun hän on mukavuusalueellaan, edetkää laskutehtäviin kahdella tai kolmella kukalla ja sitten yhdistämis- ja lajittelutehtäviin taitojen ja keskittymiskyvyn kasvaessa.' },
      ],

      snippetAnswer: 'Kukkaaiheiset työlehdet esikoululaisille (3–4-vuotiaat) opettavat laskemaan terälehtiä, tunnistamaan yleisiä kukkia ja kehittämään hienomotoriikkaa kukankuvioiden värittämisen kautta. Kukkien kauneus ja luonnon monimuotoisuus herättävät esteettistä tajua ja luontorakkautta.',
      uniqueGradeAngle: 'Kukkateema on esikoululaisen esteettisen havaitsemisen ja luontoyhteyden kehityksen avain, koska kolme- ja neljävuotiaat ovat herkkyyskauden huipulla luonnon kauneuden kokemisessa — he poimivat kukkia spontaanisti, tuovat niitä lahjaksi ja tutkivat niitä intensiivisesti. Tämä luontainen kiinnostus on pedagogisen vaikuttavuuden perusta. Suomessa kukkien ilmestyminen keväällä lumen jälkeen on erityisen dramaattinen tapahtuma, joka syventää vuodenaikojen tajua. VASU:n ympäristökasvatuksen ja tutkivan oppimisen tavoitteet toteutuvat, kun lapsi tutkii kukan rakennetta — terälehdet, varsi, lehdet, hede — ja oppii nimeämään osia. Matemaattisesti kukat tarjoavat ainutlaatuisen laskemiskontekstin: terälehtien laskeminen yhdistää laskemisen luonnon rakenteeseen. Kukkien värikkyysi tekee värittämisestä erityisen palkitsevaa, ja kukankuvioiden symmetria esittelee matemaattisia rakenteita kauniissa kontekstissa. Pienten yksityiskohtien värittäminen kehittää hienomotoriikkaa tehokkaasti.',
      developmentalMilestones: [
        { milestone: 'Kukan osien tunnistaminen (3–4-vuotiaat oppivat nimeämään kasvin perusosia)', howWeAddress: 'Yhdistämistehtävät, joissa kukan osat (terälehti, varsi, lehti) nimetAn ja osoitetaan, rakentavat luonnontiedesanastoa' },
        { milestone: 'Terälehtien laskeminen tarkasti (esikoululaiset harjoittelevat laskemista pyöreässä järjestyksessä)', howWeAddress: 'Terälehtien laskutehtävät, joissa lapsi laskee kaarella olevia terälehtiä, kehittävät järjestelmällistä laskemista uudessa muodossa' },
        { milestone: 'Värien havaitseminen luonnossa (esikoululaiset hiovat värihavaintojaan)', howWeAddress: 'Väritystehtävät, joissa kukin kukka väritetään oikealla värillä (voikukka keltaiseksi, ruusu punaiseksi), yhdistävät väritiedon luontotietoon' },
        { milestone: 'Pienten yksityiskohtien värittäminen (esikoululaiset kehittävät tarkkuutta kapeilla alueilla)', howWeAddress: 'Kukkien ohuet terälehdet ja pienet keskustat tarjoavat luonnollisen hienomotorisen haasteen, joka kehittää kynäotteen tarkkuutta' },
      ],
      differentiationNotes: 'Tukea tarvitseville esikoululaisille aloita yksinkertaisilla kukilla (voikukka, päivänkakkara), käytä suuria kuvia, joissa on vain muutama terälehti, ja tuo oikeita kukkia poyDallä vertailua varten. Edistyneille esikoululaisille lisää monimutkaisempia kukkia (auringonkukka, ruusu), pyydä piirtämään oma kukka nimeämällä sen osat ja haasta laskemaan terälehdet useammassa kukassa yhteensä.',
      parentTakeaway: 'Kukkateema on vanhemmille helppo viedä ulos: kävelyllä pysähdytään jokaisen kukan kohdalle, nimetAn se yhdessä, lasketaan terälehdet ja verrataan värejä. Puutarhassa tai parvekkeella voi kylvää siemeniä ja seurata kasvua — tämä on tutkivaa oppimista parhaimmillaan. Kukkapressi tai kuivatut kukat voivat jatkaa oppimista talvellakin. Tärkeintä on ruokkia ihmettelyä: "katsopa miten ihmeellinen tämä kukka on!".',
      classroomIntegration: 'Kukkateema sopii esikoulun kevääseen: aamupiirissä esitellään viikon kukka, oppimispisteissä väritetään kukkia, lasketaan terälehtiä ja lajitellaan kuvia värin mukaan. Luontopisteessä tutkitaan oikeita kukkia suurennuslasilla ja taidetehtävänä painetaan kukkia paperiin. Ulkoilussa etsitään eri kukkia tarkistuslistojen avulla. Tämä tutkiva lähestymistapa yhdistää luonnontiedon, matematiikan, taiteen ja kielen VASU:n eheytettävän opetuksen hengessä.',
      assessmentRubric: [
        { skill: 'Terälehtien laskeminen', emerging: 'laskee kolmeen asti osoittamalla terälehtiä', proficient: 'laskee seitsemään asti terälehteä järjestelmällisesti ja kertoo määrän', advanced: 'laskee kymmeneen ja yli, vertailee eri kukkien terälehtimääriä ja tunnistaa luvun' },
        { skill: 'Kukan osien tunnistaminen', emerging: 'osoittaa kukan ja lehden aikuisen avulla', proficient: 'nimeää itsenäisesti terälehden, varren ja lehden', advanced: 'nimeää kaikki perusosat, tietää että kukka tarvitsee vettä ja valoa, ja piirtää kukan osineen' },
        { skill: 'Hienomotorinen hallinta', emerging: 'värittää kukankuvia laajoilla liikkeillä rajojen yli', proficient: 'värittää terälehdet ja lehdet oikeilla väreillä rajojen sisällä', advanced: 'värittää tarkasti pienet yksityiskohdat ja piirtää omia kukkia itsenäisesti' },
      ],
    },
    'kindergarten': {
      seoTitle: 'Kukkatehtävät Esiopetukseen — Lue ja Istuta | LCS',
      seoDescription: 'Tulostettavia kukkatehtäviä esiopetukseen (5–6v). Harjoittele kukkasanastoa, laske terälehtiä ja ratkaise pulmia. Ilmaisia työlehtiä.',
      seoKeywords: 'kukkatehtävät esiopetukseen, alkuäänteet harjoitus, kirjaintunnistus oppiminen, lukuvalmius tukeminen, yhteenlasku kymmeneen, kasvien osat, kasvun seuraaminen, kasvien elinkierto, kukkatehtävät esiopetus, kukkien oppiminen 5-6v',
      intro: 'Esiopetusikäiset tuovat kasvavat akateemiset taidot ja aidon tieteellisen uteliaisuuden kukkatyölehtiin, valmiina siirtymään pelkästä kukkien ihailusta sen ymmärtämiseen, miten kukat kasvavat, mitä niiden osat ovat ja miksi ne ovat tärkeitä ympäröivälle maailmalle. Viisi-kuusivuotiaat osaavat laskea luotettavasti kahteenkymmeneen, tunnistaa ja kirjoittaa useimpia kirjaimia ja noudattaa monivaiheisia ohjeita, mikä avaa oven rikkaampiin kasvitieteellisiin tehtäviin. Matematiikkatehtävät tällä tasolla käyttävät kukkalaskureita yhteen- ja vähennyslaskuun kymmeneen asti: lapsi voi nähdä maljakon, jossa on kahdeksan kukkaa, joista kolme annetaan pois, ja hänen on selvitettävä, kuinka monta jää jäljelle. Sanahaut kukkasanastolla kuten terälehti, juuri, kukka ja siitepöly haastavat kirjainten hakutaitoa samalla kun rakentavat kasvitieteellistä sanastoa, jonka esiopetuksen luonnontieteen tavoitteet esittelevät. Varjojen yhdistäminen kukkasilueteilla kehittää visuaalista erottelukykyä yksityiskohtaisemmalla tasolla, kun lasten on erotettava samankaltaiset kukkamuodot terälehtijärjestelyn hienovaraisten erojen perusteella. Kuviotyölehdet vuorottelevilla kukkatyypeillä kehittävät algebrallista ajattelua vahvistaen samalla käsitystä, että luonnossa on säännönmukaisia kaavoja. Esiopetus on ihanteellinen aika esitellä perustason kukan elinkaari, ja työlehdet, jotka pyytävät lapsia järjestämään kuvat siemenestä, idusta, nupusta ja kukasta oikeaan järjestykseen, opettavat järjestämistä tieteellisessä kontekstissa, joka tuntuu taianomaiselta akateemisen sijaan. Perusopetuksen opetussuunnitelman perusteet (POPS) korostavat ympäristö- ja luontokasvatusta juuri tässä ikäryhmässä, ja kukkatyölehdet tarjoavat luonnollisen väylän näiden tavoitteiden saavuttamiseen.',
      objectives: [
        { skill: 'Järjestää kukan elinkaaren perusvaiheet oikeaan järjestykseen', area: 'cognitive' },
        { skill: 'Ratkaista yhteen- ja vähennystehtäviä kymmeneen asti kukkalaskurein', area: 'math' },
        { skill: 'Tunnistaa ja nimetä kukan perusosat mukaan lukien terälehdet, varsi ja lehdet', area: 'cognitive' },
      ],
      developmentalNotes: 'Esiopetusikäiset kehittävät kykyä ajatella prosesseja, jotka etenevät ajan myötä, ja kukan elinkaari tarjoaa konkreettisen, visuaalisen esimerkin peräkkäisestä muutoksesta, joka tukee tätä kognitiivista kehitystä. Heidän parantuva hienomotoriikkansa mahdollistaa yksityiskohtaisten kukkakuvitusten tarkan värittämisen, ja laajentuva sanasto tarkoittaa, että he voivat käyttää ja ymmärtää kasvitieteellisiä termejä kuten terälehti, juuri ja kukka, kun ne esitellään kiinnostavissa työlehtiharjoituksissa.',
      teachingTips: [
        'Elinkaarijärjestys-työlehden jälkeen istuttakaa nopeasti kasvava siemen kuten auringonkukka tai papu luokan kuppiruukkuun ja pyytäkää oppilaita piirtämään sen edistyminen viikoittain verraten todellista kasvua työlehdillä järjesteltyihin vaiheisiin.',
        'Käyttäkää kukkien yhdistämis- ja lajittelutyölehtiä kevään luonnontiede-jakson avaustoimintona vahvistaen visuaalista sanastoa ja luokittelutaitoja, joita oppilaat tarvitsevat syvällisempiin luonnontieteen oppitunteihin jakson aikana.',
      ],
      faq: [
        { question: 'Miten kukkatyölehdet opettavat elinkaarikonseptia esiopetuksessa?', answer: 'Järjestystehtävät esittävät vaiheet siemenestä, idusta, nupusta, kukasta ja siemenkotelosta kuvakortteina, jotka lapset järjestävät oikeaan järjestykseen. Nimeämistehtävät pyytävät lapsia yhdistämään kunkin vaiheen nimen kuvitukseen. Nämä tehtävät tekevät syklisen biologisen muutoksen abstraktista käsitteestä konkreettisen ja visuaalisen, mikä on juuri sitä, mitä esiopetusikäiset oppijat tarvitsevat luonnontieteen käsitteiden sisäistämiseen.' },
        { question: 'Mitä hienomotorisia hyötyjä kukkatyölehdet tarjoavat esiopetusikäisille?', answer: 'Yksityiskohtaisten kukkakuvitusten värittäminen kaarevine terälehtineen ja ohuidne varsineen haastaa lapsia kontrolloimaan kynää tarkasti. Lehtien ääriviivojen ja varsien kaarien jäljentäminen kehittää käden liikkeitä, joita tarvitaan kirjainmuodostukseen. Kukkien osien leikkaaminen lajittelumattoihin rakentaa saksitaitoja, jotka tukevat itsenäisyyttä kaikissa askartelu- ja akateemisissa toiminnoissa.' },
        { question: 'Voivatko kukkatyölehdet tukea esiopetuksen taideintegraatiota?', answer: 'Ehdottomasti. Kukkatyölehdet yhdistävät luonnontieteen ja taiteen luonnostaan, koska tarkka kasvitieteellinen kuvitus vaatii huolellista havainnointia, värien käsittelyä ja huomion kiinnittämistä mittasuhteisiin. Käyttäkää piirustus- ja väritystyölehtiä oikeiden kukkien rinnalla, jotta lapset harjoittelevat tieteellistä havainnointia ja taiteellista esittämistä samanaikaisesti.' },
      ],
    },
    'first-grade': {
      seoTitle: 'Kukkatehtävät 1. Luokalle — Kasvit ja Laskut | LCS',
      seoDescription: 'Tulostettavia kukkatehtäviä 1. luokalle (6–7v). Ratkaise kukkalaskuja, opettele kasvien sanastoa ja täytä ristikköja. Ilmaisia työlehtiä.',
      seoKeywords: 'kukkatehtävät 1. luokalle, yhteenlasku vähennyslasku, näkösanat tunnistaminen, luetun ymmärtäminen, oikeinkirjoitus harjoitus, kasvien osat, kasvun seuraaminen, kasvien elinkierto, kukkatehtävät 1. luokka, kukkien oppiminen 6-7v',
      intro: 'Ensimmäisen luokan oppilaat ovat valmiita kukkatyölehdille, jotka haastavat heitä monivaiheisilla tehtävillä, kasvibiologian tietoteksteillä ja yksityiskohtaisilla kuviotyölehdillä, jotka perustuvat kasvitieteelliseen tieteeseen. Kuusi-seitsemänvuotiaat osaavat laskea yhteen ja vähentää kahdenkymmenen sisällä sujuvasti, lukea yksinkertaisia kappaleita itsenäisesti ja soveltaa loogista päättelyä uusiin tilanteisiin. Kukka-aiheiset matemaattiset työlehdet tällä tasolla esittävät sanallisia tehtäviä kuten puutarhassa oli kaksitoista tulppaania ja puutarhuri istutti kahdeksan narsissia lisää – kuinka monta kukkaa puutarhassa on nyt. Lukutehtäviin kuuluu lyhyitä katkelmia siitä, miten siemenet kulkeutuvat uusiin paikkoihin, miksi kukilla on eri värit tai miten mehiläiset kuljettavat siitepölyä kasvista toiseen ymmärtämiskysymyksineen, jotka vaativat muistamista, päättelyä ja selittämistä. Sanahaut pidemmillä kasvitieteellisillä sanoilla kuten auringonkukka, itää ja pölyttää haastavat oikeinkirjoitustaitoja ja esittelevät luonnontieteen terminologiaa, jota ensimmäisen luokan opetussuunnitelma vaatii. Kuviotyölehdet, joissa on kolmen tai neljän vuorottelevan kukkatyypin monimutkaisia sarjoja, kehittävät algebrallista ajattelua tasolla, joka sopii oppilaille, jotka ovat hallinneet yksinkertaisemmat kahden elementin kuviot. Ensimmäinen luokka on myös aika, jolloin lapset alkavat kirjoittaa tietotekstejä, ja kukat tarjoavat rikkaita kehotteita: kuvaile auringonkukan elinkaari, selitä miten mehiläinen auttaa kukkia tuottamaan siemeniä tai kirjoita kolme ohjetta puutarhan istuttamiseen.',
      objectives: [
        { skill: 'Ratkaista yhteen- ja vähennyslaskujen sanallisia tehtäviä 20:n sisällä kukka- ja puutarhakonteksteissa', area: 'math' },
        { skill: 'Lukea ja ymmärtää lyhyitä katkelmia kasvibiologiasta ja pölytyksestä', area: 'literacy' },
        { skill: 'Tunnistaa ja kuvailla kukan täydellinen elinkaari tarkalla sanastolla', area: 'cognitive' },
      ],
      developmentalNotes: 'Ensimmäisen luokan oppilaat ovat kehittäneet riittävän taustatiedon ymmärtääkseen syy-seuraussuhteita kasvibiologiassa, kuten miksi kukat tarvitsevat vettä ja valoa tai miten pölytys johtaa siementuotantoon. Heidän lukusujuvuutensa mahdollistaa kasvitieteellisen sanaston itsenäisen dekoodauksen, ja heidän kirjoitustaitonsa ovat kehittyneet tarpeeksi lyhyiden selittävien vastausten kirjoittamiseen työlehdillä ja oikeassa elämässä havaituista kasviprosesseista.',
      teachingTips: [
        'Tehtäkää kukanhavainnointipäiväkirjaprojekti, jossa jokainen oppilas adoptoi yhden kasvin, tekee sarjan siihen liittyviä työlehtiä lajista ja dokumentoi sen kasvun useiden viikkojen aikana piirustuksin, mittauksin ja kirjallisin havainnoin.',
        'Käyttäkää kukkasanahaun ja sanaston työlehtiä ennakko-opetustehtävinä ennen kasvin elinkaarta tai pölytystä käsittelevän tietokirjan lukemista varmistaen, että oppilaat osaavat lukea avaintermit ennen kuin kohtaavat niitä pidemmissä teksteissä.',
      ],
      faq: [
        { question: 'Miten ensimmäisen luokan kukkatyölehdet liittyvät luonnontieteen tavoitteisiin?', answer: 'Ne tukevat suoraan POPS:n luonnontieteen tavoitteita kasvin rakenteesta, toiminnasta ja elinkaareista. Ekaluokkalaiset oppivat tunnistamaan kukan osat ja niiden tehtävät, järjestämään täydellisen kasvin elinkaaren ja ymmärtämään pölytyksen prosessina, joka mahdollistaa lisääntymisen. Nämä käsitteet ovat linjassa sekä kansallisten että kuntakohtaisten luonnontieteen opetussuunnitelmien kanssa.' },
        { question: 'Voivatko kukkatyölehdet opettaa ekaluokkalaisille organismien välisestä riippuvuudesta?', answer: 'Kyllä. Yhdistämis- ja lukutehtävät tutkivat kukkien ja pölyttäjien välistä suhdetta opettaen lapsille, että molemmat organismit ovat riippuvaisia toisistaan selviytyäkseen. Tämä riippuvuuden käsite on perustavanlaatuinen ekologinen ajatus, joka tukee myöhempää ravintoverkkojen, ekosysteemien ja ympäristönsuojelun opiskelua ylemmillä luokilla.' },
        { question: 'Ovatko ensimmäisen luokan kukkatyölehdet akateemisesti tarpeeksi haastavia?', answer: 'Kyllä. Ne sisältävät monivaiheisia sanallisia tehtäviä puutarhaskenaarioissa, monimutkaisia kuviosarjoja kolmella tai neljällä kukkatyypillä, sanaston pulmia jopa kymmenen kirjaimen sanoilla kuten pölyttää ja itää sekä luetun ymmärtämistä, joka vaatii päättelyä biologisista prosesseista. Kukkateema pitää lapset sitoutuneina samalla kun akateeminen sisältö täyttää ensimmäisen luokan odotukset täysin.' },
      ],
    },
    'second-grade': {
      seoTitle: 'Kukkatehtävät 2. Luokalle — Kasvu ja Tilastot | LCS',
      seoDescription: 'Tulostettavia kukkatehtäviä 2. luokalle (7–8v). Tutki kasvien kasvua, analysoi tilastoja ja kirjoita kukkakuvauksia. Ilmaisia työlehtiä.',
      seoKeywords: 'kukkatehtävät 2. luokalle, kertotaulu harjoittelu, data-analyysi oppiminen, tietoteksti lukeminen, paikka-arvo ymmärtäminen, kasvien osat, kasvun seuraaminen, kasvien elinkierto, kukkatehtävät 2. luokka, kukkien oppiminen 7-8v',
      intro: 'Toisen luokan oppilaat tuovat syvenevän ymmärryksen biologisista prosesseista ja vahvemmat analyyttiset taidot kukkatyölehtiin, valmiina tutkimaan kasvitiedettä yksityiskohtaisen mittaamisen, vertailevan tutkimuksen ja tietotekstikirjoittamisen kautta, joka ylittää selvästi pelkän osien nimeämisen ja vaiheiden järjestämisen. Seitsemän-kahdeksanvuotiaat osaavat laskea yhteen ja vähentää sadan sisällä, mitata esineitä standardiyksiköillä, lukea monikappalisia tekstejä itsenäisesti ja kirjoittaa järjestettyjä kappaleita tukitiedoin. Kukka-aiheiset matemaattiset työlehdet tällä tasolla esittävät haasteita kuten auringonkukka kasvoi neljätoista senttimetriä ensimmäisellä viikolla ja kaksikymmentäkolme senttimetriä toisella – kuinka pitkä se on nyt, jos se alkoi viiden senttimetrin korkeudesta, mikä vaatii monivaiheisia laskelmia aitoihin kasvutietoihin perustuen. Mittaustehtävistä tulee aidosti tieteellisiä, kun oppilaat seuraavat oikeiden kasvien kasvua viikkojen ajan viivoittimilla, kirjaavat tietonsa taulukoihin ja luovat viivakaavioita kasvukäyristä analysoiden kuvioita ja poikkeamia. Luettavat katkelmat ulottuvat monikappaisiin teksteihin, jotka tutkivat kuinka kukat ovat kehittäneet eri muotoja ja värejä houkutellakseen tiettyjä pölyttäjiä, miksi jotkut kukat kukkivat yöllä ja toiset avautuvat vain auringonpaisteessa tai miten siementen levitysstrategiat kuten tuuli, vesi ja eläinkuljetus varmistavat lajin selviytymisen. Suomen pitkät kesäpäivät tarjoavat ainutlaatuisen kontekstin ymmärtää valon merkitystä kasvien kasvulle – miksi Suomessa kukat kukkivat niin runsaasti ja nopeasti lyhyen kasvukauden aikana.',
      objectives: [
        { skill: 'Mitata ja kirjata kasvin kasvutietoja senttimetreinä ja sitten kaavioida tulokset ajan kuluessa', area: 'math' },
        { skill: 'Lukea monikappaleisia tekstejä pölytyksestä ja siementen levityksestä ja tunnistaa syy-seuraussuhteita', area: 'literacy' },
        { skill: 'Suunnitella ja toteuttaa yksinkertainen kasvinkasvukoe hallituilla muuttujilla', area: 'cognitive' },
      ],
      developmentalNotes: 'Toisluokkalaiset ovat kehittäneet kärsivällisyyden ja tarkkuuden mitata kasvien kasvua luotettavasti viivoittimilla ja kirjata tietoja johdonmukaisesti useiden viikkojen ajan. Heidän kasvava kausaalisen päättelyn kykynsä mahdollistaa siirtymisen kukan elinkaaren kuvaamisesta sen selittämiseen, miksi kukin vaihe tapahtuu, ymmärtäen että pölytys johtaa hedelmöitykseen, joka johtaa siementuotantoon tiettyjen biologisten mekanismien vuoksi.',
      teachingTips: [
        'Perustakaa vertaileva kasvinkasvukoe, jossa oppilasryhmät kasvattavat samaa kukkalajia eri olosuhteissa, kuten vaihtelevalla valomäärällä tai kastelulla, ja sitten kaavioivat ja vertaavat tuloksiaan harjoitellen hallittua koetoimintaa.',
        'Pyytäkää jokaista oppilasta adoptoimaan kukkiva kasvi ja pitämään yksityiskohtaista havainnointipäiväkirjaa viikoittaisine mittauksineen, piirustuksineen ja kirjallisine kuvauksineen, joka huipentuu esitykseen kasvin kasvumatkasta.',
      ],
      faq: [
        { question: 'Miten toisen luokan kukkatyölehdet etenevät ensimmäisen luokan sisällön tuolle puolen?', answer: 'Ne siirtyvät kukkien osien tunnistamisesta sen ymmärtämiseen, miksi nuo osat ovat olemassa ja miten ne toimivat yhdessä pölytyksessä ja lisääntymisessä. Matemaattiset tehtävät käyttävät kaksinumeroisia lukuja mittauskonteksteissa, luettavat ovat pidempiä ja vaativat päättelyä, ja kirjoitustehtävät edellyttävät järjestettyjä kappaleita yksittäisten lauseiden sijaan. Kokonaisuudessaan painopiste siirtyy kuvaamisesta selittämiseen.' },
        { question: 'Mitä mittaamistaitoja kukkatyölehdet kehittävät toisella luokalla?', answer: 'Oppilaat mittaavat oikeita kasveja senttimetrein ja tuumin, kirjaavat kasvutietoja rakenteellisiin taulukoihin, luovat viivakaavioita muutoksesta ajan kuluessa ja laskevat kasvueroja vähennyslaskulla. Nämä autenttiset mittaamistehtävät liittyvät suoraan POPS:n matematiikan mittaamis- ja tiedonkäsittelytavoitteisiin samalla kun rakentavat aitoja tieteellisen tutkimuksen taitoja.' },
        { question: 'Miten kukkatyölehdet tukevat toisen luokan luonnontieteellisiä kokeita?', answer: 'Ne tarjoavat sanaston, taustatiedot ja tiedonkirjaamiskehykset, joita oppilaat tarvitsevat yksinkertaisten kokeiden tekemiseen, kuten testaamaan kasvavatko kasvit nopeammin auringonpaisteessa vai varjossa. Työlehdet tukirakentavat hypoteesien muodostamisen, tiedonkeruun, tulosten kaavioinnin ja johtopäätösten tekemisen prosessin tehden kukkatieteestä saavutettavan ja rakenteellisen seitsemän-kahdeksanvuotiaille.' },
      ],
    },
    'third-grade': {
      seoTitle: 'Kukkatehtävät 3. Luokalle — Tutkimus ja Kasvioppi | LCS',
      seoDescription: 'Tulostettavia kukkatehtäviä 3. luokalle (8–9v). Kirjoita kasvitutkimuksia, vertaile kukkalajeja ja ratkaise pulmia. Ilmaisia työlehtiä.',
      seoKeywords: 'kukkatehtävät 3. luokalle, kertolasku jakolasku, tutkimusraportti kirjoittaminen, mielipidekirjoitus harjoitus, kriittinen ajattelu, kasvien osat, kasvun seuraaminen, kasvien elinkierto, kukkatehtävät 3. luokka, kukkien oppiminen 8-9v',
      intro: 'Kolmasluokkalaiset tuovat kertolaskun sujuvuuden ja kasvavan kyvyn tarkkaan tieteelliseen havainnointiin kukkatyölehtiin, valmiina tutkimaan kasvibiologiaa kvantitatiivisen puutarhasuunnittelun, geometrisen luonnonrakenteiden analyysin ja tietotekstikirjoittamisen kautta, joka käyttää kasvitieteellistä erikoissanastoa tarkasti. Kahdeksan-yhdeksänvuotiaat osaavat kertoa ja jakaa sadan sisällä, ymmärtää murtolukuja mittauskonteksteissa, lukea luvunpituisia tietotekstejä ja kirjoittaa rakenteellisia monikappaleisia raportteja todisteineen ja merkityin kaavioin. Kukka-aiheiset matemaattiset työlehdet tällä tasolla esittävät haasteita kuten puutarhapenkki on kahdeksan metriä pitkä ja kuusi metriä leveä ja kukkia istutetaan kahden metrin välein riveihin – kuinka monta kukkaa mahtuu penkkiin, mikä vaatii oppilaita laskemaan pinta-alan, soveltamaan jakamista välistykseen ja käyttämään kertolaskua kokonaiskasvimääriin autenttisessa puutarhansuunnittelussa. Murtolukutehtävät syntyvät luonnostaan, kun oppilaat mittaavat kukkien osia viivoittimilla neljännessenttimetrin tarkkuudella, vertaavat terälehtien pituuksia eri lajien välillä murtolukumittauksia käyttäen ja määrittävät, mikä osa puutarhasta on omistettu kullekin kukkalajikkeelle. Luettavat katkelmat ulottuvat pidempiin teksteihin kukkien ja pölyttäjien monimutkaisesta rinnakkaisevoluutiosta, kasvitieteellisten luokitusjärjestelmien organisoimisesta kasvikunnan perheisiin yhteisten piirteiden perusteella sekä tiettyjen kukkalajien kehittämistä hämmästyttävistä sopeutumista kuten lihansyöjäkasvien ansoista tai äärimmäisestä kuivuudenkestävyydestä.',
      objectives: [
        { skill: 'Käyttää kertolaskua ja murtolukuja puutarhojen suunnitteluun ja kasvitieteellisten tietojen analysointiin', area: 'math' },
        { skill: 'Kirjoittaa tietoraportteja kasvibiologiasta käyttäen kasvitieteellistä erikoissanastoa', area: 'literacy' },
        { skill: 'Analysoida symmetrian geometrisia kuvioita kukkarakenteissa ja soveltaa luokitteluun', area: 'cognitive' },
      ],
      developmentalNotes: 'Kukkateemat valjastaan kolmasluokkalaisten kyvyn tarkkaan havainnointiin ja mittaamiseen yhdistäen matemaattisen tarkkuuden biologiseen kauneuteen. Heidän kehittyvä ymmärryksensä symmetriasta löytää täydellisen ilmaisun terälehtikuvioista, kun taas heidän kasvava kasvitieteellinen sanastonsa mahdollistaa yhä tarkempien tieteellisten kuvausten kirjoittamisen.',
      teachingTips: [
        'Luokaa kasvitieteellinen tutkimusprojekti, jossa oppilaat tutkivat kukan anatomiaa useista lähteistä, mittaavat ja kirjaavat terälehtien mitat murtolukutuumina ja kirjoittavat rakenteellisen tietoraportin merkityin kaavioin ja tarkalla tieteellisellä sanastolla.',
        'Suunnitelkaa kukkien puutarhamatemaattihaaste, jossa oppilaat laskevat suorakaiteen muotoisten penkkien pinta-alan, käyttävät kertolaskua istutusmäärien selvittämiseen oikein välistyksin ja esittelevät puutarhasuunnitelmansa kirjallisessa ehdotuksessa mittoineen.',
      ],
      faq: [
        { question: 'Miten kolmannen luokan kukkatyölehdet kehittävät kertolaskua puutarhasuunnittelun kautta?', answer: 'Oppilaat laskevat tarvittavien kasvien kokonaismäärän kertomalla rivit kasveilla rivillä, määrittävät kustannukset kertomalla kasvimäärät yksikköhinnalla ja laskevat puutarhapenkkien pinta-alan pituuden ja leveyden tulona. Esimerkiksi yhdeksän metriä pitkän ja seitsemän metriä leveän puutarhan suunnittelu kukilla kolmen metrin välein vaatii oppilaita jakamaan mitat välistyksellä ja sitten kertomaan kokonaiskasvimäärän – yhdistäen kertolaskun, jakamisen ja avaruudellisen päättelyn yhdeksi autenttiseksi tehtäväksi.' },
        { question: 'Miten kukkatyölehdet rakentavat kasvibiologian tietotekstikirjoittamisen taitoja?', answer: 'Oppilaat kirjoittavat rakenteellisia raportteja kasvisanaston tieteellisellä sanastolla, mukaan lukien termit kuten pölytys, hede, emi, verholehti ja yhteyttäminen. He oppivat järjestämään raportteja aiheen esittelevällä johdannolla, anatomiaa ja lisääntymistä käsittelevillä kappaleilla merkityin kaavioin ja keskeiset havainnot tiivistävällä johtopäätöksellä.' },
        { question: 'Miten kolmannen luokan kukkatyölehdet kehittävät geometria- ja mittaamistaitoja?', answer: 'Oppilaat analysoivat symmetriaa kukkien terälehdissä, mittaavat kasvinosia murto-osayksiköillä viivoittimilla, laskevat puutarhapenkkien pinta-alan ja ympärysmitan ja tunnistavat geometrisia muotoja kukkarakenteissa. Kun oppilaat huomaavat, että päivänkakkaralla on säteittäinen symmetria kun taas leijonansuulla on kahdenvälinen symmetria, he yhdistävät geometrisen sanaston biologiseen havainnointiin syventäen ymmärrystä molemmilla aloilla samanaikaisesti.' },
      ],
    },
  },

  // -- FAQ --
  faq: [
    { question: 'Millaisia kukkatyölehtiä on saatavilla?', answer: 'Voit luoda monenlaisia kukka-aiheisia työlehtiä, mukaan lukien yhteen- ja vähennyslaskuja terälehti- ja kukkalaskureilla, värityssivuja yksittäisistä kukista ja puutarhakohtauksista, yhdistämistehtäviä kukkien varjoihin tai pölyttäjiin, kuvalajittelua kukkien ominaisuuksien mukaan, sananhakuja kasvitieteellisellä sanastolla, kuvioiden tunnistamista kukkasarjoilla, etsi ja laske -puutarhakohtauksia, varjojen yhdistämistä sekä piirustus- ja väritysaktiviteetteja ruusuilla, auringonkukilla, tulppaaneilla, päivänkakkaroilla ja villikukilla.' },
    { question: 'Miten kukkatyölehdet opettavat kasvin anatomiaa?', answer: 'Nimeämistehtävät esittävät yksityiskohtaisen kukkakuvituksen ja pyytävät lapsia tunnistamaan osat mukaan lukien terälehdet, varren, lehdet, juuret ja vanhemmille oppilaille heteen ja emin. Yhdistämistehtävät yhdistävät osien nimet niiden tehtäviin. Nämä käytännön paperitehtävät rakentavat sanaston ja visuaalisen tunnistamisen, joita lapset tarvitsevat osien tunnistamiseen oikeista kukista.' },
    { question: 'Mitä matemaattisia käsitteitä kukkatyölehdillä voi opettaa?', answer: 'Kukkatyölehdet kattavat laskemisen terälehti- ja kukkalaskurein, yhteen- ja vähennyslaskun puutarhaskenaarioilla, kuvioiden tunnistamisen kukkasarjoilla, mittaamisen varsien korkeuksia vertailemalla, symmetrian kukkarakenteita tutkimalla ja ryhmittelyn kukkia luokkiin lajittelemalla. Kukkien luonnolliset matemaattiset ominaisuudet kuten vaihtelevat terälehtimäärät ja symmetriset rakenteet tekevät niistä luontevan kontekstin matemaattiselle tutkimiselle.' },
    { question: 'Miten kukkatyölehdet tukevat hienomotoriikan kehitystä?', answer: 'Terälehtien ja lehtien kaarevien, monimutkaisten ääriviivojen värittäminen haastaa lapsia kontrolloimaan kynäänsä tarkemmin kuin yksinkertaiset geometriset muodot vaatisivat. Varsien ja lehtien ääriviivojen jäljentäminen kehittää virtaavia käden liikkeitä, joita tarvitaan käsinkirjoitukseen. Kukkien osien leikkaaminen lajittelua varten rakentaa saksikontrollia. Nämä motoriset hyödyt täydentävät jokaisen kukkatyölehden akateemista sisältöä.' },
    { question: 'Voivatko kukkatyölehdet esitellä pölytyskäsitteitä?', answer: 'Kyllä. Yhdistämistehtävät yhdistävät kukkia niiden pölyttäjiin, kuten mehiläisiin, perhosiin, kolibrieihin ja lepakoihin. Järjestystehtävät näyttävät pölytyksen vaiheet siitepölyn siirtämisestä siementen muodostumiseen. Luettavat katkelmat selittävät lapsiystävällisellä kielellä, miksi pölytys on tärkeää. Nämä tehtävät tekevät monimutkaisesta biologisesta prosessista saavutettavan ja mieleenpainuvan nuorille oppijoille.' },
    { question: 'Mitä sanastoa lapset oppivat kukkatyölehdistä?', answer: 'Lapset kohtaavat kasvitieteellistä sanastoa mukaan lukien terälehti, varsi, lehti, juuri, siemen, itu, nuppu, kukka, siitepöly, mesi, itää ja pölyttää. Vanhemmat oppilaat voivat kohdata myös yhteyttämisen, emin ja heteen. Nämä sanat kantavat visuaalisia ja kosketeltavia assosiaatioita, jotka tekevät niistä mieleenpainuvampia kuin abstrakti sanasto, erityisesti kun työlehtiä yhdistetään oikeiden kukkien havainnointiin.' },
    { question: 'Sopivatko kukkatyölehdet kevään teemakokonaisuuteen?', answer: 'Kukkatyölehdet ovat ihanteellinen keskipiste kevään luonnontiede-jaksolle, koska ne sopivat täydellisesti yhteen sen kanssa, mitä lapset näkevät ulkona vuodenajan edetessä. Suomessa kevään ensimmäiset kukat – sinivuokot, leskenlehdet ja valkovuokot – herättävät lasten luontaisen kiinnostuksen, ja työlehdet kanavoivat sen oppimiseksi. Opettajat voivat järjestää työlehtiä peilaamaan etenemistä siementen istuttamisesta itämisen, kasvamisen ja kukkimisen kautta.' },
    { question: 'Miten kukkatyölehdet liittyvät taidekasvatukseen?', answer: 'Kukkien kuvittaminen on ollut kasvitieteellisen taiteen kulmakivi vuosisatoja, ja kukkatyölehdet tuovat tämän perinteen nuorille oppijoille piirustus- ja väritystehtävien sekä havainnoivan piirtämisen kautta. Lapset harjoittelevat värien sekoittamista, mittasuhteita ja huomion kiinnittämistä yksityiskohtiin samalla kun oppivat tiedesanastoa – näin kukkatyölehdet muodostavat luonnollisen sillan STEM- ja taidekasvatuksen välille.' },
    { question: 'Voidaanko kukkatyölehtiä yhdistää todelliseen puutarhanhoitoon?', answer: 'Ehdottomasti. Tehokkain tapa käyttää kukkatyölehtiä yhdistää paperioppimisen käytännön kasvattamiseen. Istuttakaa siemeniä elinkaariharjoituksen jälkeen, mitatkaa kasvua laskutehtävän jälkeen, tarkkailkaa pölyttäjiä yhdistämistehtävän jälkeen ja prässätkää kukkia väritystuokion jälkeen. Tämä rinnakkaisuus työlehden sisällön ja todellisen puutarhanhoidon välillä luo syvimmän ja kestävimmän oppimiskokemuksen.' },
    { question: 'Kuinka usein lasten tulisi tehdä kukkatyölehtiä?', answer: 'Kaksi-neljä tuokiota viikossa toimii hyvin kukka- tai kevätjakson aikana. Kunkin tuokion tulisi kestää kymmenestä kahteenkymmeneen minuuttiin iästä riippuen. Parhaan vaikutuksen saamiseksi vaihdelkaa työlehden tyyppejä tuokioiden välillä: matematiikka maanantaina, lukutaito keskiviikkona ja palapelit perjantaina. Yhdistäkää jokainen tuokio lyhyeen ulkohavainnointiin tai puutarhahetkeen vahvistaaksenne yhteyttä paperioppimisen ja elävien kasvien välillä.' },
  ],

  // -- Cross-linking --
  relatedThemes: ['nature', 'garden', 'spring', 'seasons', 'insects', 'colors', 'weather'],
  relatedBlogCategories: [],

  // -- SEO Enrichment (Part 183) --

  classroomScenarios: [
    {
      situation: 'Ensimmäisen luokan opettaja haluaa opettaa kasvien osia ja kasvuprosessia, mutta oppilaat pitävät biologiaa tylsana ja eivät jaksa keskittyyä perinteisiin kasvitieteen tehtäviin.',
      solution: 'Hän ottaa käyttöön kukkateemaiset työlehdet, joissa oppilaat värittävät kukkien osia ja nimeävät ne (terälehti, hede, emi), seuraavat siemenen kasvua kukaksi, lajittelevat kukkia värin mukaan ja suunnittelevat kukkapenkin.',
      outcome: 'Neljän viikon jälkeen oppilaat tunnistavat kukkien pääosat, ymmärtävät kasvuprosessin vaiheet, käyttävät kasvitieteen sanastoa sujuvasti ja ovat innostuneita puutarhan tutkimisesta.',
    },
    {
      situation: 'Kotikouluvanhempi etsii keVääteemaa, joka yhdistää taiteen, luonnontieteen ja kielen oppimisen lapselle, joka rakastaa piirtämistä ja ulkona oloa.',
      solution: 'Vanhempi käyttää kukkatyölehtiä yhdistettynä luontoretkään: lapsi piirtää löytämiään kukkia luontopäiväkirjaan, tunnistaa lajeja määritysoppaan avulla, tutkii kukkien osia suurennuslasilla ja kirjoittaa havaintojaan.',
      outcome: 'Lapsi ymmärtää pölytyksen ja kasvien lisääntymisen perusperiaatteet, tunnistaa kotimaisia kukkia ja osaa kuvata havaintojaan tarkoilla biologisilla termeillä.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ikähaarukka', value: '3–9 vuotta' },
    { label: 'Työlehtisovellusten määrä', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '4 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus–3. lk' },
    { label: 'Keskimääräinen työskentelyaika', value: '10–20 min' },
    { label: 'Kukkalajien kirjo', value: '15+ kukkalajia' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'Käytä yksityiskohtaisia kukkakuvituksia ja poikkileikkauskuvia, jotka paljastavat kukan sisärakenteen. Symmetriakuviot kukkien terälehdistä ja väriympyrän linkittäminen kukkien väreihin syventävät visuaalista ymmärrystä.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Tuo oikeita kukkia luokkaan tutkittaviksi: oppilaat purkavat kukan osiin, tunnistavat terälehdet, heteet ja emin, kylvävät siemeniä ruukkuihin ja seuraavat kasvuprosessia viikoittain.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Kukat ovat universaalisti kaunis ja tuttu aihe kaikissa kulttuureissa. Aloita tuttujen kukkien (auringonkukka, ruusu, tulppaani) suomenkielisestä nimeämisestä ja laajenna kasvitieteen sanastoon. Kuvitetut kukkasanakortit tukevat oppimista.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta pölytyksen tutkimuksella: vertaile hyönteis- ja tuulipölytteisiä kukkia, tutki kukkien sopeutumia eri ympäristöihin ja dokumentoi koulun pihan kukkien lajimonimuotoisuutta.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Kukan osien tunnistuskoe',
      criteria: 'Anna oppilaalle kukkakuva ja pyydä nimeämään viisi osaa (terälehti, hede, emi, varsi, lehti). Arvioi nimien oikeellisuutta, kykyä selittää kunkin osan tehtävä ja biologisen sanaston käyttöä.',
      gradeLevel: '1.–3. lk',
    },
    {
      method: 'Kukkien havaintopäiväkirja',
      criteria: 'Kerää oppilaan luontoretken havainnot ja piirrokset neliän viikon ajalta. Arvioi havaintojen tarkkuutta, piirrosten yksityiskohtaisuutta ja tieteellisen sanaston kehittymistä.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Kasvatusprojektin dokumentointi',
      criteria: 'Seuraa siemenen kasvua kukaksi ja pyydä oppilasta dokumentoimaan jokainen vaihe piirroksin ja mittauksin. Arvioi mittaamisen tarkkuutta, vaiheiden tunnistamista ja kokonaisesityksen selkeyttä.',
      gradeLevel: 'Esiopetus–2. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ympäristöoppi (biologia)',
      connection: 'Kukat ilmentävät kasvien lisääntymisbiologiaa: pölytys, hedelmöitys ja siementen leviöminen. POPS 2014:n ympäristöopin tavoitteet kasvien tutkimisesta ja elämänkierroista toteutuvat kukkateemassa luonnollisesti.',
      activity: 'Kukan osien tunnistamistehtävän jälkeen oppilaat purkavat oikean kukan osiin, tunnistavat terälehdet, heteet ja emin ja piirtävät suurennetun kuvan rakenteesta.',
    },
    {
      subject: 'Kuvataide',
      connection: 'Kukkien symmetria, värimaailma ja orgaaniset muodot inspiroivat taiteellista ilmaisua. Kukat ovat olleet taiteen keskeinen aihe Monet'sta Marimekkonn sekä opettavat väriteoriaa luonnollisessa kontekstissa.',
      activity: 'Väritystehtävän jälkeen oppilaat maalaavat oikeasta kukasta vesiväritaideteoksen kiinnittäen huomiota värien sekoittamiseen ja symmetriaan.',
    },
    {
      subject: 'Matematiikka (symmetria ja kuviot)',
      connection: 'Kukkien terälehtien symmetria ja lukumääräkuviot tarjoavat luontevan kontekstin geometrialle ja laskemiselle. POPS 2014:n matematiikan tavoitteet symmetriasta ja kuvioista toteutuvat konkreettisesti.',
      activity: 'Kukkien lajittelutehtävän jälkeen oppilaat laskevat eri kukkien terälehtien määrät, piirtävät symmetriakuvioita ja vertailevat kukkien geometrisia muotoja.',
    },
  ],

  uniqueAngle: 'Kukkateemaiset työlehdet yhdistävät tieteellisen tarkkailun ja esteettisen kokemuksen tavalla, joka on ainutlaatuinen oppimateriaaleissa. Kukat ovat luonnon näkyvin kauneus, ja niiden tutkiminen herättää lapsissa samanaikaisesti ihmetyksen, uteliaisuuden ja luontoyhteyden tunteen. Biologisesti kukat ovat kasvien lisääntymiselimiä, ja niiden tutkiminen avaa portin pölytykseen, siementen leviämiseen ja ekosysteemien vuorovaikutussuhteisiin. Suomessa kevään ensimmäiset kukat — leskenlehtii, sinivuokko, valkovuokko — ovat kulttuurisesti merkittäviä kevään merkkejä, ja niiden tunnistaminen on osa suomalaista luontosuhdetta. POPS 2014 korostaa lähiympäristön tutkimista ja kasvien havainnointia, ja kukkatyölehdet rakentavat siltaa luokkahuoneen ja luonnon välille. Kukkien symmetria, värimaailma ja muotojen moninaisuus tarjoavat luontevan yhteyden myös kuvataiteen ja matematiikan oppisisältöihin.',

  researchCitation: 'Fancovicova, J. & Prokop, P. (2011). Plants Have a Chance: Outdoor Educational Programmes Alter Students' Knowledge and Attitudes Towards Plants. Environmental Education Research. Tutkimus osoitti, että ulkona toteutettu kasvien tutkiminen yhdistettynä luokkahuonetehtäviin parantaa merkittävästi lasten kasvitieteen osaamista ja myönteistä suhtautumista kasveihin.',

  culturalNotes: 'Suomessa kukat ovat syvästi kulttuurisesti merkittäviä: kevään ensimmäiset kukat symboloivat talven päättymistä, juhannuskukat ovat perinne ja Suomen kansalliskukka on kielo. POPS 2014 painottaa lähiympäristön kasvien tunnistamista ja tutkimista. Suomalaisten lasten luontokasvatus hyötyy kukkateemaisista työlehdistä, jotka yhdistävät kotimaisten lajien tunnistamisen biologiseen ymmärrykseen.',

  snippetDefinition: 'Kukkateemaiset työlehdet lapsille ovat tulostettavia oppimistehtäviä, jotka käyttävät ruusuja, auringonkukkia, tulppaaneja ja muita kukkia kasvitieteen, värien, symmetrian ja sanaston opettamiseen. Ne on suunniteltu 3–9-vuotiaille ja sisältävät kukan osien tunnistamista, kasvuprosessin seurantaa ja lajien luokittelua.',

  snippetHowTo: [
    'Valitse työlehdet lapsen kehitystason mukaan: nuoremmille värittämistä ja nimeämistä, vanhemmille kasvitieteen tutkimustehtäviä.',
    'Aloita tutustumalla oikeisiin kukkiin: tuo luokkaan erilaisia kukkia ja anna lasten tutkia niitä suurennuslasilla.',
    'Yhdistä työlehti luontoretkeen: tunnistakaa koulun pihan ja lähimetsän kukkia määritysoppaan avulla.',
    'Harjoittele kasvitieteen sanastoa: nimeäkää yhdessä kukan osat (terälehti, hede, emi, varsi, lehti) ja keskustele niiden tehtävistä.',
    'Lisää kasvatusprojekti: kylväkää siemeniä ja seuratkaa kasvua piirroksin ja mittauksin.',
    'Yhdistä taide ja tiede: piirrrä ja maalatkaa kukkia huomioiden symmetria ja värien tarkkuus.',
    'Kerää havainnot ja työlehdet kukkavihkoon ja vertailkaa kasvitieteen sanaston ja lajitunnistuksen kehittymistä.',
  ],

  limitations: 'Kukkateema sopii parhaiten kevääseen ja kesään, kun elaViä kukkia on saatavilla luonnossa. Talvella oikeiden kukkien tutkiminen rajoittuu ruukkukasveihin ja leikkokukkiin. Siitepölyallergiat on huomioitava, kun tuodaan kukkia luokkahuoneeseen tai tehdään retkia kukkiviin ympäristöihin.',

  themeComparisons: [
    {
      vsThemeId: 'nature',
      summary: 'Luontotyölehdet tutkivat ekosysteemejä kokonaisvaltaisesti. Kukkateema syventyy kasvien lisääntymisbiologiaan, pölytykseen ja kukkien rakenteeseen.',
    },
    {
      vsThemeId: 'garden',
      summary: 'Puutarhatyölehdet kattavat koko puutarhan hoidon. Kukkateema keskittyy nimenomaan kukkien biologiaan, estetiikkaan ja lajien tunnistamiseen.',
    },
    {
      vsThemeId: 'spring',
      summary: 'Kevättyölehdet tutkivat vuodenajan muutosta laajasti. Kukkateema syventää kevään näkyvintä ilmiötä — kukkien puhkeamista — biologisesta näkökulmasta.',
    },
    {
      vsThemeId: 'insects',
      summary: 'Hyönteisteema tutkii pieniä eläimiä itsenäisesti. Kukkateema yhdistää hyönteiset pölytykseen ja opettaa kasvien ja eläinten vuorovaikutusta.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'kukkateemaiset väritystehtävät',
      context: 'Kukkien värityssivut kehittävät hienomotoriikkaa ja värien hallintaa, kun lapset värittävät terälehtiä, varsia ja lehtiä luonnonmukaisin värein.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'kukkien etsi ja laske -tehtävät',
      context: 'Etsi ja laske -tehtävät kehittävät lukumääräkäsitettä ja visuaalista tarkkaavaisuutta, kun lapset etsivät ja laskevat eri kukkalajeja puutarhakuvasta.',
    },
    {
      appId: 'word-search',
      anchorText: 'kukkasanaston sanahaku-työlehdet',
      context: 'Sanahakutehtävät vahvistavat kasvitieteen sanastoa, kun lapset etsivät termejä kuten ruusu, auringonkukka, terälehti ja hede sanaruudukosta.',
    },
    {
      appId: 'pattern-train',
      anchorText: 'kukkateemaiset kuviojunatehtävät',
      context: 'Kuviojunatehtävät kehittävät loogista ajattelua, kun lapset tunnistavat ja jatkavat kukkakuvioiden sarjoja symmetrian ja värien perusteella.',
    },
  ],

  expertTips: [
    {
      tip: 'Aloita keVäällä kotimaisten kukkien tunnistamisesta: leskenlehtii, sinivuokko ja valkovuokko ovat helposti löydettävissä ja tuovat työlehtien sisällön eläväksi luontoretkellä.',
      source: 'Luonnontieteellisen opetuksen menetelmäopas',
      gradeRange: 'Esiopetus–2. lk',
    },
    {
      tip: 'Käytä suurennuslasia kukan osien tutkimiseen: lasten ihmetys on suurinta, kun he näkevät siitepölyhi ukkaset ja pienet rakenteen yksityiskohdat omin silmin.',
      source: 'Tutkivan oppimisen opas',
      gradeRange: '1.–3. lk',
    },
    {
      tip: 'Yhdistä kukkatyölehdet kasvatusprojektiin: kylvä nopeasti kukkivien lajien siemeniä (krassi, kehäkukka) ja dokumentoi kasvuprosessi työlehtien ja piirrosten avulla.',
      source: 'POPS 2014, ympäristöopin opetuksen suositukset',
      gradeRange: 'Esiopetus–3. lk',
    },
  ],
};

registerThemeContent('flowers', 'fi', content);
