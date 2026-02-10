'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getAppConfigBySlug, getSlugForLocale, type SupportedLocale } from '@/config/product-page-slugs';

interface Sample {
  id: string;
  nameEn: string;
  nameDe: string;
  nameFr: string;
  nameEs: string;
  nameIt: string;
  namePt: string;
  nameNl: string;
  nameDa: string;
  nameSv: string;
  nameNo: string;
  nameFi: string;
  categoryEn: string;
  categoryDe: string;
  categoryFr: string;
  categoryEs: string;
  categoryIt: string;
  categoryPt: string;
  categoryNl: string;
  categoryDa: string;
  categorySv: string;
  categoryNo: string;
  categoryFi: string;
  imageSrc: string;
  pdfUrl: string;
  productPageSlug: string;
}

// Locale to language folder mapping for homepage samples
const localeToLanguage: Record<string, string> = {
  en: 'english',
  de: 'german',
  fr: 'french',
  es: 'spanish',
  it: 'italian',
  pt: 'portuguese',
  nl: 'dutch',
  da: 'danish',
  sv: 'swedish',
  no: 'norwegian',
  fi: 'finnish',
};

// Mapping from productPageSlug (after removing -worksheets) to actual server file slugs
const slugToServerName: Record<string, string> = {
  'picture-bingo': 'bingo',
  'word-search': 'wordsearch',
  'math': 'math-worksheet',
  'pattern': 'pattern-worksheet',
};

// Helper to derive app slug from productPageSlug (e.g., 'addition-worksheets' → 'addition')
const getAppSlug = (productPageSlug: string): string => {
  const baseSlug = productPageSlug.replace(/-worksheets$/, '');
  // Map mismatched slugs to actual server file names
  return slugToServerName[baseSlug] || baseSlug;
};

