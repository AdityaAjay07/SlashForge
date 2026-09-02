function EventCard({ image, title, date, location }) {
  return (
    <div className="event-card">
      <img
        className="event-image"
        src={image}
        alt={title}
      />

      <div className="event-details">
        <h3>{title}</h3>

        <p>📅 {date}</p>

        <p>📍 {location}</p>
      </div>
    </div>
  )
}

export default EventCard