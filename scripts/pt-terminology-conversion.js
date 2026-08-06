/**
 * Portuguese Terminology Conversion Script
 * Phase 1: Convert PT-PT → PT-BR terminology across content files
 *
 * Usage: node scripts/pt-terminology-conversion.js <directory>
 * Example: node scripts/pt-terminology-conversion.js frontend/config/app-content/pt
 */

const fs = require('fs');
const path = require('path');

const targetDir = process.argv[2];
if (!targetDir) {
  console.error('Usage: node scripts/pt-terminology-conversion.js <directory>');
  process.exit(1);
}

const fullDir = path.resolve(targetDir);
if (!fs.existsSync(fullDir)) {
  console.error(`Directory not found: ${fullDir}`);
  process.exit(1);
}

const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.ts')).sort();
console.log(`\nProcessing ${files.length} files in ${fullDir}\n`);

let totalReplacements = 0;
let totalFiles = 0;

for (const file of files) {
  const filePath = path.join(fullDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  let fileReplacements = 0;

  // ===== 1. FICHAS → ATIVIDADES (case-sensitive, context-aware) =====

  // Plural forms first (before singular to avoid partial matches)
  // "Fichas" (title/start of sentence) → "Atividades"
  content = content.replace(/\bFichas\b/g, (match) => { fileReplacements++; return 'Atividades'; });
  // "fichas" (lowercase) → "atividades"
  content = content.replace(/\bfichas\b/g, (match) => { fileReplacements++; return 'atividades'; });
  // "FICHAS" (all caps) → "ATIVIDADES"
  content = content.replace(/\bFICHAS\b/g, (match) => { fileReplacements++; return 'ATIVIDADES'; });

  // Singular forms
  // "Ficha" (title case) → "Atividade"
  content = content.replace(/\bFicha\b/g, (match) => { fileReplacements++; return 'Atividade'; });
  // "ficha" (lowercase) → "atividade"
  content = content.replace(/\bficha\b/g, (match) => { fileReplacements++; return 'atividade'; });
  // "FICHA" (all caps) → "ATIVIDADE"
  content = content.replace(/\bFICHA\b/g, (match) => { fileReplacements++; return 'ATIVIDADE'; });

  // ===== 2. GUMROAD → HOTMART/KIWIFY (context-dependent) =====

  // Platform field: 'Gumroad (teacherspayteachers.com)' → 'Hotmart (hotmart.com)'
  content = content.replace(
    /platform: 'Gumroad \(teacherspayteachers\.com\)'/g,
    () => { fileReplacements++; return "platform: 'Hotmart (hotmart.com)'"; }
  );

  // Platform field: 'Gumroad / Shopify / Payhip' → 'Kiwify / Hotmart / Eduzz'
  content = content.replace(
    /platform: 'Gumroad \/ Shopify \/ Payhip'/g,
    () => { fileReplacements++; return "platform: 'Kiwify / Hotmart / Eduzz'"; }
  );

  // Title/heading with "para Gumroad" → "para Hotmart"
  content = content.replace(/para Gumroad/g, () => { fileReplacements++; return 'para Hotmart'; });

  // "no Gumroad" → "na Hotmart"
  content = content.replace(/\bno Gumroad\b/g, () => { fileReplacements++; return 'na Hotmart'; });

  // "do Gumroad" → "da Hotmart"
  content = content.replace(/\bdo Gumroad\b/g, () => { fileReplacements++; return 'da Hotmart'; });

  // "dos compradores do Gumroad" → "dos compradores da Hotmart"
  // Already covered by "do Gumroad" → "da Hotmart"

  // In lists: "Etsy, KDP e Gumroad" → "Hotmart, Etsy e KDP"
  content = content.replace(/Etsy, KDP e Gumroad/g, () => { fileReplacements++; return 'Hotmart, Etsy e KDP'; });

  // In lists: "Etsy, Amazon KDP, Gumroad" → "Hotmart, Etsy, Amazon KDP"
  content = content.replace(/Etsy, Amazon KDP, Gumroad/g, () => { fileReplacements++; return 'Hotmart, Etsy, Amazon KDP'; });

  // In lists: "Etsy, Amazon KDP e Gumroad" → "Hotmart, Etsy e Amazon KDP"
  content = content.replace(/Etsy, Amazon KDP e Gumroad/g, () => { fileReplacements++; return 'Hotmart, Etsy e Amazon KDP'; });

  // "na Etsy, KDP e Gumroad" → "na Hotmart, Etsy e KDP"
  content = content.replace(/na Etsy, KDP e Gumroad/g, () => { fileReplacements++; return 'na Hotmart, Etsy e KDP'; });

  // "Etsy, Gumroad" → "Hotmart, Etsy"
  content = content.replace(/Etsy, Gumroad/g, () => { fileReplacements++; return 'Hotmart, Etsy'; });

  // "KDP, Gumroad" → "KDP, Hotmart"
  content = content.replace(/KDP, Gumroad/g, () => { fileReplacements++; return 'KDP, Hotmart'; });

  // "Gumroad ou" → "Hotmart ou"
  content = content.replace(/\bGumroad ou\b/g, () => { fileReplacements++; return 'Hotmart ou'; });

  // "Gumroad e" → "Hotmart e"
  content = content.replace(/\bGumroad e\b/g, () => { fileReplacements++; return 'Hotmart e'; });

  // "recursos educativos no Gumroad" already handled by "no Gumroad" → "na Hotmart"

  // "sua própria loja no Shopify, Gumroad ou Payhip" → "sua própria loja na Hotmart, Kiwify ou Eduzz"
  content = content.replace(
    /sua própria loja no Shopify, Gumroad ou Payhip/g,
    () => { fileReplacements++; return 'sua própria loja na Hotmart, Kiwify ou Eduzz'; }
  );

  // Remaining standalone "Gumroad" → "Hotmart" (catch-all for missed patterns)
  content = content.replace(/\bGumroad\b/g, () => { fileReplacements++; return 'Hotmart'; });

  // ===== 3. PT-PT → PT-BR TERMINOLOGY =====

  // "descarregar" → "baixar" (and variants)
  content = content.replace(/\bdescarregar\b/g, () => { fileReplacements++; return 'baixar'; });
  content = content.replace(/\bDescarregar\b/g, () => { fileReplacements++; return 'Baixar'; });
  content = content.replace(/\bdescarregá-lo\b/g, () => { fileReplacements++; return 'baixá-lo'; });
  content = content.replace(/\bdescarregá-la\b/g, () => { fileReplacements++; return 'baixá-la'; });
  content = content.replace(/\bdescarregue\b/g, () => { fileReplacements++; return 'baixe'; });
  content = content.replace(/\bDescarregue\b/g, () => { fileReplacements++; return 'Baixe'; });

  // "separador" → "aba" (tab/panel)
  content = content.replace(/\bseparador\b/g, () => { fileReplacements++; return 'aba'; });
  content = content.replace(/\bSeparador\b/g, () => { fileReplacements++; return 'Aba'; });

  // "ficheiro" → "arquivo"
  content = content.replace(/\bficheiros\b/g, () => { fileReplacements++; return 'arquivos'; });
  content = content.replace(/\bFicheiros\b/g, () => { fileReplacements++; return 'Arquivos'; });
  content = content.replace(/\bficheiro\b/g, () => { fileReplacements++; return 'arquivo'; });
  content = content.replace(/\bFicheiro\b/g, () => { fileReplacements++; return 'Arquivo'; });

  // "utilizador" → "usuário"
  content = content.replace(/\butilizadores\b/g, () => { fileReplacements++; return 'usuários'; });
  content = content.replace(/\bUtilizadores\b/g, () => { fileReplacements++; return 'Usuários'; });
  content = content.replace(/\butilizador\b/g, () => { fileReplacements++; return 'usuário'; });
  content = content.replace(/\bUtilizador\b/g, () => { fileReplacements++; return 'Usuário'; });

  // "ecrã" → "tela"
  content = content.replace(/\becrã\b/g, () => { fileReplacements++; return 'tela'; });
  content = content.replace(/\bEcrã\b/g, () => { fileReplacements++; return 'Tela'; });

  // "registo" → "cadastro" (but not "registo" within other words)
  content = content.replace(/\bregisto\b/g, () => { fileReplacements++; return 'cadastro'; });
  content = content.replace(/\bRegisto\b/g, () => { fileReplacements++; return 'Cadastro'; });

  // ===== 4. PT-PT GRAMMAR → PT-BR GRAMMAR =====

  // "está a + infinitive" → "está + gerund" (PT-PT → PT-BR)
  // This is complex and needs careful handling
  content = content.replace(/está a fazer/g, () => { fileReplacements++; return 'está fazendo'; });
  content = content.replace(/está a criar/g, () => { fileReplacements++; return 'está criando'; });
  content = content.replace(/está a usar/g, () => { fileReplacements++; return 'está usando'; });
  content = content.replace(/está a vender/g, () => { fileReplacements++; return 'está vendendo'; });
  content = content.replace(/está a trabalhar/g, () => { fileReplacements++; return 'está trabalhando'; });
  content = content.replace(/está a aprender/g, () => { fileReplacements++; return 'está aprendendo'; });
  content = content.replace(/está a procurar/g, () => { fileReplacements++; return 'está procurando'; });
  content = content.replace(/está a construir/g, () => { fileReplacements++; return 'está construindo'; });
  content = content.replace(/está a gerar/g, () => { fileReplacements++; return 'está gerando'; });
  content = content.replace(/está a expandir/g, () => { fileReplacements++; return 'está expandindo'; });
  content = content.replace(/está a começar/g, () => { fileReplacements++; return 'está começando'; });

  // "estão a + infinitive" → "estão + gerund"
  content = content.replace(/estão a fazer/g, () => { fileReplacements++; return 'estão fazendo'; });
  content = content.replace(/estão a criar/g, () => { fileReplacements++; return 'estão criando'; });
  content = content.replace(/estão a usar/g, () => { fileReplacements++; return 'estão usando'; });
  content = content.replace(/estão a vender/g, () => { fileReplacements++; return 'estão vendendo'; });
  content = content.replace(/estão a procurar/g, () => { fileReplacements++; return 'estão procurando'; });

  // ===== 5. OTHER PT-PT → PT-BR SPECIFIC TERMS =====

  // "catálogo de produtos" context: "loja" (when meaning school store/shop from PT-PT context)
  // This is context-dependent and harder to automate - skip for now

  // "aspeto" → "aspecto" (Brazilian spelling)
  content = content.replace(/\baspeto\b/g, () => { fileReplacements++; return 'aspecto'; });
  content = content.replace(/\bAspeto\b/g, () => { fileReplacements++; return 'Aspecto'; });

  // "contacto" → "contato" (Brazilian spelling)
  content = content.replace(/\bcontacto\b/g, () => { fileReplacements++; return 'contato'; });
  content = content.replace(/\bContacto\b/g, () => { fileReplacements++; return 'Contato'; });

  // "facto" → "fato" (Brazilian spelling)
  content = content.replace(/\bfacto\b/g, () => { fileReplacements++; return 'fato'; });
  content = content.replace(/\bFacto\b/g, () => { fileReplacements++; return 'Fato'; });

  // "telemóvel" → "celular"
  content = content.replace(/\btelemóvel\b/g, () => { fileReplacements++; return 'celular'; });
  content = content.replace(/\bTelemóvel\b/g, () => { fileReplacements++; return 'Celular'; });

  // ===== WRITE FILE =====

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalFiles++;
    totalReplacements += fileReplacements;
    console.log(`  ✓ ${file} — ${fileReplacements} replacements`);
  } else {
    console.log(`  - ${file} — no changes needed`);
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Files modified: ${totalFiles}/${files.length}`);
console.log(`Total replacements: ${totalReplacements}`);
console.log(`\nRun 'node scripts/find-broken-quotes.js' to verify no broken strings.`);
