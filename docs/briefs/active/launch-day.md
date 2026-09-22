# Brief — Launch day: share cards, favicon, analytics, contact and legal links

**Repo:** `nza-hq/nza-website` · **Mode:** Product · **Author:** Claude Chat, 22 Sep 2026
**Revision:** R03 (supersedes R01/R02, withdrawn). **Runs after:** mobile-load work.

Landed on disk by Co-Work. Full source: `~/Downloads/brief-launch-day-r03.md`. This is the
working copy; decisions and verification below are authoritative.

## Goal
Make the site presentable and measurable before launch: real share cards, NZA's own favicon,
working analytics, the correct contact address, no links to pages that do not exist.

## Design decisions (agreed)
1. One shared OG tag set in `index.html` (SPA rewrite serves it on every route). **No per-route
   tags, no `<link rel="canonical">`** (a single canonical would make every route a "duplicate").
2. Share card + favicon built here from the locked design tokens (navy `#0E1120`, cream
   `#F5F1E8`, coral `#F75A55`; Stolzl Book + DM Serif Display italic).
3. Canonical domain `https://netzeroadvisory.uk` (apex). All meta URLs absolute.
4. Analytics via the **`@vercel/analytics` package** (v2+, Resilient Intake) — agent edits
   `package.json` only; **Chris runs `npm install --force`**. Web Analytics already enabled in the
   Vercel dashboard.
5. Contact address = `info@netzeroadvisory.uk` everywhere (done in earlier work).
6. `/terms` + `/cookies` links removed; `/privacy` link kept with a placeholder page (no policy
   content — being drafted separately).
7. Stub routes `/about` and `/clients` stay live; only their nav links go.
8. Crawlers do not run JS — meta lives in `index.html`, never in a React component. No
   react-helmet, no prerender. Do not touch `vercel.json` (escalate if the rewrite eats analytics).

## Parts
1. Land brief; repoint `current.md`. Commit `docs: land launch-day brief R03`.
2. Assets from the design tokens: `public/og-default.png` (1200×630, <150KB; master SVG at
   `docs/assets/og-default.svg`) + favicon set (`favicon.svg`, `favicon-32.png`,
   `apple-touch-icon.png` 180×180 solid ground). Commit `feat: NZA share card and favicon set`.
3. Meta in `index.html` (after `<title>`, before splash `<style>`): description + 10 `og:` lines +
   4 `twitter:` lines; title → `Net Zero Advisory — specialists in buildings, energy and climate`.
   Commit `feat: open graph, twitter card and meta description`.
4. Remove `/about` + `/clients` nav links (routes stay). Commit `chore: unlink about and clients`.
5. Contact → `info@netzeroadvisory.uk`, subjects preserved. Commit `chore: point contact links…`.
6. Footer: remove `/terms` + `/cookies`; keep `/privacy`; add a minimal `/privacy` placeholder
   route ("Privacy notice — coming shortly. Contact info@netzeroadvisory.uk."). Commit
   `chore: prune dead legal links, add privacy placeholder`.
7. `@vercel/analytics` in `package.json` + `<Analytics />` at app root. **Do not install** — Chris
   does. Verify: script is 200 **and** javascript content-type **and** body not HTML; a real page
   view lands in the dashboard. Commit `feat: add @vercel/analytics dependency and component`.
8. Verify + close. `npm run build` clean; note in STATUS that OG is one shared set (not per-route).
   Archive to `docs/briefs/archive/launch-day_COMPLETED.md`. Commit `close: launch-day complete`.

## Verification (falsifiable)
- `grep -c 'og:' index.html` = 10; `grep -c 'twitter:' index.html` = 4; one `<meta name=description>`;
  no canonical; every og/twitter image absolute `https://netzeroadvisory.uk/...`.
- `og-default.png` exactly 1200×630, <150KB. No `#863bff` in `public/`. Favicon legible at 16px.
- `grep -n 'to="/about"\|to="/clients"' src/components/SiteNav.tsx` = 0; routes still resolve.
- `grep -rn "thenza.co.uk" src/ index.html` = 0. `/terms`+`/cookies` unlinked; `/privacy` real page.
- `@vercel/analytics` v2+ in deps; one `<Analytics />`; script serves real JS; dashboard shows a hit.
- Build clean; splash block unchanged by this brief; `vercel.json` unchanged.

## Independent review
Analytics only — a "200 that is really HTML" is the failure this brief exists to catch. Claude Chat
checks the three-part evidence + dashboard page view before close.

## Do not
Add canonical/react-helmet/prerender; set meta from React; relative og:image; run `npm install`;
edit `vercel.json` (escalate); delete `/about` or `/clients` routes; remove `/expertise` or
`/approach` links; write privacy policy content; touch fonts or the preloader.
