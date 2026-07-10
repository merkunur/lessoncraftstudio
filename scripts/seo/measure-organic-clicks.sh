#!/usr/bin/env bash
# Organic-clicks proxy — daily Google-referred sessions from self-hosted Umami.
#
# THE goal metric for the 1000-clicks/day program (operator /goal 2026-07-10).
# Umami (live since 2026-07-03) records referrer_domain per pageview; distinct
# sessions with a google referrer per day track GSC clicks closely (validated
# 2026-07-11: Umami 8-15/day vs GSC-estimated ~11-15/day over Jul 4-10).
# Not identical to GSC clicks (blocked-JS visitors + image-search + Bing are
# counted differently) — use for TREND, use GSC for absolute truth.
#
# Run ON Hetzner:   bash scripts/seo/measure-organic-clicks.sh [days]
# From the PC:      ssh -i ~/.ssh/id_ed25519 root@65.108.5.250 "bash /opt/lessoncraftstudio/scripts/seo/measure-organic-clicks.sh 30"
set -euo pipefail
DAYS="${1:-30}"
DBURL=$(grep -oE '^DATABASE_URL=.*' /opt/umami/.env | cut -d= -f2-)
psql "$DBURL" -c "
  SELECT date_trunc('day', created_at)::date AS day,
         count(DISTINCT session_id)          AS google_sessions,
         count(*)                            AS google_pageviews
  FROM website_event
  WHERE referrer_domain LIKE '%google%'
    AND event_type = 1
    AND created_at >= now() - interval '${DAYS} days'
  GROUP BY 1 ORDER BY 1;"
psql "$DBURL" -c "
  SELECT round(avg(c),1) AS avg_google_sessions_per_day_last_7
  FROM (SELECT count(DISTINCT session_id) c FROM website_event
        WHERE referrer_domain LIKE '%google%' AND event_type = 1
          AND created_at >= now() - interval '7 days'
          AND created_at <  date_trunc('day', now())
        GROUP BY date_trunc('day', created_at)) t;"
