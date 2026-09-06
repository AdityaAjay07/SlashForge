import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentLogin.css';

export default function StudentLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      sessionStorage.setItem('cet_student_auth', 'true');
      sessionStorage.setItem('cet_student_username', username);
      navigate('/student-home');
    } else {
      setError('Please enter valid credentials.');
    }
  };

  return (
    <div className="student-login-page">
      <div className="student-login-card">
        <h2>🎓 Student Portal Login</h2>
        <p>Sign in to access your profile, track registered events, and join campus clubs.</p>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username or Student ID</label>
            <input 
              type="text" 
              className="student-input" 
              placeholder="e.g. shreya_cs" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="student-input" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-msg">{error}</p>}
          
          <button type="submit" className="student-login-btn">Login to Portal</button>
        </form>
        <div className="login-hint">
          <small>Tip: You can use any username & password to test!</small>
        </div>
      </div>
    </div>
  );
}