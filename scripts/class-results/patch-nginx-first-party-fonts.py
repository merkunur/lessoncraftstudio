#!/usr/bin/env python3
"""
patch-nginx-first-party-fonts.py — deck pages, maker pages and activities load their fonts from THIS site.

WHY
---
Legal decision of 2026-11-14, condition E3a (docs/daily-teaching-system/legal/DECISION-2026-11-14.md): a page a child
reaches through a class link must send no request to another company. Measured the same day on 400 published deck
pages: every one names fonts.googleapis.com (a stylesheet: Fredoka, or Baloo 2 + Nunito) and fonts.gstatic.com (a
preconnect, and the font files the stylesheet points to). So do six files of the activities (mini-tools) and the
makers' play.css and shell.css. With them a child's browser tells Google its internet address on every page.

About 200,000 deck pages are published; none of them is rewritten. nginx changes what it SERVES:

1. /gf/css2?...   the stylesheet, fetched by nginx from fonts.googleapis.com with a FIXED browser name and no header of
                  the visitor (no address, no cookie, no referrer), kept 7 days, its font addresses rewritten to
   /gf/s/...      the font files, fetched the same way from fonts.gstatic.com and kept a year.
   The visitor's browser talks to this site only; Google sees this server, never the visitor.
2. In what is served for a deck page, an activity file or a maker stylesheet, the two Google addresses are replaced:
       https://fonts.googleapis.com/css2   ->  /gf/css2
       https://fonts.gstatic.com           ->  https://www.lessoncraftstudio.com      (the preconnect hint)
       href="https://fonts.googleapis.com" ->  href="https://www.lessoncraftstudio.com"
   The makers' stylesheets get a location of their own, because their folders are served with gzip_static and a
   ready-compressed file cannot be rewritten.

If Google cannot be reached and nothing is kept yet, the page shows in the device's own font; nothing else breaks.

Idempotent (every line this script adds carries the tag below; a second run removes and re-adds them); backup to
/root/nginx-backups/; `nginx -t` before reload, both files restored on failure.

    python3 scripts/class-results/patch-nginx-first-party-fonts.py [--dry-run]
"""
import os
import re
import sys
import time
import shutil
import subprocess

CONF = "/etc/nginx/sites-enabled/lessoncraftstudio"
CACHE_CONF = "/etc/nginx/conf.d/lcs-fonts-cache.conf"
CACHE_DIR = "/var/cache/nginx/lcs-fonts"
BACKUP_DIR = "/root/nginx-backups"
MARKER = "# First-party fonts (2026-11-14)"
END = "# First-party fonts: end"
TAG = "# lcs-first-party-fonts"
DRY = "--dry-run" in sys.argv
MAIN_LOC_RE = re.compile(r"^\s*location\s+/\s*\{")
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

CACHE = """# Managed by scripts/class-results/patch-nginx-first-party-fonts.py — do not hand-edit.
proxy_cache_path %s levels=1:2 keys_zone=lcsfonts:10m max_size=300m inactive=400d use_temp_path=off;
""" % CACHE_DIR

BLOCK = """    {marker}
    location ^~ /gf/css2 {{
        access_log off;
        proxy_pass https://fonts.googleapis.com/css2;
        proxy_ssl_server_name on;
        proxy_pass_request_headers off;
        proxy_set_header Host fonts.googleapis.com;
        proxy_set_header User-Agent "{ua}";
        proxy_cache lcsfonts;
        proxy_cache_key "css$is_args$args";
        proxy_cache_valid 200 7d;
        proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
        proxy_ignore_headers Set-Cookie Cache-Control Expires Vary;
        proxy_hide_header Set-Cookie;
        proxy_hide_header Link;
        sub_filter 'https://fonts.gstatic.com/' '/gf/s/';
        sub_filter_once off;
        sub_filter_types text/css;
        add_header Cache-Control "public, max-age=86400";
        add_header X-Robots-Tag "noindex" always;
        add_header X-Content-Type-Options nosniff;
    }}
    location ^~ /gf/s/ {{
        access_log off;
        proxy_pass https://fonts.gstatic.com/;
        proxy_ssl_server_name on;
        proxy_pass_request_headers off;
        proxy_set_header Host fonts.gstatic.com;
        proxy_cache lcsfonts;
        proxy_cache_key "font$uri";
        proxy_cache_valid 200 365d;
        proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
        proxy_ignore_headers Set-Cookie Cache-Control Expires Vary;
        proxy_hide_header Set-Cookie;
        add_header Cache-Control "public, max-age=31536000, immutable";
        add_header Access-Control-Allow-Origin "*";
        add_header X-Robots-Tag "noindex" always;
        add_header X-Content-Type-Options nosniff;
    }}
    {end}

""".format(marker=MARKER, end=END, ua=UA)

