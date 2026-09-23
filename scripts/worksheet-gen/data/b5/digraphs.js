/**
 * data/b5/digraphs.js — the G1-380 `digraphs` bank (nt10-E; design
 * docs/worksheet-gen/b5-designs/G1-380-digraphs.md §4-§5).
 *
 * DIGRAPHS[loc] — the per-locale block, read ONLY through lib/b5-common.js
 * bank('digraphs', loc) (a missing block REFUSES, never an en fallback). The EN
 * block is HAND-AUTHORED here (2026-09-23, the base build); the non-EN blocks are
 * GENERATED later by tools/apply-b5-locale.js into data/b5/locales/digraphs.<loc>.json
 * from the native panels' drafts after tools/validate-b5-draft.js, which runs the
 * gate's validateBank(block, loc) (qa/verify-b5-digraphs.js, §5 rules 1-13).
 * es / it / sv / da / no are REFUSED whole-family (§1): their blocks carry
 * `refused: {reason, category, measured}` and NO teams / items.
 *
 * Block shape (§5 DIGRAPHS_LOC):
 *   head        the rail name (genre head) the panel signs
 *   refused     null | { reason, category: 'owned'|'count'|'silent-letter', measured: {team: n} }
 *   phonemes    the CLOSED list of phoneme symbols this locale's `snd` may use
 *   teams       { <t>: { t, sound: [...], items: [ { vocabKey, theme, noun, word, seg[], snd[],
 *               silent[], stem, group?, picOpened } ] } }
 *               seg = the signed GRAPHEME segmentation (seg.join('') === word); snd = one
 *               phoneme per seg element (a grapheme that spells two sounds, e.g. x = /ks/,
 *               carries both in one symbol). `stem` = no two items of one stem on a page
 *               (tooth / toothpaste, chair / armchair, chick / chicken); `group` = a
 *               per-page cap of 2 (the -fish compounds, §4).
 *   samesound   [[t, t], …] two spellings of one sound — at most one per set
 *   falsePairs  [{ word, letters, why }] >= 6 — letters that LOOK like a team and are not it
 *   sets        { exemplar: [3 teams] (base, F2, F3, F5 target = first), k: [2] (F1), position: [3] (F4) }
 *   sentences   [{ id, text, target, hits, tokens: [{ w, seg }] }] >= 6 (F5; counts from seg)
 *   rejectedPics  pictures OPENED and refused (said with another word / a foil sound), with why
 *   strings     { base: {title, instruction}, 'sort-two'|'gap'|'match'|'position'|'text': {…} }
 *               keyed by MODE until tools/alloc-b5var-ids.js allocates the face ids;
 *               base === the spec's i18n.en. The EN strings are a SOURCE TO AUDIT (§4).
 *
 * `owned` is NOT typed here: the validator derives it at run time from
 * bank('spelling-rules', loc) rule cands + bank('syllable-reading', loc) blends /
 * complexUnits (lib/b3-common.js).
 *
 * Pictures: every item is a PINNED {theme, noun} read with fileUri(theme, noun); every
 * one was OPENED by the builder on 2026-09-23 (contact sheets
 * %TEMP%/…/scratchpad/G1-380-open-{sh,ch,th}.png) and carries picOpened:true.
 *
 * `data/` is gitignored — the reviewer force-adds this module.
 */
'use strict';

const S = (s) => s.split('|');
/** One item: seg / snd given as 'a|b|c' strings (one element per grapheme / phoneme). */
const I = (theme, noun, word, seg, snd, extra = {}) => ({
  vocabKey: extra.vocabKey || noun, theme, noun, word, seg: S(seg), snd: S(snd),
  silent: extra.silent || [], stem: extra.stem || word, ...(extra.group ? { group: extra.group } : {}), picOpened: true,
});
const tok = (w, seg) => ({ w, seg: S(seg) });

