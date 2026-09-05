import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'

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
    return <p>Loading event...</p>
  }

  return (
    <div style={{ padding: '60px' }}>
      <h1>Edit Event</h1>

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
          Save Changes
        </button>

        <button
          type="button"
          onClick={() => navigate('/manage-events')}
          style={{ marginLeft: '10px' }}
        >
          Cancel
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}

export default EditEvent