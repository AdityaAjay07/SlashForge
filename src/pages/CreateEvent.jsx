import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, PlusCircle } from 'lucide-react'
import { supabase } from '../supabaseClient'
import './Organizer.css' // Reusing the clean organizer stylesheet

function CreateEvent() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState('')
  const [clubName, setClubName] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('Creating event...')

    const { error } = await supabase
      .from('events')
      .insert([
        {
          title,
          description,
          date,
          location,
          image,
          club_name: clubName
        }
      ])

    if (error) {
      console.error('Error creating event:', error)
      setMessage(`Failed to create event: ${error.message}`)
      return
    }

    setMessage('Event created successfully!')
    setTitle('')
    setDescription('')
    setDate('')
    setLocation('')
    setImage('')
    setClubName('')
  }

  return (
    <div className="organizer-page">
      <div className="organizer-container" style={{ maxWidth: '650px' }}>
        
        {/* Back Button to Organizer Hub */}
        <Link to="/organizer" className="back-btn">
          <ArrowLeft size={16} /> Back to Organizer Tools
        </Link>

        <div className="organizer-header" style={{ marginBottom: '24px' }}>
          <h2>Create Event</h2>
          <p>Publish a new activity, workshop, or club event to the campus portal.</p>
        </div>

        {/* Form Container */}
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Event Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Tech Summit 2026"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief details about the event..."
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
                placeholder="September 15, 2026"
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. College Auditorium"
                required
              />
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            <div className="form-group">
              <label>Club Name</label>
              <input
                type="text"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                placeholder="e.g. CS Association"
                required
              />
            </div>

            <button type="submit" className="primary-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <PlusCircle size={18} /> Create Event
            </button>
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

export default CreateEvent