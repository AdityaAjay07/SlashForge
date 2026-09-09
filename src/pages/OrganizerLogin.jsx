import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { Lock, User, LogIn, ArrowLeft, UserPlus } from 'lucide-react'
import './Organizer.css' // Reusing our clean organizer stylesheet

function OrganizerLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isSignUpMode, setIsSignUpMode] = useState(false) // Toggle state for New User registration

  const navigate = useNavigate()

  // Handle Form Submission (Routes dynamically between Login and Sign Up)
  async function handleSubmit(e) {
    e.preventDefault()

    if (isSignUpMode) {
      // --- NEW USER SIGN UP LOGIC (Local Storage fallback for quick setup) ---
      setMessage('Creating account...')
      let users = JSON.parse(localStorage.getItem('organizer_users')) || []

      // Check if username already exists
      const existingUser = users.find(u => u.username.toLowerCase() === username.trim().toLowerCase())
      if (existingUser) {
        setMessage('Username already taken. Please choose a unique one.')
        return
      }

      // Save new account
      users.push({ username: username.trim(), password })
      localStorage.setItem('organizer_users', JSON.stringify(users))

      setMessage('Account created successfully! You can now sign in.')
      setIsSignUpMode(false) // Switch back to login mode automatically
      setPassword('')
      return
    }

    // --- EXISTING LOGIN LOGIC (Preserving your exact Supabase RPC call) ---
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
      // Also check local storage custom registered users just in case they signed up via the new option
      let localUsers = JSON.parse(localStorage.getItem('organizer_users')) || []
      const localMatch = localUsers.find(u => u.username === username && u.password === password)

      if (localMatch) {
        localStorage.setItem('isOrganizerLoggedIn', 'true')
        navigate('/organizer')
      } else {
        setMessage('Invalid username or password.')
      }
    }
  }

  // Toggle between Login and Sign Up view smoothly
  function toggleMode(e) {
    e.preventDefault()
    setIsSignUpMode(!isSignUpMode)
    setMessage('')
    setUsername('')
    setPassword('')
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
              {isSignUpMode ? <UserPlus size={26} /> : <Lock size={26} />}
            </div>
            <h2 style={{ fontSize: '1.75rem', color: '#1a1a1a', fontWeight: '800', marginBottom: '6px' }}>
              {isSignUpMode ? 'Organizer Sign Up' : 'Organizer Portal'}
            </h2>
            <p style={{ color: '#666', fontSize: '0.95rem' }}>
              {isSignUpMode ? 'Create a new unique organizer account.' : 'Sign in to manage events and check in attendees.'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={15} color="#e76f51" /> Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter unique username"
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
              {isSignUpMode ? <UserPlus size={18} /> : <LogIn size={18} />} 
              {isSignUpMode ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle Link to switch between Sign In and New User Sign Up */}
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
            {isSignUpMode ? 'Already have an account? ' : 'New user? '}
            <a 
              href="#" 
              onClick={toggleMode} 
              style={{ color: '#e76f51', fontWeight: '600', textDecoration: 'none' }}
            >
              {isSignUpMode ? 'Sign In' : 'Create an account'}
            </a>
          </div>

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