#!/usr/bin/env node
/**
 * populate-es-carousel.js — data-only carousel backfill for es landings.
 *
 * Populates the `carousel` field of every es landing in
 * frontend/content/seo-landing/es.json with a same-(type,mode) sibling ring.
 *
 * Rule (operator-ruled 2026-06-09): each landing links up to 4 SAME-(type,mode)
 * siblings at fixed wrap-around offsets [1,2,5,11] over the theme-sorted group.
 * Honest-fit HARD constraint: siblings are same type+mode only; label matches the
 * operation (addition → "Sumas con <Tema>", subtraction → "Resta con <Tema>").
 * NEVER a cross-mode/cross-op sibling. Groups with <5 themes wrap within whatever
 * exists (dedup, exclude self) — a 3-link carousel is honest, a 4th wrong-op is not.
 *
 * Re-runnable: run after every es batch's assembly; the ring enriches as more
 * coordinates land. Data-only (es.json carousel field); zero protected-core blast radius.
 */
const fs = require('fs');
const path = require('path');
const ESP = path.join(__dirname, '..', '..', 'frontend', 'content', 'seo-landing', 'es.json');

const THEME_ES = {
  '4th_of_july': '4 de Julio', accessories: 'Accesorios', activities: 'Actividades',
  around_the_house: 'Alrededor de la Casa', animals: 'Animales', farm_animals: 'Animales de Granja',
  zoo_animals: 'Animales del Zoológico', tree: 'Árboles', birds_2: 'Aves', birds: 'Aves',
  camping: 'Campamento', weather: 'Clima', colors: 'Colores', things_that_fly: 'Cosas que Vuelan',
  forest_creatures: 'Criaturas del Bosque', breakfast: 'Desayuno', thanksgivinng: 'Día de Acción de Gracias',
  dinosaurs: 'Dinosaurios', emotions: 'Emociones', at_the_supermarket: 'En el Supermercado',
  space: 'Espacio', flowers: 'Flores', shapes: 'Formas', fruits: 'Frutas', tools: 'Herramientas',
  hospital: 'Hospital', insects_and_bugs: 'Insectos y Bichos', winter: 'Invierno', toys: 'Juguetes',
  pets: 'Mascotas', miscellaneous: 'Miscelánea', furniture: 'Muebles', music: 'Música',
  christmas: 'Navidad', occupations: 'Ocupaciones', post_office: 'Oficina de Correos', bakery: 'Panadería',
  body_parts: 'Partes del Cuerpo', easter: 'Pascua', beach: 'Playa', desserts_and_sweets: 'Postres y Dulces',
  spring: 'Primavera', reptiles_and_amphibians: 'Reptiles y Anfibios', clothing: 'Ropa',
  classroom: 'Salón de Clases', kitchen_tools: 'Utensilios de Cocina', vehicles: 'Vehículos',
  summer: 'Verano', vegetables: 'Verduras', ocean_life: 'Vida Marina',
};
const OFFSETS = [1, 2, 5, 11];

const es = JSON.parse(fs.readFileSync(ESP, 'utf8'));
const groups = {};
for (const l of es.landings) {
  const k = l.coordinate.type + '|' + l.coordinate.mode;
  (groups[k] = groups[k] || []).push(l);
}
for (const k in groups) {
  groups[k].sort((a, b) => (a.coordinate.theme < b.coordinate.theme ? -1 : a.coordinate.theme > b.coordinate.theme ? 1 : (a.slug < b.slug ? -1 : 1)));
}
let populated = 0, sub4 = 0;
for (const k in groups) {
  const list = groups[k];
  const len = list.length;
  const prefix = list[0].coordinate.type === 'addition' ? 'Sumas con ' : list[0].coordinate.type === 'subtraction' ? 'Resta con ' : null;
  if (!prefix) continue; // only addition/subtraction in es so far
  for (let i = 0; i < len; i++) {
    const self = list[i];
    const seen = new Set([self.slug]);
    const car = [];
    for (const off of OFFSETS) {
      if (car.length >= 4) break;
      const n = list[(i + off) % len];
      if (seen.has(n.slug)) continue;
      seen.add(n.slug);
      car.push({ label: prefix + (THEME_ES[n.coordinate.theme] || n.coordinate.theme), href: n.slug });
    }
    self.carousel = car;
    populated++;
    if (car.length < 4) sub4++;
  }
}
fs.writeFileSync(ESP, JSON.stringify(es, null, 2) + '\n');

// QC
const bySlug = new Map(es.landings.map((l) => [l.slug, l]));
let bad = 0;
for (const l of es.landings) {
  if (!Array.isArray(l.carousel) || l.carousel.length === 0) { console.log('EMPTY', l.slug); bad++; continue; }
  for (const c of l.carousel) {
    const t = bySlug.get(c.href);
    if (!t) { console.log('DANGLING', l.slug, '->', c.href); bad++; continue; }
    if (t.coordinate.type !== l.coordinate.type || t.coordinate.mode !== l.coordinate.mode) { console.log('CROSS-MODE', l.slug, '->', c.href); bad++; }
    const wantPrefix = l.coordinate.type === 'addition' ? 'Sumas con ' : 'Resta con ';
    if (!c.label.startsWith(wantPrefix)) { console.log('LABEL-OP-MISMATCH', l.slug, '->', c.label); bad++; }
    if (c.href === l.slug) { console.log('SELF-LINK', l.slug); bad++; }
  }
}
console.log('=== populated ' + populated + ' | <4-link ' + sub4 + ' | QC-bad ' + bad + ' | groups ' + Object.keys(groups).map((k) => k + ':' + groups[k].length).join(', ') + ' ===');
