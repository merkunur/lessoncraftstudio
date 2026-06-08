/* Shared de gender-safe render for the readiness bulk (and any de generator).
 * datN(): dative-plural +n on each noun-word unless it already ends -n/-s ("und" untouched).
 * render(): substitutes {N_PL}/{GEN}; applies datN to any slot that is dative plural —
 *   i.e. after the dat.pl article "den" (optionally + invariant plural adjectives) OR bare after "mit".
 *   Genitive "der {GEN}" (Welt der …) and nom/acc "die {N_PL}" correctly take NO +n.
 * Also converts the (occasionally agent-authored) formal "Ihr Kind" → informal "dein Kind"
 *   (capitalized "Dein" at sentence starts) to match the platform's du-register.
 */
'use strict';
function datN(phrase){
  return phrase.replace(/[A-Za-zÄÖÜäöüß]+/g, function (w) { if (w === 'und') return w; if (/[ns]$/.test(w)) return w; return w + 'n'; });
}
function render(tpl, nPl, gen){
  return tpl
    .replace(/(\b[Dd]en )((?:[a-zäöüß]+ )*)\{N_PL\}/g, function (m, art, mid) { return art + mid + datN(nPl); })
    .replace(/(\b[Dd]en )((?:[a-zäöüß]+ )*)\{GEN\}/g, function (m, art, mid) { return art + mid + datN(gen); })
    // bare slot after an ALWAYS-dative preposition (no article) → dative plural +n.
    // (two-way prepositions an/auf/in/unter/zwischen are handled only via "den" above, since they're acc-or-dat.)
    .replace(/\b([Aa]us|[Aa]ußer|[Bb]ei|[Gg]egenüber|[Mm]it|[Nn]ach|[Ss]eit|[Vv]on|[Zz]u) \{N_PL\}/g, function (m, p) { return p + ' ' + datN(nPl); })
    .replace(/\b([Aa]us|[Aa]ußer|[Bb]ei|[Gg]egenüber|[Mm]it|[Nn]ach|[Ss]eit|[Vv]on|[Zz]u) \{GEN\}/g, function (m, p) { return p + ' ' + datN(gen); })
    .replace(/\{N_PL\}/g, nPl)
    .replace(/\{GEN\}/g, gen)
    .replace(/(^|[.!?]\s+)Ihr Kind/g, '$1Dein Kind').replace(/Ihr Kind/g, 'dein Kind')
    .replace(/(^|[.!?]\s+)Ihrem Kind/g, '$1Deinem Kind').replace(/Ihrem Kind/g, 'deinem Kind');
}
module.exports = { datN, render };
