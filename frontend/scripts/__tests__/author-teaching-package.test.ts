#!/usr/bin/env node
/**
 * Unit tests for author-teaching-package.ts validator.
 * Node native `assert` — no test framework dep, mirrors scripts/publish-cli/slug.test.js.
 *
 * Run:
 *   cd frontend && npx tsx scripts/__tests__/author-teaching-package.test.ts
 */

import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as path from 'path';
import * as YAML from 'yaml';
import {
  validate,
  deepMerge,
  detectSparseOverrideLocale,
  loadPackageWithMaybeMerge,
} from '../author-teaching-package';

const FIXTURES_DIR = path.join(__dirname, 'fixtures');

function loadFixture(name: string): any {
  const yamlText = fs.readFileSync(path.join(FIXTURES_DIR, name), 'utf-8');
  return YAML.parse(yamlText);
}

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void): void {
  try {
    fn();
    console.log(`  PASS  ${name}`);
    passed++;
  } catch (e: any) {
    console.error(`  FAIL  ${name}`);
    console.error(`        ${e.message}`);
    failed++;
  }
}

console.log('author-teaching-package validator tests:');

test('valid fixture passes with zero errors', () => {
  const pkg = loadFixture('package-valid.yaml');
  const errors = validate(pkg);
  assert.equal(errors.length, 0, `expected 0 errors, got ${errors.length}: ${JSON.stringify(errors)}`);
});

test('broken-target fixture rejects with targetSlug error', () => {
  const pkg = loadFixture('package-broken-target.yaml');
  const errors = validate(pkg);
  assert.ok(errors.length > 0, 'expected at least 1 error');
  const targetErr = errors.find((e) => e.field === 'targetSlug');
  assert.ok(targetErr, 'expected error on targetSlug field');
  assert.match(targetErr.message, /not found in frontend\/config\/learning-targets\.json/);
});

test('broken-app fixture rejects with composedExercises[0].appName error', () => {
  const pkg = loadFixture('package-broken-app.yaml');
  const errors = validate(pkg);
  assert.ok(errors.length > 0, 'expected at least 1 error');
  const appErr = errors.find((e) => e.field === 'composedExercises[0].appName');
  assert.ok(appErr, 'expected error on composedExercises[0].appName');
  assert.match(appErr.message, /not found in exercise palette/);
});

test('broken-material fixture rejects with materials[0].materialSlug error', () => {
  const pkg = loadFixture('package-broken-material.yaml');
  const errors = validate(pkg);
  assert.ok(errors.length > 0, 'expected at least 1 error');
  const matErr = errors.find((e) => e.field === 'materials[0].materialSlug');
  assert.ok(matErr, 'expected error on materials[0].materialSlug');
  assert.match(matErr.message, /not found in materials catalog/);
});

test('missing required field fails with descriptive error', () => {
  const pkg = loadFixture('package-valid.yaml');
  delete pkg.targetSlug;
  const errors = validate(pkg);
  assert.ok(errors.length > 0);
  const f = errors.find((e) => e.field === 'targetSlug');
  assert.ok(f, 'expected targetSlug missing-field error');
  assert.match(f.message, /required field is missing/);
});

test('invalid language code fails', () => {
  const pkg = loadFixture('package-valid.yaml');
  pkg.language = 'xx';
  const errors = validate(pkg);
  const langErr = errors.find((e) => e.field === 'language');
  assert.ok(langErr, 'expected language error');
  assert.match(langErr.message, /must be one of/);
});

test('invalid exerciseMode for valid app rejects', () => {
  const pkg = loadFixture('package-valid.yaml');
  pkg.composedExercises[0].exerciseMode = 'this-mode-does-not-exist';
  const errors = validate(pkg);
  const modeErr = errors.find((e) => e.field === 'composedExercises[0].exerciseMode');
  assert.ok(modeErr, 'expected mode error');
  assert.match(modeErr.message, /not a valid mode/);
});

test('invalid customization parameter key for valid app rejects', () => {
  const pkg = loadFixture('package-valid.yaml');
  pkg.composedExercises[0].customizationParameters.notARealParam = 42;
  const errors = validate(pkg);
  const paramErr = errors.find((e) => e.field === 'composedExercises[0].customizationParameters.notARealParam');
  assert.ok(paramErr, 'expected customization parameter error');
});

