#!/usr/bin/env python3
"""
patch-nginx-minitools-static.py — serve /mini-tools/ statically from disk
instead of proxying to Next (idempotent; patch-nginx-studio-limits convention).

WHY: `next start` snapshots the public/ file list at SERVER BOOT. Files
written into /var/www/lcs-media/mini-tools/ while the server runs (the
storybook library manager's live uploads: characters/<id>/*, backgrounds/*,
thumbs) 404 through Next until the next pm2 restart — prod-observed
2026-07-06 (fresh card.webp on disk, world-readable, Next 404; pre-boot
files 200). Updates to files that existed at boot (manifest.json) DO serve,
which masked the class. §20.3 doctrine already says "mini-tools served by
nginx not Next" — this makes the vhost match it, mirroring the
/worksheet-generators/ alias block (2026-07-05 durable-source precedent).

WHAT IT DOES (to /etc/nginx/sites-enabled/lessoncraftstudio):
  Replaces the /mini-tools/ proxy location (inserted by
  patch-nginx-studio-limits.py) with a static alias block:
    - alias /var/www/lcs-media/mini-tools/  (the tree public/mini-tools
      symlinks to — same bytes, no snapshot layer)
    - keeps `limit_req zone=lcsasset burst=300 nodelay`
    - cache policy (the worksheet-generators split): .html + .json =
      no-cache/must-revalidate (manifest.json + atlas jsons must reflect
      library-manager writes immediately, incl. at Cloudflare); everything
      else 1h (JS is ?v= cache-busted per §A.13.42; images are id-pathed)

USAGE (on Hetzner, as root):
  mkdir -p /root/nginx-backups
  cp /etc/nginx/sites-enabled/lessoncraftstudio \
     "/root/nginx-backups/lessoncraftstudio.$(date -u +%Y%m%dT%H%M%SZ)"
  python3 /opt/lessoncraftstudio/scripts/studio/patch-nginx-minitools-static.py
  nginx -t && systemctl reload nginx
Re-running is a no-op once the alias line is present.
"""
import re
import sys

VHOST = '/etc/nginx/sites-enabled/lessoncraftstudio'

STATIC_BLOCK = """    location /mini-tools/ {
        limit_req zone=lcsasset burst=300 nodelay;
        alias /var/www/lcs-media/mini-tools/;  # LCS 2026-07-06: static from disk (next-start snapshots public/ at boot; library-manager live uploads 404d until restart)
        access_log off;

        # html + json: always revalidate (manifest/atlas must reflect
        # library-manager writes immediately); other assets 1h (?v= busted)
        set $mt_cache "public, max-age=3600";
        if ($uri ~* \\.(html|json)$) {
            set $mt_cache "no-cache, must-revalidate";
        }
        add_header Cache-Control $mt_cache;
    }
"""

def main():
    with open(VHOST, 'r', encoding='utf-8') as f:
        text = f.read()

    if 'alias /var/www/lcs-media/mini-tools/' in text:
        print('[patch-nginx-minitools-static] already applied — no-op')
        return 0

    # The proxy block patch-nginx-studio-limits.py inserted: from its opening
    # line to the first closing brace at 4-space indent.
    m = re.search(
        r'^    location /mini-tools/ \{\n(?:.*?\n)*?    \}\n',
        text, re.M,
    )
    if not m:
        print('ERROR: /mini-tools/ proxy location not found — vhost shape changed, refusing to guess', file=sys.stderr)
        return 1
    if 'proxy_pass' not in m.group(0):
        print('ERROR: matched /mini-tools/ block is not the expected proxy block, refusing to guess', file=sys.stderr)
        return 1

    text = text[:m.start()] + STATIC_BLOCK + text[m.end():]
    with open(VHOST, 'w', encoding='utf-8') as f:
        f.write(text)
    print('[patch-nginx-minitools-static] applied: /mini-tools/ now aliased to /var/www/lcs-media/mini-tools/')
    print('now run: nginx -t && systemctl reload nginx')
    return 0

if __name__ == '__main__':
    sys.exit(main())
