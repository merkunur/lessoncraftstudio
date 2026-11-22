'use strict';
/**
 * The controlled word list of the English decodable books (Daily Teaching System, Part 8.1), sets 1 to 9.
 * Set 9 (blends, nk) was added with the 60 books (8.2, 2026-11-20). Set 10 (silent e) followed the same day,
 * once the gate read a split spelling: every silent-e word needs its parse in PARSES ("c:k a_e:ey k:k" spells cake).
 *
 * A word stands here only when its spelling is REGULAR for the scope (scripts/readers/scope.en.js): every letter or
 * letter group says the sound the scope teaches for it. "was", "of", "put", "son", "all" are not here: they are
 * irregular and can only enter a book as heart words of their set. English spelling cannot be parsed by rule, so
 * the list is the authority: `node scripts/readers/gate.js --write` writes each word's parse into lexicon.en.json,
 * and that file is what the gate reads and what a reviewer checks.
 *
 * PARSES names the words whose parse differs from the default (the default: the longest taught letter group first,
 * each with its first sound in the scope): the two sounds of th, and s that says z.
 * NAMES are written with a capital in a book and are checked like any word.
 * EARLY: a word taught earlier than its letters allow. "and" has two consonant letters side by side, which the
 * series otherwise keeps for the blend set; classrooms teach it with n and d, and it is fully decodable, so it is a
 * word to sound out (never a "heart word") from set 2 on.
 * RARE: regular words many five-year-olds and English learners do not know; CARE: words that must never be said of a
 * person or as violence. Neither kind stands in a book unless the book names it (`allow`) and a reviewer agreed.
 * What the reviewer of 2026-11-13 noted and the list keeps: a before m or n (am, an, Sam) and a, i, o before ng
 * (sang, sing, song) do not sound exactly like the vowel of "at", "it", "on"; the teacher's line of a book says so.
 */
const WORDS = [
  // set 1: m s a t p
  'am', 'at', 'sat', 'mat', 'pat', 'tap', 'map', 'sap',
  // set 2: i n f d
  'in', 'it', 'if', 'an', 'sit', 'pin', 'tin', 'pit', 'tip', 'nip', 'dip', 'sip', 'did', 'dad', 'sad', 'mad', 'pad', 'man', 'pan', 'fan', 'tan', 'fit', 'fin', 'fat', 'nap', 'dim', 'and',
  // set 3: o c k g h
  'on', 'not', 'hot', 'pot', 'dot', 'cot', 'got', 'hop', 'top', 'mop', 'pop', 'dog', 'hog', 'fog', 'cat', 'cap', 'can', 'kid', 'kit', 'hid', 'him', 'hit', 'hat', 'had', 'ham', 'hip', 'gap', 'gas', 'dig', 'pig', 'fig', 'tag', 'nod', 'mom',
  // set 4: b u r l
  'bug', 'big', 'bag', 'bat', 'bad', 'bib', 'bit', 'bin', 'bun', 'bus', 'but', 'rub', 'rug', 'run', 'rat', 'ran', 'rip', 'rib', 'rod', 'log', 'lot', 'lid', 'lip', 'lap', 'up', 'us', 'sun', 'fun', 'mud', 'mug', 'nut', 'hut', 'cut', 'cup', 'pup', 'hug', 'tub', 'tug',
  'cub', 'gum', 'hum', 'dug', 'bud', 'rag', 'lit',
  // set 5: e, s as in is
  'bed', 'bet', 'beg', 'red', 'leg', 'let', 'led', 'ten', 'pen', 'hen', 'men', 'net', 'pet', 'set', 'get', 'met', 'fed', 'is', 'his', 'has', 'as',
  'den',
  // set 6: j w v y x z qu
  'jet', 'jam', 'jog', 'jug', 'job', 'wet', 'web', 'win', 'wig', 'van', 'vet', 'yes', 'yet', 'yam', 'box', 'fox', 'six', 'mix', 'fix', 'wax', 'zip', 'zap', 'quit', 'quiz',
  'ox', 'wag', 'yum', 'yap',
  // set 7: ck ff ll ss zz
  'quack', 'duck', 'sock', 'rock', 'pack', 'back', 'kick', 'pick', 'lock', 'luck', 'neck', 'sick', 'tick', 'off', 'puff', 'bell', 'hill', 'fell', 'tell', 'sell', 'well', 'will', 'doll', 'miss', 'kiss', 'mess', 'boss', 'buzz', 'fuzz', 'jazz',
  'deck', 'peck', 'sack', 'tuck', 'dock', 'lick', 'hiss', 'pass', 'less', 'fuss', 'yell', 'fill', 'fizz',
  // set 8: sh ch th wh ng
  'ship', 'shop', 'shed', 'shut', 'fish', 'dish', 'wish', 'rush', 'cash', 'chip', 'chop', 'chin', 'chat', 'chick', 'check', 'much', 'such', 'rich', 'thin', 'thick', 'moth', 'bath', 'math', 'path', 'with', 'this', 'that', 'then', 'them', 'when', 'which', 'whip', 'sing', 'song', 'ring', 'king', 'wing', 'long', 'hang', 'bang', 'sang',
  'shell', 'mash', 'dash', 'hush', 'chess', 'chug', 'thud', 'thing', 'rang', 'sung', 'hung',
  // set 9: consonant blends (two consonant letters side by side, each with its own sound) and nk
  'frog', 'jump', 'stop', 'spot', 'clap', 'flag', 'flat', 'plan', 'plum', 'plus', 'drum', 'drip', 'grab', 'grin', 'trip', 'swim', 'swam', 'snap', 'snug', 'sled',
  'nest', 'best', 'rest', 'test', 'vest', 'fast', 'last', 'past', 'mask', 'desk', 'milk', 'help', 'belt', 'melt', 'felt', 'went', 'tent', 'sent', 'kept',
  'pond', 'hand', 'band', 'sand', 'land', 'stand', 'end', 'bend', 'send', 'camp', 'lamp', 'damp', 'stamp', 'bump', 'pump', 'gift', 'lift', 'left', 'raft',
  'crab', 'crib', 'drop', 'flop', 'plop', 'slip', 'slid', 'slug', 'spin', 'skip', 'skin', 'step', 'stem', 'sniff', 'smell', 'spell', 'spill', 'still',
  'stick', 'stuck', 'truck', 'trick', 'track', 'black', 'block', 'clock', 'click', 'snack', 'stack', 'grill', 'dress', 'grass', 'glass', 'class',
  'flash', 'brush', 'fresh', 'chest', 'lunch', 'bunch', 'bench', 'inch',
  'pink', 'sink', 'wink', 'drink', 'blink', 'honk', 'bank', 'tank', 'thank', 'trunk', 'skunk', 'think',
  'wind',
  // set 10: silent e (a_e i_e o_e u_e e_e; every parse is written in PARSES below)
  'cake', 'bake', 'take', 'make', 'lake', 'game', 'came', 'made', 'name', 'gate', 'wave', 'ate',
  'bike', 'ride', 'kite', 'white', 'nine', 'five', 'time', 'side', 'hide', 'slide', 'glide', 'smile',
  'home', 'rope', 'hope', 'bone', 'nose', 'note', 'cute', 'cube', 'these',
];
const NAMES = ['Sam', 'Pam', 'Pat', 'Dan', 'Nan', 'Tim', 'Sid', 'Tom', 'Kit', 'Ben', 'Bob', 'Meg', 'Jen', 'Jack', 'Jill', 'Beth', 'Chip', 'Chad', 'Mom', 'Dad',
  'Kim', 'Gus', 'Lin', 'Ted', 'Max', 'Liz', 'Viv', 'Nick', 'Tess', 'Bill', 'Josh', 'Brad', 'Gramps',
  'Jake', 'Kate', 'Mike'];
