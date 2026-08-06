// One-shot bundle-trace: parse DECK_BUNDLE from each deck.html in
// "test decks/" and dump the actual runtime shape per app. Produces
// per-app summaries that drive the corrected Group A enumeration.

const fs = require('fs');
const path = require('path');

const DIR = 'test decks';

function extractBundle(html) {
  const m = html.match(/<script>var DECK_BUNDLE = ([\s\S]+?);<\/script>/);
  if (!m) return null;
  try { return JSON.parse(m[1]); }
  catch (e) { return { __parseError: e.message }; }
}

function summarize(bundle) {
  if (!bundle) return { error: 'no DECK_BUNDLE found' };
  if (bundle.__parseError) return { error: 'parse: ' + bundle.__parseError };

  const summary = {
    appType: bundle.appType,
    contentLanguage: bundle.contentLanguage,
    bundleVersion: bundle.bundleVersion,
    topLevelKeys: Object.keys(bundle).sort(),
    arrayFields: {}
  };

  for (const k of Object.keys(bundle)) {
    if (Array.isArray(bundle[k])) {
      const arr = bundle[k];
      const first = arr[0];
      const entry = {
        length: arr.length,
        firstItemKeys: (first && typeof first === 'object') ? Object.keys(first).sort() : null,
        firstItemSample: first
      };
      summary.arrayFields[k] = entry;
    }
  }

  return summary;
}

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html')).sort();

for (const f of files) {
  const html = fs.readFileSync(path.join(DIR, f), 'utf8');
  const bundle = extractBundle(html);
  const s = summarize(bundle);
  console.log('═'.repeat(70));
  console.log(' ' + f);
  console.log('═'.repeat(70));
  if (s.error) { console.log('ERROR: ' + s.error); console.log(''); continue; }
  console.log('appType:         ' + s.appType);
  console.log('contentLanguage: ' + s.contentLanguage);
  console.log('bundleVersion:   ' + s.bundleVersion);
  console.log('top-level keys:  ' + s.topLevelKeys.join(', '));
  console.log('');
  console.log('mode-relevant top-level scalars:');
  for (const k of s.topLevelKeys) {
    const v = bundle[k];
    if (v == null) { console.log('  ' + k + ': null'); continue; }
    if (typeof v === 'string' && v.length < 60) console.log('  ' + k + ': "' + v + '"');
    else if (typeof v === 'number' || typeof v === 'boolean') console.log('  ' + k + ': ' + v);
    else if (typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length < 6 && k !== 'attribution' && k !== 'imageRefs') {
      console.log('  ' + k + ': ' + JSON.stringify(v).slice(0, 120));
    }
  }
  console.log('');
  for (const [k, info] of Object.entries(s.arrayFields)) {
    if (k === 'imagePlacements' || k === 'chartCells') {
      console.log('  ' + k + '[]: length=' + info.length + ' (skip detail — bulk geometry)');
      continue;
    }
    console.log('  ' + k + '[] length=' + info.length + ', first item keys: ' + (info.firstItemKeys || []).join(', '));
    if (info.firstItemSample && typeof info.firstItemSample === 'object') {
      // Print a compact sample (skip rect/image-data fields)
      const compact = {};
      for (const fk of Object.keys(info.firstItemSample)) {
        const fv = info.firstItemSample[fk];
        if (fk === 'rect' || fk === 'inputRect') compact[fk] = '<rect>';
        else if (typeof fv === 'string' && fv.length > 100) compact[fk] = fv.slice(0, 80) + '...';
        else if (Array.isArray(fv)) compact[fk] = '<array len=' + fv.length + '>';
        else if (typeof fv === 'object' && fv !== null && Object.keys(fv).length > 4) compact[fk] = '<object keys=' + Object.keys(fv).join(',') + '>';
        else compact[fk] = fv;
      }
      console.log('    sample: ' + JSON.stringify(compact));
    }
  }
  console.log('');
}
