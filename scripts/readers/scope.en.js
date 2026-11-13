'use strict';
/**
 * The English reading scope of the readers (Daily Teaching System, Part 8.1): the order in which a US classroom that
 * teaches synthetic phonics introduces letter-sound correspondences, in SETS. A decodable book of set N uses only
 * the correspondences of sets 1 to N and the irregular words taught up to N.
 *
 * A correspondence is written "spelling:sound". Sounds are plain codes (ae = the a of cat, ih = pin, aa = hot,
 * uh = sun, eh = bed; sh, ch, th = thin, dh = this, ng = sing; ks = the x of box, kw = the qu of quit). The codes are
 * for the gate, not for teachers: a teacher page names the spelling.
 *
 * `blends`: from that set on a word may hold two consonant letters side by side that each say their own sound
 * (frog, jump). Before it a word is VC or CVC; a digraph is one sound, and x and qu count as one unit, as every
 * program treats them.
 * `heart`: the irregular words taught with the set (read as wholes; US classrooms call them "heart words"). A word
 * leaves the heart list of the gate by itself once all its correspondences are taught ("is" from set 5 on).
 * `final`: a correspondence that is only ever read at the END of a word (-ce, -ge); the default parser never uses it.
 *
 * The order follows the sequence most US structured-literacy programs share. One early-reading reviewer read it on
 * 2026-11-13 and asked for: two sets where one held two new vowels (b u r l, then e), two where one held twelve
 * correspondences (j w v y x z qu, then the doubled letters), "no" and "go" a set after short o, the pronouns he, she,
 * we, me, be before the digraphs, "do" with "to", "have" where v is taught.
 */
module.exports = {
  locale: 'en',
  stages: [
    { n: 1, name: 'm s a t p', gpc: ['m:m', 's:s', 'a:ae', 't:t', 'p:p'], heart: ['I', 'a', 'the'] },
    { n: 2, name: 'i n f d', gpc: ['i:ih', 'n:n', 'f:f', 'd:d'], heart: ['is', 'to'] },
    { n: 3, name: 'o c k g h', gpc: ['o:aa', 'c:k', 'k:k', 'g:g', 'h:h'], heart: ['has', 'his'] },
    { n: 4, name: 'b u r l', gpc: ['b:b', 'u:uh', 'r:r', 'l:l'], heart: ['no', 'go', 'do'] },
    { n: 5, name: 'e, s as in is', gpc: ['e:eh', 's:z'], heart: ['of', 'was', 'you'] },
    { n: 6, name: 'j w v y x z qu', gpc: ['j:j', 'w:w', 'v:v', 'y:y', 'x:ks', 'z:z', 'qu:kw'], heart: ['my', 'he', 'she', 'we', 'me', 'be', 'have'] },
    { n: 7, name: 'ck ff ll ss zz', gpc: ['ck:k', 'ff:f', 'll:l', 'ss:s', 'zz:z'], heart: ['said', 'for', 'are'] },
    { n: 8, name: 'sh ch th wh ng', gpc: ['sh:sh', 'ch:ch', 'th:th', 'th:dh', 'wh:w', 'ng:ng'], heart: ['they', 'what'] },
    { n: 9, name: 'consonant blends', gpc: ['nk:ngk'], blends: true, heart: ['one', 'from', 'come', 'some', 'here', 'there', 'were', 'your'] },
    { n: 10, name: 'silent e', gpc: ['a_e:ey', 'i_e:ay', 'o_e:ow', 'u_e:yuw', 'e_e:iy', 'ce:s', 'ge:j'], final: ['ce:s', 'ge:j'], heart: ['two', 'who', 'where', 'want', 'does', 'put'] },
  ],
  /** the sounds that count as vowels (a word of the early sets has exactly one) */
  vowels: ['ae', 'ih', 'aa', 'uh', 'eh', 'ey', 'ay', 'ow', 'yuw', 'iy'],
  /** unvoiced last sounds: a plural or verb s after them says s, after every other sound z */
  unvoiced: ['p', 't', 'k', 'f', 'th', 'ks'],
  /** after these sounds English adds -es, not -s: the gate refuses a bare s there (buss, boxs) */
  sibilant: ['s', 'z', 'sh', 'ch', 'j', 'ks'],
};