const PARSES = {
  is: 'i:ih s:z', his: 'h:h i:ih s:z', has: 'h:h a:ae s:z', as: 'a:ae s:z',
  this: 'th:dh i:ih s:s', that: 'th:dh a:ae t:t', then: 'th:dh e:eh n:n', them: 'th:dh e:eh m:m',
  // set 10: the split spellings (the default parser never reads one)
  cake: 'c:k a_e:ey k:k', bake: 'b:b a_e:ey k:k', take: 't:t a_e:ey k:k', make: 'm:m a_e:ey k:k', lake: 'l:l a_e:ey k:k', game: 'g:g a_e:ey m:m',
  came: 'c:k a_e:ey m:m', made: 'm:m a_e:ey d:d', name: 'n:n a_e:ey m:m', gate: 'g:g a_e:ey t:t', wave: 'w:w a_e:ey v:v', ate: 'a_e:ey t:t',
  bike: 'b:b i_e:ay k:k', ride: 'r:r i_e:ay d:d', kite: 'k:k i_e:ay t:t', white: 'wh:w i_e:ay t:t', nine: 'n:n i_e:ay n:n', five: 'f:f i_e:ay v:v',
  time: 't:t i_e:ay m:m', side: 's:s i_e:ay d:d', hide: 'h:h i_e:ay d:d', slide: 's:s l:l i_e:ay d:d', glide: 'g:g l:l i_e:ay d:d', smile: 's:s m:m i_e:ay l:l',
  home: 'h:h o_e:ow m:m', rope: 'r:r o_e:ow p:p', hope: 'h:h o_e:ow p:p', bone: 'b:b o_e:ow n:n', nose: 'n:n o_e:ow s:z', note: 'n:n o_e:ow t:t',
  cute: 'c:k u_e:yuw t:t', cube: 'c:k u_e:yuw b:b', these: 'th:dh e_e:iy s:z',
  jake: 'j:j a_e:ey k:k', kate: 'k:k a_e:ey t:t', mike: 'm:m i_e:ay k:k',
};
const EARLY = { and: 2 };
const RARE = ['sap', 'nip', 'dim', 'cot', 'rod', 'yam', 'jazz', 'tan'];
const CARE = ['fat', 'hit', 'kick', 'whip', 'bang'];
module.exports = { WORDS, NAMES, PARSES, EARLY, RARE, CARE };
