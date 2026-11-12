#!/usr/bin/env bash
# Daily Teaching System, Part 11.1 — the PATH REPORT: how visitors move from the page they land on to an account,
# to the pricing page, to a checkout, to a subscription (PLAN.md Part 11).
#
# READ-ONLY. Runs on Hetzner against the self-hosted Umami database and (aggregate counts only) the application
# database. Nothing is written anywhere on the server. The baseline of the same numbers before Part 11 is
# docs/SEO/daily-system-baseline/BASELINE.md.
#
# From the PC (no file is left on the server):
#   ssh -i ~/.ssh/id_ed25519 root@65.108.5.250 'DAYS=28 bash -s' < scripts/seo/path-report.sh \
#     > docs/SEO/daily-system-baseline/path-$(date +%F).txt
#
# Window: the DAYS complete days before today (default 28; today is left out, it is a part-day).
#
# What a "session" is here: the beacon gives a visitor a new anonymous id every day, on purpose (no cookie, nothing
# stored). So a session is one visitor on one day, and a path is counted inside one day only. A teacher who signs up
# on Monday and subscribes on Thursday is two sessions; the steps of the same day are the instrument, the weekly
# totals of accounts and subscriptions (section 7) are the truth.
set -euo pipefail
DAYS="${DAYS:-28}"
[[ "$DAYS" =~ ^[0-9]+$ ]] || { echo "DAYS must be a number"; exit 1; }
U=$(grep -oE '^DATABASE_URL=.*' /opt/umami/.env | cut -d= -f2-)
W="created_at >= date_trunc('day', now()) - interval '$DAYS days' AND created_at < date_trunc('day', now())"
WE="e.created_at >= date_trunc('day', now()) - interval '$DAYS days' AND e.created_at < date_trunc('day', now())"   # the same window for a query that joins the event data
# one label per page family; the order of the WHENs matters (most specific first)
SURF="CASE
  WHEN url_path ~ '^/[a-z]{2}/units/'                         THEN '21 unit or year plan page'
  WHEN url_path ~ '^/[a-z]{2}/units/?$'                       THEN '22 units hub'
  WHEN url_path ~ '^/[a-z]{2}/sub-plans'                      THEN '23 sub plans'
  WHEN url_path ~ '^/[a-z]{2}/assessments'                    THEN '24 assessments'
  WHEN url_path ~ '^/[a-z]{2}/curriculum'                     THEN '25 curriculum checklists'
  WHEN url_path ~ '^/[a-z]{2}/schools'                        THEN '26 for schools'
  WHEN url_path ~ '^/[a-z]{2}/teach'                          THEN '27 grade page'
  WHEN url_path ~ '^/[a-z]{2}/decks/'                         THEN '01 deck page'
  WHEN url_path ~ '^/[a-z]{2}/worksheets/sets'                THEN '02 level set page'
  WHEN url_path ~ '^/[a-z]{2}/worksheets/[^/]+'               THEN '03 worksheet landing or hub page'
  WHEN url_path ~ '^/[a-z]{2}/worksheets/?$'                  THEN '04 worksheets hub'
  WHEN url_path ~ '^/[a-z]{2}/topic/'                         THEN '06 topic page'
  WHEN url_path ~ '^/[a-z]{2}/activities/[^/]+'               THEN '07 activity page'
  WHEN url_path ~ '^/[a-z]{2}/activities/?$'                  THEN '08 activities hub'
  WHEN url_path ~ '^/[a-z]{2}/tools/[^/]+'                    THEN '09 tool page'
  WHEN url_path ~ '^/[a-z]{2}/tools/?$'                       THEN '10 tools hub'
  WHEN url_path ~ '^/[a-z]{2}/worksheet-makers'               THEN '11 maker landing or hub'
  WHEN url_path ~ '^/makers/'                                 THEN '13 maker app'
  WHEN url_path ~ '^/[a-z]{2}/standards/'                     THEN '14 standards page'
  WHEN url_path ~ '^/[a-z]{2}/pricing'                        THEN '15 pricing'
  WHEN url_path ~ '^/[a-z]{2}/(auth|subscribe)'               THEN '16 sign-in, sign-up, subscribe'
  WHEN url_path ~ '^/[a-z]{2}/(workspace|collections|dashboard|member)' THEN '17 workspace'
  WHEN url_path ~ '^/(play|s|c)/'                             THEN '18 student link'
  WHEN url_path ~ '^/[a-z]{2}/?$' OR url_path = '/'           THEN '19 homepage'
  ELSE '20 other' END"