// Locale-specific image mappings for non-English languages
// Maps sample ID to locale-specific image paths - 33 samples per language
const localeImages: Record<string, Record<string, string>> = {
  de: {
    '1': '/samples/german/addition/Additionsspa 1.jpeg',
    '2': '/samples/german/alphabet train/Alphabet-Zug 1.jpeg',
    '3': '/samples/german/big small/Groß oder Klei 1.jpeg',
    '4': '/samples/german/bingo/bilder-bingo 1 callout.jpeg',
    '5': '/samples/german/chart count/Bilddiagramm 1.jpeg',
    '6': '/samples/german/code addition/Code-Knacker Addition 1.jpeg',
    '7': '/samples/english/coloring/coloring portrait 1.png',
    '8': '/samples/german/crossword/Bilderkreuzworträtse 1.jpeg',
    '9': '/samples/german/cryptogram/Bilder-Kryptogramm 1.jpeg',
    '10': '/samples/german/draw and color/Zeichnen und Ausmale 1.jpeg',
    '11': '/samples/german/drawing lines/Linien Zeichnen Üben 1.jpeg',
    '12': '/samples/german/find and count/Ich sehe was 1.jpeg',
    '13': '/samples/german/find objects/Finde das Unpassende 1.jpeg',
    '14': '/samples/german/grid match/Raster-Puzzle 1.jpeg',
    '15': '/samples/german/matching/Paare Finden 1.jpeg',
    '16': '/samples/german/math puzzle/Mathe-Rätsel 1.jpeg',
    '17': '/samples/german/math worksheet/Mathe-Übungsblatt 1.jpeg',
    '18': '/samples/german/missing pieces/Fehlende Teile 1.jpeg',
    '19': '/samples/german/more less/Mehr Weniger 1.jpeg',
    '20': '/samples/german/odd one out/Finde das Andere 1.jpeg',
    '21': '/samples/german/pattern train/Musterzug 1.jpeg',
    '22': '/samples/german/pattern worksheet/Musterrätsel 1.jpeg',
    '23': '/samples/german/picture path/Bilderpfad 1.jpeg',
    '24': '/samples/german/picture sort/Bilder Sortieren 1.jpeg',
    '25': '/samples/german/prepositions/Präpositionen 1.jpeg',
    '26': '/samples/german/shadow match/Schatten Zuordnen 1.jpeg',
    '27': '/samples/german/subtraction/Subtraktion Spaß 1.jpeg',
    '28': '/samples/german/sudoku/Bilder-Sudoku 1.jpeg',
    '29': '/samples/german/treasure hunt/Schatzsuche 1.jpeg',
    '30': '/samples/german/word guess/Wörter-Rätsel 1.jpeg',
    '31': '/samples/german/word scramble/Buchstabensala 1.jpeg',
    '32': '/samples/german/wordsearch/Wörter suchen 1.jpeg',
    '33': '/samples/german/matching/Paare Finden 2.jpeg',
  },
  fr: {
    '1': '/samples/french/addition/Addition Amusant 1.jpeg',
    '2': '/samples/french/alphabet train/Train de l\'Alphabet 1.jpeg',
    '3': '/samples/french/big small/Grand ou Petit 1.jpeg',
    '4': '/samples/french/bingo/Loto d\'Images 1 callout.jpeg',
    '5': '/samples/french/chart count/worksheet (1).jpeg',
    '6': '/samples/french/code addition/Code Secret Addition 1.jpeg',
    '7': '/samples/english/coloring/coloring portrait 1.png',
    '8': '/samples/french/crossword/Mots Croisés en Images 1.jpeg',
    '9': '/samples/french/cryptogram/Cryptogramme en Images 1.jpeg',
    '10': '/samples/french/draw and color/Dessine et Colorie 1.jpeg',
    '11': '/samples/french/drawing lines/Pratique de Tracer des Lignes 1.jpeg',
    '12': '/samples/french/find and count/Je vois, je voi 1.jpeg',
    '13': '/samples/french/find objects/Trouve l\'Intrus 1.jpeg',
    '14': '/samples/french/grid match/Puzzle Grille 1.jpeg',
    '15': '/samples/french/matching/Trouve les Paires 1.jpeg',
    '16': '/samples/french/math puzzle/Casse-Têtes Mathématiques 1.jpeg',
    '17': '/samples/french/math worksheet/Feuille de Mathématique 1.jpeg',
    '18': '/samples/french/missing pieces/Pièces Manquantes 1.jpeg',
    '19': '/samples/french/more less/Plus Moins 1.jpeg',
    '20': '/samples/french/odd one out/Trouve l\'Intrus 1.jpeg',
    '21': '/samples/french/pattern train/Train à Motifs 1.jpeg',
    '22': '/samples/french/pattern worksheet/Puzzles de Motifs 1.jpeg',
    '23': '/samples/french/picture path/Chemin d\'Images 1.jpeg',
    '24': '/samples/french/picture sort/Tri d\'Images 1.jpeg',
    '25': '/samples/french/prepositions/Prépositions 1.jpeg',
    '26': '/samples/french/shadow match/Trouve l\'Ombre 1.jpeg',
    '27': '/samples/french/subtraction/Soustractions Amusantes 1.jpeg',
    '28': '/samples/french/sudoku/Sudoku en Images 1.jpeg',
    '29': '/samples/french/treasure hunt/Chasse au Trésor 1.jpeg',
    '30': '/samples/french/word guess/Devine le Mot 1.jpeg',
    '31': '/samples/french/word scramble/Mots Mêlés 1.jpeg',
    '32': '/samples/french/wordsearch/Mots Cachés 1.jpeg',
    '33': '/samples/french/matching/Trouve les Paires 2.jpeg',
  },
  es: {
    '1': '/samples/spanish/addition/Suma Divertida 1.jpeg',
    '2': '/samples/spanish/alphabet train/Tren del Alfabeto 1.jpeg',
    '3': '/samples/spanish/big small/Grande o Pequeño 1.jpeg',
    '4': '/samples/spanish/bingo/Bingo de Imágenes 1 callout.jpeg',
    '5': '/samples/spanish/chart count/Gráfico de Dibujos 1.jpeg',
    '6': '/samples/spanish/code addition/Código Secreto Suma 1.jpeg',
    '7': '/samples/english/coloring/coloring portrait 1.png',
    '8': '/samples/spanish/crossword/Crucigrama con Dibujos 1.jpeg',
    '9': '/samples/spanish/cryptogram/Criptograma de Dibujos 1.jpeg',
    '10': '/samples/spanish/draw and color/Dibuja y Colorea 10.jpeg',
    '11': '/samples/spanish/drawing lines/Practica de Dibujar Línea 1.jpeg',
    '12': '/samples/spanish/find and count/Veo Veo 1.jpeg',
    '13': '/samples/spanish/find objects/Encuentra el Diferente 1.jpeg',
    '14': '/samples/spanish/grid match/Puzzle de Cuadrícula 1.jpeg',
    '15': '/samples/spanish/matching/Encuentra Parejas 1.jpeg',
    '16': '/samples/spanish/math puzzle/Rompecabezas Matemáticos 1.jpeg',
    '17': '/samples/spanish/math worksheet/Hoja de Matemáticas 1.jpeg',
    '18': '/samples/spanish/missing pieces/Piezas Perdidas 1.jpeg',
    '19': '/samples/spanish/more less/Más Menos 1.jpeg',
    '20': '/samples/spanish/odd one out/Encuentra el Diferente 1.jpeg',
    '21': '/samples/spanish/pattern train/Tren de Patrones 1.jpeg',
    '22': '/samples/spanish/pattern worksheet/Rompecabezas de Patrones 1.jpeg',
    '23': '/samples/spanish/picture path/Camino de Imágenes 1.jpeg',
    '24': '/samples/spanish/picture sort/Clasificación de Imágenes 1.jpeg',
    '25': '/samples/spanish/prepositions/Preposiciones 1.jpeg',
    '26': '/samples/spanish/shadow match/Empareja las Sombras 1.jpeg',
    '27': '/samples/spanish/subtraction/Restas Divertidas 1.jpeg',
    '28': '/samples/spanish/sudoku/Sudoku de Imágenes 1.jpeg',
    '29': '/samples/spanish/treasure hunt/Búsqueda del Tesoro 1.jpeg',
    '30': '/samples/spanish/word guess/Adivina la Palabra 1.jpeg',
    '31': '/samples/spanish/word scramble/Palabras Revueltas 1.jpeg',
    '32': '/samples/spanish/wordsearch/Sopa de Letras 1.jpeg',
    '33': '/samples/spanish/matching/Encuentra Parejas 2.jpeg',
  },
  it: {
    '1': '/samples/italian/addition/Addizione Divertente 1.jpeg',
    '2': '/samples/italian/alphabet train/Treno dell\'Alfabeto 1.jpeg',
    '3': '/samples/italian/big small/Grande o Piccolo 1.jpeg',
    '4': '/samples/italian/bingo/tombola 1 callout.jpeg',
    '5': '/samples/italian/chart count/Grafico con Immagini 1.jpeg',
    '6': '/samples/italian/code addition/Codice Segreto Addizione 1.jpeg',
    '7': '/samples/english/coloring/coloring portrait 1.png',
    '8': '/samples/italian/crossword/Cruciverba con Immagini 1.jpeg',
    '9': '/samples/italian/cryptogram/Crittogramma Illustrato 1.jpeg',
    '10': '/samples/italian/draw and color/Disegna e Colora 1.jpeg',
    '11': '/samples/italian/drawing lines/Pratica del Disegno di Linee 2.jpeg',
    '12': '/samples/italian/find and count/Vedo Vedo 1.jpeg',
    '13': '/samples/italian/find objects/Trova gli Oggetti Nascosti 1.jpeg',
    '14': '/samples/italian/grid match/Puzzle a Griglia 1.jpeg',
    '15': '/samples/italian/matching/Trova le Coppie 1.jpeg',
    '16': '/samples/italian/math puzzle/Rompicapi Matematici 1.jpeg',
    '17': '/samples/italian/math worksheet/Scheda di Matematica 1.jpeg',
    '18': '/samples/italian/missing pieces/Pezzi Mancanti 1.jpeg',
    '19': '/samples/italian/more less/Più Meno 1.jpeg',
    '20': '/samples/italian/odd one out/Trova il Diverso 1.jpeg',
    '21': '/samples/italian/pattern train/Treno dei Modelli 1.jpeg',
    '22': '/samples/italian/pattern worksheet/Puzzle di Schemi 1.jpeg',
    '23': '/samples/italian/picture path/Percorso di Immagini 1.jpeg',
    '24': '/samples/italian/picture sort/Classificazione Immagini 1.jpeg',
    '25': '/samples/italian/prepositions/Preposizioni 1.jpeg',
    '26': '/samples/italian/shadow match/Abbina le Ombre 1.jpeg',
    '27': '/samples/italian/subtraction/Sottrazioni Divertenti 1.jpeg',
    '28': '/samples/italian/sudoku/Sudoku con Immagini 1.jpeg',
    '29': '/samples/italian/treasure hunt/Caccia al Tesoro 1.jpeg',
    '30': '/samples/italian/word guess/Indovina la Parola 1.jpeg',
    '31': '/samples/italian/word scramble/Lettere Mescolate 1.jpeg',
    '32': '/samples/italian/wordsearch/Cerca Parole 1.jpeg',
    '33': '/samples/italian/matching/Trova le Coppie 2.jpeg',
  },
  pt: {
    '1': '/samples/portuguese/addition/Adição Divertida 1.jpeg',
    '2': '/samples/portuguese/alphabet train/Comboio do Alfabeto 1.jpeg',
    '3': '/samples/portuguese/big small/Grande ou Pequeno 1.jpeg',
    '4': '/samples/portuguese/bingo/Bingo de Imagenes 1 callout.jpeg',
    '5': '/samples/portuguese/chart count/Gráfico de Figuras 1.jpeg',
    '6': '/samples/portuguese/code addition/Código Secreto Adição 1.jpeg',
    '7': '/samples/english/coloring/coloring portrait 1.png',
    '8': '/samples/portuguese/crossword/Palavras Cruzadas 1.jpeg',
    '9': '/samples/portuguese/cryptogram/Criptograma Ilustrado 1.jpeg',
    '10': '/samples/portuguese/draw and color/Desenha e Pinta 1.jpeg',
    '11': '/samples/portuguese/drawing lines/Prática de Desenhar Linhas 1.jpeg',
    '12': '/samples/portuguese/find and count/Vejo, Vejo 1.jpeg',
    '13': '/samples/portuguese/find objects/Encontra o Diferente (1).jpeg',
    '14': '/samples/portuguese/grid match/Quebra-Cabeça de Grade 1.jpeg',
    '15': '/samples/portuguese/matching/Encontre os Pares 1.jpeg',
    '16': '/samples/portuguese/math puzzle/Quebra-Cabeças Matemático 1.jpeg',
    '17': '/samples/portuguese/math worksheet/Folha de Matemática 1.jpeg',
    '18': '/samples/portuguese/missing pieces/Peças em Falta 1.jpeg',
    '19': '/samples/portuguese/more less/Mais Menos 1.jpeg',
    '20': '/samples/portuguese/odd one out/Encontra o Diferente 1.jpeg',
    '21': '/samples/portuguese/pattern train/Comboio de Padrões 1.jpeg',
    '22': '/samples/portuguese/pattern worksheet/Quebra-cabeças de Padrões 1.jpeg',
    '23': '/samples/portuguese/picture path/Caminho de Imagen 1.jpeg',
    '24': '/samples/portuguese/picture sort/Classificação de Imagens 1.jpeg',
    '25': '/samples/portuguese/prepositions/Preposições 1.jpeg',
    '26': '/samples/portuguese/shadow match/Combine as Sombras 1.jpeg',
    '27': '/samples/portuguese/subtraction/Subtrações Divertidas 1.jpeg',
    '28': '/samples/portuguese/sudoku/Sudoku de Imagens 1.jpeg',
    '29': '/samples/portuguese/treasure hunt/Caça ao Tesouro 1.jpeg',
    '30': '/samples/portuguese/word guess/Adivinha a Palavra 1.jpeg',
    '31': '/samples/portuguese/word scramble/Letras Embaralhadas 1.jpeg',
    '32': '/samples/portuguese/wordsearch/Caça-Palavras 1.jpeg',
    '33': '/samples/portuguese/matching/Encontre os Pares 2.jpeg',
  },
  nl: {
    '1': '/samples/dutch/addition/Optellen is Leuk 1.jpeg',
    '2': '/samples/dutch/alphabet train/Alfabettrein 1.jpeg',
    '3': '/samples/dutch/big small/Groot of Klein 1.jpeg',
    '4': '/samples/dutch/bingo/Plaatjesbingo 1 callout.jpeg',
    '5': '/samples/dutch/chart count/Plaatjesgrafiek 1.jpeg',
    '6': '/samples/dutch/code addition/Geheime Code Optellen 1.jpeg',
    '7': '/samples/english/coloring/coloring portrait 1.png',
    '8': '/samples/dutch/crossword/Plaatjes Kruiswoord 1.jpeg',
    '9': '/samples/dutch/cryptogram/Plaatjes Cryptogram 1.jpeg',
    '10': '/samples/dutch/draw and color/Teken en Kleur 1.jpeg',
    '11': '/samples/dutch/drawing lines/Lijnen Tekenen Oefenen 1.jpeg',
    '12': '/samples/dutch/find and count/Ik zie, ik zie 1.jpeg',
    '13': '/samples/dutch/find objects/Vind de Verborgen Voorwerpen 1.jpeg',
    '14': '/samples/dutch/grid match/Rasterpuzzel 1.jpeg',
    '15': '/samples/dutch/matching/Zoek de Paren 1.jpeg',
    '16': '/samples/dutch/math puzzle/Wiskundepuzzels 1.jpeg',
    '17': '/samples/dutch/math worksheet/Wiskundeblad 1.jpeg',
    '18': '/samples/dutch/missing pieces/Ontbrekende Stukjes 1.jpeg',
    '19': '/samples/dutch/more less/Meer Minder 1.jpeg',
    '20': '/samples/dutch/odd one out/Vind de Vreemde Eend 1.jpeg',
    '21': '/samples/dutch/pattern train/Patroontje 1.jpeg',
    '22': '/samples/dutch/pattern worksheet/Patroonpuzzels 1.jpeg',
    '23': '/samples/dutch/picture path/Afbeeldingspad 1.jpeg',
    '24': '/samples/dutch/picture sort/Afbeeldingen Sorteren 1.jpeg',
    '25': '/samples/dutch/prepositions/Voorzetsels 1.jpeg',
    '26': '/samples/dutch/shadow match/Schaduw Koppelen 1.jpeg',
    '27': '/samples/dutch/subtraction/Aftrekken is Leuk 1.jpeg',
    '28': '/samples/dutch/sudoku/Plaatjes Sudoku 1.jpeg',
    '29': '/samples/dutch/treasure hunt/Schattenjacht 1.jpeg',
    '30': '/samples/dutch/word guess/Raad het Woord 1.jpeg',
    '31': '/samples/dutch/word scramble/Letterzaak 1.jpeg',
    '32': '/samples/dutch/wordsearch/Woordzoeker 1.jpeg',
    '33': '/samples/dutch/matching/Zoek de Paren 2.jpeg',
  },
  sv: {
    '1': '/samples/swedish/addition/addition_övning.jpeg',
    '2': '/samples/swedish/alphabet train/alfabetståg landscape.jpeg',
    '3': '/samples/swedish/big small/2 identiska bilder.jpeg',
    '4': '/samples/swedish/bingo/bildbingo 1 callout.jpeg',
    '5': '/samples/swedish/chart count/bilddiagram 1.jpeg',
    '6': '/samples/english/code addition/code addition landscape.jpeg',
    '7': '/samples/english/coloring/coloring portrait 1.png',
    '8': '/samples/swedish/crossword/Bildkorsord 1.jpeg',
    '9': '/samples/swedish/cryptogram/Bildkryptogram 1.jpeg',
    '10': '/samples/swedish/draw and color/Rita och Färglägg 1.jpeg',
    '11': '/samples/swedish/drawing lines/diagonal 1.jpeg',
    '12': '/samples/swedish/find and count/hitta och räkna landscape.jpeg',
    '13': '/samples/swedish/find objects/Hitta den Udda (1).jpeg',
    '14': '/samples/swedish/grid match/Rutnätspussel 1.jpeg',
    '15': '/samples/swedish/matching/Matchningsspel beginning letter.jpeg',
    '16': '/samples/swedish/math puzzle/Mattepussel 1.jpeg',
    '17': '/samples/swedish/math worksheet/mattetal landscape.jpeg',
    '18': '/samples/swedish/missing pieces/Saknade Bitar 1.jpeg',
    '19': '/samples/swedish/more less/mer mindre 1.jpeg',
    '20': '/samples/swedish/odd one out/Hitta Udda Fågeln 1.jpeg',
    '21': '/samples/swedish/pattern train/Mönstert​åget 1.jpeg',
    '22': '/samples/swedish/pattern worksheet/Mönsterpussel 1.jpeg',
    '23': '/samples/swedish/picture path/bildväg 1.jpeg',
    '24': '/samples/swedish/picture sort/sortera bilder 1.jpeg',
    '25': '/samples/swedish/prepositions/Prepositioner 1.jpeg',
    '26': '/samples/swedish/shadow match/skuggmatchning 1.jpeg',
    '27': '/samples/swedish/subtraction/Rolig Subtraktio 1.jpeg',
    '28': '/samples/swedish/sudoku/sudoku_lätt.jpeg',
    '29': '/samples/swedish/treasure hunt/Skattjakt 1.jpeg',
    '30': '/samples/swedish/word guess/Gissa Ordet 1.jpeg',
    '31': '/samples/swedish/word scramble/Ordmix custom.jpeg',
    '32': '/samples/swedish/wordsearch/ordletning custom.jpeg',
    '33': '/samples/swedish/matching/Matchningsspel 2.jpeg',
  },
  da: {
    '1': '/samples/danish/addition/Sjov Addition 1.jpeg',
    '2': '/samples/danish/alphabet train/Alfabettog 1.jpeg',
    '3': '/samples/danish/big small/Stort eller Lille 1.jpeg',
    '4': '/samples/danish/bingo/Billedbingo 1 callout.jpeg',
    '5': '/samples/danish/chart count/Billediagram 1.jpeg',
    '6': '/samples/danish/code addition/Hemmelig Kode Addition 1.jpeg',
    '7': '/samples/english/coloring/coloring portrait 1.png',
    '8': '/samples/danish/crossword/Billedkrydsord 1.jpeg',
    '9': '/samples/danish/cryptogram/Billed-Kryptogram 1.jpeg',
    '10': '/samples/danish/draw and color/Tegn og Farvlæg 1.jpeg',
    '11': '/samples/danish/drawing lines/Linjetegningsøvelse 1.jpeg',
    '12': '/samples/danish/find and count/Jeg ser, jeg ser 1.jpeg',
    '13': '/samples/danish/find objects/Find den Ulige (1).jpeg',
    '14': '/samples/danish/grid match/Gitterpuslespil 1.jpeg',
    '15': '/samples/danish/matching/Find Parrene 1.jpeg',
    '16': '/samples/danish/math puzzle/Mattepuslespil 1.jpeg',
    '17': '/samples/danish/math worksheet/Matematikopgave 1.jpeg',
    '18': '/samples/danish/missing pieces/Manglende Dele 1.jpeg',
    '19': '/samples/danish/more less/Mere Mindre 1.jpeg',
    '20': '/samples/danish/odd one out/Find den Ulige 1.jpeg',
    '21': '/samples/danish/pattern train/Mønstertoget 1.jpeg',
    '22': '/samples/danish/pattern worksheet/Mønstergåder 1.jpeg',
    '23': '/samples/danish/picture path/Billedsti 1.jpeg',
    '24': '/samples/danish/picture sort/Sorter Billeder 1.jpeg',
    '25': '/samples/danish/prepositions/Præpositioner 1.jpeg',
    '26': '/samples/danish/shadow match/Gør Billederne Hele 1.jpeg',
    '27': '/samples/danish/subtraction/Sjov Subtraktion 1.jpeg',
    '28': '/samples/danish/sudoku/Billede-Sudoku 1.jpeg',
    '29': '/samples/danish/treasure hunt/Skattejagt 1.jpeg',
    '30': '/samples/danish/word guess/Gæt Ordet 1.jpeg',
    '31': '/samples/danish/word scramble/Bogstavrod 1.jpeg',
    '32': '/samples/danish/wordsearch/Ordsøgning 1.jpeg',
    '33': '/samples/danish/matching/Find Parrene 2.jpeg',
  },
  no: {
    '1': '/samples/norwegian/addition/Gøy Addisjon 1.jpeg',
    '2': '/samples/norwegian/alphabet train/Alfabettog 1.jpeg',
    '3': '/samples/norwegian/big small/Stort eller Lite 1.jpeg',
    '4': '/samples/norwegian/bingo/bildebingo 1 callout.jpeg',
    '5': '/samples/norwegian/chart count/Bildediagram 1.jpeg',
    '6': '/samples/norwegian/code addition/Hemmelig Kode Addisjon 1.jpeg',
    '7': '/samples/english/coloring/coloring portrait 1.png',
    '8': '/samples/norwegian/crossword/Bildekryssord 1.jpeg',
    '9': '/samples/norwegian/cryptogram/Bildekryptogram 1.jpeg',
    '10': '/samples/norwegian/draw and color/Tegn og Fargelegg 1.jpeg',
    '11': '/samples/norwegian/drawing lines/Linjetegningøvelse 1.jpeg',
    '12': '/samples/norwegian/find and count/Jeg ser, jeg ser 1.jpeg',
    '13': '/samples/norwegian/find objects/Finn den Merkelige (1).jpeg',
    '14': '/samples/norwegian/grid match/Rutenettspuslespill 1.jpeg',
    '15': '/samples/norwegian/matching/Finn Parene 1.jpeg',
    '16': '/samples/norwegian/math puzzle/Mattepuslespill 1.jpeg',
    '17': '/samples/norwegian/math worksheet/Matematikkoppgave 1.jpeg',
    '18': '/samples/norwegian/missing pieces/Manglende Deler 1.jpeg',
    '19': '/samples/norwegian/more less/Mer Mindre 1.jpeg',
    '20': '/samples/norwegian/odd one out/Finn den Rare 1.jpeg',
    '21': '/samples/norwegian/pattern train/Mønstertoget 1.jpeg',
    '22': '/samples/norwegian/pattern worksheet/Mønstergåter 1.jpeg',
    '23': '/samples/norwegian/picture path/Bildesti 1.jpeg',
    '24': '/samples/norwegian/picture sort/Sorter Bilder 1.jpeg',
    '25': '/samples/norwegian/prepositions/Preposisjoner 1.jpeg',
    '26': '/samples/norwegian/shadow match/Fullfør Bildene 1.jpeg',
    '27': '/samples/norwegian/subtraction/Moro med Subtraksjon 1.jpeg',
    '28': '/samples/norwegian/sudoku/Bilde-Sudoku 1.jpeg',
    '29': '/samples/norwegian/treasure hunt/Skattejakt 1.jpeg',
    '30': '/samples/norwegian/word guess/Gjett Ordet 1.jpeg',
    '31': '/samples/norwegian/word scramble/Bokstavblanding 1.jpeg',
    '32': '/samples/norwegian/wordsearch/Ordleting 1.jpeg',
    '33': '/samples/norwegian/matching/Finn Parene 2.jpeg',
  },
  fi: {
    '1': '/samples/finnish/addition/Hauska Yhteenlasku 1.jpeg',
    '2': '/samples/finnish/alphabet train/Aakkostjuna 1.jpeg',
    '3': '/samples/finnish/big small/Iso vai Pieni 1.jpeg',
    '4': '/samples/finnish/bingo/kuvabingo 1 callout.jpeg',
    '5': '/samples/finnish/chart count/Kuvakaavio 1.jpeg',
    '6': '/samples/finnish/code addition/Salainen Koodi Yhteenlasku 1.jpeg',
    '7': '/samples/english/coloring/coloring portrait 1.png',
    '8': '/samples/finnish/crossword/Kuvaristikko 1.jpeg',
    '9': '/samples/finnish/cryptogram/Kuvakryptogrammi 1.jpeg',
    '10': '/samples/finnish/draw and color/Piirrä ja Väritä 1.jpeg',
    '11': '/samples/finnish/drawing lines/Viivojen Piirtämisharjoitus 1.jpeg',
    '12': '/samples/finnish/find and count/Minä näen 1.jpeg',
    '13': '/samples/finnish/find objects/Löydä Outo (1).jpeg',
    '14': '/samples/finnish/grid match/Ruudukkopalapeli 1.jpeg',
    '15': '/samples/finnish/matching/Yhdistä Parit 1.jpeg',
    '16': '/samples/finnish/math puzzle/Matematiikkapulmat 1.jpeg',
    '17': '/samples/finnish/math worksheet/Matematiikkalehti 1.jpeg',
    '18': '/samples/finnish/missing pieces/Puuttuvat Palat 1.jpeg',
    '19': '/samples/finnish/more less/Enemmän Vähemmän 1.jpeg',
    '20': '/samples/finnish/odd one out/Löydä Outo Lintu 1.jpeg',
    '21': '/samples/finnish/pattern train/Kuviojuna 1.jpeg',
    '22': '/samples/finnish/pattern worksheet/Kuviotehtävät 1.jpeg',
    '23': '/samples/finnish/picture path/Kuvapolku 2.jpeg',
    '24': '/samples/finnish/picture sort/Lajittele Kuvat 1.jpeg',
    '25': '/samples/finnish/prepositions/Prepositiot 1.jpeg',
    '26': '/samples/finnish/shadow match/Täydennä Kuvat 1.jpeg',
    '27': '/samples/finnish/subtraction/Hauskaa Vähennyslaskua 1.jpeg',
    '28': '/samples/finnish/sudoku/Kuva-Sudoku 1.jpeg',
    '29': '/samples/finnish/treasure hunt/Aarteenetsintä 1.jpeg',
    '30': '/samples/finnish/word guess/Arvaa Sana 1.jpeg',
    '31': '/samples/finnish/word scramble/Kirjainsekoitus 1.jpeg',
    '32': '/samples/finnish/wordsearch/Sanahaku 1.jpeg',
    '33': '/samples/finnish/matching/Yhdistä Parit 2.jpeg',
  },
};

