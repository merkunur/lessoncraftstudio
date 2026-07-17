#!/usr/bin/env node
/* =====================================================================
   nets.js — mechanical suspicion nets over the vocabulary dossier.

   THE NETS NEVER DECIDE. §A.13.58 is explicit: audit output is a
   BASELINE, not the list. Proven twice in this arc's own recon:
     · an agent confidently ruled no `Tre`/`Tre` (zero-plural) CORRECT,
       contradicting a native-plural claim of `trær` — while its sibling
       Danish reads `Træ`/`Træer`. Unresolved by machine; a native rules.
     · an agent flagged de `Brot`→`Brote` as a fabricated mass-noun
       plural. `die Brote` (loaves) is perfectly correct. False positive.
   So a net's job is to RANK and BOUND — to make sure no native reviews
   1,263 words with a flat prior, and to catch what a native reading one
   word at a time structurally cannot see (cross-locale and same-head
   inconsistency). Every key still goes to a native (layer 4: exhaustive
   confirm of the bounded set, never a hand-picked subset).

   N1 fabricated-plural   sing≠plural where _countable:false / _type≠noun
   N2 suspicious-zero     sing===plural where _countable:true & _type:noun
   N3 same-head-noun      -tree/-fish/-berry… heads must pluralize alike
   N4 cross-locale probe  zero-plural in one locale but not its siblings
   N5 lemma malformation  sing & plural are different lemmas
   N6 collision           two keys collapsing onto one locale string
   N7 orphan              built-file-only key, no raw metadata
   N8 rule-fallback       the builder's known naive defaults, per locale

   READ-ONLY. Writes only under docs/audit-results/vocab-audit/.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..');
const OUT_DIR = path.join(REPO, 'docs', 'audit-results', 'vocab-audit');
const DOSSIER = path.join(OUT_DIR, 'dossier.json');

const argv = process.argv.slice(2);
const only = (argv.find((a) => a.startsWith('--locale=')) || '').split('=')[1] || null;

/* Sibling groups for N4. Plural morphology is close enough WITHIN a
   group that a lone zero-plural is a genuine signal — this is what
   caught no `Tre`/`Tre` against da `Træ`/`Træer`. It is a SIGNAL, not
   a verdict: sv legitimately zero-plurals many neuters where da does
   not (sv `Träd`/`Träd` is correct), so the native still rules.

   ⚠ TWO SIBLINGS MINIMUM — measured, not assumed. de/nl were originally
   listed as each other's sibling and N4 fired on 249 German keys: German
   zero-plurals ~398 words (-er/-el/-chen) against Dutch's ~157, so "de
   disagrees with nl" is the NORMAL case and the net carried no signal.
   "EVERY sibling disagrees" only discriminates across a group of ≥2
   (Nordic, Romance). de/nl therefore get no N4 — the honest answer is
   that this net cannot see them, not a number that looks like coverage. */
const SIBLINGS = { sv: ['da', 'no'], da: ['sv', 'no'], no: ['sv', 'da'], es: ['pt', 'it'], pt: ['es', 'it'], it: ['es', 'pt'] };

/* N8 — the builder's own naive defaults, quoted from
   scripts/build-image-vocabulary.js. These are the RULES that produced
   the data, so a word matching a rule's naive branch is a prior suspect. */
