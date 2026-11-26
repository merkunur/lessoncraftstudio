#!/usr/bin/env python3
"""
Where Google's crawl goes, from the nginx logs (READ-ONLY; runs on Hetzner).

Written 2026-11-26 for the indexed-pages analysis (Search Console: indexed 41,509 -> 35,227 between
20 Oct and 17 Nov). It answers, for the 14 days of logs nginx keeps:
  1. verified Googlebot requests per day, by page family and by status class;
  2. how many of the sitemap's URLs Googlebot fetched at least once, per shard;
  3. how much of the crawl went to URLs that are NOT in the sitemap, and of the deck pages among them,
     how many are noindex Level Set / year copies vs. landing-backed decks;
  4. Google-referred page views (people, Referer google.*) per day by page family — the traffic check.

Re-run it after any change meant to move the crawl (the 2026-11-26 baseline: 43 % of Googlebot requests on
noindex decks, ~33 % on sitemap URLs, ~21,000 of 56,090 sitemap URLs fetched in 14 days).

"Verified" = the client IP (CF-Connecting-IP, the first log field) is in Google's crawler ranges 66.249.*
or 192.178.*; a Googlebot User-Agent from anywhere else is counted separately as unverified.

Usage:  python3 scripts/seo/googlebot-crawl-report.py [--days=14] [--logs=/var/log/nginx/access.log*]
"""
import collections
import glob
import gzip
import os
import re
import subprocess
import sys

ARGS = dict(a[2:].split("=", 1) for a in sys.argv[1:] if a.startswith("--") and "=" in a)
LOG_GLOB = ARGS.get("logs", "/var/log/nginx/access.log*")
DECKS = "/var/www/lcs-media/decks"
HOST = "www.lessoncraftstudio.com"
GOOGLE_IP = ("66.249.", "192.178.")

