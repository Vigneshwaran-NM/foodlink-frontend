# Integration Note — Backend Wiring Guide

When you are ready to connect the FoodLink Annam frontend to a real backend, here are the **exact files and functions** to change.

---

## Environment Configuration

**File:** `.env` (create in repo root)

```
VITE_API_BASE_URL=https://api.foodlink.in
```

The `VITE_` prefix is required for Vite to expose it to the frontend.

---

## Primary File: `src/lib/api.ts`

This is the **only file** that needs to change for backend wiring.

### Function Map

| Function | Current Behavior | Real Endpoint |
|----------|-----------------|---------------|
| `getDonations()` | Reads `static.json` | `GET ${API_BASE_URL}/donations` |
| `getClusters()` | Reads `static.json` | `GET ${API_BASE_URL}/clusters` |
| `getVolunteers()` | Reads `static.json` | `GET ${API_BASE_URL}/volunteers` |
| `getStats()` | Reads `static.json` | `GET ${API_BASE_URL}/stats` |
| `getTrustSamples()` | Reads `static.json` | `GET ${API_BASE_URL}/trust-scores` |
| `authMissedCall(phone)` | Sets `localStorage` | `POST ${API_BASE_URL}/auth/missedcall` |
| `assignVolunteer(clusterId, volunteerId)` | Local state only | `POST ${API_BASE_URL}/clusters/:id/assign` |

### Example Swap (getDonations)

```typescript
// Before (static):
export async function getDonations(): Promise<Donation[]> {
  const data = await _fetchStatic();
  return data.donations;
}

// After (real API):
export async function getDonations(): Promise<Donation[]> {
  const res = await fetch(`${API_BASE_URL}/donations`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    }
  });
  if (!res.ok) throw new Error('Failed to fetch donations');
  return res.json();
}
```

---

## Auth Token Handling

After wiring `authMissedCall`, the API will return a real JWT. Update `src/lib/api.ts`:

```typescript
// Add helper
function getToken(): string {
  const session = JSON.parse(localStorage.getItem('fl_session') || '{}');
  return session.token ?? '';
}

// In authMissedCall — store real token
localStorage.setItem('fl_session', JSON.stringify({
  phone: response.phone,
  token: response.token,  // from backend
  loggedIn: true,
  ts: Date.now(),
}));
```

---

## WebSocket / Real-Time Updates (Optional Future)

For live dashboard auto-refresh, add to `src/lib/data.ts`:

```typescript
// TODO: Replace polling with WebSocket subscription
//   ws://api.foodlink.in/ws/donations
//   ws://api.foodlink.in/ws/clusters
```

---

## Files NOT to Modify

- `src/styles/tokens.css` — design-only, no data dependency
- `src/components/*.tsx` — all consume typed data from `api.ts`; no direct fetch calls
- `public/icons/` — static SVG, no backend dependency

---

## Deployment Checklist

1. Set `VITE_API_BASE_URL` in hosting environment (Vercel, Netlify, etc.)
2. Configure CORS on backend to allow frontend origin
3. Replace `public/bell-1s.mp3` with real audio file
4. Replace `public/green-certificate-sample.pdf` with real certificate generator
5. Remove `_cache` in `data.ts` or add cache invalidation logic
