import { useState } from 'react'
import { supabase } from '../supabaseClient'

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
    <div style={{ padding: '60px' }}>
      <h1>Create Event</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Date</label>
          <br />
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="September 15, 2026"
            required
          />
        </div>

        <br />

        <div>
          <label>Location</label>
          <br />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Image URL</label>
          <br />
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        <br />

        <div>
          <label>Club Name</label>
          <br />
          <input
            type="text"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">
          Create Event
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}

export default CreateEvent