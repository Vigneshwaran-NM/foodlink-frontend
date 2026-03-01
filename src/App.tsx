import React, { useState } from 'react';
import { useStaticData } from './lib/data';

// Components
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { OneTapMenu } from './components/OneTapMenu';
import { MissedCallFlow } from './components/MissedCallFlow';
import { TempleBellDemo } from './components/TempleBellDemo';
import { KalyanaClusterMap } from './components/KalyanaClusterMap';
import { ThaliTracker } from './components/ThaliTracker';
import type { ThaliStage } from './components/ThaliTracker';
import { TrustCard } from './components/TrustCard';
import { LiveDashboard } from './components/LiveDashboard';
import { Footer } from './components/Footer';

// Navbar
const NAV_ITEMS = [
  { label: 'Mission', href: '#problem-impact' },
  { label: 'Menu', href: '#menu' },
  { label: 'Login', href: '#missed-call' },
  { label: 'Dashboard', href: '#live-demo' },
  { label: 'Trust Score', href: '#trust-score' },
];

const Navbar: React.FC<{ onGetInvolved: () => void }> = ({ onGetInvolved }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 500,
        background: 'rgba(255,247,237,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(245,158,11,0.15)',
        padding: '0 1.5rem',
      }}
      aria-label="Main navigation"
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
        {/* Logo */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }} aria-label="FoodLink Annam home">
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
            🌾
          </div>
          <span style={{ fontWeight: '800', color: '#111827', fontSize: '1rem' }}>
            FoodLink <span style={{ color: '#F59E0B' }}>Annam</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav" aria-label="Desktop navigation links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                padding: '0.4rem 0.875rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                textDecoration: 'none',
                borderRadius: '6px',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(245,158,11,0.1)'; (e.currentTarget as HTMLElement).style.color = '#F59E0B'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#374151'; }}
            >
              {item.label}
            </a>
          ))}
          <button onClick={onGetInvolved} className="btn-primary" style={{ marginLeft: '0.5rem', fontSize: '0.875rem', padding: '0.4rem 1rem' }}>
            Get Involved
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          style={{ display: 'none', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', padding: '4px' }}
          className="mobile-menu-btn"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ padding: '0.75rem 1.5rem 1rem', borderTop: '1px solid #F3F4F6' }}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{ display: 'block', padding: '0.6rem 0', fontSize: '0.95rem', fontWeight: '500', color: '#374151', textDecoration: 'none', borderBottom: '1px solid #F9FAFB' }}
            >
              {item.label}
            </a>
          ))}
          <button onClick={() => { setMenuOpen(false); onGetInvolved(); }} className="btn-primary" style={{ marginTop: '0.75rem', width: '100%', justifyContent: 'center' }}>
            Get Involved
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

// Modal
const GetInvolvedModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div
    className="modal-overlay"
    role="dialog"
    aria-modal="true"
    aria-label="Get Involved with FoodLink"
    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
  >
    <div className="modal-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800' }}>Join FoodLink Annam 🌾</h2>
        <button onClick={onClose} aria-label="Close modal" style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#6B7280' }}>×</button>
      </div>
      <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>Choose how you'd like to contribute to zero food waste in your community:</p>
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {[
          { icon: '🍱', role: 'Food Donor', desc: 'Register your venue and post surplus donations with one tap.' },
          { icon: '🛵', role: 'Volunteer', desc: 'Pick up and deliver food using your scooter or van.' },
          { icon: '🏢', role: 'NGO Partner', desc: 'Receive bulk donations for your community kitchen.' },
          { icon: '💻', role: 'Developer', desc: 'Contribute to the open-source FoodLink platform.' },
        ].map((r) => (
          <div key={r.role} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#FFF7ED', borderRadius: '8px', border: '1px solid #FDE68A', cursor: 'pointer', transition: 'border 0.15s' }}>
            <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{r.icon}</span>
            <div>
              <p style={{ margin: '0 0 2px', fontWeight: '700', color: '#111827' }}>{r.role}</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={onClose} className="btn-primary" style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
        Register Now →
      </button>
    </div>
  </div>
);

// Thali Tracker standalone section
const ThaliTrackerSection: React.FC = () => {
  const [stage, setStage] = useState<ThaliStage>(0);
  return (
    <section id="thali-tracker" style={{ background: 'white', padding: '5rem 1.5rem' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="section-title">🍽 Thali Tracker</h2>
          <p className="section-sub">Watch a donation journey from post to plate — five stages, animated in real time.</p>
        </div>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <ThaliTracker stage={stage} onStageChange={setStage} />
        </div>
      </div>
    </section>
  );
};

// Skeleton sections
const SkeletonSection: React.FC = () => (
  <div style={{ padding: '5rem 1.5rem', background: 'white' }}>
    <div className="container">
      <div className="skeleton" style={{ height: '2rem', width: '40%', marginBottom: '1rem' }} />
      <div className="skeleton" style={{ height: '1rem', width: '60%', marginBottom: '2rem' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {[1, 2, 3].map((i) => <div key={i} className="skeleton" style={{ height: '120px' }} />)}
      </div>
    </div>
  </div>
);

function App() {
  const { data, loading } = useStaticData();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar onGetInvolved={() => setModalOpen(true)} />

      <main id="main-content">
        <Hero onGetInvolved={() => setModalOpen(true)} />

        {loading ? (
          <>
            <SkeletonSection />
            <SkeletonSection />
          </>
        ) : (
          <>
            <Stats stats={data?.stats ?? null} loading={false} />
            <OneTapMenu />
            <MissedCallFlow />
            <TempleBellDemo />
            <KalyanaClusterMap
              cluster={data?.clusters[0] ?? null}
              volunteers={data?.volunteers ?? []}
              donations={data?.donations ?? []}
            />
            <ThaliTrackerSection />
            <TrustCard trustSamples={data?.trust_samples ?? []} />
            <LiveDashboard
              donations={data?.donations ?? []}
              volunteers={data?.volunteers ?? []}
            />
          </>
        )}
      </main>

      <Footer />

      {modalOpen && <GetInvolvedModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}

export default App;