// Locale-specific PDF mappings for non-English languages
// Maps sample ID to locale-specific PDF paths - 33 samples per language
const localePdfs: Record<string, Record<string, string>> = {
  de: {
    '1': '/samples/german/addition/Additionsspa 1.pdf',
    '2': '/samples/german/alphabet train/Alphabet-Zug 1.pdf',
    '3': '/samples/german/big small/Groß oder Klei 1.pdf',
    '4': '/samples/german/bingo/bilder-bingo 1 callout.pdf',
    '5': '/samples/german/chart count/Bilddiagramm 1.pdf',
    '6': '/samples/german/code addition/Code-Knacker Addition 1.pdf',
    '7': '/samples/english/coloring/coloring portrait 1.pdf',
    '8': '/samples/german/crossword/Bilderkreuzworträtse 1.pdf',
    '9': '/samples/german/cryptogram/Bilder-Kryptogramm 1.pdf',
    '10': '/samples/german/draw and color/Zeichnen und Ausmale 1.pdf',
    '11': '/samples/german/drawing lines/Linien Zeichnen Üben 1.pdf',
    '12': '/samples/german/find and count/Ich sehe was 1.pdf',
    '13': '/samples/german/find objects/Finde das Unpassende 1.pdf',
    '14': '/samples/german/grid match/Raster-Puzzle 1.pdf',
    '15': '/samples/german/matching/Paare Finden 1.pdf',
    '16': '/samples/german/math puzzle/Mathe-Rätsel 1.pdf',
    '17': '/samples/german/math worksheet/Mathe-Übungsblatt 1.pdf',
    '18': '/samples/german/missing pieces/Fehlende Teile 1.pdf',
    '19': '/samples/german/more less/Mehr Weniger 1.pdf',
    '20': '/samples/german/odd one out/Finde das Andere 1.pdf',
    '21': '/samples/german/pattern train/Musterzug 1.pdf',
    '22': '/samples/german/pattern worksheet/Musterrätsel 1.pdf',
    '23': '/samples/german/picture path/Bilderpfad 1.pdf',
    '24': '/samples/german/picture sort/Bilder Sortieren 1.pdf',
    '25': '/samples/german/prepositions/Präpositionen 1.pdf',
    '26': '/samples/german/shadow match/Schatten Zuordnen 1.pdf',
    '27': '/samples/german/subtraction/Subtraktion Spaß 1.pdf',
    '28': '/samples/german/sudoku/Bilder-Sudoku 1.pdf',
    '29': '/samples/german/treasure hunt/Schatzsuche 1.pdf',
    '30': '/samples/german/word guess/Wörter-Rätsel 1.pdf',
    '31': '/samples/german/word scramble/Buchstabensala 1.pdf',
    '32': '/samples/german/wordsearch/Wörter suchen 1.pdf',
    '33': '/samples/german/matching/Paare Finden 2.pdf',
  },
  fr: {
    '1': '/samples/french/addition/Addition Amusant 1.pdf',
    '2': '/samples/french/alphabet train/Train de l\'Alphabet 1.pdf',
    '3': '/samples/french/big small/Grand ou Petit 1.pdf',
    '4': '/samples/french/bingo/Loto d\'Images 1 callout.pdf',
    '5': '/samples/french/chart count/worksheet (1).pdf',
    '6': '/samples/french/code addition/Code Secret Addition 1.pdf',
    '7': '/samples/english/coloring/coloring portrait 1.pdf',
    '8': '/samples/french/crossword/Mots Croisés en Images 1.pdf',
    '9': '/samples/french/cryptogram/Cryptogramme en Images 1.pdf',
    '10': '/samples/french/draw and color/Dessine et Colorie 1.pdf',
    '11': '/samples/french/drawing lines/Pratique de Tracer des Lignes 1.pdf',
    '12': '/samples/french/find and count/Je vois, je voi 1.pdf',
    '13': '/samples/french/find objects/Trouve l\'Intrus 1.pdf',
    '14': '/samples/french/grid match/Puzzle Grille 1.pdf',
    '15': '/samples/french/matching/Trouve les Paires 1.pdf',
    '16': '/samples/french/math puzzle/Casse-Têtes Mathématiques 1.pdf',
    '17': '/samples/french/math worksheet/Feuille de Mathématique 1.pdf',
    '18': '/samples/french/missing pieces/Pièces Manquantes 1.pdf',
    '19': '/samples/french/more less/Plus Moins 1.pdf',
    '20': '/samples/french/odd one out/Trouve l\'Intrus 1.pdf',
    '21': '/samples/french/pattern train/Train à Motifs 1.pdf',
    '22': '/samples/french/pattern worksheet/Puzzles de Motifs 1.pdf',
    '23': '/samples/french/picture path/Chemin d\'Images 1.pdf',
    '24': '/samples/french/picture sort/Tri d\'Images 1.pdf',
    '25': '/samples/french/prepositions/Prépositions 1.pdf',
    '26': '/samples/french/shadow match/Trouve l\'Ombre 1.pdf',
    '27': '/samples/french/subtraction/Soustractions Amusantes 1.pdf',
    '28': '/samples/french/sudoku/Sudoku en Images 1.pdf',
    '29': '/samples/french/treasure hunt/Chasse au Trésor 1.pdf',
    '30': '/samples/french/word guess/Devine le Mot 1.pdf',
    '31': '/samples/french/word scramble/Mots Mêlés 1.pdf',
    '32': '/samples/french/wordsearch/Mots Cachés 1.pdf',
    '33': '/samples/french/matching/Trouve les Paires 2.pdf',
  },
  es: {
    '1': '/samples/spanish/addition/Suma Divertida 1.pdf',
    '2': '/samples/spanish/alphabet train/Tren del Alfabeto 1.pdf',
    '3': '/samples/spanish/big small/Grande o Pequeño 1.pdf',
    '4': '/samples/spanish/bingo/Bingo de Imágenes 1 callout.pdf',
    '5': '/samples/spanish/chart count/Gráfico de Dibujos 1.pdf',
    '6': '/samples/spanish/code addition/Código Secreto Suma 1.pdf',
    '7': '/samples/english/coloring/coloring portrait 1.pdf',
    '8': '/samples/spanish/crossword/Crucigrama con Dibujos 1.pdf',
    '9': '/samples/spanish/cryptogram/Criptograma de Dibujos 1.pdf',
    '10': '/samples/spanish/draw and color/Dibuja y Colorea 10.pdf',
    '11': '/samples/spanish/drawing lines/Practica de Dibujar Línea 1.pdf',
    '12': '/samples/spanish/find and count/Veo Veo 1.pdf',
    '13': '/samples/spanish/find objects/Encuentra el Diferente 1.pdf',
    '14': '/samples/spanish/grid match/Puzzle de Cuadrícula 1.pdf',
    '15': '/samples/spanish/matching/Encuentra Parejas 1.pdf',
    '16': '/samples/spanish/math puzzle/Rompecabezas Matemáticos 1.pdf',
    '17': '/samples/spanish/math worksheet/Hoja de Matemáticas 1.pdf',
    '18': '/samples/spanish/missing pieces/Piezas Perdidas 1.pdf',
    '19': '/samples/spanish/more less/Más Menos 1.pdf',
    '20': '/samples/spanish/odd one out/Encuentra el Diferente 1.pdf',
    '21': '/samples/spanish/pattern train/Tren de Patrones 1.pdf',
    '22': '/samples/spanish/pattern worksheet/Rompecabezas de Patrones 1.pdf',
    '23': '/samples/spanish/picture path/Camino de Imágenes 1.pdf',
    '24': '/samples/spanish/picture sort/Clasificación de Imágenes 1.pdf',
    '25': '/samples/spanish/prepositions/Preposiciones 1.pdf',
    '26': '/samples/spanish/shadow match/Empareja las Sombras 1.pdf',
    '27': '/samples/spanish/subtraction/Restas Divertidas 1.pdf',
    '28': '/samples/spanish/sudoku/Sudoku de Imágenes 1.pdf',
    '29': '/samples/spanish/treasure hunt/Búsqueda del Tesoro 1.pdf',
    '30': '/samples/spanish/word guess/Adivina la Palabra 1.pdf',
    '31': '/samples/spanish/word scramble/Palabras Revueltas 1.pdf',
    '32': '/samples/spanish/wordsearch/Sopa de Letras 1.pdf',
    '33': '/samples/spanish/matching/Encuentra Parejas 2.pdf',
  },
  it: {
    '1': '/samples/italian/addition/Addizione Divertente 1.pdf',
    '2': '/samples/italian/alphabet train/Treno dell\'Alfabeto 1.pdf',
    '3': '/samples/italian/big small/Grande o Piccolo 1.pdf',
    '4': '/samples/italian/bingo/tombola 1 callout.pdf',
    '5': '/samples/italian/chart count/Grafico con Immagini 1.pdf',
    '6': '/samples/italian/code addition/Codice Segreto Addizione 1.pdf',
    '7': '/samples/english/coloring/coloring portrait 1.pdf',
    '8': '/samples/italian/crossword/Cruciverba con Immagini 1.pdf',
    '9': '/samples/italian/cryptogram/Crittogramma Illustrato 1.pdf',
    '10': '/samples/italian/draw and color/Disegna e Colora 1.pdf',
    '11': '/samples/italian/drawing lines/Pratica del Disegno di Linee 2.pdf',
    '12': '/samples/italian/find and count/Vedo Vedo 1.pdf',
    '13': '/samples/italian/find objects/Trova gli Oggetti Nascosti 1.pdf',
    '14': '/samples/italian/grid match/Puzzle a Griglia 1.pdf',
    '15': '/samples/italian/matching/Trova le Coppie 1.pdf',
    '16': '/samples/italian/math puzzle/Rompicapi Matematici 1.pdf',
    '17': '/samples/italian/math worksheet/Scheda di Matematica 1.pdf',
    '18': '/samples/italian/missing pieces/Pezzi Mancanti 1.pdf',
    '19': '/samples/italian/more less/Più Meno 1.pdf',
    '20': '/samples/italian/odd one out/Trova il Diverso 1.pdf',
    '21': '/samples/italian/pattern train/Treno dei Modelli 1.pdf',
    '22': '/samples/italian/pattern worksheet/Puzzle di Schemi 1.pdf',
    '23': '/samples/italian/picture path/Percorso di Immagini 1.pdf',
    '24': '/samples/italian/picture sort/Classificazione Immagini 1.pdf',
    '25': '/samples/italian/prepositions/Preposizioni 1.pdf',
    '26': '/samples/italian/shadow match/Abbina le Ombre 1.pdf',
    '27': '/samples/italian/subtraction/Sottrazioni Divertenti 1.pdf',
    '28': '/samples/italian/sudoku/Sudoku con Immagini 1.pdf',
    '29': '/samples/italian/treasure hunt/Caccia al Tesoro 1.pdf',
    '30': '/samples/italian/word guess/Indovina la Parola 1.pdf',
    '31': '/samples/italian/word scramble/Lettere Mescolate 1.pdf',
    '32': '/samples/italian/wordsearch/Cerca Parole 1.pdf',
    '33': '/samples/italian/matching/Trova le Coppie 2.pdf',
  },
  pt: {
    '1': '/samples/portuguese/addition/Adição Divertida 1.pdf',
    '2': '/samples/portuguese/alphabet train/Comboio do Alfabeto 1.pdf',
    '3': '/samples/portuguese/big small/Grande ou Pequeno 1.pdf',
    '4': '/samples/portuguese/bingo/Bingo de Imagenes 1 callout.pdf',
    '5': '/samples/portuguese/chart count/Gráfico de Figuras 1.pdf',
    '6': '/samples/portuguese/code addition/Código Secreto Adição 1.pdf',
    '7': '/samples/english/coloring/coloring portrait 1.pdf',
    '8': '/samples/portuguese/crossword/Palavras Cruzadas 1.pdf',
    '9': '/samples/portuguese/cryptogram/Criptograma Ilustrado 1.pdf',
    '10': '/samples/portuguese/draw and color/Desenha e Pinta 1.pdf',
    '11': '/samples/portuguese/drawing lines/Prática de Desenhar Linhas 1.pdf',
    '12': '/samples/portuguese/find and count/Vejo, Vejo 1.pdf',
    '13': '/samples/portuguese/find objects/Encontra o Diferente (1).pdf',
    '14': '/samples/portuguese/grid match/Quebra-Cabeça de Grade 1.pdf',
    '15': '/samples/portuguese/matching/Encontre os Pares 1.pdf',
    '16': '/samples/portuguese/math puzzle/Quebra-Cabeças Matemático 1.pdf',
    '17': '/samples/portuguese/math worksheet/Folha de Matemática 1.pdf',
    '18': '/samples/portuguese/missing pieces/Peças em Falta 1.pdf',
    '19': '/samples/portuguese/more less/Mais Menos 1.pdf',
    '20': '/samples/portuguese/odd one out/Encontra o Diferente 1.pdf',
    '21': '/samples/portuguese/pattern train/Comboio de Padrões 1.pdf',
    '22': '/samples/portuguese/pattern worksheet/Quebra-cabeças de Padrões 1.pdf',
    '23': '/samples/portuguese/picture path/Caminho de Imagen 1.pdf',
    '24': '/samples/portuguese/picture sort/Classificação de Imagens 1.pdf',
    '25': '/samples/portuguese/prepositions/Preposições 1.pdf',
    '26': '/samples/portuguese/shadow match/Combine as Sombras 1.pdf',
    '27': '/samples/portuguese/subtraction/Subtrações Divertidas 1.pdf',
    '28': '/samples/portuguese/sudoku/Sudoku de Imagens 1.pdf',
    '29': '/samples/portuguese/treasure hunt/Caça ao Tesouro 1.pdf',
    '30': '/samples/portuguese/word guess/Adivinha a Palavra 1.pdf',
    '31': '/samples/portuguese/word scramble/Letras Embaralhadas 1.pdf',
    '32': '/samples/portuguese/wordsearch/Caça-Palavras 1.pdf',
    '33': '/samples/portuguese/matching/Encontre os Pares 2.pdf',
  },
  nl: {
    '1': '/samples/dutch/addition/Optellen is Leuk 1.pdf',
    '2': '/samples/dutch/alphabet train/Alfabettrein 1.pdf',
    '3': '/samples/dutch/big small/Groot of Klein 1.pdf',
    '4': '/samples/dutch/bingo/Plaatjesbingo 1 callout.pdf',
    '5': '/samples/dutch/chart count/Plaatjesgrafiek 1.pdf',
    '6': '/samples/dutch/code addition/Geheime Code Optellen 1.pdf',
    '7': '/samples/english/coloring/coloring portrait 1.pdf',
    '8': '/samples/dutch/crossword/Plaatjes Kruiswoord 1.pdf',
    '9': '/samples/dutch/cryptogram/Plaatjes Cryptogram 1.pdf',
    '10': '/samples/dutch/draw and color/Teken en Kleur 1.pdf',
    '11': '/samples/dutch/drawing lines/Lijnen Tekenen Oefenen 1.pdf',
    '12': '/samples/dutch/find and count/Ik zie, ik zie 1.pdf',
    '13': '/samples/dutch/find objects/Vind de Verborgen Voorwerpen 1.pdf',
    '14': '/samples/dutch/grid match/Rasterpuzzel 1.pdf',
    '15': '/samples/dutch/matching/Zoek de Paren 1.pdf',
    '16': '/samples/dutch/math puzzle/Wiskundepuzzels 1.pdf',
    '17': '/samples/dutch/math worksheet/Wiskundeblad 1.pdf',
    '18': '/samples/dutch/missing pieces/Ontbrekende Stukjes 1.pdf',
    '19': '/samples/dutch/more less/Meer Minder 1.pdf',
    '20': '/samples/dutch/odd one out/Vind de Vreemde Eend 1.pdf',
    '21': '/samples/dutch/pattern train/Patroontje 1.pdf',
    '22': '/samples/dutch/pattern worksheet/Patroonpuzzels 1.pdf',
    '23': '/samples/dutch/picture path/Afbeeldingspad 1.pdf',
    '24': '/samples/dutch/picture sort/Afbeeldingen Sorteren 1.pdf',
    '25': '/samples/dutch/prepositions/Voorzetsels 1.pdf',
    '26': '/samples/dutch/shadow match/Schaduw Koppelen 1.pdf',
    '27': '/samples/dutch/subtraction/Aftrekken is Leuk 1.pdf',
    '28': '/samples/dutch/sudoku/Plaatjes Sudoku 1.pdf',
    '29': '/samples/dutch/treasure hunt/Schattenjacht 1.pdf',
    '30': '/samples/dutch/word guess/Raad het Woord 1.pdf',
    '31': '/samples/dutch/word scramble/Letterzaak 1.pdf',
    '32': '/samples/dutch/wordsearch/Woordzoeker 1.pdf',
    '33': '/samples/dutch/matching/Zoek de Paren 2.pdf',
  },
  sv: {
    '1': '/samples/swedish/addition/addition_övning.pdf',
    '2': '/samples/swedish/alphabet train/alfabetståg landscape.pdf',
    '3': '/samples/swedish/big small/2 identiska bilder.pdf',
    '4': '/samples/swedish/bingo/bildbingo 1 callout.pdf',
    '5': '/samples/swedish/chart count/bilddiagram 1.pdf',
    '6': '/samples/english/code addition/code addition landscape.pdf',
    '7': '/samples/english/coloring/coloring portrait 1.pdf',
    '8': '/samples/swedish/crossword/Bildkorsord 1.pdf',
    '9': '/samples/swedish/cryptogram/Bildkryptogram 1.pdf',
    '10': '/samples/swedish/draw and color/Rita och Färglägg 1.pdf',
    '11': '/samples/swedish/drawing lines/diagonal 1.pdf',
    '12': '/samples/swedish/find and count/hitta och räkna landscape.pdf',
    '13': '/samples/swedish/find objects/Hitta den Udda (1).pdf',
    '14': '/samples/swedish/grid match/Rutnätspussel 1.pdf',
    '15': '/samples/swedish/matching/Matchningsspel beginning letter.pdf',
    '16': '/samples/swedish/math puzzle/Mattepussel 1.pdf',
    '17': '/samples/swedish/math worksheet/mattetal landscape.pdf',
    '18': '/samples/swedish/missing pieces/Saknade Bitar 1.pdf',
    '19': '/samples/swedish/more less/mer mindre 1.pdf',
    '20': '/samples/swedish/odd one out/Hitta Udda Fågeln 1.pdf',
    '21': '/samples/swedish/pattern train/Mönstert​åget 1.pdf',
    '22': '/samples/swedish/pattern worksheet/Mönsterpussel 1.pdf',
    '23': '/samples/swedish/picture path/bildväg 1.pdf',
    '24': '/samples/swedish/picture sort/sortera bilder 1.pdf',
    '25': '/samples/swedish/prepositions/Prepositioner 1.pdf',
    '26': '/samples/swedish/shadow match/skuggmatchning 1.pdf',
    '27': '/samples/swedish/subtraction/Rolig Subtraktio 1.pdf',
    '28': '/samples/swedish/sudoku/sudoku_lätt.pdf',
    '29': '/samples/swedish/treasure hunt/Skattjakt 1.pdf',
    '30': '/samples/swedish/word guess/Gissa Ordet 1.pdf',
    '31': '/samples/swedish/word scramble/Ordmix custom.pdf',
    '32': '/samples/swedish/wordsearch/ordletning custom.pdf',
    '33': '/samples/swedish/matching/Matchningsspel 2.pdf',
  },
  da: {
    '1': '/samples/danish/addition/Sjov Addition 1.pdf',
    '2': '/samples/danish/alphabet train/Alfabettog 1.pdf',
    '3': '/samples/danish/big small/Stort eller Lille 1.pdf',
    '4': '/samples/danish/bingo/Billedbingo 1 callout.pdf',
    '5': '/samples/danish/chart count/Billediagram 1.pdf',
    '6': '/samples/danish/code addition/Hemmelig Kode Addition 1.pdf',
    '7': '/samples/english/coloring/coloring portrait 1.pdf',
    '8': '/samples/danish/crossword/Billedkrydsord 1.pdf',
    '9': '/samples/danish/cryptogram/Billed-Kryptogram 1.pdf',
    '10': '/samples/danish/draw and color/Tegn og Farvlæg 1.pdf',
    '11': '/samples/danish/drawing lines/Linjetegningsøvelse 1.pdf',
    '12': '/samples/danish/find and count/Jeg ser, jeg ser 1.pdf',
    '13': '/samples/danish/find objects/Find den Ulige (1).pdf',
    '14': '/samples/danish/grid match/Gitterpuslespil 1.pdf',
    '15': '/samples/danish/matching/Find Parrene 1.pdf',
    '16': '/samples/danish/math puzzle/Mattepuslespil 1.pdf',
    '17': '/samples/danish/math worksheet/Matematikopgave 1.pdf',
    '18': '/samples/danish/missing pieces/Manglende Dele 1.pdf',
    '19': '/samples/danish/more less/Mere Mindre 1.pdf',
    '20': '/samples/danish/odd one out/Find den Ulige 1.pdf',
    '21': '/samples/danish/pattern train/Mønstertoget 1.pdf',
    '22': '/samples/danish/pattern worksheet/Mønstergåder 1.pdf',
    '23': '/samples/danish/picture path/Billedsti 1.pdf',
    '24': '/samples/danish/picture sort/Sorter Billeder 1.pdf',
    '25': '/samples/danish/prepositions/Præpositioner 1.pdf',
    '26': '/samples/danish/shadow match/Gør Billederne Hele 1.pdf',
    '27': '/samples/danish/subtraction/Sjov Subtraktion 1.pdf',
    '28': '/samples/danish/sudoku/Billede-Sudoku 1.pdf',
    '29': '/samples/danish/treasure hunt/Skattejagt 1.pdf',
    '30': '/samples/danish/word guess/Gæt Ordet 1.pdf',
    '31': '/samples/danish/word scramble/Bogstavrod 1.pdf',
    '32': '/samples/danish/wordsearch/Ordsøgning 1.pdf',
    '33': '/samples/danish/matching/Find Parrene 2.pdf',
  },
  no: {
    '1': '/samples/norwegian/addition/Gøy Addisjon 1.pdf',
    '2': '/samples/norwegian/alphabet train/Alfabettog 1.pdf',
    '3': '/samples/norwegian/big small/Stort eller Lite 1.pdf',
    '4': '/samples/norwegian/bingo/bildebingo 1 callout.pdf',
    '5': '/samples/norwegian/chart count/Bildediagram 1.pdf',
    '6': '/samples/norwegian/code addition/Hemmelig Kode Addisjon 1.pdf',
    '7': '/samples/english/coloring/coloring portrait 1.pdf',
    '8': '/samples/norwegian/crossword/Bildekryssord 1.pdf',
    '9': '/samples/norwegian/cryptogram/Bildekryptogram 1.pdf',
    '10': '/samples/norwegian/draw and color/Tegn og Fargelegg 1.pdf',
    '11': '/samples/norwegian/drawing lines/Linjetegningøvelse 1.pdf',
    '12': '/samples/norwegian/find and count/Jeg ser, jeg ser 1.pdf',
    '13': '/samples/norwegian/find objects/Finn den Merkelige (1).pdf',
    '14': '/samples/norwegian/grid match/Rutenettspuslespill 1.pdf',
    '15': '/samples/norwegian/matching/Finn Parene 1.pdf',
    '16': '/samples/norwegian/math puzzle/Mattepuslespill 1.pdf',
    '17': '/samples/norwegian/math worksheet/Matematikkoppgave 1.pdf',
    '18': '/samples/norwegian/missing pieces/Manglende Deler 1.pdf',
    '19': '/samples/norwegian/more less/Mer Mindre 1.pdf',
    '20': '/samples/norwegian/odd one out/Finn den Rare 1.pdf',
    '21': '/samples/norwegian/pattern train/Mønstertoget 1.pdf',
    '22': '/samples/norwegian/pattern worksheet/Mønstergåter 1.pdf',
    '23': '/samples/norwegian/picture path/Bildesti 1.pdf',
    '24': '/samples/norwegian/picture sort/Sorter Bilder 1.pdf',
    '25': '/samples/norwegian/prepositions/Preposisjoner 1.pdf',
    '26': '/samples/norwegian/shadow match/Fullfør Bildene 1.pdf',
    '27': '/samples/norwegian/subtraction/Moro med Subtraksjon 1.pdf',
    '28': '/samples/norwegian/sudoku/Bilde-Sudoku 1.pdf',
    '29': '/samples/norwegian/treasure hunt/Skattejakt 1.pdf',
    '30': '/samples/norwegian/word guess/Gjett Ordet 1.pdf',
    '31': '/samples/norwegian/word scramble/Bokstavblanding 1.pdf',
    '32': '/samples/norwegian/wordsearch/Ordleting 1.pdf',
    '33': '/samples/norwegian/matching/Finn Parene 2.pdf',
  },
  fi: {
    '1': '/samples/finnish/addition/Hauska Yhteenlasku 1.pdf',
    '2': '/samples/finnish/alphabet train/Aakkostjuna 1.pdf',
    '3': '/samples/finnish/big small/Iso vai Pieni 1.pdf',
    '4': '/samples/finnish/bingo/kuvabingo 1 callout.pdf',
    '5': '/samples/finnish/chart count/Kuvakaavio 1.pdf',
    '6': '/samples/finnish/code addition/Salainen Koodi Yhteenlasku 1.pdf',
    '7': '/samples/english/coloring/coloring portrait 1.pdf',
    '8': '/samples/finnish/crossword/Kuvaristikko 1.pdf',
    '9': '/samples/finnish/cryptogram/Kuvakryptogrammi 1.pdf',
    '10': '/samples/finnish/draw and color/Piirrä ja Väritä 1.pdf',
    '11': '/samples/finnish/drawing lines/Viivojen Piirtämisharjoitus 1.pdf',
    '12': '/samples/finnish/find and count/Minä näen 1.pdf',
    '13': '/samples/finnish/find objects/Löydä Outo (1).pdf',
    '14': '/samples/finnish/grid match/Ruudukkopalapeli 1.pdf',
    '15': '/samples/finnish/matching/Yhdistä Parit 1.pdf',
    '16': '/samples/finnish/math puzzle/Matematiikkapulmat 1.pdf',
    '17': '/samples/finnish/math worksheet/Matematiikkalehti 1.pdf',
    '18': '/samples/finnish/missing pieces/Puuttuvat Palat 1.pdf',
    '19': '/samples/finnish/more less/Enemmän Vähemmän 1.pdf',
    '20': '/samples/finnish/odd one out/Löydä Outo Lintu 1.pdf',
    '21': '/samples/finnish/pattern train/Kuviojuna 1.pdf',
    '22': '/samples/finnish/pattern worksheet/Kuviotehtävät 1.pdf',
    '23': '/samples/finnish/picture path/Kuvapolku 2.pdf',
    '24': '/samples/finnish/picture sort/Lajittele Kuvat 1.pdf',
    '25': '/samples/finnish/prepositions/Prepositiot 1.pdf',
    '26': '/samples/finnish/shadow match/Täydennä Kuvat 1.pdf',
    '27': '/samples/finnish/subtraction/Hauskaa Vähennyslaskua 1.pdf',
    '28': '/samples/finnish/sudoku/Kuva-Sudoku 1.pdf',
    '29': '/samples/finnish/treasure hunt/Aarteenetsintä 1.pdf',
    '30': '/samples/finnish/word guess/Arvaa Sana 1.pdf',
    '31': '/samples/finnish/word scramble/Kirjainsekoitus 1.pdf',
    '32': '/samples/finnish/wordsearch/Sanahaku 1.pdf',
    '33': '/samples/finnish/matching/Yhdistä Parit 2.pdf',
  },
};

