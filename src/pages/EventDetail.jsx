import { useParams } from 'react-router-dom'
import RSVPForm from '../components/RSVPForm'

function EventDetail({ events }) {
  const { id } = useParams()
  const event = events.find((e) => e.id === parseInt(id))

  if (!event) {
    return <div style={{ padding: '60px', textAlign: 'center' }}><h1>Event not found</h1></div>
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh', 
      padding: '40px 20px' 
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center', 
        maxWidth: '500px', 
        width: '100%',
        background: '#fff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
      }}>
        <img
          src={event.image}
          alt={event.title}
          style={{ width: '100%', maxWidth: '450px', borderRadius: '10px', objectFit: 'cover', marginBottom: '16px' }}
        />
        <h1 style={{ fontSize: '1.8rem', marginBottom: '10px', color: '#222' }}>{event.title}</h1>
        <p style={{ margin: '4px 0', color: '#555' }}>📅 {event.date}</p>
        <p style={{ margin: '4px 0', color: '#555' }}>📍 {event.location}</p>
        <p style={{ margin: '12px 0 20px 0', color: '#666', fontSize: '0.95rem' }}>{event.description}</p>
        
        <div style={{ width: '100%' }}>
          <RSVPForm eventId={event.id} />
        </div>
      </div>
    </div>
  )
}

export default EventDetail