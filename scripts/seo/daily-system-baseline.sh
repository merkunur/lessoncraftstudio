#!/usr/bin/env bash
# Daily Teaching System — the traffic and conversion BASELINE (PLAN.md Part 0.2).
#
# READ-ONLY. Runs on Hetzner against the self-hosted Umami database and (aggregate counts
# only) the application database. Nothing is written anywhere on the server.
#
# From the PC (no file is left on the server):
#   ssh -i ~/.ssh/id_ed25519 root@65.108.5.250 'bash -s' < scripts/seo/daily-system-baseline.sh \
#     > docs/SEO/daily-system-baseline/traffic-28d.txt
#
# Window: the 28 COMPLETE days before today (today is excluded, it is a part-day).
# Umami counts sessions that run JavaScript; it is the trend instrument. Search Console is
# the absolute truth for clicks and is read by the operator (this script cannot reach it).
set -euo pipefail
U=$(grep -oE '^DATABASE_URL=.*' /opt/umami/.env | cut -d= -f2-)
W="created_at >= date_trunc('day', now()) - interval '28 days' AND created_at < date_trunc('day', now())"
G="referrer_domain LIKE '%google%'"
# one label per page family; the order of the WHENs matters (most specific first)
SURF="CASE
  WHEN url_path ~ '^/[a-z]{2}/decks/'                         THEN '01 deck page'
  WHEN url_path ~ '^/[a-z]{2}/worksheets/sets'                THEN '02 level set page'
  WHEN url_path ~ '^/[a-z]{2}/worksheets/[^/]+'               THEN '03 worksheet landing or hub page'
  WHEN url_path ~ '^/[a-z]{2}/worksheets/?$'                  THEN '04 worksheets hub'
  WHEN url_path ~ '^/[a-z]{2}/topic/[^/]+/[^/]+'              THEN '05 topic page (2 axes)'
  WHEN url_path ~ '^/[a-z]{2}/topic/[^/]+'                    THEN '06 topic page'
  WHEN url_path ~ '^/[a-z]{2}/activities/[^/]+'               THEN '07 activity page'
  WHEN url_path ~ '^/[a-z]{2}/activities/?$'                  THEN '08 activities hub'
  WHEN url_path ~ '^/[a-z]{2}/tools/[^/]+'                    THEN '09 tool page'
  WHEN url_path ~ '^/[a-z]{2}/tools/?$'                       THEN '10 tools hub'
  WHEN url_path ~ '^/[a-z]{2}/worksheet-makers/[^/]+'         THEN '11 maker landing'
  WHEN url_path ~ '^/[a-z]{2}/worksheet-makers/?$'            THEN '12 makers hub'
  WHEN url_path ~ '^/makers/'                                 THEN '13 maker app'
  WHEN url_path ~ '^/[a-z]{2}/standards/'                     THEN '14 standards page'
  WHEN url_path ~ '^/[a-z]{2}/pricing'                        THEN '15 pricing'
  WHEN url_path ~ '^/[a-z]{2}/(auth|subscribe)'               THEN '16 sign-in, sign-up, subscribe'
  WHEN url_path ~ '^/[a-z]{2}/(workspace|collections|dashboard)' THEN '17 workspace'
  WHEN url_path ~ '^/(play|s)/'                               THEN '18 student play link'
  WHEN url_path ~ '^/[a-z]{2}/?$' OR url_path = '/'           THEN '19 homepage'
  ELSE '20 other' END"
q() { psql "$U" -P pager=off -c "$1"; }

echo "== Daily Teaching System baseline — captured $(date -u +%Y-%m-%dT%H:%MZ) =="
echo "== window: the 28 complete days before today (UTC) =="
echo
echo "-- 1. site totals (28 days) and per-day averages"
q "SELECT count(DISTINCT session_id) AS sessions, count(*) AS pageviews,
          round(count(DISTINCT session_id)/28.0,1) AS sessions_per_day,
          count(DISTINCT session_id) FILTER (WHERE $G) AS google_sessions,
          round(count(DISTINCT session_id) FILTER (WHERE $G)/28.0,1) AS google_sessions_per_day
   FROM website_event WHERE event_type = 1 AND $W;"
echo "-- 2. Google-referred sessions per week (oldest first)"
q "SELECT (date_trunc('day', now())::date - ((date_trunc('day', now())::date - created_at::date - 1)/7 + 1)*7) AS week_starting,
          count(DISTINCT session_id) AS google_sessions
   FROM website_event WHERE event_type = 1 AND $G AND $W GROUP BY 1 ORDER BY 1;"
