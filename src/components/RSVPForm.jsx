import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { QRCodeSVG } from 'qrcode.react'

function RSVPForm({ eventId }) {
  const navigate = useNavigate()
  
  const isLoggedIn = sessionStorage.getItem('cet_student_auth')
  const sessionName = isLoggedIn ? (sessionStorage.getItem('cet_student_name') || '') : ''
  const sessionEmail = isLoggedIn ? (sessionStorage.getItem('cet_student_email') || '') : ''

  const [name, setName] = useState(sessionName)
  const [email, setEmail] = useState(sessionEmail)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [registration, setRegistration] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!isLoggedIn) {
      const confirmLogin = window.confirm(
        "You must be logged in to register for events.\n\nClick 'OK' to Sign In or Sign Up."
      )
      if (confirmLogin) {
        navigate('/student-login')
      }
      return
    }

    const { data, error } = await supabase
      .from('registrations')
      .insert([{ event_id: eventId, name, email }])
      .select()
      .single()

    if (error) {
      console.error('RSVP failed:', error)
      setError('Something went wrong. Please try again.')
    } else {
      setRegistration(data)
      setSubmitted(true)
    }
  }

  if (submitted && registration) {
    return (
      <div style={{ marginTop: '15px', padding: '16px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #eaeaea', maxWidth: '350px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
        <h4 style={{ color: '#2b2b2b', marginBottom: '8px' }}>Registration Successful! 🎉</h4>
        <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '12px' }}>
          Thanks, {name}! You're registered for this event.
        </p>
        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>Show this QR code at the event for attendance:</p>
        <div style={{ background: '#fff', padding: '10px', display: 'inline-block', borderRadius: '6px', border: '1px solid #ddd' }}>
          <QRCodeSVG value={String(registration.id)} size={140} />
        </div>
        <p style={{ fontSize: '0.8rem', color: '#777', marginTop: '8px' }}>Registration ID: {registration.id}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rsvp-form" style={{ marginTop: '12px', maxWidth: '350px', marginLeft: 'auto', marginRight: 'auto' }}>
      <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#333', marginBottom: '10px', textAlign: 'center' }}>
        RSVP for this event
      </h4>
      
      {/* Line 1: Name */}
      <div style={{ marginBottom: '10px', textAlign: 'left' }}>
        <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '4px' }}>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          style={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '0.9rem',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Line 2: Email */}
      <div style={{ marginBottom: '12px', textAlign: 'left' }}>
        <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '4px' }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          style={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '0.9rem',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Line 3: Register Button */}
      <div>
        <button 
          type="submit"
          style={{
            width: '100%',
            padding: '10px 18px',
            backgroundColor: '#e76f51',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '0.95rem',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
            boxShadow: '0 2px 4px rgba(231, 111, 81, 0.2)'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#d85c3b'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#e76f51'}
        >
          Register
        </button>
      </div>

      {error && <p style={{ color: 'red', fontSize: '0.85rem', marginTop: '8px', textAlign: 'center' }}>{error}</p>}
    </form>
  )
}

export default RSVPForm