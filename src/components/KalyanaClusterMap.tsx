import React, { useState } from 'react';
import type { Cluster, Volunteer, Donation } from '../lib/api';

interface KalyanaClusterMapProps {
    cluster: Cluster | null;
    volunteers: Volunteer[];
    donations: Donation[];
}

const PIN_POSITIONS: { x: number; y: number; id: string }[] = [
    { id: 'D-1001', x: 180, y: 130 },
    { id: 'D-1002', x: 260, y: 110 },
    { id: 'D-1003', x: 140, y: 170 },
];

const FOOD_TYPE_COLOR: Record<string, string> = {
    Meals: '#F59E0B',
    Liquids: '#3B82F6',
    Tiffin: '#0F766E',
    Sweets: '#8B5CF6',
};

export const KalyanaClusterMap: React.FC<KalyanaClusterMapProps> = ({ cluster, volunteers, donations }) => {
    const [assignedVolunteer, setAssignedVolunteer] = useState<Volunteer | null>(null);
    const [assigning, setAssigning] = useState(false);
    const [hoveredPin, setHoveredPin] = useState<string | null>(null);

    const topVolunteer = [...volunteers].sort((a, b) => b.rating - a.rating)[0];

    const handleAssign = async () => {
        if (!topVolunteer) return;
        setAssigning(true);
        await new Promise((r) => setTimeout(r, 500));
        setAssignedVolunteer(topVolunteer);
        setAssigning(false);
    };

    const getDonation = (id: string) => donations.find((d) => d.id === id);

    return (
        <section id="cluster-map" style={{ background: 'white', padding: '5rem 1.5rem' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="section-title">🗺️ Kalyana Cluster Map</h2>
                    <p className="section-sub">Nearby donations are auto-clustered into a single Rescue Mission to maximize volunteer efficiency.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: '2rem', alignItems: 'start' }}>
                    {/* SVG Map */}
                    <div className="card" style={{ padding: '0', overflow: 'hidden', position: 'relative' }}>
                        <svg viewBox="0 0 400 280" width="100%" role="img" aria-label="Kalyana Street cluster map showing 3 donation pins">
                            {/* Street background */}
                            <rect width="400" height="280" fill="#F8F6F2" />

                            {/* Grid lines (streets) */}
                            {[60, 120, 180, 240].map((y) => <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#E5E7EB" strokeWidth="8" strokeLinecap="round" />)}
                            {[80, 160, 240, 320].map((x) => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="280" stroke="#E5E7EB" strokeWidth="8" strokeLinecap="round" />)}

                            {/* Main Kalyana Street */}
                            <line x1="0" y1="150" x2="400" y2="150" stroke="#D1D5DB" strokeWidth="18" />
                            <line x1="0" y1="150" x2="400" y2="150" stroke="#E9E9E9" strokeWidth="16" />
                            <line x1="0" y1="150" x2="400" y2="150" stroke="white" strokeWidth="2" strokeDasharray="20 15" />

                            {/* Street label */}
                            <text x="200" y="168" textAnchor="middle" fontSize="11" fill="#9CA3AF" fontWeight="500">Kalyana Street, Mylapore</text>

                            {/* Cluster radius circle */}
                            <circle cx="200" cy="135" r="80" fill="rgba(245,158,11,0.07)" stroke="rgba(245,158,11,0.3)" strokeWidth="1.5" strokeDasharray="8 5" />

                            {/* Route lines between pins */}
                            <polyline
                                points={PIN_POSITIONS.map((p) => `${p.x},${p.y}`).join(' ')}
                                fill="none"
                                stroke="#0F766E"
                                strokeWidth="2"
                                strokeDasharray="6 4"
                                opacity="0.7"
                            />

                            {/* Donation pins */}
                            {PIN_POSITIONS.map((pin) => {
                                const donation = getDonation(pin.id);
                                const color = donation ? FOOD_TYPE_COLOR[donation.type] : '#6B7280';
                                const hovered = hoveredPin === pin.id;
                                return (
                                    <g
                                        key={pin.id}
                                        style={{ cursor: 'pointer' }}
                                        onMouseEnter={() => setHoveredPin(pin.id)}
                                        onMouseLeave={() => setHoveredPin(null)}
                                        role="img"
                                        aria-label={donation?.title}
                                    >
                                        {/* Shadow */}
                                        <circle cx={pin.x} cy={pin.y + 6} r={hovered ? 16 : 13} fill="rgba(0,0,0,0.1)" />
                                        {/* Pin body */}
                                        <circle cx={pin.x} cy={pin.y} r={hovered ? 16 : 13} fill={color} style={{ transition: 'r 0.15s ease' }} />
                                        <circle cx={pin.x} cy={pin.y} r={hovered ? 16 : 13} fill="none" stroke="white" strokeWidth="2" />
                                        <text x={pin.x} y={pin.y + 5} textAnchor="middle" fontSize={hovered ? '12' : '10'} fill="white" fontWeight="700">
                                            {donation?.type[0] ?? '?'}
                                        </text>

                                        {/* Tooltip */}
                                        {hovered && donation && (
                                            <g>
                                                <rect x={pin.x - 60} y={pin.y - 48} width="120" height="36" rx="6" fill="#111827" />
                                                <text x={pin.x} y={pin.y - 32} textAnchor="middle" fontSize="10" fill="white" fontWeight="700">{donation.title}</text>
                                                <text x={pin.x} y={pin.y - 19} textAnchor="middle" fontSize="9" fill="#9CA3AF">{donation.volume} servings</text>
                                            </g>
                                        )}
                                    </g>
                                );
                            })}

                            {/* Volunteer indicator (if assigned) */}
                            {assignedVolunteer && (
                                <g>
                                    <circle cx="310" cy="200" r="14" fill="#0F766E" />
                                    <text x="310" y="205" textAnchor="middle" fontSize="14" fill="white">🛵</text>
                                    <rect x="260" y="220" width="100" height="28" rx="6" fill="white" stroke="#0F766E" strokeWidth="1.5" />
                                    <text x="310" y="234" textAnchor="middle" fontSize="10" fill="#0F766E" fontWeight="700">{assignedVolunteer.name}</text>
                                    <text x="310" y="244" textAnchor="middle" fontSize="8" fill="#6B7280">{assignedVolunteer.vehicle} · ⭐{assignedVolunteer.rating}</text>
                                </g>
                            )}

                            {/* Legend */}
                            {Object.entries(FOOD_TYPE_COLOR).map(([type, color], i) => (
                                <g key={type}>
                                    <circle cx={16} cy={260 - i * 18} r="7" fill={color} />
                                    <text x={26} y={265 - i * 18} fontSize="9" fill="#374151" fontWeight="500">{type}</text>
                                </g>
                            ))}
                        </svg>
                    </div>

                    {/* Cluster Mission Card */}
                    {cluster && (
                        <div className="card" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rescue Mission</span>
                                    <h3 style={{ margin: '4px 0 0', fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>{cluster.name}</h3>
                                </div>
                                <span style={{ background: '#FEF3C7', color: '#92400E', fontSize: '0.75rem', fontWeight: '700', padding: '4px 10px', borderRadius: '99px' }}>
                                    {cluster.id}
                                </span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                <div style={{ padding: '0.75rem', background: '#FFF7ED', borderRadius: '8px' }}>
                                    <p style={{ margin: 0, fontSize: '0.7rem', color: '#9CA3AF', fontWeight: '600', textTransform: 'uppercase' }}>Total Volume</p>
                                    <p style={{ margin: '4px 0 0', fontSize: '1.25rem', fontWeight: '800', color: '#F59E0B' }}>{cluster.estimated_total_volume}</p>
                                    <p style={{ margin: 0, fontSize: '0.7rem', color: '#6B7280' }}>servings</p>
                                </div>
                                <div style={{ padding: '0.75rem', background: '#F0FDF4', borderRadius: '8px' }}>
                                    <p style={{ margin: 0, fontSize: '0.7rem', color: '#9CA3AF', fontWeight: '600', textTransform: 'uppercase' }}>Donations</p>
                                    <p style={{ margin: '4px 0 0', fontSize: '1.25rem', fontWeight: '800', color: '#10B981' }}>{cluster.donation_ids.length}</p>
                                    <p style={{ margin: 0, fontSize: '0.7rem', color: '#6B7280' }}>consolidated</p>
                                </div>
                            </div>

                            {/* Route */}
                            <div style={{ marginBottom: '1.25rem' }}>
                                <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', fontWeight: '700', color: '#374151' }}>📍 Suggested Route</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    {cluster.suggested_route.map((stop, i) => (
                                        <div key={stop} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '800', color: 'white', flexShrink: 0 }}>
                                                {i + 1}
                                            </div>
                                            <span style={{ fontSize: '0.8rem', color: '#374151' }}>{stop}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Volunteer Assignment */}
                            {!assignedVolunteer ? (
                                <button
                                    onClick={handleAssign}
                                    disabled={assigning}
                                    className="btn-primary"
                                    style={{ width: '100%', justifyContent: 'center' }}
                                    aria-label="Assign top-rated volunteer to rescue mission"
                                >
                                    {assigning ? '⏳ Assigning...' : '🙋 Assign Volunteer'}
                                </button>
                            ) : (
                                <div style={{ background: '#ECFDF5', border: '1px solid #6EE7B7', borderRadius: '8px', padding: '0.875rem', animation: 'scaleIn 0.3s ease' }} role="status" aria-live="polite">
                                    <p style={{ margin: '0 0 6px', fontSize: '0.75rem', fontWeight: '700', color: '#065F46' }}>✅ Volunteer Assigned</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0F766E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                            👤
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontWeight: '700', color: '#111827', fontSize: '0.95rem' }}>{assignedVolunteer.name}</p>
                                            <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#6B7280' }}>
                                                {assignedVolunteer.vehicle} · ⭐ {assignedVolunteer.rating} rating
                                            </p>
                                        </div>
                                    </div>
                                    <button onClick={() => setAssignedVolunteer(null)} className="btn-ghost" style={{ marginTop: '0.75rem', width: '100%', fontSize: '0.8rem', justifyContent: 'center' }}>
                                        Reassign
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default KalyanaClusterMap;