const RULE_FALLBACK = {
  de: {
    label: '-el/-er/-en left unchanged by the builder (its documented gap)',
    hit: (r) => /(el|er|en)$/.test(r.loc.de.s) && r.loc.de.same,
  },
  /* nl is DELIBERATELY absent from the per-key nets.
     The builder's nl gender rule ends in an unconditional `return 'd'`,
     so "gender === 'd'" fires on 1083/1263 keys = 86%. A net that flags
     86% of the corpus ranks nothing — it measures "is it d", not "is d
     SUSPICIOUS", and those are different questions. Fixing WHAT it
     measures (never loosening a threshold to make a number look better)
     means admitting no per-key nl gender signal exists: the builder
     cannot tell us which of its own defaults it got wrong.
     The population statistic IS real and is reported separately by
     populationSignals() below — 86% `d` against Dutch's true ~2/3
     de-word share implies roughly 240 miscoded het-words, of which the
     prior arc (c7de1a40) hand-fixed only 66. That is an argument for the
     exhaustive native pass, not a ranking. */
  sv: { label: 'blanket zero-plural for ett-words', hit: (r) => r.loc.sv.g === 't' && r.loc.sv.same },
  da: { label: 'blanket zero-plural for et-words', hit: (r) => r.loc.da.g === 't' && r.loc.da.same },
  no: { label: 'blanket zero-plural for et-words', hit: (r) => r.loc.no.g === 'n' && r.loc.no.same },
  fi: { label: 'agglutination unmodeled ("corrections will override if wrong")', hit: () => false },
};

/* ---------------------------------------------------------------------
   Population signals — distribution-level evidence that no per-key net
   can express. A locale whose gender split is far from its real-world
   distribution is telling us the builder's DEFAULT is wrong at scale,
   without telling us WHICH keys. That is an argument for the exhaustive
   native pass; it is never a per-key accusation.
   Reference shares are approximate published norms for common nouns and
   are used only to size a gap, never to flip a key.
--------------------------------------------------------------------- */
const GENDER_NORMS = {
  nl: { code: 'd', label: 'de-words', expect: 0.67, note: "builder default is an unconditional 'd'" },
  sv: { code: 'n', label: 'en-ord (common)', expect: 0.75, note: "builder default is 'n'" },
  da: { code: 'n', label: 'en-ord (common)', expect: 0.75, note: "builder default is 'n'" },
  no: { code: 'm', label: 'en-ord (common)', expect: 0.75, note: "builder default is 'm'; no 'f' exists at all in the data" },
  de: { code: 'm', label: 'maskulin', expect: 0.46, note: "builder defaulted unknown gender to 'm' (the Lineal bug)" },
};
function populationSignals(rows, loc) {
  const norm = GENDER_NORMS[loc];
  if (!norm) return null;
  const gendered = rows.filter((r) => r.loc[loc].g);
  if (!gendered.length) return null;
  const hit = gendered.filter((r) => r.loc[loc].g === norm.code).length;
  const share = hit / gendered.length;
  const excess = share - norm.expect;
  return {
    code: norm.code, label: norm.label, share: share, expect: norm.expect,
    impliedMiscoded: excess > 0.03 ? Math.round(excess * gendered.length) : 0,
    note: norm.note,
  };
}

/* N3 — compound heads whose members must pluralize alike within a locale. */
function headOf(key) {
  const m = key.match(/-(tree|fish|berry|bird|flower|cake|truck|bus|box|hat|shoe|ball|bear|cat|dog|house)$/);
  return m ? m[1] : null;
}

