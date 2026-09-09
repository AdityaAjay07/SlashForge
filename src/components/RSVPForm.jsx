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
  const [showLoginModal, setShowLoginModal] = useState(false) // State for the custom popup

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!isLoggedIn) {
      setShowLoginModal(true) // Show custom pop-up instead of alert
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
      <div style={{ marginTop: '20px', padding: '20px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #eaeaea', maxWidth: '350px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
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
    <>
      <form 
        onSubmit={handleSubmit} 
        className="rsvp-form" 
        style={{ 
          marginTop: '20px', 
          maxWidth: '350px', 
          marginLeft: 'auto', 
          marginRight: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
          RSVP for this event
        </h4>
        
        {/* Line 1: Name */}
        <div style={{ marginBottom: '12px', width: '100%' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '4px', textAlign: 'center' }}>Name</label>
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
              boxSizing: 'border-box',
              textAlign: 'center'
            }}
          />
        </div>

        {/* Line 2: Email */}
        <div style={{ marginBottom: '16px', width: '100%' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '4px', textAlign: 'center' }}>Email</label>
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
              boxSizing: 'border-box',
              textAlign: 'center'
            }}
          />
        </div>

        {/* Line 3: Register Button */}
        <div style={{ width: '100%' }}>
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

        {error && <p style={{ color: 'red', fontSize: '0.85rem', marginTop: '8px' }}>{error}</p>}
      </form>

      {/* --- CUSTOM POPUP MODAL --- */}
      {showLoginModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            padding: '24px',
            borderRadius: '12px',
            maxWidth: '320px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}>
            <h3 style={{ marginBottom: '10px', fontSize: '1.2rem', color: '#222' }}>Sign In Required</h3>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
              You must be logged in to register for events.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowLoginModal(false)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  background: '#f1f1f1',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  color: '#444'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => navigate('/student-login')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  background: '#e76f51',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RSVPForm