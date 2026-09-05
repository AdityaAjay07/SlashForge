import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom'

function ManageEvents() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Error fetching events:', error)
      return
    }

    setEvents(data)
    setLoading(false)
  }

  async function handleDelete(eventId) {
  // 1. Check whether anyone has registered for this event
  const { data: registrations, error: registrationError } = await supabase
    .from('registrations')
    .select('id')
    .eq('event_id', eventId)

  if (registrationError) {
    console.error('Error checking registrations:', registrationError)
    return
  }

  // 2. Don't delete an event that has registrations
  if (registrations.length > 0) {
    alert('Cannot delete this event because students are registered.')
    return
  }

  // 3. Ask for confirmation
  const confirmed = window.confirm(
    'Are you sure you want to delete this event?'
  )

  if (!confirmed) {
    return
  }

  // 4. Delete the event
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', eventId)

  if (error) {
    console.error('Error deleting event:', error)
    alert(`Failed to delete event: ${error.message}`)
    return
  }

  // 5. Remove the event from the screen
  setEvents((currentEvents) =>
    currentEvents.filter((event) => event.id !== eventId)
  )

  alert('Event deleted successfully!')
}

  if (loading) {
    return <p>Loading events...</p>
  }

  return (
    <div style={{ padding: '60px' }}>
      <h1>Manage Events</h1>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event) => (
          <div key={event.id} style={{ marginBottom: '20px' }}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <p>{event.location}</p>
            <p>{event.club_name}</p>

            <Link to={`/edit-event/${event.id}`}>
              <button>Edit</button>
            </Link>
            <button
            style={{ marginLeft: '10px' }}
                onClick={() => handleDelete(event.id)}
            >
            Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  )
}

export default ManageEvents