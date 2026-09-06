import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { ArrowLeft, Save, X } from 'lucide-react'
import './Organizer.css' // Reusing our clean organizer stylesheet

function EditEvent() {
  const { id } = useParams()
  const eventId = Number(id)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState('')
  const [clubName, setClubName] = useState('')

  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchEvent()
  }, [eventId])

  async function fetchEvent() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single()

    if (error) {
      console.error('Error fetching event:', error)
      setMessage('Failed to load event.')
      setLoading(false)
      return
    }

    setTitle(data.title)
    setDescription(data.description)
    setDate(data.date)
    setLocation(data.location)
    setImage(data.image)
    setClubName(data.club_name)

    setLoading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('Updating event...')

    const { error } = await supabase
      .from('events')
      .update({
        title,
        description,
        date,
        location,
        image,
        club_name: clubName
      })
      .eq('id', eventId)

    if (error) {
      console.error('Error updating event:', error)
      setMessage(`Failed to update event: ${error.message}`)
      return
    }

    setMessage('Event updated successfully!')

    setTimeout(() => {
      navigate('/manage-events')
    }, 1000)
  }

  if (loading) {
    return (
      <div className="organizer-page" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>Loading event details...</p>
      </div>
    )
  }

  return (
    <div className="organizer-page">
      <div className="organizer-container" style={{ maxWidth: '680px' }}>
        
        {/* Back Button to Manage Events */}
        <Link to="/manage-events" className="back-btn">
          <ArrowLeft size={16} /> Back to Manage Events
        </Link>

        <div className="organizer-header" style={{ marginBottom: '24px' }}>
          <h2>Edit Event</h2>
          <p>Update activity details, location, or scheduling.</p>
        </div>

        {/* Form Card Container */}
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Event Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '28px' }}>
              <label>Club Name</label>
              <input
                type="text"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                required
              />
            </div>

            {/* Action Button Group */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" className="primary-btn" style={{ flex: 1 }}>
                <Save size={18} /> Save Changes
              </button>

              <button
                type="button"
                onClick={() => navigate('/manage-events')}
                style={{
                  backgroundColor: '#f8f9fa',
                  color: '#2d3748',
                  border: '1px solid #cbd5e0',
                  padding: '14px 20px',
                  borderRadius: '10px',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'background-color 0.2s'
                }}
              >
                <X size={18} /> Cancel
              </button>
            </div>
          </form>

          {message && (
            <p style={{ 
              marginTop: '16px', 
              fontWeight: '600', 
              color: message.includes('successfully') ? '#2a9d8f' : '#e76f51',
              textAlign: 'center'
            }}>
              {message}
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default EditEvent