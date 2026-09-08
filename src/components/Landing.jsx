// Landing Page Component
// Hero section with tagline, feature overview, and stats
import '../App.css';

const FEATURES = [
  {
    icon: '📊',
    bg: 'rgba(99,102,241,0.15)',
    title: 'Expense Dashboard',
    desc: 'Visual breakdown of all your spending with interactive charts and category intelligence.',
  },
  {
    icon: '🛑',
    bg: 'rgba(239,68,68,0.15)',
    title: 'Stop Me Mode',
    desc: 'Activates a real-time guard when you\'re about to overspend your monthly limit.',
  },
  {
    icon: '🔮',
    bg: 'rgba(139,92,246,0.15)',
    title: 'Future Impact Predictor',
    desc: 'Projects your spending trajectory and shows when you\'ll exceed your budget.',
  },
  {
    icon: '🕵️',
    bg: 'rgba(245,158,11,0.15)',
    title: 'Money Leak Detector',
    desc: 'Surfaces unnecessary or forgotten recurring expenses draining your wallet silently.',
  },
  {
    icon: '📅',
    bg: 'rgba(16,185,129,0.15)',
    title: 'Subscription Tracker',
    desc: 'All active subscriptions in one view with renewal dates and monthly cost totals.',
  },
  {
    icon: '🤖',
    bg: 'rgba(34,211,238,0.15)',
    title: 'AI-Powered Insights',
    desc: 'Personalized tips based on your spending habits — smarter than generic tips.',
  },
];

export default function Landing({ setPage }) {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="landing-hero">
        <div className="hero-badge">
          <span style={{ color: '#10b981' }}>●</span>
          New · Smart Spending AI is live
        </div>

        <h1 className="hero-title">
          Control your money<br />
          <span className="gradient-text">before it controls you.</span>
        </h1>

        <p className="hero-subtitle">
          Smart Spending Companion gives you a real-time financial cockpit — track expenses,
          predict future spend, and stop leaking money unconsciously.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={() => setPage('dashboard')} style={{ fontSize: '16px', padding: '14px 36px' }}>
            🚀 Get Started — It's Free
          </button>
          <button className="btn-ghost" onClick={() => setPage('smart')}>
            Explore Smart Tools →
          </button>
        </div>

        <div className="hero-scroll-hint">
          <span>↓</span> Scroll to explore features
        </div>
      </section>

      {/* Stats Bar */}
      <div className="landing-stats">
        {[
          { num: '₹2.4L',  label: 'Average savings unlocked' },
          { num: '12K+',   label: 'Transactions analyzed' },
          { num: '94%',    label: 'Users stay within budget' },
        ].map((s, i) => (
          <div key={i} className="stat-block">
            <div className="stat-block-num">{s.num}</div>
            <div className="stat-block-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <section className="features-section">
        <p className="section-label" style={{ textAlign: 'center' }}>Everything you need</p>
        <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', textAlign: 'center', fontWeight: 800, letterSpacing: '-0.03em' }}>
          One app. Total financial clarity.
        </h2>

        <div className="features-grid stagger">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card animate-fadeUp">
              <div className="feature-icon" style={{ background: f.bg }}>{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA block */}
        <div style={{
          marginTop: 60,
          textAlign: 'center',
          padding: '48px',
          borderRadius: 'var(--radius-xl)',
          background: 'var(--gradient-card)',
          border: '1px solid var(--border-glow)',
        }}>
          <h3 style={{ fontSize: '28px', fontWeight: 800, marginBottom: 12 }}>
            Ready to take back control?
          </h3>
          <p style={{ marginBottom: 28, maxWidth: 400, margin: '0 auto 28px' }}>
            Start tracking in seconds. No signup. No fuss. Just clarity.
          </p>
          <button className="btn-primary" onClick={() => setPage('dashboard')} style={{ fontSize: '16px', padding: '14px 40px' }}>
            Open Dashboard →
          </button>
        </div>
      </section>
    </div>
  );
}
