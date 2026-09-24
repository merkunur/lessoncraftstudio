---
name: Unicode escape sequences cause mass file corruption
description: Claude's Write tool turns \uXXXX into literal 6-char strings, corrupting all content files — 11,311 escapes fixed across 200+ files in March 2026
type: feedback
---

## Problem

On 2026-03-12, the user had to fix **11,311 `\uXXXX` escape sequences** across **200+ files** (EN content, FR content, config files). Claude kept writing `\u2014` instead of `—`, `\u2019` instead of `'`, `\u00d7` instead of `×`, etc.

The Write tool does NOT interpret `\uXXXX` as Unicode — it writes the literal 6 characters `\u2014` into the file. This affects ALL languages, not just non-English. English files had thousands of broken em dashes, curly quotes, and special characters.

## Root Cause

Claude's default behavior is to use `\uXXXX` escape sequences for non-ASCII characters in string content. The Write tool does not process these as Unicode escapes — it writes them literally. Previous memory said "NON-ENGLISH content files" which was wrong and too narrow — the problem affects every file in every language.

## Rule (ZERO TOLERANCE)

- **NEVER** write `\uXXXX` escape sequences in ANY file, ANY language
- **ALWAYS** write real characters: `—` `'` `'` `"` `"` `×` `ä` `ö` `ü` `é` `ñ` `ç` etc.
- **ALWAYS** spot-check created files with Read tool to verify no escapes
- If escapes slip in: `node scripts/fix-unicode-escapes.js`

## Severity

HIGH — This caused hours of cleanup work and affected production content across the entire site.
