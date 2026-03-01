# Changelog

All notable changes to FoodLink Annam Frontend will be documented in this file.

## [1.0.0] - 2026-03-01

### Added
- Initial static frontend demo release for FoodLink Annam platform
- Hero section with dual-column layout, phone mock showing Thali Tracker
- Stats section with animated count-up metrics from `static.json`
- One-Tap Visual Menu with 4 category tiles (Meals, Tiffin, Sweets, Liquids) with Tamil labels
- Missed-Call Login flow: 3-step animated stepper + `localStorage` session + OTP fallback
- Temple Bell Notification demo with audio play/mute controls and push notification cards
- Kalyana Cluster Map: interactive SVG map with donation pins + volunteer assignment state
- Thali Tracker: animated SVG pie plate with 5 stages (Play/Pause/Reset/Step)
- Annadata Trust Score cards with circular gauge and Green Certificate PDF download
- Live Dashboard: donation cards with state transitions + synced Thali Tracker + volunteer panel
- Footer with links (Privacy, SOP), contact, social icons, partner placeholders
- `src/lib/api.ts` integration stubs with backend swap documentation
- `src/lib/data.ts` typed loader hook with simulated 400ms skeleton loading
- `src/styles/tokens.css` with full design token system
- `public/data/static.json` with 3 donations, 1 cluster, 3 volunteers, 3 trust samples
- `public/icons/` — 7 SVG icons (meals, tiffin, sweets, liquids, bell, truck, thali)
- Full WCAG AA accessibility: aria-labels, keyboard nav, focus-visible, prefers-reduced-motion
- Responsive layout: mobile (≤640px), tablet (641–1024px), desktop (≥1025px)
- `README.md` with run/build instructions and API wiring guide
- `integration-note.md` for backend wiring reference
