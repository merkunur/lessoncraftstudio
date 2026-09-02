'use strict';
const S = require('./.tmp-window-es.js');
const C = {
  'K-308':  'Une los puntos hacia atrás del 10 al 1',
  'K-311':  'Copia la palabra sin letras punteadas',
  'K-312':  'Repasa y escribe palabras medianas',
  'G1-284': 'Orden alfabético con seis palabras',
  'G1-285': 'Une los puntos contando de 2 en 2',
  'G1-286': 'Dobles y mitades con dibujos hasta 20',
  'G1-290': 'Dictado mudo: una casilla por letra',
  'G1-291': 'Dictado mudo: la primera letra, sin banco',
  'G1-294': 'Une los puntos hacia atrás del 20 al 1',
  'G2-304': 'Une los puntos contando de 5 en 5',
  'G2-306': 'Corrige la frase: nombres con mayúscula',
  'G2-309': 'Escribe sobre la imagen: cuenta la historia',
  'G3-377': 'Problemas de multiplicar y repartir',
};
for (const [id, t] of Object.entries(C)) {
  const w = S.windowFor(id, t);
  console.log(id.padEnd(7), 'title', String(t.length).padStart(2), 'window', w.length ? w[0] + '-' + w[w.length - 1] : 'NONE');
}
