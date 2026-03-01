import React, { useRef, useState } from 'react';

export const TempleBellDemo: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [showNotif, setShowNotif] = useState(false);

    const playBell = async () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.muted = muted;
        try {
            audio.currentTime = 0;
            await audio.play();
            setPlaying(true);
            setHasPlayed(true);
            setShowNotif(true);
            setTimeout(() => setPlaying(false), 1200);
        } catch {
            // autoplay / file not found — show visual only
            setHasPlayed(true);
            setShowNotif(true);
        }
    };

    const toggleMute = () => {
        setMuted((m) => !m);
        if (audioRef.current) audioRef.current.muted = !muted;
    };

    return (
        <section id="temple-bell" style={{ background: 'linear-gradient(135deg, #FFF7ED, #FEF9C3)', padding: '5rem 1.5rem' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="section-title">🔔 Temple Bell Notification</h2>
                    <p className="section-sub">When a rescue mission is dispatched, volunteers receive a local bell chime push notification.</p>
                </div>

                <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                    {/* Controls */}
                    <div style={{ flex: '1', minWidth: '240px', maxWidth: '380px', textAlign: 'center' }}>
                        {/* Bell visual */}
                        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2rem' }}>
                            <div
                                style={{
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #FDE68A, #F59E0B)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '4rem',
                                    boxShadow: '0 8px 24px rgba(245,158,11,0.4)',
                                    margin: '0 auto',
                                    animation: playing ? 'bellRing 0.3s infinite alternate' : 'none',
                                }}
                                aria-hidden="true"
                            >
                                🔔
                            </div>
                            {playing && (
                                <div style={{ position: 'absolute', inset: '-8px', borderRadius: '50%', border: '3px solid rgba(245,158,11,0.4)', animation: 'ripple 1s ease-out infinite' }} aria-hidden="true" />
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                onClick={playBell}
                                className="btn-primary"
                                aria-label="Play temple bell chime"
                                style={{ minWidth: '150px' }}
                            >
                                {playing ? '🔔 Playing...' : '▶ Play Chime'}
                            </button>
                            <button
                                onClick={toggleMute}
                                className="btn-ghost"
                                aria-label={muted ? 'Unmute audio' : 'Mute audio'}
                            >
                                {muted ? '🔇 Unmuted' : '🔊 Mute'}
                            </button>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#9CA3AF', marginTop: '1rem' }}>
                            Audio: /public/bell-1s.mp3 · User-initiated only
                        </p>
                        <audio ref={audioRef} src="/bell-1s.mp3" preload="auto" aria-hidden="true" />
                    </div>

                    {/* Notification previews */}
                    {hasPlayed && (
                        <div style={{ flex: '1', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '1rem', animation: 'scaleIn 0.3s ease' }}>
                            {/* Mobile push notification */}
                            <div
                                style={{ background: '#1a1a2e', borderRadius: '16px', padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
                                role="status"
                                aria-live="polite"
                                aria-label="Mobile push notification preview"
                            >
                                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'linear-gradient(135deg, #F59E0B, #D97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                                    🔔
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: '600' }}>FOODLINK ANNAM</span>
                                        <span style={{ fontSize: '10px', color: '#6B7280' }}>now</span>
                                    </div>
                                    <p style={{ margin: '3px 0 0', fontSize: '13px', color: 'white', fontWeight: '600' }}>🚨 Rescue Mission Dispatched!</p>
                                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#D1D5DB' }}>350 servings · Kalyana St · Volunteer Meena assigned</p>
                                </div>
                                {showNotif && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B', flexShrink: 0 }} aria-hidden="true" />}
                            </div>

                            {/* Desktop web push preview */}
                            <div
                                style={{ background: 'white', borderRadius: '12px', padding: '12px 16px', display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB' }}
                                aria-label="Desktop web push notification preview"
                            >
                                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
                                    🍱
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#111827' }}>FoodLink Annam — Web Push</p>
                                    <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#6B7280' }}>New cluster C-3001 · 3 donations consolidated · Route ready</p>
                                </div>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <button style={{ fontSize: '11px', padding: '4px 8px', border: '1px solid #E5E7EB', borderRadius: '6px', background: 'none', cursor: 'pointer', fontWeight: '600', color: '#0F766E' }}>Accept</button>
                                    <button style={{ fontSize: '11px', padding: '4px 8px', border: 'none', background: 'none', cursor: 'pointer', color: '#9CA3AF' }}>Dismiss</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        @keyframes bellRing {
          from { transform: rotate(-8deg); }
          to { transform: rotate(8deg); }
        }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes bellRing { from { transform: none; } to { transform: none; } }
          @keyframes ripple { from { opacity: 0; } to { opacity: 0; } }
        }
      `}</style>
        </section>
    );
};

export default TempleBellDemo;