LINE = re.compile(r'^(\S+) \S+ - \S+ \[(\d+)/(\w+)/(\d+):[^\]]+\] "(\S+) (\S+) [^"]*" (\d{3}) \d+ "([^"]*)" "([^"]*)"')
LOC = r"(en|de|fr|es|pt|it|nl|sv|da|no|fi)"
MONTHS = {m: i for i, m in enumerate("Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(), 1)}


def family(path):
    p = path.split("?")[0]
    if p.startswith("/sitemap") or p == "/robots.txt":
        return "sitemap/robots"
    if "?" in path:
        return "query-string"
    m = re.match(r"^/" + LOC + r"(/[^/]*)?", p)
    if not m:
        return "_next" if p.startswith("/_next") else "other"
    seg = (m.group(2) or "/").strip("/")
    if seg == "decks":
        return "deck-file" if re.search(r"\.(pdf|png|jpg|webp)$", p) else "deck-page"
    if seg == "worksheets":
        if re.match(r"^/\w\w/worksheets/sets/", p):
            return "worksheets/sets"
        return "worksheets-hub" if re.match(r"^/\w\w/worksheets/?$", p) else "landing"
    return seg or "locale-root"


def sitemap_urls():
    """{path-without-trailing-slash: shard} from the live sitemap, through nginx on this host."""
    urls = {}
    for n in range(64):
        r = subprocess.run(["curl", "-s", "--compressed", "--max-time", "180", "--resolve", f"{HOST}:443:127.0.0.1",
                            "-w", "\n%{http_code}", f"https://{HOST}/sitemap/{n}.xml"], capture_output=True, text=True)
        body, _, code = r.stdout.rpartition("\n")
        if code != "200":
            break
        for loc in re.findall(r"<url>\s*<loc>([^<]+)</loc>", body):
            urls[loc.replace("https://" + HOST, "").rstrip("/")] = n
    return urls


def deck_kind(loc, slug, cache={}):
    key = (loc, slug)
    if key not in cache:
        try:
            with open(os.path.join(DECKS, loc, slug, "deck.html"), "rb") as fh:
                head = fh.read(20000).decode("utf-8", "replace")
            if re.search(r'<meta[^>]+name=["\']robots["\'][^>]+noindex', head):
                cache[key] = "noindex copy (Level Set / year page)"
            elif re.search(r'rel=["\']canonical["\'][^>]+/worksheets/', head):
                cache[key] = "landing-backed (canonical -> landing)"
            else:
                cache[key] = "self-canonical, not in sitemap"
        except OSError:
            cache[key] = "no file"
    return cache[key]


def main():
    sm = sitemap_urls()
    if len(sm) < 40000:
        print(f"COULD NOT MEASURE: the sitemap read gave {len(sm)} URLs")
        sys.exit(3)
    shard_size = collections.Counter(sm.values())

    per_day = collections.defaultdict(collections.Counter)
    status_day = collections.defaultdict(collections.Counter)
    crawled = collections.defaultdict(set)
    on_sitemap = off_sitemap = unverified = 0
    off_kind = collections.Counter()
    deck_kinds = collections.Counter()
    deck_unique = collections.defaultdict(set)
    people = collections.defaultdict(collections.Counter)

    files = sorted(glob.glob(LOG_GLOB))
    for f in files:
        opener = gzip.open if f.endswith(".gz") else open
        with opener(f, "rt", errors="replace") as fh:
            for line in fh:
                is_bot = "Googlebot" in line
                if not is_bot and "google." not in line:
                    continue
                m = LINE.match(line)
                if not m:
                    continue
                ip, d, mon, y, meth, path, status, ref, ua = m.groups()
                day = f"{y}-{MONTHS.get(mon, 0):02d}-{int(d):02d}"
                if is_bot:
                    if not ip.startswith(GOOGLE_IP):
                        unverified += 1
                        continue
                    fam = family(path)
                    per_day[day][fam] += 1
                    status_day[day][status[0] + "xx"] += 1
                    base = path.split("?")[0].rstrip("/")
                    if base in sm and "?" not in path:
                        on_sitemap += 1
                        crawled[sm[base]].add(base)
                        continue
                    off_sitemap += 1
                    off_kind[fam] += 1
                    dm = re.match(r"^/" + LOC + r"/decks/([^/]+)$", base)
                    if dm and status == "200":
                        k = deck_kind(dm.group(1), dm.group(2))
                        deck_kinds[k] += 1
                        deck_unique[k].add(base)
                elif re.match(r"https?://(www\.)?google\.", ref) and "bot" not in ua.lower() and status == "200" \
                        and meth == "GET" and not re.search(r"\.(js|css|png|webp|jpg|pdf|woff2?|json|ico)(\?|$)", path) \
                        and not path.startswith(("/_next", "/api")):
                    people[day][family(path)] += 1

    days = sorted(per_day)
    fams = ["landing", "deck-page", "topic", "activities", "tools", "worksheet-makers", "worksheets/sets", "query-string", "sitemap/robots"]
    print(f"Logs: {len(files)} files, {days[0] if days else '-'} .. {days[-1] if days else '-'}; sitemap {len(sm)} URLs in {len(shard_size)} shards\n")
    print("1. Verified Googlebot requests per day")
    print("day        total " + " ".join(f[:10].rjust(10) for f in fams) + "   other   2xx   3xx   4xx   5xx")
    for d in days:
        c = per_day[d]
        other = sum(v for k, v in c.items() if k not in fams)
        s = status_day[d]
        print(f"{d} {sum(c.values()):6d} " + " ".join(str(c[f]).rjust(10) for f in fams)
              + f" {other:7d} {s['2xx']:5d} {s['3xx']:5d} {s['4xx']:5d} {s['5xx']:5d}")
    total = on_sitemap + off_sitemap
    print(f"\n   unverified 'Googlebot' User-Agents (not Google IPs): {unverified}")
    print(f"\n2. Sitemap coverage: requests on sitemap URLs {on_sitemap} of {total} ({100 * on_sitemap / max(total, 1):.0f} %)")
    for n in sorted(shard_size):
        print(f"   shard {n:2d}: {len(crawled[n]):6d} of {shard_size[n]:6d} URLs fetched at least once")
    print(f"   all shards: {sum(len(v) for v in crawled.values())} of {len(sm)}")
    print(f"\n3. Requests on URLs NOT in the sitemap: {off_sitemap} ({100 * off_sitemap / max(total, 1):.0f} %)")
    for k, v in off_kind.most_common(12):
        print(f"   {v:7d}  {k}")
    print("   deck pages among them (200), by kind:")
    for k, v in deck_kinds.most_common():
        print(f"   {v:7d} requests, {len(deck_unique[k]):6d} different pages  {k}")
    print("\n4. Google-referred page views (people) per day")
    pf = ["topic", "landing", "deck-page", "tools", "activities", "worksheet-makers", "locale-root"]
    print("day        " + " ".join(f[:10].rjust(10) for f in pf) + "   total")
    for d in sorted(people):
        c = people[d]
        print(d + " " + " ".join(str(c[f]).rjust(10) for f in pf) + f" {sum(c.values()):7d}")


if __name__ == "__main__":
    main()
