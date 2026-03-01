import React, { useState } from 'react';

interface CategoryItem {
    id: string;
    name: string;
    tamilName: string;
    icon: string;
    color: string;
    bgColor: string;
    sampleItems: { name: string; emoji: string; qty: string }[];
}

const CATEGORIES: CategoryItem[] = [
    {
        id: 'meals',
        name: 'Meals',
        tamilName: 'சாப்பாடு',
        icon: '🍱',
        color: '#F59E0B',
        bgColor: '#FEF3C7',
        sampleItems: [
            { name: 'Sambar Sadam', emoji: '🍛', qty: '50 servings' },
            { name: 'Curd Rice', emoji: '🍚', qty: '30 servings' },
            { name: 'Rasam Rice', emoji: '🥣', qty: '20 servings' },
        ],
    },
    {
        id: 'tiffin',
        name: 'Tiffin',
        tamilName: 'டிஃபின்',
        icon: '🫓',
        color: '#0F766E',
        bgColor: '#CCFBF1',
        sampleItems: [
            { name: 'Idli & Chutney', emoji: '🥞', qty: '80 pcs' },
            { name: 'Dosai', emoji: '🫓', qty: '40 pcs' },
            { name: 'Pongal', emoji: '🌾', qty: '15 servings' },
        ],
    },
    {
        id: 'sweets',
        name: 'Sweets',
        tamilName: 'இனிப்புகள்',
        icon: '🍬',
        color: '#8B5CF6',
        bgColor: '#F3E8FF',
        sampleItems: [
            { name: 'Laddu', emoji: '🟡', qty: '60 pcs' },
            { name: 'Halwa', emoji: '🍮', qty: '3 kg' },
            { name: 'Mysore Pak', emoji: '🟨', qty: '2 kg' },
        ],
    },
    {
        id: 'liquids',
        name: 'Liquids',
        tamilName: 'திரவங்கள்',
        icon: '🪣',
        color: '#3B82F6',
        bgColor: '#EFF6FF',
        sampleItems: [
            { name: 'Laddu Syrup', emoji: '🍯', qty: '20 L' },
            { name: 'Sambharam', emoji: '🥛', qty: '10 L' },
            { name: 'Panakam', emoji: '🫙', qty: '8 L' },
        ],
    },
];

export const OneTapMenu: React.FC = () => {
    const [selected, setSelected] = useState<CategoryItem | null>(null);

    return (
        <section id="menu" style={{ background: '#FFF7ED', padding: '5rem 1.5rem' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="section-title">One-Tap Visual Menu</h2>
                    <p className="section-sub">Donors select the food category in a single tap — optimized for feature phones and low-connectivity areas.</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelected(cat)}
                            aria-label={`View ${cat.name} category`}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.75rem',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0.5rem',
                            }}
                        >
                            <div
                                style={{
                                    width: '140px',
                                    height: '140px',
                                    borderRadius: '50%',
                                    background: cat.bgColor,
                                    border: `3px solid ${cat.color}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '3.5rem',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    boxShadow: `0 4px 12px ${cat.color}30`,
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${cat.color}50`;
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.transform = '';
                                    (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 12px ${cat.color}30`;
                                }}
                            >
                                {cat.icon}
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111827' }}>{cat.name}</div>
                                <div
                                    className="font-tamil"
                                    style={{ fontSize: '0.9rem', color: cat.color, fontWeight: '600', marginTop: '2px' }}
                                >
                                    {cat.tamilName}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selected && (
                <div
                    className="modal-overlay"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${selected.name} items`}
                    onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
                >
                    <div className="modal-content">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700' }}>
                                    {selected.icon} {selected.name}
                                </h3>
                                <p className="font-tamil" style={{ margin: '4px 0 0', color: selected.color, fontWeight: '600' }}>
                                    {selected.tamilName}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelected(null)}
                                aria-label="Close modal"
                                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#6B7280', lineHeight: 1 }}
                            >
                                ×
                            </button>
                        </div>
                        <p style={{ color: '#6B7280', fontSize: '0.9rem', margin: '0 0 1.25rem' }}>
                            Available items in this category from nearby donors:
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {selected.sampleItems.map((item) => (
                                <div
                                    key={item.name}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '0.875rem 1rem',
                                        background: selected.bgColor,
                                        borderRadius: '8px',
                                        border: `1px solid ${selected.color}30`,
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span style={{ fontSize: '1.5rem' }}>{item.emoji}</span>
                                        <span style={{ fontWeight: '600', color: '#111827' }}>{item.name}</span>
                                    </div>
                                    <span style={{ fontSize: '0.875rem', color: '#6B7280', fontWeight: '500' }}>{item.qty}</span>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setSelected(null)}
                            className="btn-primary"
                            style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}
                        >
                            Post Donation →
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default OneTapMenu;
