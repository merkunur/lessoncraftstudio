#!/bin/bash
for locale in en de fr es pt it nl sv da no fi; do
  count=$(curl -s "http://localhost:3000/${locale}/blog" | grep -oP 'hrefLang="[^"]+"' | wc -l)
  xdef=$(curl -s "http://localhost:3000/${locale}/blog" | grep -c 'x-default')
  echo "$locale: $count hreflang tags, x-default=$xdef"
done
