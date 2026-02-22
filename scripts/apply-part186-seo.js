/**
 * SEO Part 186: Enrich FI theme hub page 50 (summer/kes\u00e4) with 14 enrichment fields
 * Final FI theme hub enrichment part — completes all 50 FI theme hubs.
 */
const fs = require('fs');
const path = require('path');

// \u2500\u2500 Summer (kes\u00e4) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

const summerFields = `
  // -- SEO Enrichment (Part 186) --

  classroomScenarios: [
    {
      situation: 'Luokanopettaja haluaa valmistella kes\u00e4lomaa edelt\u00e4v\u00e4n oppimispaketin, joka yll\u00e4pit\u00e4\u00e4 oppilaiden akateemisia taitoja loman aikana ja samalla juhlistaa tulevaa kes\u00e4\u00e4.',
      solution: 'H\u00e4n kokoaa kes\u00e4aiheisen ty\u00f6lehtipaketin, jossa viikkokohtaiset teht\u00e4v\u00e4t etenevt asteittain: j\u00e4\u00e4tel\u00f6pallojen laskemista ja rantakohtausten v\u00e4ritt\u00e4mist\u00e4 nuoremmille, sanahakuja kes\u00e4sanastolla ja sanallisia teht\u00e4vi\u00e4 simpukoiden ja uimarien laskemisesta vanhemmille. Oppilaat saavat kes\u00e4oppimispassin, johon ker\u00e4t\u00e4\u00e4n leimoja suoritetuista viikoista.',
      outcome: 'Oppilaat palaavat syksyll\u00e4 kouluun akateemiset taidot tallessa, kes\u00e4liukuma on minimoitu ja oppimismotivaatio s\u00e4ilyy, koska ty\u00f6lehdet tuntuvat kes\u00e4hauskan jatkeelta eiv\u00e4tk\u00e4 ylim\u00e4\u00e4r\u00e4iselt\u00e4 koulty\u00f6lt\u00e4.',
    },
    {
      situation: 'Vanhempi etsii tuottavaa ruutuvapaata tekemist\u00e4 pitk\u00e4lle automatkalle m\u00f6kkireissulle, mutta ei halua lapsensa kokevan oppimista rangaistuksena loman aikana.',
      solution: 'Vanhempi tulostaa valikoiman kes\u00e4ty\u00f6lehti\u00e4 kansioon: v\u00e4rityssivuja rantakohtauksista takapenkill\u00e4 t\u00e4ytett\u00e4viksi, sananetsint\u00f6j\u00e4 lepo-paikoille ja j\u00e4\u00e4tel\u00f6aiheisia laskuteht\u00e4vi\u00e4 m\u00f6kin iltahetkiin. Jokaisen ty\u00f6lehden j\u00e4lkeen lapsi saa valita kes\u00e4aktiviteetin kuten uinnin tai kalastuksen.',
      outcome: 'Lapsi yhdist\u00e4\u00e4 ty\u00f6lehdet positiivisesti lomamuistoihin, laskemis- ja lukutaidot pysyv\u00e4t aktiivisina kes\u00e4n yli ja automatkat muuttuvat tuottaviksi oppimishetkiksi ruutuajan sijaan.',
    },
  ],

  quickStats: [
    { label: 'Suositeltu ik\u00e4haarukka', value: '3\u20139 vuotta' },
    { label: 'Ty\u00f6lehtisovellusten m\u00e4\u00e4r\u00e4', value: '10 sovellusta' },
    { label: 'Opetussuunnitelman alueet', value: '5 aluetta' },
    { label: 'Tuetut luokkatasot', value: 'Esiopetus\u20133. lk' },
    { label: 'Keskim\u00e4\u00e4r\u00e4inen ty\u00f6skentelyaika', value: '10\u201325 min' },
    { label: 'Kes\u00e4aiheet', value: '25+ aihepiiri\u00e4' },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuaaliset oppijat',
      adaptation: 'K\u00e4yt\u00e4 kirkkaita, yksityiskohtaisia rantakohtauksia ja uima-allaskuvia, joissa v\u00e4rikoodatut elementit ohjaavat huomiota. J\u00e4\u00e4tel\u00f6tornien v\u00e4rikerrokset havainnollistavat laskemista visuaalisesti ja kesapaitakuvioiden j\u00e4rjestykset tukevat kuviosarjojen ymm\u00e4rt\u00e4mist\u00e4.',
    },
    {
      learnerType: 'Kinesteettiset oppijat',
      adaptation: 'Yhdist\u00e4 ty\u00f6lehdet aitoon kes\u00e4toimintaan: simpukoiden ker\u00e4\u00e4minen ja lajittelu rannalla ennen lajitteluteht\u00e4v\u00e4\u00e4, j\u00e4\u00e4tel\u00f6pallojen muovaileminen muovailuvahasta ennen laskuteht\u00e4v\u00e4\u00e4 ja veden l\u00e4mp\u00f6tilan mittaaminen ennen mittausteht\u00e4vi\u00e4. Fyysinen kokemus ankkuroi abstraktin oppimisen.',
    },
    {
      learnerType: 'S2-oppijat',
      adaptation: 'Kes\u00e4n kuvasto on universaalisti tunnistettavaa: aurinko, vesi, j\u00e4\u00e4tel\u00f6 ja ranta ovat tuttuia kaikissa kulttuureissa. Aloita konkreettisilla kes\u00e4esineill\u00e4 ja niiden suomenkielisill\u00e4 nimill\u00e4, lis\u00e4\u00e4 kuvailevia adjektiiveja asteittain. Kes\u00e4kokemukset tarjoavat yhteisen pohjan keskustelulle ja sanaston rakentamiselle.',
    },
    {
      learnerType: 'Edistyneet oppijat',
      adaptation: 'Haasta suunnittelemaan kes\u00e4leiri kokonaisuudessaan: laske budjetti kertolaskulla, laadi viikkoaikataulu kuluvan ajan laskemisella, kirjoita vakuuttava esite leirist\u00e4 ja luo tilastokaaviota s\u00e4\u00e4havainnoista. Integroitu projekti yhdist\u00e4\u00e4 matematiikan, \u00e4idinkielen ja luonnontieteen.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Kes\u00e4oppimiskansio',
      criteria: 'Ker\u00e4\u00e4 oppilaan kes\u00e4ty\u00f6lehdet, piirustukset ja kirjoitelmat koko loman ajalta. Arvioi matemaattisten taitojen yll\u00e4pitoa, sanaston laajentumista ja kyky\u00e4 kuvata kes\u00e4kokemuksia monipuolisesti. Vertaa syksyn l\u00e4ht\u00f6tasoa edellisen lukuvuoden lopputasoon.',
      gradeLevel: 'Kaikki luokka-asteet',
    },
    {
      method: 'Kes\u00e4p\u00e4iv\u00e4kirjaprojekti',
      criteria: 'Pyyd\u00e4 oppilasta pit\u00e4m\u00e4\u00e4n kes\u00e4p\u00e4iv\u00e4kirjaa, johon kirjataan viikottain s\u00e4\u00e4havainnot, suoritetut ty\u00f6lehdet ja yksi uusi opittu asia. Arvioi havainnointitaitoja, kirjallista ilmaisua ja kyky\u00e4 yhdist\u00e4\u00e4 oppiminen arkeen.',
      gradeLevel: '2.\u20133. lk',
    },
    {
      method: 'Kes\u00e4esineiden lajittelu- ja laskentateht\u00e4v\u00e4',
      criteria: 'Anna oppilaalle joukko kes\u00e4esinekuvia ja pyyd\u00e4 lajittelemaan ne kategorioihin kuten ranta, puutarha ja urheilu. Arvioi luokittelutaitojen hallintaa, lukum\u00e4\u00e4rien laskemista ja kyky\u00e4 perustella lajitteluvalintoja suomeksi.',
      gradeLevel: 'Esiopetus\u20131. lk',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Ymp\u00e4rist\u00f6oppi (vuodenajat ja vesi)',
      connection: 'Kes\u00e4 on ihanteellinen vuodenaika vesikierron, auringon vaikutuksen ja luonnon ekosysteemien tutkimiseen. POPS 2014:n ymp\u00e4rist\u00f6opin tavoitteet toteutuvat, kun oppilaat havainnoivat kes\u00e4ist\u00e4 luontoa, mittaavat l\u00e4mp\u00f6tiloja ja tutkivat vesiluontoa.',
      activity: 'Rantaesineiden lajitteluteht\u00e4v\u00e4n j\u00e4lkeen oppilaat tutkivat l\u00e4hirannan tai -j\u00e4rven ekosysteemi\u00e4, ker\u00e4\u00e4v\u00e4t havainnot ja vertaavat niit\u00e4 ty\u00f6lehden kategorioihin.',
    },
    {
      subject: '\u00c4idinkieli ja kirjallisuus',
      connection: 'Kes\u00e4sanasto kuten trooppinen, hengenpelastaja, aurinkovoide ja riippumatto laajentaa kuvailevaa sanavarastoa. Kes\u00e4p\u00e4iv\u00e4kirjan kirjoittaminen ja kes\u00e4kokemusten kuvaaminen kehitt\u00e4v\u00e4t narratiivista ja aistipohjaista ilmaisua.',
      activity: 'Sanahaun j\u00e4lkeen oppilaat kirjoittavat lyhyen kes\u00e4kuvauksen, jossa k\u00e4ytt\u00e4v\u00e4t v\u00e4hint\u00e4\u00e4n viitt\u00e4 kes\u00e4sanaa ja kaikkien aistien havaintoja.',
    },
    {
      subject: 'Matematiikka (mittaaminen ja aika)',
      connection: 'Kes\u00e4 tarjoaa luonnollisen kontekstin ajan mittaamiselle, l\u00e4mp\u00f6tilan seuraamiselle ja budjetoinnille. P\u00e4iv\u00e4n pituuden muutokset, lomap\u00e4ivien laskeminen ja kes\u00e4aktiviteettien kustannusten laskeminen yhdist\u00e4v\u00e4t matematiikan arkiel\u00e4m\u00e4\u00e4n.',
      activity: 'J\u00e4\u00e4tel\u00f6laskuteht\u00e4v\u00e4n j\u00e4lkeen oppilaat suunnittelevat kes\u00e4p\u00e4iv\u00e4n aikataulun, laskevat aktiviteettien kestot ja selvitt\u00e4v\u00e4t p\u00e4iv\u00e4n kokonaiskustannukset.',
    },
  ],

  uniqueAngle: 'Kes\u00e4aiheiset ty\u00f6lehdet vastaavat ainutlaatuiseen pedagogiseen haasteeseen, jota muut teemat eiv\u00e4t kohtaa samalla intensiteetill\u00e4: kes\u00e4liukuman ehk\u00e4isyyn eli dokumentoituun akateemisten taitojen heikkenemiseen pitk\u00e4n kouluauon aikana. Tutkimus osoittaa johdonmukaisesti, ett\u00e4 lapset voivat menett\u00e4\u00e4 yhdest\u00e4 kolmeen kuukautta matemaattista edistyst\u00e4 ja lukemisen sujuvuutta tyypillisen kes\u00e4loman aikana. Kes\u00e4ty\u00f6lehdet torjuvat t\u00e4m\u00e4n tarjoamalla s\u00e4\u00e4nn\u00f6llist\u00e4 taitoharjoittelua muodossa, joka tuntuu loman jatkeelta eik\u00e4 kouluty\u00f6lt\u00e4. Kes\u00e4teeman pedagoginen voima piilee sen universaalissa vetovoimassa: jokainen lapsi yhdist\u00e4\u00e4 kes\u00e4n vapauteen, hauskanpitoon ja seikkailuun, ja t\u00e4m\u00e4 tunnepohjainen yhteys tekee oppimisesta vapaaehtoista ja motivoivaa. Suomessa POPS 2014 korostaa oppimaan oppimisen taitoja ja itseohjautuvuutta, ja kes\u00e4ty\u00f6lehdet toteuttavat n\u00e4m\u00e4 tavoitteet konkreettisesti: lapsi valitsee itse milloin ja miss\u00e4 ty\u00f6skentelee, rakentaen itsesaatelyvalmiuksia. Suomen pitk\u00e4t kes\u00e4p\u00e4iv\u00e4t, m\u00f6kkikulttuuri ja rantael\u00e4m\u00e4 tarjoavat rikkaan kulttuurisen kontekstin, joka tekee kes\u00e4teemasta erityisen merkityksellisen suomalaisille lapsille.',

  researchCitation: 'Cooper, H., Nye, B., Charlton, K., Lindsay, J. & Greathouse, S. (1996). The Effects of Summer Vacation on Achievement Test Scores: A Narrative and Meta-Analytic Review. Review of Educational Research. Meta-analyysi osoitti, ett\u00e4 kes\u00e4loman aikainen akateeminen heikkeneminen on erityisen merkitt\u00e4v\u00e4\u00e4 matemaattisessa laskennassa ja lukemisen sujuvuudessa, ja s\u00e4\u00e4nn\u00f6llinen harjoittelu loman aikana ehk\u00e4isee suurimman osan t\u00e4st\u00e4 liukumasta.',

  culturalNotes: 'Suomessa kes\u00e4 on erityisen merkityksellinen vuodenaika: pitk\u00e4n, pime\u00e4n talven j\u00e4lkeen kes\u00e4n valo ja l\u00e4mp\u00f6 ovat koko kansan juhlimia. Juhannus on kes\u00e4n suurin juhla ja m\u00f6kkikulttuuri syvasti juurtunut suomalaiseen identiteettiin. POPS 2014 korostaa oppimaan oppimisen taitoja ja itseohjautuvuutta, ja kes\u00e4loman aikainen vapaaehtoinen oppiminen toteuttaa n\u00e4it\u00e4 tavoitteita. Suomalainen kes\u00e4loma on eurooppalaisittain pitk\u00e4 (2,5 kuukautta), mik\u00e4 tekee kes\u00e4liukuman ehk\u00e4isyst\u00e4 erityisen t\u00e4rke\u00e4ksi.',

  snippetDefinition: 'Kes\u00e4aiheiset ty\u00f6lehdet lapsille ovat tulostettavia oppimisteht\u00e4vi\u00e4, jotka k\u00e4ytt\u00e4v\u00e4t rantakohtausten, j\u00e4\u00e4tel\u00f6iden, simpukoiden ja auringonpaisteen kuvituksia matematiikan, lukemisen ja ongelmanratkaisun opettamiseen. Ne on suunniteltu 3\u20139-vuotiaille ja sis\u00e4lt\u00e4v\u00e4t laskuteht\u00e4vi\u00e4, sanahakuja, v\u00e4rityssivuja ja loogisia pulmia, jotka ehk\u00e4isev\u00e4t kes\u00e4liukumaa.',

  snippetHowTo: [
    'Valitse ty\u00f6lehdet lapsen kehitystason mukaan: nuoremmille rantakohtausten v\u00e4ritt\u00e4mist\u00e4 ja j\u00e4\u00e4tel\u00f6pallojen laskemista, vanhemmille sanallisia teht\u00e4vi\u00e4 ja kes\u00e4p\u00e4iv\u00e4kirjan pit\u00e4mist\u00e4.',
    'Aseta s\u00e4\u00e4nn\u00f6llinen kes\u00e4oppimisaikataulu: kaksi\u2013kolme lyhytt\u00e4 sessiota viikossa, kymmenen\u2013viisitoista minuuttia kerrallaan, on tutkimukseen perustuva optimaalinen m\u00e4\u00e4r\u00e4.',
    'Yhdist\u00e4 ty\u00f6lehdet todellisiin kes\u00e4kokemuksiin: rantamatikka ennen uima-altaalle menoa, sananetsint\u00e4 ev\u00e4sretken yhteydess\u00e4.',
    'Tulosta ty\u00f6lehti\u00e4 mukaan automatkoille, m\u00f6kkireissuille ja sadep\u00e4ivien varalle \u2014 ne ovat ihanteellisia ruutuvapaita matkakumppaneita.',
    'Luo kes\u00e4oppimispassi tai tarrakaavio, johon lapsi ker\u00e4\u00e4 merkint\u00f6j\u00e4 suoritetuista viikoista motivaation yll\u00e4pit\u00e4miseksi.',
    'Pid\u00e4 sessiot lyhyin\u00e4 ja positiivisina: johdonmukaisuus on t\u00e4rke\u00e4mp\u00e4\u00e4 kuin intensiteetti kes\u00e4liukuman ehk\u00e4isyss\u00e4.',
    'Toista viikottain ja seuraa edistymist\u00e4: vertaa syksyn l\u00e4ht\u00f6tasoa kes\u00e4n alun tasoon ja juhli saavutuksia.',
  ],

  limitations: 'Kes\u00e4aiheiset ty\u00f6lehdet ovat tehokkaimmillaan kes\u00e4kuukausina, ja niiden motivaatiovaikutus voi v\u00e4henty\u00e4 muina vuodenaikoina. Kes\u00e4loman pituus vaihtelee perheitt\u00e4in ja alueittain, mik\u00e4 vaikuttaa ty\u00f6lehtiaikataulun suunnitteluun. Vesiturvallisuus ja aurinkosuojaus on huomioitava, kun ty\u00f6lehtej\u00e4 yhdistet\u00e4\u00e4n kes\u00e4aktiviteetteihin.',

  themeComparisons: [
    { vsThemeId: 'ocean', summary: 'Kes\u00e4 sis\u00e4lt\u00e4\u00e4 meriaiheita osana laajempaa lomatunnelmaa, kun meriteema syventyy vedenalaiseen el\u00e4m\u00e4\u00e4n ja meribiologiaan ymp\u00e4ri vuoden. Kes\u00e4 painottaa rantalomailua ja vesileikkej\u00e4, meri tutkii ekosysteemej\u00e4.' },
    { vsThemeId: 'sports', summary: 'Kes\u00e4 on urheilun kulta-aikaa, mutta kes\u00e4teema kattaa laajemmin loman, luonnon ja vapaa-ajan. Urheiluteema keskittyy fyysiseen aktiivisuuteen ja s\u00e4\u00e4nt\u00f6jen oppimiseen vuodenajasta riippumatta.' },
    { vsThemeId: 'nature', summary: 'Kes\u00e4 on luonnon tuotteliasin vuodenaika, mutta kes\u00e4teema kattaa my\u00f6s kulttuurisen lomatunnelman, j\u00e4\u00e4tel\u00f6t ja vesileikkej\u00e4. Luontoteema k\u00e4sittelee ekosysteemej\u00e4 kokonaisvaltaisemmin vuodenajasta riippumatta.' },
    { vsThemeId: 'camping', summary: 'Leirintateema on kes\u00e4teeman luonnollinen kumppani, mutta kes\u00e4 kattaa laajemman kirjon aktiviteetteja rannasta uima-altaaseen ja juhannuksesta m\u00f6kkeilyyn. Leirint\u00e4 syventyy er\u00e4taitoihin ja luontosuhteeseen.' },
  ],

  productLinks: [
    { appId: 'coloring', anchorText: 'Kes\u00e4kohtausten v\u00e4rityssivut', context: 'V\u00e4rit\u00e4 rantakohtauksia, j\u00e4\u00e4tel\u00f6t\u00f6tter\u00f6it\u00e4 ja auringonpaistetta samalla kehitt\u00e4en hienomotoriikkaa ja kes\u00e4sanaston tunnistamista.' },
    { appId: 'find-and-count', anchorText: 'Laske kes\u00e4esineit\u00e4', context: 'Etsi ja laske simpukoita, j\u00e4\u00e4tel\u00f6palloja ja rantaesineit\u00e4 kes\u00e4kuvasta harjoitellen lukum\u00e4\u00e4rien tunnistamista ja havainnointia.' },
    { appId: 'word-search', anchorText: 'Kes\u00e4sanaston sanahaku', context: 'Etsi kes\u00e4sanastoa kuten hiekkalinna, aurinkovoide, uimapuku ja loma kirjainruudukosta lukutaidon ja oikeinkirjoituksen vahvistamiseksi.' },
    { appId: 'treasure-hunt', anchorText: 'Kes\u00e4inen aarteenetsint\u00e4', context: 'Ratkaise vihjeit\u00e4 ja etsi piilotettuja kes\u00e4aarteita rantakohtauksesta loogisen p\u00e4\u00e4ttelyn ja visuaalisen etsimisen harjoittamiseksi.' },
  ],

  expertTips: [
    { tip: 'Aloita kes\u00e4loman ensimm\u00e4isell\u00e4 viikolla perustamalla kes\u00e4oppimisrutiini: kolme lyhytt\u00e4 ty\u00f6lehtisessiota viikossa aamuisin ennen ulkoleikkej\u00e4. Rutiini on helpompi rakentaa loman alussa kuin elvytt\u00e4\u00e4 keskell\u00e4 kes\u00e4\u00e4.', source: 'Varhaiskasvatuksen pedagoginen asiantuntija', gradeRange: 'Esiopetus\u20131. lk' },
    { tip: 'Yhdist\u00e4 kes\u00e4ty\u00f6lehdet oikeaan kes\u00e4kokemukseen samana p\u00e4iv\u00e4n\u00e4: j\u00e4\u00e4tel\u00f6laskuteht\u00e4v\u00e4n j\u00e4lkeen vierailu j\u00e4\u00e4tel\u00f6kioskilla, rantamatikan j\u00e4lkeen uintireissu. V\u00e4lit\u00f6n yhteys paperilla oppimisen ja el\u00e4v\u00e4n kokemuksen v\u00e4lill\u00e4 on tehokkain vahvistuskeino.', source: 'Alkuopetuksen aineenopettaja', gradeRange: '2.\u20133. lk' },
    { tip: 'Kes\u00e4 on erinomainen aika maahanmuuttajalasten suomen kielen vahvistamiseen arkikontekstissa: kes\u00e4sanasto on konkreettista ja koettavissa, ja m\u00f6kkikulttuuri avaa ikkunan suomalaiseen el\u00e4m\u00e4ntapaan tavalla, joka tukee kotoutumista.', source: 'Erityispedagogiikan asiantuntija', gradeRange: 'Esiopetus\u20133. lk' },
  ],`;

// \u2500\u2500 Injection function \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

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

// \u2500\u2500 Main \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

const base = path.join(__dirname, '..', 'frontend', 'content', 'themes');

console.log('Part 186: Enriching FI theme hub page 50 (summer) with 14 fields...\n');
console.log('1. Injecting fields into summer/fi.ts...');
injectFields(path.join(base, 'summer', 'fi.ts'), summerFields);
console.log('\nDone! Summer FI theme hub page enriched with 14 SEO fields.');
console.log('All 50 FI theme hubs are now complete!');
