#!/usr/bin/env node
// ============================================================================
// Part 173: Replace Common Core curriculumAlignment with POPS 2014 in all 50
// Finnish theme files. Preserves existing relatedAppIds and adds new relevant
// ones where appropriate.
// ============================================================================

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

// ---------------------------------------------------------------------------
// POPS 2014 curriculum alignment mapping for all 50 Finnish themes
// ---------------------------------------------------------------------------
// Standard codes: POPS.[Subject].[GradeRange].[Objective]
//   MA = Matematiikka, AI = \u00c4idinkieli, YL = Ymp\u00e4rist\u00f6oppi
//   KU = Kuvataide, MU = Musiikki, LI = Liikunta, K\u00c4 = K\u00e4sity\u00f6
// ---------------------------------------------------------------------------

const POPS_MAPPING = {

  // === ANIMALS & NATURE =====================================================

  animals: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Kehitt\u00e4\u00e4 lukum\u00e4\u00e4r\u00e4k\u00e4sitett\u00e4 laskemalla el\u00e4imi\u00e4 kuvissa',
      relatedAppIds: ['image-addition'],
    },
    {
      standard: 'POPS.YL.1-2.T3',
      framework: 'POPS 2014',
      description: 'Tunnistaa erilaisia el\u00e4inlajeja ja niiden elinymp\u00e4rist\u00f6j\u00e4',
      relatedAppIds: ['find-and-count', 'find-objects'],
    },
    {
      standard: 'POPS.AI.1-2.T2',
      framework: 'POPS 2014',
      description: 'Harjoitella lukutaitoa el\u00e4inaiheisten sanojen avulla',
      relatedAppIds: ['word-search', 'image-crossword'],
    },
  ],

  birds: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Kehitt\u00e4\u00e4 lukum\u00e4\u00e4r\u00e4k\u00e4sitett\u00e4 laskemalla lintuja',
      relatedAppIds: ['image-addition'],
    },
    {
      standard: 'POPS.YL.1-2.T3',
      framework: 'POPS 2014',
      description: 'Tunnistaa suomalaisia lintulajeja ja niiden elinymp\u00e4rist\u00f6j\u00e4',
      relatedAppIds: ['find-and-count', 'matching-app'],
    },
    {
      standard: 'POPS.YL.1-2.T1',
      framework: 'POPS 2014',
      description: 'Havainnoida lintuja l\u00e4hiluonnossa eri vuodenaikoina',
      relatedAppIds: ['find-objects'],
    },
  ],

  dinosaurs: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Kehitt\u00e4\u00e4 lukum\u00e4\u00e4r\u00e4k\u00e4sitett\u00e4 laskemalla dinosauruksia',
      relatedAppIds: ['image-addition'],
    },
    {
      standard: 'POPS.YL.1-2.T1',
      framework: 'POPS 2014',
      description: 'Tehd\u00e4 havaintoja menneisyyden eli\u00f6ist\u00e4 ja niiden ominaisuuksista',
      relatedAppIds: ['find-and-count', 'find-objects'],
    },
    {
      standard: 'POPS.MA.1-2.T6',
      framework: 'POPS 2014',
      description: 'Vertailla dinosaurusten kokoja ja ominaisuuksia',
      relatedAppIds: ['big-small-app', 'more-less'],
    },
  ],

  farm: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Kehitt\u00e4\u00e4 lukum\u00e4\u00e4r\u00e4k\u00e4sitett\u00e4 laskemalla maatilan el\u00e4imi\u00e4',
      relatedAppIds: ['image-addition', 'more-less'],
    },
    {
      standard: 'POPS.YL.1-2.T3',
      framework: 'POPS 2014',
      description: 'Tunnistaa maatilan el\u00e4imi\u00e4 ja ymm\u00e4rt\u00e4\u00e4 ruoantuotantoa',
      relatedAppIds: ['find-and-count', 'matching-app'],
    },
    {
      standard: 'POPS.YL.1-2.T2',
      framework: 'POPS 2014',
      description: 'Tutustua maatilan ymp\u00e4rist\u00f6\u00f6n ja maatalouteen',
      relatedAppIds: ['find-objects'],
    },
  ],

  forest: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Kehitt\u00e4\u00e4 lukum\u00e4\u00e4r\u00e4k\u00e4sitett\u00e4 laskemalla mets\u00e4n el\u00e4imi\u00e4',
      relatedAppIds: ['image-addition'],
    },
    {
      standard: 'POPS.YL.1-2.T3',
      framework: 'POPS 2014',
      description: 'Tunnistaa suomalaisen mets\u00e4n eli\u00f6it\u00e4 ja kasveja',
      relatedAppIds: ['find-and-count', 'find-objects'],
    },
    {
      standard: 'POPS.YL.1-2.T1',
      framework: 'POPS 2014',
      description: 'Havainnoida mets\u00e4luontoa ja sen monimuotoisuutta',
      relatedAppIds: ['matching-app', 'picture-sort'],
    },
  ],

  flowers: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Harjoitella laskemista kukka-aiheisilla teht\u00e4vill\u00e4',
      relatedAppIds: ['image-addition', 'find-and-count'],
    },
    {
      standard: 'POPS.YL.1-2.T3',
      framework: 'POPS 2014',
      description: 'Tunnistaa erilaisia kukkia ja ymm\u00e4rt\u00e4\u00e4 kasvien kasvu',
      relatedAppIds: ['matching-app', 'find-objects'],
    },
    {
      standard: 'POPS.KU.1-2.T1',
      framework: 'POPS 2014',
      description: 'Havainnoida kukkien v\u00e4rej\u00e4 ja muotoja kuvallisesti',
      relatedAppIds: ['coloring', 'draw-and-color'],
    },
  ],

  fruits: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Harjoitella laskemista hedelm\u00e4aiheisilla teht\u00e4vill\u00e4',
      relatedAppIds: ['image-addition', 'find-and-count'],
    },
    {
      standard: 'POPS.YL.1-2.T4',
      framework: 'POPS 2014',
      description: 'Ymm\u00e4rt\u00e4\u00e4 hedelmien merkitys terveellisess\u00e4 ravinnossa',
      relatedAppIds: ['picture-sort'],
    },
    {
      standard: 'POPS.MA.1-2.T7',
      framework: 'POPS 2014',
      description: 'Luokitella hedelmi\u00e4 v\u00e4rin, koon ja muodon mukaan',
      relatedAppIds: ['picture-sort', 'matching-app'],
    },
  ],

  garden: [
    {
      standard: 'POPS.YL.1-2.T3',
      framework: 'POPS 2014',
      description: 'Havainnoida puutarhan kasveja ja eli\u00f6it\u00e4',
      relatedAppIds: ['find-and-count', 'find-objects'],
    },
    {
      standard: 'POPS.MA.1-2.T7',
      framework: 'POPS 2014',
      description: 'Luokitella puutarhan kasveja ja v\u00e4rej\u00e4',
      relatedAppIds: ['chart-count-color', 'picture-sort'],
    },
    {
      standard: 'POPS.YL.1-2.T2',
      framework: 'POPS 2014',
      description: 'Tutustua puutarhanhoitoon ja kasvien kasvattamiseen',
      relatedAppIds: ['matching-app'],
    },
  ],

  insects: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Harjoitella laskemista hy\u00f6nteisaiheisilla teht\u00e4vill\u00e4',
      relatedAppIds: ['image-addition', 'chart-count-color'],
    },
    {
      standard: 'POPS.YL.1-2.T3',
      framework: 'POPS 2014',
      description: 'Tunnistaa erilaisia hy\u00f6nteislajeja ja niiden piirteit\u00e4',
      relatedAppIds: ['find-and-count', 'matching-app'],
    },
    {
      standard: 'POPS.YL.1-2.T1',
      framework: 'POPS 2014',
      description: 'Havainnoida hy\u00f6nteisi\u00e4 l\u00e4hiluonnossa',
      relatedAppIds: ['find-objects'],
    },
  ],

  nature: [
    {
      standard: 'POPS.YL.1-2.T1',
      framework: 'POPS 2014',
      description: 'Tehd\u00e4 havaintoja luonnon monimuotoisuudesta l\u00e4hiymp\u00e4rist\u00f6ss\u00e4',
      relatedAppIds: ['find-and-count', 'find-objects'],
    },
    {
      standard: 'POPS.YL.1-2.T3',
      framework: 'POPS 2014',
      description: 'Tunnistaa kasveja ja el\u00e4imi\u00e4 luonnossa',
      relatedAppIds: ['matching-app', 'picture-sort'],
    },
    {
      standard: 'POPS.MA.1-2.T7',
      framework: 'POPS 2014',
      description: 'Luokitella luonnonilmi\u00f6it\u00e4 ja eli\u00f6it\u00e4',
      relatedAppIds: ['find-and-count', 'matching-app'],
    },
  ],

  ocean: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Kehitt\u00e4\u00e4 lukum\u00e4\u00e4r\u00e4k\u00e4sitett\u00e4 laskemalla merienelvi\u00e4',
      relatedAppIds: ['image-addition'],
    },
    {
      standard: 'POPS.YL.1-2.T3',
      framework: 'POPS 2014',
      description: 'Tunnistaa merieli\u00f6it\u00e4 ja ymm\u00e4rt\u00e4\u00e4 meriymp\u00e4rist\u00f6\u00e4',
      relatedAppIds: ['find-and-count', 'find-objects'],
    },
    {
      standard: 'POPS.YL.1-2.T1',
      framework: 'POPS 2014',
      description: 'Havainnoida veden ja meren ominaisuuksia',
      relatedAppIds: ['matching-app', 'picture-sort'],
    },
  ],

  pets: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Harjoitella laskemista lemmikkiel\u00e4inaiheisilla teht\u00e4vill\u00e4',
      relatedAppIds: ['image-addition', 'find-and-count'],
    },
    {
      standard: 'POPS.YL.1-2.T3',
      framework: 'POPS 2014',
      description: 'Tunnistaa lemmikkiel\u00e4imi\u00e4 ja ymm\u00e4rt\u00e4\u00e4 niiden hoitoa',
      relatedAppIds: ['matching-app'],
    },
    {
      standard: 'POPS.YL.1-2.T4',
      framework: 'POPS 2014',
      description: 'Oppia vastuullista lemmikkiel\u00e4inten hoitoa',
      relatedAppIds: ['picture-sort'],
    },
  ],

  vegetables: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Harjoitella laskemista vihannesaiheisilla teht\u00e4vill\u00e4',
      relatedAppIds: ['image-addition', 'find-and-count'],
    },
    {
      standard: 'POPS.YL.1-2.T4',
      framework: 'POPS 2014',
      description: 'Ymm\u00e4rt\u00e4\u00e4 vihannesten merkitys terveellisess\u00e4 ravinnossa',
      relatedAppIds: ['picture-sort'],
    },
    {
      standard: 'POPS.MA.1-2.T7',
      framework: 'POPS 2014',
      description: 'Luokitella vihanneksia eri ominaisuuksien mukaan',
      relatedAppIds: ['matching-app'],
    },
  ],

  zoo: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Harjoitella laskemista el\u00e4intarha-aiheisilla teht\u00e4vill\u00e4',
      relatedAppIds: ['image-addition', 'find-and-count'],
    },
    {
      standard: 'POPS.YL.1-2.T3',
      framework: 'POPS 2014',
      description: 'Tunnistaa eksoottisia el\u00e4imi\u00e4 ja niiden elinymp\u00e4rist\u00f6j\u00e4',
      relatedAppIds: ['matching-app', 'find-objects'],
    },
    {
      standard: 'POPS.MA.1-2.T7',
      framework: 'POPS 2014',
      description: 'Luokitella el\u00e4intarhan el\u00e4imi\u00e4 eri ryhmiin',
      relatedAppIds: ['picture-sort'],
    },
  ],

  // === MATH-FOCUSED =========================================================

  numbers: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Kehitt\u00e4\u00e4 lukum\u00e4\u00e4r\u00e4k\u00e4sitett\u00e4 ja laskutaitoja monipuolisesti',
      relatedAppIds: ['chart-count-color', 'find-and-count'],
    },
    {
      standard: 'POPS.MA.1-2.T3',
      framework: 'POPS 2014',
      description: 'Harjoitella yhteen- ja v\u00e4hennyslaskua sujuvasti',
      relatedAppIds: ['image-addition', 'subtraction'],
    },
    {
      standard: 'POPS.MA.1-2.T7',
      framework: 'POPS 2014',
      description: 'Tunnistaa lukujonoissa esiintyvi\u00e4 s\u00e4\u00e4nn\u00f6nmukaisuuksia',
      relatedAppIds: ['math-worksheet', 'math-puzzle'],
    },
  ],

  shapes: [
    {
      standard: 'POPS.MA.1-2.T5',
      framework: 'POPS 2014',
      description: 'Tunnistaa ja nimet\u00e4 perusmuodot sek\u00e4 niiden ominaisuudet',
      relatedAppIds: ['matching-app', 'shadow-match'],
    },
    {
      standard: 'POPS.KU.1-2.T1',
      framework: 'POPS 2014',
      description: 'Havainnoida muotoja ymp\u00e4rist\u00f6ss\u00e4 ja kuvataiteessa',
      relatedAppIds: ['coloring', 'draw-and-color'],
    },
    {
      standard: 'POPS.MA.1-2.T7',
      framework: 'POPS 2014',
      description: 'Luokitella kappaleita muodon ja koon mukaan',
      relatedAppIds: ['picture-sort', 'big-small-app'],
    },
  ],

  // === LITERACY =============================================================

  alphabet: [
    {
      standard: 'POPS.AI.1-2.T2',
      framework: 'POPS 2014',
      description: 'Tunnistaa ja nimet\u00e4 kirjaimet sek\u00e4 kehitt\u00e4\u00e4 lukutaitoa',
      relatedAppIds: ['alphabet-train', 'matching-app'],
    },
    {
      standard: 'POPS.AI.1-2.T3',
      framework: 'POPS 2014',
      description: 'Harjoitella kirjainten kirjoittamista ja oikeinkirjoitusta',
      relatedAppIds: ['writing-app'],
    },
    {
      standard: 'POPS.AI.1-2.T1',
      framework: 'POPS 2014',
      description: 'Kehitt\u00e4\u00e4 \u00e4\u00e4nnetietoisuutta ja foneemien tunnistamista',
      relatedAppIds: ['word-guess', 'image-crossword'],
    },
  ],

  'fairy-tales': [
    {
      standard: 'POPS.AI.1-2.T4',
      framework: 'POPS 2014',
      description: 'Tutustua satuihin ja niiden rakenteeseen',
      relatedAppIds: ['word-search', 'word-guess'],
    },
    {
      standard: 'POPS.AI.1-2.T2',
      framework: 'POPS 2014',
      description: 'Kehitt\u00e4\u00e4 lukutaitoa satuaiheisten tekstien avulla',
      relatedAppIds: ['word-search', 'image-crossword'],
    },
    {
      standard: 'POPS.AI.1-2.T1',
      framework: 'POPS 2014',
      description: 'Ilmaista ajatuksia ja kokemuksia satujen pohjalta',
      relatedAppIds: ['writing-app'],
    },
  ],

  // === CREATIVE =============================================================

  colors: [
    {
      standard: 'POPS.MA.1-2.T7',
      framework: 'POPS 2014',
      description: 'Luokitella esineit\u00e4 v\u00e4rin mukaan ja laskea v\u00e4riryhmien koot',
      relatedAppIds: ['picture-sort', 'chart-count-color'],
    },
    {
      standard: 'POPS.KU.1-2.T1',
      framework: 'POPS 2014',
      description: 'Havainnoida ja tunnistaa v\u00e4rej\u00e4 ymp\u00e4rist\u00f6ss\u00e4',
      relatedAppIds: ['coloring', 'draw-and-color'],
    },
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Harjoitella laskemista v\u00e4rikategorioiden avulla',
      relatedAppIds: ['find-and-count', 'image-addition'],
    },
  ],

  music: [
    {
      standard: 'POPS.MU.1-2.T1',
      framework: 'POPS 2014',
      description: 'Osallistua musiikilliseen toimintaan ja tunnistaa rytmej\u00e4',
      relatedAppIds: ['pattern-train', 'pattern-worksheet'],
    },
    {
      standard: 'POPS.MA.1-2.T7',
      framework: 'POPS 2014',
      description: 'Tunnistaa musiikissa esiintyvi\u00e4 s\u00e4\u00e4nn\u00f6nmukaisuuksia ja kuvioita',
      relatedAppIds: ['pattern-train'],
    },
    {
      standard: 'POPS.KU.1-2.T1',
      framework: 'POPS 2014',
      description: 'Ilmaista musiikkia visuaalisesti piirt\u00e4en ja v\u00e4ritt\u00e4en',
      relatedAppIds: ['coloring', 'draw-and-color'],
    },
  ],

  // === SEASONAL / WEATHER ===================================================

  seasons: [
    {
      standard: 'POPS.YL.1-2.T2',
      framework: 'POPS 2014',
      description: 'Havainnoida vuodenaikojen vaihtelua ja sen vaikutuksia luontoon',
      relatedAppIds: ['picture-sort', 'matching-app'],
    },
    {
      standard: 'POPS.MA.1-2.T7',
      framework: 'POPS 2014',
      description: 'Luokitella vuodenaikoihin liittyvi\u00e4 asioita',
      relatedAppIds: ['picture-sort'],
    },
    {
      standard: 'POPS.YL.1-2.T1',
      framework: 'POPS 2014',
      description: 'Tehd\u00e4 havaintoja vuodenaikojen kierrosta l\u00e4hiymp\u00e4rist\u00f6ss\u00e4',
      relatedAppIds: ['find-and-count'],
    },
  ],

  spring: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Harjoitella laskemista kev\u00e4taiheisilla teht\u00e4vill\u00e4',
      relatedAppIds: ['image-addition', 'find-and-count'],
    },
    {
      standard: 'POPS.YL.1-2.T1',
      framework: 'POPS 2014',
      description: 'Havainnoida kev\u00e4\u00e4n merkkej\u00e4 luonnossa',
      relatedAppIds: ['find-and-count', 'find-objects'],
    },
    {
      standard: 'POPS.YL.1-2.T3',
      framework: 'POPS 2014',
      description: 'Tutustua kev\u00e4\u00e4n vaikutukseen eli\u00f6ihin ja kasveihin',
      relatedAppIds: ['matching-app'],
    },
  ],

  summer: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Harjoitella laskemista kes\u00e4aiheisilla teht\u00e4vill\u00e4',
      relatedAppIds: ['image-addition', 'find-and-count'],
    },
    {
      standard: 'POPS.YL.1-2.T1',
      framework: 'POPS 2014',
      description: 'Havainnoida kes\u00e4ist\u00e4 luontoa ja sen ominaispiirteit\u00e4',
      relatedAppIds: ['find-and-count', 'find-objects'],
    },
    {
      standard: 'POPS.YL.1-2.T2',
      framework: 'POPS 2014',
      description: 'Tutustua kes\u00e4isiin aktiviteetteihin ja luontoon',
      relatedAppIds: ['matching-app'],
    },
  ],

  winter: [
    {
      standard: 'POPS.MA.1-2.T3',
      framework: 'POPS 2014',
      description: 'Harjoitella yhteen- ja v\u00e4hennyslaskua talviaiheilla',
      relatedAppIds: ['image-addition'],
    },
    {
      standard: 'POPS.YL.1-2.T1',
      framework: 'POPS 2014',
      description: 'Havainnoida talvista luontoa ja sen ilmi\u00f6it\u00e4',
      relatedAppIds: ['find-and-count', 'find-objects'],
    },
    {
      standard: 'POPS.YL.1-2.T2',
      framework: 'POPS 2014',
      description: 'Ymm\u00e4rt\u00e4\u00e4 talven vaikutus eli\u00f6ihin ja ymp\u00e4rist\u00f6\u00f6n',
      relatedAppIds: ['matching-app', 'picture-sort'],
    },
  ],

  weather: [
    {
      standard: 'POPS.YL.1-2.T1',
      framework: 'POPS 2014',
      description: 'Havainnoida s\u00e4\u00e4tiloja ja niiden muutoksia',
      relatedAppIds: ['picture-sort', 'matching-app'],
    },
    {
      standard: 'POPS.MA.1-2.T7',
      framework: 'POPS 2014',
      description: 'Luokitella ja vertailla erilaisia s\u00e4\u00e4ilmi\u00f6it\u00e4',
      relatedAppIds: ['picture-sort'],
    },
    {
      standard: 'POPS.YL.1-2.T2',
      framework: 'POPS 2014',
      description: 'Ymm\u00e4rt\u00e4\u00e4 s\u00e4\u00e4n vaikutus arkiel\u00e4m\u00e4\u00e4n ja luontoon',
      relatedAppIds: ['find-and-count'],
    },
  ],

  // === LIFE SKILLS ==========================================================

  body: [
    {
      standard: 'POPS.YL.1-2.T4',
      framework: 'POPS 2014',
      description: 'Tunnistaa kehon osat ja ymm\u00e4rt\u00e4\u00e4 niiden toiminta',
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
      description: 'Oppia kehon osiin liittyv\u00e4\u00e4 sanastoa',
      relatedAppIds: ['word-search', 'image-crossword'],
    },
  ],

  clothing: [
    {
      standard: 'POPS.MA.1-2.T7',
      framework: 'POPS 2014',
      description: 'Luokitella ja lajitella vaatteita eri ominaisuuksien mukaan',
      relatedAppIds: ['big-small-app', 'shadow-match'],
    },
    {
      standard: 'POPS.YL.1-2.T4',
      framework: 'POPS 2014',
      description: 'Ymm\u00e4rt\u00e4\u00e4 pukeutumisen merkitys s\u00e4\u00e4n ja tilanteen mukaan',
      relatedAppIds: ['picture-sort'],
    },
    {
      standard: 'POPS.AI.1-2.T2',
      framework: 'POPS 2014',
      description: 'Oppia vaatteisiin liittyv\u00e4\u00e4 sanastoa',
      relatedAppIds: ['word-search'],
    },
  ],

  cooking: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Harjoitella laskemista ja mittaamista ruoanlaiton yhteydess\u00e4',
      relatedAppIds: ['find-and-count'],
    },
    {
      standard: 'POPS.YL.1-2.T4',
      framework: 'POPS 2014',
      description: 'Ymm\u00e4rt\u00e4\u00e4 ruoanvalmistuksen ja terveellisen ravinnon perusteet',
      relatedAppIds: ['picture-sort', 'matching-app'],
    },
    {
      standard: 'POPS.MA.1-2.T6',
      framework: 'POPS 2014',
      description: 'Oppia mittayksik\u00f6it\u00e4 reseptien avulla',
      relatedAppIds: ['math-worksheet'],
    },
  ],

  emotions: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Laskea ja tunnistaa erilaisia tunteita kuvateht\u00e4viss\u00e4',
      relatedAppIds: ['image-addition'],
    },
    {
      standard: 'POPS.YL.1-2.T4',
      framework: 'POPS 2014',
      description: 'Tunnistaa ja nimet\u00e4 erilaisia tunteita',
      relatedAppIds: ['matching-app', 'picture-sort'],
    },
    {
      standard: 'POPS.AI.1-2.T1',
      framework: 'POPS 2014',
      description: 'Ilmaista omia tunteita ja ajatuksia sanallisesti',
      relatedAppIds: ['word-guess'],
    },
  ],

  food: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Harjoitella lukum\u00e4\u00e4rien laskemista ruoka-aineilla',
      relatedAppIds: ['find-and-count', 'chart-count-color'],
    },
    {
      standard: 'POPS.MA.1-2.T3',
      framework: 'POPS 2014',
      description: 'Kehitt\u00e4\u00e4 yhteen- ja v\u00e4hennyslaskutaitoja ruokamatematiikalla',
      relatedAppIds: ['image-addition', 'subtraction'],
    },
    {
      standard: 'POPS.YL.1-2.T4',
      framework: 'POPS 2014',
      description: 'Ymm\u00e4rt\u00e4\u00e4 terveellisen ravinnon merkitys hyvinvoinnille',
      relatedAppIds: ['picture-sort'],
    },
    {
      standard: 'POPS.MA.1-2.T7',
      framework: 'POPS 2014',
      description: 'Luokitella ruoka-aineita eri kategorioihin',
      relatedAppIds: ['chart-count-color'],
    },
  ],

  furniture: [
    {
      standard: 'POPS.MA.1-2.T5',
      framework: 'POPS 2014',
      description: 'Hahmottaa avaruudellisia suhteita ja sijainteja huonekalujen avulla',
      relatedAppIds: ['prepositions'],
    },
    {
      standard: 'POPS.YL.1-2.T2',
      framework: 'POPS 2014',
      description: 'Tutustua kodin tiloihin ja niiden k\u00e4ytt\u00f6tarkoituksiin',
      relatedAppIds: ['matching-app', 'find-objects'],
    },
    {
      standard: 'POPS.AI.1-2.T2',
      framework: 'POPS 2014',
      description: 'Laajentaa huonekaluihin liittyv\u00e4\u00e4 sanastoa',
      relatedAppIds: ['word-search'],
    },
  ],

  household: [
    {
      standard: 'POPS.MA.1-2.T5',
      framework: 'POPS 2014',
      description: 'Hahmottaa avaruudellisia suhteita kodin ymp\u00e4rist\u00f6ss\u00e4',
      relatedAppIds: ['prepositions'],
    },
    {
      standard: 'POPS.YL.1-2.T2',
      framework: 'POPS 2014',
      description: 'Tutustua kodin esineisiin ja niiden k\u00e4ytt\u00f6tarkoituksiin',
      relatedAppIds: ['matching-app', 'find-objects'],
    },
    {
      standard: 'POPS.AI.1-2.T2',
      framework: 'POPS 2014',
      description: 'Laajentaa kodin esineisiin liittyv\u00e4\u00e4 sanastoa',
      relatedAppIds: ['word-search'],
    },
  ],

  jobs: [
    {
      standard: 'POPS.MA.1-2.T3',
      framework: 'POPS 2014',
      description: 'Harjoitella yhteen- ja v\u00e4hennyslaskua ammattiaiheilla',
      relatedAppIds: ['image-addition'],
    },
    {
      standard: 'POPS.YL.1-2.T2',
      framework: 'POPS 2014',
      description: 'Tutustua erilaisiin ammatteihin ja niiden merkitykseen yhteiskunnassa',
      relatedAppIds: ['matching-app', 'find-objects'],
    },
    {
      standard: 'POPS.AI.1-2.T2',
      framework: 'POPS 2014',
      description: 'Laajentaa ammattisanastoa lukemisen avulla',
      relatedAppIds: ['word-search', 'word-guess'],
    },
  ],

  school: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Harjoitella laskemista koulun arjessa esiintyvill\u00e4 esineill\u00e4',
      relatedAppIds: ['find-and-count', 'image-addition'],
    },
    {
      standard: 'POPS.AI.1-2.T2',
      framework: 'POPS 2014',
      description: 'Kehitt\u00e4\u00e4 lukutaitoa kouluaiheisten tekstien avulla',
      relatedAppIds: ['word-search', 'word-guess'],
    },
    {
      standard: 'POPS.YL.1-2.T2',
      framework: 'POPS 2014',
      description: 'Tutustua koulun ymp\u00e4rist\u00f6\u00f6n ja yhteis\u00f6\u00f6n',
      relatedAppIds: ['matching-app'],
    },
  ],

  sports: [
    {
      standard: 'POPS.MA.1-2.T3',
      framework: 'POPS 2014',
      description: 'Harjoitella yhteen- ja v\u00e4hennyslaskua urheiluaiheilla',
      relatedAppIds: ['image-addition', 'math-worksheet'],
    },
    {
      standard: 'POPS.LI.1-2.T1',
      framework: 'POPS 2014',
      description: 'Kehitt\u00e4\u00e4 motorisia perustaitoja liikuntaleikkien avulla',
      relatedAppIds: ['matching-app'],
    },
    {
      standard: 'POPS.MA.1-2.T6',
      framework: 'POPS 2014',
      description: 'Ymm\u00e4rt\u00e4\u00e4 mittaamisen perusteita urheilun yhteydess\u00e4',
      relatedAppIds: ['math-worksheet'],
    },
  ],

  // === FANTASY / ADVENTURE ==================================================

  construction: [
    {
      standard: 'POPS.MA.1-2.T3',
      framework: 'POPS 2014',
      description: 'Harjoitella yhteen- ja v\u00e4hennyslaskua rakennusaiheilla',
      relatedAppIds: ['image-addition', 'math-worksheet'],
    },
    {
      standard: 'POPS.MA.1-2.T5',
      framework: 'POPS 2014',
      description: 'Hahmottaa geometrisia muotoja rakentamisessa',
      relatedAppIds: ['matching-app', 'shadow-match'],
    },
    {
      standard: 'POPS.K\u00c4.1-2.T1',
      framework: 'POPS 2014',
      description: 'Kehitt\u00e4\u00e4 suunnittelun ja rakentamisen taitoja',
      relatedAppIds: ['coloring'],
    },
  ],

  pirates: [
    {
      standard: 'POPS.MA.1-2.T3',
      framework: 'POPS 2014',
      description: 'Harjoitella yhteen- ja v\u00e4hennyslaskua merirosvoteemalla',
      relatedAppIds: ['image-addition'],
    },
    {
      standard: 'POPS.MA.1-2.T5',
      framework: 'POPS 2014',
      description: 'Hahmottaa avaruudellisia suhteita aarrekarttojen avulla',
      relatedAppIds: ['treasure-hunt'],
    },
    {
      standard: 'POPS.AI.1-2.T4',
      framework: 'POPS 2014',
      description: 'Tutustua seikkailutarinoihin ja kehitt\u00e4\u00e4 mielikuvitusta',
      relatedAppIds: ['word-search', 'word-guess'],
    },
  ],

  robots: [
    {
      standard: 'POPS.MA.1-2.T3',
      framework: 'POPS 2014',
      description: 'Harjoitella yhteen- ja v\u00e4hennyslaskua robottiteemalla',
      relatedAppIds: ['image-addition', 'code-addition'],
    },
    {
      standard: 'POPS.MA.1-2.T7',
      framework: 'POPS 2014',
      description: 'Tunnistaa s\u00e4\u00e4nn\u00f6nmukaisuuksia ja ohjelmoinnin perusteita',
      relatedAppIds: ['pattern-train', 'code-addition'],
    },
    {
      standard: 'POPS.MA.1-2.T5',
      framework: 'POPS 2014',
      description: 'Hahmottaa muotoja ja rakenteita robottien suunnittelussa',
      relatedAppIds: ['matching-app'],
    },
  ],

  space: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Kehitt\u00e4\u00e4 lukum\u00e4\u00e4r\u00e4k\u00e4sitett\u00e4 avaruusaiheisilla laskuteht\u00e4vill\u00e4',
      relatedAppIds: ['image-addition', 'code-addition'],
    },
    {
      standard: 'POPS.YL.1-2.T1',
      framework: 'POPS 2014',
      description: 'Tehd\u00e4 havaintoja avaruudesta ja taivaankappaleista',
      relatedAppIds: ['find-and-count', 'find-objects'],
    },
    {
      standard: 'POPS.MA.1-2.T5',
      framework: 'POPS 2014',
      description: 'Hahmottaa avaruudellisia muotoja ja suhteita',
      relatedAppIds: ['matching-app'],
    },
  ],

  superheroes: [
    {
      standard: 'POPS.AI.1-2.T4',
      framework: 'POPS 2014',
      description: 'Tutustua sankaritarinoihin ja kehitt\u00e4\u00e4 kerrontataitoja',
      relatedAppIds: ['word-search', 'word-guess'],
    },
    {
      standard: 'POPS.MA.1-2.T3',
      framework: 'POPS 2014',
      description: 'Harjoitella yhteen- ja v\u00e4hennyslaskua sankariteemalla',
      relatedAppIds: ['image-addition'],
    },
    {
      standard: 'POPS.KU.1-2.T1',
      framework: 'POPS 2014',
      description: 'Suunnitella ja piirt\u00e4\u00e4 omia supersankareja',
      relatedAppIds: ['coloring', 'draw-and-color'],
    },
  ],

  travel: [
    {
      standard: 'POPS.MA.1-2.T3',
      framework: 'POPS 2014',
      description: 'Harjoitella yhteen- ja v\u00e4hennyslaskua matkailuaiheilla',
      relatedAppIds: ['image-addition'],
    },
    {
      standard: 'POPS.YL.1-2.T2',
      framework: 'POPS 2014',
      description: 'Tutustua erilaisiin maihin, kulttuureihin ja ymp\u00e4rist\u00f6ihin',
      relatedAppIds: ['matching-app', 'find-objects'],
    },
    {
      standard: 'POPS.MA.1-2.T5',
      framework: 'POPS 2014',
      description: 'Hahmottaa et\u00e4isyyksi\u00e4 ja suuntia karttojen avulla',
      relatedAppIds: ['treasure-hunt'],
    },
  ],

  transportation: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Kehitt\u00e4\u00e4 lukum\u00e4\u00e4r\u00e4k\u00e4sitett\u00e4 laskemalla kulkuneuvoja',
      relatedAppIds: ['image-addition', 'math-worksheet'],
    },
    {
      standard: 'POPS.MA.1-2.T3',
      framework: 'POPS 2014',
      description: 'Harjoitella yhteen- ja v\u00e4hennyslaskua liikenneaiheilla',
      relatedAppIds: ['image-addition', 'subtraction'],
    },
    {
      standard: 'POPS.YL.1-2.T2',
      framework: 'POPS 2014',
      description: 'Tutustua erilaisiin kulkuneuvoihin ja liikenneymp\u00e4rist\u00f6ihin',
      relatedAppIds: ['find-and-count', 'matching-app'],
    },
  ],

  // === HOLIDAY / CULTURAL ===================================================

  birthday: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Harjoitella laskemista syntymp\u00e4iv\u00e4aiheisilla teht\u00e4vill\u00e4',
      relatedAppIds: ['image-addition', 'find-and-count'],
    },
    {
      standard: 'POPS.YL.1-2.T2',
      framework: 'POPS 2014',
      description: 'Tutustua juhlaperinteisiin ja yhteis\u00f6llisyyteen',
      relatedAppIds: ['matching-app'],
    },
    {
      standard: 'POPS.KU.1-2.T1',
      framework: 'POPS 2014',
      description: 'Suunnitella syntymp\u00e4iv\u00e4kortteja ja koristeita',
      relatedAppIds: ['coloring', 'draw-and-color'],
    },
  ],

  circus: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Harjoitella laskemista sirkusaiheisilla teht\u00e4vill\u00e4',
      relatedAppIds: ['image-addition', 'find-and-count'],
    },
    {
      standard: 'POPS.KU.1-2.T1',
      framework: 'POPS 2014',
      description: 'Havainnoida sirkuksen v\u00e4rikkytt\u00e4 ja liikett\u00e4 kuvallisesti',
      relatedAppIds: ['coloring', 'draw-and-color'],
    },
    {
      standard: 'POPS.MA.1-2.T7',
      framework: 'POPS 2014',
      description: 'Tunnistaa kuvioita ja s\u00e4\u00e4nn\u00f6nmukaisuuksia sirkusesityksiss\u00e4',
      relatedAppIds: ['pattern-train'],
    },
  ],

  easter: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Harjoitella laskemista p\u00e4\u00e4si\u00e4isaiheisilla teht\u00e4vill\u00e4',
      relatedAppIds: ['image-addition', 'find-and-count'],
    },
    {
      standard: 'POPS.YL.1-2.T2',
      framework: 'POPS 2014',
      description: 'Tutustua p\u00e4\u00e4si\u00e4isen perinteisiin ja kev\u00e4\u00e4n merkkeihin',
      relatedAppIds: ['matching-app'],
    },
    {
      standard: 'POPS.KU.1-2.T1',
      framework: 'POPS 2014',
      description: 'Ilmaista p\u00e4\u00e4si\u00e4isaiheita kuvallisesti',
      relatedAppIds: ['coloring', 'draw-and-color'],
    },
  ],

  halloween: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Harjoitella laskemista halloween-aiheisilla teht\u00e4vill\u00e4',
      relatedAppIds: ['image-addition', 'find-objects'],
    },
    {
      standard: 'POPS.AI.1-2.T4',
      framework: 'POPS 2014',
      description: 'Tutustua halloween-aiheisiin tarinoihin ja sanastoon',
      relatedAppIds: ['word-search', 'word-guess'],
    },
    {
      standard: 'POPS.KU.1-2.T1',
      framework: 'POPS 2014',
      description: 'Ilmaista halloween-aiheita kuvallisesti',
      relatedAppIds: ['coloring'],
    },
  ],

  holidays: [
    {
      standard: 'POPS.MA.1-2.T2',
      framework: 'POPS 2014',
      description: 'Harjoitella laskemista juhlapy\u00e4h\u00e4aiheisilla teht\u00e4vill\u00e4',
      relatedAppIds: ['image-addition', 'find-and-count'],
    },
    {
      standard: 'POPS.AI.1-2.T4',
      framework: 'POPS 2014',
      description: 'Tutustua juhlaperinteisiin liittyviin tarinoihin',
      relatedAppIds: ['word-search', 'word-guess'],
    },
    {
      standard: 'POPS.YL.1-2.T2',
      framework: 'POPS 2014',
      description: 'Ymm\u00e4rt\u00e4\u00e4 suomalaisten juhlapy\u00e4hien merkitys ja perinteet',
      relatedAppIds: ['matching-app'],
    },
  ],

  toys: [
    {
      standard: 'POPS.MA.1-2.T6',
      framework: 'POPS 2014',
      description: 'Verrata lelujen kokoja ja ominaisuuksia mittaamalla',
      relatedAppIds: ['big-small-app', 'more-less'],
    },
    {
      standard: 'POPS.MA.1-2.T7',
      framework: 'POPS 2014',
      description: 'Luokitella leluja eri ominaisuuksien mukaan',
      relatedAppIds: ['picture-sort', 'matching-app'],
    },
    {
      standard: 'POPS.KU.1-2.T1',
      framework: 'POPS 2014',
      description: 'Havainnoida lelujen v\u00e4rej\u00e4, muotoja ja yksityiskohtia',
      relatedAppIds: ['coloring'],
    },
  ],

  xmas: [
    {
      standard: 'POPS.MA.1-2.T3',
      framework: 'POPS 2014',
      description: 'Harjoitella yhteen- ja v\u00e4hennyslaskua jouluaiheilla',
      relatedAppIds: ['image-addition'],
    },
    {
      standard: 'POPS.YL.1-2.T2',
      framework: 'POPS 2014',
      description: 'Tutustua suomalaisiin jouluperinteisiin',
      relatedAppIds: ['matching-app'],
    },
    {
      standard: 'POPS.AI.1-2.T4',
      framework: 'POPS 2014',
      description: 'Tutustua jouluaiheiseen kirjallisuuteen ja perinteisiin',
      relatedAppIds: ['word-search', 'word-guess'],
    },
    {
      standard: 'POPS.KU.1-2.T1',
      framework: 'POPS 2014',
      description: 'Ilmaista jouluaiheita kuvallisesti ja luovasti',
      relatedAppIds: ['coloring', 'draw-and-color'],
    },
  ],

  // === REMAINING LIFE SKILLS ================================================

  camping: [
    {
      standard: 'POPS.MA.1-2.T3',
      framework: 'POPS 2014',
      description: 'Harjoitella yhteen- ja v\u00e4hennyslaskua retkeilyaiheilla',
      relatedAppIds: ['image-addition'],
    },
    {
      standard: 'POPS.YL.1-2.T1',
      framework: 'POPS 2014',
      description: 'Tehd\u00e4 havaintoja luonnosta retkeill\u00e4 ja leirikouluissa',
      relatedAppIds: ['find-and-count', 'find-objects'],
    },
    {
      standard: 'POPS.YL.1-2.T2',
      framework: 'POPS 2014',
      description: 'Tutustua luonnossa liikkumiseen ja retkeilyyn',
      relatedAppIds: ['matching-app'],
    },
  ],

};