test('invalid customization parameter key for valid material rejects', () => {
  const pkg = loadFixture('package-valid.yaml');
  pkg.materials[0].customizationParameters.notARealParam = 42;
  const errors = validate(pkg);
  const paramErr = errors.find((e) => e.field === 'materials[0].customizationParameters.notARealParam');
  assert.ok(paramErr, 'expected material customization parameter error');
});

test('invalid pedagogical role rejects (exercise side)', () => {
  const pkg = loadFixture('package-valid.yaml');
  pkg.composedExercises[0].pedagogicalRole = 'not-a-role';
  const errors = validate(pkg);
  const roleErr = errors.find((e) => e.field === 'composedExercises[0].pedagogicalRole');
  assert.ok(roleErr, 'expected pedagogical role error');
});

test('missing structure section rejects', () => {
  const pkg = loadFixture('package-valid.yaml');
  delete pkg.structure.warmup;
  const errors = validate(pkg);
  const secErr = errors.find((e) => e.field === 'structure.warmup');
  assert.ok(secErr, 'expected structure.warmup error');
});

test('title missing the package language rejects', () => {
  const pkg = loadFixture('package-valid.yaml');
  pkg.language = 'de';
  const errors = validate(pkg);
  const titleErr = errors.find((e) => e.field === 'title.de');
  assert.ok(titleErr, 'expected title.de error');
  const acErr = errors.find((e) => e.field === 'assessmentCriteria.de');
  assert.ok(acErr, 'expected assessmentCriteria.de error');
});

test('universal customization parameters (e.g. languageSelect) accepted on any app', () => {
  const pkg = loadFixture('package-valid.yaml');
  pkg.composedExercises[0].customizationParameters.languageSelect = 'en';
  pkg.composedExercises[0].customizationParameters.pageSizeSelect = 'a4';
  const errors = validate(pkg);
  assert.equal(errors.length, 0, `expected 0 errors after adding universal params; got ${JSON.stringify(errors)}`);
});

// ============================================================================
// Sparse-override tests (Arc 3 Phase 1)
// ============================================================================

test('detectSparseOverrideLocale: package.yaml is canonical (returns null)', () => {
  assert.equal(detectSparseOverrideLocale('/some/path/package.yaml'), null);
  assert.equal(detectSparseOverrideLocale('package.yml'), null);
});

test('detectSparseOverrideLocale: package.<locale>.yaml returns locale', () => {
  assert.equal(detectSparseOverrideLocale('/some/path/package.es.yaml'), 'es');
  assert.equal(detectSparseOverrideLocale('package.de.yml'), 'de');
  assert.equal(detectSparseOverrideLocale('package.fi.yaml'), 'fi');
  assert.equal(detectSparseOverrideLocale('package.NL.yaml'), 'nl'); // case-insensitive
});

test('detectSparseOverrideLocale: invalid locale returns null', () => {
  assert.equal(detectSparseOverrideLocale('package.xx.yaml'), null);
  assert.equal(detectSparseOverrideLocale('package.zh.yaml'), null);
  assert.equal(detectSparseOverrideLocale('package.ENG.yaml'), null); // not 2-letter
});

test('deepMerge: primitives — override wins', () => {
  assert.equal(deepMerge('a', 'b'), 'b');
  assert.equal(deepMerge(1, 2), 2);
  assert.equal(deepMerge(true, false), false);
});

test('deepMerge: undefined override keeps base', () => {
  assert.equal(deepMerge('a', undefined), 'a');
  assert.deepEqual(deepMerge({ x: 1 }, undefined), { x: 1 });
});

test('deepMerge: null override sets null (intentional)', () => {
  assert.equal(deepMerge('a', null), null);
});

test('deepMerge: arrays REPLACE entirely (override-wins)', () => {
  assert.deepEqual(deepMerge([1, 2, 3], [4, 5]), [4, 5]);
  assert.deepEqual(deepMerge([{ a: 1 }, { b: 2 }], [{ c: 3 }]), [{ c: 3 }]);
});