interface SampleGalleryProps {
  locale: string;
  dynamicImages?: Record<string, string>;  // Server-side fetched homepage thumbnails
  seoData?: Record<string, { altText: string; title: string; description: string; caption: string }>;  // Server-side fetched SEO metadata
}

// Localization content
const localeContent: Record<string, {
  badge: string;
  title: string;
  subtitle: string;
  statSamples: string;
  statSamplesLabel: string;
  statQuality: string;
  statQualityLabel: string;
  statFormat: string;
  statFormatLabel: string;
  downloadPdf: string;
  downloading: string;
  viewDetails: string;
  viewAllGenerators: string;
}> = {
  en: {
    badge: 'Free Samples',
    title: 'Download Free Worksheet Samples',
    subtitle: 'Try before you subscribe. Download high-quality PDF samples from our most popular generators.',
    statSamples: '33',
    statSamplesLabel: 'Free Samples',
    statQuality: '300 DPI',
    statQualityLabel: 'Print Quality',
    statFormat: 'PDF',
    statFormatLabel: 'Format',
    downloadPdf: 'Download PDF',
    downloading: 'Downloading...',
    viewDetails: 'View Details',
    viewAllGenerators: 'View All 33 Generators',
  },
  de: {
    badge: 'Kostenlose Beispiele',
    title: 'Arbeitsblätter kostenlos herunterladen',
    subtitle: 'Testen Sie vor dem Kauf. Laden Sie hochwertige PDF-Beispiele unserer beliebtesten Generatoren herunter.',
    statSamples: '33',
    statSamplesLabel: 'Kostenlose Beispiele',
    statQuality: '300 DPI',
    statQualityLabel: 'Druckqualität',
    statFormat: 'PDF',
    statFormatLabel: 'Format',
    downloadPdf: 'PDF herunterladen',
    downloading: 'Wird heruntergeladen...',
    viewDetails: 'Mehr erfahren',
    viewAllGenerators: 'Alle 33 Generatoren entdecken',
  },
  fr: {
    badge: 'Exemples gratuits',
    title: 'Téléchargez des fiches gratuites',
    subtitle: 'Testez avant de vous abonner. Téléchargez des exemples PDF haute qualité de nos générateurs les plus populaires.',
    statSamples: '33',
    statSamplesLabel: 'Exemples gratuits',
    statQuality: '300 DPI',
    statQualityLabel: 'Qualité impression',
    statFormat: 'PDF',
    statFormatLabel: 'Format',
    downloadPdf: 'Télécharger le PDF',
    downloading: 'Téléchargement...',
    viewDetails: 'En savoir plus',
    viewAllGenerators: 'Explorer les 33 générateurs',
  },
  es: {
    badge: 'Ejemplos gratis',
    title: 'Descarga fichas de muestra gratis',
    subtitle: 'Prueba antes de suscribirte. Descarga ejemplos en PDF de alta calidad de nuestros generadores más populares.',
    statSamples: '33',
    statSamplesLabel: 'Ejemplos gratis',
    statQuality: '300 DPI',
    statQualityLabel: 'Calidad de impresión',
    statFormat: 'PDF',
    statFormatLabel: 'Formato',
    downloadPdf: 'Descargar PDF',
    downloading: 'Descargando...',
    viewDetails: 'Ver más',
    viewAllGenerators: 'Explorar los 33 generadores',
  },
  it: {
    badge: 'Esempi gratuiti',
    title: 'Scarica schede di esempio gratuite',
    subtitle: 'Prova prima di abbonarti. Scarica esempi PDF di alta qualità dai nostri generatori più popolari.',
    statSamples: '33',
    statSamplesLabel: 'Esempi gratuiti',
    statQuality: '300 DPI',
    statQualityLabel: 'Qualità di stampa',
    statFormat: 'PDF',
    statFormatLabel: 'Formato',
    downloadPdf: 'Scarica PDF',
    downloading: 'Download in corso...',
    viewDetails: 'Scopri di più',
    viewAllGenerators: 'Esplora tutti i 33 generatori',
  },
  pt: {
    badge: 'Exemplos grátis',
    title: 'Baixe atividades de exemplo grátis',
    subtitle: 'Experimente antes de assinar. Baixe exemplos em PDF de alta qualidade dos nossos geradores mais populares.',
    statSamples: '33',
    statSamplesLabel: 'Exemplos grátis',
    statQuality: '300 DPI',
    statQualityLabel: 'Qualidade de impressão',
    statFormat: 'PDF',
    statFormatLabel: 'Formato',
    downloadPdf: 'Baixar PDF',
    downloading: 'Baixando...',
    viewDetails: 'Saiba mais',
    viewAllGenerators: 'Ver todos os 33 geradores',
  },
  nl: {
    badge: 'Gratis voorbeelden',
    title: 'Download gratis voorbeeldwerkbladen',
    subtitle: 'Probeer voordat je abonneert. Download hoogwaardige PDF-voorbeelden van onze populairste generatoren.',
    statSamples: '33',
    statSamplesLabel: 'Gratis voorbeelden',
    statQuality: '300 DPI',
    statQualityLabel: 'Afdrukkwaliteit',
    statFormat: 'PDF',
    statFormatLabel: 'Bestandstype',
    downloadPdf: 'Download PDF',
    downloading: 'Downloaden...',
    viewDetails: 'Meer informatie',
    viewAllGenerators: 'Bekijk alle 33 generatoren',
  },
  da: {
    badge: 'Gratis eksempler',
    title: 'Download gratis opgaveeksempler',
    subtitle: 'Prøv før du abonnerer. Download PDF-eksempler i høj kvalitet fra vores mest populære generatorer.',
    statSamples: '33',
    statSamplesLabel: 'Gratis eksempler',
    statQuality: '300 DPI',
    statQualityLabel: 'Printkvalitet',
    statFormat: 'PDF',
    statFormatLabel: 'Format',
    downloadPdf: 'Download PDF',
    downloading: 'Downloader...',
    viewDetails: 'Læs mere',
    viewAllGenerators: 'Se alle 33 generatorer',
  },
  sv: {
    badge: 'Gratis exempel',
    title: 'Ladda ner gratis övningsbladsexempel',
    subtitle: 'Testa innan du prenumererar. Ladda ner högkvalitativa PDF-exempel från våra mest populära generatorer.',
    statSamples: '33',
    statSamplesLabel: 'Gratis exempel',
    statQuality: '300 DPI',
    statQualityLabel: 'Utskriftskvalitet',
    statFormat: 'PDF',
    statFormatLabel: 'Format',
    downloadPdf: 'Ladda ner PDF',
    downloading: 'Laddar ner...',
    viewDetails: 'Läs mer',
    viewAllGenerators: 'Se alla 33 generatorer',
  },
  no: {
    badge: 'Gratis eksempler',
    title: 'Last ned gratis oppgaveeksempler',
    subtitle: 'Prøv før du abonnerer. Last ned PDF-eksempler i høy kvalitet fra våre mest populære generatorer.',
    statSamples: '33',
    statSamplesLabel: 'Gratis eksempler',
    statQuality: '300 DPI',
    statQualityLabel: 'Utskriftskvalitet',
    statFormat: 'PDF',
    statFormatLabel: 'Format',
    downloadPdf: 'Last ned PDF',
    downloading: 'Laster ned...',
    viewDetails: 'Les mer',
    viewAllGenerators: 'Se alle 33 generatorer',
  },
  fi: {
    badge: 'Ilmaiset esimerkit',
    title: 'Lataa ilmaisia tehtäväesimerkkejä',
    subtitle: 'Kokeile ennen tilaamista. Lataa laadukkaita PDF-esimerkkejä suosituimmista generaattoreistamme.',
    statSamples: '33',
    statSamplesLabel: 'Ilmaista esimerkkiä',
    statQuality: '300 DPI',
    statQualityLabel: 'Tulostuslaatu',
    statFormat: 'PDF',
    statFormatLabel: 'Tiedostomuoto',
    downloadPdf: 'Lataa PDF',
    downloading: 'Ladataan...',
    viewDetails: 'Lue lisää',
    viewAllGenerators: 'Tutustu kaikkiin 33 generaattoriin',
  },
};