# The makers' stylesheets: nginx takes the FIRST regex location that matches, in the order of the file, so this one
# stands right before the makers' own (which serves ready-compressed files that cannot be rewritten).
MARKER2 = "# First-party fonts, the makers' stylesheets (2026-11-14)"
END2 = "# First-party fonts, makers: end"
BLOCK2 = """    {marker}
    location ~ "^/makers/.+\\.css$" {{
        root /var/www/lcs-media;
        sub_filter 'https://fonts.googleapis.com/css2' '/gf/css2';
        sub_filter_once off;
        sub_filter_types text/css;
        add_header Cache-Control "public, max-age=86400";
        add_header X-Robots-Tag "noindex" always;
        add_header X-Content-Type-Options nosniff;
    }}
    {end}
""".format(marker=MARKER2, end=END2)
MAKERS_LOC_RE = re.compile(r'^\s*location ~ "\^/makers/')

FILTER = [
    "        sub_filter 'https://fonts.googleapis.com/css2' '/gf/css2';  " + TAG,
    "        sub_filter 'https://fonts.gstatic.com' 'https://www.lessoncraftstudio.com';  " + TAG,
    "        sub_filter 'href=\"https://fonts.googleapis.com\"' 'href=\"https://www.lessoncraftstudio.com\"';  " + TAG,
    "        sub_filter_once off;  " + TAG,
]
# the locations whose served text names the two addresses: the deck page, and the activities' files
DECK_LOC_RE = re.compile(r"^\s*location ~ \^/\(en\|de\|fr\|es\|pt\|it\|nl\|sv\|da\|no\|fi\)/decks/\(\.\+\?\)/\$ \{\s*$")
MINI_LOC_RE = re.compile(r"^\s*location /mini-tools/ \{\s*$")


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


def main():
    if not os.path.exists(CONF):
        print("FATAL: nginx config not found at " + CONF)
        return 1
    with open(CONF, encoding="utf-8") as f:
        original = f.read()
    text = original
    if MARKER in text:
        text = re.sub(re.escape("    " + MARKER) + r".*?" + re.escape(END) + r"\n\n?", "", text, flags=re.S)
    if MARKER2 in text:
        text = re.sub(re.escape("    " + MARKER2) + r".*?" + re.escape(END2) + r"\n", "", text, flags=re.S)
    lines = [l for l in text.split("\n") if not l.rstrip().endswith(TAG)]
    out, main_n, deck_n, mini_n, makers_n = [], 0, 0, 0, 0
    for line in lines:
        if MAKERS_LOC_RE.match(line) and not makers_n:
            out.append(BLOCK2.rstrip("\n"))
            makers_n += 1
        if MAIN_LOC_RE.match(line):
            out.append(BLOCK.rstrip("\n"))
            out.append("")
            main_n += 1
        out.append(line)
        if DECK_LOC_RE.match(line):
            out.extend(FILTER)
            deck_n += 1
        elif MINI_LOC_RE.match(line):
            out.extend(FILTER)
            out.append("        sub_filter_types text/css;  " + TAG)
            mini_n += 1
    if not main_n or not deck_n or not mini_n or not makers_n:
        print("FATAL: not every place was found (location /: %d, the deck page: %d, /mini-tools/: %d, the makers' location: %d)" % (main_n, deck_n, mini_n, makers_n))
        return 1
    new = "\n".join(out)
    if DRY:
        print(BLOCK)
        print(BLOCK2)
        print("\n".join(FILTER))
        print("dry run: block before %d `location /`, filter in %d deck location(s) and %d /mini-tools/ location(s)" % (main_n, deck_n, mini_n))
        return 0
    os.makedirs(BACKUP_DIR, exist_ok=True)
    os.makedirs(CACHE_DIR, exist_ok=True)
    run(["chown", "-R", "www-data:www-data", CACHE_DIR])
    backup = os.path.join(BACKUP_DIR, "lessoncraftstudio.%s.bak" % time.strftime("%Y%m%dT%H%M%SZ", time.gmtime()))
    shutil.copy2(CONF, backup)
    had = os.path.exists(CACHE_CONF)
    old = open(CACHE_CONF, encoding="utf-8").read() if had else None
    with open(CACHE_CONF, "w", encoding="utf-8") as f:
        f.write(CACHE)
    with open(CONF, "w", encoding="utf-8") as f:
        f.write(new)

    def restore():
        shutil.copy2(backup, CONF)
        if had:
            with open(CACHE_CONF, "w", encoding="utf-8") as f2:
                f2.write(old)
        else:
            os.remove(CACHE_CONF)

    t = run(["nginx", "-t"])
    if t.returncode != 0:
        restore()
        print("FATAL: nginx -t failed, both files restored\n" + t.stderr)
        return 1
    r = run(["systemctl", "reload", "nginx"])
    if r.returncode != 0:
        restore()
        run(["systemctl", "reload", "nginx"])
        print("FATAL: reload failed, both files restored\n" + r.stderr)
        return 1
    print("backup -> " + backup)
    print("installed + reloaded: the fonts block, the filter in %d deck location(s) and %d /mini-tools/ location(s)." % (deck_n, mini_n))
    return 0


if __name__ == "__main__":
    sys.exit(main())
