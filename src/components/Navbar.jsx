import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const studentAuth = sessionStorage.getItem('cet_student_auth');
    setIsStudentLoggedIn(studentAuth === 'true');
  }, [location]);

  const handleStudentLogout = () => {
    sessionStorage.removeItem('cet_student_auth');
    setIsStudentLoggedIn(false);
    navigate('/');
  };

  return (
    <>
      <nav>
        <h2>ClubApp</h2>
        <div>
          <Link to={isStudentLoggedIn ? "/student-home" : "/"}>Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/clubs">Clubs</Link>

          {isStudentLoggedIn ? (
            <>
              <Link to="/profile" className="nav-account-link" style={{ color: '#e56b43', fontWeight: 'bold' }}>My Account</Link>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', marginLeft: '10px' }}
                title="Notifications"
              >
                🔔
              </button>
              <button onClick={handleStudentLogout} style={{ marginLeft: '10px', padding: '4px 10px', background: '#e56b43', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/organizer-login">Organizer</Link>
              <Link to="/student-login" style={{ marginLeft: '10px', padding: '6px 12px', background: '#e56b43', color: '#fff', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
                Student Login
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Notification Slide-over Sidebar */}
      {showNotifications && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', zIndex: 1000 }} onClick={() => setShowNotifications(false)}>
          <div style={{ position: 'absolute', right: 0, top: 0, width: '350px', height: '100%', background: '#fff', padding: '20px', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
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