// SmartFeatures Component
// Stop Me Mode, Future Impact Predictor, Money Leak Detector, Subscription Tracker
import { useState } from 'react';
import { subscriptions, moneyLeaks, initialTransactions, BUDGET_LIMIT } from '../data/mockData';
import '../App.css';

// ── Stop Me Mode ────────────────────────────────────────
function StopMeCard() {
  const [enabled, setEnabled] = useState(false);
  const totalSpent = initialTransactions.reduce((s, t) => s + t.amount, 0);
  const pct = (totalSpent / BUDGET_LIMIT) * 100;

  return (
    <div className="smart-card">
      <div className="smart-card-header">
        <div className="smart-card-title">🛑 Stop Me Mode</div>
        <div className="toggle-wrap">
          <span className="toggle-label">{enabled ? 'ON' : 'OFF'}</span>
          <button
            className={`toggle ${enabled ? 'on' : ''}`}
            onClick={() => setEnabled(v => !v)}
            aria-label="Toggle Stop Me Mode"
          />
        </div>
      </div>

      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 }}>
        Warns you before any purchase when you're approaching your monthly limit.
      </p>

      {/* Progress */}
      <div className="progress-bar-wrap">
        <div className="progress-bar-label">
          <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Budget Used</span>
          <span style={{ fontWeight: 700, color: pct >= 80 ? 'var(--accent-red)' : 'var(--accent-green)' }}>
            {pct.toFixed(0)}%
          </span>
        </div>
        <div className="progress-bar-track">
          <div
            className={`progress-bar-fill ${pct >= 90 ? 'danger' : pct >= 70 ? 'warning' : 'safe'}`}
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>
      </div>

      {enabled && pct >= 70 && (
        <div className="stop-me-alert">
          <span style={{ fontSize: 20 }}>🚨</span>
          <span>
            <strong>Stop Me Mode Active!</strong> You've used {pct.toFixed(0)}% of ₹{BUDGET_LIMIT.toLocaleString()}.
            Think twice before your next purchase.
          </span>
        </div>
      )}
      {enabled && pct < 70 && (
        <div style={{
          marginTop: 14,
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(16,185,129,0.1)',
          border: '1px solid rgba(16,185,129,0.25)',
          color: '#6ee7b7',
          fontSize: 13,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          ✅ You're on track! Mode will alert you after 70% usage.
        </div>
      )}
    </div>
  );
}

