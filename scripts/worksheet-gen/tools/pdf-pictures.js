// pdfpics(buf) -> a list of "imageHash@x,y,w,h" for every image drawn on every page (in drawing order)
const zlib = require('zlib');
const crypto = require('crypto');
const { PDFDocument, PDFName, PDFRawStream, PDFArray, PDFDict } = require('pdf-lib');

function decode(stream) {
  const f = stream.dict.get(PDFName.of('Filter'));
  const raw = Buffer.from(stream.contents);
  if (f && String(f).includes('FlateDecode')) return zlib.inflateSync(raw);
  return raw;
}
async function pdfpics(buf) {
  const doc = await PDFDocument.load(buf, { updateMetadata: false });
  const out = [];
  for (const page of doc.getPages()) {
    const ctx = doc.context;
    const res = page.node.Resources();
    const names = {};
    const walkX = (resDict, prefix) => {
      const xo = resDict && resDict.lookup(PDFName.of('XObject'));
      if (!(xo instanceof PDFDict)) return;
      for (const [k, v] of xo.entries()) {
        const s = ctx.lookup(v);
        const sub = s.dict.get(PDFName.of('Subtype'));
        names[prefix + k.asString()] = { s, form: String(sub) === '/Form' };
      }
    };
    walkX(res, '');
    let contents = page.node.Contents();
    const streams = contents instanceof PDFArray ? contents.asArray().map((r) => ctx.lookup(r)) : [ctx.lookup(page.node.get(PDFName.of('Contents')))];
    const draw = (txt, depth) => {
      const re = /([-\d.]+) ([-\d.]+) ([-\d.]+) ([-\d.]+) ([-\d.]+) ([-\d.]+) cm|(\/[\w.+-]+) Do/g;
      let cm = '';
      let m;
      while ((m = re.exec(txt))) {
        if (m[1] !== undefined) { cm = [m[1], m[4], m[5], m[6]].map((x) => Math.round(+x)).join(','); continue; }
        const x = names[m[7]];
        if (!x) continue;
        if (x.form && depth < 3) {
          const fres = x.s.dict.lookup(PDFName.of('Resources'));
          walkX(fres, '');
          draw(decode(x.s).toString('latin1'), depth + 1);
          continue;
        }
        const h = crypto.createHash('sha1').update(Buffer.from(x.s.contents)).digest('hex').slice(0, 10);
        out.push(h + '@' + cm);
      }
    };
    for (const s of streams) draw(decode(s).toString('latin1'), 0);
  }
  return out;
}
module.exports = { pdfpics };
