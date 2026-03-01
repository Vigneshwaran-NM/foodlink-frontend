// ============================================================
// src/lib/api.ts
// Integration stubs for FoodLink - Annam
//
// ENVIRONMENT VARIABLE:
//   API_BASE_URL — set in .env for real backend.
//   Currently empty string so all paths are relative (static).
//
// TO SWAP TO REAL API:
//   1. Set API_BASE_URL=https://api.foodlink.org in .env
//   2. Replace the static.json fetch inside each function with
//      the commented-out real endpoint fetch.
//   3. Add authentication headers as needed.
// ============================================================

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// --- Types (also exported for component use) ---
export type Donation = {
    id: string;
    title: string;
    type: 'Meals' | 'Tiffin' | 'Sweets' | 'Liquids';
    donor_name: string;
    time: string;
    location: string;
    volume: number;
    notes: string;
};

export type Cluster = {
    id: string;
    name: string;
    donation_ids: string[];
    estimated_total_volume: number;
    suggested_route: string[];
    cluster_time: string;
};

export type Volunteer = {
    id: string;
    name: string;
    vehicle: string;
    rating: number;
    last_active: string;
};

export type TrustSample = {
    donor: string;
    score: number;
    recipient_rating: number;
    on_time_pct: number;
    checklist_compliance: number;
};

export type Stats = {
    meals_rescued_month: number;
    avg_consolidation_ratio: number;
    active_volunteers: number;
};

export type StaticData = {
    stats: Stats;
    donations: Donation[];
    clusters: Cluster[];
    volunteers: Volunteer[];
    trust_samples: TrustSample[];
};

// -----------------
// Fetch all static data (replace with individual API calls)
// -----------------
async function _fetchStatic(): Promise<StaticData> {
    const res = await fetch(`${API_BASE_URL}/data/static.json`);
    if (!res.ok) throw new Error('Failed to load data');
    return res.json();
}

/**
 * Get platform statistics.
 *
 * Future: GET ${API_BASE_URL}/stats
 */
export async function getStats(): Promise<Stats> {
    const data = await _fetchStatic();
    return data.stats;
}

/**
 * Get all active donations.
 *
 * Future: GET ${API_BASE_URL}/donations
 */
export async function getDonations(): Promise<Donation[]> {
    const data = await _fetchStatic();
    return data.donations;
}

/**
 * Get all clusters.
 *
 * Future: GET ${API_BASE_URL}/clusters
 */
export async function getClusters(): Promise<Cluster[]> {
    const data = await _fetchStatic();
    return data.clusters;
}

/**
 * Get all volunteers.
 *
 * Future: GET ${API_BASE_URL}/volunteers
 */
export async function getVolunteers(): Promise<Volunteer[]> {
    const data = await _fetchStatic();
    return data.volunteers;
}

/**
 * Get trust score samples.
 *
 * Future: GET ${API_BASE_URL}/trust-scores
 */
export async function getTrustSamples(): Promise<TrustSample[]> {
    const data = await _fetchStatic();
    return data.trust_samples;
}

/**
 * Simulate missed-call login (UI-only).
 *
 * Future: POST ${API_BASE_URL}/auth/missedcall
 *   Body: { phone: string }
 *   Response: { token: string, user: { name, phone } }
 */
export async function authMissedCall(phone: string): Promise<{ success: boolean; maskedPhone: string }> {
    // MOCK — simulate network delay
    await new Promise((r) => setTimeout(r, 800));
    const masked = phone.replace(/.(?=.{4})/g, 'x');
    // Store fake session
    localStorage.setItem('fl_session', JSON.stringify({ phone: masked, loggedIn: true, ts: Date.now() }));
    return { success: true, maskedPhone: masked };
}

/**
 * Assign a volunteer to a cluster (UI-only state transition).
 *
 * Future: POST ${API_BASE_URL}/clusters/:clusterId/assign
 *   Body: { volunteer_id: string }
 *   Response: { cluster: Cluster, volunteer: Volunteer }
 */
export async function assignVolunteer(
    _clusterId: string,
    _volunteerId: string
): Promise<{ success: boolean }> {
    // MOCK — no real network call
    await new Promise((r) => setTimeout(r, 400));
    return { success: true };
}
