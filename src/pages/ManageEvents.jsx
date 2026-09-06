import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom'
import { ArrowLeft, Edit, Trash2, Calendar, MapPin, Building2 } from 'lucide-react'
import './Organizer.css' // Reusing our clean organizer stylesheet

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
      setLoading(false)
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
    if (registrations && registrations.length > 0) {
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
    return (
      <div className="organizer-page" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>Loading active events...</p>
      </div>
    )
  }

  return (
    <div className="organizer-page">
      <div className="organizer-container" style={{ maxWidth: '800px' }}>
        
        {/* Back Button to Organizer Hub */}
        <Link to="/organizer" className="back-btn">
          <ArrowLeft size={16} /> Back to Organizer Tools
        </Link>

        <div className="organizer-header">
          <h2>Manage Events</h2>
          <p>Review, update, or safely remove your campus activities.</p>
        </div>

        {events.length === 0 ? (
          <div className="form-card" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: '#666', fontSize: '1.05rem' }}>No events found.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {events.map((event) => (
              <div key={event.id} className="form-card" style={{ padding: '24px 30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '1.3rem', color: '#1a1a1a', fontWeight: '700', margin: 0 }}>
                    {event.title}
                  </h3>
                  <span style={{ 
                    backgroundColor: '#fff5f2', 
                    color: '#e76f51', 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem', 
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Building2 size={13} /> {event.club_name}
                  </span>
                </div>

                <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '16px' }}>
                  {event.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', color: '#666', fontSize: '0.9rem', marginBottom: '20px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={15} color="#e76f51" /> {event.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={15} color="#e76f51" /> {event.location}
                  </span>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid #eaeaea', paddingTop: '16px' }}>
                  <Link to={`/edit-event/${event.id}`} style={{ textDecoration: 'none' }}>
                    <button style={{
                      backgroundColor: '#f8f9fa',
                      color: '#2d3748',
                      border: '1px solid #cbd5e0',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'background-color 0.2s'
                    }}>
                      <Edit size={15} /> Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(event.id)}
                    style={{
                      backgroundColor: '#fff5f5',
                      color: '#d90429',
                      border: '1px solid #ffccd5',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <Trash2 size={15} /> Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default ManageEvents