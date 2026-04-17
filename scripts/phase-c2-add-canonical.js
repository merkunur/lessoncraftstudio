#!/usr/bin/env node
// Phase C.2 — add 2 missing canonical commercial FAQs to the shared pool
// in all 11 locales.
//
// Canonical (from brief):
//   6. Are there any per-sale royalties or ongoing fees?
//   7. Can I use worksheets I made under the free trial after I purchase
//      a license?

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const SHARED = path.resolve(__dirname, '..', 'frontend', 'config', 'app-content', 'shared-commercial-faqs.ts');

// Per-locale new entries. Translations by Claude based on existing style in file.
const NEW_ENTRIES = {
  en: [
    {
      question: 'Are there any per-sale royalties or ongoing fees?',
      answer: 'No. The license is a one-time $49 payment with no royalties, no monthly fees, and no per-sale deductions. Once you purchase, you own unlimited commercial rights — generate and sell as many worksheets as you want, forever, without paying anything further.',
    },
    {
      question: 'Can I use worksheets I made under the free trial after I purchase a license?',
      answer: 'Yes. Any worksheets you created during the free trial — watermark and all — can be regenerated without the watermark once your license is active. Your commercial license applies retroactively, so evaluation work is never wasted.',
    },
  ],
  de: [
    {
      question: 'Fallen Verkaufs-Tantiemen oder laufende Gebühren an?',
      answer: 'Nein. Die Lizenz ist eine einmalige Zahlung von 49 $ — keine Tantiemen, keine monatlichen Gebühren, keine Abzüge pro Verkauf. Sobald Sie gekauft haben, besitzen Sie unbegrenzte kommerzielle Rechte — erstellen und verkaufen Sie so viele Arbeitsblätter, wie Sie möchten, ohne jemals etwas Weiteres zu zahlen.',
    },
    {
      question: 'Kann ich Arbeitsblätter nutzen, die ich in der kostenlosen Testversion erstellt habe, nachdem ich eine Lizenz gekauft habe?',
      answer: 'Ja. Alle Arbeitsblätter, die Sie während der kostenlosen Testversion erstellt haben — inklusive Wasserzeichen — können nach Aktivierung Ihrer Lizenz ohne Wasserzeichen neu generiert werden. Ihre kommerzielle Lizenz gilt rückwirkend, sodass Evaluierungsarbeit nie verschwendet ist.',
    },
  ],
  fr: [
    {
      question: 'Y a-t-il des redevances par vente ou des frais récurrents ?',
      answer: 'Non. La licence est un paiement unique de 49 $ sans redevances, sans frais mensuels et sans déduction par vente. Une fois l\'achat effectué, vous possédez des droits commerciaux illimités — créez et vendez autant de fiches que vous le souhaitez, pour toujours, sans rien payer de plus.',
    },
    {
      question: 'Puis-je utiliser les fiches que j\'ai créées pendant l\'essai gratuit après avoir acheté une licence ?',
      answer: 'Oui. Toutes les fiches que vous avez créées pendant l\'essai gratuit — filigrane inclus — peuvent être régénérées sans filigrane une fois votre licence activée. Votre licence commerciale s\'applique rétroactivement, de sorte que le travail d\'évaluation n\'est jamais perdu.',
    },
  ],
  es: [
    {
      question: '¿Hay regalías por venta o tarifas recurrentes?',
      answer: 'No. La licencia es un pago único de 49 $ sin regalías, sin tarifas mensuales y sin deducciones por venta. Una vez comprada, posee derechos comerciales ilimitados: cree y venda todas las fichas que desee, para siempre, sin pagar nada más.',
    },
    {
      question: '¿Puedo usar las fichas que hice con la prueba gratuita después de comprar una licencia?',
      answer: 'Sí. Cualquier ficha que haya creado durante la prueba gratuita — marca de agua incluida — puede regenerarse sin la marca de agua una vez que su licencia esté activa. Su licencia comercial se aplica retroactivamente, por lo que el trabajo de evaluación nunca se desperdicia.',
    },
  ],
  it: [
    {
      question: 'Ci sono royalty per vendita o costi ricorrenti?',
      answer: 'No. La licenza è un pagamento unico di 49 $ senza royalty, senza costi mensili e senza trattenute sulle vendite. Una volta acquistata, possiedi diritti commerciali illimitati — crea e vendi tutte le schede che vuoi, per sempre, senza pagare altro.',
    },
    {
      question: 'Posso usare le schede create nella versione di prova dopo aver acquistato una licenza?',
      answer: 'Sì. Qualsiasi scheda creata durante la versione di prova — filigrana inclusa — può essere rigenerata senza filigrana una volta attivata la licenza. La tua licenza commerciale si applica retroattivamente, quindi il lavoro di valutazione non va mai perso.',
    },
  ],
  pt: [
    {
      question: 'Há royalties por venda ou taxas contínuas?',
      answer: 'Não. A licença é um pagamento único de US$ 49 sem royalties, sem mensalidades e sem deduções por venda. Após a compra, você possui direitos comerciais ilimitados — crie e venda quantas atividades quiser, para sempre, sem pagar mais nada.',
    },
    {
      question: 'Posso usar atividades que criei na versão de teste depois de comprar uma licença?',
      answer: 'Sim. Qualquer atividade que você criou durante o teste gratuito — com a marca d\'água — pode ser regenerada sem a marca d\'água assim que sua licença estiver ativa. Sua licença comercial se aplica retroativamente, portanto o trabalho de avaliação nunca é desperdiçado.',
    },
  ],
  nl: [
    {
      question: 'Zijn er royalty\'s per verkoop of doorlopende kosten?',
      answer: 'Nee. De licentie is een eenmalige betaling van $ 49 zonder royalty\'s, zonder maandelijkse kosten en zonder inhouding per verkoop. Zodra u koopt, heeft u onbeperkte commerciële rechten — genereer en verkoop zoveel werkbladen als u wilt, voor altijd, zonder iets extra te betalen.',
    },
    {
      question: 'Mag ik werkbladen die ik met de gratis proefversie heb gemaakt gebruiken nadat ik een licentie heb gekocht?',
      answer: 'Ja. Alle werkbladen die u tijdens de gratis proefversie heeft gemaakt — inclusief watermerk — kunnen zonder watermerk opnieuw worden gegenereerd zodra uw licentie actief is. Uw commerciële licentie werkt met terugwerkende kracht, zodat evaluatiewerk nooit verloren gaat.',
    },
  ],
  sv: [
    {
      question: 'Finns det försäljningsavgifter eller löpande kostnader?',
      answer: 'Nej. Licensen är en engångsbetalning på 49 $ utan royalties, utan månadsavgifter och utan avdrag per försäljning. När du köpt har du obegränsade kommersiella rättigheter — skapa och sälj så många arbetsblad du vill, för alltid, utan att betala något mer.',
    },
    {
      question: 'Får jag använda arbetsblad jag skapade med gratisversionen efter att jag köpt en licens?',
      answer: 'Ja. Alla arbetsblad du skapade under gratisversionen — med vattenstämpel — kan genereras på nytt utan vattenstämpel när din licens är aktiv. Din kommersiella licens gäller retroaktivt, så utvärderingsarbete går aldrig förlorat.',
    },
  ],
  da: [
    {
      question: 'Er der royalties pr. salg eller løbende gebyrer?',
      answer: 'Nej. Licensen er en engangsbetaling på 49 $ uden royalties, uden månedlige gebyrer og uden fradrag pr. salg. Når du har købt, ejer du ubegrænsede kommercielle rettigheder — opret og sælg så mange arbejdsark, du vil, for altid, uden at betale mere.',
    },
    {
      question: 'Må jeg bruge arbejdsark, jeg oprettede med den gratis prøveversion, efter jeg har købt en licens?',
      answer: 'Ja. Alle arbejdsark, du oprettede under den gratis prøveversion — med vandmærke — kan genskabes uden vandmærke, når din licens er aktiv. Din kommercielle licens gælder med tilbagevirkende kraft, så evalueringsarbejde går aldrig tabt.',
    },
  ],
  no: [
    {
      question: 'Finnes det royalties per salg eller løpende kostnader?',
      answer: 'Nei. Lisensen er en engangsbetaling på 49 $ uten royalties, uten månedlige avgifter og uten fradrag per salg. Når du har kjøpt, eier du ubegrensede kommersielle rettigheter — lag og selg så mange arbeidsark du vil, for alltid, uten å betale mer.',
    },
    {
      question: 'Kan jeg bruke arbeidsark jeg lagde under gratisversjonen etter å ha kjøpt en lisens?',
      answer: 'Ja. Alle arbeidsark du lagde under gratisversjonen — med vannmerke — kan genereres på nytt uten vannmerke når lisensen din er aktiv. Den kommersielle lisensen din gjelder med tilbakevirkende kraft, så evalueringsarbeid går aldri tapt.',
    },
  ],
  fi: [
    {
      question: 'Onko myyntikohtaisia rojalteja tai jatkuvia maksuja?',
      answer: 'Ei. Lisenssi on 49 dollarin kertamaksu ilman rojalteja, ilman kuukausimaksuja ja ilman myyntikohtaisia vähennyksiä. Ostettuasi omistat rajoittamattomat kaupalliset oikeudet — luo ja myy niin monta työarkkia kuin haluat, ikuisesti, maksamatta enää mitään.',
    },
    {
      question: 'Voinko käyttää ilmaisjaksolla tekemiäni työarkkeja lisenssin ostamisen jälkeen?',
      answer: 'Kyllä. Kaikki ilmaisjakson aikana luomasi työarkit — vesileimoineen — voidaan luoda uudelleen ilman vesileimaa, kun lisenssisi on aktivoitu. Kaupallinen lisenssisi pätee takautuvasti, joten arviointijakson työ ei koskaan mene hukkaan.',
    },
  ],
};

