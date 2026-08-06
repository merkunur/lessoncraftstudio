const fs = require('fs');
const path = require('path');
const dirs = ['frontend/config/app-content', 'frontend/config/tool-content', 'frontend/config/guide-content', 'frontend/config/bundle-content', 'frontend/config/idea-content', 'frontend/config/start-content', 'frontend/config/compare-content'];
let issues = [];
function scan(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, {withFileTypes:true})) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) { scan(fp); continue; }
    if (!e.name.endsWith('.ts')) continue;
    const lines = fs.readFileSync(fp,'utf8').split('\n');
    for (let i=0; i<lines.length; i++) {
      const l = lines[i];
      let count = 0;
      for (let j=0; j<l.length; j++) {
        if (l[j] === "'" && (j === 0 || l[j-1] !== '\\')) count++;
      }
      if (count % 2 !== 0 && count > 2) {
        issues.push(fp + ':' + (i+1) + ' (' + count + ' quotes): ' + l.trim().substring(0, 120));
      }
    }
  }
}
dirs.forEach(scan);
console.log(issues.length + ' lines with odd unescaped quote counts');
issues.forEach(i => console.log(i));
