#!/bin/bash
for cat in teaching-resources worksheet-tips educational-activities learning-strategies curriculum-guides parent-resources seasonal-content; do
  for locale in en de fr fi; do
    code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000/${locale}/blog/category/${cat}")
    echo "${locale}/${cat}: ${code}"
  done
done
