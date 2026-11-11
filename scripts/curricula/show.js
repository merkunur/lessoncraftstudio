/**
 * What a teacher is SHOWN for an objective of a registry (Daily Teaching System, Part 2). One rule for the whole site,
 * so that a page never prints an id this registry invented and never quotes an objective's wording:
 *
 *   shown(registry, node) → { framework, code, titles }
 *     framework  the short name of the document ("Common Core", "LehrplanPLUS", "Lgr22" …)
 *     code       the objective's own official code (show = code), or the plan's own number of the part it stands in
 *                (show = label), or null (show = area)
 *     titles     the titles of the parts the objective stands under, outermost first (headings of the document,
 *                and the objective's `domain` where the builder kept one) — never the objective's own wording
 *
 * `registry` is { framework: framework.json, display: the registry's entry of display.json }. Used by the gates (C7:
 * every crosswalk row can be shown) and, from Part 3 on, by the pages.
 */
'use strict';
function shown(registry, node) {
  const fw = registry.framework;
  if (!registry._byId) registry._byId = new Map(fw.nodes.map((n) => [n.id, n]));
  const meta = fw.frameworks.find((f) => f.key === node.f);
  const d = (registry.display.frameworks || {})[node.f] || {};
  const titleKinds = d.titleKinds || ['area', 'subarea'];
  const chain = [];
  for (let n = node, guard = 0; n && guard < 12; n = n.parent ? registry._byId.get(n.parent) : null, guard++) chain.push(n);
  // titles: the parts above the objective; the objective itself only when it IS such a part (a row may name a whole area)
  const titles = chain.filter((n, i) => titleKinds.includes(n.kind) && (i > 0 || n.kind !== 'standard')).map((n) => n.text).reverse();
  if (node.domain && !titles.includes(node.domain)) titles.push(node.domain);
  let code = null;
  if (d.show === 'code') code = d.strip && node.id.startsWith(d.strip) ? node.id.slice(d.strip.length) : node.id;
  else if (d.show === 'label') { const l = chain.find((n) => n.label); code = l ? l.label : null; }
  return { framework: (meta && meta.short) || d.short || '', code, titles };
}
/** one line, for a list or a chip: "TEKS K.2.A", "LehrplanPLUS M1/2 1.1 · Zahlen und Operationen", "Lgr22 · Taluppfattning och tals användning" */
function line(registry, node) {
  const s = shown(registry, node);
  const last = s.titles[s.titles.length - 1];
  return [s.framework + (s.code ? ' ' + s.code : ''), last].filter(Boolean).join(' · ');
}
module.exports = { shown, line };
