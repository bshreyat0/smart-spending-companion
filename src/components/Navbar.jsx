// Navbar Component
// Provides top navigation with active page highlighting
import '../App.css';

const NAV_ITEMS = [
  { id: 'landing',   label: 'Home'       },
  { id: 'dashboard', label: 'Dashboard'  },
  { id: 'smart',     label: 'Smart Tools'},
  { id: 'insights',  label: 'Insights'   },
];

export default function Navbar({ currentPage, setPage, isAuth, setAuth }) {
  const handleAuthDrop = () => {
    if (isAuth) {
      setAuth(false);
      setPage('landing');
    } else {
      setPage('auth');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => setPage('landing')}>
          <div className="navbar-logo-icon">💰</div>
          <span className="navbar-logo-text">
            Smart<span>Spend</span>
          </span>
        </div>

        {/* Nav links */}
        <div className="navbar-links hide-mobile">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => setPage(isAuth || item.id === 'landing' ? item.id : 'auth')}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="navbar-cta">
          {isAuth ? (
            <button className="btn-ghost" onClick={handleAuthDrop} style={{ padding: '8px 20px', fontSize: '13px' }}>
              Log Out
            </button>
          ) : (
            <button className="btn-primary" onClick={handleAuthDrop} style={{ padding: '8px 20px', fontSize: '13px' }}>
              Create Account →
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
