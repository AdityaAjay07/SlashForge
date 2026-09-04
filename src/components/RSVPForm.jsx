import { useState } from 'react'
import { supabase } from '../supabaseClient'

function RSVPForm({ eventId }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()

    const { error } = await supabase
      .from('registrations')
      .insert([{ event_id: eventId, name, email }])

    if (error) {
      console.error('RSVP failed:', error)
      setError('Something went wrong. Please try again.')
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return <p>Thanks, {name}! You're registered for this event.</p>
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