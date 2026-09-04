import EventCard from '../components/EventCard'

function Events({ events }) {
  return (
    <div className="events-section">
      <h1>All Events</h1>

      <div className="event-list">
        {events.map((event) => (
          <EventCard
            key={event.id}
            image={event.image}
            title={event.title}
            date={event.date}
            location={event.location}
          />
        ))}
      </div>
    </div>
  )
}

export default Events