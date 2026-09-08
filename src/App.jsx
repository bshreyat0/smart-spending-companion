// Smart Spending Companion — Root App Component
// Handles page-level routing (no react-router needed; single-page state routing)
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import SmartFeatures from './components/SmartFeatures';
import Insights from './components/Insights';
import Auth from './components/Auth';
import './index.css';
import './App.css';

// Page transition wrapper
function PageWrapper({ children }) {
  return (
    <div
      key={Math.random()}
      style={{ animation: 'fadeUp 0.4s ease both' }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('landing');
  const [isAuth, setAuth] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  // Keyboard shortcut: Escape → home
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setPage('landing');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'landing': return <Landing setPage={setPage} />;
      case 'auth': return <Auth setPage={setPage} setAuthStatus={setAuth} />;
      case 'dashboard': return isAuth ? <Dashboard /> : <Auth setPage={setPage} setAuthStatus={setAuth} />;
      case 'smart': return isAuth ? <SmartFeatures /> : <Auth setPage={setPage} setAuthStatus={setAuth} />;
      case 'insights': return isAuth ? <Insights /> : <Auth setPage={setPage} setAuthStatus={setAuth} />;
      default: return <Landing setPage={setPage} />;
    }
  };

  return (
    <>
      {/* Sticky navigation — visible on all pages */}
      <Navbar currentPage={page} setPage={setPage} isAuth={isAuth} setAuth={setAuth} />

      {/* Global ambient glow decoration */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: 'none',
        zIndex: 0,
        background: `
          radial-gradient(ellipse 60% 40% at 20% 10%, rgba(99,102,241,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 80% 90%, rgba(139,92,246,0.06) 0%, transparent 60%)
        `,
      }} />

      {/* Page content */}
      <main style={{ position: 'relative', zIndex: 1, paddingTop: page === 'landing' ? 0 : 0 }}>
        <PageWrapper>
          {renderPage()}
        </PageWrapper>
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '24px',
        textAlign: 'center',
        fontSize: 13,
        color: 'rgba(148,163,184,0.6)',
        background: 'rgba(0,0,0,0.2)',
        position: 'relative',
        zIndex: 1,
      }}>
        <span style={{ marginRight: 8 }}>💰</span>
        Smart Spending Companion · Built for Hackathon Demo 2026 ·
        <span style={{ marginLeft: 8, color: '#6366f1' }}>No real data, fully simulated</span>
      </footer>
    </>
  );
}
