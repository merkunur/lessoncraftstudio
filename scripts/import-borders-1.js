/**
 * Border Import Script: Borders 1 Folder
 *
 * IMPORTANT: Borders are a THIRD content type:
 * 1. type: 'borders' (not 'images' or 'backgrounds')
 * 2. Stored in /images/borders/{theme}/ (not /images/{theme}/)
 * 3. NO resize - keep original aspect ratio
 *
 * Usage: Upload to server, then run:
 *   cd /opt/lessoncraftstudio/frontend && NODE_PATH=./node_modules node ../scripts/import-borders-1.js
 */

const { PrismaClient } = require('@prisma/client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// ============================================================
// CONFIGURATION
// ============================================================

const THEME_CONFIG = {
  name: 'borders_2',
  type: 'borders',
  sourceFolderName: 'BORDERS/borders 1',
  displayNames: {
    en: 'Borders 2',
    de: 'Rahmen 2',
    fr: 'Bordures 2',
    es: 'Marcos 2',
    it: 'Bordi 2',
    pt: 'Bordas 2',
    nl: 'Randen 2',
    sv: 'Ramar 2',
    da: 'Rammer 2',
    no: 'Rammer 2',
    fi: 'Kehykset 2'
  }
};

// Image translations - KEY IS FILENAME WITHOUT EXTENSION (lowercase)
const IMAGE_TRANSLATIONS = {
  // Landscape borders 014-045
  'borders landscape 014': {
    en: 'Landscape Border 14',
    de: 'Querformat Rahmen 14',
    fr: 'Bordure paysage 14',
    es: 'Marco horizontal 14',
    it: 'Bordo orizzontale 14',
    pt: 'Borda paisagem 14',
    nl: 'Liggende rand 14',
    sv: 'Liggande ram 14',
    da: 'Landskabsramme 14',
    no: 'Liggende ramme 14',
    fi: 'Vaakakehys 14'
  },
  'borders landscape 015': {
    en: 'Landscape Border 15',
    de: 'Querformat Rahmen 15',
    fr: 'Bordure paysage 15',
    es: 'Marco horizontal 15',
    it: 'Bordo orizzontale 15',
    pt: 'Borda paisagem 15',
    nl: 'Liggende rand 15',
    sv: 'Liggande ram 15',
    da: 'Landskabsramme 15',
    no: 'Liggende ramme 15',
    fi: 'Vaakakehys 15'
  },
  'borders landscape 016': {
    en: 'Landscape Border 16',
    de: 'Querformat Rahmen 16',
    fr: 'Bordure paysage 16',
    es: 'Marco horizontal 16',
    it: 'Bordo orizzontale 16',
    pt: 'Borda paisagem 16',
    nl: 'Liggende rand 16',
    sv: 'Liggande ram 16',
    da: 'Landskabsramme 16',
    no: 'Liggende ramme 16',
    fi: 'Vaakakehys 16'
  },
  'borders landscape 017': {
    en: 'Landscape Border 17',
    de: 'Querformat Rahmen 17',
    fr: 'Bordure paysage 17',
    es: 'Marco horizontal 17',
    it: 'Bordo orizzontale 17',
    pt: 'Borda paisagem 17',
    nl: 'Liggende rand 17',
    sv: 'Liggande ram 17',
    da: 'Landskabsramme 17',
    no: 'Liggende ramme 17',
    fi: 'Vaakakehys 17'
  },
  'borders landscape 018': {
    en: 'Landscape Border 18',
    de: 'Querformat Rahmen 18',
    fr: 'Bordure paysage 18',
    es: 'Marco horizontal 18',
    it: 'Bordo orizzontale 18',
    pt: 'Borda paisagem 18',
    nl: 'Liggende rand 18',
    sv: 'Liggande ram 18',
    da: 'Landskabsramme 18',
    no: 'Liggende ramme 18',
    fi: 'Vaakakehys 18'
  },
  'borders landscape 019': {
    en: 'Landscape Border 19',
    de: 'Querformat Rahmen 19',
    fr: 'Bordure paysage 19',
    es: 'Marco horizontal 19',
    it: 'Bordo orizzontale 19',
    pt: 'Borda paisagem 19',
    nl: 'Liggende rand 19',
    sv: 'Liggande ram 19',
    da: 'Landskabsramme 19',
    no: 'Liggende ramme 19',
    fi: 'Vaakakehys 19'
  },
  'borders landscape 020': {
    en: 'Landscape Border 20',
    de: 'Querformat Rahmen 20',
    fr: 'Bordure paysage 20',
    es: 'Marco horizontal 20',
    it: 'Bordo orizzontale 20',
    pt: 'Borda paisagem 20',
    nl: 'Liggende rand 20',
    sv: 'Liggande ram 20',
    da: 'Landskabsramme 20',
    no: 'Liggende ramme 20',
    fi: 'Vaakakehys 20'
  },
  'borders landscape 021': {
    en: 'Landscape Border 21',
    de: 'Querformat Rahmen 21',
    fr: 'Bordure paysage 21',
    es: 'Marco horizontal 21',
    it: 'Bordo orizzontale 21',
    pt: 'Borda paisagem 21',
    nl: 'Liggende rand 21',
    sv: 'Liggande ram 21',
    da: 'Landskabsramme 21',
    no: 'Liggende ramme 21',
    fi: 'Vaakakehys 21'
  },
  'borders landscape 022': {
    en: 'Landscape Border 22',
    de: 'Querformat Rahmen 22',
    fr: 'Bordure paysage 22',
    es: 'Marco horizontal 22',
    it: 'Bordo orizzontale 22',
    pt: 'Borda paisagem 22',
    nl: 'Liggende rand 22',
    sv: 'Liggande ram 22',
    da: 'Landskabsramme 22',
    no: 'Liggende ramme 22',
    fi: 'Vaakakehys 22'
  },
  'borders landscape 023': {
    en: 'Landscape Border 23',
    de: 'Querformat Rahmen 23',
    fr: 'Bordure paysage 23',
    es: 'Marco horizontal 23',
    it: 'Bordo orizzontale 23',
    pt: 'Borda paisagem 23',
    nl: 'Liggende rand 23',
    sv: 'Liggande ram 23',
    da: 'Landskabsramme 23',
    no: 'Liggende ramme 23',
    fi: 'Vaakakehys 23'
  },
  'borders landscape 024': {
    en: 'Landscape Border 24',
    de: 'Querformat Rahmen 24',
    fr: 'Bordure paysage 24',
    es: 'Marco horizontal 24',
    it: 'Bordo orizzontale 24',
    pt: 'Borda paisagem 24',
    nl: 'Liggende rand 24',
    sv: 'Liggande ram 24',
    da: 'Landskabsramme 24',
    no: 'Liggende ramme 24',
    fi: 'Vaakakehys 24'
  },
  'borders landscape 025': {
    en: 'Landscape Border 25',
    de: 'Querformat Rahmen 25',
    fr: 'Bordure paysage 25',
    es: 'Marco horizontal 25',
    it: 'Bordo orizzontale 25',
    pt: 'Borda paisagem 25',
    nl: 'Liggende rand 25',
    sv: 'Liggande ram 25',
    da: 'Landskabsramme 25',
    no: 'Liggende ramme 25',
    fi: 'Vaakakehys 25'
  },
  'borders landscape 026': {
    en: 'Landscape Border 26',
    de: 'Querformat Rahmen 26',
    fr: 'Bordure paysage 26',
    es: 'Marco horizontal 26',
    it: 'Bordo orizzontale 26',
    pt: 'Borda paisagem 26',
    nl: 'Liggende rand 26',
    sv: 'Liggande ram 26',
    da: 'Landskabsramme 26',
    no: 'Liggende ramme 26',
    fi: 'Vaakakehys 26'
  },
  'borders landscape 027': {
    en: 'Landscape Border 27',
    de: 'Querformat Rahmen 27',
    fr: 'Bordure paysage 27',
    es: 'Marco horizontal 27',
    it: 'Bordo orizzontale 27',
    pt: 'Borda paisagem 27',
    nl: 'Liggende rand 27',
    sv: 'Liggande ram 27',
    da: 'Landskabsramme 27',
    no: 'Liggende ramme 27',
    fi: 'Vaakakehys 27'
  },
  'borders landscape 028': {
    en: 'Landscape Border 28',
    de: 'Querformat Rahmen 28',
    fr: 'Bordure paysage 28',
    es: 'Marco horizontal 28',
    it: 'Bordo orizzontale 28',
    pt: 'Borda paisagem 28',
    nl: 'Liggende rand 28',
    sv: 'Liggande ram 28',
    da: 'Landskabsramme 28',
    no: 'Liggende ramme 28',
    fi: 'Vaakakehys 28'
  },
  'borders landscape 029': {
    en: 'Landscape Border 29',
    de: 'Querformat Rahmen 29',
    fr: 'Bordure paysage 29',
    es: 'Marco horizontal 29',
    it: 'Bordo orizzontale 29',
    pt: 'Borda paisagem 29',
    nl: 'Liggende rand 29',
    sv: 'Liggande ram 29',
    da: 'Landskabsramme 29',
    no: 'Liggende ramme 29',
    fi: 'Vaakakehys 29'
  },
  'borders landscape 030': {
    en: 'Landscape Border 30',
    de: 'Querformat Rahmen 30',
    fr: 'Bordure paysage 30',
    es: 'Marco horizontal 30',
    it: 'Bordo orizzontale 30',
    pt: 'Borda paisagem 30',
    nl: 'Liggende rand 30',
    sv: 'Liggande ram 30',
    da: 'Landskabsramme 30',
    no: 'Liggende ramme 30',
    fi: 'Vaakakehys 30'
  },
  'borders landscape 031': {
    en: 'Landscape Border 31',
    de: 'Querformat Rahmen 31',
    fr: 'Bordure paysage 31',
    es: 'Marco horizontal 31',
    it: 'Bordo orizzontale 31',
    pt: 'Borda paisagem 31',
    nl: 'Liggende rand 31',
    sv: 'Liggande ram 31',
    da: 'Landskabsramme 31',
    no: 'Liggende ramme 31',
    fi: 'Vaakakehys 31'
  },
  'borders landscape 032': {
    en: 'Landscape Border 32',
    de: 'Querformat Rahmen 32',
    fr: 'Bordure paysage 32',
    es: 'Marco horizontal 32',
    it: 'Bordo orizzontale 32',
    pt: 'Borda paisagem 32',
    nl: 'Liggende rand 32',
    sv: 'Liggande ram 32',
    da: 'Landskabsramme 32',
    no: 'Liggende ramme 32',
    fi: 'Vaakakehys 32'
  },
  'borders landscape 033': {
    en: 'Landscape Border 33',
    de: 'Querformat Rahmen 33',
    fr: 'Bordure paysage 33',
    es: 'Marco horizontal 33',
    it: 'Bordo orizzontale 33',
    pt: 'Borda paisagem 33',
    nl: 'Liggende rand 33',
    sv: 'Liggande ram 33',
    da: 'Landskabsramme 33',
    no: 'Liggende ramme 33',
    fi: 'Vaakakehys 33'
  },
  'borders landscape 034': {
    en: 'Landscape Border 34',
    de: 'Querformat Rahmen 34',
    fr: 'Bordure paysage 34',
    es: 'Marco horizontal 34',
    it: 'Bordo orizzontale 34',
    pt: 'Borda paisagem 34',
    nl: 'Liggende rand 34',
    sv: 'Liggande ram 34',
    da: 'Landskabsramme 34',
    no: 'Liggende ramme 34',
    fi: 'Vaakakehys 34'
  },
  'borders landscape 035': {
    en: 'Landscape Border 35',
    de: 'Querformat Rahmen 35',
    fr: 'Bordure paysage 35',
    es: 'Marco horizontal 35',
    it: 'Bordo orizzontale 35',
    pt: 'Borda paisagem 35',
    nl: 'Liggende rand 35',
    sv: 'Liggande ram 35',
    da: 'Landskabsramme 35',
    no: 'Liggende ramme 35',
    fi: 'Vaakakehys 35'
  },
  'borders landscape 036': {
    en: 'Landscape Border 36',
    de: 'Querformat Rahmen 36',
    fr: 'Bordure paysage 36',
    es: 'Marco horizontal 36',
    it: 'Bordo orizzontale 36',
    pt: 'Borda paisagem 36',
    nl: 'Liggende rand 36',
    sv: 'Liggande ram 36',
    da: 'Landskabsramme 36',
    no: 'Liggende ramme 36',
    fi: 'Vaakakehys 36'
  },
  'borders landscape 037': {
    en: 'Landscape Border 37',
    de: 'Querformat Rahmen 37',
    fr: 'Bordure paysage 37',
    es: 'Marco horizontal 37',
    it: 'Bordo orizzontale 37',
    pt: 'Borda paisagem 37',
    nl: 'Liggende rand 37',
    sv: 'Liggande ram 37',
    da: 'Landskabsramme 37',
    no: 'Liggende ramme 37',
    fi: 'Vaakakehys 37'
  },
  'borders landscape 038': {
    en: 'Landscape Border 38',
    de: 'Querformat Rahmen 38',
    fr: 'Bordure paysage 38',
    es: 'Marco horizontal 38',
    it: 'Bordo orizzontale 38',
    pt: 'Borda paisagem 38',
    nl: 'Liggende rand 38',
    sv: 'Liggande ram 38',
    da: 'Landskabsramme 38',
    no: 'Liggende ramme 38',
    fi: 'Vaakakehys 38'
  },
  'borders landscape 039': {
    en: 'Landscape Border 39',
    de: 'Querformat Rahmen 39',
    fr: 'Bordure paysage 39',
    es: 'Marco horizontal 39',
    it: 'Bordo orizzontale 39',
    pt: 'Borda paisagem 39',
    nl: 'Liggende rand 39',
    sv: 'Liggande ram 39',
    da: 'Landskabsramme 39',
    no: 'Liggende ramme 39',
    fi: 'Vaakakehys 39'
  },
  'borders landscape 040': {
    en: 'Landscape Border 40',
    de: 'Querformat Rahmen 40',
    fr: 'Bordure paysage 40',
    es: 'Marco horizontal 40',
    it: 'Bordo orizzontale 40',
    pt: 'Borda paisagem 40',
    nl: 'Liggende rand 40',
    sv: 'Liggande ram 40',
    da: 'Landskabsramme 40',
    no: 'Liggende ramme 40',
    fi: 'Vaakakehys 40'
  },
  'borders landscape 041': {
    en: 'Landscape Border 41',
    de: 'Querformat Rahmen 41',
    fr: 'Bordure paysage 41',
    es: 'Marco horizontal 41',
    it: 'Bordo orizzontale 41',
    pt: 'Borda paisagem 41',
    nl: 'Liggende rand 41',
    sv: 'Liggande ram 41',
    da: 'Landskabsramme 41',
    no: 'Liggende ramme 41',
    fi: 'Vaakakehys 41'
  },
  'borders landscape 042': {
    en: 'Landscape Border 42',
    de: 'Querformat Rahmen 42',
    fr: 'Bordure paysage 42',
    es: 'Marco horizontal 42',
    it: 'Bordo orizzontale 42',
    pt: 'Borda paisagem 42',
    nl: 'Liggende rand 42',
    sv: 'Liggande ram 42',
    da: 'Landskabsramme 42',
    no: 'Liggende ramme 42',
    fi: 'Vaakakehys 42'
  },
  'borders landscape 043': {
    en: 'Landscape Border 43',
    de: 'Querformat Rahmen 43',
    fr: 'Bordure paysage 43',
    es: 'Marco horizontal 43',
    it: 'Bordo orizzontale 43',
    pt: 'Borda paisagem 43',
    nl: 'Liggende rand 43',
    sv: 'Liggande ram 43',
    da: 'Landskabsramme 43',
    no: 'Liggende ramme 43',
    fi: 'Vaakakehys 43'
  },
  'borders landscape 044': {
    en: 'Landscape Border 44',
    de: 'Querformat Rahmen 44',
    fr: 'Bordure paysage 44',
    es: 'Marco horizontal 44',
    it: 'Bordo orizzontale 44',
    pt: 'Borda paisagem 44',
    nl: 'Liggende rand 44',
    sv: 'Liggande ram 44',
    da: 'Landskabsramme 44',
    no: 'Liggende ramme 44',
    fi: 'Vaakakehys 44'
  },
  'borders landscape 045': {
    en: 'Landscape Border 45',
    de: 'Querformat Rahmen 45',
    fr: 'Bordure paysage 45',
    es: 'Marco horizontal 45',
    it: 'Bordo orizzontale 45',
    pt: 'Borda paisagem 45',
    nl: 'Liggende rand 45',
    sv: 'Liggande ram 45',
    da: 'Landskabsramme 45',
    no: 'Liggende ramme 45',
    fi: 'Vaakakehys 45'
  },
  // Portrait borders 020-033
  'borders portrait 020': {
    en: 'Portrait Border 20',
    de: 'Hochformat Rahmen 20',
    fr: 'Bordure portrait 20',
    es: 'Marco vertical 20',
    it: 'Bordo verticale 20',
    pt: 'Borda retrato 20',
    nl: 'Staande rand 20',
    sv: 'Stående ram 20',
    da: 'Portrætramme 20',
    no: 'Stående ramme 20',
    fi: 'Pystykehys 20'
  },
  'borders portrait 021': {
    en: 'Portrait Border 21',
    de: 'Hochformat Rahmen 21',
    fr: 'Bordure portrait 21',
    es: 'Marco vertical 21',
    it: 'Bordo verticale 21',
    pt: 'Borda retrato 21',
    nl: 'Staande rand 21',
    sv: 'Stående ram 21',
    da: 'Portrætramme 21',
    no: 'Stående ramme 21',
    fi: 'Pystykehys 21'
  },
  'borders portrait 022': {
    en: 'Portrait Border 22',
    de: 'Hochformat Rahmen 22',
    fr: 'Bordure portrait 22',
    es: 'Marco vertical 22',
    it: 'Bordo verticale 22',
    pt: 'Borda retrato 22',
    nl: 'Staande rand 22',
    sv: 'Stående ram 22',
    da: 'Portrætramme 22',
    no: 'Stående ramme 22',
    fi: 'Pystykehys 22'
  },
  'borders portrait 023': {
    en: 'Portrait Border 23',
    de: 'Hochformat Rahmen 23',
    fr: 'Bordure portrait 23',
    es: 'Marco vertical 23',
    it: 'Bordo verticale 23',
    pt: 'Borda retrato 23',
    nl: 'Staande rand 23',
    sv: 'Stående ram 23',
    da: 'Portrætramme 23',
    no: 'Stående ramme 23',
    fi: 'Pystykehys 23'
  },
  'borders portrait 024': {
    en: 'Portrait Border 24',
    de: 'Hochformat Rahmen 24',
    fr: 'Bordure portrait 24',
    es: 'Marco vertical 24',
    it: 'Bordo verticale 24',
    pt: 'Borda retrato 24',
    nl: 'Staande rand 24',
    sv: 'Stående ram 24',
    da: 'Portrætramme 24',
    no: 'Stående ramme 24',
    fi: 'Pystykehys 24'
  },
  'borders portrait 025': {
    en: 'Portrait Border 25',
    de: 'Hochformat Rahmen 25',
    fr: 'Bordure portrait 25',
    es: 'Marco vertical 25',
    it: 'Bordo verticale 25',
    pt: 'Borda retrato 25',
    nl: 'Staande rand 25',
    sv: 'Stående ram 25',
    da: 'Portrætramme 25',
    no: 'Stående ramme 25',
    fi: 'Pystykehys 25'
  },
  'borders portrait 026': {
    en: 'Portrait Border 26',
    de: 'Hochformat Rahmen 26',
    fr: 'Bordure portrait 26',
    es: 'Marco vertical 26',
    it: 'Bordo verticale 26',
    pt: 'Borda retrato 26',
    nl: 'Staande rand 26',
    sv: 'Stående ram 26',
    da: 'Portrætramme 26',
    no: 'Stående ramme 26',
    fi: 'Pystykehys 26'
  },
  'borders portrait 027': {
    en: 'Portrait Border 27',
    de: 'Hochformat Rahmen 27',
    fr: 'Bordure portrait 27',
    es: 'Marco vertical 27',
    it: 'Bordo verticale 27',
    pt: 'Borda retrato 27',
    nl: 'Staande rand 27',
    sv: 'Stående ram 27',
    da: 'Portrætramme 27',
    no: 'Stående ramme 27',
    fi: 'Pystykehys 27'
  },
  'borders portrait 028': {
    en: 'Portrait Border 28',
    de: 'Hochformat Rahmen 28',
    fr: 'Bordure portrait 28',
    es: 'Marco vertical 28',
    it: 'Bordo verticale 28',
    pt: 'Borda retrato 28',
    nl: 'Staande rand 28',
    sv: 'Stående ram 28',
    da: 'Portrætramme 28',
    no: 'Stående ramme 28',
    fi: 'Pystykehys 28'
  },
  'borders portrait 029': {
    en: 'Portrait Border 29',
    de: 'Hochformat Rahmen 29',
    fr: 'Bordure portrait 29',
    es: 'Marco vertical 29',
    it: 'Bordo verticale 29',
    pt: 'Borda retrato 29',
    nl: 'Staande rand 29',
    sv: 'Stående ram 29',
    da: 'Portrætramme 29',
    no: 'Stående ramme 29',
    fi: 'Pystykehys 29'
  },
  'borders portrait 030': {
    en: 'Portrait Border 30',
    de: 'Hochformat Rahmen 30',
    fr: 'Bordure portrait 30',
    es: 'Marco vertical 30',
    it: 'Bordo verticale 30',
    pt: 'Borda retrato 30',
    nl: 'Staande rand 30',
    sv: 'Stående ram 30',
    da: 'Portrætramme 30',
    no: 'Stående ramme 30',
    fi: 'Pystykehys 30'
  },
  'borders portrait 031': {
    en: 'Portrait Border 31',
    de: 'Hochformat Rahmen 31',
    fr: 'Bordure portrait 31',
    es: 'Marco vertical 31',
    it: 'Bordo verticale 31',
    pt: 'Borda retrato 31',
    nl: 'Staande rand 31',
    sv: 'Stående ram 31',
    da: 'Portrætramme 31',
    no: 'Stående ramme 31',
    fi: 'Pystykehys 31'
  },
  'borders portrait 032': {
    en: 'Portrait Border 32',
    de: 'Hochformat Rahmen 32',
    fr: 'Bordure portrait 32',
    es: 'Marco vertical 32',
    it: 'Bordo verticale 32',
    pt: 'Borda retrato 32',
    nl: 'Staande rand 32',
    sv: 'Stående ram 32',
    da: 'Portrætramme 32',
    no: 'Stående ramme 32',
    fi: 'Pystykehys 32'
  },
  'borders portrait 033': {
    en: 'Portrait Border 33',
    de: 'Hochformat Rahmen 33',
    fr: 'Bordure portrait 33',
    es: 'Marco vertical 33',
    it: 'Bordo verticale 33',
    pt: 'Borda retrato 33',
    nl: 'Staande rand 33',
    sv: 'Stående ram 33',
    da: 'Portrætramme 33',
    no: 'Stående ramme 33',
    fi: 'Pystykehys 33'
  }
};

// ============================================================
// DO NOT MODIFY BELOW THIS LINE
// ============================================================

const SOURCE_DIR = path.join('/opt/lessoncraftstudio/image library', THEME_CONFIG.sourceFolderName);
const DEST_DIR = path.join('/opt/lessoncraftstudio/frontend/public/images/borders', THEME_CONFIG.name);
const STANDALONE_DIR = path.join('/opt/lessoncraftstudio/frontend/.next/standalone/public/images/borders', THEME_CONFIG.name);

const WEBP_QUALITY = 85;

function generateUniqueFilename(baseName) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  const slug = baseName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${slug}-${timestamp}-${random}.webp`;
}

async function processImage(inputPath, outputPath) {
  const image = sharp(inputPath);
  await image.webp({ quality: WEBP_QUALITY }).toFile(outputPath);
  const outputMetadata = await sharp(outputPath).metadata();
  return {
    width: outputMetadata.width,
    height: outputMetadata.height,
    size: fs.statSync(outputPath).size
  };
}

async function main() {
  console.log('============================================================');
  console.log('Border Import Script: ' + THEME_CONFIG.displayNames.en + ' (Folder 1)');
  console.log('============================================================\n');

  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Destination: ${DEST_DIR}`);

  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
    console.log('Created destination directory');
  }

  if (!fs.existsSync(STANDALONE_DIR)) {
    fs.mkdirSync(STANDALONE_DIR, { recursive: true });
  }

  console.log('\n--- Step 1: Creating/Updating Theme ---');
  let theme = await prisma.imageTheme.findFirst({
    where: { name: THEME_CONFIG.name, type: THEME_CONFIG.type }
  });

  if (!theme) {
    const maxSortOrder = await prisma.imageTheme.aggregate({
      where: { type: THEME_CONFIG.type },
      _max: { sortOrder: true }
    });

    theme = await prisma.imageTheme.create({
      data: {
        name: THEME_CONFIG.name,
        displayNames: THEME_CONFIG.displayNames,
        type: THEME_CONFIG.type,
        sortOrder: (maxSortOrder._max.sortOrder || 0) + 1
      }
    });
    console.log(`Created new theme (id: ${theme.id})`);
  } else {
    console.log(`Using existing theme (id: ${theme.id})`);
  }

  console.log('\n--- Step 2: Processing Images ---');
  const files = fs.readdirSync(SOURCE_DIR).filter(f => /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(f));
  console.log(`Found ${files.length} image files\n`);

  let successCount = 0, skipCount = 0, errorCount = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);
    const lookupKey = baseName.toLowerCase().trim();

    console.log(`Processing: ${file}`);

    const translations = IMAGE_TRANSLATIONS[lookupKey];
    if (!translations) {
      console.log(`  WARNING: No translations found for "${lookupKey}", skipping`);
      skipCount++;
      continue;
    }

    try {
      const inputPath = path.join(SOURCE_DIR, file);
      const newFilename = generateUniqueFilename(baseName);
      const outputPath = path.join(DEST_DIR, newFilename);

      const { width, height, size } = await processImage(inputPath, outputPath);
      fs.copyFileSync(outputPath, path.join(STANDALONE_DIR, newFilename));

      console.log(`  Saved: ${newFilename} (${width}x${height}) - Original aspect ratio preserved`);

      const existing = await prisma.imageLibraryItem.findFirst({
        where: { themeId: theme.id, translations: { path: ['en'], equals: translations.en } }
      });

      if (existing) {
        console.log(`  Already in database, skipping`);
        skipCount++;
        continue;
      }

      const maxSort = await prisma.imageLibraryItem.aggregate({
        where: { themeId: theme.id },
        _max: { sortOrder: true }
      });

      await prisma.imageLibraryItem.create({
        data: {
          themeId: theme.id,
          filename: newFilename,
          filePath: `/images/borders/${THEME_CONFIG.name}/${newFilename}`,
          translations: translations,
          fileSize: size,
          mimeType: 'image/webp',
          width: width,
          height: height,
          sortOrder: (maxSort._max.sortOrder || 0) + 1
        }
      });

      console.log(`  Created database record`);
      successCount++;
    } catch (error) {
      console.log(`  ERROR: ${error.message}`);
      errorCount++;
    }
  }

  console.log('\n--- Syncing to standalone build ---');
  const destFiles = fs.readdirSync(DEST_DIR);
  for (const file of destFiles) {
    const src = path.join(DEST_DIR, file);
    const dest = path.join(STANDALONE_DIR, file);
    if (!fs.existsSync(dest)) fs.copyFileSync(src, dest);
  }
  console.log(`Copied ${destFiles.length} files to standalone`);

  console.log('\n============================================================');
  console.log('BORDER IMPORT COMPLETE');
  console.log('============================================================');
  console.log(`Theme: ${THEME_CONFIG.name} (${theme.id})`);
  console.log(`Type: ${THEME_CONFIG.type}`);
  console.log(`Success: ${successCount} | Skipped: ${skipCount} | Errors: ${errorCount}`);

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