// ── Future Impact Predictor ──────────────────────────────
function FutureImpactCard() {
  const totalSpent = initialTransactions.reduce((s, t) => s + t.amount, 0);
  const dayOfMonth = 24;
  const daysInMonth = 31;
  const dailyAvg = totalSpent / dayOfMonth;
  const projectedMonthEnd = Math.round(dailyAvg * daysInMonth);
  const surplus = BUDGET_LIMIT - projectedMonthEnd;
  const overBudget = surplus < 0;

  const projPct = Math.min((projectedMonthEnd / BUDGET_LIMIT) * 100, 130);

  return (
    <div className="smart-card">
      <div className="smart-card-header">
        <div className="smart-card-title">🔮 Future Impact Predictor</div>
        <span className="badge badge-blue">AI</span>
      </div>

      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
        Based on your daily spending of <strong style={{ color: 'var(--text-primary)' }}>₹{dailyAvg.toFixed(0)}</strong>,
        here's what March 31 looks like:
      </p>

      {/* Projected vs Budget */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
        marginBottom: 18,
      }}>
        {[
          { label: 'Projected End-of-Month', value: `₹${projectedMonthEnd.toLocaleString()}`, danger: overBudget },
          { label: 'Your Budget Limit',       value: `₹${BUDGET_LIMIT.toLocaleString()}`,   danger: false },
        ].map((item, i) => (
          <div key={i} style={{
            padding: '14px 16px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${item.danger ? 'rgba(239,68,68,0.3)' : 'var(--border)'}`,
          }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: item.danger ? 'var(--accent-red)' : 'var(--accent-green)' }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-label">
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Projected usage</span>
          <span style={{ fontWeight: 700, color: projPct >= 100 ? 'var(--accent-red)' : 'var(--accent-orange)' }}>
            {projPct.toFixed(0)}%
          </span>
        </div>
        <div className="progress-bar-track">
          <div className={`progress-bar-fill ${projPct >= 100 ? 'danger' : 'warning'}`} style={{ width: `${Math.min(projPct, 100)}%` }} />
        </div>
      </div>

      <div style={{
        marginTop: 14,
        padding: '14px 16px',
        borderRadius: 'var(--radius-md)',
        background: overBudget ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)',
        border: `1px solid ${overBudget ? 'rgba(239,68,68,0.25)' : 'rgba(16,185,129,0.25)'}`,
        fontSize: 13,
        color: overBudget ? '#fca5a5' : '#6ee7b7',
      }}>
        {overBudget
          ? `⚠️ If you continue spending like this, you'll exceed your budget by ₹${Math.abs(surplus).toLocaleString()} by month end.`
          : `✅ You're projected to stay within budget with ₹${surplus.toLocaleString()} to spare. Keep it up!`}
      </div>
    </div>
  );
}

// ── Money Leak Detector ──────────────────────────────────
function MoneyLeakCard() {
  const total = moneyLeaks.reduce((s, l) => s + l.amount, 0);
  return (
    <div className="smart-card">
      <div className="smart-card-header">
        <div className="smart-card-title">🕵️ Money Leak Detector</div>
        <span className="badge badge-red">{moneyLeaks.length} leaks</span>
      </div>

      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
        Identified <strong style={{ color: 'var(--accent-red)' }}>₹{total.toLocaleString()}</strong> in unnecessary spending this month.
      </p>

      {moneyLeaks.map((leak, i) => (
        <div key={i} className="leak-item">
          <div className="leak-dot" />
          <div className="leak-info">
            <div className="leak-label">{leak.label}</div>
            <div className="leak-tip">{leak.tip}</div>
          </div>
          <div className="leak-amount">₹{leak.amount.toLocaleString()}</div>
        </div>
      ))}

      <button className="btn-ghost" style={{ width: '100%', marginTop: 14, justifyContent: 'center', fontSize: 13 }}>
        See full report →
      </button>
    </div>
  );
}

// ── Subscription Tracker ─────────────────────────────────
function SubscriptionCard() {
  const total = subscriptions.reduce((s, sub) => s + sub.amount, 0);
  return (
    <div className="smart-card">
      <div className="smart-card-header">
        <div className="smart-card-title">📅 Subscription Tracker</div>
        <span className="badge badge-orange">₹{total}/mo</span>
      </div>

      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
        {subscriptions.length} active subscriptions · next renewal in 5 days
      </p>

      {subscriptions.map((sub, i) => (
        <div key={i} className="sub-item">
          <div className="sub-icon" style={{ background: `${sub.color}22` }}>{sub.icon}</div>
          <div>
            <div className="sub-name">{sub.name}</div>
            <div className="sub-next">Renews {sub.nextDate} · {sub.cycle}</div>
          </div>
          <div className="sub-amount" style={{ color: 'var(--accent-blue)' }}>₹{sub.amount}</div>
        </div>
      ))}

      <div style={{
        marginTop: 14,
        padding: '12px 16px',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(245,158,11,0.08)',
        border: '1px solid rgba(245,158,11,0.2)',
        fontSize: 13,
        color: '#fde68a',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        ⏰ Adobe CC renews in <strong>5 days</strong>. Last used 18 days ago — consider cancelling.
      </div>
    </div>
  );
}

// ── Main Smart Features Page ─────────────────────────────
export default function SmartFeatures() {
  return (
    <div className="smart-section">
      <div className="page-wrapper">
        <p className="section-label">AI-Powered</p>
        <h1 style={{ fontSize: 'clamp(26px,4vw,38px)', fontWeight: 800, marginBottom: 6 }}>
          Smart <span className="gradient-text">Financial Tools</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 0, maxWidth: 520 }}>
          Real-time intelligence to help you spend smarter, detect leaks, and predict your financial future.
        </p>

        <div className="smart-grid">
          <StopMeCard />
          <FutureImpactCard />
          <MoneyLeakCard />
          <SubscriptionCard />
        </div>
      </div>
    </div>
  );
}
