const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',

  // Increase static-page generation timeout. Default 60s is insufficient for
  // sitemap/2.xml (2-axis intersection shard) at non-trivial catalog scale —
  // intersection enumeration runs N²+N DB queries per axis-pair × N locales.
  // Surfaced at 1018-ES-deck wave (native-language-slug commission 2026-05-11).
  // Future scaling-arc commission may refactor sitemap/2.xml to batch queries
  // OR convert to runtime-only route per §A.14.7.
  staticPageGenerationTimeout: 300,

  // Run ESLint only on source directories — NOT on public/ which contains
  // symlinks to /var/www/lcs-media (worksheet-generators, admin) with large HTML files
  eslint: {
    dirs: ['app', 'components', 'lib', 'config', 'i18n', 'hooks', 'types', 'utils'],
  },

  // SEO FIX: Normalize all URLs to no trailing slash
  // Prevents duplicate URLs like /en/apps/addition-worksheets and /en/apps/addition-worksheets/
  trailingSlash: false,

  images: {
    domains: ['localhost', 'lessoncraftstudio.com', 'www.lessoncraftstudio.com'],
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
  },

  // Increase file upload size limit
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    // 2026-07-05 build incident: a truly-cold `next build` of this app needs >51GB heap
    // (an app-graph property — reproduced across Node 18 AND 22, warm caches hide it).
    // webpackBuildWorker runs the compile in a worker process (keeps the main process
    // light; NOTE: killing a build must also kill the jest-worker processChild).
    // (webpackMemoryOptimizations was tried and REMOVED — not supported by Next 14.2.18,
    // "Unrecognized key"; it exists only in later Next versions.)
    webpackBuildWorker: true,
    // 2026-07-06 THE named build-killer: @vercel/nft output-file-tracing died with
    // "RangeError: Too many elements passed to Promise.all" (build #11, Node 22 — the
    // first build to SURFACE the error instead of silently OOMing). nft statically
    // follows landing-content.ts's fs.readFileSync candidates (incl. the absolute
    // /opt/lessoncraftstudio fallback) and tries to inventory the 93MB seo-landing JSON
    // + the symlinked media trees (image library, 28k deck dirs, 30k static landings)
    // → millions of trace jobs → 50GB/hours/OOM. Standalone does NOT need any of these
    // traced: the runtime fs-loader reads from the git checkout via its absolute path,
    // and nginx serves all media/public trees directly (deploy.sh copies public/ itself).
    outputFileTracingExcludes: {
      '*': [
        'content/seo-landing/**',
        'public/**',
        '.next/**',
        'node_modules/@swc/core-linux-x64-gnu/**',
        'node_modules/@swc/core-linux-x64-musl/**',
      ],
    },
    // 2026-07-06 the excludes above filter AFTER nft's walk — they cannot stop the walk
    // itself from exploding. outputFileTracingRoot DOES bound the walk: any file whose
    // real path resolves OUTSIDE this root is pruned. This cuts (a) the public/ symlinks
    // that resolve into /var/www/lcs-media on the server (~300k files: 28k deck dirs,
    // 30k static landings, image libraries — broken symlinks on the PC, which is exactly
    // why the PC traced fine), and (b) the repo-root fs candidates in lib/studio
    // (process.cwd()/.. -> /opt/lessoncraftstudio/**). Runtime is unaffected: those
    // paths are read via fs at request time from the live filesystem, never from the
    // standalone bundle.
    outputFileTracingRoot: __dirname,
  },

  // Security Headers for Production
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
      {
        // SEO 2026-06-20: the mini-tool engine HTML (`/mini-tools/<engine>-activity.html`,
        // manipulatives, etc.) is loaded ONLY inside same-origin iframes on the
        // `/[locale]/activities/<slug>` + `/[locale]/tools/<slug>` pages — those Next
        // routes are the canonical, fully-indexed ranking surfaces. The engine files
        // are thin embedded widgets with a static English <title> regardless of
        // ?lang, and are reachable standalone (200, crawlable). Keep them OUT of the
        // index so they don't surface as thin/wrong-language pages; the host page
        // ranks. (Textbook iframe-widget treatment; opposite of the deck PDFs, which
        // are standalone content and stay indexable.)
        source: '/mini-tools/:path*.html',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex'
          },
        ],
      },
    ];
  },

  // ALL redirects are handled in middleware.ts for O(1) Map lookups.
  // /worksheet-generators/* is served directly by nginx and bypasses
  // Next.js entirely, so adding redirects here for that subtree has no
  // effect — internal links use the spaced filenames verbatim
  // (percent-encoded at emission).
  async redirects() {
    return [];
  },
};

module.exports = withNextIntl(nextConfig);