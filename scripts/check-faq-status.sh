#!/bin/bash
for locale in en de fr es pt it nl sv da no fi; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000/${locale}/faq")
  echo "${locale}/faq: $code"
done