test('deepMerge: nested objects merge recursively (override-wins per leaf field)', () => {
  const base = { a: 1, b: { c: 2, d: 3 }, e: 'hello' };
  const override = { b: { c: 99 }, f: 'new' };
  assert.deepEqual(deepMerge(base, override), {
    a: 1,
    b: { c: 99, d: 3 },
    e: 'hello',
    f: 'new',
  });
});

test('deepMerge: deeply nested objects', () => {
  const base = { a: { b: { c: { d: 1 } } } };
  const override = { a: { b: { c: { e: 2 } } } };
  assert.deepEqual(deepMerge(base, override), {
    a: { b: { c: { d: 1, e: 2 } } },
  });
});

test('deepMerge: preserves base structure when override only touches leaves', () => {
  const base = {
    title: { en: 'Hello', de: 'Hallo' },
    count: 5,
    items: ['a', 'b'],
  };
  const override = { title: { es: 'Hola' } };
  assert.deepEqual(deepMerge(base, override), {
    title: { en: 'Hello', de: 'Hallo', es: 'Hola' },
    count: 5,
    items: ['a', 'b'],
  });
});

test('loadPackageWithMaybeMerge: canonical file resolves directly (no merge)', () => {
  const result = loadPackageWithMaybeMerge(
    path.join(FIXTURES_DIR, 'package-valid.yaml')
  );
  assert.equal(result.resolvedFrom, 'canonical');
  assert.equal(result.pkg.targetSlug, 'count-objects-1-to-5');
  assert.equal(result.pkg.language, 'en');
});

test('loadPackageWithMaybeMerge: sparse-override merges + force-sets language', () => {
  // Create a transient sparse-override fixture in same dir as package-valid.yaml
  // (which is the canonical for testing). Override only the title.
  const sparsePath = path.join(FIXTURES_DIR, 'package.de.yaml');
  // Need a sibling package.yaml for this test; we'll temporarily symlink or copy.
  // Simpler: copy package-valid.yaml to a temp dir + make a sparse-override there.
  const tmpDir = path.join(FIXTURES_DIR, '__merge-test-tmp');
  fs.mkdirSync(tmpDir, { recursive: true });
  try {
    const canonicalSrc = fs.readFileSync(path.join(FIXTURES_DIR, 'package-valid.yaml'), 'utf-8');
    fs.writeFileSync(path.join(tmpDir, 'package.yaml'), canonicalSrc);
    fs.writeFileSync(
      path.join(tmpDir, 'package.de.yaml'),
      `title:
  de: "Zähle Objekte 1 bis 5 — minimaler Test"
description:
  de: "DE override fixture."
assessmentCriteria:
  de: "DE assessment text."
`
    );
    const result = loadPackageWithMaybeMerge(path.join(tmpDir, 'package.de.yaml'));
    assert.equal(result.resolvedFrom, 'sparse-override-merged');
    assert.equal(result.overrideLocale, 'de');
    assert.equal(result.pkg.language, 'de'); // force-set per merge logic
    assert.equal(
      result.pkg.title.de,
      'Zähle Objekte 1 bis 5 — minimaler Test'
    );
    assert.equal(result.pkg.title.en, 'Count objects 1 to 5 — minimal valid test fixture'); // inherited from canonical
    assert.equal(result.pkg.targetSlug, 'count-objects-1-to-5'); // inherited
    assert.equal(result.pkg.composedExercises.length, 1); // inherited
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('loadPackageWithMaybeMerge: sparse-override with no canonical sibling errors', () => {
  const tmpDir = path.join(FIXTURES_DIR, '__merge-test-tmp-no-canonical');
  fs.mkdirSync(tmpDir, { recursive: true });
  try {
    fs.writeFileSync(path.join(tmpDir, 'package.de.yaml'), 'title:\n  de: "orphan"\n');
    assert.throws(
      () => loadPackageWithMaybeMerge(path.join(tmpDir, 'package.de.yaml')),
      /no sibling package\.yaml/
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

console.log('\n---');
console.log(`${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
process.exit(0);
