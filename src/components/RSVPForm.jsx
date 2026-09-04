import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { QRCodeSVG } from 'qrcode.react'

function RSVPForm({ eventId }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [registration, setRegistration] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()

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
    <div>
      <h3>Registration Successful! 🎉</h3>

      <p>
        Thanks, {name}! You're registered for this event.
      </p>

      <p>Show this QR code at the event for attendance:</p>

      <QRCodeSVG value={String(registration.id)} size={200} />

      <p>Registration ID: {registration.id}</p>
    </div>
  )
}

  return (
    <form onSubmit={handleSubmit} className="rsvp-form">
      <h3>RSVP for this event</h3>

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button type="submit">Register</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}

export default RSVPForm