// ---------------------------------------------------------------------------
// Replacement logic
// ---------------------------------------------------------------------------

function replaceCurriculumAlignment(fileContent, newEntries) {
  // Find the start of curriculumAlignment array
  const startMatch = fileContent.match(/curriculumAlignment:\s*\[/);
  if (!startMatch) {
    throw new Error('Could not find curriculumAlignment');
  }

  const startIdx = startMatch.index;
  const arrayStartIdx = fileContent.indexOf('[', startIdx);

  // Find matching closing bracket by tracking depth
  let depth = 0;
  let endIdx = -1;
  for (let i = arrayStartIdx; i < fileContent.length; i++) {
    if (fileContent[i] === '[') depth++;
    if (fileContent[i] === ']') {
      depth--;
      if (depth === 0) {
        endIdx = i;
        break;
      }
    }
  }

  if (endIdx === -1) {
    throw new Error('Could not find closing bracket for curriculumAlignment');
  }

  // Detect indentation from original file
  const linesBefore = fileContent.substring(0, startIdx).split('\n');
  const lastLine = linesBefore[linesBefore.length - 1];
  const baseIndent = lastLine.match(/^\s*/)[0];

  // Build replacement entries
  const entryIndent = baseIndent + '  ';
  const propIndent = baseIndent + '    ';

  const entriesStr = newEntries.map(entry => {
    const appIdsStr = entry.relatedAppIds.map(id => `'${id}'`).join(', ');
    return [
      `${entryIndent}{`,
      `${propIndent}standard: '${entry.standard}',`,
      `${propIndent}framework: '${entry.framework}',`,
      `${propIndent}description: '${entry.description}',`,
      `${propIndent}relatedAppIds: [${appIdsStr}],`,
      `${entryIndent}}`
    ].join('\n');
  }).join(',\n');

  const newArray = `[\n${entriesStr},\n${baseIndent}]`;

  return fileContent.substring(0, arrayStartIdx) + newArray + fileContent.substring(endIdx + 1);
}


// ---------------------------------------------------------------------------
// Main execution
// ---------------------------------------------------------------------------

const themes = Object.keys(POPS_MAPPING);
let successCount = 0;
let errorCount = 0;
const errors = [];

console.log('=== POPS 2014 Curriculum Alignment for Finnish Themes ===\n');

for (const theme of themes) {
  const filePath = path.join(THEMES_DIR, theme, 'fi.ts');

  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    let content = fs.readFileSync(filePath, 'utf-8');
    content = replaceCurriculumAlignment(content, POPS_MAPPING[theme]);
    fs.writeFileSync(filePath, content, 'utf-8');

    successCount++;
    console.log(`  OK  ${theme}: ${POPS_MAPPING[theme].length} POPS entries`);
  } catch (err) {
    errorCount++;
    errors.push({ theme, error: err.message });
    console.error(`  FAIL  ${theme}: ${err.message}`);
  }
}

