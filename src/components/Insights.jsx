// Insights Page
// AI-based spending alerts, recommendations, and weekly summary
import { useState } from 'react';
import { insights, initialTransactions, categoryMeta, BUDGET_LIMIT } from '../data/mockData';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip
} from 'recharts';
import '../App.css';

// Radar chart data — spending habits score
const radarData = [
  { category: 'Food',          score: 75 },
  { category: 'Travel',        score: 60 },
  { category: 'Shopping',      score: 45 },
  { category: 'Subscriptions', score: 85 },
  { category: 'Savings',       score: 55 },
  { category: 'Discipline',    score: 40 },
];

// Weekly comparison (this week vs last week)
const weekComparison = [
  { cat: 'Food',     thisWeek: 1830, lastWeek: 1230 },
  { cat: 'Travel',   thisWeek: 820,  lastWeek: 1100 },
  { cat: 'Shopping', thisWeek: 1299, lastWeek: 0    },
  { cat: 'Subs',     thisWeek: 767,  lastWeek: 767  },
];

function WeeklyCompare({ item }) {
  const diff = item.thisWeek - item.lastWeek;
  const pct = item.lastWeek === 0 ? 100 : Math.abs((diff / item.lastWeek) * 100).toFixed(0);
  const up = diff > 0;
  const meta = Object.values(categoryMeta).find((_, i) => Object.keys(categoryMeta)[i] === item.cat)
    || { color: '#6366f1', bg: 'rgba(99,102,241,0.15)', emoji: '📦' };
  const realMeta = categoryMeta[item.cat] || meta;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 16px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      marginBottom: 10,
      transition: 'all var(--transition)',
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
    >
      <div style={{ fontSize: 22, width: 36, textAlign: 'center' }}>{realMeta.emoji}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{item.cat}</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          This week: ₹{item.thisWeek.toLocaleString()} · Last week: ₹{item.lastWeek.toLocaleString()}
        </div>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 13,
        fontWeight: 700,
        color: up ? 'var(--accent-red)' : 'var(--accent-green)',
      }}>
        {up ? '↑' : '↓'} {pct}%
      </div>
    </div>
  );
}

export default function Insights() {
  const [dismissed, setDismissed] = useState([]);

  const visible = insights.filter((_, i) => !dismissed.includes(i));

  return (
    <div className="insights-section">
      <div className="page-wrapper">
        <p className="section-label">Alerts & Intelligence</p>
        <h1 style={{ fontSize: 'clamp(26px,4vw,38px)', fontWeight: 800, marginBottom: 6 }}>
          Your <span className="gradient-text">Smart Insights</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 28, maxWidth: 520 }}>
          Personalized AI analysis of your spending patterns. Updated daily.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 24, alignItems: 'start' }}>
          {/* Left: Alerts */}
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>🔔 Active Alerts</h2>

            {visible.length === 0 ? (
              <div style={{
                padding: '32px',
                textAlign: 'center',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
              }}>
                🎉 All clear! No active alerts. You're doing great.
              </div>
            ) : (
              visible.map((item, i) => (
                <div key={i} className={`alert-card ${item.type}`} style={{ cursor: 'default' }}>
                  <div className="alert-icon">{item.icon}</div>
                  <div className="alert-text" style={{ flex: 1 }}>{item.text}</div>
                  <button
                    onClick={() => setDismissed(prev => [...prev, insights.indexOf(item)])}
                    style={{
                      background: 'none', border: 'none', color: 'var(--text-muted)',
                      cursor: 'pointer', fontSize: 16, flexShrink: 0, lineHeight: 1,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.target.style.color = '#f1f5f9'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                    aria-label="Dismiss alert"
                  >✕</button>
                </div>
              ))
            )}

            {dismissed.length > 0 && (
              <button
                className="btn-ghost"
                style={{ marginTop: 8, fontSize: 12 }}
                onClick={() => setDismissed([])}
              >
                ↩ Restore {dismissed.length} dismissed alert{dismissed.length > 1 ? 's' : ''}
              </button>
            )}

            {/* Weekly Comparison */}
            <div style={{ marginTop: 28 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>📅 Week-over-Week Comparison</h2>
              {weekComparison.map((item, i) => <WeeklyCompare key={i} item={item} />)}
            </div>
          </div>

          {/* Right: Radar + Score */}
          <div>
            {/* Spending Health Score */}
            <div className="glass-card" style={{ padding: '24px', marginBottom: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>💯 Spending Health Score</h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
                Based on budget discipline, category balance, and saving habits
              </p>

              {/* Big score number */}
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <div style={{
                  fontSize: 60,
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  background: 'linear-gradient(135deg, #f97316, #ef4444)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>58</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>out of 100 · Needs Improvement</div>
              </div>

              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.07)" />
                  <PolarAngleAxis dataKey="category" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Radar dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
                  <Tooltip
                    contentStyle={{
                      background: '#1a1b2e',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 10,
                      color: '#f1f5f9',
                      fontSize: 12,
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>

              {/* Score breakdown */}
              {[
                { label: 'Budget Discipline', val: 40, color: 'var(--accent-red)' },
                { label: 'Savings Rate',      val: 55, color: 'var(--accent-orange)' },
                { label: 'Category Balance',  val: 70, color: 'var(--accent-blue)' },
              ].map((s, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                    <span style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                    <span style={{ fontWeight: 600, color: s.color }}>{s.val}/100</span>
                  </div>
                  <div className="progress-bar-track">
                    <div style={{ height: '100%', width: `${s.val}%`, background: s.color, borderRadius: 99, transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* AI tip of the day */}
            <div style={{
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--gradient-card)',
              border: '1px solid var(--border-glow)',
            }}>
              <div style={{ fontSize: 13, color: 'var(--accent-blue)', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                🤖 AI Tip of the Day
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--text-primary)' }}>Cut your food budget by ₹800/month</strong> by setting a daily food cap of ₹120 and
                planning meals on weekends. Your current food spend is <strong style={{ color: 'var(--accent-orange)' }}>38% above average</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: radar below */}
        <style>{`
          @media (max-width: 900px) {
            .insights-section .page-wrapper > div[style*="grid-template-columns"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
