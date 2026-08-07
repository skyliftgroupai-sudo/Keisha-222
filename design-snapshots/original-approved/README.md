# Design Snapshots — Original Approved Baseline

This folder documents the **MAISON — APPROVED BASELINE — ORIGINAL DESIGN**
visually. It accompanies the Git tag `approved-baseline-original-design`
(commit `44a4244`).

## Textual snapshots (committed)

Because pixel screenshots could not be captured in the automation environment
(the headless browser pane was not compositing frames), the current design is
documented here as **textual content/structure snapshots**, which capture the
exact copy, product data, pricing, and section order of the approved design:

- `homepage.snapshot.txt`
- `admin-dashboard.snapshot.txt`

These are a faithful record of what each screen renders in the approved build.

## Capturing pixel screenshots (recommended, ~5 minutes)

To add true images to this folder, run the site and screenshot each route at
three widths (**1440**, **768**, **390** px). Save them here using the naming
convention `‹route›@‹width›.png` (e.g. `home@1440.png`, `pdp@390.png`).

Run the site:

```bash
npm install
npm run dev
```

Then capture these routes:

| Screen | URL |
|---|---|
| Home | `/` |
| Shop (filters/sort) | `/shop` |
| Product detail | `/products/signature-wool-coat` |
| Collections | `/collections` |
| Collection detail | `/collections/autumn-atelier` |
| Cart | `/cart` |
| Checkout | `/checkout` |
| About / Brand story | `/about` · `/story` |
| Search overlay | `/` then click the search icon |
| Mobile menu | `/` at 390px then tap the hamburger |
| Admin | `/admin` and its sub-pages |

Tip (Chrome DevTools): open the device toolbar (Ctrl/Cmd+Shift+M), set the
width, then run **"Capture full size screenshot"** from the command menu
(Ctrl/Cmd+Shift+P).

> These images are documentation only — regenerating them does not change the
> approved code, which is preserved by the Git tag and bundle.
