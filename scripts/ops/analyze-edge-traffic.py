#!/usr/bin/env python3
"""
analyze-edge-traffic.py — who is visiting: real people vs scraper fleets, from the nginx log.

WHY (2026-11-26): Cloudflare rules must be written from measurements, never from guesses, and must
cost real visitors nothing (memory: feedback_real_users_never_pay_for_scrapers). The proxy for "real
people" is a page view that arrives from a search engine (Referer google/bing/duckduckgo/...). Any
proposed rule is tested by asking how many of THOSE it would have caught.

Runs ON Hetzner (read-only), over one lcs_seo access log (plain or .gz):
    python3 analyze-edge-traffic.py /var/log/nginx/access.log.1
    python3 analyze-edge-traffic.py /var/log/nginx/access.log.1 --fleet     # + country/ASN comparison

Reports:
  1. traffic classes (deck pages, landings, hub filters, _rsc, images, API, ...) x requests / IPs / bot share
  2. IPs by request count (the fleets use 1-20 requests per IP)
  3. search-referred page views: how many, and how many lack Sec-Fetch-Mode (the cost of the
     "page requests without browser fetch headers" Cloudflare rule)
  4. non-bot page views without Sec-Fetch-Mode (what that rule catches)
  5. --fleet: country and ASN of search-referred people vs the fleet signature (non-bot page views,
     no Referer, from IPs with <= 20 requests that day). Needs the co= as= fields
     (scripts/publish-cli/patch-nginx-log-geo.py + the Cloudflare x-lcs-asn transform rule).
     For every ASN/country the fleet uses, it prints how many search visitors came from it — the
     false-positive count a challenge on that ASN/country would have cost that day.
"""
import collections
import gzip
import re
import sys

LINE = re.compile(r'^(\S+) (\S+) - \S+ \[([^\]]+)\] "(\S+) (\S+)[^"]*" (\d{3}) (\d+) "([^"]*)" "([^"]*)" '
                  r'cf=(\S*) cc=(\S*) rt=(\S*)(?: sf=(\S*) sd=(\S*) al="([^"]*)")?(?: co=(\S*) as=(\S*))?')
BOTS = re.compile(r'(?i)bot|crawl|spider|slurp|facebookexternalhit|meta-externalagent|lcs-|curl|python|go-http|wget|headless')
SEARCH = re.compile(r'(?i)https?://([a-z0-9-]+\.)*(google|bing|duckduckgo|ecosia|yahoo|qwant|qwantjunior|startpage|yandex|brave|seznam|kagi)\.')
PAGE = re.compile(r'^/([a-z]{2})(/|$)')
ASSET = re.compile(r'\.(pdf|png|jpe?g|webp|avif|gif|svg|ico|js|css|json|xml|txt|woff2?|html)$')


def cls(url):
    path, _, qs = url.partition('?')
    if '_rsc=' in qs:
        return 'rsc'
    if path.startswith('/_next/image'):
        return 'next-image'
    if path.startswith('/_next/'):
        return 'next-static'
    if path.startswith('/api/'):
        parts = path.split('/')
        return 'api:' + parts[2] if len(parts) > 2 else 'api'
    if re.match(r'^/[a-z]{2}/decks/', path):
        return 'deck-pdf' if path.endswith('.pdf') else ('deck-img' if ASSET.search(path) else 'deck-page')
    if re.match(r'^/[a-z]{2}/worksheets/?$', path):
        return 'hub-q' if qs else 'hub'
    if re.match(r'^/[a-z]{2}/worksheets/', path):
        return 'landing'
    if '/topic/' in path:
        return 'topic-q' if qs else 'topic'
    if '/activities' in path:
        return 'activities-q' if qs else 'activities'
    if '/worksheet-makers' in path or path.startswith('/makers'):
        return 'makers'
    if path.startswith('/mini-tools'):
        return 'mini-tools'
    if re.match(r'^/[a-z]{2}/?$', path):
        return 'locale-root'
    return 'other'


