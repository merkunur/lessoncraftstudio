#!/bin/bash
# complete-server-rename.sh
# Completes the partial rename of sample images on the production server.
# Generated from actual server inventory — NO guesses.
#
# Usage:
#   bash /tmp/complete-server-rename.sh --dry-run   # Preview (default)
#   bash /tmp/complete-server-rename.sh --apply      # Execute renames

MODE="${1:---dry-run}"
SAMPLES="/var/www/lcs-media/samples"
LOG="/tmp/rename-$(date +%Y%m%d-%H%M%S).log"
ROLLBACK="/tmp/rename-rollback-$(date +%Y%m%d-%H%M%S).sh"

echo "=== Complete Server Rename ===" | tee "$LOG"
echo "Mode: $MODE" | tee -a "$LOG"

if [ "$MODE" = "--apply" ]; then
  echo "#!/bin/bash" > "$ROLLBACK"
  chmod +x "$ROLLBACK"
fi

OK=0
FAIL=0
SKIP=0

# german/addition/Additionsspa 4.webp → german/addition/additionsspa-4.webp
if [ -f '$SAMPLES/german/addition/Additionsspa 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/german/addition/Additionsspa 4.webp' '$SAMPLES/german/addition' 2>/dev/null || true
    if mv '$SAMPLES/german/addition/Additionsspa 4.webp' '$SAMPLES/german/addition/additionsspa-4.webp'; then
      chattr +i '$SAMPLES/german/addition/additionsspa-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/german/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/german/addition/additionsspa-4.webp' 2>/dev/null || true
      echo "  OK: german/addition/Additionsspa 4.webp -> german/addition/additionsspa-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/german/addition/additionsspa-4.webp' '$SAMPLES/german/addition' 2>/dev/null; mv '$SAMPLES/german/addition/additionsspa-4.webp' '$SAMPLES/german/addition/Additionsspa 4.webp'; chattr +i '$SAMPLES/german/addition/Additionsspa 4.webp' '$SAMPLES/german/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: german/addition/Additionsspa 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/german/addition/Additionsspa 4.webp' '$SAMPLES/german/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: german/addition/Additionsspa 4.webp -> german/addition/additionsspa-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/german/addition/additionsspa-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: german/addition/Additionsspa 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# german/addition/Additionsspa 1 answer_key.webp → german/addition/additionsspa-1-answer-key.webp
if [ -f '$SAMPLES/german/addition/Additionsspa 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/german/addition/Additionsspa 1 answer_key.webp' '$SAMPLES/german/addition' 2>/dev/null || true
    if mv '$SAMPLES/german/addition/Additionsspa 1 answer_key.webp' '$SAMPLES/german/addition/additionsspa-1-answer-key.webp'; then
      chattr +i '$SAMPLES/german/addition/additionsspa-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/german/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/german/addition/additionsspa-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: german/addition/Additionsspa 1 answer_key.webp -> german/addition/additionsspa-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/german/addition/additionsspa-1-answer-key.webp' '$SAMPLES/german/addition' 2>/dev/null; mv '$SAMPLES/german/addition/additionsspa-1-answer-key.webp' '$SAMPLES/german/addition/Additionsspa 1 answer_key.webp'; chattr +i '$SAMPLES/german/addition/Additionsspa 1 answer_key.webp' '$SAMPLES/german/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: german/addition/Additionsspa 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/german/addition/Additionsspa 1 answer_key.webp' '$SAMPLES/german/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: german/addition/Additionsspa 1 answer_key.webp -> german/addition/additionsspa-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/german/addition/additionsspa-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: german/addition/Additionsspa 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# german/subtraction/worksheet (3).webp → german/subtraction/worksheet-3.webp
if [ -f '$SAMPLES/german/subtraction/worksheet (3).webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/german/subtraction/worksheet (3).webp' '$SAMPLES/german/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/german/subtraction/worksheet (3).webp' '$SAMPLES/german/subtraction/worksheet-3.webp'; then
      chattr +i '$SAMPLES/german/subtraction/worksheet-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/german/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/german/subtraction/worksheet-3.webp' 2>/dev/null || true
      echo "  OK: german/subtraction/worksheet (3).webp -> german/subtraction/worksheet-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/german/subtraction/worksheet-3.webp' '$SAMPLES/german/subtraction' 2>/dev/null; mv '$SAMPLES/german/subtraction/worksheet-3.webp' '$SAMPLES/german/subtraction/worksheet (3).webp'; chattr +i '$SAMPLES/german/subtraction/worksheet (3).webp' '$SAMPLES/german/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: german/subtraction/worksheet (3).webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/german/subtraction/worksheet (3).webp' '$SAMPLES/german/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: german/subtraction/worksheet (3).webp -> german/subtraction/worksheet-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/german/subtraction/worksheet-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: german/subtraction/worksheet (3).webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# german/subtraction/worksheet (4).webp → german/subtraction/worksheet-4.webp
if [ -f '$SAMPLES/german/subtraction/worksheet (4).webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/german/subtraction/worksheet (4).webp' '$SAMPLES/german/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/german/subtraction/worksheet (4).webp' '$SAMPLES/german/subtraction/worksheet-4.webp'; then
      chattr +i '$SAMPLES/german/subtraction/worksheet-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/german/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/german/subtraction/worksheet-4.webp' 2>/dev/null || true
      echo "  OK: german/subtraction/worksheet (4).webp -> german/subtraction/worksheet-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/german/subtraction/worksheet-4.webp' '$SAMPLES/german/subtraction' 2>/dev/null; mv '$SAMPLES/german/subtraction/worksheet-4.webp' '$SAMPLES/german/subtraction/worksheet (4).webp'; chattr +i '$SAMPLES/german/subtraction/worksheet (4).webp' '$SAMPLES/german/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: german/subtraction/worksheet (4).webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/german/subtraction/worksheet (4).webp' '$SAMPLES/german/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: german/subtraction/worksheet (4).webp -> german/subtraction/worksheet-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/german/subtraction/worksheet-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: german/subtraction/worksheet (4).webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# german/cryptogram/Bilder-Kryptogramm 4.webp → german/cryptogram/bilder-kryptogramm-4.webp
if [ -f '$SAMPLES/german/cryptogram/Bilder-Kryptogramm 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/german/cryptogram/Bilder-Kryptogramm 4.webp' '$SAMPLES/german/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/german/cryptogram/Bilder-Kryptogramm 4.webp' '$SAMPLES/german/cryptogram/bilder-kryptogramm-4.webp'; then
      chattr +i '$SAMPLES/german/cryptogram/bilder-kryptogramm-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/german/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/german/cryptogram/bilder-kryptogramm-4.webp' 2>/dev/null || true
      echo "  OK: german/cryptogram/Bilder-Kryptogramm 4.webp -> german/cryptogram/bilder-kryptogramm-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/german/cryptogram/bilder-kryptogramm-4.webp' '$SAMPLES/german/cryptogram' 2>/dev/null; mv '$SAMPLES/german/cryptogram/bilder-kryptogramm-4.webp' '$SAMPLES/german/cryptogram/Bilder-Kryptogramm 4.webp'; chattr +i '$SAMPLES/german/cryptogram/Bilder-Kryptogramm 4.webp' '$SAMPLES/german/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: german/cryptogram/Bilder-Kryptogramm 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/german/cryptogram/Bilder-Kryptogramm 4.webp' '$SAMPLES/german/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: german/cryptogram/Bilder-Kryptogramm 4.webp -> german/cryptogram/bilder-kryptogramm-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/german/cryptogram/bilder-kryptogramm-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: german/cryptogram/Bilder-Kryptogramm 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# german/cryptogram/Bilder-Kryptogramm 5.webp → german/cryptogram/bilder-kryptogramm-5.webp
if [ -f '$SAMPLES/german/cryptogram/Bilder-Kryptogramm 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/german/cryptogram/Bilder-Kryptogramm 5.webp' '$SAMPLES/german/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/german/cryptogram/Bilder-Kryptogramm 5.webp' '$SAMPLES/german/cryptogram/bilder-kryptogramm-5.webp'; then
      chattr +i '$SAMPLES/german/cryptogram/bilder-kryptogramm-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/german/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/german/cryptogram/bilder-kryptogramm-5.webp' 2>/dev/null || true
      echo "  OK: german/cryptogram/Bilder-Kryptogramm 5.webp -> german/cryptogram/bilder-kryptogramm-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/german/cryptogram/bilder-kryptogramm-5.webp' '$SAMPLES/german/cryptogram' 2>/dev/null; mv '$SAMPLES/german/cryptogram/bilder-kryptogramm-5.webp' '$SAMPLES/german/cryptogram/Bilder-Kryptogramm 5.webp'; chattr +i '$SAMPLES/german/cryptogram/Bilder-Kryptogramm 5.webp' '$SAMPLES/german/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: german/cryptogram/Bilder-Kryptogramm 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/german/cryptogram/Bilder-Kryptogramm 5.webp' '$SAMPLES/german/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: german/cryptogram/Bilder-Kryptogramm 5.webp -> german/cryptogram/bilder-kryptogramm-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/german/cryptogram/bilder-kryptogramm-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: german/cryptogram/Bilder-Kryptogramm 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# german/cryptogram/Bilder-Kryptogramm 1 answer_key.webp → german/cryptogram/bilder-kryptogramm-1-answer-key.webp
if [ -f '$SAMPLES/german/cryptogram/Bilder-Kryptogramm 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/german/cryptogram/Bilder-Kryptogramm 1 answer_key.webp' '$SAMPLES/german/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/german/cryptogram/Bilder-Kryptogramm 1 answer_key.webp' '$SAMPLES/german/cryptogram/bilder-kryptogramm-1-answer-key.webp'; then
      chattr +i '$SAMPLES/german/cryptogram/bilder-kryptogramm-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/german/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/german/cryptogram/bilder-kryptogramm-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: german/cryptogram/Bilder-Kryptogramm 1 answer_key.webp -> german/cryptogram/bilder-kryptogramm-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/german/cryptogram/bilder-kryptogramm-1-answer-key.webp' '$SAMPLES/german/cryptogram' 2>/dev/null; mv '$SAMPLES/german/cryptogram/bilder-kryptogramm-1-answer-key.webp' '$SAMPLES/german/cryptogram/Bilder-Kryptogramm 1 answer_key.webp'; chattr +i '$SAMPLES/german/cryptogram/Bilder-Kryptogramm 1 answer_key.webp' '$SAMPLES/german/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: german/cryptogram/Bilder-Kryptogramm 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/german/cryptogram/Bilder-Kryptogramm 1 answer_key.webp' '$SAMPLES/german/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: german/cryptogram/Bilder-Kryptogramm 1 answer_key.webp -> german/cryptogram/bilder-kryptogramm-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/german/cryptogram/bilder-kryptogramm-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: german/cryptogram/Bilder-Kryptogramm 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# german/matching/Paare Finden 3.webp → german/matching/paare-finden-3.webp
if [ -f '$SAMPLES/german/matching/Paare Finden 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/german/matching/Paare Finden 3.webp' '$SAMPLES/german/matching' 2>/dev/null || true
    if mv '$SAMPLES/german/matching/Paare Finden 3.webp' '$SAMPLES/german/matching/paare-finden-3.webp'; then
      chattr +i '$SAMPLES/german/matching/paare-finden-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/german/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/german/matching/paare-finden-3.webp' 2>/dev/null || true
      echo "  OK: german/matching/Paare Finden 3.webp -> german/matching/paare-finden-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/german/matching/paare-finden-3.webp' '$SAMPLES/german/matching' 2>/dev/null; mv '$SAMPLES/german/matching/paare-finden-3.webp' '$SAMPLES/german/matching/Paare Finden 3.webp'; chattr +i '$SAMPLES/german/matching/Paare Finden 3.webp' '$SAMPLES/german/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: german/matching/Paare Finden 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/german/matching/Paare Finden 3.webp' '$SAMPLES/german/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: german/matching/Paare Finden 3.webp -> german/matching/paare-finden-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/german/matching/paare-finden-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: german/matching/Paare Finden 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# german/matching/Paare Finden 4.webp → german/matching/paare-finden-4.webp
if [ -f '$SAMPLES/german/matching/Paare Finden 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/german/matching/Paare Finden 4.webp' '$SAMPLES/german/matching' 2>/dev/null || true
    if mv '$SAMPLES/german/matching/Paare Finden 4.webp' '$SAMPLES/german/matching/paare-finden-4.webp'; then
      chattr +i '$SAMPLES/german/matching/paare-finden-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/german/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/german/matching/paare-finden-4.webp' 2>/dev/null || true
      echo "  OK: german/matching/Paare Finden 4.webp -> german/matching/paare-finden-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/german/matching/paare-finden-4.webp' '$SAMPLES/german/matching' 2>/dev/null; mv '$SAMPLES/german/matching/paare-finden-4.webp' '$SAMPLES/german/matching/Paare Finden 4.webp'; chattr +i '$SAMPLES/german/matching/Paare Finden 4.webp' '$SAMPLES/german/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: german/matching/Paare Finden 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/german/matching/Paare Finden 4.webp' '$SAMPLES/german/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: german/matching/Paare Finden 4.webp -> german/matching/paare-finden-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/german/matching/paare-finden-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: german/matching/Paare Finden 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# german/bingo/bilder-bingo 4.webp → german/bingo/bilder-bingo-4.webp
if [ -f '$SAMPLES/german/bingo/bilder-bingo 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/german/bingo/bilder-bingo 4.webp' '$SAMPLES/german/bingo' 2>/dev/null || true
    if mv '$SAMPLES/german/bingo/bilder-bingo 4.webp' '$SAMPLES/german/bingo/bilder-bingo-4.webp'; then
      chattr +i '$SAMPLES/german/bingo/bilder-bingo-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/german/bingo' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/german/bingo/bilder-bingo-4.webp' 2>/dev/null || true
      echo "  OK: german/bingo/bilder-bingo 4.webp -> german/bingo/bilder-bingo-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/german/bingo/bilder-bingo-4.webp' '$SAMPLES/german/bingo' 2>/dev/null; mv '$SAMPLES/german/bingo/bilder-bingo-4.webp' '$SAMPLES/german/bingo/bilder-bingo 4.webp'; chattr +i '$SAMPLES/german/bingo/bilder-bingo 4.webp' '$SAMPLES/german/bingo' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: german/bingo/bilder-bingo 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/german/bingo/bilder-bingo 4.webp' '$SAMPLES/german/bingo' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: german/bingo/bilder-bingo 4.webp -> german/bingo/bilder-bingo-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/german/bingo/bilder-bingo-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: german/bingo/bilder-bingo 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# german/bingo/bingo_cards.webp → german/bingo/bingo-cards.webp
if [ -f '$SAMPLES/german/bingo/bingo_cards.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/german/bingo/bingo_cards.webp' '$SAMPLES/german/bingo' 2>/dev/null || true
    if mv '$SAMPLES/german/bingo/bingo_cards.webp' '$SAMPLES/german/bingo/bingo-cards.webp'; then
      chattr +i '$SAMPLES/german/bingo/bingo-cards.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/german/bingo' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/german/bingo/bingo-cards.webp' 2>/dev/null || true
      echo "  OK: german/bingo/bingo_cards.webp -> german/bingo/bingo-cards.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/german/bingo/bingo-cards.webp' '$SAMPLES/german/bingo' 2>/dev/null; mv '$SAMPLES/german/bingo/bingo-cards.webp' '$SAMPLES/german/bingo/bingo_cards.webp'; chattr +i '$SAMPLES/german/bingo/bingo_cards.webp' '$SAMPLES/german/bingo' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: german/bingo/bingo_cards.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/german/bingo/bingo_cards.webp' '$SAMPLES/german/bingo' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: german/bingo/bingo_cards.webp -> german/bingo/bingo-cards.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/german/bingo/bingo-cards.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: german/bingo/bingo_cards.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# german/sudoku/Bilder-Sudoku 4.webp → german/sudoku/bilder-sudoku-4.webp
if [ -f '$SAMPLES/german/sudoku/Bilder-Sudoku 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/german/sudoku/Bilder-Sudoku 4.webp' '$SAMPLES/german/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/german/sudoku/Bilder-Sudoku 4.webp' '$SAMPLES/german/sudoku/bilder-sudoku-4.webp'; then
      chattr +i '$SAMPLES/german/sudoku/bilder-sudoku-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/german/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/german/sudoku/bilder-sudoku-4.webp' 2>/dev/null || true
      echo "  OK: german/sudoku/Bilder-Sudoku 4.webp -> german/sudoku/bilder-sudoku-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/german/sudoku/bilder-sudoku-4.webp' '$SAMPLES/german/sudoku' 2>/dev/null; mv '$SAMPLES/german/sudoku/bilder-sudoku-4.webp' '$SAMPLES/german/sudoku/Bilder-Sudoku 4.webp'; chattr +i '$SAMPLES/german/sudoku/Bilder-Sudoku 4.webp' '$SAMPLES/german/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: german/sudoku/Bilder-Sudoku 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/german/sudoku/Bilder-Sudoku 4.webp' '$SAMPLES/german/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: german/sudoku/Bilder-Sudoku 4.webp -> german/sudoku/bilder-sudoku-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/german/sudoku/bilder-sudoku-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: german/sudoku/Bilder-Sudoku 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# german/sudoku/Bilder-Sudoku 1 answer_key.webp → german/sudoku/bilder-sudoku-1-answer-key.webp
if [ -f '$SAMPLES/german/sudoku/Bilder-Sudoku 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/german/sudoku/Bilder-Sudoku 1 answer_key.webp' '$SAMPLES/german/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/german/sudoku/Bilder-Sudoku 1 answer_key.webp' '$SAMPLES/german/sudoku/bilder-sudoku-1-answer-key.webp'; then
      chattr +i '$SAMPLES/german/sudoku/bilder-sudoku-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/german/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/german/sudoku/bilder-sudoku-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: german/sudoku/Bilder-Sudoku 1 answer_key.webp -> german/sudoku/bilder-sudoku-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/german/sudoku/bilder-sudoku-1-answer-key.webp' '$SAMPLES/german/sudoku' 2>/dev/null; mv '$SAMPLES/german/sudoku/bilder-sudoku-1-answer-key.webp' '$SAMPLES/german/sudoku/Bilder-Sudoku 1 answer_key.webp'; chattr +i '$SAMPLES/german/sudoku/Bilder-Sudoku 1 answer_key.webp' '$SAMPLES/german/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: german/sudoku/Bilder-Sudoku 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/german/sudoku/Bilder-Sudoku 1 answer_key.webp' '$SAMPLES/german/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: german/sudoku/Bilder-Sudoku 1 answer_key.webp -> german/sudoku/bilder-sudoku-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/german/sudoku/bilder-sudoku-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: german/sudoku/Bilder-Sudoku 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# french/addition/Addition Amusant 3 .webp → french/addition/addition-amusant-3.webp
if [ -f '$SAMPLES/french/addition/Addition Amusant 3 .webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/french/addition/Addition Amusant 3 .webp' '$SAMPLES/french/addition' 2>/dev/null || true
    if mv '$SAMPLES/french/addition/Addition Amusant 3 .webp' '$SAMPLES/french/addition/addition-amusant-3.webp'; then
      chattr +i '$SAMPLES/french/addition/addition-amusant-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/french/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/french/addition/addition-amusant-3.webp' 2>/dev/null || true
      echo "  OK: french/addition/Addition Amusant 3 .webp -> french/addition/addition-amusant-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/french/addition/addition-amusant-3.webp' '$SAMPLES/french/addition' 2>/dev/null; mv '$SAMPLES/french/addition/addition-amusant-3.webp' '$SAMPLES/french/addition/Addition Amusant 3 .webp'; chattr +i '$SAMPLES/french/addition/Addition Amusant 3 .webp' '$SAMPLES/french/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: french/addition/Addition Amusant 3 .webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/french/addition/Addition Amusant 3 .webp' '$SAMPLES/french/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: french/addition/Addition Amusant 3 .webp -> french/addition/addition-amusant-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/french/addition/addition-amusant-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: french/addition/Addition Amusant 3 .webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# french/addition/addition_answer_key.webp → french/addition/addition-answer-key.webp
if [ -f '$SAMPLES/french/addition/addition_answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/french/addition/addition_answer_key.webp' '$SAMPLES/french/addition' 2>/dev/null || true
    if mv '$SAMPLES/french/addition/addition_answer_key.webp' '$SAMPLES/french/addition/addition-answer-key.webp'; then
      chattr +i '$SAMPLES/french/addition/addition-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/french/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/french/addition/addition-answer-key.webp' 2>/dev/null || true
      echo "  OK: french/addition/addition_answer_key.webp -> french/addition/addition-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/french/addition/addition-answer-key.webp' '$SAMPLES/french/addition' 2>/dev/null; mv '$SAMPLES/french/addition/addition-answer-key.webp' '$SAMPLES/french/addition/addition_answer_key.webp'; chattr +i '$SAMPLES/french/addition/addition_answer_key.webp' '$SAMPLES/french/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: french/addition/addition_answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/french/addition/addition_answer_key.webp' '$SAMPLES/french/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: french/addition/addition_answer_key.webp -> french/addition/addition-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/french/addition/addition-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: french/addition/addition_answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# french/cryptogram/Cryptogramme en Images 4.webp → french/cryptogram/cryptogramme-en-images-4.webp
if [ -f '$SAMPLES/french/cryptogram/Cryptogramme en Images 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/french/cryptogram/Cryptogramme en Images 4.webp' '$SAMPLES/french/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/french/cryptogram/Cryptogramme en Images 4.webp' '$SAMPLES/french/cryptogram/cryptogramme-en-images-4.webp'; then
      chattr +i '$SAMPLES/french/cryptogram/cryptogramme-en-images-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/french/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/french/cryptogram/cryptogramme-en-images-4.webp' 2>/dev/null || true
      echo "  OK: french/cryptogram/Cryptogramme en Images 4.webp -> french/cryptogram/cryptogramme-en-images-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/french/cryptogram/cryptogramme-en-images-4.webp' '$SAMPLES/french/cryptogram' 2>/dev/null; mv '$SAMPLES/french/cryptogram/cryptogramme-en-images-4.webp' '$SAMPLES/french/cryptogram/Cryptogramme en Images 4.webp'; chattr +i '$SAMPLES/french/cryptogram/Cryptogramme en Images 4.webp' '$SAMPLES/french/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: french/cryptogram/Cryptogramme en Images 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/french/cryptogram/Cryptogramme en Images 4.webp' '$SAMPLES/french/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: french/cryptogram/Cryptogramme en Images 4.webp -> french/cryptogram/cryptogramme-en-images-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/french/cryptogram/cryptogramme-en-images-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: french/cryptogram/Cryptogramme en Images 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# french/cryptogram/Cryptogramme en Images 5.webp → french/cryptogram/cryptogramme-en-images-5.webp
if [ -f '$SAMPLES/french/cryptogram/Cryptogramme en Images 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/french/cryptogram/Cryptogramme en Images 5.webp' '$SAMPLES/french/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/french/cryptogram/Cryptogramme en Images 5.webp' '$SAMPLES/french/cryptogram/cryptogramme-en-images-5.webp'; then
      chattr +i '$SAMPLES/french/cryptogram/cryptogramme-en-images-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/french/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/french/cryptogram/cryptogramme-en-images-5.webp' 2>/dev/null || true
      echo "  OK: french/cryptogram/Cryptogramme en Images 5.webp -> french/cryptogram/cryptogramme-en-images-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/french/cryptogram/cryptogramme-en-images-5.webp' '$SAMPLES/french/cryptogram' 2>/dev/null; mv '$SAMPLES/french/cryptogram/cryptogramme-en-images-5.webp' '$SAMPLES/french/cryptogram/Cryptogramme en Images 5.webp'; chattr +i '$SAMPLES/french/cryptogram/Cryptogramme en Images 5.webp' '$SAMPLES/french/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: french/cryptogram/Cryptogramme en Images 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/french/cryptogram/Cryptogramme en Images 5.webp' '$SAMPLES/french/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: french/cryptogram/Cryptogramme en Images 5.webp -> french/cryptogram/cryptogramme-en-images-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/french/cryptogram/cryptogramme-en-images-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: french/cryptogram/Cryptogramme en Images 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# french/matching/Trouve les Paires 3.webp → french/matching/trouve-les-paires-3.webp
if [ -f '$SAMPLES/french/matching/Trouve les Paires 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/french/matching/Trouve les Paires 3.webp' '$SAMPLES/french/matching' 2>/dev/null || true
    if mv '$SAMPLES/french/matching/Trouve les Paires 3.webp' '$SAMPLES/french/matching/trouve-les-paires-3.webp'; then
      chattr +i '$SAMPLES/french/matching/trouve-les-paires-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/french/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/french/matching/trouve-les-paires-3.webp' 2>/dev/null || true
      echo "  OK: french/matching/Trouve les Paires 3.webp -> french/matching/trouve-les-paires-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/french/matching/trouve-les-paires-3.webp' '$SAMPLES/french/matching' 2>/dev/null; mv '$SAMPLES/french/matching/trouve-les-paires-3.webp' '$SAMPLES/french/matching/Trouve les Paires 3.webp'; chattr +i '$SAMPLES/french/matching/Trouve les Paires 3.webp' '$SAMPLES/french/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: french/matching/Trouve les Paires 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/french/matching/Trouve les Paires 3.webp' '$SAMPLES/french/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: french/matching/Trouve les Paires 3.webp -> french/matching/trouve-les-paires-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/french/matching/trouve-les-paires-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: french/matching/Trouve les Paires 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# french/matching/Trouve les Paires 4.webp → french/matching/trouve-les-paires-4.webp
if [ -f '$SAMPLES/french/matching/Trouve les Paires 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/french/matching/Trouve les Paires 4.webp' '$SAMPLES/french/matching' 2>/dev/null || true
    if mv '$SAMPLES/french/matching/Trouve les Paires 4.webp' '$SAMPLES/french/matching/trouve-les-paires-4.webp'; then
      chattr +i '$SAMPLES/french/matching/trouve-les-paires-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/french/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/french/matching/trouve-les-paires-4.webp' 2>/dev/null || true
      echo "  OK: french/matching/Trouve les Paires 4.webp -> french/matching/trouve-les-paires-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/french/matching/trouve-les-paires-4.webp' '$SAMPLES/french/matching' 2>/dev/null; mv '$SAMPLES/french/matching/trouve-les-paires-4.webp' '$SAMPLES/french/matching/Trouve les Paires 4.webp'; chattr +i '$SAMPLES/french/matching/Trouve les Paires 4.webp' '$SAMPLES/french/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: french/matching/Trouve les Paires 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/french/matching/Trouve les Paires 4.webp' '$SAMPLES/french/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: french/matching/Trouve les Paires 4.webp -> french/matching/trouve-les-paires-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/french/matching/trouve-les-paires-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: french/matching/Trouve les Paires 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# french/bingo/bingo_cards.webp → french/bingo/bingo-cards.webp
if [ -f '$SAMPLES/french/bingo/bingo_cards.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/french/bingo/bingo_cards.webp' '$SAMPLES/french/bingo' 2>/dev/null || true
    if mv '$SAMPLES/french/bingo/bingo_cards.webp' '$SAMPLES/french/bingo/bingo-cards.webp'; then
      chattr +i '$SAMPLES/french/bingo/bingo-cards.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/french/bingo' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/french/bingo/bingo-cards.webp' 2>/dev/null || true
      echo "  OK: french/bingo/bingo_cards.webp -> french/bingo/bingo-cards.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/french/bingo/bingo-cards.webp' '$SAMPLES/french/bingo' 2>/dev/null; mv '$SAMPLES/french/bingo/bingo-cards.webp' '$SAMPLES/french/bingo/bingo_cards.webp'; chattr +i '$SAMPLES/french/bingo/bingo_cards.webp' '$SAMPLES/french/bingo' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: french/bingo/bingo_cards.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/french/bingo/bingo_cards.webp' '$SAMPLES/french/bingo' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: french/bingo/bingo_cards.webp -> french/bingo/bingo-cards.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/french/bingo/bingo-cards.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: french/bingo/bingo_cards.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# french/sudoku/Sudoku en Images 4.webp → french/sudoku/sudoku-en-images-4.webp
if [ -f '$SAMPLES/french/sudoku/Sudoku en Images 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/french/sudoku/Sudoku en Images 4.webp' '$SAMPLES/french/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/french/sudoku/Sudoku en Images 4.webp' '$SAMPLES/french/sudoku/sudoku-en-images-4.webp'; then
      chattr +i '$SAMPLES/french/sudoku/sudoku-en-images-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/french/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/french/sudoku/sudoku-en-images-4.webp' 2>/dev/null || true
      echo "  OK: french/sudoku/Sudoku en Images 4.webp -> french/sudoku/sudoku-en-images-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/french/sudoku/sudoku-en-images-4.webp' '$SAMPLES/french/sudoku' 2>/dev/null; mv '$SAMPLES/french/sudoku/sudoku-en-images-4.webp' '$SAMPLES/french/sudoku/Sudoku en Images 4.webp'; chattr +i '$SAMPLES/french/sudoku/Sudoku en Images 4.webp' '$SAMPLES/french/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: french/sudoku/Sudoku en Images 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/french/sudoku/Sudoku en Images 4.webp' '$SAMPLES/french/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: french/sudoku/Sudoku en Images 4.webp -> french/sudoku/sudoku-en-images-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/french/sudoku/sudoku-en-images-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: french/sudoku/Sudoku en Images 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# spanish/addition/Suma Divertida 5.webp → spanish/addition/suma-divertida-5.webp
if [ -f '$SAMPLES/spanish/addition/Suma Divertida 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/spanish/addition/Suma Divertida 5.webp' '$SAMPLES/spanish/addition' 2>/dev/null || true
    if mv '$SAMPLES/spanish/addition/Suma Divertida 5.webp' '$SAMPLES/spanish/addition/suma-divertida-5.webp'; then
      chattr +i '$SAMPLES/spanish/addition/suma-divertida-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/spanish/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/spanish/addition/suma-divertida-5.webp' 2>/dev/null || true
      echo "  OK: spanish/addition/Suma Divertida 5.webp -> spanish/addition/suma-divertida-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/spanish/addition/suma-divertida-5.webp' '$SAMPLES/spanish/addition' 2>/dev/null; mv '$SAMPLES/spanish/addition/suma-divertida-5.webp' '$SAMPLES/spanish/addition/Suma Divertida 5.webp'; chattr +i '$SAMPLES/spanish/addition/Suma Divertida 5.webp' '$SAMPLES/spanish/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: spanish/addition/Suma Divertida 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/spanish/addition/Suma Divertida 5.webp' '$SAMPLES/spanish/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: spanish/addition/Suma Divertida 5.webp -> spanish/addition/suma-divertida-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/spanish/addition/suma-divertida-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: spanish/addition/Suma Divertida 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# spanish/addition/Suma Divertida 1 answer_key.webp → spanish/addition/suma-divertida-1-answer-key.webp
if [ -f '$SAMPLES/spanish/addition/Suma Divertida 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/spanish/addition/Suma Divertida 1 answer_key.webp' '$SAMPLES/spanish/addition' 2>/dev/null || true
    if mv '$SAMPLES/spanish/addition/Suma Divertida 1 answer_key.webp' '$SAMPLES/spanish/addition/suma-divertida-1-answer-key.webp'; then
      chattr +i '$SAMPLES/spanish/addition/suma-divertida-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/spanish/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/spanish/addition/suma-divertida-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: spanish/addition/Suma Divertida 1 answer_key.webp -> spanish/addition/suma-divertida-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/spanish/addition/suma-divertida-1-answer-key.webp' '$SAMPLES/spanish/addition' 2>/dev/null; mv '$SAMPLES/spanish/addition/suma-divertida-1-answer-key.webp' '$SAMPLES/spanish/addition/Suma Divertida 1 answer_key.webp'; chattr +i '$SAMPLES/spanish/addition/Suma Divertida 1 answer_key.webp' '$SAMPLES/spanish/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: spanish/addition/Suma Divertida 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/spanish/addition/Suma Divertida 1 answer_key.webp' '$SAMPLES/spanish/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: spanish/addition/Suma Divertida 1 answer_key.webp -> spanish/addition/suma-divertida-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/spanish/addition/suma-divertida-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: spanish/addition/Suma Divertida 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# spanish/subtraction/Restas Divertidas 1 answer_key.webp → spanish/subtraction/restas-divertidas-1-answer-key.webp
if [ -f '$SAMPLES/spanish/subtraction/Restas Divertidas 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/spanish/subtraction/Restas Divertidas 1 answer_key.webp' '$SAMPLES/spanish/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/spanish/subtraction/Restas Divertidas 1 answer_key.webp' '$SAMPLES/spanish/subtraction/restas-divertidas-1-answer-key.webp'; then
      chattr +i '$SAMPLES/spanish/subtraction/restas-divertidas-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/spanish/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/spanish/subtraction/restas-divertidas-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: spanish/subtraction/Restas Divertidas 1 answer_key.webp -> spanish/subtraction/restas-divertidas-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/spanish/subtraction/restas-divertidas-1-answer-key.webp' '$SAMPLES/spanish/subtraction' 2>/dev/null; mv '$SAMPLES/spanish/subtraction/restas-divertidas-1-answer-key.webp' '$SAMPLES/spanish/subtraction/Restas Divertidas 1 answer_key.webp'; chattr +i '$SAMPLES/spanish/subtraction/Restas Divertidas 1 answer_key.webp' '$SAMPLES/spanish/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: spanish/subtraction/Restas Divertidas 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/spanish/subtraction/Restas Divertidas 1 answer_key.webp' '$SAMPLES/spanish/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: spanish/subtraction/Restas Divertidas 1 answer_key.webp -> spanish/subtraction/restas-divertidas-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/spanish/subtraction/restas-divertidas-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: spanish/subtraction/Restas Divertidas 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# spanish/prepositions/Preposiciones 4.webp → spanish/prepositions/preposiciones-4.webp
if [ -f '$SAMPLES/spanish/prepositions/Preposiciones 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/spanish/prepositions/Preposiciones 4.webp' '$SAMPLES/spanish/prepositions' 2>/dev/null || true
    if mv '$SAMPLES/spanish/prepositions/Preposiciones 4.webp' '$SAMPLES/spanish/prepositions/preposiciones-4.webp'; then
      chattr +i '$SAMPLES/spanish/prepositions/preposiciones-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/spanish/prepositions' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/spanish/prepositions/preposiciones-4.webp' 2>/dev/null || true
      echo "  OK: spanish/prepositions/Preposiciones 4.webp -> spanish/prepositions/preposiciones-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/spanish/prepositions/preposiciones-4.webp' '$SAMPLES/spanish/prepositions' 2>/dev/null; mv '$SAMPLES/spanish/prepositions/preposiciones-4.webp' '$SAMPLES/spanish/prepositions/Preposiciones 4.webp'; chattr +i '$SAMPLES/spanish/prepositions/Preposiciones 4.webp' '$SAMPLES/spanish/prepositions' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: spanish/prepositions/Preposiciones 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/spanish/prepositions/Preposiciones 4.webp' '$SAMPLES/spanish/prepositions' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: spanish/prepositions/Preposiciones 4.webp -> spanish/prepositions/preposiciones-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/spanish/prepositions/preposiciones-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: spanish/prepositions/Preposiciones 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# spanish/prepositions/Preposiciones 1 answer_key.webp → spanish/prepositions/preposiciones-1-answer-key.webp
if [ -f '$SAMPLES/spanish/prepositions/Preposiciones 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/spanish/prepositions/Preposiciones 1 answer_key.webp' '$SAMPLES/spanish/prepositions' 2>/dev/null || true
    if mv '$SAMPLES/spanish/prepositions/Preposiciones 1 answer_key.webp' '$SAMPLES/spanish/prepositions/preposiciones-1-answer-key.webp'; then
      chattr +i '$SAMPLES/spanish/prepositions/preposiciones-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/spanish/prepositions' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/spanish/prepositions/preposiciones-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: spanish/prepositions/Preposiciones 1 answer_key.webp -> spanish/prepositions/preposiciones-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/spanish/prepositions/preposiciones-1-answer-key.webp' '$SAMPLES/spanish/prepositions' 2>/dev/null; mv '$SAMPLES/spanish/prepositions/preposiciones-1-answer-key.webp' '$SAMPLES/spanish/prepositions/Preposiciones 1 answer_key.webp'; chattr +i '$SAMPLES/spanish/prepositions/Preposiciones 1 answer_key.webp' '$SAMPLES/spanish/prepositions' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: spanish/prepositions/Preposiciones 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/spanish/prepositions/Preposiciones 1 answer_key.webp' '$SAMPLES/spanish/prepositions' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: spanish/prepositions/Preposiciones 1 answer_key.webp -> spanish/prepositions/preposiciones-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/spanish/prepositions/preposiciones-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: spanish/prepositions/Preposiciones 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# spanish/wordsearch/Sopa de Letras 4.webp → spanish/wordsearch/sopa-de-letras-4.webp
if [ -f '$SAMPLES/spanish/wordsearch/Sopa de Letras 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/spanish/wordsearch/Sopa de Letras 4.webp' '$SAMPLES/spanish/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/spanish/wordsearch/Sopa de Letras 4.webp' '$SAMPLES/spanish/wordsearch/sopa-de-letras-4.webp'; then
      chattr +i '$SAMPLES/spanish/wordsearch/sopa-de-letras-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/spanish/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/spanish/wordsearch/sopa-de-letras-4.webp' 2>/dev/null || true
      echo "  OK: spanish/wordsearch/Sopa de Letras 4.webp -> spanish/wordsearch/sopa-de-letras-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/spanish/wordsearch/sopa-de-letras-4.webp' '$SAMPLES/spanish/wordsearch' 2>/dev/null; mv '$SAMPLES/spanish/wordsearch/sopa-de-letras-4.webp' '$SAMPLES/spanish/wordsearch/Sopa de Letras 4.webp'; chattr +i '$SAMPLES/spanish/wordsearch/Sopa de Letras 4.webp' '$SAMPLES/spanish/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: spanish/wordsearch/Sopa de Letras 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/spanish/wordsearch/Sopa de Letras 4.webp' '$SAMPLES/spanish/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: spanish/wordsearch/Sopa de Letras 4.webp -> spanish/wordsearch/sopa-de-letras-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/spanish/wordsearch/sopa-de-letras-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: spanish/wordsearch/Sopa de Letras 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# spanish/wordsearch/Sopa de Letras 1 answer_key.webp → spanish/wordsearch/sopa-de-letras-1-answer-key.webp
if [ -f '$SAMPLES/spanish/wordsearch/Sopa de Letras 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/spanish/wordsearch/Sopa de Letras 1 answer_key.webp' '$SAMPLES/spanish/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/spanish/wordsearch/Sopa de Letras 1 answer_key.webp' '$SAMPLES/spanish/wordsearch/sopa-de-letras-1-answer-key.webp'; then
      chattr +i '$SAMPLES/spanish/wordsearch/sopa-de-letras-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/spanish/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/spanish/wordsearch/sopa-de-letras-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: spanish/wordsearch/Sopa de Letras 1 answer_key.webp -> spanish/wordsearch/sopa-de-letras-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/spanish/wordsearch/sopa-de-letras-1-answer-key.webp' '$SAMPLES/spanish/wordsearch' 2>/dev/null; mv '$SAMPLES/spanish/wordsearch/sopa-de-letras-1-answer-key.webp' '$SAMPLES/spanish/wordsearch/Sopa de Letras 1 answer_key.webp'; chattr +i '$SAMPLES/spanish/wordsearch/Sopa de Letras 1 answer_key.webp' '$SAMPLES/spanish/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: spanish/wordsearch/Sopa de Letras 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/spanish/wordsearch/Sopa de Letras 1 answer_key.webp' '$SAMPLES/spanish/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: spanish/wordsearch/Sopa de Letras 1 answer_key.webp -> spanish/wordsearch/sopa-de-letras-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/spanish/wordsearch/sopa-de-letras-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: spanish/wordsearch/Sopa de Letras 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# spanish/cryptogram/Criptograma de Dibujos 3.webp → spanish/cryptogram/criptograma-de-dibujos-3.webp
if [ -f '$SAMPLES/spanish/cryptogram/Criptograma de Dibujos 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/spanish/cryptogram/Criptograma de Dibujos 3.webp' '$SAMPLES/spanish/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/spanish/cryptogram/Criptograma de Dibujos 3.webp' '$SAMPLES/spanish/cryptogram/criptograma-de-dibujos-3.webp'; then
      chattr +i '$SAMPLES/spanish/cryptogram/criptograma-de-dibujos-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/spanish/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/spanish/cryptogram/criptograma-de-dibujos-3.webp' 2>/dev/null || true
      echo "  OK: spanish/cryptogram/Criptograma de Dibujos 3.webp -> spanish/cryptogram/criptograma-de-dibujos-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/spanish/cryptogram/criptograma-de-dibujos-3.webp' '$SAMPLES/spanish/cryptogram' 2>/dev/null; mv '$SAMPLES/spanish/cryptogram/criptograma-de-dibujos-3.webp' '$SAMPLES/spanish/cryptogram/Criptograma de Dibujos 3.webp'; chattr +i '$SAMPLES/spanish/cryptogram/Criptograma de Dibujos 3.webp' '$SAMPLES/spanish/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: spanish/cryptogram/Criptograma de Dibujos 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/spanish/cryptogram/Criptograma de Dibujos 3.webp' '$SAMPLES/spanish/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: spanish/cryptogram/Criptograma de Dibujos 3.webp -> spanish/cryptogram/criptograma-de-dibujos-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/spanish/cryptogram/criptograma-de-dibujos-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: spanish/cryptogram/Criptograma de Dibujos 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# spanish/cryptogram/Criptograma de Dibujos 4.webp → spanish/cryptogram/criptograma-de-dibujos-4.webp
if [ -f '$SAMPLES/spanish/cryptogram/Criptograma de Dibujos 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/spanish/cryptogram/Criptograma de Dibujos 4.webp' '$SAMPLES/spanish/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/spanish/cryptogram/Criptograma de Dibujos 4.webp' '$SAMPLES/spanish/cryptogram/criptograma-de-dibujos-4.webp'; then
      chattr +i '$SAMPLES/spanish/cryptogram/criptograma-de-dibujos-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/spanish/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/spanish/cryptogram/criptograma-de-dibujos-4.webp' 2>/dev/null || true
      echo "  OK: spanish/cryptogram/Criptograma de Dibujos 4.webp -> spanish/cryptogram/criptograma-de-dibujos-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/spanish/cryptogram/criptograma-de-dibujos-4.webp' '$SAMPLES/spanish/cryptogram' 2>/dev/null; mv '$SAMPLES/spanish/cryptogram/criptograma-de-dibujos-4.webp' '$SAMPLES/spanish/cryptogram/Criptograma de Dibujos 4.webp'; chattr +i '$SAMPLES/spanish/cryptogram/Criptograma de Dibujos 4.webp' '$SAMPLES/spanish/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: spanish/cryptogram/Criptograma de Dibujos 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/spanish/cryptogram/Criptograma de Dibujos 4.webp' '$SAMPLES/spanish/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: spanish/cryptogram/Criptograma de Dibujos 4.webp -> spanish/cryptogram/criptograma-de-dibujos-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/spanish/cryptogram/criptograma-de-dibujos-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: spanish/cryptogram/Criptograma de Dibujos 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# spanish/crossword/Crucigrama con Dibujos 4.webp → spanish/crossword/crucigrama-con-dibujos-4.webp
if [ -f '$SAMPLES/spanish/crossword/Crucigrama con Dibujos 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/spanish/crossword/Crucigrama con Dibujos 4.webp' '$SAMPLES/spanish/crossword' 2>/dev/null || true
    if mv '$SAMPLES/spanish/crossword/Crucigrama con Dibujos 4.webp' '$SAMPLES/spanish/crossword/crucigrama-con-dibujos-4.webp'; then
      chattr +i '$SAMPLES/spanish/crossword/crucigrama-con-dibujos-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/spanish/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/spanish/crossword/crucigrama-con-dibujos-4.webp' 2>/dev/null || true
      echo "  OK: spanish/crossword/Crucigrama con Dibujos 4.webp -> spanish/crossword/crucigrama-con-dibujos-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/spanish/crossword/crucigrama-con-dibujos-4.webp' '$SAMPLES/spanish/crossword' 2>/dev/null; mv '$SAMPLES/spanish/crossword/crucigrama-con-dibujos-4.webp' '$SAMPLES/spanish/crossword/Crucigrama con Dibujos 4.webp'; chattr +i '$SAMPLES/spanish/crossword/Crucigrama con Dibujos 4.webp' '$SAMPLES/spanish/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: spanish/crossword/Crucigrama con Dibujos 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/spanish/crossword/Crucigrama con Dibujos 4.webp' '$SAMPLES/spanish/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: spanish/crossword/Crucigrama con Dibujos 4.webp -> spanish/crossword/crucigrama-con-dibujos-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/spanish/crossword/crucigrama-con-dibujos-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: spanish/crossword/Crucigrama con Dibujos 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# spanish/matching/Encuentra Parejas 3.webp → spanish/matching/encuentra-parejas-3.webp
if [ -f '$SAMPLES/spanish/matching/Encuentra Parejas 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/spanish/matching/Encuentra Parejas 3.webp' '$SAMPLES/spanish/matching' 2>/dev/null || true
    if mv '$SAMPLES/spanish/matching/Encuentra Parejas 3.webp' '$SAMPLES/spanish/matching/encuentra-parejas-3.webp'; then
      chattr +i '$SAMPLES/spanish/matching/encuentra-parejas-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/spanish/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/spanish/matching/encuentra-parejas-3.webp' 2>/dev/null || true
      echo "  OK: spanish/matching/Encuentra Parejas 3.webp -> spanish/matching/encuentra-parejas-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/spanish/matching/encuentra-parejas-3.webp' '$SAMPLES/spanish/matching' 2>/dev/null; mv '$SAMPLES/spanish/matching/encuentra-parejas-3.webp' '$SAMPLES/spanish/matching/Encuentra Parejas 3.webp'; chattr +i '$SAMPLES/spanish/matching/Encuentra Parejas 3.webp' '$SAMPLES/spanish/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: spanish/matching/Encuentra Parejas 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/spanish/matching/Encuentra Parejas 3.webp' '$SAMPLES/spanish/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: spanish/matching/Encuentra Parejas 3.webp -> spanish/matching/encuentra-parejas-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/spanish/matching/encuentra-parejas-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: spanish/matching/Encuentra Parejas 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# spanish/bingo/Bingo de Imágenes 5.webp → spanish/bingo/bingo-de-imágenes-5.webp
if [ -f '$SAMPLES/spanish/bingo/Bingo de Imágenes 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/spanish/bingo/Bingo de Imágenes 5.webp' '$SAMPLES/spanish/bingo' 2>/dev/null || true
    if mv '$SAMPLES/spanish/bingo/Bingo de Imágenes 5.webp' '$SAMPLES/spanish/bingo/bingo-de-imágenes-5.webp'; then
      chattr +i '$SAMPLES/spanish/bingo/bingo-de-imágenes-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/spanish/bingo' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/spanish/bingo/bingo-de-imágenes-5.webp' 2>/dev/null || true
      echo "  OK: spanish/bingo/Bingo de Imágenes 5.webp -> spanish/bingo/bingo-de-imágenes-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/spanish/bingo/bingo-de-imágenes-5.webp' '$SAMPLES/spanish/bingo' 2>/dev/null; mv '$SAMPLES/spanish/bingo/bingo-de-imágenes-5.webp' '$SAMPLES/spanish/bingo/Bingo de Imágenes 5.webp'; chattr +i '$SAMPLES/spanish/bingo/Bingo de Imágenes 5.webp' '$SAMPLES/spanish/bingo' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: spanish/bingo/Bingo de Imágenes 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/spanish/bingo/Bingo de Imágenes 5.webp' '$SAMPLES/spanish/bingo' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: spanish/bingo/Bingo de Imágenes 5.webp -> spanish/bingo/bingo-de-imágenes-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/spanish/bingo/bingo-de-imágenes-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: spanish/bingo/Bingo de Imágenes 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# spanish/sudoku/Sudoku de Imágenes 4.webp → spanish/sudoku/sudoku-de-imágenes-4.webp
if [ -f '$SAMPLES/spanish/sudoku/Sudoku de Imágenes 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/spanish/sudoku/Sudoku de Imágenes 4.webp' '$SAMPLES/spanish/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/spanish/sudoku/Sudoku de Imágenes 4.webp' '$SAMPLES/spanish/sudoku/sudoku-de-imágenes-4.webp'; then
      chattr +i '$SAMPLES/spanish/sudoku/sudoku-de-imágenes-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/spanish/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/spanish/sudoku/sudoku-de-imágenes-4.webp' 2>/dev/null || true
      echo "  OK: spanish/sudoku/Sudoku de Imágenes 4.webp -> spanish/sudoku/sudoku-de-imágenes-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/spanish/sudoku/sudoku-de-imágenes-4.webp' '$SAMPLES/spanish/sudoku' 2>/dev/null; mv '$SAMPLES/spanish/sudoku/sudoku-de-imágenes-4.webp' '$SAMPLES/spanish/sudoku/Sudoku de Imágenes 4.webp'; chattr +i '$SAMPLES/spanish/sudoku/Sudoku de Imágenes 4.webp' '$SAMPLES/spanish/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: spanish/sudoku/Sudoku de Imágenes 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/spanish/sudoku/Sudoku de Imágenes 4.webp' '$SAMPLES/spanish/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: spanish/sudoku/Sudoku de Imágenes 4.webp -> spanish/sudoku/sudoku-de-imágenes-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/spanish/sudoku/sudoku-de-imágenes-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: spanish/sudoku/Sudoku de Imágenes 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# portuguese/addition/Adição Divertida 5.webp → portuguese/addition/adição-divertida-5.webp
if [ -f '$SAMPLES/portuguese/addition/Adição Divertida 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/portuguese/addition/Adição Divertida 5.webp' '$SAMPLES/portuguese/addition' 2>/dev/null || true
    if mv '$SAMPLES/portuguese/addition/Adição Divertida 5.webp' '$SAMPLES/portuguese/addition/adição-divertida-5.webp'; then
      chattr +i '$SAMPLES/portuguese/addition/adição-divertida-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/portuguese/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/portuguese/addition/adição-divertida-5.webp' 2>/dev/null || true
      echo "  OK: portuguese/addition/Adição Divertida 5.webp -> portuguese/addition/adição-divertida-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/portuguese/addition/adição-divertida-5.webp' '$SAMPLES/portuguese/addition' 2>/dev/null; mv '$SAMPLES/portuguese/addition/adição-divertida-5.webp' '$SAMPLES/portuguese/addition/Adição Divertida 5.webp'; chattr +i '$SAMPLES/portuguese/addition/Adição Divertida 5.webp' '$SAMPLES/portuguese/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: portuguese/addition/Adição Divertida 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/portuguese/addition/Adição Divertida 5.webp' '$SAMPLES/portuguese/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: portuguese/addition/Adição Divertida 5.webp -> portuguese/addition/adição-divertida-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/portuguese/addition/adição-divertida-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: portuguese/addition/Adição Divertida 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# portuguese/addition/Adição Divertida 1 answer_key.webp → portuguese/addition/adição-divertida-1-answer-key.webp
if [ -f '$SAMPLES/portuguese/addition/Adição Divertida 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/portuguese/addition/Adição Divertida 1 answer_key.webp' '$SAMPLES/portuguese/addition' 2>/dev/null || true
    if mv '$SAMPLES/portuguese/addition/Adição Divertida 1 answer_key.webp' '$SAMPLES/portuguese/addition/adição-divertida-1-answer-key.webp'; then
      chattr +i '$SAMPLES/portuguese/addition/adição-divertida-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/portuguese/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/portuguese/addition/adição-divertida-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: portuguese/addition/Adição Divertida 1 answer_key.webp -> portuguese/addition/adição-divertida-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/portuguese/addition/adição-divertida-1-answer-key.webp' '$SAMPLES/portuguese/addition' 2>/dev/null; mv '$SAMPLES/portuguese/addition/adição-divertida-1-answer-key.webp' '$SAMPLES/portuguese/addition/Adição Divertida 1 answer_key.webp'; chattr +i '$SAMPLES/portuguese/addition/Adição Divertida 1 answer_key.webp' '$SAMPLES/portuguese/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: portuguese/addition/Adição Divertida 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/portuguese/addition/Adição Divertida 1 answer_key.webp' '$SAMPLES/portuguese/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: portuguese/addition/Adição Divertida 1 answer_key.webp -> portuguese/addition/adição-divertida-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/portuguese/addition/adição-divertida-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: portuguese/addition/Adição Divertida 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# portuguese/subtraction/Subtrações Divertidas 1 answer_key.webp → portuguese/subtraction/subtrações-divertidas-1-answer-key.webp
if [ -f '$SAMPLES/portuguese/subtraction/Subtrações Divertidas 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/portuguese/subtraction/Subtrações Divertidas 1 answer_key.webp' '$SAMPLES/portuguese/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/portuguese/subtraction/Subtrações Divertidas 1 answer_key.webp' '$SAMPLES/portuguese/subtraction/subtrações-divertidas-1-answer-key.webp'; then
      chattr +i '$SAMPLES/portuguese/subtraction/subtrações-divertidas-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/portuguese/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/portuguese/subtraction/subtrações-divertidas-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: portuguese/subtraction/Subtrações Divertidas 1 answer_key.webp -> portuguese/subtraction/subtrações-divertidas-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/portuguese/subtraction/subtrações-divertidas-1-answer-key.webp' '$SAMPLES/portuguese/subtraction' 2>/dev/null; mv '$SAMPLES/portuguese/subtraction/subtrações-divertidas-1-answer-key.webp' '$SAMPLES/portuguese/subtraction/Subtrações Divertidas 1 answer_key.webp'; chattr +i '$SAMPLES/portuguese/subtraction/Subtrações Divertidas 1 answer_key.webp' '$SAMPLES/portuguese/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: portuguese/subtraction/Subtrações Divertidas 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/portuguese/subtraction/Subtrações Divertidas 1 answer_key.webp' '$SAMPLES/portuguese/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: portuguese/subtraction/Subtrações Divertidas 1 answer_key.webp -> portuguese/subtraction/subtrações-divertidas-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/portuguese/subtraction/subtrações-divertidas-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: portuguese/subtraction/Subtrações Divertidas 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# portuguese/prepositions/Preposições 1 answer_key.webp → portuguese/prepositions/preposições-1-answer-key.webp
if [ -f '$SAMPLES/portuguese/prepositions/Preposições 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/portuguese/prepositions/Preposições 1 answer_key.webp' '$SAMPLES/portuguese/prepositions' 2>/dev/null || true
    if mv '$SAMPLES/portuguese/prepositions/Preposições 1 answer_key.webp' '$SAMPLES/portuguese/prepositions/preposições-1-answer-key.webp'; then
      chattr +i '$SAMPLES/portuguese/prepositions/preposições-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/portuguese/prepositions' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/portuguese/prepositions/preposições-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: portuguese/prepositions/Preposições 1 answer_key.webp -> portuguese/prepositions/preposições-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/portuguese/prepositions/preposições-1-answer-key.webp' '$SAMPLES/portuguese/prepositions' 2>/dev/null; mv '$SAMPLES/portuguese/prepositions/preposições-1-answer-key.webp' '$SAMPLES/portuguese/prepositions/Preposições 1 answer_key.webp'; chattr +i '$SAMPLES/portuguese/prepositions/Preposições 1 answer_key.webp' '$SAMPLES/portuguese/prepositions' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: portuguese/prepositions/Preposições 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/portuguese/prepositions/Preposições 1 answer_key.webp' '$SAMPLES/portuguese/prepositions' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: portuguese/prepositions/Preposições 1 answer_key.webp -> portuguese/prepositions/preposições-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/portuguese/prepositions/preposições-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: portuguese/prepositions/Preposições 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# portuguese/wordsearch/Caça-Palavras 1 answer_key.webp → portuguese/wordsearch/caça-palavras-1-answer-key.webp
if [ -f '$SAMPLES/portuguese/wordsearch/Caça-Palavras 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/portuguese/wordsearch/Caça-Palavras 1 answer_key.webp' '$SAMPLES/portuguese/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/portuguese/wordsearch/Caça-Palavras 1 answer_key.webp' '$SAMPLES/portuguese/wordsearch/caça-palavras-1-answer-key.webp'; then
      chattr +i '$SAMPLES/portuguese/wordsearch/caça-palavras-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/portuguese/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/portuguese/wordsearch/caça-palavras-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: portuguese/wordsearch/Caça-Palavras 1 answer_key.webp -> portuguese/wordsearch/caça-palavras-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/portuguese/wordsearch/caça-palavras-1-answer-key.webp' '$SAMPLES/portuguese/wordsearch' 2>/dev/null; mv '$SAMPLES/portuguese/wordsearch/caça-palavras-1-answer-key.webp' '$SAMPLES/portuguese/wordsearch/Caça-Palavras 1 answer_key.webp'; chattr +i '$SAMPLES/portuguese/wordsearch/Caça-Palavras 1 answer_key.webp' '$SAMPLES/portuguese/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: portuguese/wordsearch/Caça-Palavras 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/portuguese/wordsearch/Caça-Palavras 1 answer_key.webp' '$SAMPLES/portuguese/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: portuguese/wordsearch/Caça-Palavras 1 answer_key.webp -> portuguese/wordsearch/caça-palavras-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/portuguese/wordsearch/caça-palavras-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: portuguese/wordsearch/Caça-Palavras 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# portuguese/cryptogram/Criptograma Ilustrado 5.webp → portuguese/cryptogram/criptograma-ilustrado-5.webp
if [ -f '$SAMPLES/portuguese/cryptogram/Criptograma Ilustrado 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/portuguese/cryptogram/Criptograma Ilustrado 5.webp' '$SAMPLES/portuguese/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/portuguese/cryptogram/Criptograma Ilustrado 5.webp' '$SAMPLES/portuguese/cryptogram/criptograma-ilustrado-5.webp'; then
      chattr +i '$SAMPLES/portuguese/cryptogram/criptograma-ilustrado-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/portuguese/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/portuguese/cryptogram/criptograma-ilustrado-5.webp' 2>/dev/null || true
      echo "  OK: portuguese/cryptogram/Criptograma Ilustrado 5.webp -> portuguese/cryptogram/criptograma-ilustrado-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/portuguese/cryptogram/criptograma-ilustrado-5.webp' '$SAMPLES/portuguese/cryptogram' 2>/dev/null; mv '$SAMPLES/portuguese/cryptogram/criptograma-ilustrado-5.webp' '$SAMPLES/portuguese/cryptogram/Criptograma Ilustrado 5.webp'; chattr +i '$SAMPLES/portuguese/cryptogram/Criptograma Ilustrado 5.webp' '$SAMPLES/portuguese/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: portuguese/cryptogram/Criptograma Ilustrado 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/portuguese/cryptogram/Criptograma Ilustrado 5.webp' '$SAMPLES/portuguese/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: portuguese/cryptogram/Criptograma Ilustrado 5.webp -> portuguese/cryptogram/criptograma-ilustrado-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/portuguese/cryptogram/criptograma-ilustrado-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: portuguese/cryptogram/Criptograma Ilustrado 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# portuguese/cryptogram/Criptograma Ilustrado 1 answer_key.webp → portuguese/cryptogram/criptograma-ilustrado-1-answer-key.webp
if [ -f '$SAMPLES/portuguese/cryptogram/Criptograma Ilustrado 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/portuguese/cryptogram/Criptograma Ilustrado 1 answer_key.webp' '$SAMPLES/portuguese/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/portuguese/cryptogram/Criptograma Ilustrado 1 answer_key.webp' '$SAMPLES/portuguese/cryptogram/criptograma-ilustrado-1-answer-key.webp'; then
      chattr +i '$SAMPLES/portuguese/cryptogram/criptograma-ilustrado-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/portuguese/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/portuguese/cryptogram/criptograma-ilustrado-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: portuguese/cryptogram/Criptograma Ilustrado 1 answer_key.webp -> portuguese/cryptogram/criptograma-ilustrado-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/portuguese/cryptogram/criptograma-ilustrado-1-answer-key.webp' '$SAMPLES/portuguese/cryptogram' 2>/dev/null; mv '$SAMPLES/portuguese/cryptogram/criptograma-ilustrado-1-answer-key.webp' '$SAMPLES/portuguese/cryptogram/Criptograma Ilustrado 1 answer_key.webp'; chattr +i '$SAMPLES/portuguese/cryptogram/Criptograma Ilustrado 1 answer_key.webp' '$SAMPLES/portuguese/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: portuguese/cryptogram/Criptograma Ilustrado 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/portuguese/cryptogram/Criptograma Ilustrado 1 answer_key.webp' '$SAMPLES/portuguese/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: portuguese/cryptogram/Criptograma Ilustrado 1 answer_key.webp -> portuguese/cryptogram/criptograma-ilustrado-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/portuguese/cryptogram/criptograma-ilustrado-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: portuguese/cryptogram/Criptograma Ilustrado 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# portuguese/crossword/Palavras Cruzadas 4.webp → portuguese/crossword/palavras-cruzadas-4.webp
if [ -f '$SAMPLES/portuguese/crossword/Palavras Cruzadas 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/portuguese/crossword/Palavras Cruzadas 4.webp' '$SAMPLES/portuguese/crossword' 2>/dev/null || true
    if mv '$SAMPLES/portuguese/crossword/Palavras Cruzadas 4.webp' '$SAMPLES/portuguese/crossword/palavras-cruzadas-4.webp'; then
      chattr +i '$SAMPLES/portuguese/crossword/palavras-cruzadas-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/portuguese/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/portuguese/crossword/palavras-cruzadas-4.webp' 2>/dev/null || true
      echo "  OK: portuguese/crossword/Palavras Cruzadas 4.webp -> portuguese/crossword/palavras-cruzadas-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/portuguese/crossword/palavras-cruzadas-4.webp' '$SAMPLES/portuguese/crossword' 2>/dev/null; mv '$SAMPLES/portuguese/crossword/palavras-cruzadas-4.webp' '$SAMPLES/portuguese/crossword/Palavras Cruzadas 4.webp'; chattr +i '$SAMPLES/portuguese/crossword/Palavras Cruzadas 4.webp' '$SAMPLES/portuguese/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: portuguese/crossword/Palavras Cruzadas 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/portuguese/crossword/Palavras Cruzadas 4.webp' '$SAMPLES/portuguese/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: portuguese/crossword/Palavras Cruzadas 4.webp -> portuguese/crossword/palavras-cruzadas-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/portuguese/crossword/palavras-cruzadas-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: portuguese/crossword/Palavras Cruzadas 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# portuguese/matching/Encontre os Pares 1 answer_key.webp → portuguese/matching/encontre-os-pares-1-answer-key.webp
if [ -f '$SAMPLES/portuguese/matching/Encontre os Pares 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/portuguese/matching/Encontre os Pares 1 answer_key.webp' '$SAMPLES/portuguese/matching' 2>/dev/null || true
    if mv '$SAMPLES/portuguese/matching/Encontre os Pares 1 answer_key.webp' '$SAMPLES/portuguese/matching/encontre-os-pares-1-answer-key.webp'; then
      chattr +i '$SAMPLES/portuguese/matching/encontre-os-pares-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/portuguese/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/portuguese/matching/encontre-os-pares-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: portuguese/matching/Encontre os Pares 1 answer_key.webp -> portuguese/matching/encontre-os-pares-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/portuguese/matching/encontre-os-pares-1-answer-key.webp' '$SAMPLES/portuguese/matching' 2>/dev/null; mv '$SAMPLES/portuguese/matching/encontre-os-pares-1-answer-key.webp' '$SAMPLES/portuguese/matching/Encontre os Pares 1 answer_key.webp'; chattr +i '$SAMPLES/portuguese/matching/Encontre os Pares 1 answer_key.webp' '$SAMPLES/portuguese/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: portuguese/matching/Encontre os Pares 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/portuguese/matching/Encontre os Pares 1 answer_key.webp' '$SAMPLES/portuguese/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: portuguese/matching/Encontre os Pares 1 answer_key.webp -> portuguese/matching/encontre-os-pares-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/portuguese/matching/encontre-os-pares-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: portuguese/matching/Encontre os Pares 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# portuguese/bingo/Bingo de Imagenes 1 callout.webp → portuguese/bingo/bingo-de-imagenes-1-callout.webp
if [ -f '$SAMPLES/portuguese/bingo/Bingo de Imagenes 1 callout.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/portuguese/bingo/Bingo de Imagenes 1 callout.webp' '$SAMPLES/portuguese/bingo' 2>/dev/null || true
    if mv '$SAMPLES/portuguese/bingo/Bingo de Imagenes 1 callout.webp' '$SAMPLES/portuguese/bingo/bingo-de-imagenes-1-callout.webp'; then
      chattr +i '$SAMPLES/portuguese/bingo/bingo-de-imagenes-1-callout.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/portuguese/bingo' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/portuguese/bingo/bingo-de-imagenes-1-callout.webp' 2>/dev/null || true
      echo "  OK: portuguese/bingo/Bingo de Imagenes 1 callout.webp -> portuguese/bingo/bingo-de-imagenes-1-callout.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/portuguese/bingo/bingo-de-imagenes-1-callout.webp' '$SAMPLES/portuguese/bingo' 2>/dev/null; mv '$SAMPLES/portuguese/bingo/bingo-de-imagenes-1-callout.webp' '$SAMPLES/portuguese/bingo/Bingo de Imagenes 1 callout.webp'; chattr +i '$SAMPLES/portuguese/bingo/Bingo de Imagenes 1 callout.webp' '$SAMPLES/portuguese/bingo' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: portuguese/bingo/Bingo de Imagenes 1 callout.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/portuguese/bingo/Bingo de Imagenes 1 callout.webp' '$SAMPLES/portuguese/bingo' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: portuguese/bingo/Bingo de Imagenes 1 callout.webp -> portuguese/bingo/bingo-de-imagenes-1-callout.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/portuguese/bingo/bingo-de-imagenes-1-callout.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: portuguese/bingo/Bingo de Imagenes 1 callout.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# italian/addition/Addizione Divertente 1 answer_key.webp → italian/addition/addizione-divertente-1-answer-key.webp
if [ -f '$SAMPLES/italian/addition/Addizione Divertente 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/italian/addition/Addizione Divertente 1 answer_key.webp' '$SAMPLES/italian/addition' 2>/dev/null || true
    if mv '$SAMPLES/italian/addition/Addizione Divertente 1 answer_key.webp' '$SAMPLES/italian/addition/addizione-divertente-1-answer-key.webp'; then
      chattr +i '$SAMPLES/italian/addition/addizione-divertente-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/italian/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/italian/addition/addizione-divertente-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: italian/addition/Addizione Divertente 1 answer_key.webp -> italian/addition/addizione-divertente-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/italian/addition/addizione-divertente-1-answer-key.webp' '$SAMPLES/italian/addition' 2>/dev/null; mv '$SAMPLES/italian/addition/addizione-divertente-1-answer-key.webp' '$SAMPLES/italian/addition/Addizione Divertente 1 answer_key.webp'; chattr +i '$SAMPLES/italian/addition/Addizione Divertente 1 answer_key.webp' '$SAMPLES/italian/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: italian/addition/Addizione Divertente 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/italian/addition/Addizione Divertente 1 answer_key.webp' '$SAMPLES/italian/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: italian/addition/Addizione Divertente 1 answer_key.webp -> italian/addition/addizione-divertente-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/italian/addition/addizione-divertente-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: italian/addition/Addizione Divertente 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# italian/subtraction/Sottrazioni Divertenti 1 answer_key.webp → italian/subtraction/sottrazioni-divertenti-1-answer-key.webp
if [ -f '$SAMPLES/italian/subtraction/Sottrazioni Divertenti 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/italian/subtraction/Sottrazioni Divertenti 1 answer_key.webp' '$SAMPLES/italian/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/italian/subtraction/Sottrazioni Divertenti 1 answer_key.webp' '$SAMPLES/italian/subtraction/sottrazioni-divertenti-1-answer-key.webp'; then
      chattr +i '$SAMPLES/italian/subtraction/sottrazioni-divertenti-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/italian/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/italian/subtraction/sottrazioni-divertenti-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: italian/subtraction/Sottrazioni Divertenti 1 answer_key.webp -> italian/subtraction/sottrazioni-divertenti-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/italian/subtraction/sottrazioni-divertenti-1-answer-key.webp' '$SAMPLES/italian/subtraction' 2>/dev/null; mv '$SAMPLES/italian/subtraction/sottrazioni-divertenti-1-answer-key.webp' '$SAMPLES/italian/subtraction/Sottrazioni Divertenti 1 answer_key.webp'; chattr +i '$SAMPLES/italian/subtraction/Sottrazioni Divertenti 1 answer_key.webp' '$SAMPLES/italian/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: italian/subtraction/Sottrazioni Divertenti 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/italian/subtraction/Sottrazioni Divertenti 1 answer_key.webp' '$SAMPLES/italian/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: italian/subtraction/Sottrazioni Divertenti 1 answer_key.webp -> italian/subtraction/sottrazioni-divertenti-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/italian/subtraction/sottrazioni-divertenti-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: italian/subtraction/Sottrazioni Divertenti 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# italian/prepositions/Preposizioni 1 answer_key.webp → italian/prepositions/preposizioni-1-answer-key.webp
if [ -f '$SAMPLES/italian/prepositions/Preposizioni 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/italian/prepositions/Preposizioni 1 answer_key.webp' '$SAMPLES/italian/prepositions' 2>/dev/null || true
    if mv '$SAMPLES/italian/prepositions/Preposizioni 1 answer_key.webp' '$SAMPLES/italian/prepositions/preposizioni-1-answer-key.webp'; then
      chattr +i '$SAMPLES/italian/prepositions/preposizioni-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/italian/prepositions' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/italian/prepositions/preposizioni-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: italian/prepositions/Preposizioni 1 answer_key.webp -> italian/prepositions/preposizioni-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/italian/prepositions/preposizioni-1-answer-key.webp' '$SAMPLES/italian/prepositions' 2>/dev/null; mv '$SAMPLES/italian/prepositions/preposizioni-1-answer-key.webp' '$SAMPLES/italian/prepositions/Preposizioni 1 answer_key.webp'; chattr +i '$SAMPLES/italian/prepositions/Preposizioni 1 answer_key.webp' '$SAMPLES/italian/prepositions' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: italian/prepositions/Preposizioni 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/italian/prepositions/Preposizioni 1 answer_key.webp' '$SAMPLES/italian/prepositions' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: italian/prepositions/Preposizioni 1 answer_key.webp -> italian/prepositions/preposizioni-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/italian/prepositions/preposizioni-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: italian/prepositions/Preposizioni 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# italian/wordsearch/Cerca Parole 5.webp → italian/wordsearch/cerca-parole-5.webp
if [ -f '$SAMPLES/italian/wordsearch/Cerca Parole 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/italian/wordsearch/Cerca Parole 5.webp' '$SAMPLES/italian/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/italian/wordsearch/Cerca Parole 5.webp' '$SAMPLES/italian/wordsearch/cerca-parole-5.webp'; then
      chattr +i '$SAMPLES/italian/wordsearch/cerca-parole-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/italian/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/italian/wordsearch/cerca-parole-5.webp' 2>/dev/null || true
      echo "  OK: italian/wordsearch/Cerca Parole 5.webp -> italian/wordsearch/cerca-parole-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/italian/wordsearch/cerca-parole-5.webp' '$SAMPLES/italian/wordsearch' 2>/dev/null; mv '$SAMPLES/italian/wordsearch/cerca-parole-5.webp' '$SAMPLES/italian/wordsearch/Cerca Parole 5.webp'; chattr +i '$SAMPLES/italian/wordsearch/Cerca Parole 5.webp' '$SAMPLES/italian/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: italian/wordsearch/Cerca Parole 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/italian/wordsearch/Cerca Parole 5.webp' '$SAMPLES/italian/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: italian/wordsearch/Cerca Parole 5.webp -> italian/wordsearch/cerca-parole-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/italian/wordsearch/cerca-parole-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: italian/wordsearch/Cerca Parole 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# italian/wordsearch/Cerca Parole 1 answer_key.webp → italian/wordsearch/cerca-parole-1-answer-key.webp
if [ -f '$SAMPLES/italian/wordsearch/Cerca Parole 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/italian/wordsearch/Cerca Parole 1 answer_key.webp' '$SAMPLES/italian/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/italian/wordsearch/Cerca Parole 1 answer_key.webp' '$SAMPLES/italian/wordsearch/cerca-parole-1-answer-key.webp'; then
      chattr +i '$SAMPLES/italian/wordsearch/cerca-parole-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/italian/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/italian/wordsearch/cerca-parole-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: italian/wordsearch/Cerca Parole 1 answer_key.webp -> italian/wordsearch/cerca-parole-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/italian/wordsearch/cerca-parole-1-answer-key.webp' '$SAMPLES/italian/wordsearch' 2>/dev/null; mv '$SAMPLES/italian/wordsearch/cerca-parole-1-answer-key.webp' '$SAMPLES/italian/wordsearch/Cerca Parole 1 answer_key.webp'; chattr +i '$SAMPLES/italian/wordsearch/Cerca Parole 1 answer_key.webp' '$SAMPLES/italian/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: italian/wordsearch/Cerca Parole 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/italian/wordsearch/Cerca Parole 1 answer_key.webp' '$SAMPLES/italian/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: italian/wordsearch/Cerca Parole 1 answer_key.webp -> italian/wordsearch/cerca-parole-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/italian/wordsearch/cerca-parole-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: italian/wordsearch/Cerca Parole 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# italian/crossword/Cruciverba con Immagini 3.webp → italian/crossword/cruciverba-con-immagini-3.webp
if [ -f '$SAMPLES/italian/crossword/Cruciverba con Immagini 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/italian/crossword/Cruciverba con Immagini 3.webp' '$SAMPLES/italian/crossword' 2>/dev/null || true
    if mv '$SAMPLES/italian/crossword/Cruciverba con Immagini 3.webp' '$SAMPLES/italian/crossword/cruciverba-con-immagini-3.webp'; then
      chattr +i '$SAMPLES/italian/crossword/cruciverba-con-immagini-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/italian/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/italian/crossword/cruciverba-con-immagini-3.webp' 2>/dev/null || true
      echo "  OK: italian/crossword/Cruciverba con Immagini 3.webp -> italian/crossword/cruciverba-con-immagini-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/italian/crossword/cruciverba-con-immagini-3.webp' '$SAMPLES/italian/crossword' 2>/dev/null; mv '$SAMPLES/italian/crossword/cruciverba-con-immagini-3.webp' '$SAMPLES/italian/crossword/Cruciverba con Immagini 3.webp'; chattr +i '$SAMPLES/italian/crossword/Cruciverba con Immagini 3.webp' '$SAMPLES/italian/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: italian/crossword/Cruciverba con Immagini 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/italian/crossword/Cruciverba con Immagini 3.webp' '$SAMPLES/italian/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: italian/crossword/Cruciverba con Immagini 3.webp -> italian/crossword/cruciverba-con-immagini-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/italian/crossword/cruciverba-con-immagini-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: italian/crossword/Cruciverba con Immagini 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# italian/crossword/Cruciverba con Immagini 4.webp → italian/crossword/cruciverba-con-immagini-4.webp
if [ -f '$SAMPLES/italian/crossword/Cruciverba con Immagini 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/italian/crossword/Cruciverba con Immagini 4.webp' '$SAMPLES/italian/crossword' 2>/dev/null || true
    if mv '$SAMPLES/italian/crossword/Cruciverba con Immagini 4.webp' '$SAMPLES/italian/crossword/cruciverba-con-immagini-4.webp'; then
      chattr +i '$SAMPLES/italian/crossword/cruciverba-con-immagini-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/italian/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/italian/crossword/cruciverba-con-immagini-4.webp' 2>/dev/null || true
      echo "  OK: italian/crossword/Cruciverba con Immagini 4.webp -> italian/crossword/cruciverba-con-immagini-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/italian/crossword/cruciverba-con-immagini-4.webp' '$SAMPLES/italian/crossword' 2>/dev/null; mv '$SAMPLES/italian/crossword/cruciverba-con-immagini-4.webp' '$SAMPLES/italian/crossword/Cruciverba con Immagini 4.webp'; chattr +i '$SAMPLES/italian/crossword/Cruciverba con Immagini 4.webp' '$SAMPLES/italian/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: italian/crossword/Cruciverba con Immagini 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/italian/crossword/Cruciverba con Immagini 4.webp' '$SAMPLES/italian/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: italian/crossword/Cruciverba con Immagini 4.webp -> italian/crossword/cruciverba-con-immagini-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/italian/crossword/cruciverba-con-immagini-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: italian/crossword/Cruciverba con Immagini 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# italian/matching/Trova le Coppie 1 answer_key.webp → italian/matching/trova-le-coppie-1-answer-key.webp
if [ -f '$SAMPLES/italian/matching/Trova le Coppie 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/italian/matching/Trova le Coppie 1 answer_key.webp' '$SAMPLES/italian/matching' 2>/dev/null || true
    if mv '$SAMPLES/italian/matching/Trova le Coppie 1 answer_key.webp' '$SAMPLES/italian/matching/trova-le-coppie-1-answer-key.webp'; then
      chattr +i '$SAMPLES/italian/matching/trova-le-coppie-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/italian/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/italian/matching/trova-le-coppie-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: italian/matching/Trova le Coppie 1 answer_key.webp -> italian/matching/trova-le-coppie-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/italian/matching/trova-le-coppie-1-answer-key.webp' '$SAMPLES/italian/matching' 2>/dev/null; mv '$SAMPLES/italian/matching/trova-le-coppie-1-answer-key.webp' '$SAMPLES/italian/matching/Trova le Coppie 1 answer_key.webp'; chattr +i '$SAMPLES/italian/matching/Trova le Coppie 1 answer_key.webp' '$SAMPLES/italian/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: italian/matching/Trova le Coppie 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/italian/matching/Trova le Coppie 1 answer_key.webp' '$SAMPLES/italian/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: italian/matching/Trova le Coppie 1 answer_key.webp -> italian/matching/trova-le-coppie-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/italian/matching/trova-le-coppie-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: italian/matching/Trova le Coppie 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# italian/sudoku/Sudoku con Immagini 4.webp → italian/sudoku/sudoku-con-immagini-4.webp
if [ -f '$SAMPLES/italian/sudoku/Sudoku con Immagini 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/italian/sudoku/Sudoku con Immagini 4.webp' '$SAMPLES/italian/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/italian/sudoku/Sudoku con Immagini 4.webp' '$SAMPLES/italian/sudoku/sudoku-con-immagini-4.webp'; then
      chattr +i '$SAMPLES/italian/sudoku/sudoku-con-immagini-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/italian/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/italian/sudoku/sudoku-con-immagini-4.webp' 2>/dev/null || true
      echo "  OK: italian/sudoku/Sudoku con Immagini 4.webp -> italian/sudoku/sudoku-con-immagini-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/italian/sudoku/sudoku-con-immagini-4.webp' '$SAMPLES/italian/sudoku' 2>/dev/null; mv '$SAMPLES/italian/sudoku/sudoku-con-immagini-4.webp' '$SAMPLES/italian/sudoku/Sudoku con Immagini 4.webp'; chattr +i '$SAMPLES/italian/sudoku/Sudoku con Immagini 4.webp' '$SAMPLES/italian/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: italian/sudoku/Sudoku con Immagini 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/italian/sudoku/Sudoku con Immagini 4.webp' '$SAMPLES/italian/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: italian/sudoku/Sudoku con Immagini 4.webp -> italian/sudoku/sudoku-con-immagini-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/italian/sudoku/sudoku-con-immagini-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: italian/sudoku/Sudoku con Immagini 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/addition/Optellen is Leuk 3.webp → dutch/addition/optellen-is-leuk-3.webp
if [ -f '$SAMPLES/dutch/addition/Optellen is Leuk 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/addition/Optellen is Leuk 3.webp' '$SAMPLES/dutch/addition' 2>/dev/null || true
    if mv '$SAMPLES/dutch/addition/Optellen is Leuk 3.webp' '$SAMPLES/dutch/addition/optellen-is-leuk-3.webp'; then
      chattr +i '$SAMPLES/dutch/addition/optellen-is-leuk-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/addition/optellen-is-leuk-3.webp' 2>/dev/null || true
      echo "  OK: dutch/addition/Optellen is Leuk 3.webp -> dutch/addition/optellen-is-leuk-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/addition/optellen-is-leuk-3.webp' '$SAMPLES/dutch/addition' 2>/dev/null; mv '$SAMPLES/dutch/addition/optellen-is-leuk-3.webp' '$SAMPLES/dutch/addition/Optellen is Leuk 3.webp'; chattr +i '$SAMPLES/dutch/addition/Optellen is Leuk 3.webp' '$SAMPLES/dutch/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/addition/Optellen is Leuk 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/addition/Optellen is Leuk 3.webp' '$SAMPLES/dutch/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/addition/Optellen is Leuk 3.webp -> dutch/addition/optellen-is-leuk-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/addition/optellen-is-leuk-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/addition/Optellen is Leuk 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/addition/Optellen is Leuk 4.webp → dutch/addition/optellen-is-leuk-4.webp
if [ -f '$SAMPLES/dutch/addition/Optellen is Leuk 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/addition/Optellen is Leuk 4.webp' '$SAMPLES/dutch/addition' 2>/dev/null || true
    if mv '$SAMPLES/dutch/addition/Optellen is Leuk 4.webp' '$SAMPLES/dutch/addition/optellen-is-leuk-4.webp'; then
      chattr +i '$SAMPLES/dutch/addition/optellen-is-leuk-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/addition/optellen-is-leuk-4.webp' 2>/dev/null || true
      echo "  OK: dutch/addition/Optellen is Leuk 4.webp -> dutch/addition/optellen-is-leuk-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/addition/optellen-is-leuk-4.webp' '$SAMPLES/dutch/addition' 2>/dev/null; mv '$SAMPLES/dutch/addition/optellen-is-leuk-4.webp' '$SAMPLES/dutch/addition/Optellen is Leuk 4.webp'; chattr +i '$SAMPLES/dutch/addition/Optellen is Leuk 4.webp' '$SAMPLES/dutch/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/addition/Optellen is Leuk 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/addition/Optellen is Leuk 4.webp' '$SAMPLES/dutch/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/addition/Optellen is Leuk 4.webp -> dutch/addition/optellen-is-leuk-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/addition/optellen-is-leuk-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/addition/Optellen is Leuk 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/addition/Optellen is Leuk 1 answer_key.webp → dutch/addition/optellen-is-leuk-1-answer-key.webp
if [ -f '$SAMPLES/dutch/addition/Optellen is Leuk 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/addition/Optellen is Leuk 1 answer_key.webp' '$SAMPLES/dutch/addition' 2>/dev/null || true
    if mv '$SAMPLES/dutch/addition/Optellen is Leuk 1 answer_key.webp' '$SAMPLES/dutch/addition/optellen-is-leuk-1-answer-key.webp'; then
      chattr +i '$SAMPLES/dutch/addition/optellen-is-leuk-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/addition/optellen-is-leuk-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: dutch/addition/Optellen is Leuk 1 answer_key.webp -> dutch/addition/optellen-is-leuk-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/addition/optellen-is-leuk-1-answer-key.webp' '$SAMPLES/dutch/addition' 2>/dev/null; mv '$SAMPLES/dutch/addition/optellen-is-leuk-1-answer-key.webp' '$SAMPLES/dutch/addition/Optellen is Leuk 1 answer_key.webp'; chattr +i '$SAMPLES/dutch/addition/Optellen is Leuk 1 answer_key.webp' '$SAMPLES/dutch/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/addition/Optellen is Leuk 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/addition/Optellen is Leuk 1 answer_key.webp' '$SAMPLES/dutch/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/addition/Optellen is Leuk 1 answer_key.webp -> dutch/addition/optellen-is-leuk-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/addition/optellen-is-leuk-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/addition/Optellen is Leuk 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/subtraction/Aftrekken is Leuk 2.webp → dutch/subtraction/aftrekken-is-leuk-2.webp
if [ -f '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 2.webp' '$SAMPLES/dutch/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 2.webp' '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-2.webp'; then
      chattr +i '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-2.webp' 2>/dev/null || true
      echo "  OK: dutch/subtraction/Aftrekken is Leuk 2.webp -> dutch/subtraction/aftrekken-is-leuk-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-2.webp' '$SAMPLES/dutch/subtraction' 2>/dev/null; mv '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-2.webp' '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 2.webp'; chattr +i '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 2.webp' '$SAMPLES/dutch/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/subtraction/Aftrekken is Leuk 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 2.webp' '$SAMPLES/dutch/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/subtraction/Aftrekken is Leuk 2.webp -> dutch/subtraction/aftrekken-is-leuk-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/subtraction/Aftrekken is Leuk 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/subtraction/Aftrekken is Leuk 4.webp → dutch/subtraction/aftrekken-is-leuk-4.webp
if [ -f '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 4.webp' '$SAMPLES/dutch/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 4.webp' '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-4.webp'; then
      chattr +i '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-4.webp' 2>/dev/null || true
      echo "  OK: dutch/subtraction/Aftrekken is Leuk 4.webp -> dutch/subtraction/aftrekken-is-leuk-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-4.webp' '$SAMPLES/dutch/subtraction' 2>/dev/null; mv '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-4.webp' '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 4.webp'; chattr +i '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 4.webp' '$SAMPLES/dutch/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/subtraction/Aftrekken is Leuk 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 4.webp' '$SAMPLES/dutch/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/subtraction/Aftrekken is Leuk 4.webp -> dutch/subtraction/aftrekken-is-leuk-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/subtraction/Aftrekken is Leuk 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/subtraction/Aftrekken is Leuk 5.webp → dutch/subtraction/aftrekken-is-leuk-5.webp
if [ -f '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 5.webp' '$SAMPLES/dutch/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 5.webp' '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-5.webp'; then
      chattr +i '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-5.webp' 2>/dev/null || true
      echo "  OK: dutch/subtraction/Aftrekken is Leuk 5.webp -> dutch/subtraction/aftrekken-is-leuk-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-5.webp' '$SAMPLES/dutch/subtraction' 2>/dev/null; mv '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-5.webp' '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 5.webp'; chattr +i '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 5.webp' '$SAMPLES/dutch/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/subtraction/Aftrekken is Leuk 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 5.webp' '$SAMPLES/dutch/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/subtraction/Aftrekken is Leuk 5.webp -> dutch/subtraction/aftrekken-is-leuk-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/subtraction/Aftrekken is Leuk 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/subtraction/Aftrekken is Leuk 6.webp → dutch/subtraction/aftrekken-is-leuk-6.webp
if [ -f '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 6.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 6.webp' '$SAMPLES/dutch/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 6.webp' '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-6.webp'; then
      chattr +i '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-6.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-6.webp' 2>/dev/null || true
      echo "  OK: dutch/subtraction/Aftrekken is Leuk 6.webp -> dutch/subtraction/aftrekken-is-leuk-6.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-6.webp' '$SAMPLES/dutch/subtraction' 2>/dev/null; mv '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-6.webp' '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 6.webp'; chattr +i '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 6.webp' '$SAMPLES/dutch/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/subtraction/Aftrekken is Leuk 6.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 6.webp' '$SAMPLES/dutch/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/subtraction/Aftrekken is Leuk 6.webp -> dutch/subtraction/aftrekken-is-leuk-6.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-6.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/subtraction/Aftrekken is Leuk 6.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/subtraction/Aftrekken is Leuk 1 answer_key.webp → dutch/subtraction/aftrekken-is-leuk-1-answer-key.webp
if [ -f '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 1 answer_key.webp' '$SAMPLES/dutch/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 1 answer_key.webp' '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-1-answer-key.webp'; then
      chattr +i '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: dutch/subtraction/Aftrekken is Leuk 1 answer_key.webp -> dutch/subtraction/aftrekken-is-leuk-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-1-answer-key.webp' '$SAMPLES/dutch/subtraction' 2>/dev/null; mv '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-1-answer-key.webp' '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 1 answer_key.webp'; chattr +i '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 1 answer_key.webp' '$SAMPLES/dutch/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/subtraction/Aftrekken is Leuk 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/subtraction/Aftrekken is Leuk 1 answer_key.webp' '$SAMPLES/dutch/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/subtraction/Aftrekken is Leuk 1 answer_key.webp -> dutch/subtraction/aftrekken-is-leuk-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/subtraction/aftrekken-is-leuk-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/subtraction/Aftrekken is Leuk 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/prepositions/Voorzetsels 2.webp → dutch/prepositions/voorzetsels-2.webp
if [ -f '$SAMPLES/dutch/prepositions/Voorzetsels 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/prepositions/Voorzetsels 2.webp' '$SAMPLES/dutch/prepositions' 2>/dev/null || true
    if mv '$SAMPLES/dutch/prepositions/Voorzetsels 2.webp' '$SAMPLES/dutch/prepositions/voorzetsels-2.webp'; then
      chattr +i '$SAMPLES/dutch/prepositions/voorzetsels-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/prepositions' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/prepositions/voorzetsels-2.webp' 2>/dev/null || true
      echo "  OK: dutch/prepositions/Voorzetsels 2.webp -> dutch/prepositions/voorzetsels-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/prepositions/voorzetsels-2.webp' '$SAMPLES/dutch/prepositions' 2>/dev/null; mv '$SAMPLES/dutch/prepositions/voorzetsels-2.webp' '$SAMPLES/dutch/prepositions/Voorzetsels 2.webp'; chattr +i '$SAMPLES/dutch/prepositions/Voorzetsels 2.webp' '$SAMPLES/dutch/prepositions' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/prepositions/Voorzetsels 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/prepositions/Voorzetsels 2.webp' '$SAMPLES/dutch/prepositions' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/prepositions/Voorzetsels 2.webp -> dutch/prepositions/voorzetsels-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/prepositions/voorzetsels-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/prepositions/Voorzetsels 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/prepositions/Voorzetsels 4.webp → dutch/prepositions/voorzetsels-4.webp
if [ -f '$SAMPLES/dutch/prepositions/Voorzetsels 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/prepositions/Voorzetsels 4.webp' '$SAMPLES/dutch/prepositions' 2>/dev/null || true
    if mv '$SAMPLES/dutch/prepositions/Voorzetsels 4.webp' '$SAMPLES/dutch/prepositions/voorzetsels-4.webp'; then
      chattr +i '$SAMPLES/dutch/prepositions/voorzetsels-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/prepositions' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/prepositions/voorzetsels-4.webp' 2>/dev/null || true
      echo "  OK: dutch/prepositions/Voorzetsels 4.webp -> dutch/prepositions/voorzetsels-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/prepositions/voorzetsels-4.webp' '$SAMPLES/dutch/prepositions' 2>/dev/null; mv '$SAMPLES/dutch/prepositions/voorzetsels-4.webp' '$SAMPLES/dutch/prepositions/Voorzetsels 4.webp'; chattr +i '$SAMPLES/dutch/prepositions/Voorzetsels 4.webp' '$SAMPLES/dutch/prepositions' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/prepositions/Voorzetsels 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/prepositions/Voorzetsels 4.webp' '$SAMPLES/dutch/prepositions' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/prepositions/Voorzetsels 4.webp -> dutch/prepositions/voorzetsels-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/prepositions/voorzetsels-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/prepositions/Voorzetsels 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/prepositions/Voorzetsels 1 answer_key.webp → dutch/prepositions/voorzetsels-1-answer-key.webp
if [ -f '$SAMPLES/dutch/prepositions/Voorzetsels 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/prepositions/Voorzetsels 1 answer_key.webp' '$SAMPLES/dutch/prepositions' 2>/dev/null || true
    if mv '$SAMPLES/dutch/prepositions/Voorzetsels 1 answer_key.webp' '$SAMPLES/dutch/prepositions/voorzetsels-1-answer-key.webp'; then
      chattr +i '$SAMPLES/dutch/prepositions/voorzetsels-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/prepositions' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/prepositions/voorzetsels-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: dutch/prepositions/Voorzetsels 1 answer_key.webp -> dutch/prepositions/voorzetsels-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/prepositions/voorzetsels-1-answer-key.webp' '$SAMPLES/dutch/prepositions' 2>/dev/null; mv '$SAMPLES/dutch/prepositions/voorzetsels-1-answer-key.webp' '$SAMPLES/dutch/prepositions/Voorzetsels 1 answer_key.webp'; chattr +i '$SAMPLES/dutch/prepositions/Voorzetsels 1 answer_key.webp' '$SAMPLES/dutch/prepositions' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/prepositions/Voorzetsels 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/prepositions/Voorzetsels 1 answer_key.webp' '$SAMPLES/dutch/prepositions' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/prepositions/Voorzetsels 1 answer_key.webp -> dutch/prepositions/voorzetsels-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/prepositions/voorzetsels-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/prepositions/Voorzetsels 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/wordsearch/Woordzoeker 3.webp → dutch/wordsearch/woordzoeker-3.webp
if [ -f '$SAMPLES/dutch/wordsearch/Woordzoeker 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/wordsearch/Woordzoeker 3.webp' '$SAMPLES/dutch/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/dutch/wordsearch/Woordzoeker 3.webp' '$SAMPLES/dutch/wordsearch/woordzoeker-3.webp'; then
      chattr +i '$SAMPLES/dutch/wordsearch/woordzoeker-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/wordsearch/woordzoeker-3.webp' 2>/dev/null || true
      echo "  OK: dutch/wordsearch/Woordzoeker 3.webp -> dutch/wordsearch/woordzoeker-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/wordsearch/woordzoeker-3.webp' '$SAMPLES/dutch/wordsearch' 2>/dev/null; mv '$SAMPLES/dutch/wordsearch/woordzoeker-3.webp' '$SAMPLES/dutch/wordsearch/Woordzoeker 3.webp'; chattr +i '$SAMPLES/dutch/wordsearch/Woordzoeker 3.webp' '$SAMPLES/dutch/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/wordsearch/Woordzoeker 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/wordsearch/Woordzoeker 3.webp' '$SAMPLES/dutch/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/wordsearch/Woordzoeker 3.webp -> dutch/wordsearch/woordzoeker-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/wordsearch/woordzoeker-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/wordsearch/Woordzoeker 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/wordsearch/Woordzoeker 4.webp → dutch/wordsearch/woordzoeker-4.webp
if [ -f '$SAMPLES/dutch/wordsearch/Woordzoeker 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/wordsearch/Woordzoeker 4.webp' '$SAMPLES/dutch/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/dutch/wordsearch/Woordzoeker 4.webp' '$SAMPLES/dutch/wordsearch/woordzoeker-4.webp'; then
      chattr +i '$SAMPLES/dutch/wordsearch/woordzoeker-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/wordsearch/woordzoeker-4.webp' 2>/dev/null || true
      echo "  OK: dutch/wordsearch/Woordzoeker 4.webp -> dutch/wordsearch/woordzoeker-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/wordsearch/woordzoeker-4.webp' '$SAMPLES/dutch/wordsearch' 2>/dev/null; mv '$SAMPLES/dutch/wordsearch/woordzoeker-4.webp' '$SAMPLES/dutch/wordsearch/Woordzoeker 4.webp'; chattr +i '$SAMPLES/dutch/wordsearch/Woordzoeker 4.webp' '$SAMPLES/dutch/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/wordsearch/Woordzoeker 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/wordsearch/Woordzoeker 4.webp' '$SAMPLES/dutch/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/wordsearch/Woordzoeker 4.webp -> dutch/wordsearch/woordzoeker-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/wordsearch/woordzoeker-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/wordsearch/Woordzoeker 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/wordsearch/Woordzoeker 1 answer_key.webp → dutch/wordsearch/woordzoeker-1-answer-key.webp
if [ -f '$SAMPLES/dutch/wordsearch/Woordzoeker 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/wordsearch/Woordzoeker 1 answer_key.webp' '$SAMPLES/dutch/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/dutch/wordsearch/Woordzoeker 1 answer_key.webp' '$SAMPLES/dutch/wordsearch/woordzoeker-1-answer-key.webp'; then
      chattr +i '$SAMPLES/dutch/wordsearch/woordzoeker-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/wordsearch/woordzoeker-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: dutch/wordsearch/Woordzoeker 1 answer_key.webp -> dutch/wordsearch/woordzoeker-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/wordsearch/woordzoeker-1-answer-key.webp' '$SAMPLES/dutch/wordsearch' 2>/dev/null; mv '$SAMPLES/dutch/wordsearch/woordzoeker-1-answer-key.webp' '$SAMPLES/dutch/wordsearch/Woordzoeker 1 answer_key.webp'; chattr +i '$SAMPLES/dutch/wordsearch/Woordzoeker 1 answer_key.webp' '$SAMPLES/dutch/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/wordsearch/Woordzoeker 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/wordsearch/Woordzoeker 1 answer_key.webp' '$SAMPLES/dutch/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/wordsearch/Woordzoeker 1 answer_key.webp -> dutch/wordsearch/woordzoeker-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/wordsearch/woordzoeker-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/wordsearch/Woordzoeker 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/cryptogram/Plaatjes Cryptogram 3.webp → dutch/cryptogram/plaatjes-cryptogram-3.webp
if [ -f '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 3.webp' '$SAMPLES/dutch/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 3.webp' '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-3.webp'; then
      chattr +i '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-3.webp' 2>/dev/null || true
      echo "  OK: dutch/cryptogram/Plaatjes Cryptogram 3.webp -> dutch/cryptogram/plaatjes-cryptogram-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-3.webp' '$SAMPLES/dutch/cryptogram' 2>/dev/null; mv '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-3.webp' '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 3.webp'; chattr +i '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 3.webp' '$SAMPLES/dutch/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/cryptogram/Plaatjes Cryptogram 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 3.webp' '$SAMPLES/dutch/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/cryptogram/Plaatjes Cryptogram 3.webp -> dutch/cryptogram/plaatjes-cryptogram-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/cryptogram/Plaatjes Cryptogram 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/cryptogram/Plaatjes Cryptogram 4.webp → dutch/cryptogram/plaatjes-cryptogram-4.webp
if [ -f '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 4.webp' '$SAMPLES/dutch/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 4.webp' '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-4.webp'; then
      chattr +i '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-4.webp' 2>/dev/null || true
      echo "  OK: dutch/cryptogram/Plaatjes Cryptogram 4.webp -> dutch/cryptogram/plaatjes-cryptogram-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-4.webp' '$SAMPLES/dutch/cryptogram' 2>/dev/null; mv '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-4.webp' '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 4.webp'; chattr +i '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 4.webp' '$SAMPLES/dutch/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/cryptogram/Plaatjes Cryptogram 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 4.webp' '$SAMPLES/dutch/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/cryptogram/Plaatjes Cryptogram 4.webp -> dutch/cryptogram/plaatjes-cryptogram-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/cryptogram/Plaatjes Cryptogram 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/cryptogram/Plaatjes Cryptogram 5.webp → dutch/cryptogram/plaatjes-cryptogram-5.webp
if [ -f '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 5.webp' '$SAMPLES/dutch/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 5.webp' '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-5.webp'; then
      chattr +i '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-5.webp' 2>/dev/null || true
      echo "  OK: dutch/cryptogram/Plaatjes Cryptogram 5.webp -> dutch/cryptogram/plaatjes-cryptogram-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-5.webp' '$SAMPLES/dutch/cryptogram' 2>/dev/null; mv '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-5.webp' '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 5.webp'; chattr +i '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 5.webp' '$SAMPLES/dutch/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/cryptogram/Plaatjes Cryptogram 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 5.webp' '$SAMPLES/dutch/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/cryptogram/Plaatjes Cryptogram 5.webp -> dutch/cryptogram/plaatjes-cryptogram-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/cryptogram/Plaatjes Cryptogram 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/cryptogram/Plaatjes Cryptogram 1 answer_key.webp → dutch/cryptogram/plaatjes-cryptogram-1-answer-key.webp
if [ -f '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 1 answer_key.webp' '$SAMPLES/dutch/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 1 answer_key.webp' '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-1-answer-key.webp'; then
      chattr +i '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: dutch/cryptogram/Plaatjes Cryptogram 1 answer_key.webp -> dutch/cryptogram/plaatjes-cryptogram-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-1-answer-key.webp' '$SAMPLES/dutch/cryptogram' 2>/dev/null; mv '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-1-answer-key.webp' '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 1 answer_key.webp'; chattr +i '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 1 answer_key.webp' '$SAMPLES/dutch/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/cryptogram/Plaatjes Cryptogram 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/cryptogram/Plaatjes Cryptogram 1 answer_key.webp' '$SAMPLES/dutch/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/cryptogram/Plaatjes Cryptogram 1 answer_key.webp -> dutch/cryptogram/plaatjes-cryptogram-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/cryptogram/plaatjes-cryptogram-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/cryptogram/Plaatjes Cryptogram 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/matching/Zoek de Paren 2.webp → dutch/matching/zoek-de-paren-2.webp
if [ -f '$SAMPLES/dutch/matching/Zoek de Paren 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/matching/Zoek de Paren 2.webp' '$SAMPLES/dutch/matching' 2>/dev/null || true
    if mv '$SAMPLES/dutch/matching/Zoek de Paren 2.webp' '$SAMPLES/dutch/matching/zoek-de-paren-2.webp'; then
      chattr +i '$SAMPLES/dutch/matching/zoek-de-paren-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/matching/zoek-de-paren-2.webp' 2>/dev/null || true
      echo "  OK: dutch/matching/Zoek de Paren 2.webp -> dutch/matching/zoek-de-paren-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/matching/zoek-de-paren-2.webp' '$SAMPLES/dutch/matching' 2>/dev/null; mv '$SAMPLES/dutch/matching/zoek-de-paren-2.webp' '$SAMPLES/dutch/matching/Zoek de Paren 2.webp'; chattr +i '$SAMPLES/dutch/matching/Zoek de Paren 2.webp' '$SAMPLES/dutch/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/matching/Zoek de Paren 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/matching/Zoek de Paren 2.webp' '$SAMPLES/dutch/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/matching/Zoek de Paren 2.webp -> dutch/matching/zoek-de-paren-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/matching/zoek-de-paren-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/matching/Zoek de Paren 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/matching/Zoek de Paren 4.webp → dutch/matching/zoek-de-paren-4.webp
if [ -f '$SAMPLES/dutch/matching/Zoek de Paren 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/matching/Zoek de Paren 4.webp' '$SAMPLES/dutch/matching' 2>/dev/null || true
    if mv '$SAMPLES/dutch/matching/Zoek de Paren 4.webp' '$SAMPLES/dutch/matching/zoek-de-paren-4.webp'; then
      chattr +i '$SAMPLES/dutch/matching/zoek-de-paren-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/matching/zoek-de-paren-4.webp' 2>/dev/null || true
      echo "  OK: dutch/matching/Zoek de Paren 4.webp -> dutch/matching/zoek-de-paren-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/matching/zoek-de-paren-4.webp' '$SAMPLES/dutch/matching' 2>/dev/null; mv '$SAMPLES/dutch/matching/zoek-de-paren-4.webp' '$SAMPLES/dutch/matching/Zoek de Paren 4.webp'; chattr +i '$SAMPLES/dutch/matching/Zoek de Paren 4.webp' '$SAMPLES/dutch/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/matching/Zoek de Paren 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/matching/Zoek de Paren 4.webp' '$SAMPLES/dutch/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/matching/Zoek de Paren 4.webp -> dutch/matching/zoek-de-paren-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/matching/zoek-de-paren-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/matching/Zoek de Paren 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/matching/Zoek de Paren 1 answer_key.webp → dutch/matching/zoek-de-paren-1-answer-key.webp
if [ -f '$SAMPLES/dutch/matching/Zoek de Paren 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/matching/Zoek de Paren 1 answer_key.webp' '$SAMPLES/dutch/matching' 2>/dev/null || true
    if mv '$SAMPLES/dutch/matching/Zoek de Paren 1 answer_key.webp' '$SAMPLES/dutch/matching/zoek-de-paren-1-answer-key.webp'; then
      chattr +i '$SAMPLES/dutch/matching/zoek-de-paren-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/matching/zoek-de-paren-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: dutch/matching/Zoek de Paren 1 answer_key.webp -> dutch/matching/zoek-de-paren-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/matching/zoek-de-paren-1-answer-key.webp' '$SAMPLES/dutch/matching' 2>/dev/null; mv '$SAMPLES/dutch/matching/zoek-de-paren-1-answer-key.webp' '$SAMPLES/dutch/matching/Zoek de Paren 1 answer_key.webp'; chattr +i '$SAMPLES/dutch/matching/Zoek de Paren 1 answer_key.webp' '$SAMPLES/dutch/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/matching/Zoek de Paren 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/matching/Zoek de Paren 1 answer_key.webp' '$SAMPLES/dutch/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/matching/Zoek de Paren 1 answer_key.webp -> dutch/matching/zoek-de-paren-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/matching/zoek-de-paren-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/matching/Zoek de Paren 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/bingo/Plaatjesbingo 2.webp → dutch/bingo/plaatjesbingo-2.webp
if [ -f '$SAMPLES/dutch/bingo/Plaatjesbingo 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/bingo/Plaatjesbingo 2.webp' '$SAMPLES/dutch/bingo' 2>/dev/null || true
    if mv '$SAMPLES/dutch/bingo/Plaatjesbingo 2.webp' '$SAMPLES/dutch/bingo/plaatjesbingo-2.webp'; then
      chattr +i '$SAMPLES/dutch/bingo/plaatjesbingo-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/bingo' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/bingo/plaatjesbingo-2.webp' 2>/dev/null || true
      echo "  OK: dutch/bingo/Plaatjesbingo 2.webp -> dutch/bingo/plaatjesbingo-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/bingo/plaatjesbingo-2.webp' '$SAMPLES/dutch/bingo' 2>/dev/null; mv '$SAMPLES/dutch/bingo/plaatjesbingo-2.webp' '$SAMPLES/dutch/bingo/Plaatjesbingo 2.webp'; chattr +i '$SAMPLES/dutch/bingo/Plaatjesbingo 2.webp' '$SAMPLES/dutch/bingo' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/bingo/Plaatjesbingo 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/bingo/Plaatjesbingo 2.webp' '$SAMPLES/dutch/bingo' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/bingo/Plaatjesbingo 2.webp -> dutch/bingo/plaatjesbingo-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/bingo/plaatjesbingo-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/bingo/Plaatjesbingo 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/bingo/Plaatjesbingo 3.webp → dutch/bingo/plaatjesbingo-3.webp
if [ -f '$SAMPLES/dutch/bingo/Plaatjesbingo 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/bingo/Plaatjesbingo 3.webp' '$SAMPLES/dutch/bingo' 2>/dev/null || true
    if mv '$SAMPLES/dutch/bingo/Plaatjesbingo 3.webp' '$SAMPLES/dutch/bingo/plaatjesbingo-3.webp'; then
      chattr +i '$SAMPLES/dutch/bingo/plaatjesbingo-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/bingo' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/bingo/plaatjesbingo-3.webp' 2>/dev/null || true
      echo "  OK: dutch/bingo/Plaatjesbingo 3.webp -> dutch/bingo/plaatjesbingo-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/bingo/plaatjesbingo-3.webp' '$SAMPLES/dutch/bingo' 2>/dev/null; mv '$SAMPLES/dutch/bingo/plaatjesbingo-3.webp' '$SAMPLES/dutch/bingo/Plaatjesbingo 3.webp'; chattr +i '$SAMPLES/dutch/bingo/Plaatjesbingo 3.webp' '$SAMPLES/dutch/bingo' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/bingo/Plaatjesbingo 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/bingo/Plaatjesbingo 3.webp' '$SAMPLES/dutch/bingo' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/bingo/Plaatjesbingo 3.webp -> dutch/bingo/plaatjesbingo-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/bingo/plaatjesbingo-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/bingo/Plaatjesbingo 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/bingo/Plaatjesbingo 4.webp → dutch/bingo/plaatjesbingo-4.webp
if [ -f '$SAMPLES/dutch/bingo/Plaatjesbingo 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/bingo/Plaatjesbingo 4.webp' '$SAMPLES/dutch/bingo' 2>/dev/null || true
    if mv '$SAMPLES/dutch/bingo/Plaatjesbingo 4.webp' '$SAMPLES/dutch/bingo/plaatjesbingo-4.webp'; then
      chattr +i '$SAMPLES/dutch/bingo/plaatjesbingo-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/bingo' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/bingo/plaatjesbingo-4.webp' 2>/dev/null || true
      echo "  OK: dutch/bingo/Plaatjesbingo 4.webp -> dutch/bingo/plaatjesbingo-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/bingo/plaatjesbingo-4.webp' '$SAMPLES/dutch/bingo' 2>/dev/null; mv '$SAMPLES/dutch/bingo/plaatjesbingo-4.webp' '$SAMPLES/dutch/bingo/Plaatjesbingo 4.webp'; chattr +i '$SAMPLES/dutch/bingo/Plaatjesbingo 4.webp' '$SAMPLES/dutch/bingo' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/bingo/Plaatjesbingo 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/bingo/Plaatjesbingo 4.webp' '$SAMPLES/dutch/bingo' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/bingo/Plaatjesbingo 4.webp -> dutch/bingo/plaatjesbingo-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/bingo/plaatjesbingo-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/bingo/Plaatjesbingo 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/sudoku/Plaatjes Sudoku 2.webp → dutch/sudoku/plaatjes-sudoku-2.webp
if [ -f '$SAMPLES/dutch/sudoku/Plaatjes Sudoku 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/sudoku/Plaatjes Sudoku 2.webp' '$SAMPLES/dutch/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/dutch/sudoku/Plaatjes Sudoku 2.webp' '$SAMPLES/dutch/sudoku/plaatjes-sudoku-2.webp'; then
      chattr +i '$SAMPLES/dutch/sudoku/plaatjes-sudoku-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/sudoku/plaatjes-sudoku-2.webp' 2>/dev/null || true
      echo "  OK: dutch/sudoku/Plaatjes Sudoku 2.webp -> dutch/sudoku/plaatjes-sudoku-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/sudoku/plaatjes-sudoku-2.webp' '$SAMPLES/dutch/sudoku' 2>/dev/null; mv '$SAMPLES/dutch/sudoku/plaatjes-sudoku-2.webp' '$SAMPLES/dutch/sudoku/Plaatjes Sudoku 2.webp'; chattr +i '$SAMPLES/dutch/sudoku/Plaatjes Sudoku 2.webp' '$SAMPLES/dutch/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/sudoku/Plaatjes Sudoku 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/sudoku/Plaatjes Sudoku 2.webp' '$SAMPLES/dutch/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/sudoku/Plaatjes Sudoku 2.webp -> dutch/sudoku/plaatjes-sudoku-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/sudoku/plaatjes-sudoku-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/sudoku/Plaatjes Sudoku 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/sudoku/Plaatjes Sudoku 3.webp → dutch/sudoku/plaatjes-sudoku-3.webp
if [ -f '$SAMPLES/dutch/sudoku/Plaatjes Sudoku 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/sudoku/Plaatjes Sudoku 3.webp' '$SAMPLES/dutch/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/dutch/sudoku/Plaatjes Sudoku 3.webp' '$SAMPLES/dutch/sudoku/plaatjes-sudoku-3.webp'; then
      chattr +i '$SAMPLES/dutch/sudoku/plaatjes-sudoku-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/sudoku/plaatjes-sudoku-3.webp' 2>/dev/null || true
      echo "  OK: dutch/sudoku/Plaatjes Sudoku 3.webp -> dutch/sudoku/plaatjes-sudoku-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/sudoku/plaatjes-sudoku-3.webp' '$SAMPLES/dutch/sudoku' 2>/dev/null; mv '$SAMPLES/dutch/sudoku/plaatjes-sudoku-3.webp' '$SAMPLES/dutch/sudoku/Plaatjes Sudoku 3.webp'; chattr +i '$SAMPLES/dutch/sudoku/Plaatjes Sudoku 3.webp' '$SAMPLES/dutch/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/sudoku/Plaatjes Sudoku 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/sudoku/Plaatjes Sudoku 3.webp' '$SAMPLES/dutch/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/sudoku/Plaatjes Sudoku 3.webp -> dutch/sudoku/plaatjes-sudoku-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/sudoku/plaatjes-sudoku-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/sudoku/Plaatjes Sudoku 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/sudoku/Plaatjes Sudoku 1 answer_key.webp → dutch/sudoku/plaatjes-sudoku-1-answer-key.webp
if [ -f '$SAMPLES/dutch/sudoku/Plaatjes Sudoku 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/sudoku/Plaatjes Sudoku 1 answer_key.webp' '$SAMPLES/dutch/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/dutch/sudoku/Plaatjes Sudoku 1 answer_key.webp' '$SAMPLES/dutch/sudoku/plaatjes-sudoku-1-answer-key.webp'; then
      chattr +i '$SAMPLES/dutch/sudoku/plaatjes-sudoku-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/sudoku/plaatjes-sudoku-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: dutch/sudoku/Plaatjes Sudoku 1 answer_key.webp -> dutch/sudoku/plaatjes-sudoku-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/sudoku/plaatjes-sudoku-1-answer-key.webp' '$SAMPLES/dutch/sudoku' 2>/dev/null; mv '$SAMPLES/dutch/sudoku/plaatjes-sudoku-1-answer-key.webp' '$SAMPLES/dutch/sudoku/Plaatjes Sudoku 1 answer_key.webp'; chattr +i '$SAMPLES/dutch/sudoku/Plaatjes Sudoku 1 answer_key.webp' '$SAMPLES/dutch/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/sudoku/Plaatjes Sudoku 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/sudoku/Plaatjes Sudoku 1 answer_key.webp' '$SAMPLES/dutch/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/sudoku/Plaatjes Sudoku 1 answer_key.webp -> dutch/sudoku/plaatjes-sudoku-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/sudoku/plaatjes-sudoku-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/sudoku/Plaatjes Sudoku 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/crossword/Plaatjes Kruiswoord 2.webp → dutch/crossword/plaatjes-kruiswoord-2.webp
if [ -f '$SAMPLES/dutch/crossword/Plaatjes Kruiswoord 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/crossword/Plaatjes Kruiswoord 2.webp' '$SAMPLES/dutch/crossword' 2>/dev/null || true
    if mv '$SAMPLES/dutch/crossword/Plaatjes Kruiswoord 2.webp' '$SAMPLES/dutch/crossword/plaatjes-kruiswoord-2.webp'; then
      chattr +i '$SAMPLES/dutch/crossword/plaatjes-kruiswoord-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/crossword/plaatjes-kruiswoord-2.webp' 2>/dev/null || true
      echo "  OK: dutch/crossword/Plaatjes Kruiswoord 2.webp -> dutch/crossword/plaatjes-kruiswoord-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/crossword/plaatjes-kruiswoord-2.webp' '$SAMPLES/dutch/crossword' 2>/dev/null; mv '$SAMPLES/dutch/crossword/plaatjes-kruiswoord-2.webp' '$SAMPLES/dutch/crossword/Plaatjes Kruiswoord 2.webp'; chattr +i '$SAMPLES/dutch/crossword/Plaatjes Kruiswoord 2.webp' '$SAMPLES/dutch/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/crossword/Plaatjes Kruiswoord 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/crossword/Plaatjes Kruiswoord 2.webp' '$SAMPLES/dutch/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/crossword/Plaatjes Kruiswoord 2.webp -> dutch/crossword/plaatjes-kruiswoord-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/crossword/plaatjes-kruiswoord-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/crossword/Plaatjes Kruiswoord 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/crossword/Plaatjes Kruiswoord 3.webp → dutch/crossword/plaatjes-kruiswoord-3.webp
if [ -f '$SAMPLES/dutch/crossword/Plaatjes Kruiswoord 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/crossword/Plaatjes Kruiswoord 3.webp' '$SAMPLES/dutch/crossword' 2>/dev/null || true
    if mv '$SAMPLES/dutch/crossword/Plaatjes Kruiswoord 3.webp' '$SAMPLES/dutch/crossword/plaatjes-kruiswoord-3.webp'; then
      chattr +i '$SAMPLES/dutch/crossword/plaatjes-kruiswoord-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/crossword/plaatjes-kruiswoord-3.webp' 2>/dev/null || true
      echo "  OK: dutch/crossword/Plaatjes Kruiswoord 3.webp -> dutch/crossword/plaatjes-kruiswoord-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/crossword/plaatjes-kruiswoord-3.webp' '$SAMPLES/dutch/crossword' 2>/dev/null; mv '$SAMPLES/dutch/crossword/plaatjes-kruiswoord-3.webp' '$SAMPLES/dutch/crossword/Plaatjes Kruiswoord 3.webp'; chattr +i '$SAMPLES/dutch/crossword/Plaatjes Kruiswoord 3.webp' '$SAMPLES/dutch/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/crossword/Plaatjes Kruiswoord 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/crossword/Plaatjes Kruiswoord 3.webp' '$SAMPLES/dutch/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/crossword/Plaatjes Kruiswoord 3.webp -> dutch/crossword/plaatjes-kruiswoord-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/crossword/plaatjes-kruiswoord-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/crossword/Plaatjes Kruiswoord 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# dutch/crossword/Plaatjes Kruiswoord 1 answer_key.webp → dutch/crossword/plaatjes-kruiswoord-1-answer-key.webp
if [ -f '$SAMPLES/dutch/crossword/Plaatjes Kruiswoord 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/dutch/crossword/Plaatjes Kruiswoord 1 answer_key.webp' '$SAMPLES/dutch/crossword' 2>/dev/null || true
    if mv '$SAMPLES/dutch/crossword/Plaatjes Kruiswoord 1 answer_key.webp' '$SAMPLES/dutch/crossword/plaatjes-kruiswoord-1-answer-key.webp'; then
      chattr +i '$SAMPLES/dutch/crossword/plaatjes-kruiswoord-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/dutch/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/dutch/crossword/plaatjes-kruiswoord-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: dutch/crossword/Plaatjes Kruiswoord 1 answer_key.webp -> dutch/crossword/plaatjes-kruiswoord-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/dutch/crossword/plaatjes-kruiswoord-1-answer-key.webp' '$SAMPLES/dutch/crossword' 2>/dev/null; mv '$SAMPLES/dutch/crossword/plaatjes-kruiswoord-1-answer-key.webp' '$SAMPLES/dutch/crossword/Plaatjes Kruiswoord 1 answer_key.webp'; chattr +i '$SAMPLES/dutch/crossword/Plaatjes Kruiswoord 1 answer_key.webp' '$SAMPLES/dutch/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: dutch/crossword/Plaatjes Kruiswoord 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/dutch/crossword/Plaatjes Kruiswoord 1 answer_key.webp' '$SAMPLES/dutch/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: dutch/crossword/Plaatjes Kruiswoord 1 answer_key.webp -> dutch/crossword/plaatjes-kruiswoord-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/dutch/crossword/plaatjes-kruiswoord-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: dutch/crossword/Plaatjes Kruiswoord 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# swedish/addition/addition_övning.webp → swedish/addition/addition-övning.webp
if [ -f '$SAMPLES/swedish/addition/addition_övning.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/swedish/addition/addition_övning.webp' '$SAMPLES/swedish/addition' 2>/dev/null || true
    if mv '$SAMPLES/swedish/addition/addition_övning.webp' '$SAMPLES/swedish/addition/addition-övning.webp'; then
      chattr +i '$SAMPLES/swedish/addition/addition-övning.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/swedish/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/swedish/addition/addition-övning.webp' 2>/dev/null || true
      echo "  OK: swedish/addition/addition_övning.webp -> swedish/addition/addition-övning.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/swedish/addition/addition-övning.webp' '$SAMPLES/swedish/addition' 2>/dev/null; mv '$SAMPLES/swedish/addition/addition-övning.webp' '$SAMPLES/swedish/addition/addition_övning.webp'; chattr +i '$SAMPLES/swedish/addition/addition_övning.webp' '$SAMPLES/swedish/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: swedish/addition/addition_övning.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/swedish/addition/addition_övning.webp' '$SAMPLES/swedish/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: swedish/addition/addition_övning.webp -> swedish/addition/addition-övning.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/swedish/addition/addition-övning.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: swedish/addition/addition_övning.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# swedish/addition/bild tal.webp → swedish/addition/bild-tal.webp
if [ -f '$SAMPLES/swedish/addition/bild tal.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/swedish/addition/bild tal.webp' '$SAMPLES/swedish/addition' 2>/dev/null || true
    if mv '$SAMPLES/swedish/addition/bild tal.webp' '$SAMPLES/swedish/addition/bild-tal.webp'; then
      chattr +i '$SAMPLES/swedish/addition/bild-tal.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/swedish/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/swedish/addition/bild-tal.webp' 2>/dev/null || true
      echo "  OK: swedish/addition/bild tal.webp -> swedish/addition/bild-tal.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/swedish/addition/bild-tal.webp' '$SAMPLES/swedish/addition' 2>/dev/null; mv '$SAMPLES/swedish/addition/bild-tal.webp' '$SAMPLES/swedish/addition/bild tal.webp'; chattr +i '$SAMPLES/swedish/addition/bild tal.webp' '$SAMPLES/swedish/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: swedish/addition/bild tal.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/swedish/addition/bild tal.webp' '$SAMPLES/swedish/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: swedish/addition/bild tal.webp -> swedish/addition/bild-tal.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/swedish/addition/bild-tal.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: swedish/addition/bild tal.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# swedish/addition/hitta term.webp → swedish/addition/hitta-term.webp
if [ -f '$SAMPLES/swedish/addition/hitta term.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/swedish/addition/hitta term.webp' '$SAMPLES/swedish/addition' 2>/dev/null || true
    if mv '$SAMPLES/swedish/addition/hitta term.webp' '$SAMPLES/swedish/addition/hitta-term.webp'; then
      chattr +i '$SAMPLES/swedish/addition/hitta-term.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/swedish/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/swedish/addition/hitta-term.webp' 2>/dev/null || true
      echo "  OK: swedish/addition/hitta term.webp -> swedish/addition/hitta-term.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/swedish/addition/hitta-term.webp' '$SAMPLES/swedish/addition' 2>/dev/null; mv '$SAMPLES/swedish/addition/hitta-term.webp' '$SAMPLES/swedish/addition/hitta term.webp'; chattr +i '$SAMPLES/swedish/addition/hitta term.webp' '$SAMPLES/swedish/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: swedish/addition/hitta term.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/swedish/addition/hitta term.webp' '$SAMPLES/swedish/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: swedish/addition/hitta term.webp -> swedish/addition/hitta-term.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/swedish/addition/hitta-term.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: swedish/addition/hitta term.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# swedish/wordsearch/ordletning portrait.webp → swedish/wordsearch/ordletning-portrait.webp
if [ -f '$SAMPLES/swedish/wordsearch/ordletning portrait.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/swedish/wordsearch/ordletning portrait.webp' '$SAMPLES/swedish/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/swedish/wordsearch/ordletning portrait.webp' '$SAMPLES/swedish/wordsearch/ordletning-portrait.webp'; then
      chattr +i '$SAMPLES/swedish/wordsearch/ordletning-portrait.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/swedish/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/swedish/wordsearch/ordletning-portrait.webp' 2>/dev/null || true
      echo "  OK: swedish/wordsearch/ordletning portrait.webp -> swedish/wordsearch/ordletning-portrait.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/swedish/wordsearch/ordletning-portrait.webp' '$SAMPLES/swedish/wordsearch' 2>/dev/null; mv '$SAMPLES/swedish/wordsearch/ordletning-portrait.webp' '$SAMPLES/swedish/wordsearch/ordletning portrait.webp'; chattr +i '$SAMPLES/swedish/wordsearch/ordletning portrait.webp' '$SAMPLES/swedish/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: swedish/wordsearch/ordletning portrait.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/swedish/wordsearch/ordletning portrait.webp' '$SAMPLES/swedish/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: swedish/wordsearch/ordletning portrait.webp -> swedish/wordsearch/ordletning-portrait.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/swedish/wordsearch/ordletning-portrait.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: swedish/wordsearch/ordletning portrait.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# swedish/wordsearch/ordletning landscape.webp → swedish/wordsearch/ordletning-landscape.webp
if [ -f '$SAMPLES/swedish/wordsearch/ordletning landscape.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/swedish/wordsearch/ordletning landscape.webp' '$SAMPLES/swedish/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/swedish/wordsearch/ordletning landscape.webp' '$SAMPLES/swedish/wordsearch/ordletning-landscape.webp'; then
      chattr +i '$SAMPLES/swedish/wordsearch/ordletning-landscape.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/swedish/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/swedish/wordsearch/ordletning-landscape.webp' 2>/dev/null || true
      echo "  OK: swedish/wordsearch/ordletning landscape.webp -> swedish/wordsearch/ordletning-landscape.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/swedish/wordsearch/ordletning-landscape.webp' '$SAMPLES/swedish/wordsearch' 2>/dev/null; mv '$SAMPLES/swedish/wordsearch/ordletning-landscape.webp' '$SAMPLES/swedish/wordsearch/ordletning landscape.webp'; chattr +i '$SAMPLES/swedish/wordsearch/ordletning landscape.webp' '$SAMPLES/swedish/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: swedish/wordsearch/ordletning landscape.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/swedish/wordsearch/ordletning landscape.webp' '$SAMPLES/swedish/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: swedish/wordsearch/ordletning landscape.webp -> swedish/wordsearch/ordletning-landscape.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/swedish/wordsearch/ordletning-landscape.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: swedish/wordsearch/ordletning landscape.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# swedish/sudoku/sudoku_lätt.webp → swedish/sudoku/sudoku-lätt.webp
if [ -f '$SAMPLES/swedish/sudoku/sudoku_lätt.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/swedish/sudoku/sudoku_lätt.webp' '$SAMPLES/swedish/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/swedish/sudoku/sudoku_lätt.webp' '$SAMPLES/swedish/sudoku/sudoku-lätt.webp'; then
      chattr +i '$SAMPLES/swedish/sudoku/sudoku-lätt.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/swedish/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/swedish/sudoku/sudoku-lätt.webp' 2>/dev/null || true
      echo "  OK: swedish/sudoku/sudoku_lätt.webp -> swedish/sudoku/sudoku-lätt.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/swedish/sudoku/sudoku-lätt.webp' '$SAMPLES/swedish/sudoku' 2>/dev/null; mv '$SAMPLES/swedish/sudoku/sudoku-lätt.webp' '$SAMPLES/swedish/sudoku/sudoku_lätt.webp'; chattr +i '$SAMPLES/swedish/sudoku/sudoku_lätt.webp' '$SAMPLES/swedish/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: swedish/sudoku/sudoku_lätt.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/swedish/sudoku/sudoku_lätt.webp' '$SAMPLES/swedish/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: swedish/sudoku/sudoku_lätt.webp -> swedish/sudoku/sudoku-lätt.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/swedish/sudoku/sudoku-lätt.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: swedish/sudoku/sudoku_lätt.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# swedish/sudoku/sudoku_svår.webp → swedish/sudoku/sudoku-svår.webp
if [ -f '$SAMPLES/swedish/sudoku/sudoku_svår.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/swedish/sudoku/sudoku_svår.webp' '$SAMPLES/swedish/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/swedish/sudoku/sudoku_svår.webp' '$SAMPLES/swedish/sudoku/sudoku-svår.webp'; then
      chattr +i '$SAMPLES/swedish/sudoku/sudoku-svår.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/swedish/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/swedish/sudoku/sudoku-svår.webp' 2>/dev/null || true
      echo "  OK: swedish/sudoku/sudoku_svår.webp -> swedish/sudoku/sudoku-svår.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/swedish/sudoku/sudoku-svår.webp' '$SAMPLES/swedish/sudoku' 2>/dev/null; mv '$SAMPLES/swedish/sudoku/sudoku-svår.webp' '$SAMPLES/swedish/sudoku/sudoku_svår.webp'; chattr +i '$SAMPLES/swedish/sudoku/sudoku_svår.webp' '$SAMPLES/swedish/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: swedish/sudoku/sudoku_svår.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/swedish/sudoku/sudoku_svår.webp' '$SAMPLES/swedish/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: swedish/sudoku/sudoku_svår.webp -> swedish/sudoku/sudoku-svår.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/swedish/sudoku/sudoku-svår.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: swedish/sudoku/sudoku_svår.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# swedish/sudoku/sudoku_worksheet (1).webp → swedish/sudoku/sudoku-worksheet-1.webp
if [ -f '$SAMPLES/swedish/sudoku/sudoku_worksheet (1).webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/swedish/sudoku/sudoku_worksheet (1).webp' '$SAMPLES/swedish/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/swedish/sudoku/sudoku_worksheet (1).webp' '$SAMPLES/swedish/sudoku/sudoku-worksheet-1.webp'; then
      chattr +i '$SAMPLES/swedish/sudoku/sudoku-worksheet-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/swedish/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/swedish/sudoku/sudoku-worksheet-1.webp' 2>/dev/null || true
      echo "  OK: swedish/sudoku/sudoku_worksheet (1).webp -> swedish/sudoku/sudoku-worksheet-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/swedish/sudoku/sudoku-worksheet-1.webp' '$SAMPLES/swedish/sudoku' 2>/dev/null; mv '$SAMPLES/swedish/sudoku/sudoku-worksheet-1.webp' '$SAMPLES/swedish/sudoku/sudoku_worksheet (1).webp'; chattr +i '$SAMPLES/swedish/sudoku/sudoku_worksheet (1).webp' '$SAMPLES/swedish/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: swedish/sudoku/sudoku_worksheet (1).webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/swedish/sudoku/sudoku_worksheet (1).webp' '$SAMPLES/swedish/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: swedish/sudoku/sudoku_worksheet (1).webp -> swedish/sudoku/sudoku-worksheet-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/swedish/sudoku/sudoku-worksheet-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: swedish/sudoku/sudoku_worksheet (1).webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# swedish/sudoku/sudoku_worksheet (2).webp → swedish/sudoku/sudoku-worksheet-2.webp
if [ -f '$SAMPLES/swedish/sudoku/sudoku_worksheet (2).webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/swedish/sudoku/sudoku_worksheet (2).webp' '$SAMPLES/swedish/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/swedish/sudoku/sudoku_worksheet (2).webp' '$SAMPLES/swedish/sudoku/sudoku-worksheet-2.webp'; then
      chattr +i '$SAMPLES/swedish/sudoku/sudoku-worksheet-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/swedish/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/swedish/sudoku/sudoku-worksheet-2.webp' 2>/dev/null || true
      echo "  OK: swedish/sudoku/sudoku_worksheet (2).webp -> swedish/sudoku/sudoku-worksheet-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/swedish/sudoku/sudoku-worksheet-2.webp' '$SAMPLES/swedish/sudoku' 2>/dev/null; mv '$SAMPLES/swedish/sudoku/sudoku-worksheet-2.webp' '$SAMPLES/swedish/sudoku/sudoku_worksheet (2).webp'; chattr +i '$SAMPLES/swedish/sudoku/sudoku_worksheet (2).webp' '$SAMPLES/swedish/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: swedish/sudoku/sudoku_worksheet (2).webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/swedish/sudoku/sudoku_worksheet (2).webp' '$SAMPLES/swedish/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: swedish/sudoku/sudoku_worksheet (2).webp -> swedish/sudoku/sudoku-worksheet-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/swedish/sudoku/sudoku-worksheet-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: swedish/sudoku/sudoku_worksheet (2).webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# swedish/sudoku/sudoku_lätt answer_key.webp → swedish/sudoku/sudoku-lätt-answer-key.webp
if [ -f '$SAMPLES/swedish/sudoku/sudoku_lätt answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/swedish/sudoku/sudoku_lätt answer_key.webp' '$SAMPLES/swedish/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/swedish/sudoku/sudoku_lätt answer_key.webp' '$SAMPLES/swedish/sudoku/sudoku-lätt-answer-key.webp'; then
      chattr +i '$SAMPLES/swedish/sudoku/sudoku-lätt-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/swedish/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/swedish/sudoku/sudoku-lätt-answer-key.webp' 2>/dev/null || true
      echo "  OK: swedish/sudoku/sudoku_lätt answer_key.webp -> swedish/sudoku/sudoku-lätt-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/swedish/sudoku/sudoku-lätt-answer-key.webp' '$SAMPLES/swedish/sudoku' 2>/dev/null; mv '$SAMPLES/swedish/sudoku/sudoku-lätt-answer-key.webp' '$SAMPLES/swedish/sudoku/sudoku_lätt answer_key.webp'; chattr +i '$SAMPLES/swedish/sudoku/sudoku_lätt answer_key.webp' '$SAMPLES/swedish/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: swedish/sudoku/sudoku_lätt answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/swedish/sudoku/sudoku_lätt answer_key.webp' '$SAMPLES/swedish/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: swedish/sudoku/sudoku_lätt answer_key.webp -> swedish/sudoku/sudoku-lätt-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/swedish/sudoku/sudoku-lätt-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: swedish/sudoku/sudoku_lätt answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# swedish/crossword/Bildkorsord 1.webp → swedish/crossword/bildkorsord-1.webp
if [ -f '$SAMPLES/swedish/crossword/Bildkorsord 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/swedish/crossword/Bildkorsord 1.webp' '$SAMPLES/swedish/crossword' 2>/dev/null || true
    if mv '$SAMPLES/swedish/crossword/Bildkorsord 1.webp' '$SAMPLES/swedish/crossword/bildkorsord-1.webp'; then
      chattr +i '$SAMPLES/swedish/crossword/bildkorsord-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/swedish/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/swedish/crossword/bildkorsord-1.webp' 2>/dev/null || true
      echo "  OK: swedish/crossword/Bildkorsord 1.webp -> swedish/crossword/bildkorsord-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/swedish/crossword/bildkorsord-1.webp' '$SAMPLES/swedish/crossword' 2>/dev/null; mv '$SAMPLES/swedish/crossword/bildkorsord-1.webp' '$SAMPLES/swedish/crossword/Bildkorsord 1.webp'; chattr +i '$SAMPLES/swedish/crossword/Bildkorsord 1.webp' '$SAMPLES/swedish/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: swedish/crossword/Bildkorsord 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/swedish/crossword/Bildkorsord 1.webp' '$SAMPLES/swedish/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: swedish/crossword/Bildkorsord 1.webp -> swedish/crossword/bildkorsord-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/swedish/crossword/bildkorsord-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: swedish/crossword/Bildkorsord 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# swedish/crossword/Bildkorsord 3.webp → swedish/crossword/bildkorsord-3.webp
if [ -f '$SAMPLES/swedish/crossword/Bildkorsord 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/swedish/crossword/Bildkorsord 3.webp' '$SAMPLES/swedish/crossword' 2>/dev/null || true
    if mv '$SAMPLES/swedish/crossword/Bildkorsord 3.webp' '$SAMPLES/swedish/crossword/bildkorsord-3.webp'; then
      chattr +i '$SAMPLES/swedish/crossword/bildkorsord-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/swedish/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/swedish/crossword/bildkorsord-3.webp' 2>/dev/null || true
      echo "  OK: swedish/crossword/Bildkorsord 3.webp -> swedish/crossword/bildkorsord-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/swedish/crossword/bildkorsord-3.webp' '$SAMPLES/swedish/crossword' 2>/dev/null; mv '$SAMPLES/swedish/crossword/bildkorsord-3.webp' '$SAMPLES/swedish/crossword/Bildkorsord 3.webp'; chattr +i '$SAMPLES/swedish/crossword/Bildkorsord 3.webp' '$SAMPLES/swedish/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: swedish/crossword/Bildkorsord 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/swedish/crossword/Bildkorsord 3.webp' '$SAMPLES/swedish/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: swedish/crossword/Bildkorsord 3.webp -> swedish/crossword/bildkorsord-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/swedish/crossword/bildkorsord-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: swedish/crossword/Bildkorsord 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# swedish/crossword/Bildkorsord 4.webp → swedish/crossword/bildkorsord-4.webp
if [ -f '$SAMPLES/swedish/crossword/Bildkorsord 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/swedish/crossword/Bildkorsord 4.webp' '$SAMPLES/swedish/crossword' 2>/dev/null || true
    if mv '$SAMPLES/swedish/crossword/Bildkorsord 4.webp' '$SAMPLES/swedish/crossword/bildkorsord-4.webp'; then
      chattr +i '$SAMPLES/swedish/crossword/bildkorsord-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/swedish/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/swedish/crossword/bildkorsord-4.webp' 2>/dev/null || true
      echo "  OK: swedish/crossword/Bildkorsord 4.webp -> swedish/crossword/bildkorsord-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/swedish/crossword/bildkorsord-4.webp' '$SAMPLES/swedish/crossword' 2>/dev/null; mv '$SAMPLES/swedish/crossword/bildkorsord-4.webp' '$SAMPLES/swedish/crossword/Bildkorsord 4.webp'; chattr +i '$SAMPLES/swedish/crossword/Bildkorsord 4.webp' '$SAMPLES/swedish/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: swedish/crossword/Bildkorsord 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/swedish/crossword/Bildkorsord 4.webp' '$SAMPLES/swedish/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: swedish/crossword/Bildkorsord 4.webp -> swedish/crossword/bildkorsord-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/swedish/crossword/bildkorsord-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: swedish/crossword/Bildkorsord 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# swedish/crossword/Bildkorsord 1 answer_key.webp → swedish/crossword/bildkorsord-1-answer-key.webp
if [ -f '$SAMPLES/swedish/crossword/Bildkorsord 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/swedish/crossword/Bildkorsord 1 answer_key.webp' '$SAMPLES/swedish/crossword' 2>/dev/null || true
    if mv '$SAMPLES/swedish/crossword/Bildkorsord 1 answer_key.webp' '$SAMPLES/swedish/crossword/bildkorsord-1-answer-key.webp'; then
      chattr +i '$SAMPLES/swedish/crossword/bildkorsord-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/swedish/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/swedish/crossword/bildkorsord-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: swedish/crossword/Bildkorsord 1 answer_key.webp -> swedish/crossword/bildkorsord-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/swedish/crossword/bildkorsord-1-answer-key.webp' '$SAMPLES/swedish/crossword' 2>/dev/null; mv '$SAMPLES/swedish/crossword/bildkorsord-1-answer-key.webp' '$SAMPLES/swedish/crossword/Bildkorsord 1 answer_key.webp'; chattr +i '$SAMPLES/swedish/crossword/Bildkorsord 1 answer_key.webp' '$SAMPLES/swedish/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: swedish/crossword/Bildkorsord 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/swedish/crossword/Bildkorsord 1 answer_key.webp' '$SAMPLES/swedish/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: swedish/crossword/Bildkorsord 1 answer_key.webp -> swedish/crossword/bildkorsord-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/swedish/crossword/bildkorsord-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: swedish/crossword/Bildkorsord 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/addition/Sjov Addition 2.webp → danish/addition/sjov-addition-2.webp
if [ -f '$SAMPLES/danish/addition/Sjov Addition 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/addition/Sjov Addition 2.webp' '$SAMPLES/danish/addition' 2>/dev/null || true
    if mv '$SAMPLES/danish/addition/Sjov Addition 2.webp' '$SAMPLES/danish/addition/sjov-addition-2.webp'; then
      chattr +i '$SAMPLES/danish/addition/sjov-addition-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/addition/sjov-addition-2.webp' 2>/dev/null || true
      echo "  OK: danish/addition/Sjov Addition 2.webp -> danish/addition/sjov-addition-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/addition/sjov-addition-2.webp' '$SAMPLES/danish/addition' 2>/dev/null; mv '$SAMPLES/danish/addition/sjov-addition-2.webp' '$SAMPLES/danish/addition/Sjov Addition 2.webp'; chattr +i '$SAMPLES/danish/addition/Sjov Addition 2.webp' '$SAMPLES/danish/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/addition/Sjov Addition 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/addition/Sjov Addition 2.webp' '$SAMPLES/danish/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/addition/Sjov Addition 2.webp -> danish/addition/sjov-addition-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/addition/sjov-addition-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/addition/Sjov Addition 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/addition/Sjov Addition 3.webp → danish/addition/sjov-addition-3.webp
if [ -f '$SAMPLES/danish/addition/Sjov Addition 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/addition/Sjov Addition 3.webp' '$SAMPLES/danish/addition' 2>/dev/null || true
    if mv '$SAMPLES/danish/addition/Sjov Addition 3.webp' '$SAMPLES/danish/addition/sjov-addition-3.webp'; then
      chattr +i '$SAMPLES/danish/addition/sjov-addition-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/addition/sjov-addition-3.webp' 2>/dev/null || true
      echo "  OK: danish/addition/Sjov Addition 3.webp -> danish/addition/sjov-addition-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/addition/sjov-addition-3.webp' '$SAMPLES/danish/addition' 2>/dev/null; mv '$SAMPLES/danish/addition/sjov-addition-3.webp' '$SAMPLES/danish/addition/Sjov Addition 3.webp'; chattr +i '$SAMPLES/danish/addition/Sjov Addition 3.webp' '$SAMPLES/danish/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/addition/Sjov Addition 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/addition/Sjov Addition 3.webp' '$SAMPLES/danish/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/addition/Sjov Addition 3.webp -> danish/addition/sjov-addition-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/addition/sjov-addition-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/addition/Sjov Addition 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/addition/Sjov Addition 4.webp → danish/addition/sjov-addition-4.webp
if [ -f '$SAMPLES/danish/addition/Sjov Addition 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/addition/Sjov Addition 4.webp' '$SAMPLES/danish/addition' 2>/dev/null || true
    if mv '$SAMPLES/danish/addition/Sjov Addition 4.webp' '$SAMPLES/danish/addition/sjov-addition-4.webp'; then
      chattr +i '$SAMPLES/danish/addition/sjov-addition-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/addition/sjov-addition-4.webp' 2>/dev/null || true
      echo "  OK: danish/addition/Sjov Addition 4.webp -> danish/addition/sjov-addition-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/addition/sjov-addition-4.webp' '$SAMPLES/danish/addition' 2>/dev/null; mv '$SAMPLES/danish/addition/sjov-addition-4.webp' '$SAMPLES/danish/addition/Sjov Addition 4.webp'; chattr +i '$SAMPLES/danish/addition/Sjov Addition 4.webp' '$SAMPLES/danish/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/addition/Sjov Addition 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/addition/Sjov Addition 4.webp' '$SAMPLES/danish/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/addition/Sjov Addition 4.webp -> danish/addition/sjov-addition-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/addition/sjov-addition-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/addition/Sjov Addition 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/addition/Sjov Addition 5.webp → danish/addition/sjov-addition-5.webp
if [ -f '$SAMPLES/danish/addition/Sjov Addition 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/addition/Sjov Addition 5.webp' '$SAMPLES/danish/addition' 2>/dev/null || true
    if mv '$SAMPLES/danish/addition/Sjov Addition 5.webp' '$SAMPLES/danish/addition/sjov-addition-5.webp'; then
      chattr +i '$SAMPLES/danish/addition/sjov-addition-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/addition/sjov-addition-5.webp' 2>/dev/null || true
      echo "  OK: danish/addition/Sjov Addition 5.webp -> danish/addition/sjov-addition-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/addition/sjov-addition-5.webp' '$SAMPLES/danish/addition' 2>/dev/null; mv '$SAMPLES/danish/addition/sjov-addition-5.webp' '$SAMPLES/danish/addition/Sjov Addition 5.webp'; chattr +i '$SAMPLES/danish/addition/Sjov Addition 5.webp' '$SAMPLES/danish/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/addition/Sjov Addition 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/addition/Sjov Addition 5.webp' '$SAMPLES/danish/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/addition/Sjov Addition 5.webp -> danish/addition/sjov-addition-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/addition/sjov-addition-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/addition/Sjov Addition 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/addition/Sjov Addition 1 answer_key.webp → danish/addition/sjov-addition-1-answer-key.webp
if [ -f '$SAMPLES/danish/addition/Sjov Addition 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/addition/Sjov Addition 1 answer_key.webp' '$SAMPLES/danish/addition' 2>/dev/null || true
    if mv '$SAMPLES/danish/addition/Sjov Addition 1 answer_key.webp' '$SAMPLES/danish/addition/sjov-addition-1-answer-key.webp'; then
      chattr +i '$SAMPLES/danish/addition/sjov-addition-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/addition/sjov-addition-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: danish/addition/Sjov Addition 1 answer_key.webp -> danish/addition/sjov-addition-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/addition/sjov-addition-1-answer-key.webp' '$SAMPLES/danish/addition' 2>/dev/null; mv '$SAMPLES/danish/addition/sjov-addition-1-answer-key.webp' '$SAMPLES/danish/addition/Sjov Addition 1 answer_key.webp'; chattr +i '$SAMPLES/danish/addition/Sjov Addition 1 answer_key.webp' '$SAMPLES/danish/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/addition/Sjov Addition 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/addition/Sjov Addition 1 answer_key.webp' '$SAMPLES/danish/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/addition/Sjov Addition 1 answer_key.webp -> danish/addition/sjov-addition-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/addition/sjov-addition-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/addition/Sjov Addition 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/subtraction/Sjov Subtraktion 2.webp → danish/subtraction/sjov-subtraktion-2.webp
if [ -f '$SAMPLES/danish/subtraction/Sjov Subtraktion 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/subtraction/Sjov Subtraktion 2.webp' '$SAMPLES/danish/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/danish/subtraction/Sjov Subtraktion 2.webp' '$SAMPLES/danish/subtraction/sjov-subtraktion-2.webp'; then
      chattr +i '$SAMPLES/danish/subtraction/sjov-subtraktion-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/subtraction/sjov-subtraktion-2.webp' 2>/dev/null || true
      echo "  OK: danish/subtraction/Sjov Subtraktion 2.webp -> danish/subtraction/sjov-subtraktion-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/subtraction/sjov-subtraktion-2.webp' '$SAMPLES/danish/subtraction' 2>/dev/null; mv '$SAMPLES/danish/subtraction/sjov-subtraktion-2.webp' '$SAMPLES/danish/subtraction/Sjov Subtraktion 2.webp'; chattr +i '$SAMPLES/danish/subtraction/Sjov Subtraktion 2.webp' '$SAMPLES/danish/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/subtraction/Sjov Subtraktion 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/subtraction/Sjov Subtraktion 2.webp' '$SAMPLES/danish/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/subtraction/Sjov Subtraktion 2.webp -> danish/subtraction/sjov-subtraktion-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/subtraction/sjov-subtraktion-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/subtraction/Sjov Subtraktion 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/subtraction/Sjov Subtraktion 3.webp → danish/subtraction/sjov-subtraktion-3.webp
if [ -f '$SAMPLES/danish/subtraction/Sjov Subtraktion 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/subtraction/Sjov Subtraktion 3.webp' '$SAMPLES/danish/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/danish/subtraction/Sjov Subtraktion 3.webp' '$SAMPLES/danish/subtraction/sjov-subtraktion-3.webp'; then
      chattr +i '$SAMPLES/danish/subtraction/sjov-subtraktion-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/subtraction/sjov-subtraktion-3.webp' 2>/dev/null || true
      echo "  OK: danish/subtraction/Sjov Subtraktion 3.webp -> danish/subtraction/sjov-subtraktion-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/subtraction/sjov-subtraktion-3.webp' '$SAMPLES/danish/subtraction' 2>/dev/null; mv '$SAMPLES/danish/subtraction/sjov-subtraktion-3.webp' '$SAMPLES/danish/subtraction/Sjov Subtraktion 3.webp'; chattr +i '$SAMPLES/danish/subtraction/Sjov Subtraktion 3.webp' '$SAMPLES/danish/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/subtraction/Sjov Subtraktion 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/subtraction/Sjov Subtraktion 3.webp' '$SAMPLES/danish/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/subtraction/Sjov Subtraktion 3.webp -> danish/subtraction/sjov-subtraktion-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/subtraction/sjov-subtraktion-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/subtraction/Sjov Subtraktion 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/subtraction/Sjov Subtraktion 4.webp → danish/subtraction/sjov-subtraktion-4.webp
if [ -f '$SAMPLES/danish/subtraction/Sjov Subtraktion 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/subtraction/Sjov Subtraktion 4.webp' '$SAMPLES/danish/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/danish/subtraction/Sjov Subtraktion 4.webp' '$SAMPLES/danish/subtraction/sjov-subtraktion-4.webp'; then
      chattr +i '$SAMPLES/danish/subtraction/sjov-subtraktion-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/subtraction/sjov-subtraktion-4.webp' 2>/dev/null || true
      echo "  OK: danish/subtraction/Sjov Subtraktion 4.webp -> danish/subtraction/sjov-subtraktion-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/subtraction/sjov-subtraktion-4.webp' '$SAMPLES/danish/subtraction' 2>/dev/null; mv '$SAMPLES/danish/subtraction/sjov-subtraktion-4.webp' '$SAMPLES/danish/subtraction/Sjov Subtraktion 4.webp'; chattr +i '$SAMPLES/danish/subtraction/Sjov Subtraktion 4.webp' '$SAMPLES/danish/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/subtraction/Sjov Subtraktion 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/subtraction/Sjov Subtraktion 4.webp' '$SAMPLES/danish/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/subtraction/Sjov Subtraktion 4.webp -> danish/subtraction/sjov-subtraktion-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/subtraction/sjov-subtraktion-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/subtraction/Sjov Subtraktion 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/subtraction/Sjov Subtraktion 5.webp → danish/subtraction/sjov-subtraktion-5.webp
if [ -f '$SAMPLES/danish/subtraction/Sjov Subtraktion 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/subtraction/Sjov Subtraktion 5.webp' '$SAMPLES/danish/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/danish/subtraction/Sjov Subtraktion 5.webp' '$SAMPLES/danish/subtraction/sjov-subtraktion-5.webp'; then
      chattr +i '$SAMPLES/danish/subtraction/sjov-subtraktion-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/subtraction/sjov-subtraktion-5.webp' 2>/dev/null || true
      echo "  OK: danish/subtraction/Sjov Subtraktion 5.webp -> danish/subtraction/sjov-subtraktion-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/subtraction/sjov-subtraktion-5.webp' '$SAMPLES/danish/subtraction' 2>/dev/null; mv '$SAMPLES/danish/subtraction/sjov-subtraktion-5.webp' '$SAMPLES/danish/subtraction/Sjov Subtraktion 5.webp'; chattr +i '$SAMPLES/danish/subtraction/Sjov Subtraktion 5.webp' '$SAMPLES/danish/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/subtraction/Sjov Subtraktion 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/subtraction/Sjov Subtraktion 5.webp' '$SAMPLES/danish/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/subtraction/Sjov Subtraktion 5.webp -> danish/subtraction/sjov-subtraktion-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/subtraction/sjov-subtraktion-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/subtraction/Sjov Subtraktion 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/subtraction/Sjov Subtraktion 1 answer_key.webp → danish/subtraction/sjov-subtraktion-1-answer-key.webp
if [ -f '$SAMPLES/danish/subtraction/Sjov Subtraktion 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/subtraction/Sjov Subtraktion 1 answer_key.webp' '$SAMPLES/danish/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/danish/subtraction/Sjov Subtraktion 1 answer_key.webp' '$SAMPLES/danish/subtraction/sjov-subtraktion-1-answer-key.webp'; then
      chattr +i '$SAMPLES/danish/subtraction/sjov-subtraktion-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/subtraction/sjov-subtraktion-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: danish/subtraction/Sjov Subtraktion 1 answer_key.webp -> danish/subtraction/sjov-subtraktion-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/subtraction/sjov-subtraktion-1-answer-key.webp' '$SAMPLES/danish/subtraction' 2>/dev/null; mv '$SAMPLES/danish/subtraction/sjov-subtraktion-1-answer-key.webp' '$SAMPLES/danish/subtraction/Sjov Subtraktion 1 answer_key.webp'; chattr +i '$SAMPLES/danish/subtraction/Sjov Subtraktion 1 answer_key.webp' '$SAMPLES/danish/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/subtraction/Sjov Subtraktion 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/subtraction/Sjov Subtraktion 1 answer_key.webp' '$SAMPLES/danish/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/subtraction/Sjov Subtraktion 1 answer_key.webp -> danish/subtraction/sjov-subtraktion-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/subtraction/sjov-subtraktion-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/subtraction/Sjov Subtraktion 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/prepositions/Præpositioner 1.webp → danish/prepositions/præpositioner-1.webp
if [ -f '$SAMPLES/danish/prepositions/Præpositioner 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/prepositions/Præpositioner 1.webp' '$SAMPLES/danish/prepositions' 2>/dev/null || true
    if mv '$SAMPLES/danish/prepositions/Præpositioner 1.webp' '$SAMPLES/danish/prepositions/præpositioner-1.webp'; then
      chattr +i '$SAMPLES/danish/prepositions/præpositioner-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/prepositions' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/prepositions/præpositioner-1.webp' 2>/dev/null || true
      echo "  OK: danish/prepositions/Præpositioner 1.webp -> danish/prepositions/præpositioner-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/prepositions/præpositioner-1.webp' '$SAMPLES/danish/prepositions' 2>/dev/null; mv '$SAMPLES/danish/prepositions/præpositioner-1.webp' '$SAMPLES/danish/prepositions/Præpositioner 1.webp'; chattr +i '$SAMPLES/danish/prepositions/Præpositioner 1.webp' '$SAMPLES/danish/prepositions' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/prepositions/Præpositioner 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/prepositions/Præpositioner 1.webp' '$SAMPLES/danish/prepositions' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/prepositions/Præpositioner 1.webp -> danish/prepositions/præpositioner-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/prepositions/præpositioner-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/prepositions/Præpositioner 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/prepositions/Præpositioner 2.webp → danish/prepositions/præpositioner-2.webp
if [ -f '$SAMPLES/danish/prepositions/Præpositioner 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/prepositions/Præpositioner 2.webp' '$SAMPLES/danish/prepositions' 2>/dev/null || true
    if mv '$SAMPLES/danish/prepositions/Præpositioner 2.webp' '$SAMPLES/danish/prepositions/præpositioner-2.webp'; then
      chattr +i '$SAMPLES/danish/prepositions/præpositioner-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/prepositions' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/prepositions/præpositioner-2.webp' 2>/dev/null || true
      echo "  OK: danish/prepositions/Præpositioner 2.webp -> danish/prepositions/præpositioner-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/prepositions/præpositioner-2.webp' '$SAMPLES/danish/prepositions' 2>/dev/null; mv '$SAMPLES/danish/prepositions/præpositioner-2.webp' '$SAMPLES/danish/prepositions/Præpositioner 2.webp'; chattr +i '$SAMPLES/danish/prepositions/Præpositioner 2.webp' '$SAMPLES/danish/prepositions' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/prepositions/Præpositioner 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/prepositions/Præpositioner 2.webp' '$SAMPLES/danish/prepositions' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/prepositions/Præpositioner 2.webp -> danish/prepositions/præpositioner-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/prepositions/præpositioner-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/prepositions/Præpositioner 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/prepositions/Præpositioner 4.webp → danish/prepositions/præpositioner-4.webp
if [ -f '$SAMPLES/danish/prepositions/Præpositioner 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/prepositions/Præpositioner 4.webp' '$SAMPLES/danish/prepositions' 2>/dev/null || true
    if mv '$SAMPLES/danish/prepositions/Præpositioner 4.webp' '$SAMPLES/danish/prepositions/præpositioner-4.webp'; then
      chattr +i '$SAMPLES/danish/prepositions/præpositioner-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/prepositions' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/prepositions/præpositioner-4.webp' 2>/dev/null || true
      echo "  OK: danish/prepositions/Præpositioner 4.webp -> danish/prepositions/præpositioner-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/prepositions/præpositioner-4.webp' '$SAMPLES/danish/prepositions' 2>/dev/null; mv '$SAMPLES/danish/prepositions/præpositioner-4.webp' '$SAMPLES/danish/prepositions/Præpositioner 4.webp'; chattr +i '$SAMPLES/danish/prepositions/Præpositioner 4.webp' '$SAMPLES/danish/prepositions' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/prepositions/Præpositioner 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/prepositions/Præpositioner 4.webp' '$SAMPLES/danish/prepositions' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/prepositions/Præpositioner 4.webp -> danish/prepositions/præpositioner-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/prepositions/præpositioner-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/prepositions/Præpositioner 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/prepositions/Præpositioner 1 answer_key.webp → danish/prepositions/præpositioner-1-answer-key.webp
if [ -f '$SAMPLES/danish/prepositions/Præpositioner 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/prepositions/Præpositioner 1 answer_key.webp' '$SAMPLES/danish/prepositions' 2>/dev/null || true
    if mv '$SAMPLES/danish/prepositions/Præpositioner 1 answer_key.webp' '$SAMPLES/danish/prepositions/præpositioner-1-answer-key.webp'; then
      chattr +i '$SAMPLES/danish/prepositions/præpositioner-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/prepositions' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/prepositions/præpositioner-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: danish/prepositions/Præpositioner 1 answer_key.webp -> danish/prepositions/præpositioner-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/prepositions/præpositioner-1-answer-key.webp' '$SAMPLES/danish/prepositions' 2>/dev/null; mv '$SAMPLES/danish/prepositions/præpositioner-1-answer-key.webp' '$SAMPLES/danish/prepositions/Præpositioner 1 answer_key.webp'; chattr +i '$SAMPLES/danish/prepositions/Præpositioner 1 answer_key.webp' '$SAMPLES/danish/prepositions' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/prepositions/Præpositioner 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/prepositions/Præpositioner 1 answer_key.webp' '$SAMPLES/danish/prepositions' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/prepositions/Præpositioner 1 answer_key.webp -> danish/prepositions/præpositioner-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/prepositions/præpositioner-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/prepositions/Præpositioner 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/wordsearch/Ordsøgning 1.webp → danish/wordsearch/ordsøgning-1.webp
if [ -f '$SAMPLES/danish/wordsearch/Ordsøgning 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/wordsearch/Ordsøgning 1.webp' '$SAMPLES/danish/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/danish/wordsearch/Ordsøgning 1.webp' '$SAMPLES/danish/wordsearch/ordsøgning-1.webp'; then
      chattr +i '$SAMPLES/danish/wordsearch/ordsøgning-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/wordsearch/ordsøgning-1.webp' 2>/dev/null || true
      echo "  OK: danish/wordsearch/Ordsøgning 1.webp -> danish/wordsearch/ordsøgning-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/wordsearch/ordsøgning-1.webp' '$SAMPLES/danish/wordsearch' 2>/dev/null; mv '$SAMPLES/danish/wordsearch/ordsøgning-1.webp' '$SAMPLES/danish/wordsearch/Ordsøgning 1.webp'; chattr +i '$SAMPLES/danish/wordsearch/Ordsøgning 1.webp' '$SAMPLES/danish/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/wordsearch/Ordsøgning 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/wordsearch/Ordsøgning 1.webp' '$SAMPLES/danish/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/wordsearch/Ordsøgning 1.webp -> danish/wordsearch/ordsøgning-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/wordsearch/ordsøgning-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/wordsearch/Ordsøgning 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/wordsearch/Ordsøgning 2.webp → danish/wordsearch/ordsøgning-2.webp
if [ -f '$SAMPLES/danish/wordsearch/Ordsøgning 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/wordsearch/Ordsøgning 2.webp' '$SAMPLES/danish/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/danish/wordsearch/Ordsøgning 2.webp' '$SAMPLES/danish/wordsearch/ordsøgning-2.webp'; then
      chattr +i '$SAMPLES/danish/wordsearch/ordsøgning-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/wordsearch/ordsøgning-2.webp' 2>/dev/null || true
      echo "  OK: danish/wordsearch/Ordsøgning 2.webp -> danish/wordsearch/ordsøgning-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/wordsearch/ordsøgning-2.webp' '$SAMPLES/danish/wordsearch' 2>/dev/null; mv '$SAMPLES/danish/wordsearch/ordsøgning-2.webp' '$SAMPLES/danish/wordsearch/Ordsøgning 2.webp'; chattr +i '$SAMPLES/danish/wordsearch/Ordsøgning 2.webp' '$SAMPLES/danish/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/wordsearch/Ordsøgning 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/wordsearch/Ordsøgning 2.webp' '$SAMPLES/danish/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/wordsearch/Ordsøgning 2.webp -> danish/wordsearch/ordsøgning-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/wordsearch/ordsøgning-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/wordsearch/Ordsøgning 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/wordsearch/Ordsøgning 3.webp → danish/wordsearch/ordsøgning-3.webp
if [ -f '$SAMPLES/danish/wordsearch/Ordsøgning 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/wordsearch/Ordsøgning 3.webp' '$SAMPLES/danish/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/danish/wordsearch/Ordsøgning 3.webp' '$SAMPLES/danish/wordsearch/ordsøgning-3.webp'; then
      chattr +i '$SAMPLES/danish/wordsearch/ordsøgning-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/wordsearch/ordsøgning-3.webp' 2>/dev/null || true
      echo "  OK: danish/wordsearch/Ordsøgning 3.webp -> danish/wordsearch/ordsøgning-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/wordsearch/ordsøgning-3.webp' '$SAMPLES/danish/wordsearch' 2>/dev/null; mv '$SAMPLES/danish/wordsearch/ordsøgning-3.webp' '$SAMPLES/danish/wordsearch/Ordsøgning 3.webp'; chattr +i '$SAMPLES/danish/wordsearch/Ordsøgning 3.webp' '$SAMPLES/danish/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/wordsearch/Ordsøgning 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/wordsearch/Ordsøgning 3.webp' '$SAMPLES/danish/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/wordsearch/Ordsøgning 3.webp -> danish/wordsearch/ordsøgning-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/wordsearch/ordsøgning-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/wordsearch/Ordsøgning 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/wordsearch/Ordsøgning 1 answer_key.webp → danish/wordsearch/ordsøgning-1-answer-key.webp
if [ -f '$SAMPLES/danish/wordsearch/Ordsøgning 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/wordsearch/Ordsøgning 1 answer_key.webp' '$SAMPLES/danish/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/danish/wordsearch/Ordsøgning 1 answer_key.webp' '$SAMPLES/danish/wordsearch/ordsøgning-1-answer-key.webp'; then
      chattr +i '$SAMPLES/danish/wordsearch/ordsøgning-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/wordsearch/ordsøgning-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: danish/wordsearch/Ordsøgning 1 answer_key.webp -> danish/wordsearch/ordsøgning-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/wordsearch/ordsøgning-1-answer-key.webp' '$SAMPLES/danish/wordsearch' 2>/dev/null; mv '$SAMPLES/danish/wordsearch/ordsøgning-1-answer-key.webp' '$SAMPLES/danish/wordsearch/Ordsøgning 1 answer_key.webp'; chattr +i '$SAMPLES/danish/wordsearch/Ordsøgning 1 answer_key.webp' '$SAMPLES/danish/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/wordsearch/Ordsøgning 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/wordsearch/Ordsøgning 1 answer_key.webp' '$SAMPLES/danish/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/wordsearch/Ordsøgning 1 answer_key.webp -> danish/wordsearch/ordsøgning-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/wordsearch/ordsøgning-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/wordsearch/Ordsøgning 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/cryptogram/Billed-Kryptogram 1.webp → danish/cryptogram/billed-kryptogram-1.webp
if [ -f '$SAMPLES/danish/cryptogram/Billed-Kryptogram 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/cryptogram/Billed-Kryptogram 1.webp' '$SAMPLES/danish/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/danish/cryptogram/Billed-Kryptogram 1.webp' '$SAMPLES/danish/cryptogram/billed-kryptogram-1.webp'; then
      chattr +i '$SAMPLES/danish/cryptogram/billed-kryptogram-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/cryptogram/billed-kryptogram-1.webp' 2>/dev/null || true
      echo "  OK: danish/cryptogram/Billed-Kryptogram 1.webp -> danish/cryptogram/billed-kryptogram-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/cryptogram/billed-kryptogram-1.webp' '$SAMPLES/danish/cryptogram' 2>/dev/null; mv '$SAMPLES/danish/cryptogram/billed-kryptogram-1.webp' '$SAMPLES/danish/cryptogram/Billed-Kryptogram 1.webp'; chattr +i '$SAMPLES/danish/cryptogram/Billed-Kryptogram 1.webp' '$SAMPLES/danish/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/cryptogram/Billed-Kryptogram 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/cryptogram/Billed-Kryptogram 1.webp' '$SAMPLES/danish/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/cryptogram/Billed-Kryptogram 1.webp -> danish/cryptogram/billed-kryptogram-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/cryptogram/billed-kryptogram-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/cryptogram/Billed-Kryptogram 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/cryptogram/Billed-Kryptogram 3.webp → danish/cryptogram/billed-kryptogram-3.webp
if [ -f '$SAMPLES/danish/cryptogram/Billed-Kryptogram 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/cryptogram/Billed-Kryptogram 3.webp' '$SAMPLES/danish/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/danish/cryptogram/Billed-Kryptogram 3.webp' '$SAMPLES/danish/cryptogram/billed-kryptogram-3.webp'; then
      chattr +i '$SAMPLES/danish/cryptogram/billed-kryptogram-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/cryptogram/billed-kryptogram-3.webp' 2>/dev/null || true
      echo "  OK: danish/cryptogram/Billed-Kryptogram 3.webp -> danish/cryptogram/billed-kryptogram-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/cryptogram/billed-kryptogram-3.webp' '$SAMPLES/danish/cryptogram' 2>/dev/null; mv '$SAMPLES/danish/cryptogram/billed-kryptogram-3.webp' '$SAMPLES/danish/cryptogram/Billed-Kryptogram 3.webp'; chattr +i '$SAMPLES/danish/cryptogram/Billed-Kryptogram 3.webp' '$SAMPLES/danish/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/cryptogram/Billed-Kryptogram 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/cryptogram/Billed-Kryptogram 3.webp' '$SAMPLES/danish/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/cryptogram/Billed-Kryptogram 3.webp -> danish/cryptogram/billed-kryptogram-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/cryptogram/billed-kryptogram-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/cryptogram/Billed-Kryptogram 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/cryptogram/Billed-Kryptogram 4.webp → danish/cryptogram/billed-kryptogram-4.webp
if [ -f '$SAMPLES/danish/cryptogram/Billed-Kryptogram 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/cryptogram/Billed-Kryptogram 4.webp' '$SAMPLES/danish/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/danish/cryptogram/Billed-Kryptogram 4.webp' '$SAMPLES/danish/cryptogram/billed-kryptogram-4.webp'; then
      chattr +i '$SAMPLES/danish/cryptogram/billed-kryptogram-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/cryptogram/billed-kryptogram-4.webp' 2>/dev/null || true
      echo "  OK: danish/cryptogram/Billed-Kryptogram 4.webp -> danish/cryptogram/billed-kryptogram-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/cryptogram/billed-kryptogram-4.webp' '$SAMPLES/danish/cryptogram' 2>/dev/null; mv '$SAMPLES/danish/cryptogram/billed-kryptogram-4.webp' '$SAMPLES/danish/cryptogram/Billed-Kryptogram 4.webp'; chattr +i '$SAMPLES/danish/cryptogram/Billed-Kryptogram 4.webp' '$SAMPLES/danish/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/cryptogram/Billed-Kryptogram 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/cryptogram/Billed-Kryptogram 4.webp' '$SAMPLES/danish/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/cryptogram/Billed-Kryptogram 4.webp -> danish/cryptogram/billed-kryptogram-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/cryptogram/billed-kryptogram-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/cryptogram/Billed-Kryptogram 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/cryptogram/Billed-Kryptogram 5.webp → danish/cryptogram/billed-kryptogram-5.webp
if [ -f '$SAMPLES/danish/cryptogram/Billed-Kryptogram 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/cryptogram/Billed-Kryptogram 5.webp' '$SAMPLES/danish/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/danish/cryptogram/Billed-Kryptogram 5.webp' '$SAMPLES/danish/cryptogram/billed-kryptogram-5.webp'; then
      chattr +i '$SAMPLES/danish/cryptogram/billed-kryptogram-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/cryptogram/billed-kryptogram-5.webp' 2>/dev/null || true
      echo "  OK: danish/cryptogram/Billed-Kryptogram 5.webp -> danish/cryptogram/billed-kryptogram-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/cryptogram/billed-kryptogram-5.webp' '$SAMPLES/danish/cryptogram' 2>/dev/null; mv '$SAMPLES/danish/cryptogram/billed-kryptogram-5.webp' '$SAMPLES/danish/cryptogram/Billed-Kryptogram 5.webp'; chattr +i '$SAMPLES/danish/cryptogram/Billed-Kryptogram 5.webp' '$SAMPLES/danish/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/cryptogram/Billed-Kryptogram 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/cryptogram/Billed-Kryptogram 5.webp' '$SAMPLES/danish/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/cryptogram/Billed-Kryptogram 5.webp -> danish/cryptogram/billed-kryptogram-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/cryptogram/billed-kryptogram-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/cryptogram/Billed-Kryptogram 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/cryptogram/Billed-Kryptogram 1 answer_key.webp → danish/cryptogram/billed-kryptogram-1-answer-key.webp
if [ -f '$SAMPLES/danish/cryptogram/Billed-Kryptogram 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/cryptogram/Billed-Kryptogram 1 answer_key.webp' '$SAMPLES/danish/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/danish/cryptogram/Billed-Kryptogram 1 answer_key.webp' '$SAMPLES/danish/cryptogram/billed-kryptogram-1-answer-key.webp'; then
      chattr +i '$SAMPLES/danish/cryptogram/billed-kryptogram-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/cryptogram/billed-kryptogram-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: danish/cryptogram/Billed-Kryptogram 1 answer_key.webp -> danish/cryptogram/billed-kryptogram-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/cryptogram/billed-kryptogram-1-answer-key.webp' '$SAMPLES/danish/cryptogram' 2>/dev/null; mv '$SAMPLES/danish/cryptogram/billed-kryptogram-1-answer-key.webp' '$SAMPLES/danish/cryptogram/Billed-Kryptogram 1 answer_key.webp'; chattr +i '$SAMPLES/danish/cryptogram/Billed-Kryptogram 1 answer_key.webp' '$SAMPLES/danish/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/cryptogram/Billed-Kryptogram 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/cryptogram/Billed-Kryptogram 1 answer_key.webp' '$SAMPLES/danish/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/cryptogram/Billed-Kryptogram 1 answer_key.webp -> danish/cryptogram/billed-kryptogram-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/cryptogram/billed-kryptogram-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/cryptogram/Billed-Kryptogram 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/matching/Find Parrene 1.webp → danish/matching/find-parrene-1.webp
if [ -f '$SAMPLES/danish/matching/Find Parrene 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/matching/Find Parrene 1.webp' '$SAMPLES/danish/matching' 2>/dev/null || true
    if mv '$SAMPLES/danish/matching/Find Parrene 1.webp' '$SAMPLES/danish/matching/find-parrene-1.webp'; then
      chattr +i '$SAMPLES/danish/matching/find-parrene-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/matching/find-parrene-1.webp' 2>/dev/null || true
      echo "  OK: danish/matching/Find Parrene 1.webp -> danish/matching/find-parrene-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/matching/find-parrene-1.webp' '$SAMPLES/danish/matching' 2>/dev/null; mv '$SAMPLES/danish/matching/find-parrene-1.webp' '$SAMPLES/danish/matching/Find Parrene 1.webp'; chattr +i '$SAMPLES/danish/matching/Find Parrene 1.webp' '$SAMPLES/danish/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/matching/Find Parrene 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/matching/Find Parrene 1.webp' '$SAMPLES/danish/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/matching/Find Parrene 1.webp -> danish/matching/find-parrene-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/matching/find-parrene-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/matching/Find Parrene 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/matching/Find Parrene 2.webp → danish/matching/find-parrene-2.webp
if [ -f '$SAMPLES/danish/matching/Find Parrene 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/matching/Find Parrene 2.webp' '$SAMPLES/danish/matching' 2>/dev/null || true
    if mv '$SAMPLES/danish/matching/Find Parrene 2.webp' '$SAMPLES/danish/matching/find-parrene-2.webp'; then
      chattr +i '$SAMPLES/danish/matching/find-parrene-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/matching/find-parrene-2.webp' 2>/dev/null || true
      echo "  OK: danish/matching/Find Parrene 2.webp -> danish/matching/find-parrene-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/matching/find-parrene-2.webp' '$SAMPLES/danish/matching' 2>/dev/null; mv '$SAMPLES/danish/matching/find-parrene-2.webp' '$SAMPLES/danish/matching/Find Parrene 2.webp'; chattr +i '$SAMPLES/danish/matching/Find Parrene 2.webp' '$SAMPLES/danish/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/matching/Find Parrene 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/matching/Find Parrene 2.webp' '$SAMPLES/danish/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/matching/Find Parrene 2.webp -> danish/matching/find-parrene-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/matching/find-parrene-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/matching/Find Parrene 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/matching/Find Parrene 3.webp → danish/matching/find-parrene-3.webp
if [ -f '$SAMPLES/danish/matching/Find Parrene 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/matching/Find Parrene 3.webp' '$SAMPLES/danish/matching' 2>/dev/null || true
    if mv '$SAMPLES/danish/matching/Find Parrene 3.webp' '$SAMPLES/danish/matching/find-parrene-3.webp'; then
      chattr +i '$SAMPLES/danish/matching/find-parrene-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/matching/find-parrene-3.webp' 2>/dev/null || true
      echo "  OK: danish/matching/Find Parrene 3.webp -> danish/matching/find-parrene-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/matching/find-parrene-3.webp' '$SAMPLES/danish/matching' 2>/dev/null; mv '$SAMPLES/danish/matching/find-parrene-3.webp' '$SAMPLES/danish/matching/Find Parrene 3.webp'; chattr +i '$SAMPLES/danish/matching/Find Parrene 3.webp' '$SAMPLES/danish/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/matching/Find Parrene 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/matching/Find Parrene 3.webp' '$SAMPLES/danish/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/matching/Find Parrene 3.webp -> danish/matching/find-parrene-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/matching/find-parrene-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/matching/Find Parrene 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/matching/Find Parrene 1 answer_key.webp → danish/matching/find-parrene-1-answer-key.webp
if [ -f '$SAMPLES/danish/matching/Find Parrene 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/matching/Find Parrene 1 answer_key.webp' '$SAMPLES/danish/matching' 2>/dev/null || true
    if mv '$SAMPLES/danish/matching/Find Parrene 1 answer_key.webp' '$SAMPLES/danish/matching/find-parrene-1-answer-key.webp'; then
      chattr +i '$SAMPLES/danish/matching/find-parrene-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/matching/find-parrene-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: danish/matching/Find Parrene 1 answer_key.webp -> danish/matching/find-parrene-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/matching/find-parrene-1-answer-key.webp' '$SAMPLES/danish/matching' 2>/dev/null; mv '$SAMPLES/danish/matching/find-parrene-1-answer-key.webp' '$SAMPLES/danish/matching/Find Parrene 1 answer_key.webp'; chattr +i '$SAMPLES/danish/matching/Find Parrene 1 answer_key.webp' '$SAMPLES/danish/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/matching/Find Parrene 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/matching/Find Parrene 1 answer_key.webp' '$SAMPLES/danish/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/matching/Find Parrene 1 answer_key.webp -> danish/matching/find-parrene-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/matching/find-parrene-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/matching/Find Parrene 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/bingo/Billedbingo 1.webp → danish/bingo/billedbingo-1.webp
if [ -f '$SAMPLES/danish/bingo/Billedbingo 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/bingo/Billedbingo 1.webp' '$SAMPLES/danish/bingo' 2>/dev/null || true
    if mv '$SAMPLES/danish/bingo/Billedbingo 1.webp' '$SAMPLES/danish/bingo/billedbingo-1.webp'; then
      chattr +i '$SAMPLES/danish/bingo/billedbingo-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/bingo' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/bingo/billedbingo-1.webp' 2>/dev/null || true
      echo "  OK: danish/bingo/Billedbingo 1.webp -> danish/bingo/billedbingo-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/bingo/billedbingo-1.webp' '$SAMPLES/danish/bingo' 2>/dev/null; mv '$SAMPLES/danish/bingo/billedbingo-1.webp' '$SAMPLES/danish/bingo/Billedbingo 1.webp'; chattr +i '$SAMPLES/danish/bingo/Billedbingo 1.webp' '$SAMPLES/danish/bingo' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/bingo/Billedbingo 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/bingo/Billedbingo 1.webp' '$SAMPLES/danish/bingo' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/bingo/Billedbingo 1.webp -> danish/bingo/billedbingo-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/bingo/billedbingo-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/bingo/Billedbingo 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/bingo/Billedbingo 2.webp → danish/bingo/billedbingo-2.webp
if [ -f '$SAMPLES/danish/bingo/Billedbingo 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/bingo/Billedbingo 2.webp' '$SAMPLES/danish/bingo' 2>/dev/null || true
    if mv '$SAMPLES/danish/bingo/Billedbingo 2.webp' '$SAMPLES/danish/bingo/billedbingo-2.webp'; then
      chattr +i '$SAMPLES/danish/bingo/billedbingo-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/bingo' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/bingo/billedbingo-2.webp' 2>/dev/null || true
      echo "  OK: danish/bingo/Billedbingo 2.webp -> danish/bingo/billedbingo-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/bingo/billedbingo-2.webp' '$SAMPLES/danish/bingo' 2>/dev/null; mv '$SAMPLES/danish/bingo/billedbingo-2.webp' '$SAMPLES/danish/bingo/Billedbingo 2.webp'; chattr +i '$SAMPLES/danish/bingo/Billedbingo 2.webp' '$SAMPLES/danish/bingo' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/bingo/Billedbingo 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/bingo/Billedbingo 2.webp' '$SAMPLES/danish/bingo' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/bingo/Billedbingo 2.webp -> danish/bingo/billedbingo-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/bingo/billedbingo-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/bingo/Billedbingo 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/bingo/Billedbingo 3.webp → danish/bingo/billedbingo-3.webp
if [ -f '$SAMPLES/danish/bingo/Billedbingo 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/bingo/Billedbingo 3.webp' '$SAMPLES/danish/bingo' 2>/dev/null || true
    if mv '$SAMPLES/danish/bingo/Billedbingo 3.webp' '$SAMPLES/danish/bingo/billedbingo-3.webp'; then
      chattr +i '$SAMPLES/danish/bingo/billedbingo-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/bingo' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/bingo/billedbingo-3.webp' 2>/dev/null || true
      echo "  OK: danish/bingo/Billedbingo 3.webp -> danish/bingo/billedbingo-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/bingo/billedbingo-3.webp' '$SAMPLES/danish/bingo' 2>/dev/null; mv '$SAMPLES/danish/bingo/billedbingo-3.webp' '$SAMPLES/danish/bingo/Billedbingo 3.webp'; chattr +i '$SAMPLES/danish/bingo/Billedbingo 3.webp' '$SAMPLES/danish/bingo' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/bingo/Billedbingo 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/bingo/Billedbingo 3.webp' '$SAMPLES/danish/bingo' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/bingo/Billedbingo 3.webp -> danish/bingo/billedbingo-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/bingo/billedbingo-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/bingo/Billedbingo 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/bingo/Billedbingo 4.webp → danish/bingo/billedbingo-4.webp
if [ -f '$SAMPLES/danish/bingo/Billedbingo 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/bingo/Billedbingo 4.webp' '$SAMPLES/danish/bingo' 2>/dev/null || true
    if mv '$SAMPLES/danish/bingo/Billedbingo 4.webp' '$SAMPLES/danish/bingo/billedbingo-4.webp'; then
      chattr +i '$SAMPLES/danish/bingo/billedbingo-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/bingo' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/bingo/billedbingo-4.webp' 2>/dev/null || true
      echo "  OK: danish/bingo/Billedbingo 4.webp -> danish/bingo/billedbingo-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/bingo/billedbingo-4.webp' '$SAMPLES/danish/bingo' 2>/dev/null; mv '$SAMPLES/danish/bingo/billedbingo-4.webp' '$SAMPLES/danish/bingo/Billedbingo 4.webp'; chattr +i '$SAMPLES/danish/bingo/Billedbingo 4.webp' '$SAMPLES/danish/bingo' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/bingo/Billedbingo 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/bingo/Billedbingo 4.webp' '$SAMPLES/danish/bingo' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/bingo/Billedbingo 4.webp -> danish/bingo/billedbingo-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/bingo/billedbingo-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/bingo/Billedbingo 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/bingo/Billedbingo 1 callout.webp → danish/bingo/billedbingo-1-callout.webp
if [ -f '$SAMPLES/danish/bingo/Billedbingo 1 callout.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/bingo/Billedbingo 1 callout.webp' '$SAMPLES/danish/bingo' 2>/dev/null || true
    if mv '$SAMPLES/danish/bingo/Billedbingo 1 callout.webp' '$SAMPLES/danish/bingo/billedbingo-1-callout.webp'; then
      chattr +i '$SAMPLES/danish/bingo/billedbingo-1-callout.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/bingo' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/bingo/billedbingo-1-callout.webp' 2>/dev/null || true
      echo "  OK: danish/bingo/Billedbingo 1 callout.webp -> danish/bingo/billedbingo-1-callout.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/bingo/billedbingo-1-callout.webp' '$SAMPLES/danish/bingo' 2>/dev/null; mv '$SAMPLES/danish/bingo/billedbingo-1-callout.webp' '$SAMPLES/danish/bingo/Billedbingo 1 callout.webp'; chattr +i '$SAMPLES/danish/bingo/Billedbingo 1 callout.webp' '$SAMPLES/danish/bingo' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/bingo/Billedbingo 1 callout.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/bingo/Billedbingo 1 callout.webp' '$SAMPLES/danish/bingo' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/bingo/Billedbingo 1 callout.webp -> danish/bingo/billedbingo-1-callout.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/bingo/billedbingo-1-callout.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/bingo/Billedbingo 1 callout.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/sudoku/Billede-Sudoku 1.webp → danish/sudoku/billede-sudoku-1.webp
if [ -f '$SAMPLES/danish/sudoku/Billede-Sudoku 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/sudoku/Billede-Sudoku 1.webp' '$SAMPLES/danish/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/danish/sudoku/Billede-Sudoku 1.webp' '$SAMPLES/danish/sudoku/billede-sudoku-1.webp'; then
      chattr +i '$SAMPLES/danish/sudoku/billede-sudoku-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/sudoku/billede-sudoku-1.webp' 2>/dev/null || true
      echo "  OK: danish/sudoku/Billede-Sudoku 1.webp -> danish/sudoku/billede-sudoku-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/sudoku/billede-sudoku-1.webp' '$SAMPLES/danish/sudoku' 2>/dev/null; mv '$SAMPLES/danish/sudoku/billede-sudoku-1.webp' '$SAMPLES/danish/sudoku/Billede-Sudoku 1.webp'; chattr +i '$SAMPLES/danish/sudoku/Billede-Sudoku 1.webp' '$SAMPLES/danish/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/sudoku/Billede-Sudoku 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/sudoku/Billede-Sudoku 1.webp' '$SAMPLES/danish/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/sudoku/Billede-Sudoku 1.webp -> danish/sudoku/billede-sudoku-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/sudoku/billede-sudoku-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/sudoku/Billede-Sudoku 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/sudoku/Billede-Sudoku 3.webp → danish/sudoku/billede-sudoku-3.webp
if [ -f '$SAMPLES/danish/sudoku/Billede-Sudoku 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/sudoku/Billede-Sudoku 3.webp' '$SAMPLES/danish/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/danish/sudoku/Billede-Sudoku 3.webp' '$SAMPLES/danish/sudoku/billede-sudoku-3.webp'; then
      chattr +i '$SAMPLES/danish/sudoku/billede-sudoku-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/sudoku/billede-sudoku-3.webp' 2>/dev/null || true
      echo "  OK: danish/sudoku/Billede-Sudoku 3.webp -> danish/sudoku/billede-sudoku-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/sudoku/billede-sudoku-3.webp' '$SAMPLES/danish/sudoku' 2>/dev/null; mv '$SAMPLES/danish/sudoku/billede-sudoku-3.webp' '$SAMPLES/danish/sudoku/Billede-Sudoku 3.webp'; chattr +i '$SAMPLES/danish/sudoku/Billede-Sudoku 3.webp' '$SAMPLES/danish/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/sudoku/Billede-Sudoku 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/sudoku/Billede-Sudoku 3.webp' '$SAMPLES/danish/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/sudoku/Billede-Sudoku 3.webp -> danish/sudoku/billede-sudoku-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/sudoku/billede-sudoku-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/sudoku/Billede-Sudoku 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/sudoku/Billede-Sudoku 4.webp → danish/sudoku/billede-sudoku-4.webp
if [ -f '$SAMPLES/danish/sudoku/Billede-Sudoku 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/sudoku/Billede-Sudoku 4.webp' '$SAMPLES/danish/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/danish/sudoku/Billede-Sudoku 4.webp' '$SAMPLES/danish/sudoku/billede-sudoku-4.webp'; then
      chattr +i '$SAMPLES/danish/sudoku/billede-sudoku-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/sudoku/billede-sudoku-4.webp' 2>/dev/null || true
      echo "  OK: danish/sudoku/Billede-Sudoku 4.webp -> danish/sudoku/billede-sudoku-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/sudoku/billede-sudoku-4.webp' '$SAMPLES/danish/sudoku' 2>/dev/null; mv '$SAMPLES/danish/sudoku/billede-sudoku-4.webp' '$SAMPLES/danish/sudoku/Billede-Sudoku 4.webp'; chattr +i '$SAMPLES/danish/sudoku/Billede-Sudoku 4.webp' '$SAMPLES/danish/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/sudoku/Billede-Sudoku 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/sudoku/Billede-Sudoku 4.webp' '$SAMPLES/danish/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/sudoku/Billede-Sudoku 4.webp -> danish/sudoku/billede-sudoku-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/sudoku/billede-sudoku-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/sudoku/Billede-Sudoku 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/sudoku/Billede-Sudoku 5.webp → danish/sudoku/billede-sudoku-5.webp
if [ -f '$SAMPLES/danish/sudoku/Billede-Sudoku 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/sudoku/Billede-Sudoku 5.webp' '$SAMPLES/danish/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/danish/sudoku/Billede-Sudoku 5.webp' '$SAMPLES/danish/sudoku/billede-sudoku-5.webp'; then
      chattr +i '$SAMPLES/danish/sudoku/billede-sudoku-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/sudoku/billede-sudoku-5.webp' 2>/dev/null || true
      echo "  OK: danish/sudoku/Billede-Sudoku 5.webp -> danish/sudoku/billede-sudoku-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/sudoku/billede-sudoku-5.webp' '$SAMPLES/danish/sudoku' 2>/dev/null; mv '$SAMPLES/danish/sudoku/billede-sudoku-5.webp' '$SAMPLES/danish/sudoku/Billede-Sudoku 5.webp'; chattr +i '$SAMPLES/danish/sudoku/Billede-Sudoku 5.webp' '$SAMPLES/danish/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/sudoku/Billede-Sudoku 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/sudoku/Billede-Sudoku 5.webp' '$SAMPLES/danish/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/sudoku/Billede-Sudoku 5.webp -> danish/sudoku/billede-sudoku-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/sudoku/billede-sudoku-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/sudoku/Billede-Sudoku 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/sudoku/Billede-Sudoku 1 answer_key.webp → danish/sudoku/billede-sudoku-1-answer-key.webp
if [ -f '$SAMPLES/danish/sudoku/Billede-Sudoku 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/sudoku/Billede-Sudoku 1 answer_key.webp' '$SAMPLES/danish/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/danish/sudoku/Billede-Sudoku 1 answer_key.webp' '$SAMPLES/danish/sudoku/billede-sudoku-1-answer-key.webp'; then
      chattr +i '$SAMPLES/danish/sudoku/billede-sudoku-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/sudoku/billede-sudoku-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: danish/sudoku/Billede-Sudoku 1 answer_key.webp -> danish/sudoku/billede-sudoku-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/sudoku/billede-sudoku-1-answer-key.webp' '$SAMPLES/danish/sudoku' 2>/dev/null; mv '$SAMPLES/danish/sudoku/billede-sudoku-1-answer-key.webp' '$SAMPLES/danish/sudoku/Billede-Sudoku 1 answer_key.webp'; chattr +i '$SAMPLES/danish/sudoku/Billede-Sudoku 1 answer_key.webp' '$SAMPLES/danish/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/sudoku/Billede-Sudoku 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/sudoku/Billede-Sudoku 1 answer_key.webp' '$SAMPLES/danish/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/sudoku/Billede-Sudoku 1 answer_key.webp -> danish/sudoku/billede-sudoku-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/sudoku/billede-sudoku-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/sudoku/Billede-Sudoku 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/crossword/Billedkrydsord 2.webp → danish/crossword/billedkrydsord-2.webp
if [ -f '$SAMPLES/danish/crossword/Billedkrydsord 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/crossword/Billedkrydsord 2.webp' '$SAMPLES/danish/crossword' 2>/dev/null || true
    if mv '$SAMPLES/danish/crossword/Billedkrydsord 2.webp' '$SAMPLES/danish/crossword/billedkrydsord-2.webp'; then
      chattr +i '$SAMPLES/danish/crossword/billedkrydsord-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/crossword/billedkrydsord-2.webp' 2>/dev/null || true
      echo "  OK: danish/crossword/Billedkrydsord 2.webp -> danish/crossword/billedkrydsord-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/crossword/billedkrydsord-2.webp' '$SAMPLES/danish/crossword' 2>/dev/null; mv '$SAMPLES/danish/crossword/billedkrydsord-2.webp' '$SAMPLES/danish/crossword/Billedkrydsord 2.webp'; chattr +i '$SAMPLES/danish/crossword/Billedkrydsord 2.webp' '$SAMPLES/danish/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/crossword/Billedkrydsord 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/crossword/Billedkrydsord 2.webp' '$SAMPLES/danish/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/crossword/Billedkrydsord 2.webp -> danish/crossword/billedkrydsord-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/crossword/billedkrydsord-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/crossword/Billedkrydsord 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/crossword/Billedkrydsord 3.webp → danish/crossword/billedkrydsord-3.webp
if [ -f '$SAMPLES/danish/crossword/Billedkrydsord 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/crossword/Billedkrydsord 3.webp' '$SAMPLES/danish/crossword' 2>/dev/null || true
    if mv '$SAMPLES/danish/crossword/Billedkrydsord 3.webp' '$SAMPLES/danish/crossword/billedkrydsord-3.webp'; then
      chattr +i '$SAMPLES/danish/crossword/billedkrydsord-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/crossword/billedkrydsord-3.webp' 2>/dev/null || true
      echo "  OK: danish/crossword/Billedkrydsord 3.webp -> danish/crossword/billedkrydsord-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/crossword/billedkrydsord-3.webp' '$SAMPLES/danish/crossword' 2>/dev/null; mv '$SAMPLES/danish/crossword/billedkrydsord-3.webp' '$SAMPLES/danish/crossword/Billedkrydsord 3.webp'; chattr +i '$SAMPLES/danish/crossword/Billedkrydsord 3.webp' '$SAMPLES/danish/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/crossword/Billedkrydsord 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/crossword/Billedkrydsord 3.webp' '$SAMPLES/danish/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/crossword/Billedkrydsord 3.webp -> danish/crossword/billedkrydsord-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/crossword/billedkrydsord-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/crossword/Billedkrydsord 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/crossword/Billedkrydsord 4.webp → danish/crossword/billedkrydsord-4.webp
if [ -f '$SAMPLES/danish/crossword/Billedkrydsord 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/crossword/Billedkrydsord 4.webp' '$SAMPLES/danish/crossword' 2>/dev/null || true
    if mv '$SAMPLES/danish/crossword/Billedkrydsord 4.webp' '$SAMPLES/danish/crossword/billedkrydsord-4.webp'; then
      chattr +i '$SAMPLES/danish/crossword/billedkrydsord-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/crossword/billedkrydsord-4.webp' 2>/dev/null || true
      echo "  OK: danish/crossword/Billedkrydsord 4.webp -> danish/crossword/billedkrydsord-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/crossword/billedkrydsord-4.webp' '$SAMPLES/danish/crossword' 2>/dev/null; mv '$SAMPLES/danish/crossword/billedkrydsord-4.webp' '$SAMPLES/danish/crossword/Billedkrydsord 4.webp'; chattr +i '$SAMPLES/danish/crossword/Billedkrydsord 4.webp' '$SAMPLES/danish/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/crossword/Billedkrydsord 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/crossword/Billedkrydsord 4.webp' '$SAMPLES/danish/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/crossword/Billedkrydsord 4.webp -> danish/crossword/billedkrydsord-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/crossword/billedkrydsord-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/crossword/Billedkrydsord 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/crossword/Billedkrydsord 5.webp → danish/crossword/billedkrydsord-5.webp
if [ -f '$SAMPLES/danish/crossword/Billedkrydsord 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/crossword/Billedkrydsord 5.webp' '$SAMPLES/danish/crossword' 2>/dev/null || true
    if mv '$SAMPLES/danish/crossword/Billedkrydsord 5.webp' '$SAMPLES/danish/crossword/billedkrydsord-5.webp'; then
      chattr +i '$SAMPLES/danish/crossword/billedkrydsord-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/crossword/billedkrydsord-5.webp' 2>/dev/null || true
      echo "  OK: danish/crossword/Billedkrydsord 5.webp -> danish/crossword/billedkrydsord-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/crossword/billedkrydsord-5.webp' '$SAMPLES/danish/crossword' 2>/dev/null; mv '$SAMPLES/danish/crossword/billedkrydsord-5.webp' '$SAMPLES/danish/crossword/Billedkrydsord 5.webp'; chattr +i '$SAMPLES/danish/crossword/Billedkrydsord 5.webp' '$SAMPLES/danish/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/crossword/Billedkrydsord 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/crossword/Billedkrydsord 5.webp' '$SAMPLES/danish/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/crossword/Billedkrydsord 5.webp -> danish/crossword/billedkrydsord-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/crossword/billedkrydsord-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/crossword/Billedkrydsord 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# danish/crossword/Billedkrydsord 1 answer_key.webp → danish/crossword/billedkrydsord-1-answer-key.webp
if [ -f '$SAMPLES/danish/crossword/Billedkrydsord 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/danish/crossword/Billedkrydsord 1 answer_key.webp' '$SAMPLES/danish/crossword' 2>/dev/null || true
    if mv '$SAMPLES/danish/crossword/Billedkrydsord 1 answer_key.webp' '$SAMPLES/danish/crossword/billedkrydsord-1-answer-key.webp'; then
      chattr +i '$SAMPLES/danish/crossword/billedkrydsord-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/danish/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/danish/crossword/billedkrydsord-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: danish/crossword/Billedkrydsord 1 answer_key.webp -> danish/crossword/billedkrydsord-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/danish/crossword/billedkrydsord-1-answer-key.webp' '$SAMPLES/danish/crossword' 2>/dev/null; mv '$SAMPLES/danish/crossword/billedkrydsord-1-answer-key.webp' '$SAMPLES/danish/crossword/Billedkrydsord 1 answer_key.webp'; chattr +i '$SAMPLES/danish/crossword/Billedkrydsord 1 answer_key.webp' '$SAMPLES/danish/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: danish/crossword/Billedkrydsord 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/danish/crossword/Billedkrydsord 1 answer_key.webp' '$SAMPLES/danish/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: danish/crossword/Billedkrydsord 1 answer_key.webp -> danish/crossword/billedkrydsord-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/danish/crossword/billedkrydsord-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: danish/crossword/Billedkrydsord 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/addition/Gøy Addisjon 1.webp → norwegian/addition/gøy-addisjon-1.webp
if [ -f '$SAMPLES/norwegian/addition/Gøy Addisjon 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/addition/Gøy Addisjon 1.webp' '$SAMPLES/norwegian/addition' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/addition/Gøy Addisjon 1.webp' '$SAMPLES/norwegian/addition/gøy-addisjon-1.webp'; then
      chattr +i '$SAMPLES/norwegian/addition/gøy-addisjon-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/addition/gøy-addisjon-1.webp' 2>/dev/null || true
      echo "  OK: norwegian/addition/Gøy Addisjon 1.webp -> norwegian/addition/gøy-addisjon-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/addition/gøy-addisjon-1.webp' '$SAMPLES/norwegian/addition' 2>/dev/null; mv '$SAMPLES/norwegian/addition/gøy-addisjon-1.webp' '$SAMPLES/norwegian/addition/Gøy Addisjon 1.webp'; chattr +i '$SAMPLES/norwegian/addition/Gøy Addisjon 1.webp' '$SAMPLES/norwegian/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/addition/Gøy Addisjon 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/addition/Gøy Addisjon 1.webp' '$SAMPLES/norwegian/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/addition/Gøy Addisjon 1.webp -> norwegian/addition/gøy-addisjon-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/addition/gøy-addisjon-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/addition/Gøy Addisjon 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/addition/Gøy Addisjon 2.webp → norwegian/addition/gøy-addisjon-2.webp
if [ -f '$SAMPLES/norwegian/addition/Gøy Addisjon 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/addition/Gøy Addisjon 2.webp' '$SAMPLES/norwegian/addition' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/addition/Gøy Addisjon 2.webp' '$SAMPLES/norwegian/addition/gøy-addisjon-2.webp'; then
      chattr +i '$SAMPLES/norwegian/addition/gøy-addisjon-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/addition/gøy-addisjon-2.webp' 2>/dev/null || true
      echo "  OK: norwegian/addition/Gøy Addisjon 2.webp -> norwegian/addition/gøy-addisjon-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/addition/gøy-addisjon-2.webp' '$SAMPLES/norwegian/addition' 2>/dev/null; mv '$SAMPLES/norwegian/addition/gøy-addisjon-2.webp' '$SAMPLES/norwegian/addition/Gøy Addisjon 2.webp'; chattr +i '$SAMPLES/norwegian/addition/Gøy Addisjon 2.webp' '$SAMPLES/norwegian/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/addition/Gøy Addisjon 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/addition/Gøy Addisjon 2.webp' '$SAMPLES/norwegian/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/addition/Gøy Addisjon 2.webp -> norwegian/addition/gøy-addisjon-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/addition/gøy-addisjon-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/addition/Gøy Addisjon 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/addition/Gøy Addisjon 3.webp → norwegian/addition/gøy-addisjon-3.webp
if [ -f '$SAMPLES/norwegian/addition/Gøy Addisjon 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/addition/Gøy Addisjon 3.webp' '$SAMPLES/norwegian/addition' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/addition/Gøy Addisjon 3.webp' '$SAMPLES/norwegian/addition/gøy-addisjon-3.webp'; then
      chattr +i '$SAMPLES/norwegian/addition/gøy-addisjon-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/addition/gøy-addisjon-3.webp' 2>/dev/null || true
      echo "  OK: norwegian/addition/Gøy Addisjon 3.webp -> norwegian/addition/gøy-addisjon-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/addition/gøy-addisjon-3.webp' '$SAMPLES/norwegian/addition' 2>/dev/null; mv '$SAMPLES/norwegian/addition/gøy-addisjon-3.webp' '$SAMPLES/norwegian/addition/Gøy Addisjon 3.webp'; chattr +i '$SAMPLES/norwegian/addition/Gøy Addisjon 3.webp' '$SAMPLES/norwegian/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/addition/Gøy Addisjon 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/addition/Gøy Addisjon 3.webp' '$SAMPLES/norwegian/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/addition/Gøy Addisjon 3.webp -> norwegian/addition/gøy-addisjon-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/addition/gøy-addisjon-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/addition/Gøy Addisjon 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/addition/Gøy Addisjon 4.webp → norwegian/addition/gøy-addisjon-4.webp
if [ -f '$SAMPLES/norwegian/addition/Gøy Addisjon 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/addition/Gøy Addisjon 4.webp' '$SAMPLES/norwegian/addition' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/addition/Gøy Addisjon 4.webp' '$SAMPLES/norwegian/addition/gøy-addisjon-4.webp'; then
      chattr +i '$SAMPLES/norwegian/addition/gøy-addisjon-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/addition/gøy-addisjon-4.webp' 2>/dev/null || true
      echo "  OK: norwegian/addition/Gøy Addisjon 4.webp -> norwegian/addition/gøy-addisjon-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/addition/gøy-addisjon-4.webp' '$SAMPLES/norwegian/addition' 2>/dev/null; mv '$SAMPLES/norwegian/addition/gøy-addisjon-4.webp' '$SAMPLES/norwegian/addition/Gøy Addisjon 4.webp'; chattr +i '$SAMPLES/norwegian/addition/Gøy Addisjon 4.webp' '$SAMPLES/norwegian/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/addition/Gøy Addisjon 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/addition/Gøy Addisjon 4.webp' '$SAMPLES/norwegian/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/addition/Gøy Addisjon 4.webp -> norwegian/addition/gøy-addisjon-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/addition/gøy-addisjon-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/addition/Gøy Addisjon 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/addition/Gøy Addisjon 5.webp → norwegian/addition/gøy-addisjon-5.webp
if [ -f '$SAMPLES/norwegian/addition/Gøy Addisjon 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/addition/Gøy Addisjon 5.webp' '$SAMPLES/norwegian/addition' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/addition/Gøy Addisjon 5.webp' '$SAMPLES/norwegian/addition/gøy-addisjon-5.webp'; then
      chattr +i '$SAMPLES/norwegian/addition/gøy-addisjon-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/addition/gøy-addisjon-5.webp' 2>/dev/null || true
      echo "  OK: norwegian/addition/Gøy Addisjon 5.webp -> norwegian/addition/gøy-addisjon-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/addition/gøy-addisjon-5.webp' '$SAMPLES/norwegian/addition' 2>/dev/null; mv '$SAMPLES/norwegian/addition/gøy-addisjon-5.webp' '$SAMPLES/norwegian/addition/Gøy Addisjon 5.webp'; chattr +i '$SAMPLES/norwegian/addition/Gøy Addisjon 5.webp' '$SAMPLES/norwegian/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/addition/Gøy Addisjon 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/addition/Gøy Addisjon 5.webp' '$SAMPLES/norwegian/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/addition/Gøy Addisjon 5.webp -> norwegian/addition/gøy-addisjon-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/addition/gøy-addisjon-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/addition/Gøy Addisjon 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/addition/Gøy Addisjon 1 answer_key.webp → norwegian/addition/gøy-addisjon-1-answer-key.webp
if [ -f '$SAMPLES/norwegian/addition/Gøy Addisjon 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/addition/Gøy Addisjon 1 answer_key.webp' '$SAMPLES/norwegian/addition' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/addition/Gøy Addisjon 1 answer_key.webp' '$SAMPLES/norwegian/addition/gøy-addisjon-1-answer-key.webp'; then
      chattr +i '$SAMPLES/norwegian/addition/gøy-addisjon-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/addition/gøy-addisjon-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: norwegian/addition/Gøy Addisjon 1 answer_key.webp -> norwegian/addition/gøy-addisjon-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/addition/gøy-addisjon-1-answer-key.webp' '$SAMPLES/norwegian/addition' 2>/dev/null; mv '$SAMPLES/norwegian/addition/gøy-addisjon-1-answer-key.webp' '$SAMPLES/norwegian/addition/Gøy Addisjon 1 answer_key.webp'; chattr +i '$SAMPLES/norwegian/addition/Gøy Addisjon 1 answer_key.webp' '$SAMPLES/norwegian/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/addition/Gøy Addisjon 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/addition/Gøy Addisjon 1 answer_key.webp' '$SAMPLES/norwegian/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/addition/Gøy Addisjon 1 answer_key.webp -> norwegian/addition/gøy-addisjon-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/addition/gøy-addisjon-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/addition/Gøy Addisjon 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/subtraction/Moro med Subtraksjon 1.webp → norwegian/subtraction/moro-med-subtraksjon-1.webp
if [ -f '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 1.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 1.webp' '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-1.webp'; then
      chattr +i '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-1.webp' 2>/dev/null || true
      echo "  OK: norwegian/subtraction/Moro med Subtraksjon 1.webp -> norwegian/subtraction/moro-med-subtraksjon-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-1.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null; mv '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-1.webp' '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 1.webp'; chattr +i '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 1.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/subtraction/Moro med Subtraksjon 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 1.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/subtraction/Moro med Subtraksjon 1.webp -> norwegian/subtraction/moro-med-subtraksjon-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/subtraction/Moro med Subtraksjon 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/subtraction/Moro med Subtraksjon 2.webp → norwegian/subtraction/moro-med-subtraksjon-2.webp
if [ -f '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 2.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 2.webp' '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-2.webp'; then
      chattr +i '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-2.webp' 2>/dev/null || true
      echo "  OK: norwegian/subtraction/Moro med Subtraksjon 2.webp -> norwegian/subtraction/moro-med-subtraksjon-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-2.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null; mv '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-2.webp' '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 2.webp'; chattr +i '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 2.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/subtraction/Moro med Subtraksjon 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 2.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/subtraction/Moro med Subtraksjon 2.webp -> norwegian/subtraction/moro-med-subtraksjon-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/subtraction/Moro med Subtraksjon 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/subtraction/Moro med Subtraksjon 4.webp → norwegian/subtraction/moro-med-subtraksjon-4.webp
if [ -f '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 4.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 4.webp' '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-4.webp'; then
      chattr +i '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-4.webp' 2>/dev/null || true
      echo "  OK: norwegian/subtraction/Moro med Subtraksjon 4.webp -> norwegian/subtraction/moro-med-subtraksjon-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-4.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null; mv '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-4.webp' '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 4.webp'; chattr +i '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 4.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/subtraction/Moro med Subtraksjon 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 4.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/subtraction/Moro med Subtraksjon 4.webp -> norwegian/subtraction/moro-med-subtraksjon-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/subtraction/Moro med Subtraksjon 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/subtraction/Moro med Subtraksjon 5.webp → norwegian/subtraction/moro-med-subtraksjon-5.webp
if [ -f '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 5.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 5.webp' '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-5.webp'; then
      chattr +i '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-5.webp' 2>/dev/null || true
      echo "  OK: norwegian/subtraction/Moro med Subtraksjon 5.webp -> norwegian/subtraction/moro-med-subtraksjon-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-5.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null; mv '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-5.webp' '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 5.webp'; chattr +i '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 5.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/subtraction/Moro med Subtraksjon 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 5.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/subtraction/Moro med Subtraksjon 5.webp -> norwegian/subtraction/moro-med-subtraksjon-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/subtraction/Moro med Subtraksjon 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/subtraction/Moro med Subtraksjon 6.webp → norwegian/subtraction/moro-med-subtraksjon-6.webp
if [ -f '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 6.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 6.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 6.webp' '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-6.webp'; then
      chattr +i '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-6.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-6.webp' 2>/dev/null || true
      echo "  OK: norwegian/subtraction/Moro med Subtraksjon 6.webp -> norwegian/subtraction/moro-med-subtraksjon-6.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-6.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null; mv '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-6.webp' '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 6.webp'; chattr +i '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 6.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/subtraction/Moro med Subtraksjon 6.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 6.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/subtraction/Moro med Subtraksjon 6.webp -> norwegian/subtraction/moro-med-subtraksjon-6.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-6.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/subtraction/Moro med Subtraksjon 6.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/subtraction/Moro med Subtraksjon 1 answer_key.webp → norwegian/subtraction/moro-med-subtraksjon-1-answer-key.webp
if [ -f '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 1 answer_key.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 1 answer_key.webp' '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-1-answer-key.webp'; then
      chattr +i '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: norwegian/subtraction/Moro med Subtraksjon 1 answer_key.webp -> norwegian/subtraction/moro-med-subtraksjon-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-1-answer-key.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null; mv '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-1-answer-key.webp' '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 1 answer_key.webp'; chattr +i '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 1 answer_key.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/subtraction/Moro med Subtraksjon 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/subtraction/Moro med Subtraksjon 1 answer_key.webp' '$SAMPLES/norwegian/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/subtraction/Moro med Subtraksjon 1 answer_key.webp -> norwegian/subtraction/moro-med-subtraksjon-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/subtraction/moro-med-subtraksjon-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/subtraction/Moro med Subtraksjon 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/prepositions/Preposisjoner 1.webp → norwegian/prepositions/preposisjoner-1.webp
if [ -f '$SAMPLES/norwegian/prepositions/Preposisjoner 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/prepositions/Preposisjoner 1.webp' '$SAMPLES/norwegian/prepositions' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/prepositions/Preposisjoner 1.webp' '$SAMPLES/norwegian/prepositions/preposisjoner-1.webp'; then
      chattr +i '$SAMPLES/norwegian/prepositions/preposisjoner-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/prepositions' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/prepositions/preposisjoner-1.webp' 2>/dev/null || true
      echo "  OK: norwegian/prepositions/Preposisjoner 1.webp -> norwegian/prepositions/preposisjoner-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/prepositions/preposisjoner-1.webp' '$SAMPLES/norwegian/prepositions' 2>/dev/null; mv '$SAMPLES/norwegian/prepositions/preposisjoner-1.webp' '$SAMPLES/norwegian/prepositions/Preposisjoner 1.webp'; chattr +i '$SAMPLES/norwegian/prepositions/Preposisjoner 1.webp' '$SAMPLES/norwegian/prepositions' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/prepositions/Preposisjoner 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/prepositions/Preposisjoner 1.webp' '$SAMPLES/norwegian/prepositions' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/prepositions/Preposisjoner 1.webp -> norwegian/prepositions/preposisjoner-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/prepositions/preposisjoner-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/prepositions/Preposisjoner 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/prepositions/Preposisjoner 2.webp → norwegian/prepositions/preposisjoner-2.webp
if [ -f '$SAMPLES/norwegian/prepositions/Preposisjoner 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/prepositions/Preposisjoner 2.webp' '$SAMPLES/norwegian/prepositions' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/prepositions/Preposisjoner 2.webp' '$SAMPLES/norwegian/prepositions/preposisjoner-2.webp'; then
      chattr +i '$SAMPLES/norwegian/prepositions/preposisjoner-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/prepositions' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/prepositions/preposisjoner-2.webp' 2>/dev/null || true
      echo "  OK: norwegian/prepositions/Preposisjoner 2.webp -> norwegian/prepositions/preposisjoner-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/prepositions/preposisjoner-2.webp' '$SAMPLES/norwegian/prepositions' 2>/dev/null; mv '$SAMPLES/norwegian/prepositions/preposisjoner-2.webp' '$SAMPLES/norwegian/prepositions/Preposisjoner 2.webp'; chattr +i '$SAMPLES/norwegian/prepositions/Preposisjoner 2.webp' '$SAMPLES/norwegian/prepositions' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/prepositions/Preposisjoner 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/prepositions/Preposisjoner 2.webp' '$SAMPLES/norwegian/prepositions' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/prepositions/Preposisjoner 2.webp -> norwegian/prepositions/preposisjoner-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/prepositions/preposisjoner-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/prepositions/Preposisjoner 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/prepositions/Preposisjoner 3.webp → norwegian/prepositions/preposisjoner-3.webp
if [ -f '$SAMPLES/norwegian/prepositions/Preposisjoner 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/prepositions/Preposisjoner 3.webp' '$SAMPLES/norwegian/prepositions' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/prepositions/Preposisjoner 3.webp' '$SAMPLES/norwegian/prepositions/preposisjoner-3.webp'; then
      chattr +i '$SAMPLES/norwegian/prepositions/preposisjoner-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/prepositions' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/prepositions/preposisjoner-3.webp' 2>/dev/null || true
      echo "  OK: norwegian/prepositions/Preposisjoner 3.webp -> norwegian/prepositions/preposisjoner-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/prepositions/preposisjoner-3.webp' '$SAMPLES/norwegian/prepositions' 2>/dev/null; mv '$SAMPLES/norwegian/prepositions/preposisjoner-3.webp' '$SAMPLES/norwegian/prepositions/Preposisjoner 3.webp'; chattr +i '$SAMPLES/norwegian/prepositions/Preposisjoner 3.webp' '$SAMPLES/norwegian/prepositions' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/prepositions/Preposisjoner 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/prepositions/Preposisjoner 3.webp' '$SAMPLES/norwegian/prepositions' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/prepositions/Preposisjoner 3.webp -> norwegian/prepositions/preposisjoner-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/prepositions/preposisjoner-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/prepositions/Preposisjoner 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/prepositions/Preposisjoner 1 answer_key.webp → norwegian/prepositions/preposisjoner-1-answer-key.webp
if [ -f '$SAMPLES/norwegian/prepositions/Preposisjoner 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/prepositions/Preposisjoner 1 answer_key.webp' '$SAMPLES/norwegian/prepositions' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/prepositions/Preposisjoner 1 answer_key.webp' '$SAMPLES/norwegian/prepositions/preposisjoner-1-answer-key.webp'; then
      chattr +i '$SAMPLES/norwegian/prepositions/preposisjoner-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/prepositions' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/prepositions/preposisjoner-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: norwegian/prepositions/Preposisjoner 1 answer_key.webp -> norwegian/prepositions/preposisjoner-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/prepositions/preposisjoner-1-answer-key.webp' '$SAMPLES/norwegian/prepositions' 2>/dev/null; mv '$SAMPLES/norwegian/prepositions/preposisjoner-1-answer-key.webp' '$SAMPLES/norwegian/prepositions/Preposisjoner 1 answer_key.webp'; chattr +i '$SAMPLES/norwegian/prepositions/Preposisjoner 1 answer_key.webp' '$SAMPLES/norwegian/prepositions' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/prepositions/Preposisjoner 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/prepositions/Preposisjoner 1 answer_key.webp' '$SAMPLES/norwegian/prepositions' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/prepositions/Preposisjoner 1 answer_key.webp -> norwegian/prepositions/preposisjoner-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/prepositions/preposisjoner-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/prepositions/Preposisjoner 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/wordsearch/Ordleting 1.webp → norwegian/wordsearch/ordleting-1.webp
if [ -f '$SAMPLES/norwegian/wordsearch/Ordleting 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/wordsearch/Ordleting 1.webp' '$SAMPLES/norwegian/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/wordsearch/Ordleting 1.webp' '$SAMPLES/norwegian/wordsearch/ordleting-1.webp'; then
      chattr +i '$SAMPLES/norwegian/wordsearch/ordleting-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/wordsearch/ordleting-1.webp' 2>/dev/null || true
      echo "  OK: norwegian/wordsearch/Ordleting 1.webp -> norwegian/wordsearch/ordleting-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/wordsearch/ordleting-1.webp' '$SAMPLES/norwegian/wordsearch' 2>/dev/null; mv '$SAMPLES/norwegian/wordsearch/ordleting-1.webp' '$SAMPLES/norwegian/wordsearch/Ordleting 1.webp'; chattr +i '$SAMPLES/norwegian/wordsearch/Ordleting 1.webp' '$SAMPLES/norwegian/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/wordsearch/Ordleting 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/wordsearch/Ordleting 1.webp' '$SAMPLES/norwegian/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/wordsearch/Ordleting 1.webp -> norwegian/wordsearch/ordleting-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/wordsearch/ordleting-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/wordsearch/Ordleting 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/wordsearch/Ordleting 2.webp → norwegian/wordsearch/ordleting-2.webp
if [ -f '$SAMPLES/norwegian/wordsearch/Ordleting 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/wordsearch/Ordleting 2.webp' '$SAMPLES/norwegian/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/wordsearch/Ordleting 2.webp' '$SAMPLES/norwegian/wordsearch/ordleting-2.webp'; then
      chattr +i '$SAMPLES/norwegian/wordsearch/ordleting-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/wordsearch/ordleting-2.webp' 2>/dev/null || true
      echo "  OK: norwegian/wordsearch/Ordleting 2.webp -> norwegian/wordsearch/ordleting-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/wordsearch/ordleting-2.webp' '$SAMPLES/norwegian/wordsearch' 2>/dev/null; mv '$SAMPLES/norwegian/wordsearch/ordleting-2.webp' '$SAMPLES/norwegian/wordsearch/Ordleting 2.webp'; chattr +i '$SAMPLES/norwegian/wordsearch/Ordleting 2.webp' '$SAMPLES/norwegian/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/wordsearch/Ordleting 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/wordsearch/Ordleting 2.webp' '$SAMPLES/norwegian/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/wordsearch/Ordleting 2.webp -> norwegian/wordsearch/ordleting-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/wordsearch/ordleting-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/wordsearch/Ordleting 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/wordsearch/Ordleting 3.webp → norwegian/wordsearch/ordleting-3.webp
if [ -f '$SAMPLES/norwegian/wordsearch/Ordleting 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/wordsearch/Ordleting 3.webp' '$SAMPLES/norwegian/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/wordsearch/Ordleting 3.webp' '$SAMPLES/norwegian/wordsearch/ordleting-3.webp'; then
      chattr +i '$SAMPLES/norwegian/wordsearch/ordleting-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/wordsearch/ordleting-3.webp' 2>/dev/null || true
      echo "  OK: norwegian/wordsearch/Ordleting 3.webp -> norwegian/wordsearch/ordleting-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/wordsearch/ordleting-3.webp' '$SAMPLES/norwegian/wordsearch' 2>/dev/null; mv '$SAMPLES/norwegian/wordsearch/ordleting-3.webp' '$SAMPLES/norwegian/wordsearch/Ordleting 3.webp'; chattr +i '$SAMPLES/norwegian/wordsearch/Ordleting 3.webp' '$SAMPLES/norwegian/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/wordsearch/Ordleting 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/wordsearch/Ordleting 3.webp' '$SAMPLES/norwegian/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/wordsearch/Ordleting 3.webp -> norwegian/wordsearch/ordleting-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/wordsearch/ordleting-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/wordsearch/Ordleting 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/wordsearch/Ordleting 1 answer_key.webp → norwegian/wordsearch/ordleting-1-answer-key.webp
if [ -f '$SAMPLES/norwegian/wordsearch/Ordleting 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/wordsearch/Ordleting 1 answer_key.webp' '$SAMPLES/norwegian/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/wordsearch/Ordleting 1 answer_key.webp' '$SAMPLES/norwegian/wordsearch/ordleting-1-answer-key.webp'; then
      chattr +i '$SAMPLES/norwegian/wordsearch/ordleting-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/wordsearch/ordleting-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: norwegian/wordsearch/Ordleting 1 answer_key.webp -> norwegian/wordsearch/ordleting-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/wordsearch/ordleting-1-answer-key.webp' '$SAMPLES/norwegian/wordsearch' 2>/dev/null; mv '$SAMPLES/norwegian/wordsearch/ordleting-1-answer-key.webp' '$SAMPLES/norwegian/wordsearch/Ordleting 1 answer_key.webp'; chattr +i '$SAMPLES/norwegian/wordsearch/Ordleting 1 answer_key.webp' '$SAMPLES/norwegian/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/wordsearch/Ordleting 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/wordsearch/Ordleting 1 answer_key.webp' '$SAMPLES/norwegian/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/wordsearch/Ordleting 1 answer_key.webp -> norwegian/wordsearch/ordleting-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/wordsearch/ordleting-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/wordsearch/Ordleting 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/cryptogram/Bildekryptogram 1.webp → norwegian/cryptogram/bildekryptogram-1.webp
if [ -f '$SAMPLES/norwegian/cryptogram/Bildekryptogram 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/cryptogram/Bildekryptogram 1.webp' '$SAMPLES/norwegian/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/cryptogram/Bildekryptogram 1.webp' '$SAMPLES/norwegian/cryptogram/bildekryptogram-1.webp'; then
      chattr +i '$SAMPLES/norwegian/cryptogram/bildekryptogram-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/cryptogram/bildekryptogram-1.webp' 2>/dev/null || true
      echo "  OK: norwegian/cryptogram/Bildekryptogram 1.webp -> norwegian/cryptogram/bildekryptogram-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/cryptogram/bildekryptogram-1.webp' '$SAMPLES/norwegian/cryptogram' 2>/dev/null; mv '$SAMPLES/norwegian/cryptogram/bildekryptogram-1.webp' '$SAMPLES/norwegian/cryptogram/Bildekryptogram 1.webp'; chattr +i '$SAMPLES/norwegian/cryptogram/Bildekryptogram 1.webp' '$SAMPLES/norwegian/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/cryptogram/Bildekryptogram 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/cryptogram/Bildekryptogram 1.webp' '$SAMPLES/norwegian/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/cryptogram/Bildekryptogram 1.webp -> norwegian/cryptogram/bildekryptogram-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/cryptogram/bildekryptogram-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/cryptogram/Bildekryptogram 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/cryptogram/Bildekryptogram 2.webp → norwegian/cryptogram/bildekryptogram-2.webp
if [ -f '$SAMPLES/norwegian/cryptogram/Bildekryptogram 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/cryptogram/Bildekryptogram 2.webp' '$SAMPLES/norwegian/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/cryptogram/Bildekryptogram 2.webp' '$SAMPLES/norwegian/cryptogram/bildekryptogram-2.webp'; then
      chattr +i '$SAMPLES/norwegian/cryptogram/bildekryptogram-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/cryptogram/bildekryptogram-2.webp' 2>/dev/null || true
      echo "  OK: norwegian/cryptogram/Bildekryptogram 2.webp -> norwegian/cryptogram/bildekryptogram-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/cryptogram/bildekryptogram-2.webp' '$SAMPLES/norwegian/cryptogram' 2>/dev/null; mv '$SAMPLES/norwegian/cryptogram/bildekryptogram-2.webp' '$SAMPLES/norwegian/cryptogram/Bildekryptogram 2.webp'; chattr +i '$SAMPLES/norwegian/cryptogram/Bildekryptogram 2.webp' '$SAMPLES/norwegian/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/cryptogram/Bildekryptogram 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/cryptogram/Bildekryptogram 2.webp' '$SAMPLES/norwegian/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/cryptogram/Bildekryptogram 2.webp -> norwegian/cryptogram/bildekryptogram-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/cryptogram/bildekryptogram-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/cryptogram/Bildekryptogram 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/cryptogram/Bildekryptogram 4.webp → norwegian/cryptogram/bildekryptogram-4.webp
if [ -f '$SAMPLES/norwegian/cryptogram/Bildekryptogram 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/cryptogram/Bildekryptogram 4.webp' '$SAMPLES/norwegian/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/cryptogram/Bildekryptogram 4.webp' '$SAMPLES/norwegian/cryptogram/bildekryptogram-4.webp'; then
      chattr +i '$SAMPLES/norwegian/cryptogram/bildekryptogram-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/cryptogram/bildekryptogram-4.webp' 2>/dev/null || true
      echo "  OK: norwegian/cryptogram/Bildekryptogram 4.webp -> norwegian/cryptogram/bildekryptogram-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/cryptogram/bildekryptogram-4.webp' '$SAMPLES/norwegian/cryptogram' 2>/dev/null; mv '$SAMPLES/norwegian/cryptogram/bildekryptogram-4.webp' '$SAMPLES/norwegian/cryptogram/Bildekryptogram 4.webp'; chattr +i '$SAMPLES/norwegian/cryptogram/Bildekryptogram 4.webp' '$SAMPLES/norwegian/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/cryptogram/Bildekryptogram 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/cryptogram/Bildekryptogram 4.webp' '$SAMPLES/norwegian/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/cryptogram/Bildekryptogram 4.webp -> norwegian/cryptogram/bildekryptogram-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/cryptogram/bildekryptogram-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/cryptogram/Bildekryptogram 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/cryptogram/Bildekryptogram 5.webp → norwegian/cryptogram/bildekryptogram-5.webp
if [ -f '$SAMPLES/norwegian/cryptogram/Bildekryptogram 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/cryptogram/Bildekryptogram 5.webp' '$SAMPLES/norwegian/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/cryptogram/Bildekryptogram 5.webp' '$SAMPLES/norwegian/cryptogram/bildekryptogram-5.webp'; then
      chattr +i '$SAMPLES/norwegian/cryptogram/bildekryptogram-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/cryptogram/bildekryptogram-5.webp' 2>/dev/null || true
      echo "  OK: norwegian/cryptogram/Bildekryptogram 5.webp -> norwegian/cryptogram/bildekryptogram-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/cryptogram/bildekryptogram-5.webp' '$SAMPLES/norwegian/cryptogram' 2>/dev/null; mv '$SAMPLES/norwegian/cryptogram/bildekryptogram-5.webp' '$SAMPLES/norwegian/cryptogram/Bildekryptogram 5.webp'; chattr +i '$SAMPLES/norwegian/cryptogram/Bildekryptogram 5.webp' '$SAMPLES/norwegian/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/cryptogram/Bildekryptogram 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/cryptogram/Bildekryptogram 5.webp' '$SAMPLES/norwegian/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/cryptogram/Bildekryptogram 5.webp -> norwegian/cryptogram/bildekryptogram-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/cryptogram/bildekryptogram-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/cryptogram/Bildekryptogram 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/cryptogram/Bildekryptogram 1 answer_key.webp → norwegian/cryptogram/bildekryptogram-1-answer-key.webp
if [ -f '$SAMPLES/norwegian/cryptogram/Bildekryptogram 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/cryptogram/Bildekryptogram 1 answer_key.webp' '$SAMPLES/norwegian/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/cryptogram/Bildekryptogram 1 answer_key.webp' '$SAMPLES/norwegian/cryptogram/bildekryptogram-1-answer-key.webp'; then
      chattr +i '$SAMPLES/norwegian/cryptogram/bildekryptogram-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/cryptogram/bildekryptogram-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: norwegian/cryptogram/Bildekryptogram 1 answer_key.webp -> norwegian/cryptogram/bildekryptogram-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/cryptogram/bildekryptogram-1-answer-key.webp' '$SAMPLES/norwegian/cryptogram' 2>/dev/null; mv '$SAMPLES/norwegian/cryptogram/bildekryptogram-1-answer-key.webp' '$SAMPLES/norwegian/cryptogram/Bildekryptogram 1 answer_key.webp'; chattr +i '$SAMPLES/norwegian/cryptogram/Bildekryptogram 1 answer_key.webp' '$SAMPLES/norwegian/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/cryptogram/Bildekryptogram 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/cryptogram/Bildekryptogram 1 answer_key.webp' '$SAMPLES/norwegian/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/cryptogram/Bildekryptogram 1 answer_key.webp -> norwegian/cryptogram/bildekryptogram-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/cryptogram/bildekryptogram-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/cryptogram/Bildekryptogram 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/matching/Finn Parene 1.webp → norwegian/matching/finn-parene-1.webp
if [ -f '$SAMPLES/norwegian/matching/Finn Parene 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/matching/Finn Parene 1.webp' '$SAMPLES/norwegian/matching' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/matching/Finn Parene 1.webp' '$SAMPLES/norwegian/matching/finn-parene-1.webp'; then
      chattr +i '$SAMPLES/norwegian/matching/finn-parene-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/matching/finn-parene-1.webp' 2>/dev/null || true
      echo "  OK: norwegian/matching/Finn Parene 1.webp -> norwegian/matching/finn-parene-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/matching/finn-parene-1.webp' '$SAMPLES/norwegian/matching' 2>/dev/null; mv '$SAMPLES/norwegian/matching/finn-parene-1.webp' '$SAMPLES/norwegian/matching/Finn Parene 1.webp'; chattr +i '$SAMPLES/norwegian/matching/Finn Parene 1.webp' '$SAMPLES/norwegian/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/matching/Finn Parene 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/matching/Finn Parene 1.webp' '$SAMPLES/norwegian/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/matching/Finn Parene 1.webp -> norwegian/matching/finn-parene-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/matching/finn-parene-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/matching/Finn Parene 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/matching/Finn Parene 2.webp → norwegian/matching/finn-parene-2.webp
if [ -f '$SAMPLES/norwegian/matching/Finn Parene 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/matching/Finn Parene 2.webp' '$SAMPLES/norwegian/matching' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/matching/Finn Parene 2.webp' '$SAMPLES/norwegian/matching/finn-parene-2.webp'; then
      chattr +i '$SAMPLES/norwegian/matching/finn-parene-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/matching/finn-parene-2.webp' 2>/dev/null || true
      echo "  OK: norwegian/matching/Finn Parene 2.webp -> norwegian/matching/finn-parene-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/matching/finn-parene-2.webp' '$SAMPLES/norwegian/matching' 2>/dev/null; mv '$SAMPLES/norwegian/matching/finn-parene-2.webp' '$SAMPLES/norwegian/matching/Finn Parene 2.webp'; chattr +i '$SAMPLES/norwegian/matching/Finn Parene 2.webp' '$SAMPLES/norwegian/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/matching/Finn Parene 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/matching/Finn Parene 2.webp' '$SAMPLES/norwegian/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/matching/Finn Parene 2.webp -> norwegian/matching/finn-parene-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/matching/finn-parene-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/matching/Finn Parene 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/matching/Finn Parene 3.webp → norwegian/matching/finn-parene-3.webp
if [ -f '$SAMPLES/norwegian/matching/Finn Parene 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/matching/Finn Parene 3.webp' '$SAMPLES/norwegian/matching' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/matching/Finn Parene 3.webp' '$SAMPLES/norwegian/matching/finn-parene-3.webp'; then
      chattr +i '$SAMPLES/norwegian/matching/finn-parene-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/matching/finn-parene-3.webp' 2>/dev/null || true
      echo "  OK: norwegian/matching/Finn Parene 3.webp -> norwegian/matching/finn-parene-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/matching/finn-parene-3.webp' '$SAMPLES/norwegian/matching' 2>/dev/null; mv '$SAMPLES/norwegian/matching/finn-parene-3.webp' '$SAMPLES/norwegian/matching/Finn Parene 3.webp'; chattr +i '$SAMPLES/norwegian/matching/Finn Parene 3.webp' '$SAMPLES/norwegian/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/matching/Finn Parene 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/matching/Finn Parene 3.webp' '$SAMPLES/norwegian/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/matching/Finn Parene 3.webp -> norwegian/matching/finn-parene-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/matching/finn-parene-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/matching/Finn Parene 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/matching/Finn Parene 1 answer_key.webp → norwegian/matching/finn-parene-1-answer-key.webp
if [ -f '$SAMPLES/norwegian/matching/Finn Parene 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/matching/Finn Parene 1 answer_key.webp' '$SAMPLES/norwegian/matching' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/matching/Finn Parene 1 answer_key.webp' '$SAMPLES/norwegian/matching/finn-parene-1-answer-key.webp'; then
      chattr +i '$SAMPLES/norwegian/matching/finn-parene-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/matching/finn-parene-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: norwegian/matching/Finn Parene 1 answer_key.webp -> norwegian/matching/finn-parene-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/matching/finn-parene-1-answer-key.webp' '$SAMPLES/norwegian/matching' 2>/dev/null; mv '$SAMPLES/norwegian/matching/finn-parene-1-answer-key.webp' '$SAMPLES/norwegian/matching/Finn Parene 1 answer_key.webp'; chattr +i '$SAMPLES/norwegian/matching/Finn Parene 1 answer_key.webp' '$SAMPLES/norwegian/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/matching/Finn Parene 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/matching/Finn Parene 1 answer_key.webp' '$SAMPLES/norwegian/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/matching/Finn Parene 1 answer_key.webp -> norwegian/matching/finn-parene-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/matching/finn-parene-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/matching/Finn Parene 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/bingo/bildebingo 1.webp → norwegian/bingo/bildebingo-1.webp
if [ -f '$SAMPLES/norwegian/bingo/bildebingo 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/bingo/bildebingo 1.webp' '$SAMPLES/norwegian/bingo' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/bingo/bildebingo 1.webp' '$SAMPLES/norwegian/bingo/bildebingo-1.webp'; then
      chattr +i '$SAMPLES/norwegian/bingo/bildebingo-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/bingo' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/bingo/bildebingo-1.webp' 2>/dev/null || true
      echo "  OK: norwegian/bingo/bildebingo 1.webp -> norwegian/bingo/bildebingo-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/bingo/bildebingo-1.webp' '$SAMPLES/norwegian/bingo' 2>/dev/null; mv '$SAMPLES/norwegian/bingo/bildebingo-1.webp' '$SAMPLES/norwegian/bingo/bildebingo 1.webp'; chattr +i '$SAMPLES/norwegian/bingo/bildebingo 1.webp' '$SAMPLES/norwegian/bingo' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/bingo/bildebingo 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/bingo/bildebingo 1.webp' '$SAMPLES/norwegian/bingo' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/bingo/bildebingo 1.webp -> norwegian/bingo/bildebingo-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/bingo/bildebingo-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/bingo/bildebingo 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/bingo/bildebingo 2.webp → norwegian/bingo/bildebingo-2.webp
if [ -f '$SAMPLES/norwegian/bingo/bildebingo 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/bingo/bildebingo 2.webp' '$SAMPLES/norwegian/bingo' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/bingo/bildebingo 2.webp' '$SAMPLES/norwegian/bingo/bildebingo-2.webp'; then
      chattr +i '$SAMPLES/norwegian/bingo/bildebingo-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/bingo' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/bingo/bildebingo-2.webp' 2>/dev/null || true
      echo "  OK: norwegian/bingo/bildebingo 2.webp -> norwegian/bingo/bildebingo-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/bingo/bildebingo-2.webp' '$SAMPLES/norwegian/bingo' 2>/dev/null; mv '$SAMPLES/norwegian/bingo/bildebingo-2.webp' '$SAMPLES/norwegian/bingo/bildebingo 2.webp'; chattr +i '$SAMPLES/norwegian/bingo/bildebingo 2.webp' '$SAMPLES/norwegian/bingo' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/bingo/bildebingo 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/bingo/bildebingo 2.webp' '$SAMPLES/norwegian/bingo' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/bingo/bildebingo 2.webp -> norwegian/bingo/bildebingo-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/bingo/bildebingo-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/bingo/bildebingo 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/bingo/bildebingo 3.webp → norwegian/bingo/bildebingo-3.webp
if [ -f '$SAMPLES/norwegian/bingo/bildebingo 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/bingo/bildebingo 3.webp' '$SAMPLES/norwegian/bingo' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/bingo/bildebingo 3.webp' '$SAMPLES/norwegian/bingo/bildebingo-3.webp'; then
      chattr +i '$SAMPLES/norwegian/bingo/bildebingo-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/bingo' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/bingo/bildebingo-3.webp' 2>/dev/null || true
      echo "  OK: norwegian/bingo/bildebingo 3.webp -> norwegian/bingo/bildebingo-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/bingo/bildebingo-3.webp' '$SAMPLES/norwegian/bingo' 2>/dev/null; mv '$SAMPLES/norwegian/bingo/bildebingo-3.webp' '$SAMPLES/norwegian/bingo/bildebingo 3.webp'; chattr +i '$SAMPLES/norwegian/bingo/bildebingo 3.webp' '$SAMPLES/norwegian/bingo' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/bingo/bildebingo 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/bingo/bildebingo 3.webp' '$SAMPLES/norwegian/bingo' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/bingo/bildebingo 3.webp -> norwegian/bingo/bildebingo-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/bingo/bildebingo-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/bingo/bildebingo 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/bingo/bildebingo 4.webp → norwegian/bingo/bildebingo-4.webp
if [ -f '$SAMPLES/norwegian/bingo/bildebingo 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/bingo/bildebingo 4.webp' '$SAMPLES/norwegian/bingo' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/bingo/bildebingo 4.webp' '$SAMPLES/norwegian/bingo/bildebingo-4.webp'; then
      chattr +i '$SAMPLES/norwegian/bingo/bildebingo-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/bingo' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/bingo/bildebingo-4.webp' 2>/dev/null || true
      echo "  OK: norwegian/bingo/bildebingo 4.webp -> norwegian/bingo/bildebingo-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/bingo/bildebingo-4.webp' '$SAMPLES/norwegian/bingo' 2>/dev/null; mv '$SAMPLES/norwegian/bingo/bildebingo-4.webp' '$SAMPLES/norwegian/bingo/bildebingo 4.webp'; chattr +i '$SAMPLES/norwegian/bingo/bildebingo 4.webp' '$SAMPLES/norwegian/bingo' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/bingo/bildebingo 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/bingo/bildebingo 4.webp' '$SAMPLES/norwegian/bingo' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/bingo/bildebingo 4.webp -> norwegian/bingo/bildebingo-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/bingo/bildebingo-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/bingo/bildebingo 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/sudoku/Bilde-Sudoku 2.webp → norwegian/sudoku/bilde-sudoku-2.webp
if [ -f '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 2.webp' '$SAMPLES/norwegian/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 2.webp' '$SAMPLES/norwegian/sudoku/bilde-sudoku-2.webp'; then
      chattr +i '$SAMPLES/norwegian/sudoku/bilde-sudoku-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/sudoku/bilde-sudoku-2.webp' 2>/dev/null || true
      echo "  OK: norwegian/sudoku/Bilde-Sudoku 2.webp -> norwegian/sudoku/bilde-sudoku-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/sudoku/bilde-sudoku-2.webp' '$SAMPLES/norwegian/sudoku' 2>/dev/null; mv '$SAMPLES/norwegian/sudoku/bilde-sudoku-2.webp' '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 2.webp'; chattr +i '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 2.webp' '$SAMPLES/norwegian/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/sudoku/Bilde-Sudoku 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 2.webp' '$SAMPLES/norwegian/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/sudoku/Bilde-Sudoku 2.webp -> norwegian/sudoku/bilde-sudoku-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/sudoku/bilde-sudoku-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/sudoku/Bilde-Sudoku 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/sudoku/Bilde-Sudoku 3.webp → norwegian/sudoku/bilde-sudoku-3.webp
if [ -f '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 3.webp' '$SAMPLES/norwegian/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 3.webp' '$SAMPLES/norwegian/sudoku/bilde-sudoku-3.webp'; then
      chattr +i '$SAMPLES/norwegian/sudoku/bilde-sudoku-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/sudoku/bilde-sudoku-3.webp' 2>/dev/null || true
      echo "  OK: norwegian/sudoku/Bilde-Sudoku 3.webp -> norwegian/sudoku/bilde-sudoku-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/sudoku/bilde-sudoku-3.webp' '$SAMPLES/norwegian/sudoku' 2>/dev/null; mv '$SAMPLES/norwegian/sudoku/bilde-sudoku-3.webp' '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 3.webp'; chattr +i '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 3.webp' '$SAMPLES/norwegian/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/sudoku/Bilde-Sudoku 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 3.webp' '$SAMPLES/norwegian/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/sudoku/Bilde-Sudoku 3.webp -> norwegian/sudoku/bilde-sudoku-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/sudoku/bilde-sudoku-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/sudoku/Bilde-Sudoku 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/sudoku/Bilde-Sudoku 4.webp → norwegian/sudoku/bilde-sudoku-4.webp
if [ -f '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 4.webp' '$SAMPLES/norwegian/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 4.webp' '$SAMPLES/norwegian/sudoku/bilde-sudoku-4.webp'; then
      chattr +i '$SAMPLES/norwegian/sudoku/bilde-sudoku-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/sudoku/bilde-sudoku-4.webp' 2>/dev/null || true
      echo "  OK: norwegian/sudoku/Bilde-Sudoku 4.webp -> norwegian/sudoku/bilde-sudoku-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/sudoku/bilde-sudoku-4.webp' '$SAMPLES/norwegian/sudoku' 2>/dev/null; mv '$SAMPLES/norwegian/sudoku/bilde-sudoku-4.webp' '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 4.webp'; chattr +i '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 4.webp' '$SAMPLES/norwegian/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/sudoku/Bilde-Sudoku 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 4.webp' '$SAMPLES/norwegian/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/sudoku/Bilde-Sudoku 4.webp -> norwegian/sudoku/bilde-sudoku-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/sudoku/bilde-sudoku-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/sudoku/Bilde-Sudoku 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/sudoku/Bilde-Sudoku 1 answer_key.webp → norwegian/sudoku/bilde-sudoku-1-answer-key.webp
if [ -f '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 1 answer_key.webp' '$SAMPLES/norwegian/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 1 answer_key.webp' '$SAMPLES/norwegian/sudoku/bilde-sudoku-1-answer-key.webp'; then
      chattr +i '$SAMPLES/norwegian/sudoku/bilde-sudoku-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/sudoku/bilde-sudoku-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: norwegian/sudoku/Bilde-Sudoku 1 answer_key.webp -> norwegian/sudoku/bilde-sudoku-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/sudoku/bilde-sudoku-1-answer-key.webp' '$SAMPLES/norwegian/sudoku' 2>/dev/null; mv '$SAMPLES/norwegian/sudoku/bilde-sudoku-1-answer-key.webp' '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 1 answer_key.webp'; chattr +i '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 1 answer_key.webp' '$SAMPLES/norwegian/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/sudoku/Bilde-Sudoku 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/sudoku/Bilde-Sudoku 1 answer_key.webp' '$SAMPLES/norwegian/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/sudoku/Bilde-Sudoku 1 answer_key.webp -> norwegian/sudoku/bilde-sudoku-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/sudoku/bilde-sudoku-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/sudoku/Bilde-Sudoku 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/crossword/Bildekryssord 1.webp → norwegian/crossword/bildekryssord-1.webp
if [ -f '$SAMPLES/norwegian/crossword/Bildekryssord 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/crossword/Bildekryssord 1.webp' '$SAMPLES/norwegian/crossword' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/crossword/Bildekryssord 1.webp' '$SAMPLES/norwegian/crossword/bildekryssord-1.webp'; then
      chattr +i '$SAMPLES/norwegian/crossword/bildekryssord-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/crossword/bildekryssord-1.webp' 2>/dev/null || true
      echo "  OK: norwegian/crossword/Bildekryssord 1.webp -> norwegian/crossword/bildekryssord-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/crossword/bildekryssord-1.webp' '$SAMPLES/norwegian/crossword' 2>/dev/null; mv '$SAMPLES/norwegian/crossword/bildekryssord-1.webp' '$SAMPLES/norwegian/crossword/Bildekryssord 1.webp'; chattr +i '$SAMPLES/norwegian/crossword/Bildekryssord 1.webp' '$SAMPLES/norwegian/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/crossword/Bildekryssord 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/crossword/Bildekryssord 1.webp' '$SAMPLES/norwegian/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/crossword/Bildekryssord 1.webp -> norwegian/crossword/bildekryssord-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/crossword/bildekryssord-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/crossword/Bildekryssord 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/crossword/Bildekryssord 2.webp → norwegian/crossword/bildekryssord-2.webp
if [ -f '$SAMPLES/norwegian/crossword/Bildekryssord 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/crossword/Bildekryssord 2.webp' '$SAMPLES/norwegian/crossword' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/crossword/Bildekryssord 2.webp' '$SAMPLES/norwegian/crossword/bildekryssord-2.webp'; then
      chattr +i '$SAMPLES/norwegian/crossword/bildekryssord-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/crossword/bildekryssord-2.webp' 2>/dev/null || true
      echo "  OK: norwegian/crossword/Bildekryssord 2.webp -> norwegian/crossword/bildekryssord-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/crossword/bildekryssord-2.webp' '$SAMPLES/norwegian/crossword' 2>/dev/null; mv '$SAMPLES/norwegian/crossword/bildekryssord-2.webp' '$SAMPLES/norwegian/crossword/Bildekryssord 2.webp'; chattr +i '$SAMPLES/norwegian/crossword/Bildekryssord 2.webp' '$SAMPLES/norwegian/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/crossword/Bildekryssord 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/crossword/Bildekryssord 2.webp' '$SAMPLES/norwegian/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/crossword/Bildekryssord 2.webp -> norwegian/crossword/bildekryssord-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/crossword/bildekryssord-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/crossword/Bildekryssord 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/crossword/Bildekryssord 3.webp → norwegian/crossword/bildekryssord-3.webp
if [ -f '$SAMPLES/norwegian/crossword/Bildekryssord 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/crossword/Bildekryssord 3.webp' '$SAMPLES/norwegian/crossword' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/crossword/Bildekryssord 3.webp' '$SAMPLES/norwegian/crossword/bildekryssord-3.webp'; then
      chattr +i '$SAMPLES/norwegian/crossword/bildekryssord-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/crossword/bildekryssord-3.webp' 2>/dev/null || true
      echo "  OK: norwegian/crossword/Bildekryssord 3.webp -> norwegian/crossword/bildekryssord-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/crossword/bildekryssord-3.webp' '$SAMPLES/norwegian/crossword' 2>/dev/null; mv '$SAMPLES/norwegian/crossword/bildekryssord-3.webp' '$SAMPLES/norwegian/crossword/Bildekryssord 3.webp'; chattr +i '$SAMPLES/norwegian/crossword/Bildekryssord 3.webp' '$SAMPLES/norwegian/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/crossword/Bildekryssord 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/crossword/Bildekryssord 3.webp' '$SAMPLES/norwegian/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/crossword/Bildekryssord 3.webp -> norwegian/crossword/bildekryssord-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/crossword/bildekryssord-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/crossword/Bildekryssord 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/crossword/Bildekryssord 5.webp → norwegian/crossword/bildekryssord-5.webp
if [ -f '$SAMPLES/norwegian/crossword/Bildekryssord 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/crossword/Bildekryssord 5.webp' '$SAMPLES/norwegian/crossword' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/crossword/Bildekryssord 5.webp' '$SAMPLES/norwegian/crossword/bildekryssord-5.webp'; then
      chattr +i '$SAMPLES/norwegian/crossword/bildekryssord-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/crossword/bildekryssord-5.webp' 2>/dev/null || true
      echo "  OK: norwegian/crossword/Bildekryssord 5.webp -> norwegian/crossword/bildekryssord-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/crossword/bildekryssord-5.webp' '$SAMPLES/norwegian/crossword' 2>/dev/null; mv '$SAMPLES/norwegian/crossword/bildekryssord-5.webp' '$SAMPLES/norwegian/crossword/Bildekryssord 5.webp'; chattr +i '$SAMPLES/norwegian/crossword/Bildekryssord 5.webp' '$SAMPLES/norwegian/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/crossword/Bildekryssord 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/crossword/Bildekryssord 5.webp' '$SAMPLES/norwegian/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/crossword/Bildekryssord 5.webp -> norwegian/crossword/bildekryssord-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/crossword/bildekryssord-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/crossword/Bildekryssord 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# norwegian/crossword/Bildekryssord 1 answer_key.webp → norwegian/crossword/bildekryssord-1-answer-key.webp
if [ -f '$SAMPLES/norwegian/crossword/Bildekryssord 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/norwegian/crossword/Bildekryssord 1 answer_key.webp' '$SAMPLES/norwegian/crossword' 2>/dev/null || true
    if mv '$SAMPLES/norwegian/crossword/Bildekryssord 1 answer_key.webp' '$SAMPLES/norwegian/crossword/bildekryssord-1-answer-key.webp'; then
      chattr +i '$SAMPLES/norwegian/crossword/bildekryssord-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/norwegian/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/norwegian/crossword/bildekryssord-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: norwegian/crossword/Bildekryssord 1 answer_key.webp -> norwegian/crossword/bildekryssord-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/norwegian/crossword/bildekryssord-1-answer-key.webp' '$SAMPLES/norwegian/crossword' 2>/dev/null; mv '$SAMPLES/norwegian/crossword/bildekryssord-1-answer-key.webp' '$SAMPLES/norwegian/crossword/Bildekryssord 1 answer_key.webp'; chattr +i '$SAMPLES/norwegian/crossword/Bildekryssord 1 answer_key.webp' '$SAMPLES/norwegian/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: norwegian/crossword/Bildekryssord 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/norwegian/crossword/Bildekryssord 1 answer_key.webp' '$SAMPLES/norwegian/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: norwegian/crossword/Bildekryssord 1 answer_key.webp -> norwegian/crossword/bildekryssord-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/norwegian/crossword/bildekryssord-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: norwegian/crossword/Bildekryssord 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/addition/Hauska Yhteenlasku 2.webp → finnish/addition/hauska-yhteenlasku-2.webp
if [ -f '$SAMPLES/finnish/addition/Hauska Yhteenlasku 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/addition/Hauska Yhteenlasku 2.webp' '$SAMPLES/finnish/addition' 2>/dev/null || true
    if mv '$SAMPLES/finnish/addition/Hauska Yhteenlasku 2.webp' '$SAMPLES/finnish/addition/hauska-yhteenlasku-2.webp'; then
      chattr +i '$SAMPLES/finnish/addition/hauska-yhteenlasku-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/addition/hauska-yhteenlasku-2.webp' 2>/dev/null || true
      echo "  OK: finnish/addition/Hauska Yhteenlasku 2.webp -> finnish/addition/hauska-yhteenlasku-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/addition/hauska-yhteenlasku-2.webp' '$SAMPLES/finnish/addition' 2>/dev/null; mv '$SAMPLES/finnish/addition/hauska-yhteenlasku-2.webp' '$SAMPLES/finnish/addition/Hauska Yhteenlasku 2.webp'; chattr +i '$SAMPLES/finnish/addition/Hauska Yhteenlasku 2.webp' '$SAMPLES/finnish/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/addition/Hauska Yhteenlasku 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/addition/Hauska Yhteenlasku 2.webp' '$SAMPLES/finnish/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/addition/Hauska Yhteenlasku 2.webp -> finnish/addition/hauska-yhteenlasku-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/addition/hauska-yhteenlasku-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/addition/Hauska Yhteenlasku 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/addition/Hauska Yhteenlasku 3.webp → finnish/addition/hauska-yhteenlasku-3.webp
if [ -f '$SAMPLES/finnish/addition/Hauska Yhteenlasku 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/addition/Hauska Yhteenlasku 3.webp' '$SAMPLES/finnish/addition' 2>/dev/null || true
    if mv '$SAMPLES/finnish/addition/Hauska Yhteenlasku 3.webp' '$SAMPLES/finnish/addition/hauska-yhteenlasku-3.webp'; then
      chattr +i '$SAMPLES/finnish/addition/hauska-yhteenlasku-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/addition/hauska-yhteenlasku-3.webp' 2>/dev/null || true
      echo "  OK: finnish/addition/Hauska Yhteenlasku 3.webp -> finnish/addition/hauska-yhteenlasku-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/addition/hauska-yhteenlasku-3.webp' '$SAMPLES/finnish/addition' 2>/dev/null; mv '$SAMPLES/finnish/addition/hauska-yhteenlasku-3.webp' '$SAMPLES/finnish/addition/Hauska Yhteenlasku 3.webp'; chattr +i '$SAMPLES/finnish/addition/Hauska Yhteenlasku 3.webp' '$SAMPLES/finnish/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/addition/Hauska Yhteenlasku 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/addition/Hauska Yhteenlasku 3.webp' '$SAMPLES/finnish/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/addition/Hauska Yhteenlasku 3.webp -> finnish/addition/hauska-yhteenlasku-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/addition/hauska-yhteenlasku-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/addition/Hauska Yhteenlasku 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/addition/Hauska Yhteenlasku 4.webp → finnish/addition/hauska-yhteenlasku-4.webp
if [ -f '$SAMPLES/finnish/addition/Hauska Yhteenlasku 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/addition/Hauska Yhteenlasku 4.webp' '$SAMPLES/finnish/addition' 2>/dev/null || true
    if mv '$SAMPLES/finnish/addition/Hauska Yhteenlasku 4.webp' '$SAMPLES/finnish/addition/hauska-yhteenlasku-4.webp'; then
      chattr +i '$SAMPLES/finnish/addition/hauska-yhteenlasku-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/addition/hauska-yhteenlasku-4.webp' 2>/dev/null || true
      echo "  OK: finnish/addition/Hauska Yhteenlasku 4.webp -> finnish/addition/hauska-yhteenlasku-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/addition/hauska-yhteenlasku-4.webp' '$SAMPLES/finnish/addition' 2>/dev/null; mv '$SAMPLES/finnish/addition/hauska-yhteenlasku-4.webp' '$SAMPLES/finnish/addition/Hauska Yhteenlasku 4.webp'; chattr +i '$SAMPLES/finnish/addition/Hauska Yhteenlasku 4.webp' '$SAMPLES/finnish/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/addition/Hauska Yhteenlasku 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/addition/Hauska Yhteenlasku 4.webp' '$SAMPLES/finnish/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/addition/Hauska Yhteenlasku 4.webp -> finnish/addition/hauska-yhteenlasku-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/addition/hauska-yhteenlasku-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/addition/Hauska Yhteenlasku 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/addition/Hauska Yhteenlasku 5.webp → finnish/addition/hauska-yhteenlasku-5.webp
if [ -f '$SAMPLES/finnish/addition/Hauska Yhteenlasku 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/addition/Hauska Yhteenlasku 5.webp' '$SAMPLES/finnish/addition' 2>/dev/null || true
    if mv '$SAMPLES/finnish/addition/Hauska Yhteenlasku 5.webp' '$SAMPLES/finnish/addition/hauska-yhteenlasku-5.webp'; then
      chattr +i '$SAMPLES/finnish/addition/hauska-yhteenlasku-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/addition/hauska-yhteenlasku-5.webp' 2>/dev/null || true
      echo "  OK: finnish/addition/Hauska Yhteenlasku 5.webp -> finnish/addition/hauska-yhteenlasku-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/addition/hauska-yhteenlasku-5.webp' '$SAMPLES/finnish/addition' 2>/dev/null; mv '$SAMPLES/finnish/addition/hauska-yhteenlasku-5.webp' '$SAMPLES/finnish/addition/Hauska Yhteenlasku 5.webp'; chattr +i '$SAMPLES/finnish/addition/Hauska Yhteenlasku 5.webp' '$SAMPLES/finnish/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/addition/Hauska Yhteenlasku 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/addition/Hauska Yhteenlasku 5.webp' '$SAMPLES/finnish/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/addition/Hauska Yhteenlasku 5.webp -> finnish/addition/hauska-yhteenlasku-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/addition/hauska-yhteenlasku-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/addition/Hauska Yhteenlasku 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/addition/Hauska Yhteenlasku 6.webp → finnish/addition/hauska-yhteenlasku-6.webp
if [ -f '$SAMPLES/finnish/addition/Hauska Yhteenlasku 6.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/addition/Hauska Yhteenlasku 6.webp' '$SAMPLES/finnish/addition' 2>/dev/null || true
    if mv '$SAMPLES/finnish/addition/Hauska Yhteenlasku 6.webp' '$SAMPLES/finnish/addition/hauska-yhteenlasku-6.webp'; then
      chattr +i '$SAMPLES/finnish/addition/hauska-yhteenlasku-6.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/addition/hauska-yhteenlasku-6.webp' 2>/dev/null || true
      echo "  OK: finnish/addition/Hauska Yhteenlasku 6.webp -> finnish/addition/hauska-yhteenlasku-6.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/addition/hauska-yhteenlasku-6.webp' '$SAMPLES/finnish/addition' 2>/dev/null; mv '$SAMPLES/finnish/addition/hauska-yhteenlasku-6.webp' '$SAMPLES/finnish/addition/Hauska Yhteenlasku 6.webp'; chattr +i '$SAMPLES/finnish/addition/Hauska Yhteenlasku 6.webp' '$SAMPLES/finnish/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/addition/Hauska Yhteenlasku 6.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/addition/Hauska Yhteenlasku 6.webp' '$SAMPLES/finnish/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/addition/Hauska Yhteenlasku 6.webp -> finnish/addition/hauska-yhteenlasku-6.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/addition/hauska-yhteenlasku-6.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/addition/Hauska Yhteenlasku 6.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/addition/Hauska Yhteenlasku 1 answer_key.webp → finnish/addition/hauska-yhteenlasku-1-answer-key.webp
if [ -f '$SAMPLES/finnish/addition/Hauska Yhteenlasku 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/addition/Hauska Yhteenlasku 1 answer_key.webp' '$SAMPLES/finnish/addition' 2>/dev/null || true
    if mv '$SAMPLES/finnish/addition/Hauska Yhteenlasku 1 answer_key.webp' '$SAMPLES/finnish/addition/hauska-yhteenlasku-1-answer-key.webp'; then
      chattr +i '$SAMPLES/finnish/addition/hauska-yhteenlasku-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/addition' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/addition/hauska-yhteenlasku-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: finnish/addition/Hauska Yhteenlasku 1 answer_key.webp -> finnish/addition/hauska-yhteenlasku-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/addition/hauska-yhteenlasku-1-answer-key.webp' '$SAMPLES/finnish/addition' 2>/dev/null; mv '$SAMPLES/finnish/addition/hauska-yhteenlasku-1-answer-key.webp' '$SAMPLES/finnish/addition/Hauska Yhteenlasku 1 answer_key.webp'; chattr +i '$SAMPLES/finnish/addition/Hauska Yhteenlasku 1 answer_key.webp' '$SAMPLES/finnish/addition' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/addition/Hauska Yhteenlasku 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/addition/Hauska Yhteenlasku 1 answer_key.webp' '$SAMPLES/finnish/addition' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/addition/Hauska Yhteenlasku 1 answer_key.webp -> finnish/addition/hauska-yhteenlasku-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/addition/hauska-yhteenlasku-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/addition/Hauska Yhteenlasku 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/subtraction/Hauskaa Vähennyslaskua 1.webp → finnish/subtraction/hauskaa-vähennyslaskua-1.webp
if [ -f '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 1.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 1.webp' '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-1.webp'; then
      chattr +i '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-1.webp' 2>/dev/null || true
      echo "  OK: finnish/subtraction/Hauskaa Vähennyslaskua 1.webp -> finnish/subtraction/hauskaa-vähennyslaskua-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-1.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null; mv '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-1.webp' '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 1.webp'; chattr +i '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 1.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/subtraction/Hauskaa Vähennyslaskua 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 1.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/subtraction/Hauskaa Vähennyslaskua 1.webp -> finnish/subtraction/hauskaa-vähennyslaskua-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/subtraction/Hauskaa Vähennyslaskua 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/subtraction/Hauskaa Vähennyslaskua 2.webp → finnish/subtraction/hauskaa-vähennyslaskua-2.webp
if [ -f '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 2.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 2.webp' '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-2.webp'; then
      chattr +i '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-2.webp' 2>/dev/null || true
      echo "  OK: finnish/subtraction/Hauskaa Vähennyslaskua 2.webp -> finnish/subtraction/hauskaa-vähennyslaskua-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-2.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null; mv '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-2.webp' '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 2.webp'; chattr +i '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 2.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/subtraction/Hauskaa Vähennyslaskua 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 2.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/subtraction/Hauskaa Vähennyslaskua 2.webp -> finnish/subtraction/hauskaa-vähennyslaskua-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/subtraction/Hauskaa Vähennyslaskua 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/subtraction/Hauskaa Vähennyslaskua 3.webp → finnish/subtraction/hauskaa-vähennyslaskua-3.webp
if [ -f '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 3.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 3.webp' '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-3.webp'; then
      chattr +i '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-3.webp' 2>/dev/null || true
      echo "  OK: finnish/subtraction/Hauskaa Vähennyslaskua 3.webp -> finnish/subtraction/hauskaa-vähennyslaskua-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-3.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null; mv '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-3.webp' '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 3.webp'; chattr +i '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 3.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/subtraction/Hauskaa Vähennyslaskua 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 3.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/subtraction/Hauskaa Vähennyslaskua 3.webp -> finnish/subtraction/hauskaa-vähennyslaskua-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/subtraction/Hauskaa Vähennyslaskua 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/subtraction/Hauskaa Vähennyslaskua 5.webp → finnish/subtraction/hauskaa-vähennyslaskua-5.webp
if [ -f '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 5.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 5.webp' '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-5.webp'; then
      chattr +i '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-5.webp' 2>/dev/null || true
      echo "  OK: finnish/subtraction/Hauskaa Vähennyslaskua 5.webp -> finnish/subtraction/hauskaa-vähennyslaskua-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-5.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null; mv '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-5.webp' '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 5.webp'; chattr +i '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 5.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/subtraction/Hauskaa Vähennyslaskua 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 5.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/subtraction/Hauskaa Vähennyslaskua 5.webp -> finnish/subtraction/hauskaa-vähennyslaskua-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/subtraction/Hauskaa Vähennyslaskua 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/subtraction/Hauskaa Vähennyslaskua 6.webp → finnish/subtraction/hauskaa-vähennyslaskua-6.webp
if [ -f '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 6.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 6.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 6.webp' '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-6.webp'; then
      chattr +i '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-6.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-6.webp' 2>/dev/null || true
      echo "  OK: finnish/subtraction/Hauskaa Vähennyslaskua 6.webp -> finnish/subtraction/hauskaa-vähennyslaskua-6.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-6.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null; mv '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-6.webp' '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 6.webp'; chattr +i '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 6.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/subtraction/Hauskaa Vähennyslaskua 6.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 6.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/subtraction/Hauskaa Vähennyslaskua 6.webp -> finnish/subtraction/hauskaa-vähennyslaskua-6.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-6.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/subtraction/Hauskaa Vähennyslaskua 6.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/subtraction/Hauskaa Vähennyslaskua 1 answer_key.webp → finnish/subtraction/hauskaa-vähennyslaskua-1-answer-key.webp
if [ -f '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 1 answer_key.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null || true
    if mv '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 1 answer_key.webp' '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-1-answer-key.webp'; then
      chattr +i '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/subtraction' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: finnish/subtraction/Hauskaa Vähennyslaskua 1 answer_key.webp -> finnish/subtraction/hauskaa-vähennyslaskua-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-1-answer-key.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null; mv '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-1-answer-key.webp' '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 1 answer_key.webp'; chattr +i '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 1 answer_key.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/subtraction/Hauskaa Vähennyslaskua 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/subtraction/Hauskaa Vähennyslaskua 1 answer_key.webp' '$SAMPLES/finnish/subtraction' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/subtraction/Hauskaa Vähennyslaskua 1 answer_key.webp -> finnish/subtraction/hauskaa-vähennyslaskua-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/subtraction/hauskaa-vähennyslaskua-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/subtraction/Hauskaa Vähennyslaskua 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/prepositions/Prepositiot 1.webp → finnish/prepositions/prepositiot-1.webp
if [ -f '$SAMPLES/finnish/prepositions/Prepositiot 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/prepositions/Prepositiot 1.webp' '$SAMPLES/finnish/prepositions' 2>/dev/null || true
    if mv '$SAMPLES/finnish/prepositions/Prepositiot 1.webp' '$SAMPLES/finnish/prepositions/prepositiot-1.webp'; then
      chattr +i '$SAMPLES/finnish/prepositions/prepositiot-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/prepositions' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/prepositions/prepositiot-1.webp' 2>/dev/null || true
      echo "  OK: finnish/prepositions/Prepositiot 1.webp -> finnish/prepositions/prepositiot-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/prepositions/prepositiot-1.webp' '$SAMPLES/finnish/prepositions' 2>/dev/null; mv '$SAMPLES/finnish/prepositions/prepositiot-1.webp' '$SAMPLES/finnish/prepositions/Prepositiot 1.webp'; chattr +i '$SAMPLES/finnish/prepositions/Prepositiot 1.webp' '$SAMPLES/finnish/prepositions' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/prepositions/Prepositiot 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/prepositions/Prepositiot 1.webp' '$SAMPLES/finnish/prepositions' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/prepositions/Prepositiot 1.webp -> finnish/prepositions/prepositiot-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/prepositions/prepositiot-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/prepositions/Prepositiot 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/prepositions/Prepositiot 2.webp → finnish/prepositions/prepositiot-2.webp
if [ -f '$SAMPLES/finnish/prepositions/Prepositiot 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/prepositions/Prepositiot 2.webp' '$SAMPLES/finnish/prepositions' 2>/dev/null || true
    if mv '$SAMPLES/finnish/prepositions/Prepositiot 2.webp' '$SAMPLES/finnish/prepositions/prepositiot-2.webp'; then
      chattr +i '$SAMPLES/finnish/prepositions/prepositiot-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/prepositions' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/prepositions/prepositiot-2.webp' 2>/dev/null || true
      echo "  OK: finnish/prepositions/Prepositiot 2.webp -> finnish/prepositions/prepositiot-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/prepositions/prepositiot-2.webp' '$SAMPLES/finnish/prepositions' 2>/dev/null; mv '$SAMPLES/finnish/prepositions/prepositiot-2.webp' '$SAMPLES/finnish/prepositions/Prepositiot 2.webp'; chattr +i '$SAMPLES/finnish/prepositions/Prepositiot 2.webp' '$SAMPLES/finnish/prepositions' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/prepositions/Prepositiot 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/prepositions/Prepositiot 2.webp' '$SAMPLES/finnish/prepositions' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/prepositions/Prepositiot 2.webp -> finnish/prepositions/prepositiot-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/prepositions/prepositiot-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/prepositions/Prepositiot 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/prepositions/Prepositiot 3.webp → finnish/prepositions/prepositiot-3.webp
if [ -f '$SAMPLES/finnish/prepositions/Prepositiot 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/prepositions/Prepositiot 3.webp' '$SAMPLES/finnish/prepositions' 2>/dev/null || true
    if mv '$SAMPLES/finnish/prepositions/Prepositiot 3.webp' '$SAMPLES/finnish/prepositions/prepositiot-3.webp'; then
      chattr +i '$SAMPLES/finnish/prepositions/prepositiot-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/prepositions' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/prepositions/prepositiot-3.webp' 2>/dev/null || true
      echo "  OK: finnish/prepositions/Prepositiot 3.webp -> finnish/prepositions/prepositiot-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/prepositions/prepositiot-3.webp' '$SAMPLES/finnish/prepositions' 2>/dev/null; mv '$SAMPLES/finnish/prepositions/prepositiot-3.webp' '$SAMPLES/finnish/prepositions/Prepositiot 3.webp'; chattr +i '$SAMPLES/finnish/prepositions/Prepositiot 3.webp' '$SAMPLES/finnish/prepositions' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/prepositions/Prepositiot 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/prepositions/Prepositiot 3.webp' '$SAMPLES/finnish/prepositions' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/prepositions/Prepositiot 3.webp -> finnish/prepositions/prepositiot-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/prepositions/prepositiot-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/prepositions/Prepositiot 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/prepositions/Prepositiot 5.webp → finnish/prepositions/prepositiot-5.webp
if [ -f '$SAMPLES/finnish/prepositions/Prepositiot 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/prepositions/Prepositiot 5.webp' '$SAMPLES/finnish/prepositions' 2>/dev/null || true
    if mv '$SAMPLES/finnish/prepositions/Prepositiot 5.webp' '$SAMPLES/finnish/prepositions/prepositiot-5.webp'; then
      chattr +i '$SAMPLES/finnish/prepositions/prepositiot-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/prepositions' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/prepositions/prepositiot-5.webp' 2>/dev/null || true
      echo "  OK: finnish/prepositions/Prepositiot 5.webp -> finnish/prepositions/prepositiot-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/prepositions/prepositiot-5.webp' '$SAMPLES/finnish/prepositions' 2>/dev/null; mv '$SAMPLES/finnish/prepositions/prepositiot-5.webp' '$SAMPLES/finnish/prepositions/Prepositiot 5.webp'; chattr +i '$SAMPLES/finnish/prepositions/Prepositiot 5.webp' '$SAMPLES/finnish/prepositions' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/prepositions/Prepositiot 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/prepositions/Prepositiot 5.webp' '$SAMPLES/finnish/prepositions' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/prepositions/Prepositiot 5.webp -> finnish/prepositions/prepositiot-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/prepositions/prepositiot-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/prepositions/Prepositiot 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/prepositions/Prepositiot 1 answer_key.webp → finnish/prepositions/prepositiot-1-answer-key.webp
if [ -f '$SAMPLES/finnish/prepositions/Prepositiot 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/prepositions/Prepositiot 1 answer_key.webp' '$SAMPLES/finnish/prepositions' 2>/dev/null || true
    if mv '$SAMPLES/finnish/prepositions/Prepositiot 1 answer_key.webp' '$SAMPLES/finnish/prepositions/prepositiot-1-answer-key.webp'; then
      chattr +i '$SAMPLES/finnish/prepositions/prepositiot-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/prepositions' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/prepositions/prepositiot-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: finnish/prepositions/Prepositiot 1 answer_key.webp -> finnish/prepositions/prepositiot-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/prepositions/prepositiot-1-answer-key.webp' '$SAMPLES/finnish/prepositions' 2>/dev/null; mv '$SAMPLES/finnish/prepositions/prepositiot-1-answer-key.webp' '$SAMPLES/finnish/prepositions/Prepositiot 1 answer_key.webp'; chattr +i '$SAMPLES/finnish/prepositions/Prepositiot 1 answer_key.webp' '$SAMPLES/finnish/prepositions' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/prepositions/Prepositiot 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/prepositions/Prepositiot 1 answer_key.webp' '$SAMPLES/finnish/prepositions' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/prepositions/Prepositiot 1 answer_key.webp -> finnish/prepositions/prepositiot-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/prepositions/prepositiot-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/prepositions/Prepositiot 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/wordsearch/Sanahaku 1.webp → finnish/wordsearch/sanahaku-1.webp
if [ -f '$SAMPLES/finnish/wordsearch/Sanahaku 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/wordsearch/Sanahaku 1.webp' '$SAMPLES/finnish/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/finnish/wordsearch/Sanahaku 1.webp' '$SAMPLES/finnish/wordsearch/sanahaku-1.webp'; then
      chattr +i '$SAMPLES/finnish/wordsearch/sanahaku-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/wordsearch/sanahaku-1.webp' 2>/dev/null || true
      echo "  OK: finnish/wordsearch/Sanahaku 1.webp -> finnish/wordsearch/sanahaku-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/wordsearch/sanahaku-1.webp' '$SAMPLES/finnish/wordsearch' 2>/dev/null; mv '$SAMPLES/finnish/wordsearch/sanahaku-1.webp' '$SAMPLES/finnish/wordsearch/Sanahaku 1.webp'; chattr +i '$SAMPLES/finnish/wordsearch/Sanahaku 1.webp' '$SAMPLES/finnish/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/wordsearch/Sanahaku 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/wordsearch/Sanahaku 1.webp' '$SAMPLES/finnish/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/wordsearch/Sanahaku 1.webp -> finnish/wordsearch/sanahaku-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/wordsearch/sanahaku-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/wordsearch/Sanahaku 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/wordsearch/Sanahaku 2.webp → finnish/wordsearch/sanahaku-2.webp
if [ -f '$SAMPLES/finnish/wordsearch/Sanahaku 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/wordsearch/Sanahaku 2.webp' '$SAMPLES/finnish/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/finnish/wordsearch/Sanahaku 2.webp' '$SAMPLES/finnish/wordsearch/sanahaku-2.webp'; then
      chattr +i '$SAMPLES/finnish/wordsearch/sanahaku-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/wordsearch/sanahaku-2.webp' 2>/dev/null || true
      echo "  OK: finnish/wordsearch/Sanahaku 2.webp -> finnish/wordsearch/sanahaku-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/wordsearch/sanahaku-2.webp' '$SAMPLES/finnish/wordsearch' 2>/dev/null; mv '$SAMPLES/finnish/wordsearch/sanahaku-2.webp' '$SAMPLES/finnish/wordsearch/Sanahaku 2.webp'; chattr +i '$SAMPLES/finnish/wordsearch/Sanahaku 2.webp' '$SAMPLES/finnish/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/wordsearch/Sanahaku 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/wordsearch/Sanahaku 2.webp' '$SAMPLES/finnish/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/wordsearch/Sanahaku 2.webp -> finnish/wordsearch/sanahaku-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/wordsearch/sanahaku-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/wordsearch/Sanahaku 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/wordsearch/Sanahaku 3.webp → finnish/wordsearch/sanahaku-3.webp
if [ -f '$SAMPLES/finnish/wordsearch/Sanahaku 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/wordsearch/Sanahaku 3.webp' '$SAMPLES/finnish/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/finnish/wordsearch/Sanahaku 3.webp' '$SAMPLES/finnish/wordsearch/sanahaku-3.webp'; then
      chattr +i '$SAMPLES/finnish/wordsearch/sanahaku-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/wordsearch/sanahaku-3.webp' 2>/dev/null || true
      echo "  OK: finnish/wordsearch/Sanahaku 3.webp -> finnish/wordsearch/sanahaku-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/wordsearch/sanahaku-3.webp' '$SAMPLES/finnish/wordsearch' 2>/dev/null; mv '$SAMPLES/finnish/wordsearch/sanahaku-3.webp' '$SAMPLES/finnish/wordsearch/Sanahaku 3.webp'; chattr +i '$SAMPLES/finnish/wordsearch/Sanahaku 3.webp' '$SAMPLES/finnish/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/wordsearch/Sanahaku 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/wordsearch/Sanahaku 3.webp' '$SAMPLES/finnish/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/wordsearch/Sanahaku 3.webp -> finnish/wordsearch/sanahaku-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/wordsearch/sanahaku-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/wordsearch/Sanahaku 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/wordsearch/Sanahaku 4.webp → finnish/wordsearch/sanahaku-4.webp
if [ -f '$SAMPLES/finnish/wordsearch/Sanahaku 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/wordsearch/Sanahaku 4.webp' '$SAMPLES/finnish/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/finnish/wordsearch/Sanahaku 4.webp' '$SAMPLES/finnish/wordsearch/sanahaku-4.webp'; then
      chattr +i '$SAMPLES/finnish/wordsearch/sanahaku-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/wordsearch/sanahaku-4.webp' 2>/dev/null || true
      echo "  OK: finnish/wordsearch/Sanahaku 4.webp -> finnish/wordsearch/sanahaku-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/wordsearch/sanahaku-4.webp' '$SAMPLES/finnish/wordsearch' 2>/dev/null; mv '$SAMPLES/finnish/wordsearch/sanahaku-4.webp' '$SAMPLES/finnish/wordsearch/Sanahaku 4.webp'; chattr +i '$SAMPLES/finnish/wordsearch/Sanahaku 4.webp' '$SAMPLES/finnish/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/wordsearch/Sanahaku 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/wordsearch/Sanahaku 4.webp' '$SAMPLES/finnish/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/wordsearch/Sanahaku 4.webp -> finnish/wordsearch/sanahaku-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/wordsearch/sanahaku-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/wordsearch/Sanahaku 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/wordsearch/Sanahaku 1 answer_key.webp → finnish/wordsearch/sanahaku-1-answer-key.webp
if [ -f '$SAMPLES/finnish/wordsearch/Sanahaku 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/wordsearch/Sanahaku 1 answer_key.webp' '$SAMPLES/finnish/wordsearch' 2>/dev/null || true
    if mv '$SAMPLES/finnish/wordsearch/Sanahaku 1 answer_key.webp' '$SAMPLES/finnish/wordsearch/sanahaku-1-answer-key.webp'; then
      chattr +i '$SAMPLES/finnish/wordsearch/sanahaku-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/wordsearch' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/wordsearch/sanahaku-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: finnish/wordsearch/Sanahaku 1 answer_key.webp -> finnish/wordsearch/sanahaku-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/wordsearch/sanahaku-1-answer-key.webp' '$SAMPLES/finnish/wordsearch' 2>/dev/null; mv '$SAMPLES/finnish/wordsearch/sanahaku-1-answer-key.webp' '$SAMPLES/finnish/wordsearch/Sanahaku 1 answer_key.webp'; chattr +i '$SAMPLES/finnish/wordsearch/Sanahaku 1 answer_key.webp' '$SAMPLES/finnish/wordsearch' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/wordsearch/Sanahaku 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/wordsearch/Sanahaku 1 answer_key.webp' '$SAMPLES/finnish/wordsearch' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/wordsearch/Sanahaku 1 answer_key.webp -> finnish/wordsearch/sanahaku-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/wordsearch/sanahaku-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/wordsearch/Sanahaku 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/cryptogram/Kuvakryptogrammi 1.webp → finnish/cryptogram/kuvakryptogrammi-1.webp
if [ -f '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 1.webp' '$SAMPLES/finnish/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 1.webp' '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-1.webp'; then
      chattr +i '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-1.webp' 2>/dev/null || true
      echo "  OK: finnish/cryptogram/Kuvakryptogrammi 1.webp -> finnish/cryptogram/kuvakryptogrammi-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-1.webp' '$SAMPLES/finnish/cryptogram' 2>/dev/null; mv '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-1.webp' '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 1.webp'; chattr +i '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 1.webp' '$SAMPLES/finnish/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/cryptogram/Kuvakryptogrammi 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 1.webp' '$SAMPLES/finnish/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/cryptogram/Kuvakryptogrammi 1.webp -> finnish/cryptogram/kuvakryptogrammi-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/cryptogram/Kuvakryptogrammi 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/cryptogram/Kuvakryptogrammi 2.webp → finnish/cryptogram/kuvakryptogrammi-2.webp
if [ -f '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 2.webp' '$SAMPLES/finnish/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 2.webp' '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-2.webp'; then
      chattr +i '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-2.webp' 2>/dev/null || true
      echo "  OK: finnish/cryptogram/Kuvakryptogrammi 2.webp -> finnish/cryptogram/kuvakryptogrammi-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-2.webp' '$SAMPLES/finnish/cryptogram' 2>/dev/null; mv '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-2.webp' '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 2.webp'; chattr +i '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 2.webp' '$SAMPLES/finnish/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/cryptogram/Kuvakryptogrammi 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 2.webp' '$SAMPLES/finnish/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/cryptogram/Kuvakryptogrammi 2.webp -> finnish/cryptogram/kuvakryptogrammi-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/cryptogram/Kuvakryptogrammi 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/cryptogram/Kuvakryptogrammi 4.webp → finnish/cryptogram/kuvakryptogrammi-4.webp
if [ -f '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 4.webp' '$SAMPLES/finnish/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 4.webp' '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-4.webp'; then
      chattr +i '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-4.webp' 2>/dev/null || true
      echo "  OK: finnish/cryptogram/Kuvakryptogrammi 4.webp -> finnish/cryptogram/kuvakryptogrammi-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-4.webp' '$SAMPLES/finnish/cryptogram' 2>/dev/null; mv '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-4.webp' '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 4.webp'; chattr +i '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 4.webp' '$SAMPLES/finnish/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/cryptogram/Kuvakryptogrammi 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 4.webp' '$SAMPLES/finnish/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/cryptogram/Kuvakryptogrammi 4.webp -> finnish/cryptogram/kuvakryptogrammi-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/cryptogram/Kuvakryptogrammi 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/cryptogram/Kuvakryptogrammi 5.webp → finnish/cryptogram/kuvakryptogrammi-5.webp
if [ -f '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 5.webp' '$SAMPLES/finnish/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 5.webp' '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-5.webp'; then
      chattr +i '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-5.webp' 2>/dev/null || true
      echo "  OK: finnish/cryptogram/Kuvakryptogrammi 5.webp -> finnish/cryptogram/kuvakryptogrammi-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-5.webp' '$SAMPLES/finnish/cryptogram' 2>/dev/null; mv '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-5.webp' '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 5.webp'; chattr +i '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 5.webp' '$SAMPLES/finnish/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/cryptogram/Kuvakryptogrammi 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 5.webp' '$SAMPLES/finnish/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/cryptogram/Kuvakryptogrammi 5.webp -> finnish/cryptogram/kuvakryptogrammi-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/cryptogram/Kuvakryptogrammi 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/cryptogram/Kuvakryptogrammi 1 answer_key.webp → finnish/cryptogram/kuvakryptogrammi-1-answer-key.webp
if [ -f '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 1 answer_key.webp' '$SAMPLES/finnish/cryptogram' 2>/dev/null || true
    if mv '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 1 answer_key.webp' '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-1-answer-key.webp'; then
      chattr +i '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/cryptogram' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: finnish/cryptogram/Kuvakryptogrammi 1 answer_key.webp -> finnish/cryptogram/kuvakryptogrammi-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-1-answer-key.webp' '$SAMPLES/finnish/cryptogram' 2>/dev/null; mv '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-1-answer-key.webp' '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 1 answer_key.webp'; chattr +i '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 1 answer_key.webp' '$SAMPLES/finnish/cryptogram' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/cryptogram/Kuvakryptogrammi 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/cryptogram/Kuvakryptogrammi 1 answer_key.webp' '$SAMPLES/finnish/cryptogram' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/cryptogram/Kuvakryptogrammi 1 answer_key.webp -> finnish/cryptogram/kuvakryptogrammi-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/cryptogram/kuvakryptogrammi-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/cryptogram/Kuvakryptogrammi 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/matching/Yhdistä Parit 1.webp → finnish/matching/yhdistä-parit-1.webp
if [ -f '$SAMPLES/finnish/matching/Yhdistä Parit 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/matching/Yhdistä Parit 1.webp' '$SAMPLES/finnish/matching' 2>/dev/null || true
    if mv '$SAMPLES/finnish/matching/Yhdistä Parit 1.webp' '$SAMPLES/finnish/matching/yhdistä-parit-1.webp'; then
      chattr +i '$SAMPLES/finnish/matching/yhdistä-parit-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/matching/yhdistä-parit-1.webp' 2>/dev/null || true
      echo "  OK: finnish/matching/Yhdistä Parit 1.webp -> finnish/matching/yhdistä-parit-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/matching/yhdistä-parit-1.webp' '$SAMPLES/finnish/matching' 2>/dev/null; mv '$SAMPLES/finnish/matching/yhdistä-parit-1.webp' '$SAMPLES/finnish/matching/Yhdistä Parit 1.webp'; chattr +i '$SAMPLES/finnish/matching/Yhdistä Parit 1.webp' '$SAMPLES/finnish/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/matching/Yhdistä Parit 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/matching/Yhdistä Parit 1.webp' '$SAMPLES/finnish/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/matching/Yhdistä Parit 1.webp -> finnish/matching/yhdistä-parit-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/matching/yhdistä-parit-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/matching/Yhdistä Parit 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/matching/Yhdistä Parit 2.webp → finnish/matching/yhdistä-parit-2.webp
if [ -f '$SAMPLES/finnish/matching/Yhdistä Parit 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/matching/Yhdistä Parit 2.webp' '$SAMPLES/finnish/matching' 2>/dev/null || true
    if mv '$SAMPLES/finnish/matching/Yhdistä Parit 2.webp' '$SAMPLES/finnish/matching/yhdistä-parit-2.webp'; then
      chattr +i '$SAMPLES/finnish/matching/yhdistä-parit-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/matching/yhdistä-parit-2.webp' 2>/dev/null || true
      echo "  OK: finnish/matching/Yhdistä Parit 2.webp -> finnish/matching/yhdistä-parit-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/matching/yhdistä-parit-2.webp' '$SAMPLES/finnish/matching' 2>/dev/null; mv '$SAMPLES/finnish/matching/yhdistä-parit-2.webp' '$SAMPLES/finnish/matching/Yhdistä Parit 2.webp'; chattr +i '$SAMPLES/finnish/matching/Yhdistä Parit 2.webp' '$SAMPLES/finnish/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/matching/Yhdistä Parit 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/matching/Yhdistä Parit 2.webp' '$SAMPLES/finnish/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/matching/Yhdistä Parit 2.webp -> finnish/matching/yhdistä-parit-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/matching/yhdistä-parit-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/matching/Yhdistä Parit 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/matching/Yhdistä Parit 4.webp → finnish/matching/yhdistä-parit-4.webp
if [ -f '$SAMPLES/finnish/matching/Yhdistä Parit 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/matching/Yhdistä Parit 4.webp' '$SAMPLES/finnish/matching' 2>/dev/null || true
    if mv '$SAMPLES/finnish/matching/Yhdistä Parit 4.webp' '$SAMPLES/finnish/matching/yhdistä-parit-4.webp'; then
      chattr +i '$SAMPLES/finnish/matching/yhdistä-parit-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/matching/yhdistä-parit-4.webp' 2>/dev/null || true
      echo "  OK: finnish/matching/Yhdistä Parit 4.webp -> finnish/matching/yhdistä-parit-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/matching/yhdistä-parit-4.webp' '$SAMPLES/finnish/matching' 2>/dev/null; mv '$SAMPLES/finnish/matching/yhdistä-parit-4.webp' '$SAMPLES/finnish/matching/Yhdistä Parit 4.webp'; chattr +i '$SAMPLES/finnish/matching/Yhdistä Parit 4.webp' '$SAMPLES/finnish/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/matching/Yhdistä Parit 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/matching/Yhdistä Parit 4.webp' '$SAMPLES/finnish/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/matching/Yhdistä Parit 4.webp -> finnish/matching/yhdistä-parit-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/matching/yhdistä-parit-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/matching/Yhdistä Parit 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/matching/Yhdistä Parit 1 answer_key.webp → finnish/matching/yhdistä-parit-1-answer-key.webp
if [ -f '$SAMPLES/finnish/matching/Yhdistä Parit 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/matching/Yhdistä Parit 1 answer_key.webp' '$SAMPLES/finnish/matching' 2>/dev/null || true
    if mv '$SAMPLES/finnish/matching/Yhdistä Parit 1 answer_key.webp' '$SAMPLES/finnish/matching/yhdistä-parit-1-answer-key.webp'; then
      chattr +i '$SAMPLES/finnish/matching/yhdistä-parit-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/matching' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/matching/yhdistä-parit-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: finnish/matching/Yhdistä Parit 1 answer_key.webp -> finnish/matching/yhdistä-parit-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/matching/yhdistä-parit-1-answer-key.webp' '$SAMPLES/finnish/matching' 2>/dev/null; mv '$SAMPLES/finnish/matching/yhdistä-parit-1-answer-key.webp' '$SAMPLES/finnish/matching/Yhdistä Parit 1 answer_key.webp'; chattr +i '$SAMPLES/finnish/matching/Yhdistä Parit 1 answer_key.webp' '$SAMPLES/finnish/matching' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/matching/Yhdistä Parit 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/matching/Yhdistä Parit 1 answer_key.webp' '$SAMPLES/finnish/matching' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/matching/Yhdistä Parit 1 answer_key.webp -> finnish/matching/yhdistä-parit-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/matching/yhdistä-parit-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/matching/Yhdistä Parit 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/bingo/kuvabingo 1.webp → finnish/bingo/kuvabingo-1.webp
if [ -f '$SAMPLES/finnish/bingo/kuvabingo 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/bingo/kuvabingo 1.webp' '$SAMPLES/finnish/bingo' 2>/dev/null || true
    if mv '$SAMPLES/finnish/bingo/kuvabingo 1.webp' '$SAMPLES/finnish/bingo/kuvabingo-1.webp'; then
      chattr +i '$SAMPLES/finnish/bingo/kuvabingo-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/bingo' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/bingo/kuvabingo-1.webp' 2>/dev/null || true
      echo "  OK: finnish/bingo/kuvabingo 1.webp -> finnish/bingo/kuvabingo-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/bingo/kuvabingo-1.webp' '$SAMPLES/finnish/bingo' 2>/dev/null; mv '$SAMPLES/finnish/bingo/kuvabingo-1.webp' '$SAMPLES/finnish/bingo/kuvabingo 1.webp'; chattr +i '$SAMPLES/finnish/bingo/kuvabingo 1.webp' '$SAMPLES/finnish/bingo' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/bingo/kuvabingo 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/bingo/kuvabingo 1.webp' '$SAMPLES/finnish/bingo' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/bingo/kuvabingo 1.webp -> finnish/bingo/kuvabingo-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/bingo/kuvabingo-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/bingo/kuvabingo 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/bingo/kuvabingo 2.webp → finnish/bingo/kuvabingo-2.webp
if [ -f '$SAMPLES/finnish/bingo/kuvabingo 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/bingo/kuvabingo 2.webp' '$SAMPLES/finnish/bingo' 2>/dev/null || true
    if mv '$SAMPLES/finnish/bingo/kuvabingo 2.webp' '$SAMPLES/finnish/bingo/kuvabingo-2.webp'; then
      chattr +i '$SAMPLES/finnish/bingo/kuvabingo-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/bingo' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/bingo/kuvabingo-2.webp' 2>/dev/null || true
      echo "  OK: finnish/bingo/kuvabingo 2.webp -> finnish/bingo/kuvabingo-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/bingo/kuvabingo-2.webp' '$SAMPLES/finnish/bingo' 2>/dev/null; mv '$SAMPLES/finnish/bingo/kuvabingo-2.webp' '$SAMPLES/finnish/bingo/kuvabingo 2.webp'; chattr +i '$SAMPLES/finnish/bingo/kuvabingo 2.webp' '$SAMPLES/finnish/bingo' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/bingo/kuvabingo 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/bingo/kuvabingo 2.webp' '$SAMPLES/finnish/bingo' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/bingo/kuvabingo 2.webp -> finnish/bingo/kuvabingo-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/bingo/kuvabingo-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/bingo/kuvabingo 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/bingo/kuvabingo 3.webp → finnish/bingo/kuvabingo-3.webp
if [ -f '$SAMPLES/finnish/bingo/kuvabingo 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/bingo/kuvabingo 3.webp' '$SAMPLES/finnish/bingo' 2>/dev/null || true
    if mv '$SAMPLES/finnish/bingo/kuvabingo 3.webp' '$SAMPLES/finnish/bingo/kuvabingo-3.webp'; then
      chattr +i '$SAMPLES/finnish/bingo/kuvabingo-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/bingo' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/bingo/kuvabingo-3.webp' 2>/dev/null || true
      echo "  OK: finnish/bingo/kuvabingo 3.webp -> finnish/bingo/kuvabingo-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/bingo/kuvabingo-3.webp' '$SAMPLES/finnish/bingo' 2>/dev/null; mv '$SAMPLES/finnish/bingo/kuvabingo-3.webp' '$SAMPLES/finnish/bingo/kuvabingo 3.webp'; chattr +i '$SAMPLES/finnish/bingo/kuvabingo 3.webp' '$SAMPLES/finnish/bingo' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/bingo/kuvabingo 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/bingo/kuvabingo 3.webp' '$SAMPLES/finnish/bingo' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/bingo/kuvabingo 3.webp -> finnish/bingo/kuvabingo-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/bingo/kuvabingo-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/bingo/kuvabingo 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/bingo/kuvabingo 4.webp → finnish/bingo/kuvabingo-4.webp
if [ -f '$SAMPLES/finnish/bingo/kuvabingo 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/bingo/kuvabingo 4.webp' '$SAMPLES/finnish/bingo' 2>/dev/null || true
    if mv '$SAMPLES/finnish/bingo/kuvabingo 4.webp' '$SAMPLES/finnish/bingo/kuvabingo-4.webp'; then
      chattr +i '$SAMPLES/finnish/bingo/kuvabingo-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/bingo' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/bingo/kuvabingo-4.webp' 2>/dev/null || true
      echo "  OK: finnish/bingo/kuvabingo 4.webp -> finnish/bingo/kuvabingo-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/bingo/kuvabingo-4.webp' '$SAMPLES/finnish/bingo' 2>/dev/null; mv '$SAMPLES/finnish/bingo/kuvabingo-4.webp' '$SAMPLES/finnish/bingo/kuvabingo 4.webp'; chattr +i '$SAMPLES/finnish/bingo/kuvabingo 4.webp' '$SAMPLES/finnish/bingo' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/bingo/kuvabingo 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/bingo/kuvabingo 4.webp' '$SAMPLES/finnish/bingo' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/bingo/kuvabingo 4.webp -> finnish/bingo/kuvabingo-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/bingo/kuvabingo-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/bingo/kuvabingo 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/sudoku/Kuva-Sudoku 1.webp → finnish/sudoku/kuva-sudoku-1.webp
if [ -f '$SAMPLES/finnish/sudoku/Kuva-Sudoku 1.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/sudoku/Kuva-Sudoku 1.webp' '$SAMPLES/finnish/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/finnish/sudoku/Kuva-Sudoku 1.webp' '$SAMPLES/finnish/sudoku/kuva-sudoku-1.webp'; then
      chattr +i '$SAMPLES/finnish/sudoku/kuva-sudoku-1.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/sudoku/kuva-sudoku-1.webp' 2>/dev/null || true
      echo "  OK: finnish/sudoku/Kuva-Sudoku 1.webp -> finnish/sudoku/kuva-sudoku-1.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/sudoku/kuva-sudoku-1.webp' '$SAMPLES/finnish/sudoku' 2>/dev/null; mv '$SAMPLES/finnish/sudoku/kuva-sudoku-1.webp' '$SAMPLES/finnish/sudoku/Kuva-Sudoku 1.webp'; chattr +i '$SAMPLES/finnish/sudoku/Kuva-Sudoku 1.webp' '$SAMPLES/finnish/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/sudoku/Kuva-Sudoku 1.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/sudoku/Kuva-Sudoku 1.webp' '$SAMPLES/finnish/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/sudoku/Kuva-Sudoku 1.webp -> finnish/sudoku/kuva-sudoku-1.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/sudoku/kuva-sudoku-1.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/sudoku/Kuva-Sudoku 1.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/sudoku/Kuva-Sudoku 3.webp → finnish/sudoku/kuva-sudoku-3.webp
if [ -f '$SAMPLES/finnish/sudoku/Kuva-Sudoku 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/sudoku/Kuva-Sudoku 3.webp' '$SAMPLES/finnish/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/finnish/sudoku/Kuva-Sudoku 3.webp' '$SAMPLES/finnish/sudoku/kuva-sudoku-3.webp'; then
      chattr +i '$SAMPLES/finnish/sudoku/kuva-sudoku-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/sudoku/kuva-sudoku-3.webp' 2>/dev/null || true
      echo "  OK: finnish/sudoku/Kuva-Sudoku 3.webp -> finnish/sudoku/kuva-sudoku-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/sudoku/kuva-sudoku-3.webp' '$SAMPLES/finnish/sudoku' 2>/dev/null; mv '$SAMPLES/finnish/sudoku/kuva-sudoku-3.webp' '$SAMPLES/finnish/sudoku/Kuva-Sudoku 3.webp'; chattr +i '$SAMPLES/finnish/sudoku/Kuva-Sudoku 3.webp' '$SAMPLES/finnish/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/sudoku/Kuva-Sudoku 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/sudoku/Kuva-Sudoku 3.webp' '$SAMPLES/finnish/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/sudoku/Kuva-Sudoku 3.webp -> finnish/sudoku/kuva-sudoku-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/sudoku/kuva-sudoku-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/sudoku/Kuva-Sudoku 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/sudoku/Kuva-Sudoku 4.webp → finnish/sudoku/kuva-sudoku-4.webp
if [ -f '$SAMPLES/finnish/sudoku/Kuva-Sudoku 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/sudoku/Kuva-Sudoku 4.webp' '$SAMPLES/finnish/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/finnish/sudoku/Kuva-Sudoku 4.webp' '$SAMPLES/finnish/sudoku/kuva-sudoku-4.webp'; then
      chattr +i '$SAMPLES/finnish/sudoku/kuva-sudoku-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/sudoku/kuva-sudoku-4.webp' 2>/dev/null || true
      echo "  OK: finnish/sudoku/Kuva-Sudoku 4.webp -> finnish/sudoku/kuva-sudoku-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/sudoku/kuva-sudoku-4.webp' '$SAMPLES/finnish/sudoku' 2>/dev/null; mv '$SAMPLES/finnish/sudoku/kuva-sudoku-4.webp' '$SAMPLES/finnish/sudoku/Kuva-Sudoku 4.webp'; chattr +i '$SAMPLES/finnish/sudoku/Kuva-Sudoku 4.webp' '$SAMPLES/finnish/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/sudoku/Kuva-Sudoku 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/sudoku/Kuva-Sudoku 4.webp' '$SAMPLES/finnish/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/sudoku/Kuva-Sudoku 4.webp -> finnish/sudoku/kuva-sudoku-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/sudoku/kuva-sudoku-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/sudoku/Kuva-Sudoku 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/sudoku/Kuva-Sudoku 5.webp → finnish/sudoku/kuva-sudoku-5.webp
if [ -f '$SAMPLES/finnish/sudoku/Kuva-Sudoku 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/sudoku/Kuva-Sudoku 5.webp' '$SAMPLES/finnish/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/finnish/sudoku/Kuva-Sudoku 5.webp' '$SAMPLES/finnish/sudoku/kuva-sudoku-5.webp'; then
      chattr +i '$SAMPLES/finnish/sudoku/kuva-sudoku-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/sudoku/kuva-sudoku-5.webp' 2>/dev/null || true
      echo "  OK: finnish/sudoku/Kuva-Sudoku 5.webp -> finnish/sudoku/kuva-sudoku-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/sudoku/kuva-sudoku-5.webp' '$SAMPLES/finnish/sudoku' 2>/dev/null; mv '$SAMPLES/finnish/sudoku/kuva-sudoku-5.webp' '$SAMPLES/finnish/sudoku/Kuva-Sudoku 5.webp'; chattr +i '$SAMPLES/finnish/sudoku/Kuva-Sudoku 5.webp' '$SAMPLES/finnish/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/sudoku/Kuva-Sudoku 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/sudoku/Kuva-Sudoku 5.webp' '$SAMPLES/finnish/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/sudoku/Kuva-Sudoku 5.webp -> finnish/sudoku/kuva-sudoku-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/sudoku/kuva-sudoku-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/sudoku/Kuva-Sudoku 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/sudoku/Kuva-Sudoku 1 answer_key.webp → finnish/sudoku/kuva-sudoku-1-answer-key.webp
if [ -f '$SAMPLES/finnish/sudoku/Kuva-Sudoku 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/sudoku/Kuva-Sudoku 1 answer_key.webp' '$SAMPLES/finnish/sudoku' 2>/dev/null || true
    if mv '$SAMPLES/finnish/sudoku/Kuva-Sudoku 1 answer_key.webp' '$SAMPLES/finnish/sudoku/kuva-sudoku-1-answer-key.webp'; then
      chattr +i '$SAMPLES/finnish/sudoku/kuva-sudoku-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/sudoku' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/sudoku/kuva-sudoku-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: finnish/sudoku/Kuva-Sudoku 1 answer_key.webp -> finnish/sudoku/kuva-sudoku-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/sudoku/kuva-sudoku-1-answer-key.webp' '$SAMPLES/finnish/sudoku' 2>/dev/null; mv '$SAMPLES/finnish/sudoku/kuva-sudoku-1-answer-key.webp' '$SAMPLES/finnish/sudoku/Kuva-Sudoku 1 answer_key.webp'; chattr +i '$SAMPLES/finnish/sudoku/Kuva-Sudoku 1 answer_key.webp' '$SAMPLES/finnish/sudoku' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/sudoku/Kuva-Sudoku 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/sudoku/Kuva-Sudoku 1 answer_key.webp' '$SAMPLES/finnish/sudoku' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/sudoku/Kuva-Sudoku 1 answer_key.webp -> finnish/sudoku/kuva-sudoku-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/sudoku/kuva-sudoku-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/sudoku/Kuva-Sudoku 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/crossword/Kuvaristikko 2.webp → finnish/crossword/kuvaristikko-2.webp
if [ -f '$SAMPLES/finnish/crossword/Kuvaristikko 2.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/crossword/Kuvaristikko 2.webp' '$SAMPLES/finnish/crossword' 2>/dev/null || true
    if mv '$SAMPLES/finnish/crossword/Kuvaristikko 2.webp' '$SAMPLES/finnish/crossword/kuvaristikko-2.webp'; then
      chattr +i '$SAMPLES/finnish/crossword/kuvaristikko-2.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/crossword/kuvaristikko-2.webp' 2>/dev/null || true
      echo "  OK: finnish/crossword/Kuvaristikko 2.webp -> finnish/crossword/kuvaristikko-2.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/crossword/kuvaristikko-2.webp' '$SAMPLES/finnish/crossword' 2>/dev/null; mv '$SAMPLES/finnish/crossword/kuvaristikko-2.webp' '$SAMPLES/finnish/crossword/Kuvaristikko 2.webp'; chattr +i '$SAMPLES/finnish/crossword/Kuvaristikko 2.webp' '$SAMPLES/finnish/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/crossword/Kuvaristikko 2.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/crossword/Kuvaristikko 2.webp' '$SAMPLES/finnish/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/crossword/Kuvaristikko 2.webp -> finnish/crossword/kuvaristikko-2.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/crossword/kuvaristikko-2.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/crossword/Kuvaristikko 2.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/crossword/Kuvaristikko 3.webp → finnish/crossword/kuvaristikko-3.webp
if [ -f '$SAMPLES/finnish/crossword/Kuvaristikko 3.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/crossword/Kuvaristikko 3.webp' '$SAMPLES/finnish/crossword' 2>/dev/null || true
    if mv '$SAMPLES/finnish/crossword/Kuvaristikko 3.webp' '$SAMPLES/finnish/crossword/kuvaristikko-3.webp'; then
      chattr +i '$SAMPLES/finnish/crossword/kuvaristikko-3.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/crossword/kuvaristikko-3.webp' 2>/dev/null || true
      echo "  OK: finnish/crossword/Kuvaristikko 3.webp -> finnish/crossword/kuvaristikko-3.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/crossword/kuvaristikko-3.webp' '$SAMPLES/finnish/crossword' 2>/dev/null; mv '$SAMPLES/finnish/crossword/kuvaristikko-3.webp' '$SAMPLES/finnish/crossword/Kuvaristikko 3.webp'; chattr +i '$SAMPLES/finnish/crossword/Kuvaristikko 3.webp' '$SAMPLES/finnish/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/crossword/Kuvaristikko 3.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/crossword/Kuvaristikko 3.webp' '$SAMPLES/finnish/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/crossword/Kuvaristikko 3.webp -> finnish/crossword/kuvaristikko-3.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/crossword/kuvaristikko-3.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/crossword/Kuvaristikko 3.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/crossword/Kuvaristikko 4.webp → finnish/crossword/kuvaristikko-4.webp
if [ -f '$SAMPLES/finnish/crossword/Kuvaristikko 4.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/crossword/Kuvaristikko 4.webp' '$SAMPLES/finnish/crossword' 2>/dev/null || true
    if mv '$SAMPLES/finnish/crossword/Kuvaristikko 4.webp' '$SAMPLES/finnish/crossword/kuvaristikko-4.webp'; then
      chattr +i '$SAMPLES/finnish/crossword/kuvaristikko-4.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/crossword/kuvaristikko-4.webp' 2>/dev/null || true
      echo "  OK: finnish/crossword/Kuvaristikko 4.webp -> finnish/crossword/kuvaristikko-4.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/crossword/kuvaristikko-4.webp' '$SAMPLES/finnish/crossword' 2>/dev/null; mv '$SAMPLES/finnish/crossword/kuvaristikko-4.webp' '$SAMPLES/finnish/crossword/Kuvaristikko 4.webp'; chattr +i '$SAMPLES/finnish/crossword/Kuvaristikko 4.webp' '$SAMPLES/finnish/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/crossword/Kuvaristikko 4.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/crossword/Kuvaristikko 4.webp' '$SAMPLES/finnish/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/crossword/Kuvaristikko 4.webp -> finnish/crossword/kuvaristikko-4.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/crossword/kuvaristikko-4.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/crossword/Kuvaristikko 4.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/crossword/Kuvaristikko 5.webp → finnish/crossword/kuvaristikko-5.webp
if [ -f '$SAMPLES/finnish/crossword/Kuvaristikko 5.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/crossword/Kuvaristikko 5.webp' '$SAMPLES/finnish/crossword' 2>/dev/null || true
    if mv '$SAMPLES/finnish/crossword/Kuvaristikko 5.webp' '$SAMPLES/finnish/crossword/kuvaristikko-5.webp'; then
      chattr +i '$SAMPLES/finnish/crossword/kuvaristikko-5.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/crossword/kuvaristikko-5.webp' 2>/dev/null || true
      echo "  OK: finnish/crossword/Kuvaristikko 5.webp -> finnish/crossword/kuvaristikko-5.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/crossword/kuvaristikko-5.webp' '$SAMPLES/finnish/crossword' 2>/dev/null; mv '$SAMPLES/finnish/crossword/kuvaristikko-5.webp' '$SAMPLES/finnish/crossword/Kuvaristikko 5.webp'; chattr +i '$SAMPLES/finnish/crossword/Kuvaristikko 5.webp' '$SAMPLES/finnish/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/crossword/Kuvaristikko 5.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/crossword/Kuvaristikko 5.webp' '$SAMPLES/finnish/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/crossword/Kuvaristikko 5.webp -> finnish/crossword/kuvaristikko-5.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/crossword/kuvaristikko-5.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/crossword/Kuvaristikko 5.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/crossword/Kuvaristikko 6.webp → finnish/crossword/kuvaristikko-6.webp
if [ -f '$SAMPLES/finnish/crossword/Kuvaristikko 6.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/crossword/Kuvaristikko 6.webp' '$SAMPLES/finnish/crossword' 2>/dev/null || true
    if mv '$SAMPLES/finnish/crossword/Kuvaristikko 6.webp' '$SAMPLES/finnish/crossword/kuvaristikko-6.webp'; then
      chattr +i '$SAMPLES/finnish/crossword/kuvaristikko-6.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/crossword/kuvaristikko-6.webp' 2>/dev/null || true
      echo "  OK: finnish/crossword/Kuvaristikko 6.webp -> finnish/crossword/kuvaristikko-6.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/crossword/kuvaristikko-6.webp' '$SAMPLES/finnish/crossword' 2>/dev/null; mv '$SAMPLES/finnish/crossword/kuvaristikko-6.webp' '$SAMPLES/finnish/crossword/Kuvaristikko 6.webp'; chattr +i '$SAMPLES/finnish/crossword/Kuvaristikko 6.webp' '$SAMPLES/finnish/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/crossword/Kuvaristikko 6.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/crossword/Kuvaristikko 6.webp' '$SAMPLES/finnish/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/crossword/Kuvaristikko 6.webp -> finnish/crossword/kuvaristikko-6.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/crossword/kuvaristikko-6.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/crossword/Kuvaristikko 6.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

# finnish/crossword/Kuvaristikko 1 answer_key.webp → finnish/crossword/kuvaristikko-1-answer-key.webp
if [ -f '$SAMPLES/finnish/crossword/Kuvaristikko 1 answer_key.webp' ]; then
  if [ "$MODE" = "--apply" ]; then
    chattr -i '$SAMPLES/finnish/crossword/Kuvaristikko 1 answer_key.webp' '$SAMPLES/finnish/crossword' 2>/dev/null || true
    if mv '$SAMPLES/finnish/crossword/Kuvaristikko 1 answer_key.webp' '$SAMPLES/finnish/crossword/kuvaristikko-1-answer-key.webp'; then
      chattr +i '$SAMPLES/finnish/crossword/kuvaristikko-1-answer-key.webp' 2>/dev/null || true
      chattr +i '$SAMPLES/finnish/crossword' 2>/dev/null || true
      chown lcs-media:lcs-media '$SAMPLES/finnish/crossword/kuvaristikko-1-answer-key.webp' 2>/dev/null || true
      echo "  OK: finnish/crossword/Kuvaristikko 1 answer_key.webp -> finnish/crossword/kuvaristikko-1-answer-key.webp" | tee -a "$LOG"
      echo "chattr -i '$SAMPLES/finnish/crossword/kuvaristikko-1-answer-key.webp' '$SAMPLES/finnish/crossword' 2>/dev/null; mv '$SAMPLES/finnish/crossword/kuvaristikko-1-answer-key.webp' '$SAMPLES/finnish/crossword/Kuvaristikko 1 answer_key.webp'; chattr +i '$SAMPLES/finnish/crossword/Kuvaristikko 1 answer_key.webp' '$SAMPLES/finnish/crossword' 2>/dev/null" >> "$ROLLBACK"
      OK=$((OK + 1))
    else
      echo "  FAIL: finnish/crossword/Kuvaristikko 1 answer_key.webp" | tee -a "$LOG"
      chattr +i '$SAMPLES/finnish/crossword/Kuvaristikko 1 answer_key.webp' '$SAMPLES/finnish/crossword' 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: finnish/crossword/Kuvaristikko 1 answer_key.webp -> finnish/crossword/kuvaristikko-1-answer-key.webp" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
elif [ -f '$SAMPLES/finnish/crossword/kuvaristikko-1-answer-key.webp' ]; then
  SKIP=$((SKIP + 1))
else
  echo "  MISSING: finnish/crossword/Kuvaristikko 1 answer_key.webp" | tee -a "$LOG"
  FAIL=$((FAIL + 1))
fi

echo "" | tee -a "$LOG"
echo "=== Summary ===" | tee -a "$LOG"
echo "  Renamed: $OK" | tee -a "$LOG"
echo "  Skipped: $SKIP" | tee -a "$LOG"
echo "  Failed:  $FAIL" | tee -a "$LOG"
echo "  Log: $LOG" | tee -a "$LOG"
if [ "$MODE" = "--apply" ]; then
  echo "  Rollback: $ROLLBACK" | tee -a "$LOG"
fi