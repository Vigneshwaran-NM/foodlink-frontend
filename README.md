# FoodLink — Annam Platform Frontend

> **Rescuing surplus food at the speed of community.** A production-ready static frontend demo for the FoodLink Annam platform — connecting food donors, volunteers, and recipients across Tamil Nadu.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev
# → Opens at http://localhost:5173
```

## 🏗️ Production Build

```bash
# Build for static deployment
npm run build
# → Output in dist/

# Preview the production build locally
npm run preview
```

The `dist/` folder is fully static — deploy it to any static hosting (Vercel, Netlify, GitHub Pages, S3).

---

## 📂 Project Structure

```
FLfrontend/
├── public/
│   ├── data/
│   │   └── static.json          ← All demo data (donations, volunteers, clusters)
│   ├── icons/                   ← SVG icon assets
│   ├── bell-1s.mp3              ← Temple bell chime (replace with real file)
│   └── green-certificate-sample.pdf ← Download placeholder
├── src/
│   ├── components/
│   │   ├── Hero.tsx             ← Landing hero + phone mock
│   │   ├── Stats.tsx            ← Count-up metrics
│   │   ├── OneTapMenu.tsx       ← 4 food category tiles
│   │   ├── MissedCallFlow.tsx   ← Missed-call login stepper
│   │   ├── TempleBellDemo.tsx   ← Audio chime + notification preview
│   │   ├── KalyanaClusterMap.tsx← SVG cluster map + volunteer assignment
│   │   ├── ThaliTracker.tsx     ← Animated plate progress tracker
│   │   ├── TrustCard.tsx        ← Trust score + certificate download
│   │   ├── LiveDashboard.tsx    ← Donation list + state transitions
│   │   └── Footer.tsx
│   ├── lib/
│   │   ├── api.ts               ← Integration stubs (swap for real API here)
│   │   └── data.ts              ← Typed loader + React hook
│   ├── styles/
│   │   └── tokens.css           ← Design tokens (CSS variables)
│   └── App.tsx                  ← Root shell with navbar + modals
├── README.md
├── CHANGELOG.md
└── integration-note.md          ← Backend wiring guide
```

---

## 📦 Static Data

All demo data lives in `public/data/static.json`. The UI fetches it at runtime via `fetch('/data/static.json')`. It includes:

- **3 donations** — Meals, Liquids, Tiffin
- **1 cluster** (C-3001) — "Kalyana St Rescue Mission" consolidating all 3
- **3 volunteers** — Meena (4.8★), Ravi (4.6★), Priya (4.9★)
- **3 trust samples** — one per donor

---

## 🔌 Replacing Static Data with Real API

See `integration-note.md` for exact file + function names. The summary:

1. Set `VITE_API_BASE_URL=https://api.yourbackend.com` in `.env`
2. Edit `src/lib/api.ts` — replace `_fetchStatic()` calls with real `fetch()` calls
3. Each function is documented with the target HTTP method + path

---

## ♿ Accessibility

- All interactive elements have `aria-label` / `aria-pressed` / `aria-live`
- Full keyboard navigation; visible focus ring using `:focus-visible`
- `prefers-reduced-motion` disables all animations globally via CSS
- Color contrast meets WCAG AA (saffron on white, teal on white)

### Accessibility Testing Checklist

- [ ] Tab through all focusable elements
- [ ] Activate all buttons with Enter / Space
- [ ] Verify screen reader announces modals and live regions
- [ ] Run Lighthouse Accessibility audit → target >= 90
- [ ] Test with `prefers-reduced-motion: reduce` in DevTools

---

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#F59E0B` | CTA buttons, Saffron |
| `--color-accent` | `#0F766E` | Teal, success states |
| `--color-bg-warm` | `#FFF7ED` | Background |
| `--color-text` | `#111827` | Body text |
| `--radius` | `8px` | Default border radius |

---

## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `VITE_API_BASE_URL` | `''` (empty) | Backend base URL |

---

## Placeholder Assets

- `public/bell-1s.mp3` — Replace with actual 1-second temple bell chime audio
- `public/green-certificate-sample.pdf` — Replace with real generated PDF
- Fonts loaded from Google Fonts CDN (requires internet during dev)