// Real samples - 33 apps with translations
const samples: Sample[] = [
  {
    id: '1',
    nameEn: 'Addition Worksheets', nameDe: 'Additions-Arbeitsblätter', nameFr: 'Fiches d\'addition', nameEs: 'Fichas de sumas', nameIt: 'Schede di addizioni', namePt: 'Atividades de Adição', nameNl: 'Optelwerkbladen', nameDa: 'Additionsopgaver', nameSv: 'Additionsövningsblad', nameNo: 'Addisjonsoppgaver', nameFi: 'Yhteenlaskutehtävät',
    categoryEn: 'Math', categoryDe: 'Mathematik', categoryFr: 'Maths', categoryEs: 'Matemáticas', categoryIt: 'Matematica', categoryPt: 'Matemática', categoryNl: 'Rekenen', categoryDa: 'Matematik', categorySv: 'Matematik', categoryNo: 'Matte', categoryFi: 'Matematiikka',
    imageSrc: '/samples/english/addition/addition_worksheet portrait.jpeg', pdfUrl: '/samples/english/addition/addition_worksheet portrait.pdf', productPageSlug: 'addition-worksheets',
  },
  {
    id: '2',
    nameEn: 'Alphabet Train', nameDe: 'ABC-Zug', nameFr: 'Train de l\'alphabet', nameEs: 'Tren del abecedario', nameIt: 'Trenino dell\'alfabeto', namePt: 'Trenzinho do alfabeto', nameNl: 'Alfabettrein', nameDa: 'Alfabettog', nameSv: 'Alfabetståget', nameNo: 'Alfabettoget', nameFi: 'Aakkosjuna',
    categoryEn: 'Creative', categoryDe: 'Kreativ', categoryFr: 'Créatif', categoryEs: 'Creativo', categoryIt: 'Creativo', categoryPt: 'Criativo', categoryNl: 'Creatief', categoryDa: 'Kreativ', categorySv: 'Kreativt', categoryNo: 'Kreativt', categoryFi: 'Luova',
    imageSrc: '/samples/english/alphabet train/alphabet train landscape.jpeg', pdfUrl: '/samples/english/alphabet train/alphabet train landscape.pdf', productPageSlug: 'alphabet-train-worksheets',
  },
  {
    id: '3',
    nameEn: 'Big or Small', nameDe: 'Groß oder Klein', nameFr: 'Grand ou Petit', nameEs: 'Grande o Pequeño', nameIt: 'Grande o Piccolo', namePt: 'Grande ou Pequeno', nameNl: 'Groot of Klein', nameDa: 'Stort eller Lille', nameSv: 'Stort eller Litet', nameNo: 'Stort eller Lite', nameFi: 'Iso vai Pieni',
    categoryEn: 'Visual', categoryDe: 'Visuell', categoryFr: 'Visuel', categoryEs: 'Visual', categoryIt: 'Visivo', categoryPt: 'Visual', categoryNl: 'Visueel', categoryDa: 'Visuel', categorySv: 'Visuellt', categoryNo: 'Visuelt', categoryFi: 'Visuaalinen',
    imageSrc: '/samples/english/big small/big-small-different images.jpeg', pdfUrl: '/samples/english/big small/big-small-different images.pdf', productPageSlug: 'big-small-worksheets',
  },
  {
    id: '4',
    nameEn: 'Picture Bingo', nameDe: 'Bilder-Bingo', nameFr: 'Bingo en images', nameEs: 'Bingo de imágenes', nameIt: 'Bingo illustrato', namePt: 'Bingo de imagens', nameNl: 'Plaatjesbingo', nameDa: 'Billedbingo', nameSv: 'Bildbingo', nameNo: 'Bildebingo', nameFi: 'Kuvabingo',
    categoryEn: 'Creative', categoryDe: 'Kreativ', categoryFr: 'Créatif', categoryEs: 'Creativo', categoryIt: 'Creativo', categoryPt: 'Criativo', categoryNl: 'Creatief', categoryDa: 'Kreativ', categorySv: 'Kreativt', categoryNo: 'Kreativt', categoryFi: 'Luova',
    imageSrc: '/samples/english/bingo/image and image.jpeg', pdfUrl: '/samples/english/bingo/image and image.pdf', productPageSlug: 'picture-bingo-worksheets',
  },
  {
    id: '5',
    nameEn: 'Chart Count', nameDe: 'Bilddiagramm', nameFr: 'Graphique d\'images', nameEs: 'Gráfico de Dibujos', nameIt: 'Grafico con Immagini', namePt: 'Gráfico de Figuras', nameNl: 'Plaatjesgrafiek', nameDa: 'Billediagram', nameSv: 'Bilddiagram', nameNo: 'Bildediagram', nameFi: 'Kuvakaavio',
    categoryEn: 'Math', categoryDe: 'Mathematik', categoryFr: 'Maths', categoryEs: 'Matemáticas', categoryIt: 'Matematica', categoryPt: 'Matemática', categoryNl: 'Rekenen', categoryDa: 'Matematik', categorySv: 'Matematik', categoryNo: 'Matte', categoryFi: 'Matematiikka',
    imageSrc: '/samples/english/chart count/chart count portrait.jpeg', pdfUrl: '/samples/english/chart count/chart count portrait.pdf', productPageSlug: 'chart-count-worksheets',
  },
  {
    id: '6',
    nameEn: 'Code Addition', nameDe: 'Rechencode', nameFr: 'Addition codée', nameEs: 'Sumas con código', nameIt: 'Addizioni in codice', namePt: 'Adição com código', nameNl: 'Optellen met code', nameDa: 'Kodeaddition', nameSv: 'Kodaddition', nameNo: 'Kodeaddisjon', nameFi: 'Koodiyhteenlasku',
    categoryEn: 'Math', categoryDe: 'Mathematik', categoryFr: 'Maths', categoryEs: 'Matemáticas', categoryIt: 'Matematica', categoryPt: 'Matemática', categoryNl: 'Rekenen', categoryDa: 'Matematik', categorySv: 'Matematik', categoryNo: 'Matte', categoryFi: 'Matematiikka',
    imageSrc: '/samples/english/code addition/code addition landscape.jpeg', pdfUrl: '/samples/english/code addition/code addition landscape.pdf', productPageSlug: 'code-addition-worksheets',
  },
  {
    id: '7',
    nameEn: 'Coloring Pages', nameDe: 'Ausmalbilder', nameFr: 'Coloriages', nameEs: 'Páginas para colorear', nameIt: 'Disegni da colorare', namePt: 'Desenhos para colorir', nameNl: 'Kleurplaten', nameDa: 'Tegnesider', nameSv: 'Målarbilder', nameNo: 'Fargeleggingssider', nameFi: 'Värityssivut',
    categoryEn: 'Creative', categoryDe: 'Kreativ', categoryFr: 'Créatif', categoryEs: 'Creativo', categoryIt: 'Creativo', categoryPt: 'Criativo', categoryNl: 'Creatief', categoryDa: 'Kreativ', categorySv: 'Kreativt', categoryNo: 'Kreativt', categoryFi: 'Luova',
    imageSrc: '/samples/english/coloring/coloring portrait 1.png', pdfUrl: '/samples/english/coloring/coloring portrait 1.pdf', productPageSlug: 'coloring-worksheets',
  },
  {
    id: '8',
    nameEn: 'Crossword Puzzles', nameDe: 'Kreuzworträtsel', nameFr: 'Mots croisés', nameEs: 'Crucigramas', nameIt: 'Cruciverba', namePt: 'Palavras cruzadas', nameNl: 'Kruiswoordpuzzels', nameDa: 'Krydsord', nameSv: 'Korsord', nameNo: 'Kryssord', nameFi: 'Ristikot',
    categoryEn: 'Language', categoryDe: 'Sprache', categoryFr: 'Langue', categoryEs: 'Lenguaje', categoryIt: 'Linguaggio', categoryPt: 'Linguagem', categoryNl: 'Taal', categoryDa: 'Sprog', categorySv: 'Språk', categoryNo: 'Språk', categoryFi: 'Kieli',
    imageSrc: '/samples/english/crossword/crossword_worksheet.jpeg', pdfUrl: '/samples/english/crossword/crossword_worksheet.pdf', productPageSlug: 'crossword-worksheets',
  },
  {
    id: '9',
    nameEn: 'Cryptogram Puzzles', nameDe: 'Kryptogramme', nameFr: 'Cryptogrammes', nameEs: 'Criptogramas', nameIt: 'Crittogrammi', namePt: 'Criptogramas', nameNl: 'Cryptogrammen', nameDa: 'Kryptogrammer', nameSv: 'Kryptogram', nameNo: 'Kryptogrammer', nameFi: 'Kryptogrammit',
    categoryEn: 'Logic', categoryDe: 'Logik', categoryFr: 'Logique', categoryEs: 'Lógica', categoryIt: 'Logica', categoryPt: 'Lógica', categoryNl: 'Logica', categoryDa: 'Logik', categorySv: 'Logik', categoryNo: 'Logikk', categoryFi: 'Logiikka',
    imageSrc: '/samples/english/cryptogram/cryptogram_worksheet.jpeg', pdfUrl: '/samples/english/cryptogram/cryptogram_worksheet.pdf', productPageSlug: 'cryptogram-worksheets',
  },
  {
    id: '10',
    nameEn: 'Draw and Color', nameDe: 'Zeichnen und Ausmalen', nameFr: 'Dessine et Colorie', nameEs: 'Dibuja y Colorea', nameIt: 'Disegna e Colora', namePt: 'Desenha e Pinta', nameNl: 'Teken en Kleur', nameDa: 'Tegn og Farvlæg', nameSv: 'Rita och Färglägg', nameNo: 'Tegn og Fargelegg', nameFi: 'Piirrä ja Väritä',
    categoryEn: 'Creative', categoryDe: 'Kreativ', categoryFr: 'Créatif', categoryEs: 'Creativo', categoryIt: 'Creativo', categoryPt: 'Criativo', categoryNl: 'Creatief', categoryDa: 'Kreativ', categorySv: 'Kreativt', categoryNo: 'Kreativt', categoryFi: 'Luova',
    imageSrc: '/samples/english/draw and color/grid-drawing_worksheet.jpeg', pdfUrl: '/samples/english/draw and color/grid-drawing_worksheet.pdf', productPageSlug: 'draw-and-color-worksheets',
  },
  {
    id: '11',
    nameEn: 'Drawing Lines', nameDe: 'Linien zeichnen', nameFr: 'Tracer des lignes', nameEs: 'Trazar líneas', nameIt: 'Traccia le linee', namePt: 'Traçar linhas', nameNl: 'Lijnen trekken', nameDa: 'Tegn streger', nameSv: 'Dra streck', nameNo: 'Tegn linjer', nameFi: 'Viivojen piirtäminen',
    categoryEn: 'Visual', categoryDe: 'Visuell', categoryFr: 'Visuel', categoryEs: 'Visual', categoryIt: 'Visivo', categoryPt: 'Visual', categoryNl: 'Visueel', categoryDa: 'Visuel', categorySv: 'Visuellt', categoryNo: 'Visuelt', categoryFi: 'Visuaalinen',
    imageSrc: '/samples/english/drawing lines/drawing_lines_curve 1.jpeg', pdfUrl: '/samples/english/drawing lines/drawing_lines_curve 1.pdf', productPageSlug: 'drawing-lines-worksheets',
  },
  {
    id: '12',
    nameEn: 'Find and Count', nameDe: 'Suchen und Zählen', nameFr: 'Je vois', nameEs: 'Veo Veo', nameIt: 'Vedo Vedo', namePt: 'Vejo Vejo', nameNl: 'Ik zie ik zie', nameDa: 'Jeg ser jeg ser', nameSv: 'Hitta och räkna', nameNo: 'Jeg ser jeg ser', nameFi: 'Minä näen',
    categoryEn: 'Visual', categoryDe: 'Visuell', categoryFr: 'Visuel', categoryEs: 'Visual', categoryIt: 'Visivo', categoryPt: 'Visual', categoryNl: 'Visueel', categoryDa: 'Visuel', categorySv: 'Visuellt', categoryNo: 'Visuelt', categoryFi: 'Visuaalinen',
    imageSrc: '/samples/english/find and count/find and count landscape.jpeg', pdfUrl: '/samples/english/find and count/find and count landscape.pdf', productPageSlug: 'find-and-count-worksheets',
  },
  {
    id: '13',
    nameEn: 'Find Objects', nameDe: 'Suchbilder', nameFr: 'Cherche et trouve', nameEs: 'Busca y encuentra', nameIt: 'Cerca e trova', namePt: 'Encontre os objetos', nameNl: 'Zoek en vind', nameDa: 'Find objekterne', nameSv: 'Hitta föremålen', nameNo: 'Finn gjenstandene', nameFi: 'Etsi esineet',
    categoryEn: 'Visual', categoryDe: 'Visuell', categoryFr: 'Visuel', categoryEs: 'Visual', categoryIt: 'Visivo', categoryPt: 'Visual', categoryNl: 'Visueel', categoryDa: 'Visuel', categorySv: 'Visuellt', categoryNo: 'Visuelt', categoryFi: 'Visuaalinen',
    imageSrc: '/samples/english/find objects/find objects landscape.jpeg', pdfUrl: '/samples/english/find objects/find objects landscape.pdf', productPageSlug: 'find-objects-worksheets',
  },
  {
    id: '14',
    nameEn: 'Grid Match', nameDe: 'Raster-Puzzle', nameFr: 'Puzzle Grille', nameEs: 'Puzzle de Cuadrícula', nameIt: 'Puzzle a Griglia', namePt: 'Quebra-Cabeça de Grade', nameNl: 'Rasterpuzzel', nameDa: 'Gitterpuslespil', nameSv: 'Rutnätspussel', nameNo: 'Rutenettspuslespill', nameFi: 'Ruudukkopalapeli',
    categoryEn: 'Logic', categoryDe: 'Logik', categoryFr: 'Logique', categoryEs: 'Lógica', categoryIt: 'Logica', categoryPt: 'Lógica', categoryNl: 'Logica', categoryDa: 'Logik', categorySv: 'Logik', categoryNo: 'Logikk', categoryFi: 'Logiikka',
    imageSrc: '/samples/english/grid match/grid match portrait.jpeg', pdfUrl: '/samples/english/grid match/grid match portrait.pdf', productPageSlug: 'grid-match-worksheets',
  },
  {
    id: '15',
    nameEn: 'Matching Game', nameDe: 'Zuordnungsspiel', nameFr: 'Jeu d\'association', nameEs: 'Relacionar parejas', nameIt: 'Abbinamenti', namePt: 'Jogo de correspondência', nameNl: 'Koppelspel', nameDa: 'Parspil', nameSv: 'Para ihop', nameNo: 'Finn par', nameFi: 'Yhdistämistehtävä',
    categoryEn: 'Visual', categoryDe: 'Visuell', categoryFr: 'Visuel', categoryEs: 'Visual', categoryIt: 'Visivo', categoryPt: 'Visual', categoryNl: 'Visueel', categoryDa: 'Visuel', categorySv: 'Visuellt', categoryNo: 'Visuelt', categoryFi: 'Visuaalinen',
    imageSrc: '/samples/english/matching/matching portrait.jpeg', pdfUrl: '/samples/english/matching/matching portrait.pdf', productPageSlug: 'matching-worksheets',
  },
  {
    id: '16',
    nameEn: 'Math Puzzle', nameDe: 'Mathe-Rätsel', nameFr: 'Casse-Têtes Mathématiques', nameEs: 'Rompecabezas Matemáticos', nameIt: 'Rompicapi Matematici', namePt: 'Quebra-Cabeças Matemático', nameNl: 'Wiskundepuzzels', nameDa: 'Mattepuslespil', nameSv: 'Mattepussel', nameNo: 'Mattepuslespill', nameFi: 'Matematiikkapulmat',
    categoryEn: 'Math', categoryDe: 'Mathematik', categoryFr: 'Maths', categoryEs: 'Matemáticas', categoryIt: 'Matematica', categoryPt: 'Matemática', categoryNl: 'Rekenen', categoryDa: 'Matematik', categorySv: 'Matematik', categoryNo: 'Matte', categoryFi: 'Matematiikka',
    imageSrc: '/samples/english/math puzzle/worksheet.jpeg', pdfUrl: '/samples/english/math puzzle/worksheet.pdf', productPageSlug: 'math-puzzle-worksheets',
  },
  {
    id: '17',
    nameEn: 'Math Worksheets', nameDe: 'Mathe-Übungsblätter', nameFr: 'Feuilles de Mathématiques', nameEs: 'Hojas de Matemáticas', nameIt: 'Schede di Matematica', namePt: 'Folhas de Matemática', nameNl: 'Wiskundebladen', nameDa: 'Matematikopgaver', nameSv: 'Matteövningsblad', nameNo: 'Matematikkoppgaver', nameFi: 'Matematiikkalehdet',
    categoryEn: 'Math', categoryDe: 'Mathematik', categoryFr: 'Maths', categoryEs: 'Matemáticas', categoryIt: 'Matematica', categoryPt: 'Matemática', categoryNl: 'Rekenen', categoryDa: 'Matematik', categorySv: 'Matematik', categoryNo: 'Matte', categoryFi: 'Matematiikka',
    imageSrc: '/samples/english/math worksheet/math worksheet portrait.jpeg', pdfUrl: '/samples/english/math worksheet/math worksheet portrait.pdf', productPageSlug: 'math-worksheets',
  },
  {
    id: '18',
    nameEn: 'Missing Pieces', nameDe: 'Fehlende Teile', nameFr: 'Pièces Manquantes', nameEs: 'Piezas Perdidas', nameIt: 'Pezzi Mancanti', namePt: 'Peças em Falta', nameNl: 'Ontbrekende Stukjes', nameDa: 'Manglende Dele', nameSv: 'Saknade Bitar', nameNo: 'Manglende Deler', nameFi: 'Puuttuvat Palat',
    categoryEn: 'Logic', categoryDe: 'Logik', categoryFr: 'Logique', categoryEs: 'Lógica', categoryIt: 'Logica', categoryPt: 'Lógica', categoryNl: 'Logica', categoryDa: 'Logik', categorySv: 'Logik', categoryNo: 'Logikk', categoryFi: 'Logiikka',
    imageSrc: '/samples/english/missing pieces/missing pieces portrait.jpeg', pdfUrl: '/samples/english/missing pieces/missing pieces portrait.pdf', productPageSlug: 'missing-pieces-worksheets',
  },
  {
    id: '19',
    nameEn: 'More or Less', nameDe: 'Mehr oder Weniger', nameFr: 'Plus ou Moins', nameEs: 'Más o Menos', nameIt: 'Più o Meno', namePt: 'Mais ou Menos', nameNl: 'Meer of Minder', nameDa: 'Mere eller Mindre', nameSv: 'Mer eller Mindre', nameNo: 'Mer eller Mindre', nameFi: 'Enemmän tai Vähemmän',
    categoryEn: 'Math', categoryDe: 'Mathematik', categoryFr: 'Maths', categoryEs: 'Matemáticas', categoryIt: 'Matematica', categoryPt: 'Matemática', categoryNl: 'Rekenen', categoryDa: 'Matematik', categorySv: 'Matematik', categoryNo: 'Matte', categoryFi: 'Matematiikka',
    imageSrc: '/samples/english/more less/more less portrait.jpeg', pdfUrl: '/samples/english/more less/more less portrait.pdf', productPageSlug: 'more-less-worksheets',
  },
  {
    id: '20',
    nameEn: 'Odd One Out', nameDe: 'Was passt nicht?', nameFr: 'Trouve l\'intrus', nameEs: 'Encuentra el diferente', nameIt: 'Trova il diverso', namePt: 'Encontra o diferente', nameNl: 'Vind de vreemde eend', nameDa: 'Find den ulige', nameSv: 'Hitta udda', nameNo: 'Finn den rare', nameFi: 'Löydä outo',
    categoryEn: 'Logic', categoryDe: 'Logik', categoryFr: 'Logique', categoryEs: 'Lógica', categoryIt: 'Logica', categoryPt: 'Lógica', categoryNl: 'Logica', categoryDa: 'Logik', categorySv: 'Logik', categoryNo: 'Logikk', categoryFi: 'Logiikka',
    imageSrc: '/samples/english/odd one out/identical.jpeg', pdfUrl: '/samples/english/odd one out/identical.pdf', productPageSlug: 'odd-one-out-worksheets',
  },
  {
    id: '21',
    nameEn: 'Pattern Train', nameDe: 'Musterzug', nameFr: 'Train à Motifs', nameEs: 'Tren de Patrones', nameIt: 'Treno dei Modelli', namePt: 'Comboio de Padrões', nameNl: 'Patroontrein', nameDa: 'Mønstertoget', nameSv: 'Mönstert​åget', nameNo: 'Mønstertoget', nameFi: 'Kuviojuna',
    categoryEn: 'Logic', categoryDe: 'Logik', categoryFr: 'Logique', categoryEs: 'Lógica', categoryIt: 'Logica', categoryPt: 'Lógica', categoryNl: 'Logica', categoryDa: 'Logik', categorySv: 'Logik', categoryNo: 'Logikk', categoryFi: 'Logiikka',
    imageSrc: '/samples/english/pattern train/pattern_train landscape.jpeg', pdfUrl: '/samples/english/pattern train/pattern_train landscape.pdf', productPageSlug: 'pattern-train-worksheets',
  },
  {
    id: '22',
    nameEn: 'Pattern Worksheets', nameDe: 'Musterrätsel', nameFr: 'Puzzles de Motifs', nameEs: 'Rompecabezas de Patrones', nameIt: 'Puzzle di Schemi', namePt: 'Quebra-cabeças de Padrões', nameNl: 'Patroonpuzzels', nameDa: 'Mønstergåder', nameSv: 'Mönsterpussel', nameNo: 'Mønstergåter', nameFi: 'Kuviotehtävät',
    categoryEn: 'Logic', categoryDe: 'Logik', categoryFr: 'Logique', categoryEs: 'Lógica', categoryIt: 'Logica', categoryPt: 'Lógica', categoryNl: 'Logica', categoryDa: 'Logik', categorySv: 'Logik', categoryNo: 'Logikk', categoryFi: 'Logiikka',
    imageSrc: '/samples/english/pattern worksheet/pattern worksheet portrait.jpeg', pdfUrl: '/samples/english/pattern worksheet/pattern worksheet portrait.pdf', productPageSlug: 'pattern-worksheets',
  },
  {
    id: '23',
    nameEn: 'Picture Path', nameDe: 'Bilderpfad', nameFr: 'Chemin d\'Images', nameEs: 'Camino de Imágenes', nameIt: 'Percorso di Immagini', namePt: 'Caminho de Imagens', nameNl: 'Afbeeldingspad', nameDa: 'Billedsti', nameSv: 'Bildväg', nameNo: 'Bildesti', nameFi: 'Kuvapolku',
    categoryEn: 'Visual', categoryDe: 'Visuell', categoryFr: 'Visuel', categoryEs: 'Visual', categoryIt: 'Visivo', categoryPt: 'Visual', categoryNl: 'Visueel', categoryDa: 'Visuel', categorySv: 'Visuellt', categoryNo: 'Visuelt', categoryFi: 'Visuaalinen',
    imageSrc: '/samples/english/picture path/classic maze.jpeg', pdfUrl: '/samples/english/picture path/classic maze.pdf', productPageSlug: 'picture-path-worksheets',
  },
  {
    id: '24',
    nameEn: 'Picture Sort', nameDe: 'Bilder Sortieren', nameFr: 'Tri d\'Images', nameEs: 'Clasificación de Imágenes', nameIt: 'Classificazione Immagini', namePt: 'Classificação de Imagens', nameNl: 'Afbeeldingen Sorteren', nameDa: 'Sorter Billeder', nameSv: 'Sortera Bilder', nameNo: 'Sorter Bilder', nameFi: 'Lajittele Kuvat',
    categoryEn: 'Visual', categoryDe: 'Visuell', categoryFr: 'Visuel', categoryEs: 'Visual', categoryIt: 'Visivo', categoryPt: 'Visual', categoryNl: 'Visueel', categoryDa: 'Visuel', categorySv: 'Visuellt', categoryNo: 'Visuelt', categoryFi: 'Visuaalinen',
    imageSrc: '/samples/english/picture sort/picture sort landscape.jpeg', pdfUrl: '/samples/english/picture sort/picture sort landscape.pdf', productPageSlug: 'picture-sort-worksheets',
  },
  {
    id: '25',
    nameEn: 'Prepositions', nameDe: 'Präpositionen', nameFr: 'Prépositions', nameEs: 'Preposiciones', nameIt: 'Preposizioni', namePt: 'Preposições', nameNl: 'Voorzetsels', nameDa: 'Præpositioner', nameSv: 'Prepositioner', nameNo: 'Preposisjoner', nameFi: 'Prepositiot',
    categoryEn: 'Language', categoryDe: 'Sprache', categoryFr: 'Langue', categoryEs: 'Lenguaje', categoryIt: 'Linguaggio', categoryPt: 'Linguagem', categoryNl: 'Taal', categoryDa: 'Sprog', categorySv: 'Språk', categoryNo: 'Språk', categoryFi: 'Kieli',
    imageSrc: '/samples/english/prepositions/prepositions portrait.jpeg', pdfUrl: '/samples/english/prepositions/prepositions portrait.pdf', productPageSlug: 'prepositions-worksheets',
  },
  {
    id: '26',
    nameEn: 'Shadow Match', nameDe: 'Schatten Zuordnen', nameFr: 'Trouve l\'Ombre', nameEs: 'Empareja las Sombras', nameIt: 'Abbina le Ombre', namePt: 'Combine as Sombras', nameNl: 'Schaduw Koppelen', nameDa: 'Gør Billederne Hele', nameSv: 'Skuggmatchning', nameNo: 'Fullfør Bildene', nameFi: 'Täydennä Kuvat',
    categoryEn: 'Visual', categoryDe: 'Visuell', categoryFr: 'Visuel', categoryEs: 'Visual', categoryIt: 'Visivo', categoryPt: 'Visual', categoryNl: 'Visueel', categoryDa: 'Visuel', categorySv: 'Visuellt', categoryNo: 'Visuelt', categoryFi: 'Visuaalinen',
    imageSrc: '/samples/english/shadow match/shadow-match-horizontal.jpeg', pdfUrl: '/samples/english/shadow match/shadow-match-horizontal.pdf', productPageSlug: 'shadow-match-worksheets',
  },
  {
    id: '27',
    nameEn: 'Subtraction Worksheets', nameDe: 'Subtraktions-Arbeitsblätter', nameFr: 'Fiches de soustraction', nameEs: 'Fichas de restas', nameIt: 'Schede di sottrazioni', namePt: 'Atividades de Subtração', nameNl: 'Aftrekwerkbladen', nameDa: 'Subtraktionsopgaver', nameSv: 'Subtraktionsövningsblad', nameNo: 'Subtraksjonsoppgaver', nameFi: 'Vähennyslaskutehtävät',
    categoryEn: 'Math', categoryDe: 'Mathematik', categoryFr: 'Maths', categoryEs: 'Matemáticas', categoryIt: 'Matematica', categoryPt: 'Matemática', categoryNl: 'Rekenen', categoryDa: 'Matematik', categorySv: 'Matematik', categoryNo: 'Matte', categoryFi: 'Matematiikka',
    imageSrc: '/samples/english/subtraction/subtraction portrait.jpeg', pdfUrl: '/samples/english/subtraction/subtraction portrait.pdf', productPageSlug: 'subtraction-worksheets',
  },
  {
    id: '28',
    nameEn: 'Sudoku Puzzles', nameDe: 'Sudoku-Rätsel', nameFr: 'Grilles de Sudoku', nameEs: 'Sudoku', nameIt: 'Sudoku', namePt: 'Sudoku', nameNl: 'Sudoku-puzzels', nameDa: 'Sudoku', nameSv: 'Sudoku', nameNo: 'Sudoku', nameFi: 'Sudoku-tehtävät',
    categoryEn: 'Logic', categoryDe: 'Logik', categoryFr: 'Logique', categoryEs: 'Lógica', categoryIt: 'Logica', categoryPt: 'Lógica', categoryNl: 'Logica', categoryDa: 'Logik', categorySv: 'Logik', categoryNo: 'Logikk', categoryFi: 'Logiikka',
    imageSrc: '/samples/english/sudoku/sudoku hard.jpeg', pdfUrl: '/samples/english/sudoku/sudoku hard.pdf', productPageSlug: 'sudoku-worksheets',
  },
  {
    id: '29',
    nameEn: 'Treasure Hunt', nameDe: 'Schatzsuche', nameFr: 'Chasse au Trésor', nameEs: 'Búsqueda del Tesoro', nameIt: 'Caccia al Tesoro', namePt: 'Caça ao Tesouro', nameNl: 'Schattenjacht', nameDa: 'Skattejagt', nameSv: 'Skattjakt', nameNo: 'Skattejakt', nameFi: 'Aarteenetsintä',
    categoryEn: 'Visual', categoryDe: 'Visuell', categoryFr: 'Visuel', categoryEs: 'Visual', categoryIt: 'Visivo', categoryPt: 'Visual', categoryNl: 'Visueel', categoryDa: 'Visuel', categorySv: 'Visuellt', categoryNo: 'Visuelt', categoryFi: 'Visuaalinen',
    imageSrc: '/samples/english/treasure hunt/north south.jpeg', pdfUrl: '/samples/english/treasure hunt/north south.pdf', productPageSlug: 'treasure-hunt-worksheets',
  },
  {
    id: '30',
    nameEn: 'Word Guess', nameDe: 'Wörter-Rätsel', nameFr: 'Devine le Mot', nameEs: 'Adivina la Palabra', nameIt: 'Indovina la Parola', namePt: 'Adivinha a Palavra', nameNl: 'Raad het Woord', nameDa: 'Gæt Ordet', nameSv: 'Gissa Ordet', nameNo: 'Gjett Ordet', nameFi: 'Arvaa Sana',
    categoryEn: 'Language', categoryDe: 'Sprache', categoryFr: 'Langue', categoryEs: 'Lenguaje', categoryIt: 'Linguaggio', categoryPt: 'Linguagem', categoryNl: 'Taal', categoryDa: 'Sprog', categorySv: 'Språk', categoryNo: 'Språk', categoryFi: 'Kieli',
    imageSrc: '/samples/english/word guess/clue-grid_worksheet.jpeg', pdfUrl: '/samples/english/word guess/clue-grid_worksheet.pdf', productPageSlug: 'word-guess-worksheets',
  },
  {
    id: '31',
    nameEn: 'Word Scramble', nameDe: 'Buchstabensalat', nameFr: 'Mots Mêlés', nameEs: 'Palabras Revueltas', nameIt: 'Lettere Mescolate', namePt: 'Letras Embaralhadas', nameNl: 'Letterzaak', nameDa: 'Bogstavrod', nameSv: 'Ordmix', nameNo: 'Bokstavblanding', nameFi: 'Kirjainsekoitus',
    categoryEn: 'Language', categoryDe: 'Sprache', categoryFr: 'Langue', categoryEs: 'Lenguaje', categoryIt: 'Linguaggio', categoryPt: 'Linguagem', categoryNl: 'Taal', categoryDa: 'Sprog', categorySv: 'Språk', categoryNo: 'Språk', categoryFi: 'Kieli',
    imageSrc: '/samples/english/word scramble/custom word list.jpeg', pdfUrl: '/samples/english/word scramble/custom word list.pdf', productPageSlug: 'word-scramble-worksheets',
  },
  {
    id: '32',
    nameEn: 'Word Search', nameDe: 'Wortsuche', nameFr: 'Mots mêlés', nameEs: 'Sopa de letras', nameIt: 'Cerca parole', namePt: 'Caça-palavras', nameNl: 'Woordzoeker', nameDa: 'Find ord', nameSv: 'Ordsök', nameNo: 'Finn ord', nameFi: 'Sananetsintä',
    categoryEn: 'Language', categoryDe: 'Sprache', categoryFr: 'Langue', categoryEs: 'Lenguaje', categoryIt: 'Linguaggio', categoryPt: 'Linguagem', categoryNl: 'Taal', categoryDa: 'Sprog', categorySv: 'Språk', categoryNo: 'Språk', categoryFi: 'Kieli',
    imageSrc: '/samples/english/wordsearch/wordsearch landscape.jpeg', pdfUrl: '/samples/english/wordsearch/wordsearch landscape.pdf', productPageSlug: 'word-search-worksheets',
  },
  {
    id: '33',
    nameEn: 'Writing Practice', nameDe: 'Schreibübungen', nameFr: 'Écriture', nameEs: 'Escritura', nameIt: 'Scrittura', namePt: 'Escrita', nameNl: 'Schrijfoefeningen', nameDa: 'Skriveøvelser', nameSv: 'Skrivövningar', nameNo: 'Skriveøvelser', nameFi: 'Kirjoitusharjoitukset',
    categoryEn: 'Language', categoryDe: 'Sprache', categoryFr: 'Langue', categoryEs: 'Lenguaje', categoryIt: 'Linguaggio', categoryPt: 'Linguagem', categoryNl: 'Taal', categoryDa: 'Sprog', categorySv: 'Språk', categoryNo: 'Språk', categoryFi: 'Kieli',
    imageSrc: '/samples/english/writing/writing portrait.jpeg', pdfUrl: '/samples/english/writing/writing portrait.pdf', productPageSlug: 'writing-worksheets',
  },
];

