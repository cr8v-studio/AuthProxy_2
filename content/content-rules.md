# AuthProxy Content Rules (MD-driven)

## Single Source Of Truth
- Source file: `LANDING-AUTHPROXY.md`.
- Normalized runtime source: `content/content-source.json`.
- If page content differs from source, source wins.

## Content Layer Contracts
- `content/content-source.json`: all section copy, lists, tables, stats, footer copy.
- `content/site-map.json`: section order, section id, active visibility.
- `content/nav-map.json`: navbar labels and anchor links for visible sections only.
- `content/cta-map.json`: centralized CTA labels, hierarchy and links.

## Rendering Rules
1. Do not hardcode important landing copy in `index.html` or JS components.
2. Render sections from `content-source.json` using `site-map.json` order.
3. Render navbar from `nav-map.json` filtered by active visible sections.
4. Render CTA buttons from `cta-map.json` (hero and closing CTA).
5. Preserve current classes and layout wrappers to keep visual style unchanged.

## Validation Rules
- Every nav `href` target must exist in rendered sections.
- Every CTA link target must exist in rendered page or be a valid URL.
- Section order must match `site-map.json`.
- Section text must match `content-source.json`.

## Sync Workflow
1. Update `LANDING-AUTHPROXY.md`.
2. Regenerate/update `content/content-source.json` from MD.
3. Update maps (`site-map.json`, `nav-map.json`, `cta-map.json`) if structure changed.
4. Reload page and run audit.