console.log(`\n--- Summary ---`);
console.log(`Updated: ${successCount}/50`);
if (errorCount > 0) {
  console.log(`Errors:  ${errorCount}`);
  errors.forEach(e => console.log(`  - ${e.theme}: ${e.error}`));
}

// ---------------------------------------------------------------------------
// Validation pass
// ---------------------------------------------------------------------------

console.log('\n--- Validation ---\n');

let validCount = 0;
let invalidCount = 0;

for (const theme of themes) {
  const filePath = path.join(THEMES_DIR, theme, 'fi.ts');
  if (!fs.existsSync(filePath)) continue;

  const content = fs.readFileSync(filePath, 'utf-8');

  const hasCommonCore = content.includes("'Common Core'") || content.includes('"Common Core"');
  const hasNGSS = content.includes("'NGSS'") || content.includes('"NGSS"');
  const hasPOPS = content.includes("'POPS 2014'") || content.includes('"POPS 2014"');

  const issues = [];
  if (hasCommonCore) issues.push('still has Common Core');
  if (hasNGSS) issues.push('still has NGSS');
  if (!hasPOPS) issues.push('missing POPS 2014');

  // Check that relatedAppIds are preserved
  const appIdMatches = content.match(/relatedAppIds:\s*\[([^\]]*)\]/g);
  if (!appIdMatches || appIdMatches.length < 3) {
    issues.push(`only ${appIdMatches ? appIdMatches.length : 0} entries (expected 3+)`);
  }

  if (issues.length > 0) {
    invalidCount++;
    console.log(`  FAIL  ${theme}: ${issues.join(', ')}`);
  } else {
    validCount++;
    console.log(`  OK  ${theme}`);
  }
}

console.log(`\nValid: ${validCount}/50`);
if (invalidCount > 0) {
  console.log(`Invalid: ${invalidCount}`);
}

// Check for any themes not in the mapping
const allThemes = [
  'animals', 'food', 'transportation', 'nature', 'school',
  'sports', 'emotions', 'body', 'clothing', 'household',
  'toys', 'music', 'jobs', 'space', 'seasons',
  'holidays', 'weather', 'colors', 'shapes', 'numbers',
  'alphabet', 'furniture', 'easter', 'halloween', 'xmas',
  'winter', 'farm', 'ocean', 'dinosaurs', 'insects',
  'fruits', 'vegetables', 'flowers', 'birds', 'pets',
  'zoo', 'garden', 'camping', 'pirates', 'fairy-tales',
  'robots', 'superheroes', 'construction', 'cooking', 'travel',
  'birthday', 'circus', 'forest', 'spring', 'summer',
];

const missing = allThemes.filter(t => !POPS_MAPPING[t]);
if (missing.length > 0) {
  console.log(`\n  WARNING: ${missing.length} themes not in POPS mapping: ${missing.join(', ')}`);
} else {
  console.log('\nAll 50 themes are mapped.');
}

console.log('\nDone.');
