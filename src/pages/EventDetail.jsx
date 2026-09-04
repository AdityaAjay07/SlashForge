import { useParams } from 'react-router-dom'
import RSVPForm from '../components/RSVPForm'

function EventDetail({ events }) {
  const { id } = useParams()
  const event = events.find((e) => e.id === parseInt(id))

  if (!event) {
    return <div style={{ padding: '60px' }}><h1>Event not found</h1></div>
  }

  return (
    <div style={{ padding: '60px' }}>
      <img
        src={event.image}
        alt={event.title}
        style={{ width: '100%', maxWidth: '500px', borderRadius: '12px' }}
      />
      <h1>{event.title}</h1>
      <p>📅 {event.date}</p>
      <p>📍 {event.location}</p>
      <p>{event.description}</p>
      <RSVPForm eventId={event.id} />
    </div>
  )
}

export default EventDetail