#!/usr/bin/env python3
"""
patch-nginx-studio-limits.py — carve the Studio/player asset fan-out out of
the global per-IP bot-defense rate limit (idempotent; the
patch-nginx-pdf-noindex.py convention).

WHY: the vhost's `location /` proxies EVERYTHING to Next behind
`limit_req zone=lcsperip` (8r/s, burst=40). The storybook player boots ~30
/mini-tools/*.js files + per-page /api/play/<link>/m/* assets, and the Studio
editor streams /api/studio/* autosaves — a single legitimate preview open
blew the burst and nginx served "429 Too Many Requests" (operator-reported,
access-log verified 2026-07-06).

WHAT IT DOES (to /etc/nginx/sites-enabled/lessoncraftstudio):
  1. adds `limit_req_zone $lcs_client_ip zone=lcsasset:10m rate=50r/s;`
     right after the existing lcsperip zone line
  2. inserts three proxy locations immediately BEFORE the catch-all
     `location /` (same proxy boilerplate, no fleet-block check — these are
     app-internal asset paths, still per-IP bounded + Cloudflare-fronted):
       /mini-tools/  burst=300   (player boot: ~30 scripts + story assets)
       /api/play/    burst=300   (tokened media: scene/atlas/audio/SEP)
       /api/studio/  burst=120   (editor autosave + enumerations)

USAGE (on Hetzner, as root):
  mkdir -p /root/nginx-backups
  cp /etc/nginx/sites-enabled/lessoncraftstudio \
     "/root/nginx-backups/lessoncraftstudio.$(date -u +%Y%m%dT%H%M%SZ)"
  python3 /opt/lessoncraftstudio/scripts/studio/patch-nginx-studio-limits.py
  nginx -t && systemctl reload nginx
Re-running is a no-op once the lcsasset zone is present.
"""
import re
import sys

VHOST = '/etc/nginx/sites-enabled/lessoncraftstudio'

ZONE_LINE = 'limit_req_zone $lcs_client_ip zone=lcsasset:10m rate=50r/s;'

PROXY_BODY = """        proxy_pass http://nextjs;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
"""

def location_block(path, burst):
    return (
        '    location ' + path + ' {\n'
        '        limit_req zone=lcsasset burst=' + str(burst) + ' nodelay;\n'
        + PROXY_BODY +
        '    }\n'
    )

def main():
    with open(VHOST, 'r', encoding='utf-8') as f:
        text = f.read()

    if 'zone=lcsasset' in text:
        print('[patch-nginx-studio-limits] already applied — no-op')
        return 0

    # 1. the new zone, right after the lcsperip zone line
    m = re.search(r'^limit_req_zone \$lcs_client_ip zone=lcsperip[^\n]*\n', text, re.M)
    if not m:
        print('ERROR: lcsperip zone line not found — vhost shape changed, refusing to guess', file=sys.stderr)
        return 1
    text = text[:m.end()] + '# Studio/player asset fan-out (legit ~30-file bursts per preview boot)\n' + ZONE_LINE + '\n' + text[m.end():]

    # 2. the three locations, immediately before the bot-limited catch-all.
    #    Anchor on the unique enforcement comment inside `location /`, then
    #    walk back to that block's opening line.
    anchor = text.find('# Bot limits: enforcement')
    if anchor < 0:
        print('ERROR: bot-limits anchor comment not found — refusing to guess', file=sys.stderr)
        return 1
    open_idx = text.rfind('location / {', 0, anchor)
    if open_idx < 0:
        print('ERROR: catch-all location / not found before the anchor', file=sys.stderr)
        return 1
    line_start = text.rfind('\n', 0, open_idx) + 1

    blocks = (
        '    # Studio + storybook-player asset fan-out: generous per-IP limits\n'
        '    # (the global 8r/s bot defense below stays for everything else)\n'
        + location_block('/mini-tools/', 300)
        + location_block('/api/play/', 300)
        + location_block('/api/studio/', 120)
        + '\n'
    )
    text = text[:line_start] + blocks + text[line_start:]

    with open(VHOST, 'w', encoding='utf-8') as f:
        f.write(text)
    print('[patch-nginx-studio-limits] applied: lcsasset zone (50r/s) + /mini-tools/ (300) + /api/play/ (300) + /api/studio/ (120)')
    print('now run: nginx -t && systemctl reload nginx')
    return 0

if __name__ == '__main__':
    sys.exit(main())
