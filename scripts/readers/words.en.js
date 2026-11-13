'use strict';
/**
 * The controlled word list of the English decodable books (Daily Teaching System, Part 8.1), sets 1 to 8.
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
  // set 5: e, s as in is
  'bed', 'bet', 'beg', 'red', 'leg', 'let', 'led', 'ten', 'pen', 'hen', 'men', 'net', 'pet', 'set', 'get', 'met', 'fed', 'is', 'his', 'has', 'as',
  // set 6: j w v y x z qu
  'jet', 'jam', 'jog', 'jug', 'job', 'wet', 'web', 'win', 'wig', 'van', 'vet', 'yes', 'yet', 'yam', 'box', 'fox', 'six', 'mix', 'fix', 'wax', 'zip', 'zap', 'quit', 'quiz',
  // set 7: ck ff ll ss zz
  'quack', 'duck', 'sock', 'rock', 'pack', 'back', 'kick', 'pick', 'lock', 'luck', 'neck', 'sick', 'tick', 'off', 'puff', 'bell', 'hill', 'fell', 'tell', 'sell', 'well', 'will', 'doll', 'miss', 'kiss', 'mess', 'boss', 'buzz', 'fuzz', 'jazz',
  // set 8: sh ch th wh ng
  'ship', 'shop', 'shed', 'shut', 'fish', 'dish', 'wish', 'rush', 'cash', 'chip', 'chop', 'chin', 'chat', 'chick', 'check', 'much', 'such', 'rich', 'thin', 'thick', 'moth', 'bath', 'math', 'path', 'with', 'this', 'that', 'then', 'them', 'when', 'which', 'whip', 'sing', 'song', 'ring', 'king', 'wing', 'long', 'hang', 'bang', 'sang',
];
const NAMES = ['Sam', 'Pam', 'Pat', 'Dan', 'Nan', 'Tim', 'Sid', 'Tom', 'Kit', 'Ben', 'Bob', 'Meg', 'Jen', 'Jack', 'Jill', 'Beth', 'Chip', 'Chad', 'Mom', 'Dad'];
const PARSES = {
  is: 'i:ih s:z', his: 'h:h i:ih s:z', has: 'h:h a:ae s:z', as: 'a:ae s:z',
  this: 'th:dh i:ih s:s', that: 'th:dh a:ae t:t', then: 'th:dh e:eh n:n', them: 'th:dh e:eh m:m',
};
const EARLY = { and: 2 };
const RARE = ['sap', 'nip', 'dim', 'cot', 'rod', 'yam', 'jazz', 'tan'];
const CARE = ['fat', 'hit', 'kick', 'whip', 'bang'];
module.exports = { WORDS, NAMES, PARSES, EARLY, RARE, CARE };
