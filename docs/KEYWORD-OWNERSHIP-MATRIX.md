# Keyword Ownership Matrix

Reference document for keyword targeting across all page types. Prevents cannibalization by defining which page type "owns" which keyword patterns.

## Page Type Hierarchy

| Priority | Page Type | Count (EN) | Keyword Pattern | Example |
|----------|-----------|------------|-----------------|---------|
| 1 | Product | 33 | App-specific keywords | `addition worksheet generator` |
| 2 | Theme+Grade | 250 | Theme + grade intersection | `preschool animal coloring worksheets` |
| 3 | Theme Hub | 50 | Theme-level keywords | `animal printable activities` |
| 4 | Grade Hub | 5 | Generic grade keywords | `free printable preschool worksheets` |
| 5 | Category Hub | 8 | Generic category keywords | `free printable math worksheet generators` |

**Total EN pages audited: 346**

## Keyword Templates by Page Type

### Product Pages (33)
- Primary: `[app-name] worksheet generator`
- Secondary: `free printable [app-name] worksheets`, `[app-name] for kids`
- Owns: The specific app/tool name as a keyword

### Theme+Grade Pages (250)
- Primary: `[grade] [theme] [activity] worksheets`
- Secondary: `[theme] worksheets for [grade]`, `[grade] [theme] activities`
- Owns: The intersection of a specific theme and grade level

### Theme Hub Pages (50)
- Primary: `[theme] printable activities`
- Secondary: `[theme] worksheets for kids`, `free [theme] printables`
- Owns: The theme as a broad topic across all grades

### Grade Hub Pages (5)
- Primary: `free printable [grade] worksheets`
- Secondary: `[grade] worksheets ages [range]`, `[grade] printable activities`
- Owns: The grade level as a broad category across all themes

### Category Hub Pages (8)
- Primary: `free printable [category] worksheet generators`
- Secondary: `[category] worksheets for kids`, `[category] activities printable`
- Owns: The skill category (math, language arts, etc.) across all apps

## Conflict Resolution Rules

1. **Product vs Theme+Grade**: Product page owns the app name; theme+grade page uses theme+grade qualifier
2. **Theme+Grade vs Theme Hub**: Theme+grade page uses grade qualifier; theme hub uses broad theme terms
3. **Theme Hub vs Grade Hub**: Theme hub owns the theme; grade hub owns the grade level
4. **Grade Hub vs Category Hub**: Grade hub targets age/grade; category hub targets skill domain
5. **Category Hub vs Product**: Category hub groups multiple apps; product page targets a single app

## Validation

Run the full-site audit:
```bash
# All locales
node scripts/validate-keyword-ownership.js

# Single locale with JSON export
node scripts/validate-keyword-ownership.js --locale en --json docs/keyword-audit-en.json
```

## Audit Results (Feb 2026)

| Check | Result |
|-------|--------|
| Primary keyword uniqueness | 0 conflicts |
| Near-duplicate keyword sets | 0 pairs above 80% |
| Keyword placement (grade-hub) | 5/5 pass |
| Keyword placement (category-hub) | 8/8 pass |