echo "-- 3. by page family: pageviews, sessions that viewed it, Google-referred sessions that LANDED on it"
q "WITH pv AS (SELECT session_id, visit_id, created_at, referrer_domain, $SURF AS surface FROM website_event WHERE event_type = 1 AND $W),
        first AS (SELECT DISTINCT ON (visit_id) visit_id, surface, referrer_domain FROM pv ORDER BY visit_id, created_at)
   SELECT p.surface, count(*) AS pageviews, count(DISTINCT p.session_id) AS sessions,
          (SELECT count(*) FROM first f WHERE f.surface = p.surface) AS visits_starting_here,
          (SELECT count(*) FROM first f WHERE f.surface = p.surface AND f.referrer_domain LIKE '%google%') AS google_visits_starting_here
   FROM pv p GROUP BY p.surface ORDER BY p.surface;"
echo "-- 4. by language (first path segment): sessions and Google-referred sessions"
q "SELECT substring(url_path from '^/([a-z]{2})(/|$)') AS lang, count(DISTINCT session_id) AS sessions,
          count(DISTINCT session_id) FILTER (WHERE $G) AS google_sessions
   FROM website_event WHERE event_type = 1 AND $W GROUP BY 1 ORDER BY 2 DESC;"
echo "-- 5. conversion events (28 days): how many, and from how many sessions"
q "SELECT event_name, count(*) AS events, count(DISTINCT session_id) AS sessions
   FROM website_event WHERE event_type = 2 AND $W GROUP BY 1 ORDER BY 2 DESC;"
echo "-- 6. where the paywall was shown (page family of the wall event)"
q "SELECT $SURF AS surface, count(*) AS walls, count(DISTINCT session_id) AS sessions
   FROM website_event WHERE event_type = 2 AND event_name = 'meter-wall-shown' AND $W GROUP BY 1 ORDER BY 2 DESC;"
echo "-- 7. sessions that saw a wall and then opened pricing / started checkout"
q "WITH walled AS (SELECT DISTINCT session_id FROM website_event WHERE event_type = 2 AND event_name = 'meter-wall-shown' AND $W)
   SELECT (SELECT count(*) FROM walled) AS walled_sessions,
          (SELECT count(DISTINCT e.session_id) FROM website_event e JOIN walled w USING (session_id) WHERE e.event_type = 1 AND e.url_path ~ '^/[a-z]{2}/pricing' AND $W) AS of_which_opened_pricing,
          (SELECT count(DISTINCT e.session_id) FROM website_event e JOIN walled w USING (session_id) WHERE e.event_type = 2 AND e.event_name = 'checkout-started' AND $W) AS of_which_started_checkout;"

# application database — aggregate counts only, no rows, no personal data
A=$(grep -oE '^DATABASE_URL=.*' /opt/lessoncraftstudio/frontend/.env.production | cut -d= -f2- | tr -d '"' | sed 's/?.*//')   # psql refuses Prisma's ?connection_limit / ?schema parameters
qa() { psql "$A" -P pager=off -c "$1" 2>&1 || echo "(query not available: $1)"; }
echo "-- 8. accounts and subscriptions (application database, counts only)"
qa "SELECT count(*) AS accounts_total,
           count(*) FILTER (WHERE created_at >= date_trunc('day', now()) - interval '28 days' AND created_at < date_trunc('day', now())) AS accounts_created_28d
    FROM users;"
qa "SELECT status, count(*) FROM subscriptions GROUP BY 1 ORDER BY 2 DESC;"
qa "SELECT count(*) AS subscriptions_created_28d FROM subscriptions
    WHERE created_at >= date_trunc('day', now()) - interval '28 days' AND created_at < date_trunc('day', now());"
echo "-- 9. the teacher features the new programme extends (rows that exist today)"
qa "SELECT (SELECT count(*) FROM play_links) AS deck_play_links,
           (SELECT count(*) FROM activity_play_links WHERE status = 'live') AS activity_play_links,
           (SELECT count(*) FROM hosted_worksheets WHERE status = 'live') AS hosted_worksheets,
           (SELECT count(*) FROM maker_recipes WHERE deleted_at IS NULL) AS maker_recipes,
           (SELECT count(*) FROM maker_share_links WHERE revoked_at IS NULL) AS maker_share_links,
           (SELECT count(*) FROM collections) AS collections;"
echo "== end =="
