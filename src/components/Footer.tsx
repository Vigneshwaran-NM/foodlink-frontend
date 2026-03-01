import React from 'react';

export const Footer: React.FC = () => (
    <footer
        style={{
            background: 'linear-gradient(135deg, #111827, #1F2937)',
            color: '#D1D5DB',
            padding: '4rem 1.5rem 2rem',
        }}
    >
        <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
                {/* Brand */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                            🌾
                        </div>
                        <div>
                            <p style={{ margin: 0, fontWeight: '800', color: 'white', fontSize: '1rem' }}>FoodLink</p>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: '#F59E0B' }}>Annam Platform</p>
                        </div>
                    </div>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#9CA3AF', margin: 0 }}>
                        Rescuing surplus food at the speed of community. Connecting donors, volunteers, and recipients across Tamil Nadu.
                    </p>
                </div>

                {/* Quick links */}
                <div>
                    <h4 style={{ margin: '0 0 1rem', color: 'white', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Platform</h4>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {['One-Tap Menu', 'Missed-Call Login', 'Thali Tracker', 'Trust Score', 'Live Dashboard'].map((l) => (
                            <li key={l}>
                                <a href={`#${l.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.15s' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = '#F59E0B')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
                                >{l}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h4 style={{ margin: '0 0 1rem', color: 'white', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Legal</h4>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {[
                            { name: 'Privacy Policy', href: '#privacy' },
                            { name: 'SOP Document', href: '#sop' },
                            { name: 'Terms of Use', href: '#terms' },
                            { name: 'Data Handling', href: '#data' },
                        ].map((l) => (
                            <li key={l.name}>
                                <a href={l.href} style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.15s' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = '#F59E0B')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
                                >{l.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 style={{ margin: '0 0 1rem', color: 'white', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Contact</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <a href="mailto:hello@foodlink.in" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9CA3AF', textDecoration: 'none', fontSize: '0.875rem' }}>
                            <span>📧</span> hello@foodlink.in
                        </a>
                        <a href="tel:+918001234567" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9CA3AF', textDecoration: 'none', fontSize: '0.875rem' }}>
                            <span>📞</span> +91 800-FOODLINK
                        </a>
                        <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9CA3AF', fontSize: '0.875rem' }}>
                            <span>📍</span> Mylapore, Chennai
                        </p>
                    </div>

                    {/* Partner logos placeholder */}
                    <div style={{ marginTop: '1.5rem' }}>
                        <p style={{ margin: '0 0 0.5rem', fontSize: '0.7rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Partners</p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {['NGO Hub', 'City Corp', 'FSSAI'].map((p) => (
                                <div key={p} style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '0.7rem', color: '#6B7280' }}>
                                    {p}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#6B7280' }}>
                    © 2026 FoodLink Annam. Built with ❤️ for zero food waste.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {['🐦', '💼', '📸'].map((icon, i) => (
                        <a
                            key={i}
                            href="#"
                            aria-label={['Twitter', 'LinkedIn', 'Instagram'][i]}
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                background: 'rgba(255,255,255,0.06)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textDecoration: 'none',
                                fontSize: '1rem',
                                transition: 'background 0.15s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(245,158,11,0.2)')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                        >
                            {icon}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
