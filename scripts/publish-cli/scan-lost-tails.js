'use strict';
// Server-side scan: live deck pages whose EARLIER retained version carried a demand title tail
// (append-demand-title-tail.js) and whose live version does not: an in-place republish writes a bare title.
// Also reports whether the meta description changed. Writes /root/lost-tails.txt (one "loc slug" per line).
const fs = require('fs');
const D = '/var/www/lcs-media/decks/';
const TAILS = JSON.parse(fs.readFileSync('/opt/lessoncraftstudio/scripts/publish-cli/demand-title-tails.json', 'utf8'));
const dec = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const head = (f) => { let fd; try { fd = fs.openSync(f, 'r'); } catch (e) { return null; } const b = Buffer.alloc(16384); const n = fs.readSync(fd, b, 0, 16384, 0); fs.closeSync(fd); return b.slice(0, n).toString('utf8'); };
const titleOf = (h) => { const m = h && h.match(/<title>([^<]*)<\/title>/); return m ? dec(m[1]) : null; };
const descOf = (h) => { const m = h && h.match(/<meta name="description" content="([^"]*)"/); return m ? dec(m[1]) : null; };
const out = []; const c = { decks: 0, multi: 0, lost: 0, descChanged: 0 }; const per = {};
for (const l of fs.readdirSync(D).filter((x) => /^[a-z]{2}$/.test(x))) {
  const tails = TAILS[l] ? [TAILS[l].full, TAILS[l].short].filter(Boolean) : [];
  if (!tails.length) continue;
  const hasTail = (t) => !!t && tails.some((x) => t.endsWith(x));
  for (const s of fs.readdirSync(D + l)) {
    if (s.startsWith('.') || /-v\d+$/.test(s)) continue;
    let cur; try { cur = fs.readlinkSync(D + l + '/' + s); } catch (e) { continue; }
    const m = cur.match(/-v(\d+)$/); if (!m) continue; c.decks++;
    const v = +m[1]; if (v < 2) continue; c.multi++;
    const ch = head(D + l + '/' + s + '/deck.html'); const ct = titleOf(ch);
    if (!ct || hasTail(ct)) continue;
    for (let k = v - 1; k >= Math.max(1, v - 3); k--) {
      const ph = head(D + l + '/' + s + '-v' + k + '/deck.html'); const pt = titleOf(ph);
      if (hasTail(pt)) {
        c.lost++; per[l] = (per[l] || 0) + 1;
        const dc = descOf(ph) !== descOf(ch); if (dc) c.descChanged++;
        out.push(`${l} ${s} ${pt.endsWith(TAILS[l].full) ? 'full' : 'short'}`);
        if (c.lost <= 3) console.log(`e.g. ${l}/${s}: v${k} "${pt}" → live "${ct}"${dc ? '  (description changed too)' : ''}`);
        break;
      }
    }
  }
}
fs.writeFileSync('/root/lost-tails.txt', out.join('\n') + (out.length ? '\n' : ''));
console.log(JSON.stringify(c), JSON.stringify(per));
