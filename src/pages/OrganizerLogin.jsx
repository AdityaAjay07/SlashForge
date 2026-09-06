import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { Lock, User, LogIn, ArrowLeft } from 'lucide-react'
import './Organizer.css' // Reusing our clean organizer stylesheet

function OrganizerLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setMessage('Checking login...')

    const { data, error } = await supabase.rpc(
      'check_organizer_login',
      {
        input_username: username,
        input_password: password
      }
    )

    if (error) {
      console.error('Login error:', error)
      setMessage('Something went wrong. Please try again.')
      return
    }

    if (data === true) {
      localStorage.setItem('isOrganizerLoggedIn', 'true')
      navigate('/organizer')
    } else {
      setMessage('Invalid username or password.')
    }
  }

  return (
    <div className="organizer-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '85vh' }}>
      <div className="organizer-container" style={{ width: '100%', maxWidth: '420px' }}>
        
        {/* Optional back link to home */}
        <Link to="/" className="back-btn" style={{ marginBottom: '16px' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Login Card Container */}
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
              <Lock size={26} />
            </div>
            <h2 style={{ fontSize: '1.75rem', color: '#1a1a1a', fontWeight: '800', marginBottom: '6px' }}>
              Organizer Portal
            </h2>
            <p style={{ color: '#666', fontSize: '0.95rem' }}>
              Sign in to manage events and check in attendees.
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={15} color="#e76f51" /> Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter organizer username"
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={15} color="#e76f51" /> Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
              />
            </div>

            <button type="submit" className="primary-btn">
              <LogIn size={18} /> Sign In
            </button>
          </form>

          {message && (
            <div style={{ 
              marginTop: '20px', 
              padding: '10px 14px', 
              borderRadius: '8px', 
              background: message.includes('successfully') || message.includes('Checking') ? '#fff5f2' : '#fff5f5',
              border: `1px solid ${message.includes('successfully') || message.includes('Checking') ? '#fbdad2' : '#ffccd5'}`,
              color: message.includes('successfully') || message.includes('Checking') ? '#e76f51' : '#d90429',
              fontSize: '0.9rem',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              {message}
            </div>
          )}

        </div>

      </div>
    </div>
  )
}

export default OrganizerLogin