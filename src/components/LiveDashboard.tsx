import React, { useState } from 'react';
import type { Donation, Volunteer } from '../lib/api';
import { ThaliTracker } from './ThaliTracker';
import type { ThaliStage } from './ThaliTracker';

interface LiveDashboardProps {
    donations: Donation[];
    volunteers: Volunteer[];
}

type DonationState = {
    stage: ThaliStage;
    accepted: boolean;
    picked: boolean;
    delivered: boolean;
    assignedVolunteer: Volunteer | null;
};

const TYPE_COLOR: Record<string, string> = {
    Meals: '#F59E0B',
    Liquids: '#3B82F6',
    Tiffin: '#0F766E',
    Sweets: '#8B5CF6',
};
const TYPE_ICON: Record<string, string> = {
    Meals: '🍱',
    Liquids: '🪣',
    Tiffin: '🫓',
    Sweets: '🍬',
};

export const LiveDashboard: React.FC<LiveDashboardProps> = ({ donations, volunteers }) => {
    const [selectedId, setSelectedId] = useState<string>(donations[0]?.id ?? '');
    const [states, setStates] = useState<Record<string, DonationState>>(() => {
        const init: Record<string, DonationState> = {};
        donations.forEach((d) => {
            init[d.id] = { stage: 0, accepted: false, picked: false, delivered: false, assignedVolunteer: null };
        });
        return init;
    });
    const [counter, setCounter] = useState(0);

    const selectedDonation = donations.find((d) => d.id === selectedId);
    const selectedState = states[selectedId] ?? { stage: 0, accepted: false, picked: false, delivered: false, assignedVolunteer: null };

    const updateStage = (id: string, stage: ThaliStage) => {
        setStates((prev) => ({ ...prev, [id]: { ...prev[id], stage } }));
    };

    const advanceState = (id: string) => {
        setStates((prev) => {
            const s = prev[id];
            const newStage = Math.min(s.stage + 1, 4) as ThaliStage;
            const topVol = [...volunteers].sort((a, b) => b.rating - a.rating)[0];
            return {
                ...prev,
                [id]: {
                    stage: newStage,
                    accepted: newStage >= 1,
                    picked: newStage >= 2,
                    delivered: newStage >= 4,
                    assignedVolunteer: newStage >= 1 ? (s.assignedVolunteer ?? topVol) : null,
                },
            };
        });
        setCounter((c) => c + 1);
    };

    const STAGE_LABELS = ['Accept', 'Mark Picked', 'En Route', 'Delivered ✅', '✅ Done'];
    const STAGE_COLORS_BTN = ['#3B82F6', '#F59E0B', '#8B5CF6', '#10B981', '#6B7280'];

    return (
        <section id="live-demo" style={{ background: '#F8FAFC', padding: '5rem 1.5rem' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="section-title">📊 Live Dashboard Mock</h2>
                    <p className="section-sub">Simulated real-time state transitions. All changes are local-only — no server required for the demo.</p>
                    {counter > 0 && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#ECFDF5', border: '1px solid #6EE7B7', borderRadius: '99px', padding: '4px 14px', marginTop: '0.5rem' }}>
                            <span style={{ fontSize: '0.75rem', color: '#065F46', fontWeight: '600' }}>🚀 {counter} state transition{counter > 1 ? 's' : ''} this session</span>
                        </div>
                    )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '2rem', alignItems: 'start' }}>
                    {/* Left: Donation cards */}
                    <div>
                        <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: '700', color: '#374151' }}>
                            Active Donations ({donations.length})
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {donations.map((d) => {
                                const ds = states[d.id];
                                const isSelected = d.id === selectedId;
                                const color = TYPE_COLOR[d.type] ?? '#6B7280';
                                const stageIdx = ds?.stage ?? 0;

                                return (
                                    <div
                                        key={d.id}
                                        onClick={() => setSelectedId(d.id)}
                                        className="card"
                                        style={{
                                            padding: '1.25rem',
                                            cursor: 'pointer',
                                            border: isSelected ? `2px solid ${color}` : '1px solid #E5E7EB',
                                            transform: isSelected ? 'translateX(4px)' : 'none',
                                            transition: 'all 0.15s ease',
                                            background: isSelected ? `${color}08` : 'white',
                                        }}
                                        role="button"
                                        tabIndex={0}
                                        aria-pressed={isSelected}
                                        aria-label={`Select donation: ${d.title}`}
                                        onKeyDown={(e) => e.key === 'Enter' && setSelectedId(d.id)}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span style={{ fontSize: '1.3rem' }}>{TYPE_ICON[d.type] ?? '📦'}</span>
                                                <div>
                                                    <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>{d.title}</p>
                                                    <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#6B7280' }}>{d.donor_name}</p>
                                                </div>
                                            </div>
                                            <span style={{ background: `${color}15`, color: color, fontSize: '0.7rem', fontWeight: '700', padding: '3px 8px', borderRadius: '99px', whiteSpace: 'nowrap' }}>
                                                {d.type}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>📍 {d.location} · {d.volume} servings</span>
                                            <span style={{ fontSize: '0.7rem', fontWeight: '600', color: stageIdx >= 4 ? '#10B981' : '#F59E0B' }}>
                                                {['Posted', 'Accepted', 'Picked', 'En Route', 'Delivered'][stageIdx]}
                                            </span>
                                        </div>
                                        {/* Progress micro-bar */}
                                        <div style={{ marginTop: '0.6rem', height: '4px', background: '#F3F4F6', borderRadius: '99px', overflow: 'hidden' }}>
                                            <div style={{ height: '100%', width: `${(stageIdx / 4) * 100}%`, background: color, borderRadius: '99px', transition: 'width 0.4s ease' }} />
                                        </div>
                                        {/* Action button */}
                                        {stageIdx < 4 && (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); advanceState(d.id); }}
                                                style={{ marginTop: '0.75rem', width: '100%', background: STAGE_COLORS_BTN[stageIdx], color: 'white', border: 'none', borderRadius: '6px', padding: '6px', fontWeight: '700', cursor: 'pointer', fontSize: '0.8rem', transition: 'opacity 0.15s ease' }}
                                                aria-label={`${STAGE_LABELS[stageIdx]} donation ${d.title}`}
                                                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                                                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                                            >
                                                {STAGE_LABELS[stageIdx]}
                                            </button>
                                        )}
                                        {stageIdx >= 4 && (
                                            <div style={{ marginTop: '0.75rem', textAlign: 'center', fontSize: '0.85rem', color: '#10B981', fontWeight: '700' }}>
                                                🎉 Successfully Delivered!
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Thali tracker + volunteer panel */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: '1rem' }}>
                        {/* Thali tracker card */}
                        <div className="card" style={{ padding: '1.5rem' }}>
                            <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem', fontWeight: '700', color: '#111827' }}>
                                🍽 Thali Tracker
                            </h3>
                            {selectedDonation && (
                                <p style={{ margin: '0 0 1.25rem', fontSize: '0.8rem', color: '#6B7280' }}>
                                    {selectedDonation.title} · {selectedDonation.volume} servings
                                </p>
                            )}
                            <ThaliTracker
                                stage={selectedState.stage}
                                onStageChange={(s) => updateStage(selectedId, s)}
                            />
                        </div>

                        {/* Volunteer panel */}
                        <div className="card" style={{ padding: '1.5rem' }}>
                            <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: '700', color: '#111827' }}>
                                👥 Volunteers
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {volunteers.map((v) => {
                                    const isAssigned = selectedState.assignedVolunteer?.id === v.id;
                                    return (
                                        <div
                                            key={v.id}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                padding: '0.75rem',
                                                borderRadius: '8px',
                                                background: isAssigned ? '#ECFDF5' : '#F9FAFB',
                                                border: `1px solid ${isAssigned ? '#6EE7B7' : '#E5E7EB'}`,
                                                transition: 'all 0.2s ease',
                                            }}
                                        >
                                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: isAssigned ? '#0F766E' : '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                                                {v.vehicle === 'Van' ? '🚐' : '🛵'}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ margin: 0, fontWeight: '700', fontSize: '0.875rem', color: '#111827' }}>{v.name}</p>
                                                <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#6B7280' }}>
                                                    {v.vehicle} · ⭐ {v.rating}
                                                </p>
                                            </div>
                                            {isAssigned && (
                                                <span style={{ fontSize: '0.7rem', background: '#0F766E', color: 'white', padding: '2px 8px', borderRadius: '99px', fontWeight: '700' }}>
                                                    Assigned
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Donation notes card */}
                        {selectedDonation && (
                            <div style={{ padding: '1rem', background: '#FFF7ED', borderRadius: '8px', border: '1px solid #FDE68A' }}>
                                <p style={{ margin: '0 0 0.25rem', fontSize: '0.75rem', fontWeight: '700', color: '#92400E' }}>📝 Donor Notes</p>
                                <p style={{ margin: 0, fontSize: '0.875rem', color: '#374151' }}>{selectedDonation.notes}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LiveDashboard;