const categoryColorsEn: Record<string, string> = {
  Math: 'from-cyan-500 to-blue-500',
  Language: 'from-purple-500 to-pink-500',
  Visual: 'from-amber-500 to-orange-500',
  Creative: 'from-green-500 to-emerald-500',
  Logic: 'from-rose-500 to-red-500',
};

const categoryColorsDe: Record<string, string> = {
  Mathematik: 'from-cyan-500 to-blue-500',
  Sprache: 'from-purple-500 to-pink-500',
  Visuell: 'from-amber-500 to-orange-500',
  Kreativ: 'from-green-500 to-emerald-500',
  Logik: 'from-rose-500 to-red-500',
};

const categoryColorsFr: Record<string, string> = {
  Maths: 'from-cyan-500 to-blue-500',
  Langue: 'from-purple-500 to-pink-500',
  Visuel: 'from-amber-500 to-orange-500',
  Créatif: 'from-green-500 to-emerald-500',
  Logique: 'from-rose-500 to-red-500',
};

const categoryColorsEs: Record<string, string> = {
  Matemáticas: 'from-cyan-500 to-blue-500',
  Lenguaje: 'from-purple-500 to-pink-500',
  Visual: 'from-amber-500 to-orange-500',
  Creativo: 'from-green-500 to-emerald-500',
  Lógica: 'from-rose-500 to-red-500',
};

