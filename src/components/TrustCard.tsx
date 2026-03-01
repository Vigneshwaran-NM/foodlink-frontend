import React, { useState } from 'react';
import type { TrustSample } from '../lib/api';

interface TrustCardProps {
    trustSamples: TrustSample[];
}

export const TrustCard: React.FC<TrustCardProps> = ({ trustSamples }) => {
    const [selectedIdx, setSelectedIdx] = useState(0);
    const sample = trustSamples[selectedIdx];

    const scoreColor = (score: number) => {
        if (score >= 90) return '#10B981';
        if (score >= 75) return '#F59E0B';
        return '#EF4444';
    };

    const scoreLabel = (score: number) => {
        if (score >= 90) return 'Platinum Donor 🌟';
        if (score >= 75) return 'Gold Donor ⭐';
        return 'Silver Donor';
    };

    if (!sample) return null;

    const col = scoreColor(sample.score);

    return (
        <section id="trust-score" style={{ background: 'linear-gradient(135deg, #FFF7ED, #ECFDF5)', padding: '5rem 1.5rem' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="section-title">Annadata Trust Score</h2>
                    <p className="section-sub">A transparent score that builds accountability and recognition for recurring donors.</p>
                </div>

                {/* Donor selector tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    {trustSamples.map((t, i) => (
                        <button
                            key={t.donor}
                            onClick={() => setSelectedIdx(i)}
                            aria-pressed={selectedIdx === i}
                            className={selectedIdx === i ? 'btn-primary' : 'btn-ghost'}
                            style={{ fontSize: '0.85rem' }}
                        >
                            {t.donor}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>
                    {/* Score card */}
                    <div
                        className="card"
                        style={{ padding: '2.5rem', minWidth: '280px', maxWidth: '340px', textAlign: 'center' }}
                    >
                        <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', fontWeight: '700', color: col, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            {scoreLabel(sample.score)}
                        </p>
                        <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', color: '#6B7280' }}>{sample.donor}</h3>

                        {/* Circular score */}
                        <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto 1.5rem' }}>
                            <svg viewBox="0 0 160 160" width="160" height="160" role="img" aria-label={`Trust score: ${sample.score} out of 100`}>
                                <circle cx="80" cy="80" r="66" fill="none" stroke="#F3F4F6" strokeWidth="12" />
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="66"
                                    fill="none"
                                    stroke={col}
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                    strokeDasharray={`${(sample.score / 100) * 415} 415`}
                                    transform="rotate(-90 80 80)"
                                    style={{ transition: 'stroke-dasharray 0.6s ease, stroke 0.4s ease' }}
                                />
                                <text x="80" y="75" textAnchor="middle" fontSize="36" fontWeight="800" fill="#111827">{sample.score}</text>
                                <text x="80" y="96" textAnchor="middle" fontSize="12" fill="#6B7280">/ 100</text>
                            </svg>
                        </div>

                        {/* Breakdown */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', textAlign: 'left' }}>
                            {[
                                { label: 'Recipient Rating', value: `${sample.recipient_rating} / 5.0`, pct: (sample.recipient_rating / 5) * 100, color: '#3B82F6' },
                                { label: 'On-Time %', value: `${sample.on_time_pct}%`, pct: sample.on_time_pct, color: '#F59E0B' },
                                { label: 'Checklist Compliance', value: `${Math.round(sample.checklist_compliance * 100)}%`, pct: sample.checklist_compliance * 100, color: '#10B981' },
                            ].map((row) => (
                                <div key={row.label}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span style={{ fontSize: '0.8rem', color: '#374151', fontWeight: '500' }}>{row.label}</span>
                                        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: row.color }}>{row.value}</span>
                                    </div>
                                    <div style={{ height: '6px', background: '#F3F4F6', borderRadius: '99px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${row.pct}%`, background: row.color, borderRadius: '99px', transition: 'width 0.5s ease' }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a
                            href="/green-certificate-sample.pdf"
                            download="Green-Certificate.pdf"
                            className="btn-primary"
                            style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}
                            aria-label={`Download Green Certificate for ${sample.donor}`}
                        >
                            📄 Download Green Certificate
                        </a>
                    </div>

                    {/* Certificate preview */}
                    <div className="card" style={{ padding: '2rem', minWidth: '260px', maxWidth: '320px', background: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)', border: '2px solid #6EE7B7' }}>
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ width: '64px', height: '64px', background: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1rem' }}>
                                🌿
                            </div>
                            <h4 style={{ margin: '0 0 0.25rem', color: '#065F46', fontSize: '1rem', fontWeight: '800' }}>Green Certificate</h4>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#047857' }}>Responsible Food Donor</p>
                        </div>
                        <div style={{ border: '2px dashed #6EE7B7', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                            <p style={{ margin: '0 0 0.4rem', fontWeight: '700', color: '#111827', fontSize: '0.95rem' }}>{sample.donor}</p>
                            <p style={{ margin: '0 0 0.4rem', fontSize: '0.8rem', color: '#6B7280' }}>Trust Score: <strong style={{ color: col }}>{sample.score}/100</strong></p>
                            <p style={{ margin: '0 0 0.4rem', fontSize: '0.8rem', color: '#6B7280' }}>Issued: March 2026</p>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: '#9CA3AF' }}>FoodLink Annam · Certified Donor</p>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#6B7280', textAlign: 'center', fontStyle: 'italic' }}>
                            PDF downloadable above
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustCard;
