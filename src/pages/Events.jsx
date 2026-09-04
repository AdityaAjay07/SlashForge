import EventCard from '../components/EventCard'
import { Link } from 'react-router-dom'

function Events({ events }) {
  return (
    <div className="events-section">
      <h1>All Events</h1>

      <div className="event-list">
        {events.map((event) => (
  <Link key={event.id} to={`/events/${event.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <EventCard
      image={event.image}
      title={event.title}
      date={event.date}
      location={event.location}
    />
  </Link>
))}
      </div>
    </div>
  )
}

export default Events
