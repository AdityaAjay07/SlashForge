import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, LogIn, ArrowLeft } from 'lucide-react';
import './StudentLogin.css';

export default function StudentLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'student' && password === 'student123') {
      sessionStorage.setItem('cet_student_auth', 'true');
      sessionStorage.setItem('cet_student_username', username);
      navigate('/student-home');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="organizer-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '85vh' }}>
      <div className="organizer-container" style={{ width: '100%', maxWidth: '420px' }}>
        
        <Link to="/" className="back-btn" style={{ marginBottom: '16px' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="form-card" style={{ padding: '40px 30px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ 
              background: '#fff5f2', 
              color: '#e76f51', 
              width: '56px', 
              height: '56px', 
              borderRadius: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 16px auto',
              boxShadow: '0 4px 12px rgba(231, 111, 81, 0.1)'
            }}>
              <User size={26} />
            </div>
            <h2 style={{ fontSize: '1.75rem', color: '#1a1a1a', fontWeight: '800', marginBottom: '6px' }}>
              Student Portal
            </h2>
            <p style={{ color: '#666', fontSize: '0.95rem' }}>
              Sign in to access your profile, track registered events, and join campus clubs.
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={15} color="#e76f51" /> Username or Student ID
              </label>
              <input 
                type="text" 
                className="student-input" 
                placeholder="Enter username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={15} color="#e76f51" /> Password
              </label>
              <input 
                type="password" 
                className="student-input" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div style={{ 
                marginBottom: '20px', 
                padding: '10px 14px', 
                borderRadius: '8px', 
                background: '#fff5f5',
                border: '1px solid #ffccd5',
                color: '#d90429',
                fontSize: '0.9rem',
                fontWeight: '600',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}
            
            <button type="submit" className="primary-btn" style={{ width: '100%' }}>
              <LogIn size={18} /> Login to Portal
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}