const DIGRAPHS = {
  en: {
    head: 'Digraphs',
    refused: null,
    phonemes: ['p', 'b', 't', 'd', 'k', 'g', 'f', 'v', 'θ', 'ð', 's', 'z', 'ʃ', 'tʃ', 'dʒ', 'h', 'm', 'n', 'ŋ', 'l', 'r', 'w', 'j', 'ks',
      'ɪ', 'ɛ', 'æ', 'ʌ', 'ɒ', 'ʊ', 'ə', 'i', 'iː', 'uː', 'ɑː', 'ɔː', 'ɜː', 'eɪ', 'aɪ', 'ɔɪ', 'əʊ', 'aʊ', 'ɛə', 'ɪə'],
    teams: {
      sh: {
        t: 'sh', sound: ['ʃ'],
        items: [
          I('vehicles', 'ship', 'ship', 'sh|i|p', 'ʃ|ɪ|p'),
          I('pets', 'fish', 'fish', 'f|i|sh', 'f|ɪ|ʃ', { group: 'fish' }),
          I('around the house', 'brush', 'brush', 'b|r|u|sh', 'b|r|ʌ|ʃ'),
          I('clothing', 'shirt', 'shirt', 'sh|ir|t', 'ʃ|ɜː|t'),
          I('clothing', 'shoe', 'shoe', 'sh|oe', 'ʃ|uː'),
          I('clothing', 'shorts', 'shorts', 'sh|or|t|s', 'ʃ|ɔː|t|s'),
          I('ocean life', 'shark', 'shark', 'sh|ar|k', 'ʃ|ɑː|k'),
          I('animals', 'sheep', 'sheep', 'sh|ee|p', 'ʃ|iː|p'),
          I('ocean life', 'shrimp', 'shrimp', 'sh|r|i|m|p', 'ʃ|r|ɪ|m|p'),
          I('beach', 'shovel', 'shovel', 'sh|o|v|e|l', 'ʃ|ʌ|v|ə|l'),
          I('vegetables', 'mushroom', 'mushroom', 'm|u|sh|r|oo|m', 'm|ʌ|ʃ|r|uː|m'),
          I('ocean life', 'starfish', 'starfish', 's|t|ar|f|i|sh', 's|t|ɑː|f|ɪ|ʃ', { group: 'fish' }),
          I('ocean life', 'jellyfish', 'jellyfish', 'j|e|ll|y|f|i|sh', 'dʒ|ɛ|l|i|f|ɪ|ʃ', { group: 'fish' }),
          I('beach', 'seashell', 'seashell', 's|ea|sh|e|ll', 's|iː|ʃ|ɛ|l'),
        ],
      },
      ch: {
        t: 'ch', sound: ['tʃ'],
        items: [
          I('furniture', 'chair', 'chair', 'ch|air', 'tʃ|ɛə', { stem: 'chair' }),
          I('breakfast', 'cheese', 'cheese', 'ch|ee|se', 'tʃ|iː|z'),
          I('farm animals', 'chicken', 'chicken', 'ch|i|ck|e|n', 'tʃ|ɪ|k|ə|n', { stem: 'chick' }),
          I('furniture', 'bench', 'bench', 'b|e|n|ch', 'b|ɛ|n|tʃ'),
          I('birds', 'ostrich', 'ostrich', 'o|s|t|r|i|ch', 'ɒ|s|t|r|ɪ|tʃ'),
          I('furniture', 'armchair', 'armchair', 'ar|m|ch|air', 'ɑː|m|tʃ|ɛə', { stem: 'chair' }),
          I('summer', 'beach', 'beach', 'b|ea|ch', 'b|iː|tʃ'),
          I('easter', 'chocolate', 'chocolate', 'ch|o|c|o|l|a|te', 'tʃ|ɒ|k|ə|l|ə|t'),
        ],
      },
      th: {
        t: 'th', sound: ['θ', 'ð'],
        items: [
          I('body parts', 'thumb', 'thumb', 'th|u|mb', 'θ|ʌ|m'),
          I('body parts', 'tooth', 'tooth', 't|oo|th', 't|uː|θ', { stem: 'tooth' }),
          I('around the house', 'toothpaste', 'toothpaste', 't|oo|th|p|a|s|te', 't|uː|θ|p|eɪ|s|t', { stem: 'tooth' }),
          I('easter', 'feather', 'feather', 'f|ea|th|er', 'f|ɛ|ð|ə'),
          I('around the house', 'bathtub', 'bathtub', 'b|a|th|t|u|b', 'b|ɑː|θ|t|ʌ|b'),
          I('weather', 'thermometer', 'thermometer', 'th|er|m|o|m|e|t|er', 'θ|ə|m|ɒ|m|ɪ|t|ə'),
          I('christmas', 'wreath', 'wreath', 'wr|ea|th', 'r|iː|θ'),
          I('zoo animals', 'sloth', 'sloth', 's|l|o|th', 's|l|əʊ|θ'),
        ],
      },
    },
    samesound: [],
    falsePairs: [
      { word: 'grasshopper', letters: 'sh', why: 'grass + hopper: s and h meet across the seam, two sounds' },
      { word: 'mishap', letters: 'sh', why: 'mis + hap: s and h are two sounds' },
      { word: 'lighthouse', letters: 'th', why: 'light + house: t and h are two sounds' },
      { word: 'pothole', letters: 'th', why: 'pot + hole: t and h are two sounds' },
      { word: 'anthill', letters: 'th', why: 'ant + hill: t and h are two sounds' },
      { word: 'chef', letters: 'ch', why: 'ch here is /ʃ/ (French loan), not the ch team\'s /tʃ/' },
      { word: 'orchid', letters: 'ch', why: 'ch here is /k/ (Greek loan)' },
      { word: 'mechanic', letters: 'ch', why: 'ch here is /k/ (Greek loan)' },
      { word: 'kitchen', letters: 'ch', why: 'tch is its own spelling of /tʃ/ (spelling-rules territory), out of the pool' },
    ],
    sets: { exemplar: ['sh', 'ch', 'th'], k: ['sh', 'ch'], position: ['sh', 'ch', 'th'] },
    sentences: [
      { id: 's1', text: 'The sheep is on the ship.', target: 'sh', hits: 2,
        tokens: [tok('The', 'Th|e'), tok('sheep', 'sh|ee|p'), tok('is', 'i|s'), tok('on', 'o|n'), tok('the', 'th|e'), tok('ship', 'sh|i|p')] },
      { id: 's2', text: 'A fish swims to the dish.', target: 'sh', hits: 2,
        tokens: [tok('A', 'A'), tok('fish', 'f|i|sh'), tok('swims', 's|w|i|m|s'), tok('to', 't|o'), tok('the', 'th|e'), tok('dish', 'd|i|sh')] },
      { id: 's3', text: 'She has a red shirt and red shoes.', target: 'sh', hits: 3,
        tokens: [tok('She', 'Sh|e'), tok('has', 'h|a|s'), tok('a', 'a'), tok('red', 'r|e|d'), tok('shirt', 'sh|ir|t'), tok('and', 'a|n|d'), tok('red', 'r|e|d'), tok('shoes', 'sh|oe|s')] },
      { id: 's4', text: 'Dad can shut the shed.', target: 'sh', hits: 2,
        tokens: [tok('Dad', 'D|a|d'), tok('can', 'c|a|n'), tok('shut', 'sh|u|t'), tok('the', 'th|e'), tok('shed', 'sh|e|d')] },
      { id: 's5', text: 'I wish I had a big shell.', target: 'sh', hits: 2,
        tokens: [tok('I', 'I'), tok('wish', 'w|i|sh'), tok('I', 'I'), tok('had', 'h|a|d'), tok('a', 'a'), tok('big', 'b|i|g'), tok('shell', 'sh|e|ll')] },
      { id: 's6', text: 'The shark and the fish splash in the sea.', target: 'sh', hits: 3,
        tokens: [tok('The', 'Th|e'), tok('shark', 'sh|ar|k'), tok('and', 'a|n|d'), tok('the', 'th|e'), tok('fish', 'f|i|sh'), tok('splash', 's|p|l|a|sh'), tok('in', 'i|n'), tok('the', 'th|e'), tok('sea', 's|ea')] },
      // Phase E (2026-09-23): six more so an F5 page can draw counts 1-4 in an order that is neither
      // flat nor monotone (with only 2s and 3s every legal page put its odd count in the middle lane);
      // the bank order keeps every 3-window at 5-8 hits (rule 12): 2 2 3 2 2 3 1 4 1 3 2 1.
      { id: 's7', text: 'Mom has a wish for a cat.', target: 'sh', hits: 1,
        tokens: [tok('Mom', 'M|o|m'), tok('has', 'h|a|s'), tok('a', 'a'), tok('wish', 'w|i|sh'), tok('for', 'f|or'), tok('a', 'a'), tok('cat', 'c|a|t')] },
      { id: 's8', text: 'She shows me a shell and a fish.', target: 'sh', hits: 4,
        tokens: [tok('She', 'Sh|e'), tok('shows', 'sh|ow|s'), tok('me', 'm|e'), tok('a', 'a'), tok('shell', 'sh|e|ll'), tok('and', 'a|n|d'), tok('a', 'a'), tok('fish', 'f|i|sh')] },
      { id: 's9', text: 'The dog ran to the shop.', target: 'sh', hits: 1,
        tokens: [tok('The', 'Th|e'), tok('dog', 'd|o|g'), tok('ran', 'r|a|n'), tok('to', 't|o'), tok('the', 'th|e'), tok('shop', 'sh|o|p')] },
      { id: 's10', text: 'I wash a dish and a big shell.', target: 'sh', hits: 3,
        tokens: [tok('I', 'I'), tok('wash', 'w|a|sh'), tok('a', 'a'), tok('dish', 'd|i|sh'), tok('and', 'a|n|d'), tok('a', 'a'), tok('big', 'b|i|g'), tok('shell', 'sh|e|ll')] },
      { id: 's11', text: 'A crab ran up the shore to the shed.', target: 'sh', hits: 2,
        tokens: [tok('A', 'A'), tok('crab', 'c|r|a|b'), tok('ran', 'r|a|n'), tok('up', 'u|p'), tok('the', 'th|e'), tok('shore', 'sh|or|e'), tok('to', 't|o'), tok('the', 'th|e'), tok('shed', 'sh|e|d')] },
      { id: 's12', text: 'My cat sat in the shade.', target: 'sh', hits: 1,
        tokens: [tok('My', 'M|y'), tok('cat', 'c|a|t'), tok('sat', 's|a|t'), tok('in', 'i|n'), tok('the', 'th|e'), tok('shade', 'sh|a|d|e')] },
    ],
    rejectedPics: [
      { pic: 'fruits/cherry', why: 'reads as an apple (design §4)' },
      { pic: 'fruits/peach', why: 'reads as an apple (design §4)' },
      { pic: 'christmas/chimney', why: 'a fireplace (design §4)' },
      { pic: 'body parts/mouth', why: 'said "lips" (design §4)' },
      { pic: 'colors/white', why: 'a white paint drop (design §1)' },
      { pic: 'shapes/cone', why: 'a frustum / lampshade (design §1)' },
      { pic: 'furniture/shelf', why: 'a plank on brackets reads as a bench — a ch word (builder, opened)' },
      { pic: 'vegetables/radish', why: 'reads as a beet (builder, opened)' },
      { pic: 'At the Supermarket/shampoo', why: 'a pump bottle, said "soap" (builder, opened)' },
      { pic: 'body parts/shoulder', why: 'a torso with an arrow, said "arm" / "back" (builder, opened)' },
      { pic: 'camping/flashlight', why: 'said "torch" — a ch word (builder, opened)' },
      { pic: 'desserts and sweets/milkshake', why: 'said "drink" / "smoothie" (builder, opened)' },
      { pic: 'body parts/chin', why: 'a face with an arrow, said "neck" / "face" (builder, opened)' },
      { pic: 'body parts/cheeks', why: 'a face, said "face" (builder, opened)' },
      { pic: 'zoo animals/cheetah', why: 'said "leopard" / "tiger" (builder, opened)' },
      { pic: 'furniture/couch', why: 'said "sofa" (builder, opened)' },
      { pic: 'toys/chess', why: 'a king piece, said "king" (builder, opened)' },
      { pic: 'forest creatures/chipmunk', why: 'said "squirrel" (builder, opened)' },
      { pic: 'vegetables/spinach', why: 'a single leaf, said "leaf" (builder, opened)' },
      { pic: 'bakery/cheesecake', why: 'said "cake" / "pie" (builder, opened)' },
      { pic: 'birds 2/finch', why: 'said "bird" (builder, opened)' },
      { pic: 'occupations/coach', why: 'a man in shorts, said "man" / "runner" (builder, opened)' },
      { pic: 'weather/thunderstorm', why: 'said "storm" / "lightning" — no th (builder, opened)' },
      { pic: 'space/earth', why: 'said "world" / "globe" — no th (builder, opened)' },
      { pic: 'forest creatures/earthworm', why: 'said "worm" — no th (builder, opened)' },
      { pic: 'occupations/athlete', why: 'said "runner" (builder, opened)' },
      { pic: 'activities/theater', why: 'said "stage" / "house" (builder, opened)' },
      { pic: 'breakfast/smoothie', why: 'said "juice" (builder, opened)' },
      { pic: 'hospital/stethoscope', why: 'not a K-1 word (builder, opened)' },
      { pic: 'easter/chick', why: 'reads as a duckling: a child says "duck" (no ch) — coordinator review 2026-09-23 (base + faces)' },
      { pic: 'classroom/lunchbox', why: 'reads as a treasure chest: a child says "treasure" / "box" (no ch) — coordinator review 2026-09-23 (base + faces)' },
    ],
    strings: {
      base: { title: 'Digraphs sh, ch and th: Which Letter Team Do You Hear?', instruction: 'Say the name of each picture. Circle the letter team you hear.' },
      'sort-two': { title: 'Digraph Sort for Kindergarten: sh or ch', instruction: "Say each picture's name. Draw a line from each picture to the letter team you hear." },
      gap: { title: 'Missing Digraphs: Write sh, ch or th', instruction: 'Say each picture word. Write the missing letter team from the top in the dashed space.' },
      match: { title: 'Read Digraph Words and Match the Pictures', instruction: 'Read each word. The letter team is marked. Draw a line to the picture the word names.' },
      position: { title: 'Where Is the Digraph? sh, ch and th in the Word', instruction: 'Say each picture word. Where do you hear the letter team? Color one space: beginning, middle or end.' },
      text: { title: 'Digraphs in Sentences: Circle and Count sh', instruction: 'Read the sentences. Circle every sh. Write how many you found in each sentence in its box.' },
    },
  },
};

/** Locale-neutral facts (§1, §2): the refused locales, the face modes, the bead sizes per mode. */
const DIGRAPHS_NEUTRAL = {
  REFUSED_LOCALES: ['es', 'it', 'sv', 'da', 'no'],
  /** pictures the DESIGN refused for every locale (§1, §4) — merged into every block's rejectedPics by the validator */
  REJECTED_PICS_ALL: ['fruits/cherry', 'fruits/peach', 'christmas/chimney', 'body parts/mouth', 'colors/white', 'shapes/cone', 'easter/chick', 'classroom/lunchbox'],
  SHIPPING_LOCALES: ['en', 'de', 'pt', 'fr', 'nl', 'fi'],
  MODES: ['base', 'sort-two', 'gap', 'match', 'position', 'text'],
  /** faces a SHIPPING locale refuses (design §3 F4 / §7) */
  FACE_REFUSALS: { pt: ['position'] },
  BEADS: {
    base: { key: { w: 92, h: 52, fontPx: 32 }, row: { w: 76, h: 44, fontPx: 26 } },
  },
};

module.exports = { DIGRAPHS, DIGRAPHS_NEUTRAL };
