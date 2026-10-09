// page-use.js <locale> — the lowest content row of every b7 print render (above the footer strip), as a share of the page
const sharp = require('sharp'); const fs = require('fs'); const path = require('path');
const loc = process.argv[2]; const dir = path.join(__dirname, '..', 'out', 'b7-sweep', loc);
const IDS = ['K-395','K-397','K-398','G1-412','G2-388','G1-413','G1-414','G1-415','K-399','K-400','G2-389','K-396','K-401','K-402','K-403','G1-416','K-404','G1-417','G1-418','G1-419','G2-390','G2-391'];
(async () => { for (const id of IDS) { const p = path.join(dir, `${id}-null-d2-${loc}.png`); if (!fs.existsSync(p)) continue;
  const img = sharp(p).greyscale(); const { data, info } = await img.raw().toBuffer({ resolveWithObject: true }); const W = info.width, H = info.height;
  // footer: the 'Made with' strip sits in the last ~4 % — scan above it
  const top = Math.round(H * 0.955); let low = 0;
  for (let y = top; y >= 0 && !low; y--) { for (let x = 0; x < W; x += 2) if (data[y * W + x] < 235) { low = y; break; } }
  console.log(id, 'lowest content row', low, '/', H, '=', (100 * low / H).toFixed(1) + '%'); } })();
