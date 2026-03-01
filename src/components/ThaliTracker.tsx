import React, { useEffect, useRef, useState } from 'react';

export type ThaliStage = 0 | 1 | 2 | 3 | 4;
export const STAGES: string[] = ['Posted', 'Accepted', 'Picked', 'En route', 'Delivered'];
const STAGE_EMOJIS = ['📮', '✅', '🤝', '🛵', '🎉'];
const STAGE_COLORS = ['#6B7280', '#3B82F6', '#F59E0B', '#8B5CF6', '#10B981'];

interface ThaliTrackerProps {
    stage: ThaliStage;
    onStageChange?: (s: ThaliStage) => void;
    compact?: boolean;
}

function useReducedMotion() {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export const ThaliTracker: React.FC<ThaliTrackerProps> = ({ stage, onStageChange, compact = false }) => {
    const [playing, setPlaying] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const reducedMotion = useReducedMotion();

    const stageRef = useRef<ThaliStage>(stage);
    stageRef.current = stage;

    const advance = () => {
        const next = Math.min(stageRef.current + 1, 4) as ThaliStage;
        onStageChange?.(next);
    };

    useEffect(() => {
        if (playing && stage >= 4) {
            setPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
    }, [stage, playing]);

    const startPlay = () => {
        if (stage >= 4) return;
        setPlaying(true);
    };

    const pause = () => {
        setPlaying(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const reset = () => {
        pause();
        onStageChange?.(0);
    };

    useEffect(() => {
        if (!playing) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }
        intervalRef.current = setInterval(() => {
            const next = Math.min(stageRef.current + 1, 4) as ThaliStage;
            onStageChange?.(next);
        }, 1200);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [playing, onStageChange]);

    // SVG plate - divide into 5 equal segments
    const R = 44;
    const cx = 50;
    const cy = 50;

    // Build pie segments (72° each = 5 slices)
    const segments = STAGES.map((_, i) => {
        const startAngle = (i * 72 - 90) * (Math.PI / 180);
        const endAngle = ((i + 1) * 72 - 90) * (Math.PI / 180);
        const x1 = cx + R * Math.cos(startAngle);
        const y1 = cy + R * Math.sin(startAngle);
        const x2 = cx + R * Math.cos(endAngle);
        const y2 = cy + R * Math.sin(endAngle);
        return { x1, y1, x2, y2, filled: i <= stage };
    });

    const size = compact ? 80 : 140;

    return (
        <div>
            {/* Plate SVG */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: compact ? '0.75rem' : '1.25rem', position: 'relative' }}>
                <svg
                    viewBox="0 0 100 100"
                    width={size}
                    height={size}
                    role="img"
                    aria-label={`Thali Tracker: stage ${stage + 1} of 5 — ${STAGES[stage]}`}
                >
                    {/* Plate rim */}
                    <circle cx={cx} cy={cy} r={47} fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1.5" />
                    <circle cx={cx} cy={cy} r={44} fill="#FFFBF5" />

                    {/* Segments */}
                    {segments.map((seg, i) => (
                        <path
                            key={i}
                            d={`M${cx},${cy} L${seg.x1},${seg.y1} A${R},${R} 0 0,1 ${seg.x2},${seg.y2} Z`}
                            fill={seg.filled ? STAGE_COLORS[i] : '#F3F4F6'}
                            opacity={seg.filled ? 0.85 : 0.4}
                            style={{ transition: reducedMotion ? 'none' : 'fill 0.4s ease' }}
                        />
                    ))}

                    {/* Center circle with steam emoji */}
                    <circle cx={cx} cy={cy} r={18} fill="white" stroke="#E5E7EB" strokeWidth="1" />
                    <text x={cx} y={cy + 6} textAnchor="middle" fontSize="14">{STAGE_EMOJIS[stage]}</text>

                    {/* Steam lines (CSS anim) */}
                    {!reducedMotion && stage >= 4 && (
                        <>
                            <line x1={44} y1={16} x2={44} y2={8} stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" className="steam-line" />
                            <line x1={50} y1={10} x2={50} y2={2} stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" className="steam-line" style={{ animationDelay: '0.4s' }} />
                            <line x1={56} y1={16} x2={56} y2={8} stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" className="steam-line" style={{ animationDelay: '0.2s' }} />
                        </>
                    )}
                </svg>
            </div>

            {/* Stage labels */}
            {!compact && (
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                    {STAGES.map((s, i) => (
                        <div
                            key={s}
                            style={{
                                textAlign: 'center',
                                flex: 1,
                                minWidth: '55px',
                                padding: '6px 4px',
                                borderRadius: '6px',
                                background: i === stage ? `${STAGE_COLORS[i]}15` : i < stage ? '#ECFDF5' : '#F9FAFB',
                                border: `1px solid ${i === stage ? STAGE_COLORS[i] : i < stage ? '#6EE7B7' : '#E5E7EB'}`,
                                transition: reducedMotion ? 'none' : 'all 0.3s ease',
                            }}
                        >
                            <div style={{ fontSize: '0.95rem' }}>{STAGE_EMOJIS[i]}</div>
                            <div style={{ fontSize: '0.65rem', fontWeight: i === stage ? '700' : '400', color: i <= stage ? STAGE_COLORS[i] : '#9CA3AF', marginTop: '2px' }}>
                                {s}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Controls */}
            {!compact && (
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {!playing ? (
                        <button
                            onClick={startPlay}
                            disabled={stage >= 4}
                            className="btn-primary"
                            style={{ opacity: stage >= 4 ? 0.6 : 1, fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                            aria-label="Play Thali Tracker animation"
                        >
                            ▶ Play
                        </button>
                    ) : (
                        <button onClick={pause} className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }} aria-label="Pause animation">
                            ⏸ Pause
                        </button>
                    )}
                    <button onClick={reset} className="btn-ghost" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }} aria-label="Reset tracker">
                        ↺ Reset
                    </button>
                    <button
                        onClick={advance}
                        disabled={stage >= 4}
                        className="btn-ghost"
                        style={{ fontSize: '0.85rem', padding: '0.5rem 1rem', opacity: stage >= 4 ? 0.5 : 1 }}
                        aria-label="Advance one stage"
                    >
                        ⏭ Step
                    </button>
                </div>
            )}

            <style>{`
        @keyframes steamRise {
          0% { transform: translateY(0); opacity: 0.6; }
          100% { transform: translateY(-6px); opacity: 0; }
        }
        .steam-line {
          animation: steamRise 1.2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .steam-line { animation: none; }
        }
      `}</style>
        </div>
    );
};

export default ThaliTracker;