q() { psql "$U" -P pager=off -c "$1" 2>&1 || echo "(query not available)"; }
echo "== Path report — captured $(date -u +%Y-%m-%dT%H:%MZ), the $DAYS complete days before today (UTC) =="
echo
echo "-- 1. the path by the page family a session STARTED on (a session = one visitor on one day)"
echo "--    walled = met the paywall; signup_open / pricing_open = opened that page; signup = made an account; checkout = pressed a buy button"
q "WITH pv AS (SELECT session_id, created_at, $SURF AS surface FROM website_event WHERE event_type = 1 AND $W),
        first AS (SELECT DISTINCT ON (session_id) session_id, surface FROM pv ORDER BY session_id, created_at),
        ev AS (SELECT session_id,
                      bool_or(event_type = 2 AND event_name = 'meter-wall-shown') AS walled,
                      bool_or(event_type = 1 AND url_path ~ '^/[a-z]{2}/auth/signup') AS signup_open,
                      bool_or(event_type = 2 AND event_name = 'signup') AS signup,
                      bool_or(event_type = 1 AND url_path ~ '^/[a-z]{2}/pricing') AS pricing_open,
                      bool_or(event_type = 2 AND event_name = 'checkout-started') AS checkout,
                      bool_or(event_type = 2 AND event_name = 'teacher-file-click') AS teacher_file
               FROM website_event WHERE $W GROUP BY 1)
   SELECT f.surface AS started_on, count(*) AS sessions,
          count(*) FILTER (WHERE e.walled) AS walled, count(*) FILTER (WHERE e.signup_open) AS signup_open,
          count(*) FILTER (WHERE e.signup) AS signup, count(*) FILTER (WHERE e.teacher_file) AS teacher_file_click,
          count(*) FILTER (WHERE e.pricing_open) AS pricing_open, count(*) FILTER (WHERE e.checkout) AS checkout
   FROM first f JOIN ev e USING (session_id) GROUP BY 1 ORDER BY 2 DESC;"
echo "-- 2. where the sign-up page, the pricing page and the buy buttons were reached FROM (the wall or gate that sent the visitor; recorded since Part 11.1)"
q "SELECT e.event_name, coalesce(d.string_value, '(not recorded)') AS sent_from, count(*) AS events, count(DISTINCT e.session_id) AS sessions
   FROM website_event e LEFT JOIN event_data d ON d.website_event_id = e.event_id AND d.data_key = 'from'
   WHERE e.event_type = 2 AND e.event_name IN ('signup-open','signup','pricing-open','checkout-started') AND $WE
   GROUP BY 1, 2 ORDER BY 1, 3 DESC;"
echo "-- 3. clicks on Teacher-only files and buttons: what was asked for, on which kind of page (recorded since Part 11.1)"
q "SELECT coalesce(s.string_value, '?') AS on_page, coalesce(w.string_value, '?') AS what, count(*) AS clicks, count(DISTINCT e.session_id) AS sessions
   FROM website_event e
   LEFT JOIN event_data w ON w.website_event_id = e.event_id AND w.data_key = 'what'
   LEFT JOIN event_data s ON s.website_event_id = e.event_id AND s.data_key = 'surface'
   WHERE e.event_type = 2 AND e.event_name = 'teacher-file-click' AND $WE GROUP BY 1, 2 ORDER BY 3 DESC;"