function main() {
  if (!fs.existsSync(DOSSIER)) { console.error('FAIL: run build-dossier.js first'); process.exit(1); }
  const D = JSON.parse(fs.readFileSync(DOSSIER, 'utf8'));
  const rows = D.rows;
  const locales = only ? [only] : D.locales;
  const out = {};

  for (const loc of locales) {
    const flags = {};                                  /* key -> [netId…] */
    const add = (k, n) => (flags[k] || (flags[k] = [])).push(n);

    for (const r of rows) {
      const L = r.loc[loc];

      /* N1 — a non-noun / uncountable that nonetheless carries a plural.
         The highest-confidence class: de Käse→Käsen, en Rain→Rains.
         (`_countable` is EVIDENCE from raw, not a verdict — de `Brot`→
         `Brote` proves the native still decides.) */
      if (!L.same && (r.countable === false || (r.type && r.type !== 'noun'))) add(r.key, 'N1');

      /* N2 — a countable noun with no plural. Often legitimate (de
         -er/-el zero-plural, sv ett-words, en sheep/fish), which is
         exactly why it ranks rather than accuses. */
      if (L.same && r.countable === true && r.type === 'noun') add(r.key, 'N2');

      /* N5 — singular and plural are different LEMMAS, not different
         forms. de pepper ["Paprika","Pfeffer"], de violet
         ["Violett","Veilchen"]. Heuristic: neither string is a prefix
         of the other and they share no 4-char stem. */
      if (!L.same && L.s && L.p) {
        const a = L.s.toLowerCase(), b = L.p.toLowerCase();
        if (!b.startsWith(a.slice(0, Math.min(4, a.length))) && !a.startsWith(b.slice(0, Math.min(4, b.length)))) add(r.key, 'N5');
      }

      /* N7 — built-file-only key: invisible to the builder + to raw
         metadata. Includes the 9 bare verbs (["Eat","Eats"]). */
      if (r.orphan) add(r.key, 'N7');

      /* N8 — matched one of the builder's naive default branches. */
      const rf = RULE_FALLBACK[loc];
      if (rf && rf.hit(r)) add(r.key, 'N8');

      /* N4 — cross-locale probe: zero-plural here, pluralized by every
         sibling. THE net that caught no `Tre` vs da `Træer`. */
      const sibs = SIBLINGS[loc] || [];
      if (L.same && sibs.length && sibs.every((s) => !r.loc[s].same)) add(r.key, 'N4');
    }

    /* N3 — same-head consistency, computed across the head group. */
    const heads = {};
    for (const r of rows) { const h = headOf(r.key); if (h) (heads[h] || (heads[h] = [])).push(r); }
    for (const h of Object.keys(heads)) {
      const grp = heads[h];
      if (grp.length < 3) continue;
      const zero = grp.filter((r) => r.loc[loc].same).length;
      /* a head group that is MOSTLY one way, with a few defectors */
      const minority = Math.min(zero, grp.length - zero);
      if (minority > 0 && minority <= Math.max(1, Math.floor(grp.length * 0.25))) {
        const oddZero = zero < grp.length - zero;
        for (const r of grp) if (r.loc[loc].same === oddZero) add(r.key, 'N3');
      }
    }

    /* N6 — collision: two distinct keys collapsing onto one string. */
    const bySing = {};
    for (const r of rows) (bySing[r.loc[loc].s] || (bySing[r.loc[loc].s] = [])).push(r.key);
    for (const s of Object.keys(bySing)) if (bySing[s].length > 1) for (const k of bySing[s]) add(k, 'N6');

    const pop = populationSignals(rows, loc);
    out[loc] = { flags: flags, population: pop };
    const counts = {};
    for (const k of Object.keys(flags)) for (const n of flags[k]) counts[n] = (counts[n] || 0) + 1;
    const flagged = Object.keys(flags).length;
    console.log(loc + ':  ' + String(flagged).padStart(4) + '/' + rows.length + ' keys flagged   ' +
      Object.keys(counts).sort().map((n) => n + '=' + counts[n]).join(' '));
    if (pop && pop.impliedMiscoded) {
      console.log('       ⚠ population: ' + (100 * pop.share).toFixed(0) + '% ' + pop.label +
        ' vs ~' + (100 * pop.expect).toFixed(0) + '% expected → ~' + pop.impliedMiscoded +
        ' keys likely miscoded (' + pop.note + ')');
    }
  }

  fs.writeFileSync(path.join(OUT_DIR, 'nets.json'), JSON.stringify({ v: 1, nets: out }, null, 0) + '\n');
  console.log('\n→ ' + path.relative(REPO, path.join(OUT_DIR, 'nets.json')) +
    '\n  (nets RANK and BOUND; every key still goes to a native — §A.13.58 layer 4)');
}

main();
