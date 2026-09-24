---
name: Seller Content Rewrite Status
description: Status of the teacher-to-seller content rewrite across all locales and content types, including comparison pages and remaining work
type: project
---

## Seller-Focused Content Rewrite (March 2026)

All content was rewritten from teacher/academic voice to seller/entrepreneur voice targeting Etsy sellers, KDP publishers, and printable business entrepreneurs.

### What was done:
- Eliminated ALL teacher/classroom/student/educator/TPT language across ~1,500 files
- Replaced with seller-focused equivalents: "sellers", "buyers", "Gumroad", "Etsy", "KDP"
- schema-generator.ts: `EducationalOrganization` → `Organization`, `EducationalApplication` → `BusinessApplication`
- Created 3 comparison pages at `/compare/` route (Book Bolt, Canva, roundup)

### Content completion matrix:

| Content Type | EN | DE | FR | ES | PT | IT | NL | SV | DA | NO | FI |
|-------------|----|----|----|----|----|----|----|----|----|----|-----|
| app-content (33) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — |
| tool-content (33) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — |
| guide-content (65) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — |
| bundle-content (6) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — |
| idea-content (45) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — | — |
| start-content (12) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 1/12 | — | — | — |
| compare-content (3) | ✓ | — | — | — | — | — | — | — | — | — | — |

### Remaining work:
- **SV idea-content**: 0/45 files (Swedish has no idea-content yet)
- **SV start-content**: 1/12 files
- **DA**: All 194 content files (Danish — nothing exists yet)
- **NO**: All 194 content files (Norwegian — nothing exists yet)
- **FI**: All 194 content files (Finnish — nothing exists yet)
- **Compare-content translations**: Only EN exists (10 non-EN locales needed × 3 files = 30 files)
- **FR guide-content/email-marketing-printables.ts**: Introduction field has placeholder text (original was corrupted)

### Replacement dictionary used:
| Language | "students" | "teachers" | "classroom" | "TPT" | "child-friendly" |
|----------|-----------|-----------|------------|-------|-----------------|
| EN | solvers/users | sellers/buyers | store/removed | Gumroad | readable/clear |
| DE | Nutzer | Verkäufer | Shop | Gumroad | ansprechend |
| FR | utilisateurs | vendeurs | boutique | Gumroad | attrayant |
| ES | usuarios | vendedores | tienda | Gumroad | legible/claro |
| PT | usuários | vendedores | loja | Gumroad | legível/claro |
| IT | utenti | venditori | negozio | Gumroad | accattivante |
| NL | gebruikers | verkopers | winkel | Gumroad | leesbaar |
| SV | användare | säljare | butik | Gumroad | tydlig |
| DA | brugere | sælgere | butik | Gumroad | læsbar |
| NO | brukere | selgere | butikk | Gumroad | lesbar |
| FI | käyttäjät | myyjät | kauppa | Gumroad | luettava |
