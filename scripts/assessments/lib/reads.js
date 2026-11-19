'use strict';
/**
 * The read-aloud texts of one part (data-lcs-teacher-reads, one per card) often begin with the same story or text and
 * differ only in the question at the end: the Kindergarten story part read "Bear and the Bee. Bear walks …" in full
 * before EACH question, so the key printed the story twice and the teacher pages ran to five pages (2026-11-19).
 *
 * splitShared(list) → { shared, rest } where `shared` is the longest opening that every text of the list has in common
 * and that ends at the end of a sentence, and `rest[i]` is what card i adds after it. With fewer than two texts, an
 * opening shorter than MIN letters, or a card that would have nothing of its own left, it returns { shared: null, rest:
 * list } and the texts are printed as they are. Nothing is dropped or reworded: shared + ' ' + rest[i] is text i.
 */
const MIN = 60;
function splitShared(list) {
  const texts = (list || []).filter((t) => typeof t === 'string' && t.trim());
  if (texts.length < 2 || texts.length !== (list || []).length) return { shared: null, rest: list || [] };
  let n = 0;
  const first = texts[0];
  while (n < first.length && texts.every((t) => t[n] === first[n])) n++;
  // back to the end of a sentence: a mark . ! ? (or a closing quote after one) followed by a space in every text
  let cut = -1;
  for (let k = n; k > 0; k--) {
    const end = first.slice(0, k);
    if (/[.!?]["”’)]?$/.test(end) && texts.every((t) => t[k] === ' ')) { cut = k; break; }
  }
  if (cut < MIN) return { shared: null, rest: list };
  const rest = texts.map((t) => t.slice(cut).trim());
  if (rest.some((r) => !r)) return { shared: null, rest: list };
  return { shared: first.slice(0, cut).trim(), rest };
}
module.exports = { splitShared };

if (require.main === module) {
  // self-test: node scripts/assessments/lib/reads.js
  const assert = require('assert');
  const story = 'Bear and the Bee. Bear walks in the forest. He is very hungry. He sees a little bee on a flower.';
  const a = splitShared([story + ' Who is the story about? Circle it.', story + ' Where does the story happen? Circle it.']);
  assert.strictEqual(a.shared, story);
  assert.deepStrictEqual(a.rest, ['Who is the story about? Circle it.', 'Where does the story happen? Circle it.']);
  assert.strictEqual(splitShared(['One text only.']).shared, null);                       // one text: as it is
  assert.strictEqual(splitShared(['Short. A?', 'Short. B?']).shared, null);              // opening too short
  { const same = splitShared([story, story]);                                             // two equal texts: still whole
    assert.ok(same.rest.every((r, i) => (same.shared ? same.shared + ' ' + r : r) === story), 'equal texts rebuild'); }
  { const x = [story + ' Who is it? Circle it.', story + ' Where is it?'], sp = splitShared(x);  // nothing dropped
    assert.ok(sp.rest.every((r, i) => sp.shared + ' ' + r === x[i]), 'shared + rest rebuilds every text'); }
  assert.strictEqual(splitShared([story + ' Q1?', null]).shared, null);                 // a card without a text
  const q = splitShared(['Story 1, with the lamb picture: Lamb said, “Hello there, my old friend.” Look at the picture: a hat. Which?', 'Story 1, with the lamb picture: Lamb said, “Hello there, my old friend.” Look at the picture: a bed. Which?']);
  assert.ok(q.shared && /friend\.”$/.test(q.shared), 'cuts after a closing quote: ' + q.shared);
  console.log('reads.js self-test: ok');
}
