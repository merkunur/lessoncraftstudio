#!/usr/bin/env node
/**
 * inventory-samples.js
 *
 * Scans /var/www/lcs-media/samples/ on the server via SSH,
 * lists all JPEG filenames per language/app folder,
 * writes scripts/sample-inventory.json.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const PLINK = path.join('C:', 'Program Files', 'PuTTY', 'plink.exe');
const SERVER = 'root@65.108.5.250';
const PW = 'JfmiPF_QW4_Nhm';
const HOSTKEY = 'SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU';
const SAMPLES_PATH = '/var/www/lcs-media/samples';

const cmd = `"${PLINK}" -batch -pw ${PW} -hostkey ${HOSTKEY} ${SERVER} "find ${SAMPLES_PATH} -type f -name '*.jpeg' | sort"`;

console.log('Connecting to server to inventory samples...');

let output;
try {
  output = execSync(cmd, { encoding: 'utf-8', timeout: 30000 });
} catch (err) {
  console.error('Failed to connect or run find command:', err.message);
  process.exit(1);
}

const lines = output.trim().split('\n').filter(Boolean);
console.log(`Found ${lines.length} JPEG files on server.`);

const inventory = {};

for (const line of lines) {
  // Line format: /var/www/lcs-media/samples/english/addition/sample-1.jpeg
  const rel = line.replace(SAMPLES_PATH + '/', '');
  const parts = rel.split('/');
  if (parts.length !== 3) {
    console.warn(`Skipping unexpected path: ${line}`);
    continue;
  }
  const [language, appFolder, filename] = parts;

  if (!inventory[language]) inventory[language] = {};
  if (!inventory[language][appFolder]) inventory[language][appFolder] = [];
  inventory[language][appFolder].push(filename);
}

// Sort filenames within each app folder
for (const lang of Object.keys(inventory)) {
  for (const app of Object.keys(inventory[lang])) {
    inventory[lang][app].sort();
  }
}

const langCount = Object.keys(inventory).length;
let appCount = 0;
let fileCount = 0;
for (const lang of Object.keys(inventory)) {
  for (const app of Object.keys(inventory[lang])) {
    appCount++;
    fileCount += inventory[lang][app].length;
  }
}

const outPath = path.join(__dirname, 'sample-inventory.json');
fs.writeFileSync(outPath, JSON.stringify(inventory, null, 2) + '\n');

console.log(`\nInventory written to ${outPath}`);
console.log(`  Languages: ${langCount}`);
console.log(`  App folders: ${appCount}`);
console.log(`  Total files: ${fileCount}`);
