import React, { useState } from 'react';

interface HeroProps {
    onGetInvolved?: () => void;
}

const PhoneMock: React.FC = () => (
    <div
        style={{
            width: '220px',
            height: '440px',
            background: '#1a1a1a',
            borderRadius: '32px',
            padding: '8px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)',
            position: 'relative',
            flexShrink: 0,
        }}
        aria-hidden="true"
    >
        {/* Notch */}
        <div style={{ position: 'absolute', top: '14px', left: '50%', transform: 'translateX(-50%)', width: '60px', height: '10px', background: '#1a1a1a', borderRadius: '8px', zIndex: 2 }} />
        <div style={{ background: '#FFF7ED', borderRadius: '26px', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Status bar */}
            <div style={{ background: '#F59E0B', padding: '6px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', fontWeight: '600', color: 'white' }}>FoodLink</span>
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.8)' }}>●●●●</span>
            </div>
            {/* Screen content - Thali Tracker mid-fill */}
            <div style={{ padding: '12px', flex: 1 }}>
                <p style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 6px' }}>🍽 Thali Tracker</p>
                <p style={{ fontSize: '8px', color: '#6B7280', margin: '0 0 10px' }}>Wedding - Sambar Sadam</p>
                {/* Mini animated plate */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                    <svg viewBox="0 0 100 100" width="80" height="80" aria-label="Thali plate tracker">
                        <circle cx="50" cy="50" r="46" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2" />
                        <path d="M50,50 L50,4 A46,46 0 0,1 89.9,73 Z" fill="#0F766E" opacity="0.9" />
                        <path d="M50,50 L89.9,73 A46,46 0 0,1 10.1,73 Z" fill="#F59E0B" opacity="0.9" />
                        <path d="M50,50 L10.1,73 A46,46 0 0,1 50,4 Z" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1" />
                        <circle cx="50" cy="50" r="14" fill="white" />
                        <text x="50" y="54" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0F766E">En route</text>
                    </svg>
                </div>
                {/* Steps */}
                {['Posted', 'Accepted', 'Picked', 'En route', 'Delivered'].map((s, i) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: i <= 3 ? '#0F766E' : '#E5E7EB', flexShrink: 0 }} />
                        <span style={{ fontSize: '7px', color: i <= 3 ? '#0F766E' : '#9CA3AF', fontWeight: i <= 3 ? '600' : '400' }}>{s}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const Hero: React.FC<HeroProps> = ({ onGetInvolved }) => {
    const [showLoggedIn] = useState(() => {
        try { return !!JSON.parse(localStorage.getItem('fl_session') || 'null')?.loggedIn; } catch { return false; }
    });

    return (
        <section
            id="hero"
            style={{
                background: 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 40%, #CCFBF1 100%)',
                minHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                padding: '4rem 1.5rem',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background decorative circles */}
            <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(245,158,11,0.08)', pointerEvents: 'none' }} aria-hidden="true" />
            <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(15,118,110,0.06)', pointerEvents: 'none' }} aria-hidden="true" />

            <div className="container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
                    {/* Left column */}
                    <div style={{ flex: '1', minWidth: '280px' }}>
                        {/* Badge */}
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '99px', padding: '4px 14px', marginBottom: '1.5rem' }}>
                            <span style={{ fontSize: '1rem' }}>🌾</span>
                            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#92400E' }}>Now live in Mylapore, Chennai</span>
                        </div>

                        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: '800', color: '#111827', lineHeight: 1.1, margin: '0 0 1rem' }}>
                            FoodLink{' '}
                            <span style={{ color: '#F59E0B' }}>Annam</span>
                            <br />
                            <span style={{ color: '#0F766E' }}>Rescuing Surplus.</span>
                            <br />
                            <span>Feeding Communities.</span>
                        </h1>

                        <p style={{ fontSize: '1.15rem', color: '#374151', lineHeight: 1.7, margin: '0 0 2rem', maxWidth: '480px' }}>
                            One tap. Zero waste. FoodLink Annam consolidates wedding surplus, temple prasad, and catered leftovers — directing them straight to those who need it most.
                        </p>

                        {showLoggedIn && (
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ECFDF5', border: '1px solid #6EE7B7', borderRadius: '8px', padding: '8px 16px', marginBottom: '1.5rem' }}>
                                <span>✅</span>
                                <span style={{ fontSize: '0.875rem', color: '#065F46', fontWeight: '500' }}>Logged in via Missed-Call</span>
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <a
                                href="#live-demo"
                                className="btn-primary"
                                aria-label="See live demo of FoodLink"
                            >
                                <span>▶</span> See Live Demo
                            </a>
                            <button
                                onClick={onGetInvolved}
                                className="btn-secondary"
                                aria-label="Get involved with FoodLink"
                            >
                                🤝 Get Involved
                            </button>
                        </div>

                        {/* Trust badges */}
                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
                            {[
                                { icon: '🍱', label: '1,280+ meals / month' },
                                { icon: '👥', label: '152 active volunteers' },
                                { icon: '⚡', label: 'Avg 3× consolidation' },
                            ].map((b) => (
                                <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ fontSize: '1.2rem' }}>{b.icon}</span>
                                    <span style={{ fontSize: '0.8rem', fontWeight: '500', color: '#6B7280' }}>{b.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right column - Phone mock */}
                    <div style={{ display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
                        <div style={{ position: 'relative' }}>
                            <PhoneMock />
                            {/* Floating notification card */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '-20px',
                                    left: '-80px',
                                    background: 'white',
                                    borderRadius: '12px',
                                    padding: '10px 14px',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                    width: '180px',
                                    border: '1px solid #E5E7EB',
                                }}
                                aria-hidden="true"
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '1.2rem' }}>🔔</span>
                                    <div>
                                        <p style={{ margin: 0, fontSize: '10px', fontWeight: '700', color: '#111827' }}>Rescue Mission!</p>
                                        <p style={{ margin: 0, fontSize: '9px', color: '#6B7280' }}>350 servings · Kalyana St</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