const LOCALES = Object.keys(NEW_ENTRIES);

// Detect EOL
let text = fs.readFileSync(SHARED, 'utf8');
const eol = text.includes('\r\n') ? '\r\n' : '\n';

// For each locale, find the closing `],` of its block and insert 2 new entries before it.
// Strategy: find `<locale>: [`, walk the bracket match, replace the last `  ]` with new entries + `  ]`.

function insertForLocale(text, locale, entries) {
  const re = new RegExp('\\b' + locale + '\\s*:\\s*\\[');
  const m = re.exec(text);
  if (!m) return { text, inserted: 0 };
  const start = m.index + m[0].length;
  let depth = 1;
  let inStr = null;
  let i = start;
  for (; i < text.length; i++) {
    const ch = text[i];
    if (inStr) {
      if (ch === '\\') { i++; continue; }
      if (ch === inStr) { inStr = null; continue; }
    } else {
      if (ch === "'" || ch === '"' || ch === '`') { inStr = ch; continue; }
      if (ch === '[') depth++;
      else if (ch === ']') { depth--; if (depth === 0) break; }
    }
  }
  // i now points to the `]` closing the locale array.
  // Find the whitespace/indent before `]` on that line.
  let closeLineStart = i;
  while (closeLineStart > 0 && text[closeLineStart - 1] !== '\n') closeLineStart--;
  const closeIndent = text.slice(closeLineStart, i); // whitespace before ]

  // Determine entry indent: use existing first entry's indent (4 spaces inside 2-space array).
  // Just use closeIndent + '  ' or hardcoded 4 spaces.
  const entryIndent = closeIndent + '  ';

  const block = [];
  for (const e of entries) {
    // Escape single quotes in both question and answer.
    const qEsc = e.question.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const aEsc = e.answer.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    block.push(
      `${entryIndent}{${eol}` +
      `${entryIndent}  question: '${qEsc}',${eol}` +
      `${entryIndent}  answer:${eol}` +
      `${entryIndent}    '${aEsc}',${eol}` +
      `${entryIndent}},`
    );
  }
  const insertion = block.join(eol) + eol + closeIndent;
  // Insert right before the `]`
  const newText = text.slice(0, closeLineStart) + insertion + text.slice(i);
  return { text: newText, inserted: entries.length };
}

let totalInserted = 0;
for (const locale of LOCALES) {
  const entries = NEW_ENTRIES[locale];
  const result = insertForLocale(text, locale, entries);
  text = result.text;
  totalInserted += result.inserted;
  console.log(`${locale}: inserted ${result.inserted} entries`);
}

if (!DRY_RUN) fs.writeFileSync(SHARED, text, 'utf8');
console.log(`\nTotal inserted: ${totalInserted}`);
if (DRY_RUN) console.log('[DRY RUN] No file written.');
