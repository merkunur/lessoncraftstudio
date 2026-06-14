/**
 * 301 redirect map for the worksheet-maker SEO rescue (Part 1).
 *
 * The pre-pivot site had TWO ranked surfaces per generator: the `/apps/<x>-worksheets`
 * product page AND the `/tools/<x>-maker` tool page (GSC ground-truth 2026-06-14).
 * We rebuild the canonical maker landing at its ORIGINAL `/tools/<x>-maker` URL
 * (auto-recovered by un-410ing it), and 301 the secondary `/apps/<x>-worksheets`
 * URL into it — folding both pages' ranking equity into one and killing the
 * self-competition. Replaces the wholesale 410 that discarded that equity.
 *
 * Keys/values are locale-prefixed pathnames WITHOUT trailing slash. The
 * middleware strips a trailing slash before lookup. Edge-runtime safe (plain
 * object, no deps). Source slugs recovered from product-page-slugs.ts @49b501b0^;
 * the de `buchstabensalat-arbeitsblaetter` source is an OLDER slug Google still
 * indexes (2,420 impr) that the recovered config no longer lists — added explicitly.
 */
export const MAKER_APPS_REDIRECTS: Record<string, string> = {
  // cryptogram → /tools/<maker>
  '/en/apps/cryptogram-worksheets': '/en/tools/cryptogram-maker',
  '/de/apps/bildkryptogramm-arbeitsblaetter': '/de/tools/kryptogramm-ersteller',
  '/es/apps/criptogramas-imagenes-fichas': '/es/tools/generador-criptogramas',
  '/it/apps/crittogramma-schede': '/it/tools/generatore-crittogrammi',
  '/nl/apps/cryptogram-werkbladen': '/nl/tools/cryptogram-maker',
  '/sv/apps/bildkryptogram-arbetsblad': '/sv/tools/kryptogram-skapare',

  // wordsearch → /tools/<maker>
  '/en/apps/word-search-worksheets': '/en/tools/word-search-maker',
  '/de/apps/wortsuche-arbeitsblaetter': '/de/tools/wortsuche-ersteller',
  '/de/apps/buchstabensalat-arbeitsblaetter': '/de/tools/wortsuche-ersteller',
  '/es/apps/sopa-letras-fichas': '/es/tools/generador-sopa-letras',
  '/it/apps/cerca-parole-schede': '/it/tools/generatore-cerca-parole',
  '/nl/apps/woordzoeker-werkbladen': '/nl/tools/woordzoeker-maker',
  '/sv/apps/ordletar-arbetsblad': '/sv/tools/ordsoek-skapare',

  // sudoku → /tools/<maker>
  '/en/apps/sudoku-worksheets': '/en/tools/sudoku-maker',
  '/de/apps/kinder-sudoku-arbeitsblaetter': '/de/tools/kinder-sudoku-ersteller',
  '/es/apps/sudoku-fichas-ninos': '/es/tools/generador-sudoku-infantil',
  '/it/apps/sudoku-bambini-schede': '/it/tools/generatore-sudoku-bambini',
  '/nl/apps/sudoku-werkbladen': '/nl/tools/kinder-sudoku-maker',
  '/sv/apps/bildsudoku-arbetsblad': '/sv/tools/barn-sudoku-skapare',

  // crossword → /tools/<maker>
  '/en/apps/crossword-worksheets': '/en/tools/crossword-maker',
  '/de/apps/bilderkreuzwortraetsel-arbeitsblaetter': '/de/tools/bilderkreuzwortraetsel-ersteller',
  '/es/apps/crucigramas-imagenes-fichas': '/es/tools/generador-crucigramas-imagenes',
  '/it/apps/cruciverba-immagini-schede': '/it/tools/generatore-cruciverba-immagini',
  '/nl/apps/kruiswoordpuzzel-werkbladen': '/nl/tools/kruiswoordpuzzel-maker',
  '/sv/apps/bildkorsord-arbetsblad': '/sv/tools/bildkorsord-skapare',

  // find-objects → /tools/<maker>
  '/en/apps/find-objects-worksheets': '/en/tools/hidden-object-maker',
  '/de/apps/suchbilder-arbeitsblaetter': '/de/tools/suchbilder-ersteller',
  '/es/apps/buscar-objetos-fichas': '/es/tools/generador-busca-objetos',
  '/it/apps/trova-oggetti-schede': '/it/tools/generatore-cerca-oggetti',
  '/nl/apps/zoek-voorwerpen-werkbladen': '/nl/tools/zoek-en-vind-maker',
  '/sv/apps/hitta-foremal-arbetsblad': '/sv/tools/hitta-foeremaalen-skapare',

  // word-guess → /tools/<maker>
  '/en/apps/word-guess-worksheets': '/en/tools/word-guess-maker',
  '/de/apps/woerter-raten-arbeitsblaetter': '/de/tools/woerter-raten-ersteller',
  '/es/apps/adivinar-palabras-fichas': '/es/tools/generador-adivinar-palabras',
  '/it/apps/indovina-parole-schede': '/it/tools/generatore-indovina-parole',
  '/nl/apps/woordraadsel-werkbladen': '/nl/tools/woordraadsel-maker',
  '/sv/apps/gissa-ordet-arbetsblad': '/sv/tools/gissa-ordet-skapare',
};
