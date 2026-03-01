import React, { useEffect, useRef, useState } from 'react';
import type { Stats } from '../lib/api';

interface StatsProps {
    stats: Stats | null;
    loading: boolean;
}

function useCountUp(target: number, active: boolean, duration = 1200) {
    const [count, setCount] = useState(0);
    const raf = useRef<number>(0);

    useEffect(() => {
        if (!active || target === 0) return;
        const start = performance.now();
        const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) raf.current = requestAnimationFrame(animate);
            else setCount(target);
        };
        raf.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf.current);
    }, [target, active, duration]);

    return count;
}

const PROBLEMS = [
    { icon: '🗑️', problem: 'Tons of wedding surplus go to landfill daily', color: '#EF4444' },
    { icon: '📞', problem: 'No single channel to quickly inform volunteers', color: '#F59E0B' },
    { icon: '🗺️', problem: 'Fragmented collection leads to spoilage en route', color: '#8B5CF6' },
];

const StatItem: React.FC<{ label: string; value: number; suffix: string; icon: string; active: boolean }> = ({
    label, value, suffix, icon, active,
}) => {
    const count = useCountUp(value, active);
    return (
        <div
            className="card"
            style={{ padding: '2rem', textAlign: 'center', transition: 'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
        >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{icon}</div>
            <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#F59E0B', lineHeight: 1 }}>
                {count.toLocaleString()}{suffix}
            </div>
            <div style={{ fontSize: '0.95rem', color: '#6B7280', marginTop: '0.5rem', fontWeight: '500' }}>{label}</div>
        </div>
    );
};

export const Stats: React.FC<StatsProps> = ({ stats, loading }) => {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="problem-impact" style={{ background: 'white', padding: '5rem 1.5rem' }} ref={ref}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="section-title">The Problem We're Solving</h2>
                    <p className="section-sub">Every day in India, millions of meals go wasted while millions go hungry.</p>
                </div>

                {/* Problem bullets */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                    {PROBLEMS.map((p) => (
                        <div
                            key={p.problem}
                            style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.25rem', background: '#FAFAFA', borderRadius: '8px', border: `1px solid ${p.color}22` }}
                        >
                            <span style={{ fontSize: '2rem', flexShrink: 0 }}>{p.icon}</span>
                            <div>
                                <p style={{ margin: 0, color: '#374151', fontWeight: '500', lineHeight: 1.5 }}>{p.problem}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    {loading ? (
                        <>
                            {[1, 2, 3].map((i) => <div key={i} className="skeleton" style={{ height: '160px' }} />)}
                        </>
                    ) : (
                        <>
                            <StatItem label="Meals Rescued This Month" value={stats?.meals_rescued_month ?? 0} suffix="+" icon="🍱" active={visible} />
                            <StatItem label="Average Consolidation Ratio" value={stats?.avg_consolidation_ratio ?? 0} suffix="× per cluster" icon="🔗" active={visible} />
                            <StatItem label="Active Volunteers" value={stats?.active_volunteers ?? 0} suffix="" icon="🙋" active={visible} />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Stats;