echo "-- 4. the new products: page views, sessions, and how many of those sessions opened pricing or pressed a buy button the same day"
q "WITH pv AS (SELECT session_id, $SURF AS surface FROM website_event WHERE event_type = 1 AND $W),
        np AS (SELECT surface, session_id, count(*) AS views FROM pv WHERE surface >= '21' GROUP BY 1, 2),
        pr AS (SELECT DISTINCT session_id FROM website_event WHERE event_type = 1 AND url_path ~ '^/[a-z]{2}/pricing' AND $W),
        co AS (SELECT DISTINCT session_id FROM website_event WHERE event_type = 2 AND event_name = 'checkout-started' AND $W)
   SELECT np.surface, sum(np.views) AS pageviews, count(*) AS sessions,
          count(*) FILTER (WHERE np.session_id IN (SELECT session_id FROM pr)) AS opened_pricing,
          count(*) FILTER (WHERE np.session_id IN (SELECT session_id FROM co)) AS pressed_buy
   FROM np GROUP BY 1 ORDER BY 1;"
echo "-- 5. the homepage and the workspace: sessions from every source, and what the workspace's visitors did next"
q "SELECT count(DISTINCT session_id) FILTER (WHERE url_path ~ '^/[a-z]{2}/?$' OR url_path = '/') AS homepage_sessions,
          count(DISTINCT session_id) FILTER (WHERE url_path ~ '^/[a-z]{2}/workspace') AS workspace_sessions,
          count(DISTINCT session_id) FILTER (WHERE url_path ~ '^/[a-z]{2}/pricing') AS pricing_sessions,
          count(DISTINCT session_id) AS all_sessions
   FROM website_event WHERE event_type = 1 AND $W;"
q "WITH ws AS (SELECT session_id, min(created_at) AS at FROM website_event WHERE event_type = 1 AND url_path ~ '^/[a-z]{2}/workspace' AND $W GROUP BY 1),
        nxt AS (SELECT DISTINCT ON (e.session_id) e.session_id, $SURF AS surface FROM website_event e JOIN ws USING (session_id)
                WHERE e.event_type = 1 AND e.created_at > ws.at AND e.url_path !~ '^/[a-z]{2}/workspace' ORDER BY e.session_id, e.created_at)
   SELECT coalesce(n.surface, '(left the site)') AS page_after_the_workspace, count(*) AS sessions
   FROM ws LEFT JOIN nxt n USING (session_id) GROUP BY 1 ORDER BY 2 DESC LIMIT 12;"
echo "-- 6. what visitors type into the search (the 40 most frequent, typed by 3 sessions or more)"
q "SELECT lower(trim(replace(substring(url_query from '(?:^|&)q=([^&]*)'), '+', ' '))) AS typed, count(DISTINCT session_id) AS sessions
   FROM website_event WHERE event_type = 1 AND url_query ~ '(^|&)q=[^&]' AND $W
   GROUP BY 1 HAVING count(DISTINCT session_id) >= 3 ORDER BY 2 DESC LIMIT 40;"

# application database — aggregate counts only, no rows, no personal data
A=$(grep -oE '^DATABASE_URL=.*' /opt/lessoncraftstudio/frontend/.env.production | cut -d= -f2- | tr -d '"' | sed 's/?.*//')
qa() { psql "$A" -P pager=off -c "$1" 2>&1 || echo "(query not available)"; }
echo "-- 7. accounts and subscriptions per week (application database, counts only; the truth the steps above are read against)"
qa "SELECT date_trunc('week', created_at)::date AS week_starting, count(*) AS new_accounts
    FROM users WHERE created_at >= date_trunc('day', now()) - interval '$DAYS days' AND created_at < date_trunc('day', now()) GROUP BY 1 ORDER BY 1;"
qa "SELECT date_trunc('week', created_at)::date AS week_starting, count(*) AS new_subscriptions
    FROM subscriptions WHERE created_at >= date_trunc('day', now()) - interval '$DAYS days' AND created_at < date_trunc('day', now()) GROUP BY 1 ORDER BY 1;"
qa "SELECT status, count(*) FROM subscriptions GROUP BY 1 ORDER BY 2 DESC;"
echo "== end =="