const categoryColorsIt: Record<string, string> = {
  Matematica: 'from-cyan-500 to-blue-500',
  Linguaggio: 'from-purple-500 to-pink-500',
  Visivo: 'from-amber-500 to-orange-500',
  Creativo: 'from-green-500 to-emerald-500',
  Logica: 'from-rose-500 to-red-500',
};

const categoryColorsPt: Record<string, string> = {
  Matemática: 'from-cyan-500 to-blue-500',
  Linguagem: 'from-purple-500 to-pink-500',
  Visual: 'from-amber-500 to-orange-500',
  Criativo: 'from-green-500 to-emerald-500',
  Lógica: 'from-rose-500 to-red-500',
};

const categoryColorsNl: Record<string, string> = {
  Rekenen: 'from-cyan-500 to-blue-500',
  Taal: 'from-purple-500 to-pink-500',
  Visueel: 'from-amber-500 to-orange-500',
  Creatief: 'from-green-500 to-emerald-500',
  Logica: 'from-rose-500 to-red-500',
};

const categoryColorsDa: Record<string, string> = {
  Matematik: 'from-cyan-500 to-blue-500',
  Sprog: 'from-purple-500 to-pink-500',
  Visuel: 'from-amber-500 to-orange-500',
  Kreativ: 'from-green-500 to-emerald-500',
  Logik: 'from-rose-500 to-red-500',
};