def top(c, n=10):
    return ', '.join('%s:%d' % kv for kv in c.most_common(n))


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    path = sys.argv[1]
    fleet_mode = '--fleet' in sys.argv
    op = gzip.open if path.endswith('.gz') else open
    rows = []
    ipn = collections.Counter()
    bad = 0
    for ln in op(path, 'rt', errors='replace'):
        m = LINE.match(ln)
        if not m:
            bad += 1
            continue
        ip, ra, t, meth, url, st, b, ref, ua, ray, cc, rt, sf, sd, al, co, asn = m.groups()
        if ip == '-':      # not through Cloudflare (on-server checks via 127.0.0.1)
            continue
        ipn[ip] += 1
        rows.append((ip, meth, url, st, int(b), ref, ua, sf or '-', sd or '-', co or '-', asn or '-'))

    print('%s: %d requests through Cloudflare, %d unique IPs, %d unparsed lines' % (path, len(rows), len(ipn), bad))

    # 1. classes
    by = collections.defaultdict(lambda: [0, set(), 0, 0])
    for ip, meth, url, st, b, ref, ua, sf, sd, co, asn in rows:
        d = by[cls(url)]
        d[0] += 1
        d[1].add(ip)
        d[2] += b
        d[3] += 1 if BOTS.search(ua) else 0
    print('\n1. traffic classes\n   %-14s %8s %7s %7s %6s' % ('class', 'reqs', 'IPs', 'MB', 'bot%'))
    for k, d in sorted(by.items(), key=lambda kv: -kv[1][0])[:22]:
        print('   %-14s %8d %7d %7d %5.1f%%' % (k, d[0], len(d[1]), d[2] // 1048576, 100.0 * d[3] / d[0]))

    # 2. IPs by request count
    h = collections.Counter()
    for ip, n in ipn.items():
        k = '1' if n == 1 else '2' if n == 2 else '3-5' if n <= 5 else '6-20' if n <= 20 else '21-100' if n <= 100 else '>100'
        h[k] += 1
        h['r' + k] += n
    print('\n2. IPs by request count')
    for k in ['1', '2', '3-5', '6-20', '21-100', '>100']:
        print('   %-7s IPs %7d  requests %8d' % (k, h[k], h['r' + k]))

    # 3 + 4. page views and Sec-Fetch-Mode
    human = []
    nosf = collections.Counter()
    nosf_n = 0
    for r in rows:
        ip, meth, url, st, b, ref, ua, sf, sd, co, asn = r
        p = url.split('?')[0]
        if meth != 'GET' or '_rsc=' in url or not PAGE.match(p) or ASSET.search(p) or BOTS.search(ua):
            continue
        if SEARCH.match(ref or ''):
            human.append(r)
        elif sf == '-':
            nosf_n += 1
            fam = ('Safari' if 'Safari' in ua and 'Chrome' not in ua else 'Firefox' if 'Firefox' in ua
                   else 'Chrome/Edge' if 'Chrome' in ua else ua[:30])
            nosf[fam] += 1
    hs = collections.Counter(r[7] for r in human)
    print('\n3. search-referred page views (proxy for real people): %d' % len(human))
    print('   Sec-Fetch-Mode: ' + top(hs, 5))
    print('   without it (would be challenged): %d' % hs['-'])
    print('\n4. other non-bot page views WITHOUT Sec-Fetch-Mode (what that rule catches): %d  [%s]' % (nosf_n, top(nosf, 5)))

    # 5. fleet vs people by country / ASN
    if fleet_mode:
        hc = collections.Counter(r[9] for r in human)
        ha = collections.Counter(r[10] for r in human)
        fc, fa = collections.Counter(), collections.Counter()
        for r in rows:
            ip, meth, url, st, b, ref, ua, sf, sd, co, asn = r
            p = url.split('?')[0]
            if meth != 'GET' or '_rsc=' in url or not PAGE.match(p) or ASSET.search(p) or BOTS.search(ua):
                continue
            if ref in ('-', '') and ipn[ip] <= 20:
                fc[co] += 1
                fa[asn] += 1
        known = sum(n for k, n in fa.items() if k != '-')
        print('\n5. fleet signature (non-bot page views, no Referer, IP <= 20 requests): %d page views, ASN known for %d' % (sum(fc.values()), known))
        print('   %-10s %9s %9s   (search visitors from it = the false positives a challenge would cost)' % ('country', 'fleet', 'search'))
        for k, n in fc.most_common(20):
            print('   %-10s %9d %9d' % (k, n, hc[k]))
        print('   %-10s %9s %9s' % ('ASN', 'fleet', 'search'))
        for k, n in fa.most_common(30):
            print('   %-10s %9d %9d' % (k, n, ha[k]))


if __name__ == '__main__':
    main()
