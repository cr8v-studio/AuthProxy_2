# AuthProxy Content Synchronization Rules

## Source Of Truth
- The file `content/content-source.md` is authoritative for landing content.
- Any mismatch between website and `content/content-source.md` must be resolved in favor of `content/content-source.md`.

## Scope Of Synchronization
- Section order
- Section IDs and anchor links
- Headlines, body copy, lists, tables
- Statistics
- CTA labels and links
- Navbar labels and targets

## Synchronization Workflow
1. Read `content/content-source.md` and parse sections in order.
2. Read `index.html` and extract:
   - `section[id]` order
   - `h1/h2/h3` text
   - list and table content
   - CTA button text + href
   - navbar items + href
3. Compare parsed structures and produce mismatch report categories:
   - MATCHED SECTIONS
   - MISSING SECTIONS
   - OUTDATED SECTIONS
   - TEXT MISMATCHES
   - CTA MISMATCHES
   - NAVBAR MISMATCHES
4. Apply updates to `index.html` first (content and structure).
5. Update `js/main.js` only if selector references or nav counts changed.
6. Keep CSS visual system intact unless layout changes are required by content.

## Non-Negotiable Rules
- Do not invent copy not present in `content/content-source.md`.
- Do not reorder sections unless MD order changed.
- Do not keep navbar links that point to missing anchors.
- Preserve existing visual identity and animation behavior.

## Validation Checklist
- All navbar anchors resolve to existing `id`s.
- Hero and closing CTA labels/links match `content/cta-map.json`.
- Every section in `content/site-map.md` exists in `index.html` in the same order.
- No removed MD section remains on page.
