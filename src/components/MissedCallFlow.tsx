import React, { useState } from 'react';
import { authMissedCall } from '../lib/api';

type Step = 'idle' | 'dialed' | 'detected' | 'success';

export const MissedCallFlow: React.FC = () => {
    const [step, setStep] = useState<Step>('idle');
    const [loading, setLoading] = useState(false);
    const [maskedPhone, setMaskedPhone] = useState('');

    const STEPS = [
        { id: 'dialed', label: 'Dial & Hang Up', desc: 'User dials +91 800-FOODLINK and hangs up within 2 rings.', icon: '📞' },
        { id: 'detected', label: 'IVR Detects Call', desc: 'System detects the missed call from caller ID — no data needed.', icon: '🔍' },
        { id: 'success', label: 'Logged In!', desc: 'FoodLink sends back a confirmation SMS. Donor is authenticated.', icon: '✅' },
    ];

    const simulate = async () => {
        setLoading(true);
        setStep('dialed');
        await new Promise((r) => setTimeout(r, 700));
        setStep('detected');
        await new Promise((r) => setTimeout(r, 700));
        const res = await authMissedCall('+91 9876543210');
        setMaskedPhone(res.maskedPhone);
        setStep('success');
        setLoading(false);
    };

    const reset = () => {
        setStep('idle');
        setMaskedPhone('');
        localStorage.removeItem('fl_session');
    };

    const currentStepIdx = STEPS.findIndex((s) => s.id === step);

    return (
        <section id="missed-call" style={{ background: 'white', padding: '5rem 1.5rem' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="section-title">Missed-Call Login</h2>
                    <p className="section-sub">Zero data usage. Works on any phone. Donors authenticate via a free missed call.</p>
                </div>

                <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center' }}>
                    {/* Stepper */}
                    <div style={{ flex: '1', minWidth: '280px', maxWidth: '520px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                            {STEPS.map((s, i) => {
                                const isActive = step === s.id;
                                const isDone = currentStepIdx > i;
                                return (
                                    <div key={s.id} style={{ display: 'flex', gap: '1rem' }}>
                                        {/* Icon + connector */}
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div
                                                style={{
                                                    width: '44px',
                                                    height: '44px',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '1.3rem',
                                                    background: isDone ? '#0F766E' : isActive ? '#F59E0B' : '#F3F4F6',
                                                    transition: 'background 0.3s',
                                                    flexShrink: 0,
                                                    border: isActive ? '3px solid #FDE68A' : '3px solid transparent',
                                                }}
                                            >
                                                {isDone ? '✓' : s.icon}
                                            </div>
                                            {i < STEPS.length - 1 && (
                                                <div style={{ width: '2px', flex: 1, minHeight: '32px', background: isDone ? '#0F766E' : '#E5E7EB', transition: 'background 0.3s', margin: '2px 0' }} />
                                            )}
                                        </div>
                                        {/* Content */}
                                        <div style={{ paddingBottom: i < STEPS.length - 1 ? '1.5rem' : 0 }}>
                                            <p style={{ margin: '0.6rem 0 0.25rem', fontWeight: '700', color: isActive ? '#F59E0B' : isDone ? '#0F766E' : '#9CA3AF', fontSize: '1rem' }}>{s.label}</p>
                                            <p style={{ margin: 0, color: '#6B7280', fontSize: '0.875rem', lineHeight: 1.5 }}>{s.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Simulate button */}
                        <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <button
                                onClick={simulate}
                                disabled={loading || step === 'success'}
                                className="btn-primary"
                                aria-label="Simulate missed call login"
                                aria-busy={loading}
                                style={{ opacity: (loading || step === 'success') ? 0.7 : 1 }}
                            >
                                {loading ? '⏳ Detecting...' : '📞 Simulate Missed Call'}
                            </button>
                            {step === 'success' && (
                                <button onClick={reset} className="btn-ghost" aria-label="Reset simulation">
                                    🔄 Reset
                                </button>
                            )}
                        </div>

                        {/* OTP Fallback */}
                        <div style={{ marginTop: '1.25rem', padding: '0.875rem 1rem', background: '#F9FAFB', borderRadius: '8px', border: '1px dashed #D1D5DB', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontSize: '1.2rem' }}>🔢</span>
                            <div>
                                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>OTP Fallback</p>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#9CA3AF' }}>For users with internet — enter 6-digit OTP (non-functional in this demo)</p>
                            </div>
                            <button className="btn-ghost" style={{ marginLeft: 'auto', fontSize: '0.8rem', padding: '0.4rem 0.75rem' }} disabled aria-label="OTP entry not wired in demo">
                                Enter OTP
                            </button>
                        </div>
                    </div>

                    {/* Frame: Success card */}
                    {step === 'success' && (
                        <div
                            style={{
                                flex: '0 0 auto',
                                background: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)',
                                border: '1px solid #6EE7B7',
                                borderRadius: '16px',
                                padding: '2rem',
                                maxWidth: '320px',
                                animation: 'scaleIn 0.3s ease',
                            }}
                            role="status"
                            aria-live="polite"
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>🎉</div>
                            <h3 style={{ margin: '0 0 0.5rem', color: '#065F46', fontSize: '1.1rem', textAlign: 'center' }}>Missed Call Received!</h3>
                            <p style={{ margin: '0 0 1rem', color: '#047857', fontSize: '0.95rem', textAlign: 'center' }}>
                                Logged in as <strong>{maskedPhone}</strong>
                            </p>
                            <div style={{ background: 'white', borderRadius: '8px', padding: '0.875rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.5rem' }}>📨</span>
                                <div>
                                    <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: '700', color: '#111827' }}>SMS Sent</p>
                                    <p style={{ margin: 0, fontSize: '0.7rem', color: '#6B7280' }}>FoodLink: Your login is confirmed. Start donating!</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MissedCallFlow;
