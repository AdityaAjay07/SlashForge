import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const studentAuth = sessionStorage.getItem('cet_student_auth');
    setIsStudentLoggedIn(studentAuth === 'true');

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location]);

  const handleStudentLogout = () => {
    sessionStorage.removeItem('cet_student_auth');
    setIsStudentLoggedIn(false);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const isMobile = windowWidth <= 768;

  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">
          <Link to={isStudentLoggedIn ? "/student-home" : "/"}>ClubApp</Link>
        </div>

        {/* Desktop Links Container */}
        {!isMobile && (
          <div className="nav-links">
            <Link to={isStudentLoggedIn ? "/student-home" : "/"}>Home</Link>
            <Link to="/events">Events</Link>
            <Link to="/clubs">Clubs</Link>

            {isStudentLoggedIn ? (
              <>
                <Link to="/profile" style={{ color: '#e56b43', fontWeight: 'bold' }}>My Account</Link>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="notification-bell-btn"
                  title="Notifications"
                >
                  🔔
                </button>
                <button onClick={handleStudentLogout} className="nav-logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/organizer-login">Organizer</Link>
                <Link to="/student-login" className="student-login-pill">
                  Student Login
                </Link>
              </>
            )}
          </div>
        )}

        {/* Mobile Right Controls: Notification Bell + Hamburger Toggle */}
        {isMobile && (
          <div className="nav-mobile-controls" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isStudentLoggedIn && (
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="notification-bell-btn"
                title="Notifications"
              >
                🔔
              </button>
            )}
            <button 
              className="mobile-menu-toggle" 
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              aria-label="Toggle Menu"
              style={{ display: 'flex', background: 'none', border: 'none', cursor: 'pointer', color: '#1f2937', padding: '4px' }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}

        {/* Mobile Dropdown Menu Drawer */}
        {isMobile && isMobileMenuOpen && (
          <div className="mobile-dropdown-menu">
            <Link to={isStudentLoggedIn ? "/student-home" : "/"} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/events" onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
            <Link to="/clubs" onClick={() => setIsMobileMenuOpen(false)}>Clubs</Link>
            
            <hr className="menu-divider" />

            {isStudentLoggedIn ? (
              <>
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="menu-item-account">
                  <User size={16} /> My Account
                </Link>
                <button onClick={handleStudentLogout} className="mobile-logout-btn">
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/organizer-login" onClick={() => setIsMobileMenuOpen(false)}>Organizer Portal</Link>
                <Link to="/student-login" onClick={() => setIsMobileMenuOpen(false)} className="mobile-login-cta">
                  Student Login
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Notification Slide-over Sidebar */}
      {showNotifications && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', zIndex: 1100 }} onClick={() => setShowNotifications(false)}>
          <div style={{ position: 'absolute', right: 0, top: 0, width: '350px', maxWidth: '85vw', height: '100%', background: '#fff', padding: '20px', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <h3 style={{ margin: 0 }}>Notifications</h3>
              <button onClick={() => setShowNotifications(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>📢 Organizer Announcements</h4>
              <div style={{ background: '#fdf2ef', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #e56b43', marginBottom: '10px' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>Stargazing session rescheduled to Saturday 7:00 PM at Main Ground.</p>
                <small style={{ color: '#888' }}>AstroCET • 2 hrs ago</small>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>📅 Registered Events</h4>
              <div style={{ background: '#f3f4f6', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #4b5563' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}><strong>Tech Summit 2026</strong> coming up on Sept 15.</p>
                <small style={{ color: '#888' }}>CET Auditorium</small>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}