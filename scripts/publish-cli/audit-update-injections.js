// audit-update-injections.js — after an in-place republish (publish-wave --updates-manifest): list live deck pages whose
// PREVIOUS version carried the teaching block or lcs-meter-js and the live one does not (the update path writes a bare
// deck.html; found 2026-10-04: 166 blocks + 116 meter scripts lost by earlier fix waves). Writes /root/lost-inj.txt.
// Restore with restore-update-injections.sh. Exit 1 when anything is lost.
const fs = require('fs');
const D = '/var/www/lcs-media/decks/';
const out = []; const c = { decks: 0, withPrev: 0, lostTB: 0, lostMeter: 0 };
for (const l of fs.readdirSync(D).filter((x) => /^[a-z]{2}$/.test(x))) {
  for (const s of fs.readdirSync(D + l)) {
    if (s.startsWith('.') || /-v\d+$/.test(s)) continue;
    let cur; try { cur = fs.readlinkSync(D + l + '/' + s); } catch (e) { continue; }
    const m = cur.match(/-v(\d+)$/); if (!m) continue; c.decks++;
    const v = +m[1]; if (v < 2) continue;
    let ph; try { ph = fs.readFileSync(D + l + '/' + s + '-v' + (v - 1) + '/deck.html', 'utf8'); } catch (e) { continue; }
    c.withPrev++;
    let ch; try { ch = fs.readFileSync(D + l + '/' + s + '/deck.html', 'utf8'); } catch (e) { continue; }
    const tb = ph.includes('TEACHING_BLOCK_START') && !ch.includes('TEACHING_BLOCK_START');
    const me = ph.includes('lcs-meter-js') && !ch.includes('lcs-meter-js');
    if (tb) c.lostTB++; if (me) c.lostMeter++;
    if (tb || me) out.push(`${l} ${s} ${tb ? 'TB' : ''} ${me ? 'METER' : ''}`);
  }
}
fs.writeFileSync('/root/lost-inj.txt', out.join('\n') + '\n');
console.log(c); process.exitCode = (c.lostTB || c.lostMeter) ? 1 : 0;
const by = {}; for (const r of out) { const k = r.split(' ')[0] + ' ' + (r.match(/-([a-z]+\d+)(-\d+)?\s/) || [])[1]; by[k] = (by[k] || 0) + 1; }
console.log(Object.entries(by).sort((a, b) => b[1] - a[1]).slice(0, 25));
