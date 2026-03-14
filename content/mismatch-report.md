# AuthProxy Landing Audit Report

Source of truth: `content/content-source.md` (copied from `LANDING-AUTHPROXY.md`).
Target: `index.html`

## MATCHED SECTIONS
- HERO SECTION
- THE PROBLEM
- HOW IT WORKS
- ADMIN PANEL — 13 PAGES
- TECHNICAL SPECIFICATIONS
- QUICK START
- FAQ
- CLOSING CTA

## MISSING SECTIONS (before sync)
- FILE SERVICE as standalone section
- REAL-TIME NOTIFICATIONS as standalone section
- FEDERATION as standalone section
- INTEGRATION as standalone section

## OUTDATED SECTIONS (before sync)
- AUTHENTICATION — condensed lists instead of MD table details
- REVERSE PROXY — incomplete copy and feature detail levels
- SECURITY — reduced table wording and compliance details
- PWA OPTIMIZATION — shortened stage/performance copy
- SOCIAL PROOF — missing explicit quality metrics list
- PRICING / AVAILABILITY — copy missing exact emphasis and wording

## TEXT MISMATCHES (before sync)
- Hero and closing CTA arrows used `->` instead of `→`
- FAQ answers deviated from MD phrasing
- Security rows lacked exact wording from MD (sessions/API/audit)
- Admin tech stack presented as one line instead of defined bullet detail

## CTA MISMATCHES (before sync)
- Hero and closing CTA labels were not exact symbol match (`->` vs `→`)

## NAVBAR MISMATCHES (before sync)
- Navbar lacked important MD sections (Proxy, Files, Notifications, Admin Panel, MCP, Docs)
- Navbar labels were less aligned with MD section names

## SYNCHRONIZATION RESULT
All listed mismatches were synchronized in `index.html` and linked through:
- `content/site-map.md`
- `content/nav-map.json`
- `content/cta-map.json`
- `content/content-rules.md`