const categoryColorsSv: Record<string, string> = {
  Matematik: 'from-cyan-500 to-blue-500',
  Språk: 'from-purple-500 to-pink-500',
  Visuellt: 'from-amber-500 to-orange-500',
  Kreativt: 'from-green-500 to-emerald-500',
  Logik: 'from-rose-500 to-red-500',
};

const categoryColorsNo: Record<string, string> = {
  Matte: 'from-cyan-500 to-blue-500',
  Språk: 'from-purple-500 to-pink-500',
  Visuelt: 'from-amber-500 to-orange-500',
  Kreativt: 'from-green-500 to-emerald-500',
  Logikk: 'from-rose-500 to-red-500',
};

const categoryColorsFi: Record<string, string> = {
  Matematiikka: 'from-cyan-500 to-blue-500',
  Kieli: 'from-purple-500 to-pink-500',
  Visuaalinen: 'from-amber-500 to-orange-500',
  Luova: 'from-green-500 to-emerald-500',
  Logiikka: 'from-rose-500 to-red-500',
};

export default function SampleGallery({ locale, dynamicImages = {}, seoData = {} }: SampleGalleryProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  // dynamicImages and seoData are now passed as props from server-side (page.tsx)
  // This ensures the correct image paths are baked into ISR HTML immediately

  // Get content for current locale, fallback to English
  const content = localeContent[locale] || localeContent.en;
  const getCategoryColors = () => {
    if (locale === 'fi') return categoryColorsFi;
    if (locale === 'no') return categoryColorsNo;
    if (locale === 'sv') return categoryColorsSv;
    if (locale === 'da') return categoryColorsDa;
    if (locale === 'nl') return categoryColorsNl;
    if (locale === 'pt') return categoryColorsPt;
    if (locale === 'it') return categoryColorsIt;
    if (locale === 'es') return categoryColorsEs;
    if (locale === 'fr') return categoryColorsFr;
    if (locale === 'de') return categoryColorsDe;
    return categoryColorsEn;
  };
  const categoryColors = getCategoryColors();

  // Helper to get localized name/category
  const getSampleName = (sample: Sample) => {
    if (locale === 'fi') return sample.nameFi;
    if (locale === 'no') return sample.nameNo;
    if (locale === 'sv') return sample.nameSv;
    if (locale === 'da') return sample.nameDa;
    if (locale === 'nl') return sample.nameNl;
    if (locale === 'pt') return sample.namePt;
    if (locale === 'it') return sample.nameIt;
    if (locale === 'es') return sample.nameEs;
    if (locale === 'fr') return sample.nameFr;
    if (locale === 'de') return sample.nameDe;
    return sample.nameEn;
  };
  const getSampleCategory = (sample: Sample) => {
    if (locale === 'fi') return sample.categoryFi;
    if (locale === 'no') return sample.categoryNo;
    if (locale === 'sv') return sample.categorySv;
    if (locale === 'da') return sample.categoryDa;
    if (locale === 'nl') return sample.categoryNl;
    if (locale === 'pt') return sample.categoryPt;
    if (locale === 'it') return sample.categoryIt;
    if (locale === 'es') return sample.categoryEs;
    if (locale === 'fr') return sample.categoryFr;
    if (locale === 'de') return sample.categoryDe;
    return sample.categoryEn;
  };

  // Get localized product page slug (C1: eliminates 330 unnecessary 301 redirects)
  const getLocalizedProductSlug = (englishSlug: string): string => {
    const config = getAppConfigBySlug(englishSlug);
    if (config) {
      return getSlugForLocale(config.appId, locale as SupportedLocale) || englishSlug;
    }
    return englishSlug;
  };

  // Get image for the sample - prioritize dynamic homepage thumbnails from content manager
  const getSampleImage = (sample: Sample) => {
    // getAppSlug returns hyphenated ID (e.g., 'alphabet-train')
    const appSlug = getAppSlug(sample.productPageSlug);

    // Priority 1: Dynamic homepage thumbnail (from content manager)
    // Key is hyphenated appId, matches homepage filename convention
    if (dynamicImages[appSlug]) {
      return dynamicImages[appSlug];
    }

    // Priority 2: Locale-specific hardcoded path (existing fallback)
    // These use SPACE-separated folder names (e.g., '/samples/german/alphabet train/...')
    if (locale !== 'en' && localeImages[locale]?.[sample.id]) {
      return localeImages[locale][sample.id];
    }

    // Priority 3: Default English path from sample.imageSrc
    return sample.imageSrc;
  };

  // Get PDF for the sample - prioritize dynamic homepage PDFs from content manager
  const getSamplePdf = (sample: Sample) => {
    const appSlug = getAppSlug(sample.productPageSlug);

    // Priority 1: If thumbnail uploaded, use matching homepage PDF
    // PDFs are uploaded alongside thumbnails at: /samples/{language}/homepage/{appSlug}-sample.pdf
    if (dynamicImages[appSlug]) {
      const language = localeToLanguage[locale] || 'english';
      return `/samples/${language}/homepage/${appSlug}-sample.pdf`;
    }

    // Priority 2: Locale-specific hardcoded path (legacy fallback)
    if (locale !== 'en' && localePdfs[locale]?.[sample.id]) {
      return localePdfs[locale][sample.id];
    }

    // Priority 3: Default English path from sample.pdfUrl
    return sample.pdfUrl;
  };

  const handleDownload = async (sample: Sample) => {
    setDownloadingId(sample.id);

    // Create download link - use locale-specific PDF
    const link = document.createElement('a');
    link.href = getSamplePdf(sample);
    const sampleName = getSampleName(sample);
    link.download = `${sampleName.replace(/\s+/g, '-').toLowerCase()}-sample.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Reset after animation
    setTimeout(() => setDownloadingId(null), 1500);
  };

  return (
    <section
      id="samples-gallery"
      className="relative py-24 overflow-hidden"
      style={{
        background: `linear-gradient(180deg,
          #051020 0%,
          #0a1628 30%,
          #0f1f3a 70%,
          #0a1628 100%
        )`,
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
            top: '-10%',
            left: '-10%',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
            bottom: '10%',
            right: '-5%',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className="text-center mb-16 animate-[fadeInUp_0.6s_ease-out_both]"
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 animate-[fadeIn_0.6s_ease-out_0.2s_both]"
            style={{
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.2)',
            }}
          >
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="text-sm font-medium text-emerald-400">{content.badge}</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            {content.title}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {content.subtitle}
          </p>

          {/* Stats */}
          <div
            className="flex justify-center gap-8 mt-8 animate-[fadeInUp_0.6s_ease-out_0.4s_both]"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{content.statSamples}</div>
              <div className="text-sm text-white/40">{content.statSamplesLabel}</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{content.statQuality}</div>
              <div className="text-sm text-white/40">{content.statQualityLabel}</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{content.statFormat}</div>
              <div className="text-sm text-white/40">{content.statFormatLabel}</div>
            </div>
          </div>
        </div>

        {/* Samples grid - only show samples with uploaded homepage thumbnails */}
        {/* Filter to prevent 404 errors from non-existent fallback image paths */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {samples
            .filter(sample => dynamicImages[getAppSlug(sample.productPageSlug)] !== undefined)
            .map((sample, index) => (
            <div
              key={sample.id}
              className="group relative animate-[fadeInUp_0.5s_ease-out_both]"
              style={{ animationDelay: `${index * 0.02}s` }}
              onMouseEnter={() => setHoveredId(sample.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className="relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Category badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium text-white bg-gradient-to-r ${categoryColors[getSampleCategory(sample)] || 'from-gray-500 to-gray-600'}`}
                  >
                    {getSampleCategory(sample)}
                  </span>
                </div>

                {/* Image container */}
                <div className="relative aspect-[3/4] bg-white overflow-hidden">
                  <Image
                    src={getSampleImage(sample)}
                    alt={seoData[getAppSlug(sample.productPageSlug)]?.altText || getSampleName(sample)}
                    title={seoData[getAppSlug(sample.productPageSlug)]?.title || undefined}
                    fill
                    loading={index < 5 ? 'eager' : 'lazy'}
                    {...(index < 5 ? { fetchPriority: 'high' as const } : {})}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />

                  {/* Hover overlay */}
                  <AnimatePresence>
                    {hoveredId === sample.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-4"
                      >
                        <motion.button
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          onClick={() => handleDownload(sample)}
                          disabled={downloadingId === sample.id}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-70"
                          style={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {downloadingId === sample.id ? (
                            <>
                              <motion.svg
                                className="w-4 h-4"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </motion.svg>
                              {content.downloading}
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              {content.downloadPdf}
                            </>
                          )}
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card footer */}
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-white truncate mb-2">
                    {getSampleName(sample)}
                  </h3>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/${locale}/apps/${getLocalizedProductSlug(sample.productPageSlug)}`}
                      className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      {content.viewDetails}
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <a
                      href={getSamplePdf(sample)}
                      className="inline-flex items-center gap-1 text-xs text-emerald-400/70 hover:text-emerald-300 transition-colors"
                      aria-label={`${content.downloadPdf} - ${getSampleName(sample)}`}
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="text-center mt-12 animate-[fadeInUp_0.6s_ease-out_0.3s_both]"
        >
          <Link
            href={`/${locale}/apps`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/5 hover:border-white/30 transition-all duration-200"
          >
            {content.viewAllGenerators}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* CSS Keyframes for SSR-visible animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
